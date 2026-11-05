/* PHASE 76 — PROJECT DNA / NINE ART-DIRECTED STUDIES
   Only the existing Project DNA panels receive new illustration layers.
   No changes to Work landing page, photo images, routes or GSAP. */
(() => {
  function init() {
    const scene=document.querySelector(".case-world");
    const dossier=scene?.querySelector(".s28-dossier");
    const panels=[...(dossier?.querySelectorAll(".s28-panel")||[])];
    if(!scene||!dossier||panels.length!==3||scene.dataset.s76Ready==="1")return;
    const art={
      redhouse:[
        `<path class="s76-solid" d="M60 430V215Q60 65 220 65T380 215V430Z"/>
         <path class="s76-line" d="M70 412V223Q70 75 220 75T370 223V412M112 410V216Q112 122 220 122T328 216V410M151 399V218Q151 164 220 164T289 218V399"/>
         <circle class="s76-key" cx="220" cy="249" r="52"/>
         <path class="s76-hair" d="M220 177V323M146 249H294"/>
         <path class="s76-keyline" d="M116 427H323"/>
         <path class="s76-line" d="M56 80H115M85 51V109M325 405H386M356 374V436"/>`,
        `<rect class="s76-solid" x="73" y="66" width="294" height="347" rx="92"/>
         <path class="s76-line" d="M99 396V167Q99 86 220 86T341 167V396M124 364V172Q124 113 220 113T316 172V364"/>
         <path class="s76-keyline" d="M139 380H301"/>
         <rect class="s76-white" x="159" y="265" width="123" height="68" rx="17"/>
         <path class="s76-line" d="M170 332V287Q170 263 193 263H247Q272 263 272 287V332M182 335H258M194 333V373H246V333M220 373V415M181 417H259"/>
         <circle class="s76-key" cx="220" cy="178" r="35"/>
         <path class="s76-hair" d="M144 134Q220 87 296 134"/>`,
        `<path class="s76-line" d="M64 105H376V374H64Z"/>
         <path class="s76-hair" d="M64 161H376"/>
         <circle class="s76-key" cx="93" cy="132" r="7"/><circle class="s76-key" cx="119" cy="132" r="7"/><circle class="s76-key" cx="145" cy="132" r="7"/>
         <rect class="s76-solid" x="92" y="190" width="151" height="156"/>
         <path class="s76-line" d="M110 328V288L146 241 173 274 211 215 230 242V328Z"/>
         <path class="s76-keyline" d="M260 215H348M260 238H321"/>
         <path class="s76-hair" d="M260 276H347M260 295H336M260 314H340"/>
         <rect class="s76-key" x="259" y="332" width="76" height="12" rx="6"/>
         <path class="s76-line" d="M174 384V420H265V384M149 422H290"/>`
      ],
      soca:[
        `<circle class="s76-white" cx="316" cy="125" r="70"/>
         <path class="s76-solid" d="M0 342L94 226 164 275 256 91 366 278 440 192V470H0Z"/>
         <path class="s76-line" d="M0 342L94 226 164 275 256 91 366 278 440 192M0 384L87 303 163 356 278 199 378 339 440 286"/>
         <path class="s76-hair" d="M222 154L256 91 291 162 261 150 244 141 236 162"/>
         <path class="s76-keyline" d="M0 426L90 361 167 404 278 315 370 404 440 365"/>
         <path class="s76-hair" d="M39 453H404"/>`,
        `<path class="s76-solid" d="M0 155Q105 215 199 142T440 96V480H0Z"/>
         <path class="s76-line" d="M0 186Q108 232 196 168T440 127M0 232Q109 275 196 220T440 190"/>
         <path class="s76-hair" d="M0 279Q108 317 196 265T440 241"/>
         <path class="s76-keyline" d="M280 47C219 128 327 166 221 250S115 340 211 460"/>
         <path class="s76-line" d="M299 54C243 138 343 166 245 259S134 343 230 461"/>
         <path class="s76-hair" d="M104 140L125 86 147 140M125 92V173M349 375L374 307 399 375M374 314V407"/>
         <circle class="s76-key" cx="280" cy="47" r="12"/>`,
        `<path class="s76-hair" d="M-25 123C92 28 180 101 248 52S387 35 470 116M-25 158C92 66 180 137 248 88S387 70 470 151M-25 192C92 101 180 174 248 122S387 105 470 186M-25 230C92 138 180 209 248 159S387 141 470 224M-25 268C92 175 180 247 248 196S387 177 470 263M-25 306C92 213 180 284 248 234S387 215 470 301M-25 344C92 251 180 321 248 273S387 252 470 339"/>
         <path class="s76-keyline" stroke-dasharray="5 16" d="M66 392C100 322 174 374 200 279S267 196 316 216S351 164 391 119"/>
         <circle class="s76-key" cx="66" cy="392" r="14"/><circle class="s76-key" cx="391" cy="119" r="17"/>
         <path class="s76-line" d="M375 119H407M391 103V135"/>`
      ],
      gianni:[
        `<path class="s76-solid" d="M68 108H373V414H68Z"/>
         <path class="s76-line" d="M79 404V151Q79 79 220 79T361 151V404M108 404V151Q108 108 220 108T332 151V404"/>
         <path class="s76-keyline" d="M111 210H330"/>
         <path class="s76-line" d="M114 211L135 239 157 211 178 239 199 211 220 239 241 211 262 239 284 211 305 239 326 211"/>
         <rect class="s76-solid" x="165" y="251" width="111" height="147" rx="51"/>
         <path class="s76-line" d="M166 398V301Q166 256 220 256T274 301V398"/>
         <circle class="s76-key" cx="252" cy="336" r="7"/>
         <path class="s76-hair" d="M45 421H398M157 159H286"/>`,
        `<circle class="s76-solid" cx="220" cy="242" r="171"/>
         <circle class="s76-line" cx="220" cy="242" r="155"/>
         <circle class="s76-hair" cx="220" cy="242" r="121"/>
         <circle class="s76-line" cx="220" cy="242" r="94"/>
         <path class="s76-keyline" d="M174 230C190 203 230 204 254 228S246 277 213 277 161 255 174 230M201 195Q254 175 280 234T229 306Q165 305 152 252T190 183M169 250Q203 295 257 250T240 199"/>
         <path class="s76-hair" d="M49 106V360M37 106V194M61 106V194M49 360V416M371 98V414M354 159Q371 117 387 159V294H354Z"/>
         <circle class="s76-key" cx="220" cy="244" r="8"/>`,
        `<rect class="s76-solid" x="81" y="68" width="292" height="351"/>
         <rect class="s76-line" x="104" y="83" width="248" height="323"/>
         <path class="s76-hair" d="M129 116H328M130 154H325"/>
         <path class="s76-keyline" d="M153 202H311"/>
         <path class="s76-line" d="M130 235H292M130 260H264M130 286H296M130 312H245"/>
         <path class="s76-hair" d="M131 342H326M132 360H289"/>
         <circle class="s76-key" cx="296" cy="378" r="14"/>
         <path class="s76-line" d="M63 435H381M63 450H312M63 53H121M91 23V85"/>`
      ]
    };
    const targets=panels.map(p=>p.querySelector(".s28-art"));
    if(targets.some(t=>!t))return;
    let rendered="";
    let observer=null;
    const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
    function paint(){
      const theme=scene.dataset.theme||"redhouse";
      if(rendered===theme||!art[theme])return;
      const drawings=art[theme].map(markup=>{
        const wrap=document.createElement("div");
        wrap.innerHTML='<svg class="s76-svg" viewBox="0 0 440 500" preserveAspectRatio="xMidYMid meet" focusable="false" aria-hidden="true">'+markup+'</svg>';
        return wrap.firstElementChild;
      });
      if(drawings.some(svg=>!svg||svg.tagName.toLowerCase()!=="svg"))return;
      targets.forEach((target,i)=>{
        target.querySelector(".s76-svg")?.remove();
        target.appendChild(drawings[i]);
      });
      rendered=theme;
      panels.forEach(panel=>{
        panel.classList.remove("s76-in");
        observer?.unobserve(panel);
        observer?.observe(panel);
      });
    }
    paint();
    if(!rendered)return;
    scene.dataset.s76Ready="1";
    scene.classList.add("s76-ready");
    if("IntersectionObserver" in window&&!reduced.matches){
      observer=new IntersectionObserver(entries=>{
        if(!scene.classList.contains("is-active"))return;
        for(const entry of entries){
          if(!entry.isIntersecting)continue;
          entry.target.classList.add("s76-in");
          observer.unobserve(entry.target);
        }
      },{root:scene,rootMargin:"0px 0px -10% 0px",threshold:.12});
      panels.forEach(panel=>observer.observe(panel));
    }
    new MutationObserver(paint).observe(scene,{attributes:true,attributeFilter:["data-theme"]});
    reduced.addEventListener?.("change",()=>{
      if(reduced.matches){
        observer?.disconnect();
        panels.forEach(panel=>panel.classList.remove("s76-in"));
      }
    });
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();