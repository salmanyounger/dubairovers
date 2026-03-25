"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";


const PLATFORMS = [
  { id:"tours", tag:"TOURS & EXPERIENCES", tagColor:"#F59E0B", title:"Dubai Rovers Adventures", desc:"Desert safaris, hot air balloons, dhow cruises — hotel pickup included on every tour.", emoji:"🏜️", bgGradient:"linear-gradient(135deg,#1a0800,#2d1500)", stats:[{num:"4.9★",lbl:"RATING"},{num:"80+",lbl:"COUNTRIES"},{num:"24",lbl:"TOURS"}], href:"/tours", category:"tours" },
  { id:"properties", tag:"REAL ESTATE · AI", tagColor:"#00BFFF", title:"Dubai Properties", desc:"30+ UAE properties, AI scoring, mortgage calculators, market trends & ROI analysis.", emoji:"🏢", bgGradient:"linear-gradient(135deg,#00102a,#001f4a)", stats:[{num:"30+",lbl:"PROPERTIES"},{num:"AI",lbl:"SCORING"}], href:"/properties", category:"properties" },
  { id:"archai", tag:"AI VILLA DESIGN", tagColor:"#C9A84C", title:"ARCHAI Villa Designer", desc:"Design your dream villa in 3 minutes — 9 styles, floor plans, PKR cost estimate.", emoji:"🏛️", bgGradient:"linear-gradient(135deg,#0f0a00,#2a1f00)", stats:[{num:"9",lbl:"STYLES"},{num:"Free",lbl:"UNTIL 2026"}], href:"/archai", category:"ai" },
  { id:"salmanfx", tag:"FOREX EA · MT4/MT5", tagColor:"#10B981", title:"SalmanFX Robot", desc:"Parabolic SAR strategy, multi-stage money management, live dashboard.", emoji:"📈", bgGradient:"linear-gradient(135deg,#001a0f,#003322)", stats:[{num:"MT4",lbl:"PLATFORM"},{num:"Auto",lbl:"TRADING"}], href:"/salmanfx", category:"forex" },
  { id:"webbuilder", tag:"WEB DEV · DUBAI", tagColor:"#A855F7", title:"Web Builder", desc:"18+ business categories, 5 style tiers, multilingual, booking forms and admin panels.", emoji:"💻", bgGradient:"linear-gradient(135deg,#1a001a,#3d0033)", stats:[{num:"18+",lbl:"CATEGORIES"},{num:"Fast",lbl:"DELIVERY"}], href:"/webbuilder", category:"webdev" },
  { id:"alnoor", tag:"ISLAMIC APP · FREE", tagColor:"#2ECC71", title:"Al-Noor", desc:"Full Quran offline (114 Surahs), prayer times via GPS, live Qibla compass.", emoji:"🌙", bgGradient:"linear-gradient(135deg,#001a00,#003300)", stats:[{num:"114",lbl:"SURAHS"},{num:"GPS",lbl:"PRAYER"}], href:"/al-noor", category:"islamic" },
];
const CATEGORIES = ["All Platforms","🏜️ Tours","🏢 Properties","🤖 AI Design","📈 Forex","💻 Web Dev","🌙 Islamic"];
const CAT_MAP = {"🏜️ Tours":"tours","🏢 Properties":"properties","🤖 AI Design":"ai","📈 Forex":"forex","💻 Web Dev":"webdev","🌙 Islamic":"islamic"};

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
      <style suppressHydrationWarning>{`
        .desktop-view { display:block; }
        .mobile-view { display:none; }
        @media (max-width: 768px) {
          .desktop-view { display:none !important; }
          .mobile-view { display:block !important; }
        }
      `}</style>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&display=swap"/>
      <div className="desktop-view">
      <div suppressHydrationWarning style={{ position:"relative", minHeight:"100vh", background:"#06070d", fontFamily:"'Plus Jakarta Sans',sans-serif", overflowX:"hidden" }}>
        <style suppressHydrationWarning>{`
          *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
          .desktop-view { display:block; }
          .mobile-view { display:none; }
          @media (max-width: 768px) {
            .desktop-view { display:none !important; }
            .mobile-view { display:block !important; }
          }
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
          .alnoor-card:hover .alnoor-door-left { transform:perspective(1200px) rotateY(-28deg) !important; }
          .alnoor-card:hover .alnoor-door-right { transform:perspective(1200px) rotateY(28deg) !important; }
          .alnoor-card:hover .centre-door-left { transform:perspective(400px) rotateY(-55deg) !important; }
          .alnoor-card:hover .centre-door-right { transform:perspective(400px) rotateY(55deg) !important; }
          .alnoor-card:hover .alnoor-glow { opacity:1 !important; }
          .alnoor-card:hover .alnoor-cta { transform:scale(1.05) translateY(-2px); box-shadow:0 8px 24px rgba(46,204,113,0.6) !important; }
          .alnoor-card { transition:box-shadow 0.4s, border-color 0.4s; }
          .alnoor-card:hover { border-color:rgba(212,168,67,0.5) !important; box-shadow:0 20px 60px rgba(212,168,67,0.2) !important; }
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

          {/* ── AL-NOOR MOSQUE CARD ── */}
          <div style={{ width:"100%", maxWidth:1380, marginTop:"clamp(10px,1.5vh,18px)", animation: mounted ? "fadeUp 1s ease 0.2s both" : "none" }}>
            <a href="/al-noor" className="alnoor-card" style={{ textDecoration:"none", display:"block", position:"relative", borderRadius:24, overflow:"hidden", minHeight:"clamp(380px,52vh,560px)", cursor:"pointer", border:"2px solid rgba(212,168,67,0.5)", boxShadow:"0 8px 40px rgba(0,0,0,0.6)" }}>

              {/* ── BACKGROUND ── */}
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(160deg, #041f08 0%, #072d0d 35%, #0a3810 65%, #051e08 100%)" }}/>

              {/* Stars */}
              <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(2.5px 2.5px at 8% 12%, rgba(212,168,67,1.0) 0%, transparent 100%), radial-gradient(1.5px 1.5px at 18% 28%, rgba(255,255,255,0.5) 0%, transparent 100%), radial-gradient(2px 2px at 30% 8%, rgba(212,168,67,0.6) 0%, transparent 100%), radial-gradient(1px 1px at 45% 18%, rgba(255,255,255,0.4) 0%, transparent 100%), radial-gradient(2px 2px at 60% 6%, rgba(212,168,67,0.8) 0%, transparent 100%), radial-gradient(1.5px 1.5px at 72% 22%, rgba(255,255,255,0.5) 0%, transparent 100%), radial-gradient(2px 2px at 85% 10%, rgba(212,168,67,0.7) 0%, transparent 100%), radial-gradient(1px 1px at 92% 30%, rgba(255,255,255,0.3) 0%, transparent 100%), radial-gradient(2.5px 2.5px at 95% 8%, rgba(212,168,67,0.9) 0%, transparent 100%), radial-gradient(1px 1px at 3% 40%, rgba(255,255,255,0.3) 0%, transparent 100%)" }}/>

              {/* Geometric pattern */}
              <div style={{ position:"absolute", inset:0, opacity:0.10, backgroundImage:"repeating-linear-gradient(60deg,#d4a843 0,#d4a843 1px,transparent 0,transparent 50%), repeating-linear-gradient(120deg,#d4a843 0,#d4a843 1px,transparent 0,transparent 50%)", backgroundSize:"28px 48px" }}/>

              {/* Radial glow centre */}
              <div className="alnoor-glow" style={{ position:"absolute", inset:0, background:"radial-gradient(ellipse 70% 80% at 50% 55%, rgba(46,204,113,0.35) 0%, rgba(212,168,67,0.18) 40%, transparent 70%)", opacity:0.8, transition:"opacity 0.6s" }}/>

              {/* ── MOSQUE SVG FACADE (top) ── */}
              <div style={{ position:"absolute", top:0, left:0, right:0, display:"flex", justifyContent:"center", alignItems:"flex-start", paddingTop:0, zIndex:1, pointerEvents:"none" }}>
                <svg viewBox="0 0 1000 160" style={{ width:"100%", height:"auto", maxHeight:140 }} preserveAspectRatio="xMidYMin meet">
                  {/* Sky gradient */}
                  <defs>
                    <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#030d05"/>
                      <stop offset="100%" stopColor="transparent"/>
                    </linearGradient>
                    <linearGradient id="goldG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f0c060"/>
                      <stop offset="100%" stopColor="#9a7a30"/>
                    </linearGradient>
                  </defs>
                  {/* Main dome centre */}
                  <ellipse cx="500" cy="90" rx="90" ry="90" fill="rgba(5,25,10,0.95)" stroke="rgba(212,168,67,0.5)" strokeWidth="1.5"/>
                  <path d="M420,90 Q500,10 580,90" fill="rgba(5,25,10,0.95)" stroke="rgba(212,168,67,0.6)" strokeWidth="2"/>
                  {/* Centre finial */}
                  <line x1="500" y1="10" x2="500" y2="0" stroke="#d4a843" strokeWidth="2"/>
                  <polygon points="500,0 495,12 505,12" fill="#d4a843"/>
                  <circle cx="500" cy="22" r="4" fill="none" stroke="#d4a843" strokeWidth="1.5"/>
                  {/* Left small dome */}
                  <ellipse cx="330" cy="95" rx="55" ry="55" fill="rgba(5,22,9,0.95)" stroke="rgba(212,168,67,0.35)" strokeWidth="1.2"/>
                  <path d="M278,95 Q330,47 382,95" fill="rgba(5,22,9,0.95)" stroke="rgba(212,168,67,0.4)" strokeWidth="1.5"/>
                  <line x1="330" y1="47" x2="330" y2="38" stroke="#d4a843" strokeWidth="1.5"/>
                  <polygon points="330,38 326,49 334,49" fill="#d4a843"/>
                  {/* Right small dome */}
                  <ellipse cx="670" cy="95" rx="55" ry="55" fill="rgba(5,22,9,0.95)" stroke="rgba(212,168,67,0.35)" strokeWidth="1.2"/>
                  <path d="M618,95 Q670,47 722,95" fill="rgba(5,22,9,0.95)" stroke="rgba(212,168,67,0.4)" strokeWidth="1.5"/>
                  <line x1="670" y1="47" x2="670" y2="38" stroke="#d4a843" strokeWidth="1.5"/>
                  <polygon points="670,38 666,49 674,49" fill="#d4a843"/>
                  {/* Left minaret */}
                  <rect x="100" y="30" width="28" height="130" fill="rgba(4,20,8,0.97)" stroke="rgba(212,168,67,0.3)" strokeWidth="1"/>
                  <polygon points="114,10 102,32 126,32" fill="rgba(212,168,67,0.7)"/>
                  <line x1="114" y1="4" x2="114" y2="0" stroke="#d4a843" strokeWidth="1.5"/>
                  <rect x="103" y="55" width="22" height="8" fill="rgba(212,168,67,0.15)" stroke="rgba(212,168,67,0.2)" strokeWidth="0.5"/>
                  <rect x="103" y="85" width="22" height="8" fill="rgba(212,168,67,0.15)" stroke="rgba(212,168,67,0.2)" strokeWidth="0.5"/>
                  <rect x="103" y="115" width="22" height="8" fill="rgba(212,168,67,0.15)" stroke="rgba(212,168,67,0.2)" strokeWidth="0.5"/>
                  {/* Right minaret */}
                  <rect x="872" y="30" width="28" height="130" fill="rgba(4,20,8,0.97)" stroke="rgba(212,168,67,0.3)" strokeWidth="1"/>
                  <polygon points="886,10 874,32 898,32" fill="rgba(212,168,67,0.7)"/>
                  <line x1="886" y1="4" x2="886" y2="0" stroke="#d4a843" strokeWidth="1.5"/>
                  <rect x="875" y="55" width="22" height="8" fill="rgba(212,168,67,0.15)" stroke="rgba(212,168,67,0.2)" strokeWidth="0.5"/>
                  <rect x="875" y="85" width="22" height="8" fill="rgba(212,168,67,0.15)" stroke="rgba(212,168,67,0.2)" strokeWidth="0.5"/>
                  <rect x="875" y="115" width="22" height="8" fill="rgba(212,168,67,0.15)" stroke="rgba(212,168,67,0.2)" strokeWidth="0.5"/>
                  {/* Base wall */}
                  <rect x="0" y="140" width="1000" height="20" fill="rgba(4,18,8,0.98)" stroke="rgba(212,168,67,0.2)" strokeWidth="1"/>
                  {/* Decorative arch windows on wall */}
                  {[150,250,350,450,550,650,750,850].map((x,i) => (
                    `<path key="${i}" d="M${x-15},160 L${x-15},148 Q${x},138 ${x+15},148 L${x+15},160" fill="rgba(212,168,67,0.06)" stroke="rgba(212,168,67,0.15)" strokeWidth="0.8"/>`
                  )).join("")}
                  {/* Moon top right */}
                  <text x="950" y="35" fontSize="22" textAnchor="middle" fill="rgba(212,168,67,0.9)">🌙</text>
                </svg>
              </div>

              {/* ── MAIN CONTENT AREA ── */}
              <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"stretch", zIndex:2, paddingTop:"clamp(110px,15vw,155px)" }}>

                {/* LEFT PANEL (SalmanFX style — door that opens) */}
                <div className="alnoor-door-left" style={{ flex:1, padding:"16px 20px 20px", display:"flex", flexDirection:"column", justifyContent:"space-between", borderRight:"1px solid rgba(212,168,67,0.15)", transformOrigin:"left center", transition:"transform 0.8s cubic-bezier(0.23,1,0.32,1)", transform:"perspective(1200px) rotateY(0deg)" }}>
                  {/* Windows top */}
                  <div style={{ display:"flex", gap:10, marginBottom:12 }}>
                    {[0,1].map(i => (
                      <div key={i} style={{ flex:1, height:28, background:"rgba(212,168,67,0.14)", border:"1px solid rgba(212,168,67,0.4)", borderRadius:"50% 50% 0 0", display:"flex", alignItems:"center", justifyContent:"center", fontSize:12 }}>
                        {i===0?"⭐":"✨"}
                      </div>
                    ))}
                  </div>
                  {/* Lines — text info */}
                  <div style={{ flex:1, display:"flex", flexDirection:"column", gap:8 }}>
                    {[["📖","Full Quran","114 Surahs + English"],["🕌","Prayer Times","Fajr to Isha · GPS"],["🧭","Qibla Finder","Live compass direction"]].map(([ic,t,s]) => (
                      <div key={t} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 10px", background:"rgba(212,168,67,0.09)", border:"1px solid rgba(212,168,67,0.22)", borderRadius:8 }}>
                        <span style={{ fontSize:16 }}>{ic}</span>
                        <div>
                          <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.8)" }}>{t}</div>
                          <div style={{ fontSize:9, color:"rgba(212,168,67,0.6)" }}>{s}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CENTRE COLUMN — Main door */}
                <div style={{ width:"clamp(160px,22%,260px)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"space-between", padding:"12px 16px 0", borderRight:"1px solid rgba(212,168,67,0.15)" }}>
                  {/* Arabic calligraphy */}
                  <div style={{ textAlign:"center" }}>
                    <div style={{ fontFamily:"'Noto Naskh Arabic',serif", fontSize:"clamp(18px,2.5vw,32px)", color:"#f0c060", textShadow:"0 0 30px rgba(212,168,67,1.0), 0 0 60px rgba(212,168,67,0.7), 0 0 90px rgba(212,168,67,0.4)", lineHeight:1.3, marginBottom:4 }}>
                      النور
                    </div>
                    <div style={{ fontFamily:"'Noto Naskh Arabic',serif", fontSize:"clamp(13px,1.8vw,22px)", color:"rgba(240,192,96,0.7)", marginBottom:8 }}>
                      رَمَضَانُ كَرِيم
                    </div>
                    <div style={{ fontSize:"clamp(8px,0.9vw,11px)", fontWeight:800, letterSpacing:"0.2em", color:"rgba(46,204,113,0.7)", textTransform:"uppercase", marginBottom:12 }}>AL-NOOR</div>
                  </div>

                  {/* THE DOOR */}
                  <div style={{ width:"100%", flex:1, position:"relative", display:"flex", flexDirection:"column" }}>
                    {/* Arch top */}
                    <div style={{ width:"80%", height:"clamp(30px,5vw,50px)", margin:"0 auto", background:"rgba(212,168,67,0.06)", border:"1.5px solid rgba(212,168,67,0.35)", borderBottom:"none", borderRadius:"50% 50% 0 0" }}/>
                    {/* Door body — two panels */}
                    <div style={{ flex:1, display:"flex", gap:2, width:"80%", margin:"0 auto" }}>
                      {/* Left door panel */}
                      <div className="centre-door-left" style={{ flex:1, background:"linear-gradient(160deg,#083518,#0f4a1e)", border:"1px solid rgba(212,168,67,0.3)", borderRight:"1px solid rgba(212,168,67,0.2)", borderRadius:"0 0 0 6px", transformOrigin:"left center", transition:"transform 0.8s cubic-bezier(0.23,1,0.32,1)", transform:"perspective(400px) rotateY(0deg)", position:"relative", overflow:"hidden" }}>
                        <div style={{ position:"absolute", inset:4, border:"1px solid rgba(212,168,67,0.12)", borderRadius:3 }}/>
                        <div style={{ position:"absolute", inset:8, border:"1px solid rgba(212,168,67,0.06)", borderRadius:2 }}/>
                        {/* handle */}
                        <div style={{ position:"absolute", right:6, top:"55%", width:5, height:18, background:"linear-gradient(to bottom,#d4a843,#9a7a30)", borderRadius:3, boxShadow:"0 0 6px rgba(212,168,67,0.6)" }}/>
                      </div>
                      {/* Right door panel */}
                      <div className="centre-door-right" style={{ flex:1, background:"linear-gradient(160deg,#083518,#0f4a1e)", border:"1px solid rgba(212,168,67,0.3)", borderLeft:"1px solid rgba(212,168,67,0.2)", borderRadius:"0 0 6px 0", transformOrigin:"right center", transition:"transform 0.8s cubic-bezier(0.23,1,0.32,1)", transform:"perspective(400px) rotateY(0deg)", position:"relative", overflow:"hidden" }}>
                        <div style={{ position:"absolute", inset:4, border:"1px solid rgba(212,168,67,0.12)", borderRadius:3 }}/>
                        <div style={{ position:"absolute", inset:8, border:"1px solid rgba(212,168,67,0.06)", borderRadius:2 }}/>
                        <div style={{ position:"absolute", left:6, top:"55%", width:5, height:18, background:"linear-gradient(to bottom,#d4a843,#9a7a30)", borderRadius:3, boxShadow:"0 0 6px rgba(212,168,67,0.6)" }}/>
                      </div>
                    </div>
                    {/* Threshold */}
                    <div style={{ width:"80%", height:6, margin:"0 auto", background:"linear-gradient(90deg,rgba(212,168,67,0.4),rgba(212,168,67,0.8),rgba(212,168,67,0.4))", borderRadius:"0 0 4px 4px" }}/>
                    {/* Steps */}
                    {[1,2,3].map(s => (
                      <div key={s} style={{ width:`${80+s*5}%`, height:5, margin:`2px auto 0`, background:`rgba(212,168,67,${0.12-s*0.03})`, borderRadius:2 }}/>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="alnoor-cta" style={{ margin:"12px 0", padding:"9px 18px", background:"linear-gradient(135deg,#2ecc71,#1a8c40)", borderRadius:10, fontSize:"clamp(9px,1vw,12px)", fontWeight:800, color:"#fff", letterSpacing:"0.05em", boxShadow:"0 4px 16px rgba(46,204,113,0.4)", transition:"all 0.3s", whiteSpace:"nowrap" }}>
                    Enter Al-Noor ☪️
                  </div>
                </div>

                {/* RIGHT PANEL */}
                <div className="alnoor-door-right" style={{ flex:1, padding:"16px 20px 20px", display:"flex", flexDirection:"column", justifyContent:"space-between", borderLeft:"1px solid rgba(212,168,67,0.15)", transformOrigin:"right center", transition:"transform 0.8s cubic-bezier(0.23,1,0.32,1)", transform:"perspective(1200px) rotateY(0deg)" }}>
                  {/* Windows top */}
                  <div style={{ display:"flex", gap:10, marginBottom:12 }}>
                    {[0,1,2].map(i => (
                      <div key={i} style={{ flex:1, height:28, background:"rgba(212,168,67,0.14)", border:"1px solid rgba(212,168,67,0.4)", borderRadius:"50% 50% 0 0", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10 }}>
                        {["⭐","🌟","✨"][i]}
                      </div>
                    ))}
                  </div>
                  {/* Lines */}
                  <div style={{ flex:1, display:"flex", flexDirection:"column", gap:8 }}>
                    {[["📿","Tasbeeh Counter","33 · 99 · 100 modes"],["🤲","Daily Duas","Morning, sleep & more"],["🌙","Hijri Calendar","Islamic dates daily"]].map(([ic,t,s]) => (
                      <div key={t} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 10px", background:"rgba(212,168,67,0.09)", border:"1px solid rgba(212,168,67,0.22)", borderRadius:8 }}>
                        <span style={{ fontSize:16 }}>{ic}</span>
                        <div>
                          <div style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.8)" }}>{t}</div>
                          <div style={{ fontSize:9, color:"rgba(212,168,67,0.6)" }}>{s}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Gold border frame */}
              <div style={{ position:"absolute", inset:0, borderRadius:24, border:"1.5px solid rgba(212,168,67,0.2)", pointerEvents:"none", zIndex:10 }}/>
              <div style={{ position:"absolute", inset:6, borderRadius:20, border:"1px solid rgba(212,168,67,0.07)", pointerEvents:"none", zIndex:10 }}/>
            </a>
          </div>

          {/* Footer */}          {/* Footer */}
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
      {/* ── MOBILE VIEW ── */}
      <div className="mobile-view">
    <div suppressHydrationWarning style={{
      maxWidth: "430px", margin: "0 auto",
      minHeight: "100vh", background: "#080808",
      color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif",
      overflowX: "hidden",
    }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:ital,wght@0,900;1,900&display=swap"/>
      <style suppressHydrationWarning>{`
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(1.4)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .card-link:active > div { transform: scale(0.98); }
        .cat-pill { transition: all 0.2s; }
        .card-anim { animation: slideUp 0.4s ease both; }
      `}</style>

      {/* HEADER */}
      <div style={{ padding: "20px 18px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg,#f97316,#ec4899)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>🏜️</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Dubai Rovers</div>
            <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: "1.5px", textTransform: "uppercase" }}>Platform Hub</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 6, padding: "5px 10px" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", display: "inline-block", animation: "pulse 2s ease-in-out infinite" }}/>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#10b981" }}>LIVE</span>
        </div>
      </div>

      {/* HERO */}
      <div style={{ padding: "8px 18px 20px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 20, padding: "5px 14px", fontSize: 9, fontWeight: 700, letterSpacing: "2px", color: "#F59E0B", textTransform: "uppercase", marginBottom: 14 }}>
          Welcome to
        </div>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(32px,9vw,52px)", fontWeight: 900, lineHeight: 1.0, letterSpacing: "-1px", marginBottom: 12 }}>
          <span style={{ color: "#fff" }}>Everything</span><br/>
          <span style={{ color: "#F59E0B", fontStyle: "italic" }}>Salman</span><br/>
          <span style={{ color: "#fff" }}>Built in Dubai</span>
        </h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", maxWidth: 280, margin: "0 auto 20px" }}>
          Tours · Properties · AI Design · Forex EA · Web Dev
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <Link href="/tours" style={{ flex: 1, maxWidth: 160, display: "flex", alignItems: "center", justifyContent: "center", padding: "13px", background: "linear-gradient(135deg,#F59E0B,#f97316)", borderRadius: 12, color: "#000", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
            Explore All →
          </Link>
          <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "13px 16px", background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.3)", borderRadius: 12, color: "#25d366", fontSize: 13, fontWeight: 700, textDecoration: "none" }}>
            💬 WhatsApp
          </a>
        </div>
      </div>

      {/* CATEGORY FILTER */}
      <div style={{ overflowX: "auto", padding: "4px 18px", display: "flex", gap: 8, scrollbarWidth: "none" }}>
        {CATEGORIES.map(cat => (
          <button key={cat} className="cat-pill" onClick={() => setActiveCategory(cat)}
            style={{
              flexShrink: 0, padding: "8px 16px", borderRadius: 20, border: "1px solid",
              borderColor: activeCategory === cat ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.1)",
              background: activeCategory === cat ? "rgba(245,158,11,0.12)" : "transparent",
              color: activeCategory === cat ? "#F59E0B" : "rgba(255,255,255,0.6)",
              fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
            }}>
            {cat}
          </button>
        ))}
      </div>

      {/* COUNT */}
      <div style={{ padding: "8px 18px", fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
        Showing {filtered.length} platform{filtered.length !== 1 ? "s" : ""}
      </div>

      {/* CARDS */}
      <div style={{ padding: "0 18px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
        {filtered.map((p, i) => (
          <Link key={p.id} href={p.href} className="card-link" style={{ textDecoration: "none" }}>
            <div className="card-anim" style={{
              background: "#111111", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 20, overflow: "hidden", display: "flex",
              transition: "transform 0.2s ease",
              animationDelay: `${i * 60}ms`,
            }}>
              {/* IMAGE AREA */}
              <div style={{
                width: p.featured ? 130 : 110, minHeight: 130, flexShrink: 0,
                background: p.bgGradient, display: "flex", alignItems: "center",
                justifyContent: "center", position: "relative",
              }}>
                <span style={{ fontSize: 48, opacity: 0.6 }}>{p.emoji}</span>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, transparent 60%, rgba(17,17,17,0.6))" }}/>
              </div>

              {/* CONTENT AREA */}
              <div style={{ padding: "16px 14px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0 }}>
                <div>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: p.tagColor, marginBottom: 5 }}>{p.tag}</div>
                  <div style={{ fontSize: p.featured ? 16 : 15, fontWeight: p.featured ? 900 : 800, color: "#fff", letterSpacing: "-0.2px", marginBottom: 6, lineHeight: 1.3 }}>{p.title}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>{p.desc}</div>
                </div>
                <div style={{ marginTop: 12, display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", gap: 14 }}>
                    {p.stats.map(s => (
                      <div key={s.lbl}>
                        <div style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>{s.num}</div>
                        <div style={{ fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.5px", marginTop: 1 }}>{s.lbl}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#F59E0B", flexShrink: 0 }}>→</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* FOOTER */}
      <div style={{ padding: "24px 18px 40px" }}>
        <button onClick={() => window.open("https://wa.me/971544735060")}
          style={{ width: "100%", padding: 16, background: "linear-gradient(135deg,#128c7e,#25d366)", borderRadius: 16, border: "none", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 8px 30px rgba(37,211,102,0.25)", animation: "float 3s ease-in-out infinite", marginBottom: 16 }}>
          💬 Book via WhatsApp
        </button>
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>© 2026 DubaiRovers.com · All Rights Reserved</span>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
          <Link href="/privacy" style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Privacy Policy</Link>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.15)" }}>·</span>
          <Link href="/terms" style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Terms & Conditions</Link>
        </div>
      </div>
    </div>
      </div>
    </>
  );
}