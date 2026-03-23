"use client";
import { useState, useEffect, useRef } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  {icon:"🌴",color:"#10B981",bg:"rgba(16,185,129,.1)",title:"Tourism & Tours",desc:"Full booking platforms with payment, itineraries, multi-language, WhatsApp integration and admin panel.",features:["Online booking system","Tour packages & itineraries","Multi-language (AR/EN/UR)","Payment gateway","WhatsApp chat","Admin panel"],price:"From AED 2,999"},
  {icon:"🍽️",color:"#F97316",bg:"rgba(249,115,22,.1)",title:"Restaurant & Café",desc:"Menu display, online ordering, delivery tracking, table reservation, Arabic menus and loyalty features.",features:["Digital menu (AR+EN)","Online ordering system","Table reservation","Delivery tracking page","WhatsApp order button","Photo gallery"],price:"From AED 2,499"},
  {icon:"🏢",color:"#3B82F6",bg:"rgba(59,130,246,.1)",title:"Real Estate & Property",desc:"Property listings with ROI calculator, mortgage tool, Golden Visa checker, map view and lead capture.",features:["Property listing grid","ROI & Mortgage calculator","Golden Visa checker","Interactive map","Lead capture forms","Agent profiles"],price:"From AED 3,999"},
  {icon:"🔧",color:"#8B5CF6",bg:"rgba(139,92,246,.1)",title:"Auto Garage & Workshop",desc:"Services showcase, WhatsApp booking, price lists, before/after gallery and Arabic/English support.",features:["Services & pricing page","WhatsApp booking button","Before/after gallery","Customer testimonials","Hidden admin panel","Arabic support"],price:"From AED 2,499"},
  {icon:"🛒",color:"#E8B84B",bg:"rgba(232,184,75,.1)",title:"E-Commerce Store",desc:"Full online store with product management, cart, checkout, payment gateway and order management.",features:["Product catalogue","Shopping cart","Stripe/PayPal payment","Order management","Inventory system","Customer accounts"],price:"From AED 4,999"},
  {icon:"🏨",color:"#06B6D4",bg:"rgba(6,182,212,.1)",title:"Hotel & Accommodation",desc:"Room listings, availability calendar, online booking, amenities showcase and guest reviews.",features:["Room types & pricing","Availability calendar","Online booking form","Photo gallery","Guest reviews","Multi-language"],price:"From AED 3,499"},
  {icon:"💪",color:"#EF4444",bg:"rgba(239,68,68,.1)",title:"Gym & Fitness",desc:"Class schedules, trainer profiles, membership plans, online booking and transformation gallery.",features:["Class timetable","Trainer bios","Membership packages","Online enrollment","Transformation gallery","WhatsApp reminders"],price:"From AED 2,499"},
  {icon:"🏥",color:"#EC4899",bg:"rgba(236,72,153,.1)",title:"Medical & Clinic",desc:"Doctor profiles, appointment booking, services list, patient portal and multi-language support.",features:["Doctor profiles","Online appointments","Services & fees","Patient portal","Insurance info","Arabic support"],price:"From AED 3,499"},
  {icon:"📚",color:"#F59E0B",bg:"rgba(245,158,11,.1)",title:"School & Education",desc:"Course catalog, online enrollment, student portal, timetable, events calendar and parent area.",features:["Course catalogue","Online enrollment","Student portal","Events calendar","Parent notifications","Arabic + English"],price:"From AED 3,999"},
  {icon:"⚖️",color:"#6366F1",bg:"rgba(99,102,241,.1)",title:"Legal & Professional",desc:"Services overview, team profiles, case results, appointment booking and client portal.",features:["Services overview","Attorney profiles","Case results","Appointment booking","Client portal","Multi-language"],price:"From AED 2,999"},
  {icon:"✈️",color:"#14B8A6",bg:"rgba(20,184,166,.1)",title:"Travel Agency",desc:"Tour packages, visa services, flight search, hotel booking and multi-currency pricing.",features:["Tour packages","Visa services info","Hotel showcase","Multi-currency","Group booking","WhatsApp inquiry"],price:"From AED 3,499"},
  {icon:"🎨",color:"#A855F7",bg:"rgba(168,85,247,.1)",title:"Portfolio & Creative",desc:"Showcase your work with animated galleries, case studies, contact forms and blog.",features:["Animated portfolio","Case studies","Services page","Contact form","Blog section","Social media links"],price:"From AED 1,999"},
];

