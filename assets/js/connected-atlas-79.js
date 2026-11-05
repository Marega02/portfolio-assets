/* PHASE 79 — CONNECTED ATLAS
   Original Step 15 owns opening, closing, focus, ESC and next-entry.
   This module listens in capture phase but NEVER prevents or delays it.
   Desktop: a copy of the exact Step 70 SVG travels from the Places postcard
   to the Step 75 journal cover. Mobile: original slide always remains.
*/
(() => {
  function init() {
    const atlas=document.querySelector(".p14-world");
    const journal=document.querySelector(".p15-journal");
    const postcard=atlas?.querySelector(".p14-postcard");
    const hero=journal?.querySelector(".p15-hero-figure");
    const launch=atlas?.querySelector(".p15-launch");
    if(!atlas||!journal||!postcard||!hero||!launch||
       !atlas.classList.contains("s70-ready")||journal.dataset.s79Ready==="1")return;

    const motion=window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrast=window.matchMedia("(prefers-contrast: more)");
    const wide=window.matchMedia("(min-width: 992px)");
    const canMove=()=>wide.matches&&!motion.matches&&!contrast.matches&&
      !document.hidden&&typeof Element.prototype.animate==="function";

    atlas.classList.add("s79-ready");
    journal.classList.add("s79-ready");
    journal.dataset.s79Ready="1";

    if(!postcard.querySelector(":scope > .s79-return-mark")){
      const mark=document.createElement("span");
      mark.className="s79-return-mark";
      mark.setAttribute("aria-hidden","true");
      postcard.appendChild(mark);
    }
    let lastOpen=journal.classList.contains("is-open");
    let frame=null;
    let animations=[];
    let timeout=0;
    let flashTimer=0;
    let sequence=0;

    const finiteRect=rect=>
      rect && [rect.left,rect.top,rect.width,rect.height].every(Number.isFinite) &&
      rect.width>80&&rect.height>80;
    const isInViewport=rect=>
      finiteRect(rect)&&rect.top<innerHeight*.92&&rect.bottom>innerHeight*.08;

    function namespace(svg,tag){
      const ids=new Map();
      svg.querySelectorAll("[id]").forEach(node=>{
        const old=node.id;
        const next="s79-"+tag+"-"+old;
        ids.set(old,next);
        node.id=next;
      });
      if(!ids.size)return;
      const all=[svg,...svg.querySelectorAll("*")];
      for(const node of all){
        for(const attr of [...node.attributes]){
          let val=attr.value.replace(/url\(#([^)]+)\)/g,(match,id)=>
            ids.has(id)?"url(#"+ids.get(id)+")":match);
          if((attr.name==="href"||attr.name==="xlink:href")&&val.startsWith("#")){
            const id=val.slice(1);
            if(ids.has(id))val="#"+ids.get(id);
          }
          if(val!==attr.value)node.setAttribute(attr.name,val);
        }
      }
    }
    function getSource(key){
      return atlas.querySelector('.s70-worldview[data-s70-scene="'+key+'"] svg');
    }
    function addFrame(source,key,rect){
      const node=document.createElement("div");
      node.className="s79-shared-frame";
      node.dataset.s79Place=key;
      node.setAttribute("aria-hidden","true");
      node.style.left=rect.left+"px";
      node.style.top=rect.top+"px";
      node.style.width=rect.width+"px";
      node.style.height=rect.height+"px";
      const svg=source.cloneNode(true);
      svg.removeAttribute("role");
      svg.removeAttribute("aria-label");
      svg.setAttribute("aria-hidden","true");
      namespace(svg,key+"-"+sequence);
      node.appendChild(svg);
      document.body.appendChild(node);
      return node;
    }
    function clear(){
      sequence++;
      if(timeout){clearTimeout(timeout);timeout=0}
      for(const a of animations){
        try{a.cancel()}catch(_){}
      }
      animations=[];
      frame?.remove();
      frame=null;
      journal.classList.remove("s79-bridge-open","s79-bridge-close","s79-hide-hero");
    }
    function animateFrame(from,to,duration){
      if(!frame)return null;
      return frame.animate([
        {left:from.left+"px",top:from.top+"px",width:from.width+"px",height:from.height+"px"},
        {left:to.left+"px",top:to.top+"px",width:to.width+"px",height:to.height+"px"}
      ],{duration,easing:"cubic-bezier(.76,0,.24,1)",fill:"both"});
    }
    function armWatchdog(){
      if(timeout)clearTimeout(timeout);
      timeout=setTimeout(clear,1850);
    }

    function opening(){
      if(!canMove()||frame||journal.classList.contains("is-open")||
         !atlas.classList.contains("is-active"))return;
      const key=atlas.dataset.place||"soca";
      const source=getSource(key);
      const start=postcard.getBoundingClientRect();
      if(!source||!isInViewport(start))return;
      clear();
      const current=sequence;
      frame=addFrame(source,key,start);
      journal.classList.add("s79-bridge-open","s79-hide-hero");
      armWatchdog();

      // The original click listener updates the content, opens the journal
      // and moves keyboard focus. We let it run without interruption.
      requestAnimationFrame(()=>{
        requestAnimationFrame(()=>{
          if(sequence!==current||!frame||!journal.classList.contains("is-open")){
            if(sequence===current)clear();
            return;
          }
          const destination=hero.getBoundingClientRect();
          if(!finiteRect(destination)||!isInViewport(destination)){
            clear();
            return;
          }
          const travel=animateFrame(start,destination,1080);
          const page=journal.animate([
            {opacity:0,offset:0},
            {opacity:0.12,offset:.12},
            {opacity:.88,offset:.66},
            {opacity:1,offset:1}
          ],{duration:1080,easing:"ease-out",fill:"both"});
          animations.push(travel,page);
          travel.addEventListener("finish",()=>{
            if(sequence===current)clear();
          },{once:true});
        });
      });
    }

    function closing(){
      if(!canMove()||frame||!journal.classList.contains("is-open")||
         !atlas.classList.contains("is-active"))return;
      const key=journal.dataset.place||"soca";
      const source=hero.querySelector(".p15-hero-visual svg");
      const from=hero.getBoundingClientRect();
      const to=postcard.getBoundingClientRect();
      // When reading far down the page, fall back to the familiar slide.
      if(!source||!isInViewport(from)||!isInViewport(to))return;
      clear();
      const current=sequence;
      frame=addFrame(source,key,from);
      journal.classList.add("s79-bridge-close","s79-hide-hero");
      armWatchdog();

      const travel=animateFrame(from,to,960);
      const fade=journal.animate([
        {opacity:1,offset:0},
        {opacity:.56,offset:.28},
        {opacity:0,offset:1}
      ],{duration:740,easing:"ease-out",fill:"both"});
      animations.push(travel,fade);
      travel.addEventListener("finish",()=>{
        if(sequence===current)clear();
      },{once:true});
    }

    // Capture permits preparing the optical clone BEFORE the stock
    // handlers mutate scene classes. We do not cancel, prevent, or stop.
    launch.addEventListener("click",opening,true);
    [...journal.querySelectorAll(".p15-close,.p15-bottom-back")].forEach(button=>{
      button.addEventListener("click",closing,true);
    });

    function returned(){
      postcard.classList.remove("s79-just-returned");
      if(flashTimer)clearTimeout(flashTimer);
      if(!motion.matches&&!contrast.matches){
        void postcard.offsetWidth;
        postcard.classList.add("s79-just-returned");
        flashTimer=setTimeout(()=>{
          postcard.classList.remove("s79-just-returned");
          flashTimer=0;
        },950);
      }
    }
    const observer=new MutationObserver(()=>{
      const opened=journal.classList.contains("is-open");
      if(lastOpen&&!opened){
        // Escape or rapid close while an opening bridge is in flight:
        // immediately release the hidden hero and the temporary frame.
        if(journal.classList.contains("s79-bridge-open"))clear();
        returned();
      }
      lastOpen=opened;
    });
    observer.observe(journal,{attributes:true,attributeFilter:["class"]});

    const stopIfNeeded=()=>{
      if(!canMove()&&frame)clear();
    };
    motion.addEventListener?.("change",stopIfNeeded);
    contrast.addEventListener?.("change",stopIfNeeded);
    wide.addEventListener?.("change",stopIfNeeded);
    document.addEventListener("visibilitychange",stopIfNeeded);
  }
  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();