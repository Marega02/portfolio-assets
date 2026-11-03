/* STEP 56 — QUIET MOTION / CHAPTER SIGNATURES
   One decorative header line per world and one-shot copy reveals.
   Zero animation loops, timers, extra scroll listeners, or GSAP overrides.
*/
(() => {
  function init() {
    if (document.documentElement.dataset.s56Ready === "1") return;
    document.documentElement.dataset.s56Ready = "1";

    const headers = [
      ".world-hub .world-top",
      ".work-world .work-top",
      ".sound-world .sound-top",
      ".p14-world .p14-top",
      ".a17-world .a17-header"
    ];

    headers.forEach(selector => {
      const header = document.querySelector(selector);
      if (!header || header.querySelector(".s56-header-line")) return;
      const line = document.createElement("span");
      line.className = "s56-header-line";
      line.setAttribute("aria-hidden", "true");
      header.appendChild(line);
    });

    // Copy-only reveals: the site's existing world/hero animations and
    // selected-element interactions remain in sole control of movement.
    if (!("IntersectionObserver" in window) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        window.innerWidth <= 991) return;

    const specs = [
      [".sound-world", [".sound-bottom"]],
      [".p14-world", [".p14-below"]],
      [".a17-world", [".a17-curiosity-head", ".a18-meta", ".a18-deck"]]
    ];

    specs.forEach(([sceneSelector, targetSelectors]) => {
      const scene = document.querySelector(sceneSelector);
      if (!scene) return;

      const targets = targetSelectors
        .map(s => scene.querySelector(s))
        .filter(Boolean);
      if (!targets.length) return;

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("s56-visible");
          observer.unobserve(entry.target);
        });
      }, {
        root: scene,
        rootMargin: "0px 0px -5% 0px",
        threshold: 0.08
      });

      targets.forEach(el => {
        el.classList.add("s56-reveal-ready");
        observer.observe(el);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, {once: true});
  } else {
    init();
  }
})();