const PROCESS = [
  {num:"01",icon:"💬",title:"Free Consultation",desc:"We discuss your project on WhatsApp. You tell us what you need — we ask the right questions."},
  {num:"02",icon:"📋",title:"Proposal & Quote",desc:"Within 24 hours we send a detailed proposal with timeline, features and fixed price. No surprises."},
  {num:"03",icon:"🎨",title:"Design & Build",desc:"We design and develop your website. You see live previews. We update based on your feedback."},
  {num:"04",icon:"🚀",title:"Launch & Support",desc:"We launch your website, submit to Google and provide 30 days free support after handover."},
];

const PRICING = [
  {name:"Starter",monthly:799,annual:599,delivery:"10–14 days",popular:false,
   features:["Up to 5 pages","Mobile responsive","Contact form","WhatsApp button","Google Maps embed","Basic SEO","Free domain 1yr"]},
  {name:"Professional",monthly:1499,annual:1199,delivery:"7–10 days",popular:true,
   features:["Up to 12 pages","Everything in Starter","Arabic + English","Admin panel","Blog system","Booking form","WhatsApp integration","Google Analytics"]},
  {name:"Business",monthly:2999,annual:2399,delivery:"5–8 days",popular:false,
   features:["Unlimited pages","Everything in Professional","3 Languages (AR/EN/UR)","Advanced admin panel","Payment gateway","Custom booking system","Priority support","1yr hosting included"]},
  {name:"Enterprise",monthly:5999,annual:4799,delivery:"Custom",popular:false,
   features:["Full custom platform","E-commerce / Bookings","Multi-vendor support","Custom AI features","Custom integrations","White-label option","Dedicated support","Ongoing maintenance"]},
];

const TESTIMONIALS = [
  {stars:5,text:"Salman delivered our Dubai restaurant website in just 9 days. Arabic menu, delivery tracking and admin panel are exactly what we needed. Orders increased 40% in the first month.",name:"Mohammed Al Rashid",title:"Restaurant Owner",flag:"🇦🇪"},
  {stars:5,text:"DubaiRovers.com is brilliant! Booking system, 24 tours, multilingual blog — everything works perfectly. Tour bookings doubled within 6 weeks.",name:"Ravi Kumar",title:"Tourism Director",flag:"🇮🇳"},
  {stars:5,text:"Our auto garage website with the hidden admin panel and WhatsApp booking is exactly what we asked for. Delivered in 10 days.",name:"Siyyad Khan",title:"Garage Owner, Dubai",flag:"🇦🇪"},
  {stars:5,text:"The property comparison platform with ROI calculator and AI match is incredible. Our leads increased 5x after launch.",name:"Sarah Johnson",title:"Property Consultant",flag:"🇬🇧"},
  {stars:5,text:"Finally a developer who understands Arabic RTL properly. Our Urdu-speaking clients love the multilingual toggle.",name:"Asif Mahmood",title:"Business Owner",flag:"🇵🇰"},
  {stars:5,text:"The e-commerce store with Stripe integration was delivered on time and within budget. Professional communication throughout.",name:"Ahmed Al Zaabi",title:"Store Owner",flag:"🇦🇪"},
];

const FAQS = [
  {q:"How long does a website take?",a:"Standard projects take 7–14 days. Business platforms take 5–8 days with priority. Emergency projects can be done in 3–5 days. We always agree a timeline before starting."},
  {q:"What languages do you support?",a:"We build websites in English, Arabic (full RTL layout), Urdu, and Hindi. All sites can have a language toggle so visitors can switch between languages."},
  {q:"Is admin panel included?",a:"Yes! Every project from Professional tier includes a custom admin panel. You can update content, prices, menus, listings and bookings without touching any code."},
  {q:"Do you provide hosting?",a:"Yes. Business and Enterprise plans include 1 year of hosting. For other plans we set up Vercel (free tier) or help you choose affordable hosting."},
  {q:"Can I update the website myself?",a:"Yes. Every website includes an admin panel so you can update content yourself. We also provide a 30-minute Zoom training session after launch."},
  {q:"What payment do you accept?",a:"Bank transfer, Western Union, Cash (Dubai), or crypto. 50% upfront, 50% on delivery. No hidden fees."},
  {q:"Do you do revisions?",a:"Yes — 3 revisions included in all plans. We work until you are 100% satisfied. Major scope changes may be quoted separately."},
  {q:"What if I need changes after launch?",a:"30 days free support is included after launch. After that we offer affordable monthly maintenance packages starting from AED 299/month."},
];

