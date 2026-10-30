document.addEventListener("DOMContentLoaded", () => {

  /* ======================================
     STEP 12 — SOUND ROOM ENGINE
  ====================================== */

  const hub = document.querySelector(".world-hub");
  const sound = document.querySelector(".sound-world");

  const links = [
    ...document.querySelectorAll(".world-link")
  ];

  const opener = links[1];

  if (!hub || !sound || !opener) {
    console.warn("STEP 12: struttura mancante");
    return;
  }

  const back = sound.querySelector(".sound-back");

  const moodButtons = [
    ...sound.querySelectorAll(".sound-mood")
  ];

  const current = sound.querySelector(".sound-current");
  const description = sound.querySelector(
    ".sound-description"
  );
  const side = sound.querySelector(".sound-side");

  if (
    !back ||
    !current ||
    !description ||
    !side ||
    moodButtons.length !== 3
  ) {
    console.warn("STEP 12: elementi SOUND mancanti");
    return;
  }

  /* ======================================
     1 — I TRE UNIVERSI MUSICALI
  ====================================== */

  const moods = {

    soul: {
      name: "SOUL",
      description:
        "Warm records, quiet nights and timeless voices.",
      side: "SIDE A / 001"
    },

    hiphop: {
      name: "HIP-HOP",
      description:
        "Rhythm, storytelling and fearless production.",
      side: "SIDE B / 002"
    },

    alternative: {
      name: "ALTERNATIVE",
      description:
        "Unexpected textures and sounds that stay with you.",
      side: "SIDE C / 003"
    }

  };

  /* ======================================
     2 — CAMBIO DEL GENERE MUSICALE
  ====================================== */

  function selectMood(key) {

    const data = moods[key];

    if (!data) return;

    // Cambiamo il colore e la direzione visiva
    sound.dataset.mood = key;

    // Aggiorniamo i testi
    current.textContent = data.name;
    description.textContent = data.description;
    side.textContent = data.side;

    // Aggiorniamo il genere selezionato
    moodButtons.forEach((button) => {

      const selected = button.dataset.mood === key;

      button.classList.toggle("is-current", selected);

      button.setAttribute(
        "aria-pressed",
        String(selected)
      );

    });

  }

  /* ======================================
     3 — APERTURA DI SOUND
  ====================================== */

  function openSound(event) {

    if (event) event.preventDefault();

    if (sound.classList.contains("is-active")) {
      return;
    }

    // Riportiamo il contenuto all'inizio
    sound.scrollTop = 0;

    // Rendiamo accessibile la nuova scena
    sound.inert = false;
    sound.setAttribute("aria-hidden", "false");

    // Avviamo la transizione
    sound.classList.add("is-active");
    document.body.classList.add("is-sound-open");

    // Disattiviamo l'hub sottostante
    hub.inert = true;

    // Spostiamo il focus sul pulsante di ritorno
    back.focus({ preventScroll: true });
  }

  /* ======================================
     4 — RITORNO ALL'HUB
  ====================================== */

  function closeSound(event) {

    if (event) event.preventDefault();

    if (!sound.classList.contains("is-active")) {
      return;
    }

    // Riattiviamo la homepage
    hub.inert = false;

    // Ripristiniamo il focus su SOUND
    opener.focus({ preventScroll: true });

    // Chiudiamo l'ambiente
    sound.classList.remove("is-active");

    sound.inert = true;
    sound.setAttribute("aria-hidden", "true");

    document.body.classList.remove("is-sound-open");
  }

  /* ======================================
     5 — INTERAZIONI
  ====================================== */

  // Secondo link della homepage: SOUND
  opener.addEventListener("click", openSound);

  // Torna alla homepage
  back.addEventListener("click", closeSound);

  // Le tre scelte musicali
  moodButtons.forEach((button) => {

    button.addEventListener("click", () => {
      selectMood(button.dataset.mood);
    });

  });

  /* ======================================
     6 — TASTIERA
  ====================================== */

  document.addEventListener("keydown", (event) => {

    if (!sound.classList.contains("is-active")) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeSound();
      return;
    }

    // Mantiene la navigazione da tastiera
    // dentro SOUND quando è aperto.
    if (event.key === "Tab") {

      const first = back;
      const last = moodButtons[moodButtons.length - 1];

      if (event.shiftKey &&
          document.activeElement === first) {

        event.preventDefault();
        last.focus();

      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {

        event.preventDefault();
        first.focus();
      }

    }

  });

  /* ======================================
     7 — STATO INIZIALE
  ====================================== */

  sound.inert = true;
  sound.setAttribute("aria-hidden", "true");

  selectMood("soul");

  console.log("STEP 12 — SOUND ROOM pronta");

});

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     STEP 13 — RECORD SHELF ENGINE
  ===================================== */

  const sound = document.querySelector(".sound-world");
  if (!sound) return;

  const archive = sound.querySelector(".sound-archive");
  const opener = sound.querySelector(
    ".sound-enter-archive"
  );

  if (!archive || !opener) {
    console.warn("STEP 13: elementi mancanti");
    return;
  }

  const back = archive.querySelector(".sa-back");

  const buttons = [
    ...archive.querySelectorAll(".sa-item")
  ];

  const art = archive.querySelector(".sa-art");

  const mark = archive.querySelector(".sa-art-mark");
  const artTop = archive.querySelector(".sa-art-top");

  const number = archive.querySelector(
    ".sa-detail-index"
  );

  const title = archive.querySelector(
    ".sa-detail-title"
  );

  const artist = archive.querySelector(
    ".sa-detail-artist"
  );

  const note = archive.querySelector(
    ".sa-detail-note"
  );

  const tag = archive.querySelector(
    ".sa-detail-tag"
  );

  if (
    !back || !art || !mark || !artTop ||
    !number || !title || !artist ||
    !note || !tag || buttons.length !== 3
  ) {
    console.warn("STEP 13: archivio incompleto");
    return;
  }

  /* =====================================
     1 — CONTENUTI DEGLI ALBUM
  ===================================== */

  const records = {
    soul: {
      title: "Mama's Gun",
      artist: "Erykah Badu",
      year: "2000",
      mark: "MG.",
      number: "RECORD 01 / 03",
      tag: "SOUL / NEO-SOUL",
      note:
        "Warm, layered and expressive. A study in rhythm, atmosphere and organic sound."
    },

    hiphop: {
      title: "The Blueprint",
      artist: "JAY-Z",
      year: "2001",
      mark: "BP.",
      number: "RECORD 02 / 03",
      tag: "HIP-HOP",
      note:
        "Sharp production, confident rhythm and storytelling. A landmark sound with a distinct identity."
    },

    alternative: {
      title: "Absolutely",
      artist: "Dijon",
      year: "2021",
      mark: "AB.",
      number: "RECORD 03 / 03",
      tag: "ALTERNATIVE / R&B",
      note:
        "Intimate textures, raw expression and unconventional arrangements. Music with a personal atmosphere."
    }
  };

  /* =====================================
     2 — SELEZIONE ALBUM
  ===================================== */

  let selected = "soul";

  function selectRecord(key) {

    const data = records[key];
    if (!data) return;

    selected = key;

    title.textContent = data.title;
    artist.textContent =
      data.artist + " — " + data.year;

    note.textContent = data.note;
    tag.textContent = data.tag;
    number.textContent = data.number;
    mark.textContent = data.mark;

    artTop.textContent =
      "LM® — VISUAL STUDY / " +
      data.number.split(" ")[1];

    art.classList.remove(
      "sa-art--soul",
      "sa-art--hiphop",
      "sa-art--alternative"
    );

    art.classList.add("sa-art--" + key);

    buttons.forEach(button => {

      const active =
        button.dataset.record === key;

      button.classList.toggle(
        "is-selected",
        active
      );

      button.setAttribute(
        "aria-pressed",
        String(active)
      );

    });
  }

  /* =====================================
     3 — ELEMENTI DELLA SCHERMATA SOUND
  ===================================== */

  const backgroundParts = [
    ...sound.children
  ].filter(element => element !== archive);

  function openArchive() {

    if (archive.classList.contains("is-open")) {
      return;
    }

    // Il genere scelto nel vinile determina
    // quale album vediamo inizialmente.
    selectRecord(sound.dataset.mood || "soul");

    archive.scrollTop = 0;

    archive.inert = false;
    archive.setAttribute("aria-hidden", "false");
    archive.classList.add("is-open");

    // Disattiva i controlli dietro l'archivio
    backgroundParts.forEach(part => {
      part.inert = true;
    });

    back.focus({ preventScroll: true });
  }

  function closeArchive() {

    if (!archive.classList.contains("is-open")) {
      return;
    }

    // Riattiva la schermata precedente
    backgroundParts.forEach(part => {
      part.inert = false;
    });

    opener.focus({ preventScroll: true });

    archive.classList.remove("is-open");
    archive.inert = true;
    archive.setAttribute("aria-hidden", "true");
  }

  /* =====================================
     4 — INTERAZIONI
  ===================================== */

  opener.addEventListener("click", openArchive);

  back.addEventListener("click", closeArchive);

  buttons.forEach(button => {

    button.addEventListener("click", () => {
      selectRecord(button.dataset.record);
    });

  });

  /* =====================================
     5 — ACCESSIBILITÀ E TASTIERA
  ===================================== */

  document.addEventListener("keydown", event => {

    if (!archive.classList.contains("is-open")) {
      return;
    }

    // Intercetta ESC prima del codice dello
    // Step 12, evitando di chiudere SOUND.
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopImmediatePropagation();
      closeArchive();
      return;
    }

    if (event.key === "Tab") {

      const first = back;
      const last = buttons[buttons.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === first
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    }

  }, true);

  /* =====================================
     6 — STATO INIZIALE
  ===================================== */

  archive.inert = true;
  archive.setAttribute("aria-hidden", "true");

  selectRecord("soul");

  console.log("STEP 13 — Record Shelf pronta");

});
