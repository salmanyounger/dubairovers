"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import PROPERTIES from "./data/properties";
import { BP_PROPS, AGENTS } from "./data/blueprint-props";

// ─── ALL PROPS COMBINED ────────────────────────────────────────────────────────
const ALL_PROPS = BP_PROPS; // 30 blueprint properties as primary dataset

// ─── COLOURS ──────────────────────────────────────────────────────────────────
const BADGE_COLORS = { HOT:"#EF4444", NEW:"#10B981", PRIME:"#6366F1", OFF:"#F59E0B" };

// ─── TOAST ────────────────────────────────────────────────────────────────────
function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2500); return () => clearTimeout(t); }, [onDone]);
  return (
    <div style={{ position:"fixed", bottom:84, right:24, zIndex:9999, background:"rgba(16,185,129,0.95)", color:"#fff", padding:"12px 20px", borderRadius:12, fontSize:13, fontWeight:600, boxShadow:"0 8px 28px rgba(0,0,0,0.4)", display:"flex", alignItems:"center", gap:8, maxWidth:300 }}>
      {msg}
    </div>
  );
}

// ─── PROPERTY DETAIL MODAL ────────────────────────────────────────────────────
function PropertyModal({ prop, onClose }) {
  const [photo, setPhoto]   = useState(0);
  const [leadName, setLN]   = useState("");
  const [leadPhone, setLP]  = useState("");
  const [leadSent, setLS]   = useState(false);
  const agent = AGENTS[prop.agent] || AGENTS[0];

  const dldFee    = Math.round(prop.price * 0.04);
  const agentFee  = Math.round(prop.price * 0.02);
  const totalCost = prop.price + dldFee + agentFee;
  const monthRent = Math.round((prop.price * prop.roi / 100) / 12);
  const yearRent  = Math.round(prop.price * prop.roi / 100);
  const visa = prop.price >= 2000000 ? "10yr Golden Visa" : prop.price >= 750000 ? "2yr Visa" : "Not eligible";

  const sendLead = () => {
    if (!leadName || !leadPhone) return;
    const msg = `🏙️ *Property Inquiry*\n\n*Property:* ${prop.name}\n*Price:* AED ${prop.price.toLocaleString()}\n*ROI:* ${prop.roi}%\n\n*Name:* ${leadName}\n*Phone:* ${leadPhone}`;
    window.open(`https://wa.me/${agent.wa.replace(/[^0-9]/g,"")}?text=${encodeURIComponent(msg)}`, "_blank");
    setLS(true);
  };

  // Close on ESC
  useEffect(() => {
    const h = e => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  const T = { bg:"#080810", card:"rgba(255,255,255,0.05)", border:"rgba(255,255,255,0.08)", sub:"rgba(255,255,255,0.45)", green:"#10B981", blue:"#6366F1", gold:"#F59E0B" };
  const INP = { width:"100%", padding:"10px 14px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:9, color:"#fff", fontSize:13, fontFamily:"Inter,sans-serif", outline:"none" };

  const photos = prop.photos || [prop.photo];
  const nearby = prop.nearby || {};

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", zIndex:2000, overflowY:"auto", display:"flex", alignItems:"flex-start", justifyContent:"center", padding:"20px 16px" }}>
      <div onClick={e => e.stopPropagation()} style={{ background:"#0D0F1A", border:"1px solid rgba(255,255,255,0.1)", borderRadius:20, width:"100%", maxWidth:960, overflow:"hidden", marginTop:20 }}>
        
        {/* Photo gallery */}
        <div style={{ position:"relative", height:320, background:"#111" }}>
          <img src={photos[photo] || prop.photo} alt={prop.name} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)" }}/>
          
          {/* Close */}
          <button onClick={onClose} style={{ position:"absolute", top:16, right:16, width:36, height:36, borderRadius:"50%", background:"rgba(0,0,0,0.7)", border:"1px solid rgba(255,255,255,0.2)", color:"#fff", fontSize:18, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Inter,sans-serif" }}>✕</button>
          
          {/* Badge */}
          {prop.badge && <div style={{ position:"absolute", top:16, left:16, background:BADGE_COLORS[prop.badge]||"#6366F1", borderRadius:6, padding:"4px 12px", fontSize:11, fontWeight:800, color:"#fff" }}>{prop.badge}</div>}
          
          {/* Arrows */}
          {photos.length > 1 && (
            <>
              <button onClick={() => setPhoto(p => (p-1+photos.length)%photos.length)} style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", width:36, height:36, borderRadius:"50%", background:"rgba(0,0,0,0.6)", border:"1px solid rgba(255,255,255,0.2)", color:"#fff", fontSize:16, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>‹</button>
              <button onClick={() => setPhoto(p => (p+1)%photos.length)} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", width:36, height:36, borderRadius:"50%", background:"rgba(0,0,0,0.6)", border:"1px solid rgba(255,255,255,0.2)", color:"#fff", fontSize:16, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>›</button>
            </>
          )}
          
          {/* Thumbnails */}
          <div style={{ position:"absolute", bottom:14, left:"50%", transform:"translateX(-50%)", display:"flex", gap:6 }}>
            {photos.map((_,i) => (
              <button key={i} onClick={() => setPhoto(i)} style={{ width:i===photo?28:10, height:8, borderRadius:4, background:i===photo?"#6366F1":"rgba(255,255,255,0.5)", border:"none", cursor:"pointer", transition:"all 0.2s" }}/>
            ))}
          </div>

          {/* Property name */}
          <div style={{ position:"absolute", bottom:36, left:20 }}>
            <div style={{ fontSize:22, fontWeight:900, color:"#fff" }}>{prop.name}</div>
            <div style={{ fontSize:13, color:"rgba(255,255,255,0.7)" }}>📍 {prop.area} · {prop.emirate} · {prop.dev || prop.developer}</div>
          </div>
        </div>

        {/* Body */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:0 }}>
          
          {/* LEFT */}
          <div style={{ padding:"24px 28px", borderRight:"1px solid rgba(255,255,255,0.06)" }}>
            
            {/* Key specs */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:22 }}>
              {[
                { icon:"📈", label:"Rental Yield", val:`${prop.roi}%`, color:T.green },
                { icon:"🏗️", label:"Status", val:prop.status, color:prop.status==="Ready"?T.green:T.gold },
                { icon:"🏠", label:"Type", val:prop.type, color:"#818CF8" },
                { icon:"📐", label:"Size", val:`${prop.sqft?.toLocaleString()} sqft`, color:T.sub },
              ].map(s => (
                <div key={s.label} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:10, padding:"12px 12px", textAlign:"center" }}>
                  <div style={{ fontSize:18, marginBottom:4 }}>{s.icon}</div>
                  <div style={{ fontSize:14, fontWeight:800, color:s.color }}>{s.val}</div>
                  <div style={{ fontSize:10, color:T.sub, textTransform:"uppercase", letterSpacing:"0.05em" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Financial breakdown */}
            <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"16px 18px", marginBottom:18 }}>
              <div style={{ fontSize:13, fontWeight:700, marginBottom:12 }}>💰 Financial Summary</div>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <tbody>
                  {[
                    ["Property Price", `AED ${prop.price?.toLocaleString()}`, "#fff"],
                    ["Monthly Rental Income", `AED ${monthRent?.toLocaleString()}`, T.green],
                    ["Annual Rental Income", `AED ${yearRent?.toLocaleString()}`, T.green],
                    ["DLD Transfer Fee (4%)", `AED ${dldFee?.toLocaleString()}`, "#F87171"],
                    ["Agent Commission (2%)", `AED ${agentFee?.toLocaleString()}`, "#F87171"],
                    ["Total Cost to Buy", `AED ${totalCost?.toLocaleString()}`, T.gold],
                    ["Golden Visa", visa, visa.includes("Golden")?T.gold:T.sub],
                  ].map(([k,v,c]) => (
                    <tr key={k} style={{ borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                      <td style={{ padding:"8px 0", fontSize:12, color:T.sub }}>{k}</td>
                      <td style={{ padding:"8px 0", fontSize:13, fontWeight:600, color:c, textAlign:"right" }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Nearby amenities */}
            {Object.keys(nearby).length > 0 && (
              <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"16px 18px", marginBottom:18 }}>
                <div style={{ fontSize:13, fontWeight:700, marginBottom:12 }}>📍 Nearby Distances</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                  {Object.entries(nearby).map(([type, dist]) => {
                    const icons = {metro:"🚇", mall:"🛍️", grocery:"🛒", hospital:"🏥", school:"🎓", gym:"🏋️", beach:"🏖️", petrol:"⛽"};
                    const color = dist <= 0.5 ? T.green : dist <= 2 ? T.gold : "#EF4444";
                    return (
                      <div key={type} style={{ display:"flex", justifyContent:"space-between", padding:"6px 8px", background:"rgba(255,255,255,0.03)", borderRadius:7 }}>
                        <span style={{ fontSize:12, color:T.sub }}>{icons[type]||"📍"} {type.charAt(0).toUpperCase()+type.slice(1)}</span>
                        <span style={{ fontSize:12, fontWeight:700, color }}>{dist} km</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Description */}
            {prop.desc && (
              <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"14px 16px", marginBottom:18 }}>
                <div style={{ fontSize:13, fontWeight:700, marginBottom:8 }}>📋 About this property</div>
                <p style={{ fontSize:13, color:T.sub, lineHeight:1.7 }}>{prop.desc}</p>
              </div>
            )}

            {/* Payment plan for off-plan */}
            {prop.ppPlan && (
              <div style={{ background:"rgba(99,102,241,0.08)", border:"1px solid rgba(99,102,241,0.2)", borderRadius:12, padding:"14px 16px" }}>
                <div style={{ fontSize:13, fontWeight:700, marginBottom:10 }}>📅 Off-Plan Payment Plan (Handover: {prop.ppPlan.yr})</div>
                <div style={{ display:"flex", gap:4, alignItems:"center" }}>
                  {[["Booking", prop.ppPlan.p1], ["Construction", prop.ppPlan.p2], ["Handover", prop.ppPlan.p3], ["Post", prop.ppPlan.p4]].map(([label, pct]) => (
                    <div key={label} style={{ flex:pct, background:"#6366F1", borderRadius:4, padding:"8px 4px", textAlign:"center" }}>
                      <div style={{ fontSize:11, fontWeight:800, color:"#fff" }}>{pct}%</div>
                      <div style={{ fontSize:9, color:"rgba(255,255,255,0.7)" }}>{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT - Agent + Lead Form */}
          <div style={{ padding:"24px 22px" }}>
            
            {/* Agent card */}
            <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"16px", marginBottom:16 }}>
              <div style={{ display:"flex", gap:12, alignItems:"center", marginBottom:12 }}>
                <img src={agent.photo} alt={agent.name} style={{ width:48, height:48, borderRadius:12, objectFit:"cover" }}/>
                <div>
                  <div style={{ fontSize:14, fontWeight:700, color:"#fff" }}>{agent.name}</div>
                  <div style={{ fontSize:11, color:T.sub }}>{agent.agency}</div>
                  <div style={{ fontSize:10, color:"#6366F1", marginTop:2 }}>RERA: {agent.rera}</div>
                </div>
              </div>
              <div style={{ fontSize:11, color:T.sub, marginBottom:12 }}>
                🌐 {agent.langs?.join(" · ")}
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <a href={`https://wa.me/${agent.wa.replace(/[^0-9]/g,"")}`} target="_blank" rel="noopener noreferrer"
                  style={{ flex:1, padding:"9px", background:"linear-gradient(135deg,#25D366,#128C7E)", borderRadius:9, color:"#fff", fontSize:12, fontWeight:700, textDecoration:"none", textAlign:"center" }}>
                  💬 WhatsApp
                </a>
                <a href={`tel:${agent.wa}`}
                  style={{ flex:1, padding:"9px", background:"rgba(99,102,241,0.15)", border:"1px solid rgba(99,102,241,0.3)", borderRadius:9, color:"#818CF8", fontSize:12, fontWeight:700, textDecoration:"none", textAlign:"center" }}>
                  📞 Call
                </a>
              </div>
            </div>

            {/* Lead capture */}
            {leadSent ? (
              <div style={{ background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.3)", borderRadius:12, padding:"20px", textAlign:"center" }}>
                <div style={{ fontSize:28, marginBottom:8 }}>✅</div>
                <div style={{ fontSize:14, fontWeight:700, color:T.green, marginBottom:4 }}>Inquiry Sent!</div>
                <div style={{ fontSize:12, color:T.sub }}>Agent will contact you shortly</div>
              </div>
            ) : (
              <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"16px" }}>
                <div style={{ fontSize:13, fontWeight:700, marginBottom:12 }}>📩 Request Information</div>
                <input value={leadName} onChange={e=>setLN(e.target.value)} placeholder="Your name" style={{ ...INP, marginBottom:8 }}/>
                <input value={leadPhone} onChange={e=>setLP(e.target.value)} placeholder="Phone / WhatsApp" style={{ ...INP, marginBottom:12 }}/>
                <button onClick={sendLead} disabled={!leadName || !leadPhone}
                  style={{ width:"100%", padding:"11px", background:(leadName&&leadPhone)?"linear-gradient(135deg,#25D366,#128C7E)":"rgba(255,255,255,0.08)", border:"none", borderRadius:9, color:(leadName&&leadPhone)?"#fff":"rgba(255,255,255,0.3)", fontSize:13, fontWeight:700, cursor:(leadName&&leadPhone)?"pointer":"default", fontFamily:"Inter,sans-serif" }}>
                  💬 Send via WhatsApp
                </button>
              </div>
            )}

            {/* Investment quick stats */}
            <div style={{ marginTop:16, background:"rgba(99,102,241,0.06)", border:"1px solid rgba(99,102,241,0.15)", borderRadius:12, padding:"14px" }}>
              <div style={{ fontSize:11, color:"#818CF8", fontWeight:700, marginBottom:10 }}>📊 Quick Investment Estimate</div>
              {[
                ["Annual Return", `AED ${yearRent?.toLocaleString()}`, T.green],
                ["5yr Projected Value", `AED ${Math.round(prop.price*1.35)?.toLocaleString()}`, T.gold],
                ["Gross Yield", `${prop.roi}%`, "#818CF8"],
              ].map(([k,v,c]) => (
                <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"6px 0", borderBottom:"1px solid rgba(255,255,255,0.04)", fontSize:12 }}>
                  <span style={{ color:T.sub }}>{k}</span>
                  <span style={{ color:c, fontWeight:700 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PROPERTY CARD (NEW - blueprint style) ────────────────────────────────────
function PropCard({ prop, favs, onFav, onCompare, inCompare, onOpen, showWA }) {
  const agent = AGENTS[prop.agent] || AGENTS[0];
  const monthRent = Math.round((prop.price * prop.roi / 100) / 12);
  const isFaved = favs.includes(prop.id);

  return (
    <div style={{ background:"rgba(255,255,255,0.04)", border:`1.5px solid ${inCompare?prop.color||"#6366F1":"rgba(255,255,255,0.08)"}`, borderRadius:16, overflow:"hidden", transition:"all 0.25s", cursor:"pointer" }}
      onMouseEnter={e => { e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow="0 16px 40px rgba(0,0,0,0.4)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}>
      
      {/* Image */}
      <div onClick={() => onOpen(prop)} style={{ position:"relative", height:165, overflow:"hidden" }}>
        <img src={prop.photo} alt={prop.name} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }}/>
        
        {/* Badge */}
        {prop.badge && <div style={{ position:"absolute", top:10, left:10, background:BADGE_COLORS[prop.badge]||"#6366F1", borderRadius:5, padding:"3px 9px", fontSize:10, fontWeight:800, color:"#fff" }}>{prop.badge}</div>}
        
        {/* Fav + Compare */}
        <div style={{ position:"absolute", top:10, right:10, display:"flex", gap:6 }}>
          <button onClick={e => { e.stopPropagation(); onFav(prop.id); }}
            style={{ width:30, height:30, borderRadius:"50%", background:"rgba(0,0,0,0.6)", border:"1px solid rgba(255,255,255,0.15)", fontSize:14, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Inter,sans-serif" }}>
            {isFaved ? "❤️" : "🤍"}
          </button>
          <button onClick={e => { e.stopPropagation(); onCompare(prop); }}
            style={{ width:30, height:30, borderRadius:"50%", background:inCompare?"rgba(99,102,241,0.8)":"rgba(0,0,0,0.6)", border:`1px solid ${inCompare?"#6366F1":"rgba(255,255,255,0.15)"}`, fontSize:12, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Inter,sans-serif" }}>
            ⚖️
          </button>
        </div>

        {/* Bottom */}
        <div style={{ position:"absolute", bottom:10, left:12, right:12, display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
          <div>
            <div style={{ fontSize:13, fontWeight:800, color:"#fff" }}>{prop.name}</div>
            <div style={{ fontSize:10, color:"rgba(255,255,255,0.65)" }}>📍 {prop.area}</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:14, fontWeight:900, color:"#10B981" }}>{prop.roi}%</div>
            <div style={{ fontSize:9, color:"rgba(255,255,255,0.5)" }}>yield</div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div onClick={() => onOpen(prop)} style={{ padding:"12px 14px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
          <div>
            <div style={{ fontSize:16, fontWeight:800, color:"#fff" }}>AED {prop.price?.toLocaleString()}</div>
            <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)" }}>{prop.sqft?.toLocaleString()} sqft · {prop.status}</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:12, color:"#10B981", fontWeight:600 }}>AED {monthRent?.toLocaleString()}/mo</div>
            <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)" }}>est. rent</div>
          </div>
        </div>
        
        <div style={{ display:"flex", gap:6, marginBottom:10 }}>
          <span style={{ fontSize:10, background:"rgba(255,255,255,0.06)", borderRadius:4, padding:"2px 7px", color:"rgba(255,255,255,0.5)" }}>{prop.beds === 0 ? "Studio" : `${prop.beds} Bed`}</span>
          <span style={{ fontSize:10, background:"rgba(255,255,255,0.06)", borderRadius:4, padding:"2px 7px", color:"rgba(255,255,255,0.5)" }}>{prop.type}</span>
          <span style={{ fontSize:10, background:prop.visa?"rgba(245,158,11,0.15)":"rgba(255,255,255,0.04)", color:prop.visa?"#F59E0B":"rgba(255,255,255,0.3)", borderRadius:4, padding:"2px 7px" }}>{prop.visa ? "🏆 Visa Eligible" : "No Visa"}</span>
        </div>

        {showWA && (
          <a href={`https://wa.me/${agent.wa.replace(/[^0-9]/g,"")}`} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{ display:"block", padding:"8px", background:"rgba(37,211,102,0.15)", border:"1px solid rgba(37,211,102,0.3)", borderRadius:8, color:"#25D366", fontSize:12, fontWeight:700, textDecoration:"none", textAlign:"center" }}>
            💬 WhatsApp Agent
          </a>
        )}
      </div>
    </div>
  );
}

// ─── MARKET TRENDS (canvas charts) ────────────────────────────────────────────
function MarketTrendsTab() {
  const barRef  = useRef(null);
  const roiRef  = useRef(null);
  const lineRef = useRef(null);

  const areaData = [
    { area:"Palm Jumeirah", price:3200, roi:6.8, color:"#F97316" },
    { area:"Downtown",      price:2850, roi:7.2, color:"#6366F1" },
    { area:"Dubai Marina",  price:1850, roi:8.0, color:"#3B82F6" },
    { area:"Business Bay",  price:1700, roi:7.8, color:"#EC4899" },
    { area:"Dubai Hills",   price:1450, roi:7.4, color:"#8B5CF6" },
    { area:"JLT",           price:1200, roi:8.3, color:"#10B981" },
    { area:"JVC",           price:930,  roi:8.8, color:"#F59E0B" },
  ];

  useEffect(() => {
    // Price bar chart
    const c1 = barRef.current;
    if (!c1) return;
    const ctx1 = c1.getContext("2d");
    const W = c1.width, H = c1.height;
    ctx1.clearRect(0,0,W,H);
    const maxP = Math.max(...areaData.map(d=>d.price));
    const bw = Math.floor((W-60) / areaData.length) - 6;
    areaData.forEach((d,i) => {
      const bh = Math.round((d.price/maxP) * (H-50));
      const bx = 30 + i*(bw+6);
      const by = H - 30 - bh;
      ctx1.fillStyle = d.color + "33";
      ctx1.fillRect(bx, by, bw, bh);
      ctx1.fillStyle = d.color;
      ctx1.fillRect(bx, by, bw, 3);
      ctx1.fillStyle = "rgba(255,255,255,0.8)";
      ctx1.font = "9px Inter,sans-serif";
      ctx1.textAlign = "center";
      ctx1.fillText(d.price.toLocaleString(), bx+bw/2, by-5);
      ctx1.fillStyle = "rgba(255,255,255,0.4)";
      ctx1.fillText(d.area.split(" ")[0], bx+bw/2, H-10);
    });

    // ROI bar chart
    const c2 = roiRef.current;
    if (!c2) return;
    const ctx2 = c2.getContext("2d");
    ctx2.clearRect(0,0,c2.width,c2.height);
    const maxR = 10;
    areaData.forEach((d,i) => {
      const bh = Math.round((d.roi/maxR) * (c2.height-50));
      const bx = 30 + i*(bw+6);
      const by = c2.height - 30 - bh;
      ctx2.fillStyle = d.color + "44";
      ctx2.fillRect(bx, by, bw, bh);
      ctx2.fillStyle = d.color;
      ctx2.fillRect(bx, by, bw, 3);
      ctx2.fillStyle = "rgba(255,255,255,0.8)";
      ctx2.font = "9px Inter,sans-serif";
      ctx2.textAlign = "center";
      ctx2.fillText(d.roi + "%", bx+bw/2, by-5);
      ctx2.fillStyle = "rgba(255,255,255,0.4)";
      ctx2.fillText(d.area.split(" ")[0], bx+bw/2, c2.height-10);
    });

    // 5yr growth line chart
    const c3 = lineRef.current;
    if (!c3) return;
    const ctx3 = c3.getContext("2d");
    const W3 = c3.width, H3 = c3.height;
    ctx3.clearRect(0,0,W3,H3);
    const series = [
      { label:"Dubai", data:[1200,1350,1100,1400,1620,1780,1920], color:"#6366F1" },
      { label:"Abu Dhabi", data:[900,980,850,1050,1200,1380,1450], color:"#10B981" },
      { label:"Sharjah", data:[600,650,580,720,850,980,1050], color:"#F59E0B" },
    ];
    const years = ["2019","2020","2021","2022","2023","2024","2025"];
    const allVals = series.flatMap(s=>s.data);
    const minV = Math.min(...allVals); const maxV = Math.max(...allVals);
    const px = (i) => 40 + (i/(years.length-1)) * (W3-60);
    const py = (v) => (H3-30) - ((v-minV)/(maxV-minV)) * (H3-50);

    // Grid lines
    ctx3.strokeStyle = "rgba(255,255,255,0.06)";
    ctx3.lineWidth = 1;
    for(let g=0;g<5;g++) {
      const y = 20 + (g/4)*(H3-50);
      ctx3.beginPath(); ctx3.moveTo(40,y); ctx3.lineTo(W3-20,y); ctx3.stroke();
    }

    series.forEach(s => {
      ctx3.strokeStyle = s.color;
      ctx3.lineWidth = 2.5;
      ctx3.beginPath();
      s.data.forEach((v,i) => { if(i===0) ctx3.moveTo(px(i),py(v)); else ctx3.lineTo(px(i),py(v)); });
      ctx3.stroke();
      s.data.forEach((v,i) => {
        ctx3.fillStyle = s.color;
        ctx3.beginPath(); ctx3.arc(px(i),py(v),4,0,Math.PI*2); ctx3.fill();
      });
      // Label
      ctx3.fillStyle = s.color;
      ctx3.font = "11px Inter,sans-serif";
      ctx3.textAlign = "left";
      ctx3.fillText(s.label, px(years.length-1)+6, py(s.data[s.data.length-1])+4);
    });

    years.forEach((yr,i) => {
      ctx3.fillStyle = "rgba(255,255,255,0.35)";
      ctx3.font = "9px Inter,sans-serif";
      ctx3.textAlign = "center";
      ctx3.fillText(yr, px(i), H3-10);
    });
  }, []);

  const T = { card:"rgba(255,255,255,0.04)", border:"rgba(255,255,255,0.08)", sub:"rgba(255,255,255,0.45)" };

  const devs = [
    { n:"Emaar", emoji:"🏢", note:"AED 500K–25M · Premium", color:"#6366F1" },
    { n:"DAMAC", emoji:"🏰", note:"AED 400K–15M · Luxury", color:"#F97316" },
    { n:"Nakheel", emoji:"🌴", note:"AED 300K–10M · Communities", color:"#10B981" },
    { n:"Aldar", emoji:"🏛️", note:"AED 600K–20M · Abu Dhabi", color:"#F59E0B" },
    { n:"Sobha", emoji:"💎", note:"AED 1M–30M · Ultra-Premium", color:"#EC4899" },
    { n:"Binghatti", emoji:"⚡", note:"AED 500K–8M · High ROI", color:"#8B5CF6" },
  ];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
      {/* Charts row */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:14, padding:"16px 18px" }}>
          <div style={{ fontSize:13, fontWeight:700, marginBottom:14 }}>📊 Price per sqft by Area (AED)</div>
          <canvas ref={barRef} width={380} height={180} style={{ width:"100%", display:"block" }}/>
        </div>
        <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:14, padding:"16px 18px" }}>
          <div style={{ fontSize:13, fontWeight:700, marginBottom:14 }}>📈 Rental Yield % by Area</div>
          <canvas ref={roiRef} width={380} height={180} style={{ width:"100%", display:"block" }}/>
        </div>
      </div>

      {/* 5yr growth */}
      <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:14, padding:"16px 18px" }}>
        <div style={{ fontSize:13, fontWeight:700, marginBottom:14 }}>📉 5-Year Price Growth — Dubai vs Abu Dhabi vs Sharjah (AED/sqft)</div>
        <canvas ref={lineRef} width={800} height={200} style={{ width:"100%", display:"block" }}/>
      </div>

      {/* Top developers */}
      <div>
        <div style={{ fontSize:14, fontWeight:700, marginBottom:14 }}>🏗️ Top UAE Developers</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
          {devs.map(d => (
            <div key={d.n} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"16px 16px", display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:44, height:44, borderRadius:11, background:`${d.color}20`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{d.emoji}</div>
              <div>
                <div style={{ fontSize:14, fontWeight:700, color:"#fff" }}>{d.n}</div>
                <div style={{ fontSize:11, color:T.sub }}>{d.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Market stats bar */}
      <div style={{ background:"rgba(99,102,241,0.06)", border:"1px solid rgba(99,102,241,0.15)", borderRadius:12, padding:"14px 20px", display:"flex", gap:24, flexWrap:"wrap" }}>
        {[
          { label:"Dubai Avg ROI", val:"7.8%", trend:"▲", color:"#10B981" },
          { label:"Abu Dhabi Avg ROI", val:"6.5%", trend:"▲", color:"#10B981" },
          { label:"Avg Price/sqft Dubai", val:"AED 1,650", trend:"▲", color:"#F59E0B" },
          { label:"Transaction Volume 2025", val:"↑ 23% YoY", trend:"", color:"#818CF8" },
          { label:"Golden Visa Threshold", val:"AED 2M", trend:"", color:"#F59E0B" },
        ].map(s => (
          <div key={s.label} style={{ textAlign:"center" }}>
            <div style={{ fontSize:16, fontWeight:800, color:s.color }}>{s.trend} {s.val}</div>
            <div style={{ fontSize:10, color:T.sub, marginTop:2 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── INVESTMENT INTELLIGENCE ────────────────────────────────────────────────
function InvestTab() {
  const [roiAmt,    setRoiAmt]    = useState(2000000);
  const [roiPct,    setRoiPct]    = useState(7.5);
  const [roiYrs,    setRoiYrs]    = useState(5);
  const [mortPrice, setMortPrice] = useState(2000000);
  const [mortDown,  setMortDown]  = useState(20);
  const [mortRate,  setMortRate]  = useState(4.19);
  const [mortYrs,   setMortYrs]   = useState(25);
  const [visaAmt,   setVisaAmt]   = useState(2000000);
  const [convAmt,   setConvAmt]   = useState(100000);
  const chartRef = useRef(null);

  // ROI calcs
  const yearlyIncome = Math.round(roiAmt * roiPct / 100);
  const monthlyIncome = Math.round(yearlyIncome / 12);
  const totalValue = Math.round(roiAmt + yearlyIncome * roiYrs + roiAmt * 0.04 * roiYrs);
  const totalGain  = totalValue - roiAmt;

  // Mortgage calcs
  const loan = mortPrice * (1 - mortDown/100);
  const r = mortRate / 100 / 12;
  const N = mortYrs * 12;
  const monthly = Math.round(loan * (r * Math.pow(1+r,N)) / (Math.pow(1+r,N) - 1));
  const totalPay = monthly * N;
  const totalInt = totalPay - loan;

  // Visa tier
  const visaTier = visaAmt >= 2000000 ? { tier:"10-Year Golden Visa", color:"#F59E0B", icon:"🏆" }
                 : visaAmt >= 750000  ? { tier:"2-Year Investor Visa", color:"#10B981", icon:"🎟️" }
                 : { tier:"Not Eligible", color:"#EF4444", icon:"❌" };

  // Currency rates (vs AED)
  const rates = [
    { code:"USD", flag:"🇺🇸", rate:0.2723 },
    { code:"GBP", flag:"🇬🇧", rate:0.2142 },
    { code:"EUR", flag:"🇪🇺", rate:0.2501 },
    { code:"PKR", flag:"🇵🇰", rate:75.82 },
    { code:"INR", flag:"🇮🇳", rate:22.74 },
    { code:"SAR", flag:"🇸🇦", rate:1.0213 },
    { code:"CNY", flag:"🇨🇳", rate:1.975 },
    { code:"EGP", flag:"🇪🇬", rate:13.32 },
  ];

  // Draw growth chart
  useEffect(() => {
    const c = chartRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const W = c.width, H = c.height;
    ctx.clearRect(0,0,W,H);
    const yrs = Array.from({length:roiYrs+1},(_,i)=>i);
    const vals = yrs.map(y => roiAmt + (yearlyIncome*y) + (roiAmt*0.04*y));
    const maxV = Math.max(...vals);
    const px = (i) => 30 + (i/roiYrs)*(W-50);
    const py = (v) => (H-20) - ((v-roiAmt)/(maxV-roiAmt))*(H-35);

    ctx.strokeStyle = "rgba(99,102,241,0.15)"; ctx.lineWidth=1;
    for(let g=0;g<5;g++){const y=15+(g/4)*(H-35);ctx.beginPath();ctx.moveTo(30,y);ctx.lineTo(W-20,y);ctx.stroke();}

    ctx.strokeStyle="#6366F1"; ctx.lineWidth=2.5;
    ctx.beginPath();
    yrs.forEach((y,i) => { if(i===0) ctx.moveTo(px(i),py(vals[i])); else ctx.lineTo(px(i),py(vals[i])); });
    ctx.stroke();

    // Fill
    ctx.fillStyle="rgba(99,102,241,0.1)";
    ctx.beginPath();
    ctx.moveTo(px(0),H-20);
    yrs.forEach((y,i) => ctx.lineTo(px(i),py(vals[i])));
    ctx.lineTo(px(roiYrs),H-20); ctx.closePath(); ctx.fill();

    yrs.forEach((y,i) => {
      ctx.fillStyle="#6366F1"; ctx.beginPath(); ctx.arc(px(i),py(vals[i]),3,0,Math.PI*2); ctx.fill();
      ctx.fillStyle="rgba(255,255,255,0.4)"; ctx.font="9px Inter,sans-serif"; ctx.textAlign="center";
      ctx.fillText("Yr "+y,px(i),H-6);
    });
  }, [roiAmt, roiPct, roiYrs, yearlyIncome]);

  const T = { card:"rgba(255,255,255,0.04)", border:"rgba(255,255,255,0.08)", sub:"rgba(255,255,255,0.45)", green:"#10B981", blue:"#6366F1", gold:"#F59E0B" };
  const INP = { width:"100%", padding:"9px 12px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#fff", fontSize:13, fontFamily:"Inter,sans-serif", outline:"none" };
  const SL = { width:"100%", accentColor:"#6366F1" };

  const BANKS = [
    { name:"ADIB", rate:4.09 }, { name:"DIB", rate:4.19 }, { name:"ADCB", rate:4.29 },
    { name:"Mashreq", rate:4.59 }, { name:"ENBD", rate:4.49 }, { name:"FAB", rate:4.49 }, { name:"RAKBANK", rate:4.79 },
  ];

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
      
      {/* ROI Calculator */}
      <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:14, padding:"20px 22px" }}>
        <div style={{ fontSize:14, fontWeight:700, marginBottom:18 }}>📈 ROI Investment Calculator</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
          <div>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div>
                <div style={{ fontSize:11, color:T.sub, marginBottom:5 }}>Investment Amount: <strong style={{color:"#fff"}}>AED {roiAmt.toLocaleString()}</strong></div>
                <input type="range" min={200000} max={25000000} step={100000} value={roiAmt} onChange={e=>setRoiAmt(+e.target.value)} style={SL}/>
              </div>
              <div>
                <div style={{ fontSize:11, color:T.sub, marginBottom:5 }}>Annual ROI %: <strong style={{color:"#10B981"}}>{roiPct}%</strong></div>
                <input type="range" min={3} max={15} step={0.1} value={roiPct} onChange={e=>setRoiPct(+e.target.value)} style={SL}/>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                {[1,3,5,10].map(y => (
                  <button key={y} onClick={()=>setRoiYrs(y)}
                    style={{ flex:1, padding:"7px", background:roiYrs===y?"#6366F1":"rgba(255,255,255,0.06)", border:`1px solid ${roiYrs===y?"#6366F1":"rgba(255,255,255,0.1)"}`, borderRadius:8, color:roiYrs===y?"#fff":"rgba(255,255,255,0.5)", fontSize:12, fontWeight:roiYrs===y?700:400, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>
                    {y}yr
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginTop:14 }}>
              {[
                { label:"Monthly Income", val:`AED ${monthlyIncome.toLocaleString()}`, color:T.green },
                { label:"Yearly Income",  val:`AED ${yearlyIncome.toLocaleString()}`,  color:T.green },
                { label:"Total Value",    val:`AED ${totalValue.toLocaleString()}`,    color:T.gold },
                { label:"Total Gain",     val:`AED ${totalGain.toLocaleString()}`,     color:"#818CF8" },
              ].map(s => (
                <div key={s.label} style={{ background:"rgba(255,255,255,0.04)", border:`1px solid ${T.border}`, borderRadius:9, padding:"10px 12px", textAlign:"center" }}>
                  <div style={{ fontSize:14, fontWeight:800, color:s.color }}>{s.val}</div>
                  <div style={{ fontSize:10, color:T.sub }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize:11, color:T.sub, marginBottom:8 }}>Growth Projection Chart</div>
            <canvas ref={chartRef} width={320} height={160} style={{ width:"100%", display:"block" }}/>
            <div style={{ marginTop:10, display:"flex", flexDirection:"column", gap:4 }}>
              {Array.from({length:roiYrs},(_, i)=>i+1).map(yr => {
                const val = Math.round(roiAmt + yearlyIncome*yr + roiAmt*0.04*yr);
                return <div key={yr} style={{ display:"flex", justifyContent:"space-between", fontSize:11, padding:"3px 0", borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{color:T.sub}}>Year {yr}</span>
                  <span style={{color:"#818CF8",fontWeight:600}}>AED {val.toLocaleString()}</span>
                </div>;
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mortgage Calculator */}
      <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:14, padding:"20px 22px" }}>
        <div style={{ fontSize:14, fontWeight:700, marginBottom:16 }}>🏦 Mortgage Calculator — All 7 UAE Banks</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <div>
              <div style={{ fontSize:11, color:T.sub, marginBottom:5 }}>Property Price: <strong style={{color:"#fff"}}>AED {mortPrice.toLocaleString()}</strong></div>
              <input type="range" min={500000} max={15000000} step={100000} value={mortPrice} onChange={e=>setMortPrice(+e.target.value)} style={SL}/>
            </div>
            <div>
              <div style={{ fontSize:11, color:T.sub, marginBottom:5 }}>Down Payment: <strong style={{color:T.gold}}>{mortDown}% = AED {Math.round(mortPrice*mortDown/100).toLocaleString()}</strong></div>
              <input type="range" min={20} max={50} step={5} value={mortDown} onChange={e=>setMortDown(+e.target.value)} style={SL}/>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:8 }}>
              {[
                { label:"Monthly Payment", val:`AED ${monthly.toLocaleString()}`, color:"#818CF8" },
                { label:"Loan Amount",     val:`AED ${Math.round(loan).toLocaleString()}`, color:T.sub },
                { label:"Total Interest",  val:`AED ${Math.round(totalInt).toLocaleString()}`, color:"#F87171" },
                { label:"Total Payment",   val:`AED ${Math.round(totalPay).toLocaleString()}`, color:T.gold },
              ].map(s => (
                <div key={s.label} style={{ background:"rgba(255,255,255,0.04)", borderRadius:8, padding:"8px", textAlign:"center" }}>
                  <div style={{ fontSize:11, fontWeight:700, color:s.color }}>{s.val}</div>
                  <div style={{ fontSize:9, color:T.sub }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontSize:11, color:T.sub, marginBottom:8 }}>All UAE Bank Rates (sorted by cost)</div>
            {[...BANKS].sort((a,b)=>a.rate-b.rate).map(bank => {
              const br = bank.rate/100/12;
              const bm = Math.round(loan * (br * Math.pow(1+br,N)) / (Math.pow(1+br,N) - 1));
              const isSel = bank.rate === mortRate;
              return (
                <div key={bank.name} onClick={()=>setMortRate(bank.rate)}
                  style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 12px", marginBottom:4, background:isSel?"rgba(99,102,241,0.12)":"rgba(255,255,255,0.03)", border:`1px solid ${isSel?"rgba(99,102,241,0.4)":"rgba(255,255,255,0.06)"}`, borderRadius:8, cursor:"pointer" }}>
                  <div style={{ fontSize:12, fontWeight:isSel?700:400, color:isSel?"#818CF8":"#fff" }}>{bank.name} — {bank.rate}%</div>
                  <div style={{ fontSize:12, fontWeight:700, color:isSel?"#818CF8":"rgba(255,255,255,0.5)" }}>AED {bm.toLocaleString()}/mo</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Golden Visa + Currency side by side */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        
        {/* Golden Visa */}
        <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:14, padding:"20px 22px" }}>
          <div style={{ fontSize:14, fontWeight:700, marginBottom:16 }}>🏆 Golden Visa Eligibility</div>
          <div style={{ marginBottom:12 }}>
            <div style={{ fontSize:11, color:T.sub, marginBottom:5 }}>Property Value: <strong style={{color:"#fff"}}>AED {visaAmt.toLocaleString()}</strong></div>
            <input type="range" min={200000} max={5000000} step={50000} value={visaAmt} onChange={e=>setVisaAmt(+e.target.value)} style={SL}/>
          </div>
          <div style={{ background:`${visaTier.color}18`, border:`1px solid ${visaTier.color}44`, borderRadius:12, padding:"20px", textAlign:"center" }}>
            <div style={{ fontSize:32, marginBottom:8 }}>{visaTier.icon}</div>
            <div style={{ fontSize:18, fontWeight:800, color:visaTier.color, marginBottom:4 }}>{visaTier.tier}</div>
          </div>
          <div style={{ marginTop:12, display:"flex", flexDirection:"column", gap:6 }}>
            {[["AED 2,000,000+", "🏆 10-Year Golden Visa", "#F59E0B"], ["AED 750,000+", "🎟️ 2-Year Investor Visa", "#10B981"], ["Below AED 750K", "❌ Not Eligible", "#EF4444"]].map(([amt,label,color]) => (
              <div key={amt} style={{ display:"flex", justifyContent:"space-between", fontSize:12, padding:"6px 8px", background:"rgba(255,255,255,0.03)", borderRadius:7 }}>
                <span style={{color:T.sub}}>{amt}</span>
                <span style={{color,fontWeight:600}}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Currency Converter */}
        <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:14, padding:"20px 22px" }}>
          <div style={{ fontSize:14, fontWeight:700, marginBottom:16 }}>💱 Annual Rental Return in Your Currency</div>
          <div style={{ marginBottom:14 }}>
            <div style={{ fontSize:11, color:T.sub, marginBottom:5 }}>Annual AED Amount: <strong style={{color:"#fff"}}>AED {convAmt.toLocaleString()}</strong></div>
            <input type="range" min={20000} max={500000} step={5000} value={convAmt} onChange={e=>setConvAmt(+e.target.value)} style={SL}/>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {rates.map(r => (
              <div key={r.code} style={{ display:"flex", justifyContent:"space-between", padding:"7px 10px", background:"rgba(255,255,255,0.03)", borderRadius:7, alignItems:"center" }}>
                <span style={{ fontSize:13 }}>{r.flag} {r.code}</span>
                <span style={{ fontSize:13, fontWeight:700, color:"#818CF8" }}>{Math.round(convAmt * r.rate).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Country ROI comparison */}
      <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:14, padding:"20px 22px" }}>
        <div style={{ fontSize:14, fontWeight:700, marginBottom:14 }}>🌍 Country ROI Comparison</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
          {[
            { country:"UAE", flag:"🇦🇪", roi:"7.5%", note:"Tax-free rental income", color:T.green, top:true },
            { country:"Pakistan", flag:"🇵🇰", roi:"9.2%", note:"High yield, higher risk", color:T.gold, top:false },
            { country:"India", flag:"🇮🇳", roi:"6.8%", note:"Stable, good growth", color:"#818CF8", top:false },
            { country:"Germany", flag:"🇩🇪", roi:"3.8%", note:"Low yield, very stable", color:T.sub, top:false },
          ].map(c => (
            <div key={c.country} style={{ background:c.top?"rgba(16,185,129,0.08)":"rgba(255,255,255,0.03)", border:`1px solid ${c.top?"rgba(16,185,129,0.25)":T.border}`, borderRadius:12, padding:"16px", textAlign:"center" }}>
              <div style={{ fontSize:28, marginBottom:6 }}>{c.flag}</div>
              <div style={{ fontSize:22, fontWeight:900, color:c.color, marginBottom:2 }}>{c.roi}</div>
              <div style={{ fontSize:13, fontWeight:700, color:"#fff", marginBottom:4 }}>{c.country}</div>
              <div style={{ fontSize:10, color:T.sub, lineHeight:1.5 }}>{c.note}</div>
              {c.top && <div style={{ marginTop:8, fontSize:9, color:c.color, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em" }}>● BEST CHOICE</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function PropertiesPage() {
  const [tab,       setTab]       = useState("search");
  const [search,    setSearch]    = useState("");
  const [areaFilt,  setAreaFilt]  = useState("All");
  const [typeFilt,  setTypeFilt]  = useState("All");
  const [emFilt,    setEmFilt]    = useState("All");
  const [statusFilt,setStatusFilt]= useState("All");
  const [sortBy,    setSortBy]    = useState("roi");
  const [compare,   setCompare]   = useState([]); // max 3 props
  const [favs,      setFavs]      = useState([]);
  const [modal,     setModal]     = useState(null);
  const [toast,     setToast]     = useState(null);
  const [showWA,    setShowWA]    = useState(false);
  const [mounted,   setMounted]   = useState(false);

  useEffect(() => {
    setMounted(true);
    try { setFavs(JSON.parse(localStorage.getItem("dp_favs")||"[]")); } catch(_){}
    try { setShowWA(JSON.parse(localStorage.getItem("dp_showWA")||"false")); } catch(_){}
  }, []);

  const showToast = useCallback((msg) => setToast(msg), []);

  const toggleFav = useCallback((id) => {
    setFavs(prev => {
      const next = prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id];
      localStorage.setItem("dp_favs", JSON.stringify(next));
      showToast(next.includes(id) ? "❤️ Saved to favourites" : "💔 Removed from favourites");
      return next;
    });
  }, [showToast]);

  const toggleCompare = useCallback((prop) => {
    setCompare(prev => {
      if (prev.find(p=>p.id===prop.id)) return prev.filter(p=>p.id!==prop.id);
      if (prev.length >= 3) { showToast("⚠️ Max 3 properties in compare"); return prev; }
      showToast("⚖️ Added to compare");
      return [...prev, prop];
    });
  }, [showToast]);

  // Filter + sort
  const filtered = ALL_PROPS.filter(p => {
    const ms = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.area.toLowerCase().includes(search.toLowerCase()) || (p.dev||"").toLowerCase().includes(search.toLowerCase());
    const ma = areaFilt  === "All" || p.area === areaFilt;
    const mt = typeFilt  === "All" || p.type === typeFilt;
    const me = emFilt    === "All" || p.emirate === emFilt;
    const ms2= statusFilt=== "All" || p.status === statusFilt;
    return ms && ma && mt && me && ms2;
  }).sort((a,b) => {
    if (sortBy==="roi")    return b.roi - a.roi;
    if (sortBy==="pl")     return a.price - b.price;
    if (sortBy==="ph")     return b.price - a.price;
    return 0;
  });

  const areas    = [...new Set(ALL_PROPS.map(p=>p.area))].sort();
  const types    = [...new Set(ALL_PROPS.map(p=>p.type))].sort();
  const emirates = [...new Set(ALL_PROPS.map(p=>p.emirate))].sort();
  const favProps = ALL_PROPS.filter(p => favs.includes(p.id));

  if (!mounted) return <div style={{minHeight:"100vh",background:"#080810"}}/>;

  const S = {
    sel: { padding:"9px 14px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, color:"#fff", fontSize:12, fontFamily:"Inter,sans-serif", outline:"none", cursor:"pointer" },
    inp: { width:"100%", padding:"11px 16px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:10, color:"#fff", fontSize:13, fontFamily:"Inter,sans-serif", outline:"none" },
  };

  const TABS = [
    { id:"search",  icon:"🔍", label:"Search" },
    { id:"compare", icon:"⚖️", label:`Compare${compare.length ? ` (${compare.length})` : ""}` },
    { id:"trends",  icon:"📊", label:"Market Trends" },
    { id:"invest",  icon:"💰", label:"Investment" },
    { id:"favs",    icon:"❤️", label:`Saved${favs.length ? ` (${favs.length})` : ""}` },
  ];

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"/>
      <div suppressHydrationWarning style={{ minHeight:"100vh", background:"#080810", color:"#fff", fontFamily:"'Inter',sans-serif" }}>
        <style suppressHydrationWarning>{`
          *{box-sizing:border-box}
          ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:rgba(99,102,241,0.3);border-radius:10px}
          @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
          .fade{animation:fadeUp 0.4s ease}
          .pc:hover{transform:translateY(-4px)!important;box-shadow:0 16px 40px rgba(0,0,0,0.5)!important}
          .tb:hover{color:#fff!important}
          select option{background:#0D0F1A;color:#fff}
          input[type=range]{accent-color:#6366F1;width:100%}
        `}</style>

        {/* ── TOP INFO BAR ── */}
        <div style={{ background:"rgba(0,0,0,0.5)", borderBottom:"1px solid rgba(255,255,255,0.05)", padding:"6px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", fontSize:11 }}>
          <div style={{ display:"flex", gap:20, color:"rgba(255,255,255,0.4)" }}>
            <span>💱 AED/USD: <strong style={{color:"#fff"}}>3.67</strong></span>
            <span>💵 AED/PKR: <strong style={{color:"#fff"}}>83.2</strong></span>
            <span>📈 Dubai Index: <strong style={{color:"#10B981"}}>▲ +1.2%</strong></span>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <span style={{ color:"rgba(255,255,255,0.35)" }}>{ALL_PROPS.length} Properties Listed</span>
          </div>
        </div>

        {/* ── STICKY NAV ── */}
        <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(8,8,16,0.97)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(255,255,255,0.07)", padding:"0 24px" }}>
          <div style={{ maxWidth:1400, margin:"0 auto", height:62, display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
            <div style={{ display:"flex", alignItems:"center", gap:16 }}>
              <Link href="/" style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:34, height:34, borderRadius:8, background:"linear-gradient(135deg,#6366F1,#4338ca)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🏙️</div>
                <div>
                  <div style={{ fontSize:15, fontWeight:800, color:"#fff" }}>Dubai Properties</div>
                  <div style={{ fontSize:9, color:"rgba(255,255,255,0.35)", letterSpacing:"0.08em" }}>COMPARISON PLATFORM</div>
                </div>
              </Link>

              {/* Tab nav */}
              <div style={{ display:"flex", gap:3, marginLeft:16, background:"rgba(255,255,255,0.04)", borderRadius:10, padding:3 }}>
                {TABS.map(t => (
                  <button key={t.id} className="tb" onClick={() => setTab(t.id)}
                    style={{ padding:"7px 13px", borderRadius:8, border:"none", background:tab===t.id?"#6366F1":"transparent", color:tab===t.id?"#fff":"rgba(255,255,255,0.45)", fontSize:12, fontWeight:tab===t.id?700:400, cursor:"pointer", fontFamily:"Inter,sans-serif", whiteSpace:"nowrap", transition:"all 0.18s" }}>
                    {t.icon} {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              {compare.length > 0 && (
                <button onClick={() => setTab("compare")}
                  style={{ padding:"8px 16px", background:"linear-gradient(135deg,#F97316,#ec4899)", border:"none", borderRadius:8, color:"#fff", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>
                  ⚖️ Compare {compare.length}
                </button>
              )}
              <Link href="/properties/admin" style={{ padding:"7px 14px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"rgba(255,255,255,0.5)", fontSize:12, textDecoration:"none" }}>🔧 Admin</Link>
              <Link href="/" style={{ padding:"7px 12px", fontSize:12, color:"rgba(255,255,255,0.4)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:8, textDecoration:"none" }}>← Back</Link>
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <div style={{ background:"linear-gradient(135deg,rgba(99,102,241,0.12),rgba(249,115,22,0.07))", borderBottom:"1px solid rgba(255,255,255,0.05)", padding:"28px 24px" }}>
          <div style={{ maxWidth:1400, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
            <div>
              <div style={{ fontSize:"clamp(20px,3.5vw,34px)", fontWeight:900, marginBottom:6, lineHeight:1.15 }}>
                Dubai Property <span style={{ background:"linear-gradient(90deg,#6366F1,#F97316)", backgroundClip:"text", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Intelligence Platform</span>
              </div>
              <div style={{ fontSize:13, color:"rgba(255,255,255,0.45)", maxWidth:550, lineHeight:1.7 }}>
                {ALL_PROPS.length} properties · Compare side-by-side · AI Match Quiz · Market Trends · Investment Calculator · Golden Visa Checker
              </div>
            </div>
            {/* Hero search */}
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search area, property name..."
                style={{ ...S.inp, width:220 }}/>
              <select value={emFilt} onChange={e=>setEmFilt(e.target.value)} style={S.sel}>
                <option value="All">All Emirates</option>
                {emirates.map(e => <option key={e} value={e}>{e}</option>)}
              </select>
              <select value={typeFilt} onChange={e=>setTypeFilt(e.target.value)} style={S.sel}>
                <option value="All">All Types</option>
                {types.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <button onClick={() => { setTab("search"); }}
                style={{ padding:"9px 20px", background:"linear-gradient(135deg,#6366F1,#4338ca)", border:"none", borderRadius:10, color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>
                🔍 Search
              </button>
            </div>
          </div>
        </div>

        {/* ── MAIN ── */}
        <div style={{ maxWidth:1400, margin:"0 auto", padding:"24px 24px" }}>

          {/* ── SEARCH TAB ── */}
          {tab === "search" && (
            <div className="fade">
              {/* Filters row */}
              <div style={{ display:"flex", gap:10, marginBottom:20, flexWrap:"wrap", alignItems:"center" }}>
                <select value={areaFilt} onChange={e=>setAreaFilt(e.target.value)} style={S.sel}>
                  <option value="All">All Areas</option>
                  {areas.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
                <select value={statusFilt} onChange={e=>setStatusFilt(e.target.value)} style={S.sel}>
                  <option value="All">All Status</option>
                  <option value="Ready">Ready</option>
                  <option value="Off-Plan">Off-Plan</option>
                </select>
                <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={S.sel}>
                  <option value="roi">📈 Highest Yield</option>
                  <option value="pl">💰 Price: Low First</option>
                  <option value="ph">💎 Price: High First</option>
                </select>
                <span style={{ fontSize:12, color:"rgba(255,255,255,0.35)", marginLeft:"auto" }}>{filtered.length} properties</span>
              </div>

              {/* Area quick-filter chips */}
              <div style={{ display:"flex", gap:6, marginBottom:18, flexWrap:"wrap" }}>
                {["All", ...areas.slice(0,8)].map(a => (
                  <button key={a} onClick={() => setAreaFilt(a)}
                    style={{ padding:"5px 12px", borderRadius:20, border:`1px solid ${areaFilt===a?"rgba(99,102,241,0.6)":"rgba(255,255,255,0.1)"}`, background:areaFilt===a?"rgba(99,102,241,0.15)":"transparent", color:areaFilt===a?"#818CF8":"rgba(255,255,255,0.45)", fontSize:11, fontWeight:areaFilt===a?700:400, cursor:"pointer", fontFamily:"Inter,sans-serif", transition:"all 0.15s" }}>
                    {a}
                  </button>
                ))}
              </div>

              {/* Top ROI strip (first 6) */}
              {areaFilt === "All" && !search && (
                <div style={{ marginBottom:24 }}>
                  <div style={{ fontSize:13, fontWeight:700, marginBottom:12 }}>🔥 Highest ROI Properties</div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:10 }}>
                    {[...ALL_PROPS].sort((a,b)=>b.roi-a.roi).slice(0,6).map(prop => (
                      <div key={prop.id} onClick={() => setModal(prop)}
                        style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:12, padding:"12px 14px", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", transition:"all 0.2s" }}
                        onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(99,102,241,0.4)";}}
                        onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.08)";}}>
                        <div>
                          <div style={{ fontSize:12, fontWeight:600, color:"#fff", marginBottom:2 }}>{prop.name}</div>
                          <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)" }}>{prop.area}</div>
                        </div>
                        <div style={{ fontSize:18, fontWeight:900, color:"#10B981" }}>{prop.roi}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Main grid */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:16 }}>
                {filtered.map(prop => (
                  <PropCard key={prop.id} prop={prop} favs={favs} onFav={toggleFav}
                    onCompare={toggleCompare} inCompare={compare.some(c=>c.id===prop.id)}
                    onOpen={setModal} showWA={showWA}/>
                ))}
                {filtered.length === 0 && (
                  <div style={{ gridColumn:"1/-1", textAlign:"center", padding:"60px 20px", color:"rgba(255,255,255,0.3)" }}>
                    <div style={{ fontSize:40, marginBottom:12 }}>🔍</div>
                    <div>No properties match your filters</div>
                    <button onClick={()=>{setSearch("");setAreaFilt("All");setTypeFilt("All");setEmFilt("All");setStatusFilt("All");}}
                      style={{ marginTop:16, padding:"9px 20px", background:"rgba(99,102,241,0.15)", border:"1px solid rgba(99,102,241,0.3)", borderRadius:9, color:"#818CF8", fontSize:13, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── COMPARE TAB ── */}
          {tab === "compare" && (
            <div className="fade">
              {compare.length < 2 ? (
                <div style={{ textAlign:"center", padding:"60px 20px" }}>
                  <div style={{ fontSize:52, marginBottom:16 }}>⚖️</div>
                  <div style={{ fontSize:20, fontWeight:700, marginBottom:8 }}>Select 2–3 Properties to Compare</div>
                  <div style={{ fontSize:13, color:"rgba(255,255,255,0.4)", marginBottom:24 }}>Click the ⚖️ button on any property card to add it here</div>
                  <button onClick={() => setTab("search")} style={{ background:"linear-gradient(135deg,#6366F1,#4338ca)", border:"none", borderRadius:10, color:"#fff", padding:"12px 28px", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>Browse Properties →</button>
                </div>
              ) : (
                <div>
                  {/* Property headers */}
                  <div style={{ display:"grid", gridTemplateColumns:`repeat(${compare.length},1fr)`, gap:16, marginBottom:24 }}>
                    {compare.map(prop => (
                      <div key={prop.id} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(99,102,241,0.3)", borderRadius:14, overflow:"hidden" }}>
                        <div style={{ position:"relative", height:140 }}>
                          <img src={prop.photo} alt={prop.name} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)" }}/>
                          <button onClick={() => setCompare(c => c.filter(p=>p.id!==prop.id))} style={{ position:"absolute", top:8, right:8, width:28, height:28, borderRadius:"50%", background:"rgba(0,0,0,0.6)", border:"none", color:"#fff", fontSize:14, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>✕</button>
                          <div style={{ position:"absolute", bottom:10, left:12 }}>
                            <div style={{ fontSize:14, fontWeight:800, color:"#fff" }}>{prop.name}</div>
                            <div style={{ fontSize:11, color:"rgba(255,255,255,0.6)" }}>{prop.area}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Comparison table */}
                  <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:14, overflow:"hidden" }}>
                    <table style={{ width:"100%", borderCollapse:"collapse" }}>
                      <thead>
                        <tr style={{ background:"rgba(255,255,255,0.05)" }}>
                          <th style={{ padding:"12px 16px", fontSize:12, color:"rgba(255,255,255,0.4)", textAlign:"left", fontWeight:500 }}>Metric</th>
                          {compare.map(p => <th key={p.id} style={{ padding:"12px 16px", fontSize:12, color:"#818CF8", textAlign:"center", fontWeight:700 }}>{p.name}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { label:"Price", fn: p => `AED ${p.price?.toLocaleString()}`, best:"min" },
                          { label:"Rental Yield", fn: p => `${p.roi}%`, best:"max" },
                          { label:"Size (sqft)", fn: p => p.sqft?.toLocaleString(), best:"max" },
                          { label:"Beds", fn: p => p.beds===0?"Studio":`${p.beds} Bed`, best:null },
                          { label:"Status", fn: p => p.status, best:null },
                          { label:"Emirate", fn: p => p.emirate, best:null },
                          { label:"Developer", fn: p => p.dev||"—", best:null },
                          { label:"Golden Visa", fn: p => p.visa?"✅ Eligible":"❌ No", best:null },
                          { label:"Monthly Rent (est.)", fn: p => `AED ${Math.round(p.price*p.roi/100/12).toLocaleString()}`, best:"max" },
                        ].map(row => {
                          const vals = compare.map(p => row.fn(p));
                          let bestIdx = -1;
                          if (row.best) {
                            const nums = compare.map(p => {
                              const v = row.fn(p);
                              return parseFloat(v.replace(/[^0-9.]/g,"")) || 0;
                            });
                            bestIdx = row.best==="max" ? nums.indexOf(Math.max(...nums)) : nums.indexOf(Math.min(...nums));
                          }
                          return (
                            <tr key={row.label} style={{ borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                              <td style={{ padding:"11px 16px", fontSize:12, color:"rgba(255,255,255,0.5)", fontWeight:500 }}>{row.label}</td>
                              {compare.map((p,i) => (
                                <td key={p.id} style={{ padding:"11px 16px", fontSize:13, fontWeight:i===bestIdx?700:400, color:i===bestIdx?"#10B981":"rgba(255,255,255,0.75)", textAlign:"center", background:i===bestIdx?"rgba(16,185,129,0.07)":"transparent" }}>
                                  {row.fn(p)}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div style={{ marginTop:16, display:"flex", gap:10, justifyContent:"center" }}>
                    <button onClick={() => window.print()} style={{ padding:"10px 20px", background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:9, color:"rgba(255,255,255,0.7)", fontSize:13, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>🖨️ Print / Save PDF</button>
                    <button onClick={() => setCompare([])} style={{ padding:"10px 20px", background:"rgba(239,68,68,0.1)", border:"1px solid rgba(239,68,68,0.25)", borderRadius:9, color:"#EF4444", fontSize:13, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>🗑️ Clear All</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── TRENDS TAB ── */}
          {tab === "trends" && (
            <div className="fade">
              <div style={{ fontSize:18, fontWeight:800, marginBottom:22 }}>📊 UAE Property Market Trends</div>
              <MarketTrendsTab/>
            </div>
          )}

          {/* ── INVEST TAB ── */}
          {tab === "invest" && (
            <div className="fade">
              <div style={{ fontSize:18, fontWeight:800, marginBottom:22 }}>💰 Investment Intelligence</div>
              <InvestTab/>
            </div>
          )}

          {/* ── SAVED/FAVS TAB ── */}
          {tab === "favs" && (
            <div className="fade">
              {favProps.length === 0 ? (
                <div style={{ textAlign:"center", padding:"60px 20px" }}>
                  <div style={{ fontSize:52, marginBottom:16 }}>🤍</div>
                  <div style={{ fontSize:20, fontWeight:700, marginBottom:8 }}>No Saved Properties</div>
                  <div style={{ fontSize:13, color:"rgba(255,255,255,0.4)", marginBottom:24 }}>Click the ❤️ heart on any property to save it here</div>
                  <button onClick={() => setTab("search")} style={{ background:"linear-gradient(135deg,#6366F1,#4338ca)", border:"none", borderRadius:10, color:"#fff", padding:"12px 28px", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>Browse Properties →</button>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize:14, color:"rgba(255,255,255,0.4)", marginBottom:18 }}>{favProps.length} saved propert{favProps.length===1?"y":"ies"}</div>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:16 }}>
                    {favProps.map(prop => (
                      <PropCard key={prop.id} prop={prop} favs={favs} onFav={toggleFav}
                        onCompare={toggleCompare} inCompare={compare.some(c=>c.id===prop.id)}
                        onOpen={setModal} showWA={showWA}/>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── STICKY COMPARE BAR (bottom) ── */}
        {compare.length > 0 && tab !== "compare" && (
          <div style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:500, background:"rgba(8,8,22,0.97)", backdropFilter:"blur(20px)", borderTop:"1px solid rgba(99,102,241,0.3)", padding:"12px 24px", display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
            <div style={{ fontSize:12, fontWeight:600, color:"rgba(255,255,255,0.5)" }}>⚖️ Compare:</div>
            <div style={{ display:"flex", gap:8, flex:1, flexWrap:"wrap" }}>
              {compare.map(p => (
                <div key={p.id} style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(99,102,241,0.12)", border:"1px solid rgba(99,102,241,0.3)", borderRadius:20, padding:"5px 12px" }}>
                  <span style={{ fontSize:12, color:"#818CF8", fontWeight:600 }}>{p.name}</span>
                  <button onClick={() => setCompare(c=>c.filter(x=>x.id!==p.id))} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.4)", cursor:"pointer", fontSize:12, fontFamily:"Inter,sans-serif", lineHeight:1, padding:0 }}>✕</button>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={() => setTab("compare")} style={{ padding:"9px 20px", background:"linear-gradient(135deg,#6366F1,#4338ca)", border:"none", borderRadius:9, color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>Compare Now →</button>
              <button onClick={() => setCompare([])} style={{ padding:"9px 14px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:9, color:"rgba(255,255,255,0.5)", fontSize:12, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>Clear</button>
            </div>
          </div>
        )}

        {/* ── MODAL ── */}
        {modal && <PropertyModal prop={modal} onClose={() => setModal(null)}/>}

        {/* ── TOAST ── */}
        {toast && <Toast msg={toast} onDone={() => setToast(null)}/>}

        {/* ── WHATSAPP ── */}
        <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
          style={{ position:"fixed", bottom: compare.length > 0 && tab!=="compare" ? 80 : 24, right:24, zIndex:400, width:52, height:52, borderRadius:"50%", background:"#25D366", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, textDecoration:"none", boxShadow:"0 8px 24px rgba(37,211,102,0.4)", transition:"bottom 0.3s" }}>
          💬
        </a>
      </div>
    </>
  );
}
