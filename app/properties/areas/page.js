"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const AREAS = [
  {
    id:"downtown", name:"Downtown Dubai", emoji:"🏙️", color:"#6366F1",
    tagline:"Heart of the city — Burj Khalifa & luxury living",
    pricePerSqft:{ buy:2850, rent:210 }, avgRent1BR:155000, avgRent2BR:250000,
    roi:7.2, growth5yr:68, walkScore:95, transitScore:90,
    population:"HNWI, business executives, luxury seekers",
    pros:["Iconic Burj Khalifa views","World-class amenities","Dubai Mall & Fountain steps away","Strong capital appreciation","Best metro connectivity"],
    cons:["Most expensive area","Tourist crowds","High service charges","Traffic congestion"],
    bestFor:["Luxury buyers","Capital appreciation","Short-term rental investors"],
    transport:["Burj Khalifa/Dubai Mall Metro (Red Line)","Water Taxi","RTA Buses"],
    majorProjects:["Burj Khalifa","Dubai Mall","The Address","BLVD Heights","Forte"],
    schoolsNearby:["Jumeirah English Speaking School","Dubai International Academy"],
    image:"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
  },
  {
    id:"marina", name:"Dubai Marina", emoji:"⛵", color:"#F97316",
    tagline:"Waterfront lifestyle — 24/7 vibrancy & sea views",
    pricePerSqft:{ buy:1850, rent:145 }, avgRent1BR:120000, avgRent2BR:185000,
    roi:8.0, growth5yr:52, walkScore:92, transitScore:88,
    population:"Young professionals, expats, tourists",
    pros:["Marina waterfront access","Walk to JBR Beach","Excellent nightlife & dining","High rental demand","DMCC Metro nearby"],
    cons:["Traffic congestion","Noise from restaurants","High service charges","Parking issues for guests"],
    bestFor:["Rental investors","Young professionals","Lifestyle buyers"],
    transport:["DMCC Metro (Red Line)","Marina Tram","Water Bus","Dubai Ferry"],
    majorProjects:["Marina Gate","Princess Tower","The Torch","Cayan Tower","Damac Heights"],
    schoolsNearby:["Dubai International Academy","Regent International School"],
    image:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
  },
  {
    id:"jvc", name:"JVC (Jumeirah Village Circle)", emoji:"🌳", color:"#10B981",
    tagline:"Affordable community living — best value in Dubai",
    pricePerSqft:{ buy:930, rent:78 }, avgRent1BR:62000, avgRent2BR:95000,
    roi:8.8, growth5yr:42, walkScore:55, transitScore:45,
    population:"Young families, middle-income expats, first-time buyers",
    pros:["Most affordable Dubai area","Highest rental yield","Family-friendly","New buildings","Circle Mall nearby"],
    cons:["No metro access","Far from beach","Car-dependent","Fewer luxury amenities"],
    bestFor:["First-time buyers","High-yield investors","Young families"],
    transport:["Bus routes only","Taxi/Careem","Car essential"],
    majorProjects:["Binghatti Avenue","Ghalia","Bloom Towers","Belgravia","Safi Apartments"],
    schoolsNearby:["JSS International School","Sunmarke School","Nord Anglia Dubai"],
    image:"https://images.unsplash.com/photo-1560184897-ae75f418493e?w=600&q=80",
  },
  {
    id:"palm", name:"Palm Jumeirah", emoji:"🌴", color:"#F59E0B",
    tagline:"Iconic island living — Dubai's most prestigious address",
    pricePerSqft:{ buy:3200, rent:280 }, avgRent1BR:254800, avgRent2BR:442400,
    roi:8.7, growth5yr:85, walkScore:40, transitScore:35,
    population:"HNWI, celebrities, luxury investors, holiday home buyers",
    pros:["Private beach access","Most iconic address","Highest appreciation","Celebrity community","Best Gulf views"],
    cons:["Highest price point","Traffic on Palm trunk","Limited transport","High service charges","Far from city"],
    bestFor:["HNWI buyers","Holiday home investors","Prestige seekers"],
    transport:["Palm Monorail","Water Taxi","Car essential","Nakheel Mall bus"],
    majorProjects:["FIVE Palm","Atlantis The Palm","Signature Villas","Garden Homes","Nakheel Mall"],
    schoolsNearby:["Dubai British School","GEMS Wellington","Regent International"],
    image:"https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=80",
  },
  {
    id:"hills", name:"Dubai Hills Estate", emoji:"⛳", color:"#8B5CF6",
    tagline:"Master-planned green community — best family area",
    pricePerSqft:{ buy:1450, rent:108 }, avgRent1BR:85000, avgRent2BR:140000,
    roi:7.4, growth5yr:65, walkScore:45, transitScore:40,
    population:"Families, professionals, long-term residents",
    pros:["Emaar quality","Golf course views","Top schools nearby","Dubai Hills Mall","Green spaces & parks"],
    cons:["No public transport","Far from beach","Car-dependent","Premium pricing"],
    bestFor:["Families with children","Long-term residents","Quality lifestyle seekers"],
    transport:["Bus routes","Car essential","Planned Metro expansion"],
    majorProjects:["Golf Grove Villas","Park Heights","Golf Place","Acacia","Mayfair Villas"],
    schoolsNearby:["GEMS International","King's College Hospital nearby","Fairgreen International"],
    image:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
  },
];

