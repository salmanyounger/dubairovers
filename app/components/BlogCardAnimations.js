'use client';
import { useEffect, useRef } from 'react';

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
//  BlogCardCanvas \u2014 lightweight thumbnail animations for blog cards
//  One unique animation per blog, optimised for ~300\u00d7200px display
//  All animations intentionally simple: no heavy particle systems
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

// Shared canvas hook \u2014 lightweight, 30fps target
function useThumbCanvas(drawFn) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext('2d');
    let raf, t = 0, last = 0;
    const rsz = () => { cv.width = cv.offsetWidth || 300; cv.height = cv.offsetHeight || 195; };
    rsz();
    const ro = new ResizeObserver(rsz); ro.observe(cv);
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 33) return; // ~30fps
      last = now; t += 0.018;
      drawFn(ctx, cv.width, cv.height, t);
    };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return ref;
}

// \u2500\u2500 SHARED HELPERS \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
const dunes = (ctx, W, H, t, color='#8B3200', layers=2) => {
  ['#8B3200','#6B2200'].slice(0,layers).forEach((c,i)=>{
    ctx.fillStyle=c; ctx.beginPath(); ctx.moveTo(0,H);
    for(let x=0;x<=W;x+=8) ctx.lineTo(x,H*(0.55+i*.1)+Math.sin(x*.01+t*(.18-i*.04)+i)*18+Math.cos(x*.022+i)*10);
    ctx.lineTo(W,H); ctx.closePath(); ctx.fill();
  });
};
const stars = (ctx, W, H, t, count=50, maxY=0.55) => {
  for(let i=0;i<count;i++){
    ctx.fillStyle=`rgba(255,255,255,${.08+Math.sin(t*1.2+i)*.06})`;
    ctx.beginPath(); ctx.arc((i*173)%W,(i*89)%(H*maxY),.7+(i%3)*.2,0,Math.PI*2); ctx.fill();
  }
};
const sunsetSky = (ctx, W, H) => {
  const g=ctx.createLinearGradient(0,0,0,H);
  g.addColorStop(0,'#010208'); g.addColorStop(.4,'#07050F'); g.addColorStop(.7,'#1E0C00'); g.addColorStop(1,'#C1460E');
  ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
};
const nightSky = (ctx, W, H) => {
  const g=ctx.createLinearGradient(0,0,0,H);
  g.addColorStop(0,'#000208'); g.addColorStop(.6,'#020410'); g.addColorStop(1,'#040218');
  ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
};

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
//  DESERT SAFARI THUMBNAILS
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

