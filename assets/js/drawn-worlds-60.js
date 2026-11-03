/* STEP 60 — DRAWN WORLDS
   The four existing HOME poster illustrations draw themselves as the
   user explores the navigation. ABOUT's large editorial sentence gets
   a one-shot reveal. No added UI, no parent transforms, no GSAP edits.
*/
(() => {
  function init() {
    const hub = document.querySelector(".world-hub");
    const board = hub?.querySelector(".s22-art");
    const about = document.querySelector(".a17-world");
    const note = about?.querySelector(".a18-sentence");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const names = ["work", "sound", "places", "about"];

    if (hub && board && !hub.dataset.s60Drawn) {
      hub.dataset.s60Drawn = "1";
      let previous = "";
      let animations = [];
      const clear = () => {
        animations.forEach(anim => {
          try { anim.cancel(); } catch (_) {}
        });
        animations = [];
      };
      function draw() {
        const key = hub.dataset.s22Scene || hub.dataset.s31Scene || "work";
        if (!names.includes(key) || key === previous) return;
        previous = key;
        clear();
        if (reduced.matches || !("animate" in Element.prototype)) return;
        const frame = [...board.querySelectorAll(".s22-frame")].find(
          el => el.dataset.scene === key
        );
        if (!frame) return;
        const shapes = [...frame.querySelectorAll(
          "path, rect, circle, ellipse, line, polyline, polygon"
        )].filter(el => {
          const stroke = getComputedStyle(el).stroke;
          return stroke && stroke !== "none" &&
            typeof el.getTotalLength === "function";
        }).slice(0, 26);
        let i = 0;
        for (const el of shapes) {
          let length = 0;
          try { length = el.getTotalLength(); } catch (_) { continue; }
          if (length < 8 || !Number.isFinite(length)) continue;
          const total = Math.ceil(length) + 2;
          const delay = Math.min(280, i++ * 26);
          const anim = el.animate([
            {strokeDasharray: total + " " + total, strokeDashoffset: total},
            {strokeDasharray: total + " " + total, strokeDashoffset: 0}
          ], {
            duration: 680 + Math.min(i, 8) * 45,
            delay,
            easing: "cubic-bezier(.22,.72,.21,1)",
            fill: "backwards"
          });
          animations.push(anim);
        }
      }
      const watcher = new MutationObserver(draw);
      watcher.observe(hub, {
        attributes: true,
        attributeFilter: ["data-s22-scene", "data-s31-scene"]
      });
      // Allow the original poster setup/entrance to settle first.
      requestAnimationFrame(() => requestAnimationFrame(draw));
      reduced.addEventListener?.("change", () => {
        if (reduced.matches) clear();
        else { previous = ""; draw(); }
      });
    }

    if (about && note && !note.dataset.s60NoteReady && !reduced.matches &&
        "IntersectionObserver" in window) {
      note.dataset.s60NoteReady = "1";
      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          note.classList.add("s60-note-visible");
          observer.disconnect();
          break;
        }
      }, {root: about, threshold: .09, rootMargin: "0px 0px -5% 0px"});
      note.classList.add("s60-note-ready");
      observer.observe(note);
      // If the user changes their motion preference, release the masking.
      reduced.addEventListener?.("change", () => {
        if (reduced.matches) {
          note.classList.add("s60-note-visible");
          observer.disconnect();
        }
      }, {once:true});
    }
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init, {once:true});
  else init();
})();