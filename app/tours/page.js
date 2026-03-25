"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllTours, packagesData } from "../data/tours";

// Hero background images slideshow
const HERO_SLIDES = [
  "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1800&q=80",
  "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1800&q=80",
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1800&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1800&q=80",
  "https://images.unsplash.com/photo-1547234935-80c7145ec969?w=1800&q=80",
  "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1800&q=80",
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [heroSlide, setHeroSlide] = useState(0);
  const [pageVis, setPageVis] = useState({ attractions:true, flights:true, booking:true, contact:true, about:true });
  const tours = getAllTours();
  const categories = ["All", ...new Set(tours.map(t => t.category))];
  const filtered = tours.filter(t => {
    const ms = search === "" || t.title.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase());
    const mf = activeFilter === "All" || t.category === activeFilter;
    return ms && mf;
  });

  // Hero slideshow — change every 3.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroSlide(s => (s + 1) % HERO_SLIDES.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Page visibility — reads admin toggle from localStorage
  useEffect(() => {
    const load = () => {
      try {
        const pv = JSON.parse(localStorage.getItem("dr_page_visibility") || "{}");
        setPageVis(p => ({ ...p, ...pv }));
      } catch {}
    };
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{paddingBottom:"env(safe-area-inset-bottom,0px)"}}>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
        @keyframes spin-slow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes bounce-gentle { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-6px) scale(1.1)} }
        @keyframes pulse-glow { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.8;transform:scale(1.15)} }
        @keyframes swing { 0%,100%{transform:rotate(-10deg)} 50%{transform:rotate(10deg)} }
        @keyframes wiggle { 0%,100%{transform:rotate(-5deg)} 50%{transform:rotate(5deg)} }
        @keyframes heartbeat { 0%,100%{transform:scale(1)} 14%{transform:scale(1.2)} 28%{transform:scale(1)} 42%{transform:scale(1.15)} 70%{transform:scale(1)} }
        @keyframes slide-right { 0%,100%{transform:translateX(0)} 50%{transform:translateX(5px)} }
        @keyframes tag-shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes hero-fade { 0%{opacity:0;transform:scale(1.05)} 15%{opacity:1;transform:scale(1)} 85%{opacity:1;transform:scale(1.03)} 100%{opacity:0;transform:scale(1.05)} }
        @keyframes card-pop { 0%{transform:scale(0.95);opacity:0} 100%{transform:scale(1);opacity:1} }
        @keyframes icon-orbit { 0%,100%{transform:translateY(0) rotate(0deg)} 25%{transform:translateY(-4px) rotate(5deg)} 75%{transform:translateY(4px) rotate(-5deg)} }
        @keyframes glow-pulse { 0%,100%{box-shadow:0 0 8px rgba(249,115,22,0.4)} 50%{box-shadow:0 0 20px rgba(249,115,22,0.8),0 0 40px rgba(249,115,22,0.3)} }
        .stat-icon { display:inline-block; }
        .stat-icon-1 { animation: bounce-gentle 2s ease-in-out infinite; }
        .stat-icon-2 { animation: spin-slow 4s linear infinite; }
        .stat-icon-3 { animation: float 2.5s ease-in-out infinite; }
        .stat-icon-4 { animation: pulse-glow 1.8s ease-in-out infinite; }
        .badge-icon { display:inline-block; animation: wiggle 2s ease-in-out infinite; }
        .why-icon-1 { display:inline-block; animation: heartbeat 2s ease-in-out infinite; }
        .why-icon-2 { display:inline-block; animation: bounce-gentle 2s ease-in-out infinite; animation-delay:0.2s; }
        .why-icon-3 { display:inline-block; animation: slide-right 1.5s ease-in-out infinite; }
        .why-icon-4 { display:inline-block; animation: swing 2.5s ease-in-out infinite; }
        .why-icon-5 { display:inline-block; animation: pulse-glow 1.5s ease-in-out infinite; }
        .why-icon-6 { display:inline-block; animation: icon-orbit 3s ease-in-out infinite; }
        .tag-pill { background: linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.05) 100%); background-size: 200% auto; animation: tag-shimmer 3s linear infinite; }
        .hero-img { position:absolute;inset:0;background-size:cover;background-position:center;animation:hero-fade 3.5s ease-in-out forwards; }
      `}</style>

      {/* HERO with animated slideshow */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Slideshow layers */}
        {HERO_SLIDES.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center transition-all"
            style={{
              backgroundImage: `url('${img}')`,
              opacity: heroSlide === i ? 1 : 0,
              transition: "opacity 1.2s ease-in-out",
              transform: heroSlide === i ? "scale(1.03)" : "scale(1)",
              transitionProperty: "opacity, transform",
              transitionDuration: "1.2s, 4s",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/60" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" style={{animation:"float 6s ease-in-out infinite"}} />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" style={{animation:"float 7s ease-in-out infinite reverse"}} />

        {/* Slide dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setHeroSlide(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: heroSlide === i ? "24px" : "8px",
                height: "8px",
                background: heroSlide === i ? "linear-gradient(to right,#f97316,#ec4899)" : "rgba(255,255,255,0.3)"
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2 text-sm mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full" style={{animation:"pulse-glow 1.5s ease-in-out infinite"}} />
            🌟 Dubai's #1 Rated Adventure Platform
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none">
            <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">Adventure</span>
            <br /><span className="text-white">Awaits in</span>
            <br /><span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Dubai</span>
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Desert safaris, hot air balloons, dhow cruises & more — with hotel pickup included</p>
          <div className="relative max-w-xl mx-auto mb-8">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl">🔍</span>
            <input type="text" placeholder="Search adventures..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/10 backdrop-blur border border-white/20 rounded-2xl pl-14 pr-6 py-4 text-white placeholder-gray-400 text-lg focus:outline-none focus:border-orange-400 transition-colors" />
          </div>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            {[
              {icon:"✅",label:"Free Cancellation"},
              {icon:"⭐",label:"4.9/5 Rating"},
              {icon:"🚗",label:"Hotel Pickup"},
              {icon:"💬",label:"24/7 WhatsApp"},
            ].map(b => (
              <span key={b.label} className="bg-white/10 backdrop-blur border border-white/10 rounded-full px-4 py-1.5 text-gray-200 flex items-center gap-1.5">
                <span className="badge-icon">{b.icon}</span>{b.label}
              </span>
            ))}
          </div>
        </div>

        {/* ── FLOATING QUICK-ACCESS CARDS (Attractions + Flights) ── */}
        {(pageVis.attractions || pageVis.flights) && (
          <div style={{ position:"absolute", bottom:88, left:24, zIndex:10, display:"flex", flexDirection:"column", gap:10 }}>
            {pageVis.attractions && (
              <a href="/attractions"
                style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 16px", background:"rgba(249,115,22,0.15)", backdropFilter:"blur(16px)", border:"1px solid rgba(249,115,22,0.35)", borderRadius:14, textDecoration:"none", color:"#fff", animation:"float 3s ease-in-out infinite", boxShadow:"0 8px 24px rgba(249,115,22,0.2)", transition:"transform 0.25s, background 0.25s" }}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(249,115,22,0.28)";e.currentTarget.style.transform="scale(1.05)"}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(249,115,22,0.15)";e.currentTarget.style.transform="scale(1)"}}
              >
                <span style={{fontSize:22, display:"inline-block", animation:"bounce-gentle 2s ease-in-out infinite"}}>🎟️</span>
                <div>
                  <div style={{fontSize:13, fontWeight:700}}>Attraction Tickets</div>
                  <div style={{fontSize:11, color:"rgba(255,255,255,0.55)"}}>Burj Khalifa · Dubai Frame · More</div>
                </div>
                <span style={{fontSize:13, color:"rgba(249,115,22,0.85)", marginLeft:4}}>→</span>
              </a>
            )}
            {pageVis.flights && (
              <a href="/flights"
                style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 16px", background:"rgba(99,153,232,0.15)", backdropFilter:"blur(16px)", border:"1px solid rgba(99,153,232,0.35)", borderRadius:14, textDecoration:"none", color:"#fff", animation:"float 3.5s ease-in-out infinite reverse", boxShadow:"0 8px 24px rgba(99,153,232,0.15)", transition:"transform 0.25s, background 0.25s" }}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(99,153,232,0.28)";e.currentTarget.style.transform="scale(1.05)"}}
                onMouseLeave={e=>{e.currentTarget.style.background="rgba(99,153,232,0.15)";e.currentTarget.style.transform="scale(1)"}}
              >
                <span style={{fontSize:22, display:"inline-block", animation:"slide-right 1.8s ease-in-out infinite"}}>✈️</span>
                <div>
                  <div style={{fontSize:13, fontWeight:700}}>Airline Tickets</div>
                  <div style={{fontSize:11, color:"rgba(255,255,255,0.55)"}}>Emirates · Flydubai · Air Arabia</div>
                </div>
                <span style={{fontSize:13, color:"rgba(99,153,232,0.85)", marginLeft:4}}>→</span>
              </a>
            )}
          </div>
        )}
      </section>

      {/* STATS with animated icons */}
      <section className="bg-gradient-to-r from-orange-500/10 via-pink-500/10 to-purple-500/10 border-y border-white/10 py-6 md:py-10">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            {iconClass:"stat-icon-1", icon:"🏆", value:"10,000+", label:"Happy Guests"},
            {iconClass:"stat-icon-2", icon:"⭐", value:"4.9/5",   label:"Average Rating"},
            {iconClass:"stat-icon-3", icon:"🌍", value:"80+",     label:"Countries"},
            {iconClass:"stat-icon-4", icon:"🎯", value:"6",       label:"Tour Types"},
          ].map(s => (
            <div key={s.label} className="group">
              <div className={`text-3xl md:text-4xl mb-1 md:mb-2 ${s.iconClass}`}>{s.icon}</div>
              <div className="text-2xl md:text-3xl font-black bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">{s.value}</div>
              <div className="text-gray-400 text-xs md:text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TOURS GRID */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-3">Our <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">Adventures</span></h2>
          <p className="text-gray-400">{filtered.length} experience{filtered.length !== 1 ? "s" : ""} available</p>
        </div>
        <div className="flex gap-2 mb-8 md:mb-10 overflow-x-auto pb-2 md:flex-wrap md:justify-center px-4 md:px-0" style={{scrollbarWidth:"none",WebkitOverflowScrolling:"touch"}}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveFilter(cat)}
              style={{flexShrink:0}}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all whitespace-nowrap ${activeFilter === cat ? "bg-gradient-to-r from-orange-500 to-pink-500 border-transparent text-white" : "border-white/20 text-gray-300 hover:border-white/40 bg-white/5"}`}>
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(tour => {
            const lowestPrice = tour.packages.map(s => packagesData[s]?.price?.AED || 9999).reduce((a,b) => Math.min(a,b), 9999);
            return (
              <Link key={tour.id} href={`/${tour.slug}`} className="group block">
                <div className="bg-[#111] border border-white/10 rounded-3xl overflow-hidden hover:border-white/30 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-52 overflow-hidden">
                    <img src={tour.cardImage} alt={tour.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <div className={`absolute top-3 left-3 bg-gradient-to-r ${tour.color} text-black text-xs font-bold px-3 py-1 rounded-full`}>{tour.category}</div>
                    <div className="absolute top-3 right-3 text-2xl drop-shadow-lg" style={{animation:"icon-orbit 3s ease-in-out infinite"}}>{tour.emoji}</div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur rounded-full px-2.5 py-1">
                      <span className="text-yellow-400 text-xs" style={{animation:"bounce-gentle 2s ease-in-out infinite"}}>★</span>
                      <span className="text-white text-xs font-bold">{tour.rating}</span>
                      <span className="text-gray-400 text-xs">({tour.reviewCount.toLocaleString()})</span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-black text-xl mb-1">{tour.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 flex-1 line-clamp-2">{tour.tagline}</p>
                    {/* Animated highlight pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {tour.highlights.slice(0,3).map((h,i) => (
                        <span key={i} className="tag-pill border border-white/10 rounded-full px-2 py-0.5 text-xs text-gray-300 flex items-center gap-1">
                          <span style={{display:"inline-block", animation:`wiggle ${1.5+i*0.3}s ease-in-out infinite`}}>{h.split(" ")[0]}</span>
                          <span>{h.split(" ").slice(1).join(" ")}</span>
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <div>
                        <span className="text-gray-500 text-xs block">From</span>
                        <span className={`font-black text-2xl bg-gradient-to-r ${tour.color} bg-clip-text text-transparent`}>AED {lowestPrice}</span>
                      </div>
                      <div className={`bg-gradient-to-r ${tour.color} text-black font-bold px-5 py-2.5 rounded-xl text-sm group-hover:scale-105 transition-transform`}>Explore →</div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* WHY US with animated icons */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-12">Why <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Dubai Rovers?</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {iconClass:"why-icon-1", icon:"🛡️", title:"Safety First",            desc:"All tours are licensed, insured and safety-certified.",         color:"from-blue-500/20 to-cyan-500/20",    border:"border-blue-500/30"},
              {iconClass:"why-icon-2", icon:"💰", title:"Best Price Guarantee",    desc:"Found it cheaper? We'll match it.",                            color:"from-green-500/20 to-emerald-500/20", border:"border-green-500/30"},
              {iconClass:"why-icon-3", icon:"🚗", title:"Hotel Pickup Included",   desc:"We collect you from your hotel. No taxis, no stress.",          color:"from-orange-500/20 to-amber-500/20",  border:"border-orange-500/30"},
              {iconClass:"why-icon-4", icon:"✅", title:"Free Cancellation",       desc:"Cancel up to 24 hours before for a full refund.",              color:"from-purple-500/20 to-violet-500/20", border:"border-purple-500/30"},
              {iconClass:"why-icon-5", icon:"💬", title:"24/7 WhatsApp Support",   desc:"Our team replies within minutes, 7 days a week.",             color:"from-pink-500/20 to-rose-500/20",    border:"border-pink-500/30"},
              {iconClass:"why-icon-6", icon:"🌍", title:"10+ Languages",           desc:"English, Arabic, Russian, French, German, Hindi & more.",      color:"from-yellow-500/20 to-amber-500/20",  border:"border-yellow-500/30"},
            ].map(v => (
              <div key={v.title} className={`bg-gradient-to-br ${v.color} border ${v.border} rounded-3xl p-6 hover:scale-[1.03] transition-transform duration-300`}>
                <div className={`text-4xl mb-3 ${v.iconClass}`}>{v.icon}</div>
                <h3 className="font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">🏜️</span>
              <span className="font-black text-lg bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">DubaiRovers</span>
            </div>
            <p className="text-gray-500 text-sm">Dubai's most trusted adventure platform. 10,000+ happy guests from 80+ countries.</p>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wide text-gray-400 mb-3">Tours</h4>
            <div className="space-y-2 text-sm text-gray-500">
              {tours.slice(0,4).map(t => <Link key={t.id} href={`/${t.slug}`} className="flex items-center gap-1.5 hover:text-white transition-colors"><span>{t.emoji}</span>{t.title}</Link>)}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wide text-gray-400 mb-3">Explore</h4>
            <div className="space-y-2 text-sm text-gray-500">
              {pageVis.attractions && <Link href="/attractions" className="flex items-center gap-1.5 hover:text-white transition-colors">🎟️ Attraction Tickets</Link>}
              {pageVis.flights     && <Link href="/flights"     className="flex items-center gap-1.5 hover:text-white transition-colors">✈️ Airline Tickets</Link>}
              {pageVis.booking     && <Link href="/booking"     className="flex items-center gap-1.5 hover:text-white transition-colors">📋 Book a Tour</Link>}
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wide text-gray-400 mb-3">Company</h4>
            <div className="space-y-2 text-sm text-gray-500">
              {pageVis.about   && <Link href="/about"   className="block hover:text-white transition-colors">About Us</Link>}
              {pageVis.contact && <Link href="/contact" className="block hover:text-white transition-colors">Contact</Link>}
              <Link href="/admin" className="block hover:text-white transition-colors">Admin</Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wide text-gray-400 mb-3">Contact</h4>
            <div className="space-y-2 text-sm text-gray-500">
              <div>📞 +971 544 735 060</div>
              <div>✉️ info@dubairovers.com</div>
              <div>📍 Dubai, UAE</div>
              <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1 bg-green-500/20 border border-green-500/30 text-green-400 px-3 py-1 rounded-full text-xs mt-2">💬 WhatsApp</a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/10 text-center text-gray-600 text-sm">© 2025 DubaiRovers.com — All Rights Reserved</div>
      </footer>

      <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-400 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all text-2xl"
        style={{animation:"heartbeat 2s ease-in-out infinite"}}>💬</a>
    </div>
  );
}
