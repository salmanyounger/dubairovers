'use client';
import { useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════
// CITY TOUR & DUBAI GUIDE BLOGS 30–42 — 13 unique animations
// All IDs globally unique — never reused anywhere on site
//
// City Tour (30-33):
//   city-landmarks     — rotating Dubai icons orbit around Burj Khalifa
//   heritage-vs-modern — split screen wind towers / skyscrapers
//   souk-abra-map      — Old Dubai map with animated abra crossing
//   half-full-timeline — split itinerary clocks side by side
//
// Dubai Guide (34-42):
//   tours-podium       — animated ranking podium for top tours
//   safari-balloon-duel — split score comparison with gauges
//   itinerary-calendar — 3/5/7 day planner with activity blocks
//   month-events-ring  — annual calendar ring with event pins
//   tips-orbit         — 28 tip icons orbiting like satellites
//   honest-scale       — balance scales weighing pros and cons
//   budget-gauge-grid  — grid of cost gauges free vs paid
//   food-galaxy        — Emirati dish emojis in constellation
//   december-lights    — December calendar with glow events
// ═══════════════════════════════════════════════════════════════

function useCanvas(fn) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext('2d');
    let raf, t = 0;
    const rsz = () => { cv.width = cv.offsetWidth||760; cv.height = cv.offsetHeight||220; };
    rsz(); const ro = new ResizeObserver(rsz); ro.observe(cv);
    const loop = () => { t += 0.014; fn(ctx, cv.width, cv.height, t); raf = requestAnimationFrame(loop); };
    loop();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return ref;
}

