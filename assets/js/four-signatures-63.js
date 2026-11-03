/* STEP 63 — FOUR SIGNATURES, ONE EXISTING GATE
   Extends STEP 27 instead of creating another overlay. No route/focus
   changes, no GSAP overrides, no new fixed layers, no constant loops. */
(() => {
  function init() {
    const gate = document.querySelector(".s27-sequence");
    const hub = document.querySelector(".world-hub");
    const stage = hub?.querySelector(".world-stage");
    if (!gate || !hub || !stage || gate.classList.contains("s63-ready")) return;

    const motif = document.createElement("div");
    motif.className = "s63-motif";
    motif.setAttribute("aria-hidden","true");
    motif.innerHTML = [
      '<svg class="s63-art-work" viewBox="0 0 440 440" aria-hidden="true">',
      '<g><rect x="65" y="53" width="264" height="333" rx="1"/>',
      '<rect x="91" y="76" width="264" height="333" rx="1" class="s63-thin"/>',
      '<rect x="117" y="102" width="218" height="271"/>',
      '<path d="M117 237H335M226 102V373" class="s63-thin"/>',
      '<path d="M117 237L335 102V373Z" class="s63-heavy"/>',
      '<path d="M47 68H92M68 46V90M350 357H395M373 334V381" class="s63-thin"/>',
      '</g></svg>',
      '<svg class="s63-art-sound" viewBox="0 0 440 440" aria-hidden="true">',
      '<g><circle cx="211" cy="206" r="162"/>',
      '<circle cx="211" cy="206" r="143" class="s63-thin"/>',
      '<circle cx="211" cy="206" r="122"/><circle cx="211" cy="206" r="85" class="s63-thin"/>',
      '<circle cx="211" cy="206" r="44"/><circle cx="211" cy="206" r="9"/>',
      '<path d="M49 390V378M65 390V363M81 390V373M97 390V352M113 390V369M129 390V346M145 390V358M161 390V340M177 390V363M193 390V355M209 390V343M225 390V369M241 390V350M257 390V365M273 390V337M289 390V360M305 390V348M321 390V375M337 390V356M353 390V369M369 390V380" class="s63-heavy"/>',
      '</g></svg>',
      '<svg class="s63-art-places" viewBox="0 0 440 440" aria-hidden="true">',
      '<g><path d="M-10 75C61-10 122 44 143 91S241 161 299 97 392 50 451 101"/>',
      '<path d="M-12 114C64 35 110 66 134 117S240 192 304 136 394 92 450 137" class="s63-thin"/>',
      '<path d="M-12 154C56 77 126 112 151 158S229 239 313 174 405 129 451 180"/>',
      '<path d="M-11 208C69 121 138 158 153 208S246 282 316 224 405 190 452 231" class="s63-thin"/>',
      '<path d="M-15 264C81 187 127 194 165 263S238 334 321 276 399 248 454 282"/>',
      '<path d="M-16 325C66 252 138 260 175 319S252 382 329 334 405 305 453 345" class="s63-thin"/>',
      '<path d="M68 354C115 335 131 283 194 260S288 183 365 112" class="s63-heavy"/>',
      '<circle cx="68" cy="354" r="12"/><circle cx="365" cy="112" r="12"/>',
      '</g></svg>',
      '<svg class="s63-art-about" viewBox="0 0 440 440" aria-hidden="true">',
      '<g><circle cx="220" cy="220" r="146"/>',
      '<ellipse cx="220" cy="220" rx="188" ry="82" transform="rotate(-29 220 220)"/>',
      '<ellipse cx="220" cy="220" rx="82" ry="188" transform="rotate(27 220 220)" class="s63-thin"/>',
      '<circle cx="220" cy="220" r="48"/>',
      '<path d="M40 220H400M220 40V400" class="s63-thin"/>',
      '<path d="M57 73H110M57 73V126M329 364H383V310" class="s63-heavy"/>',
      '</g></svg>'
    ].join("");
    gate.appendChild(motif);
    gate.classList.add("s63-ready");

    /* A quiet HOME welcome-back, only after a world actually closes.
       Waiting briefly avoids interfering with direct About→Work entry. */
    const specs = [".work-world",".sound-world",".p14-world",".a17-world"];
    const roots = specs.map(selector => document.querySelector(selector));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrast = window.matchMedia("(prefers-contrast: more)");
    const halo = stage.querySelector(".s40-halo");
    let returnTask = 0;
    let cleanupTask = 0;
    const previous = roots.map(el => !!el?.classList.contains("is-active"));

    function cancelHomeEffect() {
      if (returnTask) { clearTimeout(returnTask); returnTask = 0; }
      if (cleanupTask) { clearTimeout(cleanupTask); cleanupTask = 0; }
      hub.classList.remove("s63-returning");
    }
    function canReturn() {
      return !document.hidden && !reduced.matches && !contrast.matches &&
        !roots.some(el => el?.classList.contains("is-active")) &&
        !document.querySelector(".case-world.is-active,.sound-archive.is-open,.p15-journal.is-open");
    }
    function scheduleReturn() {
      if (returnTask) clearTimeout(returnTask);
      returnTask = setTimeout(() => {
        returnTask = 0;
        if (!canReturn() || !halo) return;
        hub.classList.remove("s63-returning");
        void halo.offsetWidth;
        hub.classList.add("s63-returning");
        if (cleanupTask) clearTimeout(cleanupTask);
        cleanupTask = setTimeout(() => {
          hub.classList.remove("s63-returning");
          cleanupTask = 0;
        }, 820);
      }, 130);
    }

    roots.forEach((root,index) => {
      if (!root) return;
      new MutationObserver(() => {
        const now = root.classList.contains("is-active");
        if (now === previous[index]) return;
        previous[index] = now;
        if (now) cancelHomeEffect();
        else scheduleReturn();
      }).observe(root, {attributes:true,attributeFilter:["class"]});
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) cancelHomeEffect();
    });
    reduced.addEventListener?.("change", () => {
      if (reduced.matches) cancelHomeEffect();
    });
    contrast.addEventListener?.("change", () => {
      if (contrast.matches) cancelHomeEffect();
    });
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init, {once:true});
  else init();
})();