/* STEP 21 — SIGNAL / visual state only, never intercepts navigation */
(() => {
  function init(){
    const hub=document.querySelector(".world-hub");
    const stage=hub?.querySelector(".world-stage");
    const links=hub?[...hub.querySelectorAll(".world-link")]:[];
    if(!hub||!stage||links.length<4||hub.dataset.s21Ready==="true")return;
    hub.dataset.s21Ready="true";
    const names=["work","sound","places","about"];
    function setScene(index){
      if(index<0||index>=names.length)return;
      hub.dataset.s21World=names[index];
      stage.dataset.s21Index=String(index+1).padStart(2,"0");
    }
    links.slice(0,4).forEach((link,index)=>{
      link.addEventListener("pointerenter",()=>setScene(index),{passive:true});
      link.addEventListener("focusin",()=>setScene(index));
    });
    setScene(0);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();
