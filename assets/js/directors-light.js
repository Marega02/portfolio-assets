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