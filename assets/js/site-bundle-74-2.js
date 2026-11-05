/* STEP 74 / JS BUNDLE 2 OF 4: original execution order retained */

/* SOURCE assets/js/cinematic-gate.js */
/* STEP 27 — CINEMATIC CHAPTER GATE
   Passive decorative overlay synchronized with existing world class changes.
   Never intercepts clicks, focus, Escape, navigation or GSAP.
*/
(() => {
  function init() {
    const specs=[
      {scene:"work",selector:".work-world",number:"01",title:"WORK",sub:"DESIGNED EXPERIENCES",tag:"ART DIRECTION / THE MAKER"},
      {scene:"sound",selector:".sound-world",number:"02",title:"SOUND",sub:"ANALOG FREQUENCIES",tag:"THE LISTENER / THE RECORD"},
      {scene:"places",selector:".p14-world",number:"03",title:"PLACES",sub:"THE LIVING ATLAS",tag:"THE WANDERER / FIELD NOTES"},
      {scene:"about",selector:".a17-world",number:"04",title:"ABOUT",sub:"THE HUMAN SIDE",tag:"THE HUMAN / PERSONAL NOTES"}
    ];
    const roots=specs.map(spec=>document.querySelector(spec.selector));
    if(roots.some(root=>!root)||document.querySelector(".s27-sequence"))return;
    const media=window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const overlay=document.createElement("div");
    overlay.className="s27-sequence";
    overlay.setAttribute("aria-hidden","true");
    overlay.setAttribute("inert","");
    overlay.innerHTML=[
      '<div class="s27-gate s27-gate-left"></div>',
      '<div class="s27-gate s27-gate-right"></div>',
      '<div class="s27-scan"></div>',
      '<div class="s27-grain"></div>',
      '<span class="s27-ghost">01</span>',
      '<div class="s27-inner"><div class="s27-topline"><span>LM® / A PERSONAL UNIVERSE</span><span>CHAPTER 01 / 04</span></div>',
      '<p class="s27-eyebrow">ART DIRECTION / THE MAKER</p>',
      '<span class="s27-title">WORK<em>01.</em></span>',
      '<div class="s27-subline"><span>DESIGNED EXPERIENCES</span><span>ENTERING A NEW WORLD / LM®</span></div></div>',
      '<div class="s27-beam"></div>'
    ].join("");
    document.body.appendChild(overlay);
    const ghost=overlay.querySelector(".s27-ghost");
    const eyebrow=overlay.querySelector(".s27-eyebrow");
    const headline=overlay.querySelector(".s27-title");
    const topline=overlay.querySelector(".s27-topline span:last-child");
    const subline=overlay.querySelector(".s27-subline span:first-child");
    let cleanup=null;
    let playing=-1;
    const seen=roots.map(root=>root.classList.contains("is-active"));
    function clearGate() {
      if(cleanup!==null){window.clearTimeout(cleanup);cleanup=null;}
      overlay.classList.remove("is-playing");
      playing=-1;
    }
    function play(index){
      if(media?.matches || document.hidden)return;
      const spec=specs[index];
      if(!spec)return;
      clearGate();
      overlay.dataset.scene=spec.scene;
      ghost.textContent=spec.number;
      eyebrow.textContent=spec.tag;
      headline.innerHTML=spec.title+"<em>"+spec.number+".</em>";
      topline.textContent="CHAPTER "+spec.number+" / 04";
      subline.textContent=spec.sub;
      // Force a fresh entrance animation on rapid world changes.
      void overlay.offsetWidth;
      overlay.classList.add("is-playing");
      playing=index;
      cleanup=window.setTimeout(clearGate,1200);
    }
    roots.forEach((root,index)=>{
      const observer=new MutationObserver(()=>{
        const active=root.classList.contains("is-active");
        if(active && !seen[index])play(index);
        if(!active && seen[index] && playing===index)clearGate();
        seen[index]=active;
      });
      observer.observe(root,{attributes:true,attributeFilter:["class"]});
    });
    document.addEventListener("visibilitychange",()=>{if(document.hidden)clearGate()});
    if(media?.addEventListener)media.addEventListener("change",()=>{if(media.matches)clearGate()});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();
;


/* SOURCE assets/js/directors-cut.js */
/* STEP 28 — DIRECTOR'S CUT / PROJECT DNA
   Purely additive: no edits to original case-study code, media, focus or transition.
*/
(() => {
  function init(){
    const scene=document.querySelector(".case-world");
    const story=scene?.querySelector(".case-story");
    const chapter=scene?.querySelector(".case-chapter");
    const top=scene?.querySelector(".case-top");
    const visual=scene?.querySelector(".case-visual");
    if(!scene||!story||!chapter||!top||!visual||scene.classList.contains("s28-ready"))return;
    const details={
      redhouse:{index:"01",name:"RED HOUSE STUDIO",title:"A DISTINCTIVE",italic:"IDENTITY.",deck:"An editorial visual language built to express a contemporary salon's personality.",tags:["BOLD TYPE","WARM TONES","CUSTOM MOTION"],chapters:["IDENTITY","ATMOSPHERE","EXPERIENCE"],numbers:["01","02","03"]},
      soca:{index:"02",name:"SOČA VALLEY",title:"A DIFFERENT",italic:"PERSPECTIVE.",deck:"A visual journey where landscape, movement and atmospheric storytelling work together.",tags:["NATURE","MOVEMENT","STORYTELLING"],chapters:["LANDSCAPE","RHYTHM","EXPLORATION"],numbers:["01","02","03"]},
      gianni:{index:"03",name:"TRATTORIA DA GIANNI",title:"A WARM",italic:"WELCOME.",deck:"A warm, accessible digital identity that puts food, place and tradition at its heart.",tags:["HOSPITALITY","HERITAGE","CLARITY"],chapters:["TRADITION","FLAVOUR","CONNECTION"],numbers:["01","02","03"]}
    };
    const section=document.createElement("section");
    section.className="s28-dossier";
    section.setAttribute("aria-label","Project DNA — creative visual study");
    section.innerHTML=[
      '<div class="s28-dossier-head"><span>02 / PROJECT DNA</span><span class="s28-dossier-ident">CASE FILE / 001</span></div>',
      '<h3 class="s28-dossier-title"><span>A DISTINCTIVE</span><em>IDENTITY.</em></h3>',
      '<p class="s28-dossier-deck"></p>',
      '<div class="s28-panels">',
      ...[1,2,3].map(i=>'<article class="s28-panel"><div class="s28-panel-label"><span>VISUAL STUDY / 0'+i+'</span><span>LM®</span></div><div class="s28-art" aria-hidden="true"><span class="s28-panel-count">'+i+'</span></div><div class="s28-panel-bottom"><strong class="s28-panel-word"></strong><span>0'+i+' / 03</span></div></article>'),
      '</div>',
      '<div class="s28-dossier-foot"><span class="s28-dossier-label">PROJECT STUDIES / 001</span><span>THREE NOTES / ONE DIRECTION</span></div>'
    ].join("");
    scene.insertBefore(section,chapter);
    const folio=document.createElement("span");
    folio.className="s28-top-folio";
    folio.textContent="DIRECTOR'S CUT / 001";
    const back=top.querySelector(".case-back");
    if(back)top.insertBefore(folio,back);else top.appendChild(folio);
    const imageFolio=document.createElement("span");
    imageFolio.className="s28-image-folio";
    imageFolio.setAttribute("aria-hidden","true");
    imageFolio.textContent="STUDY / 001";
    visual.appendChild(imageFolio);
    const ident=section.querySelector(".s28-dossier-ident");
    const heading=section.querySelector(".s28-dossier-title");
    const deck=section.querySelector(".s28-dossier-deck");
    const label=section.querySelector(".s28-dossier-label");
    const words=[...section.querySelectorAll(".s28-panel-word")];
    const activeTheme=()=>details[scene.dataset.theme]?scene.dataset.theme:"redhouse";
    function sync(){
      const data=details[activeTheme()];
      ident.textContent="CASE FILE / 0"+data.index;
      heading.querySelector("span").textContent=data.title;
      heading.querySelector("em").textContent=data.italic;
      deck.textContent=data.deck;
      words.forEach((word,i)=>word.textContent=data.chapters[i]);
      label.textContent=data.name+" / SELECTED WORK";
      folio.textContent="DIRECTOR'S CUT / "+data.index;
      imageFolio.textContent="STUDY / "+data.index;
    }
    new MutationObserver(sync).observe(scene,{attributes:true,attributeFilter:["data-theme"]});
    sync();
    scene.classList.add("s28-ready");
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();
;


/* SOURCE assets/js/open-channel.js */
/* STEP 29 — OPEN CHANNEL | Local-only project brief composer.
 * No backend calls, no storage and no publishing of personal email addresses.
 */
(() => {
  function init() {
    const about=document.querySelector(".a17-world");
    const shell=about?.querySelector(".s29-contact");
    if(!about||!shell||shell.dataset.s29Ready==="true")return;
    const buttons=[...shell.querySelectorAll(".s29-service")];
    const form=shell.querySelector(".s29-form");
    const name=shell.querySelector(".s29-input");
    const description=shell.querySelector(".s29-textarea");
    const selection=shell.querySelector(".s29-selected");
    const status=shell.querySelector(".s29-status");
    const copy=shell.querySelector(".s29-copy");
    if(buttons.length!==3||!form||!name||!description||!selection||!status||!copy)return;
    const topics={
      website:{label:"Website / Webflow",intro:"a new website or a Webflow project"},
      interaction:{label:"Interactive experience",intro:"an interactive digital experience"},
      ai:{label:"AI workflow & prompts",intro:"an AI workflow or custom prompting project"}
    };
    let selected="website";
    let sending=false;
    function pick(key){
      if(!Object.prototype.hasOwnProperty.call(topics,key))return;
      selected=key;
      selection.textContent=topics[key].label.toUpperCase();
      buttons.forEach(button=>{
        const active=button.dataset.s29Service===key;
        button.setAttribute("aria-pressed",String(active));
      });
      status.textContent="";
    }
    function buildBrief(){
      const sender=name.value.trim().slice(0,120);
      const details=description.value.trim().slice(0,2000);
      return [
        "Hello Luca,",
        "",
        "I'd like to talk about "+topics[selected].intro+".",
        "",
        "PROJECT BRIEF",
        "Type: "+topics[selected].label,
        "Name: "+(sender||"Not provided"),
        "Idea: "+(details||"I'd love to share a few details and discuss what's possible."),
        "",
        "Looking forward to hearing from you."
      ].join("\n");
    }
    async function copyMessage(){
      if(sending)return;
      sending=true;
      const message=buildBrief();
      try{
        if(!navigator.clipboard?.writeText)throw new Error("Clipboard API unavailable");
        await navigator.clipboard.writeText(message);
        status.textContent="BRIEF COPIED — READY TO SHARE.";
      }catch(error){
        let ok=false;
        const helper=document.createElement("textarea");
        helper.value=message;
        helper.setAttribute("readonly","");
        helper.style.cssText="position:fixed;left:-10000px;top:0;opacity:0";
        document.body.appendChild(helper);
        try{
          helper.focus();
          helper.select();
          ok=!!document.execCommand?.("copy");
        }catch(e){ok=false;}
        helper.remove();
        if(ok)status.textContent="BRIEF COPIED — READY TO SHARE.";
        else{
          status.textContent="COPY BLOCKED BY BROWSER. A COPY WINDOW WILL OPEN.";
          window.prompt("Copy your project brief:",message);
        }
      }finally{sending=false;}
    }
    buttons.forEach(button=>button.addEventListener("click",()=>pick(button.dataset.s29Service)));
    form.addEventListener("submit",event=>{event.preventDefault();copyMessage();});
    description.addEventListener("input",()=>{status.textContent="";});
    name.addEventListener("input",()=>{status.textContent="";});
    shell.dataset.s29Ready="true";
    pick("website");
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();
;


/* SOURCE assets/js/inside-the-build.js */
/* STEP 30 — INSIDE THE BUILD
   Case-study proof of craft. Uses descriptive project information only.
   No invented analytics, client quotes, live-site URLs or API requests.
   Does not modify existing images, navigation, GSAP or scroll handlers.
*/
(() => {
  const data={
    redhouse:{
      n:"01",short:"RH.",name:"RED HOUSE STUDIO",type:"WEB DESIGN / WEBFLOW",
      views:{
        brief:{
          eyebrow:"01 / THE PURPOSE",title:"Give the brand its own voice.",
          body:"The aim was to present a contemporary hair studio with personality, while making the services, team, product selection and booking path easy to discover.",
          tags:["Distinctive identity","Clear service discovery","Booking-oriented navigation"]
        },
        build:{
          eyebrow:"02 / THE APPROACH",title:"An expressive yet usable website.",
          body:"Built in Webflow with responsive page layouts, dedicated service and product presentations, team profiles, custom interactions and carefully paced motion.",
          tags:["Webflow","Responsive layouts","Custom interactions"]
        },
        result:{
          eyebrow:"03 / THE OUTPUT",title:"A cohesive digital presence.",
          body:"A multi-section website experience connecting the studio's character with practical visitor journeys. The portfolio demonstrates the design and build; commercial performance has not been measured here.",
          tags:["Brand presentation","Product showcase","Functional calls to action"]
        }
      }
    },
    soca:{
      n:"02",short:"SV.",name:"SOČA VALLEY",type:"VISUAL STORYTELLING / WEBFLOW",
      views:{
        brief:{
          eyebrow:"01 / THE PURPOSE",title:"Make the landscape feel alive.",
          body:"Explore how a digital experience can capture the atmosphere of the Soča Valley through imagery, motion and editorial storytelling rather than a conventional travel layout.",
          tags:["Atmosphere","Place-based storytelling","Visual exploration"]
        },
        build:{
          eyebrow:"02 / THE APPROACH",title:"A journey guided by movement.",
          body:"Designed and built in Webflow with large-scale landscape visuals, video-based moments, carefully structured typography, scroll interactions and responsive layouts.",
          tags:["Webflow","Cinematic visuals","Scroll-based motion"]
        },
        result:{
          eyebrow:"03 / THE OUTPUT",title:"A place you can explore on screen.",
          body:"An immersive digital storytelling concept that connects landscape, rhythm and narrative through a distinct visual direction. This is a creative showcase, not a claim of measured tourism impact.",
          tags:["Immersive presentation","Editorial composition","Responsive experience"]
        }
      }
    },
    gianni:{
      n:"03",short:"DG.",name:"TRATTORIA DA GIANNI",type:"RESTAURANT WEBSITE / WEBFLOW",
      views:{
        brief:{
          eyebrow:"01 / THE PURPOSE",title:"Put warmth and clarity first.",
          body:"Create a welcoming restaurant website concept that quickly communicates the cuisine, local character and the practical information a guest needs before visiting.",
          tags:["Hospitality","Easy discovery","Local character"]
        },
        build:{
          eyebrow:"02 / THE APPROACH",title:"A simple journey, carefully made.",
          body:"Designed in Webflow around food imagery, featured dishes, opening hours, contact details and a location map, with responsive layouts and clear navigation.",
          tags:["Webflow","Food presentation","Mobile-friendly structure"]
        },
        result:{
          eyebrow:"03 / THE OUTPUT",title:"An inviting restaurant experience.",
          body:"A warm digital presentation that puts the menu highlights and essential visit information at the center. This is a website concept; no reservation or revenue results are claimed.",
          tags:["Dish highlights","Hours and contacts","Location information"]
        }
      }
    }
  };
  const viewLabels={brief:"THE BRIEF",build:"THE BUILD",result:"THE OUTPUT"};
  function init(){
    const scene=document.querySelector(".case-world");
    const chapter=scene?.querySelector(".case-chapter");
    const footer=scene?.querySelector(".case-bottom");
    if(!scene||!chapter||!footer||scene.classList.contains("s30-ready")||scene.querySelector(".s30-evidence"))return;

    const section=document.createElement("section");
    section.className="s30-evidence";
    section.setAttribute("aria-label","Inside the Build — project process and deliverables");
    section.innerHTML=[
      '<div class="s30-kicker-row"><span>04 / INSIDE THE BUILD</span><span class="s30-case-number">CASE STUDY / 001</span></div>',
      '<div class="s30-intro"><h3 class="s30-headline">BEYOND THE <em>VISUAL.</em></h3><p class="s30-intro-desc">The thinking, the tools and the work behind each experience. Not fabricated numbers — a closer look at what was actually designed.</p></div>',
      '<div class="s30-workbench">',
        '<div class="s30-notes">',
          '<div class="s30-tabs" role="group" aria-label="Explore the project process">',
            '<button class="s30-tab" type="button" data-s30-view="brief" aria-pressed="true"><span class="s30-tab-index">01 /</span><span class="s30-tab-label">The Brief</span></button>',
            '<button class="s30-tab" type="button" data-s30-view="build" aria-pressed="false"><span class="s30-tab-index">02 /</span><span class="s30-tab-label">The Build</span></button>',
            '<button class="s30-tab" type="button" data-s30-view="result" aria-pressed="false"><span class="s30-tab-index">03 /</span><span class="s30-tab-label">The Output</span></button>',
          '</div>',
          '<div class="s30-note" role="region" aria-live="polite" aria-atomic="false" aria-label="Selected project process detail">',
            '<span class="s30-note-label"></span><h4 class="s30-note-title"></h4><p class="s30-note-copy"></p><div class="s30-capabilities" aria-label="Project details"></div>',
          '</div>',
        '</div>',
        '<div class="s30-technical" data-view="brief">',
          '<div class="s30-tech-head"><span>WORKING FILE / LM®</span><span class="s30-tech-lights" aria-hidden="true"><i></i><i></i><i></i></span></div>',
          '<div class="s30-tech-main"><div class="s30-blueprint" aria-hidden="true"><div class="s30-bp-head"><span>PROJECT / <span class="s30-bp-number">01</span></span><span>DESIGN STUDY</span></div><div class="s30-bp-core"><span class="s30-bp-symbol">RH.</span></div><div class="s30-bp-footer"><span class="s30-bp-phase">THE BRIEF</span><span>LM® / 2026</span></div></div></div>',
          '<div class="s30-tech-foot"><span class="s30-tech-project">RED HOUSE STUDIO</span><b class="s30-tech-type">WEB DESIGN / WEBFLOW</b></div>',
        '</div>',
      '</div>',
      '<div class="s30-bottomline"><span>REAL WORK / NO MADE-UP METRICS</span><span>DESIGN / BUILD / EXPERIENCE</span></div>'
    ].join("");
    scene.insertBefore(section,footer);
    const buttons=[...section.querySelectorAll(".s30-tab")];
    const technical=section.querySelector(".s30-technical");
    const title=section.querySelector(".s30-note-title");
    const detail=section.querySelector(".s30-note-copy");
    const eyebrow=section.querySelector(".s30-note-label");
    const chips=section.querySelector(".s30-capabilities");
    const number=section.querySelector(".s30-case-number");
    const bpNumber=section.querySelector(".s30-bp-number");
    const symbol=section.querySelector(".s30-bp-symbol");
    const phase=section.querySelector(".s30-bp-phase");
    const projectName=section.querySelector(".s30-tech-project");
    const type=section.querySelector(".s30-tech-type");
    let view="brief";
    let theme="";
    function render(){
      const project=data[theme];
      if(!project)return;
      const content=project.views[view];
      section.dataset.project=theme;
      section.dataset.view=view;
      technical.dataset.theme=theme;
      technical.dataset.view=view;
      number.textContent="CASE STUDY / "+project.n;
      bpNumber.textContent=project.n;
      symbol.textContent=project.short;
      projectName.textContent=project.name;
      type.textContent=project.type;
      eyebrow.textContent=content.eyebrow;
      title.textContent=content.title;
      detail.textContent=content.body;
      phase.textContent=viewLabels[view];
      chips.replaceChildren();
      for(const label of content.tags){
        const chip=document.createElement("span");
        chip.className="s30-chip";
        chip.textContent=label;
        chips.appendChild(chip);
      }
      buttons.forEach(b=>{
        const selected=b.dataset.s30View===view;
        b.setAttribute("aria-pressed",String(selected));
      });
    }
    function syncTheme(){
      const next=data[scene.dataset.theme]?scene.dataset.theme:"redhouse";
      if(next===theme)return;
      theme=next;
      view="brief";
      render();
    }
    buttons.forEach(button=>button.addEventListener("click",()=>{
      const next=button.dataset.s30View;
      if(!Object.prototype.hasOwnProperty.call(viewLabels,next))return;
      view=next;
      render();
    }));
    new MutationObserver(syncTheme).observe(scene,{attributes:true,attributeFilter:["data-theme"]});
    syncTheme();
    scene.classList.add("s30-ready");
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();
;


/* SOURCE assets/js/live-dossier.js */
/* STEP 31 — LIVE DOSSIER
 * HOME-only scene preview, synced with existing scene handlers.
 * No changes to GSAP, page transitions, or World Index.
 */
(() => {
  function init(){
    const hub=document.querySelector(".world-hub");
    const main=hub?.querySelector(".world-main");
    const stage=hub?.querySelector(".world-stage");
    const links=hub?[...hub.querySelectorAll(".world-link")]:[];
    if(!hub||!main||!stage||links.length!==4||hub.classList.contains("s31-ready"))return;
    const scenes=[
      {key:"work",label:"WORK",verb:"MAKE IT",accent:"MATTER.",desc:"Selected websites, visual systems and digital experiences built with intention."},
      {key:"sound",label:"SOUND",verb:"FEEL THE",accent:"FREQUENCY.",desc:"An archive of music, rhythm and the sounds that shape my creative world."},
      {key:"places",label:"PLACES",verb:"GO BEYOND",accent:"THE MAP.",desc:"Three destinations, collected impressions and stories from the road."},
      {key:"about",label:"ABOUT",verb:"MEET THE",accent:"HUMAN.",desc:"The curiosity, personality and ideas behind everything I create."}
    ];
    const spotlight=document.createElement("div");
    spotlight.className="s31-spotlight";
    spotlight.setAttribute("aria-hidden","true");
    hub.prepend(spotlight);
    const dossier=document.createElement("section");
    dossier.className="s31-dossier";
    dossier.setAttribute("aria-label","Explore the four creative worlds");
    dossier.innerHTML=[
      '<div class="s31-head"><span class="s31-live">LIVE DOSSIER / OPEN</span><span class="s31-scene-counter">01 / 04</span></div>',
      '<div class="s31-message" aria-live="polite" aria-atomic="true"><h2 class="s31-headline"><span>MAKE IT</span> <em>MATTER.</em></h2><p class="s31-summary">Selected websites, visual systems and digital experiences built with intention.</p></div>',
      '<div class="s31-actions"><button class="s31-next" type="button">NEXT SCENE <span aria-hidden="true">↗</span></button><button class="s31-enter" type="button">ENTER <span class="s31-enter-label">WORK</span> <span aria-hidden="true">→</span></button></div>',
      '<div class="s31-track" aria-hidden="true"><i class="is-current"></i><i></i><i></i><i></i></div>'
    ].join("");
    main.appendChild(dossier);
    const headline=dossier.querySelector(".s31-headline span");
    const accent=dossier.querySelector(".s31-headline em");
    const summary=dossier.querySelector(".s31-summary");
    const counter=dossier.querySelector(".s31-scene-counter");
    const enterLabel=dossier.querySelector(".s31-enter-label");
    const next=dossier.querySelector(".s31-next");
    const enter=dossier.querySelector(".s31-enter");
    const ticks=[...dossier.querySelectorAll(".s31-track i")];
    let current=0;
    function render(index){
      if(index<0||index>=scenes.length)return;
      current=index;
      const s=scenes[index];
      hub.dataset.s31Scene=s.key;
      headline.textContent=s.verb;
      accent.textContent=s.accent;
      summary.textContent=s.desc;
      counter.textContent=String(index+1).padStart(2,"0")+" / 04";
      enterLabel.textContent=s.label;
      ticks.forEach((tick,i)=>tick.classList.toggle("is-current",i===index));
      links.forEach((link,i)=>link.classList.toggle("is-s31-current",i===index));
    }
    // Keep the original HOME, SIGNAL and METAMORPHOSIS listeners in charge
    // of scene artwork by dispatching the same focusin event they already use.
    function select(index){
      render(index);
      links[index].dispatchEvent(new Event("focusin",{bubbles:true}));
    }
    links.forEach((link,i)=>{
      link.addEventListener("pointerenter",()=>render(i),{passive:true});
      link.addEventListener("focusin",()=>render(i));
      link.addEventListener("pointerdown",()=>render(i),{passive:true});
    });
    next.addEventListener("click",()=>select((current+1)%scenes.length));
    enter.addEventListener("click",()=>links[current].click());
    const finePointer=window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;
    const reducedMotion=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if(finePointer&&!reducedMotion){
      let frame=0;
      hub.addEventListener("pointermove",ev=>{
        if(frame)return;
        const r=hub.getBoundingClientRect();
        const x=((ev.clientX-r.left)/r.width*100).toFixed(1)+"%";
        const y=((ev.clientY-r.top)/r.height*100).toFixed(1)+"%";
        frame=requestAnimationFrame(()=>{
          spotlight.style.setProperty("--s31-x",x);
          spotlight.style.setProperty("--s31-y",y);
          frame=0;
        });
      },{passive:true});
    }
    render(0);
    hub.classList.add("s31-ready");
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();
;


/* SOURCE assets/js/typographic-takeover.js */
/* STEP 32 — TYPOGRAPHIC TAKEOVER
 * Scene-synchronized editorial layout. Does not modify GSAP targets,
 * click handlers, the 3D poster, or the other four worlds.
 */
(() => {
  function init(){
    const hub=document.querySelector(".world-hub");
    const main=hub?.querySelector(".world-main");
    const title=main?.querySelector(".world-title");
    if(!hub||!main||!title||hub.classList.contains("s32-ready"))return;

    // Preserve the H1's actual words and any Webflow line-break nodes.
    // Only wrap its existing second line so it can use editorial italic type.
    const nodes=[...title.childNodes];
    const finalLine=nodes.find(node=>
      node.nodeType===Node.TEXT_NODE &&
      node.textContent.trim().toUpperCase()==="MY WORLD."
    );
    if(finalLine){
      const highlight=document.createElement("span");
      highlight.className="s32-title-highlight";
      highlight.textContent=finalLine.textContent;
      finalLine.replaceWith(highlight);
    }

    const ghost=document.createElement("span");
    ghost.className="s32-ghost";
    ghost.setAttribute("aria-hidden","true");
    ghost.textContent="WORK";
    main.prepend(ghost);

    const scenes=new Set(["work","sound","places","about"]);
    const reduced=window.matchMedia?.("(prefers-reduced-motion: reduce)");
    let active="";
    function sync(){
      const candidate=hub.dataset.s31Scene || hub.dataset.s22Scene || "work";
      const name=scenes.has(candidate)?candidate:"work";
      if(active===name)return;
      active=name;
      hub.dataset.s32Scene=name;
      ghost.textContent=name.toUpperCase();
      if(!reduced?.matches && ghost.animate && document.visibilityState!=="hidden"){
        ghost.animate([
          {opacity:0,filter:"blur(5px)"},
          {opacity:.95,filter:"blur(0px)"}
        ],{duration:450,easing:"cubic-bezier(.16,1,.3,1)"});
      }
    }
    new MutationObserver(sync).observe(hub,{attributes:true,attributeFilter:["data-s31-scene","data-s22-scene"]});
    sync();
    hub.classList.add("s32-ready");
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();
;


/* SOURCE assets/js/frame-studies.js */
/* STEP 33 — FRAME STUDIES. Reuses the existing chapter image URL; no new network assets or navigation interception. */
(() => {
 function init(){
  const scene=document.querySelector(".case-world"),chapter=scene?.querySelector(".case-chapter");
  const existing=chapter?.querySelector(".chapter-image");
  const media=chapter?.querySelector(".chapter-media");
  if(!scene||!chapter||!existing||!media||scene.classList.contains("s33-ready"))return;
  const lab=document.createElement("section");
  lab.className="s33-lab";lab.setAttribute("aria-label","Frame Studies — explore photographic compositions");
  lab.innerHTML=[
   '<div class="s33-top"><span>03 / THE DIRECTOR’S VIEW</span><span class="s33-folio">VISUAL STUDY / 001</span></div>',
   '<div class="s33-heading"><h3 class="s33-title">FRAME <em>STUDIES.</em></h3><p class="s33-intro">One original project image, three different perspectives. Explore how framing changes the feeling of a composition.</p></div>',
   '<div class="s33-layout"><figure class="s33-preview" data-view="wide">',
   '<img class="s33-main-image" alt="" loading="lazy" decoding="async">',
   '<div class="s33-preview-top"><span>LM® / CONTACT SHEET</span><span>35 MM — DIGITAL STUDY</span></div>',
   '<figcaption class="s33-preview-bottom"><strong class="s33-preview-word">WIDE.</strong><span class="s33-preview-id">FRAME 01 / 03</span></figcaption></figure>',
   '<div class="s33-panel"><div class="s33-panel-head"><span>SELECT A FRAME</span><span>01—03</span></div>',
   ...["wide","detail","texture"].map((v,i)=>'<button type="button" class="s33-choice" data-view="'+v+'" aria-pressed="'+(i===0)+'"><span class="s33-choice-thumb"><img alt="" loading="lazy" decoding="async"></span><span class="s33-choice-copy"><small class="s33-choice-index">0'+(i+1)+' / 03</small><strong class="s33-choice-label">'+v.toUpperCase()+'</strong></span><span class="s33-choice-mark" aria-hidden="true">↗</span></button>'),
   '<p class="s33-director-note"><strong>DIRECTOR’S NOTE</strong><span class="s33-note-text">The full composition gives the image room to tell its story.</span></p></div></div>',
   '<div class="s33-foot"><span>ONE IMAGE / THREE PERSPECTIVES</span><span>FRAME REFERENCE / NOT ADDITIONAL PHOTOGRAPHY</span></div>'
  ].join("");
  chapter.insertBefore(lab,media);
  const main=lab.querySelector(".s33-main-image"),preview=lab.querySelector(".s33-preview"),word=lab.querySelector(".s33-preview-word"),number=lab.querySelector(".s33-preview-id"),note=lab.querySelector(".s33-note-text"),folio=lab.querySelector(".s33-folio");
  const choices=[...lab.querySelectorAll(".s33-choice")],thumbs=choices.map(b=>b.querySelector("img"));
  const frames={wide:{label:"WIDE.",note:"The full composition gives the image room to tell its story."},detail:{label:"DETAIL.",note:"A closer crop draws attention to structure, rhythm and the smaller decisions."},texture:{label:"TEXTURE.",note:"An intimate crop turns the same image into an atmospheric visual fragment."}};
  let view="wide",lastSource="",lastSrcset="",lastTheme="";
  const source=()=>{
    const src=existing.getAttribute("src")||existing.currentSrc||"";
    return {src,srcset:existing.getAttribute("srcset")||"",sizes:existing.getAttribute("sizes")||"100vw"};
  };
  function refreshImages(){
    const s=source();
    if(!s.src|| (s.src===lastSource&&s.srcset===lastSrcset))return;
    lastSource=s.src;lastSrcset=s.srcset;
    for(const el of [main,...thumbs]){
      el.classList?.remove("is-loaded");
      el.src=s.src;
      if(s.srcset){el.srcset=s.srcset;el.sizes=s.sizes;}else{el.removeAttribute("srcset");el.removeAttribute("sizes");}
      el.alt=existing.alt||"Photographic study of the selected project";
    }
    if(main.complete&&main.naturalWidth)main.classList.add("is-loaded");
  }
  function setView(key){
    if(!frames[key])return;
    view=key;const i=["wide","detail","texture"].indexOf(key);
    preview.dataset.view=key;word.textContent=frames[key].label;number.textContent="FRAME 0"+(i+1)+" / 03";note.textContent=frames[key].note;
    choices.forEach(button=>button.setAttribute("aria-pressed",String(button.dataset.view===key)));
  }
  const themed={redhouse:"001",soca:"002",gianni:"003"};
  function sync(){
    refreshImages();
    const theme=scene.dataset.theme||"redhouse";
    if(theme!==lastTheme){lastTheme=theme;folio.textContent="VISUAL STUDY / "+(themed[theme]||"001");setView("wide");}
  }
  main.addEventListener("load",()=>main.classList.add("is-loaded"));
  choices.forEach(button=>button.addEventListener("click",()=>setView(button.dataset.view)));
  new MutationObserver(sync).observe(scene,{attributes:true,attributeFilter:["data-theme"]});
  new MutationObserver(refreshImages).observe(existing,{attributes:true,attributeFilter:["src","srcset","sizes"]});
  sync();
  scene.classList.add("s33-ready");
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();
;


/* SOURCE assets/js/narrative-rhythm.js */
/* STEP 36 — NARRATIVE RHYTHM
 * Passive narrative dividers and scroll-aware index.
 * No interception of scrolling, no GSAP changes, no buttons added.
 */
(() => {
 const projectText={
  redhouse:[
   ["AFTER THE FIRST IMPRESSION","There is always","more to tell.","From the first idea to the details that give a brand its character."],
   ["BEFORE THE VISUAL CHAPTER","An identity","in motion.","A visual world comes together through type, colour, and atmosphere."],
   ["BEHIND THE RESULT","Built with","intention.","Design decisions become a working digital experience."]
  ],
  soca:[
   ["AFTER THE FIRST IMPRESSION","A place is","a feeling.","Beyond geography, every landscape carries its own rhythm."],
   ["BEFORE THE VISUAL CHAPTER","Look a little","closer.","Movement, colour, and distance frame the story."],
   ["BEHIND THE RESULT","Where nature","meets design.","A creative study of a remarkable landscape."]
  ],
  gianni:[
   ["AFTER THE FIRST IMPRESSION","Every table","tells a story.","Warmth and familiarity can shape a digital welcome."],
   ["BEFORE THE VISUAL CHAPTER","Made to feel","like home.","Every detail should support the feeling of hospitality."],
   ["BEHIND THE RESULT","A simple idea,","well served.","An approachable experience that puts the essentials first."]
  ]
 };
 const placeText={
  soca:[
   ["FROM THE LANDSCAPE","Some places","stay with us.","Not everything worth remembering can be put on a map."],
   ["BETWEEN TWO FRAMES","The details","tell the story.","A moment of stillness gives every image more space."]
  ],
  london:[
   ["FROM THE CITY","Every street","has a rhythm.","A new perspective can be found around the next corner."],
   ["BETWEEN TWO FRAMES","Look beyond","the obvious.","The most interesting moments live in the contrast."]
  ],
  kl:[
   ["FROM THE CITY","A thousand","different layers.","Light, movement and everyday discoveries shape the memory."],
   ["BETWEEN TWO FRAMES","Stop and","look again.","Small details can reveal a city's character."]
  ]
 };
 function init(){
  const caseWorld=document.querySelector(".case-world"),journal=document.querySelector(".p15-journal");
  const content=journal?.querySelector(".p15-content");
  if(!caseWorld||!journal||!content||caseWorld.classList.contains("s36-ready")||journal.classList.contains("s36-ready"))return;
  const caseTargets=[
   [caseWorld.querySelector(".case-story"),"case-story"],
   [caseWorld.querySelector(".case-chapter"),"case-chapter"],
   [caseWorld.querySelector(".s30-evidence"),"s30-evidence"]
  ];
  const journalTargets=[
   [content.querySelector(".p15-story"),"p15-story"],
   [content.querySelector(".p15-gallery"),"p15-gallery"]
  ];
  if(caseTargets.some(x=>!x[0])||journalTargets.some(x=>!x[0]))return;
  function makeInterlude(i){
   const section=document.createElement("section");
   section.className="s36-interlude";
   section.setAttribute("aria-label","Narrative interlude");
   section.innerHTML='<div class="s36-interlude-content"><span class="s36-interlude-kicker"></span><h3 class="s36-interlude-title"><span></span> <em></em></h3><p class="s36-interlude-subtitle"></p></div><span class="s36-interlude-index" aria-hidden="true"></span><div class="s36-interlude-rule" aria-hidden="true"></div>';
   section.dataset.s36Index=String(i);
   return section;
  }
  const cPieces=caseTargets.map(([target],i)=>{const el=makeInterlude(i);target.parentNode.insertBefore(el,target);return el;});
  const jPieces=journalTargets.map(([target],i)=>{const el=makeInterlude(i);content.insertBefore(el,target);return el;});
  function fill(parts,templates){
   parts.forEach((el,i)=>{
    const record=templates[i];if(!record)return;
    el.querySelector(".s36-interlude-kicker").textContent=record[0];
    el.querySelector(".s36-interlude-title span").textContent=record[1];
    el.querySelector(".s36-interlude-title em").textContent=record[2];
    el.querySelector(".s36-interlude-subtitle").textContent=record[3];
    el.querySelector(".s36-interlude-index").textContent=String(i+1).padStart(2,"0");
   });
  }
  const cSections=[caseWorld.querySelector(".case-hero"),caseWorld.querySelector(".case-story"),caseWorld.querySelector(".s28-dossier"),caseWorld.querySelector(".case-chapter"),caseWorld.querySelector(".s30-evidence")].filter(Boolean);
  const jSections=[content.querySelector(".p15-hero"),content.querySelector(".p15-story"),content.querySelector(".p15-gallery"),content.querySelector(".p15-outro")].filter(Boolean);
  function makeScore(root,labels){
   const score=document.createElement("div");
   score.className="s36-score";score.setAttribute("aria-hidden","true");
   score.innerHTML='<span class="s36-score-name"></span><span class="s36-score-dots"></span><span class="s36-score-count"></span>';
   const dots=score.querySelector(".s36-score-dots");
   labels.forEach((_,i)=>{const dot=document.createElement("i");if(i===0)dot.classList.add("is-current");dots.append(dot)});
   root.append(score);return score;
  }
  const caseLabels=["THE INTRO","THE STORY","PROJECT DNA","VISUAL CHAPTER","INSIDE THE BUILD"];
  const journalLabels=["THE INTRO","THE FEELING","IN THE FRAME","LAST IMPRESSION"];
  const cScore=makeScore(caseWorld,caseLabels),jScore=makeScore(journal,journalLabels);
  const reduced=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const intersect=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting||reduced)e.target.classList.add("is-in-view")})},{root:null,rootMargin:"0px 0px -15% 0px",threshold:.08});
  [...cPieces,...jPieces].forEach(el=>intersect.observe(el));
  function updateScore(root,items,labels,score){
   if(!items.length)return;
   const view=root.getBoundingClientRect();
   const reference=view.top+Math.min(root.clientHeight*.36,300);
   let active=0;
   items.forEach((el,i)=>{if(el.getBoundingClientRect().top<=reference)active=i});
   score.querySelector(".s36-score-name").textContent=labels[active];
   score.querySelector(".s36-score-count").textContent=String(active+1).padStart(2,"0")+" / "+String(items.length).padStart(2,"0");
   [...score.querySelectorAll(".s36-score-dots i")].forEach((dot,i)=>dot.classList.toggle("is-current",i===active));
  }
  function initScroll(root,items,labels,score,isOpen){
   let raf=0;
   function refresh(){raf=0;if(isOpen())updateScore(root,items,labels,score)}
   root.addEventListener("scroll",()=>{if(!raf)raf=requestAnimationFrame(refresh)},{passive:true});
   return refresh;
  }
  const refreshCase=initScroll(caseWorld,cSections,caseLabels,cScore,()=>caseWorld.classList.contains("is-active"));
  const refreshJournal=initScroll(journal,jSections,journalLabels,jScore,()=>journal.classList.contains("is-open"));
  function syncCase(){
   const key=caseWorld.dataset.theme||"redhouse";fill(cPieces,projectText[key]||projectText.redhouse);
   cPieces.forEach(el=>{el.classList.remove("is-in-view");if(reduced)el.classList.add("is-in-view")});
   refreshCase();
  }
  function syncJournal(){
   const key=journal.dataset.place||"soca";fill(jPieces,placeText[key]||placeText.soca);
   jPieces.forEach(el=>{el.classList.remove("is-in-view");if(reduced)el.classList.add("is-in-view")});
   refreshJournal();
  }
  new MutationObserver(syncCase).observe(caseWorld,{attributes:true,attributeFilter:["data-theme"]});
  new MutationObserver(syncJournal).observe(journal,{attributes:true,attributeFilter:["data-place"]});
  new MutationObserver(refreshCase).observe(caseWorld,{attributes:true,attributeFilter:["class"]});
  new MutationObserver(refreshJournal).observe(journal,{attributes:true,attributeFilter:["class"]});
  syncCase();syncJournal();
  caseWorld.classList.add("s36-ready");
  journal.classList.add("s36-ready");
  // Observe relative to individual scroll containers, not the page viewport.
  intersect.disconnect();
  function observeIn(container,parts){
   const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("is-in-view")}),{root:container,threshold:.08});
   parts.forEach(el=>io.observe(el));
  }
  observeIn(caseWorld,cPieces);observeIn(journal,jPieces);
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
 else init();
})();
;


/* SOURCE assets/js/directors-light.js */
/* STEP 37 — THE DIRECTOR'S LIGHT
   A tiny passive controller for selection-aware optical art direction.
   Never interferes with GSAP, native buttons, scroll, focus or navigation.
 */
(() => {
  function init(){
    const work=document.querySelector(".work-world");
    const preview=work?.querySelector(".work-preview");
    const sound=document.querySelector(".sound-world");
    const places=document.querySelector(".p14-world");
    const postcard=places?.querySelector(".p14-postcard");
    const about=document.querySelector(".a17-world");
    const card=about?.querySelector(".a17-card");
    if(!work||!preview||!sound||!places||!postcard||!about||!card||
       document.querySelector(".s37-finder"))return;

    const reduce=window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const finders=new Map();
    for(const [scene,host] of [["work",preview],["places",postcard],["about",card]]){
      const finder=document.createElement("span");
      finder.className="s37-finder";
      finder.setAttribute("aria-hidden","true");
      finder.dataset.s37Scene=scene;
      host.appendChild(finder);
      finders.set(scene,finder);
    }

    const memory=new Map();
    const pending=new Map();
    function flash(key){
      if(reduce?.matches)return;
      const element=finders.get(key);
      if(!element)return;
      const prior=pending.get(key);
      if(prior)window.clearTimeout(prior);
      element.classList.remove("is-s37-flashing");
      // Reset this purely decorative animation without changing any parent transform.
      void element.offsetWidth;
      element.classList.add("is-s37-flashing");
      pending.set(key,window.setTimeout(()=>{
        element.classList.remove("is-s37-flashing");
        pending.delete(key);
      },1040));
    }
    function update(key,value){
      if(memory.get(key)===value)return;
      const initial=!memory.has(key);
      memory.set(key,value);
      if(key==="work")work.dataset.s37Scene=value;
      if(!initial)flash(key);
    }
    function syncWork(){
      const id=preview.dataset.theme||"redhouse";
      update("work",["redhouse","soca","gianni"].includes(id)?id:"redhouse");
    }
    function syncPlaces(){
      const id=places.dataset.place||"soca";
      update("places",["soca","london","kl"].includes(id)?id:"soca");
    }
    function syncAbout(){
      const id=about.dataset.mode||"make";
      update("about",["make","listen","wander"].includes(id)?id:"make");
    }
    function syncSound(){
      const id=sound.dataset.mood||"soul";
      update("sound",["soul","hiphop","alternative"].includes(id)?id:"soul");
    }

    new MutationObserver(syncWork).observe(preview,{attributes:true,attributeFilter:["data-theme"]});
    new MutationObserver(syncPlaces).observe(places,{attributes:true,attributeFilter:["data-place"]});
    new MutationObserver(syncAbout).observe(about,{attributes:true,attributeFilter:["data-mode"]});
    new MutationObserver(syncSound).observe(sound,{attributes:true,attributeFilter:["data-mood"]});
    syncWork();syncPlaces();syncAbout();syncSound();
    for(const root of [work,sound,places,about])root.classList.add("s37-ready");
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();
;


/* SOURCE assets/js/exhibition-index.js */
/* STEP 38 — EXHIBITION INDEX
   Visual-only enhancement of existing World Index.
   Original buttons, focus management, navigation and ESC logic remain untouched. */
(() => {
  const art={
    work:'<svg viewBox="0 0 320 320" aria-hidden="true"><g class="s38-move"><rect x="56" y="55" width="207" height="207" transform="rotate(-13 160 160)" class="s38-stroke"/><rect x="87" y="77" width="165" height="165" class="s38-fine"/><path d="M87 77L252 242M87 242L252 77" class="s38-stroke"/><circle cx="160" cy="160" r="13" class="s38-fill"/></g><path d="M24 160H296M160 24V296" class="s38-fine"/></svg>',
    sound:'<svg viewBox="0 0 320 320" aria-hidden="true"><g class="s38-move"><circle cx="160" cy="160" r="132" class="s38-stroke"/><circle cx="160" cy="160" r="113" class="s38-fine"/><circle cx="160" cy="160" r="96" class="s38-stroke"/><circle cx="160" cy="160" r="77" class="s38-fine"/><circle cx="160" cy="160" r="56" class="s38-stroke"/><circle cx="160" cy="160" r="17" class="s38-fill"/><path d="M287 32V94L217 185" class="s38-stroke"/></g></svg>',
    places:'<svg viewBox="0 0 320 320" aria-hidden="true"><g class="s38-move"><circle cx="160" cy="160" r="135" class="s38-fine"/><path d="M26 95Q100 15 165 93T296 86M23 140Q104 67 160 141T299 134M24 190Q104 119 160 193T294 184M26 244Q105 173 164 246T294 237" class="s38-stroke"/><path d="M75 261L160 164 245 62" class="s38-fine" stroke-dasharray="5 7"/><circle cx="75" cy="261" r="10" class="s38-fill"/><circle cx="245" cy="62" r="10" class="s38-fill"/></g></svg>',
    about:'<svg viewBox="0 0 320 320" aria-hidden="true"><g class="s38-move"><circle cx="160" cy="160" r="130" class="s38-fine"/><ellipse cx="160" cy="160" rx="145" ry="74" transform="rotate(-26 160 160)" class="s38-stroke"/><text x="155" y="192" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="107" class="s38-fill">LM</text><circle cx="224" cy="98" r="10" class="s38-fill"/></g></svg>'
  };
  const details={
    work:{n:"01",title:"THE MAKER.",caption:"Ideas turned into digital experiences through design, code and a strong point of view."},
    sound:{n:"02",title:"THE LISTENER.",caption:"A personal collection of frequencies, memories and creative influences."},
    places:{n:"03",title:"THE WANDERER.",caption:"A personal atlas of destinations, observations and stories."},
    about:{n:"04",title:"THE HUMAN.",caption:"The curiosity and personality behind the work."}
  };
  function init(){
    const root=document.querySelector(".w19-root");
    const drawer=root?.querySelector(".w19-drawer");
    const inner=drawer?.querySelector(".w19-inner");
    const head=drawer?.querySelector(".w19-head");
    const foot=drawer?.querySelector(".w19-foot");
    const links=[...(inner?.querySelectorAll(".w19-link")||[])];
    if(!root||!drawer||!inner||!head||!foot||links.length!==4||root.classList.contains("s38-ready"))return;
    const stage=document.createElement("div");
    stage.className="s38-stage";
    inner.parentNode.insertBefore(stage,inner);
    stage.appendChild(inner);
    const gallery=document.createElement("div");
    gallery.className="s38-gallery";
    gallery.setAttribute("aria-hidden","true");
    gallery.innerHTML='<div class="s38-gallery-top"><span>LM® / EXHIBITION INDEX</span><span>EDITION 038</span></div><div class="s38-gallery-content"></div><div class="s38-gallery-foot"><div class="s38-gallery-kicker"><span>CURATED WORLDS / 001—004</span><span class="s38-gallery-number">01 / 04</span></div><strong class="s38-gallery-title">THE MAKER.</strong><p class="s38-gallery-caption"></p></div>';
    stage.appendChild(gallery);
    const container=gallery.querySelector(".s38-gallery-content");
    for(const key of ["work","sound","places","about"]){
      const div=document.createElement("div");
      div.className="s38-scene";
      div.dataset.s38Scene=key;
      div.innerHTML='<span class="s38-scene-number">'+details[key].n+'</span><div class="s38-art">'+art[key]+'</div>';
      container.appendChild(div);
    }
    const scenes=[...container.querySelectorAll(".s38-scene")];
    const title=gallery.querySelector(".s38-gallery-title");
    const caption=gallery.querySelector(".s38-gallery-caption");
    const number=gallery.querySelector(".s38-gallery-number");
    let active="";
    function preview(key){
      if(!details[key]||active===key)return;
      active=key;
      root.dataset.s38Scene=key;
      title.textContent=details[key].title;
      caption.textContent=details[key].caption;
      number.textContent=details[key].n+" / 04";
      scenes.forEach(el=>el.classList.toggle("is-s38-visible",el.dataset.s38Scene===key));
      links.forEach(el=>el.classList.toggle("is-s38-preview",el.dataset.w19Target===key));
    }
    links.forEach(link=>{
      const key=link.dataset.w19Target;
      link.addEventListener("pointerenter",()=>preview(key),{passive:true});
      link.addEventListener("focusin",()=>preview(key));
    });
    const activeCurrent=()=>links.find(link=>link.classList.contains("is-current"))?.dataset.w19Target||"work";
    const observer=new MutationObserver(()=>{
      if(root.classList.contains("is-open"))preview(activeCurrent());
    });
    observer.observe(root,{attributes:true,attributeFilter:["class"]});
    root.classList.add("s38-ready");
    preview(activeCurrent());
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();
;
