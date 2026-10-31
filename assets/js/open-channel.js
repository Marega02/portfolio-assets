/* STEP 29 — OPEN CHANNEL | Local-only project brief composer.
 * No backend calls, no storage and no publishing of personal email addresses.
 */
(() => {
  function init() {
    const about=document.querySelector(".a17-world");
    const shell=about?.querySelector(".s29-contact");
    if(!about||!shell||shell.dataset.s29Ready==="true")return;
    const buttons=[...shell.querySelectorAll(".s29-service")];
    const form=shell.querySelector(".s29-form");
    const name=shell.querySelector(".s29-input");
    const description=shell.querySelector(".s29-textarea");
    const selection=shell.querySelector(".s29-selected");
    const status=shell.querySelector(".s29-status");
    const copy=shell.querySelector(".s29-copy");
    if(buttons.length!==3||!form||!name||!description||!selection||!status||!copy)return;
    const topics={
      website:{label:"Website / Webflow",intro:"a new website or a Webflow project"},
      interaction:{label:"Interactive experience",intro:"an interactive digital experience"},
      ai:{label:"AI workflow & prompts",intro:"an AI workflow or custom prompting project"}
    };
    let selected="website";
    let sending=false;
    function pick(key){
      if(!Object.prototype.hasOwnProperty.call(topics,key))return;
      selected=key;
      selection.textContent=topics[key].label.toUpperCase();
      buttons.forEach(button=>{
        const active=button.dataset.s29Service===key;
        button.setAttribute("aria-pressed",String(active));
      });
      status.textContent="";
    }
    function buildBrief(){
      const sender=name.value.trim().slice(0,120);
      const details=description.value.trim().slice(0,2000);
      return [
        "Hello Luca,",
        "",
        "I'd like to talk about "+topics[selected].intro+".",
        "",
        "PROJECT BRIEF",
        "Type: "+topics[selected].label,
        "Name: "+(sender||"Not provided"),
        "Idea: "+(details||"I'd love to share a few details and discuss what's possible."),
        "",
        "Looking forward to hearing from you."
      ].join("\n");
    }
    async function copyMessage(){
      if(sending)return;
      sending=true;
      const message=buildBrief();
      try{
        if(!navigator.clipboard?.writeText)throw new Error("Clipboard API unavailable");
        await navigator.clipboard.writeText(message);
        status.textContent="BRIEF COPIED — READY TO SHARE.";
      }catch(error){
        let ok=false;
        const helper=document.createElement("textarea");
        helper.value=message;
        helper.setAttribute("readonly","");
        helper.style.cssText="position:fixed;left:-10000px;top:0;opacity:0";
        document.body.appendChild(helper);
        try{
          helper.focus();
          helper.select();
          ok=!!document.execCommand?.("copy");
        }catch(e){ok=false;}
        helper.remove();
        if(ok)status.textContent="BRIEF COPIED — READY TO SHARE.";
        else{
          status.textContent="COPY BLOCKED BY BROWSER. A COPY WINDOW WILL OPEN.";
          window.prompt("Copy your project brief:",message);
        }
      }finally{sending=false;}
    }
    buttons.forEach(button=>button.addEventListener("click",()=>pick(button.dataset.s29Service)));
    form.addEventListener("submit",event=>{event.preventDefault();copyMessage();});
    description.addEventListener("input",()=>{status.textContent="";});
    name.addEventListener("input",()=>{status.textContent="";});
    shell.dataset.s29Ready="true";
    pick("website");
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();