const TECHS = ["⚛️ React","▲ Next.js","🎨 Tailwind CSS","🐘 PostgreSQL","🟢 Node.js","🔶 Supabase","💳 Stripe","🤖 OpenAI API","📊 Chart.js","🗺️ Google Maps","💬 WhatsApp API","📧 EmailJS","🖼️ Framer Motion","🔍 SEO Schema","📱 PWA Ready","☁️ Vercel","🔐 NextAuth","📦 TypeScript"];

const COMPARE_ROWS = [
  {feature:"Price Range",us:"AED 799–5,999",freelancer:"AED 1,000–8,000",agency:"AED 5,000–50,000"},
  {feature:"Delivery Time",us:"7–14 days",freelancer:"4–12 weeks",agency:"8–24 weeks"},
  {feature:"Arabic Support",us:"✅ All plans",freelancer:"Sometimes",agency:"Extra cost"},
  {feature:"Admin Panel",us:"✅ Included",freelancer:"Rare",agency:"Extra cost"},
  {feature:"WhatsApp Integration",us:"✅ All plans",freelancer:"Extra cost",agency:"Extra cost"},
  {feature:"SEO Optimized",us:"✅ Always",freelancer:"Varies",agency:"Monthly retainer"},
  {feature:"Post-launch Support",us:"✅ 30 days free",freelancer:"Rare",agency:"Expensive"},
  {feature:"Communication",us:"Direct WhatsApp",freelancer:"Varies",agency:"Account manager"},
];

