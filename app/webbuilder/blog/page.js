"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const POSTS = [
  {slug:"website-cost-dubai-2026",        emoji:"💰",tag:"Pricing",    title:"How Much Does a Website Cost in Dubai in 2026?",                          date:"Mar 10, 2026",reads:"9.2K",mins:6, desc:"Honest pricing from AED 1,200 to AED 50,000+ — what you get at each level in Dubai's market."},
  {slug:"nextjs-vs-wordpress-dubai",       emoji:"⚡",tag:"Technical",  title:"Next.js vs WordPress for Dubai Businesses: Honest 2026 Comparison",      date:"Feb 20, 2026",reads:"6.8K",mins:8, desc:"43% of websites run on WordPress. Here is why Dubai businesses are switching to Next.js."},
  {slug:"arabic-website-dubai-business",   emoji:"🌐",tag:"Strategy",   title:"Why Your Dubai Business Website Must Be in Arabic Too",                   date:"Feb 10, 2026",reads:"7.4K",mins:5, desc:"40% of Dubai's population prefers Arabic. English-only means you are invisible to a significant market."},
  {slug:"whatsapp-website-integration",    emoji:"💬",tag:"Features",   title:"WhatsApp Integration: The Most Important Feature for Dubai Websites",     date:"Jan 25, 2026",reads:"11.2K",mins:4, desc:"In Dubai, customers do not fill forms. They WhatsApp. Here is how to do it right."},
  {slug:"booking-system-tourism-website",  emoji:"📅",tag:"Features",   title:"Booking Systems for Dubai Tourism Websites: What You Need in 2026",       date:"Jan 15, 2026",reads:"5.9K",mins:7, desc:"Tour booking forms, WhatsApp confirmation, date selection — a conversion-focused booking system."},
  {slug:"seo-dubai-local-business",        emoji:"🔍",tag:"SEO",        title:"SEO for Dubai Local Businesses: Complete 2026 Guide",                     date:"Jan 8, 2026", reads:"8.1K",mins:9, desc:"Google Business Profile, schema markup, and content strategy — what actually works in Dubai."},
  {slug:"restaurant-website-dubai",        emoji:"🍽️",tag:"Industry",  title:"Restaurant Website Must-Haves for Dubai in 2026",                         date:"Feb 28, 2026",reads:"6.2K",mins:7, desc:"Menu, booking, delivery, and reviews — what converts visitors into diners for Dubai restaurants."},
  {slug:"real-estate-website-features",    emoji:"🏙️",tag:"Industry",  title:"Real Estate Website Features That Convert in Dubai 2026",                  date:"Feb 15, 2026",reads:"5.7K",mins:8, desc:"Property search, comparison tools, ROI calculator — what Dubai property websites need."},
  {slug:"e-commerce-website-dubai",        emoji:"🛒",tag:"Industry",   title:"E-Commerce Website for Dubai: What to Build in 2026",                     date:"Jan 30, 2026",reads:"5.3K",mins:8, desc:"UAE payment gateways, COD, Arabic RTL, Shopify vs custom Next.js — complete guide."},
  {slug:"landing-page-design-dubai",       emoji:"🎯",tag:"Design",     title:"High-Converting Landing Page Design for Dubai Businesses in 2026",         date:"Jan 20, 2026",reads:"6.8K",mins:7, desc:"Hero section, social proof, CTA placement, and WhatsApp strategy — what makes Dubai pages convert."},
  {slug:"website-maintenance-dubai",       emoji:"🔧",tag:"Technical",  title:"Website Maintenance for Dubai Businesses: What You Actually Need",         date:"Feb 5, 2026", reads:"4.8K",mins:6, desc:"Updates, security, backups — what website maintenance means and what is worth paying for."},
  {slug:"hotel-website-dubai",             emoji:"🏨",tag:"Industry",   title:"Hotel Website Design for Dubai in 2026: More Direct Bookings",             date:"Feb 22, 2026",reads:"4.9K",mins:7, desc:"Reduce OTA commission and increase direct bookings — what a Dubai hotel website needs."},
  {slug:"spa-beauty-website-dubai",        emoji:"💆",tag:"Industry",   title:"Spa and Beauty Salon Website in Dubai: What Converts in 2026",             date:"Mar 5, 2026", reads:"4.2K",mins:6, desc:"Online booking, service menu, before/after gallery — how to convert visitors into bookings."},
  {slug:"web-design-trends-dubai-2026",    emoji:"✨",tag:"Design",     title:"Web Design Trends Dubai Should Follow in 2026",                           date:"Jan 12, 2026",reads:"5.6K",mins:6, desc:"Dark mode, oversized typography, bento grids, micro-animations — trends worth adopting."},
  {slug:"fitness-gym-website-dubai",       emoji:"🏋️",tag:"Industry",  title:"Fitness and Gym Website for Dubai: Features That Fill Classes",            date:"Jan 5, 2026", reads:"4.4K",mins:6, desc:"Class booking, membership plans, transformation gallery — how fitness businesses convert visitors."},
  {slug:"portfolio-website-freelancer-dubai",emoji:"👤",tag:"Strategy", title:"Portfolio Website for Dubai Freelancers: How to Win Clients Online",       date:"Mar 12, 2026",reads:"5.1K",mins:7, desc:"What a Dubai freelancer's personal website needs to generate inbound leads consistently."},
  {slug:"auto-garage-website-dubai",       emoji:"🔩",tag:"Industry",   title:"Auto Garage and Car Service Website for Dubai in 2026",                    date:"Feb 8, 2026", reads:"3.8K",mins:6, desc:"Service booking, pricing transparency, workshop showcase — how garages convert visitors."},
  {slug:"google-ads-landing-page-dubai",   emoji:"📢",tag:"Marketing",  title:"Google Ads Landing Page for Dubai: What Converts in 2026",                 date:"Feb 25, 2026",reads:"5.3K",mins:7, desc:"Perfect ad copy loses everything on a bad landing page. What Dubai PPC pages need."},
  {slug:"website-redesign-dubai",          emoji:"🔄",tag:"Strategy",   title:"When to Redesign Your Dubai Business Website in 2026",                     date:"Mar 8, 2026", reads:"4.7K",mins:6, desc:"Six signs your website needs a redesign — and how to do it without losing SEO or traffic."},
  {slug:"ai-website-tools-dubai-2026",     emoji:"🤖",tag:"Technology", title:"AI Tools for Dubai Business Websites in 2026: What's Actually Useful",    date:"Mar 15, 2026",reads:"6.3K",mins:7, desc:"AI chatbots, content generation, image creation, analytics — honest assessment for Dubai businesses."},
  {slug:"school-education-website-dubai",  emoji:"🎓",tag:"Industry",   title:"School and Education Website Design for Dubai in 2026",                    date:"Jan 28, 2026",reads:"3.9K",mins:6, desc:"Admission forms, KHDA rating display, curriculum overview — what education websites need."},
  {slug:"corporate-website-dubai-2026",    emoji:"🏢",tag:"Strategy",   title:"Corporate Website for Dubai: What B2B Buyers Expect in 2026",              date:"Mar 1, 2026", reads:"4.6K",mins:7, desc:"Case studies, credentials, bilingual support — what Dubai's B2B buyers look for."},
  {slug:"website-cost-dubai-2026",         emoji:"🌟",tag:"Pricing",    title:"Hidden Website Costs Dubai Businesses Never Expect",                       date:"Mar 3, 2026", reads:"3.4K",mins:5, desc:"Domain, hosting, photography, translation — the extras that catch Dubai clients off guard."},
  {slug:"nextjs-vs-wordpress-dubai",       emoji:"📱",tag:"Technical",  title:"Mobile-First Website Design: Why Dubai Businesses Must Prioritise Mobile", date:"Jan 18, 2026",reads:"5.9K",mins:6, desc:"67% of Dubai web traffic is mobile. What mobile-first design means in practice."},
];