// ── 1. CITY LANDMARKS — icons orbiting Burj Khalifa ───────────
export function BlogAnim_CityLandmarks() {
  const LANDMARKS = [
    {emoji:'🕌',label:'Jumeirah Mosque'},{emoji:'🏛️',label:'Al Fahidi Fort'},
    {emoji:'🛍️',label:'Gold Souk'},{emoji:'🌊',label:'Dubai Creek'},
    {emoji:'🎡',label:'Ain Dubai'},{emoji:'🏖️',label:'JBR Beach'},
    {emoji:'🛥️',label:'Dubai Marina'},{emoji:'🏟️',label:'Burj Al Arab'},
  ];
  const ref = useCanvas((ctx, W, H, t) => {
    ctx.fillStyle='#020408'; ctx.fillRect(0,0,W,H);
    const bg=ctx.createRadialGradient(W*.5,H*.5,0,W*.5,H*.5,W*.5);
    bg.addColorStop(0,'rgba(30,60,120,0.08)'); bg.addColorStop(1,'transparent');
    ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);

    // Grid dot background
    for(let i=0;i<60;i++){
      ctx.fillStyle=`rgba(100,150,255,${0.04+Math.sin(t+i)*0.02})`;
      ctx.beginPath(); ctx.arc((i*173)%W,(i*97)%(H),1,0,Math.PI*2); ctx.fill();
    }

    // Burj Khalifa (center, simplified)
    const bx=W*.5, btop=H*.06, bbot=H*.82;
    const drawBurj = () => {
      const sections=[
        [16,bbot],[13,bbot-(bbot-btop)*.12],[10,bbot-(bbot-btop)*.25],
        [8,bbot-(bbot-btop)*.4],[6,bbot-(bbot-btop)*.56],[4.5,bbot-(bbot-btop)*.7],
        [3,bbot-(bbot-btop)*.82],[1.5,bbot-(bbot-btop)*.9],[0.6,btop],
      ];
      sections.forEach(([hw,y],i)=>{
        const next=sections[i+1]||[0.3,btop-10];
        const g=ctx.createLinearGradient(bx-hw,0,bx+hw,0);
        g.addColorStop(0,'rgba(20,40,80,0.95)'); g.addColorStop(.5,'rgba(35,65,130,0.95)'); g.addColorStop(1,'rgba(20,40,80,0.95)');
        ctx.fillStyle=g; ctx.beginPath();
        ctx.moveTo(bx-hw,y); ctx.lineTo(bx+hw,y); ctx.lineTo(bx+next[0],next[1]); ctx.lineTo(bx-next[0],next[1]); ctx.closePath(); ctx.fill();
        // windows
        if(y>H*.3){ for(let wc=-Math.floor(hw/4);wc<=Math.floor(hw/4);wc++){
          if(Math.sin(t*.4+wc*3+i*5)>-.1){ctx.fillStyle=`rgba(255,220,100,${.2+Math.sin(t*.5+wc+i)*.08})`;ctx.fillRect(bx+wc*4-1.5,y+2,3,3);}
        }}
      });
      // Antenna blink
      ctx.fillStyle=`rgba(255,80,80,${.5+.5*Math.sin(t*2.5)})`; ctx.beginPath(); ctx.arc(bx,btop,2,0,Math.PI*2); ctx.fill();
    };
    drawBurj();

    // Landmarks orbiting
    const orbitR = Math.min(W*.32, H*.38);
    LANDMARKS.forEach((lm,i)=>{
      const angle = (i/LANDMARKS.length)*Math.PI*2 + t*.25;
      const lx = W*.5+Math.cos(angle)*orbitR;
      const ly = H*.5+Math.sin(angle)*orbitR*.5;
      const alpha = .5+.5*Math.sin(t*1.2+i);
      // Orbit trail
      ctx.strokeStyle=`rgba(100,160,255,${alpha*.12})`; ctx.lineWidth=.8; ctx.setLineDash([3,8]);
      ctx.beginPath(); ctx.ellipse(W*.5,H*.5,orbitR,orbitR*.5,0,0,Math.PI*2); ctx.stroke(); ctx.setLineDash([]);
      // Badge
      ctx.save(); ctx.globalAlpha=alpha;
      const bw=ctx.measureText(lm.label).width+20;
      ctx.fillStyle='rgba(20,40,100,.85)'; ctx.strokeStyle='rgba(100,160,255,.35)'; ctx.lineWidth=1;
      if(ctx.roundRect){ctx.beginPath();ctx.roundRect(lx-bw/2,ly-14,bw,22,11);ctx.fill();ctx.stroke();}
      ctx.font=`600 ${W>500?10:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(180,210,255,.9)'; ctx.textAlign='center';
      ctx.fillText(`${lm.emoji} ${lm.label}`,lx,ly+3);
      ctx.restore();
    });

    // Glow halo on Burj
    const hg=ctx.createRadialGradient(bx,H*.5,0,bx,H*.5,60);
    hg.addColorStop(0,'rgba(100,160,255,.08)'); hg.addColorStop(1,'transparent');
    ctx.fillStyle=hg; ctx.fillRect(bx-60,H*.4,120,120);

    ctx.font=`600 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(100,160,255,.4)';
    ctx.textAlign='center'; ctx.fillText('DUBAI CITY TOUR — 16 MUST-SEE LANDMARKS',W*.5,H*.06);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Dubai city landmarks orbiting around Burj Khalifa including Jumeirah Mosque, Gold Souk and JBR Beach" />;
}

// ── 2. HERITAGE vs MODERN — split screen ──────────────────────
export function BlogAnim_HeritageVsModern() {
  const ref = useCanvas((ctx, W, H, t) => {
    const mid=W*.5;
    // LEFT — Old Dubai (warm amber)
    ctx.save(); ctx.beginPath(); ctx.rect(0,0,mid,H); ctx.clip();
    const oldSky=ctx.createLinearGradient(0,0,0,H); oldSky.addColorStop(0,'#0A0600'); oldSky.addColorStop(.5,'#1E0C00'); oldSky.addColorStop(1,'#8B3A00');
    ctx.fillStyle=oldSky; ctx.fillRect(0,0,mid,H);
    // Sunset glow
    const og=ctx.createRadialGradient(mid*.6,H*.7,0,mid*.6,H*.7,mid*.5);
    og.addColorStop(0,'rgba(255,140,30,.35)'); og.addColorStop(1,'transparent');
    ctx.fillStyle=og; ctx.fillRect(0,0,mid,H);
    // Heritage buildings with wind towers
    const HB=[{x:.03,w:.08,h:.38,wind:true},{x:.13,w:.06,h:.28},{x:.20,w:.07,h:.35,wind:true},{x:.28,w:.05,h:.24},{x:.36,w:.08,h:.40,wind:true},{x:.46,w:.05,h:.26}];
    HB.forEach((b,i)=>{
      const bx=W*b.x,bw=W*b.w,bh=H*b.h,by=H*.62-bh;
      const g=ctx.createLinearGradient(bx,by,bx+bw,by+bh);
      g.addColorStop(0,`rgba(160,${80+i*4},${20+i*2},.92)`); g.addColorStop(1,`rgba(100,${50+i*3},12,.95)`);
      ctx.fillStyle=g; ctx.fillRect(bx,by,bw,bh);
      // Warm windows
      const wc=Math.max(1,Math.floor(bw/10)),wr=Math.min(4,Math.floor(bh/14));
      for(let r=0;r<wr;r++) for(let c=0;c<wc;c++){
        if(Math.sin(t*.4+i*3+r+c)>-.1){ctx.fillStyle=`rgba(255,200,80,${.25+Math.sin(t*.5+r+c)*.1})`;ctx.fillRect(bx+2+c*(bw/wc),by+3+r*(bh/wr),bw/wc-2,bh/wr-3);}
      }
      if(b.wind){const tw=bw*.4,twh=bh*.3;ctx.fillStyle='rgba(130,60,15,.95)';ctx.fillRect(bx+bw*.3,by-twh,tw,twh);
        ctx.strokeStyle='rgba(80,30,5,.7)';ctx.lineWidth=.8;[.25,.5,.75].forEach(f=>{ctx.beginPath();ctx.moveTo(bx+bw*.3+tw*f,by-twh);ctx.lineTo(bx+bw*.3+tw*f,by);ctx.stroke();});
      }
    });
    // Ground + water
    ctx.fillStyle='rgba(60,25,5,.8)'; ctx.fillRect(0,H*.62,mid,H*.38);
    for(let i=0;i<4;i++){ctx.strokeStyle=`rgba(200,110,30,${.06+Math.sin(t*1.3+i)*.03})`;ctx.lineWidth=1;ctx.beginPath();const wy=H*(.66+i*.05);for(let x=0;x<=mid;x+=5)ctx.lineTo(x,wy+Math.sin(x*.03+t*1.5+i)*2);ctx.stroke();}
    ctx.font=`700 ${W>500?12:10}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,160,60,.8)'; ctx.textAlign='center'; ctx.fillText('OLD DUBAI',mid*.5,H*.88);
    ctx.font=`400 ${W>500?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.4)'; ctx.fillText('Heritage · Creek · 200 years',mid*.5,H*.95);
    ctx.restore();

    // RIGHT — Modern Dubai (blue/silver)
    ctx.save(); ctx.beginPath(); ctx.rect(mid,0,mid,H); ctx.clip();
    const modSky=ctx.createLinearGradient(0,0,0,H); modSky.addColorStop(0,'#010208'); modSky.addColorStop(.5,'#030415'); modSky.addColorStop(1,'#060318');
    ctx.fillStyle=modSky; ctx.fillRect(mid,0,mid,H);
    for(let i=0;i<60;i++){ctx.fillStyle=`rgba(255,255,255,${.07+Math.sin(t*1.2+i)*.05})`;ctx.beginPath();ctx.arc(mid+(i*173)%mid,(i*89)%(H*.55),.7+(i%3)*.25,0,Math.PI*2);ctx.fill();}
    const MB=[{x:.02,w:.04,h:.55},{x:.08,w:.035,h:.42},{x:.13,w:.045,h:.62},{x:.20,w:.03,h:.38},{x:.26,w:.05,h:.70},{x:.33,w:.032,h:.45},{x:.40,w:.025,h:.32},{x:.68,w:.03,h:.40},{x:.74,w:.04,h:.55},{x:.80,w:.05,h:.65},{x:.87,w:.03,h:.38},{x:.93,w:.04,h:.50}];
    MB.forEach((b,i)=>{
      const bx=mid+W*b.x,bw=W*b.w,bh=H*b.h,by=H*.62-bh;
      const g=ctx.createLinearGradient(bx,by,bx+bw,by+bh);
      g.addColorStop(0,'rgba(15,30,70,.95)'); g.addColorStop(.5,'rgba(25,50,110,.95)'); g.addColorStop(1,'rgba(10,20,50,.95)');
      ctx.fillStyle=g; ctx.fillRect(bx,by,bw,bh);
      const wc=Math.max(2,Math.floor(bw/7)),wr=Math.min(10,Math.floor(bh/9));
      for(let r=0;r<wr;r++) for(let c=0;c<wc;c++){
        if(Math.sin(t*.3+i*4+r*3+c*5)>-.15){ctx.fillStyle=`rgba(200,220,255,${.2+Math.sin(t*.5+r+c)*.1})`;ctx.fillRect(bx+1+c*(bw/wc),by+2+r*(bh/wr),bw/wc-1,bh/wr-2);}
      }
      ctx.fillStyle=`rgba(255,80,80,${.5+.5*Math.sin(t*2.5+i)})`; ctx.beginPath(); ctx.arc(bx+bw*.5,by,1.5,0,Math.PI*2); ctx.fill();
    });
    ctx.fillStyle='rgba(15,20,50,.8)'; ctx.fillRect(mid,H*.62,mid,H*.38);
    for(let i=0;i<4;i++){ctx.strokeStyle=`rgba(80,120,255,${.05+Math.sin(t*1.4+i)*.03})`;ctx.lineWidth=1;ctx.beginPath();const wy=H*(.67+i*.05);for(let x=mid;x<=W;x+=5)ctx.lineTo(x,wy+Math.sin(x*.025+t*1.5+i)*2.5);ctx.stroke();}
    ctx.font=`700 ${W>500?12:10}px Outfit,sans-serif`; ctx.fillStyle='rgba(100,160,255,.8)'; ctx.textAlign='center'; ctx.fillText('NEW DUBAI',mid+mid*.5,H*.88);
    ctx.font=`400 ${W>500?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.4)'; ctx.fillText('Skyscrapers · Marina · Future',mid+mid*.5,H*.95);
    ctx.restore();

    // Divider + VS
    ctx.strokeStyle='rgba(255,255,255,.12)'; ctx.lineWidth=1; ctx.setLineDash([5,10]);
    ctx.beginPath(); ctx.moveTo(mid,0); ctx.lineTo(mid,H); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle='rgba(5,4,12,.95)'; ctx.strokeStyle='rgba(255,255,255,.2)'; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.arc(mid,H*.5,20,0,Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.font=`800 12px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.7)'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText('VS',mid,H*.5); ctx.textBaseline='alphabetic';
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Side by side comparison of Old Dubai heritage district with wind towers versus modern Dubai skyscraper skyline" />;
}

// ── 3. SOUK + ABRA MAP ────────────────────────────────────────
export function BlogAnim_SoukAbraMap() {
  const ref = useCanvas((ctx, W, H, t) => {
    ctx.fillStyle='#030508'; ctx.fillRect(0,0,W,H);
    ctx.strokeStyle='rgba(200,140,50,.04)'; ctx.lineWidth=.8;
    for(let gx=0;gx<W;gx+=W/10){ctx.beginPath();ctx.moveTo(gx,0);ctx.lineTo(gx,H);ctx.stroke();}
    for(let gy=0;gy<H;gy+=H/6){ctx.beginPath();ctx.moveTo(0,gy);ctx.lineTo(W,gy);ctx.stroke();}

    // Creek (wavy line across center)
    ctx.strokeStyle='rgba(50,120,200,.5)'; ctx.lineWidth=14;
    ctx.beginPath(); ctx.moveTo(0,H*.52);
    for(let x=0;x<=W;x+=8) ctx.lineTo(x,H*.52+Math.sin(x*.012+t*.3)*12+Math.cos(x*.025)*6);
    ctx.stroke();
    // Creek shimmer
    ctx.strokeStyle='rgba(100,180,255,.15)'; ctx.lineWidth=4;
    ctx.beginPath(); ctx.moveTo(0,H*.5);
    for(let x=0;x<=W;x+=8) ctx.lineTo(x,H*.5+Math.sin(x*.015+t*.4+1)*8);
    ctx.stroke();

    // Landmarks
    const PLACES=[
      {x:.12,y:.3,icon:'🕌',label:'Jumeirah Mosque',color:'rgba(255,200,80'},
      {x:.28,y:.28,icon:'🏛️',label:'Al Fahidi Fort',color:'rgba(245,158,11'},
      {x:.42,y:.32,icon:'🌾',label:'Spice Souk',color:'rgba(200,140,50'},
      {x:.58,y:.3,icon:'💛',label:'Gold Souk',color:'rgba(255,215,0'},
      {x:.72,y:.35,icon:'🛥️',label:'Deira Docks',color:'rgba(100,180,255'},
      {x:.18,y:.72,icon:'🏘️',label:'Bur Dubai',color:'rgba(200,120,50'},
      {x:.38,y:.7,icon:'🎭',label:'Heritage Village',color:'rgba(180,100,30'},
      {x:.62,y:.68,icon:'🕍',label:'Grand Mosque',color:'rgba(180,160,100'},
      {x:.80,y:.72,icon:'🛍️',label:'Deira Souk',color:'rgba(255,180,50'},
    ];
    PLACES.forEach((p,i)=>{
      const px=p.x*W,py=p.y*H,alpha=.6+.35*Math.sin(t*1.2+i);
      ctx.save(); ctx.globalAlpha=alpha;
      const pg=ctx.createRadialGradient(px,py,0,px,py,18);
      pg.addColorStop(0,`${p.color},.2)`); pg.addColorStop(1,'transparent');
      ctx.fillStyle=pg; ctx.fillRect(px-18,py-18,36,36);
      ctx.font=`${W>500?16:13}px serif`; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(p.icon,px,py);
      ctx.font=`500 ${W>500?9:8}px Outfit,sans-serif`; ctx.fillStyle=`${p.color},.75)`; ctx.textBaseline='alphabetic';
      ctx.fillText(p.label,px,py+16); ctx.restore();
    });

    // Animated abra crossing the creek
    const abraProg=((t*.18)%(1.4))-.2;
    const abraX=abraProg*W;
    const abraY=H*.52+Math.sin(abraX*.012+t*.3)*12+Math.cos(abraX*.025)*6;
    if(abraX>0&&abraX<W){
      ctx.save(); ctx.translate(abraX,abraY);
      ctx.fillStyle='rgba(5,2,0,.95)';
      ctx.beginPath(); ctx.moveTo(-W*.04,0); ctx.lineTo(W*.04,0); ctx.lineTo(W*.05,H*.025); ctx.lineTo(-W*.032,H*.025); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(W*.04,0); ctx.lineTo(W*.055,H*.013); ctx.lineTo(W*.05,H*.025); ctx.closePath(); ctx.fill();
      ctx.fillRect(-W*.028,-H*.022,W*.055,H*.022);
      // Passengers
      for(let p=0;p<3;p++){ctx.fillStyle='rgba(5,2,0,.9)';ctx.beginPath();ctx.arc(-W*.02+p*W*.018,-H*.03,3,0,Math.PI*2);ctx.fill();}
      // Wake
      ctx.strokeStyle='rgba(100,180,255,.3)'; ctx.lineWidth=1;
      for(let w=0;w<3;w++){ctx.beginPath();ctx.moveTo(W*.05+w*6,H*.015);ctx.lineTo(W*.05+w*6+8,H*.025-w*2);ctx.stroke();}
      ctx.restore();
    }

    ctx.font=`600 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(200,140,50,.45)';
    ctx.textAlign='center'; ctx.fillText('OLD DUBAI — CREEK · SOUKS · HERITAGE · ABRA WATER TAXI',W*.5,H*.06);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Map of Old Dubai showing Dubai Creek with animated abra water taxi crossing between Gold Souk, Spice Souk and heritage sites" />;
}

// ── 4. HALF vs FULL DAY TIMELINE ──────────────────────────────
export function BlogAnim_HalfFullTimeline() {
  const ref = useCanvas((ctx, W, H, t) => {
    ctx.fillStyle='#020406'; ctx.fillRect(0,0,W,H);
    const bg=ctx.createLinearGradient(0,0,W,H); bg.addColorStop(0,'#020408'); bg.addColorStop(1,'#060214');
    ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);

    const HALF=[
      {time:'8:30 AM',act:'Hotel Pickup',icon:'🚗',color:'rgba(100,160,255'},
      {time:'9:30 AM',act:'Al Fahidi',icon:'🏛️',color:'rgba(200,140,50'},
      {time:'10:30',act:'Gold Souk',icon:'💛',color:'rgba(255,215,0'},
      {time:'11:30',act:'Jumeirah',icon:'🕌',color:'rgba(180,220,180'},
      {time:'12:30',act:'Hotel Drop',icon:'🏨',color:'rgba(100,200,100'},
    ];
    const FULL=[
      {time:'8:30 AM',act:'Hotel Pickup',icon:'🚗',color:'rgba(100,160,255'},
      {time:'9:30 AM',act:'Al Fahidi',icon:'🏛️',color:'rgba(200,140,50'},
      {time:'10:30',act:'Gold Souk',icon:'💛',color:'rgba(255,215,0'},
      {time:'11:30',act:'Spice Souk',icon:'🌾',color:'rgba(180,160,80'},
      {time:'12:30',act:'Abra Ride',icon:'🛥️',color:'rgba(100,200,255'},
      {time:'1:30 PM',act:'Lunch',icon:'🍽️',color:'rgba(245,158,11'},
      {time:'2:30 PM',act:'Burj Khalifa',icon:'🏙️',color:'rgba(150,100,255'},
      {time:'4:00 PM',act:'Dubai Mall',icon:'🛍️',color:'rgba(255,150,150'},
      {time:'6:00 PM',act:'Hotel Drop',icon:'🏨',color:'rgba(100,200,100'},
    ];

    const activeProg = (t*.08)%1;

    ['HALF DAY (AED 350)','FULL DAY (AED 550)'].forEach((label,side)=>{
      const items = side===0?HALF:FULL;
      const colX = side===0?W*.04:W*.54;
      const colW = W*.44;

      ctx.fillStyle=side===0?'rgba(100,160,255,.1)':'rgba(245,158,11,.1)';
      ctx.strokeStyle=side===0?'rgba(100,160,255,.25)':'rgba(245,158,11,.25)'; ctx.lineWidth=1;
      if(ctx.roundRect){ctx.beginPath();ctx.roundRect(colX,H*.06,colW,H*.88,14);ctx.fill();ctx.stroke();}

      ctx.font=`700 ${W>500?11:9}px Outfit,sans-serif`;
      ctx.fillStyle=side===0?'rgba(100,160,255,.8)':'rgba(245,158,11,.8)';
      ctx.textAlign='center'; ctx.fillText(label,colX+colW*.5,H*.12);

      const itemH=(H*.82)/items.length;
      items.forEach((item,i)=>{
        const iy=H*.15+i*itemH;
        const revealProgress=Math.min(1,Math.max(0,(activeProg*items.length*1.5-i)));
        if(revealProgress<=0) return;

        ctx.save(); ctx.globalAlpha=Math.min(1,revealProgress*2);
        // Dot
        ctx.fillStyle=`${item.color},.8)`;
        ctx.beginPath(); ctx.arc(colX+18,iy+itemH*.4,5,0,Math.PI*2); ctx.fill();
        // Line down
        if(i<items.length-1){ctx.strokeStyle=`${item.color},.25)`;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(colX+18,iy+itemH*.4+5);ctx.lineTo(colX+18,iy+itemH);ctx.stroke();}
        // Time
        ctx.font=`500 ${W>500?9:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.4)'; ctx.textAlign='left';
        ctx.fillText(item.time,colX+28,iy+itemH*.3);
        // Activity
        ctx.font=`600 ${W>500?10:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.75)';
        ctx.fillText(`${item.icon} ${item.act}`,colX+28,iy+itemH*.55);
        ctx.restore();
      });

      // Price + hours
      ctx.font=`600 ${W>500?10:9}px Outfit,sans-serif`;
      ctx.fillStyle=side===0?'rgba(100,160,255,.55)':'rgba(245,158,11,.55)';
      ctx.textAlign='center'; ctx.fillText(side===0?'4 hours · 4 stops':'9.5 hours · 8 stops',colX+colW*.5,H*.96);
    });

    // VS divider
    ctx.strokeStyle='rgba(255,255,255,.08)'; ctx.lineWidth=1; ctx.setLineDash([4,8]);
    ctx.beginPath(); ctx.moveTo(W*.5,H*.06); ctx.lineTo(W*.5,H*.94); ctx.stroke(); ctx.setLineDash([]);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Side by side itinerary timeline comparing half day and full day Dubai city tour stops and timing" />;
}

// ── 5. TOURS PODIUM — animated ranking ────────────────────────
export function BlogAnim_ToursPodium() {
  const TOURS=[
    {rank:1,name:'Hot Air Balloon',icon:'🎈',score:9.8,color:'rgba(255,200,50'},
    {rank:2,name:'Desert Safari',icon:'🏜️',score:9.5,color:'rgba(245,158,11'},
    {rank:3,name:'Dhow Cruise',icon:'⛵',score:9.1,color:'rgba(100,180,255'},
    {rank:4,name:'Quad Bike',icon:'🚵',score:8.7,color:'rgba(200,60,20'},
    {rank:5,name:'Camel Riding',icon:'🐪',score:8.4,color:'rgba(180,130,50'},
    {rank:6,name:'City Tour',icon:'🏙️',score:8.2,color:'rgba(150,100,255'},
  ];
  const ref = useCanvas((ctx, W, H, t) => {
    ctx.fillStyle='#030508'; ctx.fillRect(0,0,W,H);
    const bg=ctx.createRadialGradient(W*.5,H*.5,0,W*.5,H*.5,W*.55);
    bg.addColorStop(0,'rgba(255,200,50,.05)'); bg.addColorStop(1,'transparent');
    ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);

    const barMaxW=W*.52; const startX=W*.4; const barH=H*.09; const gap=H*.025;
    const topY=H*.09;

    TOURS.forEach((tour,i)=>{
      const by=topY+i*(barH+gap);
      const revealP=Math.min(1,Math.max(0,(t*.4-i*.5)));
      const barW=barMaxW*(tour.score/10)*revealP;

      // Bar background
      ctx.fillStyle='rgba(255,255,255,.04)'; ctx.strokeStyle='rgba(255,255,255,.08)'; ctx.lineWidth=.8;
      if(ctx.roundRect){ctx.beginPath();ctx.roundRect(startX,by,barMaxW,barH,barH*.4);ctx.fill();ctx.stroke();}
      // Bar fill
      if(barW>0){
        const g=ctx.createLinearGradient(startX,0,startX+barW,0);
        g.addColorStop(0,`${tour.color},.6)`); g.addColorStop(1,`${tour.color},.3)`);
        ctx.fillStyle=g;
        if(ctx.roundRect){ctx.beginPath();ctx.roundRect(startX,by,barW,barH,barH*.4);ctx.fill();}
      }

      // Rank medal
      const medalColors=['rgba(255,215,0','rgba(192,192,192','rgba(205,127,50','rgba(150,150,150','rgba(150,150,150','rgba(150,150,150'];
      ctx.fillStyle=`${medalColors[i]},.9)`; ctx.beginPath(); ctx.arc(startX-28,by+barH*.5,14,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle=`${medalColors[i]},.5)`; ctx.lineWidth=1.5; ctx.stroke();
      ctx.font=`800 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(0,0,0,.8)'; ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.fillText(`#${tour.rank}`,startX-28,by+barH*.5); ctx.textBaseline='alphabetic';

      // Icon + name (left)
      ctx.font=`${W>500?16:13}px serif`; ctx.textAlign='right'; ctx.fillText(tour.icon,startX-48,by+barH*.65);
      ctx.font=`600 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.8)';
      ctx.fillText(tour.name,startX-10,by+barH*.65);

      // Score label
      if(revealP>.5){
        ctx.font=`700 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle=`${tour.color},.9)`;
        ctx.textAlign='left'; ctx.fillText(`${tour.score}`,startX+barW+8,by+barH*.65);
      }
    });

    ctx.font=`600 ${W>500?12:10}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,215,0,.5)'; ctx.textAlign='center';
    ctx.fillText('DUBAI TOURS RANKED BY EXPERIENCE SCORE — 2026',W*.5,H*.05);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Animated ranking chart of Dubai tours scored by experience with hot air balloon first, desert safari second and dhow cruise third" />;
}

// ── 6. SAFARI vs BALLOON DUEL ─────────────────────────────────
export function BlogAnim_SafariBalloonDuel() {
  const CATS=['Thrill','Views','Value','Uniqueness','Duration','Family'];
  const SCORES_S=[9,8,9.5,8.5,9,9]; // Desert Safari
  const SCORES_B=[8,10,7,10,8,7];   // Balloon
  const ref = useCanvas((ctx, W, H, t) => {
    ctx.fillStyle='#030508'; ctx.fillRect(0,0,W,H);
    const cx2=W*.5, topY=H*.12, gap=H*.12, barZoneW=W*.28;

    // Title headers
    ctx.font=`700 ${W>500?13:11}px Outfit,sans-serif`;
    ctx.fillStyle='rgba(245,158,11,.8)'; ctx.textAlign='right'; ctx.fillText('🏜️ Desert Safari',cx2-16,H*.07);
    ctx.fillStyle='rgba(150,100,255,.8)'; ctx.textAlign='left';  ctx.fillText('🎈 Hot Air Balloon',cx2+16,H*.07);

    CATS.forEach((cat,i)=>{
      const ry=topY+i*gap;
      const ss=SCORES_S[i], bs=SCORES_B[i];
      const revP=Math.min(1,Math.max(0,t*.5-i*.3));

      // Category label center
      ctx.font=`600 ${W>500?10:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.5)'; ctx.textAlign='center';
      ctx.fillText(cat,cx2,ry+5);

      // Safari bar (left, growing leftward)
      const sw=barZoneW*(ss/10)*revP;
      const sg=ctx.createLinearGradient(cx2-sw,0,cx2,0);
      sg.addColorStop(0,'rgba(245,158,11,.25)'); sg.addColorStop(1,'rgba(245,158,11,.7)');
      ctx.fillStyle=sg;
      if(ctx.roundRect){ctx.beginPath();ctx.roundRect(cx2-sw-12,ry-8,sw,16,8);ctx.fill();}
      if(revP>.5){ctx.font=`700 10px Outfit,sans-serif`;ctx.fillStyle='rgba(245,158,11,.8)';ctx.textAlign='right';ctx.fillText(ss,cx2-sw-16,ry+5);}

      // Balloon bar (right, growing rightward)
      const bw=barZoneW*(bs/10)*revP;
      const bg2=ctx.createLinearGradient(cx2,0,cx2+bw,0);
      bg2.addColorStop(0,'rgba(150,100,255,.7)'); bg2.addColorStop(1,'rgba(150,100,255,.25)');
      ctx.fillStyle=bg2;
      if(ctx.roundRect){ctx.beginPath();ctx.roundRect(cx2+12,ry-8,bw,16,8);ctx.fill();}
      if(revP>.5){ctx.font=`700 10px Outfit,sans-serif`;ctx.fillStyle='rgba(150,100,255,.8)';ctx.textAlign='left';ctx.fillText(bs,cx2+bw+16,ry+5);}

      // Winner highlight
      if(revP>0.9){
        const winner=ss>bs?'left':'right';
        const wx=winner==='left'?cx2-sw/2-12:cx2+bw/2+12;
        ctx.fillStyle=`rgba(255,215,0,${(revP-.9)*5*.15})`; ctx.beginPath(); ctx.arc(wx,ry,10,0,Math.PI*2); ctx.fill();
      }
    });

    // Total scores
    const totalS=SCORES_S.reduce((a,b)=>a+b,0)/SCORES_S.length;
    const totalB=SCORES_B.reduce((a,b)=>a+b,0)/SCORES_B.length;
    ctx.font=`700 ${W>500?12:10}px Outfit,sans-serif`;
    ctx.fillStyle='rgba(245,158,11,.7)'; ctx.textAlign='right'; ctx.fillText(`Avg: ${totalS.toFixed(1)}/10`,cx2-8,H*.92);
    ctx.fillStyle='rgba(150,100,255,.7)'; ctx.textAlign='left'; ctx.fillText(`Avg: ${totalB.toFixed(1)}/10`,cx2+8,H*.92);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Head to head score comparison of desert safari versus hot air balloon across six categories including thrill, views, value and uniqueness" />;
}

