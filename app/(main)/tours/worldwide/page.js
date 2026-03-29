'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WORLD_COUNTRIES, WORLD_TOURS } from '../../../../data/worldwide-tours';

const REGIONS = ['All', 'Middle East', 'Europe', 'Asia', 'Africa', 'Americas', 'Oceania', 'Europe/Asia', 'Caucasus'];

export default function WorldwidePage() {
  const [activeRegion, setActiveRegion] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = WORLD_COUNTRIES;
    if (activeRegion !== 'All') list = list.filter(c => c.region === activeRegion);
    if (search) list = list.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [activeRegion, search]);

  const toursCount = (cid) => WORLD_TOURS.filter(t => t.countrySlug === cid).length;

  return (
    <>
      {/* Hero */}
      <section className="py-20 text-white text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1400)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="container-main relative z-10">
          <span className="badge-gold mb-4 inline-block">🌍 Worldwide Tours</span>
          <h1 className="text-4xl md:text-5xl font-black mt-3 mb-4" style={{ fontFamily: "'Playfair Display',serif" }}>
            Explore the World
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-6">
            From desert kingdoms to tropical islands — {WORLD_COUNTRIES.length} countries, {WORLD_TOURS.length} handpicked tours. Book from Dubai with confidence.
          </p>
          <div className="relative max-w-md mx-auto">
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search a country..."
              className="w-full py-3 px-5 pr-10 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:bg-white/15 text-sm"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50">🔍</span>
          </div>
        </div>
      </section>

      {/* Region filter */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="container-main py-3 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {['All','Middle East','Europe','Asia','Africa','Americas','Oceania','Caucasus','Europe/Asia'].map(r => (
            <button key={r} onClick={() => setActiveRegion(r)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                activeRegion === r
                  ? 'border-transparent text-brand-navy'
                  : 'border-gray-200 text-gray-600 bg-white hover:border-gray-300'
              }`}
              style={activeRegion === r ? { background: 'linear-gradient(135deg,#D4AF37,#F0D060)' } : {}}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Country Grid */}
      <div className="container-main py-10">
        <p className="text-sm text-gray-400 mb-6">{filtered.length} countries found</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map(c => (
            <Link key={c.id} href={`/tours/worldwide/${c.id}`}
              className="group rounded-2xl overflow-hidden bg-white border border-gray-100 hover:border-brand-gold transition-all hover:-translate-y-1"
              style={{ boxShadow: '0 2px 12px rgba(10,22,40,0.06)' }}>
              <div className="relative h-28 overflow-hidden">
                <Image
                  src={`https://images.unsplash.com/photo-${c.img}?w=400&q=75`}
                  alt={c.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,transparent 30%,rgba(10,22,40,0.85) 100%)' }} />
                <div className="absolute bottom-2 left-3 right-3">
                  <div className="flex items-center gap-1">
                    <span className="text-base">{c.flag}</span>
                    <p className="text-white font-bold text-xs leading-tight">{c.name}</p>
                  </div>
                </div>
              </div>
              <div className="px-3 py-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">{c.region}</span>
                  <span className="text-[10px] font-bold text-brand-navy">{toursCount(c.id)} tours</span>
                </div>
                <p className="text-[10px] text-gray-500 mt-0.5">From AED {Number(c.fromAED).toLocaleString('en-US')}</p>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🌍</div>
            <p className="text-gray-500 font-semibold">No countries match your search.</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 rounded-3xl p-8 text-center" style={{ background: 'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
          <div className="text-4xl mb-3">✈️</div>
          <h3 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "'Playfair Display',serif" }}>
            Can't Find What You're Looking For?
          </h3>
          <p className="text-white/70 mb-5">Our team builds custom itineraries for groups of any size. Chat with us on WhatsApp — we respond within 30 minutes.</p>
          <a href="https://wa.me/971544735060?text=Hi! I'm interested in a worldwide tour package." target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-white font-bold"
            style={{ background: '#25D366' }}>
            💬 Chat on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
