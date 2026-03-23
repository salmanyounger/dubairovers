"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ArchaiAbout() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const T = { bg:"#06080d", card:"rgba(255,255,255,0.04)", border:"rgba(200,169,110,0.14)", text:"#E2DED6", sub:"#525870", gold:"#C8A96E", gold2:"#E8D09A", green:"#3DC98A" };

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"/>
      <div suppressHydrationWarning style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Outfit',sans-serif" }}>
      <style suppressHydrationWarning>{`
        *{box-sizing:border-box}
      `}</style>

      {/* Nav */}
      <div style={{ background:"rgba(0,0,0,0.5)", borderBottom:`1px solid ${T.border}`, padding:"16px 32px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <Link href="/archai" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, letterSpacing:5, color:T.gold2, textDecoration:"none" }}>ARCH<span style={{ color:T.sub }}>AI</span></Link>
        <div style={{ display:"flex", gap:10 }}>
          <Link href="/archai/blog" style={{ color:T.sub, fontSize:13, textDecoration:"none", padding:"7px 14px" }}>Blog</Link>
          <Link href="/archai/contact" style={{ color:T.sub, fontSize:13, textDecoration:"none", padding:"7px 14px" }}>Contact</Link>
          <Link href="/archai" style={{ padding:"8px 18px", background:`linear-gradient(135deg,${T.gold},#9A7830)`, borderRadius:20, color:"#000", fontSize:12, fontWeight:700, textDecoration:"none" }}>Design Villa →</Link>
        </div>
      </div>

      <div style={{ maxWidth:900, margin:"0 auto", padding:"56px 32px" }}>

        {/* Hero */}
        <div style={{ textAlign:"center", marginBottom:64 }}>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(36px,6vw,72px)", fontWeight:300, lineHeight:1.05, color:"#fff", marginBottom:16 }}>
            Designed for <em style={{ color:T.gold, fontStyle:"italic" }}>dreamers</em><br/>
            built by <em style={{ color:T.gold, fontStyle:"italic" }}>builders</em>
          </div>
          <p style={{ fontSize:16, color:T.sub, lineHeight:1.8, maxWidth:580, margin:"0 auto" }}>
            ARCHAI was born from a simple frustration: why does getting a villa design require an architect meeting, a week of waiting, and thousands of rupees — just to see if you like the style?
          </p>
        </div>

        {/* Story */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, marginBottom:64, alignItems:"start" }}>
          <div>
            <div style={{ fontSize:10, color:T.gold, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:12 }}>The Story</div>
            <p style={{ fontSize:14, color:T.sub, lineHeight:1.9, marginBottom:14 }}>
              Salman Ali — Dubai-based developer, tour guide and entrepreneur — noticed that every client asking about property always had the same question: "but what will it actually look like?"
            </p>
            <p style={{ fontSize:14, color:T.sub, lineHeight:1.9, marginBottom:14 }}>
              The answer used to be: hire an architect, wait weeks, spend AED 5,000+ for concept drawings that might not even match what you imagined.
            </p>
            <p style={{ fontSize:14, color:T.sub, lineHeight:1.9 }}>
              ARCHAI changes this completely. In 3 minutes, anyone can configure their dream villa and get a complete design package — floor plans, cost estimate, material recommendations, and a photorealistic AI image prompt. Free.
            </p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {[
              { n:"3 min",   l:"average design time",     c:T.gold },
              { n:"9",       l:"architectural styles",     c:T.green },
              { n:"5",       l:"floor plan levels",        c:"#4A8FD4" },
              { n:"Free",    l:"until January 2026",       c:T.gold },
            ].map(s => (
              <div key={s.l} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"16px 20px", display:"flex", gap:16, alignItems:"center" }}>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:32, color:s.c, fontWeight:600, minWidth:60 }}>{s.n}</div>
                <div style={{ fontSize:13, color:T.sub }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Styles */}
        <div style={{ marginBottom:64 }}>
          <div style={{ fontSize:10, color:T.gold, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:20 }}>What's Inside</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
            {[
              { e:"🏡", n:"California Modern",    d:"Beverly Hills style, gabled roof, timber, pool" },
              { e:"🏘️", n:"South Asian Contemporary", d:"Pakistan/Kerala style, white cubic, wood panels" },
              { e:"🏊", n:"Modern Mediterranean", d:"Ibiza style, flat roof, louvered pergola, pool" },
              { e:"🕌", n:"Islamic Grand",         d:"Arches, minarets, Mughal courtyard" },
              { e:"🔲", n:"Modern Minimalist",     d:"Cantilever, full glass, concrete, infinity pool" },
              { e:"🏜️", n:"Desert Contemporary",  d:"Sandstone, columns, thick walls, terracotta" },
              { e:"🌿", n:"Tropical Luxury",       d:"Green walls, zinc roof, resort pool, teak" },
              { e:"🏛️", n:"Colonial Classic",      d:"6 columns, pediment, wraparound balcony" },
              { e:"🏺", n:"Pakistani Traditional", d:"Lahori brick, veranda, sheesham wood, courtyard" },
            ].map(s => (
              <div key={s.n} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:10, padding:"14px 16px" }}>
                <div style={{ fontSize:22, marginBottom:6 }}>{s.e}</div>
                <div style={{ fontSize:12, fontWeight:600, color:T.text, marginBottom:3 }}>{s.n}</div>
                <div style={{ fontSize:11, color:T.sub, lineHeight:1.5 }}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Creator */}
        <div style={{ background:"rgba(200,169,110,0.06)", border:`1px solid ${T.border}`, borderRadius:16, padding:"28px 32px", display:"flex", gap:24, alignItems:"center", flexWrap:"wrap" }}>
          <div style={{ width:64, height:64, borderRadius:16, background:`linear-gradient(135deg,${T.gold},#9A7830)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, flexShrink:0 }}>👤</div>
          <div style={{ flex:1, minWidth:200 }}>
            <div style={{ fontSize:18, fontWeight:700, color:T.text, marginBottom:4 }}>Salman Ali</div>
            <div style={{ fontSize:12, color:T.gold, marginBottom:8 }}>Dubai-based Developer & Entrepreneur</div>
            <p style={{ fontSize:13, color:T.sub, lineHeight:1.7 }}>
              Building DubaiRovers.com, ARCHAI, and web platforms for tourism, property and design clients. Based in Dubai, UAE. Available for custom villa design consultation and ARCHAI white-label licensing.
            </p>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
              style={{ padding:"9px 18px", background:"rgba(37,211,102,0.15)", border:"1px solid rgba(37,211,102,0.3)", borderRadius:10, color:"#25D366", fontSize:12, fontWeight:700, textDecoration:"none", textAlign:"center" }}>
              💬 WhatsApp
            </a>
            <Link href="/archai/contact"
              style={{ padding:"9px 18px", background:T.card, border:`1px solid ${T.border}`, borderRadius:10, color:T.sub, fontSize:12, textDecoration:"none", textAlign:"center" }}>
              📧 Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
