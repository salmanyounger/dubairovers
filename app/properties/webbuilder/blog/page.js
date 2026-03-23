"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const POSTS = [
  { slug:"website-cost-dubai-2026",          emoji:"💰", tag:"Pricing Guide", title:"How Much Does a Website Cost in Dubai in 2026?",            date:"Mar 2026", reads:"2.8K", mins:6,  desc:"Honest breakdown from simple landing pages to full booking platforms — no hidden fees, no vague quotes." },
  { slug:"nextjs-vs-wordpress-dubai",         emoji:"⚡", tag:"Technical",     title:"Next.js vs WordPress: Which is Better for Dubai Businesses?", date:"Feb 2026", reads:"1.9K", mins:8,  desc:"Why most Dubai businesses are better served by Next.js than WordPress in 2026 — and when WordPress still makes sense." },
  { slug:"arabic-website-dubai-business",     emoji:"🌐", tag:"Strategy",      title:"Why Your Dubai Business Website Must Be in Arabic Too",       date:"Feb 2026", reads:"3.2K", mins:5,  desc:"40% of Dubai residents prefer Arabic content. How bilingual websites increase conversions and SEO rankings." },
  { slug:"whatsapp-website-integration",      emoji:"💬", tag:"Features",      title:"WhatsApp Integration: The Most Important Feature for Dubai Websites", date:"Jan 2026", reads:"4.1K", mins:4, desc:"Dubai customers prefer WhatsApp over email or contact forms. How to integrate it properly on every page." },
  { slug:"booking-system-tourism-website",    emoji:"📅", tag:"Features",      title:"How to Build a Booking System for a Dubai Tourism Website",   date:"Jan 2026", reads:"1.5K", mins:9,  desc:"From simple WhatsApp-linked forms to full booking engines — the options and costs explained." },
  { slug:"seo-dubai-local-business",          emoji:"🔍", tag:"Strategy",      title:"Local SEO Guide for Dubai Businesses in 2026",               date:"Dec 2025", reads:"2.3K", mins:7,  desc:"How to rank in Dubai local search results — Google Business Profile, schema markup, Arabic content strategy." },
];
const TAGS = ["All","Pricing Guide","Technical","Strategy","Features","Showcase","Case Study"];

