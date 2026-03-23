"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function WebBuilderAbout() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div style={{ minHeight:"100vh", background:"#0A060F" }}/>;

  const T = { bg:"#0A060F", card:"rgba(255,255,255,0.04)", border:"rgba(255,255,255,0.07)", text:"#F0ECF8", sub:"rgba(255,255,255,0.42)", pink:"#EC4899", purple:"#8B5CF6" };

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"/>
      <div suppressHydrationWarning style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
        <style suppressHydrationWarning>{`*{box-sizing:border-box}`}</style>
        <div style={{ background:"rgba(0,0,0,0.4)", borderBottom:`1px solid ${T.border}`, padding:"16px 28px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:800, color:T.pink }}>Web Builder</div>
          <div style={{ display:"flex", gap:10 }}>
            <Link href="/webbuilder/blog" style={{ color:T.sub, fontSize:12, textDecoration:"none", padding:"7px 14px" }}>Blog</Link>
            <Link href="/webbuilder/contact" style={{ color:T.sub, fontSize:12, textDecoration:"none", padding:"7px 14px" }}>Contact</Link>
            <a href="https://wa.me/971544735060?text=Hi Salman, I want a website" target="_blank" rel="noopener noreferrer" style={{ padding:"7px 16px", background:"linear-gradient(135deg,#EC4899,#8B5CF6)", borderRadius:20, color:"#fff", fontSize:12, fontWeight:700, textDecoration:"none" }}>Get Quote →</a>
          </div>
        </div>

        <div style={{ maxWidth:960, margin:"0 auto", padding:"52px 28px" }}>
          {/* Hero */}
          <div style={{ textAlign:"center", marginBottom:60 }}>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(28px,5vw,52px)", fontWeight:800, marginBottom:12 }}>
              <span style={{ background:"linear-gradient(90deg,#EC4899,#8B5CF6)", backgroundClip:"text", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Custom Websites</span>{" "}
              <span style={{ color:"#fff" }}>for Dubai</span>
            </div>
            <p style={{ fontSize:15, color:T.sub, lineHeight:1.8, maxWidth:520, margin:"0 auto" }}>
              React & Next.js — no templates, no WordPress, no page builders. Every pixel is coded for your specific business.
            </p>
          </div>

          {/* Story + Stats */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:44, marginBottom:60, alignItems:"start" }}>
            <div>
              <div style={{ fontSize:11, color:T.pink, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:12, fontWeight:700 }}>The Approach</div>
              <p style={{ fontSize:14, color:T.sub, lineHeight:1.9, marginBottom:14 }}>Most agencies in Dubai sell WordPress themes as "custom websites." They install a $80 theme, change the colours, upload your logo, and charge AED 15,000. The result looks the same as 50,000 other sites.</p>
              <p style={{ fontSize:14, color:T.sub, lineHeight:1.9, marginBottom:14 }}>Every website I build is written from scratch in React or Next.js. Your tour booking system is unique. Your restaurant menu and table booking is built for your menu, your flow. Your real estate comparison tool is built around your listings.</p>
              <p style={{ fontSize:14, color:T.sub, lineHeight:1.9 }}>You see a live working demo at your domain before paying. If you do not love it, you do not pay. That is the entire sales process.</p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {[["6+","Live projects running",T.pink],["18+","Business categories built",T.purple],["React & Next.js","Only modern frameworks",T.pink],["48hr","Demo to first preview",T.purple],["Arabic + English","Every site bilingual",T.pink],["AED 1,200+","Starting price",T.purple]].map(([v,l,c]) => (
                <div key={l} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:11, padding:"12px 16px", display:"flex", gap:14, alignItems:"center" }}>
                  <div style={{ fontSize:18, fontWeight:800, color:c, minWidth:100 }}>{v}</div>
                  <div style={{ fontSize:12, color:T.sub }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech stack */}
          <div style={{ marginBottom:52 }}>
            <div style={{ fontSize:14, fontWeight:700, marginBottom:16 }}>⚙️ Tech Stack</div>
            <div style={{ display:"flex", gap:9, flexWrap:"wrap" }}>
              {["Next.js 14","React 18","App Router","Tailwind CSS","Canvas API","OpenStreetMap","Vercel Hosting","LocalStorage","WhatsApp API","Google Fonts","Arabic RTL","Mobile First"].map(t => (
                <span key={t} style={{ padding:"6px 14px", background:"rgba(255,255,255,0.05)", border:`1px solid ${T.border}`, borderRadius:20, fontSize:12, color:T.sub }}>{t}</span>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div style={{ marginBottom:52 }}>
            <div style={{ fontSize:14, fontWeight:700, marginBottom:16 }}>🏪 Categories I Build</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:10 }}>
              {[["🏜️","Tourism & Tours"],["🍽️","Restaurant & Café"],["🏙️","Real Estate"],["🔧","Auto Garage"],["🏥","Healthcare"],["🎓","Education"],["💄","Beauty & Salon"],["🏋️","Fitness & Gym"],["🏨","Hotel"],["⚖️","Legal & Finance"],["💻","Tech & SaaS"],["🛒","E-Commerce"]].map(([ic,name]) => (
                <div key={name} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:10, padding:"11px 13px", display:"flex", gap:9, alignItems:"center" }}>
                  <span style={{ fontSize:18 }}>{ic}</span>
                  <span style={{ fontSize:12, color:T.sub, lineHeight:1.3 }}>{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Profile card */}
          <div style={{ background:"rgba(236,72,153,0.06)", border:"1px solid rgba(236,72,153,0.18)", borderRadius:16, padding:"24px 28px", display:"flex", gap:22, alignItems:"center", flexWrap:"wrap" }}>
            <div style={{ width:56, height:56, borderRadius:14, background:"linear-gradient(135deg,#EC4899,#8B5CF6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>👤</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:16, fontWeight:800, color:"#fff", marginBottom:3 }}>Salman Ali</div>
              <div style={{ fontSize:11, color:T.pink, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:7 }}>Web Developer · Dubai, UAE 🇦🇪</div>
              <p style={{ fontSize:13, color:T.sub, lineHeight:1.7 }}>Based in Dubai. Building tourism, real estate, restaurant and business websites in React & Next.js since 2021. Also runs DubaiRovers.com, Dubai Properties platform, ARCHAI villa design, and SalmanFX forex EA. Contact: +971 544 735 060</p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer" style={{ padding:"9px 18px", background:"rgba(37,211,102,0.15)", border:"1px solid rgba(37,211,102,0.3)", borderRadius:10, color:"#25D366", fontSize:12, fontWeight:700, textDecoration:"none", textAlign:"center" }}>💬 WhatsApp</a>
              <Link href="/webbuilder/contact" style={{ padding:"9px 18px", background:T.card, border:`1px solid ${T.border}`, borderRadius:10, color:T.sub, fontSize:12, textDecoration:"none", textAlign:"center" }}>📧 Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
