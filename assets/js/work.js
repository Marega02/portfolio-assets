document.addEventListener("DOMContentLoaded", () => {

  const hub = document.querySelector(".world-hub");
  const work = document.querySelector(".work-world");
  const workLink = document.querySelector(".world-link");
  const back = document.querySelector(".work-back");

  if (!hub || !work || !workLink || !back) {
    console.error("STEP 6: elemento mancante", {
      hub, work, workLink, back
    });
    return;
  }

  // WORK inizia nascosto
  work.inert = true;
  work.setAttribute("aria-hidden", "true");

  function openWork() {

    // Rende prima accessibile la nuova schermata
    work.inert = false;
    work.removeAttribute("aria-hidden");

    // Attiva la transizione CSS
    work.classList.add("is-active");
    document.body.classList.add("is-work-open");

    // Sposta il focus nel nuovo ambiente
    back.focus({ preventScroll: true });

    // Disabilita solo ora la homepage
    hub.inert = true;
  }

  function closeWork() {

    // Riattiva subito la homepage
    hub.inert = false;

    // Ripristina il focus
    workLink.focus({ preventScroll: true });

    // Avvia la transizione inversa
    work.classList.remove("is-active");

    document.body.classList.remove("is-work-open");

    work.inert = true;
    work.setAttribute("aria-hidden", "true");
  }

  workLink.addEventListener("click", (event) => {
    event.preventDefault();
    openWork();
  });

  back.addEventListener("click", (event) => {
    event.preventDefault();
    closeWork();
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      work.classList.contains("is-active")
    ) {
      closeWork();
    }
  });

});

document.addEventListener("DOMContentLoaded", () => {

  const projects = [
    {
      theme: "redhouse",
      kicker: "CASE STUDY / 001",
      mark: "RH.",
      title: "RED HOUSE STUDIO",
      footer: "WEB DESIGN — 2026"
    },
    {
      theme: "soca",
      kicker: "CASE STUDY / 002",
      mark: "SV.",
      title: "SOČA VALLEY",
      footer: "VISUAL STORYTELLING — 2026"
    },
    {
      theme: "gianni",
      kicker: "CASE STUDY / 003",
      mark: "DG.",
      title: "TRATTORIA DA GIANNI",
      footer: "WEB DESIGN — 2026"
    }
  ];

  const rows = [
    ...document.querySelectorAll(".work-project")
  ];

  const preview = document.querySelector(".work-preview");

  if (!preview || rows.length !== projects.length) {
    console.warn("STEP 7: verifica la struttura.");
    return;
  }

  const kicker = preview.querySelector(".preview-kicker");
  const mark = preview.querySelector(".preview-mark");
  const title = preview.querySelector(".preview-title");
  const footer = preview.querySelector(".preview-footer");

  if (!kicker || !mark || !title || !footer) return;

  const textElements = [kicker, mark, title, footer];

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let activeIndex = -1;

  // Cambia la composizione in base al progetto
  function selectProject(index, animate = true) {

    if (index === activeIndex) return;

    const project = projects[index];
    if (!project) return;

    activeIndex = index;

    // Aggiorna il progetto selezionato
    rows.forEach((row, i) => {
      const selected = i === index;

      row.classList.toggle("is-current", selected);

      row.setAttribute(
        "aria-pressed",
        String(selected)
      );
    });

    // Aggiorna l'identità del manifesto
    preview.dataset.theme = project.theme;

    kicker.textContent = project.kicker;
    mark.textContent = project.mark;
    title.textContent = project.title;
    footer.textContent = project.footer;

    // Animazione tipografica
    if (
      animate &&
      !reducedMotion &&
      window.gsap
    ) {
      gsap.fromTo(
        textElements,
        {
          opacity: 0,
          y: 14
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.045,
          ease: "power3.out",
          overwrite: "auto"
        }
      );
    }
  }

  function showOnTouch(index) {
    selectProject(index);

    // Su schermi piccoli porta l'anteprima
    // nella zona visibile dopo la selezione
    if (window.innerWidth <= 991) {
      preview.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "center"
      });
    }
  }

  // Interazioni dei tre progetti
  rows.forEach((row, index) => {

    row.setAttribute("role", "button");
    row.setAttribute("tabindex", "0");
    row.setAttribute(
      "aria-label",
      "Mostra anteprima: " + projects[index].title
    );

    row.addEventListener("mouseenter", () => {
      selectProject(index);
    });

    row.addEventListener("focus", () => {
      selectProject(index);
    });

    row.addEventListener("click", () => {
      showOnTouch(index);
    });

    row.addEventListener("keydown", (event) => {
      if (
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault();
        showOnTouch(index);
      }
    });
  });

  // Primo progetto attivo per impostazione predefinita
  selectProject(0, false);

  // Movimento leggero della tipografia
  if (
    !window.gsap ||
    reducedMotion ||
    !window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches
  ) return;

  const moveX = gsap.quickTo(mark, "x", {
    duration: 0.8,
    ease: "power3.out"
  });

  const moveY = gsap.quickTo(mark, "y", {
    duration: 0.8,
    ease: "power3.out"
  });

  preview.addEventListener("pointermove", (event) => {
    const rect = preview.getBoundingClientRect();

    const x = (
      (event.clientX - rect.left) / rect.width - 0.5
    ) * 2;

    const y = (
      (event.clientY - rect.top) / rect.height - 0.5
    ) * 2;

    moveX(x * 16);
    moveY(y * 12);
  });

  preview.addEventListener("pointerleave", () => {
    moveX(0);
    moveY(0);
  });

});

