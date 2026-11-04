/* STEP 68 — SCENE CHOREOGRAPHY
   Selection-responsive optical type movement in three existing worlds.
   Existing scene controllers own all text, controls, focus, accessibility,
   and navigation. We observe their state; we never intercept clicks.
*/
(() => {
  function init() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrast = window.matchMedia("(prefers-contrast: more)");
    const canAnimate = () => !reduce.matches && !contrast.matches &&
      !document.hidden && typeof Element.prototype.animate === "function";

    const scenes = [
      {
        selector:".sound-world", state:"data-mood",
        buttons:".sound-mood", selection:"is-current", key:"mood",
        index:".sound-mood-name",
        metadata:[".sound-side",".s24-spectrum-label strong"]
      },
      {
        selector:".p14-world", state:"data-place",
        buttons:".p14-choice", selection:"is-selected", key:"target",
        index:".p14-choice-name",
        metadata:[".p14-card-counter",".p14-below-index"]
      },
      {
        selector:".a17-world", state:"data-mode",
        buttons:".a17-mode", selection:"is-selected", key:"a17Mode",
        index:"small",
        metadata:[".a17-panel-copy"]
      }
    ];

    for (const spec of scenes) {
      const scene = document.querySelector(spec.selector);
      if (!scene || scene.dataset.s68Ready === "1") continue;
      const buttons=[...scene.querySelectorAll(spec.buttons)];
      if (buttons.length !== 3) continue;
      scene.dataset.s68Ready = "1";
      scene.classList.add("s68-ready");

      for (const button of buttons) {
        if (button.querySelector(":scope > .s68-rail")) continue;
        const rail=document.createElement("span");
        rail.className="s68-rail";
        rail.setAttribute("aria-hidden","true");
        button.appendChild(rail);
      }

      let previousState = "";
      let wasOpen = false;
      let queued = 0;
      const animations = new Set();
      const stop = () => {
        for (const animation of [...animations]) {
          try { animation.cancel(); } catch (_) {}
        }
        animations.clear();
      };
      function reveal(node,delay,duration) {
        if (!node || !node.isConnected || !canAnimate()) return;
        const animation=node.animate([
          {opacity:.38,clipPath:"inset(0 100% 0 0)"},
          {opacity:1,clipPath:"inset(0 0 0 0)"}
        ],{
          duration,delay,easing:"cubic-bezier(.16,.84,.25,1)",fill:"none"
        });
        animations.add(animation);
        for (const eventName of ["finish","cancel"]) {
          animation.addEventListener(eventName,()=>animations.delete(animation),{once:true});
        }
      }
      function run(key) {
        queued=0;
        if (!scene.classList.contains("is-active") || !canAnimate()) return;
        const selected=buttons.find(button => button.dataset[spec.key] === key);
        if (!selected) return;
        // A typography ripple synchronized to the original selected state.
        // Only opacity and clip-path: never animate GSAP-owned transforms.
        reveal(selected.querySelector(spec.index),0,570);
        spec.metadata.forEach((query,i)=>{
          // Wait for original About's requestAnimationFrame content refresh;
          // timing here is *visual* only and never delays the real UI.
          reveal(scene.querySelector(query),85+i*80,510+i*90);
        });
      }
      function sync() {
        const active=scene.classList.contains("is-active");
        const key=scene.getAttribute(spec.state)||"";
        if(!active){
          wasOpen=false;
          stop();
          if (queued) {cancelAnimationFrame(queued); queued=0;}
          return;
        }
        if(active && wasOpen && previousState===key) return;
        const firstOpen=!wasOpen;
        wasOpen=true; previousState=key;
        stop();
        if(queued) cancelAnimationFrame(queued);
        if(!canAnimate()) return;
        // Existing intro animations have priority; quick changes get
        // immediate responses, while opening gets a small optical delay.
        queued=requestAnimationFrame(()=>run(key));
      }

      new MutationObserver(sync).observe(scene,{
        attributes:true,attributeFilter:["class",spec.state]
      });
      sync();
      const quiet = () => { if (!canAnimate()) { stop(); if(queued)cancelAnimationFrame(queued);queued=0; } };
      reduce.addEventListener?.("change",quiet);
      contrast.addEventListener?.("change",quiet);
      document.addEventListener("visibilitychange",quiet);
    }
  }

  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();