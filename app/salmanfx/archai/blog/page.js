"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const POSTS = [
  {slug:"ai-villa-design-2026",          emoji:"🤖",tag:"AI Design",    title:"How AI is Changing Villa Design in 2026",                           date:"Mar 10, 2026",reads:"4.1K",mins:5, desc:"From a 5-step wizard to photorealistic renders in 30 seconds — what ARCHAI does and why architects are paying attention."},
  {slug:"10-marla-layouts",              emoji:"📐",tag:"Floor Plans",  title:"10 Marla Villa Design: Best Floor Plan Layouts for 2026",           date:"Feb 18, 2026",reads:"6.2K",mins:8, desc:"Ground + 2 floors on 10 Marla — the most popular plot size in Pakistan. Six layouts that actually work for joint families."},
  {slug:"south-asian-contemporary",      emoji:"🏘️",tag:"Style Guide",  title:"South Asian Contemporary: Pakistan's Most Popular Style in 2026",   date:"Feb 5, 2026", reads:"7.8K",mins:7, desc:"White cubic forms, teak panels, dark frames — why this style dominates Pakistani premium housing."},
  {slug:"california-modern-villas-pakistan",emoji:"🌴",tag:"Style Guide","title":"California Modern Villas in Pakistan: Why This Style Works Here",  date:"Jan 22, 2026",reads:"3.4K",mins:6, desc:"Travertine, cantilevers, infinity pools — the California aesthetic translated for Pakistani plots and climate."},
  {slug:"villa-construction-cost-2026",  emoji:"💰",tag:"Cost Guide",   title:"Villa Construction Cost Per Marla in Pakistan 2026: Honest Numbers",date:"Mar 1, 2026", reads:"8.9K",mins:9, desc:"Grey structure, finishing, electrical, woodwork — what it actually costs to build in Pakistan this year."},
  {slug:"5-marla-house-design-ideas",    emoji:"🏡",tag:"Floor Plans",  title:"5 Marla House Design Ideas: Maximum Space from a Small Plot",       date:"Feb 12, 2026",reads:"5.6K",mins:7, desc:"Smart layouts for Pakistan's most common plot size — a complete family home without compromising on feel."},
  {slug:"islamic-architecture-guide",    emoji:"🕌",tag:"Style Guide",  title:"Islamic Grand Villas: Mughal Architecture for Modern Homes",        date:"Dec 15, 2025",reads:"3.8K",mins:6, desc:"Arches, courtyards, mashrabiya — how to incorporate Islamic principles into a contemporary family villa."},
  {slug:"modern-mediterranean-pakistan", emoji:"🏛️",tag:"Style Guide",  title:"Modern Mediterranean Villa Design for Pakistani Homes in 2026",     date:"Jan 8, 2026", reads:"2.9K",mins:6, desc:"Warm tones, terracotta roofs, arched colonnades — the Mediterranean aesthetic for Pakistani climate."},
  {slug:"bing-image-creator-villa",      emoji:"📸",tag:"Free Tools",   title:"Get a Free Photorealistic Villa Image Using ARCHAI and Bing",       date:"Jan 15, 2026",reads:"9.2K",mins:4, desc:"ARCHAI builds the perfect prompt, Bing generates the image — free. Photorealistic renders in 30 seconds."},
  {slug:"dha-lahore-plot-guide",         emoji:"🏘️",tag:"Investment",   title:"DHA Lahore Plot Size Guide: Which Marla Size to Buy in 2026",       date:"Feb 28, 2026",reads:"6.7K",mins:8, desc:"5, 8, 10, or 1 Kanal — which plot size gives the best return, lifestyle, and resale in 2026."},
  {slug:"bahria-town-vs-dha",            emoji:"⚖️",tag:"Investment",   title:"Bahria Town vs DHA: Which Housing Society is Better in 2026?",      date:"Mar 5, 2026", reads:"5.3K",mins:9, desc:"Infrastructure, legal security, appreciation, and quality of life — the two giants compared honestly."},
  {slug:"rooftop-design-pakistan-villas",emoji:"🌇",tag:"Design Ideas", title:"Rooftop Design Ideas for Pakistani Villas: Terrace, Garden, Suite", date:"Jan 30, 2026",reads:"4.1K",mins:6, desc:"The Pakistani rooftop is wasted in most houses. How to design yours as living space, garden, or rental suite."},
  {slug:"open-plan-living-pakistan",     emoji:"🏠",tag:"Design Ideas", title:"Open Plan vs Traditional Rooms: Which Works Best in Pakistan?",     date:"Feb 8, 2026", reads:"3.9K",mins:7, desc:"Open plan is the international norm. But Pakistani family dynamics affect whether it works for you."},
  {slug:"grey-structure-costs-pakistan", emoji:"🧱",tag:"Cost Guide",   title:"Grey Structure vs Finishing: What to Budget Separately in Pakistan",date:"Jan 18, 2026",reads:"7.1K",mins:8, desc:"Most construction disputes happen because buyers don't know what grey structure includes. Full breakdown."},
  {slug:"energy-efficient-homes-pakistan",emoji:"♻️",tag:"Design Ideas","title":"Energy Efficient Home Design for Pakistani Climate: Complete Guide",date:"Feb 22, 2026",reads:"4.4K",mins:8, desc:"With LESCO bills hitting PKR 50,000+/month in summer, energy efficiency saves crores over a home's lifetime."},
  {slug:"master-bedroom-design-2026",    emoji:"🛏️",tag:"Design Ideas", title:"Master Bedroom Design Trends for Pakistani Villas in 2026",         date:"Mar 7, 2026", reads:"5.2K",mins:6, desc:"What Pakistan's most desired master bedroom looks like — layout, bathroom, dressing room, smart features."},
  {slug:"double-storey-house-designs",   emoji:"🏗️",tag:"Floor Plans",  title:"Double Storey House Design: Why Most Pakistani Homes Get It Wrong", date:"Feb 15, 2026",reads:"6.8K",mins:7, desc:"Ground + First is Pakistan's most-built type. Common mistakes and how to design yours correctly from the start."},
  {slug:"boundary-wall-designs",         emoji:"🏚️",tag:"Design Ideas", title:"Boundary Wall Design Ideas: Style, Security, and Cost for Pakistan",date:"Jan 25, 2026",reads:"3.7K",mins:5, desc:"The boundary wall is the first impression of your home. Design ideas and 2026 costs for DHA and Bahria plots."},
  {slug:"architect-brief-guide",         emoji:"📋",tag:"Planning",     title:"How to Brief Your Architect: A Complete Guide for Pakistan",        date:"Feb 1, 2026", reads:"4.9K",mins:7, desc:"Most clients arrive at architects with no clear brief. Exactly what to prepare before your first meeting."},
  {slug:"villa-landscaping-ideas",       emoji:"🌿",tag:"Design Ideas", title:"Villa Garden Landscaping: Climate-Smart Options for Pakistan",       date:"Mar 15, 2026",reads:"3.2K",mins:6, desc:"Landscaping that works in Pakistan's climate without constant water — plants, hardscaping, and garden ideas."},
  {slug:"kitchen-design-trends-2026",    emoji:"🍳",tag:"Design Ideas", title:"Kitchen Design Trends for Pakistani Homes in 2026",                 date:"Jan 12, 2026",reads:"5.8K",mins:6, desc:"Pakistani kitchens are evolving fast — from back rooms to open-plan showpieces. What the best ones look like."},
  {slug:"home-automation-pakistan-2026", emoji:"🤖",tag:"Technology",   title:"Home Automation for Pakistani Villas in 2026: What's Worth Buying", date:"Mar 12, 2026",reads:"4.6K",mins:6, desc:"Smart lighting, automated gates, CCTV, solar monitoring — what is affordable and reliable in Pakistan."},
  {slug:"villa-exterior-paint-colors",   emoji:"🎨",tag:"Design Ideas", title:"Best Exterior Paint Colours for Pakistani Villas in 2026",          date:"Feb 25, 2026",reads:"4.8K",mins:5, desc:"The right exterior colour transforms a house's character. Pakistan-specific guidance for 2026."},
  {slug:"villa-construction-cost-2026",  emoji:"🏗️",tag:"Cost Guide",   title:"Double Storey vs Triple Storey: Which Builds More Value in Pakistan",date:"Mar 8, 2026", reads:"3.1K",mins:6, desc:"Adding a floor adds cost but not always proportional value. How to decide how many floors to build."},
];

