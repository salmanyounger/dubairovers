"use client"
import { useState, useEffect } from "react"

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

const B = (ex={}) => ({
  background: C.card, border: `1px solid ${C.border}`,
  borderRadius: 14, padding: "18px 20px", ...ex
})

const pages = [
  { url:"/tours",                       title:"Dubai Rovers — Best Tours in Dubai",         kw:"dubai tours",          pos:4,  prev:7,  clicks:1240, imp:18200, ctr:"6.8%", speed:94 },
  { url:"/desert-safari-dubai",         title:"Desert Safari Dubai | DubaiRovers",          kw:"desert safari dubai",  pos:3,  prev:5,  clicks:890,  imp:12400, ctr:"7.2%", speed:96 },
  { url:"/hot-air-balloon-dubai",       title:"Hot Air Balloon Dubai | DubaiRovers",        kw:"hot air balloon dubai",pos:6,  prev:9,  clicks:420,  imp:8800,  ctr:"4.8%", speed:95 },
  { url:"/dhow-cruise-dubai",           title:"Dhow Cruise Dubai | DubaiRovers",            kw:"dhow cruise dubai",    pos:5,  prev:8,  clicks:380,  imp:7200,  ctr:"5.3%", speed:93 },
  { url:"/quad-bike-dubai",             title:"Quad Bike Dubai | DubaiRovers",              kw:"quad bike dubai",      pos:8,  prev:11, clicks:290,  imp:6100,  ctr:"4.8%", speed:97 },
  { url:"/camel-riding-dubai",          title:"Camel Riding Dubai | DubaiRovers",           kw:"camel riding dubai",   pos:7,  prev:10, clicks:210,  imp:4800,  ctr:"4.4%", speed:95 },
  { url:"/private-city-tour-dubai",     title:"Private City Tour Dubai | DubaiRovers",      kw:"city tour dubai",      pos:9,  prev:12, clicks:180,  imp:4200,  ctr:"4.3%", speed:94 },
  { url:"/blog",                        title:"Dubai Travel Blog | DubaiRovers",             kw:"dubai travel blog",    pos:12, prev:15, clicks:340,  imp:9800,  ctr:"3.5%", speed:91 },
]

const keywords = [
  { kw:"desert safari dubai",         vol:"12,400/mo", diff:42, pos:3,  trend:"up",   intent:"transactional" },
  { kw:"dubai desert safari price",   vol:"8,200/mo",  diff:38, pos:6,  trend:"up",   intent:"transactional" },
  { kw:"hot air balloon dubai",       vol:"9,800/mo",  diff:45, pos:6,  trend:"up",   intent:"transactional" },
  { kw:"dhow cruise dubai marina",    vol:"6,100/mo",  diff:35, pos:5,  trend:"same", intent:"transactional" },
  { kw:"things to do in dubai",       vol:"33,000/mo", diff:68, pos:18, trend:"up",   intent:"informational" },
  { kw:"quad biking dubai",           vol:"4,400/mo",  diff:32, pos:8,  trend:"up",   intent:"transactional" },
  { kw:"camel riding dubai price",    vol:"2,900/mo",  diff:28, pos:7,  trend:"same", intent:"transactional" },
  { kw:"dubai city tour private",     vol:"3,200/mo",  diff:41, pos:9,  trend:"down", intent:"transactional" },
  { kw:"best tours in dubai",         vol:"18,000/mo", diff:55, pos:12, trend:"up",   intent:"informational" },
  { kw:"dubai adventure activities",  vol:"7,600/mo",  diff:48, pos:15, trend:"up",   intent:"informational" },
  { kw:"evening desert safari dubai", vol:"5,400/mo",  diff:39, pos:4,  trend:"up",   intent:"transactional" },
  { kw:"dubai balloon ride price",    vol:"3,800/mo",  diff:33, pos:7,  trend:"up",   intent:"transactional" },
]

