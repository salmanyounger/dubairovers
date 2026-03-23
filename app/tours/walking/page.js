"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import WALKING_ROUTES from "./data/walking-routes";

export default function WalkingRoutesPage() {
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [hovId, setHovId] = useState(null);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const T = { bg:"#080810", card:"rgba(255,255,255,0.04)", border:"rgba(255,255,255,0.08)", text:"#F1F5F9", sub:"rgba(255,255,255,0.45)", gold:"#F59E0B", green:"#10B981", blue:"#3B82F6" };

  const filtered = WALKING_ROUTES.filter(r => {
    const ms = !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.area.toLowerCase().includes(search.toLowerCase());
    const mf = filter === "all"
      || (filter === "shaded" && r.shadeScore >= 7)
      || (filter === "ac" && r.indoorAC)
      || (filter === "short" && r.duration <= 30)
      || (filter === "evening" && r.bestTime.toLowerCase().includes("evening"));
    return ms && mf;
  });

  const shadeBar = (score) => (
    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
      <div style={{ flex:1, height:4, background:"rgba(255,255,255,0.08)", borderRadius:2, overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${score*10}%`, background: score>=7?"#10B981":score>=5?"#F59E0B":"#EF4444", borderRadius:2 }}/>
      </div>
      <span style={{ fontSize:10, color:T.sub, minWidth:20 }}>{score}/10</span>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Inter',sans-serif" }}>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.15);border-radius:10px}
        .route-card{transition:all 0.3s ease;cursor:pointer;}
        .route-card:hover{transform:translateY(-8px)!important;box-shadow:0 24px 60px rgba(0,0,0,0.5)!important;}
        .filter-btn{transition:all 0.2s ease;}
        .filter-btn:hover{opacity:1!important;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
        .fade{animation:fadeUp 0.5s ease}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
      `}</style>

      {/* ── HERO ── */}
      <div style={{ position:"relative", overflow:"hidden", background:"linear-gradient(135deg,rgba(16,185,129,0.12),rgba(59,130,246,0.08))", borderBottom:`1px solid ${T.border}`, padding:"48px 24px 40px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", textAlign:"center" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.25)", borderRadius:20, padding:"5px 16px", marginBottom:18 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:"#10B981" }}/>
            <span style={{ fontSize:12, color:"#10B981", fontWeight:600 }}>GPS-ENABLED · OFFLINE-READY · SHADE-AWARE</span>
          </div>
          <h1 style={{ fontSize:"clamp(28px,5vw,52px)", fontWeight:900, margin:"0 0 12px", lineHeight:1.1 }}>
            🗺️ Dubai Walking Routes
          </h1>
          <p style={{ fontSize:"clamp(14px,1.8vw,18px)", color:T.sub, maxWidth:600, margin:"0 auto 24px", lineHeight:1.7 }}>
            10 hand-crafted tourist walks with landmark photos, shade routing and real-time GPS. Better than Google Maps for Dubai on foot.
          </p>
          <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
            {[
              { icon:"📸", label:"Landmark photos at every turn" },
              { icon:"🌡️", label:"Shaded & cool route preference" },
              { icon:"📵", label:"Works without internet" },
              { icon:"🔵", label:"Live GPS blue dot" },
            ].map(f => (
              <div key={f.label} style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, color:T.sub }}>
                <span>{f.icon}</span>{f.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"28px 24px" }}>

        {/* Search + filters */}
        <div style={{ display:"flex", gap:12, marginBottom:24, flexWrap:"wrap" }}>
          <div style={{ position:"relative", flex:1, minWidth:240 }}>
            <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", fontSize:16 }}>🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search routes or areas..."
              style={{ width:"100%", padding:"11px 14px 11px 42px", background:"rgba(255,255,255,0.05)", border:`1px solid ${T.border}`, borderRadius:12, color:T.text, fontSize:13, fontFamily:"Inter,sans-serif", outline:"none" }}/>
          </div>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {[
              { id:"all",     label:"All Routes" },
              { id:"shaded",  label:"🌳 Well Shaded" },
              { id:"ac",      label:"❄️ Has AC Stops" },
              { id:"short",   label:"⚡ Under 30 min" },
              { id:"evening", label:"🌇 Evening Best" },
            ].map(f => (
              <button key={f.id} onClick={()=>setFilter(f.id)} className="filter-btn"
                style={{ padding:"8px 14px", borderRadius:20, border:`1px solid ${filter===f.id?"#10B981":T.border}`, background:filter===f.id?"rgba(16,185,129,0.12)":"transparent", color:filter===f.id?"#10B981":T.sub, fontSize:12, fontWeight:filter===f.id?700:400, cursor:"pointer", fontFamily:"Inter,sans-serif", opacity: filter===f.id?1:0.7 }}>
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display:"flex", gap:20, marginBottom:28, flexWrap:"wrap" }}>
          {[
            { val:`${filtered.length} routes`, label:"available" },
            { val:"100% free", label:"no app needed" },
            { val:"GPS enabled", label:"live tracking" },
            { val:"Offline ready", label:"no data needed" },
          ].map(s => (
            <div key={s.label} style={{ fontSize:13, color:T.sub }}>
              <span style={{ fontWeight:800, color:T.text }}>{s.val}</span> {s.label}
            </div>
          ))}
        </div>

        {/* Routes grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))", gap:18 }}>
          {filtered.map(route => (
            <Link key={route.id} href={`/tours/walking/${route.id}`} style={{ textDecoration:"none" }}>
              <div className="route-card fade"
                style={{ background:T.card, border:`1.5px solid ${hovId===route.id?route.color:T.border}`, borderRadius:20, overflow:"hidden", boxShadow:hovId===route.id?`0 20px 50px rgba(0,0,0,0.4)`:none }}
                onMouseEnter={()=>setHovId(route.id)} onMouseLeave={()=>setHovId(null)}>

                {/* Image */}
                <div style={{ position:"relative", height:180, overflow:"hidden" }}>
                  <img src={route.image} alt={route.name} style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s ease", transform:hovId===route.id?"scale(1.07)":"scale(1)" }}/>
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }}/>

                  {/* Badges top left */}
                  <div style={{ position:"absolute", top:12, left:12, display:"flex", gap:6, flexWrap:"wrap" }}>
                    <span style={{ background:route.color+"33", border:`1px solid ${route.color}66`, borderRadius:20, padding:"3px 10px", fontSize:10, fontWeight:700, color:route.color }}>
                      {route.emoji} {route.area}
                    </span>
                    {route.indoorAC && <span style={{ background:"rgba(59,130,246,0.25)", border:"1px solid rgba(59,130,246,0.5)", borderRadius:20, padding:"3px 10px", fontSize:10, fontWeight:700, color:"#93C5FD" }}>❄️ AC</span>}
                  </div>

                  {/* Shade score top right */}
                  <div style={{ position:"absolute", top:12, right:12, background:"rgba(0,0,0,0.7)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, padding:"4px 8px", textAlign:"center" }}>
                    <div style={{ fontSize:10, color:T.sub }}>Shade</div>
                    <div style={{ fontSize:13, fontWeight:800, color:route.shadeScore>=7?"#10B981":route.shadeScore>=5?"#F59E0B":"#EF4444" }}>{route.shadeScore}/10</div>
                  </div>

                  {/* Bottom info */}
                  <div style={{ position:"absolute", bottom:12, left:14, right:14 }}>
                    <div style={{ fontSize:18, fontWeight:900, color:"#fff", marginBottom:2 }}>{route.name}</div>
                    <div style={{ fontSize:12, color:"rgba(255,255,255,0.6)" }}>{route.tagline}</div>
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding:"16px 18px" }}>
                  {/* Metrics */}
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:14 }}>
                    {[
                      { icon:"⏱️", val:route.duration+" min", label:"Duration" },
                      { icon:"📏", val:route.distance+" km", label:"Distance" },
                      { icon:"🎯", val:route.difficulty, label:"Difficulty" },
                    ].map(m => (
                      <div key={m.label} style={{ background:"rgba(255,255,255,0.04)", border:`1px solid ${T.border}`, borderRadius:8, padding:"8px 10px", textAlign:"center" }}>
                        <div style={{ fontSize:14, marginBottom:2 }}>{m.icon}</div>
                        <div style={{ fontSize:12, fontWeight:700, color:T.text }}>{m.val}</div>
                        <div style={{ fontSize:9, color:T.sub, textTransform:"uppercase", letterSpacing:"0.05em" }}>{m.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Shade bar */}
                  <div style={{ marginBottom:12 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                      <span style={{ fontSize:11, color:T.sub }}>🌳 Shade level</span>
                      <span style={{ fontSize:10, color:route.shadeScore>=7?"#10B981":route.shadeScore>=5?"#F59E0B":"#EF4444", fontWeight:700 }}>
                        {route.shadeScore>=7?"Well shaded":route.shadeScore>=5?"Moderate shade":"Low shade — go evening"}
                      </span>
                    </div>
                    {shadeBar(route.shadeScore)}
                  </div>

                  {/* Best time */}
                  <div style={{ background:"rgba(16,185,129,0.06)", border:"1px solid rgba(16,185,129,0.15)", borderRadius:8, padding:"8px 12px", marginBottom:14 }}>
                    <div style={{ fontSize:10, color:"#6EE7B7", fontWeight:600, marginBottom:2 }}>⏰ BEST TIME</div>
                    <div style={{ fontSize:11, color:T.sub }}>{route.bestTime}</div>
                  </div>

                  {/* Highlights */}
                  <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:14 }}>
                    {route.highlights.slice(0,3).map(h => (
                      <span key={h} style={{ fontSize:10, background:"rgba(255,255,255,0.05)", border:`1px solid ${T.border}`, borderRadius:4, padding:"2px 7px", color:T.sub }}>
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Steps count + CTA */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <div style={{ fontSize:12, color:T.sub }}>{route.steps.length} steps with landmark photos</div>
                    <div style={{ background:`linear-gradient(135deg,${route.color},${route.color}bb)`, color:"#fff", padding:"8px 16px", borderRadius:10, fontSize:12, fontWeight:700, display:"flex", alignItems:"center", gap:6, transition:"transform 0.2s", transform:hovId===route.id?"scale(1.05)":"scale(1)", boxShadow:`0 4px 14px ${route.color}40` }}>
                      Start Walk →
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign:"center", padding:"60px 20px", color:T.sub }}>
            <div style={{ fontSize:40, marginBottom:12 }}>🗺️</div>
            <div style={{ fontSize:16, fontWeight:700, color:T.text, marginBottom:8 }}>No routes match your filter</div>
            <button onClick={()=>{setFilter("all");setSearch("");}} style={{ background:"rgba(255,255,255,0.08)", border:`1px solid ${T.border}`, borderRadius:10, padding:"9px 20px", color:T.text, fontSize:13, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>Clear filters</button>
          </div>
        )}

        {/* Info footer */}
        <div style={{ marginTop:40, background:"rgba(255,255,255,0.03)", border:`1px solid ${T.border}`, borderRadius:16, padding:"20px 24px", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:20 }}>
          {[
            { icon:"📵", title:"Works Offline", desc:"Download once on hotel WiFi — all route data, photos and steps available without internet" },
            { icon:"🔵", title:"Live GPS Tracking", desc:"Your blue dot moves in real time on the route map — no guessing where you are" },
            { icon:"📸", title:"Landmark Photos", desc:"Every turn shows a real photo of what you'll see — so you know exactly when to turn" },
            { icon:"🌡️", title:"Heat-Smart Routing", desc:"Routes prefer shaded walkways, malls and covered paths — avoiding dangerous open sun" },
          ].map(i => (
            <div key={i.title}>
              <div style={{ fontSize:22, marginBottom:6 }}>{i.icon}</div>
              <div style={{ fontSize:13, fontWeight:700, color:T.text, marginBottom:4 }}>{i.title}</div>
              <div style={{ fontSize:12, color:T.sub, lineHeight:1.6 }}>{i.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp */}
      <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
        style={{ position:"fixed", bottom:24, right:24, zIndex:50, width:52, height:52, borderRadius:"50%", background:"#25D366", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, textDecoration:"none", boxShadow:"0 8px 24px rgba(37,211,102,0.4)", animation:"float 3s ease-in-out infinite" }}>
        💬
      </a>
    </div>
  );
}
