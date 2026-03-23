'use client';
import { useEffect, useRef } from 'react';

function lerp(a, b, t) { return a + (b - a) * t; }

// ── SHARED: Stars ──
function drawStars(ctx, W, H, t, count = 80) {
  for (let i = 0; i < count; i++) {
    const sx = (i * 173.3) % W, sy = (i * 97.7) % (H * 0.6);
    const tw = 0.2 + 0.8 * Math.abs(Math.sin(t * 1.2 + i * 0.4));
    ctx.beginPath(); ctx.arc(sx, sy, i % 5 === 0 ? 1.6 : 0.7, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${tw})`; ctx.fill();
  }
}

// ── SHARED: Clouds ──
function drawCloud(ctx, x, y, r, alpha = 0.9) {
  ctx.save(); ctx.globalAlpha = alpha;
  ctx.fillStyle = '#fff';
  [0, -r*0.5, r*0.55, -r*0.3, r*0.3].forEach((dx, i) => {
    ctx.beginPath(); ctx.arc(x + dx, y + (i % 2 ? r*0.18 : 0), r * [0.6,0.42,0.38,0.32,0.28][i], 0, Math.PI*2); ctx.fill();
  });
  ctx.restore();
}

// ── SCENE 0: Miracle Garden ──
function drawMiracleGarden(ctx, W, H, t) {
  // Sky
  const sky = ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#87CEEB'); sky.addColorStop(0.5,'#B0E0FF'); sky.addColorStop(1,'#90EE90');
  ctx.fillStyle = sky; ctx.fillRect(0,0,W,H);

  // Moving clouds
  [0.15,0.45,0.72].forEach((cf,i) => {
    drawCloud(ctx, (((cf*W + t*18*(i+1)*0.4) % (W+120)) - 60), H*0.18 + i*22, 28+i*8, 0.85);
  });

  // Ground / garden base
  const grd = ctx.createLinearGradient(0,H*0.6,0,H);
  grd.addColorStop(0,'#2d8a4e'); grd.addColorStop(1,'#1a5c32');
  ctx.fillStyle = grd; ctx.fillRect(0,H*0.6,W,H);

  // Flower bed rows
  const flowerCols = ['#FF1493','#FF69B4','#FF6347','#FFD700','#FF4500','#FF00FF','#FF8C00','#DC143C'];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < Math.floor(W/22); col++) {
      const fx = col*22 + (row%2)*11;
      const fy = H*0.58 + row*18;
      const sway = Math.sin(t*2 + col*0.4 + row*0.7) * 3;
      // stem
      ctx.strokeStyle = '#228B22'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(fx+5, fy+14); ctx.lineTo(fx+5+sway, fy); ctx.stroke();
      // bloom
      const col2 = flowerCols[(col+row*3) % flowerCols.length];
      ctx.fillStyle = col2;
      ctx.beginPath(); ctx.arc(fx+5+sway, fy-1, 6, 0, Math.PI*2); ctx.fill();
      ctx.fillStyle = '#FFD700';
      ctx.beginPath(); ctx.arc(fx+5+sway, fy-1, 2.5, 0, Math.PI*2); ctx.fill();
    }
  }

  // Emirates plane COVERED IN FLOWERS - flying through
  const planeX = ((t * 40) % (W + 180)) - 80;
  const planeY = H * 0.28 + Math.sin(t*0.8)*15;
  ctx.save(); ctx.translate(planeX, planeY);
  // fuselage - decorated with flower pattern
  const fg = ctx.createLinearGradient(-55,0,55,0);
  fg.addColorStop(0,'#FF1493'); fg.addColorStop(0.3,'#FFD700'); fg.addColorStop(0.6,'#FF4500'); fg.addColorStop(1,'#FF1493');
  ctx.fillStyle = fg;
  ctx.beginPath(); ctx.ellipse(0, 0, 55, 11, 0, 0, Math.PI*2); ctx.fill();
  // nose
  ctx.fillStyle = '#FF69B4';
  ctx.beginPath(); ctx.moveTo(55,0); ctx.quadraticCurveTo(74,-4,72,4); ctx.closePath(); ctx.fill();
  // wings
  ctx.fillStyle = '#FF8C00';
  ctx.beginPath(); ctx.moveTo(10,-10); ctx.lineTo(-20,-38); ctx.lineTo(-36,-10); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(10,10); ctx.lineTo(-20,38); ctx.lineTo(-36,10); ctx.closePath(); ctx.fill();
  // flower decorations on plane
  ['#FF1493','#FFD700','#FF4500'].forEach((c,i) => {
    ctx.fillStyle = c;
    ctx.beginPath(); ctx.arc(-30+i*20, -2+Math.sin(i)*3, 5, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(-30+i*20, -2+Math.sin(i)*3, 2, 0, Math.PI*2); ctx.fill();
  });
  // flower trail
  for (let i = 0; i < 12; i++) {
    ctx.fillStyle = flowerCols[i % flowerCols.length];
    ctx.globalAlpha = 0.7 - i*0.05;
    ctx.beginPath(); ctx.arc(-58-i*12, Math.sin(i*0.8)*14, 5-i*0.2, 0, Math.PI*2); ctx.fill();
  }
  ctx.globalAlpha = 1;
  ctx.restore();

  // Butterflies
  for (let i = 0; i < 6; i++) {
    const bx = (((i*120 + t*25*(i%2?1:-1)*0.5 + i*60) % (W+60)) - 30);
    const by = H*0.35 + Math.sin(t*3+i)*30 + i*20;
    const flap = Math.abs(Math.sin(t*8+i)) * 14;
    ctx.fillStyle = ['#FF69B4','#FFD700','#7B68EE','#FF6347','#00CED1','#FF1493'][i];
    ctx.globalAlpha = 0.85;
    ctx.beginPath(); ctx.ellipse(bx-flap*0.4, by, flap, 7, -0.5, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(bx+flap*0.4, by, flap, 7, 0.5, 0, Math.PI*2); ctx.fill();
    ctx.globalAlpha = 1;
  }

  // Label
  ctx.fillStyle = 'rgba(0,0,0,0.5)';
  ctx.beginPath(); if(ctx.roundRect) ctx.roundRect(8,8,200,26,13); else ctx.rect(8,8,200,26); ctx.fill();
  ctx.fillStyle = '#FFD700'; ctx.font = `bold ${W>500?12:10}px sans-serif`; ctx.textAlign = 'left';
  ctx.fillText('🌸 MIRACLE GARDEN — Emirates in Bloom', 18, 26);
}

// ── SCENE 1: Burj Khalifa Top ──
function drawBurjTop(ctx, W, H, t) {
  // Night sky
  const sky = ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#000814'); sky.addColorStop(0.5,'#001233'); sky.addColorStop(1,'#023e8a');
  ctx.fillStyle = sky; ctx.fillRect(0,0,W,H);
  drawStars(ctx,W,H,t,150);

  // Moon
  const mg = ctx.createRadialGradient(W*0.85,H*0.12,0,W*0.85,H*0.12,30);
  mg.addColorStop(0,'#fffde7'); mg.addColorStop(0.6,'rgba(255,253,231,0.4)'); mg.addColorStop(1,'transparent');
  ctx.fillStyle = mg; ctx.beginPath(); ctx.arc(W*0.85,H*0.12,30,0,Math.PI*2); ctx.fill();

  // City glow on horizon
  const cg = ctx.createLinearGradient(0,H*0.65,0,H);
  cg.addColorStop(0,'rgba(255,150,50,0.15)'); cg.addColorStop(1,'rgba(20,30,60,0.9)');
  ctx.fillStyle = cg; ctx.fillRect(0,H*0.65,W,H*0.35);

  // Burj Khalifa tower - massive, central
  const bx = W*0.5, base = H*0.95;
  // Glow behind Burj
  const bgl = ctx.createRadialGradient(bx,base*0.4,0,bx,base*0.4,W*0.35);
  bgl.addColorStop(0,'rgba(100,180,255,0.18)'); bgl.addColorStop(1,'transparent');
  ctx.fillStyle = bgl; ctx.fillRect(0,0,W,H);

  // Burj shaft sections (tapered)
  const sections = [
    [22,H*0.82],[18,H*0.68],[15,H*0.54],[12,H*0.42],[9,H*0.32],[7,H*0.22],[5,H*0.14],[3,H*0.07],[1.5,H*0.02]
  ];
  sections.forEach(([hw,y],i) => {
    const next = sections[i+1];
    const ny = next ? next[1] : 0;
    const nhw = next ? next[0] : 0.5;
    const bg = ctx.createLinearGradient(bx-hw,0,bx+hw,0);
    bg.addColorStop(0,'#1a2a4a'); bg.addColorStop(0.4,'#2a3d6e'); bg.addColorStop(0.6,'#3a5080'); bg.addColorStop(1,'#1a2a4a');
    ctx.fillStyle = bg;
    ctx.beginPath(); ctx.moveTo(bx-hw,y); ctx.lineTo(bx+hw,y); ctx.lineTo(bx+nhw,ny); ctx.lineTo(bx-nhw,ny); ctx.closePath(); ctx.fill();
    // Window lights
    if (y > H*0.3) {
      for (let w2 = -hw+3; w2 < hw-2; w2 += 6) {
        const lit = Math.sin(t*0.3 + w2*0.5 + i) > -0.3;
        if (lit) {
          ctx.fillStyle = `rgba(255,220,100,${0.4+Math.sin(t*0.5+w2)*0.15})`;
          ctx.fillRect(bx+w2-1.5, y+3, 3, 5);
        }
      }
    }
  });

  // Spire glow/blink
  const sp = 0.7 + 0.3*Math.sin(t*2.5);
  ctx.fillStyle = `rgba(255,50,50,${sp})`;
  ctx.beginPath(); ctx.arc(bx, H*0.022, 3, 0, Math.PI*2); ctx.fill();

  // Elevator - rising beam of light
  const elevY = H*0.95 - ((t*60) % (H*0.9));
  const elg = ctx.createLinearGradient(bx-3,elevY-30,bx+3,elevY+5);
  elg.addColorStop(0,'transparent'); elg.addColorStop(0.5,'rgba(150,220,255,0.9)'); elg.addColorStop(1,'transparent');
  ctx.fillStyle = elg; ctx.fillRect(bx-3,elevY-30,6,35);

  // Observation deck glow ring
  const decky = H*0.32;
  const dg = ctx.createRadialGradient(bx,decky,0,bx,decky,28);
  dg.addColorStop(0,'rgba(255,200,50,0.3)'); dg.addColorStop(1,'transparent');
  ctx.fillStyle = dg; ctx.beginPath(); ctx.arc(bx,decky,28,0,Math.PI*2); ctx.fill();
  ctx.strokeStyle = 'rgba(255,200,50,0.6)'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.ellipse(bx,decky,20,5,0,0,Math.PI*2); ctx.stroke();

  // Fountain below
  for (let i = 0; i < 18; i++) {
    const fa = (i/18)*Math.PI + Math.sin(t*3)*0.1;
    const fr = 40 + Math.sin(t*4+i)*12;
    const fh = 35 + Math.sin(t*3+i*0.4)*20;
    const fx2 = bx + Math.cos(fa)*fr, fy2 = base - 12 - fh*Math.abs(Math.sin(t*2+i*0.5));
    ctx.strokeStyle = `rgba(100,200,255,${0.5+Math.sin(t*3+i)*0.3})`; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(bx+Math.cos(fa)*8, base-12); ctx.quadraticCurveTo(fx2,fy2-15,fx2,fy2); ctx.stroke();
  }

  // Fireworks
  if (Math.sin(t*0.7) > 0.6) {
    const fwx = W*0.25+Math.sin(t)*W*0.1, fwy = H*0.2+Math.cos(t)*H*0.05;
    for (let i = 0; i < 16; i++) {
      const fa2 = (i/16)*Math.PI*2, fr2 = 30+Math.sin(t*5+i)*8;
      ctx.strokeStyle = `rgba(${255},${150+i*6},${i*10},0.8)`; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(fwx,fwy); ctx.lineTo(fwx+Math.cos(fa2)*fr2,fwy+Math.sin(fa2)*fr2); ctx.stroke();
    }
  }

  ctx.fillStyle='rgba(0,0,0,0.5)'; ctx.beginPath(); if(ctx.roundRect)ctx.roundRect(8,8,195,26,13); else ctx.rect(8,8,195,26); ctx.fill();
  ctx.fillStyle='#FFD700'; ctx.font=`bold ${W>500?12:10}px sans-serif`; ctx.textAlign='left';
  ctx.fillText('🗼 BURJ KHALIFA — 555m Above Dubai', 18, 26);
}

// ── SCENE 2: Aquaventure Waterpark ──
function drawAquaventure(ctx, W, H, t) {
  // Sky - bright tropical
  const sky = ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#0096c7'); sky.addColorStop(0.5,'#48cae4'); sky.addColorStop(1,'#90e0ef');
  ctx.fillStyle = sky; ctx.fillRect(0,0,W,H);

  // Moving clouds
  [0.1,0.4,0.7].forEach((cf,i) => drawCloud(ctx,(((cf*W+t*20*(i+1)*0.4)%(W+120))-60),H*0.1+i*18,30+i*10,0.9));

  // Palm Jumeirah silhouette (simplified aerial shape)
  ctx.fillStyle = '#f4a261';
  const px = W*0.5, py = H*0.5;
  // main trunk
  ctx.fillRect(px-8, py-H*0.15, 16, H*0.35);
  // fronds
  for (let i = 0; i < 16; i++) {
    const a = (i/16)*Math.PI*2;
    ctx.save(); ctx.translate(px, py-H*0.05); ctx.rotate(a);
    ctx.fillRect(-5, 0, 10, H*0.18); ctx.restore();
  }
  // crescent arc
  ctx.strokeStyle = '#f4a261'; ctx.lineWidth = 14;
  ctx.beginPath(); ctx.arc(px, py-H*0.05, H*0.22, Math.PI*0.15, Math.PI*0.85); ctx.stroke();

  // Water
  const wg = ctx.createLinearGradient(0,H*0.55,0,H);
  wg.addColorStop(0,'#0077b6'); wg.addColorStop(1,'#023e8a');
  ctx.fillStyle = wg; ctx.fillRect(0,H*0.55,W,H*0.45);

  // Waves
  for (let i = 0; i < 4; i++) {
    ctx.strokeStyle = `rgba(100,220,255,${0.3+i*0.1})`; ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = 0; x <= W; x += 8) {
      const wy = H*(0.57+i*0.07) + Math.sin(x*0.04+t*2+i)*6;
      i===0 && x===0 ? ctx.moveTo(x,wy) : ctx.lineTo(x,wy);
    }
    ctx.stroke();
  }

  // Waterslides - colorful tubes
  const slides = [
    {x:W*0.15,y:H*0.2,color:'#FF6B6B'},{x:W*0.3,y:H*0.15,color:'#4ECDC4'},
    {x:W*0.7,y:H*0.18,color:'#FFE66D'},{x:W*0.82,y:H*0.22,color:'#A8E6CF'},
  ];
  slides.forEach(s => {
    ctx.strokeStyle = s.color; ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.bezierCurveTo(s.x+30, s.y+H*0.12, s.x-20, s.y+H*0.25, s.x+10, H*0.55);
    ctx.stroke();
    // Slide outline
    ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.lineWidth = 3;
    ctx.stroke();
    // Splash at bottom
    for (let i = 0; i < 8; i++) {
      const sa = (i/8)*Math.PI*2 + t*4;
      const sr = 8+Math.sin(t*6+i)*4;
      ctx.fillStyle = `rgba(100,200,255,${0.6+Math.sin(t*5+i)*0.3})`;
      ctx.beginPath(); ctx.arc(s.x+10+Math.cos(sa)*sr, H*0.55+Math.sin(sa)*sr*0.4, 3, 0, Math.PI*2); ctx.fill();
    }
  });

  // Rider going down slide (animated position)
  const rp = (t*0.3) % 1;
  const rx = W*0.15 + lerp(0, 10, rp);
  const ry = H*(0.2 + rp*0.35);
  ctx.fillStyle = '#FF6B35'; ctx.beginPath(); ctx.arc(rx, ry, 7, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = '#FFD700'; ctx.beginPath(); ctx.arc(rx, ry-9, 5, 0, Math.PI*2); ctx.fill();

  ctx.fillStyle='rgba(0,0,0,0.5)'; ctx.beginPath(); if(ctx.roundRect)ctx.roundRect(8,8,205,26,13); else ctx.rect(8,8,205,26); ctx.fill();
  ctx.fillStyle='#4ECDC4'; ctx.font=`bold ${W>500?12:10}px sans-serif`; ctx.textAlign='left';
  ctx.fillText('💦 AQUAVENTURE — Palm Jumeirah Thrills', 18, 26);
}

// ── SCENE 3: Dubai Aquarium ──
function drawAquarium(ctx, W, H, t) {
  // Deep ocean background
  const sky = ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#001524'); sky.addColorStop(0.4,'#023e8a'); sky.addColorStop(1,'#0077b6');
  ctx.fillStyle = sky; ctx.fillRect(0,0,W,H);

  // Light rays from above
  for (let i = 0; i < 8; i++) {
    const lx = W*(0.1+i*0.12);
    const ray = ctx.createLinearGradient(lx,0,lx+30,H);
    ray.addColorStop(0,`rgba(100,200,255,${0.12+Math.sin(t*0.8+i)*0.06})`);
    ray.addColorStop(1,'transparent');
    ctx.fillStyle = ray;
    ctx.beginPath(); ctx.moveTo(lx,0); ctx.lineTo(lx+40,0); ctx.lineTo(lx+80,H); ctx.lineTo(lx+30,H); ctx.closePath(); ctx.fill();
  }

  // Coral reef at bottom
  const coralColors = ['#FF4500','#FF6347','#FF69B4','#FFD700','#9B59B6'];
  for (let i = 0; i < 14; i++) {
    const cx2 = W*(0.04+i*0.07);
    const ch = H*(0.12+Math.sin(i*1.7)*0.08);
    ctx.fillStyle = coralColors[i%coralColors.length];
    // branching coral
    ctx.beginPath(); ctx.moveTo(cx2,H); ctx.lineTo(cx2-8,H-ch*0.6); ctx.lineTo(cx2,H-ch); ctx.lineTo(cx2+8,H-ch*0.6); ctx.closePath(); ctx.fill();
    // side branches
    ctx.beginPath(); ctx.moveTo(cx2-4,H-ch*0.5); ctx.lineTo(cx2-14,H-ch*0.75); ctx.lineWidth=3; ctx.strokeStyle=coralColors[i%coralColors.length]; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx2+4,H-ch*0.4); ctx.lineTo(cx2+14,H-ch*0.65); ctx.stroke();
  }

  // Bubbles rising
  for (let i = 0; i < 20; i++) {
    const bx2 = (i*W/20 + Math.sin(t+i)*12) % W;
    const by2 = H - ((t*22+i*H/20) % H);
    ctx.fillStyle = `rgba(150,220,255,${0.25+Math.sin(t+i)*0.1})`;
    ctx.beginPath(); ctx.arc(bx2, by2, 3+i%3, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = `rgba(200,240,255,0.4)`; ctx.lineWidth = 0.8; ctx.stroke();
  }

  // Sand tiger SHARK - main star
  const shx = ((t*35) % (W+200)) - 80;
  const shy = H*0.35 + Math.sin(t*0.6)*H*0.08;
  ctx.save(); ctx.translate(shx, shy);
  // body
  const shg = ctx.createLinearGradient(-70,0,70,0);
  shg.addColorStop(0,'#5a7a9a'); shg.addColorStop(0.5,'#7a9aba'); shg.addColorStop(1,'#5a7a9a');
  ctx.fillStyle = shg;
  ctx.beginPath(); ctx.ellipse(0, 0, 70, 16, 0, 0, Math.PI*2); ctx.fill();
  // tail
  ctx.fillStyle = '#5a7a9a';
  ctx.beginPath(); ctx.moveTo(-70,0); ctx.lineTo(-90,-18); ctx.lineTo(-85,0); ctx.lineTo(-90,18); ctx.closePath(); ctx.fill();
  // dorsal fin
  ctx.beginPath(); ctx.moveTo(20,-15); ctx.lineTo(5,-38); ctx.lineTo(-15,-15); ctx.closePath(); ctx.fill();
  // pectoral fins
  ctx.beginPath(); ctx.moveTo(10,14); ctx.lineTo(-10,34); ctx.lineTo(-30,14); ctx.closePath(); ctx.fill();
  // eye
  ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(52,-4, 4, 0, Math.PI*2); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.beginPath(); ctx.arc(53,-5, 1.5, 0, Math.PI*2); ctx.fill();
  // belly
  ctx.fillStyle = 'rgba(220,235,240,0.5)';
  ctx.beginPath(); ctx.ellipse(10, 6, 45, 8, 0, 0, Math.PI*2); ctx.fill();
  ctx.restore();

  // Tropical fish school
  for (let i = 0; i < 12; i++) {
    const fx2 = ((i*60 + t*(15+i%3*5)) % (W+80)) - 40;
    const fy2 = H*0.3 + Math.sin(t*1.5+i*0.8)*H*0.15 + i*12;
    const fishColors = ['#FF6B35','#FFD700','#FF1493','#00CED1','#FF69B4'];
    ctx.save(); ctx.translate(fx2,fy2);
    ctx.fillStyle = fishColors[i%fishColors.length];
    ctx.beginPath(); ctx.ellipse(0,0,10,5,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-10,0); ctx.lineTo(-17,-6); ctx.lineTo(-17,6); ctx.closePath(); ctx.fill();
    ctx.fillStyle='#000'; ctx.beginPath(); ctx.arc(7,-1,1.5,0,Math.PI*2); ctx.fill();
    ctx.restore();
  }

  ctx.fillStyle='rgba(0,0,0,0.6)'; ctx.beginPath(); if(ctx.roundRect)ctx.roundRect(8,8,225,26,13); else ctx.rect(8,8,225,26); ctx.fill();
  ctx.fillStyle='#48cae4'; ctx.font=`bold ${W>500?12:10}px sans-serif`; ctx.textAlign='left';
  ctx.fillText('🦈 DUBAI AQUARIUM — 33,000 Sea Creatures', 18, 26);
}

// ── SCENE 4: Global Village ──
function drawGlobalVillage(ctx, W, H, t) {
  // Festive evening sky
  const sky = ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#0d0221'); sky.addColorStop(0.4,'#1a0533'); sky.addColorStop(1,'#2d1b4e');
  ctx.fillStyle = sky; ctx.fillRect(0,0,W,H);
  drawStars(ctx,W,H,t,100);

  // Ground
  ctx.fillStyle = '#2c1810'; ctx.fillRect(0,H*0.72,W,H*0.28);
  // Path
  const pg = ctx.createLinearGradient(W*0.35,0,W*0.65,0);
  pg.addColorStop(0,'#4a3520'); pg.addColorStop(0.5,'#6b4c2a'); pg.addColorStop(1,'#4a3520');
  ctx.fillStyle = pg; ctx.fillRect(W*0.4,H*0.55,W*0.2,H*0.45);

  // Pavilion buildings - colourful flags of nations
  const pavilions = [
    {x:0.05,col:'#CC0000',col2:'#FFD700',flag:'🇨🇳',name:'CHINA'},
    {x:0.2,col:'#003893',col2:'#FF0000',flag:'🇫🇷',name:'FRANCE'},
    {x:0.62,col:'#006233',col2:'#FF6319',flag:'🇸🇦',name:'KSA'},
    {x:0.78,col:'#003580',col2:'#FFD100',flag:'🇮🇳',name:'INDIA'},
  ];
  pavilions.forEach(p => {
    const px2 = W*p.x, pw = W*0.14, ph = H*(0.22+Math.sin(p.x*7)*0.05);
    // building
    const bg = ctx.createLinearGradient(px2,H*0.72-ph,px2+pw,H*0.72);
    bg.addColorStop(0,p.col); bg.addColorStop(1,p.col2+'88');
    ctx.fillStyle = bg; ctx.fillRect(px2,H*0.72-ph,pw,ph);
    // roof
    ctx.fillStyle = p.col2;
    ctx.beginPath(); ctx.moveTo(px2-4,H*0.72-ph); ctx.lineTo(px2+pw/2,H*0.72-ph-20); ctx.lineTo(px2+pw+4,H*0.72-ph); ctx.closePath(); ctx.fill();
    // windows lit
    for (let r=0;r<3;r++) for (let c=0;c<3;c++) {
      const lit2 = Math.sin(t*0.4+r*2+c+p.x*10)>-0.2;
      ctx.fillStyle = lit2?'rgba(255,230,100,0.8)':'rgba(0,0,0,0.3)';
      ctx.fillRect(px2+5+c*(pw-10)/3, H*0.72-ph+10+r*((ph-20)/4), (pw-10)/3-3, (ph-20)/4-4);
    }
    // flag pole + flag
    ctx.strokeStyle = '#888'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(px2+pw/2,H*0.72-ph-20); ctx.lineTo(px2+pw/2,H*0.72-ph-55); ctx.stroke();
    ctx.fillStyle = p.col;
    ctx.fillRect(px2+pw/2+1, H*0.72-ph-52, 20, 13);
    // Nation text
    ctx.fillStyle = '#fff'; ctx.font = `bold 7px sans-serif`; ctx.textAlign = 'center';
    ctx.fillText(p.name, px2+pw/2, H*0.72+10);
  });

  // String lights
  for (let i = 0; i < 30; i++) {
    const lx = W*0.05 + i*(W*0.9/30);
    const ly = H*0.5 + Math.sin(i*0.4+t*0.3)*H*0.06;
    const lc = ['#FF6B6B','#FFE66D','#4ECDC4','#A8E6CF'][i%4];
    ctx.fillStyle = lc; ctx.globalAlpha = 0.7+Math.sin(t*3+i)*0.3;
    ctx.beginPath(); ctx.arc(lx,ly,3,0,Math.PI*2); ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Fireworks
  for (let f = 0; f < 3; f++) {
    const phase = (t*0.8 + f*2.1) % 6;
    if (phase < 3) {
      const fwx = W*(0.2+f*0.3), fwy = H*(0.08+f*0.04);
      for (let i = 0; i < 20; i++) {
        const fa2 = (i/20)*Math.PI*2;
        const fr2 = (phase/3)*45;
        const fc = ['#FF6B6B','#FFE66D','#4ECDC4','#FF69B4','#A8E6CF'][i%5];
        ctx.strokeStyle = fc+'cc'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(fwx,fwy); ctx.lineTo(fwx+Math.cos(fa2)*fr2,fwy+Math.sin(fa2)*fr2); ctx.stroke();
      }
    }
  }

  ctx.fillStyle='rgba(0,0,0,0.5)'; ctx.beginPath(); if(ctx.roundRect)ctx.roundRect(8,8,200,26,13); else ctx.rect(8,8,200,26); ctx.fill();
  ctx.fillStyle='#FFE66D'; ctx.font=`bold ${W>500?12:10}px sans-serif`; ctx.textAlign='left';
  ctx.fillText('🌍 GLOBAL VILLAGE — 90 Nations in Dubai', 18, 26);
}

// ── SCENE 5: Museum of the Future ──
function drawMuseumFuture(ctx, W, H, t) {
  // Futuristic night sky
  const sky = ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#000814'); sky.addColorStop(0.6,'#001f4d'); sky.addColorStop(1,'#003380');
  ctx.fillStyle = sky; ctx.fillRect(0,0,W,H);
  drawStars(ctx,W,H,t,120);

  // Ground reflection
  const grd = ctx.createLinearGradient(0,H*0.7,0,H);
  grd.addColorStop(0,'#001a40'); grd.addColorStop(1,'#000814');
  ctx.fillStyle = grd; ctx.fillRect(0,H*0.7,W,H*0.3);

  // The Museum - iconic torus/ring shape
  const mx = W*0.5, my = H*0.42;
  const rx = W*0.22, ry = H*0.22;

  // Glow behind
  const mgl = ctx.createRadialGradient(mx,my,0,mx,my,rx*1.3);
  mgl.addColorStop(0,'rgba(0,200,255,0.15)'); mgl.addColorStop(0.5,'rgba(0,150,255,0.06)'); mgl.addColorStop(1,'transparent');
  ctx.fillStyle = mgl; ctx.fillRect(0,0,W,H);

  // Outer ring
  ctx.strokeStyle = 'rgba(0,200,255,0.8)'; ctx.lineWidth = W*0.055;
  ctx.beginPath(); ctx.ellipse(mx,my,rx,ry,0,0,Math.PI*2); ctx.stroke();

  // Inner glow ring
  ctx.strokeStyle = 'rgba(100,220,255,0.4)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.ellipse(mx,my,rx-W*0.022,ry-H*0.022,0,0,Math.PI*2); ctx.stroke();
  ctx.strokeStyle = 'rgba(0,100,255,0.3)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.ellipse(mx,my,rx+W*0.022,ry+H*0.022,0,0,Math.PI*2); ctx.stroke();

  // Arabic calligraphy text on ring (simulated)
  ctx.save(); ctx.translate(mx,my);
  for (let i = 0; i < 24; i++) {
    const a = (i/24)*Math.PI*2 + t*0.05;
    const tx2 = Math.cos(a)*rx, ty2 = Math.sin(a)*ry;
    ctx.fillStyle = `rgba(0,200,255,${0.3+Math.sin(t+i)*0.2})`;
    ctx.font = `bold ${W>500?10:7}px serif`;
    ctx.textAlign = 'center';
    ctx.save(); ctx.translate(tx2,ty2); ctx.rotate(a+Math.PI/2); ctx.fillText('—', 0, 0); ctx.restore();
  }
  ctx.restore();

  // Inside of ring - futuristic scene
  ctx.save(); ctx.beginPath(); ctx.ellipse(mx,my,rx-W*0.02,ry-H*0.02,0,0,Math.PI*2); ctx.clip();
  const inner = ctx.createRadialGradient(mx,my,0,mx,my,rx);
  inner.addColorStop(0,'rgba(0,30,80,0.9)'); inner.addColorStop(1,'rgba(0,10,40,0.95)');
  ctx.fillStyle = inner; ctx.fillRect(0,0,W,H);
  // Grid lines inside
  ctx.strokeStyle = 'rgba(0,100,200,0.25)'; ctx.lineWidth = 0.8;
  for (let i = -5; i <= 5; i++) {
    ctx.beginPath(); ctx.moveTo(mx+i*20,my-ry); ctx.lineTo(mx+i*20,my+ry); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(mx-rx,my+i*20); ctx.lineTo(mx+rx,my+i*20); ctx.stroke();
  }
  // Floating orbs inside
  for (let i = 0; i < 8; i++) {
    const oa = t*0.4 + i*(Math.PI*2/8);
    const or2 = rx*0.45, orx = mx+Math.cos(oa)*or2, ory = my+Math.sin(oa)*or2*0.5;
    const og = ctx.createRadialGradient(orx,ory,0,orx,ory,10);
    og.addColorStop(0,'rgba(0,200,255,0.9)'); og.addColorStop(1,'transparent');
    ctx.fillStyle = og; ctx.beginPath(); ctx.arc(orx,ory,10,0,Math.PI*2); ctx.fill();
  }
  ctx.restore();

  // Base/plinth
  const bg2 = ctx.createLinearGradient(mx-rx*0.4,H*0.7,mx+rx*0.4,H*0.7);
  bg2.addColorStop(0,'#0d1b2a'); bg2.addColorStop(0.5,'#162d44'); bg2.addColorStop(1,'#0d1b2a');
  ctx.fillStyle = bg2; ctx.fillRect(mx-rx*0.4,H*0.68,rx*0.8,H*0.04);

  // Reflection in ground
  ctx.save(); ctx.translate(mx,H*0.7); ctx.scale(1,-0.25);
  ctx.globalAlpha = 0.2; ctx.strokeStyle = 'rgba(0,200,255,0.8)'; ctx.lineWidth = W*0.055;
  ctx.beginPath(); ctx.ellipse(0,0,rx,ry,0,0,Math.PI*2); ctx.stroke();
  ctx.restore(); ctx.globalAlpha = 1;

  // Pulse ring
  const pr = rx*(0.9 + 0.15*Math.sin(t*1.5));
  ctx.strokeStyle = `rgba(0,200,255,${0.1+0.1*Math.sin(t*1.5)})`; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.ellipse(mx,my,pr,pr*ry/rx,0,0,Math.PI*2); ctx.stroke();

  ctx.fillStyle='rgba(0,0,0,0.5)'; ctx.beginPath(); if(ctx.roundRect)ctx.roundRect(8,8,220,26,13); else ctx.rect(8,8,220,26); ctx.fill();
  ctx.fillStyle='#00d4ff'; ctx.font=`bold ${W>500?12:10}px sans-serif`; ctx.textAlign='left';
  ctx.fillText("🔮 MUSEUM OF THE FUTURE — Year 2071", 18, 26);
}

// ── MAIN DRAW ──
const SCENES = [drawMiracleGarden, drawBurjTop, drawAquaventure, drawAquarium, drawGlobalVillage, drawMuseumFuture];

function drawScene(ctx, W, H, step, t) {
  ctx.clearRect(0,0,W,H);
  SCENES[step % SCENES.length](ctx, W, H, t);
}

export default function AttractionsAnimation({ step = 0 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const tRef = useRef(0);
  const fadeRef = useRef(1);       // 0→1 opacity when scene changes
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

    // Trigger fade-in when step changes
    if (prevStepRef.current !== step) {
      fadeRef.current = 0;
      prevStepRef.current = step;
    }

    function loop() {
      tRef.current += 0.018;
      // Fade in over ~50 frames (~0.8s)
      if (fadeRef.current < 1) fadeRef.current = Math.min(1, fadeRef.current + 0.022);
      drawScene(ctx, canvas.width, canvas.height, step, tRef.current);
      // Overlay fade veil on top
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
