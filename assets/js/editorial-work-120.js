/* PHASE 120 — WORK / LIVE PROTOTYPE LINKS
   One large featured project and two supporting stories, arranged as an
   asymmetric, responsive photographic portfolio. Red House and Soča open external Webflow prototypes in new tabs.
   Da Gianni retains its original native case-study navigation. Designed to
   scale naturally to more projects, without a rigid 3D carousel.
*/
(()=>{
function init(){
  const hub=document.querySelector(".world-hub.fi95-ready");
  const level=hub?.querySelector(".fi95-level");
  const cluster=level?.querySelector(".fi95-cluster");
  const originals=[...(cluster?.querySelectorAll(".fi95-item")||[])]
    .sort((a,b)=>Number(a.className.match(/fi95-item-(\d+)/)?.[1]??99)-
                 Number(b.className.match(/fi95-item-(\d+)/)?.[1]??99))
    .slice(0,3);
  if(!hub||!level||!cluster||originals.length!==3||hub.dataset.fi113WorkReady==="1")return;
  const photos=[
    "https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6af23552980d046ba8433a49_Work%20Editorial%20%E2%80%94%20Red%20House%20Salon.jpg",
    "https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6af229d8d2ed6dd493860312_Places%20HD%20Soca%20Valley%20%E2%80%94%201600px.jpeg",
    "https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6af235826d6fbe9b2e154fb5_Work%20Editorial%20%E2%80%94%20Da%20Gianni%20Hospitality.jpg"
  ];
  const screenshot="https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6ae398c6df2ad78c7ef6657d_Screenshot%202026-10-29%20at%2020-02-35%20Red%20House%20Studio%20Parrucchiere%20a%20Gorizia.png";
  const projects=[
    {title:"RED HOUSE STUDIO",category:"BRAND WEBSITE",number:"01",subtitle:"A fresh digital home for a modern hair studio.",year:"2026",alt:"Modern salon interior",primary:true,prototypeUrl:"https://hair-salone.webflow.io"},
    {title:"SOČA VALLEY",category:"DIGITAL STORYTELLING",number:"02",subtitle:"A visual journey through a place worth remembering.",year:"2026",alt:"Soca Valley river and landscape",prototypeUrl:"https://soca-valley.webflow.io"},
    {title:"DA GIANNI",category:"HOSPITALITY WEBSITE",number:"03",subtitle:"An inviting online presence for a local trattoria.",year:"2026",alt:"Warm restaurant interior"}
  ];
  const escape=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  let stage=null;
  function mount(){
    if(stage||level.dataset.category!=="work")return;
    stage=document.createElement("section");
    stage.className="fi113-work-stage";
    stage.setAttribute("aria-label","Selected web design projects");
    stage.innerHTML=
      '<div class="fi113-work-intro">'+
        '<span class="fi113-work-kicker"><i aria-hidden="true"></i> SELECTED WORK / PROTOTYPES & PROJECTS</span>'+
        '<p>Built with purpose.<br><em>Made to be explored.</em></p>'+
        '<span class="fi113-work-count">THREE STORIES · ONE PRACTICE</span>'+
      '</div>'+
      '<div class="fi113-work-gallery" role="group" aria-label="Open a project case study"></div>'+
      '<div class="fi113-work-bottom">'+
        '<span>DESIGN / DEVELOPMENT / DIGITAL EXPERIENCE</span>'+
        '<span>RED HOUSE & SOČA ARE WEBFLOW PROTOTYPES <b aria-hidden="true">↗</b></span>'+
      '</div>';
    const gallery=stage.querySelector(".fi113-work-gallery");
    projects.forEach((data,i)=>{
      const card=document.createElement(data.prototypeUrl?"a":"button");
      if(data.prototypeUrl){
        card.href=data.prototypeUrl;
        card.target="_blank";
        card.rel="noopener noreferrer";
      }else{
        card.type="button";
      }
      card.className="fi113-project fi113-project-"+i+
        (data.primary?" fi113-project-featured":"")+
        (data.prototypeUrl?" fi120-prototype":"");
      card.setAttribute("aria-label",
        data.prototypeUrl?"Open the Webflow prototype "+data.title+" in a new tab":"Explore project "+data.title);
      card.innerHTML=
        '<span class="fi113-project-photo">'+
          '<img alt="" decoding="async" loading="eager" src="'+escape(photos[i])+'">'+
          (i===0?'<span class="fi113-project-browser" aria-hidden="true">'+
            '<span class="fi113-browser-top"><i></i><i></i><i></i><b>PROJECT PREVIEW</b></span>'+
            '<img alt="" decoding="async" loading="lazy" src="'+escape(screenshot)+'">'+
          '</span>':"")+
        '</span>'+
        '<span class="fi113-project-shade" aria-hidden="true"></span>'+
        (data.prototypeUrl?'<span class="fi120-prototype-badge" aria-hidden="true">PROTOTYPE <i>↗</i></span>':"")+
        '<span class="fi113-project-overline"><span>'+escape(data.number)+' / 03</span><span>'+escape(data.year)+'</span></span>'+
        '<span class="fi113-project-caption">'+
          '<span class="fi113-project-category">'+escape(data.category)+(data.prototypeUrl?" · DEMO PROTOTYPE":"")+'</span>'+
          '<strong>'+escape(data.title)+'</strong>'+
          '<small>'+escape(data.subtitle)+'</small>'+
        '</span>'+
        '<span class="fi113-project-arrow" aria-hidden="true">↗</span>';
      if(!data.prototypeUrl){
        card.addEventListener("click",()=>{
          if(level.dataset.category==="work")originals[i]?.click();
        });
      }
      gallery.appendChild(card);
    });
    cluster.appendChild(stage);
    cluster.classList.add("fi113-cluster-on");
    level.classList.add("fi113-work-on");
    const sign=level.querySelector(".fi95-level-sign");
    if(sign)sign.textContent="THE PROJECT ARCHIVE";
    const caption=level.querySelector(".fi95-level-caption");
    if(caption)caption.textContent="WEBSITES, STORIES & DIGITAL SPACES";
    const footer=level.querySelector(".fi95-level-foot span:first-child");
    if(footer)footer.textContent="SELECTED WORK / THREE PROJECTS";
  }
  function unmount(){
    if(!stage)return;
    stage.remove();stage=null;
    cluster.classList.remove("fi113-cluster-on");
    level.classList.remove("fi113-work-on");
  }
  new MutationObserver(()=>{
    if(level.dataset.category==="work")mount();
    else unmount();
  }).observe(level,{attributes:true,attributeFilter:["data-category"]});
  hub.dataset.fi113WorkReady="1";
  if(level.dataset.category==="work")mount();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
else init();
})();