// city-to-desert \u2192 blog01 Evening Safari
export function ThumbAnim_CityToDesert() {
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    sunsetSky(ctx,W,H); dunes(ctx,W,H,t);
    // Silhouette city strip left
    const fade=Math.max(0,.8-t*.008);
    ctx.save(); ctx.globalAlpha=fade;
    [.04,.08,.13,.17,.22].forEach((x,i)=>{
      const bh=H*(.18+Math.sin(i*2.1)*.08);
      ctx.fillStyle='rgba(5,3,12,.95)'; ctx.fillRect(W*x,H*.55-bh,W*.028,bh);
    });
    ctx.restore();
    // Sun glow
    const sg=ctx.createRadialGradient(W*.5,H*.62,0,W*.5,H*.62,W*.3);
    sg.addColorStop(0,'rgba(245,130,20,.4)'); sg.addColorStop(1,'transparent');
    ctx.fillStyle=sg; ctx.fillRect(0,0,W,H);
    // Label
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(245,158,11,.6)'; ctx.textAlign='center';
    ctx.fillText('\ud83c\udfdc\ufe0f EVENING DESERT SAFARI',W*.5,H*.1);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// seasonal-wheel \u2192 blog02 Best Time
export function ThumbAnim_SeasonalWheel() {
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    ctx.fillStyle='#030608'; ctx.fillRect(0,0,W,H);
    const cx=W*.5,cy=H*.52,r=Math.min(W*.32,H*.4);
    const MONTHS=['J','F','M','A','M','J','J','A','S','O','N','D'];
    const BEST=[1,1,0,0,0,0,0,0,0,1,1,1];
    MONTHS.forEach((m,i)=>{
      const a1=i/12*Math.PI*2-Math.PI*.5, a2=(i+.85)/12*Math.PI*2-Math.PI*.5;
      ctx.fillStyle=BEST[i]?`rgba(245,158,11,${.18+Math.sin(t*1.5+i)*.07})`:'rgba(100,60,20,.12)';
      ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,r,a1,a2); ctx.closePath(); ctx.fill();
      ctx.strokeStyle=BEST[i]?`rgba(245,158,11,.7)`:'rgba(255,255,255,.06)'; ctx.lineWidth=BEST[i]?1.2:.4;
      ctx.beginPath(); ctx.moveTo(cx,cy); ctx.arc(cx,cy,r,a1,a2); ctx.closePath(); ctx.stroke();
      const la=(i+.42)/12*Math.PI*2-Math.PI*.5;
      ctx.font=`${BEST[i]?'700':'400'} ${W>250?9:8}px Outfit,sans-serif`;
      ctx.fillStyle=BEST[i]?'#F59E0B':'rgba(255,255,255,.4)'; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(m,cx+Math.cos(la)*r*.72,cy+Math.sin(la)*r*.72);
    });
    ctx.textBaseline='alphabetic';
    ctx.font=`700 ${W>250?9:8}px Outfit,sans-serif`; ctx.fillStyle='#F59E0B'; ctx.textAlign='center';
    ctx.fillText('BEST',cx,cy-4); ctx.fillText('SEASON',cx,cy+8);
    ctx.fillText('\ud83d\uddd3\ufe0f BEST TIME TO VISIT',W*.5,H*.1);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// outfit-float \u2192 blog03 What to Wear
export function ThumbAnim_OutfitFloat() {
  const ITEMS=['\ud83d\udc5f','\ud83e\udde3','\ud83e\uddf4','\ud83d\udc52','\ud83c\udf92','\ud83d\udc8a','\ud83d\udc53','\ud83e\udde5'];
  const itemsRef=useRef(ITEMS.map((e,i)=>({e,x:.08+i*.12,y:.25+Math.sin(i*1.3)*.35,ph:i*.8,vy:(Math.random()-.5)*.0008,vx:(Math.random()-.5)*.0005})));
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    const bg=ctx.createLinearGradient(0,0,W,H);
    bg.addColorStop(0,'#080510'); bg.addColorStop(1,'#100808');
    ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
    const glow=ctx.createRadialGradient(W*.5,H*.5,0,W*.5,H*.5,W*.45);
    glow.addColorStop(0,'rgba(245,158,11,.06)'); glow.addColorStop(1,'transparent');
    ctx.fillStyle=glow; ctx.fillRect(0,0,W,H);
    itemsRef.current.forEach(it=>{
      it.ph+=.02; it.x+=it.vx; it.y+=it.vy;
      if(it.x<.02)it.vx=Math.abs(it.vx); if(it.x>.96)it.vx=-Math.abs(it.vx);
      if(it.y<.1)it.vy=Math.abs(it.vy); if(it.y>.88)it.vy=-Math.abs(it.vy);
      const alpha=.5+.45*Math.sin(it.ph);
      ctx.save(); ctx.globalAlpha=alpha;
      ctx.font=`${W>250?18:14}px serif`; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(it.e,it.x*W,it.y*H+Math.sin(it.ph)*5); ctx.restore();
    });
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(245,158,11,.6)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\ud83c\udf92 WHAT TO WEAR & PACK',W*.5,H*.1);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// family-desert \u2192 blog04 Safari with Kids
export function ThumbAnim_FamilyDesert() {
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    sunsetSky(ctx,W,H); dunes(ctx,W,H,t);
    const sg=ctx.createRadialGradient(W*.5,H*.65,0,W*.5,H*.65,W*.4);
    sg.addColorStop(0,'rgba(245,130,20,.35)'); sg.addColorStop(1,'transparent');
    ctx.fillStyle=sg; ctx.fillRect(0,0,W,H);
    // Camel + 2 kids silhouette
    const cx=W*.45+Math.sin(t*.3)*W*.04, cy=H*.7;
    ctx.fillStyle='rgba(5,2,0,.92)';
    ctx.beginPath(); ctx.ellipse(cx,cy-12,22,12,0,0,Math.PI*2); ctx.fill();
    [[-6,-27,10,8],[9,-25,8,6]].forEach(([ex,ey,rx,ry])=>{ctx.beginPath();ctx.ellipse(cx+ex,cy+ey,rx,ry,0,0,Math.PI*2);ctx.fill();});
    ctx.strokeStyle='rgba(5,2,0,.9)'; ctx.lineWidth=6; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(cx+22,cy-8); ctx.lineTo(cx+30,cy+2); ctx.stroke();
    ctx.fillStyle='rgba(255,220,180,.88)'; ctx.beginPath(); ctx.arc(cx,cy-38,6,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#E05030'; ctx.fillRect(cx-5,cy-32,10,14);
    // Hearts
    ['\u2764\ufe0f','\ud83d\ude04'].forEach((e,i)=>{
      ctx.save(); ctx.globalAlpha=.4+.35*Math.sin(t*2+i);
      ctx.font='12px serif'; ctx.textAlign='center';
      ctx.fillText(e,cx+(i===0?-20:20),cy-50+Math.sin(t*1.5+i)*8); ctx.restore();
    });
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(245,158,11,.6)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67 SAFARI WITH KIDS',W*.5,H*.1);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// morning-vs-evening \u2192 blog05
export function ThumbAnim_MorningVsEvening() {
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    const mid=W*.5;
    ctx.save(); ctx.beginPath(); ctx.rect(0,0,mid,H); ctx.clip();
    const ms=ctx.createLinearGradient(0,0,0,H); ms.addColorStop(0,'#010A1A'); ms.addColorStop(.6,'#C06010'); ms.addColorStop(1,'#8B3200');
    ctx.fillStyle=ms; ctx.fillRect(0,0,mid,H);
    const sunY=H*(.7-Math.min(1,t*.04)*.2);
    const sg=ctx.createRadialGradient(mid*.5,sunY,0,mid*.5,sunY,30); sg.addColorStop(0,'rgba(255,220,100,.85)'); sg.addColorStop(1,'transparent');
    ctx.fillStyle=sg; ctx.fillRect(0,0,mid,H);
    ctx.font=`700 ${W>250?10:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,200,80,.8)'; ctx.textAlign='center'; ctx.fillText('\ud83c\udf05 MORNING',mid*.5,H*.88);
    ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(mid,0,mid,H); ctx.clip();
    const es=ctx.createLinearGradient(0,0,0,H); es.addColorStop(0,'#050210'); es.addColorStop(.5,'#1E0800'); es.addColorStop(1,'#C1460E');
    ctx.fillStyle=es; ctx.fillRect(mid,0,mid,H);
    stars(ctx,mid,H,t,25,.5);
    ctx.font=`700 ${W>250?10:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(245,158,11,.8)'; ctx.textAlign='center'; ctx.fillText('\ud83c\udf06 EVENING',mid+mid*.5,H*.88);
    ctx.restore();
    ctx.strokeStyle='rgba(255,255,255,.15)'; ctx.lineWidth=1; ctx.setLineDash([4,8]);
    ctx.beginPath(); ctx.moveTo(mid,0); ctx.lineTo(mid,H); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle='rgba(5,3,12,.9)'; ctx.beginPath(); ctx.arc(mid,H*.5,14,0,Math.PI*2); ctx.fill();
    ctx.font=`800 9px Outfit,sans-serif`; ctx.fillStyle='#fff'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText('VS',mid,H*.5); ctx.textBaseline='alphabetic';
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.4)'; ctx.textAlign='center'; ctx.fillText('MORNING VS EVENING',W*.5,H*.08);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// overnight-tent \u2192 blog06
export function ThumbAnim_OvernightTent() {
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    nightSky(ctx,W,H); stars(ctx,W,H,t,80,.7);
    // Milky way
    ctx.save(); ctx.translate(W*.5,H*.35); ctx.rotate(-.3);
    const mw=ctx.createLinearGradient(-W*.6,-25,W*.6,25); mw.addColorStop(0,'transparent'); mw.addColorStop(.5,'rgba(195,175,255,.08)'); mw.addColorStop(1,'transparent');
    ctx.fillStyle=mw; ctx.fillRect(-W*.6,-30,W*1.2,60); ctx.restore();
    // Ground
    ctx.fillStyle='#070402'; ctx.fillRect(0,H*.72,W,H);
    // Tent silhouette
    const tx=W*.5,ty=H*.74;
    ctx.fillStyle='rgba(30,12,4,.95)';
    ctx.beginPath(); ctx.moveTo(tx-W*.2,ty); ctx.lineTo(tx,ty-H*.2); ctx.lineTo(tx+W*.2,ty); ctx.closePath(); ctx.fill();
    ctx.strokeStyle='rgba(180,100,20,.4)'; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(tx-W*.2,ty); ctx.lineTo(tx,ty-H*.2); ctx.lineTo(tx+W*.2,ty); ctx.stroke();
    // Fire glow
    const fg=ctx.createRadialGradient(tx,ty+H*.08,0,tx,ty+H*.08,W*.1);
    fg.addColorStop(0,'rgba(215,90,15,.3)'); fg.addColorStop(1,'transparent');
    ctx.fillStyle=fg; ctx.fillRect(tx-W*.1,ty,W*.2,H*.1);
    ctx.fillStyle=`rgba(255,${100+Math.floor(Math.sin(t*4)*40)},20,.8)`; ctx.beginPath(); ctx.arc(tx,ty+H*.06,3,0,Math.PI*2); ctx.fill();
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(180,155,255,.55)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\ud83c\udfd5\ufe0f OVERNIGHT DESERT SAFARI',W*.5,H*.07);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// wildlife-dots \u2192 blog07 Conservation Reserve
export function ThumbAnim_WildlifeDots() {
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    ctx.fillStyle='#030608'; ctx.fillRect(0,0,W,H);
    for(let i=0;i<50;i++){const a=.04+Math.sin(t*.5+i)*.02; ctx.fillStyle=`rgba(80,180,120,${a})`; ctx.beginPath(); ctx.arc((i*173)%W,(i*89)%H,1.2,0,Math.PI*2); ctx.fill();}
    // Dune terrain
    ctx.fillStyle='rgba(80,40,10,.3)'; ctx.beginPath(); ctx.moveTo(0,H);
    for(let x=0;x<=W;x+=8) ctx.lineTo(x,H*.6+Math.sin(x*.009+t*.1)*14+Math.cos(x*.02)*8);
    ctx.lineTo(W,H); ctx.closePath(); ctx.fill();
    // Oryx silhouette
    const ox=W*(.2+(t*.015)%0.6),oy=H*.7;
    ctx.fillStyle='rgba(240,230,210,.75)';
    ctx.beginPath(); ctx.ellipse(ox,oy-10,18,10,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(ox+15,oy-16,8,5,.3,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle='rgba(240,230,210,.75)'; ctx.lineWidth=4; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(ox+15,oy-20); ctx.lineTo(ox+17,oy-32); ctx.stroke();
    // Falcon circling
    const fa=t*.8, fr=W*.25;
    ctx.fillStyle='rgba(80,60,40,.8)'; ctx.save();
    ctx.translate(W*.5+Math.cos(fa)*fr, H*.3+Math.sin(fa)*fr*.35); ctx.rotate(fa+Math.PI*.5);
    ctx.beginPath(); ctx.ellipse(0,0,9,4,0,0,Math.PI*2); ctx.fill(); ctx.restore();
    ctx.strokeStyle='rgba(0,180,120,.2)'; ctx.lineWidth=1; ctx.setLineDash([4,12]);
    ctx.beginPath(); ctx.rect(W*.05,H*.05,W*.9,H*.88); ctx.stroke(); ctx.setLineDash([]);
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(80,200,120,.6)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\ud83e\udd8c CONSERVATION RESERVE',W*.5,H*.08);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
//  HOT AIR BALLOON THUMBNAILS
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

function drawThumbBalloon(ctx, W, H, t, cx, cy, scale=1, colors=['#E53E3E','#F59E0B','#3182CE','#38A169']) {
  const bw=W*.12*scale, bh=H*.22*scale;
  const panels=4;
  ctx.save(); ctx.beginPath(); ctx.ellipse(cx,cy,bw,bh,0,0,Math.PI*2); ctx.clip();
  colors.forEach((c,i)=>{const a1=i/panels*Math.PI*2-Math.PI*.5;const a2=(i+1)/panels*Math.PI*2-Math.PI*.5;ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,Math.max(bw,bh),a1,a2);ctx.closePath();ctx.fill();});
  ctx.restore();
  const hl=ctx.createRadialGradient(cx-bw*.3,cy-bh*.3,0,cx,cy,bw*1.2);
  hl.addColorStop(0,'rgba(255,255,255,.2)'); hl.addColorStop(1,'transparent');
  ctx.fillStyle=hl; ctx.beginPath(); ctx.ellipse(cx,cy,bw,bh,0,0,Math.PI*2); ctx.fill();
  ctx.strokeStyle='rgba(0,0,0,.3)'; ctx.lineWidth=1; ctx.beginPath(); ctx.ellipse(cx,cy,bw,bh,0,0,Math.PI*2); ctx.stroke();
  // Basket
  const baskY=cy+bh+H*.02*scale;
  ctx.fillStyle='rgba(80,40,15,.9)'; if(ctx.roundRect){ctx.beginPath();ctx.roundRect(cx-bw*.35,baskY,bw*.7,H*.06*scale,3);ctx.fill();}
  // Ropes
  ctx.strokeStyle='rgba(160,100,30,.6)'; ctx.lineWidth=.8;
  [[-bw*.3,baskY],[bw*.3,baskY]].forEach(([rx,ry])=>{ctx.beginPath();ctx.moveTo(cx+rx*.2,cy+bh);ctx.lineTo(cx+rx,ry);ctx.stroke();});
}

// balloon-launch \u2192 blog08
export function ThumbAnim_BalloonLaunch() {
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    const sky=ctx.createLinearGradient(0,0,0,H); sky.addColorStop(0,'#000008'); sky.addColorStop(.6,'#040210'); sky.addColorStop(1,'#180A00');
    ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
    stars(ctx,W,H,t,60,.6);
    ctx.fillStyle='rgba(25,12,0,.95)'; ctx.fillRect(0,H*.75,W,H);
    const inflate=Math.min(1,t*.05);
    const liftY=H*(.5-inflate*.18);
    // Crew headlamps
    [[W*.3,H*.8],[W*.6,H*.79],[W*.75,H*.81]].forEach(([px,py])=>{
      const lg=ctx.createRadialGradient(px,py-8,0,px,py-8,25); lg.addColorStop(0,'rgba(255,240,180,.25)'); lg.addColorStop(1,'transparent');
      ctx.fillStyle=lg; ctx.fillRect(px-25,py-30,50,35);
      ctx.fillStyle='rgba(8,4,0,.9)'; ctx.beginPath(); ctx.arc(px,py-18,5,0,Math.PI*2); ctx.fill(); ctx.fillRect(px-3,py-13,6,14);
    });
    drawThumbBalloon(ctx,W,H,t,W*.5,liftY,inflate);
    // Burner glow
    const bg=ctx.createRadialGradient(W*.5,liftY+H*.22,0,W*.5,liftY+H*.22,15);
    bg.addColorStop(0,'rgba(255,150,30,.6)'); bg.addColorStop(1,'transparent');
    ctx.fillStyle=bg; ctx.fillRect(W*.35,liftY+H*.18,W*.3,20);
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,200,50,.6)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\ud83c\udf88 HOT AIR BALLOON DUBAI',W*.5,H*.07);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// golden-horizon \u2192 blog09 Worth It?
export function ThumbAnim_GoldenHorizon() {
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    const sky=ctx.createLinearGradient(0,0,0,H); sky.addColorStop(0,'#020108'); sky.addColorStop(.4,'#200C00'); sky.addColorStop(.7,'#A03800'); sky.addColorStop(1,'#F09030');
    ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
    stars(ctx,W,H,t,30,.35);
    // 3 balloon silhouettes
    [[.28,.38,.8],[.5,.3,1.1],[.72,.42,.7]].forEach(([xf,yf,sc],i)=>{
      const by=H*(yf+Math.sin(t*.4+i)*.015);
      ctx.fillStyle='rgba(5,2,0,.88)';
      const bw=W*.07*sc, bh=H*.14*sc;
      ctx.beginPath(); ctx.ellipse(W*xf,by,bw,bh,0,0,Math.PI*2); ctx.fill();
      ctx.fillRect(W*xf-bw*.3,by+bh,bw*.6,bh*.22);
    });
    // Dune silhouette
    ctx.fillStyle='rgba(5,2,0,.97)'; ctx.beginPath(); ctx.moveTo(0,H);
    for(let x=0;x<=W;x+=8) ctx.lineTo(x,H*.76+Math.sin(x*.007+t*.08)*16+Math.cos(x*.018)*10);
    ctx.lineTo(W,H); ctx.closePath(); ctx.fill();
    // Sun glow
    const sg=ctx.createRadialGradient(W*.5,H*.7,0,W*.5,H*.7,W*.3); sg.addColorStop(0,'rgba(255,150,30,.4)'); sg.addColorStop(1,'transparent');
    ctx.fillStyle=sg; ctx.fillRect(0,0,W,H);
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,200,80,.6)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\ud83c\udf88 IS IT WORTH AED 895?',W*.5,H*.07);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// weather-radar \u2192 blog10
export function ThumbAnim_WeatherRadar() {
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    ctx.fillStyle='#020508'; ctx.fillRect(0,0,W,H);
    const cx=W*.5,cy=H*.52,r=Math.min(W*.35,H*.42);
    for(let i=1;i<=3;i++){ctx.strokeStyle=`rgba(0,200,100,.06)`;ctx.lineWidth=.8;ctx.beginPath();ctx.arc(cx,cy,r*i/3,0,Math.PI*2);ctx.stroke();}
    // Sweep
    const sw=t*1.5;
    for(let i=0;i<20;i++){const a=sw-i*.06; ctx.strokeStyle=`rgba(0,220,80,${(1-i/20)*.4})`;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*r,cy+Math.sin(a)*r);ctx.stroke();}
    // Wind gauge
    const wind=12+Math.sin(t*.3)*7;
    const wn=wind/30;
    ctx.strokeStyle='rgba(255,255,255,.1)'; ctx.lineWidth=6; ctx.beginPath(); ctx.arc(cx,cy,r*.55,Math.PI,Math.PI*2); ctx.stroke();
    ctx.strokeStyle=wind<18?'rgba(0,220,80,.8)':'rgba(245,158,11,.8)'; ctx.lineWidth=6; ctx.beginPath(); ctx.arc(cx,cy,r*.55,Math.PI,Math.PI*(1+wn)); ctx.stroke();
    const isGo=wind<20;
    ctx.fillStyle=isGo?'rgba(0,200,80,.15)':'rgba(220,40,30,.15)'; ctx.strokeStyle=isGo?'rgba(0,200,80,.5)':'rgba(220,40,30,.5)'; ctx.lineWidth=1;
    if(ctx.roundRect){ctx.beginPath();ctx.roundRect(cx-40,H*.8,80,18,9);ctx.fill();ctx.stroke();}
    ctx.font=`700 9px Outfit,sans-serif`; ctx.fillStyle=isGo?'rgba(0,220,80,.9)':'rgba(220,40,30,.9)'; ctx.textAlign='center';
    ctx.fillText(isGo?'\u2705 GO FLIGHT':'\u274c HOLD',cx,H*.81+12);
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(0,200,100,.5)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\ud83c\udf26\ufe0f WEATHER CANCELLATION GUIDE',W*.5,H*.07);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// pre-dawn-dark \u2192 blog11
export function ThumbAnim_PreDawn() {
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    ctx.fillStyle='#000001'; ctx.fillRect(0,0,W,H);
    stars(ctx,W,H,t,120,.85);
    // Moon
    const mg=ctx.createRadialGradient(W*.15,H*.15,0,W*.15,H*.15,18); mg.addColorStop(0,'rgba(255,248,220,.9)'); mg.addColorStop(1,'transparent');
    ctx.fillStyle=mg; ctx.beginPath(); ctx.arc(W*.15,H*.15,18,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='rgba(0,0,1,.97)'; ctx.beginPath(); ctx.arc(W*.15+7,H*.15-4,14,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#060402'; ctx.fillRect(0,H*.78,W,H);
    // Headlamps
    [[W*.35,H*.82],[W*.55,H*.81],[W*.7,H*.83]].forEach(([px,py])=>{
      const lg=ctx.createRadialGradient(px,py-8,0,px,py-8,22); lg.addColorStop(0,'rgba(255,240,180,.22)'); lg.addColorStop(1,'transparent');
      ctx.fillStyle=lg; ctx.fillRect(px-22,py-28,44,30);
      ctx.fillStyle='rgba(6,3,0,.92)'; ctx.beginPath(); ctx.arc(px,py-16,4,0,Math.PI*2); ctx.fill();
    });
    // 4AM clock
    ctx.fillStyle='rgba(255,255,255,.07)'; ctx.strokeStyle='rgba(255,255,255,.18)'; ctx.lineWidth=1;
    if(ctx.roundRect){ctx.beginPath();ctx.roundRect(W*.5-32,H*.06,64,22,11);ctx.fill();ctx.stroke();}
    ctx.font=`700 ${W>250?12:10}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.85)'; ctx.textAlign='center';
    ctx.fillText('4:00 AM',W*.5,H*.07+14);
    ctx.font=`600 ${W>250?9:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,200,80,.5)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\u23f0 WHY 4AM IS WORTH IT',W*.5,H*.97);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// romance-balloon \u2192 blog12
export function ThumbAnim_RomanceBalloon() {
  const heartsRef=useRef(Array.from({length:10},(_,i)=>({x:.25+Math.random()*.5,y:.3+Math.random()*.5,vy:-.002-.001*Math.random(),ph:Math.random()*Math.PI*2,size:8+Math.random()*10})));
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    const sky=ctx.createLinearGradient(0,0,W,H); sky.addColorStop(0,'#050010'); sky.addColorStop(.5,'#10041A'); sky.addColorStop(1,'#300A08');
    ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
    stars(ctx,W,H,t,50,.7);
    drawThumbBalloon(ctx,W,H,t,W*.4,H*.42,1,['#C2185B','#E91E63','#AD1457','#F06292']);
    // Couple silhouette in basket
    const baskY=H*.42+H*.22+H*.02;
    ctx.fillStyle='rgba(10,2,5,.95)';
    ctx.beginPath(); ctx.arc(W*.38,baskY-4,4,0,Math.PI*2); ctx.fill(); ctx.fillRect(W*.375,baskY,6,12);
    ctx.beginPath(); ctx.arc(W*.42,baskY-4,4,0,Math.PI*2); ctx.fill(); ctx.fillRect(W*.415,baskY,6,12);
    // Ring box
    ctx.fillStyle='rgba(100,30,50,.9)'; ctx.strokeStyle='rgba(245,158,11,.7)'; ctx.lineWidth=1;
    if(ctx.roundRect){ctx.beginPath();ctx.roundRect(W*.43,baskY-3,12,9,2);ctx.fill();ctx.stroke();}
    // Hearts
    heartsRef.current.forEach(h=>{h.y+=h.vy;h.ph+=.025;if(h.y<-.05)h.y=.95;
      ctx.save();ctx.globalAlpha=.35+.35*Math.sin(h.ph);ctx.font=`${h.size}px serif`;ctx.textAlign='center';ctx.fillText('\u2764\ufe0f',h.x*W,h.y*H);ctx.restore();
    });
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,150,180,.6)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\ud83d\udc8d PROPOSE IN A BALLOON',W*.5,H*.07);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// safety-gauge \u2192 blog13
export function ThumbAnim_SafetyGauge() {
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    ctx.fillStyle='#020406'; ctx.fillRect(0,0,W,H);
    // Weight gauge
    const gx=W*.32,gy=H*.55,gr=Math.min(W*.22,H*.32);
    ctx.strokeStyle='rgba(255,255,255,.1)'; ctx.lineWidth=7; ctx.beginPath(); ctx.arc(gx,gy,gr,Math.PI,Math.PI*2); ctx.stroke();
    const wn=.55+Math.sin(t*.3)*.04;
    ctx.strokeStyle='rgba(0,200,100,.8)'; ctx.lineWidth=7; ctx.beginPath(); ctx.arc(gx,gy,gr,Math.PI,Math.PI*(1+wn)); ctx.stroke();
    ctx.font=`700 ${W>250?14:11}px Outfit,sans-serif`; ctx.fillStyle='#fff'; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText(Math.round(75+Math.sin(t*.3)*5)+'kg',gx,gy+4); ctx.textBaseline='alphabetic';
    ctx.font=`500 9px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.4)'; ctx.fillText('MAX 120kg',gx,gy+20);
    // Checklist
    const checks=['Age 7+','Weight <120kg','No heart conditions','Height 1.2m+'];
    checks.forEach((c,i)=>{
      const alpha=Math.min(1,Math.max(0,(t*.6-i*.4)));
      ctx.save(); ctx.globalAlpha=alpha;
      ctx.fillStyle='rgba(0,200,80,.2)'; ctx.strokeStyle='rgba(0,200,80,.35)'; ctx.lineWidth=.8;
      if(ctx.roundRect){ctx.beginPath();ctx.roundRect(W*.54,H*(.22+i*.16),W*.4,16,8);ctx.fill();ctx.stroke();}
      ctx.font=`500 ${W>250?9:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.7)'; ctx.textAlign='left';
      ctx.fillText(`\u2713 ${c}`,W*.56,H*(.22+i*.16)+11);
      ctx.restore();
    });
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(0,200,100,.5)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\u2696\ufe0f AGE, WEIGHT & HEALTH',W*.5,H*.08);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// camera-lens \u2192 blog14
export function ThumbAnim_CameraLens() {
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    const sky=ctx.createLinearGradient(0,0,0,H); sky.addColorStop(0,'#010204'); sky.addColorStop(.5,'#1A0A00'); sky.addColorStop(1,'#8B3000');
    ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
    stars(ctx,W,H,t,30,.5);
    // Viewfinder
    const vf=.06,brd='rgba(255,255,255,.5)';
    ctx.strokeStyle=brd; ctx.lineWidth=1.5; ctx.strokeRect(W*vf,H*vf,W*(1-vf*2),H*(1-vf*2));
    ctx.strokeStyle='rgba(255,255,255,.1)'; ctx.lineWidth=.7;
    [.333,.667].forEach(f=>{ctx.beginPath();ctx.moveTo(W*(vf+f*(1-vf*2)),H*vf);ctx.lineTo(W*(vf+f*(1-vf*2)),H*(1-vf));ctx.stroke();ctx.beginPath();ctx.moveTo(W*vf,H*(vf+f*(1-vf*2)));ctx.lineTo(W*(1-vf),H*(vf+f*(1-vf*2)));ctx.stroke();});
    // Corner brackets
    const br=W*.05;
    [[W*vf,H*vf],[W*(1-vf),H*vf],[W*vf,H*(1-vf)],[W*(1-vf),H*(1-vf)]].forEach(([cx,cy],i)=>{
      const dx=i%2===0?1:-1,dy=i<2?1:-1;
      ctx.strokeStyle='rgba(245,158,11,.8)'; ctx.lineWidth=2;
      ctx.beginPath();ctx.moveTo(cx,cy+dy*br);ctx.lineTo(cx,cy);ctx.lineTo(cx+dx*br,cy);ctx.stroke();
    });
    // Focus dot
    const dot={x:W*(vf+.667*(1-vf*2)),y:H*(vf+.333*(1-vf*2))};
    ctx.strokeStyle=`rgba(245,158,11,${.5+Math.sin(t*3)*.3})`; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.arc(dot.x,dot.y,12,0,Math.PI*2); ctx.stroke();
    ctx.fillStyle='rgba(245,158,11,.8)'; ctx.beginPath(); ctx.arc(dot.x,dot.y,3,0,Math.PI*2); ctx.fill();
    // Settings bar
    ctx.fillStyle='rgba(0,0,0,.5)'; ctx.fillRect(W*vf,H*vf,W*(1-vf*2),18);
    ctx.font=`500 8px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.6)'; ctx.textAlign='left';
    ['f/8','ISO400','1/1000s'].forEach((s,i)=>ctx.fillText(s,W*vf+5+i*W*.22,H*vf+12));
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(245,158,11,.6)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\ud83d\udcf7 PHOTOGRAPHY TIPS',W*.5,H*.97);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
//  DHOW CRUISE THUMBNAILS
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

function drawDhow(ctx,W,H,dx,dy,lit=true){
  ctx.fillStyle='rgba(5,3,15,.97)';
  ctx.beginPath(); ctx.moveTo(dx-W*.09,dy); ctx.lineTo(dx+W*.1,dy); ctx.lineTo(dx+W*.12,dy+H*.04); ctx.lineTo(dx-W*.07,dy+H*.04); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(dx+W*.1,dy); ctx.lineTo(dx+W*.13,dy+H*.02); ctx.lineTo(dx+W*.12,dy+H*.04); ctx.closePath(); ctx.fill();
  ctx.fillRect(dx-W*.06,dy-H*.02,W*.12,H*.022);
  if(lit){for(let li=0;li<7;li++){const lx=dx-W*.07+li*W*.022;ctx.fillStyle=`rgba(255,220,100,.5)`;ctx.beginPath();ctx.arc(lx,dy-H*.006,1.5,0,Math.PI*2);ctx.fill();}}
}

// navigation-map \u2192 blog15 Marina vs Creek
export function ThumbAnim_NavigationMap() {
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    ctx.fillStyle='#030508'; ctx.fillRect(0,0,W,H);
    ctx.strokeStyle='rgba(0,150,200,.04)'; ctx.lineWidth=.8;
    for(let gx=0;gx<W;gx+=W/8){ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,H);ctx.stroke();}
    for(let gy=0;gy<H;gy+=H/5){ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(W,gy);ctx.stroke();}
    // Marina route (blue)
    const mp=(t*.12)%1;
    ctx.strokeStyle='rgba(0,180,255,.7)'; ctx.lineWidth=2;
    ctx.beginPath(); [[.12,.55],[.18,.48],[.22,.55],[.26,.6],[.22,.5],[.16,.46],[.12,.55]].forEach(([x,y],i)=>i===0?ctx.moveTo(x*W,y*H):ctx.lineTo(x*W,y*H)); ctx.stroke();
    const mi=[.12,.18,.22,.26,.22,.16,.12],mip=Math.floor(mp*mi.length);
    const mc={x:mi[mip%mi.length],y:[.55,.48,.55,.6,.5,.46,.55][mip%mi.length]};
    const mn={x:mi[(mip+1)%mi.length],y:[.55,.48,.55,.6,.5,.46,.55][(mip+1)%mi.length]};
    const mf=mp*mi.length-mip; const mbx=(mc.x+(mn.x-mc.x)*mf)*W, mby=(mc.y+(mn.y-mc.y)*mf)*H;
    const mbg=ctx.createRadialGradient(mbx,mby,0,mbx,mby,8); mbg.addColorStop(0,'rgba(0,180,255,.8)'); mbg.addColorStop(1,'transparent');
    ctx.fillStyle=mbg; ctx.beginPath(); ctx.arc(mbx,mby,8,0,Math.PI*2); ctx.fill();
    // Creek route (amber)
    const cp=(t*.1+.5)%1;
    ctx.strokeStyle='rgba(245,158,11,.7)'; ctx.lineWidth=2;
    ctx.beginPath(); [[.6,.48],[.65,.42],[.72,.4],[.78,.45],[.8,.54],[.72,.56],[.62,.56],[.6,.48]].forEach(([x,y],i)=>i===0?ctx.moveTo(x*W,y*H):ctx.lineTo(x*W,y*H)); ctx.stroke();
    // Labels
    ctx.font=`600 ${W>250?9:8}px Outfit,sans-serif`; ctx.textAlign='center';
    ctx.fillStyle='rgba(0,180,255,.7)'; ctx.fillText('\ud83c\udf0a MARINA',W*.19,H*.38);
    ctx.fillStyle='rgba(245,158,11,.7)'; ctx.fillText('\u26f5 CREEK',W*.71,H*.33);
    ctx.strokeStyle='rgba(255,255,255,.08)'; ctx.lineWidth=1; ctx.setLineDash([4,8]);
    ctx.beginPath(); ctx.moveTo(W*.47,H*.1); ctx.lineTo(W*.47,H*.9); ctx.stroke(); ctx.setLineDash([]);
    ctx.font=`800 10px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.5)'; ctx.textBaseline='middle'; ctx.fillText('VS',W*.47,H*.5); ctx.textBaseline='alphabetic';
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(100,180,255,.4)'; ctx.textAlign='center';
    ctx.fillText('MARINA VS CREEK \u2014 ROUTE MAP',W*.5,H*.07);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// food-buffet \u2192 blog16 & blog17
export function ThumbAnim_FoodBuffet() {
  const DISHES=['\ud83c\udf62','\ud83e\udd57','\ud83e\uddc6','\ud83c\udf5e','\ud83e\uded5','\ud83c\udf56','\ud83c\udf5a','\ud83e\udd69','\ud83c\udf70','\ud83e\uded6'];
  const dRef=useRef(DISHES.map((e,i)=>({e,x:.06+i*.09,y:.2+Math.sin(i*1.4)*.45,vy:(Math.random()-.5)*.0007,ph:Math.random()*Math.PI*2})));
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    const bg=ctx.createLinearGradient(0,0,W,H); bg.addColorStop(0,'#030208'); bg.addColorStop(1,'#080312');
    ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
    const glow=ctx.createRadialGradient(W*.5,H*.5,0,W*.5,H*.5,W*.45); glow.addColorStop(0,'rgba(200,120,30,.07)'); glow.addColorStop(1,'transparent');
    ctx.fillStyle=glow; ctx.fillRect(0,0,W,H);
    dRef.current.forEach(d=>{
      d.ph+=.018; d.y+=d.vy; if(d.y<.08)d.vy=Math.abs(d.vy); if(d.y>.92)d.vy=-Math.abs(d.vy);
      const alpha=.5+.45*Math.sin(d.ph);
      ctx.save(); ctx.globalAlpha=alpha; ctx.font=`${W>250?18:14}px serif`; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(d.e,d.x*W,d.y*H+Math.sin(d.ph)*5); ctx.restore();
    });
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(200,140,50,.6)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\ud83c\udf7d\ufe0f DHOW CRUISE DINNER',W*.5,H*.08);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// romantic-deck \u2192 blog18
export function ThumbAnim_RomanticDeck() {
  const hRef=useRef(Array.from({length:8},(_,i)=>({x:.3+Math.random()*.4,y:.35+Math.random()*.4,vy:-.002,ph:Math.random()*Math.PI*2,size:8+Math.random()*8})));
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    nightSky(ctx,W,H); stars(ctx,W,H,t,60,.65);
    // Moon
    const mg=ctx.createRadialGradient(W*.8,H*.15,0,W*.8,H*.15,18); mg.addColorStop(0,'rgba(255,248,220,.88)'); mg.addColorStop(1,'transparent');
    ctx.fillStyle=mg; ctx.beginPath(); ctx.arc(W*.8,H*.15,18,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='rgba(0,0,2,.97)'; ctx.beginPath(); ctx.arc(W*.8+7,H*.15-4,14,0,Math.PI*2); ctx.fill();
    // Water
    const wg=ctx.createLinearGradient(0,H*.65,0,H); wg.addColorStop(0,'rgba(5,2,20,.9)'); wg.addColorStop(1,'rgba(2,1,10,.95)');
    ctx.fillStyle=wg; ctx.fillRect(0,H*.65,W,H);
    // Moon reflection
    for(let i=0;i<5;i++){ctx.strokeStyle=`rgba(255,248,220,.04)`; ctx.lineWidth=1; ctx.beginPath(); const ry=H*(.68+i*.05); for(let x=W*.6;x<W*.9;x+=3)ctx.lineTo(x,ry+Math.sin(x*.08+t*1.5)*2); ctx.stroke();}
    // Deck
    ctx.fillStyle='rgba(20,8,5,.95)'; ctx.fillRect(0,H*.7,W,H*.3);
    // Candles
    [[W*.4,H*.75],[W*.6,H*.75]].forEach(([cx,cy])=>{
      ctx.fillStyle='rgba(220,200,150,.8)'; ctx.fillRect(cx-1,cy-H*.02,2,H*.02);
      const cf=ctx.createRadialGradient(cx,cy-H*.02,0,cx,cy-H*.02,12); cf.addColorStop(0,'rgba(255,200,80,.7)'); cf.addColorStop(1,'transparent');
      ctx.fillStyle=cf; ctx.fillRect(cx-12,cy-H*.04,24,18);
      ctx.fillStyle=`rgba(255,160,50,.9)`; ctx.beginPath(); ctx.arc(cx,cy-H*.023+Math.sin(t*3)*1.5,2,0,Math.PI*2); ctx.fill();
    });
    // Couple
    ctx.fillStyle='rgba(8,3,2,.95)'; ctx.beginPath(); ctx.arc(W*.44,H*.71,5,0,Math.PI*2); ctx.fill(); ctx.fillRect(W*.435,H*.716,8,14);
    ctx.beginPath(); ctx.arc(W*.56,H*.71,5,0,Math.PI*2); ctx.fill(); ctx.fillRect(W*.555,H*.716,8,14);
    // Hearts
    hRef.current.forEach(h=>{h.y+=h.vy;h.ph+=.025;if(h.y<.05)h.y=.85;
      ctx.save();ctx.globalAlpha=.3+.35*Math.sin(h.ph);ctx.font=`${h.size}px serif`;ctx.textAlign='center';ctx.fillText('\u2764\ufe0f',h.x*W,h.y*H);ctx.restore();
    });
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,180,220,.5)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\u2764\ufe0f ROMANTIC DHOW CRUISE',W*.5,H*.07);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// marina-skyline \u2192 blog19 Tips
export function ThumbAnim_MarinaSkyline() {
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    nightSky(ctx,W,H); stars(ctx,W,H,t,40,.5);
    const TOWERS=[{x:.04,w:.03,h:.5},{x:.09,w:.025,h:.38},{x:.14,w:.032,h:.55},{x:.19,w:.022,h:.3},{x:.24,w:.038,h:.6},{x:.55,w:.025,h:.38},{x:.61,w:.032,h:.5},{x:.67,w:.028,h:.42},{x:.73,w:.04,h:.62},{x:.79,w:.025,h:.35},{x:.84,w:.038,h:.55}];
    TOWERS.forEach((tw,ti)=>{
      const bx=W*tw.x,bw=W*tw.w,bh=H*tw.h,by=H*.62-bh;
      ctx.fillStyle='rgba(10,20,50,.95)'; ctx.fillRect(bx,by,bw,bh);
      const wc=Math.max(2,Math.floor(bw/7)),wr=Math.min(8,Math.floor(bh/9));
      for(let r=0;r<wr;r++)for(let c=0;c<wc;c++){
        if(Math.sin(t*.3+ti*4+r*3+c*5)>-.15){ctx.fillStyle=`rgba(200,220,255,.18)`;ctx.fillRect(bx+1+c*(bw/wc),by+2+r*(bh/wr),bw/wc-1,bh/wr-2);}
      }
    });
    // Water
    ctx.fillStyle='rgba(5,8,25,.9)'; ctx.fillRect(0,H*.62,W,H*.38);
    // Dhow gliding
    const dx=((t*.015)%(1.3)-.1)*W;
    if(dx>0&&dx<W) drawDhow(ctx,W,H,dx,H*.66);
    // Reflections
    for(let i=0;i<4;i++){ctx.strokeStyle=`rgba(100,150,255,.04)`;ctx.lineWidth=1;ctx.beginPath();const wy=H*(.68+i*.05);for(let x=0;x<=W;x+=5)ctx.lineTo(x,wy+Math.sin(x*.025+t*1.5+i)*2.5);ctx.stroke();}
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(100,160,255,.5)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\ud83c\udf03 DHOW CRUISE TIPS',W*.5,H*.07);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// group-deck \u2192 blog20
export function ThumbAnim_GroupDeck() {
  const confRef=useRef(Array.from({length:30},()=>({x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.004,vy:.002+Math.random()*.003,color:['#F59E0B','#3B82F6','#EF4444','#10B981','#8B5CF6'][Math.floor(Math.random()*5)],w:5+Math.random()*6,h:3})));
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    nightSky(ctx,W,H); stars(ctx,W,H,t,40,.55);
    ctx.fillStyle='rgba(18,8,30,.95)'; ctx.fillRect(0,H*.6,W,H*.4);
    // String lights
    for(let li=0;li<16;li++){const lx=W*li/15;ctx.fillStyle=`rgba(255,220,100,${.5+Math.sin(t*2+li)*.4})`;ctx.beginPath();ctx.arc(lx,H*.62,2.5,0,Math.PI*2);ctx.fill();}
    // Crowd
    for(let i=0;i<14;i++){const px=W*(.04+i*.07),py=H*.64;const ph=H*(.04+Math.sin(i*1.7)*.02);
      ctx.fillStyle='rgba(10,5,20,.9)'; ctx.beginPath(); ctx.arc(px,py-ph-6,5,0,Math.PI*2); ctx.fill(); ctx.fillRect(px-4,py-ph,8,ph);
      ctx.strokeStyle='rgba(10,5,20,.9)'; ctx.lineWidth=3; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(px+4,py-ph*.6); ctx.lineTo(px+14,py-ph*.6-10+Math.sin(t*2+i)*6); ctx.stroke();
    }
    // Confetti
    confRef.current.forEach(c=>{c.x+=c.vx;c.y+=c.vy;if(c.y>1){c.y=-.05;c.x=Math.random();}
      ctx.save();ctx.translate(c.x*W,c.y*H);ctx.fillStyle=c.color;ctx.fillRect(-c.w/2,-c.h/2,c.w,c.h);ctx.restore();
    });
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(150,100,255,.55)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\ud83c\udf89 PRIVATE GROUP CRUISE',W*.5,H*.07);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
//  QUAD BIKE THUMBNAILS
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

function drawThumbQuad(ctx,W,H,vx,vy,tilt,color='#C1200E'){
  ctx.save(); ctx.translate(vx,vy); ctx.rotate(-tilt);
  const g=ctx.createLinearGradient(-22,-12,22,8); g.addColorStop(0,color); g.addColorStop(1,'rgba(80,8,8,.9)');
  ctx.fillStyle=g; if(ctx.roundRect){ctx.beginPath();ctx.roundRect(-22,-12,44,20,4);ctx.fill();}
  [-16,16].forEach(wx=>{ctx.fillStyle='#111';ctx.beginPath();ctx.arc(wx,8,9,0,Math.PI*2);ctx.fill();ctx.fillStyle='#333';ctx.beginPath();ctx.arc(wx,8,5,0,Math.PI*2);ctx.fill();});
  ctx.fillStyle='rgba(10,8,5,.9)'; ctx.beginPath(); ctx.arc(0,-20,6,0,Math.PI*2); ctx.fill(); ctx.fillRect(-4,-14,8,14);
  ctx.restore();
}

// quad-racing \u2192 blog21
export function ThumbAnim_QuadRacing() {
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    const sky=ctx.createLinearGradient(0,0,0,H); sky.addColorStop(0,'#0E0500'); sky.addColorStop(.5,'#1E0800'); sky.addColorStop(1,'#8B3000');
    ctx.fillStyle=sky; ctx.fillRect(0,0,W,H); dunes(ctx,W,H,t);
    // UV sun
    const sg=ctx.createRadialGradient(W*.82,H*.2,0,W*.82,H*.2,40); sg.addColorStop(0,'rgba(255,200,50,.35)'); sg.addColorStop(1,'transparent');
    ctx.fillStyle=sg; ctx.fillRect(0,0,W,H);
    // Two quads
    const p1=(t*.18)%1, p2=(t*.18+.15)%1;
    [p1,p2].forEach((p,i)=>{
      const vx=p*W, vy=H*.38+Math.sin(p*Math.PI*2)*32+(1-p)*H*.22+i*H*.05;
      const tilt=Math.sin(p*Math.PI)*0.45*(i===0?1:-1);
      // Dust trail
      ctx.save(); ctx.globalAlpha=.25;
      for(let j=1;j<6;j++){const tp=Math.max(0,p-j*.025); ctx.fillStyle=`rgba(180,100,40,${(1-j/6)*.3})`; ctx.beginPath(); ctx.ellipse(tp*W,H*.38+Math.sin(tp*Math.PI*2)*32+(1-tp)*H*.22+i*H*.05+12,8,4,0,0,Math.PI*2); ctx.fill();}
      ctx.restore();
      drawThumbQuad(ctx,W,H,vx,vy,tilt,i===0?'#C1200E':'#1A60C0');
      // Speed lines
      for(let sl=0;sl<3;sl++){ctx.strokeStyle='rgba(255,200,100,.2)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(vx-15-sl*10,vy-sl*3);ctx.lineTo(vx-35-sl*10,vy-sl*3+1);ctx.stroke();}
    });
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,150,50,.6)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\ud83d\udeb5 QUAD BIKING DUBAI',W*.5,H*.07);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// helmet-safety \u2192 blog22
export function ThumbAnim_HelmetSafety() {
  const GEAR=['\u26d1\ufe0f','\ud83e\udd7d','\ud83e\udde4','\ud83d\udc62','\ud83e\uddba','\ud83d\udc56'];
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    ctx.fillStyle='#030608'; ctx.fillRect(0,0,W,H);
    const bg=ctx.createRadialGradient(W*.5,H*.5,0,W*.5,H*.5,W*.5); bg.addColorStop(0,'rgba(200,60,20,.06)'); bg.addColorStop(1,'transparent');
    ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
    // Center helmet
    ctx.save(); ctx.globalAlpha=.75+Math.sin(t*2)*.1;
    ctx.font=`${W>250?40:32}px serif`; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText('\u26d1\ufe0f',W*.5,H*.5); ctx.restore();
    // Orbiting gear
    GEAR.forEach((e,i)=>{
      const a=i/GEAR.length*Math.PI*2+t*.4; const r=Math.min(W,H)*.32;
      const gx=W*.5+Math.cos(a)*r, gy=H*.5+Math.sin(a)*r*.55;
      const alpha=.45+.45*Math.sin(t*1.2+i);
      ctx.save(); ctx.globalAlpha=alpha; ctx.font=`${W>250?16:13}px serif`; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(e,gx,gy); ctx.restore();
    });
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(200,80,20,.6)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\ud83e\udeaa NO LICENSE NEEDED',W*.5,H*.08);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// quad-vs-board \u2192 blog23
export function ThumbAnim_QuadVsBoard() {
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    const mid=W*.5;
    // Left \u2014 quad side
    ctx.save(); ctx.beginPath(); ctx.rect(0,0,mid,H); ctx.clip();
    const qs=ctx.createLinearGradient(0,0,0,H); qs.addColorStop(0,'#0E0500'); qs.addColorStop(1,'#8B3000');
    ctx.fillStyle=qs; ctx.fillRect(0,0,mid,H);
    ctx.fillStyle='#8B3200'; ctx.beginPath(); ctx.moveTo(0,H);
    for(let x=0;x<=mid;x+=6)ctx.lineTo(x,H*.48+Math.sin(x*.015+t*.2)*18+Math.cos(x*.03)*10);
    ctx.lineTo(mid,H); ctx.closePath(); ctx.fill();
    const qp=(t*.16)%1,qx=qp*mid,qy=H*.4+Math.sin(qp*Math.PI*2)*28+(1-qp)*H*.2;
    drawThumbQuad(ctx,W,H,qx,qy,Math.sin(qp*Math.PI)*.4,'#C1200E');
    ctx.restore();
    // Right \u2014 sandboard side
    ctx.save(); ctx.beginPath(); ctx.rect(mid,0,mid,H); ctx.clip();
    const ss=ctx.createLinearGradient(0,0,0,H); ss.addColorStop(0,'#100800'); ss.addColorStop(1,'#7A2C00');
    ctx.fillStyle=ss; ctx.fillRect(mid,0,mid,H);
    ctx.fillStyle='#8B3200'; ctx.beginPath(); ctx.moveTo(mid,H*.15); ctx.lineTo(W,H); ctx.lineTo(mid,H); ctx.closePath(); ctx.fill();
    const bp=(t*.13)%1,bx=mid+bp*mid*.8,by=H*(.18+bp*.7);
    ctx.save(); ctx.translate(bx,by); ctx.rotate(.55);
    ctx.fillStyle='#7A4800'; if(ctx.roundRect){ctx.beginPath();ctx.roundRect(-16,-3,32,7,3);ctx.fill();}
    ctx.fillStyle='rgba(10,8,5,.9)'; ctx.beginPath(); ctx.ellipse(0,-18,5,6,0,0,Math.PI*2); ctx.fill(); ctx.fillRect(-4,-12,8,14); ctx.restore();
    ctx.restore();
    // VS
    ctx.fillStyle='rgba(5,3,10,.92)'; ctx.strokeStyle='rgba(255,255,255,.2)'; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.arc(mid,H*.5,16,0,Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.font=`800 10px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.7)'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText('VS',mid,H*.5); ctx.textBaseline='alphabetic';
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(200,80,20,.6)'; ctx.textAlign='center';
    ctx.fillText('\ud83d\udeb5 QUAD vs \ud83c\udfc4 SANDBOARD',W*.5,H*.07);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// timer-30-60 \u2192 blog24
export function ThumbAnim_Timer3060() {
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    ctx.fillStyle='#020406'; ctx.fillRect(0,0,W,H);
    const phase=(t*.1)%1; const mins=30+phase*30;
    // Clock
    const cx=W*.32,cy=H*.52,cr=Math.min(W*.22,H*.35);
    ctx.strokeStyle='rgba(255,255,255,.08)'; ctx.lineWidth=7; ctx.beginPath(); ctx.arc(cx,cy,cr,0,Math.PI*2); ctx.stroke();
    const wn=(mins-30)/30;
    ctx.strokeStyle=mins>50?'rgba(200,60,20,.9)':mins>40?'rgba(245,158,11,.9)':'rgba(0,200,100,.9)'; ctx.lineWidth=7; ctx.lineCap='round';
    ctx.beginPath(); ctx.arc(cx,cy,cr,-Math.PI*.5,-Math.PI*.5+wn*Math.PI*2); ctx.stroke();
    ctx.font=`700 ${W>250?16:13}px Outfit,sans-serif`; ctx.fillStyle='#fff'; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText(Math.floor(mins)+'min',cx,cy); ctx.textBaseline='alphabetic';
    // Comparison bars
    const bx=W*.58;
    [{l:'30 MIN',p:'AED 220',w:.5,c:'rgba(0,200,100'},{l:'60 MIN',p:'AED 380',w:1,c:'rgba(245,158,11'}].forEach(({l,p,w,c},i)=>{
      const by=H*(.28+i*.38);
      ctx.fillStyle=`${c},.1)`; ctx.strokeStyle=`${c},.3)`; ctx.lineWidth=1;
      if(ctx.roundRect){ctx.beginPath();ctx.roundRect(bx,by,W*.35,H*.28,10);ctx.fill();ctx.stroke();}
      ctx.font=`700 ${W>250?12:10}px Outfit,sans-serif`; ctx.fillStyle=`${c},.9)`; ctx.textAlign='left'; ctx.fillText(l,bx+8,by+20);
      ctx.font=`700 ${W>250?14:12}px Outfit,sans-serif`; ctx.fillStyle='#fff'; ctx.fillText(p,bx+8,by+42);
    });
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.35)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\u23f1\ufe0f 30 MIN vs 60 MIN QUAD',W*.5,H*.08);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// combo-map \u2192 blog25
export function ThumbAnim_ComboMap() {
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    ctx.fillStyle='#030608'; ctx.fillRect(0,0,W,H);
    const STOPS=[{x:.1,y:.7,i:'\ud83c\udfe8'},{x:.28,y:.52,i:'\ud83d\udeb5'},{x:.5,y:.35,i:'\ud83c\udfd5\ufe0f'},{x:.72,y:.5,i:'\ud83d\udc2a'},{x:.88,y:.7,i:'\ud83c\udf56'}];
    const prog=(t*.06)%1, totalSeg=STOPS.length-1;
    // Draw route segments
    for(let seg=0;seg<totalSeg;seg++){
      if(prog<seg/totalSeg) break;
      const p=Math.min(1,(prog-seg/totalSeg)*totalSeg);
      const s=STOPS[seg],e=STOPS[seg+1];
      ctx.strokeStyle='rgba(245,158,11,.6)'; ctx.lineWidth=2;
      ctx.beginPath(); ctx.moveTo(s.x*W,s.y*H);
      const steps=20,drawn=Math.floor(steps*p);
      for(let st=0;st<=drawn;st++){const f=st/steps;const px=s.x*W+(e.x-s.x)*W*f;const py=s.y*H+(e.y-s.y)*H*f+Math.sin(f*Math.PI)*(-H*.12);ctx.lineTo(px,py);}
      ctx.stroke();
      // Leading dot
      if(p<1){const f=p;const lx=s.x*W+(e.x-s.x)*W*f;const ly=s.y*H+(e.y-s.y)*H*f+Math.sin(f*Math.PI)*(-H*.12);
        const lg=ctx.createRadialGradient(lx,ly,0,lx,ly,7); lg.addColorStop(0,'rgba(245,158,11,.8)'); lg.addColorStop(1,'transparent');
        ctx.fillStyle=lg; ctx.beginPath(); ctx.arc(lx,ly,7,0,Math.PI*2); ctx.fill();
      }
    }
    // Stop icons
    STOPS.forEach((s,i)=>{
      const alpha=i/totalSeg<=prog+.1?1:.2;
      ctx.save(); ctx.globalAlpha=alpha;
      const sg=ctx.createRadialGradient(s.x*W,s.y*H,0,s.x*W,s.y*H,16); sg.addColorStop(0,'rgba(245,158,11,.2)'); sg.addColorStop(1,'transparent');
      ctx.fillStyle=sg; ctx.fillRect(s.x*W-16,s.y*H-16,32,32);
      ctx.font=`${W>250?16:13}px serif`; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(s.i,s.x*W,s.y*H);
      ctx.restore();
    });
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(245,158,11,.55)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\ud83c\udfaf QUAD + SAFARI COMBO',W*.5,H*.07);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
//  CAMEL RIDING THUMBNAILS
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

function drawThumbCamel(ctx,W,H,cx,cy,phase,scale=1){
  ctx.fillStyle='rgba(5,2,0,.92)';
  ctx.beginPath(); ctx.ellipse(cx,cy-10*scale,24*scale,13*scale,0,0,Math.PI*2); ctx.fill();
  [[-6,-26,10,8],[9,-24,8,6]].forEach(([ex,ey,rx,ry])=>{ctx.beginPath();ctx.ellipse(cx+ex*scale,cy+ey*scale,rx*scale,ry*scale,0,0,Math.PI*2);ctx.fill();});
  ctx.strokeStyle='rgba(5,2,0,.9)'; ctx.lineWidth=6*scale; ctx.lineCap='round';
  ctx.beginPath(); ctx.moveTo(cx+20*scale,cy-8*scale); ctx.lineTo(cx+28*scale,cy+1*scale); ctx.stroke();
  ctx.fillStyle='rgba(5,2,0,.9)'; ctx.beginPath(); ctx.ellipse(cx+28*scale,cy+1*scale,8*scale,5*scale,.3,0,Math.PI*2); ctx.fill();
  [-18,-8,5,16].forEach((lx,i)=>{const ph=phase+(i%2)*Math.PI;ctx.strokeStyle='rgba(5,2,0,.9)';ctx.lineWidth=4*scale;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(cx+lx*scale,cy+3*scale);ctx.lineTo(cx+lx*scale+Math.sin(ph)*6*scale,cy+20*scale+Math.abs(Math.sin(ph))*3*scale);ctx.stroke();});
}

// camel-walk-hero \u2192 blog26
export function ThumbAnim_CamelWalkHero() {
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    sunsetSky(ctx,W,H); dunes(ctx,W,H,t);
    const sg=ctx.createRadialGradient(W*.75,H*.65,0,W*.75,H*.65,W*.3); sg.addColorStop(0,'rgba(245,130,20,.4)'); sg.addColorStop(1,'transparent');
    ctx.fillStyle=sg; ctx.fillRect(0,0,W,H);
    // Camel walking
    const cx=W*(.2+(t*.03)%0.65),cy=H*.72;
    // Color camel
    const cbg=ctx.createRadialGradient(cx,cy-12,4,cx,cy-12,28); cbg.addColorStop(0,'#C87030'); cbg.addColorStop(1,'#7A3E10');
    ctx.fillStyle=cbg; ctx.beginPath(); ctx.ellipse(cx,cy-12,28,14,0,0,Math.PI*2); ctx.fill();
    [[-6,-28,12,9],[9,-26,9,7]].forEach(([ex,ey,rx,ry])=>{ctx.fillStyle='#A35A20';ctx.beginPath();ctx.ellipse(cx+ex,cy+ey,rx,ry,0,0,Math.PI*2);ctx.fill();});
    ctx.strokeStyle='#9B4E18'; ctx.lineWidth=8; ctx.lineCap='round'; ctx.beginPath(); ctx.moveTo(cx+24,cy-10); ctx.lineTo(cx+33,cy+1); ctx.stroke();
    ctx.fillStyle='#B05C1C'; ctx.beginPath(); ctx.ellipse(cx+33,cy+1,10,7,.3,0,Math.PI*2); ctx.fill();
    [-20,-9,6,18].forEach((lx,i)=>{const ph=t*3+(i%2)*Math.PI;ctx.strokeStyle='#7A3010';ctx.lineWidth=5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(cx+lx,cy+4);ctx.lineTo(cx+lx+Math.sin(ph)*9,cy+20+Math.abs(Math.sin(ph))*3);ctx.stroke();});
    // Rider
    ctx.fillStyle='rgba(255,220,180,.9)'; ctx.beginPath(); ctx.arc(cx,cy-38,6,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#E05030'; ctx.fillRect(cx-5,cy-32,10,18);
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(200,130,40,.6)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\ud83d\udc2a CAMEL RIDING DUBAI',W*.5,H*.07);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// welfare-check \u2192 blog27
export function ThumbAnim_WelfareCheck() {
  const CHECKS=['\ud83d\ude34 Resting hours','\ud83e\ude7a Monthly vet','\u2696\ufe0f Weight limits','\ud83c\udf3f Natural feed','\u2705 DCRA licensed','\u2602\ufe0f Shaded rest'];
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    ctx.fillStyle='#030608'; ctx.fillRect(0,0,W,H);
    const bg=ctx.createRadialGradient(W*.5,H*.5,0,W*.5,H*.5,W*.5); bg.addColorStop(0,'rgba(0,180,80,.06)'); bg.addColorStop(1,'transparent');
    ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
    CHECKS.forEach((c,i)=>{
      const alpha=Math.min(1,Math.max(0,(t*.6-i*.3)));
      if(alpha<=0) return;
      const col=i%2, row=Math.floor(i/2);
      const cx=W*(.08+col*.5), cy=H*(.2+row*.22);
      ctx.save(); ctx.globalAlpha=alpha;
      ctx.fillStyle='rgba(0,200,80,.1)'; ctx.strokeStyle='rgba(0,200,80,.3)'; ctx.lineWidth=.8;
      if(ctx.roundRect){ctx.beginPath();ctx.roundRect(cx,cy,W*.4,18,9);ctx.fill();ctx.stroke();}
      ctx.font=`500 ${W>250?9:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.75)'; ctx.textAlign='left';
      ctx.fillText(c,cx+6,cy+12); ctx.restore();
    });
    const barY=H*.88;
    ctx.fillStyle='rgba(0,200,80,.15)'; ctx.strokeStyle='rgba(0,200,80,.4)'; ctx.lineWidth=1;
    if(ctx.roundRect){ctx.beginPath();ctx.roundRect(W*.1,barY,W*.8,18,9);ctx.fill();ctx.stroke();}
    ctx.font=`700 ${W>250?10:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(0,220,100,.85)'; ctx.textAlign='center';
    ctx.fillText('\ud83d\udc2a ETHICAL OPERATOR \u2713',W*.5,barY+13);
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(0,200,80,.5)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\u2705 IS CAMEL RIDING ETHICAL?',W*.5,H*.08);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// sunrise-golden \u2192 blog28
export function ThumbAnim_SunriseGolden() {
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    const progress=Math.min(1,t*.05);
    const sky=ctx.createLinearGradient(0,0,0,H);
    sky.addColorStop(0,`rgba(${Math.floor(1+progress*12)},${Math.floor(progress*6)},8,1)`);
    sky.addColorStop(.5,`rgba(${Math.floor(20+progress*170)},${Math.floor(8+progress*80)},${Math.floor(progress*10)},1)`);
    sky.addColorStop(1,`rgba(${Math.floor(160+progress*70)},${Math.floor(70+progress*100)},${Math.floor(20+progress*40)},1)`);
    ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
    if(progress>.15){
      const sg=ctx.createRadialGradient(W*.5,H*(.7-progress*.25),0,W*.5,H*(.7-progress*.25),W*.25);
      sg.addColorStop(0,'rgba(255,200,50,.5)'); sg.addColorStop(1,'transparent'); ctx.fillStyle=sg; ctx.fillRect(0,0,W,H);
      ctx.fillStyle=`rgba(255,${Math.floor(200+progress*55)},50,${.5+progress*.3})`; ctx.beginPath(); ctx.arc(W*.5,H*(.7-progress*.25),W*.03,0,Math.PI*2); ctx.fill();
    }
    stars(ctx,W,H,t,60,.6);
    // Dune
    ctx.fillStyle='rgba(5,2,0,.97)'; ctx.beginPath(); ctx.moveTo(0,H);
    for(let x=0;x<=W;x+=8) ctx.lineTo(x,H*.68+Math.sin(x*.007+t*.08)*18+Math.cos(x*.018)*10);
    ctx.lineTo(W,H); ctx.closePath(); ctx.fill();
    // Camel silhouette
    drawThumbCamel(ctx,W,H,W*.5+Math.sin(t*.2)*W*.06,H*.69,t*2.5);
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,200,80,.6)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\ud83c\udf05 SUNRISE CAMEL RIDE',W*.5,H*.07);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// coffee-ceremony \u2192 blog29
export function ThumbAnim_CoffeeCeremony() {
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    ctx.fillStyle='#040208'; ctx.fillRect(0,0,W,H);
    const bg=ctx.createRadialGradient(W*.5,H*.6,0,W*.5,H*.6,W*.5); bg.addColorStop(0,'rgba(200,120,30,.08)'); bg.addColorStop(1,'transparent');
    ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
    // Carpet
    ctx.fillStyle='rgba(100,15,15,.25)'; ctx.fillRect(W*.05,H*.55,W*.9,H*.4);
    // Dallah
    const dx=W*.38,dy=H*.65;
    const dg=ctx.createLinearGradient(dx-18,dy-30,dx+18,dy+8); dg.addColorStop(0,'#C8A014'); dg.addColorStop(1,'#6A5006');
    ctx.fillStyle=dg; ctx.beginPath(); ctx.ellipse(dx,dy-10,18,26,0,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle='rgba(200,160,20,.5)'; ctx.lineWidth=1; ctx.beginPath(); ctx.ellipse(dx,dy-10,18,26,0,0,Math.PI*2); ctx.stroke();
    ctx.fillStyle='#9A7A08'; ctx.beginPath(); ctx.ellipse(dx,dy-36,8,6,0,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle='#9A7A08'; ctx.lineWidth=5; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(dx+7,dy-24); ctx.quadraticCurveTo(dx+28,dy-28,dx+24,dy-14); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(dx-18,dy-20); ctx.quadraticCurveTo(dx-32,dy-12,dx-18,dy+4); ctx.stroke();
    // Cups
    [[W*.6,H*.72],[W*.68,H*.7],[W*.76,H*.72]].forEach(([cx,cy])=>{
      ctx.fillStyle='rgba(200,160,20,.9)'; ctx.beginPath(); ctx.moveTo(cx-5,cy); ctx.lineTo(cx+5,cy); ctx.lineTo(cx+4,cy+12); ctx.lineTo(cx-4,cy+12); ctx.closePath(); ctx.fill();
      ctx.fillStyle='rgba(80,40,5,.8)'; ctx.beginPath(); ctx.ellipse(cx,cy+2,4,2.5,0,0,Math.PI*2); ctx.fill();
    });
    // Steam
    ctx.strokeStyle='rgba(200,200,180,.2)'; ctx.lineWidth=1.5;
    for(let i=0;i<3;i++){ctx.beginPath();const sx=W*.65+i*W*.08;ctx.moveTo(sx,H*.68);for(let s=0;s<8;s++)ctx.lineTo(sx+Math.sin(t*2+s*.5+i)*3,H*.68-s*3);ctx.stroke();}
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(200,150,40,.6)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\u2615 BEDOUIN EXPERIENCE',W*.5,H*.08);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
//  CITY TOUR THUMBNAILS
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

// city-landmarks \u2192 blog30 & blog31
export function ThumbAnim_CityLandmarks() {
  const ICONS=['\ud83d\udd4c','\ud83c\udfdb\ufe0f','\ud83d\udc9b','\ud83c\udf0a','\ud83c\udfa1','\ud83c\udfd6\ufe0f','\ud83d\udee5\ufe0f','\ud83c\udfdf\ufe0f'];
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    nightSky(ctx,W,H); stars(ctx,W,H,t,30,.55);
    // Burj Khalifa silhouette
    const bx=W*.5;
    [[14,H*.85],[11,H*.72],[8,H*.6],[6,H*.5],[4,H*.41],[2.5,H*.33],[1.5,H*.25],[.6,H*.18]].forEach(([hw,y],i)=>{
      const next=[[11,H*.72],[8,H*.6],[6,H*.5],[4,H*.41],[2.5,H*.33],[1.5,H*.25],[.6,H*.18],[.3,H*.12]][i]||[.3,H*.12];
      ctx.fillStyle=`rgba(15,30,70,.95)`; ctx.beginPath();
      ctx.moveTo(bx-hw,y);ctx.lineTo(bx+hw,y);ctx.lineTo(bx+next[0],next[1]);ctx.lineTo(bx-next[0],next[1]);ctx.closePath();ctx.fill();
    });
    ctx.fillStyle=`rgba(255,80,80,${.5+.5*Math.sin(t*2.5)})`; ctx.beginPath(); ctx.arc(bx,H*.12,1.5,0,Math.PI*2); ctx.fill();
    // Orbiting icons
    ICONS.forEach((ic,i)=>{
      const a=i/ICONS.length*Math.PI*2+t*.2; const r=Math.min(W*.3,H*.36);
      ctx.save(); ctx.globalAlpha=.4+.45*Math.sin(t*1.2+i);
      ctx.font=`${W>250?14:11}px serif`; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(ic,W*.5+Math.cos(a)*r,H*.5+Math.sin(a)*r*.52); ctx.restore();
    });
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(100,160,255,.55)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\ud83c\udfd9\ufe0f DUBAI CITY TOUR',W*.5,H*.07);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// heritage-vs-modern \u2192 blog32
export function ThumbAnim_HeritageVsModern() {
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    const mid=W*.5;
    ctx.save(); ctx.beginPath(); ctx.rect(0,0,mid,H); ctx.clip();
    const os=ctx.createLinearGradient(0,0,0,H); os.addColorStop(0,'#0A0600'); os.addColorStop(.6,'#B04000'); os.addColorStop(1,'#7A2800');
    ctx.fillStyle=os; ctx.fillRect(0,0,mid,H);
    // Wind towers
    [.05,.14,.25,.36].forEach((x,i)=>{
      const bx=W*x,bh=H*(.28+Math.sin(i*2.1)*.1),bw=W*.06;
      ctx.fillStyle='rgba(140,70,18,.92)'; ctx.fillRect(bx,H*.6-bh,bw,bh);
      const tw=bw*.4,twh=bh*.3;ctx.fillStyle='rgba(110,50,12,.95)';ctx.fillRect(bx+bw*.3,H*.6-bh-twh,tw,twh);
    });
    ctx.font=`700 ${W>250?9:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,160,60,.8)'; ctx.textAlign='center'; ctx.fillText('OLD DUBAI',mid*.5,H*.88);
    ctx.restore();
    ctx.save(); ctx.beginPath(); ctx.rect(mid,0,mid,H); ctx.clip();
    nightSky(ctx,W,H); stars(ctx,W,H,t,30,.55);
    [.02,.08,.14,.2,.27,.35].forEach((x,i)=>{
      const bx=mid+W*x,bh=H*(.35+Math.sin(i*2.3)*.2),bw=W*.055;
      ctx.fillStyle='rgba(12,25,65,.95)'; ctx.fillRect(bx,H*.6-bh,bw,bh);
      const wc=Math.max(2,Math.floor(bw/7)),wr=Math.min(6,Math.floor(bh/9));
      for(let r=0;r<wr;r++)for(let c=0;c<wc;c++)if(Math.sin(t*.3+i*4+r*3+c*5)>-.15){ctx.fillStyle='rgba(180,210,255,.15)';ctx.fillRect(bx+1+c*(bw/wc),H*.6-bh+2+r*(bh/wr),bw/wc-1,bh/wr-2);}
    });
    ctx.font=`700 ${W>250?9:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(100,160,255,.8)'; ctx.textAlign='center'; ctx.fillText('NEW DUBAI',mid+mid*.5,H*.88);
    ctx.restore();
    ctx.strokeStyle='rgba(255,255,255,.1)'; ctx.lineWidth=1; ctx.setLineDash([3,8]);
    ctx.beginPath(); ctx.moveTo(mid,0); ctx.lineTo(mid,H); ctx.stroke(); ctx.setLineDash([]);
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.35)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\ud83d\udd4c OLD vs \ud83c\udfd9\ufe0f NEW DUBAI',W*.5,H*.07);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// half-full-timeline \u2192 blog33
export function ThumbAnim_HalfFullTimeline() {
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    ctx.fillStyle='#020406'; ctx.fillRect(0,0,W,H);
    const prog=(t*.08)%1;
    const cols=[{items:4,color:'rgba(100,160,255',label:'HALF DAY'},{items:9,color:'rgba(245,158,11',label:'FULL DAY'}];
    cols.forEach((col,ci)=>{
      const cx=W*(.08+ci*.5); const cw=W*.42;
      ctx.fillStyle=`${col.color},.08)`; ctx.strokeStyle=`${col.color},.25)`; ctx.lineWidth=1;
      if(ctx.roundRect){ctx.beginPath();ctx.roundRect(cx,H*.08,cw,H*.84,10);ctx.fill();ctx.stroke();}
      ctx.font=`700 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle=`${col.color},.85)`; ctx.textAlign='center';
      ctx.fillText(col.label,cx+cw*.5,H*.14);
      const iH=(H*.68)/col.items;
      for(let i=0;i<col.items;i++){
        const iy=H*.18+i*iH; const rp=Math.min(1,Math.max(0,(prog*col.items*1.3-i)));
        if(rp<=0) continue;
        ctx.save(); ctx.globalAlpha=Math.min(1,rp*2);
        ctx.fillStyle=`${col.color},.15)`;
        if(ctx.roundRect){ctx.beginPath();ctx.roundRect(cx+5,iy,cw-10,iH-3,5);ctx.fill();}
        ctx.fillStyle=`${col.color},.8)`; ctx.beginPath(); ctx.arc(cx+14,iy+iH*.45,3.5,0,Math.PI*2); ctx.fill();
        ctx.font=`500 ${W>250?9:7}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.7)'; ctx.textAlign='left';
        ctx.fillText(`Day Stop ${i+1}`,cx+22,iy+iH*.55); ctx.restore();
      }
    });
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.3)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\u23f1\ufe0f HALF DAY vs FULL DAY TOUR',W*.5,H*.05);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
//  DUBAI GUIDE THUMBNAILS
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

// tours-podium \u2192 blog34
export function ThumbAnim_ToursPodium() {
  const TOURS=[{n:'\ud83c\udf88 Balloon',s:9.8,c:'rgba(255,200,50'},{n:'\ud83c\udfdc\ufe0f Safari',s:9.5,c:'rgba(245,158,11'},{n:'\u26f5 Cruise',s:9.1,c:'rgba(100,180,255'},{n:'\ud83d\udeb5 Quad',s:8.7,c:'rgba(200,60,20'},{n:'\ud83d\udc2a Camel',s:8.4,c:'rgba(180,130,50'},{n:'\ud83c\udfd9\ufe0f City',s:8.2,c:'rgba(150,100,255'}];
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    ctx.fillStyle='#030508'; ctx.fillRect(0,0,W,H);
    const ap=(t*.4)%1; const bx=W*.36; const bmax=W*.56;
    TOURS.forEach((tour,i)=>{
      const by=H*(.1+i*.135); const rp=Math.min(1,Math.max(0,(ap*TOURS.length*1.2-i)));
      const bw=bmax*(tour.s/10)*rp;
      ctx.fillStyle='rgba(255,255,255,.04)'; if(ctx.roundRect){ctx.beginPath();ctx.roundRect(bx,by,bmax,H*.1,H*.05);ctx.fill();}
      if(bw>0){const g=ctx.createLinearGradient(bx,0,bx+bw,0);g.addColorStop(0,`${tour.c},.6)`);g.addColorStop(1,`${tour.c},.25)`);ctx.fillStyle=g;if(ctx.roundRect){ctx.beginPath();ctx.roundRect(bx,by,bw,H*.1,H*.05);ctx.fill();}}
      // Medal
      const mc=['rgba(255,215,0','rgba(192,192,192','rgba(205,127,50','rgba(150,150,150','rgba(150,150,150','rgba(150,150,150'][i];
      ctx.fillStyle=`${mc},.9)`; ctx.beginPath(); ctx.arc(bx-18,by+H*.05,11,0,Math.PI*2); ctx.fill();
      ctx.font=`700 8px Outfit,sans-serif`; ctx.fillStyle='rgba(0,0,0,.8)'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(`#${i+1}`,bx-18,by+H*.05);
      ctx.font=`500 ${W>250?9:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.8)'; ctx.textAlign='right'; ctx.textBaseline='alphabetic';
      ctx.fillText(tour.n,bx-4,by+H*.068);
      if(rp>.5){ctx.font=`600 9px Outfit,sans-serif`; ctx.fillStyle=`${tour.c},.9)`;ctx.textAlign='left';ctx.fillText(tour.s,bx+bw+4,by+H*.068);}
    });
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,215,0,.55)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\ud83c\udfc6 BEST DUBAI TOURS RANKED',W*.5,H*.06);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// safari-balloon-duel \u2192 blog35
export function ThumbAnim_SafariBalloonDuel() {
  const CATS=['Thrill','Views','Value','Unique','Family'];
  const SS=[9,8,9.5,8.5,9], BS=[8,10,7,10,7];
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    ctx.fillStyle='#030508'; ctx.fillRect(0,0,W,H);
    const cx=W*.5, rp=(t*.5)%1;
    ctx.font=`700 ${W>250?11:9}px Outfit,sans-serif`;
    ctx.fillStyle='rgba(245,158,11,.8)'; ctx.textAlign='right'; ctx.fillText('\ud83c\udfdc\ufe0f Safari',cx-10,H*.08);
    ctx.fillStyle='rgba(150,100,255,.8)'; ctx.textAlign='left'; ctx.fillText('\ud83c\udf88 Balloon',cx+10,H*.08);
    CATS.forEach((cat,i)=>{
      const ry=H*(.16+i*.158); const p=Math.min(1,Math.max(0,(rp*CATS.length*1.2-i)));
      const sw=W*.28*(SS[i]/10)*p, bw2=W*.28*(BS[i]/10)*p;
      // Safari bar left
      const sg=ctx.createLinearGradient(cx-sw-10,0,cx,0); sg.addColorStop(0,'rgba(245,158,11,.25)'); sg.addColorStop(1,'rgba(245,158,11,.7)');
      ctx.fillStyle=sg; if(ctx.roundRect&&sw>0){ctx.beginPath();ctx.roundRect(cx-sw-10,ry-6,sw,14,7);ctx.fill();}
      // Balloon bar right
      const bg2=ctx.createLinearGradient(cx+10,0,cx+10+bw2,0); bg2.addColorStop(0,'rgba(150,100,255,.7)'); bg2.addColorStop(1,'rgba(150,100,255,.25)');
      ctx.fillStyle=bg2; if(ctx.roundRect&&bw2>0){ctx.beginPath();ctx.roundRect(cx+10,ry-6,bw2,14,7);ctx.fill();}
      ctx.font=`600 ${W>250?9:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.45)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
      ctx.fillText(cat,cx,ry+4);
    });
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.3)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\ud83c\udfdc\ufe0f SAFARI vs \ud83c\udf88 BALLOON',W*.5,H*.97);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// itinerary-calendar \u2192 blog36
export function ThumbAnim_ItineraryCalendar() {
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    ctx.fillStyle='#020406'; ctx.fillRect(0,0,W,H);
    const cols=[{d:3,c:'rgba(100,200,100',items:['\ud83c\udfdc\ufe0f Safari','\ud83c\udfd9\ufe0f City Tour','\u26f5 Cruise']},{d:5,c:'rgba(245,158,11',items:['\ud83c\udfdc\ufe0f Safari','\ud83c\udfd9\ufe0f Tour','\ud83c\udf88 Balloon','\u26f5 Cruise','\ud83d\udc2a Camel']},{d:7,c:'rgba(150,100,255',items:['\ud83c\udfdc\ufe0f Safari','\ud83c\udfd9\ufe0f Tour','\ud83d\udeb5 Quad','\ud83c\udf88 Balloon','\ud83d\udc2a Camel','\u26f5 Cruise','\ud83c\udf1f Free']}];
    const cw=W/3, prog=(t*.4)%1;
    cols.forEach((col,ci)=>{
      const cx=ci*cw+cw*.5; const colX=ci*cw+4;
      ctx.fillStyle=`${col.c},.08)`; ctx.strokeStyle=`${col.c},.25)`; ctx.lineWidth=1;
      if(ctx.roundRect){ctx.beginPath();ctx.roundRect(colX,H*.06,cw-8,H*.86,10);ctx.fill();ctx.stroke();}
      ctx.font=`700 ${W>250?10:9}px Outfit,sans-serif`; ctx.fillStyle=`${col.c},.85)`; ctx.textAlign='center';
      ctx.fillText(`${col.d} DAYS`,cx,H*.13);
      const iH=(H*.68)/col.d;
      col.items.forEach((item,i)=>{
        const iy=H*.16+i*iH; const rp=Math.min(1,Math.max(0,(prog*col.d*1.3-i)));
        if(rp<=0) return;
        ctx.save(); ctx.globalAlpha=Math.min(1,rp*2);
        ctx.fillStyle=`${col.c},.12)`;
        if(ctx.roundRect){ctx.beginPath();ctx.roundRect(colX+5,iy,cw-14,iH-3,5);ctx.fill();}
        ctx.font=`500 ${W>250?9:7}px Outfit,sans-serif`; ctx.fillStyle=`${col.c},.8)`; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
        ctx.fillText(item,cx,iy+iH*.6); ctx.restore();
      });
    });
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.3)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\ud83d\udcc5 HOW MANY DAYS IN DUBAI?',W*.5,H*.04);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// month-events-ring \u2192 blog37
export function ThumbAnim_MonthEventsRing() {
  const MONTHS=['J','F','M','A','M','J','J','A','S','O','N','D'];
  const BEST=[1,1,0,0,0,0,0,0,0,1,1,1];
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    ctx.fillStyle='#020408'; ctx.fillRect(0,0,W,H);
    const cx=W*.5,cy=H*.52,r=Math.min(W*.32,H*.4);
    MONTHS.forEach((m,i)=>{
      const a1=i/12*Math.PI*2-Math.PI*.5,a2=(i+.85)/12*Math.PI*2-Math.PI*.5;
      ctx.fillStyle=BEST[i]?`rgba(245,158,11,${.18+Math.sin(t*1.5+i)*.07})`:`rgba(${200-BEST[i]*100},${60+BEST[i]*40},20,.1)`;
      ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,a1,a2);ctx.closePath();ctx.fill();
      ctx.strokeStyle=BEST[i]?`rgba(245,158,11,${.8+Math.sin(t*2+i)*.1})`:'rgba(255,255,255,.06)'; ctx.lineWidth=BEST[i]?1.2:.4;
      ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,a1,a2);ctx.closePath();ctx.stroke();
      const la=(i+.42)/12*Math.PI*2-Math.PI*.5;
      ctx.font=`${BEST[i]?'700':'400'} ${W>250?9:7}px Outfit,sans-serif`; ctx.fillStyle=BEST[i]?'#F59E0B':'rgba(255,255,255,.4)';
      ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(m,cx+Math.cos(la)*r*.72,cy+Math.sin(la)*r*.72);
    });
    ctx.textBaseline='alphabetic'; ctx.font=`700 ${W>250?9:8}px Outfit,sans-serif`; ctx.fillStyle='#F59E0B'; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('BEST',cx,cy-5); ctx.fillText('MONTHS',cx,cy+7); ctx.textBaseline='alphabetic';
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(245,158,11,.5)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\ud83d\uddd3\ufe0f BEST TIME TO VISIT DUBAI',W*.5,H*.07);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// tips-orbit \u2192 blog38
export function ThumbAnim_TipsOrbit() {
  const TIPS=['\ud83d\ude87','\ud83d\udca7','\ud83d\udc57','\ud83c\udf21\ufe0f','\ud83d\udcb0','\ud83d\udcf8','\ud83d\udd4c','\ud83d\udead','\ud83d\udcb3','\ud83d\udcf1','\ud83c\udfe5','\u2600\ufe0f','\ud83c\udf19','\u2708\ufe0f','\ud83e\udd1d','\ud83c\udf0a','\ud83c\udf7d\ufe0f','\ud83d\udcac'];
  const tRef=useRef(TIPS.map((e,i)=>({e,angle:i/TIPS.length*Math.PI*2,orbit:i<9?1:2,speed:.002+Math.random()*.001,ph:Math.random()*Math.PI*2})));
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    ctx.fillStyle='#020408'; ctx.fillRect(0,0,W,H);
    const cx=W*.5,cy=H*.52;
    [1,2].forEach(o=>{const r=Math.min(W,H)*(o===1?.2:.34);ctx.strokeStyle='rgba(100,160,255,.05)';ctx.lineWidth=.8;ctx.setLineDash([3,10]);ctx.beginPath();ctx.ellipse(cx,cy,r,r*.55,0,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);});
    tRef.current.forEach(tip=>{
      tip.angle+=tip.speed;
      const r=Math.min(W,H)*(tip.orbit===1?.2:.34);
      const tx=cx+Math.cos(tip.angle)*r,ty=cy+Math.sin(tip.angle)*r*.55;
      const alpha=.4+.45*Math.sin(t*1.2+tip.ph);
      ctx.save();ctx.globalAlpha=alpha;ctx.font=`${W>250?15:12}px serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(tip.e,tx,ty);ctx.restore();
    });
    ctx.fillStyle='rgba(100,160,255,.1)'; ctx.strokeStyle='rgba(100,160,255,.25)'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.arc(cx,cy,22,0,Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.font=`700 ${W>250?9:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(100,160,255,.85)'; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('28',cx,cy-4); ctx.fillText('TIPS',cx,cy+7); ctx.textBaseline='alphabetic';
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(100,160,255,.45)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\ud83d\udca1 28 DUBAI TRAVEL TIPS',W*.5,H*.07);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// honest-scale \u2192 blog39
export function ThumbAnim_HonestScale() {
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    ctx.fillStyle='#030408'; ctx.fillRect(0,0,W,H);
    const tilt=Math.sin(t*.6)*.06;
    ctx.fillStyle='rgba(255,255,255,.15)'; ctx.beginPath(); ctx.moveTo(W*.5-14,H*.75); ctx.lineTo(W*.5+14,H*.75); ctx.lineTo(W*.5,H*.62); ctx.closePath(); ctx.fill();
    ctx.fillRect(W*.5-20,H*.75,40,6);
    ctx.save(); ctx.translate(W*.5,H*.6); ctx.rotate(tilt);
    ctx.strokeStyle='rgba(255,255,255,.3)'; ctx.lineWidth=2.5; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(-W*.35,0); ctx.lineTo(W*.35,0); ctx.stroke();
    // Left pan
    ctx.strokeStyle='rgba(0,200,100,.4)'; ctx.lineWidth=1.2;
    const lpy=H*.12+Math.sin(tilt)*W*.35;
    ctx.beginPath();ctx.moveTo(-W*.35,0);ctx.lineTo(-W*.35,lpy);ctx.stroke();
    ctx.fillStyle='rgba(0,200,100,.1)'; ctx.strokeStyle='rgba(0,200,100,.3)'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.ellipse(-W*.35,lpy,W*.1,H*.04,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.font=`12px serif`; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText('\u2705',W*-.35,lpy);
    // Right pan
    ctx.strokeStyle='rgba(200,80,80,.4)'; ctx.lineWidth=1.2;
    const rpy=H*.12-Math.sin(tilt)*W*.35;
    ctx.beginPath();ctx.moveTo(W*.35,0);ctx.lineTo(W*.35,rpy);ctx.stroke();
    ctx.fillStyle='rgba(200,80,80,.1)'; ctx.strokeStyle='rgba(200,80,80,.3)'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.ellipse(W*.35,rpy,W*.1,H*.04,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.font=`12px serif`; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText('\u26a0\ufe0f',W*.35,rpy);
    ctx.restore();
    const PROS=['\ud83c\udf1f World-class','\ud83c\udfdc\ufe0f Desert','\u2708\ufe0f Hub'],CONS=['\ud83d\udcb0 Expensive','\ud83c\udf1e Summer','\ud83c\udfe2 Commercial'];
    PROS.forEach((p,i)=>{ctx.font=`500 ${W>250?9:7}px Outfit,sans-serif`;ctx.fillStyle=`rgba(0,200,100,${.4+.3*Math.sin(t+i)})`;ctx.textAlign='right';ctx.fillText(p,W*.42,H*(.22+i*.14));});
    CONS.forEach((c,i)=>{ctx.font=`500 ${W>250?9:7}px Outfit,sans-serif`;ctx.fillStyle=`rgba(200,100,100,${.4+.3*Math.sin(t+i+1)})`;ctx.textAlign='left';ctx.fillText(c,W*.58,H*(.22+i*.14));});
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.35)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\u2696\ufe0f IS DUBAI WORTH VISITING?',W*.5,H*.07);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// budget-gauge-grid \u2192 blog40
export function ThumbAnim_BudgetGaugeGrid() {
  const ITEMS=[{l:'\ud83c\udfd6\ufe0f Beach',free:true},{l:'\u26f2 Fountain',free:true},{l:'\ud83c\udfdc\ufe0f Safari',cost:150,max:200},{l:'\ud83d\udc9b Gold Souk',free:true},{l:'\ud83c\udfd9\ufe0f Burj',cost:160,max:200},{l:'\ud83d\udee5\ufe0f Dhow',cost:120,max:200}];
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    ctx.fillStyle='#020406'; ctx.fillRect(0,0,W,H);
    const cols=3,rows=2,pad=W*.03,iW=(W-pad*2)/cols,iH=(H*.82)/rows,topY=H*.13;
    ITEMS.forEach((item,i)=>{
      const col=i%cols,row=Math.floor(i/cols);
      const ix=pad+col*iW+iW*.08,iy=topY+row*iH+iH*.08,iw=iW*.84,ih=iH*.78;
      const rp=Math.min(1,Math.max(0,(t*.5-i*.2)));
      ctx.fillStyle=item.free?'rgba(0,200,100,.08)':'rgba(245,158,11,.08)';
      ctx.strokeStyle=item.free?'rgba(0,200,100,.25)':'rgba(245,158,11,.25)'; ctx.lineWidth=.8;
      if(ctx.roundRect){ctx.beginPath();ctx.roundRect(ix,iy,iw,ih,8);ctx.fill();ctx.stroke();}
      ctx.font=`500 ${W>250?9:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.7)'; ctx.textAlign='center';
      ctx.fillText(item.l,ix+iw*.5,iy+ih*.32);
      if(item.free){ctx.font=`700 ${W>250?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(0,220,100,.85)'; ctx.fillText('FREE',ix+iw*.5,iy+ih*.68);}
      else{
        const gx=ix+iw*.08,gy=iy+ih*.55,gw=iw*.84,gh=6;
        ctx.fillStyle='rgba(255,255,255,.07)'; ctx.fillRect(gx,gy,gw,gh);
        ctx.fillStyle='rgba(245,158,11,.6)'; if(ctx.roundRect){ctx.beginPath();ctx.roundRect(gx,gy,gw*(item.cost/item.max)*rp,gh,3);ctx.fill();}
        ctx.font=`600 ${W>250?9:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(245,158,11,.85)'; ctx.textAlign='center'; ctx.fillText(`AED ${item.cost}`,ix+iw*.5,iy+ih*.8);
      }
    });
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.3)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\ud83d\udcb0 DUBAI FREE vs PAID GUIDE',W*.5,H*.07);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// food-galaxy \u2192 blog41
export function ThumbAnim_FoodGalaxy() {
  const DISHES=['\ud83c\udf5a','\ud83e\udd59','\ud83e\uddc6','\ud83e\udd57','\ud83c\udf5e','\ud83e\uded5','\ud83c\udf6e','\ud83c\udf70','\ud83e\uded6','\ud83c\udf62','\ud83e\uddc4','\ud83d\udc1f','\ud83c\udf6f','\u2615','\ud83e\udd6d'];
  const dRef=useRef(DISHES.map((e,i)=>({e,x:.05+Math.random()*.9,y:.08+Math.random()*.84,vx:(Math.random()-.5)*.0003,vy:(Math.random()-.5)*.0003,ph:Math.random()*Math.PI*2,size:14+Math.random()*10})));
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    ctx.fillStyle='#030208'; ctx.fillRect(0,0,W,H);
    const bg=ctx.createRadialGradient(W*.5,H*.5,0,W*.5,H*.5,W*.5); bg.addColorStop(0,'rgba(200,120,30,.06)'); bg.addColorStop(1,'transparent');
    ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
    for(let i=0;i<dRef.current.length;i++) for(let j=i+1;j<dRef.current.length;j++){
      const dx=(dRef.current[i].x-dRef.current[j].x)*W,dy=(dRef.current[i].y-dRef.current[j].y)*H;
      const dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<90){ctx.strokeStyle=`rgba(200,140,50,${(1-dist/90)*.07})`;ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(dRef.current[i].x*W,dRef.current[i].y*H);ctx.lineTo(dRef.current[j].x*W,dRef.current[j].y*H);ctx.stroke();}
    }
    dRef.current.forEach(d=>{
      d.ph+=.016;d.x+=d.vx;d.y+=d.vy;
      if(d.x<.02)d.vx=Math.abs(d.vx);if(d.x>.97)d.vx=-Math.abs(d.vx);
      if(d.y<.04)d.vy=Math.abs(d.vy);if(d.y>.95)d.vy=-Math.abs(d.vy);
      ctx.save();ctx.globalAlpha=.5+.45*Math.sin(d.ph);
      ctx.font=`${d.size}px serif`;ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.fillText(d.e,d.x*W,d.y*H+Math.sin(d.ph)*4);ctx.restore();
    });
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(200,140,50,.55)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('\ud83c\udf7d\ufe0f WHAT TO EAT IN DUBAI',W*.5,H*.06);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// december-lights \u2192 blog42
export function ThumbAnim_DecemberLights() {
  const snowRef=useRef(Array.from({length:25},()=>({x:Math.random(),y:Math.random(),vy:.001+Math.random()*.001,a:.3+Math.random()*.5,s:1.5+Math.random()*2.5})));
  const ref = useThumbCanvas((ctx,W,H,t)=>{
    ctx.fillStyle='#010310'; ctx.fillRect(0,0,W,H);
    nightSky(ctx,W,H); stars(ctx,W,H,t,40,.6);
    snowRef.current.forEach(s=>{s.y+=s.vy;if(s.y>1)s.y=0;ctx.fillStyle=`rgba(200,220,255,${s.a})`;ctx.beginPath();ctx.arc(s.x*W,s.y*H,s.s,0,Math.PI*2);ctx.fill();});
    // Simple calendar grid
    const cols=7,rows=4,sx=W*.05,sy=H*.25,cw=(W*.9)/cols,ch=(H*.6)/rows;
    for(let d=1;d<=28;d++){
      const startOff=2; const ci=(d-1+startOff)%7; const ri=Math.floor((d-1+startOff)/7);
      if(ri>=rows) break;
      const isEvent=[2,5,17,24,25,28].includes(d);
      ctx.fillStyle=isEvent?'rgba(245,158,11,.2)':'rgba(255,255,255,.04)';
      ctx.strokeStyle=isEvent?'rgba(245,158,11,.5)':'rgba(255,255,255,.08)'; ctx.lineWidth=.8;
      if(ctx.roundRect){ctx.beginPath();ctx.roundRect(sx+ci*cw+1,sy+ri*ch+1,cw-2,ch-2,4);ctx.fill();ctx.stroke();}
      ctx.font=`${isEvent?'700':'400'} ${W>250?9:8}px Outfit,sans-serif`; ctx.fillStyle=isEvent?'rgba(245,158,11,.9)':'rgba(255,255,255,.5)';
      ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(d,sx+ci*cw+cw*.5,sy+ri*ch+ch*.5);
    }
    ctx.font=`700 ${W>250?12:10}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,215,0,.8)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('DECEMBER 2026',W*.5,H*.2);
    ctx.font=`600 ${W>250?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,200,80,.5)'; ctx.textAlign='center';
    ctx.fillText('\ud83c\udf84 DUBAI IN DECEMBER',W*.5,H*.07);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-hidden="true"/>;
}

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
//  MASTER REGISTRY \u2014 slug \u2192 component
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
export const BLOG_CARD_ANIMS = {
  'evening-desert-safari-dubai-complete-guide': ThumbAnim_CityToDesert,
  'best-time-desert-safari-dubai':              ThumbAnim_SeasonalWheel,
  'what-to-wear-desert-safari-dubai':           ThumbAnim_OutfitFloat,
  'desert-safari-dubai-with-kids':              ThumbAnim_FamilyDesert,
  'morning-vs-evening-desert-safari-dubai':     ThumbAnim_MorningVsEvening,
  'overnight-desert-safari-dubai-review':       ThumbAnim_OvernightTent,
  'dubai-desert-conservation-reserve-guide':    ThumbAnim_WildlifeDots,
  'hot-air-balloon-dubai-guide':                ThumbAnim_BalloonLaunch,
  'hot-air-balloon-dubai-worth-it':             ThumbAnim_GoldenHorizon,
  'hot-air-balloon-dubai-cancelled-weather':    ThumbAnim_WeatherRadar,
  'hot-air-balloon-dubai-sunrise-4am':          ThumbAnim_PreDawn,
  'propose-hot-air-balloon-dubai':              ThumbAnim_RomanceBalloon,
  'hot-air-balloon-dubai-age-weight-limits':    ThumbAnim_SafetyGauge,
  'hot-air-balloon-dubai-photography-tips':     ThumbAnim_CameraLens,
  'dhow-cruise-dubai-marina-vs-creek':          ThumbAnim_NavigationMap,
  'dhow-cruise-dubai-dinner-guide':             ThumbAnim_FoodBuffet,
  'dhow-cruise-dubai-food-menu':                ThumbAnim_FoodBuffet,
  'romantic-dhow-cruise-dubai-couples':         ThumbAnim_RomanticDeck,
  'dhow-cruise-dubai-tips-dress-code':          ThumbAnim_MarinaSkyline,
  'private-dhow-cruise-dubai-groups':           ThumbAnim_GroupDeck,
  'quad-biking-dubai-guide':                    ThumbAnim_QuadRacing,
  'quad-bike-dubai-age-limit-experience':       ThumbAnim_HelmetSafety,
  'quad-biking-vs-sandboarding-dubai':          ThumbAnim_QuadVsBoard,
  '30-min-vs-60-min-quad-bike-dubai':           ThumbAnim_Timer3060,
  'quad-bike-desert-safari-combo-dubai':        ThumbAnim_ComboMap,
  'camel-riding-dubai-guide':                   ThumbAnim_CamelWalkHero,
  'camel-riding-dubai-ethical':                 ThumbAnim_WelfareCheck,
  'sunrise-camel-ride-dubai':                   ThumbAnim_SunriseGolden,
  'bedouin-experience-dubai':                   ThumbAnim_CoffeeCeremony,
  'private-city-tour-dubai-guide':              ThumbAnim_CityLandmarks,
  'dubai-city-tour-itinerary-16-stops':         ThumbAnim_CityLandmarks,
  'old-dubai-vs-modern-dubai-tour':             ThumbAnim_HeritageVsModern,
  'half-day-vs-full-day-dubai-city-tour':       ThumbAnim_HalfFullTimeline,
  'best-dubai-tours-2026-ranked':               ThumbAnim_ToursPodium,
  'desert-safari-vs-hot-air-balloon-dubai':     ThumbAnim_SafariBalloonDuel,
  'how-many-days-in-dubai':                     ThumbAnim_ItineraryCalendar,
  'best-time-to-visit-dubai-guide':             ThumbAnim_MonthEventsRing,
  'dubai-travel-tips-first-timers':             ThumbAnim_TipsOrbit,
  'is-dubai-worth-visiting':                    ThumbAnim_HonestScale,
  'dubai-on-a-budget-guide':                    ThumbAnim_BudgetGaugeGrid,
  'what-to-eat-dubai-food-guide':               ThumbAnim_FoodGalaxy,
  'dubai-in-december-guide':                    ThumbAnim_DecemberLights,
};

// Main export \u2014 renders the right animation for any blog slug

// ─────────────────────────────────────────────────────────────
// ANIM_ID_MAP — maps blog animId field → animation component
// Used for the 114 new draft blogs (and all future blogs)
// ─────────────────────────────────────────────────────────────
export const ANIM_ID_MAP = {
  'balloon-launch':       ThumbAnim_BalloonLaunch,
  'bedouin-camp':         ThumbAnim_OvernightTent,
  'bedouin-camp-hero':    ThumbAnim_OvernightTent,
  'budget-gauge-grid':    ThumbAnim_BudgetGaugeGrid,
  'camel-sandboard':      ThumbAnim_CamelWalkHero,
  'camel-walk-hero':      ThumbAnim_CamelWalkHero,
  'camera-lens':          ThumbAnim_CameraLens,
  'city-landmarks':       ThumbAnim_CityLandmarks,
  'city-to-desert':       ThumbAnim_CityToDesert,
  'coffee-ceremony':      ThumbAnim_CoffeeCeremony,
  'combo-map':            ThumbAnim_ComboMap,
  'creek-at-dusk':        ThumbAnim_MarinaSkyline,
  'december-lights':      ThumbAnim_DecemberLights,
  'dune-bashing':         ThumbAnim_CityToDesert,
  'family-desert':        ThumbAnim_FamilyDesert,
  'food-buffet':          ThumbAnim_FoodBuffet,
  'food-galaxy':          ThumbAnim_FoodGalaxy,
  'golden-horizon':       ThumbAnim_GoldenHorizon,
  'group-deck':           ThumbAnim_GroupDeck,
  'half-full-timeline':   ThumbAnim_HalfFullTimeline,
  'helmet-safety':        ThumbAnim_HelmetSafety,
  'heritage-vs-modern':   ThumbAnim_HeritageVsModern,
  'honest-scale':         ThumbAnim_HonestScale,
  'itinerary-calendar':   ThumbAnim_ItineraryCalendar,
  'marina-skyline':       ThumbAnim_MarinaSkyline,
  'milky-way':            ThumbAnim_PreDawn,
  'month-events-ring':    ThumbAnim_MonthEventsRing,
  'morning-vs-evening':   ThumbAnim_MorningVsEvening,
  'music-deck':           ThumbAnim_RomanticDeck,
  'navigation-map':       ThumbAnim_NavigationMap,
  'outfit-float':         ThumbAnim_OutfitFloat,
  'overnight-tent':       ThumbAnim_OvernightTent,
  'pre-dawn-dark':        ThumbAnim_PreDawn,
  'quad-racing':          ThumbAnim_QuadRacing,
  'quad-vs-board':        ThumbAnim_QuadVsBoard,
  'romance-balloon':      ThumbAnim_RomanceBalloon,
  'romantic-deck':        ThumbAnim_RomanticDeck,
  'safari-balloon-duel':  ThumbAnim_SafariBalloonDuel,
  'safety-gauge':         ThumbAnim_SafetyGauge,
  'seasonal-wheel':       ThumbAnim_SeasonalWheel,
  'souk-abra-map':        ThumbAnim_NavigationMap,
  'sunrise-clouds':       ThumbAnim_SunriseGolden,
  'sunrise-golden':       ThumbAnim_SunriseGolden,
  'tanoura-show':         ThumbAnim_DecemberLights,
  'temperature-gauge':    ThumbAnim_WeatherRadar,
  'timer-30-60':          ThumbAnim_Timer3060,
  'tips-orbit':           ThumbAnim_TipsOrbit,
  'tours-podium':         ThumbAnim_ToursPodium,
  'uv-sun':               ThumbAnim_WeatherRadar,
  'water-reflections':    ThumbAnim_MarinaSkyline,
  'weather-radar':        ThumbAnim_WeatherRadar,
  'welfare-check':        ThumbAnim_WelfareCheck,
  'wildlife-dots':        ThumbAnim_WildlifeDots,
  // generic fallbacks by category
  'generic':              ThumbAnim_CityToDesert,
  'desert-safari':        ThumbAnim_CityToDesert,
  'hot-air-balloon':      ThumbAnim_BalloonLaunch,
  'dhow-cruise':          ThumbAnim_MarinaSkyline,
  'quad-bike':            ThumbAnim_QuadRacing,
  'camel-riding':         ThumbAnim_CamelWalkHero,
  'city-tour':            ThumbAnim_CityLandmarks,
  'dubai-guide':          ThumbAnim_TipsOrbit,
};

export default function BlogCardCanvas({ slug, animId, style }) {
  // Try slug first, then animId, then category fallback
  const AnimComp = BLOG_CARD_ANIMS[slug] || ANIM_ID_MAP[animId] || ANIM_ID_MAP['generic'];
  if (!AnimComp) return null;
  return (
    <div style={{ width:'100%', height:'100%', ...style }}>
      <AnimComp />
    </div>
  );
}
