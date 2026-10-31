/* STEP 45 — THE THIRD ACT / SIGNATURE FINALES
 * A quiet creative reward for exploring each world's three existing choices.
 * Each world counts distinct states locally; no storage, API, tracking or new
 * navigation. All visual layers are aria-hidden and pointer transparent.
 */
(() => {
  const definitions=[
    {
      name:"work",root:".work-world",art:".work-preview",source:".work-preview",
      attribute:"data-theme",choices:["redhouse","soca","gianni"],
      ending:"THE WORK SPEAKS.",chapter:"01 / THE MAKER",
      motif:'<path d="M12 24H36V10H57V38H81"/><path d="M12 44H28V28H48V52H81"/><circle cx="79" cy="38" r="3"/>'
    },
    {
      name:"sound",root:".sound-world",art:".sound-art",source:".sound-world",
      attribute:"data-mood",choices:["soul","hiphop","alternative"],
      ending:"THE SOUND STAYS.",chapter:"02 / THE LISTENER",
      motif:'<circle cx="46" cy="31" r="22"/><circle cx="46" cy="31" r="13"/><circle cx="46" cy="31" r="3"/><path d="M69 10V25L56 39"/>'
    },
    {
      name:"places",root:".p14-world",art:".p14-postcard",source:".p14-world",
      attribute:"data-place",choices:["soca","london","kl"],
      ending:"EVERY PLACE LEAVES A TRACE.",chapter:"03 / THE WANDERER",
      motif:'<path d="M7 23Q26 6 45 23T85 22M7 35Q26 18 45 35T85 34M7 47Q26 30 45 47T85 46"/><circle cx="14" cy="12" r="3"/>'
    },
    {
      name:"about",root:".a17-world",art:".a17-card",source:".a17-world",
      attribute:"data-mode",choices:["make","listen","wander"],
      ending:"ALWAYS BECOMING.",chapter:"04 / THE HUMAN",
      motif:'<ellipse cx="46" cy="31" rx="37" ry="15" transform="rotate(-24 46 31)"/><circle cx="46" cy="31" r="21"/><circle cx="73" cy="18" r="3"/>'
    }
  ];
  function init(){
    if(document.querySelector(".s45-plaque"))return;
    const items=definitions.map(def=>({
      def,root:document.querySelector(def.root),
      art:document.querySelector(def.art),
      source:document.querySelector(def.source)
    }));
    if(items.some(i=>!i.root||!i.art||!i.source))return;

    const prefersReduced=window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const blockers=()=>{
      const index=document.querySelector(".w19-root");
      const hiddenChapter=document.querySelector(".s34-overlay");
      return !!index?.classList.contains("is-open")||
        !!(hiddenChapter && !hiddenChapter.hidden)||
        !!document.querySelector(".case-world.is-active")||
        !!document.querySelector(".sound-archive.is-open")||
        !!document.querySelector(".p15-journal.is-open");
    };

    for(const {def,root,art,source} of items){
      const visited=new Set();
      let unlocked=false;
      let ceremonyTimer=0;
      let resetTimer=0;
      const plaque=document.createElement("div");
      plaque.className="s45-plaque";
      plaque.setAttribute("aria-hidden","true");
      plaque.innerHTML=[
        '<div class="s45-meta"><span>LM® / THIRD ACT</span><strong class="s45-count">00 / 03</strong></div>',
        '<div class="s45-stages"><i></i><i></i><i></i></div>',
        '<p class="s45-intro">EXPLORE ALL THREE PERSPECTIVES.</p>',
        '<div class="s45-finale">',
        '<span class="s45-emblem"><svg viewBox="0 0 92 62" aria-hidden="true" focusable="false">'+def.motif+'</svg></span>',
        '<span class="s45-finale-copy"><span class="s45-kicker">CHAPTER COMPLETE</span>',
        '<strong class="s45-statement"></strong></span></div>'
      ].join("");
      plaque.querySelector(".s45-statement").textContent=def.ending;
      const flare=document.createElement("span");
      flare.className="s45-flare";
      flare.setAttribute("aria-hidden","true");
      art.append(flare,plaque);

      const status=document.createElement("span");
      status.className="s45-status";
      status.setAttribute("role","status");
      status.setAttribute("aria-live","polite");
      root.appendChild(status);
      const bars=[...plaque.querySelectorAll(".s45-stages i")];
      const count=plaque.querySelector(".s45-count");

      function render(){
        count.textContent=String(visited.size).padStart(2,"0")+" / 03";
        def.choices.forEach((key,i)=>bars[i].classList.toggle("is-visited",visited.has(key)));
      }
      function cancelMotion(){
        if(ceremonyTimer){clearTimeout(ceremonyTimer);ceremonyTimer=0;}
        if(resetTimer){clearTimeout(resetTimer);resetTimer=0;}
        plaque.classList.remove("is-unlocking");
        root.classList.remove("s45-ceremony");
      }
      function finish(){
        if(unlocked)return;
        unlocked=true;
        plaque.classList.add("is-complete");
        status.textContent=def.chapter+": all three perspectives explored. "+def.ending;
        if(prefersReduced?.matches||document.hidden||blockers()||!root.classList.contains("is-active"))return;
        ceremonyTimer=setTimeout(()=>{
          ceremonyTimer=0;
          if(!root.classList.contains("is-active")||root.inert||blockers())return;
          plaque.classList.add("is-unlocking");
          root.classList.add("s45-ceremony");
          resetTimer=setTimeout(()=>{
            resetTimer=0;
            plaque.classList.remove("is-unlocking");
            root.classList.remove("s45-ceremony");
          },1710);
        },320);
      }
      function current(){
        const key=source.getAttribute(def.attribute)||def.choices[0];
        return def.choices.includes(key)?key:def.choices[0];
      }
      function collect(){
        if(!root.classList.contains("is-active")||root.inert)return;
        const key=current();
        if(visited.has(key))return;
        visited.add(key);
        render();
        if(visited.size===3)finish();
      }
      function onRootState(){
        if(!root.classList.contains("is-active")){
          cancelMotion();
          return;
        }
        collect();
      }
      new MutationObserver(collect).observe(source,{
        attributes:true,attributeFilter:[def.attribute]
      });
      new MutationObserver(onRootState).observe(root,{
        attributes:true,attributeFilter:["class"]
      });
      render();
      root.classList.add("s45-ready");
      if(root.classList.contains("is-active"))collect();
      document.addEventListener("visibilitychange",()=>{
        if(document.hidden)cancelMotion();
      });
    }
  }
  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();