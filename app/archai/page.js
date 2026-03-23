"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// ALL ARCHAI STATE & LOGIC at module level — runs client-side only
// Keeping original var-based code exactly as-is for 100% fidelity
// ─────────────────────────────────────────────────────────────────────────────
var C,step,RDATA,pageHist,STYLES,PAL;

function initState(){
  C={plotSize:'10 Marla',plotType:'corner',floors:'G+2',style:'California Modern',bedrooms:3,bathrooms:3,cars:2,shops:0,features:[],kitchen:'Closed Traditional Kitchen',wallColor:'#F2EEE6',roofColor:'#2A2A2A',trimColor:'#1A1A1A',doorColor:'#1A1A1A',poolColor:'#38B8D4',finish:'Smooth Plaster',clientName:'',city:'',budget:'PKR 2 Crore',special:''};
  step=1;RDATA=null;pageHist=['home'];
  STYLES={
    'California Modern':{icon:'🏡',desc:'White gabled roof · Warm timber · Open living · Pool + lawn',tag:'Inspired by Beverly Hills & Calabasas luxury homes',concept:'This style — inspired by your first reference image — features a striking white stucco gabled roofline, warm natural timber visible through vast glass walls, and a seamless indoor-outdoor living experience. The open-plan ground floor flows directly onto a covered patio with outdoor dining, a rectangular lap pool, and a manicured lawn.',feats:['White stucco gabled roofline with dark metal trim','Floor-to-ceiling glass sliding doors — full indoor-outdoor flow','Warm natural timber panelling inside — visible through glass','Covered pergola patio with outdoor dining and BBQ','Rectangular lap pool + jacuzzi spa side by side','Manicured emerald green lawn with stone step path'],mats:[{n:'White Smooth Stucco',t:'Exterior Walls',c:'#F2EEE6'},{n:'Natural Oak Timber',t:'Interior Cladding',c:'#C8A06E'},{n:'Dark Anthracite Aluminum',t:'Frames & Doors',c:'#1A1A1A'}],promptBase:'luxury residential villa inspired by Beverly Hills California modern farmhouse style, white stucco gabled roofline with dark metal window frames, floor to ceiling glass sliding walls, warm natural oak timber interior visible through glass, covered outdoor patio with pergola ceiling, outdoor dining set on travertine tiles, rectangular lap pool with attached jacuzzi spa, manicured emerald green lawn, stepping stone path, outdoor wall sconce lighting, golden hour dusk lighting, warm amber interior glow, ultra realistic photography 8k, architectural magazine quality --ar 16:9'},
    'South Asian Contemporary':{icon:'🏘️',desc:'White cubic · Wood panels · Dark frames · Kerala/Pakistan modern',tag:'Most popular in Pakistan, Kerala & Gulf expatriate homes',concept:'Taken directly from your second reference image — this is the most wanted style across Pakistan, Kerala, and Gulf expatriate communities right now. Pure white cubic geometry with warm horizontal wood accent panels, deep-set large dark-framed windows that glow amber at dusk, a covered entrance porch, and a beautifully landscaped front garden.',feats:['Pure white flat-roof cubic exterior with sharp edges','Warm horizontal teak wood accent panels on facade','Large dark aluminum-framed windows — multiple panels side by side','Deep covered entrance porch with recessed ceiling light','Neat manicured front garden with hedges and feature plants','Warm amber dusk lighting through all windows — stunning at night'],mats:[{n:'White Smooth Plaster',t:'Exterior Walls',c:'#F5F2EE'},{n:'Teak Wood Cladding',t:'Accent Panels',c:'#A07040'},{n:'Dark Aluminum',t:'Window Frames',c:'#1A1A1A'}],promptBase:'luxury villa 3D render, South Asian contemporary architecture Pakistan Kerala style, white cubic flat roof exterior, warm horizontal teak wood accent panels on facade, large dark aluminum framed windows with amber interior lighting, deep covered entrance porch, manicured front garden with neat hedges and decorative plants, stone paved driveway, modern exterior wall lights, beautiful blue hour dusk lighting, warm golden light glowing through windows, photorealistic 3D architectural visualization, ultra high quality 8k --ar 16:9'},
    'Modern Mediterranean':{icon:'🏊',desc:'White cubic · Pool · Louvered pergola · Ibiza style',tag:'Most popular in Dubai, Spain & Pakistan elite',concept:'The iconic Ibiza-Marbella style that dominates Dubai luxury real estate. Pure white cubic architecture with large dark-framed glass sliding doors, a louvered white pergola casting beautiful shadow patterns, natural travertine stone accent cladding, and a glistening pool with white loungers.',feats:['Pure white flat-roof cubic structure','Large dark anthracite aluminum sliding glass doors','White louvered pergola — beautiful shadow and light','Natural travertine stone lower wall accent','Ground-level pool with white loungers + blue cushions','Tropical palms and lush green landscaping'],mats:[{n:'Smooth White Plaster',t:'Exterior',c:'#F0EDE5'},{n:'Anthracite Aluminum',t:'Frames',c:'#1A1A1A'},{n:'Travertine Stone',t:'Feature Wall',c:'#C8B898'}],promptBase:'photorealistic architectural render, modern mediterranean luxury villa Ibiza Marbella style, white cubic flat roof, large dark aluminum sliding glass doors, white louvered pergola terrace, natural travertine stone cladding, infinity pool with white loungers blue cushions, tropical palm trees, golden hour evening lighting, warm amber light through glass, ultra realistic 8k --ar 16:9'},
    'Islamic Grand':{icon:'🕌',desc:'Arches · Domes · Mughal courtyard · Minarets',tag:'Heritage luxury — Pakistan, Gulf & North Africa',concept:'A tribute to the golden age of Islamic architecture — pointed arches, twin minarets, a central Mughal fountain courtyard, and ornate jali lattice screens that cast mesmerising shadow patterns. The double-height entrance commands immediate awe.',feats:['Grand pointed-arch entrance gate in carved stone','Central Mughal fountain courtyard with marble','Jali lattice screens — privacy and art','Double-height Diwan Khana with 18-ft ceiling','Twin decorative minarets at rooftop corners','Mughal Char Bagh four-quadrant garden'],mats:[{n:'Natural Sandstone',t:'Exterior',c:'#D4BF8A'},{n:'White Marble',t:'Courtyard & Floors',c:'#F5F0E8'},{n:'Teak Wood',t:'Doors & Screens',c:'#5C3317'}],promptBase:'photorealistic architectural 3D render, Islamic Mughal luxury villa, pointed arch windows and monumental entrance gate, twin decorative minarets, central fountain courtyard with marble, ornate jali lattice screens, sandstone exterior walls, evening golden hour lighting, warm interior lights, ultra realistic 8k --ar 16:9'},
    'Modern Minimalist':{icon:'🔲',desc:'Flat roof · Cantilever · Glass walls · Infinity pool',tag:'Architect favourite — Dubai & Islamabad DHA',concept:'Pure geometry, vast glass, and honest materials. The cantilevered upper floor creates a dramatic floating silhouette. Board-formed concrete and anti-reflective glass are the entire palette. The infinity pool merges with the garden at dusk.',feats:['Cantilevered upper floor — dramatic floating look','Floor-to-ceiling glass walls throughout','Infinity edge pool with glass overflow','Concealed LED lighting in ceiling reveals','Board-formed concrete facade','Recessed garage — clean uncluttered exterior'],mats:[{n:'Board-formed Concrete',t:'Exterior',c:'#D8D4CC'},{n:'Anti-reflective Glass',t:'Walls & Windows',c:'#A8C8D8'},{n:'Polished Concrete',t:'Interior Floors',c:'#D0D0D0'}],promptBase:'photorealistic render, ultra modern minimalist luxury villa, flat roof cantilevered design, floor to ceiling glass walls, board-formed concrete facade, infinity edge pool, concealed LED lighting, dark aluminum frames, manicured garden, blue hour night lighting, ultra realistic architectural photography 8k --ar 16:9'},
    'Desert Contemporary':{icon:'🏜️',desc:'Sandstone · Columns · Thick walls · Desert garden',tag:'Perfect for Lahore, Karachi & Gulf climate',concept:'Dar Al Sahara honours desert architectural wisdom. Thick sandstone walls that stay cool naturally, a five-column shaded loggia, riad-style water feature, and terracotta roof tiles.',feats:['Thick sandstone walls (50cm+) for natural cooling','Five-column loggia shading entrance walkway','Riad indoor water feature — natural cooling','Terracotta roof tiles with parapet wall','Deep-set carved stone window surrounds','Desert garden with date palms'],mats:[{n:'Natural Sandstone',t:'Exterior Walls',c:'#D4BF8A'},{n:'Terracotta Tiles',t:'Roof',c:'#8B4513'},{n:'Limestone',t:'Interior Floors',c:'#E8E0C8'}],promptBase:'photorealistic render, desert contemporary luxury villa, thick sandstone walls, five column entrance loggia, terracotta roof, deep set windows, desert landscaping with date palms, warm evening golden lighting, ultra realistic 8k --ar 16:9'},
    'Tropical Luxury':{icon:'🌿',desc:'Green walls · Zinc roof · Resort pool · Teak',tag:'Bali resort feeling in your own home',concept:'Villa Serena was designed around one feeling: permanent vacation. Living green walls breathe on every facade. The dramatic zinc roof dominates the skyline. A freeform resort pool with stone waterfall sits at the centre.',feats:['Living green walls on three faces with irrigation','High-pitch zinc roof — tropical silhouette','Freeform resort pool with stone waterfall','Sky bridge over garden between upper rooms','Outdoor sala with daybed and firepit','Teak ceilings and bamboo screens inside'],mats:[{n:'Weathered Zinc',t:'Roofing',c:'#3D4A30'},{n:'Teak Timber',t:'Ceilings & Screens',c:'#8B5A2B'},{n:'River Stone',t:'Pool Surrounds',c:'#C0B8A8'}],promptBase:'photorealistic render, tropical luxury villa Bali resort style, living green walls, high pitch zinc roof, freeform pool stone waterfall, teak timber interior, lush tropical garden palms, outdoor sala daybed, golden hour lighting, ultra realistic 8k --ar 16:9'},
    'Colonial Classic':{icon:'🏛️',desc:'Columns · Pediment · Balconies · Symmetry',tag:'Timeless elegance — DHA Lahore & Karachi',concept:'Grand Colonial celebrates symmetry, proportion, and enduring elegance. Six soaring classical columns frame the pediment entrance. Wraparound balconies connect every room to the outdoors.',feats:['Six classical columns at entrance facade','Carved pediment above main entrance','Wraparound balcony with turned balustrade','Grand central staircase with chandelier','Symmetrical facade with matching windows','Formal garden with box hedging and fountain'],mats:[{n:'Lime-washed Brick',t:'Exterior',c:'#E0D4C0'},{n:'Glazed Terracotta',t:'Roof Tiles',c:'#8B5030'},{n:'White Marble',t:'Columns & Steps',c:'#F0EEE8'}],promptBase:'photorealistic render, colonial classic luxury villa, six classical entrance columns, ornate pediment, wraparound balcony balustrade, symmetrical white facade, formal garden fountain, warm evening lighting, ultra realistic architectural photography 8k --ar 16:9'},
    'Pakistani Traditional':{icon:'🏺',desc:'Lahori brick · Veranda · Sheesham wood · Courtyard',tag:'Heritage home — built for three generations',concept:'Heritage Residence is everything that makes a Pakistani home deeply satisfying — the generous veranda for evening gatherings, the formal drawing room, the fragrant courtyard tree, and the rooftop under the stars.',feats:['Traditional exposed Lahori brick exterior','Full-width veranda on ground floor','Separate formal drawing room with guest entrance','Central courtyard with mature shade tree','Hand-carved sheesham wood doors and screens','Rooftop sitting area with parapet wall'],mats:[{n:'Lahori Brick',t:'Exterior Walls',c:'#C87050'},{n:'Kota Stone',t:'Veranda & Paths',c:'#B0A888'},{n:'Sheesham Wood',t:'Doors & Windows',c:'#5C3317'}],promptBase:'photorealistic render, Pakistani traditional luxury residence, exposed Lahori brick exterior, wide veranda, central courtyard shade tree, carved sheesham wood doors, manicured garden, warm amber evening lighting, ultra realistic architectural photography 8k --ar 16:9'}
  };
  PAL={
    wall:[['#F5F2EC','Ivory'],['#F2EEE6','Warm White'],['#E8DCBC','Warm Sand'],['#D4BF8A','Desert Gold'],['#E8E0D0','Cream'],['#D0C8B0','Khaki'],['#C8B888','Wheat'],['#B8C8D4','Sky Blue'],['#C8D4B8','Sage'],['#D4C4B8','Blush'],['#EBEBEB','Pure White'],['#CCBBAA','Caramel']],
    roof:[['#2A2A2A','Anthracite'],['#3A2810','Ebony'],['#6B3A1F','Terracotta'],['#8B5030','Brick Red'],['#5A4030','Walnut'],['#4A4A4A','Slate'],['#3D4A30','Forest'],['#704214','Rust'],['#1A2A3A','Navy'],['#4A3A28','Mocha'],['#606060','Grey'],['#8B7355','Tan']],
    trim:[['#1A1A1A','Anthracite'],['#FFFFFF','White'],['#C8A96E','Gold'],['#A07040','Teak Brown'],['#D4C8A8','Stone'],['#5A4030','Dark Brown'],['#303840','Dark Slate'],['#A09080','Greige'],['#888880','Silver'],['#B0A898','Warm Grey'],['#707878','Blue-Grey'],['#F0E8D0','Off-White']],
    door:[['#1A1A1A','Black'],['#3A1F0A','Mahogany'],['#5C3317','Walnut'],['#8B4513','Brown'],['#2A2010','Ebony'],['#C8A96E','Gold'],['#4A3828','Chocolate'],['#2A3A2A','Deep Green'],['#1E2A3A','Navy'],['#8B0000','Burgundy'],['#D4C0A0','Ivory'],['#606060','Gunmetal']],
    pool:[['#38B8D4','Caribbean'],['#28A8C8','Turquoise'],['#1888A8','Deep Blue'],['#38B888','Aqua'],['#2878D8','Royal Blue'],['#A8D8D8','Cyan']]
  };
}

// Expose all functions to window so inline onclick handlers work
function exposeGlobals(){
  window.C=C;window.step=step;window.RDATA=RDATA;window.pageHist=pageHist;window.STYLES=STYLES;window.PAL=PAL;
  window.goPage=goPage;window.goBack=goBack;window.toggleBill=toggleBill;
  window.selM=selM;window.selO=selO;window.adj=adj;window.togC=togC;window.pickSw=pickSw;window.setBudget=setBudget;
  window.gos=gos;window.runGen=runGen;window.copyPrompt=copyPrompt;window.liveClr=liveClr;
  window.sFP=sFP;window.restartCfg=restartCfg;window.doDownload=doDownload;window.hD=hD;window.hL=hL;
}

// ── NAVIGATION ──
function goPage(id){
  document.querySelectorAll('.page').forEach(function(p){p.classList.remove('show');});
  document.querySelectorAll('.nb').forEach(function(b){b.classList.remove('on');});
  var pg=document.getElementById('page-'+id);if(pg)pg.classList.add('show');
  var nb=document.getElementById('nb-'+id);if(nb)nb.classList.add('on');
  if(pageHist[pageHist.length-1]!==id){pageHist.push(id);if(pageHist.length>15)pageHist.shift();}
  window.pageHist=pageHist;updBack();
  if(id==='config')startCfg();
  if(id==='home')buildGallery();
  window.scrollTo({top:0,behavior:'smooth'});
}
function goBack(){
  if(pageHist.length>1){
    pageHist.pop();window.pageHist=pageHist;
    var prev=pageHist[pageHist.length-1];
    document.querySelectorAll('.page').forEach(function(p){p.classList.remove('show');});
    document.querySelectorAll('.nb').forEach(function(b){b.classList.remove('on');});
    if(prev==='result'||prev==='config'){
      var pc=document.getElementById('page-config');if(pc)pc.classList.add('show');
      var nb=document.getElementById('nb-config');if(nb)nb.classList.add('on');
      var rw=document.getElementById('res-wrap');if(rw)rw.style.display='none';
      var cw=document.getElementById('cfg-wrap');if(cw)cw.style.display='block';
      var gb=document.getElementById('gen-box');if(gb)gb.style.display='none';
      renderStep();
    } else {
      var pp=document.getElementById('page-'+prev);if(pp)pp.classList.add('show');
      var nb2=document.getElementById('nb-'+prev);if(nb2)nb2.classList.add('on');
      if(prev==='home')buildGallery();
    }
    updBack();window.scrollTo({top:0,behavior:'smooth'});
  }
}
function updBack(){var fb=document.getElementById('float-back');if(fb){if(pageHist.length>1)fb.classList.add('show');else fb.classList.remove('show');}}
function toggleBill(){
  C.annual=!C.annual;window.C=C;
  var t=document.getElementById('bill-tog');if(t)t.classList.toggle('on',C.annual);
  var lm=document.getElementById('lbl-m');if(lm)lm.classList.toggle('on',!C.annual);
  var la=document.getElementById('lbl-a');if(la)la.classList.toggle('on',C.annual);
  var pa=document.getElementById('pro-a');if(pa)pa.textContent=C.annual?'11':'19';
  var pp=document.getElementById('pro-p');if(pp)pp.textContent=C.annual?'/mo (annual)':'/month';
  var va=document.getElementById('vip-a');if(va)va.textContent=C.annual?'29':'49';
  var vp=document.getElementById('vip-p');if(vp)vp.textContent=C.annual?'/mo (annual)':'/month';
}

// ── GALLERY ──
function buildGallery(){
  var g=document.getElementById('style-gallery');if(!g)return;
  var keys=Object.keys(STYLES);var featured=['California Modern','South Asian Contemporary','Modern Mediterranean'];
  g.innerHTML='';
  keys.forEach(function(k){
    var s=STYLES[k];var isFeat=featured.indexOf(k)>-1;
    var div=document.createElement('div');div.className='sg-card'+(isFeat?' featured':'');
    div.onclick=function(){C.style=k;window.C=C;goPage('config');};
    var badgeHtml=k==='California Modern'?'<div class="sg-badge">📸 Your Image 1</div>':k==='South Asian Contemporary'?'<div class="sg-badge">📸 Your Image 2</div>':'';
    div.innerHTML=badgeHtml+'<canvas class="sg-canvas" width="320" height="180"></canvas><div class="sg-body"><div class="sg-name">'+s.icon+' '+k+'</div><div class="sg-desc">'+s.desc+'</div></div>';
    g.appendChild(div);
  });
  var canvases=g.querySelectorAll('canvas');var styleKeys=Object.keys(STYLES);
  canvases.forEach(function(cv,idx){drawMiniStyle(cv,styleKeys[idx],STYLES[styleKeys[idx]]);});
}

