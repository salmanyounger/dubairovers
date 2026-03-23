"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const LANGS = [
  { code:"en", gt:"en",    flag:"🇬🇧", label:"English"   },
  { code:"ar", gt:"ar",    flag:"🇦🇪", label:"عربي"      },
  { code:"zh", gt:"zh-CN", flag:"🇨🇳", label:"中文"       },
  { code:"hi", gt:"hi",    flag:"🇮🇳", label:"हिन्दी"    },
  { code:"es", gt:"es",    flag:"🇪🇸", label:"Español"   },
  { code:"fr", gt:"fr",    flag:"🇫🇷", label:"Français"  },
  { code:"ru", gt:"ru",    flag:"🇷🇺", label:"Русский"   },
  { code:"de", gt:"de",    flag:"🇩🇪", label:"Deutsch"   },
  { code:"ja", gt:"ja",    flag:"🇯🇵", label:"日本語"      },
  { code:"pt", gt:"pt",    flag:"🇧🇷", label:"Português" },
]

const BASE_NAV = [
  { label:"Home",  href:"/"       },
  { label:"Tours", href:"/#tours" },
  { label:"Blog",  href:"/blog"   },
]

function detectLang() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""
    if (/Karachi|Kolkata|Dhaka|Kathmandu|Colombo/.test(tz)) return "en"
    if (/Dubai|Riyadh|Kuwait|Muscat|Bahrain|Qatar|Aden|Baghdad|Cairo|Beirut|Amman/.test(tz)) return "ar"
    if (/Moscow|Yekaterinburg|Novosibirsk/.test(tz)) return "ru"
    if (/Shanghai|Beijing|Chongqing|Hong_Kong|Taipei/.test(tz)) return "zh"
    if (/Tokyo|Osaka/.test(tz)) return "ja"
    if (/Paris|Lyon|Brussels|Geneva/.test(tz)) return "fr"
    if (/Berlin|Vienna|Zurich|Amsterdam|Stockholm/.test(tz)) return "de"
    if (/Madrid|Bogota|Mexico_City|Lima|Santiago/.test(tz)) return "es"
    if (/Sao_Paulo|Brasilia|Lisbon/.test(tz)) return "pt"
    const bl = (navigator?.language || "en").toLowerCase().split("-")[0]
    return { ar:"ar",zh:"zh",hi:"hi",es:"es",fr:"fr",ru:"ru",de:"de",ja:"ja",pt:"pt" }[bl] || "en"
  } catch { return "en" }
}

