/* STEP 69 — THE RECORD GALLERY
   Three original vector sleeve worlds, inside the existing SOUND art.
   No external images/audio, no new route handlers, no GSAP overrides.
   Existing mood buttons and accessibility remain the source of truth. */
(() => {
  function init() {
    const sound=document.querySelector(".sound-world");
    const art=sound?.querySelector(".sound-art");
    const record=art?.querySelector(".sound-record");
    const moodButtons=[...(sound?.querySelectorAll(".sound-mood")||[])];
    if(!sound || !art || !record || moodButtons.length!==3 ||
       sound.dataset.s69Ready==="1") return;

    const gallery=document.createElement("div");
    gallery.className="s69-gallery";
    gallery.setAttribute("aria-hidden","true");

    const scene={
      soul:`
        <div class="s69-panel" data-s69-mood="soul">
          <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <radialGradient id="s69-soul-sun"><stop offset="0" stop-color="#efb994" stop-opacity=".35"/><stop offset=".7" stop-color="#be6a54" stop-opacity=".16"/><stop offset="1" stop-color="#be6a54" stop-opacity="0"/></radialGradient>
            </defs>
            <circle cx="390" cy="235" r="275" fill="url(#s69-soul-sun)"/>
            <circle cx="339" cy="266" r="234" class="s69-artline"/>
            <circle cx="339" cy="266" r="201" class="s69-hairline"/>
            <circle cx="339" cy="266" r="172" class="s69-artline"/>
            <circle cx="339" cy="266" r="146" class="s69-hairline"/>
            <circle cx="339" cy="266" r="113" class="s69-artline"/>
            <circle cx="339" cy="266" r="80" class="s69-hairline"/>
            <path d="M-30 438Q160 350 338 430T640 394M-30 464Q150 380 338 462T640 432M-30 492Q160 410 338 489T640 458M-30 518Q166 443 338 517T640 489" class="s69-artline"/>
            <path d="M60 86H180M60 100H143M60 114H110M492 355H562M492 368H538" class="s69-hairline"/>
            <circle cx="125" cy="188" r="38" class="s69-solid"/>
          </svg>
          <span class="s69-panel-word">SOUL.</span>
        </div>`,
      hiphop:`
        <div class="s69-panel" data-s69-mood="hiphop">
          <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <path d="M0 88L600 88M0 188L600 188M0 288L600 288M0 388L600 388M0 488L600 488M100 0L100 600M200 0L200 600M300 0L300 600M400 0L400 600M500 0L500 600" class="s69-hairline"/>
            <path d="M-33 213L264 -40L406 145L117 406Z" class="s69-solid"/>
            <path d="M-33 213L264 -40L406 145L117 406Z" class="s69-artline"/>
            <path d="M185 515L527 176L631 288L299 622Z" class="s69-artline"/>
            <path d="M-50 365L280 35M-30 407L300 76M-6 447L322 116" class="s69-artline"/>
            <path d="M56 449V424M80 449V372M104 449V402M128 449V351M152 449V410M176 449V334M200 449V379M224 449V325M248 449V398M272 449V347M296 449V386M320 449V318M344 449V374M368 449V340M392 449V389M416 449V351M440 449V400M464 449V367M488 449V416M512 449V383M536 449V434" class="s69-artline" stroke-width="6"/>
            <rect x="408" y="80" width="138" height="100" class="s69-solid"/>
            <rect x="408" y="80" width="138" height="100" class="s69-artline"/>
            <path d="M424 103H526M424 125H503M424 147H516" class="s69-hairline"/>
          </svg>
          <span class="s69-panel-word">HIP-HOP.</span>
        </div>`,
      alternative:`
        <div class="s69-panel" data-s69-mood="alternative">
          <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <linearGradient id="s69-alt-haze" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#d9badb" stop-opacity=".25"/>
                <stop offset="1" stop-color="#8fc4d6" stop-opacity=".025"/>
              </linearGradient>
            </defs>
            <path d="M0 0H600V600H0Z" fill="url(#s69-alt-haze)"/>
            <ellipse cx="370" cy="275" rx="250" ry="150" transform="rotate(-26 370 275)" class="s69-artline"/>
            <ellipse cx="370" cy="275" rx="222" ry="94" transform="rotate(28 370 275)" class="s69-hairline"/>
            <ellipse cx="370" cy="275" rx="120" ry="230" transform="rotate(-13 370 275)" class="s69-artline"/>
            <path d="M0 158C75 30 128 288 207 163S327 26 399 166S524 295 609 124M0 203C74 75 134 333 211 209S324 74 404 210S526 340 610 170M0 247C77 118 136 374 211 255S326 110 404 255S523 374 609 213" class="s69-artline"/>
            <path d="M0 291C80 167 144 420 209 297S326 151 405 303S525 425 608 264M0 336C71 209 142 469 209 339S334 197 407 341S526 461 608 302" class="s69-hairline"/>
            <circle cx="155" cy="83" r="30" class="s69-solid"/>
            <path d="M101 80H209M154 26V137M451 478H550M502 428V527" class="s69-hairline"/>
          </svg>
          <span class="s69-panel-word">ALT.</span>
        </div>`
    };

    gallery.innerHTML=[
      scene.soul,scene.hiphop,scene.alternative,
      '<div class="s69-gallery-meta"><span>LM® / THE RECORD GALLERY</span><span class="s69-genre-label">SIDE A — SOUL</span></div>',
      '<div class="s69-gallery-bottom"><span>ANALOG ART / 001—003</span><span>SELECT A FREQUENCY</span></div>'
    ].join("");
    art.prepend(gallery);
    sound.classList.add("s69-ready");
    sound.dataset.s69Ready="1";

    const names={
      soul:"SIDE A — SOUL",
      hiphop:"SIDE B — HIP-HOP",
      alternative:"SIDE C — ALTERNATIVE"
    };
    const meta=gallery.querySelector(".s69-genre-label");
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrast=window.matchMedia("(prefers-contrast: more)");
    const pending=new Set();
    let previous="";

    function cancel(){
      for(const a of [...pending]) {
        try{a.cancel()}catch(_){}
      }
      pending.clear();
    }

    function animate(el,keyframes,options){
      if(!el || typeof el.animate!=="function") return;
      const a=el.animate(keyframes,{...options,fill:"none"});
      pending.add(a);
      a.addEventListener("finish",()=>pending.delete(a),{once:true});
      a.addEventListener("cancel",()=>pending.delete(a),{once:true});
    }

    function sync(){
      const key=sound.dataset.mood || "soul";
      if(!names[key]) return;
      meta.textContent=names[key];
      if(key===previous)return;
      previous=key;
      cancel();
      if(!sound.classList.contains("is-active") ||
        reduced.matches || contrast.matches || document.hidden)return;

      const panel=gallery.querySelector('.s69-panel[data-s69-mood="'+key+'"]');
      if(!panel)return;
      // Finite animated engraving: only the new SVG drawings.
      const shapes=[...panel.querySelectorAll(".s69-artline")].slice(0,23);
      shapes.forEach((shape,i)=>{
        if(typeof shape.getTotalLength!=="function")return;
        let length;
        try{length=shape.getTotalLength()}catch(_){return}
        if(!Number.isFinite(length)||length<15) return;
        const dash=Math.ceil(length)+2;
        animate(shape,[
          {strokeDasharray:dash+" "+dash,strokeDashoffset:dash,opacity:.12},
          {strokeDasharray:dash+" "+dash,strokeDashoffset:0,opacity:.8}
        ],{duration:850+Math.min(i,9)*55,delay:i*27,easing:"cubic-bezier(.16,.82,.22,1)"});
      });
      // Independent label only: don't modify original Sound title/transforms.
      const word=panel.querySelector(".s69-panel-word");
      animate(word,[
        {opacity:.12,clipPath:"inset(0 100% 0 0)"},
        {opacity:1,clipPath:"inset(0 0 0 0)"}
      ],{duration:800,delay:135,easing:"cubic-bezier(.16,1,.3,1)"});
      animate(meta,[{opacity:.25},{opacity:1}],{duration:430,easing:"ease-out"});
    }

    new MutationObserver(sync).observe(sound,{
      attributes:true,attributeFilter:["data-mood","class"]
    });
    reduced.addEventListener?.("change",()=>{if(reduced.matches)cancel()});
    contrast.addEventListener?.("change",()=>{if(contrast.matches)cancel()});
    document.addEventListener("visibilitychange",()=>{if(document.hidden)cancel()});
    sync();
  }

  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();