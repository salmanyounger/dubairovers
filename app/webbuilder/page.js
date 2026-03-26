"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const PORTFOLIO = [
  { name:"DubaiRovers.com", cat:"Tourism", desc:"Full tour booking platform — 24 tours, 70 packages, booking forms, blog, admin panel. Next.js 14 + App Router.", tags:["Next.js","Booking","Blog","Admin"], color:"#F97316", emoji:"🏜️", href:"/tours" },
  { name:"Dubai Properties", cat:"Real Estate", desc:"AI property comparison platform — 30 listings, mortgage calculator, market trends, investment tools.", tags:["React","AI","Maps","Charts"], color:"#6366F1", emoji:"🏙️", href:"/properties" },
  { name:"ARCHAI Villa Design", cat:"AI Tools", desc:"5-step villa design wizard — 9 architectural styles, floor plans, PKR cost estimate, AI photo prompt.", tags:["Canvas","AI","Multi-step","PDF"], color:"#C8A96E", emoji:"🏠", href:"/archai" },
  { name:"SK Auto Garage", cat:"Auto Service", desc:"Dark blue/silver theme, 7 service categories, WhatsApp booking, bilingual Arabic/English RTL support.", tags:["Next.js","Arabic","WhatsApp","Admin"], color:"#3B82F6", emoji:"🔧", href:"#" },
  { name:"SK Restaurant", cat:"F&B", desc:"Black/red bold aesthetic, 7 pages, live delivery tracking, full CRUD admin panel with localStorage.", tags:["React","Delivery","Admin","CRUD"], color:"#EF4444", emoji:"🍽️", href:"#" },
  { name:"SalmanFX Platform", cat:"Fintech", desc:"Forex EA marketing site with live trading dashboard simulation, MT4 terminal UI, pricing plans.", tags:["Next.js","Charts","Monospace","Dark"], color:"#10B981", emoji:"📈", href:"/salmanfx" },
];

const TIERS = [
  { name:"Starter", price:"AED 1,200–3,000", usd:"~$330–820", icon:"🌱", color:"#10B981",
    desc:"Perfect for small businesses launching their first professional website.",
    features:["5–8 pages","Mobile responsive","WhatsApp integration","Contact form","Basic SEO","2 rounds of revisions","1 month support"] },
  { name:"Business", price:"AED 4,000–8,000", usd:"~$1,090–2,180", icon:"🚀", color:"#6366F1",
    desc:"Complete business website with booking, blog, and admin panel.",
    features:["12–20 pages","Booking/reservation system","Admin dashboard","Blog with CMS","Multi-language (AR/EN)","Google Analytics","3 months support"], badge:"MOST POPULAR" },
  { name:"Platform", price:"AED 12,000–25,000", usd:"~$3,270–6,810", icon:"⚡", color:"#F97316",
    desc:"Full-featured web platform with AI tools, maps, and complex admin systems.",
    features:["Unlimited pages","AI-powered features","Real-time maps","Complex admin CRUD","Payment integration","API connections","6 months support"] },
  { name:"Enterprise", price:"AED 30,000–50,000+", usd:"~$8,170+", icon:"💎", color:"#F59E0B",
    desc:"Large-scale platforms, SaaS products, white-label solutions.",
    features:["Custom architecture","Multi-tenant SaaS","Database design","Full source code","Server deployment","Vercel/AWS setup","12 months support","Training & docs"] },
];

