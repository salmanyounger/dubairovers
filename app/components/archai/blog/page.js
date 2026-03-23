"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const POSTS = [
  { slug:"california-modern-guide",    emoji:"🏡", tag:"Style Guide",    title:"California Modern Villas: The Complete Pakistan Guide",         date:"Mar 2026", reads:"2.4K", mins:6,  desc:"Why Beverly Hills style is taking over DHA Lahore and Karachi — and how to build it on 10 Marla." },
  { slug:"ai-villa-design-future",     emoji:"🤖", tag:"AI Design",      title:"How AI is Revolutionising Villa Design in 2026",               date:"Mar 2026", reads:"1.8K", mins:5,  desc:"From a 5-step wizard to photorealistic renders in 30 seconds — what ARCHAI does and why architects are taking notice." },
  { slug:"10-marla-design-ideas",      emoji:"📐", tag:"Floor Plans",    title:"10 Marla Villa Design Ideas: 2024's Best Layouts",             date:"Feb 2026", reads:"3.1K", mins:8,  desc:"Ground + 2 floors on 10 Marla — the most popular plot size in Pakistan. Here are 6 layouts that actually work." },
  { slug:"south-asian-contemporary",   emoji:"🏘️", tag:"Style Guide",    title:"South Asian Contemporary: Pakistan's Most Wanted Style in 2026", date:"Feb 2026", reads:"4.2K", mins:7,  desc:"White cubic, teak wood panels, dark frames — why this look dominates Pakistani property marketing right now." },
  { slug:"bing-image-creator-villa",   emoji:"📸", tag:"Free Tools",     title:"How to Get a Free Photorealistic Villa Photo in 30 Seconds",   date:"Jan 2026", reads:"5.7K", mins:4,  desc:"ARCHAI builds the perfect Midjourney/Bing prompt from your selections. Here's how to use it for free." },
  { slug:"pkr-construction-costs",     emoji:"💰", tag:"Cost Guide",     title:"PKR Construction Cost Breakdown 2026: Grey Structure to Finish",date:"Jan 2026", reads:"2.9K", mins:9,  desc:"Honest breakdown: grey structure, finishing, electrical, woodwork — what it actually costs per Marla in Pakistan." },
  { slug:"islamic-architecture-guide", emoji:"🕌", tag:"Style Guide",    title:"Islamic Grand Villas: Bringing Mughal Architecture to Modern Homes", date:"Dec 2025", reads:"1.6K", mins:6, desc:"Arches, minarets, courtyards — how to incorporate Islamic architecture principles into a contemporary family villa." },
  { slug:"floor-plans-explained",      emoji:"🗺️", tag:"Planning",       title:"Understanding Villa Floor Plans: Basement to Rooftop",         date:"Dec 2025", reads:"3.4K", mins:7,  desc:"What goes on each floor, what sizes make sense, and how ARCHAI generates 5 floor plans automatically from your brief." },
];

const TAGS = ["All","Style Guide","AI Design","Floor Plans","Cost Guide","Free Tools","Planning"];

