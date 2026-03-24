"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { getTour, getTourPackages, getRelatedTours } from "../../data/tours";

export default function TourPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.tour;

  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState("overview");
  const [selPkg, setSelPkg] = useState(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [date, setDate] = useState("");
  const [imgIdx, setImgIdx] = useState(0);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    setMounted(true);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDate(tomorrow.toISOString().split("T")[0]);
  }, []);

  if (!mounted) return null;

  const tour = getTour(slug);
  if (!tour) return (
    <div style={{ minHeight:"100vh", background:"#0a0a0a", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", flexDirection:"column", gap:16, textAlign:"center", padding:24 }}>
      <div style={{ fontSize:64 }}>🏜️</div>
      <h1 style={{ fontSize:28, fontWeight:900 }}>Tour Not Found</h1>
      <p style={{ color:"rgba(255,255,255,0.5)" }}>This tour doesn't exist or may have been moved.</p>
      <Link href="/tours" style={{ padding:"12px 28px", background:"linear-gradient(135deg,#f97316,#ec4899)", borderRadius:12, color:"#fff", fontWeight:700, textDecoration:"none" }}>← Back to Tours</Link>
    </div>
  );

  const packages = getTourPackages(slug);
  const related = getRelatedTours(slug, 3);
  const pkg = selPkg ? packages.find(p => p.id === selPkg) : packages[0];
  const price = pkg?.price?.AED || 0;
  const total = price * (adults + children * 0.5);

  const waMsg = encodeURIComponent(
    `Hi Salman! I want to book:\n🏖️ Tour: ${tour.title}\n📦 Package: ${pkg?.title || ""}\n📅 Date: ${date}\n👥 Adults: ${adults}, Children: ${children}\n💰 Total: AED ${total.toFixed(0)}\nPlease confirm availability.`
  );

  const T = {
    bg: "#0a0a0a",
    card: "rgba(255,255,255,0.04)",
    border: "rgba(255,255,255,0.08)",
    text: "#f1f5f9",
    sub: "rgba(255,255,255,0.5)",
  };

  return (
    <div suppressHydrationWarning style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Inter',sans-serif", overflowX:"hidden" }}>
      <style suppressHydrationWarning>{`
        *{box-sizing:border-box;}
        html,body{overflow-x:hidden;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
        .fade{animation:fadeUp 0.4s ease both}
        .pkg-card:hover{border-color:rgba(249,115,22,0.4)!important;transform:translateY(-2px)}
        .tab-btn:hover{background:rgba(255,255,255,0.08)!important}
        @media(max-width:768px){
          .tour-grid{grid-template-columns:1fr!important;}
          .pkg-grid{grid-template-columns:1fr!important;}
          .stats-row{grid-template-columns:repeat(2,1fr)!important;}
          .booking-sidebar{position:fixed!important;bottom:0!important;left:0!important;right:0!important;top:auto!important;z-index:100!important;border-radius:20px 20px 0 0!important;max-height:85vh!important;overflow-y:auto!important;transform:translateY(${showBooking?"0":"calc(100% - 64px)"})}
        }
      `}</style>

      {/* HERO */}
      <div style={{ position:"relative", height:"clamp(300px,55vw,520px)", overflow:"hidden" }}>
        <img
          src={tour.heroImage}
          alt={tour.title}
          style={{ width:"100%", height:"100%", objectFit:"cover" }}
        />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)" }}/>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"clamp(16px,4vw,40px)" }}>
          <Link href="/tours" style={{ display:"inline-flex", alignItems:"center", gap:6, color:"rgba(255,255,255,0.7)", textDecoration:"none", fontSize:13, marginBottom:12, background:"rgba(0,0,0,0.3)", padding:"6px 12px", borderRadius:20 }}>← Back to Tours</Link>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
            <span style={{ fontSize:28 }}>{tour.emoji}</span>
            <span style={{ background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.3)", borderRadius:20, padding:"4px 12px", fontSize:12, fontWeight:700 }}>{tour.category}</span>
          </div>
          <h1 style={{ fontSize:"clamp(24px,5vw,48px)", fontWeight:900, lineHeight:1.1, marginBottom:8 }}>{tour.title}</h1>
          <p style={{ color:"rgba(255,255,255,0.75)", fontSize:"clamp(13px,2vw,16px)", maxWidth:600 }}>{tour.tagline}</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:16, marginTop:12, fontSize:13 }}>
            <span>⭐ {tour.rating} ({tour.reviewCount.toLocaleString()} reviews)</span>
            <span>📍 {tour.location}</span>
            <span>👥 {tour.groupSize}</span>
            <span>💪 {tour.physicalLevel}</span>
          </div>
        </div>
      </div>

      {/* MOBILE BOOK BAR */}
      <div style={{ display:"none", position:"fixed", bottom:0, left:0, right:0, zIndex:99, background:"rgba(10,10,10,0.95)", borderTop:"1px solid rgba(255,255,255,0.1)", padding:"12px 16px", gap:12 }} className="mob-book-bar">
        <div style={{ flex:1 }}>
          <div style={{ fontSize:11, color:T.sub }}>From</div>
          <div style={{ fontSize:22, fontWeight:900, color:"#f97316" }}>AED {packages[0]?.price?.AED || 0}</div>
        </div>
        <a href={`https://wa.me/971544735060?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
          style={{ flex:2, display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"12px", background:"linear-gradient(135deg,#25D366,#128C7E)", borderRadius:12, color:"#fff", fontWeight:800, fontSize:15, textDecoration:"none" }}>
          💬 Book via WhatsApp
        </a>
      </div>

      <style suppressHydrationWarning>{`@media(max-width:768px){.mob-book-bar{display:flex!important;}}`}</style>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"clamp(16px,4vw,32px)" }}>
        <div className="tour-grid" style={{ display:"grid", gridTemplateColumns:"1fr 380px", gap:32, alignItems:"start" }}>

          {/* LEFT */}
          <div>
            {/* TABS */}
            <div style={{ display:"flex", gap:4, marginBottom:24, background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:4, overflowX:"auto" }}>
              {["overview","packages","itinerary","reviews","faq"].map(t => (
                <button key={t} className="tab-btn" onClick={() => setTab(t)}
                  style={{ flex:1, padding:"10px 8px", borderRadius:9, border:"none", background:tab===t?"rgba(249,115,22,0.2)":"transparent", color:tab===t?"#f97316":T.sub, fontSize:13, fontWeight:tab===t?700:400, cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap", transition:"all 0.15s", minWidth:80 }}>
                  {t==="overview"?"📋 Overview":t==="packages"?"🎫 Packages":t==="itinerary"?"🗺️ Itinerary":t==="reviews"?"⭐ Reviews":"❓ FAQ"}
                </button>
              ))}
            </div>

            {/* OVERVIEW */}
            {tab==="overview" && (
              <div className="fade">
                {/* Stats */}
                <div className="stats-row" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:24 }}>
                  {[
                    { icon:"⭐", label:"Rating", val:`${tour.rating}/5` },
                    { icon:"👥", label:"Reviews", val:tour.reviewCount.toLocaleString() },
                    { icon:"💪", label:"Level", val:tour.physicalLevel },
                    { icon:"✅", label:"Cancel", val:"Free 24h" },
                  ].map(s => (
                    <div key={s.label} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"14px 12px", textAlign:"center" }}>
                      <div style={{ fontSize:22, marginBottom:4 }}>{s.icon}</div>
                      <div style={{ fontSize:15, fontWeight:800, color:s.label==="Rating"?"#f97316":T.text }}>{s.val}</div>
                      <div style={{ fontSize:11, color:T.sub, marginTop:2 }}>{s.label}</div>
                    </div>
                  ))}
                </div>

                {/* Highlights */}
                <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:16, padding:"20px", marginBottom:20 }}>
                  <h3 style={{ fontSize:16, fontWeight:800, marginBottom:14 }}>✨ Tour Highlights</h3>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:8 }}>
                    {tour.highlights.map((h,i) => (
                      <div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 12px", background:"rgba(249,115,22,0.06)", border:"1px solid rgba(249,115,22,0.15)", borderRadius:10, fontSize:13, color:T.text }}>
                        {h}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Included/Not Included */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
                  <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:16, padding:20 }}>
                    <h3 style={{ fontSize:15, fontWeight:800, marginBottom:12, color:"#10B981" }}>✅ Included</h3>
                    {tour.included.map((item,i) => <div key={i} style={{ fontSize:13, color:T.sub, padding:"5px 0", borderBottom:i<tour.included.length-1?`1px solid ${T.border}`:"none" }}>✓ {item}</div>)}
                  </div>
                  <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:16, padding:20 }}>
                    <h3 style={{ fontSize:15, fontWeight:800, marginBottom:12, color:"#EF4444" }}>❌ Not Included</h3>
                    {tour.notIncluded.map((item,i) => <div key={i} style={{ fontSize:13, color:T.sub, padding:"5px 0", borderBottom:i<tour.notIncluded.length-1?`1px solid ${T.border}`:"none" }}>✗ {item}</div>)}
                  </div>
                </div>

                {/* What to bring */}
                <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:16, padding:20, marginBottom:20 }}>
                  <h3 style={{ fontSize:15, fontWeight:800, marginBottom:12 }}>🎒 What to Bring</h3>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                    {tour.whatToBring.map((item,i) => (
                      <span key={i} style={{ background:"rgba(255,255,255,0.06)", border:`1px solid ${T.border}`, borderRadius:20, padding:"6px 14px", fontSize:13, color:T.sub }}>📌 {item}</span>
                    ))}
                  </div>
                </div>

                {/* Important Info */}
                <div style={{ background:"rgba(245,158,11,0.06)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:16, padding:20 }}>
                  <h3 style={{ fontSize:15, fontWeight:800, marginBottom:12, color:"#F59E0B" }}>⚠️ Important Info</h3>
                  {tour.importantInfo.map((item,i) => (
                    <div key={i} style={{ fontSize:13, color:T.sub, padding:"5px 0", borderBottom:i<tour.importantInfo.length-1?`1px solid rgba(245,158,11,0.1)`:"none" }}>• {item}</div>
                  ))}
                </div>
              </div>
            )}

            {/* PACKAGES */}
            {tab==="packages" && (
              <div className="fade pkg-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:16 }}>
                {packages.map(p => (
                  <div key={p.id} className="pkg-card"
                    onClick={() => setSelPkg(p.id)}
                    style={{ background:selPkg===p.id||(!selPkg&&packages[0]?.id===p.id)?"rgba(249,115,22,0.08)":T.card, border:`2px solid ${selPkg===p.id||(!selPkg&&packages[0]?.id===p.id)?"rgba(249,115,22,0.5)":T.border}`, borderRadius:18, padding:20, cursor:"pointer", transition:"all 0.2s" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                      <span style={{ fontSize:28 }}>{p.emoji}</span>
                      {p.badge && <span style={{ background:"rgba(249,115,22,0.15)", border:"1px solid rgba(249,115,22,0.3)", borderRadius:20, padding:"3px 10px", fontSize:11, fontWeight:700, color:"#f97316" }}>{p.badge}</span>}
                    </div>
                    <h3 style={{ fontSize:16, fontWeight:800, marginBottom:4 }}>{p.title}</h3>
                    <p style={{ fontSize:13, color:T.sub, marginBottom:12, lineHeight:1.5 }}>{p.subtitle}</p>
                    <div style={{ display:"flex", gap:12, flexWrap:"wrap", marginBottom:14 }}>
                      <span style={{ fontSize:12, color:T.sub }}>⏱️ {p.duration}</span>
                      <span style={{ fontSize:12, color:T.sub }}>🕐 {p.timeSlot}</span>
                      {p.availability?.spotsLeft <= 5 && <span style={{ fontSize:12, color:"#EF4444", fontWeight:700 }}>🔥 Only {p.availability.spotsLeft} spots left!</span>}
                    </div>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <div>
                        {p.originalPrice?.AED && <span style={{ fontSize:12, color:T.sub, textDecoration:"line-through", marginRight:6 }}>AED {p.originalPrice.AED}</span>}
                        <span style={{ fontSize:24, fontWeight:900, color:"#f97316" }}>AED {p.price.AED}</span>
                        <span style={{ fontSize:11, color:T.sub }}>/person</span>
                      </div>
                      <div style={{ fontSize:12, color:T.sub }}>≈ USD {p.price.USD}</div>
                    </div>
                    {p.highlights && (
                      <div style={{ marginTop:14, display:"flex", flexDirection:"column", gap:6 }}>
                        {p.highlights.slice(0,3).map((h,i) => (
                          <div key={i} style={{ display:"flex", gap:8, fontSize:12, color:T.sub }}>
                            <span>{h.icon}</span><span><strong style={{ color:T.text }}>{h.label}</strong> — {h.desc}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* ITINERARY */}
            {tab==="itinerary" && (
              <div className="fade">
                {packages.map(p => p.itinerary && (
                  <div key={p.id} style={{ marginBottom:24 }}>
                    <h3 style={{ fontSize:15, fontWeight:800, marginBottom:14, color:"#f97316" }}>{p.emoji} {p.title}</h3>
                    <div style={{ position:"relative", paddingLeft:24 }}>
                      <div style={{ position:"absolute", left:8, top:0, bottom:0, width:2, background:"rgba(249,115,22,0.2)", borderRadius:2 }}/>
                      {p.itinerary.map((step,i) => (
                        <div key={i} style={{ position:"relative", paddingBottom:20, paddingLeft:16 }}>
                          <div style={{ position:"absolute", left:-8, top:4, width:12, height:12, borderRadius:"50%", background:"#f97316", border:"2px solid #0a0a0a" }}/>
                          <div style={{ fontSize:12, fontWeight:700, color:"#f97316", marginBottom:2 }}>{step.time}</div>
                          <div style={{ fontSize:14, color:T.text }}>{step.activity}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* REVIEWS */}
            {tab==="reviews" && (
              <div className="fade">
                {/* Rating summary */}
                <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:16, padding:20, marginBottom:20, display:"flex", alignItems:"center", gap:20 }}>
                  <div style={{ textAlign:"center" }}>
                    <div style={{ fontSize:52, fontWeight:900, color:"#f97316", lineHeight:1 }}>{tour.rating}</div>
                    <div style={{ fontSize:18, color:"#F59E0B" }}>{"⭐".repeat(5)}</div>
                    <div style={{ fontSize:12, color:T.sub, marginTop:4 }}>{tour.reviewCount.toLocaleString()} reviews</div>
                  </div>
                  <div style={{ flex:1 }}>
                    {[5,4,3,2,1].map(star => (
                      <div key={star} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                        <span style={{ fontSize:12, color:T.sub, width:8 }}>{star}</span>
                        <div style={{ flex:1, height:6, background:"rgba(255,255,255,0.06)", borderRadius:3, overflow:"hidden" }}>
                          <div style={{ height:"100%", background:"#F59E0B", borderRadius:3, width:star===5?"78%":star===4?"15%":star===3?"5%":"1%" }}/>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews */}
                <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                  {tour.reviews.map((r,i) => (
                    <div key={i} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:16, padding:20 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <div style={{ width:40, height:40, borderRadius:"50%", background:"linear-gradient(135deg,#f97316,#ec4899)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:800 }}>
                            {r.name.charAt(0)}
                          </div>
                          <div>
                            <div style={{ fontWeight:700, fontSize:14 }}>{r.name} {r.country}</div>
                            <div style={{ fontSize:11, color:T.sub }}>{r.platform} · {r.date}</div>
                          </div>
                        </div>
                        <div style={{ display:"flex", gap:1 }}>
                          {[...Array(r.rating)].map((_,j) => <span key={j} style={{ color:"#F59E0B", fontSize:14 }}>★</span>)}
                        </div>
                      </div>
                      <p style={{ fontSize:14, color:T.sub, lineHeight:1.7 }}>{r.text}</p>
                      {r.verified && <span style={{ fontSize:11, color:"#10B981", marginTop:8, display:"block" }}>✓ Verified booking</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ */}
            {tab==="faq" && (
              <div className="fade" style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {tour.faqs.map((faq,i) => (
                  <details key={i} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:14, overflow:"hidden" }}>
                    <summary style={{ padding:"16px 20px", fontWeight:700, fontSize:14, color:T.text, cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      {faq.q}
                      <span style={{ color:T.sub, fontSize:18 }}>+</span>
                    </summary>
                    <div style={{ padding:"0 20px 16px", fontSize:14, color:T.sub, lineHeight:1.7 }}>{faq.a}</div>
                  </details>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — Booking Card */}
          <div style={{ position:"sticky", top:20 }}>
            <div style={{ background:"rgba(15,15,20,0.98)", border:`1px solid ${T.border}`, borderRadius:20, padding:24, boxShadow:"0 20px 60px rgba(0,0,0,0.5)" }}>
              {/* Price */}
              <div style={{ marginBottom:16 }}>
                <div style={{ fontSize:12, color:T.sub }}>Starting from</div>
                <div style={{ fontSize:34, fontWeight:900, color:"#f97316" }}>AED {packages[0]?.price?.AED || 0}</div>
                <div style={{ fontSize:12, color:T.sub }}>per person · Free cancellation</div>
              </div>

              {/* Package selector */}
              {packages.length > 1 && (
                <div style={{ marginBottom:14 }}>
                  <label style={{ fontSize:12, color:T.sub, display:"block", marginBottom:6 }}>Select Package</label>
                  <select value={selPkg || packages[0]?.id} onChange={e => setSelPkg(e.target.value)}
                    style={{ width:"100%", padding:"10px 14px", background:"rgba(255,255,255,0.06)", border:`1px solid ${T.border}`, borderRadius:10, color:T.text, fontSize:14, fontFamily:"inherit" }}>
                    {packages.map(p => <option key={p.id} value={p.id} style={{ background:"#1a1a2e" }}>{p.title} — AED {p.price.AED}</option>)}
                  </select>
                </div>
              )}

              {/* Date */}
              <div style={{ marginBottom:14 }}>
                <label style={{ fontSize:12, color:T.sub, display:"block", marginBottom:6 }}>Select Date</label>
                <input type="date" value={date} min={new Date().toISOString().split("T")[0]} onChange={e => setDate(e.target.value)}
                  style={{ width:"100%", padding:"10px 14px", background:"rgba(255,255,255,0.06)", border:`1px solid ${T.border}`, borderRadius:10, color:T.text, fontSize:14, fontFamily:"inherit" }} />
              </div>

              {/* Guests */}
              <div style={{ marginBottom:20 }}>
                <label style={{ fontSize:12, color:T.sub, display:"block", marginBottom:8 }}>Guests</label>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  {[["Adults",adults,setAdults,1],["Children",children,setChildren,0]].map(([label,val,setter,min]) => (
                    <div key={label} style={{ background:"rgba(255,255,255,0.04)", border:`1px solid ${T.border}`, borderRadius:10, padding:"10px 12px" }}>
                      <div style={{ fontSize:11, color:T.sub, marginBottom:6 }}>{label}</div>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <button onClick={() => setter(v => Math.max(min,v-1))}
                          style={{ width:26, height:26, borderRadius:"50%", border:`1px solid ${T.border}`, background:"transparent", color:T.text, cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>−</button>
                        <span style={{ fontWeight:800, fontSize:16, minWidth:20, textAlign:"center" }}>{val}</span>
                        <button onClick={() => setter(v => v+1)}
                          style={{ width:26, height:26, borderRadius:"50%", border:`1px solid ${T.border}`, background:"rgba(249,115,22,0.2)", color:"#f97316", cursor:"pointer", fontSize:16, display:"flex", alignItems:"center", justifyContent:"center" }}>+</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div style={{ background:"rgba(249,115,22,0.08)", border:"1px solid rgba(249,115,22,0.2)", borderRadius:12, padding:"12px 16px", marginBottom:16, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontSize:13, color:T.sub }}>Total ({adults + children} guests)</span>
                <span style={{ fontSize:22, fontWeight:900, color:"#f97316" }}>AED {total.toFixed(0)}</span>
              </div>

              {/* Book Button */}
              <a href={`https://wa.me/971544735060?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, width:"100%", padding:"16px", background:"linear-gradient(135deg,#25D366,#128C7E)", border:"none", borderRadius:14, color:"#fff", fontSize:16, fontWeight:900, textDecoration:"none", marginBottom:10, cursor:"pointer" }}>
                💬 Book via WhatsApp
              </a>
              <a href="tel:+971544735060"
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, width:"100%", padding:"12px", background:"rgba(249,115,22,0.1)", border:"1px solid rgba(249,115,22,0.3)", borderRadius:12, color:"#f97316", fontSize:14, fontWeight:700, textDecoration:"none" }}>
                📞 Call +971 544 735 060
              </a>

              {/* Trust badges */}
              <div style={{ marginTop:16, display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                {[
                  {icon:"✅", text:"Free Cancellation"},
                  {icon:"🏆", text:"Best Price Guarantee"},
                  {icon:"🚗", text:"Hotel Pickup Included"},
                  {icon:"⭐", text:"4.9/5 Rating"},
                ].map(b => (
                  <div key={b.text} style={{ display:"flex", alignItems:"center", gap:6, fontSize:11, color:T.sub }}>
                    <span>{b.icon}</span><span>{b.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RELATED TOURS */}
        {related.length > 0 && (
          <div style={{ marginTop:48 }}>
            <h2 style={{ fontSize:24, fontWeight:800, marginBottom:20 }}>You May Also Like</h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:16 }}>
              {related.map(r => (
                <Link key={r.id} href={`/${r.slug}`} style={{ textDecoration:"none" }}>
                  <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:18, overflow:"hidden", transition:"all 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.transform="translateY(-4px)"}
                    onMouseLeave={e => e.currentTarget.style.transform="none"}>
                    <img src={r.cardImage} alt={r.title} style={{ width:"100%", height:160, objectFit:"cover" }}/>
                    <div style={{ padding:16 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                        <span style={{ fontSize:20 }}>{r.emoji}</span>
                        <h3 style={{ fontSize:15, fontWeight:700, color:T.text }}>{r.title}</h3>
                      </div>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <span style={{ fontSize:12, color:T.sub }}>⭐ {r.rating} · {r.category}</span>
                        <span style={{ fontSize:16, fontWeight:800, color:"#f97316" }}>from AED {r.packages.length > 0 ? "150" : "—"}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* WhatsApp Floating */}
      <a href={`https://wa.me/971544735060?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
        className="desk-only"
        style={{ position:"fixed", bottom:24, right:24, zIndex:50, width:56, height:56, background:"#25D366", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, boxShadow:"0 8px 24px rgba(37,211,102,0.4)", textDecoration:"none" }}>
        💬
      </a>
      <style suppressHydrationWarning>{`@media(max-width:768px){.desk-only{display:none!important;}}`}</style>
    </div>
  );
}
