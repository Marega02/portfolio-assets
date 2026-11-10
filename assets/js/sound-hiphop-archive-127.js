/* PHASE 127 — HIP-HOP / THE RECORD ARCHIVE
 * Enlarges the existing HIP-HOP album floor (second genre in Sound).
 * Preserves Phase126 digital elevator, all ten original genres, Spotify
 * links and the existing Soul room. 11 artists, 46 artist-led records.
 * Where a precise Spotify album ID is verified, official oEmbed supplies
 * its real album art only when visible. Otherwise a typographic fallback
 * and a clearly labelled Spotify search link are provided.
 * No unconfirmed album is called a personal favorite.
 */
(()=>{
  const groups=[
    ["KANYE WEST","PROGRESSIVE / CHICAGO",[
      ["The College Dropout",2004,"4Uv86qWpGTxf7fU7lG5X6F"],
      ["Late Registration",2005,"5ll74bqtkcXlKE7wwkMq4g"],
      ["Graduation",2007,"6V0srAdQfEIarFvIxAYilH"],
      ["808s & Heartbreak",2008,"3WFTGIO6E3Xh4paEOBY9OU"],
      ["My Beautiful Dark Twisted Fantasy",2010,"20r762YmB5HeofjMCiPMLv"],
      ["Yeezus",2013,null],
      ["The Life of Pablo",2016,"4xM1pUHZp9HsuKNxyOQDR0"]
    ]],
    ["TRAVIS SCOTT","PSYCHEDELIC / TRAP",[
      ["Rodeo",2015,"7EGY16IWSHpPdoWazUyL9R"],
      ["Birds in the Trap Sing McKnight",2016,"42WVQWuf1teDysXiOupIZt"],
      ["ASTROWORLD",2018,"41GuZcammIkupMPKH2OJ6I"],
      ["UTOPIA",2023,"6mpTzL80F11TaeU79loRyJ"],
      ["DAYS BEFORE RODEO",2014,null]
    ]],
    ["JAY-Z","NEW YORK / ESSENTIALS",[
      ["Reasonable Doubt",1996,"6Dx7f5g0LmVvv2qYXMoRt5"],
      ["The Blueprint",2001,"54I5tDCMjnNVWSENHg8EDH"],
      ["The Black Album",2003,"4FWvo9oS4gRgHtAwDwUjiO"],
      ["4:44",2017,null]
    ]],
    ["KENDRICK LAMAR","WEST COAST / STORYTELLING",[
      ["Section.80",2011,"13WjgUEEAQp0d9JqojlWp1"],
      ["good kid, m.A.A.d city",2012,"0Oq3mWfexhsjUh0aNNBB5u"],
      ["To Pimp a Butterfly",2015,"7ycBtnsMtyVbbwTfJwRjSP"],
      ["DAMN.",2017,"4eLPsYPBmXABThSJ821sqY"],
      ["GNX",2024,"0hvT3yIEysuuvkK73vgdcW"]
    ]],
    ["DRAKE","TORONTO / RAP & R&B",[
      ["Take Care",2011,"0NGwRz0semIXUCSxR0uffa"],
      ["Nothing Was the Same",2013,"5mz0mJxb80gqJIcRf9LGHJ"],
      ["If You're Reading This It's Too Late",2015,"0ptlfJfwGTy0Yvrk14JK1I"],
      ["Views",2016,"40GMAhriYJRO1rsY4YdrZb"],
      ["Her Loss",2022,"41NvzpIHKpaYHKnh1bF3TN"]
    ]],
    ["DAVE","UK RAP / LONDON",[
      ["PSYCHODRAMA",2019,"4GrFuXwRmEBJec22p58fsD"],
      ["We're All Alone in This Together",2021,"6HwzIlrCDq3WF9vMq8meqG"],
      ["The Boy Who Played the Harp",2025,"24f1GFXCkViGoRpmGqlSSl"]
    ]],
    ["2PAC","WEST COAST / CLASSICS",[
      ["Me Against the World",1995,null],
      ["All Eyez on Me",1996,null],
      ["The Don Killuminati: The 7 Day Theory",1996,null]
    ]],
    ["THE NOTORIOUS B.I.G.","BROOKLYN / CLASSICS",[
      ["Ready to Die",1994,"2HTbQ0RHwukKVXAlTmCZP2"],
      ["Life After Death",1997,"6uMVAiciTpTyrQn5QJDPJM"]
    ]],
    ["WU-TANG CLAN","SHAOLIN / CLASSICS",[
      ["Enter the Wu-Tang (36 Chambers)",1993,"6acGx168JViE5LLFR1rGRE"],
      ["Wu-Tang Forever",1997,null],
      ["The W",2000,"1SoAlvvmwTnoYjy7eTLCI0"]
    ]],
    ["FUTURE","ATLANTA / TRAP",[
      ["DS2",2015,"0fUy6IdLHDpGNwavIlhEsl"],
      ["HNDRXX",2017,"2vStLk2BcPSNEjyrKmuPM4"],
      ["I NEVER LIKED YOU",2022,"6ViO9Wx6dWzeUq6DmGTaHl"],
      ["WE DON'T TRUST YOU",2024,"4iqbFIdGOTzXeDtt9owjQn"]
    ]],
    ["METRO BOOMIN","PRODUCTION / ATLANTA",[
      ["NOT ALL HEROES WEAR CAPES",2018,"1zNr37qd3iZJ899byrTkcj"],
      ["HEROES & VILLAINS",2022,"5aQFjsRw6rieK5oDNgGRyB"],
      ["SAVAGE MODE II",2020,null],
      ["Without Warning",2017,null],
      ["WE STILL DON'T TRUST YOU",2024,"3bSNhnaQQXpC639OQ4pMyP"]
    ]]
  ];
  const safe=s=>String(s).replace(/[&<>"']/g,c=>
    ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const records=groups.flatMap(([artist,sub,albums],group)=>
    albums.map(([title,year,id],ordinal)=>{
      const spotify=id?
        "https://open.spotify.com/album/"+id:
        "https://open.spotify.com/search/"+encodeURIComponent(artist+" "+title);
      return {artist,sub,group,title,year,id,spotify,ordinal,number:0};
    })
  );
  records.forEach((r,i)=>r.number=i+1);
  const thumbnails=new Map();
  const attached=new WeakSet();
  const labelNum=n=>String(n).padStart(2,"0");
  const hueColors=[
    "#8f7464","#835f67","#c4a87c","#7e9a8f","#9b8b9a","#a88c7b",
    "#8e7375","#ab856a","#938e77","#877eab","#8a7878"
  ];
  let scrollObserver=null;
  function albumLink(r){return r.spotify;}
  function getCover(r){
    if(!r.id)return Promise.resolve(null);
    if(thumbnails.has(r.id))return thumbnails.get(r.id);
    const request=fetch("https://open.spotify.com/oembed?url="+
      encodeURIComponent("https://open.spotify.com/album/"+r.id),
      {mode:"cors",credentials:"omit"})
      .then(response=>{if(!response.ok)throw new Error("Artwork unavailable");return response.json();})
      .then(data=>typeof data.thumbnail_url==="string"&&/^https:\/\//.test(data.thumbnail_url)?data.thumbnail_url:null)
      .catch(()=>null);
    thumbnails.set(r.id,request);
    return request;
  }
  function fillCover(node,r){
    if(attached.has(node)||!r.id)return;
    attached.add(node);
    getCover(r).then(src=>{
      if(!src||!node.isConnected)return;
      const img=document.createElement("img");
      img.className="fi127-real-art";
      img.src=src;
      img.alt="Cover art: "+r.title+" — "+r.artist;
      img.loading="lazy";
      img.decoding="async";
      img.onerror=()=>img.remove();
      node.appendChild(img);
      const spotlight=node.closest(".fi127-record")?.classList.contains("fi127-record-active");
      if(spotlight){
        const spot=node.closest(".fi127-archive")?.querySelector(".fi127-spotlight-art");
        if(spot&&spot.dataset.record===String(r.number))addSpotlightImage(spot,src,r);
      }
    });
  }
  function addSpotlightImage(spot,src,r){
    if(!spot||!src||!spot.isConnected)return;
    const img=document.createElement("img");
    img.src=src;img.alt="Album cover: "+r.title;img.decoding="async";
    img.className="fi127-real-art fi127-spotlight-image";
    img.onerror=()=>img.remove();
    spot.querySelector(".fi127-real-art")?.remove();
    spot.appendChild(img);
  }
  function buildCard(r){
    const button=document.createElement("button");
    button.type="button";
    button.className="fi127-record";
    button.dataset.record=String(r.number);
    button.setAttribute("aria-label","Select "+r.title+" by "+r.artist);
    button.setAttribute("aria-pressed","false");
    button.innerHTML=
      '<span class="fi127-record-frame">'+
        '<span class="fi127-record-art" data-record="'+r.number+'" style="--fi127-tint:'+hueColors[r.group]+'">'+
          '<span class="fi127-record-placeholder">'+
            '<span>'+safe(r.artist)+'</span>'+
            '<strong>'+safe(r.title)+'</strong>'+
            '<small>'+r.year+'</small>'+
          '</span>'+
        '</span>'+
        '<i class="fi127-record-open" aria-hidden="true">↗</i>'+
      '</span>'+
      '<span class="fi127-record-caption">'+
        '<strong>'+safe(r.title)+'</strong>'+
        '<small>'+safe(r.artist)+' · '+r.year+'</small>'+
      '</span>';
    return button;
  }
  function install(room){
    if(!room||room.dataset.fi127Ready==="1")return;
    room.dataset.fi127Ready="1";
    room.classList.add("fi127-archive");
    const name=room.querySelector(".fi123-room-head .fi126-crumbs strong");
    if(name)name.textContent="03 HIP-HOP";
    const foot=room.querySelector(".fi123-room-foot");
    if(foot)foot.innerHTML=
      '<span>YOUR SOUND / 11 ARTISTS</span>'+
      '<span>AN ARTIST-LED SELECTION · NOT A VERIFIED SAVED LIBRARY</span>';
    room.querySelector(".fi123-room-content")?.remove();

    const main=document.createElement("div");
    main.className="fi127-content";
    main.innerHTML=
      '<div class="fi127-intro">'+
        '<div><span class="fi127-kicker">SOUND / LEVEL 03 / VOL. 02</span>'+
        '<h3>HIP-HOP<span>.</span></h3></div>'+
        '<div class="fi127-intro-side"><strong>'+records.length+' RECORDS <i>/</i> 11 ARTISTS</strong>'+
        '<p>From golden-era New York to London, Houston, Compton and Atlanta. '+
        'An evolving archive built around the artists you named.</p></div>'+
      '</div>'+
      '<div class="fi127-filter-wrap">'+
        '<span class="fi127-filter-label">JUMP TO ARTIST</span>'+
        '<div class="fi127-filters" role="group" aria-label="Filter albums by artist"></div>'+
      '</div>'+
      '<div class="fi127-body">'+
        '<div class="fi127-library" tabindex="0" aria-label="Hip-hop album archive, scroll to see more"></div>'+
        '<aside class="fi127-spotlight" aria-label="Selected album">'+
          '<span class="fi127-spotlight-kicker">IN FOCUS / YOUR SELECTION</span>'+
          '<div class="fi127-spotlight-art"></div>'+
          '<span class="fi127-spotlight-year"></span>'+
          '<strong class="fi127-spotlight-title"></strong>'+
          '<span class="fi127-spotlight-artist"></span>'+
          '<a class="fi127-spotify" href="https://open.spotify.com" target="_blank" rel="noopener noreferrer">'+
            '<span>OPEN ON SPOTIFY</span><b aria-hidden="true">↗</b></a>'+
          '<span class="fi127-spotlight-note">YOUR PICKS, EXPLORED THROUGH ARTISTS</span>'+
        '</aside>'+
      '</div>';
    const existingFoot=room.querySelector(".fi123-room-foot");
    room.insertBefore(main,existingFoot);
    const scroller=main.querySelector(".fi127-library");
    const bar=main.querySelector(".fi127-filters");
    const spot=main.querySelector(".fi127-spotlight");
    let activeGroup="all", selected=0;
    const tabs=[["ALL RECORDS","all"],...groups.map((g,i)=>[g[0],String(i)])];

    function selectRecord(record){
      selected=record.number;
      scroller.querySelectorAll(".fi127-record").forEach(el=>{
        const yes=el.dataset.record===String(selected);
        el.classList.toggle("fi127-record-active",yes);
        el.setAttribute("aria-pressed",String(yes));
      });
      spot.querySelector(".fi127-spotlight-kicker").textContent=
        "IN FOCUS / "+labelNum(selected)+"—"+labelNum(records.length);
      const cover=spot.querySelector(".fi127-spotlight-art");
      cover.dataset.record=String(selected);
      cover.style.setProperty("--fi127-tint",hueColors[record.group]);
      cover.innerHTML='<span class="fi127-record-placeholder">'+
        '<span>'+safe(record.artist)+'</span>'+
        '<strong>'+safe(record.title)+'</strong>'+
        '<small>'+record.year+'</small></span>';
      if(record.id)getCover(record).then(src=>{
        if(src&&cover.dataset.record===String(record.number))addSpotlightImage(cover,src,record);
      });
      spot.querySelector(".fi127-spotlight-year").textContent=record.year+" / "+record.sub;
      spot.querySelector(".fi127-spotlight-title").textContent=record.title;
      spot.querySelector(".fi127-spotlight-artist").textContent=record.artist;
      const link=spot.querySelector(".fi127-spotify");
      link.href=albumLink(record);
      link.querySelector("span").textContent=record.id?"OPEN ON SPOTIFY":"FIND ON SPOTIFY";
      link.setAttribute("aria-label",(record.id?"Open ":"Find ")+record.title+" by "+record.artist+" on Spotify");
    }
    function setupArtObserver(){
      if(scrollObserver)scrollObserver.disconnect();
      scrollObserver=new IntersectionObserver(entries=>{
        for(const entry of entries){
          if(!entry.isIntersecting)continue;
          const art=entry.target;
          scrollObserver?.unobserve(art);
          const record=records[Number(art.dataset.record)-1];
          if(record)fillCover(art,record);
        }
      },{root:scroller,rootMargin:"140px 0px 250px",threshold:0.01});
      scroller.querySelectorAll(".fi127-record-art[data-record]").forEach(node=>scrollObserver.observe(node));
    }
    function render(){
      if(scrollObserver)scrollObserver.disconnect();
      scroller.innerHTML="";
      for(let group=0;group<groups.length;group++){
        if(activeGroup!=="all"&&activeGroup!==String(group))continue;
        const [artist,sub]=groups[group];
        const groupRecords=records.filter(r=>r.group===group);
        const section=document.createElement("section");
        section.className="fi127-artist-section";
        section.innerHTML='<div class="fi127-artist-head">'+
          '<span class="fi127-artist-count">'+labelNum(group+1)+' / 11</span>'+
          '<h4>'+safe(artist)+'</h4>'+
          '<span class="fi127-artist-context">'+safe(sub)+'</span>'+
          '<span class="fi127-artist-total">'+groupRecords.length+' RECORDS</span></div>';
        const gallery=document.createElement("div");gallery.className="fi127-artist-grid";
        groupRecords.forEach(record=>gallery.appendChild(buildCard(record)));
        section.appendChild(gallery);
        scroller.appendChild(section);
      }
      scroller.querySelectorAll(".fi127-record").forEach(button=>{
        button.addEventListener("click",()=>{
          const record=records[Number(button.dataset.record)-1];
          if(record)selectRecord(record);
        });
      });
      scroller.scrollTop=0;
      setupArtObserver();
      let target=records.find(r=>r.number===selected&&
        (activeGroup==="all"||String(r.group)===activeGroup));
      if(!target)target=activeGroup==="all"?records[0]:
        records.find(r=>String(r.group)===activeGroup);
      if(target)selectRecord(target);
    }
    tabs.forEach(([label,key])=>{
      const b=document.createElement("button");
      b.type="button";b.className="fi127-filter";
      b.textContent=label;b.dataset.filter=key;
      b.setAttribute("aria-pressed",key==="all"?"true":"false");
      b.addEventListener("click",()=>{
        if(activeGroup===key)return;
        activeGroup=key;
        bar.querySelectorAll(".fi127-filter").forEach(tab=>{
          const on=tab.dataset.filter===key;
          tab.setAttribute("aria-pressed",String(on));
          tab.classList.toggle("fi127-filter-active",on);
        });
        render();
      });
      if(key==="all")b.classList.add("fi127-filter-active");
      bar.appendChild(b);
    });
    render();
  }
  function init(){
    const hub=document.querySelector(".world-hub.fi95-ready");
    if(!hub||hub.dataset.fi127HipHopReady==="1")return;
    hub.dataset.fi127HipHopReady="1";
    const scan=()=>{
      const target=hub.querySelector(".fi126-album-floor .fi123-album-room[data-genre='hiphop']");
      if(target&&target.dataset.fi127Ready!=="1")install(target);
    };
    new MutationObserver(scan).observe(hub,{childList:true,subtree:true});
    scan();
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();