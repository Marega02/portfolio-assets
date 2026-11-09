/* PHASE 112 / PLACES — SPATIAL ATLAS WITH SOUND-INSPIRED DEPTH
   One photograph facing the visitor, its two immediate neighbours
   visibly turned inward, the three rear faces hidden from view.
   Six destinations kept intact; no project navigation.
   Wheel / drag / keyboard rotate by one 60-degree slot.
   Only 3D transforms change; no perpetual render or heavy libraries. */
(()=>{
function init(){
  const hub=document.querySelector(".world-hub.fi95-ready");
  const level=hub?.querySelector(".fi95-level");
  const cluster=level?.querySelector(".fi95-cluster");
  // Module nodes are shared by Work/Sound/Places. Sound now has 10
  // genres, while Places still owns exactly its first SIX cards.
  // Sort explicitly because carousel teardown can change DOM order.
  const cards=[...(cluster?.querySelectorAll(".fi95-item")||[])]
    .sort((a,b)=>Number(a.className.match(/fi95-item-(\d+)/)?.[1]??99)-
                 Number(b.className.match(/fi95-item-(\d+)/)?.[1]??99))
    .slice(0,6);
  if(!hub||!level||!cluster||cards.length!==6||hub.dataset.fi112PlacesReady==="1")return;

  const labels=["SOČA VALLEY","LONDON","KUALA LUMPUR","KYOTO","ICELAND","MARRAKECH"];
  const countries=["SLOVENIA","UNITED KINGDOM","MALAYSIA","JAPAN","ICELAND","MOROCCO"];
  const moods=["WHERE THE RIVER LEADS","IN THE CITY","A CITY IN MOTION",
    "BETWEEN OLD AND NEW","LAND OF THE ELEMENTS","COLOUR & CONTRAST"];
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
  const sign=level.querySelector(".fi95-level-sign");
  const oldSign=sign?.textContent||"";
  let stage=null,rotor=null,active=0;
  let yaw=0,dragging=false,pointerId=-1,startX=0,currentX=0,wheelAt=0;

  const mod6=n=>((n%6)+6)%6;
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
  function build(){
    const outer=document.createElement("div");
    outer.className="fi100-stage fi102-stage";
    outer.setAttribute("role","region");
    outer.setAttribute("aria-label","Six destinations on a rotating 3D cylinder. One is in front and two are on the sides. Drag, scroll or press left or right to rotate.");
    outer.tabIndex=0;
    const top=document.createElement("div");
    top.className="fi100-scene-meta";
    top.innerHTML='<span>PERSONAL ATLAS / 06 DESTINATIONS</span><span>01 — PLACES</span>';

    const world=document.createElement("div");
    world.className="fi100-world fi102-world";
    const ring=document.createElement("div");
    ring.className="fi100-axis fi102-axis";
    ring.setAttribute("aria-hidden","true");
    const group=document.createElement("div");
    group.className="fi100-rotor fi102-rotor";
    const sculpture=document.createElement("div");
    sculpture.className="fi100-sculpture fi102-sculpture";
    sculpture.setAttribute("aria-hidden","true");
    sculpture.innerHTML=
       '<span class="fi100-sculpture-halo"></span>'+
       '<span class="fi100-metal-loop fi100-metal-loop-0"></span>'+
       '<span class="fi100-metal-loop fi100-metal-loop-1"></span>'+
       '<span class="fi100-metal-loop fi100-metal-loop-2"></span>'+
       '<span class="fi100-sculpture-mark">LM</span>';
    group.append(sculpture);
    world.append(ring,group);

    const foot=document.createElement("div");
    foot.className="fi100-instruction fi102-instruction";
    foot.innerHTML='<span>DRAG OR SCROLL TO EXPLORE <b aria-hidden="true">↔</b></span>'+
      '<span class="fi102-counter" aria-live="polite">01 / 06</span>';
    const readout=document.createElement("aside");
    readout.className="fi109-place-readout";
    readout.setAttribute("aria-live","polite");
    readout.innerHTML=
      '<span class="fi109-place-eyebrow">CURRENT DESTINATION / 01—06</span>'+
      '<strong class="fi109-place-name">SOČA VALLEY</strong>'+
      '<span class="fi109-place-country">SLOVENIA</span>'+
      '<span class="fi109-place-rule" aria-hidden="true"></span>'+
      '<small class="fi109-place-note">WHERE THE RIVER LEADS</small>';
    const editorial=document.createElement("div");
    editorial.className="fi109-place-side";
    editorial.setAttribute("aria-hidden","true");
    editorial.innerHTML='<span>NOTES FROM<br>ELSEWHERE</span><i></i><small>NO. 01—06</small>';
    outer.append(top,world,readout,editorial,foot);
    return {outer,group};
  }

  function radius(){
    if(!stage)return;
    const w=stage.clientWidth||window.innerWidth;
    const h=stage.clientHeight||window.innerHeight*.52;
    // One visible frontal card and two side-on cards, even on phones.
    const r=clamp(Math.min(w*.31,h*.51),123,184);
    stage.style.setProperty("--fi102-radius",r.toFixed(1)+"px");
  }
  function apply(){
    if(rotor)rotor.style.transform="rotateX(-7deg) rotateY("+yaw.toFixed(2)+"deg)";
  }
  function updateIndex(){
    const idx=mod6(active);
    if(stage){
      const counter=stage.querySelector(".fi102-counter");
      if(counter)counter.textContent=String(idx+1).padStart(2,"0")+" / 06";
      stage.setAttribute("aria-label",labels[idx]+" in front. Scroll, drag or use arrow keys to rotate six destinations.");
      const ey=stage.querySelector(".fi109-place-eyebrow");
      const nm=stage.querySelector(".fi109-place-name");
      const cy=stage.querySelector(".fi109-place-country");
      const nt=stage.querySelector(".fi109-place-note");
      if(ey)ey.textContent="CURRENT DESTINATION / "+String(idx+1).padStart(2,"0")+"—06";
      if(nm)nm.textContent=labels[idx];
      if(cy)cy.textContent=countries[idx];
      if(nt)nt.textContent=moods[idx];
    }
    const oldCounter=level.querySelector(".fi95-selection-count");
    if(oldCounter)oldCounter.textContent=String(idx+1).padStart(2,"0")+" / 06";
    cards.forEach((card,i)=>{
      card.classList.toggle("fi102-front",i===idx);
      card.classList.toggle("fi102-side",mod6(i-idx)===1||mod6(idx-i)===1);
      // Open the two adjacent faces toward the viewer slightly.
      card.classList.toggle("fi112-side-right",mod6(i-idx)===1);
      card.classList.toggle("fi112-side-left",mod6(idx-i)===1);
      card.setAttribute("aria-label",labels[i]+" — visual study");
      card.setAttribute("aria-disabled","true");
      card.tabIndex=-1;
    });
  }
  function snap(index){
    active=index;
    yaw=-60*active;
    if(stage)stage.classList.remove("fi102-dragging");
    if(rotor)rotor.style.transition=reduced.matches?"none":".49s cubic-bezier(.22,.79,.25,1)";
    updateIndex();
    apply();
  }
  function step(dir){
    if(!stage||dragging)return;
    snap(active+dir);
  }
  function onPointerDown(event){
    if(event.button!==0||!stage||level.dataset.category!=="places")return;
    dragging=true;pointerId=event.pointerId;
    startX=currentX=event.clientX;
    stage.classList.add("fi102-dragging");
    if(rotor)rotor.style.transition="none";
    try{stage.setPointerCapture(pointerId)}catch(_){}
    if(event.cancelable)event.preventDefault();
  }
  function onPointerMove(event){
    if(!dragging||event.pointerId!==pointerId)return;
    const dx=event.clientX-currentX;
    currentX=event.clientX;
    yaw+=dx*.43;
    apply();
    if(event.cancelable)event.preventDefault();
  }
  function onPointerEnd(event){
    if(!dragging||(event&&event.pointerId!==pointerId))return;
    const travel=currentX-startX;
    dragging=false;
    try{if(event&&stage?.hasPointerCapture?.(pointerId))stage.releasePointerCapture(pointerId)}catch(_){}
    pointerId=-1;
    let to=Math.round(-yaw/60);
    if(Math.abs(travel)>32&&to===active)to=active-Math.sign(travel);
    snap(to);
  }
  function onWheel(event){
    if(level.dataset.category!=="places"||!hub.classList.contains("fi95-level-open"))return;
    if(event.cancelable)event.preventDefault();
    event.stopPropagation();
    const delta=Math.abs(event.deltaX)>Math.abs(event.deltaY)?event.deltaX:event.deltaY;
    if(Math.abs(delta)<2)return;
    const now=performance.now();
    if(now-wheelAt<375)return;
    wheelAt=now;
    step(delta>0?1:-1);
  }
  function onKey(event){
    if(level.dataset.category!=="places")return;
    if(event.key==="ArrowRight"||event.key==="ArrowDown"){
      event.preventDefault();step(1);
    }else if(event.key==="ArrowLeft"||event.key==="ArrowUp"){
      event.preventDefault();step(-1);
    }else if(event.key==="Home"){
      event.preventDefault();snap(0);
    }else if(event.key==="End"){
      event.preventDefault();snap(5);
    }
  }

  function mount(){
    if(stage||level.dataset.category!=="places")return;
    const parts=build();
    stage=parts.outer;rotor=parts.group;
    cards.forEach((card,i)=>{
      card.classList.add("fi100-photo","fi102-photo");
      card.style.setProperty("--fi102-angle",(i*60)+"deg");
      card.tabIndex=-1;
      card.setAttribute("aria-disabled","true");
      rotor.appendChild(card);
    });
    cluster.appendChild(stage);
    cluster.classList.add("fi100-cluster-on","fi102-cluster-on");
    level.classList.add("fi100-places-on","fi102-carousel-on");
    if(sign)sign.textContent="THE PERSONAL ATLAS";
    const foot=level.querySelector(".fi95-level-foot span:first-child");
    if(foot)foot.textContent="AN ATLAS OF MOMENTS / SIX DESTINATIONS";
    stage.addEventListener("pointerdown",onPointerDown);
    stage.addEventListener("pointermove",onPointerMove);
    stage.addEventListener("pointerup",onPointerEnd);
    stage.addEventListener("pointercancel",onPointerEnd);
    stage.addEventListener("lostpointercapture",()=>onPointerEnd());
    stage.addEventListener("wheel",onWheel,{passive:false});
    stage.addEventListener("keydown",onKey);
    stage.addEventListener("click",event=>{event.preventDefault();event.stopPropagation()},true);
    radius();
    snap(active);
  }
  function unmount(){
    if(!stage)return;
    onPointerEnd();
    cards.forEach(card=>{
      card.classList.remove("fi100-photo","fi102-photo","fi102-front","fi102-side","fi112-side-right","fi112-side-left");
      card.style.removeProperty("--fi102-angle");
      cluster.appendChild(card);
    });
    stage.remove();stage=null;rotor=null;
    cluster.classList.remove("fi100-cluster-on","fi102-cluster-on");
    level.classList.remove("fi100-places-on","fi102-carousel-on");
    if(sign)sign.textContent=oldSign;
  }
  new MutationObserver(()=>{
    if(level.dataset.category==="places")mount();else unmount();
  }).observe(level,{attributes:true,attributeFilter:["data-category"]});
  window.addEventListener("resize",radius,{passive:true});
  hub.dataset.fi112PlacesReady="1";
  if(level.dataset.category==="places")mount();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();