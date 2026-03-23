"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const PW = "archai2025";
const TABS = [
  { id:"dashboard", icon:"📊", label:"Dashboard" },
  { id:"blogs",     icon:"✍️", label:"Blog Posts" },
  { id:"addblog",   icon:"➕", label:"New Post" },
  { id:"seo",       icon:"🔍", label:"SEO" },
  { id:"settings",  icon:"⚙️", label:"Settings" },
];
const INIT_POSTS = [
  { id:"p1", title:"How AI is Changing Villa Design in 2026", slug:"ai-villa-design-2026", tag:"AI Design", status:"published", date:"Mar 2026", reads:2400, mins:5, desc:"From a 5-step wizard to photorealistic renders in 30 seconds — what ARCHAI does and why architects are taking notice." },
  { id:"p2", title:"10 Marla Villa Design Ideas: Best Layouts", slug:"10-marla-layouts", tag:"Floor Plans", status:"published", date:"Feb 2026", reads:3100, mins:8, desc:"Ground + 2 floors on 10 Marla — the most popular plot size in Pakistan. Here are 6 layouts that actually work." },
  { id:"p3", title:"South Asian Contemporary: Pakistan's Most Wanted Style", slug:"south-asian-contemporary", tag:"Style Guide", status:"published", date:"Feb 2026", reads:4200, mins:7, desc:"White cubic, teak wood panels, dark frames — why this look dominates Pakistani property marketing right now." },
  { id:"p4", title:"PKR Construction Cost Breakdown 2026", slug:"pkr-construction-costs-2026", tag:"Cost Guide", status:"draft", date:"Mar 2026", reads:0, mins:9, desc:"Honest breakdown: grey structure, finishing, electrical, woodwork — what it actually costs per Marla in Pakistan." },
  { id:"p5", title:"Islamic Grand Villas: Mughal Architecture for Modern Homes", slug:"islamic-architecture-guide", tag:"Style Guide", status:"published", date:"Dec 2025", reads:1600, mins:6, desc:"Arches, minarets, courtyards — how to incorporate Islamic architecture principles into a contemporary family villa." },
  { id:"p6", title:"Free Photorealistic Villa Photo in 30 Seconds", slug:"bing-image-creator-villa", tag:"Free Tools", status:"published", date:"Jan 2026", reads:5700, mins:4, desc:"ARCHAI builds the perfect Midjourney/Bing prompt from your selections. Here is how to use it free." },
];
const SEO_DATA = [
  { page:"ARCHAI Home",     url:"/archai",             pos:12, prev:19, clicks:420, imp:6800, ctr:"6.2%", speed:94 },
  { page:"Villa Design AI", url:"/archai/blog/ai-villa-design-2026", pos:8, prev:14, clicks:280, imp:4200, ctr:"6.7%", speed:92 },
  { page:"10 Marla Layouts",url:"/archai/blog/10-marla-layouts",     pos:5, prev:9,  clicks:390, imp:5100, ctr:"7.6%", speed:95 },
  { page:"Style Guide Blog", url:"/archai/blog/south-asian-contemporary", pos:18, prev:24, clicks:180, imp:3600, ctr:"5.0%", speed:93 },
];
const SETTINGS_DEF = { showPricing:true, enableDownload:true, enableSharing:true, arabicMode:true, showFloorPlans:true, enableLeadForm:true };

