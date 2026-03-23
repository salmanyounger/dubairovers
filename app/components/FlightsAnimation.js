'use client';
import { useEffect, useRef } from 'react';

function lerp(a, b, t) { return a + (b - a) * t; }

function drawCloud(ctx, x, y, r, alpha = 0.9) {
  ctx.save(); ctx.globalAlpha = alpha; ctx.fillStyle = '#fff';
  [0,-r*0.5,r*0.55,-r*0.3,r*0.3].forEach((dx,i)=>{
    ctx.beginPath(); ctx.arc(x+dx, y+(i%2?r*0.18:0), r*[0.6,0.42,0.38,0.32,0.28][i], 0, Math.PI*2); ctx.fill();
  });
  ctx.restore();
}

function drawStars(ctx, W, H, t, count=80) {
  for (let i=0;i<count;i++) {
    const sx=(i*173.3)%W, sy=(i*97.7)%(H*0.6);
    const tw=0.2+0.8*Math.abs(Math.sin(t*1.2+i*0.4));
    ctx.beginPath(); ctx.arc(sx,sy,i%5===0?1.6:0.7,0,Math.PI*2);
    ctx.fillStyle=`rgba(255,255,255,${tw})`; ctx.fill();
  }
}

// Draw Emirates/generic widebody plane
function drawPlane(ctx, x, y, scale=1, angle=0, colors={body:'#ffffff',stripe:'#C8102E',engine:'#cccccc'}) {
  ctx.save(); ctx.translate(x,y); ctx.rotate(angle); ctx.scale(scale,scale);
  const S = colors.stripe;
  // Main fuselage
  const fg = ctx.createLinearGradient(-80,0,80,0);
  fg.addColorStop(0,'#d0d8e8'); fg.addColorStop(0.3,colors.body); fg.addColorStop(0.7,colors.body); fg.addColorStop(1,'#d0d8e8');
  ctx.fillStyle = fg;
  ctx.beginPath(); ctx.ellipse(0,0,80,14,0,0,Math.PI*2); ctx.fill();
  // Nose cone
  ctx.fillStyle = '#b0b8c8';
  ctx.beginPath(); ctx.moveTo(80,0); ctx.quadraticCurveTo(100,-5,98,5); ctx.quadraticCurveTo(100,5,80,3); ctx.closePath(); ctx.fill();
  // Stripe
  ctx.fillStyle = S;
  ctx.beginPath(); ctx.rect(-70,-3,140,6);
  ctx.save(); ctx.clip();
  ctx.fillRect(-70,-3,140,6);
  ctx.restore();
  // Windows row
  for (let i=-8;i<=8;i++) {
    ctx.fillStyle='rgba(120,180,220,0.8)';
    ctx.beginPath(); ctx.ellipse(i*8,-2,3,4,0,0,Math.PI*2); ctx.fill();
  }
  // Wings
  const wg = ctx.createLinearGradient(-10,-50,30,0);
  wg.addColorStop(0,'#b0b8cc'); wg.addColorStop(1,'#d0d8e8');
  ctx.fillStyle = wg;
  // upper wing
  ctx.beginPath(); ctx.moveTo(20,-13); ctx.lineTo(-30,-70); ctx.lineTo(-60,-55); ctx.lineTo(-30,-13); ctx.closePath(); ctx.fill();
  // lower wing
  ctx.beginPath(); ctx.moveTo(20,13); ctx.lineTo(-30,70); ctx.lineTo(-60,55); ctx.lineTo(-30,13); ctx.closePath(); ctx.fill();
  // Wing tips (winglets) - Emirates style
  ctx.fillStyle = S;
  ctx.beginPath(); ctx.moveTo(-60,-55); ctx.lineTo(-72,-48); ctx.lineTo(-65,-45); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(-60,55); ctx.lineTo(-72,48); ctx.lineTo(-65,45); ctx.closePath(); ctx.fill();
  // Engines x2
  [[-35,-48],[-35,48]].forEach(([ex,ey]) => {
    ctx.fillStyle = colors.engine;
    ctx.beginPath(); ctx.ellipse(ex,ey,18,9,0,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#555';
    ctx.beginPath(); ctx.ellipse(ex,ey,10,6,0,0,Math.PI*2); ctx.fill();
    // engine glow
    const eg = ctx.createRadialGradient(ex+18,ey,0,ex+18,ey,8);
    eg.addColorStop(0,'rgba(255,150,50,0.8)'); eg.addColorStop(1,'transparent');
    ctx.fillStyle = eg; ctx.beginPath(); ctx.arc(ex+18,ey,8,0,Math.PI*2); ctx.fill();
  });
  // Tail
  ctx.fillStyle = colors.body;
  ctx.beginPath(); ctx.moveTo(-80,0); ctx.lineTo(-95,-35); ctx.lineTo(-80,-12); ctx.closePath(); ctx.fill();
  ctx.fillStyle = S;
  ctx.beginPath(); ctx.moveTo(-80,0); ctx.lineTo(-95,-35); ctx.lineTo(-90,-32); ctx.lineTo(-78,-5); ctx.closePath(); ctx.fill();
  ctx.restore();
}

// ── SCENE 0: Dubai International Airport – Top View ──
function drawAirportTop(ctx, W, H, t) {
  // Tarmac
  ctx.fillStyle = '#2c2c34'; ctx.fillRect(0,0,W,H);

  // Runway markings
  ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2; ctx.setLineDash([20,15]);
  ctx.beginPath(); ctx.moveTo(0,H*0.38); ctx.lineTo(W,H*0.38); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0,H*0.62); ctx.lineTo(W,H*0.62); ctx.stroke();
  ctx.setLineDash([]);

  // Runway edge lights
  for (let i=0;i<30;i++) {
    const lx = i*(W/30);
    const pulse = 0.5+0.5*Math.sin(t*4+i*0.5);
    ctx.fillStyle = `rgba(255,250,100,${pulse})`; ctx.beginPath(); ctx.arc(lx,H*0.36,3,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = `rgba(255,250,100,${pulse})`; ctx.beginPath(); ctx.arc(lx,H*0.64,3,0,Math.PI*2); ctx.fill();
  }

  // Taxiway
  ctx.fillStyle = '#38383f'; ctx.fillRect(W*0.35,0,W*0.06,H*0.35);
  ctx.fillRect(W*0.35,H*0.65,W*0.06,H*0.35);
  ctx.strokeStyle = '#FFD700'; ctx.lineWidth = 1.5; ctx.setLineDash([8,6]);
  ctx.beginPath(); ctx.moveTo(W*0.38,0); ctx.lineTo(W*0.38,H*0.35); ctx.stroke();
  ctx.setLineDash([]);

  // Terminal buildings
  [[W*0.05,H*0.08,'#3a3a4a',W*0.25,H*0.18],[W*0.65,H*0.08,'#3a3a4a',W*0.28,H*0.18]].forEach(([bx,by,col,bw,bh])=>{
    ctx.fillStyle = col; ctx.fillRect(bx,by,bw,bh);
    // Gate bridges
    for (let i=0;i<5;i++) {
      ctx.fillStyle='#2a2a32'; ctx.fillRect(bx+i*(bw/5)+5,by+bh,12,H*0.1);
    }
    // Terminal lights
    for (let r=0;r<3;r++) for(let c=0;c<8;c++) {
      const lit=Math.sin(t*0.3+r+c*2)>-0.3;
      ctx.fillStyle=lit?'rgba(255,230,100,0.6)':'rgba(100,100,130,0.3)';
      ctx.fillRect(bx+6+c*(bw-12)/8,by+5+r*((bh-10)/4),10,6);
    }
  });

  // Control tower
  ctx.fillStyle='#4a4a5a'; ctx.fillRect(W*0.47,H*0.02,W*0.06,H*0.3);
  ctx.fillStyle='#6a6a7a'; ctx.fillRect(W*0.46,H*0.06,W*0.08,H*0.08);
  // Tower lights
  const tp=0.5+0.5*Math.sin(t*3);
  ctx.fillStyle=`rgba(255,50,50,${tp})`; ctx.beginPath(); ctx.arc(W*0.5,H*0.02,5,0,Math.PI*2); ctx.fill();

  // PLANE 1: Taking off (accelerating right)
  const p1x = ((t*80) % (W+200)) - 80;
  const p1scale = 0.5;
  drawPlane(ctx,p1x,H*0.5,p1scale,0,{body:'#fff',stripe:'#C8102E',engine:'#ccc'});
  // Jet blast
  for (let i=0;i<10;i++) {
    ctx.fillStyle=`rgba(200,200,220,${0.3-i*0.025})`;
    ctx.beginPath(); ctx.ellipse(p1x-80*p1scale-i*12,H*0.5,8-i*0.5,4-i*0.3,0,0,Math.PI*2); ctx.fill();
  }

  // PLANE 2: Taxiing slowly
  const p2x = W*0.8 - ((t*15)%(W*0.5));
  drawPlane(ctx,p2x,H*0.75,0.35,-0.1,{body:'#fff',stripe:'#FF6600',engine:'#ccc'});

  // PLANE 3: At gate
  drawPlane(ctx,W*0.2,H*0.15,0.4,Math.PI/2,{body:'#fff',stripe:'#004F9F',engine:'#ccc'});

  ctx.fillStyle='rgba(0,0,0,0.55)'; ctx.beginPath(); if(ctx.roundRect)ctx.roundRect(8,8,215,26,13); else ctx.rect(8,8,215,26); ctx.fill();
  ctx.fillStyle='#a8d8ea'; ctx.font=`bold ${W>500?12:10}px sans-serif`; ctx.textAlign='left';
  ctx.fillText('✈️ DUBAI INTERNATIONAL — DXB Hub', 18, 26);
}

// ── SCENE 1: Aerial View of Dubai (from above) ──
function drawAerialDubai(ctx, W, H, t) {
  // Sky from high altitude
  const sky = ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#000a1f'); sky.addColorStop(0.3,'#001a5c'); sky.addColorStop(0.6,'#0050a0'); sky.addColorStop(1,'#0080d0');
  ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);

  // The sea - Persian Gulf
  const sea = ctx.createLinearGradient(0,H*0.45,0,H);
  sea.addColorStop(0,'#003f6b'); sea.addColorStop(1,'#001a33');
  ctx.fillStyle=sea; ctx.fillRect(0,H*0.45,W,H*0.55);

  // Slow sea shimmer
  for (let i=0;i<15;i++) {
    ctx.strokeStyle=`rgba(100,180,255,${0.08+Math.sin(t*0.5+i)*0.05})`; ctx.lineWidth=1.5;
    ctx.beginPath();
    for (let x=0;x<=W;x+=6) { const wy=H*(0.5+i*0.033)+Math.sin(x*0.03+t+i)*3; x===0?ctx.moveTo(x,wy):ctx.lineTo(x,wy); }
    ctx.stroke();
  }

  // Dubai coast / shoreline
  ctx.fillStyle='#c8a96e';
  ctx.beginPath(); ctx.moveTo(0,H*0.45); ctx.lineTo(W*0.3,H*0.42); ctx.lineTo(W*0.55,H*0.44); ctx.lineTo(W*0.8,H*0.43); ctx.lineTo(W,H*0.45); ctx.lineTo(W,H*0.65); ctx.lineTo(0,H*0.65); ctx.closePath(); ctx.fill();

  // City grid (downtown from above)
  ctx.fillStyle='#8a7a5a';
  ctx.fillRect(W*0.1,H*0.12,W*0.6,H*0.33);
  // Road grid
  ctx.strokeStyle='rgba(200,180,140,0.3)'; ctx.lineWidth=1;
  for (let i=0;i<12;i++) { ctx.beginPath(); ctx.moveTo(W*0.1+i*(W*0.6/12),H*0.12); ctx.lineTo(W*0.1+i*(W*0.6/12),H*0.45); ctx.stroke(); }
  for (let i=0;i<8;i++) { ctx.beginPath(); ctx.moveTo(W*0.1,H*0.12+i*(H*0.33/8)); ctx.lineTo(W*0.7,H*0.12+i*(H*0.33/8)); ctx.stroke(); }

  // Sheikh Zayed Road - main artery (bright)
  ctx.strokeStyle='rgba(255,240,180,0.5)'; ctx.lineWidth=3;
  ctx.beginPath(); ctx.moveTo(W*0.42,0); ctx.lineTo(W*0.44,H*0.45); ctx.stroke();
  // Night lights on SZR
  for (let i=0;i<20;i++) {
    const ly=(i/20)*H*0.45;
    const pulse=0.4+0.4*Math.sin(t*2+i*0.3);
    ctx.fillStyle=`rgba(255,220,100,${pulse})`; ctx.beginPath(); ctx.arc(W*0.43,ly,2,0,Math.PI*2); ctx.fill();
  }

  // Palm Jumeirah (from above, iconic shape)
  ctx.fillStyle='#d4a96e';
  ctx.save(); ctx.translate(W*0.75,H*0.52);
  ctx.beginPath(); ctx.ellipse(0,0,W*0.03,W*0.12,0.15,0,Math.PI*2); ctx.fill(); // trunk
  for (let i=0;i<16;i++) {
    const a=(i/16)*Math.PI*2;
    ctx.save(); ctx.rotate(a);
    ctx.fillRect(-3,0,6,W*0.055); ctx.restore();
  }
  // crescent
  ctx.strokeStyle='#d4a96e'; ctx.lineWidth=8;
  ctx.beginPath(); ctx.arc(0,0,W*0.07,Math.PI*0.1,Math.PI*0.9); ctx.stroke();
  ctx.restore();

  // Burj Khalifa dot (tallest building - visible from space)
  const bkpulse=0.6+0.4*Math.sin(t*2.5);
  ctx.fillStyle=`rgba(255,200,50,${bkpulse})`;
  ctx.beginPath(); ctx.arc(W*0.43,H*0.24,5,0,Math.PI*2); ctx.fill();
  ctx.fillStyle='rgba(255,255,200,0.15)';
  ctx.beginPath(); ctx.arc(W*0.43,H*0.24,15,0,Math.PI*2); ctx.fill();

  // Our plane in foreground - tiny as it's very high up
  const plane_x = W*0.15 + ((t*22)%(W*0.7));
  const plane_y = H*0.22;
  const contrailLen = 80;
  // Contrail
  const cg=ctx.createLinearGradient(plane_x-contrailLen,plane_y,plane_x,plane_y);
  cg.addColorStop(0,'transparent'); cg.addColorStop(1,'rgba(255,255,255,0.5)');
  ctx.strokeStyle='rgba(255,255,255,0.4)'; ctx.lineWidth=3; ctx.setLineDash([]);
  ctx.beginPath(); ctx.moveTo(plane_x-contrailLen,plane_y); ctx.lineTo(plane_x-5,plane_y); ctx.stroke();
  drawPlane(ctx,plane_x,plane_y,0.3,0,{body:'#fff',stripe:'#C8102E',engine:'#ddd'});

  // Cloud layers at this altitude
  [0.08,0.35,0.65].forEach((cf,i)=>{
    drawCloud(ctx,(((cf*W+t*15*(i+1)*0.3)%(W+160))-80),H*0.35+i*30,24+i*6,0.25);
  });

  ctx.fillStyle='rgba(0,0,0,0.5)'; ctx.beginPath(); if(ctx.roundRect)ctx.roundRect(8,8,210,26,13); else ctx.rect(8,8,210,26); ctx.fill();
  ctx.fillStyle='#a8d8ea'; ctx.font=`bold ${W>500?12:10}px sans-serif`; ctx.textAlign='left';
  ctx.fillText('🌆 DUBAI FROM 35,000 FT — Top View', 18, 26);
}

