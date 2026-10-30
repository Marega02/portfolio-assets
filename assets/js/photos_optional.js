(() => {
  /* ================================================
     STEP 16 — INCOLLA SOLO I LINK DELLE TUE FOTO
     Lascia "" per usare l'illustrazione originale.
     I link devono iniziare con https://
     ================================================ */
  const PHOTOS = {
    soca: {
      atlas:  "",  // cartolina dell'atlante (facoltativa: usa hero se vuota)
      hero:   "",  // grande foto iniziale del diario
      frameA: "",  // prima foto di THE FRAME
      frameB: ""   // seconda foto di THE FRAME
    },
    london: {
      atlas:  "",
      hero:   "",
      frameA: "",
      frameB: ""
    },
    kl: {
      atlas:  "",
      hero:   "",
      frameA: "",
      frameB: ""
    }
  };

  function init() {
    const atlas = document.querySelector('.p14-world');
    const journal = document.querySelector('.p15-journal');
    const postcard = atlas?.querySelector('.p14-postcard');
    const heroFigure = journal?.querySelector('.p15-hero-figure');
    const heroVisual = heroFigure?.querySelector('.p15-hero-visual');
    if (!atlas || !journal || !postcard || !heroFigure || !heroVisual) {
      console.warn('STEP 16 — STEP 14 o 15 non trovato.');
      return;
    }
    if (document.documentElement.dataset.p16Ready === 'true') return;
    document.documentElement.dataset.p16Ready = 'true';

    function createPhoto(className, container, before) {
      const img = document.createElement('img');
      img.className = className;
      img.alt = '';
      img.decoding = 'async';
      img.setAttribute('aria-hidden','true');
      container.insertBefore(img, before || null);
      return img;
    }

    const atlasPhoto = createPhoto(
      'p16-atlas-photo', postcard,
      postcard.querySelector('.p14-postcard-shade')
    );
    const heroPhoto = createPhoto(
      'p16-hero-photo', heroFigure,
      heroVisual.nextSibling
    );
    const frameA = journal.querySelector('.p15-shot-a .p15-photo');
    const frameB = journal.querySelector('.p15-shot-b .p15-photo');
    if (!frameA || !frameB) {
      console.warn('STEP 16 — non trovo le due immagini di gallery.');
      return;
    }

    // Evita foto della destinazione precedente durante i caricamenti.
    const generations = new WeakMap();
    function showPhoto(img, url) {
      if (!img) return;
      const current = (generations.get(img) || 0) + 1;
      generations.set(img, current);
      const validUrl = typeof url === 'string' && /^https:\/\//i.test(url.trim());
      const cleanUrl = validUrl ? url.trim() : '';

      if (!cleanUrl) {
        img.classList.remove('is-loaded');
        img.hidden = true;
        img.removeAttribute('src');
        img.dataset.photoUrl = '';
        return;
      }

      // Se la foto è già pronta, evita un secondo caricamento.
      if (img.dataset.photoUrl === cleanUrl && img.getAttribute('src') === cleanUrl && !img.hidden) {
        return;
      }

      img.classList.remove('is-loaded');
      img.hidden = true;
      img.removeAttribute('src');
      img.dataset.photoUrl = '';

      // Precarica prima di mostrare, così il fallback non lampeggia.
      const preload = new Image();
      preload.decoding = 'async';
      preload.onload = () => {
        if (generations.get(img) !== current) return;
        img.src = cleanUrl;
        img.hidden = false;
        img.dataset.photoUrl = cleanUrl;
        requestAnimationFrame(() => img.classList.add('is-loaded'));
      };
      preload.onerror = () => {
        if (generations.get(img) !== current) return;
        img.hidden = true;
        console.warn('STEP 16 — impossibile caricare una foto:', cleanUrl);
      };
      preload.src = cleanUrl;
    }

    function updateAtlas() {
      if (!atlas.classList.contains('is-active')) return;
      const key = atlas.dataset.place || 'soca';
      const data = PHOTOS[key] || {};
      showPhoto(atlasPhoto, data.atlas || data.hero || '');
    }

    function updateJournal() {
      if (!journal.classList.contains('is-open')) return;
      const key = journal.dataset.place || 'soca';
      const data = PHOTOS[key] || {};
      showPhoto(heroPhoto, data.hero || '');
      // Il codice dello Step 15 crea sempre i due fallback illustrati.
      // Interveniamo solo dopo il suo aggiornamento.
      showPhoto(frameA, data.frameA || '');
      showPhoto(frameB, data.frameB || '');
      const note = journal.querySelector('.p15-gallery-note');
      if (note) {
        note.textContent = (data.frameA || data.frameB)
          ? 'PERSONAL PHOTO ARCHIVE / Two perspectives on this place.'
          : 'The illustrations are temporary visual studies. Personal photographs can replace them without changing the layout.';
      }
    }

    // Raggruppa i cambi di stato nella stessa microtask.
    let updatePending = false;
    function scheduleSync() {
      if (updatePending) return;
      updatePending = true;
      queueMicrotask(() => {
        updatePending = false;
        updateAtlas();
        updateJournal();
      });
    }
    new MutationObserver(scheduleSync).observe(atlas, {
      attributes:true, attributeFilter:['class','data-place']
    });
    new MutationObserver(scheduleSync).observe(journal, {
      attributes:true, attributeFilter:['class','data-place']
    });
    scheduleSync();
    console.log('STEP 16 — PERSONAL PHOTO ARCHIVE pronto.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, {once:true});
  } else init();
})();
