/* STEP 39 — passive scene bridge. Original World Index navigation remains unchanged. */
(()=>{function init(){const root=document.querySelector(".w19-root"),trigger=root?.querySelector(".w19-trigger");if(!root||!trigger||root.classList.contains("s39-ready"))return;
const indicator=document.createElement("span");indicator.className="s39-chapter";indicator.setAttribute("aria-hidden","true");trigger.insertBefore(indicator,trigger.querySelector(".w19-trigger-icon"));
const scenes=[["work",".work-world"],["sound",".sound-world"],["places",".p14-world"],["about",".a17-world"]];
const targets=scenes.map(([k,s])=>[k,document.querySelector(s)]);
const caseWorld=document.querySelector(".case-world");
function sync(){let active="hub";for(const [key,el] of targets)if(el?.classList.contains("is-active")){active=key;break}if(caseWorld?.classList.contains("is-active"))active="work";
root.dataset.s39World=active;indicator.textContent=active==="hub"?"00 / HOME":({work:"01",sound:"02",places:"03",about:"04"}[active]+" / "+active.toUpperCase());}
for(const [,el] of targets)if(el)new MutationObserver(sync).observe(el,{attributes:true,attributeFilter:["class"]});
if(caseWorld)new MutationObserver(sync).observe(caseWorld,{attributes:true,attributeFilter:["class"]});
sync();root.classList.add("s39-ready");}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init()})();