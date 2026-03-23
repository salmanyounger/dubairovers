"use client";
import { useState, useEffect, useRef } from "react";
import FlightsAnimation from "../components/FlightsAnimation";

const FLT_SLIDES = [
  { label:"✈️ Dubai International Airport", sub:"World's busiest — planes arriving & departing 24/7" },
  { label:"🌆 Dubai From 35,000 Feet",       sub:"Palm Jumeirah · Burj Khalifa · SZR from above"      },
  { label:"💺 Emirates Business Class",       sub:"Flat beds · Champagne · 4,500 ICE channels"          },
  { label:"🌅 Sunrise Above the Clouds",      sub:"Golden hour at altitude — the most peaceful view"    },
  { label:"🛬 Night Landing at DXB",          sub:"Runway lights · City glow · Final approach"          },
];

const DEMO_FLIGHTS = [
  { id:"ek-dxb-lhr",  airline:"Emirates",   code:"EK 001", from:"Dubai (DXB)",    fromCode:"DXB", to:"London Heathrow (LHR)", toCode:"LHR", toCity:"London",    dep:"08:15", arr:"13:30", duration:"7h 15m",  stops:"Non-stop",    cls:"Economy",  price:2890, seats:6,  badge:"bestseller", tags:["🍽️ Meal Included","🎬 ICE Entertainment","📶 Wi-Fi Available"], desc:"Direct flight to Heathrow with full meal service and 4,500+ channels of entertainment." },
  { id:"ek-dxb-jfk",  airline:"Emirates",   code:"EK 201", from:"Dubai (DXB)",    fromCode:"DXB", to:"New York JFK (JFK)",    toCode:"JFK", toCity:"New York",   dep:"02:20", arr:"11:05", duration:"14h 45m", stops:"Non-stop",    cls:"Economy",  price:4250, seats:3,  badge:"limited",    tags:["🍽️ Meal Included","🛏️ Lay-flat Option","📶 Wi-Fi"],           desc:"Longest non-stop from DXB. Upgrade to Business for a lie-flat bed." },
  { id:"ek-dxb-sin",  airline:"Emirates",   code:"EK 353", from:"Dubai (DXB)",    fromCode:"DXB", to:"Singapore (SIN)",       toCode:"SIN", toCity:"Singapore",  dep:"22:00", arr:"09:05", duration:"7h 05m",  stops:"Non-stop",    cls:"Business", price:8900, seats:2,  badge:"limited",    tags:["🛏️ Flat Bed","🍾 Fine Dining","🚖 Chauffeur Drive"],          desc:"Award-winning Business Class. Fully flat bed, vintage wines, chauffeur pickup." },
  { id:"ek-dxb-cdg",  airline:"Emirates",   code:"EK 073", from:"Dubai (DXB)",    fromCode:"DXB", to:"Paris CDG (CDG)",       toCode:"CDG", toCity:"Paris",      dep:"14:30", arr:"19:00", duration:"7h 30m",  stops:"Non-stop",    cls:"Economy",  price:3100, seats:18, badge:"popular",    tags:["🍽️ Meal Included","🎬 ICE Entertainment","📶 Wi-Fi"],          desc:"Daily non-stop to Charles de Gaulle with full cabin service." },
  { id:"fz-dxb-bkk",  airline:"Flydubai",   code:"FZ 563", from:"Dubai (DXB)",    fromCode:"DXB", to:"Bangkok (BKK)",         toCode:"BKK", toCity:"Bangkok",    dep:"23:45", arr:"08:30", duration:"6h 45m",  stops:"Non-stop",    cls:"Economy",  price:1190, seats:14, badge:"popular",    tags:["⚡ Low Fare","💺 Extra Legroom Opt.","🎒 Cabin Bag"],          desc:"Best value fare to Bangkok. Upgrade to Business for extra comfort." },
  { id:"fz-dxb-ist",  airline:"Flydubai",   code:"FZ 901", from:"Dubai (DXB)",    fromCode:"DXB", to:"Istanbul (IST)",        toCode:"IST", toCity:"Istanbul",   dep:"06:50", arr:"10:15", duration:"4h 25m",  stops:"Non-stop",    cls:"Economy",  price:890,  seats:22, badge:null,         tags:["⚡ Low Fare","🎒 Cabin Bag Included","📱 Mobile Boarding"],    desc:"Morning flight to Istanbul, ideal for day connections onward to Europe." },
  { id:"fz-dxb-cai",  airline:"Flydubai",   code:"FZ 017", from:"Dubai (DXB)",    fromCode:"DXB", to:"Cairo (CAI)",           toCode:"CAI", toCity:"Cairo",      dep:"10:00", arr:"13:15", duration:"3h 15m",  stops:"Non-stop",    cls:"Economy",  price:650,  seats:30, badge:"popular",    tags:["⚡ Low Fare","🎒 Cabin Bag","📱 Mobile Boarding"],             desc:"Short hop to Cairo — great for pyramid lovers or GCC connecting passengers." },
  { id:"fz-dxb-mow",  airline:"Flydubai",   code:"FZ 921", from:"Dubai (DXB)",    fromCode:"DXB", to:"Moscow (VKO)",          toCode:"VKO", toCity:"Moscow",     dep:"08:40", arr:"13:20", duration:"4h 40m",  stops:"Non-stop",    cls:"Economy",  price:1450, seats:9,  badge:"popular",    tags:["⚡ Low Fare","🎒 Cabin Bag Included","📶 Wi-Fi"],              desc:"Only direct Dubai–Moscow route. Good connection for CIS destinations." },
  { id:"g9-shj-del",  airline:"Air Arabia", code:"G9 408", from:"Sharjah (SHJ)",  fromCode:"SHJ", to:"Delhi (DEL)",           toCode:"DEL", toCity:"Delhi",      dep:"10:30", arr:"15:45", duration:"3h 15m",  stops:"Non-stop",    cls:"Economy",  price:620,  seats:18, badge:"popular",    tags:["⚡ Budget Fare","🎒 Cabin Bag","📱 Mobile Boarding"],          desc:"Budget-friendly Sharjah–Delhi. 30 min from DXB via taxi." },
  { id:"g9-shj-khi",  airline:"Air Arabia", code:"G9 210", from:"Sharjah (SHJ)",  fromCode:"SHJ", to:"Karachi (KHI)",         toCode:"KHI", toCity:"Karachi",    dep:"14:20", arr:"16:35", duration:"2h 15m",  stops:"Non-stop",    cls:"Economy",  price:380,  seats:31, badge:null,         tags:["⚡ Budget Fare","📱 Mobile Boarding"],                         desc:"Most affordable UAE–Pakistan route. Daily departures." },
  { id:"g9-shj-cok",  airline:"Air Arabia", code:"G9 332", from:"Sharjah (SHJ)",  fromCode:"SHJ", to:"Kochi (COK)",           toCode:"COK", toCity:"Kochi",      dep:"17:30", arr:"21:45", duration:"3h 15m",  stops:"Non-stop",    cls:"Economy",  price:490,  seats:25, badge:"popular",    tags:["⚡ Budget Fare","🎒 Cabin Bag","📱 Mobile Boarding"],          desc:"Popular expat route to Kerala. Multiple weekly frequencies." },
  { id:"g9-shj-bey",  airline:"Air Arabia", code:"G9 102", from:"Sharjah (SHJ)",  fromCode:"SHJ", to:"Beirut (BEY)",          toCode:"BEY", toCity:"Beirut",     dep:"09:15", arr:"11:00", duration:"2h 45m",  stops:"Non-stop",    cls:"Economy",  price:550,  seats:14, badge:null,         tags:["⚡ Budget Fare","🎒 Cabin Bag Included"],                      desc:"Short hop to Beirut. Convenient morning schedule." },
];

