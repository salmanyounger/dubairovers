'use client';
import { useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════
// DESERT SAFARI BLOGS 02–07 — 6 unique animation sets
// Each animId is globally unique — never reused anywhere on site
//
// blog02: seasonal-wheel, temperature-gauge, crowd-meter
// blog03: outfit-float, uv-sun, desert-wind
// blog04: family-camel, safety-bounce, kids-joy
// blog05: morning-split, sunset-split, comparison-dial
// blog06: tent-stars, campfire-night, sunrise-reveal
// blog07: wildlife-dots, reserve-map, oryx-walk
// ═══════════════════════════════════════════════════════════════

function useCanvas(fn, deps=[]) {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext('2d');
    let raf, t = 0;
    const rsz = () => { cv.width = cv.offsetWidth||760; cv.height = cv.offsetHeight||210; };
    rsz(); const ro = new ResizeObserver(rsz); ro.observe(cv);
    const loop = () => { t += 0.014; fn(ctx, cv.width, cv.height, t); raf = requestAnimationFrame(loop); };
    loop();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, deps);
  return ref;
}

// ─── BLOG 02: SEASONAL WHEEL — best month calendar ────────────
export function BlogAnim_SeasonalWheel() {
  const ref = useCanvas((ctx, W, H, t) => {
    ctx.fillStyle = '#030608'; ctx.fillRect(0, 0, W, H);
    const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const TEMPS =  [24,26,29,35,40,43,43,44,40,36,30,25];
    const CROWD =  [0.9,0.8,0.7,0.5,0.3,0.2,0.2,0.2,0.3,0.5,0.7,0.95];
    const BEST =   [1,1,0,0,0,0,0,0,0,0,1,1]; // 1 = good season
    const cx2 = W * 0.38, cy2 = H * 0.52;
    const outerR = Math.min(W * 0.26, H * 0.42);
    // Draw month segments
    MONTHS.forEach((m, i) => {
      const a1 = (i / 12) * Math.PI * 2 - Math.PI * 0.5;
      const a2 = ((i + 0.88) / 12) * Math.PI * 2 - Math.PI * 0.5;
      const highlight = BEST[i] === 1;
      const pulse = highlight ? 0.85 + Math.sin(t * 2 + i) * 0.15 : 0.6;
      // Segment fill
      const tempNorm = (TEMPS[i] - 24) / 20;
      const r2 = Math.floor(10 + tempNorm * 200);
      const g2 = Math.floor(140 - tempNorm * 120);
      ctx.fillStyle = highlight
        ? `rgba(245,158,11,${0.22 + Math.sin(t * 1.5 + i) * 0.08})`
        : `rgba(${r2},${g2},20,0.18)`;
      ctx.beginPath(); ctx.moveTo(cx2, cy2);
      ctx.arc(cx2, cy2, outerR, a1, a2); ctx.closePath(); ctx.fill();
      // Segment border
      ctx.strokeStyle = highlight ? `rgba(245,158,11,${pulse})` : 'rgba(255,255,255,0.08)';
      ctx.lineWidth = highlight ? 1.5 : 0.5;
      ctx.beginPath(); ctx.moveTo(cx2, cy2); ctx.arc(cx2, cy2, outerR, a1, a2); ctx.closePath(); ctx.stroke();
      // Month label
      const labelA = (i + 0.44) / 12 * Math.PI * 2 - Math.PI * 0.5;
      const lx = cx2 + Math.cos(labelA) * outerR * 0.72;
      const ly = cy2 + Math.sin(labelA) * outerR * 0.72;
      ctx.font = `${highlight ? '700' : '500'} ${Math.max(8, W * 0.013)}px Outfit,sans-serif`;
      ctx.fillStyle = highlight ? '#F59E0B' : 'rgba(255,255,255,0.45)';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(m, lx, ly);
      // Temp ring dot
      const tempR = outerR * 0.88;
      const tx2 = cx2 + Math.cos(labelA) * tempR;
      const ty2 = cy2 + Math.sin(labelA) * tempR;
      const tc = `rgb(${r2},${g2},20)`;
      ctx.fillStyle = tc; ctx.beginPath(); ctx.arc(tx2, ty2, 3, 0, Math.PI * 2); ctx.fill();
    });
    // Center hub
    const hubG = ctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, outerR * 0.28);
    hubG.addColorStop(0, 'rgba(245,158,11,0.15)'); hubG.addColorStop(1, 'rgba(3,6,8,0.95)');
    ctx.fillStyle = hubG; ctx.beginPath(); ctx.arc(cx2, cy2, outerR * 0.28, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(245,158,11,0.3)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(cx2, cy2, outerR * 0.28, 0, Math.PI * 2); ctx.stroke();
    ctx.font = `700 ${Math.max(10, W * 0.016)}px Outfit,sans-serif`;
    ctx.fillStyle = '#F59E0B'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText('BEST', cx2, cy2 - 8); ctx.fillText('MONTHS', cx2, cy2 + 8);
    // Right side — legend
    const lx2 = W * 0.68; let ly2 = H * 0.2;
    ctx.font = `700 ${Math.max(10, W * 0.015)}px Outfit,sans-serif`;
    ctx.fillStyle = '#fff'; ctx.textAlign = 'left'; ctx.textBaseline = 'top';
    ctx.fillText('Season Guide', lx2, ly2); ly2 += 28;
    [[1, '#F59E0B', '✓ Best season'], [0, 'rgba(100,180,100,0.8)', '◎ Good season'], [0, 'rgba(200,80,20,0.8)', '✗ Too hot']].forEach(([, color, label]) => {
      ctx.fillStyle = color; ctx.beginPath(); ctx.arc(lx2 + 7, ly2 + 7, 6, 0, Math.PI * 2); ctx.fill();
      ctx.font = `400 ${Math.max(9, W * 0.013)}px Outfit,sans-serif`;
      ctx.fillStyle = 'rgba(255,255,255,0.6)'; ctx.fillText(label, lx2 + 18, ly2 + 1);
      ly2 += 22;
    });
    // Temperature bar chart (small, right side)
    ly2 += 10;
    ctx.font = `600 ${Math.max(9, W * 0.012)}px Outfit,sans-serif`;
    ctx.fillStyle = 'rgba(255,255,255,0.45)'; ctx.fillText('Peak Temp (°C)', lx2, ly2); ly2 += 14;
    TEMPS.slice(0, 6).forEach((temp, i) => {
      const bw = (W * 0.28) * (temp / 44);
      const tempNorm = (temp - 24) / 20;
      ctx.fillStyle = `rgba(${Math.floor(10 + tempNorm * 200)},${Math.floor(140 - tempNorm * 120)},20,0.7)`;
      ctx.fillRect(lx2, ly2 + i * 14, bw, 10);
      ctx.font = `400 9px Outfit,sans-serif`; ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.fillText(MONTHS[i] + ' ' + temp + '°', lx2 + bw + 4, ly2 + i * 14 + 1);
    });
  });
  return <canvas ref={ref} style={{ width:'100%', height:'100%', display:'block' }} aria-label="Seasonal calendar showing best months for desert safari in Dubai" />;
}

