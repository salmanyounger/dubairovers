'use client';
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import TourCard from '../../components/TourCard';
import { TOURS as STATIC_TOURS, TOUR_CATEGORIES, BLOG_POSTS as STATIC_BLOGS, TESTIMONIALS, STATS, WORLD_DESTINATIONS, ATTRACTIONS } from '../../data/tours';
import { WORLD_COUNTRIES } from '../../data/worldwide-tours-index';
import { useData } from '../../context/DataContext';

/* ── Search Bar ─────────────────────────────────────────────── */
function HeroSearch() {
  const [tab, setTab]     = useState('tours');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [show, setShow]   = useState(false);
  const ref = useRef(null);

  const handleSearch = (q) => {
    setQuery(q);
    if (!q.trim()) { setResults([]); setShow(false); return; }
    const r = TOURS.filter(t =>
      t.name.toLowerCase().includes(q.toLowerCase()) ||
      t.category.toLowerCase().includes(q.toLowerCase())
    ).slice(0, 5);
    setResults(r);
    setShow(true);
  };

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setShow(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const tabs = [
    { id: 'tours',       label: '🗺️ Tours',      placeholder: 'Search tours, activities...' },
    { id: 'attractions', label: '🏛️ Attractions', placeholder: 'Search attractions...' },
    { id: 'flights',     label: '✈️ Flights',     placeholder: 'Where do you want to fly?' },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto" ref={ref}>
      {/* Tabs */}
      <div className="flex gap-1 mb-3">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-bold transition-all ${
              tab === t.id ? 'text-brand-navy' : 'text-white/80 hover:text-white'
            }`}
            style={tab === t.id ? { background: 'linear-gradient(135deg,#D4AF37,#F0D060)' } : { background: 'rgba(255,255,255,0.15)' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Search box */}
      <div className="relative">
        <div className="flex gap-0 rounded-2xl overflow-hidden shadow-2xl"
          style={{ background: '#fff', boxShadow: '0 20px 60px rgba(10,22,40,0.4)' }}>

          {/* Destination/query */}
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</div>
            <input
              type="text"
              value={query}
              onChange={e => handleSearch(e.target.value)}
              placeholder={tabs.find(t=>t.id===tab)?.placeholder}
              className="w-full pl-11 pr-4 py-5 text-brand-navy font-semibold text-sm outline-none bg-transparent"
            />
          </div>

          {/* Date */}
          <div className="hidden sm:flex flex-col justify-center px-4 border-l border-gray-100">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Date</label>
            <input type="date" min={new Date().toISOString().split('T')[0]}
              className="text-sm font-semibold text-brand-navy outline-none bg-transparent cursor-pointer"
              style={{ width: '130px' }} />
          </div>

          {/* Guests */}
          <div className="hidden md:flex flex-col justify-center px-4 border-l border-gray-100">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wide">Guests</label>
            <select className="text-sm font-semibold text-brand-navy outline-none bg-transparent cursor-pointer">
              {[1,2,3,4,5,6,7,'8+'].map(n => <option key={n}>{n} Guest{n!==1?'s':''}</option>)}
            </select>
          </div>

          {/* Search button */}
          <Link href={`/${tab}${query ? `?q=${encodeURIComponent(query)}` : ''}`}
            className="flex items-center gap-2 px-6 py-5 font-bold text-brand-navy text-sm shrink-0"
            style={{ background: 'linear-gradient(135deg,#D4AF37,#F0D060)' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <span className="hidden sm:inline">Search</span>
          </Link>
        </div>

        {/* Autocomplete */}
        {show && results.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden z-50"
            style={{ background: '#fff', boxShadow: '0 20px 60px rgba(10,22,40,0.2)', border: '1px solid rgba(212,175,55,0.2)' }}>
            {results.map(r => (
              <Link key={r.id} href={`/tours/${r.category}/${r.slug}`}
                className="flex items-center gap-3 px-5 py-3 hover:bg-amber-50 transition-colors border-b border-gray-50 last:border-0">
                <span className="text-brand-gold">🗺️</span>
                <div>
                  <div className="font-semibold text-brand-navy text-sm">{r.name}</div>
                  <div className="text-xs text-gray-400">From AED {r.pricing?.adult} · {r.duration}</div>
                </div>
                <span className="ml-auto badge-gold text-xs">{r.tag || '⭐'}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Popular searches */}
      <div className="flex items-center gap-2 mt-3 flex-wrap">
        <span className="text-white/60 text-xs font-medium">🔥 Popular:</span>
        {['Desert Safari', 'Burj Khalifa', 'Abu Dhabi Tour', 'Dhow Cruise', 'Helicopter Tour'].map(s => (
          <Link key={s} href={`/tours?q=${encodeURIComponent(s)}`}
            className="text-xs font-semibold text-white/80 hover:text-brand-gold transition-colors px-2 py-1 rounded-full"
            style={{ background: 'rgba(255,255,255,0.1)' }}>
            {s}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ── Stats Counter ──────────────────────────────────────────── */
function StatCard({ stat }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const target = stat.value;
        const step = target / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 20);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [stat.value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl mb-2">{stat.emoji}</div>
      <div className="text-3xl md:text-4xl font-black text-brand-gold" suppressHydrationWarning>
        {stat.suffix === '★' ? stat.value : count.toLocaleString('en-US')}{stat.suffix}
      </div>
      <div className="text-white/70 text-sm font-medium mt-1">{stat.label}</div>
    </div>
  );
}

/* ── Main Homepage ──────────────────────────────────────────── */

/* ── Worldwide Destinations Section ────────────────────────── */
const REGIONS = ['All', 'Middle East', 'Europe', 'Asia', 'Africa', 'Americas', 'Oceania'];

function WorldwideSection() {
  const [activeRegion, setActiveRegion] = useState('All');
  const filtered = activeRegion === 'All'
    ? WORLD_COUNTRIES
    : WORLD_COUNTRIES.filter(c => c.region === activeRegion);
  const visible = filtered.slice(0, 16);

  return (
    <div>
      {/* Region filter pills */}
      <div className="flex gap-2 flex-wrap mb-6 overflow-x-auto pb-1">
        {REGIONS.map(r => (
          <button key={r} onClick={() => setActiveRegion(r)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border-2 ${
              activeRegion === r
                ? 'border-brand-gold text-brand-navy'
                : 'border-gray-200 text-gray-500 hover:border-amber-300'
            }`}
            style={activeRegion === r ? { background: 'linear-gradient(135deg,#D4AF37,#F0D060)' } : {}}>
            {r === 'Middle East' ? '🌙' : r === 'Europe' ? '🏰' : r === 'Asia' ? '🏯' : r === 'Africa' ? '🦁' : r === 'Americas' ? '🗽' : r === 'Oceania' ? '🦘' : '🌍'} {r}
          </button>
        ))}
      </div>

      {/* Country grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {visible.map(country => (
          <Link key={country.id} href={`/tours/worldwide/${country.id}`}
            className="group relative overflow-hidden rounded-2xl cursor-pointer"
            style={{ aspectRatio: '3/4' }}>
            <Image
              src={`https://images.unsplash.com/photo-${country.img}?w=300&q=75`}
              alt={`${country.name} tours from Dubai`}
              fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,transparent 35%,rgba(10,22,40,0.92) 100%)' }} />
            <div className="absolute bottom-0 left-0 right-0 p-2.5">
              <div className="text-xl mb-0.5">{country.flag}</div>
              <div className="text-white font-bold text-xs leading-tight">{country.name}</div>
              <div className="text-brand-gold text-[10px] font-bold mt-0.5">From AED {country.fromAED}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Show more */}
      <div className="text-center mt-6">
        <p className="text-sm text-gray-500 mb-3">Showing {visible.length} of {filtered.length} countries</p>
        <Link href="/tours/worldwide"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
          🌍 See All {filtered.length} Countries & 1,000+ Tours →
        </Link>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { tours, blogs } = useData();
  const TOURS = tours;
  const BLOG_POSTS = blogs;
  const featuredTours = TOURS.filter(t => t.featured).slice(0, 6);
  const trendingTours = TOURS.filter(t => t.trending).slice(0, 4);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=1920&q=85"
            alt="Dubai Desert Safari aerial view — DubaiRovers"
            fill className="object-cover" priority sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(10,22,40,0.65) 0%, rgba(10,22,40,0.3) 45%, rgba(10,22,40,0.85) 100%)' }} />
        </div>

        {/* Floating badge */}
        <div className="absolute top-28 right-6 md:right-16 z-10 animate-float hidden sm:block">
          <div className="rounded-2xl px-4 py-3 text-sm font-bold"
            style={{ background: 'rgba(255,255,255,0.12)', backdropFilter:'blur(12px)', border:'1px solid rgba(212,175,55,0.3)', color:'#fff' }}>
            ⭐ 4.9/5 from 50,000+ guests
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 container-main text-center py-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{ background:'rgba(212,175,55,0.15)', border:'1px solid rgba(212,175,55,0.4)' }}>
            <span className="text-brand-gold text-sm font-bold">🇦🇪 Dubai's #1 Tour Operator</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-tight"
            style={{ fontFamily:"'Playfair Display',serif", textShadow:'0 4px 24px rgba(0,0,0,0.3)' }}>
            Discover the{' '}
            <span style={{ color:'#D4AF37' }}>Magic</span>
            <br />of Dubai & Beyond
          </h1>
          <p className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium">
            🏜️ Desert safaris · 🏙️ City tours · 🚤 Cruises · ✈️ Worldwide packages
            <br />
            <span style={{ color:'rgba(212,175,55,0.9)' }}>Free hotel pickup · Instant confirmation · Best price guarantee</span>
          </p>

          {/* Search */}
          <HeroSearch />

          {/* Trust icons */}
          <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
            {['🔒 Secure Booking', '✅ Free Cancellation', '⚡ Instant Confirm', '🏨 Hotel Pickup'].map(b => (
              <span key={b} className="text-white/70 text-xs font-semibold flex items-center gap-1">{b}</span>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/50 text-xs">Scroll to explore</span>
          <div className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center pt-1">
            <div className="w-1 h-2 rounded-full bg-white/60" />
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <section className="py-12" style={{ background:'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
        <div className="container-main grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => <StatCard key={i} stat={s} />)}
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────── */}
      <section className="section-pad bg-brand-cream">
        <div className="container-main">
          <div className="text-center mb-12">
            <span className="badge-gold mb-3">🗺️ Explore by Category</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mt-3" style={{ fontFamily:"'Playfair Display',serif" }}>
              What Would You Like to Do?
            </h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto">
              From heart-pumping desert adventures to tranquil cultural experiences — we have the perfect tour for every traveller.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {TOUR_CATEGORIES.map(cat => (
              <Link key={cat.id} href={`/tours/${cat.slug}`}
                className="group relative overflow-hidden rounded-2xl aspect-square cursor-pointer">
                <Image src={cat.image} alt={cat.name} fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" />
                <div className="absolute inset-0" style={{ background:'linear-gradient(180deg,transparent 30%,rgba(10,22,40,0.85) 100%)' }} />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-2xl mb-1">{cat.emoji}</div>
                  <h3 className="text-white font-bold text-sm leading-tight">{cat.name}</h3>
                  <p className="text-white/60 text-xs mt-0.5">{cat.tourCount} tours</p>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="badge-gold text-xs">Explore →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED TOURS ───────────────────────────────── */}
      <section className="section-pad bg-white">
        <div className="container-main">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="badge-gold mb-3">⭐ Top Experiences</span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mt-3" style={{ fontFamily:"'Playfair Display',serif" }}>
                Most Popular Tours
              </h2>
              <p className="text-gray-600 mt-2">Loved by 50,000+ travellers from around the world</p>
            </div>
            <Link href="/tours" className="btn-outline text-sm">View All Tours →</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTours.map(tour => <TourCard key={tour.id} tour={tour} />)}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────── */}
      <section className="section-pad" style={{ background:'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
        <div className="container-main">
          <div className="text-center mb-12">
            <span className="badge-gold mb-3">🏆 Why DubaiRovers</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-3" style={{ fontFamily:"'Playfair Display',serif" }}>
              The DubaiRovers Difference
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji:'⚡', title:'Instant Confirmation', desc:'Get your booking confirmed in seconds, 24/7.' },
              { emoji:'🏨', title:'Free Hotel Pickup',   desc:'Door-to-door service from your Dubai hotel.' },
              { emoji:'💰', title:'Best Price Guarantee', desc:'Find a lower price? We\'ll match it — guaranteed.' },
              { emoji:'🔄', title:'Free Cancellation',   desc:'Change of plans? Cancel free up to 24hrs before.' },
              { emoji:'🌍', title:'Multilingual Guides', desc:'Guides in English, Arabic, Russian & more.' },
              { emoji:'⭐', title:'5-Star Service',      desc:'4.9/5 average rating across 50,000+ reviews.' },
              { emoji:'🔒', title:'Secure & Safe',       desc:'SSL-secured booking with trusted payment options.' },
              { emoji:'📱', title:'WhatsApp Support',    desc:'Chat with our team instantly, 7 days a week.' },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl p-6 text-center transition-transform hover:-translate-y-1"
                style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(212,175,55,0.15)' }}>
                <div className="text-4xl mb-3">{item.emoji}</div>
                <h3 className="text-white font-bold mb-2" style={{ fontFamily:"'Playfair Display',serif" }}>{item.title}</h3>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section className="section-pad bg-brand-cream">
        <div className="container-main">
          <div className="text-center mb-12">
            <span className="badge-gold mb-3">📋 How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mt-3" style={{ fontFamily:"'Playfair Display',serif" }}>
              Book in 3 Simple Steps
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-0.5"
              style={{ background:'linear-gradient(90deg,#D4AF37,#F0D060)' }} />
            {[
              { step:1, emoji:'🔍', title:'Choose Your Tour', desc:'Browse 150+ tours, read reviews, compare prices and find your perfect Dubai experience.' },
              { step:2, emoji:'📋', title:'Fill Booking Form', desc:'Complete our simple 4-step booking wizard with your dates, group size and add-ons.' },
              { step:3, emoji:'✅', title:'Confirm & Enjoy!', desc:'Receive instant WhatsApp confirmation. Relax — we handle everything from pickup to drop-off.' },
            ].map(item => (
              <div key={item.step} className="text-center relative">
                <div className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center relative"
                  style={{ background:'linear-gradient(135deg,#D4AF37,#F0D060)', boxShadow:'0 8px 32px rgba(212,175,55,0.3)' }}>
                  <span className="text-3xl">{item.emoji}</span>
                  <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black bg-brand-navy text-brand-gold border-2 border-white">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-2" style={{ fontFamily:"'Playfair Display',serif" }}>{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORLDWIDE DESTINATIONS ───────────────────────── */}
      <section className="section-pad" style={{ background:'linear-gradient(180deg,#fff 0%,#f8f6f0 100%)' }}>
        <div className="container-main">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <div>
              <span className="badge-gold mb-3">🌍 50 Countries</span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mt-3" style={{ fontFamily:"'Playfair Display',serif" }}>
                Tours Worldwide from Dubai
              </h2>
              <p className="text-gray-500 mt-2">1,000+ tours across 50 countries — all bookable from Dubai</p>
            </div>
            <Link href="/tours/worldwide" className="btn-gold text-sm">Explore All 50 Countries →</Link>
          </div>

          {/* Region tabs */}
          <WorldwideSection />
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────── */}
      <section className="section-pad bg-brand-cream">
        <div className="container-main">
          <div className="text-center mb-12">
            <span className="badge-gold mb-3">💬 Traveller Reviews</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mt-3" style={{ fontFamily:"'Playfair Display',serif" }}>
              What Our Guests Say
            </h2>
            <div className="flex items-center justify-center gap-2 mt-3">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <span key={i} className="text-amber-400 text-xl">★</span>)}
              </div>
              <span className="font-bold text-brand-navy">4.9/5</span>
              <span className="text-gray-500 text-sm">from 18,500+ reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="rounded-2xl p-6"
                style={{ background:'#fff', boxShadow:'0 4px 24px rgba(10,22,40,0.07)', border:'1px solid rgba(212,175,55,0.1)' }}>
                <div className="flex gap-0.5 mb-4">
                  {[1,2,3,4,5].map(i => <span key={i} className="text-amber-400 text-sm">★</span>)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5 line-clamp-3">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <Image src={t.avatar} alt={t.name} width={44} height={44}
                    className="rounded-full object-cover border-2 border-brand-gold" />
                  <div>
                    <div className="font-bold text-brand-navy text-sm">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.country} · {t.tour}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ATTRACTIONS PREVIEW ──────────────────────────── */}
      <section className="section-pad bg-white">
        <div className="container-main">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="badge-gold mb-3">🏛️ Top Attractions</span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mt-3" style={{ fontFamily:"'Playfair Display',serif" }}>
                Dubai's Iconic Attractions
              </h2>
            </div>
            <Link href="/attractions" className="btn-outline text-sm">View All →</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {ATTRACTIONS.map(a => (
              <Link key={a.id} href={`/attractions/${a.slug}`}
                className="group relative overflow-hidden rounded-2xl cursor-pointer"
                style={{ height:'280px' }}>
                <Image src={a.image} alt={a.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" />
                <div className="absolute inset-0" style={{ background:'linear-gradient(180deg,transparent 30%,rgba(10,22,40,0.9) 100%)' }} />
                <div className="absolute top-3 left-3">
                  <span className="badge-gold text-xs">{a.tag}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-white font-bold mb-1" style={{ fontFamily:"'Playfair Display',serif" }}>{a.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <span className="text-amber-400 text-xs">★</span>
                      <span className="text-white text-xs font-bold">{a.rating}</span>
                      <span className="text-white/50 text-xs">({(a.reviewCount/1000).toFixed(1)}k)</span>
                    </div>
                    <span className="text-brand-gold text-xs font-bold">From AED {a.pricing.adult}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG PREVIEW ─────────────────────────────────── */}
      <section className="section-pad bg-brand-cream">
        <div className="container-main">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <span className="badge-gold mb-3">📰 Travel Blog</span>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mt-3" style={{ fontFamily:"'Playfair Display',serif" }}>
                Dubai Travel Tips & Guides
              </h2>
            </div>
            <Link href="/blog" className="btn-outline text-sm">All Articles →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="blog-card">
                <div className="relative h-48 overflow-hidden">
                  <Image src={post.image} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" />
                  <div className="absolute top-3 left-3">
                    <span className="badge-navy text-xs">{post.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-brand-navy mb-2 line-clamp-2 group-hover:text-brand-gold transition-colors"
                    style={{ fontFamily:"'Playfair Display',serif", fontSize:'15px' }}>
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-xs line-clamp-2 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>📖 {post.readTime}</span>
                    <span suppressHydrationWarning>👁️ {post.views.toLocaleString('en-US')} views</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden"
        style={{ background:'linear-gradient(135deg,#0A1628 0%,#1E3A5F 50%,#0A1628 100%)' }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage:'radial-gradient(circle at 20% 50%, #D4AF37 0%, transparent 50%), radial-gradient(circle at 80% 50%, #D4AF37 0%, transparent 50%)' }} />
        <div className="container-main text-center relative z-10">
          <div className="text-5xl mb-4">🌟</div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>
            Ready for Your{' '}
            <span style={{ color:'#D4AF37' }}>Dream Adventure?</span>
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Join 50,000+ happy travellers who've explored Dubai & the world with us. Let's plan your perfect trip!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/tours" className="btn-gold text-base px-8 py-4">🗺️ Explore All Tours</Link>
            <a href="https://wa.me/971544735060?text=Hello! I want to plan a trip to Dubai."
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base"
              style={{ background:'#25D366', color:'#fff', boxShadow:'0 4px 20px rgba(37,211,102,0.4)' }}>
              💬 Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
