/* PLACES 130 — PERSONAL PHOTO ATLAS
   Keeps the existing spatial carousel; changes only labels of the three
   demonstration destinations and introduces a real, nested photo archive.
   Photo arrays intentionally empty until the photographer supplies images. */
(()=>{
"use strict";
const COLLECTIONS=[
  {title:"SOČA VALLEY",hint:"SLOVENIA",kind:"gallery",photos:[]},
  {title:"LONDON",hint:"UNITED KINGDOM",kind:"gallery",photos:[]},
  {title:"KUALA LUMPUR",hint:"MALAYSIA",kind:"gallery",photos:[]},
  {title:"MOUNTAINS",hint:"TRAILS & SUMMITS",kind:"folder",children:[
    {title:"RODICA",hint:"SLOVENIAN ALPS",kind:"gallery",photos:[]}
  ]},
  {title:"YOUR NEXT PLACE",hint:"COMING SOON",kind:"empty",photos:[]},
  {title:"MORE MEMORIES",hint:"COMING SOON",kind:"empty",photos:[]}
];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const count=n=>String(n).padStart(2,"0");
let active=null,stage=null,readoutObserver=null,watcher=null,dragX=0,dragY=0,hasDrag=false,returnFocus=null;
const mountSelector=".world-hub.fi95-ready .fi95-level[data-category='places'] .fi100-stage";
const reduced=()=>window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const cssUrl="https://marega02.github.io/portfolio-assets/assets/css/places-personal-atlas-130.css?v=130.1";
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
   c.setAttribute("role","button");
   c.setAttribute("aria-label","Explore "+COLLECTIONS[i].title);
   c.classList.add("fi130-clickable");
   // The previous three concept covers were not the user's photos.
   // For Mountains, use a scenic existing cover only as a navigation illustration.
   if(i===3){
     const img=c.querySelector(".fi95-item-image img");
     if(img){img.src="https://images.pexels.com/photos/10050561/pexels-photo-10050561.jpeg?auto=compress&cs=tinysrgb&w=900";img.alt="Illustrative mountain landscape";}
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
     cards.forEach((c,i)=>{const t=c.querySelector(".fi95-item-meta strong");if(t&&t.textContent!==COLLECTIONS[i].title)t.textContent=COLLECTIONS[i].title;});
   };
   readoutObserver=new MutationObserver(update);
   readoutObserver.observe(stage.querySelector(".fi109-place-readout")||label,{childList:true,subtree:true,characterData:true});
   update();
 }
 stage.addEventListener("pointerdown",onDown,true);
 stage.addEventListener("pointermove",onMove,true);
 stage.addEventListener("click",onClick,true);
 stage.addEventListener("keydown",onKey,true);
 stage.querySelector(".fi100-instruction span:first-child")?.insertAdjacentHTML("beforeend",' <b class="fi130-hint"> · CLICK PHOTO TO OPEN ↗</b>');
}
function unhook(){
 if(stage){stage.removeEventListener("pointerdown",onDown,true);stage.removeEventListener("pointermove",onMove,true);stage.removeEventListener("click",onClick,true);stage.removeEventListener("keydown",onKey,true);}
 readoutObserver?.disconnect();readoutObserver=null;stage=null;
}
function onDown(e){dragX=e.clientX;dragY=e.clientY;hasDrag=false;}
function onMove(e){if(Math.abs(e.clientX-dragX)>12||Math.abs(e.clientY-dragY)>12)hasDrag=true;}
function onClick(e){
 const card=e.target instanceof Element?e.target.closest(".fi102-photo"):null;
 if(!card||hasDrag)return;
 if(!card.classList.contains("fi102-front"))return; // side photos still rotate
 const i=[...stage.querySelectorAll(".fi102-photo")].indexOf(card);
 if(i<0)return;
 e.preventDefault();e.stopImmediatePropagation();
 returnFocus=stage;
 showEntry(COLLECTIONS[i],null);
}
function onKey(e){
 if(e.key!=="Enter"&&e.key!==" ")return;
 const idx=[...stage.querySelectorAll(".fi102-photo")].findIndex(c=>c.classList.contains("fi102-front"));
 if(idx<0)return;
 e.preventDefault();e.stopImmediatePropagation();
 returnFocus=stage;showEntry(COLLECTIONS[idx],null);
}
function shell(){
 if(active)return active;
 const root=document.createElement("section");
 root.className="fi130-shell";
 root.setAttribute("role","dialog");root.setAttribute("aria-modal","true");
 root.setAttribute("aria-label","Personal photo atlas");
 root.innerHTML='<header class="fi130-top"><span class="fi130-brand">LM. / PERSONAL ATLAS</span><button type="button" class="fi130-exit">CLOSE ×</button></header>'+
 '<div class="fi130-content"></div><footer class="fi130-footer"><span>PLACES / SHOT BY ME</span><span>MEMORIES, NOT A CHECKLIST.</span></footer>';
 document.body.appendChild(root);
 root.querySelector(".fi130-exit").addEventListener("click",close);
 root.addEventListener("keydown",onOverlayKey);
 root.addEventListener("wheel",e=>e.stopPropagation(),{passive:true});
 active=root;document.body.classList.add("fi130-open");
 requestAnimationFrame(()=>root.classList.add("fi130-visible"));
 return root;
}
let page=null,rootEntry=null,photoIndex=0;
function showEntry(entry,parent){
 const root=shell();page=entry;
 if(!parent)rootEntry=entry;
 const wrap=root.querySelector(".fi130-content");
 const crumbs=parent?'<button class="fi130-up" type="button">← '+esc(parent.title)+'</button>':
 '<button class="fi130-up" type="button">← BACK TO PLACES</button>';
 const head='<div class="fi130-heading"><div class="fi130-path">'+crumbs+'<span> / '+esc(entry.kind==="folder"?"COLLECTION":"PHOTO JOURNAL")+'</span></div>'+
 '<span class="fi130-eyebrow">PLACES / '+(entry.kind==="folder"?"TRAIL ARCHIVE":"PERSONAL MEMORIES")+'</span>'+
 '<h2>'+esc(entry.title)+'<em>.</em></h2><p>'+esc(entry.hint)+'</p></div>';
 if(entry.kind==="folder"){
  wrap.innerHTML=head+'<div class="fi130-folder-intro">Different peaks. Different days. Each one has its own story.</div>'+
   '<div class="fi130-subgrid">'+entry.children.map((child,i)=>
   '<button class="fi130-subcard" type="button" data-child="'+i+'"><span class="fi130-subcard-number">'+count(i+1)+'</span><strong>'+esc(child.title)+'</strong><small>'+esc(child.hint)+'</small><span class="fi130-subcard-action">OPEN GALLERY ↗</span></button>').join("")+
   '<div class="fi130-add-card"><span>+</span><strong>MORE SUMMITS</strong><small>New hikes will be added here.</small></div></div>';
  wrap.querySelectorAll("[data-child]").forEach(b=>b.addEventListener("click",()=>showEntry(entry.children[Number(b.dataset.child)],entry)));
 }else if(entry.photos&&entry.photos.length){
  wrap.innerHTML=head+'<div class="fi130-viewer"><button class="fi130-prev" type="button" aria-label="Previous photograph">←</button>'+
   '<figure><img class="fi130-main-image" alt=""><figcaption class="fi130-image-caption"></figcaption></figure>'+
   '<button class="fi130-next" type="button" aria-label="Next photograph">→</button></div>'+
   '<div class="fi130-gallery-meta"></div><div class="fi130-thumbnails"></div>';
  photoIndex=0;
  const imgs=entry.photos;const thumbs=wrap.querySelector(".fi130-thumbnails");
  imgs.forEach((p,i)=>{
   const btn=document.createElement("button");btn.className="fi130-thumb";btn.type="button";btn.setAttribute("aria-label","View photo "+(i+1));
   const img=document.createElement("img");img.src=p.src;img.alt=p.alt||"";img.loading="lazy";btn.appendChild(img);
   btn.addEventListener("click",()=>setPhoto(entry,i));
   thumbs.appendChild(btn);
  });
  wrap.querySelector(".fi130-prev").addEventListener("click",()=>setPhoto(entry,photoIndex-1));
  wrap.querySelector(".fi130-next").addEventListener("click",()=>setPhoto(entry,photoIndex+1));
  setPhoto(entry,0);
 }else{
  wrap.innerHTML=head+'<div class="fi130-empty"><span class="fi130-empty-number">01 / YOUR PHOTOGRAPHS</span>'+
   '<div class="fi130-empty-frame"><span class="fi130-empty-plus">+</span><strong>'+ (entry.kind==="empty"?"A NEW CHAPTER":"THE FIRST FRAME")+'</strong>'+
   '<p>'+ (entry.kind==="empty"?"Reserved for a future destination.":"Your own photographs will appear here once added to the archive.")+'</p></div>'+
   '<span class="fi130-empty-foot">PERSONAL PHOTOS ONLY / NO STOCK GALLERY</span></div>';
 }
 wrap.querySelector(".fi130-up")?.addEventListener("click",()=>parent?showEntry(parent,null):close());
 root.querySelector(".fi130-exit")?.focus({preventScroll:true});
}
function setPhoto(entry,i){
 const photos=entry.photos||[];
 if(!photos.length)return;
 photoIndex=(i+photos.length)%photos.length;
 const p=photos[photoIndex];const root=active;
 const img=root.querySelector(".fi130-main-image");
 img.src=p.src;img.alt=p.alt||entry.title;img.decoding="async";
 root.querySelector(".fi130-image-caption").textContent=p.caption||"";
 root.querySelector(".fi130-gallery-meta").textContent=count(photoIndex+1)+" / "+count(photos.length)+" — "+entry.title;
 root.querySelectorAll(".fi130-thumb").forEach((b,n)=>{b.classList.toggle("fi130-thumb-active",n===photoIndex);b.setAttribute("aria-pressed",String(n===photoIndex));});
}
function onOverlayKey(e){
 if(e.key==="Escape"){e.preventDefault();e.stopPropagation();if(page!==rootEntry&&rootEntry?.kind==="folder")showEntry(rootEntry,null);else close();}
 if(page?.photos?.length&&e.key==="ArrowRight"){e.preventDefault();setPhoto(page,photoIndex+1);}
 if(page?.photos?.length&&e.key==="ArrowLeft"){e.preventDefault();setPhoto(page,photoIndex-1);}
 if(e.key==="Tab"){
  const els=[...active.querySelectorAll("button:not([disabled])")];
  if(!els.length)return;
  const first=els[0],last=els.at(-1);
  if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
  else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
 }
}
function close(){
 if(!active)return;
 const toRemove=active;active=null;page=null;rootEntry=null;
 document.body.classList.remove("fi130-open");toRemove.classList.remove("fi130-visible");
 const complete=()=>toRemove.remove();
 if(reduced())complete();else setTimeout(complete,390);
 if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true});
 returnFocus=null;
}
function init(){
 if(document.querySelector("link[data-fi130-style]")==null){
  const l=document.createElement("link");l.rel="stylesheet";l.href=cssUrl;l.dataset.fi130Style="1";document.head.appendChild(l);
 }
 watcher=new MutationObserver(()=>{
   if(stage&&!stage.isConnected){unhook();if(active)close();}
   syncStage();
 });
 watcher.observe(document.body,{childList:true,subtree:true});
 syncStage();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();