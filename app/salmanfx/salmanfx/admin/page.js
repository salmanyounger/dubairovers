"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const PW = "Salman4526";
const TABS = [
  { id:"dashboard", icon:"📊", label:"Dashboard" },
  { id:"blogs",     icon:"✍️", label:"Blog Posts" },
  { id:"addblog",   icon:"➕", label:"New Post" },
  { id:"leads",     icon:"📨", label:"EA Inquiries" },
  { id:"seo",       icon:"🔍", label:"SEO" },
  { id:"settings",  icon:"⚙️", label:"Settings" },
];
const INIT_POSTS = [
  { id:"s1", title:"MM FLIP CODEPRO v2.4 — What's New in 2026", slug:"mm-flip-codepro-v24", tag:"EA Update", status:"published", date:"Mar 2026", reads:1200, mins:5, desc:"New lot progression logic, improved Parabolic SAR sensitivity, and a dashboard redesign. Everything you need to know about the latest version." },
  { id:"s2", title:"Parabolic SAR Strategy: Complete Guide for MT4 Traders", slug:"parabolic-sar-mt4-guide", tag:"Strategy", status:"published", date:"Feb 2026", reads:3400, mins:8, desc:"How Parabolic SAR works, optimal settings for XAUUSD, and why it forms the core of MM FLIP CODEPRO." },
  { id:"s3", title:"Best Forex Pairs for Expert Advisors in 2026", slug:"best-forex-pairs-ea-2026", tag:"Trading Tips", status:"published", date:"Feb 2026", reads:2100, mins:6, desc:"XAUUSD leads for volatility, EURUSD for stability. Here is which pairs work best with automated EAs and why." },
  { id:"s4", title:"VPS Setup Guide for MT4 on Contabo", slug:"vps-mt4-contabo-setup", tag:"Setup Guide", status:"published", date:"Jan 2026", reads:1800, mins:10, desc:"Step-by-step: set up a Contabo VPS, install MT4, attach your EA, and run 24/5 automated trading. Complete beginner guide." },
  { id:"s5", title:"Why 67% Win Rate Beats 90% Win Rate in Forex EAs", slug:"win-rate-vs-risk-reward", tag:"Education", status:"draft", date:"Mar 2026", reads:0, mins:7, desc:"High win rate sounds great. But a 67% win rate with a 1.8 R:R ratio beats a 90% win rate with 0.2 R:R every time. The math explained." },
];
const MOCK_LEADS = [
  { id:"L001", name:"Muhammad Asad", phone:"+971501234567", plan:"Pro EA Bundle (AED 699)",   date:"2026-03-21", status:"new" },
  { id:"L002", name:"Farrukh Tashkentov", phone:"+998901234567", plan:"VIP Package (AED 1,499)", date:"2026-03-20", status:"contacted" },
  { id:"L003", name:"Ahmed Saeed", phone:"+923001234567", plan:"Starter EA (AED 299)",    date:"2026-03-19", status:"sold" },
  { id:"L004", name:"James Wilson", phone:"+447911123456", plan:"Pro EA Bundle (AED 699)",   date:"2026-03-18", status:"new" },
];
const SEO_DATA = [
  { page:"SalmanFX Home",        url:"/salmanfx",                        pos:22, prev:31, clicks:180, imp:3200, ctr:"5.6%", speed:96 },
  { page:"Parabolic SAR Guide",  url:"/salmanfx/blog/parabolic-sar-mt4-guide", pos:9, prev:14, clicks:290, imp:4100, ctr:"7.1%", speed:94 },
  { page:"VPS Setup Guide",      url:"/salmanfx/blog/vps-mt4-contabo-setup",   pos:14, prev:20, clicks:160, imp:2800, ctr:"5.7%", speed:95 },
  { page:"Best Forex Pairs EA",  url:"/salmanfx/blog/best-forex-pairs-ea-2026",pos:18, prev:25, clicks:120, imp:2400, ctr:"5.0%", speed:97 },
];
const SETTINGS_DEF = { showResults:true, showPricing:true, enableWhatsApp:true, showDisclaimer:true, enableBlog:true };

