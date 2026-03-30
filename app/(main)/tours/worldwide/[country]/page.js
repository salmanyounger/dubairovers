'use client';
import { useState, useEffect, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { WORLD_COUNTRIES, loadCountryTours } from '../../../../../data/worldwide-tours-index';

const CATEGORY_LABELS = {
  cultural: '🏛️ Cultural', city: '🏙️ City', food: '🍜 Food', adventure: '🧗 Adventure',
  nature: '🌿 Nature', water: '⛵ Water', desert: '🏜️ Desert'
};

export default function CountryToursPage() {
  const { country: cid } = useParams();
  const countryData = WORLD_COUNTRIES.find(c => c.id === cid);
  const allTours = getToursByCountry(cid);
  const [activecat, setActivecat] = useState('All');

  if (!countryData) return (
    <div className="min-h-screen flex items-center justify-center text-center p-8">
      <div>
        <div className="text-6xl mb-4">🌍</div>
        <h2 className="text-2xl font-bold text-brand-navy mb-2" style={{ fontFamily: "'Playfair Display',serif" }}>Country Not Found</h2>
        <Link href="/tours/worldwide" className="btn-gold mt-4">← All Countries</Link>
      </div>
    </div>
  );

  const cats = ['All', ...Array.from(new Set(allTours.map(t => t.category)))];
  const filtered = activecat === 'All' ? allTours : allTours.filter(t => t.category === activecat);

  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": countryData.name,
    "description": `Explore ${countryData.name} with DubaiRovers. ${filtered.length} tours available — cultural, adventure, food and nature experiences for all travellers.`,
    "url": `https://dubairovers.com/tours/worldwide/${cid}`,
    "touristType": ["Cultural tourists", "Adventure seekers", "Nature lovers", "Foodies"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <section className="relative py-28 text-white overflow-hidden">
        <Image
          src={`https://images.unsplash.com/photo-${countryData.img}?w=1200&q=80`}
          alt={countryData.name} fill className="object-cover" priority sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(10,22,40,0.4) 0%,rgba(10,22,40,0.9) 100%)' }} />
        <div className="container-main relative z-10 max-w-4xl">
          <div className="flex gap-2 mb-4 flex-wrap">
            <Link href="/tours/worldwide" className="text-white/60 text-sm hover:text-white transition-colors">← All Countries</Link>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{countryData.flag}</span>
            <h1 className="text-4xl md:text-5xl font-black" style={{ fontFamily: "'Playfair Display',serif" }}>
              {countryData.name} Tours
            </h1>
          </div>
          <div className="flex flex-wrap gap-4 text-white/70 text-sm mt-4">
            <span>🏛️ Capital: {countryData.capital}</span>
            <span>💱 Currency: {countryData.currency}</span>
            <span>📅 Best time: {countryData.bestTime}</span>
            <span>🗣️ Language: {countryData.language}</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-gold text-brand-navy">{allTours.length} tours available</span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white">From AED {countryData.fromAED?.toLocaleString('en-US')}</span>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="container-main py-3 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {cats.map(cat => (
            <button key={cat} onClick={() => setActivecat(cat)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                activecat === cat
                  ? 'border-transparent text-brand-navy'
                  : 'border-gray-200 text-gray-600 bg-white'
              }`}
              style={activecat === cat ? { background: 'linear-gradient(135deg,#D4AF37,#F0D060)' } : {}}>
              {cat === 'All' ? `All (${allTours.length})` : (CATEGORY_LABELS[cat] || cat)}
            </button>
          ))}
        </div>
      </div>

      <div className="container-main py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(tour => (
            <Link key={tour.id} href={`/tours/worldwide/${cid}/${tour.slug}`}
              className="group rounded-2xl overflow-hidden bg-white border border-gray-100 hover:border-brand-gold transition-all hover:-translate-y-1"
              style={{ boxShadow: '0 2px 12px rgba(10,22,40,0.06)' }}>
              <div className="relative h-44 overflow-hidden">
                <Image src={tour.image} alt={tour.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-brand-navy/80 text-white backdrop-blur-sm">
                    {CATEGORY_LABELS[tour.category] || tour.category}
                  </span>
                </div>
                {tour.featured && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 rounded-full text-[10px] font-bold bg-brand-gold text-brand-navy">⭐ Featured</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-brand-navy mb-1.5 line-clamp-2 group-hover:text-brand-gold transition-colors"
                  style={{ fontFamily: "'Playfair Display',serif", fontSize: '15px' }}>
                  {tour.emoji} {tour.name}
                </h3>
                <p className="text-gray-500 text-xs line-clamp-2 mb-3">{tour.tagline}</p>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-gray-500">
                    <span>⏱️ {tour.duration}</span>
                    <span className="mx-1 text-gray-300">·</span>
                    <span>⭐ {tour.rating}</span>
                  </div>
                  <span className="font-black text-brand-navy">AED {tour.pricing?.adult?.toLocaleString('en-US')}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-gray-500 font-semibold">No tours in this category yet.</p>
          </div>
        )}

        {/* WhatsApp CTA */}
        <div className="mt-12 rounded-3xl p-8 text-center" style={{ background: 'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
          <div className="text-4xl mb-3">{countryData.flag}</div>
          <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display',serif" }}>
            Ready to Explore {countryData.name}?
          </h3>
          <p className="text-white/70 mb-5 text-sm">Our team is online now. Book any tour in under 5 minutes on WhatsApp.</p>
          <a href={`https://wa.me/971544735060?text=Hi! I want to book a tour to ${countryData.name}.`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-white font-bold"
            style={{ background: '#25D366' }}>
            💬 Book via WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
