/* PHASE 113 — WORK EDITORIAL EXHIBITION / HOME PROJECT COVER
   Three real case studies in a scalable magazine-style index:
   a large live preview on the left and selectable project rows on
   the right. Click any row or the preview to open the original,
   unchanged Webflow project case. No fabricated projects.
   Homepage Work card shows actual portfolio screenshots layered as
   mini browser windows instead of one badly cropped full-size image.
   The old bottom-right World Index control is permanently disabled.
*/
(()=>{
  function init(){
    const hub=document.querySelector(".world-hub.fi95-ready");
    const level=hub?.querySelector(".fi95-level");
    const cluster=level?.querySelector(".fi95-cluster");
    if(!hub||!level||!cluster||hub.dataset.fi113Ready==="1")return;
    const original=[...cluster.querySelectorAll(":scope > .fi95-item")]
      .sort((a,b)=>{
        const index=el=>Number(el.className.match(/fi95-item-(\d+)/)?.[1]??99);
        return index(a)-index(b);
      }).slice(0,3);
    if(original.length!==3)return;

    const redHouse="https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6ae398c6df2ad78c7ef6657d_Screenshot%202026-10-29%20at%2020-02-35%20Red%20House%20Studio%20Parrucchiere%20a%20Gorizia.png";
    const soca="https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6af229d8d2ed6dd493860312_Places%20HD%20Soca%20Valley%20%E2%80%94%201600px.jpeg";
    const gianni="https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6ae398f739bfc63e8a3bffd1_ChatGPT%20Image%20Aug%2025%2C%202026%2C%2006_41_05%20PM.png";
    const projects=[
      {name:"RED HOUSE STUDIO",type:"WEB DESIGN / BRAND EXPERIENCE",
        note:"A confident digital identity for a creative salon.",
        src:redHouse,mode:"website",accent:"#a88774",number:"01",small:"WEB / CLIENT"},
      {name:"SOČA VALLEY",type:"IMMERSIVE STORYTELLING",
        note:"A visual journey through a landscape that stays with you.",
        src:soca,mode:"landscape",accent:"#9bb4a4",number:"02",small:"EXPERIENCE / CONCEPT"},
      {name:"DA GIANNI",type:"HOSPITALITY / DIGITAL PRESENCE",
        note:"A warm, inviting web experience for a local trattoria.",
        src:gianni,mode:"website",accent:"#d8a275",number:"03",small:"WEB / CLIENT"}
    ];

    const oldIndex=document.querySelector(".w19-root");
    if(oldIndex){
      oldIndex.hidden=true;
      oldIndex.inert=true;
      oldIndex.setAttribute("aria-hidden","true");
    }

    // A dedicated creative Work cover using previews of the ACTUAL work.
    const workHome=hub.querySelector('.fi95-home .fi95-panel[data-category="work"]');
    const photoWrap=workHome?.querySelector(".fi95-photo-wrap");
    if(photoWrap&&!workHome.classList.contains("fi113-cover-ready")){
      const art=document.createElement("div");
      art.className="fi113-work-cover";
      art.setAttribute("aria-hidden","true");
      art.innerHTML=
        '<div class="fi113-home-browser fi113-home-browser-main">'+
          '<span class="fi113-browser-chrome"><i></i><i></i><i></i></span>'+
          '<img alt="" decoding="async" src="'+redHouse+'">'+
        '</div>'+
        '<div class="fi113-home-browser fi113-home-browser-back">'+
          '<img alt="" decoding="async" src="'+soca+'">'+
        '</div>'+
        '<span class="fi113-home-graphic-stamp">DESIGNED TO FEEL DIFFERENT</span>';
      photoWrap.appendChild(art);
      workHome.classList.add("fi113-cover-ready");
    }

    let stage=null,selected=0;
    const sign=level.querySelector(".fi95-level-sign");
    const oldSign=sign?.textContent||"";
    function safeText(tag,klass,content){
      const el=document.createElement(tag);
      el.className=klass;
      el.textContent=content;
      return el;
    }
    function switchTo(i){
      if(!stage)return;
      selected=Math.max(0,Math.min(projects.length-1,i));
      stage.querySelectorAll(".fi113-work-shot").forEach((el,index)=>{
        el.classList.toggle("is-selected",index===selected);
        el.setAttribute("aria-hidden",index===selected?"false":"true");
      });
      stage.querySelectorAll(".fi113-work-item").forEach((el,index)=>{
        const on=index===selected;
        el.classList.toggle("is-selected",on);
        el.setAttribute("aria-current",on?"true":"false");
      });
      const counter=stage.querySelector(".fi113-work-counter");
      if(counter)counter.textContent=String(selected+1).padStart(2,"0")+" / 0"+projects.length;
      const identity=stage.querySelector(".fi113-work-identity");
      if(identity)identity.textContent=projects[selected].name;
      const title=stage.querySelector(".fi113-work-description");
      if(title)title.textContent=projects[selected].note;
      const number=level.querySelector(".fi95-selection-count");
      if(number)number.textContent=String(selected+1).padStart(2,"0")+" / 0"+projects.length;
    }
    function open(i){
      if(!stage||level.dataset.category!=="work")return;
      selected=i;
      original[i]?.click(); // Existing case-study navigation, not a new URL.
    }
    function build(){
      const section=document.createElement("div");
      section.className="fi113-work-stage";
      section.setAttribute("role","region");
      section.setAttribute("aria-label","Selected projects. Hover a project to preview; click to explore.");
      const gallery=document.createElement("div");
      gallery.className="fi113-work-feature";
      const backdrop=document.createElement("div");
      backdrop.className="fi113-work-feature-glow";
      backdrop.setAttribute("aria-hidden","true");
      const frames=document.createElement("div");
      frames.className="fi113-work-previews";
      projects.forEach((project,i)=>{
        const shot=document.createElement("div");
        shot.className="fi113-work-shot fi113-work-shot-"+i+" "+(project.mode==="landscape"?"is-landscape":"is-website");
        const chrome=document.createElement("div");
        chrome.className="fi113-preview-chrome";
        chrome.innerHTML="<span><i></i><i></i><i></i></span><span>PROJECT / "+project.number+"</span>";
        const image=document.createElement("img");
        image.alt="";
        image.src=project.src;
        image.decoding="async";
        image.loading="eager";
        image.onerror=()=>{
          shot.classList.add("is-image-fallback");
          if(project.mode==="website"&&image.dataset.tried!=="1"){
            image.dataset.tried="1";
            image.src=soca;
          }
        };
        shot.append(chrome,image);
        frames.appendChild(shot);
      });
      const indexLine=document.createElement("div");
      indexLine.className="fi113-work-preview-footer";
      indexLine.append(
        safeText("span","fi113-work-identity","RED HOUSE STUDIO"),
        safeText("span","fi113-work-counter","01 / 03")
      );
      const openPreview=document.createElement("button");
      openPreview.type="button";
      openPreview.className="fi113-open-preview";
      openPreview.setAttribute("aria-label","Open selected project");
      openPreview.textContent="VIEW PROJECT ↗";
      openPreview.addEventListener("click",()=>open(selected));
      gallery.append(backdrop,frames,indexLine,openPreview);

      const aside=document.createElement("aside");
      aside.className="fi113-work-aside";
      aside.appendChild(safeText("span","fi113-work-eyebrow","CURATED PROJECTS / 2026"));
      aside.appendChild(safeText("h3","fi113-work-aside-heading","DIGITAL WORK.\nHUMAN STORIES."));
      aside.appendChild(safeText("p","fi113-work-intro",
        "A selection of digital experiences built around people, places and identities."));

      const list=document.createElement("div");
      list.className="fi113-work-list";
      list.setAttribute("role","group");
      list.setAttribute("aria-label","Choose one of the portfolio projects");
      projects.forEach((project,i)=>{
        const button=document.createElement("button");
        button.type="button";
        button.className="fi113-work-item";
        button.setAttribute("aria-label","Open "+project.name);
        button.append(
          safeText("span","fi113-work-item-no",project.number),
          safeText("span","fi113-work-item-body",project.name)
        );
        const info=document.createElement("span");
        info.className="fi113-work-item-meta";
        info.append(
          safeText("span","fi113-work-item-kind",project.type),
          safeText("span","fi113-work-item-arrow","↗")
        );
        button.appendChild(info);
        button.addEventListener("mouseenter",()=>switchTo(i));
        button.addEventListener("focus",()=>switchTo(i));
        button.addEventListener("click",()=>open(i));
        list.appendChild(button);
      });
      const description=document.createElement("p");
      description.className="fi113-work-description";
      description.textContent=projects[0].note;
      const help=document.createElement("div");
      help.className="fi113-work-help";
      help.textContent="HOVER TO PREVIEW  ·  CLICK TO EXPLORE";
      aside.append(list,description,help);

      section.append(gallery,aside);
      section.addEventListener("keydown",event=>{
        const current=stage?.querySelector(".fi113-work-item:focus");
        if(!current)return;
        const rows=[...stage.querySelectorAll(".fi113-work-item")];
        const index=rows.indexOf(current);
        if(event.key==="ArrowDown"||event.key==="ArrowRight"){
          event.preventDefault();rows[(index+1)%rows.length].focus();
        }else if(event.key==="ArrowUp"||event.key==="ArrowLeft"){
          event.preventDefault();rows[(index+rows.length-1)%rows.length].focus();
        }
      });
      return section;
    }
    function mount(){
      if(stage||level.dataset.category!=="work")return;
      stage=build();
      cluster.appendChild(stage);
      level.classList.add("fi113-work-on");
      if(sign)sign.textContent="STORIES MADE DIGITAL";
      const footer=level.querySelector(".fi95-level-foot span:first-child");
      if(footer)footer.textContent="SELECTED PROJECTS / EXPLORE THE COLLECTION";
      switchTo(selected);
    }
    function unmount(){
      if(!stage)return;
      stage.remove();stage=null;
      level.classList.remove("fi113-work-on");
      if(sign)sign.textContent=oldSign;
    }
    new MutationObserver(()=>{
      if(level.dataset.category==="work")mount();
      else unmount();
    }).observe(level,{attributes:true,attributeFilter:["data-category"]});
    hub.dataset.fi113Ready="1";
    if(level.dataset.category==="work")mount();
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();