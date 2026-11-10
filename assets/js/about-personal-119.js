/* PHASE 119 — ABOUT / A MORE PERSONAL STORY
   A personal introduction, not a second CV. Small authentic details,
   two interest-related photographs, and one clear link to the separate
   public CV page (replace with the future dedicated site when ready).
   No stock portrait is falsely represented as Luca.
*/
(()=>{
function init(){
  const hub=document.querySelector(".world-hub.fi95-ready");
  const level=hub?.querySelector(".fi95-level");
  const cluster=level?.querySelector(".fi95-cluster");
  if(!hub||!level||!cluster||hub.dataset.fi119AboutReady==="1")return;
  const cv="https://marega02.github.io/portfolio-assets/assets/cv-luca-marega.html";
  const soca="https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6af229d8d2ed6dd493860312_Places%20HD%20Soca%20Valley%20%E2%80%94%201600px.jpeg";
  const music="https://s3.amazonaws.com/webflow-prod-assets/6adce03b89b49e519149623e/6af2299b88336428ea628ff4_Portfolio%20Home%20%E2%80%94%20Sound%20%E2%80%94%201400px.jpg";
  let stage=null;
  function mount(){
    if(stage||level.dataset.category!=="about")return;
    stage=document.createElement("section");
    stage.className="fi119-about-stage";
    stage.setAttribute("aria-label","About Luca Marega: a personal introduction, interests and CV link");
    stage.innerHTML=
      '<div class="fi119-about-hero">'+
        '<div class="fi119-about-copy">'+
          '<span class="fi119-about-eyebrow"><i aria-hidden="true"></i> HELLO, I’M LUCA MAREGA</span>'+
          '<h3>More than<br><em>what I do.</em></h3>'+
          '<p class="fi119-about-intro">Half Italian, half Slovenian. Born in Slovenia, based in Gorizia. I’m into design, music, travel, and pretty much anything that sparks a little curiosity.</p>'+
          '<p class="fi119-about-detail">I love making things from scratch, discovering places I’ve never been and finding new sounds along the way. Web design is what I create; it’s definitely not everything that defines me.</p>'+
          '<div class="fi119-about-signoff"><span>CURIOUS BY NATURE</span><b aria-hidden="true">✳</b><span>ALWAYS EXPLORING</span></div>'+
        '</div>'+
        '<div class="fi119-about-visuals" aria-label="Photography reflecting interests in travel and music">'+
          '<figure class="fi119-about-photo fi119-about-photo-travel">'+
            '<img src="'+soca+'" alt="The turquoise river flowing through the Soča Valley, a place that inspires me" loading="eager" decoding="async">'+
            '<figcaption><span>01 / OUT THERE</span><strong>PLACES I LOVE</strong></figcaption>'+
          '</figure>'+
          '<figure class="fi119-about-photo fi119-about-photo-sound">'+
            '<img src="'+music+'" alt="A live music performance, representing my love for music" loading="eager" decoding="async">'+
            '<figcaption><span>02 / IN HERE</span><strong>ALWAYS MUSIC</strong></figcaption>'+
          '</figure>'+
          '<span class="fi119-about-visual-note" aria-hidden="true">MOMENTS / INSPIRATION / EVERYDAY LIFE</span>'+
        '</div>'+
      '</div>'+
      '<div class="fi119-about-bottom">'+
        '<div class="fi119-about-personal">'+
          '<span class="fi119-about-smalltitle">A FEW THINGS ABOUT ME</span>'+
          '<div class="fi119-about-facts">'+
            '<p><b>01</b><span>I speak <strong>Italian, Slovenian and English.</strong> Different languages, different ways of seeing things.</span></p>'+
            '<p><b>02</b><span>I care about <strong>music and the details.</strong> The soundtrack matters just as much as the destination.</span></p>'+
            '<p><b>03</b><span>When I’m not on a screen, you’ll probably find me <strong>looking for somewhere new to explore.</strong></span></p>'+
          '</div>'+
        '</div>'+
        '<a class="fi119-about-cv" href="'+cv+'" target="_blank" rel="noopener noreferrer" aria-label="Open my professional CV on a separate website">'+
          '<span class="fi119-about-cv-kicker">THE PROFESSIONAL SIDE / SEPARATE SITE</span>'+
          '<strong>Want the<br><em>CV version?</em></strong>'+
          '<span class="fi119-about-cv-foot"><span>OPEN MY CURRICULUM</span><b aria-hidden="true">↗</b></span>'+
        '</a>'+
      '</div>'+
      '<footer class="fi119-about-end"><span>LUCA MAREGA / A LITTLE BIT OF EVERYTHING</span><span>THANKS FOR STOPPING BY.</span></footer>';
    cluster.appendChild(stage);
    cluster.classList.add("fi119-about-cluster-on");
    level.classList.add("fi119-about-on");
    const sign=level.querySelector(".fi95-level-sign");
    if(sign)sign.textContent="A LITTLE ABOUT ME";
    const title=level.querySelector(".fi95-level-title h2");
    if(title)title.textContent="ABOUT";
    const cap=level.querySelector(".fi95-level-caption");
    if(cap)cap.textContent="NOT JUST A JOB TITLE";
    const foot=level.querySelector(".fi95-level-foot span:first-child");
    if(foot)foot.textContent="PERSONAL NOTES / OPEN MY CV ↗";
  }
  function unmount(){
    if(!stage)return;
    stage.remove();stage=null;
    cluster.classList.remove("fi119-about-cluster-on");
    level.classList.remove("fi119-about-on");
  }
  new MutationObserver(()=>{
    if(level.dataset.category==="about")mount();
    else unmount();
  }).observe(level,{attributes:true,attributeFilter:["data-category"]});
  hub.dataset.fi119AboutReady="1";
  if(level.dataset.category==="about")mount();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();