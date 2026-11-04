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