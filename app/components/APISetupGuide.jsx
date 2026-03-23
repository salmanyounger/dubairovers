"use client"
import { useState } from "react"

// ─── THEME ────────────────────────────────────────────────────────────────────
const C = {
  bg:     "#0A0C10",
  card:   "rgba(255,255,255,0.03)",
  card2:  "rgba(255,255,255,0.06)",
  border: "rgba(255,255,255,0.08)",
  text:   "#F1F5F9",
  sub:    "rgba(255,255,255,0.45)",
  green:  "#10B981",
  blue:   "#3B82F6",
  gold:   "#F59E0B",
  purple: "#8B5CF6",
  red:    "#EF4444",
}

// ─── SMALL HELPERS ────────────────────────────────────────────────────────────
function Tag({ label, color }) {
  const map = {
    free:     ["#10B98115","#10B98145","#10B981"],
    paid:     ["#EF444415","#EF444445","#F87171"],
    optional: ["#F59E0B15","#F59E0B45","#F59E0B"],
    info:     ["#3B82F615","#3B82F645","#60A5FA"],
  }
  const [bg, bd, tc] = map[color] || map.info
  return (
    <span style={{ background:bg, border:`1px solid ${bd}`, color:tc, borderRadius:20,
      padding:"3px 12px", fontSize:11, fontWeight:700, whiteSpace:"nowrap" }}>
      {label}
    </span>
  )
}

function CopyBtn({ text }) {
  const [ok, setOk] = useState(false)
  return (
    <button onClick={() => { navigator.clipboard?.writeText(text); setOk(true); setTimeout(()=>setOk(false),2000) }}
      style={{ background: ok?"#10B98120":"rgba(255,255,255,0.07)", border:`1px solid ${ok?"#10B981":"rgba(255,255,255,0.12)"}`,
        borderRadius:8, padding:"4px 12px", color:ok?"#10B981":C.sub, fontSize:12, cursor:"pointer", fontFamily:"inherit" }}>
      {ok ? "✅ Copied" : "📋 Copy"}
    </button>
  )
}

