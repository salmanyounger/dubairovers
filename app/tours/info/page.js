"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const EMERGENCY = [
  { icon:"🚔", name:"Police",            number:"999",  desc:"Emergency police response" },
  { icon:"🚑", name:"Ambulance",         number:"998",  desc:"Medical emergency" },
  { icon:"🚒", name:"Fire Brigade",      number:"997",  desc:"Fire & rescue" },
  { icon:"🚨", name:"Civil Defense",     number:"997",  desc:"Disasters & rescue" },
  { icon:"🏥", name:"Dubai Health Auth", number:"800342",desc:"Health information line" },
  { icon:"🚕", name:"Dubai Taxi (RTA)",  number:"800RTA",desc:"Official taxi booking" },
  { icon:"🏦", name:"Tourist Police",    number:"901",  desc:"Tourist assistance" },
  { icon:"⚡", name:"DEWA (Electricity)",number:"991",  desc:"Power & water emergencies" },
  { icon:"✈️", name:"Dubai Airport",     number:"+97142245555",desc:"DXB Airport info" },
  { icon:"🏨", name:"Hotel Emergency",   number:"112",  desc:"From hotel room phone" },
];

const ARABIC = [
  { english:"Hello / Hi",           arabic:"مرحبا",          transliteration:"Marhaba" },
  { english:"Welcome",              arabic:"أهلاً وسهلاً",   transliteration:"Ahlan wa sahlan" },
  { english:"Thank you",            arabic:"شكراً",          transliteration:"Shukran" },
  { english:"Please",               arabic:"من فضلك",        transliteration:"Min fadlak" },
  { english:"Yes / No",             arabic:"نعم / لا",       transliteration:"Na'am / La" },
  { english:"Excuse me / Sorry",    arabic:"آسف / عفواً",    transliteration:"Aasif / Afwan" },
  { english:"How much?",            arabic:"بكم هذا؟",       transliteration:"Bikam hatha?" },
  { english:"Where is...?",         arabic:"أين...؟",        transliteration:"Ayna...?" },
  { english:"Good morning",         arabic:"صباح الخير",     transliteration:"Sabah al-khair" },
  { english:"Good evening",         arabic:"مساء الخير",     transliteration:"Masa al-khair" },
  { english:"Goodbye",              arabic:"مع السلامة",     transliteration:"Ma'a al-salama" },
  { english:"No problem",           arabic:"لا مشكلة",       transliteration:"La mushkila" },
  { english:"Very good / Excellent",arabic:"ممتاز",          transliteration:"Mumtaz!" },
  { english:"Water please",         arabic:"ماء من فضلك",    transliteration:"Maa min fadlak" },
  { english:"The bill please",      arabic:"الحساب من فضلك", transliteration:"Al-hisab min fadlak" },
  { english:"Call the police",      arabic:"اتصل بالشرطة",   transliteration:"Ittasil bil-shurta" },
];

const DUBAI_RULES = [
  { cat:"Dress Code",     icon:"👗", rules:[
    "Cover shoulders and knees in malls, mosques and traditional areas",
    "Swimwear is fine at beaches and pools only — not on the street",
    "Bikinis are acceptable on public beaches — Dubai is liberal vs Gulf neighbours",
    "Headscarf not required for non-Muslim women, but appreciated in mosques",
  ]},
  { cat:"Alcohol",        icon:"🍺", rules:[
    "Alcohol is legal — served in licensed hotels, restaurants and bars",
    "Cannot drink in public spaces, parks, beaches or in cars",
    "Drinking and driving is a zero-tolerance offence — immediate jail",
    "Minimum age to purchase alcohol: 21 years old",
  ]},
  { cat:"Photography",    icon:"📸", rules:[
    "Never photograph government buildings, military, or airports",
    "Always ask permission before photographing UAE nationals (especially women)",
    "Shopping malls sometimes restrict commercial photography — check signs",
    "Photography at malls and public areas for personal use is generally fine",
  ]},
  { cat:"Public Behaviour",icon:"🤝", rules:[
    "Public displays of affection beyond hand-holding can result in a fine",
    "Swearing or making rude gestures in public can lead to arrest",
    "Ramadan: no eating, drinking or smoking in public during daylight hours",
    "Littering carries a fine of AED 500-1,000 — bins are everywhere",
  ]},
  { cat:"Currency & Money",icon:"💰", rules:[
    "Dubai Dirham (AED) — 1 USD ≈ 3.67 AED",
    "Cash is widely accepted but cards work everywhere",
    "ATMs are plentiful — use bank ATMs to avoid high fees",
    "Tipping is not mandatory but 10-15% is appreciated in restaurants",
  ]},
];

