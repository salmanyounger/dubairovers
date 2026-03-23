"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const CURRENCIES = [
  { code:"AED", name:"UAE Dirham",        flag:"🇦🇪", rate:1 },
  { code:"USD", name:"US Dollar",         flag:"🇺🇸", rate:0.2723 },
  { code:"EUR", name:"Euro",              flag:"🇪🇺", rate:0.2501 },
  { code:"GBP", name:"British Pound",     flag:"🇬🇧", rate:0.2142 },
  { code:"INR", name:"Indian Rupee",      flag:"🇮🇳", rate:22.74 },
  { code:"PKR", name:"Pakistani Rupee",   flag:"🇵🇰", rate:75.82 },
  { code:"PHP", name:"Philippine Peso",   flag:"🇵🇭", rate:15.28 },
  { code:"SAR", name:"Saudi Riyal",       flag:"🇸🇦", rate:1.0213 },
  { code:"KWD", name:"Kuwaiti Dinar",     flag:"🇰🇼", rate:0.0835 },
  { code:"BHD", name:"Bahraini Dinar",    flag:"🇧🇭", rate:0.1026 },
  { code:"OMR", name:"Omani Rial",        flag:"🇴🇲", rate:0.1048 },
  { code:"QAR", name:"Qatari Riyal",      flag:"🇶🇦", rate:0.9912 },
  { code:"EGP", name:"Egyptian Pound",    flag:"🇪🇬", rate:13.32 },
  { code:"RUB", name:"Russian Ruble",     flag:"🇷🇺", rate:25.18 },
  { code:"CNY", name:"Chinese Yuan",      flag:"🇨🇳", rate:1.975 },
];

const METRO_RED = [
  "UAE Exchange","Jebel Ali","Ibn Battuta","Energy","Nakheel Harbour & Tower",
  "Jumeirah Lakes Towers (JLT)","DMCC","Sobha Realty","Nakheel","Sharaf DG",
  "Al Quoz","First Abu Dhabi Bank","Mall of Emirates","Al Safa","Business Bay",
  "Burj Khalifa/Dubai Mall","Financial Centre","Emirates Towers","World Trade Centre",
  "Union","BurJuman","Al Fahidi","ADCB","Oud Metha","Healthcare City",
  "Al Jadaf","Dubai Festival City","Al Qusais","Dubai Airport T3","Dubai Airport T1","Rashidiya"
];

const METRO_GREEN = [
  "Etisalat","Al Qiyadah","Abu Hail","Abu Baker Al Siddique","Salah Al Din",
  "Union","BurJuman","Al Ghubaiba","Baniyas Square","Palm Deira",
  "Al Ras","Al Rigga","Deira City Centre","Stadium","Al Nahda","Creek"
];

const TAXI_ROUTES = [
  { from:"Dubai Airport T3",      to:"Downtown Dubai",    km:12, time:"15-25 min", fare:"AED 35-55" },
  { from:"Dubai Airport T3",      to:"Dubai Marina",      km:32, time:"30-50 min", fare:"AED 65-90" },
  { from:"Dubai Airport T3",      to:"JBR Beach",         km:34, time:"35-55 min", fare:"AED 70-95" },
  { from:"Dubai Airport T3",      to:"Palm Jumeirah",     km:40, time:"40-60 min", fare:"AED 80-110" },
  { from:"Dubai Airport T3",      to:"Business Bay",      km:14, time:"15-25 min", fare:"AED 40-60" },
  { from:"Downtown Dubai",        to:"Dubai Marina",      km:22, time:"20-35 min", fare:"AED 45-70" },
  { from:"Downtown Dubai",        to:"Deira Gold Souk",   km:10, time:"15-25 min", fare:"AED 30-45" },
  { from:"Dubai Marina",          to:"Palm Jumeirah",     km:8,  time:"10-20 min", fare:"AED 25-40" },
  { from:"JBR Beach",             to:"Mall of Emirates",  km:5,  time:"8-15 min",  fare:"AED 20-30" },
  { from:"Burj Khalifa",          to:"Dubai Frame",       km:6,  time:"10-18 min", fare:"AED 20-30" },
  { from:"Dubai Mall",            to:"Gold Souk Deira",   km:10, time:"15-25 min", fare:"AED 30-45" },
  { from:"Business Bay",          to:"DIFC",              km:3,  time:"5-10 min",  fare:"AED 15-22" },
];

