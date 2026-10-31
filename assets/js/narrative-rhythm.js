/* STEP 36 — NARRATIVE RHYTHM
 * Passive narrative dividers and scroll-aware index.
 * No interception of scrolling, no GSAP changes, no buttons added.
 */
(() => {
 const projectText={
  redhouse:[
   ["AFTER THE FIRST IMPRESSION","There is always","more to tell.","From the first idea to the details that give a brand its character."],
   ["BEFORE THE VISUAL CHAPTER","An identity","in motion.","A visual world comes together through type, colour, and atmosphere."],
   ["BEHIND THE RESULT","Built with","intention.","Design decisions become a working digital experience."]
  ],
  soca:[
   ["AFTER THE FIRST IMPRESSION","A place is","a feeling.","Beyond geography, every landscape carries its own rhythm."],
   ["BEFORE THE VISUAL CHAPTER","Look a little","closer.","Movement, colour, and distance frame the story."],
   ["BEHIND THE RESULT","Where nature","meets design.","A creative study of a remarkable landscape."]
  ],
  gianni:[
   ["AFTER THE FIRST IMPRESSION","Every table","tells a story.","Warmth and familiarity can shape a digital welcome."],
   ["BEFORE THE VISUAL CHAPTER","Made to feel","like home.","Every detail should support the feeling of hospitality."],
   ["BEHIND THE RESULT","A simple idea,","well served.","An approachable experience that puts the essentials first."]
  ]
 };
 const placeText={
  soca:[
   ["FROM THE LANDSCAPE","Some places","stay with us.","Not everything worth remembering can be put on a map."],
   ["BETWEEN TWO FRAMES","The details","tell the story.","A moment of stillness gives every image more space."]
  ],
  london:[
   ["FROM THE CITY","Every street","has a rhythm.","A new perspective can be found around the next corner."],
   ["BETWEEN TWO FRAMES","Look beyond","the obvious.","The most interesting moments live in the contrast."]
  ],
  kl:[
   ["FROM THE CITY","A thousand","different layers.","Light, movement and everyday discoveries shape the memory."],
   ["BETWEEN TWO FRAMES","Stop and","look again.","Small details can reveal a city's character."]
  ]
 };
 function init(){
  const caseWorld=document.querySelector(".case-world"),journal=document.querySelector(".p15-journal");
  const content=journal?.querySelector(".p15-content");
  if(!caseWorld||!journal||!content||caseWorld.classList.contains("s36-ready")||journal.classList.contains("s36-ready"))return;
  const caseTargets=[
   [caseWorld.querySelector(".case-story"),"case-story"],
   [caseWorld.querySelector(".case-chapter"),"case-chapter"],
   [caseWorld.querySelector(".s30-evidence"),"s30-evidence"]
  ];
  const journalTargets=[
   [content.querySelector(".p15-story"),"p15-story"],
   [content.querySelector(".p15-gallery"),"p15-gallery"]
  ];
  if(caseTargets.some(x=>!x[0])||journalTargets.some(x=>!x[0]))return;
  function makeInterlude(i){
   const section=document.createElement("section");
   section.className="s36-interlude";
   section.setAttribute("aria-label","Narrative interlude");
   section.innerHTML='<div class="s36-interlude-content"><span class="s36-interlude-kicker"></span><h3 class="s36-interlude-title"><span></span> <em></em></h3><p class="s36-interlude-subtitle"></p></div><span class="s36-interlude-index" aria-hidden="true"></span><div class="s36-interlude-rule" aria-hidden="true"></div>';
   section.dataset.s36Index=String(i);
   return section;
  }
  const cPieces=caseTargets.map(([target],i)=>{const el=makeInterlude(i);target.parentNode.insertBefore(el,target);return el;});
  const jPieces=journalTargets.map(([target],i)=>{const el=makeInterlude(i);content.insertBefore(el,target);return el;});
  function fill(parts,templates){
   parts.forEach((el,i)=>{
    const record=templates[i];if(!record)return;
    el.querySelector(".s36-interlude-kicker").textContent=record[0];
    el.querySelector(".s36-interlude-title span").textContent=record[1];
    el.querySelector(".s36-interlude-title em").textContent=record[2];
    el.querySelector(".s36-interlude-subtitle").textContent=record[3];
    el.querySelector(".s36-interlude-index").textContent=String(i+1).padStart(2,"0");
   });
  }
  const cSections=[caseWorld.querySelector(".case-hero"),caseWorld.querySelector(".case-story"),caseWorld.querySelector(".s28-dossier"),caseWorld.querySelector(".case-chapter"),caseWorld.querySelector(".s30-evidence")].filter(Boolean);
  const jSections=[content.querySelector(".p15-hero"),content.querySelector(".p15-story"),content.querySelector(".p15-gallery"),content.querySelector(".p15-outro")].filter(Boolean);
  function makeScore(root,labels){
   const score=document.createElement("div");
   score.className="s36-score";score.setAttribute("aria-hidden","true");
   score.innerHTML='<span class="s36-score-name"></span><span class="s36-score-dots"></span><span class="s36-score-count"></span>';
   const dots=score.querySelector(".s36-score-dots");
   labels.forEach((_,i)=>{const dot=document.createElement("i");if(i===0)dot.classList.add("is-current");dots.append(dot)});
   root.append(score);return score;
  }
  const caseLabels=["THE INTRO","THE STORY","PROJECT DNA","VISUAL CHAPTER","INSIDE THE BUILD"];
  const journalLabels=["THE INTRO","THE FEELING","IN THE FRAME","LAST IMPRESSION"];
  const cScore=makeScore(caseWorld,caseLabels),jScore=makeScore(journal,journalLabels);
  const reduced=window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const intersect=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting||reduced)e.target.classList.add("is-in-view")})},{root:null,rootMargin:"0px 0px -15% 0px",threshold:.08});
  [...cPieces,...jPieces].forEach(el=>intersect.observe(el));
  function updateScore(root,items,labels,score){
   if(!items.length)return;
   const view=root.getBoundingClientRect();
   const reference=view.top+Math.min(root.clientHeight*.36,300);
   let active=0;
   items.forEach((el,i)=>{if(el.getBoundingClientRect().top<=reference)active=i});
   score.querySelector(".s36-score-name").textContent=labels[active];
   score.querySelector(".s36-score-count").textContent=String(active+1).padStart(2,"0")+" / "+String(items.length).padStart(2,"0");
   [...score.querySelectorAll(".s36-score-dots i")].forEach((dot,i)=>dot.classList.toggle("is-current",i===active));
  }
  function initScroll(root,items,labels,score,isOpen){
   let raf=0;
   function refresh(){raf=0;if(isOpen())updateScore(root,items,labels,score)}
   root.addEventListener("scroll",()=>{if(!raf)raf=requestAnimationFrame(refresh)},{passive:true});
   return refresh;
  }
  const refreshCase=initScroll(caseWorld,cSections,caseLabels,cScore,()=>caseWorld.classList.contains("is-active"));
  const refreshJournal=initScroll(journal,jSections,journalLabels,jScore,()=>journal.classList.contains("is-open"));
  function syncCase(){
   const key=caseWorld.dataset.theme||"redhouse";fill(cPieces,projectText[key]||projectText.redhouse);
   cPieces.forEach(el=>{el.classList.remove("is-in-view");if(reduced)el.classList.add("is-in-view")});
   refreshCase();
  }
  function syncJournal(){
   const key=journal.dataset.place||"soca";fill(jPieces,placeText[key]||placeText.soca);
   jPieces.forEach(el=>{el.classList.remove("is-in-view");if(reduced)el.classList.add("is-in-view")});
   refreshJournal();
  }
  new MutationObserver(syncCase).observe(caseWorld,{attributes:true,attributeFilter:["data-theme"]});
  new MutationObserver(syncJournal).observe(journal,{attributes:true,attributeFilter:["data-place"]});
  new MutationObserver(refreshCase).observe(caseWorld,{attributes:true,attributeFilter:["class"]});
  new MutationObserver(refreshJournal).observe(journal,{attributes:true,attributeFilter:["class"]});
  syncCase();syncJournal();
  caseWorld.classList.add("s36-ready");
  journal.classList.add("s36-ready");
  // Observe relative to individual scroll containers, not the page viewport.
  intersect.disconnect();
  function observeIn(container,parts){
   const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("is-in-view")}),{root:container,threshold:.08});
   parts.forEach(el=>io.observe(el));
  }
  observeIn(caseWorld,cPieces);observeIn(journal,jPieces);
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
 else init();
})();