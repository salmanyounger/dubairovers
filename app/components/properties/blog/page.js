"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const POSTS = [
  { slug:"dubai-property-market-2026",   emoji:"📊", tag:"Market Update",   title:"Dubai Property Market Outlook 2026: What Buyers Need to Know",   date:"Mar 2026", reads:"4.1K", mins:8,  desc:"ROI trends, top performing areas, off-plan vs ready — a full picture for buyers and investors in 2026." },
  { slug:"golden-visa-property-guide",   emoji:"🏆", tag:"Golden Visa",     title:"UAE Golden Visa via Property: The Complete 2026 Guide",          date:"Mar 2026", reads:"6.2K", mins:10, desc:"AED 2M threshold, approved property types, application steps, and which Dubai areas qualify." },
  { slug:"best-roi-areas-dubai",         emoji:"📈", tag:"Investment",      title:"Dubai's 8 Highest ROI Areas in 2026 — Ranked by Yield",         date:"Feb 2026", reads:"7.8K", mins:7,  desc:"JVC leads at 8-9%, Marina follows at 7-8%. Data from Dubai Land Department transactions." },
  { slug:"expat-mortgage-guide",         emoji:"🏦", tag:"Finance",         title:"Complete Mortgage Guide for UAE Expats: All 7 Banks Compared",   date:"Feb 2026", reads:"5.3K", mins:12, desc:"ADIB, DIB, ADCB, ENBD, FAB, Mashreq, RAKBANK — rates, down payment requirements and approval tips." },
  { slug:"jvc-vs-jlt-investment",        emoji:"⚖️", tag:"Area Guide",      title:"JVC vs JLT: Which is Better for Investment in 2026?",           date:"Jan 2026", reads:"3.9K", mins:9,  desc:"Two of Dubai's most popular mid-market areas head to head — price per sqft, yields, tenant demand, future." },
  { slug:"buying-costs-dubai-2026",      emoji:"💰", tag:"Finance",         title:"Real Cost of Buying Property in Dubai: DLD, Agent Fees & More", date:"Jan 2026", reads:"4.7K", mins:6,  desc:"AED 4% DLD, AED 2% agent, mortgage registration 0.25%, admin AED 4K — full breakdown with calculator." },
  { slug:"palm-jumeirah-roi",            emoji:"🌴", tag:"Area Guide",      title:"Palm Jumeirah ROI Analysis 2026: Is It Worth the Premium?",     date:"Dec 2025", reads:"2.8K", mins:8,  desc:"Luxury comes at a cost — but so do the returns. Analysis of FIVE Palm, signature villas and short-term rental yields." },
  { slug:"off-plan-ready-comparison",   emoji:"🏗️", tag:"Buying Guide",    title:"Off-Plan vs Ready Property in Dubai: Which is Right for You?",  date:"Dec 2025", reads:"3.6K", mins:7,  desc:"Payment plan flexibility, handover risk, appreciation potential — everything to decide between off-plan and ready." },
];

const TAGS = ["All","Market Update","Investment","Finance","Area Guide","Golden Visa","Buying Guide"];

