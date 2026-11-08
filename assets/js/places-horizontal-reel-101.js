/* PHASE 101 — PLACES / HORIZONTAL 3D REEL
   Six smaller, closely spaced photographs in ONE continuous row.
   Retains the blue spatial world and light chrome centre from Phase 100.
   Drag, wheel and arrows choose a photo; no photo opens another page.
   Transform-only navigation. No WebGL, infinite animation or app dependency.
*/
(() => {
  function init(){
    const hub=document.querySelector(".world-hub.fi95-ready");
    const level=hub?.querySelector(".fi95-level");
    const cluster=level?.querySelector(".fi95-cluster");
    const cards=[...(cluster?.querySelectorAll(".fi95-item")||[])];
    if(!hub||!level||!cluster||cards.length!==6||hub.dataset.fi101Ready==="1")return;

    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
    const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
    const siteSign=level.querySelector(".fi95-level-sign");
    const oldSign=siteSign?.textContent||"";
    const labels=["SOČA VALLEY","LONDON","KUALA LUMPUR","KYOTO","ICELAND","MARRAKECH"];
    let stage=null,strip=null,active=2,slot=152,dragging=false,pointer=-1;
    let downX=0,lastX=0,dragPx=0,wheelAt=0;

    function build(){
      const outer=document.createElement("div");
      outer.className="fi100-stage fi101-stage";
      outer.tabIndex=0;
      outer.setAttribute("role","region");
      outer.setAttribute("aria-label","Six places in a horizontal 3D gallery. Drag, scroll or use left/right arrow keys to explore.");

      const meta=document.createElement("div");
      meta.className="fi100-scene-meta";
      meta.innerHTML="<span>06 PLACES / ONE HORIZON</span><span>SPATIAL ARCHIVE / 001</span>";

      const world=document.createElement("div");
      world.className="fi100-world fi101-world";
      const axis=document.createElement("span");
      axis.className="fi100-axis";
      axis.setAttribute("aria-hidden","true");
      strip=document.createElement("div");
      strip.className="fi100-rotor fi101-rotor";

      const nucleus=document.createElement("div");
      nucleus.className="fi100-sculpture fi101-sculpture";
      nucleus.setAttribute("aria-hidden","true");
      nucleus.innerHTML='<span class="fi100-sculpture-halo"></span>'+
        '<span class="fi100-metal-loop fi100-metal-loop-0"></span>'+
        '<span class="fi100-metal-loop fi100-metal-loop-1"></span>'+
        '<span class="fi100-metal-loop fi100-metal-loop-2"></span>'+
        '<span class="fi100-sculpture-mark">LM</span>';
      strip.appendChild(nucleus);
      world.append(axis,strip);

      const foot=document.createElement("div");
      foot.className="fi100-instruction fi101-instruction";
      foot.innerHTML='<span>DRAG / SCROLL TO EXPLORE</span>'+
        '<span class="fi101-count" aria-live="polite">03 / 06</span>';
      outer.append(meta,world,foot);
      return outer;
    }
    function layout(){
      if(!stage||!strip)return;
      const w=stage.clientWidth||window.innerWidth;
      slot=w<=560?clamp(w*.44,126,160):
           w<=790?clamp(w*.15,112,145):
           clamp(window.innerWidth*.118,126,174);
      stage.style.setProperty("--fi101-step",slot.toFixed(1)+"px");
      applyTransform();
    }
    function applyTransform(){
      if(!strip||!stage)return;
      const mobile=window.innerWidth<=790;
      const shift=(2.5-active)*slot*(mobile?1:.12);
      const tilt=(2.5-active)*(mobile?0:1.25);
      strip.style.transform="translate3d("+(shift+dragPx).toFixed(1)+"px,0,0) rotateY("+tilt.toFixed(2)+"deg)";
    }
    function select(index){
      active=clamp(index,0,cards.length-1);
      cards.forEach((node,i)=>{
        node.classList.toggle("fi101-active",i===active);
        node.setAttribute("aria-label","Visual study "+(i+1)+" of 6: "+labels[i]);
      });
      const count=stage?.querySelector(".fi101-count");
      if(count)count.textContent=String(active+1).padStart(2,"0")+" / 06";
      applyTransform();
    }
    function pointerDown(event){
      if(event.button!==0||!stage||level.dataset.category!=="places")return;
      dragging=true;pointer=event.pointerId;
      downX=lastX=event.clientX;dragPx=0;
      stage.classList.add("fi100-dragging");
      try{stage.setPointerCapture(pointer)}catch(_){}
      if(event.cancelable)event.preventDefault();
    }
    function pointerMove(event){
      if(!dragging||event.pointerId!==pointer)return;
      lastX=event.clientX;
      dragPx=clamp(lastX-downX,-260,260);
      applyTransform();
      if(event.cancelable)event.preventDefault();
    }
    function pointerEnd(event){
      if(!dragging||(event&&event.pointerId!==pointer))return;
      const dx=lastX-downX;
      dragging=false;dragPx=0;
      stage?.classList.remove("fi100-dragging");
      try{if(event&&stage?.hasPointerCapture?.(pointer))stage.releasePointerCapture(pointer)}catch(_){}
      pointer=-1;
      if(Math.abs(dx)>34)select(active-Math.sign(dx)*clamp(Math.round(Math.abs(dx)/110),1,3));
      else applyTransform();
    }
    function onWheel(event){
      if(level.dataset.category!=="places"||!hub.classList.contains("fi95-level-open"))return;
      if(event.cancelable)event.preventDefault();
      event.stopPropagation();
      const now=performance.now();
      const delta=Math.abs(event.deltaX)>Math.abs(event.deltaY)?event.deltaX:event.deltaY;
      if(Math.abs(delta)<3||now-wheelAt<155)return;
      wheelAt=now;
      select(active+(delta>0?1:-1));
    }
    function onKey(event){
      if(level.dataset.category!=="places")return;
      if(event.key==="ArrowRight"){event.preventDefault();select(active+1)}
      else if(event.key==="ArrowLeft"){event.preventDefault();select(active-1)}
      else if(event.key==="Home"){event.preventDefault();select(0)}
      else if(event.key==="End"){event.preventDefault();select(5)}
    }

    function mount(){
      if(stage||level.dataset.category!=="places")return;
      stage=build();
      cards.forEach((node,i)=>{
        node.classList.add("fi100-photo","fi101-photo");
        node.style.setProperty("--fi101-i",String(i-2.5));
        node.style.setProperty("--fi101-ry",["25deg","16deg","7deg","-7deg","-16deg","-25deg"][i]);
        node.style.setProperty("--fi101-z",["-55px","-27px","20px","20px","-27px","-55px"][i]);
        node.tabIndex=-1;
        node.setAttribute("aria-disabled","true");
        strip.appendChild(node);
      });
      cluster.appendChild(stage);
      cluster.classList.add("fi100-cluster-on","fi101-cluster-on");
      level.classList.add("fi100-places-on","fi101-row-on");
      if(siteSign)siteSign.textContent="PLACES / 3D REEL";
      const footer=level.querySelector(".fi95-level-foot span:first-child");
      if(footer)footer.textContent="SIX PLACES / HORIZONTAL STUDY · NO LINKS";
      stage.addEventListener("pointerdown",pointerDown);
      stage.addEventListener("pointermove",pointerMove);
      stage.addEventListener("pointerup",pointerEnd);
      stage.addEventListener("pointercancel",pointerEnd);
      stage.addEventListener("lostpointercapture",()=>pointerEnd());
      stage.addEventListener("wheel",onWheel,{passive:false});
      stage.addEventListener("keydown",onKey);
      stage.addEventListener("click",event=>{
        if(event.target.closest(".fi95-item")){
          event.preventDefault();event.stopPropagation();
        }
      },true);
      layout();
      select(active);
    }
    function unmount(){
      if(!stage)return;
      pointerEnd();
      cards.forEach(node=>{
        node.classList.remove("fi100-photo","fi101-photo","fi101-active");
        for(const key of ["--fi101-i","--fi101-ry","--fi101-z"])node.style.removeProperty(key);
        cluster.appendChild(node);
      });
      stage.remove();stage=null;strip=null;
      cluster.classList.remove("fi100-cluster-on","fi101-cluster-on");
      level.classList.remove("fi100-places-on","fi101-row-on");
      if(siteSign)siteSign.textContent=oldSign;
    }
    new MutationObserver(()=>{
      if(level.dataset.category==="places")mount();
      else unmount();
    }).observe(level,{attributes:true,attributeFilter:["data-category"]});
    window.addEventListener("resize",layout,{passive:true});
    hub.dataset.fi101Ready="1";
    if(level.dataset.category==="places")mount();
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();