const backlinks = [
  { domain:"tripadvisor.com",     da:93, type:"Editorial",  anchor:"desert safari dubai",   status:"active", date:"2024-12" },
  { domain:"timeout.com",         da:88, type:"Editorial",  anchor:"Dubai Rovers",           status:"active", date:"2024-11" },
  { domain:"visitdubai.com",      da:84, type:"Directory",  anchor:"desert safari",          status:"active", date:"2024-10" },
  { domain:"reddit.com",          da:91, type:"Forum",      anchor:"best desert safari",     status:"active", date:"2025-01" },
  { domain:"expedia.com",         da:90, type:"Partner",    anchor:"Dubai tours",            status:"active", date:"2024-09" },
  { domain:"viator.com",          da:87, type:"Partner",    anchor:"desert safari dubai",    status:"active", date:"2024-08" },
  { domain:"lonelyplanet.com",    da:86, type:"Editorial",  anchor:"Dubai adventures",       status:"active", date:"2024-07" },
  { domain:"booking.com",         da:92, type:"Partner",    anchor:"DubaiRovers.com",        status:"active", date:"2024-06" },
]

const technicalChecks = [
  { item:"HTTPS / SSL Certificate",        status:"pass",    detail:"Valid until Dec 2026" },
  { item:"XML Sitemap",                     status:"pass",    detail:"/sitemap.xml · 24 URLs indexed" },
  { item:"Robots.txt",                      status:"pass",    detail:"All pages crawlable" },
  { item:"Core Web Vitals — LCP",           status:"pass",    detail:"1.8s (Good < 2.5s)" },
  { item:"Core Web Vitals — FID",           status:"pass",    detail:"12ms (Good < 100ms)" },
  { item:"Core Web Vitals — CLS",           status:"pass",    detail:"0.04 (Good < 0.1)" },
  { item:"Mobile Friendly",                 status:"pass",    detail:"Passed Google Mobile Test" },
  { item:"Canonical Tags",                  status:"pass",    detail:"All pages have canonical" },
  { item:"Open Graph Tags",                 status:"warning", detail:"Missing on 3 blog posts" },
  { item:"Twitter Card Tags",               status:"warning", detail:"Missing on 5 pages" },
  { item:"Schema Markup — TouristTrip",     status:"pass",    detail:"All 6 tour pages" },
  { item:"Schema Markup — Article",         status:"warning", detail:"Missing on blog posts" },
  { item:"Schema Markup — FAQ",             status:"pass",    detail:"All tour pages" },
  { item:"Image Alt Text",                  status:"warning", detail:"8 images missing alt text" },
  { item:"Page Speed — Desktop",            status:"pass",    detail:"94/100 avg score" },
  { item:"Page Speed — Mobile",             status:"warning", detail:"72/100 avg — needs work" },
  { item:"Structured Data Errors",          status:"pass",    detail:"0 errors in Rich Results" },
  { item:"404 Broken Links",                status:"pass",    detail:"0 broken internal links" },
]

const competitors = [
  { name:"Arabian Adventures", domain:"arabian-adventures.com", da:62, kw:340,  traffic:"45K",  topKw:"desert safari dubai" },
  { name:"Desert Safari Dubai", domain:"desertsafaridubai.ae",  da:48, kw:180,  traffic:"28K",  topKw:"desert safari dubai" },
  { name:"Platinum Heritage",   domain:"platinum-heritage.com", da:55, kw:220,  traffic:"32K",  topKw:"hot air balloon dubai" },
  { name:"Big Bus Dubai",        domain:"bigbustours.com",       da:74, kw:890,  traffic:"120K", topKw:"dubai city tour" },
  { name:"Viator Dubai",         domain:"viator.com/dubai",      da:90, kw:4200, traffic:"980K", topKw:"things to do dubai" },
]

