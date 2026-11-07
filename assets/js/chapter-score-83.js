/* PHASE 83 — CHAPTER SCORE / ORIGINAL OPENING SCORE
   Four-world title choreography, synchronized to the pre-existing slide
   and STEP 77 image treatment. No duplicate overlays, no click handling,
   no GSAP transforms, no navigation changes and no hidden controls.
   Original typography is only temporarily masked by Web Animations. */
(() => {
  function init(){
    const reduce=window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrast=window.matchMedia("(prefers-contrast: more)");
    const minimal=window.matchMedia("(max-width: 760px)");
    const specs=[
      {
        selector:".work-world",
        eyebrow:".work-eyebrow",
        title:".work-title",
        copy:".work-intro"
      },
      {
        selector:".sound-world",
        eyebrow:".sound-index",
        title:".sound-title",
        copy:".sound-description"
      },
      {
        selector:".p14-world",
        eyebrow:".p14-eyebrow",
        title:".p14-title",
        copy:".p14-intro"
      },
      {
        selector:".a17-world",
        eyebrow:".a17-eyebrow",
        title:".a17-title",
        copy:".a17-lead"
      }
    ];
    const enabled=()=>!document.hidden&&!reduce.matches&&!contrast.matches&&
      typeof Element.prototype.animate==="function"&&
      !document.body.classList.contains("s41-studio-focus");

    for(const spec of specs){
      const root=document.querySelector(spec.selector);
      const eyebrow=root?.querySelector(spec.eyebrow);
      const title=root?.querySelector(spec.title);
      const copy=root?.querySelector(spec.copy);
      if(!root||!eyebrow||!title||!copy||root.dataset.s83Ready==="1")continue;
      root.dataset.s83Ready="1";
      root.classList.add("s83-ready");
      let previousOpen=false;
      let completeTimer=0;
      const active=new Set();

      function cancel(){
        if(completeTimer){clearTimeout(completeTimer);completeTimer=0}
        for(const animation of [...active]){
          try{animation.cancel()}catch(_){}
        }
        active.clear();
        root.classList.remove("s83-opening");
      }
      function animate(node,stage){
        if(!node||!enabled()||!node.isConnected)return;
        const short=minimal.matches;
        const settings={
          eyebrow: {delay:short?85:190,duration:short?460:570,axis:"x"},
          title:   {delay:short?150:315,duration:short?670:830,axis:"y"},
          copy:    {delay:short?285:550,duration:short?560:700,axis:"x"}
        }[stage];
        // A backwards fill keeps a title masked during its short delay.
        // Once the animation finishes, the original CSS takes over again.
        const keyframes=settings.axis==="y"
          ? [
             {opacity:.23,clipPath:"inset(0 0 100% 0)",offset:0},
             {opacity:.88,clipPath:"inset(0 0 8% 0)",offset:.70},
             {opacity:1,clipPath:"inset(0 0 0 0)",offset:1}
            ]
          : [
             {opacity:.32,clipPath:"inset(0 100% 0 0)",offset:0},
             {opacity:.93,clipPath:"inset(0 7% 0 0)",offset:.74},
             {opacity:1,clipPath:"inset(0 0 0 0)",offset:1}
            ];
        const a=node.animate(keyframes,{
          delay:settings.delay,
          duration:settings.duration,
          easing:"cubic-bezier(.16,.84,.25,1)",
          fill:"backwards"
        });
        active.add(a);
        a.addEventListener("finish",()=>active.delete(a),{once:true});
        a.addEventListener("cancel",()=>active.delete(a),{once:true});
      }
      function entrance(){
        cancel();
        root.classList.remove("s83-settled");
        if(!enabled()){
          root.classList.add("s83-settled");
          return;
        }
        // The existing chapter gate and original world entrance animate
        // the page position. We animate only type opacity and clipping.
        root.classList.add("s83-opening");
        animate(eyebrow,"eyebrow");
        animate(title,"title");
        animate(copy,"copy");
        completeTimer=setTimeout(()=>{
          root.classList.remove("s83-opening");
          if(root.classList.contains("is-active"))
            root.classList.add("s83-settled");
          completeTimer=0;
        },minimal.matches?900:1390);
      }
      function state(){
        const opened=root.classList.contains("is-active");
        if(opened===previousOpen)return;
        previousOpen=opened;
        if(opened)entrance();
        else {
          cancel();
          root.classList.remove("s83-settled");
        }
      }
      const observer=new MutationObserver(state);
      observer.observe(root,{attributes:true,attributeFilter:["class"]});
      state();
      const stopIfNeeded=()=>{
        if(enabled())return;
        cancel();
        if(root.classList.contains("is-active"))root.classList.add("s83-settled");
      };
      reduce.addEventListener?.("change",stopIfNeeded);
      contrast.addEventListener?.("change",stopIfNeeded);
      document.addEventListener("visibilitychange",stopIfNeeded);
    }
  }
  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();