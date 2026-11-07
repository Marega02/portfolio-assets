/* PHASE 82 — FOUR CHAPTER SIGNATURES
   Four original SVG engravings in the ORIGINAL Step 27 chapter gate.
   No new screen, event handlers, timers, navigation or DOM reparenting.
   Step 27 controls scene selection and animation restarts. */
(() => {
  function init(){
    const gate=document.querySelector(".s27-sequence");
    if(!gate||gate.dataset.s82Ready==="1")return;
    const art={
      work:`
        <svg viewBox="0 0 600 600" aria-hidden="true" focusable="false">
          <g class="s82-solid"><rect x="107" y="107" width="375" height="375" rx="6"/></g>
          <g class="s82-draw">
            <path d="M82 88H506V514H82ZM106 112H482V490H106Z"/>
            <path d="M106 180H482M106 386H482M176 180V386M106 244H482M298 180V386"/>
            <path d="M135 142H241M365 142H452M135 413H278M135 438H358"/>
            <path d="M148 323L215 271 258 301 352 209 430 283"/>
            <circle cx="385" cy="244" r="40"/>
            <path d="M58 65H124M91 32V98M475 492H541M508 459V525"/>
          </g>
          <g class="s82-node"><circle cx="215" cy="271" r="5"/><circle cx="352" cy="209" r="5"/></g>
        </svg>`,
      sound:`
        <svg viewBox="0 0 600 600" aria-hidden="true" focusable="false">
          <g class="s82-solid"><circle cx="300" cy="291" r="238"/></g>
          <g class="s82-draw">
            <circle cx="300" cy="291" r="225"/>
            <circle cx="300" cy="291" r="193"/>
            <circle cx="300" cy="291" r="156"/>
            <circle cx="300" cy="291" r="118"/>
            <circle cx="300" cy="291" r="76"/>
            <path d="M50 477V451M70 477V425M90 477V456M110 477V397M130 477V439M150 477V404M170 477V448M190 477V390M210 477V435M230 477V401M250 477V461M270 477V409M290 477V380M310 477V428M330 477V397M350 477V445M370 477V388M390 477V427M410 477V403M430 477V460M450 477V401M470 477V431M490 477V408M510 477V443M530 477V421"/>
            <path d="M32 522H568M32 540H429"/>
            <path d="M412 62L527 62 446 194"/>
          </g>
          <g class="s82-node"><circle cx="300" cy="291" r="11"/><circle cx="446" cy="194" r="6"/></g>
        </svg>`,
      places:`
        <svg viewBox="0 0 600 600" aria-hidden="true" focusable="false">
          <g class="s82-solid"><path d="M63 115L232 57 365 157 532 86V509L365 551 232 468 63 538Z"/></g>
          <g class="s82-draw">
            <path d="M63 115L232 57 365 157 532 86V509L365 551 232 468 63 538Z"/>
            <path d="M232 57V468M365 157V551"/>
            <path d="M41 211C128 138 191 220 248 170S386 145 560 183"/>
            <path d="M41 245C128 172 191 253 248 203S386 178 560 218"/>
            <path d="M41 278C128 205 191 286 248 236S386 211 560 251"/>
            <path d="M41 312C128 239 191 320 248 270S386 245 560 284"/>
            <path d="M41 346C128 273 191 353 248 304S386 279 560 317"/>
            <path d="M41 380C128 307 191 386 248 337S386 313 560 351"/>
            <path d="M41 414C128 341 191 420 248 370S386 347 560 385"/>
            <path d="M95 475C191 408 242 455 296 366S425 257 491 190"/>
          </g>
          <g class="s82-node"><circle cx="95" cy="475" r="8"/><circle cx="491" cy="190" r="9"/></g>
        </svg>`,
      about:`
        <svg viewBox="0 0 600 600" aria-hidden="true" focusable="false">
          <g class="s82-solid"><circle cx="301" cy="292" r="191"/></g>
          <g class="s82-draw">
            <circle cx="301" cy="292" r="217"/>
            <circle cx="301" cy="292" r="178"/>
            <ellipse cx="301" cy="292" rx="248" ry="105" transform="rotate(-30 301 292)"/>
            <ellipse cx="301" cy="292" rx="130" ry="258" transform="rotate(24 301 292)"/>
            <ellipse cx="301" cy="292" rx="201" ry="77" transform="rotate(45 301 292)"/>
            <path d="M50 84H155M102 32V137M470 450H574M522 397V502"/>
            <path d="M136 499H454M179 522H421"/>
          </g>
          <g class="s82-node"><circle cx="301" cy="292" r="9"/><circle cx="467" cy="151" r="6"/></g>
        </svg>`
    };
    const wrap=document.createElement("div");
    wrap.className="s82-signatures";
    wrap.setAttribute("aria-hidden","true");
    for(const key of ["work","sound","places","about"]){
      const holder=document.createElement("div");
      holder.className="s82-signature";
      holder.dataset.s82=key;
      holder.innerHTML=art[key];
      wrap.appendChild(holder);
    }
    const foot=document.createElement("div");
    foot.className="s82-footnote";
    foot.setAttribute("aria-hidden","true");
    const rule=document.createElement("span");
    rule.className="s82-footnote-rule";
    const copy=document.createElement("span");
    copy.textContent="IDENTITY / IN MOTION";
    foot.append(rule,copy);
    gate.append(wrap,foot);
    if(wrap.querySelectorAll("svg").length!==4){
      wrap.remove();foot.remove();return;
    }
    gate.dataset.s82Ready="1";
    gate.classList.add("s82-ready");
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();