const UNIQUE_POSTS = POSTS.filter((p,i,a)=>a.findIndex(x=>x.slug===p.slug)===i);
const TAGS = ["All","Pricing","Technical","Strategy","Features","SEO","Industry","Design","Marketing","Technology"];

export default function WebBuilderBlog() {
  const [mounted,setMounted]       = useState(false);
  const [activeTag,setActiveTag]   = useState("All");
  const [search,setSearch]         = useState("");
  const [adminPosts,setAdminPosts] = useState([]);

  useEffect(()=>{ setMounted(true); try{const s=JSON.parse(localStorage.getItem("wb_posts")||"[]"); setAdminPosts(s.filter(p=>p.status==="published"));}catch(_){} },[]);
  if(!mounted) return <div style={{minHeight:"100vh",background:"#0A060F"}}/>;

  const T={bg:"#0A060F",card:"rgba(255,255,255,0.04)",border:"rgba(255,255,255,0.08)",text:"#F0ECF8",sub:"rgba(255,255,255,0.42)",pink:"#EC4899",purple:"#8B5CF6"};
  const all=[...UNIQUE_POSTS,...adminPosts];
  const filtered=all.filter(p=>(activeTag==="All"||p.tag===activeTag)&&(!search||p.title.toLowerCase().includes(search.toLowerCase())));

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"/>
      <div suppressHydrationWarning style={{minHeight:"100vh",background:T.bg,color:T.text,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
        <style suppressHydrationWarning>{`*{box-sizing:border-box}.bc:hover{transform:translateY(-4px)!important;border-color:rgba(236,72,153,0.4)!important}.bc{transition:all .25s ease}input:focus{outline:none!important;border-color:rgba(236,72,153,0.4)!important}`}</style>
        <div style={{background:"rgba(0,0,0,0.4)",borderBottom:`1px solid ${T.border}`,padding:"16px 28px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800,color:T.pink}}>Web Builder <span style={{color:T.sub,fontWeight:400,fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>/ Blog</span></div>
            <div style={{fontSize:11,color:T.sub}}>Website design, digital strategy, SEO, and web tech for Dubai businesses</div>
          </div>
          <div style={{display:"flex",gap:10}}>
            <Link href="/webbuilder" style={{padding:"7px 14px",border:`1px solid ${T.border}`,borderRadius:20,color:T.sub,fontSize:12,textDecoration:"none"}}>← Web Builder</Link>
            <a href="https://wa.me/971544735060?text=Hi Salman, I want a website" target="_blank" rel="noopener noreferrer" style={{padding:"8px 18px",background:"linear-gradient(135deg,#EC4899,#8B5CF6)",borderRadius:20,color:"#fff",fontSize:12,fontWeight:700,textDecoration:"none"}}>Get Quote →</a>
          </div>
        </div>
        <div style={{maxWidth:1120,margin:"0 auto",padding:"28px 24px"}}>
          <div style={{position:"relative",maxWidth:480,marginBottom:18}}>
            <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)"}}>🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search web design articles..."
              style={{width:"100%",padding:"10px 14px 10px 38px",background:"rgba(255,255,255,0.05)",border:`1px solid ${T.border}`,borderRadius:11,color:T.text,fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif"}}/>
          </div>
          <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:26}}>
            {TAGS.map(tag=><button key={tag} onClick={()=>setActiveTag(tag)} style={{padding:"5px 13px",borderRadius:20,border:`1px solid ${activeTag===tag?"rgba(236,72,153,0.5)":T.border}`,background:activeTag===tag?"rgba(236,72,153,0.1)":"transparent",color:activeTag===tag?T.pink:T.sub,fontSize:12,fontWeight:activeTag===tag?700:400,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"all .18s"}}>{tag}</button>)}
          </div>
          {activeTag==="All"&&!search&&(
            <div style={{background:"rgba(236,72,153,0.05)",border:"1px solid rgba(236,72,153,0.18)",borderRadius:16,padding:"22px 26px",marginBottom:22,display:"grid",gridTemplateColumns:"1fr auto",gap:16,alignItems:"center"}}>
              <div>
                <div style={{fontSize:10,color:T.pink,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:8}}>📌 Most Read</div>
                <h2 style={{fontSize:"clamp(16px,2.2vw,26px)",fontWeight:800,color:"#fff",lineHeight:1.2,marginBottom:8}}>{UNIQUE_POSTS[3].emoji} {UNIQUE_POSTS[3].title}</h2>
                <p style={{fontSize:12,color:T.sub,lineHeight:1.65,marginBottom:14}}>{UNIQUE_POSTS[3].desc}</p>
                <div style={{display:"flex",gap:14,alignItems:"center"}}>
                  <span style={{fontSize:11,color:T.sub}}>📅 {UNIQUE_POSTS[3].date} · ⏱ {UNIQUE_POSTS[3].mins} min · 👁 {UNIQUE_POSTS[3].reads}</span>
                  <Link href={`/webbuilder/blog/${UNIQUE_POSTS[3].slug}`} style={{padding:"7px 18px",background:"linear-gradient(135deg,#EC4899,#8B5CF6)",borderRadius:20,color:"#fff",fontSize:12,fontWeight:700,textDecoration:"none"}}>Read →</Link>
                </div>
              </div>
              <div style={{fontSize:52,opacity:0.5}}>{UNIQUE_POSTS[3].emoji}</div>
            </div>
          )}
          <div style={{fontSize:12,color:T.sub,marginBottom:14}}>{filtered.length} articles</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14}}>
            {filtered.map((post,i)=>(
              <Link key={post.slug+i} href={`/webbuilder/blog/${post.slug}`} className="bc"
                style={{textDecoration:"none",background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"20px 20px",display:"block"}}>
                <div style={{fontSize:26,marginBottom:10}}>{post.emoji}</div>
                <div style={{display:"inline-block",fontSize:9,color:T.pink,background:"rgba(236,72,153,0.08)",border:"1px solid rgba(236,72,153,0.2)",borderRadius:20,padding:"2px 9px",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:9}}>{post.tag}</div>
                <h3 style={{fontSize:14,fontWeight:700,color:"#fff",lineHeight:1.35,marginBottom:7}}>{post.title}</h3>
                <p style={{fontSize:12,color:T.sub,lineHeight:1.65,marginBottom:12}}>{post.desc}</p>
                <div style={{fontSize:11,color:T.sub,display:"flex",justifyContent:"space-between"}}>
                  <span>📅 {post.date} · ⏱ {post.mins} min</span><span style={{color:T.pink}}>👁 {post.reads}</span>
                </div>
              </Link>
            ))}
          </div>
          <div style={{marginTop:36,background:"rgba(236,72,153,0.06)",border:"1px solid rgba(236,72,153,0.15)",borderRadius:14,padding:"20px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,flexWrap:"wrap"}}>
            <div><div style={{fontSize:14,fontWeight:700,marginBottom:3}}>💻 Need a website for your Dubai business?</div><div style={{fontSize:12,color:T.sub}}>Next.js · Arabic + English · WhatsApp integrated · Admin panel · From AED 1,200</div></div>
            <a href="https://wa.me/971544735060?text=Hi Salman, I want a website for my business" target="_blank" rel="noopener noreferrer" style={{padding:"10px 22px",background:"linear-gradient(135deg,#EC4899,#8B5CF6)",borderRadius:10,color:"#fff",fontSize:13,fontWeight:700,textDecoration:"none"}}>💬 WhatsApp →</a>
          </div>
        </div>
      </div>
    </>
  );
}