// ── SCENE 2: Emirates Business Class Interior ──
function drawBusinessClass(ctx, W, H, t) {
  // Cabin background
  const cab=ctx.createLinearGradient(0,0,0,H);
  cab.addColorStop(0,'#1a1208'); cab.addColorStop(0.5,'#2a1e0e'); cab.addColorStop(1,'#1a1208');
  ctx.fillStyle=cab; ctx.fillRect(0,0,W,H);

  // Cabin ceiling with mood lighting
  const cl=ctx.createLinearGradient(0,0,0,H*0.25);
  cl.addColorStop(0,'#3a2a50'); cl.addColorStop(1,'transparent');
  ctx.fillStyle=cl; ctx.fillRect(0,0,W,H*0.25);

  // Overhead bin lines
  ctx.strokeStyle='rgba(180,150,80,0.3)'; ctx.lineWidth=1;
  for (let i=0;i<6;i++) {
    ctx.beginPath(); ctx.moveTo(W*0.05+i*(W*0.16),0); ctx.lineTo(W*0.05+i*(W*0.16),H*0.35); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W*0.05+i*(W*0.16),0); ctx.lineTo(W*0.12+i*(W*0.16),H*0.35); ctx.stroke();
  }

  // Business class seats (4 pods visible)
  const seatData = [{x:W*0.06},{x:W*0.3},{x:W*0.55},{x:W*0.78}];
  seatData.forEach((s,si)=>{
    const sx=s.x, sy=H*0.28, sw=W*0.2, sh=H*0.55;
    // Pod walls
    const sg=ctx.createLinearGradient(sx,sy,sx+sw,sy+sh);
    sg.addColorStop(0,'#3a2c1a'); sg.addColorStop(1,'#2a1e10');
    ctx.fillStyle=sg; ctx.beginPath();
    if(ctx.roundRect)ctx.roundRect(sx,sy,sw,sh,6); else ctx.rect(sx,sy,sw,sh); ctx.fill();
    // Seat cushion (flat bed position)
    ctx.fillStyle='#4a3820';
    ctx.beginPath(); if(ctx.roundRect)ctx.roundRect(sx+6,sy+sh*0.5,sw-12,sh*0.45,4); else ctx.rect(sx+6,sy+sh*0.5,sw-12,sh*0.45); ctx.fill();
    // Seat back
    ctx.fillStyle='#3a2a18';
    ctx.beginPath(); if(ctx.roundRect)ctx.roundRect(sx+6,sy+sh*0.08,sw-12,sh*0.4,4); else ctx.rect(sx+6,sy+sh*0.08,sw-12,sh*0.4); ctx.fill();
    // Pillow
    ctx.fillStyle='rgba(255,255,255,0.85)';
    ctx.beginPath(); if(ctx.roundRect)ctx.roundRect(sx+8,sy+sh*0.47,sw-16,H*0.05,3); else ctx.rect(sx+8,sy+sh*0.47,sw-16,H*0.05); ctx.fill();
    // IFE Screen
    const screenPulse=0.7+0.3*Math.sin(t*0.8+si);
    ctx.fillStyle=`rgba(30,100,180,${screenPulse})`;
    ctx.beginPath(); if(ctx.roundRect)ctx.roundRect(sx+8,sy+10,sw-16,H*0.2,3); else ctx.rect(sx+8,sy+10,sw-16,H*0.2); ctx.fill();
    // Screen content (map route)
    ctx.strokeStyle='rgba(100,200,255,0.5)'; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(sx+12,sy+H*0.12); ctx.lineTo(sx+sw-12,sy+H*0.12+5); ctx.stroke();
    ctx.fillStyle='rgba(255,200,50,0.8)'; ctx.beginPath(); ctx.arc(sx+sw/2,sy+H*0.12+2,3,0,Math.PI*2); ctx.fill();
    // Champagne glass
    ctx.strokeStyle='rgba(200,180,100,0.8)'; ctx.lineWidth=2;
    const gx=sx+sw-20,gy=sy+sh*0.25;
    ctx.beginPath(); ctx.moveTo(gx,gy); ctx.lineTo(gx-8,gy+18); ctx.lineTo(gx+8,gy+18); ctx.closePath(); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(gx,gy+18); ctx.lineTo(gx,gy+28); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(gx-7,gy+28); ctx.lineTo(gx+7,gy+28); ctx.stroke();
    // Champagne bubbles
    ctx.fillStyle='rgba(255,230,100,0.4)';
    for(let b=0;b<3;b++){
      const by2=gy+14-((t*15+b*8)%15);
      ctx.beginPath(); ctx.arc(gx+Math.sin(b)*3,by2,1.5,0,Math.PI*2); ctx.fill();
    }
  });

  // Window with view
  const winX=W*0.88, winY=H*0.25, winW=W*0.1, winH=H*0.35;
  const wg=ctx.createLinearGradient(winX,winY,winX+winW,winY+winH);
  wg.addColorStop(0,'#001a40'); wg.addColorStop(1,'#003380');
  ctx.fillStyle=wg; ctx.beginPath(); if(ctx.roundRect)ctx.roundRect(winX,winY,winW,winH,8); else ctx.rect(winX,winY,winW,winH); ctx.fill();
  // Cloud through window
  ctx.save(); ctx.beginPath(); if(ctx.roundRect)ctx.roundRect(winX,winY,winW,winH,8); else ctx.rect(winX,winY,winW,winH); ctx.clip();
  for(let i=0;i<5;i++) drawCloud(ctx,winX+winW/2+Math.sin(t*0.2+i*2)*20,winY+winH*(0.3+i*0.1),8+i*3,0.5);
  ctx.restore();
  ctx.strokeStyle='rgba(180,150,80,0.4)'; ctx.lineWidth=2;
  ctx.beginPath(); if(ctx.roundRect)ctx.roundRect(winX,winY,winW,winH,8); else ctx.rect(winX,winY,winW,winH); ctx.stroke();

  // Mood lighting glow
  const ml=ctx.createLinearGradient(0,0,0,H*0.08);
  ml.addColorStop(0,`rgba(150,80,200,${0.2+Math.sin(t*0.5)*0.05})`); ml.addColorStop(1,'transparent');
  ctx.fillStyle=ml; ctx.fillRect(0,0,W,H*0.08);

  ctx.fillStyle='rgba(0,0,0,0.5)'; ctx.beginPath(); if(ctx.roundRect)ctx.roundRect(8,8,215,26,13); else ctx.rect(8,8,215,26); ctx.fill();
  ctx.fillStyle='#FFD700'; ctx.font=`bold ${W>500?12:10}px sans-serif`; ctx.textAlign='left';
  ctx.fillText('💺 EMIRATES BUSINESS CLASS — Sky Beds', 18, 26);
}