function Code({ code, lang="bash" }) {
  return (
    <div style={{ background:"#080D14", border:"1px solid rgba(255,255,255,0.08)", borderRadius:12, overflow:"hidden", marginTop:10 }}>
      <div style={{ display:"flex", justifyContent:"space-between", padding:"7px 14px",
        background:"rgba(255,255,255,0.04)", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        <span style={{ fontSize:11, color:C.sub, fontFamily:"monospace" }}>{lang}</span>
        <CopyBtn text={code} />
      </div>
      <pre style={{ margin:0, padding:"14px 16px", fontSize:12.5, lineHeight:1.75,
        color:"#A5F3FC", fontFamily:"'Fira Code','Courier New',monospace", overflowX:"auto", whiteSpace:"pre-wrap" }}>
        {code}
      </pre>
    </div>
  )
}

function InfoBox({ icon, title, children, color=C.blue }) {
  return (
    <div style={{ background:`${color}08`, border:`1px solid ${color}20`, borderRadius:12, padding:"14px 16px", marginTop:14 }}>
      <div style={{ display:"flex", gap:10 }}>
        <span style={{ fontSize:20, flexShrink:0 }}>{icon}</span>
        <div>
          {title && <div style={{ fontWeight:700, color:C.text, fontSize:14, marginBottom:5 }}>{title}</div>}
          <div style={{ fontSize:13, color:C.sub, lineHeight:1.75 }}>{children}</div>
        </div>
      </div>
    </div>
  )
}

function StatusDot({ ok }) {
  return (
    <div style={{ width:8, height:8, borderRadius:"50%", flexShrink:0,
      background: ok ? C.green : "rgba(255,255,255,0.15)",
      boxShadow: ok ? `0 0 6px ${C.green}` : "none" }} />
  )
}

// ─── KEY INPUT ROW ────────────────────────────────────────────────────────────
function KeyRow({ label, envKey, value, onChange, placeholder="Paste your key here", hint, secret=true }) {
  const [show, setShow] = useState(false)
  const filled = value && value.trim().length > 4
  return (
    <div style={{ marginBottom:14 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
        <label style={{ fontSize:12, fontWeight:700, color:C.sub, letterSpacing:"0.05em" }}>
          {label} <span style={{ color:"rgba(255,255,255,0.2)", fontWeight:400 }}>({envKey})</span>
        </label>
        <StatusDot ok={filled} />
      </div>
      <div style={{ display:"flex", gap:8 }}>
        <input
          type={secret && !show ? "password" : "text"}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ flex:1, background:"rgba(255,255,255,0.04)", border:`1px solid ${filled?"#10B98140":C.border}`,
            borderRadius:10, padding:"10px 14px", color:C.text, fontSize:13, outline:"none",
            fontFamily:"monospace", transition:"border 0.2s" }}
        />
        {secret && (
          <button onClick={()=>setShow(s=>!s)} style={{ background:"rgba(255,255,255,0.05)", border:`1px solid ${C.border}`,
            borderRadius:10, padding:"10px 14px", color:C.sub, cursor:"pointer", fontSize:13 }}>
            {show ? "🙈" : "👁️"}
          </button>
        )}
      </div>
      {hint && <div style={{ fontSize:11, color:C.sub, marginTop:5, paddingLeft:2 }}>{hint}</div>}
    </div>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function APISetupGuide() {
  const [tab,     setTab]     = useState("how")
  const [testing, setTesting] = useState({})
  const [results, setResults] = useState({})
  const [copied,  setCopied]  = useState(false)

  // Key state
  const [keys, setKeys] = useState({
    NEXT_PUBLIC_SEO_MODE:        "option1",
    NEXT_PUBLIC_SITE_URL:        "https://dubairovers.com",
    NEXT_PUBLIC_SITE_NAME:       "Dubai Rovers",
    GOOGLE_SC_CLIENT_ID:         "",
    GOOGLE_SC_CLIENT_SECRET:     "",
    GOOGLE_SC_REFRESH_TOKEN:     "",
    GOOGLE_SC_SITE_URL:          "https://dubairovers.com",
    GOOGLE_PAGESPEED_KEY:        "",
    DATAFORSEO_LOGIN:            "",
    DATAFORSEO_PASSWORD:         "",
    AHREFS_API_KEY:              "",
  })

  const setKey = (k, v) => setKeys(prev => ({ ...prev, [k]: v }))

  // ── Generate .env.local content ──────────────────────────────────────────
  const envContent = `# ════════════════════════════════════════════
# SEO PRO DASHBOARD — ENVIRONMENT VARIABLES
# Fill in your keys below and save this file
# ════════════════════════════════════════════

# DASHBOARD MODE
# option1 = Google APIs (real) + Demo data for paid features
# option2 = Free Google APIs only
# option3 = Google APIs + simulated paid data (for client demos)
# option4 = Everything real — Google + DataForSEO + Ahrefs
NEXT_PUBLIC_SEO_MODE=${keys.NEXT_PUBLIC_SEO_MODE}

# YOUR WEBSITE
NEXT_PUBLIC_SITE_URL=${keys.NEXT_PUBLIC_SITE_URL}
NEXT_PUBLIC_SITE_NAME=${keys.NEXT_PUBLIC_SITE_NAME}

# ── FREE: Google Search Console API ─────────────────────────
# Get from: console.cloud.google.com → Credentials → OAuth 2.0
GOOGLE_SC_CLIENT_ID=${keys.GOOGLE_SC_CLIENT_ID}
GOOGLE_SC_CLIENT_SECRET=${keys.GOOGLE_SC_CLIENT_SECRET}
GOOGLE_SC_REFRESH_TOKEN=${keys.GOOGLE_SC_REFRESH_TOKEN}
GOOGLE_SC_SITE_URL=${keys.GOOGLE_SC_SITE_URL}

# ── FREE: Google PageSpeed API ───────────────────────────────
# Get free key: developers.google.com/speed/docs/insights/v5/get-started
GOOGLE_PAGESPEED_KEY=${keys.GOOGLE_PAGESPEED_KEY}

# ── PAID: DataForSEO ($20-50/month) ─────────────────────────
# Get from: app.dataforseo.com → API Access
DATAFORSEO_LOGIN=${keys.DATAFORSEO_LOGIN}
DATAFORSEO_PASSWORD=${keys.DATAFORSEO_PASSWORD}

# ── PAID: Ahrefs ($99/month) ────────────────────────────────
# Get from: ahrefs.com → API → Generate key
AHREFS_API_KEY=${keys.AHREFS_API_KEY}
`

  // ── Test PageSpeed key ────────────────────────────────────────────────────
  const testPageSpeed = async () => {
    if (!keys.GOOGLE_PAGESPEED_KEY) return
    setTesting(t => ({...t, ps: true}))
    setResults(r => ({...r, ps: null}))
    try {
      const res  = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(keys.NEXT_PUBLIC_SITE_URL)}&key=${keys.GOOGLE_PAGESPEED_KEY}&strategy=mobile`)
      const data = await res.json()
      if (data.error) {
        setResults(r => ({...r, ps: { ok:false, msg: data.error.message }}))
      } else {
        const score = Math.round((data.lighthouseResult?.categories?.performance?.score||0)*100)
        setResults(r => ({...r, ps: { ok:true, msg:`✅ Connected! Performance score: ${score}/100` }}))
      }
    } catch(e) {
      setResults(r => ({...r, ps: { ok:false, msg:"Connection failed. Check your key." }}))
    } finally {
      setTesting(t => ({...t, ps: false}))
    }
  }

  const copyEnv = () => {
    navigator.clipboard?.writeText(envContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  // ── Connection status summary ─────────────────────────────────────────────
  const connections = [
    { name:"Search Console",  ok: !!(keys.GOOGLE_SC_CLIENT_ID && keys.GOOGLE_SC_REFRESH_TOKEN), free:true  },
    { name:"PageSpeed API",   ok: !!keys.GOOGLE_PAGESPEED_KEY,                                   free:true  },
    { name:"DataForSEO",      ok: !!(keys.DATAFORSEO_LOGIN && keys.DATAFORSEO_PASSWORD),          free:false },
    { name:"Ahrefs",          ok: !!keys.AHREFS_API_KEY,                                          free:false },
  ]
  const connected = connections.filter(c => c.ok).length

  const TABS = [
    { id:"how",    label:"🗺️  How It Works"      },
    { id:"free",   label:"🆓  Free APIs"          },
    { id:"paid",   label:"💰  Paid APIs"           },
    { id:"env",    label:"📄  Your .env.local"     },
    { id:"test",   label:"🧪  Test Connection"     },
  ]

  return (
    <div style={{ fontFamily:"system-ui,sans-serif", color:C.text, minHeight:"100%" }}>
      <style suppressHydrationWarning>{`*{box-sizing:border-box;} input::placeholder{color:rgba(255,255,255,0.25);}`}</style>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <div style={{ background:"linear-gradient(135deg,#0D1117 0%,#111827 100%)",
        border:`1px solid ${C.border}`, borderRadius:20, padding:28, marginBottom:22, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-60, right:-60, width:240, height:240, borderRadius:"50%",
          background:"radial-gradient(circle,rgba(16,185,129,0.08),transparent)", pointerEvents:"none" }} />

        <div style={{ display:"flex", alignItems:"flex-start", gap:18, marginBottom:22 }}>
          <div style={{ fontSize:48, lineHeight:1 }}>🔌</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:24, fontWeight:800 }}>API Connection Centre</div>
            <div style={{ fontSize:14, color:C.sub, marginTop:5, lineHeight:1.6 }}>
              Paste your keys in the form below → click <strong style={{color:C.text}}>Copy .env.local</strong> →
              save the file in your project → <strong style={{color:C.green}}>real data appears instantly.</strong>
            </div>
          </div>
          <div style={{ textAlign:"center", background:`${C.green}10`, border:`1px solid ${C.green}25`,
            borderRadius:14, padding:"12px 20px", minWidth:120 }}>
            <div style={{ fontSize:32, fontWeight:800, color:C.green }}>{connected}<span style={{fontSize:16,color:C.sub}}>/4</span></div>
            <div style={{ fontSize:11, color:C.sub, marginTop:3 }}>APIs Connected</div>
          </div>
        </div>

        {/* Connection status pills */}
        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
          {connections.map(c => (
            <div key={c.name} style={{ display:"flex", alignItems:"center", gap:7, padding:"6px 14px",
              background: c.ok ? "#10B98112" : "rgba(255,255,255,0.04)",
              border:`1px solid ${c.ok ? "#10B98130" : C.border}`, borderRadius:20 }}>
              <StatusDot ok={c.ok} />
              <span style={{ fontSize:12, color: c.ok ? C.green : C.sub, fontWeight: c.ok ? 700 : 400 }}>{c.name}</span>
              <Tag label={c.free ? "Free" : "Paid"} color={c.free ? "free" : "optional"} />
            </div>
          ))}
        </div>

        <InfoBox icon="⭐" color={C.gold}>
          <strong style={{color:C.text}}>You don't need any API keys to start.</strong> Your SEO Pro dashboard runs
          in demo mode with zero setup. Add keys one by one when ready — each one you add
          automatically replaces the demo data with real data for that section.
        </InfoBox>
      </div>

      {/* ── TABS ──────────────────────────────────────────────────────────── */}
      <div style={{ display:"flex", gap:6, marginBottom:20, flexWrap:"wrap" }}>
        {TABS.map(t => (
          <button key={t.id} onClick={()=>setTab(t.id)}
            style={{ background: tab===t.id ? "#10B98115":"rgba(255,255,255,0.04)",
              border:`1px solid ${tab===t.id?"#10B98140":C.border}`, borderRadius:10,
              padding:"9px 18px", color: tab===t.id ? C.green : C.sub,
              fontWeight: tab===t.id ? 700 : 400, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ── TAB: HOW IT WORKS ─────────────────────────────────────────────── */}
      {tab === "how" && (
        <div>
          {/* Big visual flow */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr auto 1fr auto 1fr",
            gap:0, alignItems:"center", marginBottom:28 }}>
            {[
              { icon:"📄", title:"Fill .env.local", sub:"Paste keys into the file in your project root" },
              null,
              { icon:"💾", title:"Save File", sub:"Next.js reads it automatically on restart" },
              null,
              { icon:"🔄", title:"Restart Server", sub:"npm run dev — takes 3 seconds" },
              null,
              { icon:"✅", title:"Real Data Loads", sub:"Dashboard shows live data automatically" },
            ].map((s, i) => s === null ? (
              <div key={i} style={{ textAlign:"center", color:"rgba(255,255,255,0.2)", fontSize:22 }}>→</div>
            ) : (
              <div key={i} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16,
                padding:"20px 16px", textAlign:"center" }}>
                <div style={{ fontSize:34, marginBottom:10 }}>{s.icon}</div>
                <div style={{ fontSize:14, fontWeight:700, color:C.text, marginBottom:6 }}>{s.title}</div>
                <div style={{ fontSize:12, color:C.sub, lineHeight:1.6 }}>{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Which key does what */}
          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, overflow:"hidden", marginBottom:20 }}>
            <div style={{ padding:"14px 20px", borderBottom:`1px solid ${C.border}`, fontWeight:700, fontSize:15 }}>
              📋 Which key controls which part of the dashboard?
            </div>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ background:C.card2 }}>
                  {["API Key","What Gets Real Data","Cost","Time to Get"].map(h => (
                    <th key={h} style={{ padding:"11px 18px", textAlign:"left", fontSize:11,
                      color:C.sub, fontWeight:700, textTransform:"uppercase" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["GOOGLE_PAGESPEED_KEY",  "Technical Audit — LCP, CLS, FCP, Performance Score",       "🆓 Free",  "2 min"],
                  ["GOOGLE_SC_CLIENT_ID +\nREFRESH_TOKEN", "Keywords, Rankings, Analytics, Overview stats", "🆓 Free",  "15 min"],
                  ["DATAFORSEO_LOGIN",      "Keyword Volume, KD, CPC, Competitor data",                  "💰 $20/mo","5 min"],
                  ["AHREFS_API_KEY",        "Domain Rating, real Backlinks, Referring Domains",          "💰 $99/mo","5 min"],
                ].map(([k, what, cost, time], i) => (
                  <tr key={i} style={{ borderTop:`1px solid ${C.border}` }}
                    onMouseEnter={e=>e.currentTarget.style.background=C.card2}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <td style={{ padding:"13px 18px", fontFamily:"monospace", color:"#A5F3FC", fontSize:12 }}>{k}</td>
                    <td style={{ padding:"13px 18px", color:C.text, fontSize:13 }}>{what}</td>
                    <td style={{ padding:"13px 18px" }}><Tag label={cost} color={cost.includes("Free")?"free":"paid"} /></td>
                    <td style={{ padding:"13px 18px", color:C.sub, fontSize:13 }}>{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <InfoBox icon="💡" title="Leave any key blank = demo data for that section" color={C.blue}>
            If you only add <code style={{color:"#A5F3FC"}}>GOOGLE_PAGESPEED_KEY</code>, only the Technical Audit section gets real data.
            Everything else stays in demo mode. <strong style={{color:C.text}}>Nothing breaks.</strong> You can add keys one at a time.
          </InfoBox>

          {/* Mode explanation */}
          <div style={{ marginTop:20 }}>
            <div style={{ fontSize:15, fontWeight:700, marginBottom:14 }}>🎛️ Dashboard Mode — pick one:</div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:12 }}>
              {[
                { mode:"option1", icon:"🔵", label:"Free + Demo",      color:C.blue,   cost:"$0/mo", desc:"Google APIs real + paid sections show demo. Best for your own site." },
                { mode:"option2", icon:"🟢", label:"Free Only",        color:C.green,  cost:"$0/mo", desc:"Only Google data. Paid sections are hidden (not shown to visitors)." },
                { mode:"option3", icon:"🟡", label:"Free + Demo Paid", color:C.gold,   cost:"$0/mo", desc:"Google APIs real + paid sections show impressive demo. Great for showing clients." },
                { mode:"option4", icon:"🟣", label:"Full Real",        color:C.purple, cost:"$20+/mo",desc:"Everything real. Use when you're charging clients for the SEO dashboard." },
              ].map(m => (
                <div key={m.mode} onClick={()=>setKey("NEXT_PUBLIC_SEO_MODE", m.mode)}
                  style={{ background:`${m.color}${keys.NEXT_PUBLIC_SEO_MODE===m.mode?"18":"08"}`,
                    border:`2px solid ${keys.NEXT_PUBLIC_SEO_MODE===m.mode ? m.color : C.border}`,
                    borderRadius:14, padding:16, cursor:"pointer", transition:"all 0.15s" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                    <span style={{ fontSize:20 }}>{m.icon}</span>
                    <Tag label={m.cost} color={m.cost==="$0/mo"?"free":"optional"} />
                  </div>
                  <div style={{ fontWeight:700, color: keys.NEXT_PUBLIC_SEO_MODE===m.mode ? m.color : C.text, marginBottom:6 }}>{m.label}</div>
                  <div style={{ fontSize:12, color:C.sub, lineHeight:1.6 }}>{m.desc}</div>
                  {keys.NEXT_PUBLIC_SEO_MODE===m.mode && (
                    <div style={{ marginTop:8, background:m.color, color:"#000", borderRadius:20,
                      padding:"2px 10px", fontSize:10, fontWeight:700, display:"inline-block" }}>✓ SELECTED</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: FREE APIs ────────────────────────────────────────────────── */}
      {tab === "free" && (
        <div>
          {/* PageSpeed */}
          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:18, overflow:"hidden", marginBottom:20 }}>
            <div style={{ padding:"18px 24px", background:"rgba(16,185,129,0.06)", borderBottom:`1px solid ${C.border}` }}>
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ width:48, height:48, borderRadius:14, background:"#10B98120",
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>⚡</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:17, fontWeight:800 }}>Google PageSpeed API</div>
                  <div style={{ fontSize:13, color:C.sub, marginTop:3 }}>Gives you: LCP · CLS · FCP · Performance Score · SEO Score</div>
                </div>
                <Tag label="✅ Free Forever" color="free" />
              </div>
            </div>
            <div style={{ padding:24 }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
                <div>
                  <div style={{ fontWeight:700, marginBottom:16, fontSize:15 }}>Step-by-step (2 minutes):</div>
                  {[
                    ["1", "Open this link", "developers.google.com/speed/docs/insights/v5/get-started",
                      "https://developers.google.com/speed/docs/insights/v5/get-started"],
                    ["2", "Click the blue button", "Get a Key", null],
                    ["3", "Select project", "Dubai Rovers SEO (or any name)", null],
                    ["4", "Copy the key", "it starts with AIzaSy...", null],
                    ["5", "Paste below", "and click Test", null],
                  ].map(([n, a, b, link]) => (
                    <div key={n} style={{ display:"flex", gap:12, marginBottom:12, alignItems:"flex-start" }}>
                      <div style={{ width:24, height:24, borderRadius:"50%", background:"#10B98120",
                        border:"1px solid #10B98140", display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:12, fontWeight:800, color:C.green, flexShrink:0, marginTop:1 }}>{n}</div>
                      <div style={{ fontSize:13 }}>
                        <span style={{ color:C.sub }}>{a} </span>
                        {link
                          ? <a href={link} target="_blank" rel="noopener noreferrer"
                              style={{ color:C.blue, fontWeight:600 }}>{b} ↗</a>
                          : <span style={{ color:C.text, fontWeight:600 }}>{b}</span>
                        }
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontWeight:700, marginBottom:12, fontSize:15 }}>Paste your key:</div>
                  <KeyRow
                    label="PageSpeed API Key"
                    envKey="GOOGLE_PAGESPEED_KEY"
                    value={keys.GOOGLE_PAGESPEED_KEY}
                    onChange={v => setKey("GOOGLE_PAGESPEED_KEY", v)}
                    placeholder="AIzaSyXXXXXXXXXXXXXXXXXXXXXXXX"
                  />
                  <button onClick={testPageSpeed} disabled={!keys.GOOGLE_PAGESPEED_KEY || testing.ps}
                    style={{ width:"100%", background: keys.GOOGLE_PAGESPEED_KEY
                      ? "linear-gradient(135deg,#10B981,#059669)" : "rgba(255,255,255,0.05)",
                      border:"none", borderRadius:12, padding:"11px", color: keys.GOOGLE_PAGESPEED_KEY?"#000":C.sub,
                      fontWeight:700, fontSize:14, cursor: keys.GOOGLE_PAGESPEED_KEY?"pointer":"not-allowed",
                      fontFamily:"inherit", marginBottom:10 }}>
                    {testing.ps ? "⏳ Testing..." : "🧪 Test This Key Now"}
                  </button>
                  {results.ps && (
                    <div style={{ padding:"10px 14px", borderRadius:10, fontSize:13, fontWeight:600,
                      background: results.ps.ok ? "#10B98115":"#EF444415",
                      border:`1px solid ${results.ps.ok?"#10B98140":"#EF444440"}`,
                      color: results.ps.ok ? C.green : "#F87171" }}>
                      {results.ps.msg}
                    </div>
                  )}
                  <InfoBox icon="✅" color={C.green}>
                    Once pasted here, click <strong style={{color:C.text}}>📄 Your .env.local</strong> tab above
                    and copy the file — your key is already filled in.
                  </InfoBox>
                </div>
              </div>
            </div>
          </div>

          {/* Search Console */}
          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:18, overflow:"hidden" }}>
            <div style={{ padding:"18px 24px", background:"rgba(59,130,246,0.06)", borderBottom:`1px solid ${C.border}` }}>
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ width:48, height:48, borderRadius:14, background:"#3B82F620",
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>🔍</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:17, fontWeight:800 }}>Google Search Console API</div>
                  <div style={{ fontSize:13, color:C.sub, marginTop:3 }}>Gives you: Real clicks · Impressions · CTR · Keyword positions</div>
                </div>
                <Tag label="✅ Free Forever" color="free" />
              </div>
            </div>
            <div style={{ padding:24 }}>
              <InfoBox icon="⏱️" title="Takes about 15 minutes — more steps than PageSpeed" color={C.blue}>
                Google Search Console uses OAuth (like a login). You need to create a project, enable the API,
                get credentials, and generate a refresh token. Each step is simple — just follow the steps below.
              </InfoBox>

              <div style={{ marginTop:20, display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
                <div>
                  {[
                    {n:"1", title:"Create Cloud Project", steps:[
                      ["Go to", "console.cloud.google.com", "https://console.cloud.google.com"],
                      ["Click", "Select project → New Project", null],
                      ["Name it", "Dubai Rovers SEO", null],
                      ["Click", "Create", null],
                    ]},
                    {n:"2", title:"Enable Search Console API", steps:[
                      ["Go to", "APIs & Services → Library", null],
                      ["Search", "Google Search Console API", null],
                      ["Click it", "then click Enable", null],
                    ]},
                    {n:"3", title:"Create OAuth Credentials", steps:[
                      ["Go to", "APIs & Services → Credentials", null],
                      ["Click", "Create Credentials → OAuth Client ID", null],
                      ["Type:", "Web Application", null],
                      ["Redirect URI:", "http://localhost:3003/api/auth/callback", null],
                      ["Click Create", "Download JSON file", null],
                    ]},
                    {n:"4", title:"Verify Site in Search Console", steps:[
                      ["Go to", "search.google.com/search-console", "https://search.google.com/search-console"],
                      ["Add property:", "https://dubairovers.com", null],
                      ["Verify via", "HTML file or DNS record", null],
                    ]},
                  ].map(section => (
                    <div key={section.n} style={{ marginBottom:20 }}>
                      <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:10 }}>
                        <div style={{ width:28, height:28, borderRadius:"50%", background:"#3B82F620",
                          border:"1px solid #3B82F640", display:"flex", alignItems:"center",
                          justifyContent:"center", fontSize:13, fontWeight:800, color:C.blue, flexShrink:0 }}>
                          {section.n}
                        </div>
                        <div style={{ fontWeight:700, color:C.text, fontSize:14 }}>{section.title}</div>
                      </div>
                      {section.steps.map(([a, b, link], i) => (
                        <div key={i} style={{ display:"flex", gap:8, marginBottom:7, paddingLeft:38, fontSize:13 }}>
                          <span style={{ color:C.sub, minWidth:80 }}>{a}</span>
                          {link
                            ? <a href={link} target="_blank" rel="noopener noreferrer"
                                style={{ color:C.blue, fontWeight:600 }}>{b} ↗</a>
                            : <span style={{ color:C.text, fontWeight:600 }}>{b}</span>
                          }
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div>
                  <div style={{ fontWeight:700, marginBottom:14, fontSize:15 }}>Paste your credentials:</div>
                  <KeyRow label="Client ID"      envKey="GOOGLE_SC_CLIENT_ID"     value={keys.GOOGLE_SC_CLIENT_ID}     onChange={v=>setKey("GOOGLE_SC_CLIENT_ID",v)}     placeholder="XXXXXXXXXX-XXXX.apps.googleusercontent.com" />
                  <KeyRow label="Client Secret"  envKey="GOOGLE_SC_CLIENT_SECRET" value={keys.GOOGLE_SC_CLIENT_SECRET} onChange={v=>setKey("GOOGLE_SC_CLIENT_SECRET",v)} placeholder="GOCSPX-XXXXXXXXXX" />
                  <KeyRow label="Refresh Token"  envKey="GOOGLE_SC_REFRESH_TOKEN" value={keys.GOOGLE_SC_REFRESH_TOKEN} onChange={v=>setKey("GOOGLE_SC_REFRESH_TOKEN",v)} placeholder="1//XXXXXXXXXXXXXXXXXX" />
                  <KeyRow label="Site URL"       envKey="GOOGLE_SC_SITE_URL"      value={keys.GOOGLE_SC_SITE_URL}      onChange={v=>setKey("GOOGLE_SC_SITE_URL",v)}      placeholder="https://dubairovers.com" secret={false} />

                  <InfoBox icon="❓" title="How to get the Refresh Token?" color={C.gold}>
                    After creating OAuth credentials, use the
                    <a href="https://developers.google.com/oauthplayground" target="_blank" rel="noopener noreferrer"
                      style={{ color:C.blue, marginLeft:4 }}>OAuth 2.0 Playground ↗</a>.
                    Select "Search Console API v3", authorize, then Exchange tokens.
                    Copy the <strong style={{color:C.text}}>refresh_token</strong> value.
                  </InfoBox>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: PAID APIs ────────────────────────────────────────────────── */}
      {tab === "paid" && (
        <div>
          <InfoBox icon="💡" title="Only needed for Option 4 (Full Real) mode" color={C.gold}>
            Paid APIs are for when you're <strong style={{color:C.text}}>selling the dashboard as a service to clients.</strong>
            For your own site, the free Google APIs give you everything you need.
            Start with free APIs — add paid ones when you have paying clients.
          </InfoBox>

          <div style={{ marginTop:20, display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
            {/* DataForSEO */}
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:18, overflow:"hidden" }}>
              <div style={{ padding:"16px 20px", background:"rgba(139,92,246,0.06)", borderBottom:`1px solid ${C.border}` }}>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <span style={{ fontSize:26 }}>📊</span>
                  <div>
                    <div style={{ fontSize:16, fontWeight:800 }}>DataForSEO</div>
                    <div style={{ fontSize:12, color:C.sub }}>Keywords · Volume · KD · CPC</div>
                  </div>
                  <Tag label="~$20–50/mo" color="optional" />
                </div>
              </div>
              <div style={{ padding:20 }}>
                {[
                  ["1", "Go to dataforseo.com", "https://dataforseo.com"],
                  ["2", "Sign up (pay as you go)", null],
                  ["3", "Dashboard → API Access", null],
                  ["4", "Copy email + password below", null],
                ].map(([n,b,link])=>(
                  <div key={n} style={{ display:"flex", gap:10, marginBottom:9, fontSize:13 }}>
                    <div style={{ width:22, height:22, borderRadius:"50%", background:"#8B5CF620",
                      border:"1px solid #8B5CF640", display:"flex", alignItems:"center",
                      justifyContent:"center", fontSize:11, fontWeight:800, color:C.purple, flexShrink:0 }}>{n}</div>
                    {link ? <a href={link} target="_blank" rel="noopener noreferrer" style={{color:C.blue,fontWeight:600}}>{b} ↗</a>
                           : <span style={{color:C.text}}>{b}</span>}
                  </div>
                ))}
                <div style={{ marginTop:16 }}>
                  <KeyRow label="Login (email)" envKey="DATAFORSEO_LOGIN"    value={keys.DATAFORSEO_LOGIN}    onChange={v=>setKey("DATAFORSEO_LOGIN",v)}    placeholder="your@email.com" secret={false} />
                  <KeyRow label="Password"      envKey="DATAFORSEO_PASSWORD" value={keys.DATAFORSEO_PASSWORD} onChange={v=>setKey("DATAFORSEO_PASSWORD",v)} placeholder="Your API password" />
                </div>
                <div style={{ marginTop:14 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:C.text, marginBottom:10 }}>📍 Location codes:</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
                    {[["🇦🇪","UAE","2784"],["🇬🇧","UK","2826"],["🇺🇸","USA","2840"],["🇮🇳","India","2356"],["🇸🇦","Saudi","2682"],["🇵🇰","Pakistan","2586"]].map(([f,c,code])=>(
                      <div key={c} style={{ display:"flex", justifyContent:"space-between", padding:"6px 10px",
                        background:C.card2, borderRadius:8, fontSize:12 }}>
                        <span>{f} {c}</span>
                        <span style={{ color:C.gold, fontWeight:700, fontFamily:"monospace" }}>{code}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Ahrefs */}
            <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:18, overflow:"hidden" }}>
              <div style={{ padding:"16px 20px", background:"rgba(239,68,68,0.06)", borderBottom:`1px solid ${C.border}` }}>
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <span style={{ fontSize:26 }}>🔗</span>
                  <div>
                    <div style={{ fontSize:16, fontWeight:800 }}>Ahrefs API</div>
                    <div style={{ fontSize:12, color:C.sub }}>Domain Rating · Backlinks · Referring Domains</div>
                  </div>
                  <Tag label="$99/mo" color="paid" />
                </div>
              </div>
              <div style={{ padding:20 }}>
                {[
                  ["1", "Go to ahrefs.com/api", "https://ahrefs.com/api"],
                  ["2", "Subscribe to API plan", null],
                  ["3", "Go to Settings → API Keys", null],
                  ["4", "Generate new key → copy it", null],
                ].map(([n,b,link])=>(
                  <div key={n} style={{ display:"flex", gap:10, marginBottom:9, fontSize:13 }}>
                    <div style={{ width:22, height:22, borderRadius:"50%", background:"#EF444420",
                      border:"1px solid #EF444440", display:"flex", alignItems:"center",
                      justifyContent:"center", fontSize:11, fontWeight:800, color:"#F87171", flexShrink:0 }}>{n}</div>
                    {link ? <a href={link} target="_blank" rel="noopener noreferrer" style={{color:C.blue,fontWeight:600}}>{b} ↗</a>
                           : <span style={{color:C.text}}>{b}</span>}
                  </div>
                ))}
                <div style={{ marginTop:16 }}>
                  <KeyRow label="Ahrefs API Key" envKey="AHREFS_API_KEY" value={keys.AHREFS_API_KEY} onChange={v=>setKey("AHREFS_API_KEY",v)} placeholder="ahrefs_api_XXXXXXXXXX" />
                </div>
                <InfoBox icon="💡" color={C.blue}>
                  Ahrefs API gives the most accurate backlink data available.
                  Only needed if you're building a full SEO agency dashboard for clients.
                </InfoBox>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB: ENV FILE ─────────────────────────────────────────────────── */}
      {tab === "env" && (
        <div>
          <InfoBox icon="📁" title="Where to put this file" color={C.gold}>
            Create a file called <code style={{color:"#A5F3FC",fontFamily:"monospace"}}>.env.local</code> in the
            <strong style={{color:C.text}}> root of your ROVERS folder</strong> — same level as package.json.
            This file is <strong style={{color:C.text}}>never uploaded to GitHub</strong> (it's in .gitignore automatically).
            For Vercel deployment, add these same keys in your Vercel project's Environment Variables settings.
          </InfoBox>

          <div style={{ background:"#080D14", border:"1px solid rgba(255,255,255,0.1)", borderRadius:16, overflow:"hidden", marginTop:16 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
              padding:"12px 20px", background:"rgba(255,255,255,0.04)", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
              <div>
                <span style={{ fontSize:14, fontWeight:700 }}>📄 .env.local</span>
                <span style={{ fontSize:11, color:C.sub, marginLeft:10 }}>ROVERS/.env.local</span>
              </div>
              <button onClick={copyEnv} style={{ background: copied ? "#10B98120":"rgba(255,255,255,0.08)",
                border:`1px solid ${copied?"#10B981":"rgba(255,255,255,0.15)"}`,
                borderRadius:10, padding:"8px 20px", color: copied ? C.green : C.sub,
                fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>
                {copied ? "✅ Copied!" : "📋 Copy Entire File"}
              </button>
            </div>
            <pre style={{ margin:0, padding:"20px", fontSize:12.5, lineHeight:2,
              fontFamily:"'Fira Code','Courier New',monospace", overflowX:"auto",
              color:C.sub }}>
              {envContent.split("\n").map((line, i) => {
                if (line.startsWith("#")) return <span key={i} style={{color:"#3a4a5c"}}>{line+"\n"}</span>
                if (line.includes("=")) {
                  const eqIdx = line.indexOf("=")
                  const k = line.slice(0,eqIdx)
                  const v = line.slice(eqIdx+1)
                  return (
                    <span key={i}>
                      <span style={{color:"#A5F3FC"}}>{k}</span>
                      <span style={{color:"#475569"}}>=</span>
                      <span style={{color: v ? "#FCD34D" : "#334155"}}>{v || "← paste your key here"}</span>
                      {"\n"}
                    </span>
                  )
                }
                return <span key={i}>{line+"\n"}</span>
              })}
            </pre>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14, marginTop:20 }}>
            {[
              {icon:"1️⃣", title:"Copy the file above",   sub:"Click the Copy button — the whole file is copied"},
              {icon:"2️⃣", title:"Create ROVERS/.env.local", sub:"Open your ROVERS project folder, create a new file called exactly .env.local"},
              {icon:"3️⃣", title:"Paste & Save",         sub:"Paste the content, save the file, then restart: npm run dev"},
            ].map(s=>(
              <div key={s.title} style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:14, padding:18 }}>
                <div style={{ fontSize:28, marginBottom:10 }}>{s.icon}</div>
                <div style={{ fontWeight:700, color:C.text, marginBottom:6, fontSize:14 }}>{s.title}</div>
                <div style={{ fontSize:13, color:C.sub, lineHeight:1.6 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB: TEST ─────────────────────────────────────────────────────── */}
      {tab === "test" && (
        <div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
            {connections.map(c=>(
              <div key={c.name} style={{ background:C.card, border:`2px solid ${c.ok ? "#10B98140" : C.border}`, borderRadius:16, padding:20 }}>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                  <StatusDot ok={c.ok} />
                  <div style={{ fontSize:16, fontWeight:700, color: c.ok ? C.green : C.text }}>{c.name}</div>
                  <Tag label={c.free?"Free":"Paid"} color={c.free?"free":"optional"} />
                </div>
                <div style={{ fontSize:13, color:C.sub, marginBottom:14 }}>
                  {c.ok ? "✅ Key is set — will use real data" : "⬜ No key yet — will show demo data"}
                </div>
                {c.name==="PageSpeed API" && c.ok && (
                  <button onClick={testPageSpeed} disabled={testing.ps}
                    style={{ width:"100%", background: testing.ps?"rgba(255,255,255,0.05)":"linear-gradient(135deg,#10B981,#059669)",
                      border:"none", borderRadius:10, padding:"10px", color: testing.ps ? C.sub : "#000",
                      fontWeight:700, cursor: testing.ps?"not-allowed":"pointer", fontFamily:"inherit" }}>
                    {testing.ps ? "⏳ Testing..." : "🧪 Test Now"}
                  </button>
                )}
                {c.name==="PageSpeed API" && results.ps && (
                  <div style={{ marginTop:10, padding:"10px 14px", borderRadius:10, fontSize:13, fontWeight:600,
                    background: results.ps.ok?"#10B98115":"#EF444415",
                    border:`1px solid ${results.ps.ok?"#10B98140":"#EF444440"}`,
                    color: results.ps.ok ? C.green : "#F87171" }}>
                    {results.ps.msg}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:16, padding:20 }}>
            <div style={{ fontWeight:700, fontSize:15, marginBottom:16 }}>🗺️ What happens when you add each key</div>
            {[
              { key:"GOOGLE_PAGESPEED_KEY",  section:"Technical Audit", before:"Demo scores (73/100)", after:"Your real score, real LCP/CLS/FCP from Google", added:!!keys.GOOGLE_PAGESPEED_KEY },
              { key:"GOOGLE_SC_* keys",      section:"Keywords, Rankings, Analytics, Overview", before:"Demo keywords (desert safari, dhow cruise...)", after:"Your actual ranking keywords from Google Search Console", added:!!(keys.GOOGLE_SC_CLIENT_ID&&keys.GOOGLE_SC_REFRESH_TOKEN) },
              { key:"DATAFORSEO_LOGIN",       section:"Keyword Volume, KD, CPC, Competitors", before:"Demo data (18,200 volume, KD 42...)", after:"Real search volumes, difficulty, CPC from DataForSEO", added:!!(keys.DATAFORSEO_LOGIN&&keys.DATAFORSEO_PASSWORD) },
              { key:"AHREFS_API_KEY",         section:"Backlinks, Domain Rating", before:"Demo backlinks (tripadvisor.com, expedia...)", after:"Your real backlinks and Domain Rating from Ahrefs", added:!!keys.AHREFS_API_KEY },
            ].map((row,i)=>(
              <div key={i} style={{ display:"grid", gridTemplateColumns:"180px 1fr 1fr auto", gap:14, alignItems:"center",
                padding:"13px 0", borderBottom:i<3?`1px solid ${C.border}`:"none" }}>
                <div style={{ fontFamily:"monospace", color:"#A5F3FC", fontSize:11 }}>{row.key}</div>
                <div style={{ fontSize:12, color:C.sub }}>
                  <div style={{ color:C.text, fontWeight:600, marginBottom:3 }}>{row.section}</div>
                  Before: {row.before}
                </div>
                <div style={{ fontSize:12, color:C.green }}>
                  <div style={{ fontWeight:600, marginBottom:3 }}>After:</div>{row.after}
                </div>
                <div style={{ padding:"4px 12px", background: row.added?"#10B98115":"rgba(255,255,255,0.05)",
                  border:`1px solid ${row.added?"#10B98130":C.border}`, borderRadius:20,
                  color: row.added ? C.green : C.sub, fontSize:11, fontWeight:700, whiteSpace:"nowrap" }}>
                  {row.added ? "✅ Set" : "⬜ Not set"}
                </div>
              </div>
            ))}
          </div>

          <InfoBox icon="🔄" title="After adding keys — always restart the dev server" color={C.blue}>
            <code style={{color:"#A5F3FC"}}>Ctrl + C</code> to stop,
            then <code style={{color:"#A5F3FC"}}>npm run dev</code> to restart.
            Next.js reads .env.local only on startup — changes don't apply until you restart.
          </InfoBox>
        </div>
      )}
    </div>
  )
}