export default function ArchaiBlog() {
  const [mounted, setMounted] = useState(false);
  const [activeTag, setActiveTag] = useState("All");
  const [search, setSearch] = useState("");
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const T = { bg:"#06080d", card:"rgba(255,255,255,0.04)", border:"rgba(200,169,110,0.14)", text:"#E2DED6", sub:"#525870", gold:"#C8A96E", gold2:"#E8D09A" };

  const filtered = POSTS.filter(p => {
    const ms = activeTag === "All" || p.tag === activeTag;
    const mq = !search || p.title.toLowerCase().includes(search.toLowerCase());
    return ms && mq;
  });

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"/>
      <div suppressHydrationWarning style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Outfit',sans-serif" }}>
      <style suppressHydrationWarning>{`
        *{box-sizing:border-box}
        .bc:hover{transform:translateY(-4px)!important;border-color:rgba(200,169,110,0.4)!important;box-shadow:0 16px 40px rgba(0,0,0,0.4)!important}
        .bc{transition:all 0.25s ease}
        .tag-btn:hover{border-color:rgba(200,169,110,0.4)!important;color:#C8A96E!important}
      `}</style>

      {/* Header */}
      <div style={{ background:"rgba(0,0,0,0.4)", borderBottom:`1px solid ${T.border}`, padding:"18px 32px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <div>
            <Link href="/archai" style={{ fontSize:20, fontFamily:"'Cormorant Garamond',serif", letterSpacing:5, color:T.gold2, textDecoration:"none" }}>ARCH<span style={{ color:T.sub }}>AI</span></Link>
            <div style={{ fontSize:22, fontWeight:700, color:T.text, marginTop:4 }}>Design Journal</div>
            <div style={{ fontSize:13, color:T.sub }}>Villa design inspiration, style guides & AI tools</div>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <Link href="/archai" style={{ padding:"8px 16px", background:"transparent", border:`1px solid ${T.border}`, borderRadius:20, color:T.sub, fontSize:12, textDecoration:"none" }}>← ARCHAI Home</Link>
            <Link href="/archai" onClick={e => { e.preventDefault(); window.location.href='/archai#config'; }}
              style={{ padding:"8px 18px", background:`linear-gradient(135deg,${T.gold},#9A7830)`, border:"none", borderRadius:20, color:"#000", fontSize:12, fontWeight:700, textDecoration:"none" }}>
              Design My Villa →
            </Link>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"32px 32px" }}>

        {/* Search */}
        <div style={{ position:"relative", maxWidth:500, marginBottom:24 }}>
          <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)" }}>🔍</span>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search articles..."
            style={{ width:"100%", padding:"11px 14px 11px 40px", background:"rgba(255,255,255,0.05)", border:`1px solid ${T.border}`, borderRadius:12, color:T.text, fontSize:13, fontFamily:"Outfit,sans-serif", outline:"none" }}/>
        </div>

        {/* Tags */}
        <div style={{ display:"flex", gap:7, marginBottom:32, flexWrap:"wrap" }}>
          {TAGS.map(tag => (
            <button key={tag} onClick={()=>setActiveTag(tag)} className="tag-btn"
              style={{ padding:"6px 14px", borderRadius:20, border:`1px solid ${activeTag===tag?T.gold:T.border}`, background:activeTag===tag?"rgba(200,169,110,0.1)":"transparent", color:activeTag===tag?T.gold:T.sub, fontSize:12, fontWeight:activeTag===tag?700:400, cursor:"pointer", fontFamily:"Outfit,sans-serif", transition:"all 0.18s" }}>
              {tag}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {activeTag === "All" && !search && (
          <div style={{ background:"rgba(200,169,110,0.06)", border:`1px solid ${T.border}`, borderRadius:18, padding:"28px 32px", marginBottom:28, display:"grid", gridTemplateColumns:"1fr auto", gap:24, alignItems:"center" }}>
            <div>
              <div style={{ fontSize:10, color:T.gold, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:8 }}>📌 Featured Post</div>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(22px,3vw,34px)", fontWeight:300, color:"#fff", lineHeight:1.15, marginBottom:10 }}>
                {POSTS[1].emoji} {POSTS[1].title}
              </h2>
              <p style={{ fontSize:14, color:T.sub, lineHeight:1.7, marginBottom:16 }}>{POSTS[1].desc}</p>
              <div style={{ display:"flex", gap:16, alignItems:"center" }}>
                <span style={{ fontSize:11, color:T.sub }}>📅 {POSTS[1].date} · ⏱ {POSTS[1].mins} min read · 👁 {POSTS[1].reads} reads</span>
                <Link href={`/archai/blog/${POSTS[1].slug}`}
                  style={{ padding:"8px 20px", background:`linear-gradient(135deg,${T.gold},#9A7830)`, borderRadius:20, color:"#000", fontSize:12, fontWeight:700, textDecoration:"none" }}>
                  Read Article →
                </Link>
              </div>
            </div>
            <div style={{ fontSize:72, opacity:0.6 }}>{POSTS[1].emoji}</div>
          </div>
        )}

        {/* Grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:16 }}>
          {filtered.map(post => (
            <Link key={post.slug} href={`/archai/blog/${post.slug}`} className="bc"
              style={{ textDecoration:"none", background:T.card, border:`1px solid ${T.border}`, borderRadius:14, padding:"22px 22px", display:"block" }}>
              <div style={{ fontSize:32, marginBottom:12 }}>{post.emoji}</div>
              <div style={{ display:"inline-block", fontSize:9, color:T.gold, background:"rgba(200,169,110,0.1)", border:"1px solid rgba(200,169,110,0.2)", borderRadius:20, padding:"2px 9px", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:10 }}>{post.tag}</div>
              <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:600, color:"#fff", lineHeight:1.3, marginBottom:8 }}>{post.title}</h3>
              <p style={{ fontSize:12, color:T.sub, lineHeight:1.65, marginBottom:14 }}>{post.desc}</p>
              <div style={{ fontSize:11, color:T.sub, display:"flex", justifyContent:"space-between" }}>
                <span>📅 {post.date} · ⏱ {post.mins} min</span>
                <span style={{ color:T.gold }}>👁 {post.reads}</span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign:"center", padding:"60px 20px", color:T.sub }}>
            <div style={{ fontSize:40, marginBottom:12 }}>📝</div>
            <div style={{ fontSize:16, color:T.text }}>No articles match your search</div>
          </div>
        )}

        {/* CTA */}
        <div style={{ marginTop:40, background:"rgba(200,169,110,0.06)", border:`1px solid ${T.border}`, borderRadius:16, padding:"24px 28px", textAlign:"center" }}>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, fontWeight:300, color:"#fff", marginBottom:8 }}>Ready to design your villa?</div>
          <p style={{ fontSize:13, color:T.sub, marginBottom:16 }}>Free for everyone until January 2026. No signup. 9 styles, AI image prompt included.</p>
          <Link href="/archai" style={{ display:"inline-block", padding:"12px 32px", background:`linear-gradient(135deg,${T.gold},#9A7830)`, borderRadius:24, color:"#000", fontSize:14, fontWeight:700, textDecoration:"none" }}>
            🏠 Start Designing Free →
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
