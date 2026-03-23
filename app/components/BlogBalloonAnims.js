'use client';
import { useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════
// HOT AIR BALLOON BLOGS 08–14 — 9 unique animations
// All IDs globally unique — never reused anywhere on site
//
// balloon-launch    — inflation sequence, burner fire, liftoff
// sunrise-clouds    — view from basket above clouds, sun rising
// weather-radar     — met radar, wind vectors, go/no-go system
// wind-speed        — anemometer, weather station readout
// pre-dawn-dark     — 4am starfield, crew headlamps, coffee steam
// golden-horizon    — balloon silhouette vs sunrise gradient sky
// romance-balloon   — proposal ring box, champagne, heart particles
// sky-valentine     — balloon writing hearts in sky
// safety-gauge      — weight/height meter, health checklist
// camera-lens       — camera viewfinder, shot composition overlays
// ═══════════════════════════════════════════════════════════════

function useCanvas(fn) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext('2d');
    let raf, t = 0;
    const rsz = () => { cv.width = cv.offsetWidth || 760; cv.height = cv.offsetHeight || 220; };
    rsz(); const ro = new ResizeObserver(rsz); ro.observe(cv);
    const loop = () => { t += 0.014; fn(ctx, cv.width, cv.height, t); raf = requestAnimationFrame(loop); };
    loop();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return ref;
}

