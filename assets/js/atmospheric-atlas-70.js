/* STEP 70 — THE ATMOSPHERIC ATLAS
   Three original, responsive landscape illustrations inside the existing
   PLACES postcard. No photos, additional buttons, click interception,
   route changes or alterations to the Travel Journal.
   The original SVGs stay in place as a fallback if initialization fails.
*/
(() => {
  function init() {
    const atlas=document.querySelector(".p14-world");
    const postcard=atlas?.querySelector(".p14-postcard");
    const scenes=postcard?.querySelector(".p14-scenes");
    if(!atlas||!postcard||!scenes||atlas.dataset.s70Ready==="1")return;

    const art={
      soca:`
      <svg viewBox="0 0 800 680" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Stylized alpine valley with emerald river and layered mountains">
        <defs>
          <linearGradient id="s70-skys" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#a2c4b0"/><stop offset=".47" stop-color="#7dada1"/><stop offset="1" stop-color="#375d5a"/></linearGradient>
          <linearGradient id="s70-waters" x1="0" y1="0" x2="1" y2=".8"><stop stop-color="#c4f2cd"/><stop offset=".35" stop-color="#5cc9ae"/><stop offset="1" stop-color="#126b70"/></linearGradient>
          <linearGradient id="s70-shadowmount" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#4b8374"/><stop offset="1" stop-color="#244d49"/></linearGradient>
          <radialGradient id="s70-sunmist"><stop stop-color="#e8f4c8" stop-opacity=".77"/><stop offset="1" stop-color="#e8f4c8" stop-opacity="0"/></radialGradient>
        </defs>
        <rect width="800" height="680" fill="url(#s70-skys)"/>
        <circle cx="536" cy="129" r="226" fill="url(#s70-sunmist)"/>
        <path d="M0 312L91 230 150 258 273 105 375 225 445 176 559 292 652 171 733 235 800 206V680H0Z" fill="#b3c4ad"/>
        <path d="M0 326L91 230 150 258 273 105 375 225 445 176 559 292 652 171 733 235 800 206V680H0Z" fill="#6f938a" opacity=".48"/>
        <path d="M231 157L273 105 311 165 282 155 261 145 252 168ZM633 203L652 171 682 207 659 198Z" fill="#e7eee0" opacity=".74"/>
        <path d="M0 358L101 280 175 308 255 208 343 300 433 222 519 339 650 249 744 313 800 265V680H0Z" fill="#60897b"/>
        <path d="M0 403L150 317 258 365 385 266 495 361 610 291 729 346 800 321V680H0Z" fill="url(#s70-shadowmount)"/>
        <g class="s70-mist"><path d="M-35 342C166 307 270 356 419 335S683 308 839 342" stroke="#d4e7d4" stroke-width="24" stroke-linecap="round" opacity=".21" fill="none"/><path d="M-15 392C140 360 299 391 465 365S695 356 820 384" stroke="#c8dfc8" stroke-width="17" opacity=".13" fill="none"/></g>
        <path d="M0 464L119 395 253 429 333 352 453 443 567 389 689 432 800 392V680H0Z" fill="#2e6257"/>
        <path d="M0 521L149 456 271 503 384 409 534 503 668 446 800 497V680H0Z" fill="#214d48"/>
        <path d="M496 384C450 438 485 458 397 503S206 534 245 680H599C568 593 457 565 526 515S609 444 572 397Z" fill="#142e34" opacity=".37"/>
        <path d="M505 367C462 431 485 454 400 496S207 526 249 680H574C549 598 462 566 529 509S599 442 568 386Z" fill="url(#s70-waters)"/>
        <path d="M511 407C484 458 482 466 411 499S255 547 283 671" stroke="#c4ead2" stroke-width="7" opacity=".53" fill="none"/>
        <path d="M556 449C545 472 511 491 503 511S445 571 485 603" stroke="#d5f0dc" stroke-width="3" opacity=".46" fill="none"/>
        <g fill="#183e38">
          <path d="M17 505L35 398 6 446 25 438 0 483 24 473 8 524Z"/>
          <path d="M74 507L96 373 58 433 88 424 50 465 84 455 54 514Z"/>
          <path d="M140 538L162 413 125 467 153 461 119 502 152 488 128 541Z"/>
          <path d="M665 504L689 373 656 431 679 419 645 469 681 455 649 518Z"/>
          <path d="M722 554L750 400 712 465 740 448 705 498 734 492 698 556Z"/>
          <path d="M773 522L796 382 760 442 789 433 755 482 788 475 767 530Z"/>
        </g>
        <path d="M0 624C133 591 171 606 254 629L274 680H0Z" fill="#143d35"/>
        <path d="M575 621C670 584 730 605 800 573V680H579Z" fill="#153f3a"/>
        <g stroke="#bde8ce" stroke-width="1.2" fill="none" opacity=".22">
          <path d="M0 308L91 230 273 105 445 176 652 171 800 206"/>
          <path d="M0 357L101 280 255 208 433 222 650 249 800 265"/>
        </g>
      </svg>`,
      london:`
      <svg viewBox="0 0 800 680" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Atmospheric London skyline by the Thames at dusk">
        <defs>
          <linearGradient id="s70-skyl" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#6d627b"/><stop offset=".45" stop-color="#bc8497"/><stop offset="1" stop-color="#dbb2a4"/></linearGradient>
          <linearGradient id="s70-thames" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#58556e"/><stop offset="1" stop-color="#1c2b3d"/></linearGradient>
          <radialGradient id="s70-cityhaze"><stop stop-color="#f0d6c4" stop-opacity=".62"/><stop offset="1" stop-color="#f0d6c4" stop-opacity="0"/></radialGradient>
        </defs>
        <rect width="800" height="680" fill="url(#s70-skyl)"/>
        <circle cx="590" cy="219" r="270" fill="url(#s70-cityhaze)"/>
        <circle cx="595" cy="175" r="74" fill="#ead7c5" opacity=".54"/>
        <path d="M0 365L75 360 75 303 96 303 96 345 120 345 120 303 164 303 164 363 189 363 189 273 221 273 221 362 264 362 264 314 289 314 289 362 333 362 333 285 361 285 361 362 399 362 399 294 444 294 444 362 488 362 488 321 531 321 531 362 572 362 572 278 607 278 607 362 654 362 654 322 699 322 699 364 800 354V680H0Z" fill="#6b6778" opacity=".6"/>
        <g fill="#363949">
          <path d="M0 411V318H69V351H100V294H142V403H166V270H202V398H250V340H284V391H314V309H355V411Z"/>
          <path d="M311 400V254H319V234H327V195H337V171H342V153H347V171H352V195H362V234H370V254H378V405Z"/>
          <path d="M326 235H363M326 264H365M322 306H370" stroke="#8c8290" stroke-width="4"/>
          <circle cx="345" cy="285" r="18" fill="#d0b7a8"/>
          <circle cx="345" cy="285" r="12" fill="#56505d"/>
          <path d="M395 404V315H430V282H438V267H444V282H454V406Z"/>
          <path d="M474 411V282L493 251 512 282V406Z"/>
          <path d="M549 412V263H578V241H587V213H597V241H604V263H632V410Z"/>
          <path d="M662 408V300H722V342H752V289H800V411Z"/>
        </g>
        <path d="M0 420H800V680H0Z" fill="url(#s70-thames)"/>
        <path d="M0 428C105 424 209 438 302 425S540 438 800 428" fill="none" stroke="#e2b3a1" stroke-width="5" opacity=".3"/>
        <g class="s70-reflection" opacity=".65">
          <path d="M340 424L336 492 341 544 332 619 348 677M358 427L362 480 356 550 364 617" stroke="#e2b5a2" stroke-width="7" opacity=".32" fill="none"/>
          <path d="M589 430L592 475 583 521 596 569 588 640M493 430L488 470 495 511 489 565" stroke="#e5c2ac" stroke-width="5" opacity=".19" fill="none"/>
          <path d="M58 491H239M127 511H303M400 474H579M463 532H708M60 571H239M299 621H518M532 660H760" stroke="#c2adbb" stroke-width="2" opacity=".33" fill="none"/>
        </g>
        <g fill="none" stroke="#252e3d">
          <path d="M0 455H800" stroke-width="15"/>
          <path d="M0 447C160 450 190 411 305 419S527 457 800 438" stroke-width="11"/>
          <path d="M0 459V518M108 460V512M226 455V507M346 455V512M482 455V516M616 453V510M748 457V514" stroke-width="10"/>
          <path d="M0 469H800" stroke-width="3"/>
        </g>
        <g fill="#f2c8a5" opacity=".48">
          <rect x="18" y="343" width="7" height="11"/><rect x="43" y="343" width="7" height="11"/>
          <rect x="110" y="324" width="9" height="13"/><rect x="129" y="345" width="7" height="10"/>
          <rect x="185" y="310" width="8" height="16"/><rect x="207" y="342" width="8" height="14"/>
          <rect x="403" y="344" width="9" height="14"/><rect x="419" y="344" width="9" height="14"/>
          <rect x="553" y="300" width="7" height="12"/><rect x="612" y="310" width="8" height="14"/>
          <rect x="684" y="331" width="9" height="15"/><rect x="707" y="331" width="8" height="15"/>
        </g>
        <g stroke="#f6d4ca" opacity=".14" stroke-width="2">
          <path d="M50 0L-95 300M180 0L35 300M310 0L165 300M440 0L295 300M570 0L425 300M700 0L555 300M830 0L685 300"/>
        </g>
        <path d="M0 617Q144 599 291 618T594 611T800 623V680H0Z" fill="#172638" opacity=".7"/>
      </svg>`,
      kl:`
      <svg viewBox="0 0 800 680" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Kuala Lumpur skyline with twin towers, golden dusk and tropical silhouettes">
        <defs>
          <linearGradient id="s70-skyk" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#163d51"/><stop offset=".43" stop-color="#47777c"/><stop offset=".72" stop-color="#ce9170"/><stop offset="1" stop-color="#edb77f"/></linearGradient>
          <radialGradient id="s70-klhaze"><stop stop-color="#f4cd96" stop-opacity=".80"/><stop offset="1" stop-color="#f4cd96" stop-opacity="0"/></radialGradient>
          <linearGradient id="s70-glass" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#356677"/><stop offset="1" stop-color="#1d3a4b"/></linearGradient>
        </defs>
        <rect width="800" height="680" fill="url(#s70-skyk)"/>
        <g class="s70-atmosphere"><circle cx="561" cy="276" r="267" fill="url(#s70-klhaze)"/><circle cx="563" cy="204" r="88" fill="#f4c89d" opacity=".36"/></g>
        <path d="M0 420L85 385 149 403 218 378 307 418 398 393 503 416 602 388 691 415 800 387V680H0Z" fill="#4e6f6d" opacity=".35"/>
        <g fill="#274c58">
          <path d="M0 454V373H50V390H96V347H118V382H147V330H174V450Z"/>
          <path d="M175 450V325H204V309H227V443Z"/>
          <path d="M558 452V334H590V312H621V455Z"/>
          <path d="M642 452V379H682V332H713V351H752V314H800V454Z"/>
        </g>
        <g fill="url(#s70-glass)" stroke="#9ab3ae" stroke-width="2">
          <path d="M254 465V233H264V208H273V179H282V144H292V112H298V86H304V112H314V144H323V179H333V208H342V465Z"/>
          <path d="M388 465V233H398V208H407V179H416V144H426V112H432V86H438V112H448V144H457V179H467V208H476V465Z"/>
        </g>
        <g fill="none" stroke="#c7d5bd" stroke-width="2.4" opacity=".75">
          <path d="M253 258H342M253 288H342M253 316H342M253 344H342M253 372H342M253 400H342M253 428H342"/>
          <path d="M388 258H477M388 288H477M388 316H477M388 344H477M388 372H477M388 400H477M388 428H477"/>
          <path d="M263 231L333 231M398 231H467M292 140H304M426 140H438"/>
          <path d="M341 315Q364 298 388 315M341 329H388"/>
        </g>
        <path d="M521 456V259L547 222 573 259V456Z" fill="#294c5b" stroke="#9ab4a7" stroke-width="2"/>
        <path d="M547 223V174M532 281H561M534 308H559M536 335H557M537 365H559" fill="none" stroke="#c2cdb5" stroke-width="2"/>
        <path d="M0 479L69 453 128 469 176 455 238 469 311 451 386 477 467 449 544 472 600 452 667 473 737 452 800 471V680H0Z" fill="#183b46"/>
        <g fill="#f3d6a0" opacity=".57">
          <rect x="271" y="279" width="4" height="8"/><rect x="292" y="312" width="5" height="12"/><rect x="319" y="347" width="4" height="9"/>
          <rect x="408" y="278" width="4" height="8"/><rect x="430" y="312" width="5" height="12"/><rect x="458" y="347" width="4" height="9"/>
          <rect x="178" y="397" width="7" height="10"/><rect x="193" y="397" width="7" height="10"/>
          <rect x="567" y="397" width="6" height="11"/><rect x="672" y="391" width="8" height="11"/>
        </g>
        <path d="M0 514C151 482 244 536 378 501S601 506 800 487V680H0Z" fill="#15353d"/>
        <g fill="#0b2c34" opacity=".92">
          <path d="M0 680V0C28 76 58 145 75 217 42 179 17 162 0 151 48 198 77 247 100 302 47 280 17 276 0 263 52 335 92 398 102 461 63 426 29 419 0 417Z"/>
          <path d="M800 680V18C764 113 736 167 706 222 742 190 771 174 800 171 759 224 729 278 712 331 747 307 771 302 800 298 762 356 733 413 721 462 753 434 776 428 800 429Z"/>
          <path d="M85 680L110 509 77 553 108 534 65 606 103 584 76 652Z"/>
          <path d="M706 680L683 517 717 565 687 546 730 604 693 585 718 648Z"/>
        </g>
        <path d="M0 633C175 609 273 631 408 618S668 616 800 634V680H0Z" fill="#102d34"/>
      </svg>`
    };

    const keys=["soca","london","kl"];
    const fragment=document.createDocumentFragment();
    for (const key of keys) {
      const node=document.createElement("div");
      node.className="s70-worldview";
      node.dataset.s70Scene=key;
      node.setAttribute("aria-hidden","true");
      node.innerHTML=art[key];
      fragment.appendChild(node);
    }
    // The original image scenes stay as a fully intact fallback.
    scenes.appendChild(fragment);
    if (keys.some(key=>!scenes.querySelector('.s70-worldview[data-s70-scene="'+key+'"] svg'))) return;
    atlas.dataset.s70Ready="1";
    atlas.classList.add("s70-ready");

    const motion=window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrast=window.matchMedia("(prefers-contrast: more)");
    let previous="",isOpen=false;
    const canMove=()=>!motion.matches&&!contrast.matches&&!document.hidden;
    function sync() {
      const key=atlas.dataset.place||"soca";
      const open=atlas.classList.contains("is-active");
      if (!keys.includes(key)) return;
      if(!open){isOpen=false;return}
      if(key===previous&&isOpen)return;
      previous=key;isOpen=true;
      const panel=scenes.querySelector('.s70-worldview[data-s70-scene="'+key+'"]');
      if(!panel)return;
      for(const el of scenes.querySelectorAll(".s70-worldview"))el.classList.remove("s70-arriving");
      if(!canMove())return;
      // Restart only the finite scene-specific atmospheric motion.
      void panel.offsetWidth;
      panel.classList.add("s70-arriving");
    }
    new MutationObserver(sync).observe(atlas,{attributes:true,attributeFilter:["data-place","class"]});
    motion.addEventListener?.("change",()=>{if(motion.matches)scenes.querySelectorAll(".s70-arriving").forEach(x=>x.classList.remove("s70-arriving"))});
    sync();
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();