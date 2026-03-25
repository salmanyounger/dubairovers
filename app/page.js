"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const PLATFORMS = [
  { id:"tours", tag:"TOURS & EXPERIENCES", tagColor:"#F59E0B", title:"Dubai Rovers Adventures", desc:"Desert safaris, hot air balloons, dhow cruises — hotel pickup on every tour.", emoji:"🏜️", bg:"linear-gradient(135deg,#1a0800,#2d1500)", stats:[{n:"4.9★",l:"RATING"},{n:"80+",l:"COUNTRIES"},{n:"24",l:"TOURS"}], href:"/tours" },
  { id:"properties", tag:"REAL ESTATE · AI", tagColor:"#60A5FA", title:"Dubai Properties", desc:"30+ UAE properties, AI scoring, mortgage calculators, market trends & ROI.", emoji:"🏢", bg:"linear-gradient(135deg,#00102a,#001f4a)", stats:[{n:"30+",l:"PROPERTIES"},{n:"AI",l:"SCORING"},{n:"Live",l:"MAP"}], href:"/properties" },
  { id:"archai", tag:"AI VILLA DESIGN", tagColor:"#C9A84C", title:"ARCHAI Villa Designer", desc:"Design your dream villa in 3 minutes — 9 styles, floor plans, cost estimate.", emoji:"🏛️", bg:"linear-gradient(135deg,#0f0a00,#2a1f00)", stats:[{n:"9",l:"STYLES"},{n:"5",l:"FLOOR PLANS"},{n:"Free",l:"UNTIL 2026"}], href:"/archai" },
  { id:"salmanfx", tag:"FOREX EA · MT4/MT5", tagColor:"#10B981", title:"SalmanFX Robot", desc:"Parabolic SAR strategy, multi-stage money management, live dashboard.", emoji:"📈", bg:"linear-gradient(135deg,#001a0f,#003322)", stats:[{n:"MT4",l:"PLATFORM"},{n:"MT5",l:"PLATFORM"},{n:"Auto",l:"TRADING"}], href:"/salmanfx" },
  { id:"webbuilder", tag:"WEB DEV · DUBAI", tagColor:"#A855F7", title:"Web Builder", desc:"18+ business categories, 5 style tiers, multilingual, booking forms & admin.", emoji:"💻", bg:"linear-gradient(135deg,#1a001a,#3d0033)", stats:[{n:"18+",l:"CATEGORIES"},{n:"5",l:"TIERS"},{n:"Fast",l:"DELIVERY"}], href:"/webbuilder" },
  { id:"alnoor", tag:"ISLAMIC APP · FREE", tagColor:"#2ECC71", title:"Al-Noor Islamic App", desc:"Full Quran offline, 114 Surahs, prayer times via GPS, live Qibla compass.", emoji:"🌙", bg:"linear-gradient(135deg,#001a00,#003300)", stats:[{n:"114",l:"SURAHS"},{n:"GPS",l:"PRAYER"},{n:"Free",l:"ALWAYS"}], href:"/al-noor" },
];

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div suppressHydrationWarning style={{ minHeight:"100vh", background:"#06070d", color:"#fff", fontFamily:"'Plus Jakarta Sans',sans-serif", overflowX:"hidden" }}>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Fraunces:ital,wght@1,900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        html,body{overflow-x:hidden;}
        nav,[class*="navbar"],[id*="navbar"],header{display:none!important;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.4;transform:scale(1.4)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .card{transition:transform 0.3s ease,box-shadow 0.3s ease;cursor:pointer;}
        .card:hover{transform:translateY(-6px)!important;}
        .cta{transition:all 0.2s ease;}
        .cta:hover{filter:brightness(1.1);transform:scale(1.03)!important;}

        /* ── DESKTOP layout ── */
        .page-wrap{max-width:1400px;margin:0 auto;padding:clamp(60px,8vw,100px) clamp(16px,4vw,48px) 40px;}
        .grid-top{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:20px;}
        .grid-bot{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
        .card-inner{border-radius:24px;overflow:hidden;height:420px;position:relative;}
        .card-img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 0.6s ease;}
        .card:hover .card-img{transform:scale(1.05);}

        /* ── MOBILE layout ── */
        @media(max-width:768px){
          .desktop-hero{display:none!important;}
          .grid-top,.grid-bot{grid-template-columns:1fr!important;gap:14px!important;}
          .card-inner{height:auto!important;min-height:130px;display:flex!important;flex-direction:row!important;border-radius:20px!important;}
          .card-img-wrap{width:110px!important;flex-shrink:0;overflow:hidden;}
          .card-img{height:130px!important;}
          .card-overlay{position:relative!important;padding:16px 14px!important;display:flex;flex-direction:column;justify-content:space-between;}
          .card-gradient{display:none!important;}
          .mobile-hero{display:block!important;}
          .page-wrap{padding:16px 16px 40px!important;}
          .topbar{padding:16px 16px 0!important;}
        }
        @media(min-width:769px){
          .mobile-hero{display:none!important;}
          .card-img-wrap{position:absolute;inset:0;}
          .card-overlay{position:absolute;bottom:0;left:0;right:0;padding:24px;}
          .card-gradient{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.2) 60%,transparent 100%);}
        }
      `}</style>

      {/* TOP BAR */}
      <div className="topbar" style={{ padding:"20px 28px 0", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:38, height:38, borderRadius:10, background:"linear-gradient(135deg,#f97316,#ec4899)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>🏜️</div>
          <div>
            <div style={{ fontSize:15, fontWeight:800, color:"#fff" }}>Dubai Rovers</div>
            <div style={{ fontSize:9, color:"rgba(255,255,255,0.35)", letterSpacing:"2px", textTransform:"uppercase" }}>Platform Hub</div>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:11, color:"rgba(255,255,255,0.3)", fontFamily:"monospace" }}>{new Date().toLocaleTimeString("en-US",{hour:"2-digit",minute:"2-digit",timeZone:"Asia/Dubai"})} GST</span>
          <div style={{ display:"flex", alignItems:"center", gap:5, background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.25)", borderRadius:20, padding:"4px 10px" }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"#10b981", display:"inline-block", animation:"blink 1.5s ease-in-out infinite" }}/>
            <span style={{ fontSize:10, color:"#10b981", fontWeight:700, letterSpacing:"0.1em" }}>LIVE</span>
          </div>
        </div>
      </div>

      {/* DESKTOP HERO */}
      <div className="desktop-hero" style={{ textAlign:"center", padding:"clamp(20px,4vh,40px) 28px 0" }}>
        <div style={{ display:"inline-block", background:"rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.25)", borderRadius:20, padding:"5px 16px", fontSize:10, fontWeight:700, letterSpacing:"2px", color:"#F59E0B", textTransform:"uppercase", marginBottom:16 }}>Welcome to</div>
        <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(36px,5vw,72px)", fontWeight:900, lineHeight:1.0, letterSpacing:"-2px", marginBottom:12 }}>
          Everything <em style={{ color:"#F59E0B" }}>Salman</em> Built in Dubai
        </h1>
        <p style={{ fontSize:14, color:"rgba(255,255,255,0.4)", marginBottom:24, letterSpacing:"0.05em" }}>TOURS · PROPERTIES · AI DESIGN · FOREX EA · WEB DEV · ISLAMIC</p>
        <div style={{ display:"flex", gap:12, justifyContent:"center", marginBottom:8 }}>
          <Link href="/tours" className="cta" style={{ padding:"12px 28px", background:"linear-gradient(135deg,#f97316,#ec4899)", borderRadius:12, color:"#fff", fontWeight:700, fontSize:14, textDecoration:"none" }}>Explore Adventures →</Link>
          <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer" className="cta" style={{ padding:"12px 24px", background:"rgba(37,211,102,0.1)", border:"1px solid rgba(37,211,102,0.3)", borderRadius:12, color:"#25d366", fontWeight:700, fontSize:14, textDecoration:"none" }}>💬 WhatsApp</a>
        </div>
      </div>

      {/* MOBILE HERO */}
      <div className="mobile-hero" style={{ padding:"12px 16px 16px", textAlign:"center" }}>
        <div style={{ display:"inline-block", background:"rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.3)", borderRadius:20, padding:"5px 14px", fontSize:9, fontWeight:700, letterSpacing:"2px", color:"#F59E0B", textTransform:"uppercase", marginBottom:12 }}>Welcome to</div>
        <h1 style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(30px,9vw,48px)", fontWeight:900, lineHeight:1.0, letterSpacing:"-1px", marginBottom:10 }}>
          Everything<br/><em style={{ color:"#F59E0B" }}>Salman</em><br/>Built in Dubai
        </h1>
        <p style={{ fontSize:12, color:"rgba(255,255,255,0.45)", marginBottom:16 }}>Tours · Properties · AI · Forex · Web Dev</p>
        <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
          <Link href="/tours" style={{ flex:1, maxWidth:160, display:"flex", alignItems:"center", justifyContent:"center", padding:"12px", background:"linear-gradient(135deg,#f97316,#ec4899)", borderRadius:12, color:"#fff", fontWeight:700, fontSize:13, textDecoration:"none" }}>Explore All →</Link>
          <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer" style={{ padding:"12px 16px", background:"rgba(37,211,102,0.1)", border:"1px solid rgba(37,211,102,0.3)", borderRadius:12, color:"#25d366", fontWeight:700, fontSize:13, textDecoration:"none" }}>💬 WhatsApp</a>
        </div>
      </div>

      {/* CARDS */}
      <div className="page-wrap">
        <div className="grid-top">
          {PLATFORMS.slice(0,3).map((p,i) => (
            <Link key={p.id} href={p.href} className="card" style={{ textDecoration:"none", animation:`slideUp 0.5s ease ${i*0.1}s both` }}>
              <div className="card-inner" style={{ border:"1px solid rgba(255,255,255,0.08)" }}>
                {/* Image area */}
                <div className="card-img-wrap">
                  <img className="card-img" src={p.id==="tours"?"https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80":p.id==="properties"?"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80":"https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80"} alt={p.title}/>
                </div>
                <div className="card-gradient"/>
                {/* Content */}
                <div className="card-overlay">
                  {/* Mobile tag */}
                  <div style={{ fontSize:9, fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", color:p.tagColor, marginBottom:4 }}>{p.tag}</div>
                  <div>
                    <div style={{ fontSize:"clamp(13px,1.2vw,18px)", fontWeight:800, color:"#fff", marginBottom:4, lineHeight:1.2 }}>{p.emoji} {p.title}</div>
                    <div style={{ fontSize:"clamp(11px,0.85vw,13px)", color:"rgba(255,255,255,0.55)", lineHeight:1.5, marginBottom:8 }}>{p.desc}</div>
                  </div>
                  <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                    {p.stats.map(s => (
                      <div key={s.l}>
                        <div style={{ fontSize:"clamp(12px,1vw,16px)", fontWeight:800, color:"#fff" }}>{s.n}</div>
                        <div style={{ fontSize:9, color:"rgba(255,255,255,0.4)", textTransform:"uppercase", letterSpacing:"0.5px" }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="grid-bot">
          {PLATFORMS.slice(3).map((p,i) => (
            <Link key={p.id} href={p.href} className="card" style={{ textDecoration:"none", animation:`slideUp 0.5s ease ${(i+3)*0.1}s both` }}>
              <div className="card-inner" style={{ border:"1px solid rgba(255,255,255,0.08)" }}>
                <div className="card-img-wrap">
                  <img className="card-img" src={p.id==="salmanfx"?"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80":p.id==="webbuilder"?"https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80":"https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=800&q=80"} alt={p.title}/>
                </div>
                <div className="card-gradient"/>
                <div className="card-overlay">
                  <div style={{ fontSize:9, fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", color:p.tagColor, marginBottom:4 }}>{p.tag}</div>
                  <div>
                    <div style={{ fontSize:"clamp(13px,1.2vw,18px)", fontWeight:800, color:"#fff", marginBottom:4, lineHeight:1.2 }}>{p.emoji} {p.title}</div>
                    <div style={{ fontSize:"clamp(11px,0.85vw,13px)", color:"rgba(255,255,255,0.55)", lineHeight:1.5, marginBottom:8 }}>{p.desc}</div>
                  </div>
                  <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                    {p.stats.map(s => (
                      <div key={s.l}>
                        <div style={{ fontSize:"clamp(12px,1vw,16px)", fontWeight:800, color:"#fff" }}>{s.n}</div>
                        <div style={{ fontSize:9, color:"rgba(255,255,255,0.4)", textTransform:"uppercase", letterSpacing:"0.5px" }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* FOOTER */}
        <div style={{ marginTop:40, textAlign:"center", borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:24 }}>
          <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
            style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 32px", background:"linear-gradient(135deg,#128c7e,#25d366)", borderRadius:14, color:"#fff", fontWeight:800, fontSize:15, textDecoration:"none", animation:"float 3s ease-in-out infinite", marginBottom:20 }}>
            💬 Book via WhatsApp — +971 544 735 060
          </a>
          <div style={{ fontSize:10, color:"rgba(255,255,255,0.2)", letterSpacing:"0.15em" }}>DUBAI ROVERS PLATFORM · EST. 2015 · DUBAI, UAE 🇦🇪</div>
          <div style={{ display:"flex", justifyContent:"center", gap:16, marginTop:10 }}>
            <Link href="/privacy" style={{ fontSize:11, color:"rgba(255,255,255,0.25)", textDecoration:"none" }}>Privacy Policy</Link>
            <span style={{ color:"rgba(255,255,255,0.1)" }}>·</span>
            <Link href="/terms" style={{ fontSize:11, color:"rgba(255,255,255,0.25)", textDecoration:"none" }}>Terms</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
