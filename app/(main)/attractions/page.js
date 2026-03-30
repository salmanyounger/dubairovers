'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FAQSection from '../../../components/FAQSection';
import { ATTRACTIONS } from '../../../data/tours';

function AttractionCard({ a }) {
  const [date, setDate]   = useState('');
  const [adults, setAdults] = useState(1);
  const [open, setOpen]   = useState(false);

  const book = () => {
    const msg = `Hello DubaiRovers! 👋\n\n🏛️ *Attraction:* ${a.name}\n📅 *Date:* ${date||'TBD'}\n👤 *Adults:* ${adults}\n💰 *Total:* AED ${adults * a.pricing.adult}\n\nPlease confirm availability.`;
    window.open(`https://wa.me/971544735060?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="rounded-2xl overflow-hidden bg-white"
      style={{ boxShadow:'0 4px 24px rgba(10,22,40,0.08)', border:'1px solid rgba(212,175,55,0.1)' }}>
      <div className="relative" style={{ height:'220px' }}>
        <Image src={a.image} alt={a.name} fill className="object-cover" sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" />
        <div className="absolute inset-0" style={{ background:'linear-gradient(180deg,transparent 40%,rgba(10,22,40,0.8) 100%)' }} />
        <div className="absolute top-3 left-3"><span className="badge-gold">{a.tag}</span></div>
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center gap-1">
            <span className="text-amber-400 text-sm">★</span>
            <span className="text-white font-bold text-sm">{a.rating}</span>
            <span className="text-white/60 text-xs">({(a.reviewCount/1000).toFixed(1)}k)</span>
          </div>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-brand-navy text-lg mb-1" style={{ fontFamily:"'Playfair Display',serif" }}>{a.name}</h3>
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <span>📍 {a.location}</span>
          <span>•</span>
          <span>⏱️ {a.duration}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{a.description}</p>

        {/* Quick booking */}
        <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-64' : 'max-h-0'}`}>
          <div className="pt-3 pb-1 border-t border-gray-100 space-y-3">
            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1">📅 Select Date</label>
              <input type="date" value={date} onChange={e => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="input-field text-sm py-2" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-brand-navy">👤 Adults</span>
              <div className="flex items-center gap-2">
                <button onClick={() => setAdults(Math.max(1,adults-1))}
                  className="w-7 h-7 rounded-full border-2 border-gray-200 flex items-center justify-center text-brand-navy font-bold text-sm">−</button>
                <span className="w-5 text-center font-bold text-brand-navy text-sm">{adults}</span>
                <button onClick={() => setAdults(adults+1)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-brand-navy font-bold text-sm"
                  style={{ background:'var(--gold)' }}>+</button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Total</span>
              <span className="font-black text-brand-navy text-lg">AED {adults * a.pricing.adult}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-3">
          <button onClick={() => setOpen(!open)}
            className="btn-gold flex-1 justify-center text-sm py-2.5">
            {open ? '✕ Close' : '🎫 Book Tickets'}
          </button>
          {open && (
            <button onClick={book}
              className="flex items-center gap-1 px-4 py-2.5 rounded-full font-bold text-white text-sm"
              style={{ background:'#25D366' }}>
              💬
            </button>
          )}
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <span className="text-gray-500 text-xs">From</span>
          <span className="font-black text-brand-navy">AED {a.pricing.adult} <span className="text-xs font-normal text-gray-400">/adult</span></span>
        </div>
      </div>
    </div>
  );
}

export default function AttractionsPage() {
  return (
    <>
      <section className="py-16 text-white text-center" style={{ background:'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
        <div className="container-main">
          <span className="badge-gold mb-4">🏛️ Attractions</span>
          <h1 className="text-4xl md:text-5xl font-black mt-3 mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>
            Dubai Attraction Tickets
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Book tickets to Dubai's most iconic attractions. Skip the queue, instant e-tickets, best price guaranteed.
          </p>
        </div>
      </section>

      <div className="container-main py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ATTRACTIONS.map(a => <AttractionCard key={a.id} a={a} />)}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-3xl p-10 text-center"
          style={{ background:'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
          <div className="text-4xl mb-3">🎟️</div>
          <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily:"'Playfair Display',serif" }}>
            Can't Find Your Attraction?
          </h2>
          <p className="text-white/70 mb-6">We can source tickets to any Dubai attraction. Just ask!</p>
          <a href="https://wa.me/971544735060?text=Hi! I'm looking for tickets to a Dubai attraction. Can you help?"
            target="_blank" rel="noopener noreferrer" className="btn-gold">💬 Ask on WhatsApp</a>
        </div>
      </div>

      <FAQSection />
    </>
  );
}
