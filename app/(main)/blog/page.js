'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import FAQSection from '../../../components/FAQSection';
import { useData } from '../../../context/DataContext';

const NAV_CATEGORIES = ['All','UAE Destinations','Gulf Comparisons','Worldwide Travel','Weather & Seasons','Adventure','Safety Tips','Food & Culture','Family Travel','Luxury Travel','Budget Travel','Occasions & Events','Tour Guides'];

export default function BlogPage() {
  const { blogs: allBlogs } = useData();
  const [activeCategory, setActiveCategory] = useState('All');

  // Only show published blogs on visitor site
  const published = allBlogs.filter(b => b.status === 'published' || (!b.status && b.publishedAt));

  const filtered = activeCategory === 'All'
    ? published
    : published.filter(p => {
        const catLabel = p.category?.replace(/-/g,' ') || '';
        return catLabel.toLowerCase().includes(activeCategory.toLowerCase().split(' ')[0].toLowerCase());
      });

  const featured = filtered.filter(p => p.featured).slice(0, 2);
  const rest     = filtered.filter(p => !p.featured);

  return (
    <>
      {/* Hero */}
      <section className="py-20 text-white text-center" style={{ background:'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
        <div className="container-main">
          <span className="badge-gold mb-4 inline-block">📰 Travel Blog</span>
          <h1 className="text-4xl md:text-5xl font-black mt-3 mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>
            Dubai Travel Tips & Guides
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Expert advice, insider tips and travel inspiration from Dubai's most trusted tour operator.
          </p>
          <p className="text-white/40 text-sm mt-2">{published.length} articles published</p>
        </div>
      </section>

      <div className="container-main py-12">
        {/* Category nav */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-8" style={{ scrollbarWidth:'none' }}>
          {NAV_CATEGORIES.map(c => (
            <button key={c}
              onClick={() => setActiveCategory(c)}
              className={`category-chip shrink-0 text-xs px-4 py-2 rounded-full font-semibold border transition-all ${
                activeCategory === c
                  ? 'text-brand-navy border-transparent'
                  : 'text-gray-600 border-gray-200 hover:border-gray-300 bg-white'
              }`}
              style={activeCategory === c ? { background:'linear-gradient(135deg,#D4AF37,#F0D060)' } : {}}>
              {c}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📝</div>
            <p className="text-gray-500 font-semibold">No articles published in this category yet.</p>
            <p className="text-gray-400 text-sm mt-2">Check back soon — we publish daily at 9am Dubai time.</p>
          </div>
        ) : (
          <>
            {/* Featured */}
            {featured.length > 0 && (
              <div className="mb-10">
                <h2 className="text-lg font-bold text-brand-navy mb-5 flex items-center gap-2" style={{ fontFamily:"'Playfair Display',serif" }}>
                  ⭐ Featured Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featured.map(post => (
                    <Link key={post.id} href={`/blog/${post.slug}`}
                      className="rounded-2xl overflow-hidden group block"
                      style={{ boxShadow:'0 4px 20px rgba(10,22,40,0.1)', border:'1px solid #e2e8f0' }}>
                      <div className="relative h-56 overflow-hidden">
                        <Image src={post.image || 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800'} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" />
                        <div className="absolute inset-0" style={{ background:'linear-gradient(180deg,transparent 30%,rgba(10,22,40,0.9) 100%)' }} />
                        <div className="absolute top-4 left-4"><span className="badge-gold text-xs">{post.category?.replace(/-/g,' ')}</span></div>
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <h3 className="text-white font-bold text-lg mb-1 line-clamp-2" style={{ fontFamily:"'Playfair Display',serif" }}>{post.title}</h3>
                          <div className="flex gap-3 text-white/60 text-xs">
                            <span>📖 {post.readTime}</span>
                            <span suppressHydrationWarning>👁️ {(post.views||0).toLocaleString('en-US')} views</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* All posts grid */}
            <h2 className="text-lg font-bold text-brand-navy mb-5" style={{ fontFamily:"'Playfair Display',serif" }}>
              📚 {activeCategory === 'All' ? 'All Articles' : activeCategory} ({filtered.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(post => (
                <Link key={post.id} href={`/blog/${post.slug}`}
                  className="rounded-2xl overflow-hidden group block bg-white transition-all hover:-translate-y-1"
                  style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>
                  <div className="relative h-44 overflow-hidden">
                    <Image src={post.image || 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800'} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-brand-navy/80 text-white backdrop-blur-sm">
                        {post.category?.replace(/-/g,' ')}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-brand-navy mb-2 line-clamp-2 group-hover:text-brand-gold transition-colors"
                      style={{ fontFamily:"'Playfair Display',serif", fontSize:'15px' }}>
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-xs line-clamp-2 mb-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-50">
                      <span>📖 {post.readTime}</span>
                      <span>{post.publishedAt || '2025'}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* CTA */}
        <div className="mt-16 rounded-3xl p-8 text-center" style={{ background:'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
          <div className="text-4xl mb-3">🗺️</div>
          <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily:"'Playfair Display',serif" }}>
            Ready to Explore Dubai?
          </h3>
          <p className="text-white/70 mb-5">Book any tour from this article with free hotel pickup included.</p>
          <Link href="/tours" className="btn-gold">Browse All Tours →</Link>
        </div>
      </div>

      <FAQSection />
    </>
  );
}
