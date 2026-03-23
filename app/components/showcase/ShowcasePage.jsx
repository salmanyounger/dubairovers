"use client";

import { useState, useEffect, useRef } from "react";

function FontLink() {
  useEffect(() => {
    if (document.getElementById("showcase-fonts")) return;
    const l = document.createElement("link");
    l.id = "showcase-fonts";
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap";
    document.head.appendChild(l);
  }, []);
  return null;
}

const CARDS = [
  {
    id: 1, emoji: "🏜️", title: "Dubai Tours",
    sub: "Desert Safaris & City Escapes",
    tagline: "Book the finest desert adventures, Abu Dhabi day trips & city tours — all in one place.",
    cta: "Explore Tours",
    url: "/tours",
    c1: "#92400E", c2: "#B45309", c3: "#D97706",
    accent: "#FCD34D", glow: "#F59E0B", tag: "Live",
    anim: "dunes",
  },
  {
    id: 2, emoji: "🏙️", title: "Dubai Properties",
    sub: "Compare & Invest Smart",
    tagline: "Side-by-side comparisons of villas, apartments & investment properties across Dubai.",
    cta: "Browse Properties",
    url: "/properties",
    c1: "#0A2540", c2: "#0F4C81", c3: "#1D6FA4",
    accent: "#60A5FA", glow: "#3B82F6", tag: "Live",
    anim: "skyline",
  },
  {
    id: 3, emoji: "🏠", title: "ARCHAI",
    sub: "AI Villa Design Platform",
    tagline: "Design your dream villa in 3 minutes. Pick style, rooms & colors — get floor plans free.",
    cta: "Design My Villa",
    url: "/archai",
    c1: "#064E3B", c2: "#065F46", c3: "#047857",
    accent: "#34D399", glow: "#10B981", tag: "Free",
    anim: "blueprint",
  },
  {
    id: 4, emoji: "🤖", title: "EA Robot",
    sub: "Automated Forex Trading",
    tagline: "Precision-built Expert Advisors for MT4 & MT5. Let the robot trade while you sleep.",
    cta: "Get Your Robot",
    url: "/salmanfx",
    c1: "#1E1B4B", c2: "#3730A3", c3: "#4F46E5",
    accent: "#A78BFA", glow: "#8B5CF6", tag: "Live",
    anim: "circuit",
  },
  {
    id: 5, emoji: "💻", title: "Website Building",
    sub: "Premium Digital Presence",
    tagline: "Custom websites for Dubai businesses — multilingual, mobile-first & conversion-ready.",
    cta: "Start a Project",
    url: "/webbuilder",
    c1: "#4C0519", c2: "#881337", c3: "#9F1239",
    accent: "#FB7185", glow: "#F43F5E", tag: "Hire Us",
    anim: "code",
  },
];

function Background() {
  const ref = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    let alive = true;
    let id;
    const ctx = cv.getContext("2d");
    let t = 0;
    const resize = () => {
      if (!alive) return;
      cv.width = window.innerWidth;
      cv.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    function draw() {
      if (!alive) return;
      t += 0.003;
      ctx.clearRect(0, 0, cv.width, cv.height);
      const cx = cv.width * 0.5 + Math.sin(t * 0.4) * cv.width * 0.08;
      const cy = cv.height * 0.15;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, cv.width * 0.55);
      g.addColorStop(0, `rgba(201,168,76,${0.045 + Math.sin(t) * 0.012})`);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, cv.width, cv.height);
      const spacing = 36;
      const cols = Math.ceil(cv.width / spacing) + 1;
      const rows = Math.ceil(cv.height / spacing) + 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * spacing, y = r * spacing;
          const dx = x - cx, dy = y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const proximity = Math.max(0, 1 - dist / (cv.width * 0.45));
          const alpha = 0.06 + proximity * 0.12 + Math.sin(t * 0.8 + c * 0.3 + r * 0.4) * 0.015;
          ctx.beginPath();
          ctx.arc(x, y, 0.9, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(201,168,76,${alpha})`;
          ctx.fill();
        }
      }
      for (let i = 0; i < 6; i++) {
        const ly = cv.height * (0.15 + i * 0.14);
        ctx.beginPath();
        ctx.moveTo(0, ly);
        ctx.lineTo(cv.width, ly);
        ctx.strokeStyle = `rgba(255,255,255,${0.025 + Math.sin(t * 0.5 + i) * 0.008})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      id = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      alive = false;
      cancelAnimationFrame(id);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", width: "100%", height: "100%" }}
    />
  );
}

