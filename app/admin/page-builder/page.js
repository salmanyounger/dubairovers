"use client"
import { useState, useEffect } from "react"
import Link from "next/link"

const PW = "dubairovers2025"

const INITIAL_PAGES = [
  { id:"page_demo_001", title:"Eid Special Desert Safari — 30% OFF",  slug:"eid-special-offer",           type:"landing", status:"draft",     createdAt:"2026-03-12", updatedAt:"2026-03-12", blocks:3 },
  { id:"page_demo_002", title:"Dubai Water Sports — Summer 2026",      slug:"dubai-water-sports-summer",   type:"listing", status:"draft",     createdAt:"2026-03-10", updatedAt:"2026-03-11", blocks:2 },
]

const PAGE_TYPES = [
  { id:"landing",  icon:"🎯", label:"Landing Page",  desc:"Promos, offers, seasonal deals — with countdown, urgency & CTA" },
  { id:"listing",  icon:"📋", label:"Tour Listing",   desc:"Curated tour collection or new category page" },
  { id:"detail",   icon:"📄", label:"Tour Detail",    desc:"Deep detail page for a specific package or custom tour" },
  { id:"static",   icon:"📃", label:"Static Page",    desc:"About, Contact, FAQ, Privacy Policy, Terms" },
]

const SC = {
  published: { bg:"rgba(16,185,129,0.12)", text:"#10B981", border:"rgba(16,185,129,0.3)" },
  draft:     { bg:"rgba(99,102,241,0.12)", text:"#818CF8", border:"rgba(99,102,241,0.3)" },
  archived:  { bg:"rgba(107,114,128,0.12)",text:"#9CA3AF", border:"rgba(107,114,128,0.3)" },
}

const T = {
  bg:"#0d0804", card:"rgba(255,255,255,0.04)", cardBorder:"rgba(255,255,255,0.09)",
  text:"#fff", sub:"rgba(255,255,255,0.45)", accent:"#F59E0B",
}

function Badge({ status }) {
  const s = SC[status] || SC.draft
  return (
    <span style={{ padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:600, background:s.bg, color:s.text, border:`1px solid ${s.border}` }}>
      {status}
    </span>
  )
}

function TypeIcon({ type }) {
  return PAGE_TYPES.find(t => t.id === type)?.icon || "📄"
}

