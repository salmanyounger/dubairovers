"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const BANKS = [
  { name:"Abu Dhabi Islamic Bank", short:"ADIB",    rate:4.09 },
  { name:"ADCB",                    short:"ADCB",    rate:4.29 },
  { name:"Dubai Islamic Bank",      short:"DIB",     rate:4.19 },
  { name:"Emirates NBD",            short:"ENBD",    rate:4.49 },
  { name:"First Abu Dhabi Bank",    short:"FAB",     rate:4.49 },
  { name:"Mashreq Bank",            short:"Mashreq", rate:4.59 },
  { name:"RAKBANK",                 short:"RAKBANK", rate:4.79 },
];

export default function CalculatorPage() {
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState("mortgage");
  // Mortgage
  const [price,    setPrice]    = useState(2000000);
  const [down,     setDown]     = useState(20);
  const [years,    setYears]    = useState(25);
  const [selBank,  setSelBank]  = useState(0);
  // Buying costs
  const [bcPrice,  setBcPrice]  = useState(1500000);
  const [bcDown,   setBcDown]   = useState(20);
  // ROI
  const [rPrice,   setRPrice]   = useState(1500000);
  const [rRent,    setRRent]    = useState(90000);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  // Mortgage calc
  const loan    = price * (1 - down / 100);
  const bank    = BANKS[selBank];
  const r       = bank.rate / 100 / 12;
  const N       = years * 12;
  const monthly = Math.round(loan * (r * Math.pow(1+r, N)) / (Math.pow(1+r, N) - 1));
  const totalPay = monthly * N;
  const totalInt = totalPay - loan;

  // All banks comparison
  const allBanks = BANKS.map(b => {
    const rb = b.rate / 100 / 12;
    const m  = Math.round(loan * (rb * Math.pow(1+rb, N)) / (Math.pow(1+rb, N) - 1));
    return { ...b, monthly: m, total: m * N, interest: m * N - loan };
  });
  const cheapest = Math.min(...allBanks.map(b => b.monthly));

  // Buying costs
  const bcLoan     = bcPrice * (1 - bcDown / 100);
  const bcDLD      = Math.round(bcPrice * 0.04);
  const bcAgent    = Math.round(bcPrice * 0.02);
  const bcMortReg  = Math.round(bcLoan * 0.0025);
  const bcAdmin    = 4000;
  const bcDownAmt  = Math.round(bcPrice * bcDown / 100);
  const bcTotal    = bcDownAmt + bcDLD + bcAgent + bcMortReg + bcAdmin;

  // ROI calc
  const grossROI   = ((rRent / rPrice) * 100).toFixed(2);
  const annualCost = Math.round(rPrice * 0.015);
  const netROI     = (((rRent - annualCost) / rPrice) * 100).toFixed(2);
  const payback    = (rPrice / rRent).toFixed(1);

  const T = {
    bg:"#080810", card:"rgba(255,255,255,0.04)", border:"rgba(255,255,255,0.08)",
    text:"#F1F5F9", sub:"rgba(255,255,255,0.45)", gold:"#F59E0B", blue:"#6366F1", green:"#10B981"
  };
  const fmt = n => "AED " + Math.round(n).toLocaleString();
  const B = (ex={}) => ({ background:T.card, border:`1px solid ${T.border}`, borderRadius:14, padding:"18px 20px", ...ex });
  const inp = { width:"100%", padding:"10px 14px", background:"rgba(255,255,255,0.05)", border:`1px solid ${T.border}`, borderRadius:10, color:T.text, fontSize:14, fontFamily:"Inter,sans-serif", outline:"none" };
  const lbl = { fontSize:12, color:T.sub, marginBottom:6, display:"block", fontWeight:500 };

  return (
    <div style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Inter',sans-serif" }}>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box} input:focus{border-color:rgba(99,102,241,0.6)!important;box-shadow:0 0 0 3px rgba(99,102,241,0.1)!important}
        .calc-tab:hover{background:rgba(255,255,255,0.05)!important}
        .bank-row:hover{background:rgba(99,102,241,0.06)!important}
        input[type=range]{accent-color:#6366F1;width:100%}
      `}</style>

      {/* Header */}
      <div style={{ background:"rgba(0,0,0,0.4)", borderBottom:`1px solid ${T.border}`, padding:"16px 24px" }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontSize:22, fontWeight:800 }}>🧮 Dubai Property Calculators</div>
            <div style={{ fontSize:13, color:T.sub }}>Mortgage · Buying Costs · ROI — all UAE bank rates included</div>
          </div>
          <Link href="/properties" style={{ color:T.blue, textDecoration:"none", fontSize:13 }}>← Back to Properties</Link>
        </div>
      </div>

      <div style={{ maxWidth:900, margin:"0 auto", padding:"28px 24px" }}>
        {/* Tab switcher */}
        <div style={{ display:"flex", gap:4, marginBottom:28, background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:4 }}>
          {[
            { id:"mortgage", label:"🏦 Mortgage Calculator" },
            { id:"costs",    label:"💰 Buying Costs" },
            { id:"roi",      label:"📈 ROI Calculator" },
          ].map(t => (
            <button key={t.id} onClick={()=>setTab(t.id)} className="calc-tab"
              style={{ flex:1, padding:"11px", borderRadius:9, border:"none", background:tab===t.id?"#6366F1":"transparent", color:tab===t.id?"#fff":T.sub, fontSize:13, fontWeight:tab===t.id?700:500, cursor:"pointer", fontFamily:"Inter,sans-serif", transition:"all 0.18s" }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── MORTGAGE ── */}
        {tab==="mortgage" && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
            <div>
              <div style={{ ...B({ marginBottom:16 }) }}>
                <div style={{ fontSize:15, fontWeight:700, marginBottom:16 }}>Loan Details</div>
                <div style={{ marginBottom:14 }}>
                  <label style={lbl}>Property Price: <strong style={{ color:T.gold }}>{fmt(price)}</strong></label>
                  <input type="range" min={500000} max={15000000} step={100000} value={price} onChange={e=>setPrice(+e.target.value)}/>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:T.sub, marginTop:3 }}><span>AED 500K</span><span>AED 15M</span></div>
                </div>
                <div style={{ marginBottom:14 }}>
                  <label style={lbl}>Down Payment: <strong style={{ color:T.gold }}>{down}% = {fmt(price*down/100)}</strong></label>
                  <input type="range" min={20} max={50} step={5} value={down} onChange={e=>setDown(+e.target.value)}/>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:T.sub, marginTop:3 }}><span>20% (min)</span><span>50%</span></div>
                </div>
                <div style={{ marginBottom:14 }}>
                  <label style={lbl}>Loan Term: <strong style={{ color:T.gold }}>{years} years</strong></label>
                  <input type="range" min={5} max={25} step={5} value={years} onChange={e=>setYears(+e.target.value)}/>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:T.sub, marginTop:3 }}><span>5 yrs</span><span>25 yrs</span></div>
                </div>
                <div>
                  <label style={lbl}>Bank</label>
                  <select value={selBank} onChange={e=>setSelBank(+e.target.value)} style={{ ...inp }}>
                    {BANKS.map((b,i)=><option key={i} value={i}>{b.name} — {b.rate}% p.a.</option>)}
                  </select>
                </div>
              </div>

              {/* Result card */}
              <div style={{ background:"linear-gradient(135deg,rgba(99,102,241,0.15),rgba(99,102,241,0.05))", border:`1px solid rgba(99,102,241,0.3)`, borderRadius:14, padding:"20px" }}>
                <div style={{ fontSize:12, color:T.sub, marginBottom:4 }}>Monthly Payment ({bank.short})</div>
                <div style={{ fontSize:36, fontWeight:900, color:"#818CF8", marginBottom:16 }}>{fmt(monthly)}</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
                  {[
                    { label:"Loan Amount", val:fmt(loan) },
                    { label:"Total Interest", val:fmt(totalInt) },
                    { label:"Total Payment", val:fmt(totalPay) },
                  ].map(s=>(
                    <div key={s.label} style={{ background:"rgba(0,0,0,0.2)", borderRadius:8, padding:"8px 10px" }}>
                      <div style={{ fontSize:10, color:T.sub }}>{s.label}</div>
                      <div style={{ fontSize:12, fontWeight:700, color:T.text }}>{s.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* All banks comparison */}
            <div style={{ ...B({ padding:0, overflow:"hidden" }) }}>
              <div style={{ padding:"14px 18px", borderBottom:`1px solid ${T.border}` }}>
                <div style={{ fontSize:15, fontWeight:700 }}>🏦 All UAE Banks Comparison</div>
                <div style={{ fontSize:12, color:T.sub }}>Same property · {fmt(price)} · {down}% down · {years} yrs</div>
              </div>
              {allBanks.sort((a,b)=>a.monthly-b.monthly).map((b,i)=>(
                <div key={b.short} className="bank-row" style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 18px", borderBottom:i<6?`1px solid ${T.border}`:"none", transition:"background 0.15s", background:b.short===bank.short?"rgba(99,102,241,0.08)":"transparent" }}>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:13, fontWeight:600, color:T.text }}>{b.name}</div>
                    <div style={{ fontSize:11, color:T.sub }}>{b.rate}% p.a.</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontSize:15, fontWeight:800, color:b.monthly===cheapest?T.green:"#818CF8" }}>{fmt(b.monthly)}/mo</div>
                    {b.monthly===cheapest && <div style={{ fontSize:10, color:T.green, fontWeight:700 }}>✓ CHEAPEST</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── BUYING COSTS ── */}
        {tab==="costs" && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
            <div style={{ ...B() }}>
              <div style={{ fontSize:15, fontWeight:700, marginBottom:16 }}>Property Details</div>
              <div style={{ marginBottom:14 }}>
                <label style={lbl}>Property Price: <strong style={{ color:T.gold }}>{fmt(bcPrice)}</strong></label>
                <input type="range" min={500000} max={15000000} step={50000} value={bcPrice} onChange={e=>setBcPrice(+e.target.value)}/>
              </div>
              <div style={{ marginBottom:14 }}>
                <label style={lbl}>Down Payment: <strong style={{ color:T.gold }}>{bcDown}% = {fmt(bcPrice*bcDown/100)}</strong></label>
                <input type="range" min={20} max={50} step={5} value={bcDown} onChange={e=>setBcDown(+e.target.value)}/>
              </div>
              <div style={{ background:"rgba(245,158,11,0.08)", border:`1px solid rgba(245,158,11,0.2)`, borderRadius:10, padding:"12px 14px", marginTop:16 }}>
                <div style={{ fontSize:12, color:T.gold, fontWeight:600, marginBottom:6 }}>💡 UAE Law Requirements</div>
                <div style={{ fontSize:12, color:T.sub, lineHeight:1.7 }}>
                  Min 20% down for UAE nationals.<br/>
                  Min 25% down for expats.<br/>
                  DLD fee must be paid within 30 days.
                </div>
              </div>
            </div>

            <div style={{ ...B({ padding:0, overflow:"hidden" }) }}>
              <div style={{ padding:"14px 18px", background:"rgba(245,158,11,0.08)", borderBottom:`1px solid rgba(245,158,11,0.2)` }}>
                <div style={{ fontSize:13, fontWeight:800, color:T.gold }}>Total Cash Required</div>
                <div style={{ fontSize:28, fontWeight:900, color:T.gold }}>{fmt(bcTotal)}</div>
              </div>
              {[
                { icon:"💵", label:"Down Payment ("+bcDown+"%)", val:bcDownAmt, color:T.blue },
                { icon:"🏛️", label:"DLD Transfer Fee (4%)",      val:bcDLD,     color:"#F87171" },
                { icon:"🤝", label:"Agent Commission (2%)",       val:bcAgent,   color:"#FB923C" },
                { icon:"📑", label:"Mortgage Registration (0.25%)",val:bcMortReg,color:"#A78BFA" },
                { icon:"🏦", label:"Admin / Bank Fees",           val:bcAdmin,   color:T.sub },
              ].map((r,i)=>(
                <div key={r.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"13px 18px", borderBottom:i<4?`1px solid ${T.border}`:"none" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ fontSize:18 }}>{r.icon}</span>
                    <div>
                      <div style={{ fontSize:13, color:T.text }}>{r.label}</div>
                    </div>
                  </div>
                  <div style={{ fontSize:14, fontWeight:700, color:r.color }}>{fmt(r.val)}</div>
                </div>
              ))}
              <div style={{ display:"flex", justifyContent:"space-between", padding:"14px 18px", background:"rgba(255,255,255,0.04)" }}>
                <div style={{ fontSize:14, fontWeight:800 }}>TOTAL</div>
                <div style={{ fontSize:16, fontWeight:900, color:T.gold }}>{fmt(bcTotal)}</div>
              </div>
            </div>
          </div>
        )}

        {/* ── ROI ── */}
        {tab==="roi" && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
            <div style={{ ...B() }}>
              <div style={{ fontSize:15, fontWeight:700, marginBottom:16 }}>Investment Details</div>
              <div style={{ marginBottom:14 }}>
                <label style={lbl}>Property Price: <strong style={{ color:T.gold }}>{fmt(rPrice)}</strong></label>
                <input type="range" min={500000} max={15000000} step={50000} value={rPrice} onChange={e=>setRPrice(+e.target.value)}/>
              </div>
              <div style={{ marginBottom:14 }}>
                <label style={lbl}>Annual Rent Income: <strong style={{ color:T.green }}>{fmt(rRent)}</strong></label>
                <input type="range" min={20000} max={500000} step={5000} value={rRent} onChange={e=>setRRent(+e.target.value)}/>
              </div>
              <div style={{ background:"rgba(16,185,129,0.08)", border:`1px solid rgba(16,185,129,0.2)`, borderRadius:10, padding:"12px 14px", marginTop:8 }}>
                <div style={{ fontSize:12, color:T.green, fontWeight:600, marginBottom:6 }}>📊 Dubai Benchmarks</div>
                {[["Downtown / Palm", "5-6%"],["Marina / JBR","7-8%"],["JVC / JLT","8-9%"],["Business Bay","7-8%"]].map(([area,yld])=>(
                  <div key={area} style={{ display:"flex", justifyContent:"space-between", fontSize:12, padding:"3px 0", color:T.sub }}>
                    <span>{area}</span><span style={{ color:T.green, fontWeight:700 }}>{yld}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
                {[
                  { icon:"📈", label:"Gross Rental Yield", val:grossROI+"%", color:T.blue,  sub:"Before expenses" },
                  { icon:"💰", label:"Net Rental Yield",   val:netROI+"%",   color:T.green, sub:"After service charges" },
                  { icon:"💵", label:"Monthly Income",     val:fmt(rRent/12),color:T.gold,  sub:"Estimated rent" },
                  { icon:"⏰", label:"Payback Period",     val:payback+" yrs",color:"#F87171",sub:"Years to recover" },
                ].map(s=>(
                  <div key={s.label} style={{ ...B({ textAlign:"center" }) }}>
                    <div style={{ fontSize:24, marginBottom:4 }}>{s.icon}</div>
                    <div style={{ fontSize:22, fontWeight:800, color:s.color }}>{s.val}</div>
                    <div style={{ fontSize:11, fontWeight:600, color:T.text, marginTop:2 }}>{s.label}</div>
                    <div style={{ fontSize:10, color:T.sub }}>{s.sub}</div>
                  </div>
                ))}
              </div>

              <div style={{ ...B() }}>
                <div style={{ fontSize:14, fontWeight:700, marginBottom:12 }}>Annual Cost Breakdown</div>
                {[
                  { label:"Annual Rent Income", val:rRent,       color:T.green },
                  { label:"Service Charges (~1.5%)", val:-Math.round(rPrice*0.01), color:"#F87171" },
                  { label:"Maintenance (~0.5%)", val:-Math.round(rPrice*0.005), color:"#FB923C" },
                  { label:"Net Annual Profit", val:rRent-annualCost, color:T.gold },
                ].map((r,i)=>(
                  <div key={r.label} style={{ display:"flex", justifyContent:"space-between", padding:"9px 0", borderBottom:i<3?`1px solid ${T.border}`:"none", fontWeight:i===3?800:400 }}>
                    <span style={{ fontSize:13, color:i===3?T.text:T.sub }}>{r.label}</span>
                    <span style={{ fontSize:13, color:r.color, fontWeight:700 }}>{r.val<0?"-":""}{fmt(Math.abs(r.val))}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