export default function ArchaiAdmin() {
  const [authed,   setAuthed]   = useState(false);
  const [pw,       setPw]       = useState("");
  const [pwErr,    setPwErr]    = useState("");
  const [tab,      setTab]      = useState("dashboard");
  const [posts,    setPosts]    = useState(INIT_POSTS);
  const [settings, setSettings] = useState(SETTINGS_DEF);
  const [toast,    setToast]    = useState(null);
  const [delConf,  setDelConf]  = useState(null);
  const [mounted,  setMounted]  = useState(false);
  const [newPost,  setNewPost]  = useState({ title:"", slug:"", tag:"Style Guide", status:"draft", desc:"", content:"" });

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      if (localStorage.getItem("archai_admin") === "true") setAuthed(true);
      try {
        const saved = JSON.parse(localStorage.getItem("archai_posts") || "[]");
        if (saved.length) setPosts(saved);
        const s = JSON.parse(localStorage.getItem("archai_settings") || "{}");
        if (Object.keys(s).length) setSettings(p => ({...p,...s}));
      } catch(_) {}
    }
  }, []);

  if (!mounted) return <div style={{ minHeight:"100vh", background:"#06080d" }}/>;

  const showToast = (msg, color="#10B981") => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3000);
  };

  const login = (e) => {
    e.preventDefault();
    if (pw === PW) { setAuthed(true); localStorage.setItem("archai_admin","true"); }
    else { setPwErr("Incorrect password"); setTimeout(() => setPwErr(""), 2500); }
  };

  const logout = () => { setAuthed(false); localStorage.removeItem("archai_admin"); };

  const addPost = () => {
    if (!newPost.title || !newPost.slug) { showToast("⚠️ Title and slug required","#F59E0B"); return; }
    const p = { ...newPost, id:"p"+Date.now(), date:"Mar 2026", reads:0, mins:5 };
    const updated = [p, ...posts];
    setPosts(updated);
    localStorage.setItem("archai_posts", JSON.stringify(updated));
    setNewPost({ title:"", slug:"", tag:"Style Guide", status:"draft", desc:"", content:"" });
    setTab("blogs");
    showToast("✅ Blog post created!");
  };

  const deletePost = (id) => {
    const updated = posts.filter(p => p.id !== id);
    setPosts(updated);
    localStorage.setItem("archai_posts", JSON.stringify(updated));
    setDelConf(null);
    showToast("🗑️ Post deleted");
  };

  const toggleStatus = (id) => {
    const updated = posts.map(p => p.id===id ? {...p, status: p.status==="published"?"draft":"published"} : p);
    setPosts(updated);
    localStorage.setItem("archai_posts", JSON.stringify(updated));
    showToast("✅ Status updated");
  };

  const saveSetting = (key, val) => {
    const s = {...settings, [key]:val};
    setSettings(s);
    localStorage.setItem("archai_settings", JSON.stringify(s));
    showToast("✅ Settings saved");
  };

  const T = { bg:"#06080d", sidebar:"#080B12", card:"rgba(255,255,255,0.04)", border:"rgba(255,255,255,0.07)", text:"#E2DED6", sub:"rgba(255,255,255,0.4)", gold:"#C8A96E", green:"#10B981" };
  const INP = { width:"100%", padding:"10px 14px", background:"rgba(255,255,255,0.05)", border:`1px solid rgba(200,169,110,0.2)`, borderRadius:9, color:T.text, fontSize:13, fontFamily:"Outfit,sans-serif", outline:"none" };

  if (!authed) return (
    <div style={{ minHeight:"100vh", background:T.bg, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Outfit',sans-serif" }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,400&family=Outfit:wght@400;600;700;800&display=swap"/>
      <div style={{ background:"rgba(255,255,255,0.03)", border:`1px solid rgba(200,169,110,0.2)`, borderRadius:22, padding:"44px 36px", width:"100%", maxWidth:400, textAlign:"center" }}>
        <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:32, letterSpacing:5, color:T.gold, marginBottom:4 }}>ARCHAI</div>
        <div style={{ fontSize:11, color:T.sub, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:28 }}>Admin Panel</div>
        <form onSubmit={login}>
          <input type="password" value={pw} onChange={e=>{setPw(e.target.value);setPwErr("");}}
            placeholder="Enter password" style={{ ...INP, padding:"13px 16px", marginBottom:8, borderColor:pwErr?"#EF4444":undefined }}/>
          {pwErr && <div style={{ color:"#EF4444", fontSize:12, marginBottom:8 }}>⚠️ {pwErr}</div>}
          <button type="submit" style={{ width:"100%", padding:"13px", background:`linear-gradient(135deg,${T.gold},#9A7830)`, border:"none", borderRadius:10, color:"#000", fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"Outfit,sans-serif" }}>
            🔐 Login
          </button>
        </form>
        <Link href="/archai" style={{ display:"block", marginTop:14, color:T.sub, fontSize:12, textDecoration:"none" }}>← Back to ARCHAI</Link>
      </div>
    </div>
  );

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,400&family=Outfit:wght@400;500;600;700;800&display=swap"/>
      <div suppressHydrationWarning style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Outfit',sans-serif", display:"flex" }}>
        <style suppressHydrationWarning>{`*{box-sizing:border-box}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:rgba(200,169,110,0.3);border-radius:10px}.tb:hover{background:rgba(200,169,110,0.08)!important}.hr:hover{background:rgba(255,255,255,0.03)!important}input:focus,textarea:focus,select:focus{border-color:rgba(200,169,110,0.5)!important;outline:none!important}@keyframes si{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}.si{animation:si .3s ease}select option{background:#06080d;color:#fff}`}</style>

        {/* Sidebar */}
        <div style={{ width:210, background:T.sidebar, borderRight:`1px solid ${T.border}`, display:"flex", flexDirection:"column", minHeight:"100vh", flexShrink:0, position:"sticky", top:0, height:"100vh" }}>
          <div style={{ padding:"16px 14px", borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", gap:8 }}>
            <div style={{ width:32, height:32, borderRadius:9, background:`linear-gradient(135deg,${T.gold},#9A7830)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15 }}>🏠</div>
            <div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:16, color:T.gold, letterSpacing:3 }}>ARCHAI</div>
              <div style={{ fontSize:8, color:T.sub, textTransform:"uppercase", letterSpacing:"0.1em" }}>Admin Panel</div>
            </div>
          </div>
          <div style={{ flex:1, padding:"8px", overflowY:"auto" }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} className="tb"
                style={{ width:"100%", display:"flex", alignItems:"center", gap:8, padding:"10px 12px", borderRadius:9, border:"none", background:tab===t.id?`rgba(200,169,110,0.1)`:"transparent", color:tab===t.id?T.gold:T.sub, fontSize:12, fontWeight:tab===t.id?700:400, cursor:"pointer", fontFamily:"Outfit,sans-serif", marginBottom:2, textAlign:"left", transition:"all 0.15s" }}>
                <span>{t.icon}</span>{t.label}
              </button>
            ))}
          </div>
          <div style={{ padding:"8px", borderTop:`1px solid ${T.border}` }}>
            <Link href="/archai" style={{ display:"flex", alignItems:"center", gap:7, padding:"9px 12px", borderRadius:9, color:T.sub, fontSize:12, textDecoration:"none" }}>🌐 View Site</Link>
            <Link href="/archai/blog" style={{ display:"flex", alignItems:"center", gap:7, padding:"9px 12px", borderRadius:9, color:T.sub, fontSize:12, textDecoration:"none" }}>✍️ View Blog</Link>
            <button onClick={logout} style={{ width:"100%", display:"flex", alignItems:"center", gap:7, padding:"9px 12px", borderRadius:9, border:"none", background:"rgba(239,68,68,0.08)", color:"#EF4444", fontSize:12, cursor:"pointer", fontFamily:"Outfit,sans-serif", marginTop:4 }}>🔴 Logout</button>
          </div>
        </div>

        {/* Main */}
        <div style={{ flex:1, overflow:"auto" }}>
          <div style={{ padding:"14px 26px", borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", justifyContent:"space-between", background:T.bg, position:"sticky", top:0, zIndex:10 }}>
            <div style={{ fontSize:18, fontWeight:700 }}>{TABS.find(t=>t.id===tab)?.icon} {TABS.find(t=>t.id===tab)?.label}</div>
            <Link href="/archai" style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:9, padding:"7px 14px", color:T.sub, fontSize:12, textDecoration:"none" }}>← Back</Link>
          </div>

          <div style={{ padding:"22px 26px" }}>

            {/* DASHBOARD */}
            {tab==="dashboard" && (
              <div className="si">
                <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:22 }}>
                  {[
                    { icon:"✍️", label:"Published Posts",   val:posts.filter(p=>p.status==="published").length, color:T.gold },
                    { icon:"📝", label:"Draft Posts",        val:posts.filter(p=>p.status==="draft").length,     color:T.sub },
                    { icon:"👁️", label:"Total Blog Views",  val:posts.reduce((s,p)=>s+(p.reads||0),0).toLocaleString(), color:"#818CF8" },
                    { icon:"🏠", label:"Villa Styles",       val:"9",  color:T.green },
                  ].map(s => (
                    <div key={s.label} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:13, padding:"16px 18px" }}>
                      <div style={{ fontSize:10, color:T.sub, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>{s.icon} {s.label}</div>
                      <div style={{ fontSize:26, fontWeight:800, color:s.color }}>{s.val}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:13, overflow:"hidden" }}>
                  <div style={{ padding:"12px 18px", borderBottom:`1px solid ${T.border}`, fontSize:13, fontWeight:700 }}>📋 Recent Blog Posts</div>
                  {posts.slice(0,5).map((p,i) => (
                    <div key={p.id} className="hr" style={{ display:"flex", alignItems:"center", gap:14, padding:"11px 18px", borderBottom:i<4?`1px solid ${T.border}`:"none", transition:"background 0.15s" }}>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13, fontWeight:600 }}>{p.title}</div>
                        <div style={{ fontSize:11, color:T.sub }}>{p.tag} · {p.date} · 👁 {p.reads.toLocaleString()}</div>
                      </div>
                      <span style={{ fontSize:9, fontWeight:700, padding:"2px 8px", borderRadius:5, textTransform:"uppercase", background:p.status==="published"?`rgba(200,169,110,0.15)`:"rgba(255,255,255,0.06)", color:p.status==="published"?T.gold:T.sub }}>{p.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BLOG POSTS */}
            {tab==="blogs" && (
              <div className="si">
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                  <div style={{ fontSize:13, color:T.sub }}>{posts.length} posts</div>
                  <button onClick={()=>setTab("addblog")} style={{ background:`linear-gradient(135deg,${T.gold},#9A7830)`, border:"none", borderRadius:9, padding:"9px 18px", color:"#000", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:"Outfit,sans-serif" }}>+ New Post</button>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {posts.map(p => (
                    <div key={p.id} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"14px 18px", display:"flex", alignItems:"center", gap:14 }}>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13, fontWeight:700, marginBottom:3 }}>{p.title}</div>
                        <div style={{ fontSize:11, color:T.sub }}>{p.tag} · {p.date} · ⏱ {p.mins}min · 👁 {p.reads.toLocaleString()}</div>
                      </div>
                      <div style={{ display:"flex", gap:6, flexShrink:0 }}>
                        <Link href={`/archai/blog/${p.slug}`} target="_blank" style={{ padding:"5px 10px", background:"rgba(200,169,110,0.12)", border:"1px solid rgba(200,169,110,0.3)", borderRadius:7, color:T.gold, fontSize:11, fontWeight:700, textDecoration:"none" }}>👁️</Link>
                        <button onClick={()=>toggleStatus(p.id)} style={{ padding:"5px 10px", background:p.status==="published"?"rgba(239,68,68,0.1)":"rgba(200,169,110,0.12)", border:`1px solid ${p.status==="published"?"rgba(239,68,68,0.3)":"rgba(200,169,110,0.3)"}`, borderRadius:7, color:p.status==="published"?"#EF4444":T.gold, fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"Outfit,sans-serif" }}>
                          {p.status==="published"?"Unpublish":"Publish"}
                        </button>
                        {delConf===p.id ? (
                          <div style={{ display:"flex", gap:4 }}>
                            <button onClick={()=>deletePost(p.id)} style={{ padding:"5px 10px", background:"rgba(239,68,68,0.2)", border:"1px solid rgba(239,68,68,0.4)", borderRadius:7, color:"#EF4444", fontSize:11, fontWeight:700, cursor:"pointer", fontFamily:"Outfit,sans-serif" }}>Confirm</button>
                            <button onClick={()=>setDelConf(null)} style={{ padding:"5px 10px", background:T.card, border:`1px solid ${T.border}`, borderRadius:7, color:T.sub, fontSize:11, cursor:"pointer", fontFamily:"Outfit,sans-serif" }}>Cancel</button>
                          </div>
                        ) : (
                          <button onClick={()=>setDelConf(p.id)} style={{ padding:"5px 10px", background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.2)", borderRadius:7, color:"#EF4444", fontSize:11, cursor:"pointer", fontFamily:"Outfit,sans-serif" }}>🗑️</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ADD BLOG */}
            {tab==="addblog" && (
              <div className="si" style={{ maxWidth:680 }}>
                <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                  <div>
                    <label style={{ fontSize:11, color:T.sub, display:"block", marginBottom:5, textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:600 }}>Post Title *</label>
                    <input value={newPost.title} onChange={e=>setNewPost(p=>({...p,title:e.target.value}))} placeholder="e.g. California Modern Villas: Complete Guide" style={{ ...INP }}/>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                    <div>
                      <label style={{ fontSize:11, color:T.sub, display:"block", marginBottom:5, textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:600 }}>URL Slug *</label>
                      <input value={newPost.slug} onChange={e=>setNewPost(p=>({...p,slug:e.target.value.toLowerCase().replace(/\s+/g,"-")}))} placeholder="e.g. california-modern-guide" style={{ ...INP }}/>
                    </div>
                    <div>
                      <label style={{ fontSize:11, color:T.sub, display:"block", marginBottom:5, textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:600 }}>Category</label>
                      <select value={newPost.tag} onChange={e=>setNewPost(p=>({...p,tag:e.target.value}))} style={{ ...INP }}>
                        {["Style Guide","AI Design","Floor Plans","Cost Guide","Free Tools","Planning"].map(t=><option key={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize:11, color:T.sub, display:"block", marginBottom:5, textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:600 }}>Short Description</label>
                    <textarea value={newPost.desc} onChange={e=>setNewPost(p=>({...p,desc:e.target.value}))} placeholder="One or two sentences shown on the blog listing page..." rows={3} style={{ ...INP, resize:"vertical" }}/>
                  </div>
                  <div>
                    <label style={{ fontSize:11, color:T.sub, display:"block", marginBottom:5, textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:600 }}>Full Content (Markdown supported)</label>
                    <textarea value={newPost.content} onChange={e=>setNewPost(p=>({...p,content:e.target.value}))} placeholder="Write your full blog post here..." rows={10} style={{ ...INP, resize:"vertical" }}/>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                    <div>
                      <label style={{ fontSize:11, color:T.sub, display:"block", marginBottom:5, textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:600 }}>Status</label>
                      <select value={newPost.status} onChange={e=>setNewPost(p=>({...p,status:e.target.value}))} style={{ ...INP }}>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:10 }}>
                    <button onClick={addPost} style={{ flex:2, padding:"13px", background:`linear-gradient(135deg,${T.gold},#9A7830)`, border:"none", borderRadius:11, color:"#000", fontSize:14, fontWeight:800, cursor:"pointer", fontFamily:"Outfit,sans-serif" }}>
                      ✅ Publish Post
                    </button>
                    <button onClick={()=>{setNewPost({title:"",slug:"",tag:"Style Guide",status:"draft",desc:"",content:""});setTab("blogs");}} style={{ flex:1, padding:"13px", background:T.card, border:`1px solid ${T.border}`, borderRadius:11, color:T.sub, fontSize:13, cursor:"pointer", fontFamily:"Outfit,sans-serif" }}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SEO */}
            {tab==="seo" && (
              <div className="si">
                <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:22 }}>
                  {[["🏆","Avg Position","11.3",T.gold],["👁️","Total Impressions","20,600","#818CF8"],["🖱️","Total Clicks","1,270",T.green],["📈","Avg CTR","6.2%",T.gold]].map(([ic,lb,vl,cl]) => (
                    <div key={lb} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:13, padding:"16px 18px" }}>
                      <div style={{ fontSize:10, color:T.sub, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>{ic} {lb}</div>
                      <div style={{ fontSize:26, fontWeight:800, color:cl }}>{vl}</div>
                    </div>
                  ))}
                </div>
                <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:13, overflow:"hidden", marginBottom:16 }}>
                  <div style={{ padding:"12px 18px", borderBottom:`1px solid ${T.border}`, fontSize:13, fontWeight:700 }}>📄 Page Performance</div>
                  <table style={{ width:"100%", borderCollapse:"collapse" }}>
                    <thead>
                      <tr style={{ background:"rgba(255,255,255,0.03)" }}>
                        {["Page","Position","Clicks","Impressions","CTR","Speed"].map(h => (
                          <th key={h} style={{ padding:"10px 14px", fontSize:10, color:T.sub, textAlign:"left", fontWeight:500, textTransform:"uppercase", letterSpacing:"0.06em" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {SEO_DATA.map((r,i) => (
                        <tr key={r.page} style={{ borderTop:`1px solid ${T.border}` }}>
                          <td style={{ padding:"10px 14px", fontSize:12, color:T.text }}>{r.page}</td>
                          <td style={{ padding:"10px 14px", fontSize:12, color:r.pos<=10?T.green:r.pos<=20?T.gold:"#EF4444", fontWeight:700 }}>#{r.pos} <span style={{ color:T.sub, fontSize:10 }}>↑{r.prev-r.pos}</span></td>
                          <td style={{ padding:"10px 14px", fontSize:12, color:T.text }}>{r.clicks}</td>
                          <td style={{ padding:"10px 14px", fontSize:12, color:T.sub }}>{r.imp.toLocaleString()}</td>
                          <td style={{ padding:"10px 14px", fontSize:12, color:T.gold }}>{r.ctr}</td>
                          <td style={{ padding:"10px 14px", fontSize:12 }}><span style={{ color:r.speed>=90?T.green:T.gold }}>{r.speed}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ background:`rgba(200,169,110,0.06)`, border:`1px solid rgba(200,169,110,0.15)`, borderRadius:12, padding:"14px 18px", fontSize:12, color:T.sub, lineHeight:1.7 }}>
                  💡 <strong style={{ color:T.gold }}>SEO Tips for ARCHAI:</strong> Target "villa design Pakistan", "10 marla house design", "modern villa plans" — these have high search volume and low competition. Add more blog posts with specific marla sizes in the title.
                </div>
              </div>
            )}

            {/* SETTINGS */}
            {tab==="settings" && (
              <div className="si" style={{ maxWidth:580 }}>
                <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:13, overflow:"hidden", marginBottom:16 }}>
                  <div style={{ padding:"12px 18px", borderBottom:`1px solid ${T.border}`, fontSize:13, fontWeight:700 }}>🔧 Feature Toggles</div>
                  {[
                    { key:"showPricing",    label:"Show Pricing Section",   sub:"Display pricing plans on ARCHAI main page" },
                    { key:"enableDownload", label:"Enable PDF Download",    sub:"Allow users to download their design as PDF" },
                    { key:"enableSharing",  label:"Enable Design Sharing",  sub:"Users can share their villa design via link" },
                    { key:"arabicMode",     label:"Arabic RTL Support",     sub:"Show Arabic language option on ARCHAI" },
                    { key:"showFloorPlans", label:"Show Floor Plans",       sub:"Display 5 floor plan levels in the wizard" },
                    { key:"enableLeadForm", label:"Lead Capture Form",      sub:"Show consultation request form on results page" },
                  ].map(f => (
                    <div key={f.key} style={{ display:"flex", alignItems:"center", gap:14, padding:"12px 18px", borderBottom:`1px solid ${T.border}` }}>
                      <div style={{ flex:1 }}>
                        <div style={{ fontSize:13, fontWeight:600 }}>{f.label}</div>
                        <div style={{ fontSize:11, color:T.sub, marginTop:1 }}>{f.sub}</div>
                      </div>
                      <div onClick={() => saveSetting(f.key, !settings[f.key])}
                        style={{ width:44, height:24, borderRadius:12, background:settings[f.key]?T.gold:"rgba(255,255,255,0.1)", cursor:"pointer", position:"relative", transition:"background 0.2s", flexShrink:0 }}>
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
