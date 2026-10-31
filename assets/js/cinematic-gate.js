/* STEP 27 — CINEMATIC CHAPTER GATE
   Passive decorative overlay synchronized with existing world class changes.
   Never intercepts clicks, focus, Escape, navigation or GSAP.
*/
(() => {
  function init() {
    const specs=[
      {scene:"work",selector:".work-world",number:"01",title:"WORK",sub:"DESIGNED EXPERIENCES",tag:"ART DIRECTION / THE MAKER"},
      {scene:"sound",selector:".sound-world",number:"02",title:"SOUND",sub:"ANALOG FREQUENCIES",tag:"THE LISTENER / THE RECORD"},
      {scene:"places",selector:".p14-world",number:"03",title:"PLACES",sub:"THE LIVING ATLAS",tag:"THE WANDERER / FIELD NOTES"},
      {scene:"about",selector:".a17-world",number:"04",title:"ABOUT",sub:"THE HUMAN SIDE",tag:"THE HUMAN / PERSONAL NOTES"}
    ];
    const roots=specs.map(spec=>document.querySelector(spec.selector));
    if(roots.some(root=>!root)||document.querySelector(".s27-sequence"))return;
    const media=window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const overlay=document.createElement("div");
    overlay.className="s27-sequence";
    overlay.setAttribute("aria-hidden","true");
    overlay.setAttribute("inert","");
    overlay.innerHTML=[
      '<div class="s27-gate s27-gate-left"></div>',
      '<div class="s27-gate s27-gate-right"></div>',
      '<div class="s27-scan"></div>',
      '<div class="s27-grain"></div>',
      '<span class="s27-ghost">01</span>',
      '<div class="s27-inner"><div class="s27-topline"><span>LM® / A PERSONAL UNIVERSE</span><span>CHAPTER 01 / 04</span></div>',
      '<p class="s27-eyebrow">ART DIRECTION / THE MAKER</p>',
      '<span class="s27-title">WORK<em>01.</em></span>',
      '<div class="s27-subline"><span>DESIGNED EXPERIENCES</span><span>ENTERING A NEW WORLD / LM®</span></div></div>',
      '<div class="s27-beam"></div>'
    ].join("");
    document.body.appendChild(overlay);
    const ghost=overlay.querySelector(".s27-ghost");
    const eyebrow=overlay.querySelector(".s27-eyebrow");
    const headline=overlay.querySelector(".s27-title");
    const topline=overlay.querySelector(".s27-topline span:last-child");
    const subline=overlay.querySelector(".s27-subline span:first-child");
    let cleanup=null;
    let playing=-1;
    const seen=roots.map(root=>root.classList.contains("is-active"));
    function clearGate() {
      if(cleanup!==null){window.clearTimeout(cleanup);cleanup=null;}
      overlay.classList.remove("is-playing");
      playing=-1;
    }
    function play(index){
      if(media?.matches || document.hidden)return;
      const spec=specs[index];
      if(!spec)return;
      clearGate();
      overlay.dataset.scene=spec.scene;
      ghost.textContent=spec.number;
      eyebrow.textContent=spec.tag;
      headline.innerHTML=spec.title+"<em>"+spec.number+".</em>";
      topline.textContent="CHAPTER "+spec.number+" / 04";
      subline.textContent=spec.sub;
      // Force a fresh entrance animation on rapid world changes.
      void overlay.offsetWidth;
      overlay.classList.add("is-playing");
      playing=index;
      cleanup=window.setTimeout(clearGate,1200);
    }
    roots.forEach((root,index)=>{
      const observer=new MutationObserver(()=>{
        const active=root.classList.contains("is-active");
        if(active && !seen[index])play(index);
        if(!active && seen[index] && playing===index)clearGate();
        seen[index]=active;
      });
      observer.observe(root,{attributes:true,attributeFilter:["class"]});
    });
    document.addEventListener("visibilitychange",()=>{if(document.hidden)clearGate()});
    if(media?.addEventListener)media.addEventListener("change",()=>{if(media.matches)clearGate()});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();