export default function AreasPage() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState("downtown");
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const area = AREAS.find(a => a.id === active);
  const T = { bg:"#080810", card:"rgba(255,255,255,0.04)", border:"rgba(255,255,255,0.08)", text:"#F1F5F9", sub:"rgba(255,255,255,0.45)", gold:"#F59E0B", green:"#10B981" };
  const B = (ex={}) => ({ background:T.card, border:`1px solid ${T.border}`, borderRadius:14, padding:"18px 20px", ...ex });

  return (
    <div style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Inter',sans-serif" }}>
      <style suppressHydrationWarning>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');*{box-sizing:border-box}`}</style>

      <div style={{ background:"rgba(0,0,0,0.4)", borderBottom:`1px solid ${T.border}`, padding:"16px 24px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <div style={{ fontSize:22, fontWeight:800 }}>🗺️ Dubai Area Guides</div>
            <div style={{ fontSize:13, color:T.sub }}>ROI data · price history · community insights for 5 top areas</div>
          </div>
          <Link href="/properties" style={{ color:"#818CF8", textDecoration:"none", fontSize:13 }}>← Properties</Link>
        </div>
      </div>

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"28px 24px" }}>
        {/* Area selector */}
        <div style={{ display:"flex", gap:10, marginBottom:28, overflowX:"auto", paddingBottom:4 }}>
          {AREAS.map(a => (
            <button key={a.id} onClick={()=>setActive(a.id)}
              style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 18px", borderRadius:12, border:`1.5px solid ${active===a.id?a.color:T.border}`, background:active===a.id?`${a.color}15`:"transparent", color:active===a.id?a.color:T.sub, fontSize:13, fontWeight:active===a.id?700:400, cursor:"pointer", fontFamily:"Inter,sans-serif", whiteSpace:"nowrap", transition:"all 0.2s" }}>
              {a.emoji} {a.name}
            </button>
          ))}
        </div>

        {/* Hero */}
        <div style={{ position:"relative", borderRadius:18, overflow:"hidden", height:260, marginBottom:24 }}>
          <img src={area.image} alt={area.name} style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
          <div style={{ position:"absolute", inset:0, background:`linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 100%)` }}/>
          <div style={{ position:"absolute", inset:0, padding:"28px 32px", display:"flex", flexDirection:"column", justifyContent:"flex-end" }}>
            <div style={{ fontSize:42, marginBottom:8 }}>{area.emoji}</div>
            <div style={{ fontSize:32, fontWeight:900, color:"#fff", marginBottom:4 }}>{area.name}</div>
            <div style={{ fontSize:15, color:"rgba(255,255,255,0.7)" }}>{area.tagline}</div>
          </div>
        </div>

        {/* Key stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:12, marginBottom:24 }}>
          {[
            { icon:"💰", label:"Buy Price/sqft", val:"AED "+area.pricePerSqft.buy.toLocaleString(), color:area.color },
            { icon:"🔑", label:"Rent 1BR/yr",   val:"AED "+area.avgRent1BR.toLocaleString(),       color:T.green },
            { icon:"📈", label:"Rental Yield",  val:area.roi+"%",                                   color:T.gold },
            { icon:"🚀", label:"5yr Growth",    val:"+"+area.growth5yr+"%",                         color:area.color },
            { icon:"🚶", label:"Walk Score",    val:area.walkScore+"/100",                          color:"#818CF8" },
          ].map(s=>(
            <div key={s.label} style={{ ...B({ textAlign:"center" }) }}>
              <div style={{ fontSize:20, marginBottom:4 }}>{s.icon}</div>
              <div style={{ fontSize:16, fontWeight:800, color:s.color }}>{s.val}</div>
              <div style={{ fontSize:10, color:T.sub, marginTop:2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16 }}>
          {/* Pros & cons */}
          <div style={{ ...B() }}>
            <div style={{ fontSize:14, fontWeight:700, marginBottom:12 }}>✅ Pros</div>
            {area.pros.map((p,i)=><div key={i} style={{ display:"flex", gap:8, fontSize:13, color:T.sub, padding:"5px 0", borderBottom:i<area.pros.length-1?`1px solid ${T.border}`:"none" }}><span style={{ color:T.green }}>+</span>{p}</div>)}
            <div style={{ fontSize:14, fontWeight:700, margin:"14px 0 12px" }}>⚠️ Cons</div>
            {area.cons.map((c,i)=><div key={i} style={{ display:"flex", gap:8, fontSize:13, color:T.sub, padding:"5px 0", borderBottom:i<area.cons.length-1?`1px solid ${T.border}`:"none" }}><span style={{ color:"#EF4444" }}>−</span>{c}</div>)}
          </div>

          {/* Best for + Transport */}
          <div>
            <div style={{ ...B({ marginBottom:14 }) }}>
              <div style={{ fontSize:14, fontWeight:700, marginBottom:12 }}>🎯 Best For</div>
              {area.bestFor.map((b,i)=><div key={i} style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 0", borderBottom:i<area.bestFor.length-1?`1px solid ${T.border}`:"none" }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:area.color, flexShrink:0 }}/>
                <span style={{ fontSize:13, color:T.sub }}>{b}</span>
              </div>)}
            </div>
            <div style={{ ...B() }}>
              <div style={{ fontSize:14, fontWeight:700, marginBottom:12 }}>🚇 Transport</div>
              {area.transport.map((t,i)=><div key={i} style={{ fontSize:13, color:T.sub, padding:"5px 0", borderBottom:i<area.transport.length-1?`1px solid ${T.border}`:"none" }}>🔹 {t}</div>)}
            </div>
          </div>

          {/* Projects + Schools */}
          <div>
            <div style={{ ...B({ marginBottom:14 }) }}>
              <div style={{ fontSize:14, fontWeight:700, marginBottom:12 }}>🏗️ Key Projects</div>
              {area.majorProjects.map((p,i)=><div key={i} style={{ fontSize:13, color:T.sub, padding:"5px 0", borderBottom:i<area.majorProjects.length-1?`1px solid ${T.border}`:"none" }}>🏢 {p}</div>)}
            </div>
            <div style={{ ...B() }}>
              <div style={{ fontSize:14, fontWeight:700, marginBottom:12 }}>🎓 Nearby Schools</div>
              {area.schoolsNearby.map((s,i)=><div key={i} style={{ fontSize:13, color:T.sub, padding:"5px 0", borderBottom:i<area.schoolsNearby.length-1?`1px solid ${T.border}`:"none" }}>📚 {s}</div>)}
            </div>
          </div>
        </div>

        {/* Population */}
        <div style={{ ...B({ marginTop:16, display:"flex", alignItems:"center", gap:14 }) }}>
          <span style={{ fontSize:28 }}>👥</span>
          <div>
            <div style={{ fontSize:13, fontWeight:700, marginBottom:3 }}>Who lives here?</div>
            <div style={{ fontSize:13, color:T.sub }}>{area.population}</div>
          </div>
          <div style={{ marginLeft:"auto" }}>
            <Link href="/properties" style={{ background:`${area.color}22`, border:`1px solid ${area.color}44`, borderRadius:10, padding:"9px 18px", color:area.color, fontSize:13, fontWeight:700, textDecoration:"none" }}>
              View Properties in {area.name} →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
