/* PHASE 89 — THE FOUR MATERIALS
   Original SVG art details inside the four existing illustrated worlds.
   No control duplication, no new scroll listeners, no GSAP overrides. */
(() => {
  const NS="http://www.w3.org/2000/svg";
  const art={
    work:{
      main:`<defs>
        <linearGradient id="s89w-gloss" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#fff7e6" stop-opacity=".31"/><stop offset=".5" stop-color="#fff7e6" stop-opacity=".02"/><stop offset="1" stop-color="#d8a17f" stop-opacity=".10"/></linearGradient>
      </defs>
      <g class="s89-reveal">
        <rect x="24" y="78" width="762" height="610" fill="url(#s89w-gloss)" class="s89-work-glass"/>
        <path d="M51 169H759M52 531H758" stroke="#f8f0dd" stroke-width="1.5" opacity=".53"/>
        <path d="M68 178V217M53 195H92M718 487H760M740 466V508" class="s89-work-line" opacity=".68"/>
        <g transform="translate(537 365)">
          <rect width="201" height="113" rx="3" fill="#f3e8d5" opacity=".85"/>
          <path d="M17 24H179M17 47H179" stroke="#8aa396" stroke-width="2" opacity=".68"/>
          <rect x="17" y="64" width="83" height="7" rx="3" fill="#325349" opacity=".72"/>
          <rect x="17" y="82" width="134" height="4" rx="2" fill="#325349" opacity=".35"/>
          <rect x="17" y="93" width="110" height="4" rx="2" fill="#325349" opacity=".35"/>
          <circle cx="167" cy="72" r="13" fill="#b98263"/>
          <path d="M162 72H173M167 67V77" stroke="#f6ecdf" stroke-width="1.6"/>
        </g>
        <path d="M61 573H249" stroke="#d5bca4" opacity=".7" stroke-width="2"/>
        <g transform="translate(461 600)">
          <circle cx="17" cy="17" r="16" fill="#c49b7e"/><path d="M13 17H21M17 13V21" stroke="#faf3e6" stroke-width="2"/>
          <circle cx="70" cy="17" r="16" fill="#6e977e"/><path d="M63 17L68 22 78 12" stroke="#f9f2df" stroke-width="2" fill="none"/>
          <circle cx="122" cy="17" r="16" fill="#2c594e"/><circle cx="122" cy="17" r="7" stroke="#fbf0dc" stroke-width="2" fill="none"/>
        </g>
        <path d="M53 668H741" stroke="#7e9385" opacity=".57"/>
        <text x="53" y="681" class="s89-print" font-size="8" fill="#496458">ART DIRECTION / 001</text>
        <text x="615" y="681" class="s89-print" font-size="8" fill="#496458">WEB / STUDIO</text>
      </g>
      <g class="s89-art-glint"><path d="M139 174L329 174L175 519H52Z" fill="#fffdf3" opacity=".12"/></g>`,
      card:`<g class="s89-reveal">
        <path d="M-16 24H289V208H-16Z" fill="#f9edd8" opacity=".12"/>
        <path d="M-16 230H287M-16 315H287" stroke="#809081" stroke-width="1" opacity=".68"/>
        <text x="-12" y="240" class="s89-print" font-size="12" fill="#315347">02 / DIGITAL</text>
        <path d="M6 392H290" stroke="#6e866e" stroke-width="2" opacity=".65"/>
      </g>`
    },
    sound:{
      vinyl:`<defs>
        <linearGradient id="s89s-gloss" x1="0" y1="0" x2="1" y2=".35"><stop stop-color="#faf6df" stop-opacity=".04"/><stop offset=".5" stop-color="#fcf8db" stop-opacity=".24"/><stop offset="1" stop-color="#fff8db" stop-opacity=".02"/></linearGradient>
      </defs>
      <g class="s89-reveal">
        <circle cx="1120" cy="488" r="452" fill="none" stroke="#c7dcbd" stroke-width="1.5" opacity=".47"/>
        <circle cx="1120" cy="488" r="427" fill="none" stroke="#c7dcbd" stroke-width="1.5" opacity=".29"/>
        <circle cx="1120" cy="488" r="385" fill="none" stroke="#c7dcbd" stroke-width="1.5" opacity=".29"/>
        <circle cx="1120" cy="488" r="347" fill="none" stroke="#a0b6a0" stroke-width="2" opacity=".37"/>
        <circle cx="1120" cy="488" r="298" fill="none" stroke="#c9d5bd" stroke-width="1.5" opacity=".42"/>
        <path d="M777 157A475 475 0 0 1 1502 283" class="s89-sound-sheen"/>
        <path d="M815 798A473 473 0 0 0 1494 763" stroke="#e8e5d0" stroke-width="28" fill="none" opacity=".05"/>
        <circle cx="1120" cy="488" r="151" fill="url(#s89s-gloss)" opacity=".25"/>
        <path d="M1078 429H1160M1078 443H1160" stroke="#4c5a46" stroke-width="2" opacity=".73"/>
        <text x="1120" y="558" font-family="monospace" font-size="12" letter-spacing="4" fill="#f2e2c8" text-anchor="middle">33⅓ / RPM</text>
        <text x="1120" y="580" font-family="monospace" font-size="11" letter-spacing="4" fill="#f2e2c8" text-anchor="middle">STEREO</text>
      </g>
      <g class="s89-art-glint">
        <path d="M744 213Q1047 -82 1360 125" stroke="#f9f6dd" stroke-width="18" fill="none" opacity=".15"/>
        <path d="M751 226Q1050 -42 1361 144" stroke="#f9f6dd" stroke-width="4" fill="none" opacity=".14"/>
      </g>`,
      arm:`<g class="s89-reveal">
        <circle cx="1510" cy="72" r="31" fill="none" stroke="#f7eed6" stroke-width="2.5" opacity=".8"/>
        <circle cx="1510" cy="72" r="21" fill="none" stroke="#2f5345" stroke-width="3" opacity=".78"/>
        <path d="M1517 118L1511 260Q1509 271 1502 281L1280 534" stroke="#f9edcc" stroke-width="2" fill="none" opacity=".59"/>
        <path d="M1239 550L1266 564 1311 527" stroke="#1e3029" stroke-width="8" fill="none"/>
        <circle cx="1269" cy="537" r="7" fill="#d8e4cb"/>
      </g>`
    },
    places:{
      far:`<g class="s89-reveal">
        <path d="M786 277L819 235 854 286M440 315L484 236 531 309M1110 333L1153 298 1197 349" class="s89-ridge"/>
        <path d="M560 258Q729 194 840 237T1097 257" stroke="#fff7e4" stroke-width="23" fill="none" opacity=".18"/>
        <path d="M960 175Q1115 148 1264 174T1577 158" stroke="#e6f1dc" stroke-width="2" fill="none" opacity=".41"/>
      </g>`,
      near:`<g class="s89-reveal">
        <path d="M815 697Q941 584 1076 688T1316 633" stroke="#e3ead3" stroke-width="3" fill="none" opacity=".27"/>
        <path d="M700 760Q858 640 990 747T1280 687" stroke="#d9e8d1" stroke-width="2" fill="none" opacity=".24"/>
        <path d="M1411 608L1431 546 1452 608M1431 546V670" stroke="#dce8d1" stroke-width="4" fill="none" opacity=".67"/>
        <path d="M1490 568L1511 497 1538 568M1511 499V651" stroke="#dce8d1" stroke-width="4" fill="none" opacity=".57"/>
        <path d="M1356 644L1372 601 1390 644M1372 601V711" stroke="#dce8d1" stroke-width="3" fill="none" opacity=".48"/>
      </g>`,
      river:`<g class="s89-reveal">
        <path class="s89-waterline" d="M1130 615Q1236 675 1149 720T1059 833Q1035 854 985 870"/>
        <path class="s89-waterline" d="M1262 625Q1352 682 1250 741T1122 867Q1051 924 1091 1030" opacity=".45"/>
        <path d="M1142 731L1176 722M1072 845L1108 831M1194 785L1220 770" stroke="#f4f8e3" stroke-width="3" opacity=".48"/>
        <path d="M1400 419Q1439 405 1484 420M1429 444Q1475 425 1502 438" stroke="#eaf1df" stroke-width="2.2" fill="none" opacity=".48"/>
      </g>`
    },
    about:{
      orbit:`<defs>
        <radialGradient id="s89a-star"><stop stop-color="#fff4dd"/><stop offset=".55" stop-color="#f7cbaa"/><stop offset="1" stop-color="#c38884"/></radialGradient>
      </defs>
      <g class="s89-reveal">
        <ellipse cx="1117" cy="481" rx="505" ry="227" transform="rotate(-31 1117 481)" fill="none" stroke="#eed4c1" stroke-width="1" opacity=".41"/>
        <circle cx="1439" cy="222" r="27" fill="url(#s89a-star)" class="s89-orbit-satellite"/>
        <circle cx="1439" cy="222" r="39" fill="none" stroke="#ffead5" stroke-width="1.6" opacity=".49"/>
        <circle cx="896" cy="755" r="19" fill="url(#s89a-star)" class="s89-orbit-satellite"/>
        <circle cx="896" cy="755" r="29" fill="none" stroke="#ffead5" stroke-width="1.1" opacity=".38"/>
        <circle cx="1346" cy="748" r="10" fill="#f0d6ba" opacity=".86"/>
        <circle cx="1346" cy="748" r="24" fill="none" stroke="#ffead5" stroke-width="1.3" opacity=".3"/>
        <path d="M1400 222H1341M896 784V827M1346 775L1373 798" stroke="#f5d9c2" stroke-width="1" opacity=".74"/>
      </g>`,
      lettering:`<g class="s89-reveal">
        <path d="M781 711H1466M795 727H1452" stroke="#f4d7c7" stroke-width="2" opacity=".22"/>
        <text x="788" y="771" class="s89-about-text">AN EXPERIMENT IN CURIOSITY</text>
        <text x="790" y="808" class="s89-print" font-size="13" fill="#f7d9c4" opacity=".68">DESIGN / SOUND / PLACES</text>
      </g>`
    }
  };
  function mount(target,markup,name){
    const group=document.createElementNS(NS,"g");
    group.setAttribute("class","s89-object "+name);
    group.setAttribute("aria-hidden","true");
    group.innerHTML=markup;
    if(!group.children.length)return false;
    target.appendChild(group);
    return true;
  }
  function init(){
    const hub=document.querySelector(".world-hub.s86-ready.s87-ready.s88-ready");
    const slides=[...(hub?.querySelectorAll(".s86-scroll .s86-slide")||[])];
    const order=["work","sound","places","about"];
    if(!hub||slides.length!==4||hub.dataset.s89Ready==="1"||
       slides.some((slide,i)=>slide.dataset.s86Scene!==order[i]))return;
    function svg(name){
      return slides[order.indexOf(name)]?.querySelector(".s86-artwork svg");
    }
    const work=svg("work"),sound=svg("sound"),places=svg("places"),about=svg("about");
    if(!work||!sound||!places||!about)return;
    const far=places.querySelector(".s86-mountains")?.parentElement;
    const near=places.querySelector(".s86-foreground")?.parentElement;
    const changes=[
      [work.querySelector(".s86-browser"),art.work.main,"s89-work-main"],
      [work.querySelector('g[transform*="translate(1265 495)"]'),art.work.card,"s89-work-card"],
      [sound.querySelector(".s86-vinyl"),art.sound.vinyl,"s89-sound-vinyl"],
      [sound.querySelector('g[transform="translate(0 0)"]:not(.s86-vinyl)'),art.sound.arm,"s89-sound-arm"],
      [far,art.places.far,"s89-places-far"],
      [near,art.places.near,"s89-places-near"],
      [places,art.places.river,"s89-places-river"],
      [about.querySelector(".s86-orbits"),art.about.orbit,"s89-about-orbits"],
      [about,art.about.lettering,"s89-about-typography"]
    ];
    if(changes.some(([node])=>!node))return;
    let ok=true;
    for(const [node,markup,name] of changes){
      if(!mount(node,markup,name)){ok=false;break}
    }
    if(!ok){
      slides.forEach(slide=>slide.querySelectorAll(".s89-object").forEach(el=>el.remove()));
      return;
    }
    hub.dataset.s89Ready="1";
    hub.classList.add("s89-ready");
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();