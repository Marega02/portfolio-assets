/* PHASE 94 — THE ORBITAL INDEX
   Four floating outer modules around one quiet centre.
   Every category descends into its own horizontal orbital level.
   Original Webflow world links and case-study handlers remain the only
   source of actual content navigation. No scroll/RAF/WebGL loops.
*/
(() => {
  function init(){
    const hub=document.querySelector(".world-hub.fi92-ready");
    const shell=hub?.querySelector(".fi92-shell");
    const stack=shell?.querySelector(".fi92-stack");
    const originals=[...(stack?.querySelectorAll(".fi92-card .world-link")||[])];
    const work=document.querySelector(".work-world");
    const caseWorld=document.querySelector(".case-world");
    const rowEls=[...(work?.querySelectorAll(".work-project")||[])];
    const openButton=work?.querySelector(".case-open");
    const workBack=work?.querySelector(".work-back");
    if(!hub||!shell||!stack||originals.length!==4||!work||!caseWorld||
       rowEls.length!==3||!openButton||!workBack||hub.dataset.fi94Ready==="1")return;

    const keys=["work","sound","places","about"];
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
    const catalogue={
      work:{
        label:"WORK",code:"01",lead:"Digital experiences",
        description:"SELECT A PROJECT",
        nodes:[
          {name:"RED HOUSE",sub:"STUDIO",value:"redhouse",kind:"work-photo",src:"https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6ae398c6df2ad78c7ef6657d_Screenshot%202026-10-29%20at%2020-02-35%20Red%20House%20Studio%20Parrucchiere%20a%20Gorizia-p-800.png"},
          {name:"SOČA",sub:"VALLEY",value:"soca",kind:"work-photo",src:"https://images.pexels.com/photos/8920813/pexels-photo-8920813.jpeg?auto=compress&cs=tinysrgb&w=900"},
          {name:"DA GIANNI",sub:"TRATTORIA",value:"gianni",kind:"work-photo",src:"https://images.pexels.com/photos/37305714/pexels-photo-37305714.jpeg?auto=compress&cs=tinysrgb&w=900"}
        ]
      },
      sound:{
        label:"SOUND",code:"02",lead:"A personal frequency",
        description:"CHOOSE A FREQUENCY",
        nodes:[
          {name:"SOUL",sub:"SIDE A",value:"soul",kind:"record"},
          {name:"HIP-HOP",sub:"SIDE B",value:"hiphop",kind:"record"},
          {name:"ALTERNATIVE",sub:"SIDE C",value:"alternative",kind:"record"}
        ]
      },
      places:{
        label:"PLACES",code:"03",lead:"Field notes from elsewhere",
        description:"CHOOSE A PLACE",
        nodes:[
          {name:"SOČA VALLEY",sub:"SLOVENIA",value:"soca",kind:"landscape"},
          {name:"LONDON",sub:"UNITED KINGDOM",value:"london",kind:"city"},
          {name:"KUALA LUMPUR",sub:"MALAYSIA",value:"kl",kind:"city"}
        ]
      },
      about:{
        label:"ABOUT",code:"04",lead:"A few sides of one person",
        description:"CHOOSE A DIRECTION",
        nodes:[
          {name:"MAKE",sub:"DESIGN",value:"make",kind:"glyph"},
          {name:"LISTEN",sub:"RHYTHM",value:"listen",kind:"glyph"},
          {name:"WANDER",sub:"EXPLORE",value:"wander",kind:"glyph"}
        ]
      }
    };
    let current=null,selected=0,bypass=false,origin=null,caseOwned=false,sceneOwned=null;
    let previousCase=caseWorld.classList.contains("is-active");
    const worlds={
      sound:document.querySelector(".sound-world"),
      places:document.querySelector(".p14-world"),
      about:document.querySelector(".a17-world")
    };

    // Central station is purely graphic. The original four links stay
    // real, accessible and clickable on the surrounding panels.
    const core=document.createElement("div");
    core.className="fi94-core";
    core.setAttribute("aria-hidden","true");
    core.innerHTML='<span class="fi94-core-ring"></span><span class="fi94-core-cross"></span>'+
      '<span class="fi94-core-monogram">LM<span>.</span></span>';
    stack.appendChild(core);
    const tiny=document.createElement("p");
    tiny.className="fi94-home-instruction";
    tiny.textContent="FOUR WORLDS. CHOOSE ONE.";
    stack.appendChild(tiny);

    const level=document.createElement("section");
    level.className="fi93-work-level fi94-level";
    level.setAttribute("aria-label","Explore a chapter");
    level.setAttribute("aria-hidden","true");
    level.inert=true;
    level.innerHTML=
      '<header class="fi94-upper">'+
        '<button class="fi94-back" type="button" aria-label="Return to Home">↑ <span>BACK</span></button>'+
        '<span class="fi94-upper-id">LM / 02</span>'+
      '</header>'+
      '<div class="fi94-titles"><span class="fi94-section-index">01 / WORK</span>'+
        '<h2 class="fi94-heading">WORK</h2>'+
        '<p class="fi94-direction">SELECT A PROJECT</p>'+
      '</div>'+
      '<div class="fi93-orbit fi94-orbit" role="group" aria-label="Choose from three destinations">'+
        '<div class="fi94-hub" aria-hidden="true">'+
          '<span class="fi94-hub-inner"></span><span class="fi94-hub-code">LM / INDEX</span>'+
        '</div>'+
        '<span class="fi94-orbit-arc" aria-hidden="true"></span>'+
      '</div>'+
      '<footer class="fi94-lower"><span>SELECT A MODULE TO CONTINUE</span>'+
        '<span class="fi94-position">01 / 03</span></footer>';
    const orbit=level.querySelector(".fi94-orbit");
    const subtitle=level.querySelector(".fi94-direction");
    const title=level.querySelector(".fi94-heading");
    const index=level.querySelector(".fi94-section-index");
    const position=level.querySelector(".fi94-position");
    const modules=[];

    for(let i=0;i<3;i++){
      const node=document.createElement("button");
      node.type="button";
      node.className="fi93-node fi94-module fi94-module-"+i;
      node.setAttribute("aria-label","Open destination "+(i+1));
      node.innerHTML=
        '<span class="fi94-module-body">'+
          '<span class="fi94-media"><span class="fi94-media-art" aria-hidden="true"></span></span>'+
          '<span class="fi94-module-number">0'+(i+1)+'</span>'+
          '<span class="fi94-module-copy"><strong></strong><small></small></span>'+
          '<span class="fi94-module-arrow" aria-hidden="true">↗</span>'+
        '</span>';
      node.addEventListener("mouseenter",()=>select(i));
      node.addEventListener("focus",()=>select(i));
      node.addEventListener("click",()=>openDestination(i));
      orbit.appendChild(node);
      modules.push(node);
    }

    function select(i){
      selected=i;
      modules.forEach((node,j)=>node.classList.toggle("fi94-selected",j===i));
      position.textContent="0"+(i+1)+" / 03";
    }
    function populate(key){
      const group=catalogue[key];
      level.dataset.category=key;
      title.textContent=group.label;
      index.textContent=group.code+" / "+group.label;
      subtitle.textContent=group.description;
      modules.forEach((node,i)=>{
        const item=group.nodes[i];
        node.setAttribute("aria-label","Open "+item.name+" "+item.sub);
        node.dataset.kind=item.kind;
        node.querySelector("strong").textContent=item.name;
        node.querySelector("small").textContent=item.sub;
        const art=node.querySelector(".fi94-media-art");
        art.replaceChildren();
        if(item.src){
          const photo=new Image();
          photo.src=item.src;
          photo.alt="";
          photo.loading="lazy";
          photo.decoding="async";
          if(key==="work"){
            photo.addEventListener("error",()=>{
              const original=work.querySelectorAll(".preview-visual .preview-image")[i];
              if(original?.src&&photo.src!==original.src)photo.src=original.src;
            },{once:true});
          }
          art.appendChild(photo);
        }else{
          const mark=document.createElement("span");
          mark.className="fi94-art-symbol";
          mark.textContent=key==="sound"?"◉":key==="places"?(i===0?"⌁":"▧"):["✳","◎","↗"][i];
          art.appendChild(mark);
        }
      });
    }
    function enterLevel(key,nodeIndex=0){
      if(!catalogue[key]||caseWorld.classList.contains("is-active"))return;
      if(current && current!==key)return;
      current=key;
      populate(key);
      select(Math.max(0,Math.min(2,nodeIndex)));
      hub.classList.remove("fi93-work-active");
      hub.classList.add("fi94-active");
      level.inert=false;
      level.setAttribute("aria-hidden","false");
      if(document.activeElement?.closest(".fi92-card"))document.activeElement.blur();
      shell.inert=true;
      shell.setAttribute("aria-hidden","true");
      if(reduced.matches)modules[selected].focus({preventScroll:true});
      else window.setTimeout(()=>{
        if(current===key&&!caseOwned&&!sceneOwned)modules[selected].focus({preventScroll:true});
      },610);
    }
    function closeLevel(){
      if(caseOwned||sceneOwned)return;
      const old=current;
      current=null;
      hub.classList.remove("fi94-active");
      level.inert=true;
      level.setAttribute("aria-hidden","true");
      shell.inert=false;
      shell.removeAttribute("aria-hidden");
      if(old)originals[keys.indexOf(old)]?.focus({preventScroll:true});
    }
    // Capture is required: the original Webflow listeners remain attached
    // to these same anchors and should only run when explicitly bypassed.
    originals.forEach((anchor,i)=>{
      anchor.addEventListener("click",event=>{
        if(bypass)return;
        event.preventDefault();
        event.stopImmediatePropagation();
        enterLevel(keys[i]);
      },true);
    });
    // Original PATHS controls are optional shortcuts into a level; they
    // do not launch the old pages directly.
    keys.forEach((key,i)=>{
      hub.querySelectorAll('.fi92-card[data-fi92="'+key+'"] .fi92-path').forEach((path,j)=>{
        path.addEventListener("click",event=>{
          event.preventDefault();
          event.stopImmediatePropagation();
          enterLevel(key,j);
        },true);
      });
    });

    function openNative(key,i){
      const anchor=originals[keys.indexOf(key)];
      const scene=worlds[key];
      if(!anchor||!scene)return;
      sceneOwned=key;
      origin=key;
      shell.inert=false;
      hub.inert=false;
      bypass=true;
      try{anchor.click()}finally{bypass=false;shell.inert=true}
      if(!scene.classList.contains("is-active")){
        sceneOwned=null;origin=null;
        shell.inert=true;
        hub.inert=false;
        level.inert=false;
        return;
      }
      const value=catalogue[key].nodes[i].value;
      const selector={
        sound:'.sound-mood[data-mood="'+value+'"]',
        places:'.p14-choice[data-target="'+value+'"]',
        about:'.a17-mode[data-a17-mode="'+value+'"]'
      }[key];
      scene.querySelector(selector)?.click();
    }
    function openWork(i){
      if(caseOwned)return;
      caseOwned=true;origin="work";
      document.body.classList.add("fi93-case-route","fi94-case-route");
      shell.inert=false;
      hub.inert=false;
      bypass=true;
      try{originals[0].click()}finally{bypass=false;shell.inert=true}
      if(!work.classList.contains("is-active")){
        caseOwned=false;origin=null;
        document.body.classList.remove("fi93-case-route","fi94-case-route");
        return;
      }
      rowEls[i].focus({preventScroll:true});
      openButton.click();
      if(!caseWorld.classList.contains("is-active")){
        workBack.click();caseOwned=false;origin=null;
        document.body.classList.remove("fi93-case-route","fi94-case-route");
        restoreLevel();
      }
    }
    function openDestination(i){
      if(!current||caseOwned||sceneOwned)return;
      select(i);
      if(current==="work")openWork(i);
      else openNative(current,i);
    }
    function restoreLevel(){
      hub.inert=false;
      shell.inert=true;
      shell.setAttribute("aria-hidden","true");
      level.inert=false;
      level.setAttribute("aria-hidden","false");
      hub.classList.add("fi94-active");
      if(current)modules[selected]?.focus({preventScroll:true});
    }
    new MutationObserver(()=>{
      const opened=caseWorld.classList.contains("is-active");
      if(previousCase&&!opened&&caseOwned){
        caseOwned=false;origin=null;
        if(work.classList.contains("is-active"))workBack.click();
        document.body.classList.remove("fi93-case-route","fi94-case-route");
        restoreLevel();
      }
      previousCase=opened;
    }).observe(caseWorld,{attributes:true,attributeFilter:["class"]});

    Object.entries(worlds).forEach(([key,scene])=>{
      if(!scene)return;
      let previous=scene.classList.contains("is-active");
      new MutationObserver(()=>{
        const opened=scene.classList.contains("is-active");
        if(previous&&!opened&&sceneOwned===key){
          sceneOwned=null;origin=null;
          restoreLevel();
        }
        previous=opened;
      }).observe(scene,{attributes:true,attributeFilter:["class"]});
    });

    level.querySelector(".fi94-back").addEventListener("click",closeLevel);
    document.addEventListener("keydown",event=>{
      if(event.key!=="Escape"||!current||caseOwned||sceneOwned)return;
      event.preventDefault();
      event.stopImmediatePropagation();
      closeLevel();
    },true);

    hub.appendChild(level);
    hub.dataset.fi94Ready="1";
    hub.classList.add("fi93-ready","fi94-ready");
  }
  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();