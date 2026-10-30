(() => {
  // STEP 14 — PLACES: una logica indipendente, niente GSAP
  const hub = document.querySelector('.world-hub');
  const scene = document.querySelector('.p14-world');
  const opener = [...(hub?.querySelectorAll('.world-link') || [])]
    .find(link => link.querySelector('.world-name')?.textContent.trim().toUpperCase() === 'PLACES');
  if (!hub || !scene || !opener || scene.dataset.ready === 'true') {
    if (!opener) console.warn('PLACES: non trovo il link PLACES nella homepage.');
    return;
  }
  scene.dataset.ready = 'true';
  const back = scene.querySelector('.p14-back');
  const buttons = [...scene.querySelectorAll('.p14-choice')];
  const title = scene.querySelector('.p14-card-title');
  const country = scene.querySelector('.p14-country');
  const counter = scene.querySelector('.p14-card-counter');
  const index = scene.querySelector('.p14-below-index');
  const note = scene.querySelector('.p14-note');
  const places = {
    soca: {title:'SOČA VALLEY',country:'SLOVENIA / NATURE',counter:'01 — 03',index:'ENTRY 001 / 003',note:'Mountains, emerald water and the feeling of being completely elsewhere.'},
    london: {title:'LONDON',country:'UNITED KINGDOM / CITY',counter:'02 — 03',index:'ENTRY 002 / 003',note:'Fast streets, unexpected details and an energy that never quite stops.'},
    kl: {title:'KUALA LUMPUR',country:'MALAYSIA / CITY',counter:'03 — 03',index:'ENTRY 003 / 003',note:'Tropical evenings, contrasts and a different rhythm of everyday life.'}
  };
  function choose(key) {
    const data = places[key];
    if (!data) return;
    scene.dataset.place = key;
    title.textContent = data.title;
    country.textContent = data.country;
    counter.textContent = data.counter;
    index.textContent = data.index;
    note.textContent = data.note;
    buttons.forEach(button => {
      const selected = button.dataset.target === key;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
  }
  function openPlaces(event) {
    if (event) event.preventDefault();
    if (scene.classList.contains('is-active')) return;
    scene.scrollTop = 0;
    scene.inert = false;
    scene.setAttribute('aria-hidden', 'false');
    scene.classList.add('is-active');
    document.body.classList.add('is-places-open');
    hub.inert = true;
    back.focus({preventScroll:true});
  }
  function closePlaces(event) {
    if (event) event.preventDefault();
    if (!scene.classList.contains('is-active')) return;
    hub.inert = false;
    opener.focus({preventScroll:true});
    scene.classList.remove('is-active');
    scene.inert = true;
    scene.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('is-places-open');
  }
  opener.addEventListener('click', openPlaces);
  back.addEventListener('click', closePlaces);
  buttons.forEach(button => button.addEventListener('click', () => choose(button.dataset.target)));
  document.addEventListener('keydown', event => {
    if (!scene.classList.contains('is-active')) return;
    if (event.key === 'Escape') {event.preventDefault();closePlaces();return;}
    if (event.key === 'Tab') {
      const first = back, last = buttons[buttons.length-1];
      if (event.shiftKey && document.activeElement === first) {event.preventDefault();last.focus();}
      else if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first.focus();}
    }
  });
  choose('soca');
  console.log('STEP 14 — PLACES pronto.');
})();