const POPULAR_ROUTES = [
  { from:"DXB", to:"LHR", city:"London",    flag:"🇬🇧", price:"from AED 2,890" },
  { from:"DXB", to:"BKK", city:"Bangkok",   flag:"🇹🇭", price:"from AED 1,190" },
  { from:"DXB", to:"JFK", city:"New York",  flag:"🇺🇸", price:"from AED 4,250" },
  { from:"SHJ", to:"DEL", city:"Delhi",     flag:"🇮🇳", price:"from AED 620"   },
  { from:"DXB", to:"IST", city:"Istanbul",  flag:"🇹🇷", price:"from AED 890"   },
  { from:"DXB", to:"SIN", city:"Singapore", flag:"🇸🇬", price:"from AED 8,900" },
  { from:"SHJ", to:"KHI", city:"Karachi",   flag:"🇵🇰", price:"from AED 380"   },
  { from:"DXB", to:"CDG", city:"Paris",     flag:"🇫🇷", price:"from AED 3,100" },
];

const WA = "971544735060";
const ACOL = { Emirates:"#EF4444", Flydubai:"#F59E0B", "Air Arabia":"#10B981" };
const BADGE = { bestseller:{label:"🔥 Popular",bg:"rgba(213,86,26,.9)"}, popular:{label:"✨ Popular",bg:"rgba(5,150,105,.9)"}, limited:{label:"⚡ Last Seats",bg:"rgba(220,38,38,.9)"} };

