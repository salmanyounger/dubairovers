'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FAQSection from '../../../../components/FAQSection';

const TIME_SLOTS = ['09:00 AM','10:00 AM','11:00 AM','12:00 PM','02:00 PM','03:00 PM','04:00 PM','05:00 PM','07:00 PM'];

export default function AttractionDetailClient({ attraction: a }) {
  const [date,    setDate]    = useState('');
  const [slot,    setSlot]    = useState('');
  const [adults,  setAdults]  = useState(1);
  const [children,setChildren]= useState(0);
  const [booked,  setBooked]  = useState(false);

  const total = adults * a.pricing.adult + children * (a.pricing.child || a.pricing.adult * 0.75);

  const book = () => {
    if (!date) { alert('Please select a date'); return; }
    const msg = [
      `🎫 *Attraction Ticket — DubaiRovers*`,
      ``,
      `🏛️ *Attraction:* ${a.name}`,
      `📅 *Date:* ${date}`,
      slot ? `⏰ *Time:* ${slot}` : '',
      `👤 *Adults:* ${adults} × AED ${a.pricing.adult} = AED ${adults * a.pricing.adult}`,
      children > 0 ? `👦 *Children:* ${children} × AED ${a.pricing.child || Math.round(a.pricing.adult * 0.75)} = AED ${children * (a.pricing.child || Math.round(a.pricing.adult * 0.75))}` : '',
      ``,
      `💰 *TOTAL: AED ${total.toFixed(0)}*`,
      ``,
      `_Please confirm availability and send payment details._`,
    ].filter(Boolean).join('\n');
    window.open(`https://wa.me/971544735060?text=${encodeURIComponent(msg)}`, '_blank');
    setBooked(true);
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-brand-cream border-b border-gray-100">
        <div className="container-main py-3 text-sm text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-brand-gold">Home</Link> /
          <Link href="/attractions" className="hover:text-brand-gold">Attractions</Link> /
          <span className="text-brand-navy font-semibold">{a.name}</span>
        </div>
      </div>

      <div className="container-main py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left */}
          <div className="flex-1 min-w-0">
            {/* Hero image */}
            <div className="relative rounded-3xl overflow-hidden mb-6" style={{ height:'380px' }}>
              <Image src={a.image} alt={a.name} fill className="object-cover" priority sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" />
              <div className="absolute inset-0" style={{ background:'linear-gradient(180deg,transparent 50%,rgba(10,22,40,0.8) 100%)' }} />
              <div className="absolute top-4 left-4"><span className="badge-gold">{a.tag}</span></div>
              <div className="absolute bottom-4 left-5 right-5">
                <h1 className="text-3xl font-black text-white mb-2" style={{ fontFamily:"'Playfair Display',serif" }}>
                  {a.name}
                </h1>
                <div className="flex items-center gap-4 text-white/80 text-sm flex-wrap">
                  <span>📍 {a.location}</span>
                  <span>⏱️ {a.duration}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-amber-400">★</span>
                    <span className="font-bold">{a.rating}</span>
                    <span className="text-white/60">({(a.reviewCount/1000).toFixed(1)}k reviews)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-brand-navy mb-3" style={{ fontFamily:"'Playfair Display',serif" }}>
                About {a.name}
              </h2>
              <p className="text-gray-600 leading-relaxed">{a.description}</p>
            </div>

            {/* Highlights */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-brand-navy mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>
                🌟 Highlights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {a.highlights?.map((h, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-100">
                    <span className="text-brand-gold">✓</span>
                    <span className="text-brand-navy text-sm font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Opening hours */}
            <div className="rounded-2xl p-5 bg-brand-cream border border-amber-100 mb-8">
              <h3 className="font-bold text-brand-navy mb-2">🕐 Opening Hours</h3>
              <p className="text-gray-600 text-sm">{a.openHours}</p>
            </div>

            {/* Map */}
            <div className="map-container rounded-2xl">
              <iframe
                src={`https://maps.google.com/maps?q=${encodeURIComponent(a.name + ', ' + a.location + ', Dubai')}&zoom=14&output=embed`}
                title={`Location of ${a.name}`} allowFullScreen loading="lazy" />
            </div>
          </div>

          {/* Right — booking widget */}
          <div className="lg:w-80 shrink-0">
            <div className="sticky top-24 rounded-3xl overflow-hidden"
              style={{ boxShadow:'0 8px 48px rgba(10,22,40,0.15)', border:'1px solid rgba(212,175,55,0.2)' }}>

              {/* Price header */}
              <div className="p-6 text-white" style={{ background:'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
                <div className="text-white/60 text-sm mb-1">Tickets from</div>
                <div className="text-4xl font-black">
                  AED {a.pricing.adult}
                  <span className="text-base font-normal text-white/60"> /adult</span>
                </div>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="text-amber-400 text-sm">★</span>
                  <span className="text-white font-bold text-sm">{a.rating}</span>
                  <span className="text-white/50 text-xs">({(a.reviewCount/1000).toFixed(1)}k reviews)</span>
                </div>
              </div>

              {booked ? (
                <div className="p-6 text-center">
                  <div className="text-5xl mb-3">🎉</div>
                  <h3 className="font-bold text-brand-navy mb-2">Request Sent!</h3>
                  <p className="text-gray-500 text-sm mb-4">We've opened WhatsApp with your booking details. Confirmation within 30 mins.</p>
                  <button onClick={() => setBooked(false)} className="btn-outline text-sm px-4 py-2">Book Again</button>
                </div>
              ) : (
                <div className="p-5 space-y-4">
                  {/* Date */}
                  <div>
                    <label className="block text-xs font-bold text-brand-navy mb-1.5">📅 Select Date *</label>
                    <input type="date" value={date} onChange={e => setDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="input-field text-sm" required />
                  </div>

                  {/* Time slot */}
                  <div>
                    <label className="block text-xs font-bold text-brand-navy mb-1.5">⏰ Preferred Time</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {TIME_SLOTS.map(t => (
                        <button key={t} onClick={() => setSlot(t)}
                          className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                            slot===t ? 'text-brand-navy' : 'border border-gray-200 text-gray-500 hover:border-brand-gold'
                          }`}
                          style={slot===t ? { background:'linear-gradient(135deg,#D4AF37,#F0D060)' } : {}}>
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Guests */}
                  <div className="rounded-xl p-4 space-y-3" style={{ background:'#f8fafc', border:'1px solid #e2e8f0' }}>
                    {[
                      { label:'Adults', sub:`AED ${a.pricing.adult}`, val:adults, min:1, set:setAdults },
                      { label:'Children', sub:`AED ${a.pricing.child || Math.round(a.pricing.adult*0.75)}`, val:children, min:0, set:setChildren },
                    ].map(row => (
                      <div key={row.label} className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-semibold text-brand-navy">{row.label}</div>
                          <div className="text-xs text-gray-400">{row.sub} / person</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => row.set(Math.max(row.min, row.val-1))}
                            className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center font-bold text-brand-navy hover:border-brand-gold transition-colors">−</button>
                          <span className="w-5 text-center font-bold text-brand-navy text-sm">{row.val}</span>
                          <button onClick={() => row.set(row.val+1)}
                            className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-brand-navy"
                            style={{ background:'var(--gold)' }}>+</button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center py-2 border-t border-gray-100">
                    <span className="font-bold text-brand-navy">Total</span>
                    <span className="font-black text-brand-navy text-2xl">AED {total.toFixed(0)}</span>
                  </div>

                  <button onClick={book} className="btn-gold w-full justify-center py-4 text-base">
                    🎫 Book Tickets via WhatsApp
                  </button>

                  <div className="text-center text-xs text-gray-400">
                    🔒 Secure · ⚡ Instant confirmation · 📱 E-ticket on WhatsApp
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <FAQSection faqs={[
        { q:`❓ How do I receive my ${a.name} ticket?`, a:'After booking confirmation via WhatsApp, we send your e-ticket directly to your WhatsApp or email within 30 minutes.' },
        { q:'👦 Is there a child discount?', a:`Yes! Children receive a discounted rate. Children under 3 are free at most attractions.` },
        { q:'🔄 Can I cancel or reschedule?', a:'You can reschedule for free up to 24 hours before your visit. Cancellations are eligible for a full refund if made 24+ hours in advance.' },
        { q:'📍 Where is the attraction located?', a:`${a.name} is located at ${a.location}, Dubai. We can arrange transfers from your hotel.` },
      ]} title={`${a.name} — FAQ`} />
    </>
  );
}
