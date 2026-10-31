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