function drawMiniStyle(cv,name,sdata){
  var ctx=cv.getContext('2d'),W=cv.width,H=cv.height;ctx.clearRect(0,0,W,H);
  var sky=ctx.createLinearGradient(0,0,0,H*.65);sky.addColorStop(0,'#050a18');sky.addColorStop(1,'#152235');ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  for(var i=0;i<35;i++){ctx.fillStyle='rgba(255,255,255,'+(0.1+Math.random()*.45)+')';ctx.beginPath();ctx.arc(Math.random()*W,Math.random()*H*.5,Math.random()*1.1,0,Math.PI*2);ctx.fill();}
  ctx.fillStyle='rgba(255,252,228,.85)';ctx.beginPath();ctx.arc(W-35,22,11,0,Math.PI*2);ctx.fill();
  var hor=H*.65;var wc=sdata.mats[0]?sdata.mats[0].c:'#F0EDE5';var fc=sdata.mats[2]?sdata.mats[2].c:'#1A1A1A';
  if(name==='California Modern')drawMiniCali(ctx,W,H,hor,wc,fc);else if(name==='South Asian Contemporary')drawMiniSAC(ctx,W,H,hor,wc,fc);else if(name==='Modern Mediterranean')drawMiniMed(ctx,W,H,hor,wc);else if(name==='Islamic Grand')drawMiniIslamic(ctx,W,H,hor,wc);else if(name==='Modern Minimalist')drawMiniMinimal(ctx,W,H,hor,wc,fc);else drawMiniGeneric(ctx,W,H,hor,wc,fc,sdata);
  var gnd=ctx.createLinearGradient(0,hor,0,H);gnd.addColorStop(0,'#0d1808');gnd.addColorStop(1,'#070c04');ctx.fillStyle=gnd;ctx.fillRect(0,hor,W,H-hor);
  ctx.fillStyle='rgba(200,169,110,.45)';ctx.font='bold 9px Outfit';ctx.textAlign='center';ctx.fillText(name,W/2,H-8);
}
function drawMiniCali(ctx,W,H,hor,wc,fc){var cx=W/2,bw=220,bx=cx-bw/2,by=hor-120;ctx.fillStyle='rgba(0,0,0,.25)';ctx.fillRect(bx+8,by+8,bw,112);var wg=ctx.createLinearGradient(0,by,0,hor);wg.addColorStop(0,wc);wg.addColorStop(1,hD(wc,.1));ctx.fillStyle=wg;ctx.fillRect(bx,by,bw,112);ctx.fillStyle=hD(wc,.08);ctx.beginPath();ctx.moveTo(bx-10,by);ctx.lineTo(cx,by-38);ctx.lineTo(bx+bw+10,by);ctx.closePath();ctx.fill();ctx.strokeStyle='#1A1A1A';ctx.lineWidth=2.5;ctx.stroke();ctx.fillStyle='rgba(180,120,50,.4)';ctx.fillRect(bx+70,by+12,95,100);ctx.fillStyle='rgba(255,185,85,.25)';ctx.fillRect(bx+70,by+12,95,100);[{x:bx+8,w:58},{x:bx+70,w:95},{x:bx+172,w:42}].forEach(function(gp){ctx.fillStyle='rgba(68,108,148,.4)';ctx.fillRect(gp.x,by+12,gp.w,hor-by-12);ctx.strokeStyle=fc;ctx.lineWidth=2.5;ctx.strokeRect(gp.x,by+12,gp.w,hor-by-12);ctx.beginPath();ctx.moveTo(gp.x+gp.w/2,by+12);ctx.lineTo(gp.x+gp.w/2,hor);ctx.stroke();});ctx.fillStyle='rgba(40,110,35,.75)';ctx.fillRect(bx,hor+2,bw,14);ctx.fillStyle='rgba(50,180,210,.65)';ctx.fillRect(bx+10,hor+18,bw*.65,18);}
function drawMiniSAC(ctx,W,H,hor,wc,fc){var cx=W/2,bw=210,bx=cx-bw/2,by=hor-105;ctx.fillStyle='rgba(0,0,0,.22)';ctx.fillRect(bx+7,by+7,bw,98);ctx.fillStyle=wc;ctx.fillRect(bx,by,bw,98);ctx.fillStyle='rgba(160,100,45,.75)';ctx.fillRect(bx,by+22,85,56);ctx.fillStyle='rgba(160,100,45,.55)';ctx.fillRect(bx+bw-55,by+15,55,68);[{x:bx+90,w:38,h:70},{x:bx+133,w:38,h:70}].forEach(function(win){ctx.fillStyle='rgba(255,175,60,.3)';ctx.fillRect(win.x,by+10,win.w,win.h);ctx.strokeStyle=fc;ctx.lineWidth=2.5;ctx.strokeRect(win.x,by+10,win.w,win.h);});}
function drawMiniMed(ctx,W,H,hor,wc){var cx=W/2,bw=215,bx=cx-bw/2,by=hor-105;ctx.fillStyle='rgba(0,0,0,.2)';ctx.fillRect(bx+6,by+6,bw,105);ctx.fillStyle=wc;ctx.fillRect(bx,by,bw,105);ctx.fillStyle='rgba(68,115,155,.5)';ctx.fillRect(bx+8,by+20,bw-16,85);ctx.fillStyle='rgba(50,180,210,.7)';ctx.fillRect(bx,hor+4,bw*.7,18);}
function drawMiniIslamic(ctx,W,H,hor,wc){var cx=W/2,bw=210,bx=cx-bw/2,by=hor-115;ctx.fillStyle=wc;ctx.fillRect(bx,by,bw,115);for(var a=0;a<3;a++){var ax=bx+30+a*70,aw=40,ahy=by+20;ctx.fillStyle='rgba(68,108,148,.45)';ctx.beginPath();ctx.moveTo(ax,by+90);ctx.lineTo(ax,ahy+aw/2);ctx.quadraticCurveTo(ax+aw/2,ahy-10,ax+aw,ahy+aw/2);ctx.lineTo(ax+aw,by+90);ctx.closePath();ctx.fill();ctx.strokeStyle='#1A1A1A';ctx.lineWidth=1.5;ctx.stroke();}ctx.fillStyle='rgba(200,169,110,.8)';ctx.fillRect(cx-3,by-40,6,40);ctx.fillRect(cx-15,by-50,8,12);ctx.fillRect(cx+7,by-50,8,12);}
function drawMiniMinimal(ctx,W,H,hor,wc,fc){var cx=W/2,bw=215,bx=cx-bw/2,by=hor-110;ctx.fillStyle='rgba(0,0,0,.2)';ctx.fillRect(bx+6,by+6,bw,110);ctx.fillStyle=wc;ctx.fillRect(bx,by+30,bw,80);ctx.fillStyle=hD(wc,.08);ctx.fillRect(bx+30,by,bw-40,40);ctx.fillStyle='rgba(68,115,155,.55)';ctx.fillRect(bx+5,by+32,bw-10,78);}
function drawMiniGeneric(ctx,W,H,hor,wc,fc,sdata){var cx=W/2,bw=210,bx=cx-bw/2,by=hor-105;ctx.fillStyle='rgba(0,0,0,.2)';ctx.fillRect(bx+6,by+6,bw,105);var rc=sdata.mats[1]?sdata.mats[1].c:'#2A2A2A';var wg=ctx.createLinearGradient(0,by,0,hor);wg.addColorStop(0,wc);wg.addColorStop(1,hD(wc,.1));ctx.fillStyle=wg;ctx.fillRect(bx,by,bw,105);ctx.fillStyle=rc;ctx.fillRect(bx-5,by-8,bw+10,16);for(var wi=0;wi<3;wi++){ctx.fillStyle='rgba(68,108,148,.45)';ctx.fillRect(bx+15+wi*65,by+20,45,65);ctx.strokeStyle=fc;ctx.lineWidth=2;ctx.strokeRect(bx+15+wi*65,by+20,45,65);}ctx.fillStyle='rgba(40,100,35,.6)';ctx.fillRect(bx,hor+2,bw,12);}
function palmMini(ctx,x,hor){ctx.strokeStyle='#4A3520';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,hor);ctx.quadraticCurveTo(x-3,hor-28,x,hor-48);ctx.stroke();for(var i=0;i<4;i++){ctx.strokeStyle='rgba(30,100,20,.8)';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x,hor-48);var a=(i/3)*Math.PI-Math.PI/2,lx=x+Math.cos(a)*22,ly=hor-48+Math.sin(a)*14;ctx.quadraticCurveTo((x+lx)/2+Math.sin(a)*5,(hor-48+ly)/2-5,lx,ly);ctx.stroke();}}

// ── CONFIGURATOR ──
function startCfg(){step=1;window.step=step;var gb=document.getElementById('gen-box');if(gb)gb.style.display='none';var rw=document.getElementById('res-wrap');if(rw)rw.style.display='none';var cw=document.getElementById('cfg-wrap');if(cw)cw.style.display='block';renderStep();}
function renderStep(){
  window.step=step;
  var ph='';for(var i=1;i<=5;i++){if(i>1)ph+='<div class="pline'+(i-1<step?' dn':'')+'"></div>';ph+='<div class="cpd"><div class="pdot'+(i===step?' act':i<step?' dn':'')+'">'+(i<step?'✓':i)+'</div></div>';}
  var pg=document.getElementById('cfg-prog');if(pg)pg.innerHTML=ph;
  var h='';if(step===1)h=bS1();else if(step===2)h=bS2();else if(step===3)h=bS3();else if(step===4)h=bS4();else h=bS5();
  var cs=document.getElementById('cfg-step');if(cs)cs.innerHTML=h;
  window.scrollTo({top:60,behavior:'smooth'});
}
function gos(n){step=n;window.step=step;renderStep();}
function nav(back){var b=back?'<button class="btn-bk" onclick="gos('+(step-1)+')">← Back</button>':'<div></div>';var n=step<5?'<button class="btn-nx" onclick="gos('+(step+1)+')">Continue →</button>':'<div></div>';return'<div class="snav">'+b+n+'</div>';}

function bS1(){var ms=[5,7,10,20,40],ml=['Marla','Marla','Marla','Marla · 1 Kanal','Marla · 2 Kanal'];var mh='';for(var i=0;i<ms.length;i++){var s=C.plotSize===ms[i]+' Marla'?' s':'';mh+='<div class="mb'+s+'" onclick="selM('+ms[i]+',this)"><span class="mb-n">'+ms[i]+'</span><span class="mb-l">'+ml[i]+'</span></div>';}var pts=[{v:'corner',i:'🔲',n:'Corner Plot',d:'2 roads — max value'},{v:'normal',i:'▬',n:'Normal Plot',d:'Single frontage'},{v:'back',i:'↩️',n:'Back Lane',d:'Service lane at back'}];var ph='';pts.forEach(function(t){var s=C.plotType===t.v?' s':'';ph+='<div class="oc'+s+'" onclick="selO(\'plotType\',\''+t.v+'\',this)"><div class="oc-i">'+t.i+'</div><div class="oc-n">'+t.n+'</div><div class="oc-d">'+t.d+'</div></div>';});var fls=[{v:'G',i:'🏠',n:'Ground Only',d:'Single storey'},{v:'G+1',i:'🏡',n:'G + 1st',d:'Double storey'},{v:'G+2',i:'🏢',n:'G + 2nd',d:'Triple storey'},{v:'G+2+Roof',i:'🏰',n:'G+2+Roof',d:'Villa + roof deck'}];var fh='';fls.forEach(function(fl){var s=C.floors===fl.v?' s':'';fh+='<div class="oc'+s+'" onclick="selO(\'floors\',\''+fl.v+'\',this)"><div class="oc-i">'+fl.i+'</div><div class="oc-n">'+fl.n+'</div><div class="oc-d">'+fl.d+'</div></div>';});return'<div class="sbox"><div class="s-eye">Step 1 of 5 — Plot</div><h2 class="s-hed">About your <em>plot</em></h2><p class="s-sub2">Build the design around your exact land size.</p><div style="margin-bottom:26px;"><div style="font-size:10px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-bottom:11px;text-align:center;">Plot Size</div><div class="mrow">'+mh+'</div><div class="tfield" style="max-width:240px;margin:0 auto;"><div class="tflbl">Custom (Marla)</div><input class="ti" type="number" placeholder="e.g. 12" oninput="C.plotSize=this.value+\' Marla\'"></div></div><div style="margin-bottom:24px;"><div style="font-size:10px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-bottom:11px;text-align:center;">Plot Type</div><div class="og og3">'+ph+'</div></div><div><div style="font-size:10px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-bottom:11px;text-align:center;">Floors</div><div class="og og4">'+fh+'</div></div>'+nav(false)+'</div>';}
function bS2(){var h='';Object.keys(STYLES).forEach(function(k){var s=STYLES[k];var sel=C.style===k?' s':'';var badgeCls=k==='California Modern'||k==='South Asian Contemporary'?' style="border-color:var(--gold);"':'';var badge=k==='California Modern'?'<div style="font-size:9px;color:var(--gold);font-weight:700;margin-bottom:3px;">📸 Your Image 1</div>':k==='South Asian Contemporary'?'<div style="font-size:9px;color:var(--gold);font-weight:700;margin-bottom:3px;">📸 Your Image 2</div>':'';h+='<div class="oc'+sel+'" onclick="selO(\'style\',\''+k+'\',this)" '+badgeCls+'>'+badge+'<div class="oc-i">'+s.icon+'</div><div class="oc-n">'+k+'</div><div class="oc-d">'+s.desc+'</div></div>';});return'<div class="sbox"><div class="s-eye">Step 2 of 5 — Style</div><h2 class="s-hed">Choose your <em>style</em></h2><p class="s-sub2">Your selections define the canvas render AND the AI image prompt.</p><div class="og og3">'+h+'</div>'+nav(true)+'</div>';}
function bS3(){var cts=[{k:'bedrooms',i:'🛏️',l:'Bedrooms',min:1,max:10},{k:'bathrooms',i:'🚿',l:'Bathrooms',min:1,max:10},{k:'cars',i:'🚗',l:'Car Parking',min:0,max:5},{k:'shops',i:'🏪',l:'Ground Shops',min:0,max:8}];var sh='';cts.forEach(function(ct){sh+='<div class="stpr"><div class="stpr-l"><span>'+ct.i+'</span><span>'+ct.l+'</span></div><div class="stpr-c"><div class="stb" onclick="adj(\''+ct.k+'\','+ct.min+','+ct.max+',-1)">−</div><div class="stv" id="sv-'+ct.k+'">'+C[ct.k]+'</div><div class="stb" onclick="adj(\''+ct.k+'\','+ct.min+','+ct.max+',1)">+</div></div></div>';});var feats=['🛋️ Drawing Room','🍽️ Formal Dining','📺 TV Lounge','🖥️ Home Office','🕌 Prayer Room','📚 Library','👤 Servant Quarter','📦 Store Room','⬇️ Basement','🏊 Swimming Pool','🌿 Garden','🌙 Rooftop Terrace','🏋️ Home Gym','🔥 BBQ Area','⚡ Generator Room','🤖 Smart Home','☀️ Solar Panels','📷 CCTV','🧖 Jacuzzi','🎮 Games Room','🎬 Home Cinema','🏫 Kids Playroom'];var ch='';feats.forEach(function(f){var on=C.features.indexOf(f)>-1?' on':'';ch+='<div class="chip'+on+'" onclick="togC(\''+f+'\',this)">'+f+'</div>';});var kts=[{v:'Open Plan Kitchen',i:'🍳',d:'Merged with dining'},{v:'Closed Traditional Kitchen',i:'🚪',d:'Separate room'},{v:'Double Kitchen',i:'👨‍🍳',d:'Main + servant'}];var kh='';kts.forEach(function(kt){var s=C.kitchen===kt.v?' s':'';kh+='<div class="oc'+s+'" onclick="selO(\'kitchen\',\''+kt.v+'\',this)"><div class="oc-i">'+kt.i+'</div><div class="oc-n">'+kt.v+'</div><div class="oc-d">'+kt.d+'</div></div>';});return'<div class="sbox"><div class="s-eye">Step 3 of 5 — Rooms</div><h2 class="s-hed">What\'s <em>inside</em>?</h2><p class="s-sub2">Select every room and feature you want included.</p><div style="font-size:10px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;">Room Count</div><div class="stprs">'+sh+'</div><div style="font-size:10px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;">Special Features</div><div class="chips">'+ch+'</div><div style="font-size:10px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;">Kitchen Type</div><div class="og og3">'+kh+'</div>'+nav(true)+'</div>';}
function bS4(){var pk=C.poolColor||'#38B8D4';var prev='<div class="clr-prev"><div style="flex:3;background:'+C.wallColor+'" id="cpw"></div><div style="flex:2.5;background:'+C.roofColor+'" id="cpr"></div><div style="flex:.8;background:'+C.trimColor+'" id="cpt"></div><div style="flex:.7;background:'+C.doorColor+'" id="cpd"></div><div style="flex:.8;background:'+pk+'" id="cpp"></div></div><div class="clr-lbl"><span style="flex:3;text-align:center;">Wall</span><span style="flex:2.5;text-align:center;">Roof</span><span style="flex:.8;text-align:center;">Trim</span><span style="flex:.7;text-align:center;">Door</span><span style="flex:.8;text-align:center;">Pool</span></div>';var swH='';var typs=['wall','roof','trim','door','pool'];var lbls={'wall':'🧱 Wall Color','roof':'🏠 Roof Color','trim':'🔲 Window Frames','door':'🚪 Door Color','pool':'🏊 Pool Color'};var keys={'wall':'wallColor','roof':'roofColor','trim':'trimColor','door':'doorColor','pool':'poolColor'};var cpIds={'wall':'cpw','roof':'cpr','trim':'cpt','door':'cpd','pool':'cpp'};typs.forEach(function(tp){swH+='<div class="sw-sec"><div class="sw-lbl">'+lbls[tp]+'</div><div class="sw-row" id="swr-'+tp+'">';var pal=PAL[tp]||PAL.wall;pal.forEach(function(pp){var clr=pp[0],nm=pp[1],sel=C[keys[tp]]===clr?' s':'';swH+='<div class="sw'+sel+'" style="background:'+clr+'" title="'+nm+'" onclick="pickSw(\''+tp+'\',\''+clr+'\',\''+cpIds[tp]+'\',this)"></div>';});swH+='</div></div>';});var fins=[['Smooth Plaster','🪣'],['Exposed Brick','🧱'],['Natural Stone','🪨'],['Textured Stucco','🌊']];var fh='';fins.forEach(function(fn){var s=C.finish===fn[0]?' s':'';fh+='<div class="oc'+s+'" onclick="selO(\'finish\',\''+fn[0]+'\',this)"><div class="oc-i">'+fn[1]+'</div><div class="oc-n">'+fn[0]+'</div></div>';});return'<div class="sbox"><div class="s-eye">Step 4 of 5 — Colors</div><h2 class="s-hed">Your <em>color palette</em></h2><p class="s-sub2">Colors go into the canvas render AND the AI image prompt automatically.</p>'+prev+swH+'<div style="font-size:10px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;">Wall Finish</div><div class="og og4">'+fh+'</div>'+nav(true)+'</div>';}
function bS5(){return'<div class="sbox"><div class="s-eye">Step 5 of 5 — Final</div><h2 class="s-hed">Almost <em>ready</em></h2><p class="s-sub2">Last details then your design + AI prompt are ready.</p><div style="max-width:460px;margin:0 auto;"><div class="tfield"><div class="tflbl">Client / Your Name</div><input class="ti" placeholder="e.g. Ahmed Khan" value="'+C.clientName+'" oninput="C.clientName=this.value;window.C=C;"></div><div class="tfield"><div class="tflbl">City / Location</div><input class="ti" placeholder="e.g. Lahore, Karachi, Dubai" value="'+C.city+'" oninput="C.city=this.value;window.C=C;"></div><div style="margin-bottom:20px;"><div style="font-size:10px;color:var(--muted);letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;">Budget</div><div style="max-width:440px;margin:0 auto;"><div style="display:flex;justify-content:space-between;font-size:11px;color:var(--muted);margin-bottom:7px;"><span>PKR 40 Lac</span><span>PKR 10 Crore+</span></div><input type="range" id="brange" min="40" max="1000" value="200" oninput="setBudget(this.value)"><div style="text-align:center;font-family:Cormorant Garamond,serif;font-size:34px;color:var(--gold2);margin:10px 0 3px;" id="bval">PKR 2 Crore</div><div style="text-align:center;font-size:12px;color:var(--muted);" id="btier">Semi-Luxury Finish</div></div></div><div class="tfield"><div class="tflbl">Special Requirements</div><textarea class="ti" rows="3" placeholder="e.g. rooftop pool, bigger master bedroom..." oninput="C.special=this.value;window.C=C;" style="resize:vertical;">'+C.special+'</textarea></div><div style="text-align:center;margin-top:26px;"><button class="btn-gen" onclick="runGen()">✨ Generate Design + Photo Prompt</button><div style="font-size:11px;color:var(--green);margin-top:10px;">🎁 Free — No signup needed</div></div></div>'+nav(true)+'</div>';}

