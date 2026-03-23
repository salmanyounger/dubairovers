"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const ATTRACTIONS = [
  { id:1, emoji:"🏙️", cat:"landmark", mustSee:true, free:false, name:"Burj Khalifa", area:"Downtown Dubai", rating:4.9, price:"AED 149+", duration:"2-3 hrs", open:"08:00 - 23:00", badge:"WORLD'S TALLEST", desc:"The world's tallest building at 828m offers breathtaking 360° views of Dubai. Visit floors 124-125 or the premium floor 148 for the ultimate sky-high experience.", tips:["🌅 Book sunset slot (6-7pm) for best views","💡 Book online — 50% cheaper than walk-up","📸 Best photos from outdoor terrace floor 124","⏰ Arrive 30 min early to beat queues","🌙 Night views equally stunning"], howToGet:"Metro Red Line to Burj Khalifa/Dubai Mall station. Walk 15 min through Dubai Mall." },
  { id:2, emoji:"🌊", cat:"beach",    mustSee:true, free:true,  name:"JBR Beach", area:"Dubai Marina", rating:4.7, price:"FREE", duration:"2-5 hrs", open:"24 hours", badge:"BEST FREE BEACH", desc:"Jumeirah Beach Residence's 1.7km public beach is Dubai's most popular strip. Walk The Walk promenade lined with cafes, restaurants and water sports.", tips:["🏖️ Go early morning (7-9am) before crowds","🌊 Water sports rental cheapest before noon","☀️ Sun loungers free — just grab one","🍹 The Beach mall has great food options","🎡 Ain Dubai ferris wheel views are stunning"], howToGet:"Metro Red Line to DMCC, then 10 min walk or tram to JBR station." },
  { id:3, emoji:"🏜️", cat:"desert",  mustSee:true, free:false, name:"Desert Safari Experience", area:"Dubai Desert", rating:4.8, price:"AED 150-500", duration:"6 hrs", open:"2:00 PM pickup", badge:"MUST DO", desc:"The quintessential Dubai experience — dune bashing, camel riding, sandboarding, Arabic BBQ dinner and cultural performances under the stars.", tips:["📅 Book evening safari for sunset + dinner","🎒 Wear light clothes — sand is hot","📸 Golden hour dunes = best photos","🍽️ Vegetarian options always available","💡 Book via DubaiRovers.com for best price"], howToGet:"Hotel pickup included with DubaiRovers booking. +971 544 735 060" },
  { id:4, emoji:"🖼️", cat:"landmark", mustSee:true, free:false, name:"Dubai Frame", area:"Zabeel Park", rating:4.5, price:"AED 50", duration:"1-2 hrs", open:"09:00 - 21:00", badge:"ICONIC VIEW", desc:"A massive picture frame-shaped structure standing 150m tall. One side shows old Dubai, the other new Dubai — perfectly bridging the city's past and future.", tips:["💰 Best value landmark in Dubai at AED 50","📸 Glass floor walkway is thrilling","🌅 Visit at sunset for two-sided views","🏙️ Best view of both old and new Dubai","⏰ Weekday mornings are quietest"], howToGet:"Metro Green Line to Al Jafiliya, 15 min walk. RTA bus 17 stops nearby." },
  { id:5, emoji:"🛍️", cat:"landmark", mustSee:true, free:true,  name:"Dubai Mall", area:"Downtown Dubai", rating:4.6, price:"FREE (entry)", duration:"3-6 hrs", open:"10:00 - 24:00", badge:"WORLD'S BIGGEST", desc:"Over 1,200 shops, the Dubai Aquarium, an Olympic-size ice rink, dinosaur skeleton and the spectacular Dubai Fountain show at its doorstep.", tips:["🐠 Dubai Aquarium is worth the AED 90 ticket","⛸️ Ice rink sessions from AED 100","🦕 Dinosaur skeleton free to view","🚶 App map essential — it's enormous","💧 Fountain show every 30 min from 6pm (free)"], howToGet:"Metro Red Line to Burj Khalifa/Dubai Mall. Direct air-conditioned bridge from station." },
  { id:6, emoji:"🕌", cat:"mosque",   mustSee:true, free:true,  name:"Jumeirah Mosque", area:"Jumeirah", rating:4.8, price:"AED 35", duration:"1-2 hrs", open:"Sat-Thu 10:00 AM", badge:"OPEN TO ALL", desc:"One of the most beautiful mosques in Dubai, Jumeirah Mosque is one of the only mosques in the UAE open to non-Muslims. The guided tour includes Arabic coffee and dates.", tips:["🧕 Modest dress required — abayas provided free","📸 Beautiful architecture for photography","☕ Arabic coffee and dates included","📚 Guides explain Islamic culture respectfully","🕐 Only morning tour — arrive 10 mins early"], howToGet:"Bus routes J01, 8, 9 to Jumeirah Mosque stop. 10 min drive from Downtown." },
  { id:7, emoji:"🎡", cat:"landmark", mustSee:false, free:false, name:"Ain Dubai", area:"Bluewaters Island", rating:4.4, price:"AED 130+", duration:"1-2 hrs", open:"15:00 - 24:00", badge:"WORLD'S LARGEST WHEEL", desc:"The world's largest observation wheel at 250m, offering panoramic views of Dubai's skyline, Palm Jumeirah and the Arabian Gulf from Bluewaters Island.", tips:["🌇 Sunset cabin for romantic views","🍷 Premium cabins include food & drinks","📸 Best skyline + Palm Jumeirah angles","❄️ Cabins are air-conditioned","🌊 Combine with JBR Beach day trip"], howToGet:"Metro Red Line to DMCC, tram to Bluewaters, 5 min walk. Free shuttle from JBR." },
  { id:8, emoji:"🌊", cat:"beach",    mustSee:false, free:true,  name:"Kite Beach", area:"Jumeirah", rating:4.7, price:"FREE", duration:"2-4 hrs", open:"24 hours", badge:"SPORTS BEACH", desc:"Dubai's most athletic beach with kite surfers, beach volleyball courts, cycling tracks, and amazing views of Burj Al Arab. Great beach food trucks too.", tips:["🏄 Kite surfing lessons available from AED 200","🚴 Bicycle hire from AED 30/hour","🌅 Burj Al Arab backdrop for photos","🍔 Food trucks offer great value eats","🏐 Free volleyball courts, just join a game"], howToGet:"No metro nearby. Taxi 15 min from Downtown. Free parking available." },
  { id:9, emoji:"🚢", cat:"landmark", mustSee:false, free:false, name:"Dhow Cruise", area:"Dubai Marina / Creek", rating:4.8, price:"AED 99-250", duration:"2 hrs", open:"7:00 PM dinner cruise", badge:"MUST EXPERIENCE", desc:"A traditional wooden dhow dinner cruise along Dubai Marina or historic Dubai Creek. Includes buffet dinner, entertainment and stunning night views of the Dubai skyline.", tips:["🌙 Marina cruise offers modern skyline views","🕌 Creek cruise shows historic old Dubai","🍽️ 40+ dish buffet included","💃 Tanoura dance & live music on board","📅 Book via DubaiRovers for best price"], howToGet:"Marina cruise: Metro Red Line to DMCC, 10 min walk to marina. Hotel pickup available." },
  { id:10, emoji:"🎈", cat:"desert",  mustSee:false, free:false, name:"Hot Air Balloon", area:"Dubai Desert", rating:5.0, price:"AED 699", duration:"4 hrs total", open:"5:30 AM pickup", badge:"TOP RATED", desc:"Float silently over the Dubai desert at sunrise in a hot air balloon. One of the most magical experiences available in the UAE — see the dunes from 1,200 metres up.", tips:["🌅 Best booked for clear weather mornings","📸 Full 360° panoramic desert views","🥂 Champagne breakfast after landing","🦅 Falconry demonstration included","☁️ Cancelled for safety if cloudy — free rebook"], howToGet:"Hotel pickup from 5:30 AM included. Book via DubaiRovers.com +971 544 735 060" },
  { id:11, emoji:"🐠", cat:"landmark", mustSee:false, free:false, name:"Dubai Aquarium", area:"Dubai Mall", rating:4.6, price:"AED 90+", duration:"2-3 hrs", open:"10:00 - 22:00", badge:"MASSIVE TANK", desc:"One of the world's largest suspended aquariums with 33,000 aquatic animals including 400 sharks and rays. The 10-million-litre tank is viewable from Dubai Mall for free.", tips:["💡 View main tank for free from mall","🦈 Shark Encounter package from AED 150","🐠 Underwater zoo upstairs included","📸 Tunnel walk-through for photos","⏰ Weekday mornings are less crowded"], howToGet:"Inside Dubai Mall. Metro Red Line to Burj Khalifa/Dubai Mall station." },
  { id:12, emoji:"🌴", cat:"park",    mustSee:false, free:false, name:"Miracle Garden", area:"Al Barsha South", rating:4.5, price:"AED 55", duration:"2-3 hrs", open:"09:00 - 21:00 (Oct-Apr)", badge:"WORLD'S LARGEST FLOWER GARDEN", desc:"The world's largest natural flower garden with over 150 million flowers in incredible designs. Only open October to April — miss it and wait a year.", tips:["📅 ONLY open Oct-April — check before going","📸 Best photos mid-morning with good light","💐 Over 150 million flowers in bloom","🌸 New designs each season","👨‍👩‍👧 Kids love the cartoon character designs"], howToGet:"Bus routes F30, F31 from Mall of Emirates. 20 min taxi from JBR." },
  { id:13, emoji:"🏛️", cat:"museum",  mustSee:false, free:false, name:"Museum of the Future", area:"Sheikh Zayed Road", rating:4.7, price:"AED 149", duration:"2-4 hrs", open:"10:00 - 20:00", badge:"WORLD'S MOST BEAUTIFUL BUILDING", desc:"Opened in 2022, this stunning toroidal building explores possible futures through immersive experiences. Arabic calligraphy facade makes it one of the most photographed buildings in Dubai.", tips:["🎟️ Book online — often sells out","📸 Exterior most photogenic at golden hour","🚀 5 floors of immersive future experiences","🌿 OSS Hope (space station) experience is mind-blowing","🌍 Climate crisis floor is thought-provoking"], howToGet:"Metro Red Line to Emirates Towers station, 5 min walk." },
  { id:14, emoji:"🛒", cat:"market",  mustSee:false, free:true,  name:"Gold & Spice Souk", area:"Deira, Old Dubai", rating:4.6, price:"FREE", duration:"2-3 hrs", open:"10:00 - 22:00", badge:"AUTHENTIC DUBAI", desc:"Step back 50 years in Old Dubai. The Gold Souk has 380+ shops with over 10 tonnes of gold on display. Across the creek, the Spice Souk overwhelms with aromas of saffron, frankincense and exotic spices.", tips:["💰 Bargaining is expected — start at 60%","🪙 Gold prices fixed by gov't — workmanship fee negotiable","⛵ Take an Abra water taxi across creek (AED 1)","📸 Best photos at the Gold Souk entrance arch","🕐 Shops close 1-4pm for lunch — plan accordingly"], howToGet:"Metro Green Line to Al Ras station, 5 min walk to Gold Souk." },
  { id:15, emoji:"🚁", cat:"landmark", mustSee:false, free:false, name:"Dubai Helicopter Tour", area:"Citywide", rating:4.9, price:"AED 695+", duration:"12-40 min", open:"07:00 - 19:00", badge:"ULTIMATE VIEW", desc:"See all of Dubai from the air — Burj Khalifa, Palm Jumeirah, The World Islands and the entire skyline from a luxury helicopter. The most spectacular way to see the city.", tips:["📸 Request left side seat for Burj Khalifa views","🌅 Golden hour flight (7am) for best light","💑 Perfect romantic experience","🚁 12-min tour covers the highlights","🎁 Gift vouchers available"], howToGet:"Helipad at Dubai Festival City. Transfers arranged by operator." },
];

