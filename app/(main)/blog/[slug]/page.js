// This is a CLIENT component so it can read from localStorage (admin-published blogs)
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import FAQSection from '../../../../components/FAQSection';
import { ALL_BLOGS, AUTO_LINK_MAP } from '../../../../data/blog_database';
import { TOURS } from '../../../../data/tours';

function applyLinks(content, tours) {
  if (!content) return content;
  let out = content;
  AUTO_LINK_MAP.forEach(({ keywords, tourSlug, label }) => {
    const tour = tours.find(t => t.slug === tourSlug);
    if (!tour) return;
    keywords.forEach(kw => {
      const re = new RegExp(`(?<!href=["'][^"']*)(\\b${kw}\\b)(?![^<]*<\/a>)`, 'gi');
      out = out.replace(re, `<a href="/tours/${tour.category}/${tour.slug}" class="text-brand-gold font-semibold hover:underline transition-colors" title="${label}">$1</a>`);
    });
  });
  return out;
}

function renderContent(content) {
  if (!content) return null;
  return content.split('\n\n').map((block, i) => {
    if (block.startsWith('## '))
      return <h2 key={i} className="text-2xl font-black text-brand-navy mt-10 mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>{block.replace('## ','')}</h2>;
    if (block.startsWith('### '))
      return <h3 key={i} className="text-lg font-bold text-brand-navy mt-7 mb-3">{block.replace('### ','')}</h3>;
    if (block.startsWith('- ')) {
      const items = block.split('\n').filter(l => l.startsWith('- '));
      return (
        <ul key={i} className="space-y-2 mb-6 ml-4">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-gray-700 leading-relaxed">
              <span className="text-brand-gold mt-1.5 shrink-0 text-xs">▸</span>
              <span dangerouslySetInnerHTML={{ __html: item.slice(2).replace(/\*\*(.+?)\*\*/g,'<strong class="text-brand-navy">$1</strong>') }} />
            </li>
          ))}
        </ul>
      );
    }
    if (block.startsWith('> '))
      return (
        <blockquote key={i} className="border-l-4 border-brand-gold pl-5 py-2 my-6 italic text-gray-600 bg-amber-50 rounded-r-xl">
          {block.slice(2)}
        </blockquote>
      );
    if (block.trim())
      return (
        <p key={i} className="text-gray-700 text-base leading-8 mb-5"
          dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.+?)\*\*/g,'<strong class="text-brand-navy font-bold">$1</strong>') }} />
      );
    return null;
  });
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost]       = useState(null);
  const [related, setRelated] = useState([]);
  const [tours,   setTours]   = useState(TOURS);
  const [loaded,  setLoaded]  = useState(false);

  useEffect(() => {
    // 1. Try localStorage first (admin-published blogs)
    let allBlogs = [...ALL_BLOGS];
    try {
      const stored = localStorage.getItem('dr_admin_blog_posts');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) allBlogs = parsed;
      }
      const storedTours = localStorage.getItem('dr_admin_tours');
      if (storedTours) {
        const parsed = JSON.parse(storedTours);
        if (Array.isArray(parsed) && parsed.length > 0) setTours(parsed);
      }
    } catch {}

    const found = allBlogs.find(b => b.slug === slug);
    if (found) {
      setPost(found);
      setRelated(allBlogs.filter(b => b.id !== found.id && (b.category === found.category || b.featured) && (b.status === 'published' || b.publishedAt)).slice(0, 3));
      // Increment view count
      try {
        const updated = allBlogs.map(b => b.slug === slug ? { ...b, views: (b.views || 0) + 1 } : b);
        localStorage.setItem('dr_admin_blog_posts', JSON.stringify(updated));
      } catch {}
    }
    setLoaded(true);
  }, [slug]);

  if (!loaded) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-4 border-brand-gold border-t-transparent animate-spin mx-auto mb-3" />
        <p className="text-gray-400">Loading article...</p>
      </div>
    </div>
  );

  if (!post) return (
    <div className="min-h-screen flex items-center justify-center text-center p-8">
      <div>
        <div className="text-6xl mb-4">📰</div>
        <h2 className="text-2xl font-bold text-brand-navy mb-2" style={{ fontFamily:"'Playfair Display',serif" }}>Article Not Found</h2>
        <p className="text-gray-500 mb-5">This article may not be published yet or the link has changed.</p>
        <Link href="/blog" className="btn-gold">← Back to Blog</Link>
      </div>
    </div>
  );

  // Generate rich content if post has no stored content
  const defaultContent = `## Introduction

${post.excerpt || `Dubai is one of the most extraordinary destinations on the planet — a city where ancient traditions meet cutting-edge innovation at every corner. Whether you're planning your first trip or returning for the tenth time, there's always something new to discover.`}

## What You Need to Know

When it comes to ${post.title.toLowerCase().replace(/[^a-z0-9\s]/g, '')}, experienced travellers all say the same thing: preparation makes the difference between a good trip and an unforgettable one.

**The key things to keep in mind:**

- **Book in advance** — especially during peak season (October to April), popular experiences sell out weeks ahead
- **Free hotel pickup is included** — DubaiRovers picks you up directly from your hotel lobby across Dubai and JBR
- **Instant confirmation** — no waiting, your booking is confirmed immediately with a WhatsApp message
- **Best price guarantee** — if you find the same tour cheaper, we match it

## The Best Time to Go

Dubai's weather plays a huge role in your experience. The ideal months are **October through April**, when temperatures hover between 20–28°C — perfect for outdoor activities. The summer months (May–September) are intense, with temperatures exceeding 40°C, but you'll find hotel rates drop dramatically and attractions are far less crowded.

> **Pro tip from our guides:** Thursday evening and Friday morning have the best light for photography across Dubai. The city looks magical in that golden-hour glow.

## What to Expect

Our guests consistently tell us the experience exceeded their expectations. From the moment we pick you up at your hotel to the moment we drop you back, every detail is taken care of.

Here's what makes the difference:

- **Expert local guides** who have been leading tours in Dubai for years
- **Small group sizes** — never more than the advertised maximum, so you get personal attention
- **All equipment provided** — you don't need to bring anything except your enthusiasm
- **Multi-language support** — available in English, Arabic, Russian and Chinese

## Practical Information

Before you go, make sure you have the following:

- Comfortable, loose-fitting clothes (modest dress recommended near mosques and cultural sites)
- Sunscreen with SPF 50+ — the desert sun is intense even in winter
- A valid passport or Emirates ID for entry to some attractions
- Your hotel name and room number ready for pickup

Payment is simple — we accept cash (AED, USD, EUR), card, and even bank transfer. No hidden fees, no surprises.

## Book Your Experience Today

Ready to make memories that last a lifetime? Browse our full selection of [Dubai tours and experiences](/tours) or contact our team directly on WhatsApp for a personalised recommendation based on your group size, budget and interests.

Our team responds within 30 minutes — day or night.`;

  const postContent = post.content || defaultContent;
  const linkedContent = applyLinks(postContent, tours);

  // JSON-LD Schema
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt || post.seoDesc,
    "image": post.image,
    "author": {
      "@type": "Organization",
      "name": "DubaiRovers",
      "url": "https://dubairovers.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "DubaiRovers",
      "logo": { "@type": "ImageObject", "url": "https://dubairovers.com/logo.png" }
    },
    "datePublished": post.publishedAt || post.publishAt?.split('T')[0],
    "dateModified":  post.publishedAt || post.publishAt?.split('T')[0],
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://dubairovers.com/blog/${post.slug}` },
    "keywords": (post.tags || []).join(', '),
    "articleSection": post.category?.replace(/-/g,' '),
    "wordCount": postContent.split(' ').length,
  };

  const featuredTours = tours.filter(t => t.featured).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section className="relative py-28 text-white overflow-hidden">
        <Image src={post.image || 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1200'} alt={post.title} fill className="object-cover" priority />
        <div className="absolute inset-0" style={{ background:'linear-gradient(180deg,rgba(10,22,40,0.55) 0%,rgba(10,22,40,0.92) 100%)' }} />
        <div className="container-main relative z-10 max-w-4xl">
          <div className="flex gap-2 mb-5 flex-wrap">
            <span className="badge-gold">{post.category?.replace(/-/g,' ')}</span>
            {post.featured && <span className="badge-navy">⭐ Featured</span>}
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-5 leading-tight"
            style={{ fontFamily:"'Playfair Display',serif", textShadow:'0 2px 12px rgba(0,0,0,0.3)' }}>
            {post.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-white/75 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-brand-gold flex items-center justify-center">
                <span className="text-brand-navy font-black text-xs">DR</span>
              </div>
              <span className="font-semibold">{post.author?.name || 'DubaiRovers Team'}</span>
            </div>
            {(post.publishedAt || post.publishAt) && (
              <><span className="opacity-40">·</span>
              <span>📅 {new Date(post.publishedAt || post.publishAt).toLocaleDateString('en-AE',{year:'numeric',month:'long',day:'numeric'})}</span></>
            )}
            <span className="opacity-40">·</span>
            <span>📖 {post.readTime}</span>
            {post.views > 0 && <><span className="opacity-40">·</span><span suppressHydrationWarning>👁️ {post.views.toLocaleString('en-US')} views</span></>}
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-brand-cream border-b border-gray-100">
        <div className="container-main py-3 text-xs text-gray-500 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-brand-gold">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-brand-gold">Blog</Link>
          <span>/</span>
          <span className="text-brand-navy font-semibold truncate max-w-xs">{post.title.slice(0,50)}{post.title.length>50?'…':''}</span>
        </div>
      </div>

      <div className="container-main py-12 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Article */}
          <article className="flex-1 min-w-0">
            {/* Excerpt highlight */}
            {post.excerpt && (
              <div className="rounded-2xl p-5 mb-8 border-l-4 border-brand-gold" style={{ background:'rgba(212,175,55,0.06)' }}>
                <p className="text-gray-700 text-lg leading-relaxed font-medium italic">{post.excerpt}</p>
              </div>
            )}

            {/* Content */}
            <div className="blog-content">
              {linkedContent === postContent
                ? renderContent(postContent)
                : <div dangerouslySetInnerHTML={{ __html: linkedContent.replace(/\n\n/g,'</p><p class="text-gray-700 text-base leading-8 mb-5">').replace(/^/,'<p class="text-gray-700 text-base leading-8 mb-5">').replace(/$/, '</p>').replace(/## (.+)/g, '</p><h2 class="text-2xl font-black text-brand-navy mt-10 mb-4" style="font-family: Playfair Display,serif">$1</h2><p class="text-gray-700 text-base leading-8 mb-5">') }} />
              }
            </div>

            {/* Related tours inline box */}
            <div className="mt-10 rounded-3xl overflow-hidden" style={{ border:'2px solid rgba(212,175,55,0.3)', background:'rgba(212,175,55,0.03)' }}>
              <div className="px-6 py-4 flex items-center gap-2" style={{ background:'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
                <span className="text-xl">🗺️</span>
                <h3 className="text-white font-bold" style={{ fontFamily:"'Playfair Display',serif" }}>Book a Related Tour</h3>
                <span className="text-white/40 text-xs ml-auto">Free hotel pickup included</span>
              </div>
              <div className="p-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {featuredTours.map(tour => (
                  <Link key={tour.id} href={`/tours/${tour.category}/${tour.slug}`}
                    className="flex flex-col gap-1.5 p-3 rounded-xl bg-white border border-gray-100 hover:border-brand-gold transition-all hover:-translate-y-0.5 group">
                    <div className="text-xs font-bold text-brand-navy group-hover:text-brand-gold transition-colors line-clamp-2">{tour.name}</div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>⏱️ {tour.duration}</span>
                      <span className="font-black text-brand-navy">AED {tour.pricing?.adult}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-100">
              <span className="text-sm font-bold text-gray-400">🏷️</span>
              {(post.tags || ['Dubai','Travel','UAE']).map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-100">
                  {tag}
                </span>
              ))}
            </div>

            {/* Share */}
            <div className="mt-5 p-4 rounded-2xl bg-brand-cream flex items-center gap-4 flex-wrap">
              <p className="font-bold text-brand-navy text-sm">📤 Found this helpful? Share it:</p>
              {[
                { label:'WhatsApp', href:`https://wa.me/?text=${encodeURIComponent(post.title + '\n\nhttps://dubairovers.com/blog/' + post.slug)}`, bg:'#25D366' },
                { label:'Facebook', href:`https://facebook.com/sharer/sharer.php?u=https://dubairovers.com/blog/${post.slug}`, bg:'#1877F2' },
                { label:'Twitter',  href:`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=https://dubairovers.com/blog/${post.slug}`, bg:'#1DA1F2' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full text-white text-xs font-bold hover:opacity-90 transition-opacity"
                  style={{ background: s.bg }}>
                  {s.label}
                </a>
              ))}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0 space-y-5">

            {/* Book CTA */}
            <div className="rounded-2xl overflow-hidden" style={{ background:'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
              <div className="p-6 text-center">
                <div className="text-3xl mb-2">🌟</div>
                <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily:"'Playfair Display',serif" }}>
                  Explore Dubai With Us
                </h3>
                <p className="text-white/60 text-xs mb-4">150+ tours · Free hotel pickup · Best price guarantee</p>
                <div className="space-y-2">
                  <Link href="/tours" className="btn-gold w-full justify-center text-sm block text-center py-3">
                    🗺️ Browse All Tours
                  </Link>
                  <a href="https://wa.me/971544735060?text=Hi! I read your blog and want to book a tour." target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-white text-xs font-bold"
                    style={{ background:'#25D366' }}>
                    💬 Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Trust signals */}
            <div className="rounded-2xl p-4 bg-white border border-gray-100">
              {[
                ['⭐','4.9/5 average rating'],
                ['✅','50,000+ happy guests'],
                ['🏨','Free hotel pickup included'],
                ['⚡','Instant confirmation'],
                ['🔄','Free cancellation 24h'],
              ].map(([emoji, text]) => (
                <div key={text} className="flex items-center gap-2.5 py-2 border-b border-gray-50 last:border-0 text-xs text-gray-600 font-medium">
                  <span>{emoji}</span><span>{text}</span>
                </div>
              ))}
            </div>

            {/* Related articles */}
            {related.length > 0 && (
              <div className="rounded-2xl p-5 border border-gray-100 bg-white">
                <h4 className="font-bold text-brand-navy mb-4 text-sm" style={{ fontFamily:"'Playfair Display',serif" }}>
                  📰 Related Articles
                </h4>
                {related.map(r => (
                  <Link key={r.id} href={`/blog/${r.slug}`}
                    className="flex gap-3 mb-4 last:mb-0 group">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                      <Image src={r.image || 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=200'} alt={r.title} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-brand-navy line-clamp-2 group-hover:text-brand-gold transition-colors">
                        {r.title}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-1">📖 {r.readTime}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>

      <FAQSection />
    </>
  );
}
