/* PHASE 114 — ABOUT / HUMAN, DIGITAL, CURIOUS
   Replaces the old three-card About triptych with a complete, scrollable
   editorial professional profile. All facts are grounded in the user's
   shared project details; no private email or invented employers.
   The CV is a printable public-facing page in this same assets repository.
*/
(()=>{
function init(){
 const hub=document.querySelector(".world-hub.fi95-ready");
 const level=hub?.querySelector(".fi95-level");
 const cluster=level?.querySelector(".fi95-cluster");
 if(!hub||!level||!cluster||hub.dataset.fi114AboutReady==="1")return;
 let stage=null;
 const cv="https://marega02.github.io/portfolio-assets/assets/cv-luca-marega.html";
 const github="https://github.com/Marega02";
 const site="https://utopia-maybe.webflow.io";
 const workImage="https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6af23552980d046ba8433a49_Work%20Editorial%20%E2%80%94%20Red%20House%20Salon.jpg";
 const socaImage="https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6af229d8d2ed6dd493860312_Places%20HD%20Soca%20Valley%20%E2%80%94%201600px.jpeg";
 function mount(){
  if(stage||level.dataset.category!=="about")return;
  stage=document.createElement("section");
  stage.className="fi114-about-stage";
  stage.setAttribute("aria-label","About Luca Marega, skills, selected projects, curriculum vitae and professional links");
  stage.innerHTML=
    '<div class="fi114-about-hero">'+
      '<div class="fi114-about-left">'+
        '<div class="fi114-about-mark"><span>LM.</span><small>THE PERSON<br>BEHIND THE PIXELS</small></div>'+
        '<span class="fi114-about-kicker">HELLO, I AM LUCA MAREGA</span>'+
        '<h3>Curiosity<br>is <em>the point.</em></h3>'+
        '<p class="fi114-about-lede">I design websites and digital experiences that make people feel something. Between visual stories, music and exploration, I am always looking for new ways to make the ordinary feel a little less ordinary.</p>'+
        '<div class="fi114-about-status"><i aria-hidden="true"></i><span>WEB DESIGNER &amp; DIGITAL CREATIVE <b>·</b> GORIZIA, ITALY</span></div>'+
        '<div class="fi114-about-actions">'+
          '<a class="fi114-about-button fi114-about-button-primary" target="_blank" rel="noopener noreferrer" href="'+cv+'">VIEW CURRICULUM <span aria-hidden="true">↗</span></a>'+
          '<a class="fi114-about-button fi114-about-button-secondary" target="_blank" rel="noopener noreferrer" href="'+github+'">GITHUB <span aria-hidden="true">↗</span></a>'+
        '</div>'+
      '</div>'+
      '<div class="fi114-about-right" aria-hidden="true">'+
        '<div class="fi114-about-cover"><img src="'+socaImage+'" alt="" loading="lazy" decoding="async"><span>01 / A WORLD OUTSIDE THE SCREEN</span></div>'+
        '<div class="fi114-about-secondary"><img src="'+workImage+'" alt="" loading="lazy" decoding="async"><span>INDEPENDENT DIGITAL DESIGN</span></div>'+
        '<div class="fi114-about-vertical">DESIGN / DISCOVER / REPEAT</div>'+
      '</div>'+
    '</div>'+
    '<div class="fi114-about-panels">'+
      '<section class="fi114-about-panel fi114-about-panel-what">'+
        '<div class="fi114-section-head"><span>01 / WHAT I DO</span><i></i></div>'+
        '<h4>Creative solutions,<br><em>built with intention.</em></h4>'+
        '<p>From a first concept to a responsive published experience, I care about clear navigation, considered typography and the little interactions that give a project its character.</p>'+
        '<div class="fi114-tags"><span>WEBFLOW</span><span>WEB DESIGN</span><span>FRONT-END</span><span>UX / UI</span><span>CREATIVE INTERACTIONS</span><span>AI WORKFLOWS</span></div>'+
      '</section>'+
      '<section class="fi114-about-panel fi114-about-panel-path">'+
        '<div class="fi114-section-head"><span>02 / MY BACKGROUND</span><i></i></div>'+
        '<div class="fi114-fact"><span>EDUCATION</span><strong>Diploma in Computer Science</strong><small>JURIJ VEGA · GORIZIA</small></div>'+
        '<div class="fi114-fact"><span>LANGUAGES</span><strong>Italian &amp; Slovenian</strong><small>NATIVE · ENGLISH B2</small></div>'+
        '<div class="fi114-fact"><span>EXPERIENCE</span><strong>Web &amp; digital projects</strong><small>INDEPENDENT WORK · CREATIVE &amp; AI-RELATED TASKS</small></div>'+
      '</section>'+
      '<section class="fi114-about-panel fi114-about-panel-work">'+
        '<div class="fi114-section-head"><span>03 / SOME OF MY WORK</span><i></i></div>'+
        '<div class="fi114-about-selected">'+
          '<div><b>RED HOUSE STUDIO</b><span>WEBSITE · WEBFLOW</span></div>'+
          '<div><b>SOČA VALLEY</b><span>VISUAL STORYTELLING</span></div>'+
          '<div><b>TRATTORIA DA GIANNI</b><span>HOSPITALITY WEBSITE</span></div>'+
        '</div>'+
        '<p>Projects across web design, storytelling and local businesses — with space for whatever comes next.</p>'+
      '</section>'+
      '<section class="fi114-about-panel fi114-about-panel-links">'+
        '<div class="fi114-section-head"><span>04 / PROFESSIONAL LINKS</span><i></i></div>'+
        '<a href="'+cv+'" target="_blank" rel="noopener noreferrer"><span>01</span><strong>Curriculum Vitae</strong><b>↗</b></a>'+
        '<a href="'+site+'" target="_blank" rel="noopener noreferrer"><span>02</span><strong>Personal portfolio</strong><b>↗</b></a>'+
        '<a href="'+github+'" target="_blank" rel="noopener noreferrer"><span>03</span><strong>GitHub</strong><b>↗</b></a>'+
        '<p>The curriculum is a public professional summary, printable or downloadable as PDF from the CV page. Additional contact channels can be added once confirmed.</p>'+
      '</section>'+
    '</div>'+
    '<footer class="fi114-about-finale"><span>STILL CURIOUS. ALWAYS BUILDING.</span><a href="'+cv+'" target="_blank" rel="noopener noreferrer">OPEN MY CV <b aria-hidden="true">↗</b></a></footer>';
  const primary=stage.querySelector(".fi114-about-button-primary");
  primary.addEventListener("click",()=>{});
  cluster.appendChild(stage);
  cluster.classList.add("fi114-about-cluster-on");
  level.classList.add("fi114-about-on");
  const title=level.querySelector(".fi95-level-title h2");
  if(title)title.textContent="ABOUT";
  const sign=level.querySelector(".fi95-level-sign");
  if(sign)sign.textContent="THE HUMAN SIDE";
  const cap=level.querySelector(".fi95-level-caption");
  if(cap)cap.textContent="A LITTLE ABOUT ME / THE WORK / THE WORLD";
  const foot=level.querySelector(".fi95-level-foot span:first-child");
  if(foot)foot.textContent="WEB DESIGNER / EXPLORER / CURIOUS BY NATURE";
 }
 function unmount(){
  if(!stage)return;
  stage.remove();stage=null;
  cluster.classList.remove("fi114-about-cluster-on");
  level.classList.remove("fi114-about-on");
 }
 new MutationObserver(()=>{if(level.dataset.category==="about")mount();else unmount()})
   .observe(level,{attributes:true,attributeFilter:["data-category"]});
 hub.dataset.fi114AboutReady="1";
 if(level.dataset.category==="about")mount();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
else init();
})();