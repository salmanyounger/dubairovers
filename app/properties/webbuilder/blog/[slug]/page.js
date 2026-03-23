"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const POSTS = {
  "website-cost-dubai-2026": { emoji:"💰", tag:"Pricing Guide", title:"How Much Does a Website Cost in Dubai in 2026?", date:"March 2026", mins:6, reads:"2.8K",
    content:`Pricing for websites in Dubai varies wildly — from AED 500 freelancers on Facebook to AED 200,000 agency quotes. This guide gives you honest numbers so you can budget correctly.

**Why Dubai Website Prices Are So Different**

Three types of people build websites in Dubai:

1. Freelancers (AED 500–3,000) — usually offshore workers building on WordPress templates. Fast, cheap, and generic. Good for zero-budget startups who just need a placeholder.

2. Local agencies (AED 15,000–100,000+) — large teams with account managers, designers, and project managers. You pay for their office in Business Bay and their marketing budget.

3. Independent developers like Salman Ali (AED 1,200–50,000) — direct access to the person writing the code. Custom-built, no template, no unnecessary markup.

**Pricing by Category**

**Starter Website (AED 1,200–3,000)**
5–8 pages, mobile responsive, WhatsApp button, contact form, basic SEO. Suitable for a small business needing a professional online presence. Delivered in 5–7 days.

**Business Website (AED 4,000–8,000)**
12–20 pages, booking or reservation system, blog with CMS, admin panel to update content, multi-language (Arabic + English), Google Analytics. 10–14 days delivery.

**Platform / Web App (AED 12,000–25,000)**
Complex features: live tracking, payment gateway, AI tools, real-time maps, comparison engines, custom admin dashboard with full CRUD. 3–6 weeks delivery.

**Enterprise (AED 30,000–50,000+)**
Multi-tenant systems, marketplace platforms, SaaS products, white-label solutions with source code. Full documentation and training included.

**What Is NOT Included in Most Quotes**

Domain registration: AED 50–150/year (GoDaddy or Namecheap)
Hosting: Free on Vercel for most sites. Paid hosting from AED 100–500/month for high-traffic.
Logo design: AED 300–1,500 if you do not have one.
Photography: AED 500–2,000 for professional product/business photos.
Google Ads or SEO: Separate ongoing cost — website build does not include marketing.

**Red Flags When Getting Quotes**

Any developer who cannot show you live working examples of previous work — not mockups, actual URLs. Any quote that does not specify whether you own the source code. Monthly fees for a "basic" website (you should own your site outright after paying for it). WordPress sites being sold as "custom" — ask if it's a theme or coded from scratch.

**How to Get an Honest Quote**

WhatsApp me your business name, what you sell, how many pages you need, and whether you want a booking system or admin panel. I will tell you exactly what it costs and how long it takes — no sales process, no discovery calls.` },

  "nextjs-vs-wordpress-dubai": { emoji:"⚡", tag:"Technical", title:"Next.js vs WordPress: Which is Better for Dubai Businesses?", date:"February 2026", mins:8, reads:"1.9K",
    content:`WordPress powers 43% of all websites globally. Next.js is used by Vercel, Notion, TikTok, and Twitch. For a Dubai business in 2026, the choice matters more than most developers will tell you.

**What WordPress Actually Is**

WordPress is a PHP-based content management system built in 2003. You install it on a server, choose a theme (usually from ThemeForest for $50–80), install plugins for every feature you need, and manage the result.

The problem is not WordPress itself — it is the layer of themes and plugins that most Dubai web agencies sell as "custom websites."

**What Next.js Actually Is**

Next.js is a React framework. Every component is written from scratch for your specific use case. There are no themes, no plugin conflicts, no PHP vulnerabilities to patch. The output is a fast, modern web application.

**Speed**

Next.js wins decisively. A well-built Next.js site scores 90–98 on Google PageSpeed. A typical WordPress site (with the usual plugins: Elementor, WooCommerce, Contact Form 7, Yoast, caching plugin, security plugin) scores 40–65.

Speed directly affects Google rankings. Dubai searches are competitive — you cannot afford a slow site.

**Security**

WordPress is the most-hacked CMS on the internet. Not because it is poorly built, but because its popularity makes it a target. If you do not update plugins and themes within days of patches, you are vulnerable.

Next.js deployed on Vercel has no server-side attack surface. There is no admin login at /wp-admin to brute force.

**Arabic and RTL Support**

Both handle Arabic. In WordPress, you add an RTL plugin and switch themes — and most themes break partially. In Next.js, Arabic RTL is designed in from the beginning and works perfectly on every component.

**When WordPress Still Makes Sense**

If your team needs to update blog posts daily without developer involvement, WordPress's visual editor is genuinely easier for non-technical staff. For a news site or content-heavy blog where your marketing team posts 10+ articles per week — WordPress with a well-maintained theme is acceptable.

**My Recommendation for Dubai Businesses**

Tourism, restaurant, real estate, e-commerce, service business: Next.js. You want speed, security, custom features, and Arabic support.

High-volume content blogs where non-technical staff post daily: WordPress with a minimal, well-maintained theme.

Everything else: Next.js.` },

  "arabic-website-dubai-business": { emoji:"🌐", tag:"Strategy", title:"Why Your Dubai Business Website Must Be in Arabic Too", date:"February 2026", mins:5, reads:"3.2K",
    content:`Dubai's population is approximately 3.5 million. Emiratis and Arab expatriates make up roughly 40% of residents. Another significant portion — from Egypt, Jordan, Lebanon, Syria, Iraq — strongly prefer consuming business information in Arabic.

If your website is English-only, you are invisible to a large segment of Dubai's spending population.

**The SEO Argument**

Arabic keywords have dramatically less competition than English equivalents. "تصميم موقع دبي" (website design Dubai in Arabic) has a fraction of the competing pages that "web design Dubai" has — but similar search volume from Arabic speakers.

A bilingual website captures both audiences and ranks for twice as many keywords.

**The Conversion Argument**

Studies consistently show that people are 3x more likely to make a purchase in their native language. For a Dubai restaurant, hotel, or service business, an Arabic version of your site means Arabic-speaking customers can understand your menu, pricing, and booking process without guessing.

**The Professionalism Argument**

Arabic-speaking business owners in Dubai use language as a trust signal. A website in only English reads as "this is not really for us." An Arabic version signals that you genuinely want their business.

**How to Do It Right**

RTL layout: Arabic is read right to left. The entire page layout must mirror horizontally — not just the text. Menus move to the right, content aligns right, navigation flows right.

Font choice: Cairo (by Google Fonts) is the best Arabic web font — clean, modern, legible at all sizes.

Translation quality: Do not use Google Translate directly. For menu items, product names, and calls to action — use a native Arabic speaker for review. Auto-translation is fine for long body text but terrible for headlines and CTAs.

URL structure: /ar/ prefix for Arabic pages helps Google understand and index your Arabic content separately.

**What I Build**

Every website I build includes an Arabic toggle built into the navigation. One click switches the entire site — layout, fonts, text direction, and content — to Arabic. The same admin panel manages both versions.

WhatsApp me to discuss building or adding Arabic to your existing site.` },

  "whatsapp-website-integration": { emoji:"💬", tag:"Features", title:"WhatsApp Integration: The Most Important Feature for Dubai Websites", date:"January 2026", mins:4, reads:"4.1K",
    content:`In Dubai, customers do not fill out contact forms. They do not send emails. They WhatsApp.

If your website does not have a prominent WhatsApp button on every page, you are losing inquiries to competitors who do.

**The WhatsApp Button Basics**

The simplest implementation is a floating button in the bottom right corner of every page. One tap opens WhatsApp with a pre-filled message. Zero friction.

The link format is: https://wa.me/971XXXXXXXXX?text=Hello, I found you on your website

**Pre-filled Messages by Page**

Generic WhatsApp buttons waste an opportunity. Each page should pre-fill a context-specific message:

Product page: "Hi, I'm interested in [product name] from your website"
Tour page: "Hi, I want to book [tour name] for [X] people"
Restaurant menu: "Hi, I'd like to reserve a table for [X] at [time]"
Real estate listing: "Hi, I'm interested in the [property name] listing"

This tells you immediately what the customer wants and removes back-and-forth.

**Multiple Phone Numbers**

For businesses with departments, route different buttons to different numbers:
- General inquiry → main number
- Booking/reservation → bookings team number
- After-hours → owner's personal number with a note about response time

**The Floating Button with Animation**

The floating WhatsApp button should be always visible but not annoying. Best practice:
- Bottom right corner, 50–60px diameter
- Subtle float animation (moves up and down 6px every 3 seconds)
- Green (#25D366) with white icon
- Slight glow/shadow so it pops against any background
- On mobile, sits above the browser navigation bar

**WhatsApp Business vs Personal**

For any business with more than one inquiry per day, use WhatsApp Business. It adds: automatic greeting message, away message for outside hours, quick replies for common questions, product catalog, and read receipts with labels.

**Every Website I Build**

All my websites include pre-filled WhatsApp buttons on every product, tour, or service page. The message is customised per page so you know exactly what the customer wants before you reply. WhatsApp me to see examples.` },
};

