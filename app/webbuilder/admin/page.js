"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const PW = "Salman4526";
const TABS = [
  { id:"dashboard", icon:"📊", label:"Dashboard" },
  { id:"blogs",     icon:"✍️", label:"Blog Posts" },
  { id:"addblog",   icon:"➕", label:"New Post" },
  { id:"projects",  icon:"🎨", label:"Projects" },
  { id:"leads",     icon:"📨", label:"Client Leads" },
  { id:"seo",       icon:"🔍", label:"SEO" },
  { id:"settings",  icon:"⚙️", label:"Settings" },
];
const INIT_POSTS = [
  { id:"w1", title:"How Much Does a Website Cost in Dubai in 2026?", slug:"website-cost-dubai-2026", tag:"Pricing Guide", status:"published", date:"Mar 2026", reads:2800, mins:6, desc:"Honest breakdown of web design prices in Dubai — from simple landing pages to full booking platforms." },
  { id:"w2", title:"Next.js vs WordPress: Which is Better for Dubai Businesses?", slug:"nextjs-vs-wordpress-dubai", tag:"Technical", status:"published", date:"Feb 2026", reads:1900, mins:8, desc:"Why most Dubai businesses are better served by Next.js than WordPress in 2026 — and when WordPress still makes sense." },
  { id:"w3", title:"Why Your Dubai Business Website Must Be in Arabic Too", slug:"arabic-website-dubai-business", tag:"Strategy", status:"published", date:"Feb 2026", reads:3200, mins:5, desc:"40% of Dubai residents prefer Arabic content. Here is how bilingual websites increase conversions and SEO rankings." },
  { id:"w4", title:"WhatsApp Integration: The Most Important Feature for Dubai Websites", slug:"whatsapp-website-integration", tag:"Features", status:"published", date:"Jan 2026", reads:4100, mins:4, desc:"Dubai customers prefer WhatsApp over email or contact forms. How to integrate it properly on every page." },
  { id:"w5", title:"5 Dubai Restaurant Websites That Are Actually Good", slug:"best-restaurant-websites-dubai", tag:"Showcase", status:"draft", date:"Mar 2026", reads:0, mins:7, desc:"Design analysis of the best restaurant websites in Dubai — what they do well and what most local sites get wrong." },
];
const MOCK_LEADS = [
  { id:"C001", name:"Hamid Al Rashdi",   phone:"+97150111222", biz:"Auto Garage Sharjah",   budget:"AED 2,000–4,000", date:"2026-03-21", status:"new" },
  { id:"C002", name:"Priya Mehta",        phone:"+97155333444", biz:"Indian Restaurant Dubai", budget:"AED 4,000–8,000", date:"2026-03-20", status:"demo" },
  { id:"C003", name:"Khalid Al Suwaidi",  phone:"+97156555666", biz:"Real Estate Agency",      budget:"AED 12,000+",    date:"2026-03-18", status:"sold" },
  { id:"C004", name:"Sarah Thompson",     phone:"+447899001122", biz:"Fitness Studio Dubai",   budget:"AED 3,000–6,000", date:"2026-03-17", status:"new" },
];
const SEO_DATA = [
  { page:"WebBuilder Home",         url:"/webbuilder",                         pos:28, prev:38, clicks:120, imp:2400, ctr:"5.0%", speed:97 },
  { page:"Website Cost Dubai",      url:"/webbuilder/blog/website-cost-dubai-2026",       pos:11, prev:18, clicks:240, imp:3800, ctr:"6.3%", speed:95 },
  { page:"Arabic Website Guide",    url:"/webbuilder/blog/arabic-website-dubai-business", pos:7,  prev:12, clicks:310, imp:4200, ctr:"7.4%", speed:96 },
  { page:"WhatsApp Integration",    url:"/webbuilder/blog/whatsapp-website-integration",  pos:14, prev:22, clicks:190, imp:3100, ctr:"6.1%", speed:98 },
];
const SETTINGS_DEF = { showPricing:true, showPortfolio:true, enableBlog:true, showWhatsApp:true, arabicMode:true, enableLeadForm:true };

