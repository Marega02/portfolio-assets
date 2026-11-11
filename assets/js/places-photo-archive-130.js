/* PHASE 130 — PLACES / PERSONAL PHOTO ARCHIVE
   Keeps the approved six-face spatial carousel. Click the front image:
   a city opens one photo story; Mountains opens a nested hikes index.
   IMPORTANT: gallery photo arrays deliberately empty until real user
   photography is provided. No stock image is represented as personal.
*/
(()=>{
  const entries=[
    {id:"soca",name:"SOČA VALLEY",region:"SLOVENIA",note:"RIVER / VALLEY",type:"gallery",photos:[]},
    {id:"london",name:"LONDON",region:"UNITED KINGDOM",note:"CITY JOURNAL",type:"gallery",photos:[]},
    {id:"kl",name:"KUALA LUMPUR",region:"MALAYSIA",note:"CITY JOURNAL",type:"gallery",photos:[]},
    {id:"mountains",name:"MOUNTAINS",region:"HIKING ARCHIVE",note:"TRAILS / SUMMITS",type:"group",items:[
      {id:"rodica",name:"RODICA",region:"SLOVENIA",note:"MOUNTAIN JOURNAL",photos:[]}
    ]},
    {id:"singapore",name:"SINGAPORE",region:"SINGAPORE",note:"CITY JOURNAL",type:"gallery",photos:[]},
    {id:"future",name:"MORE TO COME",region:"AN OPEN ARCHIVE",note:"STORIES IN PROGRESS",type:"gallery",photos:[]}
  ];
  const escapeHTML=s=>String(s??"").replace(/[&<>"']/g,c=>(
    {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const safePhoto=p=>{
    const url=typeof p==="string"?p:p?.src;
    return typeof url==="string"&&/^https:\/\//i.test(url)?url:"";
  };
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
  function init(){
    const hub=document.querySelector(".world-hub.fi95-ready");
    if(!hub||hub.dataset.fi130PlacesReady==="1")return;
    hub.dataset.fi130PlacesReady="1";
    const chapter=hub.querySelector(".fi95-level");
    let stage=null,readoutObserver=null,floor=null,closing=false,closeTimer=0;
    let current=entries[0],subPlace=null,mode="gallery",photoIndex=-1;
    let tap=null,lastFocus=null,photoList=[];
    let scanQueued=false;
    const getIndex=()=>{
      const cards=stage?[...stage.querySelectorAll(".fi102-photo")]:[];
      return Math.max(0,cards.findIndex(x=>x.classList.contains("fi102-front")));
    };
    function updateReadout(){
      if(!stage||chapter.dataset.category!=="places")return;
      const entry=entries[getIndex()];
      if(!entry)return;
      const update=(selector,value)=>{
        const node=stage.querySelector(selector);
        if(node&&node.textContent!==value)node.textContent=value;
      };
      update(".fi109-place-name",entry.name);
      update(".fi109-place-country",entry.region);
      update(".fi109-place-note",entry.note);
      const cards=[...stage.querySelectorAll(".fi102-photo")];
      cards.forEach((card,i)=>{
        const item=entries[i];
        if(!item)return;
        card.setAttribute("aria-label","Open "+item.name);
        card.setAttribute("aria-disabled","false");
      });
      const meta=stage.querySelector(".fi100-scene-meta span");
      if(meta&&meta.textContent!=="MY PLACES / 06 COLLECTIONS")
        meta.textContent="MY PLACES / 06 COLLECTIONS";
      const prompt=stage.querySelector(".fi100-instruction span:first-child, .fi102-instruction span:first-child");
      if(prompt&&prompt.textContent!=="DRAG TO EXPLORE · TAP TO OPEN")
        prompt.textContent="DRAG TO EXPLORE · TAP TO OPEN";
    }
    function initStage(nextStage){
      if(stage===nextStage)return;
      if(readoutObserver)readoutObserver.disconnect();
      stage=nextStage;
      if(!stage)return;
      const cards=[...stage.querySelectorAll(".fi102-photo")].sort((a,b)=>{
        const ix=x=>Number(x.className.match(/fi95-item-(\d+)/)?.[1]??99);
        return ix(a)-ix(b);
      });
      cards.forEach((card,i)=>{
        const entry=entries[i];
        if(!entry)return;
        card.dataset.fi130Index=String(i);
        card.classList.add("fi130-place-card");
        const title=card.querySelector(".fi95-item-meta strong");
        const sub=card.querySelector(".fi95-item-meta small");
        if(title)title.textContent=entry.name;
        if(sub)sub.textContent=entry.region;
        // Original faces 04-06 were Kyoto/Iceland/Marrakech DEMOS.
        // Retire those unrelated photos instead of claiming they are
        // the visitor's own pictures of mountains or Singapore.
        if(i>=3){
          card.classList.add("fi130-cover-"+i);
          card.querySelector(".fi95-item-image")?.replaceChildren();
        }
      });
      stage.setAttribute("aria-label",
        "My places. Rotate six cards by dragging or arrows; click the front photo or press Enter to open it.");
      const readout=stage.querySelector(".fi109-place-readout");
      if(readout){
        readoutObserver=new MutationObserver(updateReadout);
        readoutObserver.observe(readout,{childList:true,characterData:true,subtree:true});
      }
      updateReadout();
    }
    function scan(){
      const next=chapter.dataset.category==="places"?
        chapter.querySelector(".fi100-stage.fi102-stage"):null;
      if(next!==stage)initStage(next);
      if(floor&&chapter.dataset.category!=="places")closeFloor(true);
    }
    function scheduleScan(){
      if(scanQueued)return;
      scanQueued=true;
      Promise.resolve().then(()=>{scanQueued=false;scan();});
    }
    function floorHTML(){
      return '<div class="fi130-shell">'+
        '<header class="fi130-header">'+
          '<span class="fi130-mark">LM<span>®</span> / THE PERSONAL ATLAS</span>'+
          '<button type="button" class="fi130-back" data-action="back">← <span>BACK TO PLACES</span></button>'+
        '</header>'+
        '<div class="fi130-content" tabindex="-1"></div>'+
        '<footer class="fi130-footer"><span>PLACES / PERSONAL PHOTOGRAPHS</span><span>COLLECTING MOMENTS, NOT MILES.</span></footer>'+
        '</div>'+
        '<div class="fi130-lightbox" role="dialog" aria-label="Photo viewer" aria-modal="true" hidden>'+
          '<button type="button" class="fi130-lightbox-close" data-action="close-lightbox" aria-label="Close photo">CLOSE ×</button>'+
          '<button type="button" class="fi130-lightbox-prev" data-action="previous" aria-label="Previous photo">←</button>'+
          '<figure class="fi130-lightbox-figure"><img alt=""><figcaption></figcaption></figure>'+
          '<button type="button" class="fi130-lightbox-next" data-action="next" aria-label="Next photo">→</button>'+
          '<div class="fi130-lightbox-count"></div>'+
        '</div>';
    }
    function photoMarkup(item){
      const photos=(item.photos||[]).filter(p=>safePhoto(p));
      photoList=photos;
      if(!photos.length){
        return '<div class="fi130-empty">'+
          '<span class="fi130-empty-index">PERSONAL PHOTO ARCHIVE / 000</span>'+
          '<span class="fi130-empty-symbol" aria-hidden="true">✳</span>'+
          '<h3>THE PHOTOGRAPHS<br><em>GO HERE.</em></h3>'+
          '<p>This is a space for my own photographs. The first frames are coming soon.</p>'+
          '<span class="fi130-empty-line"></span>'+
        '</div>';
      }
      return '<div class="fi130-gallery" aria-label="Photo gallery">'+photos.map((p,i)=>{
        const src=safePhoto(p),alt=typeof p==="string"?
          "Photograph "+(i+1)+" from "+item.name:(p.alt||item.name+", photograph "+(i+1));
        return '<button type="button" class="fi130-photo fi130-photo-'+(i%5)+
          '" data-photo-index="'+i+'" aria-label="View photo '+(i+1)+' of '+photos.length+'">'+
          '<img src="'+escapeHTML(src)+'" alt="'+escapeHTML(alt)+
          '" loading="lazy" decoding="async"><span class="fi130-photo-n">'+
          String(i+1).padStart(2,"0")+'</span></button>';
      }).join("")+'</div>';
    }
    function render(){
      if(!floor)return;
      const display=floor.querySelector(".fi130-content");
      const back=floor.querySelector(".fi130-back span");
      const location=subPlace||current;
      const viewingGroup=current.type==="group"&&!subPlace;
      mode=viewingGroup?"group":subPlace?"subgallery":"gallery";
      if(back)back.textContent=subPlace?"BACK TO MOUNTAINS":"BACK TO PLACES";
      const title=escapeHTML(location.name);
      const eyebrow=subPlace?"MOUNTAINS / "+title:"PLACES / "+title;
      const count=viewingGroup?(current.items||[]).length:(location.photos||[]).length;
      const heading='<div class="fi130-intro">'+
        '<div><span class="fi130-kicker">THE PERSONAL ATLAS / '+escapeHTML(eyebrow)+'</span>'+
        '<h2>'+title+'<em>.</em></h2></div>'+
        '<div class="fi130-intro-aside"><span>'+escapeHTML(location.region)+
        '</span><strong>'+String(count).padStart(2,"0")+
        (viewingGroup?" LOCATIONS":" PHOTOGRAPHS")+'</strong></div>'+
        '</div>';
      let content="";
      if(viewingGroup){
        const children=current.items||[];
        content='<div class="fi130-group-intro">'+
          '<span>01 / THE HIKING JOURNAL</span>'+
          '<p>One collection, different trails. Choose a mountain to open its own photo story.</p>'+
        '</div><div class="fi130-group-grid">'+children.map((child,i)=>
          '<button type="button" class="fi130-mountain" data-sub="'+escapeHTML(child.id)+'">'+
            '<span class="fi130-mountain-visual"><span class="fi130-ridge" aria-hidden="true"></span>'+
              '<span class="fi130-mountain-no">'+String(i+1).padStart(2,"0")+'</span></span>'+
            '<span class="fi130-mountain-name">'+escapeHTML(child.name)+'</span>'+
            '<span class="fi130-mountain-meta">'+escapeHTML(child.region)+
            ' <b aria-hidden="true">↗</b></span>'+
          '</button>').join("")+
          '<div class="fi130-next-trail"><span>MORE SUMMITS</span>'+
          '<strong>STORIES<br>TO ADD.</strong><small>THE ARCHIVE WILL GROW.</small></div>'+
          '</div>';
        photoList=[];
      }else{
        content='<div class="fi130-story-line"><span>01 / A VISUAL JOURNAL</span>'+
          '<p>Photographs, details and moments from '+title+'.</p></div>'+
          photoMarkup(location);
      }
      display.innerHTML=heading+content;
      display.scrollTop=0;
      const lightbox=floor.querySelector(".fi130-lightbox");
      if(lightbox)lightbox.hidden=true;
      photoIndex=-1;
    }
    function openRoot(i){
      if(floor||closing||chapter.dataset.category!=="places"||
         !hub.classList.contains("fi95-level-open"))return;
      current=entries[i]||entries[0];subPlace=null;
      lastFocus=document.activeElement;
      floor=document.createElement("section");
      floor.className="fi95-level fi130-places-floor";
      floor.setAttribute("role","region");
      floor.setAttribute("aria-label","Photo archive");
      floor.setAttribute("aria-hidden","true");
      floor.inert=true;
      floor.innerHTML=floorHTML();
      hub.appendChild(floor);
      render();
      void floor.offsetHeight;
      hub.classList.add("fi130-places-open");
      chapter.inert=true;
      chapter.setAttribute("aria-hidden","true");
      floor.inert=false;
      floor.setAttribute("aria-hidden","false");
      floor.querySelector(".fi130-back")?.focus({preventScroll:true});
    }
    function closeFloor(immediate=false){
      if(!floor||closing&&!immediate)return;
      if(closeTimer){clearTimeout(closeTimer);closeTimer=0;}
      const old=floor;
      closing=true;
      hub.classList.remove("fi130-places-open");
      old.inert=true;
      old.setAttribute("aria-hidden","true");
      if(chapter.dataset.category==="places"){
        chapter.inert=false;
        chapter.setAttribute("aria-hidden","false");
      }
      const cleanup=()=>{
        old.remove();
        if(floor===old)floor=null;
        closing=false;closeTimer=0;
        if(!immediate&&chapter.dataset.category==="places")
          (stage||lastFocus)?.focus?.({preventScroll:true});
      };
      if(immediate||reduced.matches)cleanup();
      else closeTimer=window.setTimeout(cleanup,570);
    }
    function lightboxOpen(i){
      if(!floor||!photoList.length)return;
      photoIndex=(i+photoList.length)%photoList.length;
      const modal=floor.querySelector(".fi130-lightbox");
      const image=modal.querySelector("img");
      const entry=photoList[photoIndex];
      image.src=safePhoto(entry);
      image.alt=typeof entry==="string"?"Photograph "+(photoIndex+1):
        (entry.alt||"Personal photograph "+(photoIndex+1));
      modal.querySelector("figcaption").textContent=
        (subPlace||current).name;
      modal.querySelector(".fi130-lightbox-count").textContent=
        String(photoIndex+1).padStart(2,"0")+" / "+String(photoList.length).padStart(2,"0");
      modal.hidden=false;
      modal.querySelector(".fi130-lightbox-close")?.focus({preventScroll:true});
    }
    function lightboxClose(){
      if(!floor)return;
      floor.querySelector(".fi130-lightbox").hidden=true;
      const idx=photoIndex;photoIndex=-1;
      floor.querySelector('[data-photo-index="'+idx+'"]')?.focus({preventScroll:true});
    }
    function goBack(){
      if(photoIndex>=0){lightboxClose();return;}
      if(subPlace){subPlace=null;render();floor?.querySelector(".fi130-back")?.focus({preventScroll:true});return;}
      closeFloor();
    }
    hub.addEventListener("click",event=>{
      if(!floor)return;
      const target=event.target instanceof Element?event.target:null;
      if(!target||!floor.contains(target))return;
      const act=target.closest("[data-action]")?.dataset.action;
      const sub=target.closest("[data-sub]")?.dataset.sub;
      const pic=target.closest("[data-photo-index]")?.dataset.photoIndex;
      if(act==="back")goBack();
      else if(act==="close-lightbox")lightboxClose();
      else if(act==="previous")lightboxOpen(photoIndex-1);
      else if(act==="next")lightboxOpen(photoIndex+1);
      else if(sub){
        subPlace=(current.items||[]).find(x=>x.id===sub)||null;
        if(subPlace)render();
      }else if(pic!==undefined)lightboxOpen(Number(pic));
    });
    document.addEventListener("pointerdown",event=>{
      if(floor||chapter.dataset.category!=="places"||!stage)return;
      const card=event.target instanceof Element?
        event.target.closest(".fi102-photo[data-fi130-index]"):null;
      if(!card||!stage.contains(card))return;
      tap={pointer:event.pointerId,x:event.clientX,y:event.clientY,
        index:Number(card.dataset.fi130Index)};
    },true);
    document.addEventListener("pointerup",event=>{
      if(!tap||event.pointerId!==tap.pointer)return;
      const was=tap;tap=null;
      if(floor||!stage||chapter.dataset.category!=="places")return;
      if(Math.hypot(event.clientX-was.x,event.clientY-was.y)>13)return;
      Promise.resolve().then(()=>{
        if(!stage||floor||chapter.dataset.category!=="places")return;
        const front=getIndex();
        if(was.index===front)openRoot(front);
        else {
          const diff=(was.index-front+6)%6;
          const key=diff<=3?"ArrowRight":"ArrowLeft";
          stage.dispatchEvent(new KeyboardEvent("keydown",{key,bubbles:true,cancelable:true}));
        }
      });
    },true);
    document.addEventListener("pointercancel",()=>{tap=null;},true);
    document.addEventListener("keydown",event=>{
      if(floor){
        if(event.key==="Escape"){
          event.preventDefault();event.stopImmediatePropagation();
          goBack();return;
        }
        if(photoIndex>=0&&(event.key==="ArrowLeft"||event.key==="ArrowRight")){
          event.preventDefault();event.stopImmediatePropagation();
          lightboxOpen(photoIndex+(event.key==="ArrowRight"?1:-1));
        }
        return;
      }
      if(stage&&chapter.dataset.category==="places"&&
         (event.key==="Enter"||event.key===" ")&&
         (event.target===stage||stage.contains(event.target))){
        event.preventDefault();event.stopImmediatePropagation();
        openRoot(getIndex());
      }
    },true);
    new MutationObserver(scheduleScan).observe(hub,{childList:true,subtree:true});
    scan();
  }
  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();