const issues = [
  { priority:"high",   type:"Missing Meta",    page:"/blog/best-restaurants-dubai",    fix:"Add title & description tags" },
  { priority:"high",   type:"No OG Image",     page:"/blog/dubai-nightlife-guide",     fix:"Add og:image for social sharing" },
  { priority:"medium", type:"Thin Content",    page:"/attractions",                    fix:"Add 500+ words of unique content" },
  { priority:"medium", type:"Missing Alt",     page:"/desert-safari-dubai (3 images)", fix:"Add descriptive alt text to images" },
  { priority:"medium", type:"Slow Mobile",     page:"/blog (index)",                   fix:"Compress images, lazy load" },
  { priority:"low",    type:"No Twitter Card", page:"5 blog posts",                    fix:"Add twitter:card meta tags" },
]

function Badge({ text, color }) {
  const bg = color==="green"?C.green:color==="red"?C.red:color==="gold"?C.gold:color==="blue"?C.blue:C.purple
  return <span style={{ background:`${bg}22`, color:bg, border:`1px solid ${bg}44`, borderRadius:6, padding:"2px 8px", fontSize:11, fontWeight:700 }}>{text}</span>
}

function Stat({ icon, label, value, sub, color=C.gold }) {
  return (
    <div style={{ ...B(), display:"flex", flexDirection:"column", gap:4 }}>
      <div style={{ fontSize:11, color:C.sub, textTransform:"uppercase", letterSpacing:"0.08em" }}>{icon} {label}</div>
      <div style={{ fontSize:28, fontWeight:800, color }}>{value}</div>
      {sub && <div style={{ fontSize:12, color:C.sub }}>{sub}</div>}
    </div>
  )
}

function TrendArrow({ trend }) {
  if (trend==="up")   return <span style={{ color:C.green,  fontWeight:700 }}>▲</span>
  if (trend==="down") return <span style={{ color:C.red,    fontWeight:700 }}>▼</span>
  return                      <span style={{ color:C.sub,   fontWeight:700 }}>—</span>
}

function ProgressBar({ val, max=100, color=C.gold }) {
  return (
    <div style={{ height:5, background:"rgba(255,255,255,0.07)", borderRadius:3, overflow:"hidden", flex:1 }}>
      <div style={{ height:"100%", width:`${(val/max)*100}%`, background:color, borderRadius:3, transition:"width 0.8s ease" }}/>
    </div>
  )
}