export default function WebBuilderAdmin() {
  const [authed,   setAuthed]   = useState(false);
  const [pw,       setPw]       = useState("");
  const [pwErr,    setPwErr]    = useState("");
  const [tab,      setTab]      = useState("dashboard");
  const [posts,    setPosts]    = useState(INIT_POSTS);
  const [leads,    setLeads]    = useState(MOCK_LEADS);
  const [settings, setSettings] = useState(SETTINGS_DEF);
  const [toast,    setToast]    = useState(null);
  const [delConf,  setDelConf]  = useState(null);
  const [mounted,  setMounted]  = useState(false);
  const [newPost,  setNewPost]  = useState({ title:"", slug:"", tag:"Strategy", status:"draft", desc:"", content:"" });

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      if (localStorage.getItem("wb_admin") === "true") setAuthed(true);
      try {
        const saved = JSON.parse(localStorage.getItem("wb_posts") || "[]");
        if (saved.length) setPosts(saved);
        const s = JSON.parse(localStorage.getItem("wb_settings") || "{}");
        if (Object.keys(s).length) setSettings(p => ({...p,...s}));
      } catch(_) {}
    }
  }, []);

  if (!mounted) return <div style={{ minHeight:"100vh", background:"#0A060F" }}/>;

  const showToast = (msg, color="#EC4899") => { setToast({ msg, color }); setTimeout(() => setToast(null), 3000); };
  const login = (e) => {
    e.preventDefault();
    if (pw === PW) { setAuthed(true); localStorage.setItem("wb_admin","true"); }
    else { setPwErr("Incorrect password"); setTimeout(() => setPwErr(""), 2500); }
  };
  const logout = () => { setAuthed(false); localStorage.removeItem("wb_admin"); };
  const addPost = () => {
    if (!newPost.title || !newPost.slug) { showToast("⚠️ Title and slug required","#F59E0B"); return; }
    const p = { ...newPost, id:"w"+Date.now(), date:"Mar 2026", reads:0, mins:5 };
    const updated = [p, ...posts];
    setPosts(updated); localStorage.setItem("wb_posts", JSON.stringify(updated));
    setNewPost({ title:"", slug:"", tag:"Strategy", status:"draft", desc:"", content:"" });
    setTab("blogs"); showToast("✅ Post created!");
  };
  const deletePost = (id) => {
    const updated = posts.filter(p => p.id !== id);
    setPosts(updated); localStorage.setItem("wb_posts", JSON.stringify(updated));
    setDelConf(null); showToast("🗑️ Post deleted");
  };
  const toggleStatus = (id) => {
    const updated = posts.map(p => p.id===id ? {...p, status:p.status==="published"?"draft":"published"} : p);
    setPosts(updated); localStorage.setItem("wb_posts", JSON.stringify(updated));
    showToast("✅ Status updated");
  };
  const updateLead = (id, status) => {
    setLeads(prev => prev.map(l => l.id===id ? {...l,status} : l));
    showToast("✅ Updated");
  };

  const T = { bg:"#0A060F", sidebar:"#0D0818", card:"rgba(255,255,255,0.04)", border:"rgba(255,255,255,0.07)", text:"#F0ECF8", sub:"rgba(255,255,255,0.4)", pink:"#EC4899", purple:"#8B5CF6" };
  const INP = { width:"100%", padding:"10px 14px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(236,72,153,0.2)", borderRadius:9, color:T.text, fontSize:13, fontFamily:"'Plus Jakarta Sans',sans-serif", outline:"none" };

  if (!authed) return (
    <div style={{ minHeight:"100vh", background:T.bg, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap"/>
      <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(236,72,153,0.2)", borderRadius:22, padding:"44px 36px", width:"100%", maxWidth:400, textAlign:"center" }}>
        <div style={{ fontFamily:"'Syne',sans-serif", fontSize:20, fontWeight:800, color:T.pink, marginBottom:4 }}>Web Builder</div>
        <div style={{ fontSize:11, color:T.sub, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:28 }}>Admin Panel</div>
        <form onSubmit={login}>
          <input type="password" value={pw} onChange={e=>{setPw(e.target.value);setPwErr("");}}
            placeholder="Enter password" style={{ ...INP, padding:"13px 16px", marginBottom:8, borderColor:pwErr?"#EF4444":undefined }}/>
          {pwErr && <div style={{ color:"#EF4444", fontSize:12, marginBottom:8 }}>⚠️ {pwErr}</div>}
          <button type="submit" style={{ width:"100%", padding:"13px", background:"linear-gradient(135deg,#EC4899,#8B5CF6)", border:"none", borderRadius:10, color:"#fff", fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
            🔐 Login
          </button>
        </form>
        <Link href="/webbuilder" style={{ display:"block", marginTop:14, color:T.sub, fontSize:12, textDecoration:"none" }}>← Back to Web Builder</Link>
      </div>
    </div>
  );

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"/>
      <div suppressHydrationWarning style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Plus Jakarta Sans',sans-serif", display:"flex" }}>
        <style suppressHydrationWarning>{`*{box-sizing:border-box}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:rgba(236,72,153,0.3);border-radius:10px}.tb:hover{background:rgba(236,72,153,0.08)!important}input:focus,textarea:focus,select:focus{border-color:rgba(236,72,153,0.5)!important;outline:none!important}@keyframes si{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}.si{animation:si .3s ease}select option{background:#0A060F;color:#fff}`}</style>

        {/* Sidebar */}
        <div style={{ width:210, background:T.sidebar, borderRight:`1px solid ${T.border}`, display:"flex", flexDirection:"column", minHeight:"100vh", flexShrink:0, position:"sticky", top:0, height:"100vh" }}>
          <div style={{ padding:"16px 14px", borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:32, height:32, borderRadius:8, background:"linear-gradient(135deg,#EC4899,#8B5CF6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15 }}>💻</div>
            <div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:13, fontWeight:800, color:T.pink }}>Web Builder</div>
              <div style={{ fontSize:8, color:T.sub, textTransform:"uppercase", letterSpacing:"0.1em" }}>Admin Panel</div>
            </div>
          </div>
          <div style={{ flex:1, padding:"8px", overflowY:"auto" }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} className="tb"
                style={{ width:"100%", display:"flex", alignItems:"center", gap:8, padding:"10px 12px", borderRadius:9, border:"none", background:tab===t.id?"rgba(236,72,153,0.1)":"transparent", color:tab===t.id?T.pink:T.sub, fontSize:12, fontWeight:tab===t.id?700:400, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:2, textAlign:"left", transition:"all 0.15s" }}>
                <span>{t.icon}</span>{t.label}
                {t.id==="leads" && leads.filter(l=>l.status==="new").length > 0 && <span style={{ marginLeft:"auto", background:"#EF4444", color:"#fff", borderRadius:10, padding:"1px 6px", fontSize:9, fontWeight:700 }}>{leads.filter(l=>l.status==="new").length}</span>}
              </button>
            ))}
          </div>
          <div style={{ padding:"8px", borderTop:`1px solid ${T.border}` }}>
            <Link href="/webbuilder" style={{ display:"flex", alignItems:"center", gap:7, padding:"9px 12px", borderRadius:9, color:T.sub, fontSize:12, textDecoration:"none" }}>🌐 View Site</Link>
            <Link href="/webbuilder/blog" style={{ display:"flex", alignItems:"center", gap:7, padding:"9px 12px", borderRadius:9, color:T.sub, fontSize:12, textDecoration:"none" }}>✍️ View Blog</Link>
            <button onClick={logout} style={{ width:"100%", display:"flex", alignItems:"center", gap:7, padding:"9px 12px", borderRadius:9, border:"none", background:"rgba(239,68,68,0.08)", color:"#EF4444", fontSize:12, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif", marginTop:4 }}>🔴 Logout</button>
          </div>
        </div>

        {/* Main */}
        <div style={{ flex:1, overflow:"auto" }}>
          <div style={{ padding:"14px 26px", borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", background:T.bg, position:"sticky", top:0, zIndex:10 }}>
            <div style={{ fontSize:18, fontWeight:700 }}>{TABS.find(t=>t.id===tab)?.icon} {TABS.find(t=>t.id===tab)?.label}</div>
            <Link href="/webbuilder" style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:9, padding:"7px 14px", color:T.sub, fontSize:12, textDecoration:"none" }}>← Back</Link>
          </div>
          <div style={{ padding:"22px 26px" }}>

            {tab==="dashboard" && (
              <div className="si">
                <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:22 }}>
                  {[["✍️","Published Posts",posts.filter(p=>p.status==="published").length,T.pink],["📨","New Leads",leads.filter(l=>l.status==="new").length,"#EF4444"],["💰","Est. Revenue","AED 18K+","#F59E0B"],["👁️","Blog Views",posts.reduce((s,p)=>s+(p.reads||0),0).toLocaleString(),"#818CF8"]].map(([ic,lb,vl,cl]) => (
                    <div key={lb} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:13, padding:"16px 18px" }}>
                      <div style={{ fontSize:10, color:T.sub, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>{ic} {lb}</div>
                      <div style={{ fontSize:26, fontWeight:800, color:cl }}>{vl}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:13, overflow:"hidden", marginBottom:14 }}>
                  <div style={{ padding:"12px 18px", borderBottom:`1px solid ${T.border}`, fontSize:13, fontWeight:700 }}>📨 Recent Client Leads</div>
                  {leads.map((l,i) => (
                    <div key={l.id} style={{ display:"flex", alignItems:"center", gap:14, padding:"11px 18px", borderBottom:i<leads.length-1?`1px solid ${T.border}`:"none" }}>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13, fontWeight:600 }}>{l.name}</div>
                        <div style={{ fontSize:11, color:T.sub }}>{l.biz} · {l.budget} · {l.date}</div>
                      </div>
                      <span style={{ fontSize:9, fontWeight:700, padding:"2px 8px", borderRadius:5, textTransform:"uppercase", background:l.status==="new"?"rgba(239,68,68,0.15)":l.status==="sold"?"rgba(236,72,153,0.15)":"rgba(245,158,11,0.15)", color:l.status==="new"?"#EF4444":l.status==="sold"?T.pink:"#F59E0B" }}>{l.status}</span>
                      <a href={`https://wa.me/${l.phone.replace(/[^0-9]/g,"")}`} target="_blank" rel="noopener noreferrer" style={{ padding:"5px 10px", background:"rgba(37,211,102,0.12)", border:"1px solid rgba(37,211,102,0.25)", borderRadius:7, color:"#25D366", fontSize:11, fontWeight:700, textDecoration:"none" }}>💬</a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab==="blogs" && (
              <div className="si">
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                  <div style={{ fontSize:13, color:T.sub }}>{posts.length} posts</div>
                  <button onClick={()=>setTab("addblog")} style={{ background:"linear-gradient(135deg,#EC4899,#8B5CF6)", border:"none", borderRadius:9, padding:"9px 18px", color:"#fff", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>+ New Post</button>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {posts.map(p => (
                    <div key={p.id} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"14px 18px", display:"flex", alignItems:"center", gap:14 }}>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13, fontWeight:700, marginBottom:3 }}>{p.title}</div>
                        <div style={{ fontSize:11, color:T.sub }}>{p.tag} · {p.date} · 👁 {p.reads.toLocaleString()}</div>
                      </div>
                      <div style={{ display:"flex", gap:6, flexShrink:0 }}>
                        <Link href={`/webbuilder/blog/${p.slug}`} target="_blank" style={{ padding:"5px 10px", background:"rgba(236,72,153,0.1)", border:"1px solid rgba(236,72,153,0.25)", borderRadius:7, color:T.pink, fontSize:11, fontWeight:700, textDecoration:"none" }}>👁️</Link>
                        <button onClick={()=>toggleStatus(p.id)} style={{ padding:"5px 10px", background:p.status==="published"?"rgba(239,68,68,0.1)":"rgba(236,72,153,0.1)", border:`1px solid ${p.status==="published"?"rgba(239,68,68,0.3)":"rgba(236,72,153,0.3)"}`, borderRadius:7, color:p.status==="published"?"#EF4444":T.pink, fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                          {p.status==="published"?"Unpublish":"Publish"}
                        </button>
                        {delConf===p.id ? (
                          <div style={{ display:"flex", gap:4 }}>
                            <button onClick={()=>deletePost(p.id)} style={{ padding:"5px 10px", background:"rgba(239,68,68,0.2)", border:"1px solid rgba(239,68,68,0.4)", borderRadius:7, color:"#EF4444", fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Confirm</button>
                            <button onClick={()=>setDelConf(null)} style={{ padding:"5px 10px", background:T.card, border:`1px solid ${T.border}`, borderRadius:7, color:T.sub, fontSize:11, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Cancel</button>
                          </div>
                        ) : (
                          <button onClick={()=>setDelConf(p.id)} style={{ padding:"5px 10px", background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:7, color:"#EF4444", fontSize:11, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>🗑️</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab==="addblog" && (
              <div className="si" style={{ maxWidth:680 }}>
                <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                  {[{l:"Post Title *",k:"title",ph:"e.g. How to Build a Restaurant Website in Dubai"},{l:"URL Slug *",k:"slug",ph:"e.g. restaurant-website-dubai"}].map(f => (
                    <div key={f.k}>
                      <label style={{ fontSize:11, color:T.sub, display:"block", marginBottom:5, textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:600 }}>{f.l}</label>
                      <input value={newPost[f.k]} onChange={e=>setNewPost(p=>({...p,[f.k]:e.target.value.toLowerCase().replace(/\s+/g,"-")}))} placeholder={f.ph} style={{ ...INP }}/>
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize:11, color:T.sub, display:"block", marginBottom:5, textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:600 }}>Category</label>
                    <select value={newPost.tag} onChange={e=>setNewPost(p=>({...p,tag:e.target.value}))} style={{ ...INP }}>
                      {["Strategy","Pricing Guide","Technical","Features","Showcase","Case Study"].map(t=><option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize:11, color:T.sub, display:"block", marginBottom:5, textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:600 }}>Short Description</label>
                    <textarea value={newPost.desc} onChange={e=>setNewPost(p=>({...p,desc:e.target.value}))} placeholder="Shown on the blog listing page..." rows={3} style={{ ...INP, resize:"vertical" }}/>
                  </div>
                  <div>
                    <label style={{ fontSize:11, color:T.sub, display:"block", marginBottom:5, textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:600 }}>Full Content</label>
                    <textarea value={newPost.content} onChange={e=>setNewPost(p=>({...p,content:e.target.value}))} placeholder="Write your full article here..." rows={10} style={{ ...INP, resize:"vertical" }}/>
                  </div>
                  <div>
                    <label style={{ fontSize:11, color:T.sub, display:"block", marginBottom:5, textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:600 }}>Status</label>
                    <select value={newPost.status} onChange={e=>setNewPost(p=>({...p,status:e.target.value}))} style={{ ...INP }}>
                      <option value="draft">Draft</option><option value="published">Published</option>
                    </select>
                  </div>
                  <div style={{ display:"flex", gap:10 }}>
                    <button onClick={addPost} style={{ flex:2, padding:"13px", background:"linear-gradient(135deg,#EC4899,#8B5CF6)", border:"none", borderRadius:11, color:"#fff", fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>✅ Publish Post</button>
                    <button onClick={()=>{setNewPost({title:"",slug:"",tag:"Strategy",status:"draft",desc:"",content:""});setTab("blogs");}} style={{ flex:1, padding:"13px", background:T.card, border:`1px solid ${T.border}`, borderRadius:11, color:T.sub, fontSize:13, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Cancel</button>
                  </div>
                </div>
              </div>
            )}

            {tab==="projects" && (
              <div className="si">
                <div style={{ fontSize:13, color:T.sub, marginBottom:16 }}>Live client projects</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:12 }}>
                  {[{n:"DubaiRovers.com",c:"Tourism",s:"Live",cl:"#F97316"},{n:"Dubai Properties",c:"Real Estate",s:"Live",cl:"#6366F1"},{n:"ARCHAI",c:"AI Design",s:"Live",cl:"#C8A96E"},{n:"SK Auto Garage",c:"Auto Service",s:"Live",cl:"#3B82F6"},{n:"SK Restaurant",c:"F&B",s:"Live",cl:"#EF4444"},{n:"SalmanFX",c:"Fintech",s:"Live",cl:"#10B981"}].map(p => (
                    <div key={p.n} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"14px 16px", display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ width:36, height:36, borderRadius:9, background:`${p.cl}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0 }}>🌐</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13, fontWeight:700, color:"#fff" }}>{p.n}</div>
                        <div style={{ fontSize:11, color:T.sub }}>{p.c}</div>
                      </div>
                      <span style={{ fontSize:9, fontWeight:700, padding:"2px 8px", borderRadius:5, background:"rgba(16,185,129,0.15)", color:"#10B981", textTransform:"uppercase" }}>{p.s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab==="leads" && (
              <div className="si">
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {leads.map(l => (
                    <div key={l.id} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:13, padding:"14px 18px", display:"flex", alignItems:"center", gap:14, flexWrap:"wrap" }}>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:14, fontWeight:700, marginBottom:2 }}>{l.name}</div>
                        <div style={{ fontSize:11, color:T.sub }}>🏢 {l.biz} · 💰 {l.budget} · 📅 {l.date}</div>
                        <div style={{ fontSize:11, color:T.sub }}>📱 {l.phone}</div>
                      </div>
                      <div style={{ display:"flex", gap:7, flexShrink:0 }}>
                        <a href={`https://wa.me/${l.phone.replace(/[^0-9]/g,"")}`} target="_blank" rel="noopener noreferrer" style={{ padding:"7px 14px", background:"rgba(37,211,102,0.12)", border:"1px solid rgba(37,211,102,0.25)", borderRadius:8, color:"#25D366", fontSize:12, fontWeight:700, textDecoration:"none" }}>💬 WhatsApp</a>
                        <select value={l.status} onChange={e=>updateLead(l.id,e.target.value)} style={{ ...INP, width:"auto", padding:"6px 10px", fontSize:12, cursor:"pointer" }}>
                          {["new","contacted","demo","sold","lost"].map(s=><option key={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab==="seo" && (
              <div className="si">
                <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:22 }}>
                  {[["🏆","Avg Position","15.0",T.pink],["👁️","Impressions","13,500","#818CF8"],["🖱️","Clicks","860","#10B981"],["📈","Avg CTR","6.4%",T.pink]].map(([ic,lb,vl,cl]) => (
                    <div key={lb} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:13, padding:"16px 18px" }}>
                      <div style={{ fontSize:10, color:T.sub, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>{ic} {lb}</div>
                      <div style={{ fontSize:26, fontWeight:800, color:cl }}>{vl}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:13, overflow:"hidden", marginBottom:14 }}>
                  <table style={{ width:"100%", borderCollapse:"collapse" }}>
                    <thead><tr style={{ background:"rgba(255,255,255,0.03)" }}>{["Page","Position","Clicks","Impressions","CTR"].map(h=><th key={h} style={{ padding:"9px 14px", fontSize:10, color:T.sub, textAlign:"left", fontWeight:500, textTransform:"uppercase" }}>{h}</th>)}</tr></thead>
                    <tbody>
                      {SEO_DATA.map(r => (
                        <tr key={r.page} style={{ borderTop:`1px solid ${T.border}` }}>
                          <td style={{ padding:"10px 14px", fontSize:12, color:T.text }}>{r.page}</td>
                          <td style={{ padding:"10px 14px", fontSize:12, color:r.pos<=10?"#10B981":r.pos<=20?"#F59E0B":"#EF4444", fontWeight:700 }}>#{r.pos}</td>
                          <td style={{ padding:"10px 14px", fontSize:12 }}>{r.clicks}</td>
                          <td style={{ padding:"10px 14px", fontSize:12, color:T.sub }}>{r.imp.toLocaleString()}</td>
                          <td style={{ padding:"10px 14px", fontSize:12, color:"#F59E0B" }}>{r.ctr}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ background:"rgba(236,72,153,0.06)", border:"1px solid rgba(236,72,153,0.15)", borderRadius:11, padding:"13px 16px", fontSize:12, color:T.sub, lineHeight:1.7 }}>
                  💡 <strong style={{ color:T.pink }}>SEO Tips for Web Builder:</strong> Target "web designer Dubai", "website design Dubai price", "React developer Dubai" — high commercial intent. Arabic content like "تصميم موقع دبي" doubles your reach in the local market.
                </div>
              </div>
            )}

            {tab==="settings" && (
              <div className="si" style={{ maxWidth:560 }}>
                <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:13, overflow:"hidden" }}>
                  {[
                    { key:"showPricing",    label:"Show Pricing Table",    sub:"Display 4-tier pricing on main page" },
                    { key:"showPortfolio",  label:"Show Portfolio Section", sub:"Display live project portfolio cards" },
                    { key:"enableBlog",     label:"Enable Blog",            sub:"Show blog navigation link and listing" },
                    { key:"showWhatsApp",   label:"WhatsApp CTA Buttons",  sub:"Show WhatsApp buttons across the site" },
                    { key:"arabicMode",     label:"Arabic Page Support",   sub:"Add Arabic version option to the site" },
                    { key:"enableLeadForm", label:"Lead Capture Forms",    sub:"Show quote request forms on the site" },
                  ].map((f,i) => (
                    <div key={f.key} style={{ display:"flex", alignItems:"center", gap:14, padding:"13px 18px", borderBottom:i<5?`1px solid ${T.border}`:"none" }}>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13, fontWeight:600 }}>{f.label}</div>
                        <div style={{ fontSize:11, color:T.sub, marginTop:1 }}>{f.sub}</div>
                      </div>
                      <div onClick={() => { const s={...settings,[f.key]:!settings[f.key]}; setSettings(s); localStorage.setItem("wb_settings",JSON.stringify(s)); showToast("✅ Saved"); }}
                        style={{ width:44, height:24, borderRadius:12, background:settings[f.key]?T.pink:"rgba(255,255,255,0.1)", cursor:"pointer", position:"relative", transition:"background 0.2s", flexShrink:0 }}>
                        <div style={{ position:"absolute", top:3, left:settings[f.key]?23:3, width:18, height:18, borderRadius:"50%", background:"#fff", transition:"left 0.2s" }}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {toast && <div style={{ position:"fixed", bottom:22, right:22, zIndex:9999, background:toast.color, color:"#fff", padding:"11px 18px", borderRadius:11, fontSize:13, fontWeight:600, boxShadow:"0 6px 24px rgba(0,0,0,0.4)" }}>{toast.msg}</div>}
      </div>
    </>
  );
}