function CardCanvas({ anim, accent, active }) {
  const ref = useRef(null);
  const raf = useRef(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    let t = 0;
    cv.width = cv.offsetWidth * 2;
    cv.height = cv.offsetHeight * 2;
    ctx.scale(2, 2);
    const w = cv.offsetWidth, h = cv.offsetHeight;
    function draw() {
      ctx.clearRect(0, 0, w, h);
      t += active ? 0.016 : 0.005;
      if (anim === "dunes") {
        for (let layer = 0; layer < 4; layer++) {
          const off = layer * 0.5;
          ctx.beginPath();
          ctx.moveTo(0, h);
          for (let x = 0; x <= w; x += 3) {
            const y = h * (0.3 + layer * 0.15) + Math.sin(x / 38 + t + off) * 11 + Math.sin(x / 20 + t * 1.4 + off) * 5;
            ctx.lineTo(x, y);
          }
          ctx.lineTo(w, h);
          ctx.lineTo(0, h);
          ctx.fillStyle = `rgba(251,191,36,${0.05 + layer * 0.035})`;
          ctx.fill();
        }
        for (let i = 0; i < 22; i++) {
          const sx = (i * 79 + 10) % w, sy = (i * 37 + 5) % (h * 0.45);
          const pulse = Math.sin(t * 1.8 + i) * 0.4 + 0.6;
          ctx.beginPath();
          ctx.arc(sx, sy, 0.9, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(253,230,138,${pulse * 0.65})`;
          ctx.fill();
        }
      }
      if (anim === "skyline") {
        const bldgs = [0.28,0.52,0.38,0.82,0.48,0.92,0.58,0.68,0.42,0.60,0.36,0.50,0.30,0.44,0.26,0.40,0.22];
        bldgs.forEach((bh, i) => {
          const bx = i * (w / bldgs.length), bw = w / bldgs.length - 2, bH = h * bh;
          ctx.fillStyle = "rgba(10,28,55,0.92)";
          ctx.fillRect(bx, h - bH, bw, bH);
          const rows = Math.floor(bH / 9);
          for (let r = 1; r < rows - 1; r++) {
            for (let c = 0; c < 2; c++) {
              if (Math.sin(i * 7 + r * 3 + c + Math.floor(t * 0.5)) > 0.2) {
                ctx.fillStyle = `rgba(96,165,250,${0.35 + Math.sin(t + i + r) * 0.15})`;
                ctx.fillRect(bx + c * (bw / 2) + 2, h - bH + r * 9 + 2, bw / 2 - 3, 4);
              }
            }
          }
        });
        const rg = ctx.createLinearGradient(0, h * 0.72, 0, h);
        rg.addColorStop(0, "rgba(96,165,250,0.06)");
        rg.addColorStop(1, "transparent");
        ctx.fillStyle = rg;
        ctx.fillRect(0, h * 0.72, w, h * 0.28);
      }
      if (anim === "blueprint") {
        ctx.strokeStyle = "rgba(52,211,153,0.1)";
        ctx.lineWidth = 0.5;
        for (let x = 0; x < w; x += 14) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
        for (let y = 0; y < h; y += 14) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
        [[16,16,90,62],[114,16,72,42],[114,66,72,54],[16,86,170,40]].forEach(([x,y,rw,rh], i) => {
          const pulse = Math.sin(t * 1.2 + i * 0.9) * 0.5 + 0.5;
          ctx.strokeStyle = `rgba(52,211,153,${0.28 + pulse * 0.42})`;
          ctx.lineWidth = 1;
          ctx.strokeRect(x, y, rw, rh);
          ctx.fillStyle = `rgba(52,211,153,${0.02 + pulse * 0.04})`;
          ctx.fillRect(x, y, rw, rh);
        });
        ctx.strokeStyle = "rgba(52,211,153,0.4)";
        ctx.lineWidth = 0.7;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(16, h - 20);
        ctx.lineTo(16 + ((t * 15) % (w - 32)), h - 20);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      if (anim === "circuit") {
        const nodes = [[35,35],[95,35],[155,35],[155,80],[95,80],[35,115],[95,115],[155,115],[35,80],[95,50]];
        const edges = [[0,1],[1,2],[2,3],[3,4],[4,1],[4,5],[5,6],[6,7],[7,3],[8,0],[8,5],[1,9]];
        edges.forEach(([a, b]) => {
          ctx.strokeStyle = "rgba(167,139,250,0.18)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nodes[a][0], nodes[a][1]);
          ctx.lineTo(nodes[b][0], nodes[b][1]);
          ctx.stroke();
          const prog = ((t * 0.55 + (a + b) * 0.28) % 1 + 1) % 1;
          const px = nodes[a][0] + (nodes[b][0] - nodes[a][0]) * prog;
          const py = nodes[a][1] + (nodes[b][1] - nodes[a][1]) * prog;
          const dg = ctx.createRadialGradient(px, py, 0, px, py, 5);
          dg.addColorStop(0, "rgba(167,139,250,1)");
          dg.addColorStop(1, "transparent");
          ctx.fillStyle = dg;
          ctx.beginPath();
          ctx.arc(px, py, 5, 0, Math.PI * 2);
          ctx.fill();
        });
        nodes.forEach(([x, y], i) => {
          const p = Math.sin(t * 2.2 + i * 0.7) * 0.3 + 0.7;
          ctx.beginPath();
          ctx.arc(x, y, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(139,92,246,${p * 0.55})`;
          ctx.fill();
          ctx.strokeStyle = `rgba(167,139,250,${p * 0.7})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        });
      }
      if (anim === "code") {
        // Subtle matrix-style falling dots — no readable text
        const cols = Math.floor(w / 14);
        for (let col = 0; col < cols; col++) {
          const speed = 0.4 + (col * 7 % 5) * 0.18;
          const offset = (col * 31) % h;
          const y = ((t * speed * 60 + offset) % (h + 20)) - 10;
          const chars = "01{}[];=><!*/";
          const char = chars[Math.floor((t * 3 + col * 7) % chars.length)];
          const alpha = 0.12 + Math.sin(t * 2 + col) * 0.06;
          ctx.font = "9px 'Courier New', monospace";
          ctx.fillStyle = `rgba(251,113,133,${alpha})`;
          ctx.fillText(char, col * 14 + 4, y);
          // Trailing dots
          for (let trail = 1; trail < 5; trail++) {
            const ty = y - trail * 14;
            if (ty > 0 && ty < h) {
              ctx.fillStyle = `rgba(251,113,133,${alpha * (1 - trail * 0.18)})`;
              ctx.fillText(chars[Math.floor((t * 2 + col * 5 + trail) % chars.length)], col * 14 + 4, ty);
            }
          }
        }
        // Blinking cursor line at bottom
        if (Math.sin(t * 4) > 0) {
          ctx.fillStyle = "rgba(251,113,133,0.35)";
          ctx.fillRect(8, h - 16, w * 0.4, 2);
        }
      }
      raf.current = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf.current);
  }, [anim, active]);
  return (
    <canvas
      ref={ref}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", borderRadius: "inherit" }}
    />
  );
}

function useTilt(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-6px) scale(1.015)`;
    };
    const onLeave = () => {
      el.style.transform = "perspective(900px) rotateY(0) rotateX(0) translateY(0) scale(1)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);
}

function Card({ card, index }) {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const wrapRef = useRef(null);
  const cardRef = useRef(null);
  useTilt(cardRef);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (wrapRef.current) obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, []);
  const isExternal = card.url.startsWith("http");
  return (
    <div
      ref={wrapRef}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(44px)",
        transition: `opacity 0.65s ease ${index * 0.09}s, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${index * 0.09}s`,
      }}
    >
      <a
        ref={cardRef}
        href={card.url}
        target={isExternal ? "_blank" : "_self"}
        rel="noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
          borderRadius: 18,
          textDecoration: "none",
          color: "white",
          minHeight: 290,
          background: `linear-gradient(145deg, ${card.c1} 0%, ${card.c2} 50%, ${card.c3} 100%)`,
          border: `1px solid ${hovered ? card.accent + "50" : "rgba(255,255,255,0.09)"}`,
          boxShadow: hovered
            ? `0 28px 70px ${card.glow}40, 0 0 0 1px ${card.accent}28, inset 0 1px 0 rgba(255,255,255,0.18)`
            : "0 6px 36px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
          transition: "box-shadow 0.4s ease, border-color 0.4s ease",
          cursor: "pointer",
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        <div style={{ position: "absolute", inset: 0, opacity: hovered ? 0.75 : 0.35, transition: "opacity 0.45s" }}>
          <CardCanvas anim={card.anim} accent={card.accent} active={hovered} />
        </div>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, ${card.accent}60, transparent)`, opacity: hovered ? 1 : 0.35, transition: "opacity 0.4s" }} />
        <div style={{ position: "absolute", top: -50, right: -50, width: 160, height: 160, borderRadius: "50%", background: `radial-gradient(circle, ${card.accent}${hovered ? "28" : "12"} 0%, transparent 70%)`, transition: "background 0.45s", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "24px 22px 0", flex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 11px", borderRadius: 30, marginBottom: 16, background: `${card.accent}18`, border: `1px solid ${card.accent}32`, fontSize: 10, fontWeight: 600, letterSpacing: 1.5, color: card.accent, textTransform: "uppercase" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: card.accent, display: "inline-block", boxShadow: `0 0 6px ${card.accent}` }} />
            {card.tag}
          </div>
          <div style={{ fontSize: 50, marginBottom: 10, lineHeight: 1, filter: hovered ? `drop-shadow(0 0 18px ${card.glow}80)` : "none", transition: "filter 0.4s, transform 0.4s", transform: hovered ? "scale(1.12) rotate(-4deg)" : "scale(1) rotate(0deg)", display: "inline-block" }}>
            {card.emoji}
          </div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(19px,2.5vw,24px)", fontWeight: 800, letterSpacing: -0.4, lineHeight: 1.1, marginBottom: 5 }}>
            {card.title}
          </div>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: card.accent, marginBottom: 11, opacity: 0.85 }}>
            {card.sub}
          </div>
          <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.52)", lineHeight: 1.75 }}>
            {card.tagline}
          </div>
        </div>
        <div style={{ position: "relative", zIndex: 2, margin: "18px 22px 22px", padding: "13px 16px", borderRadius: 11, background: hovered ? `${card.accent}16` : "rgba(255,255,255,0.06)", border: `1px solid ${hovered ? card.accent + "40" : "rgba(255,255,255,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "space-between", transition: "all 0.35s ease" }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 700, color: hovered ? card.accent : "rgba(255,255,255,0.65)", transition: "color 0.3s" }}>
            {card.cta}
          </span>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: hovered ? card.accent : "rgba(255,255,255,0.09)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, color: hovered ? card.c1 : "rgba(255,255,255,0.55)", fontWeight: 800, transform: hovered ? "translateX(3px) rotate(-40deg)" : "none", transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)" }}>
            ↗
          </div>
        </div>
      </a>
    </div>
  );
}

