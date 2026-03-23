'use client';
import { useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════
// DHOW CRUISE BLOGS 15–20 — 8 unique animations
// All IDs globally unique — never reused anywhere on site
//
// marina-skyline    — Dubai Marina towers at night, dhow bow
// creek-at-dusk     — Old Dubai creek, wind towers, abra silhouettes
// food-buffet       — Floating dishes, steam, Arabic spread
// water-reflections — City lights reflecting on dark water
// romantic-deck     — Couple silhouette, candles, moon on water
// music-notes-deck  — Live band, oud strings, floating notes
// group-deck        — Party crowd, confetti, celebration
// navigation-map    — Route tracing marina vs creek with compass
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

// ── 1. MARINA SKYLINE NIGHT — dhow bow + towers ───────────────
export function BlogAnim_MarinaSkyline() {
  const ref = useCanvas((ctx, W, H, t) => {
    // Deep night sky
    const sky = ctx.createLinearGradient(0,0,0,H*0.62);
    sky.addColorStop(0,'#010208'); sky.addColorStop(0.5,'#030410'); sky.addColorStop(1,'#060218');
    ctx.fillStyle = sky; ctx.fillRect(0,0,W,H);
    // Stars
    for(let i=0;i<80;i++){
      ctx.fillStyle=`rgba(255,255,255,${0.08+Math.sin(t*1.2+i)*0.06})`;
      ctx.beginPath(); ctx.arc((i*173)%W,(i*89)%(H*0.45),0.6+(i%4)*0.2,0,Math.PI*2); ctx.fill();
    }
    // Water
    const wg = ctx.createLinearGradient(0,H*0.62,0,H);
    wg.addColorStop(0,'#050318'); wg.addColorStop(1,'#020110');
    ctx.fillStyle=wg; ctx.fillRect(0,H*0.62,W,H);

    // Marina towers — iconic silhouettes
    const TOWERS = [
      {x:0.04,w:0.032,h:0.52,floors:18,color:'#0A1530'},
      {x:0.08,w:0.028,h:0.42,floors:14,color:'#0C1A38'},
      {x:0.12,w:0.036,h:0.58,floors:20,color:'#081228'},
      {x:0.17,w:0.025,h:0.36,floors:12,color:'#0A1530'},
      {x:0.21,w:0.042,h:0.65,floors:22,color:'#060E22'},
      {x:0.26,w:0.030,h:0.44,floors:15,color:'#0C1A38'},
      {x:0.30,w:0.026,h:0.38,floors:13,color:'#0A1530'},
      {x:0.55,w:0.028,h:0.40,floors:13,color:'#0A1530'},
      {x:0.59,w:0.034,h:0.55,floors:19,color:'#060E22'},
      {x:0.64,w:0.030,h:0.46,floors:15,color:'#0C1A38'},
      {x:0.68,w:0.022,h:0.33,floors:11,color:'#0A1530'},
      {x:0.72,w:0.038,h:0.62,floors:21,color:'#081228'},
      {x:0.77,w:0.026,h:0.38,floors:13,color:'#0A1530'},
      {x:0.81,w:0.044,h:0.68,floors:23,color:'#060E22'},
      {x:0.86,w:0.028,h:0.42,floors:14,color:'#0C1A38'},
      {x:0.90,w:0.032,h:0.50,floors:17,color:'#0A1530'},
      {x:0.94,w:0.025,h:0.35,floors:12,color:'#0A1530'},
    ];
    TOWERS.forEach((tw,ti) => {
      const tx=W*tw.x, ty=H*(0.62-tw.h), tw2=W*tw.w, th=H*tw.h;
      ctx.fillStyle=tw.color; ctx.fillRect(tx,ty,tw2,th);
      // Window grid
      const cols=Math.max(2,Math.floor(tw2/7)), rows=Math.min(tw.floors,Math.floor(th/9));
      for(let r=0;r<rows;r++) for(let c=0;c<cols;c++){
        const lit=Math.sin(t*0.3+ti*4+r*3+c*5)>-0.2;
        if(lit){
          ctx.fillStyle=`rgba(255,220,130,${0.2+Math.sin(t*0.5+r+c)*0.1})`;
          ctx.fillRect(tx+2+c*(tw2/cols),ty+3+r*(th/rows),tw2/cols-2,th/rows-2);
        }
      }
      // Antenna light
      ctx.fillStyle=`rgba(255,80,80,${0.5+Math.sin(t*2+ti)*0.4})`;
      ctx.beginPath(); ctx.arc(tx+tw2/2,ty-2,1.5,0,Math.PI*2); ctx.fill();
    });

    // Water reflections of towers
    ctx.save(); ctx.globalAlpha=0.22;
    TOWERS.forEach((tw) => {
      const tx=W*tw.x, refY=H*0.62, tw2=W*tw.w, refH=H*tw.h*0.35;
      const rg=ctx.createLinearGradient(0,refY,0,refY+refH);
      rg.addColorStop(0,'rgba(100,150,255,0.5)'); rg.addColorStop(1,'transparent');
      ctx.fillStyle=rg; ctx.fillRect(tx,refY,tw2,refH);
    });
    ctx.restore();

    // Water ripple lines
    for(let i=0;i<6;i++){
      ctx.strokeStyle=`rgba(100,150,255,${0.04+Math.sin(t*1.5+i)*0.03})`;
      ctx.lineWidth=1;
      ctx.beginPath(); const wy=H*(0.66+i*0.045);
      for(let x=0;x<=W;x+=6){ ctx.lineTo(x,wy+Math.sin(x*0.02+t*1.2+i)*2.5); }
      ctx.stroke();
    }

    // Dhow boat silhouette (center foreground)
    const dhowX=W*0.5, dhowY=H*0.68;
    ctx.fillStyle='rgba(5,3,15,0.97)';
    // Hull
    ctx.beginPath(); ctx.moveTo(dhowX-W*0.18,dhowY); ctx.lineTo(dhowX+W*0.2,dhowY);
    ctx.lineTo(dhowX+W*0.22,dhowY+H*0.04); ctx.lineTo(dhowX-W*0.16,dhowY+H*0.04); ctx.closePath(); ctx.fill();
    // Pointed bow
    ctx.beginPath(); ctx.moveTo(dhowX+W*0.2,dhowY); ctx.lineTo(dhowX+W*0.28,dhowY+H*0.02);
    ctx.lineTo(dhowX+W*0.22,dhowY+H*0.04); ctx.closePath(); ctx.fill();
    // Deck cabin
    ctx.fillRect(dhowX-W*0.12,dhowY-H*0.04,W*0.24,H*0.04);
    // Mast
    ctx.strokeStyle='rgba(5,3,15,0.9)'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(dhowX,dhowY); ctx.lineTo(dhowX,dhowY-H*0.12); ctx.stroke();
    // String lights on dhow
    for(let li=0;li<12;li++){
      const lx=dhowX-W*0.14+li*W*0.025;
      const ly=dhowY-H*0.025+Math.sin(li*0.8+t)*3;
      ctx.fillStyle=`rgba(255,220,100,${0.6+Math.sin(t*2+li)*0.3})`;
      ctx.beginPath(); ctx.arc(lx,ly,2,0,Math.PI*2); ctx.fill();
    }
    // Deck glow
    const dg=ctx.createRadialGradient(dhowX,dhowY-H*0.02,0,dhowX,dhowY-H*0.02,W*0.15);
    dg.addColorStop(0,'rgba(255,200,80,0.08)'); dg.addColorStop(1,'transparent');
    ctx.fillStyle=dg; ctx.fillRect(dhowX-W*0.2,dhowY-H*0.08,W*0.4,H*0.1);

    ctx.font=`600 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(100,150,255,0.45)';
    ctx.textAlign='center'; ctx.fillText('DUBAI MARINA — 8:30 PM · TRADITIONAL DHOW CRUISE',W*0.5,H*0.06);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Dubai Marina night skyline with glowing towers and a traditional dhow cruise boat on the water" />;
}

// ── 2. CREEK AT DUSK — wind towers + abra silhouettes ─────────
export function BlogAnim_CreekDusk() {
  const ref = useCanvas((ctx, W, H, t) => {
    // Warm dusk sky
    const sky = ctx.createLinearGradient(0,0,0,H*0.6);
    sky.addColorStop(0,'#050210'); sky.addColorStop(0.3,'#1A0A00'); sky.addColorStop(0.7,'#B04000'); sky.addColorStop(1,'#D06820');
    ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
    // Sun just below horizon — orange glow
    const sg=ctx.createRadialGradient(W*0.65,H*0.62,0,W*0.65,H*0.62,W*0.3);
    sg.addColorStop(0,'rgba(255,140,30,0.5)'); sg.addColorStop(0.4,'rgba(200,80,10,0.2)'); sg.addColorStop(1,'transparent');
    ctx.fillStyle=sg; ctx.fillRect(0,0,W,H);
    // Water
    const wg=ctx.createLinearGradient(0,H*0.6,0,H);
    wg.addColorStop(0,'#3A1A00'); wg.addColorStop(1,'#1A0800');
    ctx.fillStyle=wg; ctx.fillRect(0,H*0.6,W,H);

    // Old Dubai creek buildings (low-rise, heritage)
    const HERITAGE=[
      {x:0.02,w:0.06,h:0.32,wind:true},{x:0.09,w:0.04,h:0.26,wind:false},
      {x:0.14,w:0.05,h:0.30,wind:true},{x:0.20,w:0.03,h:0.22,wind:false},
      {x:0.24,w:0.06,h:0.28,wind:false},{x:0.31,w:0.04,h:0.24,wind:true},
      {x:0.36,w:0.05,h:0.31,wind:false},{x:0.55,w:0.04,h:0.25,wind:false},
      {x:0.60,w:0.06,h:0.34,wind:true},{x:0.67,w:0.04,h:0.26,wind:false},
      {x:0.72,w:0.05,h:0.29,wind:true},{x:0.78,w:0.03,h:0.21,wind:false},
      {x:0.82,w:0.06,h:0.32,wind:false},{x:0.89,w:0.04,h:0.24,wind:true},
      {x:0.94,w:0.05,h:0.28,wind:false},
    ];
    HERITAGE.forEach((b,i)=>{
      const bx=W*b.x, bh=H*b.h, by=H*0.6-bh, bw=W*b.w;
      // Ochre/sandstone building
      const bg2=ctx.createLinearGradient(bx,by,bx+bw,by+bh);
      bg2.addColorStop(0,`rgba(160,${80+i*3},${20+i*2},0.92)`);
      bg2.addColorStop(1,`rgba(100,${50+i*2},${10+i},0.95)`);
      ctx.fillStyle=bg2; ctx.fillRect(bx,by,bw,bh);
      // Windows — warm interior light
      const wc=Math.max(1,Math.floor(bw/12)), wr=Math.min(4,Math.floor(bh/16));
      for(let r=0;r<wr;r++) for(let c=0;c<wc;c++){
        ctx.fillStyle=`rgba(255,200,80,${0.25+Math.sin(t*0.4+i*2+r+c)*0.1})`;
        const wx2=bx+3+c*(bw/wc), wy2=by+4+r*(bh/wr);
        ctx.fillRect(wx2,wy2,bw/wc-3,bh/wr-4);
      }
      // Wind tower (barjeel) on selected buildings
      if(b.wind){
        const twX=bx+bw*0.3, twW=bw*0.4, twH=bh*0.35;
        ctx.fillStyle='rgba(130,60,15,0.95)';
        ctx.fillRect(twX,by-twH,twW,twH);
        // Tower vents
        ctx.strokeStyle='rgba(80,30,5,0.8)'; ctx.lineWidth=1;
        [0.25,0.5,0.75].forEach(f=>{ctx.beginPath();ctx.moveTo(twX+twW*f,by-twH);ctx.lineTo(twX+twW*f,by);ctx.stroke();});
        ctx.strokeStyle='rgba(80,30,5,0.8)';
        [0.3,0.6].forEach(f=>{ctx.beginPath();ctx.moveTo(twX,by-twH*f);ctx.lineTo(twX+twW,by-twH*f);ctx.stroke();});
      }
    });

    // Water reflections
    HERITAGE.forEach((b,i)=>{
      const bx=W*b.x, bw=W*b.w;
      const rg=ctx.createLinearGradient(0,H*0.6,0,H*0.75);
      rg.addColorStop(0,'rgba(200,100,30,0.18)'); rg.addColorStop(1,'transparent');
      ctx.fillStyle=rg; ctx.fillRect(bx,H*0.6,bw,H*0.15);
    });

    // Water ripples
    for(let i=0;i<5;i++){
      ctx.strokeStyle=`rgba(200,120,40,${0.05+Math.sin(t*1.3+i)*0.03})`; ctx.lineWidth=1;
      ctx.beginPath(); const wy=H*(0.64+i*0.06);
      for(let x=0;x<=W;x+=5){ctx.lineTo(x,wy+Math.sin(x*0.025+t*1.5+i)*2.2);}
      ctx.stroke();
    }

    // Abra silhouettes (small wooden water taxis)
    [[W*0.3,H*0.7],[W*0.5,H*0.72],[W*0.68,H*0.69]].forEach(([ax,ay],i)=>{
      const dir=i%2===0?1:-1;
      ctx.save(); ctx.translate(ax,ay);
      if(dir<0) ctx.scale(-1,1);
      ctx.fillStyle='rgba(5,2,0,0.92)';
      // Hull
      ctx.beginPath(); ctx.moveTo(-W*0.055,0); ctx.lineTo(W*0.055,0);
      ctx.lineTo(W*0.065,H*0.025); ctx.lineTo(-W*0.045,H*0.025); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(W*0.055,0); ctx.lineTo(W*0.075,H*0.012); ctx.lineTo(W*0.065,H*0.025); ctx.closePath(); ctx.fill();
      // Canopy
      ctx.fillRect(-W*0.04,-H*0.025,W*0.07,H*0.025);
      // Passengers silhouettes
      for(let p=0;p<3;p++){ctx.beginPath();ctx.arc(-W*0.02+p*W*0.018,-H*0.03,3.5,0,Math.PI*2);ctx.fill();}
      ctx.restore();
    });

    ctx.font=`600 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,160,60,0.5)';
    ctx.textAlign='center'; ctx.fillText('DUBAI CREEK — OLD TOWN · HERITAGE DHOW ROUTE',W*0.5,H*0.06);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Dubai Creek at dusk showing old heritage buildings with wind towers and traditional abra water taxis" />;
}

// ── 3. FOOD BUFFET — floating Arabic dishes ───────────────────
export function BlogAnim_FoodBuffet() {
  const DISHES=[
    {emoji:'🍢',label:'Grilled Kofta'},{emoji:'🥗',label:'Fattoush'},
    {emoji:'🧆',label:'Falafel'},{emoji:'🍞',label:'Arabic Bread'},
    {emoji:'🫕',label:'Hummus'},{emoji:'🍖',label:'Lamb Chops'},
    {emoji:'🍚',label:'Machboos'},{emoji:'🥩',label:'Shawarma'},
    {emoji:'🍰',label:'Umm Ali'},{emoji:'🫖',label:'Karak Tea'},
    {emoji:'🧁',label:'Baklava'},{emoji:'🍓',label:'Fresh Fruit'},
  ];
  const dishesRef=useRef(DISHES.map((d,i)=>({
    ...d, x:0.06+(i%6)*0.17, y:0.18+Math.floor(i/6)*0.48,
    vx:(Math.random()-0.5)*0.0003, vy:(Math.random()-0.5)*0.0003,
    ph:Math.random()*Math.PI*2, size:20+Math.random()*12,
  })));
  const smokeRef=useRef(Array.from({length:10},()=>({x:0,y:0,vx:0,vy:0,a:0,s:3,life:0,active:false})));
  const ref = useCanvas((ctx, W, H, t) => {
    const dishes=dishesRef.current; const smoke=smokeRef.current;
    const bg=ctx.createLinearGradient(0,0,W,H);
    bg.addColorStop(0,'#030208'); bg.addColorStop(0.5,'#080312'); bg.addColorStop(1,'#030208');
    ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
    // Warm glow center
    const glow=ctx.createRadialGradient(W*0.5,H*0.5,0,W*0.5,H*0.5,W*0.45);
    glow.addColorStop(0,'rgba(200,120,30,0.08)'); glow.addColorStop(1,'transparent');
    ctx.fillStyle=glow; ctx.fillRect(0,0,W,H);
    // Connection threads
    for(let i=0;i<dishes.length;i++) for(let j=i+1;j<dishes.length;j++){
      const dx=(dishes[i].x-dishes[j].x)*W, dy=(dishes[i].y-dishes[j].y)*H;
      const dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<120){ctx.strokeStyle=`rgba(200,150,50,${(1-dist/120)*0.08})`;ctx.lineWidth=0.6;ctx.beginPath();ctx.moveTo(dishes[i].x*W,dishes[i].y*H);ctx.lineTo(dishes[j].x*W,dishes[j].y*H);ctx.stroke();}
    }
    // Dishes
    dishes.forEach(d=>{
      d.x+=d.vx; d.y+=d.vy; d.ph+=0.018;
      if(d.x<0.03)d.vx=Math.abs(d.vx); if(d.x>0.97)d.vx=-Math.abs(d.vx);
      if(d.y<0.05)d.vy=Math.abs(d.vy); if(d.y>0.9)d.vy=-Math.abs(d.vy);
      const px=d.x*W, py=d.y*H+Math.sin(d.ph)*5;
      const alpha=0.5+0.5*Math.sin(d.ph);
      // Plate glow
      const pg=ctx.createRadialGradient(px,py,0,px,py,d.size*1.4);
      pg.addColorStop(0,'rgba(255,200,80,0.12)'); pg.addColorStop(1,'transparent');
      ctx.fillStyle=pg; ctx.beginPath(); ctx.arc(px,py,d.size*1.4,0,Math.PI*2); ctx.fill();
      ctx.save(); ctx.globalAlpha=alpha;
      ctx.font=`${d.size}px serif`; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(d.emoji,px,py); ctx.restore();
      // Label
      if(W>500){
        ctx.font=`500 9px Outfit,sans-serif`; ctx.fillStyle=`rgba(255,200,80,${alpha*0.5})`;
        ctx.textAlign='center'; ctx.fillText(d.label,px,py+d.size*0.8);
      }
      // Steam from hot dishes
      if(['🍢','🍖','🥩','🍚'].includes(d.emoji)){
        const sp=smoke.find(p=>!p.active); if(sp&&Math.random()<0.05){
          sp.x=px;sp.y=py-d.size*0.5;sp.vx=(Math.random()-0.5)*0.3;sp.vy=-(0.4+Math.random()*0.4);sp.a=0.3;sp.s=3+Math.random()*3;sp.life=1;sp.active=true;
        }
      }
    });
    smoke.forEach(p=>{if(!p.active)return;p.x+=p.vx;p.y+=p.vy;p.life-=0.022;if(p.life<=0){p.active=false;return;}
      ctx.strokeStyle=`rgba(220,200,180,${p.life*p.a*0.3})`;ctx.lineWidth=p.s*p.life;
      ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x+p.vx*3,p.y-3);ctx.stroke();
    });
    // Center plate label
    ctx.font=`700 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,200,80,0.5)';
    ctx.textAlign='center'; ctx.fillText('DHOW CRUISE BUFFET — 12 DISHES INCLUDED',W*0.5,H*0.5);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Floating Arabic food dishes showing the full dhow cruise dinner buffet spread" />;
}

// ── 4. WATER REFLECTIONS — city lights on dark water ─────────
export function BlogAnim_WaterReflections() {
  const ref = useCanvas((ctx, W, H, t) => {
    ctx.fillStyle='#010108'; ctx.fillRect(0,0,W,H);
    const midY=H*0.48;
    // Upper half — night city strip
    ctx.fillStyle='#080410'; ctx.fillRect(0,0,W,midY);
    // City light strip
    for(let i=0;i<40;i++){
      const lx=(i*197)%W, ly=midY-4-Math.random()*midY*0.8;
      const lh=midY*0.05+Math.random()*midY*0.3;
      const lw=W*0.008+Math.random()*W*0.015;
      ctx.fillStyle=`rgba(${180+i*2%75},${150+i%50},${50+i*3%80},${0.6+Math.sin(t*0.5+i)*0.2})`;
      ctx.fillRect(lx,ly,lw,lh);
    }
    // Horizon line
    ctx.strokeStyle='rgba(100,150,255,0.15)'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(0,midY); ctx.lineTo(W,midY); ctx.stroke();
    // Water — lower half with animated ripple reflections
    ctx.fillStyle='#020110'; ctx.fillRect(0,midY,W,H-midY);
    // Reflection columns
    for(let i=0;i<40;i++){
      const lx=(i*197)%W;
      const COLORS=['rgba(255,220,80','rgba(255,150,50','rgba(100,180,255','rgba(180,255,150'];
      const c=COLORS[i%4];
      const refH=(H-midY)*0.6;
      const rg=ctx.createLinearGradient(0,midY,0,midY+refH);
      rg.addColorStop(0,`${c},${0.35+Math.sin(t*0.4+i)*0.1})`);
      rg.addColorStop(1,'transparent');
      ctx.fillStyle=rg;
      // Wavy reflection
      for(let y=midY;y<midY+refH;y+=3){
        const wave=Math.sin(y*0.08+t*2+i*0.5)*((y-midY)/refH)*6;
        ctx.fillRect(lx+wave-1,y,3,3);
      }
    }
    // Ripple rings
    for(let r=0;r<8;r++){
      const rx=(r*173+t*20)%W, ry=midY+H*(0.05+r*0.08);
      const rr=10+((t*30+r*40)%60);
      const alpha=(1-rr/70)*0.12;
      if(alpha>0){ctx.strokeStyle=`rgba(100,150,255,${alpha})`;ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(rx,ry,rr,rr*0.3,0,0,Math.PI*2);ctx.stroke();}
    }
    // Dhow silhouette gliding
    const dhX=((t*20)%( W+W*0.3))-W*0.15;
    ctx.fillStyle='rgba(3,1,10,0.95)';
    ctx.beginPath(); ctx.moveTo(dhX-W*0.09,midY+2); ctx.lineTo(dhX+W*0.1,midY+2);
    ctx.lineTo(dhX+W*0.12,midY+H*0.04); ctx.lineTo(dhX-W*0.07,midY+H*0.04); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(dhX+W*0.1,midY+2); ctx.lineTo(dhX+W*0.13,midY+H*0.02);
    ctx.lineTo(dhX+W*0.12,midY+H*0.04); ctx.closePath(); ctx.fill();
    ctx.fillRect(dhX-W*0.06,midY-H*0.02,W*0.12,H*0.022);
    // String lights
    for(let li=0;li<8;li++){
      const llx=dhX-W*0.07+li*W*0.022;
      ctx.fillStyle=`rgba(255,220,100,${0.5+Math.sin(t*2+li)*0.4})`;
      ctx.beginPath(); ctx.arc(llx,midY-H*0.008,1.5,0,Math.PI*2); ctx.fill();
    }
    ctx.font=`600 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(100,150,255,0.35)';
    ctx.textAlign='center'; ctx.fillText('DUBAI MARINA · CITY LIGHTS · WATER REFLECTIONS',W*0.5,H*0.06);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Dubai city lights reflecting on dark marina water as a dhow cruise glides past" />;
}

// ── 5. ROMANTIC DECK — candles, moon, couple ─────────────────
export function BlogAnim_RomanticDeck() {
  const starsRef=useRef(Array.from({length:120},()=>({x:Math.random(),y:Math.random()*0.55,s:0.3+Math.random()*1.5,a:0.1+Math.random()*0.6,ph:Math.random()*Math.PI*2})));
  const heartsRef=useRef(Array.from({length:12},(_,i)=>({x:0.35+Math.random()*0.3,y:0.3+Math.random()*0.4,vy:-(0.002+Math.random()*0.002),a:0.2+Math.random()*0.4,size:8+Math.random()*10,ph:Math.random()*Math.PI*2})));
  const ref = useCanvas((ctx, W, H, t) => {
    const stars=starsRef.current; const hearts=heartsRef.current;
    const sky=ctx.createLinearGradient(0,0,0,H*0.65);
    sky.addColorStop(0,'#000003'); sky.addColorStop(0.4,'#020110'); sky.addColorStop(0.7,'#080220'); sky.addColorStop(1,'#100420');
    ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
    stars.forEach(s=>{const a=s.a*(0.4+0.6*Math.sin(t*1.2+s.ph));ctx.fillStyle=`rgba(255,220,255,${a})`;ctx.beginPath();ctx.arc(s.x*W,s.y*H,s.s,0,Math.PI*2);ctx.fill();});
    // Moon
    const moonG=ctx.createRadialGradient(W*0.78,H*0.14,0,W*0.78,H*0.14,26);
    moonG.addColorStop(0,'rgba(255,248,220,0.92)'); moonG.addColorStop(1,'transparent');
    ctx.fillStyle=moonG; ctx.beginPath(); ctx.arc(W*0.78,H*0.14,26,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='rgba(0,0,2,0.97)'; ctx.beginPath(); ctx.arc(W*0.78+10,H*0.14-5,21,0,Math.PI*2); ctx.fill();
    // Moon glow on water
    const mg=ctx.createRadialGradient(W*0.78,H*0.55,0,W*0.78,H*0.55,W*0.25);
    mg.addColorStop(0,'rgba(255,248,220,0.12)'); mg.addColorStop(1,'transparent');
    ctx.fillStyle=mg; ctx.fillRect(0,H*0.5,W,H*0.5);
    // Water
    const wg=ctx.createLinearGradient(0,H*0.65,0,H);
    wg.addColorStop(0,'#050220'); wg.addColorStop(1,'#020110');
    ctx.fillStyle=wg; ctx.fillRect(0,H*0.65,W,H*0.35);
    // Moon reflection on water
    for(let i=0;i<8;i++){
      const refX=W*0.78+(Math.random()-0.5)*20;
      ctx.strokeStyle=`rgba(255,248,220,${0.04+Math.sin(t*1.5+i)*0.03})`;ctx.lineWidth=1+i*0.3;
      ctx.beginPath(); const ry=H*(0.67+i*0.04);
      for(let x=refX-30;x<refX+30;x+=3){ctx.lineTo(x,ry+Math.sin(x*0.08+t*1.5)*2);}
      ctx.stroke();
    }
    // Dhow deck foreground
    ctx.fillStyle='rgba(20,8,5,0.97)'; ctx.fillRect(0,H*0.7,W,H*0.3);
    // Deck planks
    ctx.strokeStyle='rgba(60,30,10,0.6)'; ctx.lineWidth=1;
    for(let p=0;p<8;p++){ctx.beginPath();ctx.moveTo(0,H*0.72+p*H*0.035);ctx.lineTo(W,H*0.72+p*H*0.035);ctx.stroke();}
    // Railing
    ctx.strokeStyle='rgba(150,80,20,0.7)'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(0,H*0.7); ctx.lineTo(W,H*0.7); ctx.stroke();
    for(let r=0;r<12;r++){ctx.strokeStyle='rgba(100,50,10,0.5)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(W*r/11,H*0.7);ctx.lineTo(W*r/11,H*0.72);ctx.stroke();}
    // Dinner table
    const tx=W*0.5;
    ctx.fillStyle='rgba(60,25,10,0.95)'; ctx.beginPath(); ctx.ellipse(tx,H*0.78,W*0.12,H*0.04,0,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle='rgba(150,80,20,0.5)'; ctx.lineWidth=1; ctx.beginPath(); ctx.ellipse(tx,H*0.78,W*0.12,H*0.04,0,0,Math.PI*2); ctx.stroke();
    // Candles
    [[tx-W*0.06,H*0.75],[tx+W*0.06,H*0.75]].forEach(([cx,cy],ci)=>{
      ctx.fillStyle='rgba(220,200,150,0.8)'; ctx.fillRect(cx-2,cy-H*0.02,4,H*0.02);
      const cf=ctx.createRadialGradient(cx,cy-H*0.02,0,cx,cy-H*0.02,14);
      cf.addColorStop(0,'rgba(255,200,80,0.8)'); cf.addColorStop(1,'transparent');
      ctx.fillStyle=cf; ctx.fillRect(cx-14,cy-H*0.04,28,20);
      ctx.fillStyle=`rgba(255,${160+Math.floor(Math.sin(t*4+ci)*30)},50,0.9)`;
      ctx.beginPath(); ctx.arc(cx,cy-H*0.022+Math.sin(t*3+ci)*1.5,2.5,0,Math.PI*2); ctx.fill();
    });
    // Champagne glasses
    [[tx-W*0.03,H*0.76],[tx+W*0.03,H*0.76]].forEach(([gx,gy])=>{
      ctx.strokeStyle='rgba(255,230,150,0.6)'; ctx.lineWidth=1.5; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(gx-5,gy-12); ctx.lineTo(gx+5,gy-12); ctx.lineTo(gx+3,gy-5); ctx.moveTo(gx-5,gy-12); ctx.lineTo(gx-3,gy-5);
      ctx.beginPath(); ctx.moveTo(gx-3,gy-5); ctx.lineTo(gx+3,gy-5); ctx.lineTo(gx,gy); ctx.moveTo(gx,gy); ctx.lineTo(gx-4,gy+3); ctx.lineTo(gx+4,gy+3); ctx.stroke();
    });
    // Couple silhouette
    ctx.fillStyle='rgba(8,3,2,0.95)';
    // Person 1
    ctx.beginPath(); ctx.arc(W*0.42,H*0.71,7,0,Math.PI*2); ctx.fill(); ctx.fillRect(W*0.415,H*0.717,10,18);
    // Person 2
    ctx.beginPath(); ctx.arc(W*0.58,H*0.71,7,0,Math.PI*2); ctx.fill(); ctx.fillRect(W*0.575,H*0.717,10,18);
    // Arms around each other
    ctx.strokeStyle='rgba(8,3,2,0.95)'; ctx.lineWidth=4; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(W*0.425,H*0.725); ctx.lineTo(W*0.565,H*0.725); ctx.stroke();
    // Floating hearts
    hearts.forEach(h=>{h.y+=h.vy;h.ph+=0.025;if(h.y<-0.05)h.y=0.85;
      ctx.save();ctx.globalAlpha=h.a*(0.4+0.4*Math.sin(h.ph));
      ctx.font=`${h.size}px serif`;ctx.textAlign='center';ctx.fillText('❤️',h.x*W,h.y*H);ctx.restore();
    });
    ctx.font=`600 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,180,220,0.4)';
    ctx.textAlign='center'; ctx.fillText('PREMIUM MARINA CRUISE · PRIVATE TABLE · FULL MOON',W*0.5,H*0.06);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Romantic dhow cruise scene with couple at candlelit dinner table under the moon with city lights reflecting on water" />;
}

// ── 6. MUSIC NOTES DECK — oud, live band ──────────────────────
export function BlogAnim_MusicDeck() {
  const NOTES=['♪','♫','♩','♬','🎵','🎶'];
  const notesRef=useRef(Array.from({length:22},(_,i)=>({x:0.1+Math.random()*0.8,y:0.2+Math.random()*0.7,vy:-(0.002+Math.random()*0.003),a:0.3+Math.random()*0.6,note:NOTES[i%6],ph:Math.random()*Math.PI*2,size:12+Math.random()*14,vx:(Math.random()-0.5)*0.001})));
  const ref = useCanvas((ctx, W, H, t) => {
    const notes=notesRef.current;
    ctx.fillStyle='#020108'; ctx.fillRect(0,0,W,H);
    const bg=ctx.createRadialGradient(W*0.5,H*0.5,0,W*0.5,H*0.5,W*0.55);
    bg.addColorStop(0,'rgba(100,30,150,0.1)'); bg.addColorStop(1,'transparent');
    ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
    // Stage area (lower portion)
    ctx.fillStyle='rgba(30,10,40,0.6)'; ctx.fillRect(0,H*0.65,W,H*0.35);
    // Stage lights from above
    const LIGHTS=[W*0.25,W*0.5,W*0.75];
    LIGHTS.forEach((lx,i)=>{
      const phase=(t*0.5+i*1.2)%1;
      const swayX=lx+Math.sin(t*0.8+i)*W*0.1;
      const lg=ctx.createConicalGradient?null:null;
      ctx.save(); ctx.globalAlpha=0.15+Math.sin(t*1.5+i)*0.05;
      ctx.beginPath(); ctx.moveTo(swayX,0); ctx.lineTo(swayX-W*0.06,H*0.65); ctx.lineTo(swayX+W*0.06,H*0.65); ctx.closePath();
      const sg2=ctx.createLinearGradient(swayX,0,swayX,H*0.65);
      const LCOLORS=['rgba(255,100,200','rgba(100,200,255','rgba(255,200,50'];
      sg2.addColorStop(0,`${LCOLORS[i]},0.8)`); sg2.addColorStop(1,'transparent');
      ctx.fillStyle=sg2; ctx.fill(); ctx.restore();
      ctx.fillStyle=`rgba(255,255,255,0.8)`; ctx.beginPath(); ctx.arc(swayX,3,3,0,Math.PI*2); ctx.fill();
    });
    // Oud player silhouette
    const px=W*0.35,py=H*0.72;
    ctx.fillStyle='rgba(5,2,8,0.95)';
    ctx.beginPath(); ctx.arc(px,py-30,8,0,Math.PI*2); ctx.fill(); // head
    ctx.fillRect(px-6,py-22,12,22); // body
    // Oud (pear-shaped instrument)
    ctx.fillStyle='rgba(5,2,8,0.9)';
    ctx.beginPath(); ctx.ellipse(px+18,py-15,12,16,0.5,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(px+6,py-16); ctx.lineTo(px+14,py-22); ctx.lineWidth=2; ctx.strokeStyle='rgba(5,2,8,0.9)'; ctx.stroke();
    // Oud strings vibrating
    for(let s=0;s<4;s++){
      const a=0.1+0.2*Math.sin(t*6+s);
      ctx.strokeStyle=`rgba(255,200,80,${a})`; ctx.lineWidth=0.8;
      ctx.beginPath(); ctx.moveTo(px+8,py-20+s*3); for(let x=px+8;x<px+28;x+=2){ctx.lineTo(x,py-20+s*3+Math.sin(x*0.5+t*8+s)*1.5);} ctx.stroke();
    }
    // Singer silhouette
    const sx=W*0.55,sy=H*0.72;
    ctx.fillStyle='rgba(5,2,8,0.95)';
    ctx.beginPath(); ctx.arc(sx,sy-30,8,0,Math.PI*2); ctx.fill();
    ctx.fillRect(sx-6,sy-22,12,22);
    // Mic
    ctx.strokeStyle='rgba(5,2,8,0.9)'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(sx-8,sy-20); ctx.lineTo(sx-18,sy-10); ctx.stroke();
    ctx.fillStyle='rgba(5,2,8,0.95)'; ctx.beginPath(); ctx.arc(sx-18,sy-10,4,0,Math.PI*2); ctx.fill();
    // Sound wave from singer
    for(let sw=0;sw<4;sw++){
      const r=20+sw*18; const a=(1-sw/4)*0.3*Math.abs(Math.sin(t*3));
      ctx.strokeStyle=`rgba(200,100,255,${a})`; ctx.lineWidth=1;
      ctx.beginPath(); ctx.arc(sx-20,sy-12,r,-Math.PI*0.7,Math.PI*0.7); ctx.stroke();
    }
    // Floating music notes
    notes.forEach(n=>{
      n.y+=n.vy; n.x+=n.vx; n.ph+=0.025;
      if(n.y<-0.05)n.y=0.85; if(n.x<0.05)n.vx=Math.abs(n.vx); if(n.x>0.95)n.vx=-Math.abs(n.vx);
      ctx.save(); ctx.globalAlpha=n.a*(0.4+0.4*Math.sin(n.ph));
      ctx.font=`${n.size}px serif`; ctx.textAlign='center';
      ctx.fillStyle=['#F59E0B','#818CF8','#F472B6','#34D399'][Math.floor(n.x*4)%4];
      ctx.fillText(n.note,n.x*W,n.y*H); ctx.restore();
    });
    ctx.font=`600 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(200,100,255,0.4)';
    ctx.textAlign='center'; ctx.fillText('LIVE OUD & ARABIC MUSIC · DHOW CRUISE ENTERTAINMENT',W*0.5,H*0.06);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Live Arabic music performance on dhow cruise deck with oud player, singer and floating musical notes" />;
}

// ── 7. GROUP DECK — confetti, crowd silhouettes ───────────────
export function BlogAnim_GroupDeck() {
  const confettiRef=useRef(Array.from({length:60},()=>({x:Math.random(),y:Math.random(),vx:(Math.random()-0.5)*0.005,vy:0.002+Math.random()*0.004,rot:Math.random()*Math.PI*2,rotV:(Math.random()-0.5)*0.1,color:['#F59E0B','#3B82F6','#EF4444','#10B981','#8B5CF6','#F472B6'][Math.floor(Math.random()*6)],w:6+Math.random()*8,h:3+Math.random()*4})));
  const ref = useCanvas((ctx, W, H, t) => {
    const conf=confettiRef.current;
    const sky=ctx.createLinearGradient(0,0,0,H*0.62);
    sky.addColorStop(0,'#010108'); sky.addColorStop(0.5,'#040215'); sky.addColorStop(1,'#080320');
    ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
    // Festive stars
    for(let i=0;i<60;i++){ctx.fillStyle=`rgba(255,255,255,${0.1+Math.sin(t*1.5+i)*0.08})`;ctx.beginPath();ctx.arc((i*173)%W,(i*97)%(H*0.55),0.8+(i%3)*0.3,0,Math.PI*2);ctx.fill();}
    // Festive glow
    const fg=ctx.createRadialGradient(W*0.5,H*0.55,0,W*0.5,H*0.55,W*0.4);
    fg.addColorStop(0,'rgba(99,102,241,0.12)'); fg.addColorStop(1,'transparent');
    ctx.fillStyle=fg; ctx.fillRect(0,0,W,H);
    // Water
    ctx.fillStyle='#030115'; ctx.fillRect(0,H*0.62,W,H);
    // Dhow deck
    ctx.fillStyle='rgba(18,8,30,0.95)'; ctx.fillRect(0,H*0.58,W,H*0.42);
    // String lights
    for(let li=0;li<20;li++){
      const lx=W*li/19;
      ctx.strokeStyle='rgba(80,40,10,0.5)'; ctx.lineWidth=0.8;
      ctx.beginPath(); ctx.moveTo(lx,H*0.58); ctx.lineTo(lx,H*0.62); ctx.stroke();
      const lAlpha=0.5+Math.sin(t*2+li)*0.4;
      const lColor=['rgba(255,220,80','rgba(255,100,150','rgba(100,200,255','rgba(150,255,150'][li%4];
      ctx.fillStyle=`${lColor},${lAlpha})`;
      const bulbY=H*0.585+Math.sin(li*0.4)*H*0.01;
      ctx.beginPath(); ctx.arc(lx,bulbY,3,0,Math.PI*2); ctx.fill();
      const bg2=ctx.createRadialGradient(lx,bulbY,0,lx,bulbY,12);
      bg2.addColorStop(0,`${lColor},0.2)`); bg2.addColorStop(1,'transparent');
      ctx.fillStyle=bg2; ctx.fillRect(lx-12,bulbY-12,24,24);
    }
    // Crowd silhouettes
    const CROWD=Array.from({length:20},(_,i)=>({x:0.03+i*0.05,h:0.05+Math.sin(i*1.7)*0.025,arm:Math.sin(t*2+i)*0.4}));
    CROWD.forEach(p=>{
      const px=W*p.x, py=H*0.58, ph=H*p.h;
      ctx.fillStyle=`rgba(${10+Math.floor(p.h*200)},${5+Math.floor(p.h*100)},${15+Math.floor(p.h*200)},0.9)`;
      ctx.beginPath(); ctx.arc(px,py-ph-8,7,0,Math.PI*2); ctx.fill();
      ctx.fillRect(px-5,py-ph,10,ph);
      // Raised arm
      ctx.strokeStyle='rgba(15,8,25,0.9)'; ctx.lineWidth=4; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(px+5,py-ph*0.6); ctx.lineTo(px+18,py-ph*0.6-15+p.arm*10); ctx.stroke();
    });
    // Confetti
    conf.forEach(c=>{
      c.x+=c.vx; c.y+=c.vy; c.rot+=c.rotV;
      if(c.y>1.05){c.y=-0.05;c.x=Math.random();}
      if(c.x<0)c.x=1; if(c.x>1)c.x=0;
      ctx.save(); ctx.translate(c.x*W,c.y*H); ctx.rotate(c.rot);
      ctx.fillStyle=c.color; ctx.fillRect(-c.w/2,-c.h/2,c.w,c.h); ctx.restore();
    });
    ctx.font=`600 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(150,100,255,0.45)';
    ctx.textAlign='center'; ctx.fillText('PRIVATE GROUP DHOW CRUISE · CORPORATE EVENTS · CELEBRATIONS',W*0.5,H*0.06);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Group celebration on private dhow cruise with festive string lights, crowd silhouettes and confetti" />;
}

// ── 8. NAVIGATION MAP — marina vs creek route ─────────────────
export function BlogAnim_NavigationMap() {
  const ref = useCanvas((ctx, W, H, t) => {
    ctx.fillStyle='#020508'; ctx.fillRect(0,0,W,H);
    const bg=ctx.createLinearGradient(0,0,W,H);
    bg.addColorStop(0,'#020508'); bg.addColorStop(1,'#050210');
    ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
    // Map grid
    ctx.strokeStyle='rgba(0,150,200,0.04)'; ctx.lineWidth=0.8;
    for(let gx=0;gx<W;gx+=W/10){ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,H);ctx.stroke();}
    for(let gy=0;gy<H;gy+=H/6){ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(W,gy);ctx.stroke();}

    // Dubai coast outline (simplified)
    ctx.strokeStyle='rgba(0,180,255,0.25)'; ctx.lineWidth=1.5; ctx.setLineDash([4,8]);
    ctx.beginPath(); ctx.moveTo(0,H*0.5); ctx.lineTo(W*0.15,H*0.45); ctx.lineTo(W*0.3,H*0.4); ctx.lineTo(W*0.45,H*0.38); ctx.lineTo(W*0.62,H*0.42); ctx.lineTo(W*0.78,H*0.48); ctx.lineTo(W,H*0.52); ctx.stroke(); ctx.setLineDash([]);

    // MARINA ROUTE (left side — blue)
    const MARINA_PTS=[{x:0.12,y:0.55},{x:0.15,y:0.48},{x:0.18,y:0.52},{x:0.22,y:0.58},{x:0.25,y:0.52},{x:0.2,y:0.46},{x:0.14,y:0.44},{x:0.12,y:0.55}];
    const marineProgress=(t*0.12)%1;
    ctx.strokeStyle='rgba(0,180,255,0.7)'; ctx.lineWidth=2;
    ctx.beginPath(); MARINA_PTS.forEach((p,i)=>i===0?ctx.moveTo(p.x*W,p.y*H):ctx.lineTo(p.x*W,p.y*H)); ctx.stroke();
    // Marina label
    ctx.fillStyle='rgba(0,180,255,0.15)'; ctx.strokeStyle='rgba(0,180,255,0.3)'; ctx.lineWidth=1;
    if(ctx.roundRect){ctx.beginPath();ctx.roundRect(W*0.05,H*0.08,W*0.28,24,12);ctx.fill();ctx.stroke();}
    ctx.font=`700 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(0,180,255,0.9)'; ctx.textAlign='center';
    ctx.fillText('🌊 DUBAI MARINA ROUTE',W*0.19,H*0.09+14);
    // Animated boat on marina
    const mi=Math.floor(marineProgress*MARINA_PTS.length);
    const mn=MARINA_PTS[(mi+1)%MARINA_PTS.length];
    const mc=MARINA_PTS[mi];
    const mf=marineProgress*MARINA_PTS.length-mi;
    const mbx=(mc.x+(mn.x-mc.x)*mf)*W, mby=(mc.y+(mn.y-mc.y)*mf)*H;
    const mbg=ctx.createRadialGradient(mbx,mby,0,mbx,mby,10);
    mbg.addColorStop(0,'rgba(0,180,255,0.8)'); mbg.addColorStop(1,'transparent');
    ctx.fillStyle=mbg; ctx.beginPath(); ctx.arc(mbx,mby,10,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='rgba(0,180,255,0.9)'; ctx.beginPath(); ctx.arc(mbx,mby,4,0,Math.PI*2); ctx.fill();

    // CREEK ROUTE (right side — amber)
    const CREEK_PTS=[{x:0.6,y:0.48},{x:0.65,y:0.42},{x:0.72,y:0.38},{x:0.78,y:0.44},{x:0.82,y:0.52},{x:0.78,y:0.58},{x:0.7,y:0.55},{x:0.64,y:0.56},{x:0.6,y:0.48}];
    const creekProgress=(t*0.1+0.5)%1;
    ctx.strokeStyle='rgba(245,158,11,0.7)'; ctx.lineWidth=2;
    ctx.beginPath(); CREEK_PTS.forEach((p,i)=>i===0?ctx.moveTo(p.x*W,p.y*H):ctx.lineTo(p.x*W,p.y*H)); ctx.stroke();
    ctx.fillStyle='rgba(245,158,11,0.15)'; ctx.strokeStyle='rgba(245,158,11,0.3)'; ctx.lineWidth=1;
    if(ctx.roundRect){ctx.beginPath();ctx.roundRect(W*0.56,H*0.08,W*0.3,24,12);ctx.fill();ctx.stroke();}
    ctx.font=`700 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(245,158,11,0.9)'; ctx.textAlign='center';
    ctx.fillText('⛵ DUBAI CREEK ROUTE',W*0.71,H*0.09+14);
    // Animated boat on creek
    const ci=Math.floor(creekProgress*CREEK_PTS.length);
    const cn=CREEK_PTS[(ci+1)%CREEK_PTS.length];
    const cc=CREEK_PTS[ci];
    const cf=creekProgress*CREEK_PTS.length-ci;
    const cbx=(cc.x+(cn.x-cc.x)*cf)*W, cby=(cc.y+(cn.y-cc.y)*cf)*H;
    const cbg=ctx.createRadialGradient(cbx,cby,0,cbx,cby,10);
    cbg.addColorStop(0,'rgba(245,158,11,0.8)'); cbg.addColorStop(1,'transparent');
    ctx.fillStyle=cbg; ctx.beginPath(); ctx.arc(cbx,cby,10,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='rgba(245,158,11,0.9)'; ctx.beginPath(); ctx.arc(cbx,cby,4,0,Math.PI*2); ctx.fill();

    // VS divider
    ctx.strokeStyle='rgba(255,255,255,0.08)'; ctx.lineWidth=1; ctx.setLineDash([4,8]);
    ctx.beginPath(); ctx.moveTo(W*0.47,H*0.1); ctx.lineTo(W*0.47,H*0.9); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle='rgba(255,255,255,0.08)'; ctx.strokeStyle='rgba(255,255,255,0.15)'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.arc(W*0.47,H*0.5,16,0,Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.font=`800 12px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,0.6)'; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('VS',W*0.47,H*0.5); ctx.textBaseline='alphabetic';

    // Key points
    const MARINA_FACTS=['Modern skyline','Longer route (2hr)','Best for couples','AED 120–250'];
    const CREEK_FACTS=['Heritage Old Town','Shorter (1.5hr)','Best for culture','AED 99–150'];
    let my=H*0.68; let cy2=H*0.68;
    ctx.font=`500 ${W>500?10:9}px Outfit,sans-serif`;
    MARINA_FACTS.forEach(f=>{ctx.fillStyle='rgba(0,180,255,0.6)';ctx.textAlign='center';ctx.fillText('• '+f,W*0.23,my);my+=16;});
    CREEK_FACTS.forEach(f=>{ctx.fillStyle='rgba(245,158,11,0.6)';ctx.textAlign='center';ctx.fillText('• '+f,W*0.7,cy2);cy2+=16;});
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Navigation map comparing Dubai Marina and Dubai Creek dhow cruise routes with animated boats" />;
}
