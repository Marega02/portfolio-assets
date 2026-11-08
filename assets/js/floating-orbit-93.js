/* PHASE 93 — FLOATING LEAVES / WORK ORBIT
   A composited CSS 3D Home and one below-ground Work level.
   Navigation reuses the original Webflow link + project case-study engine.
   No render loop, no scroll listeners, no WebGL or heavy animation library.
*/
(() => {
  function init(){
    const hub=document.querySelector(".world-hub.fi92-ready");
    const shell=hub?.querySelector(".fi92-shell");
    const workLink=hub?.querySelector('.fi92-card[data-fi92="work"] .world-link');
    const work=document.querySelector(".work-world");
    const caseWorld=document.querySelector(".case-world");
    const openButton=work?.querySelector(".case-open");
    const oldBack=work?.querySelector(".work-back");
    const workRows=[...(work?.querySelectorAll(".work-project")||[])];
    if(!hub||!shell||!workLink||!work||!caseWorld||!openButton||!oldBack||
       workRows.length!==3||hub.dataset.fi93Ready==="1")return;

    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
    const projects=[
      {
        id:"redhouse",name:"RED HOUSE STUDIO",subtitle:"Web design / Brand experience",
        number:"01",size:"primary",tag:"DESIGN / 2026",
        src:"https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6ae398c6df2ad78c7ef6657d_Screenshot%202026-10-29%20at%2020-02-35%20Red%20House%20Studio%20Parrucchiere%20a%20Gorizia-p-800.png"
      },
      {
        id:"soca",name:"SOČA VALLEY",subtitle:"Digital storytelling / Nature",
        number:"02",size:"medium",tag:"PLACES / 2026",
        src:"https://images.pexels.com/photos/8920813/pexels-photo-8920813.jpeg?auto=compress&cs=tinysrgb&w=900"
      },
      {
        id:"gianni",name:"DA GIANNI",subtitle:"Web design / Hospitality",
        number:"03",size:"small",tag:"HOSPITALITY / 2026",
        src:"https://images.pexels.com/photos/37305714/pexels-photo-37305714.jpeg?auto=compress&cs=tinysrgb&w=900"
      }
    ];
    const level=document.createElement("section");
    level.className="fi93-work-level";
    level.id="work-orbit";
    level.setAttribute("aria-label","Work — select a project");
    level.setAttribute("aria-hidden","true");
    level.inert=true;
    level.innerHTML=
      '<header class="fi93-top">'+
        '<button class="fi93-return" type="button"><span aria-hidden="true">↑</span> BACK TO INDEX</button>'+
        '<span class="fi93-location">LM / LOWER LEVEL 01 <span aria-hidden="true">●</span> THE WORK</span>'+
      '</header>'+
      '<div class="fi93-headline">'+
        '<p class="fi93-eyebrow">01 / SELECTED DIGITAL EXPERIENCES</p>'+
        '<h2>Choose a <em>direction.</em></h2>'+
        '<p class="fi93-lede">Three projects, three different worlds. Select one to enter.</p>'+
      '</div>'+
      '<div class="fi93-orbit" role="group" aria-label="Three selected projects">'+
        '<span class="fi93-orbit-axis" aria-hidden="true"></span>'+
        '<span class="fi93-orbit-centre" aria-hidden="true">THE WORK / 03</span>'+
      '</div>'+
      '<footer class="fi93-foot">'+
        '<span>STUDIO NOTES / 2026</span>'+
        '<span>THREE PROJECTS IN ORBIT <i>✳</i> ONE AT A TIME</span>'+
      '</footer>';
    const orbit=level.querySelector(".fi93-orbit");
    const nodes=[];
    let selected=0;
    let bypassWork=false;
    let orbitOwned=false;
    let wasCaseOpen=caseWorld.classList.contains("is-active");

    projects.forEach((item,i)=>{
      const button=document.createElement("button");
      button.type="button";
      button.className="fi93-node fi93-"+item.size;
      button.dataset.project=item.id;
      button.setAttribute("aria-label","Open case study: "+item.name);
      button.innerHTML=
        '<span class="fi93-image-frame">'+
          '<span class="fi93-image-shade"></span>'+
          '<span class="fi93-photo-index">'+item.number+' / 03</span>'+
        '</span>'+
        '<span class="fi93-node-info">'+
          '<span class="fi93-node-tag">'+item.tag+'</span>'+
          '<strong>'+item.name+'</strong>'+
          '<span class="fi93-node-sub">'+item.subtitle+'</span>'+
        '</span>'+
        '<span class="fi93-node-open" aria-hidden="true">↗</span>';
      const frame=button.querySelector(".fi93-image-frame");
      const image=document.createElement("img");
      image.className="fi93-photo";
      image.alt=item.name+" — preview";
      image.src=item.src;
      image.loading="lazy";
      image.decoding="async";
      image.onerror=()=>{
        const original=work.querySelectorAll(".preview-visual .preview-image")[i];
        if(original && original.src && original.src!==image.src){
          image.onerror=null;
          image.src=original.src;
        }
      };
      frame.prepend(image);
      button.addEventListener("mouseenter",()=>highlight(i));
      button.addEventListener("focus",()=>highlight(i));
      button.addEventListener("click",()=>enterProject(i));
      orbit.appendChild(button);
      nodes.push(button);
    });
    if(nodes.length!==3)return;

    function highlight(i){
      if(i<0||i>=nodes.length)return;
      selected=i;
      level.dataset.selected=projects[i].id;
      nodes.forEach((node,j)=>node.classList.toggle("fi93-selected",j===i));
    }
    function openLevel(index=0){
      if(caseWorld.classList.contains("is-active"))return;
      highlight(index);
      hub.classList.add("fi93-work-active");
      shell.inert=true;
      shell.setAttribute("aria-hidden","true");
      level.inert=false;
      level.setAttribute("aria-hidden","false");
      level.querySelectorAll("img").forEach(img=>{img.loading="eager"});
      // A single short transform transition creates the elevator effect.
      if(document.activeElement?.closest(".fi92-card")){
        document.activeElement.blur?.();
      }
      if(reduced.matches)nodes[index].focus({preventScroll:true});
      else window.setTimeout(()=>{
        if(hub.classList.contains("fi93-work-active")&&!orbitOwned)
          nodes[index].focus({preventScroll:true});
      },560);
    }
    function closeLevel(){
      if(caseWorld.classList.contains("is-active"))return;
      hub.classList.remove("fi93-work-active");
      level.inert=true;
      level.setAttribute("aria-hidden","true");
      shell.inert=false;
      shell.removeAttribute("aria-hidden");
      workLink.focus({preventScroll:true});
    }

    // Original Work link can still be invoked internally to open its
    // battle-tested case-study engine. Outside that narrow bypass it now
    // ALWAYS enters the new orbital floor.
    workLink.addEventListener("click",event=>{
      if(bypassWork)return;
      event.preventDefault();
      event.stopImmediatePropagation();
      openLevel(0);
    },true);

    // A Work subcategory on Home goes to its location in the orbit;
    // it no longer opens the old Work landing or triggers its animations.
    const oldPaths=[...hub.querySelectorAll('.fi92-card[data-fi92="work"] .fi92-path')];
    oldPaths.forEach((button,i)=>{
      button.addEventListener("click",event=>{
        event.preventDefault();
        event.stopImmediatePropagation();
        openLevel(i);
      },true);
    });

    function enterProject(index){
      if(!hub.classList.contains("fi93-work-active")||orbitOwned)return;
      const row=workRows[index];
      if(!row)return;
      highlight(index);
      orbitOwned=true;
      document.body.classList.add("fi93-case-route");
      // The Home and its orbit live in the hub. The existing case study
      // is a separate fixed scene, so we only reuse its original handlers.
      shell.inert=false;
      bypassWork=true;
      try{
        workLink.click();
      }finally{
        bypassWork=false;
        shell.inert=true;
      }
      if(!work.classList.contains("is-active")){
        orbitOwned=false;
        document.body.classList.remove("fi93-case-route");
        return;
      }
      // Focusing the existing row selects the correct project and image.
      // The original direct-navigation module subscribes to this event.
      row.focus({preventScroll:true});
      openButton.click();
      if(!caseWorld.classList.contains("is-active")){
        oldBack.click();
        orbitOwned=false;
        document.body.classList.remove("fi93-case-route");
        hub.inert=false;
        level.inert=false;
        level.setAttribute("aria-hidden","false");
        nodes[index].focus({preventScroll:true});
      }
    }

    // Returning from any case study takes the viewer back to the orbit,
    // not the old Work gallery. This observer fires only on state changes.
    const caseObserver=new MutationObserver(()=>{
      const isOpen=caseWorld.classList.contains("is-active");
      if(wasCaseOpen&&!isOpen&&orbitOwned){
        orbitOwned=false;
        if(work.classList.contains("is-active"))oldBack.click();
        hub.inert=false;
        document.body.classList.remove("fi93-case-route");
        shell.inert=true;
        level.inert=false;
        level.setAttribute("aria-hidden","false");
        hub.classList.add("fi93-work-active");
        nodes[selected]?.focus({preventScroll:true});
      }
      wasCaseOpen=isOpen;
    });
    caseObserver.observe(caseWorld,{attributes:true,attributeFilter:["class"]});

    level.querySelector(".fi93-return").addEventListener("click",closeLevel);
    document.addEventListener("keydown",event=>{
      if(event.key!=="Escape"||!hub.classList.contains("fi93-work-active"))return;
      if(caseWorld.classList.contains("is-active")||work.classList.contains("is-active"))return;
      event.preventDefault();
      closeLevel();
    },true);

    hub.appendChild(level);
    highlight(0);
    hub.dataset.fi93Ready="1";
    hub.classList.add("fi93-ready");
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();