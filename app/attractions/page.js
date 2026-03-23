"use client";
import { useState, useEffect, useRef } from "react";
import AttractionsAnimation from "../components/AttractionsAnimation";

// ── Cinematic hero slides for Attractions ──
const ATT_SLIDES = [
  { label:"🌸 Miracle Garden",        sub:"Emirates plane covered in 5M flowers in bloom" },
  { label:"🗼 Burj Khalifa At The Top",sub:"555m above Dubai — fountains & fireworks"      },
  { label:"💦 Aquaventure Waterpark",  sub:"Record-breaking slides on the Palm Jumeirah"   },
  { label:"🦈 Dubai Aquarium",         sub:"33,000 sea creatures including sand tiger sharks"},
  { label:"🌍 Global Village",         sub:"90 nations — rides, food & fireworks Oct–Apr"  },
  { label:"🔮 Museum of the Future",   sub:"World's most beautiful building — year 2071"    },
];

const DEMO_ATTRACTIONS = [
  { id:"burj-khalifa-top",  name:"Burj Khalifa At The Top",        shortDesc:"Skip-the-line access to the world's tallest building. 555 metres above Dubai — panoramic views across the city, desert and Gulf.",                            location:"Downtown Dubai",   category:"observation", demoPrice:149, image:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=700&q=80",  badge:"bestseller", spotsLeft:8,    tags:["⏱ 90 min","⚡ Instant Ticket","📱 Mobile Voucher","🚫 No Queue"],     rating:4.9, reviewCount:12847, waMessage:"Hi DubaiRovers! I want to book Burj Khalifa tickets. Please send me available dates and prices. 🗼", vip:true  },
  { id:"dubai-frame",       name:"Dubai Frame — Sky Bridge",        shortDesc:"Walk across a glass-floor bridge connecting old and new Dubai. 150 metres above ground. One side faces historic Deira, the other iconic Downtown.",              location:"Zabeel Park",      category:"observation", demoPrice:63,  image:"https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=700&q=80",  badge:"popular",    spotsLeft:null,  tags:["⏱ 60 min","⚡ Instant Ticket","🏛️ Iconic"],                          rating:4.7, reviewCount:6210,  waMessage:"Hi DubaiRovers! I want to book Dubai Frame tickets. 🖼️", vip:false },
  { id:"img-worlds",        name:"IMG Worlds of Adventure",         shortDesc:"The world's largest indoor theme park. Marvel, DC, Cartoon Network zones — 1.5 million sq ft of non-stop adventure for the whole family.",                       location:"City of Arabia",   category:"themepark",   demoPrice:299, image:"https://images.unsplash.com/photo-1569880153113-76e33fc52d5f?w=700&q=80",  badge:"limited",    spotsLeft:12,   tags:["⏱ Full Day","🎢 Unlimited Rides","👨‍👩‍👧 Family"],                    rating:4.8, reviewCount:9443,  waMessage:"Hi DubaiRovers! I want to book IMG Worlds passes. 🎢", vip:false },
  { id:"dubai-aquarium",    name:"Dubai Aquarium & Underwater Zoo", shortDesc:"Home to 33,000 aquatic animals including the world's largest collection of sand tiger sharks. Glass-bottom boat and cage snorkelling available.",               location:"Dubai Mall",        category:"marine",      demoPrice:120, image:"https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=700&q=80",  badge:null,         spotsLeft:null,  tags:["⏱ 2–3 hrs","🐠 33K Animals","🐬 Marine"],                             rating:4.6, reviewCount:8120,  waMessage:"Hi DubaiRovers! I want to book Dubai Aquarium tickets. 🦈", vip:false },
  { id:"hot-air-balloon",   name:"Hot Air Balloon Sunrise",         shortDesc:"Float above the golden dunes as the sun rises. Gourmet breakfast and falcon show included. The most unforgettable 60 minutes in Dubai.",                         location:"Dubai Desert",     category:"aerial",      demoPrice:895, image:"https://images.unsplash.com/photo-1559827291-72ee739d0d9a?w=700&q=80",  badge:"bestseller", spotsLeft:4,    tags:["⏱ 4 hours","🌅 Sunrise","🍳 Breakfast Included"],                     rating:5.0, reviewCount:3218,  waMessage:"Hi DubaiRovers! I want to book Hot Air Balloon Sunrise. 🎈", vip:true  },
  { id:"museum-future",     name:"Museum of the Future",            shortDesc:"Ranked the world's most beautiful building. An immersive journey to 2071 across 5 transformative floors. No two visits are ever the same.",                      location:"Sheikh Zayed Rd",  category:"museum",      demoPrice:185, image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80",  badge:"new",        spotsLeft:0,    tags:["⏱ 2–4 hrs","🔮 Immersive","🏛️ Iconic"],                              rating:4.9, reviewCount:5670,  waMessage:"Hi DubaiRovers! I want to book Museum of the Future tickets. 🔮", vip:false },
  { id:"aquaventure",       name:"Aquaventure Waterpark",           shortDesc:"Dubai's most thrilling waterpark on the Palm Jumeirah. Record-breaking slides, a private beach, and over 1 km of river rapids.",                               location:"Palm Jumeirah",    category:"waterpark",   demoPrice:330, image:"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=700&q=80",  badge:"bestseller", spotsLeft:null,  tags:["⏱ Full Day","🏄 Water Slides","🏖️ Private Beach"],                   rating:4.7, reviewCount:11200, waMessage:"Hi DubaiRovers! I want to book Aquaventure Waterpark. 💦", vip:false },
  { id:"sky-views",         name:"Sky Views Observatory",           shortDesc:"Dubai's most spectacular 360° view from the 53rd floor of the Address Sky View hotel. Optional thrilling Edge Walk for the brave.",                              location:"Downtown Dubai",   category:"observation", demoPrice:129, image:"https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=700&q=80",  badge:"popular",    spotsLeft:null,  tags:["⏱ 60 min","🔭 360° Views","🚶 Edge Walk"],                            rating:4.8, reviewCount:4320,  waMessage:"Hi DubaiRovers! I want to book Sky Views Observatory. 🌆", vip:false },
  { id:"la-perle",          name:"La Perle by Dragone",             shortDesc:"Dubai's first permanent live show — 65 international artists performing jaw-dropping acrobatics, aquatics and special effects in a custom-built 1,300-seat theatre.", location:"Al Habtoor City", category:"shows",      demoPrice:299, image:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80",  badge:"bestseller", spotsLeft:8,    tags:["🎭 Live Show","💧 Aquatics","⭐ World Class"],                          rating:4.9, reviewCount:5200,  waMessage:"Hi DubaiRovers! I want to book La Perle show tickets. 🎭", vip:false },
  { id:"dubai-garden-glow", name:"Dubai Garden Glow",               shortDesc:"The world's largest illuminated theme park. 100 million recycled LED lights across magical themed zones — spectacular after dark.",                              location:"Zabeel Park",      category:"shows",       demoPrice:95,  image:"https://images.unsplash.com/photo-1563089145-599997674d42?w=700&q=80",  badge:"new",        spotsLeft:null,  tags:["🌙 Night Only","💡 LED Art","📸 Instagrammable"],                      rating:4.7, reviewCount:9800,  waMessage:"Hi DubaiRovers! I want to book Dubai Garden Glow tickets. 🌟", vip:false },
  { id:"atlantis-vip",      name:"Atlantis Aquaventure VIP",        shortDesc:"Exclusive VIP access including reserved sun loungers, priority entry, food and beverage credit, and personal concierge service at the Palm's iconic resort.",       location:"Palm Jumeirah",    category:"waterpark",   demoPrice:980, image:"https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=700&q=80",  badge:"limited",    spotsLeft:2,    tags:["👑 VIP Access","🍽️ F&B Credit","🛎️ Concierge"],                       rating:5.0, reviewCount:1840,  waMessage:"Hi DubaiRovers! I want to book Atlantis VIP access. 👑", vip:true  },
  { id:"legoland",          name:"Legoland Dubai",                  shortDesc:"Over 40 rides and attractions across 6 LEGO-themed lands. Perfect for families with children aged 2–12 inside Dubai Parks and Resorts.",                         location:"Dubai Parks",      category:"themepark",   demoPrice:275, image:"https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=700&q=80",  badge:"popular",    spotsLeft:20,   tags:["⏱ Full Day","🧱 LEGO Rides","👶 Kids 2–12"],                          rating:4.6, reviewCount:7200,  waMessage:"Hi DubaiRovers! I want to book Legoland Dubai tickets. 🧱", vip:false },
];

const CATS = [
  { key:"all",         icon:"🌟", label:"All"              },
  { key:"observation", icon:"🏙️", label:"Observation Decks"},
  { key:"themepark",   icon:"🎢", label:"Theme Parks"      },
  { key:"museum",      icon:"🏛️", label:"Museums"          },
  { key:"waterpark",   icon:"💧", label:"Water Parks"      },
  { key:"marine",      icon:"🐬", label:"Marine & Wildlife"},
  { key:"aerial",      icon:"🚁", label:"Aerial Tours"     },
  { key:"shows",       icon:"🎭", label:"Shows & Events"   },
];

const WA = "971544735060";
const BADGE = {
  bestseller:{ label:"🔥 Bestseller", bg:"#d4561a" },
  popular:   { label:"✨ Popular",    bg:"#059669" },
  new:       { label:"🆕 New",        bg:"#7c3aed" },
  limited:   { label:"⚡ Limited",    bg:"#dc2626" },
};



export default function AttractionsPage() {
  const [theme, setTheme]   = useState("dark");
  const [cat, setCat]       = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort]     = useState("popular");
  const [guests, setGuests] = useState("1 Adult");
  const [date, setDate]     = useState("");
  const [wished, setWished] = useState({});
  const [rev, setRev]       = useState({});
  const [hidden, setHidden] = useState(null);
  const [slide, setSlide]   = useState(0);
  const [fade, setFade]     = useState(true);
  const refs = useRef([]);

  useEffect(() => {
    setTheme(localStorage.getItem("dr_theme") || "dark");
    try {
      const pv = JSON.parse(localStorage.getItem("dr_page_visibility") || "{}");
      setHidden(pv.attractions === false);
    } catch { setHidden(false); }
    const d = new Date(); d.setDate(d.getDate() + 1);
    setDate(d.toISOString().split("T")[0]);

    // Cinematic slideshow — 6s per scene
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setSlide(s => (s + 1) % ATT_SLIDES.length);
        setFade(true);
      }, 700);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setRev(p => ({ ...p, [e.target.dataset.id]: true })) }),
      { threshold: 0.05 }
    );
    refs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, [cat, search, sort]);

  const dark = theme === "dark";
  const BG   = dark ? "#080604" : "#faf5ec";
  const CARD = dark ? "#130e05" : "#ffffff";
  const BD   = dark ? "rgba(255,255,255,.07)" : "rgba(0,0,0,.08)";
  const TXT  = dark ? "#f0ebe4" : "#1a1208";
  const SUB  = dark ? "rgba(240,235,228,.48)" : "#8b6f4e";
  const HDR  = dark ? "#0d0a06" : "#ede3d3";
  const INP  = { width:"100%", padding:"10px 13px", borderRadius:10, background:dark?"#1a1a2e":"#ffffff", border:`1px solid ${BD}`, color:TXT, fontSize:13, outline:"none", fontFamily:"inherit", boxSizing:"border-box" };
  const OPT  = { backgroundColor:dark?"#1a1a2e":"#ffffff", color:TXT };

  const filtered = DEMO_ATTRACTIONS
    .filter(a => (cat === "all" || a.category === cat) && (!search || a.name.toLowerCase().includes(search.toLowerCase())))
    .sort((a, b) => {
      if (sort === "price_asc")  return a.demoPrice - b.demoPrice;
      if (sort === "price_desc") return b.demoPrice - a.demoPrice;
      if (sort === "rating")     return b.rating - a.rating;
      return b.reviewCount - a.reviewCount;
    });

  const getAvail = a => {
    if (a.spotsLeft === 0)  return { text:"✗ Sold out today",            color:"#ef4444" };
    if (a.spotsLeft <= 5)   return { text:`⚠️ Only ${a.spotsLeft} left`,  color:"#f59e0b" };
    if (a.spotsLeft <= 15)  return { text:`⚡ ${a.spotsLeft} tickets`,    color:"#f59e0b" };
    return                         { text:"✓ Available today",            color:"#10b981" };
  };

  const book = a => window.open(`https://wa.me/${WA}?text=${encodeURIComponent(`${a.waMessage}\n📅 Date: ${date}\n👥 Guests: ${guests}`)}`, "_blank");

  if (hidden === null) return null; // wait for client mount
  if (hidden) return (
    <div style={{ minHeight:"100vh", background:"#080604", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Sans',sans-serif", flexDirection:"column", gap:16, textAlign:"center", padding:24 }}>
      <div style={{ fontSize:56 }}>🎟️</div>
      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:700, color:"#f0ebe4" }}>Attraction Tickets</div>
      <div style={{ color:"rgba(240,235,228,.5)", fontSize:15, maxWidth:380 }}>This page is temporarily unavailable. Please check back soon or contact us on WhatsApp.</div>
      <a href={`https://wa.me/971544735060?text=${encodeURIComponent("Hi DubaiRovers! I need help booking an attraction ticket. 🎟️")}`} target="_blank" rel="noreferrer" style={{ padding:"13px 28px", background:"linear-gradient(135deg,#25D366,#128C7E)", borderRadius:12, color:"#fff", fontWeight:700, fontSize:14, textDecoration:"none", display:"flex", alignItems:"center", gap:8 }}>💬 Contact Us on WhatsApp</a>
      <a href="/" style={{ color:"rgba(240,235,228,.35)", fontSize:12, textDecoration:"none", marginTop:4 }}>← Back to Home</a>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:BG, fontFamily:"'DM Sans',sans-serif" }}>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,700&family=Bebas+Neue&display=swap');
        *{box-sizing:border-box}
        ::-webkit-scrollbar{height:4px;width:4px}::-webkit-scrollbar-thumb{background:rgba(201,149,58,.3);border-radius:2px}
        @keyframes waFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        @keyframes waPulse{0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,.4)}70%{box-shadow:0 0 0 12px rgba(37,211,102,0)}}
        .att-c{transition:transform .35s,box-shadow .35s!important}
        .att-c:hover{transform:translateY(-8px)!important;box-shadow:0 28px 64px rgba(0,0,0,.65)!important}
        .cat-b:hover{border-color:rgba(201,149,58,.5)!important;color:#e8b86d!important}
        .img-z{transition:transform .5s}
        .att-c:hover .img-z{transform:scale(1.06)}
        input[type=date]{color-scheme:${dark?"dark":"light"}}
        select option{background:#130e05}
      `}</style>

      <div style={{ height:68 }} />

      {/* ═══ CINEMATIC CANVAS ANIMATION HERO ═══ */}
      <div style={{ position:"relative", height:420, overflow:"hidden", background:"#080604" }}>
        {/* Live canvas animation */}
        <div style={{ position:"absolute", inset:0 }}>
          <AttractionsAnimation step={slide} />
        </div>

        {/* Slide label bottom-left — driven by ATT_SLIDES */}
        <div style={{
          position:"absolute", bottom:28, left:24,
          opacity: fade ? 1 : 0, transition:"opacity 0.8s ease",
          background:"rgba(0,0,0,0.45)", backdropFilter:"blur(8px)",
          border:"1px solid rgba(255,255,255,0.1)", borderRadius:14, padding:"10px 18px",
          maxWidth: "55%",
        }}>
          <div style={{ fontSize:"clamp(16px,2.5vw,26px)", fontFamily:"'Playfair Display',serif", fontWeight:900, color:"#f0ebe4", lineHeight:1.15 }}>
            {ATT_SLIDES[slide % ATT_SLIDES.length].label}
          </div>
          <div style={{ fontSize:12, color:"rgba(240,235,228,.65)", marginTop:4 }}>
            {ATT_SLIDES[slide % ATT_SLIDES.length].sub}
          </div>
        </div>

        {/* Slide dots */}
        <div style={{ position:"absolute", bottom:32, right:24, display:"flex", gap:6 }}>
          {ATT_SLIDES.map((_, i) => (
            <button key={i} onClick={() => { setSlide(i); setFade(true); }}
              style={{ width:slide===i?20:6, height:6, borderRadius:4, border:"none", cursor:"pointer", transition:"all 0.3s", background:slide===i?"#e8b86d":"rgba(255,255,255,.4)" }} />
          ))}
        </div>

        {/* Breadcrumb + flights link */}
        <div style={{ position:"absolute", top:20, left:24, right:24, display:"flex", alignItems:"center", gap:8, fontSize:12 }}>
          <a href="/" style={{ color:"rgba(240,235,228,.6)", textDecoration:"none" }}>🏠 Home</a>
          <span style={{ color:"rgba(240,235,228,.3)" }}>›</span>
          <span style={{ color:"#e8b86d", fontWeight:600 }}>🎟️ Attraction Tickets</span>
          <a href="/flights" style={{ marginLeft:"auto", color:"#e8b86d", textDecoration:"none", fontWeight:600, fontSize:11, padding:"5px 14px", border:"1px solid rgba(201,149,58,.4)", borderRadius:20, backdropFilter:"blur(8px)", background:"rgba(0,0,0,.3)", display:"flex", alignItems:"center", gap:5 }}>✈️ Airline Tickets →</a>
        </div>

        {/* Centered title overlay */}
        <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"0 24px", pointerEvents:"none" }}>
          <div style={{ fontSize:11, letterSpacing:"0.18em", textTransform:"uppercase", color:"#e8b86d", fontWeight:700, marginBottom:8, background:"rgba(0,0,0,0.35)", padding:"4px 14px", borderRadius:20 }}>✨ Dubai's Best Experiences</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(28px,4.5vw,58px)", fontWeight:900, color:"#f0ebe4", lineHeight:1.05, textShadow:"0 4px 20px rgba(0,0,0,.6)", background:"rgba(0,0,0,0.25)", padding:"8px 20px", borderRadius:12 }}>
            Attraction <em style={{ color:"#e8b86d" }}>Tickets</em>
          </h1>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background:dark?"rgba(255,255,255,.03)":"rgba(0,0,0,.03)", borderBottom:`1px solid ${BD}`, padding:"12px 44px", display:"flex", gap:24, flexWrap:"wrap" }}>
        {[["🎟️","12 Attractions"],["⚡","Instant Confirmation"],["⭐","4.8★ Average Rating"],["💬","WhatsApp Booking"]].map(([ic,lb]) => (
          <div key={lb} style={{ display:"flex", alignItems:"center", gap:7, fontSize:12, color:SUB, fontWeight:500 }}>
            <span style={{ fontSize:14 }}>{ic}</span><span>{lb}</span>
          </div>
        ))}
      </div>

      {/* STICKY SEARCH */}
      <div style={{ position:"sticky", top:0, zIndex:80, background:HDR, borderBottom:`1px solid ${BD}`, padding:"13px 44px" }}>
        <div style={{ display:"flex", gap:10, flexWrap:"wrap", alignItems:"flex-end", marginBottom:11 }}>
          <div style={{ flex:"2 1 200px" }}>
            <label style={{ fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:SUB, display:"block", marginBottom:5 }}>🔍 Search</label>
            <input style={INP} placeholder="Burj Khalifa, Aquaventure, Museum..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div style={{ flex:"1 1 120px" }}>
            <label style={{ fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:SUB, display:"block", marginBottom:5 }}>📅 Date</label>
            <input style={INP} type="date" value={date} onChange={e => setDate(e.target.value)} />
          </div>
          <div style={{ flex:"1 1 120px" }}>
            <label style={{ fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:SUB, display:"block", marginBottom:5 }}>👥 Guests</label>
            <select style={INP} value={guests} onChange={e => setGuests(e.target.value)}>
              {["1 Adult","2 Adults","2 Adults + 1 Child","Family (4)","Group (6+)"].map(o => <option key={o} style={OPT}>{o}</option>)}
            </select>
          </div>
          <div style={{ flex:"1 1 120px" }}>
            <label style={{ fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:SUB, display:"block", marginBottom:5 }}>↕️ Sort</label>
            <select style={INP} value={sort} onChange={e => setSort(e.target.value)}>
              <option value="popular" style={OPT}>Most Popular</option>
              <option value="price_asc" style={OPT}>Price: Low → High</option>
              <option value="price_desc" style={OPT}>Price: High → Low</option>
              <option value="rating" style={OPT}>Top Rated</option>
            </select>
          </div>
        </div>
        <div style={{ display:"flex", gap:6, overflowX:"auto", paddingBottom:2 }}>
          {CATS.map(c => (
            <button key={c.key} className="cat-b" onClick={() => setCat(c.key)}
              style={{ display:"flex", alignItems:"center", gap:5, padding:"6px 14px", borderRadius:30, fontSize:11, fontWeight:600, color:cat===c.key?"#fff":SUB, border:`1px solid ${cat===c.key?"#c9953a":BD}`, background:cat===c.key?"linear-gradient(135deg,#c9953a,#d4561a)":"none", cursor:"pointer", whiteSpace:"nowrap", transition:"all .2s", flexShrink:0 }}>
              {c.icon} {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* RESULTS COUNT */}
      <div style={{ padding:"12px 44px 4px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ color:SUB, fontSize:13 }}><strong style={{color:TXT}}>{filtered.length}</strong> attractions found</span>
        <a href="/flights" style={{ fontSize:12, color:"#e8b86d", textDecoration:"none", fontWeight:600 }}>✈️ Also book flights →</a>
      </div>

      {/* CARDS */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(310px,1fr))", gap:22, padding:"16px 44px 60px" }}>
        {filtered.length === 0 && (
          <div style={{ gridColumn:"1/-1", textAlign:"center", padding:"64px 20px" }}>
            <div style={{ fontSize:44, marginBottom:12 }}>🔍</div>
            <div style={{ color:SUB, fontSize:15 }}>No attractions match your search.</div>
            <button onClick={() => { setSearch(""); setCat("all"); }} style={{ marginTop:14, padding:"9px 22px", background:"linear-gradient(135deg,#c9953a,#d4561a)", border:"none", borderRadius:9, color:"#fff", fontWeight:700, fontSize:13, cursor:"pointer" }}>Clear Filters</button>
          </div>
        )}
        {filtered.map((a, i) => {
          const avail = getAvail(a);
          const badge = a.badge && BADGE[a.badge];
          const sold  = a.spotsLeft === 0;
          return (
            <div key={a.id} className="att-c"
              ref={el => { refs.current[i] = el; if (el) el.dataset.id = a.id; }}
              style={{ borderRadius:22, overflow:"hidden", background:CARD, border:`1px solid ${a.vip?"rgba(201,149,58,.5)":BD}`, position:"relative", display:"flex", flexDirection:"column",
                opacity:rev[a.id]?1:0, transform:rev[a.id]?"translateY(0)":"translateY(28px)", transition:`opacity .5s ${(i%4)*.08}s, transform .5s ${(i%4)*.08}s` }}>

              {a.vip && <div style={{ background:"linear-gradient(90deg,#c9953a,#e8b86d,#c9953a)", color:"#1a1208", fontSize:9, fontWeight:900, letterSpacing:".15em", textAlign:"center", padding:"5px 0" }}>👑 &nbsp;V I P &nbsp; E X P E R I E N C E&nbsp; 👑</div>}

              <div style={{ position:"relative", height:224, overflow:"hidden" }}>
                <img src={a.image} alt={a.name} className="img-z" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(10,7,2,.9),rgba(10,7,2,.1) 50%,transparent)" }} />
                <div style={{ position:"absolute", top:10, left:"50%", transform:"translateX(-50%)", background:"rgba(234,179,8,.88)", color:"#000", fontSize:8, fontWeight:900, letterSpacing:".1em", padding:"2px 10px", borderRadius:20, whiteSpace:"nowrap", zIndex:4 }}>DEMO DATA</div>
                {badge && <div style={{ position:"absolute", top:13, left:13, padding:"4px 11px", borderRadius:20, background:badge.bg, color:"#fff", fontSize:9, fontWeight:800, zIndex:2 }}>{badge.label}</div>}
                <button onClick={() => setWished(p => ({ ...p, [a.id]:!p[a.id] }))}
                  style={{ position:"absolute", top:13, right:13, width:34, height:34, borderRadius:"50%", background:"rgba(10,7,2,.65)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,.15)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, cursor:"pointer", zIndex:2 }}>
                  {wished[a.id] ? "❤️" : "🤍"}
                </button>
                <div style={{ position:"absolute", bottom:13, right:13, padding:"7px 13px", borderRadius:22, background:"rgba(10,7,2,.78)", backdropFilter:"blur(14px)", border:"1px solid rgba(201,149,58,.35)", zIndex:2 }}>
                  <div style={{ fontSize:9, color:"rgba(240,235,228,.5)" }}>from</div>
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, color:"#e8b86d", lineHeight:1 }}>{a.demoPrice}</div>
                  <div style={{ fontSize:9, color:"rgba(240,235,228,.5)" }}>AED / person</div>
                </div>
              </div>

              <div style={{ padding:"16px 18px 20px", flex:1, display:"flex", flexDirection:"column" }}>
                <div style={{ fontSize:11, color:SUB, marginBottom:5 }}>📍 {a.location}</div>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:17, fontWeight:700, color:TXT, marginBottom:8, lineHeight:1.3 }}>{a.name}</div>
                <p style={{ fontSize:12.5, color:SUB, lineHeight:1.7, marginBottom:13, flex:1 }}>{a.shortDesc}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:14 }}>
                  {a.tags.map(t => <span key={t} style={{ padding:"3px 10px", borderRadius:20, background:dark?"rgba(255,255,255,.05)":"rgba(0,0,0,.05)", border:`1px solid ${BD}`, fontSize:10, color:SUB }}>{t}</span>)}
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:11, borderTop:`1px solid ${BD}`, marginBottom:13 }}>
                  <div>
                    <span style={{ color:"#c9953a", fontSize:12 }}>{"★".repeat(Math.floor(a.rating))}{"☆".repeat(5-Math.floor(a.rating))}</span>
                    <span style={{ fontSize:13, fontWeight:700, color:TXT, marginLeft:4 }}>{a.rating}</span>
                    <span style={{ fontSize:11, color:SUB }}> ({a.reviewCount.toLocaleString()})</span>
                  </div>
                  <span style={{ fontSize:11, fontWeight:700, color:avail.color }}>{avail.text}</span>
                </div>
                <button disabled={sold} onClick={() => !sold && book(a)}
                  style={{ width:"100%", padding:"12px 0", borderRadius:11, background:sold?"rgba(255,255,255,.08)":"linear-gradient(135deg,#c9953a,#d4561a)", color:sold?"rgba(255,255,255,.25)":"#fff", fontSize:13, fontWeight:700, border:"none", cursor:sold?"not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:7 }}>
                  {sold ? "🎟️ Sold Out Today" : `🎟️ Book Now — AED ${a.demoPrice}`}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CROSS-LINK BANNER */}
      <div style={{ margin:"0 44px 60px", padding:"22px 28px", background:dark?"linear-gradient(135deg,rgba(10,7,2,.95),rgba(26,16,8,.98))":"#fff", border:"1px solid rgba(201,149,58,.25)", borderRadius:18, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
        <div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:TXT, marginBottom:5 }}>✈️ Also need flights?</div>
          <div style={{ color:SUB, fontSize:13 }}>Book Emirates, Flydubai and Air Arabia — same instant WhatsApp booking.</div>
        </div>
        <a href="/flights" style={{ padding:"12px 26px", background:"linear-gradient(135deg,#c9953a,#d4561a)", borderRadius:11, color:"#fff", fontSize:13, fontWeight:700, textDecoration:"none", display:"flex", alignItems:"center", gap:7 }}>✈️ Book Flights →</a>
      </div>

      {/* WhatsApp FAB */}
      <a href={`https://wa.me/${WA}?text=${encodeURIComponent("Hi DubaiRovers! I need help booking an attraction ticket. 🎟️")}`}
        target="_blank" rel="noreferrer"
        style={{ position:"fixed", bottom:24, right:24, zIndex:9000, width:54, height:54, borderRadius:"50%", background:"#25d366", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, textDecoration:"none", animation:"waFloat 3s ease-in-out infinite, waPulse 2s infinite" }}>
        💬
      </a>
    </div>
  );
}