// ── 1. BALLOON LAUNCH — inflation + burner + liftoff ─────────
export function BlogAnim_BalloonLaunch() {
  const fireRef = useRef(Array.from({length:40},()=>({x:0,y:0,vx:0,vy:0,a:0,s:3,life:0,active:false})));
  const ref = useCanvas((ctx, W, H, t) => {
    const fire = fireRef.current;
    // Pre-dawn sky
    const sky = ctx.createLinearGradient(0,0,0,H);
    sky.addColorStop(0,'#000008'); sky.addColorStop(0.5,'#040210'); sky.addColorStop(0.8,'#180A00'); sky.addColorStop(1,'#3A1400');
    ctx.fillStyle = sky; ctx.fillRect(0,0,W,H);
    // Stars
    for(let i=0;i<100;i++){
      const a = 0.08+Math.sin(t*1.1+i)*0.06;
      ctx.fillStyle=`rgba(255,255,255,${a})`; ctx.beginPath();
      ctx.arc((i*173)%W,(i*97)%(H*0.65),0.6+(i%4)*0.3,0,Math.PI*2); ctx.fill();
    }
    // Ground
    const gnd = ctx.createLinearGradient(0,H*0.78,0,H);
    gnd.addColorStop(0,'#1A0800'); gnd.addColorStop(1,'#080400');
    ctx.fillStyle=gnd; ctx.fillRect(0,H*0.78,W,H);
    // Inflation stage — balloon grows over time
    const inflateProgress = Math.min(1,(t*0.05));
    const bx = W*0.5, by = H*(0.38 - inflateProgress*0.2);
    const bw = W*(0.12 + inflateProgress*0.16);
    const bh = H*(0.08 + inflateProgress*0.28);
    // Balloon body — vibrant multi-panel
    const panels = 8;
    const COLORS = ['#E53E3E','#F59E0B','#3182CE','#38A169','#E53E3E','#F59E0B','#3182CE','#38A169'];
    ctx.save(); ctx.beginPath(); ctx.ellipse(bx, by, bw, bh, 0, 0, Math.PI*2); ctx.clip();
    COLORS.forEach((c,i) => {
      const a1 = (i/panels)*Math.PI*2 - Math.PI/2;
      const a2 = ((i+1)/panels)*Math.PI*2 - Math.PI/2;
      ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(bx,by); ctx.arc(bx,by,Math.max(bw,bh),a1,a2); ctx.closePath(); ctx.fill();
    });
    ctx.restore();
    // Balloon highlight
    const hl = ctx.createRadialGradient(bx-bw*0.3, by-bh*0.3, 0, bx, by, bw*1.2);
    hl.addColorStop(0,'rgba(255,255,255,0.25)'); hl.addColorStop(1,'transparent');
    ctx.fillStyle=hl; ctx.beginPath(); ctx.ellipse(bx,by,bw,bh,0,0,Math.PI*2); ctx.fill();
    // Outline
    ctx.strokeStyle='rgba(0,0,0,0.4)'; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.ellipse(bx,by,bw,bh,0,0,Math.PI*2); ctx.stroke();
    // Ropes from balloon to basket
    const ropeY1 = by+bh, basketW = bw*0.55, basketH = H*0.07;
    const basketY = ropeY1 + H*(0.04+inflateProgress*0.04);
    ctx.strokeStyle='rgba(180,140,60,0.7)'; ctx.lineWidth=1.2;
    [[-basketW*0.5,basketY],[-basketW*0.3,basketY],[basketW*0.3,basketY],[basketW*0.5,basketY]].forEach(([ox,ty]) => {
      ctx.beginPath(); ctx.moveTo(bx+ox*0.2,ropeY1); ctx.lineTo(bx+ox,ty); ctx.stroke();
    });
    // Basket
    const bkg = ctx.createLinearGradient(bx-basketW/2,basketY,bx+basketW/2,basketY+basketH);
    bkg.addColorStop(0,'#8B6020'); bkg.addColorStop(1,'#5A3C10');
    ctx.fillStyle=bkg;
    ctx.beginPath(); if(ctx.roundRect) ctx.roundRect(bx-basketW/2,basketY,basketW,basketH,4); else ctx.rect(bx-basketW/2,basketY,basketW,basketH);
    ctx.fill();
    ctx.strokeStyle='rgba(200,150,50,0.5)'; ctx.lineWidth=1;
    ctx.beginPath(); if(ctx.roundRect) ctx.roundRect(bx-basketW/2,basketY,basketW,basketH,4); else ctx.rect(bx-basketW/2,basketY,basketW,basketH);
    ctx.stroke();
    // Wicker pattern
    const ww = basketW/5;
    for(let i=1;i<5;i++){ ctx.strokeStyle='rgba(100,60,10,0.35)'; ctx.lineWidth=0.8; ctx.beginPath(); ctx.moveTo(bx-basketW/2+i*ww,basketY); ctx.lineTo(bx-basketW/2+i*ww,basketY+basketH); ctx.stroke(); }
    // Burner flame
    const flameX = bx, flameY = basketY;
    for(let i=0;i<5;i++){ const p=fire.find(p=>!p.active); if(!p) break; p.x=flameX+(Math.random()-0.5)*6; p.y=flameY; p.vx=(Math.random()-0.5)*0.5; p.vy=-(2+Math.random()*3); p.a=0.9; p.s=2+Math.random()*4; p.life=1; p.active=true; }
    fire.forEach(p=>{ if(!p.active) return; p.x+=p.vx; p.y+=p.vy; p.vy+=0.06; p.life-=0.03; if(p.life<=0){p.active=false;return;}
      const r=220+Math.floor(Math.random()*35), g=80+Math.floor(p.life*120);
      ctx.fillStyle=`rgba(${r},${g},10,${p.life*p.a})`; ctx.beginPath(); ctx.arc(p.x,p.y,p.s*p.life,0,Math.PI*2); ctx.fill();
    });
    // Liftoff effect — ground crew silhouettes
    if(inflateProgress>0.7){
      [[bx-W*0.18,H*0.8],[bx+W*0.18,H*0.8],[bx-W*0.08,H*0.78]].forEach(([sx,sy]) => {
        ctx.fillStyle='rgba(10,5,0,0.85)';
        ctx.beginPath(); ctx.arc(sx,sy-22,8,0,Math.PI*2); ctx.fill();
        ctx.fillRect(sx-6,sy-14,12,20);
        // Arms raised
        ctx.strokeStyle='rgba(10,5,0,0.85)'; ctx.lineWidth=4; ctx.lineCap='round';
        ctx.beginPath(); ctx.moveTo(sx-6,sy-8); ctx.lineTo(sx-18,sy-22+Math.sin(t*2)*6); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(sx+6,sy-8); ctx.lineTo(sx+18,sy-22+Math.cos(t*2)*6); ctx.stroke();
      });
    }
    // Altitude label
    const alt = Math.round(inflateProgress*1000);
    ctx.fillStyle='rgba(255,200,50,0.1)'; ctx.strokeStyle='rgba(255,200,50,0.3)'; ctx.lineWidth=1;
    if(ctx.roundRect){ctx.beginPath();ctx.roundRect(W-120,H*0.1,108,24,12);ctx.fill();ctx.stroke();}
    ctx.font=`700 11px Outfit,sans-serif`; ctx.fillStyle='rgba(255,200,50,0.85)'; ctx.textAlign='center';
    ctx.fillText(`↑ ${alt}m altitude`,W-66,H*0.11+12);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Hot air balloon inflating and lifting off in pre-dawn Dubai desert sky" />;
}

// ── 2. SUNRISE ABOVE CLOUDS — view from basket ────────────────
export function BlogAnim_SunriseAboveClouds() {
  const starsRef = useRef(Array.from({length:80},()=>({x:Math.random(),y:Math.random()*0.45,s:0.4+Math.random()*1.4,a:0.05+Math.random()*0.5,ph:Math.random()*Math.PI*2})));
  const ref = useCanvas((ctx, W, H, t) => {
    const stars = starsRef.current;
    // Sky from top — deep space to horizon glow
    const sky = ctx.createLinearGradient(0,0,0,H*0.62);
    sky.addColorStop(0,'#000005'); sky.addColorStop(0.3,'#020110'); sky.addColorStop(0.6,'#0A0520'); sky.addColorStop(0.85,'#280D00'); sky.addColorStop(1,'#C04800');
    ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
    // Fading stars
    stars.forEach(s=>{
      const fadeOut = Math.max(0, 0.3 - (t*0.008));
      ctx.fillStyle=`rgba(255,255,255,${s.a*fadeOut*(0.5+0.5*Math.sin(t+s.ph))})`;
      ctx.beginPath(); ctx.arc(s.x*W,s.y*H,s.s,0,Math.PI*2); ctx.fill();
    });
    // Sun emerging from horizon
    const sunProgress = Math.min(1,(t*0.04));
    const sunY = H*(0.62 - sunProgress*0.18);
    const sunR = W*0.055*(0.5+sunProgress*0.5);
    // Horizon glow
    const hg = ctx.createRadialGradient(W*0.5,H*0.62,0,W*0.5,H*0.62,W*0.5);
    hg.addColorStop(0,`rgba(255,150,30,${0.5+sunProgress*0.3})`); hg.addColorStop(0.3,'rgba(200,60,0,0.3)'); hg.addColorStop(1,'transparent');
    ctx.fillStyle=hg; ctx.fillRect(0,0,W,H);
    // Sun disc
    const sunG = ctx.createRadialGradient(W*0.5,sunY,0,W*0.5,sunY,sunR*2.5);
    sunG.addColorStop(0,'rgba(255,240,100,0.95)'); sunG.addColorStop(0.4,'rgba(255,160,30,0.6)'); sunG.addColorStop(1,'transparent');
    ctx.fillStyle=sunG; ctx.fillRect(0,0,W,H);
    ctx.fillStyle='rgba(255,230,80,0.92)'; ctx.beginPath(); ctx.arc(W*0.5,sunY,sunR*(1+Math.sin(t*2)*0.03),0,Math.PI*2); ctx.fill();
    // Cloud layer below — viewed from above
    const cloudY = H*0.62;
    // Fluffy cloud tops
    ctx.fillStyle='rgba(255,255,255,0.06)'; ctx.fillRect(0,cloudY,W,H-cloudY);
    for(let i=0;i<12;i++){
      const cx2 = ((i*137+t*15)%W); const cy2 = cloudY + (i%3)*H*0.04;
      const cr = W*(0.06+Math.sin(i*2.1)*0.04);
      const cloudG = ctx.createRadialGradient(cx2,cy2,0,cx2,cy2,cr);
      cloudG.addColorStop(0,'rgba(255,240,220,0.5)'); cloudG.addColorStop(0.5,'rgba(255,230,200,0.2)'); cloudG.addColorStop(1,'transparent');
      ctx.fillStyle=cloudG; ctx.beginPath(); ctx.arc(cx2,cy2,cr,0,Math.PI*2); ctx.fill();
    }
    // Solid cloud floor
    const cf = ctx.createLinearGradient(0,cloudY,0,H);
    cf.addColorStop(0,'rgba(255,220,180,0.35)'); cf.addColorStop(0.3,'rgba(200,160,120,0.25)'); cf.addColorStop(1,'rgba(100,60,30,0.4)');
    ctx.fillStyle=cf; ctx.fillRect(0,cloudY,W,H-cloudY);
    // Balloon basket silhouette at bottom
    const basketW = W*0.18;
    ctx.fillStyle='rgba(60,30,5,0.9)';
    ctx.beginPath(); if(ctx.roundRect) ctx.roundRect(W*0.5-basketW/2,H*0.83,basketW,H*0.12,6); else ctx.rect(W*0.5-basketW/2,H*0.83,basketW,H*0.12);
    ctx.fill();
    ctx.strokeStyle='rgba(160,110,40,0.6)'; ctx.lineWidth=1.5;
    ctx.beginPath(); if(ctx.roundRect) ctx.roundRect(W*0.5-basketW/2,H*0.83,basketW,H*0.12,6); else ctx.rect(W*0.5-basketW/2,H*0.83,basketW,H*0.12);
    ctx.stroke();
    // Wicker
    for(let i=1;i<4;i++){ ctx.strokeStyle='rgba(100,60,10,0.4)'; ctx.lineWidth=0.8; ctx.beginPath(); ctx.moveTo(W*0.5-basketW/2+i*basketW/4,H*0.83); ctx.lineTo(W*0.5-basketW/2+i*basketW/4,H*0.95); ctx.stroke(); }
    // Silhouette heads in basket
    [[W*0.42,H*0.82],[W*0.5,H*0.81],[W*0.58,H*0.82]].forEach(([px,py]) => {
      ctx.fillStyle='rgba(10,5,0,0.85)'; ctx.beginPath(); ctx.arc(px,py,W*0.015,0,Math.PI*2); ctx.fill();
    });
    // Altitude label
    ctx.font=`700 ${W>500?13:11}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,230,100,0.8)'; ctx.textAlign='center';
    ctx.fillText(`1,000m · Above the clouds · ${new Date().getHours()<7?'5:47':'6:12'} AM`,W*0.5,H*0.08);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="View from hot air balloon basket above the clouds at sunrise over Dubai desert" />;
}

// ── 3. WEATHER RADAR — go/no-go flight decision system ───────
export function BlogAnim_WeatherRadar() {
  const ref = useCanvas((ctx, W, H, t) => {
    ctx.fillStyle='#020508'; ctx.fillRect(0,0,W,H);
    const cx2=W*0.38, cy2=H*0.5, maxR=Math.min(W*0.3,H*0.42);
    // Radar background rings
    for(let r=1;r<=4;r++){
      ctx.strokeStyle=`rgba(0,200,100,${0.06+r*0.03})`; ctx.lineWidth=0.8;
      ctx.beginPath(); ctx.arc(cx2,cy2,maxR*r/4,0,Math.PI*2); ctx.stroke();
    }
    // Grid lines
    for(let a=0;a<8;a++){
      const ang = a/8*Math.PI*2;
      ctx.strokeStyle='rgba(0,200,100,0.06)'; ctx.lineWidth=0.6;
      ctx.beginPath(); ctx.moveTo(cx2,cy2); ctx.lineTo(cx2+Math.cos(ang)*maxR,cy2+Math.sin(ang)*maxR); ctx.stroke();
    }
    // Sweep line
    const sweepAngle = t*1.5;
    const sweepG = ctx.createConicalGradient ? null : null;
    ctx.save();
    ctx.translate(cx2,cy2);
    for(let i=0;i<30;i++){
      const a = sweepAngle - i*0.05;
      ctx.strokeStyle=`rgba(0,220,80,${(1-i/30)*0.4})`; ctx.lineWidth=2;
      ctx.beginPath(); ctx.moveTo(0,0); ctx.lineTo(Math.cos(a)*maxR,Math.sin(a)*maxR); ctx.stroke();
    }
    ctx.restore();
    // Good-weather cluster (green dots)
    [[0.2,0.3],[0.4,0.45],[0.35,0.6],[0.15,0.5],[0.45,0.35]].forEach(([fx,fy]) => {
      const dx=(fx-0.5)*maxR*2, dy=(fy-0.5)*maxR*2;
      ctx.fillStyle=`rgba(0,220,80,${0.15+Math.sin(t*2+fx*10)*0.08})`;
      ctx.beginPath(); ctx.arc(cx2+dx,cy2+dy,4+Math.random()*3,0,Math.PI*2); ctx.fill();
    });
    // Bad-weather cluster (red blobs — off to one side)
    [[0.75,0.25],[0.8,0.4],[0.72,0.35]].forEach(([fx,fy]) => {
      const dx=(fx-0.5)*maxR*2, dy=(fy-0.5)*maxR*2;
      const pr = 8+Math.sin(t*1.5+fy*8)*4;
      ctx.fillStyle=`rgba(220,40,30,${0.25+Math.sin(t*2)*0.1})`;
      ctx.beginPath(); ctx.arc(cx2+dx,cy2+dy,pr,0,Math.PI*2); ctx.fill();
    });
    // Dubai center dot
    const dubG = ctx.createRadialGradient(cx2,cy2,0,cx2,cy2,8);
    dubG.addColorStop(0,'rgba(0,220,80,0.9)'); dubG.addColorStop(1,'transparent');
    ctx.fillStyle=dubG; ctx.beginPath(); ctx.arc(cx2,cy2,8,0,Math.PI*2); ctx.fill();
    ctx.font=`600 9px Outfit,sans-serif`; ctx.fillStyle='rgba(0,220,80,0.7)'; ctx.textAlign='center';
    ctx.fillText('DUBAI',cx2,cy2+18);
    // Wind speed gauge (right side)
    const gx=W*0.73, gy=H*0.38, gr=Math.min(W*0.12,H*0.2);
    ctx.strokeStyle='rgba(255,255,255,0.12)'; ctx.lineWidth=5;
    ctx.beginPath(); ctx.arc(gx,gy,gr,Math.PI,Math.PI*2); ctx.stroke();
    const windKmh = 12 + Math.sin(t*0.3)*8; // oscillates 4-20 km/h
    const windNorm = Math.min(1,windKmh/30);
    const windColor = windKmh<18?'rgba(0,220,80,0.9)':'rgba(245,158,11,0.9)';
    ctx.strokeStyle=windColor; ctx.lineWidth=5;
    ctx.beginPath(); ctx.arc(gx,gy,gr,Math.PI,Math.PI*(1+windNorm)); ctx.stroke();
    ctx.font=`700 ${W>500?13:11}px Outfit,sans-serif`; ctx.fillStyle=windColor; ctx.textAlign='center';
    ctx.fillText(Math.round(windKmh),gx,gy+4);
    ctx.font=`500 9px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,0.4)'; ctx.fillText('km/h',gx,gy+16);
    // Go/No-Go badge
    const isGo = windKmh < 20;
    ctx.fillStyle=isGo?'rgba(0,200,80,0.15)':'rgba(220,40,30,0.15)';
    ctx.strokeStyle=isGo?'rgba(0,200,80,0.5)':'rgba(220,40,30,0.5)'; ctx.lineWidth=1.5;
    const bw=90,bh=26,bx2=gx-bw/2,by2=gy+gr*0.3;
    if(ctx.roundRect){ctx.beginPath();ctx.roundRect(bx2,by2,bw,bh,13);ctx.fill();ctx.stroke();}
    ctx.font=`800 ${W>500?12:10}px Outfit,sans-serif`; ctx.fillStyle=isGo?'rgba(0,220,80,0.95)':'rgba(220,40,30,0.95)';
    ctx.fillText(isGo?'✅ GO FLIGHT':'❌ NO FLIGHT',gx,by2+17);
    // Parameters checklist
    const checks = [
      {label:'Wind',val:Math.round(windKmh)+'km/h',ok:windKmh<25},
      {label:'Visibility',val:'22km',ok:true},
      {label:'Cloud base',val:'800m',ok:true},
      {label:'Rain',val:'0%',ok:true},
    ];
    let cy3=H*0.62;
    ctx.font=`700 ${W>500?10:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,0.5)'; ctx.textAlign='left';
    ctx.fillText('FLIGHT CONDITIONS',W*0.6,cy3-8); cy3+=4;
    checks.forEach(c=>{
      ctx.fillStyle=c.ok?'rgba(0,220,80,0.25)':'rgba(220,40,30,0.25)';
      ctx.strokeStyle=c.ok?'rgba(0,220,80,0.4)':'rgba(220,40,30,0.4)'; ctx.lineWidth=0.8;
      if(ctx.roundRect){ctx.beginPath();ctx.roundRect(W*0.6,cy3,W*0.36,18,9);ctx.fill();ctx.stroke();}
      ctx.font=`500 ${W>500?10:9}px Outfit,sans-serif`;
      ctx.fillStyle='rgba(255,255,255,0.65)'; ctx.fillText(`${c.ok?'✓':'✗'} ${c.label}: ${c.val}`,W*0.6+8,cy3+13);
      cy3+=22;
    });
    ctx.font=`700 ${W>500?11:10}px Outfit,sans-serif`; ctx.fillStyle='rgba(0,200,100,0.6)'; ctx.textAlign='center';
    ctx.fillText('MET OFFICE WEATHER MONITORING — REAL-TIME',W*0.5,H*0.06);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Meteorological radar showing Dubai balloon flight weather assessment system" />;
}

// ── 4. PRE-DAWN 4AM — crew prep, stars, coffee steam ─────────
export function BlogAnim_PreDawn4AM() {
  const starsRef = useRef(Array.from({length:260},()=>({x:Math.random(),y:Math.random()*0.8,s:0.3+Math.random()*1.8,a:0.1+Math.random()*0.7,ph:Math.random()*Math.PI*2})));
  const smokeRef = useRef(Array.from({length:12},()=>({x:0,y:0,vx:0,vy:0,a:0,s:4,life:0,active:false})));
  const ref = useCanvas((ctx, W, H, t) => {
    const stars=starsRef.current; const smoke=smokeRef.current;
    // Deepest pre-dawn black
    ctx.fillStyle='#000001'; ctx.fillRect(0,0,W,H);
    // Milky Way
    ctx.save(); ctx.translate(W*0.5,H*0.35); ctx.rotate(-0.28);
    const mw=ctx.createLinearGradient(-W*0.7,-30,W*0.7,30);
    mw.addColorStop(0,'transparent'); mw.addColorStop(0.3,'rgba(180,160,230,0.05)');
    mw.addColorStop(0.5,'rgba(200,180,255,0.1)'); mw.addColorStop(0.7,'rgba(180,160,230,0.05)'); mw.addColorStop(1,'transparent');
    ctx.fillStyle=mw; ctx.fillRect(-W*0.7,-38,W*1.4,76); ctx.restore();
    // Stars
    stars.forEach(s=>{const a=s.a*(0.4+0.6*Math.sin(t*1.3+s.ph));ctx.fillStyle=`rgba(255,255,255,${a})`;ctx.beginPath();ctx.arc(s.x*W,s.y*H,s.s,0,Math.PI*2);ctx.fill();});
    // Moon
    const moonG=ctx.createRadialGradient(W*0.14,H*0.12,0,W*0.14,H*0.12,22);
    moonG.addColorStop(0,'rgba(255,248,220,0.9)'); moonG.addColorStop(1,'transparent');
    ctx.fillStyle=moonG; ctx.beginPath(); ctx.arc(W*0.14,H*0.12,22,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='rgba(0,0,1,0.95)'; ctx.beginPath(); ctx.arc(W*0.14+8,H*0.12-4,18,0,Math.PI*2); ctx.fill();
    // Ground — dark desert
    ctx.fillStyle='#070402'; ctx.fillRect(0,H*0.78,W,H);
    // Balloon laid on ground
    const bx=W*0.38, by=H*0.72;
    ctx.fillStyle='rgba(180,40,40,0.35)'; ctx.beginPath(); ctx.ellipse(bx,by,W*0.2,H*0.1,0,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle='rgba(200,60,60,0.25)'; ctx.lineWidth=1; ctx.beginPath(); ctx.ellipse(bx,by,W*0.2,H*0.1,0,0,Math.PI*2); ctx.stroke();
    ctx.font=`500 9px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,0.2)'; ctx.textAlign='center'; ctx.fillText('BALLOON BEING INFLATED',bx,by+4);
    // Crew headlamp beams
    [[W*0.28,H*0.8],[W*0.48,H*0.79],[W*0.62,H*0.81]].forEach(([px,py],i)=>{
      // Headlamp glow
      const lg=ctx.createRadialGradient(px,py-12,0,px,py-12,40);
      lg.addColorStop(0,'rgba(255,240,180,0.35)'); lg.addColorStop(1,'transparent');
      ctx.fillStyle=lg; ctx.fillRect(px-40,py-52,80,50);
      // Person silhouette
      ctx.fillStyle='rgba(8,4,0,0.92)';
      ctx.beginPath(); ctx.arc(px,py-26,7,0,Math.PI*2); ctx.fill();
      ctx.fillRect(px-5,py-19,10,20);
      // Headlamp
      ctx.fillStyle='rgba(255,240,180,0.7)'; ctx.beginPath(); ctx.arc(px,py-26,3,0,Math.PI*2); ctx.fill();
    });
    // Coffee cup with steam
    const cofX=W*0.75, cofY=H*0.82;
    ctx.fillStyle='rgba(80,40,10,0.8)'; ctx.beginPath(); if(ctx.roundRect) ctx.roundRect(cofX-12,cofY-18,24,22,3); else ctx.rect(cofX-12,cofY-18,24,22); ctx.fill();
    ctx.fillStyle='rgba(40,20,5,0.6)'; ctx.fillRect(cofX-10,cofY-16,20,8);
    ctx.strokeStyle='rgba(120,70,20,0.7)'; ctx.lineWidth=3; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(cofX+12,cofY-12); ctx.lineTo(cofX+18,cofY-8); ctx.stroke();
    // Spawn steam
    const sp=smoke.find(p=>!p.active); if(sp){sp.x=cofX+(Math.random()-0.5)*4;sp.y=cofY-18;sp.vx=(Math.random()-0.5)*0.3;sp.vy=-(0.4+Math.random()*0.4);sp.a=0.45;sp.s=3+Math.random()*3;sp.life=1;sp.active=true;}
    smoke.forEach(p=>{if(!p.active)return;p.x+=p.vx;p.y+=p.vy;p.life-=0.025;if(p.life<=0){p.active=false;return;}ctx.strokeStyle=`rgba(200,200,200,${p.life*p.a*0.3})`;ctx.lineWidth=p.s*p.life;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x+p.vx*3,p.y-3);ctx.stroke();});
    // Time display
    const timeAlpha=0.7+Math.sin(t*2)*0.1;
    ctx.fillStyle=`rgba(255,255,255,${timeAlpha*0.08})`; ctx.strokeStyle=`rgba(255,255,255,${timeAlpha*0.2})`; ctx.lineWidth=1;
    if(ctx.roundRect){ctx.beginPath();ctx.roundRect(W*0.62,H*0.06,96,32,10);ctx.fill();ctx.stroke();}
    ctx.font=`700 ${W>500?18:15}px Outfit,sans-serif`; ctx.fillStyle=`rgba(255,255,255,${timeAlpha*0.9})`; ctx.textAlign='center';
    ctx.fillText('4:00 AM',W*0.662+48,H*0.07+21);
    ctx.font=`400 9px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,0.3)'; ctx.fillText('LAUNCH PREP',W*0.662+48,H*0.07+30);
    ctx.font=`600 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,0.28)'; ctx.textAlign='center';
    ctx.fillText('Pre-dawn crew preparation · Desert Conservation Reserve',W*0.5,H*0.95);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="4 AM pre-dawn scene showing hot air balloon crew preparing in the dark with stars and Milky Way overhead" />;
}

