/* STEP 74 — JS BUNDLE 3 OF 4 — original execution order */

/* SOURCE assets/js/scene-bridge.js */
/* STEP 39 — passive scene bridge. Original World Index navigation remains unchanged. */
(()=>{function init(){const root=document.querySelector(".w19-root"),trigger=root?.querySelector(".w19-trigger");if(!root||!trigger||root.classList.contains("s39-ready"))return;
const indicator=document.createElement("span");indicator.className="s39-chapter";indicator.setAttribute("aria-hidden","true");trigger.insertBefore(indicator,trigger.querySelector(".w19-trigger-icon"));
const scenes=[["work",".work-world"],["sound",".sound-world"],["places",".p14-world"],["about",".a17-world"]];
const targets=scenes.map(([k,s])=>[k,document.querySelector(s)]);
const caseWorld=document.querySelector(".case-world");
function sync(){let active="hub";for(const [key,el] of targets)if(el?.classList.contains("is-active")){active=key;break}if(caseWorld?.classList.contains("is-active"))active="work";
root.dataset.s39World=active;indicator.textContent=active==="hub"?"00 / HOME":({work:"01",sound:"02",places:"03",about:"04"}[active]+" / "+active.toUpperCase());}
for(const [,el] of targets)if(el)new MutationObserver(sync).observe(el,{attributes:true,attributeFilter:["class"]});
if(caseWorld)new MutationObserver(sync).observe(caseWorld,{attributes:true,attributeFilter:["class"]});
sync();root.classList.add("s39-ready");}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init()})();
;


/* SOURCE assets/js/four-fold-cover.js */
/* STEP 40 — FOUR-FOLD COVER | visual-only coordination */
(()=>{function init(){const hub=document.querySelector(".world-hub"),stage=hub?.querySelector(".world-stage"),sheet=stage?.querySelector(".stage-sheet");if(!hub||!stage||!sheet||hub.classList.contains("s40-ready"))return;
const halo=document.createElement("span");halo.className="s40-halo";halo.setAttribute("aria-hidden","true");const calib=document.createElement("span");calib.className="s40-calibration";calib.setAttribute("aria-hidden","true");stage.prepend(halo,calib);
const marks=document.createElement("span");marks.className="s40-cropmarks";marks.setAttribute("aria-hidden","true");const wipe=document.createElement("span");wipe.className="s40-ink-wipe";wipe.setAttribute("aria-hidden","true");sheet.append(marks,wipe);
const stamp=document.createElement("span");stamp.className="s40-imprint";stamp.setAttribute("aria-hidden","true");stamp.textContent="LM® / PRESS STUDY";
const notes=document.createElement("span");notes.className="s40-side-notes";notes.setAttribute("aria-hidden","true");notes.innerHTML="<span>ARCHIVE / 004</span><strong>ED. 040</strong>";
const edition=document.createElement("div");edition.className="s40-edition";edition.setAttribute("aria-hidden","true");edition.innerHTML='<span>FOUR FOLDS / ONE WORLD</span><span class="s40-edition-ticks"><i></i><i></i><i></i><i></i></span><strong class="s40-edition-number">01/04</strong>';
stage.append(stamp,notes,edition);
const scenes=["work","sound","places","about"],ticks=[...edition.querySelectorAll("i")],number=edition.querySelector(".s40-edition-number");
let active="",timer=0;
function sync(){const raw=hub.dataset.s31Scene||hub.dataset.s22Scene||"work";const key=scenes.includes(raw)?raw:"work";if(active===key)return;const old=active;active=key;hub.dataset.s40Scene=key;const i=scenes.indexOf(key);number.textContent=String(i+1).padStart(2,"0")+"/04";ticks.forEach((t,n)=>t.classList.toggle("is-current",n===i));if(old&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches){wipe.classList.remove("is-flashing");void wipe.offsetWidth;wipe.classList.add("is-flashing");clearTimeout(timer);timer=setTimeout(()=>wipe.classList.remove("is-flashing"),750)}}
new MutationObserver(sync).observe(hub,{attributes:true,attributeFilter:["data-s31-scene","data-s22-scene"]});sync();hub.classList.add("s40-ready");}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();})();
;


/* SOURCE assets/js/editorial-focus.js */
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
;


