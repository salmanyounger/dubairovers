"use client";
import { useState, useEffect } from "react";
const WA = "971544735060";
export default function AboutPage() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    try {
      const pv = JSON.parse(localStorage.getItem("dr_page_visibility") || "{}");
      if (pv.about === false) setHidden(true);
    } catch {}
  }, []);
  if (hidden) return (
    <div style={{ minHeight:"100vh", background:"#0a0a0a", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"sans-serif", flexDirection:"column", gap:16, textAlign:"center", padding:24, color:"#fff" }}>
      <div style={{ fontSize:56 }}>ℹ️</div>
      <div style={{ fontSize:28, fontWeight:800 }}>About Us</div>
      <div style={{ color:"rgba(255,255,255,.5)", fontSize:15, maxWidth:360 }}>This page is temporarily unavailable.</div>
      <a href="/" style={{ padding:"12px 26px", background:"linear-gradient(135deg,#f97316,#ec4899)", borderRadius:12, color:"#fff", fontWeight:700, fontSize:14, textDecoration:"none" }}>← Back to Home</a>
    </div>
  );
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily:"sans-serif" }}>
      <div style={{ height:80 }} />
      <div style={{ maxWidth:700, margin:"0 auto", padding:"40px 24px" }}>
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ fontSize:52, marginBottom:12 }}>🏜️</div>
          <h1 style={{ fontSize:40, fontWeight:900, background:"linear-gradient(to right,#f97316,#ec4899)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", marginBottom:10 }}>About Dubai Rovers</h1>
          <p style={{ color:"rgba(255,255,255,.55)", fontSize:16, lineHeight:1.7 }}>Dubai's most trusted adventure platform. 10,000+ happy guests from 80+ countries since 2019.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:32 }}>
          {[["🌍","80+ Countries","Our guests come from around the world"],["⭐","4.9/5 Rating","Consistently top-rated on all platforms"],["🎯","6 Tours","Desert, city, water, air — we cover it all"],["💬","24/7 Support","WhatsApp replies within minutes"]].map(([ic,lb,ds]) => (
            <div key={lb} style={{ padding:"18px", background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", borderRadius:16 }}>
              <div style={{ fontSize:28, marginBottom:7 }}>{ic}</div>
              <div style={{ fontWeight:700, fontSize:16, marginBottom:4 }}>{lb}</div>
              <div style={{ fontSize:13, color:"rgba(255,255,255,.45)", lineHeight:1.5 }}>{ds}</div>
            </div>
          ))}
        </div>
        <div style={{ padding:"24px", background:"rgba(249,115,22,.08)", border:"1px solid rgba(249,115,22,.2)", borderRadius:18, marginBottom:24, lineHeight:1.8, color:"rgba(255,255,255,.7)", fontSize:15 }}>
          Dubai Rovers was founded with one mission: make Dubai's most incredible experiences accessible, affordable, and stress-free for every traveller. We handle hotel pickup, multilingual guides, and instant WhatsApp support — so you just show up and enjoy. Every tour is fully licensed, safety-certified and backed by our Best Price Guarantee.
        </div>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" style={{ padding:"12px 26px", background:"linear-gradient(135deg,#25D366,#128C7E)", borderRadius:12, color:"#fff", fontWeight:700, fontSize:14, textDecoration:"none", display:"flex", alignItems:"center", gap:7 }}>💬 WhatsApp Us</a>
          <a href="/contact" style={{ padding:"12px 26px", background:"rgba(255,255,255,.07)", border:"1px solid rgba(255,255,255,.15)", borderRadius:12, color:"#fff", fontWeight:700, fontSize:14, textDecoration:"none" }}>📞 Contact</a>
          <a href="/" style={{ padding:"12px 26px", background:"rgba(255,255,255,.04)", border:"1px solid rgba(255,255,255,.08)", borderRadius:12, color:"rgba(255,255,255,.5)", fontWeight:600, fontSize:14, textDecoration:"none" }}>← Home</a>
        </div>
      </div>
    </div>
  );
}
