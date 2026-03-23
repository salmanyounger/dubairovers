'use client';
import { useEffect, useRef, useState } from 'react';

function lerp(a,b,t){return a+(b-a)*t;}

// ════════════════════════════════════════════════════════
//  TOUR 1 — DESERT SAFARI  (orange/amber)
//  Journey: Pickup → Dune Bashing → Camel+Sandboard → Sunset → Camp+Fire+Dancers → BBQ+Stars
// ════════════════════════════════════════════════════════
function drawDesertSafari(ctx,W,H,step,t){
  // Sky palette per step
  const skies=[
    ['#87CEEB','#b0e0ff','#f5c842'],   // 0 afternoon city
    ['#1a0a00','#c1440e','#f5a623'],   // 1 dune bashing sunset start
    ['#ff6b00','#f5a623','#ffd700'],   // 2 camel+sandboard golden
    ['#ff4500','#ff8c00','#ffd700'],   // 3 sunset magic
    ['#000008','#0a0a22','#1a0a00'],   // 4 night camp
    ['#000008','#000010','#050520'],   // 5 BBQ+stars
  ];
  const si=Math.min(step,skies.length-1);
  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,skies[si][0]);sky.addColorStop(0.5,skies[si][1]);sky.addColorStop(1,skies[si][2]);
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);

  // Stars (night scenes)
  if(step>=4){
    for(let i=0;i<180;i++){
      const tw=0.2+0.8*Math.abs(Math.sin(t*1.2+i*0.4));
      ctx.beginPath();ctx.arc((i*173.3)%W,(i*97.7)%(H*0.55),i%5===0?1.6:0.6,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,255,255,${tw})`;ctx.fill();
    }
  }

  // Sun
  if(step<=3){
    const positions=[[W*0.8,H*0.18],[W*0.72,H*0.22],[W*0.62,H*0.28],[W*0.5,H*0.38]];
    const [sx,sy]=positions[si];
    const sg=ctx.createRadialGradient(sx,sy,0,sx,sy,50);
    sg.addColorStop(0,'rgba(255,255,200,1)');sg.addColorStop(0.4,'rgba(255,200,50,0.8)');
    sg.addColorStop(1,'transparent');
    ctx.fillStyle=sg;ctx.beginPath();ctx.arc(sx,sy,50,0,Math.PI*2);ctx.fill();
    // sunset rays step 3
    if(step===3){
      for(let i=0;i<14;i++){
        const a=(i/14)*Math.PI*2+t*0.15;
        ctx.strokeStyle=`rgba(255,160,30,${0.07+Math.sin(t+i)*0.03})`;ctx.lineWidth=12;
        ctx.beginPath();ctx.moveTo(sx,sy);ctx.lineTo(sx+Math.cos(a)*90,sy+Math.sin(a)*90);ctx.stroke();
      }
    }
  }
  // Moon step 4+
  if(step>=4){
    const mg=ctx.createRadialGradient(W*0.8,H*0.12,0,W*0.8,H*0.12,28);
    mg.addColorStop(0,'#fffde7');mg.addColorStop(0.5,'rgba(255,253,231,0.4)');mg.addColorStop(1,'transparent');
    ctx.fillStyle=mg;ctx.beginPath();ctx.arc(W*0.8,H*0.12,28,0,Math.PI*2);ctx.fill();
  }

  // Dunes (3 layers)
  [[H*0.70,'#8B6914'],[H*0.78,'#a07820'],[H*0.86,'#c8922a']].forEach(([dy,col],li)=>{
    ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(0,dy);
    ctx.bezierCurveTo(W*0.25,dy-H*0.1*(li+1)*0.3,W*0.6,dy-H*0.08*(li+1)*0.25,W*0.8,dy-H*0.04);
    ctx.bezierCurveTo(W*0.9,dy+H*0.02,W,dy,W,dy);
    ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();ctx.fill();
  });

  // STEP 0 — Hotel + pickup car
  if(step===0){
    // Hotel building
    const hx=W*0.12,hy=H*0.48;
    const hg=ctx.createLinearGradient(hx,hy,hx+55,hy+80);
    hg.addColorStop(0,'#1e4a6b');hg.addColorStop(1,'#0d2535');
    ctx.fillStyle=hg;if(ctx.roundRect)ctx.beginPath(),ctx.roundRect(hx,hy,55,80,[3,3,0,0]),ctx.fill();else ctx.fillRect(hx,hy,55,80);
    for(let r=0;r<4;r++)for(let c=0;c<3;c++){
      const lit=Math.sin(t*0.5+r*3+c)>-0.4;
      ctx.fillStyle=lit?'rgba(255,220,100,0.5)':'rgba(100,140,255,0.06)';
      ctx.fillRect(hx+5+c*14,hy+14+r*16,10,11);
    }
    ctx.fillStyle='#ffd700';ctx.font='bold 7px sans-serif';ctx.textAlign='center';ctx.fillText('HOTEL',hx+27,hy+9);
    // SUV pickup car
    const cx=W*0.4,cy=H*0.74;
    const cg=ctx.createLinearGradient(cx-40,cy,cx+40,cy);cg.addColorStop(0,'#d4a017');cg.addColorStop(1,'#8B6914');
    ctx.fillStyle=cg;if(ctx.roundRect)ctx.beginPath(),ctx.roundRect(cx-40,cy-8,80,16,[3]),ctx.fill();else ctx.fillRect(cx-40,cy-8,80,16);
    ctx.fillStyle='#a07820';ctx.beginPath();ctx.moveTo(cx-30,cy-8);ctx.lineTo(cx-20,cy-24);ctx.lineTo(cx+28,cy-24);ctx.lineTo(cx+36,cy-8);ctx.closePath();ctx.fill();
    ctx.fillStyle='rgba(135,206,235,0.7)';ctx.fillRect(cx-18,cy-22,16,13);ctx.fillRect(cx+2,cy-22,16,13);
    [[-28,8],[28,8]].forEach(([wx,wy])=>{ctx.beginPath();ctx.arc(cx+wx,cy+wy,11,0,Math.PI*2);ctx.fillStyle='#1a1a1a';ctx.fill();ctx.beginPath();ctx.arc(cx+wx,cy+wy,5,0,Math.PI*2);ctx.fillStyle='#555';ctx.fill();});
    ctx.fillStyle='#ffd700';ctx.font='bold 7px sans-serif';ctx.textAlign='center';ctx.fillText('ROVERS',cx,cy+4);
    ctx.beginPath();ctx.arc(cx+42,cy-3,4,0,Math.PI*2);ctx.fillStyle='#ffd700';ctx.fill();
  }

  // STEP 1 — Dune bashing
  if(step===1){
    const car4x4X=W*0.52+Math.sin(t*2)*8,car4x4Y=H*0.63+Math.sin(t*3)*5;
    // Dust cloud
    for(let i=0;i<25;i++){const px=car4x4X-50-i*11+Math.sin(t*3+i)*8,py=car4x4Y+5+Math.cos(t*2+i)*10;ctx.beginPath();ctx.arc(px,py,5-i*0.15,0,Math.PI*2);ctx.fillStyle=`rgba(200,146,42,${0.35-i*0.012})`;ctx.fill();}
    // 4x4
    ctx.save();ctx.translate(car4x4X,car4x4Y);ctx.rotate(Math.sin(t*2)*0.08);
    const dg=ctx.createLinearGradient(-42,0,42,0);dg.addColorStop(0,'#8B6914');dg.addColorStop(1,'#5a4510');
    ctx.fillStyle=dg;if(ctx.roundRect)ctx.beginPath(),ctx.roundRect(-42,-2,84,15,[3]),ctx.fill();else ctx.fillRect(-42,-2,84,15);
    ctx.fillStyle='#a07820';ctx.beginPath();ctx.moveTo(-30,-2);ctx.lineTo(-22,-22);ctx.lineTo(28,-22);ctx.lineTo(36,-2);ctx.closePath();ctx.fill();
    ctx.fillStyle='rgba(135,206,235,0.7)';ctx.fillRect(-20,-20,16,14);ctx.fillRect(2,-20,16,14);
    [[-30,12],[30,12]].forEach(([wx,wy])=>{ctx.beginPath();ctx.arc(wx,wy+Math.sin(t*8)*3,12,0,Math.PI*2);ctx.fillStyle='#1a1a1a';ctx.fill();ctx.beginPath();ctx.arc(wx,wy+Math.sin(t*8)*3,5,0,Math.PI*2);ctx.fillStyle='#555';ctx.fill();});
    ctx.restore();
    ctx.fillStyle='rgba(255,107,43,0.95)';ctx.font=`bold ${W>500?15:11}px sans-serif`;ctx.textAlign='center';ctx.fillText('🚙 DUNE BASHING!',W*0.5,H*0.2);
  }

  // STEP 2 — Camel + sandboarding
  if(step===2){
    // Camel
    const cbob=Math.sin(t*1.5)*2;
    ctx.save();ctx.translate(W*0.3,H*0.62+cbob);
    ctx.strokeStyle='#b8850a';ctx.lineWidth=4;
    [[-18,0],[-10,4],[10,0],[18,4]].forEach(([lx,lo])=>{ctx.beginPath();ctx.moveTo(lx,lo);ctx.lineTo(lx,24);ctx.stroke();});
    const bg2=ctx.createRadialGradient(0,0,4,0,0,22);bg2.addColorStop(0,'#d4a017');bg2.addColorStop(1,'#8B6914');
    ctx.fillStyle=bg2;ctx.beginPath();ctx.ellipse(0,0,23,15,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#c8922a';ctx.beginPath();ctx.ellipse(-5,-13,10,8,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#c8922a';ctx.beginPath();ctx.moveTo(17,-5);ctx.quadraticCurveTo(27,-20,24,-29);ctx.quadraticCurveTo(21,-21,14,-8);ctx.fill();
    ctx.fillStyle='#d4a017';ctx.beginPath();ctx.ellipse(23,-32,8,6,0.3,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.arc(27,-34,2,0,Math.PI*2);ctx.fillStyle='#333';ctx.fill();
    ctx.restore();
    // Sandboarder
    const sbX=W*0.62,sbY=H*0.64+Math.sin(t*5)*4;
    ctx.save();ctx.translate(sbX,sbY);ctx.rotate(-0.35);
    ctx.fillStyle='#FF6B35';ctx.fillRect(-14,-3,28,6);
    ctx.fillStyle='#FFD700';ctx.beginPath();ctx.arc(0,-10,7,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#FF6B35';ctx.fillRect(-5,-10,10,14);
    ctx.strokeStyle='#333';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-5,4);ctx.lineTo(-12,16);ctx.stroke();ctx.beginPath();ctx.moveTo(5,4);ctx.lineTo(12,16);ctx.stroke();
    // board dust
    for(let i=0;i<8;i++){ctx.beginPath();ctx.arc(-18-i*7,8+Math.sin(i)*4,3-i*0.2,0,Math.PI*2);ctx.fillStyle=`rgba(200,146,42,${0.3-i*0.03})`;ctx.fill();}
    ctx.restore();
    ctx.fillStyle='rgba(255,200,50,0.9)';ctx.font=`bold ${W>500?13:10}px sans-serif`;ctx.textAlign='center';ctx.fillText('🐪 CAMELS & 🏄 SANDBOARDING',W*0.5,H*0.18);
  }

  // STEP 3 — Sunset photography
  if(step===3){
    // Photographer silhouette
    ctx.fillStyle='rgba(0,0,0,0.8)';
    ctx.fillRect(W*0.45-6,H*0.62,12,20);ctx.beginPath();ctx.arc(W*0.45,H*0.58,9,0,Math.PI*2);ctx.fill();
    ctx.fillRect(W*0.45-14,H*0.64,10,3);ctx.fillRect(W*0.45+4,H*0.64,10,3);
    // Camera
    ctx.fillStyle='#333';ctx.fillRect(W*0.45+9,H*0.61,14,9);ctx.beginPath();ctx.arc(W*0.45+16,H*0.63,4,0,Math.PI*2);ctx.fillStyle='rgba(100,180,255,0.8)';ctx.fill();
    // Flash
    if(Math.sin(t*2)>0.7){ctx.fillStyle='rgba(255,255,255,0.6)';ctx.beginPath();ctx.arc(W*0.45+16,H*0.63,20,0,Math.PI*2);ctx.fill();}
    ctx.fillStyle='rgba(255,200,50,0.9)';ctx.font=`bold ${W>500?13:10}px sans-serif`;ctx.textAlign='center';ctx.fillText('📸 GOLDEN HOUR PHOTOGRAPHY',W*0.5,H*0.18);
  }

  // STEP 4+5 — Bedouin camp, fire, dancers, BBQ
  if(step>=4){
    // Tent
    const tx=W*0.62,ty=H*0.58;
    ctx.fillStyle='#8B0000';ctx.beginPath();ctx.moveTo(tx,ty-50);ctx.lineTo(tx-46,ty);ctx.lineTo(tx+46,ty);ctx.closePath();ctx.fill();
    ctx.fillStyle='#cc3300';ctx.beginPath();ctx.moveTo(tx,ty-50);ctx.lineTo(tx,ty);ctx.lineTo(tx+46,ty);ctx.closePath();ctx.fill();
    ctx.fillStyle='#1a0000';if(ctx.roundRect)ctx.beginPath(),ctx.roundRect(tx-12,ty-22,24,22,12),ctx.fill();else ctx.fillRect(tx-12,ty-22,24,22);
    // Campfire
    const fx=W*0.35,fy=H*0.64;
    [[16,'#ff8c00',0],[12,'#ff4400',0.5],[8,'#ffdd00',1]].forEach(([sz,col,off])=>{
      const fl=Math.sin(t*8+off)*3;
      const fg2=ctx.createRadialGradient(fx,fy,0,fx,fy,sz+fl);fg2.addColorStop(0,col);fg2.addColorStop(1,'transparent');
      ctx.fillStyle=fg2;ctx.beginPath();ctx.arc(fx,fy,sz+fl,0,Math.PI*2);ctx.fill();
    });
    for(let i=0;i<5;i++){const sx2=fx+Math.sin(t*3+i*1.2)*7,sy2=fy-14-((t*28+i*11)%24);ctx.beginPath();ctx.arc(sx2,sy2,1.5,0,Math.PI*2);ctx.fillStyle=`rgba(255,220,50,${0.8-((t*28+i*11)%24)/30})`;ctx.fill();}
    // Tanoura dancer (spinning skirt)
    ctx.save();ctx.translate(W*0.48,H*0.65);ctx.save();ctx.rotate(t*5);
    for(let i=0;i<12;i++){const a1=(i/12)*Math.PI*2,a2=((i+1)/12)*Math.PI*2;ctx.fillStyle=['#FF6B2B','#FFD700','#FF4444','#FF88AA'][i%4];ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,33,a1,a2);ctx.closePath();ctx.fill();}
    ctx.restore();ctx.fillStyle='#FF8C55';ctx.beginPath();ctx.ellipse(0,-20,6,10,0,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(0,-32,7,0,Math.PI*2);ctx.fill();ctx.restore();
    if(step===4){ctx.fillStyle='rgba(255,107,43,0.9)';ctx.font=`bold ${W>500?13:10}px sans-serif`;ctx.textAlign='center';ctx.fillText('🔥 BEDOUIN CAMP & LIVE SHOWS',W*0.5,H*0.12);}
    if(step>=5){
      // BBQ
      ctx.fillStyle='#333';ctx.beginPath();ctx.ellipse(W*0.2,H*0.67,20,7,0,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='rgba(255,100,0,0.6)';ctx.lineWidth=2;for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(W*0.2-17,H*0.67+i*2);ctx.lineTo(W*0.2+17,H*0.67+i*2);ctx.stroke();}
      ctx.fillStyle='rgba(255,160,0,0.9)';ctx.font='bold 10px sans-serif';ctx.textAlign='center';ctx.fillText('🍖 BBQ DINNER',W*0.2,H*0.63);
      ctx.fillStyle='rgba(255,107,43,0.9)';ctx.font=`bold ${W>500?13:10}px sans-serif`;ctx.textAlign='center';ctx.fillText('🌙 STARGAZING BBQ & NIGHT SKY',W*0.5,H*0.12);
    }
  }

  // Label badge
  const labels=['🏨 Hotel Pickup','🚙 Dune Bashing','🐪 Camels & Sandboard','🌅 Sunset Photos','🔥 Bedouin Camp','🌙 BBQ & Stars'];
  const lbl=labels[Math.min(step,labels.length-1)];
  ctx.font=`bold ${W>500?11:9}px sans-serif`;const lw=ctx.measureText(lbl).width+22;
  ctx.fillStyle='rgba(0,0,0,0.5)';if(ctx.roundRect)ctx.beginPath(),ctx.roundRect(W-lw-8,8,lw,24,12),ctx.fill();else ctx.fillRect(W-lw-8,8,lw,24);
  ctx.fillStyle='rgba(255,255,255,0.92)';ctx.textAlign='right';ctx.fillText(lbl,W-19,24);
}

// ════════════════════════════════════════════════════════
//  TOUR 2 — QUAD BIKE  (red/crimson)
//  Journey: Safety gear → Red dunes ride → Speed jumps → Sandboarding
// ════════════════════════════════════════════════════════
function drawQuadBike(ctx,W,H,step,t){
  const skies=[['#87CEEB','#cce8f5','#f0d080'],['#c1440e','#f57c22','#ffc060'],['#a03010','#e05020','#ff8c00'],['#ff6b00','#ffa040','#ffd060']];
  const si=Math.min(step,3);
  const sky=ctx.createLinearGradient(0,0,0,H);sky.addColorStop(0,skies[si][0]);sky.addColorStop(0.5,skies[si][1]);sky.addColorStop(1,skies[si][2]);
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);

  // Red dunes
  [[H*0.68,'#8B2020'],[H*0.76,'#a03030'],[H*0.84,'#c04040']].forEach(([dy,col])=>{
    ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(0,dy);
    ctx.bezierCurveTo(W*0.3,dy-H*0.12,W*0.55,dy-H*0.08,W*0.75,dy-H*0.05);
    ctx.bezierCurveTo(W*0.88,dy-H*0.02,W,dy+H*0.03,W,dy);
    ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();ctx.fill();
  });

  // Sun
  const sx=W*0.75,sy=H*0.2;
  const sg=ctx.createRadialGradient(sx,sy,0,sx,sy,45);sg.addColorStop(0,'rgba(255,200,50,1)');sg.addColorStop(0.5,'rgba(255,120,20,0.5)');sg.addColorStop(1,'transparent');
  ctx.fillStyle=sg;ctx.beginPath();ctx.arc(sx,sy,45,0,Math.PI*2);ctx.fill();

  // STEP 0 — Safety briefing, gear
  if(step===0){
    // Helmet display
    const hx=W*0.38,hy=H*0.5;
    ctx.fillStyle='#CC0000';ctx.beginPath();ctx.ellipse(hx,hy,32,28,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='rgba(150,210,255,0.8)';ctx.beginPath();ctx.ellipse(hx+4,hy+2,22,14,-0.3,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle='rgba(0,0,0,0.4)';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(hx,hy,32,28,0,0,Math.PI*2);ctx.stroke();
    ctx.strokeStyle='#FFD700';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(hx-35,hy+5);ctx.lineTo(hx+35,hy+5);ctx.stroke();
    // Goggles
    const gx=W*0.55,gy=H*0.48;
    ctx.fillStyle='#222';ctx.beginPath();ctx.ellipse(gx-10,gy,12,10,0,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.ellipse(gx+10,gy,12,10,0,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle='#555';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(gx-2,gy);ctx.lineTo(gx+2,gy);ctx.stroke();
    ctx.fillStyle='rgba(100,180,255,0.6)';ctx.beginPath();ctx.ellipse(gx-10,gy,9,7,0,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.ellipse(gx+10,gy,9,7,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='rgba(255,200,50,0.9)';ctx.font=`bold ${W>500?13:10}px sans-serif`;ctx.textAlign='center';ctx.fillText('🦺 SAFETY BRIEFING & GEAR UP',W*0.5,H*0.2);
  }

  // Quad bike draw helper
  function drawQuad(x,y,sc,color){
    ctx.save();ctx.translate(x,y);ctx.scale(sc,sc);
    [[-20,12],[20,12]].forEach(([wx,wy])=>{ctx.beginPath();ctx.arc(wx,wy,14,0,Math.PI*2);ctx.fillStyle='#222';ctx.fill();ctx.beginPath();ctx.arc(wx,wy,7,0,Math.PI*2);ctx.fillStyle='#555';ctx.fill();});
    ctx.fillStyle=color;if(ctx.roundRect)ctx.beginPath(),ctx.roundRect(-18,-5,36,14,[4]),ctx.fill();else ctx.fillRect(-18,-5,36,14);
    ctx.strokeStyle='#333';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(14,-5);ctx.lineTo(14,-18);ctx.lineTo(26,-18);ctx.stroke();
    ctx.fillStyle='#FF8C55';ctx.beginPath();ctx.arc(4,-18,8,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#ffd700';ctx.font='bold 6px sans-serif';ctx.textAlign='center';ctx.fillText('ATV',0,5);
    ctx.restore();
  }

  // STEP 1 — Riding
  if(step===1){
    const qx=W*0.5+Math.sin(t*2)*20,qy=H*0.64+Math.sin(t*3)*6;
    drawQuad(qx,qy,1.1,'#CC0000');
    for(let i=0;i<10;i++){ctx.beginPath();ctx.arc(qx-50-i*10+Math.sin(t*3+i)*8,qy+8+Math.random()*8,4-i*0.3,0,Math.PI*2);ctx.fillStyle=`rgba(160,48,48,${0.4-i*0.035})`;ctx.fill();}
    ctx.fillStyle='rgba(255,50,50,0.95)';ctx.font=`bold ${W>500?15:11}px sans-serif`;ctx.textAlign='center';ctx.fillText('⚡ FULL THROTTLE ON RED DUNES!',W*0.5,H*0.18);
  }

  // STEP 2 — Big jump/speed
  if(step===2){
    // Two quads racing
    const q1x=((t*80)%(W+200))-80,q1y=H*0.62;
    const q2x=((t*60+W*0.4)%(W+200))-80,q2y=H*0.68;
    drawQuad(q1x,q1y,1.0,'#CC0000');
    drawQuad(q2x,q2y,0.85,'#FF6600');
    for(let i=0;i<8;i++){ctx.beginPath();ctx.arc(q1x-40-i*9,q1y+6+Math.sin(i)*4,3.5-i*0.3,0,Math.PI*2);ctx.fillStyle=`rgba(160,48,48,${0.4-i*0.04})`;ctx.fill();}
    // Speed lines
    for(let i=0;i<8;i++){const lx=W*(0.05+i*0.12),ly=H*0.3+i*22;ctx.strokeStyle=`rgba(255,80,20,${0.3+Math.sin(t*5+i)*0.1})`;ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(lx,ly);ctx.lineTo(lx+40+Math.sin(i)*10,ly+8);ctx.stroke();}
    ctx.fillStyle='rgba(255,50,50,0.95)';ctx.font=`bold ${W>500?14:11}px sans-serif`;ctx.textAlign='center';ctx.fillText('🏁 HEAD-TO-HEAD ON THE DUNES',W*0.5,H*0.18);
  }

  // STEP 3 — Sandboarding
  if(step===3){
    const sbX=W*0.5,sbY=H*0.6+Math.sin(t*4)*5;
    ctx.save();ctx.translate(sbX,sbY);ctx.rotate(-0.4);
    ctx.fillStyle='#CC0000';ctx.fillRect(-18,-3,36,7);
    ctx.fillStyle='#FFD700';ctx.beginPath();ctx.arc(0,-12,8,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#CC0000';ctx.fillRect(-6,-12,12,16);
    ctx.strokeStyle='#333';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-5,4);ctx.lineTo(-14,18);ctx.stroke();ctx.beginPath();ctx.moveTo(5,4);ctx.lineTo(14,18);ctx.stroke();
    for(let i=0;i<10;i++){ctx.beginPath();ctx.arc(-22-i*8,5+Math.sin(i)*5,3-i*0.2,0,Math.PI*2);ctx.fillStyle=`rgba(160,48,48,${0.35-i*0.03})`;ctx.fill();}
    ctx.restore();
    ctx.fillStyle='rgba(255,50,50,0.9)';ctx.font=`bold ${W>500?13:10}px sans-serif`;ctx.textAlign='center';ctx.fillText('🏄 SANDBOARDING THE RED DUNES',W*0.5,H*0.18);
  }

  const labels=['🦺 Safety Briefing','⚡ Quad Bike Ride','🏁 Full Speed Race','🏄 Sandboarding'];
  const lbl=labels[Math.min(step,labels.length-1)];
  ctx.font=`bold ${W>500?11:9}px sans-serif`;const lw=ctx.measureText(lbl).width+22;
  ctx.fillStyle='rgba(100,0,0,0.6)';if(ctx.roundRect)ctx.beginPath(),ctx.roundRect(W-lw-8,8,lw,24,12),ctx.fill();else ctx.fillRect(W-lw-8,8,lw,24);
  ctx.fillStyle='rgba(255,200,200,0.95)';ctx.textAlign='right';ctx.fillText(lbl,W-19,24);
}

// ════════════════════════════════════════════════════════
//  TOUR 3 — DHOW CRUISE  (cyan/navy)
//  Journey: Boarding pier → Sailing Marina → Night skyline → Dinner + Music
// ════════════════════════════════════════════════════════
function drawDhowCruise(ctx,W,H,step,t){
  const skies=[['#ff6b35','#ff9060','#ffcc80'],['#001a40','#002a6b','#0040a0'],['#000820','#001233','#002060'],['#000010','#000820','#001040']];
  const si=Math.min(step,3);
  const sky=ctx.createLinearGradient(0,0,0,H);sky.addColorStop(0,skies[si][0]);sky.addColorStop(0.5,skies[si][1]);sky.addColorStop(1,skies[si][2]);
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);

  // Stars night
  if(step>=1){for(let i=0;i<120;i++){const tw=0.15+0.7*Math.abs(Math.sin(t*1.2+i*0.4));ctx.beginPath();ctx.arc((i*173.3)%W,(i*97.7)%(H*0.55),i%5===0?1.4:0.5,0,Math.PI*2);ctx.fillStyle=`rgba(255,255,255,${tw})`;ctx.fill();}}

  // Water
  const wg=ctx.createLinearGradient(0,H*0.55,0,H);
  wg.addColorStop(0,step===0?'#1a6fa8':step<=2?'#001a40':'#000820');
  wg.addColorStop(1,step===0?'#0d4a7a':'#000510');
  ctx.fillStyle=wg;ctx.fillRect(0,H*0.55,W,H*0.45);
  // Waves
  for(let i=0;i<5;i++){
    ctx.strokeStyle=`rgba(${step===0?'100,200,255':'60,130,200'},${0.2+i*0.06})`;ctx.lineWidth=1.5;ctx.beginPath();
    for(let x=0;x<=W;x+=6){const wy=H*(0.58+i*0.06)+Math.sin(x*0.04+t*2+i)*5;x===0?ctx.moveTo(x,wy):ctx.lineTo(x,wy);}ctx.stroke();
  }

  // Dubai skyline buildings (Marina style)
  const buildings=[[0.02,0.03,0.28,2],[0.06,0.025,0.18,2],[0.09,0.04,0.32,3],[0.14,0.022,0.14,2],[0.17,0.05,0.38,4],[0.23,0.028,0.22,2],[0.27,0.06,0.42,4],[0.62,0.04,0.30,3],[0.67,0.025,0.18,2],[0.70,0.05,0.35,4],[0.76,0.022,0.15,2],[0.79,0.055,0.40,4],[0.85,0.028,0.22,2],[0.88,0.035,0.28,3]];
  buildings.forEach(([xf,wf,hf,cols])=>{
    const bx=W*xf,bw=W*wf,bh=H*hf,by=H*0.55-bh;
    ctx.fillStyle='#0d1a2e';ctx.fillRect(bx,by,bw,bh);
    // Reflection
    if(step>=1){
      const rg=ctx.createLinearGradient(bx,H*0.55,bx,H*0.55+bh*0.5);rg.addColorStop(0,'rgba(13,26,46,0.5)');rg.addColorStop(1,'transparent');
      ctx.fillStyle=rg;ctx.fillRect(bx,H*0.55,bw,bh*0.5);
    }
    // Windows
    const lit=step>=1;
    for(let r=0;r<4;r++)for(let c=0;c<cols;c++){
      const isLit=Math.sin(t*0.3+r*5+c*7+xf*20)>-0.4;
      if(!lit&&!isLit)continue;
      ctx.fillStyle=lit?`rgba(255,220,100,${0.3+Math.sin(t*0.5+r+c)*0.15})`:'rgba(255,220,100,0.1)';
      ctx.fillRect(bx+2+c*((bw-4)/cols),by+5+r*((bh*0.85)/4),(bw-4)/cols-2,(bh*0.85)/4-3);
    }
  });

  // Burj Al Arab (sail shape) on right
  const bax=W*0.94,bay=H*0.55,bah=H*0.38;
  ctx.fillStyle='#162d44';ctx.beginPath();ctx.moveTo(bax,bay);ctx.lineTo(bax-W*0.06,bay-bah);ctx.lineTo(bax+W*0.01,bay-bah*0.8);ctx.closePath();ctx.fill();
  ctx.strokeStyle='rgba(255,200,50,0.3)';ctx.lineWidth=1;ctx.stroke();

  // DHOW BOAT (traditional wooden)
  function drawDhow(x,y,sc){
    ctx.save();ctx.translate(x,y+Math.sin(t*1.5)*3);ctx.scale(sc,sc);
    // Hull
    const hg=ctx.createLinearGradient(-60,0,60,20);hg.addColorStop(0,'#4a2800');hg.addColorStop(0.5,'#6b3c10');hg.addColorStop(1,'#3a1f00');
    ctx.fillStyle=hg;ctx.beginPath();ctx.moveTo(-65,0);ctx.bezierCurveTo(-70,14,70,14,72,0);ctx.bezierCurveTo(60,-4,-60,-4,-65,0);ctx.closePath();ctx.fill();
    // Deck cabin
    ctx.fillStyle='#5a3010';ctx.fillRect(-40,-18,80,18);
    if(ctx.roundRect)ctx.beginPath(),ctx.roundRect(-40,-18,80,18,[4,4,0,0]),ctx.fill();
    // Windows lit up
    for(let i=-3;i<=3;i++){ctx.fillStyle=`rgba(255,220,100,${0.6+Math.sin(t+i)*0.2})`;ctx.fillRect(i*11-4,-15,8,10);}
    // Mast + sail
    ctx.strokeStyle='#3a2000';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(5,-18);ctx.lineTo(5,-70);ctx.stroke();
    ctx.beginPath();ctx.moveTo(-5,-18);ctx.lineTo(-5,-55);ctx.stroke();
    // Rigging
    ctx.strokeStyle='rgba(180,140,80,0.5)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(5,-70);ctx.lineTo(-50,-18);ctx.stroke();ctx.beginPath();ctx.moveTo(5,-70);ctx.lineTo(60,-18);ctx.stroke();
    // Flags
    const f=['#FF4444','#FFD700','#4444FF','#44FF44'];
    for(let i=0;i<4;i++){ctx.fillStyle=f[i];ctx.fillRect(5-i*16,-66+i*13,12,8);}
    // Water reflection ripples
    ctx.strokeStyle='rgba(100,180,255,0.2)';ctx.lineWidth=2;
    for(let i=1;i<=3;i++){ctx.beginPath();ctx.ellipse(0,8+i*6,70*i*0.4,8,0,0,Math.PI*2);ctx.stroke();}
    ctx.restore();
  }

  if(step===0){
    // Pier
    ctx.fillStyle='#8B6914';ctx.fillRect(W*0.15,H*0.5,W*0.15,H*0.06);
    ctx.fillStyle='#6b4c2a';for(let i=0;i<5;i++)ctx.fillRect(W*0.15+i*(W*0.03),H*0.56,W*0.012,H*0.08);
    drawDhow(W*0.4,H*0.57,0.8);
    // Sunset sky
    const sunG=ctx.createRadialGradient(W*0.7,H*0.35,0,W*0.7,H*0.35,W*0.3);
    sunG.addColorStop(0,'rgba(255,150,50,0.6)');sunG.addColorStop(1,'transparent');
    ctx.fillStyle=sunG;ctx.fillRect(0,0,W,H);
    ctx.fillStyle='rgba(255,120,30,0.9)';ctx.font=`bold ${W>500?13:10}px sans-serif`;ctx.textAlign='center';ctx.fillText('⚓ BOARDING AT PIER 7 — DUBAI MARINA',W*0.5,H*0.15);
  }
  if(step===1){
    drawDhow(W*0.5,H*0.58,1.0);
    ctx.fillStyle='rgba(100,200,255,0.9)';ctx.font=`bold ${W>500?13:10}px sans-serif`;ctx.textAlign='center';ctx.fillText('⛵ SAILING PAST DUBAI MARINA SKYLINE',W*0.5,H*0.12);
  }
  if(step===2){
    // Reflections on water
    for(let i=0;i<15;i++){const rx=(i*W/15)+Math.sin(t*1.5+i)*15,ry=H*0.58+Math.sin(t*2+i*0.5)*8;
    ctx.strokeStyle=`rgba(255,${150+i*5},50,${0.3+Math.sin(t*2+i)*0.15})`;ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(rx,H*0.56);ctx.lineTo(rx+Math.sin(t+i)*8,ry+H*0.12);ctx.stroke();}
    drawDhow(W*0.45,H*0.59,0.9);
    ctx.fillStyle='rgba(100,200,255,0.9)';ctx.font=`bold ${W>500?13:10}px sans-serif`;ctx.textAlign='center';ctx.fillText('🌃 SPARKLING NIGHT CRUISE',W*0.5,H*0.12);
  }
  if(step===3){
    drawDhow(W*0.5,H*0.58,1.0);
    // Music notes floating
    ['♪','♫','♩','♬'].forEach((n,i)=>{const nx=W*0.35+i*W*0.08,ny=H*0.38-((t*20+i*18)%30);ctx.fillStyle=`rgba(255,220,100,${0.6+Math.sin(t*2+i)*0.3})`;ctx.font=`bold ${14+i*2}px sans-serif`;ctx.textAlign='center';ctx.fillText(n,nx,ny);});
    // Food emoji  
    ctx.font='18px sans-serif';['🍢','🥗','🍰','🍷'].forEach((f,i)=>{ctx.fillText(f,W*0.33+i*W*0.1,H*0.44);});
    ctx.fillStyle='rgba(255,220,100,0.9)';ctx.font=`bold ${W>500?13:10}px sans-serif`;ctx.textAlign='center';ctx.fillText('🍽️ BUFFET DINNER & LIVE MUSIC',W*0.5,H*0.12);
  }

  const labels=['⚓ Boarding Pier','⛵ Marina Cruise','🌃 Night Skyline','🍽️ Dinner & Music'];
  const lbl=labels[Math.min(step,labels.length-1)];
  ctx.font=`bold ${W>500?11:9}px sans-serif`;const lw=ctx.measureText(lbl).width+22;
  ctx.fillStyle='rgba(0,20,50,0.6)';if(ctx.roundRect)ctx.beginPath(),ctx.roundRect(W-lw-8,8,lw,24,12),ctx.fill();else ctx.fillRect(W-lw-8,8,lw,24);
  ctx.fillStyle='rgba(150,230,255,0.95)';ctx.textAlign='right';ctx.fillText(lbl,W-19,24);
}

// ════════════════════════════════════════════════════════
//  TOUR 4 — HOT AIR BALLOON  (purple/violet)
//  Journey: Pre-dawn dark → Balloon inflation (fire) → Lift off sunrise → Float aerial → Landing toast
// ════════════════════════════════════════════════════════
function drawHotAirBalloon(ctx,W,H,step,t){
  const skies=[['#000308','#000820','#001040'],['#000510','#060020','#100028'],['#0a0520','#c1440e','#f5a623'],['#0096c7','#48cae4','#90e0ef'],['#ff6b35','#ff9060','#ffcc80']];
  const si=Math.min(step,4);
  const sky=ctx.createLinearGradient(0,0,0,H);sky.addColorStop(0,skies[si][0]);sky.addColorStop(0.5,skies[si][1]);sky.addColorStop(1,skies[si][2]);
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);

  // Stars steps 0,1,2
  if(step<=2){for(let i=0;i<180;i++){const tw=step<=1?0.3+0.7*Math.abs(Math.sin(t*1.2+i*0.4)):(0.3-step*0.05)*Math.abs(Math.sin(t+i));ctx.beginPath();ctx.arc((i*173.3)%W,(i*97.7)%(H*0.65),i%5===0?1.6:0.6,0,Math.PI*2);ctx.fillStyle=`rgba(255,255,255,${tw})`;ctx.fill();}}

  // Horizon glow/sunrise
  if(step>=2){
    const sunY=step===2?H*0.72:step===3?H*0.45:H*0.3;
    const sg=ctx.createRadialGradient(W*0.5,sunY,0,W*0.5,sunY,W*0.3);
    sg.addColorStop(0,'rgba(255,220,80,0.9)');sg.addColorStop(0.3,'rgba(255,120,20,0.5)');sg.addColorStop(1,'transparent');
    ctx.fillStyle=sg;ctx.fillRect(0,0,W,H);
  }

  // Desert silhouette
  ctx.fillStyle=step<=1?'#0a0820':step===2?'#1a0a00':step<=3?'#8B6914':'#c8922a';
  ctx.fillRect(0,H*0.8,W,H*0.2);
  // Dune shapes
  [[H*0.75,'#0d0a1a'],[H*0.80,'#110d20'],[H*0.85,'#140f24']].forEach(([dy,col])=>{
    ctx.fillStyle=step<=1?col:(step===2?'#3a1a00':'#a07820');
    ctx.beginPath();ctx.moveTo(0,dy);ctx.bezierCurveTo(W*0.25,dy-H*0.06,W*0.6,dy-H*0.04,W*0.8,dy-H*0.02);ctx.bezierCurveTo(W*0.9,dy,W,dy-H*0.01,W,dy);ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();ctx.fill();
  });

  // Balloon draw helper
  function drawBalloon(bx,by,sc,opacity=1){
    ctx.save();ctx.translate(bx,by);ctx.scale(sc,sc);ctx.globalAlpha=opacity;
    // Envelope with colorful panels
    const panels=['#9B30FF','#FF6B35','#FFD700','#FF1493','#00CED1','#FF4444','#7B68EE','#FF8C00'];
    for(let i=0;i<8;i++){
      const a1=(i/8)*Math.PI*2,a2=((i+1)/8)*Math.PI*2;
      ctx.fillStyle=panels[i];ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,55,a1,a2);ctx.closePath();ctx.fill();
    }
    // Balloon glow
    const bg3=ctx.createRadialGradient(0,0,0,0,0,55);bg3.addColorStop(0,'rgba(255,255,255,0.15)');bg3.addColorStop(1,'transparent');
    ctx.fillStyle=bg3;ctx.beginPath();ctx.arc(0,0,55,0,Math.PI*2);ctx.fill();
    // Lines from balloon to basket
    ctx.strokeStyle='rgba(150,120,60,0.8)';ctx.lineWidth=1.5;
    for(let i=-3;i<=3;i+=2){ctx.beginPath();ctx.moveTo(i*8,50);ctx.lineTo(i*12,80);ctx.stroke();}
    // Basket
    const basg=ctx.createLinearGradient(-16,80,16,100);basg.addColorStop(0,'#5a3010');basg.addColorStop(1,'#3a1f00');
    ctx.fillStyle=basg;if(ctx.roundRect)ctx.beginPath(),ctx.roundRect(-16,80,32,20,[3]),ctx.fill();else ctx.fillRect(-16,80,32,20);
    // People in basket
    ctx.fillStyle='#FF8C55';ctx.beginPath();ctx.arc(-6,82,5,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.arc(6,82,5,0,Math.PI*2);ctx.fill();
    ctx.restore();
  }

  // STEP 0 — Pre-dawn, crew preparing
  if(step===0){
    // Ground crew silhouettes
    for(let i=0;i<4;i++){const px=W*(0.3+i*0.12),py=H*0.82;ctx.fillStyle='rgba(20,10,40,0.9)';ctx.fillRect(px-6,py-25,12,25);ctx.beginPath();ctx.arc(px,py-27,8,0,Math.PI*2);ctx.fill();}
    // Deflated balloon on ground
    ctx.fillStyle='rgba(155,48,255,0.4)';ctx.beginPath();ctx.ellipse(W*0.5,H*0.76,70,20,0,0,Math.PI*2);ctx.fill();
    // Stars clock: 4AM
    const tg=ctx.createRadialGradient(W*0.1,H*0.15,0,W*0.1,H*0.15,30);tg.addColorStop(0,'rgba(255,255,200,0.3)');tg.addColorStop(1,'transparent');
    ctx.fillStyle=tg;ctx.beginPath();ctx.arc(W*0.1,H*0.15,30,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='rgba(255,255,200,0.8)';ctx.font='bold 12px sans-serif';ctx.textAlign='center';ctx.fillText('4:00',W*0.1,H*0.17);ctx.fillText('AM',W*0.1,H*0.2);
    ctx.fillStyle='rgba(180,100,255,0.9)';ctx.font=`bold ${W>500?13:10}px sans-serif`;ctx.textAlign='center';ctx.fillText('🌙 4AM PICKUP — THE DESERT AWAITS',W*0.5,H*0.12);
  }

  // STEP 1 — Inflation, fire burner glow
  if(step===1){
    // Semi-inflated balloon
    ctx.fillStyle='rgba(155,48,255,0.7)';ctx.beginPath();ctx.ellipse(W*0.5,H*0.6,50+Math.sin(t*2)*5,35+Math.sin(t*2)*3,0,0,Math.PI*2);ctx.fill();
    // Burner fire
    const fglow=ctx.createRadialGradient(W*0.5,H*0.68,0,W*0.5,H*0.68,35);
    fglow.addColorStop(0,'rgba(255,200,50,0.9)');fglow.addColorStop(0.4,'rgba(255,100,0,0.5)');fglow.addColorStop(1,'transparent');
    ctx.fillStyle=fglow;ctx.beginPath();ctx.arc(W*0.5,H*0.68,35,0,Math.PI*2);ctx.fill();
    for(let i=0;i<8;i++){const fx2=W*0.5+Math.sin(t*4+i)*15,fy2=H*0.66-((t*30+i*10)%25);ctx.fillStyle=`rgba(255,${150+i*10},50,${0.7-((t*30+i*10)%25)/36})`;ctx.beginPath();ctx.arc(fx2,fy2,3+i%3,0,Math.PI*2);ctx.fill();}
    // Ropes pulling
    ctx.strokeStyle='rgba(150,120,60,0.6)';ctx.lineWidth=2;
    for(let i=-2;i<=2;i++){ctx.beginPath();ctx.moveTo(W*0.5+i*18,H*0.72);ctx.lineTo(W*0.5+i*8,H*0.82);ctx.stroke();}
    ctx.fillStyle='rgba(255,160,30,0.9)';ctx.font=`bold ${W>500?13:10}px sans-serif`;ctx.textAlign='center';ctx.fillText('🔥 BALLOON INFLATION — FIRE BURNER ON',W*0.5,H*0.12);
  }

  // STEP 2 — Lift off at sunrise
  if(step===2){
    const liftY=H*0.42+Math.sin(t*0.5)*H*0.03;
    drawBalloon(W*0.5,liftY,0.85);
    // Rope still on ground
    ctx.strokeStyle='rgba(150,120,60,0.4)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(W*0.5,liftY+120);ctx.lineTo(W*0.5-30,H*0.85);ctx.stroke();
    ctx.strokeStyle='rgba(255,200,50,0.9)';ctx.font=`bold ${W>500?14:11}px sans-serif`;ctx.textAlign='center';ctx.fillStyle='rgba(255,150,20,0.95)';ctx.fillText('🎈 LIFTING OFF AT SUNRISE!',W*0.5,H*0.12);
  }

  // STEP 3 — Float high, aerial view
  if(step===3){
    const floatY=H*0.22+Math.sin(t*0.4)*H*0.02;
    drawBalloon(W*0.5,floatY,0.9);
    // Other balloons in bg
    drawBalloon(W*0.22,H*0.3+Math.sin(t*0.35)*8,0.55,0.6);
    drawBalloon(W*0.78,H*0.28+Math.sin(t*0.45)*6,0.5,0.5);
    // Cloud puffs
    [0.1,0.3,0.65,0.85].forEach((cf,i)=>{const cx2=(((cf*W+t*10*(i%2?1:-1))%(W+100))-50);ctx.fillStyle='rgba(255,255,255,0.25)';ctx.beginPath();ctx.arc(cx2,H*0.55+i*12,20+i*5,0,Math.PI*2);ctx.fill();});
    ctx.fillStyle='rgba(100,220,255,0.9)';ctx.font=`bold ${W>500?13:10}px sans-serif`;ctx.textAlign='center';ctx.fillText('☁️ FLOATING 4,000 FT ABOVE THE DESERT',W*0.5,H*0.11);
  }

  // STEP 4 — Landing + breakfast toast
  if(step===4){
    drawBalloon(W*0.45,H*0.45+Math.sin(t*0.3)*5,0.75);
    // Celebration table
    ctx.fillStyle='#5a3010';ctx.fillRect(W*0.62,H*0.7,W*0.28,H*0.04);ctx.fillRect(W*0.64,H*0.74,W*0.04,H*0.08);ctx.fillRect(W*0.84,H*0.74,W*0.04,H*0.08);
    // Champagne
    ctx.strokeStyle='rgba(255,220,50,0.8)';ctx.lineWidth=2;const gx2=W*0.72,gy2=H*0.65;
    ctx.beginPath();ctx.moveTo(gx2,gy2);ctx.lineTo(gx2-8,gy2+20);ctx.lineTo(gx2+8,gy2+20);ctx.closePath();ctx.stroke();
    ctx.beginPath();ctx.moveTo(gx2,gy2+20);ctx.lineTo(gx2,gy2+30);ctx.stroke();
    ctx.beginPath();ctx.moveTo(gx2-7,gy2+30);ctx.lineTo(gx2+7,gy2+30);ctx.stroke();
    for(let b=0;b<3;b++){const by2=gy2+14-((t*18+b*8)%15);ctx.beginPath();ctx.arc(gx2+Math.sin(b)*3,by2,1.5,0,Math.PI*2);ctx.fillStyle='rgba(255,220,50,0.5)';ctx.fill();}
    ctx.font='16px sans-serif';ctx.textAlign='center';ctx.fillText('🥂🍳🥐',W*0.78,H*0.67);
    ctx.fillStyle='rgba(200,150,255,0.9)';ctx.font=`bold ${W>500?13:10}px sans-serif`;ctx.textAlign='center';ctx.fillText('🥂 LANDING & GOURMET BREAKFAST TOAST',W*0.5,H*0.12);
  }

  const labels=['🌙 Pre-Dawn Pickup','🔥 Balloon Inflation','🎈 Sunrise Liftoff','☁️ Float Over Desert','🥂 Landing & Breakfast'];
  const lbl=labels[Math.min(step,labels.length-1)];
  ctx.font=`bold ${W>500?11:9}px sans-serif`;const lw=ctx.measureText(lbl).width+22;
  ctx.fillStyle='rgba(30,0,60,0.6)';if(ctx.roundRect)ctx.beginPath(),ctx.roundRect(W-lw-8,8,lw,24,12),ctx.fill();else ctx.fillRect(W-lw-8,8,lw,24);
  ctx.fillStyle='rgba(220,180,255,0.95)';ctx.textAlign='right';ctx.fillText(lbl,W-19,24);
}

// ════════════════════════════════════════════════════════
//  TOUR 5 — CAMEL RIDING  (golden/amber, PEACEFUL)
//  Journey: Arrival → Arabic coffee welcome → Camel ride → Sunset dunes → Traditional dress photo
// ════════════════════════════════════════════════════════
function drawCamelRiding(ctx,W,H,step,t){
  const skies=[['#87CEEB','#b0e0ff','#f5d080'],['#ff9040','#ffb060','#ffd080'],['#ffa030','#ff8020','#ffc060'],['#ff6b00','#ff9030','#ffcc60'],['#ff4500','#ff6b00','#ffaa40']];
  const si=Math.min(step,4);
  const sky=ctx.createLinearGradient(0,0,0,H);sky.addColorStop(0,skies[si][0]);sky.addColorStop(0.5,skies[si][1]);sky.addColorStop(1,skies[si][2]);
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);

  // Gentle dunes
  [[H*0.66,'#c8a050'],[H*0.74,'#d4a840'],[H*0.82,'#e0b030']].forEach(([dy,col],li)=>{
    ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(0,dy);
    ctx.bezierCurveTo(W*0.2,dy-H*0.08,W*0.5,dy-H*0.06,W*0.72,dy-H*0.04);
    ctx.bezierCurveTo(W*0.85,dy-H*0.02,W,dy+H*0.01,W,dy);ctx.lineTo(W,H);ctx.lineTo(0,H);ctx.closePath();ctx.fill();
    // Gentle wind ripples on dunes
    ctx.strokeStyle=`rgba(200,160,40,0.3)`;ctx.lineWidth=1;
    for(let j=0;j<4;j++){ctx.beginPath();const rx=W*(0.1+j*0.22),ry=dy+H*0.02+j*8;ctx.ellipse(rx,ry,30+j*5,4,0.1,0,Math.PI);ctx.stroke();}
  });

  // Sun (gentle, warm)
  const sunPos=[[W*0.82,H*0.18],[W*0.75,H*0.22],[W*0.68,H*0.28],[W*0.6,H*0.35],[W*0.52,H*0.42]];
  const [sunx,suny]=sunPos[si];
  const sg=ctx.createRadialGradient(sunx,suny,0,sunx,suny,55);sg.addColorStop(0,'rgba(255,230,100,1)');sg.addColorStop(0.5,'rgba(255,160,30,0.4)');sg.addColorStop(1,'transparent');
  ctx.fillStyle=sg;ctx.beginPath();ctx.arc(sunx,suny,55,0,Math.PI*2);ctx.fill();

  // Palm tree (peaceful oasis)
  function drawPalm(px,py){
    ctx.strokeStyle='#5a3000';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(px,py);ctx.bezierCurveTo(px+5,py-20,px-3,py-40,px,py-65);ctx.stroke();
    for(let i=0;i<6;i++){const a=(i/6)*Math.PI*2,lx=px+Math.cos(a)*28,ly=py-65+Math.sin(a)*15;ctx.strokeStyle='#2d6a00';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(px,py-65);ctx.quadraticCurveTo(lx+Math.cos(a)*8,ly-8,lx,ly+5);ctx.stroke();}
    ctx.fillStyle='#8B4513';for(let i=0;i<3;i++){ctx.beginPath();ctx.ellipse(px+Math.cos(i*2.1)*8,py-60+Math.sin(i*2.1)*5,5,8,0,0,Math.PI*2);ctx.fill();}
  }
  drawPalm(W*0.12,H*0.66);
  if(W>400)drawPalm(W*0.88,H*0.68);

  // STEP 0 — Arrival welcome
  if(step===0){
    // Decorative welcome arch
    ctx.strokeStyle='rgba(200,160,60,0.8)';ctx.lineWidth=4;ctx.beginPath();ctx.arc(W*0.5,H*0.62,W*0.18,Math.PI,0);ctx.stroke();
    ctx.fillStyle='rgba(200,160,60,0.2)';ctx.beginPath();ctx.arc(W*0.5,H*0.62,W*0.18,Math.PI,0);ctx.fill();
    ctx.fillStyle='rgba(200,150,30,0.8)';ctx.font='14px sans-serif';ctx.textAlign='center';ctx.fillText('أهلاً وسهلاً',W*0.5,H*0.48);
    ctx.fillStyle='rgba(255,180,30,0.9)';ctx.font=`bold ${W>500?13:10}px sans-serif`;ctx.textAlign='center';ctx.fillText('🌴 DESERT ARRIVAL — WELCOME!',W*0.5,H*0.18);
  }

  // STEP 1 — Arabic coffee
  if(step===1){
    // Coffee pot (Dallah)
    const dx=W*0.42,dy2=H*0.54;
    ctx.fillStyle='#d4a017';ctx.beginPath();ctx.ellipse(dx,dy2,18,24,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#c8922a';ctx.beginPath();ctx.ellipse(dx,dy2-15,10,8,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#b8850a';ctx.beginPath();ctx.moveTo(dx+18,dy2-5);ctx.bezierCurveTo(dx+30,dy2-5,dx+32,dy2+10,dx+18,dy2+10);ctx.stroke();
    // Steam
    for(let i=0;i<3;i++){ctx.strokeStyle=`rgba(200,200,200,${0.4+Math.sin(t*2+i)*0.2})`;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(dx-5+i*5,dy2-28);ctx.bezierCurveTo(dx-10+i*5,dy2-38,dx+i*5,dy2-45,dx-3+i*5,dy2-55);ctx.stroke();}
    // Coffee cups
    for(let i=0;i<3;i++){const cx3=W*0.54+i*22,cy3=H*0.58;ctx.fillStyle='#c8922a';ctx.beginPath();ctx.ellipse(cx3,cy3,9,5,0,0,Math.PI*2);ctx.fill();ctx.fillStyle='rgba(100,50,0,0.8)';ctx.beginPath();ctx.ellipse(cx3,cy3-2,6,3,0,0,Math.PI*2);ctx.fill();}
    // Dates
    ctx.fillStyle='#8B4513';ctx.fillRect(W*0.62,H*0.57,W*0.1,H*0.03);
    ctx.font='14px sans-serif';ctx.textAlign='center';ctx.fillText('🌴',W*0.67,H*0.57);
    ctx.fillStyle='rgba(200,150,30,0.9)';ctx.font=`bold ${W>500?13:10}px sans-serif`;ctx.textAlign='center';ctx.fillText('☕ ARABIC COFFEE & DATES WELCOME',W*0.5,H*0.18);
  }

  // STEP 2 — Camel ride
  if(step===2){
    // Camel with rider
    const bob=Math.sin(t*1.2)*2.5;
    const cx4=W*0.5,cy4=H*0.60;
    ctx.save();ctx.translate(cx4,cy4+bob);
    ctx.strokeStyle='#b8850a';ctx.lineWidth=5;
    [[-22,2],[-12,6],[12,2],[22,6]].forEach(([lx,lo])=>{ctx.beginPath();ctx.moveTo(lx,lo);ctx.lineTo(lx,30);ctx.stroke();});
    const bg3=ctx.createRadialGradient(0,0,4,0,0,26);bg3.addColorStop(0,'#d4a017');bg3.addColorStop(1,'#8B6914');
    ctx.fillStyle=bg3;ctx.beginPath();ctx.ellipse(0,0,26,17,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#c8922a';ctx.beginPath();ctx.ellipse(-6,-15,11,9,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#c8922a';ctx.beginPath();ctx.moveTo(19,-6);ctx.quadraticCurveTo(30,-22,27,-32);ctx.quadraticCurveTo(24,-23,16,-10);ctx.fill();
    ctx.fillStyle='#d4a017';ctx.beginPath();ctx.ellipse(26,-36,9,7,0.3,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.arc(30,-38,2.5,0,Math.PI*2);ctx.fillStyle='#333';ctx.fill();
    // Rider on camel
    ctx.fillStyle='#FF8C55';ctx.beginPath();ctx.ellipse(0,-20,8,12,0,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.arc(0,-33,8,0,Math.PI*2);ctx.fill();
    // Traditional headscarf
    ctx.fillStyle='rgba(255,255,255,0.9)';ctx.beginPath();ctx.arc(0,-33,8,Math.PI,Math.PI*2);ctx.fill();
    ctx.fillStyle='rgba(180,50,50,0.8)';ctx.fillRect(-8,-33,16,5);
    // Guide walking
    ctx.restore();
    ctx.fillStyle='rgba(0,0,0,0.8)';ctx.fillRect(cx4-60,cy4+12,12,28);ctx.beginPath();ctx.arc(cx4-54,cy4+10,8,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle='rgba(150,120,60,0.8)';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(cx4-54,cy4+22);ctx.lineTo(cx4-32,cy4+8);ctx.stroke();
    ctx.fillStyle='rgba(200,150,30,0.9)';ctx.font=`bold ${W>500?13:10}px sans-serif`;ctx.textAlign='center';ctx.fillText('🐪 GUIDED CAMEL RIDE THROUGH THE DUNES',W*0.5,H*0.18);
  }

  // STEP 3 — Sunset dune photography
  if(step===3){
    const bob=Math.sin(t*1.2)*2;
    ctx.save();ctx.translate(W*0.52,H*0.58+bob);
    ctx.strokeStyle='rgba(0,0,0,0.8)';ctx.lineWidth=5;
    [[-20,2],[-11,6],[11,2],[20,6]].forEach(([lx,lo])=>{ctx.beginPath();ctx.moveTo(lx,lo);ctx.lineTo(lx,28);ctx.stroke();});
    ctx.fillStyle='rgba(0,0,0,0.8)';ctx.beginPath();ctx.ellipse(0,0,24,15,0,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.ellipse(-5,-13,10,8,0,0,Math.PI*2);ctx.fill();
    ctx.restore();
    // Camera silhouette
    ctx.fillStyle='rgba(0,0,0,0.8)';ctx.fillRect(W*0.22,H*0.62,12,8);ctx.beginPath();ctx.arc(W*0.28,H*0.63,4,0,Math.PI*2);ctx.fillStyle='rgba(150,200,255,0.6)';ctx.fill();
    if(Math.sin(t*1.5)>0.6){ctx.fillStyle='rgba(255,255,255,0.4)';ctx.beginPath();ctx.arc(W*0.28,H*0.63,15,0,Math.PI*2);ctx.fill();}
    ctx.fillStyle='rgba(255,180,30,0.9)';ctx.font=`bold ${W>500?13:10}px sans-serif`;ctx.textAlign='center';ctx.fillText('🌅 GOLDEN SUNSET PHOTOGRAPHY',W*0.5,H*0.18);
  }

  // STEP 4 — Traditional dress photos
  if(step===4){
    // Figure in traditional dress
    ctx.save();ctx.translate(W*0.5,H*0.6);
    // Abaya/thobe
    const sw2=Math.sin(t*2)*8;
    ctx.fillStyle='rgba(200,160,50,0.9)';ctx.beginPath();ctx.moveTo(-2,-30);ctx.bezierCurveTo(-25+sw2,0,-30,20,-22,38);ctx.bezierCurveTo(-5,42,5,42,22,38);ctx.bezierCurveTo(30,20,25,0,2,-30);ctx.closePath();ctx.fill();
    ctx.fillStyle='#FF8C55';ctx.beginPath();ctx.arc(0,-40,10,0,Math.PI*2);ctx.fill();
    // Headdress
    ctx.fillStyle='rgba(255,255,255,0.95)';ctx.beginPath();ctx.arc(0,-40,11,Math.PI,Math.PI*2);ctx.fill();
    ctx.fillStyle='rgba(180,50,50,0.8)';ctx.fillRect(-12,-40,24,5);
    // Holding coffee cup
    ctx.fillStyle='#c8922a';ctx.beginPath();ctx.ellipse(18,-15,6,4,0.3,0,Math.PI*2);ctx.fill();
    ctx.restore();
    ctx.fillStyle='rgba(255,200,50,0.9)';ctx.font=`bold ${W>500?13:10}px sans-serif`;ctx.textAlign='center';ctx.fillText('👘 TRADITIONAL DRESS & PHOTO SESSION',W*0.5,H*0.18);
  }

  const labels=['🌴 Desert Arrival','☕ Arabic Coffee Welcome','🐪 Camel Ride','🌅 Sunset Photos','👘 Traditional Dress'];
  const lbl=labels[Math.min(step,labels.length-1)];
  ctx.font=`bold ${W>500?11:9}px sans-serif`;const lw=ctx.measureText(lbl).width+22;
  ctx.fillStyle='rgba(80,40,0,0.55)';if(ctx.roundRect)ctx.beginPath(),ctx.roundRect(W-lw-8,8,lw,24,12),ctx.fill();else ctx.fillRect(W-lw-8,8,lw,24);
  ctx.fillStyle='rgba(255,230,150,0.95)';ctx.textAlign='right';ctx.fillText(lbl,W-19,24);
}

// ════════════════════════════════════════════════════════
//  TOUR 6 — PRIVATE CITY TOUR  (emerald/green)
//  Journey: Hotel pickup car → Al Fahidi Heritage → Mosque → Gold Souk → Burj Khalifa → Marina sunset
// ════════════════════════════════════════════════════════
function drawCityTour(ctx,W,H,step,t){
  const skies=[['#87CEEB','#b8e4ff','#d4f0d0'],['#6ab0d8','#8ac8e8','#b0daf0'],['#4a90c8','#6ab0d8','#8ecce8'],['#1a2a40','#2a4060','#3a5880'],['#ff6b35','#ff9060','#ffcc80']];
  const si=Math.min(step,4);
  const sky=ctx.createLinearGradient(0,0,0,H);sky.addColorStop(0,skies[si][0]);sky.addColorStop(0.5,skies[si][1]);sky.addColorStop(1,skies[si][2]);
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);

  // Ground / road
  ctx.fillStyle='#3a3a42';ctx.fillRect(0,H*0.72,W,H*0.28);
  ctx.fillStyle='#4a4a52';ctx.fillRect(0,H*0.72,W,H*0.06);
  // Road markings
  ctx.strokeStyle='rgba(255,255,255,0.35)';ctx.lineWidth=2;ctx.setLineDash([20,15]);
  ctx.beginPath();ctx.moveTo(0,H*0.79);ctx.lineTo(W,H*0.79);ctx.stroke();ctx.setLineDash([]);
  // Sidewalk
  ctx.fillStyle='#b0b8c0';ctx.fillRect(0,H*0.7,W,H*0.025);

  // STEP 0 — Luxury SUV on city road
  if(step===0){
    // City skyline bg
    [[0.05,0.04,0.22],[0.1,0.03,0.16],[0.15,0.055,0.3],[0.2,0.025,0.14],[0.6,0.04,0.2],[0.65,0.025,0.13],[0.7,0.06,0.34],[0.78,0.03,0.18],[0.85,0.045,0.24]].forEach(([xf,wf,hf])=>{
      ctx.fillStyle='#c8d8e8';ctx.fillRect(W*xf,H*(0.7-hf),W*wf,H*hf);
    });
    // Luxury SUV
    const carX=W*0.45,carY=H*0.73;
    const cg=ctx.createLinearGradient(carX-48,carY,carX+48,carY+18);cg.addColorStop(0,'#1a2a1a');cg.addColorStop(0.5,'#2a4a2a');cg.addColorStop(1,'#1a2a1a');
    ctx.fillStyle=cg;if(ctx.roundRect)ctx.beginPath(),ctx.roundRect(carX-48,carY-10,96,18,[3]),ctx.fill();else ctx.fillRect(carX-48,carY-10,96,18);
    ctx.fillStyle='#224422';ctx.beginPath();ctx.moveTo(carX-34,carY-10);ctx.lineTo(carX-24,carY-28);ctx.lineTo(carX+32,carY-28);ctx.lineTo(carX+40,carY-10);ctx.closePath();ctx.fill();
    ctx.fillStyle='rgba(135,206,235,0.7)';ctx.fillRect(carX-22,carY-26,18,14);ctx.fillRect(carX+2,carY-26,18,14);
    [[-34,8],[34,8]].forEach(([wx,wy])=>{ctx.beginPath();ctx.arc(carX+wx,carY+wy,13,0,Math.PI*2);ctx.fillStyle='#111';ctx.fill();ctx.beginPath();ctx.arc(carX+wx,carY+wy,6,0,Math.PI*2);ctx.fillStyle='#444';ctx.fill();});
    ctx.beginPath();ctx.arc(carX+50,carY-5,5,0,Math.PI*2);ctx.fillStyle='rgba(255,220,100,0.9)';ctx.fill();
    ctx.fillStyle='#4CAF50';ctx.font='bold 7px sans-serif';ctx.textAlign='center';ctx.fillText('ROVERS PRIVATE TOUR',carX,carY+2);
    ctx.fillStyle='rgba(50,200,80,0.9)';ctx.font=`bold ${W>500?13:10}px sans-serif`;ctx.textAlign='center';ctx.fillText('🚗 PRIVATE AC VEHICLE — LET\'S EXPLORE!',W*0.5,H*0.16);
  }

  // STEP 1 — Al Fahidi Heritage District
  if(step===1){
    // Old Dubai sand-colored buildings with wind towers
    const bdata=[[0.05,0.12,0.25],[0.18,0.10,0.22],[0.32,0.14,0.28],[0.47,0.09,0.20],[0.58,0.13,0.26],[0.72,0.11,0.22],[0.84,0.12,0.24]];
    bdata.forEach(([xf,wf,hf])=>{
      const bx=W*xf,bw=W*wf,bh=H*hf,by=H*0.7-bh;
      ctx.fillStyle='#c8a870';ctx.fillRect(bx,by,bw,bh);
      // Wind tower (Barjeel)
      const tx=bx+bw/2,ty=by-H*0.08;
      ctx.fillStyle='#b89860';ctx.fillRect(tx-6,ty,12,H*0.08);
      ctx.fillRect(tx-10,ty,20,10);
      ctx.strokeStyle='rgba(0,0,0,0.2)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(tx,ty+2);ctx.lineTo(tx,ty+H*0.08-2);ctx.stroke();
      // Small arched windows
      for(let r=0;r<2;r++){ctx.fillStyle='rgba(0,0,0,0.3)';ctx.beginPath();ctx.arc(bx+bw/2,by+bh*0.3+r*bh*0.3,4,Math.PI,0);ctx.fill();}
    });
    // People silhouettes walking
    for(let i=0;i<4;i++){const px=W*(0.2+i*0.18),py=H*0.71;ctx.fillStyle='rgba(0,0,0,0.6)';ctx.fillRect(px-3,py-18,6,18);ctx.beginPath();ctx.arc(px,py-20,6,0,Math.PI*2);ctx.fill();}
    ctx.fillStyle='rgba(200,160,50,0.9)';ctx.font=`bold ${W>500?13:10}px sans-serif`;ctx.textAlign='center';ctx.fillText('🏛️ AL FAHIDI HERITAGE DISTRICT',W*0.5,H*0.16);
  }

  // STEP 2 — Jumeirah Mosque
  if(step===2){
    const mx=W*0.5;
    // Mosque body
    ctx.fillStyle='#e8d8b0';ctx.fillRect(mx-W*0.22,H*0.42,W*0.44,H*0.28);
    // Main dome
    const dg=ctx.createRadialGradient(mx,H*0.38,0,mx,H*0.38,W*0.1);dg.addColorStop(0,'#f0e8c8');dg.addColorStop(1,'#c8b890');
    ctx.fillStyle=dg;ctx.beginPath();ctx.arc(mx,H*0.42,W*0.1,Math.PI,0);ctx.fill();
    // Side domes
    [[mx-W*0.14,H*0.46,W*0.055],[mx+W*0.14,H*0.46,W*0.055]].forEach(([dx,dy3,dr])=>{ctx.fillStyle='#d8c8a0';ctx.beginPath();ctx.arc(dx,dy3,dr,Math.PI,0);ctx.fill();});
    // Minarets
    [[mx-W*0.18,H*0.28],[mx+W*0.18,H*0.28]].forEach(([tx,ty])=>{
      ctx.fillStyle='#d4c490';ctx.fillRect(tx-7,ty,14,H*0.42);
      ctx.beginPath();ctx.arc(tx,ty,8,Math.PI,0);ctx.fill();
      // Crescent
      const cp=0.6+0.4*Math.sin(t*2);ctx.fillStyle=`rgba(255,215,0,${cp})`;ctx.beginPath();ctx.arc(tx,ty-12,5,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='#d4c490';ctx.beginPath();ctx.arc(tx+3,ty-12,4,0,Math.PI*2);ctx.fill();
    });
    // Arched entrance
    ctx.fillStyle='#b8a870';ctx.beginPath();ctx.arc(mx,H*0.68,W*0.045,Math.PI,0);ctx.fill();ctx.fillRect(mx-W*0.045,H*0.68,W*0.09,H*0.02);
    // Glow
    const mg2=ctx.createRadialGradient(mx,H*0.5,0,mx,H*0.5,W*0.3);mg2.addColorStop(0,'rgba(255,220,100,0.08)');mg2.addColorStop(1,'transparent');
    ctx.fillStyle=mg2;ctx.fillRect(0,0,W,H);
    ctx.fillStyle='rgba(50,180,80,0.9)';ctx.font=`bold ${W>500?13:10}px sans-serif`;ctx.textAlign='center';ctx.fillText('🕌 JUMEIRAH MOSQUE — ISLAMIC ARCHITECTURE',W*0.5,H*0.16);
  }

  // STEP 3 — Gold & Spice Souk (night, glowing)
  if(step===3){
    // Souk ceiling/arches
    ctx.fillStyle='#2a1a00';ctx.fillRect(0,0,W,H*0.35);
    for(let i=0;i<6;i++){ctx.fillStyle='#3a2a10';ctx.beginPath();ctx.arc(W*(0.08+i*0.17),H*0.35,W*0.09,Math.PI,0);ctx.fill();}
    // Stalls
    for(let i=0;i<7;i++){
      const sx=W*(0.03+i*0.14),sy=H*0.38,sw3=W*0.11;
      ctx.fillStyle=['#d4a017','#c8400c','#8B0000','#0d4a7a','#2d8a4e','#8B4513','#6B238E'][i];
      ctx.fillRect(sx,sy,sw3,H*0.28);
      // Items hanging
      const items=['💎','🪙','🏺','🌸','🧿','🪔','🎭'];
      ctx.font='12px sans-serif';ctx.textAlign='center';ctx.fillText(items[i],sx+sw3/2,sy+H*0.1);
      // Gold glitter effect
      for(let j=0;j<5;j++){const gx3=sx+Math.random()*sw3,gy3=sy+Math.random()*H*0.2;const gp=0.3+0.7*Math.sin(t*3+i+j);ctx.fillStyle=`rgba(255,220,50,${gp})`;ctx.beginPath();ctx.arc(gx3,gy3,1.5,0,Math.PI*2);ctx.fill();}
      // Price labels
      ctx.fillStyle='rgba(255,220,50,0.8)';ctx.font='8px sans-serif';ctx.textAlign='center';ctx.fillText(`AED ${[1200,450,280,190,95,340,880][i]}`,sx+sw3/2,sy+H*0.22);
    }
    // Lanterns hanging
    for(let i=0;i<8;i++){
      const lx=W*(0.06+i*0.12),ly=H*0.38;
      const lp=0.6+0.4*Math.sin(t*2+i);
      const lg=ctx.createRadialGradient(lx,ly,0,lx,ly,12);lg.addColorStop(0,`rgba(255,180,50,${lp})`);lg.addColorStop(1,'transparent');
      ctx.fillStyle=lg;ctx.beginPath();ctx.arc(lx,ly,12,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=['#FF6B2B','#FFD700','#4ECDC4','#FF1493'][i%4];ctx.beginPath();ctx.arc(lx,ly,5,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle='rgba(0,0,0,0.5)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(lx,0);ctx.lineTo(lx,ly-5);ctx.stroke();
    }
    ctx.fillStyle='rgba(255,200,50,0.9)';ctx.font=`bold ${W>500?13:10}px sans-serif`;ctx.textAlign='center';ctx.fillText('🥇 GOLD & SPICE SOUK — OLD DUBAI MARKET',W*0.5,H*0.16);
  }

  // STEP 4 — Burj Khalifa + Marina sunset
  if(step===4){
    // Dubai Marina skyline
    [[0.02,0.03,0.28],[0.06,0.025,0.20],[0.11,0.04,0.34],[0.16,0.022,0.16],[0.62,0.04,0.24],[0.67,0.025,0.14],[0.72,0.05,0.38],[0.79,0.03,0.2],[0.85,0.045,0.28]].forEach(([xf,wf,hf])=>{
      const bx=W*xf,bw=W*wf,bh=H*hf,by=H*0.7-bh;
      const bg4=ctx.createLinearGradient(bx,by,bx+bw,by+bh);bg4.addColorStop(0,'#1a2a3a');bg4.addColorStop(1,'#0d1520');
      ctx.fillStyle=bg4;ctx.fillRect(bx,by,bw,bh);
      for(let r=0;r<3;r++)for(let c=0;c<Math.ceil(bw/8);c++){const isLit=Math.sin(t*0.3+r+c*2+xf*15)>-0.3;if(isLit){ctx.fillStyle=`rgba(255,220,100,${0.4+Math.sin(t+r+c)*0.1})`;ctx.fillRect(bx+2+c*8,by+5+r*((bh-10)/4),6,((bh-10)/4)-2);}}
    });
    // Burj Khalifa (center, tall)
    const bkx=W*0.42;
    const sections2=[[14,H*0.68],[12,H*0.55],[10,H*0.43],[8,H*0.33],[6,H*0.24],[4,H*0.16],[2.5,H*0.1],[1.5,H*0.05]];
    sections2.forEach(([hw,y],i)=>{
      const next=sections2[i+1];const ny=next?next[1]:0;const nhw=next?next[0]:0.5;
      const bg5=ctx.createLinearGradient(bkx-hw,0,bkx+hw,0);bg5.addColorStop(0,'#1a2a4a');bg5.addColorStop(0.5,'#2a3d6e');bg5.addColorStop(1,'#1a2a4a');
      ctx.fillStyle=bg5;ctx.beginPath();ctx.moveTo(bkx-hw,y);ctx.lineTo(bkx+hw,y);ctx.lineTo(bkx+nhw,ny);ctx.lineTo(bkx-nhw,ny);ctx.closePath();ctx.fill();
      if(y>H*0.3){for(let w=Math.floor(-hw+2);w<hw-1;w+=5){const lit=Math.sin(t*0.3+w*0.5+i)>-0.2;if(lit){ctx.fillStyle=`rgba(255,220,100,${0.3+Math.sin(t*0.5+w)*0.12})`;ctx.fillRect(bkx+w-1.5,y+2,3,4);}}}
    });
    const sp2=0.7+0.3*Math.sin(t*2.5);ctx.fillStyle=`rgba(255,50,50,${sp2})`;ctx.beginPath();ctx.arc(bkx,H*0.05,3,0,Math.PI*2);ctx.fill();
    // Water reflection at bottom
    const wg2=ctx.createLinearGradient(0,H*0.72,0,H);wg2.addColorStop(0,'#001a30');wg2.addColorStop(1,'#000510');ctx.fillStyle=wg2;ctx.fillRect(0,H*0.72,W,H*0.28);
    // Wave reflections
    for(let i=0;i<5;i++){ctx.strokeStyle=`rgba(255,${100+i*20},30,${0.15+Math.sin(t*1.5+i)*0.05})`;ctx.lineWidth=1.5;ctx.beginPath();for(let x=0;x<=W;x+=8){const wy=H*(0.75+i*0.035)+Math.sin(x*0.03+t*1.5+i)*4;x===0?ctx.moveTo(x,wy):ctx.lineTo(x,wy);}ctx.stroke();}
    // Sunset glow
    const sunsetG=ctx.createRadialGradient(W*0.7,H*0.35,0,W*0.7,H*0.35,W*0.3);sunsetG.addColorStop(0,'rgba(255,130,30,0.35)');sunsetG.addColorStop(1,'transparent');
    ctx.fillStyle=sunsetG;ctx.fillRect(0,0,W,H);
    ctx.fillStyle='rgba(50,200,100,0.9)';ctx.font=`bold ${W>500?13:10}px sans-serif`;ctx.textAlign='center';ctx.fillText('🗼 BURJ KHALIFA & DUBAI MARINA — SUNSET',W*0.5,H*0.16);
  }

  const labels=['🚗 Hotel Pickup','🏛️ Heritage District','🕌 Jumeirah Mosque','🥇 Gold & Spice Souk','🗼 Burj Khalifa & Marina'];
  const lbl=labels[Math.min(step,labels.length-1)];
  ctx.font=`bold ${W>500?11:9}px sans-serif`;const lw=ctx.measureText(lbl).width+22;
  ctx.fillStyle='rgba(0,40,10,0.55)';if(ctx.roundRect)ctx.beginPath(),ctx.roundRect(W-lw-8,8,lw,24,12),ctx.fill();else ctx.fillRect(W-lw-8,8,lw,24);
  ctx.fillStyle='rgba(150,255,180,0.95)';ctx.textAlign='right';ctx.fillText(lbl,W-19,24);
}

// ════════════════════════════════════════════════════════
//  SCENE ROUTER
// ════════════════════════════════════════════════════════
const TOUR_SCENES = {
  'desert-safari-dubai':    { draw: drawDesertSafari,  steps: 6 },
  'quad-bike-dubai':        { draw: drawQuadBike,       steps: 4 },
  'dhow-cruise-dubai':      { draw: drawDhowCruise,     steps: 4 },
  'hot-air-balloon-dubai':  { draw: drawHotAirBalloon,  steps: 5 },
  'camel-riding-dubai':     { draw: drawCamelRiding,    steps: 5 },
  'private-city-tour-dubai':{ draw: drawCityTour,       steps: 5 },
};

// ════════════════════════════════════════════════════════
//  MAIN EXPORT
// ════════════════════════════════════════════════════════
export default function TourAnimation({ tourId }) {
  const canvasRef  = useRef(null);
  const rafRef     = useRef(null);
  const tRef       = useRef(0);
  const fadeRef    = useRef(1);
  const prevStep   = useRef(0);
  const [step, setStep] = useState(0);

  const config = TOUR_SCENES[tourId] || TOUR_SCENES['desert-safari-dubai'];

  // Auto-advance step every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setStep(s => {
        const next = (s + 1) % config.steps;
        fadeRef.current = 0;
        return next;
      });
    }, 5500);
    return () => clearInterval(timer);
  }, [config.steps]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    function resize() {
      canvas.width  = canvas.offsetWidth  || 900;
      canvas.height = canvas.offsetHeight || 460;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function loop() {
      tRef.current += 0.018;
      if (fadeRef.current < 1) fadeRef.current = Math.min(1, fadeRef.current + 0.022);
      config.draw(ctx, canvas.width, canvas.height, step, tRef.current);
      if (fadeRef.current < 1) {
        ctx.fillStyle = `rgba(0,0,0,${1 - fadeRef.current})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      rafRef.current = requestAnimationFrame(loop);
    }
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    loop();
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, [step, tourId]);

  return <canvas ref={canvasRef} style={{ width:'100%', height:'100%', display:'block' }} />;
}
