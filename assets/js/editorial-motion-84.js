/* PHASE 84 — EDITORIAL MOTION SYSTEM
   A one-shot scroll conductor across Work case studies, Travel Journal,
   About, Sound and Places. Section registration + staggered TYPE metadata.
   Original GSAP, Step 11 scroll parallax, Step 56 copy reveals,
   Step 65 photo film frames, Step 66 reading lines and navigation OWN
   their existing targets. No repeated scroll handlers or new navigation. */
(() => {
  function init(){
    if(document.documentElement.dataset.s84Ready==="1")return;
    if(!("IntersectionObserver" in window))return;

    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrast=window.matchMedia("(prefers-contrast: more)");
    const canMotion=()=>!reduced.matches&&!contrast.matches&&!document.hidden&&
      !document.body.classList.contains("s41-studio-focus")&&
      typeof Element.prototype.animate==="function";

    const specs=[
      {root:".case-world",open:"is-active",identity:"data-theme",
        beats:[
          {anchor:".case-story",text:[".case-small-label",".case-description"]},
          {anchor:".s28-dossier",text:[".s28-dossier-title"]},
          {anchor:".s30-evidence",text:[".s30-kicker-row span:first-child",".s30-intro-desc"]},
          {anchor:".case-chapter",text:[".chapter-eyebrow",".chapter-counter"]}
        ]},
      {root:".p15-journal",open:"is-open",identity:"data-place",
        beats:[
          {anchor:".p15-story",text:[".p15-section-label span:first-child",".p15-story-text"]},
          {anchor:".p15-gallery",text:[".p15-section-label span:first-child"]},
          {anchor:".p15-outro",text:[".p15-outro > span",".p15-outro-sub"]}
        ]},
      {root:".a17-world",open:"is-active",identity:"data-mode",
        beats:[
          {anchor:".a17-curiosity",text:[]},
          {anchor:".a18-story",text:[]}
        ]},
      {root:".sound-world",open:"is-active",identity:"data-mood",
        beats:[{anchor:".sound-bottom",text:[]}]},
      {root:".p14-world",open:"is-active",identity:"data-place",
        beats:[{anchor:".p14-below",text:[]}]}
    ];

    for(const spec of specs){
      const root=document.querySelector(spec.root);
      if(!root||root.dataset.s84Ready==="1")continue;
      const entries=spec.beats.map(b=>({
        section:root.querySelector(b.anchor),targets:b.text
      })).filter(b=>b.section);
      if(!entries.length)continue;

      // Each decoration stays inside its own authored section. All content
      // remains rendered even when animations are disabled or interrupted.
      for(const item of entries){
        const section=item.section;
        const score=document.createElement("span");
        score.className="s84-score";
        score.setAttribute("aria-hidden","true");
        const rule=document.createElement("span");
        rule.className="s84-score-rule";
        const dot=document.createElement("span");
        dot.className="s84-score-dot";
        const ticks=document.createElement("span");
        ticks.className="s84-score-ticks";
        for(let i=0;i<3;i++)ticks.appendChild(document.createElement("i"));
        score.append(rule,dot,ticks);
        const ambient=document.createElement("span");
        ambient.className="s84-ambient";
        ambient.setAttribute("aria-hidden","true");
        section.append(score,ambient);
        section.classList.add("s84-beat");
      }

      const animations=new Set();
      let seen=new WeakSet();
      let wasOpen=root.classList.contains(spec.open);
      let oldIdentity=root.getAttribute(spec.identity)||"";
      let observer=null;

      function stop(){
        for(const a of [...animations]){try{a.cancel()}catch(_){}}
        animations.clear();
      }
      function typeReveal(target,index){
        if(!target||!canMotion())return;
        // The text is readable throughout. Clip-path and opacity only:
        // transforms remain available to Webflow/GSAP and original hover.
        const a=target.animate([
          {opacity:.58,clipPath:"inset(0 0 24% 0)"},
          {opacity:1,clipPath:"inset(0 0 0 0)"}
        ],{
          duration:610+index*85,
          delay:90+index*125,
          easing:"cubic-bezier(.16,.86,.25,1)",
          fill:"none"
        });
        animations.add(a);
        for(const type of ["finish","cancel"])
          a.addEventListener(type,()=>animations.delete(a),{once:true});
      }
      function play(item){
        if(seen.has(item.section))return;
        seen.add(item.section);
        item.section.classList.add("s84-in-view");
        if(!canMotion())return;
        item.targets.forEach((selector,i)=>{
          // Only selected supporting type. Never headline copy already
          // animated by Steps 11/56/66, and never an interactive control.
          const target=item.section.querySelector(selector);
          if(target)typeReveal(target,i);
        });
      }

      if(typeof IntersectionObserver==="function"){
        const byNode=new Map(entries.map(item=>[item.section,item]));
        observer=new IntersectionObserver(records=>{
          if(!root.classList.contains(spec.open))return;
          for(const record of records){
            if(!record.isIntersecting)continue;
            const item=byNode.get(record.target);
            if(!item)continue;
            play(item);
            observer.unobserve(record.target);
          }
        },{
          root,rootMargin:"0px 0px -13% 0px",threshold:.10
        });
      }
      function reset(){
        stop();
        seen=new WeakSet();
        for(const item of entries){
          item.section.classList.remove("s84-in-view");
          if(observer){
            observer.unobserve(item.section);
            observer.observe(item.section);
          }
        }
      }
      function sync(){
        const open=root.classList.contains(spec.open);
        const identity=root.getAttribute(spec.identity)||"";
        if(open&&(!wasOpen||identity!==oldIdentity))reset();
        if(!open){
          stop();
          for(const item of entries)item.section.classList.remove("s84-in-view");
        }
        wasOpen=open;
        oldIdentity=identity;
      }
      reset();
      root.dataset.s84Ready="1";
      root.classList.add("s84-ready");
      new MutationObserver(sync).observe(root,{
        attributes:true,attributeFilter:["class",spec.identity]
      });
      reduced.addEventListener?.("change",()=>{
        if(reduced.matches)stop();
      });
      contrast.addEventListener?.("change",()=>{
        if(contrast.matches)stop();
      });
      document.addEventListener("visibilitychange",()=>{
        if(document.hidden)stop();
      });
      sync();
    }
    document.documentElement.dataset.s84Ready="1";
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();