"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { ALL_BLOGS } from "../../data/all_blogs_merged"

export default function BlogDetail({ params }) {
  const { slug } = params
  const [mounted, setMounted] = useState(false)
  const [readPct, setReadPct] = useState(0)

  // Find blog in ALL 156 blogs
  const blog = ALL_BLOGS.find(b => b.slug === slug)

  useEffect(() => {
    setMounted(true)
    const onScroll = () => {
      const el = document.documentElement
      setReadPct(Math.min(100, Math.round(el.scrollTop / (el.scrollHeight - el.clientHeight) * 100)))
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Inject SEO schema — hook must run regardless of blog existence
  useEffect(() => {
    if (!blog || !mounted) return
    const url = `https://dubairovers.com/blog/${slug}`
    const schemas = [
      { "@context":"https://schema.org","@type":"Article","headline":blog.metaTitle||blog.title,"description":blog.metaDesc||"","datePublished":blog.date,"author":{"@type":"Person","name":blog.author?.name||"Dubai Rovers"},"publisher":{"@type":"Organization","name":"Dubai Rovers"}},
      { "@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://dubairovers.com/"},{"@type":"ListItem","position":2,"name":"Blog","item":"https://dubairovers.com/blog"},{"@type":"ListItem","position":3,"name":blog.title,"item":url}]},
      ...(blog.faq?.length ? [{"@context":"https://schema.org","@type":"FAQPage","mainEntity":blog.faq.map(f=>({ "@type":"Question","name":f.q,"acceptedAnswer":{"@type":"Answer","text":f.a}}))}] : [])
    ]
    schemas.forEach((s,i) => {
      const el = document.createElement("script"); el.type="application/ld+json"; el.id=`schema-${i}`; el.textContent=JSON.stringify(s); document.head.appendChild(el)
    })
    document.title = blog.metaTitle || blog.title
    let desc = document.querySelector('meta[name="description"]')
    if (!desc) { desc = document.createElement("meta"); desc.name="description"; document.head.appendChild(desc) }
    desc.content = blog.metaDesc || ""
    return () => schemas.forEach((_,i) => { const el=document.getElementById(`schema-${i}`); if(el) el.remove() })
  }, [blog, slug])

  // All hooks above — conditional returns below
  if (!mounted) return null
  if (!blog) return (
    <div style={{ minHeight:"100vh", background:"#070810", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:16, fontFamily:"'Outfit',sans-serif", color:"#fff", textAlign:"center" }}>
      <div style={{ fontSize:52 }}>📬</div>
      <h1 style={{ fontSize:24, fontWeight:700 }}>Blog post not found</h1>
      <p style={{ color:"rgba(255,255,255,0.4)", fontSize:14 }}>This guide may have moved or not been published yet.</p>
      <Link href="/blog" style={{ marginTop:8, padding:"12px 28px", background:"linear-gradient(135deg,#F59E0B,#D97706)", borderRadius:50, color:"#000", fontWeight:700, textDecoration:"none", fontSize:14 }}>← Back to Blog</Link>
    </div>
  )

  const related = ALL_BLOGS.filter(b => b.slug!==slug && b.category===blog.category && b.status==="published").slice(0,3)

  // Section renderer
  const S = { fontFamily:"'Outfit',sans-serif" }
  const renderSection = (sec, i) => {
    if (sec.type==="heading") return (
      <h2 key={i} style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(20px,3vw,28px)", fontWeight:700, color:"#fff", padding:"36px 0 4px", borderTop:"1px solid rgba(255,255,255,0.07)", marginTop:12 }}>
        {sec.text} {sec.textEm && <span style={{ color:"#F59E0B" }}>{sec.textEm}</span>} {sec.textAfter||""}
      </h2>
    )
    if (sec.type==="callout") return (
      <blockquote key={i} style={{ position:"relative", margin:"12px 0", padding:"22px 26px 22px 58px", background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.18)", borderLeft:"3px solid #F59E0B", borderRadius:"0 16px 16px 0", fontFamily:"'Playfair Display',serif", fontSize:"clamp(15px,2vw,18px)", fontStyle:"italic", lineHeight:1.65, color:"rgba(255,255,255,0.85)" }}>
        <span style={{ position:"absolute", left:16, top:8, fontSize:52, color:"#F59E0B", opacity:0.4, fontFamily:"'Playfair Display',serif", lineHeight:1 }}>"</span>
        <span dangerouslySetInnerHTML={{ __html:sec.text }} />
        {sec.cite && <cite style={{ display:"block", fontSize:12, color:"rgba(255,255,255,0.4)", marginTop:10, fontStyle:"normal", fontFamily:"'Outfit',sans-serif" }}>{sec.cite}</cite>}
      </blockquote>
    )
    if (sec.type==="tip") return (
      <div key={i} style={{ margin:"12px 0", padding:"18px 22px", background:"rgba(37,211,102,0.06)", border:"1px solid rgba(37,211,102,0.18)", borderRadius:14, fontSize:14, lineHeight:1.8, color:"rgba(255,255,255,0.7)", ...S }}>
        <span dangerouslySetInnerHTML={{ __html:sec.text }} />
      </div>
    )
    if (sec.type==="timeline") return (
      <ul key={i} style={{ margin:"14px 0", padding:0, listStyle:"none" }}>
        {sec.items?.map((item,j) => (
          <li key={j} style={{ display:"flex", gap:16, padding:"12px 0", borderBottom:"1px solid rgba(255,255,255,0.07)", fontSize:14, lineHeight:1.65, ...S }}>
            <span style={{ color:"#F59E0B", fontWeight:700, fontSize:13, minWidth:80, paddingTop:1, flexShrink:0 }}>{item.time}</span>
            <span style={{ color:"rgba(255,255,255,0.78)" }} dangerouslySetInnerHTML={{ __html:item.text||"" }} />
          </li>
        ))}
      </ul>
    )
    if (sec.type==="pack") return (
      <div key={i} style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:10, margin:"14px 0" }}>
        {sec.items?.map((item,j) => (
          <div key={j} style={{ padding:"12px 14px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:12, fontSize:13, color:"rgba(255,255,255,0.76)", ...S }}>
            {item}
          </div>
        ))}
      </div>
    )
    if (sec.type==="ratings") return (
      <div key={i} style={{ display:"flex", gap:10, flexWrap:"wrap", margin:"14px 0" }}>
        {sec.items?.map((r,j) => (
          <div key={j} style={{ display:"flex", alignItems:"center", gap:7, padding:"9px 18px", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:30, fontSize:13, ...S }}>
            <span>{r.icon}</span>
            {r.val && <span style={{ color:"#F59E0B", fontWeight:700, fontSize:15 }}>{r.val}</span>}
            <span style={{ color:"rgba(255,255,255,0.65)" }}>{r.label}</span>
          </div>
        ))}
      </div>
    )
    if (sec.type==="para") return (
      <p key={i} style={{ fontSize:"clamp(14px,2vw,16px)", lineHeight:1.9, color:"rgba(255,255,255,0.78)", padding:"24px 0 8px", ...S }} dangerouslySetInnerHTML={{ __html:sec.content||"" }} />
    )
    // intro
    return (
      <p key={i} style={{ fontSize:"clamp(14px,2vw,16px)", lineHeight:1.9, color:"rgba(255,255,255,0.78)", padding:"24px 0 8px", ...S }} dangerouslySetInnerHTML={{ __html:sec.content||"" }} />
    )
  }

  const WA = "971544735060"

  return (
    <div style={{ minHeight:"100vh", background:"#070810", color:"#fff", fontFamily:"'Outfit',sans-serif" }}>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap');
        *{box-sizing:border-box}
        details summary{cursor:pointer;list-style:none}
        details summary::-webkit-details-marker{display:none}
        details[open]{border-color:rgba(245,158,11,0.3)!important}
      `}</style>

      {/* Reading progress bar */}
      <div style={{ position:"fixed", top:0, left:0, right:0, zIndex:1000, height:3, background:"rgba(255,255,255,0.06)" }}>
        <div style={{ height:"100%", width:`${readPct}%`, background:"linear-gradient(90deg,#F59E0B,#D97706)", transition:"width 0.1s" }} />
      </div>

      {/* Hero */}
      <div style={{ position:"relative", height:460, overflow:"hidden", background:blog.color||"linear-gradient(135deg,#1a0800,#4a1c00)" }}>
        {blog.image && <img src={blog.image} alt={blog.title} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", opacity:0.4 }} onError={e=>e.target.style.display="none"} />}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, transparent 20%, rgba(7,8,16,0.6) 65%, #070810 100%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-end", padding:"0 24px 52px", textAlign:"center" }}>
          {/* Breadcrumb */}
          <nav style={{ position:"absolute", top:76, left:24, display:"flex", gap:8, fontSize:12, color:"rgba(255,255,255,0.4)" }}>
            <Link href="/" style={{ color:"rgba(255,255,255,0.4)", textDecoration:"none" }}>Home</Link>
            <span>/</span>
            <Link href="/blog" style={{ color:"rgba(255,255,255,0.4)", textDecoration:"none" }}>Blog</Link>
            <span>/</span>
            <span style={{ color:"rgba(255,255,255,0.65)" }}>{blog.category}</span>
          </nav>

          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(245,158,11,0.12)", border:"1px solid rgba(245,158,11,0.3)", borderRadius:30, padding:"6px 20px", marginBottom:16, fontSize:11, fontWeight:700, letterSpacing:"0.14em", textTransform:"uppercase", color:"#F59E0B" }}>
            {blog.heroTag || `${blog.catIcon||"📝"} ${blog.category} · ${blog.readTime} min read`}
          </div>

          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(24px,4.5vw,52px)", fontWeight:900, lineHeight:1.15, marginBottom:16, maxWidth:820, textShadow:"0 4px 24px rgba(0,0,0,0.7)" }}>
            {blog.heroTitle || blog.title}
            {blog.heroTitleEm && <> <em style={{ color:"#F59E0B", fontStyle:"italic" }}>{blog.heroTitleEm}</em></>}
          </h1>

          <div style={{ display:"flex", gap:18, alignItems:"center", flexWrap:"wrap", justifyContent:"center", fontSize:13, color:"rgba(255,255,255,0.45)" }}>
            {blog.author && <span>{blog.author.avatar} {blog.author.name}</span>}
            <span>📅 {blog.date}</span>
            <span>⏱️ {blog.readTime} min read</span>
            <span>⭐ 4.9</span>
          </div>
        </div>
      </div>

      {/* Article body */}
      <article style={{ maxWidth:780, margin:"0 auto", padding:"0 24px 80px" }}>

        {/* Sections */}
        {blog.sections?.map((sec, i) => renderSection(sec, i))}

        {/* FAQ */}
        {blog.faq?.length > 0 && (
          <section style={{ marginTop:48 }}>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(20px,3vw,28px)", fontWeight:700, marginBottom:20, color:"#fff" }}>
              Frequently Asked <span style={{ color:"#F59E0B" }}>Questions</span>
            </h2>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {blog.faq.map((f,i) => (
                <details key={i} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:14, overflow:"hidden" }}>
                  <summary style={{ padding:"16px 20px", fontSize:15, fontWeight:600, color:"#fff", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    {f.q}
                    <span style={{ color:"#F59E0B", fontSize:18, marginLeft:12, flexShrink:0 }}>+</span>
                  </summary>
                  <div style={{ padding:"0 20px 18px", fontSize:14, lineHeight:1.8, color:"rgba(255,255,255,0.65)" }}>{f.a}</div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        {blog.price > 0 && (
          <div style={{ marginTop:52, padding:"40px 32px", background:"linear-gradient(135deg,rgba(245,158,11,0.09),rgba(245,158,11,0.03))", border:"1px solid rgba(245,158,11,0.22)", borderRadius:24, textAlign:"center" }}>
            <div style={{ fontSize:40, marginBottom:14 }}>🏜️</div>
            <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:24, marginBottom:10 }}>Ready to Experience It?</h3>
            <p style={{ color:"rgba(255,255,255,0.45)", fontSize:14, marginBottom:26, lineHeight:1.75 }}>
              Join 10,000+ travellers who chose Dubai Rovers.<br/>
              Free cancellation · Hotel pickup included · Best price guarantee
            </p>
            <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap" }}>
              {blog.tourSlug && (
                <Link href={`/${blog.tourSlug}`} style={{ padding:"13px 32px", background:"linear-gradient(135deg,#F59E0B,#D97706)", borderRadius:50, color:"#000", fontWeight:700, fontSize:14, textDecoration:"none" }}>
                  🎯 Book Now — AED {blog.price}
                </Link>
              )}
              <a href={`https://wa.me/${WA}?text=${encodeURIComponent(`Hi Dubai Rovers! I read your blog about ${blog.title} and want to book. 🌟`)}`}
                target="_blank" rel="noreferrer"
                style={{ padding:"13px 28px", background:"linear-gradient(135deg,#25D366,#128C7E)", borderRadius:50, color:"#fff", fontWeight:700, fontSize:14, textDecoration:"none" }}>
                💬 Ask on WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* Related blogs */}
        {related.length > 0 && (
          <section style={{ marginTop:56 }}>
            <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, marginBottom:20 }}>
              More <span style={{ color:"#F59E0B" }}>{blog.category}</span> Guides
            </h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:16 }}>
              {related.map(rb => (
                <Link key={rb.slug} href={`/blog/${rb.slug}`} style={{ textDecoration:"none" }}>
                  <div style={{ padding:20, background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, transition:"all 0.2s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(245,158,11,0.3)"; e.currentTarget.style.transform="translateY(-2px)" }}
                    onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(255,255,255,0.07)"; e.currentTarget.style.transform="translateY(0)" }}>
                    <div style={{ fontSize:11, color:"#F59E0B", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>{rb.category}</div>
                    <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:15, fontWeight:700, color:"#fff", lineHeight:1.4, marginBottom:8 }}>{rb.title}</h3>
                    <span style={{ fontSize:12, color:"rgba(255,255,255,0.35)" }}>⏱️ {rb.readTime} min →</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div style={{ textAlign:"center", marginTop:40 }}>
          <Link href="/blog" style={{ color:"rgba(255,255,255,0.35)", fontSize:13, textDecoration:"none" }}>← Back to all blogs</Link>
        </div>
      </article>
    </div>
  )
}
