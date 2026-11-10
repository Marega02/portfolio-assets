/* PHASE 116 — HOME / KEEP ORIGINAL LABELS VISIBLE
   The original World Links are the only visible chapter captions.
   No duplicate text layers, no invisible captions after mouseenter.
   The obsolete global World Index menu is removed without changing
   the native project navigation or other site chapters. */
(()=>{
  function cleanup(){
    // Step 19 added World Index OUTSIDE the Home hub.
    document.querySelectorAll(".w19-root").forEach(root=>root.remove());
    document.querySelectorAll("body > .w19-trigger,body > .w19-backdrop").forEach(el=>el.remove());
    const home=document.querySelector(".world-hub.fi95-ready .fi95-home.fi108-home");
    if(!home)return;
    const cards=[...home.querySelectorAll(".fi95-gallery .fi95-panel[data-category]")];
    if(cards.length!==4)return;
    for(const card of cards){
      // All card numbers and Phase 115's secondary captions are removed.
      // The real native anchor title remains the single visible heading.
      card.querySelectorAll(".fi95-panel-num,.fi113-panel-id,.fi115-photo-label").forEach(el=>el.remove());
      const original=card.querySelector(".fi95-panel-text .world-link");
      if(original){
        original.removeAttribute("aria-hidden");
        original.style.removeProperty("opacity");
        original.style.removeProperty("visibility");
      }
    }
    home.classList.add("fi116-labels-stable");
    document.documentElement.classList.add("fi116-index-retired");
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",cleanup,{once:true});
  else cleanup();
  window.addEventListener("load",cleanup,{once:true});
})();