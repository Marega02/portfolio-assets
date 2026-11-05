/* PHASE 80 — CONNECTED FREQUENCIES
   Extends the original SOUND -> RECORD SHELF transition without replacing
   its controller. Capture handlers ONLY prepare a pointer-free visual;
   click, Escape, focus, ARIA and album selection remain STEP 12/13-owned.
*/
(() => {
  function init() {
    const sound=document.querySelector(".sound-world");
    const archive=sound?.querySelector(".sound-archive");
    const record=sound?.querySelector(".sound-record");
    const cover=archive?.querySelector(".sa-art");
    const openButton=sound?.querySelector(".sound-enter-archive");
    const closeButton=archive?.querySelector(".sa-back");
    const buttons=[...(archive?.querySelectorAll(".sa-item")||[])];
    if(!sound||!archive||!record||!cover||!openButton||!closeButton||
       buttons.length!==3||sound.dataset.s80Ready==="1")return;

    sound.dataset.s80Ready="1";
    sound.classList.add("s80-ready");

    const frame=document.createElement("span");
    frame.className="s80-archive-frame";
    frame.setAttribute("aria-hidden","true");
    const sweep=document.createElement("span");
    sweep.className="s80-archive-sweep";
    sweep.setAttribute("aria-hidden","true");
    cover.append(frame,sweep);

    const wide=window.matchMedia("(min-width: 992px)");
    const reduce=window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrast=window.matchMedia("(prefers-contrast: more)");
    const canMove=()=>wide.matches&&!reduce.matches&&!contrast.matches&&
      !document.hidden&&typeof requestAnimationFrame==="function";
    const allowed=new Set(["soul","hiphop","alternative"]);
    const labels={soul:"A",hiphop:"B",alternative:"C"};

    const validRect=r=>r && [r.left,r.top,r.width,r.height].every(Number.isFinite) &&
      r.width>=90&&r.height>=90;
    const visibleRect=r=>validRect(r)&&r.bottom>innerHeight*.09&&
      r.top<innerHeight*.91&&r.right>0&&r.left<innerWidth;

    let visual=null;
    let animationFrame=0;
    let fallbackTimer=0;
    let archiveTimer=0;
    let lastOpen=archive.classList.contains("is-open");
    let lastAlbum=cover.className;
    let moving=false;

    function clearFlight(){
      if(animationFrame){cancelAnimationFrame(animationFrame);animationFrame=0}
      if(fallbackTimer){clearTimeout(fallbackTimer);fallbackTimer=0}
      visual?.remove();
      visual=null;
      moving=false;
    }
    function stop(){
      clearFlight();
      cover.classList.remove("s80-record-change");
      if(archiveTimer){clearTimeout(archiveTimer);archiveTimer=0}
    }
    function makeVisual(key,rect){
      const node=document.createElement("div");
      node.className="s80-shared-vinyl";
      node.dataset.s80Mood=key;
      node.setAttribute("aria-hidden","true");
      node.innerHTML='<span class="s80-flight-grooves"></span>'+
        '<span class="s80-flight-core">'+labels[key]+'</span>'+
        '<span class="s80-flight-outline"></span>'+
        '<span class="s80-flight-serial">LM / 0'+
          (key==="soul"?"1":key==="hiphop"?"2":"3")+'</span>';
      node.style.left=rect.left+"px";
      node.style.top=rect.top+"px";
      node.style.width=rect.width+"px";
      node.style.height=rect.height+"px";
      document.body.appendChild(node);
      return node;
    }
    const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
    const mix=(a,b,p)=>a+(b-a)*p;

    function fly(direction){
      if(!canMove()||visual||moving)return;
      const opening=direction==="open";
      const key=sound.dataset.mood||"soul";
      if(!allowed.has(key)||!sound.classList.contains("is-active"))return;
      const fromEl=opening?record:cover;
      const toEl=opening?cover:record;
      const start=fromEl.getBoundingClientRect();
      if(!visibleRect(start))return;
      if(!validRect(toEl.getBoundingClientRect()))return;

      moving=true;
      visual=makeVisual(key,start);
      const node=visual;
      const core=node.querySelector(".s80-flight-core");
      const grooves=node.querySelector(".s80-flight-grooves");
      const border=node.querySelector(".s80-flight-outline");
      const duration=opening?1140:950;
      let begin=0;
      function tick(ts){
        if(!visual||visual!==node)return;
        if(!begin)begin=ts;
        const t=Math.min(1,(ts-begin)/duration);
        const p=ease(t);
        // The actual archive cover can itself be sliding. Follow its
        // live position every frame so the vinyl meets it naturally.
        const destination=toEl.getBoundingClientRect();
        if(!validRect(destination)){clearFlight();return}
        const rect={
          left:mix(start.left,destination.left,p),
          top:mix(start.top,destination.top,p),
          width:mix(start.width,destination.width,p),
          height:mix(start.height,destination.height,p)
        };
        node.style.left=rect.left+"px";
        node.style.top=rect.top+"px";
        node.style.width=rect.width+"px";
        node.style.height=rect.height+"px";
        const turn=opening?p:1-p;
        node.style.borderRadius=mix(50,3,turn)+"%";
        node.style.opacity=String(t>.80?Math.max(0,1-(t-.80)/.20):1);
        node.style.borderColor=t>.78?"rgba(250,235,210,.25)":"rgba(250,235,210,.65)";
        core.style.opacity=String(Math.max(0,1-turn*1.15));
        grooves.style.opacity=String(Math.max(.12,1-turn*.8));
        border.style.opacity=String(Math.min(1,turn*.8));
        if(t<1)animationFrame=requestAnimationFrame(tick);
        else clearFlight();
      }
      animationFrame=requestAnimationFrame(tick);
      fallbackTimer=setTimeout(clearFlight,1650);
    }

    function onOpenCapture(){
      if(!canMove()||archive.classList.contains("is-open"))return;
      fly("open");
    }
    function onCloseCapture(){
      if(!canMove()||!archive.classList.contains("is-open"))return;
      clearFlight();
      fly("close");
    }

    // Existing handlers still execute normally and manage keyboard focus.
    openButton.addEventListener("click",onOpenCapture,true);
    closeButton.addEventListener("click",onCloseCapture,true);

    function changeAlbum(){
      cover.classList.remove("s80-record-change");
      if(archiveTimer){clearTimeout(archiveTimer);archiveTimer=0}
      if(reduce.matches||contrast.matches||document.hidden||
         !archive.classList.contains("is-open"))return;
      void sweep.offsetWidth;
      cover.classList.add("s80-record-change");
      archiveTimer=setTimeout(()=>{
        cover.classList.remove("s80-record-change");
        archiveTimer=0;
      },870);
    }
    // Album switching keeps all original data, copy and button handlers.
    buttons.forEach(button=>button.addEventListener("click",changeAlbum));

    new MutationObserver(()=>{
      const opened=archive.classList.contains("is-open");
      if(lastOpen&&!opened){
        if(!visual&&canMove())fly("close"); // ESC close fallback
      }
      if(!opened&&visual&&archive.inert===false){
        clearFlight(); // interrupted / inconsistent state
      }
      lastOpen=opened;
    }).observe(archive,{attributes:true,attributeFilter:["class"]});

    function quiet(){
      if(!canMove())stop();
    }
    wide.addEventListener?.("change",quiet);
    reduce.addEventListener?.("change",quiet);
    contrast.addEventListener?.("change",quiet);
    document.addEventListener("visibilitychange",quiet);
    window.addEventListener("resize",()=>{
      if(visual)clearFlight();
    },{passive:true});
  }
  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();