/* PHASE 117 — SINGLE CONTROLLER HOME CAPTIONS AND SMOOTH GRID OPENING
   Home: minimal vertical photographic reel inspired by editorial portfolios.
   Below: a compact, spatial triptych of actual destination cards.
   One focus index and finite state transitions, no animation frame loops.
   Keep all original Webflow world links and case studies alive.
*/
(() => {
  function boot(){
    const hub=document.querySelector(".world-hub.fi92-ready");
    const folded=hub?.querySelector(".fi92-shell");
    const originalLinks=[...(folded?.querySelectorAll(".fi92-card .world-link")||[])];
    const work=document.querySelector(".work-world");
    const caseWorld=document.querySelector(".case-world");
    const rows=[...(work?.querySelectorAll(".work-project")||[])];
    const caseOpen=work?.querySelector(".case-open");
    const workBack=work?.querySelector(".work-back");
    const worlds={
      sound:document.querySelector(".sound-world"),
      places:document.querySelector(".p14-world"),
      about:document.querySelector(".a17-world")
    };
    if(!hub||!folded||originalLinks.length!==4||!work||!caseWorld||
       rows.length!==3||!caseOpen||!workBack||
       Object.values(worlds).some(el=>!el)||hub.dataset.fi95Ready==="1")return;

    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
    const keys=["work","sound","places","about"];
    const photo=(id,w=900)=>"https://images.pexels.com/photos/"+id+"/pexels-photo-"+id+".jpeg?auto=compress&cs=tinysrgb&w="+w;
    const meta={
      work:{
        label:"WORK",detail:"PROJECTS & EXPERIMENTS",
        cover:"https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6af23552980d046ba8433a49_Work%20Editorial%20%E2%80%94%20Red%20House%20Salon.jpg",
        accent:"#e0a37d",
        items:[
          {name:"RED HOUSE STUDIO",sub:"WEB DESIGN",value:"redhouse",src:"https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6af23552980d046ba8433a49_Work%20Editorial%20%E2%80%94%20Red%20House%20Salon.jpg"},
          {name:"SOČA VALLEY",sub:"DIGITAL STORYTELLING",value:"soca",src:"https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6af229d8d2ed6dd493860312_Places%20HD%20Soca%20Valley%20%E2%80%94%201600px.jpeg"},
          {name:"DA GIANNI",sub:"HOSPITALITY",value:"gianni",src:"https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6af235826d6fbe9b2e154fb5_Work%20Editorial%20%E2%80%94%20Da%20Gianni%20Hospitality.jpg"}
        ]
      },
      sound:{
        label:"SOUND",detail:"A COLLECTION OF FREQUENCIES / TEN GENRES",cover:"https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6af2299b88336428ea628ff4_Portfolio%20Home%20%E2%80%94%20Sound%20%E2%80%94%201400px.jpg",accent:"#c9ad9b",
        items:[
          {name:"SOUL",sub:"WARM VOICES",value:"soul",src:"https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6af2299b88336428ea628ff4_Portfolio%20Home%20%E2%80%94%20Sound%20%E2%80%94%201400px.jpg"},
          {name:"HIP-HOP",sub:"BEATS & WORDS",value:"hiphop",src:"https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6af22cc58382519792e185e3_Sound%20Genre%20%E2%80%94%20Hip%20Hop.jpg"},
          {name:"ALTERNATIVE",sub:"OUTSIDE THE LINES",value:"alternative",src:"https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6af22cd8942516130218800c_Sound%20Genre%20%E2%80%94%20Alternative.jpg"},
          {name:"JAZZ",sub:"IMPROVISATION",value:"jazz",src:"https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6af22cecfd36bed9ca7a5963_Sound%20Genre%20%E2%80%94%20Jazz.jpg"},
          {name:"R&B",sub:"THE SLOW GROOVE",value:"rnb",src:"https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6af22d0b8382519792e1a1fa_Sound%20Genre%20%E2%80%94%20R%20and%20B.jpg"},
          {name:"FUNK",sub:"FEEL THE GROOVE",value:"funk",src:"https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6af22d21d820134d4a61f5c1_Sound%20Genre%20%E2%80%94%20Funk.jpg"},
          {name:"ELECTRONIC",sub:"SYNTHETIC WORLDS",value:"electronic",src:"https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6af22d38895ceb8ff6d5b6a3_Sound%20Genre%20%E2%80%94%20Electronic.jpg"},
          {name:"HOUSE",sub:"AFTER DARK",value:"house",src:"https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6af22d9c1188ae1310b12616_Sound%20Genre%20%E2%80%94%20House.jpg"},
          {name:"ROCK",sub:"AMPLIFIED FEELING",value:"rock",src:"https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6af22d5e78b9242b0e7d07ba_Sound%20Genre%20%E2%80%94%20Rock.jpg"},
          {name:"AMBIENT",sub:"OPEN SPACE",value:"ambient",src:"https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6af22d7776a7406508c4ebc8_Sound%20Genre%20%E2%80%94%20Ambient.jpg"}
        ]
      },
      places:{
        label:"PLACES",detail:"MEMORIES IN MOTION / PERSONAL ATLAS",cover:"https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6af229d8d2ed6dd493860312_Places%20HD%20Soca%20Valley%20%E2%80%94%201600px.jpeg",accent:"#b6d8cb",
        items:[
          // Original three Places: keep them intact.
          {name:"SOČA VALLEY",sub:"SLOVENIA",value:"soca",src:"https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6af229d8d2ed6dd493860312_Places%20HD%20Soca%20Valley%20%E2%80%94%201600px.jpeg"},
          {name:"LONDON",sub:"UNITED KINGDOM",value:"london",src:"https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6af229f1a5ae357dc16c667a_Places%20HD%20London%20%E2%80%94%201600px.jpeg"},
          {name:"KUALA LUMPUR",sub:"MALAYSIA",value:"kl",src:"https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6af22a07edb0c6ee38685e93_Places%20HD%20Kuala%20Lumpur%20%E2%80%94%201600px.jpeg"},
          // Three additional visual-only samples to test the spherical layout.
          {name:"KYOTO",sub:"JAPAN",value:"kyoto-demo",src:"https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6af22a1cbe4a24fbf8739e49_Places%20HD%20Kyoto%20%E2%80%94%201600px.jpeg"},
          {name:"ICELAND",sub:"NORDIC LANDSCAPES",value:"iceland-demo",src:photo("10050561",1400)},
          {name:"MARRAKECH",sub:"MOROCCO",value:"marrakech-demo",src:photo("35816389",1400)}
        ]
      },
      about:{
        label:"ABOUT",detail:"BEHIND THE SCREEN",cover:"https://cdn.prod.website-files.com/6adce03b89b49e519149623e/6af229b3edb0c6ee3868486f_Portfolio%20Home%20%E2%80%94%20About%20%E2%80%94%201400px.jpg",accent:"#dfb6a9",
        items:[
          {name:"MAKE",sub:"DESIGN",value:"make",src:photo("9617406")},
          {name:"LISTEN",sub:"MUSIC",value:"listen",src:photo("9258252")},
          {name:"WANDER",sub:"EXPLORATION",value:"wander",src:photo("29339931")}
        ]
      }
    };
    let active=1;
    let category=null,selected=0,bypass=false,caseOwned=false,sceneOwned=null;
    let previousCase=caseWorld.classList.contains("is-active");
    let wheelGate=0;
    const home=document.createElement("div");
    home.className="fi95-home fi108-home";
    home.innerHTML=
      '<header class="fi95-head">'+
        '<a class="fi95-logo" href="#" aria-label="Back to the beginning">LM<span>.</span></a>'+
        '<span class="fi95-home-label">LUCA MAREGA <i> / </i> PORTFOLIO</span>'+
        '<span class="fi95-head-right">INDEPENDENT CREATIVE / ITALY</span>'+
      '</header>'+
      '<main class="fi95-gallery-wrap">'+
        '<div class="fi108-intro">'+
          '<span class="fi108-kicker"><i aria-hidden="true"></i> SELECTED CHAPTERS / NO. 01—04</span>'+
          '<h1>FOUR SIDES<span class="fi108-punctuation">.</span><em> ONE STORY.</em></h1>'+
        '</div>'+

        '<div class="fi95-gallery" role="group" aria-label="Explore four portfolio chapters"></div>'+
        '<div class="fi108-rail fi108-rail-bottom">'+
          '<span class="fi108-dynamic-desc">WEB DESIGN / DIGITAL EXPERIENCES</span>'+
          '<span>CLICK TO ENTER ↗</span>'+
        '</div>'+
      '</main>'+
      '<footer class="fi95-home-foot">'+
        '<span class="fi95-current">01 / 04</span>'+
        '<span class="fi95-current-title">WORK</span>'+
        '<span class="fi95-home-hint">EXPLORE THE FOUR WORLDS <i> · </i> CLICK TO ENTER</span>'+
      '</footer>';
    const gallery=home.querySelector(".fi95-gallery");
    // Clean out stray labels from earlier iterations. They were part of
    // the retired World Index, not the active four-chapter navigation.
    const clearOldIndex=()=>{
      hub.querySelectorAll(".world-index,[class*='world-index-label'],.fi92-index").forEach(el=>{
        el.setAttribute("aria-hidden","true");
        el.style.setProperty("display","none","important");
      });
      const walker=document.createTreeWalker(hub,NodeFilter.SHOW_TEXT);
      const remove=[];
      while(walker.nextNode()){
        const t=walker.currentNode;
        const label=(t.textContent||"").trim().replace(/\s+/g," ").toUpperCase();
        if(label==="WORLD INDEX"||label==="THE WORLD INDEX"||label==="INDEX"){
          const parent=t.parentElement;
          if(parent&&parent.closest(".world-hub")&&!parent.closest(".fi113-work-stage")){
            remove.push(parent);
          }
        }
      }
      remove.forEach(el=>{
        el.setAttribute("aria-hidden","true");
        el.style.setProperty("display","none","important");
      });
    };
    clearOldIndex();
    const cards=[];
    const isTouch=window.matchMedia("(pointer: coarse)").matches;
    keys.forEach((key,i)=>{
      const data=meta[key];
      const card=document.createElement("article");
      card.className="fi95-panel";
      card.dataset.category=key;
      card.style.setProperty("--fi95-accent",data.accent);
      card.innerHTML=
        '<div class="fi95-photo-wrap">'+
          '<div class="fi95-image-overlay"></div>'+
          '<span class="fi95-panel-num fi113-panel-id"><b>0'+(i+1)+'</b><i aria-hidden="true"></i><small>0'+(i+1)+'/04</small></span>'+
        '</div>'+
        '<div class="fi95-panel-text"></div>'+
        '<span class="fi95-panel-arrow" aria-hidden="true">↗</span>';
      const image=document.createElement("img");
      image.className="fi95-cover";
      image.alt="";
      image.decoding="async";
      // All four Home photographs are visible at once. Lazy-loading the
      // last two may leave blank frames in the first viewport.
      image.loading="eager";
      if(i===0)image.fetchPriority="high";
      // Real Webflow asset URLs for Work/Places and verified photography
      // for Sound/About. Keep the image visible throughout hover/focus.
      // Keep a real photographic BACKGROUND on the fixed card surface;
      // the child img remains a preload/fallback signal, never the only
      // visible image. This prevents hover-related opacity/3D flicker.
      const fallbackPhotos={
        work:["https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6ae398c6df2ad78c7ef6657d_Screenshot%202026-10-29%20at%2020-02-35%20Red%20House%20Studio%20Parrucchiere%20a%20Gorizia.png"],
        sound:["https://cdn.prod.website-files.com/6adce03b89b49e519149623e/6af2299b88336428ea628ff4_Portfolio%20Home%20%E2%80%94%20Sound%20%E2%80%94%201400px.jpg"],
        places:["https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6af229d8d2ed6dd493860312_Places%20HD%20Soca%20Valley%20%E2%80%94%201600px.jpeg"],
        about:["https://cdn.prod.website-files.com/6adce03b89b49e519149623e/6af229b3edb0c6ee3868486f_Portfolio%20Home%20%E2%80%94%20About%20%E2%80%94%201400px.jpg"]
      };
      const photoWrap=card.querySelector(".fi95-photo-wrap");
      const setPhoto=url=>{
        const background='url("'+url+'")';
        // The card itself owns the photograph: never dependent on whether
        // the hidden preload img has fired load or an old hover rule runs.
        card.style.setProperty("--fi110-permanent-photo",background);
        photoWrap.style.setProperty("--fi109-cover",background);
      };
      setPhoto(data.cover);
      const showPhoto=url=>{
        setPhoto(url);
        card.classList.add("fi109-photo-ready");
        card.classList.remove("fi95-image-fallback");
      };
      image.addEventListener("load",()=>{
        showPhoto(image.currentSrc||image.src);
      });
      image.onerror=()=>{
        const queue=fallbackPhotos[key];
        const next=Number(image.dataset.fallbackIndex||"0");
        if(next<queue.length){
          image.dataset.fallbackIndex=String(next+1);
          image.src=queue[next];
        }else{
          // Leave the visual fallback on the card, not a blank panel.
          card.classList.add("fi95-image-fallback");
        }
      };
      image.src=data.cover;
      card.querySelector(".fi95-photo-wrap").prepend(image);
      const anchor=originalLinks[i];
      if(anchor.querySelector(".world-name")?.textContent?.trim().toLowerCase()!==key)return;
      anchor.setAttribute("aria-label","Open "+data.label);
      // The old World Index belongs to an earlier navigation experiment.
      // Keep its working links, but remove the decorative index tokens.
      anchor.querySelectorAll(".world-index").forEach(node=>node.remove());
      const desc=anchor.querySelector(".world-description");
      if(desc)desc.setAttribute("aria-hidden","true");
      card.querySelector(".fi95-panel-text").appendChild(anchor);
      const descriptors=["WEB DESIGN / EXPERIMENTS","MUSIC / INSPIRATION",
        "TRAVEL / JOURNAL","THE PERSON / BEHIND IT"];
      const descriptor=document.createElement("span");
      descriptor.className="fi108-panel-desc";
      descriptor.textContent=descriptors[i];
      card.querySelector(".fi95-panel-text").appendChild(descriptor);
      // Phase 117: only ONE visual label, created at the same time as the
      // card itself. It does not inherit the legacy .world-link animation.
      // The real native Webflow link is retained for route handling.
      const stableCaption=document.createElement("div");
      stableCaption.className="fi117-caption";
      stableCaption.setAttribute("aria-hidden","true");
      const stableTitle=document.createElement("strong");
      stableTitle.className="fi117-caption-title";
      stableTitle.textContent=data.label;
      const stableSubtitle=document.createElement("span");
      stableSubtitle.className="fi117-caption-subtitle";
      stableSubtitle.textContent=["WEB DESIGN / DIGITAL EXPERIENCES","MUSIC / INSPIRATION","DESTINATIONS / STORIES","THE PERSON / BEHIND IT"][i];
      stableCaption.append(stableTitle,stableSubtitle);
      card.appendChild(stableCaption);
      // The outer photo itself is the accessible entry surface. The
      // original link still works when invoked programmatically.
      card.tabIndex=0;
      card.setAttribute("role","button");
      card.setAttribute("aria-label","Open "+data.label);
      anchor.tabIndex=-1;
      card.addEventListener("keydown",e=>{
        if(e.target!==card)return;
        if(e.key==="Enter"||e.key===" "){
          e.preventDefault();
          anchor.click();
        }
      });
      gallery.appendChild(card);
      cards.push(card);
    });
    if(cards.length!==4)return;

    const chapter=document.createElement("section");
    chapter.className="fi95-level";
    chapter.setAttribute("aria-hidden","true");
    chapter.setAttribute("aria-label","Selected chapter");
    chapter.inert=true;
    chapter.innerHTML=
      '<header class="fi95-level-head">'+
        '<button class="fi95-back" type="button">↑ <span>HOME</span></button>'+
        '<span class="fi95-level-sign">LM. / SELECTED WORKS</span>'+
      '</header>'+
      '<div class="fi95-level-title">'+
        '<span class="fi95-level-number">01 / 04</span>'+
        '<h2>WORK</h2>'+
        '<span class="fi95-level-caption">PROJECTS & EXPERIMENTS</span>'+
      '</div>'+
      '<div class="fi95-cluster" role="group" aria-label="Selected chapter items">'+
        '<span class="fi95-cluster-spine" aria-hidden="true"></span>'+
      '</div>'+
      '<footer class="fi95-level-foot">'+
        '<span>THREE SELECTED FRAGMENTS</span>'+
        '<span class="fi95-selection-count">01 / 03</span>'+
      '</footer>';
    const cluster=chapter.querySelector(".fi95-cluster");
    const levelTitle=chapter.querySelector(".fi95-level-title h2");
    const levelNumber=chapter.querySelector(".fi95-level-number");
    const levelCaption=chapter.querySelector(".fi95-level-caption");
    const moduleButtons=[];
    for(let i=0;i<10;i++){
      const button=document.createElement("button");
      button.type="button";
      button.className="fi95-item fi95-item-"+i;
      button.innerHTML=
        '<span class="fi95-item-frame"><span class="fi95-item-image"></span>'+
          '<span class="fi95-item-index">0'+(i+1)+'</span>'+
        '</span>'+
        '<span class="fi95-item-meta"><strong></strong><small></small></span>'+
        '<span class="fi95-item-open" aria-hidden="true">↗</span>';
      button.addEventListener("mouseenter",()=>pick(i));
      button.addEventListener("focus",()=>pick(i));
      button.addEventListener("click",()=>openDestination(i));
      cluster.appendChild(button);
      moduleButtons.push(button);
    }
    // The grid is driven here, not by the conflicting CSS phase stack.
    // A single CSS grid-template transition moves the neighbours smoothly.
    function focusCard(index){
      active=Math.min(cards.length-1,Math.max(0,index));
      cards.forEach((card,i)=>card.classList.toggle("fi95-current",i===active));
      home.dataset.active=keys[active];
      if(!isTouch){
        const sizes=[.915,.915,.915,.915];
        sizes[active]=1.26;
        gallery.style.setProperty("grid-template-columns",
          sizes.map(v=>"minmax(0,"+v+"fr)").join(" "),"important");
        gallery.style.setProperty("transition",
          reduced.matches?"none":"grid-template-columns 1.02s cubic-bezier(.45,.05,.20,1) .06s","important");
      }
      home.querySelector(".fi95-current").textContent="0"+(active+1)+" / 04";
      home.querySelector(".fi95-current-title").textContent=meta[keys[active]].label;
      const details=["WEB DESIGN / DIGITAL EXPERIENCES","RHYTHM / CREATIVE INSPIRATION",
        "TRAVEL / PLACES & MEMORY","ABOUT / THE HUMAN SIDE"];
      const detail=home.querySelector(".fi108-dynamic-desc");
      if(detail)detail.textContent=details[active];
    }
    function pick(index){
      selected=index;
      moduleButtons.forEach((button,i)=>button.classList.toggle("fi95-selected",i===index));
      const count=category==="places"?6:category==="sound"?10:3;
      chapter.querySelector(".fi95-selection-count").textContent="0"+(index+1)+" / 0"+count;
    }
    function renderLevel(key,index=0){
      const data=meta[key];
      chapter.dataset.category=key;
      chapter.style.setProperty("--fi95-accent",data.accent);
      levelTitle.textContent=data.label;
      levelNumber.textContent="0"+(keys.indexOf(key)+1)+" / 04";
      levelCaption.textContent=data.detail;
      cluster.setAttribute("aria-label",key==="places"?"Six destinations on a 3D cylinder":key==="sound"?"Ten music genres on a rotating 3D cylinder":"Select from three items");
      moduleButtons.forEach((button,i)=>{
        const item=data.items[i];
        // Only Places displays six. Work, Sound and About keep their three
        // original elements and exactly the same navigation.
        button.hidden=!item;
        button.setAttribute("aria-hidden",String(!item));
        if(!item){button.tabIndex=-1;return;}
        // Places is currently a visual-only layout experiment.
        // Keep the other worlds' original interactive navigation untouched.
        const decorative=key==="places"||key==="sound";
        button.setAttribute("aria-label",decorative?"Visual study: "+item.name:"Open "+item.name);
        button.setAttribute("aria-disabled",String(decorative));
        button.tabIndex=decorative?-1:0;
        button.querySelector("strong").textContent=item.name;
        button.querySelector("small").textContent=item.sub;
        const frame=button.querySelector(".fi95-item-image");
        frame.replaceChildren();
        const image=document.createElement("img");
        image.alt="";
        image.decoding="async";
        // Fetch visible chapter photos immediately rather than waiting for
        // the slide transition to finish before lazy-load starts.
        image.loading="eager";
        const chapterFallback={
          work:photo("3042508",650),
          sound:photo("12488667",650),
          places:photo("8920813",650),
          about:photo("4231428",650)
        };
        image.onerror=()=>{
          if(image.dataset.fallbackTried!=="1"){
            image.dataset.fallbackTried="1";
            image.src=chapterFallback[key];
          }else button.classList.add("fi95-image-fallback");
        };
        frame.append(image);
        button.classList.remove("fi95-image-fallback");
        image.src=item.src;
      });
      chapter.querySelector(".fi95-level-foot span:first-child").textContent=
        key==="places"?"SIX DESTINATIONS / MEMORIES IN MOTION":key==="sound"?"TEN GENRES / ONE ROTATING ARCHIVE":"THREE SELECTED FRAGMENTS";
      pick(index);
    }
    function openLevel(key,index=0){
      if(!meta[key]||category||caseOwned||sceneOwned)return;
      category=key;
      renderLevel(key,index);
      chapter.inert=false;
      chapter.setAttribute("aria-hidden","false");
      home.inert=true;
      home.setAttribute("aria-hidden","true");
      hub.classList.add("fi95-level-open");
      const wait=reduced.matches?0:440;
      window.setTimeout(()=>{
        if(category===key&&!sceneOwned&&!caseOwned){
          const focusTarget=(key==="places"||key==="sound")?chapter.querySelector(".fi95-back"):moduleButtons[index];
          focusTarget?.focus({preventScroll:true});
        }
      },wait);
    }
    function closeLevel(){
      if(!category||caseOwned||sceneOwned)return;
      const returnIndex=keys.indexOf(category);
      category=null;
      hub.classList.remove("fi95-level-open");
      chapter.inert=true;
      chapter.setAttribute("aria-hidden","true");
      home.inert=false;
      home.removeAttribute("aria-hidden");
      focusCard(returnIndex);
      cards[returnIndex]?.querySelector(".world-link")?.focus({preventScroll:true});
    }

    // Preserve the real Webflow link and its existing content handlers.
    originalLinks.forEach((link,i)=>{
      link.addEventListener("click",event=>{
        if(bypass)return;
        event.preventDefault();
        event.stopImmediatePropagation();
        openLevel(keys[i]);
      },true);
      cards[i].addEventListener("mouseenter",()=>focusCard(i));
      cards[i].addEventListener("focusin",()=>focusCard(i));
      cards[i].addEventListener("click",event=>{
        if(event.target.closest("a,button"))return;
        link.click();
      });
    });
    home.querySelector(".fi95-logo").addEventListener("click",event=>{
      event.preventDefault();
      focusCard(1);
      cards[1]?.querySelector(".world-link")?.focus({preventScroll:true});
    });

    // One discrete wheel gesture = one adjacent image. No frame loop.
    gallery.addEventListener("wheel",event=>{
      if(isTouch||category||Math.abs(event.deltaY)<3&&Math.abs(event.deltaX)<3)return;
      event.preventDefault();
      const now=Date.now();
      if(now-wheelGate<310)return;
      wheelGate=now;
      const delta=Math.abs(event.deltaY)>Math.abs(event.deltaX)?event.deltaY:event.deltaX;
      focusCard(active+(delta>0?1:-1));
    },{passive:false});
    gallery.addEventListener("keydown",event=>{
      if(!["ArrowLeft","ArrowUp","ArrowRight","ArrowDown"].includes(event.key)||category)return;
      event.preventDefault();
      const step=event.key==="ArrowLeft"||event.key==="ArrowUp"?-1:1;
      focusCard(active+step);
      cards[active]?.querySelector(".world-link")?.focus({preventScroll:true});
    });
    // Native side swipe on touch, without intercepting the gesture.
    if(isTouch){
      let raf=0;
      gallery.addEventListener("scroll",()=>{
        if(raf)return;
        raf=requestAnimationFrame(()=>{
          raf=0;
          const mid=gallery.getBoundingClientRect().left+gallery.clientWidth/2;
          let index=0,best=Infinity;
          cards.forEach((card,i)=>{
            const r=card.getBoundingClientRect();
            const d=Math.abs(mid-(r.left+r.width/2));
            if(d<best){best=d;index=i}
          });
          focusCard(index);
        });
      },{passive:true});
    }
    function clickNative(key){
      const anchor=originalLinks[keys.indexOf(key)];
      if(!anchor)return;
      home.inert=false;
      hub.inert=false;
      bypass=true;
      try{anchor.click()}finally{bypass=false;home.inert=true}
    }
    function openWork(index){
      if(caseOwned)return;
      caseOwned=true;
      document.body.classList.add("fi93-case-route","fi95-native-route");
      clickNative("work");
      if(!work.classList.contains("is-active")){
        caseOwned=false;
        document.body.classList.remove("fi93-case-route","fi95-native-route");
        return;
      }
      rows[index]?.focus({preventScroll:true});
      caseOpen.click();
      if(!caseWorld.classList.contains("is-active")){
        workBack.click();
        caseOwned=false;
        document.body.classList.remove("fi93-case-route","fi95-native-route");
        restoreLevel();
      }
    }
    function openNative(key,index){
      const scene=worlds[key];
      if(!scene)return;
      sceneOwned=key;
      document.body.classList.add("fi95-native-route");
      clickNative(key);
      if(!scene.classList.contains("is-active")){
        sceneOwned=null;
        document.body.classList.remove("fi95-native-route");
        return;
      }
      const value=meta[key].items[index].value;
      const selector=key==="sound"?
        '.sound-mood[data-mood="'+value+'"]':
        key==="places"?
        '.p14-choice[data-target="'+value+'"]':
        '.a17-mode[data-a17-mode="'+value+'"]';
      scene.querySelector(selector)?.click();
    }
    function openDestination(index){
      if(!category||caseOwned||sceneOwned)return;
      // Six Places samples are strictly visual: no click navigation.
      if(category==="places"||category==="sound")return;
      pick(index);
      if(category==="work")openWork(index);
      else openNative(category,index);
    }
    function restoreLevel(){
      hub.inert=false;
      home.inert=true;
      home.setAttribute("aria-hidden","true");
      chapter.inert=false;
      chapter.setAttribute("aria-hidden","false");
      hub.classList.add("fi95-level-open");
      moduleButtons[selected]?.focus({preventScroll:true});
    }

    new MutationObserver(()=>{
      const isOpen=caseWorld.classList.contains("is-active");
      if(previousCase&&!isOpen&&caseOwned){
        caseOwned=false;
        if(work.classList.contains("is-active"))workBack.click();
        document.body.classList.remove("fi93-case-route","fi95-native-route");
        restoreLevel();
      }
      previousCase=isOpen;
    }).observe(caseWorld,{attributes:true,attributeFilter:["class"]});
    Object.entries(worlds).forEach(([key,scene])=>{
      let previous=scene.classList.contains("is-active");
      new MutationObserver(()=>{
        const open=scene.classList.contains("is-active");
        if(previous&&!open&&sceneOwned===key){
          sceneOwned=null;
          document.body.classList.remove("fi95-native-route");
          restoreLevel();
        }
        previous=open;
      }).observe(scene,{attributes:true,attributeFilter:["class"]});
    });
    chapter.querySelector(".fi95-back").addEventListener("click",closeLevel);
    document.addEventListener("keydown",event=>{
      if(event.key!=="Escape"||!category||caseOwned||sceneOwned)return;
      event.preventDefault();
      event.stopImmediatePropagation();
      closeLevel();
    },true);

    hub.append(home,chapter);
    focusCard(0);
    hub.dataset.fi95Ready="1";
    hub.classList.add("fi95-ready");
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",boot,{once:true});
  else boot();
})();