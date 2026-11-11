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
    .then(r=>r.json()).then(data=>{
       setConfig(data);
       setStatus(data.configured
         ?"Pronto. Accedi con Google per selezionare le tue foto."
         :"Configurazione privata richiesta: apri il file README del progetto.");
    }).catch(()=>setStatus("Impossibile leggere la configurazione."));
  const script=document.createElement("script");
  script.src="https://accounts.google.com/gsi/client";
  script.async=true;
  script.onload=()=>setGisReady(true);
  document.head.appendChild(script);
  return()=>{state.current.cancelled=true;script.remove();};
 },[]);
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
 function signIn(){
  if(!window.google?.accounts?.oauth2||!config?.clientId){
   setStatus("Google non è ancora disponibile.");return;
  }
  try{
   if(!googleClient.current){
    googleClient.current=window.google.accounts.oauth2.initTokenClient({
      client_id:config.clientId,scope,
      callback:r=>{
       if(!r.access_token){
        setStatus(r.error||"Accesso Google annullato.");return;
       }
       setToken(r.access_token);setStatus("Accesso eseguito. Scegli le fotografie.");
      },
      error_callback:()=>setStatus("Accesso Google interrotto o finestra bloccata.")
    });
   }
   googleClient.current.requestAccessToken({prompt:"consent"});
  }catch(e){setStatus("Errore di accesso: "+e.message);}
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
   <div className="actions"><button onClick={signIn} disabled={!config?.configured||!gisReady||busy}>{token?"Rinnova accesso Google":"Accedi con Google"}</button></div>
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
