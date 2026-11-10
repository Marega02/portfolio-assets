/* PHASE 123 — SOUND / INTERACTIVE GENRE TO ALBUM ROOM
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
  if(!hub||!level||!cluster||originals.length!==10||hub.dataset.fi123SoundReady==="1")return;

  const genres=["SOUL","HIP-HOP","ALTERNATIVE","JAZZ","R&B","FUNK",
    "ELECTRONIC","HOUSE","ROCK","AMBIENT"];
  const notes=["WARM VOICES","BEATS & WORDS","OUTSIDE THE LINES",
    "IMPROVISATION","THE SLOW GROOVE","FEEL THE GROOVE",
    "SYNTHETIC WORLDS","AFTER DARK","AMPLIFIED FEELING","OPEN SPACE"];
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
      url:"https://music.apple.com/us/album/mamas-gun/1440755899"},
    {name:"GOLD",artist:"CLEO SOL",year:"2023",type:"DISCOVER",
      cover:"https://coverartarchive.org/release/bb28a4e3-0cac-4ac0-a620-25ad18bc3965/front-500",
      url:"https://music.apple.com/us/album/gold/1708971575"},
    {name:"MALIBU",artist:"ANDERSON .PAAK",year:"2016",type:"DISCOVER",
      cover:"https://coverartarchive.org/release/c73f73e9-8842-4dde-b171-2196b3968321/front-500",
      url:"https://music.apple.com/us/album/malibu/1074098515"},
    {name:"BLOOD",artist:"LIANNE LA HAVAS",year:"2015",type:"DISCOVER",
      cover:"https://coverartarchive.org/release/d72c852d-eeb1-4336-9136-51e74acaedb5/front-500",
      url:"https://music.apple.com/us/album/blood/986317401"}
  ];
  let room=null,roomGenre=-1,selectedRecord=0,tapSlot=-1;
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
      link.href=data.url;link.setAttribute("aria-label","Open "+data.name+" by "+data.artist+" on Apple Music");
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
        '<button class="fi123-room-back" type="button">← <span>BACK TO GENRES</span></button>'+
        '<span class="fi123-room-counter">VOL. 01 / '+textOnly(name)+'</span>'+
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
           '<a class="fi123-detail-link" href="'+soulRecords[0].url+'" target="_blank" rel="noopener noreferrer">EXPLORE ALBUM <b aria-hidden="true">↗</b></a>'+
         '</div>':
         '<div class="fi123-record-detail fi123-empty-detail">'+
           '<span class="fi123-detail-index">YOUR OWN COLLECTION</span>'+
           '<strong class="fi123-detail-name">MAKE IT YOURS.</strong>'+
           '<span class="fi123-detail-artist">PERSONAL ALBUMS WILL LIVE HERE</span>'+
         '</div>')+
      '</div>'+
      '<div class="fi123-room-foot"><span>YOUR MUSIC / YOUR WORLD</span><span>THE SOUND ARCHIVE — AN ONGOING COLLECTION</span></div>';
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
  function openRoom(index){
    if(!stage||room||level.dataset.category!=="sound")return;
    roomGenre=((index%10)+10)%10;
    selectedRecord=0;
    room=buildRoom(roomGenre);
    cluster.appendChild(room);
    stage.classList.add("fi123-stage-away");
    level.classList.add("fi123-room-on");
    if(roomGenre===0)updateRecord(0);
    window.requestAnimationFrame(()=>room?.classList.add("fi123-room-visible"));
    room.querySelector(".fi123-room-back")?.focus({preventScroll:true});
  }
  function closeRoom(){
    if(!room)return;
    const old=room;
    room=null;
    roomGenre=-1;
    level.classList.remove("fi123-room-on");
    stage?.classList.remove("fi123-stage-away");
    old.classList.remove("fi123-room-visible");
    window.setTimeout(()=>old.remove(),260);
    stage?.focus({preventScroll:true});
  }
  function clearRoom(){
    if(room){room.remove();room=null;roomGenre=-1;}
    cluster.querySelectorAll(".fi123-album-room").forEach(e=>e.remove());
    level.classList.remove("fi123-room-on");
    stage?.classList.remove("fi123-stage-away");
  }

  let stage=null,rotor=null,active=0,yaw=0;
  let dragging=false,pointerId=-1,startX=0,lastX=0,wheelAt=0;

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
      '<button type="button" class="fi123-enter" aria-label="Open Soul album collection">OPEN SOUL COLLECTION ↗</button>'+
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
    const entry=stage?.querySelector(".fi123-enter");
    if(entry){
      entry.textContent="EXPLORE "+genres[i]+" ↗";
      entry.setAttribute("aria-label","Open "+genres[i]+" album collection");
    }
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
    if(e.button!==0||!stage||level.dataset.category!=="sound"||room)return;
    const entry=e.target instanceof Element?e.target.closest(".fi123-enter"):null;
    const tapped=e.target instanceof Element?e.target.closest(".fi111-photo"):null;
    tapSlot=entry?((active%10)+10)%10:tapped?Number(tapped.dataset.soundSlot):-1;
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
    yaw+=dx*.35;
    apply();
    if(e.cancelable)e.preventDefault();
  }
  function onPointerEnd(e){
    if(!dragging||(e&&e.pointerId!==pointerId))return;
    const distance=lastX-startX;
    dragging=false;pointerId=-1;
    const hit=tapSlot;tapSlot=-1;
    // A real tap on the FRONT card enters its album room. Side cards can
    // be rotated into view by tapping, while dragging keeps its meaning.
    if(Math.abs(distance)<11&&hit>=0){
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
    if(room||level.dataset.category!=="sound"||!hub.classList.contains("fi95-level-open"))return;
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
    if(room||level.dataset.category!=="sound")return;
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
    stage.addEventListener("click",e=>{e.preventDefault();e.stopPropagation()},true);
    radius();snap(active);
  }
  function unmount(){
    if(!stage)return;
    dragging=false;pointerId=-1;
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
  hub.dataset.fi123SoundReady="1";
  if(level.dataset.category==="sound")mount();
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
else init();
})();