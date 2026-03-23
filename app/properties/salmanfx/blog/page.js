"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const POSTS = [
  { slug:"mm-flip-codepro-v24",        emoji:"🤖", tag:"EA Update",    title:"MM FLIP CODEPRO v2.4 — What's New in 2026",               date:"Mar 2026", reads:"1.2K", mins:5,  desc:"New lot progression logic, improved Parabolic SAR sensitivity, and a dashboard redesign." },
  { slug:"parabolic-sar-mt4-guide",    emoji:"📈", tag:"Strategy",     title:"Parabolic SAR Strategy: Complete Guide for MT4 Traders",   date:"Feb 2026", reads:"3.4K", mins:8,  desc:"How Parabolic SAR works, optimal settings for XAUUSD, and why it forms the core of MM FLIP CODEPRO." },
  { slug:"best-forex-pairs-ea-2026",   emoji:"💹", tag:"Trading Tips", title:"Best Forex Pairs for Expert Advisors in 2026",            date:"Feb 2026", reads:"2.1K", mins:6,  desc:"XAUUSD leads for volatility, EURUSD for stability. Which pairs work best with automated EAs." },
  { slug:"vps-mt4-contabo-setup",      emoji:"🖥️", tag:"Setup Guide",  title:"VPS Setup Guide for MT4 on Contabo",                      date:"Jan 2026", reads:"1.8K", mins:10, desc:"Step-by-step: set up a Contabo VPS, install MT4, attach your EA, and run 24/5 automated trading." },
  { slug:"win-rate-vs-risk-reward",    emoji:"📊", tag:"Education",    title:"Why 67% Win Rate Beats 90% Win Rate in Forex EAs",        date:"Jan 2026", reads:"980",  mins:7,  desc:"High win rate sounds great — but the math shows why lower win rate with better R:R wins long term." },
  { slug:"money-management-forex",     emoji:"💰", tag:"Strategy",     title:"Advanced Money Management for Automated Forex Trading",   date:"Dec 2025", reads:"2.6K", mins:8,  desc:"10-stage lot progression explained — why it works and how to configure it correctly in MM FLIP CODEPRO." },
];
const TAGS = ["All","EA Update","Strategy","Trading Tips","Setup Guide","Education"];

