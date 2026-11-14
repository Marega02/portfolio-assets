"use client";
import {useEffect,useRef,useState} from "react";
const scope="openid email https://www.googleapis.com/auth/photospicker.mediaitems.readonly";
export default function Importer(){
 const [config,setConfig]=useState(null);
 const [gisReady,setGisReady]=useState(false);
 const [token,setToken]=useState("");
 const [status,setStatus]=useState("Accesso ancora da configurare.");
 const [busy,setBusy]=useState(false);
 const [selected,setSelected]=useState([]);
 const [destination,setDestination]=useState("rodica");
 const [report,setReport]=useState(null);
 const session=useRef("");
 const googleClient=useRef(null);
 const state=useRef({cancelled:false});
 const base=()=>window.location.pathname.replace(/\/$/,"");
 useEffect(()=>{
  state.current.cancelled=false;
  fetch(base()+"/api/config",{cache:"no-store"})
   .then(async r=>{if(!r.ok)throw new Error("HTTP "+r.status);return r.json();})
   .then(data=>{
    if(state.current.cancelled)return;
    setConfig(data);
    setStatus(data.configured
     ?"Configurazione rilevata. Premi Accedi con Google."
     :"Il server non rileva ancora tutte le variabili di Webflow Cloud.");
   })
   .catch(e=>{if(!state.current.cancelled)setStatus("Configurazione non raggiungibile: "+e.message+". Premi Accedi con Google per riprovare.");});
  const script=document.createElement("script");
  script.src="https://accounts.google.com/gsi/client";
  script.async=true;
  script.dataset.placesGsi="1";
  script.addEventListener("load",()=>{script.dataset.status="loaded";if(!state.current.cancelled)setGisReady(true);});
  script.addEventListener("error",()=>{
   script.dataset.status="error";
   if(!state.current.cancelled)setStatus("Lo script Google non si carica. Verifica la protezione antitracciamento o un'estensione che blocca Google, poi premi Accedi con Google per riprovare.");
  });
  document.head.appendChild(script);
  return()=>{state.current.cancelled=true;script.remove();};
 },[]);
 async function ensureGoogle(){
  if(window.google?.accounts?.oauth2)return;
  let script=document.querySelector('script[data-places-gsi="1"]');
  if(script?.dataset.status==="error"){script.remove();script=null;}
  let created=false;
  if(!script){
   script=document.createElement("script");
   script.dataset.placesGsi="1";
   script.src="https://accounts.google.com/gsi/client";
   script.async=true;
   created=true;
  }
  if(script.dataset.status!=="loaded"){
   await new Promise((resolve,reject)=>{
    const cleanup=()=>{clearTimeout(timer);script.removeEventListener("load",ok);script.removeEventListener("error",bad);};
    const ok=()=>{script.dataset.status="loaded";cleanup();resolve();};
    const bad=()=>{script.dataset.status="error";cleanup();reject(new Error("Il browser ha bloccato lo script di accesso Google."));};
    const timer=setTimeout(()=>{cleanup();reject(new Error("Google non ha risposto entro 12 secondi. Verifica la protezione antitracciamento di Firefox o eventuali ad blocker."));},12000);
    script.addEventListener("load",ok,{once:true});
    script.addEventListener("error",bad,{once:true});
    if(created)document.head.appendChild(script);
   });
  }
  if(!window.google?.accounts?.oauth2)throw new Error("Google Identity Services non è disponibile nel browser.");
  setGisReady(true);
 }
 async function action(data,currentToken=token){
  const resp=await fetch(base()+"/api/action",{
   method:"POST",
   headers:{"Content-Type":"application/json",Authorization:"Bearer "+currentToken},
   body:JSON.stringify(data),cache:"no-store"
  });
  const info=await resp.json().catch(()=>({error:"Risposta del server non valida."}));
  if(!resp.ok)throw new Error(info.error||"Richiesta non riuscita.");
  return info;
 }
 async function signIn(){
  if(busy)return;
  setStatus("Verifico configurazione e accesso Google...");
  try{
   const resp=await fetch(base()+"/api/config",{cache:"no-store"});
   if(!resp.ok)throw new Error("Il server di configurazione risponde HTTP "+resp.status+" (percorso "+base()+"/api/config).");
   const current=await resp.json();
   setConfig(current);
   if(!current?.configured||!current.clientId)throw new Error("Il server non trova tutte le tre variabili richieste: GOOGLE_CLIENT_ID, ADMIN_EMAIL e GITHUB_TOKEN. Controlla che siano salvate nell'ambiente places-google-photos-importer.");
   await ensureGoogle();
   if(!googleClient.current||config?.clientId!==current.clientId){
    googleClient.current=window.google.accounts.oauth2.initTokenClient({
     client_id:current.clientId,scope,
     callback:r=>{
      if(!r.access_token){setStatus(r.error||"Accesso Google annullato.");return;}
      setToken(r.access_token);setStatus("Accesso eseguito. Scegli le fotografie.");
     },
     error_callback:err=>setStatus("Accesso Google interrotto: "+(err?.message||err?.type||"finestra bloccata"))
    });
   }
   googleClient.current.requestAccessToken({prompt:"consent"});
   setStatus("Si apre la finestra di autorizzazione Google. Se non compare, abilita i popup per questo sito.");
  }catch(e){setStatus("Impossibile accedere: "+e.message);}
 }
 async function choosePhotos(){
  if(!token||busy)return;
  const windowRef=window.open("about:blank","places_google_photos","popup=yes,width=1050,height=760");
  if(!windowRef){setStatus("Permetti l'apertura della finestra per Google Foto.");return;}
  setBusy(true);setReport(null);setSelected([]);
  try{
   setStatus("Creo una sessione privata su Google Foto...");
   const created=await action({action:"start"});
   session.current=created.id;
   if(!created.pickerUri)throw new Error("Google non ha restituito il link di selezione.");
   windowRef.location.href=created.pickerUri.replace(/\/$/,"")+"/autoclose";
   setStatus("Seleziona fino a 12 foto nella finestra Google Foto e premi Fine.");
   const n=parseFloat(created.pollingConfig?.pollInterval||"3s");
   const interval=Math.min(10000,Math.max(1500,(Number.isFinite(n)?n:3)*1000));
   const started=Date.now();
   while(!state.current.cancelled&&Date.now()-started<10*60*1000){
    await new Promise(resolve=>setTimeout(resolve,interval));
    const data=await action({action:"status",sessionId:session.current});
    if(data.mediaItemsSet){
      const list=await action({action:"selected",sessionId:session.current});
      setSelected(list.items||[]);
      setStatus((list.items||[]).length
        ?"Hai selezionato "+list.items.length+" immagini. Scegli la destinazione e conferma l'importazione."
        :"Non hai selezionato fotografie.");
      setBusy(false);return;
    }
   }
   throw new Error("La selezione è scaduta. Puoi riprovare.");
  }catch(e){setStatus("Selezione interrotta: "+e.message);try{windowRef.close();}catch{}}
  setBusy(false);
 }
 async function importPhotos(){
  if(!selected.length||!session.current||!token||busy)return;
  setBusy(true);setReport(null);setStatus("Importazione in corso. Non chiudere la pagina.");
  try{
   const out=await action({action:"import",sessionId:session.current,
     destination,ids:selected.map(x=>x.id)});
   setReport(out);
   setStatus("Importazione conclusa: "+out.imported+" foto nuove. Le immagini appariranno nel sito dopo la pubblicazione di GitHub Pages.");
   setSelected([]);
   session.current="";
  }catch(e){setStatus("Importazione non completata: "+e.message);}
  setBusy(false);
 }
 return <main>
  <header><strong>LM. / PLACES</strong><small>PRIVATE PHOTO IMPORTER / GOOGLE PHOTOS</small></header>
  <h1>Le tue foto.<br/>Direttamente su Places.</h1>
  <p>Seleziona le immagini da Google Foto, assegna una destinazione e pubblicale nella galleria del sito. Nessun download manuale.</p>
  <section>
   <div className="step"><span>01</span> Autorizza Google Foto</div>
   <p>L'accesso serve esclusivamente a scegliere le foto. Nessuna sincronizzazione automatica dell'intera libreria.</p>
   <div className="actions"><button onClick={signIn} disabled={busy}>{token?"Rinnova accesso Google":"Accedi con Google"}</button></div>
   <p role="status" aria-live="polite">{status}</p>
  </section>
  <section>
   <div className="step"><span>02</span> Seleziona le fotografie</div>
   <p>Si apre il selettore ufficiale di Google Foto. Per iniziare scegli al massimo 12 foto per volta.</p>
   <div className="actions"><button onClick={choosePhotos} disabled={!token||busy} className="secondary">Apri Google Foto ↗</button></div>
   {selected.length>0&&<><p><strong>{selected.length} fotografie selezionate</strong></p>
    <ol className="items">{selected.map(p=><li key={p.id}>{p.name}</li>)}</ol></>}
  </section>
  <section>
   <div className="step"><span>03</span> Importa in Places</div>
   <label htmlFor="dest">Destinazione da aggiornare</label>
   <select id="dest" value={destination} onChange={e=>setDestination(e.target.value)} disabled={busy}>
    {(config?.destinations||[]).map(d=><option key={d.value} value={d.value}>{d.label}</option>)}
   </select>
   <div className="actions"><button onClick={importPhotos} disabled={!selected.length||busy}>Importa {selected.length||""} foto nel sito</button></div>
  </section>
  <div className="status" role="status">{busy?"Elaborazione in corso...\n":""}{status}</div>
  {report&&<section><strong>Risultato</strong><ul className="items">{report.results.map((r,i)=><li key={i}>{r.name}: {r.status==="imported"?"importata":r.status==="already-present"?"già presente":r.status==="too-large"?"file troppo grande":"formato non supportato"}</li>)}</ul></section>}
  <footer>Accesso riservato al proprietario del portfolio. Le foto originali non vengono memorizzate su questa pagina; le versioni selezionate vengono pubblicate nel repository che alimenta Places.</footer>
 </main>;
}
