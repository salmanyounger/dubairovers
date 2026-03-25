"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const PLANS = [
  { name:"Starter EA", price:"AED 299", usd:"$82", icon:"🤖", color:"#10B981",
    features:["1 MT4 Account","MM FLIP CODEPRO v1","Email Support","Parabolic SAR Strategy","Basic Money Management","30-Day Money Back"],
    badge:null },
  { name:"Pro EA Bundle", price:"AED 699", usd:"$190", icon:"⚡", color:"#6366F1",
    features:["3 MT4/MT5 Accounts","All EA Versions","Priority WhatsApp Support","Custom Lot Progression","Advanced MM System","Live Dashboard","Trade History Export"],
    badge:"BEST VALUE" },
  { name:"VIP Package", price:"AED 1,499", usd:"$408", icon:"💎", color:"#F59E0B",
    features:["Unlimited Accounts","All EAs + Future Releases","1-on-1 Setup Call","Custom Parameter Tuning","Dedicated WhatsApp Line","Source Code Access MT4","White Label Option"],
    badge:"MOST POPULAR" },
];

const FEATURES = [
  { icon:"📈", title:"Parabolic SAR Strategy", desc:"Core entry/exit logic using Parabolic SAR indicator. Dynamic stop-loss management with reversal detection for consistent signal quality." },
  { icon:"💰", title:"Advanced Money Management", desc:"10-trade configurable lot progression. Progressive profit booking with custom percentage targets at each stage of a trade series." },
  { icon:"🛡️", title:"License Key Protection", desc:"Hardware-bound activation with hash algorithm validation. Each license key is unique per MT4 account number — prevents unauthorized copying." },
  { icon:"📊", title:"Live Visual Dashboard", desc:"Animated scanning lines, real-time P&L display, trade counter and equity curve rendered directly on the MT4/MT5 chart. No external app needed." },
  { icon:"🔄", title:"Trading ON/OFF Toggle", desc:"One-click pause button on the chart. Stop new trades instantly without closing existing positions. Resume with a single click anytime." },
  { icon:"🎯", title:"MT4 & MT5 Compatible", desc:"Full compatibility across both MetaTrader platforms. Same strategy, same results — different execution environments both fully supported." },
];

const RESULTS = [
  { pair:"XAUUSD", period:"Jan–Mar 2026", ret:"+18.4%", trades:142, win:"67%", dd:"4.2%", color:"#F59E0B" },
  { pair:"EURUSD", period:"Jan–Mar 2026", ret:"+12.1%", trades:198, win:"63%", dd:"2.8%", color:"#6366F1" },
  { pair:"GBPUSD", period:"Jan–Mar 2026", ret:"+9.7%",  trades:87,  win:"61%", dd:"3.1%", color:"#10B981" },
  { pair:"USDJPY", period:"Jan–Mar 2026", ret:"+14.3%", trades:115, win:"65%", dd:"3.9%", color:"#F97316" },
];

const FAQS = [
  { q:"Which brokers work with your EA?", a:"Any MT4/MT5 broker works. Best results with IC Markets, Pepperstone, XM, Exness, and FBS. ECN accounts recommended for tighter spreads." },
  { q:"Do I need to leave my computer on 24/7?", a:"Yes — for automated trading you need a VPS (Virtual Private Server) running MT4/MT5 continuously. Contabo or Vultr VPS from $5/month works great." },
  { q:"What timeframe should I use?", a:"MM FLIP CODEPRO works best on M15 and H1 for XAUUSD and major pairs. Optimal settings vary per pair — full setup guide included with purchase." },
  { q:"How do I receive the EA after purchase?", a:"After WhatsApp payment confirmation, I send the .ex4/.ex5 file + full setup video within 2 hours. License key is tied to your account number." },
  { q:"Is there a refund policy?", a:"30-day money back guarantee for Starter and Pro plans. No refund on VIP due to source code access. Contact via WhatsApp for any issues." },
  { q:"Can I test on a demo account first?", a:"Absolutely. Test on demo first — I recommend 2–4 weeks demo testing before going live. Free demo licenses available on request." },
];

