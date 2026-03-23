"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const POSTS = {
  "dubai-property-market-2026": { emoji:"📈", tag:"Market Update", title:"Dubai Property Market Report 2026: What Buyers Need to Know", date:"March 2026", mins:8, reads:"5.2K",
    content:`Dubai's property market delivered its strongest performance in a decade in 2025, and 2026 shows no signs of slowing down. Here is what the data says and what it means for buyers and investors.

**Price Performance by Area**

Downtown Dubai averaged AED 2,850 per sq ft in Q1 2026 — up 14% from Q1 2025. Dubai Marina held at AED 2,100 per sq ft (+9% YoY). JVC remains the value play at AED 950 per sq ft, with 9.2% rental yield attracting investors who cannot afford prime locations.

Palm Jumeirah villas continue to set records. A 5-bedroom Type B Garden Home traded at AED 42 million in February 2026 — the highest recorded for that villa type.

**Transaction Volume**

DLD recorded 42,000+ transactions in 2025 — a record high. Q1 2026 is running 18% above Q1 2025 pace. Cash buyers represent 52% of all transactions, reflecting confidence in the market without leverage dependency.

**Off-Plan vs Ready**

Off-plan continues to dominate volume at 61% of transactions. Developer payment plans have become aggressive — 60/40 and 70/30 post-handover plans are now common. Buyers are comfortable with this model given developer track records.

Ready properties command a premium of 15–25% over comparable off-plan units due to immediate rental income potential.

**Golden Visa Impact**

The AED 2 million investment threshold for the 10-year Golden Visa continues to drive demand in the AED 2M–3M bracket. Properties priced at AED 1.95M–2.05M are moving within days of listing as buyers are visa-motivated.

**Best Areas for Rental Yield 2026**

JVC: 9.2% gross yield
Jumeirah Village Triangle: 8.8%
Dubai Silicon Oasis: 8.5%
International City: 8.1%
Business Bay (studios): 7.9%

**Outlook**

Morgan Stanley and JLL both project 5–8% price appreciation for 2026 in prime Dubai areas. The main risk factor is interest rate direction — although 52% cash buyer dominance insulates the market from mortgage-rate sensitivity more than most global cities.

For investors entering in Q2 2026, JVC and Business Bay remain the strongest risk-adjusted plays. For end-users, Downtown and Marina remain aspirational but achievable on payment plan structures.` },

  "golden-visa-property-guide": { emoji:"🏅", tag:"Golden Visa", title:"UAE Golden Visa Through Property: Complete 2026 Guide", date:"February 2026", mins:9, reads:"4.8K",
    content:`The UAE 10-year Golden Visa through property investment is one of the most straightforward residency programs in the world. Here is exactly how it works in 2026.

**The Two Thresholds**

AED 750,000 minimum value: Qualifies for a 2-year investor visa. The property must be fully paid (not mortgaged). This is the entry-level investor visa — renewable every 2 years.

AED 2,000,000 minimum value: Qualifies for the 10-year Golden Visa. The property can be mortgaged — you only need AED 2 million in current equity. This is the visa most serious investors target.

**What the Golden Visa Includes**

The 10-year Golden Visa gives you UAE residency for 10 years, renewable. It covers your spouse and children under 18. It allows you to sponsor parents. It permits entry and exit without restrictions. It does not require you to live in the UAE for any minimum period.

**Eligibility Requirements**

Single property or multiple properties totalling AED 2M+. The valuation is based on DLD (Dubai Land Department) assessed value, not purchase price. Off-plan properties qualify only once 50% of the payment plan is completed.

**The Process**

Property must be registered with DLD. Obtain the title deed. Apply through the Federal Authority for Identity and Citizenship (ICA) online portal or in-person at a GDRFA office. Submit: title deed, passport copy, Emirates ID (if you have one), medical test, health insurance proof.

Processing time: 3–4 weeks typically.

**Joint Ownership**

Two investors can jointly own a property worth AED 4M and each claim a Golden Visa (AED 2M share each). This is a popular strategy for business partners or family members.

**Off-Plan and Golden Visa**

Off-plan properties qualify for Golden Visa once 50% of the total value is paid to the developer. For a AED 2.5M off-plan unit, once AED 1.25M is paid, you can apply. The visa is issued and the remaining payments continue.

**Tax Implications**

The UAE has no personal income tax, no capital gains tax on property, and no inheritance tax. Golden Visa holders retain these benefits for the 10-year residency period regardless of where they live globally.

**Finding Golden Visa-Eligible Properties**

Filter the Dubai Properties platform for properties at AED 2M+ in any area. Our investment analysis tab shows Golden Visa status for each property automatically.` },

  "buying-property-dubai-guide": { emoji:"🏠", tag:"Buyer Guide", title:"Step-by-Step: Buying Property in Dubai as a Foreigner in 2026", date:"January 2026", mins:11, reads:"6.1K",
    content:`Dubai allows foreigners to own property in designated freehold areas with no restrictions. Here is the complete process from search to handover.

**Step 1: Choose Freehold or Leasehold**

Freehold: You own the property outright forever. Available in designated freehold areas including Downtown, Marina, Palm Jumeirah, JVC, Business Bay, JBR, Arabian Ranches, and others.

Leasehold: You own the right to occupy for 30–99 years. Less common and generally less attractive for investment. Stick to freehold unless you have a specific reason.

**Step 2: Decide: Ready vs Off-Plan**

Ready: The property exists. You can visit it, rent it immediately after purchase, and know exactly what you are buying.

Off-Plan: Purchased from a developer before or during construction. Usually lower entry price with a payment plan. Higher risk (construction delays) but higher potential return.

For first-time Dubai buyers, ready property is recommended.

**Step 3: Set Your Budget Including All Costs**

Property price: 100%
DLD Transfer Fee: 4% of purchase price
Agent commission: 2% (paid by buyer)
Mortgage registration fee (if applicable): 0.25% of loan amount + AED 290
Trustee/conveyancing fee: AED 2,000–4,000
Oqood registration (off-plan): AED 3,000 flat

Total additional cost: approximately 6–7% above purchase price for ready property.

**Step 4: Get Pre-Approved (If Mortgaging)**

UAE banks offer mortgages to expats with valid UAE residence visa. Maximum LTV: 80% for properties under AED 5M, 70% for above AED 5M. Typical interest rates: 4.09–4.79% in Q1 2026.

Required documents: 3 months bank statements, salary certificate or trade license, 6 months payslips, passport and visa copy.

**Step 5: Make an Offer**

Through an agent or directly with the seller. Memorandum of Understanding (MOU / Form F) is signed. Buyer pays 10% deposit into an escrow or directly to the seller (with cheque) as commitment.

**Step 6: NOC and Transfer**

Seller obtains No Objection Certificate from developer (for apartments in managed buildings). This takes 5–15 business days.

Both parties meet at a DLD Trustee office. Final payment is made. Title deed is issued in buyer's name. The entire process from MOU to title deed: 2–4 weeks for ready properties.

**Step 7: Registration and Handover**

For ready properties: immediate handover upon title deed issuance. For off-plan: title deed issued at handover, which could be months or years later. Ensure your payment schedule is tied to construction milestones, not just calendar dates.

**Using the Dubai Properties Platform**

Our comparison tool shows all costs including DLD fee, agent commission, and mortgage options for each listing. The investment tab shows rental yield, 5-year appreciation estimate, and Golden Visa eligibility. Use it to compare 3 properties side-by-side before contacting any agent.` },

  "best-areas-invest-dubai-2026": { emoji:"📍", tag:"Investment", title:"Best Areas to Invest in Dubai Property in 2026", date:"March 2026", mins:7, reads:"3.9K",
    content:`Location selection is the single most important decision in Dubai property investment. Here is a data-driven breakdown of the top areas for 2026 based on yield, appreciation, and liquidity.

**JVC (Jumeirah Village Circle) — Best for Yield**

Average price: AED 950/sqft
Average rental yield: 9.2%
Average 2BR rent: AED 85,000/year
Key positive: Affordable entry, strong tenant demand from mid-income residents
Key risk: Oversupply — many similar buildings. Location selection within JVC matters.
Best buy: Newer buildings with gyms and pools in the inner circle zones.

**Business Bay — Best Balance of Yield and Location**

Average price: AED 1,750/sqft
Average rental yield: 7.9%
Average 1BR rent: AED 95,000/year
Key positive: Walking distance to Downtown. Strong corporate rental demand.
Key risk: Studio glut. Avoid studios — 1BR and above perform much better.
Best buy: Canal-facing units or buildings with Downtown Burj Khalifa view.

**Dubai Marina — Best Liquidity**

Average price: AED 2,100/sqft
Rental yield: 6.8%
Key positive: Never hard to rent, never hard to sell. The most liquid market in Dubai.
Key risk: Lower yield vs peripheral areas. Price appreciation has moderated.
Best buy: Mid-floor units in well-managed towers near the Marina Walk.

**Palm Jumeirah — Capital Preservation Play**

Average apartment price: AED 3,200/sqft; Villas AED 4,500–8,000/sqft
Rental yield: 5.2–6.5%
Key positive: Global brand. Consistent demand from HNWI. Strong villa appreciation.
Key risk: High entry price, lower yield.
Best for: Buyers with AED 5M+ looking for capital preservation + lifestyle value.

**Emerging: Jumeirah Village Triangle (JVT)**

Average price: AED 850/sqft
Rental yield: 8.8%
Key positive: Less oversupply than JVC, newer stock, better infrastructure.
Worth watching: Several new developer launches in 2026 at competitive prices.

**What to Avoid in 2026**

International City: High yield (8.1%) but very low appreciation and tenant quality issues.
Discovery Gardens: Similar profile to International City.
Deira / Bur Dubai freehold: Old stock, limited appreciation, high maintenance costs.

**Use the Platform**

Filter by area, price, and expected yield in our properties section. The Investment Intelligence tab shows our AI-calculated ROI score for each property.` },
};

