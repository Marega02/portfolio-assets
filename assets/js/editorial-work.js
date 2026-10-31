/* STEP 23 — WORK EDITORIAL LAYER
 * Non-destructive enhancement, no changes to existing project listeners.
 */
(() => {
  function init(){
    const work=document.querySelector(".work-world");
    if(!work||work.classList.contains("s23-ready"))return;
    const top=work.querySelector(".work-top");
    const main=work.querySelector(".work-main");
    const preview=work.querySelector(".work-preview");
    const projects=[...work.querySelectorAll(".work-project")];
    const list=work.querySelector(".work-projects");
    if(!top||!main||!preview||projects.length!==3||!list)return;

    const back=top.querySelector(".work-back");
    const edition=document.createElement("span");
    edition.className="s23-top-edition";
    edition.textContent="EDITION 001 / SELECTED EXPERIENCES";
    if(back)top.insertBefore(edition,back);
    else top.appendChild(edition);

    const hero=document.createElement("div");
    hero.className="s23-hero-index";
    hero.setAttribute("aria-hidden","true");
    hero.textContent="W.";
    main.appendChild(hero);

    const decor=document.createElement("div");
    decor.className="s23-preview-decor";
    decor.setAttribute("aria-hidden","true");
    preview.prepend(decor);
    const coordinates=document.createElement("span");
    coordinates.className="s23-preview-coordinates";
    coordinates.setAttribute("aria-hidden","true");
    coordinates.textContent="LM / CASE FILE 001";
    preview.appendChild(coordinates);

    const cue=document.createElement("div");
    cue.className="s23-project-cue";
    cue.setAttribute("aria-hidden","true");
    cue.textContent="01 / 03 — SELECT AN EXPERIENCE";
    const track=document.createElement("div");
    track.className="s23-progress";
    track.setAttribute("aria-hidden","true");
    const bar=document.createElement("div");
    bar.className="s23-progress-bar";
    track.appendChild(bar);
    // Avoid introducing extra children to .work-projects, as its layout relies on three items.
    preview.appendChild(track);
    preview.appendChild(cue);
    const names=["RED HOUSE STUDIO","SOČA VALLEY","TRATTORIA DA GIANNI"];
    function sync(){
      const current=projects.findIndex(x=>x.classList.contains("is-current"));
      const idx=current<0?0:current;
      coordinates.textContent="LM / CASE FILE 00"+(idx+1);
      cue.textContent="0"+(idx+1)+" / 03 — "+names[idx];
      bar.style.transform="scaleX("+((idx+1)/3).toFixed(6)+")";
    }
    projects.forEach((p,i)=>{
      p.addEventListener("pointerenter",()=>{ if(!p.classList.contains("is-current"))return;sync();},{passive:true});
      p.addEventListener("focusin",sync);
    });
    const observer=new MutationObserver(sync);
    projects.forEach(p=>observer.observe(p,{attributes:true,attributeFilter:["class"]}));
    sync();
    work.classList.add("s23-ready");
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();
