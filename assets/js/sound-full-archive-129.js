/* PHASE 129 — ALL GENRES / EXPANDED MUSIC ARCHIVE + REAL COVER FALLBACKS
 * Enlarges the existing HIP-HOP album floor (second genre in Sound).
 * Preserves Phase126 digital elevator, all ten original genres, Spotify
 * links and the existing Soul room. 11 artists, 46 artist-led records.
 * Where a precise Spotify album ID is verified, official oEmbed supplies
 * its real album art only when visible. Otherwise a typographic fallback
 * and a clearly labelled Spotify search link are provided.
 * No unconfirmed album is called a personal favorite.
 */
(()=>{
  const hiphopGroups=[
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
      ["Me Against the World",1995,"5ASoLiKB7ffqusD9X9wQlS"],
      ["All Eyez on Me",1996,"4CzT5ueFBRpbILw34HQYxi"],
      ["The Don Killuminati: The 7 Day Theory",1996,"1D9KE2JJcdQPhtPRJv0uLP"]
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

  const additions128={"soul":{"label":"SOUL","intro":"Warm voices, timeless records and the songs that stay with you.","groups":[["ERYKAH BADU","NEO SOUL",[["Mama's Gun",2000,null],["Baduizm",1997,null],["Worldwide Underground",2003,null]]],["CLEO SOL","MODERN SOUL",[["Gold",2023,null],["Mother",2021,null]]],["LIANNE LA HAVAS","CONTEMPORARY SOUL",[["Blood",2015,null],["Lianne La Havas",2020,null]]],["ARETHA FRANKLIN","SOUL / GOSPEL",[["I Never Loved a Man the Way I Love You",1967,null],["Lady Soul",1968,null],["Young, Gifted and Black",1972,null]]],["OTIS REDDING","SOUTHERN SOUL",[["Otis Blue",1965,null],["The Dock of the Bay",1968,null],["The Soul Album",1966,null]]],["MARVIN GAYE","MOTOWN / SOUL",[["What's Going On",1971,null],["Let's Get It On",1973,null],["I Want You",1976,null],["Here, My Dear",1978,null]]],["AL GREEN","MEMPHIS SOUL",[["Let's Stay Together",1972,null],["I'm Still in Love with You",1972,null],["Call Me",1973,null]]],["BILL WITHERS","SOUL / SONGWRITING",[["Just as I Am",1971,null],["Still Bill",1972,null],["Menagerie",1977,null]]],["OLIVIA DEAN","BRITISH SOUL",[["Messy",2023,null],["The Art of Loving",2025,null]]]]},"hiphop":{"label":"HIP-HOP","intro":"From golden-era classics to modern rap. An artist-led collection.","groups":[["OUTKAST","ATLANTA / SOUTHERN RAP",[["Southernplayalisticadillacmuzik",1994,null],["ATLiens",1996,null],["Aquemini",1998,null],["Stankonia",2000,null],["Speakerboxxx/The Love Below",2003,null]]],["FREDDIE GIBBS","MIDWEST / MODERN RAP",[["Piñata",2014,null],["Bandana",2019,null],["Alfredo",2020,null],["$oul $old $eparately",2022,null]]],["ISAIAH RASHAD","SOUTHERN / TDE",[["Cilvia Demo",2014,null],["The Sun's Tirade",2016,null],["The House Is Burning",2021,null]]],["DR. DRE","WEST COAST / G-FUNK",[["The Chronic",1992,null],["2001",1999,null],["Compton",2015,null]]],["LIL WAYNE","NEW ORLEANS / RAP",[["Tha Carter II",2005,null],["Tha Carter III",2008,null],["Tha Carter IV",2011,null],["Tha Carter V",2018,null]]]]},"alternative":{"label":"ALTERNATIVE","intro":"Between experimental pop, indie and modern R&B.","groups":[["DIJON","ALTERNATIVE R&B",[["Absolutely",2021,null],["Baby",2025,null]]],["SAMPHA","ELECTRONIC SOUL",[["Process",2017,null],["Lahai",2023,null]]]]},"jazz":{"label":"JAZZ","intro":"Improvisation, modal jazz and timeless recordings.","groups":[["MILES DAVIS","JAZZ / MODAL / FUSION",[["Birth of the Cool",1957,null],["Milestones",1958,null],["Kind of Blue",1959,null],["Sketches of Spain",1960,null],["In a Silent Way",1969,null],["Bitches Brew",1970,null]]]]},"rnb":{"label":"R&B","intro":"Modern soul, lush production and late-night albums.","groups":[["FRANK OCEAN","ALTERNATIVE R&B",[["channel ORANGE",2012,null],["Blonde",2016,null]]],["SZA","CONTEMPORARY R&B",[["Ctrl",2017,null],["SOS",2022,null]]],["THE WEEKND","R&B / ALTERNATIVE POP",[["Trilogy",2012,null],["Kiss Land",2013,null],["Beauty Behind the Madness",2015,null],["Starboy",2016,null],["After Hours",2020,null],["Dawn FM",2022,null],["Hurry Up Tomorrow",2025,null]]],["BRENT FAIYAZ","ALTERNATIVE R&B",[["Sonder Son",2017,null],["F**k the World",2020,null],["WASTELAND",2022,null],["Larger Than Life",2023,null]]],["JUSTIN BIEBER","SWAG ONLY",[["SWAG",2025,null]]]]},"funk":{"label":"FUNK","intro":"Grooves, live bands and Anderson .Paak's discography.","groups":[["ANDERSON .PAAK","SOUL / HIP-HOP / FUNK",[["Venice",2014,null],["Malibu",2016,null],["Oxnard",2018,null],["Ventura",2019,null]]],["NXWORRIES","ANDERSON .PAAK & KNXWLEDGE",[["Yes Lawd!",2016,null],["Why Lawd?",2024,null]]]]},"electronic":{"label":"ELECTRONIC","intro":"Intimate electronic production, dance music and field recordings.","groups":[["FRED AGAIN..","ELECTRONIC / HOUSE",[["Actual Life (April 14 – December 17 2020)",2021,null],["Actual Life 2 (February 2 – October 15 2021)",2021,null],["Actual Life 3 (January 1 – September 9 2022)",2022,null],["Secret Life",2023,null],["ten days",2024,null]]]]},"ukrap":{"label":"UK RAP","intro":"Grime, London voices and expressive British rap.","groups":[["STORMZY","UK RAP / GRIME",[["Gang Signs & Prayer",2017,null],["Heavy Is the Head",2019,null],["This Is What I Mean",2022,null]]],["SKEPTA","GRIME / LONDON",[["Blacklisted",2012,null],["Konnichiwa",2016,null],["Ignorance Is Bliss",2019,null]]],["LOYLE CARNER","UK HIP-HOP / JAZZ RAP",[["Yesterday's Gone",2017,null],["Not Waving, But Drowning",2019,null],["hugo",2022,null],["hopefully !",2025,null]]]]},"rock":{"label":"ROCK","intro":"Timeless albums made to be heard from beginning to end.","groups":[["PINK FLOYD","PSYCHEDELIC / PROGRESSIVE",[["Meddle",1971,null],["The Dark Side of the Moon",1973,null],["Wish You Were Here",1975,null],["Animals",1977,null],["The Wall",1979,null]]],["FLEETWOOD MAC","SOFT ROCK / CLASSIC",[["Fleetwood Mac",1975,null],["Rumours",1977,null],["Tusk",1979,null],["Tango in the Night",1987,null]]],["DIRE STRAITS","CLASSIC ROCK / BLUES",[["Dire Straits",1978,null],["Communiqué",1979,null],["Making Movies",1980,null],["Love Over Gold",1982,null],["Brothers in Arms",1985,null]]]]},"songwriters":{"label":"SONGWRITERS","intro":"Songs that tell stories, across decades and languages.","groups":[["LUCIO BATTISTI","ITALIAN / CANTAUTORI",[["Emozioni",1970,null],["Il mio canto libero",1972,null],["Anima latina",1974,null],["Una donna per amico",1978,null]]],["CAROLE KING","SINGER-SONGWRITER",[["Tapestry",1971,null],["Music",1971,null],["Rhymes & Reasons",1972,null],["Fantasy",1973,null]]]]}};
  const catalogs={
    ...additions128,
    hiphop:{...additions128.hiphop,
      groups:[...hiphopGroups.filter(g=>g[0]!=="DAVE"),...additions128.hiphop.groups]},
    ukrap:{...additions128.ukrap,
      groups:[...hiphopGroups.filter(g=>g[0]==="DAVE"),...additions128.ukrap.groups]}
  };
  const safe=s=>String(s).replace(/[&<>"']/g,c=>
    ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const thumbnails=new Map();
  const attached=new WeakSet();
  const labelNum=n=>String(n).padStart(2,"0");
  const hueColors=[
    "#8f7464","#835f67","#c4a87c","#7e9a8f","#9b8b9a","#a88c7b",
    "#8e7375","#ab856a","#938e77","#877eab","#8a7878"
  ];
  let scrollObserver=null;
  function albumLink(r){return r.spotify;}
  // Spotify's oEmbed sometimes omits thumbnail_url. Never stop at a
  // missing response: query MusicBrainz release-group metadata and use
  // Cover Art Archive thumbnails. Every cover is validated on image load,
  // and the designed sleeve remains readable when no remote art exists.
  const cleanName=v=>String(v).normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .toLowerCase().replace(/\b(deluxe|edition|expanded|remastered|anniversary|explicit|version)\b/g,"")
    .replace(/[^a-z0-9]+/g," ").trim();
  const similarity=(a,b)=>{
    const x=cleanName(a),y=cleanName(b);
    if(!x||!y)return false;
    return x===y||x.length>7&&y.includes(x)||y.length>7&&x.includes(y);
  };
  let mbSerial=Promise.resolve(),mbNextAt=0;
  function mbLookup(record){
    async function request(){
      const delay=Math.max(0,mbNextAt-Date.now());
      if(delay)await new Promise(resolve=>setTimeout(resolve,delay));
      mbNextAt=Date.now()+1100;
      const raw='releasegroup:"'+record.title.replace(/["\\]/g,"")+
        '" AND artist:"'+record.artist.replace(/["\\]/g,"")+'"';
      const url="https://musicbrainz.org/ws/2/release-group/?fmt=json&limit=8&query="+
        encodeURIComponent(raw);
      try{
        const response=await fetch(url,{mode:"cors",credentials:"omit"});
        if(!response.ok)return [];
        const data=await response.json();
        const matches=(data["release-groups"]||[]).filter(item=>{
          const credit=(item["artist-credit"]||[]).map(x=>x?.artist?.name||x?.name||"").join(" ");
          return similarity(item.title,record.title)&&similarity(credit,record.artist)&&
            /^[0-9a-f-]{36}$/i.test(item.id||"");
        });
        return matches.slice(0,4).map(item=>
          "https://coverartarchive.org/release-group/"+item.id+"/front-500");
      }catch(_){return [];}
    }
    const p=mbSerial.then(request,request);
    mbSerial=p.catch(()=>{});
    return p;
  }
  // PHASE 129 — Prefer real artwork via iTunes Search, keeping Spotify
  // oEmbed as a second source. MusicBrainz is a fallback, not a blocking
  // request for every single album. No hard-coded generic stock covers.
  const appleQueue=[];
  let appleActive=0;
  function queueApple(task){
    return new Promise(resolve=>{
      appleQueue.push({task,resolve});
      pumpApple();
    });
  }
  function pumpApple(){
    while(appleActive<4&&appleQueue.length){
      const job=appleQueue.shift();
      appleActive++;
      Promise.resolve().then(job.task).catch(()=>[]).then(result=>{
        appleActive--;
        job.resolve(result);
        pumpApple();
      });
    }
  }
  function appleLookup(record){
    return queueApple(async()=>{
      const url="https://itunes.apple.com/search?media=music&entity=album&limit=50&country=us&term="+
        encodeURIComponent(record.artist+" "+record.title);
      try{
        const response=await fetch(url,{mode:"cors",credentials:"omit"});
        if(!response.ok)return [];
        const data=await response.json();
        const matches=(data.results||[]).filter(item=>
          item.collectionType==="Album"&&
          similarity(item.collectionName||"",record.title)&&
          similarity(item.artistName||"",record.artist)&&
          /^https:\/\//.test(item.artworkUrl100||"")
        );
        matches.sort((a,b)=>{
          const score=x=>
            (cleanName(x.collectionName)===cleanName(record.title)?5:0)+
            (cleanName(x.artistName)===cleanName(record.artist)?3:0)+
            (Number(String(x.releaseDate||"").slice(0,4))===record.year?2:0);
          return score(b)-score(a);
        });
        return [...new Set(matches.slice(0,3).map(item=>
          item.artworkUrl100.replace(/\/\d+x\d+bb\.(jpg|png)(?:\?.*)?$/i,"/600x600bb.$1")
        ))];
      }catch(_){return [];}
    });
  }
  async function spotifyCover(record){
    if(!record.id)return [];
    try{
      const response=await fetch("https://open.spotify.com/oembed?url="+
        encodeURIComponent("https://open.spotify.com/album/"+record.id),
        {mode:"cors",credentials:"omit"});
      if(!response.ok)return [];
      const data=await response.json();
      return data.thumbnail_url&&/^https:\/\//.test(data.thumbnail_url)&&
        similarity(data.title||"",record.title)?[data.thumbnail_url]:[];
    }catch(_){return [];}
  }
  const mbFallbacks=new Map();
  function mbCached(record){
    const key=cleanName(record.artist)+"|"+cleanName(record.title);
    if(!mbFallbacks.has(key))mbFallbacks.set(key,mbLookup(record));
    return mbFallbacks.get(key);
  }
  function getCover(record){
    const key=cleanName(record.artist)+"|"+cleanName(record.title);
    if(thumbnails.has(key))return thumbnails.get(key);
    const promise=(async()=>{
      const [apple,spotify]=await Promise.all([
        appleLookup(record),spotifyCover(record)
      ]);
      const urls=[...new Set([...apple,...spotify])];
      return urls.length?urls:await mbCached(record);
    })().catch(()=>[]);
    thumbnails.set(key,promise);
    return promise;
  }
  function renderImage(target,urls,record,cls){
    if(!target||!target.isConnected||!urls?.length)return;
    const img=document.createElement("img");
    img.className=cls;
    img.alt="Cover art: "+record.title+" — "+record.artist;
    img.decoding="async";img.loading="lazy";
    let offset=0;
    const next=()=>{
      if(!target.isConnected||offset>=urls.length){img.remove();return;}
      img.src=urls[offset++];
    };
    img.onerror=next;
    img.onload=()=>{img.style.opacity="1";};
    target.querySelector(".fi127-real-art")?.remove();
    target.appendChild(img);
    next();
  }
  function fillCover(node,record){
    if(attached.has(node))return;
    attached.add(node);
    getCover(record).then(urls=>{
      if(!urls?.length||!node.isConnected)return;
      renderImage(node,urls,record,"fi127-real-art");
      const spot=node.closest(".fi127-record")?.classList.contains("fi127-record-active")?
        node.closest(".fi127-archive")?.querySelector(".fi127-spotlight-art"):null;
      if(spot&&spot.dataset.record===String(record.number)){
        addSpotlightImage(spot,urls,record);
      }
    });
  }
  function addSpotlightImage(spot,urls,record){
    if(!spot||!urls?.length||!spot.isConnected)return;
    renderImage(spot,urls,record,"fi127-real-art fi127-spotlight-image");
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
        '<span class="fi127-record-art" data-record="'+r.number+'" style="--fi127-tint:'+hueColors[r.group%hueColors.length]+'">'+
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
    const genre=room?.dataset.genre;
    const config=catalogs[genre];
    if(!room||!config||room.dataset.fi128Ready==="1")return;
    const groups=config.groups;
    const records=groups.flatMap(([artist,sub,albums],group)=>
      albums.map(([title,year,id],ordinal)=>({
        artist,sub,group,title,year,id,ordinal,number:0,
        spotify:id?"https://open.spotify.com/album/"+id:
          "https://open.spotify.com/search/"+encodeURIComponent(artist+" "+title)
      }))
    );
    records.forEach((r,i)=>r.number=i+1);
    room.dataset.fi128Ready="1";
    room.classList.add("fi127-archive","fi128-genre-"+genre);
    const name=room.querySelector(".fi123-room-head .fi126-crumbs strong");
    if(name)name.textContent="03 "+config.label;
    const foot=room.querySelector(".fi123-room-foot");
    if(foot)foot.innerHTML=
      '<span>YOUR SOUND / '+groups.length+' ARTISTS</span>'+
      '<span>CURATED FROM YOUR ARTIST LIST · NOT AN IMPORTED SPOTIFY LIBRARY</span>';
    room.querySelector(".fi123-room-content")?.remove();

    const main=document.createElement("div");
    main.className="fi127-content";
    main.innerHTML=
      '<div class="fi127-intro">'+
        '<div><span class="fi127-kicker">SOUND / LEVEL 03 / VOL. 02</span>'+
        '<h3>'+safe(config.label)+'<span>.</span></h3></div>'+
        '<div class="fi127-intro-side"><strong>'+records.length+' RECORDS <i>/</i> '+groups.length+' ARTISTS</strong>'+
        '<p>'+safe(config.intro)+'</p></div>'+
      '</div>'+
      '<div class="fi127-filter-wrap">'+
        '<span class="fi127-filter-label">JUMP TO ARTIST</span>'+
        '<div class="fi127-filters" role="group" aria-label="Filter albums by artist"></div>'+
      '</div>'+
      '<div class="fi127-body">'+
        '<div class="fi127-library" tabindex="0" aria-label="'+safe(config.label)+' album archive, scroll to see more"></div>'+
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
      cover.style.setProperty("--fi127-tint",hueColors[record.group%hueColors.length]);
      cover.innerHTML='<span class="fi127-record-placeholder">'+
        '<span>'+safe(record.artist)+'</span>'+
        '<strong>'+safe(record.title)+'</strong>'+
        '<small>'+record.year+'</small></span>';
      getCover(record).then(urls=>{
        if(urls?.length&&cover.dataset.record===String(record.number)){
          addSpotlightImage(cover,urls,record);
        }
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
          '<span class="fi127-artist-count">'+labelNum(group+1)+' / '+labelNum(groups.length)+'</span>'+
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
    if(!hub||hub.dataset.fi128CatalogReady==="1")return;
    hub.dataset.fi128CatalogReady="1";
    const scan=()=>{
      const target=hub.querySelector(".fi126-album-floor .fi123-album-room");
      if(target&&target.dataset.fi128Ready!=="1")install(target);
    };
    new MutationObserver(scan).observe(hub,{childList:true,subtree:true});
    scan();
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});
  else init();
})();