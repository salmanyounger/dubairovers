"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import PROPERTIES from "../../data/properties";

export default function SavedPage() {
  const [mounted, setMounted] = useState(false);
  const [favs, setFavs]       = useState([]);
  const [hover, setHover]     = useState(null);

  useEffect(() => {
    setMounted(true);
    try { setFavs(JSON.parse(localStorage.getItem("dp_favs") || "[]")); } catch(_){}
  }, []);

  const removeFav = (id) => {
    setFavs(prev => {
      const next = prev.filter(x => x !== id);
      localStorage.setItem("dp_favs", JSON.stringify(next));
      return next;
    });
  };

  const clearAll = () => {
    setFavs([]);
    localStorage.setItem("dp_favs", "[]");
  };

  if (!mounted) return null;

  const saved = PROPERTIES.filter(p => favs.includes(p.id));

  const T = {
    bg:"#080810", card:"rgba(255,255,255,0.04)", border:"rgba(255,255,255,0.08)",
    text:"#F1F5F9", sub:"rgba(255,255,255,0.45)", gold:"#F59E0B", green:"#10B981", blue:"#6366F1"
  };

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap"/>
      <div suppressHydrationWarning style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Inter',sans-serif" }}>
      <style suppressHydrationWarning>{`
        * { box-sizing:border-box; }
        .sv-card:hover { transform:translateY(-4px) !important; box-shadow:0 20px 48px rgba(0,0,0,0.5) !important; }
        .sv-card { transition:all 0.25s ease; }
        .rm-btn:hover { background:rgba(239,68,68,0.25) !important; color:#FCA5A5 !important; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
        .fade { animation:fadeUp 0.4s ease; }
      `}</style>

      {/* Header */}
      <div style={{ background:"rgba(0,0,0,0.4)", borderBottom:`1px solid ${T.border}`, padding:"16px 28px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontSize:22, fontWeight:800, marginBottom:2 }}>
              ❤️ Saved Properties
              {saved.length > 0 && (
                <span style={{ marginLeft:10, background:"rgba(239,68,68,0.15)", border:"1px solid rgba(239,68,68,0.35)", borderRadius:20, padding:"2px 10px", fontSize:13, color:"#FCA5A5" }}>
                  {saved.length}
                </span>
              )}
            </div>
            <div style={{ fontSize:13, color:T.sub }}>
              Properties you've saved for later — stored on this device
            </div>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            {saved.length > 0 && (
              <button onClick={clearAll} style={{ background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.25)", borderRadius:9, padding:"8px 16px", color:"#EF4444", fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>
                🗑️ Clear All
              </button>
            )}
            <Link href="/properties" style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:9, padding:"8px 16px", color:T.sub, fontSize:13, textDecoration:"none" }}>
              ← Browse Properties
            </Link>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1100, margin:"0 auto", padding:"28px 28px" }}>

        {/* Empty state */}
        {saved.length === 0 && (
          <div style={{ textAlign:"center", padding:"80px 24px" }}>
            <div style={{ fontSize:64, marginBottom:16, opacity:0.4 }}>🏙️</div>
            <div style={{ fontSize:22, fontWeight:800, color:T.text, marginBottom:8 }}>No saved properties yet</div>
            <div style={{ fontSize:14, color:T.sub, marginBottom:28, lineHeight:1.7 }}>
              Browse properties and tap the ❤️ heart button to save them here.<br/>
              Your saves are stored on this device — no account needed.
            </div>
            <Link href="/properties"
              style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"12px 28px", background:"linear-gradient(135deg,#6366F1,#4F46E5)", borderRadius:12, color:"#fff", textDecoration:"none", fontSize:14, fontWeight:700 }}>
              🔍 Browse Properties
            </Link>
          </div>
        )}

        {/* Saved grid */}
        {saved.length > 0 && (
          <>
            <div style={{ fontSize:13, color:T.sub, marginBottom:20 }}>
              {saved.length} saved propert{saved.length === 1 ? "y" : "ies"}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:18 }}>
              {saved.map(p => {
                const unit = Object.values(p.units || {})[0];
                const monthlyRent = unit?.rentYear ? Math.round(unit.rentYear / 12) : 0;
                return (
                  <div suppressHydrationWarning key={p.id} className="sv-card fade"
                    style={{ background:T.card, border:`1.5px solid ${hover===p.id?"rgba(99,102,241,0.4)":T.border}`, borderRadius:18, overflow:"hidden", boxShadow:hover===p.id?"0 16px 48px rgba(0,0,0,0.4)":"none" }}
                    onMouseEnter={() => setHover(p.id)} onMouseLeave={() => setHover(null)}>

                    {/* Image */}
                    <div style={{ position:"relative", height:180, overflow:"hidden" }}>
                      <img src={p.image} alt={p.name}
                        style={{ width:"100%", height:"100%", objectFit:"cover", transition:"transform 0.5s ease", transform:hover===p.id?"scale(1.06)":"scale(1)" }}/>
                      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }}/>

                      {/* Tags */}
                      <div style={{ position:"absolute", top:12, left:12, display:"flex", gap:6, flexWrap:"wrap" }}>
                        {p.tags?.map(t => (
                          <span key={t} style={{ background:"rgba(0,0,0,0.65)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:20, padding:"3px 9px", fontSize:10, fontWeight:700, color:"#fff" }}>{t}</span>
                        ))}
                      </div>

                      {/* Remove button */}
                      <button className="rm-btn" onClick={() => removeFav(p.id)}
                        style={{ position:"absolute", top:12, right:12, width:32, height:32, borderRadius:"50%", background:"rgba(239,68,68,0.15)", border:"1px solid rgba(239,68,68,0.35)", color:"#EF4444", fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.18s", fontFamily:"Inter,sans-serif" }}
                        title="Remove from saved">
                        ✕
                      </button>

                      {/* Bottom info */}
                      <div style={{ position:"absolute", bottom:12, left:14 }}>
                        <div style={{ fontSize:16, fontWeight:800, color:"#fff" }}>{p.name}</div>
                        <div style={{ fontSize:11, color:"rgba(255,255,255,0.65)" }}>📍 {p.area} · {p.developer}</div>
                      </div>
                    </div>

                    {/* Body */}
                    <div style={{ padding:"14px 16px" }}>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:14 }}>
                        {[
                          { icon:"💰", val:`AED ${p.pricePerSqft?.buy?.toLocaleString()}`, label:"per sqft" },
                          { icon:"📈", val:`${p.rentalYield}%`, label:"yield" },
                          { icon:"🔑", val:`AED ${monthlyRent.toLocaleString()}`, label:"rent/mo" },
                        ].map(s => (
                          <div key={s.label} style={{ background:"rgba(255,255,255,0.04)", border:`1px solid ${T.border}`, borderRadius:9, padding:"8px 10px", textAlign:"center" }}>
                            <div style={{ fontSize:14, marginBottom:2 }}>{s.icon}</div>
                            <div style={{ fontSize:11, fontWeight:700, color:T.text }}>{s.val}</div>
                            <div style={{ fontSize:9, color:T.sub, textTransform:"uppercase", letterSpacing:"0.04em" }}>{s.label}</div>
                          </div>
                        ))}
                      </div>

                      <div style={{ display:"flex", gap:8 }}>
                        <Link href={`/properties/${p.id}`}
                          style={{ flex:2, display:"flex", alignItems:"center", justifyContent:"center", gap:6, padding:"9px", background:"rgba(99,102,241,0.15)", border:"1px solid rgba(99,102,241,0.3)", borderRadius:9, color:"#818CF8", fontSize:12, fontWeight:700, textDecoration:"none" }}>
                          👁️ View Details
                        </Link>
                        <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
                          style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:6, padding:"9px", background:"rgba(37,211,102,0.12)", border:"1px solid rgba(37,211,102,0.3)", borderRadius:9, color:"#25D366", fontSize:12, fontWeight:700, textDecoration:"none" }}>
                          💬
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Compare CTA */}
            {saved.length >= 2 && (
              <div style={{ marginTop:32, background:"rgba(99,102,241,0.08)", border:"1px solid rgba(99,102,241,0.2)", borderRadius:14, padding:"18px 22px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, flexWrap:"wrap" }}>
                <div>
                  <div style={{ fontSize:15, fontWeight:700, marginBottom:3 }}>⚖️ Ready to compare?</div>
                  <div style={{ fontSize:13, color:T.sub }}>You have {saved.length} saved properties — compare any two side by side</div>
                </div>
                <Link href="/properties" style={{ padding:"10px 22px", background:"linear-gradient(135deg,#6366F1,#4F46E5)", borderRadius:10, color:"#fff", fontSize:13, fontWeight:700, textDecoration:"none" }}>
                  ⚖️ Go to Compare →
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
    </>
  );
}