export default function SalmanFXBlog() {
  const [mounted,    setMounted]    = useState(false);
  const [activeTag,  setActiveTag]  = useState("All");
  const [search,     setSearch]     = useState("");
  const [adminPosts, setAdminPosts] = useState([]);

  useEffect(() => {
    setMounted(true);
    try { const saved = JSON.parse(localStorage.getItem("sfx_posts") || "[]"); setAdminPosts(saved.filter(p=>p.status==="published")); } catch(_) {}
  }, []);

  if (!mounted) return <div style={{ minHeight:"100vh", background:"#060A0D" }}/>;

  const T = { bg:"#060A0D", card:"rgba(255,255,255,0.04)", border:"rgba(255,255,255,0.08)", text:"#E8F0E8", sub:"rgba(255,255,255,0.42)", green:"#10B981" };
  const allPosts = [...POSTS, ...adminPosts];
  const filtered = allPosts.filter(p => {
    const mt = activeTag==="All" || p.tag===activeTag;
    const mq = !search || p.title.toLowerCase().includes(search.toLowerCase());
    return mt && mq;
  });

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"/>
      <div suppressHydrationWarning style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
        <style suppressHydrationWarning>{`*{box-sizing:border-box}.bc:hover{transform:translateY(-4px)!important;border-color:rgba(16,185,129,0.4)!important}.bc{transition:all 0.25s ease}`}</style>

        <div style={{ background:"rgba(0,0,0,0.4)", borderBottom:`1px solid ${T.border}`, padding:"16px 28px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:16, fontWeight:700, color:T.green }}>SalmanFX <span style={{ color:T.sub, fontWeight:400 }}>/ Blog</span></div>
            <div style={{ fontSize:11, color:T.sub }}>Forex strategies, EA guides & trading education</div>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <Link href="/salmanfx" style={{ padding:"7px 14px", background:"transparent", border:`1px solid ${T.border}`, borderRadius:20, color:T.sub, fontSize:12, textDecoration:"none" }}>← SalmanFX</Link>
            <Link href="https://wa.me/971544735060?text=Hi Salman, I want to buy a Forex EA" target="_blank" rel="noopener noreferrer" style={{ padding:"8px 18px", background:"linear-gradient(135deg,#10B981,#059669)", borderRadius:20, color:"#fff", fontSize:12, fontWeight:700, textDecoration:"none" }}>Get EA →</Link>
          </div>
        </div>

        <div style={{ maxWidth:1100, margin:"0 auto", padding:"28px 28px" }}>
          <div style={{ position:"relative", maxWidth:480, marginBottom:18 }}>
            <span style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)" }}>🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search articles..."
              style={{ width:"100%", padding:"10px 14px 10px 38px", background:"rgba(255,255,255,0.05)", border:`1px solid ${T.border}`, borderRadius:11, color:T.text, fontSize:13, fontFamily:"'Plus Jakarta Sans',sans-serif", outline:"none" }}/>
          </div>
          <div style={{ display:"flex", gap:7, marginBottom:28, flexWrap:"wrap" }}>
            {TAGS.map(tag => (
              <button key={tag} onClick={()=>setActiveTag(tag)}
                style={{ padding:"6px 14px", borderRadius:20, border:`1px solid ${activeTag===tag?"rgba(16,185,129,0.5)":T.border}`, background:activeTag===tag?"rgba(16,185,129,0.1)":"transparent", color:activeTag===tag?T.green:T.sub, fontSize:12, fontWeight:activeTag===tag?700:400, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif", transition:"all 0.18s" }}>
                {tag}
              </button>
            ))}
          </div>

          {/* Featured */}
          {activeTag==="All" && !search && (
            <div style={{ background:"rgba(16,185,129,0.06)", border:"1px solid rgba(16,185,129,0.18)", borderRadius:16, padding:"22px 26px", marginBottom:24, display:"grid", gridTemplateColumns:"1fr auto", gap:20, alignItems:"center" }}>
              <div>
                <div style={{ fontSize:10, color:T.green, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:8 }}>📌 Most Read</div>
                <h2 style={{ fontSize:"clamp(16px,2.2vw,24px)", fontWeight:800, color:"#fff", lineHeight:1.2, marginBottom:8 }}>{POSTS[1].emoji} {POSTS[1].title}</h2>
                <p style={{ fontSize:12, color:T.sub, lineHeight:1.65, marginBottom:14 }}>{POSTS[1].desc}</p>
                <div style={{ display:"flex", gap:14, alignItems:"center" }}>
                  <span style={{ fontSize:11, color:T.sub }}>📅 {POSTS[1].date} · ⏱ {POSTS[1].mins} min · 👁 {POSTS[1].reads}</span>
                  <Link href={`/salmanfx/blog/${POSTS[1].slug}`} style={{ padding:"7px 18px", background:"linear-gradient(135deg,#10B981,#059669)", borderRadius:20, color:"#fff", fontSize:12, fontWeight:700, textDecoration:"none" }}>Read →</Link>
                </div>
              </div>
              <div style={{ fontSize:56, opacity:0.5 }}>{POSTS[1].emoji}</div>
            </div>
          )}

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:14 }}>
            {filtered.map(post => (
              <Link key={post.slug} href={`/salmanfx/blog/${post.slug}`} className="bc"
                style={{ textDecoration:"none", background:T.card, border:`1px solid ${T.border}`, borderRadius:14, padding:"20px 20px", display:"block" }}>
                <div style={{ fontSize:26, marginBottom:10 }}>{post.emoji}</div>
                <div style={{ display:"inline-block", fontSize:9, color:T.green, background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.2)", borderRadius:20, padding:"2px 9px", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:9 }}>{post.tag}</div>
                <h3 style={{ fontSize:15, fontWeight:700, color:"#fff", lineHeight:1.3, marginBottom:7 }}>{post.title}</h3>
                <p style={{ fontSize:12, color:T.sub, lineHeight:1.65, marginBottom:12 }}>{post.desc}</p>
                <div style={{ fontSize:11, color:T.sub, display:"flex", justifyContent:"space-between" }}>
                  <span>📅 {post.date} · ⏱ {post.mins} min</span>
                  <span style={{ color:T.green }}>👁 {post.reads}</span>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ marginTop:36, background:"rgba(16,185,129,0.06)", border:"1px solid rgba(16,185,129,0.15)", borderRadius:14, padding:"20px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, flexWrap:"wrap" }}>
            <div>
              <div style={{ fontSize:14, fontWeight:700, marginBottom:3 }}>🤖 Ready to automate your trading?</div>
              <div style={{ fontSize:12, color:T.sub }}>MM FLIP CODEPRO — MT4/MT5 EA · AED 299 – 1,499</div>
            </div>
            <a href="https://wa.me/971544735060?text=Hi Salman, I want to buy a Forex EA" target="_blank" rel="noopener noreferrer" style={{ padding:"10px 22px", background:"linear-gradient(135deg,#10B981,#059669)", borderRadius:10, color:"#fff", fontSize:13, fontWeight:700, textDecoration:"none" }}>💬 Buy on WhatsApp</a>
          </div>
        </div>
      </div>
    </>
  );
}
