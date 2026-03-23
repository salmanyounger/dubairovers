"use client"
import { useState, useEffect, useMemo } from "react"
import { ALL_BLOGS } from "../data/all_blogs_merged"
import dynamic from "next/dynamic"
const BlogPublisher = dynamic(() => import("./BlogPublisher"), { ssr: false })
import Link from "next/link"
import APISetupGuide from "../components/APISetupGuide"

const PW = "dubairovers2025"
const WA = "+971544735060"

const TOURS = [
  { name:"Desert Safari",     icon:"🏜️", slug:"desert-safari-dubai",     bookings:89, revenue:38200, rating:4.9 },
  { name:"Hot Air Balloon",   icon:"🎈", slug:"hot-air-balloon-dubai",    bookings:42, revenue:52800, rating:5.0 },
  { name:"Dhow Cruise",       icon:"⛵", slug:"dhow-cruise-dubai",        bookings:67, revenue:18400, rating:4.8 },
  { name:"Quad Bike",         icon:"🚵", slug:"quad-bike-dubai",          bookings:51, revenue:24300, rating:4.7 },
  { name:"Camel Riding",      icon:"🐪", slug:"camel-riding-dubai",       bookings:35, revenue:8950,  rating:4.8 },
  { name:"City Tour",         icon:"🏙️", slug:"private-city-tour-dubai", bookings:28, revenue:18100, rating:4.9 },
]
const MOCK_BOOKINGS = [
  { id:"DR-0284", name:"Ahmed Al Mansouri", phone:"+971501234567",   email:"ahmed@email.com",  tour:"Desert Safari",   pkg:"Evening Safari",        date:"2025-03-18", guests:4, amount:600,  status:"confirmed" },
  { id:"DR-0283", name:"Sarah Johnson",     phone:"+44 7911 123456", email:"sarah@email.com",  tour:"Hot Air Balloon", pkg:"Sunrise Experience",    date:"2025-03-20", guests:2, amount:1790, status:"pending"   },
  { id:"DR-0282", name:"Alexei Petrov",     phone:"+7 903 123 4567", email:"alexei@email.com", tour:"Dhow Cruise",     pkg:"Premium Dinner Cruise", date:"2025-03-17", guests:6, amount:1500, status:"confirmed" },
  { id:"DR-0281", name:"Marie Dubois",      phone:"+33 6 12 34 56",  email:"marie@email.com",  tour:"Quad Bike",       pkg:"60 Min Adventure",      date:"2025-03-16", guests:2, amount:760,  status:"confirmed" },
  { id:"DR-0280", name:"Ravi Kumar",        phone:"+91 98765 43210", email:"ravi@email.com",   tour:"Camel Riding",    pkg:"Sunrise Trek",          date:"2025-03-19", guests:3, amount:480,  status:"pending"   },
  { id:"DR-0279", name:"Emma Wilson",       phone:"+1 555 987 6543", email:"emma@email.com",   tour:"City Tour",       pkg:"Full Day Discovery",    date:"2025-03-22", guests:4, amount:2200, status:"cancelled" },
  { id:"DR-0278", name:"Yuki Tanaka",       phone:"+81 90 1234 5678",email:"yuki@email.com",   tour:"Desert Safari",   pkg:"Overnight Camp",        date:"2025-03-25", guests:2, amount:700,  status:"confirmed" },
]
const SEO_PAGES = [
  { page:"Homepage",           url:"/",                        pos:6,  prev:9,  clicks:891, imp:12400, ctr:"7.2%", speed:95, human:99, plag:100 },
  { page:"Desert Safari",      url:"/desert-safari-dubai",    pos:14, prev:22, clicks:284, imp:4820,  ctr:"5.9%", speed:91, human:94, plag:100 },
  { page:"Hot Air Balloon",    url:"/hot-air-balloon-dubai",  pos:8,  prev:11, clicks:412, imp:6200,  ctr:"6.6%", speed:88, human:97, plag:100 },
  { page:"Dhow Cruise",        url:"/dhow-cruise-dubai",      pos:21, prev:19, clicks:156, imp:3100,  ctr:"5.0%", speed:85, human:91, plag:99  },
  { page:"Quad Bike",          url:"/quad-bike-dubai",        pos:33, prev:45, clicks:98,  imp:2200,  ctr:"4.5%", speed:90, human:96, plag:100 },
  { page:"Camel Riding",       url:"/camel-riding-dubai",     pos:44, prev:50, clicks:67,  imp:1800,  ctr:"3.7%", speed:92, human:98, plag:100 },
  { page:"Desert Safari Blog", url:"/blog/desert-safari-guide",pos:28,prev:62, clicks:145, imp:2800,  ctr:"5.2%", speed:89, human:99, plag:100 },
]
const KEYWORDS = [
  { kw:"desert safari dubai",               vol:"22,000", diff:58, cpc:"$2.40", type:"short", pos:14 },
  { kw:"hot air balloon dubai",             vol:"18,000", diff:52, cpc:"$3.10", type:"short", pos:8  },
  { kw:"dhow cruise dubai marina",          vol:"8,500",  diff:41, cpc:"$1.90", type:"long",  pos:21 },
  { kw:"desert safari dubai small group",   vol:"1,200",  diff:18, cpc:"$1.20", type:"long",  pos:42 },
  { kw:"hot air balloon dubai price",       vol:"3,600",  diff:29, cpc:"$2.10", type:"long",  pos:19 },
  { kw:"quad bike dubai desert",            vol:"3,400",  diff:35, cpc:"$1.70", type:"short", pos:33 },
  { kw:"camel riding dubai sunrise",        vol:"2,100",  diff:28, cpc:"$0.90", type:"long",  pos:44 },
  { kw:"things to do dubai 2025",           vol:"14,000", diff:61, cpc:"$1.50", type:"short", pos:38 },
  { kw:"best desert safari dubai evening",  vol:"4,200",  diff:31, cpc:"$1.80", type:"long",  pos:27 },
  { kw:"dhow cruise dubai creek vs marina", vol:"980",    diff:15, cpc:"$0.80", type:"long",  pos:9  },
]
const COMPETITORS = [
  { name:"Arabian Adventures",  domain:"arabian-adventures.com",  rank:3,  traffic:"45K", kw:"desert safari dubai",    gap:"small group tours" },
  { name:"Platinum Heritage",   domain:"platinum-heritage.com",   rank:5,  traffic:"28K", kw:"hot air balloon dubai",  gap:"luxury add-ons" },
  { name:"Desert Safari Dubai", domain:"desertsafaridubai.ae",    rank:7,  traffic:"32K", kw:"evening desert safari",  gap:"overnight packages" },
  { name:"Alpha Tours",         domain:"alphatoursarabia.com",    rank:12, traffic:"18K", kw:"dhow cruise dubai",      gap:"family packages" },
]
const SCHEMA_STATUS = [
  { type:"TouristAttraction + Offer",    page:"All Tour Pages", status:"active",  note:"Shows stars + price in Google" },
  { type:"LocalBusiness",                page:"Homepage",       status:"active",  note:"Shows in Google Maps" },
  { type:"FAQPage",                      page:"Tour Pages",     status:"partial", note:"Only 3 of 6 pages" },
  { type:"Article",                      page:"Blog Posts",     status:"missing", note:"Add to improve blog CTR" },
  { type:"BreadcrumbList",               page:"All Pages",      status:"active",  note:"Navigation in Google" },
  { type:"AggregateRating",              page:"Tour Pages",     status:"active",  note:"Shows review count" },
]
const BOOKING_FORM_STYLES = [
  { id:"dark_card",     label:"🌙 Dark Card",      desc:"Dark glassmorphism card",         preview:"linear-gradient(135deg,#0A0C10,#0F1A2E)" },
  { id:"light_clean",   label:"☀️ Light Clean",    desc:"White card, minimal, professional",preview:"linear-gradient(135deg,#fff,#f8f9fa)" },
  { id:"luxury_gold",   label:"👑 Luxury Gold",    desc:"Dark with gold accents",          preview:"linear-gradient(135deg,#0A0A0F,#1A1A2E)" },
  { id:"desert_warm",   label:"🏜️ Desert Warm",   desc:"Sandy warm tones",                preview:"linear-gradient(135deg,#3D2B1F,#6B4226)" },
  { id:"ocean_teal",    label:"🌊 Ocean Teal",     desc:"Cool teal, fresh feel",           preview:"linear-gradient(135deg,#0F2027,#203A43)" },
  { id:"minimal",       label:"✏️ Minimal Border", desc:"Transparent with border, ultra clean",preview:"linear-gradient(135deg,rgba(245,158,11,0.05),transparent)" },
]
// INITIAL_BLOGS now comes from blogs.js (42 real blogs) merged with localStorage overrides
// Overrides stored as: { [slug]: { status, hidden } }
const INITIAL_BLOGS = [];
const TOUR_MAP = {
  "Desert Safari":   { slug:"desert-safari-dubai",     name:"Desert Safari Dubai"     },
  "Hot Air Balloon": { slug:"hot-air-balloon-dubai",    name:"Hot Air Balloon Dubai"   },
  "Dhow Cruise":     { slug:"dhow-cruise-dubai",        name:"Dhow Cruise Dubai"       },
  "Quad Bike":       { slug:"quad-bike-dubai",          name:"Quad Bike Dubai"         },
  "Camel Riding":    { slug:"camel-riding-dubai",       name:"Camel Riding Dubai"      },
  "City Tour":       { slug:"private-city-tour-dubai",  name:"Private City Tour Dubai" },
}
const SC = {
  confirmed:{ bg:"rgba(16,185,129,0.15)",  text:"#10B981", border:"rgba(16,185,129,0.3)"  },
  pending:  { bg:"rgba(245,158,11,0.15)",  text:"#F59E0B", border:"rgba(245,158,11,0.3)"  },
  cancelled:{ bg:"rgba(239,68,68,0.15)",   text:"#EF4444", border:"rgba(239,68,68,0.3)"   },
  published:{ bg:"rgba(16,185,129,0.15)",  text:"#10B981", border:"rgba(16,185,129,0.3)"  },
  draft:    { bg:"rgba(99,102,241,0.15)",  text:"#818CF8", border:"rgba(99,102,241,0.3)"  },
  hidden:   { bg:"rgba(107,114,128,0.15)", text:"#9CA3AF", border:"rgba(107,114,128,0.3)" },
  paid:     { bg:"rgba(16,185,129,0.15)",  text:"#10B981", border:"rgba(16,185,129,0.3)"  },
  unpaid:   { bg:"rgba(245,158,11,0.15)",  text:"#F59E0B", border:"rgba(245,158,11,0.3)"  },
  sent:     { bg:"rgba(99,102,241,0.15)",  text:"#818CF8", border:"rgba(99,102,241,0.3)"  },
}

function printInvoice(inv) {
  const w = window.open("","_blank","width=860,height=1100")
  w.document.write(`<!DOCTYPE html><html><head><title>Invoice ${inv.id}</title>
  <style>@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');
  *{box-sizing:border-box;margin:0;padding:0}body{font-family:'Outfit',sans-serif;background:#fff;color:#0A0A0F;padding:48px}
  .hdr{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:36px}
  .logo{font-size:24px;font-weight:800}.logo span{color:#D97706}
  .inv-id{font-size:32px;font-weight:800;color:#D97706;text-align:right}
  .badge{display:inline-block;background:#F59E0B;color:#000;padding:4px 14px;border-radius:20px;font-size:12px;font-weight:700;margin-top:6px}
  .divider{height:3px;background:linear-gradient(90deg,#F59E0B,#D97706);border-radius:2px;margin:24px 0}
  .grid{display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-bottom:32px}
  .sec-title{font-size:10px;text-transform:uppercase;letter-spacing:0.1em;color:#999;margin-bottom:10px;font-weight:600}
  .val{font-size:15px;font-weight:500;margin-bottom:3px}
  table{width:100%;border-collapse:collapse;margin-bottom:32px}
  th{background:#F59E0B;color:#000;padding:11px 14px;text-align:left;font-size:12px;font-weight:700}
  td{padding:13px 14px;border-bottom:1px solid #f0f0f0;font-size:14px}
  .tot{font-weight:700;font-size:17px;background:#FFFBF0}
  .footer{text-align:center;margin-top:40px;color:#aaa;font-size:12px;padding-top:20px;border-top:1px solid #f0f0f0}
  @media print{body{padding:24px}}
  </style></head><body>
  <div class="hdr">
    <div><div class="logo">🏜️ Dubai <span>Rovers</span></div>
    <div style="color:#888;font-size:13px;margin-top:6px">Premium Dubai Tour Experiences</div>
    <div style="color:#888;font-size:13px">📞 ${WA} | info@dubairovers.com</div></div>
    <div style="text-align:right"><div class="inv-id">${inv.id}</div><div class="badge">INVOICE</div>
    <div style="color:#888;font-size:13px;margin-top:10px">Issued: ${inv.issuedAt?.split("T")[0]||""}</div>
    <div style="color:#888;font-size:13px">Due: ${inv.dueDate||""}</div></div>
  </div>
  <div class="divider"></div>
  <div class="grid">
    <div><div class="sec-title">Bill To</div>
    <div class="val">${inv.clientName}</div>
    <div style="color:#888;font-size:13px">${inv.clientEmail}</div>
    <div style="color:#888;font-size:13px">${inv.clientPhone}</div></div>
    <div><div class="sec-title">Booking Reference</div>
    <div class="val">${inv.bookingId}</div>
    <div style="color:#888;font-size:13px">Date: ${inv.date}</div>
    <div style="color:#888;font-size:13px">Guests: ${inv.guests}</div></div>
  </div>
  <table><thead><tr><th>Service</th><th>Package</th><th>Guests</th><th>Amount</th></tr></thead>
  <tbody><tr><td>${inv.tour}</td><td>${inv.pkg}</td><td>${inv.guests}</td>
  <td style="font-weight:700;color:#D97706">${inv.currency||"AED"} ${inv.amount}</td></tr>
  ${inv.notes?`<tr><td colspan="3" style="color:#888;font-size:12px">Note: ${inv.notes}</td><td></td></tr>`:""}</tbody>
  <tfoot><tr class="tot"><td colspan="3" style="text-align:right;padding-right:20px">TOTAL DUE</td>
  <td style="color:#D97706;font-size:19px">${inv.currency||"AED"} ${inv.amount}</td></tr></tfoot></table>
  ${inv.status==="paid"?`<div style="text-align:center"><span style="display:inline-block;padding:10px 28px;background:rgba(16,185,129,0.1);border:2px solid #10B981;border-radius:10px;color:#10B981;font-size:16px;font-weight:700">✅ PAID IN FULL</span></div>`:""}
  <div class="footer"><div>Thank you for choosing Dubai Rovers! 🏜️</div>
  <div style="margin-top:4px">Questions: ${WA} | dubairovers.com</div></div>
  </body></html>`)
  w.document.close(); w.focus(); setTimeout(()=>w.print(), 500)
}

