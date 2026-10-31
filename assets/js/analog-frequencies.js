/* STEP 24 — ANALOG FREQUENCIES. Visual-only; no audio or altered open/back handlers. */
(() => {
  function init(){
    const sound=document.querySelector(".sound-world");
    const art=sound?.querySelector(".sound-art");
    const copy=sound?.querySelector(".sound-copy");
    const top=sound?.querySelector(".sound-top");
    const archive=sound?.querySelector(".sound-archive");
    const cover=archive?.querySelector(".sa-art");
    const feature=archive?.querySelector(".sa-feature");
    const moodButtons=sound?[...sound.querySelectorAll(".sound-mood")]:[];
    if(!sound||!art||!copy||!top||!archive||!cover||!feature||moodButtons.length!==3||sound.classList.contains("s24-ready"))return;
    const edition=document.createElement("span");
    edition.className="s24-edition";
    edition.textContent="ARCHIVE EDITION / 002";
    const back=top.querySelector(".sound-back");
    if(back)top.insertBefore(edition,back);else top.append(edition);
    const spectrum=document.createElement("div");
    spectrum.className="s24-current-spectrum";
    spectrum.setAttribute("aria-hidden","true");
    const label=document.createElement("span");
    label.className="s24-spectrum-label";
    label.innerHTML="<strong>SIGNAL / SOUL</strong><small>ANALOG IMPRESSION · 33⅓ RPM</small>";
    const bars=document.createElement("span");
    bars.className="s24-spectrum";
    const seeds=[19,32,45,27,54,73,45,64,28,37,75,92,60,46,75,36,51,68,31,58,42,24,46,77,35,64,41,29];
    for(const height of seeds){
      const el=document.createElement("i");
      el.style.setProperty("--s24-height",height+"%");
      bars.append(el);
    }
    spectrum.append(label,bars);
    const archiveButton=copy.querySelector(".sound-enter-archive");
    if(archiveButton)copy.insertBefore(spectrum,archiveButton);else copy.append(spectrum);
    const ring=document.createElement("div");
    ring.className="s24-technical-ring";
    ring.setAttribute("aria-hidden","true");
    const stamp=document.createElement("div");
    stamp.className="s24-side-stamp";
    stamp.setAttribute("aria-hidden","true");
    stamp.innerHTML="REFERENCE <b>001</b> / 003";
    const counter=document.createElement("div");
    counter.className="s24-counter";
    counter.setAttribute("aria-hidden","true");
    counter.innerHTML="<strong>01</strong><small>SELECT YOUR FREQUENCY</small>";
    art.prepend(ring,stamp,counter);
    const overlay=document.createElement("div");
    overlay.className="s24-art-overlay";
    overlay.setAttribute("aria-hidden","true");
    cover.prepend(overlay);
    const folio=document.createElement("div");
    folio.className="s24-record-folio";
    folio.setAttribute("aria-hidden","true");
    folio.innerHTML="<span>FIELD NOTES / VOL. 01</span><b>01 / 03</b>";
    const detail=feature.querySelector(".sa-detail");
    if(detail)feature.insertBefore(folio,detail);else feature.append(folio);

    const moodNames={soul:"SOUL",hiphop:"HIP-HOP",alternative:"ALTERNATIVE"};
    const moodNums={soul:1,hiphop:2,alternative:3};
    const strong=label.querySelector("strong");
    const digit=counter.querySelector("strong");
    const folioNum=folio.querySelector("b");
    const artHeader=cover.querySelector(".sa-art-top");
    function sync(){
      const mood=sound.dataset.mood||"soul";
      const n=moodNums[mood]||1;
      strong.textContent="SIGNAL / "+(moodNames[mood]||"SOUL");
      digit.textContent=String(n).padStart(2,"0");
      stamp.innerHTML="REFERENCE <b>"+String(n).padStart(3,"0")+"</b> / 003";
      bars.querySelectorAll("i").forEach((bar,i)=>{
        let factor=mood==="hiphop"?((i*7+13)%21):mood==="alternative"?((i*11+5)%19):0;
        const height=Math.max(12,Math.min(95,seeds[i]+factor-(mood==="hiphop"?7:3)));
        bar.style.setProperty("--s24-height",height+"%");
      });
      const selected=archive.querySelector(".sa-item.is-selected");
      if(selected){
        const id=selected.dataset.record;
        folioNum.textContent=String(moodNums[id]||1).padStart(2,"0")+" / 03";
      }
    }
    const observer=new MutationObserver(sync);
    observer.observe(sound,{attributes:true,attributeFilter:["data-mood"]});
    archive.querySelectorAll(".sa-item").forEach(btn=>observer.observe(btn,{attributes:true,attributeFilter:["class"]}));
    sync();
    sound.classList.add("s24-ready");
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();