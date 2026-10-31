/* STEP 41 — EDITORIAL FOCUS
   Optional in-page reading treatment, available from the World Index.
   Does not alter world navigation, GSAP, scroll, focus traps or assets.
   The choice is local to the open page; no storage or analytics. */
(() => {
  function init() {
    const root=document.querySelector(".w19-root");
    const inner=root?.querySelector(".w19-inner");
    const list=inner?.querySelector(".w19-list");
    if(!root||!inner||!list||root.classList.contains("s41-ready"))return;

    const switcher=document.createElement("div");
    switcher.className="s41-switcher";
    switcher.innerHTML=[
      '<div class="s41-switch-copy">',
      '<span class="s41-switch-eyebrow">STUDIO / VIEW MODE</span>',
      '<span class="s41-switch-caption" aria-live="polite">Full cinematic edition, with every visual detail.</span>',
      '</div>',
      '<button type="button" class="s41-switch" aria-pressed="false" aria-label="Enable Studio Focus reading mode">',
      '<span class="s41-switch-indicator" aria-hidden="true"></span>',
      '<span class="s41-switch-label">FOCUS: OFF</span>',
      '</button>'
    ].join("");
    inner.insertBefore(switcher,list);
    const button=switcher.querySelector(".s41-switch");
    const label=switcher.querySelector(".s41-switch-label");
    const caption=switcher.querySelector(".s41-switch-caption");
    function apply(on){
      document.body.classList.toggle("s41-studio-focus",on);
      button.setAttribute("aria-pressed",String(on));
      button.setAttribute("aria-label",on?"Disable Studio Focus reading mode":"Enable Studio Focus reading mode");
      label.textContent=on?"FOCUS: ON":"FOCUS: OFF";
      caption.textContent=on
        ?"Editorial reading: quieter backgrounds, clearer content."
        :"Full cinematic edition, with every visual detail.";
    }
    button.addEventListener("click",()=>apply(!document.body.classList.contains("s41-studio-focus")));
    apply(false);
    root.classList.add("s41-ready");
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();