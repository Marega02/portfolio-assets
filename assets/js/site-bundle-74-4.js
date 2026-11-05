/* STEP 74 — JS BUNDLE 4 OF 4 — original controllers unmodified. */

/* SOURCE assets/js/living-editorial-62.js */
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
;


/* SOURCE assets/js/four-signatures-63.js */
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
;


/* SOURCE assets/js/living-cover-64.js */
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
;


/* SOURCE assets/js/film-frames-65.js */
/* STEP 65 — FILM FRAMES / THE DIRECTOR'S CUT
   Passive, finite visual entrance for existing case-study and journal media.
   All added elements are aria-hidden inside the original figures.
   No image transforms, no navigation handlers, no duplicated scroll progress. */
(() => {
  function init() {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrast = window.matchMedia("(prefers-contrast: more)");
    const mediaAllowed = () => !reduced.matches && !contrast.matches &&
      !document.hidden && !document.body.classList.contains("s41-studio-focus");

    const groups = [
      {
        root: document.querySelector(".case-world"),
        openClass: "is-active",
        identity: "data-theme",
        selectors: [".case-visual", ".chapter-media"]
      },
      {
        root: document.querySelector(".p15-journal"),
        openClass: "is-open",
        identity: "data-place",
        selectors: [".p15-hero-figure", ".p15-shot-visual"]
      }
    ];

    for (const group of groups) {
      const root = group.root;
      if (!root || root.dataset.s65Ready === "1") continue;
      const frames = [...new Set(group.selectors.flatMap(
        selector => [...root.querySelectorAll(selector)]
      ))];
      if (!frames.length) continue;
      root.dataset.s65Ready = "1";
      root.classList.add("s65-ready");

      for (const frame of frames) {
        if (frame.querySelector(":scope > .s65-film-frame")) continue;
        const light = document.createElement("span");
        light.className = "s65-film-light";
        light.setAttribute("aria-hidden","true");
        const marks = document.createElement("span");
        marks.className = "s65-film-frame";
        marks.setAttribute("aria-hidden","true");
        frame.append(light,marks);
      }

      let seen = new WeakSet();
      let wasOpen = root.classList.contains(group.openClass);
      let lastIdentity = root.getAttribute(group.identity) || "";
      const canPlay = () => mediaAllowed() &&
        root.classList.contains(group.openClass);

      const observer = ("IntersectionObserver" in window)
        ? new IntersectionObserver(entries => {
            if (!canPlay()) return;
            for (const entry of entries) {
              if (!entry.isIntersecting || seen.has(entry.target)) continue;
              const frame = entry.target;
              seen.add(frame);
              frame.classList.add("s65-play");
              observer.unobserve(frame);
            }
          }, {
            root, threshold: .09, rootMargin: "0px 0px -6% 0px"
          })
        : null;

      function rearm() {
        seen = new WeakSet();
        for (const frame of frames) {
          frame.classList.remove("s65-play");
          if (observer) {
            observer.unobserve(frame);
            observer.observe(frame);
          }
        }
      }

      if (observer) frames.forEach(frame => observer.observe(frame));

      const sync = () => {
        const open = root.classList.contains(group.openClass);
        const identity = root.getAttribute(group.identity) || "";
        if (identity !== lastIdentity || (open && !wasOpen)) {
          lastIdentity = identity;
          rearm();
        }
        wasOpen = open;
        if (!open) {
          for (const frame of frames) frame.classList.remove("s65-play");
        }
      };

      new MutationObserver(sync).observe(root, {
        attributes: true, attributeFilter: ["class", group.identity]
      });

      // Reduced motion / high contrast always restores original images.
      const quiet = () => {
        if (mediaAllowed()) return;
        for (const frame of frames) frame.classList.remove("s65-play");
      };
      reduced.addEventListener?.("change", quiet);
      contrast.addEventListener?.("change", quiet);
      document.addEventListener("visibilitychange", quiet);
      sync();
    }
  }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();
;


/* SOURCE assets/js/narrative-direction-66.js */
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
;


/* SOURCE assets/js/scene-choreography-68.js */
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
;


/* SOURCE assets/js/record-gallery-69.js */
/* STEP 69 — THE RECORD GALLERY
   Three original vector sleeve worlds, inside the existing SOUND art.
   No external images/audio, no new route handlers, no GSAP overrides.
   Existing mood buttons and accessibility remain the source of truth. */
(() => {
  function init() {
    const sound=document.querySelector(".sound-world");
    const art=sound?.querySelector(".sound-art");
    const record=art?.querySelector(".sound-record");
    const moodButtons=[...(sound?.querySelectorAll(".sound-mood")||[])];
    if(!sound || !art || !record || moodButtons.length!==3 ||
       sound.dataset.s69Ready==="1") return;

    const gallery=document.createElement("div");
    gallery.className="s69-gallery";
    gallery.setAttribute("aria-hidden","true");

    const scene={
      soul:`
        <div class="s69-panel" data-s69-mood="soul">
          <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <radialGradient id="s69-soul-sun"><stop offset="0" stop-color="#efb994" stop-opacity=".35"/><stop offset=".7" stop-color="#be6a54" stop-opacity=".16"/><stop offset="1" stop-color="#be6a54" stop-opacity="0"/></radialGradient>
            </defs>
            <circle cx="390" cy="235" r="275" fill="url(#s69-soul-sun)"/>
            <circle cx="339" cy="266" r="234" class="s69-artline"/>
            <circle cx="339" cy="266" r="201" class="s69-hairline"/>
            <circle cx="339" cy="266" r="172" class="s69-artline"/>
            <circle cx="339" cy="266" r="146" class="s69-hairline"/>
            <circle cx="339" cy="266" r="113" class="s69-artline"/>
            <circle cx="339" cy="266" r="80" class="s69-hairline"/>
            <path d="M-30 438Q160 350 338 430T640 394M-30 464Q150 380 338 462T640 432M-30 492Q160 410 338 489T640 458M-30 518Q166 443 338 517T640 489" class="s69-artline"/>
            <path d="M60 86H180M60 100H143M60 114H110M492 355H562M492 368H538" class="s69-hairline"/>
            <circle cx="125" cy="188" r="38" class="s69-solid"/>
          </svg>
          <span class="s69-panel-word">SOUL.</span>
        </div>`,
      hiphop:`
        <div class="s69-panel" data-s69-mood="hiphop">
          <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <path d="M0 88L600 88M0 188L600 188M0 288L600 288M0 388L600 388M0 488L600 488M100 0L100 600M200 0L200 600M300 0L300 600M400 0L400 600M500 0L500 600" class="s69-hairline"/>
            <path d="M-33 213L264 -40L406 145L117 406Z" class="s69-solid"/>
            <path d="M-33 213L264 -40L406 145L117 406Z" class="s69-artline"/>
            <path d="M185 515L527 176L631 288L299 622Z" class="s69-artline"/>
            <path d="M-50 365L280 35M-30 407L300 76M-6 447L322 116" class="s69-artline"/>
            <path d="M56 449V424M80 449V372M104 449V402M128 449V351M152 449V410M176 449V334M200 449V379M224 449V325M248 449V398M272 449V347M296 449V386M320 449V318M344 449V374M368 449V340M392 449V389M416 449V351M440 449V400M464 449V367M488 449V416M512 449V383M536 449V434" class="s69-artline" stroke-width="6"/>
            <rect x="408" y="80" width="138" height="100" class="s69-solid"/>
            <rect x="408" y="80" width="138" height="100" class="s69-artline"/>
            <path d="M424 103H526M424 125H503M424 147H516" class="s69-hairline"/>
          </svg>
          <span class="s69-panel-word">HIP-HOP.</span>
        </div>`,
      alternative:`
        <div class="s69-panel" data-s69-mood="alternative">
          <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <linearGradient id="s69-alt-haze" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#d9badb" stop-opacity=".25"/>
                <stop offset="1" stop-color="#8fc4d6" stop-opacity=".025"/>
              </linearGradient>
            </defs>
            <path d="M0 0H600V600H0Z" fill="url(#s69-alt-haze)"/>
            <ellipse cx="370" cy="275" rx="250" ry="150" transform="rotate(-26 370 275)" class="s69-artline"/>
            <ellipse cx="370" cy="275" rx="222" ry="94" transform="rotate(28 370 275)" class="s69-hairline"/>
            <ellipse cx="370" cy="275" rx="120" ry="230" transform="rotate(-13 370 275)" class="s69-artline"/>
            <path d="M0 158C75 30 128 288 207 163S327 26 399 166S524 295 609 124M0 203C74 75 134 333 211 209S324 74 404 210S526 340 610 170M0 247C77 118 136 374 211 255S326 110 404 255S523 374 609 213" class="s69-artline"/>
            <path d="M0 291C80 167 144 420 209 297S326 151 405 303S525 425 608 264M0 336C71 209 142 469 209 339S334 197 407 341S526 461 608 302" class="s69-hairline"/>
            <circle cx="155" cy="83" r="30" class="s69-solid"/>
            <path d="M101 80H209M154 26V137M451 478H550M502 428V527" class="s69-hairline"/>
          </svg>
          <span class="s69-panel-word">ALT.</span>
        </div>`
    };

    gallery.innerHTML=[
      scene.soul,scene.hiphop,scene.alternative,
      '<div class="s69-gallery-meta"><span>LM® / THE RECORD GALLERY</span><span class="s69-genre-label">SIDE A — SOUL</span></div>',
      '<div class="s69-gallery-bottom"><span>ANALOG ART / 001—003</span><span>SELECT A FREQUENCY</span></div>'
    ].join("");
    art.prepend(gallery);
    sound.classList.add("s69-ready");
    sound.dataset.s69Ready="1";

    const names={
      soul:"SIDE A — SOUL",
      hiphop:"SIDE B — HIP-HOP",
      alternative:"SIDE C — ALTERNATIVE"
    };
    const meta=gallery.querySelector(".s69-genre-label");
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrast=window.matchMedia("(prefers-contrast: more)");
    const pending=new Set();
    let previous="";

    function cancel(){
      for(const a of [...pending]) {
        try{a.cancel()}catch(_){}
      }
      pending.clear();
    }

    function animate(el,keyframes,options){
      if(!el || typeof el.animate!=="function") return;
      const a=el.animate(keyframes,{...options,fill:"none"});
      pending.add(a);
      a.addEventListener("finish",()=>pending.delete(a),{once:true});
      a.addEventListener("cancel",()=>pending.delete(a),{once:true});
    }

    function sync(){
      const key=sound.dataset.mood || "soul";
      if(!names[key]) return;
      meta.textContent=names[key];
      if(key===previous)return;
      previous=key;
      cancel();
      if(!sound.classList.contains("is-active") ||
        reduced.matches || contrast.matches || document.hidden)return;

      const panel=gallery.querySelector('.s69-panel[data-s69-mood="'+key+'"]');
      if(!panel)return;
      // Finite animated engraving: only the new SVG drawings.
      const shapes=[...panel.querySelectorAll(".s69-artline")].slice(0,23);
      shapes.forEach((shape,i)=>{
        if(typeof shape.getTotalLength!=="function")return;
        let length;
        try{length=shape.getTotalLength()}catch(_){return}
        if(!Number.isFinite(length)||length<15) return;
        const dash=Math.ceil(length)+2;
        animate(shape,[
          {strokeDasharray:dash+" "+dash,strokeDashoffset:dash,opacity:.12},
          {strokeDasharray:dash+" "+dash,strokeDashoffset:0,opacity:.8}
        ],{duration:850+Math.min(i,9)*55,delay:i*27,easing:"cubic-bezier(.16,.82,.22,1)"});
      });
      // Independent label only: don't modify original Sound title/transforms.
      const word=panel.querySelector(".s69-panel-word");
      animate(word,[
        {opacity:.12,clipPath:"inset(0 100% 0 0)"},
        {opacity:1,clipPath:"inset(0 0 0 0)"}
      ],{duration:800,delay:135,easing:"cubic-bezier(.16,1,.3,1)"});
      animate(meta,[{opacity:.25},{opacity:1}],{duration:430,easing:"ease-out"});
    }

    new MutationObserver(sync).observe(sound,{
      attributes:true,attributeFilter:["data-mood","class"]
    });
    reduced.addEventListener?.("change",()=>{if(reduced.matches)cancel()});
    contrast.addEventListener?.("change",()=>{if(contrast.matches)cancel()});
    document.addEventListener("visibilitychange",()=>{if(document.hidden)cancel()});
    sync();
  }

  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();
;


/* SOURCE assets/js/atmospheric-atlas-70.js */
/* STEP 70 — THE ATMOSPHERIC ATLAS
   Three original, responsive landscape illustrations inside the existing
   PLACES postcard. No photos, additional buttons, click interception,
   route changes or alterations to the Travel Journal.
   The original SVGs stay in place as a fallback if initialization fails.
*/
(() => {
  function init() {
    const atlas=document.querySelector(".p14-world");
    const postcard=atlas?.querySelector(".p14-postcard");
    const scenes=postcard?.querySelector(".p14-scenes");
    if(!atlas||!postcard||!scenes||atlas.dataset.s70Ready==="1")return;

    const art={
      soca:`
      <svg viewBox="0 0 800 680" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Stylized alpine valley with emerald river and layered mountains">
        <defs>
          <linearGradient id="s70-skys" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#a2c4b0"/><stop offset=".47" stop-color="#7dada1"/><stop offset="1" stop-color="#375d5a"/></linearGradient>
          <linearGradient id="s70-waters" x1="0" y1="0" x2="1" y2=".8"><stop stop-color="#c4f2cd"/><stop offset=".35" stop-color="#5cc9ae"/><stop offset="1" stop-color="#126b70"/></linearGradient>
          <linearGradient id="s70-shadowmount" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#4b8374"/><stop offset="1" stop-color="#244d49"/></linearGradient>
          <radialGradient id="s70-sunmist"><stop stop-color="#e8f4c8" stop-opacity=".77"/><stop offset="1" stop-color="#e8f4c8" stop-opacity="0"/></radialGradient>
        </defs>
        <rect width="800" height="680" fill="url(#s70-skys)"/>
        <circle cx="536" cy="129" r="226" fill="url(#s70-sunmist)"/>
        <path d="M0 312L91 230 150 258 273 105 375 225 445 176 559 292 652 171 733 235 800 206V680H0Z" fill="#b3c4ad"/>
        <path d="M0 326L91 230 150 258 273 105 375 225 445 176 559 292 652 171 733 235 800 206V680H0Z" fill="#6f938a" opacity=".48"/>
        <path d="M231 157L273 105 311 165 282 155 261 145 252 168ZM633 203L652 171 682 207 659 198Z" fill="#e7eee0" opacity=".74"/>
        <path d="M0 358L101 280 175 308 255 208 343 300 433 222 519 339 650 249 744 313 800 265V680H0Z" fill="#60897b"/>
        <path d="M0 403L150 317 258 365 385 266 495 361 610 291 729 346 800 321V680H0Z" fill="url(#s70-shadowmount)"/>
        <g class="s70-mist"><path d="M-35 342C166 307 270 356 419 335S683 308 839 342" stroke="#d4e7d4" stroke-width="24" stroke-linecap="round" opacity=".21" fill="none"/><path d="M-15 392C140 360 299 391 465 365S695 356 820 384" stroke="#c8dfc8" stroke-width="17" opacity=".13" fill="none"/></g>
        <path d="M0 464L119 395 253 429 333 352 453 443 567 389 689 432 800 392V680H0Z" fill="#2e6257"/>
        <path d="M0 521L149 456 271 503 384 409 534 503 668 446 800 497V680H0Z" fill="#214d48"/>
        <path d="M496 384C450 438 485 458 397 503S206 534 245 680H599C568 593 457 565 526 515S609 444 572 397Z" fill="#142e34" opacity=".37"/>
        <path d="M505 367C462 431 485 454 400 496S207 526 249 680H574C549 598 462 566 529 509S599 442 568 386Z" fill="url(#s70-waters)"/>
        <path d="M511 407C484 458 482 466 411 499S255 547 283 671" stroke="#c4ead2" stroke-width="7" opacity=".53" fill="none"/>
        <path d="M556 449C545 472 511 491 503 511S445 571 485 603" stroke="#d5f0dc" stroke-width="3" opacity=".46" fill="none"/>
        <g fill="#183e38">
          <path d="M17 505L35 398 6 446 25 438 0 483 24 473 8 524Z"/>
          <path d="M74 507L96 373 58 433 88 424 50 465 84 455 54 514Z"/>
          <path d="M140 538L162 413 125 467 153 461 119 502 152 488 128 541Z"/>
          <path d="M665 504L689 373 656 431 679 419 645 469 681 455 649 518Z"/>
          <path d="M722 554L750 400 712 465 740 448 705 498 734 492 698 556Z"/>
          <path d="M773 522L796 382 760 442 789 433 755 482 788 475 767 530Z"/>
        </g>
        <path d="M0 624C133 591 171 606 254 629L274 680H0Z" fill="#143d35"/>
        <path d="M575 621C670 584 730 605 800 573V680H579Z" fill="#153f3a"/>
        <g stroke="#bde8ce" stroke-width="1.2" fill="none" opacity=".22">
          <path d="M0 308L91 230 273 105 445 176 652 171 800 206"/>
          <path d="M0 357L101 280 255 208 433 222 650 249 800 265"/>
        </g>
      </svg>`,
      london:`
      <svg viewBox="0 0 800 680" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Atmospheric London skyline by the Thames at dusk">
        <defs>
          <linearGradient id="s70-skyl" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#6d627b"/><stop offset=".45" stop-color="#bc8497"/><stop offset="1" stop-color="#dbb2a4"/></linearGradient>
          <linearGradient id="s70-thames" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#58556e"/><stop offset="1" stop-color="#1c2b3d"/></linearGradient>
          <radialGradient id="s70-cityhaze"><stop stop-color="#f0d6c4" stop-opacity=".62"/><stop offset="1" stop-color="#f0d6c4" stop-opacity="0"/></radialGradient>
        </defs>
        <rect width="800" height="680" fill="url(#s70-skyl)"/>
        <circle cx="590" cy="219" r="270" fill="url(#s70-cityhaze)"/>
        <circle cx="595" cy="175" r="74" fill="#ead7c5" opacity=".54"/>
        <path d="M0 365L75 360 75 303 96 303 96 345 120 345 120 303 164 303 164 363 189 363 189 273 221 273 221 362 264 362 264 314 289 314 289 362 333 362 333 285 361 285 361 362 399 362 399 294 444 294 444 362 488 362 488 321 531 321 531 362 572 362 572 278 607 278 607 362 654 362 654 322 699 322 699 364 800 354V680H0Z" fill="#6b6778" opacity=".6"/>
        <g fill="#363949">
          <path d="M0 411V318H69V351H100V294H142V403H166V270H202V398H250V340H284V391H314V309H355V411Z"/>
          <path d="M311 400V254H319V234H327V195H337V171H342V153H347V171H352V195H362V234H370V254H378V405Z"/>
          <path d="M326 235H363M326 264H365M322 306H370" stroke="#8c8290" stroke-width="4"/>
          <circle cx="345" cy="285" r="18" fill="#d0b7a8"/>
          <circle cx="345" cy="285" r="12" fill="#56505d"/>
          <path d="M395 404V315H430V282H438V267H444V282H454V406Z"/>
          <path d="M474 411V282L493 251 512 282V406Z"/>
          <path d="M549 412V263H578V241H587V213H597V241H604V263H632V410Z"/>
          <path d="M662 408V300H722V342H752V289H800V411Z"/>
        </g>
        <path d="M0 420H800V680H0Z" fill="url(#s70-thames)"/>
        <path d="M0 428C105 424 209 438 302 425S540 438 800 428" fill="none" stroke="#e2b3a1" stroke-width="5" opacity=".3"/>
        <g class="s70-reflection" opacity=".65">
          <path d="M340 424L336 492 341 544 332 619 348 677M358 427L362 480 356 550 364 617" stroke="#e2b5a2" stroke-width="7" opacity=".32" fill="none"/>
          <path d="M589 430L592 475 583 521 596 569 588 640M493 430L488 470 495 511 489 565" stroke="#e5c2ac" stroke-width="5" opacity=".19" fill="none"/>
          <path d="M58 491H239M127 511H303M400 474H579M463 532H708M60 571H239M299 621H518M532 660H760" stroke="#c2adbb" stroke-width="2" opacity=".33" fill="none"/>
        </g>
        <g fill="none" stroke="#252e3d">
          <path d="M0 455H800" stroke-width="15"/>
          <path d="M0 447C160 450 190 411 305 419S527 457 800 438" stroke-width="11"/>
          <path d="M0 459V518M108 460V512M226 455V507M346 455V512M482 455V516M616 453V510M748 457V514" stroke-width="10"/>
          <path d="M0 469H800" stroke-width="3"/>
        </g>
        <g fill="#f2c8a5" opacity=".48">
          <rect x="18" y="343" width="7" height="11"/><rect x="43" y="343" width="7" height="11"/>
          <rect x="110" y="324" width="9" height="13"/><rect x="129" y="345" width="7" height="10"/>
          <rect x="185" y="310" width="8" height="16"/><rect x="207" y="342" width="8" height="14"/>
          <rect x="403" y="344" width="9" height="14"/><rect x="419" y="344" width="9" height="14"/>
          <rect x="553" y="300" width="7" height="12"/><rect x="612" y="310" width="8" height="14"/>
          <rect x="684" y="331" width="9" height="15"/><rect x="707" y="331" width="8" height="15"/>
        </g>
        <g stroke="#f6d4ca" opacity=".14" stroke-width="2">
          <path d="M50 0L-95 300M180 0L35 300M310 0L165 300M440 0L295 300M570 0L425 300M700 0L555 300M830 0L685 300"/>
        </g>
        <path d="M0 617Q144 599 291 618T594 611T800 623V680H0Z" fill="#172638" opacity=".7"/>
      </svg>`,
      kl:`
      <svg viewBox="0 0 800 680" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Kuala Lumpur skyline with twin towers, golden dusk and tropical silhouettes">
        <defs>
          <linearGradient id="s70-skyk" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#163d51"/><stop offset=".43" stop-color="#47777c"/><stop offset=".72" stop-color="#ce9170"/><stop offset="1" stop-color="#edb77f"/></linearGradient>
          <radialGradient id="s70-klhaze"><stop stop-color="#f4cd96" stop-opacity=".80"/><stop offset="1" stop-color="#f4cd96" stop-opacity="0"/></radialGradient>
          <linearGradient id="s70-glass" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#356677"/><stop offset="1" stop-color="#1d3a4b"/></linearGradient>
        </defs>
        <rect width="800" height="680" fill="url(#s70-skyk)"/>
        <g class="s70-atmosphere"><circle cx="561" cy="276" r="267" fill="url(#s70-klhaze)"/><circle cx="563" cy="204" r="88" fill="#f4c89d" opacity=".36"/></g>
        <path d="M0 420L85 385 149 403 218 378 307 418 398 393 503 416 602 388 691 415 800 387V680H0Z" fill="#4e6f6d" opacity=".35"/>
        <g fill="#274c58">
          <path d="M0 454V373H50V390H96V347H118V382H147V330H174V450Z"/>
          <path d="M175 450V325H204V309H227V443Z"/>
          <path d="M558 452V334H590V312H621V455Z"/>
          <path d="M642 452V379H682V332H713V351H752V314H800V454Z"/>
        </g>
        <g fill="url(#s70-glass)" stroke="#9ab3ae" stroke-width="2">
          <path d="M254 465V233H264V208H273V179H282V144H292V112H298V86H304V112H314V144H323V179H333V208H342V465Z"/>
          <path d="M388 465V233H398V208H407V179H416V144H426V112H432V86H438V112H448V144H457V179H467V208H476V465Z"/>
        </g>
        <g fill="none" stroke="#c7d5bd" stroke-width="2.4" opacity=".75">
          <path d="M253 258H342M253 288H342M253 316H342M253 344H342M253 372H342M253 400H342M253 428H342"/>
          <path d="M388 258H477M388 288H477M388 316H477M388 344H477M388 372H477M388 400H477M388 428H477"/>
          <path d="M263 231L333 231M398 231H467M292 140H304M426 140H438"/>
          <path d="M341 315Q364 298 388 315M341 329H388"/>
        </g>
        <path d="M521 456V259L547 222 573 259V456Z" fill="#294c5b" stroke="#9ab4a7" stroke-width="2"/>
        <path d="M547 223V174M532 281H561M534 308H559M536 335H557M537 365H559" fill="none" stroke="#c2cdb5" stroke-width="2"/>
        <path d="M0 479L69 453 128 469 176 455 238 469 311 451 386 477 467 449 544 472 600 452 667 473 737 452 800 471V680H0Z" fill="#183b46"/>
        <g fill="#f3d6a0" opacity=".57">
          <rect x="271" y="279" width="4" height="8"/><rect x="292" y="312" width="5" height="12"/><rect x="319" y="347" width="4" height="9"/>
          <rect x="408" y="278" width="4" height="8"/><rect x="430" y="312" width="5" height="12"/><rect x="458" y="347" width="4" height="9"/>
          <rect x="178" y="397" width="7" height="10"/><rect x="193" y="397" width="7" height="10"/>
          <rect x="567" y="397" width="6" height="11"/><rect x="672" y="391" width="8" height="11"/>
        </g>
        <path d="M0 514C151 482 244 536 378 501S601 506 800 487V680H0Z" fill="#15353d"/>
        <g fill="#0b2c34" opacity=".92">
          <path d="M0 680V0C28 76 58 145 75 217 42 179 17 162 0 151 48 198 77 247 100 302 47 280 17 276 0 263 52 335 92 398 102 461 63 426 29 419 0 417Z"/>
          <path d="M800 680V18C764 113 736 167 706 222 742 190 771 174 800 171 759 224 729 278 712 331 747 307 771 302 800 298 762 356 733 413 721 462 753 434 776 428 800 429Z"/>
          <path d="M85 680L110 509 77 553 108 534 65 606 103 584 76 652Z"/>
          <path d="M706 680L683 517 717 565 687 546 730 604 693 585 718 648Z"/>
        </g>
        <path d="M0 633C175 609 273 631 408 618S668 616 800 634V680H0Z" fill="#102d34"/>
      </svg>`
    };

    const keys=["soca","london","kl"];
    const fragment=document.createDocumentFragment();
    for (const key of keys) {
      const node=document.createElement("div");
      node.className="s70-worldview";
      node.dataset.s70Scene=key;
      node.setAttribute("aria-hidden","true");
      node.innerHTML=art[key];
      fragment.appendChild(node);
    }
    // The original image scenes stay as a fully intact fallback.
    scenes.appendChild(fragment);
    if (keys.some(key=>!scenes.querySelector('.s70-worldview[data-s70-scene="'+key+'"] svg'))) return;
    atlas.dataset.s70Ready="1";
    atlas.classList.add("s70-ready");

    const motion=window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrast=window.matchMedia("(prefers-contrast: more)");
    let previous="",isOpen=false;
    const canMove=()=>!motion.matches&&!contrast.matches&&!document.hidden;
    function sync() {
      const key=atlas.dataset.place||"soca";
      const open=atlas.classList.contains("is-active");
      if (!keys.includes(key)) return;
      if(!open){isOpen=false;return}
      if(key===previous&&isOpen)return;
      previous=key;isOpen=true;
      const panel=scenes.querySelector('.s70-worldview[data-s70-scene="'+key+'"]');
      if(!panel)return;
      for(const el of scenes.querySelectorAll(".s70-worldview"))el.classList.remove("s70-arriving");
      if(!canMove())return;
      // Restart only the finite scene-specific atmospheric motion.
      void panel.offsetWidth;
      panel.classList.add("s70-arriving");
    }
    new MutationObserver(sync).observe(atlas,{attributes:true,attributeFilter:["data-place","class"]});
    motion.addEventListener?.("change",()=>{if(motion.matches)scenes.querySelectorAll(".s70-arriving").forEach(x=>x.classList.remove("s70-arriving"))});
    sync();
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();
;


/* SOURCE assets/js/inner-worlds-71.js */
/* STEP 71 — ABOUT / THE INNER WORLDS
   Original vector identity systems for MAKE, LISTEN, WANDER.
   Adds only non-interactive art INSIDE the original card and editorial
   artwork. Existing a17/a18 controllers own selection, content and links.
   Entire feature remains dormant until both galleries mount successfully. */
(() => {
  function init() {
    const about=document.querySelector(".a17-world");
    const card=about?.querySelector(".a17-card");
    const cardArt=card?.querySelector(".a17-card-art");
    const plate=about?.querySelector(".a18-visual");
    const oldPlateArt=plate?.querySelector(".a18-art");
    if(!about||!card||!cardArt||!plate||!oldPlateArt||about.dataset.s71Ready==="1")return;

    const makeHero=`
      <svg viewBox="0 0 600 690" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><linearGradient id="s71-hm-base" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f5dfb9"/><stop offset="1" stop-color="#b4bba9"/></linearGradient></defs>
        <rect width="600" height="690" fill="url(#s71-hm-base)"/>
        <g stroke="#254b46" stroke-width=".9" opacity=".23">
          <path d="M0 80H600M0 140H600M0 200H600M0 260H600M0 320H600M0 380H600M0 440H600M0 500H600M0 560H600M0 620H600"/>
          <path d="M70 0V690M140 0V690M210 0V690M280 0V690M350 0V690M420 0V690M490 0V690M560 0V690"/>
        </g>
        <g fill="none" stroke="#2b5146" stroke-width="2" opacity=".85">
          <rect x="108" y="161" width="353" height="345"/>
          <rect x="130" y="183" width="309" height="301"/>
          <path d="M130 248H439M130 416H439M213 183V484"/>
          <path d="M78 110H129M104 85V136M467 529H520M493 503V555"/>
        </g>
        <g fill="#395c50" opacity=".22">
          <rect x="213" y="248" width="226" height="168"/>
          <rect x="130" y="183" width="309" height="65" fill="#f4e4cb"/>
        </g>
        <path d="M230 390C289 322 320 361 375 278" fill="none" stroke="#b66c5b" stroke-width="10" stroke-linecap="round"/>
        <g fill="#ba705e"><circle cx="230" cy="390" r="9"/><circle cx="302" cy="345" r="9"/><circle cx="375" cy="278" r="9"/></g>
        <g stroke="#27493f" stroke-width="2" fill="none"><path d="M88 575H499M89 589H340M89 603H428"/></g>
        <path d="M106 151L133 123M463 519L494 487" stroke="#b56a53" stroke-width="3"/>
      </svg>`;
    const listenHero=`
      <svg viewBox="0 0 600 690" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><radialGradient id="s71-hl-haze"><stop stop-color="#b2a0dc" stop-opacity=".64"/><stop offset="1" stop-color="#6e719f" stop-opacity="0"/></radialGradient></defs>
        <rect width="600" height="690" fill="#c1bed5"/>
        <circle cx="314" cy="329" r="277" fill="url(#s71-hl-haze)"/>
        <g fill="none" stroke="#303954" opacity=".65">
          <circle cx="309" cy="323" r="230" stroke-width="2"/>
          <circle cx="309" cy="323" r="205" stroke-width="1.4"/>
          <circle cx="309" cy="323" r="177" stroke-width="2"/>
          <circle cx="309" cy="323" r="151" stroke-width=".8"/>
          <circle cx="309" cy="323" r="117" stroke-width="2"/>
          <circle cx="309" cy="323" r="83" stroke-width="1.5"/>
          <circle cx="309" cy="323" r="48" stroke-width="2.5"/>
        </g>
        <path d="M12 513C71 467 94 554 156 514S248 472 296 511S389 554 442 509S525 479 589 504" fill="none" stroke="#8b638f" stroke-width="11" opacity=".76"/>
        <path d="M12 542C71 496 94 583 156 543S248 501 296 540S389 583 442 538S525 508 589 533" fill="none" stroke="#eadce1" stroke-width="3" opacity=".78"/>
        <g fill="#313953" opacity=".3"><path d="M0 615V586H15V612H29V570H43V619H56V550H71V614H86V568H100V616H114V548H128V613H142V587H156V624H171V554H185V621H198V572H213V625H228V544H242V622H255V572H269V620H285V556H300V617H315V577H330V619H345V555H360V614H377V574H391V616H409V562H424V613H440V580H456V618H471V564H486V618H500V580H514V613H528V568H542V616H557V583H573V619H600V690H0Z"/></g>
        <circle cx="309" cy="323" r="14" fill="#a76799"/>
        <path d="M72 85H216M72 99H164M405 82H532M444 96H532" stroke="#45516e" stroke-width="2" opacity=".5"/>
      </svg>`;
    const wanderHero=`
      <svg viewBox="0 0 600 690" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><linearGradient id="s71-hw-sky" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#dce9d2"/><stop offset=".65" stop-color="#a5c5b6"/><stop offset="1" stop-color="#78a798"/></linearGradient></defs>
        <rect width="600" height="690" fill="url(#s71-hw-sky)"/>
        <circle cx="421" cy="197" r="101" fill="#f4e7ba" opacity=".82"/>
        <path d="M0 401L99 301 161 341 280 190 389 317 465 252 600 365V690H0Z" fill="#8fb2a4"/>
        <path d="M0 432L148 290 231 376 361 259 467 369 600 307V690H0Z" fill="#5e9385"/>
        <path d="M0 508L101 401 188 445 290 358 408 451 511 382 600 433V690H0Z" fill="#366e63"/>
        <g fill="none" stroke="#eff1d9" stroke-width="1.5" opacity=".55">
          <path d="M-34 409Q128 216 289 391T643 338"/>
          <path d="M-20 435Q128 246 289 414T643 368"/>
          <path d="M-20 461Q128 276 289 444T643 398"/>
          <path d="M-20 487Q128 310 289 474T643 430"/>
          <path d="M-20 513Q128 346 289 504T643 460"/>
        </g>
        <path d="M49 656C190 544 227 614 333 489S442 322 549 272" fill="none" stroke="#e4e9c5" stroke-width="7" stroke-linecap="round" stroke-dasharray="3 16"/>
        <circle cx="549" cy="272" r="12" fill="#f4e5bc" stroke="#24584e" stroke-width="4"/>
        <path d="M0 599L121 546 218 581 305 524 431 595 531 546 600 572V690H0Z" fill="#224f4b"/>
        <g stroke="#d9f1d4" stroke-width="1.3" opacity=".4" fill="none">
          <path d="M43 122H180M43 136H128M454 490H575M482 502H575"/>
        </g>
      </svg>`;
    const makePlate=`
      <svg viewBox="0 0 600 750" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><linearGradient id="s71-pm-base" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f0d7b6"/><stop offset="1" stop-color="#b3bca8"/></linearGradient></defs>
        <rect width="600" height="750" fill="url(#s71-pm-base)"/>
        <g stroke="#2b4d46" stroke-width="1" opacity=".17">
          <path d="M0 75H600M0 150H600M0 225H600M0 300H600M0 375H600M0 450H600M0 525H600M0 600H600M0 675H600"/>
          <path d="M75 0V750M150 0V750M225 0V750M300 0V750M375 0V750M450 0V750M525 0V750"/>
        </g>
        <rect x="69" y="113" width="441" height="474" fill="#324f46"/>
        <rect x="95" y="138" width="391" height="421" fill="#e4cfb0"/>
        <rect x="95" y="138" width="391" height="83" fill="#c1bba5"/>
        <rect x="122" y="160" width="47" height="14" fill="#3c6b58"/>
        <rect x="181" y="160" width="76" height="14" fill="#6e8a74"/>
        <rect x="411" y="160" width="48" height="14" fill="#ad6851"/>
        <rect x="122" y="262" width="140" height="236" fill="#d5b29b"/>
        <rect x="285" y="262" width="174" height="110" fill="#628b7b"/>
        <path d="M285 498L350 403 385 450 425 390 459 498Z" fill="#385b50"/>
        <g fill="none" stroke="#f5e8ca" stroke-width="2">
          <path d="M313 349C360 278 390 314 428 285"/>
          <path d="M120 278H239M120 300H218M120 322H235"/>
          <rect x="310" y="400" width="114" height="73"/>
        </g>
        <circle cx="354" cy="304" r="19" fill="#dfb38f"/>
        <g fill="none" stroke="#2b534a" stroke-width="2">
          <path d="M47 88H112M80 55V120M492 609H552M522 577V642"/>
          <path d="M96 595H511M96 614H381M96 630H462"/>
        </g>
        <circle cx="480" cy="108" r="43" fill="#a46e60" opacity=".55"/>
      </svg>`;
    const listenPlate=`
      <svg viewBox="0 0 600 750" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><radialGradient id="s71-pl-bg"><stop stop-color="#dfc9e3"/><stop offset="1" stop-color="#8c94bb"/></radialGradient></defs>
        <rect width="600" height="750" fill="url(#s71-pl-bg)"/>
        <g fill="none" stroke="#222f4d">
          <circle cx="311" cy="331" r="250" stroke-width="2"/>
          <circle cx="311" cy="331" r="227" stroke-width="1"/>
          <circle cx="311" cy="331" r="205" stroke-width="2"/>
          <circle cx="311" cy="331" r="180" stroke-width=".9"/>
          <circle cx="311" cy="331" r="150" stroke-width="2.5"/>
          <circle cx="311" cy="331" r="117" stroke-width=".9"/>
          <circle cx="311" cy="331" r="87" stroke-width="2"/>
        </g>
        <circle cx="311" cy="331" r="61" fill="#34445e"/>
        <circle cx="311" cy="331" r="44" fill="#dfc4d0"/>
        <circle cx="311" cy="331" r="12" fill="#34445e"/>
        <path d="M0 541Q49 460 96 536T197 532T301 540T409 536T513 538T608 526" fill="none" stroke="#ad689e" stroke-width="17" opacity=".65"/>
        <path d="M0 561Q49 479 96 558T197 556T301 560T409 556T513 558T608 547" fill="none" stroke="#f7e8dc" stroke-width="4" opacity=".66"/>
        <g fill="#36485b" opacity=".35">
          <path d="M0 683V625H16V668H30V600H45V680H60V586H75V664H90V612H105V681H120V568H136V673H152V613H168V673H184V581H199V676H215V610H231V685H247V566H262V675H278V607H294V676H310V574H325V682H341V615H357V665H373V572H388V679H404V623H420V680H435V591H452V666H467V612H484V678H499V584H516V674H531V618H547V665H563V589H580V680H600V750H0Z"/>
        </g>
        <path d="M65 106H221M65 123H165M444 92H554M473 110H554" stroke="#293c55" stroke-width="2" opacity=".43"/>
      </svg>`;
    const wanderPlate=`
      <svg viewBox="0 0 600 750" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><linearGradient id="s71-pw-grad" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#e2eace"/><stop offset=".62" stop-color="#a7c6b3"/><stop offset="1" stop-color="#608f81"/></linearGradient></defs>
        <rect width="600" height="750" fill="url(#s71-pw-grad)"/>
        <circle cx="456" cy="178" r="113" fill="#fff1c0" opacity=".6"/>
        <path d="M-30 361L91 258 173 300 307 143 429 286 506 231 640 362V750H0Z" fill="#a9c0ae"/>
        <path d="M-30 414L117 287 215 377 346 230 459 353 560 295 640 359V750H0Z" fill="#6b9d8e"/>
        <path d="M-30 482L92 386 209 442 310 334 440 445 543 384 640 456V750H0Z" fill="#356f61"/>
        <g fill="none" stroke="#ebf5d8" stroke-width="2" opacity=".52">
          <path d="M-50 352Q86 189 225 329T649 304"/>
          <path d="M-50 385Q86 230 225 360T649 335"/>
          <path d="M-50 418Q86 268 225 392T649 367"/>
          <path d="M-50 451Q86 309 225 424T649 398"/>
          <path d="M-50 484Q86 351 225 456T649 430"/>
          <path d="M-50 517Q86 391 225 488T649 463"/>
          <path d="M-50 550Q86 430 225 522T649 497"/>
        </g>
        <path d="M0 595L118 524 238 583 341 496 466 572 600 535V750H0Z" fill="#184a45"/>
        <path d="M92 716C195 605 242 671 317 559S453 363 520 346" fill="none" stroke="#e6ecc9" stroke-width="7" stroke-dasharray="4 17" stroke-linecap="round"/>
        <g fill="#fae4b6" stroke="#21584b" stroke-width="4">
          <circle cx="92" cy="716" r="11"/><circle cx="520" cy="346" r="12"/>
        </g>
        <path d="M44 111H169M44 129H119M445 581H560M474 600H560" fill="none" stroke="#2a574e" stroke-width="2" opacity=".55"/>
      </svg>`;

    const heroArt={make:makeHero,listen:listenHero,wander:wanderHero};
    const plateArt={make:makePlate,listen:listenPlate,wander:wanderPlate};
    const names={
      make:["DESIGN STUDY / 01","FORM FOLLOWS FEELING"],
      listen:["SOUND STUDY / 02","FEEL THE FREQUENCY"],
      wander:["FIELD STUDY / 03","CURIOSITY IN MOTION"]
    };
    const hero=document.createElement("div");
    hero.className="s71-hero-worlds";
    hero.setAttribute("aria-hidden","true");
    const gallery=document.createElement("div");
    gallery.className="s71-plate-worlds";
    gallery.setAttribute("aria-hidden","true");
    for(const key of ["make","listen","wander"]){
      const a=document.createElement("div");
      a.className="s71-hero-scene";
      a.dataset.s71Scene=key;
      a.innerHTML=heroArt[key];
      hero.appendChild(a);
      const b=document.createElement("div");
      b.className="s71-plate-scene";
      b.dataset.s71Scene=key;
      b.innerHTML=plateArt[key];
      gallery.appendChild(b);
    }
    const legend=document.createElement("div");
    legend.className="s71-hero-legend";
    legend.setAttribute("aria-hidden","true");
    legend.innerHTML='<span data-s71-legend-a></span><span data-s71-legend-b></span>';
    card.insertBefore(hero,cardArt);
    card.appendChild(legend);
    plate.insertBefore(gallery,oldPlateArt);
    if(hero.querySelectorAll(".s71-hero-scene svg").length!==3 ||
       gallery.querySelectorAll(".s71-plate-scene svg").length!==3)return;

    about.classList.add("s71-ready");
    about.dataset.s71Ready="1";
    const reduce=window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrast=window.matchMedia("(prefers-contrast: more)");
    let prevHero="",prevPlate="",wasOpen=false;
    const activeAnimations=new Set();
    const stop=()=>{
      for(const a of [...activeAnimations]){try{a.cancel()}catch(_){}}
      activeAnimations.clear();
    };
    function animateShape(node,frames,opt){
      const a=node.animate(frames,{...opt,fill:"none"});
      activeAnimations.add(a);
      a.addEventListener("finish",()=>activeAnimations.delete(a),{once:true});
      a.addEventListener("cancel",()=>activeAnimations.delete(a),{once:true});
    }
    function draw(panel) {
      if(!panel || reduce.matches || contrast.matches || document.hidden ||
         typeof Element.prototype.animate!=="function")return;
      const shapes=[...panel.querySelectorAll("path,circle,rect,polyline")];
      let i=0;
      for(const shape of shapes) {
        if(i>=13 || typeof shape.getTotalLength!=="function")break;
        let length=0;
        try{length=shape.getTotalLength()}catch(_){continue}
        if(!Number.isFinite(length)||length<45)continue;
        const color=getComputedStyle(shape).stroke;
        if(!color||color==="none")continue;
        const n=Math.ceil(length)+2;
        animateShape(shape,[
          {strokeDasharray:n+" "+n,strokeDashoffset:n,opacity:.3},
          {strokeDasharray:n+" "+n,strokeDashoffset:0,opacity:1}
        ],{
          duration:730+Math.min(i,8)*40,delay:i*39,
          easing:"cubic-bezier(.18,.84,.25,1)"
        });
        i++;
      }
    }
    function sync() {
      const open=about.classList.contains("is-active");
      if(!open){wasOpen=false;stop();return}
      const key=about.dataset.mode||"make";
      const lower=plate.dataset.scene||"make";
      const firstOpen=!wasOpen;
      wasOpen=true;
      if(names[key]){
        legend.querySelector("[data-s71-legend-a]").textContent=names[key][0];
        legend.querySelector("[data-s71-legend-b]").textContent=names[key][1];
        if(firstOpen || prevHero!==key) {
          prevHero=key;
          stop();
          draw(hero.querySelector('.s71-hero-scene[data-s71-scene="'+key+'"]'));
        }
      }
      if(["make","listen","wander"].includes(lower) && (firstOpen||prevPlate!==lower)){
        prevPlate=lower;
        // The second editorial card can be far below the viewport:
        // it already crossfades through CSS, so don't animate hidden art.
        const box=plate.getBoundingClientRect();
        const viewer=about.getBoundingClientRect();
        if(box.top<viewer.bottom && box.bottom>viewer.top)
          draw(gallery.querySelector('.s71-plate-scene[data-s71-scene="'+lower+'"]'));
      }
    }
    new MutationObserver(sync).observe(about,{
      attributes:true,attributeFilter:["class","data-mode"]
    });
    new MutationObserver(sync).observe(plate,{
      attributes:true,attributeFilter:["data-scene"]
    });
    reduce.addEventListener?.("change",()=>{if(reduce.matches)stop()});
    contrast.addEventListener?.("change",()=>{if(contrast.matches)stop()});
    document.addEventListener("visibilitychange",()=>{if(document.hidden)stop()});
    sync();
  }
  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();
;


/* SOURCE assets/js/four-living-covers-72.js */
/* STEP 72 — FOUR LIVING COVERS
   Original illustrative posters, mounted INSIDE the existing home art.
   The original GSAP stage / world links / chapter gate remain in charge.
   Four finite vector ink animations; no perpetual animation loops.
*/
(() => {
  function init() {
    const hub=document.querySelector(".world-hub");
    const stage=hub?.querySelector(".world-stage");
    const sheet=stage?.querySelector(".stage-sheet");
    const board=sheet?.querySelector(".s22-art");
    if(!hub||!stage||!sheet||!board||hub.dataset.s72Ready==="1")return;

    const arts={
      work:`
        <svg viewBox="0 0 600 660" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="s72-w-paper" x1="0" y1="0" x2="1" y2="1">
              <stop stop-color="#efe2c8"/><stop offset="1" stop-color="#baada0"/>
            </linearGradient>
            <linearGradient id="s72-w-screen" x1="0" y1="0" x2="1" y2="1">
              <stop stop-color="#5c8179"/><stop offset="1" stop-color="#263e39"/>
            </linearGradient>
          </defs>
          <rect width="600" height="660" fill="url(#s72-w-paper)"/>
          <g stroke="#597064" stroke-width=".9" opacity=".2">
            <path d="M0 55H600M0 110H600M0 165H600M0 220H600M0 275H600M0 330H600M0 385H600M0 440H600M0 495H600M0 550H600M0 605H600"/>
            <path d="M55 0V660M110 0V660M165 0V660M220 0V660M275 0V660M330 0V660M385 0V660M440 0V660M495 0V660M550 0V660"/>
          </g>
          <g transform="translate(40 52) rotate(-5 250 300)">
            <rect x="70" y="51" width="368" height="471" fill="#d3bb9e" stroke="#2e534b" stroke-width="4"/>
            <rect x="93" y="75" width="368" height="471" fill="#415e57" stroke="#24443e" stroke-width="3"/>
            <rect x="111" y="94" width="332" height="434" fill="#eee0c9"/>
            <rect x="111" y="94" width="332" height="57" fill="#c4d4c1"/>
            <rect x="130" y="113" width="19" height="19" rx="9" fill="#a66e5c"/>
            <rect x="157" y="113" width="19" height="19" rx="9" fill="#d7aa82"/>
            <rect x="184" y="113" width="19" height="19" rx="9" fill="#416c60"/>
            <rect x="130" y="178" width="295" height="160" fill="url(#s72-w-screen)"/>
            <path d="M130 321L197 253 239 293 298 199 368 287 425 237V338H130Z" fill="#92af97"/>
            <circle cx="355" cy="224" r="23" fill="#ebc18c"/>
            <rect x="130" y="366" width="149" height="13" fill="#395c50"/>
            <rect x="130" y="393" width="285" height="6" fill="#83938a"/>
            <rect x="130" y="409" width="245" height="6" fill="#83938a"/>
            <rect x="130" y="425" width="268" height="6" fill="#83938a"/>
            <rect x="130" y="465" width="133" height="35" rx="17" fill="#a16a55"/>
            <path class="s72-draw" d="M112 153H440M282 346V509" fill="none" stroke="#d19b79" stroke-width="3"/>
          </g>
          <g fill="none" stroke="#355b51">
            <path class="s72-draw" d="M41 80H100M71 50V110M488 563H550M519 532V595" stroke-width="3"/>
            <path class="s72-draw" d="M19 617H578M19 629H432" stroke-width="1.6" opacity=".5"/>
          </g>
          <circle cx="512" cy="101" r="48" fill="none" stroke="#9b6c59" stroke-width="2" opacity=".6"/>
          <circle cx="512" cy="101" r="35" fill="#c8906a" opacity=".2"/>
        </svg>`,
      sound:`
        <svg viewBox="0 0 600 660" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="s72-s-bg" x1="0" y1="0" x2="1" y2="1">
              <stop stop-color="#aabfad"/><stop offset=".6" stop-color="#6a9683"/><stop offset="1" stop-color="#41685c"/>
            </linearGradient>
            <radialGradient id="s72-s-vinyl">
              <stop stop-color="#4a5d55"/><stop offset=".32" stop-color="#202e2b"/>
              <stop offset=".8" stop-color="#192a28"/><stop offset="1" stop-color="#617c68"/>
            </radialGradient>
          </defs>
          <rect width="600" height="660" fill="url(#s72-s-bg)"/>
          <path d="M-50 98L640 398M-20 68L670 368M-40 128L650 428" stroke="#dce9d1" stroke-width="1" opacity=".3"/>
          <rect x="46" y="62" width="508" height="526" rx="1" fill="none" stroke="#e3ead8" stroke-width="1.4" opacity=".75"/>
          <circle cx="297" cy="309" r="227" fill="url(#s72-s-vinyl)" stroke="#233d34" stroke-width="3"/>
          <g class="s72-draw" fill="none" stroke="#c6d8bb" opacity=".55">
            <circle cx="297" cy="309" r="212" stroke-width="1.2"/>
            <circle cx="297" cy="309" r="199" stroke-width="1.1"/>
            <circle cx="297" cy="309" r="187" stroke-width=".7"/>
            <circle cx="297" cy="309" r="167" stroke-width=".9"/>
            <circle cx="297" cy="309" r="153" stroke-width=".7"/>
            <circle cx="297" cy="309" r="132" stroke-width=".95"/>
            <circle cx="297" cy="309" r="116" stroke-width=".75"/>
          </g>
          <circle cx="297" cy="309" r="80" fill="#c3ba9f"/>
          <circle cx="297" cy="309" r="63" fill="#9c8f8d"/>
          <circle cx="297" cy="309" r="46" fill="#e2d5b9"/>
          <path class="s72-draw" d="M262 312H331M296 278V344" fill="none" stroke="#304e45" stroke-width="2"/>
          <circle cx="297" cy="309" r="12" fill="#1c3630"/>
          <path d="M558 83V198L392 353" fill="none" stroke="#304c45" stroke-width="16" stroke-linecap="round"/>
          <path d="M558 83V198L392 353" fill="none" stroke="#e6ead9" stroke-width="5" stroke-linecap="round"/>
          <rect x="371" y="333" width="45" height="22" fill="#ba8977" transform="rotate(-43 392 343)"/>
          <path class="s72-draw" d="M50 580V557M66 580V543M82 580V561M98 580V522M114 580V540M130 580V558M146 580V514M162 580V544M178 580V522M194 580V561M210 580V529M226 580V547M242 580V508M258 580V530M274 580V555M290 580V510M306 580V544M322 580V521M338 580V550M354 580V516M370 580V535M386 580V560M402 580V520M418 580V542M434 580V553M450 580V518M466 580V544M482 580V531M498 580V562M514 580V541M530 580V552" fill="none" stroke="#e1ecdd" stroke-width="5"/>
          <path d="M53 607H547" stroke="#1c3932" stroke-width="3"/>
        </svg>`,
      places:`
        <svg viewBox="0 0 600 660" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="s72-p-sky" x1="0" y1="0" x2="0" y2="1">
              <stop stop-color="#c8dbd0"/><stop offset=".6" stop-color="#8caeaf"/><stop offset="1" stop-color="#587e8d"/>
            </linearGradient>
            <linearGradient id="s72-p-river" x1="0" y1="0" x2=".9" y2="1">
              <stop stop-color="#d8e9d4"/><stop offset=".5" stop-color="#77c0b7"/><stop offset="1" stop-color="#387c81"/>
            </linearGradient>
          </defs>
          <rect width="600" height="660" fill="url(#s72-p-sky)"/>
          <circle cx="444" cy="146" r="105" fill="#f8e3be" opacity=".8"/>
          <path d="M0 334L84 266 164 303 287 121 386 243 450 194 600 303V660H0Z" fill="#a0bdb1"/>
          <path d="M0 371L107 281 203 359 303 216 418 352 516 273 600 340V660H0Z" fill="#618f8c"/>
          <path d="M0 428L109 351 210 396 335 280 448 385 535 348 600 391V660H0Z" fill="#3d7273"/>
          <g stroke="#e0e9db" stroke-width="2" opacity=".56" fill="none">
            <path class="s72-draw" d="M-27 330Q111 179 218 326T618 288"/>
            <path class="s72-draw" d="M-24 352Q111 211 218 352T618 313"/>
            <path class="s72-draw" d="M-24 374Q111 242 218 377T618 340"/>
            <path class="s72-draw" d="M-24 396Q111 273 218 403T618 365"/>
            <path class="s72-draw" d="M-24 418Q111 303 218 429T618 392"/>
          </g>
          <path d="M0 486L149 429 258 497 359 395 484 481 600 420V660H0Z" fill="#245956"/>
          <path d="M393 372C359 425 415 460 325 497S157 549 204 660H476C469 577 380 562 431 505S489 424 450 379Z" fill="#183e49" opacity=".4"/>
          <path d="M393 370C360 424 414 457 325 489S159 539 201 660H457C449 584 372 558 426 498S480 426 449 385Z" fill="url(#s72-p-river)"/>
          <path class="s72-draw" d="M398 402Q388 460 328 494T212 642" fill="none" stroke="#e1f3df" stroke-width="7" opacity=".66"/>
          <g fill="#173f3d">
            <path d="M24 534L57 347 20 423 47 407 11 473 49 452 19 540Z"/>
            <path d="M86 553L122 385 81 450 111 430 77 508 112 479 81 564Z"/>
            <path d="M483 534L514 351 480 421 507 407 473 477 509 458 478 550Z"/>
            <path d="M540 567L572 375 536 456 564 437 532 514 565 491 533 573Z"/>
          </g>
          <path class="s72-draw" d="M68 570C166 511 224 567 306 481S442 314 511 245" fill="none" stroke="#f2e9c5" stroke-width="3" stroke-dasharray="6 12"/>
          <circle cx="511" cy="245" r="13" fill="#fff2cc" stroke="#2b6962" stroke-width="5"/>
        </svg>`,
      about:`
        <svg viewBox="0 0 600 660" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="s72-a-bg" x1="0" y1="0" x2="1" y2="1">
              <stop stop-color="#e3c4b2"/><stop offset=".58" stop-color="#c99fa0"/><stop offset="1" stop-color="#a78d9f"/>
            </linearGradient>
            <radialGradient id="s72-a-glow"><stop stop-color="#f6e3ca" stop-opacity=".68"/><stop offset="1" stop-color="#f6e3ca" stop-opacity="0"/></radialGradient>
          </defs>
          <rect width="600" height="660" fill="url(#s72-a-bg)"/>
          <circle cx="314" cy="306" r="297" fill="url(#s72-a-glow)"/>
          <g fill="none" stroke="#5c4553" stroke-width="2">
            <circle cx="296" cy="299" r="222"/>
            <circle cx="296" cy="299" r="188" stroke-width=".8"/>
            <ellipse class="s72-draw" cx="296" cy="299" rx="245" ry="100" transform="rotate(-26 296 299)" stroke="#754958" stroke-width="3"/>
            <ellipse class="s72-draw" cx="296" cy="299" rx="119" ry="246" transform="rotate(24 296 299)" stroke="#764d5d" stroke-width="2"/>
            <ellipse class="s72-draw" cx="296" cy="299" rx="195" ry="72" transform="rotate(43 296 299)" stroke="#9f6470" stroke-width="1.5"/>
          </g>
          <path d="M102 250L197 156 330 178 445 111 512 246 473 407 342 494 177 445Z" fill="#9b6d77" opacity=".13"/>
          <g fill="#694851" opacity=".84" font-family="Georgia,serif" font-style="italic">
            <text x="155" y="375" font-size="216">L</text>
            <text x="291" y="401" font-size="208">M</text>
          </g>
          <circle cx="313" cy="303" r="15" fill="#f0cba9" stroke="#7f5d62" stroke-width="4"/>
          <path class="s72-draw" d="M40 130H128M82 86V174M470 480H553M511 438V522M45 554H554" fill="none" stroke="#755861" stroke-width="3"/>
          <g fill="none" stroke="#f3ddc4" stroke-width="1" opacity=".7">
            <path d="M60 57L534 531M62 518L529 70"/>
            <circle cx="296" cy="299" r="119"/>
          </g>
        </svg>`
    };
    const keys=["work","sound","places","about"];
    const labels={
      work:"FIELD / 01",
      sound:"FREQUENCY / 02",
      places:"ATLAS / 03",
      about:"IDENTITY / 04"
    };
    const wrapper=document.createDocumentFragment();
    for(const key of keys) {
      const panel=document.createElement("div");
      panel.className="s72-scene";
      panel.dataset.s72Scene=key;
      panel.setAttribute("aria-hidden","true");
      panel.innerHTML=arts[key];
      const code=document.createElement("span");
      code.className="s72-poster-code";
      code.textContent=labels[key];
      panel.appendChild(code);
      const mark=document.createElement("span");
      mark.className="s72-poster-mark";
      for(let i=0;i<4;i++){
        const tick=document.createElement("i");
        if(keys.indexOf(key)===i)tick.className="is-s72-lit";
        mark.appendChild(tick);
      }
      panel.appendChild(mark);
      wrapper.appendChild(panel);
    }
    board.appendChild(wrapper);
    if(board.querySelectorAll(":scope > .s72-scene svg").length!==4)return;
    const aura=document.createElement("span");
    aura.className="s72-aura";
    aura.setAttribute("aria-hidden","true");
    stage.prepend(aura);
    hub.dataset.s72Ready="1";
    hub.classList.add("s72-ready");

    const motion=window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrast=window.matchMedia("(prefers-contrast: more)");
    let previous="";
    const running=new Set();
    function cancel(){
      for(const a of [...running]){try{a.cancel()}catch(_){}}
      running.clear();
    }
    function draw(key) {
      if(motion.matches||contrast.matches||document.hidden||typeof Element.prototype.animate!=="function")return;
      const panel=board.querySelector('.s72-scene[data-s72-scene="'+key+'"]');
      if(!panel)return;
      const shapes=[...panel.querySelectorAll(".s72-draw")].flatMap(node=>
        node.matches("g")?[...node.querySelectorAll("path,circle,ellipse,rect")]:[node]
      ).slice(0,18);
      shapes.forEach((node,i)=>{
        if(typeof node.getTotalLength!=="function")return;
        let length=0;
        try{length=node.getTotalLength()}catch(_){return}
        if(!Number.isFinite(length)||length<12)return;
        const dash=Math.ceil(length)+2;
        const animation=node.animate([
          {strokeDasharray:dash+" "+dash,strokeDashoffset:dash,opacity:.20},
          {strokeDasharray:dash+" "+dash,strokeDashoffset:0,opacity:1}
        ],{
          duration:780+Math.min(i,9)*45,
          delay:Math.min(i*40,380),
          easing:"cubic-bezier(.18,.84,.24,1)",
          fill:"none"
        });
        running.add(animation);
        for(const event of ["finish","cancel"]){
          animation.addEventListener(event,()=>running.delete(animation),{once:true});
        }
      });
    }
    function sync(){
      const raw=hub.dataset.s22Scene||hub.dataset.s40Scene||"work";
      const key=keys.includes(raw)?raw:"work";
      if(key===previous)return;
      previous=key;
      cancel();
      draw(key);
    }
    new MutationObserver(sync).observe(hub,{
      attributes:true,attributeFilter:["data-s22-scene","data-s40-scene"]
    });
    motion.addEventListener?.("change",()=>{if(motion.matches)cancel()});
    contrast.addEventListener?.("change",()=>{if(contrast.matches)cancel()});
    document.addEventListener("visibilitychange",()=>{if(document.hidden)cancel()});
    sync();
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();
;

/* STEP 75 — CONTINUOUS ATLAS SOURCE */
/* STEP 75 — CONTINUOUS ATLAS
   Reuse the *existing* STEP 70 illustrations inside the Travel Journal.
   No external media, altered routes, focus handlers, controls, or photos.
   All original SVGs and photographic IMG elements stay available. */
(() => {
  function init() {
    const atlas=document.querySelector(".p14-world");
    const journal=document.querySelector(".p15-journal");
    const hero=journal?.querySelector(".p15-hero-visual");
    const first=journal?.querySelector(".p15-shot-a .p15-fallback");
    const second=journal?.querySelector(".p15-shot-b .p15-fallback");
    const heroFigure=journal?.querySelector(".p15-hero-figure");
    if(!atlas?.classList.contains("s70-ready") ||
       !journal || !hero || !first || !second || !heroFigure ||
       journal.dataset.s75Ready==="1") return;

    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
    const places=new Set(["soca","london","kl"]);
    const imageTargets=[
      {node:hero,slot:"hero"},
      {node:first,slot:"a"},
      {node:second,slot:"b"}
    ];
    function replaceReferences(svg,prefix) {
      const ids=new Map();
      svg.querySelectorAll("[id]").forEach(node=>{
        const previous=node.id;
        const next=prefix+previous;
        ids.set(previous,next);
        node.id=next;
      });
      if(!ids.size)return;
      const elements=[svg,...svg.querySelectorAll("*")];
      for(const node of elements){
        for(const attr of [...node.attributes]){
          let value=attr.value;
          value=value.replace(/url\(#([^)]+)\)/g,(full,key)=>
            ids.has(key)?"url(#"+ids.get(key)+")":full
          );
          if((attr.name==="href"||attr.name==="xlink:href")&&value.startsWith("#")){
            const key=value.slice(1);
            if(ids.has(key))value="#"+ids.get(key);
          }
          if(value!==attr.value)node.setAttribute(attr.name,value);
        }
      }
    }
    function cloneIllustration(key,slot) {
      const source=atlas.querySelector(
        '.s70-worldview[data-s70-scene="'+key+'"] svg'
      );
      if(!source)return null;
      const svg=source.cloneNode(true);
      svg.setAttribute("aria-hidden","true");
      svg.removeAttribute("role");
      svg.removeAttribute("aria-label");
      svg.removeAttribute("style");
      replaceReferences(svg,"s75-"+key+"-"+slot+"-");
      return svg;
    }

    let last="";
    function sync(){
      const key=journal.dataset.place||"soca";
      if(!places.has(key))return;
      // Prepare all three SVGs before touching the visible journal.
      const clones=imageTargets.map(t=>cloneIllustration(key,t.slot));
      if(clones.some(x=>!x))return;
      const opening=journal.classList.contains("is-open");
      const changed=last!==key;
      const original=hero.querySelector(":scope > svg");
      if(!changed && original?.dataset.s75Art===key)return;
      imageTargets.forEach((target,index)=>{
        clones[index].dataset.s75Art=key;
        target.node.replaceChildren(clones[index]);
      });
      journal.dataset.s75Ready="1";
      journal.classList.add("s75-ready");
      last=key;
      heroFigure.classList.remove("s75-arriving");
      if(opening && !reduced.matches && changed){
        // Reflow is limited to one decorative figure, never the page.
        void heroFigure.offsetWidth;
        heroFigure.classList.add("s75-arriving");
      }
    }
    new MutationObserver(sync).observe(journal,{
      attributes:true,attributeFilter:["data-place","class"]
    });
    sync();
  }
  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();

/* SOURCE assets/js/project-art-studies-76.js */
/* PHASE 76 — PROJECT DNA / NINE ART-DIRECTED STUDIES
   Only the existing Project DNA panels receive new illustration layers.
   No changes to Work landing page, photo images, routes or GSAP. */
(() => {
  function init() {
    const scene=document.querySelector(".case-world");
    const dossier=scene?.querySelector(".s28-dossier");
    const panels=[...(dossier?.querySelectorAll(".s28-panel")||[])];
    if(!scene||!dossier||panels.length!==3||scene.dataset.s76Ready==="1")return;
    const art={
      redhouse:[
        `<path class="s76-solid" d="M60 430V215Q60 65 220 65T380 215V430Z"/>
         <path class="s76-line" d="M70 412V223Q70 75 220 75T370 223V412M112 410V216Q112 122 220 122T328 216V410M151 399V218Q151 164 220 164T289 218V399"/>
         <circle class="s76-key" cx="220" cy="249" r="52"/>
         <path class="s76-hair" d="M220 177V323M146 249H294"/>
         <path class="s76-keyline" d="M116 427H323"/>
         <path class="s76-line" d="M56 80H115M85 51V109M325 405H386M356 374V436"/>`,
        `<rect class="s76-solid" x="73" y="66" width="294" height="347" rx="92"/>
         <path class="s76-line" d="M99 396V167Q99 86 220 86T341 167V396M124 364V172Q124 113 220 113T316 172V364"/>
         <path class="s76-keyline" d="M139 380H301"/>
         <rect class="s76-white" x="159" y="265" width="123" height="68" rx="17"/>
         <path class="s76-line" d="M170 332V287Q170 263 193 263H247Q272 263 272 287V332M182 335H258M194 333V373H246V333M220 373V415M181 417H259"/>
         <circle class="s76-key" cx="220" cy="178" r="35"/>
         <path class="s76-hair" d="M144 134Q220 87 296 134"/>`,
        `<path class="s76-line" d="M64 105H376V374H64Z"/>
         <path class="s76-hair" d="M64 161H376"/>
         <circle class="s76-key" cx="93" cy="132" r="7"/><circle class="s76-key" cx="119" cy="132" r="7"/><circle class="s76-key" cx="145" cy="132" r="7"/>
         <rect class="s76-solid" x="92" y="190" width="151" height="156"/>
         <path class="s76-line" d="M110 328V288L146 241 173 274 211 215 230 242V328Z"/>
         <path class="s76-keyline" d="M260 215H348M260 238H321"/>
         <path class="s76-hair" d="M260 276H347M260 295H336M260 314H340"/>
         <rect class="s76-key" x="259" y="332" width="76" height="12" rx="6"/>
         <path class="s76-line" d="M174 384V420H265V384M149 422H290"/>`
      ],
      soca:[
        `<circle class="s76-white" cx="316" cy="125" r="70"/>
         <path class="s76-solid" d="M0 342L94 226 164 275 256 91 366 278 440 192V470H0Z"/>
         <path class="s76-line" d="M0 342L94 226 164 275 256 91 366 278 440 192M0 384L87 303 163 356 278 199 378 339 440 286"/>
         <path class="s76-hair" d="M222 154L256 91 291 162 261 150 244 141 236 162"/>
         <path class="s76-keyline" d="M0 426L90 361 167 404 278 315 370 404 440 365"/>
         <path class="s76-hair" d="M39 453H404"/>`,
        `<path class="s76-solid" d="M0 155Q105 215 199 142T440 96V480H0Z"/>
         <path class="s76-line" d="M0 186Q108 232 196 168T440 127M0 232Q109 275 196 220T440 190"/>
         <path class="s76-hair" d="M0 279Q108 317 196 265T440 241"/>
         <path class="s76-keyline" d="M280 47C219 128 327 166 221 250S115 340 211 460"/>
         <path class="s76-line" d="M299 54C243 138 343 166 245 259S134 343 230 461"/>
         <path class="s76-hair" d="M104 140L125 86 147 140M125 92V173M349 375L374 307 399 375M374 314V407"/>
         <circle class="s76-key" cx="280" cy="47" r="12"/>`,
        `<path class="s76-hair" d="M-25 123C92 28 180 101 248 52S387 35 470 116M-25 158C92 66 180 137 248 88S387 70 470 151M-25 192C92 101 180 174 248 122S387 105 470 186M-25 230C92 138 180 209 248 159S387 141 470 224M-25 268C92 175 180 247 248 196S387 177 470 263M-25 306C92 213 180 284 248 234S387 215 470 301M-25 344C92 251 180 321 248 273S387 252 470 339"/>
         <path class="s76-keyline" stroke-dasharray="5 16" d="M66 392C100 322 174 374 200 279S267 196 316 216S351 164 391 119"/>
         <circle class="s76-key" cx="66" cy="392" r="14"/><circle class="s76-key" cx="391" cy="119" r="17"/>
         <path class="s76-line" d="M375 119H407M391 103V135"/>`
      ],
      gianni:[
        `<path class="s76-solid" d="M68 108H373V414H68Z"/>
         <path class="s76-line" d="M79 404V151Q79 79 220 79T361 151V404M108 404V151Q108 108 220 108T332 151V404"/>
         <path class="s76-keyline" d="M111 210H330"/>
         <path class="s76-line" d="M114 211L135 239 157 211 178 239 199 211 220 239 241 211 262 239 284 211 305 239 326 211"/>
         <rect class="s76-solid" x="165" y="251" width="111" height="147" rx="51"/>
         <path class="s76-line" d="M166 398V301Q166 256 220 256T274 301V398"/>
         <circle class="s76-key" cx="252" cy="336" r="7"/>
         <path class="s76-hair" d="M45 421H398M157 159H286"/>`,
        `<circle class="s76-solid" cx="220" cy="242" r="171"/>
         <circle class="s76-line" cx="220" cy="242" r="155"/>
         <circle class="s76-hair" cx="220" cy="242" r="121"/>
         <circle class="s76-line" cx="220" cy="242" r="94"/>
         <path class="s76-keyline" d="M174 230C190 203 230 204 254 228S246 277 213 277 161 255 174 230M201 195Q254 175 280 234T229 306Q165 305 152 252T190 183M169 250Q203 295 257 250T240 199"/>
         <path class="s76-hair" d="M49 106V360M37 106V194M61 106V194M49 360V416M371 98V414M354 159Q371 117 387 159V294H354Z"/>
         <circle class="s76-key" cx="220" cy="244" r="8"/>`,
        `<rect class="s76-solid" x="81" y="68" width="292" height="351"/>
         <rect class="s76-line" x="104" y="83" width="248" height="323"/>
         <path class="s76-hair" d="M129 116H328M130 154H325"/>
         <path class="s76-keyline" d="M153 202H311"/>
         <path class="s76-line" d="M130 235H292M130 260H264M130 286H296M130 312H245"/>
         <path class="s76-hair" d="M131 342H326M132 360H289"/>
         <circle class="s76-key" cx="296" cy="378" r="14"/>
         <path class="s76-line" d="M63 435H381M63 450H312M63 53H121M91 23V85"/>`
      ]
    };
    const targets=panels.map(p=>p.querySelector(".s28-art"));
    if(targets.some(t=>!t))return;
    let rendered="";
    let observer=null;
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
    function paint(){
      const theme=scene.dataset.theme||"redhouse";
      if(rendered===theme||!art[theme])return;
      const drawings=art[theme].map(markup=>{
        const wrap=document.createElement("div");
        wrap.innerHTML='<svg class="s76-svg" viewBox="0 0 440 500" preserveAspectRatio="xMidYMid meet" focusable="false" aria-hidden="true">'+markup+'</svg>';
        return wrap.firstElementChild;
      });
      if(drawings.some(svg=>!svg||svg.tagName.toLowerCase()!=="svg"))return;
      targets.forEach((target,i)=>{
        target.querySelector(".s76-svg")?.remove();
        target.appendChild(drawings[i]);
      });
      rendered=theme;
      panels.forEach(panel=>{
        panel.classList.remove("s76-in");
        observer?.unobserve(panel);
        observer?.observe(panel);
      });
    }
    paint();
    if(!rendered)return;
    scene.dataset.s76Ready="1";
    scene.classList.add("s76-ready");
    if("IntersectionObserver" in window&&!reduced.matches){
      observer=new IntersectionObserver(entries=>{
        if(!scene.classList.contains("is-active"))return;
        for(const entry of entries){
          if(!entry.isIntersecting)continue;
          entry.target.classList.add("s76-in");
          observer.unobserve(entry.target);
        }
      },{root:scene,rootMargin:"0px 0px -10% 0px",threshold:.12});
      panels.forEach(panel=>observer.observe(panel));
    }
    new MutationObserver(paint).observe(scene,{attributes:true,attributeFilter:["data-theme"]});
    reduced.addEventListener?.("change",()=>{
      if(reduced.matches){
        observer?.disconnect();
        panels.forEach(panel=>panel.classList.remove("s76-in"));
      }
    });
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();
;

/* SOURCE assets/js/cinematic-language-77.js */
/* PHASE 77 — CINEMATIC MOTION LANGUAGE
   One consistent graphic pulse for Home->world and all principal artwork.
   It observes original is-active/data-* state; NEVER handles clicks, focus,
   scroll or GSAP transforms. Every effect is finite and pointer-transparent. */
(() => {
  function init() {
    const reduce=window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrast=window.matchMedia("(prefers-contrast: more)");
    const available=()=>!document.hidden && !reduce.matches && !contrast.matches &&
      !document.body.classList.contains("s41-studio-focus");

    // Build ON the original gate. No duplicate full-screen transition.
    const gate=document.querySelector(".s27-sequence");
    if(gate&&!gate.classList.contains("s77-ready")){
      const aperture=document.createElement("span");
      aperture.className="s77-aperture";
      aperture.setAttribute("aria-hidden","true");
      const index=document.createElement("span");
      index.className="s77-gate-index";
      index.setAttribute("aria-hidden","true");
      const label=document.createElement("span");
      label.textContent="CHAPTER";
      index.appendChild(label);
      for(let i=0;i<4;i++){
        index.appendChild(document.createElement("i"));
      }
      gate.append(aperture,index);
      gate.classList.add("s77-ready");
    }

    const hub=document.querySelector(".world-hub");
    const stage=hub?.querySelector(".world-stage");
    if(hub&&stage&&!hub.classList.contains("s77-ready")){
      const after=document.createElement("span");
      after.className="s77-home-afterimage";
      after.setAttribute("aria-hidden","true");
      stage.prepend(after);
      hub.classList.add("s77-ready");
    }

    // A design cut on the REAL imagery of each chapter.
    // Inner experiences are included, not replaced by extra pages.
    const areas=[
      {root:".work-world",media:".work-preview",open:"is-active",state:"data-theme",stateOnMedia:true,delay:630},
      {root:".sound-world",media:".sound-art",open:"is-active",state:"data-mood",delay:630},
      {root:".p14-world",media:".p14-postcard",open:"is-active",state:"data-place",delay:630},
      {root:".a17-world",media:".a17-card",open:"is-active",state:"data-mode",delay:630},
      {root:".case-world",media:".case-visual",open:"is-active",state:"data-theme",delay:170,nested:true},
      {root:".p15-journal",media:".p15-hero-figure",open:"is-open",state:"data-place",delay:130,nested:true}
    ];
    for(const area of areas){
      const root=document.querySelector(area.root);
      const media=root?.querySelector(area.media);
      if(!root||!media||media.classList.contains("s77-hero-stage"))continue;
      const sweep=document.createElement("span");
      sweep.className="s77-optical-sweep";
      sweep.setAttribute("aria-hidden","true");
      const registration=document.createElement("span");
      registration.className="s77-register";
      registration.setAttribute("aria-hidden","true");
      media.append(sweep,registration);
      media.classList.add("s77-hero-stage");
      let wasOpen=false;
      let oldSelection="";
      let armTimer=0;
      let finishTimer=0;

      function cancel(){
        if(armTimer){clearTimeout(armTimer);armTimer=0}
        if(finishTimer){clearTimeout(finishTimer);finishTimer=0}
        media.classList.remove("s77-is-cutting");
      }

      function start(){
        armTimer=0;
        if(!available() || !root.classList.contains(area.open))return;
        if(root.inert)return;
        media.classList.remove("s77-is-cutting");
        // Only a newly created decorative element is measured.
        // No page layout or image geometry is changed.
        void sweep.offsetWidth;
        media.classList.add("s77-is-cutting");
        finishTimer=setTimeout(()=>{
          media.classList.remove("s77-is-cutting");
          finishTimer=0;
        },1050);
      }

      function synchronize(){
        const open=root.classList.contains(area.open);
        const key=(area.stateOnMedia?media:root).getAttribute(area.state)||"default";
        if(!open){
          wasOpen=false;oldSelection=key;cancel();return;
        }
        const opening=!wasOpen;
        const changed=key!==oldSelection;
        wasOpen=true;
        oldSelection=key;
        if(!opening&&!changed)return;
        cancel();
        if(!available())return;
        const delay=opening?area.delay:0;
        armTimer=setTimeout(start,delay);
      }
      const onRoot=new MutationObserver(synchronize);
      onRoot.observe(root,{
        attributes:true,
        attributeFilter:area.stateOnMedia?["class"]:["class",area.state]
      });
      if(area.stateOnMedia){
        new MutationObserver(synchronize).observe(media,{
          attributes:true,attributeFilter:[area.state]
        });
      }
      const quiet=()=>{
        if(!available())cancel();
      };
      document.addEventListener("visibilitychange",quiet);
      reduce.addEventListener?.("change",quiet);
      contrast.addEventListener?.("change",quiet);
      synchronize();
    }
  }
  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();
;

/* SOURCE assets/js/connected-frames-78.js */
/* PHASE 78 — CONNECTED FRAMES
   Extends the existing desktop shared-element morph from STEP 10.
   Never creates a competing image clone or intercepts user navigation.
   On tablet/mobile, original slide remains + matching ambient entrance. */
(() => {
  function init() {
    const work=document.querySelector(".work-world");
    const caseWorld=document.querySelector(".case-world");
    const preview=work?.querySelector(".work-preview");
    const rows=[...(work?.querySelectorAll(".work-project")||[])];
    const caseHero=caseWorld?.querySelector(".case-hero");
    if(!work||!caseWorld||!preview||!caseHero||rows.length!==3 ||
       work.dataset.s78Ready==="1")return;

    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrast=window.matchMedia("(prefers-contrast: more)");
    const canAnimate=()=>!reduced.matches&&!contrast.matches&&!document.hidden;
    work.dataset.s78Ready="1";
    work.classList.add("s78-ready");
    caseWorld.classList.add("s78-ready");

    const returnSignal=document.createElement("span");
    returnSignal.className="s78-return-signal";
    returnSignal.setAttribute("aria-hidden","true");
    preview.appendChild(returnSignal);

    rows.forEach(row=>{
      if(row.querySelector(":scope > .s78-row-rule"))return;
      const rule=document.createElement("span");
      rule.className="s78-row-rule";
      rule.setAttribute("aria-hidden","true");
      row.appendChild(rule);
    });

    // STEP 10 already produces a temporary image element and animates it
    // via GSAP. Enrich THAT element; there is never a second floating photo.
    function decorateMorph(node) {
      if(!node||!node.isConnected||node.classList.contains("s78-morph"))return;
      if(!canAnimate())return;
      node.classList.add("s78-morph");
      node.dataset.s78Theme=preview.dataset.theme||"redhouse";
      const light=document.createElement("span");
      light.className="s78-morph-light";
      light.setAttribute("aria-hidden","true");
      const rail=document.createElement("span");
      rail.className="s78-morph-rail";
      rail.setAttribute("aria-hidden","true");
      node.append(light,rail);
    }

    // Body direct children only; no observer in the whole DOM subtree.
    const morphObserver=new MutationObserver(records=>{
      for(const rec of records) {
        for(const node of rec.addedNodes) {
          if(node.nodeType===1 && node.matches?.(".project-morph-frame")){
            decorateMorph(node);
          }
        }
      }
    });
    morphObserver.observe(document.body,{childList:true});
    decorateMorph(document.querySelector("body > .project-morph-frame"));

    let wasOpen=caseWorld.classList.contains("is-active");
    let arrivalTimer=0,returnTimer=0;
    function clearArrival(){
      if(arrivalTimer){clearTimeout(arrivalTimer);arrivalTimer=0}
      caseWorld.classList.remove("s78-arriving");
    }
    function clearReturn(){
      if(returnTimer){clearTimeout(returnTimer);returnTimer=0}
      preview.classList.remove("s78-returning");
    }
    function onCaseChange(){
      const open=caseWorld.classList.contains("is-active");
      if(open===wasOpen)return;
      wasOpen=open;
      if(open){
        clearReturn();
        clearArrival();
        caseWorld.classList.remove("s78-settled");
        if(!canAnimate()){
          caseWorld.classList.add("s78-settled");
          return;
        }
        // A frame-driven ambient reveal can accompany either the original
        // mobile slide OR the existing desktop GSAP image morph.
        caseWorld.classList.add("s78-arriving");
        arrivalTimer=setTimeout(()=>{
          caseWorld.classList.remove("s78-arriving");
          caseWorld.classList.add("s78-settled");
          arrivalTimer=0;
        },1500);
      } else {
        clearArrival();
        caseWorld.classList.remove("s78-settled");
        if(!canAnimate() || !work.classList.contains("is-active"))return;
        clearReturn();
        // One visual signal when arriving back at Work, without
        // touching the focus restoration implemented in STEP 55.
        preview.classList.add("s78-returning");
        returnTimer=setTimeout(()=>{
          preview.classList.remove("s78-returning");
          returnTimer=0;
        },900);
      }
    }
    new MutationObserver(onCaseChange).observe(caseWorld,{
      attributes:true,attributeFilter:["class"]
    });

    function quiet(){
      if(canAnimate())return;
      clearArrival();
      clearReturn();
    }
    document.addEventListener("visibilitychange",quiet);
    reduced.addEventListener?.("change",quiet);
    contrast.addEventListener?.("change",quiet);
  }
  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();
;

/* SOURCE assets/js/connected-atlas-79.js */
/* PHASE 79 — CONNECTED ATLAS
   Original Step 15 owns opening, closing, focus, ESC and next-entry.
   This module listens in capture phase but NEVER prevents or delays it.
   Desktop: a copy of the exact Step 70 SVG travels from the Places postcard
   to the Step 75 journal cover. Mobile: original slide always remains.
*/
(() => {
  function init() {
    const atlas=document.querySelector(".p14-world");
    const journal=document.querySelector(".p15-journal");
    const postcard=atlas?.querySelector(".p14-postcard");
    const hero=journal?.querySelector(".p15-hero-figure");
    const launch=atlas?.querySelector(".p15-launch");
    if(!atlas||!journal||!postcard||!hero||!launch||
       !atlas.classList.contains("s70-ready")||journal.dataset.s79Ready==="1")return;

    const motion=window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrast=window.matchMedia("(prefers-contrast: more)");
    const wide=window.matchMedia("(min-width: 992px)");
    const canMove=()=>wide.matches&&!motion.matches&&!contrast.matches&&
      !document.hidden&&typeof Element.prototype.animate==="function";

    atlas.classList.add("s79-ready");
    journal.classList.add("s79-ready");
    journal.dataset.s79Ready="1";

    if(!postcard.querySelector(":scope > .s79-return-mark")){
      const mark=document.createElement("span");
      mark.className="s79-return-mark";
      mark.setAttribute("aria-hidden","true");
      postcard.appendChild(mark);
    }
    let lastOpen=journal.classList.contains("is-open");
    let frame=null;
    let animations=[];
    let timeout=0;
    let flashTimer=0;
    let sequence=0;

    const finiteRect=rect=>
      rect && [rect.left,rect.top,rect.width,rect.height].every(Number.isFinite) &&
      rect.width>80&&rect.height>80;
    const isInViewport=rect=>
      finiteRect(rect)&&rect.top<innerHeight*.92&&rect.bottom>innerHeight*.08;

    function namespace(svg,tag){
      const ids=new Map();
      svg.querySelectorAll("[id]").forEach(node=>{
        const old=node.id;
        const next="s79-"+tag+"-"+old;
        ids.set(old,next);
        node.id=next;
      });
      if(!ids.size)return;
      const all=[svg,...svg.querySelectorAll("*")];
      for(const node of all){
        for(const attr of [...node.attributes]){
          let val=attr.value.replace(/url\(#([^)]+)\)/g,(match,id)=>
            ids.has(id)?"url(#"+ids.get(id)+")":match);
          if((attr.name==="href"||attr.name==="xlink:href")&&val.startsWith("#")){
            const id=val.slice(1);
            if(ids.has(id))val="#"+ids.get(id);
          }
          if(val!==attr.value)node.setAttribute(attr.name,val);
        }
      }
    }
    function getSource(key){
      return atlas.querySelector('.s70-worldview[data-s70-scene="'+key+'"] svg');
    }
    function addFrame(source,key,rect){
      const node=document.createElement("div");
      node.className="s79-shared-frame";
      node.dataset.s79Place=key;
      node.setAttribute("aria-hidden","true");
      node.style.left=rect.left+"px";
      node.style.top=rect.top+"px";
      node.style.width=rect.width+"px";
      node.style.height=rect.height+"px";
      const svg=source.cloneNode(true);
      svg.removeAttribute("role");
      svg.removeAttribute("aria-label");
      svg.setAttribute("aria-hidden","true");
      namespace(svg,key+"-"+sequence);
      node.appendChild(svg);
      document.body.appendChild(node);
      return node;
    }
    function clear(){
      sequence++;
      if(timeout){clearTimeout(timeout);timeout=0}
      for(const a of animations){
        try{a.cancel()}catch(_){}
      }
      animations=[];
      frame?.remove();
      frame=null;
      journal.classList.remove("s79-bridge-open","s79-bridge-close","s79-hide-hero");
    }
    function animateFrame(from,to,duration){
      if(!frame)return null;
      return frame.animate([
        {left:from.left+"px",top:from.top+"px",width:from.width+"px",height:from.height+"px"},
        {left:to.left+"px",top:to.top+"px",width:to.width+"px",height:to.height+"px"}
      ],{duration,easing:"cubic-bezier(.76,0,.24,1)",fill:"both"});
    }
    function armWatchdog(){
      if(timeout)clearTimeout(timeout);
      timeout=setTimeout(clear,1850);
    }

    function opening(){
      if(!canMove()||frame||journal.classList.contains("is-open")||
         !atlas.classList.contains("is-active"))return;
      const key=atlas.dataset.place||"soca";
      const source=getSource(key);
      const start=postcard.getBoundingClientRect();
      if(!source||!isInViewport(start))return;
      clear();
      const current=sequence;
      frame=addFrame(source,key,start);
      journal.classList.add("s79-bridge-open","s79-hide-hero");
      armWatchdog();

      // The original click listener updates the content, opens the journal
      // and moves keyboard focus. We let it run without interruption.
      requestAnimationFrame(()=>{
        requestAnimationFrame(()=>{
          if(sequence!==current||!frame||!journal.classList.contains("is-open")){
            if(sequence===current)clear();
            return;
          }
          const destination=hero.getBoundingClientRect();
          if(!finiteRect(destination)||!isInViewport(destination)){
            clear();
            return;
          }
          const travel=animateFrame(start,destination,1080);
          const page=journal.animate([
            {opacity:0,offset:0},
            {opacity:0.12,offset:.12},
            {opacity:.88,offset:.66},
            {opacity:1,offset:1}
          ],{duration:1080,easing:"ease-out",fill:"both"});
          animations.push(travel,page);
          travel.addEventListener("finish",()=>{
            if(sequence===current)clear();
          },{once:true});
        });
      });
    }

    function closing(){
      if(!canMove()||frame||!journal.classList.contains("is-open")||
         !atlas.classList.contains("is-active"))return;
      const key=journal.dataset.place||"soca";
      const source=hero.querySelector(".p15-hero-visual svg");
      const from=hero.getBoundingClientRect();
      const to=postcard.getBoundingClientRect();
      // When reading far down the page, fall back to the familiar slide.
      if(!source||!isInViewport(from)||!isInViewport(to))return;
      clear();
      const current=sequence;
      frame=addFrame(source,key,from);
      journal.classList.add("s79-bridge-close","s79-hide-hero");
      armWatchdog();

      const travel=animateFrame(from,to,960);
      const fade=journal.animate([
        {opacity:1,offset:0},
        {opacity:.56,offset:.28},
        {opacity:0,offset:1}
      ],{duration:740,easing:"ease-out",fill:"both"});
      animations.push(travel,fade);
      travel.addEventListener("finish",()=>{
        if(sequence===current)clear();
      },{once:true});
    }

    // Capture permits preparing the optical clone BEFORE the stock
    // handlers mutate scene classes. We do not cancel, prevent, or stop.
    launch.addEventListener("click",opening,true);
    [...journal.querySelectorAll(".p15-close,.p15-bottom-back")].forEach(button=>{
      button.addEventListener("click",closing,true);
    });

    function returned(){
      postcard.classList.remove("s79-just-returned");
      if(flashTimer)clearTimeout(flashTimer);
      if(!motion.matches&&!contrast.matches){
        void postcard.offsetWidth;
        postcard.classList.add("s79-just-returned");
        flashTimer=setTimeout(()=>{
          postcard.classList.remove("s79-just-returned");
          flashTimer=0;
        },950);
      }
    }
    const observer=new MutationObserver(()=>{
      const opened=journal.classList.contains("is-open");
      if(lastOpen&&!opened){
        // Escape or rapid close while an opening bridge is in flight:
        // immediately release the hidden hero and the temporary frame.
        if(journal.classList.contains("s79-bridge-open"))clear();
        returned();
      }
      lastOpen=opened;
    });
    observer.observe(journal,{attributes:true,attributeFilter:["class"]});

    const stopIfNeeded=()=>{
      if(!canMove()&&frame)clear();
    };
    motion.addEventListener?.("change",stopIfNeeded);
    contrast.addEventListener?.("change",stopIfNeeded);
    wide.addEventListener?.("change",stopIfNeeded);
    document.addEventListener("visibilitychange",stopIfNeeded);
  }
  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();
;
