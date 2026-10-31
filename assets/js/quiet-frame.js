/* STEP 44 — THE QUIET FRAME
   Five distinct, pointer-driven material reflections; no animation loop.
   Entirely decorative and non-interactive. Existing GSAP and click handlers
   remain in charge of every scene and visual.
 */
(() => {
  const defs=[
    {name:"home",root:".world-hub",host:".stage-sheet",delegate:true,attrs:["data-s31-scene","data-s22-scene"]},
    {name:"work",root:".work-world",host:".work-preview",attrs:["data-theme"]},
    {name:"sound",root:".sound-world",host:".sound-record",attrs:["data-mood"]},
    {name:"places",root:".p14-world",host:".p14-postcard",attrs:["data-place"]},
    {name:"about",root:".a17-world",host:".a17-card",attrs:["data-mode"]}
  ];
  function init(){
    const fine=window.matchMedia?.("(hover: hover) and (pointer: fine)");
    const motion=window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const contrast=window.matchMedia?.("(prefers-contrast: more)");
    if(!fine?.matches||motion?.matches||contrast?.matches||document.querySelector(".s44-material"))return;

    const installed=[];
    const nestedOpen=()=>(
      !!document.querySelector(".w19-root.is-open")||
      !!document.querySelector(".case-world.is-active")||
      !!document.querySelector(".sound-archive.is-open")||
      !!document.querySelector(".p15-journal.is-open")||
      !!(document.querySelector(".s34-overlay")?.hidden===false)
    );
    for(const def of defs){
      const root=document.querySelector(def.root);
      const host=root?.querySelector(def.host);
      if(!root||!host)continue;
      const layer=document.createElement("span");
      layer.className="s44-material";
      layer.setAttribute("aria-hidden","true");
      host.appendChild(layer);
      const receiver=def.delegate?root:host;
      let inside=false,timer=0,frame=0,xy={x:50,y:45};
      function allowed(){
        if(document.hidden||nestedOpen()||document.body.classList.contains("s41-studio-focus"))return false;
        if(def.name==="home"){
          return !document.querySelector(".work-world.is-active,.sound-world.is-active,.p14-world.is-active,.a17-world.is-active");
        }
        return root.classList.contains("is-active")&&!root.inert;
      }
      function clear(){
        inside=false;
        if(timer){window.clearTimeout(timer);timer=0;}
        if(frame){window.cancelAnimationFrame(frame);frame=0;}
        layer.classList.remove("is-s44-lit");
      }
      function arm(){
        if(timer||layer.classList.contains("is-s44-lit")||!allowed())return;
        timer=window.setTimeout(()=>{
          timer=0;
          if(inside&&allowed())layer.classList.add("is-s44-lit");
        },330);
      }
      function move(ev){
        if(ev.pointerType&&ev.pointerType!=="mouse"&&ev.pointerType!=="pen"){clear();return;}
        if(!allowed()){if(inside)clear();return;}
        const r=host.getBoundingClientRect();
        if(!r.width||!r.height){if(inside)clear();return;}
        const x=(ev.clientX-r.left)/r.width;
        const y=(ev.clientY-r.top)/r.height;
        const currentlyInside=x>=0&&x<=1&&y>=0&&y<=1;
        if(!currentlyInside){if(inside)clear();return;}
        if(!inside){inside=true;arm();}
        xy={x:Math.min(100,Math.max(0,x*100)),y:Math.min(100,Math.max(0,y*100))};
        if(frame)return;
        frame=window.requestAnimationFrame(()=>{
          frame=0;
          layer.style.setProperty("--s44-x",xy.x.toFixed(1)+"%");
          layer.style.setProperty("--s44-y",xy.y.toFixed(1)+"%");
        });
      }
      receiver.addEventListener("pointermove",move,{passive:true});
      receiver.addEventListener("pointerleave",clear,{passive:true});
      root.addEventListener("scroll",clear,{passive:true});
      new MutationObserver(clear).observe(root,{attributes:true,attributeFilter:["class"]});
      const source=def.name==="work"?host:root;
      if(def.attrs?.length)new MutationObserver(clear).observe(source,{attributes:true,attributeFilter:def.attrs});
      root.classList.add("s44-ready");
      installed.push(clear);
    }
    document.addEventListener("visibilitychange",()=>{
      if(document.hidden)installed.forEach(fn=>fn());
    });
    if(motion?.addEventListener)motion.addEventListener("change",()=>{
      if(motion.matches)installed.forEach(fn=>fn());
    });
    if(fine?.addEventListener)fine.addEventListener("change",()=>{
      if(!fine.matches)installed.forEach(fn=>fn());
    });
  }
  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();