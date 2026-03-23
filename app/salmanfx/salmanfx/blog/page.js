"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const POSTS = [
  {slug:"mm-flip-codepro-review",         emoji:"🤖",tag:"EA Review",    title:"MM FLIP CODEPRO: Salman's Parabolic SAR EA Full Review 2026",              date:"Mar 10, 2026",reads:"6.2K",mins:8,  desc:"Complete breakdown of the MM FLIP CODEPRO Expert Advisor — strategy, settings, live results, and who it works for."},
  {slug:"parabolic-sar-mt4-guide",         emoji:"📊",tag:"Strategy",     title:"Parabolic SAR on MT4: The Complete Settings and Strategy Guide",            date:"Feb 18, 2026",reads:"7.8K",mins:9,  desc:"Step, maximum, and how they interact — optimising the Parabolic SAR indicator for different pairs and timeframes."},
  {slug:"best-forex-pairs-ea-2026",        emoji:"💱",tag:"Trading",      title:"Best Forex Pairs to Run EAs on in 2026: Volatility and Spread Analysis",   date:"Feb 5, 2026", reads:"5.4K",mins:7,  desc:"EUR/USD, GBP/JPY, XAU/USD — which pairs give EAs the best conditions in 2026 based on volatility and spread data."},
  {slug:"vps-mt4-contabo-setup",           emoji:"🖥️",tag:"Technical",   title:"How to Set Up a VPS for MT4 in 2026: Contabo Step-by-Step Guide",          date:"Jan 22, 2026",reads:"9.1K",mins:10, desc:"Cheap, reliable VPS for forex EAs — complete Contabo setup guide from account creation to MT4 running 24/7."},
  {slug:"win-rate-vs-risk-reward",         emoji:"📐",tag:"Strategy",     title:"Win Rate vs Risk:Reward — What Actually Matters for EA Profitability",      date:"Jan 15, 2026",reads:"4.8K",mins:6,  desc:"A 45% win rate EA can be more profitable than a 75% win rate one. Here's the maths."},
  {slug:"money-management-forex",          emoji:"💰",tag:"Strategy",     title:"Money Management for Forex EAs: Lot Sizing, Drawdown, and Equity Rules",   date:"Jan 5, 2026", reads:"6.7K",mins:9,  desc:"Fixed lots, risk per trade, martingale risk — how to protect your account while giving your EA room to perform."},
  {slug:"mt4-vs-mt5-2026",                 emoji:"⚔️",tag:"Platform",    title:"MT4 vs MT5 in 2026: Which Platform Should You Use for EAs?",                date:"Feb 28, 2026",reads:"8.3K",mins:7,  desc:"MT4 has more EAs and brokers. MT5 has better execution and multi-asset. Which is right for automated trading in 2026."},
  {slug:"backtesting-ea-guide",            emoji:"🔬",tag:"Technical",    title:"How to Backtest a Forex EA Properly: Strategy Tester Complete Guide",       date:"Feb 12, 2026",reads:"7.2K",mins:11, desc:"Modelling quality, spread, tick data — why most backtests are wrong and how to get results you can trust."},
  {slug:"drawdown-management-forex",       emoji:"📉",tag:"Risk",         title:"Managing Drawdown on Live Forex EA Accounts: Rules and Psychology",        date:"Jan 30, 2026",reads:"4.9K",mins:7,  desc:"How much drawdown is acceptable, when to pause an EA, and how to think about equity curves over the long term."},
  {slug:"best-brokers-ea-trading-2026",    emoji:"🏦",tag:"Brokers",      title:"Best Forex Brokers for EA Trading in 2026: Spread, Execution, and Uptime",  date:"Jan 20, 2026",reads:"8.9K",mins:8,  desc:"IC Markets, Pepperstone, Exness, FP Markets — which brokers give EAs the best execution environment."},
  {slug:"gold-xauusd-ea-strategy",         emoji:"🥇",tag:"Strategy",     title:"Trading Gold (XAU/USD) with EAs: Complete Strategy Guide 2026",            date:"Mar 5, 2026", reads:"6.5K",mins:8,  desc:"XAU/USD is the most popular EA instrument in 2026. Settings, session timing, and risk rules for gold EAs."},
  {slug:"forex-ea-license-protection",     emoji:"🔐",tag:"Technical",    title:"How to Add License Key Protection to Your Forex EA",                       date:"Feb 25, 2026",reads:"3.8K",mins:7,  desc:"Account number hash, expiry date checks, server-side validation — protecting your EA from piracy."},
  {slug:"prop-firm-ea-guide",              emoji:"🎯",tag:"Trading",      title:"Prop Firm Trading with EAs: FTMO, MyForexFunds, and the Rules to Know",    date:"Feb 8, 2026", reads:"7.6K",mins:9,  desc:"Using EAs to pass prop firm challenges — which EAs work, which rules matter, and what to avoid."},
  {slug:"averaging-down-strategy-ea",      emoji:"🔄",tag:"Strategy",     title:"Averaging Down with EAs: When It Works and When It Destroys Accounts",     date:"Jan 25, 2026",reads:"5.3K",mins:8,  desc:"Averaging down is controversial. Here's a systematic analysis of when it adds edge and when it multiplies risk."},
  {slug:"ea-optimisation-overfitting",     emoji:"🧪",tag:"Technical",    title:"EA Optimisation vs Overfitting: How to Tell the Difference",              date:"Jan 10, 2026",reads:"4.7K",mins:7,  desc:"Most optimised EAs fail on live accounts. Here's how to distinguish genuine edge from curve-fitted results."},
  {slug:"swing-trading-ea-mt4",            emoji:"📈",tag:"Strategy",     title:"Swing Trading EA Strategy for MT4: Holding Positions Overnight",           date:"Mar 12, 2026",reads:"4.1K",mins:8,  desc:"Swing EAs hold trades for hours or days — advantages over scalpers and how to configure them for 2026 markets."},
  {slug:"news-trading-ea-guide",           emoji:"📰",tag:"Strategy",     title:"News Trading EAs: How to Handle High-Impact News Events",                  date:"Feb 22, 2026",reads:"3.9K",mins:6,  desc:"NFP, CPI, FOMC — whether to pause your EA during news or exploit the volatility, with risk management rules."},
  {slug:"mql4-programming-basics",         emoji:"💻",tag:"Technical",    title:"MQL4 Programming for Beginners: Build Your First EA in MT4",               date:"Feb 15, 2026",reads:"5.8K",mins:12, desc:"Variables, OrderSend, OnTick — a real beginner's guide to writing MQL4 code that actually works."},
  {slug:"scalping-ea-settings",            emoji:"⚡",tag:"Strategy",     title:"Scalping EA Settings for MT4: Best Pairs, Sessions, and Configuration",   date:"Mar 8, 2026", reads:"5.2K",mins:7,  desc:"Scalping EAs need low spreads and fast execution. How to configure, test, and optimise a scalper in 2026."},
  {slug:"trailing-stop-ea-mt4",            emoji:"🎯",tag:"Technical",    title:"How to Program a Trailing Stop in Your MT4 EA: Full MQL4 Code",            date:"Jan 12, 2026",reads:"6.3K",mins:8,  desc:"Three trailing stop methods — fixed pip trail, ATR-based trail, and parabolic trail — with complete MQL4 code."},
  {slug:"forex-psychology-automated",      emoji:"🧠",tag:"Trading",      title:"Forex Psychology When Trading with EAs: What Still Goes Wrong",            date:"Jan 8, 2026", reads:"4.4K",mins:6,  desc:"Automation removes some emotional mistakes but introduces new ones. What traders still get wrong with EAs."},
  {slug:"ea-forward-test-guide",           emoji:"📋",tag:"Technical",    title:"Forward Testing Your EA: How to Validate Results Before Going Live",        date:"Feb 2, 2026", reads:"3.6K",mins:7,  desc:"Demo account forward test setup, duration requirements, and how to interpret results before risking real money."},
  {slug:"currency-correlation-ea",         emoji:"🔗",tag:"Strategy",     title:"Currency Correlation for EA Traders: Avoiding Overexposure",               date:"Mar 1, 2026", reads:"3.2K",mins:6,  desc:"Running multiple EAs simultaneously creates hidden correlation risk. How to measure and control it."},
  {slug:"exit-strategy-ea-design",         emoji:"🚪",tag:"Strategy",     title:"Exit Strategy Design for Forex EAs: Take Profit, Trailing, and Time Exits",date:"Dec 20, 2025",reads:"4.8K",mins:8,  desc:"Where you exit defines your equity curve more than where you enter. Complete guide to EA exit design."},
];

