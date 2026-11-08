/* PHASE 95 — CINEMATIC REEL + COMPACT PROJECT CLUSTER
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
        cover:"https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6ae398c6df2ad78c7ef6657d_Screenshot%202026-10-29%20at%2020-02-35%20Red%20House%20Studio%20Parrucchiere%20a%20Gorizia-p-800.png",
        accent:"#e0a37d",
        items:[
          {name:"RED HOUSE STUDIO",sub:"WEB DESIGN",value:"redhouse",src:"https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6ae398c6df2ad78c7ef6657d_Screenshot%202026-10-29%20at%2020-02-35%20Red%20House%20Studio%20Parrucchiere%20a%20Gorizia-p-800.png"},
          {name:"SOČA VALLEY",sub:"DIGITAL STORYTELLING",value:"soca",src:photo("8920813")},
          {name:"DA GIANNI",sub:"HOSPITALITY",value:"gianni",src:photo("37305714")}
        ]
      },
      sound:{
        label:"SOUND",detail:"RHYTHM & INSPIRATION",cover:photo("9258252"),accent:"#b6c9ab",
        items:[
          {name:"SOUL",sub:"SIDE A",value:"soul",src:photo("9258252")},
          {name:"HIP-HOP",sub:"SIDE B",value:"hiphop",src:photo("7497788")},
          {name:"ALTERNATIVE",sub:"SIDE C",value:"alternative",src:photo("12488667")}
        ]
      },
      places:{
        label:"PLACES",detail:"TRAVEL & MEMORIES",cover:photo("8920813"),accent:"#b6d8cb",
        items:[
          {name:"SOČA VALLEY",sub:"SLOVENIA",value:"soca",src:photo("8920813")},
          {name:"LONDON",sub:"UNITED KINGDOM",value:"london",src:photo("9713161")},
          {name:"KUALA LUMPUR",sub:"MALAYSIA",value:"kl",src:photo("33146871")}
        ]
      },
      about:{
        label:"ABOUT",detail:"BEHIND THE SCREEN",cover:photo("29339931"),accent:"#dfb6a9",
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
    home.className="fi95-home";
    home.innerHTML=
      '<header class="fi95-head">'+
        '<a class="fi95-logo" href="#" aria-label="Back to the beginning">LM<span>.</span></a>'+
        '<span class="fi95-home-label">LUCA MAREGA <i> / </i> PORTFOLIO</span>'+
        '<span class="fi95-head-right">SELECTED WORLDS / 2026</span>'+
      '</header>'+
      '<div class="fi95-gallery-wrap">'+
        '<div class="fi95-trackmarks" aria-hidden="true"></div>'+
        '<div class="fi95-gallery" role="group" aria-label="Explore four portfolio chapters"></div>'+
      '</div>'+
      '<footer class="fi95-home-foot">'+
        '<span class="fi95-current">01 / 04</span>'+
        '<span class="fi95-current-title">WORK</span>'+
        '<span class="fi95-home-hint">SCROLL TO EXPLORE <i> · </i> CLICK TO ENTER</span>'+
      '</footer>';
    const gallery=home.querySelector(".fi95-gallery");
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
          '<span class="fi95-panel-num">0'+(i+1)+'</span>'+
        '</div>'+
        '<div class="fi95-panel-text"></div>'+
        '<span class="fi95-panel-arrow" aria-hidden="true">↗</span>';
      const image=document.createElement("img");
      image.className="fi95-cover";
      image.alt="";
      image.decoding="async";
      image.loading=i<2?"eager":"lazy";
      image.src=data.cover;
      image.onerror=()=>{
        card.classList.add("fi95-image-fallback");
        image.style.display="none";
      };
      card.querySelector(".fi95-photo-wrap").prepend(image);
      const anchor=originalLinks[i];
      if(anchor.querySelector(".world-name")?.textContent?.trim().toLowerCase()!==key)return;
      anchor.setAttribute("aria-label","Open "+data.label);
      const desc=anchor.querySelector(".world-description");
      if(desc)desc.setAttribute("aria-hidden","true");
      card.querySelector(".fi95-panel-text").appendChild(anchor);
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
        '<button class="fi95-back" type="button">↑ <span>INDEX</span></button>'+
        '<span class="fi95-level-sign">LM. / SELECTED WORKS</span>'+
      '</header>'+
      '<div class="fi95-level-title">'+
        '<span class="fi95-level-number">01 / 04</span>'+
        '<h2>WORK</h2>'+
        '<span class="fi95-level-caption">PROJECTS & EXPERIMENTS</span>'+
      '</div>'+
      '<div class="fi95-cluster" role="group" aria-label="Select from three items">'+
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
    for(let i=0;i<3;i++){
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
    function focusCard(index){
      active=Math.min(cards.length-1,Math.max(0,index));
      cards.forEach((card,i)=>card.classList.toggle("fi95-current",i===active));
      home.dataset.active=keys[active];
      home.querySelector(".fi95-current").textContent="0"+(active+1)+" / 04";
      home.querySelector(".fi95-current-title").textContent=meta[keys[active]].label;
    }
    function pick(index){
      selected=index;
      moduleButtons.forEach((button,i)=>button.classList.toggle("fi95-selected",i===index));
      chapter.querySelector(".fi95-selection-count").textContent="0"+(index+1)+" / 03";
    }
    function renderLevel(key,index=0){
      const data=meta[key];
      chapter.dataset.category=key;
      chapter.style.setProperty("--fi95-accent",data.accent);
      levelTitle.textContent=data.label;
      levelNumber.textContent="0"+(keys.indexOf(key)+1)+" / 04";
      levelCaption.textContent=data.detail;
      moduleButtons.forEach((button,i)=>{
        const item=data.items[i];
        button.setAttribute("aria-label","Open "+item.name);
        button.querySelector("strong").textContent=item.name;
        button.querySelector("small").textContent=item.sub;
        const frame=button.querySelector(".fi95-item-image");
        frame.replaceChildren();
        const image=document.createElement("img");
        image.src=item.src;
        image.alt="";
        image.decoding="async";
        image.loading="lazy";
        image.onerror=()=>{image.style.display="none";button.classList.add("fi95-image-fallback")};
        frame.append(image);
        button.classList.remove("fi95-image-fallback");
      });
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
      const wait=reduced.matches?0:580;
      window.setTimeout(()=>{
        if(category===key&&!sceneOwned&&!caseOwned)moduleButtons[index]?.focus({preventScroll:true});
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
      if(now-wheelGate<480)return;
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