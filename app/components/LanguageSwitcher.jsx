"use client"
import { useState, useEffect } from "react"
import { LANGUAGES, getStoredLang, setStoredLang, autoDetectLang } from "../data/translations"

export default function LanguageSwitcher({ compact = false }) {
  const [lang,  setLang]  = useState("en")
  const [open,  setOpen]  = useState(false)

  useEffect(() => {
    autoDetectLang().then(detected => {
      const saved = getStoredLang()
      const active = saved || detected
      setLang(active)
      setStoredLang(active)
    })
    const close = (e) => { if (!e.target.closest("#dr-lang-sw")) setOpen(false) }
    document.addEventListener("click", close)
    return () => document.removeEventListener("click", close)
  }, [])

  const switchLang = (code) => {
    setLang(code)
    setStoredLang(code)
    setOpen(false)
    // Re-render every page by dispatching a custom event
    window.dispatchEvent(new CustomEvent("dr_lang_change", { detail: { lang: code } }))
    // Small delay then reload to apply everywhere
    setTimeout(() => window.location.reload(), 100)
  }

  const current = LANGUAGES.find(l => l.code === lang) || LANGUAGES[0]

  if (compact) return (
    <div id="dr-lang-sw" style={{ position:"relative" }}>
      <button onClick={() => setOpen(o => !o)} style={{ display:"flex", alignItems:"center", gap:5, padding:"6px 10px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:8, cursor:"pointer", color:"#fff", fontSize:13, fontFamily:"'Outfit',sans-serif" }}>
        <span style={{ fontSize:16 }}>{current.flag}</span>
        <span style={{ fontSize:12 }}>{current.label}</span>
        <span style={{ fontSize:9, opacity:0.5 }}>▼</span>
      </button>
      {open && (
        <div style={{ position:"absolute", top:"calc(100% + 6px)", right:0, background:"#0D1220", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, overflow:"hidden", zIndex:9999, minWidth:160, boxShadow:"0 12px 40px rgba(0,0,0,0.6)" }}>
          {LANGUAGES.map(l => (
            <button key={l.code} onClick={() => switchLang(l.code)} style={{ display:"flex", alignItems:"center", gap:8, width:"100%", padding:"10px 14px", background:lang===l.code?"rgba(245,158,11,0.1)":"transparent", border:"none", borderBottom:"1px solid rgba(255,255,255,0.04)", color:lang===l.code?"#F59E0B":"rgba(255,255,255,0.7)", cursor:"pointer", fontSize:13, fontFamily:"'Outfit',sans-serif" }}>
              <span style={{ fontSize:18 }}>{l.flag}</span>
              <span style={{ flex:1, textAlign:"left" }}>{l.label}</span>
              {lang===l.code && <span style={{ fontSize:12, color:"#F59E0B" }}>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )

  // Full bar version — shown at top of homepage
  return (
    <div style={{ background:"rgba(0,0,0,0.6)", backdropFilter:"blur(10px)", borderBottom:"1px solid rgba(255,255,255,0.06)", padding:"6px 24px", display:"flex", alignItems:"center", justifyContent:"center", gap:4, flexWrap:"wrap", position:"sticky", top:0, zIndex:300 }}>
      <span style={{ fontSize:11, color:"rgba(255,255,255,0.35)", marginRight:6, letterSpacing:"0.08em" }}>🌐 LANGUAGE:</span>
      {LANGUAGES.map(l => (
        <button key={l.code} onClick={() => switchLang(l.code)} style={{ display:"flex", alignItems:"center", gap:4, padding:"4px 10px", background:lang===l.code?"rgba(245,158,11,0.2)":"transparent", border:`1px solid ${lang===l.code?"rgba(245,158,11,0.4)":"rgba(255,255,255,0.08)"}`, borderRadius:16, cursor:"pointer", color:lang===l.code?"#F59E0B":"rgba(255,255,255,0.45)", fontSize:12, fontFamily:"'Outfit',sans-serif", fontWeight:lang===l.code?700:400, transition:"all 0.15s" }}>
          <span style={{ fontSize:14 }}>{l.flag}</span>
          <span style={{ display:lang===l.code?"inline":"none" }}> {l.label}</span>
        </button>
      ))}
    </div>
  )
}