export default function SEOProDashboard() {
  const [tab, setTab] = useState("overview")
  const [notif, setNotif] = useState(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const toast = (msg) => { setNotif(msg); setTimeout(()=>setNotif(null), 3000) }

  const TABS = [
    { id:"overview",    label:"📊 Overview"    },
    { id:"pages",       label:"📄 Pages"       },
    { id:"keywords",    label:"🔑 Keywords"    },
    { id:"backlinks",   label:"🔗 Backlinks"   },
    { id:"technical",   label:"🔧 Technical"   },
    { id:"competitors", label:"⚔️ Competitors" },
    { id:"issues",      label:"⚠️ Issues"      },
  ]

  const totalClicks = pages.reduce((a,p)=>a+p.clicks,0)
  const totalImpr   = pages.reduce((a,p)=>a+p.imp,0)
  const avgCTR      = (totalClicks/totalImpr*100).toFixed(1)
  const avgPos      = (pages.reduce((a,p)=>a+p.pos,0)/pages.length).toFixed(1)
  const passCount   = technicalChecks.filter(t=>t.status==="pass").length
  const warnCount   = technicalChecks.filter(t=>t.status==="warning").length

  return (
    <div style={{ minHeight:"100vh", background:C.bg, color:C.text, fontFamily:"'Outfit',sans-serif", padding:"28px 32px" }}>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
        * { box-sizing:border-box; }
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:rgba(245,158,11,0.3);border-radius:10px}
        .seo-tab:hover{background:rgba(255,255,255,0.06)!important}
        .seo-row:hover{background:rgba(255,255,255,0.03)!important}
        @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        .seo-fade{animation:fadeIn 0.3s ease}
      `}</style>

      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:28 }}>
        <div>
          <div style={{ fontSize:26, fontWeight:800, marginBottom:4 }}>🚀 SEO Pro Dashboard</div>
          <div style={{ fontSize:13, color:C.sub }}>DubaiRovers.com · Real-time SEO intelligence & optimization</div>
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <button onClick={()=>toast("✅ SEO audit running — results in 30 seconds!")}
            style={{ background:`${C.gold}22`, border:`1px solid ${C.gold}44`, borderRadius:10, padding:"9px 18px", color:C.gold, fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
            🔍 Run Full Audit
          </button>
          <button onClick={()=>toast("📋 SEO report copied to clipboard!")}
            style={{ background:C.card, border:`1px solid ${C.border}`, borderRadius:10, padding:"9px 18px", color:C.sub, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"inherit" }}>
            📋 Export Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", gap:4, marginBottom:24, background:C.card, border:`1px solid ${C.border}`, borderRadius:12, padding:4 }}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} className="seo-tab"
            style={{ flex:1, padding:"8px 6px", borderRadius:9, border:"none", background:tab===t.id?C.gold:"transparent", color:tab===t.id?"#000":C.sub, fontSize:12, fontWeight:tab===t.id?800:500, cursor:"pointer", fontFamily:"inherit", transition:"all 0.18s", whiteSpace:"nowrap" }}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="seo-fade" key={tab}>

        {/* ── OVERVIEW ── */}
        {tab==="overview" && (
          <div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:24 }}>
              <Stat icon="👆" label="Total Clicks"    value={totalClicks.toLocaleString()} sub="Last 90 days"   color={C.gold}   />
              <Stat icon="👁️" label="Impressions"    value={(totalImpr/1000).toFixed(1)+"K"} sub="Search views" color={C.blue}   />
              <Stat icon="📊" label="Avg CTR"         value={avgCTR+"%"}                   sub="Click rate"      color={C.green}  />
              <Stat icon="🏆" label="Avg Position"    value={"#"+avgPos}                   sub="Google ranking"  color={C.purple} />
            </div>

            {/* Health score */}
            <div style={{ ...B(), marginBottom:24 }}>
              <div style={{ fontSize:15, fontWeight:700, marginBottom:16 }}>🏥 SEO Health Score</div>
              <div style={{ display:"flex", alignItems:"center", gap:24 }}>
                <div style={{ position:"relative", width:110, height:110, flexShrink:0 }}>
                  <svg viewBox="0 0 110 110" style={{ transform:"rotate(-90deg)" }}>
                    <circle cx="55" cy="55" r="48" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="10"/>
                    <circle cx="55" cy="55" r="48" fill="none" stroke={C.green} strokeWidth="10" strokeDasharray={`${(passCount/(passCount+warnCount))*301} 301`} strokeLinecap="round"/>
                  </svg>
                  <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                    <div style={{ fontSize:24, fontWeight:800, color:C.green }}>{Math.round((passCount/(passCount+warnCount))*100)}</div>
                    <div style={{ fontSize:10, color:C.sub }}>/ 100</div>
                  </div>
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                    {[
                      { label:"✅ Checks Passed",  val:passCount,  color:C.green  },
                      { label:"⚠️ Warnings",        val:warnCount,  color:C.gold   },
                      { label:"🔑 Keywords Tracked",val:keywords.length, color:C.blue },
                      { label:"🔗 Backlinks",       val:backlinks.length, color:C.purple },
                    ].map(s=>(
                      <div key={s.label} style={{ background:"rgba(255,255,255,0.03)", borderRadius:10, padding:"10px 14px" }}>
                        <div style={{ fontSize:11, color:C.sub, marginBottom:3 }}>{s.label}</div>
                        <div style={{ fontSize:22, fontWeight:800, color:s.color }}>{s.val}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Top pages */}
            <div style={{ ...B() }}>
              <div style={{ fontSize:15, fontWeight:700, marginBottom:14 }}>📈 Top Performing Pages</div>
              {pages.slice(0,5).map((p,i)=>(
                <div key={p.url} className="seo-row" style={{ display:"flex", alignItems:"center", gap:14, padding:"10px 8px", borderRadius:8, borderBottom:i<4?`1px solid ${C.border}`:"none" }}>
                  <div style={{ fontSize:16, fontWeight:800, color:C.sub, width:20, textAlign:"center" }}>{i+1}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:C.text, marginBottom:2 }}>{p.title}</div>
                    <div style={{ fontSize:11, color:C.sub }}>{p.url}</div>
                  </div>
                  <div style={{ textAlign:"right", minWidth:80 }}>
                    <div style={{ fontSize:14, fontWeight:700, color:C.gold }}>{p.clicks.toLocaleString()}</div>
                    <div style={{ fontSize:10, color:C.sub }}>clicks</div>
                  </div>
                  <div style={{ textAlign:"right", minWidth:60 }}>
                    <div style={{ fontSize:14, fontWeight:700, color:C.blue }}>#{p.pos}</div>
                    <div style={{ fontSize:10, color:p.pos<p.prev?C.green:C.red }}>{p.pos<p.prev?"↑ up":"↓ down"}</div>
                  </div>
                  <ProgressBar val={p.speed} color={p.speed>=90?C.green:C.gold} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── PAGES ── */}
        {tab==="pages" && (
          <div style={{ ...B({ padding:0, overflow:"hidden" }) }}>
            <div style={{ padding:"16px 20px", borderBottom:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ fontSize:15, fontWeight:700 }}>📄 All Pages SEO Status</div>
              <Badge text={`${pages.length} pages tracked`} color="gold"/>
            </div>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ background:"rgba(255,255,255,0.03)" }}>
                  {["URL","Meta Title","Focus KW","Clicks","Impr","CTR","Position","Speed"].map(h=>(
                    <th key={h} style={{ padding:"10px 16px", fontSize:11, color:C.sub, fontWeight:600, textAlign:"left", textTransform:"uppercase", letterSpacing:"0.06em", borderBottom:`1px solid ${C.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pages.map((p,i)=>(
                  <tr key={p.url} className="seo-row" style={{ borderBottom: i<pages.length-1?`1px solid ${C.border}`:"none" }}>
                    <td style={{ padding:"12px 16px", fontSize:12, color:C.blue, fontWeight:600 }}>{p.url}</td>
                    <td style={{ padding:"12px 16px", fontSize:12, color:C.text, maxWidth:200 }}>
                      <div style={{ overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.title}</div>
                    </td>
                    <td style={{ padding:"12px 16px", fontSize:12, color:C.sub }}>{p.kw}</td>
                    <td style={{ padding:"12px 16px", fontSize:13, fontWeight:700, color:C.gold }}>{p.clicks.toLocaleString()}</td>
                    <td style={{ padding:"12px 16px", fontSize:13, color:C.sub }}>{p.imp.toLocaleString()}</td>
                    <td style={{ padding:"12px 16px", fontSize:13, color:C.green }}>{p.ctr}</td>
                    <td style={{ padding:"12px 16px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                        <span style={{ fontSize:14, fontWeight:700, color:p.pos<=5?C.green:p.pos<=10?C.gold:C.red }}>#{p.pos}</span>
                        <span style={{ fontSize:10, color:p.pos<p.prev?C.green:C.red }}>{p.pos<p.prev?"▲":"▼"} {Math.abs(p.pos-p.prev)}</span>
                      </div>
                    </td>
                    <td style={{ padding:"12px 16px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <span style={{ fontSize:12, fontWeight:700, color:p.speed>=90?C.green:C.gold }}>{p.speed}</span>
                        <ProgressBar val={p.speed} color={p.speed>=90?C.green:C.gold}/>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── KEYWORDS ── */}
        {tab==="keywords" && (
          <div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:24 }}>
              <Stat icon="🔑" label="Keywords Tracked"  value={keywords.length}  color={C.gold}  />
              <Stat icon="🏆" label="Top 3 Rankings"    value={keywords.filter(k=>k.pos<=3).length} sub="keywords in top 3" color={C.green} />
              <Stat icon="📈" label="Trending Up"       value={keywords.filter(k=>k.trend==="up").length} sub="improving positions" color={C.blue} />
            </div>
            <div style={{ ...B({ padding:0, overflow:"hidden" }) }}>
              <div style={{ padding:"16px 20px", borderBottom:`1px solid ${C.border}` }}>
                <div style={{ fontSize:15, fontWeight:700 }}>🔑 Keyword Rankings</div>
              </div>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr style={{ background:"rgba(255,255,255,0.03)" }}>
                    {["Keyword","Volume","Difficulty","Position","Trend","Intent"].map(h=>(
                      <th key={h} style={{ padding:"10px 16px", fontSize:11, color:C.sub, fontWeight:600, textAlign:"left", textTransform:"uppercase", letterSpacing:"0.06em", borderBottom:`1px solid ${C.border}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {keywords.map((k,i)=>(
                    <tr key={k.kw} className="seo-row" style={{ borderBottom: i<keywords.length-1?`1px solid ${C.border}`:"none" }}>
                      <td style={{ padding:"11px 16px", fontSize:13, fontWeight:600, color:C.text }}>{k.kw}</td>
                      <td style={{ padding:"11px 16px", fontSize:12, color:C.gold, fontWeight:700 }}>{k.vol}</td>
                      <td style={{ padding:"11px 16px" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                          <ProgressBar val={k.diff} color={k.diff<40?C.green:k.diff<60?C.gold:C.red}/>
                          <span style={{ fontSize:12, color:C.sub, minWidth:24 }}>{k.diff}</span>
                        </div>
                      </td>
                      <td style={{ padding:"11px 16px" }}>
                        <span style={{ fontSize:14, fontWeight:800, color:k.pos<=3?C.green:k.pos<=10?C.gold:C.red }}>#{k.pos}</span>
                      </td>
                      <td style={{ padding:"11px 16px" }}><TrendArrow trend={k.trend}/></td>
                      <td style={{ padding:"11px 16px" }}>
                        <Badge text={k.intent} color={k.intent==="transactional"?"green":"blue"}/>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── BACKLINKS ── */}
        {tab==="backlinks" && (
          <div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:24 }}>
              <Stat icon="🔗" label="Total Backlinks"  value={backlinks.length}  color={C.blue}   />
              <Stat icon="💪" label="Avg Domain Auth." value="81"                sub="out of 100" color={C.gold}   />
              <Stat icon="✅" label="Active Links"     value={backlinks.filter(b=>b.status==="active").length} color={C.green} />
            </div>
            <div style={{ ...B({ padding:0, overflow:"hidden" }) }}>
              <div style={{ padding:"16px 20px", borderBottom:`1px solid ${C.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div style={{ fontSize:15, fontWeight:700 }}>🔗 Backlink Profile</div>
                <button onClick={()=>toast("🔍 Scanning for new backlinks...")}
                  style={{ background:`${C.blue}22`, border:`1px solid ${C.blue}44`, borderRadius:8, padding:"6px 14px", color:C.blue, fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                  + Scan New
                </button>
              </div>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr style={{ background:"rgba(255,255,255,0.03)" }}>
                    {["Source Domain","DA","Type","Anchor Text","Status","Date"].map(h=>(
                      <th key={h} style={{ padding:"10px 16px", fontSize:11, color:C.sub, fontWeight:600, textAlign:"left", textTransform:"uppercase", letterSpacing:"0.06em", borderBottom:`1px solid ${C.border}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {backlinks.map((b,i)=>(
                    <tr key={b.domain} className="seo-row" style={{ borderBottom: i<backlinks.length-1?`1px solid ${C.border}`:"none" }}>
                      <td style={{ padding:"11px 16px", fontSize:13, fontWeight:700, color:C.blue }}>{b.domain}</td>
                      <td style={{ padding:"11px 16px" }}>
                        <span style={{ fontSize:13, fontWeight:800, color:b.da>=80?C.green:b.da>=60?C.gold:C.red }}>{b.da}</span>
                      </td>
                      <td style={{ padding:"11px 16px" }}><Badge text={b.type} color="blue"/></td>
                      <td style={{ padding:"11px 16px", fontSize:12, color:C.sub, fontStyle:"italic" }}>&ldquo;{b.anchor}&rdquo;</td>
                      <td style={{ padding:"11px 16px" }}><Badge text={b.status} color="green"/></td>
                      <td style={{ padding:"11px 16px", fontSize:12, color:C.sub }}>{b.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── TECHNICAL ── */}
        {tab==="technical" && (
          <div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:24 }}>
              <Stat icon="✅" label="Checks Passed" value={passCount}  sub={`out of ${technicalChecks.length}`} color={C.green}  />
              <Stat icon="⚠️" label="Warnings"      value={warnCount}  sub="need attention"                    color={C.gold}   />
              <Stat icon="🚀" label="Health Score"  value={Math.round((passCount/technicalChecks.length)*100)+"%"} color={C.blue} />
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {technicalChecks.map((c,i)=>(
                <div key={i} style={{ ...B({ padding:"14px 18px", display:"flex", alignItems:"center", gap:16 }) }}>
                  <div style={{ fontSize:20, flexShrink:0 }}>{c.status==="pass"?"✅":"⚠️"}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:C.text }}>{c.item}</div>
                    <div style={{ fontSize:11, color:C.sub, marginTop:2 }}>{c.detail}</div>
                  </div>
                  <Badge text={c.status==="pass"?"PASS":"WARNING"} color={c.status==="pass"?"green":"gold"}/>
                  {c.status==="warning" && (
                    <button onClick={()=>toast(`✅ Auto-fixing: ${c.item}`)}
                      style={{ background:`${C.gold}22`, border:`1px solid ${C.gold}44`, borderRadius:7, padding:"5px 12px", color:C.gold, fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"inherit", flexShrink:0 }}>
                      Auto Fix →
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── COMPETITORS ── */}
        {tab==="competitors" && (
          <div>
            <div style={{ ...B({ marginBottom:24 }) }}>
              <div style={{ fontSize:15, fontWeight:700, marginBottom:16 }}>⚔️ Competitor Comparison</div>
              <div style={{ overflowX:"auto" }}>
                <table style={{ width:"100%", borderCollapse:"collapse" }}>
                  <thead>
                    <tr>
                      {["Competitor","Domain","DA Score","Keywords","Est. Traffic","Top Keyword"].map(h=>(
                        <th key={h} style={{ padding:"10px 14px", fontSize:11, color:C.sub, fontWeight:600, textAlign:"left", textTransform:"uppercase", letterSpacing:"0.06em", borderBottom:`1px solid ${C.border}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* You */}
                    <tr style={{ background:`${C.gold}0a` }}>
                      <td style={{ padding:"12px 14px", fontSize:13, fontWeight:800, color:C.gold }}>🏆 DubaiRovers (You)</td>
                      <td style={{ padding:"12px 14px", fontSize:12, color:C.blue }}>dubairovers.com</td>
                      <td style={{ padding:"12px 14px" }}><span style={{ fontSize:14, fontWeight:800, color:C.gold }}>58</span></td>
                      <td style={{ padding:"12px 14px", fontSize:13, color:C.text }}>156</td>
                      <td style={{ padding:"12px 14px", fontSize:13, color:C.green, fontWeight:700 }}>18K</td>
                      <td style={{ padding:"12px 14px", fontSize:12, color:C.sub }}>desert safari dubai</td>
                    </tr>
                    {competitors.map((c,i)=>(
                      <tr key={c.domain} className="seo-row" style={{ borderBottom: i<competitors.length-1?`1px solid ${C.border}`:"none" }}>
                        <td style={{ padding:"12px 14px", fontSize:13, fontWeight:600, color:C.text }}>{c.name}</td>
                        <td style={{ padding:"12px 14px", fontSize:12, color:C.sub }}>{c.domain}</td>
                        <td style={{ padding:"12px 14px" }}>
                          <span style={{ fontSize:14, fontWeight:800, color:c.da>58?C.red:c.da<58?C.green:C.gold }}>{c.da}</span>
                        </td>
                        <td style={{ padding:"12px 14px", fontSize:13, color:C.text }}>{c.kw.toLocaleString()}</td>
                        <td style={{ padding:"12px 14px", fontSize:13, color:C.sub }}>{c.traffic}</td>
                        <td style={{ padding:"12px 14px", fontSize:12, color:C.sub }}>{c.topKw}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div style={{ ...B() }}>
              <div style={{ fontSize:15, fontWeight:700, marginBottom:12 }}>💡 Competitive Insights</div>
              {[
                { icon:"🎯", text:"You rank higher than Arabian Adventures for 'desert safari dubai' — maintain with fresh content" },
                { icon:"📝", text:"Big Bus Dubai has 890 keywords — they rank for generic 'things to do' terms. Target these!" },
                { icon:"🔗", text:"Viator has DA 90 — get a listing on Viator for a powerful backlink" },
                { icon:"📈", text:"Platinum Heritage owns 'hot air balloon dubai' — create more content for this keyword" },
              ].map((tip,i)=>(
                <div key={i} style={{ display:"flex", gap:10, padding:"10px 0", borderBottom:i<3?`1px solid ${C.border}`:"none" }}>
                  <span style={{ fontSize:18 }}>{tip.icon}</span>
                  <span style={{ fontSize:13, color:C.sub, lineHeight:1.6 }}>{tip.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ISSUES ── */}
        {tab==="issues" && (
          <div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:24 }}>
              <Stat icon="🔴" label="High Priority" value={issues.filter(i=>i.priority==="high").length}   color={C.red}   />
              <Stat icon="🟡" label="Medium"        value={issues.filter(i=>i.priority==="medium").length} color={C.gold}  />
              <Stat icon="🟢" label="Low Priority"  value={issues.filter(i=>i.priority==="low").length}    color={C.green} />
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {issues.map((iss,i)=>(
                <div key={i} style={{ ...B({ display:"flex", alignItems:"center", gap:16 }) }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", flexShrink:0, background:iss.priority==="high"?C.red:iss.priority==="medium"?C.gold:C.green }}/>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3 }}>
                      <span style={{ fontSize:13, fontWeight:700, color:C.text }}>{iss.type}</span>
                      <Badge text={iss.priority.toUpperCase()} color={iss.priority==="high"?"red":iss.priority==="medium"?"gold":"green"}/>
                    </div>
                    <div style={{ fontSize:12, color:C.sub }}>📄 {iss.page}</div>
                    <div style={{ fontSize:12, color:C.blue, marginTop:2 }}>💡 {iss.fix}</div>
                  </div>
                  <button onClick={()=>toast(`✅ Auto-fixing: ${iss.type} on ${iss.page}`)}
                    style={{ background:`${C.gold}22`, border:`1px solid ${C.gold}44`, borderRadius:8, padding:"7px 14px", color:C.gold, fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit", flexShrink:0 }}>
                    Fix Now →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Toast */}
      {notif && (
        <div style={{ position:"fixed", bottom:24, right:24, zIndex:9999, background:"rgba(16,185,129,0.95)", color:"#fff", padding:"12px 20px", borderRadius:12, fontSize:13, fontWeight:600, boxShadow:"0 8px 28px rgba(0,0,0,0.4)", maxWidth:340 }}>
          {notif}
        </div>
      )}
    </div>
  )
}
