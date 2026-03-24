"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import PROPERTIES from "../../data/properties";

const ICONS = { mall:"🛍️", beach:"🏖️", metro:"🚇", grocery:"🛒", mosque:"🕌", hospital:"🏥", school:"🎓", park:"🌳", landmark:"🏛️", default:"📍" };

export default function PropertyDetail() {
  const params = useParams();
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState("overview");
  const [imgIdx, setImgIdx] = useState(0);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const prop = PROPERTIES.find(p => p.id === params.id);
  if (!prop) return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap"/>
      <div suppressHydrationWarning style={{ minHeight:"100vh", background:"#080810", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Inter',sans-serif", color:"#fff" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:52, marginBottom:16 }}>🏗️</div>
        <h1 style={{ fontSize:24, fontWeight:800, marginBottom:8 }}>Property Not Found</h1>
        <Link href="/properties" style={{ color:"#6366F1", textDecoration:"none" }}>← Back to Properties</Link>
      </div>
    </div>
    </>
  );

  const unit = Object.values(prop.units)[0];
  const monthlyRent = Math.round((unit?.rentYear || 0) / 12);
  const annualCosts = Math.round((unit?.buyPrice || 0) * 0.015);
  const netROI = (((unit?.rentYear || 0) - annualCosts) / (unit?.buyPrice || 1) * 100).toFixed(1);

  const T = {
    bg:"#080810", card:"rgba(255,255,255,0.04)", border:"rgba(255,255,255,0.08)",
    text:"#F1F5F9", sub:"rgba(255,255,255,0.45)", gold:"#F59E0B", blue:"#6366F1", green:"#10B981"
  };
  const B = (ex={}) => ({ background:T.card, border:"1px solid "+T.border, borderRadius:14, padding:"18px 20px", ...ex });

  const images = [prop.image, prop.image+"&sat=-20", prop.image+"&sat=20", prop.image+"&brightness=90"];

  return (
    <div style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Inter',sans-serif" }}>
      <style suppressHydrationWarning>{"
        *{box-sizing:border-box;} ::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-thumb{background:rgba(99,102,241,0.3);border-radius:10px}
        .prop-tab:hover{background:rgba(255,255,255,0.06)!important}
        .near-item:hover{background:rgba(99,102,241,0.08)!important;transform:translateX(3px)}
        @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
        .fade{animation:fadeUp 0.4s ease}
      "}</style>

      {/* Breadcrumb */}
      <div style={{ background:"rgba(0,0,0,0.4)", borderBottom:"1px solid ${T.border}", padding:"12px 24px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", gap:8, fontSize:13, color:T.sub }}>
          <Link href="/properties" style={{ color:T.blue, textDecoration:"none" }}>Properties</Link>
          <span>›</span><span style={{ color:T.text }}>{prop.name}</span>
        </div>
      </div>

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"28px 24px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 380px", gap:24 }}>

          {/* LEFT */}
          <div>
            {/* Image gallery */}
            <div style={{ position:"relative", borderRadius:18, overflow:"hidden", marginBottom:20, height:380 }}>
              <img src={images[imgIdx]} alt={prop.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)" }}/>
              <div style={{ position:"absolute", top:16, left:16, display:"flex", gap:8 }}>
                {prop.tags?.map(t => <span key={t} style={{ background:"rgba(0,0,0,0.7)", border:"1px solid rgba(255,255,255,0.2)", borderRadius:20, padding:"4px 10px", fontSize:11, fontWeight:700, color:"#fff" }}>{t}</span>)}
              </div>
              <div style={{ position:"absolute", bottom:16, left:16 }}>
                <div style={{ fontSize:28, fontWeight:900, color:"#fff" }}>{prop.name}</div>
                <div style={{ fontSize:14, color:"rgba(255,255,255,0.7)" }}>📍 {prop.area} · {prop.developer}</div>
              </div>
              <div style={{ position:"absolute", bottom:16, right:16, display:"flex", gap:6 }}>
                {images.map((_,i) => <button key={i} onClick={()=>setImgIdx(i)} style={{ width:i===imgIdx?24:8, height:8, borderRadius:4, border:"none", background:i===imgIdx?"#6366F1":"rgba(255,255,255,0.4)", cursor:"pointer", transition:"all 0.2s" }}/>)}
              </div>
            </div>

            {/* Tabs */}
            <div style={{ display:"flex", gap:4, marginBottom:20, background:T.card, border:"1px solid "+T.border, borderRadius:12, padding:4 }}>
              {["overview","units","amenities","nearby","roi"].map(t=>(
                <button key={t} onClick={()=>setTab(t)} className="prop-tab"
                  style={{ flex:1, padding:"8px", borderRadius:9, border:"none", background:tab===t?"#6366F1":"transparent", color:tab===t?"#fff":T.sub, fontSize:12, fontWeight:tab===t?700:400, cursor:"pointer", fontFamily:"Inter,sans-serif", textTransform:"capitalize", transition:"all 0.18s" }}>
                  {t==="roi"?"📈 ROI":t==="nearby"?"🗺️ Nearby":t==="amenities"?"✨ Amenities":t==="units"?"🏠 Units":"📋 Overview"}
                </button>
              ))}
            </div>

            <div className="fade" key={tab}>
              {tab==="overview" && (
                <div>
                  <div style={{ ...B(), marginBottom:14 }}>
                    <div style={{ fontSize:15, fontWeight:700, marginBottom:12 }}>About this property</div>
                    <p style={{ fontSize:14, color:T.sub, lineHeight:1.8 }}>{prop.description}</p>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:14 }}>
                    {[
                      { icon:"⭐", label:"Rating", val:prop.rating+"/5" },
                      { icon:"📅", label:"Built", val:prop.completion },
                      { icon:"🏗️", label:"Type", val:prop.type },
                      { icon:"🅿️", label:"Parking", val:prop.parking },
                    ].map(s=>(
                      <div key={s.label} style={{ ...B({ padding:"12px 14px", textAlign:"center" }) }}>
                        <div style={{ fontSize:20, marginBottom:4 }}>{s.icon}</div>
                        <div style={{ fontSize:14, fontWeight:700, color:T.text }}>{s.val}</div>
                        <div style={{ fontSize:10, color:T.sub, marginTop:2 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ ...B() }}>
                    <div style={{ fontSize:15, fontWeight:700, marginBottom:12 }}>✅ Pros & ⚠️ Cons</div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                      <div>
                        {prop.pros?.map((p,i)=><div key={i} style={{ display:"flex", gap:8, padding:"6px 0", fontSize:13, color:T.sub, borderBottom:i<prop.pros.length-1?"1px solid ${T.border}":"none" }}><span style={{ color:T.green }}>✓</span>{p}</div>)}
                      </div>
                      <div>
                        {prop.cons?.map((c,i)=><div key={i} style={{ display:"flex", gap:8, padding:"6px 0", fontSize:13, color:T.sub, borderBottom:i<prop.cons.length-1?"1px solid ${T.border}":"none" }}><span style={{ color:"#EF4444" }}>✗</span>{c}</div>)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {tab==="units" && (
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  {Object.entries(prop.units).map(([type, u])=>(
                    <div key={type} style={{ ...B({ display:"flex", alignItems:"center", gap:20 }) }}>
                      <div style={{ fontSize:32 }}>{type==="studio"?"🛋️":type==="1BR"?"🛏️":type==="2BR"?"🛏️🛏️":type==="3BR"?"🏠":"🏡"}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:15, fontWeight:700, marginBottom:4 }}>{type === "studio" ? "Studio" : type}</div>
                        <div style={{ fontSize:13, color:T.sub }}>{u.size?.toLocaleString()} sqft · AED {prop.pricePerSqft.buy.toLocaleString()}/sqft</div>
                      </div>
                      <div style={{ textAlign:"right" }}>
                        <div style={{ fontSize:11, color:T.sub }}>Buy Price</div>
                        <div style={{ fontSize:18, fontWeight:800, color:T.blue }}>AED {u.buyPrice?.toLocaleString()}</div>
                        <div style={{ fontSize:11, color:T.green }}>Rent: AED {u.rentYear?.toLocaleString()}/yr</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {tab==="amenities" && (
                <div style={{ ...B() }}>
                  <div style={{ fontSize:15, fontWeight:700, marginBottom:14 }}>Building Amenities</div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
                    {prop.amenities?.map((a,i)=>(
                      <div key={i} style={{ background:"rgba(99,102,241,0.08)", border:"1px solid rgba(99,102,241,0.2)", borderRadius:10, padding:"10px 14px", fontSize:13, color:T.text }}>
                        ✨ {a}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tab==="nearby" && (
                <div style={{ ...B() }}>
                  <div style={{ fontSize:15, fontWeight:700, marginBottom:14 }}>📍 Nearby Places</div>
                  {prop.nearbyPlaces?.map((place,i)=>(
                    <div key={i} className="near-item" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 8px", borderRadius:8, borderBottom:i<prop.nearbyPlaces.length-1?"1px solid ${T.border}":"none", transition:"all 0.18s", cursor:"default" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <span style={{ fontSize:20 }}>{ICONS[place.type]||"📍"}</span>
                        <div>
                          <div style={{ fontSize:13, fontWeight:600, color:T.text }}>{place.name}</div>
                          <div style={{ fontSize:11, color:T.sub, textTransform:"capitalize" }}>{place.type}</div>
                        </div>
                      </div>
                      <div style={{ background:"rgba(99,102,241,0.15)", border:"1px solid rgba(99,102,241,0.3)", borderRadius:20, padding:"3px 10px", fontSize:12, fontWeight:700, color:"#818CF8" }}>{place.dist} km</div>
                    </div>
                  ))}
                </div>
              )}

              {tab==="roi" && (
                <div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:14 }}>
                    {[
                      { icon:"📈", label:"Gross Rental Yield", val:prop.rentalYield+"%", color:T.green },
                      { icon:"💰", label:"Net ROI (est.)",      val:netROI+"%",           color:T.blue },
                      { icon:"🏆", label:"10-Year ROI",         val:prop.roi10yr+"%",     color:T.gold },
                    ].map(s=>(
                      <div key={s.label} style={{ ...B({ textAlign:"center" }) }}>
                        <div style={{ fontSize:24, marginBottom:6 }}>{s.icon}</div>
                        <div style={{ fontSize:24, fontWeight:800, color:s.color }}>{s.val}</div>
                        <div style={{ fontSize:11, color:T.sub, marginTop:4 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ ...B() }}>
                    <div style={{ fontSize:15, fontWeight:700, marginBottom:14 }}>📊 Price History (AED/sqft)</div>
                    <div style={{ display:"flex", alignItems:"flex-end", gap:8, height:100 }}>
                      {prop.priceHistory?.map((h,i)=>{
                        const max = Math.max(...prop.priceHistory.map(x=>x.pricePerSqft));
                        const min = Math.min(...prop.priceHistory.map(x=>x.pricePerSqft));
                        const pct = ((h.pricePerSqft - min) / (max - min)) * 80 + 20;
                        return (
                          <div key={h.year} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                            <div style={{ fontSize:10, color:T.gold, fontWeight:700 }}>{ h.pricePerSqft.toLocaleString()}</div>
                            <div style={{ width:"100%", height:pct+"%", background:"linear-gradient(to top, #6366F1, #818CF8)", borderRadius:"4px 4px 0 0", minHeight:8 }}/>
                            <div style={{ fontSize:9, color:T.sub }}>{h.year}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — sticky contact card */}
          <div>
            <div style={{ position:"sticky", top:20 }}>
              <div style={{ ...B({ marginBottom:14 }) }}>
                <div style={{ fontSize:13, color:T.sub, marginBottom:4 }}>Starting from</div>
                <div style={{ fontSize:30, fontWeight:900, color:T.blue, marginBottom:2 }}>AED {(unit?.buyPrice||0).toLocaleString()}</div>
                <div style={{ fontSize:13, color:T.sub, marginBottom:16 }}>AED {prop.pricePerSqft.buy.toLocaleString()}/sqft · {unit?.size?.toLocaleString()} sqft</div>

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:16 }}>
                  {[
                    { label:"Rental Yield", val:prop.rentalYield+"%", color:T.green },
                    { label:"Monthly Rent", val:"AED "+(monthlyRent).toLocaleString(), color:T.blue },
                    { label:"Service Charge", val:"AED "+prop.serviceCharge+"/sqft", color:T.sub },
                    { label:"10yr ROI", val:prop.roi10yr+"%", color:T.gold },
                  ].map(s=>(
                    <div key={s.label} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid "+T.border, borderRadius:8, padding:"10px 12px" }}>
                      <div style={{ fontSize:10, color:T.sub }}>{s.label}</div>
                      <div style={{ fontSize:14, fontWeight:700, color:s.color }}>{s.val}</div>
                    </div>
                  ))}
                </div>

                <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
                  style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, width:"100%", padding:"13px", background:"linear-gradient(135deg,#25D366,#128C7E)", border:"none", borderRadius:12, color:"#fff", fontSize:14, fontWeight:800, textDecoration:"none", marginBottom:10, cursor:"pointer" }}>
                  💬 WhatsApp Salman Ali
                </a>
                <a href="tel:+971544735060"
                  style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, width:"100%", padding:"11px", background:"rgba(99,102,241,0.15)", border:"1px solid rgba(99,102,241,0.3)", borderRadius:12, color:"#818CF8", fontSize:14, fontWeight:700, textDecoration:"none", cursor:"pointer" }}>
                  📞 Call +971 544 735 060
                </a>
              </div>

              <div style={{ ...B() }}>
                <div style={{ fontSize:13, fontWeight:700, marginBottom:10 }}>🧮 Quick Calculators</div>
                <Link href="/properties/calculator" style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 0", textDecoration:"none", borderBottom:"1px solid ${T.border}" }}>
                  <span style={{ fontSize:20 }}>🏦</span>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:T.text }}>Mortgage Calculator</div>
                    <div style={{ fontSize:11, color:T.sub }}>All 7 UAE banks</div>
                  </div>
                  <span style={{ marginLeft:"auto", color:T.blue }}>→</span>
                </Link>
                <Link href="/properties/calculator" style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 0", textDecoration:"none" }}>
                  <span style={{ fontSize:20 }}>📊</span>
                  <div>
                    <div style={{ fontSize:13, fontWeight:600, color:T.text }}>ROI Calculator</div>
                    <div style={{ fontSize:11, color:T.sub }}>Net yield & payback period</div>
                  </div>
                  <span style={{ marginLeft:"auto", color:T.blue }}>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
