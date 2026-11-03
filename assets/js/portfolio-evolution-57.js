/* STEP 57 — WORK FINALE + ABOUT CONNECTED LINE REFINEMENT
   Self-contained enhancement. Keeps existing GSAP project transitions,
   original case-study selection and all world navigation untouched. */
(() => {
  function init() {
    const work = document.querySelector(".work-world");
    const hub = document.querySelector(".world-hub");
    const back = work?.querySelector(".work-back");
    if (!work || !hub || !back || work.querySelector(".s57-work-footer")) return;

    const footer = document.createElement("footer");
    footer.className = "s57-work-footer";
    footer.setAttribute("aria-label", "Selected Work — closing section");
    footer.innerHTML = `
      <div class="s57-footer-meter" aria-hidden="true"><span></span></div>
      <div class="s57-footer-meta">
        <span>LM® / ARCHIVE 001—003</span>
        <span>END OF SELECTED WORK</span>
      </div>
      <div class="s57-footer-stage">
        <div class="s57-footer-copy">
          <p class="s57-footer-eyebrow">THE NEXT CHAPTER / OPEN</p>
          <h2 class="s57-footer-heading">Let's make<br><em>something</em> good.</h2>
          <p class="s57-footer-note">Behind every project is a conversation, a new perspective, and the details that make the experience feel right.</p>
          <div class="s57-footer-actions">
            <button type="button" class="s57-footer-action" data-s57-contact>
              <span>START A CONVERSATION</span><span aria-hidden="true">↗</span>
            </button>
            <button type="button" class="s57-footer-secondary" data-s57-back>
              <span>BACK TO MY WORLD</span><span aria-hidden="true">↖</span>
            </button>
          </div>
        </div>
        <div class="s57-footer-orbit" aria-hidden="true">
          <span class="s57-orbit-line"></span>
          <span class="s57-orbit-mark">LM / ∞</span>
        </div>
      </div>
      <div class="s57-footer-bottom">
        <strong>LUCA MAREGA®</strong>
        <span>DESIGN / DEVELOPMENT / CURIOSITY</span>
        <span>INDEPENDENT CREATIVE PORTFOLIO — 2026</span>
      </div>`;
    work.appendChild(footer);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const backButton = footer.querySelector("[data-s57-back]");
    const contactButton = footer.querySelector("[data-s57-contact]");

    backButton?.addEventListener("click", () => back.click());

    contactButton?.addEventListener("click", () => {
      const aboutLink = [...hub.querySelectorAll(".world-link")].find(link =>
        (link.querySelector(".world-name")?.textContent || link.textContent || "")
          .trim().toUpperCase().includes("ABOUT")
      );
      const about = document.querySelector(".a17-world");
      if (!aboutLink || !about) {
        back.click();
        return;
      }
      // Original link handlers still own closing/opening each chapter.
      back.click();
      window.setTimeout(() => {
        aboutLink.click();
        window.setTimeout(() => {
          if (!about.classList.contains("is-active")) return;
          const contact = about.querySelector(".s29-contact");
          if (!contact) return;
          contact.scrollIntoView({behavior: reduced ? "instant" : "smooth", block: "start"});
          window.setTimeout(() => {
            if (about.classList.contains("is-active")) {
              contact.querySelector(".s29-input")?.focus({preventScroll:true});
            }
          }, reduced ? 0 : 800);
        }, reduced ? 30 : 1050);
      }, reduced ? 0 : 340);
    });

    // A lightweight progress track, computed only when Work actually scrolls.
    let meterFrame = 0;
    function updateMeter() {
      meterFrame = 0;
      const max = Math.max(1, work.scrollHeight - work.clientHeight);
      const progress = Math.max(0, Math.min(1, work.scrollTop / max));
      footer.style.setProperty("--s57-scroll", progress.toFixed(3));
    }
    const onScroll = () => {
      if (!meterFrame) meterFrame = requestAnimationFrame(updateMeter);
    };
    work.addEventListener("scroll", onScroll, {passive:true});
    updateMeter();

    // Refined editorial reveals, with the Work scroll container as root.
    if (!reduced && "IntersectionObserver" in window) {
      const targets = [
        footer.querySelector(".s57-footer-eyebrow"),
        footer.querySelector(".s57-footer-heading"),
        footer.querySelector(".s57-footer-note"),
        footer.querySelector(".s57-footer-actions"),
        footer.querySelector(".s57-footer-orbit")
      ].filter(Boolean);
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("s57-visible");
          observer.unobserve(entry.target);
        });
      }, {root:work, rootMargin:"0px 0px -5% 0px", threshold:.08});
      targets.forEach((target,index) => {
        target.classList.add("s57-reveal-ready");
        target.style.transitionDelay = Math.min(index * 65, 260) + "ms";
        observer.observe(target);
      });
    }

    // One pointer-reactive vector object. No animation loops or hover
    // listeners on preview images / original transition targets.
    const stage = footer.querySelector(".s57-footer-stage");
    const orbit = footer.querySelector(".s57-footer-orbit");
    if (fine && !reduced && stage && orbit) {
      let pending = 0;
      let x = 0, y = 0;
      function move() {
        pending = 0;
        orbit.style.setProperty("--s57-x", x.toFixed(1)+"px");
        orbit.style.setProperty("--s57-y", y.toFixed(1)+"px");
      }
      stage.addEventListener("pointermove", event => {
        const r = stage.getBoundingClientRect();
        x = Math.max(-9, Math.min(9, (event.clientX - (r.left + r.width/2))/r.width*18));
        y = Math.max(-9, Math.min(9, (event.clientY - (r.top + r.height/2))/r.height*18));
        if (!pending) pending = requestAnimationFrame(move);
      }, {passive:true});
      stage.addEventListener("pointerleave", () => {
        x = 0;
        y = 0;
        if (!pending) pending = requestAnimationFrame(move);
      });
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, {once:true});
  } else init();
})();