// ── SCENE 3: Takeoff / Sunrise Above Clouds ──
function drawSunriseAboveClouds(ctx, W, H, t) {
  // Sunrise sky gradient
  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#000820'); sky.addColorStop(0.25,'#0a1a40');
  sky.addColorStop(0.5,'#c44c0a'); sky.addColorStop(0.7,'#ff8c00');
  sky.addColorStop(0.85,'#ffcc00'); sky.addColorStop(1,'#fff5c0');
  ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);

  // Stars fading at top
  for (let i=0;i<60;i++) {
    const sx=(i*173.3)%W, sy=(i*97.7)%(H*0.4);
    const tw=(0.4-sy/(H*0.4))*0.8;
    ctx.beginPath(); ctx.arc(sx,sy,i%5===0?1.4:0.6,0,Math.PI*2);
    ctx.fillStyle=`rgba(255,255,255,${tw})`; ctx.fill();
  }

  // Sun rising at horizon
  const sunY=H*0.72;
  const sunG=ctx.createRadialGradient(W*0.5,sunY,0,W*0.5,sunY,W*0.25);
  sunG.addColorStop(0,'rgba(255,255,200,1)'); sunG.addColorStop(0.2,'rgba(255,220,50,0.9)');
  sunG.addColorStop(0.5,'rgba(255,140,0,0.4)'); sunG.addColorStop(1,'transparent');
  ctx.fillStyle=sunG; ctx.beginPath(); ctx.arc(W*0.5,sunY,W*0.25,0,Math.PI*2); ctx.fill();

  // Sun core
  ctx.fillStyle='rgba(255,255,220,0.95)';
  ctx.beginPath(); ctx.arc(W*0.5,sunY,30,0,Math.PI*2); ctx.fill();

  // Sun rays
  for (let i=0;i<20;i++) {
    const a=(i/20)*Math.PI*2+t*0.08;
    const r1=35+Math.sin(t*2+i)*5, r2=60+Math.sin(t+i)*15;
    ctx.strokeStyle=`rgba(255,220,50,${0.15+Math.sin(t+i)*0.05})`; ctx.lineWidth=3;
    ctx.beginPath(); ctx.moveTo(W*0.5+Math.cos(a)*r1,sunY+Math.sin(a)*r1); ctx.lineTo(W*0.5+Math.cos(a)*r2,sunY+Math.sin(a)*r2); ctx.stroke();
  }

  // Cloud layer below (sea of clouds)
  for (let i=0;i<30;i++) {
    const cx2=(((i*W/30+t*8*(i%3?1:-1)*0.4)%(W+160))-80);
    const cy=H*(0.68+Math.sin(i*0.7)*0.1);
    drawCloud(ctx,cx2,cy,30+Math.sin(i*1.3)*12,0.85);
  }
  // Second denser cloud layer
  for (let i=0;i<20;i++) {
    const cx2=(((i*W/20+W*0.05+t*5*(i%2?1:-1)*0.3)%(W+120))-60);
    drawCloud(ctx,cx2,H*0.82+Math.sin(i)*8,22+Math.sin(i*1.7)*8,0.95);
  }

  // Our plane - large, banking gently
  const bankAngle=Math.sin(t*0.4)*0.08;
  drawPlane(ctx,W*0.5,H*0.35,0.7,bankAngle,{body:'#fff',stripe:'#C8102E',engine:'#ccc'});

  // Contrails
  ctx.strokeStyle='rgba(255,255,255,0.6)'; ctx.lineWidth=3;
  const ct1x=W*0.5-Math.cos(bankAngle)*56-30, ct1y=H*0.35-Math.sin(bankAngle)*56;
  const ct2x=W*0.5-Math.cos(bankAngle)*56+10, ct2y=H*0.35+Math.sin(bankAngle)*56+8;
  const ctrailLen=100+Math.sin(t)*20;
  const ctg1=ctx.createLinearGradient(ct1x-ctrailLen,ct1y,ct1x,ct1y);
  ctg1.addColorStop(0,'transparent'); ctg1.addColorStop(1,'rgba(255,255,255,0.5)');
  ctx.strokeStyle=ctg1; ctx.beginPath(); ctx.moveTo(ct1x-ctrailLen,ct1y); ctx.lineTo(ct1x,ct1y); ctx.stroke();
  const ctg2=ctx.createLinearGradient(ct2x-ctrailLen,ct2y,ct2x,ct2y);
  ctg2.addColorStop(0,'transparent'); ctg2.addColorStop(1,'rgba(255,255,255,0.5)');
  ctx.strokeStyle=ctg2; ctx.beginPath(); ctx.moveTo(ct2x-ctrailLen,ct2y); ctx.lineTo(ct2x,ct2y); ctx.stroke();

  ctx.fillStyle='rgba(0,0,0,0.45)'; ctx.beginPath(); if(ctx.roundRect)ctx.roundRect(8,8,210,26,13); else ctx.rect(8,8,210,26); ctx.fill();
  ctx.fillStyle='#FFD700'; ctx.font=`bold ${W>500?12:10}px sans-serif`; ctx.textAlign='left';
  ctx.fillText('🌅 SUNRISE AT 35,000ft — Above the Clouds', 18, 26);
}

