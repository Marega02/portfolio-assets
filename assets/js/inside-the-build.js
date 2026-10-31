/* STEP 30 — INSIDE THE BUILD
   Case-study proof of craft. Uses descriptive project information only.
   No invented analytics, client quotes, live-site URLs or API requests.
   Does not modify existing images, navigation, GSAP or scroll handlers.
*/
(() => {
  const data={
    redhouse:{
      n:"01",short:"RH.",name:"RED HOUSE STUDIO",type:"WEB DESIGN / WEBFLOW",
      views:{
        brief:{
          eyebrow:"01 / THE PURPOSE",title:"Give the brand its own voice.",
          body:"The aim was to present a contemporary hair studio with personality, while making the services, team, product selection and booking path easy to discover.",
          tags:["Distinctive identity","Clear service discovery","Booking-oriented navigation"]
        },
        build:{
          eyebrow:"02 / THE APPROACH",title:"An expressive yet usable website.",
          body:"Built in Webflow with responsive page layouts, dedicated service and product presentations, team profiles, custom interactions and carefully paced motion.",
          tags:["Webflow","Responsive layouts","Custom interactions"]
        },
        result:{
          eyebrow:"03 / THE OUTPUT",title:"A cohesive digital presence.",
          body:"A multi-section website experience connecting the studio's character with practical visitor journeys. The portfolio demonstrates the design and build; commercial performance has not been measured here.",
          tags:["Brand presentation","Product showcase","Functional calls to action"]
        }
      }
    },
    soca:{
      n:"02",short:"SV.",name:"SOČA VALLEY",type:"VISUAL STORYTELLING / WEBFLOW",
      views:{
        brief:{
          eyebrow:"01 / THE PURPOSE",title:"Make the landscape feel alive.",
          body:"Explore how a digital experience can capture the atmosphere of the Soča Valley through imagery, motion and editorial storytelling rather than a conventional travel layout.",
          tags:["Atmosphere","Place-based storytelling","Visual exploration"]
        },
        build:{
          eyebrow:"02 / THE APPROACH",title:"A journey guided by movement.",
          body:"Designed and built in Webflow with large-scale landscape visuals, video-based moments, carefully structured typography, scroll interactions and responsive layouts.",
          tags:["Webflow","Cinematic visuals","Scroll-based motion"]
        },
        result:{
          eyebrow:"03 / THE OUTPUT",title:"A place you can explore on screen.",
          body:"An immersive digital storytelling concept that connects landscape, rhythm and narrative through a distinct visual direction. This is a creative showcase, not a claim of measured tourism impact.",
          tags:["Immersive presentation","Editorial composition","Responsive experience"]
        }
      }
    },
    gianni:{
      n:"03",short:"DG.",name:"TRATTORIA DA GIANNI",type:"RESTAURANT WEBSITE / WEBFLOW",
      views:{
        brief:{
          eyebrow:"01 / THE PURPOSE",title:"Put warmth and clarity first.",
          body:"Create a welcoming restaurant website concept that quickly communicates the cuisine, local character and the practical information a guest needs before visiting.",
          tags:["Hospitality","Easy discovery","Local character"]
        },
        build:{
          eyebrow:"02 / THE APPROACH",title:"A simple journey, carefully made.",
          body:"Designed in Webflow around food imagery, featured dishes, opening hours, contact details and a location map, with responsive layouts and clear navigation.",
          tags:["Webflow","Food presentation","Mobile-friendly structure"]
        },
        result:{
          eyebrow:"03 / THE OUTPUT",title:"An inviting restaurant experience.",
          body:"A warm digital presentation that puts the menu highlights and essential visit information at the center. This is a website concept; no reservation or revenue results are claimed.",
          tags:["Dish highlights","Hours and contacts","Location information"]
        }
      }
    }
  };
  const viewLabels={brief:"THE BRIEF",build:"THE BUILD",result:"THE OUTPUT"};
  function init(){
    const scene=document.querySelector(".case-world");
    const chapter=scene?.querySelector(".case-chapter");
    const footer=scene?.querySelector(".case-bottom");
    if(!scene||!chapter||!footer||scene.classList.contains("s30-ready")||scene.querySelector(".s30-evidence"))return;

    const section=document.createElement("section");
    section.className="s30-evidence";
    section.setAttribute("aria-label","Inside the Build — project process and deliverables");
    section.innerHTML=[
      '<div class="s30-kicker-row"><span>04 / INSIDE THE BUILD</span><span class="s30-case-number">CASE STUDY / 001</span></div>',
      '<div class="s30-intro"><h3 class="s30-headline">BEYOND THE <em>VISUAL.</em></h3><p class="s30-intro-desc">The thinking, the tools and the work behind each experience. Not fabricated numbers — a closer look at what was actually designed.</p></div>',
      '<div class="s30-workbench">',
        '<div class="s30-notes">',
          '<div class="s30-tabs" role="group" aria-label="Explore the project process">',
            '<button class="s30-tab" type="button" data-s30-view="brief" aria-pressed="true"><span class="s30-tab-index">01 /</span><span class="s30-tab-label">The Brief</span></button>',
            '<button class="s30-tab" type="button" data-s30-view="build" aria-pressed="false"><span class="s30-tab-index">02 /</span><span class="s30-tab-label">The Build</span></button>',
            '<button class="s30-tab" type="button" data-s30-view="result" aria-pressed="false"><span class="s30-tab-index">03 /</span><span class="s30-tab-label">The Output</span></button>',
          '</div>',
          '<div class="s30-note" role="region" aria-live="polite" aria-atomic="false" aria-label="Selected project process detail">',
            '<span class="s30-note-label"></span><h4 class="s30-note-title"></h4><p class="s30-note-copy"></p><div class="s30-capabilities" aria-label="Project details"></div>',
          '</div>',
        '</div>',
        '<div class="s30-technical" data-view="brief">',
          '<div class="s30-tech-head"><span>WORKING FILE / LM®</span><span class="s30-tech-lights" aria-hidden="true"><i></i><i></i><i></i></span></div>',
          '<div class="s30-tech-main"><div class="s30-blueprint" aria-hidden="true"><div class="s30-bp-head"><span>PROJECT / <span class="s30-bp-number">01</span></span><span>DESIGN STUDY</span></div><div class="s30-bp-core"><span class="s30-bp-symbol">RH.</span></div><div class="s30-bp-footer"><span class="s30-bp-phase">THE BRIEF</span><span>LM® / 2026</span></div></div></div>',
          '<div class="s30-tech-foot"><span class="s30-tech-project">RED HOUSE STUDIO</span><b class="s30-tech-type">WEB DESIGN / WEBFLOW</b></div>',
        '</div>',
      '</div>',
      '<div class="s30-bottomline"><span>REAL WORK / NO MADE-UP METRICS</span><span>DESIGN / BUILD / EXPERIENCE</span></div>'
    ].join("");
    scene.insertBefore(section,footer);
    const buttons=[...section.querySelectorAll(".s30-tab")];
    const technical=section.querySelector(".s30-technical");
    const title=section.querySelector(".s30-note-title");
    const detail=section.querySelector(".s30-note-copy");
    const eyebrow=section.querySelector(".s30-note-label");
    const chips=section.querySelector(".s30-capabilities");
    const number=section.querySelector(".s30-case-number");
    const bpNumber=section.querySelector(".s30-bp-number");
    const symbol=section.querySelector(".s30-bp-symbol");
    const phase=section.querySelector(".s30-bp-phase");
    const projectName=section.querySelector(".s30-tech-project");
    const type=section.querySelector(".s30-tech-type");
    let view="brief";
    let theme="";
    function render(){
      const project=data[theme];
      if(!project)return;
      const content=project.views[view];
      section.dataset.project=theme;
      section.dataset.view=view;
      technical.dataset.theme=theme;
      technical.dataset.view=view;
      number.textContent="CASE STUDY / "+project.n;
      bpNumber.textContent=project.n;
      symbol.textContent=project.short;
      projectName.textContent=project.name;
      type.textContent=project.type;
      eyebrow.textContent=content.eyebrow;
      title.textContent=content.title;
      detail.textContent=content.body;
      phase.textContent=viewLabels[view];
      chips.replaceChildren();
      for(const label of content.tags){
        const chip=document.createElement("span");
        chip.className="s30-chip";
        chip.textContent=label;
        chips.appendChild(chip);
      }
      buttons.forEach(b=>{
        const selected=b.dataset.s30View===view;
        b.setAttribute("aria-pressed",String(selected));
      });
    }
    function syncTheme(){
      const next=data[scene.dataset.theme]?scene.dataset.theme:"redhouse";
      if(next===theme)return;
      theme=next;
      view="brief";
      render();
    }
    buttons.forEach(button=>button.addEventListener("click",()=>{
      const next=button.dataset.s30View;
      if(!Object.prototype.hasOwnProperty.call(viewLabels,next))return;
      view=next;
      render();
    }));
    new MutationObserver(syncTheme).observe(scene,{attributes:true,attributeFilter:["data-theme"]});
    syncTheme();
    scene.classList.add("s30-ready");
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();