// ── 5. GOLDEN HORIZON — balloon silhouette at sunrise ────────
export function BlogAnim_GoldenHorizon() {
  const ref = useCanvas((ctx, W, H, t) => {
    // Sunrise sky
    const sky=ctx.createLinearGradient(0,0,0,H);
    sky.addColorStop(0,'#020108'); sky.addColorStop(0.2,'#060318'); sky.addColorStop(0.5,'#200C00'); sky.addColorStop(0.72,'#A03800'); sky.addColorStop(0.85,'#D06010'); sky.addColorStop(1,'#F09030');
    ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
    // Sun
    const sunY=H*(0.68-Math.sin(t*0.12)*0.04);
    const sg=ctx.createRadialGradient(W*0.5,sunY,0,W*0.5,sunY,W*0.18);
    sg.addColorStop(0,'rgba(255,240,100,0.95)'); sg.addColorStop(0.3,'rgba(255,160,30,0.5)'); sg.addColorStop(1,'transparent');
    ctx.fillStyle=sg; ctx.fillRect(0,0,W,H);
    ctx.fillStyle='rgba(255,230,80,0.88)'; ctx.beginPath(); ctx.arc(W*0.5,sunY,W*0.042*(1+Math.sin(t*2)*0.02),0,Math.PI*2); ctx.fill();
    // Dune silhouette
    ctx.fillStyle='rgba(5,2,0,0.97)';
    ctx.beginPath(); ctx.moveTo(0,H);
    for(let x=0;x<=W;x+=6){ctx.lineTo(x,H*0.75+Math.sin(x*0.007+t*0.08)*22+Math.cos(x*0.018)*14);}
    ctx.lineTo(W,H); ctx.closePath(); ctx.fill();
    // 3 balloons at different heights
    const BALLOONS=[
      {x:0.28,y:0.36,scale:0.9,speed:0.85,delay:0},
      {x:0.5, y:0.28,scale:1.2,speed:1.0, delay:0.5},
      {x:0.72,y:0.40,scale:0.75,speed:0.7,delay:1.2},
    ];
    BALLOONS.forEach((b,bi)=>{
      const bx2=W*b.x, by2=H*(b.y+Math.sin(t*b.speed*0.4+b.delay)*0.02);
      const bw=W*(0.04*b.scale), bh=H*(0.08*b.scale);
      // Silhouette only
      ctx.fillStyle='rgba(5,2,0,0.88)';
      ctx.beginPath(); ctx.ellipse(bx2,by2,bw,bh,0,0,Math.PI*2); ctx.fill();
      // Basket
      ctx.fillRect(bx2-bw*0.3,by2+bh,bw*0.6,bh*0.25);
      // Ropes
      ctx.strokeStyle='rgba(5,2,0,0.6)'; ctx.lineWidth=0.8;
      [[-0.25,0.3],[0.25,0.3]].forEach(([rx,ry])=>{ctx.beginPath();ctx.moveTo(bx2+bw*rx,by2+bh);ctx.lineTo(bx2+bw*rx*0.5,by2+bh+bh*ry);ctx.stroke();});
    });
    // Golden reflections on dune sand
    const refG=ctx.createLinearGradient(0,H*0.7,0,H);
    refG.addColorStop(0,'rgba(255,180,50,0.08)'); refG.addColorStop(1,'transparent');
    ctx.fillStyle=refG; ctx.fillRect(0,H*0.7,W,H*0.3);
    ctx.font=`600 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,200,80,0.45)'; ctx.textAlign='center';
    ctx.fillText('DUBAI DESERT — 5:48 AM · 1,000 METRES',W*0.5,H*0.07);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Three hot air balloon silhouettes against a spectacular Dubai desert sunrise sky at 1000 metres" />;
}

// ── 6. ROMANCE BALLOON — proposal hearts + champagne ─────────
export function BlogAnim_RomanceBalloon() {
  const heartsRef=useRef(Array.from({length:24},(_,i)=>({x:0.3+Math.random()*0.4,y:0.4+Math.random()*0.5,vy:-(0.003+Math.random()*0.003),a:0.3+Math.random()*0.6,size:10+Math.random()*18,ph:Math.random()*Math.PI*2})));
  const bubblesRef=useRef(Array.from({length:16},(_,i)=>({x:W*0.72,y:0.8+Math.random()*0.2,vy:-(0.002+Math.random()*0.003),a:0.4+Math.random()*0.5,r:2+Math.random()*4,ph:Math.random()*Math.PI*2})));
  const ref = useCanvas((ctx, W, H, t) => {
    const hearts=heartsRef.current; const bubbles=bubblesRef.current;
    // Romantic deep purple-blue sky
    const sky=ctx.createLinearGradient(0,0,W,H);
    sky.addColorStop(0,'#050010'); sky.addColorStop(0.4,'#10041A'); sky.addColorStop(0.7,'#200810'); sky.addColorStop(1,'#300A08');
    ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
    // Soft stars
    for(let i=0;i<80;i++){const a=0.08+Math.sin(t+i)*0.06;ctx.fillStyle=`rgba(255,220,255,${a})`;ctx.beginPath();ctx.arc((i*173)%W,(i*89)%(H*0.75),0.6+(i%5)*0.25,0,Math.PI*2);ctx.fill();}
    // Balloon with romantic colors
    const bx=W*0.38,by=H*0.4,bw=W*0.13,bh=H*0.22;
    const panels=['#C2185B','#E91E63','#AD1457','#F06292','#C2185B','#E91E63','#AD1457','#F06292'];
    ctx.save(); ctx.beginPath(); ctx.ellipse(bx,by,bw,bh,0,0,Math.PI*2); ctx.clip();
    panels.forEach((c,i)=>{const a1=(i/8)*Math.PI*2-Math.PI/2;const a2=((i+1)/8)*Math.PI*2-Math.PI/2;ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(bx,by);ctx.arc(bx,by,Math.max(bw,bh),a1,a2);ctx.closePath();ctx.fill();});
    ctx.restore();
    const hl=ctx.createRadialGradient(bx-bw*0.3,by-bh*0.3,0,bx,by,bw*1.2);
    hl.addColorStop(0,'rgba(255,255,255,0.2)'); hl.addColorStop(1,'transparent');
    ctx.fillStyle=hl; ctx.beginPath(); ctx.ellipse(bx,by,bw,bh,0,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle='rgba(255,100,150,0.3)'; ctx.lineWidth=1.5; ctx.beginPath(); ctx.ellipse(bx,by,bw,bh,0,0,Math.PI*2); ctx.stroke();
    // Basket
    const baskY=by+bh+H*0.03;
    ctx.fillStyle='rgba(80,30,20,0.9)'; ctx.beginPath(); if(ctx.roundRect) ctx.roundRect(bx-bw*0.4,baskY,bw*0.8,H*0.07,4); else ctx.rect(bx-bw*0.4,baskY,bw*0.8,H*0.07); ctx.fill();
    ctx.strokeStyle='rgba(180,80,100,0.4)'; ctx.lineWidth=1; ctx.beginPath(); if(ctx.roundRect) ctx.roundRect(bx-bw*0.4,baskY,bw*0.8,H*0.07,4); else ctx.rect(bx-bw*0.4,baskY,bw*0.8,H*0.07); ctx.stroke();
    // Couple silhouettes in basket
    ctx.fillStyle='rgba(10,2,5,0.9)';
    ctx.beginPath(); ctx.arc(bx-bw*0.12,baskY-2,7,0,Math.PI*2); ctx.fill(); ctx.fillRect(bx-bw*0.17,baskY+5,10,12);
    ctx.beginPath(); ctx.arc(bx+bw*0.12,baskY-2,7,0,Math.PI*2); ctx.fill(); ctx.fillRect(bx+bw*0.07,baskY+5,10,12);
    // Ring box proposal
    const ringX=W*0.5+bw*0.5,ringY=baskY+4;
    ctx.fillStyle='rgba(100,30,50,0.9)'; ctx.strokeStyle='rgba(245,158,11,0.7)'; ctx.lineWidth=1.5;
    if(ctx.roundRect){ctx.beginPath();ctx.roundRect(ringX-10,ringY,20,15,3);ctx.fill();ctx.stroke();}
    // Diamond sparkle
    const diam=['rgba(255,255,255,0.9)','rgba(255,230,200,0.7)'];
    diam.forEach((c,i)=>{ctx.fillStyle=c;ctx.beginPath();ctx.arc(ringX,ringY-4+Math.sin(t*3)*2,3-i*1.2,0,Math.PI*2);ctx.fill();});
    for(let sp=0;sp<5;sp++){const sa=sp/5*Math.PI*2+t*2;const sr=6+Math.sin(t*4+sp)*2;ctx.fillStyle=`rgba(255,240,180,${0.6+Math.sin(t*3+sp)*0.3})`;ctx.beginPath();ctx.arc(ringX+Math.cos(sa)*sr,ringY-4+Math.sin(sa)*sr*0.5,1.2,0,Math.PI*2);ctx.fill();}
    // Champagne glass
    const cgx=W*0.68,cgy=H*0.72;
    ctx.strokeStyle='rgba(255,220,150,0.7)'; ctx.lineWidth=2; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(cgx-8,cgy-20); ctx.lineTo(cgx+8,cgy-20); ctx.lineTo(cgx+4,cgy-8); ctx.moveTo(cgx-8,cgy-20); ctx.lineTo(cgx-4,cgy-8);
    ctx.beginPath(); ctx.moveTo(cgx-4,cgy-8); ctx.lineTo(cgx+4,cgy-8); ctx.lineTo(cgx,cgy); ctx.moveTo(cgx,cgy); ctx.lineTo(cgx-6,cgy+4); ctx.lineTo(cgx+6,cgy+4); ctx.stroke();
    ctx.fillStyle='rgba(255,220,100,0.15)';
    ctx.beginPath(); ctx.moveTo(cgx-8,cgy-20); ctx.lineTo(cgx+8,cgy-20); ctx.lineTo(cgx+4,cgy-8); ctx.lineTo(cgx-4,cgy-8); ctx.closePath(); ctx.fill();
    // Bubbles
    bubbles.forEach(b=>{b.y+=b.vy;b.ph+=0.04;if(b.y<-0.05)b.y=0.85;const bx3=(b.r>3?cgx:cgx+(Math.random()-0.5)*4),by3=b.y*H;ctx.strokeStyle=`rgba(255,230,150,${b.a*(0.4+0.4*Math.sin(b.ph))})`;ctx.lineWidth=0.8;ctx.beginPath();ctx.arc(bx3,by3,b.r,0,Math.PI*2);ctx.stroke();});
    // Floating hearts
    hearts.forEach(h=>{h.y+=h.vy;h.ph+=0.025;if(h.y<-0.08)h.y=0.95;const alpha=h.a*(0.4+0.4*Math.sin(h.ph));ctx.save();ctx.globalAlpha=alpha;ctx.font=`${h.size}px serif`;ctx.textAlign='center';ctx.fillText('❤️',h.x*W,h.y*H);ctx.restore();});
    // Label
    ctx.font=`700 ${W>500?13:11}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,150,180,0.7)'; ctx.textAlign='center';
    ctx.fillText('💍 The Ultimate Dubai Proposal Setting',W*0.5,H*0.07);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Romantic hot air balloon proposal scene with floating hearts, champagne and a ring box over Dubai desert" />;
}

// ── 7. SAFETY GAUGE — weight/height measurement anim ─────────
export function BlogAnim_SafetyGauge() {
  const ref = useCanvas((ctx, W, H, t) => {
    ctx.fillStyle='#020406'; ctx.fillRect(0,0,W,H);
    const bg=ctx.createLinearGradient(0,0,W,H);
    bg.addColorStop(0,'#020408'); bg.addColorStop(1,'#060214');
    ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
    // Weight gauge (left)
    const wgX=W*0.22,wgY=H*0.55,wgR=Math.min(W*0.15,H*0.3);
    ctx.strokeStyle='rgba(255,255,255,0.1)'; ctx.lineWidth=8;
    ctx.beginPath(); ctx.arc(wgX,wgY,wgR,Math.PI*0.75,Math.PI*2.25); ctx.stroke();
    // Color zones
    [[Math.PI*0.75,Math.PI*1.25,'rgba(0,200,100,0.7)'],[Math.PI*1.25,Math.PI*1.75,'rgba(245,158,11,0.7)'],[Math.PI*1.75,Math.PI*2.25,'rgba(220,40,30,0.7)']].forEach(([a1,a2,c])=>{
      ctx.strokeStyle=c; ctx.lineWidth=8; ctx.beginPath(); ctx.arc(wgX,wgY,wgR,a1,a2); ctx.stroke();
    });
    // Needle
    const weightPct=0.55+Math.sin(t*0.3)*0.05;
    const needleA=Math.PI*0.75+weightPct*Math.PI*1.5;
    ctx.strokeStyle='#fff'; ctx.lineWidth=2.5; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(wgX,wgY); ctx.lineTo(wgX+Math.cos(needleA)*wgR*0.8,wgY+Math.sin(needleA)*wgR*0.8); ctx.stroke();
    ctx.fillStyle='#fff'; ctx.beginPath(); ctx.arc(wgX,wgY,5,0,Math.PI*2); ctx.fill();
    // Weight labels
    ctx.font=`700 ${W>500?14:11}px Outfit,sans-serif`; ctx.fillStyle='#fff'; ctx.textAlign='center';
    ctx.fillText(Math.round(75+Math.sin(t*0.3)*5)+'kg',wgX,wgY+8);
    ctx.font=`500 9px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,0.45)'; ctx.fillText('MAX 120kg',wgX,wgY+22);
    ctx.font=`600 ${W>500?11:10}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,0.55)'; ctx.fillText('Weight Check',wgX,H*0.15);
    // Height gauge (center)
    const hgX=W*0.5, topY=H*0.12, btmY=H*0.88;
    const totalH=btmY-topY;
    ctx.strokeStyle='rgba(255,255,255,0.1)'; ctx.lineWidth=14; ctx.beginPath(); ctx.moveTo(hgX,topY); ctx.lineTo(hgX,btmY); ctx.stroke();
    // Height fill
    const heightPct=0.65;
    const fillTop=btmY-totalH*heightPct;
    const hColor='rgba(0,200,100,0.8)';
    ctx.strokeStyle=hColor; ctx.lineWidth=14; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(hgX,btmY); ctx.lineTo(hgX,fillTop); ctx.stroke();
    // Tick marks
    [0.4,0.5,0.6,0.7,0.8,0.9,1.0,1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9,2.0].forEach((m,i)=>{
      const ty=btmY-totalH*(m-0.4)/1.6; ctx.strokeStyle='rgba(255,255,255,0.3)'; ctx.lineWidth=i%5===0?2:1;
      ctx.beginPath(); ctx.moveTo(hgX+8,ty); ctx.lineTo(hgX+14+(i%5===0?6:0),ty); ctx.stroke();
      if(i%5===0){ctx.font='9px Outfit,sans-serif';ctx.fillStyle='rgba(255,255,255,0.4)';ctx.textAlign='left';ctx.fillText(m.toFixed(1)+'m',hgX+22,ty+4);}
    });
    // 1.2m min line
    const minY=btmY-totalH*(1.2-0.4)/1.6;
    ctx.strokeStyle='rgba(245,158,11,0.8)'; ctx.lineWidth=1.5; ctx.setLineDash([4,6]);
    ctx.beginPath(); ctx.moveTo(hgX-15,minY); ctx.lineTo(hgX+50,minY); ctx.stroke(); ctx.setLineDash([]);
    ctx.font='700 10px Outfit,sans-serif'; ctx.fillStyle='rgba(245,158,11,0.9)'; ctx.textAlign='left'; ctx.fillText('MIN 1.2m',hgX+16,minY-4);
    ctx.font=`600 ${W>500?11:10}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,0.55)'; ctx.textAlign='center'; ctx.fillText('Height',hgX,H*0.09);
    // Health checklist (right)
    const checks=[
      {label:'No heart conditions',ok:true},{label:'No back injuries',ok:true},
      {label:'Not pregnant',ok:true},{label:'Not vertigo',ok:true},
      {label:'Age 7+',ok:true},{label:'Under 120kg',ok:true},
    ];
    let cy3=H*0.2;
    ctx.font=`700 ${W>500?11:10}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,0.55)'; ctx.textAlign='left'; ctx.fillText('Health Requirements',W*0.68,cy3); cy3+=20;
    checks.forEach(c=>{
      ctx.fillStyle=c.ok?'rgba(0,200,100,0.2)':'rgba(220,40,30,0.2)';
      ctx.strokeStyle=c.ok?'rgba(0,200,100,0.35)':'rgba(220,40,30,0.35)'; ctx.lineWidth=0.8;
      if(ctx.roundRect){ctx.beginPath();ctx.roundRect(W*0.67,cy3,W*0.3,18,9);ctx.fill();ctx.stroke();}
      ctx.font=`500 ${W>500?10:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,0.65)'; ctx.fillText(`${c.ok?'✓':'✗'} ${c.label}`,W*0.675,cy3+13); cy3+=22;
    });
    ctx.font=`700 ${W>500?12:10}px Outfit,sans-serif`; ctx.fillStyle='rgba(0,200,100,0.7)'; ctx.textAlign='center';
    ctx.fillText('SAFETY REQUIREMENTS — DUBAI BALLOON FLIGHT',W*0.5,H*0.06);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Safety requirements chart showing weight limit, height minimum and health checklist for Dubai hot air balloon" />;
}

// ── 8. CAMERA LENS — photography composition guide ───────────
export function BlogAnim_CameraLens() {
  const ref = useCanvas((ctx, W, H, t) => {
    // Dark photographic background
    ctx.fillStyle='#010204'; ctx.fillRect(0,0,W,H);
    // Scene cycling — different shots
    const scene=Math.floor(t/5)%4;
    // Scene backgrounds
    const BG=[
      // Scene 0: Sunrise horizon shot
      ()=>{const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#010108');g.addColorStop(0.5,'#200A00');g.addColorStop(1,'#A04000');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);const sg=ctx.createRadialGradient(W*0.5,H*0.6,0,W*0.5,H*0.6,W*0.3);sg.addColorStop(0,'rgba(255,180,30,0.5)');sg.addColorStop(1,'transparent');ctx.fillStyle=sg;ctx.fillRect(0,0,W,H);},
      // Scene 1: Dune below shot
      ()=>{const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#050310');g.addColorStop(0.6,'#120800');g.addColorStop(1,'#5A2000');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);},
      // Scene 2: Balloon cluster
      ()=>{const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#000005');g.addColorStop(0.5,'#040220');g.addColorStop(1,'#180A00');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);},
      // Scene 3: City skyline
      ()=>{const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,'#010108');g.addColorStop(0.6,'#0A0420');g.addColorStop(1,'#200A30');ctx.fillStyle=g;ctx.fillRect(0,0,W,H);},
    ];
    BG[scene]();
    // Viewfinder overlay
    const vf=0.08; // margin
    ctx.strokeStyle='rgba(255,255,255,0.55)'; ctx.lineWidth=1.5;
    ctx.strokeRect(W*vf,H*vf,W*(1-vf*2),H*(1-vf*2));
    // Rule of thirds grid
    ctx.strokeStyle='rgba(255,255,255,0.12)'; ctx.lineWidth=0.8;
    [0.333,0.667].forEach(f=>{
      ctx.beginPath();ctx.moveTo(W*(vf+f*(1-vf*2)),H*vf);ctx.lineTo(W*(vf+f*(1-vf*2)),H*(1-vf));ctx.stroke();
      ctx.beginPath();ctx.moveTo(W*vf,H*(vf+f*(1-vf*2)));ctx.lineTo(W*(1-vf),H*(vf+f*(1-vf*2)));ctx.stroke();
    });
    // Corner brackets
    const br=W*0.04;
    [[W*vf,H*vf],[W*(1-vf),H*vf],[W*vf,H*(1-vf)],[W*(1-vf),H*(1-vf)]].forEach(([cx2,cy2],i)=>{
      const dx=i%2===0?1:-1; const dy=i<2?1:-1;
      ctx.strokeStyle='rgba(245,158,11,0.8)'; ctx.lineWidth=2;
      ctx.beginPath();ctx.moveTo(cx2,cy2+dy*br);ctx.lineTo(cx2,cy2);ctx.lineTo(cx2+dx*br,cy2);ctx.stroke();
    });
    // Shot-specific overlay
    const SHOT_TIPS=[
      {tip:'Shoot at f/8 · ISO 400 · 1/1000s · Horizon on lower third',icon:'🌅',label:'Sunrise Shot'},
      {tip:'200mm zoom · Capture dune texture · Shoot straight down',icon:'🏜️',label:'Dune Texture'},
      {tip:'Wide angle 24mm · Multiple balloons · Leading lines',icon:'🎈',label:'Balloon Cluster'},
      {tip:'Telephoto 200mm · City at 1000m · Stabilise on basket edge',icon:'🏙️',label:'Dubai Skyline'},
    ];
    const tip=SHOT_TIPS[scene];
    // Subject guide dot (appears at intersection)
    const dotX=W*(vf+0.667*(1-vf*2)), dotY=H*(vf+0.333*(1-vf*2));
    ctx.strokeStyle=`rgba(245,158,11,${0.5+Math.sin(t*3)*0.3})`; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.arc(dotX,dotY,14,0,Math.PI*2); ctx.stroke();
    ctx.beginPath(); ctx.arc(dotX,dotY,4,0,Math.PI*2); ctx.fillStyle='rgba(245,158,11,0.8)'; ctx.fill();
    // Info overlay bar
    ctx.fillStyle='rgba(0,0,0,0.6)'; ctx.fillRect(W*vf,H*(1-vf)-32,W*(1-vf*2),32);
    ctx.font=`700 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='#F59E0B'; ctx.textAlign='left';
    ctx.fillText(`${tip.icon} ${tip.label}`,W*vf+8,H*(1-vf)-14);
    ctx.font=`400 ${W>500?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,0.6)';
    ctx.fillText(tip.tip,W*vf+8,H*(1-vf)-3);
    // Camera settings bar top
    ctx.fillStyle='rgba(0,0,0,0.5)'; ctx.fillRect(W*vf,H*vf,W*(1-vf*2),24);
    ['f/8','ISO 400','1/1000s','AUTO-WB','RAW+JPEG'].forEach((s,i)=>{
      ctx.font=`600 ${W>500?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,0.6)'; ctx.textAlign='left';
      ctx.fillText(s,W*vf+8+i*W*0.16,H*vf+15);
    });
    // Focus indicator
    ctx.strokeStyle=`rgba(0,220,80,${0.4+Math.sin(t*2)*0.3})`; ctx.lineWidth=1;
    ctx.beginPath(); ctx.rect(dotX-22,dotY-18,44,36); ctx.stroke();
    // AF dot
    ctx.font='9px Outfit,sans-serif'; ctx.fillStyle='rgba(0,220,80,0.8)'; ctx.textAlign='center'; ctx.fillText('AF',dotX+30,dotY-14);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Camera viewfinder showing photography composition tips for hot air balloon Dubai photos" />;
}