export default function WebBuilderPost() {
  const params  = useParams();
  const slug    = params?.slug;
  const [mounted,    setMounted]    = useState(false);
  const [adminPosts, setAdminPosts] = useState([]);

  useEffect(() => {
    setMounted(true);
    try { const saved = JSON.parse(localStorage.getItem("wb_posts") || "[]"); setAdminPosts(saved); } catch(_) {}
  }, []);

  if (!mounted) return <div style={{ minHeight:"100vh", background:"#0A060F" }}/>;

  const post = POSTS[slug] || adminPosts.find(p => p.slug === slug);

  if (!post) return (
    <div style={{ minHeight:"100vh", background:"#0A060F", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:12 }}>🔍</div>
        <div style={{ fontSize:20, fontWeight:700, color:"#fff", marginBottom:8 }}>Article Not Found</div>
        <Link href="/webbuilder/blog" style={{ padding:"10px 24px", background:"linear-gradient(135deg,#EC4899,#8B5CF6)", borderRadius:20, color:"#fff", fontSize:13, fontWeight:700, textDecoration:"none" }}>← Back to Blog</Link>
      </div>
    </div>
  );

  const T = { bg:"#0A060F", border:"rgba(255,255,255,0.08)", text:"#F0ECF8", sub:"rgba(255,255,255,0.42)", pink:"#EC4899" };
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
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"/>
      <div suppressHydrationWarning style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
        <style suppressHydrationWarning>{`*{box-sizing:border-box}`}</style>

        <div style={{ background:"rgba(0,0,0,0.4)", borderBottom:`1px solid ${T.border}`, padding:"14px 28px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:800, color:T.pink }}>Web Builder</div>
          <div style={{ display:"flex", gap:10 }}>
            <Link href="/webbuilder/blog" style={{ color:T.sub, fontSize:12, textDecoration:"none", padding:"7px 14px" }}>← All Articles</Link>
            <a href="https://wa.me/971544735060?text=Hi Salman, I want a website for my business" target="_blank" rel="noopener noreferrer" style={{ padding:"7px 16px", background:"linear-gradient(135deg,#EC4899,#8B5CF6)", borderRadius:20, color:"#fff", fontSize:12, fontWeight:700, textDecoration:"none" }}>Get Quote →</a>
          </div>
        </div>

        <div style={{ maxWidth:760, margin:"0 auto", padding:"48px 28px" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:5, background:"rgba(236,72,153,0.08)", border:"1px solid rgba(236,72,153,0.2)", borderRadius:20, padding:"4px 12px", marginBottom:20 }}>
            <span style={{ fontSize:10, color:T.pink, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase" }}>{post.tag}</span>
          </div>
          <h1 style={{ fontSize:"clamp(24px,4vw,42px)", fontWeight:900, lineHeight:1.1, color:"#fff", marginBottom:18 }}>{post.emoji} {post.title}</h1>
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:36, paddingBottom:24, borderBottom:`1px solid ${T.border}` }}>
            <div style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,#EC4899,#8B5CF6)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>👤</div>
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:"#fff" }}>Salman Ali · Web Builder Dubai</div>
              <div style={{ fontSize:11, color:T.sub }}>📅 {post.date} · ⏱ {post.mins} min read · 👁 {post.reads} reads</div>
            </div>
            <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer" style={{ marginLeft:"auto", padding:"7px 14px", background:"rgba(37,211,102,0.12)", border:"1px solid rgba(37,211,102,0.25)", borderRadius:20, color:"#25D366", fontSize:11, fontWeight:700, textDecoration:"none" }}>💬 Ask Salman</a>
          </div>
          <div>{fmt(post.content || post.desc || "")}</div>
          <div style={{ marginTop:44, background:"rgba(236,72,153,0.07)", border:"1px solid rgba(236,72,153,0.2)", borderRadius:16, padding:"22px 26px", textAlign:"center" }}>
            <div style={{ fontSize:18, fontWeight:800, color:"#fff", marginBottom:8 }}>💻 Need a website built?</div>
            <p style={{ fontSize:13, color:T.sub, marginBottom:18 }}>React & Next.js · Arabic/English · Mobile-first · Booking forms · Admin panel · AED 1,200+</p>
            <a href="https://wa.me/971544735060?text=Hi Salman, I want a website for my business" target="_blank" rel="noopener noreferrer" style={{ display:"inline-block", padding:"12px 30px", background:"linear-gradient(135deg,#EC4899,#8B5CF6)", borderRadius:24, color:"#fff", fontSize:14, fontWeight:700, textDecoration:"none" }}>💬 WhatsApp for Free Quote →</a>
          </div>
        </div>

        {related.length > 0 && (
          <div style={{ maxWidth:900, margin:"0 auto", padding:"0 28px 56px" }}>
            <div style={{ fontSize:14, fontWeight:700, marginBottom:16, color:"#fff" }}>More Articles</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:13 }}>
              {related.map(([s,p]) => (
                <Link key={s} href={`/webbuilder/blog/${s}`} style={{ textDecoration:"none", background:"rgba(255,255,255,0.04)", border:`1px solid ${T.border}`, borderRadius:13, padding:"16px 18px", display:"block" }}>
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