const CATEGORIES = [
  { icon:"🏜️", name:"Tourism", examples:"Tour booking, packages, walking routes, travel guides" },
  { icon:"🏙️", name:"Real Estate", examples:"Property listings, comparison tools, mortgage calculators" },
  { icon:"🍽️", name:"Restaurant", examples:"Menu, delivery tracking, table booking, online ordering" },
  { icon:"🔧", name:"Auto Garage", examples:"Services, booking, gallery, WhatsApp integration" },
  { icon:"🏥", name:"Healthcare", examples:"Clinic website, appointment booking, doctor profiles" },
  { icon:"🎓", name:"Education", examples:"School/institute, courses, enrollment, LMS" },
  { icon:"💄", name:"Beauty & Salon", examples:"Services, booking calendar, gallery, staff profiles" },
  { icon:"🏋️", name:"Fitness / Gym", examples:"Classes, membership plans, trainer profiles, schedule" },
  { icon:"🏨", name:"Hotel / Hospitality", examples:"Room booking, amenities, gallery, Tripadvisor integration" },
  { icon:"⚖️", name:"Legal", examples:"Practice areas, lawyer profiles, case consultation form" },
  { icon:"💻", name:"Tech / SaaS", examples:"Product landing, pricing, docs, dashboard demos" },
  { icon:"🛒", name:"E-Commerce", examples:"Product catalog, cart, payment gateway, order tracking" },
];

const PROCESS = [
  { n:"01", icon:"💬", title:"WhatsApp Consultation", desc:"Tell me your business, requirements and budget. I'll share 2–3 design directions the same day." },
  { n:"02", icon:"🎨", title:"Design & Approval", desc:"I build a live demo at your domain or localhost. You see the real product — no mockups. Approve before paying." },
  { n:"03", icon:"⚙️", title:"Build & Customise", desc:"Full development with your real content, logo, colors and data. Admin panel built for your team." },
  { n:"04", icon:"🚀", title:"Launch & Support", desc:"Deployed to Vercel with custom domain, SSL, and SEO setup. Support included for 1–12 months depending on tier." },
];

