/* PHASE 128 — SOUND / UK RAP & SONGWRITER GENRE RENAMING
   K95-style principle, consistent with our Places: photographs on a
   real cylindrical 3D carousel. Ten genres, 36-degree steps, drag/wheel
   and keyboard. Render only lightweight CSS transforms. Music is a
   visual exploration; nothing plays and no new chapter pages open.
   IMPORTANT: clones from shared chapter buttons so Places' live six
   original buttons are never moved / reordered by Sound.
*/
(()=>{
function init(){
  const hub=document.querySelector(".world-hub.fi95-ready");
  const level=hub?.querySelector(".fi95-level");
  const cluster=level?.querySelector(".fi95-cluster");
  const originals=[...(cluster?.querySelectorAll(".fi95-item")||[])]
    .sort((a,b)=>Number(a.className.match(/fi95-item-(\d+)/)?.[1]??99)-
                 Number(b.className.match(/fi95-item-(\d+)/)?.[1]??99))
    .slice(0,10);
  if(!hub||!level||!cluster||originals.length!==10||hub.dataset.fi126SoundReady==="1")return;

  const genres=["SOUL","HIP-HOP","ALTERNATIVE","JAZZ","R&B","FUNK",
    "ELECTRONIC","UK RAP","ROCK","SONGWRITERS"];
  const notes=["WARM VOICES","BEATS & WORDS","OUTSIDE THE LINES",
    "IMPROVISATION","THE SLOW GROOVE","FEEL THE GROOVE",
    "SYNTHETIC WORLDS","BRITISH RAP & GRIME","AMPLIFIED FEELING","WORDS & MELODY"];
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
  const sign=level.querySelector(".fi95-level-sign");
  const oldSign=sign?.textContent||"";
  const mod=n=>(n%10+10)%10;
  const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));


  // One explicitly identified personal favorite, plus three reference
  // records illustrating the visual direction. The references are NOT
  // presented as confirmed personal favorites.
  const soulRecords=[
    {name:"MAMA’S GUN",artist:"ERYKAH BADU",year:"2000",type:"YOUR PICK",
      cover:"https://coverartarchive.org/release/b6b5b654-5c60-4520-b099-4a50d33e2bd0/front-500",
      url:"https://open.spotify.com/album/3cADvHRdKniF9ELCn1zbGH"},
    {name:"GOLD",artist:"CLEO SOL",year:"2023",type:"DISCOVER",
      cover:"https://coverartarchive.org/release/bb28a4e3-0cac-4ac0-a620-25ad18bc3965/front-500",
      url:"https://open.spotify.com/album/67DWn1tZ245gendegv7Ioz"},
    {name:"MALIBU",artist:"ANDERSON .PAAK",year:"2016",type:"DISCOVER",
      cover:"https://coverartarchive.org/release/c73f73e9-8842-4dde-b171-2196b3968321/front-500",
      url:"https://open.spotify.com/album/6xNFuLOko8gjxi5kUAyGyM"},
    {name:"BLOOD",artist:"LIANNE LA HAVAS",year:"2015",type:"DISCOVER",
      cover:"https://coverartarchive.org/release/d72c852d-eeb1-4336-9136-51e74acaedb5/front-500",
      url:"https://open.spotify.com/album/1Fh5Y8ldo4PIW8Ija51BRK"}
  ];
  let room=null,roomFloor=null,roomGenre=-1,selectedRecord=0,tapSlot=-1;
  let floorClosingTimer=0,blockDuplicateClickUntil=0;
  const elevatorTime=()=>reduced.matches?0:680;
  const textOnly=s=>String(s).replace(/[&<>"']/g,ch=>
    ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  function updateRecord(index){
    if(!room||roomGenre!==0)return;
    selectedRecord=Math.max(0,Math.min(soulRecords.length-1,index));
    const data=soulRecords[selectedRecord];
    room.querySelectorAll(".fi123-album").forEach((el,j)=>{
      const on=j===selectedRecord;
      el.classList.toggle("fi123-album-active",on);
      el.setAttribute("aria-pressed",on?"true":"false");
    });
    const detail=room.querySelector(".fi123-record-detail");
    if(detail){
      detail.querySelector(".fi123-detail-index").textContent=
        "SELECTED RECORD / "+String(selectedRecord+1).padStart(2,"0")+"—04";
      detail.querySelector(".fi123-detail-name").textContent=data.name;
      detail.querySelector(".fi123-detail-artist").textContent=data.artist+"  /  "+data.year;
      detail.querySelector(".fi123-detail-kind").textContent=data.type==="YOUR PICK"?
        "PERSONAL FAVORITE":"CURATED EXAMPLE · TO CONFIRM";
      const link=detail.querySelector(".fi123-detail-link");
      link.href=data.url;link.setAttribute("aria-label","Open "+data.name+" by "+data.artist+" on Spotify");
    }
  }
  function buildRoom(index){
    const name=genres[index];
    const soul=index===0;
    const element=document.createElement("section");
    element.className="fi123-album-room";
    element.dataset.genre=name.toLowerCase().replace(/[^a-z]/g,"");
    element.setAttribute("aria-label",name+" album collection");
    const recordCards=soul?soulRecords.map((record,i)=>
      '<button type="button" class="fi123-album'+(i===0?' fi123-album-active':'')+
      '" data-album="'+i+'" aria-pressed="'+(i===0)+'" aria-label="Select '+textOnly(record.name)+' by '+textOnly(record.artist)+'">'+
        '<span class="fi123-record-sleeve">'+
          '<span class="fi123-record-disc" aria-hidden="true"></span>'+
          '<span class="fi123-record-art">'+
            '<span class="fi123-art-backup"><b>'+textOnly(record.name)+'</b><small>'+textOnly(record.artist)+'</small></span>'+
            '<img src="'+record.cover+'" alt="Album cover: '+textOnly(record.name)+' by '+textOnly(record.artist)+'" loading="eager" decoding="async">'+
          '</span>'+
        '</span>'+
        '<span class="fi123-album-caption"><strong>'+textOnly(record.name)+'</strong>'+
          '<small>'+textOnly(record.artist)+'</small></span>'+
      '</button>').join(""):[
      "01","02","03","04"
    ].map((n,i)=>
      '<div class="fi123-empty-record"><span class="fi123-empty-cover fi123-empty-'+i+'">'+
        '<i>'+n+'</i><strong>YOUR<br>RECORD</strong>'+
      '</span><span class="fi123-empty-note">A SPACE FOR YOUR PICK</span></div>'
    ).join("");
    element.innerHTML=
      '<div class="fi123-room-head">'+
        '<button class="fi123-room-back" type="button">↑ <span>BACK TO SOUND</span></button>'+
        '<nav class="fi126-crumbs" aria-label="You are here">'+
          '<span>01 HOME</span><i>／</i><span>02 SOUND</span><i>／</i>'+
          '<strong>03 '+textOnly(name)+'</strong>'+
        '</nav>'+
        '<span class="fi123-room-monogram" aria-hidden="true">LM<span>.</span></span>'+
      '</div>'+
      '<div class="fi123-room-content">'+
        '<div class="fi123-room-intro">'+
          '<span class="fi123-room-eyebrow">SOUND / '+textOnly(name)+' / THE RECORD SHELF</span>'+
          '<h3>'+textOnly(name)+'<em>.</em></h3>'+
          '<p>'+(soul?'A small record collection. One personal favourite, a few discoveries — and plenty of room for more.':
            'A space for the records that mean something. This shelf is waiting for a personal selection.')+'</p>'+
          '<span class="fi123-room-ledger">'+(soul?'01 PERSONAL PICK &nbsp; / &nbsp; 03 EXAMPLES':'PERSONAL PICKS / TO BE ADDED')+'</span>'+
        '</div>'+
        '<div class="fi123-album-grid" role="'+(soul?'group':'presentation')+'" aria-label="Album sleeves">'+recordCards+'</div>'+
        (soul?
         '<div class="fi123-record-detail">'+
           '<span class="fi123-detail-index">SELECTED RECORD / 01—04</span>'+
           '<strong class="fi123-detail-name">MAMA’S GUN</strong>'+
           '<span class="fi123-detail-artist">ERYKAH BADU / 2000</span>'+
           '<span class="fi123-detail-kind">PERSONAL FAVORITE</span>'+
           '<a class="fi123-detail-link" href="'+soulRecords[0].url+'" target="_blank" rel="noopener noreferrer">OPEN ON SPOTIFY <b aria-hidden="true">↗</b></a>'+
         '</div>':
         '<div class="fi123-record-detail fi123-empty-detail">'+
           '<span class="fi123-detail-index">YOUR OWN COLLECTION</span>'+
           '<strong class="fi123-detail-name">MAKE IT YOURS.</strong>'+
           '<span class="fi123-detail-artist">PERSONAL ALBUMS WILL LIVE HERE</span>'+
         '</div>')+
      '</div>'+
      '<div class="fi123-room-foot"><span>LEVEL 03 / YOUR RECORDS</span><span>↑ BACK TO SOUND · THEN HOME</span></div>'+
      '<div class="fi126-floor-rail" aria-hidden="true">'+
        '<span>01</span><i></i><span>02</span><i></i><strong>03</strong>'+
      '</div>';
    element.querySelector(".fi123-room-back").addEventListener("click",closeRoom);
    if(soul){
      element.querySelectorAll(".fi123-album").forEach((btn,i)=>{
        btn.addEventListener("click",()=>updateRecord(i));
        const img=btn.querySelector("img");
        if(img)img.addEventListener("error",()=>{img.hidden=true;btn.classList.add("fi123-cover-fallback")},{once:true});
      });
    }
    element.addEventListener("keydown",e=>{
      if(e.key==="Escape"){e.preventDefault();e.stopPropagation();closeRoom();}
      if(soul&&(e.key==="ArrowRight"||e.key==="ArrowLeft")){
        e.preventDefault();
        updateRecord((selectedRecord+(e.key==="ArrowRight"?1:soulRecords.length-1))%soulRecords.length);
        element.querySelectorAll(".fi123-album")[selectedRecord]?.focus({preventScroll:true});
      }
    });
    return element;
  }
  // The genre carousel is floor two. An album collection is floor three:
  // it is a SEPARATE full-viewport sibling, rather than a modal inside the
  // carousel. The same vertical direction is used as Home -> Sound.
  function openRoom(index){
    if(!stage||room||roomFloor||level.dataset.category!=="sound"||
       !hub.classList.contains("fi95-level-open"))return;
    if(floorClosingTimer){window.clearTimeout(floorClosingTimer);floorClosingTimer=0;}
    roomGenre=((index%10)+10)%10;
    selectedRecord=0;
    const floor=document.createElement("section");
    floor.className="fi95-level fi126-album-floor";
    floor.dataset.category="sound";
    floor.setAttribute("role","region");
    floor.setAttribute("aria-label",genres[roomGenre]+" — album collection, level three");
    floor.setAttribute("aria-hidden","true");
    floor.inert=true;
    room=buildRoom(roomGenre);
    room.classList.add("fi123-room-visible");
    floor.appendChild(room);
    hub.appendChild(floor);
    roomFloor=floor;
    if(roomGenre===0)updateRecord(0);
    // Force the starting bottom position before applying the elevator
    // class. Otherwise a browser may skip the transform transition.
    void floor.offsetHeight;
    window.requestAnimationFrame(()=>{
      if(roomFloor!==floor||level.dataset.category!=="sound")return;
      hub.classList.add("fi126-floor-open");
      level.inert=true;
      level.setAttribute("aria-hidden","true");
      floor.inert=false;
      floor.setAttribute("aria-hidden","false");
      room?.querySelector(".fi123-room-back")?.focus({preventScroll:true});
    });
  }
  function closeRoom(){
    if(!roomFloor)return;
    const oldFloor=roomFloor;
    room=null;
    roomGenre=-1;
    hub.classList.remove("fi126-floor-open");
    oldFloor.inert=true;
    oldFloor.setAttribute("aria-hidden","true");
    if(level.dataset.category==="sound"){
      level.inert=false;
      level.setAttribute("aria-hidden","false");
    }
    // Keep the album floor visibly present while it travels down. Remove
    // it only after the transition and restore the original genre focus.
    if(floorClosingTimer)window.clearTimeout(floorClosingTimer);
    floorClosingTimer=window.setTimeout(()=>{
      if(roomFloor===oldFloor){
        oldFloor.remove();
        roomFloor=null;
      }
      floorClosingTimer=0;
      if(stage&&level.dataset.category==="sound")stage.focus({preventScroll:true});
    },elevatorTime()+45);
  }
  function clearRoom(){
    if(floorClosingTimer){
      window.clearTimeout(floorClosingTimer);
      floorClosingTimer=0;
    }
    hub.classList.remove("fi126-floor-open");
    if(roomFloor)roomFloor.remove();
    roomFloor=null;room=null;roomGenre=-1;
    // The old album-modal states are not needed by the elevator.
    level.classList.remove("fi123-room-on");
    stage?.classList.remove("fi123-stage-away");
  }
  // Native Home owns Escape at document capture. The guard added to the
  // Home controller gives this floor the first opportunity to go up ONE
  // level instead of skipping straight back to Home.
  document.addEventListener("keydown",e=>{
    if(e.key!=="Escape"||!roomFloor)return;
    e.preventDefault();
    e.stopImmediatePropagation();
    closeRoom();
  },true);

  let stage=null,rotor=null,active=0,yaw=0;
  let dragging=false,pointerId=-1,startX=0,lastX=0,wheelAt=0;
  let lastDrag=false;

  function make(){
    const outer=document.createElement("div");
    outer.className="fi111-sound-stage";
    outer.tabIndex=0;
    outer.setAttribute("role","region");
    outer.setAttribute("aria-label","Ten music genres in a 3D rotating carousel. Drag, scroll or use arrow keys to explore.");
    outer.innerHTML=
      '<div class="fi111-scene-meta" aria-hidden="true">'+
        '<span>SONIC INDEX / 10 FREQUENCIES</span><span>LISTEN WITH YOUR EYES</span>'+
      '</div>'+
      '<div class="fi111-depth">'+
        '<div class="fi111-orbit-guide" aria-hidden="true"></div>'+
        '<div class="fi111-rotor"></div>'+
      '</div>'+
      '<div class="fi111-readout" aria-live="polite">'+
        '<span class="fi111-readout-kicker">NOW IN FOCUS / 01—10</span>'+
        '<strong class="fi111-readout-name">SOUL</strong>'+
        '<span class="fi111-readout-note">WARM VOICES</span>'+
      '</div>'+
      '<div class="fi111-side-note" aria-hidden="true"><span>SOUND AS A PLACE<br>TO GET LOST</span><i></i><span>VOL. 001</span></div>'+
      '<div class="fi111-instructions">'+
        '<span>DRAG / SCROLL TO EXPLORE <b aria-hidden="true">↔</b></span>'+
        '<span class="fi111-counter">01 / 10</span>'+
      '</div>';
    return {outer,rotor:outer.querySelector(".fi111-rotor")};
  }
  function radius(){
    if(!stage)return;
    const w=stage.clientWidth||window.innerWidth;
    const h=stage.clientHeight||window.innerHeight*.53;
    const r=clamp(Math.min(w*.31,h*.59),126,236);
    stage.style.setProperty("--fi111-radius",r.toFixed(1)+"px");
  }
  function apply(){
    if(rotor)rotor.style.transform="rotateX(-7deg) rotateY("+yaw.toFixed(2)+"deg)";
  }
  function update(){
    const i=mod(active);
    const name=stage?.querySelector(".fi111-readout-name");
    const note=stage?.querySelector(".fi111-readout-note");
    const kicker=stage?.querySelector(".fi111-readout-kicker");
    const count=stage?.querySelector(".fi111-counter");
    if(name)name.textContent=genres[i];
    if(note)note.textContent="";
    if(kicker)kicker.textContent="NOW IN FOCUS / "+String(i+1).padStart(2,"0")+"—10";
    if(count)count.textContent=String(i+1).padStart(2,"0")+" / 10";
    if(stage)stage.setAttribute("aria-label",genres[i]+" in front. Navigate ten genres by dragging, scrolling or arrow keys.");
    const levelCount=level.querySelector(".fi95-selection-count");
    if(levelCount)levelCount.textContent=String(i+1).padStart(2,"0")+" / 10";
    rotor?.querySelectorAll(".fi111-photo").forEach((photo,j)=>{
      photo.classList.toggle("fi111-front",j===i);
    });
  }
  function snap(i){
    active=i;
    yaw=-36*active;
    stage?.classList.remove("fi111-dragging");
    if(rotor)rotor.style.transition=reduced.matches?"none":".49s cubic-bezier(.22,.79,.25,1)";
    update();apply();
  }
  function advance(dir){
    if(!stage||dragging)return;
    snap(active+dir);
  }
  function onPointerDown(e){
    if(e.button!==0||!stage||level.dataset.category!=="sound"||room||roomFloor)return;
    const tapped=e.target instanceof Element?e.target.closest(".fi111-photo"):null;
    tapSlot=tapped?Number(tapped.dataset.soundSlot):-1;
    lastDrag=false;
    dragging=true;pointerId=e.pointerId;startX=lastX=e.clientX;
    stage.classList.add("fi111-dragging");
    if(rotor)rotor.style.transition="none";
    try{stage.setPointerCapture(pointerId)}catch(_){}
    if(e.cancelable)e.preventDefault();
  }
  function onPointerMove(e){
    if(room||!dragging||e.pointerId!==pointerId)return;
    const dx=e.clientX-lastX;
    lastX=e.clientX;
    if(Math.abs(lastX-startX)>11)lastDrag=true;
    yaw+=dx*.35;
    apply();
    if(e.cancelable)e.preventDefault();
  }
  function onPointerEnd(e){
    if(!dragging||(e&&e.pointerId!==pointerId))return;
    const distance=lastX-startX;
    if(Math.abs(distance)>11)lastDrag=true;
    dragging=false;pointerId=-1;
    const hit=tapSlot;tapSlot=-1;
    // A real tap on the FRONT card enters its album room. Side cards can
    // be rotated into view by tapping, while dragging keeps its meaning.
    if(Math.abs(distance)<11&&hit>=0){
      blockDuplicateClickUntil=performance.now()+380;
      const normalized=((hit%10)+10)%10;
      if(normalized===((active%10)+10)%10){snap(active);openRoom(normalized);}
      else{
        const forward=((normalized-active)%10+10)%10;
        snap(active+(forward<=5?forward:forward-10));
      }
      return;
    }
    const tentative=Math.round(-yaw/36);
    const next=Math.abs(distance)>29&&tentative===active?active-Math.sign(distance):tentative;
    snap(next);
  }
  function onWheel(e){
    if(room||roomFloor||level.dataset.category!=="sound"||!hub.classList.contains("fi95-level-open"))return;
    if(e.cancelable)e.preventDefault();
    e.stopPropagation();
    const delta=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY;
    if(Math.abs(delta)<2)return;
    const now=performance.now();
    if(now-wheelAt<375)return;
    wheelAt=now;
    advance(delta>0?1:-1);
  }
  function onKey(e){
    if(room||roomFloor||level.dataset.category!=="sound")return;
    if(e.key==="Enter"||e.key===" "){e.preventDefault();openRoom(((active%10)+10)%10);return;}
    if(e.key==="ArrowRight"||e.key==="ArrowDown"){e.preventDefault();advance(1)}
    else if(e.key==="ArrowLeft"||e.key==="ArrowUp"){e.preventDefault();advance(-1)}
    else if(e.key==="Home"){e.preventDefault();snap(0)}
    else if(e.key==="End"){e.preventDefault();snap(9)}
  }
  function mount(){
    if(stage||level.dataset.category!=="sound")return;
    const result=make();
    stage=result.outer;rotor=result.rotor;
    originals.forEach((original,i)=>{
      const copy=original.cloneNode(true);
      copy.classList.add("fi111-photo");
      copy.classList.remove("fi95-selected");
      copy.style.setProperty("--fi111-angle",(i*36)+"deg");
      copy.tabIndex=-1;
      copy.removeAttribute("aria-hidden");
      copy.removeAttribute("aria-disabled");
      copy.setAttribute("role","button");
      copy.setAttribute("aria-label","Open "+genres[i]+" album collection");
      copy.dataset.soundSlot=String(i);
      rotor.appendChild(copy);
    });
    cluster.appendChild(stage);
    cluster.classList.add("fi111-cluster-on");
    level.classList.add("fi111-sound-on");
    if(sign)sign.textContent="THE SOUND ARCHIVE";
    const footer=level.querySelector(".fi95-level-foot span:first-child");
    if(footer)footer.textContent="TEN GENRES / ONE PERSONAL FREQUENCY";
    stage.addEventListener("pointerdown",onPointerDown);
    stage.addEventListener("pointermove",onPointerMove);
    stage.addEventListener("pointerup",onPointerEnd);
    stage.addEventListener("pointercancel",onPointerEnd);
    stage.addEventListener("lostpointercapture",()=>onPointerEnd());
    stage.addEventListener("wheel",onWheel,{passive:false});
    stage.addEventListener("keydown",onKey);
    stage.addEventListener("click",e=>{
      // The image itself is the only entry point. Handle clicks in
      // capture phase because legacy Webflow listeners may consume them.
      const photo=e.target instanceof Element?e.target.closest(".fi111-photo"):null;
      if(photo&&!lastDrag&&!room&&!roomFloor&&
         performance.now()>blockDuplicateClickUntil&&level.dataset.category==="sound"){
        const i=Number(photo.dataset.soundSlot);
        if(Number.isInteger(i)&&i>=0&&i<genres.length){
          const current=mod(active);
          if(i===current)openRoom(i);
          else{
            const delta=mod(i-current);
            snap(active+(delta<=5?delta:delta-10));
          }
        }
      }
      e.preventDefault();
      e.stopPropagation();
    },true);
    radius();snap(active);
  }
  function unmount(){
    if(!stage)return;
    dragging=false;pointerId=-1;lastDrag=false;
    clearRoom();
    stage.remove();stage=null;rotor=null;
    cluster.classList.remove("fi111-cluster-on");
    level.classList.remove("fi111-sound-on");
    if(sign)sign.textContent=oldSign;
  }
  new MutationObserver(()=>{
    if(level.dataset.category==="sound")mount();
    else unmount();
  }).observe(level,{attributes:true,attributeFilter:["data-category"]});
  window.addEventListener("resize",radius,{passive:true});
  hub.dataset.fi126SoundReady="1";
  if(level.dataset.category==="sound")mount();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
else init();
})();