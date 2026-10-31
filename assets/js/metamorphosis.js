/* STEP 22 — METAMORPHOSIS
 * Light inline-SVG artwork, no external images, no changes to GSAP or navigation.
 */
(() => {
  const pictures = {
    work: '<svg viewBox="0 0 240 260" aria-hidden="true" focusable="false"><g transform="translate(15 12)"><rect x="12" y="16" width="188" height="224" fill="none" class="s22-ink" stroke-width=".8" opacity=".65"/><rect x="21" y="26" width="149" height="182" fill="none" class="s22-ink" stroke-width="1.5" transform="rotate(-11 95 116)"/><rect x="34" y="38" width="140" height="166" fill="none" class="s22-ink" stroke-width="2"/><path d="M34 94H174M95 38V204" fill="none" class="s22-ink" stroke-width="1"/><path d="M34 95L174 38V204Z" class="s22-accent" opacity=".36"/><rect x="115" y="99" width="66" height="90" class="s22-fill" transform="rotate(12 148 144)"/><path d="M115 144H181M148 99V189" stroke="#e6dbc5" stroke-width="1.5" transform="rotate(12 148 144)"/><circle cx="35" cy="37" r="5" class="s22-accent"/><path d="M16 224H200" fill="none" class="s22-accent-stroke" stroke-width="2"/></g></svg>',
    sound: '<svg viewBox="0 0 240 260" aria-hidden="true" focusable="false"><circle cx="119" cy="127" r="88" class="s22-fill"/><circle cx="119" cy="127" r="79" fill="none" stroke="#dddccd" stroke-width=".75" opacity=".5"/><circle cx="119" cy="127" r="68" fill="none" stroke="#dddccd" stroke-width=".7" opacity=".4"/><circle cx="119" cy="127" r="55" fill="none" stroke="#dddccd" stroke-width=".75" opacity=".5"/><circle cx="119" cy="127" r="30" class="s22-accent"/><circle cx="119" cy="127" r="19" fill="#ddd9c9"/><circle cx="119" cy="127" r="5" class="s22-fill"/><path d="M202 39V83L159 156" fill="none" class="s22-ink" stroke-width="7" stroke-linecap="round"/><path d="M202 39V83L159 156" fill="none" stroke="#b2c3b8" stroke-width="2" stroke-linecap="round"/><rect x="152" y="148" width="17" height="13" fill="#b19080" transform="rotate(-44 161 155)"/><path d="M37 228V214M45 228V220M53 228V204M61 228V212M69 228V192M77 228V213M85 228V197M93 228V207M101 228V187M109 228V211M117 228V201M125 228V217M133 228V194M141 228V212M149 228V224M157 228V205M165 228V193M173 228V213M181 228V203M189 228V221" class="s22-ink" fill="none" stroke-width="2.4"/></svg>',
    places: '<svg viewBox="0 0 240 260" aria-hidden="true" focusable="false"><g fill="none" class="s22-ink" stroke-width="1.4" opacity=".82"><path d="M-8 58C31 12 73 29 81 62S127 104 163 58 231 26 251 75"/><path d="M-7 78C32 27 63 39 71 68S127 125 172 76 232 49 253 94"/><path d="M-5 99C30 55 68 59 62 84S127 144 178 104 231 78 250 117"/><path d="M-7 126C39 84 85 83 95 112S123 169 178 135 237 126 250 152"/><path d="M-6 153C39 110 86 111 86 136S127 192 179 169 232 155 251 178"/><path d="M-5 180C49 143 87 144 93 166S137 224 181 196 226 177 251 211"/><path d="M0 209C44 168 85 184 97 197S129 245 171 219 222 200 245 235"/></g><path d="M29 195C69 166 79 118 119 123S155 77 192 47" fill="none" class="s22-accent-stroke" stroke-width="3" stroke-dasharray="5 6"/><circle cx="29" cy="195" r="9" fill="none" class="s22-ink" stroke-width="1.3"/><circle cx="29" cy="195" r="3" class="s22-accent"/><circle cx="192" cy="47" r="10" class="s22-accent"/><circle cx="192" cy="47" r="3" fill="#eae4d4"/><path d="M179 22H207M193 8V36" fill="none" class="s22-ink" stroke-width="1" opacity=".65"/></svg>',
    about: '<svg viewBox="0 0 240 260" aria-hidden="true" focusable="false"><rect x="20" y="18" width="200" height="220" fill="none" class="s22-ink" stroke-width="1.3"/><rect x="35" y="33" width="170" height="190" fill="none" class="s22-ink" stroke-width=".6" opacity=".58"/><circle cx="120" cy="128" r="79" fill="none" class="s22-ink" stroke-width="1.1"/><ellipse cx="120" cy="128" rx="94" ry="57" fill="none" class="s22-accent-stroke" stroke-width="1.7" transform="rotate(-28 120 128)"/><ellipse cx="120" cy="128" rx="65" ry="88" fill="none" class="s22-ink" stroke-width=".8" opacity=".55" transform="rotate(22 120 128)"/><text x="106" y="149" text-anchor="middle" font-family="Georgia,serif" font-size="92" font-style="italic" class="s22-fill">L</text><text x="159" y="158" text-anchor="middle" font-family="Georgia,serif" font-size="81" font-style="italic" class="s22-fill">M</text><circle cx="133" cy="114" r="8" class="s22-accent"/><path d="M13 128H227M120 13V243" fill="none" class="s22-ink" stroke-width=".7" opacity=".3"/><path d="M28 41H54M28 41V67M184 216H211V190" fill="none" class="s22-accent-stroke" stroke-width="2"/></svg>'
  };
  function init() {
    const hub=document.querySelector(".world-hub");
    const stage=hub?.querySelector(".world-stage");
    const sheet=stage?.querySelector(".stage-sheet");
    const links=hub?[...hub.querySelectorAll(".world-link")]:[];
    if(!hub||!stage||!sheet||links.length<4||hub.classList.contains("s22-ready"))return;
    const sky=document.createElement("div");
    sky.className="s22-atmosphere";
    sky.setAttribute("aria-hidden","true");
    const serial=document.createElement("div");
    serial.className="s22-serial";
    serial.setAttribute("aria-hidden","true");
    serial.textContent="L / M";
    const chrome=document.createElement("div");
    chrome.className="s22-chrome";
    chrome.setAttribute("aria-hidden","true");
    chrome.innerHTML='<span class="s22-chrome-label">PERSONAL FREQUENCY / LIVE</span><span class="s22-chrome-sub">01 — DESIGNED EXPERIENCES</span><span class="s22-chrome-line"></span>';
    hub.prepend(sky,serial,chrome);
    const board=document.createElement("div");
    board.className="s22-art";
    board.setAttribute("aria-hidden","true");
    const names=["work","sound","places","about"];
    names.forEach(name=>{
      const frame=document.createElement("div");
      frame.className="s22-frame";
      frame.dataset.scene=name;
      frame.innerHTML=pictures[name];
      board.appendChild(frame);
    });
    const note=document.createElement("span");
    note.className="s22-sheet-tag";
    note.setAttribute("aria-hidden","true");
    note.textContent="STUDIO / 01—04";
    const index=document.createElement("span");
    index.className="s22-sheet-index";
    index.setAttribute("aria-hidden","true");
    sheet.append(board,note,index);
    const captions=["01 — DESIGNED EXPERIENCES","02 — SOUND & RHYTHM","03 — PERSONAL ATLAS","04 — THE HUMAN SIDE"];
    const chromeSubtitle=chrome.querySelector(".s22-chrome-sub");
    function activate(i) {
      if(i<0||i>=4)return;
      hub.dataset.s22Scene=names[i];
      if(chromeSubtitle)chromeSubtitle.textContent=captions[i];
      index.textContent="0"+(i+1)+" / 04";
    }
    links.slice(0,4).forEach((link,i)=>{
      link.addEventListener("pointerenter",()=>activate(i),{passive:true});
      link.addEventListener("focusin",()=>activate(i));
      link.addEventListener("pointerdown",()=>activate(i),{passive:true});
    });
    activate(0);
    hub.classList.add("s22-ready");
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();