/* PHASE 86 — THE FOUR SCENES
   HOME REPLACEMENT: scroll to discover, one genuine Webflow link
   per world to enter. Every original world handler survives because
   we MOVE those links instead of creating duplicate controls.
   The four destination sections and the chapter gate are untouched.
   On any missing dependency, the original Home remains visible. */
(() => {
  function init(){
    const hub=document.querySelector(".world-hub");
    const oldLinks=hub?.querySelector(".world-links");
    const oldTop=hub?.querySelector(".world-top");
    const links=[...(oldLinks?.children||[])].filter(el=>el.classList?.contains("world-link"));
    if(!hub||!oldLinks||!oldTop||links.length!==4||hub.dataset.s86Ready==="1")return;

    // Build only when all four existing destinations are present.
    if([".work-world",".sound-world",".p14-world",".a17-world"].some(sel=>!document.querySelector(sel)))return;
    const names=["work","sound","places","about"];
    const descriptions={
      work:["01 / THE THINGS I BUILD","Explore selected work"],
      sound:["02 / THE THINGS I HEAR","Explore the sound archive"],
      places:["03 / THE PLACES I KEEP","Explore places & stories"],
      about:["04 / THE PERSON BEHIND IT","Explore who I am"]
    };
    // Original custom-designed panoramic imagery, NOT a small tilted
    // poster: each scene occupies the whole browser viewport.
    function imageFor(key){
      if(key==="work")return `
        <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <linearGradient id="s86workbg" x2="1" y2="1"><stop stop-color="#0e1819"/><stop offset=".7" stop-color="#28433b"/><stop offset="1" stop-color="#15231f"/></linearGradient>
            <radialGradient id="s86worklight"><stop stop-color="#e9ab80" stop-opacity=".55"/><stop offset="1" stop-color="#e9ab80" stop-opacity="0"/></radialGradient>
            <linearGradient id="s86workscreen" x2=".9" y2="1"><stop stop-color="#f4e7d2"/><stop offset="1" stop-color="#d6c5a9"/></linearGradient>
            <linearGradient id="s86workimage" x2="1" y2="1"><stop stop-color="#678d7c"/><stop offset=".65" stop-color="#2d5a54"/><stop offset="1" stop-color="#132d30"/></linearGradient>
            <filter id="s86workshadow" x="-40%" y="-40%" width="180%" height="190%"><feGaussianBlur stdDeviation="38"/></filter>
          </defs>
          <rect width="1600" height="1000" fill="url(#s86workbg)"/>
          <ellipse cx="1150" cy="505" rx="750" ry="650" fill="url(#s86worklight)"/>
          <g stroke="#b5d0be" opacity=".12" stroke-width="1">
            ${Array.from({length:27},(_,i)=>'<path d="M'+(i*68)+' 0V1000"/>').join("")}
            ${Array.from({length:18},(_,i)=>'<path d="M0 '+(i*65)+'H1600"/>').join("")}
          </g>
          <g transform="translate(677 116) rotate(-10 395 390)">
            <rect x="18" y="38" width="810" height="714" rx="16" fill="#000" opacity=".35" filter="url(#s86workshadow)"/>
            <rect x="0" y="0" width="810" height="714" rx="10" fill="#e0d6c5" stroke="#f4dac3" stroke-width="3"/>
            <rect x="0" y="0" width="810" height="56" rx="10" fill="#31493e"/>
            <rect x="0" y="39" width="810" height="17" fill="#31493e"/>
            <circle cx="32" cy="28" r="7" fill="#f1b48d"/>
            <circle cx="56" cy="28" r="7" fill="#8eae97"/>
            <circle cx="80" cy="28" r="7" fill="#d4e1c5"/>
            <path d="M610 28H775" stroke="#bdcdb8" opacity=".55" stroke-width="4"/>
            <rect x="24" y="78" width="762" height="610" fill="url(#s86workscreen)"/>
            <text x="57" y="131" font-family="Arial,Helvetica,sans-serif" font-size="38" fill="#29463f" font-weight="800" letter-spacing="-2">RED HOUSE.</text>
            <text x="611" y="117" font-family="Arial,Helvetica,sans-serif" font-size="13" fill="#466156" letter-spacing="3">STUDIO  /  01</text>
            <path d="M52 148H757" stroke="#769587" stroke-width="2" opacity=".55"/>
            <rect x="52" y="174" width="706" height="342" fill="url(#s86workimage)"/>
            <circle cx="610" cy="254" r="91" fill="#d8aa8a" opacity=".92"/>
            <path d="M52 473L240 301 372 423 514 254 666 419 758 359V516H52Z" fill="#a9c5a5" opacity=".75"/>
            <path d="M52 500L208 395 342 490 492 347 665 473 758 430V516H52Z" fill="#386960" opacity=".9"/>
            <text x="73" y="246" font-family="Georgia,serif" font-style="italic" font-size="76" fill="#f4e8d1">Made to</text>
            <text x="73" y="321" font-family="Georgia,serif" font-style="italic" font-size="76" fill="#f4e8d1">be felt.</text>
            <rect x="52" y="542" width="365" height="22" rx="2" fill="#344f43"/>
            <rect x="52" y="588" width="650" height="8" rx="2" fill="#799187"/>
            <rect x="52" y="611" width="561" height="8" rx="2" fill="#799187"/>
            <rect x="52" y="633" width="609" height="8" rx="2" fill="#799187"/>
            <rect x="625" y="542" width="131" height="33" rx="17" fill="#cb926e"/>
          </g>
          <g transform="translate(1265 495) rotate(13 0 0)" opacity=".94">
            <rect x="-35" y="0" width="345" height="386" rx="4" fill="#f4dfbf" stroke="#b7c7ae" stroke-width="3"/>
            <rect x="-14" y="26" width="302" height="185" fill="#6b947f"/>
            <path d="M-14 185L100 90 178 167 252 106 288 143V211H-14Z" fill="#bed8be"/>
            <path d="M8 246H220M8 275H265M8 292H195M8 311H245" stroke="#425a4c" stroke-width="8"/>
            <rect x="8" y="339" width="110" height="23" rx="11" fill="#b78463"/>
          </g>
          <path d="M635 84V893M612 84H657M612 893H657" stroke="#efd5b7" opacity=".42" stroke-width="2"/>
          <text x="685" y="938" font-family="monospace" font-size="17" letter-spacing="5" fill="#e8bba0" opacity=".83">SELECTED WORK   —   DIGITAL OBJECTS</text>
        </svg>`;
      if(key==="sound"){
        const grooves=Array.from({length:19},(_,i)=>
          '<circle cx="1120" cy="488" r="'+(167+i*17)+'" fill="none" stroke="'+(i%3===0?'#c5d8bb':'#729986')+'" stroke-width="'+(i%4===0?2.3:.9)+'" opacity="'+(i%3===0?.54:.32)+'"/>').join("");
        return `
        <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <linearGradient id="s86soundbg" x2="1" y2="1"><stop stop-color="#101b19"/><stop offset=".55" stop-color="#263f35"/><stop offset="1" stop-color="#0b1414"/></linearGradient>
            <radialGradient id="s86soundvinyl"><stop stop-color="#4f6658"/><stop offset=".22" stop-color="#1e2a26"/><stop offset=".61" stop-color="#151d1c"/><stop offset=".83" stop-color="#273a31"/><stop offset="1" stop-color="#101b18"/></radialGradient>
            <radialGradient id="s86soundhalo"><stop stop-color="#acdab1" stop-opacity=".24"/><stop offset="1" stop-color="#acdab1" stop-opacity="0"/></radialGradient>
          </defs>
          <rect width="1600" height="1000" fill="url(#s86soundbg)"/>
          <ellipse cx="1120" cy="455" rx="590" ry="590" fill="url(#s86soundhalo)"/>
          <path d="M0 745H1600M0 753H1600" stroke="#d5dfc0" stroke-width="2" opacity=".18"/>
          <g transform="translate(0 0)">
            <circle cx="1120" cy="488" r="506" fill="#13231f" opacity=".84" stroke="#7c9683" stroke-width="3"/>
            <circle cx="1120" cy="488" r="480" fill="url(#s86soundvinyl)" stroke="#9ab69a" stroke-width="4"/>
            ${grooves}
            <circle cx="1120" cy="488" r="151" fill="#c8caac" stroke="#27352a" stroke-width="8"/>
            <circle cx="1120" cy="488" r="111" fill="#b68c72" opacity=".88"/>
            <circle cx="1120" cy="488" r="67" fill="#2d4439"/>
            <text x="1120" y="473" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="49" fill="#eae4cd">LM.</text>
            <text x="1120" y="527" text-anchor="middle" font-family="monospace" font-size="14" letter-spacing="5" fill="#eae4cd">SIDE A</text>
            <circle cx="1120" cy="488" r="9" fill="#0e211b" stroke="#e9d7b6" stroke-width="3"/>
            <path d="M707 143L1489 811" stroke="#f5e3b6" stroke-width="2" opacity=".24"/>
          </g>
          <g transform="translate(0 0)">
            <circle cx="1510" cy="72" r="44" fill="#b8b995" stroke="#304638" stroke-width="12"/>
            <circle cx="1510" cy="72" r="12" fill="#22392f"/>
            <path d="M1510 72L1502 269 1268 541" stroke="#263c31" stroke-width="31" fill="none" stroke-linecap="round"/>
            <path d="M1510 72L1502 269 1268 541" stroke="#dde0c4" stroke-width="13" fill="none" stroke-linecap="round"/>
            <rect x="1234" y="520" width="67" height="29" rx="4" fill="#bdad93" transform="rotate(-47 1268 537)"/>
          </g>
          <g stroke="#b6d7b0" opacity=".36" stroke-width="3" fill="none">
            ${Array.from({length:24},(_,i)=>'<path d="M'+(i*29)+' 866V'+(866-(i%4===0?70:i%3===0?48:i%2===0?27:13))+'"/>').join("")}
          </g>
          <text x="716" y="952" font-family="monospace" font-size="17" letter-spacing="6" fill="#b8d3b7" opacity=".82">SOUND STUDIES   /   ANALOG FREQUENCIES</text>
        </svg>`;
      }
      if(key==="places")return `
        <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <linearGradient id="s86placesky" x2="0" y2="1"><stop stop-color="#89acb4"/><stop offset=".49" stop-color="#b6d3c4"/><stop offset="1" stop-color="#779a8c"/></linearGradient>
            <linearGradient id="s86placeriver" x2=".8" y2="1"><stop stop-color="#e2ecd8"/><stop offset=".32" stop-color="#9bd8c5"/><stop offset=".79" stop-color="#398c89"/><stop offset="1" stop-color="#165b6a"/></linearGradient>
            <radialGradient id="s86placesun"><stop stop-color="#faeac2" stop-opacity=".82"/><stop offset="1" stop-color="#faeac2" stop-opacity="0"/></radialGradient>
          </defs>
          <rect width="1600" height="1000" fill="url(#s86placesky)"/>
          <circle cx="1281" cy="205" r="380" fill="url(#s86placesun)"/>
          <path d="M0 596L151 392 302 470 484 236 642 367 799 138 983 379 1110 264 1304 420 1480 299 1600 445V1000H0Z" fill="#c9d8c9"/>
          <path d="M0 650L194 456 346 543 523 309 668 472 819 235 1007 496 1130 369 1315 534 1488 404 1600 523V1000H0Z" fill="#8db0a2"/>
          <path d="M762 299L819 235 881 324 827 298 811 280 793 313Z" fill="#f0eede" opacity=".82"/>
          <path d="M0 717L213 560 382 686 550 470 712 648 856 416 1057 654 1210 492 1400 692 1600 558V1000H0Z" fill="#4b8480"/>
          <path d="M0 834L232 669 417 763 594 625 808 779 970 594 1142 747 1375 625 1600 758V1000H0Z" fill="#285f60"/>
          <path d="M0 909L204 773 407 877 596 730 773 853 961 720 1140 857 1401 759 1600 853V1000H0Z" fill="#184748"/>
          <path d="M1000 583C910 690 1203 677 1031 802S758 901 827 1080H1381C1360 966 1160 885 1316 812S1437 683 1307 600Z" fill="#0f4853" opacity=".45"/>
          <path d="M992 581C918 668 1203 675 1012 794S768 895 832 1080H1296C1291 975 1139 905 1292 818S1415 691 1280 597Z" fill="url(#s86placeriver)"/>
          <path d="M997 616C995 682 1140 709 1040 788S877 861 882 985" stroke="#e5f3df" stroke-width="10" fill="none" opacity=".55"/>
          <g fill="#153f40">
            ${[60,160,275,425,1400,1510].map((x,i)=>'<path d="M'+x+' 1010L'+(x+28)+' '+(550+(i%3)*40)+' '+(x+42)+' '+(775+(i%2)*35)+' '+(x+65)+' '+(688+(i%2)*53)+' '+(x+51)+' 1010Z"/>').join("")}
          </g>
          <path d="M838 995Q936 893 1025 839T1263 650" stroke="#f0e8bb" stroke-width="4" fill="none" stroke-dasharray="10 17" opacity=".88"/>
          <circle cx="1263" cy="650" r="17" fill="#f0eac9" stroke="#2e7870" stroke-width="6"/>
          <text x="703" y="951" fill="#e4f0de" opacity=".6" font-family="monospace" font-size="16" letter-spacing="6">SOČA VALLEY / STORIES ON THE MOVE</text>
        </svg>`;
      return `
        <svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <defs>
            <linearGradient id="s86aboutbg" x2="1" y2="1"><stop stop-color="#2a2630"/><stop offset=".48" stop-color="#80595b"/><stop offset="1" stop-color="#b07e77"/></linearGradient>
            <radialGradient id="s86aboutglow"><stop stop-color="#e3b89b" stop-opacity=".55"/><stop offset="1" stop-color="#e3b89b" stop-opacity="0"/></radialGradient>
          </defs>
          <rect width="1600" height="1000" fill="url(#s86aboutbg)"/>
          <ellipse cx="1120" cy="496" rx="700" ry="600" fill="url(#s86aboutglow)"/>
          <g fill="none" stroke="#f4d4bb" opacity=".2" stroke-width="1.2">
            ${Array.from({length:13},(_,i)=>'<path d="M'+(630+i*91)+' 0V1000"/>').join("")}
            ${Array.from({length:10},(_,i)=>'<path d="M550 '+(i*115)+'H1600"/>').join("")}
          </g>
          <g fill="none" stroke="#ecd6c4" stroke-width="3">
            <circle cx="1117" cy="481" r="406" opacity=".38"/>
            <circle cx="1117" cy="481" r="339" opacity=".23"/>
            <ellipse cx="1117" cy="481" rx="490" ry="207" transform="rotate(-31 1117 481)" opacity=".8"/>
            <ellipse cx="1117" cy="481" rx="250" ry="513" transform="rotate(24 1117 481)" opacity=".65"/>
            <ellipse cx="1117" cy="481" rx="445" ry="133" transform="rotate(47 1117 481)" opacity=".45"/>
          </g>
          <path d="M810 265L1042 114 1265 245 1460 118 1514 450 1300 719 953 791 757 568Z" fill="#e2b499" opacity=".13"/>
          <text x="755" y="663" font-family="Georgia,serif" font-style="italic" font-size="470" fill="#f4d3b4" opacity=".78" letter-spacing="-35">L</text>
          <text x="1062" y="736" font-family="Georgia,serif" font-style="italic" font-size="448" fill="#eac1a8" opacity=".85" letter-spacing="-35">M</text>
          <circle cx="1117" cy="481" r="24" fill="#f4dabf" stroke="#7e5557" stroke-width="8"/>
          <g fill="none" stroke="#f9dec8" stroke-width="3" opacity=".72">
            <path d="M648 181H738M693 136V226M1450 760H1559M1504 705V815M651 865H1516"/>
          </g>
          <text x="696" y="947" font-family="monospace" font-size="17" letter-spacing="7" fill="#f7d6c0" opacity=".78">MAKE   /   LISTEN   /   WANDER</text>
        </svg>`;
    }

    const experience=document.createElement("div");
    experience.className="s86-experience";
    const scroll=document.createElement("div");
    scroll.className="s86-scroll";
    scroll.setAttribute("role","region");
    scroll.setAttribute("aria-label","Explore the four worlds. Scroll to change chapter, or activate a title to enter.");
    scroll.tabIndex=0;

    const slides=[];
    for(let i=0;i<names.length;i++){
      const key=names[i];
      const section=document.createElement("section");
      section.className="s86-slide";
      section.dataset.s86Scene=key;
      section.setAttribute("aria-label",descriptions[key][0]);
      const visual=document.createElement("div");
      visual.className="s86-visual";
      visual.setAttribute("aria-hidden","true");
      const drawing=document.createElement("div");
      drawing.className="s86-artwork";
      drawing.innerHTML=imageFor(key);
      const grain=document.createElement("span");
      grain.className="s86-grain";
      visual.append(drawing,grain);

      const content=document.createElement("div");
      content.className="s86-slide-content";
      const eyebrow=document.createElement("p");
      eyebrow.className="s86-eyebrow";
      eyebrow.textContent=descriptions[key][0];
      const originalLink=links[i];
      const cue=document.createElement("span");
      cue.className="s86-enter";
      cue.innerHTML=descriptions[key][1]+' <span class="s86-enter-arrow" aria-hidden="true">↗</span>';
      originalLink.appendChild(cue);
      content.append(eyebrow,originalLink);
      section.append(visual,content);
      scroll.appendChild(section);
      slides.push(section);
    }

    const header=document.createElement("header");
    header.className="s86-header";
    header.innerHTML='<div class="s86-brand">LM<span>.</span> &nbsp; / &nbsp; LUCA MAREGA</div>'+
      '<div class="s86-header-note">An interactive portfolio &nbsp; / &nbsp; 2026</div>';
    const corner=document.createElement("div");
    corner.className="s86-corner";
    corner.setAttribute("aria-hidden","true");
    const dots=[];
    for(let i=0;i<4;i++){
      const dot=document.createElement("i");
      corner.appendChild(dot);dots.push(dot);
    }
    const footer=document.createElement("footer");
    footer.className="s86-footer";
    const scrollHint=document.createElement("span");
    scrollHint.className="s86-scroll-hint";
    scrollHint.textContent="SCROLL TO DISCOVER";
    const progress=document.createElement("div");
    progress.className="s86-progress";
    progress.setAttribute("aria-hidden","true");
    const current=document.createElement("span");
    current.textContent="01";
    const progressRule=document.createElement("span");
    progressRule.className="s86-progress-rule";
    const progressFill=document.createElement("span");
    progressRule.appendChild(progressFill);
    const total=document.createElement("span");
    total.textContent="04";
    progress.append(current,progressRule,total);
    footer.append(scrollHint,progress);
    experience.append(scroll,header,corner,footer);

    // At this point every original link is alive inside its own slide,
    // so there is no double-Enter/Explore. All old event handlers are
    // still attached to those exact nodes.
    if(slides.length!==4||
       scroll.querySelectorAll(".world-link").length!==4||
       scroll.querySelectorAll(".s86-artwork svg").length!==4) return;

    let active=0;
    function highlight(i){
      if(i<0||i>3||i===active&&hub.dataset.s86Scene===names[i])return;
      active=i;
      const key=names[i];
      hub.dataset.s86Scene=key;
      current.textContent=String(i+1).padStart(2,"0");
      progressFill.style.transform="scaleX("+((i+1)/4)+")";
      const palette=["#e7ab7e","#c5dd9c","#bcdbcd","#e5b9a2"];
      experience.style.setProperty("--s86-global-accent",palette[i]);
      dots.forEach((dot,index)=>dot.classList.toggle("is-current",index===i));
      slides.forEach((slide,index)=>{
        slide.classList.toggle("is-s86-visible",index===i);
        // Only the current slide's original link is in the tab order.
        // The source nodes retain onclick logic and focus restoration.
        if(index!==i&&!slide.contains(document.activeElement)){
          links[index].tabIndex=-1;
        } else links[index].removeAttribute("tabindex");
      });
    }

    const motion=window.matchMedia("(prefers-reduced-motion: reduce)");
    // Natural scroll-snap, wheel and touchscreen work without JS
    // wheel interception. IntersectionObserver is only presentation state.
    let observer=null;
    if("IntersectionObserver" in window){
      observer=new IntersectionObserver(records=>{
        let best=null;
        for(const record of records){
          if(!record.isIntersecting)continue;
          if(!best||record.intersectionRatio>best.intersectionRatio)best=record;
        }
        if(best){
          const i=slides.indexOf(best.target);
          if(i>=0)highlight(i);
        }
      },{root:scroll,threshold:[.35,.55,.75]});
      slides.forEach(s=>observer.observe(s));
    } else {
      let raf=0;
      scroll.addEventListener("scroll",()=>{
        if(raf)return;
        raf=requestAnimationFrame(()=>{
          raf=0;
          const i=Math.round(scroll.scrollTop/Math.max(1,scroll.clientHeight));
          highlight(Math.max(0,Math.min(3,i)));
        });
      },{passive:true});
    }
    // Up/down/space does exactly one scene, no hidden gestures.
    scroll.addEventListener("keydown",e=>{
      if(hub.inert||e.altKey||e.metaKey||e.ctrlKey)return;
      const element=document.activeElement;
      if(element&&/INPUT|TEXTAREA|SELECT/.test(element.tagName))return;
      const next={"ArrowDown":active+1,"PageDown":active+1,
        "ArrowUp":active-1,"PageUp":active-1,
        "Home":0,"End":3};
      if(!(e.key in next))return;
      e.preventDefault();
      const target=Math.max(0,Math.min(3,next[e.key]));
      slides[target].scrollIntoView({
        behavior:motion.matches?"auto":"smooth",block:"start"
      });
      highlight(target);
      // Page remains accessible through Tab and Enter. No synthetic click.
    });

    // When an old world is closed, its own original handler restores
    // focus to the original link, now VISIBLY placed in this chapter.
    // Keep our progress aligned with that focus rather than moving
    // the user back to an unrelated first slide.
    links.forEach((link,i)=>link.addEventListener("focus",()=>{
      if(i===active)return;
      slides[i].scrollIntoView({
        behavior:motion.matches?"auto":"smooth",block:"start"
      });
      highlight(i);
    }));

    // Activate only after the four original links are mounted.
    // Two frames give the first scene a real cinematic entrance.
    hub.appendChild(experience);
    hub.dataset.s86Ready="1";
    hub.classList.add("s86-ready");
    requestAnimationFrame(()=>requestAnimationFrame(()=>highlight(0)));
  }
  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();