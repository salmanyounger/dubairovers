"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const POSTS = [
  {slug:"dubai-property-market-2026",     emoji:"📊",tag:"Market Update", title:"Dubai Property Market 2026: Full Report for Buyers and Investors",        date:"Mar 10, 2026",reads:"8.4K",mins:8,  desc:"Transaction volumes, price trends, top areas — the data every Dubai property buyer needs before deciding in 2026."},
  {slug:"golden-visa-property-guide",     emoji:"🏅",tag:"Golden Visa",   title:"UAE Golden Visa via Property: Complete 2026 Guide",                        date:"Feb 20, 2026",reads:"9.8K",mins:10, desc:"AED 2M threshold, eligible property types, the application process, and fastest-approval areas."},
  {slug:"best-roi-areas-dubai",           emoji:"📈",tag:"Investment",    title:"Dubai's 8 Highest ROI Property Areas in 2026: Ranked by Yield",            date:"Feb 15, 2026",reads:"11.2K",mins:7, desc:"JVC leads at 9.2%, Marina follows at 7.8% — complete yield data from DLD transactions."},
  {slug:"expat-mortgage-guide",           emoji:"🏦",tag:"Finance",       title:"Mortgage Guide for UAE Expats 2026: All Major Banks Compared",              date:"Feb 10, 2026",reads:"7.2K",mins:12, desc:"ADIB, ADCB, ENBD, FAB, Mashreq, DIB, RAKBANK — rates, LTV limits, and approval tips."},
  {slug:"jvc-vs-jlt-investment",          emoji:"⚖️",tag:"Area Guide",   title:"JVC vs JLT for Investment in 2026: A Data-Driven Comparison",               date:"Jan 28, 2026",reads:"6.4K",mins:9,  desc:"Price per sqft, yield, tenant quality, vacancy risk, and future development compared."},
  {slug:"buying-costs-dubai-2026",        emoji:"💰",tag:"Finance",       title:"True Cost of Buying Property in Dubai 2026: Every Fee Explained",           date:"Jan 15, 2026",reads:"8.9K",mins:6,  desc:"4% DLD, 2% agent, 0.25% mortgage registration — complete breakdown so there are no surprises."},
  {slug:"palm-jumeirah-roi",              emoji:"🌴",tag:"Area Guide",    title:"Palm Jumeirah ROI Analysis 2026: Is the Premium Worth It?",                  date:"Dec 20, 2025",reads:"5.8K",mins:8,  desc:"Apartments vs villas, short-term rental performance — an honest analysis of Palm returns."},
  {slug:"off-plan-ready-comparison",      emoji:"🏗️",tag:"Buying Guide", title:"Off-Plan vs Ready Property in Dubai 2026: The Complete Guide",               date:"Dec 10, 2025",reads:"7.1K",mins:7,  desc:"Payment plan flexibility vs immediate rental income — how to decide."},
  {slug:"dubai-short-term-rental-guide",  emoji:"🛎️",tag:"Investment",   title:"Dubai Short-Term Rental Guide 2026: Airbnb, Regulations, Real Revenue",     date:"Feb 25, 2026",reads:"6.3K",mins:10, desc:"DTCM permit, platform selection, management options, and realistic revenue projections."},
  {slug:"business-bay-area-guide",        emoji:"🏙️",tag:"Area Guide",   title:"Business Bay Property Guide 2026: Buy, Rent, or Invest?",                   date:"Jan 20, 2026",reads:"5.7K",mins:8,  desc:"Canal views, Metro access, corporate demand — complete investment and lifestyle guide."},
  {slug:"understanding-dld-fees",         emoji:"📋",tag:"Finance",       title:"Understanding DLD Fees in Dubai: Everything Buyers Need to Know",            date:"Jan 10, 2026",reads:"6.8K",mins:6,  desc:"4% transfer fee, trustee fees, Oqood for off-plan, and every DLD charge explained simply."},
  {slug:"best-developers-dubai-2026",     emoji:"🏆",tag:"Buying Guide",  title:"Best Developers in Dubai 2026: Track Record, Quality, Reliability",         date:"Feb 5, 2026", reads:"7.4K",mins:8,  desc:"Emaar, DAMAC, Meraas, Nakheel, Aldar — honest 2026 developer tier ranking."},
  {slug:"studio-vs-1br-dubai",            emoji:"🏠",tag:"Buying Guide",  title:"Dubai Studio vs 1BR Apartment: Better Investment in 2026?",                 date:"Jan 25, 2026",reads:"5.9K",mins:7,  desc:"Studios yield more, 1BRs appreciate more — complete data-driven comparison."},
  {slug:"downtown-dubai-property-guide",  emoji:"🌆",tag:"Area Guide",    title:"Downtown Dubai Property Guide 2026: Buying, Renting, Investing",             date:"Feb 28, 2026",reads:"7.3K",mins:8,  desc:"The world's most recognisable address — investment guide with price data and yield analysis."},
  {slug:"property-handover-checklist",    emoji:"✅",tag:"Buying Guide",  title:"Dubai Property Handover: Complete Snagging Checklist",                      date:"Jan 5, 2026", reads:"5.4K",mins:8,  desc:"87 snagging points for Dubai apartments and villas — from paint quality to plumbing."},
  {slug:"dubai-freehold-areas-list",      emoji:"🗺️",tag:"Buying Guide", title:"Complete List of Freehold Areas in Dubai 2026: Where Expats Can Buy",       date:"Dec 28, 2025",reads:"6.2K",mins:7,  desc:"All freehold zones, including new areas added in 2023–2024, where non-GCC nationals can own property."},
  {slug:"property-investment-mistakes-dubai",emoji:"⚠️",tag:"Buying Guide","title":"7 Property Mistakes Buyers Make in Dubai (And How to Avoid Them)",       date:"Mar 8, 2026", reads:"9.1K",mins:7,  desc:"Seven avoidable mistakes — from service charge blindness to overleveraging on off-plan."},
  {slug:"rental-yield-by-area-2026",      emoji:"💹",tag:"Investment",    title:"Dubai Rental Yield by Area 2026: Complete Data Table",                      date:"Mar 1, 2026", reads:"8.7K",mins:6,  desc:"Gross and net yield for studios, 1BR, and 2BR across 15 areas — the most complete 2026 data."},
  {slug:"arabian-ranches-damac-hills",    emoji:"🏡",tag:"Area Guide",    title:"Arabian Ranches vs DAMAC Hills 2026: Which Villa Community to Buy",         date:"Feb 12, 2026",reads:"4.9K",mins:8,  desc:"Developer quality, facilities, rental demand, school access — the two villa giants compared."},
  {slug:"property-management-dubai",      emoji:"🔑",tag:"Investment",    title:"Property Management in Dubai: Complete Guide for Investors",                 date:"Jan 30, 2026",reads:"5.2K",mins:8,  desc:"Ejari, RERA rent index, DIY vs outsourced — full management guide for landlords."},
  {slug:"property-market-forecast-2026",  emoji:"🔮",tag:"Market Update", title:"Dubai Property Market Forecast Q2–Q4 2026: What the Data Shows",           date:"Mar 12, 2026",reads:"7.6K",mins:7,  desc:"Supply analysis, demand drivers, macro factors, and price trajectory by market segment."},
  {slug:"real-estate-agent-guide",        emoji:"🤝",tag:"Buying Guide",  title:"How to Choose a Real Estate Agent in Dubai: The Complete Guide",            date:"Feb 18, 2026",reads:"5.8K",mins:7,  desc:"RERA certification, red flags, questions to ask, and the dual agency problem."},
  {slug:"dubai-hills-estate-guide",       emoji:"⛳",tag:"Area Guide",    title:"Dubai Hills Estate Property Guide 2026: The Premium Family Community",      date:"Jan 12, 2026",reads:"6.1K",mins:7,  desc:"Emaar's most complete master community — apartments, villas, schools, and investment potential."},
  {slug:"off-plan-payment-plans-explained",emoji:"📅",tag:"Finance",      title:"Dubai Off-Plan Payment Plans Explained: Structures, Risks, What's Best",   date:"Feb 22, 2026",reads:"6.5K",mins:7,  desc:"40/60, 20/80, 1% monthly — what each structure means and which is best for different buyers."},
];

