/* STEP 33 — FRAME STUDIES. Reuses the existing chapter image URL; no new network assets or navigation interception. */
(() => {
 function init(){
  const scene=document.querySelector(".case-world"),chapter=scene?.querySelector(".case-chapter");
  const existing=chapter?.querySelector(".chapter-image");
  const media=chapter?.querySelector(".chapter-media");
  if(!scene||!chapter||!existing||!media||scene.classList.contains("s33-ready"))return;
  const lab=document.createElement("section");
  lab.className="s33-lab";lab.setAttribute("aria-label","Frame Studies — explore photographic compositions");
  lab.innerHTML=[
   '<div class="s33-top"><span>03 / THE DIRECTOR’S VIEW</span><span class="s33-folio">VISUAL STUDY / 001</span></div>',
   '<div class="s33-heading"><h3 class="s33-title">FRAME <em>STUDIES.</em></h3><p class="s33-intro">One original project image, three different perspectives. Explore how framing changes the feeling of a composition.</p></div>',
   '<div class="s33-layout"><figure class="s33-preview" data-view="wide">',
   '<img class="s33-main-image" alt="" loading="lazy" decoding="async">',
   '<div class="s33-preview-top"><span>LM® / CONTACT SHEET</span><span>35 MM — DIGITAL STUDY</span></div>',
   '<figcaption class="s33-preview-bottom"><strong class="s33-preview-word">WIDE.</strong><span class="s33-preview-id">FRAME 01 / 03</span></figcaption></figure>',
   '<div class="s33-panel"><div class="s33-panel-head"><span>SELECT A FRAME</span><span>01—03</span></div>',
   ...["wide","detail","texture"].map((v,i)=>'<button type="button" class="s33-choice" data-view="'+v+'" aria-pressed="'+(i===0)+'"><span class="s33-choice-thumb"><img alt="" loading="lazy" decoding="async"></span><span class="s33-choice-copy"><small class="s33-choice-index">0'+(i+1)+' / 03</small><strong class="s33-choice-label">'+v.toUpperCase()+'</strong></span><span class="s33-choice-mark" aria-hidden="true">↗</span></button>'),
   '<p class="s33-director-note"><strong>DIRECTOR’S NOTE</strong><span class="s33-note-text">The full composition gives the image room to tell its story.</span></p></div></div>',
   '<div class="s33-foot"><span>ONE IMAGE / THREE PERSPECTIVES</span><span>FRAME REFERENCE / NOT ADDITIONAL PHOTOGRAPHY</span></div>'
  ].join("");
  chapter.insertBefore(lab,media);
  const main=lab.querySelector(".s33-main-image"),preview=lab.querySelector(".s33-preview"),word=lab.querySelector(".s33-preview-word"),number=lab.querySelector(".s33-preview-id"),note=lab.querySelector(".s33-note-text"),folio=lab.querySelector(".s33-folio");
  const choices=[...lab.querySelectorAll(".s33-choice")],thumbs=choices.map(b=>b.querySelector("img"));
  const frames={wide:{label:"WIDE.",note:"The full composition gives the image room to tell its story."},detail:{label:"DETAIL.",note:"A closer crop draws attention to structure, rhythm and the smaller decisions."},texture:{label:"TEXTURE.",note:"An intimate crop turns the same image into an atmospheric visual fragment."}};
  let view="wide",lastSource="",lastSrcset="",lastTheme="";
  const source=()=>{
    const src=existing.getAttribute("src")||existing.currentSrc||"";
    return {src,srcset:existing.getAttribute("srcset")||"",sizes:existing.getAttribute("sizes")||"100vw"};
  };
  function refreshImages(){
    const s=source();
    if(!s.src|| (s.src===lastSource&&s.srcset===lastSrcset))return;
    lastSource=s.src;lastSrcset=s.srcset;
    for(const el of [main,...thumbs]){
      el.classList?.remove("is-loaded");
      el.src=s.src;
      if(s.srcset){el.srcset=s.srcset;el.sizes=s.sizes;}else{el.removeAttribute("srcset");el.removeAttribute("sizes");}
      el.alt=existing.alt||"Photographic study of the selected project";
    }
    if(main.complete&&main.naturalWidth)main.classList.add("is-loaded");
  }
  function setView(key){
    if(!frames[key])return;
    view=key;const i=["wide","detail","texture"].indexOf(key);
    preview.dataset.view=key;word.textContent=frames[key].label;number.textContent="FRAME 0"+(i+1)+" / 03";note.textContent=frames[key].note;
    choices.forEach(button=>button.setAttribute("aria-pressed",String(button.dataset.view===key)));
  }
  const themed={redhouse:"001",soca:"002",gianni:"003"};
  function sync(){
    refreshImages();
    const theme=scene.dataset.theme||"redhouse";
    if(theme!==lastTheme){lastTheme=theme;folio.textContent="VISUAL STUDY / "+(themed[theme]||"001");setView("wide");}
  }
  main.addEventListener("load",()=>main.classList.add("is-loaded"));
  choices.forEach(button=>button.addEventListener("click",()=>setView(button.dataset.view)));
  new MutationObserver(sync).observe(scene,{attributes:true,attributeFilter:["data-theme"]});
  new MutationObserver(refreshImages).observe(existing,{attributes:true,attributeFilter:["src","srcset","sizes"]});
  sync();
  scene.classList.add("s33-ready");
 }
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();