// ─── BLOG 02: TEMPERATURE GAUGE ───────────────────────────────
export function BlogAnim_TempGauge() {
  const ref = useCanvas((ctx, W, H, t) => {
    ctx.fillStyle = '#060408'; ctx.fillRect(0, 0, W, H);
    // Background desert
    const bg = ctx.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, '#0a0408'); bg.addColorStop(0.6, '#1a0800'); bg.addColorStop(1, '#5a1800');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    // Sun
    const sunX = W * 0.75, sunY = H * 0.28;
    const sunPulse = 1 + Math.sin(t * 1.5) * 0.04;
    const sunG = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 55 * sunPulse);
    sunG.addColorStop(0, 'rgba(255,220,50,0.95)'); sunG.addColorStop(0.3, 'rgba(255,140,20,0.6)'); sunG.addColorStop(1, 'transparent');
    ctx.fillStyle = sunG; ctx.beginPath(); ctx.arc(sunX, sunY, 55 * sunPulse, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,220,50,0.9)'; ctx.beginPath(); ctx.arc(sunX, sunY, 22 * sunPulse, 0, Math.PI * 2); ctx.fill();
    // Sun rays
    for (let r = 0; r < 8; r++) {
      const a = r / 8 * Math.PI * 2 + t * 0.4;
      ctx.strokeStyle = `rgba(255,200,40,${0.3 + Math.sin(t * 2 + r) * 0.15})`; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(sunX + Math.cos(a) * 28, sunY + Math.sin(a) * 28); ctx.lineTo(sunX + Math.cos(a) * 48, sunY + Math.sin(a) * 48); ctx.stroke();
    }
    // Thermometers for 3 months
    const MONTHS = [{ label:'Oct–Apr', temp:28, color:'#4CAF50', note:'Perfect' }, { label:'May–Jun', temp:40, color:'#FF9800', note:'Hot' }, { label:'Jul–Sep', temp:44, color:'#F44336', note:'Extreme' }];
    MONTHS.forEach((m, i) => {
      const tx2 = W * (0.12 + i * 0.22); const ty = H * 0.75;
      const maxH = H * 0.52; const fillH = maxH * (m.temp / 50);
      const animFill = fillH * Math.min(1, t * 0.15);
      // Glass tube
      ctx.strokeStyle = 'rgba(255,255,255,0.2)'; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.roundRect ? ctx.roundRect(tx2 - 8, ty - maxH, 16, maxH, 8) : ctx.rect(tx2 - 8, ty - maxH, 16, maxH);
      ctx.stroke();
      // Fill
      ctx.fillStyle = m.color;
      ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(tx2 - 6, ty - animFill, 12, animFill, 6); else ctx.rect(tx2 - 6, ty - animFill, 12, animFill);
      ctx.fill();
      // Bulb
      const bulbG = ctx.createRadialGradient(tx2, ty + 10, 0, tx2, ty + 10, 12);
      bulbG.addColorStop(0, m.color); bulbG.addColorStop(1, 'rgba(0,0,0,0.5)');
      ctx.fillStyle = bulbG; ctx.beginPath(); ctx.arc(tx2, ty + 10, 12, 0, Math.PI * 2); ctx.fill();
      // Degree label
      ctx.font = `700 ${W > 500 ? 15 : 12}px Outfit,sans-serif`; ctx.fillStyle = '#fff';
      ctx.textAlign = 'center'; ctx.fillText(m.temp + '°C', tx2, ty - animFill - 10);
      ctx.font = `600 ${W > 500 ? 11 : 9}px Outfit,sans-serif`; ctx.fillStyle = m.color;
      ctx.fillText(m.note, tx2, ty + 30);
      ctx.font = `400 ${W > 500 ? 10 : 8}px Outfit,sans-serif`; ctx.fillStyle = 'rgba(255,255,255,0.45)';
      ctx.fillText(m.label, tx2, ty + 44);
    });
    // Heat shimmer lines
    ctx.strokeStyle = 'rgba(255,150,30,0.06)'; ctx.lineWidth = 1;
    for (let i = 0; i < 6; i++) {
      ctx.beginPath(); const y = H * 0.3 + i * H * 0.05;
      for (let x = 0; x <= W; x += 5) { const wy = y + Math.sin(x * 0.04 + t * 2.5 + i) * 2.5; x === 0 ? ctx.moveTo(x, wy) : ctx.lineTo(x, wy); }
      ctx.stroke();
    }
    // Title
    ctx.font = `700 ${W > 500 ? 13 : 11}px Outfit,sans-serif`; ctx.fillStyle = 'rgba(255,255,255,0.55)';
    ctx.textAlign = 'center'; ctx.fillText('DUBAI DESERT — TEMPERATURE BY SEASON', W * 0.5, H * 0.08);
  });
  return <canvas ref={ref} style={{ width:'100%', height:'100%', display:'block' }} aria-label="Temperature comparison chart showing Dubai desert heat by season" />;
}