export default function SalmanFXPage() {
  const [mounted, setMounted] = useState(false);
  const [tab,     setTab]     = useState("overview");
  const [faq,     setFaq]     = useState(null);
  const chartRef = useRef(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const c = chartRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const W = c.width, H = c.height;
    ctx.clearRect(0, 0, W, H);
    const pts = [100,102,99,104,108,106,112,110,115,118,116,122,119,125,128,132,129,135,138,136,142,145,143,149,153,151,157,160,158,164];
    const minV = 95, maxV = 170;
    const px = (i) => 10 + (i / (pts.length - 1)) * (W - 20);
    const py = (v) => (H - 10) - ((v - minV) / (maxV - minV)) * (H - 20);
    ctx.strokeStyle = "rgba(16,185,129,0.07)"; ctx.lineWidth = 1;
    for (let g = 0; g < 4; g++) { const y = 10 + (g/3)*(H-20); ctx.beginPath(); ctx.moveTo(10,y); ctx.lineTo(W-10,y); ctx.stroke(); }
    const grad = ctx.createLinearGradient(0,0,0,H);
    grad.addColorStop(0,"rgba(16,185,129,0.22)"); grad.addColorStop(1,"rgba(16,185,129,0)");
    ctx.fillStyle = grad;
    ctx.beginPath(); ctx.moveTo(px(0),H-10);
    pts.forEach((v,i) => ctx.lineTo(px(i),py(v)));
    ctx.lineTo(px(pts.length-1),H-10); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = "#10B981"; ctx.lineWidth = 2;
    ctx.beginPath();
    pts.forEach((v,i) => { if(i===0) ctx.moveTo(px(i),py(v)); else ctx.lineTo(px(i),py(v)); });
    ctx.stroke();
  }, [mounted]);

  if (!mounted) return <div style={{ minHeight:"100vh", overflowX:"hidden", background:"#060A0D" }}/>;

  const T = {
    bg:"#060A0D", card:"rgba(255,255,255,0.04)", border:"rgba(255,255,255,0.07)",
    text:"#E8F0E8", sub:"rgba(255,255,255,0.42)", green:"#10B981",
  };
  const TABS = ["overview","results","pricing","faq"];

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap"/>
      <div suppressHydrationWarning style={{ minHeight:"100vh", overflowX:"hidden", background:T.bg, color:T.text, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
        <style suppressHydrationWarning>{`
          *{box-sizing:border-box}
          ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:rgba(16,185,129,0.3);border-radius:10px}
          @keyframes scan{0%{top:-5%}100%{top:110%}}
          @keyframes blink{0%,100%{opacity:1}50%{opacity:0.2}}
          @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
          .fade{animation:fadeUp 0.35s ease}
          .pc:hover{transform:translateY(-5px)!important;box-shadow:0 18px 44px rgba(0,0,0,0.5)!important}
          .pc{transition:all 0.28s ease}
          select option{background:#060A0D;color:#fff}
          @media(max-width:768px){
            .sfx-nav-inner{flex-wrap:wrap;height:auto!important;padding:10px 0!important;gap:8px!important}
            .sfx-tabs{overflow-x:auto;-webkit-overflow-scrolling:touch}
        @media(max-width:768px){
          .sfx-hero { grid-template-columns:1fr !important; gap:20px !important; }
          .sfx-tabs { overflow-x:auto !important; -webkit-overflow-scrolling:touch !important; }
          .sfx-tabs button { flex-shrink:0 !important; white-space:nowrap !important; padding:6px 10px !important; font-size:11px !important; }
          .sfx-pricing { grid-template-columns:1fr !important; }
          .sfx-main { padding:20px 14px !important; }
          .sfx-hero-hide { display:none !important; }
        }

            .sfx-hero{grid-template-columns:1fr!important;gap:24px!important}
            .sfx-terminal{display:none!important}
            .sfx-stat{font-size:22px!important}
            .sfx-plan{min-width:260px}
          }
        `}</style>

        {/* NAV */}
        <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(6,10,13,0.97)", backdropFilter:"blur(20px)", borderBottom:`1px solid ${T.border}`, padding:"0 24px" }}>
          <div className="sfx-nav-inner" style={{ maxWidth:1200, margin:"0 auto", height:60, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:32, height:32, borderRadius:8, background:"linear-gradient(135deg,#10B981,#059669)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15 }}>📈</div>
              <div>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:15, fontWeight:700, color:T.green, letterSpacing:"0.05em" }}>SalmanFX</div>
                <div style={{ fontSize:8, color:T.sub, letterSpacing:"0.15em", textTransform:"uppercase" }}>Expert Advisors · MT4/MT5</div>
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div className="sfx-tabs" style={{ display:"flex", gap:3, background:"rgba(255,255,255,0.04)", borderRadius:9, padding:3, overflowX:"auto" }}>
                {TABS.map(t => (
                  <button key={t} onClick={() => setTab(t)}
                    style={{ padding:"6px 13px", borderRadius:7, border:"none", background:tab===t?"linear-gradient(135deg,#10B981,#059669)":"rgba(255,255,255,0.04)", color:tab===t?"#fff":T.sub, border:tab===t?"1.5px solid #10B981":"1.5px solid transparent", fontSize:12, fontWeight:tab===t?700:400, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif", textTransform:"capitalize", transition:"all 0.18s" }}>
                    {t}
                  </button>
                ))}
              </div>
              <Link href="/salmanfx/blog" style={{ padding:"6px 14px", borderRadius:7, border:"1px solid rgba(16,185,129,0.35)", background:"rgba(16,185,129,0.08)", color:"#10B981", fontSize:12, fontWeight:700, textDecoration:"none", whiteSpace:"nowrap", fontFamily:"'JetBrains Mono',monospace" }}>📝 Blog</Link>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <a href="https://wa.me/971544735060?text=Hi Salman, I want to buy a Forex EA" target="_blank" rel="noopener noreferrer"
                style={{ padding:"8px 18px", background:"linear-gradient(135deg,#10B981,#059669)", borderRadius:9, color:"#fff", fontSize:12, fontWeight:700, textDecoration:"none" }}>
                💬 Buy Now
              </a>
              <Link href="/" style={{ padding:"7px 12px", background:T.card, border:`1px solid ${T.border}`, borderRadius:9, color:T.sub, fontSize:12, textDecoration:"none" }}>← Back</Link>
            </div>
          </div>
        </nav>

        {/* HERO - hide on mobile when not overview */}
        <div style={{ display: tab !== "overview" ? "none" : "block", background:"linear-gradient(135deg,rgba(16,185,129,0.08) 0%,transparent 60%)", borderBottom:`1px solid ${T.border}`, padding:"52px 24px 44px" }}>
          <div className="sfx-hero" style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:40, alignItems:"center" }}>
            <div>
              <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.22)", borderRadius:20, padding:"4px 12px", marginBottom:18 }}>
                <div style={{ width:5, height:5, borderRadius:"50%", background:T.green, animation:"blink 1.2s ease-in-out infinite" }}/>
                <span style={{ fontSize:10, color:T.green, fontWeight:700, letterSpacing:"0.08em" }}>AUTOMATED TRADING ROBOTS — MT4 & MT5</span>
              </div>
              <h1 style={{ fontSize:"clamp(26px,3.8vw,50px)", fontWeight:900, lineHeight:1.08, letterSpacing:"-0.02em", marginBottom:14 }}>
                Trade Smarter with <span style={{ color:T.green }}>AI-Powered</span> Expert Advisors
              </h1>
              <p style={{ fontSize:14, color:T.sub, lineHeight:1.75, marginBottom:26, maxWidth:480 }}>
                MM FLIP CODEPRO — Dubai-built Forex EA using Parabolic SAR strategy with advanced 10-stage money management. Set it and let it trade while you sleep.
              </p>
              <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:28 }}>
                <a href="https://wa.me/971544735060?text=Hi Salman, I want to buy a Forex EA" target="_blank" rel="noopener noreferrer"
                  style={{ padding:"12px 26px", background:"linear-gradient(135deg,#10B981,#059669)", borderRadius:11, color:"#fff", fontSize:14, fontWeight:800, textDecoration:"none", boxShadow:"0 6px 24px rgba(16,185,129,0.35)" }}>
                  🚀 Get Your EA Now
                </a>
                <button onClick={() => setTab("results")}
                  style={{ padding:"12px 22px", background:T.card, border:`1px solid ${T.border}`, borderRadius:11, color:T.text, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                  📊 See Live Results
                </button>
              </div>
              <div style={{ display:"flex", gap:24, flexWrap:"wrap" }}>
                {[["67%","Avg Win Rate"],["18.4%","Best Month"],["30-Day","Money Back"],["2hr","Delivery"]].map(([v,l]) => (
                  <div key={l}>
                    <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:20, fontWeight:700, color:T.green }}>{v}</div>
                    <div style={{ fontSize:9, color:T.sub, textTransform:"uppercase", letterSpacing:"0.08em" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Terminal panel */}
            <div style={{ background:"rgba(16,185,129,0.05)", border:"1px solid rgba(16,185,129,0.16)", borderRadius:16, padding:"20px", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", left:0, right:0, height:"1px", background:"linear-gradient(90deg,transparent,rgba(16,185,129,0.5),transparent)", animation:"scan 3s linear infinite", zIndex:5 }}/>
              <div style={{ fontFamily:"'JetBrains Mono',monospace" }}>
                <div style={{ display:"flex", gap:6, marginBottom:16 }}>
                  {["#EF4444","#F59E0B","#10B981"].map(c => <div key={c} style={{ width:10, height:10, borderRadius:"50%", background:c }}/>)}
                  <span style={{ marginLeft:"auto", fontSize:10, color:T.sub }}>MM FLIP CODEPRO v2.4 — Running</span>
                </div>
                {[
                  ["Account", "#8847291", false],
                  ["Pair",    "XAUUSD (Gold)", false],
                  ["Strategy","Parabolic SAR", false],
                  ["Lot Size","0.10 (Auto)", false],
                  ["Open Trades","2", false],
                  ["Today P&L","+$124.50", true],
                  ["Total Gain","+18.4%", true],
                  ["Trading", "ON ✅", true],
                ].map(([k,v,g]) => (
                  <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"7px 0", borderBottom:"1px solid rgba(16,185,129,0.07)", fontSize:12 }}>
                    <span style={{ color:T.sub }}>{k}</span>
                    <span style={{ color:g?T.green:T.text, fontWeight:g?700:400 }}>{v}</span>
                  </div>
                ))}
                <div style={{ marginTop:14 }}>
                  <div style={{ fontSize:10, color:T.sub, marginBottom:6 }}>Equity Curve — Last 30 trades</div>
                  <canvas ref={chartRef} width={400} height={90} style={{ width:"100%", display:"block" }}/>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div className="sfx-main" style={{ maxWidth:1200, margin:"0 auto", padding:"32px 24px" }}>

          {tab === "overview" && (
            <div className="fade">
              <div style={{ fontSize:16, fontWeight:800, marginBottom:20 }}>⚙️ MM FLIP CODEPRO — Core Features</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14, marginBottom:32 }}>
                {FEATURES.map(f => (
                  <div key={f.title} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:13, padding:"18px 20px" }}>
                    <div style={{ fontSize:26, marginBottom:10 }}>{f.icon}</div>
                    <div style={{ fontSize:13, fontWeight:700, color:"#fff", marginBottom:6 }}>{f.title}</div>
                    <p style={{ fontSize:12, color:T.sub, lineHeight:1.7 }}>{f.desc}</p>
                  </div>
                ))}
              </div>
              <div style={{ fontSize:16, fontWeight:800, marginBottom:16 }}>🔄 How to Get Started</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:12 }}>
                {[["01","Purchase & License","Buy via WhatsApp. I generate your license key tied to your MT4/MT5 account number within 2 hours."],
                  ["02","Install & Activate","Attach .ex4/.ex5 to your chart. Enter license key in EA inputs. Done in 5 minutes."],
                  ["03","Set Parameters","Choose lot size, risk %, pair and timeframe. I provide recommended settings for each pair."],
                  ["04","Let It Trade","EA scans 24/5, finds Parabolic SAR reversals, enters trades with automatic SL/TP."]
                ].map(([n,t,d]) => (
                  <div key={n} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"16px 14px" }}>
                    <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:T.green, marginBottom:7 }}>{n}</div>
                    <div style={{ fontSize:12, fontWeight:700, color:"#fff", marginBottom:5 }}>{t}</div>
                    <p style={{ fontSize:11, color:T.sub, lineHeight:1.6 }}>{d}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "results" && (
            <div className="fade">
              <div style={{ fontSize:16, fontWeight:800, marginBottom:6 }}>📊 Live Trading Results</div>
              <p style={{ fontSize:13, color:T.sub, marginBottom:22 }}>Real backtest + forward-test results. All figures verified on demo then live accounts. Jan–Mar 2026.</p>
              <div style={{ style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(min(260px,100%),1fr))", gap:14 }}>
                {RESULTS.map(r => (
                  <div key={r.pair} className="pc" style={{ background:T.card, border:`1px solid ${r.color}22`, borderRadius:13, padding:"18px 20px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
                      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:16, fontWeight:700, color:r.color }}>{r.pair}</div>
                      <div style={{ fontSize:10, color:T.sub }}>{r.period}</div>
                    </div>
                    <div style={{ fontSize:28, fontWeight:900, color:T.green, marginBottom:12, fontFamily:"'JetBrains Mono',monospace" }}>{r.ret}</div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:6 }}>
                      {[["Trades",r.trades],["Win Rate",r.win],["Max DD",r.dd]].map(([k,v]) => (
                        <div key={k} style={{ background:"rgba(255,255,255,0.04)", borderRadius:7, padding:"7px 8px", textAlign:"center" }}>
                          <div style={{ fontSize:12, fontWeight:700, color:"#fff" }}>{v}</div>
                          <div style={{ fontSize:9, color:T.sub }}>{k}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:20, background:"rgba(245,158,11,0.07)", border:"1px solid rgba(245,158,11,0.18)", borderRadius:11, padding:"12px 16px", fontSize:12, color:"rgba(245,158,11,0.75)" }}>
                ⚠️ Past performance does not guarantee future results. Forex trading involves risk. Only trade capital you can afford to lose.
              </div>
            </div>
          )}

          {tab === "pricing" && (
            <div className="fade">
              <div style={{ fontSize:16, fontWeight:800, marginBottom:4 }}>💰 Choose Your Plan</div>
              <p style={{ fontSize:13, color:T.sub, marginBottom:22 }}>One-time payment. Lifetime license. No monthly fees. WhatsApp support included.</p>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
                {PLANS.map(plan => (
                  <div key={plan.name} className="pc"
                    style={{ background:T.card, border:`1.5px solid ${plan.color}28`, borderRadius:16, padding:"24px 22px", position:"relative",
                      boxShadow:plan.badge?`0 0 40px ${plan.color}18`:"none" }}>
                    {plan.badge && (
                      <div style={{ position:"absolute", top:-10, left:"50%", transform:"translateX(-50%)", background:plan.color, borderRadius:20, padding:"3px 14px", fontSize:9, fontWeight:800, color:plan.color==="#F59E0B"?"#000":"#fff", whiteSpace:"nowrap" }}>
                        {plan.badge}
                      </div>
                    )}
                    <div style={{ fontSize:28, marginBottom:10 }}>{plan.icon}</div>
                    <div style={{ fontSize:15, fontWeight:800, color:"#fff", marginBottom:4 }}>{plan.name}</div>
                    <div style={{ fontSize:28, fontWeight:900, color:plan.color, marginBottom:2 }}>{plan.price}</div>
                    <div style={{ fontSize:11, color:T.sub, marginBottom:18 }}>≈ {plan.usd} · Lifetime</div>
                    <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:22 }}>
                      {plan.features.map(f => (
                        <div key={f} style={{ display:"flex", gap:7, fontSize:12, color:T.sub }}>
                          <span style={{ color:plan.color, flexShrink:0 }}>✓</span>{f}
                        </div>
                      ))}
                    </div>
                    <a href={`https://wa.me/971544735060?text=Hi Salman, I want the ${plan.name} EA (${plan.price})`}
                      target="_blank" rel="noopener noreferrer"
                      style={{ display:"block", padding:"11px", background:`linear-gradient(135deg,${plan.color},${plan.color}cc)`, borderRadius:10, color:plan.color==="#F59E0B"?"#000":"#fff", fontSize:13, fontWeight:700, textDecoration:"none", textAlign:"center" }}>
                      💬 Buy on WhatsApp
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "faq" && (
            <div className="fade" style={{ maxWidth:780 }}>
              <div style={{ fontSize:16, fontWeight:800, marginBottom:18 }}>❓ Frequently Asked Questions</div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {FAQS.map((f, i) => (
                  <div key={i} style={{ background:T.card, border:`1px solid ${faq===i?"rgba(16,185,129,0.3)":T.border}`, borderRadius:11, overflow:"hidden", cursor:"pointer" }}
                    onClick={() => setFaq(faq===i?null:i)}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 18px" }}>
                      <div style={{ fontSize:13, fontWeight:600, color:faq===i?T.green:"#fff" }}>{f.q}</div>
                      <span style={{ fontSize:16, color:T.sub, transform:faq===i?"rotate(45deg)":"none", transition:"transform 0.2s", flexShrink:0 }}>+</span>
                    </div>
                    {faq===i && <div style={{ padding:"0 18px 14px", fontSize:13, color:T.sub, lineHeight:1.7 }}>{f.a}</div>}
                  </div>
                ))}
              </div>
              <div style={{ marginTop:28, background:"rgba(16,185,129,0.07)", border:"1px solid rgba(16,185,129,0.18)", borderRadius:13, padding:"20px 22px", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:14 }}>
                <div>
                  <div style={{ fontSize:14, fontWeight:700, marginBottom:3 }}>Still have questions?</div>
                  <div style={{ fontSize:12, color:T.sub }}>Message Salman directly — response within 30 minutes</div>
                </div>
                <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
                  style={{ padding:"10px 20px", background:"linear-gradient(135deg,#25D366,#128C7E)", borderRadius:9, color:"#fff", fontSize:12, fontWeight:700, textDecoration:"none" }}>
                  💬 +971544735060
                </a>
              </div>
            </div>
          )}
        </div>

        <a href="https://wa.me/971544735060?text=Hi Salman, interested in your Forex EA" target="_blank" rel="noopener noreferrer"
          style={{ position:"fixed", bottom:22, right:22, zIndex:50, width:50, height:50, borderRadius:"50%", background:"#25D366", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, textDecoration:"none", boxShadow:"0 6px 20px rgba(37,211,102,0.4)" }}>
          💬
        </a>
      </div>
    </>
  );
}
