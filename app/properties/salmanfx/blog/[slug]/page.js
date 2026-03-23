"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const POSTS = {
  "parabolic-sar-mt4-guide": { emoji:"📈", tag:"Strategy", title:"Parabolic SAR Strategy: Complete Guide for MT4 Traders", date:"February 2026", mins:8, reads:"3.4K",
    content:`The Parabolic SAR (Stop and Reverse) is one of the most reliable trend-following indicators available in MetaTrader. When used correctly, it provides clear entry signals, automatic stop-loss placement, and trailing exit management — everything an Expert Advisor needs.

**What is Parabolic SAR?**

Developed by J. Welles Wilder, Parabolic SAR plots dots above or below price. When dots are below price, trend is bullish. When dots are above price, trend is bearish. The moment the dot flips sides, it signals a trend reversal — your entry point.

**The Two Key Parameters**

Step (default 0.02): Controls how quickly the SAR moves toward price. Lower step = slower, fewer signals, longer trades. Higher step = faster, more signals, shorter trades.

Maximum (default 0.2): Caps the acceleration factor. Prevents the SAR from moving too fast in strong trends.

**Optimal Settings for XAUUSD (Gold)**

Gold is volatile and moves in strong directional trends. For MM FLIP CODEPRO on XAUUSD:
- Step: 0.018 (slightly slower than default)
- Maximum: 0.18 (slightly lower cap)
- Timeframe: H1 for primary signal, M15 for entry refinement
- This reduces false signals during gold's frequent consolidation periods.

**Entry Logic in MM FLIP CODEPRO**

The EA waits for three conditions before entering:
1. Parabolic SAR flips (dot crosses to other side of price)
2. The flip occurs after at least 3 consecutive candles in the previous direction
3. The current candle closes beyond the SAR dot (confirmation candle)

This three-condition filter eliminates most false signals during choppy, sideways markets.

**Stop Loss Placement**

The SAR dot itself becomes the stop loss. This is elegant — it's market-defined rather than arbitrary. As the trade moves in your favour, the SAR dot trails closer to price, automatically tightening your stop.

**Common Mistakes**

Using it in ranging markets: Parabolic SAR is designed for trending markets. In sideways consolidation, it generates excessive false signals. Always check for trend context using a higher timeframe moving average before trusting SAR signals.

Setting Step too high: A Step of 0.04 or higher generates too many signals on hourly charts for Gold. Stick to 0.015–0.02 for best results.

**Why MM FLIP CODEPRO Uses SAR as Core Logic**

Most EAs use moving average crossovers — which lag significantly. SAR is reactive and self-adjusting. It moves dynamically with market volatility rather than relying on fixed period calculations. This makes it better suited to Gold's variable volatility across trading sessions.

**Get MM FLIP CODEPRO**

The EA implements all of the above automatically. You set your lot size and the EA handles entries, stops, and trailing management. Available for MT4 and MT5. WhatsApp +971544735060 to purchase.` },

  "vps-mt4-contabo-setup": { emoji:"🖥️", tag:"Setup Guide", title:"VPS Setup Guide for MT4 on Contabo", date:"January 2026", mins:10, reads:"1.8K",
    content:`To run an Expert Advisor 24 hours a day, 5 days a week, you need a VPS (Virtual Private Server) — a remote computer that stays online even when your laptop is off. This guide covers the complete setup using Contabo, which offers the best value for MT4 users.

**Why You Need a VPS**

Your home internet goes down. Your laptop overheats. You put it to sleep. Any of these kills your running EA and potentially leaves open trades unmanaged. A VPS prevents all of this.

**Choosing Your VPS Plan**

For MT4 with 1–3 EAs running simultaneously:
- RAM: 2GB minimum (4GB recommended)
- CPU: 2 vCores
- Storage: 50GB SSD
- Location: Frankfurt or Amsterdam (low latency to major forex brokers)

Contabo VPS S: €4.99/month — 4 vCores, 8GB RAM, 200GB SSD. This is more than enough for multiple MT4 instances.

**Step 1: Order Your Contabo VPS**

Go to contabo.com. Select VPS S. Choose Germany (Frankfurt) as location. Select Windows Server 2019 as OS (required for MT4). Complete payment.

Contabo emails your VPS IP address, username, and password within 4 hours.

**Step 2: Connect via Remote Desktop**

On Windows: Start → Remote Desktop Connection → Enter your VPS IP address → Login with the credentials Contabo sent.

On Mac: Download Microsoft Remote Desktop from the App Store. Add a new PC with your VPS IP.

**Step 3: Install MetaTrader 4**

Inside your VPS (Remote Desktop window): Open Internet Explorer → Download MT4 from your broker's website → Install it.

Do not use the generic MetaQuotes MT4 download — use your specific broker's version as it contains their server list.

**Step 4: Login to MT4**

Open MT4 on the VPS → File → Login → Enter your account number, password, and select your broker's server → Connect.

**Step 5: Install the EA**

On your local computer, locate your .ex4 file. Copy it. In the Remote Desktop window, paste it into: C:/Program Files/MetaTrader 4/MQL4/Experts/

Restart MT4. The EA will appear in the Navigator panel under Expert Advisors.

**Step 6: Attach EA to Chart**

Open the currency pair chart (e.g. XAUUSD, H1). Drag the EA from Navigator onto the chart. A settings window opens — enter your license key and lot size. Click OK.

Ensure "Auto Trading" button in MT4 toolbar is green (enabled). The EA is now running.

**Step 7: Keep VPS Alive**

Contabo VPS runs continuously. Just ensure MT4 is set to start on Windows startup: right-click MT4 shortcut → Properties → Start Minimized. Pin to startup folder.

**Monitoring**

You can reconnect to your VPS from any device at any time via Remote Desktop to check your EA status. Most traders check once per day.

**WhatsApp Support**

If you get stuck at any step, WhatsApp +971544735060. I provide free VPS setup assistance for all EA purchasers.` },

  "best-forex-pairs-ea-2026": { emoji:"💹", tag:"Trading Tips", title:"Best Forex Pairs for Expert Advisors in 2026", date:"February 2026", mins:6, reads:"2.1K",
    content:`Not all currency pairs are created equal for automated trading. The wrong pair will generate random signals, widen spreads during news, and erode your capital gradually. Here is the definitive guide for 2026.

**XAUUSD (Gold) — Best Overall for EAs**

Gold remains the best instrument for Expert Advisors in 2026. Strong directional trends, clear technical structure, and sufficient volatility across all three major trading sessions (Asian, London, New York) give EAs reliable conditions.

Average daily range: 150–200 pips. Broker spread on ECN accounts: 1.5–2.5 pips. Volatility pattern: predictable with US CPI, Fed announcements, geopolitical events.

MM FLIP CODEPRO achieves its best results on XAUUSD H1. Our 2026 forward test shows 18.4% return over three months on this pair.

**EURUSD — Best for Beginners**

The most liquid pair in the world. Tight spreads (0.1–0.5 pips on ECN), predictable liquidity, lower volatility than Gold. Less explosive profits but more consistent signals. Excellent for conservative settings.

For MM FLIP CODEPRO: reduce lot size by 30% compared to XAUUSD settings, as lower volatility means smaller ATR-based stops.

**GBPUSD — High Reward, Higher Risk**

The "Cable" is more volatile than EURUSD and can produce sharp reversals during London open. Strong trending behaviour makes it good for SAR-based systems, but requires wider stops.

Not recommended for beginners. Best used at reduced position size alongside XAUUSD.

**Pairs to Avoid for EAs**

USDJPY: Strong influence of Bank of Japan intervention creates unpredictable spike events that destroy stop-placed EAs.

Exotic pairs (USDZAR, USDTRY etc.): Massive spreads, low liquidity, gap risk over weekends.

USDCAD: Oil-correlated with sudden moves. Not ideal for SAR-based systems without oil price filter.

**Best Trading Sessions**

London + New York overlap (13:00–17:00 UAE time): Peak liquidity, tightest spreads, strongest trend formation. Your EA should be most active during this window.

Asian session (01:00–08:00 UAE time): Lower volatility for EURUSD and GBPUSD. Gold can still move significantly during Asian session.

**Pair Diversification**

Running MM FLIP CODEPRO on XAUUSD and EURUSD simultaneously provides natural diversification — they are not highly correlated and their peak volatility windows differ slightly. This smooths your equity curve.

Always use separate lots for each pair rather than combining them.` },

  "mm-flip-codepro-v24": { emoji:"🤖", tag:"EA Update", title:"MM FLIP CODEPRO v2.4 — What's New in 2026", date:"March 2026", mins:5, reads:"1.2K",
    content:`Version 2.4 of MM FLIP CODEPRO is now available for all existing customers. Here is everything that changed and how to update.

**What's New in v2.4**

**Improved SAR Sensitivity Filter**

The most significant change. Previous versions entered on the first SAR flip regardless of market context. v2.4 adds an ATR-based filter: if the ATR (Average True Range) over the last 14 periods is below the 30-day average ATR by more than 25%, the EA skips the entry. This prevents trades during abnormally quiet consolidation periods.

Result in backtesting: 12% reduction in trade count, 18% improvement in win rate.

**Revised Lot Progression Table**

The 10-stage lot progression has been recalibrated based on 18 months of live data. Stage 1 and 2 lots are now slightly smaller (0.08 and 0.10 instead of 0.10 and 0.12) which reduces early-stage drawdown during unfavourable market periods.

**New Dashboard Layout**

The on-chart dashboard has been redesigned. Key changes:
- Equity curve now shows last 50 trades (previously 30)
- P&L now displayed in both account currency and USD
- ATR filter status shown (Active/Bypassed)
- Current market session indicator (Asian/London/NY/Overlap)

**Bug Fix: Weekend Gap Handling**

Previous versions occasionally left trades open over the weekend with stops set at Friday's SAR level. v2.4 automatically closes all positions 30 minutes before market close on Friday if a trade is in profit, and moves stops to breakeven if slightly negative.

**How to Update**

Existing customers: WhatsApp +971544735060 with your account number and purchase reference. The new .ex4/.ex5 file will be sent within 2 hours. No additional charge for updates.

New customers automatically receive v2.4 with purchase.

**Coming in v2.5**

Multi-pair portfolio mode — run XAUUSD and EURUSD from a single EA instance with combined risk management. Planned for Q2 2026.` },
};

