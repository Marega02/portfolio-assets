/* STEP 61 — FINITE ANALOG / ATLAS ANIMATIONS. Never edits page layout, GSAP or navigation. */
(() => {
  function init() {
    const sound = document.querySelector(".sound-world");
    const record = sound?.querySelector(".sound-record");
    const spectrum = sound?.querySelector(".s24-spectrum");
    const places = document.querySelector(".p14-world");
    const postcard = places?.querySelector(".p14-postcard");
    const route = places?.querySelector(".p25-route-path");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrast = window.matchMedia("(prefers-contrast: more)");
    const supported = typeof Element.prototype.animate === "function";
    const active = new Set();
    const noMotion = () => motion.matches || contrast.matches || document.hidden;

    function animate(node, frames, options) {
      if (!node || !supported) return;
      const a = node.animate(frames, { ...options, fill: "none" });
      active.add(a);
      a.addEventListener("finish", () => active.delete(a), { once: true });
      a.addEventListener("cancel", () => active.delete(a), { once: true });
    }
    function stopAll() {
      for (const a of [...active]) { try { a.cancel(); } catch (_) {} }
      active.clear();
    }

    if (sound && record && !sound.dataset.s61Sound) {
      sound.dataset.s61Sound = "1";
      sound.classList.add("s61-sound-ready");
      const etch = document.createElement("span");
      etch.className = "s61-groove-etch";
      etch.setAttribute("aria-hidden", "true");
      record.appendChild(etch);
      let lastMood = "", wasOpen = false;
      function updateSound() {
        const open = sound.classList.contains("is-active");
        const mood = sound.dataset.mood || "soul";
        if (!open) { wasOpen = false; return; }
        if (wasOpen && lastMood === mood) return;
        wasOpen = true; lastMood = mood;
        if (noMotion() || sound.querySelector(".sound-archive.is-open")) return;
        const speed = mood === "hiphop" ? 27 : mood === "alternative" ? 43 : 33;
        animate(etch, [
          { opacity: .16, transform: "rotate(-16deg)" },
          { opacity: .80, transform: "rotate(10deg)", offset: .43 },
          { opacity: .24, transform: "rotate(35deg)" }
        ], { duration: 1040, easing: "cubic-bezier(.21,.75,.22,1)" });
        [...(spectrum?.querySelectorAll("i") || [])].forEach((bar, i) => {
          animate(bar, [
            { opacity: .40 }, { opacity: 1, offset: .45 }, { opacity: .78 }
          ], { duration: 430, delay: i * speed, easing: "ease-out" });
        });
      }
      new MutationObserver(updateSound).observe(sound, {
        attributes: true, attributeFilter: ["class", "data-mood"]
      });
      updateSound();
    }

    if (places && postcard && !places.dataset.s61Places) {
      places.dataset.s61Places = "1";
      places.classList.add("s61-places-ready");
      const exposure = document.createElement("span");
      exposure.className = "s61-exposure";
      exposure.setAttribute("aria-hidden", "true");
      postcard.appendChild(exposure);
      let lastPlace = "", wasOpen = false;
      function updatePlaces() {
        const open = places.classList.contains("is-active");
        const key = places.dataset.place || "soca";
        if (!open) { wasOpen = false; return; }
        if (!["soca", "london", "kl"].includes(key)) return;
        if (wasOpen && lastPlace === key) return;
        wasOpen = true; lastPlace = key;
        if (noMotion()) return;
        animate(exposure, [
          { opacity: 0, transform: "translate3d(-110%,0,0)" },
          { opacity: .52, transform: "translate3d(0,0,0)", offset: .52 },
          { opacity: 0, transform: "translate3d(110%,0,0)" }
        ], { duration: 1060, easing: "cubic-bezier(.3,.65,.2,1)" });
        if (route) animate(route, [
          { strokeDashoffset: 90, opacity: .45 },
          { strokeDashoffset: 0, opacity: .75 }
        ], { duration: 860, easing: "cubic-bezier(.2,.75,.25,1)" });

        const scene = [...postcard.querySelectorAll(".p14-scene")].find(
          el => el.dataset.scene === key
        );
        const shapes = scene ? [...scene.querySelectorAll("path,polyline,line,ellipse,circle")] : [];
        let count = 0;
        for (const shape of shapes) {
          if (count >= 10 || typeof shape.getTotalLength !== "function") continue;
          const stroke = getComputedStyle(shape).stroke;
          if (!stroke || stroke === "none") continue;
          let length;
          try { length = shape.getTotalLength(); } catch (_) { continue; }
          if (!Number.isFinite(length) || length < 16) continue;
          const dash = Math.ceil(length) + 2;
          animate(shape, [
            { strokeDasharray: dash + " " + dash, strokeDashoffset: dash },
            { strokeDasharray: dash + " " + dash, strokeDashoffset: 0 }
          ], { duration: 710, delay: count * 48, easing: "cubic-bezier(.21,.75,.2,1)" });
          count++;
        }
        const pin = places.querySelector(".p25-route-pin.is-current");
        if (pin) animate(pin, [
          { opacity: .35 }, { opacity: 1 }
        ], { duration: 470, easing: "ease-out" });
      }
      new MutationObserver(updatePlaces).observe(places, {
        attributes: true, attributeFilter: ["class", "data-place"]
      });
      updatePlaces();
    }

    motion.addEventListener?.("change", () => { if (noMotion()) stopAll(); });
    contrast.addEventListener?.("change", () => { if (noMotion()) stopAll(); });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopAll();
    });
  }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();