"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

// ─── TOUR DATA ────────────────────────────────────────────────────
const TOURS = [
  { id:"desert-safari",  emoji:"🏜️", name:"Desert Safari VIP",       sub:"Dunes, BBQ & stargazing",      price:299, rating:4.9, reviews:2847, badge:"⭐ TOP PICK", cat:"DESERT",    dur:"6h",  group:"2-40", bg:"linear-gradient(135deg,#2d1500,#4a2000)", slug:"desert-safari-dubai",     inc:["Hotel pickup","Dune bashing","BBQ dinner","Live show"], exc:["Alcohol","Insurance"] },
  { id:"dhow-cruise",    emoji:"⛵", name:"Dhow Cruise Marina",        sub:"Sunset dinner on the water",   price:199, rating:4.7, reviews:1834, badge:"🌊 ROMANTIC",  cat:"CRUISE",    dur:"2.5h",group:"2-100",bg:"linear-gradient(135deg,#001525,#002a40)", slug:"dhow-cruise-dubai",       inc:["Welcome drink","Buffet dinner","Live music"],         exc:["Alcohol","Transfers"] },
  { id:"city-tour",      emoji:"🏙️", name:"Dubai City Tour",           sub:"Iconic landmarks & culture",   price:149, rating:4.8, reviews:1205, badge:"📸 POPULAR",  cat:"CITY",      dur:"5h",  group:"2-20", bg:"linear-gradient(135deg,#0a0a20,#1a1a40)", slug:"private-city-tour-dubai", inc:["AC vehicle","Guide","Entry fees"],                     exc:["Meals","Personal"] },
  { id:"yas-island",     emoji:"🌟", name:"Yas Island Abu Dhabi",      sub:"Theme parks & adventures",     price:499, rating:4.9, reviews:987,  badge:"🎢 THRILL",   cat:"ABU DHABI", dur:"10h", group:"2-8",  bg:"linear-gradient(135deg,#1a0030,#300060)", slug:"tours",                   inc:["Transport","Ferrari World","Yas Waterworld"],          exc:["Meals","Personal"] },
  { id:"hatta-trek",     emoji:"🧗", name:"Hatta Mountain Trek",       sub:"Wadis, kayaking & Heritage",   price:259, rating:4.8, reviews:654,  badge:"🏔️ NATURE",  cat:"ADVENTURE", dur:"8h",  group:"2-15", bg:"linear-gradient(135deg,#001a00,#003300)", slug:"tours",                   inc:["Transport","Guide","Kayak"],                           exc:["Meals","Personal"] },
  { id:"night-tour",     emoji:"🌙", name:"Dubai Night Tour",          sub:"City lights & night views",    price:129, rating:4.6, reviews:876,  badge:"✨ MAGICAL",   cat:"NIGHT",     dur:"3h",  group:"2-20", bg:"linear-gradient(135deg,#080010,#100025)", slug:"tours",                   inc:["AC vehicle","Guide","Fountain show"],                  exc:["Meals","Personal"] },
  { id:"helicopter",     emoji:"🚁", name:"Helicopter Tour",           sub:"Sky-high Dubai aerial views",  price:899, rating:5.0, reviews:432,  badge:"🏆 LUXURY",   cat:"VIP",       dur:"15m", group:"1-6",  bg:"linear-gradient(135deg,#1a1000,#302000)", slug:"tours",                   inc:["15min flight","Pilot","Photos"],                       exc:["Insurance","Personal"] },
  { id:"overnight-camp", emoji:"🏕️", name:"Overnight Desert Camp",     sub:"Sleep under a million stars",  price:599, rating:4.9, reviews:543,  badge:"🌌 UNIQUE",   cat:"DESERT",    dur:"15h", group:"2-20", bg:"linear-gradient(135deg,#100800,#201500)", slug:"desert-safari-dubai",     inc:["Transport","Tent","All meals","Activities"],           exc:["Alcohol","Personal"] },
  { id:"dolphin-bay",    emoji:"🐬", name:"Dolphin Bay Experience",    sub:"Swim with dolphins",           price:380, rating:4.8, reviews:1102, badge:"💙 FAMILY",   cat:"ADVENTURE", dur:"2h",  group:"1-8",  bg:"linear-gradient(135deg,#001520,#002535)", slug:"tours",                   inc:["Entry","Swim session","Photo"],                        exc:["Insurance","Personal"] },
  { id:"heritage-walk",  emoji:"🏠", name:"Old Dubai Heritage Walk",   sub:"Spice souk & Al Fahidi",       price:89,  rating:4.7, reviews:2103, badge:"🕌 CULTURE",  cat:"CITY",      dur:"2h",  group:"2-20", bg:"linear-gradient(135deg,#1a0a00,#2a1500)", slug:"tours",                   inc:["Guide","Abra ride","Spice souk"],                      exc:["Meals","Personal"] },
];

// ─── PROPERTY DATA ────────────────────────────────────────────────
const PROPS = [
  { name:"Marina Heights",    loc:"Dubai Marina",      beds:2, sqft:1200, price:2.4,  roi:4.5, badge:"💎 PREMIUM",    em:"🏙️", emirate:"Dubai" },
  { name:"Emaar Creek Views", loc:"Creek Harbour",     beds:1, sqft:680,  price:1.1,  roi:5.5, badge:"🆕 OFF-PLAN",   em:"🌊", emirate:"Dubai" },
  { name:"Palm Villa",        loc:"Palm Jumeirah",     beds:4, sqft:4200, price:12.5, roi:3.8, badge:"🌴 LUXURY",     em:"🌴", emirate:"Dubai" },
  { name:"Saadiyat Island",   loc:"Abu Dhabi",         beds:2, sqft:1100, price:1.8,  roi:5.0, badge:"🎨 CULTURAL",   em:"🏛️", emirate:"Abu Dhabi" },
  { name:"Al Rahba Villa",    loc:"Abu Dhabi",         beds:3, sqft:2800, price:3.2,  roi:4.5, badge:"🌿 FAMILY",     em:"🌿", emirate:"Abu Dhabi" },
  { name:"Maryam Island",     loc:"Sharjah",           beds:1, sqft:750,  price:0.7,  roi:6.0, badge:"💰 VALUE",      em:"🌊", emirate:"Sharjah" },
  { name:"Mina Al Arab",      loc:"RAK",               beds:2, sqft:950,  price:0.85, roi:6.4, badge:"🌊 WATERFRONT", em:"⛵", emirate:"RAK" },
  { name:"Downtown Burj",     loc:"Downtown Dubai",    beds:1, sqft:780,  price:1.9,  roi:5.4, badge:"🌇 ICONIC",     em:"🗼", emirate:"Dubai" },
];

// ─── ARCH STYLES ──────────────────────────────────────────────────
const ARCH_STYLES = [
  { em:"🏛️", name:"Classical",     cost:"PKR 1.5–2.5 Cr" },
  { em:"🏠", name:"Modern",         cost:"PKR 1.2–2.0 Cr" },
  { em:"🕌", name:"Islamic",        cost:"PKR 1.8–3.0 Cr" },
  { em:"🌿", name:"Eco-Green",      cost:"PKR 1.4–2.2 Cr" },
  { em:"🔮", name:"Futurist",       cost:"PKR 2.5–4.0 Cr" },
  { em:"🏯", name:"Colonial",       cost:"PKR 1.6–2.8 Cr" },
  { em:"🌊", name:"Coastal",        cost:"PKR 1.3–2.2 Cr" },
  { em:"🏔️", name:"Alpine",        cost:"PKR 1.4–2.4 Cr" },
  { em:"🏺", name:"Mediterranean",  cost:"PKR 1.7–2.9 Cr" },
];

// ─── SURAHS ───────────────────────────────────────────────────────
const SURAHS = [
  { n:1,   name:"Al-Fatiha",  ar:"الفاتحة",  trans:"The Opening",    v:7,   type:"meccan" },
  { n:2,   name:"Al-Baqarah", ar:"البقرة",   trans:"The Cow",        v:286, type:"medinan" },
  { n:3,   name:"Al-Imran",   ar:"آل عمران", trans:"Family of Imran",v:200, type:"medinan" },
  { n:18,  name:"Al-Kahf",    ar:"الكهف",    trans:"The Cave",       v:110, type:"meccan" },
  { n:36,  name:"Ya-Sin",     ar:"يس",       trans:"Ya Sin",         v:83,  type:"meccan" },
  { n:55,  name:"Ar-Rahman",  ar:"الرحمن",   trans:"The Merciful",   v:78,  type:"medinan" },
  { n:56,  name:"Al-Waqiah",  ar:"الواقعة",  trans:"The Event",      v:96,  type:"meccan" },
  { n:67,  name:"Al-Mulk",    ar:"الملك",    trans:"The Kingdom",    v:30,  type:"meccan" },
  { n:112, name:"Al-Ikhlas",  ar:"الإخلاص",  trans:"The Sincerity",  v:4,   type:"meccan" },
  { n:113, name:"Al-Falaq",   ar:"الفلق",    trans:"The Daybreak",   v:5,   type:"meccan" },
  { n:114, name:"An-Nas",     ar:"الناس",    trans:"Mankind",        v:6,   type:"meccan" },
];

const PRAYERS = [
  { name:"Fajr",    time:"04:58", em:"🌙" },
  { name:"Dhuhr",   time:"12:27", em:"☀️" },
  { name:"Asr",     time:"15:42", em:"🌤️", next:true },
  { name:"Maghrib", time:"18:22", em:"🌅" },
  { name:"Isha",    time:"19:52", em:"🌙" },
];

const DUAS = [
  { title:"🌅 Morning Dua",     ar:"أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ",  en:"We have reached the morning and at this very time the whole sovereignty belongs to Allah." },
  { title:"🌙 Before Sleep",    ar:"بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",    en:"In Your name O Allah, I die and I live." },
  { title:"🍽️ Before Eating",   ar:"بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ",   en:"In the name of Allah and with the blessings of Allah." },
  { title:"🕌 Entering Masjid", ar:"اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ", en:"O Allah, open for me the gates of Your mercy." },
  { title:"🏠 Leaving Home",    ar:"بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ",  en:"In the name of Allah, I place my trust in Allah." },
  { title:"🙏 Istighfar",       ar:"أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ",           en:"I seek forgiveness from Allah, the Most Magnificent." },
  { title:"👪 For Parents",     ar:"رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا", en:"My Lord, have mercy upon them as they brought me up when I was small." },
];

// ─── WA BUTTON ────────────────────────────────────────────────────
function WABtn({ msg = "Hi! I found your website and want to know more." }) {
  return (
    <a href={`https://wa.me/971544735060?text=${encodeURIComponent(msg)}`}
      target="_blank" rel="noopener noreferrer"
      style={{ position:"fixed", bottom:22, right:16, zIndex:200, width:52, height:52, borderRadius:"50%", background:"#25D366", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, boxShadow:"0 4px 20px rgba(37,211,102,0.5)", textDecoration:"none" }}>
      💬
    </a>
  );
}

function SecHead({label, color="#c9a84c"}) {
  const rgb = color === "#c9a84c" ? "201,168,76" : color === "#ff6b35" ? "255,107,53" : "201,168,76";
  return (
    <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:18}}>
      <div style={{flex:1,height:1,background:`linear-gradient(90deg,rgba(${rgb},.3),transparent)`}}/>
      <div style={{fontSize:8,letterSpacing:3,fontWeight:700,color,whiteSpace:"nowrap"}}>{label}</div>
      <div style={{flex:1,height:1,background:`linear-gradient(90deg,transparent,rgba(${rgb},.3))`}}/>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// SITE 1: DUBAIROVERS
