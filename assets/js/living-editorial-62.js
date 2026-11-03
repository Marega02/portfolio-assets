/* STEP 62 — ABOUT / THREE EDITORIAL STATES
   Finite chapter-ink transitions + one-shot masked editorial reveals.
   The original About click handlers still own all actual selection.
   No new blocks in the layout, no scroll blocking or animation loop. */
(() => {
  function init() {
    const about = document.querySelector(".a17-world");
    const visual = about?.querySelector(".a18-visual");
    const entries = [...(about?.querySelectorAll(".a18-entry") || [])];
    if (!about || !visual || entries.length !== 3 ||
        about.dataset.s62Ready === "1") return;
    about.dataset.s62Ready = "1";

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrast = window.matchMedia("(prefers-contrast: more)");
    const allowMotion = () => !reduce.matches && !contrast.matches &&
      !document.hidden && typeof Element.prototype.animate === "function";
    const pass = document.createElement("span");
    pass.className = "s62-ink-pass";
    pass.setAttribute("aria-hidden", "true");
    visual.appendChild(pass);

    const word = visual.querySelector(".a18-visual-word");
    const caption = visual.querySelector(".a18-visual-caption");
    const heroItalic = about.querySelector(".a17-title-ital");
    const heroRing = about.querySelector(".a17-card-circle");
    const heroStamp = about.querySelector(".a17-card-stamp");
    let animations = [];
    let lastScene = "";
    let wasOpen = false;

    function clearAnimations() {
      animations.forEach(a => {
        try { a.cancel(); } catch (_) {}
      });
      animations = [];
    }
    function run(element, frames, duration, delay = 0) {
      if (!element) return;
      const a = element.animate(frames, {
        duration, delay, easing:"cubic-bezier(.16,.8,.2,1)", fill:"none"
      });
      animations.push(a);
    }
    function printScene() {
      const active = about.classList.contains("is-active");
      if (!active) {
        wasOpen = false;
        clearAnimations();
        return;
      }
      const key = visual.dataset.scene || "make";
      if (!["make","listen","wander"].includes(key)) return;
      if (wasOpen && key === lastScene) return;
      const firstOpening = !wasOpen;
      lastScene = key;
      wasOpen = true;
      clearAnimations();
      if (!allowMotion()) return;

      // The opening hero is also part of the narrative: only animate
      // letterforms and opacity, never the original tilt/card layout.
      if (firstOpening) {
        run(heroItalic, [
          {clipPath:"inset(0 100% 0 0)",opacity:.35},
          {clipPath:"inset(0 0 0 0)",opacity:1}
        ], 850, 270);
        run(heroRing, [{opacity:0},{opacity:1}], 1000, 200);
        run(heroStamp, [{opacity:0},{opacity:1}], 720, 420);
      }

      // The editorial graphic is lower in the chapter. Animate it only
      // when actually visible, not while the visitor reads the hero.
      const r = visual.getBoundingClientRect();
      const viewport = about.getBoundingClientRect();
      if (r.bottom < viewport.top || r.top > viewport.bottom) return;

      // A short, angled ink reflection—entirely behind original labels.
      run(pass, [
        {transform:"translate3d(-115%,0,0)",opacity:0},
        {transform:"translate3d(-3%,0,0)",opacity:.48,offset:.48},
        {transform:"translate3d(115%,0,0)",opacity:0}
      ], 920);

      // The existing caption changes on click: reveal only its letterforms.
      run(word, [
        {clipPath:"inset(0 0 95% 0)",opacity:.3},
        {clipPath:"inset(0 0 0 0)",opacity:1}
      ], 660, 70);
      run(caption, [
        {clipPath:"inset(0 100% 0 0)",opacity:.25},
        {clipPath:"inset(0 0 0 0)",opacity:1}
      ], 590, 175);
    }

    // Observer listens exclusively to the existing section/state.
    new MutationObserver(printScene).observe(visual, {
      attributes:true, attributeFilter:["data-scene"]
    });
    new MutationObserver(printScene).observe(about, {
      attributes:true, attributeFilter:["class"]
    });
    printScene();

    // Progressive reading: each existing row is revealed once when
    // scrolled into view. The entire row remains clickable at all times.
    if (window.innerWidth > 900 && "IntersectionObserver" in window &&
        !reduce.matches && !contrast.matches) {
      const targets = [];
      entries.forEach((row,i) => {
        const heading = row.querySelector(".a18-entry-heading");
        const copy = row.querySelector(".a18-entry-copy");
        if (heading) targets.push([heading, i*45]);
        if (copy) targets.push([copy, i*45 + 110]);
      });
      const endingHeading = about.querySelector(".a18-ending h3");
      if (endingHeading) targets.push([endingHeading, 0]);

      const observer = new IntersectionObserver(records => {
        records.forEach(record => {
          if (!record.isIntersecting) return;
          record.target.classList.add("s62-reading-visible");
          observer.unobserve(record.target);
        });
      }, {root:about, rootMargin:"0px 0px -9% 0px", threshold:.1});

      targets.forEach(([element,delay]) => {
        element.style.setProperty("--s62-delay",delay+"ms");
        element.classList.add("s62-reading-ready");
        observer.observe(element);
      });

      const revealAll = () => {
        if (!reduce.matches && !contrast.matches) return;
        targets.forEach(([el]) => el.classList.add("s62-reading-visible"));
        observer.disconnect();
      };
      reduce.addEventListener?.("change", revealAll);
      contrast.addEventListener?.("change", revealAll);
    }

    const stopIfNeeded = () => {
      if (!allowMotion()) clearAnimations();
    };
    reduce.addEventListener?.("change", stopIfNeeded);
    contrast.addEventListener?.("change", stopIfNeeded);
    document.addEventListener("visibilitychange", stopIfNeeded);
  }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init, {once:true});
  else init();
})();