// ─────────────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [mounted,   setMounted]   = useState(false)
  const [authed,    setAuthed]    = useState(false)
  const [password,  setPassword]  = useState("")
  const [pwErr,     setPwErr]     = useState("")
  const [tab,       setTab]       = useState("dashboard")
  const [night,     setNight]     = useState(true)
  const [bookings,  setBookings]  = useState(MOCK_BOOKINGS)
  const [blogs,     setBlogs]     = useState(INITIAL_BLOGS)
  const [invoices,  setInvoices]  = useState([])
  const [search,    setSearch]    = useState("")
  const [fStatus,   setFStatus]   = useState("all")
  const [selB,      setSelB]      = useState(null)
  const [notif,     setNotif]     = useState(null)
  const [seoTab,    setSeoTab]    = useState("overview")
  const [blogModal, setBlogModal] = useState(false)
  const [editBlog,  setEditBlog]  = useState(null)
  const [genMode,   setGenMode]   = useState("free")
  const [genLoading,setGenLoading]= useState(false)
  const [genForm,   setGenForm]   = useState({ topic:"", category:"Desert Safari", tourSlug:"desert-safari-dubai", tourName:"Desert Safari Dubai", externalLinks:"", keywords:"", tone:"honest" })
  const [bookStyle,    setBookStyle]    = useState("dark_card")
  const [settings,     setSettings]     = useState({ siteName:"Dubai Rovers", whatsapp:WA, email:"info@dubairovers.com", tagline:"Premium Dubai Tours", currency:"AED" })
  const [pageVis,      setPageVis]      = useState({ attractions:true, flights:true, booking:true, contact:true, about:true })
  const [schemaStatus, setSchemaStatus] = useState({
    TouristAttraction: "active",
    LocalBusiness:     "active",
    FAQPage:           "partial",
    Article:           "missing",
    BreadcrumbList:    "active",
    AggregateRating:   "active",
  })
  const [schemaLoading, setSchemaLoading] = useState("")

  useEffect(() => {
    setMounted(true)
    if (localStorage.getItem("dr_admin_auth")==="true") setAuthed(true)
    // Merge static 42 blogs with any localStorage overrides (hide/show per slug)
    try {
      const overrides = JSON.parse(localStorage.getItem("dr_blog_visibility") || "{}");
      const extra = JSON.parse(localStorage.getItem("dr_blogs_extra") || "[]"); // AI-generated extras
      const merged = [
        ...ALL_BLOGS.map(b => ({ ...b, status: overrides[b.slug] === false ? "hidden" : b.status, views: Math.floor(Math.random()*3000+200), id: b.slug })),
        ...extra
      ];
      setBlogs(merged);
    } catch { setBlogs(ALL_BLOGS.map(b=>({...b,id:b.slug,views:0}))); }
    const n = localStorage.getItem("dr_admin_night"); setNight(n!=="false")
    const bs= localStorage.getItem("dr_booking_style"); if(bs) setBookStyle(bs)
    try { const pv = localStorage.getItem("dr_page_visibility"); if(pv) setPageVis(JSON.parse(pv)) } catch {}
    fetch("/api/invoice").then(r=>r.json()).then(d=>setInvoices(d.invoices||[])).catch(()=>{})
  }, [])

  const saveBlogs = (updated) => {
    setBlogs(updated);
    // Save visibility overrides for static blogs
    const overrides = {};
    updated.forEach(b => {
      const orig = ALL_BLOGS.find(o => o.slug === b.slug);
      if (orig && b.status !== orig.status) overrides[b.slug] = b.status !== "hidden";
      if (!orig) overrides[b.slug] = b.status !== "hidden"; // extra blog
    });
    localStorage.setItem("dr_blog_visibility", JSON.stringify(
      Object.fromEntries(Object.entries(overrides).map(([k,v]) => [k, v ? undefined : false]).filter(([,v]) => v === false))
    ));
    // Save extra (AI-generated) blogs separately
    const extra = updated.filter(b => !ALL_BLOGS.find(o => o.slug === b.slug));
    localStorage.setItem("dr_blogs_extra", JSON.stringify(extra));
  }
  const togglePage = (key) => {
    const updated = { ...pageVis, [key]: !pageVis[key] }
    setPageVis(updated)
    localStorage.setItem("dr_page_visibility", JSON.stringify(updated))
    toast(updated[key] ? `✅ /${key} page is now VISIBLE to visitors` : `🚫 /${key} page is now HIDDEN from visitors`)
  }
  const toast = (msg) => { setNotif(msg); setTimeout(()=>setNotif(null),3500) }
  const login = (e) => { e.preventDefault(); if(password===PW){setAuthed(true);localStorage.setItem("dr_admin_auth","true");setPwErr("")}else{setPwErr("Incorrect password");setPassword("")} }
  const toggleNight = () => { const n=!night; setNight(n); localStorage.setItem("dr_admin_night",String(n)) }

  const T = night ? {
    bg:"#080C14", card:"rgba(255,255,255,0.02)", cardBorder:"rgba(255,255,255,0.06)",
    text:"#fff", sub:"rgba(255,255,255,0.4)", input:"rgba(255,255,255,0.04)", inputBorder:"rgba(255,255,255,0.1)",
    topbar:"rgba(8,12,20,0.98)", row:"rgba(245,158,11,0.04)",
  } : {
    bg:"#F0F4F8", card:"#fff", cardBorder:"rgba(0,0,0,0.08)",
    text:"#1A2744", sub:"rgba(26,39,68,0.5)", input:"#fff", inputBorder:"rgba(0,0,0,0.15)",
    topbar:"rgba(255,255,255,0.97)", row:"rgba(245,158,11,0.06)",
  }

  const IN  = (ex={}) => ({ width:"100%", padding:"10px 14px", background:T.input, border:`1px solid ${T.inputBorder}`, borderRadius:8, color:T.text, fontSize:13, fontFamily:"'Outfit',sans-serif", boxSizing:"border-box", outline:"none", ...ex })
  const LB  = { display:"block", fontSize:11, color:T.sub, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6 }
  const TOT = bookings.filter(b=>b.status!=="cancelled").reduce((s,b)=>s+b.amount,0)
  const PND = bookings.filter(b=>b.status==="pending").length
  const filtBk = bookings.filter(b => {
    const s=search.toLowerCase()
    return (b.name.toLowerCase().includes(s)||b.id.toLowerCase().includes(s)||b.tour.toLowerCase().includes(s))
      && (fStatus==="all"||b.status===fStatus)
  })

  const createInvoice = async (bk) => {
    const inv = { bookingId:bk.id, clientName:bk.name, clientEmail:bk.email, clientPhone:bk.phone, tour:bk.tour, pkg:bk.pkg, date:bk.date, guests:bk.guests, amount:bk.amount, currency:"AED", status:"unpaid", notes:"", issuedAt:new Date().toISOString(), dueDate:new Date(Date.now()+7*86400000).toISOString().split("T")[0], id:`INV-${Date.now()}` }
    try {
      const res = await fetch("/api/invoice",{ method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(inv) })
      const d = await res.json()
      if (d.success) setInvoices(d.invoices)
      else setInvoices(p=>[inv,...p])
    } catch { setInvoices(p=>[inv,...p]) }
    toast("✅ Invoice created!")
  }

  const sendInvoiceWA = (inv) => {
    const msg = `Hi ${inv.clientName.split(" ")[0]}! 👋\n\nYour Dubai Rovers invoice:\n📋 ${inv.id}\n🏜️ ${inv.tour} — ${inv.pkg}\n📅 Date: ${inv.date}\n💰 Amount: ${inv.currency} ${inv.amount}\n\nThank you! 🌟\ndubairovers.com`
    window.open(`https://wa.me/${inv.clientPhone.replace(/\D/g,"")}?text=${encodeURIComponent(msg)}`,"_blank")
  }

  const autoFixSchema = async (action, schemaKey) => {
    setSchemaLoading(schemaKey)
    try {
      const res = await fetch("/api/schema", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action })
      })
      const d = await res.json()
      if (d.success) {
        setSchemaStatus(p => ({ ...p, [schemaKey]: "active" }))
        const pages = action === "add_faq" ? "all 6 tour pages" : "all blog posts"
        toast(`✅ ${schemaKey} schema added to ${pages}! Live on site immediately.`)
      } else {
        toast("❌ " + d.error)
      }
    } catch (err) {
      toast("❌ " + err.message)
    }
    setSchemaLoading("")
  }

  const genBlog = async () => {
    if (!genForm.topic) { toast("⚠️ Enter a topic first"); return }
    setGenLoading(true)
    try {
      const res = await fetch("/api/generate-blog",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...genForm,mode:genMode})})
      const d = await res.json()
      if(d.success){ saveBlogs([...blogs,d.post]); setBlogModal(false); setGenForm(f=>({...f,topic:""})); toast("✅ Blog generated as draft!") }
      else toast("❌ "+d.error)
    } catch(e){ toast("❌ "+e.message) }
    setGenLoading(false)
  }

  // ── ADMIN TABS — no client portal ─────────────────────────────────────────
  const TABS = [
    { id:"dashboard",     label:"Dashboard",       icon:"📊" },
    { id:"bookings",      label:"Bookings",        icon:"📋" },
    { id:"invoices",      label:"Invoices",        icon:"🧾" },
    { id:"blogs",         label:"Blog Manager",    icon:"📝" },
    { id:"booking_forms", label:"Booking Forms",   icon:"📄" },
    { id:"seo",           label:"SEO Dashboard",   icon:"📈" },
    { id:"seo_pro",       label:"SEO Pro",          icon:"🚀" },
    { id:"api_setup",     label:"API Setup Guide",  icon:"🔌" },
    { id:"attractions",   label:"Attractions",     icon:"🎟️" },
    { id:"settings",      label:"Settings",        icon:"⚙️" },
    { id:"page_builder",  label:"Page Builder",   icon:"🏗️" },
  ]

  // ── LOGIN ──────────────────────────────────────────────────────────────────
  // Mount guard: prevents hydration mismatch between server (no localStorage) and client
  if (!mounted) return null

  if (!authed) return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#0A0A0F,#0F1A2E)", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Outfit',sans-serif" }}>
      <style suppressHydrationWarning>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Playfair+Display:wght@700&display=swap');input:focus{outline:none;border-color:rgba(245,158,11,0.5)!important;box-shadow:0 0 0 3px rgba(245,158,11,0.08)!important}`}</style>
      <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:24, padding:"48px 40px", width:"100%", maxWidth:420 }}>
        <div style={{ textAlign:"center", marginBottom:36 }}>
          <div style={{ fontSize:48, marginBottom:12 }}>🏜️</div>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:28, color:"#F59E0B", fontWeight:700 }}>Dubai Rovers</div>
          <div style={{ color:"rgba(255,255,255,0.4)", fontSize:14, marginTop:4 }}>Admin Control Panel</div>
        </div>
        <form onSubmit={login}>
          <label style={{ color:"rgba(255,255,255,0.4)", fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", display:"block", marginBottom:8 }}>Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter admin password..."
            style={{ width:"100%", padding:"14px 16px", background:"rgba(255,255,255,0.05)", border:`1px solid ${pwErr?"#EF4444":"rgba(245,158,11,0.2)"}`, borderRadius:10, color:"#fff", fontSize:15, outline:"none", boxSizing:"border-box", marginBottom:8, fontFamily:"'Outfit',sans-serif" }} />
          {pwErr&&<div style={{ color:"#EF4444", fontSize:13, marginBottom:12 }}>⚠️ {pwErr}</div>}
          <button type="submit" style={{ width:"100%", padding:"14px", background:"linear-gradient(135deg,#F59E0B,#D97706)", border:"none", borderRadius:10, color:"#000", fontWeight:700, fontSize:15, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>🔐 Login</button>
        </form>
        <div style={{ textAlign:"center", marginTop:16 }}><Link href="/" style={{ color:"rgba(255,255,255,0.3)", fontSize:13, textDecoration:"none" }}>← Back to Website</Link></div>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight:"100vh", background:T.bg, fontFamily:"'Outfit',sans-serif", color:T.text, display:"flex", transition:"background 0.3s" }}>
      <style suppressHydrationWarning>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap');
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-thumb{background:rgba(245,158,11,0.3);border-radius:10px}
        .tb:hover{background:rgba(245,158,11,0.08)!important}
        .hr:hover{background:${T.row}!important}
        .ab:hover{transform:translateY(-1px);filter:brightness(1.1)}
        input:focus,select:focus,textarea:focus{border-color:rgba(245,158,11,0.5)!important;box-shadow:0 0 0 3px rgba(245,158,11,0.08)!important;outline:none!important}
        @keyframes si{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
        @keyframes ni{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:none}}
        .ni{animation:ni .3s ease}
        select option{background:#0D1220;color:#fff}
        .stb:hover{background:rgba(245,158,11,0.08)!important}
        .bsc:hover{border-color:rgba(245,158,11,0.5)!important;transform:translateY(-2px)}
      `}</style>

      {/* ══ SIDEBAR ══ */}
      <div style={{ width:240, background:night?"linear-gradient(180deg,#0D1220,#080C14)":"linear-gradient(180deg,#1A2744,#0F1A2E)", borderRight:`1px solid ${night?"rgba(245,158,11,0.1)":"rgba(245,158,11,0.2)"}`, display:"flex", flexDirection:"column", position:"fixed", top:0, left:0, bottom:0, zIndex:100 }}>
        <div style={{ padding:"22px 20px 14px" }}>
          <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, color:"#F59E0B", fontWeight:700 }}>🏜️ Dubai Rovers</div>
          <div style={{ color:"rgba(255,255,255,0.3)", fontSize:11, marginTop:2, letterSpacing:"0.1em", textTransform:"uppercase" }}>Admin Panel</div>
        </div>
        <div style={{ padding:"0 10px", flex:1, overflow:"auto" }}>
          {TABS.map(t=>(
            <button key={t.id} className="tb" onClick={()=>setTab(t.id)} style={{ width:"100%", padding:"10px 13px", borderRadius:9, border:"none", background:tab===t.id?"rgba(245,158,11,0.12)":"transparent", color:tab===t.id?"#F59E0B":"rgba(255,255,255,0.5)", textAlign:"left", cursor:"pointer", fontSize:13, fontWeight:tab===t.id?600:400, display:"flex", alignItems:"center", gap:9, marginBottom:3, transition:"all 0.15s", fontFamily:"'Outfit',sans-serif", borderLeft:tab===t.id?"2px solid #F59E0B":"2px solid transparent" }}>
              <span style={{ fontSize:15 }}>{t.icon}</span>{t.label}
              {t.id==="invoices"&&invoices.filter(i=>i.status==="unpaid").length>0&&<span style={{ marginLeft:"auto",fontSize:9,background:"rgba(245,158,11,0.2)",color:"#F59E0B",padding:"2px 6px",borderRadius:4 }}>{invoices.filter(i=>i.status==="unpaid").length}</span>}
              {t.id==="bookings"&&PND>0&&<span style={{ marginLeft:"auto",fontSize:9,background:"rgba(239,68,68,0.2)",color:"#EF4444",padding:"2px 6px",borderRadius:4 }}>{PND}</span>}
            </button>
          ))}
          <div style={{ height:1,background:"rgba(255,255,255,0.06)",margin:"8px 0" }} />
          {/* Visual Editor - owner/employee tool only */}
          <button className="tb" onClick={()=>window.open("/admin/editor","_blank")} style={{ width:"100%", padding:"10px 13px", borderRadius:9, border:"1px solid rgba(245,158,11,0.2)", background:"rgba(245,158,11,0.06)", color:"#F59E0B", textAlign:"left", cursor:"pointer", fontSize:13, fontWeight:600, display:"flex", alignItems:"center", gap:9, fontFamily:"'Outfit',sans-serif" }}>
            <span style={{ fontSize:15 }}>🎨</span>Visual Editor
            <span style={{ marginLeft:"auto",fontSize:9,background:"rgba(245,158,11,0.2)",padding:"2px 5px",borderRadius:4 }}>↗</span>
          </button>
        </div>
        <div style={{ padding:"14px 10px 20px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display:"flex",gap:6 }}>
            <Link href="/" target="_blank" style={{ flex:1,padding:"7px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.07)",borderRadius:7,color:"rgba(255,255,255,0.4)",textDecoration:"none",fontSize:11,textAlign:"center",display:"block" }}>🌐 View Site</Link>
            <button onClick={()=>{setAuthed(false);localStorage.removeItem("dr_admin_auth")}} style={{ flex:1,padding:"7px",background:"rgba(239,68,68,0.07)",border:"1px solid rgba(239,68,68,0.2)",borderRadius:7,color:"#EF4444",fontSize:11,cursor:"pointer",fontFamily:"'Outfit',sans-serif" }}>🚪 Logout</button>
          </div>
        </div>
      </div>

      {/* ══ MAIN ══ */}
      <div style={{ marginLeft:240, flex:1 }}>

        {/* TOP BAR */}
        <div style={{ padding:"14px 26px", borderBottom:`1px solid ${T.cardBorder}`, display:"flex", alignItems:"center", justifyContent:"space-between", background:T.topbar, position:"sticky", top:0, zIndex:50, backdropFilter:"blur(12px)" }}>
          <div>
            <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700 }}>{TABS.find(t=>t.id===tab)?.icon} {TABS.find(t=>t.id===tab)?.label}</div>
            <div style={{ color:T.sub, fontSize:12, marginTop:1 }}>{new Date().toLocaleDateString("en-AE",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</div>
          </div>

          {/* ☀️🌙 DAY / NIGHT — top center */}
          <div onClick={toggleNight} style={{ display:"flex",alignItems:"center",gap:8,background:night?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.06)",border:`1px solid ${night?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)"}`,borderRadius:24,padding:"5px 14px",cursor:"pointer",userSelect:"none" }}>
            <span style={{ fontSize:14,opacity:night?0.4:1 }}>☀️</span>
            <div style={{ width:44,height:24,borderRadius:12,background:night?"rgba(245,158,11,0.3)":"rgba(245,158,11,0.15)",border:`1px solid ${night?"rgba(245,158,11,0.5)":"rgba(245,158,11,0.2)"}`,position:"relative",transition:"background 0.3s" }}>
              <div style={{ width:18,height:18,borderRadius:"50%",background:"#F59E0B",position:"absolute",top:2,left:night?23:2,transition:"left 0.3s",boxShadow:"0 2px 8px rgba(245,158,11,0.4)" }} />
            </div>
            <span style={{ fontSize:14,opacity:night?1:0.4 }}>🌙</span>
            <span style={{ fontSize:12,color:T.sub,fontWeight:600 }}>{night?"Night":"Day"}</span>
          </div>

          <div style={{ display:"flex",gap:8 }}>
            {PND>0&&<div style={{ padding:"6px 12px",background:"rgba(245,158,11,0.08)",border:"1px solid rgba(245,158,11,0.2)",borderRadius:7,fontSize:12,color:"#F59E0B" }}>⏳ {PND} Pending</div>}
            <button onClick={()=>window.open("/admin/editor","_blank")} style={{ padding:"7px 14px",background:"linear-gradient(135deg,#F59E0B,#D97706)",border:"none",borderRadius:8,color:"#000",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"'Outfit',sans-serif" }}>🎨 Visual Editor</button>
          </div>
        </div>

        <div style={{ padding:22, animation:"si 0.3s ease" }}>

          {/* ══ DASHBOARD ══ */}
          {tab==="dashboard"&&(
            <div>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:13,marginBottom:20 }}>
                {[
                  {l:"Total Bookings",v:bookings.length,        ch:"+12%",ic:"📋",c:"245,158,11"},
                  {l:"Revenue (AED)", v:TOT.toLocaleString(),   ch:"+18%",ic:"💰",c:"16,185,129"},
                  {l:"Invoices",      v:invoices.length,         ch:"total",ic:"🧾",c:"99,102,241"},
                  {l:"Blog Posts",    v:blogs.filter(b=>b.status==="published").length,ch:"published",ic:"📝",c:"236,72,153"},
                ].map((s,i)=>(
                  <div key={i} style={{ background:T.card,border:`1px solid rgba(${s.c},0.2)`,borderRadius:15,padding:"16px 18px" }}>
                    <div style={{ display:"flex",justifyContent:"space-between" }}>
                      <div>
                        <div style={{ color:T.sub,fontSize:10,fontWeight:600,letterSpacing:"0.08em",textTransform:"uppercase" }}>{s.l}</div>
                        <div style={{ fontFamily:"'Playfair Display',serif",fontSize:28,fontWeight:700,color:T.text,marginTop:4 }}>{s.v}</div>
                        <div style={{ fontSize:12,color:`rgb(${s.c})`,marginTop:2 }}>↑ {s.ch}</div>
                      </div>
                      <span style={{ fontSize:26,opacity:0.6 }}>{s.ic}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:16 }}>
                <div style={{ background:T.card,border:`1px solid ${T.cardBorder}`,borderRadius:15,padding:18 }}>
                  <div style={{ fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,marginBottom:14 }}>📈 Tour Revenue</div>
                  {TOURS.map((t,i)=>{ const p=(t.revenue/Math.max(...TOURS.map(x=>x.revenue)))*100; return(
                    <div key={i} style={{ marginBottom:10 }}>
                      <div style={{ display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3 }}><span>{t.icon} {t.name}</span><span style={{ color:"#F59E0B",fontWeight:600 }}>AED {t.revenue.toLocaleString()}</span></div>
                      <div style={{ height:5,background:night?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.06)",borderRadius:3 }}><div style={{ height:"100%",width:`${p}%`,background:"linear-gradient(90deg,#F59E0B,#D97706)",borderRadius:3 }} /></div>
                    </div>
                  )})}
                </div>
                <div style={{ background:T.card,border:`1px solid ${T.cardBorder}`,borderRadius:15,padding:18 }}>
                  <div style={{ fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,marginBottom:14 }}>📋 Recent Bookings</div>
                  {bookings.slice(0,5).map((b,i)=>{ const sc=SC[b.status]; return(
                    <div key={i} className="hr" onClick={()=>{setSelB(b);setTab("bookings")}} style={{ display:"flex",gap:10,padding:"8px 6px",borderBottom:i<4?`1px solid ${T.cardBorder}`:"none",cursor:"pointer",borderRadius:7,transition:"background 0.15s" }}>
                      <div style={{ width:28,height:28,borderRadius:7,background:"rgba(245,158,11,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,flexShrink:0 }}>{TOURS.find(t=>t.name===b.tour)?.icon||"🏜️"}</div>
                      <div style={{ flex:1 }}><div style={{ fontSize:13,fontWeight:500 }}>{b.name}</div><div style={{ fontSize:11,color:T.sub,marginTop:1 }}>{b.tour} • {b.date}</div></div>
                      <span style={{ padding:"2px 7px",borderRadius:5,fontSize:10,fontWeight:600,background:sc.bg,color:sc.text,border:`1px solid ${sc.border}`,textTransform:"capitalize",alignSelf:"center" }}>{b.status}</span>
                    </div>
                  )})}
                </div>
              </div>
            </div>
          )}

          {/* ══ BOOKINGS ══ */}
          {tab==="bookings"&&(
            <div>
              <div style={{ display:"flex",gap:9,marginBottom:16 }}>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search name, ID, tour..." style={IN()} />
                <select value={fStatus} onChange={e=>setFStatus(e.target.value)} style={{...IN(),width:"auto"}}>
                  <option value="all">All Status</option><option value="confirmed">Confirmed</option><option value="pending">Pending</option><option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div style={{ background:T.card,border:`1px solid ${T.cardBorder}`,borderRadius:15,overflow:"hidden" }}>
                <table style={{ width:"100%",borderCollapse:"collapse" }}>
                  <thead><tr style={{ borderBottom:`1px solid ${T.cardBorder}` }}>{["ID","Guest","Tour","Date","Guests","Amount","Status","Actions"].map(h=><th key={h} style={{ padding:"11px 13px",textAlign:"left",fontSize:10,fontWeight:600,color:T.sub,letterSpacing:"0.1em",textTransform:"uppercase" }}>{h}</th>)}</tr></thead>
                  <tbody>
                    {filtBk.map((b,i)=>{ const sc=SC[b.status]; return(
                      <tr key={b.id} className="hr" onClick={()=>setSelB(selB?.id===b.id?null:b)} style={{ borderBottom:`1px solid ${T.cardBorder}`,cursor:"pointer",transition:"background 0.15s" }}>
                        <td style={{ padding:"10px 13px",fontSize:12,color:"#F59E0B",fontWeight:600 }}>{b.id}</td>
                        <td style={{ padding:"10px 13px" }}><div style={{ fontSize:13,fontWeight:500 }}>{b.name}</div><div style={{ fontSize:11,color:T.sub }}>{b.phone}</div></td>
                        <td style={{ padding:"10px 13px",fontSize:12 }}>{TOURS.find(t=>t.name===b.tour)?.icon} {b.tour}</td>
                        <td style={{ padding:"10px 13px",fontSize:12,color:T.sub }}>{b.date}</td>
                        <td style={{ padding:"10px 13px",fontSize:13,textAlign:"center" }}>{b.guests}</td>
                        <td style={{ padding:"10px 13px",fontSize:13,fontWeight:700,color:"#F59E0B" }}>AED {b.amount}</td>
                        <td style={{ padding:"10px 13px" }}><span style={{ padding:"3px 8px",borderRadius:5,fontSize:11,fontWeight:600,background:sc.bg,color:sc.text,border:`1px solid ${sc.border}`,textTransform:"capitalize" }}>{b.status}</span></td>
                        <td style={{ padding:"10px 13px" }}>
                          <div style={{ display:"flex",gap:4 }}>
                            <button className="ab" onClick={e=>{e.stopPropagation();setBookings(p=>p.map(x=>x.id===b.id?{...x,status:"confirmed"}:x));setSelB(null);toast("✅ Confirmed")}} style={{ padding:"4px 7px",background:"rgba(16,185,129,0.1)",border:"1px solid rgba(16,185,129,0.2)",borderRadius:5,cursor:"pointer",color:"#10B981",fontSize:12,transition:"all 0.15s" }}>✓</button>
                            <button className="ab" onClick={e=>{e.stopPropagation();setBookings(p=>p.map(x=>x.id===b.id?{...x,status:"cancelled"}:x));setSelB(null);toast("Cancelled")}} style={{ padding:"4px 7px",background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.2)",borderRadius:5,cursor:"pointer",color:"#EF4444",fontSize:12,transition:"all 0.15s" }}>✕</button>
                            <button className="ab" onClick={e=>{e.stopPropagation();createInvoice(b)}} title="Create Invoice" style={{ padding:"4px 7px",background:"rgba(99,102,241,0.1)",border:"1px solid rgba(99,102,241,0.2)",borderRadius:5,cursor:"pointer",color:"#818CF8",fontSize:12,transition:"all 0.15s" }}>🧾</button>
                            <a href={`https://wa.me/${b.phone.replace(/\D/g,"")}?text=Hi ${b.name.split(" ")[0]}! Booking ${b.id} confirmed ✅`} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{ padding:"4px 7px",background:"rgba(37,211,102,0.1)",border:"1px solid rgba(37,211,102,0.2)",borderRadius:5,color:"#25D366",fontSize:12,textDecoration:"none",display:"flex",alignItems:"center" }}>💬</a>
                          </div>
                        </td>
                      </tr>
                    )})}
                  </tbody>
                </table>
              </div>
              {selB&&(
                <div style={{ marginTop:13,background:night?"rgba(245,158,11,0.03)":"rgba(245,158,11,0.05)",border:"1px solid rgba(245,158,11,0.2)",borderRadius:13,padding:16,animation:"si 0.2s ease" }}>
                  <div style={{ display:"flex",justifyContent:"space-between",marginBottom:12 }}>
                    <div style={{ fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700 }}>📋 {selB.id} — {selB.name}</div>
                    <button onClick={()=>setSelB(null)} style={{ background:"none",border:"none",color:T.sub,fontSize:16,cursor:"pointer" }}>✕</button>
                  </div>
                  <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:9,marginBottom:13 }}>
                    {[{l:"Guest",v:selB.name},{l:"Email",v:selB.email},{l:"Phone",v:selB.phone},{l:"Tour",v:selB.tour},{l:"Package",v:selB.pkg},{l:"Date",v:selB.date},{l:"Guests",v:selB.guests},{l:"Amount",v:`AED ${selB.amount}`},{l:"Status",v:selB.status}].map((f,i)=>(
                      <div key={i} style={{ background:night?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.04)",borderRadius:8,padding:"9px 11px" }}>
                        <div style={{ fontSize:10,color:T.sub,textTransform:"uppercase",marginBottom:2 }}>{f.l}</div>
                        <div style={{ fontSize:13,fontWeight:500,color:f.l==="Amount"?"#F59E0B":T.text }}>{f.v}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display:"flex",gap:7 }}>
                    <button onClick={()=>{setBookings(p=>p.map(b=>b.id===selB.id?{...b,status:"confirmed"}:b));setSelB(null);toast("✅ Confirmed")}} style={{ padding:"8px 14px",background:"rgba(16,185,129,0.15)",border:"1px solid rgba(16,185,129,0.3)",borderRadius:7,color:"#10B981",cursor:"pointer",fontFamily:"'Outfit',sans-serif",fontWeight:600,fontSize:12 }}>✅ Confirm</button>
                    <button onClick={()=>{setBookings(p=>p.map(b=>b.id===selB.id?{...b,status:"cancelled"}:b));setSelB(null);toast("Cancelled")}} style={{ padding:"8px 14px",background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.2)",borderRadius:7,color:"#EF4444",cursor:"pointer",fontFamily:"'Outfit',sans-serif",fontWeight:600,fontSize:12 }}>❌ Cancel</button>
                    <button onClick={()=>createInvoice(selB)} style={{ padding:"8px 14px",background:"rgba(99,102,241,0.1)",border:"1px solid rgba(99,102,241,0.2)",borderRadius:7,color:"#818CF8",cursor:"pointer",fontFamily:"'Outfit',sans-serif",fontWeight:600,fontSize:12 }}>🧾 Create Invoice</button>
                    <a href={`https://wa.me/${selB.phone.replace(/\D/g,"")}?text=Hi ${selB.name.split(" ")[0]}! Booking ${selB.id} confirmed ✅`} target="_blank" rel="noopener noreferrer" style={{ padding:"8px 14px",background:"rgba(37,211,102,0.1)",border:"1px solid rgba(37,211,102,0.3)",borderRadius:7,color:"#25D366",textDecoration:"none",fontWeight:600,fontSize:12,display:"flex",alignItems:"center",gap:5 }}>💬 WhatsApp</a>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ══ INVOICES ══ */}
          {tab==="invoices"&&(
            <div>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16 }}>
                <div style={{ fontFamily:"'Playfair Display',serif",fontSize:19,fontWeight:700 }}>🧾 Invoices</div>
                <div style={{ fontSize:13,color:T.sub }}>{invoices.filter(i=>i.status==="unpaid").length} unpaid · {invoices.filter(i=>i.status==="paid").length} paid</div>
              </div>
              {invoices.length===0?(
                <div style={{ textAlign:"center",padding:"48px 20px",background:T.card,border:`1px solid ${T.cardBorder}`,borderRadius:16 }}>
                  <div style={{ fontSize:48,marginBottom:12,opacity:0.3 }}>🧾</div>
                  <div style={{ fontSize:16,fontWeight:600,marginBottom:6 }}>No invoices yet</div>
                  <div style={{ color:T.sub,fontSize:14 }}>Go to Bookings → click 🧾 on any booking to generate an invoice</div>
                </div>
              ):(
                <div style={{ background:T.card,border:`1px solid ${T.cardBorder}`,borderRadius:15,overflow:"hidden" }}>
                  <table style={{ width:"100%",borderCollapse:"collapse" }}>
                    <thead><tr style={{ borderBottom:`1px solid ${T.cardBorder}` }}>{["Invoice","Client","Tour","Issued","Amount","Status","Actions"].map(h=><th key={h} style={{ padding:"11px 13px",textAlign:"left",fontSize:10,fontWeight:600,color:T.sub,letterSpacing:"0.1em",textTransform:"uppercase" }}>{h}</th>)}</tr></thead>
                    <tbody>
                      {invoices.map((inv,i)=>{ const sc=SC[inv.status]||SC.unpaid; return(
                        <tr key={inv.id} className="hr" style={{ borderBottom:`1px solid ${T.cardBorder}`,transition:"background 0.15s" }}>
                          <td style={{ padding:"10px 13px",fontSize:12,color:"#F59E0B",fontWeight:600 }}>{inv.id}</td>
                          <td style={{ padding:"10px 13px" }}><div style={{ fontSize:13,fontWeight:500 }}>{inv.clientName}</div><div style={{ fontSize:11,color:T.sub }}>{inv.clientEmail}</div></td>
                          <td style={{ padding:"10px 13px",fontSize:12 }}>{inv.tour}</td>
                          <td style={{ padding:"10px 13px",fontSize:12,color:T.sub }}>{inv.issuedAt?.split("T")[0]}</td>
                          <td style={{ padding:"10px 13px",fontSize:13,fontWeight:700,color:"#F59E0B" }}>{inv.currency||"AED"} {inv.amount}</td>
                          <td style={{ padding:"10px 13px" }}>
                            <select value={inv.status} onChange={e=>setInvoices(p=>p.map(x=>x.id===inv.id?{...x,status:e.target.value}:x))} style={{ padding:"3px 9px",background:sc.bg,border:`1px solid ${sc.border}`,borderRadius:5,color:sc.text,fontSize:11,cursor:"pointer",fontFamily:"'Outfit',sans-serif",fontWeight:600 }}>
                              <option value="unpaid">Unpaid</option><option value="paid">Paid</option><option value="sent">Sent</option>
                            </select>
                          </td>
                          <td style={{ padding:"10px 13px" }}>
                            <div style={{ display:"flex",gap:4 }}>
                              <button className="ab" onClick={()=>printInvoice(inv)} title="Print / PDF" style={{ padding:"5px 9px",background:"rgba(245,158,11,0.1)",border:"1px solid rgba(245,158,11,0.2)",borderRadius:5,cursor:"pointer",color:"#F59E0B",fontSize:13,transition:"all 0.15s" }}>🖨️</button>
                              <button className="ab" onClick={()=>sendInvoiceWA(inv)} title="Send via WhatsApp" style={{ padding:"5px 9px",background:"rgba(37,211,102,0.1)",border:"1px solid rgba(37,211,102,0.2)",borderRadius:5,cursor:"pointer",color:"#25D366",fontSize:13,transition:"all 0.15s" }}>💬</button>
                              <button className="ab" onClick={()=>{setInvoices(p=>p.filter(x=>x.id!==inv.id));toast("Deleted")}} style={{ padding:"5px 9px",background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.2)",borderRadius:5,cursor:"pointer",color:"#EF4444",fontSize:13,transition:"all 0.15s" }}>🗑️</button>
                            </div>
                          </td>
                        </tr>
                      )})}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ══ BLOG MANAGER ══ */}
          {tab==="blogs"&&(
            <div>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16 }}>
                <div>
                  <div style={{ fontFamily:"'Playfair Display',serif",fontSize:19,fontWeight:700 }}>📝 Blog Manager</div>
                  <div style={{ fontSize:12,color:T.sub,marginTop:3 }}>{ALL_BLOGS.length} total · {ALL_BLOGS.filter(b=>{try{const ov=JSON.parse(localStorage.getItem("dr_blog_statuses")||"{}");return(ov[b.slug]||b.status)==="published"}catch{return b.status==="published"}}).length} published · {ALL_BLOGS.filter(b=>{try{const ov=JSON.parse(localStorage.getItem("dr_blog_statuses")||"{}");return(ov[b.slug]||b.status)==="draft"}catch{return b.status==="draft"}}).length} drafts</div>
                </div>
                <Link href="/blog" target="_blank" style={{ padding:"7px 13px",background:T.card,border:`1px solid ${T.cardBorder}`,borderRadius:8,color:T.sub,textDecoration:"none",fontSize:12 }}>🌐 View Blog</Link>
              </div>
              <BlogPublisher allBlogs={ALL_BLOGS} />
            </div>
          )}

                    {/* ══ BOOKING FORM STYLES ══ */}
          {tab==="booking_forms"&&(
            <div>
              <div style={{ fontFamily:"'Playfair Display',serif",fontSize:19,fontWeight:700,marginBottom:6 }}>📄 Booking Form Style</div>
              <div style={{ color:T.sub,fontSize:13,marginBottom:18 }}>Same fields for every style — just pick the visual look.</div>
              <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:22 }}>
                {BOOKING_FORM_STYLES.map(s=>(
                  <div key={s.id} className="bsc" onClick={()=>{setBookStyle(s.id);localStorage.setItem("dr_booking_style",s.id);toast("✅ Style updated!")}} style={{ background:T.card,border:`2px solid ${bookStyle===s.id?"#F59E0B":T.cardBorder}`,borderRadius:14,overflow:"hidden",cursor:"pointer",transition:"all 0.2s" }}>
                    <div style={{ height:72,background:s.preview,display:"flex",alignItems:"center",justifyContent:"center",position:"relative" }}>
                      {bookStyle===s.id&&<div style={{ position:"absolute",top:7,right:7,background:"#F59E0B",borderRadius:"50%",width:20,height:20,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,color:"#000" }}>✓</div>}
                      <div style={{ width:55,height:35,background:"rgba(255,255,255,0.1)",borderRadius:6,border:"1px solid rgba(255,255,255,0.2)" }} />
                    </div>
                    <div style={{ padding:"11px 13px" }}>
                      <div style={{ fontSize:13,fontWeight:600,color:T.text,marginBottom:3 }}>{s.label}</div>
                      <div style={{ fontSize:11,color:T.sub,lineHeight:1.5 }}>{s.desc}</div>
                      {bookStyle===s.id&&<div style={{ marginTop:6,fontSize:11,color:"#F59E0B",fontWeight:600 }}>✅ Currently Active</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══ SEO DASHBOARD — ALL 10 TABS ══ */}
          {tab==="seo"&&(
            <div>
              {/* 10 sub-tabs */}
              <div style={{ display:"flex",gap:5,marginBottom:20,flexWrap:"wrap" }}>
                {[
                  {id:"overview",    label:"📊 Overview"},
                  {id:"rankings",    label:"📍 Rankings"},
                  {id:"keywords",    label:"🔑 Keywords"},
                  {id:"speed",       label:"⚡ Page Speed"},
                  {id:"humanize",    label:"🧠 Humanize"},
                  {id:"plagiarism",  label:"🔍 Plagiarism"},
                  {id:"competitors", label:"🥊 Competitors"},
                  {id:"schema",      label:"🔧 Schema"},
                  {id:"alttags",     label:"🖼️ Alt Tags"},
                  {id:"tips",        label:"💡 Daily Tips"},
                ].map(st=>(
                  <button key={st.id} className="stb" onClick={()=>setSeoTab(st.id)} style={{ padding:"7px 12px",background:seoTab===st.id?"rgba(245,158,11,0.12)":night?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.05)",border:`1px solid ${seoTab===st.id?"rgba(245,158,11,0.3)":T.cardBorder}`,borderRadius:8,color:seoTab===st.id?"#F59E0B":T.sub,fontSize:12,cursor:"pointer",fontFamily:"'Outfit',sans-serif",fontWeight:seoTab===st.id?600:400,transition:"all 0.15s",whiteSpace:"nowrap" }}>{st.label}</button>
                ))}
              </div>

              {/* 1. OVERVIEW */}
              {seoTab==="overview"&&(
                <div>
                  <div style={{ display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:13,marginBottom:20 }}>
                    {[{l:"Total Clicks",v:"2,256",c:"16,185,129"},{l:"Impressions",v:"36,220",c:"245,158,11"},{l:"Avg Position",v:"18.4",c:"99,102,241"},{l:"Avg CTR",v:"5.6%",c:"236,72,153"}].map((s,i)=>(
                      <div key={i} style={{ background:T.card,border:`1px solid rgba(${s.c},0.2)`,borderRadius:14,padding:"16px 18px" }}>
                        <div style={{ color:T.sub,fontSize:10,textTransform:"uppercase",letterSpacing:"0.08em" }}>{s.l}</div>
                        <div style={{ fontFamily:"'Playfair Display',serif",fontSize:26,fontWeight:700,margin:"5px 0 3px" }}>{s.v}</div>
                        <div style={{ fontSize:12,color:`rgb(${s.c})` }}>↑ vs last month</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background:T.card,border:`1px solid ${T.cardBorder}`,borderRadius:14,padding:20 }}>
                    <div style={{ fontFamily:"'Playfair Display',serif",fontSize:16,fontWeight:700,marginBottom:14 }}>📅 Today's Priority Actions</div>
                    {[
                      {ic:"🔴",txt:"Desert Safari dropped #8→#14 — add 3 FAQ questions + 400 words of content",a:"Fix Now"},
                      {ic:"🔴",txt:"3 images on Dhow Cruise page missing alt tags — hurting image search rank",a:"Fix Now"},
                      {ic:"🟡",txt:"Homepage meta description 168 chars (too long) — shorten to 155",a:"Edit Meta"},
                      {ic:"🟡",txt:"Quad Bike page speed 90 on mobile — compress hero image",a:"Fix Speed"},
                      {ic:"🟢",txt:"Hot Air Balloon at #8 — get 2-3 backlinks to push top 5",a:"Build Links"},
                      {ic:"🟢",txt:"Add Article schema to all 3 blog posts to improve CTR",a:"Add Schema"},
                    ].map((t,i)=>(
                      <div key={i} style={{ display:"flex",gap:12,padding:"11px 0",borderBottom:i<5?`1px solid ${T.cardBorder}`:"none",alignItems:"flex-start" }}>
                        <span style={{ fontSize:16,flexShrink:0 }}>{t.ic}</span>
                        <div style={{ flex:1,fontSize:13,color:T.sub,lineHeight:1.5 }}>{t.txt}</div>
                        <button style={{ padding:"4px 10px",background:"rgba(245,158,11,0.1)",border:"1px solid rgba(245,158,11,0.2)",borderRadius:6,color:"#F59E0B",cursor:"pointer",fontSize:11,fontFamily:"'Outfit',sans-serif",whiteSpace:"nowrap" }}>{t.a}</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. RANKINGS */}
              {seoTab==="rankings"&&(
                <div style={{ background:T.card,border:`1px solid ${T.cardBorder}`,borderRadius:15,overflow:"hidden" }}>
                  <table style={{ width:"100%",borderCollapse:"collapse" }}>
                    <thead><tr style={{ borderBottom:`1px solid ${T.cardBorder}` }}>{["Page","Position","Change","Clicks","Impressions","CTR","Suggestion"].map(h=><th key={h} style={{ padding:"12px 13px",textAlign:"left",fontSize:10,fontWeight:600,color:T.sub,letterSpacing:"0.1em",textTransform:"uppercase" }}>{h}</th>)}</tr></thead>
                    <tbody>
                      {SEO_PAGES.map((p,i)=>{ const up=p.pos<p.prev; return(
                        <tr key={i} className="hr" style={{ borderBottom:`1px solid ${T.cardBorder}`,transition:"background 0.15s" }}>
                          <td style={{ padding:"11px 13px" }}><Link href={p.url} target="_blank" style={{ color:T.text,textDecoration:"none",fontSize:13,fontWeight:500 }}>{p.page}</Link></td>
                          <td style={{ padding:"11px 13px" }}><span style={{ fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:p.pos<=10?"#10B981":p.pos<=20?"#F59E0B":"#EF4444" }}>#{p.pos}</span></td>
                          <td style={{ padding:"11px 13px",color:up?"#10B981":"#EF4444",fontWeight:600,fontSize:13 }}>{up?"↑":"↓"}{Math.abs(p.prev-p.pos)}</td>
                          <td style={{ padding:"11px 13px",color:"#F59E0B",fontWeight:600,fontSize:13 }}>{p.clicks}</td>
                          <td style={{ padding:"11px 13px",fontSize:12,color:T.sub }}>{p.imp.toLocaleString()}</td>
                          <td style={{ padding:"11px 13px",fontSize:12 }}>{p.ctr}</td>
                          <td style={{ padding:"11px 13px",fontSize:12,color:T.sub }}>{p.pos>20?"Add FAQs + more content":p.pos>10?"Get backlinks":"✅ Maintain position"}</td>
                        </tr>
                      )})}
                    </tbody>
                  </table>
                </div>
              )}

              {/* 3. KEYWORDS */}
              {seoTab==="keywords"&&(
                <div>
                  <div style={{ background:T.card,border:`1px solid ${T.cardBorder}`,borderRadius:15,overflow:"hidden",marginBottom:18 }}>
                    <table style={{ width:"100%",borderCollapse:"collapse" }}>
                      <thead><tr style={{ borderBottom:`1px solid ${T.cardBorder}` }}>{["Keyword","Volume","Difficulty","CPC","Type","Position","Action"].map(h=><th key={h} style={{ padding:"12px 13px",textAlign:"left",fontSize:10,fontWeight:600,color:T.sub,letterSpacing:"0.1em",textTransform:"uppercase" }}>{h}</th>)}</tr></thead>
                      <tbody>
                        {KEYWORDS.map((k,i)=>(
                          <tr key={i} className="hr" style={{ borderBottom:`1px solid ${T.cardBorder}`,transition:"background 0.15s" }}>
                            <td style={{ padding:"11px 13px",fontSize:13,fontWeight:500 }}>{k.kw}</td>
                            <td style={{ padding:"11px 13px",color:"#F59E0B",fontWeight:600,fontSize:13 }}>{k.vol}</td>
                            <td style={{ padding:"11px 13px" }}>
                              <div style={{ display:"flex",alignItems:"center",gap:5 }}>
                                <div style={{ width:44,height:4,borderRadius:2,background:night?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.08)" }}><div style={{ height:"100%",width:`${k.diff}%`,background:k.diff<30?"#10B981":k.diff<60?"#F59E0B":"#EF4444",borderRadius:2 }}/></div>
                                <span style={{ fontSize:11,color:k.diff<30?"#10B981":k.diff<60?"#F59E0B":"#EF4444" }}>{k.diff}</span>
                              </div>
                            </td>
                            <td style={{ padding:"11px 13px",fontSize:12 }}>{k.cpc}</td>
                            <td style={{ padding:"11px 13px" }}><span style={{ fontSize:11,padding:"2px 7px",borderRadius:4,background:k.type==="long"?"rgba(99,102,241,0.15)":"rgba(245,158,11,0.1)",color:k.type==="long"?"#818CF8":"#F59E0B" }}>{k.type}-tail</span></td>
                            <td style={{ padding:"11px 13px",fontSize:14,fontWeight:700,color:k.pos<=10?"#10B981":k.pos<=30?"#F59E0B":T.sub }}>#{k.pos}</td>
                            <td style={{ padding:"11px 13px" }}><button onClick={()=>{setTab("blogs");setBlogModal(true);setGenForm(f=>({...f,topic:k.kw,keywords:k.kw}))}} style={{ padding:"4px 10px",background:"rgba(245,158,11,0.08)",border:"1px solid rgba(245,158,11,0.2)",borderRadius:5,color:"#F59E0B",cursor:"pointer",fontSize:11,fontFamily:"'Outfit',sans-serif" }}>✍️ Blog</button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 4. PAGE SPEED */}
              {seoTab==="speed"&&(
                <div style={{ display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14 }}>
                  {SEO_PAGES.map((p,i)=>(
                    <div key={i} style={{ background:T.card,border:`1px solid ${T.cardBorder}`,borderRadius:14,padding:18 }}>
                      <div style={{ fontSize:14,fontWeight:600,marginBottom:13,color:T.text }}>{p.page}</div>
                      {[{l:"🖥️ Desktop",s:p.speed},{l:"📱 Tablet",s:Math.max(p.speed-5,58)},{l:"📲 Mobile",s:Math.max(p.speed-14,48)}].map((d,j)=>(
                        <div key={j} style={{ marginBottom:10 }}>
                          <div style={{ display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3 }}>
                            <span style={{ color:T.sub }}>{d.l}</span>
                            <span style={{ fontWeight:700,color:d.s>=90?"#10B981":d.s>=75?"#F59E0B":"#EF4444" }}>{d.s}/100</span>
                          </div>
                          <div style={{ height:5,background:night?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.07)",borderRadius:2,overflow:"hidden" }}><div style={{ height:"100%",width:`${d.s}%`,background:d.s>=90?"#10B981":d.s>=75?"#F59E0B":"#EF4444",borderRadius:2 }}/></div>
                        </div>
                      ))}
                      {p.speed<90&&<div style={{ marginTop:10,fontSize:11,color:"#F59E0B",background:"rgba(245,158,11,0.06)",padding:"6px 9px",borderRadius:6 }}>💡 Compress hero image to gain +{Math.round((95-p.speed)*0.7)} points</div>}
                    </div>
                  ))}
                </div>
              )}

              {/* 5. HUMANIZE */}
              {seoTab==="humanize"&&(
                <div style={{ background:T.card,border:`1px solid ${T.cardBorder}`,borderRadius:15,overflow:"hidden" }}>
                  <div style={{ padding:"14px 18px",borderBottom:`1px solid ${T.cardBorder}`,fontSize:13,color:T.sub,lineHeight:1.6 }}>
                    🧠 <strong style={{ color:T.text }}>AI Detection Score</strong> — higher = more human. Score below 90% means Google or AI tools may flag the content as machine-written.
                  </div>
                  <table style={{ width:"100%",borderCollapse:"collapse" }}>
                    <thead><tr style={{ borderBottom:`1px solid ${T.cardBorder}` }}>{["Page","Human Score","AI Phrases Detected","Flagged Text","Action"].map(h=><th key={h} style={{ padding:"12px 13px",textAlign:"left",fontSize:10,fontWeight:600,color:T.sub,letterSpacing:"0.1em",textTransform:"uppercase" }}>{h}</th>)}</tr></thead>
                    <tbody>
                      {SEO_PAGES.map((p,i)=>(
                        <tr key={i} className="hr" style={{ borderBottom:`1px solid ${T.cardBorder}`,transition:"background 0.15s" }}>
                          <td style={{ padding:"11px 13px",fontSize:13,fontWeight:500 }}>{p.page}</td>
                          <td style={{ padding:"11px 13px" }}>
                            <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                              <div style={{ width:60,height:5,borderRadius:3,background:night?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.07)" }}><div style={{ height:"100%",width:`${p.human}%`,background:p.human>=95?"#10B981":p.human>=85?"#F59E0B":"#EF4444",borderRadius:3 }}/></div>
                              <span style={{ fontWeight:700,color:p.human>=95?"#10B981":p.human>=85?"#F59E0B":"#EF4444" }}>{p.human}%</span>
                            </div>
                          </td>
                          <td style={{ padding:"11px 13px",fontSize:13,color:p.human>=95?"#10B981":"#EF4444" }}>{p.human>=95?"None detected":"1–2 phrases"}</td>
                          <td style={{ padding:"11px 13px",fontSize:12,color:T.sub }}>{p.human<95?`⚠️ "delve into", "it's worth noting"`:"-"}</td>
                          <td style={{ padding:"11px 13px" }}>{p.human<100?<button style={{ padding:"4px 10px",background:"rgba(245,158,11,0.08)",border:"1px solid rgba(245,158,11,0.2)",borderRadius:5,color:"#F59E0B",cursor:"pointer",fontSize:11,fontFamily:"'Outfit',sans-serif" }}>✨ Auto Fix</button>:<span style={{ fontSize:12,color:"#10B981" }}>✅ Clean</span>}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* 6. PLAGIARISM */}
              {seoTab==="plagiarism"&&(
                <div style={{ background:T.card,border:`1px solid ${T.cardBorder}`,borderRadius:15,overflow:"hidden" }}>
                  <div style={{ padding:"14px 18px",borderBottom:`1px solid ${T.cardBorder}`,fontSize:13,color:T.sub }}>
                    🔍 <strong style={{ color:T.text }}>Unique Content Score</strong> — 100% means no duplicate content found. Below 90% can hurt rankings.
                  </div>
                  <table style={{ width:"100%",borderCollapse:"collapse" }}>
                    <thead><tr style={{ borderBottom:`1px solid ${T.cardBorder}` }}>{["Page","Unique %","Duplicate Source","Last Checked","Action"].map(h=><th key={h} style={{ padding:"12px 13px",textAlign:"left",fontSize:10,fontWeight:600,color:T.sub,letterSpacing:"0.1em",textTransform:"uppercase" }}>{h}</th>)}</tr></thead>
                    <tbody>
                      {SEO_PAGES.map((p,i)=>(
                        <tr key={i} className="hr" style={{ borderBottom:`1px solid ${T.cardBorder}`,transition:"background 0.15s" }}>
                          <td style={{ padding:"11px 13px",fontSize:13,fontWeight:500 }}>{p.page}</td>
                          <td style={{ padding:"11px 13px" }}>
                            <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                              <div style={{ width:60,height:5,borderRadius:3,background:night?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.07)" }}><div style={{ height:"100%",width:`${p.plag}%`,background:p.plag>=95?"#10B981":"#F59E0B",borderRadius:3 }}/></div>
                              <span style={{ fontWeight:700,color:p.plag>=95?"#10B981":"#F59E0B" }}>{p.plag}%</span>
                            </div>
                          </td>
                          <td style={{ padding:"11px 13px",fontSize:12,color:T.sub }}>{p.plag<100?"Minor overlap with tripadvisor.com":"None found"}</td>
                          <td style={{ padding:"11px 13px",fontSize:12,color:T.sub }}>2025-03-08</td>
                          <td style={{ padding:"11px 13px" }}><button style={{ padding:"4px 10px",background:"rgba(99,102,241,0.08)",border:"1px solid rgba(99,102,241,0.2)",borderRadius:5,color:"#818CF8",cursor:"pointer",fontSize:11,fontFamily:"'Outfit',sans-serif" }}>🔄 Re-check</button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* 7. COMPETITORS */}
              {seoTab==="competitors"&&(
                <div>
                  <div style={{ background:T.card,border:`1px solid ${T.cardBorder}`,borderRadius:14,padding:22,marginBottom:16 }}>
                    <div style={{ fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:700,marginBottom:16 }}>🥊 Competitor Analysis</div>
                    {COMPETITORS.map((c,i)=>(
                      <div key={i} style={{ display:"flex",gap:14,alignItems:"center",padding:"13px 0",borderBottom:i<COMPETITORS.length-1?`1px solid ${T.cardBorder}`:"none" }}>
                        <div style={{ width:40,height:40,borderRadius:10,background:"rgba(245,158,11,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0 }}>🏢</div>
                        <div style={{ flex:1 }}>
                          <div style={{ fontSize:15,fontWeight:600,color:T.text }}>{c.name}</div>
                          <div style={{ fontSize:12,color:T.sub,marginTop:2 }}>{c.domain} · ~{c.traffic}/mo traffic</div>
                        </div>
                        <div style={{ textAlign:"center",minWidth:60 }}>
                          <div style={{ fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:"#F59E0B" }}>#{c.rank}</div>
                          <div style={{ fontSize:10,color:T.sub }}>Domain rank</div>
                        </div>
                        <div style={{ textAlign:"right" }}>
                          <div style={{ fontSize:11,background:"rgba(245,158,11,0.1)",color:"#F59E0B",padding:"2px 8px",borderRadius:4,marginBottom:4 }}>Top: {c.kw}</div>
                          <div style={{ fontSize:11,background:"rgba(16,185,129,0.1)",color:"#10B981",padding:"2px 8px",borderRadius:4 }}>Gap: {c.gap}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background:T.card,border:`1px solid ${T.cardBorder}`,borderRadius:14,padding:18 }}>
                    <div style={{ fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:700,marginBottom:12 }}>🎯 Gap Opportunities</div>
                    {[
                      {opp:"Small group tours (max 6 pax)",comp:"Most competitors do 20+ per group",action:"Add 'Small Group' badge to all tour pages"},
                      {opp:"Sunrise packages",comp:"Competitors focus on evening/sunset",action:"Create 'Sunrise Desert Safari' standalone page"},
                      {opp:"Family pricing (kids discount)",comp:"Only 1 of 4 competitors offers this",action:"Add family rate to booking form + FAQ"},
                    ].map((g,i)=>(
                      <div key={i} style={{ display:"flex",gap:14,padding:"11px 0",borderBottom:i<2?`1px solid ${T.cardBorder}`:"none",alignItems:"flex-start" }}>
                        <div style={{ fontSize:18 }}>✅</div>
                        <div style={{ flex:1 }}>
                          <div style={{ fontSize:14,fontWeight:600,color:T.text,marginBottom:3 }}>{g.opp}</div>
                          <div style={{ fontSize:12,color:T.sub,marginBottom:5 }}>Competitor weakness: {g.comp}</div>
                          <div style={{ fontSize:12,color:"#10B981" }}>→ {g.action}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 8. SCHEMA */}
              {seoTab==="schema"&&(
                <div>
                  <div style={{ background:T.card,border:`1px solid ${T.cardBorder}`,borderRadius:15,overflow:"hidden",marginBottom:16 }}>
                    <div style={{ padding:"14px 18px",borderBottom:`1px solid ${T.cardBorder}`,fontSize:13,color:T.sub }}>
                      🔧 <strong style={{ color:T.text }}>Schema Markup</strong> — structured data that helps Google show rich results (stars, prices, FAQs) in search. <strong style={{ color:"#F59E0B" }}>Auto-Add writes directly to your live website.</strong>
                    </div>
                    <table style={{ width:"100%",borderCollapse:"collapse" }}>
                      <thead><tr style={{ borderBottom:`1px solid ${T.cardBorder}` }}>{["Schema Type","Applied To","Status","What It Does","Action"].map(h=><th key={h} style={{ padding:"12px 13px",textAlign:"left",fontSize:10,fontWeight:600,color:T.sub,letterSpacing:"0.1em",textTransform:"uppercase" }}>{h}</th>)}</tr></thead>
                      <tbody>
                        {[
                          { key:"TouristAttraction", type:"TouristAttraction + Offer",  page:"All Tour Pages",  note:"Shows stars + price in Google",   action:null       },
                          { key:"LocalBusiness",     type:"LocalBusiness",              page:"Homepage",        note:"Shows in Google Maps results",     action:null       },
                          { key:"FAQPage",           type:"FAQPage",                    page:"Tour Pages",      note:"Shows expandable FAQs in Google",  action:"add_faq"  },
                          { key:"Article",           type:"Article",                    page:"Blog Posts",      note:"Rich results for blog articles",   action:"add_article"},
                          { key:"BreadcrumbList",    type:"BreadcrumbList",             page:"All Pages",       note:"Navigation shown in Google",       action:null       },
                          { key:"AggregateRating",   type:"AggregateRating",            page:"Tour Pages",      note:"Shows review count in Google",     action:null       },
                        ].map((s,i)=>{
                          const st = schemaStatus[s.key]
                          const col = st==="active"?"#10B981":st==="partial"?"#F59E0B":"#EF4444"
                          const bg  = st==="active"?"rgba(16,185,129,0.1)":st==="partial"?"rgba(245,158,11,0.1)":"rgba(239,68,68,0.1)"
                          const isLoading = schemaLoading === s.key
                          return(
                            <tr key={i} className="hr" style={{ borderBottom:`1px solid ${T.cardBorder}`,transition:"background 0.15s" }}>
                              <td style={{ padding:"11px 13px",fontSize:13,fontWeight:600 }}>{s.type}</td>
                              <td style={{ padding:"11px 13px",fontSize:12,color:T.sub }}>{s.page}</td>
                              <td style={{ padding:"11px 13px" }}>
                                <span style={{ padding:"3px 9px",borderRadius:5,fontSize:11,fontWeight:600,background:bg,color:col }}>
                                  {st==="active"?"✅ Active":st==="partial"?"⚠️ Partial":"❌ Missing"}
                                </span>
                              </td>
                              <td style={{ padding:"11px 13px",fontSize:12,color:T.sub }}>{s.note}</td>
                              <td style={{ padding:"11px 13px" }}>
                                {s.action && st!=="active" ? (
                                  <button
                                    disabled={isLoading}
                                    onClick={() => autoFixSchema(s.action, s.key)}
                                    style={{ padding:"5px 12px",background:isLoading?"rgba(245,158,11,0.3)":"linear-gradient(135deg,#F59E0B,#D97706)",border:"none",borderRadius:6,color:"#000",cursor:isLoading?"wait":"pointer",fontSize:12,fontWeight:700,fontFamily:"'Outfit',sans-serif",minWidth:82,transition:"all 0.2s" }}>
                                    {isLoading ? "⏳ Adding..." : "⚡ Auto-Add"}
                                  </button>
                                ) : s.action && st==="active" ? (
                                  <div style={{ display:"flex",gap:5 }}>
                                    <span style={{ fontSize:12,color:"#10B981",fontWeight:600 }}>✅ Live</span>
                                    <button onClick={()=>setSchemaStatus(p=>({...p,[s.key]:"missing"}))} style={{ padding:"3px 8px",background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.2)",borderRadius:5,color:"#EF4444",cursor:"pointer",fontSize:11,fontFamily:"'Outfit',sans-serif" }}>Remove</button>
                                  </div>
                                ) : (
                                  <span style={{ fontSize:12,color:"#10B981",fontWeight:600 }}>✅ Built-in</span>
                                )}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div style={{ padding:16,background:night?"rgba(245,158,11,0.04)":"rgba(245,158,11,0.06)",border:"1px solid rgba(245,158,11,0.15)",borderRadius:12,fontSize:13,color:T.sub,lineHeight:1.7 }}>
                    💡 <strong style={{ color:T.text }}>How it works:</strong> Clicking Auto-Add calls <code style={{ color:"#F59E0B",fontSize:12 }}>/api/schema</code> which writes JSON-LD to <code style={{ color:"#F59E0B",fontSize:12 }}>public/dr-schema.json</code>. The ContentApplier injects it into every matching page's <code style={{ color:"#F59E0B",fontSize:12 }}>&lt;head&gt;</code> automatically — no page restarts needed.
                  </div>
                </div>
              )}

              {/* 9. ALT TAGS */}
              {seoTab==="alttags"&&(
                <div>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14 }}>
                    <div style={{ fontSize:13,color:T.sub }}>🖼️ <strong style={{ color:T.text }}>Image Alt Tags</strong> — missing alts hurt SEO and accessibility.</div>
                    <button style={{ padding:"8px 16px",background:"linear-gradient(135deg,#F59E0B,#D97706)",border:"none",borderRadius:8,color:"#000",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"'Outfit',sans-serif" }}>✨ Auto-Fix All Missing</button>
                  </div>
                  <div style={{ background:T.card,border:`1px solid ${T.cardBorder}`,borderRadius:15,overflow:"hidden" }}>
                    <table style={{ width:"100%",borderCollapse:"collapse" }}>
                      <thead><tr style={{ borderBottom:`1px solid ${T.cardBorder}` }}>{["Page","Total Images","Has Alt","Missing Alt","Coverage","Status"].map(h=><th key={h} style={{ padding:"12px 13px",textAlign:"left",fontSize:10,fontWeight:600,color:T.sub,letterSpacing:"0.1em",textTransform:"uppercase" }}>{h}</th>)}</tr></thead>
                      <tbody>
                        {[
                          {page:"Homepage",           total:12, has:12, missing:0  },
                          {page:"Desert Safari",      total:18, has:15, missing:3  },
                          {page:"Hot Air Balloon",    total:14, has:14, missing:0  },
                          {page:"Dhow Cruise",        total:16, has:13, missing:3  },
                          {page:"Quad Bike",          total:10, has:10, missing:0  },
                          {page:"Camel Riding",       total:9,  has:8,  missing:1  },
                          {page:"Desert Safari Blog", total:6,  has:6,  missing:0  },
                        ].map((p,i)=>{ const pct=Math.round((p.has/p.total)*100); return(
                          <tr key={i} className="hr" style={{ borderBottom:`1px solid ${T.cardBorder}`,transition:"background 0.15s" }}>
                            <td style={{ padding:"11px 13px",fontSize:13,fontWeight:500 }}>{p.page}</td>
                            <td style={{ padding:"11px 13px",fontSize:13 }}>{p.total}</td>
                            <td style={{ padding:"11px 13px",fontSize:13,color:"#10B981",fontWeight:600 }}>{p.has}</td>
                            <td style={{ padding:"11px 13px",fontSize:13,color:p.missing>0?"#EF4444":T.sub,fontWeight:p.missing>0?700:400 }}>{p.missing>0?`❌ ${p.missing}`:"✅ 0"}</td>
                            <td style={{ padding:"11px 13px" }}>
                              <div style={{ display:"flex",alignItems:"center",gap:7 }}>
                                <div style={{ width:56,height:5,borderRadius:3,background:night?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.07)" }}><div style={{ height:"100%",width:`${pct}%`,background:pct===100?"#10B981":"#F59E0B",borderRadius:3 }}/></div>
                                <span style={{ fontSize:11,color:pct===100?"#10B981":"#F59E0B",fontWeight:600 }}>{pct}%</span>
                              </div>
                            </td>
                            <td style={{ padding:"11px 13px" }}>{p.missing>0?<button style={{ padding:"4px 10px",background:"rgba(245,158,11,0.08)",border:"1px solid rgba(245,158,11,0.2)",borderRadius:5,color:"#F59E0B",cursor:"pointer",fontSize:11,fontFamily:"'Outfit',sans-serif" }}>Fix {p.missing} tags</button>:<span style={{ fontSize:12,color:"#10B981" }}>✅ Perfect</span>}</td>
                          </tr>
                        )})}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 10. DAILY TIPS */}
              {seoTab==="tips"&&(
                <div>
                  <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16 }}>
                    <div style={{ fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:700 }}>💡 Daily SEO Tips & Action Plan</div>
                    <div style={{ fontSize:12,color:T.sub }}>Updated daily based on your rankings</div>
                  </div>
                  {[
                    {p:"🔴",cat:"Urgent",   t:"Desert Safari lost 6 positions this week",             d:"Was #8, now #14 for 'desert safari dubai'. Add 400 words of content, 3 FAQ questions with answers, and 2 internal links from blog posts. This is your highest-traffic page.",              a:"Fix Now",ac:()=>{setTab("blogs");setBlogModal(true)}},
                    {p:"🔴",cat:"Urgent",   t:"Dhow Cruise has 3 images with no alt text",            d:"Images without alt text are invisible to Google Image Search. You're losing an estimated 15-20 visits/day from image search alone.",                                                      a:"Fix Alt Tags",ac:()=>setSeoTab("alttags")},
                    {p:"🟡",cat:"This Week",t:"Homepage title tag is 68 chars (should be under 60)",   d:"Google truncates it in search results. Suggested: 'Dubai Rovers: Desert Safari, Balloon & City Tours' (52 chars)",                                                                     a:"Edit Title",ac:()=>{}},
                    {p:"🟡",cat:"This Week",t:"No blog post targeting 'quad bike dubai' yet",          d:"3,400 searches/month, medium difficulty (35/100). A single well-written post could rank top 10 within 3-4 months.",                                                                     a:"Generate Blog",ac:()=>{setTab("blogs");setBlogModal(true)}},
                    {p:"🟡",cat:"This Week",t:"Add Article schema to all 3 published blog posts",      d:"Blog posts without Article schema miss out on rich results in Google. Takes 10 minutes to add and can improve CTR by 15-25%.",                                                           a:"Add Schema",ac:()=>setSeoTab("schema")},
                    {p:"🟢",cat:"This Month",t:"Hot Air Balloon page at #8 — ready for backlinks",      d:"Get 2-3 links from Dubai travel blogs, TripAdvisor, and UAE tourism directories. This could push it to top 5 and double click traffic.",                                               a:"Build Links",ac:()=>{}},
                    {p:"🟢",cat:"This Month",t:"Add AI search optimization (ChatGPT, Perplexity)",      d:"Add clear Q&A structured content: 'What is the best time for desert safari in Dubai?' with a direct answer. AI tools pull from structured content.",                                   a:"Learn More",ac:()=>{}},
                    {p:"🟢",cat:"Long-Term",t:"Build a review collection system",                      d:"You have 4.8-5.0 rated tours but only a few Google reviews. Email/WhatsApp every confirmed booking asking for a review. 50+ reviews would push CTR significantly.",                   a:"Plan",ac:()=>{}},
                  ].map((tip,i)=>(
                    <div key={i} style={{ background:T.card,border:`1px solid ${T.cardBorder}`,borderRadius:14,padding:18,marginBottom:10,display:"flex",gap:14,alignItems:"flex-start" }}>
                      <div style={{ flexShrink:0,paddingTop:2 }}>
                        <div style={{ fontSize:16 }}>{tip.p}</div>
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex",gap:7,alignItems:"center",marginBottom:5 }}>
                          <span style={{ fontSize:10,background:tip.cat==="Urgent"?"rgba(239,68,68,0.1)":tip.cat==="This Week"?"rgba(245,158,11,0.1)":tip.cat==="This Month"?"rgba(99,102,241,0.1)":"rgba(16,185,129,0.1)",color:tip.cat==="Urgent"?"#EF4444":tip.cat==="This Week"?"#F59E0B":tip.cat==="This Month"?"#818CF8":"#10B981",padding:"2px 8px",borderRadius:4,fontWeight:600 }}>{tip.cat}</span>
                        </div>
                        <div style={{ fontSize:15,fontWeight:600,color:T.text,marginBottom:5 }}>{tip.t}</div>
                        <div style={{ fontSize:13,color:T.sub,lineHeight:1.6 }}>{tip.d}</div>
                      </div>
                      <button onClick={tip.ac} style={{ padding:"8px 14px",background:"linear-gradient(135deg,#F59E0B,#D97706)",border:"none",borderRadius:8,color:"#000",fontWeight:700,fontSize:12,cursor:"pointer",fontFamily:"'Outfit',sans-serif",alignSelf:"flex-start",flexShrink:0 }}>{tip.a}</button>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}

          {/* ══ SEO PRO ══ */}
          {tab==="seo_pro"&&(
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:400, gap:20 }}>
              <div style={{ fontSize:64 }}>🚀</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:26, fontWeight:700, color:T.text }}>SEO Pro Dashboard</div>
              <div style={{ fontSize:14, color:T.sub, textAlign:"center", maxWidth:420, lineHeight:1.7 }}>
                Advanced SEO intelligence with Keyword Research, Backlink Analysis, Technical Audit, Rank Tracking, Schema Builder, Competitor Analysis and more — with 4 switchable data modes.
              </div>
              <div style={{ display:"flex", gap:12, flexWrap:"wrap", justifyContent:"center" }}>
                {["🔍 Keyword Research","🔗 Backlinks","🛠️ Technical Audit","📈 Rank Tracking","🏗️ Schema Builder","🕵️ Competitors","🌍 Multilingual"].map(f=>(
                  <span key={f} style={{ background:"rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.25)", borderRadius:20, padding:"5px 14px", fontSize:12, color:"#F59E0B" }}>{f}</span>
                ))}
              </div>
              <a href="/seo-pro" target="_blank" rel="noopener noreferrer" style={{ marginTop:8, background:"linear-gradient(135deg,#F59E0B,#D97706)", color:"#000", fontWeight:700, fontSize:15, padding:"13px 36px", borderRadius:14, textDecoration:"none", boxShadow:"0 6px 24px rgba(245,158,11,0.3)" }}>
                Open SEO Pro Dashboard →
              </a>
            </div>
          )}

          {/* ══ API SETUP GUIDE ══ */}
          {tab==="api_setup"&&(
            <APISetupGuide night={night} />
          )}

          {/* ══ ATTRACTIONS MANAGER ══ */}
          {tab==="attractions"&&(
            <div>

              {/* ══ PAGE VISIBILITY CONTROLS ══ */}
              <div style={{ background:T.card, border:`1px solid ${T.cardBorder}`, borderRadius:16, padding:20, marginBottom:22 }}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:17, fontWeight:700, marginBottom:6 }}>🌐 Website Page Visibility</div>
                <div style={{ color:T.sub, fontSize:12, marginBottom:18 }}>
                  Toggle a page <strong style={{color:"#10B981"}}>ON</strong> to make it live on your website. Toggle <strong style={{color:"#EF4444"}}>OFF</strong> to instantly hide it from all visitors.
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:12 }}>
                  {[
                    { key:"attractions", icon:"🎟️", label:"Attraction Tickets",  url:"/attractions", desc:"Dubai Aquarium, Burj Khalifa, waterparks & more" },
                    { key:"flights",     icon:"✈️", label:"Airline Tickets",      url:"/flights",     desc:"Emirates, Flydubai & Air Arabia flight booking" },
                    { key:"booking",     icon:"📋", label:"Booking Form Page",    url:"/booking",     desc:"3-step tour booking wizard" },
                    { key:"contact",     icon:"📞", label:"Contact Page",         url:"/contact",     desc:"Contact form & location map" },
                    { key:"about",       icon:"ℹ️", label:"About Us Page",        url:"/about",       desc:"Team, story & company info" },
                  ].map(p => (
                    <div key={p.key} style={{ background:pageVis[p.key]?"rgba(16,185,129,0.05)":"rgba(239,68,68,0.05)", border:`1px solid ${pageVis[p.key]?"rgba(16,185,129,0.25)":"rgba(239,68,68,0.2)"}`, borderRadius:14, padding:"16px 18px", display:"flex", alignItems:"center", gap:14, transition:"all 0.3s" }}>
                      <div style={{ fontSize:28, flexShrink:0 }}>{p.icon}</div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontWeight:700, fontSize:14, color:T.text, marginBottom:2 }}>{p.label}</div>
                        <div style={{ fontSize:11, color:T.sub, marginBottom:4, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{p.desc}</div>
                        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                          <span style={{ fontFamily:"monospace", fontSize:10, color:"rgba(255,255,255,0.3)", background:"rgba(255,255,255,0.05)", padding:"1px 6px", borderRadius:4 }}>{p.url}</span>
                          {pageVis[p.key]
                            ? <a href={p.url} target="_blank" style={{ fontSize:10, color:"#10B981", textDecoration:"none", fontWeight:600 }}>👁️ View →</a>
                            : <span style={{ fontSize:10, color:"#EF4444", fontWeight:600 }}>🚫 Hidden</span>
                          }
                        </div>
                      </div>
                      {/* Toggle switch */}
                      <button onClick={() => togglePage(p.key)}
                        style={{ flexShrink:0, width:52, height:28, borderRadius:14, border:"none", cursor:"pointer", position:"relative", background:pageVis[p.key]?"#10B981":"rgba(255,255,255,0.12)", transition:"background 0.3s", padding:0 }}>
                        <div style={{ position:"absolute", top:3, left:pageVis[p.key]?26:3, width:22, height:22, borderRadius:"50%", background:"#fff", transition:"left 0.3s", boxShadow:"0 2px 6px rgba(0,0,0,0.3)" }} />
                      </button>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop:14, padding:"10px 14px", background:"rgba(245,158,11,0.06)", border:"1px solid rgba(245,158,11,0.15)", borderRadius:9, fontSize:12, color:T.sub }}>
                  ⚡ <strong style={{color:"#F59E0B"}}>Instant effect.</strong> Visitors are blocked immediately when a page is toggled OFF. No server restart needed.
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:22 }}>
                {[
                  { label:"Total Listings",  value:8,  icon:"🎟️", color:"#F59E0B" },
                  { label:"Visible",         value:8,  icon:"✅",  color:"#10B981" },
                  { label:"Sold Out",        value:1,  icon:"❌",  color:"#EF4444" },
                  { label:"VIP Experiences", value:2,  icon:"👑",  color:"#c9953a" },
                ].map(s=>(
                  <div key={s.label} style={{ background:T.card, border:`1px solid ${T.cardBorder}`, borderRadius:14, padding:"16px 18px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <div>
                      <div style={{ color:T.sub, fontSize:11, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:5 }}>{s.label}</div>
                      <div style={{ fontSize:26, fontWeight:800, color:s.color }}>{s.value}</div>
                    </div>
                    <div style={{ fontSize:26, opacity:0.6 }}>{s.icon}</div>
                  </div>
                ))}
              </div>

              {/* Mode banner */}
              <div style={{ background:"rgba(234,179,8,0.07)", border:"1px solid rgba(234,179,8,0.2)", borderRadius:12, padding:"14px 18px", marginBottom:20, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ padding:"3px 10px", borderRadius:20, background:"rgba(234,179,8,0.2)", border:"1px solid rgba(234,179,8,0.35)", fontSize:10, fontWeight:700, color:"#eab308" }}>⚠ DEMO MODE</span>
                  <span style={{ fontSize:13, color:T.sub }}>Live data via <strong style={{color:"#e8b86d"}}>GetYourGuide / Viator / Klook API</strong> — configure API keys below to go live</span>
                </div>
                {pageVis.attractions && <a href="/attractions" target="_blank" style={{ padding:"7px 14px", background:"rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.25)", borderRadius:8, color:"#F59E0B", fontSize:12, fontWeight:600, textDecoration:"none" }}>👁️ View Live Page →</a>}
              </div>

              {/* Attractions table */}
              <div style={{ background:T.card, border:`1px solid ${T.cardBorder}`, borderRadius:16, overflow:"hidden", marginBottom:20 }}>
                <div style={{ padding:"14px 18px", borderBottom:`1px solid ${T.cardBorder}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:16, fontWeight:700 }}>🎟️ Attraction Listings</div>
                  <span style={{ fontSize:12, color:T.sub }}>Demo data — 8 attractions</span>
                </div>
                {[
                  { name:"Burj Khalifa At The Top",       cat:"🏙️ Observation", price:149, spots:8,    badge:"🔥 Bestseller", status:"live",    vip:true  },
                  { name:"Dubai Frame — Sky Bridge",       cat:"🏙️ Observation", price:63,  spots:null, badge:"✨ Popular",    status:"live",    vip:false },
                  { name:"IMG Worlds of Adventure",        cat:"🎢 Theme Park",  price:299, spots:12,   badge:"⚡ Limited",    status:"live",    vip:false },
                  { name:"Dubai Aquarium & Underwater Zoo",cat:"🐬 Marine",      price:120, spots:null, badge:null,           status:"live",    vip:false },
                  { name:"Hot Air Balloon Sunrise",        cat:"🚁 Aerial",      price:895, spots:4,    badge:"🔥 Bestseller", status:"live",    vip:true  },
                  { name:"Museum of the Future",           cat:"🏛️ Museum",      price:185, spots:0,    badge:"✨ New",        status:"soldout", vip:false },
                  { name:"Aquaventure Waterpark",          cat:"💧 Water Park",  price:330, spots:null, badge:"🔥 Bestseller", status:"live",    vip:false },
                  { name:"Sky Views Observatory",          cat:"🏙️ Observation", price:129, spots:null, badge:"✨ Popular",    status:"live",    vip:false },
                ].map((a,i,arr)=>(
                  <div key={a.name} style={{ display:"grid", gridTemplateColumns:"2.5fr 1fr 80px 90px 90px 80px", gap:0, padding:"12px 18px", borderBottom:i<arr.length-1?`1px solid ${T.cardBorder}`:"none", alignItems:"center" }}>
                    <div>
                      <div style={{ fontWeight:600, fontSize:13, color:T.text, display:"flex", alignItems:"center", gap:6 }}>
                        {a.name}
                        {a.vip && <span style={{ fontSize:9, background:"rgba(201,149,58,0.2)", color:"#c9953a", border:"1px solid rgba(201,149,58,0.3)", borderRadius:10, padding:"1px 7px", fontWeight:700 }}>👑 VIP</span>}
                      </div>
                      <div style={{ color:T.sub, fontSize:11, marginTop:2 }}>{a.cat}</div>
                    </div>
                    <div style={{ color:"#e8b86d", fontSize:13, fontWeight:700 }}>AED {a.price}</div>
                    <div style={{ fontSize:12, color:a.spots===0?"#EF4444":a.spots<=5?"#F59E0B":"#10B981", fontWeight:600 }}>
                      {a.spots===0?"Sold out":a.spots===null?"Open":a.spots+" left"}
                    </div>
                    <div>
                      {a.badge && <span style={{ fontSize:10, color:"rgba(255,255,255,0.6)", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:20, padding:"2px 8px" }}>{a.badge}</span>}
                    </div>
                    <div>
                      <span style={{ padding:"3px 10px", borderRadius:20, fontSize:11, fontWeight:600,
                        background:a.status==="live"?"rgba(16,185,129,0.12)":"rgba(239,68,68,0.12)",
                        color:a.status==="live"?"#10B981":"#EF4444",
                        border:`1px solid ${a.status==="live"?"rgba(16,185,129,0.3)":"rgba(239,68,68,0.3)"}` }}>
                        {a.status==="live"?"● Live":"✕ Sold Out"}
                      </span>
                    </div>
                    <div>
                      <button onClick={()=>toast("✅ Edit coming in Session 2!")} style={{ padding:"5px 11px", background:"rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.25)", borderRadius:7, color:"#F59E0B", fontSize:11, fontWeight:600, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>✏️ Edit</button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Airline Tickets section */}
              <div style={{ background:T.card, border:`1px solid ${T.cardBorder}`, borderRadius:16, overflow:"hidden", marginBottom:20 }}>
                <div style={{ padding:"14px 18px", borderBottom:`1px solid ${T.cardBorder}`, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:16, fontWeight:700 }}>✈️ Airline Tickets</div>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ padding:"3px 10px", borderRadius:20, background:"rgba(99,102,241,0.12)", border:"1px solid rgba(99,102,241,0.3)", color:"#818CF8", fontSize:11, fontWeight:600 }}>Separate Page</span>
                    {pageVis.flights && <a href="/flights" target="_blank" style={{ padding:"5px 12px", background:"rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.25)", borderRadius:7, color:"#F59E0B", fontSize:11, fontWeight:600, textDecoration:"none" }}>👁️ View →</a>}
                  </div>
                </div>
                <div style={{ padding:"18px" }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:16 }}>
                    {[
                      { label:"Emirates Flights",    icon:"✈️", desc:"Dubai to 140+ destinations. Economy to First Class.", color:"#EF4444" },
                      { label:"Flydubai Flights",    icon:"🛫", desc:"Budget routes from DXB. GCC + Europe + Africa.",     color:"#F59E0B" },
                      { label:"Air Arabia Flights",  icon:"🛬", desc:"Sharjah hub. Middle East + South Asia routes.",      color:"#10B981" },
                    ].map(a=>(
                      <div key={a.label} style={{ padding:"14px", background:"rgba(255,255,255,0.03)", border:`1px solid ${T.cardBorder}`, borderRadius:12 }}>
                        <div style={{ fontSize:22, marginBottom:6 }}>{a.icon}</div>
                        <div style={{ fontWeight:700, fontSize:13, color:"#fff", marginBottom:3 }}>{a.label}</div>
                        <div style={{ fontSize:11, color:T.sub, lineHeight:1.5 }}>{a.desc}</div>
                        <div style={{ marginTop:8, fontSize:11, color:a.color, fontWeight:600 }}>● Demo mode — WhatsApp booking</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize:12, color:T.sub, padding:"10px 14px", background:"rgba(99,102,241,0.06)", border:"1px solid rgba(99,102,241,0.15)", borderRadius:9 }}>
                    💡 Flights have their own page at <strong style={{color:"#818CF8"}}>/flights</strong>. Toggle visibility above using the ✈️ Airline Tickets switch.
                  </div>
                </div>
              </div>

              {/* API Integration */}
              <div style={{ background:T.card, border:`1px solid ${T.cardBorder}`, borderRadius:16, padding:18 }}>
                <div style={{ fontFamily:"'Playfair Display',serif", fontSize:16, fontWeight:700, marginBottom:16 }}>🔌 API Integration — Go Live</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  {[
                    { label:"GetYourGuide API Key", ph:"gyg_live_xxxxxxxxxx",      icon:"🎟️" },
                    { label:"Viator API Key",        ph:"viator_live_xxxxxxxxxx",   icon:"🌐" },
                    { label:"Klook Partner ID",      ph:"klook_partner_xxxxxxxx",   icon:"🎫" },
                    { label:"Kiwi.io API Key (Flights)", ph:"kiwi_live_xxxxxxxxxx", icon:"✈️" },
                  ].map(f=>(
                    <div key={f.label}>
                      <label style={{ color:T.sub, fontSize:11, textTransform:"uppercase", letterSpacing:"0.08em", display:"block", marginBottom:5 }}>{f.icon} {f.label}</label>
                      <input placeholder={f.ph} style={{ width:"100%", padding:"9px 12px", background:"rgba(255,255,255,0.04)", border:`1px solid ${T.cardBorder}`, borderRadius:8, color:"rgba(255,255,255,0.6)", fontSize:12, fontFamily:"'Outfit',sans-serif", outline:"none", boxSizing:"border-box" }} />
                    </div>
                  ))}
                </div>
                <button onClick={()=>toast("💾 API keys saved! Restart server to apply.")} style={{ marginTop:14, padding:"10px 22px", background:"linear-gradient(135deg,#F59E0B,#D97706)", border:"none", borderRadius:9, color:"#000", fontWeight:700, fontSize:13, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>💾 Save API Keys</button>
              </div>
            </div>
          )}

          {/* ══ PAGE BUILDER ══ */}
          {tab==="page_builder"&&(
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", minHeight:400, gap:20 }}>
              <div style={{ fontSize:56 }}>🏗️</div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:24, fontWeight:700, color:"#fff" }}>Page Builder</div>
              <div style={{ color:"rgba(255,255,255,0.4)", fontSize:14, textAlign:"center", maxWidth:400, lineHeight:1.7 }}>
                Create landing pages, tour listings, promos &amp; more — drag-and-drop blocks, inline editing, AI content generation, one-click publish.
              </div>
              <a href="/admin/page-builder" style={{ padding:"13px 32px", background:"linear-gradient(135deg,#F59E0B,#D97706)", border:"none", borderRadius:12, color:"#000", fontWeight:700, fontSize:15, cursor:"pointer", fontFamily:"'Outfit',sans-serif", textDecoration:"none", display:"inline-block", marginTop:8 }}>
                🏗️ Open Page Builder →
              </a>
              <div style={{ display:"flex", gap:16, marginTop:8 }}>
                {[["🖊️","Drag-Drop Editor"],["🤖","AI Content"],["📱","Mobile Preview"],["🚀","One-Click Publish"]].map(([ic,lb])=>(
                  <div key={lb} style={{ textAlign:"center" }}>
                    <div style={{ fontSize:22 }}>{ic}</div>
                    <div style={{ color:"rgba(255,255,255,0.3)", fontSize:11, marginTop:4 }}>{lb}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ══ SETTINGS ══ */}
          {tab==="settings"&&(
            <div style={{ maxWidth:680 }}>
              <div style={{ background:T.card,border:`1px solid ${T.cardBorder}`,borderRadius:15,padding:20,marginBottom:14 }}>
                <div style={{ fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:700,marginBottom:14 }}>🌐 Website Settings</div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:13 }}>
                  {[{k:"siteName",l:"Site Name"},{k:"tagline",l:"Tagline"},{k:"email",l:"Email"},{k:"whatsapp",l:"WhatsApp"},{k:"currency",l:"Currency"}].map(f=>(
                    <div key={f.k}>
                      <label style={LB}>{f.l}</label>
                      <input value={settings[f.k]||""} onChange={e=>setSettings(p=>({...p,[f.k]:e.target.value}))} style={IN()} />
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={()=>toast("✅ Settings saved!")} style={{ padding:"11px 24px",background:"linear-gradient(135deg,#F59E0B,#D97706)",border:"none",borderRadius:10,color:"#000",fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"'Outfit',sans-serif" }}>💾 Save Settings</button>
            </div>
          )}

        </div>
      </div>

      {/* ══ BLOG GENERATE / EDIT MODAL ══ */}
      {(blogModal||editBlog)&&(
        <div onClick={()=>{setBlogModal(false);setEditBlog(null)}} style={{ position:"fixed",inset:0,background:"rgba(0,0,0,0.82)",zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:16 }}>
          <div onClick={e=>e.stopPropagation()} style={{ background:"#0D1220",border:"1px solid rgba(245,158,11,0.2)",borderRadius:18,padding:24,width:"100%",maxWidth:540,maxHeight:"92vh",overflow:"auto",animation:"si 0.2s ease" }}>
            <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16 }}>
              <div style={{ fontFamily:"'Playfair Display',serif",fontSize:18,fontWeight:700,color:"#fff" }}>{editBlog?"✏️ Edit Blog":"✨ Generate Blog Post"}</div>
              <button onClick={()=>{setBlogModal(false);setEditBlog(null)}} style={{ background:"none",border:"none",color:"rgba(255,255,255,0.4)",fontSize:20,cursor:"pointer" }}>✕</button>
            </div>
            {editBlog?(
              <div>
                {[{k:"title",l:"Title",rows:1},{k:"metaDescription",l:"Meta Description",rows:2}].map(f=>(
                  <div key={f.k} style={{ marginBottom:12 }}>
                    <label style={{ fontSize:11,color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:"0.08em",display:"block",marginBottom:5 }}>{f.l}</label>
                    {f.rows>1?<textarea value={editBlog[f.k]||""} onChange={e=>setEditBlog(b=>({...b,[f.k]:e.target.value}))} rows={f.rows} style={{ width:"100%",padding:"10px 13px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,color:"#fff",fontSize:13,fontFamily:"'Outfit',sans-serif",boxSizing:"border-box",outline:"none",resize:"vertical" }} />
                    :<input value={editBlog[f.k]||""} onChange={e=>setEditBlog(b=>({...b,[f.k]:e.target.value}))} style={{ width:"100%",padding:"10px 13px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,color:"#fff",fontSize:13,fontFamily:"'Outfit',sans-serif",boxSizing:"border-box",outline:"none" }} />}
                  </div>
                ))}
                <div style={{ marginBottom:12 }}>
                  <label style={{ fontSize:11,color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:"0.08em",display:"block",marginBottom:5 }}>Status</label>
                  <select value={editBlog.status} onChange={e=>setEditBlog(b=>({...b,status:e.target.value}))} style={{ width:"100%",padding:"10px 13px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,color:"#fff",fontSize:13,fontFamily:"'Outfit',sans-serif",outline:"none" }}>
                    <option value="published">Published</option><option value="draft">Draft</option><option value="hidden">Hidden</option>
                  </select>
                </div>
                <button onClick={()=>{saveBlogs(blogs.map(b=>b.id===editBlog.id?editBlog:b));setEditBlog(null);toast("✅ Saved!")}} style={{ width:"100%",padding:"11px",background:"linear-gradient(135deg,#F59E0B,#D97706)",border:"none",borderRadius:10,color:"#000",fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"'Outfit',sans-serif" }}>💾 Save Changes</button>
              </div>
            ):(
              <div>
                <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:9,marginBottom:18 }}>
                  {[{id:"free",icon:"🆓",t:"Free Template",d:"No API key needed. Instant results.",c:"16,185,129"},{id:"ai",icon:"🤖",t:"Anthropic AI",d:"Unique AI writing. Needs ANTHROPIC_API_KEY in .env.local",c:"99,102,241"}].map(m=>(
                    <div key={m.id} onClick={()=>setGenMode(m.id)} style={{ padding:13,background:genMode===m.id?`rgba(${m.c},0.08)`:"rgba(255,255,255,0.02)",border:`2px solid ${genMode===m.id?`rgba(${m.c},0.4)`:"rgba(255,255,255,0.07)"}`,borderRadius:11,cursor:"pointer",transition:"all 0.2s" }}>
                      <div style={{ fontSize:20,marginBottom:5 }}>{m.icon}</div>
                      <div style={{ fontSize:13,fontWeight:700,color:"#fff",marginBottom:3 }}>{m.t}</div>
                      <div style={{ fontSize:11,color:"rgba(255,255,255,0.4)",lineHeight:1.5 }}>{m.d}</div>
                      {genMode===m.id&&<div style={{ marginTop:7,fontSize:11,color:`rgb(${m.c})`,fontWeight:600 }}>✅ Selected</div>}
                    </div>
                  ))}
                </div>
                {[{k:"topic",l:"Blog Topic *",p:"e.g. Best Time for Desert Safari Dubai"},{k:"keywords",l:"Target Keywords",p:"desert safari dubai evening"},{k:"externalLinks",l:"External Link (optional)",p:"https://visitdubai.com"}].map(f=>(
                  <div key={f.k} style={{ marginBottom:11 }}>
                    <label style={{ fontSize:11,color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:"0.08em",display:"block",marginBottom:5 }}>{f.l}</label>
                    <input value={genForm[f.k]||""} onChange={e=>setGenForm(p=>({...p,[f.k]:e.target.value}))} placeholder={f.p} style={{ width:"100%",padding:"10px 13px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,color:"#fff",fontSize:13,fontFamily:"'Outfit',sans-serif",boxSizing:"border-box",outline:"none" }} />
                  </div>
                ))}
                <div style={{ marginBottom:14 }}>
                  <label style={{ fontSize:11,color:"rgba(255,255,255,0.4)",textTransform:"uppercase",letterSpacing:"0.08em",display:"block",marginBottom:5 }}>Tour Category</label>
                  <select value={genForm.category} onChange={e=>{const m=TOUR_MAP[e.target.value]||TOUR_MAP["Desert Safari"];setGenForm(p=>({...p,category:e.target.value,...m}))}} style={{ width:"100%",padding:"10px 13px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,color:"#fff",fontSize:13,fontFamily:"'Outfit',sans-serif",outline:"none" }}>
                    {Object.keys(TOUR_MAP).map(k=><option key={k}>{k}</option>)}
                  </select>
                </div>
                <button onClick={genBlog} disabled={genLoading} style={{ width:"100%",padding:"12px",background:genLoading?"rgba(245,158,11,0.3)":"linear-gradient(135deg,#F59E0B,#D97706)",border:"none",borderRadius:10,color:"#000",fontWeight:700,fontSize:14,cursor:genLoading?"wait":"pointer",fontFamily:"'Outfit',sans-serif" }}>
                  {genLoading?`⏳ ${genMode==="ai"?"AI writing...":"Building template..."}`:`${genMode==="free"?"🆓 Generate Free":"🤖 Generate with AI"}`}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {notif&&<div className="ni" style={{ position:"fixed",top:20,right:20,zIndex:9999,padding:"11px 17px",borderRadius:10,fontSize:13,fontWeight:600,background:"rgba(16,185,129,0.93)",color:"#fff",boxShadow:"0 8px 28px rgba(0,0,0,0.4)" }}>{notif}</div>}
    </div>
  )
}
