/* STEP 75 — CONTINUOUS ATLAS
   Reuse the *existing* STEP 70 illustrations inside the Travel Journal.
   No external media, altered routes, focus handlers, controls, or photos.
   All original SVGs and photographic IMG elements stay available. */
(() => {
  function init() {
    const atlas=document.querySelector(".p14-world");
    const journal=document.querySelector(".p15-journal");
    const hero=journal?.querySelector(".p15-hero-visual");
    const first=journal?.querySelector(".p15-shot-a .p15-fallback");
    const second=journal?.querySelector(".p15-shot-b .p15-fallback");
    const heroFigure=journal?.querySelector(".p15-hero-figure");
    if(!atlas?.classList.contains("s70-ready") ||
       !journal || !hero || !first || !second || !heroFigure ||
       journal.dataset.s75Ready==="1") return;

    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
    const places=new Set(["soca","london","kl"]);
    const imageTargets=[
      {node:hero,slot:"hero"},
      {node:first,slot:"a"},
      {node:second,slot:"b"}
    ];
    function replaceReferences(svg,prefix) {
      const ids=new Map();
      svg.querySelectorAll("[id]").forEach(node=>{
        const previous=node.id;
        const next=prefix+previous;
        ids.set(previous,next);
        node.id=next;
      });
      if(!ids.size)return;
      const elements=[svg,...svg.querySelectorAll("*")];
      for(const node of elements){
        for(const attr of [...node.attributes]){
          let value=attr.value;
          value=value.replace(/url\(#([^)]+)\)/g,(full,key)=>
            ids.has(key)?"url(#"+ids.get(key)+")":full
          );
          if((attr.name==="href"||attr.name==="xlink:href")&&value.startsWith("#")){
            const key=value.slice(1);
            if(ids.has(key))value="#"+ids.get(key);
          }
          if(value!==attr.value)node.setAttribute(attr.name,value);
        }
      }
    }
    function cloneIllustration(key,slot) {
      const source=atlas.querySelector(
        '.s70-worldview[data-s70-scene="'+key+'"] svg'
      );
      if(!source)return null;
      const svg=source.cloneNode(true);
      svg.setAttribute("aria-hidden","true");
      svg.removeAttribute("role");
      svg.removeAttribute("aria-label");
      svg.removeAttribute("style");
      replaceReferences(svg,"s75-"+key+"-"+slot+"-");
      return svg;
    }

    let last="";
    function sync(){
      const key=journal.dataset.place||"soca";
      if(!places.has(key))return;
      // Prepare all three SVGs before touching the visible journal.
      const clones=imageTargets.map(t=>cloneIllustration(key,t.slot));
      if(clones.some(x=>!x))return;
      const opening=journal.classList.contains("is-open");
      const changed=last!==key;
      const original=hero.querySelector(":scope > svg");
      if(!changed && original?.dataset.s75Art===key)return;
      imageTargets.forEach((target,index)=>{
        clones[index].dataset.s75Art=key;
        target.node.replaceChildren(clones[index]);
      });
      journal.dataset.s75Ready="1";
      journal.classList.add("s75-ready");
      last=key;
      heroFigure.classList.remove("s75-arriving");
      if(opening && !reduced.matches && changed){
        // Reflow is limited to one decorative figure, never the page.
        void heroFigure.offsetWidth;
        heroFigure.classList.add("s75-arriving");
      }
    }
    new MutationObserver(sync).observe(journal,{
      attributes:true,attributeFilter:["data-place","class"]
    });
    sync();
  }
  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();