// ── 7. ITINERARY CALENDAR — 3/5/7 days ────────────────────────
export function BlogAnim_ItineraryCalendar() {
  const PLANS=[
    {days:3,label:'Weekend Trip',color:'rgba(100,200,100',
     items:['Desert Safari','Dubai Mall + Burj','Dhow Cruise']},
    {days:5,label:'Short Holiday',color:'rgba(245,158,11',
     items:['Desert Safari','City Tour AM','Gold Souk PM','Balloon','Dhow Cruise']},
    {days:7,label:'Full Experience',color:'rgba(150,100,255',
     items:['Desert Safari','City Tour','Quad Bike','Balloon','Camel Ride','Creek + Souks','Dhow Cruise']},
  ];
  const ref = useCanvas((ctx, W, H, t) => {
    ctx.fillStyle='#020406'; ctx.fillRect(0,0,W,H);
    const colW=W/3; const topY=H*.08;

    PLANS.forEach((plan,pi)=>{
      const cx2=colW*pi+colW*.5;
      const revP=Math.min(1,Math.max(0,t*.4-pi*.4));

      // Column header
      ctx.fillStyle=`${plan.color},.12)`; ctx.strokeStyle=`${plan.color},.3)`; ctx.lineWidth=1;
      if(ctx.roundRect){ctx.beginPath();ctx.roundRect(colW*pi+4,topY,colW-8,H*.86,12);ctx.fill();ctx.stroke();}

      ctx.font=`700 ${W>500?14:12}px Outfit,sans-serif`; ctx.fillStyle=`${plan.color},.9)`; ctx.textAlign='center';
      ctx.fillText(`${plan.days} Days`,cx2,topY+H*.06);
      ctx.font=`400 ${W>500?10:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.45)';
      ctx.fillText(plan.label,cx2,topY+H*.1);

      // Day blocks
      const blockH=(H*.68)/plan.days; const blockY=topY+H*.13;
      plan.items.forEach((item,i)=>{
        const iy=blockY+i*blockH;
        const iRevP=Math.min(1,Math.max(0,(revP*plan.days*1.2-i)));
        if(iRevP<=0) return;
        ctx.save(); ctx.globalAlpha=Math.min(1,iRevP*2);
        ctx.fillStyle=`${plan.color},.15)`;
        if(ctx.roundRect){ctx.beginPath();ctx.roundRect(colW*pi+8,iy,colW-16,blockH-3,6);ctx.fill();}
        ctx.font=`500 ${W>500?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.75)'; ctx.textAlign='left';
        ctx.fillText(`Day ${i+1}`,colW*pi+14,iy+blockH*.38);
        ctx.font=`600 ${W>500?10:8}px Outfit,sans-serif`; ctx.fillStyle=`${plan.color},.85)`;
        ctx.fillText(item,colW*pi+14,iy+blockH*.7);
        ctx.restore();
      });

      // Price indicator
      const prices=[0,0,0]; // shown in content
      ctx.font=`600 ${W>500?10:9}px Outfit,sans-serif`; ctx.fillStyle=`${plan.color},.5)`; ctx.textAlign='center';
      ctx.fillText(['~AED 400','~AED 1,300','~AED 2,400'][pi],cx2,H*.92);
    });

    ctx.font=`600 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.28)'; ctx.textAlign='center';
    ctx.fillText('DUBAI ITINERARY PLANNER — 3, 5 OR 7 DAYS',W*.5,H*.05);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Dubai itinerary planner showing three columns for 3-day 5-day and 7-day trip options with daily activity blocks" />;
}

// ── 8. MONTH EVENTS RING — annual calendar ─────────────────────
export function BlogAnim_MonthEventsRing() {
  const MONTHS=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const EVENTS=['DSF','DSF','F1','←','HOT','❌','❌','❌','🌊','GITEX','ADFIZ','NYE'];
  const COMFORT=[1,1,0.9,0.6,0.2,0,0,0,0.2,0.7,0.9,1];
  const ref = useCanvas((ctx, W, H, t) => {
    ctx.fillStyle='#020408'; ctx.fillRect(0,0,W,H);
    const cx2=W*.5, cy2=H*.52, outerR=Math.min(W*.3,H*.4);

    MONTHS.forEach((m,i)=>{
      const a1=(i/12)*Math.PI*2-Math.PI*.5;
      const a2=((i+.85)/12)*Math.PI*2-Math.PI*.5;
      const comfort=COMFORT[i];
      const highlight=comfort>=.9;
      const pulse=highlight? 0.85+Math.sin(t*2+i)*.12:.6;

      // Segment
      ctx.fillStyle=highlight?`rgba(245,158,11,${.2+Math.sin(t*1.5+i)*.06})`:`rgba(${Math.floor(200-comfort*150)},${Math.floor(100+comfort*80)},${Math.floor(20+comfort*30)},0.12)`;
      ctx.beginPath(); ctx.moveTo(cx2,cy2); ctx.arc(cx2,cy2,outerR,a1,a2); ctx.closePath(); ctx.fill();
      ctx.strokeStyle=highlight?`rgba(245,158,11,${pulse})`:'rgba(255,255,255,.07)'; ctx.lineWidth=highlight?1.5:.5;
      ctx.beginPath(); ctx.moveTo(cx2,cy2); ctx.arc(cx2,cy2,outerR,a1,a2); ctx.closePath(); ctx.stroke();

      // Month label
      const la=(i+.42)/12*Math.PI*2-Math.PI*.5;
      const lx=cx2+Math.cos(la)*outerR*.72, ly=cy2+Math.sin(la)*outerR*.72;
      ctx.font=`${highlight?'700':'500'} ${W>500?11:9}px Outfit,sans-serif`;
      ctx.fillStyle=highlight?'#F59E0B':'rgba(255,255,255,.45)';
      ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(m,lx,ly);

      // Event badge
      if(EVENTS[i]&&EVENTS[i]!=='←'&&EVENTS[i]!=='❌'){
        const er=outerR*.95;
        const ex=cx2+Math.cos(la)*er, ey=cy2+Math.sin(la)*er;
        ctx.font=`600 ${W>500?8:7}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,180,50,.8)';
        ctx.fillText(EVENTS[i],ex,ey+14);
      }
    });

    // Center hub
    const hg=ctx.createRadialGradient(cx2,cy2,0,cx2,cy2,outerR*.3);
    hg.addColorStop(0,'rgba(245,158,11,.1)'); hg.addColorStop(1,'rgba(5,4,14,.95)');
    ctx.fillStyle=hg; ctx.beginPath(); ctx.arc(cx2,cy2,outerR*.28,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle='rgba(245,158,11,.25)'; ctx.lineWidth=1; ctx.beginPath(); ctx.arc(cx2,cy2,outerR*.28,0,Math.PI*2); ctx.stroke();
    ctx.font=`700 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='#F59E0B'; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('BEST',cx2,cy2-7); ctx.fillText('SEASON',cx2,cy2+7); ctx.textBaseline='alphabetic';

    // Legend right
    const lx2=W*.76, ly2=H*.22;
    ctx.font=`600 ${W>500?10:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.5)'; ctx.textAlign='left';
    ctx.fillText('Oct–Apr: Best',lx2,ly2);
    ctx.fillStyle='rgba(245,158,11,.7)'; ctx.fillText('★ Peak months',lx2,ly2+16);
    ctx.fillStyle='rgba(200,80,20,.6)'; ctx.fillText('Jun–Aug: Avoid',lx2,ly2+32);
    ctx.fillStyle='rgba(100,180,255,.6)'; ctx.fillText('DSF = Dubai Shopping',lx2,ly2+52);
    ctx.fillStyle='rgba(100,180,255,.6)'; ctx.fillText('F1 = Abu Dhabi GP',lx2,ly2+68);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Annual calendar ring showing best months to visit Dubai with October to April highlighted and major events marked" />;
}

