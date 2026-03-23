'use client';
import { useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════
// DESERT SAFARI BLOG — 6 unique animations (never reused anywhere)
// 1. city-to-desert  — parallax transition: skyline → dunes
// 2. dune-bashing    — 4x4 mid-air, dust burst, speedometer
// 3. camel-sandboard — camel walk cycle + sandboarder physics
// 4. bedouin-camp    — campfire particles, lanterns, carpet pattern
// 5. tanoura-show    — spinning skirt centrifuge + fire arcs + notes
// 6. milky-way       — deep space: galaxy band, constellations, comets
// ═══════════════════════════════════════════════════════════════

function useCanvas(drawFn){
  const ref = useRef(null);
  useEffect(()=>{
    const cv = ref.current; if(!cv) return;
    const ctx = cv.getContext('2d');
    let raf, t = 0;
    const rsz = ()=>{ cv.width=cv.offsetWidth||760; cv.height=cv.offsetHeight||210; };
    rsz();
    const ro = new ResizeObserver(rsz); ro.observe(cv);
    const loop = ()=>{ t += 0.015; drawFn(ctx, cv.width, cv.height, t); raf = requestAnimationFrame(loop); };
    loop();
    return ()=>{ cancelAnimationFrame(raf); ro.disconnect(); };
  },[]);
  return ref;
}

// ── 1. CITY → DESERT TRANSITION ──────────────────────────────
export function BlogAnim_CityToDesert(){
  const ref = useCanvas((ctx,W,H,t)=>{
    // Sky: city blue-black → desert amber
    const sky = ctx.createLinearGradient(0,0,W,0);
    sky.addColorStop(0,'#080B18'); sky.addColorStop(0.48,'#15090A'); sky.addColorStop(1,'#2A0D00');
    ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
    // Dune ground
    const dg = ctx.createLinearGradient(0,H*0.52,0,H);
    dg.addColorStop(0,'#7A2500'); dg.addColorStop(1,'#2A0900');
    ctx.fillStyle=dg; ctx.fillRect(0,H*0.52,W,H);
    // City silhouette — left 45%
    const cityAlpha = Math.max(0, 1 - t*0.012);
    ctx.save(); ctx.globalAlpha=cityAlpha;
    const blds=[{x:0.03,w:0.022,h:0.28},{x:0.07,w:0.018,h:0.20},{x:0.10,w:0.030,h:0.35},
                {x:0.15,w:0.016,h:0.18},{x:0.18,w:0.025,h:0.26},{x:0.22,w:0.018,h:0.22},
                {x:0.26,w:0.032,h:0.40},{x:0.31,w:0.020,h:0.22},{x:0.35,w:0.022,h:0.18},{x:0.38,w:0.028,h:0.30}];
    blds.forEach((b,i)=>{
      const bh=H*b.h, bx=W*b.x, bw=W*b.w, by=H*0.52-bh;
      ctx.fillStyle='rgba(8,10,22,0.95)'; ctx.fillRect(bx,by,bw,bh);
      for(let r=0;r<6;r++) for(let c=0;c<2;c++){
        if(Math.sin(t*0.4+i*3+r+c)>-0.15){ ctx.fillStyle='rgba(255,210,90,0.3)'; ctx.fillRect(bx+2+c*8,by+4+r*12,5,7); }
      }
    });
    ctx.restore();
    // Fade overlay
    const fade=ctx.createLinearGradient(0,0,W,0); fade.addColorStop(0,'transparent'); fade.addColorStop(0.42,'transparent'); fade.addColorStop(0.68,'rgba(42,13,0,0.85)');
    ctx.fillStyle=fade; ctx.fillRect(0,0,W,H);
    // Desert dunes right half
    ctx.fillStyle='#8B3000';
    ctx.beginPath(); ctx.moveTo(W*0.38,H);
    for(let x=W*0.38;x<=W;x+=6){ ctx.lineTo(x, H*0.52+Math.sin((x-W*0.38)*0.013+t*0.3)*16+Math.cos((x-W*0.38)*0.026)*9); }
    ctx.lineTo(W,H); ctx.closePath(); ctx.fill();
    // Heat shimmer
    for(let i=0;i<8;i++){
      ctx.strokeStyle='rgba(200,110,30,0.06)'; ctx.lineWidth=1;
      ctx.beginPath(); const y=H*0.15+i*H*0.04;
      for(let x=W*0.4;x<=W;x+=4){ const wy=y+Math.sin(x*0.045+t*2+i)*2; x===W*0.4?ctx.moveTo(x,wy):ctx.lineTo(x,wy); }
      ctx.stroke();
    }
    // Car moving right
    const carX=((t*0.022)%1.3-0.05)*W; const carY=H*0.72;
    if(carX>0&&carX<W){
      ctx.fillStyle='rgba(180,70,10,0.85)'; ctx.beginPath();
      if(ctx.roundRect) ctx.roundRect(carX-20,carY-10,40,16,4); else ctx.rect(carX-20,carY-10,40,16);
      ctx.fill();
      const hg=ctx.createRadialGradient(carX+22,carY-2,0,carX+22,carY-2,48);
      hg.addColorStop(0,'rgba(255,230,160,0.45)'); hg.addColorStop(1,'transparent');
      ctx.fillStyle=hg; ctx.fillRect(carX,carY-20,60,36);
    }
    // Labels
    ctx.font=`bold ${W>600?11:9}px Outfit,sans-serif`; ctx.textAlign='right';
    ctx.fillStyle='rgba(180,200,255,0.5)'; ctx.fillText('DUBAI CITY',W*0.4,H-10);
    ctx.fillStyle='rgba(200,120,30,0.55)'; ctx.textAlign='left';
    ctx.fillText('AL LAHBAB DESERT ›',W*0.52,H-10);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Animation showing Dubai city skyline transitioning into the red desert dunes" />;
}

// ── 2. DUNE BASHING ───────────────────────────────────────────
export function BlogAnim_DuneBashing(){
  const dustRef = useRef(Array.from({length:80},()=>({x:0,y:0,vx:0,vy:0,a:0,s:2,life:0,active:false,r:220,g:100})));
  const ref = useCanvas((ctx,W,H,t)=>{
    const dust = dustRef.current;
    const sky=ctx.createLinearGradient(0,0,0,H); sky.addColorStop(0,'#0D0700'); sky.addColorStop(0.5,'#1E0A00'); sky.addColorStop(1,'#8B3200');
    ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
    // Two dune layers
    ['#7A2800','#5A1C00'].forEach((c,li)=>{
      ctx.fillStyle=c; ctx.beginPath(); ctx.moveTo(0,H);
      for(let x=0;x<=W;x+=6){ ctx.lineTo(x,H*(0.42+li*0.15)+Math.sin(x*0.01+t*(0.15-li*0.04))*24+Math.cos(x*0.024+li)*14); }
      ctx.lineTo(W,H); ctx.closePath(); ctx.fill();
    });
    // Vehicle
    const prog=(t*0.16)%1; const vx=prog*W; const vy=H*0.36+Math.sin(prog*Math.PI*2)*42+(1-prog)*H*0.22;
    const tilt=Math.sin(prog*Math.PI)*0.58;
    // Dust burst
    if(Math.abs(prog-0.28)<0.022){ dust.forEach(p=>{ p.x=vx; p.y=vy+22; p.vx=(Math.random()-0.5)*4.5; p.vy=-(Math.random()*4.5); p.a=0.7; p.s=2+Math.random()*6; p.life=1; p.active=true; p.r=195+Math.floor(Math.random()*40); p.g=90+Math.floor(Math.random()*80); }); }
    // Trail dust
    ctx.save(); ctx.globalAlpha=0.35;
    for(let i=1;i<10;i++){ const tp=Math.max(0,prog-i*0.035); const tx=tp*W; const ty=H*0.36+Math.sin(tp*Math.PI*2)*42+(1-tp)*H*0.22+22; ctx.fillStyle=`rgba(180,110,40,${(1-i/10)*0.35})`; ctx.beginPath(); ctx.ellipse(tx,ty,14-i,6,0,0,Math.PI*2); ctx.fill(); }
    ctx.restore();
    // Dust particles
    dust.forEach(p=>{ if(!p.active) return; p.x+=p.vx; p.y+=p.vy; p.vy+=0.13; p.life-=0.022; if(p.life<=0){p.active=false;return;} ctx.fillStyle=`rgba(${p.r},${p.g},20,${p.life*p.a*0.5})`; ctx.beginPath(); ctx.arc(p.x,p.y,p.s*p.life,0,Math.PI*2); ctx.fill(); });
    // 4x4
    ctx.save(); ctx.translate(vx,vy); ctx.rotate(-tilt);
    const bdg=ctx.createLinearGradient(-32,-24,32,0); bdg.addColorStop(0,'#8B1A00'); bdg.addColorStop(1,'#4A0E00');
    ctx.fillStyle=bdg; ctx.beginPath(); if(ctx.roundRect) ctx.roundRect(-32,-24,64,30,7); else ctx.rect(-32,-24,64,30); ctx.fill();
    ctx.fillStyle='rgba(120,180,220,0.5)';
    ['',null].forEach((_,i)=>{ ctx.beginPath(); if(ctx.roundRect) ctx.roundRect(-24+i*26,-22,20,15,3); else ctx.rect(-24+i*26,-22,20,15); ctx.fill(); });
    [-24,20].forEach(wx=>{ ctx.fillStyle='#1a1a1a'; ctx.beginPath(); ctx.arc(wx,9,11,0,Math.PI*2); ctx.fill(); ctx.fillStyle='#333'; ctx.beginPath(); ctx.arc(wx,9,6,0,Math.PI*2); ctx.fill(); });
    const hg=ctx.createRadialGradient(34,-5,0,34,-5,42); hg.addColorStop(0,'rgba(255,235,170,0.55)'); hg.addColorStop(1,'transparent'); ctx.fillStyle=hg; ctx.beginPath(); ctx.arc(34,-5,42,0,Math.PI*2); ctx.fill();
    ctx.restore();
    // Speedometer
    const spX=W-68,spY=H-58;
    ctx.beginPath(); ctx.arc(spX,spY,40,Math.PI,Math.PI*2); ctx.strokeStyle='rgba(255,255,255,0.1)'; ctx.lineWidth=7; ctx.stroke();
    const speed=Math.min(prog*1.5,1); ctx.beginPath(); ctx.arc(spX,spY,40,Math.PI,Math.PI*(1+speed)); ctx.strokeStyle='#F59E0B'; ctx.lineWidth=7; ctx.stroke();
    ctx.fillStyle='rgba(255,255,255,0.65)'; ctx.font=`bold 14px Outfit,sans-serif`; ctx.textAlign='center'; ctx.fillText(Math.round(speed*98)+'km/h',spX,spY-10);
    ctx.font='9px Outfit,sans-serif'; ctx.fillStyle='rgba(255,255,255,0.3)'; ctx.fillText('SPEED',spX,spY+4);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Animation of a 4x4 Land Cruiser flying over a dune crest during dune bashing in the Dubai desert" />;
}

// ── 3. CAMEL + SANDBOARD ──────────────────────────────────────
export function BlogAnim_CamelSandboard(){
  const sprayRef=useRef(Array.from({length:30},()=>({x:0,y:0,vx:0,vy:0,a:0,s:1.5,active:false})));
  const ref = useCanvas((ctx,W,H,t)=>{
    const spray=sprayRef.current;
    const sky=ctx.createLinearGradient(0,0,0,H); sky.addColorStop(0,'#100802'); sky.addColorStop(0.4,'#2A1004'); sky.addColorStop(1,'#7A2C00');
    ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
    // Slope + flat
    ctx.fillStyle='#8B3200'; ctx.beginPath(); ctx.moveTo(0,H*0.18); ctx.lineTo(W*0.58,H); ctx.lineTo(0,H); ctx.closePath(); ctx.fill();
    ctx.fillStyle='#6B2200'; ctx.beginPath(); ctx.moveTo(0,H*0.23); ctx.lineTo(W*0.52,H); ctx.lineTo(0,H); ctx.closePath(); ctx.fill();
    ctx.fillStyle='#5A1C00'; ctx.beginPath(); ctx.moveTo(W*0.44,H); ctx.lineTo(W,H*0.56); ctx.lineTo(W,H); ctx.closePath(); ctx.fill();
    const sg=ctx.createRadialGradient(W*0.76,H,0,W*0.76,H,W*0.5); sg.addColorStop(0,'rgba(240,120,20,0.35)'); sg.addColorStop(1,'transparent'); ctx.fillStyle=sg; ctx.fillRect(0,0,W,H);
    // CAMEL
    const camX=W*(0.55+(t*0.035)%0.40); const camY=H*0.79;
    ctx.save(); ctx.translate(camX,camY);
    // Body
    const cbg=ctx.createRadialGradient(0,-10,5,0,-10,30); cbg.addColorStop(0,'#C07030'); cbg.addColorStop(1,'#7A3E10');
    ctx.fillStyle=cbg; ctx.beginPath(); ctx.ellipse(0,-10,32,17,0,0,Math.PI*2); ctx.fill();
    // Humps
    ctx.fillStyle='#A35A20'; [[-6,-27,13,11],[10,-25,11,9]].forEach(([ex,ey,rx,ry])=>{ ctx.beginPath(); ctx.ellipse(ex,ey,rx,ry,0,0,Math.PI*2); ctx.fill(); });
    // Neck+head
    ctx.strokeStyle='#9B4E18'; ctx.lineWidth=9; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(26,-10); ctx.lineTo(36,2); ctx.stroke();
    ctx.fillStyle='#B05C1C'; ctx.beginPath(); ctx.ellipse(36,0,11,8,0.3,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#1a1a1a'; ctx.beginPath(); ctx.arc(41,-2,2.2,0,Math.PI*2); ctx.fill();
    // Legs
    [-20,-9,7,18].forEach((lx,i)=>{ const ph=t*3+(i%2)*Math.PI; const k=Math.sin(ph)*11; const f=Math.sin(ph)*13; ctx.strokeStyle='#7A3010'; ctx.lineWidth=5.5; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(lx,5); ctx.lineTo(lx+k*0.3,17+k*0.4); ctx.lineTo(lx+f*0.5,30+f*0.3); ctx.stroke(); });
    ctx.restore();
    // Guide silhouette
    ctx.save(); ctx.translate(camX-54,camY-4); ctx.fillStyle='rgba(18,8,0,0.85)';
    ctx.beginPath(); ctx.ellipse(0,-28,7,9,0,0,Math.PI*2); ctx.fill(); ctx.fillRect(-5,-20,10,24); ctx.restore();
    // SANDBOARDER
    const bp=(t*0.13)%1; const bx=W*(bp*0.51); const by=H*(0.2+bp*0.73);
    ctx.save(); ctx.translate(bx,by); ctx.rotate(0.6);
    ctx.fillStyle='#7A4A00'; ctx.beginPath(); if(ctx.roundRect) ctx.roundRect(-22,-4,44,9,4); else ctx.rect(-22,-4,44,9); ctx.fill();
    ctx.fillStyle='rgba(18,10,0,0.88)'; ctx.beginPath(); ctx.ellipse(0,-23,7,9,0,0,Math.PI*2); ctx.fill(); ctx.fillRect(-6,-14,12,20);
    ctx.strokeStyle='rgba(18,10,0,0.88)'; ctx.lineWidth=4.5; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(-6,-8); ctx.lineTo(-24,-3); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(6,-8); ctx.lineTo(24,-3); ctx.stroke();
    // Spray
    spray.forEach(p=>{ if(!p.active){ if(Math.random()<0.32){ p.x=0;p.y=6;p.vx=(Math.random()-0.3)*4.5;p.vy=-(Math.random()*2.2+0.5);p.a=0.7;p.s=1.5+Math.random()*2.5;p.active=true; } return; } p.x+=p.vx; p.y+=p.vy; p.vy+=0.11; p.a-=0.042; if(p.a<=0) p.active=false; ctx.fillStyle=`rgba(200,135,55,${p.a})`; ctx.beginPath(); ctx.arc(p.x,p.y,p.s,0,Math.PI*2); ctx.fill(); });
    // Speed lines
    ctx.save(); ctx.globalAlpha=0.28; for(let i=0;i<5;i++){ ctx.strokeStyle='rgba(255,190,90,0.5)'; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(-10-i*13,0-i*7); ctx.lineTo(-32-i*13,2-i*7+2); ctx.stroke(); } ctx.restore();
    ctx.restore();
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Animation showing a camel walking across the Dubai desert while a person sandboards down a dune" />;
}

// ── 4. BEDOUIN CAMP ───────────────────────────────────────────
export function BlogAnim_BedouinCamp(){
  const fireRef=useRef(Array.from({length:65},()=>({x:0,y:0,vx:0,vy:0,a:0,s:3,life:0,active:false,r:222,g:95})));
  const LANTERNS=[{x:0.21,ph:0},{x:0.43,ph:1.1},{x:0.63,ph:2.2},{x:0.84,ph:3.3}];
  const ref = useCanvas((ctx,W,H,t)=>{
    const fire=fireRef.current;
    ctx.fillStyle='#030307'; ctx.fillRect(0,0,W,H);
    // Stars
    for(let i=0;i<70;i++){ ctx.fillStyle=`rgba(255,255,255,${0.08+Math.sin(t*1.4+i)*0.07})`; ctx.beginPath(); ctx.arc((i*173)%W,(i*97)%(H*0.46),0.6+(i%3)*0.35,0,Math.PI*2); ctx.fill(); }
    // Ground
    const gnd=ctx.createLinearGradient(0,H*0.62,0,H); gnd.addColorStop(0,'#190A00'); gnd.addColorStop(1,'#090400');
    ctx.fillStyle=gnd; ctx.fillRect(0,H*0.62,W,H*0.38);
    // Carpet pattern
    ctx.fillStyle='rgba(110,18,18,0.5)'; ctx.fillRect(W*0.06,H*0.63,W*0.88,H*0.29);
    ctx.strokeStyle='rgba(215,155,35,0.25)'; ctx.lineWidth=1;
    for(let gx=W*0.06;gx<W*0.94;gx+=14){ ctx.beginPath(); ctx.moveTo(gx,H*0.63); ctx.lineTo(gx,H*0.92); ctx.stroke(); }
    for(let gy=H*0.63;gy<H*0.92;gy+=14){ ctx.beginPath(); ctx.moveTo(W*0.06,gy); ctx.lineTo(W*0.94,gy); ctx.stroke(); }
    for(let gx=W*0.06+14;gx<W*0.94;gx+=28) for(let gy=H*0.63+14;gy<H*0.92;gy+=28){ ctx.fillStyle='rgba(195,135,25,0.22)'; ctx.beginPath(); ctx.moveTo(gx,gy-7); ctx.lineTo(gx+7,gy); ctx.lineTo(gx,gy+7); ctx.lineTo(gx-7,gy); ctx.closePath(); ctx.fill(); }
    // Tent top
    ctx.fillStyle='rgba(38,14,4,0.92)'; ctx.beginPath(); ctx.moveTo(0,H*0.17); ctx.lineTo(W*0.5,H*0.07); ctx.lineTo(W,H*0.17); ctx.lineTo(W,0); ctx.lineTo(0,0); ctx.closePath(); ctx.fill();
    ctx.strokeStyle='rgba(175,95,18,0.38)'; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(0,H*0.17); ctx.lineTo(W*0.5,H*0.07); ctx.lineTo(W,H*0.17); ctx.stroke();
    // Tent drapes
    for(let i=0;i<=8;i++){ const fx=W*i/8; const fy=H*0.07+Math.sin(fx/W*Math.PI)*H*0.09+Math.sin(t*1.4+fx*0.02)*3.5; ctx.fillStyle='rgba(155,75,14,0.28)'; ctx.beginPath(); ctx.moveTo(fx-14,0); ctx.lineTo(fx,fy+9); ctx.lineTo(fx+14,0); ctx.closePath(); ctx.fill(); }
    // Lanterns
    LANTERNS.forEach(l=>{ const lx=l.x*W; const ly=H*0.22+Math.sin(t*0.85+l.ph)*4; const sw=Math.sin(t*0.78+l.ph)*0.07;
      ctx.save(); ctx.translate(lx,ly); ctx.rotate(sw);
      ctx.strokeStyle='rgba(175,95,18,0.4)'; ctx.lineWidth=1; ctx.beginPath(); ctx.moveTo(0,-ly+H*0.13); ctx.lineTo(0,-9); ctx.stroke();
      const lg=ctx.createRadialGradient(0,0,0,0,0,17); lg.addColorStop(0,'rgba(255,195,75,0.9)'); lg.addColorStop(0.5,'#B86018'); lg.addColorStop(1,'rgba(55,18,4,0.9)');
      ctx.fillStyle=lg; ctx.beginPath(); ctx.ellipse(0,0,13,19,0,0,Math.PI*2); ctx.fill();
      const gg=ctx.createRadialGradient(0,0,0,0,0,42); gg.addColorStop(0,'rgba(255,170,45,0.22)'); gg.addColorStop(1,'transparent'); ctx.fillStyle=gg; ctx.beginPath(); ctx.arc(0,0,42,0,Math.PI*2); ctx.fill();
      ctx.restore();
    });
    // Fire
    const fx=W*0.5,fy=H*0.63;
    for(let i=0;i<5;i++){ const p=fire.find(p=>!p.active); if(!p) break; p.x=fx+(Math.random()-0.5)*13; p.y=fy; p.vx=(Math.random()-0.5)*0.9; p.vy=-(1.6+Math.random()*2.2); p.a=0.85; p.s=3+Math.random()*5; p.life=1; p.active=true; p.r=218+Math.floor(Math.random()*38); p.g=75+Math.floor(Math.random()*85); }
    ctx.strokeStyle='#3A1800'; ctx.lineWidth=8; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(fx-24,fy); ctx.lineTo(fx+9,fy-9); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(fx+24,fy); ctx.lineTo(fx-9,fy-9); ctx.stroke();
    fire.forEach(p=>{ if(!p.active) return; p.x+=p.vx; p.y+=p.vy; p.vy+=0.045; p.life-=0.026; if(p.life<=0){p.active=false;return;} ctx.fillStyle=`rgba(${p.r},${p.g},18,${p.life*p.a})`; ctx.beginPath(); ctx.arc(p.x,p.y,p.s*p.life,0,Math.PI*2); ctx.fill(); });
    const fg=ctx.createRadialGradient(fx,fy,0,fx,fy,65); fg.addColorStop(0,`rgba(215,95,18,${0.22+Math.sin(t*4)*0.07})`); fg.addColorStop(1,'transparent'); ctx.fillStyle=fg; ctx.beginPath(); ctx.arc(fx,fy,65,0,Math.PI*2); ctx.fill();
    // Coffee pot (dallah)
    const dx=W*0.27,dy=H*0.72; ctx.fillStyle='#8B6712'; ctx.beginPath(); ctx.ellipse(dx,dy,10,15,0,0,Math.PI*2); ctx.fill(); ctx.fillStyle='#C28A08'; ctx.beginPath(); ctx.ellipse(dx,dy-17,6,6,0,0,Math.PI*2); ctx.fill(); ctx.strokeStyle='#C28A08'; ctx.lineWidth=3; ctx.beginPath(); ctx.moveTo(dx,dy-10); ctx.quadraticCurveTo(dx+21,dy-14,dx+17,dy-4); ctx.stroke();
    // Steam
    ctx.strokeStyle='rgba(200,200,200,0.28)'; ctx.lineWidth=1.5;
    for(let i=0;i<3;i++){ ctx.beginPath(); ctx.moveTo(dx+i*3-2,dy-30); for(let s=0;s<10;s++){ ctx.lineTo(dx+i*3-2+Math.sin(t*2+s*0.5+i)*4,dy-30-s*3); } ctx.stroke(); }
    // Silhouettes
    [[W*0.14,H*0.72],[W*0.78,H*0.72],[W*0.88,H*0.70]].forEach(([sx,sy])=>{ ctx.fillStyle='rgba(9,4,0,0.88)'; ctx.beginPath(); ctx.ellipse(sx,sy-18,7,9,0,0,Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.ellipse(sx,sy-4,11,11,0,0,Math.PI,true); ctx.fill(); });
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Animation of a traditional Bedouin camp with campfire, glowing lanterns, carpet patterns and Arabic coffee pot" />;
}

// ── 5. TANOURA + FIRE SHOW ────────────────────────────────────
export function BlogAnim_TanourShow(){
  const NOTES=['♪','♫','♩','♬'];
  const notesRef=useRef(Array.from({length:18},(_,i)=>({x:Math.random(),y:0.35+Math.random()*0.55,vy:-(0.003+Math.random()*0.003),a:0.35+Math.random()*0.5,note:NOTES[i%4],ph:Math.random()*Math.PI*2,sz:12+Math.random()*9})));
  const arcRef=useRef(Array.from({length:6},(_,i)=>({angle:(i/6)*Math.PI*2,speed:0.009+Math.random()*0.005})));
  const ref = useCanvas((ctx,W,H,t)=>{
    const notes=notesRef.current; const arcs=arcRef.current;
    ctx.fillStyle='#020107'; ctx.fillRect(0,0,W,H);
    for(let i=0;i<85;i++){ ctx.fillStyle=`rgba(255,255,255,${0.07+Math.sin(t*1.1+i)*0.055})`; ctx.beginPath(); ctx.arc((i*167)%W,(i*89)%(H*0.5),0.65,0,Math.PI*2); ctx.fill(); }
    // Ground
    const gg=ctx.createLinearGradient(0,H*0.72,0,H); gg.addColorStop(0,'rgba(18,5,0,0.85)'); gg.addColorStop(1,'#000'); ctx.fillStyle=gg; ctx.fillRect(0,H*0.72,W,H*0.28);
    // TANOURA (left)
    const tx=W*0.28,ty=H*0.72;
    for(let layer=0;layer<7;layer++){
      const r=18+layer*17; const segs=8+layer*2; const hue=(layer*28+t*18)%360;
      for(let s=0;s<segs;s++){
        const a1=t*3+s*(Math.PI*2/segs); const a2=t*3+(s+0.83)*(Math.PI*2/segs);
        const wr=r*(1+Math.sin(t*2.5+s)*0.09);
        ctx.beginPath(); ctx.moveTo(tx,ty-4); ctx.arc(tx,ty-4,wr,a1,a2); ctx.closePath();
        ctx.fillStyle=`hsla(${hue+s*14},88%,${56-layer*4}%,${0.88-layer*0.05})`; ctx.fill();
      }
    }
    ctx.fillStyle='rgba(18,9,0,0.92)'; ctx.beginPath(); ctx.ellipse(tx,ty-42,8,12,0,0,Math.PI*2); ctx.fill(); ctx.fillRect(tx-7,ty-30,14,24);
    ctx.beginPath(); ctx.ellipse(tx,ty-56,7,8,0,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle='rgba(18,9,0,0.92)'; ctx.lineWidth=4.5; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(tx-7,ty-35); ctx.lineTo(tx-22,ty-48); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(tx+7,ty-35); ctx.lineTo(tx+22,ty-48); ctx.stroke();
    const sg=ctx.createRadialGradient(tx,ty,0,tx,ty,82); sg.addColorStop(0,'rgba(195,75,215,0.1)'); sg.addColorStop(1,'transparent'); ctx.fillStyle=sg; ctx.beginPath(); ctx.arc(tx,ty,82,0,Math.PI*2); ctx.fill();
    // FIRE PERFORMER (right)
    const fpx=W*0.72,fpy=H*0.72;
    arcs.forEach(arc=>{ arc.angle+=arc.speed; const maxR=68;
      const hx=fpx+Math.cos(arc.angle)*maxR; const hy=fpy-28+Math.sin(arc.angle)*maxR*0.42;
      for(let tr=0;tr<9;tr++){ const frac=tr/9; const pa=arc.angle-frac*0.55; const pr=maxR*(0.65+frac*0.35); const px=fpx+Math.cos(pa)*pr; const py=fpy-28+Math.sin(pa)*pr*0.42; const fc=['rgba(255,75,0','rgba(255,145,0','rgba(255,215,45'][Math.floor(Math.random()*3)]; ctx.fillStyle=`${fc},${(1-frac)*0.72})`; ctx.beginPath(); ctx.arc(px,py,4*(1-frac)+2,0,Math.PI*2); ctx.fill(); }
      const fg2=ctx.createRadialGradient(hx,hy,0,hx,hy,18); fg2.addColorStop(0,'rgba(255,195,45,0.94)'); fg2.addColorStop(0.4,'rgba(255,75,0,0.5)'); fg2.addColorStop(1,'transparent'); ctx.fillStyle=fg2; ctx.beginPath(); ctx.arc(hx,hy,18,0,Math.PI*2); ctx.fill();
    });
    ctx.fillStyle='rgba(4,1,0,0.93)'; ctx.beginPath(); ctx.ellipse(fpx,fpy-48,7,9,0,0,Math.PI*2); ctx.fill(); ctx.fillRect(fpx-7,fpy-38,14,24);
    ctx.strokeStyle='rgba(4,1,0,0.93)'; ctx.lineWidth=5; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(fpx-7,fpy-28); ctx.lineTo(fpx+Math.cos(t*2+Math.PI*1.1)*40,fpy-28+Math.sin(t*2+Math.PI*1.1)*26); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(fpx+7,fpy-28); ctx.lineTo(fpx+Math.cos(t*2+0.2)*42,fpy-28+Math.sin(t*2+0.2)*29); ctx.stroke();
    // Music notes
    notes.forEach(n=>{ n.y+=n.vy; n.ph+=0.03; if(n.y<-0.05) n.y=0.96; ctx.save(); ctx.globalAlpha=n.a*(0.5+0.5*Math.sin(n.ph)); ctx.font=`${n.sz}px serif`; ctx.fillStyle='#F59E0B'; ctx.textAlign='center'; ctx.fillText(n.note,n.x*W,n.y*H); ctx.restore(); });
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Animation of a Tanoura dancer spinning a colourful skirt alongside a fire performer under desert stars" />;
}

// ── 6. MILKY WAY NIGHT SKY ────────────────────────────────────
export function BlogAnim_MilkyWay(){
  const CONS=[
    {dots:[{x:0.12,y:0.24},{x:0.16,y:0.19},{x:0.20,y:0.23},{x:0.18,y:0.30}]},
    {dots:[{x:0.56,y:0.15},{x:0.61,y:0.12},{x:0.66,y:0.16},{x:0.63,y:0.23},{x:0.58,y:0.25}]},
    {dots:[{x:0.79,y:0.31},{x:0.83,y:0.27},{x:0.87,y:0.31},{x:0.85,y:0.38}]},
  ];
  const LAYERS=[
    Array.from({length:190},()=>({x:Math.random(),y:Math.random(),s:0.3+Math.random()*0.9,a:0.12+Math.random()*0.42,ph:Math.random()*Math.PI*2})),
    Array.from({length:85},()=>({x:Math.random(),y:Math.random(),s:0.8+Math.random()*1.6,a:0.28+Math.random()*0.48,ph:Math.random()*Math.PI*2})),
    Array.from({length:22},()=>({x:Math.random(),y:Math.random(),s:1.6+Math.random()*2.2,a:0.5+Math.random()*0.5,ph:Math.random()*Math.PI*2})),
  ];
  const shootRef=useRef(Array.from({length:5},(_,i)=>({x:Math.random(),y:Math.random()*0.42,prog:Math.random(),speed:0.007+Math.random()*0.006,angle:0.38+Math.random()*0.22,delay:i*70,frame:0})));
  const ref = useCanvas((ctx,W,H,t)=>{
    const shoots=shootRef.current;
    ctx.fillStyle='#010104'; ctx.fillRect(0,0,W,H);
    // Milky Way band
    ctx.save(); ctx.translate(W*0.5,H*0.5); ctx.rotate(-0.33);
    const mw=ctx.createLinearGradient(-W*0.65,-45,W*0.65,45); mw.addColorStop(0,'transparent'); mw.addColorStop(0.28,'rgba(175,155,215,0.04)'); mw.addColorStop(0.5,'rgba(195,175,255,0.09)'); mw.addColorStop(0.72,'rgba(175,155,215,0.04)'); mw.addColorStop(1,'transparent'); ctx.fillStyle=mw; ctx.fillRect(-W*0.65,-52,W*1.3,104); ctx.restore();
    // Milky glow micro-dots
    for(let i=0;i<45;i++){ const mx=W*(0.18+i/45*0.64+Math.sin(i*0.72)*0.06),my=H*(0.12+Math.cos(i*0.88)*0.36+i/45*0.22); ctx.fillStyle=`rgba(195,175,255,${0.02+Math.sin(t+i)*0.014})`; ctx.beginPath(); ctx.arc(mx,my,2+Math.random()*3,0,Math.PI*2); ctx.fill(); }
    // Stars
    LAYERS.forEach(layer=>layer.forEach(s=>{ const a=s.a*(0.38+0.62*Math.sin(t*1.3+s.ph)); ctx.fillStyle=`rgba(255,255,255,${a})`; ctx.beginPath(); ctx.arc(s.x*W,s.y*H,s.s,0,Math.PI*2); ctx.fill(); }));
    // Constellations
    CONS.forEach(c=>{ c.dots.forEach(d=>{ ctx.fillStyle='rgba(195,215,255,0.72)'; ctx.beginPath(); ctx.arc(d.x*W,d.y*H,1.6,0,Math.PI*2); ctx.fill(); }); ctx.strokeStyle='rgba(145,175,255,0.15)'; ctx.lineWidth=1; ctx.beginPath(); c.dots.forEach((d,i)=>i===0?ctx.moveTo(d.x*W,d.y*H):ctx.lineTo(d.x*W,d.y*H)); ctx.stroke(); });
    // Shooting stars
    shoots.forEach(s=>{ s.frame++; if(s.frame<s.delay) return; s.prog=(s.prog+s.speed)%1; const sx=s.x*W+s.prog*W*0.55*Math.cos(s.angle),sy=s.y*H+s.prog*H*0.5*Math.sin(s.angle); const ex=sx-65*Math.cos(s.angle),ey=sy-65*Math.sin(s.angle); const gl=ctx.createLinearGradient(ex,ey,sx,sy); gl.addColorStop(0,'transparent'); gl.addColorStop(1,`rgba(255,255,255,${0.58+Math.sin(t*3)*0.28})`); ctx.strokeStyle=gl; ctx.lineWidth=1.6; ctx.beginPath(); ctx.moveTo(ex,ey); ctx.lineTo(sx,sy); ctx.stroke(); const hg=ctx.createRadialGradient(sx,sy,0,sx,sy,5); hg.addColorStop(0,'rgba(255,255,255,0.92)'); hg.addColorStop(1,'transparent'); ctx.fillStyle=hg; ctx.beginPath(); ctx.arc(sx,sy,5,0,Math.PI*2); ctx.fill(); });
    // Dune silhouette
    ctx.fillStyle='rgba(13,5,0,0.93)'; ctx.beginPath(); ctx.moveTo(0,H);
    for(let x=0;x<=W;x+=8){ ctx.lineTo(x,H*0.84+Math.sin(x*0.008)*15+Math.sin(x*0.019)*8); }
    ctx.lineTo(W,H); ctx.closePath(); ctx.fill();
    ctx.font=`bold ${W>600?10:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(175,155,255,0.32)'; ctx.textAlign='center'; ctx.fillText('MILKY WAY — DUBAI DESERT CONSERVATION RESERVE',W*0.5,H*0.28);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Animation of the Milky Way galaxy visible from the Dubai Desert Conservation Reserve with shooting stars and constellation lines" />;
}
