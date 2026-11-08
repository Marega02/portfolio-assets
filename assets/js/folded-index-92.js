/* PHASE 92 — FOLDED INDEX. One Home, four native Webflow links.
   No GSAP, scroll listener, mutation observer, requestAnimationFrame loop,
   SVG scene engine, background video or external artwork. */
(() => {
  function init() {
    const hub=document.querySelector(".world-hub");
    const source=hub?.querySelector(".world-links");
    const links=[...(source?.children||[])].filter(el=>el.classList.contains("world-link"));
    const keys=["work","sound","places","about"];
    if(!hub||!source||links.length!==4||hub.dataset.fi92Ready==="1"||
       !document.querySelector(".work-world")||
       !document.querySelector(".sound-world")||
       !document.querySelector(".p14-world")||
       !document.querySelector(".a17-world"))return;
    const items={
      work:{
        kicker:"01 / CREATE",descriptor:"Websites with a point of view.",
        paths:[["Red House","redhouse"],["Soča Valley","soca"],["Da Gianni","gianni"]]
      },
      sound:{
        kicker:"02 / LISTEN",descriptor:"The records that stay.",
        paths:[["Soul","soul"],["Hip-hop","hiphop"],["Alternative","alternative"]]
      },
      places:{
        kicker:"03 / EXPLORE",descriptor:"Places, people, perspective.",
        paths:[["Soča Valley","soca"],["London","london"],["Kuala Lumpur","kl"]]
      },
      about:{
        kicker:"04 / DISCOVER",descriptor:"The person behind the pixels.",
        paths:[["Make","make"],["Listen","listen"],["Wander","wander"]]
      }
    };
    const shell=document.createElement("div");
    shell.className="fi92-shell";
    shell.innerHTML=
      '<header class="fi92-top">'+
        '<a class="fi92-brand" href="#" aria-label="Home — Luca Marega">LM<span> / </span>LUCA MAREGA</a>'+
        '<span class="fi92-edition">INDEPENDENT DESIGNER <i></i> PERSONAL INDEX / 2026</span>'+
      '</header>'+
      '<div class="fi92-intro">'+
        '<div class="fi92-intro-mark">AN OPEN INDEX <span>—</span> FOUR DIRECTIONS</div>'+
        '<h1 class="fi92-heading">A collection of<br><em>curiosities.</em></h1>'+
        '<p class="fi92-subheading">Make something. Find a feeling. Go somewhere.<br>Choose a chapter to begin.</p>'+
      '</div>'+
      '<main class="fi92-stack" aria-label="Explore the four chapters"></main>'+
      '<footer class="fi92-footer">'+
        '<span>FOUR CHAPTERS / ONE CREATIVE WORLD</span>'+
        '<span>HOVER TO UNFOLD <b>·</b> CLICK TO ENTER</span>'+
      '</footer>';
    const stack=shell.querySelector(".fi92-stack");
    const cards=[];
    const byKey={};
    const touch=window.matchMedia("(hover: none), (pointer: coarse)");
    let openCard=null;
    function setOpen(card,show) {
      if(show&&openCard&&openCard!==card)setOpen(openCard,false);
      card.classList.toggle("fi92-open",show);
      const toggle=card.querySelector(".fi92-path-toggle");
      toggle.setAttribute("aria-expanded",String(show));
      card.querySelectorAll(".fi92-path").forEach(el=>el.tabIndex=show?0:-1);
      if(show)openCard=card;
      else if(openCard===card)openCard=null;
    }
    function enterPath(key,target){
      const card=byKey[key];
      if(!card||hub.inert)return;
      const link=card.querySelector(".world-link");
      if(!link)return;
      link.click();
      // The original chapter controller still owns opening and focus.
      // Selection merely prepares an actual available subcategory.
      window.setTimeout(()=>{
        if(key==="work"){
          const scene=document.querySelector(".work-world.is-active");
          const index=items.work.paths.findIndex(p=>p[1]===target);
          const row=scene?.querySelectorAll(".work-project")[index];
          row?.dispatchEvent(new Event("mouseenter"));
          row?.focus({preventScroll:true});
        }else if(key==="sound"){
          document.querySelector('.sound-world.is-active .sound-mood[data-mood="'+target+'"]')?.click();
        }else if(key==="places"){
          document.querySelector('.p14-world.is-active .p14-choice[data-target="'+target+'"]')?.click();
        }else if(key==="about"){
          document.querySelector('.a17-world.is-active .a17-mode[data-a17-mode="'+target+'"]')?.click();
        }
      },80);
    }
    keys.forEach((key,i)=>{
      const data=items[key];
      const card=document.createElement("article");
      card.className="fi92-card";
      card.dataset.fi92=key;
      card.setAttribute("aria-label",key.toUpperCase()+" — "+data.descriptor);
      card.innerHTML=
        '<div class="fi92-card-meta"><span>0'+(i+1)+'</span><span>'+data.kicker+'</span></div>'+
        '<div class="fi92-art" aria-hidden="true">'+
          '<span class="fi92-art-circle"></span><span class="fi92-art-rule"></span>'+
          '<span class="fi92-art-square"></span><span class="fi92-art-point"></span>'+
        '</div>'+
        '<div class="fi92-card-copy"><p class="fi92-card-claim">'+data.descriptor+'</p></div>'+
        '<button class="fi92-path-toggle" type="button" aria-expanded="false" aria-label="Show '+key+' subcategories">PATHS <span>+</span></button>'+
        '<div class="fi92-paths" aria-label="'+key+' subcategories"></div>'+
        '<span class="fi92-card-corner" aria-hidden="true">↗</span>';
      const link=links[i];
      const name=link.querySelector(".world-name")?.textContent?.trim()?.toUpperCase();
      if(name!==key.toUpperCase())return;
      link.setAttribute("aria-label","Enter "+key);
      link.querySelector(".world-description")?.setAttribute("aria-hidden","true");
      card.querySelector(".fi92-card-copy").appendChild(link);
      const fan=card.querySelector(".fi92-paths");
      data.paths.forEach(([label,value],n)=>{
        const btn=document.createElement("button");
        btn.type="button";
        btn.className="fi92-path";
        btn.tabIndex=-1;
        btn.dataset.order=String(n+1);
        btn.textContent=label;
        btn.addEventListener("click",e=>{
          e.preventDefault();e.stopPropagation();enterPath(key,value);
        });
        fan.appendChild(btn);
      });
      const toggle=card.querySelector(".fi92-path-toggle");
      toggle.addEventListener("click",e=>{
        e.stopPropagation();
        setOpen(card,!card.classList.contains("fi92-open"));
      });
      card.addEventListener("pointerenter",()=>{
        if(!touch.matches)setOpen(card,true);
      });
      card.addEventListener("pointerleave",()=>{
        if(!touch.matches&&!card.contains(document.activeElement))setOpen(card,false);
      });
      card.addEventListener("focusin",()=>setOpen(card,true));
      card.addEventListener("focusout",()=>{
        // A focus leaving the card should close only its local chapter fan.
        window.setTimeout(()=>{
          if(!card.contains(document.activeElement)&&!card.matches(":hover"))setOpen(card,false);
        },0);
      });
      card.addEventListener("click",event=>{
        if(event.target.closest("a,button"))return;
        link.click();
      });
      stack.appendChild(card);
      cards.push(card);
      byKey[key]=card;
    });
    if(cards.length!==4||stack.querySelectorAll(".world-link").length!==4)return;
    shell.querySelector(".fi92-brand").addEventListener("click",event=>{
      event.preventDefault();
      if(openCard)setOpen(openCard,false);
    });
    hub.appendChild(shell);
    hub.dataset.fi92Ready="1";
    hub.classList.add("fi92-ready");
    document.documentElement.classList.add("fi92-installed");
    if(touch.matches){
      const hint=shell.querySelector(".fi92-footer span:last-child");
      if(hint)hint.textContent="TAP A CHAPTER TO ENTER / PATHS FOR MORE";
    }
  }
  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();