function selM(s,el){C.plotSize=s+' Marla';window.C=C;el.parentElement.querySelectorAll('.mb').forEach(function(b){b.classList.remove('s');});el.classList.add('s');}
function selO(k,v,el){C[k]=v;window.C=C;el.closest('.og').querySelectorAll('.oc').forEach(function(o){o.classList.remove('s');});el.classList.add('s');}
function adj(k,mn,mx,d){C[k]=Math.max(mn,Math.min(mx,C[k]+d));window.C=C;var el=document.getElementById('sv-'+k);if(el)el.textContent=C[k];}
function togC(n,el){el.classList.toggle('on');var i=C.features.indexOf(n);i>-1?C.features.splice(i,1):C.features.push(n);window.C=C;}
function pickSw(tp,clr,cpId,el){var keys={'wall':'wallColor','roof':'roofColor','trim':'trimColor','door':'doorColor','pool':'poolColor'};C[keys[tp]]=clr;window.C=C;var row=document.getElementById('swr-'+tp);if(row)row.querySelectorAll('.sw').forEach(function(s){s.classList.remove('s');});el.classList.add('s');var cp=document.getElementById(cpId);if(cp)cp.style.background=clr;}
function setBudget(v){var l=parseInt(v),d,t;if(l<80){d='PKR '+l+' Lac';t='Basic / Grey Structure';}else if(l<200){d='PKR '+l+' Lac';t='Standard Finish';}else if(l<400){d='PKR '+(l/100).toFixed(1)+' Crore';t='Semi-Luxury Finish';}else if(l<700){d='PKR '+(l/100).toFixed(1)+' Crore';t='Full Luxury Finish';}else{d='PKR '+(l/100).toFixed(1)+'+ Crore';t='Ultra Luxury';}C.budget=d;window.C=C;var bv=document.getElementById('bval'),bt=document.getElementById('btier');if(bv)bv.textContent=d;if(bt)bt.textContent=t;var p=((v-40)/(1000-40))*100;var br=document.getElementById('brange');if(br)br.style.background='linear-gradient(to right,var(--gold) 0%,var(--gold) '+p+'%,var(--bg5) '+p+'%,var(--bg5) 100%)';}

// ── GENERATE ──
function runGen(){var cs=document.getElementById('cfg-step');if(cs)cs.style.display='none';var cp=document.getElementById('cfg-prog');if(cp)cp.style.display='none';var gb=document.getElementById('gen-box');if(gb)gb.style.display='block';var gls=document.querySelectorAll('.gl');var gi=0;var iv=setInterval(function(){if(gi>0){gls[gi-1].classList.remove('cur');gls[gi-1].classList.add('ok');}if(gi<gls.length){gls[gi].classList.add('cur');gi++;}else{clearInterval(iv);setTimeout(showResult,500);}},500);}

function buildPrompt(){var sd=STYLES[C.style]||STYLES['California Modern'];var base=sd.promptBase;var city=C.city||'luxury residential';var extras=[];if(C.features.indexOf('🏊 Swimming Pool')>-1||C.style==='California Modern'||C.style==='Modern Mediterranean'||C.style==='Tropical Luxury')extras.push('swimming pool');if(C.features.indexOf('🌿 Garden')>-1)extras.push('landscaped garden');if(C.features.indexOf('🌙 Rooftop Terrace')>-1)extras.push('rooftop terrace');if(C.features.indexOf('🔥 BBQ Area')>-1)extras.push('outdoor BBQ area');if(C.shops>0)extras.push(C.shops+' ground floor shops');if(C.cars>1)extras.push('covered garage for '+C.cars+' cars');var extraStr=extras.length>0?', '+extras.join(', '):'';return base.replace('ultra realistic',city+' luxury, ultra realistic')+extraStr;}
function getClrName(hex,type){var pal=PAL[type]||PAL.wall;for(var i=0;i<pal.length;i++){if(pal[i][0].toLowerCase()===hex.toLowerCase())return pal[i][1].toLowerCase();}return'custom';}
function hD(h,a){try{var r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16);r=Math.max(0,Math.round(r*(1-a)));g=Math.max(0,Math.round(g*(1-a)));b=Math.max(0,Math.round(b*(1-a)));return'#'+[r,g,b].map(function(v){return v.toString(16).padStart(2,'0');}).join('');}catch(e){return h;}}
function hL(h,a){try{var r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16);r=Math.min(255,Math.round(r+(255-r)*a));g=Math.min(255,Math.round(g+(255-g)*a));b=Math.min(255,Math.round(b+(255-b)*a));return'#'+[r,g,b].map(function(v){return v.toString(16).padStart(2,'0');}).join('');}catch(e){return h;}}

function getMock(){var sd=STYLES[C.style]||STYLES['California Modern'];var pn=parseInt(C.plotSize)||10;var sqft=pn*225,fln=C.floors==='G'?1:C.floors==='G+1'?2:C.floors==='G+2'?3:4,bup=Math.round(sqft*.4*fln);var base=pn*18;var costs=[{i:'Grey Structure',a:'PKR '+Math.round(base*.35)+' Lac'},{i:'Finishing & Tiling',a:'PKR '+Math.round(base*.22)+' Lac'},{i:'Electrical & Plumbing',a:'PKR '+Math.round(base*.15)+' Lac'},{i:'Woodwork & Doors',a:'PKR '+Math.round(base*.12)+' Lac'},{i:'Exterior & Landscape',a:'PKR '+Math.round(base*.10)+' Lac'},{i:'Contingency',a:'PKR '+Math.round(base*.06)+' Lac'},{i:'TOTAL ESTIMATE',a:base>100?'PKR '+(base/100).toFixed(1)+' Crore':'PKR '+base+' Lac'}];var rooms=[{i:'🚪',n:'Entrance Hall',s:'16×14 ft'},{i:'🛋️',n:'Drawing Room',s:'22×18 ft'},{i:'🍽️',n:'Dining Room',s:'18×14 ft'},{i:'🍳',n:'Kitchen',s:'16×12 ft'}];if(C.kitchen==='Double Kitchen')rooms.push({i:'👨‍🍳',n:'Servant Kitchen',s:'10×8 ft'});if(C.shops>0)rooms.push({i:'🏪',n:'Shops ×'+C.shops,s:'14×18 ft'});rooms.push({i:'🛏️',n:'Master Suite',s:'20×18 ft'},{i:'🛁',n:'Master Bath',s:'12×10 ft'},{i:'👗',n:'Wardrobe',s:'12×8 ft'});for(var b=1;b<C.bedrooms;b++)rooms.push({i:'🛏️',n:'Bed '+(b+1),s:'16×14 ft'});['🌿 Garden','🏊 Swimming Pool','🕌 Prayer Room','🏋️ Home Gym','🖥️ Home Office','👤 Servant Quarter','⬇️ Basement','🔥 BBQ Area','🎮 Games Room','🎬 Home Cinema'].forEach(function(ef){if(C.features.indexOf(ef)>-1)rooms.push({i:ef.split(' ')[0],n:ef.split(' ').slice(1).join(' '),s:'Included'});});var nm=C.clientName?C.clientName+"'s Villa":C.style+' Villa';return{villaName:nm,tagline:sd.tag,concept:sd.concept,features:sd.feats,materials:sd.mats,costs:costs,rooms:rooms,prompt:buildPrompt(),summary:{plotArea:C.plotSize+' ('+sqft.toLocaleString()+' sqft)',builtUp:'~'+bup.toLocaleString()+' sqft',groundCoverage:'40%',time:(14+fln*2)+'–'+(18+fln*2)+' months',floors:C.floors,style:C.style,finish:C.finish}};}

function showResult(){RDATA=getMock();window.RDATA=RDATA;pageHist.push('result');window.pageHist=pageHist;updBack();var gb=document.getElementById('gen-box');if(gb)gb.style.display='none';var cw=document.getElementById('cfg-wrap');if(cw)cw.style.display='none';var rw=document.getElementById('res-wrap');if(rw){rw.style.display='block';rw.innerHTML=buildResHTML(RDATA);}drawExtCanvas();drawFP(1);window.scrollTo({top:0,behavior:'smooth'});}

function buildResHTML(d){
  var nm=d.villaName||C.style;var nmH=nm.indexOf("'s")>-1?'<em>'+nm.split("'s")[0]+"'s</em>"+nm.split("'s").slice(1).join("'s"):nm;
  var ftags=(d.features||[]).map(function(f){return'<span class="ab-tag">'+f+'</span>';}).join('');
  var mats=(d.materials||[]).map(function(m){return'<div class="mat-r"><div class="mat-sw" style="background:'+m.c+'"></div><span class="mat-n">'+m.n+'</span><span class="mat-t">'+m.t+'</span></div>';}).join('');
  var ctR=(d.costs||[]).map(function(c){return'<tr><td>'+c.i+'</td><td>'+c.a+'</td></tr>';}).join('');
  var enc=encodeURIComponent(d.prompt);
  function lcSw(type,key){var pal=PAL[type]||PAL.wall;var h='';for(var i=0;i<Math.min(6,pal.length);i++){var cl=pal[i][0];var s=C[key]===cl?' s':'';h+='<div class="lsw'+s+'" style="background:'+cl+'" onclick="liveClr(\''+type+'\',\''+key+'\',\''+cl+'\',this)"></div>';}return'<span class="lcb-lbl">'+type[0].toUpperCase()+type.slice(1)+'</span><div class="lcs">'+h+'</div>';}
  var lcH=lcSw('wall','wallColor')+lcSw('roof','roofColor')+lcSw('trim','trimColor');
  var rmH=(d.rooms||[]).map(function(r){return'<div class="rgi"><span class="rgi-i">'+r.i+'</span><span class="rgi-n">'+r.n+'</span><span class="rgi-s">'+r.s+'</span></div>';}).join('');
  var sumR='<tr><td>Client</td><td>'+(C.clientName||'—')+'</td></tr><tr><td>City</td><td>'+(C.city||'—')+'</td></tr><tr><td>Plot</td><td>'+d.summary.plotArea+'</td></tr><tr><td>Type</td><td>'+C.plotType+'</td></tr><tr><td>Floors</td><td>'+d.summary.floors+'</td></tr><tr><td>Style</td><td>'+d.summary.style+'</td></tr><tr><td>Built-up</td><td>'+d.summary.builtUp+'</td></tr><tr><td>Timeline</td><td>'+d.summary.time+'</td></tr><tr><td>Finish</td><td>'+d.summary.finish+'</td></tr><tr><td>Budget</td><td>'+C.budget+'</td></tr>';
  return'<div class="res-head"><div class="res-badge">✨ Design Generated</div><div class="res-name">'+nmH+'</div><div class="res-tag">'+d.tagline+'</div></div>'
  +'<div class="photo-card"><div class="pc-h"><div class="pc-icon">📸</div><div class="pc-head"><h3>Your Photorealistic Image Prompt</h3><p>Auto-built from your exact selections. Paste into Bing (FREE) to get a real photo in 30 seconds.</p></div></div>'
  +'<div class="prompt-box"><div class="pb-top"><div class="pb-lbl">✨ AI Image Prompt</div><button class="pb-copy" onclick="copyPrompt()">📋 Copy</button></div><div class="pb-text" id="the-prompt">'+d.prompt+'</div></div>'
  +'<div class="launch-row"><a class="launch-btn lb-bing" href="https://www.bing.com/images/create?q='+enc+'" target="_blank">🆓 Bing Image Creator<span class="lb-sub">FREE — paste prompt here</span></a><a class="launch-btn lb-mj" href="https://www.midjourney.com" target="_blank">🎨 Midjourney<span class="lb-sub">Best quality $10/mo</span></a><a class="launch-btn lb-gpt" href="https://chat.openai.com" target="_blank">🤖 ChatGPT DALL-E<span class="lb-sub">ChatGPT Plus users</span></a></div>'
  +'<div class="bing-guide"><div class="bg-title">⚠️ How to Use Bing — DO NOT upload any file. Just TYPE the prompt!</div><div class="bg-steps"><div class="bg-step"><div class="bg-snum">1</div><div class="bg-stxt">Open Bing above</div></div><div class="bg-step"><div class="bg-snum">2</div><div class="bg-stxt">Click text box "Describe the image..."</div></div><div class="bg-step"><div class="bg-snum">3</div><div class="bg-stxt">PASTE prompt text — no file upload!</div></div><div class="bg-step"><div class="bg-snum">4</div><div class="bg-stxt">Click Create — photo ready in 30s</div></div></div></div></div>'
  +'<div class="res-grid"><div class="rcard"><div class="rcard-h"><div class="rch-dot"></div><div class="rch-t">🏠 Canvas Render</div><div class="rch-s">Live colors</div></div><div class="lcb"><div class="lcb-row">'+lcH+'</div></div><canvas id="ext-cv" width="520" height="300" style="width:100%;display:block;border-radius:0 0 14px 14px;"></canvas></div>'
  +'<div class="ai-brief"><div class="ab-title">🤖 Design Brief</div><div class="ab-sec"><div class="ab-lbl">Concept</div><div class="ab-text">'+d.concept+'</div></div><div class="ab-sec"><div class="ab-lbl">Signature Features</div><div class="ab-tags">'+ftags+'</div></div><div class="ab-sec"><div class="ab-lbl">Materials</div>'+mats+'</div><div class="ab-sec"><div class="ab-lbl">Cost Estimate</div><table class="cost-t">'+ctR+'</table></div></div></div>'
  +'<div class="rcard" style="margin-bottom:18px;"><div class="rcard-h"><div class="rch-dot"></div><div class="rch-t">📐 Floor Plans</div><div class="rch-s">'+C.plotSize+' · '+C.plotType+'</div></div><div class="fp-tabs"><button class="fpt" onclick="sFP(0,this)">Basement</button><button class="fpt act" onclick="sFP(1,this)">Ground</button><button class="fpt" onclick="sFP(2,this)">1st Floor</button><button class="fpt" onclick="sFP(3,this)">2nd Floor</button><button class="fpt" onclick="sFP(4,this)">Rooftop</button></div><div class="fp-body"><canvas id="fp-cv" width="560" height="370" style="width:100%;display:block;"></canvas><div class="rp" id="rp-panel"></div></div></div>'
  +'<div class="res-grid" style="margin-bottom:18px;"><div class="ai-brief"><div class="ab-title">🏠 Room List</div><div class="rooms-g">'+rmH+'</div></div><div class="ai-brief"><div class="ab-title">📋 Summary</div><table class="sum-t">'+sumR+'</table></div></div>'
  +'<div class="dl-row"><button class="btn-dl bdp" onclick="doDownload()">⬇️ Download Design</button><button class="btn-dl bds" onclick="window.print()">🖨️ Print</button><button class="btn-dl bds" onclick="restartCfg()">🔄 New Design</button></div>'
  +'<div class="wmark">ARCHAI · <span>Free for 1 Year · archai.design</span></div>';
}

function copyPrompt(){var el=document.getElementById('the-prompt');if(el){navigator.clipboard.writeText(el.textContent.trim()).then(function(){alert('✅ Prompt copied!\n\nNow go to bing.com/create\nCLICK the text box\nPASTE the text\nClick Create\n\nDO NOT upload any file!');}).catch(function(){prompt('Copy this:',el.textContent.trim());});}}
function liveClr(type,key,color,el){C[key]=color;window.C=C;var cl=el.closest('.lcs');if(cl)cl.querySelectorAll('.lsw').forEach(function(s){s.classList.remove('s');});el.classList.add('s');drawExtCanvas();if(RDATA){RDATA.prompt=buildPrompt();window.RDATA=RDATA;var pe=document.getElementById('the-prompt');if(pe)pe.textContent=RDATA.prompt;}}
function sFP(idx,el){document.querySelectorAll('.fpt').forEach(function(t){t.classList.remove('act');});el.classList.add('act');drawFP(idx);}
function restartCfg(){var rw=document.getElementById('res-wrap');if(rw)rw.style.display='none';var cw=document.getElementById('cfg-wrap');if(cw)cw.style.display='block';var cp=document.getElementById('cfg-prog');if(cp)cp.style.display='flex';var cs=document.getElementById('cfg-step');if(cs)cs.style.display='block';var gb=document.getElementById('gen-box');if(gb)gb.style.display='none';step=1;window.step=step;renderStep();window.scrollTo({top:0,behavior:'smooth'});}

