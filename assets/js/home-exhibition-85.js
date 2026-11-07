/* PHASE 85 — HOME / THE KINETIC EXHIBITION
   Four original graphic projections surround the existing poster.
   Only observes the SAME selected-scene attributes used by Step 72.
   No click/hover listeners, no GSAP transforms, no scene navigation. */
(() => {
  function init() {
    const hub=document.querySelector(".world-hub");
    const stage=hub?.querySelector(".world-stage");
    const sheet=stage?.querySelector(".stage-sheet");
    const board=sheet?.querySelector(".s22-art");
    if(!hub||!stage||!sheet||!board||
       !hub.classList.contains("s72-ready")||hub.dataset.s85Ready==="1")return;

    const diagrams={
      work:`
        <svg viewBox="0 0 720 720" aria-hidden="true" focusable="false">
          <g class="s85-wash"><rect x="73" y="70" width="562" height="574" rx="2"/></g>
          <g class="s85-hair">
            <path d="M74 138H646M74 210H646M74 282H646M74 354H646M74 426H646M74 498H646M74 570H646"/>
            <path d="M142 70V645M214 70V645M286 70V645M358 70V645M430 70V645M502 70V645M574 70V645"/>
          </g>
          <g class="s85-draw">
            <path d="M57 56H653V661H57Z"/>
            <path d="M98 96H613V615H98Z"/>
            <path d="M98 195H613M98 519H613M232 195V519M482 195V519"/>
            <path d="M154 258H423M154 298H377M154 338H439M154 378H322"/>
            <path d="M515 259V423M552 236V433M590 281V441"/>
            <path d="M28 73H98M63 38V108M605 623H689M647 582V665"/>
          </g>
          <g class="s85-dot"><circle cx="232" cy="195" r="7"/><circle cx="482" cy="519" r="7"/><circle cx="358" cy="354" r="4"/></g>
        </svg>`,
      sound:`
        <svg viewBox="0 0 720 720" aria-hidden="true" focusable="false">
          <g class="s85-wash"><circle cx="359" cy="347" r="298"/></g>
          <g class="s85-hair">
            <circle cx="359" cy="347" r="304"/>
            <circle cx="359" cy="347" r="272"/>
            <circle cx="359" cy="347" r="238"/>
            <circle cx="359" cy="347" r="205"/>
            <circle cx="359" cy="347" r="169"/>
            <circle cx="359" cy="347" r="129"/>
            <circle cx="359" cy="347" r="91"/>
          </g>
          <g class="s85-draw">
            <circle cx="359" cy="347" r="285"/>
            <circle cx="359" cy="347" r="185"/>
            <circle cx="359" cy="347" r="48"/>
            <path d="M21 561V526M38 561V497M55 561V516M72 561V473M89 561V520M106 561V484M123 561V506M140 561V452M157 561V500M174 561V479M191 561V520M208 561V463M225 561V491M242 561V512M259 561V463M276 561V489M293 561V520M310 561V475M327 561V453M344 561V499M361 561V469M378 561V517M395 561V481M412 561V457M429 561V492M446 561V520M463 561V466M480 561V495M497 561V514M514 561V455M531 561V484M548 561V506M565 561V475M582 561V519M599 561V485M616 561V506M633 561V469M650 561V500M667 561V521M684 561V478"/>
            <path d="M23 598H698M65 615H640"/>
          </g>
          <g class="s85-dot"><circle cx="359" cy="347" r="11"/><circle cx="585" cy="171" r="7"/></g>
        </svg>`,
      places:`
        <svg viewBox="0 0 720 720" aria-hidden="true" focusable="false">
          <g class="s85-wash">
            <path d="M-40 175C153 22 290 148 381 95S606 26 758 126V694H-40Z"/>
          </g>
          <g class="s85-hair">
            <path d="M-52 141C116 19 283 118 386 57S616 1 762 79"/>
            <path d="M-52 184C116 61 283 160 386 99S616 43 762 121"/>
            <path d="M-52 230C116 107 283 206 386 145S616 89 762 167"/>
            <path d="M-52 275C116 152 283 252 386 190S616 134 762 212"/>
            <path d="M-52 320C116 197 283 297 386 235S616 180 762 258"/>
            <path d="M-52 365C116 242 283 342 386 280S616 225 762 303"/>
            <path d="M-52 410C116 287 283 387 386 325S616 270 762 348"/>
            <path d="M-52 455C116 332 283 432 386 370S616 315 762 393"/>
            <path d="M-52 500C116 377 283 477 386 415S616 360 762 438"/>
            <path d="M-52 545C116 422 283 522 386 460S616 405 762 483"/>
            <path d="M-52 590C116 467 283 567 386 505S616 450 762 528"/>
          </g>
          <g class="s85-draw">
            <path d="M-28 214C127 93 284 180 389 126S609 70 744 158"/>
            <path d="M-28 344C127 223 284 310 389 256S609 200 744 288"/>
            <path d="M-28 475C127 354 284 441 389 387S609 331 744 419"/>
            <path d="M104 651C191 577 227 612 304 517S427 428 514 329 580 205 670 137"/>
            <path d="M78 646H214M518 105H688"/>
          </g>
          <g class="s85-dot"><circle cx="104" cy="651" r="11"/><circle cx="670" cy="137" r="13"/><circle cx="514" cy="329" r="6"/></g>
        </svg>`,
      about:`
        <svg viewBox="0 0 720 720" aria-hidden="true" focusable="false">
          <g class="s85-wash"><circle cx="349" cy="344" r="298"/></g>
          <g class="s85-hair">
            <circle cx="349" cy="344" r="301"/>
            <circle cx="349" cy="344" r="252"/>
            <circle cx="349" cy="344" r="186"/>
            <path d="M349 6V682M9 344H697"/>
          </g>
          <g class="s85-draw">
            <ellipse cx="349" cy="344" rx="327" ry="124" transform="rotate(-28 349 344)"/>
            <ellipse cx="349" cy="344" rx="145" ry="328" transform="rotate(27 349 344)"/>
            <ellipse cx="349" cy="344" rx="286" ry="88" transform="rotate(42 349 344)"/>
            <path d="M54 67H169M111 11V124M550 579H671M610 520V644"/>
            <path d="M142 656H556M182 675H504"/>
          </g>
          <g class="s85-dot">
            <circle cx="349" cy="344" r="11"/>
            <circle cx="542" cy="181" r="9"/>
            <circle cx="191" cy="510" r="7"/>
          </g>
        </svg>`
    };
    const keys=["work","sound","places","about"];
    const projection=document.createElement("div");
    projection.className="s85-projection";
    projection.setAttribute("aria-hidden","true");
    for(const key of keys){
      const panel=document.createElement("div");
      panel.className="s85-plate";
      panel.dataset.s85Plate=key;
      panel.innerHTML=diagrams[key];
      projection.appendChild(panel);
    }
    const exposure=document.createElement("span");
    exposure.className="s85-exposure";
    exposure.setAttribute("aria-hidden","true");
    const folio=document.createElement("div");
    folio.className="s85-folio";
    folio.setAttribute("aria-hidden","true");
    const number=document.createElement("span");
    number.className="s85-folio-number";
    const caption=document.createElement("span");
    caption.className="s85-folio-caption";
    folio.append(number,caption);

    if(projection.querySelectorAll("svg").length!==4)return;
    stage.prepend(projection);
    board.appendChild(exposure);
    stage.appendChild(folio);

    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrast=window.matchMedia("(prefers-contrast: more)");
    const enabled=()=>!reduced.matches&&!contrast.matches&&!document.hidden;
    const legends={
      work:["01","DIGITAL / DESIGN"],
      sound:["02","ANALOG / RHYTHM"],
      places:["03","TRAVEL / ATLAS"],
      about:["04","PERSONAL / IDENTITY"]
    };
    let previous="";
    let endTimer=0;

    function stop(){
      if(endTimer){clearTimeout(endTimer);endTimer=0}
      hub.classList.remove("s85-changing");
    }
    function sync(){
      const raw=hub.dataset.s22Scene||hub.dataset.s40Scene||"work";
      const key=keys.includes(raw)?raw:"work";
      if(key===previous)return;
      const first=previous==="";
      previous=key;
      stop();
      hub.dataset.s85Scene=key;
      number.textContent=legends[key][0];
      caption.textContent=legends[key][1];
      if(first||!enabled())return;
      // Restart decorative print pass, even during rapid successive
      // selections. The four illustrated posters own their transitions.
      void exposure.offsetWidth;
      hub.classList.add("s85-changing");
      endTimer=setTimeout(()=>{
        hub.classList.remove("s85-changing");
        endTimer=0;
      },1050);
    }
    hub.dataset.s85Ready="1";
    hub.classList.add("s85-ready");
    new MutationObserver(sync).observe(hub,{
      attributes:true,attributeFilter:["data-s22-scene","data-s40-scene"]
    });
    reduced.addEventListener?.("change",()=>{if(reduced.matches)stop()});
    contrast.addEventListener?.("change",()=>{if(contrast.matches)stop()});
    document.addEventListener("visibilitychange",()=>{
      if(document.hidden)stop();
    });
    sync();
  }
  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();