export default function PropertiesBlog() {
  const [mounted, setMounted]     = useState(false);
  const [activeTag, setActiveTag] = useState("All");
  const [search, setSearch]       = useState("");
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const T = { bg:"#080810", card:"rgba(255,255,255,0.04)", border:"rgba(255,255,255,0.08)", text:"#F1F5F9", sub:"rgba(255,255,255,0.45)", blue:"#6366F1", green:"#10B981", gold:"#F59E0B" };

  const filtered = POSTS.filter(p => {
    const ms = activeTag === "All" || p.tag === activeTag;
    const mq = !search || p.title.toLowerCase().includes(search.toLowerCase());
    return ms && mq;
  });

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap"/>
      <div suppressHydrationWarning style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Inter',sans-serif" }}>
      <style suppressHydrationWarning>{`
        *{box-sizing:border-box}
        .bc:hover{transform:translateY(-4px)!important;border-color:rgba(99,102,241,0.4)!important;box-shadow:0 16px 40px rgba(0,0,0,0.4)!important}
        .bc{transition:all 0.25s ease}
      `}</style>

      <div style={{ background:"rgba(0,0,0,0.4)", borderBottom:`1px solid ${T.border}`, padding:"16px 28px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <div>
            <div style={{ fontSize:22, fontWeight:800 }}>🏙️ Dubai Properties Blog</div>
            <div style={{ fontSize:13, color:T.sub }}>Market insights, investment guides & area analysis</div>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <Link href="/properties" style={{ padding:"8px 16px", background:"transparent", border:`1px solid ${T.border}`, borderRadius:20, color:T.sub, fontSize:12, textDecoration:"none" }}>← Properties</Link>
            <Link href="/properties/calculator" style={{ padding:"8px 16px", background:"rgba(99,102,241,0.15)", border:"1px solid rgba(99,102,241,0.3)", borderRadius:20, color:"#818CF8", fontSize:12, textDecoration:"none" }}>🧮 Calculator</Link>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"28px 28px" }}>
        <div style={{ position:"relative", maxWidth:480, marginBottom:20 }}>
          <span style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)" }}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search articles..."
            style={{ width:"100%", padding:"11px 14px 11px 38px", background:"rgba(255,255,255,0.05)", border:`1px solid ${T.border}`, borderRadius:12, color:T.text, fontSize:13, fontFamily:"Inter,sans-serif", outline:"none" }}/>
        </div>

        <div style={{ display:"flex", gap:7, marginBottom:28, flexWrap:"wrap" }}>
          {TAGS.map(tag => (
            <button key={tag} onClick={()=>setActiveTag(tag)}
              style={{ padding:"6px 14px", borderRadius:20, border:`1px solid ${activeTag===tag?"rgba(99,102,241,0.5)":T.border}`, background:activeTag===tag?"rgba(99,102,241,0.12)":"transparent", color:activeTag===tag?"#818CF8":T.sub, fontSize:12, fontWeight:activeTag===tag?700:400, cursor:"pointer", fontFamily:"Inter,sans-serif", transition:"all 0.18s" }}>
              {tag}
            </button>
          ))}
        </div>

        {/* Featured */}
        {activeTag==="All" && !search && (
          <div style={{ background:"rgba(99,102,241,0.06)", border:`1px solid rgba(99,102,241,0.2)`, borderRadius:16, padding:"24px 28px", marginBottom:24, display:"grid", gridTemplateColumns:"1fr auto", gap:20, alignItems:"center" }}>
            <div>
              <div style={{ fontSize:10, color:"#818CF8", letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:8 }}>📌 Most Read This Month</div>
              <h2 style={{ fontSize:"clamp(18px,2.5vw,26px)", fontWeight:800, color:"#fff", lineHeight:1.2, marginBottom:8 }}>{POSTS[1].emoji} {POSTS[1].title}</h2>
              <p style={{ fontSize:13, color:T.sub, lineHeight:1.7, marginBottom:14 }}>{POSTS[1].desc}</p>
              <div style={{ display:"flex", gap:14, alignItems:"center" }}>
                <span style={{ fontSize:11, color:T.sub }}>📅 {POSTS[1].date} · ⏱ {POSTS[1].mins} min · 👁 {POSTS[1].reads}</span>
                <Link href={`/properties/blog/${POSTS[1].slug}`} style={{ padding:"7px 18px", background:"linear-gradient(135deg,#6366F1,#4F46E5)", borderRadius:20, color:"#fff", fontSize:12, fontWeight:700, textDecoration:"none" }}>Read →</Link>
              </div>
            </div>
            <div style={{ fontSize:60, opacity:0.5 }}>{POSTS[1].emoji}</div>
          </div>
        )}

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:14 }}>
          {filtered.map(post => (
            <Link key={post.slug} href={`/properties/blog/${post.slug}`} className="bc"
              style={{ textDecoration:"none", background:T.card, border:`1px solid ${T.border}`, borderRadius:14, padding:"20px 20px", display:"block" }}>
              <div style={{ fontSize:28, marginBottom:10 }}>{post.emoji}</div>
              <div style={{ display:"inline-block", fontSize:9, color:"#818CF8", background:"rgba(99,102,241,0.1)", border:"1px solid rgba(99,102,241,0.2)", borderRadius:20, padding:"2px 9px", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:9 }}>{post.tag}</div>
              <h3 style={{ fontSize:15, fontWeight:700, color:"#fff", lineHeight:1.35, marginBottom:7 }}>{post.title}</h3>
              <p style={{ fontSize:12, color:T.sub, lineHeight:1.65, marginBottom:12 }}>{post.desc}</p>
              <div style={{ fontSize:11, color:T.sub, display:"flex", justifyContent:"space-between" }}>
                <span>📅 {post.date} · ⏱ {post.mins} min</span>
                <span style={{ color:T.green }}>👁 {post.reads}</span>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop:36, background:"rgba(16,185,129,0.06)", border:"1px solid rgba(16,185,129,0.15)", borderRadius:14, padding:"22px 26px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, flexWrap:"wrap" }}>
          <div>
            <div style={{ fontSize:15, fontWeight:700, marginBottom:3 }}>🧮 Free Property Calculators</div>
            <div style={{ fontSize:13, color:T.sub }}>Mortgage, ROI, buying costs — all UAE banks included</div>
          </div>
          <Link href="/properties/calculator" style={{ padding:"10px 22px", background:"linear-gradient(135deg,#10B981,#059669)", borderRadius:10, color:"#fff", fontSize:13, fontWeight:700, textDecoration:"none" }}>Open Calculator →</Link>
        </div>
      </div>
    </div>
    </>
  );
}
