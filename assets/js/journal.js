(() => {
  /* STEP 15 — modulo autonomo, nessuna modifica agli script precedenti */
  function init() {
    const atlas = document.querySelector('.p14-world');
    const journal = document.querySelector('.p15-journal');
    const display = atlas?.querySelector('.p14-display');
    const postcard = atlas?.querySelector('.p14-postcard');
    const close = journal?.querySelector('.p15-close');
    const bottomBack = journal?.querySelector('.p15-bottom-back');
    const next = journal?.querySelector('.p15-next');
    if (!atlas || !journal || !display || !postcard || !close || !bottomBack || !next) {
      console.warn('STEP 15 — manca un elemento dello Step 14 o 15.');
      return;
    }
    if (journal.dataset.ready === 'true') return;
    journal.dataset.ready = 'true';

    // Inserisci eventualmente URL di foto caricate su Webflow Assets.
    // Lascia le stringhe vuote per conservare le illustrazioni dello Step 14.
    const entries = {
      soca: {
        hero: 'WHERE LAND<br><em>MEETS SILENCE.</em>',
        count: '01 / 03', visualCount: '001', location: 'SOČA VALLEY, SLOVENIA',
        deck: 'A study of emerald water, mountain ridges and the feeling of open space.',
        story: 'Some places<br><em>stay with you.</em>',
        lead: "It isn't always about how far you go. Sometimes it's about what a place makes you notice.",
        body: 'A landscape made of shifting greens, pale stone and the constant movement of water. An invitation to slow the pace and look closer.',
        frameA: 'THE LANDSCAPE', frameB: 'THE DETAILS',
        photos: ['', '']
      },
      london: {
        hero: 'A CITY OF<br><em>SMALL DETAILS.</em>',
        count: '02 / 03', visualCount: '002', location: 'LONDON, UNITED KINGDOM',
        deck: 'Movement, architecture and unexpected moments between busy streets.',
        story: 'Always moving.<br><em>Always changing.</em>',
        lead: 'The most interesting parts of a city are not always the famous ones.',
        body: 'London is a study in contrast: old facades and new rhythms, crowded avenues and little corners that make you stop for a second.',
        frameA: 'THE SKYLINE', frameB: 'THE STREETS',
        photos: ['', '']
      },
      kl: {
        hero: 'TROPICAL<br><em>CITY RHYTHMS.</em>',
        count: '03 / 03', visualCount: '003', location: 'KUALA LUMPUR, MALAYSIA',
        deck: 'Layers of architecture, tropical light and life at a different pace.',
        story: 'Different layers.<br><em>One city.</em>',
        lead: 'Some places are defined by the energy of everything happening at once.',
        body: 'Tall silhouettes, warm air and a mixture of old and new. Kuala Lumpur brings many visual languages together in the same frame.',
        frameA: 'THE CITYSCAPE', frameB: 'THE ATMOSPHERE',
        photos: ['', '']
      }
    };

    const order = ['soca','london','kl'];
    let active = 'soca';
    let lastFocus = null;
    const by = selector => journal.querySelector(selector);
    const put = (selector, value) => { const el = by(selector); if (el) el.textContent = value; };
    const putMarkup = (selector, markup) => { const el = by(selector); if (el) el.innerHTML = markup; };

    // Il pulsante è inserito da JS: il modulo Step 14 rimane intatto.
    const launch = document.createElement('button');
    launch.type = 'button';
    launch.className = 'p15-launch';
    launch.innerHTML = 'OPEN FIELD NOTES <span aria-hidden="true">↗</span>';
    display.appendChild(launch);

    function copyIllustration(destination, key) {
      const original = atlas.querySelector(`.p14-scene[data-scene="${key}"] svg`);
      if (!destination || !original) return;
      const svg = original.cloneNode(true);
      svg.removeAttribute('style');
      svg.setAttribute('aria-hidden', 'true');
      destination.replaceChildren(svg);
    }

    function fillPhoto(frame, url, key) {
      const fallback = frame?.querySelector('.p15-fallback');
      const img = frame?.querySelector('.p15-photo');
      if (!fallback || !img) return;
      copyIllustration(fallback, key);
      img.hidden = true;
      img.removeAttribute('src');
      img.onerror = () => { img.hidden = true; };
      if (url && /^https:\/\//i.test(url)) {
        img.src = url;
        img.hidden = false;
      }
    }

    function setEntry(key) {
      const data = entries[key];
      if (!data) return;
      active = key;
      journal.dataset.place = key;
      putMarkup('.p15-title', data.hero);
      put('.p15-count', data.count);
      put('.p15-visual-count', data.visualCount);
      put('.p15-location', data.location);
      put('.p15-deck', data.deck);
      putMarkup('.p15-story-title', data.story);
      put('.p15-story-lead', data.lead);
      put('.p15-story-text', data.body);
      put('.p15-shot-caption-a', data.frameA);
      put('.p15-shot-caption-b', data.frameB);
      copyIllustration(by('.p15-hero-visual'), key);
      fillPhoto(by('.p15-shot-a'), data.photos[0], key);
      fillPhoto(by('.p15-shot-b'), data.photos[1], key);
      const nextKey = order[(order.indexOf(key) + 1) % order.length];
      next.innerHTML = `NEXT ENTRY: ${nextKey === 'soca' ? 'SOČA' : nextKey === 'london' ? 'LONDON' : 'KUALA LUMPUR'} <span aria-hidden="true">↗</span>`;
    }

    // Tieni sincronizzato l'atlante se dal journal si passa all'entry successiva.
    function syncAtlas(key) {
      const button = atlas.querySelector(`.p14-choice[data-target="${key}"]`);
      if (button) button.dispatchEvent(new MouseEvent('click', { bubbles:true }));
    }

    function updateProgress() {
      const max = Math.max(1, journal.scrollHeight - journal.clientHeight);
      const value = Math.min(1, Math.max(0, journal.scrollTop / max));
      by('.p15-progress-fill').style.transform = `scaleX(${value})`;
    }

    function openJournal() {
      if (!atlas.classList.contains('is-active') || journal.classList.contains('is-open')) return;
      lastFocus = document.activeElement;
      const chosen = atlas.dataset.place || 'soca';
      setEntry(chosen);
      journal.scrollTop = 0;
      updateProgress();
      journal.inert = false;
      journal.setAttribute('aria-hidden','false');
      journal.classList.add('is-open');
      atlas.inert = true;
      atlas.setAttribute('aria-hidden','true');
      close.focus({preventScroll:true});
    }

    function closeJournal() {
      if (!journal.classList.contains('is-open')) return;
      atlas.inert = false;
      atlas.setAttribute('aria-hidden','false');
      const focusTarget = (lastFocus && lastFocus.isConnected) ? lastFocus : launch;
      focusTarget.focus({preventScroll:true});
      journal.classList.remove('is-open');
      journal.inert = true;
      journal.setAttribute('aria-hidden','true');
    }

    launch.addEventListener('click', openJournal);
    close.addEventListener('click', closeJournal);
    bottomBack.addEventListener('click', closeJournal);
    next.addEventListener('click', () => {
      const following = order[(order.indexOf(active)+1) % order.length];
      setEntry(following);
      syncAtlas(following);
      journal.scrollTo({top:0,behavior:'auto'});
      updateProgress();
      close.focus({preventScroll:true});
    });
    journal.addEventListener('scroll', () => requestAnimationFrame(updateProgress), {passive:true});
    window.addEventListener('resize', updateProgress);

    // Capture: ESC chiude solo il journal, non anche lo Step 14.
    document.addEventListener('keydown', event => {
      if (journal.classList.contains('is-open')) {
        if (event.key === 'Escape') {
          event.preventDefault(); event.stopImmediatePropagation(); closeJournal(); return;
        }
        if (event.key === 'Tab') {
          const focusables = [close,next,bottomBack].filter(el => !el.disabled);
          const first = focusables[0], last = focusables[focusables.length-1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault(); last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault(); first.focus();
          }
        }
        return;
      }
      // Correggi il Tab trap dello Step 14, che non conosce il nuovo pulsante.
      if (!atlas.classList.contains('is-active') || event.key !== 'Tab') return;
      const lastChoice = atlas.querySelector('.p14-choice:last-child');
      const atlasBack = atlas.querySelector('.p14-back');
      if (!event.shiftKey && document.activeElement === lastChoice) {
        event.preventDefault(); event.stopImmediatePropagation(); launch.focus();
      } else if (!event.shiftKey && document.activeElement === launch) {
        event.preventDefault(); event.stopImmediatePropagation(); atlasBack.focus();
      } else if (event.shiftKey && document.activeElement === atlasBack) {
        event.preventDefault(); event.stopImmediatePropagation(); launch.focus();
      } else if (event.shiftKey && document.activeElement === launch) {
        event.preventDefault(); event.stopImmediatePropagation(); lastChoice.focus();
      }
    },true);

    journal.inert = true;
    journal.setAttribute('aria-hidden','true');
    setEntry('soca');
    console.log('STEP 15 — TRAVEL JOURNAL pronto.');
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
