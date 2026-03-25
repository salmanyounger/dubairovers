"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const PLATFORMS = [
  { id:"tours",      tag:"TOURS & EXPERIENCES", tagColor:"#F59E0B", title:"Dubai Rovers Adventures",  desc:"Desert safaris, hot air balloons, dhow cruises — hotel pickup on every tour.",   emoji:"🏜️", img:"https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80", bg:"linear-gradient(135deg,#1a0800,#2d1500)", stats:[{n:"4.9★",l:"RATING"},{n:"80+",l:"COUNTRIES"},{n:"24",l:"TOURS"}], href:"/tours" },
  { id:"properties", tag:"REAL ESTATE · AI",    tagColor:"#60A5FA", title:"Dubai Properties",         desc:"30+ UAE properties, AI scoring, mortgage calculators, market trends & ROI.",    emoji:"🏢", img:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80", bg:"linear-gradient(135deg,#00102a,#001f4a)", stats:[{n:"30+",l:"PROPERTIES"},{n:"AI",l:"SCORING"},{n:"Live",l:"MAP"}],      href:"/properties" },
  { id:"archai",     tag:"AI VILLA DESIGN",     tagColor:"#C9A84C", title:"ARCHAI Villa Designer",    desc:"Design your dream villa in 3 minutes — 9 styles, floor plans, cost estimate.",  emoji:"🏛️", img:"https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80", bg:"linear-gradient(135deg,#0f0a00,#2a1f00)", stats:[{n:"9",l:"STYLES"},{n:"5",l:"FLOOR PLANS"},{n:"Free",l:"UNTIL 2026"}], href:"/archai" },
  { id:"salmanfx",   tag:"FOREX EA · MT4/MT5",  tagColor:"#10B981", title:"SalmanFX Robot",           desc:"Parabolic SAR strategy, multi-stage money management, live dashboard.",         emoji:"📈", img:"https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80", bg:"linear-gradient(135deg,#001a0f,#003322)", stats:[{n:"MT4",l:"PLATFORM"},{n:"MT5",l:"PLATFORM"},{n:"Auto",l:"TRADING"}],  href:"/salmanfx" },
  { id:"webbuilder", tag:"WEB DEV · DUBAI",     tagColor:"#A855F7", title:"Web Builder",              desc:"18+ business categories, 5 style tiers, multilingual, booking forms & admin.", emoji:"💻", img:"https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80", bg:"linear-gradient(135deg,#1a001a,#3d0033)", stats:[{n:"18+",l:"CATEGORIES"},{n:"5",l:"TIERS"},{n:"Fast",l:"DELIVERY"}],  href:"/webbuilder" },
  { id:"alnoor",     tag:"ISLAMIC APP · FREE",  tagColor:"#2ECC71", title:"Al-Noor Islamic App",      desc:"Full Quran offline, 114 Surahs, prayer times via GPS, live Qibla compass.",    emoji:"🌙", img:"https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=800&q=80", bg:"linear-gradient(135deg,#001a00,#003300)", stats:[{n:"114",l:"SURAHS"},{n:"GPS",l:"PRAYER"},{n:"Free",l:"ALWAYS"}],    href:"/al-noor" },
];

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  return (
    <div suppressHydrationWarning style={{ minHeight:"100vh", background:"#06070d", color:"#fff", fontFamily:"'Plus Jakarta Sans',sans-serif", overflowX:"hidden" }}>
      <style suppressHydrationWarning>{`
        *{box-sizing:border-box;margin:0;padding:0;}
        html,body{overflow-x:hidden;}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .dr-card{transition:transform 0.3s,box-shadow 0.3s;display:block;text-decoration:none;}
        .dr-card:hover{transform:translateY(-6px);}
        .dr-card:hover .dr-img{transform:scale(1.05);}
        .dr-img{transition:transform 0.6s ease;width:100%;height:100%;object-fit:cover;display:block;}
        .dr-cta{transition:all 0.2s;}
        .dr-cta:hover{filter:brightness(1.15);transform:scale(1.04);}

        /* Desktop */
        .dr-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
        .dr-inner{border-radius:22px;overflow:hidden;height:400px;position:relative;border:1px solid rgba(255,255,255,0.08);}
        .dr-imgwrap{position:absolute;inset:0;}
        .dr-grad{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,0.92) 0%,rgba(0,0,0,0.15) 55%,transparent 100%);}
        .dr-content{position:absolute;bottom:0;left:0;right:0;padding:22px;}

        /* Mobile */
        @media(max-width:768px){
          .dr-topbar{padding:16px 16px 0!important;}
          .dr-hero{padding:12px 16px 16px!important;}
          .dr-hero h1{font-size:clamp(28px,9vw,44px)!important;}
          .dr-wrap{padding:0 16px 40px!important;margin-top:0!important;}
          .dr-grid{grid-template-columns:1fr!important;gap:12px!important;}
          .dr-inner{height:auto!important;display:flex!important;flex-direction:row!important;border-radius:18px!important;}
          .dr-imgwrap{position:relative!important;width:110px!important;flex-shrink:0!important;height:auto!important;}
          .dr-img{height:130px!important;}
          .dr-grad{display:none!important;}
          .dr-content{position:relative!important;padding:14px 12px!important;flex:1!important;}
          .dr-content .dr-tag{margin-bottom:3px!important;}
          .dr-content .dr-title{font-size:13px!important;margin-bottom:4px!important;}
          .dr-content .dr-desc{font-size:11px!important;margin-bottom:8px!important;-webkit-line-clamp:2;display:-webkit-box;-webkit-box-orient:vertical;overflow:hidden;}
          .dr-stat-num{font-size:12px!important;}
          .dr-stat-lbl{font-size:8px!important;}
          .dr-footer{padding:20px 16px 40px!important;}
          .dr-deskonly{display:none!important;}
          .dr-mobonly{display:block!important;}
        }
        @media(min-width:769px){
          .dr-mobonly{display:none!important;}
        }
      `}</style>

      {/* TOP BAR */}
      <div className="dr-topbar" style={{ padding:"20px 32px 0", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:38, height:38, borderRadius:10, background:"linear-gradient(135deg,#f97316,#ec4899)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>🏜️</div>
          <div>
            <div style={{ fontSize:15, fontWeight:800 }}>Dubai Rovers</div>
            <div style={{ fontSize:9, color:"rgba(255,255,255,0.35)", letterSpacing:"2px", textTransform:"uppercase" }}>Platform Hub</div>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ display:"flex", alignItems:"center", gap:5, background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.25)", borderRadius:20, padding:"4px 10px" }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:"#10b981", display:"inline-block", animation:"blink 1.5s ease-in-out infinite" }}/>
            <span style={{ fontSize:10, color:"#10b981", fontWeight:700, letterSpacing:"0.1em" }}>LIVE</span>
          </div>
        </div>
      </div>

      {/* HERO */}
      <div className="dr-hero" style={{ textAlign:"center", padding:"clamp(16px,3vh,36px) 32px 0" }}>
        <div style={{ display:"inline-block", background:"rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.25)", borderRadius:20, padding:"5px 16px", fontSize:10, fontWeight:700, letterSpacing:"2px", color:"#F59E0B", textTransform:"uppercase", marginBottom:14 }}>Welcome to</div>
        <h1 className="dr-deskonly" style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(36px,5vw,68px)", fontWeight:900, lineHeight:1.0, letterSpacing:"-2px", marginBottom:12 }}>
          Everything <em style={{ color:"#F59E0B" }}>Salman</em> Built in Dubai
        </h1>
        <h1 className="dr-mobonly" style={{ fontFamily:"'Fraunces',serif", fontSize:"clamp(28px,9vw,44px)", fontWeight:900, lineHeight:1.0, letterSpacing:"-1px", marginBottom:10 }}>
          Everything<br/><em style={{ color:"#F59E0B" }}>Salman</em><br/>Built in Dubai
        </h1>
        <p style={{ fontSize:13, color:"rgba(255,255,255,0.4)", marginBottom:20, letterSpacing:"0.04em" }}>Tours · Properties · AI Design · Forex EA · Web Dev · Islamic</p>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <Link href="/tours" className="dr-cta" style={{ padding:"12px 28px", background:"linear-gradient(135deg,#f97316,#ec4899)", borderRadius:12, color:"#fff", fontWeight:700, fontSize:14, textDecoration:"none" }}>Explore Adventures →</Link>
          <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer" className="dr-cta" style={{ padding:"12px 24px", background:"rgba(37,211,102,0.1)", border:"1px solid rgba(37,211,102,0.3)", borderRadius:12, color:"#25d366", fontWeight:700, fontSize:14, textDecoration:"none" }}>💬 WhatsApp</a>
        </div>
      </div>

      {/* CARDS GRID */}
      <div className="dr-wrap" style={{ maxWidth:1400, margin:"clamp(16px,3vh,32px) auto 0", padding:"0 28px 40px" }}>
        <div className="dr-grid">
          {PLATFORMS.map((p, i) => (
            <Link key={p.id} href={p.href} className="dr-card" style={{ animationDelay:`${i*80}ms` }}>
              <div className="dr-inner">
                <div className="dr-imgwrap">
                  <img className="dr-img" src={p.img} alt={p.title} loading={i < 3 ? "eager" : "lazy"}/>
                </div>
                <div className="dr-grad"/>
                <div className="dr-content">
                  <div className="dr-tag" style={{ fontSize:10, fontWeight:700, letterSpacing:"1.5px", textTransform:"uppercase", color:p.tagColor, marginBottom:6 }}>{p.tag}</div>
                  <div className="dr-title" style={{ fontSize:"clamp(14px,1.3vw,19px)", fontWeight:800, marginBottom:6, lineHeight:1.2 }}>{p.emoji} {p.title}</div>
                  <div className="dr-desc" style={{ fontSize:"clamp(11px,0.85vw,13px)", color:"rgba(255,255,255,0.55)", lineHeight:1.5, marginBottom:10 }}>{p.desc}</div>
                  <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
                    {p.stats.map(s => (
                      <div key={s.l}>
                        <div className="dr-stat-num" style={{ fontSize:15, fontWeight:800 }}>{s.n}</div>
                        <div className="dr-stat-lbl" style={{ fontSize:9, color:"rgba(255,255,255,0.4)", textTransform:"uppercase", letterSpacing:"0.5px" }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* FOOTER */}
        <div className="dr-footer" style={{ marginTop:36, textAlign:"center", borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:28 }}>
          <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
            style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 32px", background:"linear-gradient(135deg,#128c7e,#25d366)", borderRadius:14, color:"#fff", fontWeight:800, fontSize:15, textDecoration:"none", animation:"float 3s ease-in-out infinite", marginBottom:20 }}>
            💬 Book via WhatsApp — +971 544 735 060
          </a>
          <div style={{ fontSize:10, color:"rgba(255,255,255,0.2)", letterSpacing:"0.12em", marginBottom:10 }}>DUBAI ROVERS PLATFORM · DUBAI, UAE 🇦🇪</div>
          <div style={{ display:"flex", justifyContent:"center", gap:16 }}>
            <Link href="/privacy" style={{ fontSize:11, color:"rgba(255,255,255,0.25)", textDecoration:"none" }}>Privacy Policy</Link>
            <span style={{ color:"rgba(255,255,255,0.1)" }}>·</span>
            <Link href="/terms" style={{ fontSize:11, color:"rgba(255,255,255,0.25)", textDecoration:"none" }}>Terms</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
