/* PHASE 81 — ABOUT / LIVING IDENTITY
   Four SVG paths and eight registration points actually morph between
   three coherent graphic systems. No new buttons or page wrappers.
   Every frame begins at the CURRENT interpolated state, making rapid
   clicks continuous instead of snapping back to a preset.
   STEP 17 owns Make/Listen/Wander, STEP 18 owns the lower chapters. */
(() => {
  const NS="http://www.w3.org/2000/svg";
  const KEYS=["make","listen","wander"];
  const COUNT=28, DOTS=8;
  const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
  const easing=t=>1-Math.pow(1-t,4);
  const lerp=(a,b,t)=>a+(b-a)*t;

  // All states share exactly the same point topology; this is true
  // geometry interpolation, not a transition between two screenshots.
  function rectangle(inset) {
    const a=85+inset,b=515-inset,c=102+inset,d=565-inset;
    return Array.from({length:COUNT},(_,i)=>{
      const q=i/COUNT*4, edge=Math.floor(q),t=q-edge;
      if(edge===0)return [lerp(a,b,t),c];
      if(edge===1)return [b,lerp(c,d,t)];
      if(edge===2)return [lerp(b,a,t),d];
      return [a,lerp(d,c,t)];
    });
  }
  function circle(inset) {
    const radius=235-inset;
    return Array.from({length:COUNT},(_,i)=>{
      const t=i/COUNT*Math.PI*2-Math.PI/2;
      return [300+radius*Math.cos(t),331+radius*.86*Math.sin(t)];
    });
  }
  function contours(inset) {
    const radius=229-inset;
    return Array.from({length:COUNT},(_,i)=>{
      const t=i/COUNT*Math.PI*2-Math.PI/2;
      const wave=1+.10*Math.sin(3*t+.45)+.065*Math.cos(5*t-1.1);
      return [302+radius*wave*Math.cos(t)+11*Math.sin(2*t),
              335+radius*.82*wave*Math.sin(t)+14*Math.cos(3*t)];
    });
  }
  function route(key) {
    return Array.from({length:COUNT},(_,i)=>{
      const t=i/(COUNT-1),x=77+450*t;
      if(key==="make"){
        const y=t<.34?470:t<.62?470-170*(t-.34)/.28:300;
        return [x,y+4*Math.sin(t*6.28)];
      }
      if(key==="listen"){
        return [x,416-73*Math.sin(t*Math.PI*7)*Math.sin(Math.PI*t)];
      }
      return [x+20*Math.sin(2*Math.PI*t),
              523-315*t+43*Math.sin(t*Math.PI*4.5)];
    });
  }
  function points(key) {
    if(key==="make")return [
      [124,151],[274,151],[455,151],[124,326],
      [455,326],[124,512],[274,512],[455,512]
    ];
    if(key==="listen")return Array.from({length:DOTS},(_,i)=>{
      const angle=i*Math.PI*2/DOTS-Math.PI/2;
      return [300+188*Math.cos(angle),331+165*Math.sin(angle)];
    });
    return [
      [104,439],[163,406],[239,362],[283,419],
      [351,320],[407,293],[455,222],[500,171]
    ];
  }
  function geometry(key) {
    const fn=key==="make"?rectangle:key==="listen"?circle:contours;
    return {
      forms:[fn(0),fn(38),fn(76)],
      trail:route(key),
      dots:points(key)
    };
  }
  const STATES=Object.fromEntries(KEYS.map(k=>[k,geometry(k)]));
  const copy=g=>({
    forms:g.forms.map(a=>a.map(p=>[p[0],p[1]])),
    trail:g.trail.map(p=>[p[0],p[1]]),
    dots:g.dots.map(p=>[p[0],p[1]])
  });
  function interpolate(a,b,t) {
    const shape=(x,y)=>x.map((p,i)=>[
      lerp(p[0],y[i][0],t),lerp(p[1],y[i][1],t)
    ]);
    return {
      forms:a.forms.map((form,i)=>shape(form,b.forms[i])),
      trail:shape(a.trail,b.trail),
      dots:shape(a.dots,b.dots)
    };
  }
  function path(points,close){
    const s=points.map((p,i)=>(i?"L":"M")+
      p[0].toFixed(1)+" "+p[1].toFixed(1)).join(" ");
    return close?s+" Z":s;
  }

  function init() {
    const about=document.querySelector(".a17-world");
    const card=about?.querySelector(".a17-card");
    const plate=about?.querySelector(".a18-visual");
    if(!about||!card||!plate||!about.classList.contains("s71-ready")||
       about.dataset.s81Ready==="1")return;

    const reduce=window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrast=window.matchMedia("(prefers-contrast: more)");
    const canMove=()=>!reduce.matches&&!contrast.matches&&!document.hidden &&
      about.classList.contains("is-active");
    const visible=node=>{
      const r=node.getBoundingClientRect();
      const frame=about.getBoundingClientRect();
      return r.bottom>frame.top+30&&r.top<frame.bottom-30;
    };

    function layerFor(parent) {
      const container=document.createElement("div");
      container.className="s81-morph-layer";
      container.setAttribute("aria-hidden","true");
      const svg=document.createElementNS(NS,"svg");
      svg.setAttribute("viewBox","0 0 600 700");
      svg.setAttribute("preserveAspectRatio","xMidYMid slice");
      svg.setAttribute("focusable","false");
      svg.setAttribute("aria-hidden","true");

      const formNodes=Array.from({length:3},()=>{
        const el=document.createElementNS(NS,"path");
        el.setAttribute("class","s81-form");
        svg.appendChild(el);
        return el;
      });
      const trail=document.createElementNS(NS,"path");
      trail.setAttribute("class","s81-trail");
      svg.appendChild(trail);

      const dots=Array.from({length:DOTS},()=>{
        const dot=document.createElementNS(NS,"circle");
        dot.setAttribute("class","s81-dot");
        dot.setAttribute("r","3.8");
        svg.appendChild(dot);
        return dot;
      });
      const ring=document.createElementNS(NS,"circle");
      ring.setAttribute("class","s81-ring");
      ring.setAttribute("r","14");
      svg.appendChild(ring);
      container.appendChild(svg);
      const annotation=document.createElement("span");
      annotation.className="s81-coordinates";
      container.appendChild(annotation);
      parent.appendChild(container);
      return {container,formNodes,trail,dots,ring,annotation,current:copy(STATES.make),
              target:"make",raf:0,stamp:0,tween:false};
    }

    // Nothing covers the original letters, controls or artwork.
    const hero=layerFor(card);
    const lower=layerFor(plate);
    let monogramTimer=0;

    function render(slot,shape) {
      slot.formNodes.forEach((el,i)=>el.setAttribute("d",path(shape.forms[i],true)));
      slot.trail.setAttribute("d",path(shape.trail,false));
      slot.dots.forEach((el,i)=>{
        el.setAttribute("cx",shape.dots[i][0].toFixed(1));
        el.setAttribute("cy",shape.dots[i][1].toFixed(1));
      });
      const final=shape.dots[DOTS-1];
      slot.ring.setAttribute("cx",final[0].toFixed(1));
      slot.ring.setAttribute("cy",final[1].toFixed(1));
    }
    function cancel(slot){
      if(slot.raf)cancelAnimationFrame(slot.raf);
      slot.raf=0;
      slot.tween=false;
      slot.container.classList.remove("s81-in-motion");
    }
    function syncTo(slot,key,animate,parent){
      if(!STATES[key])return;
      // Always settle geometry when opening/closing or motion is disabled.\n      if(slot.target===key&&!slot.tween && animate)return;
      cancel(slot);
      const from=copy(slot.current),to=STATES[key];
      slot.target=key;
      const index=KEYS.indexOf(key)+1;
      slot.annotation.textContent="LM / "+
        String(index).padStart(2,"0")+" — "+
        (key==="make"?"GRID":key==="listen"?"FREQUENCY":"TOPOGRAPHY");
      if(!animate || !canMove() || !visible(parent)){
        slot.current=copy(to);
        render(slot,slot.current);
        return;
      }
      slot.tween=true;
      void slot.container.offsetWidth;
      slot.container.classList.add("s81-in-motion");
      let start=0;
      const duration=1150;
      function tick(now){
        if(!slot.tween)return;
        if(!start)start=now;
        const t=clamp((now-start)/duration,0,1);
        slot.current=interpolate(from,to,easing(t));
        render(slot,slot.current);
        if(t<1){
          slot.raf=requestAnimationFrame(tick);
        }else{
          slot.current=copy(to);
          slot.raf=0;
          slot.tween=false;
          slot.container.classList.remove("s81-in-motion");
        }
      }
      slot.raf=requestAnimationFrame(tick);
    }

    function pulseMonogram(){
      if(!canMove()||!visible(card))return;
      card.classList.remove("s81-monogram-shift");
      if(monogramTimer)clearTimeout(monogramTimer);
      // Force only the monogram's decorative animation to restart.
      void card.querySelector(".a17-card-monogram")?.offsetWidth;
      card.classList.add("s81-monogram-shift");
      monogramTimer=setTimeout(()=>{
        card.classList.remove("s81-monogram-shift");
        monogramTimer=0;
      },900);
    }

    let heroKey="",lowerKey="",previouslyOpen=false;
    function sync(){
      const opened=about.classList.contains("is-active");
      const a=about.dataset.mode||"make";
      const b=plate.dataset.scene||"make";
      if(!KEYS.includes(a)||!KEYS.includes(b))return;
      const changedHero=a!==heroKey,changedLower=b!==lowerKey;
      const firstOpen=opened&&!previouslyOpen;
      previouslyOpen=opened;
      heroKey=a;lowerKey=b;
      if(!opened){
        cancel(hero);cancel(lower);
        syncTo(hero,a,false,card);
        syncTo(lower,b,false,plate);
        card.classList.remove("s81-monogram-shift");
        return;
      }
      if(changedHero||firstOpen) {
        syncTo(hero,a,changedHero&&!firstOpen,card);
        if(changedHero&&!firstOpen)pulseMonogram();
      }
      if(changedLower||firstOpen)
        syncTo(lower,b,changedLower&&!firstOpen,plate);
    }
    render(hero,hero.current);
    render(lower,lower.current);
    about.dataset.s81Ready="1";
    about.classList.add("s81-ready");
    new MutationObserver(sync).observe(about,{
      attributes:true,attributeFilter:["class","data-mode"]
    });
    new MutationObserver(sync).observe(plate,{
      attributes:true,attributeFilter:["data-scene"]
    });
    const quiet=()=>{
      if(!canMove()){
        cancel(hero);cancel(lower);
        hero.current=copy(STATES[hero.target]);
        lower.current=copy(STATES[lower.target]);
        render(hero,hero.current);render(lower,lower.current);
        card.classList.remove("s81-monogram-shift");
      }
    };
    reduce.addEventListener?.("change",quiet);
    contrast.addEventListener?.("change",quiet);
    document.addEventListener("visibilitychange",quiet);
    sync();
  }
  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();