/* PHASE 90 — OPTIMIZED LIVING SCENES (REPLACES PHASE 88 JS)
   Finite scroll-position direction inside Phase 86 SVG artwork.
   Original navigation and Phase 87 camera remain authoritative. */
(() => {
  function init(){
    const hub=document.querySelector(".world-hub.s86-ready.s87-ready");
    const experience=hub?.querySelector(".s86-experience");
    const scroll=experience?.querySelector(".s86-scroll");
    const slides=[...(scroll?.querySelectorAll(".s86-slide")||[])];
    const keys=["work","sound","places","about"];
    if(!hub||!experience||!scroll||slides.length!==4||
       slides.some((slide,i)=>slide.dataset.s86Scene!==keys[i]||
         !slide.querySelector(".s87-camera .s86-artwork svg"))||
       hub.dataset.s88Ready==="1")return;

    const NS="http://www.w3.org/2000/svg";
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrast=window.matchMedia("(prefers-contrast: more)");
    const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
    const canMove=()=>!reduced.matches&&!contrast.matches&&!document.hidden&&!hub.inert;
    const palette=["#e7ab7e","#c5dd9c","#bcdbcd","#e5b9a2"];
    const configs={
      work:[
        {selector:".s86-browser",x:47,y:100,angle:3.8,zoom:.055},
        {selector:'g[transform*="translate(1265 495)"]',x:-24,y:158,angle:-6.5,zoom:.085}
      ],
      sound:[
        {selector:".s86-vinyl",x:19,y:105,angle:20,zoom:.055},
        {selector:'svg > g[transform="translate(0 0)"]:not(.s86-vinyl)',x:-22,y:57,angle:-6,zoom:.03}
      ],
      places:[
        {selector:".s86-mountains",x:10,y:43,angle:0,zoom:.025},
        {selector:".s86-foreground",x:-16,y:127,angle:0,zoom:.045},
        {selector:".s86-route",x:12,y:70,angle:0,zoom:.018}
      ],
      about:[
        {selector:".s86-orbits",x:43,y:64,angle:15,zoom:.035},
        {selector:".s86-monogram",x:-27,y:96,angle:-4.5,zoom:.05,all:true}
      ]
    };
    const art={
      work:{
        etch:["M748 144V72H1531V930H748V851","M834 340H988V494H834ZM1033 340H1190V494H1033ZM1232 340H1390V494H1232Z"],
        wire:["M704 154H852M778 80V227M1432 859H1571M1501 789V930","M840 249H1397M840 271H1294M840 835H1431"],
        dots:[[834,340],[1390,494],[1110,242]]
      },
      sound:{
        etch:["M567 419C628 133 867 -22 1120 -22S1615 165 1687 431","M532 603C607 886 843 1012 1120 1012S1630 843 1701 617"],
        wire:["M608 488H706M1532 488H1650M1120 4V90M1120 890V990","M647 231Q1120 -204 1624 242"],
        dots:[[628,317],[1530,722],[1120,488]],
        circles:[[1120,488,520],[1120,488,559]]
      },
      places:{
        etch:["M622 801C755 716 866 822 955 721S1113 562 1300 650 1499 621 1640 530","M634 567Q854 411 1028 518T1393 441Q1505 395 1618 416"],
        wire:["M678 198C847 79 1014 192 1178 99S1451 52 1662 117","M678 228C847 109 1014 222 1178 129S1451 82 1662 147","M610 841C748 758 868 867 963 769S1111 613 1310 703"],
        dots:[[955,721],[1300,650],[1393,441]]
      },
      about:{
        etch:["M609 428C741 96 1090 -10 1368 187S1585 624 1411 796 904 1024 679 746","M910 37Q1026 348 1442 272T1568 729Q1475 939 1182 963"],
        wire:["M623 481H703M1540 481H1660M1117 12V119M1117 848V983"],
        dots:[[1371,174],[713,679],[1535,732]],
        circles:[[1117,481,468],[1117,481,497]]
      }
    };
    const depth=[];
    const ornaments=[];
    for(let i=0;i<slides.length;i++){
      const svg=slides[i].querySelector(".s86-artwork svg");
      const visual=slides[i].querySelector(".s86-visual");
      const pieces=[];
      for(const settings of configs[keys[i]]){
        const found=[...svg.querySelectorAll(settings.selector)];
        for(const node of (settings.all?found:found.slice(0,1))){
          const shell=document.createElementNS(NS,"g");
          shell.setAttribute("class","s88-depth-layer");
          shell.setAttribute("aria-hidden","true");
          node.parentNode.insertBefore(shell,node);
          shell.appendChild(node);
          pieces.push({shell,settings});
        }
      }
      depth.push(pieces);

      const ornament=document.createElement("div");
      ornament.className="s88-kinetic";
      ornament.setAttribute("aria-hidden","true");
      const drawing=document.createElementNS(NS,"svg");
      drawing.setAttribute("viewBox","0 0 1600 1000");
      drawing.setAttribute("preserveAspectRatio","xMidYMid slice");
      drawing.setAttribute("aria-hidden","true");
      drawing.setAttribute("focusable","false");
      const entry=art[keys[i]];
      for(const [cls,paths] of [["s88-wire",entry.wire],["s88-etch",entry.etch]]){
        for(const d of paths){
          const p=document.createElementNS(NS,"path");
          p.setAttribute("d",d);
          p.setAttribute("class",cls);
          if(cls==="s88-etch")p.setAttribute("pathLength","100");
          drawing.appendChild(p);
        }
      }
      for(const pair of entry.dots){
        const c=document.createElementNS(NS,"circle");
        c.setAttribute("cx",pair[0]);
        c.setAttribute("cy",pair[1]);
        c.setAttribute("r","7");
        c.setAttribute("class","s88-point");
        drawing.appendChild(c);
      }
      for(const triple of entry.circles||[]){
        const c=document.createElementNS(NS,"circle");
        c.setAttribute("cx",triple[0]);
        c.setAttribute("cy",triple[1]);
        c.setAttribute("r",triple[2]);
        c.setAttribute("class","s88-wire");
        drawing.appendChild(c);
      }
      ornament.appendChild(drawing);
      visual.appendChild(ornament);
      ornaments.push(ornament);
    }
    const bridge=document.createElement("div");
    bridge.className="s88-between-scenes";
    bridge.setAttribute("aria-hidden","true");
    const label=document.createElement("span");
    label.className="s88-between-label";
    label.setAttribute("aria-hidden","true");
    experience.append(bridge,label);

    // PHASE 90: one passive scroll coordinator for the Phase 87 camera,
    // the Phase 88 SVG depth planes and a simplified chapter separator.
    // No mousemove loop and no full-screen gradient repaint per pixel.
    const camera=slides.map(slide=>slide.querySelector(".s87-camera"));
    if(camera.some(node=>!node))return;
    const tablet=window.matchMedia("(max-width: 991px)");
    const coarse=window.matchMedia("(pointer: coarse)");
    let adaptiveLite=false;
    const lowPower=()=>adaptiveLite||
      tablet.matches||coarse.matches||
      Boolean(navigator.connection?.saveData)||
      (typeof navigator.deviceMemory==="number" && navigator.deviceMemory<4);
    const running=()=>canMove()&&!lowPower();

    let queued=0,lastPosition=-10,bridgeActive=false,dirty=false;
    function reset(){
      dirty=false;
      lastPosition=-10;
      bridgeActive=false;
      experience.style.setProperty("--s88-bridge-alpha","0");
      experience.style.setProperty("--s88-label-opacity","0");
      label.textContent="";
      for(const node of camera){
        node.style.removeProperty("--s87-scroll-y");
        node.style.removeProperty("--s87-scale");
        node.style.removeProperty("--s87-pointer-x");
        node.style.removeProperty("--s87-pointer-y");
      }
      for(const group of depth){
        for(const {shell} of group){
          for(const key of ["--s88-x","--s88-y","--s88-r","--s88-s"])
            shell.style.removeProperty(key);
        }
      }
      for(const ornament of ornaments){
        ornament.style.removeProperty("--s88-draw");
        ornament.style.removeProperty("--s88-ornament-y");
      }
    }
    function render(){
      queued=0;
      if(!running()){if(dirty)reset();return}
      const position=clamp(scroll.scrollTop/Math.max(1,scroll.clientHeight),0,3);
      if(Math.abs(position-lastPosition)<.004)return;
      lastPosition=position;
      dirty=true;

      // Update only the visible scene and its immediate neighbor.
      // Every write is restricted to a composited transform:
      // we no longer re-rasterize the SVG linework while scrolling.
      for(let i=0;i<4;i++){
        const delta=position-i;
        if(Math.abs(delta)>1.01)continue;
        const distance=Math.abs(delta);
        camera[i].style.setProperty("--s87-scroll-y",(-delta*24).toFixed(1)+"px");
        camera[i].style.setProperty("--s87-scale",(1.012+Math.min(distance,1)*.018).toFixed(3));
        for(const {shell,settings} of depth[i]){
          shell.style.setProperty("--s88-x",(delta*settings.x*.46).toFixed(1)+"px");
          shell.style.setProperty("--s88-y",(delta*settings.y*.46).toFixed(1)+"px");
          shell.style.setProperty("--s88-r",(delta*settings.angle*.46).toFixed(2)+"deg");
          shell.style.setProperty("--s88-s",(1+settings.zoom*distance*.46).toFixed(4));
        }
      }

      // A one-shot optical chapter seam, toggled a few times per
      // journey instead of recalculating full-screen gradients per frame.
      const section=Math.min(2,Math.floor(position));
      const fraction=position-section;
      const between=position<2.99 && fraction>.28 && fraction<.72;
      if(between!==bridgeActive){
        bridgeActive=between;
        experience.style.setProperty("--s88-bridge-alpha",between?".13":"0");
        experience.style.setProperty("--s88-label-opacity",between?".6":"0");
        if(between){
          experience.style.setProperty("--s88-bridge-color",palette[section+1]);
          experience.style.setProperty("--s88-bridge-x","0%");
          experience.style.setProperty("--s88-label-y","0px");
          label.textContent="NEXT / "+keys[section+1].toUpperCase();
        } else label.textContent="";
      }
    }
    function schedule(){
      if(!running())return;
      if(!queued)queued=requestAnimationFrame(render);
    }
    function onPreference(){
      hub.classList.toggle("s90-lite",lowPower());
      if(!running()){
        if(queued)cancelAnimationFrame(queued);
        queued=0;
        if(dirty)reset();
      }else schedule();
    }
    // PHASE 91 — One short real-scroll frame-rate check, no permanent monitoring.
    // If a device genuinely struggles, retain navigation and artwork
    // while disabling the optional layered parallax through s90-lite.
    let sampled=false;
    function sampleScrollPerformance(){
      if(sampled||!running())return;
      sampled=true;
      let started=0,last=0,frames=0,slowFrames=0;
      function measure(t){
        if(!running()||!scroll.isConnected)return;
        if(!started){started=t;last=t;}
        else {
          frames++;
          if(t-last>38)slowFrames++;
          last=t;
        }
        if(t-started<1100){requestAnimationFrame(measure);return;}
        const fps=frames*1000/Math.max(1,t-started);
        if(frames>=12&&fps<44&&slowFrames>=8){
          adaptiveLite=true;
          onPreference();
        }
      }
      requestAnimationFrame(measure);
    }
    scroll.addEventListener("scroll",()=>{
      schedule();
      sampleScrollPerformance();
    },{passive:true});
    window.addEventListener("resize",onPreference,{passive:true});
    document.addEventListener("visibilitychange",onPreference);
    reduced.addEventListener?.("change",onPreference);
    contrast.addEventListener?.("change",onPreference);
    tablet.addEventListener?.("change",onPreference);
    coarse.addEventListener?.("change",onPreference);
    hub.classList.toggle("s90-lite",lowPower());
    hub.dataset.s88Ready="1";
    hub.classList.add("s88-ready");
    schedule();
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();