export default function PropertiesBlogPost() {
  const params  = useParams();
  const slug    = params?.slug;
  const [mounted,    setMounted]    = useState(false);
  const [adminPosts, setAdminPosts] = useState([]);

  useEffect(() => {
    setMounted(true);
    try { const saved = JSON.parse(localStorage.getItem("prop_posts") || "[]"); setAdminPosts(saved); } catch(_) {}
  }, []);

  if (!mounted) return <div style={{ minHeight:"100vh", background:"#060A14" }}/>;

  const post = POSTS[slug] || adminPosts.find(p => p.slug === slug);

  if (!post) return (
    <div style={{ minHeight:"100vh", background:"#060A14", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:12 }}>🔍</div>
        <div style={{ fontSize:20, fontWeight:700, color:"#fff", marginBottom:8 }}>Article Not Found</div>
        <Link href="/properties/blog" style={{ padding:"10px 24px", background:"linear-gradient(135deg,#6366F1,#3B82F6)", borderRadius:20, color:"#fff", fontSize:13, fontWeight:700, textDecoration:"none" }}>← Back to Blog</Link>
      </div>
    </div>
  );

  const T = { bg:"#060A14", border:"rgba(255,255,255,0.08)", text:"#E8ECF8", sub:"rgba(255,255,255,0.42)", blue:"#6366F1", sky:"#60A5FA" };
  const related = Object.entries(POSTS).filter(([s]) => s !== slug).slice(0,3);

  const fmt = (text) => (text||"").split("\n\n").map((para,i) => {
    if (para.startsWith("**") && para.endsWith("**")) {
      return <h3 key={i} style={{ fontSize:20, fontWeight:800, color:"#fff", margin:"28px 0 10px" }}>{para.replace(/\*\*/g,"")}</h3>;
    }
    const parts = para.split(/(\*\*[^*]+\*\*)/g);
    return <p key={i} style={{ fontSize:15, color:T.text, lineHeight:1.85, marginBottom:18 }}>{parts.map((pt,j)=>pt.startsWith("**")&&pt.endsWith("**")?<strong key={j} style={{ color:"#fff", fontWeight:700 }}>{pt.replace(/\*\*/g,"")}</strong>:pt)}</p>;
  });

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap"/>
      <div suppressHydrationWarning style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
        <style suppressHydrationWarning>{`*{box-sizing:border-box}`}</style>

        <div style={{ background:"rgba(0,0,0,0.4)", borderBottom:`1px solid ${T.border}`, padding:"14px 28px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ fontSize:15, fontWeight:800, color:"#fff" }}>Dubai <span style={{ color:T.sky }}>Properties</span></div>
          <div style={{ display:"flex", gap:10 }}>
            <Link href="/properties/blog" style={{ color:T.sub, fontSize:12, textDecoration:"none", padding:"7px 14px" }}>← All Articles</Link>
            <Link href="/properties" style={{ padding:"7px 16px", background:"linear-gradient(135deg,#6366F1,#3B82F6)", borderRadius:20, color:"#fff", fontSize:12, fontWeight:700, textDecoration:"none" }}>Browse Properties →</Link>
          </div>
        </div>

        <div style={{ maxWidth:760, margin:"0 auto", padding:"48px 28px" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:5, background:"rgba(99,102,241,0.08)", border:"1px solid rgba(99,102,241,0.25)", borderRadius:20, padding:"4px 12px", marginBottom:20 }}>
            <span style={{ fontSize:10, color:T.blue, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase" }}>{post.tag}</span>
          </div>
          <h1 style={{ fontSize:"clamp(24px,4vw,44px)", fontWeight:900, lineHeight:1.1, color:"#fff", marginBottom:18 }}>{post.emoji} {post.title}</h1>

          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:36, paddingBottom:24, borderBottom:`1px solid ${T.border}` }}>
            <div style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,#6366F1,#3B82F6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>👤</div>
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:"#fff" }}>Salman Ali · Dubai Properties</div>
              <div style={{ fontSize:11, color:T.sub }}>📅 {post.date} · ⏱ {post.mins} min read · 👁 {post.reads} reads</div>
            </div>
            <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer" style={{ marginLeft:"auto", padding:"7px 14px", background:"rgba(37,211,102,0.12)", border:"1px solid rgba(37,211,102,0.25)", borderRadius:20, color:"#25D366", fontSize:11, fontWeight:700, textDecoration:"none" }}>💬 Ask Salman</a>
          </div>

          <div>{fmt(post.content || post.desc || "")}</div>

          <div style={{ marginTop:44, background:"rgba(99,102,241,0.07)", border:"1px solid rgba(99,102,241,0.2)", borderRadius:16, padding:"22px 26px", textAlign:"center" }}>
            <div style={{ fontSize:18, fontWeight:800, color:"#fff", marginBottom:8 }}>🏙️ Find your next Dubai property</div>
            <p style={{ fontSize:13, color:T.sub, marginBottom:18 }}>30+ properties · AI scoring · Mortgage calculator · Market trends · Investment analysis</p>
            <Link href="/properties" style={{ display:"inline-block", padding:"12px 30px", background:"linear-gradient(135deg,#6366F1,#3B82F6)", borderRadius:24, color:"#fff", fontSize:14, fontWeight:700, textDecoration:"none" }}>Browse Properties →</Link>
          </div>
        </div>

        {related.length > 0 && (
          <div style={{ maxWidth:900, margin:"0 auto", padding:"0 28px 56px" }}>
            <div style={{ fontSize:14, fontWeight:700, marginBottom:16, color:"#fff" }}>More Articles</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:13 }}>
              {related.map(([s,p]) => (
                <Link key={s} href={`/properties/blog/${s}`} style={{ textDecoration:"none", background:"rgba(255,255,255,0.04)", border:`1px solid ${T.border}`, borderRadius:13, padding:"16px 18px", display:"block" }}>
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
