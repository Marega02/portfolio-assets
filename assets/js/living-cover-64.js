/* STEP 64 — THE LIVING COVER
   Enhances the existing HOME paper stage and navigation.
   GSAP keeps exclusive control of the original poster, title and links.
   No new world, overlay, scroll handler, or looping animation. */
(() => {
  function init() {
    const hub = document.querySelector(".world-hub");
    const stage = hub?.querySelector(".world-stage");
    const backing = stage?.querySelector(".stage-sheet-back");
    const links = hub ? [...hub.querySelectorAll(".world-link")] : [];
    if (!hub || !stage || !backing || links.length !== 4 ||
        hub.dataset.s64Ready === "1") return;
    hub.dataset.s64Ready = "1";
    hub.classList.add("s64-ready");

    const foil = document.createElement("span");
    foil.className = "s64-back-foil";
    foil.setAttribute("aria-hidden","true");
    backing.appendChild(foil);

    links.forEach(link => {
      const line = document.createElement("span");
      line.className = "s64-link-rule";
      line.setAttribute("aria-hidden","true");
      link.appendChild(line);
    });

    const labels = ["work","sound","places","about"];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrast = window.matchMedia("(prefers-contrast: more)");
    let previous = "";
    let foilAnimation = null;
    let typeAnimations = [];
    const canAnimate = () =>
      !reduce.matches && !contrast.matches && !document.hidden &&
      typeof Element.prototype.animate === "function";

    function stop() {
      try { foilAnimation?.cancel(); } catch (_) {}
      foilAnimation = null;
      typeAnimations.forEach(a => {
        try { a.cancel(); } catch (_) {}
      });
      typeAnimations = [];
    }

    function sync() {
      const raw = hub.dataset.s40Scene ||
        hub.dataset.s22Scene || "work";
      const scene = labels.includes(raw) ? raw : "work";
      const index = labels.indexOf(scene);
      links.forEach((link,i) => {
        link.classList.toggle("is-s64-current",i===index);
      });
      if (scene === previous) return;
      const before = previous;
      previous = scene;
      stop();
      if (!before || !canAnimate()) return;

      // The foil is INSIDE the rear sheet, so the original physical
      // parallax from home.js remains unchanged.
      foilAnimation = foil.animate([
        {opacity:.20,clipPath:"inset(0 100% 0 0)"},
        {opacity:.86,clipPath:"inset(0 0 0 0)"}
      ], {duration:650,easing:"cubic-bezier(.2,.7,.2,1)",fill:"none"});

      // A typewriter-like registration on existing, small editorial type.
      // Never reanimate the hero title or the poster's GSAP-managed text.
      const indexLabel = links[index]?.querySelector(".world-index");
      const imprint = stage.querySelector(".s40-imprint");
      const folio = stage.querySelector(".s40-edition-number");
      for (const [node,delay] of [[indexLabel,0],[folio,95],[imprint,140]]) {
        if (!node) continue;
        const a = node.animate([
          {opacity:.25,clipPath:"inset(0 100% 0 0)"},
          {opacity:1,clipPath:"inset(0 0 0 0)"}
        ], {duration:510,delay,easing:"cubic-bezier(.16,1,.3,1)",fill:"none"});
        typeAnimations.push(a);
      }
    }

    // Step 40 already drives the scene identity from pointer/focus.
    // Observing that same attribute avoids duplicate navigation events.
    new MutationObserver(sync).observe(hub,{
      attributes:true,attributeFilter:["data-s40-scene","data-s22-scene"]
    });
    sync();

    reduce.addEventListener?.("change", () => {
      if (reduce.matches) stop();
    });
    contrast.addEventListener?.("change", () => {
      if (contrast.matches) stop();
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stop();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded",init,{once:true});
  } else init();
})();