// ─── BLOG 03: OUTFIT FLOATING ITEMS ───────────────────────────
export function BlogAnim_OutfitFloat() {
  const ITEMS = ['👟','🧣','🧴','👓','👒','🎒','💊','🧥','📸','💧','🕶️','🌿'];
  const itemsRef = useRef(ITEMS.map((item, i) => ({
    item, x: 0.08 + (i % 6) * 0.16, y: 0.15 + Math.floor(i / 6) * 0.5,
    vx: (Math.random() - 0.5) * 0.0004, vy: (Math.random() - 0.5) * 0.0004,
    ph: Math.random() * Math.PI * 2, size: 22 + Math.random() * 12,
  })));
  const ref = useCanvas((ctx, W, H, t) => {
    const items = itemsRef.current;
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, '#080510'); bg.addColorStop(0.5, '#100808'); bg.addColorStop(1, '#080510');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    // Subtle radial glow
    const glow = ctx.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, W * 0.45);
    glow.addColorStop(0, 'rgba(245,158,11,0.07)'); glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H);
    // Connection lines
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const dx = (items[i].x - items[j].x) * W, dy = (items[i].y - items[j].y) * H;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.strokeStyle = `rgba(245,158,11,${(1 - dist / 130) * 0.1})`;
          ctx.lineWidth = 0.7; ctx.beginPath();
          ctx.moveTo(items[i].x * W, items[i].y * H); ctx.lineTo(items[j].x * W, items[j].y * H); ctx.stroke();
        }
      }
    }
    // Items
    items.forEach(it => {
      it.x += it.vx; it.y += it.vy; it.ph += 0.018;
      if (it.x < 0.03) it.vx = Math.abs(it.vx); if (it.x > 0.97) it.vx = -Math.abs(it.vx);
      if (it.y < 0.05) it.vy = Math.abs(it.vy); if (it.y > 0.92) it.vy = -Math.abs(it.vy);
      const px = it.x * W, py = it.y * H + Math.sin(it.ph) * 6;
      const alpha = 0.55 + 0.45 * Math.sin(it.ph);
      ctx.save(); ctx.globalAlpha = alpha;
      ctx.font = `${it.size}px serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(it.item, px, py); ctx.restore();
    });
    // Pulsing center circle
    const pr = 28 + Math.sin(t * 2) * 4;
    ctx.strokeStyle = `rgba(245,158,11,${0.25 + Math.sin(t * 2) * 0.1})`; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(W * 0.5, H * 0.5, pr, 0, Math.PI * 2); ctx.stroke();
    ctx.font = `700 ${W > 500 ? 11 : 9}px Outfit,sans-serif`; ctx.fillStyle = '#F59E0B';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('PACK', W * 0.5, H * 0.5 - 6); ctx.fillText('LIST', W * 0.5, H * 0.5 + 6);
  });
  return <canvas ref={ref} style={{ width:'100%', height:'100%', display:'block' }} aria-label="Animated packing list showing essential items for a Dubai desert safari" />;
}

// ─── BLOG 03: UV SUN + SUNSCREEN SHIELD ───────────────────────
export function BlogAnim_UVSun() {
  const ref = useCanvas((ctx, W, H, t) => {
    ctx.fillStyle = '#040208'; ctx.fillRect(0, 0, W, H);
    const bg = ctx.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#030108'); bg.addColorStop(0.5, '#120a02'); bg.addColorStop(1, '#3a1200');
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
    // Main sun
    const sx = W * 0.36, sy = H * 0.44, sr = Math.min(W, H) * 0.18;
    const pulseR = sr * (1 + Math.sin(t * 1.8) * 0.05);
    // Glow layers
    [[0.45, 0.06], [0.38, 0.12], [0.28, 0.25]].forEach(([mult, alpha]) => {
      const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, pulseR * mult * 5);
      g.addColorStop(0, `rgba(255,180,20,${alpha})`); g.addColorStop(1, 'transparent');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    });
    ctx.fillStyle = 'rgba(255,220,40,0.95)'; ctx.beginPath(); ctx.arc(sx, sy, pulseR, 0, Math.PI * 2); ctx.fill();
    // UV rays
    for (let i = 0; i < 16; i++) {
      const a = i / 16 * Math.PI * 2 + t * 0.3;
      const inner = pulseR * 1.15, outer = pulseR * (1.6 + Math.sin(t * 2 + i) * 0.2);
      ctx.strokeStyle = `rgba(255,200,30,${0.35 + Math.sin(t * 1.5 + i) * 0.15})`; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(sx + Math.cos(a) * inner, sy + Math.sin(a) * inner); ctx.lineTo(sx + Math.cos(a) * outer, sy + Math.sin(a) * outer); ctx.stroke();
    }
    // UV label on sun
    ctx.font = `900 ${W > 500 ? 18 : 14}px Outfit,sans-serif`; ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('UV', sx, sy - 6); ctx.fillText('11+', sx, sy + 10);
    // Sunscreen shield
    const shieldX = W * 0.72, shieldY = H * 0.44;
    const shieldR = Math.min(W, H) * 0.14;
    const shieldPulse = 1 + Math.sin(t * 2.2 + 1) * 0.04;
    // Shield glow
    const sg = ctx.createRadialGradient(shieldX, shieldY, 0, shieldX, shieldY, shieldR * shieldPulse * 2.5);
    sg.addColorStop(0, 'rgba(100,200,255,0.15)'); sg.addColorStop(1, 'transparent');
    ctx.fillStyle = sg; ctx.fillRect(0, 0, W, H);
    // Shield shape
    ctx.beginPath(); ctx.arc(shieldX, shieldY, shieldR * shieldPulse, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(100,200,255,0.18)'; ctx.fill();
    ctx.strokeStyle = 'rgba(100,200,255,0.6)'; ctx.lineWidth = 2; ctx.stroke();
    // Blocking rays (red X's crossing toward shield)
    for (let i = 0; i < 5; i++) {
      const progress = ((t * 0.5 + i * 0.2) % 1);
      const rx = sx + (shieldX - sx) * progress; const ry = sy + (Math.sin(i * 2.4) * H * 0.15) * (1 - progress) + (shieldY - sy) * progress;
      if (progress > 0.85) { // blocked
        ctx.strokeStyle = `rgba(255,80,80,${(1 - progress) * 8})`; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(rx - 6, ry - 6); ctx.lineTo(rx + 6, ry + 6); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(rx + 6, ry - 6); ctx.lineTo(rx - 6, ry + 6); ctx.stroke();
      } else {
        ctx.fillStyle = `rgba(255,200,30,${0.6 - progress * 0.3})`; ctx.beginPath(); ctx.arc(rx, ry, 4, 0, Math.PI * 2); ctx.fill();
      }
    }
    ctx.font = `700 ${W > 500 ? 12 : 10}px Outfit,sans-serif`; ctx.fillStyle = 'rgba(100,200,255,0.9)';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('SPF', shieldX, shieldY - 7); ctx.fillText('50+', shieldX, shieldY + 8);
    // Dune ground
    ctx.fillStyle = '#4a1800'; ctx.beginPath(); ctx.moveTo(0, H);
    for (let x = 0; x <= W; x += 8) { ctx.lineTo(x, H * 0.78 + Math.sin(x * 0.01 + t * 0.2) * 12 + Math.cos(x * 0.02) * 8); }
    ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
    // Labels
    ctx.font = `600 ${W > 500 ? 11 : 9}px Outfit,sans-serif`; ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255,200,30,0.7)'; ctx.fillText('EXTREME UV', sx, H * 0.82);
    ctx.fillStyle = 'rgba(100,200,255,0.7)'; ctx.fillText('YOUR PROTECTION', shieldX, H * 0.82);
  });
  return <canvas ref={ref} style={{ width:'100%', height:'100%', display:'block' }} aria-label="Animation showing extreme UV rays blocked by SPF 50+ sunscreen shield in the Dubai desert" />;
}

// ─── BLOG 04: FAMILY DESERT — kids on camel, parent watching ──
export function BlogAnim_FamilyDesert() {
  const starsRef = useRef(Array.from({length:80}, () => ({ x:Math.random(), y:Math.random()*0.45, s:0.4+Math.random()*1.2, a:0.1+Math.random()*0.4, ph:Math.random()*Math.PI*2 })));
  const ref = useCanvas((ctx, W, H, t) => {
    const stars = starsRef.current;
    // Sky
    const sky = ctx.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, '#020308'); sky.addColorStop(0.45, '#0D0A18'); sky.addColorStop(0.7, '#200D02'); sky.addColorStop(1, '#7A2800');
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
    // Dune
    ctx.fillStyle = '#7A2800'; ctx.beginPath(); ctx.moveTo(0, H);
    for (let x = 0; x <= W; x += 6) { ctx.lineTo(x, H * 0.62 + Math.sin(x * 0.009 + t * 0.18) * 18 + Math.cos(x * 0.022) * 10); }
    ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#5A1C00'; ctx.beginPath(); ctx.moveTo(0, H);
    for (let x = 0; x <= W; x += 6) { ctx.lineTo(x, H * 0.74 + Math.sin(x * 0.012 + t * 0.12 + 1) * 12); }
    ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
    stars.forEach(s => { ctx.fillStyle = `rgba(255,255,255,${s.a * (0.5 + 0.5 * Math.sin(t * 1.3 + s.ph))})`; ctx.beginPath(); ctx.arc(s.x * W, s.y * H, s.s, 0, Math.PI * 2); ctx.fill(); });
    // Sunset glow
    const sg = ctx.createRadialGradient(W * 0.5, H * 0.65, 0, W * 0.5, H * 0.65, W * 0.4); sg.addColorStop(0, 'rgba(245,130,20,0.45)'); sg.addColorStop(1, 'transparent');
    ctx.fillStyle = sg; ctx.fillRect(0, 0, W, H);

    // CAMEL with 2 kids
    const camX = W * (0.35 + Math.sin(t * 0.25) * 0.08), camY = H * 0.73;
    ctx.save(); ctx.translate(camX, camY);
    // Body
    const cbg = ctx.createRadialGradient(0, -12, 5, 0, -12, 32);
    cbg.addColorStop(0, '#C07030'); cbg.addColorStop(1, '#7A3E10');
    ctx.fillStyle = cbg; ctx.beginPath(); ctx.ellipse(0, -12, 34, 18, 0, 0, Math.PI * 2); ctx.fill();
    // Humps
    ctx.fillStyle = '#A35A20'; [[-8, -28, 13, 11], [10, -26, 11, 9]].forEach(([ex, ey, rx, ry]) => { ctx.beginPath(); ctx.ellipse(ex, ey, rx, ry, 0, 0, Math.PI * 2); ctx.fill(); });
    // Neck + head
    ctx.strokeStyle = '#9B4E18'; ctx.lineWidth = 9; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(26, -12); ctx.lineTo(36, 2); ctx.stroke();
    ctx.fillStyle = '#B05C1C'; ctx.beginPath(); ctx.ellipse(36, 0, 11, 8, 0.3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#1a1a1a'; ctx.beginPath(); ctx.arc(41, -2, 2.2, 0, Math.PI * 2); ctx.fill();
    // Legs with walk cycle
    [-22, -10, 8, 20].forEach((lx, i) => { const ph = t * 2.8 + (i % 2) * Math.PI; const k = Math.sin(ph) * 10; ctx.strokeStyle = '#7A3010'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(lx, 5); ctx.lineTo(lx + k * 0.3, 18 + Math.abs(k) * 0.3); ctx.lineTo(lx + k * 0.5, 30); ctx.stroke(); });
    // Kid 1 on front hump (smaller, happy)
    ctx.fillStyle = 'rgba(255,220,180,0.9)'; ctx.beginPath(); ctx.arc(-8, -40, 7, 0, Math.PI * 2); ctx.fill(); // head
    ctx.fillStyle = '#E05030'; ctx.fillRect(-10, -34, 10, 14); // body
    // Tiny arms waving up
    ctx.strokeStyle = '#E05030'; ctx.lineWidth = 3; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-10, -30); ctx.lineTo(-20, -38 + Math.sin(t * 3) * 5); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, -30); ctx.lineTo(8, -38 + Math.cos(t * 3) * 5); ctx.stroke();
    // Kid 2 on back hump
    ctx.fillStyle = 'rgba(255,220,180,0.9)'; ctx.beginPath(); ctx.arc(10, -38, 7, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#3060E0'; ctx.fillRect(8, -32, 10, 14);
    ctx.strokeStyle = '#3060E0'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(8, -28); ctx.lineTo(0, -36 + Math.sin(t * 2.5 + 1) * 4); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(18, -28); ctx.lineTo(26, -36 + Math.cos(t * 2.5) * 4); ctx.stroke();
    ctx.restore();

    // Parent silhouette standing + waving (right side)
    const px2 = W * 0.72, py2 = H * 0.73;
    ctx.save(); ctx.translate(px2, py2);
    ctx.fillStyle = 'rgba(15, 8, 0, 0.88)';
    ctx.beginPath(); ctx.arc(0, -55, 10, 0, Math.PI * 2); ctx.fill(); // head
    ctx.fillRect(-8, -45, 16, 30); // body
    ctx.fillRect(-7, -16, 6, 22); ctx.fillRect(1, -16, 6, 22); // legs
    // Waving arm
    ctx.strokeStyle = 'rgba(15, 8, 0, 0.88)'; ctx.lineWidth = 6; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(8, -35); ctx.lineTo(20, -50 + Math.sin(t * 3) * 8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-8, -35); ctx.lineTo(-12, -22); ctx.stroke();
    ctx.restore();

    // Happy emoji bursts from kids
    ['😄', '🎉', '⭐', '😊'].forEach((e, i) => {
      const ex = camX + Math.cos(t * 1.5 + i * Math.PI * 0.5) * 45;
      const ey = camY - 55 + Math.sin(t * 2 + i) * 20 - t * 2 % 60;
      const alpha = 0.4 + 0.4 * Math.sin(t * 2 + i);
      ctx.save(); ctx.globalAlpha = alpha; ctx.font = `${W > 500 ? 14 : 11}px serif`;
      ctx.textAlign = 'center'; ctx.fillText(e, ex, ey); ctx.restore();
    });

    // Safety badge bottom
    const badgeX = W * 0.5, badgeY = H * 0.92;
    ctx.fillStyle = 'rgba(16,185,129,0.12)'; ctx.strokeStyle = 'rgba(16,185,129,0.35)'; ctx.lineWidth = 1;
    if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(badgeX - 90, badgeY - 12, 180, 24, 12); ctx.fill(); ctx.stroke(); }
    ctx.font = `600 ${W > 500 ? 11 : 9}px Outfit,sans-serif`; ctx.fillStyle = '#10B981';
    ctx.textAlign = 'center'; ctx.fillText('✅ Certified Safe for Children from Age 4+', badgeX, badgeY + 4);
  });
  return <canvas ref={ref} style={{ width:'100%', height:'100%', display:'block' }} aria-label="Animation showing two children happily riding a camel in the Dubai desert with a parent watching" />;
}

// ─── BLOG 05: MORNING vs EVENING SPLIT SCREEN ────────────────
export function BlogAnim_MorningVsEvening() {
  const ref = useCanvas((ctx, W, H, t) => {
    const mid = W * 0.5;
    // LEFT SIDE — Morning (sunrise, cool blue/gold)
    const mornSky = ctx.createLinearGradient(0, 0, 0, H);
    mornSky.addColorStop(0, '#010A1A'); mornSky.addColorStop(0.4, '#0A2040'); mornSky.addColorStop(0.7, '#C06010'); mornSky.addColorStop(1, '#8B3200');
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, mid, H); ctx.clip();
    ctx.fillStyle = mornSky; ctx.fillRect(0, 0, mid, H);
    // Morning stars (fading)
    for (let i = 0; i < 30; i++) { const a = 0.15 + Math.sin(t * 0.4 + i) * 0.1; ctx.fillStyle = `rgba(255,255,255,${a})`; ctx.beginPath(); ctx.arc((i * 137) % mid, (i * 73) % (H * 0.45), 0.8, 0, Math.PI * 2); ctx.fill(); }
    // Sunrise
    const sunRise = Math.min(1, t * 0.06); const sunY = H * (0.7 - sunRise * 0.25);
    const sunG = ctx.createRadialGradient(mid * 0.5, sunY, 0, mid * 0.5, sunY, 55);
    sunG.addColorStop(0, 'rgba(255,220,100,0.9)'); sunG.addColorStop(0.4, 'rgba(255,150,30,0.4)'); sunG.addColorStop(1, 'transparent');
    ctx.fillStyle = sunG; ctx.fillRect(0, 0, mid, H);
    ctx.fillStyle = 'rgba(255,210,80,0.85)'; ctx.beginPath(); ctx.arc(mid * 0.5, sunY, 18 + Math.sin(t * 2) * 2, 0, Math.PI * 2); ctx.fill();
    // Morning dune
    ctx.fillStyle = '#6B2200'; ctx.beginPath(); ctx.moveTo(0, H);
    for (let x = 0; x <= mid; x += 5) { ctx.lineTo(x, H * 0.65 + Math.sin(x * 0.012 + t * 0.15) * 14 + Math.cos(x * 0.025) * 8); }
    ctx.lineTo(mid, H); ctx.closePath(); ctx.fill();
    // Morning temp badge
    ctx.fillStyle = 'rgba(100,180,255,0.15)'; ctx.strokeStyle = 'rgba(100,180,255,0.4)'; ctx.lineWidth = 1;
    if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(12, H * 0.08, 90, 22, 11); ctx.fill(); ctx.stroke(); }
    ctx.font = `700 11px Outfit,sans-serif`; ctx.fillStyle = 'rgba(100,180,255,0.9)'; ctx.textAlign = 'center'; ctx.fillText('🌅 20–25°C', 57, H * 0.09 + 11);
    // Label
    ctx.font = `700 ${W > 500 ? 14 : 11}px Outfit,sans-serif`; ctx.fillStyle = 'rgba(255,200,80,0.9)'; ctx.textAlign = 'center'; ctx.fillText('MORNING SAFARI', mid * 0.5, H * 0.86);
    ctx.font = `400 ${W > 500 ? 11 : 9}px Outfit,sans-serif`; ctx.fillStyle = 'rgba(255,255,255,0.45)'; ctx.fillText('4:30 AM pickup · Sunrise', mid * 0.5, H * 0.93);
    ctx.restore();

    // RIGHT SIDE — Evening (orange/amber sunset)
    const eveSky = ctx.createLinearGradient(0, 0, 0, H);
    eveSky.addColorStop(0, '#050210'); eveSky.addColorStop(0.35, '#0D0600'); eveSky.addColorStop(0.65, '#2A1000'); eveSky.addColorStop(1, '#C1460E');
    ctx.save(); ctx.beginPath(); ctx.rect(mid, 0, mid, H); ctx.clip();
    ctx.fillStyle = eveSky; ctx.fillRect(mid, 0, mid, H);
    // Stars
    for (let i = 0; i < 50; i++) { ctx.fillStyle = `rgba(255,255,255,${0.08 + Math.sin(t * 1.4 + i) * 0.07})`; ctx.beginPath(); ctx.arc(mid + (i * 173) % mid, (i * 89) % (H * 0.52), 0.65, 0, Math.PI * 2); ctx.fill(); }
    // Sunset
    const sunG2 = ctx.createRadialGradient(mid * 1.5, H * 0.62, 0, mid * 1.5, H * 0.62, W * 0.3);
    sunG2.addColorStop(0, 'rgba(245,120,20,0.55)'); sunG2.addColorStop(0.3, 'rgba(200,70,10,0.2)'); sunG2.addColorStop(1, 'transparent');
    ctx.fillStyle = sunG2; ctx.fillRect(mid, 0, mid, H);
    // Evening dune
    ctx.fillStyle = '#8B2800'; ctx.beginPath(); ctx.moveTo(mid, H);
    for (let x = mid; x <= W; x += 5) { ctx.lineTo(x, H * 0.58 + Math.sin((x - mid) * 0.01 + t * 0.22) * 18 + Math.cos((x - mid) * 0.02) * 10); }
    ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
    // Evening temp badge
    ctx.fillStyle = 'rgba(245,158,11,0.12)'; ctx.strokeStyle = 'rgba(245,158,11,0.38)'; ctx.lineWidth = 1;
    if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(W - 102, H * 0.08, 90, 22, 11); ctx.fill(); ctx.stroke(); }
    ctx.font = `700 11px Outfit,sans-serif`; ctx.fillStyle = 'rgba(245,158,11,0.9)'; ctx.textAlign = 'center'; ctx.fillText('🌆 30–38°C', W - 57, H * 0.09 + 11);
    ctx.font = `700 ${W > 500 ? 14 : 11}px Outfit,sans-serif`; ctx.fillStyle = 'rgba(245,158,11,0.9)'; ctx.fillText('EVENING SAFARI', mid + mid * 0.5, H * 0.86);
    ctx.font = `400 ${W > 500 ? 11 : 9}px Outfit,sans-serif`; ctx.fillStyle = 'rgba(255,255,255,0.45)'; ctx.fillText('3:00 PM pickup · Sunset + BBQ', mid + mid * 0.5, H * 0.93);
    ctx.restore();

    // Divider line with VS
    ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.lineWidth = 1; ctx.setLineDash([6, 6]);
    ctx.beginPath(); ctx.moveTo(mid, 0); ctx.lineTo(mid, H); ctx.stroke(); ctx.setLineDash([]);
    // VS badge
    const vsBg = ctx.createLinearGradient(mid - 22, H * 0.46, mid + 22, H * 0.54);
    vsBg.addColorStop(0, '#1a3060'); vsBg.addColorStop(1, '#601a10');
    ctx.fillStyle = vsBg; ctx.beginPath(); ctx.arc(mid, H * 0.5, 22, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.25)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(mid, H * 0.5, 22, 0, Math.PI * 2); ctx.stroke();
    ctx.font = `900 ${W > 500 ? 14 : 11}px Outfit,sans-serif`; ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('VS', mid, H * 0.5);
  });
  return <canvas ref={ref} style={{ width:'100%', height:'100%', display:'block' }} aria-label="Side-by-side comparison of morning and evening desert safari showing sunrise vs sunset, temperature and timing differences" />;
}

// ─── BLOG 06: TENT UNDER STARS (overnight) ────────────────────
export function BlogAnim_OvernightTent() {
  const fireRef = useRef(Array.from({length:50}, () => ({ x:0, y:0, vx:0, vy:0, a:0, s:3, life:0, active:false, r:218, g:90 })));
  const starsRef = useRef(Array.from({length:260}, () => ({ x:Math.random(), y:Math.random()*0.65, s:0.3+Math.random()*1.8, a:0.1+Math.random()*0.7, ph:Math.random()*Math.PI*2 })));
  const ref = useCanvas((ctx, W, H, t) => {
    const fire = fireRef.current; const stars = starsRef.current;
    // Deep night sky
    const sky = ctx.createLinearGradient(0, 0, 0, H); sky.addColorStop(0, '#000002'); sky.addColorStop(0.5, '#020108'); sky.addColorStop(0.75, '#08040A'); sky.addColorStop(1, '#0A0408');
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
    // Milky way band
    ctx.save(); ctx.translate(W * 0.5, H * 0.35); ctx.rotate(-0.3);
    const mw = ctx.createLinearGradient(-W * 0.6, -30, W * 0.6, 30); mw.addColorStop(0, 'transparent'); mw.addColorStop(0.3, 'rgba(180,160,220,0.05)'); mw.addColorStop(0.5, 'rgba(200,180,255,0.1)'); mw.addColorStop(0.7, 'rgba(180,160,220,0.05)'); mw.addColorStop(1, 'transparent');
    ctx.fillStyle = mw; ctx.fillRect(-W * 0.6, -40, W * 1.2, 80); ctx.restore();
    // Stars
    stars.forEach(s => { const a = s.a * (0.4 + 0.6 * Math.sin(t * 1.3 + s.ph)); ctx.fillStyle = `rgba(255,255,255,${a})`; ctx.beginPath(); ctx.arc(s.x * W, s.y * H, s.s, 0, Math.PI * 2); ctx.fill(); });
    // Ground
    ctx.fillStyle = '#080405'; ctx.fillRect(0, H * 0.68, W, H * 0.32);
    // Dune edge
    ctx.fillStyle = '#120608'; ctx.beginPath(); ctx.moveTo(0, H);
    for (let x = 0; x <= W; x += 8) { ctx.lineTo(x, H * 0.68 + Math.sin(x * 0.006 + t * 0.08) * 10 + Math.cos(x * 0.014) * 6); }
    ctx.lineTo(W, H); ctx.closePath(); ctx.fill();

    // Bedouin tent (center)
    const tentX = W * 0.5, tentY = H * 0.7;
    ctx.fillStyle = 'rgba(35,15,5,0.95)';
    ctx.beginPath(); ctx.moveTo(tentX - W * 0.18, tentY); ctx.lineTo(tentX, tentY - H * 0.18); ctx.lineTo(tentX + W * 0.18, tentY); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(180,100,20,0.5)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(tentX - W * 0.18, tentY); ctx.lineTo(tentX, tentY - H * 0.18); ctx.lineTo(tentX + W * 0.18, tentY); ctx.stroke();
    // Tent door glow
    const doorG = ctx.createRadialGradient(tentX, tentY - 5, 0, tentX, tentY - 5, 30);
    doorG.addColorStop(0, 'rgba(245,158,11,0.35)'); doorG.addColorStop(1, 'transparent');
    ctx.fillStyle = doorG; ctx.fillRect(tentX - 30, tentY - 30, 60, 40);
    // Tent pole
    ctx.strokeStyle = 'rgba(160,80,10,0.7)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(tentX, tentY - H * 0.18 - 10); ctx.lineTo(tentX, tentY - H * 0.18 + 10); ctx.stroke();

    // Campfire in front of tent
    const fx = tentX, fy = H * 0.78;
    for (let i = 0; i < 4; i++) { const p = fire.find(p => !p.active); if (!p) break; p.x = fx + (Math.random() - 0.5) * 10; p.y = fy; p.vx = (Math.random() - 0.5) * 0.7; p.vy = -(1.3 + Math.random() * 1.8); p.a = 0.8; p.s = 2.5 + Math.random() * 4; p.life = 1; p.active = true; p.r = 215 + Math.floor(Math.random() * 40); p.g = 80 + Math.floor(Math.random() * 80); }
    fire.forEach(p => { if (!p.active) return; p.x += p.vx; p.y += p.vy; p.vy += 0.05; p.life -= 0.028; if (p.life <= 0) { p.active = false; return; } ctx.fillStyle = `rgba(${p.r},${p.g},15,${p.life * p.a})`; ctx.beginPath(); ctx.arc(p.x, p.y, p.s * p.life, 0, Math.PI * 2); ctx.fill(); });
    const fg = ctx.createRadialGradient(fx, fy, 0, fx, fy, 50); fg.addColorStop(0, `rgba(215,90,15,${0.2 + Math.sin(t * 4) * 0.07})`); fg.addColorStop(1, 'transparent');
    ctx.fillStyle = fg; ctx.fillRect(fx - 50, fy - 50, 100, 80);
    // Logs
    ctx.strokeStyle = '#3A1800'; ctx.lineWidth = 6; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(fx - 18, fy); ctx.lineTo(fx + 7, fy - 7); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(fx + 18, fy); ctx.lineTo(fx - 7, fy - 7); ctx.stroke();

    // Sleeping figure inside tent silhouette
    ctx.fillStyle = 'rgba(245,158,11,0.15)';
    ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(tentX - 22, tentY - 8, 44, 10, 5); else ctx.rect(tentX - 22, tentY - 8, 44, 10);
    ctx.fill();

    // Shooting star
    const ssh = (t * 0.22) % 1; if (ssh < 0.4) { const sx = W * (0.1 + ssh * 0.7), sy = H * (0.05 + ssh * 0.25); const gl = ctx.createLinearGradient(sx - 65, sy - 20, sx, sy); gl.addColorStop(0, 'transparent'); gl.addColorStop(1, 'rgba(255,255,255,0.8)'); ctx.strokeStyle = gl; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(sx - 65, sy - 20); ctx.lineTo(sx, sy); ctx.stroke(); }

    // Temperature overnight label
    ctx.fillStyle = 'rgba(100,180,255,0.1)'; ctx.strokeStyle = 'rgba(100,180,255,0.3)'; ctx.lineWidth = 1;
    if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(14, H * 0.1, 110, 24, 12); ctx.fill(); ctx.stroke(); }
    ctx.font = `600 10px Outfit,sans-serif`; ctx.fillStyle = 'rgba(100,180,255,0.8)'; ctx.textAlign = 'center'; ctx.fillText('🌡️ Night drops to 15°C', 69, H * 0.11 + 12);

    // Stars count bottom
    ctx.font = `600 ${W > 500 ? 11 : 9}px Outfit,sans-serif`; ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.textAlign = 'center'; ctx.fillText('Zero light pollution — 3,000+ visible stars', W * 0.5, H * 0.96);
  });
  return <canvas ref={ref} style={{ width:'100%', height:'100%', display:'block' }} aria-label="Animation of a Bedouin tent under a star-filled Milky Way sky during an overnight desert safari" />;
}

// ─── BLOG 07: WILDLIFE DOTS — oryx, gazelle, falcon ──────────
export function BlogAnim_WildlifeDots() {
  const oryxRef = useRef({ x: 0.15, y: 0.72, vx: 0.0018, phase: 0 });
  const gazRef  = useRef({ x: 0.65, y: 0.76, vx: -0.0012, phase: 1.5 });
  const falcRef = useRef({ x: 0.5, y: 0.25, angle: 0 });
  const dotGrid = useRef(Array.from({length:120}, (_, i) => ({ x: (i % 12) / 12 + 0.04, y: 0.05 + Math.floor(i / 12) * 0.065, a: 0.06 + Math.random() * 0.14, s: 0.8 + Math.random() * 1.2, ph: Math.random() * Math.PI * 2 })));
  const ref = useCanvas((ctx, W, H, t) => {
    const oryx = oryxRef.current; const gaz = gazRef.current; const falc = falcRef.current;
    ctx.fillStyle = '#030608'; ctx.fillRect(0, 0, W, H);
    // Map background — terrain dots
    dotGrid.current.forEach(d => { d.ph += 0.012; const a = d.a * (0.7 + 0.3 * Math.sin(d.ph)); ctx.fillStyle = `rgba(80,180,120,${a})`; ctx.beginPath(); ctx.arc(d.x * W, d.y * H, d.s, 0, Math.PI * 2); ctx.fill(); });
    // Conservation reserve boundary
    ctx.strokeStyle = 'rgba(80,180,120,0.3)'; ctx.lineWidth = 1.5; ctx.setLineDash([8, 12]);
    ctx.beginPath(); ctx.rect(W * 0.06, H * 0.06, W * 0.88, H * 0.84); ctx.stroke(); ctx.setLineDash([]);
    // Reserve label
    ctx.font = `500 ${W > 500 ? 10 : 9}px Outfit,sans-serif`; ctx.fillStyle = 'rgba(80,180,120,0.5)';
    ctx.textAlign = 'center'; ctx.fillText('DUBAI DESERT CONSERVATION RESERVE — 225 km²', W * 0.5, H * 0.04);
    // Dune terrain overlay
    const dg = ctx.createLinearGradient(0, H * 0.55, 0, H);
    dg.addColorStop(0, 'rgba(80,40,10,0.35)'); dg.addColorStop(1, 'rgba(50,20,5,0.6)');
    ctx.fillStyle = dg; ctx.beginPath(); ctx.moveTo(0, H);
    for (let x = 0; x <= W; x += 8) { ctx.lineTo(x, H * 0.58 + Math.sin(x * 0.009 + t * 0.1) * 16 + Math.cos(x * 0.02) * 10); }
    ctx.lineTo(W, H); ctx.closePath(); ctx.fill();

    // ARABIAN ORYX
    oryx.phase += 0.03; oryx.x += oryx.vx; if (oryx.x > 0.82) oryx.vx = -Math.abs(oryx.vx); if (oryx.x < 0.1) oryx.vx = Math.abs(oryx.vx);
    const ox = oryx.x * W, oy = H * 0.73;
    ctx.save(); ctx.translate(ox, oy); if (oryx.vx < 0) ctx.scale(-1, 1);
    ctx.fillStyle = 'rgba(240,230,210,0.88)';
    ctx.beginPath(); ctx.ellipse(0, -14, 22, 12, 0, 0, Math.PI * 2); ctx.fill(); // body
    ctx.beginPath(); ctx.ellipse(18, -20, 10, 7, 0.3, 0, Math.PI * 2); ctx.fill(); // head
    ctx.strokeStyle = 'rgba(180,160,130,0.9)'; ctx.lineWidth = 4; ctx.lineCap = 'round';
    // Horns (spiral)
    ctx.beginPath(); ctx.moveTo(20, -26); ctx.lineTo(22, -42); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(16, -26); ctx.lineTo(17, -41); ctx.stroke();
    // Legs
    [-10, -2, 6, 14].forEach((lx, i) => { const ph = oryx.phase + (i % 2) * Math.PI; ctx.strokeStyle = 'rgba(200,180,150,0.8)'; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(lx, -2); ctx.lineTo(lx + Math.sin(ph) * 4, 14); ctx.stroke(); });
    ctx.restore();
    // Oryx label
    ctx.font = `600 ${W > 500 ? 11 : 9}px Outfit,sans-serif`; ctx.fillStyle = 'rgba(240,230,210,0.7)';
    ctx.textAlign = 'center'; ctx.fillText('🦌 Arabian Oryx', ox, oy + 22);

    // ARABIAN GAZELLE
    gaz.phase += 0.04; gaz.x += gaz.vx; if (gaz.x > 0.88) gaz.vx = -Math.abs(gaz.vx); if (gaz.x < 0.06) gaz.vx = Math.abs(gaz.vx);
    const gx = gaz.x * W, gy = H * 0.78 + Math.sin(gaz.phase * 2) * 5;
    ctx.save(); ctx.translate(gx, gy); if (gaz.vx > 0) ctx.scale(-1, 1);
    ctx.fillStyle = 'rgba(200,160,100,0.85)';
    ctx.beginPath(); ctx.ellipse(0, -10, 14, 8, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(12, -15, 7, 5, 0.3, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(200,160,100,0.8)'; ctx.lineWidth = 2.5; ctx.lineCap = 'round';
    [-6, 0, 6, 11].forEach((lx, i) => { const ph = gaz.phase + (i % 2) * Math.PI; ctx.beginPath(); ctx.moveTo(lx, -2); ctx.lineTo(lx + Math.sin(ph) * 3, 10); ctx.stroke(); });
    // Small horns
    ctx.beginPath(); ctx.moveTo(14, -19); ctx.lineTo(16, -28); ctx.stroke();
    ctx.restore();
    ctx.font = `600 ${W > 500 ? 10 : 8}px Outfit,sans-serif`; ctx.fillStyle = 'rgba(200,160,100,0.65)';
    ctx.textAlign = 'center'; ctx.fillText('🦌 Arabian Gazelle', gx, gy + 18);

    // FALCON circling overhead
    falc.angle += 0.022; const falcR = W * 0.18;
    const falcX = W * 0.5 + Math.cos(falc.angle) * falcR;
    const falcY = H * 0.22 + Math.sin(falc.angle) * falcR * 0.35;
    ctx.save(); ctx.translate(falcX, falcY); ctx.rotate(falc.angle + Math.PI * 0.5);
    ctx.fillStyle = 'rgba(80,60,40,0.9)';
    ctx.beginPath(); ctx.ellipse(0, 0, 12, 5, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-2, 0); ctx.lineTo(-14, 6); ctx.lineTo(-10, 0); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-2, 0); ctx.lineTo(-14, -6); ctx.lineTo(-10, 0); ctx.closePath(); ctx.fill();
    ctx.restore();
    ctx.font = `600 ${W > 500 ? 10 : 8}px Outfit,sans-serif`; ctx.fillStyle = 'rgba(180,150,100,0.65)';
    ctx.textAlign = 'center'; ctx.fillText('🦅 Peregrine Falcon', falcX, falcY - 16);

    // Species count badge
    ctx.fillStyle = 'rgba(80,180,120,0.1)'; ctx.strokeStyle = 'rgba(80,180,120,0.3)'; ctx.lineWidth = 1;
    if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(W - 148, H * 0.1, 135, 50, 12); ctx.fill(); ctx.stroke(); }
    ctx.font = `700 ${W > 500 ? 11 : 9}px Outfit,sans-serif`; ctx.fillStyle = 'rgba(80,180,120,0.9)';
    ctx.textAlign = 'center'; ctx.fillText('Reserve Wildlife', W - 80, H * 0.12 + 10);
    ctx.font = `400 ${W > 500 ? 10 : 8}px Outfit,sans-serif`; ctx.fillStyle = 'rgba(255,255,255,0.45)';
    ctx.fillText('50+ species · 225 km²', W - 80, H * 0.12 + 24);
    ctx.fillText('Est. 2003 — protected by law', W - 80, H * 0.12 + 38);
  });
  return <canvas ref={ref} style={{ width:'100%', height:'100%', display:'block' }} aria-label="Animation of Dubai Desert Conservation Reserve showing Arabian oryx, gazelles and falcons in their natural habitat" />;
}
