/* STEP 74 — JS BUNDLE 1 OF 4. Execution order preserved, originals kept. */

/* SOURCE assets/js/places.js */
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

;


/* SOURCE assets/js/journal.js */
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

;


/* SOURCE assets/js/about.js */
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

;


/* SOURCE assets/js/world-index.js */
/* STEP 19 — WORLD INDEX; no modifications to worlds */
(() => {
  function setup() {
    const root=document.querySelector(".w19-root"),hub=document.querySelector(".world-hub");
    if(!root||!hub||root.dataset.w19Ready==="true")return;
    const trigger=root.querySelector(".w19-trigger"),drawer=root.querySelector(".w19-drawer"),backdrop=root.querySelector(".w19-backdrop"),close=root.querySelector(".w19-close");
    const links=[...root.querySelectorAll(".w19-link")],worldLinks=[...hub.querySelectorAll(".world-link")];
    if(!trigger||!drawer||!backdrop||!close||links.length!==4||worldLinks.length<4)return;
    root.dataset.w19Ready="true";let open=false,restoreInert=null,navigationPending=false;
    const isVisible=(selector,activeClass)=>Boolean(document.querySelector(selector)?.classList.contains(activeClass));
    const activeWorld=()=>{
      if(isVisible(".case-world","is-active")||isVisible(".work-world","is-active"))return "work";
      if(isVisible(".sound-world","is-active"))return "sound";
      if(isVisible(".p14-world","is-active"))return "places";
      if(isVisible(".a17-world","is-active"))return "about";
      return "hub";
    };
    const sceneForLock=()=>{
      if(isVisible(".case-world","is-active"))return document.querySelector(".case-world");
      if(isVisible(".sound-archive","is-open"))return document.querySelector(".sound-archive");
      if(isVisible(".p15-journal","is-open"))return document.querySelector(".p15-journal");
      const key=activeWorld();
      return key==="work"?document.querySelector(".work-world"):key==="sound"?document.querySelector(".sound-world"):key==="places"?document.querySelector(".p14-world"):key==="about"?document.querySelector(".a17-world"):hub;
    };
    function show(){
      if(open||navigationPending)return;
      open=true;const current=activeWorld();
      links.forEach(link=>{const active=link.dataset.w19Target===current;link.classList.toggle("is-current",active);link.setAttribute("aria-current",active?"page":"false")});
      const scene=sceneForLock();
      if(scene){restoreInert={scene,wasInert:scene.inert};scene.inert=true;}
      root.classList.add("is-open");drawer.inert=false;drawer.setAttribute("aria-hidden","false");trigger.setAttribute("aria-expanded","true");
      close.focus({preventScroll:true});
    }
    function hide(){
      if(!open)return;
      open=false;root.classList.remove("is-open");drawer.inert=true;drawer.setAttribute("aria-hidden","true");trigger.setAttribute("aria-expanded","false");
      if(restoreInert){restoreInert.scene.inert=restoreInert.wasInert;restoreInert=null;}
      trigger.focus({preventScroll:true});
    }
    function clickBack(selector){const el=document.querySelector(selector);if(el)el.click();}
    function exitCurrent(){
      if(isVisible(".case-world","is-active"))clickBack(".case-world .case-back");
      if(isVisible(".sound-archive","is-open"))clickBack(".sound-archive .sa-back");
      if(isVisible(".p15-journal","is-open"))clickBack(".p15-journal .p15-close");
      if(isVisible(".work-world","is-active"))clickBack(".work-world .work-back");
      else if(isVisible(".sound-world","is-active"))clickBack(".sound-world .sound-back");
      else if(isVisible(".p14-world","is-active"))clickBack(".p14-world .p14-back");
      else if(isVisible(".a17-world","is-active"))clickBack(".a17-world .a17-back");
    }
    function navigate(target){
      if(navigationPending)return;
      const map={work:0,sound:1,places:2,about:3};
      if(!(target in map))return;
      const current=activeWorld();
      hide();
      if(current===target)return;
      const next=worldLinks[map[target]];if(!next)return;
      navigationPending=true;
      if(current!=="hub")exitCurrent();
      const reduced=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      const delay=current==="hub"||reduced?0:1060;
      window.setTimeout(()=>{
        navigationPending=false;
        if(hub.inert)return;
        next.click();
      },delay);
    }
    trigger.addEventListener("click",show);
    close.addEventListener("click",hide);
    backdrop.addEventListener("click",hide);
    links.forEach(link=>link.addEventListener("click",()=>navigate(link.dataset.w19Target)));
    window.addEventListener("keydown",event=>{
      if(!open)return;
      if(event.key==="Escape"){event.preventDefault();event.stopImmediatePropagation();hide();return;}
      if(event.key!=="Tab")return;
      const focusables=[...drawer.querySelectorAll("button:not([disabled]),a[href],input:not([disabled]),[tabindex]:not([tabindex='-1'])")].filter(el=>el.getClientRects().length>0);
      if(!focusables.length)return;
      const first=focusables[0],last=focusables[focusables.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    },true);
    drawer.inert=true;drawer.setAttribute("aria-hidden","true");
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",setup,{once:true});
  else setup();
})();
;


/* SOURCE assets/js/editorial-work.js */
/* STEP 23 — WORK EDITORIAL LAYER
 * Non-destructive enhancement, no changes to existing project listeners.
 */
(() => {
  function init(){
    const work=document.querySelector(".work-world");
    if(!work||work.classList.contains("s23-ready"))return;
    const top=work.querySelector(".work-top");
    const main=work.querySelector(".work-main");
    const preview=work.querySelector(".work-preview");
    const projects=[...work.querySelectorAll(".work-project")];
    const list=work.querySelector(".work-projects");
    if(!top||!main||!preview||projects.length!==3||!list)return;

    const back=top.querySelector(".work-back");
    const edition=document.createElement("span");
    edition.className="s23-top-edition";
    edition.textContent="EDITION 001 / SELECTED EXPERIENCES";
    if(back)top.insertBefore(edition,back);
    else top.appendChild(edition);

    const hero=document.createElement("div");
    hero.className="s23-hero-index";
    hero.setAttribute("aria-hidden","true");
    hero.textContent="W.";
    main.appendChild(hero);

    const decor=document.createElement("div");
    decor.className="s23-preview-decor";
    decor.setAttribute("aria-hidden","true");
    preview.prepend(decor);
    const coordinates=document.createElement("span");
    coordinates.className="s23-preview-coordinates";
    coordinates.setAttribute("aria-hidden","true");
    coordinates.textContent="LM / CASE FILE 001";
    preview.appendChild(coordinates);

    const cue=document.createElement("div");
    cue.className="s23-project-cue";
    cue.setAttribute("aria-hidden","true");
    cue.textContent="01 / 03 — SELECT AN EXPERIENCE";
    const track=document.createElement("div");
    track.className="s23-progress";
    track.setAttribute("aria-hidden","true");
    const bar=document.createElement("div");
    bar.className="s23-progress-bar";
    track.appendChild(bar);
    // Avoid introducing extra children to .work-projects, as its layout relies on three items.
    preview.appendChild(track);
    preview.appendChild(cue);
    const names=["RED HOUSE STUDIO","SOČA VALLEY","TRATTORIA DA GIANNI"];
    function sync(){
      const current=projects.findIndex(x=>x.classList.contains("is-current"));
      const idx=current<0?0:current;
      coordinates.textContent="LM / CASE FILE 00"+(idx+1);
      cue.textContent="0"+(idx+1)+" / 03 — "+names[idx];
      bar.style.transform="scaleX("+((idx+1)/3).toFixed(6)+")";
    }
    projects.forEach((p,i)=>{
      p.addEventListener("pointerenter",()=>{ if(!p.classList.contains("is-current"))return;sync();},{passive:true});
      p.addEventListener("focusin",sync);
    });
    const observer=new MutationObserver(sync);
    projects.forEach(p=>observer.observe(p,{attributes:true,attributeFilter:["class"]}));
    sync();
    work.classList.add("s23-ready");
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();

;


/* SOURCE assets/js/analog-frequencies.js */
/* STEP 24 — ANALOG FREQUENCIES. Visual-only; no audio or altered open/back handlers. */
(() => {
  function init(){
    const sound=document.querySelector(".sound-world");
    const art=sound?.querySelector(".sound-art");
    const copy=sound?.querySelector(".sound-copy");
    const top=sound?.querySelector(".sound-top");
    const archive=sound?.querySelector(".sound-archive");
    const cover=archive?.querySelector(".sa-art");
    const feature=archive?.querySelector(".sa-feature");
    const moodButtons=sound?[...sound.querySelectorAll(".sound-mood")]:[];
    if(!sound||!art||!copy||!top||!archive||!cover||!feature||moodButtons.length!==3||sound.classList.contains("s24-ready"))return;
    const edition=document.createElement("span");
    edition.className="s24-edition";
    edition.textContent="ARCHIVE EDITION / 002";
    const back=top.querySelector(".sound-back");
    if(back)top.insertBefore(edition,back);else top.append(edition);
    const spectrum=document.createElement("div");
    spectrum.className="s24-current-spectrum";
    spectrum.setAttribute("aria-hidden","true");
    const label=document.createElement("span");
    label.className="s24-spectrum-label";
    label.innerHTML="<strong>SIGNAL / SOUL</strong><small>ANALOG IMPRESSION · 33⅓ RPM</small>";
    const bars=document.createElement("span");
    bars.className="s24-spectrum";
    const seeds=[19,32,45,27,54,73,45,64,28,37,75,92,60,46,75,36,51,68,31,58,42,24,46,77,35,64,41,29];
    for(const height of seeds){
      const el=document.createElement("i");
      el.style.setProperty("--s24-height",height+"%");
      bars.append(el);
    }
    spectrum.append(label,bars);
    const archiveButton=copy.querySelector(".sound-enter-archive");
    if(archiveButton)copy.insertBefore(spectrum,archiveButton);else copy.append(spectrum);
    const ring=document.createElement("div");
    ring.className="s24-technical-ring";
    ring.setAttribute("aria-hidden","true");
    const stamp=document.createElement("div");
    stamp.className="s24-side-stamp";
    stamp.setAttribute("aria-hidden","true");
    stamp.innerHTML="REFERENCE <b>001</b> / 003";
    const counter=document.createElement("div");
    counter.className="s24-counter";
    counter.setAttribute("aria-hidden","true");
    counter.innerHTML="<strong>01</strong><small>SELECT YOUR FREQUENCY</small>";
    art.prepend(ring,stamp,counter);
    const overlay=document.createElement("div");
    overlay.className="s24-art-overlay";
    overlay.setAttribute("aria-hidden","true");
    cover.prepend(overlay);
    const folio=document.createElement("div");
    folio.className="s24-record-folio";
    folio.setAttribute("aria-hidden","true");
    folio.innerHTML="<span>FIELD NOTES / VOL. 01</span><b>01 / 03</b>";
    const detail=feature.querySelector(".sa-detail");
    if(detail)feature.insertBefore(folio,detail);else feature.append(folio);

    const moodNames={soul:"SOUL",hiphop:"HIP-HOP",alternative:"ALTERNATIVE"};
    const moodNums={soul:1,hiphop:2,alternative:3};
    const strong=label.querySelector("strong");
    const digit=counter.querySelector("strong");
    const folioNum=folio.querySelector("b");
    const artHeader=cover.querySelector(".sa-art-top");
    function sync(){
      const mood=sound.dataset.mood||"soul";
      const n=moodNums[mood]||1;
      strong.textContent="SIGNAL / "+(moodNames[mood]||"SOUL");
      digit.textContent=String(n).padStart(2,"0");
      stamp.innerHTML="REFERENCE <b>"+String(n).padStart(3,"0")+"</b> / 003";
      bars.querySelectorAll("i").forEach((bar,i)=>{
        let factor=mood==="hiphop"?((i*7+13)%21):mood==="alternative"?((i*11+5)%19):0;
        const height=Math.max(12,Math.min(95,seeds[i]+factor-(mood==="hiphop"?7:3)));
        bar.style.setProperty("--s24-height",height+"%");
      });
      const selected=archive.querySelector(".sa-item.is-selected");
      if(selected){
        const id=selected.dataset.record;
        folioNum.textContent=String(moodNums[id]||1).padStart(2,"0")+" / 03";
      }
    }
    const observer=new MutationObserver(sync);
    observer.observe(sound,{attributes:true,attributeFilter:["data-mood"]});
    archive.querySelectorAll(".sa-item").forEach(btn=>observer.observe(btn,{attributes:true,attributeFilter:["class"]}));
    sync();
    sound.classList.add("s24-ready");
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();
;


/* SOURCE assets/js/living-atlas.js */
/* STEP 25 — THE LIVING ATLAS
   Decorative scene synchronization only.
   The route is a stylized index, NOT a geographic map.
   Coordinates are approximate regional/city references.
*/
(() => {
  function init() {
    const atlas = document.querySelector(".p14-world");
    const journal = document.querySelector(".p15-journal");
    const copy = atlas?.querySelector(".p14-copy");
    const display = atlas?.querySelector(".p14-display");
    const postcard = atlas?.querySelector(".p14-postcard");
    const shade = postcard?.querySelector(".p14-postcard-shade");
    const heroCopy = journal?.querySelector(".p15-hero-copy");
    const heroFigure = journal?.querySelector(".p15-hero-figure");
    if (!atlas || !journal || !copy || !display || !postcard || !shade || !heroCopy || !heroFigure || atlas.classList.contains("s25-ready")) return;

    const data = {
      soca: {n:"01", coord:"46.34° N  /  13.55° E", code:"SI — 001", region:"ALPINE TERRAIN"},
      london: {n:"02", coord:"51.51° N  /  0.13° W", code:"GB — 002", region:"URBAN TEXTURES"},
      kl: {n:"03", coord:"3.14° N  /  101.69° E", code:"MY — 003", region:"TROPICAL CITY"}
    };

    const ledger = document.createElement("div");
    ledger.className = "p25-ledger";
    ledger.setAttribute("aria-label", "Travel route index");
    ledger.innerHTML = [
      '<div class="p25-ledger-heading"><span>AN ATLAS OF THREE IMPRESSIONS</span><strong>ROUTE / 001—003</strong></div>',
      '<div class="p25-map" role="img" aria-label="Stylized sequence of three places, not a geographic route map">',
      '<svg viewBox="0 0 370 75" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">',
      '<path class="p25-route-path" d="M35 40 C94 6 110 67 185 39 S297 9 335 39"/>',
      '<g class="p25-route-pin is-current" data-p25-place="soca"><circle class="p25-route-dot" cx="35" cy="40" r="5"/><text x="35" y="18" text-anchor="middle">SOČA</text><text x="35" y="65" text-anchor="middle">01</text></g>',
      '<g class="p25-route-pin" data-p25-place="london"><circle class="p25-route-dot" cx="185" cy="39" r="5"/><text x="185" y="18" text-anchor="middle">LONDON</text><text x="185" y="65" text-anchor="middle">02</text></g>',
      '<g class="p25-route-pin" data-p25-place="kl"><circle class="p25-route-dot" cx="335" cy="39" r="5"/><text x="335" y="18" text-anchor="middle">KL</text><text x="335" y="65" text-anchor="middle">03</text></g>',
      '</svg></div>',
      '<div class="p25-ledger-bottom"><span class="p25-coordinates">46.34° N / 13.55° E</span><span class="p25-route-note">APPROXIMATE REFERENCE</span></div>'
    ].join("");
    copy.appendChild(ledger);

    const traces = document.createElement("div");
    traces.className = "p25-card-traces";
    traces.setAttribute("aria-hidden", "true");
    const cardSide = document.createElement("span");
    cardSide.className = "p25-card-side";
    cardSide.setAttribute("aria-hidden", "true");
    cardSide.textContent = "LOCATION STUDY / 001";
    postcard.insertBefore(traces, shade);
    postcard.insertBefore(cardSide, shade);

    const stamp = document.createElement("div");
    stamp.className = "p25-stamp";
    stamp.setAttribute("aria-hidden", "true");
    stamp.innerHTML = '<span>LM® / FIELD</span><span class="p25-stamp-icon">01</span><span class="p25-stamp-code">SI — 001</span>';
    display.appendChild(stamp);

    const journalRoute = document.createElement("div");
    journalRoute.className = "p25-journal-route";
    journalRoute.setAttribute("aria-hidden", "true");
    journalRoute.innerHTML = '<span data-place="soca">01 / SOČA</span><span data-place="london">02 / LONDON</span><span data-place="kl">03 / KUALA LUMPUR</span>';
    heroCopy.appendChild(journalRoute);
    const heroCode = document.createElement("span");
    heroCode.className = "p25-hero-gridcode";
    heroCode.setAttribute("aria-hidden", "true");
    heroFigure.appendChild(heroCode);

    const coordinates = ledger.querySelector(".p25-coordinates");
    const pins = [...ledger.querySelectorAll(".p25-route-pin")];
    const stampNum = stamp.querySelector(".p25-stamp-icon");
    const stampCode = stamp.querySelector(".p25-stamp-code");

    function syncAtlas() {
      const key = atlas.dataset.place || "soca";
      const info = data[key];
      if (!info) return;
      coordinates.textContent = info.coord;
      stampNum.textContent = info.n;
      stampCode.textContent = info.code;
      cardSide.textContent = "LOCATION STUDY / 0" + info.n;
      pins.forEach(pin => pin.classList.toggle("is-current", pin.dataset.p25Place === key));
    }
    function syncJournal() {
      const key = journal.dataset.place || "soca";
      const info = data[key];
      if (!info) return;
      heroCode.textContent = info.region + " / " + info.n;
      journalRoute.querySelectorAll("[data-place]").forEach(span => span.classList.toggle("is-current", span.dataset.place === key));
    }
    new MutationObserver(syncAtlas).observe(atlas, {attributes:true,attributeFilter:["data-place"]});
    new MutationObserver(syncJournal).observe(journal, {attributes:true,attributeFilter:["data-place"]});
    syncAtlas();
    syncJournal();
    atlas.classList.add("s25-ready");
    journal.classList.add("s25-ready");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, {once:true});
  else init();
})();
;


/* SOURCE assets/js/personal-signature.js */
/* STEP 26 — THE PERSONAL SIGNATURE
   Unified identity / distinct emblems for four worlds.
   Does not intercept navigation, keyboard or existing animation engines.
*/
(() => {
  const glyphs = {
    hub: '<svg viewBox="0 0 50 50" aria-hidden="true" focusable="false"><rect class="s26-glyph-soft" x="8" y="8" width="34" height="34" rx="1"/><circle class="s26-glyph-stroke s26-glyph-animate" cx="25" cy="25" r="14"/><path class="s26-glyph-stroke" d="M25 3V47M3 25H47"/><path class="s26-glyph-stroke" d="M15 32V18L25 31V18M28 32V18L35 25L42 18V32" stroke-width="1.2"/><circle class="s26-glyph-fill" cx="25" cy="25" r="2.3"/></svg>',
    work: '<svg viewBox="0 0 50 50" aria-hidden="true" focusable="false"><rect class="s26-glyph-soft" x="6" y="6" width="38" height="38"/><path class="s26-glyph-stroke s26-glyph-animate" d="M11 34V12H33V34Z M17 40V18H39V40Z"/><path class="s26-glyph-stroke" d="M17 18L33 34M17 40L39 18"/><circle class="s26-glyph-fill" cx="17" cy="18" r="2.2"/></svg>',
    sound: '<svg viewBox="0 0 50 50" aria-hidden="true" focusable="false"><circle class="s26-glyph-stroke s26-glyph-animate" cx="25" cy="25" r="20"/><circle class="s26-glyph-soft" cx="25" cy="25" r="15"/><circle class="s26-glyph-soft" cx="25" cy="25" r="11"/><circle class="s26-glyph-stroke" cx="25" cy="25" r="7.4"/><circle class="s26-glyph-fill" cx="25" cy="25" r="2"/><path class="s26-glyph-stroke" d="M43 6V15L34 26" stroke-width="2.1"/></svg>',
    places: '<svg viewBox="0 0 50 50" aria-hidden="true" focusable="false"><circle class="s26-glyph-soft" cx="25" cy="25" r="20"/><path class="s26-glyph-stroke s26-glyph-animate" d="M25 4V46M4 25H46M11 11L39 39M39 11L11 39"/><path class="s26-glyph-stroke" d="M31 12L21 23L19 38L29 27Z"/><circle class="s26-glyph-fill" cx="25" cy="25" r="2.5"/></svg>',
    about: '<svg viewBox="0 0 50 50" aria-hidden="true" focusable="false"><circle class="s26-glyph-soft" cx="25" cy="25" r="20"/><ellipse class="s26-glyph-stroke s26-glyph-animate" cx="25" cy="25" rx="23" ry="12" transform="rotate(-28 25 25)"/><text x="24" y="32" text-anchor="middle" font-family="Georgia,serif" font-size="22" font-style="italic" class="s26-glyph-fill">LM</text><circle class="s26-glyph-fill" cx="33" cy="14" r="2"/></svg>'
  };
  const scenes = [
    {key:"hub",root:".world-hub",brand:".world-brand",code:"00 / HUB",name:"THE ENTRY",number:"00"},
    {key:"work",root:".work-world",brand:".work-brand",code:"01 / WORK",name:"THE MAKER",number:"01"},
    {key:"sound",root:".sound-world",brand:".sound-brand",code:"02 / SOUND",name:"THE LISTENER",number:"02"},
    {key:"places",root:".p14-world",brand:".p14-brand",code:"03 / PLACES",name:"THE WANDERER",number:"03"},
    {key:"about",root:".a17-world",brand:".a17-signature",code:"04 / ABOUT",name:"THE HUMAN",number:"04"}
  ];
  function install(){
    for(const scene of scenes){
      const root=document.querySelector(scene.root);
      const brand=root?.querySelector(scene.brand);
      if(!root||!brand||root.classList.contains("s26-signed"))continue;
      const signature=document.createElement("span");
      signature.className="s26-signature";
      signature.setAttribute("aria-hidden","true");
      signature.innerHTML='<span class="s26-signature-icon">'+glyphs[scene.key]+'</span><span class="s26-signature-type"><span class="s26-signature-overline">LM® / FIELD SYSTEM</span><span class="s26-signature-name">'+scene.name+'</span><span class="s26-signature-rule"></span></span>';
      brand.appendChild(signature);
      const horizon=document.createElement("span");
      horizon.className="s26-horizon";
      horizon.setAttribute("aria-hidden","true");
      const spine=document.createElement("span");
      spine.className="s26-spine";
      spine.setAttribute("aria-hidden","true");
      const points=Array.from({length:4},(_,i)=>'<i'+(i+1===Number(scene.number)?' class="is-current"':'')+'></i>').join("");
      spine.innerHTML='<span class="s26-spine-title">FOUR WORLDS / ONE IDENTITY</span><span class="s26-spine-points">'+points+'</span><span class="s26-spine-index">'+scene.code+'</span>';
      root.append(horizon,spine);
      root.classList.add("s26-signed");
    }
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",install,{once:true});
  else install();
})();
;
