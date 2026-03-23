"use client";
import { useState, useEffect } from "react";
import { AboutAnimation } from "../components/PageHeroAnimations";
const WA = "971544735060";

export default function AboutPage() {
  const [hidden, setHidden] = useState(null);
  useEffect(() => {
    try {
      const pv = JSON.parse(localStorage.getItem("dr_page_visibility") || "{}");
      setHidden(pv.about === false);
    } catch { setHidden(false); }
  }, []);

  if (hidden === null) return null;
  if (hidden) return (
    <div style={{ minHeight:"100vh", background:"#0a0a0a", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Outfit',sans-serif", flexDirection:"column", gap:16, textAlign:"center", padding:24, color:"#fff" }}>
      <div style={{ fontSize:56 }}>ℹ️</div>
      <div style={{ fontSize:28, fontWeight:800 }}>About Us</div>
      <div style={{ color:"rgba(255,255,255,.5)", fontSize:15, maxWidth:360 }}>This page is temporarily unavailable.</div>
      <a href="/" style={{ padding:"12px 26px", background:"linear-gradient(135deg,#f97316,#ec4899)", borderRadius:12, color:"#fff", fontWeight:700, fontSize:14, textDecoration:"none" }}>← Back to Home</a>
    </div>
  );

  const STATS = [
    { icon:"😊", value:"10,000+", label:"Happy Guests" },
    { icon:"🌍", value:"80+",     label:"Countries" },
    { icon:"⭐", value:"4.9/5",   label:"Avg Rating" },
    { icon:"🗓️", value:"Since 2019", label:"Established" },
    { icon:"🎯", value:"6",       label:"Tour Types" },
    { icon:"💬", value:"<5 min",  label:"WA Response" },
  ];

  const TEAM = [
    { name:"Ahmed Al-Rashidi", role:"Founder & Lead Guide", emoji:"👨‍💼", flag:"🇦🇪", bio:"Born in Dubai, Ahmed has guided over 3,000 tours across the desert conservation reserve." },
    { name:"Sara Khan",        role:"Head of Operations",   emoji:"👩‍💻", flag:"🇮🇳", bio:"Sara ensures every booking is seamless — from pickup timing to special requests." },
    { name:"Marco Rossi",      role:"Senior Tour Guide",    emoji:"🧭",   flag:"🇮🇹", bio:"Former luxury travel consultant with 8 years of UAE expertise. Speaks 4 languages." },
  ];

  const AWARDS = [
    { icon:"🏆", label:"TripAdvisor Excellence 2024" },
    { icon:"🥇", label:"#1 Dubai Desert Safari" },
    { icon:"✅", label:"UAE Tourism Licensed" },
    { icon:"🌟", label:"Best Experience Award 2023" },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"#060D14", fontFamily:"'Outfit',sans-serif", color:"#fff" }}>

      {/* ── HERO — About Animation ── */}
      <div style={{ position:"relative", height:400, overflow:"hidden" }}>
        <AboutAnimation />
      </div>

      {/* ── STATS STRIP ── */}
      <div style={{ background:"rgba(245,158,11,0.05)", borderTop:"1px solid rgba(245,158,11,0.12)", borderBottom:"1px solid rgba(245,158,11,0.12)", padding:"28px 24px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:20 }}>
          {STATS.map(s => (
            <div key={s.label} style={{ textAlign:"center" }}>
              <div style={{ fontSize:24, marginBottom:6 }}>{s.icon}</div>
              <div style={{ fontSize:22, fontWeight:800, color:"#F59E0B", lineHeight:1 }}>{s.value}</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", textTransform:"uppercase", letterSpacing:"0.08em", marginTop:4, fontWeight:600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:900, margin:"0 auto", padding:"60px 24px 80px" }}>

        {/* ── OUR STORY ── */}
        <div style={{ marginBottom:64 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:30, padding:"6px 18px", marginBottom:20 }}>
            <span style={{ fontSize:12, color:"#F59E0B", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase" }}>✦ Our Story</span>
          </div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:36, fontWeight:700, marginBottom:24, lineHeight:1.25 }}>
            Born in the Desert,<br/><span style={{ color:"#F59E0B" }}>Built for the World</span>
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:32 }}>
            <p style={{ color:"rgba(255,255,255,0.6)", fontSize:15, lineHeight:1.85, margin:0 }}>
              Dubai Rovers was founded in 2019 with a single mission: make Dubai's most incredible experiences genuinely accessible to every traveller — without the tourist-trap pricing or group-tour crowds. We started with just two jeeps and a deep knowledge of the desert.
            </p>
            <p style={{ color:"rgba(255,255,255,0.6)", fontSize:15, lineHeight:1.85, margin:0 }}>
              Today, we serve guests from 80+ countries, maintain a 4.9-star average across 7,000+ reviews, and operate 6 distinct tour categories. Every booking comes with hotel pickup, a multilingual guide, instant WhatsApp support, and our Best Price Guarantee.
            </p>
          </div>
        </div>

        {/* ── WHY CHOOSE US ── */}
        <div style={{ marginBottom:64 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:30, padding:"6px 18px", marginBottom:20 }}>
            <span style={{ fontSize:12, color:"#F59E0B", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase" }}>✦ Why Choose Us</span>
          </div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:30, fontWeight:700, marginBottom:28 }}>The <span style={{ color:"#F59E0B" }}>Dubai Rovers</span> Difference</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:16 }}>
            {[
              { icon:"🚗", title:"Hotel Pickup Included", desc:"We collect you directly from your hotel lobby — no confusing meeting points, no shared buses." },
              { icon:"🌍", title:"Multilingual Guides", desc:"Arabic, English, Russian, Hindi, French — your guide speaks your language fluently." },
              { icon:"💬", title:"WhatsApp 24/7", desc:"Real human support — not bots. Text us at any time and get a reply within 5 minutes." },
              { icon:"✅", title:"Fully Licensed", desc:"UAE Tourism Authority certified. Every guide is trained, background-checked and insured." },
              { icon:"💰", title:"Best Price Guarantee", desc:"Found it cheaper elsewhere? We match it and add a complimentary upgrade." },
              { icon:"📸", title:"Photo Memories", desc:"Professional photography add-on available. Take home stunning Dubai memories." },
            ].map(f => (
              <div key={f.title} style={{ padding:"22px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:18, transition:"border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(245,158,11,0.3)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}>
                <div style={{ fontSize:28, marginBottom:12 }}>{f.icon}</div>
                <div style={{ fontWeight:700, fontSize:15, marginBottom:8 }}>{f.title}</div>
                <div style={{ fontSize:13, color:"rgba(255,255,255,0.45)", lineHeight:1.65 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── MEET THE TEAM ── */}
        <div style={{ marginBottom:64 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:30, padding:"6px 18px", marginBottom:20 }}>
            <span style={{ fontSize:12, color:"#F59E0B", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase" }}>✦ The Team</span>
          </div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:30, fontWeight:700, marginBottom:28 }}>The People Behind <span style={{ color:"#F59E0B" }}>Every Adventure</span></h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:20 }}>
            {TEAM.map(m => (
              <div key={m.name} style={{ padding:"28px 24px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:20, textAlign:"center", transition:"all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(245,158,11,0.3)"; e.currentTarget.style.transform="translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; e.currentTarget.style.transform="translateY(0)"; }}>
                <div style={{ fontSize:52, marginBottom:12 }}>{m.emoji}</div>
                <div style={{ fontWeight:700, fontSize:16, marginBottom:4 }}>{m.name} {m.flag}</div>
                <div style={{ fontSize:12, color:"#F59E0B", fontWeight:600, marginBottom:12, textTransform:"uppercase", letterSpacing:"0.06em" }}>{m.role}</div>
                <div style={{ fontSize:13, color:"rgba(255,255,255,0.45)", lineHeight:1.65 }}>{m.bio}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── AWARDS ── */}
        <div style={{ marginBottom:56 }}>
          <div style={{ display:"flex", gap:14, flexWrap:"wrap", justifyContent:"center" }}>
            {AWARDS.map(a => (
              <div key={a.label} style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 20px", background:"rgba(245,158,11,0.07)", border:"1px solid rgba(245,158,11,0.18)", borderRadius:30 }}>
                <span style={{ fontSize:18 }}>{a.icon}</span>
                <span style={{ fontSize:12, color:"#F59E0B", fontWeight:600 }}>{a.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div style={{ textAlign:"center", padding:"48px 32px", background:"rgba(245,158,11,0.05)", border:"1px solid rgba(245,158,11,0.15)", borderRadius:24 }}>
          <div style={{ fontSize:40, marginBottom:16 }}>🏜️</div>
          <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, marginBottom:12 }}>Ready for Your Dubai Adventure?</h3>
          <p style={{ color:"rgba(255,255,255,0.45)", fontSize:14, marginBottom:28, lineHeight:1.7 }}>Join 10,000+ travellers from 80+ countries who chose Dubai Rovers for the experience of a lifetime.</p>
          <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
            <a href="/booking" style={{ padding:"13px 28px", background:"linear-gradient(135deg,#F59E0B,#D97706)", borderRadius:12, color:"#000", fontWeight:700, fontSize:14, textDecoration:"none", boxShadow:"0 6px 20px rgba(245,158,11,0.3)" }}>
              🎯 Book a Tour
            </a>
            <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" style={{ padding:"13px 28px", background:"linear-gradient(135deg,#25D366,#128C7E)", borderRadius:12, color:"#fff", fontWeight:700, fontSize:14, textDecoration:"none", display:"flex", alignItems:"center", gap:7 }}>
              💬 Chat on WhatsApp
            </a>
            <a href="/contact" style={{ padding:"13px 28px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:12, color:"rgba(255,255,255,0.7)", fontWeight:600, fontSize:14, textDecoration:"none" }}>
              📞 Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
