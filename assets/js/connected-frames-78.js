/* PHASE 78 — CONNECTED FRAMES
   Extends the existing desktop shared-element morph from STEP 10.
   Never creates a competing image clone or intercepts user navigation.
   On tablet/mobile, original slide remains + matching ambient entrance. */
(() => {
  function init() {
    const work=document.querySelector(".work-world");
    const caseWorld=document.querySelector(".case-world");
    const preview=work?.querySelector(".work-preview");
    const rows=[...(work?.querySelectorAll(".work-project")||[])];
    const caseHero=caseWorld?.querySelector(".case-hero");
    if(!work||!caseWorld||!preview||!caseHero||rows.length!==3 ||
       work.dataset.s78Ready==="1")return;

    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrast=window.matchMedia("(prefers-contrast: more)");
    const canAnimate=()=>!reduced.matches&&!contrast.matches&&!document.hidden;
    work.dataset.s78Ready="1";
    work.classList.add("s78-ready");
    caseWorld.classList.add("s78-ready");

    const returnSignal=document.createElement("span");
    returnSignal.className="s78-return-signal";
    returnSignal.setAttribute("aria-hidden","true");
    preview.appendChild(returnSignal);

    rows.forEach(row=>{
      if(row.querySelector(":scope > .s78-row-rule"))return;
      const rule=document.createElement("span");
      rule.className="s78-row-rule";
      rule.setAttribute("aria-hidden","true");
      row.appendChild(rule);
    });

    // STEP 10 already produces a temporary image element and animates it
    // via GSAP. Enrich THAT element; there is never a second floating photo.
    function decorateMorph(node) {
      if(!node||!node.isConnected||node.classList.contains("s78-morph"))return;
      if(!canAnimate())return;
      node.classList.add("s78-morph");
      node.dataset.s78Theme=preview.dataset.theme||"redhouse";
      const light=document.createElement("span");
      light.className="s78-morph-light";
      light.setAttribute("aria-hidden","true");
      const rail=document.createElement("span");
      rail.className="s78-morph-rail";
      rail.setAttribute("aria-hidden","true");
      node.append(light,rail);
    }

    // Body direct children only; no observer in the whole DOM subtree.
    const morphObserver=new MutationObserver(records=>{
      for(const rec of records) {
        for(const node of rec.addedNodes) {
          if(node.nodeType===1 && node.matches?.(".project-morph-frame")){
            decorateMorph(node);
          }
        }
      }
    });
    morphObserver.observe(document.body,{childList:true});
    decorateMorph(document.querySelector("body > .project-morph-frame"));

    let wasOpen=caseWorld.classList.contains("is-active");
    let arrivalTimer=0,returnTimer=0;
    function clearArrival(){
      if(arrivalTimer){clearTimeout(arrivalTimer);arrivalTimer=0}
      caseWorld.classList.remove("s78-arriving");
    }
    function clearReturn(){
      if(returnTimer){clearTimeout(returnTimer);returnTimer=0}
      preview.classList.remove("s78-returning");
    }
    function onCaseChange(){
      const open=caseWorld.classList.contains("is-active");
      if(open===wasOpen)return;
      wasOpen=open;
      if(open){
        clearReturn();
        clearArrival();
        caseWorld.classList.remove("s78-settled");
        if(!canAnimate()){
          caseWorld.classList.add("s78-settled");
          return;
        }
        // A frame-driven ambient reveal can accompany either the original
        // mobile slide OR the existing desktop GSAP image morph.
        caseWorld.classList.add("s78-arriving");
        arrivalTimer=setTimeout(()=>{
          caseWorld.classList.remove("s78-arriving");
          caseWorld.classList.add("s78-settled");
          arrivalTimer=0;
        },1500);
      } else {
        clearArrival();
        caseWorld.classList.remove("s78-settled");
        if(!canAnimate() || !work.classList.contains("is-active"))return;
        clearReturn();
        // One visual signal when arriving back at Work, without
        // touching the focus restoration implemented in STEP 55.
        preview.classList.add("s78-returning");
        returnTimer=setTimeout(()=>{
          preview.classList.remove("s78-returning");
          returnTimer=0;
        },900);
      }
    }
    new MutationObserver(onCaseChange).observe(caseWorld,{
      attributes:true,attributeFilter:["class"]
    });

    function quiet(){
      if(canAnimate())return;
      clearArrival();
      clearReturn();
    }
    document.addEventListener("visibilitychange",quiet);
    reduced.addEventListener?.("change",quiet);
    contrast.addEventListener?.("change",quiet);
  }
  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();