'use client';
import { useState } from 'react';
import FAQSection from '../../../components/FAQSection';

export default function FlightsPage() {
  const [form, setForm] = useState({ from:'Dubai (DXB)', to:'', date:'', ret:'', adults:1, cls:'Economy' });
  const upd = (k,v) => setForm(f => ({...f,[k]:v}));

  const handleSearch = () => {
    const msg = `✈️ *Flight Enquiry — DubaiRovers*\n\n🛫 From: ${form.from}\n🛬 To: ${form.to}\n📅 Departure: ${form.date}\n📅 Return: ${form.ret||'One way'}\n👥 Passengers: ${form.adults}\n💺 Class: ${form.cls}\n\nPlease provide the best available options and prices.`;
    window.open(`https://wa.me/971544735060?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const POPULAR = [
    { from:'DXB', to:'LHR', city:'London',     flag:'🇬🇧', price:'AED 1,200' },
    { from:'DXB', to:'CDG', city:'Paris',       flag:'🇫🇷', price:'AED 1,450' },
    { from:'DXB', to:'JFK', city:'New York',    flag:'🇺🇸', price:'AED 2,100' },
    { from:'DXB', to:'BKK', city:'Bangkok',     flag:'🇹🇭', price:'AED 750'  },
    { from:'DXB', to:'SIN', city:'Singapore',   flag:'🇸🇬', price:'AED 900'  },
    { from:'DXB', to:'IST', city:'Istanbul',    flag:'🇹🇷', price:'AED 650'  },
    { from:'DXB', to:'CMB', city:'Colombo',     flag:'🇱🇰', price:'AED 480'  },
    { from:'DXB', to:'KHI', city:'Karachi',     flag:'🇵🇰', price:'AED 350'  },
  ];

  return (
    <>
      {/* Hero */}
      <section className="py-16 text-white relative overflow-hidden" style={{ background:'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 text-[200px] leading-none">✈️</div>
        </div>
        <div className="container-main relative z-10">
          <div className="text-center mb-10">
            <span className="badge-gold mb-4">✈️ Flight Booking</span>
            <h1 className="text-4xl md:text-5xl font-black mt-3 mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>
              Book Flights from Dubai
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              Best fares on flights from Dubai to worldwide destinations. Tell us where you want to go!
            </p>
          </div>

          {/* Search form */}
          <div className="max-w-3xl mx-auto rounded-3xl p-6 bg-white/10 backdrop-blur-sm border border-white/20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              <div>
                <label className="block text-xs font-bold text-white/70 mb-1.5">🛫 From</label>
                <input value={form.from} onChange={e=>upd('from',e.target.value)}
                  className="input-field text-sm" placeholder="Dubai (DXB)" />
              </div>
              <div>
                <label className="block text-xs font-bold text-white/70 mb-1.5">🛬 To</label>
                <input value={form.to} onChange={e=>upd('to',e.target.value)}
                  className="input-field text-sm" placeholder="London, Paris..." />
              </div>
              <div>
                <label className="block text-xs font-bold text-white/70 mb-1.5">📅 Departure</label>
                <input type="date" value={form.date} onChange={e=>upd('date',e.target.value)}
                  min={new Date().toISOString().split('T')[0]} className="input-field text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-white/70 mb-1.5">📅 Return</label>
                <input type="date" value={form.ret} onChange={e=>upd('ret',e.target.value)}
                  className="input-field text-sm" />
              </div>
            </div>
            <div className="flex gap-3 items-end flex-wrap">
              <div>
                <label className="block text-xs font-bold text-white/70 mb-1.5">👥 Passengers</label>
                <select value={form.adults} onChange={e=>upd('adults',+e.target.value)} className="input-field text-sm">
                  {[1,2,3,4,5,6,7,8].map(n=><option key={n} value={n}>{n} Passenger{n>1?'s':''}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-white/70 mb-1.5">💺 Class</label>
                <select value={form.cls} onChange={e=>upd('cls',e.target.value)} className="input-field text-sm">
                  {['Economy','Business','First Class'].map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
              <button onClick={handleSearch} className="btn-gold flex-1 sm:flex-none justify-center py-3 text-sm">
                🔍 Search Flights via WhatsApp
              </button>
            </div>
            <p className="text-white/50 text-xs mt-3 text-center">
              ⚡ Get instant quotes via WhatsApp • Best price guarantee • 24/7 support
            </p>
          </div>
        </div>
      </section>

      {/* Popular destinations */}
      <section className="section-pad bg-white">
        <div className="container-main">
          <div className="text-center mb-10">
            <span className="badge-gold mb-3">🌍 Popular Routes</span>
            <h2 className="text-3xl font-bold text-brand-navy mt-3" style={{ fontFamily:"'Playfair Display',serif" }}>
              Top Flights from Dubai
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {POPULAR.map(d => (
              <button key={d.city} onClick={() => { upd('to', d.city); }}
                className="rounded-2xl p-4 text-center border-2 border-gray-100 hover:border-brand-gold transition-all hover:-translate-y-1 hover:shadow-gold cursor-pointer group">
                <div className="text-3xl mb-2">{d.flag}</div>
                <div className="font-bold text-brand-navy text-sm group-hover:text-brand-gold">{d.city}</div>
                <div className="text-xs text-gray-400 mt-0.5">{d.from} → {d.to}</div>
                <div className="text-brand-gold font-black text-sm mt-2">from {d.price}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Why book with us */}
      <section className="section-pad bg-brand-cream">
        <div className="container-main">
          <h2 className="text-3xl font-bold text-brand-navy text-center mb-10" style={{ fontFamily:"'Playfair Display',serif" }}>
            ✈️ Why Book Flights with DubaiRovers?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji:'💰', title:'Best Price',      desc:'We compare all airlines to find you the lowest fares.' },
              { emoji:'⚡', title:'Fast Quotes',     desc:'Get flight options via WhatsApp within 15 minutes.' },
              { emoji:'🎫', title:'All Airlines',    desc:'Emirates, Etihad, flydubai, Air Arabia and all major carriers.' },
              { emoji:'🤝', title:'Full Support',    desc:'We handle booking, changes, and cancellations for you.' },
            ].map(f => (
              <div key={f.title} className="text-center rounded-2xl p-6 bg-white"
                style={{ boxShadow:'0 4px 20px rgba(10,22,40,0.06)' }}>
                <div className="text-4xl mb-3">{f.emoji}</div>
                <h3 className="font-bold text-brand-navy mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />
    </>
  );
}
