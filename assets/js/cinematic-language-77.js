/* PHASE 77 — CINEMATIC MOTION LANGUAGE
   One consistent graphic pulse for Home->world and all principal artwork.
   It observes original is-active/data-* state; NEVER handles clicks, focus,
   scroll or GSAP transforms. Every effect is finite and pointer-transparent. */
(() => {
  function init() {
    const reduce=window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrast=window.matchMedia("(prefers-contrast: more)");
    const available=()=>!document.hidden && !reduce.matches && !contrast.matches &&
      !document.body.classList.contains("s41-studio-focus");

    // Build ON the original gate. No duplicate full-screen transition.
    const gate=document.querySelector(".s27-sequence");
    if(gate&&!gate.classList.contains("s77-ready")){
      const aperture=document.createElement("span");
      aperture.className="s77-aperture";
      aperture.setAttribute("aria-hidden","true");
      const index=document.createElement("span");
      index.className="s77-gate-index";
      index.setAttribute("aria-hidden","true");
      const label=document.createElement("span");
      label.textContent="CHAPTER";
      index.appendChild(label);
      for(let i=0;i<4;i++){
        index.appendChild(document.createElement("i"));
      }
      gate.append(aperture,index);
      gate.classList.add("s77-ready");
    }

    const hub=document.querySelector(".world-hub");
    const stage=hub?.querySelector(".world-stage");
    if(hub&&stage&&!hub.classList.contains("s77-ready")){
      const after=document.createElement("span");
      after.className="s77-home-afterimage";
      after.setAttribute("aria-hidden","true");
      stage.prepend(after);
      hub.classList.add("s77-ready");
    }

    // A design cut on the REAL imagery of each chapter.
    // Inner experiences are included, not replaced by extra pages.
    const areas=[
      {root:".work-world",media:".work-preview",open:"is-active",state:"data-theme",stateOnMedia:true,delay:630},
      {root:".sound-world",media:".sound-art",open:"is-active",state:"data-mood",delay:630},
      {root:".p14-world",media:".p14-postcard",open:"is-active",state:"data-place",delay:630},
      {root:".a17-world",media:".a17-card",open:"is-active",state:"data-mode",delay:630},
      {root:".case-world",media:".case-visual",open:"is-active",state:"data-theme",delay:170,nested:true},
      {root:".p15-journal",media:".p15-hero-figure",open:"is-open",state:"data-place",delay:130,nested:true}
    ];
    for(const area of areas){
      const root=document.querySelector(area.root);
      const media=root?.querySelector(area.media);
      if(!root||!media||media.classList.contains("s77-hero-stage"))continue;
      const sweep=document.createElement("span");
      sweep.className="s77-optical-sweep";
      sweep.setAttribute("aria-hidden","true");
      const registration=document.createElement("span");
      registration.className="s77-register";
      registration.setAttribute("aria-hidden","true");
      media.append(sweep,registration);
      media.classList.add("s77-hero-stage");
      let wasOpen=false;
      let oldSelection="";
      let armTimer=0;
      let finishTimer=0;

      function cancel(){
        if(armTimer){clearTimeout(armTimer);armTimer=0}
        if(finishTimer){clearTimeout(finishTimer);finishTimer=0}
        media.classList.remove("s77-is-cutting");
      }

      function start(){
        armTimer=0;
        if(!available() || !root.classList.contains(area.open))return;
        if(root.inert)return;
        media.classList.remove("s77-is-cutting");
        // Only a newly created decorative element is measured.
        // No page layout or image geometry is changed.
        void sweep.offsetWidth;
        media.classList.add("s77-is-cutting");
        finishTimer=setTimeout(()=>{
          media.classList.remove("s77-is-cutting");
          finishTimer=0;
        },1050);
      }

      function synchronize(){
        const open=root.classList.contains(area.open);
        const key=(area.stateOnMedia?media:root).getAttribute(area.state)||"default";
        if(!open){
          wasOpen=false;oldSelection=key;cancel();return;
        }
        const opening=!wasOpen;
        const changed=key!==oldSelection;
        wasOpen=true;
        oldSelection=key;
        if(!opening&&!changed)return;
        cancel();
        if(!available())return;
        const delay=opening?area.delay:0;
        armTimer=setTimeout(start,delay);
      }
      const onRoot=new MutationObserver(synchronize);
      onRoot.observe(root,{
        attributes:true,
        attributeFilter:area.stateOnMedia?["class"]:["class",area.state]
      });
      if(area.stateOnMedia){
        new MutationObserver(synchronize).observe(media,{
          attributes:true,attributeFilter:[area.state]
        });
      }
      const quiet=()=>{
        if(!available())cancel();
      };
      document.addEventListener("visibilitychange",quiet);
      reduce.addEventListener?.("change",quiet);
      contrast.addEventListener?.("change",quiet);
      synchronize();
    }
  }
  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();