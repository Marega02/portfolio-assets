/* STEP 42 — MOTION SCORE
   Ephemeral selection lower-third shared by the four existing worlds.
   It OBSERVES their current state; it never changes their transitions,
   GSAP, scroll, selection handlers, URL, focus or keyboard behaviour. */
(() => {
  const setups=[
    {
      scene:"work",selector:".work-world",source:".work-preview",
      attribute:"data-theme",fallback:"redhouse",code:"01 / THE MAKER",
      names:{redhouse:"RED HOUSE",soca:"SOČA VALLEY",gianni:"DA GIANNI"}
    },
    {
      scene:"sound",selector:".sound-world",source:".sound-world",
      attribute:"data-mood",fallback:"soul",code:"02 / THE LISTENER",
      names:{soul:"SOUL",hiphop:"HIP-HOP",alternative:"ALTERNATIVE"}
    },
    {
      scene:"places",selector:".p14-world",source:".p14-world",
      attribute:"data-place",fallback:"soca",code:"03 / THE WANDERER",
      names:{soca:"SOČA VALLEY",london:"LONDON",kl:"KUALA LUMPUR"}
    },
    {
      scene:"about",selector:".a17-world",source:".a17-world",
      attribute:"data-mode",fallback:"make",code:"04 / THE HUMAN",
      names:{make:"MAKE",listen:"LISTEN",wander:"WANDER"}
    }
  ];
  function init(){
    if(document.querySelector(".s42-beat"))return;
    const scenes=setups.map(def=>({
      def,
      root:document.querySelector(def.selector),
      source:document.querySelector(def.source)
    }));
    if(scenes.some(s=>!s.root||!s.source))return;
    const live=[];
    const hiddenByOtherChapter=()=>(
      !!document.querySelector(".case-world.is-active")||
      !!document.querySelector(".sound-archive.is-open")||
      !!document.querySelector(".p15-journal.is-open")||
      !!document.querySelector(".w19-root.is-open")||
      !!(document.querySelector(".s34-overlay")?.hidden===false)
    );
    for(const s of scenes){
      const {def,root,source}=s;
      const overlay=document.createElement("div");
      overlay.className="s42-beat";
      overlay.dataset.s42Scene=def.scene;
      overlay.setAttribute("aria-hidden","true");
      overlay.innerHTML=[
        '<div class="s42-head"><span>MOTION SCORE / LM®</span><em>'+def.code+'</em></div>',
        '<div class="s42-main"><strong class="s42-number">01</strong><span class="s42-word"></span></div>',
        '<div class="s42-foot"><span class="s42-track"></span><span class="s42-foot-code">01 / 03</span></div>'
      ].join("");
      root.appendChild(overlay);
      const number=overlay.querySelector(".s42-number");
      const word=overlay.querySelector(".s42-word");
      const foot=overlay.querySelector(".s42-foot-code");
      const keys=Object.keys(def.names);
      const validKey=()=>{
        const candidate=source.getAttribute(def.attribute)||def.fallback;
        return Object.prototype.hasOwnProperty.call(def.names,candidate)?candidate:def.fallback;
      };
      let selected=validKey();
      let active=root.classList.contains("is-active");
      let openTimer=null,clearTimer=null;
      function cancel(){
        if(openTimer!==null){window.clearTimeout(openTimer);openTimer=null;}
        if(clearTimer!==null){window.clearTimeout(clearTimer);clearTimer=null;}
        overlay.classList.remove("is-performing");
      }
      function play(){
        openTimer=null;
        if(!root.classList.contains("is-active")||root.inert||
           hiddenByOtherChapter()||document.hidden||
           document.body.classList.contains("s41-studio-focus"))return;
        const key=validKey();
        selected=key;
        const index=keys.indexOf(key)+1;
        number.textContent=String(index).padStart(2,"0");
        word.textContent=def.names[key];
        foot.textContent=String(index).padStart(2,"0")+" / 03";
        if(clearTimer!==null){window.clearTimeout(clearTimer);clearTimer=null;}
        overlay.classList.remove("is-performing");
        // Re-animate ONLY the tiny decorative overlay, never GSAP-driven elements.
        void overlay.offsetWidth;
        overlay.classList.add("is-performing");
        clearTimer=window.setTimeout(()=>{
          overlay.classList.remove("is-performing");
          clearTimer=null;
        },1620);
      }
      function onSelection(){
        const next=validKey();
        if(next===selected)return;
        selected=next;
        if(!active)return;
        // If opening is still underway, the scheduled beat reads latest state.
        if(openTimer!==null)return;
        play();
      }
      function onVisibility(){
        const now=root.classList.contains("is-active");
        if(now===active)return;
        active=now;
        cancel();
        if(now)openTimer=window.setTimeout(play,780);
      }
      new MutationObserver(onSelection).observe(source,{
        attributes:true,attributeFilter:[def.attribute]
      });
      new MutationObserver(onVisibility).observe(root,{
        attributes:true,attributeFilter:["class"]
      });
      if(active){active=false;onVisibility();}
      live.push(cancel);
    }
    // Hide a pending beat if a nested case study, journal, archive or modal opens.
    const overlays=[
      document.querySelector(".case-world"),
      document.querySelector(".sound-archive"),
      document.querySelector(".p15-journal"),
      document.querySelector(".w19-root"),
      document.querySelector(".s34-overlay")
    ].filter(Boolean);
    for(const item of overlays){
      new MutationObserver(()=>{
        if(hiddenByOtherChapter())live.forEach(cancel);
      }).observe(item,{
        attributes:true,attributeFilter:item.classList.contains("s34-overlay")?["hidden"]:["class"]
      });
    }
    document.addEventListener("visibilitychange",()=>{
      if(document.hidden)live.forEach(cancel);
    });
  }
  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();