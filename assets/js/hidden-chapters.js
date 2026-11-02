/* STEP 34.2 — HIDDEN CHAPTERS. Enabled only in WORK, SOUND and ABOUT; PLACES removed. */
(() => {
const svg={
work:'<svg viewBox="0 0 240 240" aria-hidden="true"><g class="s34-spin"><rect class="s34-line" x="43" y="43" width="154" height="154" transform="rotate(-12 120 120)"/><rect class="s34-thin" x="65" y="65" width="110" height="110"/><path class="s34-line" d="M43 120H197M120 43V197"/><circle class="s34-fill" cx="120" cy="120" r="8"/></g></svg>',
sound:'<svg viewBox="0 0 240 240" aria-hidden="true"><g class="s34-spin"><circle class="s34-line" cx="120" cy="120" r="93"/><circle class="s34-thin" cx="120" cy="120" r="77"/><circle class="s34-line" cx="120" cy="120" r="60"/><circle class="s34-thin" cx="120" cy="120" r="40"/><circle class="s34-fill" cx="120" cy="120" r="11"/><path class="s34-line" d="M218 24V66L165 140"/></g></svg>',
places:'<svg viewBox="0 0 240 240" aria-hidden="true"><g class="s34-spin"><circle class="s34-thin" cx="120" cy="120" r="97"/><path class="s34-line" d="M24 72Q68 16 113 68T218 67M21 102Q70 54 112 98T220 94M22 142Q76 100 119 145T220 139M23 185Q70 151 120 190T217 183"/><path class="s34-line" d="M67 192L130 111L178 45" stroke-dasharray="5 7"/><circle class="s34-fill" cx="67" cy="192" r="7"/><circle class="s34-fill" cx="178" cy="45" r="7"/></g></svg>',
about:'<svg viewBox="0 0 240 240" aria-hidden="true"><g class="s34-spin"><circle class="s34-thin" cx="120" cy="120" r="93"/><ellipse class="s34-line" cx="120" cy="120" rx="107" ry="53" transform="rotate(-27 120 120)"/><text class="s34-fill" x="119" y="149" font-family="Georgia,serif" font-style="italic" font-size="78" text-anchor="middle">LM</text><circle class="s34-fill" cx="165" cy="80" r="8"/></g></svg>'
};
const chapter={
work:{title:"THE UNSEEN",second:"PROCESS.",code:"01 / THE MAKER",steps:[["BEFORE THE PIXELS","A strong website starts with a decision: what should someone feel, understand, and do?","FRAME / CONCEPT"],["BEHIND THE INTERFACE","Structure, typography, responsive behaviour and custom interactions shape an experience together.","FRAME / SYSTEM"],["THE DETAIL MATTERS","The final polish lives in things visitors barely notice: rhythm, clarity, timing and consistency.","FRAME / FINISH"]]},
sound:{title:"BEHIND THE",second:"FREQUENCY.",code:"02 / THE LISTENER",steps:[["SOUL / WARMTH","Layered voices, organic grooves and the feeling of finding something familiar in a new sound.","SIDE A / 33⅓"],["HIP-HOP / RHYTHM","Texture, sampling and unexpected combinations: creative thinking through rhythm.","SIDE B / 45"],["ALTERNATIVE / SPACE","Unusual arrangements and open-ended ideas: the kind of music that makes room for experimentation.","OUTRO / OPEN"]]},
places:{title:"NOT JUST",second:"COORDINATES.",code:"03 / THE WANDERER",steps:[["SOČA VALLEY","Mountain air, emerald rivers and a landscape that invites you to slow down and look closer.","FIELD / SI"],["LONDON","A restless urban landscape of contrasts, unexpected details and new perspectives.","FIELD / GB"],["KUALA LUMPUR","Tropical energy, layered architecture and a city of constantly changing impressions.","FIELD / MY"]]},
about:{title:"MORE THAN",second:"A TITLE.",code:"04 / THE HUMAN",steps:[["THE MAKER","An interest in building interfaces that feel personal rather than merely functional.","NOTE / 01"],["THE LISTENER","Music feeds the visual imagination: rhythm, atmosphere, contrast, repetition.","NOTE / 02"],["THE EXPLORER","Travel and curiosity offer new ways of seeing, questioning and making things.","NOTE / 03"]]}
};
function init(){
const specs=[["work",".work-world",".work-top",".work-back"],["sound",".sound-world",".sound-top",".sound-back"],["about",".a17-world",".a17-header",".a17-back"]];
const roots=specs.map(s=>document.querySelector(s[1]));
if(roots.some(x=>!x)||document.querySelector(".s34-overlay"))return;
const triggerEntries=[];
specs.forEach(([key,,headSel,backSel],i)=>{
 const head=roots[i].querySelector(headSel),back=roots[i].querySelector(backSel);
 if(!head||!back)return;
 const btn=document.createElement("button");btn.type="button";btn.className="s34-trigger";btn.innerHTML='<span class="s34-trigger-symbol" aria-hidden="true">✳</span><span class="s34-trigger-name">SECRET CHAPTER</span>';
 btn.setAttribute("aria-label","Open hidden chapter for "+key);
 head.insertBefore(btn,back);triggerEntries.push({key,button:btn,root:roots[i]});
});
const dialog=document.createElement("div");dialog.className="s34-overlay";dialog.hidden=true;dialog.dataset.step="0";
dialog.innerHTML='<div class="s34-backdrop"></div><div class="s34-sheet" role="dialog" aria-modal="true" aria-label="Hidden chapter" tabindex="-1"><div class="s34-head"><span class="s34-head-code">LM® / PRIVATE EDITION</span><button type="button" class="s34-close">CLOSE ×</button></div><div class="s34-body"><div class="s34-copy"><p class="s34-eyebrow">HIDDEN CHAPTER / 001</p><span class="s34-number" aria-hidden="true">01</span><h2 class="s34-heading"><span>THE UNSEEN</span><em>PROCESS.</em></h2><p class="s34-description"></p><div class="s34-copy-foot"><span class="s34-foot-label">FRAME / CONCEPT</span><span>LM® / 2026</span></div></div><div class="s34-visual"><span class="s34-visual-label">THE ART OF LOOKING CLOSER</span><div class="s34-art" aria-hidden="true"></div><div class="s34-visual-index"><span>AN ORIGINAL VISUAL STUDY</span><span class="s34-visual-num">01 / 03</span></div></div></div><div class="s34-controls"><div class="s34-steps" role="group" aria-label="Hidden chapter fragments"><button class="s34-step-button" type="button" data-index="0" aria-pressed="true">01</button><button class="s34-step-button" type="button" data-index="1" aria-pressed="false">02</button><button class="s34-step-button" type="button" data-index="2" aria-pressed="false">03</button></div><button class="s34-next" type="button">NEXT FRAGMENT →</button></div></div>';
document.body.appendChild(dialog);
const sheet=dialog.querySelector(".s34-sheet"),close=dialog.querySelector(".s34-close"),heading=dialog.querySelector(".s34-heading"),desc=dialog.querySelector(".s34-description"),eyebrow=dialog.querySelector(".s34-eyebrow"),number=dialog.querySelector(".s34-number"),label=dialog.querySelector(".s34-foot-label"),art=dialog.querySelector(".s34-art"),visualnum=dialog.querySelector(".s34-visual-num"),steps=[...dialog.querySelectorAll(".s34-step-button")],next=dialog.querySelector(".s34-next");
let active=null,step=0,priorFocus=null,priorInert=false;
const isOpen=()=>!dialog.hidden;
function render(){
 if(!active)return;
 const d=chapter[active.key],part=d.steps[step];
 dialog.dataset.step=String(step);heading.querySelector("span").textContent=d.title;heading.querySelector("em").textContent=d.second;
 desc.textContent=part[1];eyebrow.textContent=d.code+" / "+part[0];number.textContent=String(step+1).padStart(2,"0");label.textContent=part[2];visualnum.textContent=String(step+1).padStart(2,"0")+" / 03";
 steps.forEach((b,i)=>b.setAttribute("aria-pressed",String(i===step)));
}
function open(entry){
 if(isOpen()||!entry.root.classList.contains("is-active")||entry.root.inert)return;
 active=entry;priorFocus=document.activeElement;priorInert=entry.root.inert;step=0;art.innerHTML=svg[entry.key];dialog.dataset.scene=entry.key;render();
 dialog.hidden=false;document.body.classList.add("s34-modal-open");entry.root.inert=true;close.focus({preventScroll:true});
}
function hide(){
 if(!isOpen())return;
 dialog.hidden=true;document.body.classList.remove("s34-modal-open");
 if(active){active.root.inert=priorInert;}
 const target=(priorFocus&&priorFocus.isConnected&& !priorFocus.closest("[inert]"))?priorFocus:active?.button;
 if(target?.isConnected&&!target.closest("[inert]"))target.focus({preventScroll:true});
 active=null;
}
triggerEntries.forEach(entry=>entry.button.addEventListener("click",()=>open(entry)));
close.addEventListener("click",hide);
dialog.querySelector(".s34-backdrop").addEventListener("click",hide);
steps.forEach(b=>b.addEventListener("click",()=>{step=Number(b.dataset.index);render()}));
next.addEventListener("click",()=>{step=(step+1)%3;render()});
document.addEventListener("keydown",e=>{
 if(!isOpen())return;
 if(e.key==="Escape"){e.preventDefault();e.stopImmediatePropagation();hide();return;}
 if(e.key!=="Tab")return;
 const focusable=[...dialog.querySelectorAll("button:not([disabled]),a[href]")].filter(el=>el.getClientRects().length>0);
 if(!focusable.length)return;
 const first=focusable[0],last=focusable[focusable.length-1];
 if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
 else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
},true);
roots.forEach(root=>new MutationObserver(()=>{if(isOpen()&&!active.root.classList.contains("is-active"))hide()}).observe(root,{attributes:true,attributeFilter:["class"]}));
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();