export default function PageBuilderManager() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState("")
  const [pwErr, setPwErr] = useState("")
  const [pages, setPages] = useState(INITIAL_PAGES)
  const [filter, setFilter] = useState("all")
  const [showCreate, setShowCreate] = useState(false)
  const [newPage, setNewPage] = useState({ title:"", type:"landing", slug:"" })
  const [notif, setNotif] = useState("")
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const a = sessionStorage.getItem("dr_admin_authed")
    if (a === "1") setAuthed(true)
    const saved = localStorage.getItem("dr_custom_pages")
    if (saved) { try { setPages(JSON.parse(saved)) } catch {} }
  }, [])

  const toast = (msg) => { setNotif(msg); setTimeout(() => setNotif(""), 3000) }

  const save = (p) => {
    setPages(p)
    localStorage.setItem("dr_custom_pages", JSON.stringify(p))
  }

  const login = (e) => {
    e.preventDefault()
    if (password === PW) { sessionStorage.setItem("dr_admin_authed","1"); setAuthed(true) }
    else setPwErr("Wrong password")
  }

  const generateSlug = (title) => title.toLowerCase().replace(/[^a-z0-9\s]/g,"").replace(/\s+/g,"-").replace(/-+/g,"-").trim()

  const createPage = () => {
    if (!newPage.title.trim()) return
    const id = "page_" + Date.now()
    const slug = newPage.slug || generateSlug(newPage.title)
    const page = {
      id, title: newPage.title, slug, type: newPage.type,
      status: "draft", createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0], blocks: 0,
    }
    const updated = [page, ...pages]
    save(updated)
    setShowCreate(false)
    setNewPage({ title:"", type:"landing", slug:"" })
    toast("✅ Page created! Opening editor...")
    setTimeout(() => { window.location.href = `/admin/page-builder/editor/${id}` }, 800)
  }

  const deletePage = (id) => {
    save(pages.filter(p => p.id !== id))
    setDeleteConfirm(null)
    toast("🗑️ Page deleted")
  }

  const toggleStatus = (id) => {
    save(pages.map(p => p.id === id ? { ...p, status: p.status === "published" ? "draft" : "published", updatedAt: new Date().toISOString().split("T")[0] } : p))
    toast("✅ Status updated")
  }

  const duplicatePage = (page) => {
    const id = "page_" + Date.now()
    const copy = { ...page, id, title: page.title + " (Copy)", slug: page.slug + "-copy", status:"draft", createdAt: new Date().toISOString().split("T")[0], updatedAt: new Date().toISOString().split("T")[0] }
    save([copy, ...pages])
    toast("✅ Page duplicated")
  }

  const filtered = pages.filter(p => {
    const matchFilter = filter === "all" || p.type === filter || p.status === filter
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.slug.includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const stats = {
    total: pages.length,
    published: pages.filter(p => p.status === "published").length,
    draft: pages.filter(p => p.status === "draft").length,
    landing: pages.filter(p => p.type === "landing").length,
  }

  if (!authed) return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#0A0A0F,#0F1A2E)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Outfit',sans-serif" }}>
      <style suppressHydrationWarning>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Playfair+Display:wght@700&display=swap');input:focus{outline:none;border-color:rgba(245,158,11,0.5)!important}`}</style>
      <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:24, padding:"48px 40px", width:"100%", maxWidth:400 }}>
        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ fontSize:48 }}>🏗️</div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:26, color:"#F59E0B", fontWeight:700, marginTop:8 }}>Page Builder</div>
          <div style={{ color:"rgba(255,255,255,0.4)", fontSize:13, marginTop:4 }}>DubaiRovers Admin</div>
        </div>
        <form onSubmit={login}>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Admin password..."
            style={{ width:"100%", padding:"13px 16px", background:"rgba(255,255,255,0.05)", border:`1px solid ${pwErr?"#EF4444":"rgba(245,158,11,0.2)"}`, borderRadius:10, color:"#fff", fontSize:14, outline:"none", boxSizing:"border-box", marginBottom:8, fontFamily:"'Outfit',sans-serif" }} />
          {pwErr && <div style={{ color:"#EF4444", fontSize:12, marginBottom:10 }}>⚠️ {pwErr}</div>}
          <button type="submit" style={{ width:"100%", padding:"13px", background:"linear-gradient(135deg,#F59E0B,#D97706)", border:"none", borderRadius:10, color:"#000", fontWeight:700, fontSize:14, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>🔐 Login</button>
        </form>
        <div style={{ textAlign:"center", marginTop:16 }}>
          <Link href="/admin" style={{ color:"rgba(255,255,255,0.3)", fontSize:12, textDecoration:"none" }}>← Back to Admin Panel</Link>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight:"100vh", background:T.bg, fontFamily:"'Outfit',sans-serif", color:T.text }}>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap');
        *{box-sizing:border-box}
        .row-hover:hover{background:rgba(255,255,255,0.04)!important}
        .btn-ghost:hover{background:rgba(255,255,255,0.08)!important}
        .card-hover:hover{border-color:rgba(245,158,11,0.3)!important;background:rgba(245,158,11,0.04)!important}
        @keyframes si{from{opacity:0;transform:scale(0.96) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes ni{from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* TOP BAR */}
      <div style={{ background:"rgba(0,0,0,0.5)", borderBottom:"1px solid rgba(255,255,255,0.07)", padding:"0 24px", height:58, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100, backdropFilter:"blur(12px)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <Link href="/admin" style={{ color:T.sub, fontSize:13, textDecoration:"none", display:"flex", alignItems:"center", gap:6 }}>
            <span>←</span> Admin Panel
          </Link>
          <span style={{ color:"rgba(255,255,255,0.15)" }}>|</span>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:700, color:"#F59E0B" }}>🏗️ Page Builder</div>
        </div>
        <button onClick={() => setShowCreate(true)}
          style={{ padding:"8px 20px", background:"linear-gradient(135deg,#F59E0B,#D97706)", border:"none", borderRadius:9, color:"#000", fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"'Outfit',sans-serif", display:"flex", alignItems:"center", gap:7 }}>
          + Create New Page
        </button>
      </div>

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"28px 24px" }}>

        {/* STATS ROW */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:24 }}>
          {[
            { label:"Total Pages",  value:stats.total,     icon:"📄", color:"#F59E0B" },
            { label:"Published",    value:stats.published, icon:"🚀", color:"#10B981" },
            { label:"Drafts",       value:stats.draft,     icon:"✏️", color:"#818CF8" },
            { label:"Landing Pages",value:stats.landing,   icon:"🎯", color:"#F472B6" },
          ].map(s => (
            <div key={s.label} style={{ background:T.card, border:`1px solid ${T.cardBorder}`, borderRadius:14, padding:"16px 18px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <div style={{ color:T.sub, fontSize:11, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:5 }}>{s.label}</div>
                  <div style={{ fontSize:28, fontWeight:800, color:s.color }}>{s.value}</div>
                </div>
                <div style={{ fontSize:28, opacity:0.6 }}>{s.icon}</div>
              </div>
            </div>
          ))}
        </div>

        {/* FILTERS + SEARCH */}
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18, flexWrap:"wrap" }}>
          <div style={{ flex:1, minWidth:200 }}>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search pages..."
              style={{ width:"100%", padding:"9px 14px", background:T.card, border:`1px solid ${T.cardBorder}`, borderRadius:9, color:T.text, fontSize:13, outline:"none", fontFamily:"'Outfit',sans-serif" }} />
          </div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {[["all","All"],["published","Published"],["draft","Draft"],["landing","Landing"],["listing","Listing"],["detail","Detail"],["static","Static"]].map(([id,lb]) => (
              <button key={id} onClick={() => setFilter(id)} className="btn-ghost"
                style={{ padding:"7px 13px", background:filter===id?"rgba(245,158,11,0.12)":"transparent", border:`1px solid ${filter===id?"rgba(245,158,11,0.4)":T.cardBorder}`, borderRadius:8, color:filter===id?"#F59E0B":T.sub, fontSize:12, cursor:"pointer", fontFamily:"'Outfit',sans-serif", fontWeight:filter===id?600:400, transition:"all 0.15s" }}>
                {lb}
              </button>
            ))}
          </div>
        </div>

        {/* PAGES TABLE */}
        <div style={{ background:T.card, border:`1px solid ${T.cardBorder}`, borderRadius:16, overflow:"hidden" }}>
          {/* Header */}
          <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 80px 160px", gap:0, padding:"11px 18px", borderBottom:`1px solid ${T.cardBorder}`, background:"rgba(255,255,255,0.02)" }}>
            {["Page Title","Type","Status","URL Slug","Blocks","Actions"].map(h => (
              <div key={h} style={{ color:T.sub, fontSize:11, textTransform:"uppercase", letterSpacing:"0.08em", fontWeight:600 }}>{h}</div>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div style={{ padding:"48px 24px", textAlign:"center" }}>
              <div style={{ fontSize:40, marginBottom:12 }}>📭</div>
              <div style={{ color:T.sub, fontSize:14 }}>{search ? "No pages match your search" : "No pages yet — create your first one!"}</div>
              {!search && (
                <button onClick={() => setShowCreate(true)}
                  style={{ marginTop:16, padding:"9px 22px", background:"linear-gradient(135deg,#F59E0B,#D97706)", border:"none", borderRadius:9, color:"#000", fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
                  + Create First Page
                </button>
              )}
            </div>
          ) : (
            filtered.map((page, i) => (
              <div key={page.id} className="row-hover"
                style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 80px 160px", gap:0, padding:"14px 18px", borderBottom:i < filtered.length-1 ? `1px solid ${T.cardBorder}` : "none", transition:"background 0.15s", alignItems:"center" }}>

                {/* Title */}
                <div>
                  <div style={{ fontWeight:600, fontSize:14, color:T.text, marginBottom:3 }}>
                    {TypeIcon({ type:page.type })} {page.title}
                  </div>
                  <div style={{ color:T.sub, fontSize:11 }}>Updated {page.updatedAt}</div>
                </div>

                {/* Type */}
                <div style={{ color:T.sub, fontSize:12, textTransform:"capitalize" }}>
                  {PAGE_TYPES.find(t => t.id === page.type)?.label || page.type}
                </div>

                {/* Status */}
                <div><Badge status={page.status} /></div>

                {/* Slug */}
                <div style={{ color:"rgba(245,158,11,0.7)", fontSize:12, fontFamily:"monospace" }}>/{page.slug}</div>

                {/* Block count */}
                <div style={{ color:T.sub, fontSize:13 }}>{page.blocks} block{page.blocks !== 1 ? "s" : ""}</div>

                {/* Actions */}
                <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                  <Link href={`/admin/page-builder/editor/${page.id}`}
                    style={{ padding:"5px 11px", background:"rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.25)", borderRadius:7, color:"#F59E0B", fontSize:11, fontWeight:600, cursor:"pointer", textDecoration:"none", fontFamily:"'Outfit',sans-serif" }}>
                    ✏️ Edit
                  </Link>
                  <button onClick={() => toggleStatus(page.id)} className="btn-ghost"
                    style={{ padding:"5px 11px", background:page.status==="published"?"rgba(239,68,68,0.08)":"rgba(16,185,129,0.08)", border:`1px solid ${page.status==="published"?"rgba(239,68,68,0.2)":"rgba(16,185,129,0.2)"}`, borderRadius:7, color:page.status==="published"?"#F87171":"#10B981", fontSize:11, fontWeight:600, cursor:"pointer", fontFamily:"'Outfit',sans-serif", transition:"all 0.15s" }}>
                    {page.status === "published" ? "⬇️ Unpublish" : "🚀 Publish"}
                  </button>
                  <button onClick={() => duplicatePage(page)} className="btn-ghost"
                    style={{ padding:"5px 9px", background:"transparent", border:`1px solid ${T.cardBorder}`, borderRadius:7, color:T.sub, fontSize:11, cursor:"pointer", fontFamily:"'Outfit',sans-serif", transition:"all 0.15s" }}>
                    ⧉
                  </button>
                  <button onClick={() => setDeleteConfirm(page.id)} className="btn-ghost"
                    style={{ padding:"5px 9px", background:"transparent", border:"1px solid rgba(239,68,68,0.2)", borderRadius:7, color:"#F87171", fontSize:11, cursor:"pointer", fontFamily:"'Outfit',sans-serif", transition:"all 0.15s" }}>
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Page type info cards */}
        <div style={{ marginTop:28 }}>
          <div style={{ color:T.sub, fontSize:12, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:14 }}>Page Types Available</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
            {PAGE_TYPES.map(pt => (
              <div key={pt.id} className="card-hover"
                style={{ background:T.card, border:`1px solid ${T.cardBorder}`, borderRadius:13, padding:"16px", cursor:"pointer", transition:"all 0.2s" }}
                onClick={() => { setNewPage(n => ({...n, type:pt.id})); setShowCreate(true) }}>
                <div style={{ fontSize:26, marginBottom:8 }}>{pt.icon}</div>
                <div style={{ fontWeight:700, fontSize:13, color:T.text, marginBottom:4 }}>{pt.label}</div>
                <div style={{ color:T.sub, fontSize:11, lineHeight:1.5 }}>{pt.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CREATE PAGE MODAL ── */}
      {showCreate && (
        <div onClick={() => setShowCreate(false)}
          style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.8)", zIndex:400, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
          <div onClick={e => e.stopPropagation()}
            style={{ background:"#110c06", border:"1px solid rgba(245,158,11,0.2)", borderRadius:20, padding:28, width:"100%", maxWidth:520, animation:"si 0.2s ease" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:"#fff" }}>✨ Create New Page</div>
              <button onClick={() => setShowCreate(false)} style={{ background:"none", border:"none", color:T.sub, fontSize:20, cursor:"pointer" }}>✕</button>
            </div>

            {/* Page title */}
            <div style={{ marginBottom:14 }}>
              <label style={{ color:T.sub, fontSize:11, textTransform:"uppercase", letterSpacing:"0.08em", display:"block", marginBottom:6 }}>Page Title *</label>
              <input value={newPage.title} onChange={e => setNewPage(n => ({...n, title:e.target.value, slug:generateSlug(e.target.value)}))}
                placeholder="e.g. Eid Special Desert Safari Offer"
                style={{ width:"100%", padding:"11px 14px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:9, color:"#fff", fontSize:14, fontFamily:"'Outfit',sans-serif", outline:"none", boxSizing:"border-box" }} />
            </div>

            {/* Slug */}
            <div style={{ marginBottom:14 }}>
              <label style={{ color:T.sub, fontSize:11, textTransform:"uppercase", letterSpacing:"0.08em", display:"block", marginBottom:6 }}>URL Slug</label>
              <div style={{ display:"flex", alignItems:"center", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:9, overflow:"hidden" }}>
                <span style={{ padding:"11px 12px", color:"rgba(245,158,11,0.5)", fontSize:13, borderRight:"1px solid rgba(255,255,255,0.08)", whiteSpace:"nowrap" }}>dubairovers.com/</span>
                <input value={newPage.slug} onChange={e => setNewPage(n => ({...n, slug:e.target.value}))}
                  style={{ flex:1, padding:"11px 12px", background:"transparent", border:"none", color:"#F59E0B", fontSize:13, fontFamily:"monospace", outline:"none" }} />
              </div>
            </div>

            {/* Page type */}
            <div style={{ marginBottom:22 }}>
              <label style={{ color:T.sub, fontSize:11, textTransform:"uppercase", letterSpacing:"0.08em", display:"block", marginBottom:10 }}>Page Type</label>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                {PAGE_TYPES.map(pt => (
                  <div key={pt.id} onClick={() => setNewPage(n => ({...n, type:pt.id}))}
                    style={{ padding:"12px 14px", background:newPage.type===pt.id?"rgba(245,158,11,0.1)":"rgba(255,255,255,0.03)", border:`2px solid ${newPage.type===pt.id?"rgba(245,158,11,0.5)":"rgba(255,255,255,0.07)"}`, borderRadius:10, cursor:"pointer", transition:"all 0.15s" }}>
                    <div style={{ fontSize:20, marginBottom:4 }}>{pt.icon}</div>
                    <div style={{ fontWeight:600, fontSize:12, color:"#fff", marginBottom:2 }}>{pt.label}</div>
                    <div style={{ fontSize:10, color:T.sub, lineHeight:1.4 }}>{pt.desc}</div>
                    {newPage.type === pt.id && <div style={{ marginTop:6, color:"#F59E0B", fontSize:11, fontWeight:600 }}>✅ Selected</div>}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display:"flex", gap:10 }}>
              <button onClick={() => setShowCreate(false)}
                style={{ flex:1, padding:"12px", background:"transparent", border:`1px solid ${T.cardBorder}`, borderRadius:10, color:T.sub, fontSize:13, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
                Cancel
              </button>
              <button onClick={createPage} disabled={!newPage.title.trim()}
                style={{ flex:2, padding:"12px", background:newPage.title.trim()?"linear-gradient(135deg,#F59E0B,#D97706)":"rgba(245,158,11,0.2)", border:"none", borderRadius:10, color:newPage.title.trim()?"#000":"rgba(255,255,255,0.2)", fontWeight:700, fontSize:14, cursor:newPage.title.trim()?"pointer":"not-allowed", fontFamily:"'Outfit',sans-serif", transition:"all 0.2s" }}>
                ✨ Create & Open Editor →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRM ── */}
      {deleteConfirm && (
        <div onClick={() => setDeleteConfirm(null)}
          style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.8)", zIndex:400, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div onClick={e => e.stopPropagation()}
            style={{ background:"#110c06", border:"1px solid rgba(239,68,68,0.3)", borderRadius:16, padding:28, maxWidth:380, width:"100%", animation:"si 0.2s ease", textAlign:"center" }}>
            <div style={{ fontSize:40, marginBottom:12 }}>⚠️</div>
            <div style={{ fontSize:18, fontWeight:700, color:"#fff", marginBottom:8 }}>Delete this page?</div>
            <div style={{ color:T.sub, fontSize:13, marginBottom:22 }}>"{pages.find(p=>p.id===deleteConfirm)?.title}" will be permanently deleted. This cannot be undone.</div>
            <div style={{ display:"flex", gap:10 }}>
              <button onClick={() => setDeleteConfirm(null)}
                style={{ flex:1, padding:"11px", background:"transparent", border:`1px solid ${T.cardBorder}`, borderRadius:9, color:T.sub, fontSize:13, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
                Cancel
              </button>
              <button onClick={() => deletePage(deleteConfirm)}
                style={{ flex:1, padding:"11px", background:"rgba(239,68,68,0.9)", border:"none", borderRadius:9, color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
                🗑️ Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {notif && (
        <div style={{ position:"fixed", top:16, right:16, zIndex:9999, padding:"11px 18px", borderRadius:10, fontSize:13, fontWeight:600, background:"rgba(16,185,129,0.95)", color:"#fff", boxShadow:"0 8px 28px rgba(0,0,0,0.4)", animation:"ni 0.25s ease" }}>
          {notif}
        </div>
      )}
    </div>
  )
}
