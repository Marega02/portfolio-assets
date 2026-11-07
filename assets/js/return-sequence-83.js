/* PHASE 83 — RETURN SEQUENCE
   Observes original world close states and reuses STEP 63's
   s63-returning event. No new animations on scene roots, no navigation
   changes, no timers, no listener on buttons, no stage transforms.
   Reuses the original STEP 82 SVG signatures; nothing fetched. */
(() => {
  function init() {
    const hub=document.querySelector(".world-hub");
    const stage=hub?.querySelector(".world-stage");
    const sheet=stage?.querySelector(".stage-sheet");
    const gate=document.querySelector(".s27-sequence.s82-ready");
    const signatures=gate?.querySelector(".s82-signatures");
    if(!hub||!stage||!sheet||!signatures||hub.dataset.s83Ready==="1")return;

    const chapters=[
      {name:"work",selector:".work-world",number:"01",label:"WORK"},
      {name:"sound",selector:".sound-world",number:"02",label:"SOUND"},
      {name:"places",selector:".p14-world",number:"03",label:"PLACES"},
      {name:"about",selector:".a17-world",number:"04",label:"ABOUT"}
    ];
    const roots=chapters.map(c=>document.querySelector(c.selector));
    if(roots.some(root=>!root))return;
    const svgSources=chapters.map(c=>
      signatures.querySelector('.s82-signature[data-s82="'+c.name+'"] svg'));
    if(svgSources.some(svg=>!svg))return;

    const foil=document.createElement("div");
    foil.className="s83-return-foil";
    foil.setAttribute("aria-hidden","true");
    for(let i=0;i<chapters.length;i++){
      const svg=svgSources[i].cloneNode(true);
      svg.classList.add("s83-return-art");
      svg.dataset.s83Art=chapters[i].name;
      svg.setAttribute("focusable","false");
      svg.setAttribute("aria-hidden","true");
      foil.appendChild(svg);
    }
    const returnLabel=document.createElement("div");
    returnLabel.className="s83-return-label";
    returnLabel.setAttribute("aria-hidden","true");
    const labelLine=document.createElement("i");
    const labelText=document.createElement("span");
    returnLabel.append(labelLine,labelText);
    const paper=document.createElement("span");
    paper.className="s83-paper-return";
    paper.setAttribute("aria-hidden","true");

    stage.prepend(foil);
    stage.appendChild(returnLabel);
    sheet.appendChild(paper);

    const previous=roots.map(root=>root.classList.contains("is-active"));
    let lastOrigin=null;

    function allClosed(){
      return roots.every(root=>!root.classList.contains("is-active")) &&
        !document.querySelector(".case-world.is-active,.sound-archive.is-open,.p15-journal.is-open");
    }
    function setOrigin(chapter){
      lastOrigin=chapter;
      hub.dataset.s83From=chapter.name;
      labelText.textContent=chapter.number+" / "+chapter.label+"  →  00 / HOME";
    }
    function clearOrigin(){
      lastOrigin=null;
      hub.removeAttribute("data-s83-from");
      labelText.textContent="";
    }

    roots.forEach((root,i)=>{
      new MutationObserver(()=>{
        const isOpen=root.classList.contains("is-active");
        if(isOpen===previous[i])return;
        previous[i]=isOpen;
        if(isOpen){
          // A direct world-to-world transition must never show a
          // spurious Home return signature.
          clearOrigin();
        } else if(allClosed()){
          // The old s63 controller will start its return in 130ms.
          // We only select the existing art and let that event play.
          setOrigin(chapters[i]);
        }
      }).observe(root,{attributes:true,attributeFilter:["class"]});
    });

    let wasReturning=hub.classList.contains("s63-returning");
    new MutationObserver(()=>{
      const returning=hub.classList.contains("s63-returning");
      if(returning&&!wasReturning && (!lastOrigin||!allClosed())){
        // If another controller begins a world immediately, the
        // old s63 effect may be suppressed; leave no stale identity.
        clearOrigin();
      }
      wasReturning=returning;
    }).observe(hub,{attributes:true,attributeFilter:["class"]});

    hub.dataset.s83Ready="1";
    hub.classList.add("s83-ready");
    gate.classList.add("s83-ready");
  }
  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();