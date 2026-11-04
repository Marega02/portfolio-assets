/* STEP 71 — ABOUT / THE INNER WORLDS
   Original vector identity systems for MAKE, LISTEN, WANDER.
   Adds only non-interactive art INSIDE the original card and editorial
   artwork. Existing a17/a18 controllers own selection, content and links.
   Entire feature remains dormant until both galleries mount successfully. */
(() => {
  function init() {
    const about=document.querySelector(".a17-world");
    const card=about?.querySelector(".a17-card");
    const cardArt=card?.querySelector(".a17-card-art");
    const plate=about?.querySelector(".a18-visual");
    const oldPlateArt=plate?.querySelector(".a18-art");
    if(!about||!card||!cardArt||!plate||!oldPlateArt||about.dataset.s71Ready==="1")return;

    const makeHero=`
      <svg viewBox="0 0 600 690" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><linearGradient id="s71-hm-base" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f5dfb9"/><stop offset="1" stop-color="#b4bba9"/></linearGradient></defs>
        <rect width="600" height="690" fill="url(#s71-hm-base)"/>
        <g stroke="#254b46" stroke-width=".9" opacity=".23">
          <path d="M0 80H600M0 140H600M0 200H600M0 260H600M0 320H600M0 380H600M0 440H600M0 500H600M0 560H600M0 620H600"/>
          <path d="M70 0V690M140 0V690M210 0V690M280 0V690M350 0V690M420 0V690M490 0V690M560 0V690"/>
        </g>
        <g fill="none" stroke="#2b5146" stroke-width="2" opacity=".85">
          <rect x="108" y="161" width="353" height="345"/>
          <rect x="130" y="183" width="309" height="301"/>
          <path d="M130 248H439M130 416H439M213 183V484"/>
          <path d="M78 110H129M104 85V136M467 529H520M493 503V555"/>
        </g>
        <g fill="#395c50" opacity=".22">
          <rect x="213" y="248" width="226" height="168"/>
          <rect x="130" y="183" width="309" height="65" fill="#f4e4cb"/>
        </g>
        <path d="M230 390C289 322 320 361 375 278" fill="none" stroke="#b66c5b" stroke-width="10" stroke-linecap="round"/>
        <g fill="#ba705e"><circle cx="230" cy="390" r="9"/><circle cx="302" cy="345" r="9"/><circle cx="375" cy="278" r="9"/></g>
        <g stroke="#27493f" stroke-width="2" fill="none"><path d="M88 575H499M89 589H340M89 603H428"/></g>
        <path d="M106 151L133 123M463 519L494 487" stroke="#b56a53" stroke-width="3"/>
      </svg>`;
    const listenHero=`
      <svg viewBox="0 0 600 690" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><radialGradient id="s71-hl-haze"><stop stop-color="#b2a0dc" stop-opacity=".64"/><stop offset="1" stop-color="#6e719f" stop-opacity="0"/></radialGradient></defs>
        <rect width="600" height="690" fill="#c1bed5"/>
        <circle cx="314" cy="329" r="277" fill="url(#s71-hl-haze)"/>
        <g fill="none" stroke="#303954" opacity=".65">
          <circle cx="309" cy="323" r="230" stroke-width="2"/>
          <circle cx="309" cy="323" r="205" stroke-width="1.4"/>
          <circle cx="309" cy="323" r="177" stroke-width="2"/>
          <circle cx="309" cy="323" r="151" stroke-width=".8"/>
          <circle cx="309" cy="323" r="117" stroke-width="2"/>
          <circle cx="309" cy="323" r="83" stroke-width="1.5"/>
          <circle cx="309" cy="323" r="48" stroke-width="2.5"/>
        </g>
        <path d="M12 513C71 467 94 554 156 514S248 472 296 511S389 554 442 509S525 479 589 504" fill="none" stroke="#8b638f" stroke-width="11" opacity=".76"/>
        <path d="M12 542C71 496 94 583 156 543S248 501 296 540S389 583 442 538S525 508 589 533" fill="none" stroke="#eadce1" stroke-width="3" opacity=".78"/>
        <g fill="#313953" opacity=".3"><path d="M0 615V586H15V612H29V570H43V619H56V550H71V614H86V568H100V616H114V548H128V613H142V587H156V624H171V554H185V621H198V572H213V625H228V544H242V622H255V572H269V620H285V556H300V617H315V577H330V619H345V555H360V614H377V574H391V616H409V562H424V613H440V580H456V618H471V564H486V618H500V580H514V613H528V568H542V616H557V583H573V619H600V690H0Z"/></g>
        <circle cx="309" cy="323" r="14" fill="#a76799"/>
        <path d="M72 85H216M72 99H164M405 82H532M444 96H532" stroke="#45516e" stroke-width="2" opacity=".5"/>
      </svg>`;
    const wanderHero=`
      <svg viewBox="0 0 600 690" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><linearGradient id="s71-hw-sky" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#dce9d2"/><stop offset=".65" stop-color="#a5c5b6"/><stop offset="1" stop-color="#78a798"/></linearGradient></defs>
        <rect width="600" height="690" fill="url(#s71-hw-sky)"/>
        <circle cx="421" cy="197" r="101" fill="#f4e7ba" opacity=".82"/>
        <path d="M0 401L99 301 161 341 280 190 389 317 465 252 600 365V690H0Z" fill="#8fb2a4"/>
        <path d="M0 432L148 290 231 376 361 259 467 369 600 307V690H0Z" fill="#5e9385"/>
        <path d="M0 508L101 401 188 445 290 358 408 451 511 382 600 433V690H0Z" fill="#366e63"/>
        <g fill="none" stroke="#eff1d9" stroke-width="1.5" opacity=".55">
          <path d="M-34 409Q128 216 289 391T643 338"/>
          <path d="M-20 435Q128 246 289 414T643 368"/>
          <path d="M-20 461Q128 276 289 444T643 398"/>
          <path d="M-20 487Q128 310 289 474T643 430"/>
          <path d="M-20 513Q128 346 289 504T643 460"/>
        </g>
        <path d="M49 656C190 544 227 614 333 489S442 322 549 272" fill="none" stroke="#e4e9c5" stroke-width="7" stroke-linecap="round" stroke-dasharray="3 16"/>
        <circle cx="549" cy="272" r="12" fill="#f4e5bc" stroke="#24584e" stroke-width="4"/>
        <path d="M0 599L121 546 218 581 305 524 431 595 531 546 600 572V690H0Z" fill="#224f4b"/>
        <g stroke="#d9f1d4" stroke-width="1.3" opacity=".4" fill="none">
          <path d="M43 122H180M43 136H128M454 490H575M482 502H575"/>
        </g>
      </svg>`;
    const makePlate=`
      <svg viewBox="0 0 600 750" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><linearGradient id="s71-pm-base" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f0d7b6"/><stop offset="1" stop-color="#b3bca8"/></linearGradient></defs>
        <rect width="600" height="750" fill="url(#s71-pm-base)"/>
        <g stroke="#2b4d46" stroke-width="1" opacity=".17">
          <path d="M0 75H600M0 150H600M0 225H600M0 300H600M0 375H600M0 450H600M0 525H600M0 600H600M0 675H600"/>
          <path d="M75 0V750M150 0V750M225 0V750M300 0V750M375 0V750M450 0V750M525 0V750"/>
        </g>
        <rect x="69" y="113" width="441" height="474" fill="#324f46"/>
        <rect x="95" y="138" width="391" height="421" fill="#e4cfb0"/>
        <rect x="95" y="138" width="391" height="83" fill="#c1bba5"/>
        <rect x="122" y="160" width="47" height="14" fill="#3c6b58"/>
        <rect x="181" y="160" width="76" height="14" fill="#6e8a74"/>
        <rect x="411" y="160" width="48" height="14" fill="#ad6851"/>
        <rect x="122" y="262" width="140" height="236" fill="#d5b29b"/>
        <rect x="285" y="262" width="174" height="110" fill="#628b7b"/>
        <path d="M285 498L350 403 385 450 425 390 459 498Z" fill="#385b50"/>
        <g fill="none" stroke="#f5e8ca" stroke-width="2">
          <path d="M313 349C360 278 390 314 428 285"/>
          <path d="M120 278H239M120 300H218M120 322H235"/>
          <rect x="310" y="400" width="114" height="73"/>
        </g>
        <circle cx="354" cy="304" r="19" fill="#dfb38f"/>
        <g fill="none" stroke="#2b534a" stroke-width="2">
          <path d="M47 88H112M80 55V120M492 609H552M522 577V642"/>
          <path d="M96 595H511M96 614H381M96 630H462"/>
        </g>
        <circle cx="480" cy="108" r="43" fill="#a46e60" opacity=".55"/>
      </svg>`;
    const listenPlate=`
      <svg viewBox="0 0 600 750" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><radialGradient id="s71-pl-bg"><stop stop-color="#dfc9e3"/><stop offset="1" stop-color="#8c94bb"/></radialGradient></defs>
        <rect width="600" height="750" fill="url(#s71-pl-bg)"/>
        <g fill="none" stroke="#222f4d">
          <circle cx="311" cy="331" r="250" stroke-width="2"/>
          <circle cx="311" cy="331" r="227" stroke-width="1"/>
          <circle cx="311" cy="331" r="205" stroke-width="2"/>
          <circle cx="311" cy="331" r="180" stroke-width=".9"/>
          <circle cx="311" cy="331" r="150" stroke-width="2.5"/>
          <circle cx="311" cy="331" r="117" stroke-width=".9"/>
          <circle cx="311" cy="331" r="87" stroke-width="2"/>
        </g>
        <circle cx="311" cy="331" r="61" fill="#34445e"/>
        <circle cx="311" cy="331" r="44" fill="#dfc4d0"/>
        <circle cx="311" cy="331" r="12" fill="#34445e"/>
        <path d="M0 541Q49 460 96 536T197 532T301 540T409 536T513 538T608 526" fill="none" stroke="#ad689e" stroke-width="17" opacity=".65"/>
        <path d="M0 561Q49 479 96 558T197 556T301 560T409 556T513 558T608 547" fill="none" stroke="#f7e8dc" stroke-width="4" opacity=".66"/>
        <g fill="#36485b" opacity=".35">
          <path d="M0 683V625H16V668H30V600H45V680H60V586H75V664H90V612H105V681H120V568H136V673H152V613H168V673H184V581H199V676H215V610H231V685H247V566H262V675H278V607H294V676H310V574H325V682H341V615H357V665H373V572H388V679H404V623H420V680H435V591H452V666H467V612H484V678H499V584H516V674H531V618H547V665H563V589H580V680H600V750H0Z"/>
        </g>
        <path d="M65 106H221M65 123H165M444 92H554M473 110H554" stroke="#293c55" stroke-width="2" opacity=".43"/>
      </svg>`;
    const wanderPlate=`
      <svg viewBox="0 0 600 750" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs><linearGradient id="s71-pw-grad" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#e2eace"/><stop offset=".62" stop-color="#a7c6b3"/><stop offset="1" stop-color="#608f81"/></linearGradient></defs>
        <rect width="600" height="750" fill="url(#s71-pw-grad)"/>
        <circle cx="456" cy="178" r="113" fill="#fff1c0" opacity=".6"/>
        <path d="M-30 361L91 258 173 300 307 143 429 286 506 231 640 362V750H0Z" fill="#a9c0ae"/>
        <path d="M-30 414L117 287 215 377 346 230 459 353 560 295 640 359V750H0Z" fill="#6b9d8e"/>
        <path d="M-30 482L92 386 209 442 310 334 440 445 543 384 640 456V750H0Z" fill="#356f61"/>
        <g fill="none" stroke="#ebf5d8" stroke-width="2" opacity=".52">
          <path d="M-50 352Q86 189 225 329T649 304"/>
          <path d="M-50 385Q86 230 225 360T649 335"/>
          <path d="M-50 418Q86 268 225 392T649 367"/>
          <path d="M-50 451Q86 309 225 424T649 398"/>
          <path d="M-50 484Q86 351 225 456T649 430"/>
          <path d="M-50 517Q86 391 225 488T649 463"/>
          <path d="M-50 550Q86 430 225 522T649 497"/>
        </g>
        <path d="M0 595L118 524 238 583 341 496 466 572 600 535V750H0Z" fill="#184a45"/>
        <path d="M92 716C195 605 242 671 317 559S453 363 520 346" fill="none" stroke="#e6ecc9" stroke-width="7" stroke-dasharray="4 17" stroke-linecap="round"/>
        <g fill="#fae4b6" stroke="#21584b" stroke-width="4">
          <circle cx="92" cy="716" r="11"/><circle cx="520" cy="346" r="12"/>
        </g>
        <path d="M44 111H169M44 129H119M445 581H560M474 600H560" fill="none" stroke="#2a574e" stroke-width="2" opacity=".55"/>
      </svg>`;

    const heroArt={make:makeHero,listen:listenHero,wander:wanderHero};
    const plateArt={make:makePlate,listen:listenPlate,wander:wanderPlate};
    const names={
      make:["DESIGN STUDY / 01","FORM FOLLOWS FEELING"],
      listen:["SOUND STUDY / 02","FEEL THE FREQUENCY"],
      wander:["FIELD STUDY / 03","CURIOSITY IN MOTION"]
    };
    const hero=document.createElement("div");
    hero.className="s71-hero-worlds";
    hero.setAttribute("aria-hidden","true");
    const gallery=document.createElement("div");
    gallery.className="s71-plate-worlds";
    gallery.setAttribute("aria-hidden","true");
    for(const key of ["make","listen","wander"]){
      const a=document.createElement("div");
      a.className="s71-hero-scene";
      a.dataset.s71Scene=key;
      a.innerHTML=heroArt[key];
      hero.appendChild(a);
      const b=document.createElement("div");
      b.className="s71-plate-scene";
      b.dataset.s71Scene=key;
      b.innerHTML=plateArt[key];
      gallery.appendChild(b);
    }
    const legend=document.createElement("div");
    legend.className="s71-hero-legend";
    legend.setAttribute("aria-hidden","true");
    legend.innerHTML='<span data-s71-legend-a></span><span data-s71-legend-b></span>';
    card.insertBefore(hero,cardArt);
    card.appendChild(legend);
    plate.insertBefore(gallery,oldPlateArt);
    if(hero.querySelectorAll(".s71-hero-scene svg").length!==3 ||
       gallery.querySelectorAll(".s71-plate-scene svg").length!==3)return;

    about.classList.add("s71-ready");
    about.dataset.s71Ready="1";
    const reduce=window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrast=window.matchMedia("(prefers-contrast: more)");
    let prevHero="",prevPlate="",wasOpen=false;
    const activeAnimations=new Set();
    const stop=()=>{
      for(const a of [...activeAnimations]){try{a.cancel()}catch(_){}}
      activeAnimations.clear();
    };
    function animateShape(node,frames,opt){
      const a=node.animate(frames,{...opt,fill:"none"});
      activeAnimations.add(a);
      a.addEventListener("finish",()=>activeAnimations.delete(a),{once:true});
      a.addEventListener("cancel",()=>activeAnimations.delete(a),{once:true});
    }
    function draw(panel) {
      if(!panel || reduce.matches || contrast.matches || document.hidden ||
         typeof Element.prototype.animate!=="function")return;
      const shapes=[...panel.querySelectorAll("path,circle,rect,polyline")];
      let i=0;
      for(const shape of shapes) {
        if(i>=13 || typeof shape.getTotalLength!=="function")break;
        let length=0;
        try{length=shape.getTotalLength()}catch(_){continue}
        if(!Number.isFinite(length)||length<45)continue;
        const color=getComputedStyle(shape).stroke;
        if(!color||color==="none")continue;
        const n=Math.ceil(length)+2;
        animateShape(shape,[
          {strokeDasharray:n+" "+n,strokeDashoffset:n,opacity:.3},
          {strokeDasharray:n+" "+n,strokeDashoffset:0,opacity:1}
        ],{
          duration:730+Math.min(i,8)*40,delay:i*39,
          easing:"cubic-bezier(.18,.84,.25,1)"
        });
        i++;
      }
    }
    function sync() {
      const open=about.classList.contains("is-active");
      if(!open){wasOpen=false;stop();return}
      const key=about.dataset.mode||"make";
      const lower=plate.dataset.scene||"make";
      const firstOpen=!wasOpen;
      wasOpen=true;
      if(names[key]){
        legend.querySelector("[data-s71-legend-a]").textContent=names[key][0];
        legend.querySelector("[data-s71-legend-b]").textContent=names[key][1];
        if(firstOpen || prevHero!==key) {
          prevHero=key;
          stop();
          draw(hero.querySelector('.s71-hero-scene[data-s71-scene="'+key+'"]'));
        }
      }
      if(["make","listen","wander"].includes(lower) && (firstOpen||prevPlate!==lower)){
        prevPlate=lower;
        // The second editorial card can be far below the viewport:
        // it already crossfades through CSS, so don't animate hidden art.
        const box=plate.getBoundingClientRect();
        const viewer=about.getBoundingClientRect();
        if(box.top<viewer.bottom && box.bottom>viewer.top)
          draw(gallery.querySelector('.s71-plate-scene[data-s71-scene="'+lower+'"]'));
      }
    }
    new MutationObserver(sync).observe(about,{
      attributes:true,attributeFilter:["class","data-mode"]
    });
    new MutationObserver(sync).observe(plate,{
      attributes:true,attributeFilter:["data-scene"]
    });
    reduce.addEventListener?.("change",()=>{if(reduce.matches)stop()});
    contrast.addEventListener?.("change",()=>{if(contrast.matches)stop()});
    document.addEventListener("visibilitychange",()=>{if(document.hidden)stop()});
    sync();
  }
  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();