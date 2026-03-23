"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import PROPERTIES from "../../data/properties";

const PW = "properties2025";

const TABS = [
  { id:"dashboard",   icon:"📊", label:"Dashboard" },
  { id:"properties",  icon:"🏗️", label:"Properties" },
  { id:"add",         icon:"➕", label:"Add Property" },
  { id:"inquiries",   icon:"📨", label:"Inquiries" },
  { id:"settings",    icon:"⚙️", label:"Settings" },
];

const EMPTY_PROP = {
  name:"", area:"Dubai Marina", emirate:"Dubai", type:"1 Bedroom",
  developer:"", completion:"2025", pricePerSqft:{ buy:1800, rent:140 },
  rentalYield:"7.5", roi10yr:"42", serviceCharge:"15", parking:"1",
  rating:"4.5", tags:[], image:"", description:"",
};

const MOCK_INQ = [
  { id:"INQ-001", name:"Ahmed Al Mansouri", phone:"+971501234567", email:"ahmed@email.com", property:"Marina Gate Tower 1", type:"Buy",  budget:"AED 2M-3M",   date:"2026-03-21", status:"new" },
  { id:"INQ-002", name:"Sarah Johnson",     phone:"+447911123456",  email:"sarah@email.com", property:"Burj Crown Downtown", type:"Rent", budget:"AED 150K/yr", date:"2026-03-20", status:"contacted" },
  { id:"INQ-003", name:"Ravi Kumar",        phone:"+919876543210",  email:"ravi@email.com",  property:"Binghatti JVC",        type:"Buy",  budget:"AED 700K-1M", date:"2026-03-19", status:"viewing" },
  { id:"INQ-004", name:"Marie Dubois",      phone:"+33612345678",   email:"marie@email.com", property:"Dubai Hills Villa",    type:"Buy",  budget:"AED 4M-6M",   date:"2026-03-18", status:"new" },
  { id:"INQ-005", name:"Yuki Tanaka",       phone:"+819012345678",  email:"yuki@email.com",  property:"FIVE Palm Residences", type:"Buy",  budget:"AED 5M+",     date:"2026-03-17", status:"closed" },
];

const SETTINGS_DEFAULT = {
  showWhatsApp:true, showPrices:true, goldenVisaBadge:true,
  showROI:true, enableFavourites:true, enableCompare:true,
  siteName:"Dubai Properties", whatsapp:"+971544735060", email:"info@dubairovers.com",
};