// ─── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function HirePage() {
  const [annual, setAnnual]     = useState(false);
  const [openFaq, setOpenFaq]   = useState(null);
  const [form, setForm]         = useState({ name:"", phone:"", service:"", message:"" });
  const [sent, setSent]         = useState(false);
  const [mounted, setMounted]   = useState(false);

  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div style={{ minHeight:"100vh", background:"#050810" }}/>;

  const T = {
    bg:"#050810", bg2:"#0a1120", card:"rgba(232,184,75,0.04)",
    border:"rgba(232,184,75,0.12)", text:"#F0EDE8",
    sub:"#A8B0C4", gold:"#E8B84B", goldDim:"rgba(232,184,75,0.15)",
    green:"#10B981", blue:"#3B82F6"
  };
  const B = (extra={}) => ({ background:T.card, border:`1px solid ${T.border}`, borderRadius:16, ...extra });
  const INP = { width:"100%", padding:"11px 14px", background:"rgba(255,255,255,0.05)", border:`1px solid rgba(255,255,255,0.1)`, borderRadius:10, color:T.text, fontSize:13, fontFamily:"Inter,sans-serif", outline:"none" };

  const sendForm = () => {
    if (!form.name || !form.phone) return;
    const msg = `🌐 *New Website Project Enquiry*\n\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Service:* ${form.service||"Not specified"}\n*Message:* ${form.message||"No message"}`;
    window.open(`https://wa.me/971544735060?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
  };

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Syne:wght@700;800&display=swap"/>
      <div suppressHydrationWarning style={{ background:T.bg, color:T.text, fontFamily:"'Inter',sans-serif", minHeight:"100vh" }}>
        <style suppressHydrationWarning>{`
          *{box-sizing:border-box}
          ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:rgba(232,184,75,0.3);border-radius:10px}
          @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
          @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
          @keyframes pulse{0%,100%{opacity:0.5;transform:scale(1)}50%{opacity:1;transform:scale(1.4)}}
          @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
          @keyframes shimmer{to{background-position:-200% center}}
          .hov-gold:hover{color:${T.gold}!important;border-color:rgba(232,184,75,0.4)!important}
          .srv-card:hover{transform:translateY(-6px)!important;border-color:rgba(232,184,75,0.35)!important;box-shadow:0 20px 48px rgba(0,0,0,0.4)!important}
          .srv-card{transition:all 0.25s ease}
          .cta-shimmer{background:linear-gradient(90deg,${T.gold} 0%,#fff 50%,${T.gold} 100%);background-size:200% auto;animation:shimmer 2.5s linear infinite;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
          select option{background:#0a1120}
          input:focus,textarea:focus,select:focus{border-color:rgba(232,184,75,0.5)!important;outline:none!important}
        `}</style>

        {/* ── URGENCY STRIP ── */}
        <div style={{ background:"linear-gradient(90deg,#7F1D1D,#991B1B,#7F1D1D)", padding:"9px 24px", textAlign:"center", fontSize:12, fontWeight:600, letterSpacing:0.5 }}>
          🔥 <strong>Only 3 slots left</strong> for March 2026 — Delivering in 7–14 days ·{" "}
          <a href="https://wa.me/971544735060" style={{ color:"#FCA5A5", textDecoration:"none", fontWeight:700 }}>Book now →</a>
        </div>

        {/* ── NAV ── */}
        <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(5,8,16,0.97)", backdropFilter:"blur(20px)", borderBottom:`1px solid ${T.border}`, padding:"0 24px" }}>
          <div style={{ maxWidth:1200, margin:"0 auto", height:60, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:34, height:34, borderRadius:8, background:"linear-gradient(135deg,#E8B84B,#9A7830)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>💻</div>
              <div>
                <div style={{ fontSize:15, fontWeight:800, color:T.gold, fontFamily:"'Syne',sans-serif" }}>SalmanDev</div>
                <div style={{ fontSize:9, color:T.sub, letterSpacing:"0.1em", textTransform:"uppercase" }}>Web Dev · Dubai</div>
              </div>
            </div>
            <div style={{ display:"flex", gap:20, alignItems:"center" }}>
              {["Services","Portfolio","Pricing","FAQ"].map(s => (
                <a key={s} href={`#${s.toLowerCase()}`} className="hov-gold" style={{ fontSize:13, color:T.sub, textDecoration:"none", transition:"color 0.2s" }}>{s}</a>
              ))}
            </div>
            <a href="https://wa.me/971544735060" style={{ padding:"9px 20px", background:`linear-gradient(135deg,${T.gold},#9A7830)`, borderRadius:20, color:"#000", fontSize:13, fontWeight:700, textDecoration:"none" }}>
              💬 Get Free Quote
            </a>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section style={{ textAlign:"center", padding:"72px 24px 60px", maxWidth:900, margin:"0 auto" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(232,184,75,0.1)", border:`1px solid ${T.border}`, borderRadius:30, padding:"6px 16px", marginBottom:24, fontSize:11, fontWeight:600, letterSpacing:1.5, color:T.gold, textTransform:"uppercase" }}>
            <span style={{ width:6, height:6, borderRadius:"50%", background:T.gold, animation:"pulse 2s infinite" }}/>
            Dubai-Based · AED 799 Start · Delivery 7 Days
          </div>

          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(32px,6vw,62px)", fontWeight:800, lineHeight:1.08, letterSpacing:-1, marginBottom:20, color:"#fff" }}>
            Professional Websites<br/>
            <span style={{ background:`linear-gradient(135deg,${T.gold},#fff,${T.gold})`, backgroundSize:"200% auto", backgroundClip:"text", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", animation:"shimmer 3s linear infinite" }}>
              for Dubai Businesses
            </span>
          </h1>

          <p style={{ fontSize:16, color:T.sub, lineHeight:1.8, maxWidth:580, margin:"0 auto 36px" }}>
            Tourism, restaurants, real estate, garages, e-commerce — built with Next.js, Arabic/English, admin panel included. Fixed price, fast delivery.
          </p>

          {/* Stats */}
          <div style={{ display:"flex", gap:0, justifyContent:"center", marginBottom:36, background:"rgba(255,255,255,0.03)", border:`1px solid ${T.border}`, borderRadius:14, overflow:"hidden", maxWidth:600, margin:"0 auto 36px" }}>
            {[["50+","Websites"],["45+","Clients"],["7","Avg Days"],["4.9★","Rating"]].map(([n,l],i) => (
              <div key={l} style={{ flex:1, padding:"16px 8px", textAlign:"center", borderRight:i<3?`1px solid ${T.border}`:"none" }}>
                <div style={{ fontSize:20, fontWeight:900, color:T.gold, fontFamily:"'Syne',sans-serif" }}>{n}</div>
                <div style={{ fontSize:10, color:T.sub, textTransform:"uppercase", letterSpacing:"0.08em", marginTop:3 }}>{l}</div>
              </div>
            ))}
          </div>

          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <a href="#order" style={{ padding:"14px 32px", background:`linear-gradient(135deg,${T.gold},#9A7830)`, borderRadius:28, color:"#000", fontSize:14, fontWeight:800, textDecoration:"none", display:"flex", alignItems:"center", gap:8 }}>
              🚀 Start My Project
            </a>
            <a href="https://wa.me/971544735060" style={{ padding:"14px 28px", background:"rgba(37,211,102,0.12)", border:"1px solid rgba(37,211,102,0.3)", borderRadius:28, color:"#4ADE80", fontSize:14, fontWeight:600, textDecoration:"none" }}>
              💬 Free Consultation
            </a>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" style={{ maxWidth:1200, margin:"0 auto 80px", padding:"0 24px" }}>
          <div style={{ textAlign:"center", marginBottom:40 }}>
            <div style={{ fontSize:10, color:T.gold, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:10 }}>What We Build</div>
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(24px,4vw,40px)", fontWeight:800, color:"#fff" }}>12 Business Categories</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:16 }}>
            {SERVICES.map((s,i) => (
              <div key={i} className="srv-card"
                style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:14, padding:"22px 20px" }}>
                <div style={{ fontSize:32, marginBottom:12 }}>{s.icon}</div>
                <div style={{ fontSize:15, fontWeight:700, color:"#fff", marginBottom:6 }}>{s.title}</div>
                <div style={{ fontSize:12, color:T.sub, lineHeight:1.65, marginBottom:14 }}>{s.desc}</div>
                <div style={{ display:"flex", flexDirection:"column", gap:5, marginBottom:14 }}>
                  {s.features.map((f,j) => (
                    <div key={j} style={{ display:"flex", alignItems:"center", gap:7, fontSize:11, color:T.sub }}>
                      <span style={{ color:T.green, fontSize:10 }}>✓</span> {f}
                    </div>
                  ))}
                </div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div style={{ fontSize:13, fontWeight:700, color:T.gold }}>{s.price}</div>
                  <a href="https://wa.me/971544735060" style={{ padding:"6px 14px", background:T.goldDim, border:`1px solid ${T.border}`, borderRadius:20, color:T.gold, fontSize:11, fontWeight:700, textDecoration:"none" }}>Order →</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section style={{ maxWidth:900, margin:"0 auto 80px", padding:"0 24px" }}>
          <div style={{ textAlign:"center", marginBottom:40 }}>
            <div style={{ fontSize:10, color:T.gold, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:10 }}>The Process</div>
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(22px,3.5vw,36px)", fontWeight:800, color:"#fff" }}>How It Works</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:20 }}>
            {PROCESS.map((s,i) => (
              <div key={i} style={{ textAlign:"center", padding:"24px 20px", background:T.card, border:`1px solid ${T.border}`, borderRadius:14 }}>
                <div style={{ fontSize:12, fontWeight:800, color:T.gold, letterSpacing:"0.1em", marginBottom:12 }}>{s.num}</div>
                <div style={{ fontSize:32, marginBottom:10 }}>{s.icon}</div>
                <div style={{ fontSize:14, fontWeight:700, color:"#fff", marginBottom:8 }}>{s.title}</div>
                <div style={{ fontSize:12, color:T.sub, lineHeight:1.65 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" style={{ maxWidth:1100, margin:"0 auto 80px", padding:"0 24px" }}>
          <div style={{ textAlign:"center", marginBottom:32 }}>
            <div style={{ fontSize:10, color:T.gold, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:10 }}>Transparent Pricing</div>
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(22px,3.5vw,36px)", fontWeight:800, color:"#fff", marginBottom:20 }}>Fixed Price, No Surprises</h2>
            {/* Billing toggle */}
            <div style={{ display:"inline-flex", background:"rgba(255,255,255,0.04)", border:`1px solid ${T.border}`, borderRadius:30, padding:4 }}>
              <button onClick={() => setAnnual(false)}
                style={{ padding:"7px 20px", borderRadius:26, border:"none", background:!annual?T.gold:"transparent", color:!annual?"#000":T.sub, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>Monthly</button>
              <button onClick={() => setAnnual(true)}
                style={{ padding:"7px 20px", borderRadius:26, border:"none", background:annual?T.gold:"transparent", color:annual?"#000":T.sub, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>
                Annual <span style={{ fontSize:10, color:annual?"#000":"#10B981", fontWeight:700 }}>Save 25%</span>
              </button>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:16 }}>
            {PRICING.map((p,i) => (
              <div key={i} style={{ background:p.popular?"rgba(232,184,75,0.07)":T.card, border:`1.5px solid ${p.popular?T.gold:T.border}`, borderRadius:16, padding:"24px 20px", position:"relative" }}>
                {p.popular && (
                  <div style={{ position:"absolute", top:-10, left:"50%", transform:"translateX(-50%)", background:T.gold, color:"#000", fontSize:10, fontWeight:800, padding:"3px 14px", borderRadius:20, letterSpacing:"0.08em", textTransform:"uppercase", whiteSpace:"nowrap" }}>
                    Most Popular
                  </div>
                )}
                <div style={{ fontSize:14, fontWeight:700, color:p.popular?T.gold:"#fff", marginBottom:6 }}>{p.name}</div>
                <div style={{ fontSize:32, fontWeight:900, color:"#fff", fontFamily:"'Syne',sans-serif", marginBottom:4 }}>
                  AED {annual ? p.annual : p.monthly}
                </div>
                <div style={{ fontSize:11, color:T.sub, marginBottom:16 }}>⏱ Delivery: {p.delivery}</div>
                <div style={{ display:"flex", flexDirection:"column", gap:7, marginBottom:20 }}>
                  {p.features.map((f,j) => (
                    <div key={j} style={{ display:"flex", gap:8, fontSize:12, color:T.sub }}>
                      <span style={{ color:T.green }}>✓</span>{f}
                    </div>
                  ))}
                </div>
                <a href="https://wa.me/971544735060" style={{ display:"block", padding:"11px", background:p.popular?`linear-gradient(135deg,${T.gold},#9A7830)`:"rgba(255,255,255,0.06)", border:`1px solid ${p.popular?T.gold:T.border}`, borderRadius:10, color:p.popular?"#000":T.sub, fontSize:13, fontWeight:700, textDecoration:"none", textAlign:"center" }}>
                  Get Started →
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ── TECH STACK ── */}
        <div style={{ overflow:"hidden", borderTop:`1px solid ${T.border}`, borderBottom:`1px solid ${T.border}`, padding:"16px 0", marginBottom:80 }}>
          <div style={{ display:"flex", gap:40, animation:"ticker 20s linear infinite", width:"max-content" }}>
            {[...TECHS,...TECHS].map((t,i) => (
              <span key={i} style={{ fontSize:13, color:T.sub, fontWeight:500, whiteSpace:"nowrap", display:"flex", alignItems:"center", gap:6 }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ── TESTIMONIALS ── */}
        <section id="portfolio" style={{ maxWidth:1100, margin:"0 auto 80px", padding:"0 24px" }}>
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <div style={{ fontSize:10, color:T.gold, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:10 }}>Client Reviews</div>
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(22px,3.5vw,36px)", fontWeight:800, color:"#fff" }}>What Clients Say</h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:16 }}>
            {TESTIMONIALS.map((t,i) => (
              <div key={i} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:14, padding:"22px 20px" }}>
                <div style={{ color:T.gold, fontSize:16, marginBottom:12 }}>{"★".repeat(t.stars)}</div>
                <p style={{ fontSize:13, color:T.sub, lineHeight:1.75, marginBottom:16 }}>"{t.text}"</p>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:38, height:38, borderRadius:10, background:`linear-gradient(135deg,${T.gold},#9A7830)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{t.flag}</div>
                  <div>
                    <div style={{ fontSize:13, fontWeight:700, color:"#fff" }}>{t.name}</div>
                    <div style={{ fontSize:11, color:T.sub }}>{t.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── COMPARE TABLE ── */}
        <section style={{ maxWidth:900, margin:"0 auto 80px", padding:"0 24px" }}>
          <div style={{ textAlign:"center", marginBottom:32 }}>
            <div style={{ fontSize:10, color:T.gold, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:10 }}>Why Choose Us</div>
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(20px,3vw,32px)", fontWeight:800, color:"#fff" }}>SalmanDev vs Freelancer vs Agency</h2>
          </div>
          <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:16, overflow:"hidden" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ background:"rgba(232,184,75,0.08)" }}>
                  <th style={{ padding:"14px 16px", fontSize:12, color:T.sub, textAlign:"left", fontWeight:500 }}>Feature</th>
                  <th style={{ padding:"14px 16px", fontSize:13, color:T.gold, textAlign:"center", fontWeight:700 }}>SalmanDev ✦</th>
                  <th style={{ padding:"14px 16px", fontSize:12, color:T.sub, textAlign:"center", fontWeight:500 }}>Freelancer</th>
                  <th style={{ padding:"14px 16px", fontSize:12, color:T.sub, textAlign:"center", fontWeight:500 }}>Agency</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((r,i) => (
                  <tr key={i} style={{ borderTop:`1px solid rgba(255,255,255,0.04)` }}>
                    <td style={{ padding:"11px 16px", fontSize:12, color:T.sub }}>{r.feature}</td>
                    <td style={{ padding:"11px 16px", fontSize:12, fontWeight:700, color:T.gold, textAlign:"center", background:"rgba(232,184,75,0.04)" }}>{r.us}</td>
                    <td style={{ padding:"11px 16px", fontSize:12, color:T.sub, textAlign:"center" }}>{r.freelancer}</td>
                    <td style={{ padding:"11px 16px", fontSize:12, color:T.sub, textAlign:"center" }}>{r.agency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" style={{ maxWidth:760, margin:"0 auto 80px", padding:"0 24px" }}>
          <div style={{ textAlign:"center", marginBottom:36 }}>
            <div style={{ fontSize:10, color:T.gold, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:10 }}>Answers</div>
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(22px,3.5vw,36px)", fontWeight:800, color:"#fff" }}>Frequently Asked</h2>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {FAQS.map((f,i) => (
              <div key={i} style={{ background:T.card, border:`1px solid ${openFaq===i?T.gold:T.border}`, borderRadius:12, overflow:"hidden", transition:"border-color 0.2s" }}>
                <button onClick={() => setOpenFaq(openFaq===i?null:i)}
                  style={{ width:"100%", padding:"16px 18px", display:"flex", justifyContent:"space-between", alignItems:"center", background:"transparent", border:"none", cursor:"pointer", fontFamily:"Inter,sans-serif", textAlign:"left" }}>
                  <span style={{ fontSize:14, fontWeight:600, color:openFaq===i?T.gold:"#fff" }}>{f.q}</span>
                  <span style={{ fontSize:18, color:T.gold, transform:openFaq===i?"rotate(45deg)":"none", transition:"transform 0.2s", flexShrink:0 }}>+</span>
                </button>
                {openFaq===i && (
                  <div style={{ padding:"0 18px 16px", fontSize:13, color:T.sub, lineHeight:1.75 }}>{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── ORDER FORM ── */}
        <section id="order" style={{ maxWidth:800, margin:"0 auto 80px", padding:"0 24px" }}>
          <div style={{ background:"rgba(232,184,75,0.05)", border:`1px solid ${T.gold}`, borderRadius:20, padding:"36px 32px" }}>
            <div style={{ textAlign:"center", marginBottom:28 }}>
              <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(22px,3.5vw,34px)", fontWeight:800, color:"#fff", marginBottom:8 }}>Start Your Project Today</h2>
              <p style={{ fontSize:13, color:T.sub }}>Fill this form → instant WhatsApp chat with Salman</p>
            </div>

            {sent ? (
              <div style={{ textAlign:"center", padding:"32px 20px" }}>
                <div style={{ fontSize:52, marginBottom:12 }}>✅</div>
                <div style={{ fontSize:20, fontWeight:700, color:T.gold, marginBottom:6 }}>Enquiry Sent!</div>
                <p style={{ fontSize:13, color:T.sub }}>Salman will reply on WhatsApp within 1 hour during business hours.</p>
              </div>
            ) : (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                {[
                  { label:"Your Name *", key:"name", type:"text", placeholder:"Ahmed Khan", full:false },
                  { label:"WhatsApp / Phone *", key:"phone", type:"text", placeholder:"+971 50 000 0000", full:false },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontSize:11, color:T.sub, display:"block", marginBottom:5, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em" }}>{f.label}</label>
                    <input type={f.type} value={form[f.key]} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
                      placeholder={f.placeholder} style={{ ...INP }}/>
                  </div>
                ))}
                <div style={{ gridColumn:"1/-1" }}>
                  <label style={{ fontSize:11, color:T.sub, display:"block", marginBottom:5, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em" }}>Service Needed</label>
                  <select value={form.service} onChange={e=>setForm(p=>({...p,service:e.target.value}))} style={{ ...INP }}>
                    <option value="">Select a service...</option>
                    {SERVICES.map(s => <option key={s.title} value={s.title}>{s.icon} {s.title}</option>)}
                    <option value="Not sure">Not sure yet — need advice</option>
                  </select>
                </div>
                <div style={{ gridColumn:"1/-1" }}>
                  <label style={{ fontSize:11, color:T.sub, display:"block", marginBottom:5, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em" }}>Tell us about your project</label>
                  <textarea value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))}
                    placeholder="Describe your business, what you need, your budget..." rows={4} style={{ ...INP, resize:"vertical" }}/>
                </div>
                <div style={{ gridColumn:"1/-1" }}>
                  <button onClick={sendForm} disabled={!form.name||!form.phone}
                    style={{ width:"100%", padding:"14px", background:(form.name&&form.phone)?`linear-gradient(135deg,${T.gold},#9A7830)`:"rgba(255,255,255,0.08)", border:"none", borderRadius:12, color:(form.name&&form.phone)?"#000":"rgba(255,255,255,0.3)", fontSize:15, fontWeight:800, cursor:(form.name&&form.phone)?"pointer":"default", fontFamily:"Inter,sans-serif" }}>
                    🚀 Send to WhatsApp →
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ background:T.bg2, borderTop:`1px solid ${T.border}`, padding:"40px 24px" }}>
          <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:20 }}>
            <div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:800, color:T.gold, marginBottom:4 }}>SalmanDev</div>
              <div style={{ fontSize:12, color:T.sub }}>Professional Web Development · Dubai, UAE 🇦🇪</div>
            </div>
            <div style={{ display:"flex", gap:16 }}>
              {[["💬 WhatsApp","https://wa.me/971544735060"],["🌐 DubaiRovers.com","https://dubairovers.com"],["← Back Home","/"]].map(([l,h]) => (
                <a key={l} href={h} style={{ fontSize:12, color:T.sub, textDecoration:"none" }} className="hov-gold">{l}</a>
              ))}
            </div>
          </div>
          <div style={{ textAlign:"center", marginTop:24, fontSize:11, color:"rgba(255,255,255,0.12)" }}>
            © 2026 SalmanDev · Part of DubaiRovers Platform · All rights reserved
          </div>
        </footer>

        {/* ── FLOATING WA ── */}
        <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
          style={{ position:"fixed", bottom:24, right:24, zIndex:999, width:54, height:54, borderRadius:"50%", background:"#25D366", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, textDecoration:"none", boxShadow:"0 8px 24px rgba(37,211,102,0.45)", animation:"float 3s ease-in-out infinite" }}>
          💬
        </a>
      </div>
    </>
  );
}