export default function WebBuilderBlog() {
  const [mounted,    setMounted]    = useState(false);
  const [activeTag,  setActiveTag]  = useState("All");
  const [search,     setSearch]     = useState("");
  const [adminPosts, setAdminPosts] = useState([]);

  useEffect(() => {
    setMounted(true);
    try { const saved = JSON.parse(localStorage.getItem("wb_posts") || "[]"); setAdminPosts(saved.filter(p=>p.status==="published")); } catch(_) {}
  }, []);

  if (!mounted) return <div style={{ minHeight:"100vh", background:"#0A060F" }}/>;

  const T = { bg:"#0A060F", card:"rgba(255,255,255,0.04)", border:"rgba(255,255,255,0.08)", text:"#F0ECF8", sub:"rgba(255,255,255,0.42)", pink:"#EC4899" };
  const allPosts = [...POSTS, ...adminPosts];
  const filtered = allPosts.filter(p => {
    const mt = activeTag==="All" || p.tag===activeTag;
    const mq = !search || p.title.toLowerCase().includes(search.toLowerCase());
    return mt && mq;
  });

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"/>
      <div suppressHydrationWarning style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
        <style suppressHydrationWarning>{`*{box-sizing:border-box}.bc:hover{transform:translateY(-4px)!important;border-color:rgba(236,72,153,0.35)!important}.bc{transition:all 0.25s ease}`}</style>

        <div style={{ background:"rgba(0,0,0,0.4)", borderBottom:`1px solid ${T.border}`, padding:"16px 28px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:800, color:T.pink }}>Web Builder <span style={{ color:T.sub, fontWeight:400, fontSize:14 }}>/ Blog</span></div>
            <div style={{ fontSize:11, color:T.sub }}>Web design tips, strategy & Dubai market insights</div>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            <Link href="/webbuilder" style={{ padding:"7px 14px", border:`1px solid ${T.border}`, borderRadius:20, color:T.sub, fontSize:12, textDecoration:"none" }}>← Web Builder</Link>
            <Link href="https://wa.me/971544735060?text=Hi Salman, I want a website" target="_blank" rel="noopener noreferrer" style={{ padding:"8px 18px", background:"linear-gradient(135deg,#EC4899,#8B5CF6)", borderRadius:20, color:"#fff", fontSize:12, fontWeight:700, textDecoration:"none" }}>Get a Quote →</Link>
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
                style={{ padding:"6px 14px", borderRadius:20, border:`1px solid ${activeTag===tag?"rgba(236,72,153,0.5)":T.border}`, background:activeTag===tag?"rgba(236,72,153,0.1)":"transparent", color:activeTag===tag?T.pink:T.sub, fontSize:12, fontWeight:activeTag===tag?700:400, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif", transition:"all 0.18s" }}>
                {tag}
              </button>
            ))}
          </div>

          {activeTag==="All" && !search && (
            <div style={{ background:"rgba(236,72,153,0.06)", border:"1px solid rgba(236,72,153,0.18)", borderRadius:16, padding:"22px 26px", marginBottom:24, display:"grid", gridTemplateColumns:"1fr auto", gap:20, alignItems:"center" }}>
              <div>
                <div style={{ fontSize:10, color:T.pink, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:8 }}>📌 Most Read</div>
                <h2 style={{ fontSize:"clamp(16px,2.2vw,24px)", fontWeight:800, color:"#fff", lineHeight:1.2, marginBottom:8 }}>{POSTS[3].emoji} {POSTS[3].title}</h2>
                <p style={{ fontSize:12, color:T.sub, lineHeight:1.65, marginBottom:14 }}>{POSTS[3].desc}</p>
                <div style={{ display:"flex", gap:14, alignItems:"center" }}>
                  <span style={{ fontSize:11, color:T.sub }}>📅 {POSTS[3].date} · ⏱ {POSTS[3].mins} min · 👁 {POSTS[3].reads}</span>
                  <Link href={`/webbuilder/blog/${POSTS[3].slug}`} style={{ padding:"7px 18px", background:"linear-gradient(135deg,#EC4899,#8B5CF6)", borderRadius:20, color:"#fff", fontSize:12, fontWeight:700, textDecoration:"none" }}>Read →</Link>
                </div>
              </div>
              <div style={{ fontSize:56, opacity:0.5 }}>{POSTS[3].emoji}</div>
            </div>
          )}

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:14 }}>
            {filtered.map(post => (
              <Link key={post.slug} href={`/webbuilder/blog/${post.slug}`} className="bc"
                style={{ textDecoration:"none", background:T.card, border:`1px solid ${T.border}`, borderRadius:14, padding:"20px 20px", display:"block" }}>
                <div style={{ fontSize:26, marginBottom:10 }}>{post.emoji}</div>
                <div style={{ display:"inline-block", fontSize:9, color:T.pink, background:"rgba(236,72,153,0.08)", border:"1px solid rgba(236,72,153,0.2)", borderRadius:20, padding:"2px 9px", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:9 }}>{post.tag}</div>
                <h3 style={{ fontSize:14, fontWeight:700, color:"#fff", lineHeight:1.35, marginBottom:7 }}>{post.title}</h3>
                <p style={{ fontSize:12, color:T.sub, lineHeight:1.65, marginBottom:12 }}>{post.desc}</p>
                <div style={{ fontSize:11, color:T.sub, display:"flex", justifyContent:"space-between" }}>
                  <span>📅 {post.date} · ⏱ {post.mins} min</span>
                  <span style={{ color:T.pink }}>👁 {post.reads}</span>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ marginTop:36, background:"rgba(236,72,153,0.06)", border:"1px solid rgba(236,72,153,0.15)", borderRadius:14, padding:"20px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, flexWrap:"wrap" }}>
            <div>
              <div style={{ fontSize:14, fontWeight:700, marginBottom:3 }}>💻 Need a website for your Dubai business?</div>
              <div style={{ fontSize:12, color:T.sub }}>React & Next.js · Multilingual · Mobile-first · AED 1,200–50,000+</div>
            </div>
            <a href="https://wa.me/971544735060?text=Hi Salman, I want a website for my business" target="_blank" rel="noopener noreferrer" style={{ padding:"10px 22px", background:"linear-gradient(135deg,#EC4899,#8B5CF6)", borderRadius:10, color:"#fff", fontSize:13, fontWeight:700, textDecoration:"none" }}>💬 Get a Free Quote</a>
          </div>
        </div>
      </div>
    </>
  );
}