// ── DRAW EXT CANVAS ──
function drawExtCanvas(){var cv=document.getElementById('ext-cv');if(!cv)return;var ctx=cv.getContext('2d'),W=cv.width,H=cv.height;ctx.clearRect(0,0,W,H);var sky=ctx.createLinearGradient(0,0,0,H*.65);sky.addColorStop(0,'#05091a');sky.addColorStop(0.5,'#0e1a30');sky.addColorStop(1,'#1a2f48');ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);for(var i=0;i<55;i++){ctx.fillStyle='rgba(255,255,255,'+(0.12+Math.random()*.5)+')';ctx.beginPath();ctx.arc(Math.random()*W,Math.random()*H*.6,Math.random()*1.3,0,Math.PI*2);ctx.fill();}var mg=ctx.createRadialGradient(W-75,44,0,W-75,44,44);mg.addColorStop(0,'rgba(255,250,220,.2)');mg.addColorStop(1,'transparent');ctx.fillStyle=mg;ctx.beginPath();ctx.arc(W-75,44,44,0,Math.PI*2);ctx.fill();ctx.fillStyle='rgba(255,252,228,.9)';ctx.beginPath();ctx.arc(W-75,44,18,0,Math.PI*2);ctx.fill();var hor=H*.64;var fns={'California Modern':dCali,'South Asian Contemporary':dSAC,'Modern Mediterranean':dMed2,'Islamic Grand':dIslamic2,'Modern Minimalist':dMinimal2,'Desert Contemporary':dDesert2,'Tropical Luxury':dTropical2,'Colonial Classic':dColonial2,'Pakistani Traditional':dTraditional2};(fns[C.style]||dCali)(ctx,W,H,hor);var gnd=ctx.createLinearGradient(0,hor,0,H);gnd.addColorStop(0,'#0e1c08');gnd.addColorStop(1,'#070c04');ctx.fillStyle=gnd;ctx.fillRect(0,hor,W,H-hor);ctx.fillStyle='rgba(45,42,28,.62)';ctx.beginPath();ctx.moveTo(W/2-20,H);ctx.lineTo(W/2+20,H);ctx.lineTo(W/2+12,hor);ctx.lineTo(W/2-12,hor);ctx.closePath();ctx.fill();for(var lp=0;lp<2;lp++){var lx=[68,W-68][lp];ctx.strokeStyle='#444';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(lx,hor);ctx.lineTo(lx,hor-44);ctx.stroke();var lg2=ctx.createRadialGradient(lx,hor-44,0,lx,hor-44,20);lg2.addColorStop(0,'rgba(255,200,80,.42)');lg2.addColorStop(1,'transparent');ctx.fillStyle=lg2;ctx.beginPath();ctx.arc(lx,hor-44,20,0,Math.PI*2);ctx.fill();}ctx.fillStyle='rgba(200,169,110,.55)';ctx.font='bold 10px Outfit';ctx.textAlign='center';ctx.fillText((RDATA?RDATA.villaName:C.style)+' · '+C.plotSize,W/2,H-11);}
// CALIFORNIA MODERN — matches Image 1
function dCali(ctx,W,H,hor){
  var cx=W/2,wc=C.wallColor,fc=C.trimColor,dc=C.doorColor,pc=C.poolColor||'#38B8D4';
  var bw=530,bh=185,bx=cx-bw/2,by=hor-bh;
  ctx.fillStyle='rgba(0,0,0,.28)';ctx.fillRect(bx+12,by+12,bw,bh);
  var wg=ctx.createLinearGradient(0,by,0,hor);wg.addColorStop(0,wc);wg.addColorStop(1,hD(wc,.1));ctx.fillStyle=wg;ctx.fillRect(bx,by,bw,bh);
  // === GABLED ROOF (key element of Image 1) ===
  ctx.fillStyle=hD(wc,.07);
  ctx.beginPath();ctx.moveTo(bx-12,by);ctx.lineTo(cx-40,by-52);ctx.lineTo(cx+40,by-52);ctx.lineTo(bx+bw+12,by);ctx.closePath();ctx.fill();
  ctx.strokeStyle=fc;ctx.lineWidth=2.5;ctx.stroke();
  // Secondary smaller gabled section right
  ctx.fillStyle=hD(wc,.06);
  ctx.beginPath();ctx.moveTo(bx+bw*.5,by);ctx.lineTo(bx+bw*.72,by-26);ctx.lineTo(bx+bw+15,by);ctx.closePath();ctx.fill();
  ctx.strokeStyle=fc;ctx.lineWidth=1.8;ctx.stroke();
  // Roof ridge dark metal trim
  ctx.fillStyle=fc;ctx.fillRect(bx-14,by-2,bw+28,5);

  // WARM TIMBER VISIBLE THROUGH GLASS (centre panels)
  var timberX=bx+bw*.3,timberW=bw*.36;
  ctx.fillStyle='rgba(180,115,45,.42)';ctx.fillRect(timberX,by+10,timberW,bh-10);
  ctx.fillStyle='rgba(255,185,80,.22)';ctx.fillRect(timberX,by+10,timberW,bh-10);
  // Timber planks horizontal
  for(var tp=0;tp<8;tp++){ctx.strokeStyle='rgba(140,85,25,.25)';ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(timberX,by+18+tp*20);ctx.lineTo(timberX+timberW,by+18+tp*20);ctx.stroke();}

  // GLASS PANELS with dark frames (4 sections)
  var glassSects=[
    {x:bx+6,w:bw*.28-4},{x:timberX,w:timberW},
    {x:bx+bw*.66+6,w:bw*.2},{x:bx+bw*.86+6,w:bw*.14-10}
  ];
  glassSects.forEach(function(gp){
    if(gp!==glassSects[1]){ctx.fillStyle='rgba(60,100,145,.38)';ctx.fillRect(gp.x,by+12,gp.w,bh-12);}
    ctx.strokeStyle=fc;ctx.lineWidth=3;ctx.strokeRect(gp.x,by+12,gp.w,bh-12);
    ctx.strokeStyle=hD(fc,.3);ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(gp.x+gp.w/2,by+12);ctx.lineTo(gp.x+gp.w/2,hor);ctx.stroke();
    // Horizontal rail
    ctx.beginPath();ctx.moveTo(gp.x,by+bh*.48);ctx.lineTo(gp.x+gp.w,by+bh*.48);ctx.stroke();
  });
  // Interior warm glow
  ctx.fillStyle='rgba(255,195,90,.08)';ctx.fillRect(bx+6,by+12,bw-12,bh-12);

  // COVERED PATIO / PERGOLA (left side — key Image 1 element)
  var patioW=bw*.48;
  ctx.fillStyle=hD(wc,.04);ctx.fillRect(bx,by-8,patioW,10);
  // Pergola beams (wood colour)
  for(var pb=0;pb<14;pb++){ctx.fillStyle='rgba(175,125,55,.7)';ctx.fillRect(bx+3+pb*patioW/14,by-8,patioW/14-2,10);}
  // Pergola shadow on house
  ctx.fillStyle='rgba(0,0,0,.12)';ctx.fillRect(bx,by,patioW,24);
  // Pergola columns
  for(var pc3=0;pc3<3;pc3++){var pcx=bx+pc3*(patioW/2.2);ctx.fillStyle=wc;ctx.fillRect(pcx-7,by,14,bh);}
  // Outdoor furniture
  ctx.fillStyle='rgba(60,60,60,.7)';ctx.fillRect(bx+20,hor-28,130,22);// table
  for(var ch=0;ch<4;ch++){ctx.fillStyle='rgba(50,50,50,.65)';ctx.fillRect(bx+10+ch*34,hor-32,24,28);}

  // BBQ on left
  ctx.fillStyle='rgba(40,40,40,.6)';ctx.fillRect(bx+2,hor-38,28,36);

  // Upper floor windows
  var ufy=by-52,uh=54;
  ctx.fillStyle=hD(wc,.03);ctx.fillRect(bx+55,ufy-uh,bw-110,uh);
  [{x:bx+80,w:70},{x:bx+165,w:70},{x:bx+250,w:70},{x:bx+340,w:60}].forEach(function(uw){
    ctx.fillStyle='rgba(255,185,80,.25)';ctx.fillRect(uw.x,ufy-uh+8,uw.w,uh-10);
    ctx.strokeStyle=fc;ctx.lineWidth=2.5;ctx.strokeRect(uw.x,ufy-uh+8,uw.w,uh-10);
    ctx.beginPath();ctx.moveTo(uw.x+uw.w/2,ufy-uh+8);ctx.lineTo(uw.x+uw.w/2,ufy-2);ctx.stroke();
  });

  // MANICURED LAWN
  var lawnG=ctx.createLinearGradient(0,hor,0,hor+50);lawnG.addColorStop(0,'rgba(40,120,35,.8)');lawnG.addColorStop(1,'rgba(25,90,20,.6)');ctx.fillStyle=lawnG;ctx.fillRect(bx+10,hor+2,bw-20,42);
  // Lawn pattern (mowing stripes)
  for(var ls=0;ls<8;ls++){ctx.fillStyle=ls%2===0?'rgba(40,130,35,.15)':'rgba(30,100,28,.1)';ctx.fillRect(bx+10+ls*((bw-20)/8),hor+2,(bw-20)/8,42);}

  // Stepping stone path
  for(var ss=0;ss<6;ss++){ctx.fillStyle='rgba(195,185,165,.55)';ctx.fillRect(cx-24+ss*52,hor+48,36,14);}

  // LAP POOL + SPA (key Image 1 element)
  var poolX=bx+12,poolY=hor+68,poolW=bw*.62,poolH=32;
  var pg=ctx.createLinearGradient(poolX,0,poolX+poolW,0);pg.addColorStop(0,pc);pg.addColorStop(.5,hL(pc,.18));pg.addColorStop(1,pc);ctx.fillStyle=pg;ctx.fillRect(poolX,poolY,poolW,poolH);
  for(var pw=0;pw<8;pw++){ctx.strokeStyle='rgba(255,255,255,.1)';ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(poolX+pw*poolW/8,poolY+poolH*.3);ctx.quadraticCurveTo(poolX+pw*poolW/8+poolW/16,poolY+3,poolX+pw*poolW/8+poolW/8,poolY+poolH*.3);ctx.stroke();}
  // Pool coping
  ctx.fillStyle='rgba(195,185,165,.62)';ctx.fillRect(poolX-5,poolY-5,poolW+10,7);
  ctx.strokeStyle='rgba(255,255,255,.28)';ctx.lineWidth=1.5;ctx.strokeRect(poolX,poolY,poolW,poolH);
  // Spa/jacuzzi beside pool
  ctx.fillStyle=hL(pc,.1);ctx.fillRect(poolX+poolW+6,poolY,36,36);ctx.strokeStyle='rgba(255,255,255,.22)';ctx.lineWidth=1;ctx.strokeRect(poolX+poolW+6,poolY,36,36);

  // Trees
  for(var tr=0;tr<2;tr++){palmFull(ctx,[bx-48,bx+bw+30][tr],hor,'#2D7832');}
  // Olive/landscape trees right
  rtreeFull(ctx,bx+bw+10,hor);
}

