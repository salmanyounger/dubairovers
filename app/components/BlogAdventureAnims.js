'use client';
import { useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════
// QUAD BIKE & CAMEL BLOGS 21–29 — 10 unique animations
// All IDs globally unique — never reused anywhere on site
//
// Quad Bike (21-25):
//   quad-racing      — quad tearing over dune crest, dust cloud, speedlines
//   helmet-safety    — helmet checklist, rider gear exploded view
//   quad-vs-board    — split screen quad racing vs sandboarder
//   timer-30-60      — stopwatch countdown, distance covered gauge
//   combo-map        — route showing quad zone + safari camp + return
//
// Camel Riding (26-29):
//   camel-walk-hero  — full camel walk cycle, desert sunset, trainer silhouette
//   welfare-check    — camel health indicators, ethical operator badge
//   sunrise-golden   — pre-dawn camel silhouette, golden horizon, lone rider
//   coffee-ceremony  — Arabic dallah pouring, steam, carpet pattern, dates
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

// ── 1. QUAD RACING — tearing over dune crest ─────────────────
export function BlogAnim_QuadRacing() {
  const dustRef = useRef(Array.from({length:90}, () => ({x:0,y:0,vx:0,vy:0,a:0,s:3,life:0,active:false})));
  const ref = useCanvas((ctx, W, H, t) => {
    const dust = dustRef.current;
    // Desert sky — hot red/amber
    const sky = ctx.createLinearGradient(0,0,0,H);
    sky.addColorStop(0,'#0E0500'); sky.addColorStop(0.4,'#1E0800'); sky.addColorStop(0.7,'#3A1000'); sky.addColorStop(1,'#8B3000');
    ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
    // Heat shimmer
    for(let i=0;i<6;i++){
      ctx.strokeStyle=`rgba(200,100,20,0.05)`; ctx.lineWidth=1;
      ctx.beginPath(); const hy=H*0.25+i*H*0.05;
      for(let x=0;x<=W;x+=4){ctx.lineTo(x,hy+Math.sin(x*0.04+t*3+i)*2);}
      ctx.stroke();
    }
    // Dune layers
    ['#8B3200','#6B2200','#4A1600'].forEach((c,i)=>{
      ctx.fillStyle=c; ctx.beginPath(); ctx.moveTo(0,H);
      const off=i*0.08;
      for(let x=0;x<=W;x+=6){ctx.lineTo(x,H*(0.45+off)+Math.sin(x*0.01+t*(0.15-i*0.04)+i)*22+Math.cos(x*0.022+i)*14);}
      ctx.lineTo(W,H); ctx.closePath(); ctx.fill();
    });

    // Quad bike — 2 quads side by side racing
    const prog1 = (t*0.18)%1;
    const prog2 = (t*0.18+0.15)%1;

    const drawQuad = (prog, side) => {
      const vx2 = prog*W;
      const vy2 = H*0.38 + Math.sin(prog*Math.PI*2)*38 + (1-prog)*H*0.25;
      const tilt = Math.sin(prog*Math.PI)*0.5 * (side===0?1:-1);
      const offsetY = side===0 ? 0 : H*0.05;

      // Dust burst at crest
      if(Math.abs(prog-0.28)<0.022 && side===0){
        dust.forEach(p=>{ if(p.active) return;
          p.x=vx2; p.y=vy2+15; p.vx=(Math.random()-0.5)*5; p.vy=-(Math.random()*4);
          p.a=0.65; p.s=2+Math.random()*5; p.life=1; p.active=true;
        });
      }
      // Trail dust
      ctx.save(); ctx.globalAlpha=0.3;
      for(let i=1;i<8;i++){
        const tp=Math.max(0,prog-i*0.03);
        const tx2=tp*W; const ty=H*0.38+Math.sin(tp*Math.PI*2)*38+(1-tp)*H*0.25+offsetY+15;
        ctx.fillStyle=`rgba(180,100,40,${(1-i/8)*0.35})`;
        ctx.beginPath(); ctx.ellipse(tx2,ty,12-i,5,0,0,Math.PI*2); ctx.fill();
      }
      ctx.restore();

      // Quad body
      ctx.save(); ctx.translate(vx2, vy2+offsetY); ctx.rotate(-tilt);
      // Chassis
      const qg=ctx.createLinearGradient(-28,-15,28,8);
      qg.addColorStop(0,side===0?'#C1200E':'#1A60C0'); qg.addColorStop(1,side===0?'#700808':'#0A2880');
      ctx.fillStyle=qg;
      ctx.beginPath(); if(ctx.roundRect) ctx.roundRect(-28,-15,56,24,5); else ctx.rect(-28,-15,56,24);
      ctx.fill();
      // Handlebars
      ctx.strokeStyle='rgba(50,50,50,0.9)'; ctx.lineWidth=4; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(-14,-14); ctx.lineTo(-22,-22); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(14,-14); ctx.lineTo(22,-22); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-22,-22); ctx.lineTo(22,-22); ctx.stroke();
      // Wheels
      [-20,20].forEach(wx=>{
        ctx.fillStyle='#111'; ctx.beginPath(); ctx.arc(wx,10,11,0,Math.PI*2); ctx.fill();
        ctx.fillStyle='#333'; ctx.beginPath(); ctx.arc(wx,10,6,0,Math.PI*2); ctx.fill();
        // Tread spin
        ctx.strokeStyle='rgba(80,80,80,0.6)'; ctx.lineWidth=1.5;
        for(let sp=0;sp<4;sp++){
          const sa=(sp/4)*Math.PI*2+t*8;
          ctx.beginPath(); ctx.moveTo(wx+Math.cos(sa)*3,10+Math.sin(sa)*3);
          ctx.lineTo(wx+Math.cos(sa)*9,10+Math.sin(sa)*9); ctx.stroke();
        }
      });
      // Rider
      ctx.fillStyle='rgba(10,8,5,0.9)';
      ctx.beginPath(); ctx.arc(0,-26,8,0,Math.PI*2); ctx.fill();
      ctx.fillRect(-7,-18,14,16);
      // Helmet visor glint
      ctx.fillStyle='rgba(100,180,255,0.3)'; ctx.beginPath(); ctx.arc(3,-28,4,0,Math.PI*2); ctx.fill();
      // Headlight beam
      const hg=ctx.createRadialGradient(28,0,0,28,0,50);
      hg.addColorStop(0,'rgba(255,240,180,0.5)'); hg.addColorStop(1,'transparent');
      ctx.fillStyle=hg; ctx.beginPath(); ctx.arc(28,0,50,0,Math.PI*2); ctx.fill();
      ctx.restore();

      // Speed lines behind
      ctx.save(); ctx.globalAlpha=0.25;
      for(let sl=0;sl<5;sl++){
        ctx.strokeStyle=`rgba(255,200,100,0.5)`; ctx.lineWidth=1;
        ctx.beginPath(); ctx.moveTo(vx2-20-sl*15, vy2+offsetY-sl*4);
        ctx.lineTo(vx2-50-sl*15, vy2+offsetY-sl*4+2); ctx.stroke();
      }
      ctx.restore();
    };

    // Dust particles
    dust.forEach(p=>{ if(!p.active) return; p.x+=p.vx; p.y+=p.vy; p.vy+=0.1; p.life-=0.024;
      if(p.life<=0){p.active=false;return;}
      ctx.fillStyle=`rgba(200,130,50,${p.life*p.a*0.45})`; ctx.beginPath(); ctx.arc(p.x,p.y,p.s*p.life,0,Math.PI*2); ctx.fill();
    });

    drawQuad(prog1, 0);
    drawQuad(prog2, 1);

    // UV sun glow top right
    const sg=ctx.createRadialGradient(W*0.85,H*0.15,0,W*0.85,H*0.15,W*0.18);
    sg.addColorStop(0,'rgba(255,200,50,0.35)'); sg.addColorStop(1,'transparent');
    ctx.fillStyle=sg; ctx.fillRect(0,0,W,H);
    ctx.fillStyle='rgba(255,210,60,0.8)'; ctx.beginPath(); ctx.arc(W*0.85,H*0.15,W*0.032,0,Math.PI*2); ctx.fill();

    ctx.font=`600 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,150,50,0.5)';
    ctx.textAlign='center'; ctx.fillText('DUBAI DESERT · QUAD BIKE RACING · AL LAHBAB DUNES',W*0.5,H*0.07);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Two quad bikes racing side by side over Dubai desert dunes with dust clouds and speed lines" />;
}

// ── 2. HELMET SAFETY — gear checklist ────────────────────────
export function BlogAnim_HelmetSafety() {
  const GEAR=[
    {emoji:'⛑️',label:'Full-face helmet',x:0.5,y:0.22,key:true},
    {emoji:'🥽',label:'Goggles',x:0.5,y:0.38,key:false},
    {emoji:'🧤',label:'Gloves',x:0.22,y:0.5,key:true},
    {emoji:'👢',label:'Closed boots',x:0.78,y:0.5,key:true},
    {emoji:'🦺',label:'Safety vest',x:0.22,y:0.28,key:false},
    {emoji:'👖',label:'Long trousers',x:0.78,y:0.28,key:false},
    {emoji:'📋',label:'Briefing form',x:0.22,y:0.72,key:false},
    {emoji:'💊',label:'Medical check',x:0.78,y:0.72,key:false},
  ];
  const gearRef = useRef(GEAR.map(g=>({...g, revealed:false, alpha:0})));
  const ref = useCanvas((ctx, W, H, t) => {
    const gear = gearRef.current;
    ctx.fillStyle='#030608'; ctx.fillRect(0,0,W,H);
    const bg=ctx.createRadialGradient(W*0.5,H*0.5,0,W*0.5,H*0.5,W*0.5);
    bg.addColorStop(0,'rgba(200,60,20,0.06)'); bg.addColorStop(1,'transparent');
    ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);

    // Reveal items sequentially
    gear.forEach((g,i)=>{ if(t>i*0.6+0.5) g.alpha=Math.min(1,(t-i*0.6-0.5)*1.5); });

    // Connection lines to center
    const cx2=W*0.5, cy2=H*0.5;
    gear.forEach(g=>{
      if(g.alpha<=0) return;
      ctx.strokeStyle=`rgba(${g.key?'200,80,20':'100,150,100'},${g.alpha*0.2})`;
      ctx.lineWidth=g.key?1.5:0.8; ctx.setLineDash(g.key?[]:[3,6]);
      ctx.beginPath(); ctx.moveTo(cx2,cy2); ctx.lineTo(g.x*W,g.y*H); ctx.stroke(); ctx.setLineDash([]);
    });

    // Gear items
    gear.forEach(g=>{
      if(g.alpha<=0) return;
      const px=g.x*W, py=g.y*H;
      const glow=ctx.createRadialGradient(px,py,0,px,py,g.key?32:24);
      glow.addColorStop(0,`rgba(${g.key?'200,80,20':'80,180,100'},${g.alpha*0.15})`); glow.addColorStop(1,'transparent');
      ctx.fillStyle=glow; ctx.fillRect(px-32,py-32,64,64);

      ctx.save(); ctx.globalAlpha=g.alpha;
      ctx.font=`${W>500?28:22}px serif`; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(g.emoji,px,py-6);
      ctx.font=`${g.key?'700':'500'} ${W>500?10:8}px Outfit,sans-serif`;
      ctx.fillStyle=g.key?'rgba(255,150,80,0.9)':'rgba(255,255,255,0.6)';
      ctx.fillText(g.label,px,py+14);
      if(g.key){ ctx.font=`700 8px Outfit,sans-serif`; ctx.fillStyle='rgba(255,100,50,0.7)'; ctx.fillText('REQUIRED',px,py+25); }
      ctx.restore();
    });

    // Center helmet icon
    ctx.save(); ctx.globalAlpha=0.8+Math.sin(t*2)*0.1;
    ctx.font=`${W>500?48:36}px serif`; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('⛑️',W*0.5,H*0.5); ctx.restore();

    // Safety badge
    ctx.fillStyle='rgba(0,200,100,0.1)'; ctx.strokeStyle='rgba(0,200,100,0.35)'; ctx.lineWidth=1.5;
    if(ctx.roundRect){ctx.beginPath();ctx.roundRect(W*0.5-80,H*0.86,160,22,11);ctx.fill();ctx.stroke();}
    ctx.font=`700 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(0,220,100,0.85)';
    ctx.textAlign='center'; ctx.fillText('✅ All gear provided free · DCRA licensed',W*0.5,H*0.875);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Safety gear checklist for Dubai quad biking showing helmet, gloves, boots and other required equipment" />;
}

// ── 3. QUAD vs SANDBOARD — split screen ───────────────────────
export function BlogAnim_QuadVsBoard() {
  const sprayRef=useRef(Array.from({length:25},()=>({x:0,y:0,vx:0,vy:0,a:0,s:2,active:false})));
  const ref = useCanvas((ctx, W, H, t) => {
    const spray=sprayRef.current;
    const mid=W*0.5;

    // LEFT — Quad side (red/orange)
    ctx.save(); ctx.beginPath(); ctx.rect(0,0,mid,H); ctx.clip();
    const qs=ctx.createLinearGradient(0,0,0,H); qs.addColorStop(0,'#0E0500'); qs.addColorStop(0.5,'#2A0C00'); qs.addColorStop(1,'#8B3000');
    ctx.fillStyle=qs; ctx.fillRect(0,0,mid,H);
    // Dune
    ctx.fillStyle='#8B3200'; ctx.beginPath(); ctx.moveTo(0,H);
    for(let x=0;x<=mid;x+=6){ctx.lineTo(x,H*0.48+Math.sin(x*0.015+t*0.2)*20+Math.cos(x*0.03)*12);}
    ctx.lineTo(mid,H); ctx.closePath(); ctx.fill();
    // Quad
    const qprog=(t*0.16)%1; const qx=qprog*mid; const qy=H*0.4+Math.sin(qprog*Math.PI*2)*32+(1-qprog)*H*0.2;
    ctx.save(); ctx.translate(qx,qy); ctx.rotate(-Math.sin(qprog*Math.PI)*0.45);
    const qg2=ctx.createLinearGradient(-24,-12,24,10); qg2.addColorStop(0,'#C1200E'); qg2.addColorStop(1,'#700808');
    ctx.fillStyle=qg2; ctx.beginPath(); if(ctx.roundRect) ctx.roundRect(-24,-12,48,22,5); else ctx.rect(-24,-12,48,22); ctx.fill();
    [-18,18].forEach(wx2=>{ctx.fillStyle='#111';ctx.beginPath();ctx.arc(wx2,10,9,0,Math.PI*2);ctx.fill();ctx.fillStyle='#333';ctx.beginPath();ctx.arc(wx2,10,5,0,Math.PI*2);ctx.fill();});
    ctx.fillStyle='rgba(10,8,5,0.9)'; ctx.beginPath(); ctx.arc(0,-22,7,0,Math.PI*2); ctx.fill(); ctx.fillRect(-5,-15,10,14);
    ctx.restore();
    // Speedometer small
    ctx.strokeStyle='rgba(255,255,255,0.12)'; ctx.lineWidth=5; ctx.beginPath(); ctx.arc(mid*0.12,H*0.82,22,Math.PI,Math.PI*2); ctx.stroke();
    const sp=Math.min(qprog*1.5,1); ctx.strokeStyle='#C1200E'; ctx.lineWidth=5; ctx.beginPath(); ctx.arc(mid*0.12,H*0.82,22,Math.PI,Math.PI*(1+sp)); ctx.stroke();
    ctx.font=`700 10px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,0.7)'; ctx.textAlign='center'; ctx.fillText(Math.round(sp*90)+'km/h',mid*0.12,H*0.84);
    ctx.restore();

    // RIGHT — Sandboard side (amber/gold)
    ctx.save(); ctx.beginPath(); ctx.rect(mid,0,mid,H); ctx.clip();
    const ss=ctx.createLinearGradient(0,0,0,H); ss.addColorStop(0,'#100800'); ss.addColorStop(0.5,'#2A1200'); ss.addColorStop(1,'#7A2C00');
    ctx.fillStyle=ss; ctx.fillRect(mid,0,mid,H);
    // Slope
    ctx.fillStyle='#8B3200'; ctx.beginPath(); ctx.moveTo(mid,H*0.15); ctx.lineTo(W,H); ctx.lineTo(mid,H); ctx.closePath(); ctx.fill();
    ctx.fillStyle='#6B2200'; ctx.beginPath(); ctx.moveTo(mid,H*0.22); ctx.lineTo(W,H); ctx.lineTo(mid,H); ctx.closePath(); ctx.fill();
    // Sandboarder sliding
    const bp=(t*0.14)%1; const bx=mid+bp*mid*0.85; const by=H*(0.18+bp*0.7);
    ctx.save(); ctx.translate(bx,by); ctx.rotate(0.55);
    ctx.fillStyle='#7A4800'; ctx.beginPath(); if(ctx.roundRect) ctx.roundRect(-20,-4,40,8,4); else ctx.rect(-20,-4,40,8); ctx.fill();
    ctx.fillStyle='rgba(10,8,5,0.9)'; ctx.beginPath(); ctx.ellipse(0,-22,6,8,0,0,Math.PI*2); ctx.fill(); ctx.fillRect(-5,-14,10,18);
    ctx.strokeStyle='rgba(10,8,5,0.9)'; ctx.lineWidth=4; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(-5,-8); ctx.lineTo(-20,-3); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(5,-8); ctx.lineTo(20,-3); ctx.stroke();
    // Sand spray
    spray.forEach(p=>{if(!p.active){if(Math.random()<0.3){p.x=0;p.y=5;p.vx=(Math.random()-0.3)*4;p.vy=-(Math.random()*2+0.5);p.a=0.7;p.s=1.5+Math.random()*2.5;p.active=true;}return;}
      p.x+=p.vx;p.y+=p.vy;p.vy+=0.12;p.a-=0.04;if(p.a<=0)p.active=false;
      ctx.fillStyle=`rgba(200,140,60,${p.a})`; ctx.beginPath(); ctx.arc(p.x,p.y,p.s,0,Math.PI*2); ctx.fill();
    });
    ctx.restore();
    // Thrill meter
    const thrillY=H*0.82;
    ctx.fillStyle='rgba(245,158,11,0.1)'; ctx.strokeStyle='rgba(245,158,11,0.3)'; ctx.lineWidth=1;
    if(ctx.roundRect){ctx.beginPath();ctx.roundRect(mid+10,thrillY,mid-20,22,11);ctx.fill();ctx.stroke();}
    ctx.font=`700 10px Outfit,sans-serif`; ctx.fillStyle='rgba(245,158,11,0.85)'; ctx.textAlign='center';
    ctx.fillText('🏄 FUN · BEGINNERS WELCOME · FREE',mid+mid*0.5,thrillY+15);
    ctx.restore();

    // VS badge
    ctx.fillStyle='rgba(5,3,10,0.92)'; ctx.strokeStyle='rgba(255,255,255,0.2)'; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.arc(mid,H*0.5,22,0,Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.font=`900 13px Outfit,sans-serif`; ctx.fillStyle='#fff'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText('VS',mid,H*0.5); ctx.textBaseline='alphabetic';

    // Labels
    ctx.font=`700 ${W>500?12:10}px Outfit,sans-serif`; ctx.fillStyle='rgba(200,60,20,0.8)'; ctx.textAlign='center'; ctx.fillText('🚵 QUAD BIKE',mid*0.5,H*0.88);
    ctx.fillStyle='rgba(200,140,30,0.8)'; ctx.fillText('🏄 SANDBOARD',mid+mid*0.5,H*0.88);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Side-by-side comparison of quad biking versus sandboarding in the Dubai desert" />;
}

// ── 4. TIMER 30-60 — stopwatch + distance gauge ──────────────
export function BlogAnim_Timer3060() {
  const ref = useCanvas((ctx, W, H, t) => {
    ctx.fillStyle='#020406'; ctx.fillRect(0,0,W,H);
    const bg=ctx.createLinearGradient(0,0,W,H); bg.addColorStop(0,'#020408'); bg.addColorStop(1,'#060214');
    ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);

    // Stopwatch animation — oscillates between 30 and 60
    const phase=(t*0.1)%1;
    const currentMin = 30 + phase*30;
    const displaySec = Math.floor((currentMin%1)*60);
    const displayMin = Math.floor(currentMin);

    // Large clock face — left
    const cx2=W*0.28, cy2=H*0.5, cr=Math.min(W*0.2,H*0.38);
    // Clock ring
    ctx.strokeStyle='rgba(255,255,255,0.08)'; ctx.lineWidth=8;
    ctx.beginPath(); ctx.arc(cx2,cy2,cr,0,Math.PI*2); ctx.stroke();
    // Progress arc — 30min=half, 60min=full
    const arcEnd=-Math.PI/2+((currentMin-30)/30)*Math.PI*2;
    const arcColor=currentMin>50?'rgba(200,60,20,0.9)':currentMin>40?'rgba(245,158,11,0.9)':'rgba(0,200,100,0.9)';
    ctx.strokeStyle=arcColor; ctx.lineWidth=8; ctx.lineCap='round';
    ctx.beginPath(); ctx.arc(cx2,cy2,cr,-Math.PI/2,arcEnd); ctx.stroke();
    // Tick marks
    for(let i=0;i<12;i++){
      const ta=i/12*Math.PI*2-Math.PI/2;
      ctx.strokeStyle='rgba(255,255,255,0.2)'; ctx.lineWidth=i%3===0?2:1;
      ctx.beginPath(); ctx.moveTo(cx2+Math.cos(ta)*(cr-12),cy2+Math.sin(ta)*(cr-12));
      ctx.lineTo(cx2+Math.cos(ta)*(cr-4),cy2+Math.sin(ta)*(cr-4)); ctx.stroke();
    }
    // Time display
    ctx.font=`700 ${W>500?32:24}px Outfit,sans-serif`; ctx.fillStyle='#fff'; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText(`${displayMin}:${displaySec.toString().padStart(2,'0')}`,cx2,cy2-6);
    ctx.font=`500 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,0.4)';
    ctx.fillText('MINUTES',cx2,cy2+18); ctx.textBaseline='alphabetic';

    // Right side — comparison panels
    const rx=W*0.58;
    const PACKAGES=[
      {label:'30 MIN',price:'AED 220',dist:'~8km',dunes:'6–8 dunes',color:'rgba(0,200,100',desc:'Ideal for first-timers'},
      {label:'60 MIN',price:'AED 380',dist:'~16km',dunes:'14–16 dunes',color:'rgba(245,158,11',desc:'Full desert experience'},
    ];
    PACKAGES.forEach((pkg,i)=>{
      const py=H*(0.18+i*0.48); const pw=W*(1-rx/W-0.04);
      ctx.fillStyle=`${pkg.color},0.08)`; ctx.strokeStyle=`${pkg.color},0.3)`; ctx.lineWidth=1;
      if(ctx.roundRect){ctx.beginPath();ctx.roundRect(rx,py,pw,H*0.38,14);ctx.fill();ctx.stroke();}
      ctx.font=`700 ${W>500?14:12}px Outfit,sans-serif`; ctx.fillStyle=`${pkg.color},0.9)`; ctx.textAlign='left';
      ctx.fillText(pkg.label,rx+14,py+22);
      ctx.font=`700 ${W>500?18:15}px Outfit,sans-serif`; ctx.fillStyle='#fff';
      ctx.fillText(pkg.price,rx+14,py+48);
      ctx.font=`500 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,0.55)';
      ctx.fillText(`📍 ${pkg.dist} covered`,rx+14,py+68);
      ctx.fillText(`🏔️ ${pkg.dunes} tackled`,rx+14,py+84);
      ctx.fillText(`✓ ${pkg.desc}`,rx+14,py+100);
    });
    // Highlight which one is "active" based on clock phase
    const activeI = currentMin > 45 ? 1 : 0;
    const apy=H*(0.18+activeI*0.48);
    ctx.strokeStyle=`rgba(255,255,255,0.4)`; ctx.lineWidth=2;
    const apw=W*(1-rx/W-0.04);
    if(ctx.roundRect){ctx.beginPath();ctx.roundRect(rx,apy,apw,H*0.38,14);ctx.stroke();}

    ctx.font=`600 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,0.3)'; ctx.textAlign='center';
    ctx.fillText('Choose your ride duration',W*0.5,H*0.07);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Comparison of 30-minute and 60-minute quad bike packages in Dubai showing price, distance and dunes covered" />;
}

// ── 5. COMBO MAP — quad zone + safari camp route ──────────────
export function BlogAnim_ComboMap() {
  const ref = useCanvas((ctx, W, H, t) => {
    ctx.fillStyle='#030608'; ctx.fillRect(0,0,W,H);
    // Map bg
    ctx.strokeStyle='rgba(0,150,100,0.04)'; ctx.lineWidth=0.8;
    for(let gx=0;gx<W;gx+=W/10){ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,H);ctx.stroke();}
    for(let gy=0;gy<H;gy+=H/6){ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(W,gy);ctx.stroke();}

    // Terrain patches
    [[0.1,0.3,0.2,0.3,'rgba(100,50,10'],[0.5,0.2,0.25,0.4,'rgba(80,40,8'],[0.75,0.55,0.18,0.3,'rgba(90,45,9']].forEach(([x,y,w,h2,c])=>{
      ctx.fillStyle=`${c},0.12)`; ctx.beginPath(); ctx.ellipse(x*W,y*H,w*W,h2*H,0,0,Math.PI*2); ctx.fill();
    });

    // Route points
    const STOPS=[
      {x:0.12,y:0.72,icon:'🏨',label:'Hotel Pickup',color:'rgba(100,180,255'},
      {x:0.28,y:0.55,icon:'🚵',label:'Quad Zone',color:'rgba(200,60,20'},
      {x:0.52,y:0.35,icon:'🏕️',label:'Safari Camp',color:'rgba(245,158,11'},
      {x:0.75,y:0.5,icon:'🐪',label:'Camel Ride',color:'rgba(180,120,30'},
      {x:0.88,y:0.72,icon:'🍖',label:'BBQ Dinner',color:'rgba(100,200,80'},
    ];

    // Animated route line
    const routeProgress = (t*0.06)%1;
    const totalSegments = STOPS.length-1;

    for(let seg=0;seg<totalSegments;seg++){
      const segStart = seg/totalSegments;
      const segEnd = (seg+1)/totalSegments;
      if(routeProgress < segStart) break;

      const p = Math.min(1,(routeProgress-segStart)/(segEnd-segStart));
      const s=STOPS[seg], e=STOPS[seg+1];

      // Curved path
      const steps=30;
      const drawnSteps=Math.floor(steps*p);
      ctx.strokeStyle=`rgba(${seg%2===0?'200,100,30':'245,158,11'},0.6)`; ctx.lineWidth=2.5; ctx.lineDash&&ctx.setLineDash([]);
      ctx.beginPath();
      for(let step=0;step<=drawnSteps;step++){
        const f=step/steps;
        const px=s.x*W+(e.x-s.x)*W*f;
        const py=s.y*H+(e.y-s.y)*H*f+Math.sin(f*Math.PI)*(-H*0.12);
        step===0?ctx.moveTo(px,py):ctx.lineTo(px,py);
      }
      ctx.stroke();

      // Leading dot
      if(p<1){
        const f=p;
        const lx=s.x*W+(e.x-s.x)*W*f; const ly=s.y*H+(e.y-s.y)*H*f+Math.sin(f*Math.PI)*(-H*0.12);
        const lg=ctx.createRadialGradient(lx,ly,0,lx,ly,8);
        lg.addColorStop(0,`rgba(245,158,11,0.9)`); lg.addColorStop(1,'transparent');
        ctx.fillStyle=lg; ctx.beginPath(); ctx.arc(lx,ly,8,0,Math.PI*2); ctx.fill();
      }
    }

    // Stop markers
    STOPS.forEach((stop,i)=>{
      const px=stop.x*W, py=stop.y*H;
      const revealed = i/totalSegments <= routeProgress+0.1;
      const alpha = revealed ? 1 : 0.2;
      ctx.save(); ctx.globalAlpha=alpha;
      const sg2=ctx.createRadialGradient(px,py,0,px,py,24);
      sg2.addColorStop(0,`${stop.color},0.25)`); sg2.addColorStop(1,'transparent');
      ctx.fillStyle=sg2; ctx.fillRect(px-24,py-24,48,48);
      ctx.fillStyle=`${stop.color},0.2)`; ctx.strokeStyle=`${stop.color},0.5)`; ctx.lineWidth=1.5;
      ctx.beginPath(); ctx.arc(px,py,14,0,Math.PI*2); ctx.fill(); ctx.stroke();
      ctx.font='14px serif'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(stop.icon,px,py);
      ctx.font=`600 ${W>500?10:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,0.7)';
      ctx.textBaseline='alphabetic'; ctx.fillText(stop.label,px,py+26);
      // Stop number
      ctx.fillStyle=`${stop.color},0.9)`; ctx.font=`700 9px Outfit,sans-serif`; ctx.fillText(`${i+1}`,px-18,py-16);
      ctx.restore();
    });

    // Time badge bottom
    ctx.fillStyle='rgba(245,158,11,0.1)'; ctx.strokeStyle='rgba(245,158,11,0.3)'; ctx.lineWidth=1;
    if(ctx.roundRect){ctx.beginPath();ctx.roundRect(W*0.5-130,H*0.88,260,22,11);ctx.fill();ctx.stroke();}
    ctx.font=`700 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(245,158,11,0.85)'; ctx.textAlign='center';
    ctx.fillText('🚵 Quad 30min → 🏕️ Safari 5hr → 🍖 BBQ · Total: AED 320',W*0.5,H*0.90);
    ctx.font=`600 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,0.3)'; ctx.fillText('QUAD + DESERT SAFARI COMBO ROUTE',W*0.5,H*0.07);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Map showing the quad bike plus desert safari combo route from hotel pickup through quad zone, safari camp, camel ride and BBQ dinner" />;
}

// ── 6. CAMEL WALK HERO — full walk cycle + trainer ────────────
export function BlogAnim_CamelWalkHero() {
  const starsRef=useRef(Array.from({length:80},()=>({x:Math.random(),y:Math.random()*0.45,s:0.4+Math.random()*1.2,a:0.1+Math.random()*0.5,ph:Math.random()*Math.PI*2})));
  const ref = useCanvas((ctx, W, H, t) => {
    const stars=starsRef.current;
    const sky=ctx.createLinearGradient(0,0,0,H);
    sky.addColorStop(0,'#020108'); sky.addColorStop(0.35,'#100800'); sky.addColorStop(0.65,'#2A1200'); sky.addColorStop(0.85,'#C04800'); sky.addColorStop(1,'#E07020');
    ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
    stars.forEach(s=>{const a=s.a*(0.4+0.6*Math.sin(t*1.2+s.ph));ctx.fillStyle=`rgba(255,255,255,${a})`;ctx.beginPath();ctx.arc(s.x*W,s.y*H,s.s,0,Math.PI*2);ctx.fill();});
    // Sun setting
    const sg=ctx.createRadialGradient(W*0.75,H*0.7,0,W*0.75,H*0.7,W*0.3);
    sg.addColorStop(0,'rgba(255,150,30,0.5)'); sg.addColorStop(0.3,'rgba(200,80,10,0.2)'); sg.addColorStop(1,'transparent');
    ctx.fillStyle=sg; ctx.fillRect(0,0,W,H);
    ctx.fillStyle='rgba(255,170,40,0.8)'; ctx.beginPath(); ctx.arc(W*0.75,H*0.72,W*0.04,0,Math.PI*2); ctx.fill();
    // Dune
    ctx.fillStyle='#7A2800'; ctx.beginPath(); ctx.moveTo(0,H);
    for(let x=0;x<=W;x+=6){ctx.lineTo(x,H*0.65+Math.sin(x*0.009+t*0.12)*18+Math.cos(x*0.022)*12);}
    ctx.lineTo(W,H); ctx.closePath(); ctx.fill();
    ctx.fillStyle='#5A1C00'; ctx.beginPath(); ctx.moveTo(0,H);
    for(let x=0;x<=W;x+=6){ctx.lineTo(x,H*0.76+Math.sin(x*0.012+t*0.1+1)*12);}
    ctx.lineTo(W,H); ctx.closePath(); ctx.fill();

    // Camel walking (full detailed cycle)
    const camX=W*(0.3+(t*0.032)%0.55), camY=H*0.72;
    ctx.save(); ctx.translate(camX,camY);
    // Body
    const cbg=ctx.createRadialGradient(0,-12,4,0,-12,34);
    cbg.addColorStop(0,'#C87030'); cbg.addColorStop(1,'#7A3E10');
    ctx.fillStyle=cbg; ctx.beginPath(); ctx.ellipse(0,-12,34,18,0,0,Math.PI*2); ctx.fill();
    // Tail
    ctx.strokeStyle='#8A4818'; ctx.lineWidth=5; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(-32,-8); ctx.quadraticCurveTo(-44,-2,-40,6); ctx.stroke();
    // Humps
    ctx.fillStyle='#A85A20'; [[-8,-30,14,11],[10,-28,11,9]].forEach(([ex,ey,rx,ry])=>{ctx.beginPath();ctx.ellipse(ex,ey,rx,ry,0,0,Math.PI*2);ctx.fill();});
    // Neck + head
    ctx.strokeStyle='#9B4E18'; ctx.lineWidth=10; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(26,-10); ctx.lineTo(36,2); ctx.stroke();
    ctx.fillStyle='#B05C1C'; ctx.beginPath(); ctx.ellipse(36,0,11,8,0.3,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#222'; ctx.beginPath(); ctx.arc(41,-2,2.5,0,Math.PI*2); ctx.fill();
    // Eyelashes
    ctx.strokeStyle='#555'; ctx.lineWidth=1;
    for(let e=0;e<3;e++){const ea=(-0.3+e*0.25); ctx.beginPath(); ctx.moveTo(41+Math.cos(ea)*2.5-1,-2+Math.sin(ea)*2.5-1); ctx.lineTo(41+Math.cos(ea)*5-1,-2+Math.sin(ea)*5-1); ctx.stroke();}
    // Mouth with slight smile
    ctx.strokeStyle='#7A3010'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.arc(37,2,4,0.2,Math.PI-0.2); ctx.stroke();
    // Legs — 4-beat walk cycle
    [-22,-10,7,20].forEach((lx,i)=>{
      const ph=t*3+(i%2)*Math.PI;
      const knee=Math.sin(ph)*12; const foot=Math.sin(ph)*14;
      ctx.strokeStyle='#7A3010'; ctx.lineWidth=6; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(lx,5); ctx.lineTo(lx+knee*0.3,18+Math.abs(knee)*0.3); ctx.lineTo(lx+foot*0.5,30+foot*0.2); ctx.stroke();
      // Hoof
      ctx.fillStyle='#4A1808'; ctx.beginPath(); ctx.ellipse(lx+foot*0.5,30+foot*0.2,5,3,0,0,Math.PI*2); ctx.fill();
    });
    // Rider on top
    ctx.fillStyle='rgba(255,220,180,0.88)'; ctx.beginPath(); ctx.arc(0,-42,8,0,Math.PI*2); ctx.fill();
    ctx.fillStyle='#E05030'; ctx.fillRect(-8,-34,16,20);
    ctx.strokeStyle='#E05030'; ctx.lineWidth=4; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(-8,-28); ctx.lineTo(-18,-22+Math.sin(t*2)*4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(8,-28); ctx.lineTo(18,-22+Math.cos(t*2)*4); ctx.stroke();
    // Saddle
    ctx.fillStyle='rgba(150,60,20,0.7)'; ctx.beginPath(); ctx.ellipse(0,-30,14,5,0,0,Math.PI*2); ctx.fill();
    ctx.restore();

    // Trainer silhouette
    const trX=camX-70, trY=H*0.72;
    ctx.fillStyle='rgba(10,5,0,0.88)';
    ctx.beginPath(); ctx.arc(trX,trY-28,8,0,Math.PI*2); ctx.fill();
    ctx.fillRect(trX-5,trY-20,10,22);
    ctx.fillRect(trX-4,trY+2,4,14); ctx.fillRect(trX,trY+2,4,14);
    // Lead rope
    ctx.strokeStyle='rgba(180,120,40,0.6)'; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(trX+5,trY-14); ctx.quadraticCurveTo(camX-35,trY-5,camX-28,trY-12); ctx.stroke();

    ctx.font=`600 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(200,130,40,0.5)';
    ctx.textAlign='center'; ctx.fillText('CLASSIC CAMEL RIDE · TRAINED GUIDES · DUBAI DESERT RESERVE',W*0.5,H*0.07);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Detailed camel walking animation at Dubai desert sunset with rider and trainer with lead rope" />;
}

// ── 7. WELFARE CHECK — ethical operator indicators ────────────
export function BlogAnim_WelfareCheck() {
  const CHECKS=[
    {label:'Resting hours enforced',ok:true,icon:'😴'},{label:'Vet checks monthly',ok:true,icon:'🩺'},
    {label:'Weight limits respected',ok:true,icon:'⚖️'},{label:'No chains or muzzles',ok:true,icon:'✅'},
    {label:'Natural feed diet',ok:true,icon:'🌿'},{label:'Shaded rest areas',ok:true,icon:'☂️'},
    {label:'Max 2hrs riding/day',ok:true,icon:'⏱️'},{label:'DCRA licensed operator',ok:true,icon:'📋'},
  ];
  const ref = useCanvas((ctx, W, H, t) => {
    ctx.fillStyle='#030608'; ctx.fillRect(0,0,W,H);
    const bg=ctx.createRadialGradient(W*0.5,H*0.5,0,W*0.5,H*0.5,W*0.5);
    bg.addColorStop(0,'rgba(0,180,80,0.06)'); bg.addColorStop(1,'transparent');
    ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);

    // Title
    ctx.font=`700 ${W>500?13:11}px Outfit,sans-serif`; ctx.fillStyle='rgba(0,220,100,0.7)'; ctx.textAlign='center';
    ctx.fillText('ETHICAL CAMEL OPERATOR CHECKLIST — DUBAI ROVERS',W*0.5,H*0.08);

    // Grid of checks
    const cols=2, rows=4, padX=W*0.06, padY=H*0.15;
    const cellW=(W-padX*2)/cols, cellH=(H-padY*2)/rows;
    CHECKS.forEach((c,i)=>{
      const col=i%cols, row=Math.floor(i/cols);
      const cx2=padX+col*cellW+cellW*0.5, cy2=padY+row*cellH+cellH*0.5;
      const delay=i*0.4+0.5;
      const alpha=Math.min(1,Math.max(0,(t-delay)*1.5));
      if(alpha<=0) return;

      ctx.save(); ctx.globalAlpha=alpha;
      // Card bg
      ctx.fillStyle='rgba(0,200,80,0.07)'; ctx.strokeStyle='rgba(0,200,80,0.25)'; ctx.lineWidth=1;
      if(ctx.roundRect){ctx.beginPath();ctx.roundRect(padX+col*cellW+6,padY+row*cellH+4,cellW-12,cellH-8,10);ctx.fill();ctx.stroke();}
      // Icon
      ctx.font=`${W>500?18:14}px serif`; ctx.textAlign='left'; ctx.textBaseline='middle';
      ctx.fillText(c.icon,padX+col*cellW+16,cy2-4);
      // Checkmark
      ctx.fillStyle='rgba(0,220,100,0.9)'; ctx.font=`700 ${W>500?13:11}px Outfit,sans-serif`;
      ctx.fillText('✓',padX+col*cellW+cellW-24,cy2-4);
      // Label
      ctx.font=`500 ${W>500?10:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,0.7)';
      ctx.fillText(c.label,padX+col*cellW+38,cy2-4);
      ctx.restore();
    });

    // Camel health bar (pulsing green)
    const barY=H*0.91; const barW=W*0.7;
    ctx.fillStyle='rgba(0,200,80,0.1)'; ctx.strokeStyle='rgba(0,200,80,0.3)'; ctx.lineWidth=1;
    if(ctx.roundRect){ctx.beginPath();ctx.roundRect(W*0.15,barY,barW,18,9);ctx.fill();ctx.stroke();}
    const healthFill=0.95+Math.sin(t*1.5)*0.04;
    ctx.fillStyle=`rgba(0,200,80,0.45)`;
    if(ctx.roundRect){ctx.beginPath();ctx.roundRect(W*0.15,barY,barW*healthFill,18,9);ctx.fill();}
    ctx.font=`700 ${W>500?10:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(0,220,100,0.9)'; ctx.textAlign='center';
    ctx.fillText(`🐪 Camel Health Score: ${Math.round(healthFill*100)}% — All standards met`,W*0.5,barY+13);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Ethical camel operator checklist showing 8 welfare standards met by Dubai Rovers" />;
}

// ── 8. SUNRISE GOLDEN — dawn camel silhouette ─────────────────
export function BlogAnim_SunriseGolden() {
  const ref = useCanvas((ctx, W, H, t) => {
    // Pre-dawn to golden hour sky
    const progress=Math.min(1,t*0.04);
    const sky=ctx.createLinearGradient(0,0,0,H);
    sky.addColorStop(0,`rgba(${Math.floor(1+progress*12)},${Math.floor(progress*6)},${Math.floor(8-progress*4)},1)`);
    sky.addColorStop(0.4,`rgba(${Math.floor(10+progress*60)},${Math.floor(4+progress*30)},${Math.floor(progress*5)},1)`);
    sky.addColorStop(0.7,`rgba(${Math.floor(30+progress*170)},${Math.floor(12+progress*100)},${Math.floor(progress*20)},1)`);
    sky.addColorStop(0.9,`rgba(${Math.floor(120+progress*130)},${Math.floor(40+progress*140)},${Math.floor(10+progress*30)},1)`);
    sky.addColorStop(1,`rgba(${Math.floor(160+progress*70)},${Math.floor(80+progress*100)},${Math.floor(30+progress*40)},1)`);
    ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);

    // Stars (fade as sun rises)
    const starAlpha=Math.max(0,0.6-progress*0.6);
    for(let i=0;i<120;i++){
      ctx.fillStyle=`rgba(255,255,255,${starAlpha*(0.1+Math.sin(t*1.2+i)*0.08)})`;
      ctx.beginPath(); ctx.arc((i*173)%W,(i*89)%(H*0.55),0.6+(i%4)*0.3,0,Math.PI*2); ctx.fill();
    }

    // Sun rising
    const sunY=H*(0.72-progress*0.28);
    const sunR=W*(0.025+progress*0.025);
    const sg=ctx.createRadialGradient(W*0.5,sunY,0,W*0.5,sunY,W*0.3);
    sg.addColorStop(0,`rgba(255,${Math.floor(200+progress*55)},${Math.floor(progress*80)},${0.3+progress*0.4})`);
    sg.addColorStop(0.3,'rgba(200,80,10,0.2)'); sg.addColorStop(1,'transparent');
    ctx.fillStyle=sg; ctx.fillRect(0,0,W,H);
    if(progress>0.15){
      ctx.fillStyle=`rgba(255,${Math.floor(200+progress*55)},50,${0.5+progress*0.3})`;
      ctx.beginPath(); ctx.arc(W*0.5,sunY,sunR*(1+Math.sin(t*2)*0.03),0,Math.PI*2); ctx.fill();
    }

    // Dune silhouette
    ctx.fillStyle='rgba(5,2,0,0.97)';
    ctx.beginPath(); ctx.moveTo(0,H);
    for(let x=0;x<=W;x+=8){ctx.lineTo(x,H*0.68+Math.sin(x*0.007+t*0.08)*20+Math.cos(x*0.018)*12);}
    ctx.lineTo(W,H); ctx.closePath(); ctx.fill();

    // Far dune ridge
    ctx.fillStyle='rgba(8,3,0,0.85)';
    ctx.beginPath(); ctx.moveTo(0,H);
    for(let x=0;x<=W;x+=8){ctx.lineTo(x,H*0.78+Math.sin(x*0.006)*14+Math.cos(x*0.014)*8);}
    ctx.lineTo(W,H); ctx.closePath(); ctx.fill();

    // Camel silhouette (lone, distant) — silhouette only
    const camX=W*0.5+Math.sin(t*0.2)*W*0.08;
    const camY=H*0.69;
    ctx.fillStyle='rgba(3,1,0,0.96)';
    // Body
    ctx.beginPath(); ctx.ellipse(camX,camY-10,28,15,0,0,Math.PI*2); ctx.fill();
    // Humps
    [[-7,-26,11,9],[9,-24,9,7]].forEach(([ex,ey,rx,ry])=>{ctx.beginPath();ctx.ellipse(camX+ex,camY+ey,rx,ry,0,0,Math.PI*2);ctx.fill();});
    // Neck+head
    ctx.strokeStyle='rgba(3,1,0,0.96)'; ctx.lineWidth=8; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(camX+22,camY-8); ctx.lineTo(camX+30,camY+2); ctx.stroke();
    ctx.fillStyle='rgba(3,1,0,0.96)'; ctx.beginPath(); ctx.ellipse(camX+30,camY+2,9,6,0.3,0,Math.PI*2); ctx.fill();
    // Legs
    [-18,-8,6,16].forEach((lx,i)=>{const ph=t*2.5+(i%2)*Math.PI;ctx.strokeStyle='rgba(3,1,0,0.96)';ctx.lineWidth=5;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(camX+lx,camY+4);ctx.lineTo(camX+lx+Math.sin(ph)*8,camY+22);ctx.stroke();});
    // Rider silhouette
    ctx.beginPath(); ctx.arc(camX,camY-36,6,0,Math.PI*2); ctx.fill();
    ctx.fillRect(camX-5,camY-30,10,16);

    // Time badge
    const timeStr=progress<0.2?'4:30 AM':progress<0.5?'5:15 AM':progress<0.8?'5:48 AM':'6:10 AM';
    ctx.fillStyle='rgba(255,180,50,0.1)'; ctx.strokeStyle='rgba(255,180,50,0.3)'; ctx.lineWidth=1;
    if(ctx.roundRect){ctx.beginPath();ctx.roundRect(W*0.5-55,H*0.07,110,24,12);ctx.fill();ctx.stroke();}
    ctx.font=`700 ${W>500?12:10}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,200,80,0.9)'; ctx.textAlign='center';
    ctx.fillText(`🌅 ${timeStr} · Sunrise Camel Ride`,W*0.5,H*0.085);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Animated sunrise camel ride showing lone camel silhouette and rider as the sky transitions from darkness to golden dawn" />;
}

// ── 9. COFFEE CEREMONY — dallah, steam, carpet, dates ────────
export function BlogAnim_CoffeeCeremony() {
  const smokeRef=useRef(Array.from({length:18},()=>({x:0,y:0,vx:0,vy:0,a:0,s:3,life:0,active:false})));
  const ref = useCanvas((ctx, W, H, t) => {
    const smoke=smokeRef.current;
    ctx.fillStyle='#040208'; ctx.fillRect(0,0,W,H);
    // Warm ambient
    const bg=ctx.createRadialGradient(W*0.5,H*0.6,0,W*0.5,H*0.6,W*0.55);
    bg.addColorStop(0,'rgba(200,120,30,0.08)'); bg.addColorStop(1,'transparent');
    ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);

    // Carpet pattern background
    ctx.fillStyle='rgba(100,15,15,0.25)'; ctx.fillRect(W*0.05,H*0.55,W*0.9,H*0.4);
    ctx.strokeStyle='rgba(200,140,30,0.2)'; ctx.lineWidth=1;
    for(let gx=W*0.05;gx<W*0.95;gx+=16){ctx.beginPath();ctx.moveTo(gx,H*0.55);ctx.lineTo(gx,H*0.95);ctx.stroke();}
    for(let gy=H*0.55;gy<H*0.95;gy+=16){ctx.beginPath();ctx.moveTo(W*0.05,gy);ctx.lineTo(W*0.95,gy);ctx.stroke();}
    // Diamond pattern
    for(let gx=W*0.05+16;gx<W*0.95;gx+=32) for(let gy=H*0.55+16;gy<H*0.95;gy+=32){
      ctx.fillStyle='rgba(180,100,20,0.18)'; ctx.beginPath();
      ctx.moveTo(gx,gy-8);ctx.lineTo(gx+8,gy);ctx.lineTo(gx,gy+8);ctx.lineTo(gx-8,gy);ctx.closePath();ctx.fill();
    }

    // Large Dallah (Arabic coffee pot) — center
    const dalX=W*0.35, dalY=H*0.65;
    // Body — pear shaped
    const dalG=ctx.createLinearGradient(dalX-22,dalY-35,dalX+22,dalY+10);
    dalG.addColorStop(0,'#C8A014'); dalG.addColorStop(0.5,'#9A7A08'); dalG.addColorStop(1,'#6A5006');
    ctx.fillStyle=dalG; ctx.beginPath(); ctx.ellipse(dalX,dalY-10,22,32,0,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle='rgba(200,160,20,0.5)'; ctx.lineWidth=1.5; ctx.beginPath(); ctx.ellipse(dalX,dalY-10,22,32,0,0,Math.PI*2); ctx.stroke();
    // Neck
    ctx.fillStyle='#9A7A08'; ctx.beginPath(); ctx.ellipse(dalX,dalY-42,10,8,0,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle='rgba(200,160,20,0.5)'; ctx.lineWidth=1; ctx.beginPath(); ctx.ellipse(dalX,dalY-42,10,8,0,0,Math.PI*2); ctx.stroke();
    // Spout
    ctx.strokeStyle='#9A7A08'; ctx.lineWidth=6; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(dalX+8,dalY-30); ctx.quadraticCurveTo(dalX+35,dalY-35,dalX+30,dalY-18); ctx.stroke();
    // Handle
    ctx.beginPath(); ctx.moveTo(dalX-22,dalY-25); ctx.quadraticCurveTo(dalX-40,dalY-15,dalX-22,dalY+5); ctx.stroke();
    // Decorative band
    ctx.strokeStyle='rgba(255,200,50,0.5)'; ctx.lineWidth=2;
    ctx.beginPath(); ctx.ellipse(dalX,dalY-16,22,8,0,0,Math.PI*2); ctx.stroke();
    // Etching pattern
    for(let ep=0;ep<6;ep++){
      const ea=(ep/6)*Math.PI*2; const er=20;
      ctx.fillStyle='rgba(255,200,50,0.15)'; ctx.beginPath();
      ctx.arc(dalX+Math.cos(ea)*er*0.7,dalY-10+Math.sin(ea)*er*0.45,2,0,Math.PI*2); ctx.fill();
    }
    // Gold glow
    const dg=ctx.createRadialGradient(dalX,dalY-10,0,dalX,dalY-10,45);
    dg.addColorStop(0,'rgba(200,150,20,0.2)'); dg.addColorStop(1,'transparent');
    ctx.fillStyle=dg; ctx.fillRect(dalX-45,dalY-55,90,80);

    // Pour stream
    const pourX=dalX+30, pourStartY=dalY-18;
    const pourProgress=(t*1.5)%1;
    if(pourProgress<0.7){
      ctx.strokeStyle=`rgba(180,130,30,${(1-pourProgress)*0.6})`; ctx.lineWidth=2.5; ctx.lineCap='round';
      ctx.beginPath(); ctx.moveTo(pourX,pourStartY);
      for(let py=pourStartY;py<dalY+pourProgress*30;py+=3){
        ctx.lineTo(pourX+Math.sin(py*0.15)*2,py);
      }
      ctx.stroke();
    }

    // Finjan cups (small handleless cups) — right side
    [[W*0.65,H*0.72],[W*0.72,H*0.7],[W*0.79,H*0.72]].forEach(([cx,cy],ci)=>{
      // Cup
      ctx.fillStyle='rgba(200,160,20,0.9)'; ctx.beginPath();
      ctx.moveTo(cx-6,cy); ctx.lineTo(cx+6,cy); ctx.lineTo(cx+4,cy+14); ctx.lineTo(cx-4,cy+14); ctx.closePath(); ctx.fill();
      ctx.strokeStyle='rgba(255,200,50,0.4)'; ctx.lineWidth=1; ctx.stroke();
      // Coffee inside
      ctx.fillStyle='rgba(80,40,5,0.8)'; ctx.beginPath();
      ctx.ellipse(cx,cy+3,5,3,0,0,Math.PI*2); ctx.fill();
      // Cup glow
      const cg=ctx.createRadialGradient(cx,cy+7,0,cx,cy+7,18);
      cg.addColorStop(0,'rgba(200,150,20,0.12)'); cg.addColorStop(1,'transparent');
      ctx.fillStyle=cg; ctx.fillRect(cx-18,cy-5,36,30);
    });

    // Dates on small plate
    const plateX=W*0.68, plateY=H*0.82;
    ctx.fillStyle='rgba(150,80,20,0.6)'; ctx.beginPath(); ctx.ellipse(plateX,plateY,25,10,0,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle='rgba(200,120,30,0.4)'; ctx.lineWidth=1; ctx.beginPath(); ctx.ellipse(plateX,plateY,25,10,0,0,Math.PI*2); ctx.stroke();
    [-12,-4,4,12].forEach((dx,i)=>{
      ctx.fillStyle='rgba(90,35,5,0.9)'; ctx.beginPath(); ctx.ellipse(plateX+dx,plateY-2,4,6,0.2,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle='rgba(140,70,10,0.5)'; ctx.lineWidth=0.8; ctx.stroke();
    });

    // Steam from cups
    [[W*0.65,H*0.7],[W*0.72,H*0.68],[W*0.79,H*0.7]].forEach(([sx,sy],si)=>{
      const sp=smoke.find(p=>!p.active); if(sp&&Math.random()<0.06){
        sp.x=sx;sp.y=sy;sp.vx=(Math.random()-0.5)*0.25;sp.vy=-(0.35+Math.random()*0.35);sp.a=0.4;sp.s=3+Math.random()*3;sp.life=1;sp.active=true;
      }
    });
    smoke.forEach(p=>{if(!p.active)return;p.x+=p.vx;p.y+=p.vy;p.life-=0.02;if(p.life<=0){p.active=false;return;}
      ctx.strokeStyle=`rgba(220,200,160,${p.life*p.a*0.35})`;ctx.lineWidth=p.s*p.life;
      ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x+p.vx*4,p.y-4);ctx.stroke();
    });

    // Arabic calligraphy inspired label
    ctx.font=`600 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(200,150,40,0.5)';
    ctx.textAlign='center'; ctx.fillText('ARABIC COFFEE CEREMONY · DALLAH · DATES · BEDOUIN TRADITION',W*0.5,H*0.07);
    ctx.font=`700 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(200,150,40,0.4)';
    ctx.fillText('قهوة عربية',W*0.5,H*0.92); // Arabic for "Arabic coffee"
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Traditional Arabic coffee ceremony with ornate gold dallah pot, finjan cups and dates on carpet pattern" />;
}
