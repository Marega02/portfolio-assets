/* STEP 72 — FOUR LIVING COVERS
   Original illustrative posters, mounted INSIDE the existing home art.
   The original GSAP stage / world links / chapter gate remain in charge.
   Four finite vector ink animations; no perpetual animation loops.
*/
(() => {
  function init() {
    const hub=document.querySelector(".world-hub");
    const stage=hub?.querySelector(".world-stage");
    const sheet=stage?.querySelector(".stage-sheet");
    const board=sheet?.querySelector(".s22-art");
    if(!hub||!stage||!sheet||!board||hub.dataset.s72Ready==="1")return;

    const arts={
      work:`
        <svg viewBox="0 0 600 660" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="s72-w-paper" x1="0" y1="0" x2="1" y2="1">
              <stop stop-color="#efe2c8"/><stop offset="1" stop-color="#baada0"/>
            </linearGradient>
            <linearGradient id="s72-w-screen" x1="0" y1="0" x2="1" y2="1">
              <stop stop-color="#5c8179"/><stop offset="1" stop-color="#263e39"/>
            </linearGradient>
          </defs>
          <rect width="600" height="660" fill="url(#s72-w-paper)"/>
          <g stroke="#597064" stroke-width=".9" opacity=".2">
            <path d="M0 55H600M0 110H600M0 165H600M0 220H600M0 275H600M0 330H600M0 385H600M0 440H600M0 495H600M0 550H600M0 605H600"/>
            <path d="M55 0V660M110 0V660M165 0V660M220 0V660M275 0V660M330 0V660M385 0V660M440 0V660M495 0V660M550 0V660"/>
          </g>
          <g transform="translate(40 52) rotate(-5 250 300)">
            <rect x="70" y="51" width="368" height="471" fill="#d3bb9e" stroke="#2e534b" stroke-width="4"/>
            <rect x="93" y="75" width="368" height="471" fill="#415e57" stroke="#24443e" stroke-width="3"/>
            <rect x="111" y="94" width="332" height="434" fill="#eee0c9"/>
            <rect x="111" y="94" width="332" height="57" fill="#c4d4c1"/>
            <rect x="130" y="113" width="19" height="19" rx="9" fill="#a66e5c"/>
            <rect x="157" y="113" width="19" height="19" rx="9" fill="#d7aa82"/>
            <rect x="184" y="113" width="19" height="19" rx="9" fill="#416c60"/>
            <rect x="130" y="178" width="295" height="160" fill="url(#s72-w-screen)"/>
            <path d="M130 321L197 253 239 293 298 199 368 287 425 237V338H130Z" fill="#92af97"/>
            <circle cx="355" cy="224" r="23" fill="#ebc18c"/>
            <rect x="130" y="366" width="149" height="13" fill="#395c50"/>
            <rect x="130" y="393" width="285" height="6" fill="#83938a"/>
            <rect x="130" y="409" width="245" height="6" fill="#83938a"/>
            <rect x="130" y="425" width="268" height="6" fill="#83938a"/>
            <rect x="130" y="465" width="133" height="35" rx="17" fill="#a16a55"/>
            <path class="s72-draw" d="M112 153H440M282 346V509" fill="none" stroke="#d19b79" stroke-width="3"/>
          </g>
          <g fill="none" stroke="#355b51">
            <path class="s72-draw" d="M41 80H100M71 50V110M488 563H550M519 532V595" stroke-width="3"/>
            <path class="s72-draw" d="M19 617H578M19 629H432" stroke-width="1.6" opacity=".5"/>
          </g>
          <circle cx="512" cy="101" r="48" fill="none" stroke="#9b6c59" stroke-width="2" opacity=".6"/>
          <circle cx="512" cy="101" r="35" fill="#c8906a" opacity=".2"/>
        </svg>`,
      sound:`
        <svg viewBox="0 0 600 660" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="s72-s-bg" x1="0" y1="0" x2="1" y2="1">
              <stop stop-color="#aabfad"/><stop offset=".6" stop-color="#6a9683"/><stop offset="1" stop-color="#41685c"/>
            </linearGradient>
            <radialGradient id="s72-s-vinyl">
              <stop stop-color="#4a5d55"/><stop offset=".32" stop-color="#202e2b"/>
              <stop offset=".8" stop-color="#192a28"/><stop offset="1" stop-color="#617c68"/>
            </radialGradient>
          </defs>
          <rect width="600" height="660" fill="url(#s72-s-bg)"/>
          <path d="M-50 98L640 398M-20 68L670 368M-40 128L650 428" stroke="#dce9d1" stroke-width="1" opacity=".3"/>
          <rect x="46" y="62" width="508" height="526" rx="1" fill="none" stroke="#e3ead8" stroke-width="1.4" opacity=".75"/>
          <circle cx="297" cy="309" r="227" fill="url(#s72-s-vinyl)" stroke="#233d34" stroke-width="3"/>
          <g class="s72-draw" fill="none" stroke="#c6d8bb" opacity=".55">
            <circle cx="297" cy="309" r="212" stroke-width="1.2"/>
            <circle cx="297" cy="309" r="199" stroke-width="1.1"/>
            <circle cx="297" cy="309" r="187" stroke-width=".7"/>
            <circle cx="297" cy="309" r="167" stroke-width=".9"/>
            <circle cx="297" cy="309" r="153" stroke-width=".7"/>
            <circle cx="297" cy="309" r="132" stroke-width=".95"/>
            <circle cx="297" cy="309" r="116" stroke-width=".75"/>
          </g>
          <circle cx="297" cy="309" r="80" fill="#c3ba9f"/>
          <circle cx="297" cy="309" r="63" fill="#9c8f8d"/>
          <circle cx="297" cy="309" r="46" fill="#e2d5b9"/>
          <path class="s72-draw" d="M262 312H331M296 278V344" fill="none" stroke="#304e45" stroke-width="2"/>
          <circle cx="297" cy="309" r="12" fill="#1c3630"/>
          <path d="M558 83V198L392 353" fill="none" stroke="#304c45" stroke-width="16" stroke-linecap="round"/>
          <path d="M558 83V198L392 353" fill="none" stroke="#e6ead9" stroke-width="5" stroke-linecap="round"/>
          <rect x="371" y="333" width="45" height="22" fill="#ba8977" transform="rotate(-43 392 343)"/>
          <path class="s72-draw" d="M50 580V557M66 580V543M82 580V561M98 580V522M114 580V540M130 580V558M146 580V514M162 580V544M178 580V522M194 580V561M210 580V529M226 580V547M242 580V508M258 580V530M274 580V555M290 580V510M306 580V544M322 580V521M338 580V550M354 580V516M370 580V535M386 580V560M402 580V520M418 580V542M434 580V553M450 580V518M466 580V544M482 580V531M498 580V562M514 580V541M530 580V552" fill="none" stroke="#e1ecdd" stroke-width="5"/>
          <path d="M53 607H547" stroke="#1c3932" stroke-width="3"/>
        </svg>`,
      places:`
        <svg viewBox="0 0 600 660" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="s72-p-sky" x1="0" y1="0" x2="0" y2="1">
              <stop stop-color="#c8dbd0"/><stop offset=".6" stop-color="#8caeaf"/><stop offset="1" stop-color="#587e8d"/>
            </linearGradient>
            <linearGradient id="s72-p-river" x1="0" y1="0" x2=".9" y2="1">
              <stop stop-color="#d8e9d4"/><stop offset=".5" stop-color="#77c0b7"/><stop offset="1" stop-color="#387c81"/>
            </linearGradient>
          </defs>
          <rect width="600" height="660" fill="url(#s72-p-sky)"/>
          <circle cx="444" cy="146" r="105" fill="#f8e3be" opacity=".8"/>
          <path d="M0 334L84 266 164 303 287 121 386 243 450 194 600 303V660H0Z" fill="#a0bdb1"/>
          <path d="M0 371L107 281 203 359 303 216 418 352 516 273 600 340V660H0Z" fill="#618f8c"/>
          <path d="M0 428L109 351 210 396 335 280 448 385 535 348 600 391V660H0Z" fill="#3d7273"/>
          <g stroke="#e0e9db" stroke-width="2" opacity=".56" fill="none">
            <path class="s72-draw" d="M-27 330Q111 179 218 326T618 288"/>
            <path class="s72-draw" d="M-24 352Q111 211 218 352T618 313"/>
            <path class="s72-draw" d="M-24 374Q111 242 218 377T618 340"/>
            <path class="s72-draw" d="M-24 396Q111 273 218 403T618 365"/>
            <path class="s72-draw" d="M-24 418Q111 303 218 429T618 392"/>
          </g>
          <path d="M0 486L149 429 258 497 359 395 484 481 600 420V660H0Z" fill="#245956"/>
          <path d="M393 372C359 425 415 460 325 497S157 549 204 660H476C469 577 380 562 431 505S489 424 450 379Z" fill="#183e49" opacity=".4"/>
          <path d="M393 370C360 424 414 457 325 489S159 539 201 660H457C449 584 372 558 426 498S480 426 449 385Z" fill="url(#s72-p-river)"/>
          <path class="s72-draw" d="M398 402Q388 460 328 494T212 642" fill="none" stroke="#e1f3df" stroke-width="7" opacity=".66"/>
          <g fill="#173f3d">
            <path d="M24 534L57 347 20 423 47 407 11 473 49 452 19 540Z"/>
            <path d="M86 553L122 385 81 450 111 430 77 508 112 479 81 564Z"/>
            <path d="M483 534L514 351 480 421 507 407 473 477 509 458 478 550Z"/>
            <path d="M540 567L572 375 536 456 564 437 532 514 565 491 533 573Z"/>
          </g>
          <path class="s72-draw" d="M68 570C166 511 224 567 306 481S442 314 511 245" fill="none" stroke="#f2e9c5" stroke-width="3" stroke-dasharray="6 12"/>
          <circle cx="511" cy="245" r="13" fill="#fff2cc" stroke="#2b6962" stroke-width="5"/>
        </svg>`,
      about:`
        <svg viewBox="0 0 600 660" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <linearGradient id="s72-a-bg" x1="0" y1="0" x2="1" y2="1">
              <stop stop-color="#e3c4b2"/><stop offset=".58" stop-color="#c99fa0"/><stop offset="1" stop-color="#a78d9f"/>
            </linearGradient>
            <radialGradient id="s72-a-glow"><stop stop-color="#f6e3ca" stop-opacity=".68"/><stop offset="1" stop-color="#f6e3ca" stop-opacity="0"/></radialGradient>
          </defs>
          <rect width="600" height="660" fill="url(#s72-a-bg)"/>
          <circle cx="314" cy="306" r="297" fill="url(#s72-a-glow)"/>
          <g fill="none" stroke="#5c4553" stroke-width="2">
            <circle cx="296" cy="299" r="222"/>
            <circle cx="296" cy="299" r="188" stroke-width=".8"/>
            <ellipse class="s72-draw" cx="296" cy="299" rx="245" ry="100" transform="rotate(-26 296 299)" stroke="#754958" stroke-width="3"/>
            <ellipse class="s72-draw" cx="296" cy="299" rx="119" ry="246" transform="rotate(24 296 299)" stroke="#764d5d" stroke-width="2"/>
            <ellipse class="s72-draw" cx="296" cy="299" rx="195" ry="72" transform="rotate(43 296 299)" stroke="#9f6470" stroke-width="1.5"/>
          </g>
          <path d="M102 250L197 156 330 178 445 111 512 246 473 407 342 494 177 445Z" fill="#9b6d77" opacity=".13"/>
          <g fill="#694851" opacity=".84" font-family="Georgia,serif" font-style="italic">
            <text x="155" y="375" font-size="216">L</text>
            <text x="291" y="401" font-size="208">M</text>
          </g>
          <circle cx="313" cy="303" r="15" fill="#f0cba9" stroke="#7f5d62" stroke-width="4"/>
          <path class="s72-draw" d="M40 130H128M82 86V174M470 480H553M511 438V522M45 554H554" fill="none" stroke="#755861" stroke-width="3"/>
          <g fill="none" stroke="#f3ddc4" stroke-width="1" opacity=".7">
            <path d="M60 57L534 531M62 518L529 70"/>
            <circle cx="296" cy="299" r="119"/>
          </g>
        </svg>`
    };
    const keys=["work","sound","places","about"];
    const labels={
      work:"FIELD / 01",
      sound:"FREQUENCY / 02",
      places:"ATLAS / 03",
      about:"IDENTITY / 04"
    };
    const wrapper=document.createDocumentFragment();
    for(const key of keys) {
      const panel=document.createElement("div");
      panel.className="s72-scene";
      panel.dataset.s72Scene=key;
      panel.setAttribute("aria-hidden","true");
      panel.innerHTML=arts[key];
      const code=document.createElement("span");
      code.className="s72-poster-code";
      code.textContent=labels[key];
      panel.appendChild(code);
      const mark=document.createElement("span");
      mark.className="s72-poster-mark";
      for(let i=0;i<4;i++){
        const tick=document.createElement("i");
        if(keys.indexOf(key)===i)tick.className="is-s72-lit";
        mark.appendChild(tick);
      }
      panel.appendChild(mark);
      wrapper.appendChild(panel);
    }
    board.appendChild(wrapper);
    if(board.querySelectorAll(":scope > .s72-scene svg").length!==4)return;
    const aura=document.createElement("span");
    aura.className="s72-aura";
    aura.setAttribute("aria-hidden","true");
    stage.prepend(aura);
    hub.dataset.s72Ready="1";
    hub.classList.add("s72-ready");

    const motion=window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrast=window.matchMedia("(prefers-contrast: more)");
    let previous="";
    const running=new Set();
    function cancel(){
      for(const a of [...running]){try{a.cancel()}catch(_){}}
      running.clear();
    }
    function draw(key) {
      if(motion.matches||contrast.matches||document.hidden||typeof Element.prototype.animate!=="function")return;
      const panel=board.querySelector('.s72-scene[data-s72-scene="'+key+'"]');
      if(!panel)return;
      const shapes=[...panel.querySelectorAll(".s72-draw")].flatMap(node=>
        node.matches("g")?[...node.querySelectorAll("path,circle,ellipse,rect")]:[node]
      ).slice(0,18);
      shapes.forEach((node,i)=>{
        if(typeof node.getTotalLength!=="function")return;
        let length=0;
        try{length=node.getTotalLength()}catch(_){return}
        if(!Number.isFinite(length)||length<12)return;
        const dash=Math.ceil(length)+2;
        const animation=node.animate([
          {strokeDasharray:dash+" "+dash,strokeDashoffset:dash,opacity:.20},
          {strokeDasharray:dash+" "+dash,strokeDashoffset:0,opacity:1}
        ],{
          duration:780+Math.min(i,9)*45,
          delay:Math.min(i*40,380),
          easing:"cubic-bezier(.18,.84,.24,1)",
          fill:"none"
        });
        running.add(animation);
        for(const event of ["finish","cancel"]){
          animation.addEventListener(event,()=>running.delete(animation),{once:true});
        }
      });
    }
    function sync(){
      const raw=hub.dataset.s22Scene||hub.dataset.s40Scene||"work";
      const key=keys.includes(raw)?raw:"work";
      if(key===previous)return;
      previous=key;
      cancel();
      draw(key);
    }
    new MutationObserver(sync).observe(hub,{
      attributes:true,attributeFilter:["data-s22-scene","data-s40-scene"]
    });
    motion.addEventListener?.("change",()=>{if(motion.matches)cancel()});
    contrast.addEventListener?.("change",()=>{if(contrast.matches)cancel()});
    document.addEventListener("visibilitychange",()=>{if(document.hidden)cancel()});
    sync();
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();