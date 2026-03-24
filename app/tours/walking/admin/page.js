"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import WALKING_ROUTES from "../data/walking-routes";

const PW = "walkingroutes2025";

export default function WalkingAdmin() {
  const [mounted, setMounted] = useState(false);
  const [authed, setAuthed]   = useState(false);
  const [password, setPassword] = useState("");
  const [pwErr, setPwErr]     = useState("");
  const [tab, setTab]         = useState("routes");
  const [routes, setRoutes]   = useState([]);
  const [selRoute, setSelRoute] = useState(null);
  const [editStep, setEditStep] = useState(null);
  const [notif, setNotif]     = useState(null);
  const [stats, setStats]     = useState({ totalViews:2847, totalStarts:1203, totalCompleted:891, avgRating:4.8 });

  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem("dr_walking_admin") === "true") setAuthed(true);
    setRoutes(WALKING_ROUTES.map(r => ({
      ...r,
      active: true,
      featured: r.id === "dubai-marina-walk" || r.id === "gold-spice-souk",
      views: Math.floor(Math.random() * 400 + 100),
      starts: Math.floor(Math.random() * 200 + 50),
      completions: Math.floor(Math.random() * 150 + 30),
    })));
  }, []);

  if (!mounted) return null;
  const toast = (msg) => { setNotif(msg); setTimeout(() => setNotif(null), 3000); };
  const login = (e) => { e.preventDefault(); if (password === PW) { setAuthed(true); localStorage.setItem("dr_walking_admin","true"); } else setPwErr("Wrong password"); };
  const logout = () => { setAuthed(false); localStorage.removeItem("dr_walking_admin"); };

  const T = { bg:"#070B14", sidebar:"#0A0F1E", card:"rgba(255,255,255,0.04)", border:"rgba(255,255,255,0.07)", text:"#F1F5F9", sub:"rgba(255,255,255,0.4)", green:"#10B981", gold:"#F59E0B", blue:"#6366F1" };
  const B = (ex={}) => ({ background:T.card, border:`1px solid ${T.border}`, borderRadius:14, padding:"18px 20px", ...ex });
  const inp = { width:"100%", padding:"10px 14px", background:"rgba(255,255,255,0.05)", border:`1px solid ${T.border}`, borderRadius:10, color:T.text, fontSize:13, fontFamily:"Inter,sans-serif", outline:"none" };

  const TABS = [
    { id:"routes",    label:"Routes",       icon:"🗺️" },
    { id:"analytics", label:"Analytics",    icon:"📊" },
    { id:"add",       label:"Add Route",    icon:"➕" },
    { id:"settings",  label:"Settings",     icon:"⚙️" },
  ];

  // ── LOGIN ──
  if (!authed) return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#06080F,#0F1A2E)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Inter',sans-serif" }}>
      <style suppressHydrationWarning>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');*{box-sizing:border-box}`}</style>
      <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(16,185,129,0.2)", borderRadius:24, padding:"48px 40px", width:"100%", maxWidth:400 }}>
        <div style={{ textAlign:"center", marginBottom:28 }}>
          <div style={{ fontSize:48, marginBottom:10 }}>🗺️</div>
          <div style={{ fontSize:22, fontWeight:800, color:"#10B981" }}>Walking Routes Admin</div>
          <div style={{ fontSize:13, color:"rgba(255,255,255,0.35)", marginTop:4 }}>DubaiRovers.com</div>
        </div>
        <form onSubmit={login}>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Admin password"
            style={{ ...inp, marginBottom:8 }}/>
          {pwErr && <div style={{ color:"#EF4444", fontSize:13, marginBottom:10 }}>⚠️ {pwErr}</div>}
          <button type="submit" style={{ width:"100%", padding:"13px", background:"linear-gradient(135deg,#10B981,#059669)", border:"none", borderRadius:10, color:"#fff", fontWeight:800, fontSize:14, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>🔐 Login</button>
        </form>
        <div style={{ textAlign:"center", marginTop:14 }}>
          <Link href="/tours/walking" style={{ color:"rgba(255,255,255,0.3)", fontSize:12, textDecoration:"none" }}>← View Walking Routes</Link>
        </div>
      </div>
    </div>
  );

  // ── MAIN ADMIN ──
  return (
    <div style={{ minHeight:"100vh", background:T.bg, fontFamily:"'Inter',sans-serif", color:T.text, display:"flex" }}>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:rgba(16,185,129,0.3);border-radius:10px}
        .tb:hover{background:rgba(16,185,129,0.08)!important}.hr:hover{background:rgba(255,255,255,0.03)!important}
        input:focus,select:focus,textarea:focus{border-color:rgba(16,185,129,0.5)!important;box-shadow:0 0 0 3px rgba(16,185,129,0.08)!important;outline:none!important}
        @keyframes si{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}.si{animation:si .3s ease}
        select option{background:#0D1220;color:#fff}
      `}</style>

      {/* Sidebar */}
      <div style={{ width:220, background:T.sidebar, borderRight:`1px solid ${T.border}`, display:"flex", flexDirection:"column", minHeight:"100vh", flexShrink:0 }}>
        <div style={{ padding:"18px 14px", borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", gap:9 }}>
          <div style={{ width:32, height:32, borderRadius:8, background:"linear-gradient(135deg,#10B981,#059669)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🗺️</div>
          <div>
            <div style={{ fontSize:13, fontWeight:800, color:"#fff" }}>Walking Admin</div>
            <div style={{ fontSize:9, color:"rgba(255,255,255,0.3)", textTransform:"uppercase", letterSpacing:"0.1em" }}>Dubai Rovers</div>
          </div>
        </div>
        <div style={{ flex:1, padding:"10px 8px" }}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} className="tb"
              style={{ width:"100%", display:"flex", alignItems:"center", gap:9, padding:"9px 11px", borderRadius:9, border:"none", background:tab===t.id?"rgba(16,185,129,0.12)":"transparent", color:tab===t.id?"#10B981":"rgba(255,255,255,0.5)", fontSize:13, fontWeight:tab===t.id?700:400, cursor:"pointer", fontFamily:"Inter,sans-serif", marginBottom:2, textAlign:"left", transition:"all 0.15s" }}>
              <span style={{ fontSize:15 }}>{t.icon}</span>{t.label}
            </button>
          ))}
        </div>
        <div style={{ padding:"10px 8px", borderTop:`1px solid ${T.border}` }}>
          <Link href="/tours/walking" target="_blank" style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 11px", borderRadius:9, color:"rgba(255,255,255,0.35)", fontSize:12, textDecoration:"none", marginBottom:4 }}>🌐 View Live Page</Link>
          <button onClick={logout} style={{ width:"100%", display:"flex", alignItems:"center", gap:8, padding:"8px 11px", borderRadius:9, border:"none", background:"rgba(239,68,68,0.08)", color:"#EF4444", fontSize:12, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>🔴 Logout</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex:1, overflow:"auto" }}>
        {/* Top bar */}
        <div style={{ padding:"14px 24px", borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, background:T.bg, zIndex:10 }}>
          <div>
            <div style={{ fontSize:18, fontWeight:800 }}>{TABS.find(t=>t.id===tab)?.icon} {TABS.find(t=>t.id===tab)?.label}</div>
            <div style={{ fontSize:11, color:T.sub }}>{new Date().toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</div>
          </div>
          <Link href="/admin" style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:9, padding:"7px 14px", color:T.sub, fontSize:12, textDecoration:"none" }}>← Main Admin</Link>
        </div>

        <div style={{ padding:"22px 24px" }}>

          {/* ── ROUTES TAB ── */}
          {tab==="routes" && (
            <div className="si">
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
                <div style={{ fontSize:13, color:T.sub }}>{routes.length} routes total · {routes.filter(r=>r.featured).length} featured</div>
                <button onClick={()=>setTab("add")} style={{ background:"linear-gradient(135deg,#10B981,#059669)", border:"none", borderRadius:9, padding:"9px 18px", color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>+ Add Route</button>
              </div>

              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {routes.map(r=>(
                  <div key={r.id} className="hr" style={{ ...B({ padding:"14px 18px", display:"flex", alignItems:"center", gap:16 }), transition:"background 0.15s" }}>
                    <img src={r.image} alt={r.name} style={{ width:64, height:64, borderRadius:10, objectFit:"cover", flexShrink:0 }}/>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3 }}>
                        <span style={{ fontSize:14, fontWeight:700 }}>{r.emoji} {r.name}</span>
                        {r.featured && <span style={{ fontSize:9, background:"rgba(245,158,11,0.2)", color:"#F59E0B", border:"1px solid rgba(245,158,11,0.4)", borderRadius:4, padding:"1px 6px", fontWeight:700 }}>⭐ FEATURED</span>}
                        <span style={{ fontSize:9, background:r.active?"rgba(16,185,129,0.15)":"rgba(239,68,68,0.15)", color:r.active?"#10B981":"#EF4444", borderRadius:4, padding:"1px 6px", fontWeight:700 }}>{r.active?"ACTIVE":"HIDDEN"}</span>
                      </div>
                      <div style={{ fontSize:12, color:T.sub }}>📍 {r.area} · {r.duration} min · {r.distance}km · {r.steps.length} steps</div>
                      <div style={{ display:"flex", gap:14, marginTop:5, fontSize:11 }}>
                        <span style={{ color:T.sub }}>👁️ {r.views} views</span>
                        <span style={{ color:T.sub }}>🚶 {r.starts} starts</span>
                        <span style={{ color:T.green }}>✅ {r.completions} completions</span>
                      </div>
                    </div>
                    <div style={{ display:"flex", gap:7, flexShrink:0 }}>
                      <Link href={`/tours/walking/${r.id}`} target="_blank"
                        style={{ padding:"6px 12px", background:"rgba(99,102,241,0.15)", border:"1px solid rgba(99,102,241,0.3)", borderRadius:7, color:"#818CF8", fontSize:11, fontWeight:700, textDecoration:"none" }}>
                        👁️ View
                      </Link>
                      <button onClick={()=>{ setRoutes(prev=>prev.map(x=>x.id===r.id?{...x,featured:!x.featured}:x)); toast(`✅ ${r.name} ${r.featured?"unfeatured":"featured"}!`); }}
                        style={{ padding:"6px 12px", background:r.featured?"rgba(245,158,11,0.2)":"rgba(255,255,255,0.06)", border:`1px solid ${r.featured?"rgba(245,158,11,0.4)":T.border}`, borderRadius:7, color:r.featured?"#F59E0B":T.sub, fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>
                        {r.featured?"⭐ Featured":"☆ Feature"}
                      </button>
                      <button onClick={()=>{ setRoutes(prev=>prev.map(x=>x.id===r.id?{...x,active:!x.active}:x)); toast(`✅ ${r.name} ${r.active?"hidden":"activated"}!`); }}
                        style={{ padding:"6px 12px", background:r.active?"rgba(239,68,68,0.1)":"rgba(16,185,129,0.1)", border:`1px solid ${r.active?"rgba(239,68,68,0.3)":"rgba(16,185,129,0.3)"}`, borderRadius:7, color:r.active?"#EF4444":"#10B981", fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>
                        {r.active?"Hide":"Show"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── ANALYTICS TAB ── */}
          {tab==="analytics" && (
            <div className="si">
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:24 }}>
                {[
                  { icon:"👁️", label:"Total Views",      val:stats.totalViews.toLocaleString(),     color:T.blue },
                  { icon:"🚶", label:"Walk Starts",       val:stats.totalStarts.toLocaleString(),    color:T.green },
                  { icon:"✅", label:"Completions",        val:stats.totalCompleted.toLocaleString(), color:T.gold },
                  { icon:"⭐", label:"Avg Rating",         val:stats.avgRating+"/5",                  color:"#EC4899" },
                ].map(s=>(
                  <div key={s.label} style={{ ...B() }}>
                    <div style={{ fontSize:11, color:T.sub, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>{s.icon} {s.label}</div>
                    <div style={{ fontSize:28, fontWeight:800, color:s.color }}>{s.val}</div>
                  </div>
                ))}
              </div>

              <div style={{ ...B({ padding:0, overflow:"hidden" }) }}>
                <div style={{ padding:"14px 18px", borderBottom:`1px solid ${T.border}`, fontSize:14, fontWeight:700 }}>📊 Route Performance</div>
                <table style={{ width:"100%", borderCollapse:"collapse" }}>
                  <thead>
                    <tr style={{ background:"rgba(255,255,255,0.03)" }}>
                      {["Route","Views","Starts","Completions","Completion Rate","Shade Score"].map(h=>(
                        <th key={h} style={{ padding:"9px 16px", fontSize:11, color:T.sub, fontWeight:600, textAlign:"left", textTransform:"uppercase", letterSpacing:"0.06em", borderBottom:`1px solid ${T.border}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {routes.sort((a,b)=>b.views-a.views).map((r,i)=>{
                      const rate = Math.round((r.completions/r.starts)*100);
                      return (
                        <tr key={r.id} className="hr" style={{ borderBottom:i<routes.length-1?`1px solid ${T.border}`:"none", transition:"background 0.15s" }}>
                          <td style={{ padding:"10px 16px", fontSize:13, fontWeight:600 }}>{r.emoji} {r.name}</td>
                          <td style={{ padding:"10px 16px", fontSize:13, color:T.blue, fontWeight:700 }}>{r.views}</td>
                          <td style={{ padding:"10px 16px", fontSize:13, color:T.sub }}>{r.starts}</td>
                          <td style={{ padding:"10px 16px", fontSize:13, color:T.green, fontWeight:700 }}>{r.completions}</td>
                          <td style={{ padding:"10px 16px" }}>
                            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                              <div style={{ flex:1, height:4, background:"rgba(255,255,255,0.07)", borderRadius:2, overflow:"hidden" }}>
                                <div style={{ height:"100%", width:`${rate}%`, background:rate>=70?T.green:rate>=50?T.gold:"#EF4444", borderRadius:2 }}/>
                              </div>
                              <span style={{ fontSize:11, color:T.sub, minWidth:30 }}>{rate}%</span>
                            </div>
                          </td>
                          <td style={{ padding:"10px 16px", fontSize:13, color:r.shadeScore>=7?T.green:r.shadeScore>=5?T.gold:"#EF4444", fontWeight:700 }}>{r.shadeScore}/10</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── ADD ROUTE TAB ── */}
          {tab==="add" && (
            <div className="si" style={{ maxWidth:700 }}>
              <div style={{ ...B(), marginBottom:16 }}>
                <div style={{ fontSize:14, fontWeight:700, marginBottom:16 }}>➕ Add New Walking Route</div>
                {[
                  { label:"Route Name",         placeholder:"e.g. Downtown Night Walk" },
                  { label:"Area / Neighbourhood",placeholder:"e.g. Downtown Dubai" },
                  { label:"Short Tagline",       placeholder:"e.g. Experience Dubai after dark" },
                  { label:"Distance (km)",        placeholder:"e.g. 2.5" },
                  { label:"Duration (minutes)",   placeholder:"e.g. 40" },
                  { label:"Metro Access",         placeholder:"e.g. Burj Khalifa/Dubai Mall Metro (Red Line)" },
                  { label:"Best Time to Go",      placeholder:"e.g. Evening 6pm–10pm" },
                  { label:"Time to Avoid",        placeholder:"e.g. 11am–4pm (no shade)" },
                  { label:"Cover Image URL",      placeholder:"https://images.unsplash.com/..." },
                ].map(f=>(
                  <div key={f.label} style={{ marginBottom:14 }}>
                    <label style={{ fontSize:12, color:T.sub, display:"block", marginBottom:6, fontWeight:600 }}>{f.label}</label>
                    <input placeholder={f.placeholder} style={{ ...inp }}/>
                  </div>
                ))}
                <div style={{ marginBottom:14 }}>
                  <label style={{ fontSize:12, color:T.sub, display:"block", marginBottom:6, fontWeight:600 }}>Shade Level (1–10)</label>
                  <input type="range" min={1} max={10} defaultValue={5} style={{ width:"100%", accentColor:"#10B981" }}/>
                </div>
                <div style={{ display:"flex", gap:10 }}>
                  <label style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, color:T.sub, cursor:"pointer" }}>
                    <input type="checkbox" style={{ accentColor:"#10B981" }}/> Has indoor AC stops
                  </label>
                  <label style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, color:T.sub, cursor:"pointer" }}>
                    <input type="checkbox" style={{ accentColor:"#10B981" }}/> Featured route
                  </label>
                </div>
              </div>

              <div style={{ ...B({ marginBottom:16 }) }}>
                <div style={{ fontSize:14, fontWeight:700, marginBottom:12 }}>📍 Add Steps</div>
                <div style={{ background:"rgba(16,185,129,0.06)", border:"1px solid rgba(16,185,129,0.15)", borderRadius:10, padding:"12px 14px", marginBottom:14 }}>
                  <div style={{ fontSize:12, color:"#10B981", fontWeight:600, marginBottom:4 }}>How to add steps</div>
                  <div style={{ fontSize:12, color:T.sub, lineHeight:1.7 }}>Each step needs: instruction text, landmark description ("you'll see..."), Unsplash photo URL, walking duration in minutes, GPS coordinates (lat/lng from Google Maps), and shade/indoor settings.</div>
                </div>
                <button onClick={()=>toast("✅ Step editor opening — this connects to the route builder")}
                  style={{ background:"rgba(16,185,129,0.12)", border:"1px solid rgba(16,185,129,0.3)", borderRadius:10, padding:"10px 20px", color:"#10B981", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>
                  + Add Step
                </button>
              </div>

              <button onClick={()=>toast("✅ Route saved! It will appear on the walking routes page.")}
                style={{ width:"100%", padding:"14px", background:"linear-gradient(135deg,#10B981,#059669)", border:"none", borderRadius:12, color:"#fff", fontSize:15, fontWeight:800, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>
                💾 Save New Route
              </button>
            </div>
          )}

          {/* ── SETTINGS TAB ── */}
          {tab==="settings" && (
            <div className="si" style={{ maxWidth:600 }}>
              <div style={{ ...B({ marginBottom:16 }) }}>
                <div style={{ fontSize:14, fontWeight:700, marginBottom:16 }}>⚙️ Walking Routes Settings</div>
                {[
                  { label:"Section Title",         val:"Dubai Walking Routes" },
                  { label:"Section Subtitle",      val:"10 hand-crafted tourist walks with GPS" },
                  { label:"WhatsApp Number",       val:"+971544735060" },
                  { label:"Max routes on homepage",val:"10" },
                ].map(f=>(
                  <div key={f.label} style={{ marginBottom:14 }}>
                    <label style={{ fontSize:12, color:T.sub, display:"block", marginBottom:6, fontWeight:600 }}>{f.label}</label>
                    <input defaultValue={f.val} style={{ ...inp }}/>
                  </div>
                ))}
                <div style={{ marginBottom:14 }}>
                  <label style={{ fontSize:12, color:T.sub, display:"block", marginBottom:8, fontWeight:600 }}>Feature toggles</label>
                  {[
                    { label:"Show GPS tracking button", checked:true },
                    { label:"Show shade score on cards", checked:true },
                    { label:"Show offline download prompt", checked:true },
                    { label:"Show 'Book guided tour' CTA", checked:true },
                    { label:"Show map on route pages", checked:true },
                  ].map(f=>(
                    <label key={f.label} style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 0", fontSize:13, color:T.sub, cursor:"pointer", borderBottom:`1px solid ${T.border}` }}>
                      <input type="checkbox" defaultChecked={f.checked} style={{ accentColor:"#10B981" }}/>{f.label}
                    </label>
                  ))}
                </div>
                <button onClick={()=>toast("✅ Settings saved!")}
                  style={{ background:"linear-gradient(135deg,#10B981,#059669)", border:"none", borderRadius:10, padding:"12px 28px", color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>
                  💾 Save Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {notif && (
        <div style={{ position:"fixed", bottom:24, right:24, zIndex:9999, background:"rgba(16,185,129,0.95)", color:"#fff", padding:"12px 20px", borderRadius:12, fontSize:13, fontWeight:600, boxShadow:"0 8px 28px rgba(0,0,0,0.4)" }}>
          {notif}
        </div>
      )}
    </div>
  );
}
