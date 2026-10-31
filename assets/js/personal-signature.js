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