document.addEventListener("DOMContentLoaded", () => {

  const work = document.querySelector(".work-world");
  if (!work) return;

  const rows = [
    ...work.querySelectorAll(".work-project")
  ];

  const preview = work.querySelector(".work-preview");

  if (!preview) return;

  const visuals = [
    ...preview.querySelectorAll(".preview-visual")
  ];

  if (
    rows.length !== 3 ||
    visuals.length !== 3
  ) {
    console.warn(
      "STEP 8: controlla i tre progetti e le immagini."
    );
    return;
  }

  // Mostra l'immagine associata al progetto
  function showVisual(index) {

    visuals.forEach((visual, i) => {

      const active = i === index;

      visual.classList.toggle(
        "is-visible",
        active
      );

      visual.setAttribute(
        "aria-hidden",
        String(!active)
      );

    });
  }

  // Colleghiamo ogni progetto
  rows.forEach((row, index) => {

    row.addEventListener("mouseenter", () => {
      showVisual(index);
    });

    row.addEventListener("focus", () => {
      showVisual(index);
    });

    row.addEventListener("click", () => {
      showVisual(index);
    });

  });

  // Red House visibile all'apertura
  showVisual(0);

  // Profondità controllata dal mouse
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const canHover = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;

  if (
    !window.gsap ||
    reducedMotion ||
    !canHover
  ) return;

  const imageLayer = preview.querySelector(
    ".preview-visuals"
  );

  if (!imageLayer) return;

  const moveX = gsap.quickTo(imageLayer, "x", {
    duration: 0.9,
    ease: "power3.out"
  });

  const moveY = gsap.quickTo(imageLayer, "y", {
    duration: 0.9,
    ease: "power3.out"
  });

  preview.addEventListener("pointermove", (event) => {

    const rect = preview.getBoundingClientRect();

    const x = (
      (event.clientX - rect.left) / rect.width - 0.5
    ) * 2;

    const y = (
      (event.clientY - rect.top) / rect.height - 0.5
    ) * 2;

    moveX(x * 9);
    moveY(y * 9);

  });

  preview.addEventListener("pointerleave", () => {
    moveX(0);
    moveY(0);
  });

});

