/* STEP 58 — MATERIAL RESPONSE / THE QUIET DETAILS
   Four independent pointer surfaces, plus Work photographic sweep.
   No intercepted routes, no GSAP overrides, no perpetual animation loops. */
(() => {
  function init() {
    if (document.documentElement.dataset.s58Ready === "1") return;
    document.documentElement.dataset.s58Ready = "1";

    const work = document.querySelector(".work-world");
    const home = document.querySelector(".world-hub");
    const preview = work?.querySelector(".work-preview");

    if (preview && !preview.querySelector(".s58-photo-sweep")) {
      const sweep = document.createElement("span");
      sweep.className = "s58-photo-sweep";
      sweep.setAttribute("aria-hidden","true");
      preview.appendChild(sweep);
    }

    home?.querySelectorAll(".world-link").forEach(link => {
      if (link.querySelector(".s58-nav-trace")) return;
      const trace = document.createElement("span");
      trace.className = "s58-nav-trace";
      trace.setAttribute("aria-hidden","true");
      link.appendChild(trace);
    });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine || reduced) return;

    // Pointer light is always an independent child, never a GSAP target.
    [
      ".work-world .work-preview",
      ".sound-world .sound-art",
      ".p14-world .p14-postcard",
      ".a17-world .a17-card"
    ].forEach(selector => {
      const surface = document.querySelector(selector);
      if (!surface || surface.querySelector(".s58-light")) return;
      const layer = document.createElement("span");
      layer.className = "s58-light";
      layer.setAttribute("aria-hidden","true");
      surface.classList.add("s58-material-surface");
      surface.appendChild(layer);
      let pending = 0, x = 50, y = 50;
      function update() {
        pending = 0;
        surface.style.setProperty("--s58-x", x.toFixed(1)+"%");
        surface.style.setProperty("--s58-y", y.toFixed(1)+"%");
      }
      surface.addEventListener("pointermove", event => {
        const r = surface.getBoundingClientRect();
        if (!r.width || !r.height) return;
        x = Math.max(0,Math.min(100,(event.clientX-r.left)/r.width*100));
        y = Math.max(0,Math.min(100,(event.clientY-r.top)/r.height*100));
        if (!pending) pending = requestAnimationFrame(update);
      }, {passive:true});
      surface.addEventListener("pointerleave", () => {
        x = 50; y = 50;
        if (!pending) pending = requestAnimationFrame(update);
      });
    });

    work?.querySelectorAll(".work-project").forEach(row => {
      if (row.querySelector(".s58-row-glow")) return;
      const glow = document.createElement("span");
      glow.className = "s58-row-glow";
      glow.setAttribute("aria-hidden","true");
      row.appendChild(glow);
      let pending = 0, x = 25, y = 50;
      function update() {
        pending = 0;
        row.style.setProperty("--s58-x",x.toFixed(1)+"%");
        row.style.setProperty("--s58-y",y.toFixed(1)+"%");
      }
      row.addEventListener("pointermove", event => {
        const rect = row.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        x = Math.max(0,Math.min(100,(event.clientX-rect.left)/rect.width*100));
        y = Math.max(0,Math.min(100,(event.clientY-rect.top)/rect.height*100));
        if (!pending) pending = requestAnimationFrame(update);
      }, {passive:true});
    });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded",init,{once:true});
  } else init();
})();