const TAGS = ["All","EA Review","Strategy","Technical","Trading","Platform","Risk","Brokers"];

export default function SalmanFXBlog() {
  const [mounted,setMounted]       = useState(false);
  const [activeTag,setActiveTag]   = useState("All");
  const [search,setSearch]         = useState("");
  const [adminPosts,setAdminPosts] = useState([]);

  useEffect(()=>{ setMounted(true); try{const s=JSON.parse(localStorage.getItem("sfx_posts")||"[]"); setAdminPosts(s.filter(p=>p.status==="published"));}catch(_){} },[]);
  if (!mounted) return <div style={{minHeight:"100vh",background:"#060A0D"}}/>;

  const T={bg:"#060A0D",card:"rgba(255,255,255,0.04)",border:"rgba(16,185,129,0.12)",text:"#D4F0E8",sub:"rgba(255,255,255,0.4)",green:"#10B981",green2:"#34D399"};
  const all=[...POSTS,...adminPosts];
  const filtered=all.filter(p=>(activeTag==="All"||p.tag===activeTag)&&(!search||p.title.toLowerCase().includes(search.toLowerCase())));

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap"/>
      <div suppressHydrationWarning style={{minHeight:"100vh",background:T.bg,color:T.text,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
        <style suppressHydrationWarning>{`*{box-sizing:border-box}.bc:hover{transform:translateY(-4px)!important;border-color:rgba(16,185,129,0.4)!important}.bc{transition:all .25s ease}input:focus{outline:none!important;border-color:rgba(16,185,129,0.4)!important}`}</style>
        <div style={{background:"rgba(0,0,0,0.5)",borderBottom:`1px solid ${T.border}`,padding:"16px 28px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{fontFamily:"'JetBrains Mono',monospace",fontSize:15,fontWeight:700,color:T.green}}>SalmanFX <span style={{color:T.sub,fontWeight:400,fontSize:12}}>/ Blog</span></div>
            <div style={{fontSize:11,color:T.sub}}>Forex EA strategies, MT4 tutorials, and prop firm trading guides</div>
          </div>
          <div style={{display:"flex",gap:10}}>
            <Link href="/salmanfx" style={{padding:"7px 14px",border:`1px solid ${T.border}`,borderRadius:20,color:T.sub,fontSize:12,textDecoration:"none"}}>← SalmanFX</Link>
            <a href="https://wa.me/971544735060?text=Hi Salman, I want to buy an EA" target="_blank" rel="noopener noreferrer" style={{padding:"8px 18px",background:`linear-gradient(135deg,${T.green},#059669)`,borderRadius:20,color:"#000",fontSize:12,fontWeight:700,textDecoration:"none"}}>Buy EA →</a>
          </div>
        </div>
        <div style={{maxWidth:1120,margin:"0 auto",padding:"28px 24px"}}>
          <div style={{position:"relative",maxWidth:480,marginBottom:18}}>
            <span style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)"}}>🔍</span>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search EA and forex articles..."
              style={{width:"100%",padding:"10px 14px 10px 38px",background:"rgba(255,255,255,0.05)",border:`1px solid ${T.border}`,borderRadius:11,color:T.text,fontSize:13,fontFamily:"'Plus Jakarta Sans',sans-serif"}}/>
          </div>
          <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:26}}>
            {TAGS.map(tag=><button key={tag} onClick={()=>setActiveTag(tag)} style={{padding:"5px 13px",borderRadius:20,border:`1px solid ${activeTag===tag?"rgba(16,185,129,0.5)":T.border}`,background:activeTag===tag?"rgba(16,185,129,0.1)":"transparent",color:activeTag===tag?T.green:T.sub,fontSize:12,fontWeight:activeTag===tag?700:400,cursor:"pointer",fontFamily:"'Plus Jakarta Sans',sans-serif",transition:"all .18s"}}>{tag}</button>)}
          </div>
          {activeTag==="All"&&!search&&(
            <div style={{background:"rgba(16,185,129,0.05)",border:"1px solid rgba(16,185,129,0.18)",borderRadius:16,padding:"22px 26px",marginBottom:22,display:"grid",gridTemplateColumns:"1fr auto",gap:16,alignItems:"center"}}>
              <div>
                <div style={{fontSize:10,color:T.green,letterSpacing:"0.18em",textTransform:"uppercase",marginBottom:8,fontFamily:"'JetBrains Mono',monospace"}}>📌 Most Read</div>
                <h2 style={{fontSize:"clamp(16px,2.2vw,26px)",fontWeight:800,color:"#fff",lineHeight:1.2,marginBottom:8}}>{POSTS[3].emoji} {POSTS[3].title}</h2>
                <p style={{fontSize:12,color:T.sub,lineHeight:1.65,marginBottom:14}}>{POSTS[3].desc}</p>
                <div style={{display:"flex",gap:14,alignItems:"center"}}>
                  <span style={{fontSize:11,color:T.sub}}>📅 {POSTS[3].date} · ⏱ {POSTS[3].mins} min · 👁 {POSTS[3].reads}</span>
                  <Link href={`/salmanfx/blog/${POSTS[3].slug}`} style={{padding:"7px 18px",background:`linear-gradient(135deg,${T.green},#059669)`,borderRadius:20,color:"#000",fontSize:12,fontWeight:700,textDecoration:"none"}}>Read →</Link>
                </div>
              </div>
              <div style={{fontSize:52,opacity:0.5}}>{POSTS[3].emoji}</div>
            </div>
          )}
          <div style={{fontSize:12,color:T.sub,marginBottom:14}}>{filtered.length} articles</div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14}}>
            {filtered.map(post=>(
              <Link key={post.slug} href={`/salmanfx/blog/${post.slug}`} className="bc"
                style={{textDecoration:"none",background:T.card,border:`1px solid ${T.border}`,borderRadius:14,padding:"20px 20px",display:"block"}}>
                <div style={{fontSize:26,marginBottom:10}}>{post.emoji}</div>
                <div style={{display:"inline-block",fontSize:9,color:T.green,background:"rgba(16,185,129,0.08)",border:"1px solid rgba(16,185,129,0.2)",borderRadius:20,padding:"2px 9px",letterSpacing:"0.1em",textTransform:"uppercase",marginBottom:9,fontFamily:"'JetBrains Mono',monospace"}}>{post.tag}</div>
                <h3 style={{fontSize:14,fontWeight:700,color:"#fff",lineHeight:1.35,marginBottom:7}}>{post.title}</h3>
                <p style={{fontSize:12,color:T.sub,lineHeight:1.65,marginBottom:12}}>{post.desc}</p>
                <div style={{fontSize:11,color:T.sub,display:"flex",justifyContent:"space-between"}}>
                  <span>📅 {post.date} · ⏱ {post.mins} min</span><span style={{color:T.green}}>👁 {post.reads}</span>
                </div>
              </Link>
            ))}
          </div>
          <div style={{marginTop:36,background:"rgba(16,185,129,0.06)",border:"1px solid rgba(16,185,129,0.15)",borderRadius:14,padding:"20px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,flexWrap:"wrap"}}>
            <div><div style={{fontSize:14,fontWeight:700,marginBottom:3}}>🤖 Get the MM FLIP CODEPRO EA</div><div style={{fontSize:12,color:T.sub}}>MT4 & MT5 · Parabolic SAR · License protected · From AED 299</div></div>
            <a href="https://wa.me/971544735060?text=Hi Salman, I want to buy the MM FLIP CODEPRO EA" target="_blank" rel="noopener noreferrer" style={{padding:"10px 22px",background:`linear-gradient(135deg,${T.green},#059669)`,borderRadius:10,color:"#000",fontSize:13,fontWeight:700,textDecoration:"none"}}>💬 Buy Now →</a>
          </div>
        </div>
      </div>
    </>
  );
}