function setGTCookie(gtCode) {
  if (gtCode === "en") {
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${location.hostname}`
  } else {
    const val = `/en/${gtCode}`, exp = "Fri, 31 Dec 2027 23:59:59 UTC"
    document.cookie = `googtrans=${val}; expires=${exp}; path=/`
    document.cookie = `googtrans=${val}; expires=${exp}; path=/; domain=${location.hostname}`
  }
}

function readGTCookie() {
  const m = document.cookie.match(/googtrans=\/en\/([^;]+)/)
  if (!m) return "en"
  const found = LANGS.find(l => l.gt === m[1])
  return found ? found.code : "en"
}

function injectGT() {
  if (document.getElementById("dr-gt-mount")) return
  const mount = document.createElement("div")
  mount.id = "dr-gt-mount"
  mount.style.cssText = "display:none;position:absolute;visibility:hidden;height:0"
  document.body.appendChild(mount)
  window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement({ pageLanguage:"en", autoDisplay:false }, "dr-gt-mount")
  }
  const s = document.createElement("script")
  s.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
  s.async = true
  document.head.appendChild(s)
}

function suppressGTUI() {
  if (document.getElementById("dr-gt-css")) return
  const css = document.createElement("style")
  css.id = "dr-gt-css"
  css.textContent = `
    .goog-te-banner-frame,.skiptranslate,#goog-gt-tt,
    .goog-tooltip,.goog-te-gadget,#dr-gt-mount,
    .goog-text-highlight{display:none!important;visibility:hidden!important;}
    body{top:0!important;position:static!important;}
    font[style]{background-color:transparent!important;}
  `
  document.head.appendChild(css)
}

export default function SiteTopBar() {
  const [mounted,    setMounted]    = useState(false)
  const [lang,       setLang]       = useState("en")
  const [night,      setNight]      = useState(true)
  const [langOpen,   setLangOpen]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled,   setScrolled]   = useState(false)
  const [client,     setClient]     = useState(null)
  const [pageVis,    setPageVis]    = useState({ attractions:true, flights:true, booking:true, contact:true, about:true })
  const langRef  = useRef(null)
  const pathname = usePathname()

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    suppressGTUI()

    const saved      = localStorage.getItem("dr_lang")
    const cookieLang = readGTCookie()
    const activeLang = saved || cookieLang || detectLang()
    setLang(activeLang)
    applyDir(activeLang)
    if (activeLang !== "en") injectGT()

    const sn = localStorage.getItem("dr_night")
    const activeNight = sn !== null ? sn !== "false" : true
    setNight(activeNight)
    applyTheme(activeNight)

    const sc = localStorage.getItem("dr_client")
    if (sc) { try { setClient(JSON.parse(sc)) } catch {} }

    const loadPV = () => {
      try {
        const pv = JSON.parse(localStorage.getItem("dr_page_visibility") || "{}")
        setPageVis(p => ({ ...p, ...pv }))
      } catch {}
    }
    loadPV()
    window.addEventListener("storage", loadPV)

    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)

    const closeDD = e => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false)
    }
    document.addEventListener("mousedown", closeDD)

    return () => {
      window.removeEventListener("scroll", onScroll)
      document.removeEventListener("mousedown", closeDD)
      window.removeEventListener("storage", loadPV)
    }
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  function applyDir(code) {
    document.documentElement.lang = code
    document.documentElement.dir  = code === "ar" ? "rtl" : "ltr"
  }

  function applyTheme(n) {
    const r = document.documentElement
    r.setAttribute("data-theme", n ? "night" : "day")
    r.style.setProperty("--dr-bg",     n ? "#080C14"               : "#FFFFFF")
    r.style.setProperty("--dr-text",   n ? "#ffffff"               : "#0A0A0F")
    r.style.setProperty("--dr-sub",    n ? "rgba(255,255,255,0.5)" : "rgba(10,10,15,0.5)")
    r.style.setProperty("--dr-card",   n ? "rgba(255,255,255,0.03)": "rgba(0,0,0,0.02)")
    r.style.setProperty("--dr-border", n ? "rgba(255,255,255,0.08)": "rgba(0,0,0,0.1)")

    let el = document.getElementById("dr-theme-override")
    if (!el) { el = document.createElement("style"); el.id = "dr-theme-override"; document.head.appendChild(el) }

    if (!n) {
      el.textContent = `
        body, .min-h-screen { background-color: #f8fafc !important; color: #0a0a0f !important; }
        .bg-\\[\\#0a0a0a\\], .bg-\\[\\#111\\], .bg-\\[\\#111827\\], .bg-black\\/90 { background-color: #ffffff !important; }
        .bg-\\[\\#0d1117\\], .bg-\\[\\#0b0f1a\\] { background-color: #f1f5f9 !important; }
        nav.fixed { background: rgba(255,255,255,0.97) !important; border-bottom-color: rgba(0,0,0,0.08) !important; }
        .text-white { color: #0a0a0f !important; }
        .text-gray-300, .text-gray-400, .text-gray-500 { color: #475569 !important; }
        .border-white\\/10, .border-white\\/20 { border-color: rgba(0,0,0,0.1) !important; }
        .bg-white\\/10, .bg-white\\/5 { background-color: rgba(0,0,0,0.04) !important; }
        .backdrop-blur-xl { backdrop-filter: blur(12px); }
        footer { background-color: #f1f5f9 !important; border-color: rgba(0,0,0,0.1) !important; }
        section { background-color: #f8fafc !important; }
        .bg-gradient-to-r.from-orange-500\\/10 { background: rgba(249,115,22,0.06) !important; }
        input, textarea, select { background-color: #f1f5f9 !important; color: #0a0a0f !important; border-color: rgba(0,0,0,0.15) !important; }
        .bg-\\[\\#111\\].border { background-color: #ffffff !important; border-color: rgba(0,0,0,0.1) !important; }
        h1,h2,h3,h4,h5,h6 { color: #0a0a0f !important; }
        p { color: #334155 !important; }
      `
    } else {
      el.textContent = ``
    }
  }

  const switchLang = (code) => {
    const l = LANGS.find(x => x.code === code)
    if (!l) return
    setLangOpen(false)
    localStorage.setItem("dr_lang", code)
    setGTCookie(l.gt)
    window.location.reload()
  }

  const toggleNight = () => {
    const n = !night
    setNight(n)
    localStorage.setItem("dr_night", String(n))
    applyTheme(n)
  }

  const hiddenRoutes = ["/admin", "/seo-pro"]
  if (!mounted || hiddenRoutes.some(r => pathname?.startsWith(r))) return null

  const cur = LANGS.find(l => l.code === lang) || LANGS[0]

  const NAV = [
    ...BASE_NAV,
    ...(pageVis.attractions ? [{ label:"🎟️ Attractions", href:"/attractions" }] : []),
    ...(pageVis.flights     ? [{ label:"✈️ Flights",     href:"/flights"     }] : []),
    ...(pageVis.about       ? [{ label:"About",           href:"/about"       }] : []),
    ...(pageVis.contact     ? [{ label:"Contact",         href:"/contact"     }] : []),
  ]

  const navBg = scrolled
    ? night ? "rgba(8,12,20,0.97)"  : "rgba(255,255,255,0.97)"
    : "transparent"
  const navBorder = scrolled
    ? night ? "rgba(245,158,11,0.1)" : "rgba(0,0,0,0.08)"
    : "transparent"
  const textColor = night ? "#fff" : scrolled ? "#0A0A0F" : "#fff"
  const ddBg = night ? "#0D1220" : "#fff"
  const ddBd = night ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
  const rBd  = night ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"

  return (
    <>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=Playfair+Display:wght@700&display=swap');
        #dr-nav, #dr-nav * { box-sizing:border-box; font-family:'Outfit',sans-serif; }

        /* Nav link underline animation */
        .dr-nl { position:relative; transition:color 0.15s; white-space:nowrap; flex-shrink:0; }
        .dr-nl::after { content:''; position:absolute; bottom:-3px; left:0; width:0; height:2px; background:#F59E0B; border-radius:2px; transition:width 0.2s; }
        .dr-nl:hover::after, .dr-nl.active::after { width:100%; }
        .dr-nl:hover { color:#F59E0B !important; }
        .dr-nl.active { color:#F59E0B !important; }

        /* Buttons */
        .dr-btn { transition:all 0.15s; }
        .dr-btn:hover { border-color:rgba(245,158,11,0.45)!important; color:#F59E0B!important; background:rgba(245,158,11,0.07)!important; }
        .dr-book { transition:all 0.2s; white-space:nowrap; }
        .dr-book:hover { transform:translateY(-1px); filter:brightness(1.08); box-shadow:0 6px 20px rgba(245,158,11,0.35)!important; }
        .dr-lo { transition:background 0.12s, color 0.12s; }
        .dr-lo:hover { background:rgba(245,158,11,0.09)!important; color:#F59E0B!important; }

        /* Animations */
        @keyframes drdd { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:none} }
        .drdd { animation:drdd 0.16s ease; }
        @keyframes mob-in { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:none} }
        .mob-menu { animation:mob-in 0.2s ease; }

        /* Hamburger */
        .dr-hb span { display:block; width:22px; height:2px; background:currentColor; border-radius:2px; transition:all 0.25s; }
        .dr-hb.open span:nth-child(1) { transform:rotate(45deg) translate(3px,3px); }
        .dr-hb.open span:nth-child(2) { opacity:0; }
        .dr-hb.open span:nth-child(3) { transform:rotate(-45deg) translate(3px,-3px); }

        /* ── RESPONSIVE LAYOUT ── */

        /* Desktop (>1080px): full nav visible, hamburger hidden */
        .dr-desktop-nav { display:flex; align-items:center; gap:20px; flex:1; min-width:0; }
        .dr-hamburger   { display:none; }
        .dr-toggle-lbl  { display:inline; }
        .dr-acct-lbl    { display:inline; }
        .dr-book-txt    { display:inline; }

        /* Medium (≤1080px): tighten gaps, hide toggle/account labels */
        @media (max-width:1080px) {
          .dr-desktop-nav { gap:14px; }
          .dr-toggle-lbl  { display:none; }
        }

        /* Tablet/mobile (≤960px): collapse to hamburger */
        @media (max-width:960px) {
          .dr-desktop-nav { display:none !important; }
          .dr-hamburger   { display:flex !important; flex-direction:column; gap:5px; }
          .dr-acct-lbl    { display:none; }
          .dr-book-txt    { display:none; }
        }

        /* Small (≤600px): even tighter right side */
        @media (max-width:600px) {
          #dr-nav { padding:0 14px !important; }
        }
      `}</style>

      {/* ══ MAIN NAVBAR ══ */}
      <nav id="dr-nav" style={{
        position:"fixed", top:0, left:0, right:0, zIndex:9999,
        height:66, display:"flex", alignItems:"center",
        padding:"0 28px",
        background: navBg,
        borderBottom:`1px solid ${navBorder}`,
        backdropFilter: scrolled ? "blur(18px)" : "none",
        transition:"background 0.3s, border-color 0.3s, backdrop-filter 0.3s",
        gap:0,
      }}>

        {/* ── LOGO ── */}
        <Link href="/" style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:8, flexShrink:0, marginRight:28 }}>
          <span style={{ fontSize:22 }}>🏜️</span>
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:19, fontWeight:700, color:"#F59E0B", letterSpacing:"-0.3px", whiteSpace:"nowrap" }}>
            Dubai <span style={{ color:textColor }}>Rovers</span>
          </span>
        </Link>

        {/* ── DESKTOP NAV LINKS ── */}
        <div className="dr-desktop-nav">
          {NAV.map(n => {
            const isActive = pathname === n.href || (n.href !== "/" && pathname?.startsWith(n.href.split("#")[0]))
            return (
              <Link key={n.href} href={n.href}
                className={`dr-nl${isActive?" active":""}`}
                style={{ color: isActive ? "#F59E0B" : textColor, textDecoration:"none", fontSize:14, fontWeight:500 }}>
                {n.label}
              </Link>
            )
          })}
        </div>

        {/* ── RIGHT CONTROLS ── */}
        <div style={{ display:"flex", alignItems:"center", gap:6, flexShrink:0, marginLeft:"auto" }}>

          {/* Book Now */}
          <Link href="/booking" className="dr-book" style={{
            padding:"7px 15px",
            background:"linear-gradient(135deg,#F59E0B,#D97706)",
            borderRadius:22, color:"#000", fontWeight:700, fontSize:13,
            textDecoration:"none",
            boxShadow:"0 4px 14px rgba(245,158,11,0.25)",
            display:"flex", alignItems:"center", gap:5,
          }}>
            <span className="dr-book-txt">Book Now</span>
            <span>✈️</span>
          </Link>

          {/* 🌐 Language */}
          <div ref={langRef} style={{ position:"relative" }}>
            <button onClick={() => setLangOpen(o => !o)} className="dr-btn" style={{
              display:"flex", alignItems:"center", gap:5, padding:"6px 11px",
              background:"transparent",
              border:`1px solid ${langOpen ? "rgba(245,158,11,0.4)" : "rgba(255,255,255,0.2)"}`,
              borderRadius:22, cursor:"pointer",
              color: langOpen ? "#F59E0B" : textColor, fontSize:12, fontWeight:500,
              whiteSpace:"nowrap",
            }}>
              <span style={{ fontSize:15 }}>{cur.flag}</span>
              <span style={{ maxWidth:52, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{cur.label}</span>
              <span style={{ fontSize:8, opacity:0.6 }}>{langOpen?"▲":"▼"}</span>
            </button>

            {langOpen && (
              <div className="drdd" style={{
                position:"absolute", top:"calc(100% + 7px)", right:0,
                background:ddBg, border:`1px solid ${ddBd}`,
                borderRadius:14, overflow:"hidden", zIndex:10001,
                width:182, boxShadow:`0 16px 48px rgba(0,0,0,${night?0.6:0.15})`,
              }}>
                <div style={{ padding:"8px 14px 5px", fontSize:10, letterSpacing:"0.1em", textTransform:"uppercase", color:night?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.3)", fontWeight:600 }}>
                  🌐 Select Language
                </div>
                {LANGS.map(l => (
                  <button key={l.code} className="dr-lo" onClick={() => switchLang(l.code)} style={{
                    display:"flex", alignItems:"center", gap:9,
                    width:"100%", padding:"9px 14px",
                    background: lang===l.code ? "rgba(245,158,11,0.09)" : "transparent",
                    border:"none", borderBottom:`1px solid ${rBd}`,
                    color: lang===l.code ? "#F59E0B" : night ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.65)",
                    cursor:"pointer", fontSize:13, textAlign:"left",
                  }}>
                    <span style={{ fontSize:18, flexShrink:0 }}>{l.flag}</span>
                    <span style={{ flex:1 }}>{l.label}</span>
                    {lang===l.code && <span style={{ fontSize:13 }}>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 👤 My Account */}
          <Link href="/client" className="dr-btn" style={{
            display:"flex", alignItems:"center", gap:5, padding:"6px 12px",
            border:`1px solid rgba(255,255,255,0.2)`,
            borderRadius:22, color: client ? "#F59E0B" : textColor,
            textDecoration:"none", fontSize:12, fontWeight: client ? 600 : 400,
            whiteSpace:"nowrap",
          }}>
            <span>👤</span>
            <span className="dr-acct-lbl">{client ? (client.name?.split(" ")[0] || "Account") : "Account"}</span>
          </Link>

          {/* ☀️🌙 Night toggle */}
          <div onClick={toggleNight} className="dr-btn" style={{
            display:"flex", alignItems:"center", gap:5, cursor:"pointer",
            border:`1px solid rgba(255,255,255,0.2)`,
            borderRadius:22, padding:"6px 10px", userSelect:"none",
            whiteSpace:"nowrap",
          }}>
            <span style={{ fontSize:13 }}>{night?"🌙":"☀️"}</span>
            <div style={{
              width:28, height:15, borderRadius:8, position:"relative",
              background: night?"rgba(245,158,11,0.28)":"rgba(245,158,11,0.18)",
              border:"1px solid rgba(245,158,11,0.4)",
              flexShrink:0,
            }}>
              <div style={{
                width:10, height:10, borderRadius:"50%", background:"#F59E0B",
                position:"absolute", top:1.5, left: night ? 15 : 1.5,
                transition:"left 0.25s", boxShadow:"0 1px 4px rgba(245,158,11,0.5)",
              }} />
            </div>
            <span className="dr-toggle-lbl" style={{ fontSize:11, color:textColor, fontWeight:500 }}>
              {night?"Night":"Day"}
            </span>
          </div>

          {/* 🍔 Hamburger — shown via CSS at ≤960px */}
          <button
            onClick={() => setMobileOpen(o => !o)}
            className={`dr-hamburger dr-hb${mobileOpen?" open":""}`}
            style={{ background:"none", border:"none", cursor:"pointer", color:textColor, padding:4 }}
            aria-label="Menu"
          >
            <span/><span/><span/>
          </button>
        </div>
      </nav>

      {/* ══ MOBILE MENU ══ */}
      {mobileOpen && (
        <div className="mob-menu" style={{
          position:"fixed", top:66, left:0, right:0, zIndex:9998,
          background: night ? "rgba(8,12,20,0.98)" : "rgba(255,255,255,0.98)",
          backdropFilter:"blur(20px)",
          borderBottom:`1px solid ${night?"rgba(245,158,11,0.1)":"rgba(0,0,0,0.08)"}`,
          padding:"14px 28px 20px",
        }}>
          {NAV.map(n => (
            <Link key={n.href} href={n.href}
              style={{ display:"block", padding:"12px 0", color: textColor, textDecoration:"none", fontSize:16, fontWeight:500, borderBottom:`1px solid ${night?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.06)"}` }}>
              {n.label}
            </Link>
          ))}
          <Link href="/booking" style={{ display:"block", marginTop:14, padding:"12px 0", textAlign:"center", background:"linear-gradient(135deg,#F59E0B,#D97706)", borderRadius:12, color:"#000", fontWeight:700, fontSize:15, textDecoration:"none" }}>
            Book Now ✈️
          </Link>
        </div>
      )}

    </>
  )
}
