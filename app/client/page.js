"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { getStoredLang, getText, t, LANGUAGES } from "../data/translations"

const MOCK_HISTORY = {
  "sarah@email.com": {
    name: "Sarah Johnson",
    bookings: [
      { id:"DR-0283", tour:"Hot Air Balloon", pkg:"Sunrise Experience",   date:"2025-03-20", amount:895,  status:"confirmed", rating:5 },
      { id:"DR-0271", tour:"Desert Safari",   pkg:"Evening Safari",       date:"2025-02-14", amount:150,  status:"completed", rating:5 },
      { id:"DR-0259", tour:"Dhow Cruise",     pkg:"Marina Dinner Cruise", date:"2025-01-08", amount:250,  status:"completed", rating:4 },
    ]
  },
  "ahmed@email.com": {
    name: "Ahmed Al Mansouri",
    bookings: [
      { id:"DR-0284", tour:"Desert Safari",     pkg:"Evening Safari",   date:"2025-03-18", amount:600,  status:"confirmed", rating:null },
      { id:"DR-0268", tour:"Quad Bike",          pkg:"60 Min Adventure",date:"2025-01-22", amount:380,  status:"completed", rating:4   },
    ]
  }
}

const RECOMMENDATIONS = {
  "Hot Air Balloon": ["Desert Safari", "Private City Tour", "Camel Riding"],
  "Desert Safari":   ["Hot Air Balloon", "Quad Bike", "Camel Riding"],
  "Dhow Cruise":     ["Private City Tour", "Desert Safari", "Hot Air Balloon"],
  "Quad Bike":       ["Desert Safari", "Camel Riding", "Hot Air Balloon"],
  "Camel Riding":    ["Desert Safari", "Hot Air Balloon", "Quad Bike"],
  "City Tour":       ["Dhow Cruise", "Hot Air Balloon", "Desert Safari"],
}

const TOUR_INFO = {
  "Desert Safari":    { icon:"🏜️", slug:"desert-safari-dubai",     price:"AED 150" },
  "Hot Air Balloon":  { icon:"🎈", slug:"hot-air-balloon-dubai",    price:"AED 895" },
  "Dhow Cruise":      { icon:"⛵", slug:"dhow-cruise-dubai",        price:"AED 250" },
  "Quad Bike":        { icon:"🚵", slug:"quad-bike-dubai",          price:"AED 190" },
  "Camel Riding":     { icon:"🐪", slug:"camel-riding-dubai",       price:"AED 130" },
  "Private City Tour":{ icon:"🏙️", slug:"private-city-tour-dubai", price:"AED 550" },
}

const SC = {
  confirmed:{ bg:"rgba(16,185,129,0.15)", text:"#10B981" },
  completed:{ bg:"rgba(99,102,241,0.15)", text:"#818CF8" },
  pending:  { bg:"rgba(245,158,11,0.15)", text:"#F59E0B" },
  cancelled:{ bg:"rgba(239,68,68,0.15)",  text:"#EF4444" },
}

