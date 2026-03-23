"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function PropertiesAbout() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  const T = { bg:"#080810", card:"rgba(255,255,255,0.04)", border:"rgba(255,255,255,0.08)", text:"#F1F5F9", sub:"rgba(255,255,255,0.45)", blue:"#6366F1", green:"#10B981", gold:"#F59E0B" };

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap"/>
      <div suppressHydrationWarning style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Inter',sans-serif" }}>
      <style suppressHydrationWarning>{`*{box-sizing:border-box}`}</style>
      <div style={{ background:"rgba(0,0,0,0.4)", borderBottom:`1px solid ${T.border}`, padding:"16px 28px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ fontSize:18, fontWeight:800 }}>🏙️ About Dubai Properties</div>
        <div style={{ display:"flex", gap:10 }}>
          <Link href="/properties/blog" style={{ color:T.sub, fontSize:13, textDecoration:"none", padding:"7px 14px" }}>Blog</Link>
          <Link href="/properties/contact" style={{ color:T.sub, fontSize:13, textDecoration:"none", padding:"7px 14px" }}>Contact</Link>
          <Link href="/properties" style={{ padding:"8px 16px", background:"linear-gradient(135deg,#6366F1,#4F46E5)", borderRadius:20, color:"#fff", fontSize:12, fontWeight:700, textDecoration:"none" }}>Browse Properties</Link>
        </div>
      </div>

      <div style={{ maxWidth:900, margin:"0 auto", padding:"52px 28px" }}>
        <div style={{ textAlign:"center", marginBottom:60 }}>
          <h1 style={{ fontSize:"clamp(30px,5vw,56px)", fontWeight:900, color:"#fff", marginBottom:12, lineHeight:1.1 }}>
            Dubai's smarter<br/>
            <span style={{ background:"linear-gradient(90deg,#6366F1,#818CF8)", backgroundClip:"text", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>property platform</span>
          </h1>
          <p style={{ fontSize:15, color:T.sub, lineHeight:1.8, maxWidth:540, margin:"0 auto" }}>
            Dubai Properties is an AI-powered comparison platform helping buyers, renters and investors make smarter decisions in the UAE real estate market.
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:56 }}>
          {[
            { n:"9+",      l:"Properties Listed",    c:T.blue },
            { n:"Free",    l:"AI Analysis",           c:T.green },
            { n:"7",       l:"UAE Bank Rates",        c:T.gold },
            { n:"DLD",     l:"Price Data Source",     c:"#EC4899" },
          ].map(s => (
            <div key={s.l} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"18px 14px", textAlign:"center" }}>
              <div style={{ fontSize:26, fontWeight:800, color:s.c, marginBottom:4 }}>{s.n}</div>
              <div style={{ fontSize:11, color:T.sub, textTransform:"uppercase", letterSpacing:"0.06em" }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:40 }}>
          {[
            { icon:"⚖️", title:"Side-by-side compare", desc:"Compare any 3 properties across 20+ data points — ROI, rent, amenities, DLD fees, Golden Visa eligibility." },
            { icon:"🤖", title:"AI property matching", desc:"Answer 5 questions and our AI scores all listings against your goals — budget, lifestyle, investment horizon." },
            { icon:"🧮", title:"UAE mortgage calculator", desc:"All 7 major UAE banks included. Adjust down payment, term and see monthly payments instantly." },
            { icon:"🗺️", title:"Live property map", desc:"See all properties on a live OpenStreetMap. Filter by area, type and price with real-time results." },
          ].map(f => (
            <div key={f.title} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"18px 20px" }}>
              <div style={{ fontSize:24, marginBottom:8 }}>{f.icon}</div>
              <div style={{ fontSize:14, fontWeight:700, marginBottom:6 }}>{f.title}</div>
              <div style={{ fontSize:12, color:T.sub, lineHeight:1.65 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div style={{ background:"rgba(99,102,241,0.07)", border:"1px solid rgba(99,102,241,0.2)", borderRadius:16, padding:"28px 32px", display:"flex", gap:22, alignItems:"center", flexWrap:"wrap" }}>
          <div style={{ width:60, height:60, borderRadius:14, background:"linear-gradient(135deg,#6366F1,#4F46E5)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>👤</div>
          <div style={{ flex:1, minWidth:200 }}>
            <div style={{ fontSize:17, fontWeight:700, marginBottom:3 }}>Salman Ali</div>
            <div style={{ fontSize:11, color:"#818CF8", marginBottom:8, textTransform:"uppercase", letterSpacing:"0.08em" }}>Founder · Dubai Rovers Platform</div>
            <p style={{ fontSize:13, color:T.sub, lineHeight:1.7 }}>Dubai-based web developer and property consultant. Building platforms that help tourists, investors and home buyers make better decisions. WhatsApp: +971 544 735 060</p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer" style={{ padding:"9px 18px", background:"rgba(37,211,102,0.15)", border:"1px solid rgba(37,211,102,0.3)", borderRadius:10, color:"#25D366", fontSize:12, fontWeight:700, textDecoration:"none", textAlign:"center" }}>💬 WhatsApp</a>
            <Link href="/properties/contact" style={{ padding:"9px 18px", background:T.card, border:`1px solid ${T.border}`, borderRadius:10, color:T.sub, fontSize:12, textDecoration:"none", textAlign:"center" }}>📧 Contact</Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