export default function PropertiesAdmin() {
  const [mounted,   setMounted]   = useState(false);
  const [authed,    setAuthed]    = useState(false);
  const [pw,        setPw]        = useState("");
  const [pwErr,     setPwErr]     = useState("");
  const [tab,       setTab]       = useState("dashboard");
  const [notif,     setNotif]     = useState(null);
  const [props,     setProps]     = useState([]);
  const [inquiries, setInquiries] = useState(MOCK_INQ);
  const [settings,  setSettings]  = useState(SETTINGS_DEFAULT);
  const [newProp,   setNewProp]   = useState(EMPTY_PROP);
  const [editId,    setEditId]    = useState(null);
  const [delConfirm,setDelConfirm]= useState(null);
  const [search,    setSearch]    = useState("");

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && localStorage.getItem("dp_admin_auth") === "true") setAuthed(true);
    setProps(PROPERTIES.map(p => ({ ...p, active:true, featured:false,
      views: Math.floor(Math.random()*500+50),
      inquiries: Math.floor(Math.random()*20+2),
    })));
    try {
      const s = JSON.parse(localStorage.getItem("dp_settings") || "{}");
      if (Object.keys(s).length) setSettings(prev => ({ ...prev, ...s }));
    } catch(_) {}
  }, []);

  if (!mounted) return null;

  const toast = (msg, color="#10B981") => {
    setNotif({ msg, color });
    setTimeout(() => setNotif(null), 3000);
  };

  const login = (e) => {
    e.preventDefault();
    if (pw === PW) {
      setAuthed(true);
      localStorage.setItem("dp_admin_auth","true");
    } else {
      setPwErr("Incorrect password");
      setTimeout(() => setPwErr(""), 2500);
    }
  };

  const logout = () => {
    setAuthed(false);
    localStorage.removeItem("dp_admin_auth");
  };

  const saveSettings = () => {
    localStorage.setItem("dp_settings", JSON.stringify(settings));
    toast("✅ Settings saved!");
  };

  const addProperty = () => {
    if (!newProp.name || !newProp.developer) {
      toast("⚠️ Name and developer are required", "#F59E0B");
      return;
    }
    const id = "custom-" + Date.now();
    const full = {
      ...newProp,
      id, active:true, featured:false,
      views:0, inquiries:0,
      rating: parseFloat(newProp.rating) || 4.5,
      rentalYield: parseFloat(newProp.rentalYield) || 7.5,
      roi10yr: parseFloat(newProp.roi10yr) || 42,
      image: newProp.image || "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
    };
    setProps(prev => [full, ...prev]);
    setNewProp(EMPTY_PROP);
    setTab("properties");
    toast("✅ Property added successfully!");
  };

  const deleteProperty = (id) => {
    setProps(prev => prev.filter(p => p.id !== id));
    setDelConfirm(null);
    toast("🗑️ Property deleted");
  };

  const toggleProp = (id, field) => {
    setProps(prev => prev.map(p => p.id === id ? {...p, [field]:!p[field]} : p));
  };

  const filtered = props.filter(p =>
    !search || p.name?.toLowerCase().includes(search.toLowerCase()) || p.area?.toLowerCase().includes(search.toLowerCase())
  );

  const newInq = inquiries.filter(i => i.status === "new").length;
  const activeProps = props.filter(p => p.active).length;
  const featuredProps = props.filter(p => p.featured).length;
  const totalViews = props.reduce((s, p) => s + (p.views||0), 0);

  const T = {
    bg:"#070B14", sidebar:"#0A0F1E", card:"rgba(255,255,255,0.04)",
    border:"rgba(255,255,255,0.07)", text:"#F1F5F9",
    sub:"rgba(255,255,255,0.4)", green:"#10B981", blue:"#6366F1", gold:"#F59E0B"
  };
  const B = (ex={}) => ({ background:T.card, border:`1px solid ${T.border}`, borderRadius:14, padding:"18px 20px", ...ex });
  const INP = { width:"100%", padding:"10px 14px", background:"rgba(255,255,255,0.05)", border:`1px solid ${T.border}`, borderRadius:10, color:T.text, fontSize:13, fontFamily:"Inter,sans-serif", outline:"none" };

  // ── LOGIN ──
  if (!authed) return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap"/>
      <div suppressHydrationWarning style={{ minHeight:"100vh", background:"linear-gradient(135deg,#06080F,#0D1A2E)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Inter',sans-serif" }}>
      <style suppressHydrationWarning>{`*{box-sizing:border-box}input:focus{border-color:rgba(16,185,129,0.5)!important;outline:none!important}`}</style>
      <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(16,185,129,0.2)", borderRadius:24, padding:"48px 40px", width:"100%", maxWidth:420, textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:12 }}>🏙️</div>
        <div style={{ fontSize:24, fontWeight:800, color:T.green, marginBottom:4 }}>Dubai Properties</div>
        <div style={{ fontSize:13, color:T.sub, marginBottom:32 }}>Admin Control Panel</div>
        <form onSubmit={login}>
          <input type="password" value={pw} onChange={e=>{setPw(e.target.value);setPwErr("");}}
            placeholder="Enter admin password"
            style={{ ...INP, padding:"14px 16px", fontSize:15, marginBottom:8, borderColor: pwErr?"#EF4444":"rgba(16,185,129,0.2)" }}/>
          {pwErr && <div style={{ color:"#EF4444", fontSize:13, marginBottom:10 }}>⚠️ {pwErr}</div>}
          <button type="submit"
            style={{ width:"100%", padding:"14px", background:"linear-gradient(135deg,#10B981,#059669)", border:"none", borderRadius:10, color:"#fff", fontWeight:800, fontSize:15, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>
            🔐 Login to Admin
          </button>
        </form>
        <div style={{ marginTop:16 }}>
          <Link href="/properties" style={{ color:T.sub, fontSize:12, textDecoration:"none" }}>← Back to Properties</Link>
        </div>
      </div>
    </div>
  );

  // ── MAIN ADMIN ──
  return (
    <div suppressHydrationWarning style={{ minHeight:"100vh", background:T.bg, fontFamily:"'Inter',sans-serif", color:T.text, display:"flex" }}>
      <style suppressHydrationWarning>{`
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:rgba(16,185,129,0.3);border-radius:10px}
        .tb:hover{background:rgba(16,185,129,0.08)!important}
        .hr:hover{background:rgba(255,255,255,0.03)!important}
        input:focus,select:focus,textarea:focus{border-color:rgba(16,185,129,0.5)!important;box-shadow:0 0 0 3px rgba(16,185,129,0.08)!important;outline:none!important}
        @keyframes si{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}.si{animation:si .3s ease}
        select option{background:#0D1220;color:#fff}
        .tog-track{width:44px;height:24px;border-radius:12px;cursor:pointer;transition:background 0.2s;position:relative;flex-shrink:0}
        .tog-knob{position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:#fff;transition:left 0.2s}
      `}</style>

      {/* ── SIDEBAR ── */}
      <div style={{ width:220, background:T.sidebar, borderRight:`1px solid ${T.border}`, display:"flex", flexDirection:"column", minHeight:"100vh", flexShrink:0, position:"sticky", top:0, height:"100vh" }}>
        <div style={{ padding:"18px 14px", borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", gap:9 }}>
          <div style={{ width:34, height:34, borderRadius:9, background:"linear-gradient(135deg,#10B981,#059669)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🏙️</div>
          <div>
            <div style={{ fontSize:13, fontWeight:800, color:"#fff" }}>Properties Admin</div>
            <div style={{ fontSize:9, color:T.sub, textTransform:"uppercase", letterSpacing:"0.1em" }}>Dubai Rovers</div>
          </div>
        </div>
        <div style={{ flex:1, padding:"10px 8px", overflowY:"auto" }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className="tb"
              style={{ width:"100%", display:"flex", alignItems:"center", gap:9, padding:"10px 12px", borderRadius:9, border:"none", background:tab===t.id?"rgba(16,185,129,0.12)":"transparent", color:tab===t.id?"#10B981":T.sub, fontSize:13, fontWeight:tab===t.id?700:400, cursor:"pointer", fontFamily:"Inter,sans-serif", marginBottom:2, textAlign:"left", transition:"all 0.15s" }}>
              <span style={{ fontSize:16 }}>{t.icon}</span>{t.label}
              {t.id==="inquiries" && newInq>0 && <span style={{ marginLeft:"auto", background:"#EF4444", color:"#fff", borderRadius:10, padding:"1px 7px", fontSize:10, fontWeight:700 }}>{newInq}</span>}
            </button>
          ))}
        </div>
        <div style={{ padding:"10px 8px", borderTop:`1px solid ${T.border}` }}>
          <Link href="/properties" style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 12px", borderRadius:9, color:T.sub, fontSize:12, textDecoration:"none" }}>🌐 View Site</Link>
          <Link href="/properties/saved" style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 12px", borderRadius:9, color:T.sub, fontSize:12, textDecoration:"none" }}>❤️ Saved Properties</Link>
          <button onClick={logout} style={{ width:"100%", display:"flex", alignItems:"center", gap:8, padding:"9px 12px", borderRadius:9, border:"none", background:"rgba(239,68,68,0.08)", color:"#EF4444", fontSize:12, cursor:"pointer", fontFamily:"Inter,sans-serif", marginTop:4 }}>🔴 Logout</button>
        </div>
      </div>

      {/* ── MAIN AREA ── */}
      <div style={{ flex:1, overflow:"auto" }}>
        {/* Topbar */}
        <div style={{ padding:"14px 28px", borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", background:T.bg, position:"sticky", top:0, zIndex:10 }}>
          <div>
            <div style={{ fontSize:19, fontWeight:800 }}>{TABS.find(t=>t.id===tab)?.icon} {TABS.find(t=>t.id===tab)?.label}</div>
            <div style={{ fontSize:11, color:T.sub }}>{new Date().toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</div>
          </div>
          <Link href="/properties" style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:9, padding:"7px 14px", color:T.sub, fontSize:12, textDecoration:"none" }}>← Back to Properties</Link>
        </div>

        <div style={{ padding:"24px 28px" }}>

          {/* ── DASHBOARD ── */}
          {tab==="dashboard" && (
            <div className="si">
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:24 }}>
                {[
                  { icon:"🏗️", label:"Active Properties",  val:activeProps,            sub:`${featuredProps} featured`,  color:T.green },
                  { icon:"📨", label:"Total Inquiries",     val:inquiries.length,       sub:`${newInq} new today`,        color:T.blue },
                  { icon:"👁️", label:"Total Views",        val:totalViews.toLocaleString(), sub:"all time",              color:T.gold },
                  { icon:"⭐", label:"Featured",           val:featuredProps,           sub:"highlighted listings",       color:"#EC4899" },
                ].map(s => (
                  <div key={s.label} style={{ ...B() }}>
                    <div style={{ fontSize:11, color:T.sub, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>{s.icon} {s.label}</div>
                    <div style={{ fontSize:28, fontWeight:800, color:s.color, marginBottom:4 }}>{s.val}</div>
                    <div style={{ fontSize:11, color:T.sub }}>{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* Recent inquiries */}
              <div style={{ ...B({ padding:0, overflow:"hidden", marginBottom:20 }) }}>
                <div style={{ padding:"14px 20px", borderBottom:`1px solid ${T.border}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div style={{ fontSize:14, fontWeight:700 }}>📨 Recent Inquiries</div>
                  <button onClick={()=>setTab("inquiries")} style={{ background:"transparent", border:"none", color:T.green, fontSize:12, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>View All →</button>
                </div>
                {inquiries.slice(0,4).map((inq,i) => (
                  <div key={inq.id} className="hr" style={{ display:"flex", alignItems:"center", gap:14, padding:"11px 20px", borderBottom:i<3?`1px solid ${T.border}`:"none", transition:"background 0.15s" }}>
                    <div style={{ width:34, height:34, borderRadius:9, background:"rgba(16,185,129,0.12)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, flexShrink:0 }}>👤</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, fontWeight:600 }}>{inq.name}</div>
                      <div style={{ fontSize:11, color:T.sub }}>{inq.property} · {inq.type} · {inq.budget}</div>
                    </div>
                    <div style={{ fontSize:11, color:T.sub }}>{inq.date}</div>
                    <span style={{ fontSize:9, fontWeight:700, padding:"2px 8px", borderRadius:6, textTransform:"uppercase",
                      background:inq.status==="new"?"rgba(239,68,68,0.15)":inq.status==="contacted"?"rgba(245,158,11,0.15)":inq.status==="viewing"?"rgba(99,102,241,0.15)":"rgba(16,185,129,0.15)",
                      color:inq.status==="new"?"#EF4444":inq.status==="contacted"?"#F59E0B":inq.status==="viewing"?"#818CF8":"#10B981",
                    }}>{inq.status}</span>
                    <a href={`https://wa.me/${inq.phone.replace(/\D/g,"")}`} target="_blank" rel="noopener noreferrer"
                      style={{ background:"#25D366", borderRadius:7, padding:"4px 10px", color:"#fff", fontSize:11, fontWeight:700, textDecoration:"none" }}>💬</a>
                  </div>
                ))}
              </div>

              {/* Top properties */}
              <div style={{ ...B({ padding:0, overflow:"hidden" }) }}>
                <div style={{ padding:"14px 20px", borderBottom:`1px solid ${T.border}` }}>
                  <div style={{ fontSize:14, fontWeight:700 }}>🏆 Top Properties by Views</div>
                </div>
                {[...props].sort((a,b)=>(b.views||0)-(a.views||0)).slice(0,5).map((p,i) => (
                  <div key={p.id} className="hr" style={{ display:"flex", alignItems:"center", gap:14, padding:"11px 20px", borderBottom:i<4?`1px solid ${T.border}`:"none", transition:"background 0.15s" }}>
                    <div style={{ width:22, height:22, borderRadius:"50%", background:"rgba(16,185,129,0.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, color:T.green, flexShrink:0 }}>{i+1}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, fontWeight:600 }}>{p.name}</div>
                      <div style={{ fontSize:11, color:T.sub }}>{p.area} · {p.rentalYield}% yield</div>
                    </div>
                    <div style={{ fontSize:12, color:T.sub }}>{p.views||0} views</div>
                    <div style={{ fontSize:12, color:T.green, fontWeight:700 }}>{p.inquiries||0} leads</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── PROPERTIES ── */}
          {tab==="properties" && (
            <div className="si">
              <div style={{ display:"flex", gap:10, marginBottom:18, alignItems:"center" }}>
                <div style={{ position:"relative", flex:1 }}>
                  <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:14 }}>🔍</span>
                  <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search properties..."
                    style={{ ...INP, paddingLeft:36 }}/>
                </div>
                <div style={{ fontSize:12, color:T.sub, whiteSpace:"nowrap" }}>{filtered.length} properties</div>
                <button onClick={()=>setTab("add")} style={{ background:"linear-gradient(135deg,#10B981,#059669)", border:"none", borderRadius:9, padding:"9px 18px", color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"Inter,sans-serif", whiteSpace:"nowrap" }}>+ Add Property</button>
              </div>

              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {filtered.map(p => (
                  <div key={p.id} style={{ ...B({ padding:"12px 18px", display:"flex", alignItems:"center", gap:14 }), opacity:p.active?1:0.55, transition:"opacity 0.2s" }}>
                    <img src={p.image||"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=80&q=60"} alt={p.name}
                      style={{ width:58, height:58, borderRadius:9, objectFit:"cover", flexShrink:0 }}/>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:3, flexWrap:"wrap" }}>
                        <span style={{ fontSize:14, fontWeight:700 }}>{p.name}</span>
                        {p.featured && <span style={{ fontSize:9, background:"rgba(245,158,11,0.2)", color:"#F59E0B", border:"1px solid rgba(245,158,11,0.4)", borderRadius:4, padding:"1px 6px", fontWeight:700 }}>⭐ FEATURED</span>}
                        {!p.active && <span style={{ fontSize:9, background:"rgba(239,68,68,0.15)", color:"#EF4444", border:"1px solid rgba(239,68,68,0.3)", borderRadius:4, padding:"1px 6px", fontWeight:700 }}>HIDDEN</span>}
                      </div>
                      <div style={{ fontSize:11, color:T.sub }}>{p.area} · {p.type} · {p.rentalYield}% yield · {p.views||0} views · {p.inquiries||0} leads</div>
                    </div>
                    <div style={{ display:"flex", gap:6, flexShrink:0, flexWrap:"wrap" }}>
                      <Link href={`/properties/${p.id}`} target="_blank"
                        style={{ padding:"5px 10px", background:"rgba(99,102,241,0.12)", border:"1px solid rgba(99,102,241,0.3)", borderRadius:7, color:"#818CF8", fontSize:11, fontWeight:700, textDecoration:"none" }}>👁️</Link>
                      <button onClick={()=>{ setNewProp({...p,id:undefined}); setEditId(p.id); setTab("add"); }}
                        style={{ padding:"5px 10px", background:"rgba(245,158,11,0.12)", border:"1px solid rgba(245,158,11,0.3)", borderRadius:7, color:"#F59E0B", fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>✏️</button>
                      <button onClick={()=>{ toggleProp(p.id,"featured"); toast(p.featured?"Unfeatured":"Featured!"); }}
                        style={{ padding:"5px 10px", background:p.featured?"rgba(245,158,11,0.2)":"rgba(255,255,255,0.06)", border:`1px solid ${p.featured?"rgba(245,158,11,0.5)":T.border}`, borderRadius:7, color:p.featured?"#F59E0B":T.sub, fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>
                        {p.featured?"★":"☆"}
                      </button>
                      <button onClick={()=>{ toggleProp(p.id,"active"); toast(p.active?"Hidden":"Activated!"); }}
                        style={{ padding:"5px 10px", background:p.active?"rgba(239,68,68,0.1)":"rgba(16,185,129,0.1)", border:`1px solid ${p.active?"rgba(239,68,68,0.3)":"rgba(16,185,129,0.3)"}`, borderRadius:7, color:p.active?"#EF4444":"#10B981", fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>
                        {p.active?"Hide":"Show"}
                      </button>
                      {delConfirm===p.id ? (
                        <div style={{ display:"flex", gap:4 }}>
                          <button onClick={()=>deleteProperty(p.id)} style={{ padding:"5px 10px", background:"rgba(239,68,68,0.25)", border:"1px solid rgba(239,68,68,0.5)", borderRadius:7, color:"#EF4444", fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>Confirm</button>
                          <button onClick={()=>setDelConfirm(null)} style={{ padding:"5px 10px", background:T.card, border:`1px solid ${T.border}`, borderRadius:7, color:T.sub, fontSize:11, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>Cancel</button>
                        </div>
                      ) : (
                        <button onClick={()=>setDelConfirm(p.id)}
                          style={{ padding:"5px 10px", background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:7, color:"#EF4444", fontSize:11, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>🗑️</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── ADD / EDIT PROPERTY ── */}
          {tab==="add" && (
            <div className="si" style={{ maxWidth:720 }}>
              <div style={{ fontSize:16, fontWeight:700, marginBottom:20 }}>{editId ? "✏️ Edit Property" : "➕ Add New Property"}</div>
              <div style={{ ...B({ marginBottom:16 }) }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                  {[
                    { label:"Property Name *", key:"name",      placeholder:"e.g. Marina Gate Tower 1" },
                    { label:"Developer *",     key:"developer", placeholder:"e.g. Emaar" },
                    { label:"Area",            key:"area",      placeholder:"e.g. Dubai Marina" },
                    { label:"Completion Year", key:"completion",placeholder:"e.g. 2025" },
                  ].map(f => (
                    <div key={f.key}>
                      <label style={{ fontSize:11, color:T.sub, display:"block", marginBottom:5, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em" }}>{f.label}</label>
                      <input value={newProp[f.key]||""} onChange={e=>setNewProp(p=>({...p,[f.key]:e.target.value}))}
                        placeholder={f.placeholder} style={{ ...INP }}/>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ ...B({ marginBottom:16 }) }}>
                <div style={{ fontSize:13, fontWeight:700, marginBottom:12 }}>Pricing & Yield</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
                  {[
                    { label:"Buy Price/sqft (AED)", key:null, subkey:"buy",  parent:"pricePerSqft" },
                    { label:"Rent Price/sqft (AED)", key:null, subkey:"rent", parent:"pricePerSqft" },
                    { label:"Rental Yield %",         key:"rentalYield",  placeholder:"7.5" },
                    { label:"10yr ROI %",              key:"roi10yr",      placeholder:"42" },
                    { label:"Service Charge (AED/sqft)", key:"serviceCharge", placeholder:"15" },
                    { label:"Rating (out of 5)",       key:"rating",       placeholder:"4.5" },
                  ].map(f => (
                    <div key={f.label}>
                      <label style={{ fontSize:11, color:T.sub, display:"block", marginBottom:5, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em" }}>{f.label}</label>
                      <input
                        value={f.parent ? (newProp[f.parent]?.[f.subkey]||"") : (newProp[f.key]||"")}
                        onChange={e => {
                          if (f.parent) setNewProp(p => ({...p, [f.parent]:{...p[f.parent],[f.subkey]:e.target.value}}));
                          else setNewProp(p => ({...p,[f.key]:e.target.value}));
                        }}
                        placeholder={f.placeholder}
                        type="number" style={{ ...INP }}/>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ ...B({ marginBottom:16 }) }}>
                <div style={{ fontSize:13, fontWeight:700, marginBottom:12 }}>Type & Location</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  <div>
                    <label style={{ fontSize:11, color:T.sub, display:"block", marginBottom:5, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em" }}>Property Type</label>
                    <select value={newProp.type} onChange={e=>setNewProp(p=>({...p,type:e.target.value}))} style={{ ...INP }}>
                      {["Studio","1 Bedroom","2 Bedroom","3 Bedroom","Villa","Penthouse","Townhouse"].map(t=>(
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize:11, color:T.sub, display:"block", marginBottom:5, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em" }}>Emirate</label>
                    <select value={newProp.emirate} onChange={e=>setNewProp(p=>({...p,emirate:e.target.value}))} style={{ ...INP }}>
                      {["Dubai","Abu Dhabi","Sharjah","Ajman","RAK"].map(em=>(
                        <option key={em} value={em}>{em}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ gridColumn:"1/-1" }}>
                    <label style={{ fontSize:11, color:T.sub, display:"block", marginBottom:5, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em" }}>Cover Image URL</label>
                    <input value={newProp.image||""} onChange={e=>setNewProp(p=>({...p,image:e.target.value}))}
                      placeholder="https://images.unsplash.com/..." style={{ ...INP }}/>
                  </div>
                  <div style={{ gridColumn:"1/-1" }}>
                    <label style={{ fontSize:11, color:T.sub, display:"block", marginBottom:5, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em" }}>Description</label>
                    <textarea value={newProp.description||""} onChange={e=>setNewProp(p=>({...p,description:e.target.value}))}
                      placeholder="Describe the property..."
                      rows={3} style={{ ...INP, resize:"vertical" }}/>
                  </div>
                </div>
              </div>

              <div style={{ display:"flex", gap:10 }}>
                <button onClick={addProperty}
                  style={{ flex:2, padding:"13px", background:"linear-gradient(135deg,#10B981,#059669)", border:"none", borderRadius:11, color:"#fff", fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>
                  {editId ? "💾 Save Changes" : "✅ Add Property"}
                </button>
                <button onClick={()=>{ setNewProp(EMPTY_PROP); setEditId(null); setTab("properties"); }}
                  style={{ flex:1, padding:"13px", background:T.card, border:`1px solid ${T.border}`, borderRadius:11, color:T.sub, fontSize:13, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* ── INQUIRIES ── */}
          {tab==="inquiries" && (
            <div className="si">
              <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
                {["all","new","contacted","viewing","closed"].map(s => (
                  <button key={s} style={{ padding:"6px 14px", borderRadius:20, border:`1px solid ${T.border}`, background:"transparent", color:T.sub, fontSize:12, cursor:"pointer", fontFamily:"Inter,sans-serif", textTransform:"capitalize" }}>{s}</button>
                ))}
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {inquiries.map(inq => (
                  <div key={inq.id} style={{ ...B({ padding:"14px 18px" }) }}>
                    <div style={{ display:"flex", alignItems:"center", gap:14, flexWrap:"wrap" }}>
                      <div style={{ width:40, height:40, borderRadius:10, background:"rgba(16,185,129,0.12)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>👤</div>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:3, flexWrap:"wrap" }}>
                          <span style={{ fontSize:14, fontWeight:700 }}>{inq.name}</span>
                          <span style={{ fontSize:9, fontWeight:700, padding:"2px 7px", borderRadius:5, textTransform:"uppercase",
                            background:inq.status==="new"?"rgba(239,68,68,0.15)":inq.status==="contacted"?"rgba(245,158,11,0.15)":inq.status==="viewing"?"rgba(99,102,241,0.15)":"rgba(16,185,129,0.15)",
                            color:inq.status==="new"?"#EF4444":inq.status==="contacted"?"#F59E0B":inq.status==="viewing"?"#818CF8":"#10B981"
                          }}>{inq.status}</span>
                        </div>
                        <div style={{ fontSize:11, color:T.sub }}>🏗️ {inq.property} · {inq.type} · {inq.budget}</div>
                        <div style={{ fontSize:11, color:T.sub, marginTop:2 }}>📧 {inq.email} · 📞 {inq.phone} · 📅 {inq.date}</div>
                      </div>
                      <div style={{ display:"flex", gap:7, flexShrink:0 }}>
                        <a href={`https://wa.me/${inq.phone.replace(/\D/g,"")}`} target="_blank" rel="noopener noreferrer"
                          style={{ padding:"7px 13px", background:"rgba(37,211,102,0.12)", border:"1px solid rgba(37,211,102,0.3)", borderRadius:8, color:"#25D366", fontSize:12, fontWeight:700, textDecoration:"none" }}>💬 WhatsApp</a>
                        <a href={`mailto:${inq.email}`}
                          style={{ padding:"7px 13px", background:"rgba(99,102,241,0.12)", border:"1px solid rgba(99,102,241,0.3)", borderRadius:8, color:"#818CF8", fontSize:12, fontWeight:700, textDecoration:"none" }}>📧 Email</a>
                        <select defaultValue={inq.status}
                          onChange={e => { setInquiries(prev => prev.map(i => i.id===inq.id ? {...i,status:e.target.value} : i)); toast("Status updated"); }}
                          style={{ ...INP, width:"auto", padding:"6px 10px", fontSize:12, cursor:"pointer" }}>
                          {["new","contacted","viewing","closed"].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── SETTINGS ── */}
          {tab==="settings" && (
            <div className="si" style={{ maxWidth:650 }}>

              {/* Toggle switches */}
              <div style={{ ...B({ marginBottom:16 }) }}>
                <div style={{ fontSize:14, fontWeight:700, marginBottom:16 }}>🔧 Feature Toggles</div>
                {[
                  { key:"showWhatsApp",    label:"WhatsApp on Property Cards",    sub:"Show WA button on listing cards" },
                  { key:"showPrices",      label:"Show Property Prices",          sub:"Hide prices if off (show 'Contact for Price')" },
                  { key:"goldenVisaBadge", label:"Golden Visa Badge on Cards",    sub:"Show '✅ Golden Visa' on qualifying properties" },
                  { key:"showROI",         label:"Show Rental Yield",             sub:"Show % yield on all cards and details" },
                  { key:"enableFavourites",label:"Enable Favourites (Hearts)",    sub:"Users can save properties to their device" },
                  { key:"enableCompare",   label:"Enable Compare Feature",        sub:"Side-by-side comparison of properties" },
                ].map(f => (
                  <div key={f.key} style={{ display:"flex", alignItems:"center", gap:14, padding:"12px 0", borderBottom:`1px solid ${T.border}` }}>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, fontWeight:600, color:T.text }}>{f.label}</div>
                      <div style={{ fontSize:11, color:T.sub, marginTop:2 }}>{f.sub}</div>
                    </div>
                    <div className="tog-track"
                      style={{ background:settings[f.key]?"#10B981":"rgba(255,255,255,0.1)" }}
                      onClick={() => setSettings(p => ({...p,[f.key]:!p[f.key]}))}>
                      <div className="tog-knob" style={{ left:settings[f.key]?23:3 }}/>
                    </div>
                  </div>
                ))}
              </div>

              {/* Site info */}
              <div style={{ ...B({ marginBottom:16 }) }}>
                <div style={{ fontSize:14, fontWeight:700, marginBottom:14 }}>🌐 Site Information</div>
                {[
                  { label:"Site Name",       key:"siteName",  placeholder:"Dubai Properties" },
                  { label:"WhatsApp Number", key:"whatsapp",  placeholder:"+971544735060" },
                  { label:"Contact Email",   key:"email",     placeholder:"info@dubairovers.com" },
                ].map(f => (
                  <div key={f.key} style={{ marginBottom:12 }}>
                    <label style={{ fontSize:11, color:T.sub, display:"block", marginBottom:5, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em" }}>{f.label}</label>
                    <input value={settings[f.key]||""} onChange={e=>setSettings(p=>({...p,[f.key]:e.target.value}))}
                      placeholder={f.placeholder} style={{ ...INP }}/>
                  </div>
                ))}
              </div>

              <button onClick={saveSettings}
                style={{ width:"100%", padding:"13px", background:"linear-gradient(135deg,#10B981,#059669)", border:"none", borderRadius:11, color:"#fff", fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>
                💾 Save All Settings
              </button>
            </div>
          )}

        </div>{/* end padding */}
      </div>{/* end main */}

      {/* Toast */}
      {notif && (
        <div style={{ position:"fixed", bottom:24, right:24, zIndex:9999, background:notif.color||"rgba(16,185,129,0.95)", color:"#fff", padding:"12px 20px", borderRadius:12, fontSize:13, fontWeight:600, boxShadow:"0 8px 28px rgba(0,0,0,0.5)", transition:"all 0.3s" }}>
          {notif.msg}
        </div>
      )}
    </div>
    </>
  );
}
