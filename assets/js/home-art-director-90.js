/* PHASE 90 — OPTIMIZED ART DIRECTOR (REPLACES PHASE 87 JS)
   Retains original camera, editorial art direction and copy, but removes
   the additional scroll/resize/pointer animation loop. The optimized
   Phase 88 coordinator becomes the sole input/update loop. */
(() => {
  function init(){
    const hub=document.querySelector(".world-hub.s86-ready");
    const experience=hub?.querySelector(".s86-experience");
    const scroll=experience?.querySelector(".s86-scroll");
    const slides=[...(scroll?.querySelectorAll(".s86-slide")||[])];
    const keyOrder=["work","sound","places","about"];
    if(!hub||!experience||!scroll||slides.length!==4||
       slides.some((s,i)=>s.dataset.s86Scene!==keyOrder[i] ||
         !s.querySelector(".s86-visual .s86-artwork") ||
         !s.querySelector(".s86-slide-content .world-link"))||
       hub.dataset.s87Ready==="1")return;

    // Preflight every native chapter link before any reparenting.
    if(slides.some(slide=>!slide.querySelector(".world-link .world-description") ||
      !slide.querySelector(".world-link .s86-enter")))return;

    const types={
      work:{
        subtitle:"Selected websites, built with character and intention.",
        action:"ENTER WORK",
        folio:["01 / DESIGN","SELECTED DIGITAL PROJECTS","Web design  ·  Motion  ·  Interaction"]
      },
      sound:{
        subtitle:"A personal archive of the sounds that stay with me.",
        action:"ENTER SOUND",
        folio:["02 / RHYTHM","ANALOG FREQUENCIES","Soul  ·  Hip-hop  ·  Alternative"]
      },
      places:{
        subtitle:"Landscapes, cities and stories from the road.",
        action:"ENTER PLACES",
        folio:["03 / EXPLORATION","A PERSONAL TRAVEL ATLAS","Soča  ·  London  ·  Kuala Lumpur"]
      },
      about:{
        subtitle:"The person, ideas and curiosities behind the work.",
        action:"ENTER ABOUT",
        folio:["04 / IDENTITY","THE CREATIVE UNIVERSE","Make  ·  Listen  ·  Wander"]
      }
    };

    for(let i=0;i<slides.length;i++){
      const slide=slides[i],key=keyOrder[i],data=types[key];
      const visual=slide.querySelector(".s86-visual");
      const art=visual.querySelector(".s86-artwork");
      const link=slide.querySelector(".world-link");
      const description=link.querySelector(".world-description");
      const cue=link.querySelector(".s86-enter");
      if(!description||!cue)return;

      // Material depth only: the art is wrapped, never replaced.
      const camera=document.createElement("div");
      camera.className="s87-camera";
      camera.setAttribute("aria-hidden","true");
      art.before(camera);
      camera.appendChild(art);

      const ambient=document.createElement("div");
      ambient.className="s87-atmosphere";
      ambient.setAttribute("aria-hidden","true");
      visual.appendChild(ambient);

      const exposure=document.createElement("span");
      exposure.className="s87-exposure";
      exposure.setAttribute("aria-hidden","true");
      visual.appendChild(exposure);

      // A piece of editorial context beside the IMAGE, not a button.
      const label=document.createElement("div");
      label.className="s87-gallery-mark";
      label.setAttribute("aria-hidden","true");
      const index=document.createElement("span");
      index.className="s87-gallery-mark-index";
      index.textContent=data.folio[0];
      const main=document.createElement("span");
      main.className="s87-gallery-mark-main";
      main.textContent=data.folio[1];
      const secondary=document.createElement("span");
      secondary.className="s87-gallery-mark-secondary";
      secondary.textContent=data.folio[2];
      label.append(index,main,secondary);
      slide.appendChild(label);

      // Better copy and ONE straightforward action in the original link.
      description.textContent=data.subtitle;
      const first=cue.firstChild;
      if(first&&first.nodeType===Node.TEXT_NODE)first.textContent=data.action+"  ";
      else cue.prepend(document.createTextNode(data.action+"  "));
    }

    // The existing four rail ticks receive labels for orientation,
    // but remain purely VISUAL (not another navigation menu).
    const rail=[...(experience.querySelector(".s86-corner")?.children||[])];
    if(rail.length===4){
      rail.forEach((tick,i)=>{
        const name=document.createElement("span");
        name.className="s87-rail-name";
        name.textContent=keyOrder[i].toUpperCase();
        tick.appendChild(name);
      });
    }
    const hint=experience.querySelector(".s86-scroll-hint");
    const cameras=slides.map(slide=>slide.querySelector(".s87-camera"));
    let index=0;
    function syncScene(){
      const key=hub.dataset.s86Scene||"work";
      const i=keyOrder.indexOf(key);
      if(i<0)return;
      if(i!==index){
        cameras[index]?.style.setProperty("--s87-pointer-x","0px");
        cameras[index]?.style.setProperty("--s87-pointer-y","0px");
        index=i;
      }
      if(hint)hint.textContent=index===3?"SCROLL UP TO REVISIT":"SCROLL TO DISCOVER";
    }
    new MutationObserver(syncScene).observe(hub,{
      attributes:true,
      attributeFilter:["data-s86-scene"]
    });

    // PHASE 90 PERFORMANCE: the scroll and pointer controllers that
    // used to live here have been removed. Scene identity and original
    // captions are still handled here. A SINGLE scroll coordinator runs
    // after the phase-88 SVG structure has been mounted.
    hub.dataset.s87Ready="1";
    hub.classList.add("s87-ready");
    syncScene();
  }
  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();