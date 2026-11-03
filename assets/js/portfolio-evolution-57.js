/* STEP 57.3 — A QUIET END TO SELECTED WORK
   Compact footer, zero redundant hero/CTA, preserves established navigation. */
(() => {
  function init() {
    const work = document.querySelector(".work-world");
    const back = work?.querySelector(".work-back");
    if (!work || !back || work.querySelector(".s57-work-footer")) return;

    const footer = document.createElement("footer");
    footer.className = "s57-work-footer s58-quiet-end";
    footer.setAttribute("aria-label", "Fine dei progetti selezionati");
    footer.innerHTML = `
      <div class="s57-footer-meter" aria-hidden="true"><span></span></div>
      <div class="s57-footer-meta">
        <span>LM® / SELECTED WORK</span>
        <span>INDEX 01 — 03 / END</span>
      </div>
      <div class="s58-end-row">
        <p class="s58-end-description">Three selected projects. One way of thinking: design with intention.</p>
        <button class="s58-end-back" type="button" data-s57-back>
          <span>RETURN TO THE HUB</span>
          <span aria-hidden="true">↗</span>
        </button>
      </div>
      <div class="s57-footer-bottom">
        <strong>LUCA MAREGA®</strong>
        <span>DESIGN / DEVELOPMENT / EXPERIMENTS</span>
        <span>2026 — AN ONGOING ARCHIVE</span>
      </div>`;
    work.appendChild(footer);

    footer.querySelector("[data-s57-back]")?.addEventListener("click", () => back.click());

    let frame = 0;
    function updateProgress() {
      frame = 0;
      const max = Math.max(1, work.scrollHeight - work.clientHeight);
      footer.style.setProperty("--s57-scroll", String(Math.max(0,Math.min(1,work.scrollTop/max))));
    }
    work.addEventListener("scroll", () => {
      if (!frame) frame = requestAnimationFrame(updateProgress);
    }, {passive:true});
    updateProgress();

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
        "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("s58-in");
          observer.unobserve(entry.target);
        }
      }, {root:work, threshold:.12});
      footer.querySelectorAll(".s57-footer-meta,.s58-end-row,.s57-footer-bottom").forEach(el => {
        el.classList.add("s58-footer-reveal");
        observer.observe(el);
      });
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, {once:true});
  else init();
})();