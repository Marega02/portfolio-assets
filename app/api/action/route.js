/* Server-only Google Picker gateway and GitHub Pages publisher.
 * Credentials remain in Webflow Cloud secret environment variables.
 * Only the Google account matching ADMIN_EMAIL can read selections or publish.
 */
export const runtime="edge";
const GOOGLE="https://photospicker.googleapis.com/v1";
const GH="https://api.github.com/repos/Marega02/portfolio-assets/contents";
const MANIFEST="assets/photos/places-manifest.json";
const CDN="https://marega02.github.io/portfolio-assets/";
const allowed=new Set(["rodica","krn","kucelj","kobilja-glava","monte-talm","london","malaysia","singapore","bali","amsterdam"]);
const PHOTO_SCOPE="https://www.googleapis.com/auth/photospicker.mediaitems.readonly";
const fail=(message,status=400)=>Response.json({error:message},{status,headers:{"Cache-Control":"no-store"}});
const isPlain=(s,max=600)=>typeof s==="string"&&s.length>0&&s.length<=max;
async function verifyUser(token){
 const client=process.env.GOOGLE_CLIENT_ID;
 const admin=process.env.ADMIN_EMAIL;
 const github=process.env.GITHUB_TOKEN;
 if(!client||!admin||!github)throw Object.assign(new Error("CONFIG_MISSING"),{code:503});
 if(!isPlain(token,3500))throw Object.assign(new Error("Accedi prima con Google."),{code:401});
 const headers={Authorization:"Bearer "+token};
 const [info,profile]=await Promise.all([
   fetch("https://oauth2.googleapis.com/tokeninfo?access_token="+encodeURIComponent(token),{headers:{"Cache-Control":"no-store"}}),
   fetch("https://openidconnect.googleapis.com/v1/userinfo",{headers})
 ]);
 if(!info.ok||!profile.ok)throw Object.assign(new Error("Accesso Google scaduto o non valido."),{code:401});
 const i=await info.json(),u=await profile.json();
 if(i.aud!==client||!(i.scope||"").split(" ").includes(PHOTO_SCOPE))throw Object.assign(new Error("Autorizzazioni Google mancanti."),{code:403});
 if(!u.email_verified||String(u.email).toLowerCase()!==admin.toLowerCase())throw Object.assign(new Error("Questo account non è autorizzato a modificare Places."),{code:403});
}
async function google(token,path,method="GET",body){
 const r=await fetch(GOOGLE+path,{
  method,headers:{Authorization:"Bearer "+token,...(body?{"Content-Type":"application/json"}:{})},
  ...(body?{body:JSON.stringify(body)}:{})
 });
 if(!r.ok)throw Object.assign(new Error("Google Photos ha restituito un errore ("+r.status+")."),{code:r.status===401?401:502});
 if(r.status===204)return {};
 return r.json();
}
async function selected(token,sessionId){
 let next="",items=[],pages=0;
 do{
  const q=new URLSearchParams({sessionId,pageSize:"100"});
  if(next)q.set("pageToken",next);
  const r=await google(token,"/mediaItems?"+q.toString());
  items.push(...(r.mediaItems||[]));
  next=r.nextPageToken||"";
  pages++;
  if(pages>25)break;
 }while(next);
 return items.filter(i=>i.type==="PHOTO"&&isPlain(i.id,1000)&&isPlain(i.mediaFile?.baseUrl,5000));
}
const ghHeaders=()=>({
 Authorization:"Bearer "+process.env.GITHUB_TOKEN,
 Accept:"application/vnd.github+json",
 "X-GitHub-Api-Version":"2022-11-28",
 "User-Agent":"Places-Photo-Importer"
});
async function ghGet(path){
 const r=await fetch(GH+"/"+path+"?ref=main",{headers:ghHeaders()});
 if(r.status===404)return null;
 if(!r.ok)throw new Error("GitHub non disponibile ("+r.status+").");
 return r.json();
}
async function ghPut(path,bytes,sha,message){
 const b=typeof bytes==="string"?toBase64(new TextEncoder().encode(bytes)):toBase64(bytes);
 const payload={message,content:b,branch:"main",...(sha?{sha}:{})};
 const r=await fetch(GH+"/"+path,{
  method:"PUT",headers:{...ghHeaders(),"Content-Type":"application/json"},
  body:JSON.stringify(payload)
 });
 if(!r.ok)throw new Error("GitHub non ha salvato il file ("+r.status+").");
 return r.json();
}
function toBase64(bytes){
 const x=bytes instanceof Uint8Array?bytes:new Uint8Array(bytes);
 let out="";
 for(let i=0;i<x.length;i+=8192)out+=String.fromCharCode(...x.slice(i,i+8192));
 return btoa(out);
}
function fromBase64(content){
 const str=atob(String(content).replace(/\s/g,""));
 const out=new Uint8Array(str.length);
 for(let i=0;i<str.length;i++)out[i]=str.charCodeAt(i);
 return new TextDecoder().decode(out);
}
async function digest(s){
 const data=new TextEncoder().encode(s);
 const h=await crypto.subtle.digest("SHA-256",data);
 return Array.from(new Uint8Array(h)).map(x=>x.toString(16).padStart(2,"0")).join("").slice(0,20);
}
async function publish(token,sessionId,destination,ids){
 if(!allowed.has(destination))throw Object.assign(new Error("Destinazione non valida."),{code:400});
 if(!Array.isArray(ids)||ids.length<1||ids.length>12||ids.some(id=>!isPlain(id,1000)))throw Object.assign(new Error("Seleziona da 1 a 12 fotografie."),{code:400});
 const session=await google(token,"/sessions/"+encodeURIComponent(sessionId));
 if(!session.mediaItemsSet)throw Object.assign(new Error("Completa prima la selezione su Google Foto."),{code:400});
 const items=await selected(token,sessionId),chosen=items.filter(x=>ids.includes(x.id));
 if(chosen.length!==new Set(ids).size)throw Object.assign(new Error("La selezione non corrisponde alla sessione Google."),{code:400});
 const prev=await ghGet(MANIFEST);
 let data={version:1,updatedAt:null,galleries:{}};
 if(prev?.content){
  try{data=JSON.parse(fromBase64(prev.content))}catch{throw new Error("Il catalogo foto esistente non è leggibile. Nessuna modifica effettuata.");}
 }
 if(!data.galleries||typeof data.galleries!=="object")throw new Error("Formato catalogo foto non valido.");
 const gallery=Array.isArray(data.galleries[destination])?data.galleries[destination]:[];
 const existing=new Set(gallery.map(i=>i.id));
 const results=[];
 for(const item of chosen){
  const id=await digest(item.id);
  if(existing.has(id)){results.push({name:item.mediaFile?.filename||"Foto",status:"already-present"});continue;}
  const rawUrl=item.mediaFile.baseUrl;
  const url=new URL(rawUrl);
  if(url.protocol!=="https:"||!(
     url.hostname==="lh3.googleusercontent.com"||
     url.hostname.endsWith(".googleusercontent.com")
  ))throw new Error("Fonte immagine Google non riconosciuta.");
  const photo=await fetch(rawUrl+"=w1600-h1600",{headers:{Authorization:"Bearer "+token}});
  if(!photo.ok)throw new Error("Impossibile leggere una foto da Google ("+photo.status+").");
  const type=(photo.headers.get("Content-Type")||"").split(";")[0].toLowerCase();
  if(!["image/jpeg","image/png","image/webp"].includes(type)){
    results.push({name:item.mediaFile.filename,status:"unsupported-format"});continue;
  }
  const content=await photo.arrayBuffer();
  if(content.byteLength>8*1024*1024){
    results.push({name:item.mediaFile.filename,status:"too-large"});continue;
  }
  const ext=type==="image/png"?"png":type==="image/webp"?"webp":"jpg";
  const path="assets/photos/"+destination+"/"+id+"."+ext;
  await ghPut(path,content,null,"Add "+destination+" photograph "+id);
  const record={
    id,src:CDN+path,
    alt:item.mediaFile.filename||"Photograph",
    caption:""
  };
  gallery.push(record);existing.add(id);
  results.push({name:item.mediaFile.filename,status:"imported"});
 }
 data.galleries[destination]=gallery;
 data.updatedAt=new Date().toISOString();
 if(results.some(x=>x.status==="imported")){
  await ghPut(MANIFEST,JSON.stringify(data,null,2),prev?.sha||null,"Update Places gallery "+destination);
 }
 // End the Picker session after all successful changes are persisted.
 try{await google(token,"/sessions/"+encodeURIComponent(sessionId),"DELETE");}catch{}
 return {imported:results.filter(x=>x.status==="imported").length,results,totalInGallery:gallery.length};
}
export async function POST(request){
 try{
  if((request.headers.get("Content-Type")||"").split(";")[0]!=="application/json")return fail("Richiesta non valida.");
  const auth=request.headers.get("Authorization")||"";
  const token=auth.startsWith("Bearer ")?auth.slice(7):"";
  await verifyUser(token);
  const body=await request.json();
  if(!body||typeof body!=="object")return fail("Richiesta non valida.");
  const action=body.action;
  if(action==="start"){
   return Response.json(await google(token,"/sessions","POST",{pickingConfig:{maxItemCount:"12"}}));
  }
  if(!isPlain(body.sessionId,600))return fail("Sessione Google non valida.");
  if(action==="status"){
   const session=await google(token,"/sessions/"+encodeURIComponent(body.sessionId));
   return Response.json({mediaItemsSet:!!session.mediaItemsSet,pollingConfig:session.pollingConfig||null});
  }
  if(action==="selected"){
   const session=await google(token,"/sessions/"+encodeURIComponent(body.sessionId));
   if(!session.mediaItemsSet)return fail("Selezione ancora in corso.");
   const items=await selected(token,body.sessionId);
   return Response.json({items:items.slice(0,12).map(x=>({id:x.id,name:x.mediaFile.filename,mimeType:x.mediaFile.mimeType}))});
  }
  if(action==="import"){
   return Response.json(await publish(token,body.sessionId,body.destination,body.ids));
  }
  return fail("Operazione sconosciuta.");
 }catch(e){
  return fail(e.message==="CONFIG_MISSING"?"Configurazione privata non completata in Webflow Cloud.":(e?.message||"Errore imprevisto."),e.code||500);
 }
}