const TIPPING = [
  { service:"Restaurant",    tip:"10-15%",    note:"Often included as 'service charge' — check the bill first" },
  { service:"Hotel Porter",  tip:"AED 5-10",  note:"Per bag carried to your room" },
  { service:"Taxi",          tip:"Round up",   note:"Round to nearest 5 AED — not mandatory" },
  { service:"Salon / Spa",   tip:"10-15%",    note:"Cash tips direct to your stylist" },
  { service:"Valet Parking", tip:"AED 5-20",  note:"Give when collecting your car" },
  { service:"Hotel Maid",    tip:"AED 10-20", note:"Leave daily — staff rotate each day" },
  { service:"Room Service",  tip:"AED 10-20", note:"If service charge not included" },
  { service:"Tour Guide",    tip:"AED 20-50", note:"For half or full-day tours" },
];

export default function InfoPage() {
  const [mounted, setMounted] = useState(false);
  const [tab, setTab] = useState("emergency");
  const [copiedNum, setCopiedNum] = useState("");
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const T = { bg:"#080810", card:"rgba(255,255,255,0.04)", border:"rgba(255,255,255,0.08)", text:"#F1F5F9", sub:"rgba(255,255,255,0.45)", gold:"#F59E0B", green:"#10B981", blue:"#3B82F6", red:"#EF4444" };
  const B = (ex={}) => ({ background:T.card, border:`1px solid ${T.border}`, borderRadius:14, ...ex });

  return (
    <div style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Inter',sans-serif" }}>
      <style suppressHydrationWarning>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');*{box-sizing:border-box} .call-btn:hover{transform:scale(1.06)!important} .arabic-row:hover{background:rgba(255,255,255,0.04)!important}`}</style>

      <div style={{ background:"rgba(0,0,0,0.4)", borderBottom:`1px solid ${T.border}`, padding:"16px 24px" }}>
        <div style={{ maxWidth:1000, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontSize:22, fontWeight:800 }}>ℹ️ Dubai Info & Guide</div>
            <div style={{ fontSize:13, color:T.sub }}>Emergency numbers · Arabic phrases · Rules & tips · 100% offline</div>
          </div>
          <Link href="/tours" style={{ color:T.blue, textDecoration:"none", fontSize:13 }}>← Tours Home</Link>
        </div>
      </div>

      <div style={{ maxWidth:1000, margin:"0 auto", padding:"28px 24px" }}>
        <div style={{ display:"flex", gap:4, marginBottom:28, background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:4 }}>
          {[
            { id:"emergency", label:"🚨 Emergency" },
            { id:"arabic",    label:"🌙 Arabic Phrases" },
            { id:"rules",     label:"📋 Dubai Rules" },
            { id:"tipping",   label:"💰 Tipping Guide" },
          ].map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)}
              style={{ flex:1, padding:"10px", borderRadius:9, border:"none", background:tab===t.id?t.id==="emergency"?"#EF4444":"#3B82F6":"transparent", color:tab===t.id?"#fff":T.sub, fontSize:12, fontWeight:tab===t.id?700:500, cursor:"pointer", fontFamily:"Inter,sans-serif", transition:"all 0.18s" }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── EMERGENCY ── */}
        {tab==="emergency" && (
          <div>
            <div style={{ background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.25)", borderRadius:12, padding:"14px 18px", marginBottom:20, display:"flex", gap:12, alignItems:"center" }}>
              <span style={{ fontSize:28 }}>🆘</span>
              <div>
                <div style={{ fontSize:14, fontWeight:700, color:"#FCA5A5" }}>In case of emergency — tap to call</div>
                <div style={{ fontSize:12, color:T.sub }}>All numbers work from any mobile or hotel phone in Dubai</div>
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:12 }}>
              {EMERGENCY.map(e=>(
                <a key={e.number} href={`tel:${e.number.replace(/\s/g,"")}`} className="call-btn"
                  style={{ display:"flex", alignItems:"center", gap:14, padding:"16px 18px", background:T.card, border:`1px solid ${T.border}`, borderRadius:14, textDecoration:"none", transition:"all 0.18s", cursor:"pointer" }}>
                  <div style={{ width:48, height:48, borderRadius:12, background:"rgba(239,68,68,0.12)", border:"1px solid rgba(239,68,68,0.25)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>{e.icon}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:14, fontWeight:700, color:T.text }}>{e.name}</div>
                    <div style={{ fontSize:11, color:T.sub }}>{e.desc}</div>
                  </div>
                  <div style={{ background:"rgba(239,68,68,0.15)", border:"1px solid rgba(239,68,68,0.3)", borderRadius:8, padding:"5px 12px" }}>
                    <div style={{ fontSize:15, fontWeight:800, color:"#FCA5A5" }}>{e.number}</div>
                    <div style={{ fontSize:9, color:"rgba(239,68,68,0.6)", textAlign:"center" }}>TAP TO CALL</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* ── ARABIC ── */}
        {tab==="arabic" && (
          <div>
            <div style={{ ...B({ marginBottom:16 }) }}>
              <div style={{ fontSize:14, fontWeight:700, marginBottom:4 }}>🌙 Useful Arabic Phrases</div>
              <div style={{ fontSize:13, color:T.sub }}>Locals appreciate any attempt at Arabic — even a simple "Shukran" goes a long way!</div>
            </div>
            <div style={{ ...B({ padding:0, overflow:"hidden" }) }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", background:"rgba(255,255,255,0.04)", borderBottom:`1px solid ${T.border}` }}>
                {["English","Arabic (Arabic Script)","Pronunciation"].map(h=>(
                  <div key={h} style={{ padding:"10px 16px", fontSize:11, color:T.sub, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em" }}>{h}</div>
                ))}
              </div>
              {ARABIC.map((p,i)=>(
                <div key={p.english} className="arabic-row" style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", borderBottom:i<ARABIC.length-1?`1px solid ${T.border}`:"none", transition:"background 0.15s" }}>
                  <div style={{ padding:"12px 16px", fontSize:13, color:T.text }}>{p.english}</div>
                  <div style={{ padding:"12px 16px", fontSize:15, color:T.gold, fontFamily:"serif", direction:"rtl" }}>{p.arabic}</div>
                  <div style={{ padding:"12px 16px", fontSize:13, color:T.green, fontStyle:"italic" }}>{p.transliteration}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── RULES ── */}
        {tab==="rules" && (
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {DUBAI_RULES.map(section=>(
              <div key={section.cat} style={{ ...B() }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                  <span style={{ fontSize:24 }}>{section.icon}</span>
                  <div style={{ fontSize:15, fontWeight:700 }}>{section.cat}</div>
                </div>
                {section.rules.map((rule,i)=>(
                  <div key={i} style={{ display:"flex", gap:10, padding:"8px 0", borderBottom:i<section.rules.length-1?`1px solid ${T.border}`:"none" }}>
                    <span style={{ color:T.blue, flexShrink:0, marginTop:2 }}>•</span>
                    <span style={{ fontSize:13, color:T.sub, lineHeight:1.7 }}>{rule}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ── TIPPING ── */}
        {tab==="tipping" && (
          <div>
            <div style={{ background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:12, padding:"14px 18px", marginBottom:20 }}>
              <div style={{ fontSize:13, fontWeight:700, color:T.gold, marginBottom:4 }}>💡 Tipping Culture in Dubai</div>
              <div style={{ fontSize:13, color:T.sub }}>Tipping is not mandatory in Dubai but is greatly appreciated. Service workers often earn low wages and tips make a real difference. Always tip in cash directly to the person who served you.</div>
            </div>
            <div style={{ ...B({ padding:0, overflow:"hidden" }) }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", background:"rgba(255,255,255,0.04)", borderBottom:`1px solid ${T.border}` }}>
                {["Service","Suggested Tip","Notes"].map(h=>(
                  <div key={h} style={{ padding:"10px 16px", fontSize:11, color:T.sub, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em" }}>{h}</div>
                ))}
              </div>
              {TIPPING.map((t,i)=>(
                <div key={t.service} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", borderBottom:i<TIPPING.length-1?`1px solid ${T.border}`:"none" }}>
                  <div style={{ padding:"12px 16px", fontSize:13, fontWeight:600, color:T.text }}>{t.service}</div>
                  <div style={{ padding:"12px 16px", fontSize:14, fontWeight:800, color:T.gold }}>{t.tip}</div>
                  <div style={{ padding:"12px 16px", fontSize:12, color:T.sub }}>{t.note}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
