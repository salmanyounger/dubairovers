"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getTour, getTourPackages, getRelatedTours, packagesData } from "../data/tours";

// Default hero image sets per tour
const DEFAULT_TOUR_SLIDES = {
  "desert-safari-dubai": [
    "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1600&q=80",
    "https://images.unsplash.com/photo-1502472584811-0a2f2feb8968?w=1600&q=80",
    "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=1600&q=80",
    "https://images.unsplash.com/photo-1547234935-80c7145ec969?w=1600&q=80",
  ],
  "quad-bike-dubai": [
    "https://images.unsplash.com/photo-1547234935-80c7145ec969?w=1600&q=80",
    "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1600&q=80",
    "https://images.unsplash.com/photo-1502472584811-0a2f2feb8968?w=1600&q=80",
  ],
  "dhow-cruise-dubai": [
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80",
    "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1600&q=80",
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80",
  ],
  "hot-air-balloon-dubai": [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80",
    "https://images.unsplash.com/photo-1502472584811-0a2f2feb8968?w=1600&q=80",
    "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1600&q=80",
  ],
  "camel-riding-dubai": [
    "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=1600&q=80",
    "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1600&q=80",
    "https://images.unsplash.com/photo-1502472584811-0a2f2feb8968?w=1600&q=80",
  ],
  "private-city-tour-dubai": [
    "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1600&q=80",
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&q=80",
  ],
};

