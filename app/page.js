"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const [mounted, setMounted]   = useState(false);
  const [hovered, setHovered]   = useState(null);
  const [time,    setTime]      = useState("--:--");
  const [active,  setActive]    = useState(null); // expanded card on mobile
  const canvasRef = useRef(null);
  const router    = useRouter();

  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const d = new Date();
      const offset = d.getTime() + (4 * 60 + d.getTimezoneOffset()) * 60000;
      const dubai  = new Date(offset);
      setTime(dubai.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Starfield canvas
  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    let alive = true;
    let raf   = null;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      if (!alive) return;
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.5 + 0.3,
      op: Math.random() * 0.5 + 0.05,
      twinkle: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.008 + 0.002,
      color: Math.random() > 0.85 ? "#C8A96E" : Math.random() > 0.7 ? "#818CF8" : "#ffffff",
    }));

    const loop = () => {
      if (!alive) return;
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s => {
        s.twinkle += s.speed;
        const op = s.op * (0.6 + 0.4 * Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.color.replace(")", `,${op})`).replace("rgb(","rgba(").replace(/^#/, "rgba(").replace("rgba(", "rgba(");
        // simpler opacity approach
        ctx.globalAlpha = op;
        ctx.fillStyle   = s.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      });
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      alive = false;
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [mounted]);

  const CARDS = [
    {
      id: "tours",
      href: "/tours",
      bg: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1400&q=85",
      gradient: "linear-gradient(135deg, #F97316 0%, #ec4899 100%)",
      glow: "rgba(249,115,22,0.4)",
      badge: "🏜️ Adventure",
      badgeColor: "#F97316",
      title: "Dubai Rovers",
      subtitle: "Tours & Experiences",
      desc: "Desert safaris, hot air balloons, dhow cruises & more — with hotel pickup included on every tour.",
      stats: [{ v:"4.9★", l:"Rating" }, { v:"80+", l:"Countries" }, { v:"10K+", l:"Happy Guests" }],
      tags: ["Desert Safari", "Hot Air Balloon", "Dhow Cruise", "City Tour"],
      tagIcons: ["🏜️","🎈","⛵","🏙️"],
      tagLinks: ["/desert-safari-dubai","/hot-air-balloon-dubai","/dhow-cruise-dubai","/private-city-tour-dubai"],
      pill: "● Offline Ready",
      pillColor: "#10B981",
      cta: "Explore Adventures",
      size: "large",
    },
    {
      id: "properties",
      href: "/properties",
      bg: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1400&q=85",
      gradient: "linear-gradient(135deg, #6366F1 0%, #3B82F6 100%)",
      glow: "rgba(99,102,241,0.4)",
      badge: "🏙️ Smart Invest",
      badgeColor: "#818CF8",
      title: "Dubai Properties",
      subtitle: "Intelligence Platform",
      desc: "30 properties, AI scoring, mortgage calculators, market trends & ROI analysis.",
      stats: [{ v:"30+", l:"Properties" }, { v:"AI", l:"Scoring" }, { v:"Live", l:"Map" }],
      tags: ["Buy", "Rent", "Invest", "Compare"],
      tagIcons: ["🏠","🔑","📈","⚖️"],
      tagLinks: ["/properties","/properties","/properties","/properties"],
      pill: "● Free Analysis",
      pillColor: "#818CF8",
      cta: "Explore Properties",
      size: "large",
    },
    {
      id: "archai",
      href: "/archai",
      bg: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1400&q=85",
      gradient: "linear-gradient(135deg, #C8A96E 0%, #9A7830 100%)",
      glow: "rgba(200,169,110,0.4)",
      badge: "🏠 AI Design",
      badgeColor: "#C8A96E",
      title: "ARCHAI",
      titleItalic: true,
      subtitle: "AI Villa Design Platform",
      desc: "Design your dream villa in 3 minutes — 9 styles, floor plans, cost estimate, AI photo free.",
      stats: [{ v:"9", l:"Styles" }, { v:"5", l:"Floor Plans" }, { v:"3min", l:"To Design" }],
      tags: ["Free", "Floor Plans", "AI Prompt", "Download"],
      tagIcons: ["🎁","📐","🤖","📥"],
      tagLinks: ["/archai","/archai","/archai","/archai"],
      pill: "● Free Until 2026",
      pillColor: "#C8A96E",
      cta: "Design My Villa",
      size: "large",
    },
    {
      id: "salmanfx",
      href: "/salmanfx",
      bg: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1400&q=85",
      gradient: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
      glow: "rgba(16,185,129,0.4)",
      badge: "📈 Forex EA",
      badgeColor: "#10B981",
      title: "SalmanFX",
      subtitle: "Expert Advisors MT4/MT5",
      desc: "Automated trading robots with Parabolic SAR strategy, custom money management & live dashboard.",
      stats: [{ v:"MT4", l:"Platform" }, { v:"MT5", l:"Platform" }, { v:"Auto", l:"Trading" }],
      tags: ["Buy EA", "MT4", "MT5", "Live Results"],
      tagIcons: ["🤖","📊","📈","💹"],
      tagLinks: ["/salmanfx","/salmanfx","/salmanfx","/salmanfx"],
      pill: "● License Protected",
      pillColor: "#10B981",
      cta: "Get Trading Robot",
      desc: "Parabolic SAR strategy, 10-stage money management, live dashboard. Set it and let it trade.",
      size: "small",
    },
    {
      id: "webbuilder",
      href: "/webbuilder",
      bg: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1400&q=85",
      gradient: "linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)",
      glow: "rgba(236,72,153,0.4)",
      badge: "💻 Web Dev",
      badgeColor: "#EC4899",
      title: "Web Builder",
      subtitle: "Custom Websites Dubai",
      desc: "World-class websites for tourism, restaurants, garages, real estate — built in React & Next.js.",
      stats: [{ v:"18+", l:"Categories" }, { v:"5", l:"Tiers" }, { v:"Fast", l:"Delivery" }],
      tags: ["Tourism", "Restaurant", "Real Estate", "Portfolio"],
      tagIcons: ["🏖️","🍽️","🍽️","💼"],
      tagLinks: ["/webbuilder","/webbuilder","/webbuilder","/webbuilder"],
      pill: "● Dubai Based",
      pillColor: "#EC4899",
      cta: "See My Work",
      desc: "React & Next.js websites — multilingual, mobile-first, with booking forms and admin panels.",
      size: "small",
    },
  ];

  const large = CARDS.filter(c => c.size === "large");
  const small = CARDS.filter(c => c.size === "small");

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&display=swap"/>
      <div suppressHydrationWarning style={{ position:"relative", minHeight:"100vh", background:"#06070d", fontFamily:"'Plus Jakarta Sans',sans-serif", overflowX:"hidden" }}>
        <style suppressHydrationWarning>{`
          *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
          nav,[class*="navbar"],[id*="navbar"],header { display:none !important; }
          ::-webkit-scrollbar { width:4px; } ::-webkit-scrollbar-thumb { background:rgba(200,169,110,0.3); border-radius:10px; }
          @keyframes fadeUp   { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
          @keyframes shimmer  { 0%{background-position:200% center} 100%{background-position:-200% center} }
          @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0.3} }
          @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
          @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(200vh)} }
          .card-wrap { transition:transform 0.5s cubic-bezier(0.23,1,0.32,1),box-shadow 0.5s ease; cursor:pointer; }
          .card-wrap:hover { transform:translateY(-10px) scale(1.015) !important; }
          .card-img { transition:transform 0.7s ease; }
          .card-wrap:hover .card-img { transform:scale(1.07) !important; }
          .cta-btn  { transition:all 0.22s ease; }
          .cta-btn:hover  { filter:brightness(1.15); transform:scale(1.05) !important; }
          .tag-chip { transition:all 0.18s ease; cursor:pointer; }
          .tag-chip:hover { transform:translateY(-2px) scale(1.08) !important; filter:brightness(1.2); }
        `}</style>

        {/* Canvas starfield */}
        {mounted && <canvas ref={canvasRef} style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none" }}/>}

        {/* Ambient gradients */}
        <div style={{ position:"fixed", inset:0, zIndex:1, pointerEvents:"none",
          background:"radial-gradient(ellipse 50% 60% at 20% 50%, rgba(249,115,22,0.05) 0%, transparent 70%), radial-gradient(ellipse 50% 60% at 50% 30%, rgba(99,102,241,0.04) 0%, transparent 70%), radial-gradient(ellipse 40% 50% at 80% 60%, rgba(200,169,110,0.05) 0%, transparent 70%)" }}/>

        {/* Top bar */}
        <div style={{ position:"fixed", top:0, left:0, right:0, zIndex:30, display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 28px",
          background:"linear-gradient(to bottom, rgba(6,7,13,0.95) 0%, transparent 100%)",
          opacity: mounted ? 1 : 0, transition:"opacity 0.6s ease" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{ width:34, height:34, borderRadius:9, background:"linear-gradient(135deg,#F97316,#ec4899)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🏜️</div>
            <div>
              <div style={{ fontSize:14, fontWeight:800, color:"#fff", letterSpacing:"-0.01em" }}>Dubai Rovers</div>
              <div style={{ fontSize:8, color:"rgba(255,255,255,0.25)", letterSpacing:"0.18em", textTransform:"uppercase" }}>Platform Hub</div>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.25)", fontFamily:"monospace" }}>{time} <span style={{ opacity:0.4 }}>GST</span></div>
            <div style={{ display:"flex", alignItems:"center", gap:5, background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.25)", borderRadius:20, padding:"4px 10px" }}>
              <div style={{ width:5, height:5, borderRadius:"50%", background:"#10B981", animation:"blink 1.5s ease-in-out infinite" }}/>
              <span style={{ fontSize:10, color:"#10B981", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase" }}>LIVE</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div style={{ position:"relative", zIndex:10, minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
          padding:"70px clamp(12px,2vw,28px) 28px",
          opacity: mounted ? 1 : 0, transition:"opacity 0.5s ease" }}>

          {/* Hero text */}
          <div style={{ textAlign:"center", marginBottom:"clamp(20px,3.5vh,36px)", animation: mounted ? "fadeUp 0.6s ease both" : "none" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:14, marginBottom:12 }}>
              <div style={{ height:"1px", width:"clamp(20px,5vw,60px)", background:"linear-gradient(to right, transparent, rgba(200,169,110,0.6))" }}/>
              <span style={{ fontSize:"clamp(10px,1.1vw,12px)", fontWeight:700, letterSpacing:"0.3em", textTransform:"uppercase",
                background:"linear-gradient(90deg,#F97316,#ec4899,#818CF8,#C8A96E,#F97316)", backgroundSize:"300% auto",
                backgroundClip:"text", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
                animation:"shimmer 4s linear infinite" }}>
                Welcome to
              </span>
              <div style={{ height:"1px", width:"clamp(20px,5vw,60px)", background:"linear-gradient(to left, transparent, rgba(200,169,110,0.6))" }}/>
            </div>
            <h1 style={{ fontSize:"clamp(28px,5vw,58px)", fontWeight:900, color:"#fff", lineHeight:1.08, letterSpacing:"-0.03em", marginBottom:10 }}>
              Everything{" "}
              <span style={{ background:"linear-gradient(90deg,#F97316,#ec4899)", backgroundClip:"text", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                Salman
              </span>
              {" "}Built in Dubai
            </h1>
            <p style={{ fontSize:"clamp(12px,1.3vw,15px)", color:"rgba(255,255,255,0.28)", letterSpacing:"0.1em", textTransform:"uppercase" }}>
              Tours · Properties · AI Design · Forex EA · Web Dev
            </p>
          </div>

          {/* Cards — top row (large 3) */}
          <div style={{ width:"100%", maxWidth:1380, animation: mounted ? "fadeUp 0.8s ease 0.1s both" : "none" }}>
            <div style={{ display:"flex", gap:"clamp(8px,1.2vw,14px)", marginBottom:"clamp(8px,1.2vw,14px)" }}>
              {large.map(card => (
                <Link key={card.id} href={card.href} className="card-wrap"
                  style={{ flex:1, textDecoration:"none", display:"block", position:"relative", borderRadius:18, overflow:"hidden",
                    minHeight:"clamp(320px,44vh,500px)",
                    border:`1px solid ${hovered===card.id ? card.badgeColor+"44" : "rgba(255,255,255,0.06)"}`,
                    boxShadow: hovered===card.id ? `0 24px 60px ${card.glow}` : "0 8px 30px rgba(0,0,0,0.4)" }}
                  onMouseEnter={() => setHovered(card.id)}
                  onMouseLeave={() => setHovered(null)}>
                  {/* BG */}
                  <div className="card-img" style={{ position:"absolute", inset:0, backgroundImage:`url('${card.bg}')`, backgroundSize:"cover", backgroundPosition:"center" }}/>
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(4,5,12,0.97) 0%, rgba(4,5,12,0.55) 45%, rgba(4,5,12,0.15) 100%)" }}/>
                  <div style={{ position:"absolute", inset:0, background:`linear-gradient(135deg, ${card.badgeColor}0D 0%, transparent 60%)`, opacity: hovered===card.id?1:0.4, transition:"opacity 0.4s" }}/>

                  {/* Top badges */}
                  <div style={{ position:"absolute", top:14, left:14, right:14, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:5, background:"rgba(0,0,0,0.55)", backdropFilter:"blur(10px)", border:`1px solid ${card.badgeColor}35`, borderRadius:20, padding:"4px 11px" }}>
                      <div style={{ width:5, height:5, borderRadius:"50%", background:card.badgeColor }}/>
                      <span style={{ fontSize:10, color:"rgba(255,255,255,0.85)", fontWeight:600 }}>{card.badge}</span>
                    </div>
                    <div style={{ background:"rgba(0,0,0,0.55)", backdropFilter:"blur(10px)", border:`1px solid ${card.pillColor}35`, borderRadius:20, padding:"4px 11px", fontSize:9, color:card.pillColor, fontWeight:700 }}>
                      {card.pill}
                    </div>
                  </div>

                  {/* Bottom content */}
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"0 18px 20px" }}>
                    {/* Tags */}
                    <div style={{ display:"flex", gap:5, marginBottom:12, flexWrap:"wrap" }}>
                      {card.tags.map((tag, ti) => (
                        <span key={tag} className="tag-chip"
                          onClick={e => { e.preventDefault(); router.push(card.tagLinks[ti]); }}
                          style={{ fontSize:9, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase",
                            color:"rgba(255,255,255,0.8)", background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.13)",
                            backdropFilter:"blur(8px)", borderRadius:20, padding:"4px 9px",
                            display:"inline-flex", alignItems:"center", gap:3 }}>
                          <span style={{ fontSize:10 }}>{card.tagIcons[ti]}</span>{tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <div style={{ fontSize:`clamp(${card.titleItalic?"26px":"22px"},${card.titleItalic?"3.2vw":"2.8vw"},${card.titleItalic?"44px":"38px"})`,
                      fontFamily: card.titleItalic ? "'Cormorant Garamond',serif" : "'Plus Jakarta Sans',sans-serif",
                      fontWeight: card.titleItalic ? 300 : 900,
                      fontStyle: card.titleItalic ? "italic" : "normal",
                      color:"#fff", lineHeight:1.05, marginBottom:3, letterSpacing: card.titleItalic ? "0.04em" : "-0.02em" }}>
                      {card.title}
                    </div>
                    <div style={{ fontSize:"clamp(9px,1vw,11px)", color:card.badgeColor, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:8 }}>
                      {card.subtitle}
                    </div>
                    <p style={{ fontSize:"clamp(10px,0.9vw,12px)", color:"rgba(255,255,255,0.42)", lineHeight:1.6, marginBottom:14, maxWidth:280 }}>
                      {card.desc}
                    </p>

                    {/* Stats */}
                    <div style={{ display:"flex", gap:6, marginBottom:14 }}>
                      {card.stats.map(s => (
                        <div key={s.l} style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", backdropFilter:"blur(6px)", borderRadius:8, padding:"6px 10px", textAlign:"center", flex:1,
                          transform: hovered===card.id ? "translateY(-2px)" : "none", transition:"transform 0.3s ease" }}>
                          <div style={{ fontSize:"clamp(11px,1.2vw,15px)", fontWeight:900, color:"#fff" }}>{s.v}</div>
                          <div style={{ fontSize:8, color:"rgba(255,255,255,0.3)", textTransform:"uppercase", letterSpacing:"0.05em", marginTop:1 }}>{s.l}</div>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="cta-btn" style={{ display:"inline-flex", alignItems:"center", gap:6,
                      background:card.gradient, color: card.titleItalic ? "#000" : "#fff",
                      padding:"9px 18px", borderRadius:10,
                      fontSize:"clamp(10px,1vw,12px)", fontWeight:800, letterSpacing:"0.02em",
                      boxShadow:`0 4px 18px ${card.glow}` }}>
                      {card.cta} →
                    </div>
                  </div>

                  {/* Hover border */}
                  {hovered===card.id && (
                    <div style={{ position:"absolute", inset:0, borderRadius:18, border:`1px solid ${card.badgeColor}44`, pointerEvents:"none" }}/>
                  )}
                </Link>
              ))}
            </div>

            {/* Bottom row (small 2) — premium redesign */}
            <div style={{ display:"flex", gap:"clamp(8px,1.2vw,14px)" }}>
              {small.map(card => (
                <Link key={card.id} href={card.href} className="card-wrap"
                  style={{ flex:1, textDecoration:"none", display:"block", position:"relative", borderRadius:20, overflow:"hidden",
                    minHeight:"clamp(160px,22vh,230px)",
                    border:`1.5px solid ${hovered===card.id ? card.badgeColor+"80" : card.badgeColor+"20"}`,
                    boxShadow: hovered===card.id
                      ? `0 24px 60px ${card.glow}55, 0 0 0 1px ${card.badgeColor}30, inset 0 1px 0 rgba(255,255,255,0.15)`
                      : `0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)`,
                    background: `linear-gradient(145deg, ${card.id==="salmanfx"
                      ? "rgba(5,20,10,0.97) 0%, rgba(5,38,18,0.95) 50%, rgba(10,50,25,0.92)"
                      : "rgba(18,5,25,0.97) 0%, rgba(35,8,48,0.95) 50%, rgba(45,10,60,0.92)"} 100%)`,
                    transition:"all 0.4s cubic-bezier(0.23,1,0.32,1)" }}
                  onMouseEnter={() => setHovered(card.id)}
                  onMouseLeave={() => setHovered(null)}>

                  {/* Photo blended in right side */}
                  <div className="card-img" style={{ position:"absolute", right:0, top:0, bottom:0, width:"55%",
                    backgroundImage:`url('${card.bg}')`, backgroundSize:"cover", backgroundPosition:"center",
                    maskImage:"linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.9) 100%)",
                    WebkitMaskImage:"linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.9) 100%)",
                    opacity: hovered===card.id ? 0.55 : 0.35, transition:"opacity 0.5s" }}/>

                  {/* Colour accent glow — left side */}
                  <div style={{ position:"absolute", inset:0,
                    background:`radial-gradient(ellipse 65% 80% at 10% 50%, ${card.glow}22 0%, transparent 70%)`,
                    opacity: hovered===card.id ? 1 : 0.6, transition:"opacity 0.4s" }}/>

                  {/* Accent top line */}
                  <div style={{ position:"absolute", top:0, left:0, right:0, height:2,
                    background:`linear-gradient(90deg, ${card.badgeColor} 0%, ${card.badgeColor}44 60%, transparent 100%)`,
                    opacity: hovered===card.id ? 1 : 0.5, transition:"opacity 0.4s" }}/>

                  {/* Content */}
                  <div style={{ position:"relative", zIndex:2, height:"100%", display:"flex", alignItems:"center", padding:"22px 26px", gap:24 }}>

                    {/* LEFT: Text */}
                    <div style={{ flex:1, minWidth:0 }}>

                      {/* Badge pill */}
                      <div style={{ display:"inline-flex", alignItems:"center", gap:5, marginBottom:10,
                        background:`${card.badgeColor}18`, border:`1px solid ${card.badgeColor}40`,
                        borderRadius:20, padding:"4px 11px" }}>
                        <div style={{ width:5, height:5, borderRadius:"50%", background:card.badgeColor,
                          boxShadow:`0 0 6px ${card.badgeColor}` }}/>
                        <span style={{ fontSize:9, color:card.badgeColor, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase" }}>
                          {card.badge}
                        </span>
                      </div>

                      {/* Title */}
                      <div style={{ fontSize:"clamp(22px,2.5vw,34px)", fontWeight:900, color:"#fff",
                        letterSpacing:"-0.02em", lineHeight:1.05, marginBottom:5,
                        textShadow:`0 2px 20px ${card.glow}50` }}>
                        {card.title}
                      </div>

                      {/* Subtitle */}
                      <div style={{ fontSize:11, color:"rgba(255,255,255,0.45)", marginBottom:14,
                        fontWeight:500, letterSpacing:"0.02em" }}>
                        {card.subtitle}
                      </div>

                      {/* Description */}
                      <div style={{ fontSize:11, color:"rgba(255,255,255,0.32)", lineHeight:1.65,
                        marginBottom:16, maxWidth:280 }}>
                        {card.desc}
                      </div>

                      {/* CTA */}
                      <div className="cta-btn" style={{ display:"inline-flex", alignItems:"center", gap:7,
                        background:card.gradient, color:"#fff", padding:"9px 18px", borderRadius:10,
                        fontSize:12, fontWeight:800, letterSpacing:"0.01em",
                        boxShadow:`0 4px 18px ${card.glow}55` }}>
                        {card.cta} →
                      </div>
                    </div>

                    {/* RIGHT: Stats — vertical stack */}
                    <div style={{ display:"flex", flexDirection:"column", gap:7, flexShrink:0 }}>
                      {card.stats.map(s => (
                        <div key={s.l} style={{
                          background: hovered===card.id ? `${card.badgeColor}12` : "rgba(255,255,255,0.04)",
                          border:`1px solid ${hovered===card.id ? card.badgeColor+"35" : "rgba(255,255,255,0.08)"}`,
                          borderRadius:10, padding:"10px 16px", textAlign:"center", minWidth:72,
                          transform: hovered===card.id ? "translateX(-3px)" : "none",
                          transition:"all 0.3s ease" }}>
                          <div style={{ fontSize:16, fontWeight:900, color: hovered===card.id ? card.badgeColor : "#fff",
                            transition:"color 0.3s" }}>{s.v}</div>
                          <div style={{ fontSize:8, color:"rgba(255,255,255,0.3)", textTransform:"uppercase",
                            letterSpacing:"0.06em", marginTop:2 }}>{s.l}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hover corner glow */}
                  {hovered===card.id && (
                    <div style={{ position:"absolute", bottom:-30, right:-30, width:140, height:140,
                      borderRadius:"50%", background:`radial-gradient(circle, ${card.glow}30 0%, transparent 70%)`,
                      pointerEvents:"none" }}/>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div style={{ marginTop:"clamp(10px,2vh,20px)", textAlign:"center", animation: mounted ? "fadeUp 1s ease 0.25s both" : "none" }}>
            <div style={{ fontSize:10, color:"rgba(255,255,255,0.12)", letterSpacing:"0.12em", marginBottom:6 }}>
              DUBAI ROVERS PLATFORM · EST. 2015 · DUBAI, UAE 🇦🇪
            </div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:16, flexWrap:"wrap" }}>
              {["24/7 WhatsApp Support","Free Consultation","AI Powered","Dubai Based","DLD Verified Data"].map(t => (
                <span key={t} style={{ fontSize:9, color:"rgba(255,255,255,0.15)", display:"flex", alignItems:"center", gap:4 }}>
                  <span style={{ color:"rgba(200,169,110,0.3)", fontSize:7 }}>✦</span>{t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* WhatsApp */}
        <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
          style={{ position:"fixed", bottom:22, right:22, zIndex:50, width:50, height:50, borderRadius:"50%",
            background:"#25D366", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22,
            textDecoration:"none", boxShadow:"0 6px 20px rgba(37,211,102,0.45)", animation:"float 3s ease-in-out infinite" }}>
          💬
        </a>
      </div>
    </>
  );
}
