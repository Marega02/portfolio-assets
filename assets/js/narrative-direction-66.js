/* STEP 66 — NARRATIVE DIRECTION
   One intersection observer per chapter viewer. Makes the existing story
   sections register as chapters and gives Travel Journal text a short reveal.
   No added pages, timers, focus management, scroll handlers or GSAP overrides.
*/
(() => {
  function init() {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrast = window.matchMedia("(prefers-contrast: more)");
    const animationOK = () =>
      !motion.matches && !contrast.matches && !document.hidden &&
      !document.body.classList.contains("s41-studio-focus") &&
      typeof Element.prototype.animate === "function";

    const configs = [
      {
        root:document.querySelector(".case-world"),
        isOpen:"is-active",
        identity:"data-theme",
        chapters:[".case-story",".case-chapter"],
        typographic:[]
      },
      {
        root:document.querySelector(".p15-journal"),
        isOpen:"is-open",
        identity:"data-place",
        chapters:[".p15-story",".p15-gallery",".p15-outro"],
        typographic:[
          ".p15-story-title",".p15-story-lead",
          ".p15-gallery-note",".p15-outro-text"
        ]
      }
    ];

    configs.forEach(config => {
      const root = config.root;
      if (!root || root.dataset.s66Ready === "1") return;
      const sections = config.chapters.map(q=>root.querySelector(q)).filter(Boolean);
      if (!sections.length) return;
      root.dataset.s66Ready = "1";
      root.classList.add("s66-ready");

      sections.forEach(section => {
        if (section.querySelector(":scope > .s66-reading-line")) return;
        const line=document.createElement("span");
        line.className="s66-reading-line";
        line.setAttribute("aria-hidden","true");
        section.appendChild(line);
      });

      let seen = new WeakSet();
      const animations = new Set();
      let wasOpen = root.classList.contains(config.isOpen);
      let oldIdentity = root.getAttribute(config.identity)||"";

      function cancelAnimation() {
        for(const animation of animations) {
          try { animation.cancel(); } catch (_) {}
        }
        animations.clear();
      }

      function animateText(target) {
        if (!animationOK()) return;
        if (typeof target.animate !== "function") return;
        const isAside = target.matches(".p15-gallery-note");
        const duration = isAside?600:910;
        const frames = isAside
          ? [{opacity:.3,clipPath:"inset(0 100% 0 0)"},{opacity:1,clipPath:"inset(0 0 0 0)"}]
          : [{opacity:.55,clipPath:"inset(0 0 100% 0)"},{opacity:1,clipPath:"inset(0 0 0 0)"}];
        const a=target.animate(frames,{
          duration,easing:"cubic-bezier(.16,.9,.23,1)",fill:"none"
        });
        animations.add(a);
        a.addEventListener("finish",()=>animations.delete(a),{once:true});
        a.addEventListener("cancel",()=>animations.delete(a),{once:true});
      }

      const titles=config.typographic
        .map(q=>root.querySelector(q))
        .filter(Boolean);
      const all=[...sections,...titles];
      const observer=("IntersectionObserver" in window)
        ? new IntersectionObserver(entries => {
            if(!root.classList.contains(config.isOpen)) return;
            entries.forEach(entry => {
              if(!entry.isIntersecting || seen.has(entry.target)) return;
              seen.add(entry.target);
              if(sections.includes(entry.target)){
                entry.target.classList.add("s66-reading-active");
              } else animateText(entry.target);
              observer.unobserve(entry.target);
            });
          },{root,rootMargin:"0px 0px -8% 0px",threshold:.11})
        : null;

      function rearm() {
        cancelAnimation();
        seen=new WeakSet();
        sections.forEach(section=>section.classList.remove("s66-reading-active"));
        if(observer) all.forEach(target=>{
          observer.unobserve(target);
          observer.observe(target);
        });
        else sections.forEach(section=>section.classList.add("s66-reading-active"));
      }

      function synchronize() {
        const open=root.classList.contains(config.isOpen);
        const identity=root.getAttribute(config.identity)||"";
        if((open&&!wasOpen)||identity!==oldIdentity) rearm();
        oldIdentity=identity;
        wasOpen=open;
        if(!open) {
          cancelAnimation();
          sections.forEach(section=>section.classList.remove("s66-reading-active"));
        }
      }

      rearm();
      new MutationObserver(synchronize).observe(root,{
        attributes:true,attributeFilter:["class",config.identity]
      });

      const quiet=()=>{
        if(animationOK()) return;
        cancelAnimation();
      };
      motion.addEventListener?.("change",quiet);
      contrast.addEventListener?.("change",quiet);
      document.addEventListener("visibilitychange",quiet);
      synchronize();
    });
  }
  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();