/* SOURCE assets/js/connected-line.js */
/* STEP 43 — THE CONNECTED LINE / FIVE FORMS, ONE CONTINUOUS SYSTEM
   A lightweight vector signal, reusing headers and existing selection states.
   No navigation interception, new requests, continuous animation loops or GSAP edits.
*/
(() => {
  const N=65,WIDTH=300,HEIGHT=66;
  const TAU=Math.PI*2;
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const ease=t=>1-Math.pow(1-t,3);
  const definitions=[
    {key:"hub",root:".world-hub",head:".world-top",source:".world-hub",
      attr:["data-s31-scene","data-s22-scene"],fallback:"work",
      variants:["work","sound","places","about"],number:"00"},
    {key:"work",root:".work-world",head:".work-top",source:".work-preview",
      attr:["data-theme"],fallback:"redhouse",
      variants:["redhouse","soca","gianni"],number:"01"},
    {key:"sound",root:".sound-world",head:".sound-top",source:".sound-world",
      attr:["data-mood"],fallback:"soul",
      variants:["soul","hiphop","alternative"],number:"02"},
    {key:"places",root:".p14-world",head:".p14-top",source:".p14-world",
      attr:["data-place"],fallback:"soca",
      variants:["soca","london","kl"],number:"03"},
    {key:"about",root:".a17-world",head:".a17-header",source:".a17-world",
      attr:["data-mode"],fallback:"make",
      variants:["make","listen","wander"],number:"04"},
    {key:"index",root:".w19-root",head:".w19-head",source:".w19-root",
      attr:["data-s38-scene"],fallback:"work",
      variants:["work","sound","places","about"],number:"LM"}
  ];
  function coordinates(kind,index){
    const phase=index*.17,arr=[],echo=[];
    for(let i=0;i<N;i++){
      const t=i/(N-1),x=4+t*(WIDTH-8);
      const envelope=.38+.62*Math.sin(Math.PI*t);
      let dy=0;
      if(kind==="work"){
        const v=(t*3.8+phase)%1;
        // Angular architecture: paired long risers and shorter platforms.
        dy=((v<.23?-1:v<.53?.7:v<.74?-.52:.4)*13
          +Math.sin(TAU*(t*1.8+phase)) * 4.5)*envelope;
      }else if(kind==="sound"){
        dy=(Math.sin(TAU*(t*(3.5+index*.35)+phase))*14
          +Math.sin(TAU*(t*7.5+phase)) * 3.2)*envelope;
      }else if(kind==="places"){
        dy=(Math.sin(TAU*(t*1.65+phase))*10
          +Math.sin(TAU*(t*4.4+phase*.7))*5.2)*envelope;
      }else if(kind==="about"){
        dy=(Math.sin(TAU*(t*1.35+phase))*14
          +Math.sin(TAU*(t*2.75-phase))*3.5)*envelope;
      }else{
        dy=Math.sin(TAU*(t*2.1+phase))*8*envelope;
      }
      const y=clamp(HEIGHT/2+dy,7,HEIGHT-7);
      arr.push([x,y]);
      echo.push([x,clamp(y+7+Math.sin(t*TAU*2.7+phase)*2,4,HEIGHT-3)]);
    }
    return {main:arr,echo};
  }
  const makePath=points=>points.map((p,i)=>
    (i===0?"M":"L")+p[0].toFixed(2)+" "+p[1].toFixed(2)
  ).join(" ");
  function init(){
    if(document.querySelector(".s43-signal"))return;
    const actual=definitions.map(def=>{
      const root=document.querySelector(def.root);
      const head=root?.querySelector(def.head);
      const source=document.querySelector(def.source);
      return {def,root,head,source};
    });
    // No partial installation, so no broken signatures.
    if(actual.some(item=>!item.root||!item.head||!item.source))return;
    const reduce=window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const active=[];
    for(const item of actual){
      const {def,root,head,source}=item;
      const signal=document.createElement("span");
      signal.className="s43-signal";
      signal.setAttribute("aria-hidden","true");
      signal.innerHTML=[
        '<span class="s43-signal-label">CONNECTED<br>LINE / LM®</span>',
        '<svg viewBox="0 0 300 66" preserveAspectRatio="none" aria-hidden="true" focusable="false">',
        '<path class="s43-echo"/><path class="s43-primary"/>',
        '<g class="s43-endpoints"><circle class="s43-first" r="2.1"/>',
        '<circle class="s43-last" r="2.1"/></g></svg>',
        '<span class="s43-signal-id"></span>'
      ].join("");
      const rail=document.createElement("span");
      rail.className="s43-rail";
      rail.setAttribute("aria-hidden","true");
      head.append(signal,rail);
      const primary=signal.querySelector(".s43-primary");
      const secondary=signal.querySelector(".s43-echo");
      const first=signal.querySelector(".s43-first");
      const last=signal.querySelector(".s43-last");
      const id=signal.querySelector(".s43-signal-id");
      let current=null,target=null,frame=0,previous="";
      function render(value){
        primary.setAttribute("d",makePath(value.main));
        secondary.setAttribute("d",makePath(value.echo));
        const a=value.main[0],b=value.main[value.main.length-1];
        first.setAttribute("cx",a[0]);first.setAttribute("cy",a[1]);
        last.setAttribute("cx",b[0]);last.setAttribute("cy",b[1]);
      }
      function getValue(){
        const value=def.attr.map(a=>source.getAttribute(a)).find(Boolean)||def.fallback;
        return def.variants.includes(value)?value:def.fallback;
      }
      function select(){
        const key=getValue();
        if(key===previous)return;
        previous=key;
        const index=def.variants.indexOf(key);
        const shape=(def.key==="hub"||def.key==="index")?key:def.key;
        target=coordinates(shape,index);
        root.dataset.s43Variant=key;
        head.style.setProperty("--s43-progress",(index/Math.max(1,def.variants.length-1)*100).toFixed(2)+"%");
        id.textContent=String(index+1).padStart(2,"0")+" / "+String(def.variants.length).padStart(2,"0");
        if(frame){cancelAnimationFrame(frame);frame=0;}
        if(!current||reduce?.matches||document.hidden){
          current=target;
          render(current);
          return;
        }
        const origin=current;
        const destination=target;
        const start=performance.now();
        const duration=820;
        function tick(now){
          const t=ease(clamp((now-start)/duration,0,1));
          const blend=(a,b)=>a.map((p,i)=>[
            p[0]+(b[i][0]-p[0])*t,
            p[1]+(b[i][1]-p[1])*t
          ]);
          current={
            main:blend(origin.main,destination.main),
            echo:blend(origin.echo,destination.echo)
          };
          render(current);
          if(t<1)frame=requestAnimationFrame(tick);
          else{frame=0;current=destination;}
        }
        frame=requestAnimationFrame(tick);
      }
      new MutationObserver(select).observe(source,{
        attributes:true,attributeFilter:def.attr
      });
      select();
      root.classList.add("s43-connected");
      active.push({select,stop:()=>{if(frame)cancelAnimationFrame(frame);frame=0;if(target){current=target;render(current);}}});
    }
    document.addEventListener("visibilitychange",()=>{
      if(document.hidden)active.forEach(x=>x.stop());
      else active.forEach(x=>x.select());
    });
    if(reduce?.addEventListener)reduce.addEventListener("change",()=>{
      active.forEach(x=>{x.stop();x.select()});
    });
  }
  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();
;


/* SOURCE assets/js/quiet-frame.js */
/* STEP 44 — THE QUIET FRAME
   Five distinct, pointer-driven material reflections; no animation loop.
   Entirely decorative and non-interactive. Existing GSAP and click handlers
   remain in charge of every scene and visual.
 */
(() => {
  const defs=[
    {name:"home",root:".world-hub",host:".stage-sheet",delegate:true,attrs:["data-s31-scene","data-s22-scene"]},
    {name:"work",root:".work-world",host:".work-preview",attrs:["data-theme"]},
    {name:"sound",root:".sound-world",host:".sound-record",attrs:["data-mood"]},
    {name:"places",root:".p14-world",host:".p14-postcard",attrs:["data-place"]},
    {name:"about",root:".a17-world",host:".a17-card",attrs:["data-mode"]}
  ];
  function init(){
    const fine=window.matchMedia?.("(hover: hover) and (pointer: fine)");
    const motion=window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const contrast=window.matchMedia?.("(prefers-contrast: more)");
    if(!fine?.matches||motion?.matches||contrast?.matches||document.querySelector(".s44-material"))return;

    const installed=[];
    const nestedOpen=()=>(
      !!document.querySelector(".w19-root.is-open")||
      !!document.querySelector(".case-world.is-active")||
      !!document.querySelector(".sound-archive.is-open")||
      !!document.querySelector(".p15-journal.is-open")||
      !!(document.querySelector(".s34-overlay")?.hidden===false)
    );
    for(const def of defs){
      const root=document.querySelector(def.root);
      const host=root?.querySelector(def.host);
      if(!root||!host)continue;
      const layer=document.createElement("span");
      layer.className="s44-material";
      layer.setAttribute("aria-hidden","true");
      host.appendChild(layer);
      const receiver=def.delegate?root:host;
      let inside=false,timer=0,frame=0,xy={x:50,y:45};
      function allowed(){
        if(document.hidden||nestedOpen()||document.body.classList.contains("s41-studio-focus"))return false;
        if(def.name==="home"){
          return !document.querySelector(".work-world.is-active,.sound-world.is-active,.p14-world.is-active,.a17-world.is-active");
        }
        return root.classList.contains("is-active")&&!root.inert;
      }
      function clear(){
        inside=false;
        if(timer){window.clearTimeout(timer);timer=0;}
        if(frame){window.cancelAnimationFrame(frame);frame=0;}
        layer.classList.remove("is-s44-lit");
      }
      function arm(){
        if(timer||layer.classList.contains("is-s44-lit")||!allowed())return;
        timer=window.setTimeout(()=>{
          timer=0;
          if(inside&&allowed())layer.classList.add("is-s44-lit");
        },330);
      }
      function move(ev){
        if(ev.pointerType&&ev.pointerType!=="mouse"&&ev.pointerType!=="pen"){clear();return;}
        if(!allowed()){if(inside)clear();return;}
        const r=host.getBoundingClientRect();
        if(!r.width||!r.height){if(inside)clear();return;}
        const x=(ev.clientX-r.left)/r.width;
        const y=(ev.clientY-r.top)/r.height;
        const currentlyInside=x>=0&&x<=1&&y>=0&&y<=1;
        if(!currentlyInside){if(inside)clear();return;}
        if(!inside){inside=true;arm();}
        xy={x:Math.min(100,Math.max(0,x*100)),y:Math.min(100,Math.max(0,y*100))};
        if(frame)return;
        frame=window.requestAnimationFrame(()=>{
          frame=0;
          layer.style.setProperty("--s44-x",xy.x.toFixed(1)+"%");
          layer.style.setProperty("--s44-y",xy.y.toFixed(1)+"%");
        });
      }
      receiver.addEventListener("pointermove",move,{passive:true});
      receiver.addEventListener("pointerleave",clear,{passive:true});
      root.addEventListener("scroll",clear,{passive:true});
      new MutationObserver(clear).observe(root,{attributes:true,attributeFilter:["class"]});
      const source=def.name==="work"?host:root;
      if(def.attrs?.length)new MutationObserver(clear).observe(source,{attributes:true,attributeFilter:def.attrs});
      root.classList.add("s44-ready");
      installed.push(clear);
    }
    document.addEventListener("visibilitychange",()=>{
      if(document.hidden)installed.forEach(fn=>fn());
    });
    if(motion?.addEventListener)motion.addEventListener("change",()=>{
      if(motion.matches)installed.forEach(fn=>fn());
    });
    if(fine?.addEventListener)fine.addEventListener("change",()=>{
      if(!fine.matches)installed.forEach(fn=>fn());
    });
  }
  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();
;


/* SOURCE assets/js/work-art-direction-52-1.js */
/* STEP 55 — WORK / BRIGHTER RED HOUSE EDITORIAL COVER
   Only updates existing cover image elements. No navigation, layout,
   event-handling or GSAP morph changes. Using one <img> source keeps
   the cover and project transition coherent.
*/
(() => {
  const base = "https://marega02.github.io/portfolio-assets/assets/images/";
  const covers = [
    {
      url: base + "work-redhouse-55.svg",
      fallback: "",
      alt: "Red House Studio — fotografia del salone reale, con un taglio editoriale."
    },
    {
      url: "https://images.pexels.com/photos/8920813/pexels-photo-8920813.jpeg?auto=compress&cs=tinysrgb&w=1600",
      fallback: base + "work-soca-52-1.svg",
      alt: "Soča Valley — fotografia del fiume smeraldo nella valle dell'Isonzo, immagine illustrativa."
    },
    {
      url: "https://images.pexels.com/photos/37305714/pexels-photo-37305714.jpeg?auto=compress&cs=tinysrgb&w=1600",
      fallback: base + "work-gianni-fallback-52-1.svg",
      alt: "Trattoria Da Gianni — fotografia editoriale di cucina italiana, immagine d'atmosfera."
    }
  ];
  function init() {
    const previews = Array.from(document.querySelectorAll(".work-world .work-preview .preview-visual .preview-image"));
    if (previews.length !== covers.length) return;
    previews.forEach((img, index) => {
      const data = covers[index];
      if (img.dataset.s53Applied === "1") return;
      const original = img.currentSrc || img.src;
      function load(url, isFallback) {
        if (!url) return;
        const test = new Image();
        test.onload = () => {
          if (img.dataset.s53Applied === "1") return;
          img.removeAttribute("srcset");
          img.removeAttribute("sizes");
          img.src = url;
          img.alt = data.alt;
          img.decoding = "async";
          img.dataset.s53Applied = "1";
          img.dataset.s521Applied = "1";
          img.dataset.s53Source = isFallback ? "fallback" : "editorial";
          img.onerror = () => {
            img.onerror = null;
            img.dataset.s53Applied = "";
            if (!isFallback && data.fallback) load(data.fallback, true);
            else if (original) {
              img.src = original;
              img.dataset.s53Source = "original";
            }
          };
        };
        test.onerror = () => {
          if (!isFallback && data.fallback) load(data.fallback, true);
        };
        test.src = url;
      }
      load(data.url, false);
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, {once:true});
  else init();
})();
;


/* SOURCE assets/js/work-direct-navigation-55.js */
/* STEP 55 — PROJECT DIRECT NAVIGATION
   Keep the existing project selection and GSAP shared-image morph.
   The list and the photograph open the selected case study directly.
   Existing back/ESC behavior is kept, with a focus-return fix.
*/
(() => {
  function init() {
    const work = document.querySelector(".work-world");
    const caseWorld = document.querySelector(".case-world");
    const preview = work?.querySelector(".work-preview");
    const open = work?.querySelector(".case-open");
    const rows = [...(work?.querySelectorAll(".work-project") || [])];
    if (!work || !caseWorld || !preview || !open || rows.length !== 3 ||
        work.dataset.s55Navigation === "ready") return;

    work.dataset.s55Navigation = "ready";
    const projectNames = ["Red House Studio", "Soča Valley", "Trattoria Da Gianni"];
    const themes = ["redhouse", "soca", "gianni"];
    let lastOpenedIndex = 0;

    // The old CTA is still present internally because the original scene
    // and GSAP morph subscribe to its click event.
    open.tabIndex = -1;
    open.setAttribute("aria-hidden", "true");

    function currentIndex() {
      const selected = rows.findIndex(row => row.classList.contains("is-current"));
      return selected < 0 ? 0 : selected;
    }

    function describePreview() {
      preview.setAttribute("aria-label", "Open project: " + projectNames[currentIndex()]);
    }

    function openSelected(index) {
      if (caseWorld.classList.contains("is-active")) return;
      // Focus triggers both original selectors (copy and image), so the
      // case-study code receives the correct is-current project.
      const row = rows[index];
      if (!row) return;
      row.focus({preventScroll:true});
      lastOpenedIndex = index;
      describePreview();
      open.click();
    }

    rows.forEach((row, index) => {
      row.setAttribute("aria-label", "Open project: " + projectNames[index]);

      // Capture before the old click-to-preview handlers, especially on
      // touch where the old handlers would scroll the page to the photo.
      row.addEventListener("click", event => {
        if (event.defaultPrevented) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        openSelected(index);
      }, true);

      row.addEventListener("keydown", event => {
        if (event.repeat || (event.key !== "Enter" && event.key !== " ")) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        openSelected(index);
      }, true);

      row.addEventListener("mouseenter", describePreview);
      row.addEventListener("focus", describePreview);
    });

    // A clean image works better without a floating button: the whole
    // visual is an additional accessible target.
    preview.setAttribute("role", "button");
    preview.tabIndex = 0;
    preview.setAttribute("aria-roledescription", "project preview");
    describePreview();

    preview.addEventListener("click", event => {
      if (event.target.closest("a,button")) return;
      openSelected(currentIndex());
    });
    preview.addEventListener("keydown", event => {
      if (event.repeat || (event.key !== "Enter" && event.key !== " ")) return;
      event.preventDefault();
      openSelected(currentIndex());
    });

    // The original case-back action focuses the old Explore button.
    // Now that the CTA is visually removed, return focus to the project
    // that the visitor actually chose instead.
    let wasOpen = caseWorld.classList.contains("is-active");
    const observeCase = new MutationObserver(() => {
      const isOpen = caseWorld.classList.contains("is-active");
      if (wasOpen && !isOpen) {
        requestAnimationFrame(() => {
          if (!caseWorld.classList.contains("is-active") && work.classList.contains("is-active")) {
            rows[lastOpenedIndex]?.focus({preventScroll:true});
          }
        });
      }
      wasOpen = isOpen;
    });
    observeCase.observe(caseWorld, {attributes:true, attributeFilter:["class"]});

    // Hover selection also changes the case identity.
    const observePreview = new MutationObserver(() => {
      if (themes.includes(preview.dataset.theme)) describePreview();
    });
    observePreview.observe(preview, {attributes:true, attributeFilter:["data-theme"]});
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, {once:true});
  } else init();
})();
;


/* SOURCE assets/js/portfolio-rhythm-56.js */
/* STEP 56 — QUIET MOTION / CHAPTER SIGNATURES
   One decorative header line per world and one-shot copy reveals.
   Zero animation loops, timers, extra scroll listeners, or GSAP overrides.
*/
(() => {
  function init() {
    if (document.documentElement.dataset.s56Ready === "1") return;
    document.documentElement.dataset.s56Ready = "1";

    const headers = [
      ".world-hub .world-top",
      ".work-world .work-top",
      ".sound-world .sound-top",
      ".p14-world .p14-top",
      ".a17-world .a17-header"
    ];

    headers.forEach(selector => {
      const header = document.querySelector(selector);
      if (!header || header.querySelector(".s56-header-line")) return;
      const line = document.createElement("span");
      line.className = "s56-header-line";
      line.setAttribute("aria-hidden", "true");
      header.appendChild(line);
    });

    // Copy-only reveals: the site's existing world/hero animations and
    // selected-element interactions remain in sole control of movement.
    if (!("IntersectionObserver" in window) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        window.innerWidth <= 991) return;

    const specs = [
      [".sound-world", [".sound-bottom"]],
      [".p14-world", [".p14-below"]],
      [".a17-world", [".a17-curiosity-head", ".a18-meta", ".a18-deck"]]
    ];

    specs.forEach(([sceneSelector, targetSelectors]) => {
      const scene = document.querySelector(sceneSelector);
      if (!scene) return;

      const targets = targetSelectors
        .map(s => scene.querySelector(s))
        .filter(Boolean);
      if (!targets.length) return;

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("s56-visible");
          observer.unobserve(entry.target);
        });
      }, {
        root: scene,
        rootMargin: "0px 0px -5% 0px",
        threshold: 0.08
      });

      targets.forEach(el => {
        el.classList.add("s56-reveal-ready");
        observer.observe(el);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, {once: true});
  } else {
    init();
  }
})();

;


/* SOURCE assets/js/drawn-worlds-60.js */
/* STEP 60 — DRAWN WORLDS
   The four existing HOME poster illustrations draw themselves as the
   user explores the navigation. ABOUT's large editorial sentence gets
   a one-shot reveal. No added UI, no parent transforms, no GSAP edits.
*/
(() => {
  function init() {
    const hub = document.querySelector(".world-hub");
    const board = hub?.querySelector(".s22-art");
    const about = document.querySelector(".a17-world");
    const note = about?.querySelector(".a18-sentence");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const names = ["work", "sound", "places", "about"];

    if (hub && board && !hub.dataset.s60Drawn) {
      hub.dataset.s60Drawn = "1";
      let previous = "";
      let animations = [];
      const clear = () => {
        animations.forEach(anim => {
          try { anim.cancel(); } catch (_) {}
        });
        animations = [];
      };
      function draw() {
        const key = hub.dataset.s22Scene || hub.dataset.s31Scene || "work";
        if (!names.includes(key) || key === previous) return;
        previous = key;
        clear();
        if (reduced.matches || !("animate" in Element.prototype)) return;
        const frame = [...board.querySelectorAll(".s22-frame")].find(
          el => el.dataset.scene === key
        );
        if (!frame) return;
        const shapes = [...frame.querySelectorAll(
          "path, rect, circle, ellipse, line, polyline, polygon"
        )].filter(el => {
          const stroke = getComputedStyle(el).stroke;
          return stroke && stroke !== "none" &&
            typeof el.getTotalLength === "function";
        }).slice(0, 26);
        let i = 0;
        for (const el of shapes) {
          let length = 0;
          try { length = el.getTotalLength(); } catch (_) { continue; }
          if (length < 8 || !Number.isFinite(length)) continue;
          const total = Math.ceil(length) + 2;
          const delay = Math.min(280, i++ * 26);
          const anim = el.animate([
            {strokeDasharray: total + " " + total, strokeDashoffset: total},
            {strokeDasharray: total + " " + total, strokeDashoffset: 0}
          ], {
            duration: 680 + Math.min(i, 8) * 45,
            delay,
            easing: "cubic-bezier(.22,.72,.21,1)",
            fill: "backwards"
          });
          animations.push(anim);
        }
      }
      const watcher = new MutationObserver(draw);
      watcher.observe(hub, {
        attributes: true,
        attributeFilter: ["data-s22-scene", "data-s31-scene"]
      });
      // Allow the original poster setup/entrance to settle first.
      requestAnimationFrame(() => requestAnimationFrame(draw));
      reduced.addEventListener?.("change", () => {
        if (reduced.matches) clear();
        else { previous = ""; draw(); }
      });
    }

    if (about && note && !note.dataset.s60NoteReady && !reduced.matches &&
        "IntersectionObserver" in window) {
      note.dataset.s60NoteReady = "1";
      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          note.classList.add("s60-note-visible");
          observer.disconnect();
          break;
        }
      }, {root: about, threshold: .09, rootMargin: "0px 0px -5% 0px"});
      note.classList.add("s60-note-ready");
      observer.observe(note);
      // If the user changes their motion preference, release the masking.
      reduced.addEventListener?.("change", () => {
        if (reduced.matches) {
          note.classList.add("s60-note-visible");
          observer.disconnect();
        }
      }, {once:true});
    }
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init, {once:true});
  else init();
})();
;


/* SOURCE assets/js/analog-atlas-61.js */
/* STEP 61 — FINITE ANALOG / ATLAS ANIMATIONS. Never edits page layout, GSAP or navigation. */
(() => {
  function init() {
    const sound = document.querySelector(".sound-world");
    const record = sound?.querySelector(".sound-record");
    const spectrum = sound?.querySelector(".s24-spectrum");
    const places = document.querySelector(".p14-world");
    const postcard = places?.querySelector(".p14-postcard");
    const route = places?.querySelector(".p25-route-path");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrast = window.matchMedia("(prefers-contrast: more)");
    const supported = typeof Element.prototype.animate === "function";
    const active = new Set();
    const noMotion = () => motion.matches || contrast.matches || document.hidden;

    function animate(node, frames, options) {
      if (!node || !supported) return;
      const a = node.animate(frames, { ...options, fill: "none" });
      active.add(a);
      a.addEventListener("finish", () => active.delete(a), { once: true });
      a.addEventListener("cancel", () => active.delete(a), { once: true });
    }
    function stopAll() {
      for (const a of [...active]) { try { a.cancel(); } catch (_) {} }
      active.clear();
    }

    if (sound && record && !sound.dataset.s61Sound) {
      sound.dataset.s61Sound = "1";
      sound.classList.add("s61-sound-ready");
      const etch = document.createElement("span");
      etch.className = "s61-groove-etch";
      etch.setAttribute("aria-hidden", "true");
      record.appendChild(etch);
      let lastMood = "", wasOpen = false;
      function updateSound() {
        const open = sound.classList.contains("is-active");
        const mood = sound.dataset.mood || "soul";
        if (!open) { wasOpen = false; return; }
        if (wasOpen && lastMood === mood) return;
        wasOpen = true; lastMood = mood;
        if (noMotion() || sound.querySelector(".sound-archive.is-open")) return;
        const speed = mood === "hiphop" ? 27 : mood === "alternative" ? 43 : 33;
        animate(etch, [
          { opacity: .16, transform: "rotate(-16deg)" },
          { opacity: .80, transform: "rotate(10deg)", offset: .43 },
          { opacity: .24, transform: "rotate(35deg)" }
        ], { duration: 1040, easing: "cubic-bezier(.21,.75,.22,1)" });
        [...(spectrum?.querySelectorAll("i") || [])].forEach((bar, i) => {
          animate(bar, [
            { opacity: .40 }, { opacity: 1, offset: .45 }, { opacity: .78 }
          ], { duration: 430, delay: i * speed, easing: "ease-out" });
        });
      }
      new MutationObserver(updateSound).observe(sound, {
        attributes: true, attributeFilter: ["class", "data-mood"]
      });
      updateSound();
    }

    if (places && postcard && !places.dataset.s61Places) {
      places.dataset.s61Places = "1";
      places.classList.add("s61-places-ready");
      const exposure = document.createElement("span");
      exposure.className = "s61-exposure";
      exposure.setAttribute("aria-hidden", "true");
      postcard.appendChild(exposure);
      let lastPlace = "", wasOpen = false;
      function updatePlaces() {
        const open = places.classList.contains("is-active");
        const key = places.dataset.place || "soca";
        if (!open) { wasOpen = false; return; }
        if (!["soca", "london", "kl"].includes(key)) return;
        if (wasOpen && lastPlace === key) return;
        wasOpen = true; lastPlace = key;
        if (noMotion()) return;
        animate(exposure, [
          { opacity: 0, transform: "translate3d(-110%,0,0)" },
          { opacity: .52, transform: "translate3d(0,0,0)", offset: .52 },
          { opacity: 0, transform: "translate3d(110%,0,0)" }
        ], { duration: 1060, easing: "cubic-bezier(.3,.65,.2,1)" });
        if (route) animate(route, [
          { strokeDashoffset: 90, opacity: .45 },
          { strokeDashoffset: 0, opacity: .75 }
        ], { duration: 860, easing: "cubic-bezier(.2,.75,.25,1)" });

        const scene = [...postcard.querySelectorAll(".p14-scene")].find(
          el => el.dataset.scene === key
        );
        const shapes = scene ? [...scene.querySelectorAll("path,polyline,line,ellipse,circle")] : [];
        let count = 0;
        for (const shape of shapes) {
          if (count >= 10 || typeof shape.getTotalLength !== "function") continue;
          const stroke = getComputedStyle(shape).stroke;
          if (!stroke || stroke === "none") continue;
          let length;
          try { length = shape.getTotalLength(); } catch (_) { continue; }
          if (!Number.isFinite(length) || length < 16) continue;
          const dash = Math.ceil(length) + 2;
          animate(shape, [
            { strokeDasharray: dash + " " + dash, strokeDashoffset: dash },
            { strokeDasharray: dash + " " + dash, strokeDashoffset: 0 }
          ], { duration: 710, delay: count * 48, easing: "cubic-bezier(.21,.75,.2,1)" });
          count++;
        }
        const pin = places.querySelector(".p25-route-pin.is-current");
        if (pin) animate(pin, [
          { opacity: .35 }, { opacity: 1 }
        ], { duration: 470, easing: "ease-out" });
      }
      new MutationObserver(updatePlaces).observe(places, {
        attributes: true, attributeFilter: ["class", "data-place"]
      });
      updatePlaces();
    }

    motion.addEventListener?.("change", () => { if (noMotion()) stopAll(); });
    contrast.addEventListener?.("change", () => { if (noMotion()) stopAll(); });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopAll();
    });
  }
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
;
