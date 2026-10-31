/* STEP 43 — THE CONNECTED LINE / FIVE FORMS, ONE CONTINUOUS SYSTEM
   A lightweight vector signal, reusing headers and existing selection states.
   No navigation interception, new requests, continuous animation loops or GSAP edits.
*/
(() => {
  const N=65,WIDTH=300,HEIGHT=66;
  const TAU=Math.PI*2;
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const ease=t=>1-Math.pow(1-t,3);
  const definitions=[
    {key:"hub",root:".world-hub",head:".world-top",source:".world-hub",
      attr:["data-s31-scene","data-s22-scene"],fallback:"work",
      variants:["work","sound","places","about"],number:"00"},
    {key:"work",root:".work-world",head:".work-top",source:".work-preview",
      attr:["data-theme"],fallback:"redhouse",
      variants:["redhouse","soca","gianni"],number:"01"},
    {key:"sound",root:".sound-world",head:".sound-top",source:".sound-world",
      attr:["data-mood"],fallback:"soul",
      variants:["soul","hiphop","alternative"],number:"02"},
    {key:"places",root:".p14-world",head:".p14-top",source:".p14-world",
      attr:["data-place"],fallback:"soca",
      variants:["soca","london","kl"],number:"03"},
    {key:"about",root:".a17-world",head:".a17-header",source:".a17-world",
      attr:["data-mode"],fallback:"make",
      variants:["make","listen","wander"],number:"04"},
    {key:"index",root:".w19-root",head:".w19-head",source:".w19-root",
      attr:["data-s38-scene"],fallback:"work",
      variants:["work","sound","places","about"],number:"LM"}
  ];
  function coordinates(kind,index){
    const phase=index*.17,arr=[],echo=[];
    for(let i=0;i<N;i++){
      const t=i/(N-1),x=4+t*(WIDTH-8);
      const envelope=.38+.62*Math.sin(Math.PI*t);
      let dy=0;
      if(kind==="work"){
        const v=(t*3.8+phase)%1;
        // Angular architecture: paired long risers and shorter platforms.
        dy=((v<.23?-1:v<.53?.7:v<.74?-.52:.4)*13
          +Math.sin(TAU*(t*1.8+phase)) * 4.5)*envelope;
      }else if(kind==="sound"){
        dy=(Math.sin(TAU*(t*(3.5+index*.35)+phase))*14
          +Math.sin(TAU*(t*7.5+phase)) * 3.2)*envelope;
      }else if(kind==="places"){
        dy=(Math.sin(TAU*(t*1.65+phase))*10
          +Math.sin(TAU*(t*4.4+phase*.7))*5.2)*envelope;
      }else if(kind==="about"){
        dy=(Math.sin(TAU*(t*1.35+phase))*14
          +Math.sin(TAU*(t*2.75-phase))*3.5)*envelope;
      }else{
        dy=Math.sin(TAU*(t*2.1+phase))*8*envelope;
      }
      const y=clamp(HEIGHT/2+dy,7,HEIGHT-7);
      arr.push([x,y]);
      echo.push([x,clamp(y+7+Math.sin(t*TAU*2.7+phase)*2,4,HEIGHT-3)]);
    }
    return {main:arr,echo};
  }
  const makePath=points=>points.map((p,i)=>
    (i===0?"M":"L")+p[0].toFixed(2)+" "+p[1].toFixed(2)
  ).join(" ");
  function init(){
    if(document.querySelector(".s43-signal"))return;
    const actual=definitions.map(def=>{
      const root=document.querySelector(def.root);
      const head=root?.querySelector(def.head);
      const source=document.querySelector(def.source);
      return {def,root,head,source};
    });
    // No partial installation, so no broken signatures.
    if(actual.some(item=>!item.root||!item.head||!item.source))return;
    const reduce=window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const active=[];
    for(const item of actual){
      const {def,root,head,source}=item;
      const signal=document.createElement("span");
      signal.className="s43-signal";
      signal.setAttribute("aria-hidden","true");
      signal.innerHTML=[
        '<span class="s43-signal-label">CONNECTED<br>LINE / LM®</span>',
        '<svg viewBox="0 0 300 66" preserveAspectRatio="none" aria-hidden="true" focusable="false">',
        '<path class="s43-echo"/><path class="s43-primary"/>',
        '<g class="s43-endpoints"><circle class="s43-first" r="2.1"/>',
        '<circle class="s43-last" r="2.1"/></g></svg>',
        '<span class="s43-signal-id"></span>'
      ].join("");
      const rail=document.createElement("span");
      rail.className="s43-rail";
      rail.setAttribute("aria-hidden","true");
      head.append(signal,rail);
      const primary=signal.querySelector(".s43-primary");
      const secondary=signal.querySelector(".s43-echo");
      const first=signal.querySelector(".s43-first");
      const last=signal.querySelector(".s43-last");
      const id=signal.querySelector(".s43-signal-id");
      let current=null,target=null,frame=0,previous="";
      function render(value){
        primary.setAttribute("d",makePath(value.main));
        secondary.setAttribute("d",makePath(value.echo));
        const a=value.main[0],b=value.main[value.main.length-1];
        first.setAttribute("cx",a[0]);first.setAttribute("cy",a[1]);
        last.setAttribute("cx",b[0]);last.setAttribute("cy",b[1]);
      }
      function getValue(){
        const value=def.attr.map(a=>source.getAttribute(a)).find(Boolean)||def.fallback;
        return def.variants.includes(value)?value:def.fallback;
      }
      function select(){
        const key=getValue();
        if(key===previous)return;
        previous=key;
        const index=def.variants.indexOf(key);
        const shape=(def.key==="hub"||def.key==="index")?key:def.key;
        target=coordinates(shape,index);
        root.dataset.s43Variant=key;
        head.style.setProperty("--s43-progress",(index/Math.max(1,def.variants.length-1)*100).toFixed(2)+"%");
        id.textContent=String(index+1).padStart(2,"0")+" / "+String(def.variants.length).padStart(2,"0");
        if(frame){cancelAnimationFrame(frame);frame=0;}
        if(!current||reduce?.matches||document.hidden){
          current=target;
          render(current);
          return;
        }
        const origin=current;
        const destination=target;
        const start=performance.now();
        const duration=820;
        function tick(now){
          const t=ease(clamp((now-start)/duration,0,1));
          const blend=(a,b)=>a.map((p,i)=>[
            p[0]+(b[i][0]-p[0])*t,
            p[1]+(b[i][1]-p[1])*t
          ]);
          current={
            main:blend(origin.main,destination.main),
            echo:blend(origin.echo,destination.echo)
          };
          render(current);
          if(t<1)frame=requestAnimationFrame(tick);
          else{frame=0;current=destination;}
        }
        frame=requestAnimationFrame(tick);
      }
      new MutationObserver(select).observe(source,{
        attributes:true,attributeFilter:def.attr
      });
      select();
      root.classList.add("s43-connected");
      active.push({select,stop:()=>{if(frame)cancelAnimationFrame(frame);frame=0;if(target){current=target;render(current);}}});
    }
    document.addEventListener("visibilitychange",()=>{
      if(document.hidden)active.forEach(x=>x.stop());
      else active.forEach(x=>x.select());
    });
    if(reduce?.addEventListener)reduce.addEventListener("change",()=>{
      active.forEach(x=>{x.stop();x.select()});
    });
  }
  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();