/* STEP 17 — ABOUT / isolated environment */
(() => {
  function initAbout() {
    const about = document.querySelector(".a17-world");
    const hub = document.querySelector(".world-hub");
    if (!about || !hub || about.dataset.a17Ready === "true") return;
    const opener = [...hub.querySelectorAll(".world-link")].find(link => {
      const title = link.querySelector(".world-name");
      return (title ? title.textContent : link.textContent).trim().toUpperCase().includes("ABOUT");
    });
    const back = about.querySelector(".a17-back");
    const buttons = [...about.querySelectorAll(".a17-mode")];
    const panel = about.querySelector(".a17-panel");
    const panelTitle = about.querySelector(".a17-panel-title");
    const panelCopy = about.querySelector(".a17-panel-copy");
    const card = about.querySelector(".a17-card");
    if (!opener || !back || buttons.length !== 3 || !panel || !panelTitle || !panelCopy || !card) {
      console.warn("STEP 17 ABOUT: missing required elements");
      return;
    }
    about.dataset.a17Ready = "true";
    about.inert = true;
    about.setAttribute("aria-hidden", "true");
    let open = false;
    let lastFocus = null;
    let updateFrame = 0;
    const info = {
      make: {title: 'I like making things <em>feel right.</em>',copy:'Web design, thoughtful interactions, and a little creative code. I care about the details that make a digital experience memorable.'},
      listen: {title: 'Everything begins with <em>a feeling.</em>',copy:'Music is a constant source of inspiration: rhythm, atmosphere, and the strange way a sound can change how we experience a moment.'},
      wander: {title: 'There is always <em>more out there.</em>',copy:'Mountains, cities, unfamiliar streets. Exploring new places keeps me curious and often gives me ideas I would never find behind a screen.'}
    };
    function chooseMode(key) {
      if (!info[key]) return;
      about.dataset.mode = key;
      buttons.forEach(button => {
        const selected = button.dataset.a17Mode === key;
        button.classList.toggle("is-selected", selected);
        button.setAttribute("aria-pressed", String(selected));
      });
      panel.classList.add("a17-panel-changing");
      if (updateFrame) cancelAnimationFrame(updateFrame);
      updateFrame = requestAnimationFrame(() => {
        panelTitle.innerHTML = info[key].title;
        panelCopy.textContent = info[key].copy;
        panel.classList.remove("a17-panel-changing");
      });
    }
    function openAbout(event) {
      if (event) event.preventDefault();
      if (open) return;
      open = true;
      lastFocus = document.activeElement;
      about.inert = false;
      about.setAttribute("aria-hidden", "false");
      about.classList.add("is-active");
      document.body.classList.add("is-about-open");
      hub.inert = true;
      hub.setAttribute("aria-hidden", "true");
      about.scrollTop = 0;
      chooseMode("make");
      requestAnimationFrame(() => back.focus({preventScroll:true}));
    }
    function closeAbout() {
      if (!open) return;
      open = false;
      about.classList.remove("is-active");
      document.body.classList.remove("is-about-open");
      hub.inert = false;
      hub.removeAttribute("aria-hidden");
      about.setAttribute("aria-hidden", "true");
      about.inert = true;
      const target = lastFocus && lastFocus.isConnected ? lastFocus : opener;
      target.focus({preventScroll:true});
    }
    opener.addEventListener("click", openAbout);
    back.addEventListener("click", closeAbout);
    buttons.forEach(button=>button.addEventListener("click",()=>chooseMode(button.dataset.a17Mode)));
    document.addEventListener("keydown", event => {
      if (!open) return;
      if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); closeAbout(); return; }
      if (event.key !== "Tab") return;
      const active = [...about.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(el => el.getClientRects().length && !el.closest("[inert]"));
      if (!active.length) return;
      const first = active[0], last = active[active.length - 1];
      if (event.shiftKey && document.activeElement === first) {event.preventDefault();last.focus();}
      else if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first.focus();}
    }, true);
    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      card.addEventListener("pointermove", event => {
        if (!open || event.pointerType === "touch") return;
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - .5) * 9;
        const y = ((event.clientY - rect.top) / rect.height - .5) * -9;
        card.style.setProperty("--a17-ry", x.toFixed(2)+"deg");
        card.style.setProperty("--a17-rx", y.toFixed(2)+"deg");
      });
      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--a17-rx", "0deg");
        card.style.setProperty("--a17-ry", "0deg");
      });
    }
    chooseMode("make");
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initAbout, {once:true});
  else initAbout();
})();

/* STEP 18 — ABOUT: interactive field notes */
(() => {
  function setup() {
    const about = document.querySelector(".a17-world");
    const visual = about?.querySelector(".a18-visual");
    if (!about || !visual || about.dataset.a18Ready === "true") return;
    const chapters = [...about.querySelectorAll(".a18-entry")];
    const counter = about.querySelector(".a18-visual-count");
    const word = about.querySelector(".a18-visual-word");
    const caption = about.querySelector(".a18-visual-caption");
    const workCta = about.querySelector(".a18-work-cta");
    const back = about.querySelector(".a17-back");
    const hub = document.querySelector(".world-hub");
    if (chapters.length !== 3 || !counter || !word || !caption || !workCta || !back || !hub) return;
    const scenes = {
      make: {counter:"01 / 03",word:"FORM.",caption:"MAKE THE DETAILS MATTER"},
      listen: {counter:"02 / 03",word:"FEEL.",caption:"FIND THE RHYTHM"},
      wander: {counter:"03 / 03",word:"MOVE.",caption:"LET CURIOSITY LEAD"}
    };
    const select = key => {
      const scene = scenes[key];
      if (!scene) return;
      visual.dataset.scene = key;
      counter.textContent = scene.counter;
      word.textContent = scene.word;
      caption.textContent = scene.caption;
      chapters.forEach(button => {
        const active = button.dataset.scene === key;
        button.classList.toggle("is-current",active);
        button.setAttribute("aria-pressed",String(active));
      });
    };
    chapters.forEach(button => button.addEventListener("click",()=>select(button.dataset.scene)));
    workCta.addEventListener("click",() => {
      const workLink = [...hub.querySelectorAll(".world-link")].find(link => {
        const title = link.querySelector(".world-name");
        return (title ? title.textContent : link.textContent).trim().toUpperCase() === "WORK";
      });
      back.click();
      if (workLink) requestAnimationFrame(() => workLink.click());
    });
    about.dataset.a18Ready = "true";
    select("make");
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded",setup,{once:true});
  else setup();
})();