// ══════════════════════════════════════════════════════════════════
function SiteDubaiRovers({ onBack }) {
  const [tab, setTab] = useState("ALL TOURS");
  const [shown, setShown] = useState(6);
  const [openTour, setOpenTour] = useState(null);
  const [tourTab, setTourTab] = useState("OVERVIEW");
  const [menuOpen, setMenuOpen] = useState(false);
  const [guests, setGuests] = useState(2);
  const [selTour, setSelTour] = useState(TOURS[0]);
  const [occ, setOcc] = useState("NONE");
  const [showBook, setShowBook] = useState(false);
  const [booked, setBooked] = useState(false);
  const cats = ["ALL TOURS","DESERT","CRUISE","CITY","ADVENTURE","ABU DHABI","NIGHT","VIP"];
  const filtered = tab === "ALL TOURS" ? TOURS : TOURS.filter(t => t.cat === tab);
  const G = "#c9a84c";
  const BG = "#0d0804";
  const CARD = "#130e05";

  return (
    <div style={{ minHeight:"100vh", background:BG, color:"#fff", fontFamily:"'Inter',sans-serif", overflowX:"hidden", paddingBottom:80 }}>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,500;1,600&display=swap');
        .rv-serif { font-family:'Playfair Display',serif; }
        .rv-card:active { transform:scale(0.98); }
        .rv-tab.act { border-bottom:2px solid ${G}; color:${G}; }
      `}</style>

      {/* HAMBURGER MENU OVERLAY */}
      {menuOpen && (
        <div onClick={()=>setMenuOpen(false)} style={{position:"fixed",inset:0,zIndex:500,background:"rgba(13,8,4,.97)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4,animation:"fadeIn .3s ease"}}>
          <span onClick={e=>{e.stopPropagation();setMenuOpen(false);}} style={{position:"absolute",top:18,right:20,fontSize:22,color:"#8a7040",cursor:"pointer"}}>✕</span>
          {[["Tours","tours"],["Book Now","book"],["Blog","blog"],["Contact","contact"]].map(([l,h])=>(
            <a key={l} href={"#rv-"+h} onClick={()=>setMenuOpen(false)}
              style={{fontSize:20,fontWeight:700,textDecoration:"none",padding:"10px 26px",color:"#8a7040",fontFamily:"'Playfair Display',serif",fontStyle:"italic",letterSpacing:2,display:"block"}}>
              {l}
            </a>
          ))}
        </div>
      )}

      {/* NAV */}
      <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(13,8,4,0.97)", backdropFilter:"blur(20px)", borderBottom:`1px solid rgba(201,168,76,0.15)`, padding:"14px 18px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div>
          <div style={{ fontSize:9, color:"rgba(201,168,76,0.6)", letterSpacing:"3px", textTransform:"uppercase" }}>EST. 2024</div>
          <div className="rv-serif" style={{ fontSize:20, fontStyle:"italic", color:G, lineHeight:1 }}>DubaiRovers</div>
        </div>
        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
          <button onClick={onBack} style={{ padding:"6px 10px", background:"transparent", border:`1px solid rgba(201,168,76,0.2)`, borderRadius:4, color:"#8a7040", fontSize:9, cursor:"pointer", fontFamily:"inherit", fontWeight:700, letterSpacing:2 }}>← BACK</button>
          <div onClick={()=>setMenuOpen(true)} style={{width:34,height:34,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:5,cursor:"pointer"}}>
            <span style={{display:"block",width:20,height:1,background:"#c9a84c"}}/>
            <span style={{display:"block",width:20,height:1,background:"#c9a84c"}}/>
            <span style={{display:"block",width:20,height:1,background:"#c9a84c"}}/>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ background:"linear-gradient(180deg,#1a0e04 0%,#0d0804 100%)", padding:"36px 20px 28px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(201,168,76,0.06) 1px,transparent 1px)", backgroundSize:"24px 24px" }}/>
        <div style={{ position:"relative" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:12 }}>
            <div style={{ height:1, width:40, background:`linear-gradient(to right,transparent,${G})` }}/>
            <span style={{ fontSize:10, color:G, letterSpacing:"3px", textTransform:"uppercase" }}>DUBAI {"&"} THE UAE</span>
            <div style={{ height:1, width:40, background:`linear-gradient(to left,transparent,${G})` }}/>
          </div>
          <h1 className="rv-serif" style={{ fontSize:"clamp(28px,8vw,42px)", lineHeight:1.15, marginBottom:12 }}>
            Explore Dubai<br/><em style={{color:G}}>and The UAE</em>
          </h1>
          <p style={{ fontSize:13, color:"rgba(255,255,255,0.5)", marginBottom:20 }}>Luxury desert safaris, cruises and curated experiences</p>
          <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
            <a href="/tours" style={{ padding:"12px 24px", background:`linear-gradient(135deg,${G},#b8922a)`, borderRadius:6, color:"#000", fontWeight:700, fontSize:13, textDecoration:"none" }}>View All Tours</a>
            <button onClick={() => setShowBook(true)} style={{ padding:"12px 20px", background:"transparent", border:`1px solid ${G}`, borderRadius:6, color:G, fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>Book Now</button>
          </div>
        </div>
      </div>

      {/* CATEGORY STRIP */}
      <div style={{ overflowX:"auto", display:"flex", gap:0, padding:"0 16px", scrollbarWidth:"none", borderBottom:`1px solid rgba(201,168,76,0.1)`, background:BG }}>
        {cats.map(c => (
          <button key={c} onClick={() => setTab(c)}
            className={`rv-tab${tab===c?" act":""}`}
            style={{ padding:"12px 16px", background:"transparent", border:"none", borderBottom: tab===c?`2px solid ${G}`:"2px solid transparent", color:tab===c?G:"rgba(255,255,255,0.4)", fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap", letterSpacing:"0.5px" }}>
            {c}
          </button>
        ))}
      </div>

      {/* TOURS */}
      <div style={{ padding:"20px 16px", display:"flex", flexDirection:"column", gap:14 }} id="rv-tours">
        <SecHead label="THIS SEASONS TOURS" />
        {/* Featured first */}
        {filtered.slice(0,1).map(t => (
          <div key={t.id} className="rv-card" onClick={() => { setOpenTour(t); setTourTab("OVERVIEW"); }}
            style={{ background:CARD, border:`1px solid rgba(201,168,76,0.2)`, borderRadius:12, overflow:"hidden", cursor:"pointer" }}>
            <div style={{ height:180, background:t.bg, display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}>
              <span style={{ fontSize:72, opacity:0.7 }}>{t.emoji}</span>
              <div style={{ position:"absolute", top:12, left:12, background:G, color:"#000", fontSize:10, fontWeight:800, padding:"3px 10px", borderRadius:4 }}>{t.badge}</div>
              <div style={{ position:"absolute", bottom:0, left:0, right:0, background:"linear-gradient(to top,rgba(0,0,0,0.8),transparent)", padding:"20px 16px 14px" }}>
                <div className="rv-serif" style={{ fontSize:22, fontWeight:700 }}>{t.name}</div>
                <div style={{ fontSize:12, color:"rgba(255,255,255,0.6)", marginTop:2 }}>{t.sub}</div>
              </div>
            </div>
            <div style={{ padding:"14px 16px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ display:"flex", gap:4, alignItems:"center" }}>
                <span style={{ color:G, fontSize:12 }}>★</span>
                <span style={{ fontSize:12, fontWeight:700 }}>{t.rating}</span>
                <span style={{ fontSize:11, color:"rgba(255,255,255,0.4)" }}>({t.reviews.toLocaleString()})</span>
              </div>
              <div className="rv-serif" style={{ fontSize:22, color:G }}>AED {t.price}</div>
            </div>
          </div>
        ))}

        {/* Grid cards */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {filtered.slice(1).map(t => (
            <div key={t.id} className="rv-card" onClick={() => { setOpenTour(t); setTourTab("OVERVIEW"); }}
              style={{ background:CARD, border:`1px solid rgba(201,168,76,0.15)`, borderRadius:12, overflow:"hidden", cursor:"pointer" }}>
              <div style={{ height:90, background:t.bg, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <span style={{ fontSize:40, opacity:0.8 }}>{t.emoji}</span>
              </div>
              <div style={{ padding:"10px 10px 12px" }}>
                <div style={{ fontSize:9, color:G, fontWeight:700, letterSpacing:"1px", marginBottom:3 }}>{t.cat}</div>
                <div className="rv-serif" style={{ fontSize:13, fontWeight:600, marginBottom:6, lineHeight:1.3 }}>{t.name}</div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)" }}>★ {t.rating}</div>
                  <div className="rv-serif" style={{ fontSize:15, color:G, fontWeight:700 }}>AED {t.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {shown < TOURS.length && (
          <div style={{textAlign:"center",marginTop:16}}>
            <button onClick={()=>setShown(s=>s+6)}
              style={{background:"transparent",border:"1px solid rgba(201,168,76,.2)",color:"#c9a84c",padding:"12px 28px",fontSize:9,fontWeight:700,letterSpacing:3,cursor:"pointer",fontFamily:"'Playfair Display',serif",fontStyle:"italic"}}>
              Load More Tours
            </button>
          </div>
        )}
      </div>

      {/* WHY US */}
      <div style={{ padding:"20px 16px" }}>
        <SecHead label="WHY CHOOSE US" />
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          {[["🛡️","Licensed & Insured"],["💰","Best Price Match"],["🚗","Hotel Pickup"],["✅","Free Cancellation"],["💬","24/7 WhatsApp"],["🌍","10 Languages"]].map(([ic,txt]) => (
            <div key={txt} style={{ background:CARD, border:`1px solid rgba(201,168,76,0.12)`, borderRadius:10, padding:"14px 12px", textAlign:"center" }}>
              <div style={{ fontSize:24, marginBottom:6 }}>{ic}</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.7)", fontWeight:500 }}>{txt}</div>
            </div>
          ))}
        </div>
      </div>

      {/* BLOG */}
      <div style={{ padding:"20px 16px" }} id="rv-blog">
        <SecHead label="FROM THE BLOG" />
        {[
          {e:"🏜️",cat:"DESERT SAFARI",t:"Evening Desert Safari Dubai — The Complete Guide (2026)",d:"Mar 2026",m:9},
          {e:"🚁",cat:"HELICOPTER",t:"Helicopter Tour Dubai — Prices, Views & Best Time",d:"Mar 2026",m:7},
          {e:"⛵",cat:"DHOW CRUISE",t:"Dhow Cruise Dubai Marina vs Creek — Which Should You Choose?",d:"Mar 2026",m:6},
          {e:"🎟️",cat:"ATTRACTIONS",t:"Burj Khalifa At The Top — Ticket Prices & Insider Tips 2026",d:"Feb 2026",m:5},
        ].map((b,i)=>(
          <a key={i} href="/blog" style={{display:"flex",gap:12,alignItems:"flex-start",padding:"14px 0",borderBottom:"1px solid rgba(255,255,255,.05)",textDecoration:"none",color:"inherit"}}>
            <div style={{width:44,height:44,background:"rgba(201,168,76,.08)",border:"1px solid rgba(201,168,76,.12)",borderRadius:5,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,flexShrink:0}}>{b.e}</div>
            <div>
              <div style={{fontSize:7,letterSpacing:2,fontWeight:700,color:"#c9a84c",marginBottom:4}}>{b.cat}</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:13,fontWeight:700,color:"#f5edd8",lineHeight:1.3,marginBottom:4}}>{b.t}</div>
              <div style={{fontSize:10,color:"#8a7040"}}>{b.d} · ⏱ {b.m} min read</div>
            </div>
          </a>
        ))}
      </div>

      {/* REVIEWS */}
      <div style={{ padding:"20px 16px" }}>
        <SecHead label="GUEST STORIES" />
        {[
          { name:"Sarah J.", country:"🇬🇧", text:"Absolutely breathtaking! The desert safari was unlike anything I have ever experienced. Professional guides and magical evening.", stars:5 },
          { name:"Ahmed M.", country:"🇦🇪", text:"تجربة لا تُنسى! السفاري كانت رائعة والموظفون محترفون جداً. أنصح بها بشدة لكل زائر.", stars:5 },
          { name:"Elena K.", country:"🇷🇺", text:"Best experience in Dubai. The dhow cruise was romantic and the food was delicious. Will definitely book again!", stars:5 },
        ].map((r,i) => (
          <div key={i} style={{ background:CARD, border:`1px solid rgba(201,168,76,0.12)`, borderRadius:12, padding:"18px 16px", marginBottom:12, position:"relative" }}>
            <div style={{ position:"absolute", top:10, right:14, fontSize:48, color:`rgba(201,168,76,0.07)`, fontFamily:"serif", lineHeight:1 }}>"</div>
            <div style={{ color:G, fontSize:13, marginBottom:10 }}>{"★".repeat(r.stars)}</div>
            <p className="rv-serif" style={{ fontSize:14, fontStyle:"italic", lineHeight:1.6, color:"rgba(255,255,255,0.8)", marginBottom:12 }}>{r.text}</p>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontSize:22 }}>👤</span>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:G }}>{r.name}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)" }}>{r.country} Verified Guest</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CONTACT */}
      <div style={{ padding:"20px 16px" }}>
        <SecHead label="GET IN TOUCH" />
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
          {[["💬","WhatsApp","Chat instantly"],["📧","Email","info@dubairovers.com"],["📍","Location","Dubai, UAE 🇦🇪"],["⏰","Hours","Daily 8AM–10PM"]].map(([ic,title,sub]) => (
            <div key={title} style={{ background:CARD, border:`1px solid rgba(201,168,76,0.12)`, borderRadius:10, padding:"14px 12px", textAlign:"center" }}>
              <div style={{ fontSize:24, marginBottom:5 }}>{ic}</div>
              <div style={{ fontSize:12, fontWeight:700, color:G, marginBottom:2 }}>{title}</div>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.45)" }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ padding:"24px 16px", textAlign:"center", borderTop:`1px solid rgba(201,168,76,0.1)` }}>
        <div className="rv-serif" style={{ fontSize:22, fontStyle:"italic", color:G, marginBottom:8 }}>DubaiRovers</div>
        <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)" }}>© 2026 DubaiRovers.com · All Rights Reserved</div>
      </div>

      {/* TOUR OVERLAY */}
      {openTour && (
        <div style={{ position:"fixed", inset:0, zIndex:300, background:BG, overflowY:"auto", display:"flex", flexDirection:"column" }}>
          <div style={{ height:200, background:openTour.bg, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", flexShrink:0 }}>
            <span style={{ fontSize:80, opacity:0.7 }}>{openTour.emoji}</span>
            <button onClick={() => setOpenTour(null)}
              style={{ position:"absolute", top:16, left:16, width:36, height:36, borderRadius:"50%", background:"rgba(0,0,0,0.6)", border:"none", color:"#fff", fontSize:18, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>←</button>
          </div>
          <div style={{ padding:"20px 18px", flex:1 }}>
            <div style={{ fontSize:10, color:G, fontWeight:700, letterSpacing:"1px", marginBottom:6 }}>{openTour.cat} · {openTour.dur} · {openTour.group} guests</div>
            <h2 className="rv-serif" style={{ fontSize:24, marginBottom:8 }}>{openTour.name}</h2>
            <p style={{ fontSize:13, color:"rgba(255,255,255,0.5)", marginBottom:16 }}>{openTour.sub}</p>
            <div style={{ display:"flex", gap:0, marginBottom:20, borderBottom:`1px solid rgba(201,168,76,0.15)` }}>
              {["OVERVIEW","ITINERARY","INCLUDES","REVIEWS"].map(t => (
                <button key={t} onClick={() => setTourTab(t)}
                  style={{ padding:"10px 14px", background:"transparent", border:"none", borderBottom:tourTab===t?`2px solid ${G}`:"2px solid transparent", color:tourTab===t?G:"rgba(255,255,255,0.4)", fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap" }}>
                  {t}
                </button>
              ))}
            </div>
            {tourTab === "OVERVIEW" && (
              <div>
                <div style={{ display:"flex", gap:10, marginBottom:16 }}>
                  {[["⏱️",openTour.dur,"Duration"],["👥",openTour.group,"Group"],["⭐",openTour.rating,"Rating"]].map(([ic,v,l]) => (
                    <div key={l} style={{ flex:1, background:CARD, borderRadius:10, padding:"12px 8px", textAlign:"center", border:`1px solid rgba(201,168,76,0.12)` }}>
                      <div style={{ fontSize:18 }}>{ic}</div>
                      <div style={{ fontSize:14, fontWeight:800, color:G }}>{v}</div>
                      <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)" }}>{l}</div>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize:14, color:"rgba(255,255,255,0.65)", lineHeight:1.7 }}>
                  Experience the best of {openTour.name}. Our expert guides ensure an unforgettable journey through the heart of Dubai.
                </p>
              </div>
            )}
            {tourTab === "INCLUDES" && (
              <div>
                <div style={{ marginBottom:16 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:"#10B981", marginBottom:8 }}>✅ Included</div>
                  {openTour.inc.map(i => <div key={i} style={{ fontSize:13, color:"rgba(255,255,255,0.65)", padding:"6px 0", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>✓ {i}</div>)}
                </div>
                <div>
                  <div style={{ fontSize:13, fontWeight:700, color:"#EF4444", marginBottom:8 }}>❌ Not Included</div>
                  {openTour.exc.map(i => <div key={i} style={{ fontSize:13, color:"rgba(255,255,255,0.65)", padding:"6px 0", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>✗ {i}</div>)}
                </div>
              </div>
            )}
            {tourTab === "REVIEWS" && (
              <div style={{ fontSize:13, color:"rgba(255,255,255,0.6)", lineHeight:1.6 }}>
                <div style={{ display:"flex", gap:4, color:G, fontSize:16, marginBottom:8 }}>{"★".repeat(5)}</div>
                <div style={{ fontWeight:700, marginBottom:4 }}>{openTour.rating}/5 · {openTour.reviews.toLocaleString()} reviews</div>
                <p>Guests consistently rate this tour as one of the best in Dubai.</p>
              </div>
            )}
          </div>
          <div style={{ position:"sticky", bottom:0, background:"rgba(13,8,4,0.97)", borderTop:`1px solid rgba(201,168,76,0.15)`, padding:"14px 18px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)" }}>from</div>
              <div className="rv-serif" style={{ fontSize:26, color:G }}>AED {openTour.price}</div>
            </div>
            <a href={`https://wa.me/971544735060?text=Hi! I want to book ${openTour.name} for AED ${openTour.price}`}
              target="_blank" rel="noopener noreferrer"
              style={{ padding:"14px 28px", background:`linear-gradient(135deg,${G},#b8922a)`, borderRadius:8, color:"#000", fontWeight:800, fontSize:14, textDecoration:"none" }}>
              Reserve Now →
            </a>
          </div>
        </div>
      )}

      {/* BOOKING FORM */}
      {showBook && !booked && (
        <div style={{ position:"fixed", inset:0, zIndex:300, background:BG, overflowY:"auto" }}>
          <div style={{ padding:"20px 18px" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
              <h2 className="rv-serif" style={{ fontSize:22 }}>Book Your <em style={{ color:G }}>Tour</em></h2>
              <button onClick={() => setShowBook(false)} style={{ background:"transparent", border:"none", color:"rgba(255,255,255,0.5)", fontSize:24, cursor:"pointer" }}>×</button>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <select value={selTour.id} onChange={e => setSelTour(TOURS.find(t=>t.id===e.target.value))}
                style={{ width:"100%", padding:"12px", background:CARD, border:`1px solid rgba(201,168,76,0.3)`, borderRadius:8, color:"#fff", fontSize:13, fontFamily:"inherit" }}>
                {TOURS.map(t => <option key={t.id} value={t.id} style={{ background:"#0d0804" }}>{t.emoji} {t.name} — AED {t.price}</option>)}
              </select>
              <input type="date" style={{ width:"100%", padding:"12px", background:CARD, border:`1px solid rgba(201,168,76,0.2)`, borderRadius:8, color:"#fff", fontSize:13 }}/>
              <div style={{ background:CARD, border:`1px solid rgba(201,168,76,0.2)`, borderRadius:8, padding:"14px 16px" }}>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", marginBottom:8 }}>GUESTS</div>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <button onClick={() => setGuests(g=>Math.max(1,g-1))} style={{ width:36, height:36, borderRadius:"50%", background:"rgba(201,168,76,0.1)", border:`1px solid rgba(201,168,76,0.3)`, color:G, fontSize:20, cursor:"pointer" }}>−</button>
                  <span className="rv-serif" style={{ fontSize:32, color:G }}>{guests}</span>
                  <button onClick={() => setGuests(g=>g+1)} style={{ width:36, height:36, borderRadius:"50%", background:"rgba(201,168,76,0.1)", border:`1px solid rgba(201,168,76,0.3)`, color:G, fontSize:20, cursor:"pointer" }}>+</button>
                </div>
              </div>
              <input placeholder="Your Full Name" style={{ width:"100%", padding:"12px", background:CARD, border:`1px solid rgba(201,168,76,0.2)`, borderRadius:8, color:"#fff", fontSize:13 }}/>
              <input placeholder="WhatsApp Number" style={{ width:"100%", padding:"12px", background:CARD, border:`1px solid rgba(201,168,76,0.2)`, borderRadius:8, color:"#fff", fontSize:13 }}/>
              <input placeholder="Hotel / Pickup Location" style={{ width:"100%", padding:"12px", background:CARD, border:`1px solid rgba(201,168,76,0.2)`, borderRadius:8, color:"#fff", fontSize:13 }}/>
              <div>
                <div style={{fontSize:8,fontWeight:700,letterSpacing:2,color:"#8a7040",marginBottom:8}}>OCCASION</div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {["NONE","🎂 BIRTHDAY","💍 ANNIVERSARY","🍯 HONEYMOON"].map(o=>(
                    <div key={o} onClick={()=>setOcc(o)}
                      style={{padding:"6px 12px",border:`1px solid ${occ===o?"rgba(201,168,76,.4)":"rgba(201,168,76,.15)"}`,fontSize:9,fontWeight:700,color:occ===o?"#c9a84c":"#8a7040",cursor:"pointer",letterSpacing:1,background:occ===o?"rgba(201,168,76,.1)":"transparent",fontStyle:"italic"}}>
                      {o}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ background:`rgba(201,168,76,0.08)`, border:`1px solid rgba(201,168,76,0.25)`, borderRadius:8, padding:"14px 16px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span style={{ fontSize:13, color:"rgba(255,255,255,0.6)" }}>Total ({guests} guests)</span>
                <span className="rv-serif" style={{ fontSize:24, color:G }}>AED {selTour.price * guests}</span>
              </div>
              <a href={`https://wa.me/971544735060?text=Hi! I want to book ${selTour.name} for ${guests} guest(s). Total: AED ${selTour.price*guests}`}
                target="_blank" rel="noopener noreferrer"
                onClick={() => setBooked(true)}
                style={{ display:"block", padding:"16px", background:`linear-gradient(135deg,${G},#b8922a)`, borderRadius:10, color:"#000", fontWeight:800, fontSize:15, textDecoration:"none", textAlign:"center" }}>
                💬 Confirm via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      <WABtn msg="Hi Dubai Rovers! I want to book a tour." />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// SITE 2: PROPCOMPARE
// ══════════════════════════════════════════════════════════════════
function SitePropCompare({ onBack }) {
  const [em, setEm] = useState("All UAE");
  const [tool, setTool] = useState(null);
  const [mort, setMort] = useState({ price:1000000, down:20, rate:4.5, term:25 });
  const [roi, setRoi] = useState({ price:1000000, rent:5000, charge:15000 });
  const [aiMsg, setAiMsg] = useState("Hi! I can help you find the perfect UAE property. What is your budget and preferred emirate?");
  const [aiInput, setAiInput] = useState("");
  const G = "#d4a843"; BG = "#0b1628"; CARD = "rgba(255,255,255,0.04)";
  const filteredProps = em === "All UAE" ? PROPS : PROPS.filter(p => p.emirate === em);
  const loanAmt = mort.price * (1 - mort.down/100);
  const monthly = (loanAmt * (mort.rate/1200) * Math.pow(1+mort.rate/1200, mort.term*12)) / (Math.pow(1+mort.rate/1200, mort.term*12)-1);
  const grossYield = (roi.rent*12/roi.price*100).toFixed(1);
  const netYield = ((roi.rent*12 - roi.charge)/roi.price*100).toFixed(1);

  return (
    <div style={{ minHeight:"100vh", background:BG, color:"#fff", fontFamily:"'Inter',sans-serif", overflowX:"hidden", paddingBottom:80 }}>
      {/* NAV */}
      <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(11,22,40,0.97)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(212,168,67,0.15)", padding:"14px 18px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div>
          <div style={{ fontSize:18, fontWeight:800 }}><span>Prop</span><span style={{ color:G }}>Compare</span></div>
          <div style={{ fontSize:9, color:"rgba(255,255,255,0.35)", letterSpacing:"2px" }}>UAE PROPERTY PORTAL</div>
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:4, background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.25)", borderRadius:20, padding:"3px 10px" }}>
            <span style={{ width:5, height:5, borderRadius:"50%", background:"#10B981", display:"inline-block" }}/>
            <span style={{ fontSize:10, color:"#10B981", fontWeight:700 }}>Live</span>
          </div>
          <button onClick={onBack} style={{ padding:"6px 14px", background:"transparent", border:`1px solid rgba(212,168,67,0.3)`, borderRadius:20, color:"rgba(212,168,67,0.7)", fontSize:11, cursor:"pointer", fontFamily:"inherit" }}>← Back</button>
        </div>
      </nav>

      {/* TICKER */}
      <div style={{ background:"rgba(212,168,67,0.05)", borderBottom:"1px solid rgba(212,168,67,0.1)", padding:"8px 0", overflow:"hidden" }}>
        <div style={{ display:"flex", gap:24, animation:"scroll 20s linear infinite", whiteSpace:"nowrap", paddingLeft:"100%" }}>
          {["🏙️ Dubai +2.3%","🏛️ Abu Dhabi +1.8%","🌊 Sharjah +3.1%","⛵ RAK +4.2%","🏠 Off-Plan +5.5%","💎 Luxury +1.2%"].map(t => (
            <span key={t} style={{ fontSize:11, color:"rgba(212,168,67,0.7)", marginRight:32 }}>{t}</span>
          ))}
        </div>
      </div>
      <style suppressHydrationWarning>{`@keyframes scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>

      {/* HERO */}
      <div style={{ padding:"32px 18px 24px", background:"linear-gradient(135deg,rgba(212,168,67,0.05) 0%,transparent 60%)", position:"relative" }}>
        <div style={{ position:"absolute", top:0, right:0, width:200, height:200, background:"radial-gradient(circle,rgba(212,168,67,0.08),transparent 70%)", borderRadius:"50%" }}/>
        <div style={{ fontSize:10, color:G, fontWeight:700, letterSpacing:"2px", marginBottom:10 }}>UAE PROPERTY INTELLIGENCE</div>
        <h1 style={{ fontSize:"clamp(24px,7vw,36px)", fontWeight:900, lineHeight:1.15, marginBottom:10 }}>
          Find Your Perfect<br/><span style={{ color:G }}>Property in UAE</span>
        </h1>
        <p style={{ fontSize:13, color:"rgba(255,255,255,0.5)", marginBottom:20 }}>30+ curated properties with AI scoring, mortgage tools and ROI analysis</p>
        <a href="/properties" style={{ padding:"12px 24px", background:`linear-gradient(135deg,${G},#b8922a)`, borderRadius:8, color:"#000", fontWeight:700, fontSize:13, textDecoration:"none", display:"inline-block" }}>Explore Properties →</a>
      </div>

      {/* MARKET STATS */}
      <div style={{ padding:"0 16px 20px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
          {[["🏙️","AED 1.4M","Avg Price"],["📈","5.2%","Avg ROI"],["🏗️","2,400","New Units"],["💰","AED 7.2B","Q1 Volume"],["🌍","65%","Foreign Buy"],["✅","85%","Ready Stock"]].map(([ic,v,l]) => (
            <div key={l} style={{ background:CARD, border:"1px solid rgba(255,255,255,0.06)", borderRadius:14, padding:"14px 10px", textAlign:"center" }}>
              <div style={{ fontSize:18, marginBottom:4 }}>{ic}</div>
              <div style={{ fontSize:15, fontWeight:800, color:G }}>{v}</div>
              <div style={{ fontSize:9, color:"rgba(255,255,255,0.35)", textTransform:"uppercase", letterSpacing:"0.5px" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* EMIRATE FILTER */}
      <div style={{ overflowX:"auto", display:"flex", gap:8, padding:"0 16px 16px", scrollbarWidth:"none" }}>
        {[["🇦🇪","All UAE"],["🏙️","Dubai"],["🏛️","Abu Dhabi"],["🌊","Sharjah"],["⛵","RAK"]].map(([ic,e]) => (
          <button key={e} onClick={() => setEm(e)}
            style={{ flexShrink:0, padding:"8px 16px", borderRadius:20, border:"none", background:em===e?G:"rgba(255,255,255,0.06)", color:em===e?"#000":"rgba(255,255,255,0.6)", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap" }}>
            {ic} {e}
          </button>
        ))}
      </div>

      {/* PROPERTIES */}
      <div style={{ padding:"0 16px", display:"flex", flexDirection:"column", gap:12 }}>
        {filteredProps.map(p => (
          <div key={p.name} style={{ background:CARD, border:`1px solid rgba(212,168,67,0.12)`, borderRadius:16, padding:"16px", display:"flex", gap:14, alignItems:"center" }}>
            <div style={{ width:52, height:52, borderRadius:12, background:"rgba(212,168,67,0.1)", border:`1px solid rgba(212,168,67,0.25)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>{p.em}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontWeight:800, fontSize:14 }}>{p.name}</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.45)", marginBottom:6 }}>📍 {p.loc}</div>
              <div style={{ display:"flex", gap:12 }}>
                <span style={{ fontSize:10, color:"rgba(255,255,255,0.4)" }}>🛏️ {p.beds}</span>
                <span style={{ fontSize:10, color:"rgba(255,255,255,0.4)" }}>📐 {p.sqft} ft²</span>
                <span style={{ fontSize:10, color:"#10B981", fontWeight:700 }}>ROI {p.roi}%</span>
              </div>
            </div>
            <div style={{ textAlign:"right", flexShrink:0 }}>
              <div style={{ fontSize:15, fontWeight:900, color:G }}>AED {p.price}M</div>
              <div style={{ fontSize:9, color:"rgba(255,255,255,0.35)", marginBottom:4 }}>{p.badge}</div>
              <div style={{ width:6, height:6, borderRadius:"50%", background:"#10B981", marginLeft:"auto" }} title="Ready"/>
            </div>
          </div>
        ))}
      </div>

      {/* TOOLS */}
      <div style={{ padding:"24px 16px" }}>
        <div style={{ fontSize:16, fontWeight:800, marginBottom:14 }}>🛠️ Property Tools</div>
        {[["🏦","Mortgage Calculator","mort"],["📈","ROI Calculator","roi"],["🤖","AI Advisor","ai"]].map(([ic,name,id]) => (
          <div key={id} style={{ marginBottom:10 }}>
            <button onClick={() => setTool(tool===id?null:id)}
              style={{ width:"100%", padding:"14px 16px", background:CARD, border:`1px solid rgba(212,168,67,${tool===id?0.4:0.12})`, borderRadius:12, color:"#fff", fontSize:13, fontWeight:700, cursor:"pointer", fontFamily:"inherit", textAlign:"left", display:"flex", justifyContent:"space-between" }}>
              <span>{ic} {name}</span>
              <span style={{ color:G }}>{tool===id?"▲":"▼"}</span>
            </button>
            {tool === "mort" && id === "mort" && (
              <div style={{ background:CARD, border:`1px solid rgba(212,168,67,0.1)`, borderRadius:12, padding:"16px", marginTop:4 }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
                  {[["Property Price (AED)","price",1000000],["Down Payment (%)","down",20],["Interest Rate (%)","rate",4.5],["Term (Years)","term",25]].map(([l,k,def]) => (
                    <div key={k}>
                      <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)", marginBottom:4 }}>{l}</div>
                      <input type="number" defaultValue={def} onChange={e => setMort(m=>({...m,[k]:parseFloat(e.target.value)||def}))}
                        style={{ width:"100%", padding:"8px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:6, color:"#fff", fontSize:12 }}/>
                    </div>
                  ))}
                </div>
                <div style={{ background:"rgba(212,168,67,0.08)", border:`1px solid rgba(212,168,67,0.2)`, borderRadius:8, padding:"12px 14px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}><span style={{ fontSize:12, color:"rgba(255,255,255,0.5)" }}>Loan Amount</span><span style={{ fontSize:13, fontWeight:700, color:G }}>AED {(loanAmt/1000000).toFixed(2)}M</span></div>
                  <div style={{ display:"flex", justifyContent:"space-between" }}><span style={{ fontSize:12, color:"rgba(255,255,255,0.5)" }}>Monthly Payment</span><span style={{ fontSize:16, fontWeight:900, color:G }}>AED {isNaN(monthly)?0:Math.round(monthly).toLocaleString()}</span></div>
                </div>
              </div>
            )}
            {tool === "roi" && id === "roi" && (
              <div style={{ background:CARD, border:`1px solid rgba(212,168,67,0.1)`, borderRadius:12, padding:"16px", marginTop:4 }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
                  {[["Property Price","price",1000000],["Monthly Rent","rent",5000],["Service Charge","charge",15000]].slice(0,2).map(([l,k,def]) => (
                    <div key={k}>
                      <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)", marginBottom:4 }}>{l} (AED)</div>
                      <input type="number" defaultValue={def} onChange={e => setRoi(r=>({...r,[k]:parseFloat(e.target.value)||def}))}
                        style={{ width:"100%", padding:"8px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:6, color:"#fff", fontSize:12 }}/>
                    </div>
                  ))}
                </div>
                <div style={{ background:"rgba(212,168,67,0.08)", border:`1px solid rgba(212,168,67,0.2)`, borderRadius:8, padding:"12px 14px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}><span style={{ fontSize:12, color:"rgba(255,255,255,0.5)" }}>Gross Yield</span><span style={{ fontSize:13, fontWeight:700, color:"#10B981" }}>{grossYield}%</span></div>
                  <div style={{ display:"flex", justifyContent:"space-between" }}><span style={{ fontSize:12, color:"rgba(255,255,255,0.5)" }}>Net Yield</span><span style={{ fontSize:16, fontWeight:900, color:"#10B981" }}>{netYield}%</span></div>
                </div>
              </div>
            )}
            {tool === "ai" && id === "ai" && (
              <div style={{ background:CARD, border:`1px solid rgba(212,168,67,0.1)`, borderRadius:12, padding:"16px", marginTop:4 }}>
                <div style={{ background:"rgba(212,168,67,0.06)", borderRadius:8, padding:"12px", marginBottom:12, fontSize:13, color:"rgba(255,255,255,0.7)", lineHeight:1.6 }}>🤖 {aiMsg}</div>
                <div style={{ display:"flex", gap:8 }}>
                  <input value={aiInput} onChange={e=>setAiInput(e.target.value)} placeholder="Ask about properties..."
                    style={{ flex:1, padding:"10px 12px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"#fff", fontSize:12, fontFamily:"inherit" }}/>
                  <button onClick={() => { setAiMsg("Based on your query, I recommend checking our Dubai Marina and Downtown properties with strong ROI. WhatsApp us for personalized advice!"); setAiInput(""); }}
                    style={{ padding:"10px 16px", background:G, border:"none", borderRadius:8, color:"#000", fontWeight:700, fontSize:12, cursor:"pointer" }}>Ask →</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div style={{ padding:"20px 16px", textAlign:"center", borderTop:"1px solid rgba(212,168,67,0.1)" }}>
        <div style={{ fontSize:18, fontWeight:800, marginBottom:8 }}><span>Prop</span><span style={{ color:G }}>Compare</span></div>
        <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
          style={{ display:"block", padding:"13px", background:`linear-gradient(135deg,${G},#b8922a)`, borderRadius:10, color:"#000", fontWeight:700, fontSize:14, textDecoration:"none", marginBottom:10 }}>
          💬 WhatsApp for Property Advice
        </a>
        <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)" }}>© 2026 PropCompare UAE</div>
      </div>
      <WABtn msg="Hi! I found your property portal and want advice on UAE properties."/>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// SITE 3: ARCHAI
// ══════════════════════════════════════════════════════════════════
function SiteARCHAI({ onBack }) {
  const [step, setStep] = useState(0);
  const [selStyle, setSelStyle] = useState(null);
  const [beds, setBeds] = useState(4);
  const [floors, setFloors] = useState("G+1");
  const [plotSize, setPlotSize] = useState(10);
  const [copied, setCopied] = useState(false);
  const G = "#c8a96e"; BG = "#f5f2ee"; TEXT = "#1a1510";
  const steps = ["Style","Size & Rooms","Floor Plan","AI Prompt","Summary"];
  const cost = selStyle ? selStyle.cost : "PKR 1.2–2.5 Cr";

  const prompt = selStyle ? `Photorealistic exterior render of a ${selStyle.name} style villa, ${plotSize} marla plot, ${beds} bedrooms, ${floors} floors, Dubai/Pakistan architecture, golden hour lighting, lush landscaping, 8K quality, Midjourney style` : "";

  return (
    <div style={{ minHeight:"100vh", background:BG, color:TEXT, fontFamily:"'Inter',sans-serif", overflowX:"hidden", paddingBottom:80 }}>
      {/* NAV */}
      <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(245,242,238,0.97)", backdropFilter:"blur(20px)", borderBottom:`1px solid #e8e0d4`, padding:"14px 18px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ fontSize:20, fontWeight:900, letterSpacing:"-0.5px" }}>ARCHAI<span style={{ color:G }}>.</span></div>
        <button onClick={onBack} style={{ padding:"6px 14px", background:"transparent", border:`1px solid #d4c8b8`, borderRadius:3, color:TEXT, fontSize:11, cursor:"pointer", fontFamily:"inherit", fontWeight:700 }}>← Back</button>
      </nav>

      {/* HERO */}
      <div style={{ background:TEXT, padding:"40px 20px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(rgba(200,169,110,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(200,169,110,0.04) 1px,transparent 1px)`, backgroundSize:"32px 32px" }}/>
        <div style={{ position:"absolute", top:20, right:20, fontSize:120, color:`rgba(200,169,110,0.08)`, fontWeight:900, lineHeight:1, userSelect:"none" }}>09</div>
        <div style={{ position:"relative" }}>
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
            <div style={{ height:1, width:30, background:`linear-gradient(to right,transparent,${G})` }}/>
            <span style={{ fontSize:10, color:G, fontWeight:700, letterSpacing:"2px" }}>VILLA DESIGN PLATFORM</span>
          </div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(28px,8vw,40px)", fontStyle:"italic", color:"#fff", lineHeight:1.2, marginBottom:16 }}>
            Design Your Dream Villa
          </h1>
          <p style={{ fontSize:13, color:"rgba(255,255,255,0.5)", marginBottom:20, lineHeight:1.6 }}>Generate AI architectural prompts, floor plans and cost estimates in minutes</p>
          <div style={{ display:"flex", gap:10 }}>
            <button onClick={() => setStep(1)} style={{ padding:"12px 24px", background:G, border:"none", borderRadius:3, color:"#000", fontWeight:800, fontSize:13, cursor:"pointer", fontFamily:"inherit" }}>Start Design →</button>
            <a href="/archai" style={{ padding:"12px 20px", background:"transparent", border:"1px solid rgba(255,255,255,0.3)", borderRadius:3, color:"rgba(255,255,255,0.8)", fontSize:13, textDecoration:"none" }}>Full App</a>
          </div>
        </div>
      </div>

      {/* STYLES GRID */}
      {step === 0 && (
        <div style={{ padding:"24px 16px" }}>
          <div style={{ fontSize:16, fontWeight:900, marginBottom:4 }}>Architectural Styles</div>
          <p style={{ fontSize:12, color:"rgba(26,21,16,0.5)", marginBottom:16 }}>Choose your preferred design style to get started</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {ARCH_STYLES.map(s => (
              <div key={s.name} onClick={() => { setSelStyle(s); setStep(1); }}
                style={{ background:"#fff", border:`1px solid ${selStyle?.name===s.name?G:"#e8e0d4"}`, borderRadius:4, padding:"16px 14px", cursor:"pointer", textAlign:"center" }}>
                <div style={{ fontSize:32, marginBottom:8 }}>{s.em}</div>
                <div style={{ fontSize:13, fontWeight:800, marginBottom:4 }}>{s.name}</div>
                <div style={{ fontSize:10, color:"rgba(26,21,16,0.45)" }}>{s.cost}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WIZARD STEPS */}
      {step > 0 && (
        <div style={{ padding:"20px 16px" }}>
          {/* Progress */}
          <div style={{ display:"flex", gap:4, marginBottom:20 }}>
            {steps.map((s,i) => (
              <div key={s} style={{ flex:1, height:4, borderRadius:2, background:i<step?G:"#e8e0d4", transition:"background 0.3s" }}/>
            ))}
          </div>
          <div style={{ fontSize:11, color:"rgba(26,21,16,0.4)", fontWeight:700, letterSpacing:"1px", marginBottom:6 }}>STEP {step} OF {steps.length}</div>
          <div style={{ fontSize:20, fontWeight:900, marginBottom:20 }}>{steps[step-1]}</div>

          {step === 1 && (
            <div>
              {ARCH_STYLES.map(s => (
                <div key={s.name} onClick={() => setSelStyle(s)}
                  style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px", background:"#fff", border:`1px solid ${selStyle?.name===s.name?G:"#e8e0d4"}`, borderRadius:4, marginBottom:8, cursor:"pointer" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <span style={{ fontSize:24 }}>{s.em}</span>
                    <div>
                      <div style={{ fontWeight:700, fontSize:14 }}>{s.name}</div>
                      <div style={{ fontSize:11, color:"rgba(26,21,16,0.45)" }}>{s.cost}</div>
                    </div>
                  </div>
                  <div style={{ width:20, height:20, borderRadius:"50%", border:`2px solid ${selStyle?.name===s.name?G:"#d4c8b8"}`, background:selStyle?.name===s.name?G:"transparent", display:"flex", alignItems:"center", justifyContent:"center", fontSize:10 }}>
                    {selStyle?.name===s.name && "✓"}
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 2 && (
            <div>
              <div style={{ marginBottom:16 }}>
                <div style={{ fontSize:12, fontWeight:700, marginBottom:8 }}>Plot Size (Marla)</div>
                <input type="number" value={plotSize} onChange={e=>setPlotSize(parseInt(e.target.value)||10)}
                  style={{ width:"100%", padding:"12px", background:"#fff", border:"1px solid #e8e0d4", borderRadius:4, fontSize:14, color:TEXT }}/>
              </div>
              <div style={{ marginBottom:16 }}>
                <div style={{ fontSize:12, fontWeight:700, marginBottom:8 }}>Bedrooms</div>
                <div style={{ display:"flex", gap:8 }}>
                  {[3,4,5,"6+"].map(b => (
                    <button key={b} onClick={() => setBeds(b)}
                      style={{ flex:1, padding:"10px", background:beds===b?G:"#fff", border:`1px solid ${beds===b?G:"#e8e0d4"}`, borderRadius:4, fontSize:13, fontWeight:700, cursor:"pointer", color:beds===b?"#000":TEXT }}>
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom:20 }}>
                <div style={{ fontSize:12, fontWeight:700, marginBottom:8 }}>Floors</div>
                <div style={{ display:"flex", gap:8 }}>
                  {["G+0","G+1","G+2"].map(f => (
                    <button key={f} onClick={() => setFloors(f)}
                      style={{ flex:1, padding:"10px", background:floors===f?G:"#fff", border:`1px solid ${floors===f?G:"#e8e0d4"}`, borderRadius:4, fontSize:12, fontWeight:700, cursor:"pointer", color:floors===f?"#000":TEXT }}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ background:`rgba(200,169,110,0.08)`, border:`1px solid ${G}`, borderRadius:4, padding:"14px 16px" }}>
                <div style={{ fontSize:11, fontWeight:700, letterSpacing:"1px", marginBottom:4, color:G }}>ESTIMATED COST</div>
                <div style={{ fontSize:20, fontWeight:900 }}>{cost}</div>
                <div style={{ fontSize:11, color:"rgba(26,21,16,0.5)" }}>Based on {selStyle?.name || "selected"} style</div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div style={{ background:"#fff", border:"1px solid #e8e0d4", borderRadius:4, padding:"16px", marginBottom:16 }}>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
                  {[["Living Room","#e8f4e8"],["Master Bed","#e8e8f4"],["Kitchen","#f4ede8"],["Dining","#f4f4e8"],["Bathroom","#e8f4f4"],["Study","#f4e8f4"]].map(([room,color]) => (
                    <div key={room} style={{ background:color, borderRadius:4, padding:"12px 8px", textAlign:"center", border:"1px solid rgba(0,0,0,0.08)" }}>
                      <div style={{ fontSize:10, fontWeight:700, color:TEXT }}>{room}</div>
                    </div>
                  ))}
                </div>
                <div style={{ textAlign:"center", marginTop:10, fontSize:11, color:"rgba(26,21,16,0.4)", fontWeight:700, letterSpacing:"1px" }}>
                  {selStyle?.name?.toUpperCase() || "SELECTED"} STYLE · {plotSize} MARLA · {floors}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div style={{ fontSize:12, color:"rgba(26,21,16,0.5)", marginBottom:10 }}>Generated AI Prompt for Midjourney / DALL-E / Bing</div>
              <div style={{ background:"#fff", border:"1px solid #e8e0d4", borderRadius:4, padding:"14px", fontSize:12, color:TEXT, lineHeight:1.7, marginBottom:14, fontFamily:"monospace" }}>{prompt}</div>
              <button onClick={() => { navigator.clipboard.writeText(prompt).catch(()=>{}); setCopied(true); setTimeout(()=>setCopied(false),2000); }}
                style={{ width:"100%", padding:"13px", background:copied?G:"#fff", border:`2px solid ${G}`, borderRadius:4, fontSize:13, fontWeight:800, cursor:"pointer", color:copied?"#000":G, fontFamily:"inherit" }}>
                {copied ? "✓ COPIED!" : "COPY PROMPT"}
              </button>
            </div>
          )}

          {step === 5 && (
            <div>
              <div style={{ background:"#fff", border:"1px solid #e8e0d4", borderRadius:4, overflow:"hidden", marginBottom:16 }}>
                {[["Style",selStyle?.name||"—"],["Plot",`${plotSize} Marla`],["Bedrooms",beds],["Floors",floors],["Cost Estimate",cost]].map(([k,v],i) => (
                  <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"12px 16px", borderBottom:i<4?"1px solid #e8e0d4":"none" }}>
                    <span style={{ fontSize:12, color:"rgba(26,21,16,0.5)", fontWeight:700 }}>{k}</span>
                    <span style={{ fontSize:13, fontWeight:800, color:k==="Cost Estimate"?G:TEXT }}>{v}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => { setStep(0); setSelStyle(null); }}
                style={{ width:"100%", padding:"13px", background:TEXT, border:"none", borderRadius:4, fontSize:13, fontWeight:800, cursor:"pointer", color:"#fff", fontFamily:"inherit" }}>
                ← New Design
              </button>
            </div>
          )}

          {/* NAV BUTTONS */}
          <div style={{ display:"flex", gap:10, marginTop:24 }}>
            {step > 1 && <button onClick={() => setStep(s=>s-1)} style={{ flex:1, padding:"13px", background:"transparent", border:`1px solid #d4c8b8`, borderRadius:3, fontSize:13, fontWeight:700, cursor:"pointer", color:TEXT, fontFamily:"inherit" }}>← BACK</button>}
            {step < 5 && <button onClick={() => { if(step===1&&!selStyle){alert("Please select a style first");return;} setStep(s=>s+1); }} style={{ flex:2, padding:"13px", background:G, border:"none", borderRadius:3, fontSize:13, fontWeight:800, cursor:"pointer", color:"#000", fontFamily:"inherit" }}>CONTINUE →</button>}
          </div>
        </div>
      )}

      <WABtn msg="Hi! I want to design a villa using ARCHAI."/>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// SITE 4: SALMANFX
// ══════════════════════════════════════════════════════════════════
function SiteSalmanFX({ onBack }) {
  const chartRef = useRef(null);
  const matrixRef = useRef(null);
  const [pair, setPair] = useState("EUR/USD");
  const [price, setPrice] = useState(1.0852);
  const [logs, setLogs] = useState(["[SYSTEM] MM FLIP CODEPRO v2.4 — Running","[INFO] Monitoring 4 pairs","[EA] Waiting for SAR signal..."]);
  const G = "#00ff41"; BG = "#000";

  useEffect(() => {
    // Matrix rain
    const cv = matrixRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    cv.width = window.innerWidth;
    cv.height = window.innerHeight;
    const cols = Math.floor(cv.width / 14);
    const drops = Array(cols).fill(1);
    const chars = "アイウエオカキクケコABCDEF0123456789";
    const interval = setInterval(() => {
      ctx.fillStyle = "rgba(0,0,0,0.05)";
      ctx.fillRect(0, 0, cv.width, cv.height);
      ctx.fillStyle = "#00ff41";
      ctx.font = "12px monospace";
      drops.forEach((y, i) => {
        ctx.fillText(chars[Math.floor(Math.random()*chars.length)], i*14, y*14);
        if (y*14 > cv.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Chart
    const cv = chartRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    cv.width = cv.offsetWidth * 2;
    cv.height = 120;
    const points = Array.from({length:40}, (_,i) => ({ x:i, y:1.0852 + (Math.random()-0.5)*0.002 }));
    let idx = 0;
    const interval = setInterval(() => {
      points.shift();
      const last = points[points.length-1].y;
      points.push({ x:idx++, y: last + (Math.random()-0.5)*0.0015 });
      setPrice(points[points.length-1].y);
      ctx.clearRect(0,0,cv.width,cv.height);
      ctx.fillStyle = "#000";
      ctx.fillRect(0,0,cv.width,cv.height);
      const minY = Math.min(...points.map(p=>p.y));
      const maxY = Math.max(...points.map(p=>p.y));
      const range = maxY - minY || 0.001;
      const toX = (i) => (i/39)*cv.width;
      const toY = (v) => cv.height - ((v-minY)/range)*cv.height*0.8 - cv.height*0.1;
      // Fill
      const grad = ctx.createLinearGradient(0,0,0,cv.height);
      grad.addColorStop(0,"rgba(0,255,65,0.3)");
      grad.addColorStop(1,"rgba(0,255,65,0)");
      ctx.beginPath();
      ctx.moveTo(toX(0),cv.height);
      points.forEach((p,i) => ctx.lineTo(toX(i),toY(p.y)));
      ctx.lineTo(toX(39),cv.height);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
      // Line
      ctx.beginPath();
      ctx.strokeStyle = G;
      ctx.lineWidth = 2;
      points.forEach((p,i) => i===0 ? ctx.moveTo(toX(i),toY(p.y)) : ctx.lineTo(toX(i),toY(p.y)));
      ctx.stroke();
      // Dot
      const lp = points[points.length-1];
      ctx.beginPath();
      ctx.arc(toX(39),toY(lp.y),4,0,Math.PI*2);
      ctx.fillStyle = G;
      ctx.shadowColor = G;
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  const addLog = (action, color) => {
    const time = new Date().toLocaleTimeString();
    setLogs(l => [...l.slice(-8), `[${time}] [${action}] ${pair} @ ${price.toFixed(4)} — ${color}`]);
  };

  const EAs = [
    { em:"🤖", name:"STARTER_EA.EX4",  price:299,  desc:"Parabolic SAR entry/exit · Basic MM · MT4 & MT5",   chips:["SAR","MT4","MT5","LICENSE"] },
    { em:"⚡", name:"PRO_BUNDLE.EX4",   price:699,  desc:"Advanced MM · 10-lot progression · Full dashboard", chips:["SAR","MT4","MT5","ADVANCED"] },
    { em:"💎", name:"VIP_PACKAGE.EX4",  price:1499, desc:"All EAs · License key · Lifetime support",          chips:["ALL EAs","LICENSE","LIFETIME","SUPPORT"] },
  ];

  return (
    <div style={{ minHeight:"100vh", background:BG, color:G, fontFamily:"'Space Mono',monospace", overflowX:"hidden", position:"relative", paddingBottom:80 }}>
      <canvas ref={matrixRef} style={{ position:"fixed", inset:0, zIndex:0, opacity:0.06, pointerEvents:"none" }}/>
      <style suppressHydrationWarning>{`@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');`}</style>

      {/* NAV */}
      <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(0,0,0,0.97)", borderBottom:"2px solid #003010", padding:"12px 18px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div>
          <div style={{ fontSize:16, fontWeight:700, textShadow:`0 0 10px ${G}` }}>SALMAN_FX</div>
          <div style={{ fontSize:9, color:"rgba(0,255,65,0.4)", letterSpacing:"2px" }}>EXPERT ADVISORS · MT4/MT5</div>
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:4, border:"1px solid #003010", borderRadius:3, padding:"3px 8px" }}>
            <span style={{ fontSize:8, animation:"blink 1s step-start infinite", color:G }}>●</span>
            <span style={{ fontSize:9, fontWeight:700 }}>LIVE</span>
          </div>
          <button onClick={onBack} style={{ padding:"5px 12px", background:"transparent", border:"1px solid #003010", borderRadius:2, color:"rgba(0,255,65,0.6)", fontSize:10, cursor:"pointer", fontFamily:"inherit" }}>← SYS</button>
        </div>
      </nav>
      <style suppressHydrationWarning>{`@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>

      {/* TICKER */}
      <div style={{ background:"#001808", borderBottom:"1px solid #003010", padding:"8px 0", overflow:"hidden" }}>
        <div style={{ display:"flex", gap:0, animation:"scroll 20s linear infinite", whiteSpace:"nowrap" }}>
          {["EUR/USD ▲1.0852","GBP/USD ▲1.2634","XAU/USD ▲2312.40","USD/JPY ▼154.32","EUR/GBP ▲0.8612","BTC/USD ▲64250"].map(t => (
            <span key={t} style={{ fontSize:10, marginRight:40, color:"rgba(0,255,65,0.7)" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* HERO */}
      <div style={{ padding:"28px 18px", position:"relative", zIndex:1 }}>
        <div style={{ fontSize:11, color:"rgba(0,255,65,0.5)", marginBottom:8 }}>C:\SALMANFX{">"} automate_trading.exe</div>
        <h1 style={{ fontSize:"clamp(22px,7vw,32px)", fontWeight:700, lineHeight:1.2, marginBottom:8, textShadow:`0 0 20px ${G}` }}>
          AUTOMATE YOUR<br/>FOREX
        </h1>
        <div style={{ fontSize:11, color:"rgba(0,255,65,0.6)", marginBottom:20 }}>{"> "}Parabolic SAR · MM FLIP CODEPRO · License Keys · MT4/MT5</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:20 }}>
          {[["67%","AVG WIN RATE"],["18.4%","BEST MONTH"],["2,400+","TOTAL TRADES"]].map(([v,l]) => (
            <div key={l} style={{ background:"rgba(0,255,65,0.04)", border:"1px solid #003010", padding:"12px 8px", textAlign:"center" }}>
              <div style={{ fontSize:18, fontWeight:700, color:G, textShadow:`0 0 8px ${G}` }}>{v}</div>
              <div style={{ fontSize:8, color:"rgba(0,255,65,0.4)", letterSpacing:"1px", marginTop:2 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:10 }}>
          <a href="/salmanfx" style={{ flex:1, padding:"12px", background:"rgba(0,255,65,0.08)", border:"1px solid #003010", borderRadius:2, color:G, fontSize:11, fontWeight:700, textDecoration:"none", textAlign:"center" }}>VIEW EAs</a>
          <a href="https://wa.me/971544735060?text=Hi Salman! I want to buy an EA" target="_blank" rel="noopener noreferrer"
            style={{ flex:1, padding:"12px", background:G, border:"none", borderRadius:2, color:"#000", fontSize:11, fontWeight:700, textDecoration:"none", textAlign:"center" }}>BUY NOW</a>
        </div>
      </div>

      {/* LIVE CHART */}
      <div style={{ padding:"0 16px 20px", position:"relative", zIndex:1 }}>
        <div style={{ border:"1px solid #003010", borderRadius:2, overflow:"hidden" }}>
          <div style={{ background:"#001808", padding:"8px 12px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:11, fontWeight:700 }}>{pair}</span>
            <span style={{ fontSize:13, fontWeight:700, color:G }}>{price.toFixed(4)}</span>
          </div>
          <canvas ref={chartRef} style={{ width:"100%", height:60, display:"block" }}/>
          <div style={{ display:"flex", gap:4, padding:"8px", overflowX:"auto", scrollbarWidth:"none" }}>
            {["EUR/USD","GBP/USD","USD/JPY","XAU/USD"].map(p => (
              <button key={p} onClick={() => setPair(p)}
                style={{ flexShrink:0, padding:"5px 10px", background:pair===p?G:"transparent", border:`1px solid ${pair===p?"#003010":"#003010"}`, borderRadius:2, color:pair===p?"#000":G, fontSize:10, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                {p}
              </button>
            ))}
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:4, padding:"8px" }}>
            {[["BUY ▲","#001a08","#00ff41"],["SELL ▼","#1a0000","#ff4141"],["CLOSE ✕","#0a0a0a","rgba(255,255,255,0.4)"]].map(([l,bg,c]) => (
              <button key={l} onClick={() => addLog(l.split(" ")[0], l.includes("BUY")?"PROFIT":"LOSS")}
                style={{ padding:"10px", background:bg, border:`1px solid ${c}`, borderRadius:2, color:c, fontSize:10, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* TRADE LOG */}
      <div style={{ padding:"0 16px 20px", position:"relative", zIndex:1 }}>
        <div style={{ border:"1px solid #003010", borderRadius:2, overflow:"hidden" }}>
          <div style={{ background:"#001808", padding:"8px 12px", fontSize:10, fontWeight:700, letterSpacing:"1px" }}>TRADE LOG</div>
          <div style={{ padding:"8px 12px", maxHeight:120, overflowY:"auto" }}>
            {logs.map((l,i) => (
              <div key={i} style={{ fontSize:9, color:l.includes("BUY")||l.includes("PROFIT")?"#00ff41":l.includes("SELL")||l.includes("LOSS")?"#ff4141":"rgba(0,255,65,0.6)", marginBottom:3 }}>{l}</div>
            ))}
          </div>
        </div>
      </div>

      {/* EA CARDS */}
      <div style={{ padding:"0 16px 20px", position:"relative", zIndex:1 }}>
        <div style={{ fontSize:12, fontWeight:700, letterSpacing:"2px", color:G, marginBottom:14 }}>EXPERT ADVISORS</div>
        {EAs.map(ea => (
          <div key={ea.name} style={{ background:"rgba(0,255,65,0.02)", border:"1px solid #003010", borderRadius:2, padding:"16px", marginBottom:10 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:24 }}>{ea.em}</span>
                <div>
                  <div style={{ fontSize:12, fontWeight:700 }}>{ea.name}</div>
                  <div style={{ fontSize:10, color:"rgba(0,255,65,0.5)", marginTop:2 }}>{ea.desc}</div>
                </div>
              </div>
              <div style={{ fontSize:16, fontWeight:700, color:G }}>AED {ea.price}</div>
            </div>
            <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:12 }}>
              {ea.chips.map(c => (
                <span key={c} style={{ padding:"3px 8px", border:"1px solid #003010", borderRadius:2, fontSize:9, fontWeight:700, letterSpacing:"0.5px" }}>{c}</span>
              ))}
            </div>
            <a href="https://wa.me/971544735060?text=Hi Salman! I want to buy your Forex EA" target="_blank" rel="noopener noreferrer"
              style={{ display:"block", padding:"10px", background:G, border:"none", borderRadius:2, color:"#000", fontSize:11, fontWeight:800, textDecoration:"none", textAlign:"center" }}>
              BUY NOW → WHATSAPP
            </a>
          </div>
        ))}
      </div>

      <WABtn msg="Hi Salman! I want to buy your Forex EA."/>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// SITE 5: WEBBUILDER
// ══════════════════════════════════════════════════════════════════
function SiteWebBuilder({ onBack }) {
  const [sent, setSent] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const G = "#ff6b35"; BG = "#0a0006";
  const PORTFOLIO = [
    { em:"🏜️", cat:"TOURISM", name:"DubaiRovers.com",    desc:"Full platform with booking, blog, admin panel", link:"/tours" },
    { em:"🏙️", cat:"REAL ESTATE", name:"PropCompare UAE", desc:"Property portal with AI advisor & ROI tools",   link:"/properties" },
    { em:"🏛️", cat:"ARCHITECTURE", name:"ARCHAI Villa",   desc:"AI design wizard with floor plans & prompts",   link:"/archai" },
    { em:"📈", cat:"FINTECH", name:"SalmanFX Trading",     desc:"Matrix-style trading terminal with live charts", link:"/salmanfx" },
  ];
  const TIERS = [
    { name:"STARTER",    price:"AED 1,200–3,000",  badge:null,          features:["5–8 pages","Mobile responsive","WhatsApp integration","Contact form","Basic SEO","2 revision rounds"] },
    { name:"BUSINESS",   price:"AED 4,000–8,000",  badge:"⭐ POPULAR",  features:["12–20 pages","Booking system","Admin dashboard","Blog CMS","AR/EN multilingual","Google Analytics","3 months support"] },
    { name:"PLATFORM",   price:"AED 12,000–25,000", badge:null,          features:["Unlimited pages","Full-stack platform","CRM & payments","API integrations","6 months support"] },
    { name:"ENTERPRISE", price:"Custom",            badge:null,          features:["Custom architecture","Multi-tenant","Database design","Full source code","12 months support"] },
  ];

  return (
    <div style={{ minHeight:"100vh", background:BG, color:"#fff", fontFamily:"'Inter',sans-serif", overflowX:"hidden", paddingBottom:80 }}>
      {menuOpen && (
        <div onClick={()=>setMenuOpen(false)} style={{position:"fixed",inset:0,zIndex:500,background:"rgba(10,0,6,.97)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:4}}>
          <span onClick={e=>{e.stopPropagation();setMenuOpen(false);}} style={{position:"absolute",top:18,right:20,fontSize:22,color:"#555",cursor:"pointer"}}>✕</span>
          {["PORTFOLIO","SERVICES","PRICING","CONTACT"].map(l=>(
            <a key={l} href={"#wb-"+l.toLowerCase()} onClick={()=>setMenuOpen(false)}
              style={{fontSize:28,fontWeight:900,textDecoration:"none",padding:"10px 26px",color:"#555",letterSpacing:-1,display:"block"}}>{l}</a>
          ))}
        </div>
      )}
      {/* NAV */}
      <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(10,0,6,0.97)", backdropFilter:"blur(20px)", borderBottom:`1px solid rgba(255,107,53,0.15)`, padding:"14px 18px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ fontSize:18, fontWeight:900, letterSpacing:"-0.5px" }}><span>WEB</span><span style={{ color:G }}>BUILDER</span></div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <button onClick={onBack} style={{ padding:"6px 10px", background:"transparent", border:`1px solid rgba(255,107,53,0.3)`, borderRadius:2, color:"rgba(255,107,53,0.7)", fontSize:9, cursor:"pointer", fontFamily:"inherit", fontWeight:700, letterSpacing:1.5 }}>← BACK</button>
          <div onClick={()=>setMenuOpen(true)} style={{width:34,height:34,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:5,cursor:"pointer"}}>
            <span style={{display:"block",width:18,height:1.5,background:"#ff6b35"}}/>
            <span style={{display:"block",width:18,height:1.5,background:"#ff6b35"}}/>
            <span style={{display:"block",width:18,height:1.5,background:"#ff6b35"}}/>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ padding:"40px 20px 32px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(255,107,53,0.06) 1px,transparent 1px)", backgroundSize:"20px 20px" }}/>
        <div style={{ position:"relative" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(255,107,53,0.1)", border:"1px solid rgba(255,107,53,0.25)", borderRadius:3, padding:"4px 12px", marginBottom:16 }}>
            <span style={{ fontSize:10, color:G, fontWeight:800, letterSpacing:"1px" }}>⚡ WEB DESIGN AGENCY · DUBAI</span>
          </div>
          <h1 style={{ fontSize:"clamp(32px,9vw,52px)", fontWeight:900, lineHeight:1.0, letterSpacing:"-2px", marginBottom:16 }}>
            YOUR NEXT<br/><span style={{ color:G }}>WEBSITE.</span>
          </h1>
          <p style={{ fontSize:14, color:"rgba(255,255,255,0.5)", marginBottom:24, lineHeight:1.7 }}>I build custom tourism, restaurant, real estate websites using React and Next.js. Dubai-based, WhatsApp-first.</p>
          <div style={{ display:"flex", gap:10 }}>
            <a href="https://wa.me/971544735060?text=Hi Salman! I want a website for my business" target="_blank" rel="noopener noreferrer"
              style={{ flex:1, padding:"14px", background:G, border:"none", borderRadius:2, color:"#000", fontWeight:800, fontSize:14, textDecoration:"none", textAlign:"center" }}>💬 Get a Quote</a>
            <a href="/webbuilder" style={{ flex:1, padding:"14px", background:"transparent", border:`1px solid ${G}`, borderRadius:2, color:G, fontWeight:700, fontSize:13, textDecoration:"none", textAlign:"center" }}>See Work</a>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", borderTop:`2px solid rgba(255,107,53,0.2)`, borderBottom:`2px solid rgba(255,107,53,0.2)` }}>
        {[["18+","Categories"],["5","Style Tiers"],["6+","Live Sites"]].map(([n,l]) => (
          <div key={l} style={{ padding:"16px 8px", textAlign:"center" }}>
            <div style={{ fontSize:24, fontWeight:900, color:G }}>{n}</div>
            <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)", letterSpacing:"0.5px" }}>{l}</div>
          </div>
        ))}
      </div>

      {/* PORTFOLIO */}
      <div style={{ padding:"24px 16px" }}>
        <div style={{ fontSize:16, fontWeight:900, marginBottom:16, letterSpacing:"-0.5px" }}>RECENT WORK</div>
        {PORTFOLIO.map(p => (
          <a key={p.name} href={p.link}
            style={{ display:"flex", alignItems:"center", gap:14, padding:"16px 14px", background:"rgba(255,255,255,0.02)", borderLeft:`3px solid ${G}`, marginBottom:10, textDecoration:"none", color:"inherit" }}>
            <div style={{ width:52, height:52, background:`rgba(255,107,53,0.1)`, border:`1px solid rgba(255,107,53,0.2)`, borderRadius:2, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, flexShrink:0 }}>{p.em}</div>
            <div style={{ flex:1, minWidth:0 }}>
              <div style={{ fontSize:10, color:G, fontWeight:700, letterSpacing:"1px", marginBottom:3 }}>{p.cat}</div>
              <div style={{ fontSize:14, fontWeight:800, marginBottom:3 }}>{p.name}</div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,0.45)" }}>{p.desc}</div>
            </div>
            <span style={{ fontSize:20, color:"rgba(255,107,53,0.5)" }}>›</span>
          </a>
        ))}
      </div>

      {/* PRICING */}
      <div style={{ padding:"0 16px 24px" }}>
        <div style={{ fontSize:16, fontWeight:900, marginBottom:16, letterSpacing:"-0.5px" }}>PRICING</div>
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {TIERS.map(t => (
            <div key={t.name} style={{ background:"rgba(255,255,255,0.02)", borderLeft:`3px solid ${t.badge?G:"rgba(255,107,53,0.3)"}`, padding:"18px 16px", position:"relative" }}>
              {t.badge && <div style={{ position:"absolute", top:-10, left:16, background:G, color:"#000", fontSize:9, fontWeight:800, padding:"2px 10px", borderRadius:2 }}>{t.badge}</div>}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                <div style={{ fontSize:14, fontWeight:900, letterSpacing:"0.5px" }}>{t.name}</div>
                <div style={{ fontSize:13, fontWeight:900, color:G }}>{t.price}</div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:4, marginBottom:14 }}>
                {t.features.map(f => <div key={f} style={{ fontSize:12, color:"rgba(255,255,255,0.55)" }}><span style={{ color:G }}>→</span> {f}</div>)}
              </div>
              <a href="https://wa.me/971544735060?text=Hi Salman! I am interested in your web development service" target="_blank" rel="noopener noreferrer"
                style={{ display:"block", padding:"10px", background:t.badge?G:"transparent", border:`1px solid ${G}`, borderRadius:2, color:t.badge?"#000":G, fontWeight:800, fontSize:12, textDecoration:"none", textAlign:"center" }}>
                GET QUOTE →
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* CONTACT FORM */}
      <div style={{ padding:"0 16px 24px" }}>
        <div style={{ fontSize:16, fontWeight:900, marginBottom:16, letterSpacing:"-0.5px" }}>START A PROJECT</div>
        {!sent ? (
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              <input placeholder="Your Name" style={{ padding:"12px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,107,53,0.2)", borderRadius:2, color:"#fff", fontSize:12 }}/>
              <input placeholder="WhatsApp" style={{ padding:"12px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,107,53,0.2)", borderRadius:2, color:"#fff", fontSize:12 }}/>
            </div>
            <select style={{ padding:"12px", background:"rgba(10,0,6,0.95)", border:"1px solid rgba(255,107,53,0.2)", borderRadius:2, color:"rgba(255,255,255,0.7)", fontSize:12 }}>
              <option>Business Type</option>
              {["Tourism","Restaurant","Real Estate","Medical","Education","Finance","Legal","Retail","Automotive","Beauty","Fitness","Tech","Events","NGO","Government","Food Delivery","E-commerce","Other"].map(c=><option key={c}>{c}</option>)}
            </select>
            <textarea placeholder="Describe your project..." rows={4} style={{ padding:"12px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,107,53,0.2)", borderRadius:2, color:"#fff", fontSize:12, resize:"none" }}/>
            <button onClick={() => setSent(true)}
              style={{ padding:"14px", background:G, border:"none", borderRadius:2, color:"#000", fontWeight:900, fontSize:14, cursor:"pointer", fontFamily:"inherit" }}>
              ⚡ SUBMIT PROJECT →
            </button>
          </div>
        ) : (
          <div style={{ textAlign:"center", padding:"40px 20px", background:"rgba(255,107,53,0.05)", border:`1px solid rgba(255,107,53,0.2)`, borderRadius:4 }}>
            <div style={{ fontSize:48, marginBottom:12 }}>⚡</div>
            <div style={{ fontSize:18, fontWeight:900, marginBottom:8 }}>Request Received!</div>
            <div style={{ fontSize:13, color:"rgba(255,255,255,0.5)", marginBottom:20 }}>I will WhatsApp you within 1 hour</div>
            <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
              style={{ padding:"12px 24px", background:G, borderRadius:2, color:"#000", fontWeight:800, fontSize:13, textDecoration:"none" }}>💬 Chat Now</a>
          </div>
        )}
      </div>

      <WABtn msg="Hi Salman! I want a website for my business."/>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// SITE 6: AL-NOOR
// ══════════════════════════════════════════════════════════════════
function SiteAlNoor({ onBack }) {
  const [activeTab, setActiveTab] = useState("prayer");
  const [surahFilter, setSurahFilter] = useState("ALL");
  const [dhikr, setDhikr] = useState("SubhanAllah");
  const [count, setCount] = useState(0);
  const [round, setRound] = useState(0);
  const [total, setTotal] = useState(0);
  const [time, setTime] = useState("");
  const G = "#c9a84c"; BG = "#03091a";
  const DHIKR_DATA = {
    "SubhanAllah":    { ar:"سُبْحَانَ اللّهِ",         target:33 },
    "Alhamdulillah":  { ar:"الْحَمْدُ للّهِ",           target:33 },
    "AllahuAkbar":    { ar:"اللّهُ أَكْبَرُ",           target:34 },
    "La Ilaha Illallah": { ar:"لَا إِلَٰهَ إِلَّا اللّٰهُ", target:100 },
    "Istighfar":      { ar:"أَسْتَغْفِرُ اللَّهَ",      target:100 },
  };
  const cur = DHIKR_DATA[dhikr] || DHIKR_DATA["SubhanAllah"];

  useEffect(() => {
    const t = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-US", { hour:"2-digit", minute:"2-digit", timeZone:"Asia/Dubai" }));
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const tap = () => {
    const nc = count + 1;
    setTotal(t => t+1);
    if (nc >= cur.target) { setCount(0); setRound(r=>r+1); }
    else setCount(nc);
  };

  const filtSurahs = surahFilter === "ALL" ? SURAHS : SURAHS.filter(s => s.type === surahFilter.toLowerCase());

  return (
    <div style={{ minHeight:"100vh", background:BG, color:"#fff", fontFamily:"'Inter',sans-serif", overflowX:"hidden", paddingBottom:80 }}>
      <style suppressHydrationWarning>{`@import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&display=swap');`}</style>

      {/* SVG Pattern */}
      <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", opacity:0.04 }}>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="hex" x="0" y="0" width="60" height="52" patternUnits="userSpaceOnUse">
            <polygon points="30,2 58,16 58,36 30,50 2,36 2,16" fill="none" stroke="#c9a84c" strokeWidth="1"/>
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#hex)"/>
        </svg>
      </div>

      {/* NAV */}
      <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(3,9,26,0.97)", backdropFilter:"blur(20px)", borderBottom:`1px solid rgba(201,168,76,0.15)`, padding:"12px 18px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <div style={{ width:32, height:32, transform:"rotate(45deg)", background:`linear-gradient(135deg,rgba(201,168,76,0.15),rgba(201,168,76,0.05))`, border:`1px solid rgba(201,168,76,0.4)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span style={{ transform:"rotate(-45deg)", fontSize:14 }}>☪</span>
          </div>
          <div>
            <div style={{ fontFamily:"'Amiri',serif", fontSize:18, color:G, fontWeight:700 }}>Al-Noor</div>
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:11, color:`rgba(201,168,76,0.5)`, fontFamily:"monospace" }}>{time}</span>
          <button onClick={onBack} style={{ padding:"5px 12px", background:"transparent", border:`1px solid rgba(201,168,76,0.25)`, borderRadius:20, color:`rgba(201,168,76,0.6)`, fontSize:11, cursor:"pointer", fontFamily:"inherit" }}>← Back</button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ padding:"32px 20px 24px", textAlign:"center", position:"relative", zIndex:1 }}>
        <div style={{ fontSize:12, color:G, letterSpacing:"2px", marginBottom:8 }}>❖ ✦ ❖</div>
        <div style={{ fontFamily:"'Amiri',serif", fontSize:32, color:G, direction:"rtl", marginBottom:4, lineHeight:1.4 }}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
        <div style={{ fontSize:11, fontStyle:"italic", color:"rgba(255,255,255,0.35)", marginBottom:16 }}>Bismillahir Rahmanir Raheem</div>
        <p style={{ fontSize:13, color:"rgba(255,255,255,0.5)", lineHeight:1.6 }}>Your complete Islamic companion — Prayer times, Quran, Dhikr and Duas</p>
      </div>

      {/* BOTTOM TABS */}
      <div style={{ position:"sticky", bottom:0, zIndex:100, background:"rgba(3,9,26,0.97)", borderTop:`1px solid rgba(201,168,76,0.15)`, display:"flex", justifyContent:"space-around", padding:"10px 0" }}>
        {[["🕌","PRAYER","prayer"],["📖","QURAN","quran"],["📿","TASBEEH","tasbeeh"],["🤲","DUA","dua"]].map(([ic,label,id]) => (
          <button key={id} onClick={() => setActiveTab(id)}
            style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:2, background:"transparent", border:"none", cursor:"pointer", padding:"4px 12px", borderBottom:activeTab===id?`2px solid ${G}`:"2px solid transparent" }}>
            <span style={{ fontSize:22, opacity:activeTab===id?1:0.4 }}>{ic}</span>
            <span style={{ fontSize:9, fontWeight:700, color:activeTab===id?G:"rgba(255,255,255,0.35)", letterSpacing:"0.5px" }}>{label}</span>
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div style={{ padding:"20px 16px", position:"relative", zIndex:1, paddingBottom:100 }}>

        {/* PRAYER */}
        {activeTab === "prayer" && (
          <div>
            <div style={{ textAlign:"center", marginBottom:16 }}>
              <div style={{ fontSize:10, color:`rgba(201,168,76,0.6)`, letterSpacing:"3px", marginBottom:4 }}>❖ ✦ ❖</div>
              <h2 style={{ fontFamily:"'Amiri',serif", fontSize:22, color:G }}>Prayer Times</h2>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)" }}>Dubai, UAE 🇦🇪</div>
            </div>
            {/* Next prayer highlight */}
            <div style={{ background:`rgba(201,168,76,0.08)`, border:`1px solid rgba(201,168,76,0.3)`, borderRadius:12, padding:"16px", marginBottom:16, textAlign:"center" }}>
              <div style={{ fontSize:10, color:G, fontWeight:700, letterSpacing:"1px", marginBottom:6 }}>NEXT PRAYER</div>
              <div style={{ fontSize:28, marginBottom:4 }}>🌤️</div>
              <div style={{ fontFamily:"'Amiri',serif", fontSize:20, fontWeight:700 }}>Asr</div>
              <div style={{ fontSize:22, color:G, fontWeight:800 }}>15:42</div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:8 }}>
              {PRAYERS.map(p => (
                <div key={p.name} style={{ background:p.next?`rgba(201,168,76,0.1)`:"rgba(255,255,255,0.03)", border:`1px solid ${p.next?"rgba(201,168,76,0.35)":"rgba(255,255,255,0.06)"}`, borderRadius:10, padding:"10px 6px", textAlign:"center" }}>
                  <div style={{ fontSize:18, marginBottom:4 }}>{p.em}</div>
                  <div style={{ fontSize:10, fontWeight:700, color:p.next?G:"rgba(255,255,255,0.6)", marginBottom:2 }}>{p.name}</div>
                  <div style={{ fontSize:12, fontWeight:800, color:p.next?G:"rgba(255,255,255,0.8)" }}>{p.time}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* QURAN */}
        {activeTab === "quran" && (
          <div>
            <div style={{ textAlign:"center", marginBottom:16 }}>
              <h2 style={{ fontFamily:"'Amiri',serif", fontSize:22, color:G, marginBottom:4 }}>Quran</h2>
            </div>
            <div style={{ display:"flex", gap:8, marginBottom:16 }}>
              {["ALL","MECCAN","MEDINAN"].map(f => (
                <button key={f} onClick={() => setSurahFilter(f)}
                  style={{ flex:1, padding:"8px", background:surahFilter===f?G:"rgba(255,255,255,0.04)", border:`1px solid ${surahFilter===f?"transparent":"rgba(201,168,76,0.15)"}`, borderRadius:20, color:surahFilter===f?"#000":"rgba(255,255,255,0.5)", fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
                  {f}
                </button>
              ))}
            </div>
            {filtSurahs.map(s => (
              <div key={s.n} style={{ display:"flex", alignItems:"center", padding:"14px 0", borderBottom:"1px solid rgba(201,168,76,0.08)" }}>
                <div style={{ width:36, height:36, border:`1px solid rgba(201,168,76,0.3)`, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:G, flexShrink:0, marginRight:12 }}>{s.n}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, fontSize:14 }}>{s.name}</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)" }}>{s.trans} · {s.v} verses · {s.type}</div>
                </div>
                <div style={{ fontFamily:"'Amiri',serif", fontSize:18, color:G, direction:"rtl" }}>{s.ar}</div>
              </div>
            ))}
          </div>
        )}

        {/* TASBEEH */}
        {activeTab === "tasbeeh" && (
          <div style={{ textAlign:"center" }}>
            <div style={{ fontFamily:"'Amiri',serif", fontSize:22, color:G, marginBottom:12 }}>التسبيح</div>
            <div style={{ display:"flex", gap:6, justifyContent:"center", flexWrap:"wrap", marginBottom:20 }}>
              {Object.keys(DHIKR_DATA).map(d => (
                <button key={d} onClick={() => { setDhikr(d); setCount(0); setRound(0); }}
                  style={{ padding:"6px 12px", background:dhikr===d?G:"rgba(255,255,255,0.04)", border:`1px solid ${dhikr===d?"transparent":"rgba(201,168,76,0.2)"}`, borderRadius:20, color:dhikr===d?"#000":"rgba(255,255,255,0.6)", fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap" }}>
                  {d}
                </button>
              ))}
            </div>
            <div style={{ fontFamily:"'Amiri',serif", fontSize:28, color:G, marginBottom:6, lineHeight:1.4, direction:"rtl" }}>{cur.ar}</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", marginBottom:24 }}>Target: {cur.target}</div>

            <button onClick={tap}
              style={{ width:160, height:160, borderRadius:"50%", background:`radial-gradient(circle,rgba(201,168,76,0.2),rgba(201,168,76,0.05))`, border:`3px solid ${G}`, color:"#fff", cursor:"pointer", display:"inline-flex", alignItems:"center", justifyContent:"center", boxShadow:`0 0 30px rgba(201,168,76,0.2)`, transition:"transform 0.1s", active:{transform:"scale(0.95)"} }}>
              <span style={{ fontFamily:"'Amiri',serif", fontSize:56, color:G, fontWeight:700, lineHeight:1 }}>{count}</span>
            </button>

            <div style={{ display:"flex", gap:20, justifyContent:"center", marginTop:20, marginBottom:16 }}>
              {[["Target",cur.target],["Round",round],["Total",total]].map(([l,v]) => (
                <div key={l} style={{ textAlign:"center" }}>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.4)", marginBottom:2 }}>{l}</div>
                  <div style={{ fontSize:18, fontWeight:800, color:G }}>{v}</div>
                </div>
              ))}
            </div>

            <div style={{ height:6, background:"rgba(255,255,255,0.08)", borderRadius:3, overflow:"hidden", marginBottom:16 }}>
              <div style={{ height:"100%", width:`${(count/cur.target)*100}%`, background:G, borderRadius:3, transition:"width 0.2s" }}/>
            </div>

            <button onClick={() => { setCount(0); setRound(0); setTotal(0); }}
              style={{ padding:"10px 24px", background:"transparent", border:`1px solid rgba(201,168,76,0.3)`, borderRadius:20, color:`rgba(201,168,76,0.6)`, fontSize:12, cursor:"pointer", fontFamily:"inherit" }}>
              ↺ RESET
            </button>
          </div>
        )}

        {/* DUA */}
        {activeTab === "dua" && (
          <div>
            <div style={{ fontFamily:"'Amiri',serif", fontSize:22, color:G, textAlign:"center", marginBottom:20 }}>Daily Duas</div>
            {DUAS.map((d,i) => (
              <div key={i} style={{ background:"rgba(255,255,255,0.02)", border:"1px solid rgba(201,168,76,0.1)", borderRadius:12, padding:"16px", marginBottom:12 }}>
                <div style={{ fontSize:13, fontWeight:700, color:G, marginBottom:10 }}>{d.title}</div>
                <div style={{ fontFamily:"'Amiri',serif", fontSize:20, color:"rgba(201,168,76,0.9)", direction:"rtl", textAlign:"right", lineHeight:2, marginBottom:10 }}>{d.ar}</div>
                <div style={{ fontSize:12, fontStyle:"italic", color:"rgba(255,255,255,0.45)", lineHeight:1.6 }}>{d.en}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <WABtn msg="Hi! I am using Al-Noor Islamic app."/>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// LAUNCHER SCREEN
// ══════════════════════════════════════════════════════════════════
function Launcher({ onGo }) {
  const SITES = [
    { id:"rv", em:"🏜️", name:"DubaiRovers",    tag:"TOURISM · BOOKING",       desc:"Luxury desert tours & experiences",         bg:"linear-gradient(135deg,#2d1500,#1a0800)", border:"rgba(201,168,76,0.4)", chips:["MAGAZINE","BOOKING","MULTILANG"] },
    { id:"pr", em:"🏙️", name:"PropCompare",    tag:"REAL ESTATE · PORTAL",    desc:"UAE property portal with AI tools",           bg:"linear-gradient(135deg,#001525,#0b1628)", border:"rgba(59,130,246,0.4)", chips:["LUXURY UI","8 PROPS","AI ADVISOR"] },
    { id:"ar", em:"🏛️", name:"ARCHAI",          tag:"ARCHITECTURE · EDITORIAL",desc:"Villa design wizard & AI prompts",            bg:"linear-gradient(135deg,#1a1510,#2a2015)", border:"rgba(200,169,110,0.4)", chips:["LIGHT MODE","EDITORIAL","AI PROMPT"] },
    { id:"fx", em:"📈", name:"SalmanFX",        tag:"FOREX · MATRIX TERMINAL", desc:"Automated trading robots MT4/MT5",            bg:"linear-gradient(135deg,#000,#001808)",    border:"rgba(0,255,65,0.4)",   chips:["MATRIX","LIVE CHART","3 EAs"] },
    { id:"wb", em:"⚡", name:"WebBuilder",      tag:"WEB AGENCY · BOLD",       desc:"Custom websites for Dubai businesses",        bg:"linear-gradient(135deg,#0a0006,#1a0010)", border:"rgba(255,107,53,0.4)", chips:["BOLD AGENCY","18 CATS","BRUTALIST"] },
    { id:"nr", em:"🕌", name:"Al-Noor",          tag:"ISLAMIC · GEOMETRIC",     desc:"Quran, prayer times, Qibla & duas",           bg:"linear-gradient(135deg,#03091a,#060d20)", border:"rgba(201,168,76,0.4)", chips:["ARABESQUE","PRAYER","QURAN"] },
  ];

  return (
    <div style={{ minHeight:"100vh", background:"#08070d", color:"#fff", fontFamily:"'Inter',sans-serif", paddingBottom:40 }}>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;800;900&display=swap');
        @keyframes fadeIn{from{opacity:0}to{opacity:1}} @keyframes gpulse{0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,0.4)}70%{box-shadow:0 0 0 10px rgba(37,211,102,0)}}
      `}</style>

      {/* NAV */}
      <nav style={{ padding:"20px 20px 0", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:16, fontWeight:800, background:"linear-gradient(90deg,#c9a84c,#a855f7)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>SALMAN.DEV</div>
        <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
          style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 14px", background:"rgba(37,211,102,0.1)", border:"1px solid rgba(37,211,102,0.3)", borderRadius:20, color:"#25D366", fontSize:12, fontWeight:700, textDecoration:"none", animation:"gpulse 2s infinite" }}>
          💬 WhatsApp
        </a>
      </nav>

      {/* HERO */}
      <div style={{ padding:"32px 20px 20px", textAlign:"center" }}>
        <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:"clamp(28px,8vw,42px)", fontWeight:900, marginBottom:8, lineHeight:1.1 }}>6 Live Projects</div>
        <div style={{ fontSize:11, color:"rgba(255,255,255,0.35)", letterSpacing:"4px", fontFamily:"'Orbitron',sans-serif", marginBottom:24 }}>DUBAI · UAE · FULL-STACK</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, maxWidth:400, margin:"0 auto" }}>
          {[["6","APPS"],["3","EAs"],["30","PROPS"],["114","SURAHS"]].map(([n,l],i) => (
            <div key={l} style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'Orbitron',sans-serif", fontSize:18, fontWeight:800, color:["#c9a84c","#00ff41","#3B82F6","#c9a84c"][i] }}>{n}</div>
              <div style={{ fontSize:8, color:"rgba(255,255,255,0.3)", letterSpacing:"1px", fontWeight:700 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CARDS */}
      <div style={{ padding:"0 16px", display:"flex", flexDirection:"column", gap:12 }}>
        {SITES.map(s => (
          <div key={s.id} onClick={() => onGo(s.id)}
            style={{ background:s.bg, border:`1px solid ${s.border}`, borderRadius:16, overflow:"hidden", display:"flex", cursor:"pointer", transition:"transform 0.2s" }}
            onTouchStart={e => e.currentTarget.style.transform="scale(0.98)"}
            onTouchEnd={e => e.currentTarget.style.transform="scale(1)"}>
            <div style={{ width:80, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <span style={{ fontSize:40 }}>{s.em}</span>
            </div>
            <div style={{ flex:1, padding:"16px 14px 16px 0" }}>
              <div style={{ fontSize:9, color:s.border.replace("0.4)","0.9)"), fontWeight:700, letterSpacing:"1.5px", marginBottom:4 }}>{s.tag}</div>
              <div style={{ fontSize:16, fontWeight:900, marginBottom:4 }}>{s.name}</div>
              <div style={{ fontSize:11, color:"rgba(255,255,255,0.45)", marginBottom:8 }}>{s.desc}</div>
              <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                {s.chips.map(c => (
                  <span key={c} style={{ padding:"2px 8px", background:"rgba(255,255,255,0.06)", borderRadius:20, fontSize:9, fontWeight:700, letterSpacing:"0.5px", color:"rgba(255,255,255,0.5)" }}>{c}</span>
                ))}
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", paddingRight:14, color:"rgba(255,255,255,0.2)", fontSize:20 }}>›</div>
          </div>
        ))}
      </div>

      <div style={{ textAlign:"center", padding:"24px 16px 0", fontSize:11, color:"rgba(255,255,255,0.2)" }}>
        © 2026 Salman Ali · Dubai, UAE 🇦🇪
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// MAIN MOBILE APP
// ══════════════════════════════════════════════════════════════════
export default function MobileApp() {
  const [site, setSite] = useState("launcher");

  const go = useCallback((id) => setSite(id), []);
  const back = useCallback(() => setSite("launcher"), []);

  const renderSite = () => {
    switch(site) {
      case "rv": return <SiteDubaiRovers onBack={back}/>;
      case "pr": return <SitePropCompare onBack={back}/>;
      case "ar": return <SiteARCHAI onBack={back}/>;
      case "fx": return <SiteSalmanFX onBack={back}/>;
      case "wb": return <SiteWebBuilder onBack={back}/>;
      case "nr": return <SiteAlNoor onBack={back}/>;
      default:   return <Launcher onGo={go}/>;
    }
  };

  return (
    <div style={{ maxWidth:430, margin:"0 auto", minHeight:"100vh", overflowX:"hidden" }}>
      {renderSite()}
    </div>
  );
}
