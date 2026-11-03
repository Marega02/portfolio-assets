/* STEP 55 — PROJECT DIRECT NAVIGATION
   Keep the existing project selection and GSAP shared-image morph.
   The list and the photograph open the selected case study directly.
   Existing back/ESC behavior is kept, with a focus-return fix.
*/
(() => {
  function init() {
    const work = document.querySelector(".work-world");
    const caseWorld = document.querySelector(".case-world");
    const preview = work?.querySelector(".work-preview");
    const open = work?.querySelector(".case-open");
    const rows = [...(work?.querySelectorAll(".work-project") || [])];
    if (!work || !caseWorld || !preview || !open || rows.length !== 3 ||
        work.dataset.s55Navigation === "ready") return;

    work.dataset.s55Navigation = "ready";
    const projectNames = ["Red House Studio", "Soča Valley", "Trattoria Da Gianni"];
    const themes = ["redhouse", "soca", "gianni"];
    let lastOpenedIndex = 0;

    // The old CTA is still present internally because the original scene
    // and GSAP morph subscribe to its click event.
    open.tabIndex = -1;
    open.setAttribute("aria-hidden", "true");

    function currentIndex() {
      const selected = rows.findIndex(row => row.classList.contains("is-current"));
      return selected < 0 ? 0 : selected;
    }

    function describePreview() {
      preview.setAttribute("aria-label", "Open project: " + projectNames[currentIndex()]);
    }

    function openSelected(index) {
      if (caseWorld.classList.contains("is-active")) return;
      // Focus triggers both original selectors (copy and image), so the
      // case-study code receives the correct is-current project.
      const row = rows[index];
      if (!row) return;
      row.focus({preventScroll:true});
      lastOpenedIndex = index;
      describePreview();
      open.click();
    }

    rows.forEach((row, index) => {
      row.setAttribute("aria-label", "Open project: " + projectNames[index]);

      // Capture before the old click-to-preview handlers, especially on
      // touch where the old handlers would scroll the page to the photo.
      row.addEventListener("click", event => {
        if (event.defaultPrevented) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        openSelected(index);
      }, true);

      row.addEventListener("keydown", event => {
        if (event.repeat || (event.key !== "Enter" && event.key !== " ")) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        openSelected(index);
      }, true);

      row.addEventListener("mouseenter", describePreview);
      row.addEventListener("focus", describePreview);
    });

    // A clean image works better without a floating button: the whole
    // visual is an additional accessible target.
    preview.setAttribute("role", "button");
    preview.tabIndex = 0;
    preview.setAttribute("aria-roledescription", "project preview");
    describePreview();

    preview.addEventListener("click", event => {
      if (event.target.closest("a,button")) return;
      openSelected(currentIndex());
    });
    preview.addEventListener("keydown", event => {
      if (event.repeat || (event.key !== "Enter" && event.key !== " ")) return;
      event.preventDefault();
      openSelected(currentIndex());
    });

    // The original case-back action focuses the old Explore button.
    // Now that the CTA is visually removed, return focus to the project
    // that the visitor actually chose instead.
    let wasOpen = caseWorld.classList.contains("is-active");
    const observeCase = new MutationObserver(() => {
      const isOpen = caseWorld.classList.contains("is-active");
      if (wasOpen && !isOpen) {
        requestAnimationFrame(() => {
          if (!caseWorld.classList.contains("is-active") && work.classList.contains("is-active")) {
            rows[lastOpenedIndex]?.focus({preventScroll:true});
          }
        });
      }
      wasOpen = isOpen;
    });
    observeCase.observe(caseWorld, {attributes:true, attributeFilter:["class"]});

    // Hover selection also changes the case identity.
    const observePreview = new MutationObserver(() => {
      if (themes.includes(preview.dataset.theme)) describePreview();
    });
    observePreview.observe(preview, {attributes:true, attributeFilter:["data-theme"]});
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, {once:true});
  } else init();
})();