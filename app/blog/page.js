"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { BLOG_CATEGORIES, CURRENCIES } from "../data/blogs"
import { ALL_BLOGS } from "../data/all_blogs_merged"
import dynamic from "next/dynamic"
const BlogCardCanvas = dynamic(() => import("../components/BlogCardAnimations"), { ssr: false })

export default function BlogPage() {
  const [mounted,   setMounted]   = useState(false)
  const [category,  setCategory]  = useState("All")
  const [search,    setSearch]    = useState("")

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return null

  // Get published blogs — respects admin panel publish/unpublish
  const getPublished = () => {
    try {
      const ov = JSON.parse(localStorage.getItem("dr_blog_statuses") || "{}")
      return ALL_BLOGS.filter(b => (ov[b.slug] || b.status) === "published")
    } catch { return ALL_BLOGS.filter(b => b.status === "published") }
  }

  const published = getPublished()
  const featured  = published.filter(b => b.featured).slice(0, 3)
  const filtered  = published.filter(b => {
    const matchCat = category === "All" || b.category === category
    const matchS   = !search || b.title.toLowerCase().includes(search.toLowerCase()) || b.tags?.some(tg => tg.includes(search.toLowerCase()))
    return matchCat && matchS
  })

  return (
    <div style={{ minHeight:"100vh", background:"#0A0C10", fontFamily:"'Outfit',sans-serif", color:"#fff" }}>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:rgba(245,158,11,0.3);border-radius:10px}
        .bcard:hover{border-color:rgba(245,158,11,0.35)!important;transform:translateY(-2px)}
        @media(max-width:768px){
          .blog-featured-grid{grid-template-columns:1fr!important;}
          .blog-all-grid{grid-template-columns:1fr!important;gap:12px!important;}
          .blog-cats{overflow-x:auto!important;flex-wrap:nowrap!important;justify-content:flex-start!important;padding:0 4px 8px!important;scrollbar-width:none!important;}
          .blog-cats::-webkit-scrollbar{display:none!important;}
          .blog-cats button{flex-shrink:0!important;white-space:nowrap!important;padding:6px 14px!important;font-size:12px!important;}
          .blog-featured-side{flex-direction:row!important;gap:12px!important;}
          .blog-featured-side .thumb{width:80px!important;height:65px!important;flex-shrink:0!important;}
          .blog-main-title{font-size:18px!important;}
          .blog-wrap{padding:20px 14px!important;}
        }
        .bcard{transition:all 0.2s}
        .cat-btn:hover{background:rgba(245,158,11,0.08)!important;color:#F59E0B!important}
      `}</style>

      {/* Hero */}
      <div style={{ background:"linear-gradient(135deg,#0A0C10,#1a0800)", borderBottom:"1px solid rgba(245,158,11,0.1)", padding:"60px 24px 40px", textAlign:"center" }}>
        <div style={{ fontSize:12, fontWeight:700, letterSpacing:"0.15em", color:"#F59E0B", textTransform:"uppercase", marginBottom:12 }}>📝 Dubai Travel Blog</div>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(28px,5vw,52px)", fontWeight:700, marginBottom:12 }}>
          Guides, Tips &amp; <em style={{ color:"#F59E0B", fontStyle:"italic" }}>Honest Reviews</em>
        </h1>
        <p style={{ color:"rgba(255,255,255,0.45)", fontSize:15, marginBottom:32, maxWidth:500, margin:"0 auto 32px" }}>
          {published.length} articles covering every Dubai experience
        </p>
        {/* Search */}
        <div style={{ maxWidth:440, margin:"0 auto" }}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search blogs..."
            style={{ width:"100%", padding:"13px 20px", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(245,158,11,0.3)", borderRadius:50, color:"#fff", fontSize:15, fontFamily:"'Outfit',sans-serif", outline:"none", boxSizing:"border-box" }} />
        </div>
      </div>

      <div className="blog-wrap" style={{ maxWidth:1200, margin:"0 auto", padding:"40px 24px" }}>

        {/* Category filters */}
        <div className="blog-cats" style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:32, justifyContent:"center" }}>
          {BLOG_CATEGORIES.map(cat=>(
            <button key={cat} className="cat-btn" onClick={()=>setCategory(cat)}
              style={{ padding:"8px 18px", background: category===cat?"rgba(245,158,11,0.15)":"rgba(255,255,255,0.04)", border:`1px solid ${category===cat?"rgba(245,158,11,0.4)":"rgba(255,255,255,0.08)"}`, borderRadius:20, color: category===cat?"#F59E0B":"rgba(255,255,255,0.5)", fontSize:13, cursor:"pointer", fontFamily:"'Outfit',sans-serif", fontWeight: category===cat?600:400 }}>
              {cat}
              {cat!=="All" && <span style={{ marginLeft:5, opacity:0.6 }}>({published.filter(b=>b.category===cat).length})</span>}
            </button>
          ))}
        </div>

        {/* Featured row */}
        {category==="All" && !search && featured.length>0 && (
          <div style={{ marginBottom:52 }}>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, marginBottom:20, borderLeft:"3px solid #F59E0B", paddingLeft:14 }}>Featured Stories</div>
            <div className="blog-featured-grid" style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:20 }}>
              {/* Main featured */}
              {featured[0] && (
                <Link href={`/blog/${featured[0].slug}`} className="bcard" style={{ textDecoration:"none", color:"inherit", background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:20, overflow:"hidden", display:"block" }}>
                  <div style={{ height:280, background:featured[0].color||"linear-gradient(135deg,#1a0800,#4a1c00)", position:"relative", overflow:"hidden" }}>
                    <BlogCardCanvas slug={featured[0].slug} animId={featured[0].sections?.[0]?.animId} style={{ position:"absolute", inset:0 }} />
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)" }} />
                    <div style={{ position:"absolute", top:14, left:14, background:"rgba(245,158,11,0.9)", color:"#000", fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:4 }}>⭐ FEATURED</div>
                  </div>
                  <div style={{ padding:24 }}>
                    <div style={{ fontSize:12, color:"#F59E0B", fontWeight:600, marginBottom:8 }}>{featured[0].catIcon} {featured[0].category} · {featured[0].readTime} min read</div>
                    <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, marginBottom:10, lineHeight:1.35 }}>{featured[0].title}</h2>
                    <p style={{ color:"rgba(255,255,255,0.5)", fontSize:14, lineHeight:1.6, marginBottom:14 }}>{featured[0].metaDesc?.slice(0,120) || "Read more →"}...</p>
                    <span style={{ color:"#F59E0B", fontSize:13, fontWeight:600 }}>Read More →</span>
                  </div>
                </Link>
              )}
              {/* Side featured */}
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {featured.slice(1,3).map((post,i)=>(
                  <Link key={i} href={`/blog/${post.slug}`} className="bcard" style={{ textDecoration:"none", color:"inherit", display:"flex", gap:14, background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:16, alignItems:"flex-start" }}>
                    <div style={{ width:90, height:74, borderRadius:10, flexShrink:0, background:post.color||"linear-gradient(135deg,#1a0800,#4a1c00)", overflow:"hidden", position:"relative" }}>
                      <BlogCardCanvas slug={post.slug} animId={post.sections?.[0]?.animId} style={{ position:"absolute", inset:0 }} />
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:11, color:"#F59E0B", fontWeight:600, marginBottom:4 }}>{post.category}</div>
                      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:15, fontWeight:700, lineHeight:1.35, marginBottom:5 }}>{post.title}</div>
                      <div style={{ fontSize:12, color:"rgba(255,255,255,0.35)" }}>{post.readTime} min · {post.date}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* All posts grid */}
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, marginBottom:20, borderLeft:"3px solid #F59E0B", paddingLeft:14 }}>
          {category==="All" && !search ? "All Articles" : `${filtered.length} Result${filtered.length!==1?"s":""}`}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign:"center", padding:"60px 20px", color:"rgba(255,255,255,0.3)" }}>
            <div style={{ fontSize:40, marginBottom:12 }}>🔍</div>
            <div style={{ fontSize:16 }}>No posts found for "{search}"</div>
          </div>
        )}

        <div className="blog-all-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:20 }}>
          {filtered.map((post,i)=>(
            <Link key={i} href={`/blog/${post.slug}`} className="bcard"
              style={{ textDecoration:"none", color:"inherit", background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:18, overflow:"hidden", display:"block" }}>
              <div style={{ height:190, background:post.color||"linear-gradient(135deg,#1a0800,#4a1c00)", position:"relative", overflow:"hidden" }}>
                <BlogCardCanvas slug={post.slug} animId={post.sections?.[0]?.animId} style={{ position:"absolute", inset:0 }} />
                {!post.sections?.[0]?.animId && post.thumbImage && (
                  <img src={post.thumbImage} alt={post.title} style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover" }} onError={e=>e.target.style.display="none"} />
                )}
                {post.featured && <div style={{ position:"absolute", top:10, left:10, background:"rgba(245,158,11,0.9)", color:"#000", fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:4 }}>⭐ FEATURED</div>}
                <div style={{ position:"absolute", bottom:10, left:12, background:"rgba(0,0,0,0.6)", borderRadius:20, padding:"3px 10px", fontSize:11, color:"rgba(255,255,255,0.8)" }}>
                  {post.catIcon} {post.category}
                </div>
              </div>
              <div style={{ padding:18 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                  <span style={{ fontSize:11, color:"#F59E0B", fontWeight:600 }}>{post.readTime} min read</span>
                  <span style={{ fontSize:11, color:"rgba(255,255,255,0.3)" }}>{post.date}</span>
                </div>
                <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:16, fontWeight:700, lineHeight:1.4, marginBottom:8 }}>{post.title}</h3>
                <p style={{ color:"rgba(255,255,255,0.45)", fontSize:13, lineHeight:1.6, marginBottom:12 }}>{post.metaDesc?.slice(0,90)||""}...</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginBottom:12 }}>
                  {post.tags?.slice(0,3).map((tg,j)=>(
                    <span key={j} style={{ fontSize:10, color:"rgba(255,255,255,0.4)", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", padding:"2px 7px", borderRadius:4 }}>{tg}</span>
                  ))}
                </div>
                <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:10, display:"flex", justifyContent:"flex-end" }}>
                  <span style={{ color:"#F59E0B", fontSize:12, fontWeight:600 }}>Read →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>

      {/* Footer */}
      <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", padding:"32px 24px", textAlign:"center", color:"rgba(255,255,255,0.3)", fontSize:13 }}>
        <Link href="/" style={{ color:"#F59E0B", textDecoration:"none", fontWeight:600 }}>🏜️ Dubai Rovers</Link>
        <span style={{ margin:"0 12px" }}>•</span>
        <Link href="/blog" style={{ color:"rgba(255,255,255,0.4)", textDecoration:"none" }}>Blog</Link>
        <span style={{ margin:"0 12px" }}>•</span>
        <Link href="/contact" style={{ color:"rgba(255,255,255,0.4)", textDecoration:"none" }}>Contact</Link>
      </div>
    </div>
  )
}