const CATS = [
  { id:"all",      label:"All",         icon:"🌍" },
  { id:"landmark", label:"Landmarks",   icon:"🏛️" },
  { id:"beach",    label:"Beaches",     icon:"🏖️" },
  { id:"desert",   label:"Desert",      icon:"🏜️" },
  { id:"mosque",   label:"Mosques",     icon:"🕌" },
  { id:"museum",   label:"Museums",     icon:"🖼️" },
  { id:"market",   label:"Markets",     icon:"🛒" },
  { id:"park",     label:"Parks",       icon:"🌳" },
];

export default function AttractionsPage() {
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("all");
  const [freeOnly, setFreeOnly] = useState(false);
  const [mustSee, setMustSee] = useState(false);
  const [selected, setSelected] = useState(null);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const filtered = ATTRACTIONS.filter(a => {
    const ms = !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.area.toLowerCase().includes(search.toLowerCase());
    const mc = cat === "all" || a.cat === cat;
    const mf = !freeOnly || a.free;
    const mm = !mustSee || a.mustSee;
    return ms && mc && mf && mm;
  });

  const T = { bg:"#080810", card:"rgba(255,255,255,0.04)", border:"rgba(255,255,255,0.08)", text:"#F1F5F9", sub:"rgba(255,255,255,0.45)", gold:"#F59E0B", green:"#10B981", blue:"#3B82F6" };
  const B = (ex={}) => ({ background:T.card, border:`1px solid ${T.border}`, borderRadius:14, ...ex });

  return (
    <div style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Inter',sans-serif" }}>
      <style suppressHydrationWarning>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');*{box-sizing:border-box} .att-card:hover{transform:translateY(-4px)!important;box-shadow:0 16px 40px rgba(59,130,246,0.2)!important} @keyframes slideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:none}}.slide-in{animation:slideIn 0.3s ease}`}</style>

      {/* Header */}
      <div style={{ background:"linear-gradient(135deg,rgba(59,130,246,0.15),rgba(16,185,129,0.08))", borderBottom:`1px solid ${T.border}`, padding:"20px 24px" }}>
        <div style={{ maxWidth:1300, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
            <div>
              <div style={{ fontSize:28, fontWeight:900, marginBottom:4 }}>🇦🇪 Dubai Attractions Guide</div>
              <div style={{ fontSize:14, color:T.sub }}>15 hand-picked attractions with insider tips, transport guides & booking info</div>
            </div>
            <Link href="/tours" style={{ color:T.blue, textDecoration:"none", fontSize:13 }}>← Tours Home</Link>
          </div>

          {/* Search */}
          <div style={{ position:"relative", marginBottom:14 }}>
            <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", fontSize:16 }}>🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search attractions or areas..."
              style={{ width:"100%", padding:"12px 14px 12px 42px", background:"rgba(255,255,255,0.06)", border:`1px solid ${T.border}`, borderRadius:12, color:T.text, fontSize:14, fontFamily:"Inter,sans-serif", outline:"none" }}/>
          </div>

          {/* Filters */}
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center" }}>
            {CATS.map(c=>(
              <button key={c.id} onClick={()=>setCat(c.id)}
                style={{ padding:"6px 14px", borderRadius:20, border:`1px solid ${cat===c.id?T.blue:T.border}`, background:cat===c.id?"rgba(59,130,246,0.15)":"transparent", color:cat===c.id?T.blue:T.sub, fontSize:12, fontWeight:cat===c.id?700:400, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>
                {c.icon} {c.label}
              </button>
            ))}
            <button onClick={()=>setFreeOnly(s=>!s)}
              style={{ padding:"6px 14px", borderRadius:20, border:`1px solid ${freeOnly?T.green:T.border}`, background:freeOnly?"rgba(16,185,129,0.15)":"transparent", color:freeOnly?T.green:T.sub, fontSize:12, fontWeight:freeOnly?700:400, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>
              🆓 Free Only
            </button>
            <button onClick={()=>setMustSee(s=>!s)}
              style={{ padding:"6px 14px", borderRadius:20, border:`1px solid ${mustSee?T.gold:T.border}`, background:mustSee?"rgba(245,158,11,0.15)":"transparent", color:mustSee?T.gold:T.sub, fontSize:12, fontWeight:mustSee?700:400, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>
              ⭐ Must-See Only
            </button>
            <span style={{ fontSize:12, color:T.sub, marginLeft:"auto" }}>{filtered.length} attractions</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:1300, margin:"0 auto", padding:"24px", display:"grid", gridTemplateColumns:selected?"1fr 400px":"1fr", gap:20 }}>
        {/* Grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14, alignContent:"start" }}>
          {filtered.map(att => (
            <div key={att.id} className="att-card" onClick={()=>setSelected(att.id===selected?null:att.id)}
              style={{ ...B({ padding:0, overflow:"hidden", cursor:"pointer", transition:"all 0.25s ease", border:`1.5px solid ${selected===att.id?"rgba(59,130,246,0.5)":T.border}`, boxShadow:selected===att.id?"0 16px 40px rgba(59,130,246,0.2)":"none" }) }}>
              <div style={{ padding:"18px 18px 14px", display:"flex", alignItems:"flex-start", gap:14 }}>
                <div style={{ width:52, height:52, borderRadius:12, background:"rgba(59,130,246,0.12)", border:"1px solid rgba(59,130,246,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, flexShrink:0 }}>{att.emoji}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3, flexWrap:"wrap" }}>
                    <span style={{ fontSize:14, fontWeight:800, color:T.text }}>{att.name}</span>
                    {att.mustSee && <span style={{ fontSize:9, background:"rgba(245,158,11,0.2)", color:T.gold, border:"1px solid rgba(245,158,11,0.4)", borderRadius:4, padding:"1px 5px", fontWeight:700 }}>⭐ MUST SEE</span>}
                    {att.free && <span style={{ fontSize:9, background:"rgba(16,185,129,0.2)", color:T.green, border:"1px solid rgba(16,185,129,0.4)", borderRadius:4, padding:"1px 5px", fontWeight:700 }}>🆓 FREE</span>}
                  </div>
                  <div style={{ fontSize:11, color:T.sub, marginBottom:6 }}>📍 {att.area}</div>
                  <div style={{ display:"flex", gap:10, fontSize:11 }}>
                    <span style={{ color:T.gold }}>⭐ {att.rating}</span>
                    <span style={{ color:T.sub }}>⏱ {att.duration}</span>
                    <span style={{ color:T.blue, fontWeight:600 }}>{att.price}</span>
                  </div>
                </div>
              </div>
              <div style={{ borderTop:`1px solid ${T.border}`, padding:"10px 18px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontSize:10, background:"rgba(255,255,255,0.06)", border:`1px solid ${T.border}`, borderRadius:4, padding:"2px 8px", color:T.sub, fontWeight:600, textTransform:"uppercase" }}>{att.badge}</span>
                <span style={{ fontSize:12, color:T.blue }}>{selected===att.id?"▲ Less":"▼ Details"}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        {selected && (() => {
          const att = ATTRACTIONS.find(a=>a.id===selected);
          return att ? (
            <div className="slide-in" style={{ position:"sticky", top:20, height:"fit-content", ...B({ padding:0, overflow:"hidden" }) }}>
              <div style={{ background:`rgba(59,130,246,0.12)`, padding:"20px" }}>
                <div style={{ fontSize:42, marginBottom:8 }}>{att.emoji}</div>
                <div style={{ fontSize:20, fontWeight:800, marginBottom:4 }}>{att.name}</div>
                <div style={{ fontSize:13, color:T.sub }}>📍 {att.area}</div>
              </div>
              <div style={{ padding:"16px 20px" }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:16 }}>
                  {[{l:"Price",v:att.price,c:T.blue},{l:"Duration",v:att.duration,c:T.gold},{l:"Hours",v:att.open,c:T.green},{l:"Rating",v:"⭐ "+att.rating,c:T.gold}].map(s=>(
                    <div key={s.l} style={{ background:"rgba(255,255,255,0.04)", borderRadius:8, padding:"8px 10px" }}>
                      <div style={{ fontSize:10, color:T.sub }}>{s.l}</div>
                      <div style={{ fontSize:12, fontWeight:700, color:s.c }}>{s.v}</div>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize:13, color:T.sub, lineHeight:1.7, marginBottom:14 }}>{att.desc}</p>
                <div style={{ marginBottom:14 }}>
                  <div style={{ fontSize:13, fontWeight:700, marginBottom:8 }}>💡 Insider Tips</div>
                  {att.tips.map((tip,i)=><div key={i} style={{ fontSize:12, color:T.sub, padding:"5px 0", borderBottom:i<att.tips.length-1?`1px solid ${T.border}`:"none" }}>{tip}</div>)}
                </div>
                <div style={{ background:"rgba(59,130,246,0.08)", border:"1px solid rgba(59,130,246,0.2)", borderRadius:10, padding:"10px 14px", marginBottom:16 }}>
                  <div style={{ fontSize:12, fontWeight:700, color:T.blue, marginBottom:4 }}>🚇 How to Get There</div>
                  <div style={{ fontSize:12, color:T.sub }}>{att.howToGet}</div>
                </div>
                {(att.id===3||att.id===10||att.id===9) && (
                  <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
                    style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, width:"100%", padding:"11px", background:"linear-gradient(135deg,#25D366,#128C7E)", borderRadius:10, color:"#fff", fontSize:13, fontWeight:700, textDecoration:"none" }}>
                    💬 Book via DubaiRovers
                  </a>
                )}
              </div>
            </div>
          ) : null;
        })()}
      </div>
    </div>
  );
}
