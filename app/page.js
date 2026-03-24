"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const PLATFORMS = [
  {
    id: "tours",
    tag: "TOURS & EXPERIENCES",
    tagColor: "#F59E0B",
    title: "Dubai Rovers Adventures",
    desc: "Desert safaris, hot air balloons, dhow cruises — hotel pickup included on every tour.",
    emoji: "🏜️",
    bgGradient: "linear-gradient(135deg, #1a0800, #2d1500)",
    stats: [
      { num: "4.9★", lbl: "RATING" },
      { num: "80+",  lbl: "COUNTRIES" },
      { num: "24",   lbl: "TOURS" },
    ],
    href: "/tours",
    featured: true,
    category: "tours",
  },
  {
    id: "properties",
    tag: "REAL ESTATE · AI",
    tagColor: "#00BFFF",
    title: "Dubai Properties",
    desc: "30+ UAE properties, AI scoring, mortgage calculators, market trends & ROI analysis.",
    emoji: "🏢",
    bgGradient: "linear-gradient(135deg, #00102a, #001f4a)",
    stats: [
      { num: "30+", lbl: "PROPERTIES" },
      { num: "AI",  lbl: "SCORING" },
    ],
    href: "/properties",
    featured: false,
    category: "properties",
  },
  {
    id: "archai",
    tag: "AI VILLA DESIGN",
    tagColor: "#C9A84C",
    title: "ARCHAI Villa Designer",
    desc: "Design your dream villa in 3 minutes — 9 styles, floor plans, PKR cost estimate, AI render.",
    emoji: "🏛️",
    bgGradient: "linear-gradient(135deg, #0f0a00, #2a1f00)",
    stats: [
      { num: "9",    lbl: "STYLES" },
      { num: "Free", lbl: "UNTIL 2026" },
    ],
    href: "/archai",
    featured: false,
    category: "ai",
  },
  {
    id: "salmanfx",
    tag: "FOREX EA · MT4/MT5",
    tagColor: "#10B981",
    title: "SalmanFX Robot",
    desc: "Parabolic SAR strategy, multi-stage money management, live dashboard. Set it and let it trade.",
    emoji: "📈",
    bgGradient: "linear-gradient(135deg, #001a0f, #003322)",
    stats: [
      { num: "MT4",  lbl: "PLATFORM" },
      { num: "Auto", lbl: "TRADING" },
    ],
    href: "/salmanfx",
    featured: false,
    category: "forex",
  },
  {
    id: "webbuilder",
    tag: "WEB DEV · DUBAI",
    tagColor: "#A855F7",
    title: "Web Builder",
    desc: "18+ business categories, 5 style tiers, multilingual, booking forms and full admin panels.",
    emoji: "💻",
    bgGradient: "linear-gradient(135deg, #1a001a, #3d0033)",
    stats: [
      { num: "18+",  lbl: "CATEGORIES" },
      { num: "Fast", lbl: "DELIVERY" },
    ],
    href: "/webbuilder",
    featured: false,
    category: "webdev",
  },
  {
    id: "alnoor",
    tag: "ISLAMIC APP · FREE",
    tagColor: "#2ECC71",
    title: "Al-Noor",
    desc: "Full Quran offline (114 Surahs), prayer times via GPS, live Qibla compass, Azan player.",
    emoji: "🌙",
    bgGradient: "linear-gradient(135deg, #001a00, #003300)",
    stats: [
      { num: "114", lbl: "SURAHS" },
      { num: "GPS", lbl: "PRAYER" },
    ],
    href: "/al-noor",
    featured: false,
    category: "islamic",
  },
];

const CATEGORIES = [
  "All Platforms", "🏜️ Tours", "🏢 Properties",
  "🤖 AI Design", "📈 Forex", "💻 Web Dev", "🌙 Islamic"
];

const CAT_MAP = {
  "🏜️ Tours": "tours",
  "🏢 Properties": "properties",
  "🤖 AI Design": "ai",
  "📈 Forex": "forex",
  "💻 Web Dev": "webdev",
  "🌙 Islamic": "islamic",
};

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All Platforms");

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const filtered = activeCategory === "All Platforms"
    ? PLATFORMS
    : PLATFORMS.filter(p => p.category === CAT_MAP[activeCategory]);

  return (
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
  );
}