export default function SalmanFXPost() {
  const params  = useParams();
  const slug    = params?.slug;
  const [mounted,    setMounted]    = useState(false);
  const [adminPosts, setAdminPosts] = useState([]);

  useEffect(() => {
    setMounted(true);
    try { const saved = JSON.parse(localStorage.getItem("sfx_posts") || "[]"); setAdminPosts(saved); } catch(_) {}
  }, []);

  if (!mounted) return <div style={{ minHeight:"100vh", background:"#060A0D" }}/>;

  const post = POSTS[slug] || adminPosts.find(p => p.slug === slug);

  if (!post) return (
    <div style={{ minHeight:"100vh", background:"#060A0D", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:12 }}>🔍</div>
        <div style={{ fontSize:20, fontWeight:700, color:"#fff", marginBottom:8 }}>Article Not Found</div>
        <Link href="/salmanfx/blog" style={{ padding:"10px 24px", background:"linear-gradient(135deg,#10B981,#059669)", borderRadius:20, color:"#fff", fontSize:13, fontWeight:700, textDecoration:"none" }}>← Back to Blog</Link>
      </div>
    </div>
  );

  const T = { bg:"#060A0D", border:"rgba(255,255,255,0.08)", text:"#E8F0E8", sub:"rgba(255,255,255,0.42)", green:"#10B981" };
  const related = Object.entries(POSTS).filter(([s]) => s !== slug).slice(0,3);

  const fmt = (text) => (text||"").split("\n\n").map((para, i) => {
    if (para.startsWith("**") && para.endsWith("**")) {
      return <h3 key={i} style={{ fontSize:20, fontWeight:800, color:"#fff", margin:"28px 0 10px" }}>{para.replace(/\*\*/g,"")}</h3>;
    }
    const parts = para.split(/(\*\*[^*]+\*\*)/g);
    return <p key={i} style={{ fontSize:15, color:T.text, lineHeight:1.85, marginBottom:18 }}>{parts.map((pt,j)=>pt.startsWith("**")&&pt.endsWith("**")?<strong key={j} style={{ color:"#fff", fontWeight:700 }}>{pt.replace(/\*\*/g,"")}</strong>:pt)}</p>;
  });

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"/>
      <div suppressHydrationWarning style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
        <style suppressHydrationWarning>{`*{box-sizing:border-box}`}</style>

        <div style={{ background:"rgba(0,0,0,0.4)", borderBottom:`1px solid ${T.border}`, padding:"14px 28px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:15, fontWeight:700, color:T.green }}>SalmanFX</div>
          <div style={{ display:"flex", gap:10 }}>
            <Link href="/salmanfx/blog" style={{ color:T.sub, fontSize:12, textDecoration:"none", padding:"7px 14px" }}>← All Articles</Link>
            <a href="https://wa.me/971544735060?text=Hi Salman, interested in your Forex EA" target="_blank" rel="noopener noreferrer" style={{ padding:"7px 16px", background:"linear-gradient(135deg,#10B981,#059669)", borderRadius:20, color:"#fff", fontSize:12, fontWeight:700, textDecoration:"none" }}>Get EA →</a>
          </div>
        </div>

        <div style={{ maxWidth:760, margin:"0 auto", padding:"48px 28px" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:5, background:"rgba(16,185,129,0.08)", border:"1px solid rgba(16,185,129,0.2)", borderRadius:20, padding:"4px 12px", marginBottom:20 }}>
            <span style={{ fontSize:10, color:T.green, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase" }}>{post.tag}</span>
          </div>
          <h1 style={{ fontSize:"clamp(24px,4vw,42px)", fontWeight:900, lineHeight:1.1, color:"#fff", marginBottom:18 }}>{post.emoji} {post.title}</h1>
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:36, paddingBottom:24, borderBottom:`1px solid ${T.border}` }}>
            <div style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,#10B981,#059669)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>👤</div>
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:"#fff" }}>Salman Ali · SalmanFX</div>
              <div style={{ fontSize:11, color:T.sub }}>📅 {post.date} · ⏱ {post.mins} min read · 👁 {post.reads} reads</div>
            </div>
            <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer" style={{ marginLeft:"auto", padding:"7px 14px", background:"rgba(37,211,102,0.12)", border:"1px solid rgba(37,211,102,0.25)", borderRadius:20, color:"#25D366", fontSize:11, fontWeight:700, textDecoration:"none" }}>💬 Ask Salman</a>
          </div>

          <div>{fmt(post.content || post.desc || "")}</div>

          <div style={{ marginTop:44, background:"rgba(16,185,129,0.07)", border:"1px solid rgba(16,185,129,0.2)", borderRadius:16, padding:"22px 26px", textAlign:"center" }}>
            <div style={{ fontSize:18, fontWeight:800, color:"#fff", marginBottom:8 }}>🤖 Ready to automate your trading?</div>
            <p style={{ fontSize:13, color:T.sub, marginBottom:18 }}>MM FLIP CODEPRO — MT4/MT5 · AED 299–1,499 · Lifetime license · 30-day money back</p>
            <a href="https://wa.me/971544735060?text=Hi Salman, I want to buy a Forex EA" target="_blank" rel="noopener noreferrer" style={{ display:"inline-block", padding:"12px 30px", background:"linear-gradient(135deg,#10B981,#059669)", borderRadius:24, color:"#fff", fontSize:14, fontWeight:700, textDecoration:"none" }}>💬 Buy on WhatsApp →</a>
          </div>
        </div>

        {related.length > 0 && (
          <div style={{ maxWidth:900, margin:"0 auto", padding:"0 28px 56px" }}>
            <div style={{ fontSize:14, fontWeight:700, marginBottom:16, color:"#fff" }}>More Articles</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:13 }}>
              {related.map(([s,p]) => (
                <Link key={s} href={`/salmanfx/blog/${s}`} style={{ textDecoration:"none", background:"rgba(255,255,255,0.04)", border:`1px solid ${T.border}`, borderRadius:13, padding:"16px 18px", display:"block" }}>
                  <div style={{ fontSize:22, marginBottom:7 }}>{p.emoji}</div>
                  <div style={{ fontSize:13, fontWeight:700, color:"#fff", marginBottom:4, lineHeight:1.3 }}>{p.title}</div>
                  <div style={{ fontSize:11, color:T.sub }}>{p.tag} · ⏱ {p.mins} min</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
