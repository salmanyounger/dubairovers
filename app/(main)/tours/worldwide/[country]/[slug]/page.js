'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { WORLD_COUNTRIES, loadCountryTours, getCountry } from '../../../../../../data/worldwide-tours-index';

export default function WorldTourDetailPage() {
  const { country: cid, slug } = useParams();
  const [selectedDate, setSelectedDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [booked, setBooked] = useState(false);

  const [tour, setTour] = useState(null);
  const [relatedTours, setRelatedTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const country = WORLD_COUNTRIES.find(c => c.id === cid);

  useEffect(() => {
    loadCountryTours(cid).then(tours => {
      setTour(tours.find(t => t.slug === slug) || null);
      setRelatedTours(tours.filter(t => t.slug !== slug).slice(0, 3));
      setLoading(false);
    });
  }, [cid, slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-3 animate-pulse">✈️</div>
        <p className="text-gray-500 font-medium">Loading tour...</p>
      </div>
    </div>
  );

  if (!tour || !country) return (
    <div className="min-h-screen flex items-center justify-center text-center p-8">
      <div>
        <div className="text-6xl mb-4">🗺️</div>
        <h2 className="text-2xl font-bold text-brand-navy mb-2" style={{ fontFamily: "'Playfair Display',serif" }}>Tour Not Found</h2>
        <p className="text-gray-500 mb-5">This tour may have moved or the link has changed.</p>
        <Link href="/tours/worldwide" className="btn-gold">← Browse All Countries</Link>
      </div>
    </div>
  );

  const totalPrice = tour.pricing?.adult * guests;

  const handleBook = () => {
    const msg = `Hi! I'd like to book the *${tour.name}* tour in ${country.name}.\n\n👥 Guests: ${guests}\n📅 Date: ${selectedDate || 'Flexible'}\n💰 Estimated total: AED ${totalPrice?.toLocaleString('en-US')}\n\nPlease confirm availability.`;
    window.open(`https://wa.me/971544735060?text=${encodeURIComponent(msg)}`, '_blank');
    setBooked(true);
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": tour.name,
    "description": tour.tagline,
    "image": tour.image,
    "touristType": "International travellers from Dubai",
    "offers": {
      "@type": "Offer",
      "priceCurrency": "AED",
      "price": tour.pricing?.adult,
      "availability": "https://schema.org/InStock",
    },
    "provider": {
      "@type": "Organization",
      "name": "DubaiRovers",
      "url": "https://dubairovers.com",
      "telephone": "+971544735060"
    },
    "itinerary": {
      "@type": "ItemList",
      "itemListElement": (tour.highlights || []).map((h, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": h
      }))
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dubairovers.com" },
      { "@type": "ListItem", "position": 2, "name": "Tours", "item": "https://dubairovers.com/tours" },
      { "@type": "ListItem", "position": 3, "name": "Worldwide", "item": "https://dubairovers.com/tours/worldwide" },
      { "@type": "ListItem", "position": 4, "name": country.name, "item": `https://dubairovers.com/tours/worldwide/${cid}` },
      { "@type": "ListItem", "position": 5, "name": tour.name, "item": `https://dubairovers.com/tours/worldwide/${cid}/${slug}` },
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative py-28 text-white overflow-hidden">
        <Image src={tour.image} alt={tour.name} fill className="object-cover" priority sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(10,22,40,0.35) 0%,rgba(10,22,40,0.92) 100%)' }} />
        <div className="container-main relative z-10 max-w-5xl">
          <div className="flex items-center gap-2 mb-4 text-sm text-white/60 flex-wrap">
            <Link href="/tours/worldwide" className="hover:text-white transition-colors">🌍 Worldwide</Link>
            <span>/</span>
            <Link href={`/tours/worldwide/${cid}`} className="hover:text-white transition-colors">{country.flag} {country.name}</Link>
          </div>
          <div className="flex gap-2 mb-4 flex-wrap">
            <span className="badge-gold">{tour.category}</span>
            {tour.featured && <span className="badge-navy">⭐ Featured</span>}
            {tour.trending && <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-500/80 text-white">🔥 Trending</span>}
          </div>
          <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight"
            style={{ fontFamily: "'Playfair Display',serif", textShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
            {tour.name}
          </h1>
          <p className="text-white/80 text-lg mb-5 max-w-2xl">{tour.tagline}</p>
          <div className="flex flex-wrap gap-4 text-white/70 text-sm">
            <span>⏱️ {tour.duration}</span>
            <span>⭐ {tour.rating}/5 ({tour.reviews} reviews)</span>
            <span>{country.flag} {country.name}</span>
            <span>💰 From AED {tour.pricing?.adult?.toLocaleString('en-US')}</span>
          </div>
        </div>
      </section>

      <div className="container-main py-12 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Main Content */}
          <div className="flex-1 min-w-0">

            {/* Highlights */}
            <div className="mb-8">
              <h2 className="text-xl font-black text-brand-navy mb-4" style={{ fontFamily: "'Playfair Display',serif" }}>
                ✨ Tour Highlights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(tour.highlights || []).map((h, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 border border-amber-100">
                    <span className="text-brand-gold mt-0.5 text-base shrink-0">▸</span>
                    <p className="text-sm text-gray-700 font-medium">{h}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* About */}
            <div className="mb-8">
              <h2 className="text-xl font-black text-brand-navy mb-4" style={{ fontFamily: "'Playfair Display',serif" }}>
                📋 About This Tour
              </h2>
              <div className="prose text-gray-700 text-base leading-8">
                <p className="mb-4">{tour.tagline} This experience has been carefully curated by DubaiRovers to give you the most authentic, memorable, and hassle-free time in {country.name}.</p>
                <p className="mb-4">From the moment you confirm your booking, we handle every detail — transfers, guides, entrance fees, and more. All you need to bring is curiosity and an open mind.</p>
                <p>Our guides are licensed local experts who speak English fluently and have been leading tours for years. They know the best photography spots, the right times to visit, and the local stories that guidebooks never tell you.</p>
              </div>
            </div>

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <h2 className="text-lg font-black text-brand-navy mb-3" style={{ fontFamily: "'Playfair Display',serif" }}>
                  ✅ What's Included
                </h2>
                <ul className="space-y-2">
                  {(tour.inclusions || []).map((inc, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-green-500 font-bold">✓</span> {inc}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-black text-brand-navy mb-3" style={{ fontFamily: "'Playfair Display',serif" }}>
                  ❌ Not Included
                </h2>
                <ul className="space-y-2">
                  {(tour.exclusions || ["Personal expenses","Tips & gratuities","Travel insurance","Visa fees"]).map((exc, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                      <span className="text-red-400 font-bold">✗</span> {exc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Country Info */}
            <div className="rounded-2xl p-5 border border-gray-100 mb-8 bg-white">
              <h2 className="text-lg font-black text-brand-navy mb-4" style={{ fontFamily: "'Playfair Display',serif" }}>
                {country.flag} About {country.name}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                {[
                  ['Capital', country.capital],
                  ['Currency', country.currency],
                  ['Best Time', country.bestTime],
                  ['Language', country.language],
                  ['Timezone', country.timezone],
                  ['Region', country.region],
                ].map(([label, val]) => (
                  <div key={label}>
                    <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide">{label}</p>
                    <p className="text-brand-navy font-bold text-sm mt-0.5">{val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Tours */}
            {relatedTours.length > 0 && (
              <div>
                <h2 className="text-xl font-black text-brand-navy mb-4" style={{ fontFamily: "'Playfair Display',serif" }}>
                  🗺️ More Tours in {country.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedTours.map(t => (
                    <Link key={t.id} href={`/tours/worldwide/${cid}/${t.slug}`}
                      className="group rounded-xl overflow-hidden border border-gray-100 hover:border-brand-gold transition-all bg-white">
                      <div className="relative h-32 overflow-hidden">
                        <Image src={t.image} alt={t.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" />
                      </div>
                      <div className="p-3">
                        <p className="text-xs font-bold text-brand-navy line-clamp-2 group-hover:text-brand-gold transition-colors">{t.name}</p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[10px] text-gray-500">⏱️ {t.duration}</span>
                          <span className="text-xs font-black text-brand-navy">AED {t.pricing?.adult?.toLocaleString('en-US')}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Sidebar */}
          <aside className="lg:w-80 shrink-0">

            {/* Booking Card */}
            <div className="rounded-2xl overflow-hidden sticky top-4" style={{ boxShadow: '0 8px 40px rgba(10,22,40,0.12)', border: '1px solid rgba(212,175,55,0.3)' }}>
              <div className="px-6 py-5" style={{ background: 'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
                <p className="text-white/60 text-xs mb-1">Starting from</p>
                <p className="text-3xl font-black text-brand-gold">AED {tour.pricing?.adult?.toLocaleString('en-US')}</p>
                <p className="text-white/50 text-xs mt-1">per person · {tour.duration}</p>
              </div>

              <div className="p-5 bg-white space-y-4">
                {/* Date picker */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">📅 Select Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={e => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-700 focus:outline-none focus:border-brand-gold"
                  />
                </div>

                {/* Guests */}
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1.5 block">👥 Number of Guests</label>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setGuests(g => Math.max(1, g - 1))}
                      className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center font-bold text-gray-600 hover:border-brand-gold hover:text-brand-navy transition-colors">−</button>
                    <span className="flex-1 text-center font-black text-brand-navy text-lg">{guests}</span>
                    <button onClick={() => setGuests(g => Math.min(20, g + 1))}
                      className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center font-bold text-gray-600 hover:border-brand-gold hover:text-brand-navy transition-colors">+</button>
                  </div>
                </div>

                {/* Price breakdown */}
                <div className="rounded-xl bg-gray-50 p-3 text-sm">
                  <div className="flex justify-between text-gray-600 mb-1">
                    <span>AED {tour.pricing?.adult?.toLocaleString('en-US')} × {guests} guests</span>
                  </div>
                  <div className="flex justify-between font-black text-brand-navy text-base border-t border-gray-200 pt-2 mt-2">
                    <span>Total Estimate</span>
                    <span>AED {totalPrice?.toLocaleString('en-US')}</span>
                  </div>
                </div>

                {/* Book Button */}
                <button onClick={handleBook}
                  className="w-full py-3.5 rounded-2xl font-black text-brand-navy text-base transition-all hover:opacity-90 active:scale-95"
                  style={{ background: 'linear-gradient(135deg,#D4AF37,#F0D060)', boxShadow: '0 4px 16px rgba(212,175,55,0.4)' }}>
                  📅 Book via WhatsApp
                </button>

                <a href={`https://wa.me/971544735060?text=Hi! I have a question about the ${tour.name} tour in ${country.name}.`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-2xl text-white text-sm font-bold transition-opacity hover:opacity-90"
                  style={{ background: '#25D366' }}>
                  💬 Ask a Question
                </a>

                {booked && (
                  <div className="rounded-xl bg-green-50 border border-green-200 p-3 text-center">
                    <p className="text-green-700 font-bold text-sm">✅ WhatsApp opened! Our team will confirm within 30 minutes.</p>
                  </div>
                )}
              </div>

              {/* Trust signals */}
              <div className="px-5 pb-5 bg-white">
                <div className="border-t border-gray-100 pt-4 grid grid-cols-2 gap-2">
                  {[
                    ['✅', 'Free cancellation 24h'],
                    ['⚡', 'Instant confirmation'],
                    ['🏨', 'Hotel pickup included'],
                    ['🌟', '4.9/5 average rating'],
                  ].map(([icon, text]) => (
                    <div key={text} className="flex items-center gap-1.5 text-xs text-gray-600">
                      <span>{icon}</span><span>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Child pricing */}
            <div className="mt-4 rounded-2xl p-4 bg-amber-50 border border-amber-100">
              <p className="text-xs font-bold text-amber-800 mb-2">💛 Family Pricing</p>
              <div className="space-y-1 text-xs text-amber-700">
                <div className="flex justify-between"><span>Adult</span><span className="font-bold">AED {tour.pricing?.adult?.toLocaleString('en-US')}</span></div>
                <div className="flex justify-between"><span>Child (2–12 yrs)</span><span className="font-bold">AED {tour.pricing?.child?.toLocaleString('en-US')}</span></div>
                <div className="flex justify-between"><span>Infant (under 2)</span><span className="font-bold">Free</span></div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