function AnimatedWord() {
  const words = ["Tours.", "Properties.", "Forex.", "Design.", "Websites."];
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setInterval(() => {
      setShow(false);
      setTimeout(() => { setIdx(i => (i + 1) % words.length); setShow(true); }, 280);
    }, 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <span style={{ background: "linear-gradient(135deg, #C9A84C 0%, #F5E4A8 50%, #C9A84C 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(8px)", transition: "opacity 0.28s ease, transform 0.28s ease", display: "inline-block" }}>
      {words[idx]}
    </span>
  );
}

function Stat({ to, label, suffix = "" }) {
  const [val, setVal] = useState(0);
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!vis) return;
    let c = 0;
    const s = to / 55;
    const t = setInterval(() => {
      c = Math.min(c + s, to);
      setVal(Math.floor(c));
      if (c >= to) clearInterval(t);
    }, 18);
    return () => clearInterval(t);
  }, [vis, to]);
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, background: "linear-gradient(135deg, #C9A84C, #F5E4A8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>
        {val}{suffix}
      </div>
      <div style={{ fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginTop: 6, fontFamily: "'Outfit', sans-serif" }}>
        {label}
      </div>
    </div>
  );
}

export default function ShowcasePage() {
  const [ready, setReady] = useState(false);
  useEffect(() => { setTimeout(() => setReady(true), 100); }, []);
  return (
    <>
      <FontLink />
      <style suppressHydrationWarning>{`
        @keyframes spin-slow { to { transform: rotate(360deg); } }
        @keyframes pulse-glow { 0%,100%{opacity:0.5;transform:scale(1)} 50%{opacity:1;transform:scale(1.5)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .sc-wrap * { box-sizing: border-box; }
        .sc-wrap a { text-decoration: none; }
        nav,[class*="navbar"],[id*="navbar"],header[class] { display: none !important; }
      `}</style>
      <div className="sc-wrap" style={{ background: "#07070A", minHeight: "100vh", position: "relative", overflowX: "hidden" }}>
        <Background />
        <div style={{ position: "relative", zIndex: 2 }}>
          <nav style={{ maxWidth: 1080, margin: "0 auto", padding: "18px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", background: "rgba(7,7,10,0.65)", border: "1px solid rgba(201,168,76,0.18)", borderRadius: 40, padding: "10px 20px", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#C9A84C", boxShadow: "0 0 8px #C9A84C" }} />
                <div style={{ position: "absolute", inset: -3, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.4)", animation: "pulse-glow 2.2s ease infinite" }} />
              </div>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: 800, letterSpacing: 1.5, color: "#C9A84C" }}>
                SALMAN<span style={{ color: "rgba(255,255,255,0.45)", fontWeight: 400 }}> · DUBAI</span>
              </span>
            </div>
            <a href="https://wa.me/971544735060" style={{ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.3)", borderRadius: 40, padding: "10px 20px", fontSize: 12, fontWeight: 600, color: "#4ADE80", display: "flex", alignItems: "center", gap: 7, letterSpacing: 0.3 }}>
              <span>💬</span> WhatsApp
            </a>
          </nav>
          <header style={{ textAlign: "center", padding: "44px 24px 56px", maxWidth: 780, margin: "0 auto", opacity: ready ? 1 : 0, transform: ready ? "translateY(0)" : "translateY(24px)", transition: "all 0.8s cubic-bezier(0.22,1,0.36,1)" }}>
            <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 32 }}>
              <svg width="100" height="100" style={{ animation: "spin-slow 14s linear infinite", position: "absolute" }} viewBox="0 0 100 100">
                <path id="sc-cp" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" fill="none" />
                <text fontSize="8.2" fill="rgba(201,168,76,0.55)" letterSpacing="3.8" fontFamily="Outfit,sans-serif" fontWeight="500">
                  <textPath href="#sc-cp">DUBAI · 2025 · SALMAN ALI ·</textPath>
                </text>
              </svg>
              <div style={{ width: 54, height: 54, borderRadius: "50%", background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.22)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>🇦🇪</div>
            </div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(36px,7vw,68px)", fontWeight: 800, letterSpacing: -2, lineHeight: 1.06, marginBottom: 22, color: "white" }}>
              Built in Dubai.<br />
              <AnimatedWord />{" "}
              <span style={{ color: "rgba(255,255,255,0.28)", fontWeight: 300 }}>Done Right.</span>
            </h1>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15.5, color: "rgba(255,255,255,0.38)", maxWidth: 440, margin: "0 auto 34px", lineHeight: 1.85, fontWeight: 300 }}>
              Five premium businesses, built and operated from Dubai. Click any card to visit.
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, animation: "float 3s ease infinite" }}>
              <div style={{ width: 36, height: 1, background: "linear-gradient(to right, transparent, rgba(201,168,76,0.35))" }} />
              <span style={{ fontSize: 9, letterSpacing: 3.5, textTransform: "uppercase", color: "rgba(201,168,76,0.38)", fontFamily: "'Outfit', sans-serif" }}>Tap a card to explore</span>
              <div style={{ width: 36, height: 1, background: "linear-gradient(to left, transparent, rgba(201,168,76,0.35))" }} />
            </div>
          </header>
          <main style={{ maxWidth: 1080, margin: "0 auto", padding: "0 20px 72px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 310px), 1fr))", gap: 18 }}>
              {CARDS.map((card, i) => <Card key={card.id} card={card} index={i} />)}
            </div>
          </main>
          <section style={{ maxWidth: 860, margin: "0 auto 72px", padding: "36px 28px", background: "rgba(255,255,255,0.025)", backdropFilter: "blur(12px)", border: "1px solid rgba(201,168,76,0.1)", borderRadius: 20, display: "flex", flexWrap: "wrap", justifyContent: "space-around", gap: 28 }}>
            <Stat to={5} label="Live Businesses" suffix="+" />
            <div style={{ width: 1, background: "rgba(255,255,255,0.07)", alignSelf: "stretch" }} />
            <Stat to={94} label="Tour Packages" suffix="+" />
            <div style={{ width: 1, background: "rgba(255,255,255,0.07)", alignSelf: "stretch" }} />
            <Stat to={156} label="Blog Articles" suffix="+" />
            <div style={{ width: 1, background: "rgba(255,255,255,0.07)", alignSelf: "stretch" }} />
            <Stat to={3} label="Languages" suffix="+" />
          </section>
          <div style={{ overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.04)", padding: "14px 0" }}>
            <div style={{ display: "flex", gap: 52, animation: "ticker 24s linear infinite", width: "max-content", whiteSpace: "nowrap" }}>
              {[...Array(2)].flatMap((_, k) =>
                ["Dubai Tours","✦","Dubai Properties","✦","Archai","✦","EA Robot","✦","Website Building","✦","Made in Dubai 🇦🇪","✦"].map((txt, i) => (
                  <span key={`${k}-${i}`} style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", color: txt === "✦" ? "#C9A84C" : "rgba(255,255,255,0.13)", fontWeight: txt === "✦" ? 700 : 400 }}>{txt}</span>
                ))
              )}
            </div>
          </div>
          <footer style={{ textAlign: "center", padding: "52px 24px 44px" }}>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 20, fontWeight: 800, letterSpacing: 1, color: "#C9A84C", marginBottom: 22 }}>SALMAN ALI</div>
            <a href="https://wa.me/971544735060" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 32px", borderRadius: 50, background: "linear-gradient(135deg, #25D366, #128C7E)", color: "white", fontSize: 14, fontWeight: 600, boxShadow: "0 8px 32px rgba(37,211,102,0.22)" }}>
              💬 +971 54 473 5060
            </a>
            <p style={{ marginTop: 28, fontSize: 11, color: "rgba(255,255,255,0.12)", letterSpacing: 1, fontFamily: "'Outfit', sans-serif" }}>
              © 2025 · All businesses by Salman Ali · Dubai 🇦🇪
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
