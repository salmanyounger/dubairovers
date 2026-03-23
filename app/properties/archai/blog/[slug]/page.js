"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const POSTS = {
  "ai-villa-design-2026": { emoji:"🤖", tag:"AI Design", title:"How AI is Changing Villa Design in 2026", date:"March 2026", author:"Salman Ali", mins:5, reads:"1.8K",
    content:`AI has fundamentally changed how villa design works. What used to take weeks and thousands of rupees now takes 3 minutes and costs nothing.

**The Old Way**

Before tools like ARCHAI, designing a villa meant: hire an architect, wait 2–3 weeks for concept sketches, pay AED 3,000–10,000 for initial drawings, then discover the style isn't what you imagined and start over.

**How ARCHAI Changes This**

ARCHAI uses a 5-step wizard that asks you the right questions. Style preference, room count, colour palette, floor count, and special features. From those answers, it generates a complete design package.

**What You Get in 3 Minutes**

- Complete floor plan layout for each floor
- Material recommendations matched to your chosen style  
- PKR construction cost estimate per marla
- A Bing Image Creator prompt that generates a photorealistic render of your villa — free

**Why Architects Are Paying Attention**

ARCHAI doesn't replace architects for final construction documents. But it completely replaces the exploration phase — the part where clients aren't sure what they want. Now clients arrive at architect meetings knowing their style, their layout, and their budget. Meetings that used to take 3 sessions take 1.

**The 9 Styles Available**

California Modern, South Asian Contemporary, Modern Mediterranean, Islamic Grand, Modern Minimalist, Desert Contemporary, Tropical Luxury, Colonial Classic, and Pakistani Traditional.

Each style comes with its own material palette, structural characteristics, and cost profile.

**Try It Free**

ARCHAI is completely free until January 2026. No signup required. Start designing at the link below.` },

  "10-marla-layouts": { emoji:"📐", tag:"Floor Plans", title:"10 Marla Villa Design Ideas: Best Layouts for 2026", date:"February 2026", author:"Salman Ali", mins:8, reads:"3.1K",
    content:`10 Marla is the most popular residential plot size in Pakistan — particularly in DHA Lahore, Bahria Town, and comparable societies across Karachi and Islamabad.

**What is 10 Marla?**

1 Marla = 272 sq ft. So 10 Marla = 2,720 sq ft of plot area. In practice, after setbacks (front garden, side margins), your buildable footprint is roughly 1,800–2,000 sq ft per floor.

**Layout Option 1: Ground + 1 (Family Home)**

Ground floor: drawing room, dining, kitchen, 1 bedroom with attached bath, servant quarter, store.
First floor: master bedroom with dressing + attached, 2 additional bedrooms, family lounge.

This is the most practical layout for a joint family of 4–6 people.

**Layout Option 2: Ground + 2 (Investment Focus)**

Same ground floor as above. First floor: 3 bedrooms + 2 baths. Second floor: 1–2 additional bedrooms + rooftop terrace. 

This layout maximises rental yield if you plan to rent the upper floor separately.

**Layout Option 3: Ground + Basement**

Basement: home cinema/games room/gym + utility area. Ground: full open-plan living with high ceilings. First: 3 bedrooms.

Premium feel, significantly higher construction cost (AED 180–220 per sq ft for basement vs AED 140–160 for standard floors).

**Construction Cost Estimate (2026)**

Grey structure (foundation + frame + brick): PKR 180–220 per sq ft
Finishing (tiles, paint, woodwork, electrical): PKR 140–180 per sq ft
Total: approximately PKR 320–400 per sq ft
For 2,000 sq ft ground floor: PKR 64 lakh – PKR 80 lakh

**Generate Your Layout Free**

Use ARCHAI to generate floor plans for any of these layouts in 3 minutes. Choose your plot size, floors, and style — get a complete plan instantly.` },

  "south-asian-contemporary": { emoji:"🏘️", tag:"Style Guide", title:"South Asian Contemporary: Pakistan's Most Wanted Style in 2026", date:"February 2026", author:"Salman Ali", mins:7, reads:"4.2K",
    content:`Walk through DHA Lahore Phase 7 or Bahria Town Karachi and you will see it everywhere: white or light grey cubic forms, dark-framed windows, teak wood cladding accents, and flat or slightly pitched roofs. This is South Asian Contemporary — and it has become the dominant residential style in Pakistan's premium housing societies.

**What Defines This Style**

South Asian Contemporary is a fusion of international minimalism with local climate and cultural needs. Key characteristics:

- Clean geometric volumes with minimal ornamentation
- White or off-white exterior render as the dominant finish
- Dark window frames (usually black or charcoal aluminium)
- Teak wood or timber cladding on feature walls or pergolas
- Double-height entrance lobbies
- Large sliding doors opening to garden or courtyard
- Flat roof or low-pitch design

**Why It Dominates Pakistani Markets**

Three reasons: cost efficiency, photogenic quality for marketing, and international prestige.

Flat roofs with simple geometry are cheaper to construct than Mughal arches or Colonial columns. The style photographs extremely well for property marketing — clean lines read well in images.

**How It Adapts to Pakistani Climate**

The best South Asian Contemporary designs incorporate deep roof overhangs or pergolas to manage direct sun exposure. Courtyards create natural ventilation. Thick boundary walls provide privacy without visual heaviness.

**Material Choices That Work**

Exterior: light grey or white texture render over brick.
Feature elements: Teak-look aluminium cladding (more durable than real wood in Pakistani climate).
Windows: UPVC or aluminium double-glazed in dark frames.
Flooring: large-format porcelain tiles (80×80cm or larger) in grey or beige.

**Design It in ARCHAI**

ARCHAI includes South Asian Contemporary as one of its 9 villa styles. Select it, choose your rooms and colours, and get a complete design package including floor plans and a photorealistic AI image prompt — free.` },

  "islamic-architecture-guide": { emoji:"🕌", tag:"Style Guide", title:"Islamic Grand Villas: Mughal Architecture for Modern Homes", date:"December 2025", author:"Salman Ali", mins:6, reads:"1.6K",
    content:`Islamic architecture has a 1,400-year tradition of beauty, proportion and spiritual meaning. Incorporating its principles into a contemporary family villa — without making it feel like a museum — requires a thoughtful approach.

**Core Islamic Architectural Principles**

**Geometric patterns:** Islamic design uses mathematical precision. Repetitive geometric patterns in tile, screen, or carved stone work create visual richness without figural imagery.

**The Courtyard (Sahn):** Central to Islamic domestic architecture. The courtyard creates privacy, provides natural light and ventilation, and becomes the heart of family life. Even a small 4×4 metre internal courtyard transforms a house.

**The Mashrabiya:** Carved or latticed wooden screens that filter light, provide ventilation, and maintain privacy. Modern interpretations use laser-cut metal or CNC-carved wood.

**Pointed Arches:** The horseshoe arch and pointed arch are iconic Islamic forms. Used at entrances, windows, and internal doorways, they immediately communicate the style.

**Minaret-Inspired Vertical Elements:** A single corner tower or vertical fin element references the minaret form without religious implication — purely as architectural expression.

**Modern Islamic Grand: How to Balance It**

The trap to avoid is pastiche — making a house look like a mosque. Modern Islamic villas use these principles selectively:

- One statement arch at the main entrance
- A courtyard or covered atrium
- Geometric tile or screen accents
- Calligraphy as art, not decoration
- Neutral interior palette with occasional jewel-tone accents (deep teal, burgundy, gold)

**Construction Considerations**

Arched structures require specialised shuttering. Budget 15–20% more than a comparable rectangular design for structural complexity. The payoff is a home with genuine architectural character that will never look dated.

**See It in ARCHAI**

Select Islamic Grand in ARCHAI to see how these elements compose into a complete villa design. You will get floor plans, material recommendations, and a photorealistic AI prompt — free.` },

  "bing-image-creator-villa": { emoji:"📸", tag:"Free Tools", title:"How to Get a Free Photorealistic Villa Photo in 30 Seconds", date:"January 2026", author:"Salman Ali", mins:4, reads:"5.7K",
    content:`Bing Image Creator (powered by DALL-E) is free with a Microsoft account and generates photorealistic architectural renders in seconds. ARCHAI builds you the perfect prompt automatically. Here is exactly how to use it.

**Step 1: Design Your Villa on ARCHAI**

Go to ARCHAI, complete the 5-step wizard, and reach the results page. You will see your floor plans, cost estimate, and at the bottom — a ready-to-use Bing prompt.

**Step 2: Copy the Prompt**

ARCHAI generates a complete prompt based on your exact selections. It includes:
- Your chosen architectural style
- Specific materials you selected
- The climate/setting (Dubai desert, lush garden, urban)
- Lighting instruction (golden hour is best)
- Camera angle (slightly elevated, 3/4 view works best for villas)
- Quality instructions (photorealistic, architectural photography)

**Step 3: Open Bing Image Creator**

Go to bing.com/create — free with Microsoft account. You get 15 "boosts" per day (fast generation). Paste the prompt and generate.

**Step 4: Iterate**

If you want different lighting or angle, add to the end of the prompt:
- "shot at sunrise" vs "golden hour late afternoon"
- "aerial view" vs "street-level perspective"  
- "wide angle" vs "close detail"

**Why This Works Better Than Generic Prompts**

Generic prompts like "luxury villa Dubai" give you generic results. The ARCHAI prompt specifies your exact materials, colours, and style — so the result actually looks like your design, not a random stock photo.

**Example Result**

A California Modern 4-bedroom with travertine cladding, black frames, and an infinity pool will generate a result you could genuinely show to a contractor as a design reference.

**Start Now — It Is Free**

ARCHAI is free until January 2026. No account needed. Design your villa and get your prompt in 3 minutes.` },
};

