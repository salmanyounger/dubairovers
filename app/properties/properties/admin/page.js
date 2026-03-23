"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const PW = "Salman4526";

const SEED = [
  {id:1,name:"JVC Circle Mall Residences",area:"JVC",emirate:"Dubai",type:"Studio",price:520000,sqft:420,beds:0,roi:9.1,status:"Ready",dev:"Nakheel"},
  {id:2,name:"JVC Garden Heights",area:"JVC",emirate:"Dubai",type:"1 Bedroom",price:780000,sqft:850,beds:1,roi:8.5,status:"Ready",dev:"Nakheel"},
  {id:3,name:"Bloom Towers JVC",area:"JVC",emirate:"Dubai",type:"2 Bedroom",price:1150000,sqft:1280,beds:2,roi:7.9,status:"Ready",dev:"Bloom"},
  {id:4,name:"JLT Cluster A Tower",area:"JLT",emirate:"Dubai",type:"1 Bedroom",price:920000,sqft:780,beds:1,roi:7.8,status:"Ready",dev:"DMCC"},
  {id:5,name:"JLT Cluster X Studio",area:"JLT",emirate:"Dubai",type:"Studio",price:590000,sqft:510,beds:0,roi:8.8,status:"Ready",dev:"DMCC"},
  {id:6,name:"Business Bay Heights",area:"Business Bay",emirate:"Dubai",type:"1 Bedroom",price:1250000,sqft:720,beds:1,roi:7.2,status:"Ready",dev:"DAMAC"},
  {id:7,name:"Executive Bay Studio",area:"Business Bay",emirate:"Dubai",type:"Studio",price:780000,sqft:480,beds:0,roi:8.1,status:"Ready",dev:"DAMAC"},
  {id:8,name:"Downtown Burj View",area:"Downtown",emirate:"Dubai",type:"2 Bedroom",price:3200000,sqft:1480,beds:2,roi:5.8,status:"Ready",dev:"Emaar"},
  {id:9,name:"Palm Signature Villa",area:"Palm Jumeirah",emirate:"Dubai",type:"3 Bedroom",price:6500000,sqft:3200,beds:3,roi:5.5,status:"Ready",dev:"Nakheel"},
  {id:10,name:"Discovery Gardens Studio",area:"Discovery Gardens",emirate:"Dubai",type:"Studio",price:380000,sqft:380,beds:0,roi:9.8,status:"Ready",dev:"Nakheel"},
  {id:11,name:"Dubai Hills Park Heights",area:"Dubai Hills",emirate:"Dubai",type:"1 Bedroom",price:1100000,sqft:760,beds:1,roi:7.4,status:"Ready",dev:"Emaar"},
  {id:12,name:"Marina Gate Tower 1",area:"Dubai Marina",emirate:"Dubai",type:"2 Bedroom",price:2200000,sqft:1180,beds:2,roi:7.1,status:"Ready",dev:"Select Group"},
  {id:13,name:"Al Reem Island 2BR",area:"Al Reem Island",emirate:"Abu Dhabi",type:"2 Bedroom",price:1400000,sqft:1350,beds:2,roi:6.8,status:"Ready",dev:"Aldar"},
  {id:14,name:"Yas Island Studio",area:"Yas Island",emirate:"Abu Dhabi",type:"Studio",price:680000,sqft:480,beds:0,roi:7.2,status:"Ready",dev:"Aldar"},
  {id:15,name:"Aljada by Arada",area:"Aljada",emirate:"Sharjah",type:"1 Bedroom",price:580000,sqft:820,beds:1,roi:7.5,status:"Off-Plan",dev:"Arada"},
  {id:16,name:"Al Marjan Island 2BR",area:"Al Marjan Island",emirate:"Ras Al Khaimah",type:"2 Bedroom",price:1450000,sqft:1500,beds:2,roi:7.5,status:"Off-Plan",dev:"RAK Properties"},
  {id:17,name:"Ajman Marina Studio",area:"Ajman Marina",emirate:"Ajman",type:"Studio",price:220000,sqft:420,beds:0,roi:10.5,status:"Ready",dev:"Various"},
  {id:18,name:"International City Studio",area:"International City",emirate:"Dubai",type:"Studio",price:290000,sqft:350,beds:0,roi:10.2,status:"Ready",dev:"Nakheel"},
  {id:19,name:"Creek Gate Tower",area:"Dubai Creek Harbour",emirate:"Dubai",type:"1 Bedroom",price:1350000,sqft:700,beds:1,roi:7.0,status:"Off-Plan",dev:"Emaar"},
  {id:20,name:"Town Square 1BR",area:"Town Square",emirate:"Dubai",type:"1 Bedroom",price:700000,sqft:780,beds:1,roi:8.2,status:"Ready",dev:"Nshama"},
];