const TAGS = ["All","Market Update","Investment","Finance","Area Guide","Golden Visa","Buying Guide"];

export default function PropertiesBlog() {
  const [mounted,setMounted]       = useState(false);
  const [activeTag,setActiveTag]   = useState("All");
  const [search,setSearch]         = useState("");
  const [adminPosts,setAdminPosts] = useState([]);

  useEffect(()=>{ setMounted(true); try{const s=JSON.parse(localStorage.getItem("prop_posts")||"[]"); setAdminPosts(s.filter(p=>p.status==="published"));}catch(_){} },[]);
  if (!mounted) return <div style={{minHeight:"100vh",background:"#060A14"}}/>;

  const T={bg:"#060A14",card:"rgba(255,255,255,0.04)",border:"rgba(255,255,255,0.08)",text:"#E8ECF8",sub:"rgba(255,255,255,0.42)",blue:"#6366F1",sky:"#60A5FA"};
  const all=[...POSTS,...adminPosts];
  const filtered=all.filter(p=>(activeTag==="All"||p.tag===activeTag)&&(!search||p.title.toLowerCase().includes(search.toLowerCase())));

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap"/>
      <div suppressHydrationWarning style={{minHeight:"100vh",background:T.bg,color:T.text,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
        <style suppressHydrationWarning>{`*{box-sizing:border-box}.bc:hover{transform:translateY(-4px)!important;border-color:rgba(99,102,241,0.4)!important}.bc{transition:all .25s ease}input:focus{outline:none!important;border-color:rgba(99,102,241,0.4)!important}`}</style>
        <div style={{background:"rgba(0,0,0,0.4)",borderBottom:`1px solid ${T.border}`,padding:"16px 28px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{fontSize:16,fontWeight:800,color:"#fff"}}>Dubai <span style={{color:T.sky}}>Properties</span> <span style={{color:T.sub,fontWeight:400,fontSize:13}}>/ Blog</span></div>
            <div style={{fontSize:11,color:T.sub}}>Property investment, area guides, finance & market data for Dubai</div>
          </div>
          <div style={{display:"flex",gap:10}}>
            <Link href="/properties" style={{padding:"7px 14px",border:`1px solid ${T.border}`,borderRadius:20,color:T.sub,fontSize:12,textDecoration:"none"}}>← Properties</Link>
            <Link href="/properties" style={{padding:"8px 18px",background:"linear-gradient(135deg,#6366F1,#3B82F6)",borderRadius:20,color:"#fff",fontSize:12,fontWeight:700,textDecoration:"none"}}>Browse →</Link>
          </div>
        </div>
        <div style={{maxWidth:1120,margin:"0 auto",padding:"28px 24px"}}>
          <div style={{position:"relative",maxWidth:480,marginBottom:18}}>
            <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)"}}>🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search Dubai property articles..."
              style={{width:"100%",padding:"10px 14px 10px 38px",background:"rgba(255,255,255,0.05)",border:`1px solid ${T.border}`,borderRadius:11,color:T.text,fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif"}}/>
          </div>
          <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:26}}>
            {TAGS.map(tag=><button key={tag} onClick={()=>setActiveTag(tag)} style={{padding:"5px 13px",borderRadius:20,border:`1px solid ${activeTag===tag?"rgba(99,102,241,0.5)":T.border}`,background:activeTag===tag?"rgba(99,102,241,0.1)":"transparent",color:activeTag===tag?T.blue:T.sub,fontSize:12,fontWeight:activeTag===tag?700:400,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"all .18s"}}>{tag}</button>)}
          </div>
          {activeTag==="All"&&!search&&(
            <div style={{background:"rgba(99,102,241,0.05)",border:"1px solid rgba(99,102,241,0.18)",borderRadius:16,padding:"22px 26px",marginBottom:22,display:"grid",gridTemplateColumns:"1fr auto",gap:16,alignItems:"center"}}>
              <div>
                <div style={{fontSize:10,color:T.blue,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:8}}>📌 Most Read</div>
                <h2 style={{fontSize:"clamp(16px,2.2vw,26px)",fontWeight:800,color:"#fff",lineHeight:1.2,marginBottom:8}}>{POSTS[2].emoji} {POSTS[2].title}</h2>
                <p style={{fontSize:12,color:T.sub,lineHeight:1.65,marginBottom:14}}>{POSTS[2].desc}</p>
                <div style={{display:"flex",gap:14,alignItems:"center"}}>
                  <span style={{fontSize:11,color:T.sub}}>📅 {POSTS[2].date} · ⏱ {POSTS[2].mins} min · 👁 {POSTS[2].reads}</span>
                  <Link href={`/properties/blog/${POSTS[2].slug}`} style={{padding:"7px 18px",background:"linear-gradient(135deg,#6366F1,#3B82F6)",borderRadius:20,color:"#fff",fontSize:12,fontWeight:700,textDecoration:"none"}}>Read →</Link>
                </div>
              </div>
              <div style={{fontSize:52,opacity:0.5}}>{POSTS[2].emoji}</div>
            </div>
          )}
          <div style={{fontSize:12,color:T.sub,marginBottom:14}}>{filtered.length} articles</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14}}>
            {filtered.map(post=>(
              <Link key={post.slug} href={`/properties/blog/${post.slug}`} className="bc"
                style={{textDecoration:"none",background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"20px 20px",display:"block"}}>
                <div style={{fontSize:26,marginBottom:10}}>{post.emoji}</div>
                <div style={{display:"inline-block",fontSize:9,color:T.blue,background:"rgba(99,102,241,0.08)",border:"1px solid rgba(99,102,241,0.2)",borderRadius:20,padding:"2px 9px",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:9}}>{post.tag}</div>
                <h3 style={{fontSize:14,fontWeight:700,color:"#fff",lineHeight:1.35,marginBottom:7}}>{post.title}</h3>
                <p style={{fontSize:12,color:T.sub,lineHeight:1.65,marginBottom:12}}>{post.desc}</p>
                <div style={{fontSize:11,color:T.sub,display:"flex",justifyContent:"space-between"}}>
                  <span>📅 {post.date} · ⏱ {post.mins} min</span><span style={{color:T.sky}}>👁 {post.reads}</span>
                </div>
              </Link>
            ))}
          </div>
          <div style={{marginTop:36,background:"rgba(99,102,241,0.06)",border:"1px solid rgba(99,102,241,0.15)",borderRadius:14,padding:"20px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,flexWrap:"wrap"}}>
            <div><div style={{fontSize:14,fontWeight:700,marginBottom:3}}>🏙️ Browse Dubai Properties</div><div style={{fontSize:12,color:T.sub}}>30+ properties · AI scores · Mortgage calculator · Golden Visa filter</div></div>
            <Link href="/properties" style={{padding:"10px 22px",background:"linear-gradient(135deg,#6366F1,#3B82F6)",borderRadius:10,color:"#fff",fontSize:13,fontWeight:700,textDecoration:"none"}}>Browse →</Link>
          </div>
        </div>
      </div>
    </>
  );
}
