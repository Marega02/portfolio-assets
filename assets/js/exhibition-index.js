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