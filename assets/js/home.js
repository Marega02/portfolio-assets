document.addEventListener("DOMContentLoaded", () => {

  // Verifica che GSAP sia disponibile
  if (typeof gsap === "undefined") {
    console.warn("GSAP non è attivo.");
    return;
  }

  // Rispetta chi preferisce animazioni ridotte
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (reducedMotion) return;

  // Creiamo la sequenza iniziale
  const intro = gsap.timeline({
    defaults: {
      ease: "power3.out"
    }
  });

  // 1. Intestazione superiore
  intro.from(".world-top", {
    opacity: 0,
    y: -20,
    duration: 0.8
  });

  // 2. Piccola scritta introduttiva
  intro.from(".world-eyebrow", {
    opacity: 0,
    y: 20,
    duration: 0.7
  }, "-=0.35");

  // 3. Titolo principale
  intro.from(".world-title", {
    opacity: 0,
    y: 65,
    duration: 1.2
  }, "-=0.35");

  // 4. Descrizione
  intro.from(".world-subtitle", {
    opacity: 0,
    y: 25,
    duration: 0.9
  }, "-=0.65");

  // 5. Le quattro scelte
  intro.from(".world-link", {
    opacity: 0,
    y: 35,
    duration: 0.8,
    stagger: 0.13
  }, "-=0.5");

  // Interazione mouse per desktop
  if (window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches) {

    document.querySelectorAll(".world-link")
      .forEach((link) => {

        link.addEventListener("mouseenter", () => {
          gsap.to(link, {
            y: -8,
            duration: 0.4,
            ease: "power2.out",
            overwrite: true
          });
        });

        link.addEventListener("mouseleave", () => {
          gsap.to(link, {
            y: 0,
            duration: 0.4,
            ease: "power2.out",
            overwrite: true
          });
        });

      });
  }

});

document.addEventListener("DOMContentLoaded", () => {

  const hub = document.querySelector(".world-hub");
  const stage = document.querySelector(".world-stage");

  if (!hub || !stage) return;

  const links = document.querySelectorAll(".world-link");
  const word = stage.querySelector(".stage-word");
  const number = stage.querySelector(".stage-overline");
  const caption = stage.querySelector(".stage-caption");

  if (!word || !number || !caption) return;

  const scenes = [
    {
      title: "WORK",
      number: "01",
      caption: "Selected digital experiments",
      paper: "#D9C7AB"
    },
    {
      title: "SOUND",
      number: "02",
      caption: "Music, rhythm & inspiration",
      paper: "#BCC7B5"
    },
    {
      title: "PLACES",
      number: "03",
      caption: "Places, memories & stories",
      paper: "#C4C9CF"
    },
    {
      title: "ABOUT",
      number: "04",
      caption: "Behind the screen",
      paper: "#D6B4A4"
    }
  ];

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  let activeIndex = 0;

  function changeScene(index) {

    const scene = scenes[index];
    if (!scene || index === activeIndex) return;

    activeIndex = index;

    stage.style.setProperty("--paper", scene.paper);

    number.textContent = "INDEX / " + scene.number;
    word.textContent = scene.title;
    caption.textContent = scene.caption;

    if (window.gsap && !reducedMotion) {
      gsap.fromTo(
        [number, word, caption],
        { opacity: 0.35, y: 9 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.05,
          ease: "power2.out",
          overwrite: true
        }
      );
    }
  }

  // I link controllano il manifesto
  links.forEach((link, index) => {

    link.addEventListener("mouseenter", () => {
      changeScene(index);
    });

    link.addEventListener("focusin", () => {
      changeScene(index);
    });

  });

  // Movimento tridimensionale leggero
  const canHover = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;

  if (!window.gsap || reducedMotion) return;

  const sheet = stage.querySelector(".stage-sheet");
  const back = stage.querySelector(".stage-sheet-back");
  const orbit = stage.querySelector(".stage-orbit");

  if (!sheet || !back || !orbit) return;

  // Animazione iniziale della scena
  gsap.from(sheet, {
    opacity: 0,
    x: 35,
    rotation: -14,
    duration: 1.1,
    delay: 0.5,
    ease: "power3.out"
  });

  gsap.from(back, {
    opacity: 0,
    x: 25,
    duration: 1,
    delay: 0.55
  });

  gsap.from(orbit, {
    opacity: 0,
    scale: 0.9,
    duration: 1.3,
    delay: 0.4
  });

  if (!canHover) return;

  // Movimento fluido senza creare nuove animazioni
  // a ogni movimento del mouse
  const moveX = gsap.quickTo(sheet, "x", {
    duration: 0.8,
    ease: "power3.out"
  });

  const moveY = gsap.quickTo(sheet, "y", {
    duration: 0.8,
    ease: "power3.out"
  });

  const backX = gsap.quickTo(back, "x", {
    duration: 1.1,
    ease: "power3.out"
  });

  const backY = gsap.quickTo(back, "y", {
    duration: 1.1,
    ease: "power3.out"
  });

  hub.addEventListener("pointermove", (event) => {

    const rect = hub.getBoundingClientRect();

    const x = (
      (event.clientX - rect.left) / rect.width - 0.5
    ) * 2;

    const y = (
      (event.clientY - rect.top) / rect.height - 0.5
    ) * 2;

    moveX(x * 13);
    moveY(y * 13);

    backX(x * -9);
    backY(y * -9);

  });

  hub.addEventListener("pointerleave", () => {
    moveX(0);
    moveY(0);
    backX(0);
    backY(0);
  });

});