const T = {
  bg:"#060C1E", bg2:"#0D1629", border:"rgba(255,255,255,0.08)",
  blue:"#3B82F6", green:"#10B981", red:"#EF4444", gold:"#F59E0B",
  text:"#E8EDF8", sub:"rgba(255,255,255,0.45)",
};

export default function PropertiesAdmin() {
  const [mounted,   setMounted]   = useState(false);
  const [authed,    setAuthed]    = useState(false);
  const [pw,        setPw]        = useState("");
  const [pwErr,     setPwErr]     = useState(false);
  const [tab,       setTab]       = useState("dashboard");
  const [props,     setProps]     = useState([]);
  const [leads,     setLeads]     = useState([]);
  const [search,    setSearch]    = useState("");
  const [toast,     setToast]     = useState("");
  const [settings,  setSettings]  = useState({
    siteName:"Dubai Properties", whatsapp:"971544735060",
    currency:"AED", showROI:true, showVisa:true,
  });

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && localStorage.getItem("dp_admin_auth") === "true") setAuthed(true);
    setProps(SEED.map(p => ({
      ...p, active: true, featured: false,
      views:     Math.floor(Math.random()*500+50),
      inquiries: Math.floor(Math.random()*20+2),
    })));
    try {
      const s = JSON.parse(localStorage.getItem("dp_settings") || "{}");
      if (Object.keys(s).length) setSettings(prev => ({ ...prev, ...s }));
      const l = JSON.parse(localStorage.getItem("dp_leads") || "[]");
      setLeads(l);
    } catch(_) {}
  }, []);

  if (!mounted) return null;

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(""), 2500); };

  const login = () => {
    if (pw === PW) {
      setAuthed(true);
      if (typeof window !== "undefined") localStorage.setItem("dp_admin_auth", "true");
    } else {
      setPwErr(true);
      setTimeout(() => setPwErr(false), 1500);
    }
  };

  const logout = () => {
    setAuthed(false);
    if (typeof window !== "undefined") localStorage.removeItem("dp_admin_auth");
  };

  const toggleActive = id => {
    setProps(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
    showToast("✅ Updated");
  };

  const toggleFeatured = id => {
    setProps(prev => prev.map(p => p.id === id ? { ...p, featured: !p.featured } : p));
    showToast("⭐ Updated");
  };

  const saveSettings = () => {
    try { localStorage.setItem("dp_settings", JSON.stringify(settings)); } catch(_) {}
    showToast("✅ Settings saved");
  };

  /* ── LOGIN ── */
  if (!authed) return (
    <div style={{ minHeight:"100vh", background:T.bg, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap"/>
      <div style={{ background:T.bg2, border:`1px solid ${T.border}`, borderRadius:20, padding:"40px 36px", width:340, textAlign:"center" }}>
        <div style={{ fontSize:32, marginBottom:12 }}>🏙️</div>
        <div style={{ fontSize:20, fontWeight:800, color:"#fff", marginBottom:4 }}>Properties Admin</div>
        <div style={{ fontSize:12, color:T.sub, marginBottom:24 }}>Dubai Properties Platform</div>
        <input
          type="password" value={pw} onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === "Enter" && login()}
          placeholder="Enter password"
          style={{ width:"100%", padding:"11px 14px", background:"rgba(255,255,255,0.06)", border:`1px solid ${pwErr?"#EF4444":T.border}`, borderRadius:10, color:"#fff", fontSize:14, fontFamily:"inherit", marginBottom:12, outline:"none" }}
        />
        {pwErr && <div style={{ fontSize:12, color:"#EF4444", marginBottom:8 }}>Incorrect password</div>}
        <button onClick={login}
          style={{ width:"100%", padding:"11px", background:"linear-gradient(135deg,#3B82F6,#1D4ED8)", border:"none", borderRadius:10, color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
          Sign In
        </button>
        <Link href="/properties" style={{ display:"block", marginTop:14, fontSize:12, color:T.sub, textDecoration:"none" }}>← Back to Properties</Link>
      </div>
    </div>
  );

  /* ── STATS ── */
  const activeCount   = props.filter(p => p.active).length;
  const featuredCount = props.filter(p => p.featured).length;
  const totalViews    = props.reduce((s, p) => s + (p.views || 0), 0);
  const totalInquiries = props.reduce((s, p) => s + (p.inquiries || 0), 0);
  const avgROI        = (props.reduce((s, p) => s + p.roi, 0) / (props.length || 1)).toFixed(1);

  const filtered = props.filter(p =>
    !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.area.toLowerCase().includes(search.toLowerCase())
  );

  const TABS = ["dashboard","properties","leads","settings"];

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"/>
      <div suppressHydrationWarning style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Plus Jakarta Sans',sans-serif", display:"flex" }}>
        <style suppressHydrationWarning>{`*{box-sizing:border-box} select option{background:#0D1629;color:#fff}`}</style>

        {/* ── SIDEBAR ── */}
        <div style={{ width:220, background:T.bg2, borderRight:`1px solid ${T.border}`, padding:"20px 14px", display:"flex", flexDirection:"column", gap:4, flexShrink:0 }}>
          <div style={{ marginBottom:20, paddingBottom:16, borderBottom:`1px solid ${T.border}` }}>
            <div style={{ fontSize:14, fontWeight:800, color:"#fff" }}>🏙️ PropAdmin</div>
            <div style={{ fontSize:10, color:T.sub, marginTop:2 }}>Dubai Properties</div>
          </div>
          {TABS.map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ padding:"9px 12px", borderRadius:9, border:"none", background:tab===t?"rgba(59,130,246,0.15)":"transparent", color:tab===t?T.blue:T.sub, fontSize:13, fontWeight:tab===t?700:400, cursor:"pointer", fontFamily:"inherit", textAlign:"left", textTransform:"capitalize", transition:"all 0.15s" }}>
              {t==="dashboard"?"📊":t==="properties"?"🏢":t==="leads"?"📋":"⚙️"} {t.charAt(0).toUpperCase()+t.slice(1)}
            </button>
          ))}
          <div style={{ marginTop:"auto", paddingTop:16, borderTop:`1px solid ${T.border}`, display:"flex", gap:8 }}>
            <Link href="/properties" style={{ flex:1, padding:"8px", background:"rgba(59,130,246,0.1)", border:"1px solid rgba(59,130,246,0.2)", borderRadius:8, color:T.blue, fontSize:11, fontWeight:700, textDecoration:"none", textAlign:"center" }}>View Site</Link>
            <button onClick={logout} style={{ flex:1, padding:"8px", background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:8, color:"#EF4444", fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>Logout</button>
          </div>
        </div>

        {/* ── MAIN ── */}
        <div style={{ flex:1, overflowY:"auto", padding:"24px" }}>

          {/* DASHBOARD */}
          {tab === "dashboard" && (
            <div>
              <div style={{ fontSize:20, fontWeight:800, color:"#fff", marginBottom:20 }}>📊 Dashboard</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))", gap:12, marginBottom:24 }}>
                {[
                  ["Total Properties", props.length, "🏢", T.blue],
                  ["Active Listings",  activeCount,  "✅", T.green],
                  ["Featured",         featuredCount,"⭐", T.gold],
                  ["Total Views",      totalViews.toLocaleString(), "👁", T.blue],
                  ["Inquiries",        totalInquiries,"💬", T.green],
                  ["Avg ROI",          `${avgROI}%`,  "📈", T.gold],
                ].map(([l,v,ic,c]) => (
                  <div key={l} style={{ background:T.bg2, border:`1px solid ${T.border}`, borderRadius:12, padding:"16px" }}>
                    <div style={{ fontSize:11, color:T.sub, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.1em" }}>{l}</div>
                    <div style={{ fontSize:22, fontWeight:800, color:"#fff" }}>{ic} {v}</div>
                  </div>
                ))}
              </div>
              <div style={{ background:T.bg2, border:`1px solid ${T.border}`, borderRadius:14, padding:"16px 20px" }}>
                <div style={{ fontSize:14, fontWeight:700, color:"#fff", marginBottom:12 }}>Top 5 by ROI</div>
                {[...props].sort((a,b)=>b.roi-a.roi).slice(0,5).map(p=>(
                  <div key={p.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:`1px solid ${T.border}` }}>
                    <div>
                      <div style={{ fontSize:13, fontWeight:600, color:"#fff" }}>{p.name}</div>
                      <div style={{ fontSize:11, color:T.sub }}>{p.area} · {p.type}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:14, fontWeight:800, color:T.green }}>{p.roi}%</div>
                      <div style={{ fontSize:11, color:T.sub }}>AED {(p.price/1e6).toFixed(1)}M</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROPERTIES */}
          {tab === "properties" && (
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                <div style={{ fontSize:20, fontWeight:800, color:"#fff" }}>🏢 Properties ({filtered.length})</div>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..."
                  style={{ padding:"8px 12px", background:"rgba(255,255,255,0.05)", border:`1px solid ${T.border}`, borderRadius:8, color:"#fff", fontSize:13, fontFamily:"inherit", width:200 }}/>
              </div>
              <div style={{ background:T.bg2, border:`1px solid ${T.border}`, borderRadius:14, overflow:"hidden" }}>
                <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 80px 80px", padding:"10px 16px", borderBottom:`1px solid ${T.border}`, fontSize:10, color:T.sub, textTransform:"uppercase", letterSpacing:"0.1em" }}>
                  <div>Property</div><div>Price</div><div>ROI</div><div>Status</div><div>Active</div><div>Featured</div>
                </div>
                {filtered.map((p,i) => (
                  <div key={p.id} style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr 80px 80px", padding:"11px 16px", borderBottom:i<filtered.length-1?`1px solid ${T.border}`:undefined, alignItems:"center" }}>
                    <div>
                      <div style={{ fontSize:13, fontWeight:600, color:"#fff" }}>{p.name}</div>
                      <div style={{ fontSize:11, color:T.sub }}>{p.emirate} · {p.area} · {p.type}</div>
                    </div>
                    <div style={{ fontSize:13, fontWeight:700, color:T.blue }}>AED {(p.price/1e6).toFixed(2)}M</div>
                    <div style={{ fontSize:13, fontWeight:700, color:T.green }}>{p.roi}%</div>
                    <div>
                      <span style={{ fontSize:10, padding:"2px 8px", borderRadius:20, background:p.status==="Ready"?"rgba(16,185,129,0.15)":"rgba(245,158,11,0.15)", color:p.status==="Ready"?T.green:T.gold, fontWeight:700 }}>{p.status}</span>
                    </div>
                    <div>
                      <button onClick={()=>toggleActive(p.id)}
                        style={{ width:36, height:20, borderRadius:10, border:"none", background:p.active?T.green:"rgba(255,255,255,0.12)", cursor:"pointer", position:"relative", transition:"background 0.2s" }}>
                        <div style={{ position:"absolute", top:2, left:p.active?18:2, width:16, height:16, borderRadius:"50%", background:"#fff", transition:"left 0.2s" }}/>
                      </button>
                    </div>
                    <div>
                      <button onClick={()=>toggleFeatured(p.id)}
                        style={{ padding:"3px 8px", borderRadius:6, border:`1px solid ${p.featured?"rgba(245,158,11,0.5)":T.border}`, background:p.featured?"rgba(245,158,11,0.12)":"transparent", color:p.featured?T.gold:T.sub, fontSize:11, cursor:"pointer", fontFamily:"inherit" }}>
                        {p.featured?"⭐":"☆"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LEADS */}
          {tab === "leads" && (
            <div>
              <div style={{ fontSize:20, fontWeight:800, color:"#fff", marginBottom:16 }}>📋 Leads ({leads.length})</div>
              {leads.length === 0 ? (
                <div style={{ background:T.bg2, border:`1px solid ${T.border}`, borderRadius:14, padding:"48px 24px", textAlign:"center" }}>
                  <div style={{ fontSize:36, marginBottom:8 }}>📋</div>
                  <div style={{ fontSize:15, fontWeight:700, color:"#fff", marginBottom:4 }}>No leads yet</div>
                  <div style={{ fontSize:13, color:T.sub }}>Leads submitted via property enquiry forms will appear here</div>
                </div>
              ) : (
                <div style={{ background:T.bg2, border:`1px solid ${T.border}`, borderRadius:14, overflow:"hidden" }}>
                  {leads.map((l,i)=>(
                    <div key={i} style={{ padding:"14px 18px", borderBottom:i<leads.length-1?`1px solid ${T.border}`:undefined, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <div>
                        <div style={{ fontSize:13, fontWeight:600, color:"#fff" }}>{l.name||"Unknown"}</div>
                        <div style={{ fontSize:11, color:T.sub }}>{l.property||""} · {l.date||""}</div>
                      </div>
                      <a href={`https://wa.me/${l.phone||"971544735060"}`} target="_blank" rel="noopener noreferrer"
                        style={{ padding:"6px 12px", background:"rgba(37,211,102,0.12)", border:"1px solid rgba(37,211,102,0.3)", borderRadius:8, color:"#25D366", fontSize:11, fontWeight:700, textDecoration:"none" }}>
                        💬 WhatsApp
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SETTINGS */}
          {tab === "settings" && (
            <div>
              <div style={{ fontSize:20, fontWeight:800, color:"#fff", marginBottom:20 }}>⚙️ Settings</div>
              <div style={{ background:T.bg2, border:`1px solid ${T.border}`, borderRadius:14, padding:"20px 24px", maxWidth:500 }}>
                {[
                  ["Site Name",    "siteName",  "text"],
                  ["WhatsApp No.", "whatsapp",  "text"],
                  ["Currency",     "currency",  "text"],
                ].map(([label, key, type]) => (
                  <div key={key} style={{ marginBottom:16 }}>
                    <div style={{ fontSize:12, color:T.sub, marginBottom:6 }}>{label}</div>
                    <input type={type} value={settings[key]||""} onChange={e=>setSettings(p=>({...p,[key]:e.target.value}))}
                      style={{ width:"100%", padding:"9px 12px", background:"rgba(255,255,255,0.05)", border:`1px solid ${T.border}`, borderRadius:9, color:"#fff", fontSize:13, fontFamily:"inherit" }}/>
                  </div>
                ))}
                <div style={{ display:"flex", gap:12, marginBottom:16 }}>
                  {[["showROI","Show ROI %"],["showVisa","Show Visa Badge"]].map(([key,label])=>(
                    <div key={key} style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <button onClick={()=>setSettings(p=>({...p,[key]:!p[key]}))}
                        style={{ width:36, height:20, borderRadius:10, border:"none", background:settings[key]?T.green:"rgba(255,255,255,0.12)", cursor:"pointer", position:"relative", transition:"background 0.2s" }}>
                        <div style={{ position:"absolute", top:2, left:settings[key]?18:2, width:16, height:16, borderRadius:"50%", background:"#fff", transition:"left 0.2s" }}/>
                      </button>
                      <span style={{ fontSize:12, color:T.text }}>{label}</span>
                    </div>
                  ))}
                </div>
                <button onClick={saveSettings}
                  style={{ width:"100%", padding:"11px", background:"linear-gradient(135deg,#3B82F6,#1D4ED8)", border:"none", borderRadius:10, color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </div>

        {/* TOAST */}
        {toast && (
          <div style={{ position:"fixed", bottom:20, left:"50%", transform:"translateX(-50%)", background:"rgba(13,22,41,0.97)", border:`1px solid ${T.border}`, borderRadius:12, padding:"9px 20px", fontSize:13, fontWeight:700, color:"#fff", zIndex:999 }}>
            {toast}
          </div>
        )}
      </div>
    </>
  );
}