document.addEventListener("DOMContentLoaded", () => {

  const work = document.querySelector(".work-world");
  const caseWorld = document.querySelector(".case-world");

  if (!work || !caseWorld) {
    console.error("STEP 9: ambiente mancante");
    return;
  }

  const openButton = work.querySelector(".case-open");
  const backButtons = [
    ...caseWorld.querySelectorAll(
      ".case-back, .case-back-bottom"
    )
  ];

  const rows = [
    ...work.querySelectorAll(".work-project")
  ];

  const visuals = [
    ...work.querySelectorAll(".preview-visual")
  ];

  if (
    !openButton ||
    backButtons.length !== 2 ||
    rows.length !== 3 ||
    visuals.length !== 3
  ) {
    console.error("STEP 9: controlla gli elementi");
    return;
  }

  // =====================================
  // CONTENUTI DEI TRE PROGETTI
  // =====================================

  const projects = [
    {
      theme: "redhouse",
      index: "PROJECT 01 / 03",
      category: "WEB DESIGN / 2026",
      title: "RED HOUSE\nSTUDIO",
      deck:
        "A contemporary digital identity built around character, style and creativity.",
      statement:
        "BEYOND THE\nORDINARY.",
      description:
        "A digital experience created to present Red House Studio through expressive typography, carefully selected imagery and an intuitive visual structure.",
      direction:
        "An editorial approach with confident typography, warm colors and an identity designed to reflect the personality of the salon.",
      development:
        "Designed and developed with Webflow, with responsive layouts, custom interactions and motion.",
      caption: "VISUAL ARCHIVE / 001"
    },

    {
      theme: "soca",
      index: "PROJECT 02 / 03",
      category: "VISUAL STORYTELLING / 2026",
      title: "SOČA\nVALLEY",
      deck:
        "A digital journey inspired by landscape, atmosphere and exploration.",
      statement:
        "NATURE IN\nMOTION.",
      description:
        "An immersive web experience celebrating the landscapes and visual atmosphere of the Soča Valley through cinematic imagery and digital storytelling.",
      direction:
        "A visual language inspired by nature, combining earthy tones, landscape photography and an atmospheric editorial composition.",
      development:
        "Built in Webflow with large-scale visual sections, video elements, responsive layouts and scroll-based motion.",
      caption: "VISUAL ARCHIVE / 002"
    },

    {
      theme: "gianni",
      index: "PROJECT 03 / 03",
      category: "WEB DESIGN / 2026",
      title: "TRATTORIA\nDA GIANNI",
      deck:
        "A warm and welcoming digital space inspired by traditional Italian cuisine.",
      statement:
        "A TASTE OF\nTRADITION.",
      description:
        "A restaurant website concept focused on presenting food, atmosphere and practical information through a welcoming and accessible interface.",
      direction:
        "A warm visual identity combining natural colors, food imagery and approachable typography.",
      development:
        "Designed in Webflow with dedicated sections for the restaurant, its dishes, opening hours and contact information.",
      caption: "VISUAL ARCHIVE / 003"
    }
  ];

  // =====================================
  // AGGIORNAMENTO DEI CONTENUTI
  // =====================================

  function setText(selector, value) {
    const element = caseWorld.querySelector(selector);

    if (element) {
      element.textContent = value;
    }
  }

  function updateProject(index) {

    const project = projects[index];
    if (!project) return;

    caseWorld.dataset.theme = project.theme;

    setText(".case-index", project.index);
    setText(".case-category", project.category);
    setText(".case-title", project.title);
    setText(".case-deck", project.deck);

    setText(".case-statement", project.statement);
    setText(".case-description", project.description);
    setText(".case-direction", project.direction);
    setText(".case-development", project.development);
    setText(".case-image-caption", project.caption);

    // Recupera la fotografia già utilizzata
    // nella galleria dello STEP 8

    const source = visuals[index].querySelector("img");
    const destination = caseWorld.querySelector(".case-image");

    if (source && destination) {

      destination.src = source.src;

      if (source.srcset) {
        destination.srcset = source.srcset;
        destination.sizes =
          "(max-width: 991px) 100vw, 58vw";
      } else {
        destination.removeAttribute("srcset");
      }

      destination.alt =
        "Anteprima del progetto " +
        project.title.replace("\n", " ");
    }
  }

  // =====================================
  // APERTURA DEL PROGETTO
  // =====================================

  function openProject() {

    if (caseWorld.classList.contains("is-active")) {
      return;
    }

    // Trova il progetto selezionato nello Step 7

    let index = rows.findIndex((row) =>
      row.classList.contains("is-current")
    );

    if (index < 0) index = 0;

    // Aggiorna tutti i contenuti prima di mostrare
    // la nuova scena

    updateProject(index);

    // Partiamo sempre dall'inizio
    caseWorld.scrollTop = 0;

    // Rende interattiva la nuova scena
    caseWorld.inert = false;
    caseWorld.removeAttribute("aria-hidden");
    caseWorld.classList.add("is-active");

    // Sposta il focus sul comando di ritorno
    backButtons[0].focus({
      preventScroll: true
    });

    // Disattiva l'ambiente WORK sottostante
    work.inert = true;
  }

  // =====================================
  // RITORNO ALLA GALLERIA
  // =====================================

  function closeProject() {

    if (!caseWorld.classList.contains("is-active")) {
      return;
    }

    // Prima riattiviamo WORK
    work.inert = false;

    // Ripristiniamo il focus
    openButton.focus({
      preventScroll: true
    });

    // Chiudiamo la scena
    caseWorld.classList.remove("is-active");
    caseWorld.inert = true;
    caseWorld.setAttribute("aria-hidden", "true");
  }

  // =====================================
  // EVENTI
  // =====================================

  openButton.addEventListener("click", openProject);

  backButtons.forEach((button) => {
    button.addEventListener("click", closeProject);
  });

  // Gestiamo ESC in fase capture per evitare
  // che il vecchio script dello Step 6
  // chiuda anche WORK mentre siamo nel progetto.

  document.addEventListener("keydown", (event) => {

    if (!caseWorld.classList.contains("is-active")) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      event.stopImmediatePropagation();
      closeProject();
      return;
    }

    // Mantiene Tab all'interno della scena aperta
    if (event.key === "Tab") {

      const first = backButtons[0];
      const last = backButtons[1];

      if (event.shiftKey &&
          document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }

      if (!event.shiftKey &&
          document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

  }, true);

  console.log("STEP 9: Project Experience pronta.");

});

document.addEventListener("DOMContentLoaded", () => {

  /* ====================================
     STEP 10 — SHARED PROJECT TRANSITION
  ==================================== */

  const work = document.querySelector(".work-world");
  const caseWorld = document.querySelector(".case-world");

  if (!work || !caseWorld) return;

  const openButton = work.querySelector(".case-open");

  const caseVisual = caseWorld.querySelector(
    ".case-visual"
  );

  const caseImage = caseWorld.querySelector(
    ".case-image"
  );

  if (!openButton || !caseVisual || !caseImage) {
    console.warn("STEP 10: elementi mancanti.");
    return;
  }

  /* ====================================
     IMPOSTAZIONI
  ==================================== */

  const desktop = window.matchMedia(
    "(min-width: 992px) and (pointer: fine)"
  );

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  const DURATION = 1.05;

  let pending = null;
  let busy = false;

  /* ====================================
     PULIZIA DELLA TRANSIZIONE
  ==================================== */

  function finishTransition() {

    if (!pending) return;

    const frame = pending.frame;

    pending = null;

    if (frame && frame.isConnected) {
      frame.remove();
    }

    // Mostriamo di nuovo l'immagine originale
    caseImage.style.removeProperty("visibility");

    // Rimuoviamo la modalità temporanea
    caseWorld.classList.remove("is-morph-opening");

    if (window.gsap) {
      gsap.set(caseWorld, {
        clearProps: "opacity"
      });
    }

    busy = false;
  }

  /* ====================================
     COSTRUZIONE DELLA COPIA TEMPORANEA
  ==================================== */

  function createFloatingImage(source, rect) {

    const frame = document.createElement("div");
    frame.className = "project-morph-frame";
    frame.setAttribute("aria-hidden", "true");

    const image = document.createElement("img");

    // Utilizziamo l'immagine già caricata
    image.src = source.currentSrc || source.src;
    image.alt = "";
    image.draggable = false;

    frame.appendChild(image);
    document.body.appendChild(frame);

    // Posizione esatta della fotografia originale
    gsap.set(frame, {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
      rotation: -4,
      transformOrigin: "center center"
    });

    return frame;
  }

  /* ====================================
     AVVIO DEL MOVIMENTO
  ==================================== */

  function startTransition() {

    if (!pending || pending.started) return;

    pending.started = true;

    // Misuriamo la posizione finale della foto
    const target = caseVisual.getBoundingClientRect();

    if (target.width <= 0 || target.height <= 0) {
      finishTransition();
      return;
    }

    const floatingFrame = pending.frame;

    const timeline = gsap.timeline({
      onComplete: finishTransition
    });

    // La nuova pagina emerge progressivamente
    timeline.to(caseWorld, {
      opacity: 1,
      duration: 0.8,
      ease: "power1.inOut"
    }, 0.12);

    // La fotografia raggiunge la posizione finale
    timeline.to(floatingFrame, {
      x: target.left,
      y: target.top,
      width: target.width,
      height: target.height,
      rotation: 0,
      borderWidth: 0,
      boxShadow: "0 0 0 rgba(0,0,0,0)",
      duration: DURATION,
      ease: "power3.inOut"
    }, 0);

  }

  /* ====================================
     OSSERVIAMO L'APERTURA DEL CASE STUDY
  ==================================== */

  const observer = new MutationObserver(() => {

    if (!pending) return;

    if (caseWorld.classList.contains("is-active")) {
      startTransition();
    }

  });

  observer.observe(caseWorld, {
    attributes: true,
    attributeFilter: ["class"]
  });

  /* ====================================
     PREPARIAMO L'ANIMAZIONE AL CLIC
  ==================================== */

  openButton.addEventListener("click", () => {

    // PHASE 93: orbital project entry bypasses the obsolete Work-to-case
    // image morph; the native case-study controller remains authoritative.
    if (document.body.classList.contains("fi93-case-route")) return;

    // Manteniamo l'animazione originale su mobile
    if (!desktop.matches) return;

    // Rispettiamo le preferenze di accessibilità
    if (reducedMotion.matches) return;

    // GSAP deve essere disponibile
    if (!window.gsap) return;

    if (busy) return;

    const visibleFrame = work.querySelector(
      ".preview-visual.is-visible"
    );

    const sourceImage = visibleFrame?.querySelector(
      ".preview-image"
    );

    if (!visibleFrame || !sourceImage) return;

    const sourceRect =
      visibleFrame.getBoundingClientRect();

    if (
      sourceRect.width <= 0 ||
      sourceRect.height <= 0
    ) return;

    busy = true;

    try {

      // Catturiamo l'immagine di partenza
      const floatingFrame = createFloatingImage(
        sourceImage,
        sourceRect
      );

      pending = {
        frame: floatingFrame,
        started: false
      };

      // La nuova scena si apre senza
      // il vecchio movimento dal basso
      caseWorld.classList.add("is-morph-opening");

      // Nascondiamo solo visivamente
      // l'immagine della scena di arrivo
      caseImage.style.visibility = "hidden";

      /*
        Non blocchiamo il clic.
        Il codice dello STEP 9 continuerà
        ad aggiornare e aprire il progetto.

        L'observer avvierà il movimento
        quando la nuova scena sarà pronta.
      */

    } catch (error) {

      console.error(
        "STEP 10: errore nella transizione",
        error
      );

      finishTransition();
      busy = false;
    }

  }, true);

  console.log("STEP 10: Shared Transition pronta.");

});

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     STEP 11.7 — SAFE CINEMATIC SCROLL
  ===================================== */

  const scene = document.querySelector(".case-world");
  if (!scene) return;

  const bar = scene.querySelector(".case-progress-fill");
  const chapter = scene.querySelector(".case-chapter");
  const chapterImage = scene.querySelector(".chapter-image");
  const heroImage = scene.querySelector(".case-image");

  if (!bar || !chapter || !chapterImage || !heroImage) {
    console.error("STEP 11: elementi mancanti", {
      bar, chapter, chapterImage, heroImage
    });
    return;
  }

  // Disattiva il vecchio sistema che
  // poteva lasciare i contenuti nascosti.
  scene.classList.remove("case-enhanced");

  scene.querySelectorAll(".case-reveal").forEach(el => {
    el.classList.remove("case-reveal", "is-visible");
  });

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  const clamp = (v, min, max) =>
    Math.min(max, Math.max(min, v));

  /* =====================================
     1 — CONTENUTI DEI PROGETTI
  ===================================== */

  const chapters = {
    redhouse: {
      eyebrow: "THE CREATIVE DIRECTION",
      headline: "DESIGNED TO BE FELT.",
      note: "A closer look at the visual identity behind Red House Studio.",
      counter: "01 / 03"
    },
    soca: {
      eyebrow: "A SENSE OF PLACE",
      headline: "SOME PLACES STAY WITH YOU.",
      note: "An exploration of nature, landscape and digital storytelling.",
      counter: "02 / 03"
    },
    gianni: {
      eyebrow: "THE ATMOSPHERE",
      headline: "MADE TO FEEL LIKE HOME.",
      note: "A visual story built around warmth, familiarity and tradition.",
      counter: "03 / 03"
    }
  };

  function syncChapter() {

    const data = chapters[
      scene.dataset.theme || "redhouse"
    ];

    if (!data) return;

    const content = [
      [".chapter-eyebrow", data.eyebrow],
      [".chapter-headline", data.headline],
      [".chapter-note", data.note],
      [".chapter-counter", data.counter]
    ];

    content.forEach(([selector, value]) => {
      const element = chapter.querySelector(selector);
      if (element) element.textContent = value;
    });

    // Recuperiamo la fotografia principale
    // già funzionante nello Step 9.
    const src =
      heroImage.getAttribute("src") ||
      heroImage.currentSrc;

    if (src) {
      chapterImage.src = src;
    }

    const srcset = heroImage.getAttribute("srcset");

    if (srcset) {
      chapterImage.srcset = srcset;
      chapterImage.sizes = "100vw";
    } else {
      chapterImage.removeAttribute("srcset");
    }

    chapterImage.alt =
      heroImage.alt || "Immagine del progetto";
  }

  /* =====================================
     2 — ELEMENTI DA ANIMARE
  ===================================== */


const revealElements = [
  ...scene.querySelectorAll([
    ".case-story .case-statement",
    ".case-story .case-info-grid",
    ".chapter-heading",
    ".chapter-note"
  ].join(","))
];

if (!reducedMotion.matches) {
  revealElements.forEach((element) => {
    element.classList.add("case-reveal-ready");
  });
}


  let revealed = new Set();
  let previousOpen =
    scene.classList.contains("is-active");

  let frameId = 0;

  /* =====================================
     3 — AGGIORNAMENTO SCROLL
  ===================================== */

  function updateOnScroll() {

    if (!scene.classList.contains("is-active")) {
      return;
    }

    // Barra di avanzamento
    const maximum = Math.max(
      1,
      scene.scrollHeight - scene.clientHeight
    );

    const fraction = clamp(
      scene.scrollTop / maximum,
      0,
      1
    );

    bar.style.transform = `scaleX(${fraction})`;

    // Zona visibile del case study
    const viewport = scene.getBoundingClientRect();

    const trigger =
      viewport.bottom -
      Math.min(110, viewport.height * 0.16);

    /* =================================
       4 — ANIMAZIONE DEI TESTI
    ================================= */

    revealElements.forEach(element => {

      if (revealed.has(element)) return;

      const rect = element.getBoundingClientRect();

      if (
        rect.top >= trigger ||
        rect.bottom <= viewport.top
      ) return;

      revealed.add(element);

revealed.add(element);
element.classList.add("is-revealed");

    });

    /* =================================
       5 — MOVIMENTO DELLA FOTOGRAFIA
    ================================= */

    if (reducedMotion.matches) {
      chapterImage.style.removeProperty("transform");
      return;
    }

    const rect = chapter.getBoundingClientRect();

    const travel =
      viewport.height + rect.height;

    const progress = clamp(
      (viewport.bottom - rect.top) / travel,
      0,
      1
    );

    // Movimento complessivo: circa 72px
    const offset = (0.5 - progress) * 72;

    // Applichiamo direttamente la trasformazione
    chapterImage.style.transform =
      `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.03)`;

  }

  /* =====================================
     6 — AGGIORNAMENTO FLUIDO
  ===================================== */

  function requestUpdate() {

    if (frameId) return;

    frameId = requestAnimationFrame(() => {
      frameId = 0;
      updateOnScroll();
    });

  }

  scene.addEventListener(
    "scroll",
    requestUpdate,
    { passive: true }
  );

  window.addEventListener("resize", requestUpdate);

  /* =====================================
     7 — APERTURA DI UN NUOVO PROGETTO
  ===================================== */

  const observer = new MutationObserver(() => {

    const opened =
      scene.classList.contains("is-active");


if (opened && !previousOpen) {

  revealed = new Set();

  // Ripristina lo stato iniziale dei testi
  revealElements.forEach((element) => {
    element.classList.remove("is-revealed");
  });

  scene.scrollTop = 0;
}


    if (opened) {
      syncChapter();
      requestUpdate();
    }

    previousOpen = opened;

  });

  observer.observe(scene, {
    attributes: true,
    attributeFilter: ["class", "data-theme"]
  });

  /* =====================================
     8 — SINCRONIZZAZIONE IMMAGINI
  ===================================== */

  const imageObserver = new MutationObserver(() => {

    if (scene.classList.contains("is-active")) {
      syncChapter();
    }

  });

  imageObserver.observe(heroImage, {
    attributes: true,
    attributeFilter: ["src", "srcset"]
  });

  if (previousOpen) {
    syncChapter();
    requestUpdate();
  }

  console.log(
    "STEP 11 — Cinematic Scroll attivo."
  );

});
