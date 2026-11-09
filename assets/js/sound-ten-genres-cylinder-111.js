/* PHASE 111 — SOUND / TEN-FREQUENCY 3D ARCHIVE
   K95-style principle, consistent with our Places: photographs on a
   real cylindrical 3D carousel. Ten genres, 36-degree steps, drag/wheel
   and keyboard. Render only lightweight CSS transforms. Music is a
   visual exploration; nothing plays and no new chapter pages open.
   IMPORTANT: clones from shared chapter buttons so Places' live six
   original buttons are never moved / reordered by Sound.
*/
(()=>{
function init(){
  const hub=document.querySelector(".world-hub.fi95-ready");
  const level=hub?.querySelector(".fi95-level");
  const cluster=level?.querySelector(".fi95-cluster");
  const originals=[...(cluster?.querySelectorAll(".fi95-item")||[])]
    .sort((a,b)=>Number(a.className.match(/fi95-item-(\d+)/)?.[1]??99)-
                 Number(b.className.match(/fi95-item-(\d+)/)?.[1]??99))
    .slice(0,10);
  if(!hub||!level||!cluster||originals.length!==10||hub.dataset.fi111SoundReady==="1")return;

  const genres=["SOUL","HIP-HOP","ALTERNATIVE","JAZZ","R&B","FUNK",
    "ELECTRONIC","HOUSE","ROCK","AMBIENT"];
  const notes=["WARM VOICES","BEATS & WORDS","OUTSIDE THE LINES",
    "IMPROVISATION","THE SLOW GROOVE","FEEL THE GROOVE",
    "SYNTHETIC WORLDS","AFTER DARK","AMPLIFIED FEELING","OPEN SPACE"];
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
  const sign=level.querySelector(".fi95-level-sign");
  const oldSign=sign?.textContent||"";
  const mod=n=>(n%10+10)%10;
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));

  let stage=null,rotor=null,active=0,yaw=0;
  let dragging=false,pointerId=-1,startX=0,lastX=0,wheelAt=0;

  function make(){
    const outer=document.createElement("div");
    outer.className="fi111-sound-stage";
    outer.tabIndex=0;
    outer.setAttribute("role","region");
    outer.setAttribute("aria-label","Ten music genres in a 3D rotating carousel. Drag, scroll or use arrow keys to explore.");
    outer.innerHTML=
      '<div class="fi111-scene-meta" aria-hidden="true">'+
        '<span>SONIC INDEX / 10 FREQUENCIES</span><span>LISTEN WITH YOUR EYES</span>'+
      '</div>'+
      '<div class="fi111-depth">'+
        '<div class="fi111-orbit-guide" aria-hidden="true"></div>'+
        '<div class="fi111-rotor"></div>'+
      '</div>'+
      '<div class="fi111-readout" aria-live="polite">'+
        '<span class="fi111-readout-kicker">NOW IN FOCUS / 01—10</span>'+
        '<strong class="fi111-readout-name">SOUL</strong>'+
        '<span class="fi111-readout-note">WARM VOICES</span>'+
      '</div>'+
      '<div class="fi111-side-note" aria-hidden="true"><span>SOUND AS A PLACE<br>TO GET LOST</span><i></i><span>VOL. 001</span></div>'+
      '<div class="fi111-instructions">'+
        '<span>DRAG / SCROLL TO EXPLORE <b aria-hidden="true">↔</b></span>'+
        '<span class="fi111-counter">01 / 10</span>'+
      '</div>';
    return {outer,rotor:outer.querySelector(".fi111-rotor")};
  }
  function radius(){
    if(!stage)return;
    const w=stage.clientWidth||window.innerWidth;
    const h=stage.clientHeight||window.innerHeight*.53;
    const r=clamp(Math.min(w*.31,h*.59),126,236);
    stage.style.setProperty("--fi111-radius",r.toFixed(1)+"px");
  }
  function apply(){
    if(rotor)rotor.style.transform="rotateX(-7deg) rotateY("+yaw.toFixed(2)+"deg)";
  }
  function update(){
    const i=mod(active);
    const name=stage?.querySelector(".fi111-readout-name");
    const note=stage?.querySelector(".fi111-readout-note");
    const kicker=stage?.querySelector(".fi111-readout-kicker");
    const count=stage?.querySelector(".fi111-counter");
    if(name)name.textContent=genres[i];
    if(note)note.textContent=notes[i];
    if(kicker)kicker.textContent="NOW IN FOCUS / "+String(i+1).padStart(2,"0")+"—10";
    if(count)count.textContent=String(i+1).padStart(2,"0")+" / 10";
    if(stage)stage.setAttribute("aria-label",genres[i]+" in front. Navigate ten genres by dragging, scrolling or arrow keys.");
    const levelCount=level.querySelector(".fi95-selection-count");
    if(levelCount)levelCount.textContent=String(i+1).padStart(2,"0")+" / 10";
    rotor?.querySelectorAll(".fi111-photo").forEach((photo,j)=>{
      photo.classList.toggle("fi111-front",j===i);
    });
  }
  function snap(i){
    active=i;
    yaw=-36*active;
    stage?.classList.remove("fi111-dragging");
    if(rotor)rotor.style.transition=reduced.matches?"none":".49s cubic-bezier(.22,.79,.25,1)";
    update();apply();
  }
  function advance(dir){
    if(!stage||dragging)return;
    snap(active+dir);
  }
  function onPointerDown(e){
    if(e.button!==0||!stage||level.dataset.category!=="sound")return;
    dragging=true;pointerId=e.pointerId;startX=lastX=e.clientX;
    stage.classList.add("fi111-dragging");
    if(rotor)rotor.style.transition="none";
    try{stage.setPointerCapture(pointerId)}catch(_){}
    if(e.cancelable)e.preventDefault();
  }
  function onPointerMove(e){
    if(!dragging||e.pointerId!==pointerId)return;
    const dx=e.clientX-lastX;
    lastX=e.clientX;
    yaw+=dx*.35;
    apply();
    if(e.cancelable)e.preventDefault();
  }
  function onPointerEnd(e){
    if(!dragging||(e&&e.pointerId!==pointerId))return;
    const distance=lastX-startX;
    dragging=false;pointerId=-1;
    const tentative=Math.round(-yaw/36);
    const next=Math.abs(distance)>29&&tentative===active?active-Math.sign(distance):tentative;
    snap(next);
  }
  function onWheel(e){
    if(level.dataset.category!=="sound"||!hub.classList.contains("fi95-level-open"))return;
    if(e.cancelable)e.preventDefault();
    e.stopPropagation();
    const delta=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY;
    if(Math.abs(delta)<2)return;
    const now=performance.now();
    if(now-wheelAt<375)return;
    wheelAt=now;
    advance(delta>0?1:-1);
  }
  function onKey(e){
    if(level.dataset.category!=="sound")return;
    if(e.key==="ArrowRight"||e.key==="ArrowDown"){e.preventDefault();advance(1)}
    else if(e.key==="ArrowLeft"||e.key==="ArrowUp"){e.preventDefault();advance(-1)}
    else if(e.key==="Home"){e.preventDefault();snap(0)}
    else if(e.key==="End"){e.preventDefault();snap(9)}
  }
  function mount(){
    if(stage||level.dataset.category!=="sound")return;
    const result=make();
    stage=result.outer;rotor=result.rotor;
    originals.forEach((original,i)=>{
      const copy=original.cloneNode(true);
      copy.classList.add("fi111-photo");
      copy.classList.remove("fi95-selected");
      copy.style.setProperty("--fi111-angle",(i*36)+"deg");
      copy.tabIndex=-1;copy.setAttribute("aria-hidden","true");
      copy.setAttribute("aria-disabled","true");
      copy.setAttribute("role","presentation");
      rotor.appendChild(copy);
    });
    cluster.appendChild(stage);
    cluster.classList.add("fi111-cluster-on");
    level.classList.add("fi111-sound-on");
    if(sign)sign.textContent="THE SOUND ARCHIVE";
    const footer=level.querySelector(".fi95-level-foot span:first-child");
    if(footer)footer.textContent="TEN GENRES / ONE PERSONAL FREQUENCY";
    stage.addEventListener("pointerdown",onPointerDown);
    stage.addEventListener("pointermove",onPointerMove);
    stage.addEventListener("pointerup",onPointerEnd);
    stage.addEventListener("pointercancel",onPointerEnd);
    stage.addEventListener("lostpointercapture",()=>onPointerEnd());
    stage.addEventListener("wheel",onWheel,{passive:false});
    stage.addEventListener("keydown",onKey);
    stage.addEventListener("click",e=>{e.preventDefault();e.stopPropagation()},true);
    radius();snap(active);
  }
  function unmount(){
    if(!stage)return;
    dragging=false;pointerId=-1;
    stage.remove();stage=null;rotor=null;
    cluster.classList.remove("fi111-cluster-on");
    level.classList.remove("fi111-sound-on");
    if(sign)sign.textContent=oldSign;
  }
  new MutationObserver(()=>{
    if(level.dataset.category==="sound")mount();
    else unmount();
  }).observe(level,{attributes:true,attributeFilter:["data-category"]});
  window.addEventListener("resize",radius,{passive:true});
  hub.dataset.fi111SoundReady="1";
  if(level.dataset.category==="sound")mount();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
else init();
})();