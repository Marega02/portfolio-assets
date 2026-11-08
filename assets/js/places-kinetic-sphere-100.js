/* PHASE 100 — PLACES / KINETIC SPHERE
   Inspired by the navigational principle of Studio K95: selected images
   orbit in real 3D, and drag / wheel explores the volume.
   This is an original lightweight CSS3D implementation with no WebGL,
   perpetual requestAnimationFrame loop, large engine or new libraries.
   Only PLACES is affected. Six destinations remain visual-only. */
(() => {
  function init(){
    const hub=document.querySelector(".world-hub.fi95-ready");
    const level=hub?.querySelector(".fi95-level");
    const cluster=level?.querySelector(".fi95-cluster");
    const nodes=[...(cluster?.querySelectorAll(".fi95-item")||[])];
    if(!hub||!level||!cluster||nodes.length!==6||hub.dataset.fi100Ready==="1")return;

    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
    const sign=level.querySelector(".fi95-level-sign");
    const originalSign=sign?.textContent||"";
    const angles=[0,60,120,180,240,300];
    const latitudes=[-16,22,-14,18,-20,14];
    let scene=null,rotor=null,core=null,frame=0,drag=false,pointerId=-1;
    let previousX=0,previousY=0,lastWheel=0;
    let yaw=-24,pitch=-8;
    const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));

    function setTransform(){
      if(!rotor)return;
      rotor.style.transform="rotateX("+pitch.toFixed(2)+"deg) rotateY("+yaw.toFixed(2)+"deg)";
      if(core){
        core.style.setProperty("--fi100-roll",Math.round(yaw*.22)+"deg");
        core.style.setProperty("--fi100-tilt",Math.round(pitch*.45)+"deg");
      }
      frame=0;
    }
    function queueTransform(){
      if(!frame)frame=requestAnimationFrame(setTransform);
    }
    function setRadius(){
      if(!scene)return;
      const width=scene.clientWidth||window.innerWidth;
      const height=scene.clientHeight||window.innerHeight*.58;
      const radius=clamp(Math.min(width*.345,height*.65),135,345);
      scene.style.setProperty("--fi100-radius",radius.toFixed(1)+"px");
    }
    function changeYaw(delta,animate=true){
      if(!rotor)return;
      yaw+=delta;
      if(animate&&!reduced.matches)scene?.classList.add("fi100-easing");
      setTransform();
    }
    function endDrag(event){
      if(!drag)return;
      if(event&&event.pointerId!==pointerId)return;
      drag=false;
      scene?.classList.remove("fi100-dragging");
      if(frame){cancelAnimationFrame(frame);frame=0;setTransform()}
      try{if(event&&scene?.hasPointerCapture?.(pointerId))scene.releasePointerCapture(pointerId)}catch(_){}
      pointerId=-1;
    }
    function buildScene(){
      const el=document.createElement("div");
      el.className="fi100-stage";
      el.setAttribute("role","region");
      el.setAttribute("aria-label","Six places rotating in 3D. Drag or scroll to rotate, or use left and right arrow keys.");
      el.tabIndex=0;

      const top=document.createElement("div");
      top.className="fi100-scene-meta";
      top.innerHTML='<span>06 LOCATIONS / ONE SPACE</span><span>ORBITAL ARCHIVE · 001</span>';

      const world=document.createElement("div");
      world.className="fi100-world";
      const axis=document.createElement("div");
      axis.className="fi100-axis";
      axis.setAttribute("aria-hidden","true");
      const group=document.createElement("div");
      group.className="fi100-rotor";
      const sculpture=document.createElement("div");
      sculpture.className="fi100-sculpture";
      sculpture.setAttribute("aria-hidden","true");
      const sculptureHalo=document.createElement("span");
      sculptureHalo.className="fi100-sculpture-halo";
      const centralMark=document.createElement("span");
      centralMark.className="fi100-sculpture-mark";
      centralMark.textContent="LM";
      sculpture.append(sculptureHalo,centralMark);
      for(let i=0;i<5;i++){
        const loop=document.createElement("span");
        loop.className="fi100-metal-loop fi100-metal-loop-"+i;
        sculpture.insertBefore(loop,centralMark);
      }
      group.appendChild(sculpture);
      world.append(axis,group);

      const instruction=document.createElement("div");
      instruction.className="fi100-instruction";
      instruction.innerHTML='<span><b aria-hidden="true">↔</b> DRAG TO EXPLORE</span>'+
        '<span>SCROLL TO ROTATE <b aria-hidden="true">↻</b></span>';
      el.append(top,world,instruction);
      return {el,group,sculpture};
    }

    function onPointerDown(event){
      if(event.button!==0||!scene||level.dataset.category!=="places")return;
      drag=true;
      pointerId=event.pointerId;
      previousX=event.clientX;
      previousY=event.clientY;
      scene.classList.remove("fi100-easing");
      scene.classList.add("fi100-dragging");
      try{scene.setPointerCapture(pointerId)}catch(_){}
      if(event.cancelable)event.preventDefault();
    }
    function onPointerMove(event){
      if(!drag||event.pointerId!==pointerId)return;
      const dx=event.clientX-previousX,dy=event.clientY-previousY;
      previousX=event.clientX;
      previousY=event.clientY;
      yaw+=dx*.34;
      pitch=clamp(pitch-dy*.20,-36,36);
      queueTransform();
      if(event.cancelable)event.preventDefault();
    }
    function onWheel(event){
      if(level.dataset.category!=="places")return;
      if(event.cancelable)event.preventDefault();
      const now=performance.now();
      if(now-lastWheel<110)return;
      lastWheel=now;
      const delta=Math.abs(event.deltaX)>Math.abs(event.deltaY)?event.deltaX:event.deltaY;
      if(Math.abs(delta)<2)return;
      const step=clamp(Math.abs(delta)*.25,14,54);
      changeYaw(delta>0?-step:step);
    }
    function onKeys(event){
      if(level.dataset.category!=="places")return;
      if(event.key==="ArrowLeft"){event.preventDefault();changeYaw(-45)}
      if(event.key==="ArrowRight"){event.preventDefault();changeYaw(45)}
      if(event.key==="ArrowUp"){event.preventDefault();pitch=clamp(pitch+12,-36,36);changeYaw(0)}
      if(event.key==="ArrowDown"){event.preventDefault();pitch=clamp(pitch-12,-36,36);changeYaw(0)}
    }
    function mount(){
      if(scene||level.dataset.category!=="places")return;
      const parts=buildScene();
      scene=parts.el;rotor=parts.group;core=parts.sculpture;
      nodes.forEach((node,i)=>{
        node.classList.add("fi100-photo");
        node.style.setProperty("--fi100-az",angles[i]+"deg");
        node.style.setProperty("--fi100-lat",latitudes[i]+"deg");
        // No click-to-open. The parent stage owns drag/swipe/scroll.
        node.setAttribute("aria-disabled","true");
        node.tabIndex=-1;
        rotor.appendChild(node);
      });
      cluster.appendChild(scene);
      cluster.classList.add("fi100-cluster-on");
      level.classList.add("fi100-places-on");
      if(sign)sign.textContent="PLACES / 3D ARCHIVE";
      const foot=level.querySelector(".fi95-level-foot span:first-child");
      if(foot)foot.textContent="INTERACTIVE SPHERE / VISUAL EXPERIMENT";
      setRadius();
      setTransform();
      scene.addEventListener("pointerdown",onPointerDown);
      scene.addEventListener("pointermove",onPointerMove);
      scene.addEventListener("pointerup",endDrag);
      scene.addEventListener("pointercancel",endDrag);
      scene.addEventListener("lostpointercapture",()=>endDrag());
      scene.addEventListener("wheel",onWheel,{passive:false});
      scene.addEventListener("keydown",onKeys);
    }
    function unmount(){
      if(!scene)return;
      endDrag();
      if(frame){cancelAnimationFrame(frame);frame=0}
      nodes.forEach(node=>{
        node.classList.remove("fi100-photo");
        node.style.removeProperty("--fi100-az");
        node.style.removeProperty("--fi100-lat");
        cluster.appendChild(node);
      });
      scene.remove();
      scene=null;rotor=null;core=null;
      cluster.classList.remove("fi100-cluster-on");
      level.classList.remove("fi100-places-on");
      if(sign)sign.textContent=originalSign;
    }
    function sync(){
      if(level.dataset.category==="places")mount();
      else unmount();
    }
    new MutationObserver(sync).observe(level,{attributes:true,attributeFilter:["data-category"]});
    // For return visits to Places without switching categories, the
    // existing orbit remains mounted and can be used again immediately.
    window.addEventListener("resize",setRadius,{passive:true});
    hub.dataset.fi100Ready="1";
    sync();
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();