export default function SalmanFXAdmin() {
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
      if (localStorage.getItem("sfx_admin") === "true") setAuthed(true);
      try {
        const saved = JSON.parse(localStorage.getItem("sfx_posts") || "[]");
        if (saved.length) setPosts(saved);
        const s = JSON.parse(localStorage.getItem("sfx_settings") || "{}");
        if (Object.keys(s).length) setSettings(p => ({...p,...s}));
      } catch(_) {}
    }
  }, []);

  if (!mounted) return <div style={{ minHeight:"100vh", background:"#060A0D" }}/>;

  const showToast = (msg, color="#10B981") => { setToast({ msg, color }); setTimeout(() => setToast(null), 3000); };
  const login = (e) => {
    e.preventDefault();
    if (pw === PW) { setAuthed(true); localStorage.setItem("sfx_admin","true"); }
    else { setPwErr("Incorrect password"); setTimeout(() => setPwErr(""), 2500); }
  };
  const logout = () => { setAuthed(false); localStorage.removeItem("sfx_admin"); };
  const addPost = () => {
    if (!newPost.title || !newPost.slug) { showToast("⚠️ Title and slug required","#F59E0B"); return; }
    const p = { ...newPost, id:"s"+Date.now(), date:"Mar 2026", reads:0, mins:5 };
    const updated = [p, ...posts];
    setPosts(updated); localStorage.setItem("sfx_posts", JSON.stringify(updated));
    setNewPost({ title:"", slug:"", tag:"Strategy", status:"draft", desc:"", content:"" });
    setTab("blogs"); showToast("✅ Post created!");
  };
  const deletePost = (id) => {
    const updated = posts.filter(p => p.id !== id);
    setPosts(updated); localStorage.setItem("sfx_posts", JSON.stringify(updated));
    setDelConf(null); showToast("🗑️ Post deleted");
  };
  const toggleStatus = (id) => {
    const updated = posts.map(p => p.id===id ? {...p, status:p.status==="published"?"draft":"published"} : p);
    setPosts(updated); localStorage.setItem("sfx_posts", JSON.stringify(updated));
    showToast("✅ Status updated");
  };
  const updateLead = (id, status) => {
    setLeads(prev => prev.map(l => l.id===id ? {...l,status} : l));
    showToast("✅ Lead updated");
  };

  const T = { bg:"#060A0D", sidebar:"#080D10", card:"rgba(255,255,255,0.04)", border:"rgba(255,255,255,0.07)", text:"#E8F0E8", sub:"rgba(255,255,255,0.4)", green:"#10B981" };
  const INP = { width:"100%", padding:"10px 14px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(16,185,129,0.2)", borderRadius:9, color:T.text, fontSize:13, fontFamily:"'Plus Jakarta Sans',sans-serif", outline:"none" };

  if (!authed) return (
    <div style={{ minHeight:"100vh", background:T.bg, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@700&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap"/>
      <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(16,185,129,0.2)", borderRadius:22, padding:"44px 36px", width:"100%", maxWidth:400, textAlign:"center" }}>
        <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:22, fontWeight:700, color:T.green, letterSpacing:"0.05em", marginBottom:4 }}>SalmanFX</div>
        <div style={{ fontSize:11, color:T.sub, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:28 }}>Admin Panel</div>
        <form onSubmit={login}>
          <input type="password" value={pw} onChange={e=>{setPw(e.target.value);setPwErr("");}}
            placeholder="Enter password" style={{ ...INP, padding:"13px 16px", marginBottom:8, borderColor:pwErr?"#EF4444":undefined }}/>
          {pwErr && <div style={{ color:"#EF4444", fontSize:12, marginBottom:8 }}>⚠️ {pwErr}</div>}
          <button type="submit" style={{ width:"100%", padding:"13px", background:"linear-gradient(135deg,#10B981,#059669)", border:"none", borderRadius:10, color:"#fff", fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
            🔐 Login
          </button>
        </form>
        <Link href="/salmanfx" style={{ display:"block", marginTop:14, color:T.sub, fontSize:12, textDecoration:"none" }}>← Back to SalmanFX</Link>
      </div>
    </div>
  );

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"/>
      <div suppressHydrationWarning style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Plus Jakarta Sans',sans-serif", display:"flex" }}>
        <style suppressHydrationWarning>{`*{box-sizing:border-box}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:rgba(16,185,129,0.3);border-radius:10px}.tb:hover{background:rgba(16,185,129,0.08)!important}input:focus,textarea:focus,select:focus{border-color:rgba(16,185,129,0.5)!important;outline:none!important}@keyframes si{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}.si{animation:si .3s ease}select option{background:#060A0D;color:#fff}`}</style>

        {/* Sidebar */}
        <div style={{ width:210, background:T.sidebar, borderRight:`1px solid ${T.border}`, display:"flex", flexDirection:"column", minHeight:"100vh", flexShrink:0, position:"sticky", top:0, height:"100vh" }}>
          <div style={{ padding:"16px 14px", borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:32, height:32, borderRadius:8, background:"linear-gradient(135deg,#10B981,#059669)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15 }}>📈</div>
            <div>
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:14, fontWeight:700, color:T.green }}>SalmanFX</div>
              <div style={{ fontSize:8, color:T.sub, textTransform:"uppercase", letterSpacing:"0.1em" }}>Admin Panel</div>
            </div>
          </div>
          <div style={{ flex:1, padding:"8px", overflowY:"auto" }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} className="tb"
                style={{ width:"100%", display:"flex", alignItems:"center", gap:8, padding:"10px 12px", borderRadius:9, border:"none", background:tab===t.id?"rgba(16,185,129,0.12)":"transparent", color:tab===t.id?T.green:T.sub, fontSize:12, fontWeight:tab===t.id?700:400, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif", marginBottom:2, textAlign:"left", transition:"all 0.15s" }}>
                <span>{t.icon}</span>{t.label}
                {t.id==="leads" && leads.filter(l=>l.status==="new").length > 0 && <span style={{ marginLeft:"auto", background:"#EF4444", color:"#fff", borderRadius:10, padding:"1px 6px", fontSize:9, fontWeight:700 }}>{leads.filter(l=>l.status==="new").length}</span>}
              </button>
            ))}
          </div>
          <div style={{ padding:"8px", borderTop:`1px solid ${T.border}` }}>
            <Link href="/salmanfx" style={{ display:"flex", alignItems:"center", gap:7, padding:"9px 12px", borderRadius:9, color:T.sub, fontSize:12, textDecoration:"none" }}>🌐 View Site</Link>
            <Link href="/salmanfx/blog" style={{ display:"flex", alignItems:"center", gap:7, padding:"9px 12px", borderRadius:9, color:T.sub, fontSize:12, textDecoration:"none" }}>✍️ View Blog</Link>
            <button onClick={logout} style={{ width:"100%", display:"flex", alignItems:"center", gap:7, padding:"9px 12px", borderRadius:9, border:"none", background:"rgba(239,68,68,0.08)", color:"#EF4444", fontSize:12, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif", marginTop:4 }}>🔴 Logout</button>
          </div>
        </div>

        {/* Main */}
        <div style={{ flex:1, overflow:"auto" }}>
          <div style={{ padding:"14px 26px", borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", background:T.bg, position:"sticky", top:0, zIndex:10 }}>
            <div style={{ fontSize:18, fontWeight:700 }}>{TABS.find(t=>t.id===tab)?.icon} {TABS.find(t=>t.id===tab)?.label}</div>
            <Link href="/salmanfx" style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:9, padding:"7px 14px", color:T.sub, fontSize:12, textDecoration:"none" }}>← Back</Link>
          </div>

          <div style={{ padding:"22px 26px" }}>

            {tab==="dashboard" && (
              <div className="si">
                <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:22 }}>
                  {[
                    { icon:"✍️", label:"Published Posts", val:posts.filter(p=>p.status==="published").length, color:T.green },
                    { icon:"📨", label:"New Leads", val:leads.filter(l=>l.status==="new").length, color:"#EF4444" },
                    { icon:"💰", label:"Estimated Revenue", val:"AED 2,497", color:"#F59E0B" },
                    { icon:"👁️", label:"Blog Views", val:posts.reduce((s,p)=>s+(p.reads||0),0).toLocaleString(), color:"#818CF8" },
                  ].map(s => (
                    <div key={s.label} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:13, padding:"16px 18px" }}>
                      <div style={{ fontSize:10, color:T.sub, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>{s.icon} {s.label}</div>
                      <div style={{ fontSize:26, fontWeight:800, color:s.color }}>{s.val}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:13, overflow:"hidden", marginBottom:16 }}>
                  <div style={{ padding:"12px 18px", borderBottom:`1px solid ${T.border}`, fontSize:13, fontWeight:700 }}>📨 Recent EA Inquiries</div>
                  {leads.map((l,i) => (
                    <div key={l.id} style={{ display:"flex", alignItems:"center", gap:14, padding:"11px 18px", borderBottom:i<leads.length-1?`1px solid ${T.border}`:"none" }}>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13, fontWeight:600 }}>{l.name}</div>
                        <div style={{ fontSize:11, color:T.sub }}>{l.plan} · {l.date}</div>
                      </div>
                      <span style={{ fontSize:9, fontWeight:700, padding:"2px 8px", borderRadius:5, textTransform:"uppercase", background:l.status==="new"?"rgba(239,68,68,0.15)":l.status==="sold"?"rgba(16,185,129,0.15)":"rgba(245,158,11,0.15)", color:l.status==="new"?"#EF4444":l.status==="sold"?"#10B981":"#F59E0B" }}>{l.status}</span>
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
                  <button onClick={()=>setTab("addblog")} style={{ background:"linear-gradient(135deg,#10B981,#059669)", border:"none", borderRadius:9, padding:"9px 18px", color:"#fff", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>+ New Post</button>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {posts.map(p => (
                    <div key={p.id} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"14px 18px", display:"flex", alignItems:"center", gap:14 }}>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13, fontWeight:700, marginBottom:3 }}>{p.title}</div>
                        <div style={{ fontSize:11, color:T.sub }}>{p.tag} · {p.date} · 👁 {p.reads.toLocaleString()}</div>
                      </div>
                      <div style={{ display:"flex", gap:6, flexShrink:0 }}>
                        <Link href={`/salmanfx/blog/${p.slug}`} target="_blank" style={{ padding:"5px 10px", background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.25)", borderRadius:7, color:T.green, fontSize:11, fontWeight:700, textDecoration:"none" }}>👁️</Link>
                        <button onClick={()=>toggleStatus(p.id)} style={{ padding:"5px 10px", background:p.status==="published"?"rgba(239,68,68,0.1)":"rgba(16,185,129,0.1)", border:`1px solid ${p.status==="published"?"rgba(239,68,68,0.3)":"rgba(16,185,129,0.3)"}`, borderRadius:7, color:p.status==="published"?"#EF4444":T.green, fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
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
                  {[{l:"Post Title *",k:"title",ph:"e.g. Parabolic SAR Setup for XAUUSD"},{l:"URL Slug *",k:"slug",ph:"e.g. parabolic-sar-xauusd-setup"}].map(f => (
                    <div key={f.k}>
                      <label style={{ fontSize:11, color:T.sub, display:"block", marginBottom:5, textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:600 }}>{f.l}</label>
                      <input value={newPost[f.k]} onChange={e=>setNewPost(p=>({...p,[f.k]:e.target.value.toLowerCase().replace(/\s+/g,"-")}))} placeholder={f.ph} style={{ ...INP }}/>
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize:11, color:T.sub, display:"block", marginBottom:5, textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:600 }}>Category</label>
                    <select value={newPost.tag} onChange={e=>setNewPost(p=>({...p,tag:e.target.value}))} style={{ ...INP }}>
                      {["Strategy","EA Update","Setup Guide","Trading Tips","Education","Results"].map(t=><option key={t}>{t}</option>)}
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
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                  <div style={{ display:"flex", gap:10 }}>
                    <button onClick={addPost} style={{ flex:2, padding:"13px", background:"linear-gradient(135deg,#10B981,#059669)", border:"none", borderRadius:11, color:"#fff", fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>✅ Publish Post</button>
                    <button onClick={()=>{setNewPost({title:"",slug:"",tag:"Strategy",status:"draft",desc:"",content:""});setTab("blogs");}} style={{ flex:1, padding:"13px", background:T.card, border:`1px solid ${T.border}`, borderRadius:11, color:T.sub, fontSize:13, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Cancel</button>
                  </div>
                </div>
              </div>
            )}

            {tab==="leads" && (
              <div className="si">
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {leads.map(l => (
                    <div key={l.id} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:13, padding:"14px 18px", display:"flex", alignItems:"center", gap:14, flexWrap:"wrap" }}>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:14, fontWeight:700, marginBottom:3 }}>{l.name}</div>
                        <div style={{ fontSize:11, color:T.sub }}>📱 {l.phone} · {l.plan} · 📅 {l.date}</div>
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
                  {[["🏆","Avg Position","15.8","#F59E0B"],["👁️","Impressions","12,500","#818CF8"],["🖱️","Clicks","750",T.green],["📈","Avg CTR","6.0%",T.green]].map(([ic,lb,vl,cl]) => (
                    <div key={lb} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:13, padding:"16px 18px" }}>
                      <div style={{ fontSize:10, color:T.sub, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>{ic} {lb}</div>
                      <div style={{ fontSize:26, fontWeight:800, color:cl }}>{vl}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:13, overflow:"hidden", marginBottom:14 }}>
                  <div style={{ padding:"12px 18px", borderBottom:`1px solid ${T.border}`, fontSize:13, fontWeight:700 }}>📄 Page Performance</div>
                  <table style={{ width:"100%", borderCollapse:"collapse" }}>
                    <thead><tr style={{ background:"rgba(255,255,255,0.03)" }}>{["Page","Position","Clicks","Impressions","CTR"].map(h=><th key={h} style={{ padding:"9px 14px", fontSize:10, color:T.sub, textAlign:"left", fontWeight:500, textTransform:"uppercase", letterSpacing:"0.06em" }}>{h}</th>)}</tr></thead>
                    <tbody>
                      {SEO_DATA.map(r => (
                        <tr key={r.page} style={{ borderTop:`1px solid ${T.border}` }}>
                          <td style={{ padding:"10px 14px", fontSize:12, color:T.text }}>{r.page}</td>
                          <td style={{ padding:"10px 14px", fontSize:12, color:r.pos<=10?T.green:r.pos<=20?"#F59E0B":"#EF4444", fontWeight:700 }}>#{r.pos}</td>
                          <td style={{ padding:"10px 14px", fontSize:12 }}>{r.clicks}</td>
                          <td style={{ padding:"10px 14px", fontSize:12, color:T.sub }}>{r.imp.toLocaleString()}</td>
                          <td style={{ padding:"10px 14px", fontSize:12, color:"#F59E0B" }}>{r.ctr}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ background:"rgba(16,185,129,0.06)", border:"1px solid rgba(16,185,129,0.15)", borderRadius:11, padding:"13px 16px", fontSize:12, color:T.sub, lineHeight:1.7 }}>
                  💡 <strong style={{ color:T.green }}>SEO Tips for SalmanFX:</strong> Target "forex EA MT4 Dubai", "buy expert advisor MT4", "automated trading robot MT4" — these have strong commercial intent. Your blog posts on specific strategies rank faster than generic forex content.
                </div>
              </div>
            )}

            {tab==="settings" && (
              <div className="si" style={{ maxWidth:560 }}>
                <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:13, overflow:"hidden" }}>
                  {[
                    { key:"showResults",    label:"Show Trading Results",  sub:"Display live results section on main page" },
                    { key:"showPricing",    label:"Show Pricing Plans",    sub:"Display EA pricing table" },
                    { key:"enableWhatsApp", label:"WhatsApp Buy Buttons",  sub:"Show Buy on WhatsApp CTA on pricing cards" },
                    { key:"showDisclaimer", label:"Show Risk Disclaimer",  sub:"Display forex risk warning (recommended)" },
                    { key:"enableBlog",     label:"Enable Blog Section",   sub:"Show blog link in navigation" },
                  ].map((f,i) => (
                    <div key={f.key} style={{ display:"flex", alignItems:"center", gap:14, padding:"13px 18px", borderBottom:i<4?`1px solid ${T.border}`:"none" }}>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13, fontWeight:600 }}>{f.label}</div>
                        <div style={{ fontSize:11, color:T.sub, marginTop:1 }}>{f.sub}</div>
                      </div>
                      <div onClick={() => { const s={...settings,[f.key]:!settings[f.key]}; setSettings(s); localStorage.setItem("sfx_settings",JSON.stringify(s)); showToast("✅ Saved"); }}
                        style={{ width:44, height:24, borderRadius:12, background:settings[f.key]?T.green:"rgba(255,255,255,0.1)", cursor:"pointer", position:"relative", transition:"background 0.2s", flexShrink:0 }}>
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
