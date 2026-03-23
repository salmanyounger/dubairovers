"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function SalmanFXAbout() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div style={{ minHeight:"100vh", background:"#060A0D" }}/>;

  const T = { bg:"#060A0D", card:"rgba(255,255,255,0.04)", border:"rgba(255,255,255,0.07)", text:"#E8F0E8", sub:"rgba(255,255,255,0.42)", green:"#10B981" };
  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"/>
      <div suppressHydrationWarning style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
        <style suppressHydrationWarning>{`*{box-sizing:border-box}`}</style>
        <div style={{ background:"rgba(0,0,0,0.4)", borderBottom:`1px solid ${T.border}`, padding:"16px 28px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:16, fontWeight:700, color:T.green }}>SalmanFX</div>
          <div style={{ display:"flex", gap:10 }}>
            <Link href="/salmanfx/blog" style={{ color:T.sub, fontSize:12, textDecoration:"none", padding:"7px 14px" }}>Blog</Link>
            <Link href="/salmanfx/contact" style={{ color:T.sub, fontSize:12, textDecoration:"none", padding:"7px 14px" }}>Contact</Link>
            <Link href="/salmanfx" style={{ padding:"7px 16px", background:"linear-gradient(135deg,#10B981,#059669)", borderRadius:20, color:"#fff", fontSize:12, fontWeight:700, textDecoration:"none" }}>Get EA →</Link>
          </div>
        </div>
        <div style={{ maxWidth:900, margin:"0 auto", padding:"52px 28px" }}>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"clamp(28px,5vw,52px)", fontWeight:700, color:T.green, marginBottom:12 }}>SalmanFX</div>
            <p style={{ fontSize:15, color:T.sub, lineHeight:1.8, maxWidth:520, margin:"0 auto" }}>
              Dubai-built Expert Advisors for MetaTrader 4 and MetaTrader 5. Automated trading with real logic, real results.
            </p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, marginBottom:56, alignItems:"start" }}>
            <div>
              <div style={{ fontSize:11, color:T.green, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:12, fontWeight:700 }}>The Story</div>
              <p style={{ fontSize:14, color:T.sub, lineHeight:1.9, marginBottom:14 }}>Salman Ali has been trading Forex since 2019. After testing hundreds of manual strategies, the consistent conclusion was that emotion is the biggest enemy of profitability — not strategy.</p>
              <p style={{ fontSize:14, color:T.sub, lineHeight:1.9, marginBottom:14 }}>The solution was automation. MM FLIP CODEPRO was built to implement a systematic Parabolic SAR strategy with disciplined money management — removing human emotion from the equation entirely.</p>
              <p style={{ fontSize:14, color:T.sub, lineHeight:1.9 }}>Every parameter in the EA was tested with 3+ years of XAUUSD data before going live. The result is a system that trades consistently whether markets are trending or ranging, day or night.</p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {[["67%","Average Win Rate","on forward tests 2025–2026"],["18.4%","Best Monthly Return","XAUUSD Jan–Mar 2026"],["30-Day","Money Back","on Starter + Pro plans"],["MT4 & MT5","Full Compatibility","single license covers both"]].map(([v,l,s]) => (
                <div key={l} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"14px 18px", display:"flex", gap:14, alignItems:"center" }}>
                  <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:22, fontWeight:700, color:T.green, minWidth:70 }}>{v}</div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:"#fff" }}>{l}</div>
                    <div style={{ fontSize:11, color:T.sub }}>{s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ fontSize:14, fontWeight:700, marginBottom:16 }}>📋 EA Features</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:44 }}>
            {[["📈","Parabolic SAR Core","Dynamic entry/exit with self-adjusting stop loss"],["💰","10-Stage MM","Progressive lot system with profit booking"],["🛡️","License Protection","Hardware-bound key — per account activation"],["📊","Live Dashboard","Real-time P&L, equity curve, trade count on chart"],["🔄","ON/OFF Toggle","Pause trading anytime without closing positions"],["🎯","MT4 + MT5","Full support for both MetaTrader platforms"]].map(([ic,ti,de]) => (
              <div key={ti} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:11, padding:"14px 16px" }}>
                <div style={{ fontSize:22, marginBottom:7 }}>{ic}</div>
                <div style={{ fontSize:12, fontWeight:700, color:"#fff", marginBottom:4 }}>{ti}</div>
                <div style={{ fontSize:11, color:T.sub, lineHeight:1.55 }}>{de}</div>
              </div>
            ))}
          </div>
          <div style={{ background:"rgba(16,185,129,0.07)", border:"1px solid rgba(16,185,129,0.2)", borderRadius:16, padding:"24px 28px", display:"flex", gap:22, alignItems:"center", flexWrap:"wrap" }}>
            <div style={{ width:56, height:56, borderRadius:14, background:"linear-gradient(135deg,#10B981,#059669)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>👤</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:16, fontWeight:800, color:"#fff", marginBottom:3 }}>Salman Ali</div>
              <div style={{ fontSize:11, color:T.green, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:7 }}>Forex EA Developer · Dubai, UAE</div>
              <p style={{ fontSize:13, color:T.sub, lineHeight:1.7 }}>Building MT4/MT5 Expert Advisors since 2021. Also runs DubaiRovers.com (tour platform), Dubai Properties comparison site, and ARCHAI villa design platform. WhatsApp: +971 544 735 060</p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer" style={{ padding:"9px 18px", background:"rgba(37,211,102,0.15)", border:"1px solid rgba(37,211,102,0.3)", borderRadius:10, color:"#25D366", fontSize:12, fontWeight:700, textDecoration:"none", textAlign:"center" }}>💬 WhatsApp</a>
              <Link href="/salmanfx/contact" style={{ padding:"9px 18px", background:T.card, border:`1px solid ${T.border}`, borderRadius:10, color:T.sub, fontSize:12, textDecoration:"none", textAlign:"center" }}>📧 Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
