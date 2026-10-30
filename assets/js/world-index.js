/* STEP 19 — WORLD INDEX; no modifications to worlds */
(() => {
  function setup() {
    const root=document.querySelector(".w19-root"),hub=document.querySelector(".world-hub");
    if(!root||!hub||root.dataset.w19Ready==="true")return;
    const trigger=root.querySelector(".w19-trigger"),drawer=root.querySelector(".w19-drawer"),backdrop=root.querySelector(".w19-backdrop"),close=root.querySelector(".w19-close");
    const links=[...root.querySelectorAll(".w19-link")],worldLinks=[...hub.querySelectorAll(".world-link")];
    if(!trigger||!drawer||!backdrop||!close||links.length!==4||worldLinks.length<4)return;
    root.dataset.w19Ready="true";let open=false,restoreInert=null,navigationPending=false;
    const isVisible=(selector,activeClass)=>Boolean(document.querySelector(selector)?.classList.contains(activeClass));
    const activeWorld=()=>{
      if(isVisible(".case-world","is-active")||isVisible(".work-world","is-active"))return "work";
      if(isVisible(".sound-world","is-active"))return "sound";
      if(isVisible(".p14-world","is-active"))return "places";
      if(isVisible(".a17-world","is-active"))return "about";
      return "hub";
    };
    const sceneForLock=()=>{
      if(isVisible(".case-world","is-active"))return document.querySelector(".case-world");
      if(isVisible(".sound-archive","is-open"))return document.querySelector(".sound-archive");
      if(isVisible(".p15-journal","is-open"))return document.querySelector(".p15-journal");
      const key=activeWorld();
      return key==="work"?document.querySelector(".work-world"):key==="sound"?document.querySelector(".sound-world"):key==="places"?document.querySelector(".p14-world"):key==="about"?document.querySelector(".a17-world"):hub;
    };
    function show(){
      if(open||navigationPending)return;
      open=true;const current=activeWorld();
      links.forEach(link=>{const active=link.dataset.w19Target===current;link.classList.toggle("is-current",active);link.setAttribute("aria-current",active?"page":"false")});
      const scene=sceneForLock();
      if(scene){restoreInert={scene,wasInert:scene.inert};scene.inert=true;}
      root.classList.add("is-open");drawer.inert=false;drawer.setAttribute("aria-hidden","false");trigger.setAttribute("aria-expanded","true");
      close.focus({preventScroll:true});
    }
    function hide(){
      if(!open)return;
      open=false;root.classList.remove("is-open");drawer.inert=true;drawer.setAttribute("aria-hidden","true");trigger.setAttribute("aria-expanded","false");
      if(restoreInert){restoreInert.scene.inert=restoreInert.wasInert;restoreInert=null;}
      trigger.focus({preventScroll:true});
    }
    function clickBack(selector){const el=document.querySelector(selector);if(el)el.click();}
    function exitCurrent(){
      if(isVisible(".case-world","is-active"))clickBack(".case-world .case-back");
      if(isVisible(".sound-archive","is-open"))clickBack(".sound-archive .sa-back");
      if(isVisible(".p15-journal","is-open"))clickBack(".p15-journal .p15-close");
      if(isVisible(".work-world","is-active"))clickBack(".work-world .work-back");
      else if(isVisible(".sound-world","is-active"))clickBack(".sound-world .sound-back");
      else if(isVisible(".p14-world","is-active"))clickBack(".p14-world .p14-back");
      else if(isVisible(".a17-world","is-active"))clickBack(".a17-world .a17-back");
    }
    function navigate(target){
      if(navigationPending)return;
      const map={work:0,sound:1,places:2,about:3};
      if(!(target in map))return;
      const current=activeWorld();
      hide();
      if(current===target)return;
      const next=worldLinks[map[target]];if(!next)return;
      navigationPending=true;
      if(current!=="hub")exitCurrent();
      const reduced=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      const delay=current==="hub"||reduced?0:1060;
      window.setTimeout(()=>{
        navigationPending=false;
        if(hub.inert)return;
        next.click();
      },delay);
    }
    trigger.addEventListener("click",show);
    close.addEventListener("click",hide);
    backdrop.addEventListener("click",hide);
    links.forEach(link=>link.addEventListener("click",()=>navigate(link.dataset.w19Target)));
    window.addEventListener("keydown",event=>{
      if(!open)return;
      if(event.key==="Escape"){event.preventDefault();event.stopImmediatePropagation();hide();return;}
      if(event.key!=="Tab")return;
      const focusables=[...drawer.querySelectorAll("button:not([disabled]),a[href],input:not([disabled]),[tabindex]:not([tabindex='-1'])")].filter(el=>el.getClientRects().length>0);
      if(!focusables.length)return;
      const first=focusables[0],last=focusables[focusables.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    },true);
    drawer.inert=true;drawer.setAttribute("aria-hidden","true");
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",setup,{once:true});
  else setup();
})();