const UNIQUE_POSTS = POSTS.filter((p,i,a)=>a.findIndex(x=>x.slug===p.slug)===i);
const TAGS = ["All","Style Guide","Floor Plans","Cost Guide","Design Ideas","Investment","Planning","Technology","Free Tools","AI Design"];

export default function ArchaiBlog() {
  const [mounted,setMounted]       = useState(false);
  const [activeTag,setActiveTag]   = useState("All");
  const [search,setSearch]         = useState("");
  const [adminPosts,setAdminPosts] = useState([]);

  useEffect(()=>{ setMounted(true); try{const s=JSON.parse(localStorage.getItem("archai_posts")||"[]"); setAdminPosts(s.filter(p=>p.status==="published"));}catch(_){} },[]);
  if (!mounted) return <div style={{minHeight:"100vh",background:"#06080d"}}/>;

  const T = {bg:"#06080d",card:"rgba(255,255,255,0.04)",border:"rgba(255,255,255,0.08)",text:"#E2DED6",sub:"rgba(255,255,255,0.42)",gold:"#C8A96E"};
  const all = [...UNIQUE_POSTS,...adminPosts];
  const filtered = all.filter(p=>(activeTag==="All"||p.tag===activeTag)&&(!search||p.title.toLowerCase().includes(search.toLowerCase())));

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;600&family=Outfit:wght@400;600;700;800&display=swap"/>
      <div suppressHydrationWarning style={{minHeight:"100vh",background:T.bg,color:T.text,fontFamily:"'Outfit',sans-serif"}}>
        <style suppressHydrationWarning>{`*{box-sizing:border-box}.bc:hover{transform:translateY(-4px)!important;border-color:rgba(200,169,110,0.4)!important}.bc{transition:all .25s ease}input:focus{outline:none!important;border-color:rgba(200,169,110,0.4)!important}`}</style>

        <div style={{background:"rgba(0,0,0,0.4)",borderBottom:`1px solid ${T.border}`,padding:"16px 28px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:16,letterSpacing:4,color:T.gold}}>ARCHAI <span style={{color:T.sub,fontWeight:300,letterSpacing:1,fontSize:13}}>/ Blog</span></div>
            <div style={{fontSize:11,color:T.sub}}>Villa design, architecture, construction & investment in Pakistan</div>
          </div>
          <div style={{display:"flex",gap:10}}>
            <Link href="/archai" style={{padding:"7px 14px",border:`1px solid ${T.border}`,borderRadius:20,color:T.sub,fontSize:12,textDecoration:"none"}}>← ARCHAI</Link>
            <Link href="/archai" style={{padding:"8px 18px",background:`linear-gradient(135deg,${T.gold},#9A7830)`,borderRadius:20,color:"#000",fontSize:12,fontWeight:700,textDecoration:"none"}}>Design Free →</Link>
          </div>
        </div>

        <div style={{maxWidth:1120,margin:"0 auto",padding:"28px 24px"}}>
          <div style={{marginBottom:20,position:"relative",maxWidth:480}}>
            <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)"}}>🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search villa design articles..."
              style={{width:"100%",padding:"10px 14px 10px 38px",background:"rgba(255,255,255,0.05)",border:`1px solid ${T.border}`,borderRadius:11,color:T.text,fontSize:13,fontFamily:"'Outfit',sans-serif"}}/>
          </div>
          <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:26}}>
            {TAGS.map(tag=>(
              <button key={tag} onClick={()=>setActiveTag(tag)}
                style={{padding:"5px 13px",borderRadius:20,border:`1px solid ${activeTag===tag?"rgba(200,169,110,0.5)":T.border}`,background:activeTag===tag?"rgba(200,169,110,0.1)":"transparent",color:activeTag===tag?T.gold:T.sub,fontSize:12,fontWeight:activeTag===tag?700:400,cursor:"pointer",fontFamily:"'Outfit',sans-serif",transition:"all .18s"}}>
                {tag}
              </button>
            ))}
          </div>

          {activeTag==="All"&&!search&&(
            <div style={{background:"rgba(200,169,110,0.05)",border:"1px solid rgba(200,169,110,0.18)",borderRadius:16,padding:"22px 26px",marginBottom:22,display:"grid",gridTemplateColumns:"1fr auto",gap:16,alignItems:"center"}}>
              <div>
                <div style={{fontSize:10,color:T.gold,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:8}}>📌 Most Read This Month</div>
                <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(16px,2.2vw,26px)",fontWeight:300,color:"#fff",lineHeight:1.2,marginBottom:8}}>{UNIQUE_POSTS[4].emoji} {UNIQUE_POSTS[4].title}</h2>
                <p style={{fontSize:12,color:T.sub,lineHeight:1.65,marginBottom:14}}>{UNIQUE_POSTS[4].desc}</p>
                <div style={{display:"flex",gap:14,alignItems:"center"}}>
                  <span style={{fontSize:11,color:T.sub}}>📅 {UNIQUE_POSTS[4].date} · ⏱ {UNIQUE_POSTS[4].mins} min · 👁 {UNIQUE_POSTS[4].reads}</span>
                  <Link href={`/archai/blog/${UNIQUE_POSTS[4].slug}`} style={{padding:"7px 18px",background:`linear-gradient(135deg,${T.gold},#9A7830)`,borderRadius:20,color:"#000",fontSize:12,fontWeight:700,textDecoration:"none"}}>Read →</Link>
                </div>
              </div>
              <div style={{fontSize:52,opacity:0.5}}>{UNIQUE_POSTS[4].emoji}</div>
            </div>
          )}

          <div style={{fontSize:12,color:T.sub,marginBottom:14}}>{filtered.length} article{filtered.length!==1?"s":""}</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14}}>
            {filtered.map(post=>(
              <Link key={post.slug} href={`/archai/blog/${post.slug}`} className="bc"
                style={{textDecoration:"none",background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"20px 20px",display:"block"}}>
                <div style={{fontSize:26,marginBottom:10}}>{post.emoji}</div>
                <div style={{display:"inline-block",fontSize:9,color:T.gold,background:"rgba(200,169,110,0.08)",border:"1px solid rgba(200,169,110,0.2)",borderRadius:20,padding:"2px 9px",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:9}}>{post.tag}</div>
                <h3 style={{fontSize:14,fontWeight:700,color:"#fff",lineHeight:1.35,marginBottom:7}}>{post.title}</h3>
                <p style={{fontSize:12,color:T.sub,lineHeight:1.65,marginBottom:12}}>{post.desc}</p>
                <div style={{fontSize:11,color:T.sub,display:"flex",justifyContent:"space-between"}}>
                  <span>📅 {post.date} · ⏱ {post.mins} min</span>
                  <span style={{color:T.gold}}>👁 {post.reads}</span>
                </div>
              </Link>
            ))}
          </div>

          <div style={{marginTop:36,background:"rgba(200,169,110,0.06)",border:"1px solid rgba(200,169,110,0.15)",borderRadius:14,padding:"20px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,flexWrap:"wrap"}}>
            <div>
              <div style={{fontSize:14,fontWeight:700,marginBottom:3}}>🏠 Ready to design your villa?</div>
              <div style={{fontSize:12,color:T.sub}}>9 styles · AI floor plans · PKR cost estimate · Free Bing render prompt</div>
            </div>
            <Link href="/archai" style={{padding:"10px 22px",background:`linear-gradient(135deg,${T.gold},#9A7830)`,borderRadius:10,color:"#000",fontSize:13,fontWeight:700,textDecoration:"none"}}>Start Free →</Link>
          </div>
        </div>
      </div>
    </>
  );
}
