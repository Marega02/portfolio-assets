/* STEP 32 — TYPOGRAPHIC TAKEOVER
 * Scene-synchronized editorial layout. Does not modify GSAP targets,
 * click handlers, the 3D poster, or the other four worlds.
 */
(() => {
  function init(){
    const hub=document.querySelector(".world-hub");
    const main=hub?.querySelector(".world-main");
    const title=main?.querySelector(".world-title");
    if(!hub||!main||!title||hub.classList.contains("s32-ready"))return;

    // Preserve the H1's actual words and any Webflow line-break nodes.
    // Only wrap its existing second line so it can use editorial italic type.
    const nodes=[...title.childNodes];
    const finalLine=nodes.find(node=>
      node.nodeType===Node.TEXT_NODE &&
      node.textContent.trim().toUpperCase()==="MY WORLD."
    );
    if(finalLine){
      const highlight=document.createElement("span");
      highlight.className="s32-title-highlight";
      highlight.textContent=finalLine.textContent;
      finalLine.replaceWith(highlight);
    }

    const ghost=document.createElement("span");
    ghost.className="s32-ghost";
    ghost.setAttribute("aria-hidden","true");
    ghost.textContent="WORK";
    main.prepend(ghost);

    const scenes=new Set(["work","sound","places","about"]);
    const reduced=window.matchMedia?.("(prefers-reduced-motion: reduce)");
    let active="";
    function sync(){
      const candidate=hub.dataset.s31Scene || hub.dataset.s22Scene || "work";
      const name=scenes.has(candidate)?candidate:"work";
      if(active===name)return;
      active=name;
      hub.dataset.s32Scene=name;
      ghost.textContent=name.toUpperCase();
      if(!reduced?.matches && ghost.animate && document.visibilityState!=="hidden"){
        ghost.animate([
          {opacity:0,filter:"blur(5px)"},
          {opacity:.95,filter:"blur(0px)"}
        ],{duration:450,easing:"cubic-bezier(.16,1,.3,1)"});
      }
    }
    new MutationObserver(sync).observe(hub,{attributes:true,attributeFilter:["data-s31-scene","data-s22-scene"]});
    sync();
    hub.classList.add("s32-ready");
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();