// SOUTH ASIAN CONTEMPORARY — matches Image 2
function dSAC(ctx,W,H,hor){
  var cx=W/2,wc=C.wallColor,fc=C.trimColor,dc=C.doorColor;
  var bw=480,bh=180,bx=cx-bw/2,by=hor-bh;
  ctx.fillStyle='rgba(0,0,0,.25)';ctx.fillRect(bx+11,by+11,bw,bh);
  ctx.fillStyle=wc;ctx.fillRect(bx,by,bw,bh);

  // === WOOD ACCENT PANELS — horizontal (key Image 2 element) ===
  // Left panel
  ctx.fillStyle='rgba(160,100,40,.8)';ctx.fillRect(bx,by+20,bw*.22,bh-20);
  for(var wp=0;wp<8;wp++){ctx.strokeStyle='rgba(120,70,22,.35)';ctx.lineWidth=.9;ctx.beginPath();ctx.moveTo(bx,by+28+wp*18);ctx.lineTo(bx+bw*.22,by+28+wp*18);ctx.stroke();}
  // Right panel
  ctx.fillStyle='rgba(160,100,40,.65)';ctx.fillRect(bx+bw*.76,by+15,bw*.24,bh-15);
  for(var wp2=0;wp2<8;wp2++){ctx.strokeStyle='rgba(120,70,22,.3)';ctx.lineWidth=.9;ctx.beginPath();ctx.moveTo(bx+bw*.76,by+24+wp2*18);ctx.lineTo(bx+bw,by+24+wp2*18);ctx.stroke();}

  // LARGE WINDOWS — multiple panels side by side (key Image 2 element)
  var winSet=[{x:bx+bw*.24,w:bw*.26/4},{x:bx+bw*.24+bw*.26/4+3,w:bw*.26/4},{x:bx+bw*.24+2*(bw*.26/4+3),w:bw*.26/4},{x:bx+bw*.24+3*(bw*.26/4+3),w:bw*.26/4}];
  winSet.forEach(function(win){
    ctx.fillStyle='rgba(255,185,75,.28)';ctx.fillRect(win.x,by+18,win.w,bh-18);
    ctx.strokeStyle=fc;ctx.lineWidth=3;ctx.strokeRect(win.x,by+18,win.w,bh-18);
    // Grid window detail
    ctx.strokeStyle=hD(fc,.4);ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(win.x+win.w/2,by+18);ctx.lineTo(win.x+win.w/2,by+bh);ctx.stroke();
    ctx.beginPath();ctx.moveTo(win.x,by+bh*.45);ctx.lineTo(win.x+win.w,by+bh*.45);ctx.stroke();
  });
  // Middle glass section (right of windows)
  ctx.fillStyle='rgba(255,185,75,.32)';ctx.fillRect(bx+bw*.56,by+14,bw*.2,bh-14);
  ctx.strokeStyle=fc;ctx.lineWidth=3;ctx.strokeRect(bx+bw*.56,by+14,bw*.2,bh-14);
  ctx.strokeStyle=hD(fc,.3);ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(bx+bw*.66,by+14);ctx.lineTo(bx+bw*.66,hor);ctx.stroke();

  // FLAT ROOF (cubic — Image 2 style)
  ctx.fillStyle=hD(wc,.08);ctx.fillRect(bx-6,by-12,bw+12,14);
  ctx.fillStyle=hD(wc,.16);ctx.fillRect(bx-10,by-14,bw+20,5);
  // Roof edge detail
  ctx.strokeStyle=hD(wc,.2);ctx.lineWidth=1;ctx.strokeRect(bx-10,by-14,bw+20,5);

  // === UPPER FLOOR (set slightly back — Image 2) ===
  var ufy=by-110,uh=112;
  ctx.fillStyle=hL(wc,.03);ctx.fillRect(bx+35,ufy,bw-70,uh);
  ctx.fillStyle='rgba(0,0,0,.05)';ctx.fillRect(bx+35,ufy,bw-70,10);

  // Upper wood panel
  ctx.fillStyle='rgba(160,100,40,.65)';ctx.fillRect(bx+35,ufy,bw*.18,uh);
  for(var up=0;up<6;up++){ctx.strokeStyle='rgba(120,70,22,.28)';ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(bx+35,ufy+14+up*16);ctx.lineTo(bx+35+bw*.18,ufy+14+up*16);ctx.stroke();}

  // Upper windows — large
  [{x:bx+35+bw*.19,w:bw*.16},{x:bx+35+bw*.19+bw*.16+6,w:bw*.16},{x:bx+35+bw*.19+2*(bw*.16+6),w:bw*.14},{x:bx+35+bw*.19+3*bw*.16+18,w:bw*.12}].forEach(function(uw){
    ctx.fillStyle='rgba(255,185,75,.25)';ctx.fillRect(uw.x,ufy+12,uw.w,uh-14);
    ctx.strokeStyle=fc;ctx.lineWidth=2.5;ctx.strokeRect(uw.x,ufy+12,uw.w,uh-14);
    ctx.strokeStyle=hD(fc,.3);ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(uw.x+uw.w/2,ufy+12);ctx.lineTo(uw.x+uw.w/2,ufy+uh-2);ctx.stroke();
    ctx.beginPath();ctx.moveTo(uw.x,ufy+uh*.45);ctx.lineTo(uw.x+uw.w,ufy+uh*.45);ctx.stroke();
  });
  // Upper flat roof
  ctx.fillStyle=hD(wc,.08);ctx.fillRect(bx+30,ufy-12,bw-60,14);
  ctx.fillStyle=hD(wc,.16);ctx.fillRect(bx+26,ufy-14,bw-52,5);

  // === COVERED ENTRANCE PORCH (Image 2) ===
  var porchX=bx+bw*.25,porchW=bw*.35;
  ctx.fillStyle='rgba(0,0,0,.1)';ctx.fillRect(porchX,hor-26,porchW,26);
  ctx.fillStyle=hD(wc,.05);ctx.fillRect(porchX-4,hor-28,porchW+8,8);
  // Porch ceiling light
  var pcLight=ctx.createRadialGradient(porchX+porchW/2,hor-14,0,porchX+porchW/2,hor-14,20);pcLight.addColorStop(0,'rgba(255,200,90,.35)');pcLight.addColorStop(1,'transparent');
  ctx.fillStyle=pcLight;ctx.beginPath();ctx.arc(porchX+porchW/2,hor-14,20,0,Math.PI*2);ctx.fill();
  // Main door
  ctx.fillStyle=hD(dc,.1);ctx.fillRect(porchX+porchW/2-18,hor-68,36,68);
  ctx.strokeStyle=fc;ctx.lineWidth=2;ctx.strokeRect(porchX+porchW/2-18,hor-68,36,68);
  ctx.beginPath();ctx.moveTo(porchX+porchW/2,hor-68);ctx.lineTo(porchX+porchW/2,hor);ctx.stroke();

  // WALL LIGHTS (Image 2 — exterior wall sconces)
  [{x:bx+20},{x:bx+bw-20},{x:bx+bw*.5}].forEach(function(wl){
    var wlg=ctx.createRadialGradient(wl.x,hor-45,0,wl.x,hor-45,18);wlg.addColorStop(0,'rgba(255,200,90,.32)');wlg.addColorStop(1,'transparent');
    ctx.fillStyle=wlg;ctx.beginPath();ctx.arc(wl.x,hor-45,18,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='rgba(255,200,90,.8)';ctx.beginPath();ctx.arc(wl.x,hor-45,3,0,Math.PI*2);ctx.fill();
  });

  // GARDEN (Image 2 style — neat hedges, feature plants)
  ctx.fillStyle='rgba(35,105,30,.72)';ctx.fillRect(bx,hor+2,bw,12);
  // Hedge row
  for(var h2=0;h2<12;h2++){ctx.fillStyle='rgba(30,100,28,.8)';ctx.beginPath();ctx.arc(bx+20+h2*40,hor,14,Math.PI,0);ctx.fill();}
  // Feature plants / small trees
  [{x:bx+bw*.12},{x:bx+bw*.88}].forEach(function(pl){
    ctx.fillStyle='rgba(72,52,28,.7)';ctx.fillRect(pl.x-6,hor-18,12,18);
    ctx.fillStyle='rgba(30,100,28,.85)';ctx.beginPath();ctx.arc(pl.x,hor-28,16,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='rgba(45,130,38,.45)';ctx.beginPath();ctx.arc(pl.x,hor-28,24,0,Math.PI*2);ctx.fill();
  });
  // Stone driveway
  ctx.fillStyle='rgba(170,160,145,.35)';ctx.fillRect(cx-30,hor,60,18);
  // Reflection on wet road (Image 2 shows wet road)
  var refl=ctx.createLinearGradient(0,hor+10,0,hor+40);refl.addColorStop(0,'rgba(255,185,75,.08)');refl.addColorStop(1,'transparent');ctx.fillStyle=refl;ctx.fillRect(bx,hor+2,bw,40);

  // Trees
  rtreeFull(ctx,bx-42,hor);rtreeFull(ctx,bx+bw+18,hor);
}

// Other style draw functions (reusing existing quality)
function dMed2(ctx,W,H,hor){
  var cx=W/2,wc=C.wallColor,fc=C.trimColor,dc=C.doorColor,pc=C.poolColor||'#38B8D4';
  var bw=490,bh=185,bx=cx-bw/2,by=hor-bh;
  ctx.fillStyle='rgba(0,0,0,.28)';ctx.fillRect(bx+11,by+11,bw,bh);
  var wg=ctx.createLinearGradient(0,by,0,hor);wg.addColorStop(0,wc);wg.addColorStop(1,hD(wc,.1));ctx.fillStyle=wg;ctx.fillRect(bx,by,bw,bh);
  ctx.fillStyle='rgba(175,148,108,.5)';ctx.fillRect(bx,by+bh-72,190,72);
  for(var s=0;s<5;s++){ctx.strokeStyle='rgba(145,118,72,.25)';ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(bx,by+bh-72+s*14);ctx.lineTo(bx+190,by+bh-72+s*14);ctx.stroke();}
  ctx.fillStyle='rgba(255,195,80,.22)';ctx.fillRect(bx+195,by+14,bw-195,bh-14);
  [{x:bx+200,w:90},{x:bx+296,w:90},{x:bx+392,w:bw-200}].forEach(function(gp){
    ctx.strokeStyle=fc;ctx.lineWidth=3;ctx.strokeRect(gp.x,by+14,gp.w,bh-14);ctx.beginPath();ctx.moveTo(gp.x+gp.w/2,by+14);ctx.lineTo(gp.x+gp.w/2,hor);ctx.stroke();ctx.beginPath();ctx.moveTo(gp.x,by+bh*.45);ctx.lineTo(gp.x+gp.w,by+bh*.45);ctx.stroke();
  });
  ctx.fillStyle='rgba(255,255,255,.92)';ctx.fillRect(bx-14,by-12,bw*.48+14,11);
  for(var ps=0;ps<16;ps++)ctx.fillRect(bx-10+ps*bw*.48/15,by-12,bw*.48/15-2,40);
  ctx.fillStyle='rgba(0,0,0,.08)';ctx.fillRect(bx-14,by+26,bw*.48+14,26);
  for(var pc4=0;pc4<3;pc4++){ctx.fillStyle=hL(wc,.06);ctx.fillRect(bx-8+pc4*80,by,13,bh);}
  var ufy=by-96;ctx.fillStyle=hL(wc,.03);ctx.fillRect(bx+44,ufy,bw-88,98);
  [{x:bx+70,w:90},{x:bx+175,w:90},{x:bx+280,w:90},{x:bx+385,w:70}].forEach(function(uw){
    ctx.fillStyle='rgba(255,185,75,.24)';ctx.fillRect(uw.x,ufy+12,uw.w,80);ctx.strokeStyle=fc;ctx.lineWidth=2.5;ctx.strokeRect(uw.x,ufy+12,uw.w,80);ctx.beginPath();ctx.moveTo(uw.x+uw.w/2,ufy+12);ctx.lineTo(uw.x+uw.w/2,ufy+92);ctx.stroke();
  });
  ctx.fillStyle=hD(wc,.06);ctx.fillRect(bx+40,ufy-10,bw-80,12);
  ctx.fillStyle=hL(wc,.1);ctx.fillRect(bx+40,ufy-12,bw-80,4);
  // Pool
  var pgx=ctx.createLinearGradient(bx,0,bx+370,0);pgx.addColorStop(0,pc);pgx.addColorStop(.5,hL(pc,.18));pgx.addColorStop(1,pc);ctx.fillStyle=pgx;ctx.fillRect(bx+8,hor+5,370,38);
  for(var pw2=0;pw2<8;pw2++){ctx.strokeStyle='rgba(255,255,255,.1)';ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(bx+8+pw2*46,hor+16);ctx.quadraticCurveTo(bx+8+pw2*46+23,hor+4,bx+8+pw2*46+46,hor+16);ctx.stroke();}
  ctx.strokeStyle='rgba(255,255,255,.28)';ctx.lineWidth=1.5;ctx.strokeRect(bx+8,hor+5,370,38);
  ctx.fillStyle='rgba(195,185,165,.55)';ctx.fillRect(bx+4,hor+1,378,6);
  for(var sl=0;sl<3;sl++){ctx.fillStyle='rgba(244,241,236,.88)';ctx.fillRect(bx+12+sl*118,hor+48,96,12);}
  palmFull(ctx,bx-46,hor,'#2D7030');palmFull(ctx,bx-18,hor,'#3A8A38');palmFull(ctx,bx+bw+32,hor,'#2D6A2D');palmFull(ctx,bx+bw+6,hor,'#4A8A40');
}

function dIslamic2(ctx,W,H,hor){
  var cx=W/2,wc=C.wallColor,rc=C.roofColor||'#C8A030',tc=C.trimColor,dc=C.doorColor;
  var bw=380,bh=168,bx=cx-bw/2,by=hor-bh;
  ctx.fillStyle='rgba(0,0,0,.3)';ctx.fillRect(bx+10,by+10,bw,bh);
  var wg=ctx.createLinearGradient(0,by,0,hor);wg.addColorStop(0,wc);wg.addColorStop(1,hD(wc,.14));ctx.fillStyle=wg;ctx.fillRect(bx,by,bw,bh);
  ctx.fillStyle=tc+'44';ctx.fillRect(bx,by+bh-32,bw,5);
  for(var i=0;i<5;i++){var wx=bx+22+i*64,ww=42,wh=72;ctx.fillStyle='rgba(28,48,78,.78)';ctx.fillRect(wx,by+24+wh*.35,ww,wh*.65);ctx.beginPath();ctx.moveTo(wx,by+24+wh*.35);ctx.lineTo(wx+ww/2,by+24);ctx.lineTo(wx+ww,by+24+wh*.35);ctx.fill();ctx.strokeStyle=tc+'99';ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(wx,by+24+wh*.35);ctx.lineTo(wx+ww/2,by+21);ctx.lineTo(wx+ww,by+24+wh*.35);ctx.stroke();}
  var ex=cx-28,ew=56,eh=95;ctx.fillStyle=dc;ctx.fillRect(ex,hor-eh*.65,ew,eh*.65);ctx.beginPath();ctx.moveTo(ex,hor-eh*.56);ctx.lineTo(cx,hor-eh);ctx.lineTo(ex+ew,hor-eh*.56);ctx.fillStyle=hD(dc,.18);ctx.fill();ctx.strokeStyle=tc;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(ex,hor-eh*.56);ctx.lineTo(cx,hor-eh-4);ctx.lineTo(ex+ew,hor-eh*.56);ctx.stroke();
  var ufy=by-88;ctx.fillStyle=hL(wc,.04);ctx.fillRect(bx+30,ufy,bw-60,88);
  for(var j=0;j<4;j++){var wx2=bx+55+j*66,ww2=38,wh2=56;ctx.fillStyle='rgba(28,48,78,.7)';ctx.fillRect(wx2,ufy+12+wh2*.35,ww2,wh2*.65);ctx.beginPath();ctx.moveTo(wx2,ufy+12+wh2*.35);ctx.lineTo(wx2+ww2/2,ufy+12);ctx.lineTo(wx2+ww2,ufy+12+wh2*.35);ctx.fill();}
  ctx.fillStyle=rc;ctx.fillRect(bx-7,ufy-12,bw+14,12);for(var k=0;k<22;k++)ctx.fillRect(bx-5+k*16,ufy-20,10,10);
  ctx.fillStyle=rc;ctx.beginPath();ctx.ellipse(cx,ufy-9,25,7,0,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.moveTo(cx-20,ufy-9);ctx.quadraticCurveTo(cx-22,ufy-40,cx,ufy-58);ctx.quadraticCurveTo(cx+22,ufy-40,cx+20,ufy-9);ctx.fillStyle=hL(rc,.1);ctx.fill();ctx.strokeStyle=tc+'77';ctx.lineWidth=1.3;ctx.stroke();ctx.fillStyle=tc;ctx.beginPath();ctx.arc(cx,ufy-60,3,0,Math.PI*2);ctx.fill();
  for(var mi=0;mi<2;mi++){var mx=[bx-6,bx+bw-13][mi];ctx.fillStyle=hD(wc,.04);ctx.fillRect(mx,ufy-64,18,68);ctx.fillStyle=rc;ctx.beginPath();ctx.moveTo(mx-2,ufy-64);ctx.lineTo(mx+9,ufy-90);ctx.lineTo(mx+20,ufy-64);ctx.fill();}
  palmFull(ctx,bx-40,hor,'#2D6A2D');palmFull(ctx,bx+bw+20,hor,'#3A8A3A');
}

function dMinimal2(ctx,W,H,hor){
  var cx=W/2,wc=C.wallColor,rc=C.roofColor||'#1A1A1A',fc=C.trimColor,dc=C.doorColor;
  var bw=420,bh=115,bx=cx-bw/2,by=hor-bh;
  ctx.fillStyle='rgba(0,0,0,.26)';ctx.fillRect(bx+9,by+9,bw,bh+24);ctx.fillStyle=wc;ctx.fillRect(bx,by,bw,bh);
  ctx.fillStyle='rgba(0,0,0,.04)';for(var i=0;i<7;i++)ctx.fillRect(bx,by+i*16,bw,1);
  ctx.fillStyle='rgba(68,108,148,.55)';ctx.fillRect(bx+12,by+8,130,bh-8);
  ctx.strokeStyle='rgba(150,180,220,.14)';ctx.lineWidth=.8;for(var g=0;g<5;g++){ctx.beginPath();ctx.moveTo(bx+12+g*25,by+8);ctx.lineTo(bx+12+g*25,by+bh);ctx.stroke();}
  ctx.fillStyle=hD(wc,.22);ctx.fillRect(bx+145,by,16,bh);ctx.fillStyle=wc;ctx.fillRect(bx+163,by+16,100,bh-16);ctx.fillStyle='rgba(68,108,148,.44)';ctx.fillRect(bx+267,by+20,65,bh-20);ctx.fillStyle=hD(wc,.25);ctx.fillRect(bx+335,by,18,bh);ctx.fillStyle='rgba(68,108,148,.4)';ctx.fillRect(bx+356,by+26,bw-363,bh-26);
  var ufy=by-98;ctx.fillStyle=rc;ctx.fillRect(bx-20,ufy,bw+40,100);ctx.fillStyle='rgba(78,128,168,.56)';ctx.fillRect(bx-16,ufy+8,bw+32,84);ctx.strokeStyle='rgba(0,0,0,.26)';ctx.lineWidth=1.7;for(var m=1;m<7;m++){ctx.beginPath();ctx.moveTo(bx-16+m*(bw+32)/7,ufy+8);ctx.lineTo(bx-16+m*(bw+32)/7,ufy+92);ctx.stroke();}
  ctx.fillStyle=hD(rc,.3);ctx.fillRect(bx-26,ufy-6,bw+52,7);ctx.strokeStyle=fc+'bb';ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(bx-26,ufy-6);ctx.lineTo(bx+bw+26,ufy-6);ctx.stroke();
  ctx.fillStyle=dc;ctx.fillRect(cx-14,hor-58,28,58);
  ctx.fillStyle='rgba(28,88,138,.65)';ctx.fillRect(bx+16,hor+4,135,20);ctx.strokeStyle='rgba(120,200,240,.42)';ctx.lineWidth=1;ctx.strokeRect(bx+16,hor+4,135,20);
  rtreeFull(ctx,bx-46,hor);rtreeFull(ctx,bx+bw+24,hor);
}

function dDesert2(ctx,W,H,hor){
  var cx=W/2,wc=C.wallColor,rc=C.roofColor||'#8B4513',tc=C.trimColor,dc=C.doorColor;
  var bw=380,bh=145,bx=cx-bw/2,by=hor-bh;
  ctx.fillStyle='rgba(0,0,0,.28)';ctx.fillRect(bx+10,by+10,bw,bh+16);
  var dw=ctx.createLinearGradient(0,by,0,hor);dw.addColorStop(0,wc);dw.addColorStop(1,hD(wc,.17));ctx.fillStyle=dw;ctx.fillRect(bx,by,bw,bh);
  for(var i=0;i<5;i++){var colx=bx+31+i*70;ctx.fillStyle=hL(wc,.08);ctx.fillRect(colx-5,by-20,10,bh+20);ctx.fillStyle=hD(wc,.05)+'55';ctx.fillRect(colx-10,by-20,20,8);ctx.fillRect(colx-10,hor-7,20,8);}
  ctx.fillStyle='rgba(0,0,0,.09)';ctx.fillRect(bx+26,by-20,bw-52,24);
  for(var j=0;j<4;j++){var wx=bx+50+j*76,wh=62;ctx.fillStyle='rgba(0,0,0,.74)';ctx.fillRect(wx,by+28,44,wh);ctx.strokeStyle=tc+'88';ctx.lineWidth=3;ctx.strokeRect(wx-2,by+26,48,wh+4);}
  ctx.fillStyle=dc;ctx.fillRect(cx-22,hor-68,44,68);ctx.beginPath();ctx.moveTo(cx-22,hor-42);ctx.lineTo(cx,hor-68);ctx.lineTo(cx+22,hor-42);ctx.fillStyle=hD(dc,.16);ctx.fill();
  ctx.fillStyle=rc;ctx.fillRect(bx-10,by-36,bw+20,14);for(var b=0;b<20;b++)ctx.fillRect(bx-8+b*19,by-46,12,12);
  ctx.fillStyle=hD(wc,.04);ctx.fillRect(bx+40,by-78,bw-80,50);
  palmFull(ctx,bx-38,hor,'#2A6020');palmFull(ctx,bx+bw+18,hor,'#3A7030');
}

function dTropical2(ctx,W,H,hor){
  var cx=W/2,wc=C.wallColor,rc=C.roofColor||'#3D4A30',dc=C.doorColor;
  var bw=400,bh=115,bx=cx-bw/2,by=hor-bh;
  ctx.fillStyle='rgba(0,0,0,.24)';ctx.fillRect(bx+8,by+8,bw,bh+22);ctx.fillStyle=wc;ctx.fillRect(bx,by,bw,bh);
  ctx.fillStyle='rgba(18,68,23,.9)';ctx.fillRect(bx+bw-90,by,90,bh);for(var g=0;g<34;g++){var gx=bx+bw-88+Math.random()*84,gy=by+Math.random()*bh;ctx.fillStyle='rgba('+(22+Math.random()*55|0)+','+(88+Math.random()*88|0)+','+(18+Math.random()*38|0)+',.86)';ctx.beginPath();ctx.ellipse(gx,gy,4+Math.random()*10,3+Math.random()*5,Math.random()*Math.PI,0,Math.PI*2);ctx.fill();}
  ctx.fillStyle='rgba(18,68,23,.7)';ctx.fillRect(bx,by,50,bh);for(var g2=0;g2<18;g2++){var gx2=bx+2+Math.random()*46,gy2=by+Math.random()*bh;ctx.fillStyle='rgba('+(32+Math.random()*48|0)+','+(96+Math.random()*78|0)+','+(18+Math.random()*33|0)+',.82)';ctx.beginPath();ctx.ellipse(gx2,gy2,4+Math.random()*9,3+Math.random()*5,Math.random()*Math.PI,0,Math.PI*2);ctx.fill();}
  for(var i=0;i<3;i++){var wx=bx+56+i*96,wh=bh-16;ctx.fillStyle='rgba(58,108,88,.5)';ctx.fillRect(wx,by+10,80,wh);}
  var ufy=by-98;ctx.fillStyle=hL(wc,.03);ctx.fillRect(bx-22,ufy,bw+44,100);ctx.fillStyle='rgba(18,68,23,.85)';ctx.fillRect(bx-20,ufy,80,100);
  var rpk=ufy-52;ctx.fillStyle=rc;ctx.beginPath();ctx.moveTo(bx-30,ufy);ctx.lineTo(cx-16,rpk);ctx.lineTo(cx+16,rpk);ctx.lineTo(bx+bw+30,ufy);ctx.closePath();ctx.fill();ctx.strokeStyle=hL(rc,.1)+'88';ctx.lineWidth=1.3;ctx.stroke();
  ctx.fillStyle='rgba(18,88,108,.68)';ctx.fillRect(bx+13,hor+4,112,22);ctx.strokeStyle='rgba(100,220,200,.5)';ctx.lineWidth=1.5;ctx.strokeRect(bx+13,hor+4,112,22);
  for(var tx=0;tx<2;tx++){var txp=[bx-52,bx+bw+26][tx];ctx.strokeStyle='#4A3020';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(txp,hor);ctx.lineTo(txp,hor-75);ctx.stroke();for(var l=0;l<8;l++){var a=l/8*Math.PI*2;ctx.strokeStyle='rgba('+(22+l*5)+','+(98+l*8)+','+(18+l*3)+',.88)';ctx.lineWidth=2.2;ctx.beginPath();ctx.moveTo(txp,hor-75);ctx.lineTo(txp+Math.cos(a)*52,hor-75+Math.sin(a)*26);ctx.stroke();}}
}

function dColonial2(ctx,W,H,hor){
  var cx=W/2,wc=C.wallColor,rc=C.roofColor||'#8B5030',tc=C.trimColor,dc=C.doorColor;
  var bw=390,bh=148,bx=cx-bw/2,by=hor-bh;
  ctx.fillStyle='rgba(0,0,0,.28)';ctx.fillRect(bx+10,by+10,bw,bh+12);ctx.fillStyle=wc;ctx.fillRect(bx,by,bw,bh);
  for(var i=0;i<6;i++){var colx=bx+36+i*60;ctx.fillStyle=hL(wc,.12);ctx.fillRect(colx-7,by-22,14,bh+22);ctx.fillStyle=tc+'44';ctx.fillRect(colx-11,by-22,22,9);ctx.fillRect(colx-11,hor-7,22,9);}
  var ptop=by-50;ctx.fillStyle=wc;ctx.beginPath();ctx.moveTo(bx-11,by-22);ctx.lineTo(cx,ptop);ctx.lineTo(bx+bw+11,by-22);ctx.closePath();ctx.fill();ctx.strokeStyle=tc+'99';ctx.lineWidth=1.8;ctx.stroke();
  for(var j=0;j<5;j++){var wx=bx+18+j*72,wh=72;ctx.fillStyle='rgba(48,78,108,.65)';ctx.fillRect(wx,by+18,44,wh);ctx.strokeStyle=tc+'88';ctx.lineWidth=2.8;ctx.strokeRect(wx-2,by+16,48,wh+4);}
  ctx.fillStyle=dc;ctx.fillRect(cx-20,hor-86,40,86);ctx.beginPath();ctx.arc(cx,hor-86,20,Math.PI,0);ctx.fillStyle=dc;ctx.fill();ctx.strokeStyle=tc+'88';ctx.lineWidth=1.8;ctx.stroke();
  ctx.fillStyle=hL(wc,.05);ctx.fillRect(bx,by-18,bw,7);for(var b=0;b<28;b++)ctx.fillRect(bx+4+b*(bw-8)/28,by-24,4,9);
  ctx.fillStyle=rc;ctx.beginPath();ctx.moveTo(bx-18,by-22);ctx.lineTo(cx,ptop-26);ctx.lineTo(bx+bw+18,by-22);ctx.closePath();ctx.fill();
  rtreeFull(ctx,bx-40,hor);rtreeFull(ctx,bx+bw+20,hor);
}

function dTraditional2(ctx,W,H,hor){
  var cx=W/2,wc=C.wallColor||'#C87050',rc=C.roofColor||'#8B4513',tc=C.trimColor,dc=C.doorColor;
  var bw=375,bh=138,bx=cx-bw/2,by=hor-bh;
  ctx.fillStyle='rgba(0,0,0,.28)';ctx.fillRect(bx+11,by+11,bw,bh);
  var bw2=ctx.createLinearGradient(0,by,0,hor);bw2.addColorStop(0,wc);bw2.addColorStop(1,hD(wc,.12));ctx.fillStyle=bw2;ctx.fillRect(bx,by,bw,bh);
  ctx.fillStyle='rgba(0,0,0,.05)';for(var r=0;r<8;r++)for(var c=0;c<10;c++)ctx.fillRect(bx+c*(bw/10)+(r%2)*bw/20,by+r*16,bw/10-2,14);
  ctx.fillStyle='rgba(0,0,0,.13)';ctx.fillRect(bx,by+bh-38,bw,38);for(var i=0;i<7;i++){var vx=bx+16+i*50;ctx.fillStyle=hL(wc,.1);ctx.fillRect(vx,by+bh-34,10,34);}
  for(var j=0;j<4;j++){var wx=bx+20+j*82,wh=70;ctx.fillStyle='rgba(48,78,108,.7)';ctx.fillRect(wx,by+16,50,wh);ctx.strokeStyle=tc+'99';ctx.lineWidth=2.8;ctx.strokeRect(wx-3,by+14,56,wh+4);}
  ctx.fillStyle=dc;ctx.fillRect(cx-22,hor-88,44,88);ctx.strokeStyle=tc+'77';ctx.lineWidth=1.8;ctx.strokeRect(cx-22,hor-88,44,88);
  ctx.fillStyle=rc;ctx.beginPath();ctx.moveTo(bx-16,by);ctx.lineTo(cx,by-52);ctx.lineTo(bx+bw+16,by);ctx.closePath();ctx.fill();
  rtreeFull(ctx,bx-38,hor);rtreeFull(ctx,bx+bw+16,hor);
}

function palmFull(ctx,x,hor,col){
  col=col||'#2D7030';ctx.strokeStyle='#7B5230';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(x,hor);ctx.quadraticCurveTo(x-7,hor-30,x-4,hor-86);ctx.stroke();
  for(var f=0;f<7;f++){var a=f/7*Math.PI*2;ctx.strokeStyle=col;ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(x-4,hor-86);ctx.quadraticCurveTo(x-4+Math.cos(a)*20,hor-86+Math.sin(a)*12,x-4+Math.cos(a)*42,hor-86+Math.sin(a)*24);ctx.stroke();}
}
function rtreeFull(ctx,x,hor){
  ctx.strokeStyle='#3A5020';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(x,hor);ctx.lineTo(x,hor-55);ctx.stroke();
  ctx.fillStyle='rgba(38,78,38,.82)';ctx.beginPath();ctx.arc(x,hor-68,15,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='rgba(55,100,55,.38)';ctx.beginPath();ctx.arc(x,hor-68,23,0,Math.PI*2);ctx.fill();
}

// ══════════ FLOOR PLANS ══════════
function drawFP(idx){
  var cv=document.getElementById('fp-cv');if(!cv)return;
  var ctx=cv.getContext('2d'),W=cv.width,H=cv.height;
  ctx.clearRect(0,0,W,H);ctx.fillStyle='#0d1018';ctx.fillRect(0,0,W,H);
  var pad=24,px=pad,py=pad,pw=W-pad*2,ph=H-pad*2;
  ctx.strokeStyle='rgba(200,169,110,.3)';ctx.lineWidth=1.4;ctx.strokeRect(px,py,pw,ph);
  ctx.fillStyle='rgba(200,169,110,.015)';ctx.fillRect(px,py,pw,ph);
  var names=['BASEMENT PLAN','GROUND FLOOR PLAN','1ST FLOOR PLAN','2ND FLOOR PLAN','ROOFTOP PLAN'];
  var fns=[fpB2,fpG2,fpF12,fpF22,fpR2];
  if(fns[idx])fns[idx](ctx,px,py,pw,ph);
  ctx.font='bold 10px Outfit';ctx.fillStyle='#C8A96E';ctx.textAlign='center';ctx.fillText(names[idx]+' · '+C.plotSize,W/2,py-9);
  fpCompass2(ctx,W-22,22,14);fillRP(idx);
}
function frm2(ctx,x,y,w,h,lbl,ico,fill){
  if(w<8||h<8)return;ctx.fillStyle=fill||'rgba(38,52,78,.6)';ctx.fillRect(x,y,w,h);
  ctx.strokeStyle='rgba(200,169,110,.16)';ctx.lineWidth=.75;ctx.strokeRect(x,y,w,h);
  if(ico){ctx.font='11px Outfit';ctx.fillStyle='rgba(200,200,200,.44)';ctx.textAlign='center';ctx.fillText(ico,x+w/2,y+h/2-5);}
  if(lbl){ctx.font='9px Outfit';ctx.fillStyle='rgba(145,145,145,.5)';ctx.textAlign='center';
  if(lbl.length>12&&w>60){var ws=lbl.split(' ');var half=Math.ceil(ws.length/2);ctx.fillText(ws.slice(0,half).join(' '),x+w/2,y+h/2+5);ctx.fillText(ws.slice(half).join(' '),x+w/2,y+h/2+15);}
  else ctx.fillText(lbl,x+w/2,y+h/2+6);}
}
function fpB2(ctx,px,py,pw,ph){frm2(ctx,px+5,py+5,pw-10,60,'3-Car Parking','🚗','rgba(58,48,23,.6)');frm2(ctx,px+5,py+71,170,ph-79,'Home Gym','🏋️','rgba(23,38,63,.6)');frm2(ctx,px+181,py+71,140,110,'Generator','⚡','rgba(48,23,23,.6)');frm2(ctx,px+327,py+71,pw-332,110,'Storage','📦','rgba(33,33,33,.6)');frm2(ctx,px+181,py+187,pw-186,ph-195,'Lobby & Stair','🪜','rgba(23,33,48,.6)');}
function fpG2(ctx,px,py,pw,ph){
  if(C.shops>0){var sw=(pw-10)/Math.min(C.shops,6);for(var i=0;i<Math.min(C.shops,6);i++)frm2(ctx,px+5+i*sw,py+5,sw-3,90,'Shop '+(i+1),'🏪','rgba(118,38,38,.55)');frm2(ctx,px+5,py+101,125,ph-109,'Entrance','🚪','rgba(48,43,18,.6)');frm2(ctx,px+136,py+101,pw*.4,ph-109,'Drawing Room','🛋️','rgba(28,38,58,.6)');frm2(ctx,px+136+pw*.4+5,py+101,pw-145-pw*.4,ph-109,'Kitchen + Dining','🍽️','rgba(48,33,18,.6)');}
  else{frm2(ctx,px+5,py+5,132,102,'Entrance Hall','🚪','rgba(48,43,18,.6)');frm2(ctx,px+143,py+5,pw*.38,132,'Drawing Room','🛋️','rgba(28,38,58,.6)');frm2(ctx,px+143+pw*.38+5,py+5,pw-152-pw*.38,132,'Dining Room','🍽️','rgba(28,48,33,.6)');frm2(ctx,px+5,py+113,132,ph-121,'Garden / Courtyard','🌿','rgba(18,48,23,.6)');frm2(ctx,px+143,py+143,pw*.38,ph-151,'Main Kitchen','🍳','rgba(53,28,14,.6)');frm2(ctx,px+143+pw*.38+5,py+143,pw*.28,ph-151,'Servant Kitchen','👨‍🍳','rgba(43,27,14,.6)');frm2(ctx,px+143+pw*.38+pw*.28+10,py+143,pw-157-pw*.38-pw*.28,ph-151,'Guest Room','🛏️','rgba(33,33,53,.6)');}
}
function fpF12(ctx,px,py,pw,ph){frm2(ctx,px+5,py+5,pw*.43,158,'Master Bedroom','🛏️','rgba(38,26,53,.6)');frm2(ctx,px+pw*.43+11,py+5,125,80,'Master Bath','🛁','rgba(20,40,53,.6)');frm2(ctx,px+pw*.43+11,py+91,125,72,'Wardrobe','👗','rgba(50,26,40,.6)');frm2(ctx,px+pw*.43+142,py+5,pw-pw*.43-147,ph/2-8,'TV Lounge','📺','rgba(26,36,56,.6)');frm2(ctx,px+5,py+170,pw*.32,ph-178,'Bed 2 + Bath','🛏️','rgba(36,46,30,.6)');frm2(ctx,px+pw*.32+11,py+170,pw*.32,ph-178,'Bed 3 + Bath','🛏️','rgba(36,46,30,.6)');frm2(ctx,px+pw*.64+17,py+170,pw-pw*.64-22,ph-178,'Balcony + Hall','🏡','rgba(20,30,20,.6)');}
function fpF22(ctx,px,py,pw,ph){frm2(ctx,px+5,py+5,pw*.43,ph*.54,'Premium Bed 4','🛏️','rgba(36,26,50,.6)');frm2(ctx,px+pw*.43+11,py+5,135,ph*.54,'En-Suite Bath','🛁','rgba(20,40,50,.6)');frm2(ctx,px+pw*.43+152,py+5,pw-pw*.43-157,ph*.54,'Home Office','🖥️','rgba(26,36,50,.6)');frm2(ctx,px+5,py+ph*.54+11,pw*.5,ph-ph*.54-16,'Games Room','🎮','rgba(26,20,50,.6)');frm2(ctx,px+pw*.5+11,py+ph*.54+11,pw*.3,ph-ph*.54-16,'Servant Qtr','👤','rgba(36,30,26,.6)');frm2(ctx,px+pw*.8+17,py+ph*.54+11,pw*.2-22,ph-ph*.54-16,'Terrace','🌄','rgba(20,36,20,.6)');}
function fpR2(ctx,px,py,pw,ph){ctx.fillStyle='rgba(23,46,23,.33)';ctx.fillRect(px+5,py+5,pw-10,ph-10);frm2(ctx,px+13,py+13,pw*.37,ph*.44,'Terrace Garden','🌿','rgba(16,46,16,.65)');frm2(ctx,px+pw*.37+19,py+13,pw*.34,ph*.44,'Pergola','🌙','rgba(26,26,46,.6)');frm2(ctx,px+pw*.71+25,py+13,pw*.29-32,ph*.44,'BBQ Kitchen','🔥','rgba(46,20,16,.6)');frm2(ctx,px+13,py+ph*.44+19,pw*.41,ph*.56-26,'Solar Panels','☀️','rgba(36,36,16,.6)');frm2(ctx,px+pw*.41+19,py+ph*.44+19,pw*.59-26,ph*.56-26,'Water Tanks','💧','rgba(16,26,46,.6)');}
function fpCompass2(ctx,x,y,r){ctx.strokeStyle='rgba(200,169,110,.28)';ctx.lineWidth=1;ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.stroke();ctx.fillStyle='rgba(200,169,110,.8)';ctx.beginPath();ctx.moveTo(x,y-r+3);ctx.lineTo(x-3,y);ctx.lineTo(x+3,y);ctx.closePath();ctx.fill();ctx.fillStyle='rgba(80,80,80,.5)';ctx.beginPath();ctx.moveTo(x,y+r-3);ctx.lineTo(x-3,y);ctx.lineTo(x+3,y);ctx.closePath();ctx.fill();ctx.font='bold 8px Outfit';ctx.fillStyle='rgba(200,169,110,.9)';ctx.textAlign='center';ctx.fillText('N',x,y-r-3);}
function fillRP(idx){
  var rp=document.getElementById('rp-panel');if(!rp)return;
  var lists=[
    [{i:'🚗',n:'3-Car Parking'},{i:'🏋️',n:'Home Gym'},{i:'⚡',n:'Generator'},{i:'📦',n:'Storage'},{i:'🪜',n:'Lobby'}],
    C.shops>0?[{i:'🏪',n:'Shops ×'+C.shops},{i:'🚪',n:'Entrance'},{i:'🛋️',n:'Drawing Rm'},{i:'🍽️',n:'Kitchen'}]:[{i:'🚪',n:'Entrance'},{i:'🛋️',n:'Drawing Rm'},{i:'🍽️',n:'Dining'},{i:'🍳',n:'Kitchen'},{i:'🌿',n:'Garden'},{i:'🛏️',n:'Guest Rm'}],
    [{i:'🛏️',n:'Master Suite'},{i:'🛁',n:'Master Bath'},{i:'👗',n:'Wardrobe'},{i:'🛏️',n:'Bed 2'},{i:'🛏️',n:'Bed 3'},{i:'📺',n:'TV Lounge'},{i:'🏡',n:'Balcony'}],
    [{i:'🛏️',n:'Bed 4'},{i:'🛁',n:'En-Suite'},{i:'🖥️',n:'Office'},{i:'🎮',n:'Games Rm'},{i:'👤',n:'Servant'},{i:'🌄',n:'Terrace'}],
    [{i:'🌿',n:'Garden'},{i:'🌙',n:'Pergola'},{i:'🔥',n:'BBQ'},{i:'☀️',n:'Solar'},{i:'💧',n:'Water Tanks'}]
  ];
  var items=lists[idx]||[];
  var h='<div style="font-size:9px;color:var(--gold);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:8px;padding-bottom:5px;border-bottom:1px solid rgba(255,255,255,.05);">This Floor</div>';
  items.forEach(function(r){h+='<div class="rpi"><span class="rpi-i">'+r.i+'</span><span class="rpi-n">'+r.n+'</span></div>';});
  rp.innerHTML=h;
}

// ══════════ DOWNLOAD ══════════
function doDownload(){
  var ec=document.getElementById('ext-cv'),fc=document.getElementById('fp-cv');
  var out=document.createElement('canvas');out.width=1180;out.height=1550;
  var ctx=out.getContext('2d');
  ctx.fillStyle='#06080d';ctx.fillRect(0,0,1180,1550);
  var hg=ctx.createLinearGradient(0,0,1180,110);hg.addColorStop(0,'#0b0d14');hg.addColorStop(1,'#191d2a');ctx.fillStyle=hg;ctx.fillRect(0,0,1180,110);
  ctx.strokeStyle='rgba(200,169,110,.2)';ctx.lineWidth=1;ctx.strokeRect(0,0,1180,110);
  ctx.font='bold 24px serif';ctx.fillStyle='#C8A96E';ctx.textAlign='center';ctx.fillText('ARCHAI — VILLA DESIGN PROPOSAL',590,44);
  ctx.font='13px sans-serif';ctx.fillStyle='#666';ctx.fillText((RDATA?RDATA.villaName:'Villa')+' · '+C.plotSize+' · '+C.plotType+' · '+C.style,590,72);
  ctx.font='11px sans-serif';ctx.fillStyle='rgba(61,201,138,.72)';ctx.fillText('Free for 1 Year · archai.design',590,94);
  if(ec)ctx.drawImage(ec,36,128,490,296);if(fc)ctx.drawImage(fc,578,128,566,368);
  if(RDATA){
    var info=[['Client',C.clientName||'—'],['City',C.city||'—'],['Style',C.style],['Plot',C.plotSize],['Floors',C.floors],['Beds',C.bedrooms],['Baths',C.bathrooms],['Budget',C.budget]];
    ctx.fillStyle='rgba(200,169,110,.06)';ctx.fillRect(36,444,1108,58);ctx.textAlign='left';ctx.font='11px sans-serif';ctx.fillStyle='#C8A96E';
    info.forEach(function(kv,i){ctx.fillText(kv[0]+': '+kv[1],56+(i%4)*276,460+(Math.floor(i/4))*22);});
    var ly=538;ctx.font='bold 11px sans-serif';ctx.fillStyle='rgba(200,169,110,.5)';ctx.fillText('DESIGN CONCEPT',46,ly);ly+=18;
    ctx.font='12px sans-serif';ctx.fillStyle='#aaa';
    var words=RDATA.concept.split(' '),line='';
    words.forEach(function(w){var t=line+w+' ';if(ctx.measureText(t).width>1085&&line){ctx.fillText(line,46,ly);line=w+' ';ly+=19;}else line=t;});
    if(line){ctx.fillText(line,46,ly);ly+=19;}ly+=16;
    ctx.font='bold 11px sans-serif';ctx.fillStyle='rgba(200,169,110,.5)';ctx.fillText('KEY FEATURES',46,ly);ly+=16;
    RDATA.features.forEach(function(f,i){ctx.fillStyle='#aaa';ctx.font='11px sans-serif';ctx.textAlign='left';ctx.fillText('• '+f,46+(i%2)*564,ly+(Math.floor(i/2))*18);});
    ly+=Math.ceil(RDATA.features.length/2)*18+20;
    ctx.font='bold 11px sans-serif';ctx.fillStyle='rgba(200,169,110,.5)';ctx.fillText('COST ESTIMATE',46,ly);ly+=16;
    RDATA.costs.forEach(function(c,i){ctx.fillStyle=i===RDATA.costs.length-1?'#C8A96E':'#aaa';ctx.font=i===RDATA.costs.length-1?'bold 12px sans-serif':'11px sans-serif';ctx.textAlign='left';ctx.fillText(c.i,46,ly+i*20);ctx.textAlign='right';ctx.fillText(c.a,720,ly+i*20);});
    ly+=RDATA.costs.length*20+20;
    ctx.font='bold 11px sans-serif';ctx.fillStyle='rgba(200,169,110,.5)';ctx.textAlign='left';ctx.fillText('AI IMAGE PROMPT (paste into bing.com/create FREE)',46,ly);ly+=16;
    ctx.font='10px monospace';ctx.fillStyle='rgba(200,200,200,.7)';
    var prompt=RDATA.prompt,pline='';
    prompt.split(' ').forEach(function(w){var t=pline+w+' ';if(ctx.measureText(t).width>1085&&pline){ctx.fillText(pline,46,ly);pline=w+' ';ly+=16;}else pline=t;});
    if(pline)ctx.fillText(pline,46,ly);
  }
  ctx.fillStyle='rgba(200,169,110,.07)';ctx.fillRect(0,1510,1180,40);ctx.font='11px sans-serif';ctx.fillStyle='#444';ctx.textAlign='center';ctx.fillText('ARCHAI · AI Villa Design · Free for 1 Year · archai.design',590,1531);
  var a=document.createElement('a');a.download='VillaDesign_'+(C.clientName||'Client')+'_'+C.plotSize.replace(' ','')+'.png';a.href=out.toDataURL('image/png',.94);a.click();
}
// ─────────────────────────────────────────────────────────────────────────────
// ─── REACT COMPONENT ─────────────────────────────────────────────────────────
export default function ArchaiPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    initState();
    exposeGlobals();
    buildGallery();
    setBudget(200);
    setMounted(true);
    // Cleanup on unmount — removes window globals so back navigation works
    return () => {
      const keys = ['goPage','goBack','toggleBill','selM','selO','adj','togC',
        'pickSw','setBudget','gos','runGen','copyPrompt','liveClr','sFP',
        'restartCfg','doDownload','hD','hL','C','step','RDATA','pageHist','STYLES','PAL'];
      keys.forEach(k => { try { delete window[k]; } catch(_){} });
    };
  }, []);

  if (!mounted) return (
    <div style={{ minHeight:"100vh", background:"#06080d", display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ textAlign:"center", color:"#C8A96E", fontFamily:"Outfit,sans-serif" }}>
        <div style={{ width:48, height:48, border:"3px solid rgba(200,169,110,0.2)", borderTopColor:"#C8A96E", borderRadius:"50%", animation:"spin 1s linear infinite", margin:"0 auto 16px" }}/>
        <div style={{ fontSize:14 }}>Loading ARCHAI...</div>
      </div>
    </div>
  );

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"/>
      <style suppressHydrationWarning>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        :root{--bg:#06080d;--bg2:#0b0d14;--bg3:#11141e;--bg4:#171b26;--bg5:#1e2333;--gold:#C8A96E;--gold2:#E8D09A;--gold3:rgba(200,169,110,0.1);--gold4:rgba(200,169,110,0.06);--green:#3DC98A;--blue:#4A8FD4;--red:#D44A6A;--purple:#9B5DE5;--text:#E2DED6;--muted:#525870;--dim:#333848;--border:rgba(200,169,110,0.14);--r:12px;}
        *{margin:0;padding:0;box-sizing:border-box;}
        body{font-family:'Outfit',sans-serif;background:var(--bg);color:var(--text);overflow-x:hidden;}
        #archai-root{font-family:'Outfit',sans-serif;}
        .float-back{position:fixed;bottom:24px;left:18px;z-index:9999;display:none;flex-direction:column;align-items:center;gap:4px;}
        .float-back.show{display:flex;}
        .fb-btn{width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,var(--gold),#9A7830);color:#000;font-size:20px;font-weight:700;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(200,169,110,0.4);transition:all .25s;}
        .fb-btn:hover{transform:scale(1.1);}
        .fb-lbl{font-size:10px;color:var(--gold);font-weight:600;background:rgba(6,8,13,0.9);padding:3px 8px;border-radius:6px;border:1px solid var(--border);}
        .float-home{position:fixed;bottom:24px;right:18px;z-index:9999;display:flex;flex-direction:column;align-items:center;gap:4px;}
        .fh-btn{width:52px;height:52px;border-radius:50%;background:var(--bg3);border:1.5px solid var(--border);color:var(--gold);font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(0,0,0,0.4);transition:all .25s;}
        .fh-btn:hover{background:var(--gold);color:#000;transform:scale(1.1);}
        .fh-lbl{font-size:10px;color:var(--muted);background:rgba(6,8,13,0.9);padding:3px 8px;border-radius:6px;border:1px solid var(--dim);}
        .banner{background:linear-gradient(90deg,#071a0e,#0a0f1c,#14072a,#0a0f1c,#071a0e);background-size:400% 100%;animation:bsc 12s linear infinite;padding:10px 0;text-align:center;font-size:12px;font-weight:500;color:#aaa;letter-spacing:.5px;}
        @keyframes bsc{0%{background-position:0%}100%{background-position:400%}}
        .banner .g{color:var(--green);font-weight:700;}.banner .gold{color:var(--gold);}
        nav{display:flex;align-items:center;justify-content:space-between;padding:15px 48px;background:rgba(6,8,13,0.97);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:200;gap:16px;}
        .nav-logo{font-family:'Cormorant Garamond',serif;font-size:24px;letter-spacing:5px;color:var(--gold2);flex-shrink:0;cursor:pointer;}
        .nav-logo span{color:var(--muted);}
        .nav-center{display:flex;gap:4px;}
        .nb{padding:9px 16px;border-radius:22px;font-size:13px;background:none;border:1.5px solid transparent;color:var(--muted);cursor:pointer;font-family:'Outfit',sans-serif;transition:all .22s;}
        .nb:hover{color:var(--gold);}
        .nb.on{color:var(--gold2);border-color:var(--border);background:var(--gold4);}
        .nav-cta{padding:10px 22px;border-radius:22px;background:linear-gradient(135deg,var(--gold),#9A7830);color:#000;font-size:13px;font-weight:700;border:none;cursor:pointer;font-family:'Outfit',sans-serif;transition:all .22s;flex-shrink:0;}
        .nav-cta:hover{transform:translateY(-1px);}
        .page{display:none;}
        .page.show{display:block;animation:pfade .4s ease;}
        @keyframes pfade{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
        .hero{min-height:94vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:80px 40px 60px;position:relative;overflow:hidden;}
        .hero-glow{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 65% 55% at 50% 35%,rgba(200,169,110,0.055) 0%,transparent 68%);}
        .hero-grid{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(200,169,110,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(200,169,110,0.025) 1px,transparent 1px);background-size:70px 70px;}
        .hero-inner{position:relative;z-index:2;max-width:860px;}
        .hero-pill{display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(61,201,138,0.28);background:rgba(61,201,138,0.06);padding:7px 18px;border-radius:22px;font-size:11px;color:var(--green);letter-spacing:2px;text-transform:uppercase;margin-bottom:28px;}
        .hp-dot{width:6px;height:6px;border-radius:50%;background:var(--green);animation:gp 1.5s infinite;}
        @keyframes gp{0%,100%{opacity:.3;}50%{opacity:1;}}
        .hero-h{font-family:'Cormorant Garamond',serif;font-size:clamp(40px,7vw,88px);font-weight:300;line-height:1.03;color:#fff;margin-bottom:20px;}
        .hero-h em{color:var(--gold);font-style:italic;}
        .hero-sub{font-size:15px;color:var(--muted);line-height:1.8;max-width:540px;margin:0 auto 36px;}
        .hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:48px;}
        .btn-hero{padding:16px 36px;border-radius:32px;background:linear-gradient(135deg,var(--gold),#9A7830);color:#000;font-size:15px;font-weight:700;border:none;cursor:pointer;font-family:'Outfit',sans-serif;box-shadow:0 8px 28px rgba(200,169,110,.22);transition:all .3s;}
        .btn-hero:hover{transform:translateY(-3px);box-shadow:0 14px 40px rgba(200,169,110,.38);}
        .btn-ghost{padding:16px 36px;border-radius:32px;background:transparent;color:var(--text);font-size:15px;font-weight:500;border:1.5px solid var(--border);cursor:pointer;font-family:'Outfit',sans-serif;transition:all .25s;}
        .btn-ghost:hover{border-color:var(--gold);color:var(--gold);}
        .trust-strip{display:flex;gap:28px;justify-content:center;flex-wrap:wrap;}
        .ts{display:flex;align-items:center;gap:7px;font-size:13px;color:var(--muted);}
        .feat-bar{background:var(--bg2);border-top:1px solid rgba(255,255,255,0.04);border-bottom:1px solid rgba(255,255,255,0.04);padding:20px 52px;display:flex;gap:32px;justify-content:center;flex-wrap:wrap;}
        .fb{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--muted);}
        .fb strong{color:var(--text);}
        .gallery-sec{padding:80px 52px;background:var(--bg2);border-top:1px solid rgba(255,255,255,0.04);}
        .gallery-inner{max-width:1100px;margin:0 auto;}
        .sec-tag{font-size:10px;letter-spacing:3px;color:var(--gold);text-transform:uppercase;margin-bottom:10px;}
        .sec-title{font-family:'Cormorant Garamond',serif;font-size:clamp(26px,4vw,46px);font-weight:300;color:#fff;margin-bottom:8px;line-height:1.1;}
        .sec-title em{color:var(--gold);font-style:italic;}
        .sec-sub{font-size:14px;color:var(--muted);max-width:520px;margin-bottom:40px;line-height:1.7;}
        .style-gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
        @media(max-width:900px){.style-gallery{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:560px){.style-gallery{grid-template-columns:1fr;}}
        .sg-card{border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,0.06);background:var(--bg3);transition:all .3s;cursor:pointer;position:relative;}
        .sg-card:hover{transform:translateY(-4px);border-color:var(--border);}
        .sg-card.featured{border-color:var(--gold);box-shadow:0 0 0 1px var(--gold),0 12px 40px rgba(200,169,110,.12);}
        .sg-canvas{width:100%;height:180px;display:block;}
        .sg-badge{position:absolute;top:10px;left:10px;background:var(--gold);color:#000;font-size:10px;font-weight:800;padding:3px 10px;border-radius:6px;letter-spacing:1px;}
        .sg-body{padding:14px 16px;}
        .sg-name{font-size:14px;font-weight:600;color:#fff;margin-bottom:3px;}
        .sg-desc{font-size:11px;color:var(--muted);line-height:1.4;}
        .how-sec{padding:80px 52px;border-top:1px solid rgba(255,255,255,.04);}
        .how-steps{display:grid;grid-template-columns:repeat(5,1fr);gap:0;max-width:880px;margin:40px auto 0;position:relative;}
        .how-steps::before{content:'';position:absolute;top:27px;left:12%;right:12%;height:1px;background:linear-gradient(to right,transparent,var(--border),var(--gold),var(--border),transparent);}
        .hs{text-align:center;padding:0 10px;position:relative;}
        .hs-c{width:54px;height:54px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;margin:0 auto 10px;background:var(--bg3);border:2px solid var(--border);position:relative;z-index:2;}
        .hs-n{font-size:13px;font-weight:600;color:#fff;margin-bottom:3px;}
        .hs-d{font-size:11px;color:var(--muted);}
        .price-hero{padding:80px 52px 48px;text-align:center;background:linear-gradient(180deg,var(--bg2),var(--bg));}
        .free-notice{display:inline-flex;align-items:center;gap:14px;background:rgba(61,201,138,.07);border:1px solid rgba(61,201,138,.28);border-radius:16px;padding:18px 28px;margin-bottom:36px;text-align:left;}
        .fn-t{font-size:15px;font-weight:700;color:var(--green);}
        .fn-s{font-size:13px;color:var(--muted);margin-top:3px;}
        .fn-d{font-size:10px;color:rgba(61,201,138,.55);margin-top:4px;letter-spacing:1.5px;}
        .bill-row{display:flex;align-items:center;gap:12px;justify-content:center;margin-bottom:40px;}
        .bl{font-size:14px;color:var(--muted);cursor:pointer;}
        .bl.on{color:var(--text);}
        .tog{width:50px;height:26px;border-radius:13px;background:var(--bg5);position:relative;cursor:pointer;transition:background .2s;border:1.5px solid var(--dim);}
        .tog.on{background:var(--gold);}
        .tok{position:absolute;top:2px;left:2px;width:18px;height:18px;border-radius:50%;background:#fff;transition:left .25s;}
        .tog.on .tok{left:26px;}
        .save-b{background:rgba(61,201,138,.1);color:var(--green);padding:3px 10px;border-radius:7px;font-size:11px;font-weight:700;}
        .price-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;max-width:980px;margin:0 auto 56px;padding:0 52px;}
        @media(max-width:780px){.price-grid{grid-template-columns:1fr;padding:0 24px;}}
        .pc2{background:var(--bg3);border:1px solid rgba(255,255,255,.06);border-radius:18px;overflow:hidden;transition:transform .3s;}
        .pc2:hover{transform:translateY(-5px);}
        .pc2.pop{border:2px solid var(--gold);box-shadow:0 0 0 1px var(--gold),0 16px 50px rgba(200,169,110,.12);}
        .pop-b{background:var(--gold);color:#000;text-align:center;font-size:10px;font-weight:800;letter-spacing:2px;text-transform:uppercase;padding:5px;}
        .pc2-top{padding:26px 22px 16px;}
        .pc2-icon{font-size:28px;margin-bottom:9px;}
        .pc2-tier{font-size:10px;letter-spacing:2px;color:var(--muted);text-transform:uppercase;margin-bottom:4px;}
        .pc2-name{font-family:'Cormorant Garamond',serif;font-size:24px;color:#fff;margin-bottom:7px;}
        .pc2-desc{font-size:12px;color:var(--muted);line-height:1.5;margin-bottom:14px;}
        .pc2-pfree{font-family:'Cormorant Garamond',serif;font-size:38px;color:var(--green);}
        .pc2-pfree small{font-size:15px;color:var(--muted);font-family:'Outfit',sans-serif;}
        .pc2-price{display:flex;align-items:baseline;gap:2px;}
        .pc2-price .cur{font-size:17px;color:var(--gold);}
        .pc2-price .amt{font-family:'Cormorant Garamond',serif;font-size:38px;color:var(--gold2);}
        .pc2-price .per{font-size:13px;color:var(--muted);}
        .pc2-note{font-size:12px;color:var(--green);margin-top:5px;}
        .pc2-struck{font-size:12px;color:var(--muted);text-decoration:line-through;display:flex;align-items:center;gap:8px;margin-top:4px;}
        .free-now{text-decoration:none;color:var(--green);background:rgba(61,201,138,.1);padding:2px 8px;border-radius:5px;font-size:10px;font-weight:800;}
        .pc2-body{padding:0 22px 22px;border-top:1px solid rgba(255,255,255,.05);}
        .pc2-list{list-style:none;margin:14px 0;}
        .pc2-list li{font-size:13px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.04);display:flex;gap:8px;color:#bbb;}
        .pc2-list li:last-child{border:none;}
        .ck{color:var(--green);}.xx{color:rgba(255,255,255,.18);}
        .pc2-list li.off{color:var(--muted);}
        .pc2-btn{width:100%;padding:13px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;font-family:'Outfit',sans-serif;border:none;transition:all .22s;}
        .pb-free{background:rgba(61,201,138,.1);color:var(--green);border:1.5px solid rgba(61,201,138,.3);}
        .pb-free:hover{background:rgba(61,201,138,.2);}
        .pb-gold{background:linear-gradient(135deg,var(--gold),#9A7830);color:#000;}
        .pb-vip{background:linear-gradient(135deg,#9B5DE5,#6A3AAF);color:#fff;}
        .cfg-wrap{max-width:960px;margin:0 auto;padding:48px 24px 80px;}
        .cfg-progress{display:flex;align-items:center;justify-content:center;gap:0;margin-bottom:44px;flex-wrap:wrap;row-gap:10px;}
        .cpd{display:flex;align-items:center;}
        .pdot{width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;background:var(--bg3);border:2px solid var(--bg5);color:var(--muted);transition:all .3s;}
        .pdot.act{background:var(--gold);border-color:var(--gold);color:#000;font-weight:700;}
        .pdot.dn{background:var(--green);border-color:var(--green);color:#000;}
        .pline{width:46px;height:1px;background:var(--bg5);transition:background .3s;}
        .pline.dn{background:var(--green);}
        .sbox{background:var(--bg2);border:1px solid rgba(255,255,255,.05);border-radius:18px;padding:36px;animation:sba .35s ease;}
        @keyframes sba{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
        .s-eye{font-size:10px;letter-spacing:3px;color:var(--gold);text-transform:uppercase;margin-bottom:8px;}
        .s-hed{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:300;color:#fff;margin-bottom:5px;}
        .s-hed em{color:var(--gold);font-style:italic;}
        .s-sub2{font-size:13px;color:var(--muted);margin-bottom:26px;line-height:1.6;}
        .og{display:grid;gap:10px;margin-bottom:20px;}
        .og2{grid-template-columns:repeat(2,1fr);}
        .og3{grid-template-columns:repeat(3,1fr);}
        .og4{grid-template-columns:repeat(4,1fr);}
        @media(max-width:640px){.og3,.og4{grid-template-columns:repeat(2,1fr);}.og2{grid-template-columns:1fr;}}
        .oc{background:var(--bg3);border:2px solid var(--bg5);border-radius:10px;padding:14px 12px;cursor:pointer;transition:all .2s;text-align:center;}
        .oc:hover{border-color:rgba(200,169,110,.25);transform:translateY(-1px);}
        .oc.s{border-color:var(--gold);background:rgba(200,169,110,.07);}
        .oc.s::after{content:'✓';float:right;color:var(--gold);font-size:13px;font-weight:700;margin-top:-14px;}
        .oc-i{font-size:22px;margin-bottom:5px;}
        .oc-n{font-size:13px;font-weight:600;color:#fff;margin-bottom:2px;}
        .oc-d{font-size:11px;color:var(--muted);}
        .mrow{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:16px;}
        .mb{padding:12px 18px;border-radius:10px;background:var(--bg3);border:2px solid var(--bg5);cursor:pointer;text-align:center;transition:all .2s;}
        .mb:hover{border-color:rgba(200,169,110,.25);}
        .mb.s{border-color:var(--gold);background:rgba(200,169,110,.07);}
        .mb-n{display:block;font-size:18px;font-weight:700;color:var(--gold2);}
        .mb-l{display:block;font-size:10px;color:var(--muted);margin-top:2px;}
        .stprs{display:flex;flex-direction:column;gap:8px;margin-bottom:22px;}
        .stpr{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:var(--bg3);border-radius:10px;}
        .stpr-l{display:flex;align-items:center;gap:10px;font-size:14px;}
        .stpr-c{display:flex;align-items:center;gap:12px;}
        .stb{width:32px;height:32px;border-radius:8px;background:var(--bg5);border:1px solid var(--dim);color:var(--text);font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;}
        .stb:hover{background:var(--gold);color:#000;border-color:var(--gold);}
        .stv{font-size:18px;font-weight:700;color:var(--gold2);min-width:24px;text-align:center;}
        .chips{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:22px;}
        .chip{padding:7px 12px;border-radius:22px;background:var(--bg3);border:1.5px solid var(--bg5);font-size:12px;color:var(--muted);cursor:pointer;transition:all .18s;}
        .chip:hover{border-color:rgba(200,169,110,.3);}
        .chip.on{background:rgba(200,169,110,.08);border-color:var(--gold);color:var(--gold2);}
        .clr-prev{display:flex;height:44px;border-radius:10px;overflow:hidden;margin-bottom:8px;border:1px solid rgba(255,255,255,.06);}
        .clr-lbl{display:flex;font-size:10px;color:var(--muted);margin-bottom:20px;}
        .sw-sec{margin-bottom:16px;}
        .sw-lbl{font-size:12px;color:var(--text);font-weight:500;margin-bottom:8px;}
        .sw-row{display:flex;gap:7px;flex-wrap:wrap;}
        .sw{width:28px;height:28px;border-radius:6px;cursor:pointer;border:2px solid transparent;transition:all .15s;}
        .sw:hover{transform:scale(1.15);}
        .sw.s{border-color:#fff;transform:scale(1.1);}
        input[type=range]{width:100%;-webkit-appearance:none;height:5px;border-radius:3px;background:var(--bg5);outline:none;cursor:pointer;}
        input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:var(--gold);border:3px solid var(--bg);box-shadow:0 0 10px rgba(200,169,110,.35);cursor:pointer;}
        .ti{width:100%;padding:13px 15px;background:var(--bg3);border:1.5px solid var(--bg5);border-radius:10px;color:var(--text);font-family:'Outfit',sans-serif;font-size:14px;outline:none;transition:border-color .2s;}
        .ti:focus{border-color:var(--gold);}
        .ti::placeholder{color:var(--muted);}
        .tfield{margin-bottom:14px;}
        .tflbl{font-size:11px;color:var(--muted);letter-spacing:1px;text-transform:uppercase;margin-bottom:5px;}
        .snav{display:flex;justify-content:space-between;align-items:center;margin-top:24px;padding-top:20px;border-top:1px solid rgba(255,255,255,.05);}
        .btn-bk{padding:11px 24px;border-radius:22px;background:none;border:1.5px solid var(--bg5);color:var(--muted);font-size:14px;cursor:pointer;font-family:'Outfit',sans-serif;transition:all .2s;}
        .btn-bk:hover{border-color:var(--border);color:var(--gold);}
        .btn-nx{padding:11px 28px;border-radius:22px;background:linear-gradient(135deg,var(--gold),#9A7830);color:#000;font-size:14px;font-weight:600;border:none;cursor:pointer;font-family:'Outfit',sans-serif;transition:all .2s;}
        .btn-nx:hover{transform:translateY(-1px);}
        .btn-gen{padding:15px 40px;border-radius:30px;background:linear-gradient(135deg,var(--gold),#9A7830);color:#000;font-size:15px;font-weight:700;border:none;cursor:pointer;font-family:'Outfit',sans-serif;display:flex;align-items:center;gap:10px;box-shadow:0 6px 24px rgba(200,169,110,.22);transition:all .3s;margin:0 auto;}
        .btn-gen:hover{transform:translateY(-2px);}
        .gen-box{display:none;text-align:center;padding:68px 24px;background:var(--bg2);border:1px solid rgba(255,255,255,.05);border-radius:18px;}
        .gen-ring{width:64px;height:64px;border:3px solid var(--bg5);border-top-color:var(--gold);border-radius:50%;animation:spin 1s linear infinite;margin:0 auto 22px;}
        .gen-t{font-family:'Cormorant Garamond',serif;font-size:26px;color:var(--gold2);margin-bottom:5px;}
        .gen-s{font-size:13px;color:var(--muted);margin-bottom:20px;}
        .gen-list{display:flex;flex-direction:column;gap:6px;max-width:280px;margin:0 auto;}
        .gl{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--muted);padding:7px 12px;border-radius:7px;background:var(--bg3);transition:all .35s;}
        .gl.cur{color:var(--gold);background:rgba(200,169,110,.07);}
        .gl.ok{color:var(--green);}
        .gl-d{width:5px;height:5px;border-radius:50%;background:currentColor;flex-shrink:0;}
        .res-wrap{max-width:1080px;margin:0 auto;padding:48px 24px 80px;}
        .res-head{text-align:center;margin-bottom:44px;padding-bottom:36px;border-bottom:1px solid var(--border);}
        .res-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(61,201,138,.07);border:1px solid rgba(61,201,138,.22);color:var(--green);padding:6px 16px;border-radius:18px;font-size:12px;margin-bottom:18px;}
        .res-name{font-family:'Cormorant Garamond',serif;font-size:clamp(28px,5.5vw,58px);font-weight:300;color:#fff;margin-bottom:7px;}
        .res-name em{color:var(--gold);font-style:italic;}
        .res-tag{font-size:14px;color:var(--muted);}
        .res-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;}
        @media(max-width:760px){.res-grid{grid-template-columns:1fr;}}
        .rcard{background:var(--bg2);border:1px solid var(--border);border-radius:14px;overflow:hidden;}
        .rcard-h{padding:14px 18px;border-bottom:1px solid rgba(255,255,255,.05);display:flex;align-items:center;gap:8px;}
        .rch-dot{width:7px;height:7px;border-radius:50%;background:var(--gold);}
        .rch-t{font-size:13px;font-weight:600;}
        .rch-s{font-size:11px;color:var(--muted);margin-left:auto;}
        .lcb{padding:12px 16px;border-top:1px solid rgba(255,255,255,.04);background:rgba(0,0,0,.18);}
        .lcb-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
        .lcb-lbl{font-size:10px;color:var(--muted);letter-spacing:1px;min-width:36px;}
        .lcs{display:flex;gap:5px;}
        .lsw{width:22px;height:22px;border-radius:4px;cursor:pointer;border:2px solid transparent;transition:all .15s;}
        .lsw:hover{transform:scale(1.15);}
        .lsw.s{border-color:#fff;}
        .photo-card{background:linear-gradient(135deg,rgba(200,169,110,.07),rgba(200,169,110,.03));border:1px solid rgba(200,169,110,.28);border-radius:16px;padding:26px;margin-bottom:20px;}
        .pc-h{display:flex;align-items:flex-start;gap:14px;margin-bottom:18px;}
        .pc-icon{font-size:34px;}
        .pc-head h3{font-family:'Cormorant Garamond',serif;font-size:22px;color:var(--gold2);margin-bottom:4px;}
        .pc-head p{font-size:13px;color:var(--muted);line-height:1.6;}
        .prompt-box{background:var(--bg3);border:1px solid rgba(255,255,255,.08);border-radius:12px;overflow:hidden;margin-bottom:14px;}
        .pb-top{padding:11px 16px;background:rgba(200,169,110,.06);border-bottom:1px solid rgba(255,255,255,.06);display:flex;align-items:center;justify-content:space-between;}
        .pb-lbl{font-size:10px;color:var(--gold);letter-spacing:2px;text-transform:uppercase;}
        .pb-copy{padding:5px 12px;border-radius:7px;background:var(--gold);color:#000;font-size:11px;font-weight:700;border:none;cursor:pointer;font-family:'Outfit',sans-serif;}
        .pb-text{padding:14px 16px;font-family:'Courier New',monospace;font-size:12px;color:#ccc;line-height:1.7;word-break:break-word;}
        .launch-row{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px;}
        @media(max-width:580px){.launch-row{grid-template-columns:1fr;}}
        .launch-btn{padding:13px 14px;border-radius:12px;font-size:13px;font-weight:600;cursor:pointer;border:none;font-family:'Outfit',sans-serif;display:flex;align-items:center;justify-content:center;gap:8px;transition:all .25s;text-decoration:none;}
        .lb-bing{background:linear-gradient(135deg,#1A8FFF,#0060CC);color:#fff;}
        .lb-mj{background:linear-gradient(135deg,#2D2D2D,#1A1A1A);color:#fff;border:1px solid #444;}
        .lb-gpt{background:linear-gradient(135deg,#10A37F,#0D7A5F);color:#fff;}
        .lb-sub{font-size:10px;opacity:.75;display:block;margin-top:1px;font-weight:400;}
        .bing-guide{background:linear-gradient(135deg,rgba(26,143,255,.08),rgba(26,143,255,.03));border:1px solid rgba(26,143,255,.3);border-radius:12px;padding:16px 18px;}
        .bg-title{font-size:13px;font-weight:700;color:#4A8FFF;margin-bottom:10px;display:flex;align-items:center;gap:8px;}
        .bg-steps{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;}
        .bg-step{background:rgba(26,143,255,.06);border-radius:7px;padding:9px 10px;text-align:center;}
        .bg-snum{font-size:17px;font-weight:700;color:#4A8FFF;margin-bottom:3px;}
        .bg-stxt{font-size:10px;color:#aaa;line-height:1.4;}
        .ai-brief{background:var(--bg2);border:1px solid var(--border);border-radius:14px;padding:22px;}
        .ab-title{font-family:'Cormorant Garamond',serif;font-size:20px;color:var(--gold2);margin-bottom:16px;padding-bottom:13px;border-bottom:1px solid rgba(255,255,255,.05);}
        .ab-sec{margin-bottom:15px;}
        .ab-lbl{font-size:10px;letter-spacing:2px;color:var(--gold);text-transform:uppercase;margin-bottom:7px;}
        .ab-text{font-size:13px;color:#bbb;line-height:1.7;}
        .ab-tags{display:flex;flex-wrap:wrap;gap:6px;margin-top:7px;}
        .ab-tag{padding:4px 11px;border-radius:8px;font-size:12px;background:rgba(200,169,110,.08);color:var(--gold2);border:1px solid rgba(200,169,110,.13);}
        .mat-r{display:flex;align-items:center;gap:9px;padding:8px 10px;background:var(--bg3);border-radius:7px;margin-bottom:5px;}
        .mat-sw{width:20px;height:20px;border-radius:4px;border:1px solid rgba(255,255,255,.1);}
        .mat-n{font-size:12px;}.mat-t{font-size:11px;color:var(--muted);margin-left:auto;}
        .cost-t{width:100%;border-collapse:collapse;}
        .cost-t td{padding:8px 0;font-size:13px;border-bottom:1px solid rgba(255,255,255,.04);}
        .cost-t td:first-child{color:var(--muted);}
        .cost-t td:last-child{text-align:right;color:var(--gold2);font-weight:500;}
        .cost-t tr:last-child td{border:none;font-size:14px;font-weight:700;padding-top:12px;}
        .cost-t tr:last-child td:first-child{color:var(--text);}
        .cost-t tr:last-child td:last-child{color:var(--gold);}
        .fp-tabs{display:flex;gap:5px;padding:12px 15px 0;flex-wrap:wrap;}
        .fpt{padding:6px 12px;border-radius:14px;font-size:12px;border:1.5px solid var(--bg5);background:none;color:var(--muted);cursor:pointer;font-family:'Outfit',sans-serif;transition:all .2s;}
        .fpt:hover{border-color:var(--border);}
        .fpt.act{background:var(--gold);border-color:var(--gold);color:#000;font-weight:600;}
        .fp-body{display:grid;grid-template-columns:1fr 170px;}
        @media(max-width:560px){.fp-body{grid-template-columns:1fr;}}
        .rp{padding:13px;overflow-y:auto;max-height:370px;}
        .rpi{display:flex;align-items:center;gap:7px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.04);font-size:11px;}
        .rpi:last-child{border:none;}
        .rpi-i{font-size:13px;}.rpi-n{color:var(--text);}.rpi-s{font-size:10px;color:var(--muted);margin-left:auto;}
        .rooms-g{display:grid;grid-template-columns:1fr 1fr;gap:7px;}
        .rgi{display:flex;align-items:center;gap:7px;padding:8px 11px;background:var(--bg3);border-radius:7px;}
        .rgi-i{font-size:14px;}.rgi-n{font-size:12px;}.rgi-s{font-size:10px;color:var(--muted);margin-left:auto;}
        .sum-t{width:100%;border-collapse:collapse;}
        .sum-t td{padding:9px 0;font-size:13px;border-bottom:1px solid rgba(255,255,255,.04);}
        .sum-t td:first-child{color:var(--muted);}
        .sum-t td:last-child{text-align:right;color:var(--text);font-weight:500;}
        .dl-row{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:36px;padding-top:28px;border-top:1px solid var(--border);}
        .btn-dl{padding:12px 24px;border-radius:22px;font-size:13px;font-weight:500;cursor:pointer;border:none;font-family:'Outfit',sans-serif;display:flex;align-items:center;gap:7px;transition:all .22s;}
        .bdp{background:var(--gold);color:#000;font-weight:700;}
        .bdp:hover{background:var(--gold2);}
        .bds{background:none;border:1.5px solid var(--border);color:var(--text);}
        .bds:hover{border-color:var(--gold);color:var(--gold);}
        .wmark{text-align:center;font-size:11px;color:var(--muted);margin-top:10px;}
        .wmark span{color:var(--green);}
        @media(max-width:560px){nav{padding:13px 18px;}.nav-center{display:none;}.hero{padding:60px 20px 48px;}.gallery-sec,.how-sec{padding:60px 24px;}.cfg-wrap,.res-wrap{padding:28px 13px 60px;}.sbox{padding:22px 15px;}.price-hero{padding:60px 24px 40px;}.price-grid{padding:0 18px;}}
      `}</style>

      <div id="archai-root">
        {/* Floating buttons — only render client-side to prevent removeChild error */}
        {mounted && (
          <>
            <div className="float-back" id="float-back">
              <button className="fb-btn" onClick={() => goBack()}>←</button>
              <div className="fb-lbl">BACK</div>
            </div>
            <div className="float-home">
              <button className="fh-btn" onClick={() => goPage('home')}>🏠</button>
              <div className="fh-lbl">HOME</div>
            </div>
          </>
        )}

        {/* Banner */}
        <div className="banner">🎁 <span className="g">FREE FOR EVERYONE</span> — Full access until January 2026 · No signup · <span className="gold">✨ 9 Villa Styles · Auto AI Image Prompt Included</span></div>

        {/* Nav */}
        <nav>
          <div className="nav-logo" onClick={() => goPage('home')}>ARCH<span>AI</span></div>
          <div className="nav-center">
            <button className="nb on" id="nb-home" onClick={() => goPage('home')}>Home</button>
            <button className="nb" id="nb-config" onClick={() => goPage('config')}>Design Villa</button>
            <button className="nb" id="nb-pricing" onClick={() => goPage('pricing')}>Pricing</button>
            <a href="/archai/blog" style={{padding:"5px 13px",borderRadius:6,border:"1px solid rgba(200,169,110,0.35)",background:"rgba(200,169,110,0.08)",color:"#C8A96E",fontSize:12,fontWeight:700,textDecoration:"none",fontFamily:"Outfit,sans-serif"}}>📝 Blog</a>
          </div>
          <div style={{display:'flex',alignItems:'center',gap:10}}>
            <Link href="/tours" style={{fontSize:12,color:'var(--muted)',textDecoration:'none',padding:'8px 14px',border:'1px solid rgba(255,255,255,0.08)',borderRadius:20}}>← Dubai Rovers</Link>
            <button className="nav-cta" onClick={() => goPage('config')}>Start Free →</button>
          </div>
        </nav>

        {/* HOME PAGE */}
        <div className="page show" id="page-home">
          <div className="hero">
            <div className="hero-glow"></div>
            <div className="hero-grid"></div>
            <div className="hero-inner">
              <div className="hero-pill"><div className="hp-dot"></div>Free for 1 Year · No Signup</div>
              <h1 className="hero-h">Design Your <em>Dream Villa</em><br/>+ Get a Real <em>Photo in 30 Seconds</em></h1>
              <p className="hero-sub">Pick your plot, style, rooms and colors — ARCHAI builds your complete design AND auto-generates the perfect AI image prompt. Paste it into Bing (free) and get a stunning photorealistic picture instantly.</p>
              <div className="hero-btns">
                <button className="btn-hero" onClick={() => goPage('config')}>🏠 Design My Villa — Free</button>
                <button className="btn-ghost" onClick={() => goPage('pricing')}>See Plans</button>
              </div>
              <div className="trust-strip">
                <div className="ts">✅ No signup</div>
                <div className="ts">⚡ 3 minutes</div>
                <div className="ts">✨ Real photo prompt</div>
                <div className="ts">📥 Download PNG</div>
                <div className="ts">🎁 Free until Jan 2026</div>
              </div>
            </div>
          </div>

          <div className="feat-bar">
            {[['9','Architecture Styles'],['5','Floor Plan Levels'],['60','Color Options'],['100%','AI-Powered Prompts'],['FREE','No Signup Ever']].map(([v,l])=>(
              <div key={l} className="fb"><strong>{v}</strong> {l}</div>
            ))}
          </div>

          <div className="gallery-sec">
            <div className="gallery-inner">
              <div className="sec-tag">Style Gallery</div>
              <h2 className="sec-title">9 Architectural <em>Styles</em></h2>
              <p className="sec-sub">Each style has its own canvas renderer, AI prompt template, floor plan and cost breakdown. Click any style to start designing.</p>
              <div className="style-gallery" id="style-gallery"></div>
            </div>
          </div>

          <div className="how-sec">
            <div style={{maxWidth:880,margin:'0 auto',textAlign:'center'}}>
              <div className="sec-tag">How It Works</div>
              <h2 className="sec-title">Design to <em>Photo</em> in 5 Steps</h2>
            </div>
            <div className="how-steps">
              {[['🏗️','Plot & Floors','Set your marla size'],['🏡','Pick Style','9 styles to choose'],['🛏️','Add Rooms','Full room config'],['🎨','Set Colors','60 color options'],['✨','Get Design','Photo + floor plans']].map(([ic,n,d])=>(
                <div key={n} className="hs">
                  <div className="hs-c">{ic}</div>
                  <div className="hs-n">{n}</div>
                  <div className="hs-d">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PRICING PAGE */}
        <div className="page" id="page-pricing">
          <div className="price-hero">
            <div className="free-notice">
              <div style={{fontSize:30}}>🎁</div>
              <div>
                <div className="fn-t">FREE FOR EVERYONE — Full Access Until January 2026</div>
                <div className="fn-s">No credit card. No signup. All features unlocked right now.</div>
                <div className="fn-d">INCLUDES: AI PROMPTS · FLOOR PLANS · CANVAS RENDER · PNG DOWNLOAD</div>
              </div>
            </div>
            <div className="sec-tag" style={{textAlign:'center'}}>Pricing</div>
            <h2 className="sec-title" style={{textAlign:'center',marginBottom:8}}>Simple <em>Transparent</em> Plans</h2>
            <div className="bill-row">
              <span className="bl on" id="lbl-m">Monthly</span>
              <div className="tog" id="bill-tog" onClick={() => toggleBill()}><div className="tok"></div></div>
              <span className="bl" id="lbl-a">Annual</span>
              <span className="save-b">Save 40%</span>
            </div>
          </div>
          <div className="price-grid">
            <div className="pc2"><div className="pc2-top"><div className="pc2-icon">🏠</div><div className="pc2-tier">For Everyone</div><div className="pc2-name">Starter</div><div className="pc2-desc">Full design tool. Free forever.</div><div className="pc2-pfree">Free <small>forever</small></div><div className="pc2-note">✅ Active now — no signup</div></div><div className="pc2-body"><ul className="pc2-list"><li><span className="ck">✓</span>5 designs/month</li><li><span className="ck">✓</span>All 9 architecture styles</li><li><span className="ck">✓</span>5-floor plans</li><li><span className="ck">✓</span>Canvas exterior render</li><li><span className="ck">✓</span>Auto AI image prompt</li><li><span className="ck">✓</span>PKR cost estimate</li><li><span className="ck">✓</span>Download PNG</li></ul><button className="pc2-btn pb-free" onClick={() => goPage('config')}>Start Free →</button></div></div>
            <div className="pc2 pop"><div className="pop-b">MOST POPULAR</div><div className="pc2-top"><div className="pc2-icon">🏰</div><div className="pc2-tier">For Professionals</div><div className="pc2-name">Pro Designer</div><div className="pc2-desc">For architects, designers, property consultants.</div><div className="pc2-price"><span className="cur">$</span><span className="amt" id="pro-a">19</span><span className="per" id="pro-p">/month</span></div><div className="pc2-struck">Was $19/mo <span className="free-now">FREE until Jan 2026</span></div><div className="pc2-note">🎉 Free now</div></div><div className="pc2-body"><ul className="pc2-list"><li><span className="ck">✓</span>Unlimited designs</li><li><span className="ck">✓</span>Everything in Starter</li><li><span className="ck">✓</span>AI renders inside ARCHAI</li><li><span className="ck">✓</span>60-color palette</li><li><span className="ck">✓</span>PDF + PNG download</li><li><span className="ck">✓</span>Your logo on reports</li></ul><button className="pc2-btn pb-gold">✨ Free Until Jan 2026</button></div></div>
            <div className="pc2"><div className="pc2-top"><div className="pc2-icon">👑</div><div className="pc2-tier">For Agencies</div><div className="pc2-name">VIP Studio</div><div className="pc2-desc">White-label for developers and agencies.</div><div className="pc2-price"><span className="cur">$</span><span className="amt" id="vip-a">49</span><span className="per" id="vip-p">/month</span></div><div className="pc2-struck">Was $49/mo <span className="free-now">FREE until Jan 2026</span></div><div className="pc2-note">👑 Full access free</div></div><div className="pc2-body"><ul className="pc2-list"><li><span className="ck">✓</span>Everything in Pro</li><li><span className="ck">✓</span>White-label branding</li><li><span className="ck">✓</span>5 team members</li><li><span className="ck">✓</span>API access</li><li><span className="ck">✓</span>WhatsApp support</li></ul><button className="pc2-btn pb-vip">👑 Free Until Jan 2026</button></div></div>
          </div>
        </div>

        {/* CONFIGURATOR PAGE */}
        <div className="page" id="page-config">
          <div className="cfg-wrap" id="cfg-wrap">
            <div className="cfg-progress" id="cfg-prog"></div>
            <div id="cfg-step"></div>
            <div className="gen-box" id="gen-box">
              <div className="gen-ring"></div>
              <div className="gen-t">Designing Your Villa</div>
              <div className="gen-s">Building design + photorealistic image prompt...</div>
              <div className="gen-list">
                <div className="gl cur"><div className="gl-d"></div>Analysing requirements</div>
                <div className="gl"><div className="gl-d"></div>Calculating dimensions</div>
                <div className="gl"><div className="gl-d"></div>Designing floor layout</div>
                <div className="gl"><div className="gl-d"></div>Selecting materials</div>
                <div className="gl"><div className="gl-d"></div>Estimating costs</div>
                <div className="gl"><div className="gl-d"></div>Building image prompt</div>
                <div className="gl"><div className="gl-d"></div>Finalising package</div>
              </div>
            </div>
          </div>
          <div className="res-wrap" id="res-wrap" style={{display:'none'}}></div>
        </div>
      </div>
    </>
  );
}
