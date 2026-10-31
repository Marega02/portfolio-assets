/* STEP 31 — LIVE DOSSIER
 * HOME-only scene preview, synced with existing scene handlers.
 * No changes to GSAP, page transitions, or World Index.
 */
(() => {
  function init(){
    const hub=document.querySelector(".world-hub");
    const main=hub?.querySelector(".world-main");
    const stage=hub?.querySelector(".world-stage");
    const links=hub?[...hub.querySelectorAll(".world-link")]:[];
    if(!hub||!main||!stage||links.length!==4||hub.classList.contains("s31-ready"))return;
    const scenes=[
      {key:"work",label:"WORK",verb:"MAKE IT",accent:"MATTER.",desc:"Selected websites, visual systems and digital experiences built with intention."},
      {key:"sound",label:"SOUND",verb:"FEEL THE",accent:"FREQUENCY.",desc:"An archive of music, rhythm and the sounds that shape my creative world."},
      {key:"places",label:"PLACES",verb:"GO BEYOND",accent:"THE MAP.",desc:"Three destinations, collected impressions and stories from the road."},
      {key:"about",label:"ABOUT",verb:"MEET THE",accent:"HUMAN.",desc:"The curiosity, personality and ideas behind everything I create."}
    ];
    const spotlight=document.createElement("div");
    spotlight.className="s31-spotlight";
    spotlight.setAttribute("aria-hidden","true");
    hub.prepend(spotlight);
    const dossier=document.createElement("section");
    dossier.className="s31-dossier";
    dossier.setAttribute("aria-label","Explore the four creative worlds");
    dossier.innerHTML=[
      '<div class="s31-head"><span class="s31-live">LIVE DOSSIER / OPEN</span><span class="s31-scene-counter">01 / 04</span></div>',
      '<div class="s31-message" aria-live="polite" aria-atomic="true"><h2 class="s31-headline"><span>MAKE IT</span> <em>MATTER.</em></h2><p class="s31-summary">Selected websites, visual systems and digital experiences built with intention.</p></div>',
      '<div class="s31-actions"><button class="s31-next" type="button">NEXT SCENE <span aria-hidden="true">↗</span></button><button class="s31-enter" type="button">ENTER <span class="s31-enter-label">WORK</span> <span aria-hidden="true">→</span></button></div>',
      '<div class="s31-track" aria-hidden="true"><i class="is-current"></i><i></i><i></i><i></i></div>'
    ].join("");
    main.appendChild(dossier);
    const headline=dossier.querySelector(".s31-headline span");
    const accent=dossier.querySelector(".s31-headline em");
    const summary=dossier.querySelector(".s31-summary");
    const counter=dossier.querySelector(".s31-scene-counter");
    const enterLabel=dossier.querySelector(".s31-enter-label");
    const next=dossier.querySelector(".s31-next");
    const enter=dossier.querySelector(".s31-enter");
    const ticks=[...dossier.querySelectorAll(".s31-track i")];
    let current=0;
    function render(index){
      if(index<0||index>=scenes.length)return;
      current=index;
      const s=scenes[index];
      hub.dataset.s31Scene=s.key;
      headline.textContent=s.verb;
      accent.textContent=s.accent;
      summary.textContent=s.desc;
      counter.textContent=String(index+1).padStart(2,"0")+" / 04";
      enterLabel.textContent=s.label;
      ticks.forEach((tick,i)=>tick.classList.toggle("is-current",i===index));
      links.forEach((link,i)=>link.classList.toggle("is-s31-current",i===index));
    }
    // Keep the original HOME, SIGNAL and METAMORPHOSIS listeners in charge
    // of scene artwork by dispatching the same focusin event they already use.
    function select(index){
      render(index);
      links[index].dispatchEvent(new Event("focusin",{bubbles:true}));
    }
    links.forEach((link,i)=>{
      link.addEventListener("pointerenter",()=>render(i),{passive:true});
      link.addEventListener("focusin",()=>render(i));
      link.addEventListener("pointerdown",()=>render(i),{passive:true});
    });
    next.addEventListener("click",()=>select((current+1)%scenes.length));
    enter.addEventListener("click",()=>links[current].click());
    const finePointer=window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if(finePointer&&!reducedMotion){
      let frame=0;
      hub.addEventListener("pointermove",ev=>{
        if(frame)return;
        const r=hub.getBoundingClientRect();
        const x=((ev.clientX-r.left)/r.width*100).toFixed(1)+"%";
        const y=((ev.clientY-r.top)/r.height*100).toFixed(1)+"%";
        frame=requestAnimationFrame(()=>{
          spotlight.style.setProperty("--s31-x",x);
          spotlight.style.setProperty("--s31-y",y);
          frame=0;
        });
      },{passive:true});
    }
    render(0);
    hub.classList.add("s31-ready");
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();