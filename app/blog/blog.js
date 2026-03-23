"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { BLOG_CATEGORIES, CURRENCIES } from "../data/blogs"
import { ALL_BLOGS } from "../data/all_blogs_merged"
import { LANGUAGES, getText, t, getStoredLang, setStoredLang } from "../data/translations"

export default function BlogPage() {
  const [lang,        setLang]        = useState("en")
  const [currency,    setCurrency]    = useState(CURRENCIES[0])
  const [langOpen,    setLangOpen]    = useState(false)
  const [curOpen,     setCurOpen]     = useState(false)
  const [category,    setCategory]    = useState("All")
  const [search,      setSearch]      = useState("")
  const [menuOpen,    setMenuOpen]    = useState(false)

  useEffect(() => {
    const l = getStoredLang()
    setLang(l)
    const lo = LANGUAGES.find(x => x.code === l)
    if (lo) document.documentElement.dir = lo.dir
    const saved = localStorage.getItem("dr_currency")
    if (saved) { const c = CURRENCIES.find(x => x.code === saved); if(c) setCurrency(c) }
    const close = (e) => {
      if (!e.target.closest("#lang-sw"))  setLangOpen(false)
      if (!e.target.closest("#cur-sw"))   setCurOpen(false)
      if (!e.target.closest("#nav-menu")) setMenuOpen(false)
    }
    document.addEventListener("click", close)
    return () => document.removeEventListener("click", close)
  }, [])

  const switchLang = (l) => { setLang(l); setStoredLang(l); setLangOpen(false); const lo = LANGUAGES.find(x=>x.code===l); if(lo) document.documentElement.dir=lo.dir }
  const switchCur  = (c) => { setCurrency(c); localStorage.setItem("dr_currency", c.code); setCurOpen(false) }

  // Get published blogs respecting admin panel overrides (localStorage)
  const getPublished = () => {
    if (typeof window === "undefined") return ALL_BLOGS.filter(b => b.status === "published")
    try {
      const overrides = JSON.parse(localStorage.getItem("dr_blog_statuses") || "{}")
      return ALL_BLOGS.filter(b => (overrides[b.slug] || b.status) === "published")
    } catch { return ALL_BLOGS.filter(b => b.status === "published") }
  }
  const published = getPublished()
  const filtered  = published.filter(b => {
    const matchCat = category === "All" || b.category === category
    const matchS   = b.title.toLowerCase().includes(search.toLowerCase()) || b.tags.some(tg => tg.includes(search.toLowerCase()))
    return matchCat && matchS
  })
  const featured  = published.filter(b => b.featured).slice(0, 3)

  return (
    <div style={{ minHeight:"100vh", background:"#0A0C10", fontFamily:"'Outfit',sans-serif", color:"#fff" }}>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:6px}::-webkit-scrollbar-thumb{background:rgba(245,158,11,0.3);border-radius:10px}
        .card:hover .card-img{transform:scale(1.05)}
        .card:hover .card-title{color:#F59E0B}
        .tag:hover{background:rgba(245,158,11,0.15)!important;color:#F59E0B!important;border-color:rgba(245,158,11,0.3)!important}
        .sw-btn:hover{background:rgba(255,255,255,0.08)!important}
        .sw-item:hover{background:rgba(245,158,11,0.08)!important}
        .cat-btn:hover{background:rgba(245,158,11,0.08)!important;color:#F59E0B!important}
        .share-btn:hover{opacity:0.85;transform:translateY(-1px)}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
        .fade-up{animation:fadeUp 0.5s ease both}
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{ position:"sticky", top:0, zIndex:200, background:"rgba(10,12,16,0.95)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(245,158,11,0.12)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between", height:64 }}>
          <Link href="/" style={{ fontFamily:"'Playfair Display',serif", fontSize:22, color:"#F59E0B", fontWeight:700, textDecoration:"none" }}>🏜️ Dubai Rovers</Link>

          {/* Desktop Nav */}
          <div style={{ display:"flex", alignItems:"center", gap:28 }}>
            {[{href:"/",label:"Home"},{href:"/#tours",label:"Tours"},{href:"/blog",label:"Blog"},{href:"/about",label:"About"},{href:"/contact",label:"Contact"}].map(item=>(
              <Link key={item.href} href={item.href} style={{ color:"rgba(255,255,255,0.7)", fontSize:14, textDecoration:"none", fontWeight:500, transition:"color 0.15s" }}
                onMouseEnter={e=>e.target.style.color="#F59E0B"} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.7)"}>{item.label}</Link>
            ))}
          </div>

          {/* Right Controls */}
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>

            {/* Currency Switcher */}
            <div id="cur-sw" style={{ position:"relative" }}>
              <button className="sw-btn" onClick={()=>{setCurOpen(o=>!o);setLangOpen(false)}} style={{ display:"flex", alignItems:"center", gap:5, padding:"7px 11px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:8, cursor:"pointer", color:"#fff", fontSize:12, fontFamily:"'Outfit',sans-serif", fontWeight:600, transition:"background 0.15s" }}>
                <span>{currency.symbol}</span><span>{currency.code}</span><span style={{ fontSize:9, opacity:0.5 }}>▼</span>
              </button>
              {curOpen && (
                <div style={{ position:"absolute", top:"calc(100% + 6px)", right:0, background:"#0D1220", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, overflow:"hidden", zIndex:999, minWidth:170, boxShadow:"0 8px 30px rgba(0,0,0,0.5)" }}>
                  {CURRENCIES.map(c=>(
                    <button key={c.code} className="sw-item" onClick={()=>switchCur(c)} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", width:"100%", padding:"9px 14px", background:currency.code===c.code?"rgba(245,158,11,0.1)":"transparent", border:"none", borderBottom:"1px solid rgba(255,255,255,0.04)", color:currency.code===c.code?"#F59E0B":"rgba(255,255,255,0.7)", cursor:"pointer", fontSize:12, fontFamily:"'Outfit',sans-serif", textAlign:"left" }}>
                      <span><b>{c.symbol}</b> {c.code}</span>
                      <span style={{ fontSize:11, opacity:0.5 }}>{c.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <div id="lang-sw" style={{ position:"relative" }}>
              <button className="sw-btn" onClick={()=>{setLangOpen(o=>!o);setCurOpen(false)}} style={{ display:"flex", alignItems:"center", gap:5, padding:"7px 11px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:8, cursor:"pointer", color:"#fff", fontSize:13, fontFamily:"'Outfit',sans-serif", transition:"background 0.15s" }}>
                <span>{LANGUAGES.find(l2=>l2.code===lang)?.flag}</span>
                <span style={{ fontSize:12 }}>{LANGUAGES.find(l2=>l2.code===lang)?.label}</span>
                <span style={{ fontSize:9, opacity:0.5 }}>▼</span>
              </button>
              {langOpen && (
                <div style={{ position:"absolute", top:"calc(100% + 6px)", right:0, background:"#0D1220", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, overflow:"hidden", zIndex:999, minWidth:150, boxShadow:"0 8px 30px rgba(0,0,0,0.5)" }}>
                  {LANGUAGES.map(l2=>(
                    <button key={l2.code} className="sw-item" onClick={()=>switchLang(l2.code)} style={{ display:"flex", alignItems:"center", gap:8, width:"100%", padding:"10px 14px", background:lang===l2.code?"rgba(245,158,11,0.1)":"transparent", border:"none", borderBottom:"1px solid rgba(255,255,255,0.04)", color:lang===l2.code?"#F59E0B":"rgba(255,255,255,0.7)", cursor:"pointer", fontSize:13, fontFamily:"'Outfit',sans-serif", textAlign:"left" }}>
                      <span style={{ fontSize:18 }}>{l2.flag}</span><span>{l2.label}</span>
                      {lang===l2.code && <span style={{ marginLeft:"auto", fontSize:12 }}>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link href="/booking" style={{ padding:"8px 16px", background:"linear-gradient(135deg,#F59E0B,#D97706)", borderRadius:8, color:"#000", fontWeight:700, fontSize:13, textDecoration:"none" }}>
              {getText(t.nav.bookNow, lang)}
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div style={{ background:"linear-gradient(135deg,#0D1220 0%,#1A1000 50%,#0D1220 100%)", padding:"64px 24px 48px", textAlign:"center", borderBottom:"1px solid rgba(245,158,11,0.1)" }}>
        <div style={{ maxWidth:700, margin:"0 auto" }}>
          <div style={{ fontSize:13, color:"#F59E0B", fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", marginBottom:12 }}>📝 Dubai Travel Blog</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:48, fontWeight:700, lineHeight:1.15, marginBottom:16 }}>
            Guides, Tips &<br/><span style={{ color:"#F59E0B", fontStyle:"italic" }}>Honest Reviews</span>
          </h1>
          <p style={{ color:"rgba(255,255,255,0.55)", fontSize:17, lineHeight:1.7, marginBottom:28 }}>
            Real experiences, practical advice, and the stuff your hotel brochure won't tell you — from people who do this every day.
          </p>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search blogs..."
            style={{ width:"100%", maxWidth:420, padding:"13px 18px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:12, color:"#fff", fontSize:15, fontFamily:"'Outfit',sans-serif", outline:"none" }} />
        </div>
      </div>

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"48px 24px" }}>

        {/* ── CATEGORY FILTER ── */}
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:40, justifyContent:"center" }}>
          {BLOG_CATEGORIES.map(cat=>(
            <button key={cat} className="cat-btn" onClick={()=>setCategory(cat)} style={{ padding:"8px 18px", background:category===cat?"rgba(245,158,11,0.15)":"rgba(255,255,255,0.04)", border:`1px solid ${category===cat?"rgba(245,158,11,0.4)":"rgba(255,255,255,0.08)"}`, borderRadius:20, color:category===cat?"#F59E0B":"rgba(255,255,255,0.5)", fontSize:13, cursor:"pointer", fontFamily:"'Outfit',sans-serif", fontWeight:category===cat?600:400, transition:"all 0.15s" }}>
              {cat}
            </button>
          ))}
        </div>

        {/* ── FEATURED ROW ── */}
        {category==="All" && !search && (
          <div style={{ marginBottom:56 }}>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, marginBottom:24, borderLeft:"3px solid #F59E0B", paddingLeft:16 }}>Featured Stories</div>
            <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:20 }}>
              {/* Big featured */}
              {featured[0] && (
                <Link href={`/blog/${featured[0].slug}`} className="card" style={{ textDecoration:"none", color:"inherit", display:"block", background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:20, overflow:"hidden", transition:"border-color 0.2s" }}
                  onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(245,158,11,0.3)"} onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.06)"}>
                  <div style={{ overflow:"hidden", height:320, position:"relative" }}>
                    <img className="card-img" src={featured[0].image || featured[0].thumbImage || ""} alt={featured[0].title} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.4s ease", display:"block" }} />
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)" }} />
                    <div style={{ position:"absolute", bottom:20, left:20, right:20 }}>
                      <span style={{ background:"rgba(245,158,11,0.9)", color:"#000", fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:4 }}>✨ FEATURED</span>
                    </div>
                  </div>
                  <div style={{ padding:24 }}>
                    <div style={{ display:"flex", gap:8, marginBottom:12, flexWrap:"wrap" }}>
                      <span style={{ fontSize:12, color:"#F59E0B", fontWeight:600 }}>{featured[0].category}</span>
                      <span style={{ fontSize:12, color:"rgba(255,255,255,0.35)" }}>• {featured[0].readTime} • {featured[0].date}</span>
                    </div>
                    <h2 className="card-title" style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, marginBottom:10, lineHeight:1.35, transition:"color 0.2s" }}>{featured[0].title}</h2>
                    <p style={{ color:"rgba(255,255,255,0.5)", fontSize:14, lineHeight:1.6, marginBottom:16 }}>{featured[0].metaDesc?.slice(0,120) || ""}...</p>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ fontSize:13, color:"rgba(255,255,255,0.35)" }}>🕐 {featured[0].readTime} min read</span>
                      <span style={{ color:"#F59E0B", fontSize:13, fontWeight:600 }}>Read More →</span>
                    </div>
                  </div>
                </Link>
              )}
              {/* Side featured */}
              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                {featured.slice(1,3).map((post,i)=>(
                  <Link key={i} href={`/blog/${post.slug}`} className="card" style={{ textDecoration:"none", color:"inherit", display:"flex", gap:14, background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:16, overflow:"hidden", padding:16, transition:"border-color 0.2s", alignItems:"flex-start" }}
                    onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(245,158,11,0.3)"} onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.06)"}>
                    <div style={{ width:90, height:80, borderRadius:10, overflow:"hidden", flexShrink:0 }}>
                      <img className="card-img" src={post.thumbImage || post.image || ""} alt={post.title} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.4s ease", display:"block" }} />
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:11, color:"#F59E0B", fontWeight:600, marginBottom:4 }}>{post.category}</div>
                      <h3 className="card-title" style={{ fontFamily:"'Playfair Display',serif", fontSize:15, fontWeight:700, lineHeight:1.35, marginBottom:6, transition:"color 0.2s" }}>{post.title}</h3>
                      <div style={{ fontSize:12, color:"rgba(255,255,255,0.35)" }}>{post.readTime}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── ALL POSTS GRID ── */}
        <div style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, marginBottom:24, borderLeft:"3px solid #F59E0B", paddingLeft:16 }}>
          {category==="All" && !search ? "All Articles" : `${filtered.length} Result${filtered.length!==1?"s":""}`}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
          {filtered.map((post,i)=>(
            <Link key={i} href={`/blog/${post.slug}`} className="card fade-up" style={{ textDecoration:"none", color:"inherit", display:"block", background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:18, overflow:"hidden", transition:"border-color 0.2s", animationDelay:`${i*0.06}s` }}
              onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(245,158,11,0.3)"} onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.06)"}>
              <div style={{ overflow:"hidden", height:200, position:"relative" }}>
                <img className="card-img" src={post.thumbImage || post.image || ""} alt={post.title} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.4s ease", display:"block" }} />
                {post.featured && <div style={{ position:"absolute", top:12, left:12, background:"rgba(245,158,11,0.9)", color:"#000", fontSize:10, fontWeight:700, padding:"2px 8px", borderRadius:4 }}>✨ FEATURED</div>}
              </div>
              <div style={{ padding:18 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                  <span style={{ fontSize:11, color:"#F59E0B", fontWeight:600, background:"rgba(245,158,11,0.1)", padding:"3px 8px", borderRadius:4 }}>{post.category}</span>
                  <span style={{ fontSize:11, color:"rgba(255,255,255,0.35)" }}>{post.readTime}</span>
                </div>
                <h3 className="card-title" style={{ fontFamily:"'Playfair Display',serif", fontSize:17, fontWeight:700, lineHeight:1.35, marginBottom:8, transition:"color 0.2s" }}>{post.title}</h3>
                <p style={{ color:"rgba(255,255,255,0.45)", fontSize:13, lineHeight:1.6, marginBottom:12 }}>{post.metaDesc?.slice(0,90) || ""}...</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginBottom:12 }}>
                  {post.tags.slice(0,3).map((tg,j)=>(
                    <span key={j} className="tag" style={{ fontSize:10, color:"rgba(255,255,255,0.4)", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", padding:"2px 7px", borderRadius:4, cursor:"pointer", transition:"all 0.15s" }}>{tg}</span>
                  ))}
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:10, borderTop:"1px solid rgba(255,255,255,0.05)" }}>
                  <span style={{ fontSize:12, color:"rgba(255,255,255,0.3)" }}>🕐 {post.readTime} min read</span>
                  <span style={{ color:"#F59E0B", fontSize:12, fontWeight:600 }}>Read →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign:"center", padding:"60px 20px", color:"rgba(255,255,255,0.3)" }}>
            <div style={{ fontSize:40, marginBottom:12 }}>🔍</div>
            <div style={{ fontSize:16 }}>No posts found for "{search}"</div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", padding:"32px 24px", textAlign:"center", color:"rgba(255,255,255,0.3)", fontSize:13 }}>
        <Link href="/" style={{ color:"#F59E0B", textDecoration:"none", fontWeight:600 }}>🏜️ Dubai Rovers</Link>
        <span style={{ margin:"0 12px" }}>•</span>
        <Link href="/blog" style={{ color:"rgba(255,255,255,0.4)", textDecoration:"none" }}>Blog</Link>
        <span style={{ margin:"0 12px" }}>•</span>
        <Link href="/contact" style={{ color:"rgba(255,255,255,0.4)", textDecoration:"none" }}>Contact</Link>
        <div style={{ marginTop:12 }}>© 2025 Dubai Rovers. {getText(t.footer.rights, lang)}.</div>
      </div>
    </div>
  )
}