export default function ToolsPage() {
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState("currency");
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState("AED");
  const [to, setTo] = useState("USD");
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const fromCur = CURRENCIES.find(c=>c.code===from);
  const toCur   = CURRENCIES.find(c=>c.code===to);
  const converted = ((amount / fromCur.rate) * toCur.rate).toFixed(2);

  const T = { bg:"#080810", card:"rgba(255,255,255,0.04)", border:"rgba(255,255,255,0.08)", text:"#F1F5F9", sub:"rgba(255,255,255,0.45)", gold:"#F59E0B", green:"#10B981", blue:"#3B82F6" };
  const B = (ex={}) => ({ background:T.card, border:`1px solid ${T.border}`, borderRadius:14, ...ex });
  const inp = { width:"100%", padding:"10px 14px", background:"rgba(255,255,255,0.05)", border:`1px solid ${T.border}`, borderRadius:10, color:T.text, fontSize:14, fontFamily:"Inter,sans-serif", outline:"none" };

  return (
    <div style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Inter',sans-serif" }}>
      <style suppressHydrationWarning>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');*{box-sizing:border-box} .metro-stop:hover{background:rgba(255,255,255,0.06)!important} .taxi-row:hover{background:rgba(59,130,246,0.06)!important} input[type=range]{accent-color:#3B82F6;width:100%}`}</style>

      <div style={{ background:"rgba(0,0,0,0.4)", borderBottom:`1px solid ${T.border}`, padding:"16px 24px" }}>
        <div style={{ maxWidth:1000, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontSize:22, fontWeight:800 }}>🛠️ Dubai Travel Tools</div>
            <div style={{ fontSize:13, color:T.sub }}>Currency converter · Metro guide · Taxi fares — 100% offline</div>
          </div>
          <Link href="/tours" style={{ color:T.blue, textDecoration:"none", fontSize:13 }}>← Tours Home</Link>
        </div>
      </div>

      <div style={{ maxWidth:1000, margin:"0 auto", padding:"28px 24px" }}>
        <div style={{ display:"flex", gap:4, marginBottom:28, background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:4 }}>
          {[
            { id:"currency", label:"💱 Currency Converter" },
            { id:"metro",    label:"🚇 Metro Guide" },
            { id:"taxi",     label:"🚕 Taxi Fares" },
          ].map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)}
              style={{ flex:1, padding:"11px", borderRadius:9, border:"none", background:tab===t.id?"#3B82F6":"transparent", color:tab===t.id?"#fff":T.sub, fontSize:13, fontWeight:tab===t.id?700:500, cursor:"pointer", fontFamily:"Inter,sans-serif", transition:"all 0.18s" }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── CURRENCY ── */}
        {tab==="currency" && (
          <div>
            <div style={{ ...B({ padding:"24px", marginBottom:20 }) }}>
              <div style={{ fontSize:16, fontWeight:700, marginBottom:20 }}>💱 Currency Converter</div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", gap:14, alignItems:"center", marginBottom:20 }}>
                <div>
                  <label style={{ fontSize:12, color:T.sub, display:"block", marginBottom:6 }}>From</label>
                  <select value={from} onChange={e=>setFrom(e.target.value)} style={{ ...inp, marginBottom:8 }}>
                    {CURRENCIES.map(c=><option key={c.code} value={c.code}>{c.flag} {c.code} — {c.name}</option>)}
                  </select>
                  <input type="number" value={amount} onChange={e=>setAmount(+e.target.value)} style={{ ...inp }}/>
                </div>
                <button onClick={()=>{ setFrom(to); setTo(from); }} style={{ background:"rgba(59,130,246,0.15)", border:"1px solid rgba(59,130,246,0.3)", borderRadius:10, padding:"10px 14px", color:T.blue, fontSize:20, cursor:"pointer", marginTop:24 }}>⇄</button>
                <div>
                  <label style={{ fontSize:12, color:T.sub, display:"block", marginBottom:6 }}>To</label>
                  <select value={to} onChange={e=>setTo(e.target.value)} style={{ ...inp, marginBottom:8 }}>
                    {CURRENCIES.map(c=><option key={c.code} value={c.code}>{c.flag} {c.code} — {c.name}</option>)}
                  </select>
                  <div style={{ ...inp, background:"rgba(59,130,246,0.08)", border:"1px solid rgba(59,130,246,0.3)", color:T.blue, fontWeight:700, fontSize:16 }}>{toCur.flag} {converted} {to}</div>
                </div>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                {[50,100,200,500,1000].map(v=>(
                  <button key={v} onClick={()=>setAmount(v)} style={{ flex:1, padding:"7px", background:amount===v?"rgba(59,130,246,0.2)":"rgba(255,255,255,0.04)", border:`1px solid ${amount===v?"rgba(59,130,246,0.5)":T.border}`, borderRadius:8, color:amount===v?T.blue:T.sub, fontSize:12, fontWeight:amount===v?700:400, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>{v}</button>
                ))}
              </div>
            </div>

            <div style={{ ...B({ padding:0, overflow:"hidden" }) }}>
              <div style={{ padding:"14px 20px", borderBottom:`1px solid ${T.border}` }}>
                <div style={{ fontSize:14, fontWeight:700 }}>1 {from} = all currencies</div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)" }}>
                {CURRENCIES.filter(c=>c.code!==from).map((c,i)=>{
                  const val = ((1 / fromCur.rate) * c.rate).toFixed(4);
                  return (
                    <div key={c.code} style={{ padding:"12px 16px", borderBottom:`1px solid ${T.border}`, borderRight:i%3<2?`1px solid ${T.border}`:"none" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                        <span style={{ fontSize:18 }}>{c.flag}</span>
                        <div>
                          <div style={{ fontSize:11, color:T.sub }}>{c.code}</div>
                          <div style={{ fontSize:14, fontWeight:700, color:T.text }}>{val}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ── METRO ── */}
        {tab==="metro" && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
            <div>
              <div style={{ ...B({ padding:0, overflow:"hidden", marginBottom:14 }) }}>
                <div style={{ padding:"14px 18px", background:"rgba(239,68,68,0.1)", borderBottom:`1px solid rgba(239,68,68,0.2)`, display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:16, height:16, borderRadius:"50%", background:"#EF4444" }}/>
                  <div style={{ fontSize:14, fontWeight:800, color:"#FCA5A5" }}>Red Line — {METRO_RED.length} stations</div>
                </div>
                {METRO_RED.map((stop,i)=>(
                  <div key={stop} className="metro-stop" style={{ display:"flex", alignItems:"center", gap:12, padding:"9px 18px", borderBottom:i<METRO_RED.length-1?`1px solid ${T.border}`:"none", transition:"background 0.15s" }}>
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
                      <div style={{ width:2, height:i===0?0:8, background:"#EF4444", opacity:0.4 }}/>
                      <div style={{ width:10, height:10, borderRadius:"50%", background:i===0||i===METRO_RED.length-1?"#EF4444":"rgba(239,68,68,0.4)", border:"2px solid #EF4444", flexShrink:0 }}/>
                      <div style={{ width:2, height:i===METRO_RED.length-1?0:8, background:"#EF4444", opacity:0.4 }}/>
                    </div>
                    <span style={{ fontSize:12, color:T.text }}>{stop}</span>
                    <span style={{ marginLeft:"auto", fontSize:10, color:T.sub }}>R{String(i+1).padStart(2,"0")}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ ...B({ padding:0, overflow:"hidden", marginBottom:14 }) }}>
                <div style={{ padding:"14px 18px", background:"rgba(16,185,129,0.1)", borderBottom:`1px solid rgba(16,185,129,0.2)`, display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:16, height:16, borderRadius:"50%", background:"#10B981" }}/>
                  <div style={{ fontSize:14, fontWeight:800, color:"#6EE7B7" }}>Green Line — {METRO_GREEN.length} stations</div>
                </div>
                {METRO_GREEN.map((stop,i)=>(
                  <div key={stop} className="metro-stop" style={{ display:"flex", alignItems:"center", gap:12, padding:"9px 18px", borderBottom:i<METRO_GREEN.length-1?`1px solid ${T.border}`:"none", transition:"background 0.15s" }}>
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2 }}>
                      <div style={{ width:2, height:i===0?0:8, background:"#10B981", opacity:0.4 }}/>
                      <div style={{ width:10, height:10, borderRadius:"50%", background:i===0||i===METRO_GREEN.length-1?"#10B981":"rgba(16,185,129,0.4)", border:"2px solid #10B981", flexShrink:0 }}/>
                      <div style={{ width:2, height:i===METRO_GREEN.length-1?0:8, background:"#10B981", opacity:0.4 }}/>
                    </div>
                    <span style={{ fontSize:12, color:T.text }}>{stop}</span>
                    <span style={{ marginLeft:"auto", fontSize:10, color:T.sub }}>G{String(i+1).padStart(2,"0")}</span>
                  </div>
                ))}
              </div>

              <div style={{ ...B() }}>
                <div style={{ fontSize:13, fontWeight:700, marginBottom:10 }}>🎫 Metro Fares</div>
                {[["1-2 zones","AED 3.00"],["3+ zones","AED 5.80"],["Day pass","AED 22.00"],["Weekly pass","AED 70.00"],["Nol Silver Card","AED 25 (reloadable)"]].map(([label,fare])=>(
                  <div key={label} style={{ display:"flex", justifyContent:"space-between", padding:"8px 0", borderBottom:`1px solid ${T.border}`, fontSize:13 }}>
                    <span style={{ color:T.sub }}>{label}</span>
                    <span style={{ color:T.gold, fontWeight:700 }}>{fare}</span>
                  </div>
                ))}
                <div style={{ marginTop:12, fontSize:11, color:T.sub, lineHeight:1.7 }}>
                  💡 Buy a <strong style={{ color:T.text }}>Nol Silver Card</strong> from any station — AED 1.50 per trip discount vs single ticket
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAXI ── */}
        {tab==="taxi" && (
          <div>
            <div style={{ ...B({ marginBottom:16 }) }}>
              <div style={{ fontSize:14, fontWeight:700, marginBottom:8 }}>🚕 Dubai Taxi Pricing</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10 }}>
                {[
                  { icon:"🚀", label:"Flag Fall", val:"AED 5.00", sub:"Starting fare" },
                  { icon:"📏", label:"Per KM", val:"AED 1.96", sub:"Standard rate" },
                  { icon:"🌙", label:"Night Rate", val:"+25%", sub:"10pm - 6am" },
                  { icon:"✈️", label:"Airport Surcharge", val:"AED 25", sub:"DXB departure only" },
                ].map(s=>(
                  <div key={s.label} style={{ background:"rgba(255,255,255,0.04)", border:`1px solid ${T.border}`, borderRadius:10, padding:"12px 14px", textAlign:"center" }}>
                    <div style={{ fontSize:22, marginBottom:4 }}>{s.icon}</div>
                    <div style={{ fontSize:16, fontWeight:800, color:T.gold }}>{s.val}</div>
                    <div style={{ fontSize:11, fontWeight:600, color:T.text }}>{s.label}</div>
                    <div style={{ fontSize:10, color:T.sub }}>{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ ...B({ padding:0, overflow:"hidden", marginBottom:16 }) }}>
              <div style={{ padding:"14px 20px", borderBottom:`1px solid ${T.border}` }}>
                <div style={{ fontSize:14, fontWeight:700 }}>🗺️ Common Routes & Estimated Fares</div>
              </div>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr style={{ background:"rgba(255,255,255,0.03)" }}>
                    {["From","To","Distance","Time","Fare"].map(h=>(
                      <th key={h} style={{ padding:"10px 16px", fontSize:11, color:T.sub, fontWeight:600, textAlign:"left", textTransform:"uppercase", letterSpacing:"0.06em", borderBottom:`1px solid ${T.border}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {TAXI_ROUTES.map((r,i)=>(
                    <tr key={i} className="taxi-row" style={{ borderBottom:i<TAXI_ROUTES.length-1?`1px solid ${T.border}`:"none", transition:"background 0.15s" }}>
                      <td style={{ padding:"11px 16px", fontSize:12, color:T.text, fontWeight:500 }}>{r.from}</td>
                      <td style={{ padding:"11px 16px", fontSize:12, color:T.text }}>{r.to}</td>
                      <td style={{ padding:"11px 16px", fontSize:12, color:T.sub }}>{r.km} km</td>
                      <td style={{ padding:"11px 16px", fontSize:12, color:T.sub }}>{r.time}</td>
                      <td style={{ padding:"11px 16px", fontSize:13, color:T.gold, fontWeight:700 }}>{r.fare}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ ...B() }}>
              <div style={{ fontSize:13, fontWeight:700, marginBottom:10 }}>📱 Recommended Apps</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
                {[
                  { emoji:"🚕", name:"Dubai Taxi (RTA)", desc:"Official RTA app — most reliable" },
                  { emoji:"🚗", name:"Careem", desc:"Local Uber — good rates" },
                  { emoji:"🟢", name:"Uber", desc:"Available — surge pricing applies" },
                ].map(app=>(
                  <div key={app.name} style={{ background:"rgba(255,255,255,0.04)", border:`1px solid ${T.border}`, borderRadius:10, padding:"12px 14px", textAlign:"center" }}>
                    <div style={{ fontSize:28, marginBottom:6 }}>{app.emoji}</div>
                    <div style={{ fontSize:12, fontWeight:700, marginBottom:3 }}>{app.name}</div>
                    <div style={{ fontSize:11, color:T.sub }}>{app.desc}</div>
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
