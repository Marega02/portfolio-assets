/* STEP 52.1 — WORK / ONE SOURCE FOR THE COVER AND THE GSAP MORPH
   No extra navigation, scroll handlers, observers, timers or animation loops.
   Replaces the three original preview image sources only after their new
   images have loaded; the site's original project navigation is unchanged.
*/
(() => {
  const base="https://marega02.github.io/portfolio-assets/assets/images/";
  const covers=[
    {url:base+"work-redhouse-52-1.svg",alt:"Red House Studio: fotografia del salone, reinterpretata come copertina editoriale."},
    {url:base+"work-soca-52-1.svg",alt:"Soča Valley: ponte e fiume smeraldo in una composizione fotografica editoriale."},
    {url:"https://images.pexels.com/photos/37389030/pexels-photo-37389030.jpeg?auto=compress&cs=tinysrgb&w=1400",fallback:base+"work-gianni-fallback-52-1.svg",alt:"Trattoria Da Gianni: immagine d'atmosfera di una cotoletta, fotografia illustrativa di Anthony Rahayel da Pexels."}
  ];
  function init(){
    const work=document.querySelector(".work-world");
    const frames=[...(work?.querySelectorAll(".work-preview .preview-visual")||[])];
    if(frames.length!==3)return;
    const photos=frames.map(frame=>frame.querySelector(".preview-image"));
    if(photos.some(x=>!x))return;
    photos.forEach((photo,index)=>{
      if(photo.dataset.s521Applied==="1")return;
      const spec=covers[index],original=photo.currentSrc||photo.src;
      function tryCover(url,usingFallback){
        const loader=new Image();
        loader.onload=()=>{
          if(photo.dataset.s521Applied==="1")return;
          photo.removeAttribute("srcset");
          photo.removeAttribute("sizes");
          photo.src=url;
          photo.alt=spec.alt;
          photo.decoding="async";
          photo.dataset.s521Applied="1";
          photo.dataset.s521Source=usingFallback?"local-fallback":"editorial-cover";
          photo.onerror=()=>{
            photo.onerror=null;
            if(!usingFallback&&spec.fallback){
              photo.dataset.s521Applied="";
              tryCover(spec.fallback,true);
            }else if(original){
              photo.src=original;
              photo.dataset.s521Source="original-fallback";
            }
          };
        };
        loader.onerror=()=>{
          if(!usingFallback&&spec.fallback)tryCover(spec.fallback,true);
        };
        loader.src=url;
      }
      tryCover(spec.url,false);
    });
  }
  if(document.readyState==="loading")
    document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();