/* STEP 55 — WORK / BRIGHTER RED HOUSE EDITORIAL COVER
   Only updates existing cover image elements. No navigation, layout,
   event-handling or GSAP morph changes. Using one <img> source keeps
   the cover and project transition coherent.
*/
(() => {
  const base = "https://marega02.github.io/portfolio-assets/assets/images/";
  const covers = [
    {
      url: base + "work-redhouse-55.svg",
      fallback: "",
      alt: "Red House Studio — fotografia del salone reale, con un taglio editoriale."
    },
    {
      url: "https://images.pexels.com/photos/8920813/pexels-photo-8920813.jpeg?auto=compress&cs=tinysrgb&w=1600",
      fallback: base + "work-soca-52-1.svg",
      alt: "Soča Valley — fotografia del fiume smeraldo nella valle dell'Isonzo, immagine illustrativa."
    },
    {
      url: "https://images.pexels.com/photos/37305714/pexels-photo-37305714.jpeg?auto=compress&cs=tinysrgb&w=1600",
      fallback: base + "work-gianni-fallback-52-1.svg",
      alt: "Trattoria Da Gianni — fotografia editoriale di cucina italiana, immagine d'atmosfera."
    }
  ];
  function init() {
    const previews = Array.from(document.querySelectorAll(".work-world .work-preview .preview-visual .preview-image"));
    if (previews.length !== covers.length) return;
    previews.forEach((img, index) => {
      const data = covers[index];
      if (img.dataset.s53Applied === "1") return;
      const original = img.currentSrc || img.src;
      function load(url, isFallback) {
        if (!url) return;
        const test = new Image();
        test.onload = () => {
          if (img.dataset.s53Applied === "1") return;
          img.removeAttribute("srcset");
          img.removeAttribute("sizes");
          img.src = url;
          img.alt = data.alt;
          img.decoding = "async";
          img.dataset.s53Applied = "1";
          img.dataset.s521Applied = "1";
          img.dataset.s53Source = isFallback ? "fallback" : "editorial";
          img.onerror = () => {
            img.onerror = null;
            img.dataset.s53Applied = "";
            if (!isFallback && data.fallback) load(data.fallback, true);
            else if (original) {
              img.src = original;
              img.dataset.s53Source = "original";
            }
          };
        };
        test.onerror = () => {
          if (!isFallback && data.fallback) load(data.fallback, true);
        };
        test.src = url;
      }
      load(data.url, false);
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, {once:true});
  else init();
})();