// ── 9. TIPS ORBIT — 28 tips as satellites ─────────────────────
export function BlogAnim_TipsOrbit() {
  const TIPS=['🚗 Metro','💧 Water','👗 Dress','🌡️ Heat','💰 Cash','📸 Photo',
    '🕌 Respect','🚭 Rules','🍷 Alcohol','🕐 Time','🚕 Taxi','🏥 Health',
    '☀️ SPF 50','🌙 Nights','💳 Card','📱 eSIM','🏨 Book','🗺️ Map',
    '🦟 Bugs','💊 Meds','✈️ Visa','🛄 Bag','👟 Shoes','🎭 Shows',
    '🤝 Tips','🌊 Beach','🍽️ Food','💬 WA'];
  const tipsRef=useRef(TIPS.map((tip,i)=>({
    tip, angle:(i/TIPS.length)*Math.PI*2, orbit:1+Math.floor(i/9),
    speed:.0015+Math.random()*.001, size:W=>9+(W>500?2:0),
    ph:Math.random()*Math.PI*2,
  })));
  const ref = useCanvas((ctx, W, H, t) => {
    const tips=tipsRef.current;
    ctx.fillStyle='#020408'; ctx.fillRect(0,0,W,H);
    const cx2=W*.5, cy2=H*.5;
    // Orbit rings
    [1,2,3].forEach(o=>{
      const r=Math.min(W,H)*(o===1?0.2:o===2?0.33:0.44);
      ctx.strokeStyle=`rgba(100,160,255,.05)`; ctx.lineWidth=1; ctx.setLineDash([3,12]);
      ctx.beginPath(); ctx.ellipse(cx2,cy2,r,r*0.55,0,0,Math.PI*2); ctx.stroke(); ctx.setLineDash([]);
    });
    // Center
    ctx.fillStyle='rgba(100,160,255,.1)'; ctx.strokeStyle='rgba(100,160,255,.25)'; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.arc(cx2,cy2,28,0,Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.font=`700 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(100,160,255,.85)'; ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('28',cx2,cy2-5); ctx.fillText('TIPS',cx2,cy2+7); ctx.textBaseline='alphabetic';
    // Tips
    tips.forEach((tip,i)=>{
      tip.angle+=tip.speed;
      const orbitR=Math.min(W,H)*(tip.orbit===1? 0.2:tip.orbit===2? 0.33:.44);
      const tx=cx2+Math.cos(tip.angle)*orbitR;
      const ty=cy2+Math.sin(tip.angle)*orbitR*.55;
      const alpha=.5+.4*Math.sin(t*1.2+tip.ph);
      ctx.save(); ctx.globalAlpha=alpha;
      const tw=ctx.measureText(tip.tip).width+12;
      ctx.fillStyle='rgba(15,25,50,.85)'; ctx.strokeStyle='rgba(100,160,255,.25)'; ctx.lineWidth=.8;
      if(ctx.roundRect){ctx.beginPath();ctx.roundRect(tx-tw/2,ty-9,tw,17,8);ctx.fill();ctx.stroke();}
      ctx.font=`500 ${W>500?9:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(180,210,255,.8)'; ctx.textAlign='center';
      ctx.fillText(tip.tip,tx,ty+3);
      ctx.restore();
    });
    ctx.font=`600 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(100,160,255,.35)'; ctx.textAlign='center'; ctx.textBaseline='alphabetic';
    ctx.fillText('28 ESSENTIAL DUBAI TRAVEL TIPS — ORBITING KNOWLEDGE',W*.5,H*.06);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="28 Dubai travel tips orbiting like satellites showing metro, dress code, water, heat, taxi and other essential advice" />;
}

// ── 10. HONEST SCALE — pros and cons balance ──────────────────
export function BlogAnim_HonestScale() {
  const PROS=['🌟 World-class','🏜️ Unique desert','🛍️ Tax-free shopping','🌡️ Sunny year-round','✈️ Global hub','🍽️ Food scene','🏙️ Modern infra','🎭 Entertainment'];
  const CONS=['💰 Can be pricey','🌞 Summer heat','🚗 Car-dependent','🏢 Very commercial','🌵 Little nature','📏 Strict rules','🏗️ Always building','🕐 Far from Europe'];
  const ref = useCanvas((ctx, W, H, t) => {
    ctx.fillStyle='#030408'; ctx.fillRect(0,0,W,H);
    // Fulcrum
    const fx=W*.5, fy=H*.72;
    ctx.fillStyle='rgba(255,255,255,.15)'; ctx.beginPath(); ctx.moveTo(fx-20,fy); ctx.lineTo(fx+20,fy); ctx.lineTo(fx,fy-20); ctx.closePath(); ctx.fill();
    ctx.strokeStyle='rgba(255,255,255,.2)'; ctx.lineWidth=1; ctx.stroke();
    ctx.fillRect(fx-30,fy,60,8);
    // Beam
    const tilt=Math.sin(t*.6)*.06;
    ctx.save(); ctx.translate(fx,fy-18); ctx.rotate(tilt);
    ctx.strokeStyle='rgba(255,255,255,.3)'; ctx.lineWidth=3; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(-W*.33,0); ctx.lineTo(W*.33,0); ctx.stroke();
    // Left pan (pros)
    const lx=-W*.33, panY=H*.12+Math.sin(tilt)*W*.33;
    ctx.strokeStyle='rgba(0,200,100,.4)'; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(lx,0); ctx.lineTo(lx,panY); ctx.stroke();
    ctx.fillStyle='rgba(0,200,100,.1)'; ctx.strokeStyle='rgba(0,200,100,.3)'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.ellipse(lx,panY,W*.12,H*.05,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
    // Right pan (cons)
    const rx=W*.33, panY2=H*.12-Math.sin(tilt)*W*.33;
    ctx.strokeStyle='rgba(200,60,60,.4)'; ctx.lineWidth=1.5;
    ctx.beginPath(); ctx.moveTo(rx,0); ctx.lineTo(rx,panY2); ctx.stroke();
    ctx.fillStyle='rgba(200,60,60,.1)'; ctx.strokeStyle='rgba(200,60,60,.3)'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.ellipse(rx,panY2,W*.12,H*.05,0,0,Math.PI*2); ctx.fill(); ctx.stroke();
    ctx.restore();

    // Pro items
    PROS.forEach((p,i)=>{
      const iy=H*.08+i*H*.1; const alpha=.4+.4*Math.sin(t*.8+i);
      ctx.font=`500 ${W>500?10:8}px Outfit,sans-serif`; ctx.fillStyle=`rgba(0,220,100,${alpha})`; ctx.textAlign='right';
      ctx.fillText(p,W*.38,iy);
    });
    // Con items
    CONS.forEach((c,i)=>{
      const iy=H*.08+i*H*.1; const alpha=.4+.4*Math.sin(t*.8+i+1);
      ctx.font=`500 ${W>500?10:8}px Outfit,sans-serif`; ctx.fillStyle=`rgba(200,100,100,${alpha})`; ctx.textAlign='left';
      ctx.fillText(c,W*.62,iy);
    });
    ctx.font=`700 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(0,200,100,.6)'; ctx.textAlign='right'; ctx.fillText('PROS',W*.46,H*.04);
    ctx.fillStyle='rgba(200,100,100,.6)'; ctx.textAlign='left'; ctx.fillText('CONS',W*.54,H*.04);
    ctx.font=`600 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.2)'; ctx.textAlign='center'; ctx.fillText('IS DUBAI WORTH VISITING? — HONEST ASSESSMENT',W*.5,H*.96);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Balance scale showing Dubai pros versus cons with world class attractions, desert and shopping on one side and cost and heat on the other" />;
}

// ── 11. BUDGET GAUGE GRID ─────────────────────────────────────
export function BlogAnim_BudgetGaugeGrid() {
  const ITEMS=[
    {label:'Metro ride',cost:5,max:50,free:false},{label:'Jumeirah Beach',cost:0,max:50,free:true},
    {label:'Desert Safari',cost:150,max:200,free:false},{label:'Dubai Fountain',cost:0,max:50,free:true},
    {label:'Burj Khalifa top',cost:160,max:200,free:false},{label:'Gold Souk browse',cost:0,max:50,free:true},
    {label:'Dhow Cruise',cost:120,max:200,free:false},{label:'Creek Abra',cost:1,max:50,free:false},
  ];
  const ref = useCanvas((ctx, W, H, t) => {
    ctx.fillStyle='#020406'; ctx.fillRect(0,0,W,H);
    const cols=4, rows=2, pad=W*.02, itemW=(W-pad*2)/cols, itemH=(H*.84)/rows, topY=H*.12;

    ctx.font=`600 ${W>500?12:10}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.35)'; ctx.textAlign='center';
    ctx.fillText('FREE VS PAID — WHAT DUBAI ACTUALLY COSTS (AED)',W*.5,H*.07);

    ITEMS.forEach((item,i)=>{
      const col=i%cols, row=Math.floor(i/cols);
      const ix=pad+col*itemW+itemW*.1, iy=topY+row*itemH+itemH*.08;
      const iw=itemW*.8, ih=itemH*.75;
      const revP=Math.min(1,Math.max(0,(t*.5-i*.2)));

      ctx.fillStyle=item.free?'rgba(0,200,100,.07)':'rgba(245,158,11,.07)';
      ctx.strokeStyle=item.free?'rgba(0,200,100,.2)':'rgba(245,158,11,.2)'; ctx.lineWidth=.8;
      if(ctx.roundRect){ctx.beginPath();ctx.roundRect(ix,iy,iw,ih,10);ctx.fill();ctx.stroke();}

      ctx.font=`600 ${W>500?10:8}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.65)'; ctx.textAlign='center';
      ctx.fillText(item.label,ix+iw*.5,iy+ih*.22);

      if(item.free){
        ctx.font=`800 ${W>500?16:13}px Outfit,sans-serif`; ctx.fillStyle='rgba(0,220,100,.85)';
        ctx.fillText('FREE ✓',ix+iw*.5,iy+ih*.6);
      } else {
        // Cost gauge
        const gx=ix+iw*.1, gy=iy+ih*.55, gw=iw*.8, gh=8;
        ctx.fillStyle='rgba(255,255,255,.08)'; ctx.fillRect(gx,gy,gw,gh);
        const fillW=gw*(item.cost/item.max)*revP;
        ctx.fillStyle=`rgba(245,158,11,.6)`;
        if(ctx.roundRect){ctx.beginPath();ctx.roundRect(gx,gy,fillW,gh,4);ctx.fill();}
        ctx.font=`700 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(245,158,11,.85)'; ctx.textAlign='center';
        ctx.fillText(`AED ${item.cost}`,ix+iw*.5,iy+ih*.8);
      }
    });
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Budget comparison grid showing Dubai activities as free or paid with cost gauges for metro, desert safari, Burj Khalifa and dhow cruise" />;
}