export default function TourPage({ params }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [heroSlide, setHeroSlide] = useState(0);
  const tour = getTour(params.tour);

  // ── IMAGE OVERRIDES from Image Manager ──
  const defaultSlides = DEFAULT_TOUR_SLIDES[params.tour] || [tour?.heroImage].filter(Boolean);
  const [slides, setSlides] = useState(defaultSlides);

  // Load image overrides from localStorage
  useEffect(() => {
    const loadImages = () => {
      try {
        const saved = JSON.parse(localStorage.getItem("dr_tour_slides") || "{}");
        if (saved[params.tour] && Array.isArray(saved[params.tour]) && saved[params.tour].length > 0) {
          setSlides(saved[params.tour]);
        } else {
          setSlides(DEFAULT_TOUR_SLIDES[params.tour] || [tour?.heroImage].filter(Boolean));
        }
      } catch {}
    };
    loadImages();
    window.addEventListener("storage", loadImages);
    return () => window.removeEventListener("storage", loadImages);
  }, [params.tour, tour]);

  useEffect(() => {
    const interval = setInterval(() => setHeroSlide(s => (s + 1) % slides.length), 2500);
    return () => clearInterval(interval);
  }, [slides.length]);

  if (!tour) return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-3xl font-bold mb-4">Tour Not Found</h1>
        <Link href="/" className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold px-6 py-3 rounded-xl">← Back to Home</Link>
      </div>
    </div>
  );

  const packages = getTourPackages(params.tour);
  const related = getRelatedTours(params.tour, 3);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes bounce-gentle { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-6px) scale(1.1)} }
        @keyframes wiggle { 0%,100%{transform:rotate(-5deg)} 50%{transform:rotate(5deg)} }
        @keyframes icon-orbit { 0%,100%{transform:translateY(0) rotate(0deg)} 25%{transform:translateY(-4px) rotate(5deg)} 75%{transform:translateY(4px) rotate(-5deg)} }
        @keyframes tag-shimmer { 0%{background-position:200% center} 100%{background-position:-200% center} }
        @keyframes heartbeat { 0%,100%{transform:scale(1)} 14%{transform:scale(1.2)} 28%{transform:scale(1)} 42%{transform:scale(1.15)} 70%{transform:scale(1)} }
        @keyframes slide-in { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        .tag-pill { background: linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.05) 100%); background-size: 200% auto; animation: tag-shimmer 3s linear infinite; }
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏜️</span>
            <span className="font-black text-xl bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">DubaiRovers</span>
          </Link>
          <Link href="/booking" className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold px-5 py-2 rounded-full text-sm">Book Now</Link>
        </div>
      </nav>

      {/* HERO with animated slideshow */}
      <section className="relative h-[75vh] flex items-end pb-16 overflow-hidden pt-16">
        {slides.map((img, i) => (
          <div key={i} className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:`url('${img}')`,
              opacity: heroSlide === i ? 1 : 0,
              transition: "opacity 1.2s ease-in-out, transform 2.5s ease-in-out",
              transform: heroSlide === i ? "scale(1.05)" : "scale(1)",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/50 to-black/20" />
        <div className={`absolute inset-0 bg-gradient-to-br ${tour.color} opacity-20`} />

        <div className="absolute bottom-20 right-6 flex flex-col gap-2 z-10">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setHeroSlide(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width:"8px",
                height: heroSlide === i ? "24px" : "8px",
                background: heroSlide === i ? "linear-gradient(to bottom,#f97316,#ec4899)" : "rgba(255,255,255,0.3)"
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>›</span><span className="text-white">{tour.title}</span>
          </div>
          <div className="flex items-end gap-5 flex-wrap">
            <div className="text-6xl" style={{animation:"icon-orbit 3s ease-in-out infinite"}}>{tour.emoji}</div>
            <div className="flex-1">
              <div className={`inline-flex items-center bg-gradient-to-r ${tour.color} text-black text-xs font-bold px-4 py-1.5 rounded-full mb-3`}>{tour.category}</div>
              <h1 className="text-5xl md:text-6xl font-black mb-3 leading-tight">{tour.title}</h1>
              <p className="text-xl text-gray-300 max-w-2xl mb-4">{tour.tagline}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="text-yellow-400">★ <strong>{tour.rating}</strong> <span className="text-gray-400">({tour.reviewCount.toLocaleString()} reviews)</span></span>
                <span className="text-gray-400">📍 {tour.location}</span>
                <span className="text-gray-400">👥 Up to {tour.maxGroupSize} guests</span>
                <span className="text-gray-400">💪 {tour.physicalLevel}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-black mb-8">Choose Your <span className={`bg-gradient-to-r ${tour.color} bg-clip-text text-transparent`}>Package</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg, idx) => (
            <Link key={pkg.id} href={`/${params.tour}/${pkg.slug}`} className="group block h-full">
              <div className="bg-[#111] border border-white/10 rounded-3xl overflow-hidden hover:border-white/30 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                <div className="relative h-44 overflow-hidden">
                  <img src={pkg.images?.[0] || tour.heroImage} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  {pkg.badge && (
                    <div className={`absolute top-3 left-3 bg-gradient-to-r ${tour.color} text-black text-xs font-black px-3 py-1 rounded-full flex items-center gap-1`}>
                      <span style={{display:"inline-block", animation:`wiggle ${1.5+idx*0.2}s ease-in-out infinite`}}>{pkg.badge.split(" ")[0]}</span>
                      <span>{pkg.badge.split(" ").slice(1).join(" ")}</span>
                    </div>
                  )}
                  <div className="absolute top-3 right-3 text-2xl" style={{animation:`icon-orbit ${2.5+idx*0.3}s ease-in-out infinite`}}>{pkg.emoji}</div>
                  {pkg.originalPrice && (
                    <div className="absolute bottom-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full" style={{animation:"bounce-gentle 1.5s ease-in-out infinite"}}>
                      SAVE AED {pkg.originalPrice.AED - pkg.price.AED}
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-black text-lg mb-1 group-hover:text-orange-400 transition-colors">{pkg.title}</h3>
                  <p className="text-gray-400 text-sm mb-3 flex-1 line-clamp-2">{pkg.subtitle}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {[
                      {icon:"⏱️", text:pkg.duration},
                      {icon:"💪", text:pkg.physicalLevel},
                      {icon:"👶", text:`${pkg.minAge}+`},
                    ].map((tag, ti) => (
                      <span key={ti} className="tag-pill border border-white/10 rounded-full px-2.5 py-0.5 text-xs text-gray-300 flex items-center gap-1">
                        <span style={{display:"inline-block", animation:`wiggle ${1.5+ti*0.4}s ease-in-out infinite`}}>{tag.icon}</span>
                        {tag.text}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-auto">
                    <div>
                      {pkg.originalPrice && <div className="text-gray-500 text-xs line-through">AED {pkg.originalPrice.AED}</div>}
                      <div className={`font-black text-2xl bg-gradient-to-r ${tour.color} bg-clip-text text-transparent`}>AED {pkg.price.AED}</div>
                      <div className="text-gray-500 text-xs">per person</div>
                    </div>
                    <div className={`bg-gradient-to-r ${tour.color} text-black font-bold px-4 py-2.5 rounded-xl text-sm group-hover:scale-105 transition-transform`}>Book →</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-t border-white/10">
        <h2 className="text-3xl font-black mb-8">Tour <span className={`bg-gradient-to-r ${tour.color} bg-clip-text text-transparent`}>Highlights</span></h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {tour.highlights.map((h,i) => (
            <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-white/20 transition-colors">
              <span className="text-2xl" style={{display:"inline-block", animation:`${["float","bounce-gentle","wiggle","icon-orbit","heartbeat","bounce-gentle"][i%6]} ${1.5+i*0.2}s ease-in-out infinite`}}>{h.split(" ")[0]}</span>
              <span className="text-gray-200 text-sm">{h.split(" ").slice(1).join(" ")}</span>
            </div>
          ))}
        </div>
      </section>

      {/* INCLUDED / NOT INCLUDED */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-6">
            <h3 className="font-black text-xl text-green-400 mb-4">✅ What is Included</h3>
            <ul className="space-y-2">{tour.included.map((item,i) => <li key={i} className="flex gap-2 text-gray-300 text-sm"><span className="text-green-400 mt-0.5">✓</span>{item}</li>)}</ul>
          </div>
          <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-6">
            <h3 className="font-black text-xl text-red-400 mb-4">❌ Not Included</h3>
            <ul className="space-y-2">{tour.notIncluded.map((item,i) => <li key={i} className="flex gap-2 text-gray-300 text-sm"><span className="text-red-400 mt-0.5">✗</span>{item}</li>)}</ul>
            <h3 className="font-black text-xl text-amber-400 mt-6 mb-4">🎒 What to Bring</h3>
            <ul className="space-y-2">{tour.whatToBring.map((item,i) => <li key={i} className="flex gap-2 text-gray-300 text-sm"><span className="text-amber-400 mt-0.5">•</span>{item}</li>)}</ul>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto px-4 py-12 border-t border-white/10">
        <h2 className="text-3xl font-black mb-8">Frequently Asked <span className={`bg-gradient-to-r ${tour.color} bg-clip-text text-transparent`}>Questions</span></h2>
        <div className="space-y-3">
          {tour.faqs.map((faq,i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left p-5 flex justify-between items-center hover:bg-white/5">
                <span className="font-semibold">{faq.q}</span>
                <span className={`text-xl font-bold ml-4 bg-gradient-to-r ${tour.color} bg-clip-text text-transparent transition-transform duration-300 ${openFaq === i ? "rotate-45" : ""}`} style={{display:"inline-block"}}>+</span>
              </button>
              {openFaq === i && <div className="px-5 pb-5 text-gray-300 text-sm border-t border-white/10 pt-4" style={{animation:"slide-in 0.3s ease-out"}}>{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* RELATED */}
      <section className="max-w-6xl mx-auto px-4 py-12 border-t border-white/10">
        <h2 className="text-3xl font-black mb-8">You Might Also <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">Like</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {related.map(t => (
            <Link key={t.id} href={`/${t.slug}`} className="group relative h-44 rounded-2xl overflow-hidden block">
              <img src={t.cardImage} alt={t.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="text-xl mr-1" style={{display:"inline-block", animation:"icon-orbit 3s ease-in-out infinite"}}>{t.emoji}</span>
                <span className="font-bold">{t.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-400 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all text-2xl"
        style={{animation:"heartbeat 2s ease-in-out infinite"}}>💬</a>
    </div>
  );
}