export default function ClientPortal() {
  const [lang,     setLang]     = useState("en")
  const [mode,     setMode]     = useState("login")   // login | register | portal
  const [email,    setEmail]    = useState("")
  const [name,     setName]     = useState("")
  const [pwd,      setPwd]      = useState("")
  const [error,    setError]    = useState("")
  const [client,   setClient]   = useState(null)
  const [tab,      setTab]      = useState("bookings")
  const [loading,  setLoading]  = useState(false)

  useEffect(() => {
    setLang(getStoredLang())
    // Check if already logged in
    const saved = localStorage.getItem("dr_client")
    if (saved) { try { setClient(JSON.parse(saved)); setMode("portal") } catch {} }
  }, [])

  const login = (e) => {
    e.preventDefault()
    setLoading(true); setError("")
    setTimeout(() => {
      const mock = MOCK_HISTORY[email.toLowerCase()]
      if (mock) {
        const data = { ...mock, email, joinedAt:"2024-12-01" }
        setClient(data); localStorage.setItem("dr_client", JSON.stringify(data)); setMode("portal")
      } else {
        // New user — create empty account
        const data = { name: email.split("@")[0], email, bookings:[], joinedAt:new Date().toISOString().split("T")[0] }
        setClient(data); localStorage.setItem("dr_client", JSON.stringify(data)); setMode("portal")
      }
      setLoading(false)
    }, 800)
  }

  const register = (e) => {
    e.preventDefault()
    setLoading(true); setError("")
    setTimeout(() => {
      const data = { name, email, bookings:[], joinedAt:new Date().toISOString().split("T")[0] }
      setClient(data); localStorage.setItem("dr_client", JSON.stringify(data)); setMode("portal")
      setLoading(false)
    }, 800)
  }

  const logout = () => { setClient(null); localStorage.removeItem("dr_client"); setMode("login"); setEmail(""); setPwd("") }

  // Build recommendations from booking history
  const recTours = []
  if (client?.bookings?.length) {
    const booked = client.bookings.map(b => b.tour)
    const lastTour = booked[0]
    const recs = RECOMMENDATIONS[lastTour] || []
    recs.forEach(r => { if (!booked.includes(r) && !recTours.includes(r)) recTours.push(r) })
  } else {
    recTours.push("Desert Safari", "Hot Air Balloon", "Dhow Cruise")
  }

  const totalSpent = client?.bookings?.reduce((s,b) => s + (b.amount||0), 0) || 0
  const completedN = client?.bookings?.filter(b => b.status==="completed").length || 0

  const IN = { width:"100%", padding:"13px 16px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:10, color:"#fff", fontSize:15, fontFamily:"'Outfit',sans-serif", boxSizing:"border-box", outline:"none" }

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#0A0C10 0%,#0F1A2E 50%,#0A0C10 100%)", fontFamily:"'Outfit',sans-serif", color:"#fff" }}>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:wght@700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        input:focus{border-color:rgba(245,158,11,0.5)!important;box-shadow:0 0 0 3px rgba(245,158,11,0.08)!important;outline:none!important}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
        .fade{animation:fadeUp 0.4s ease both}
        .card:hover{border-color:rgba(245,158,11,0.3)!important;transform:translateY(-2px)}
        .tb:hover{background:rgba(245,158,11,0.08)!important;color:#F59E0B!important}
      `}</style>

      {/* NAV */}
      <nav style={{ padding:"0 24px", height:60, display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid rgba(255,255,255,0.06)", background:"rgba(10,12,16,0.95)", backdropFilter:"blur(20px)", position:"sticky", top:0, zIndex:100 }}>
        <Link href="/" style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:"#F59E0B", fontWeight:700, textDecoration:"none" }}>🏜️ Dubai Rovers</Link>
        <div style={{ display:"flex", gap:12, alignItems:"center" }}>
          {client && <button onClick={logout} style={{ padding:"7px 14px", background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:8, color:"#EF4444", cursor:"pointer", fontSize:13, fontFamily:"'Outfit',sans-serif" }}>🚪 {getText(t.nav.login,lang) === "My Account" ? "Logout" : "خروج"}</button>}
          <Link href="/booking" style={{ padding:"8px 16px", background:"linear-gradient(135deg,#F59E0B,#D97706)", borderRadius:8, color:"#000", fontWeight:700, fontSize:13, textDecoration:"none" }}>{getText(t.nav.bookNow, lang)}</Link>
        </div>
      </nav>

      <div style={{ maxWidth:700, margin:"0 auto", padding:"48px 24px" }}>

        {/* ── LOGIN / REGISTER ── */}
        {mode !== "portal" && (
          <div className="fade" style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(245,158,11,0.15)", borderRadius:24, padding:"40px 36px", maxWidth:440, margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:28 }}>
              <div style={{ fontSize:44, marginBottom:12 }}>👤</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, marginBottom:6 }}>{getText(t.client.login, lang)}</div>
              <div style={{ color:"rgba(255,255,255,0.4)", fontSize:14 }}>Access your bookings and personalized recommendations</div>
            </div>

            {/* Mode toggle */}
            <div style={{ display:"flex", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:10, marginBottom:24, padding:3 }}>
              {[{id:"login",label:"Sign In"},{id:"register",label:"New Account"}].map(m=>(
                <button key={m.id} onClick={()=>setMode(m.id)} style={{ flex:1, padding:"9px", background:mode===m.id?"rgba(245,158,11,0.15)":"transparent", border:`1px solid ${mode===m.id?"rgba(245,158,11,0.3)":"transparent"}`, borderRadius:8, color:mode===m.id?"#F59E0B":"rgba(255,255,255,0.5)", cursor:"pointer", fontSize:14, fontFamily:"'Outfit',sans-serif", fontWeight:mode===m.id?600:400, transition:"all 0.2s" }}>{m.label}</button>
              ))}
            </div>

            <form onSubmit={mode==="login"?login:register}>
              {mode==="register" && (
                <div style={{ marginBottom:14 }}>
                  <label style={{ display:"block", fontSize:12, color:"rgba(255,255,255,0.4)", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.08em" }}>Full Name</label>
                  <input value={name} onChange={e=>setName(e.target.value)} required placeholder="Your full name" style={IN} />
                </div>
              )}
              <div style={{ marginBottom:14 }}>
                <label style={{ display:"block", fontSize:12, color:"rgba(255,255,255,0.4)", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.08em" }}>Email Address</label>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="your@email.com" style={IN} />
              </div>
              <div style={{ marginBottom:20 }}>
                <label style={{ display:"block", fontSize:12, color:"rgba(255,255,255,0.4)", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.08em" }}>Password</label>
                <input type="password" value={pwd} onChange={e=>setPwd(e.target.value)} placeholder="••••••••" style={IN} />
              </div>
              {error && <div style={{ color:"#EF4444", fontSize:13, marginBottom:12 }}>⚠️ {error}</div>}
              <button type="submit" disabled={loading} style={{ width:"100%", padding:"14px", background:loading?"rgba(245,158,11,0.3)":"linear-gradient(135deg,#F59E0B,#D97706)", border:"none", borderRadius:10, color:"#000", fontWeight:700, fontSize:15, cursor:loading?"wait":"pointer", fontFamily:"'Outfit',sans-serif" }}>
                {loading?"⏳ Please wait...":mode==="login"?"🔑 Sign In":"🚀 Create Account"}
              </button>
            </form>

            <div style={{ textAlign:"center", marginTop:16, fontSize:13, color:"rgba(255,255,255,0.35)" }}>
              Try: <span style={{ color:"#F59E0B", cursor:"pointer" }} onClick={()=>setEmail("sarah@email.com")}>sarah@email.com</span> to see demo history
            </div>
          </div>
        )}

        {/* ── PORTAL ── */}
        {mode === "portal" && client && (
          <div className="fade">
            {/* Welcome bar */}
            <div style={{ background:"linear-gradient(135deg,rgba(245,158,11,0.12),rgba(217,119,6,0.06))", border:"1px solid rgba(245,158,11,0.2)", borderRadius:18, padding:"24px 28px", marginBottom:24, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:24, fontWeight:700 }}>👋 Welcome back, {client.name.split(" ")[0]}!</div>
                <div style={{ color:"rgba(255,255,255,0.45)", fontSize:14, marginTop:4 }}>{client.email} • Member since {client.joinedAt}</div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, textAlign:"center" }}>
                <div style={{ background:"rgba(255,255,255,0.05)", borderRadius:10, padding:"10px 14px" }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:"#F59E0B" }}>{client.bookings.length}</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)" }}>Bookings</div>
                </div>
                <div style={{ background:"rgba(255,255,255,0.05)", borderRadius:10, padding:"10px 14px" }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:"#10B981" }}>AED {totalSpent}</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)" }}>Total spent</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display:"flex", gap:6, marginBottom:20 }}>
              {[{id:"bookings",label:"📋 My Bookings"},{id:"recommended",label:"✨ Recommended"},{id:"profile",label:"👤 Profile"}].map(tb=>(
                <button key={tb.id} className="tb" onClick={()=>setTab(tb.id)} style={{ padding:"9px 18px", background:tab===tb.id?"rgba(245,158,11,0.12)":"rgba(255,255,255,0.03)", border:`1px solid ${tab===tb.id?"rgba(245,158,11,0.3)":"rgba(255,255,255,0.07)"}`, borderRadius:9, color:tab===tb.id?"#F59E0B":"rgba(255,255,255,0.5)", cursor:"pointer", fontSize:13, fontFamily:"'Outfit',sans-serif", fontWeight:tab===tb.id?600:400, transition:"all 0.15s" }}>{tb.label}</button>
              ))}
            </div>

            {/* BOOKINGS */}
            {tab==="bookings" && (
              <div>
                {client.bookings.length === 0 ? (
                  <div style={{ textAlign:"center", padding:"40px 20px", background:"rgba(255,255,255,0.02)", borderRadius:16, border:"1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontSize:40, marginBottom:12 }}>🏜️</div>
                    <div style={{ fontSize:16, marginBottom:8 }}>No bookings yet</div>
                    <div style={{ color:"rgba(255,255,255,0.4)", fontSize:14, marginBottom:20 }}>Your Dubai adventure awaits!</div>
                    <Link href="/booking" style={{ padding:"12px 24px", background:"linear-gradient(135deg,#F59E0B,#D97706)", borderRadius:10, color:"#000", fontWeight:700, textDecoration:"none", fontSize:14 }}>Book Your First Tour →</Link>
                  </div>
                ) : client.bookings.map((b,i) => {
                  const sc = SC[b.status] || SC.pending
                  return (
                    <div key={i} style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:14, padding:"18px 20px", marginBottom:12, display:"flex", gap:16, alignItems:"center", transition:"all 0.2s" }}
                      onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(245,158,11,0.25)"} onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.06)"}>
                      <div style={{ width:50, height:50, borderRadius:12, background:"rgba(245,158,11,0.1)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>
                        {TOUR_INFO[b.tour]?.icon || "🏜️"}
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:16, fontWeight:600 }}>{b.tour}</div>
                        <div style={{ fontSize:13, color:"rgba(255,255,255,0.45)", marginTop:2 }}>{b.pkg} • {b.date}</div>
                        {b.rating && <div style={{ fontSize:12, color:"#F59E0B", marginTop:3 }}>{"⭐".repeat(b.rating)} rated</div>}
                      </div>
                      <div style={{ textAlign:"right" }}>
                        <div style={{ fontSize:16, fontWeight:700, color:"#F59E0B", marginBottom:5 }}>AED {b.amount}</div>
                        <span style={{ padding:"3px 10px", borderRadius:5, fontSize:11, fontWeight:600, background:sc.bg, color:sc.text, textTransform:"capitalize" }}>{b.status}</span>
                      </div>
                      <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)", minWidth:60, textAlign:"center" }}>{b.id}</div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* RECOMMENDED */}
            {tab==="recommended" && (
              <div>
                <div style={{ fontSize:14, color:"rgba(255,255,255,0.45)", marginBottom:16 }}>
                  {client.bookings.length > 0
                    ? `Based on your ${client.bookings[0].tour} experience, you might love:`
                    : "Popular experiences for first-time Dubai visitors:"}
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
                  {recTours.map((name, i) => {
                    const info = TOUR_INFO[name]
                    if (!info) return null
                    return (
                      <div key={i} className="card" style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:16, padding:20, textAlign:"center", transition:"all 0.2s", cursor:"pointer" }}>
                        <div style={{ fontSize:36, marginBottom:10 }}>{info.icon}</div>
                        <div style={{ fontSize:15, fontWeight:600, marginBottom:4 }}>{name}</div>
                        <div style={{ fontSize:13, color:"#F59E0B", fontWeight:600, marginBottom:12 }}>from {info.price}</div>
                        <Link href={`/${info.slug}`} style={{ display:"block", padding:"8px", background:"linear-gradient(135deg,#F59E0B,#D97706)", borderRadius:8, color:"#000", fontWeight:700, fontSize:12, textDecoration:"none" }}>View Tour →</Link>
                      </div>
                    )
                  })}
                </div>
                <div style={{ marginTop:24, padding:16, background:"rgba(245,158,11,0.05)", border:"1px solid rgba(245,158,11,0.15)", borderRadius:12 }}>
                  <div style={{ fontSize:13, color:"rgba(255,255,255,0.5)", lineHeight:1.7 }}>
                    💡 <strong style={{ color:"#F59E0B" }}>Loyalty Tip:</strong> Returning guests get priority booking and early access to new packages. WhatsApp us to get your repeat-guest discount!
                    <a href="https://wa.me/971544735060?text=Hi! I am a returning guest and want to book again." target="_blank" rel="noopener noreferrer" style={{ display:"inline-block", marginLeft:8, padding:"4px 10px", background:"rgba(37,211,102,0.1)", border:"1px solid rgba(37,211,102,0.3)", borderRadius:6, color:"#25D366", textDecoration:"none", fontSize:12 }}>💬 WhatsApp</a>
                  </div>
                </div>
              </div>
            )}

            {/* PROFILE */}
            {tab==="profile" && (
              <div style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:16, padding:24 }}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:700, marginBottom:18 }}>👤 My Profile</div>
                {[{l:"Full Name",v:client.name},{l:"Email",v:client.email},{l:"Member Since",v:client.joinedAt},{l:"Total Bookings",v:client.bookings.length},{l:"Tours Completed",v:completedN},{l:"Total Spent",v:`AED ${totalSpent}`}].map((f,i)=>(
                  <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"12px 0", borderBottom:i<5?"1px solid rgba(255,255,255,0.05)":"none" }}>
                    <span style={{ color:"rgba(255,255,255,0.4)", fontSize:13 }}>{f.l}</span>
                    <span style={{ fontWeight:600, fontSize:14, color:f.l==="Total Spent"?"#F59E0B":"#fff" }}>{f.v}</span>
                  </div>
                ))}
                <button onClick={logout} style={{ marginTop:20, padding:"10px 20px", background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:9, color:"#EF4444", cursor:"pointer", fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:13 }}>🚪 Sign Out</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
