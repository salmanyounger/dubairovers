'use client';
import { useEffect, useRef } from 'react';

// ════════════════════════════════════════════════════════════════════════════
//  BLOG ANIMATION — "The Editorial Universe"
//  Golden ink particles + typewriter + floating books + star constellation
// ════════════════════════════════════════════════════════════════════════════
export function BlogAnimation() {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Particles
    const PARTICLE_COUNT = 120;
    const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0004,
      vy: (Math.random() - 0.5) * 0.0004,
      size: 0.5 + Math.random() * 2.5,
      alpha: 0.1 + Math.random() * 0.6,
      pulse: Math.random() * Math.PI * 2,
      type: i % 8, // 0-4 = dots, 5 = quill, 6 = book, 7 = star
    }));

    // Ink trails (line connections between nearby particles)
    // Typewriter
    const WORDS = [
      'Desert Adventures', 'Luxury Experiences', 'Hidden Gems',
      'Travel Stories',    'Dubai Culture',      'Insider Tips',
    ];
    let wordIdx = 0, charIdx = 0, typing = true, pauseFrames = 0;

    function resize() {
      canvas.width  = canvas.offsetWidth  || 1200;
      canvas.height = canvas.offsetHeight || 420;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let t = 0;
    function draw() {
      t += 0.012;
      const W = canvas.width, H = canvas.height;

      // Background — deep editorial dark
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, '#080610');
      bg.addColorStop(0.4, '#0D0A1A');
      bg.addColorStop(0.7, '#120800');
      bg.addColorStop(1, '#080610');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Subtle radial glow in center
      const cg = ctx.createRadialGradient(W * 0.5, H * 0.5, 0, W * 0.5, H * 0.5, W * 0.45);
      cg.addColorStop(0, 'rgba(245,158,11,0.06)');
      cg.addColorStop(1, 'transparent');
      ctx.fillStyle = cg;
      ctx.fillRect(0, 0, W, H);

      // ── Particle connections (ink threads) ──
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = (p.x - q.x) * W, dy = (p.y - q.y) * H;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.12;
            ctx.strokeStyle = `rgba(245,158,11,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x * W, p.y * H);
            ctx.lineTo(q.x * W, q.y * H);
            ctx.stroke();
          }
        }
      }

      // ── Particles ──
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        p.pulse += 0.025;
        if (p.x < 0) p.x = 1; if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1; if (p.y > 1) p.y = 0;

        const px = p.x * W, py = p.y * H;
        const alpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));

        if (p.type <= 4) {
          // Golden dot — varying size
          const r = p.size * (0.8 + 0.2 * Math.sin(p.pulse));
          const pg = ctx.createRadialGradient(px, py, 0, px, py, r * 2.5);
          pg.addColorStop(0, `rgba(245,158,11,${alpha})`);
          pg.addColorStop(0.5, `rgba(245,158,11,${alpha * 0.4})`);
          pg.addColorStop(1, 'transparent');
          ctx.fillStyle = pg;
          ctx.beginPath();
          ctx.arc(px, py, r * 2.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 5) {
          // Floating ✒ quill icon
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(Math.sin(p.pulse * 0.5) * 0.3);
          ctx.globalAlpha = alpha * 0.7;
          ctx.font = `${10 + p.size * 2}px serif`;
          ctx.fillStyle = '#F59E0B';
          ctx.textAlign = 'center';
          ctx.fillText('✒', 0, 0);
          ctx.restore();
        } else if (p.type === 6) {
          // Floating 📖 book
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(Math.sin(p.pulse * 0.4) * 0.2);
          ctx.globalAlpha = alpha * 0.65;
          ctx.font = `${12 + p.size * 2}px serif`;
          ctx.textAlign = 'center';
          ctx.fillText('📖', 0, 0);
          ctx.restore();
        } else {
          // 4-point star
          ctx.save();
          ctx.translate(px, py);
          ctx.rotate(t * 0.4 + p.pulse);
          ctx.globalAlpha = alpha;
          ctx.fillStyle = '#F59E0B';
          const s = p.size * 1.2;
          ctx.beginPath();
          for (let i = 0; i < 8; i++) {
            const a = (i / 8) * Math.PI * 2;
            const r = i % 2 === 0 ? s * 2.5 : s * 0.8;
            ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
          }
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      });

      // ── Floating ink rings (slow orbit rings) ──
      for (let ring = 0; ring < 3; ring++) {
        const rx = W * 0.5, ry = H * 0.5;
        const radius = W * (0.28 + ring * 0.12);
        const alpha = 0.04 + ring * 0.02;
        ctx.strokeStyle = `rgba(245,158,11,${alpha})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 18 + ring * 8]);
        ctx.lineDashOffset = -t * (ring % 2 === 0 ? 18 : -14);
        ctx.beginPath();
        ctx.ellipse(rx, ry, radius, radius * 0.32, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // ── Typewriter headline ──
      if (pauseFrames > 0) {
        pauseFrames--;
      } else {
        if (typing) {
          charIdx++;
          if (charIdx >= WORDS[wordIdx].length + 1) {
            typing = false; pauseFrames = 80;
          }
        } else {
          charIdx--;
          if (charIdx <= 0) {
            wordIdx = (wordIdx + 1) % WORDS.length;
            typing = true; pauseFrames = 20;
          }
        }
      }
      const currentWord = WORDS[wordIdx].slice(0, charIdx);
      const cursor = Math.sin(t * 4) > 0 ? '|' : '';

      ctx.font = `700 ${W > 700 ? 42 : 28}px 'Playfair Display', serif`;
      ctx.textAlign = 'center';
      ctx.fillStyle = '#F59E0B';
      ctx.shadowColor = 'rgba(245,158,11,0.5)';
      ctx.shadowBlur = 18;
      ctx.fillText(currentWord + cursor, W * 0.5, H * 0.44);
      ctx.shadowBlur = 0;

      // Subtitle
      ctx.font = `400 ${W > 700 ? 16 : 13}px 'Outfit', sans-serif`;
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.fillText('Real stories · Honest guides · Dubai insider knowledge', W * 0.5, H * 0.56);

      // Small floating category pills
      const cats = ['🏜️ Desert', '🌊 Marina', '🍽️ Food', '🎈 Sky', '🏙️ City', '🐪 Culture'];
      cats.forEach((cat, i) => {
        const angle = (i / cats.length) * Math.PI * 2 + t * 0.08;
        const orbitR = Math.min(W * 0.36, 200);
        const cx2 = W * 0.5 + Math.cos(angle) * orbitR;
        const cy2 = H * 0.5 + Math.sin(angle) * orbitR * 0.35;
        const alpha2 = 0.3 + 0.3 * Math.sin(t + i);
        ctx.save();
        ctx.globalAlpha = alpha2;
        const tw = ctx.measureText(cat).width + 20;
        ctx.fillStyle = 'rgba(245,158,11,0.12)';
        ctx.strokeStyle = 'rgba(245,158,11,0.3)';
        ctx.lineWidth = 1;
        if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(cx2 - tw / 2, cy2 - 10, tw, 20, 10); ctx.fill(); ctx.stroke(); }
        ctx.font = `600 ${W > 600 ? 11 : 9}px 'Outfit', sans-serif`;
        ctx.fillStyle = '#F59E0B';
        ctx.textAlign = 'center';
        ctx.fillText(cat, cx2, cy2 + 4);
        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
}


// ════════════════════════════════════════════════════════════════════════════
//  CONTACT ANIMATION — "Signal Network"
//  Radar pulse from Dubai · WhatsApp bubbles rising · Golden arcs to cities
// ════════════════════════════════════════════════════════════════════════════
export function ContactAnimation() {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const CITIES = [
      { name: 'London', x: 0.32, y: 0.28 },
      { name: 'Paris',  x: 0.35, y: 0.32 },
      { name: 'Moscow', x: 0.52, y: 0.24 },
      { name: 'Mumbai', x: 0.62, y: 0.48 },
      { name: 'Beijing',x: 0.74, y: 0.34 },
      { name: 'Tokyo',  x: 0.82, y: 0.38 },
      { name: 'NY',     x: 0.10, y: 0.36 },
      { name: 'Toronto',x: 0.12, y: 0.30 },
      { name: 'Sydney', x: 0.80, y: 0.65 },
      { name: 'Cairo',  x: 0.45, y: 0.44 },
      { name: 'Nairobi',x: 0.48, y: 0.56 },
      { name: 'LA',     x: 0.07, y: 0.40 },
    ];

    // Dubai center
    const DUBAI = { x: 0.585, y: 0.45 };

    // Signal arcs — each city sends a pulse toward Dubai
    const arcs = CITIES.map((city, i) => ({
      city,
      progress: (i / CITIES.length),
      speed: 0.003 + Math.random() * 0.002,
      active: false,
      startDelay: i * 42,
      frameCount: 0,
    }));

    // WhatsApp bubbles
    const bubbles = Array.from({ length: 14 }, (_, i) => ({
      x: 0.45 + Math.random() * 0.22,
      y: 0.5 + Math.random() * 0.4,
      vy: -(0.0004 + Math.random() * 0.0005),
      alpha: 0.3 + Math.random() * 0.5,
      size: 12 + Math.random() * 18,
      msg: ['💬', '✅', '🌟', '📞', '💬', '🏜️', '✈️', '💬'][i % 8],
      phase: Math.random() * Math.PI * 2,
    }));

    // Radar pulses
    const radars = [0, 0.33, 0.66].map(phase => ({ phase }));

    function resize() {
      canvas.width  = canvas.offsetWidth  || 1200;
      canvas.height = canvas.offsetHeight || 420;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let t = 0;
    function draw() {
      t += 0.01;
      const W = canvas.width, H = canvas.height;

      // Background — deep teal-black
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, '#030D14');
      bg.addColorStop(0.5, '#060F1A');
      bg.addColorStop(1, '#020A10');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Subtle grid lines (world map feel)
      ctx.strokeStyle = 'rgba(0,200,150,0.03)';
      ctx.lineWidth = 1;
      for (let gx = 0; gx < W; gx += W / 12) {
        ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
      }
      for (let gy = 0; gy < H; gy += H / 6) {
        ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
      }

      const dx = DUBAI.x * W, dy = DUBAI.y * H;

      // ── Radar pulses from Dubai ──
      radars.forEach(r => {
        r.phase = (r.phase + 0.008) % 1;
        const radius = r.phase * W * 0.5;
        const alpha = (1 - r.phase) * 0.18;
        ctx.strokeStyle = `rgba(37,211,102,${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(dx, dy, radius, 0, Math.PI * 2);
        ctx.stroke();
      });

      // ── World dot background ──
      for (let i = 0; i < 80; i++) {
        const dotX = ((i * 173.1 + 50) % W), dotY = ((i * 97.3 + 30) % H);
        ctx.fillStyle = `rgba(0,200,150,${0.04 + Math.sin(t * 0.5 + i) * 0.02})`;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Signal arcs from cities to Dubai ──
      arcs.forEach(arc => {
        arc.frameCount++;
        if (arc.frameCount < arc.startDelay) return;
        arc.progress += arc.speed;
        if (arc.progress > 1.4) { arc.progress = 0; arc.startDelay = 0; }

        const p = Math.min(arc.progress, 1);
        const cx2 = arc.city.x * W, cy2 = arc.city.y * H;
        const midX = (cx2 + dx) / 2;
        const midY = Math.min(cy2, dy) - H * 0.2;

        // Draw arc trail
        const steps = 40;
        for (let i = 0; i < steps * p; i++) {
          const frac = i / steps;
          const px = (1 - frac) * (1 - frac) * cx2 + 2 * (1 - frac) * frac * midX + frac * frac * dx;
          const py = (1 - frac) * (1 - frac) * cy2 + 2 * (1 - frac) * frac * midY + frac * frac * dy;
          const alpha = frac * 0.5 * (1 - Math.abs(p - 0.5) * 0.5);
          ctx.fillStyle = `rgba(37,211,102,${alpha})`;
          ctx.beginPath();
          ctx.arc(px, py, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Leading dot
        if (p < 1) {
          const frac = p;
          const lx = (1 - frac) * (1 - frac) * cx2 + 2 * (1 - frac) * frac * midX + frac * frac * dx;
          const ly = (1 - frac) * (1 - frac) * cy2 + 2 * (1 - frac) * frac * midY + frac * frac * dy;
          const lg = ctx.createRadialGradient(lx, ly, 0, lx, ly, 6);
          lg.addColorStop(0, 'rgba(37,211,102,0.9)');
          lg.addColorStop(1, 'transparent');
          ctx.fillStyle = lg;
          ctx.beginPath();
          ctx.arc(lx, ly, 6, 0, Math.PI * 2);
          ctx.fill();
        }

        // City dot
        ctx.fillStyle = 'rgba(37,211,102,0.4)';
        ctx.beginPath(); ctx.arc(cx2, cy2, 3, 0, Math.PI * 2); ctx.fill();

        // City label
        if (W > 600) {
          ctx.font = '9px sans-serif';
          ctx.fillStyle = 'rgba(255,255,255,0.3)';
          ctx.textAlign = 'center';
          ctx.fillText(arc.city.name, cx2, cy2 - 7);
        }
      });

      // ── Dubai HQ glow ──
      const dg = ctx.createRadialGradient(dx, dy, 0, dx, dy, 55);
      dg.addColorStop(0, 'rgba(37,211,102,0.5)');
      dg.addColorStop(0.3, 'rgba(37,211,102,0.2)');
      dg.addColorStop(1, 'transparent');
      ctx.fillStyle = dg;
      ctx.beginPath(); ctx.arc(dx, dy, 55, 0, Math.PI * 2); ctx.fill();
      // Core dot
      ctx.fillStyle = '#25D366';
      ctx.beginPath(); ctx.arc(dx, dy, 6, 0, Math.PI * 2); ctx.fill();
      // Pulse ring
      const pr = 10 + Math.sin(t * 3) * 4;
      ctx.strokeStyle = `rgba(37,211,102,${0.4 + Math.sin(t * 3) * 0.2})`;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(dx, dy, pr, 0, Math.PI * 2); ctx.stroke();

      // Dubai label
      ctx.font = `bold ${W > 700 ? 13 : 10}px 'Outfit', sans-serif`;
      ctx.fillStyle = '#25D366';
      ctx.textAlign = 'center';
      ctx.fillText('📍 DUBAI', dx, dy - 18);

      // ── Rising WhatsApp bubbles ──
      bubbles.forEach(b => {
        b.y += b.vy;
        b.x += Math.sin(t * 1.5 + b.phase) * 0.0003;
        if (b.y < -0.05) { b.y = 0.9; b.alpha = 0.3 + Math.random() * 0.5; }
        const bx = b.x * W, by = b.y * H;
        const alpha = b.alpha * (0.5 + 0.5 * Math.sin(t * 1.5 + b.phase));
        ctx.save();
        ctx.globalAlpha = alpha;
        // Bubble background
        ctx.fillStyle = 'rgba(37,211,102,0.1)';
        ctx.strokeStyle = 'rgba(37,211,102,0.25)';
        ctx.lineWidth = 1;
        if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(bx - b.size * 0.7, by - b.size * 0.6, b.size * 1.4, b.size * 1.2, b.size * 0.3); ctx.fill(); ctx.stroke(); }
        ctx.font = `${b.size * 0.7}px serif`;
        ctx.textAlign = 'center';
        ctx.fillText(b.msg, bx, by + b.size * 0.25);
        ctx.restore();
      });

      // ── Center headline ──
      ctx.textAlign = 'center';
      ctx.font = `700 ${W > 700 ? 38 : 26}px 'Playfair Display', serif`;
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(37,211,102,0.4)';
      ctx.shadowBlur = 20;
      ctx.fillText('Get In Touch', W * 0.5, H * 0.36);
      ctx.shadowBlur = 0;

      ctx.font = `400 ${W > 700 ? 15 : 12}px 'Outfit', sans-serif`;
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.fillText('Connected to travellers from 80+ countries · Reply within minutes', W * 0.5, H * 0.49);

      // WhatsApp badge
      const badge = '💬 +971 54 473 5060';
      const bw = ctx.measureText(badge).width + 24;
      ctx.font = `600 ${W > 700 ? 13 : 11}px 'Outfit', sans-serif`;
      ctx.fillStyle = 'rgba(37,211,102,0.15)';
      ctx.strokeStyle = 'rgba(37,211,102,0.4)';
      ctx.lineWidth = 1;
      if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(W * 0.5 - bw / 2, H * 0.57, bw, 28, 14); ctx.fill(); ctx.stroke(); }
      ctx.fillStyle = '#25D366';
      ctx.fillText(badge, W * 0.5, H * 0.575);

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
}


// ════════════════════════════════════════════════════════════════════════════
//  ABOUT ANIMATION — "The Dubai Story"
//  Night skyline · World route particles · Floating country flags · Stats
// ════════════════════════════════════════════════════════════════════════════
export function AboutAnimation() {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const FLAGS = ['🇬🇧','🇺🇸','🇮🇳','🇷🇺','🇩🇪','🇫🇷','🇯🇵','🇨🇳','🇧🇷','🇦🇺','🇮🇹','🇰🇷','🇪🇸','🇨🇦','🇸🇦','🇦🇪','🇵🇰','🇳🇬','🇿🇦','🇹🇷'];
    const flagParticles = FLAGS.map((flag, i) => ({
      flag,
      x: Math.random(),
      y: 0.15 + Math.random() * 0.65,
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      phase: (i / FLAGS.length) * Math.PI * 2,
      size: 14 + Math.random() * 10,
    }));

    // Gold particles
    const goldDots = Array.from({ length: 60 }, () => ({
      x: Math.random(), y: 0.7 + Math.random() * 0.3,
      vx: (Math.random() - 0.5) * 0.0006,
      vy: -(0.0003 + Math.random() * 0.0005),
      alpha: 0.2 + Math.random() * 0.6,
      size: 0.5 + Math.random() * 2,
      phase: Math.random() * Math.PI * 2,
    }));

    // Stats to display
    const STATS = [
      { value: 10000, label: 'Happy Guests', suffix: '+', icon: '😊' },
      { value: 80,    label: 'Countries',    suffix: '+', icon: '🌍' },
      { value: 4.9,   label: 'Rating',       suffix: '/5', icon: '⭐' },
      { value: 2019,  label: 'Est. Since',   suffix: '',  icon: '🏆' },
    ];

    function resize() {
      canvas.width  = canvas.offsetWidth  || 1200;
      canvas.height = canvas.offsetHeight || 420;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let t = 0;
    let animStart = Date.now();

    function drawBurjKhalifa(ctx, W, H) {
      // Simplified Burj Khalifa silhouette — iconic stepped tower
      const bx = W * 0.72;
      const sections = [
        [18, H * 0.68], [15, H * 0.58], [12, H * 0.49],
        [10, H * 0.41], [8, H * 0.34], [6, H * 0.28],
        [4.5, H * 0.22], [3, H * 0.17], [1.5, H * 0.12],
        [0.8, H * 0.08],
      ];
      sections.forEach(([hw, y], i) => {
        const next = sections[i + 1];
        const ny = next ? next[1] : 0;
        const nhw = next ? next[0] : 0.3;
        const alpha = 0.5 + i * 0.04;
        const bg2 = ctx.createLinearGradient(bx - hw, 0, bx + hw, 0);
        bg2.addColorStop(0, `rgba(15,25,45,${alpha})`);
        bg2.addColorStop(0.4, `rgba(25,40,70,${alpha})`);
        bg2.addColorStop(0.6, `rgba(20,35,60,${alpha})`);
        bg2.addColorStop(1, `rgba(15,25,45,${alpha})`);
        ctx.fillStyle = bg2;
        ctx.beginPath();
        ctx.moveTo(bx - hw, y);
        ctx.lineTo(bx + hw, y);
        ctx.lineTo(bx + nhw, ny);
        ctx.lineTo(bx - nhw, ny);
        ctx.closePath();
        ctx.fill();
        // Window lights
        if (y > H * 0.3) {
          for (let w2 = Math.floor(-hw + 2); w2 < hw - 1; w2 += 5) {
            const lit = Math.sin(t * 0.4 + w2 * 0.5 + i * 2) > -0.2;
            if (lit) {
              ctx.fillStyle = `rgba(255,220,100,${0.25 + Math.sin(t * 0.5 + w2) * 0.1})`;
              ctx.fillRect(bx + w2 - 1.5, y + 3, 3, 4);
            }
          }
        }
      });
      // Antenna spire tip blink
      const spireAlpha = 0.5 + 0.5 * Math.sin(t * 2.5);
      ctx.fillStyle = `rgba(255,80,80,${spireAlpha})`;
      ctx.beginPath();
      ctx.arc(bx, H * 0.08, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawSkyline(ctx, W, H) {
      // Supporting buildings left side
      const buildings = [
        [0.02, 0.04, 0.22], [0.07, 0.025, 0.15], [0.11, 0.05, 0.30],
        [0.16, 0.022, 0.13],[0.19, 0.04, 0.24],  [0.24, 0.028, 0.18],
        [0.28, 0.055, 0.32],[0.34, 0.03, 0.20],  [0.38, 0.022, 0.14],
        [0.42, 0.06, 0.36], [0.48, 0.025, 0.16],
        [0.76, 0.035, 0.22],[0.80, 0.028, 0.18], [0.84, 0.05, 0.30],
        [0.88, 0.022, 0.14],[0.91, 0.04, 0.24],  [0.95, 0.03, 0.20],
      ];
      buildings.forEach(([xf, wf, hf]) => {
        const bx = W * xf, bw = W * wf, bh = H * hf, by = H * 0.68 - bh;
        const bg3 = ctx.createLinearGradient(bx, by, bx + bw, by + bh);
        bg3.addColorStop(0, 'rgba(12,22,40,0.9)');
        bg3.addColorStop(1, 'rgba(8,15,28,0.95)');
        ctx.fillStyle = bg3;
        ctx.fillRect(bx, by, bw, bh);
        // Window grid
        const cols = Math.max(2, Math.floor(bw / 8));
        const rows = Math.min(6, Math.floor(bh / 12));
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const isLit = Math.sin(t * 0.3 + r * 4 + c * 3 + xf * 20) > -0.3;
            if (isLit) {
              ctx.fillStyle = `rgba(255,220,100,${0.2 + Math.sin(t * 0.4 + r + c) * 0.08})`;
              ctx.fillRect(bx + 2 + c * (bw / cols), by + 4 + r * (bh / rows), bw / cols - 2, bh / rows - 3);
            }
          }
        }
      });
    }

    function draw() {
      t += 0.012;
      const W = canvas.width, H = canvas.height;
      const elapsed = (Date.now() - animStart) / 1000;

      // Background — night sky
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, '#010308');
      bg.addColorStop(0.4, '#020510');
      bg.addColorStop(0.65, '#060D1F');
      bg.addColorStop(1, '#0A1428');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Stars
      for (let i = 0; i < 120; i++) {
        const sx = (i * 173.3) % W, sy = (i * 97.7) % (H * 0.65);
        const tw = 0.1 + 0.5 * Math.abs(Math.sin(t * 1.2 + i * 0.4));
        ctx.fillStyle = `rgba(255,255,255,${tw})`;
        ctx.beginPath();
        ctx.arc(sx, sy, i % 7 === 0 ? 1.2 : 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Moon
      const mg = ctx.createRadialGradient(W * 0.12, H * 0.14, 0, W * 0.12, H * 0.14, 22);
      mg.addColorStop(0, 'rgba(255,248,220,0.95)');
      mg.addColorStop(0.5, 'rgba(255,248,220,0.3)');
      mg.addColorStop(1, 'transparent');
      ctx.fillStyle = mg;
      ctx.beginPath();
      ctx.arc(W * 0.12, H * 0.14, 22, 0, Math.PI * 2);
      ctx.fill();
      // Moon shadow
      ctx.fillStyle = '#020510';
      ctx.beginPath();
      ctx.arc(W * 0.12 + 8, H * 0.14 - 4, 18, 0, Math.PI * 2);
      ctx.fill();

      // Ground glow (city light pollution)
      const glowG = ctx.createLinearGradient(0, H * 0.6, 0, H);
      glowG.addColorStop(0, 'transparent');
      glowG.addColorStop(0.5, 'rgba(245,158,11,0.04)');
      glowG.addColorStop(1, 'rgba(245,158,11,0.08)');
      ctx.fillStyle = glowG;
      ctx.fillRect(0, H * 0.6, W, H * 0.4);

      // Skyline buildings
      drawSkyline(ctx, W, H);
      // Burj Khalifa
      if (W > 400) drawBurjKhalifa(ctx, W, H);

      // Ground / water
      ctx.fillStyle = '#060F20';
      ctx.fillRect(0, H * 0.68, W, H * 0.32);
      // Water sheen
      for (let i = 0; i < 4; i++) {
        ctx.strokeStyle = `rgba(245,158,11,${0.03 + i * 0.01})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let x = 0; x <= W; x += 8) {
          const wy = H * (0.72 + i * 0.04) + Math.sin(x * 0.025 + t * 1.5 + i) * 3;
          x === 0 ? ctx.moveTo(x, wy) : ctx.lineTo(x, wy);
        }
        ctx.stroke();
      }

      // ── Gold particles rising from city ──
      goldDots.forEach(d => {
        d.x += d.vx; d.y += d.vy; d.phase += 0.03;
        if (d.y < -0.05) { d.y = 0.7 + Math.random() * 0.25; d.x = Math.random(); }
        const px = d.x * W, py = d.y * H;
        const alpha = d.alpha * Math.sin(d.phase) * (d.y < 0.2 ? d.y * 5 : 1);
        if (alpha <= 0) return;
        const pg = ctx.createRadialGradient(px, py, 0, px, py, d.size * 3);
        pg.addColorStop(0, `rgba(245,158,11,${alpha})`);
        pg.addColorStop(1, 'transparent');
        ctx.fillStyle = pg;
        ctx.beginPath();
        ctx.arc(px, py, d.size * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // ── Floating country flags ──
      flagParticles.forEach(fp => {
        fp.x += fp.vx; fp.y += fp.vy; fp.phase += 0.015;
        if (fp.x < 0.02) fp.vx = Math.abs(fp.vx);
        if (fp.x > 0.95) fp.vx = -Math.abs(fp.vx);
        if (fp.y < 0.12) fp.vy = Math.abs(fp.vy);
        if (fp.y > 0.65) fp.vy = -Math.abs(fp.vy);
        const px = fp.x * W, py = fp.y * H;
        const alpha = 0.25 + 0.35 * Math.sin(fp.phase);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.font = `${fp.size}px serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(fp.flag, px, py);
        ctx.restore();
      });

      // ── Center text block ──
      // Logo mark
      ctx.textAlign = 'center';
      ctx.font = `400 ${W > 700 ? 13 : 11}px 'Outfit', sans-serif`;
      ctx.fillStyle = '#F59E0B';
      ctx.letterSpacing = '0.15em';
      ctx.fillText('✦  DUBAI ROVERS  ✦', W * 0.5, H * 0.25);

      ctx.font = `700 ${W > 700 ? 44 : 28}px 'Playfair Display', serif`;
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(245,158,11,0.4)';
      ctx.shadowBlur = 24;
      ctx.fillText("Dubai's Adventure Story", W * 0.5, H * 0.39);
      ctx.shadowBlur = 0;

      ctx.font = `400 ${W > 700 ? 15 : 12}px 'Outfit', sans-serif`;
      ctx.fillStyle = 'rgba(255,255,255,0.38)';
      ctx.fillText('Since 2019 · 10,000+ happy travellers · 80+ countries · Fully licensed', W * 0.5, H * 0.51);

      // ── Stat pills ──
      if (W > 600) {
        STATS.forEach((stat, i) => {
          const totalW = Math.min(W - 80, 600);
          const spacing = totalW / (STATS.length);
          const sx = W * 0.5 - totalW / 2 + i * spacing + spacing / 2;
          const sy = H * 0.66;
          // Pill bg
          ctx.fillStyle = 'rgba(245,158,11,0.08)';
          ctx.strokeStyle = 'rgba(245,158,11,0.2)';
          ctx.lineWidth = 1;
          if (ctx.roundRect) {
            ctx.beginPath();
            ctx.roundRect(sx - 52, sy - 20, 104, 40, 20);
            ctx.fill(); ctx.stroke();
          }
          // Value with count-up effect
          const countUpVal = stat.value === 4.9
            ? (Math.min(elapsed * 0.8, 1) * stat.value).toFixed(1)
            : stat.value <= 100
              ? Math.min(Math.floor(elapsed * 25), stat.value)
              : stat.value <= 2019
                ? Math.min(Math.floor(2019 - (2019 - stat.value) * Math.max(0, 1 - elapsed * 0.3)), stat.value)
                : Math.min(Math.floor(elapsed * 1200), stat.value);
          ctx.font = `700 ${W > 800 ? 16 : 13}px 'Outfit', sans-serif`;
          ctx.fillStyle = '#F59E0B';
          ctx.textAlign = 'center';
          ctx.fillText(`${stat.icon} ${countUpVal}${stat.suffix}`, sx, sy - 2);
          ctx.font = `400 ${W > 800 ? 10 : 9}px 'Outfit', sans-serif`;
          ctx.fillStyle = 'rgba(255,255,255,0.4)';
          ctx.fillText(stat.label, sx, sy + 13);
        });
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); };
  }, []);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
}