// ── 12. FOOD GALAXY — Emirati dishes constellation ─────────────
export function BlogAnim_FoodGalaxy() {
  const DISHES=[
    {e:'🍖',n:'Machboos'},{e:'🥙',n:'Shawarma'},{e:'🧆',n:'Falafel'},
    {e:'🥗',n:'Fattoush'},{e:'🍞',n:'Khubz'},{e:'🫕',n:'Harees'},
    {e:'🍮',n:'Luqaimat'},{e:'🍰',n:'Umm Ali'},{e:'🫖',n:'Karak Tea'},
    {e:'🍢',n:'Kofta'},{e:'🧄',n:'Moutabel'},{e:'🐟',n:'Hammour'},
    {e:'🍚',n:'Jisheed'},{e:'🍬',n:'Chebab'},{e:'☕',n:'Qahwa'},
    {e:'🥜',n:'Lgeimat'},{e:'🍯',n:'Date Syrup'},{e:'🫙',n:'Labneh'},
  ];
  const dishRef=useRef(DISHES.map((d,i)=>({
    ...d, x:.05+Math.random()*.9, y:.08+Math.random()*.84,
    vx:(Math.random()-.5)*.0003, vy:(Math.random()-.5)*.0003,
    ph:Math.random()*Math.PI*2, size:16+Math.random()*12,
  })));
  const ref = useCanvas((ctx, W, H, t) => {
    const dishes=dishRef.current;
    ctx.fillStyle='#030208'; ctx.fillRect(0,0,W,H);
    const bg=ctx.createRadialGradient(W*.5,H*.5,0,W*.5,H*.5,W*.5);
    bg.addColorStop(0,'rgba(200,120,30,.06)'); bg.addColorStop(1,'transparent');
    ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);
    // Connect nearby dishes
    for(let i=0;i<dishes.length;i++) for(let j=i+1;j<dishes.length;j++){
      const dx=(dishes[i].x-dishes[j].x)*W, dy=(dishes[i].y-dishes[j].y)*H;
      const dist=Math.sqrt(dx*dx+dy*dy);
      if(dist<110){ctx.strokeStyle=`rgba(200,140,50,${(1-dist/110)*.08})`;ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(dishes[i].x*W,dishes[i].y*H);ctx.lineTo(dishes[j].x*W,dishes[j].y*H);ctx.stroke();}
    }
    dishes.forEach(d=>{
      d.x+=d.vx; d.y+=d.vy; d.ph+=.016;
      if(d.x<.03)d.vx=Math.abs(d.vx); if(d.x>.97)d.vx=-Math.abs(d.vx);
      if(d.y<.04)d.vy=Math.abs(d.vy); if(d.y>.94)d.vy=-Math.abs(d.vy);
      const px=d.x*W, py=d.y*H+Math.sin(d.ph)*5;
      const alpha=.5+.45*Math.sin(d.ph);
      const pg=ctx.createRadialGradient(px,py,0,px,py,d.size*1.4);
      pg.addColorStop(0,'rgba(200,140,50,.1)'); pg.addColorStop(1,'transparent');
      ctx.fillStyle=pg; ctx.beginPath(); ctx.arc(px,py,d.size*1.4,0,Math.PI*2); ctx.fill();
      ctx.save(); ctx.globalAlpha=alpha;
      ctx.font=`${d.size}px serif`; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(d.e,px,py);
      if(W>500){ctx.font=`500 9px Outfit,sans-serif`;ctx.fillStyle=`rgba(255,200,80,${alpha*.6})`;ctx.textBaseline='alphabetic';ctx.fillText(d.n,px,py+d.size*.8);}
      ctx.restore();
    });
    ctx.font=`600 ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(200,140,50,.4)';
    ctx.textAlign='center'; ctx.textBaseline='alphabetic'; ctx.fillText('18 DISHES EVERY DUBAI VISITOR MUST TRY',W*.5,H*.05);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="Constellation of 18 Emirati and Arabic dishes floating and connecting including Machboos, Shawarma, Umm Ali and Karak Tea" />;
}

// ── 13. DECEMBER LIGHTS — calendar with events ─────────────────
export function BlogAnim_DecemberLights() {
  const EVENTS=[
    {day:1,label:'Dubai Marathon',color:'rgba(100,200,100'},{day:5,label:'National Day',color:'rgba(200,50,50'},
    {day:10,label:'Winter Festival',color:'rgba(100,180,255'},{day:17,label:'DSF Starts',color:'rgba(245,158,11'},
    {day:21,label:'Coldest night',color:'rgba(150,100,255'},{day:24,label:'Christmas Eve',color:'rgba(200,50,50'},
    {day:25,label:'Christmas',color:'rgba(200,50,50'},{day:31,label:'NYE Fireworks',color:'rgba(255,215,0'},
  ];
  const snowRef=useRef(Array.from({length:40},()=>({x:Math.random(),y:Math.random(),vy:.0008+Math.random()*.0015,vx:(Math.random()-.5)*.0005,size:1.5+Math.random()*3,a:.3+Math.random()*.5})));
  const ref = useCanvas((ctx, W, H, t) => {
    const snow=snowRef.current;
    // Deep winter night sky
    ctx.fillStyle='#010310'; ctx.fillRect(0,0,W,H);
    const sky=ctx.createLinearGradient(0,0,0,H); sky.addColorStop(0,'#010310'); sky.addColorStop(1,'#030520');
    ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
    // Stars
    for(let i=0;i<80;i++){ctx.fillStyle=`rgba(255,255,255,${.08+Math.sin(t*1.2+i)*.06})`;ctx.beginPath();ctx.arc((i*173)%W,(i*89)%(H*.5),.7+(i%3)*.3,0,Math.PI*2);ctx.fill();}
    // Snow particles
    snow.forEach(s=>{s.y+=s.vy;s.x+=s.vx+Math.sin(t*1.5+s.x*10)*.0003;if(s.y>1)s.y=0;if(s.x<0)s.x=1;if(s.x>1)s.x=0;ctx.fillStyle=`rgba(200,220,255,${s.a})`;ctx.beginPath();ctx.arc(s.x*W,s.y*H,s.size,0,Math.PI*2);ctx.fill();});
    // Calendar grid — December
    const cols=7, rows=5, startX=W*.05, startY=H*.18, cellW=(W*.9)/cols, cellH=(H*.72)/rows;
    const dayNames=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    dayNames.forEach((d,i)=>{ctx.font=`600 ${W>500?10:8}px Outfit,sans-serif`;ctx.fillStyle='rgba(255,255,255,.35)';ctx.textAlign='center';ctx.fillText(d,startX+i*cellW+cellW*.5,startY-6);});
    // Dec 1 2026 = Tuesday (index 2)
    const startOffset=2;
    for(let day=1;day<=31;day++){
      const cellIdx=day-1+startOffset;
      const col=cellIdx%7, row=Math.floor(cellIdx/7);
      const cx2=startX+col*cellW+cellW*.5, cy2=startY+row*cellH+cellH*.5;
      const event=EVENTS.find(e=>e.day===day);
      ctx.fillStyle=event?`${event.color},.15)`:'rgba(255,255,255,.04)';
      ctx.strokeStyle=event?`${event.color},.4)`:'rgba(255,255,255,.08)'; ctx.lineWidth=event?1.5:.5;
      if(ctx.roundRect){ctx.beginPath();ctx.roundRect(startX+col*cellW+2,startY+row*cellH+2,cellW-4,cellH-4,6);ctx.fill();ctx.stroke();}
      ctx.font=`${event?'700':'400'} ${W>500?11:9}px Outfit,sans-serif`; ctx.fillStyle=event?`${event.color},.9)`:'rgba(255,255,255,.45)';
      ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(day,cx2,cy2-(event?5:0));
      if(event&&W>400){ctx.font=`500 ${W>500?7:6}px Outfit,sans-serif`;ctx.fillStyle=`${event.color},.7)`;ctx.fillText(event.label.slice(0,8),cx2,cy2+7);}
    }
    ctx.textBaseline='alphabetic';
    // Header
    ctx.font=`700 ${W>500?14:12}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,215,0,.8)'; ctx.textAlign='center';
    ctx.fillText('DECEMBER 2026',W*.5,H*.12);
    ctx.font=`400 ${W>500?10:9}px Outfit,sans-serif`; ctx.fillStyle='rgba(255,255,255,.35)';
    ctx.fillText('🌡️ 24°C avg · 0% rain chance · Peak season',W*.5,H*.97);
  });
  return <canvas ref={ref} style={{width:'100%',height:'100%',display:'block'}} aria-label="December 2026 calendar showing Dubai events including National Day, Dubai Marathon, Winter Festival and New Years Eve fireworks with snow effect" />;
}