// ── SCENE 4: Dubai Airport Night Landing ──
function drawNightLanding(ctx, W, H, t) {
  // Night sky
  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#000308'); sky.addColorStop(0.5,'#00091a'); sky.addColorStop(1,'#001a33');
  ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
  // Stars
  for(let i=0;i<100;i++){
    const sx=(i*157.3)%W, sy=(i*83.7)%(H*0.55);
    const tw=0.2+0.6*Math.abs(Math.sin(t*1.5+i*0.3));
    ctx.beginPath(); ctx.arc(sx,sy,i%7===0?1.5:0.5,0,Math.PI*2);
    ctx.fillStyle=`rgba(255,255,255,${tw})`; ctx.fill();
  }

  // City glow below
  const cityGlow=ctx.createLinearGradient(0,H*0.5,0,H);
  cityGlow.addColorStop(0,'rgba(255,150,50,0.12)'); cityGlow.addColorStop(0.5,'rgba(255,120,30,0.08)'); cityGlow.addColorStop(1,'rgba(20,30,60,0.95)');
  ctx.fillStyle=cityGlow; ctx.fillRect(0,H*0.5,W,H*0.5);

  // City lights grid (from approach)
  ctx.fillStyle='#0d1a2e'; ctx.fillRect(0,H*0.55,W,H*0.45);
  for(let i=0;i<200;i++){
    const lx=(i*73+Math.sin(i*0.3)*30)%W;
    const ly=H*0.6+(i*43)%(H*0.38);
    const lc=['rgba(255,230,100','rgba(255,180,80','rgba(100,180,255','rgba(255,100,80'][i%4];
    const lp=0.4+0.5*Math.sin(t*0.5+i*0.2);
    ctx.fillStyle=`${lc},${lp})`; ctx.beginPath(); ctx.arc(lx,ly,1.5,0,Math.PI*2); ctx.fill();
  }

  // Approach path - runway lights in perspective
  const rwy_cx=W*0.5, rwy_near_y=H, rwy_far_y=H*0.6;
  // PAPI lights
  for(let i=0;i<4;i++){
    const px=W*0.3+i*W*0.05, py=H*0.58;
    ctx.fillStyle=i<2?'rgba(255,50,50,0.9)':'rgba(255,255,255,0.9)';
    ctx.beginPath(); ctx.arc(px,py,4,0,Math.PI*2); ctx.fill();
    const pg=ctx.createRadialGradient(px,py,0,px,py,12);
    pg.addColorStop(0,i<2?'rgba(255,50,50,0.3)':'rgba(255,255,255,0.3)'); pg.addColorStop(1,'transparent');
    ctx.fillStyle=pg; ctx.beginPath(); ctx.arc(px,py,12,0,Math.PI*2); ctx.fill();
  }
  // Runway edge lights in perspective
  for(let i=0;i<20;i++){
    const frac=i/20;
    const ly2=lerp(rwy_near_y,rwy_far_y,frac);
    const spread=lerp(W*0.35,W*0.08,frac);
    const pulse=0.5+0.4*Math.sin(t*4+i);
    ctx.fillStyle=`rgba(255,250,100,${pulse})`; 
    ctx.beginPath(); ctx.arc(rwy_cx-spread,ly2,lerp(3,1,frac),0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(rwy_cx+spread,ly2,lerp(3,1,frac),0,Math.PI*2); ctx.fill();
  }
  // Centerline lights
  for(let i=0;i<15;i++){
    const frac=(i+((t*0.5)%1))/15;
    const ly2=lerp(rwy_near_y,rwy_far_y,frac);
    ctx.fillStyle=`rgba(255,255,255,0.7)`;
    ctx.beginPath(); ctx.arc(rwy_cx,ly2,lerp(2,0.8,frac),0,Math.PI*2); ctx.fill();
  }

  // Plane on final approach (coming toward viewer, getting bigger)
  const planeScale=0.3+Math.sin(t*0.15)*0.05;
  const planeY=H*0.3+Math.sin(t*0.15)*10;
  // Landing lights (bright beam)
  const llg=ctx.createRadialGradient(W*0.5,planeY,0,W*0.5,planeY+60,120);
  llg.addColorStop(0,'rgba(255,255,255,0.6)'); llg.addColorStop(0.3,'rgba(200,220,255,0.2)'); llg.addColorStop(1,'transparent');
  ctx.fillStyle=llg; ctx.beginPath(); ctx.ellipse(W*0.5,planeY+80,90,120,0,0,Math.PI*2); ctx.fill();
  drawPlane(ctx,W*0.5,planeY,planeScale,0.12,{body:'#fff',stripe:'#C8102E',engine:'#ccc'});
  // Nav lights
  const navP=0.6+0.4*Math.sin(t*8);
  ctx.fillStyle=`rgba(255,50,50,${navP})`; ctx.beginPath(); ctx.arc(W*0.5+70*planeScale,planeY+10*planeScale,3,0,Math.PI*2); ctx.fill();
  ctx.fillStyle=`rgba(50,255,50,${navP})`; ctx.beginPath(); ctx.arc(W*0.5-70*planeScale,planeY+10*planeScale,3,0,Math.PI*2); ctx.fill();

  ctx.fillStyle='rgba(0,0,0,0.5)'; ctx.beginPath(); if(ctx.roundRect)ctx.roundRect(8,8,200,26,13); else ctx.rect(8,8,200,26); ctx.fill();
  ctx.fillStyle='#a8d8ea'; ctx.font=`bold ${W>500?12:10}px sans-serif`; ctx.textAlign='left';
  ctx.fillText('🛬 NIGHT LANDING AT DUBAI AIRPORT', 18, 26);
}

// ── MAIN ──
const SCENES = [drawAirportTop, drawAerialDubai, drawBusinessClass, drawSunriseAboveClouds, drawNightLanding];

function drawScene(ctx, W, H, step, t) {
  ctx.clearRect(0,0,W,H);
  SCENES[step % SCENES.length](ctx, W, H, t);
}

export default function FlightsAnimation({ step = 0 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const tRef = useRef(0);
  const fadeRef = useRef(1);
  const prevStepRef = useRef(step);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    function resize() {
      canvas.width = canvas.offsetWidth || 800;
      canvas.height = canvas.offsetHeight || 420;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    if (prevStepRef.current !== step) {
      fadeRef.current = 0;
      prevStepRef.current = step;
    }

    function loop() {
      tRef.current += 0.018;
      if (fadeRef.current < 1) fadeRef.current = Math.min(1, fadeRef.current + 0.022);
      drawScene(ctx, canvas.width, canvas.height, step, tRef.current);
      if (fadeRef.current < 1) {
        ctx.fillStyle = `rgba(0,0,0,${1 - fadeRef.current})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      rafRef.current = requestAnimationFrame(loop);
    }
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    loop();
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, [step]);

  return <canvas ref={canvasRef} style={{ width:'100%', height:'100%', display:'block' }} />;
}
