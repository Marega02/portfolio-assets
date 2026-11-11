/* PLACES 132 — VERTICAL ELEVATOR PHOTO ATLAS
   Preserves the existing six-card spatial carousel and adds a real
   nested archive with pointer-capture-safe photo navigation.
   Photo arrays intentionally empty until the photographer supplies images. */
(()=>{
"use strict";
const COLLECTIONS=[
  {title:"MOUNTAINS",hint:"TRAILS & SUMMITS",kind:"folder",children:[
    {title:"RODICA",hint:"MOUNTAIN GALLERY",kind:"gallery",photos:[]},
    {title:"KRN",hint:"MOUNTAIN GALLERY",kind:"gallery",photos:[]},
    {title:"KUCELJ",hint:"MOUNTAIN GALLERY",kind:"gallery",photos:[]},
    {title:"KOBILJA GLAVA",hint:"MOUNTAIN GALLERY",kind:"gallery",photos:[]},
    {title:"MONTE TALM",hint:"MOUNTAIN GALLERY",kind:"gallery",photos:[]}
  ]},
  {title:"LONDON",hint:"UNITED KINGDOM",kind:"gallery",photos:[]},
  {title:"MALAYSIA",hint:"SOUTHEAST ASIA",kind:"gallery",photos:[]},
  {title:"SINGAPORE",hint:"SOUTHEAST ASIA",kind:"gallery",photos:[]},
  {title:"BALI",hint:"INDONESIA",kind:"gallery",photos:[]},
  {title:"AMSTERDAM",hint:"NETHERLANDS",kind:"gallery",photos:[]}
];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const count=n=>String(n).padStart(2,"0");

/* Selected photos are published by the private importer to GitHub Pages.
   Public visitors read only this static manifest; no Google account or
   GitHub token is ever required in the visitor-facing Webflow site. */
const PHOTO_MANIFEST="https://marega02.github.io/portfolio-assets/assets/photos/places-manifest.json";
function slugPhotoEntry(entry){
 return entry.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")
   .replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
}
async function loadPersonalPhotos(){
 try{
  const r=await fetch(PHOTO_MANIFEST+"?t="+Date.now(),{cache:"no-store"});
  if(!r.ok)return;
  const payload=await r.json();
  const galleries=payload?.galleries||{};
  const entries=COLLECTIONS.flatMap(x=>x.kind==="folder"?x.children:[x]);
  for(const entry of entries){
   const items=galleries[slugPhotoEntry(entry)];
   if(!Array.isArray(items))continue;
   entry.photos=items.filter(p=>
      p&&typeof p.src==="string"&&p.src.startsWith(
        "https://marega02.github.io/portfolio-assets/assets/photos/"
      )).map(p=>({src:p.src,alt:String(p.alt||entry.title),caption:String(p.caption||"")}));
  }
 }catch(e){ /* Offline and unpublished manifest: keep the current placeholders. */ }
}

let active=null,stage=null,readoutObserver=null,watcher=null,dragX=0,dragY=0,hasDrag=false,returnFocus=null;
let tapped=-1,tappedPointer=-1,suppressClickUntil=0;
const mountSelector=".world-hub.fi95-ready .fi95-level[data-category='places'] .fi100-stage";
const reduced=()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const cssUrl="https://marega02.github.io/portfolio-assets/assets/css/places-personal-atlas-132.css?v=132.1";
function syncStage(){
 const next=document.querySelector(mountSelector);
 if(!next||stage===next)return;
 if(stage)unhook();
 stage=next;
 const cards=[...stage.querySelectorAll(".fi102-photo")];
 if(cards.length!==6)return;
 cards.forEach((c,i)=>{
   c.querySelector(".fi95-item-meta strong")?.replaceChildren(document.createTextNode(COLLECTIONS[i].title));
   c.querySelector(".fi95-item-meta small")?.replaceChildren(document.createTextNode(COLLECTIONS[i].hint));
   c.setAttribute("aria-disabled","false");
   c.tabIndex=0;
   c.setAttribute("role","button");
   c.setAttribute("aria-label","Explore "+COLLECTIONS[i].title);
   c.classList.add("fi130-clickable");
   c.dataset.fi130AtlasIndex=String(i);
   // The previous three concept covers were not the user's photos.
   // These were three unrelated demo cities/landscapes. Retire the
   // misleading images until real personal photographs are supplied.
   if(i===0||i>=3){
     c.querySelector(".fi95-item-image")?.replaceChildren();
     c.classList.add("fi130-no-cover");
     if(i===0)c.classList.add("fi130-mountain-cover");
   }
 });
 const label=stage.querySelector(".fi109-place-name");
 if(label){
   const update=()=>{
     const idx=Math.max(0,cards.findIndex(el=>el.classList.contains("fi102-front")));
     const data=COLLECTIONS[idx];
     const fields=[
       [".fi109-place-name",data.title],
       [".fi109-place-country",data.hint],
       [".fi109-place-note",data.kind==="folder"?"OPEN THE TRAIL ARCHIVE":data.kind==="empty"?"READY FOR NEW MEMORIES":"PERSONAL PHOTO JOURNAL"]
     ];
     fields.forEach(([sel,val])=>{const el=stage.querySelector(sel);if(el&&el.textContent!==val)el.textContent=val;});
     cards.forEach((c,i)=>{const t=c.querySelector(".fi95-item-meta strong");if(t&&t.textContent!==COLLECTIONS[i].title)t.textContent=COLLECTIONS[i].title;if(c.getAttribute("aria-disabled")!=="false")c.setAttribute("aria-disabled","false");});
   };
   readoutObserver=new MutationObserver(update);
   readoutObserver.observe(stage.querySelector(".fi109-place-readout")||label,{childList:true,subtree:true,characterData:true});
   update();
 }
 stage.addEventListener("pointerdown",onDown,true);
 stage.addEventListener("pointermove",onMove,true);
 stage.addEventListener("pointerup",onUp,true);
 stage.addEventListener("pointercancel",onCancel,true);
 stage.addEventListener("click",onClick,true);
 stage.addEventListener("keydown",onKey,true);
 stage.querySelector(".fi100-instruction span:first-child")?.insertAdjacentHTML("beforeend",' <b class="fi130-hint"> · CLICK PHOTO TO OPEN ↗</b>');
}
function unhook(){
 if(stage){stage.removeEventListener("pointerdown",onDown,true);stage.removeEventListener("pointermove",onMove,true);stage.removeEventListener("pointerup",onUp,true);stage.removeEventListener("pointercancel",onCancel,true);stage.removeEventListener("click",onClick,true);stage.removeEventListener("keydown",onKey,true);}
 readoutObserver?.disconnect();readoutObserver=null;stage=null;
}
// The original 3D carousel captures the pointer on the stage itself.
// Thus click events often target the stage rather than the photographed card.
// Track the intended front card on pointer-down, including hit-testing the
// transformed image bounds when CSS/3D hit-testing targets the stage.
function indexAtPoint(e){
 if(!stage)return -1;
 const cards=[...stage.querySelectorAll(".fi102-photo")];
 const direct=e.target instanceof Element?e.target.closest(".fi102-photo"):null;
 if(direct&&cards.includes(direct))return cards.indexOf(direct);
 const front=cards.find(c=>c.classList.contains("fi102-front"));
 const rect=front?.querySelector(".fi95-item-frame")?.getBoundingClientRect()||
   front?.getBoundingClientRect();
 if(rect&&e.clientX>=rect.left-4&&e.clientX<=rect.right+4&&
     e.clientY>=rect.top-4&&e.clientY<=rect.bottom+4)return cards.indexOf(front);
 return -1;
}
function onDown(e){
 dragX=e.clientX;dragY=e.clientY;hasDrag=false;tappedPointer=e.pointerId;
 tapped=indexAtPoint(e);
}
function onMove(e){
 if(tappedPointer!==e.pointerId)return;
 if(Math.hypot(e.clientX-dragX,e.clientY-dragY)>12)hasDrag=true;
}
function onCancel(){tapped=-1;tappedPointer=-1;hasDrag=false;}
function openIndex(index){
 if(!stage||!stage.isConnected||active||index<0||!COLLECTIONS[index])return;
 pushFloor(COLLECTIONS[index],null);
}
function onUp(e){
 if(e.pointerId!==tappedPointer)return;
 const index=tapped>=0?tapped:indexAtPoint(e);
 const moved=hasDrag||Math.hypot(e.clientX-dragX,e.clientY-dragY)>12;
 onCancel();
 if(moved||index<0||active)return;
 // Suppress the browser's synthetic click; original carousel owns its
 // rotation on pointer-up, so inspect the final front face in a microtask.
 suppressClickUntil=performance.now()+550;
 Promise.resolve().then(()=>{
   if(!stage?.isConnected||active)return;
   const cards=[...stage.querySelectorAll(".fi102-photo")];
   const front=cards.findIndex(c=>c.classList.contains("fi102-front"));
   if(front<0)return;
   if(index===front)openIndex(index);
   else{
     const delta=(index-front+6)%6;
     stage.dispatchEvent(new KeyboardEvent("keydown",{
       key:delta<=3?"ArrowRight":"ArrowLeft",bubbles:true,cancelable:true
     }));
   }
 });
}
function onClick(e){
 if(performance.now()<suppressClickUntil||active)return;
 const index=indexAtPoint(e);
 const cards=[...stage.querySelectorAll(".fi102-photo")];
 const front=cards.findIndex(c=>c.classList.contains("fi102-front"));
 if(index!==front||index<0||hasDrag)return;
 e.preventDefault();e.stopImmediatePropagation();
 openIndex(index);
}
function onKey(e){
 if(e.key!=="Enter"&&e.key!==" ")return;
 const idx=[...stage.querySelectorAll(".fi102-photo")].findIndex(c=>c.classList.contains("fi102-front"));
 if(idx<0)return;
 e.preventDefault();e.stopImmediatePropagation();
 openIndex(idx);
}
/* PLACES / TRUE VERTICAL ELEVATOR
   Home -> Places -> destination -> (Mountains only) a separate peak.
   Each child floor is mounted inside the same world-hub, so there are no
   body-level dialogs, portals, scroll jumps or duplicated chapters. */
const floors=[];
let moving=false;
function host(){return stage?.closest(".world-hub.fi95-ready");}
function baseLevel(){return stage?.closest(".fi95-level");}
function duration(){return reduced()?0:680;}
function syncFloors(){
 const h=host(),base=baseLevel();
 if(!h||!base)return;
 h.dataset.fi132Depth=String(floors.length);
 if(base.dataset.category==="places"){
   const hide=!!floors.length;
   base.inert=hide;
   base.setAttribute("aria-hidden",String(hide));
 }
 floors.forEach((floor,i)=>{
   const shown=i===floors.length-1;
   floor.node.inert=!shown;
   floor.node.setAttribute("aria-hidden",String(!shown));
 });
 active=floors.length?floors[floors.length-1].node:null;
}
function renderFloor(floor){
 const {node,root,entry,parent,depth}=floor;
 const wrap=root.querySelector(".fi130-content");
 const previous=parent?parent.title:"PLACES";
 const head=
   '<div class="fi130-heading">'+
     '<div class="fi130-path">'+
       '<button class="fi130-up" type="button">↑ BACK TO '+esc(previous)+'</button>'+
       '<span class="fi132-path-trail"> / '+esc(entry.kind==="folder"?"COLLECTION":"GALLERY")+'</span>'+
     '</div>'+
     '<span class="fi130-eyebrow">PERSONAL ATLAS / LEVEL '+count(depth+2)+'</span>'+
     '<h2>'+esc(entry.title)+'<em>.</em></h2>'+
     '<p>'+esc(entry.hint)+'</p>'+
   '</div>';
 if(entry.kind==="folder"){
   wrap.innerHTML=head+
     '<div class="fi130-folder-intro">Different peaks. Different days. Each one has its own story.</div>'+
     '<div class="fi130-subgrid">'+entry.children.map((child,i)=>
        '<button class="fi130-subcard" type="button" data-child="'+i+'">'+
        '<span class="fi130-subcard-number">'+count(i+1)+'</span>'+
        '<strong>'+esc(child.title)+'</strong>'+
        '<small>'+esc(child.hint)+'</small>'+
        '<span class="fi130-subcard-action">GO DOWN ONE LEVEL ↓</span></button>'
      ).join("")+
      '<div class="fi130-add-card"><span>+</span><strong>MORE SUMMITS</strong><small>More mountains can be added here.</small></div></div>';
   wrap.querySelectorAll("[data-child]").forEach(btn=>
     btn.addEventListener("click",()=>{
       if(moving||floors[floors.length-1]!==floor)return;
       const child=entry.children[Number(btn.dataset.child)];
       if(child)pushFloor(child,entry);
     })
   );
 }else if(entry.photos&&entry.photos.length){
   wrap.innerHTML=head+
     '<div class="fi130-viewer">'+
       '<button class="fi130-prev" type="button" aria-label="Previous photograph">←</button>'+
       '<figure><img class="fi130-main-image" alt=""><figcaption class="fi130-image-caption"></figcaption></figure>'+
       '<button class="fi130-next" type="button" aria-label="Next photograph">→</button>'+
     '</div><div class="fi130-gallery-meta"></div><div class="fi130-thumbnails"></div>';
   const thumbs=wrap.querySelector(".fi130-thumbnails");
   entry.photos.forEach((p,i)=>{
     const button=document.createElement("button");
     button.type="button";button.className="fi130-thumb";
     button.setAttribute("aria-label","View photo "+(i+1));
     const img=document.createElement("img");
     img.src=p.src;img.alt=p.alt||"";img.loading="lazy";img.decoding="async";
     button.appendChild(img);
     button.addEventListener("click",()=>setPhoto(floor,i));
     thumbs.appendChild(button);
   });
   wrap.querySelector(".fi130-prev").addEventListener("click",()=>setPhoto(floor,floor.photoIndex-1));
   wrap.querySelector(".fi130-next").addEventListener("click",()=>setPhoto(floor,floor.photoIndex+1));
   setPhoto(floor,0);
 }else{
   wrap.innerHTML=head+
     '<div class="fi130-empty">'+
       '<span class="fi130-empty-number">YOUR PERSONAL PHOTOGRAPHS / COMING NEXT</span>'+
       '<div class="fi130-empty-frame"><span class="fi130-empty-plus">+</span>'+
       '<strong>THE FIRST FRAME</strong>'+
       '<p>When your photographs are added, they will become a full-screen gallery on this floor.</p>'+
       '</div><span class="fi130-empty-foot">YOUR PHOTOS ONLY / NO STOCK GALLERY</span>'+
     '</div>';
 }
 root.querySelector(".fi130-up")?.addEventListener("click",popFloor);
 root.querySelector(".fi130-exit")?.addEventListener("click",popFloor);
 root.addEventListener("keydown",e=>{
   if(floors[floors.length-1]!==floor)return;
   if(entry.photos?.length&&e.key==="ArrowRight"){e.preventDefault();setPhoto(floor,floor.photoIndex+1);}
   else if(entry.photos?.length&&e.key==="ArrowLeft"){e.preventDefault();setPhoto(floor,floor.photoIndex-1);}
 });
 root.addEventListener("wheel",e=>e.stopPropagation(),{passive:true});
 node.setAttribute("aria-label",entry.title+" photo archive, level "+(depth+2));
}
function setPhoto(floor,index){
 const photos=floor.entry.photos||[];
 if(!photos.length)return;
 floor.photoIndex=(index+photos.length)%photos.length;
 const photo=photos[floor.photoIndex],root=floor.root;
 const image=root.querySelector(".fi130-main-image");
 if(!image)return;
 image.src=photo.src;image.alt=photo.alt||floor.entry.title;
 root.querySelector(".fi130-image-caption").textContent=photo.caption||"";
 root.querySelector(".fi130-gallery-meta").textContent=
   count(floor.photoIndex+1)+" / "+count(photos.length)+" — "+floor.entry.title;
 root.querySelectorAll(".fi130-thumb").forEach((btn,i)=>{
   const on=i===floor.photoIndex;
   btn.classList.toggle("fi130-thumb-active",on);
   btn.setAttribute("aria-pressed",String(on));
 });
}
function pushFloor(entry,parent){
 const h=host();
 if(!h||!h.classList.contains("fi95-level-open")||baseLevel()?.dataset.category!=="places"||
    moving||floors.length>=2)return;
 moving=true;
 const depth=floors.length+1;
 const node=document.createElement("section");
 node.className="fi95-level fi132-floor";
 node.dataset.category="places";
 node.dataset.depth=String(depth);
 node.inert=true;node.setAttribute("aria-hidden","true");
 node.setAttribute("role","region");
 const root=document.createElement("div");
 root.className="fi130-shell fi132-shell";
 root.innerHTML=
   '<header class="fi130-top">'+
     '<span class="fi130-brand">LM. / PERSONAL ATLAS</span>'+
     '<span class="fi132-level-indicator">FLOOR '+count(depth+2)+' / '+count(parent?4:3)+'</span>'+
     '<button class="fi130-exit" type="button">↑ ONE FLOOR UP</button>'+
   '</header>'+
   '<div class="fi130-content"></div>'+
   '<footer class="fi130-footer"><span>PLACES / YOUR OWN PHOTOGRAPHS</span>'+
   '<span>ONE LEVEL AT A TIME.</span></footer>';
 node.appendChild(root);
 h.appendChild(node);
 const floor={node,root,entry,parent,depth,photoIndex:0};
 renderFloor(floor);
 floors.push(floor);
 // The brand-new floor must first be painted at +103% just like Sound.
 void node.offsetHeight;
 requestAnimationFrame(()=>{
   if(!floors.includes(floor)){moving=false;return;}
   syncFloors();
   root.querySelector(".fi130-up")?.focus({preventScroll:true});
   window.setTimeout(()=>{moving=false;},duration()+35);
 });
}
function popFloor(){
 if(!floors.length||moving)return;
 moving=true;
 const leaving=floors.pop();
 syncFloors();
 window.setTimeout(()=>{
   leaving.node.remove();
   moving=false;
   const current=floors[floors.length-1];
   if(current)current.root.querySelector(".fi130-up")?.focus({preventScroll:true});
   else if(stage?.isConnected)stage.focus({preventScroll:true});
 },duration()+35);
}
function clearFloors(){
 const h=host()||document.querySelector(".world-hub.fi95-ready");
 for(const floor of floors)floor.node.remove();
 floors.length=0;active=null;moving=false;
 h?.removeAttribute("data-fi132-depth");
 const base=baseLevel();
 if(base?.dataset.category==="places"&&h?.classList.contains("fi95-level-open")){
   base.inert=false;base.setAttribute("aria-hidden","false");
 }
}
function init(){
 loadPersonalPhotos();
 window.addEventListener("focus",loadPersonalPhotos,{passive:true});
 // Window capture runs before the existing Home Escape handler, so a
 // return from floor 04 never jumps straight out of Places to Home.
 window.addEventListener("keydown",e=>{
   if(e.key!=="Escape"||!floors.length)return;
   e.preventDefault();e.stopImmediatePropagation();
   popFloor();
 },true);
 if(!document.querySelector('link[href*="places-personal-atlas-132.css"]')){
   const link=document.createElement("link");
   link.rel="stylesheet";link.href=cssUrl;
   link.dataset.fi132Style="1";document.head.appendChild(link);
 }
 watcher=new MutationObserver(()=>{
   if(stage&&!stage.isConnected){clearFloors();unhook();}
   syncStage();
 });
 watcher.observe(document.body,{childList:true,subtree:true});
 syncStage();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
else init();
})();