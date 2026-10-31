/* STEP 28 — DIRECTOR'S CUT / PROJECT DNA
   Purely additive: no edits to original case-study code, media, focus or transition.
*/
(() => {
  function init(){
    const scene=document.querySelector(".case-world");
    const story=scene?.querySelector(".case-story");
    const chapter=scene?.querySelector(".case-chapter");
    const top=scene?.querySelector(".case-top");
    const visual=scene?.querySelector(".case-visual");
    if(!scene||!story||!chapter||!top||!visual||scene.classList.contains("s28-ready"))return;
    const details={
      redhouse:{index:"01",name:"RED HOUSE STUDIO",title:"A DISTINCTIVE",italic:"IDENTITY.",deck:"An editorial visual language built to express a contemporary salon's personality.",tags:["BOLD TYPE","WARM TONES","CUSTOM MOTION"],chapters:["IDENTITY","ATMOSPHERE","EXPERIENCE"],numbers:["01","02","03"]},
      soca:{index:"02",name:"SOČA VALLEY",title:"A DIFFERENT",italic:"PERSPECTIVE.",deck:"A visual journey where landscape, movement and atmospheric storytelling work together.",tags:["NATURE","MOVEMENT","STORYTELLING"],chapters:["LANDSCAPE","RHYTHM","EXPLORATION"],numbers:["01","02","03"]},
      gianni:{index:"03",name:"TRATTORIA DA GIANNI",title:"A WARM",italic:"WELCOME.",deck:"A warm, accessible digital identity that puts food, place and tradition at its heart.",tags:["HOSPITALITY","HERITAGE","CLARITY"],chapters:["TRADITION","FLAVOUR","CONNECTION"],numbers:["01","02","03"]}
    };
    const section=document.createElement("section");
    section.className="s28-dossier";
    section.setAttribute("aria-label","Project DNA — creative visual study");
    section.innerHTML=[
      '<div class="s28-dossier-head"><span>02 / PROJECT DNA</span><span class="s28-dossier-ident">CASE FILE / 001</span></div>',
      '<h3 class="s28-dossier-title"><span>A DISTINCTIVE</span><em>IDENTITY.</em></h3>',
      '<p class="s28-dossier-deck"></p>',
      '<div class="s28-panels">',
      ...[1,2,3].map(i=>'<article class="s28-panel"><div class="s28-panel-label"><span>VISUAL STUDY / 0'+i+'</span><span>LM®</span></div><div class="s28-art" aria-hidden="true"><span class="s28-panel-count">'+i+'</span></div><div class="s28-panel-bottom"><strong class="s28-panel-word"></strong><span>0'+i+' / 03</span></div></article>'),
      '</div>',
      '<div class="s28-dossier-foot"><span class="s28-dossier-label">PROJECT STUDIES / 001</span><span>THREE NOTES / ONE DIRECTION</span></div>'
    ].join("");
    scene.insertBefore(section,chapter);
    const folio=document.createElement("span");
    folio.className="s28-top-folio";
    folio.textContent="DIRECTOR'S CUT / 001";
    const back=top.querySelector(".case-back");
    if(back)top.insertBefore(folio,back);else top.appendChild(folio);
    const imageFolio=document.createElement("span");
    imageFolio.className="s28-image-folio";
    imageFolio.setAttribute("aria-hidden","true");
    imageFolio.textContent="STUDY / 001";
    visual.appendChild(imageFolio);
    const ident=section.querySelector(".s28-dossier-ident");
    const heading=section.querySelector(".s28-dossier-title");
    const deck=section.querySelector(".s28-dossier-deck");
    const label=section.querySelector(".s28-dossier-label");
    const words=[...section.querySelectorAll(".s28-panel-word")];
    const activeTheme=()=>details[scene.dataset.theme]?scene.dataset.theme:"redhouse";
    function sync(){
      const data=details[activeTheme()];
      ident.textContent="CASE FILE / 00"+data.index;
      heading.querySelector("span").textContent=data.title;
      heading.querySelector("em").textContent=data.italic;
      deck.textContent=data.deck;
      words.forEach((word,i)=>word.textContent=data.chapters[i]);
      label.textContent=data.name+" / SELECTED WORK";
      folio.textContent="DIRECTOR'S CUT / "+data.index;
      imageFolio.textContent="STUDY / "+data.index;
    }
    new MutationObserver(sync).observe(scene,{attributes:true,attributeFilter:["data-theme"]});
    sync();
    scene.classList.add("s28-ready");
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();