export default function ArchaiBlogPost() {
  const params  = useParams();
  const slug    = params?.slug;
  const [mounted, setMounted] = useState(false);
  const [adminPosts, setAdminPosts] = useState([]);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = JSON.parse(localStorage.getItem("archai_posts") || "[]");
      setAdminPosts(saved);
    } catch(_) {}
  }, []);

  if (!mounted) return <div style={{ minHeight:"100vh", background:"#06080d" }}/>;

  // Check built-in posts first, then admin-created posts
  const post = POSTS[slug] || adminPosts.find(p => p.slug === slug);

  if (!post) return (
    <div style={{ minHeight:"100vh", background:"#06080d", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Outfit',sans-serif" }}>
      <div style={{ textAlign:"center" }}>
        <div style={{ fontSize:48, marginBottom:12 }}>🔍</div>
        <div style={{ fontSize:20, fontWeight:700, color:"#fff", marginBottom:8 }}>Article Not Found</div>
        <Link href="/archai/blog" style={{ padding:"10px 24px", background:"linear-gradient(135deg,#C8A96E,#9A7830)", borderRadius:20, color:"#000", fontSize:13, fontWeight:700, textDecoration:"none" }}>← Back to Blog</Link>
      </div>
    </div>
  );

  const T = { bg:"#06080d", border:"rgba(200,169,110,0.14)", text:"#E2DED6", sub:"#525870", gold:"#C8A96E", gold2:"#E8D09A" };

  // Related posts (exclude current)
  const related = Object.entries(POSTS).filter(([s]) => s !== slug).slice(0, 3);

  const formatContent = (text) => {
    if (!text) return [];
    return text.split("\n\n").map((para, i) => {
      if (para.startsWith("**") && para.endsWith("**")) {
        return <h3 key={i} style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:24, fontWeight:600, color:"#fff", margin:"28px 0 10px", lineHeight:1.2 }}>{para.replace(/\*\*/g,"")}</h3>;
      }
      // Bold text within paragraphs
      const parts = para.split(/(\*\*[^*]+\*\*)/g);
      return (
        <p key={i} style={{ fontSize:15, color:T.text, lineHeight:1.85, marginBottom:18 }}>
          {parts.map((part, j) =>
            part.startsWith("**") && part.endsWith("**")
              ? <strong key={j} style={{ color:"#fff", fontWeight:700 }}>{part.replace(/\*\*/g,"")}</strong>
              : part
          )}
        </p>
      );
    });
  };

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&family=Outfit:wght@300;400;500;600;700&display=swap"/>
      <div suppressHydrationWarning style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Outfit',sans-serif" }}>
        <style suppressHydrationWarning>{`*{box-sizing:border-box}`}</style>

        {/* Nav */}
        <div style={{ background:"rgba(0,0,0,0.5)", borderBottom:`1px solid ${T.border}`, padding:"14px 28px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <Link href="/archai" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, letterSpacing:5, color:T.gold2, textDecoration:"none" }}>ARCH<span style={{ color:T.sub }}>AI</span></Link>
          <div style={{ display:"flex", gap:10 }}>
            <Link href="/archai/blog" style={{ color:T.sub, fontSize:13, textDecoration:"none", padding:"7px 14px" }}>← All Articles</Link>
            <Link href="/archai" style={{ padding:"7px 16px", background:`linear-gradient(135deg,${T.gold},#9A7830)`, borderRadius:20, color:"#000", fontSize:12, fontWeight:700, textDecoration:"none" }}>Design Villa →</Link>
          </div>
        </div>

        {/* Article */}
        <div style={{ maxWidth:760, margin:"0 auto", padding:"52px 28px" }}>

          {/* Category + meta */}
          <div style={{ display:"inline-flex", alignItems:"center", gap:5, background:"rgba(200,169,110,0.08)", border:`1px solid rgba(200,169,110,0.2)`, borderRadius:20, padding:"4px 12px", marginBottom:20 }}>
            <span style={{ fontSize:10, color:T.gold, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase" }}>{post.tag}</span>
          </div>

          {/* Title */}
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(28px,5vw,52px)", fontWeight:300, lineHeight:1.12, color:"#fff", marginBottom:18 }}>
            {post.emoji} {post.title}
          </h1>

          {/* Author line */}
          <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:40, paddingBottom:28, borderBottom:`1px solid ${T.border}` }}>
            <div style={{ width:36, height:36, borderRadius:"50%", background:`linear-gradient(135deg,${T.gold},#9A7830)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>👤</div>
            <div>
              <div style={{ fontSize:13, fontWeight:600, color:"#fff" }}>Salman Ali</div>
              <div style={{ fontSize:11, color:T.sub }}>📅 {post.date} · ⏱ {post.mins} min read · 👁 {post.reads} reads</div>
            </div>
            <a href={`https://wa.me/971544735060?text=Hi Salman, I read your article about ${post.title} on ARCHAI`}
              target="_blank" rel="noopener noreferrer"
              style={{ marginLeft:"auto", padding:"7px 14px", background:"rgba(37,211,102,0.12)", border:"1px solid rgba(37,211,102,0.25)", borderRadius:20, color:"#25D366", fontSize:11, fontWeight:700, textDecoration:"none" }}>
              💬 Ask Salman
            </a>
          </div>

          {/* Body */}
          <div style={{ lineHeight:1.85 }}>
            {formatContent(post.content || post.desc || "")}
          </div>

          {/* CTA */}
          <div style={{ marginTop:48, background:"rgba(200,169,110,0.06)", border:`1px solid ${T.border}`, borderRadius:16, padding:"24px 28px", textAlign:"center" }}>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:26, fontWeight:300, color:"#fff", marginBottom:8 }}>Ready to design your villa?</div>
            <p style={{ fontSize:13, color:T.sub, marginBottom:18 }}>Free for everyone. No signup. 9 styles, AI photo prompt included.</p>
            <Link href="/archai" style={{ display:"inline-block", padding:"12px 32px", background:`linear-gradient(135deg,${T.gold},#9A7830)`, borderRadius:24, color:"#000", fontSize:14, fontWeight:700, textDecoration:"none" }}>
              🏠 Start Designing Free →
            </Link>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ maxWidth:900, margin:"0 auto", padding:"0 28px 60px" }}>
            <div style={{ height:1, background:`linear-gradient(to right, transparent, ${T.border}, transparent)`, marginBottom:36 }}/>
            <div style={{ fontSize:14, fontWeight:700, marginBottom:18, color:"#fff" }}>More Articles</div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:14 }}>
              {related.map(([s, p]) => (
                <Link key={s} href={`/archai/blog/${s}`}
                  style={{ textDecoration:"none", background:"rgba(255,255,255,0.04)", border:`1px solid ${T.border}`, borderRadius:13, padding:"18px 18px", display:"block" }}>
                  <div style={{ fontSize:26, marginBottom:8 }}>{p.emoji}</div>
                  <div style={{ fontSize:13, fontWeight:700, color:"#fff", marginBottom:5, lineHeight:1.3 }}>{p.title}</div>
                  <div style={{ fontSize:11, color:T.sub }}>{p.tag} · ⏱ {p.mins} min · 👁 {p.reads}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
