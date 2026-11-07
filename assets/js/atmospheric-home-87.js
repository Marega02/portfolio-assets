/* PHASE 87 — ATMOSPHERIC DEPTH / HOME DIRECTOR'S CUT
   A second, art-directed layer for the successful Phase 86 Home.
   One scroll listener (passive and rAF-throttled), one optional pointer
   listener for fine pointers, and the existing scene attribute.
   Original Webflow links stay where Phase 86 put them. Navigation and
   every world controller remain untouched. */
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

    const cameras=[];
    const ambientLayers=[];
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
      cameras.push(camera);

      const ambient=document.createElement("div");
      ambient.className="s87-atmosphere";
      ambient.setAttribute("aria-hidden","true");
      visual.appendChild(ambient);
      ambientLayers.push(ambient);

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
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrast=window.matchMedia("(prefers-contrast: more)");
    const precise=window.matchMedia("(hover:hover) and (pointer:fine)");
    const hint=experience.querySelector(".s86-scroll-hint");
    const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
    const enabled=()=>!hub.inert&&!document.hidden&&!reduced.matches&&!contrast.matches;

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

    let scrollFrame=0;
    function updateScroll(){
      scrollFrame=0;
      if(!enabled())return;
      const height=Math.max(1,scroll.clientHeight);
      const position=scroll.scrollTop/height;
      for(let i=0;i<4;i++){
        const delta=position-i;
        if(Math.abs(delta)>1.45)continue;
        // Scroll drives the camera while the original SVG's
        // independent entrance animation remains unmodified.
        const y=clamp(-delta*49,-58,58);
        const scale=(1.034+Math.min(1,Math.abs(delta))*.046).toFixed(4);
        cameras[i].style.setProperty("--s87-scroll-y",y.toFixed(1)+"px");
        cameras[i].style.setProperty("--s87-scale",scale);
      }
    }
    function scheduleScroll(){
      if(!scrollFrame)scrollFrame=requestAnimationFrame(updateScroll);
    }
    scroll.addEventListener("scroll",scheduleScroll,{passive:true});

    let pointerFrame=0;
    let px=0,py=0;
    function updatePointer(){
      pointerFrame=0;
      if(!enabled()||!precise.matches)return;
      const width=Math.max(1,experience.clientWidth);
      const height=Math.max(1,experience.clientHeight);
      const nx=clamp(px/width,0,1),ny=clamp(py/height,0,1);
      // Optical camera follows the hand by just 10–14px, not a
      // dizzying 3D tilt. Content and links never move with it.
      const cx=(nx-.5)*20;
      const cy=(ny-.5)*14;
      cameras[index].style.setProperty("--s87-pointer-x",cx.toFixed(1)+"px");
      cameras[index].style.setProperty("--s87-pointer-y",cy.toFixed(1)+"px");
      ambientLayers[index].style.setProperty("--s87-glow-x",(40+nx*52).toFixed(1)+"%");
      ambientLayers[index].style.setProperty("--s87-glow-y",(20+ny*58).toFixed(1)+"%");
    }
    experience.addEventListener("pointermove",event=>{
      if(!enabled()||!precise.matches)return;
      px=event.clientX;py=event.clientY;
      if(!pointerFrame)pointerFrame=requestAnimationFrame(updatePointer);
    },{passive:true});
    experience.addEventListener("pointerleave",()=>{
      const current=cameras[index];
      if(current){
        current.style.setProperty("--s87-pointer-x","0px");
        current.style.setProperty("--s87-pointer-y","0px");
      }
    });
    function quiet(){
      if(!enabled()){
        if(scrollFrame)cancelAnimationFrame(scrollFrame);
        if(pointerFrame)cancelAnimationFrame(pointerFrame);
        scrollFrame=0;pointerFrame=0;
        for(const camera of cameras){
          camera.style.removeProperty("--s87-scroll-y");
          camera.style.removeProperty("--s87-scale");
          camera.style.removeProperty("--s87-pointer-x");
          camera.style.removeProperty("--s87-pointer-y");
        }
      }else scheduleScroll();
    }
    document.addEventListener("visibilitychange",quiet);
    reduced.addEventListener?.("change",quiet);
    contrast.addEventListener?.("change",quiet);
    window.addEventListener("resize",scheduleScroll,{passive:true});

    hub.dataset.s87Ready="1";
    hub.classList.add("s87-ready");
    syncScene();
    scheduleScroll();
  }
  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();