export default function FlightsPage() {
  const [theme, setTheme]       = useState("dark");
  const [fromCity, setFromCity] = useState("Dubai (DXB)");
  const [toCity, setToCity]     = useState("");
  const [fdep, setFdep]         = useState("");
  const [fret, setFret]         = useState("");
  const [pax, setPax]           = useState("1 Adult");
  const [cls, setCls]           = useState("Economy");
  const [air, setAir]           = useState("All Airlines");
  const [trip, setTrip]         = useState("return");
  const [sort, setSort]         = useState("price");
  const [wishedF, setWishedF]   = useState({});
  const [searched, setSearched] = useState(false);
  const [rev, setRev]           = useState({});
  const [hidden, setHidden]     = useState(null);
  const [slide, setSlide]       = useState(0);
  const [fade, setFade]         = useState(true);
  const refs = useRef([]);

  useEffect(() => {
    setTheme(localStorage.getItem("dr_theme") || "dark");
    try {
      const pv = JSON.parse(localStorage.getItem("dr_page_visibility") || "{}");
      setHidden(pv.flights === false);
    } catch { setHidden(false); }
    const d = new Date(); d.setDate(d.getDate() + 1);
    setFdep(d.toISOString().split("T")[0]);
    const r = new Date(); r.setDate(r.getDate() + 8);
    setFret(r.toISOString().split("T")[0]);

    // Cinematic slideshow — 1.5s per scene
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setSlide(s => (s + 1) % FLT_SLIDES.length);
        setFade(true);
      }, 700);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setRev(p => ({ ...p, [e.target.dataset.id]: true })) }),
      { threshold: 0.04 }
    );
    refs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, [air, cls, toCity, searched]);

  const dark = theme === "dark";
  const BG   = dark ? "#06080f" : "#f0f4ff";
  const CARD = dark ? "#0d1220" : "#ffffff";
  const BD   = dark ? "rgba(255,255,255,.07)" : "rgba(0,0,0,.08)";
  const TXT  = dark ? "#e8edf8" : "#0f1a2e";
  const SUB  = dark ? "rgba(232,237,248,.45)" : "#4a6080";
  const HDR  = dark ? "#090c17" : "#dde6f5";
  const INP  = { width:"100%", padding:"10px 13px", borderRadius:10, background:dark?"#1a1a2e":"#ffffff", border:`1px solid ${BD}`, color:TXT, fontSize:13, outline:"none", fontFamily:"inherit", boxSizing:"border-box" };
  const OPT  = { backgroundColor:dark?"#1a1a2e":"#ffffff", color:TXT };

  const filteredFlights = DEMO_FLIGHTS
    .filter(f => {
      if (air !== "All Airlines" && f.airline !== air) return false;
      if (cls !== "All Classes" && f.cls !== cls) return false;
      if (toCity && !f.to.toLowerCase().includes(toCity.toLowerCase()) && !f.toCity.toLowerCase().includes(toCity.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => sort === "price" ? a.price - b.price : b.price - a.price);

  const bookFlight = f => {
    const msg = `Hi DubaiRovers! I want to book:\n✈️ ${f.airline} ${f.code}\n🛫 From: ${f.from}\n🛬 To: ${f.to}\n📅 Depart: ${fdep}${trip==="return"?`\n↩️ Return: ${fret}`:""}\n👥 Passengers: ${pax}\n💺 Class: ${cls}\n💰 AED ${f.price.toLocaleString()} per person\n\nPlease confirm availability and share payment details.`;
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  if (hidden === null) return null; // wait for client mount
  if (hidden) return (
    <div style={{ minHeight:"100vh", background:"#06080f", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'DM Sans',sans-serif", flexDirection:"column", gap:16, textAlign:"center", padding:24 }}>
      <div style={{ fontSize:56 }}>✈️</div>
      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:700, color:"#e8edf8" }}>Airline Tickets</div>
      <div style={{ color:"rgba(232,237,248,.5)", fontSize:15, maxWidth:380 }}>This page is temporarily unavailable. Please check back soon or contact us on WhatsApp.</div>
      <a href={`https://wa.me/971544735060?text=${encodeURIComponent("Hi DubaiRovers! I need help booking a flight. ✈️")}`} target="_blank" rel="noreferrer" style={{ padding:"13px 28px", background:"linear-gradient(135deg,#25D366,#128C7E)", borderRadius:12, color:"#fff", fontWeight:700, fontSize:14, textDecoration:"none", display:"flex", alignItems:"center", gap:8 }}>💬 Contact Us on WhatsApp</a>
      <a href="/" style={{ color:"rgba(232,237,248,.35)", fontSize:12, textDecoration:"none", marginTop:4 }}>← Back to Home</a>
    </div>
  );

  return (
    <div style={{ minHeight:"100vh", background:BG, fontFamily:"'DM Sans',sans-serif" }}>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,700&family=Bebas+Neue&display=swap');
        *{box-sizing:border-box}
        ::-webkit-scrollbar{height:4px;width:4px}::-webkit-scrollbar-thumb{background:rgba(99,130,230,.3);border-radius:2px}
        @keyframes waFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
        @keyframes waPulse{0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,.4)}70%{box-shadow:0 0 0 12px rgba(37,211,102,0)}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:.4}}
        .fl-c{transition:all .2s!important}
        .fl-c:hover{border-color:rgba(99,130,230,.4)!important;background:rgba(99,130,230,.04)!important;transform:translateX(4px)!important}
        .rt-c{transition:all .2s!important}
        .rt-c:hover{border-color:rgba(99,130,230,.4)!important;transform:translateY(-3px)!important;box-shadow:0 8px 24px rgba(0,0,0,.3)!important}
        .air-b:hover{border-color:rgba(99,130,230,.4)!important;color:#a0b4e8!important}
        input[type=date]{color-scheme:${dark?"dark":"light"}}
        select option{background:#0d1220}
      `}</style>

      <div style={{ height:68 }} />

      {/* ═══ CINEMATIC CANVAS ANIMATION HERO ═══ */}
      <div style={{ position:"relative", height:420, overflow:"hidden", background:"#06080f" }}>
        <div style={{ position:"absolute", inset:0 }}>
          <FlightsAnimation step={slide} />
        </div>

        {/* Label bottom-left */}
        <div style={{
          position:"absolute", bottom:28, left:24,
          opacity: fade ? 1 : 0, transition:"opacity 0.8s ease",
          background:"rgba(0,0,0,0.45)", backdropFilter:"blur(8px)",
          border:"1px solid rgba(99,153,232,0.2)", borderRadius:14, padding:"10px 18px",
          maxWidth:"55%",
        }}>
          <div style={{ fontSize:"clamp(16px,2.5vw,26px)", fontFamily:"'Playfair Display',serif", fontWeight:900, color:"#e8edf8", lineHeight:1.15 }}>
            {FLT_SLIDES[slide % FLT_SLIDES.length].label}
          </div>
          <div style={{ fontSize:12, color:"rgba(232,237,248,.65)", marginTop:4 }}>
            {FLT_SLIDES[slide % FLT_SLIDES.length].sub}
          </div>
        </div>

        {/* Slide dots */}
        <div style={{ position:"absolute", bottom:32, right:24, display:"flex", gap:6 }}>
          {FLT_SLIDES.map((_, i) => (
            <button key={i} onClick={() => { setSlide(i); setFade(true); }}
              style={{ width:slide===i?20:6, height:6, borderRadius:4, border:"none", cursor:"pointer", transition:"all 0.3s", background:slide===i?"#7b9ee8":"rgba(255,255,255,.4)" }} />
          ))}
        </div>

        {/* Breadcrumb */}
        <div style={{ position:"absolute", top:20, left:24, right:24, display:"flex", alignItems:"center", gap:8, fontSize:12 }}>
          <a href="/" style={{ color:"rgba(232,237,248,.6)", textDecoration:"none" }}>🏠 Home</a>
          <span style={{ color:"rgba(232,237,248,.3)" }}>›</span>
          <span style={{ color:"#7b9ee8", fontWeight:600 }}>✈️ Airline Tickets</span>
          <a href="/attractions" style={{ marginLeft:"auto", color:"#e8b86d", textDecoration:"none", fontWeight:600, fontSize:11, padding:"5px 14px", border:"1px solid rgba(201,149,58,.4)", borderRadius:20, backdropFilter:"blur(8px)", background:"rgba(0,0,0,.3)", display:"flex", alignItems:"center", gap:5 }}>🎟️ Attractions →</a>
        </div>

        {/* Centered title */}
        <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"0 24px", pointerEvents:"none" }}>
          <div style={{ fontSize:11, letterSpacing:"0.18em", textTransform:"uppercase", color:"#7b9ee8", fontWeight:700, marginBottom:8, background:"rgba(0,0,0,0.35)", padding:"4px 14px", borderRadius:20 }}>✈️ Fly From Dubai</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:"clamp(28px,4.5vw,58px)", fontWeight:900, color:"#e8edf8", lineHeight:1.05, textShadow:"0 4px 20px rgba(0,0,0,.6)", background:"rgba(0,0,0,0.25)", padding:"8px 20px", borderRadius:12 }}>
            Airline <em style={{ color:"#7b9ee8" }}>Tickets</em>
          </h1>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background:dark?"rgba(255,255,255,.03)":"rgba(0,0,0,.03)", borderBottom:`1px solid ${BD}`, padding:"12px 44px", display:"flex", gap:24, flexWrap:"wrap" }}>
        {[["✈️","3 Airlines, 12 Routes"],["⚡","Instant Confirmation"],["💺","Economy to First Class"],["💬","WhatsApp Booking"]].map(([ic,lb]) => (
          <div key={lb} style={{ display:"flex", alignItems:"center", gap:7, fontSize:12, color:SUB, fontWeight:500 }}>
            <span style={{ fontSize:14 }}>{ic}</span><span>{lb}</span>
          </div>
        ))}
      </div>

      {/* STICKY SEARCH */}
      <div style={{ position:"sticky", top:0, zIndex:80, background:HDR, borderBottom:`1px solid ${BD}`, padding:"13px 44px" }}>
        <div style={{ display:"flex", gap:6, marginBottom:12 }}>
          {[["return","↩️ Return"],["oneway","→ One Way"]].map(([id,lb]) => (
            <button key={id} onClick={() => setTrip(id)}
              style={{ padding:"6px 16px", borderRadius:20, background:trip===id?"linear-gradient(135deg,#3b5bb5,#4a6fd4)":"transparent", border:`1px solid ${trip===id?"#4a6fd4":BD}`, color:trip===id?"#fff":SUB, fontSize:12, fontWeight:600, cursor:"pointer", transition:"all .2s" }}>
              {lb}
            </button>
          ))}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:`1fr 1fr 1fr ${trip==="return"?"1fr":""} 1fr auto`, gap:10, alignItems:"flex-end" }}>
          {[
            { label:"🛫 From", val:fromCity, set:setFromCity, ph:"Dubai (DXB)" },
            { label:"🛬 To",   val:toCity,   set:setToCity,   ph:"London, Bangkok, Delhi..." },
            { label:"📅 Depart", val:fdep, set:setFdep, type:"date" },
            ...(trip==="return" ? [{ label:"📅 Return", val:fret, set:setFret, type:"date" }] : []),
            { label:"👥 Passengers", val:pax, set:setPax, opts:["1 Adult","2 Adults","2 Adults + 1 Child","Family (4)","Group (6+)"] },
          ].map((f,i) => (
            <div key={i}>
              <label style={{ fontSize:10, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:SUB, display:"block", marginBottom:5 }}>{f.label}</label>
              {f.opts ? (
                <select style={INP} value={f.val} onChange={e => f.set(e.target.value)}>
                  {f.opts.map(o => <option key={o} style={OPT}>{o}</option>)}
                </select>
              ) : (
                <input style={INP} type={f.type||"text"} value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.ph} />
              )}
            </div>
          ))}
          <button onClick={() => setSearched(true)}
            style={{ padding:"11px 22px", borderRadius:11, background:"linear-gradient(135deg,#3b5bb5,#4a6fd4)", color:"#fff", fontSize:13, fontWeight:700, border:"none", cursor:"pointer" }}>
            ✈️ Search
          </button>
        </div>

        {/* Filter row */}
        <div style={{ display:"flex", gap:14, marginTop:11, flexWrap:"wrap", alignItems:"center" }}>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ fontSize:11, color:SUB, whiteSpace:"nowrap" }}>Airline:</span>
            {["All Airlines","Emirates","Flydubai","Air Arabia"].map(a => (
              <button key={a} className="air-b" onClick={() => setAir(a)}
                style={{ padding:"4px 12px", borderRadius:20, background:air===a?`${ACOL[a]||"#4a6fd4"}22`:"transparent", border:`1px solid ${air===a?ACOL[a]||"#4a6fd4":BD}`, color:air===a?ACOL[a]||"#7b9ee8":SUB, fontSize:11, fontWeight:600, cursor:"pointer", transition:"all .15s", whiteSpace:"nowrap" }}>
                {a}
              </button>
            ))}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ fontSize:11, color:SUB, whiteSpace:"nowrap" }}>Class:</span>
            {["All Classes","Economy","Business","First Class"].map(c => (
              <button key={c} className="air-b" onClick={() => setCls(c)}
                style={{ padding:"4px 12px", borderRadius:20, background:cls===c?"rgba(74,111,212,.15)":"transparent", border:`1px solid ${cls===c?"#4a6fd4":BD}`, color:cls===c?"#7b9ee8":SUB, fontSize:11, fontWeight:600, cursor:"pointer", transition:"all .15s", whiteSpace:"nowrap" }}>
                {c}
              </button>
            ))}
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginLeft:"auto" }}>
            <span style={{ fontSize:11, color:SUB }}>Sort:</span>
            <button onClick={() => setSort("price")}
              style={{ padding:"4px 12px", borderRadius:20, background:sort==="price"?"rgba(74,111,212,.15)":"transparent", border:`1px solid ${sort==="price"?"#4a6fd4":BD}`, color:sort==="price"?"#7b9ee8":SUB, fontSize:11, fontWeight:600, cursor:"pointer" }}>
              Price ↑
            </button>
            <button onClick={() => setSort("price_desc")}
              style={{ padding:"4px 12px", borderRadius:20, background:sort==="price_desc"?"rgba(74,111,212,.15)":"transparent", border:`1px solid ${sort==="price_desc"?"#4a6fd4":BD}`, color:sort==="price_desc"?"#7b9ee8":SUB, fontSize:11, fontWeight:600, cursor:"pointer" }}>
              Price ↓
            </button>
          </div>
        </div>
      </div>

      {/* POPULAR ROUTES */}
      <div style={{ padding:"22px 44px", borderBottom:`1px solid ${BD}` }}>
        <div style={{ color:SUB, fontSize:11, textTransform:"uppercase", letterSpacing:".1em", fontWeight:700, marginBottom:12 }}>🔥 Popular Routes from Dubai & Sharjah</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(148px,1fr))", gap:10 }}>
          {POPULAR_ROUTES.map(r => (
            <div key={r.to} className="rt-c" onClick={() => { setToCity(r.city); setSearched(true); }}
              style={{ padding:"13px 15px", background:CARD, border:`1px solid ${BD}`, borderRadius:14, cursor:"pointer" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <span style={{ fontSize:26 }}>{r.flag}</span>
                <span style={{ fontSize:9, color:SUB, fontFamily:"monospace" }}>{r.from}→{r.to}</span>
              </div>
              <div style={{ fontWeight:700, fontSize:13, color:TXT, marginTop:6 }}>{r.city}</div>
              <div style={{ fontSize:12, color:"#7b9ee8", marginTop:2, fontWeight:600 }}>{r.price}</div>
            </div>
          ))}
        </div>
      </div>

      {/* DEMO NOTICE */}
      <div style={{ margin:"16px 44px 0", padding:"10px 16px", background:"rgba(234,179,8,.06)", border:"1px solid rgba(234,179,8,.2)", borderRadius:10, display:"flex", alignItems:"center", gap:10, fontSize:12 }}>
        <span style={{ padding:"2px 9px", borderRadius:20, background:"rgba(234,179,8,.2)", color:"#eab308", fontSize:10, fontWeight:700, whiteSpace:"nowrap" }}>⚠ DEMO</span>
        <span style={{ color:SUB }}>Demo prices shown for illustration. WhatsApp booking connects you to our team for confirmed fares. Live GDS (Amadeus / Kiwi.io) available — configure in Admin → API Keys.</span>
      </div>

      {/* RESULTS */}
      <div style={{ padding:"14px 44px 4px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ color:SUB, fontSize:13 }}><strong style={{color:TXT}}>{filteredFlights.length}</strong> flights available{toCity?` · To: ${toCity}`:""}</span>
        <a href="/attractions" style={{ fontSize:12, color:"#e8b86d", textDecoration:"none", fontWeight:600 }}>🎟️ Also book attractions →</a>
      </div>

      {/* FLIGHT CARDS */}
      <div style={{ padding:"12px 44px 60px", display:"flex", flexDirection:"column", gap:12 }}>
        {filteredFlights.length === 0 && (
          <div style={{ textAlign:"center", padding:"60px 20px" }}>
            <div style={{ fontSize:44, marginBottom:12 }}>✈️</div>
            <div style={{ color:SUB, fontSize:15 }}>No flights match your filters.</div>
            <button onClick={() => { setToCity(""); setAir("All Airlines"); setCls("All Classes"); }} style={{ marginTop:14, padding:"9px 22px", background:"linear-gradient(135deg,#3b5bb5,#4a6fd4)", border:"none", borderRadius:9, color:"#fff", fontWeight:700, fontSize:13, cursor:"pointer" }}>Clear Filters</button>
          </div>
        )}
        {filteredFlights.map((f, i) => {
          const fb   = f.badge && BADGE[f.badge];
          const acol = ACOL[f.airline] || "#4a6fd4";
          return (
            <div key={f.id} className="fl-c"
              ref={el => { refs.current[i] = el; if (el) el.dataset.id = f.id; }}
              style={{ background:CARD, border:`1px solid ${BD}`, borderRadius:18, padding:"20px 24px", display:"grid", gridTemplateColumns:"160px 1fr auto", gap:24, alignItems:"center", position:"relative", overflow:"hidden",
                opacity:rev[f.id]?1:0, transform:rev[f.id]?"translateX(0)":"translateX(-20px)", transition:`opacity .45s ${(i%6)*.06}s, transform .45s ${(i%6)*.06}s` }}>

              {/* Airline colour bar */}
              <div style={{ position:"absolute", left:0, top:0, bottom:0, width:5, background:`linear-gradient(180deg,${acol},${acol}88)` }} />

              {/* Airline column */}
              <div style={{ paddingLeft:12 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5 }}>
                  <div style={{ width:34, height:34, borderRadius:8, background:`${acol}22`, border:`1px solid ${acol}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>
                    {f.airline==="Emirates"?"🇦🇪":f.airline==="Flydubai"?"🛫":"🛬"}
                  </div>
                  <div>
                    <div style={{ fontWeight:800, fontSize:14, color:TXT }}>{f.airline}</div>
                    <div style={{ fontSize:10, color:SUB, fontFamily:"monospace" }}>{f.code}</div>
                  </div>
                </div>
                <div style={{ fontSize:11, color:SUB, marginBottom:5 }}>{f.stops} · {f.cls}</div>
                {f.cls !== "Economy" && (
                  <span style={{ fontSize:9, background:`${acol}22`, border:`1px solid ${acol}44`, borderRadius:8, color:acol, padding:"2px 7px", fontWeight:700, display:"inline-block", marginBottom:5 }}>{f.cls}</span>
                )}
                {fb && <div style={{ display:"inline-block", padding:"2px 9px", borderRadius:20, background:fb.bg, color:"#fff", fontSize:9, fontWeight:700 }}>{fb.label}</div>}
              </div>

              {/* Route column */}
              <div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 80px 1fr", gap:10, alignItems:"center", marginBottom:12 }}>
                  <div>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:36, color:TXT, lineHeight:1 }}>{f.dep}</div>
                    <div style={{ fontSize:11, color:SUB, marginTop:2 }}>{f.from}</div>
                  </div>
                  <div style={{ textAlign:"center" }}>
                    <div style={{ fontSize:10, color:SUB, marginBottom:4 }}>{f.duration}</div>
                    <div style={{ position:"relative", height:2, background:`linear-gradient(90deg,${acol}33,${acol},${acol}33)`, borderRadius:2 }}>
                      <span style={{ position:"absolute", top:-8, left:"50%", transform:"translateX(-50%)", fontSize:14 }}>✈</span>
                    </div>
                    <div style={{ fontSize:9, color:SUB, marginTop:4 }}>{f.stops}</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:36, color:TXT, lineHeight:1 }}>{f.arr}</div>
                    <div style={{ fontSize:11, color:SUB, marginTop:2 }}>{f.to}</div>
                  </div>
                </div>
                <div style={{ fontSize:11, color:SUB, marginBottom:9, lineHeight:1.5 }}>{f.desc}</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                  {f.tags.map(t => <span key={t} style={{ padding:"2px 9px", borderRadius:20, background:dark?"rgba(255,255,255,.05)":"rgba(0,0,0,.05)", border:`1px solid ${BD}`, fontSize:10, color:SUB }}>{t}</span>)}
                </div>
              </div>

              {/* Price + Book column */}
              <div style={{ textAlign:"right", minWidth:160 }}>
                <div style={{ fontSize:10, color:SUB, marginBottom:2 }}>per person from</div>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:42, color:"#7b9ee8", lineHeight:1 }}>{f.price.toLocaleString()}</div>
                <div style={{ fontSize:11, color:SUB, marginBottom:12 }}>AED</div>
                {f.seats && f.seats <= 6 && (
                  <div style={{ fontSize:11, color:"#f59e0b", fontWeight:700, marginBottom:9, animation:"blink 2s infinite" }}>⚠ Only {f.seats} seats left</div>
                )}
                <button onClick={() => setWishedF(p => ({ ...p, [f.id]:!p[f.id] }))}
                  style={{ background:"none", border:"none", fontSize:18, cursor:"pointer", marginBottom:9, display:"block", marginLeft:"auto" }}>
                  {wishedF[f.id] ? "❤️" : "🤍"}
                </button>
                <button onClick={() => bookFlight(f)}
                  style={{ padding:"11px 20px", background:"linear-gradient(135deg,#25D366,#128C7E)", border:"none", borderRadius:11, color:"#fff", fontSize:12, fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:6, marginLeft:"auto", whiteSpace:"nowrap" }}>
                  💬 Book on WhatsApp
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* TRUST BAR */}
      <div style={{ margin:"0 44px 24px", padding:"16px 22px", background:CARD, border:`1px solid ${BD}`, borderRadius:14, display:"flex", justifyContent:"center", gap:28, flexWrap:"wrap" }}>
        {["🔒 Secure Booking","✅ Instant Confirmation","🔄 Free Cancellation Options","📞 24/7 WhatsApp Support","💳 Flexible Payment"].map(t => (
          <span key={t} style={{ fontSize:12, color:SUB }}>{t}</span>
        ))}
      </div>

      {/* CROSS-LINK BANNER */}
      <div style={{ margin:"0 44px 60px", padding:"22px 28px", background:dark?"linear-gradient(135deg,rgba(6,8,15,.95),rgba(13,18,32,.98))":"#fff", border:"1px solid rgba(74,111,212,.25)", borderRadius:18, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
        <div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:TXT, marginBottom:5 }}>🎟️ Also need attraction tickets?</div>
          <div style={{ color:SUB, fontSize:13 }}>Burj Khalifa, Aquaventure, IMG Worlds and more — same instant WhatsApp booking.</div>
        </div>
        <a href="/attractions" style={{ padding:"12px 26px", background:"linear-gradient(135deg,#c9953a,#d4561a)", borderRadius:11, color:"#fff", fontSize:13, fontWeight:700, textDecoration:"none", display:"flex", alignItems:"center", gap:7 }}>🎟️ Book Attractions →</a>
      </div>

      {/* WhatsApp FAB */}
      <a href={`https://wa.me/${WA}?text=${encodeURIComponent("Hi DubaiRovers! I need help booking a flight. ✈️")}`}
        target="_blank" rel="noreferrer"
        style={{ position:"fixed", bottom:24, right:24, zIndex:9000, width:54, height:54, borderRadius:"50%", background:"#25d366", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, textDecoration:"none", animation:"waFloat 3s ease-in-out infinite, waPulse 2s infinite" }}>
        💬
      </a>
    </div>
  );
}