export default function WebBuilderPage() {
  const [mounted,  setMounted]  = useState(false);
  const [tab,      setTab]      = useState("work");
  const [hovered,  setHovered]  = useState(null);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return <div style={{ minHeight:"100vh", overflowX:"hidden", background:"#0A060F" }}/>;

  const T = {
    bg:"#0A060F", card:"rgba(255,255,255,0.04)", border:"rgba(255,255,255,0.07)",
    text:"#F0ECF8", sub:"rgba(255,255,255,0.42)", pink:"#EC4899", purple:"#8B5CF6",
  };
  const TABS = ["work","services","pricing","process"];

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"/>
      <div suppressHydrationWarning style={{ minHeight:"100vh", overflowX:"hidden", background:T.bg, color:T.text, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
        <style suppressHydrationWarning>{`
          *{box-sizing:border-box}
          @media(max-width:768px){
            .wb-nav-inner{height:auto!important;flex-wrap:wrap;padding:10px 0!important;gap:8px!important}
            .wb-tabs{overflow-x:auto;-webkit-overflow-scrolling:touch}
        @media(max-width:768px){
          .wb-pricing-grid{grid-template-columns:1fr!important;max-width:420px;margin:0 auto;}
          .wb-process-grid{grid-template-columns:1fr!important;gap:12px!important;}
          .wb-process-grid .pc{position:relative!important;}
          .process-arrow{display:none!important;}
        }
            .wb-hero h1{font-size:clamp(28px,8vw,52px)!important}
            .wb-cats{grid-template-columns:repeat(2,1fr)!important}
            .wb-pricing{grid-template-columns:1fr!important}
            .wb-work{grid-template-columns:1fr!important}
          }
          ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:rgba(236,72,153,0.3);border-radius:10px}
          @keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
          @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}
          .fade{animation:fadeUp 0.35s ease}
          .pc:hover{transform:translateY(-5px)!important;border-color:rgba(236,72,153,0.35)!important}
          .pc{transition:all 0.25s ease}
          .tier:hover{transform:translateY(-6px)!important;box-shadow:0 20px 50px rgba(0,0,0,0.5)!important}
          .tier{transition:all 0.28s ease}
          select option{background:#0A060F;color:#fff}
        `}</style>

        {/* NAV */}
        <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(10,6,15,0.97)", backdropFilter:"blur(20px)", borderBottom:`1px solid ${T.border}`, padding:"0 24px" }}>
          <div className="wb-nav-inner" style={{ maxWidth:1200, margin:"0 auto", height:60, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:32, height:32, borderRadius:8, background:"linear-gradient(135deg,#EC4899,#8B5CF6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15 }}>💻</div>
              <div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:800, color:"#fff" }}>Web Builder</div>
                <div style={{ fontSize:8, color:T.sub, letterSpacing:"0.15em", textTransform:"uppercase" }}>Dubai · React & Next.js</div>
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div className="wb-tabs" style={{ display:"flex", gap:3, background:"rgba(255,255,255,0.04)", borderRadius:9, padding:3, overflowX:"auto" }}>
                {TABS.map(t => (
                  <button key={t} onClick={() => setTab(t)}
                    style={{ padding:"6px 13px", borderRadius:7, border:"none", background:tab===t?"linear-gradient(135deg,#EC4899,#8B5CF6)":"transparent", color:tab===t?"#fff":T.sub, fontSize:12, fontWeight:tab===t?700:400, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif", textTransform:"capitalize", transition:"all 0.18s" }}>
                    {t}
                  </button>
                ))}
              </div>
              <Link href="/webbuilder/blog" style={{ padding:"6px 14px", borderRadius:7, border:"1px solid rgba(236,72,153,0.35)", background:"rgba(236,72,153,0.08)", color:"#EC4899", fontSize:12, fontWeight:700, textDecoration:"none", whiteSpace:"nowrap" }}>📝 Blog</Link>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <a href="https://wa.me/971544735060?text=Hi Salman, I want a website for my business" target="_blank" rel="noopener noreferrer"
                style={{ padding:"8px 18px", background:"linear-gradient(135deg,#EC4899,#8B5CF6)", borderRadius:9, color:"#fff", fontSize:12, fontWeight:700, textDecoration:"none" }}>
                💬 Get a Quote
              </a>
              <Link href="/" style={{ padding:"7px 12px", background:T.card, border:`1px solid ${T.border}`, borderRadius:9, color:T.sub, fontSize:12, textDecoration:"none" }}>← Back</Link>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <div style={{ background:"linear-gradient(135deg,rgba(236,72,153,0.08) 0%,rgba(139,92,246,0.06) 50%,transparent 80%)", borderBottom:`1px solid ${T.border}`, padding:"56px 24px 48px" }}>
          <div style={{ maxWidth:1200, margin:"0 auto", textAlign:"center" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(236,72,153,0.1)", border:"1px solid rgba(236,72,153,0.22)", borderRadius:20, padding:"4px 14px", marginBottom:20 }}>
              <div style={{ width:5, height:5, borderRadius:"50%", background:T.pink }}/>
              <span style={{ fontSize:10, color:T.pink, fontWeight:700, letterSpacing:"0.1em" }}>DUBAI-BASED WEB DEVELOPER · REACT & NEXT.JS</span>
            </div>
            <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(30px,5vw,62px)", fontWeight:800, lineHeight:1.05, letterSpacing:"-0.02em", marginBottom:16 }}>
              World-Class Websites for{" "}
              <span style={{ background:"linear-gradient(90deg,#EC4899,#8B5CF6)", backgroundClip:"text", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                Your Business
              </span>
            </h1>
            <p style={{ fontSize:15, color:T.sub, lineHeight:1.75, marginBottom:32, maxWidth:600, margin:"0 auto 32px" }}>
              I build custom tourism, restaurant, real estate, and business websites using React & Next.js. You see the live demo before paying. Dubai-based, WhatsApp-first.
            </p>
            <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap", marginBottom:36 }}>
              <a href="https://wa.me/971544735060?text=Hi Salman, I want a website" target="_blank" rel="noopener noreferrer"
                style={{ padding:"13px 28px", background:"linear-gradient(135deg,#EC4899,#8B5CF6)", borderRadius:11, color:"#fff", fontSize:14, fontWeight:800, textDecoration:"none", boxShadow:"0 6px 24px rgba(236,72,153,0.35)" }}>
                💬 WhatsApp for Quote
              </a>
              <button onClick={() => setTab("work")}
                style={{ padding:"13px 24px", background:T.card, border:`1px solid ${T.border}`, borderRadius:11, color:T.text, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                🎨 See My Work
              </button>
            </div>
            <div style={{ display:"flex", gap:28, justifyContent:"center", flexWrap:"wrap" }}>
              {[["6+","Live Projects"],["18+","Website Categories"],["React","& Next.js"],["48hr","Demo Turnaround"]].map(([v,l]) => (
                <div key={l} style={{ textAlign:"center" }}>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:800, color:T.pink }}>{v}</div>
                  <div style={{ fontSize:9, color:T.sub, textTransform:"uppercase", letterSpacing:"0.08em" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MAIN */}
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"32px 24px" }}>

          {/* WORK TAB */}
          {tab === "work" && (
            <div className="fade">
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:800, marginBottom:20 }}>🎨 Recent Projects</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))", gap:16, marginBottom:32 }}>
                {PORTFOLIO.map(p => (
                  <div key={p.name} className="pc"
                    style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:14, padding:"20px 22px", cursor:"pointer" }}
                    onMouseEnter={() => setHovered(p.name)}
                    onMouseLeave={() => setHovered(null)}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <div style={{ width:40, height:40, borderRadius:10, background:`${p.color}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 }}>{p.emoji}</div>
                        <div>
                          <div style={{ fontSize:14, fontWeight:700, color:"#fff" }}>{p.name}</div>
                          <div style={{ fontSize:10, color:p.color, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.08em" }}>{p.cat}</div>
                        </div>
                      </div>
                      {p.href !== "#" && (
                        <Link href={p.href} style={{ fontSize:11, color:T.pink, textDecoration:"none", border:`1px solid rgba(236,72,153,0.3)`, borderRadius:7, padding:"4px 9px" }}>
                          View →
                        </Link>
                      )}
                    </div>
                    <p style={{ fontSize:12, color:T.sub, lineHeight:1.65, marginBottom:12 }}>{p.desc}</p>
                    <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                      {p.tags.map(tag => (
                        <span key={tag} style={{ fontSize:10, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:5, padding:"2px 8px", color:T.sub }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Categories */}
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:800, marginBottom:16 }}>🏪 Business Categories I Build</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:10 }}>
                {CATEGORIES.map(c => (
                  <div key={c.name} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:11, padding:"12px 14px", display:"flex", gap:10, alignItems:"start" }}>
                    <div style={{ fontSize:20, flexShrink:0, marginTop:1 }}>{c.icon}</div>
                    <div>
                      <div style={{ fontSize:12, fontWeight:700, color:"#fff", marginBottom:3 }}>{c.name}</div>
                      <div style={{ fontSize:10, color:T.sub, lineHeight:1.5 }}>{c.examples}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SERVICES TAB */}
          {tab === "services" && (
            <div className="fade">
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:800, marginBottom:6 }}>🛠️ What I Build</div>
              <p style={{ fontSize:13, color:T.sub, marginBottom:24 }}>Every website is custom-coded in React or Next.js — no WordPress, no page builders, no templates.</p>
              <div className="wb-pricing-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14 }}>
                {[
                  { icon:"📱", title:"Mobile-First Design", desc:"Every site looks perfect on phone, tablet and desktop. Tested on all screen sizes before delivery." },
                  { icon:"🌐", title:"Multi-Language (AR/EN)", desc:"Full Arabic RTL support with Cairo font. Language toggle built into every site. SEO-friendly." },
                  { icon:"⚡", title:"Fast & SEO Ready", desc:"Next.js App Router for speed. Schema markup, meta tags, sitemap, robots.txt — all configured." },
                  { icon:"🔧", title:"Custom Admin Panel", desc:"Your team can add/edit/delete content without coding. Password-protected, mobile-friendly." },
                  { icon:"💬", title:"WhatsApp Integration", desc:"One-tap WhatsApp buttons on every page. Pre-filled messages per product or service." },
                  { icon:"🤖", title:"AI-Powered Features", desc:"AI quiz, smart recommendations, property scoring, villa design wizard — I build real AI tools." },
                  { icon:"🗺️", title:"Maps & Location", desc:"OpenStreetMap (free) or Google Maps integration. GPS navigation, property pins, route planning." },
                  { icon:"📊", title:"Charts & Analytics", desc:"Canvas-based charts, market trend dashboards, ROI calculators, live data visualisation." },
                  { icon:"🚀", title:"Vercel Deployment", desc:"Hosted on Vercel with custom domain, SSL certificate, automatic deploys, and CDN globally." },
                ].map(s => (
                  <div key={s.title} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"16px 18px" }}>
                    <div style={{ fontSize:24, marginBottom:8 }}>{s.icon}</div>
                    <div style={{ fontSize:13, fontWeight:700, color:"#fff", marginBottom:5 }}>{s.title}</div>
                    <p style={{ fontSize:12, color:T.sub, lineHeight:1.65 }}>{s.desc}</p>
                  </div>
                ))}
              </div>

              <div style={{ marginTop:28, background:"rgba(236,72,153,0.07)", border:"1px solid rgba(236,72,153,0.18)", borderRadius:13, padding:"20px 24px", display:"flex", gap:20, alignItems:"center", flexWrap:"wrap" }}>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:800, marginBottom:4 }}>You see the live demo before paying</div>
                  <p style={{ fontSize:13, color:T.sub, lineHeight:1.65 }}>I build a working demo of your website first. You test it on your phone, show your family. Only pay when you're 100% happy with what you see.</p>
                </div>
                <a href="https://wa.me/971544735060?text=Hi Salman, I want to see a demo for my business" target="_blank" rel="noopener noreferrer"
                  style={{ padding:"11px 22px", background:"linear-gradient(135deg,#EC4899,#8B5CF6)", borderRadius:10, color:"#fff", fontSize:13, fontWeight:700, textDecoration:"none", whiteSpace:"nowrap" }}>
                  💬 Request a Free Demo
                </a>
              </div>
            </div>
          )}

          {/* PRICING TAB */}
          {tab === "pricing" && (
            <div className="fade">
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:800, marginBottom:4 }}>💰 Pricing</div>
              <p style={{ fontSize:13, color:T.sub, marginBottom:24 }}>All prices are in AED. Payment in installments available. Custom quotes on WhatsApp.</p>
              <div className="wb-pricing-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14 }}>
                {TIERS.map(tier => (
                  <div key={tier.name} className="tier"
                    style={{ background:T.card, border:`1.5px solid ${tier.color}28`, borderRadius:16, padding:"22px 20px", position:"relative",
                      boxShadow:tier.badge?`0 0 36px ${tier.color}16`:"none" }}>
                    {tier.badge && (
                      <div style={{ position:"absolute", top:-10, left:"50%", transform:"translateX(-50%)", background:tier.color, borderRadius:20, padding:"3px 12px", fontSize:9, fontWeight:800, color:tier.color==="#F59E0B"?"#000":"#fff", whiteSpace:"nowrap" }}>
                        {tier.badge}
                      </div>
                    )}
                    <div style={{ fontSize:26, marginBottom:10 }}>{tier.icon}</div>
                    <div style={{ fontFamily:"'Syne',sans-serif", fontSize:14, fontWeight:800, color:"#fff", marginBottom:4 }}>{tier.name}</div>
                    <div style={{ fontSize:16, fontWeight:900, color:tier.color, marginBottom:2 }}>{tier.price}</div>
                    <div style={{ fontSize:10, color:T.sub, marginBottom:8 }}>{tier.usd}</div>
                    <p style={{ fontSize:11, color:T.sub, lineHeight:1.55, marginBottom:16 }}>{tier.desc}</p>
                    <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:20 }}>
                      {tier.features.map(f => (
                        <div key={f} style={{ display:"flex", gap:7, fontSize:11, color:T.sub }}>
                          <span style={{ color:tier.color, flexShrink:0 }}>✓</span>{f}
                        </div>
                      ))}
                    </div>
                    <a href={`https://wa.me/971544735060?text=Hi Salman, I am interested in the ${tier.name} website package (${tier.price})`}
                      target="_blank" rel="noopener noreferrer"
                      style={{ display:"block", padding:"10px", background:`linear-gradient(135deg,${tier.color},${tier.color}cc)`, borderRadius:9, color:tier.color==="#F59E0B"?"#000":"#fff", fontSize:12, fontWeight:700, textDecoration:"none", textAlign:"center" }}>
                      💬 Get a Quote
                    </a>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:18, background:"rgba(139,92,246,0.07)", border:"1px solid rgba(139,92,246,0.18)", borderRadius:11, padding:"14px 18px", fontSize:12, color:"rgba(139,92,246,0.8)" }}>
                💡 All prices are estimates. Final price depends on specific requirements. WhatsApp me for a free custom quote — I respond within 1 hour.
              </div>
            </div>
          )}

          {/* PROCESS TAB */}
          {tab === "process" && (
            <div className="fade">
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:800, marginBottom:6 }}>🔄 How It Works</div>
              <p style={{ fontSize:13, color:T.sub, marginBottom:28 }}>Simple 4-step process from idea to live website. Most projects delivered in 5–14 days.</p>
              <div className="wb-process-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:32 }}>
                {PROCESS.map((s, i) => (
                  <div key={s.n} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:13, padding:"20px 18px", position:"relative" }}>
                    {i < PROCESS.length - 1 && (
                      <div className="process-arrow" style={{ position:"absolute", right:-16, top:"50%", transform:"translateY(-50%)", fontSize:18, color:"rgba(255,255,255,0.15)", zIndex:1 }}>→</div>
                    )}
                    <div style={{ fontFamily:"'Syne',sans-serif", fontSize:11, color:T.pink, fontWeight:700, letterSpacing:"0.1em", marginBottom:10 }}>{s.n}</div>
                    <div style={{ fontSize:26, marginBottom:10 }}>{s.icon}</div>
                    <div style={{ fontSize:13, fontWeight:700, color:"#fff", marginBottom:7 }}>{s.title}</div>
                    <p style={{ fontSize:12, color:T.sub, lineHeight:1.65 }}>{s.desc}</p>
                  </div>
                ))}
              </div>

              {/* Tech stack */}
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:800, marginBottom:14 }}>⚙️ Tech Stack I Use</div>
              <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:28 }}>
                {["Next.js 14","React 18","Tailwind CSS","App Router","Canvas API","OpenStreetMap","Vercel","LocalStorage","WhatsApp API","EmailJS","Unsplash","Google Fonts"].map(t => (
                  <span key={t} style={{ padding:"6px 14px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:20, fontSize:12, color:T.sub }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* CTA block */}
              <div style={{ background:"linear-gradient(135deg,rgba(236,72,153,0.1),rgba(139,92,246,0.08))", border:"1px solid rgba(236,72,153,0.2)", borderRadius:16, padding:"28px 28px", textAlign:"center" }}>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:800, color:"#fff", marginBottom:8 }}>
                  Ready to build your website?
                </div>
                <p style={{ fontSize:14, color:T.sub, marginBottom:22, maxWidth:500, margin:"0 auto 22px" }}>
                  WhatsApp me your business name and what you need. I'll send you 2–3 design ideas within the same day.
                </p>
                <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
                  <a href="https://wa.me/971544735060?text=Hi Salman, I want a website for my business" target="_blank" rel="noopener noreferrer"
                    style={{ padding:"13px 28px", background:"linear-gradient(135deg,#EC4899,#8B5CF6)", borderRadius:11, color:"#fff", fontSize:14, fontWeight:800, textDecoration:"none", boxShadow:"0 6px 24px rgba(236,72,153,0.35)" }}>
                    💬 WhatsApp +971 544 735 060
                  </a>
                  <button onClick={() => setTab("pricing")}
                    style={{ padding:"13px 22px", background:T.card, border:`1px solid ${T.border}`, borderRadius:11, color:T.text, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                    See Pricing →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <a href="https://wa.me/971544735060?text=Hi Salman, I want a website" target="_blank" rel="noopener noreferrer"
          style={{ position:"fixed", bottom:22, right:22, zIndex:50, width:50, height:50, borderRadius:"50%", background:"#25D366", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, textDecoration:"none", boxShadow:"0 6px 20px rgba(37,211,102,0.4)" }}>
          💬
        </a>
      </div>
    </>
  );
}
