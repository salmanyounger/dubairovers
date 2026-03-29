'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import BookingSidebar from '../../../../../components/BookingSidebar';
import FAQSection from '../../../../../components/FAQSection';
import { useCurrency } from '../../../../../context/CurrencyContext';

function Stars({ rating, size = 'sm' }) {
  const s = size === 'lg' ? 'w-5 h-5' : 'w-3.5 h-3.5';
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className={`${s} ${i<=Math.round(rating)?'text-amber-400':'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Gallery({ images, name }) {
  const [active,   setActive]   = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const safeImages = images?.length ? images : ['https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=1200&q=85'];

  return (
    <>
      <div className="grid grid-cols-4 gap-2 rounded-2xl overflow-hidden" style={{ height:'420px' }}>
        <div className="col-span-2 relative cursor-pointer overflow-hidden group" style={{ gridRow:'span 2' }}
          onClick={() => { setActive(0); setLightbox(true); }}>
          <Image src={safeImages[0]} alt={name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" priority />
        </div>
        {safeImages.slice(1, 5).map((img, i) => (
          <div key={i} className="relative cursor-pointer overflow-hidden group"
            onClick={() => { setActive(i+1); setLightbox(true); }}>
            <Image src={img} alt={`${name} ${i+2}`} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            {i === 3 && safeImages.length > 5 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-bold text-lg">+{safeImages.length-5}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}>
          <button className="absolute top-4 right-4 text-white text-3xl w-10 h-10 flex items-center justify-center">✕</button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl"
            onClick={e => { e.stopPropagation(); setActive(a => (a-1+safeImages.length)%safeImages.length); }}>‹</button>
          <div className="relative w-full max-w-4xl" style={{ aspectRatio:'16/9' }} onClick={e => e.stopPropagation()}>
            <Image src={safeImages[active]} alt={name} fill className="object-contain" />
          </div>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl"
            onClick={e => { e.stopPropagation(); setActive(a => (a+1)%safeImages.length); }}>›</button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {safeImages.map((_, i) => (
              <button key={i} onClick={e => { e.stopPropagation(); setActive(i); }}
                className={`h-2 rounded-full transition-all ${i===active?'bg-brand-gold w-5':'bg-white/50 w-2'}`} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

const TABS = ['overview', 'itinerary', 'inclusions', 'reviews', 'location'];

export default function TourDetailClient({ tour }) {
  const [itinOpen,    setItinOpen]    = useState(null);
  const [activeTab,   setActiveTab]   = useState('overview');
  const { convert, currency } = useCurrency();

  const tourFaqs = [
    { q:`❓ What is included in the ${tour.name}?`, a: tour.inclusions?.map(i=>i.replace('✅ ','')).join(', ') + '.' },
    { q:'📍 Where does the tour depart from?',     a: tour.meetingPoint || 'Hotel pickup included.' },
    { q:'👦 What is the minimum age?',             a: `Minimum age is ${tour.minAge} years old.` },
    { q:'🔄 What is the cancellation policy?',     a: tour.cancellation },
    { q:'🌍 What languages is this tour in?',      a: tour.languages?.join(', ') || 'English, Arabic' },
    { q:'👥 How large are the groups?',            a: `Groups range from ${tour.groupSize?.min} to ${tour.groupSize?.max} people.` },
  ];

  const reviews = [
    { name:'Sarah M.', country:'🇬🇧', rating:5, text:'Absolutely incredible experience! Everything was perfectly organised and our guide was fantastic.', date:'2 weeks ago' },
    { name:'Ahmed R.', country:'🇸🇦', rating:5, text:'Best tour in Dubai without a doubt. Value for money is excellent and the service was 5 star.', date:'1 month ago' },
    { name:'Elena V.', country:'🇷🇺', rating:4, text:'Amazing experience overall. The pickup was on time and the activities were exciting. Highly recommended!', date:'3 weeks ago' },
  ];

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-brand-cream border-b border-gray-100">
        <div className="container-main py-3 text-sm text-gray-500 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-brand-gold">Home</Link> /
          <Link href="/tours" className="hover:text-brand-gold">Tours</Link> /
          <Link href={`/tours/${tour.category}`} className="hover:text-brand-gold capitalize">{tour.category.replace(/-/g,' ')}</Link> /
          <span className="text-brand-navy font-semibold truncate max-w-[200px]">{tour.name}</span>
        </div>
      </div>

      <div className="container-main py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Title */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-3">
                {tour.tag && <span className="badge-gold">{tour.tag}</span>}
                {tour.instantConfirmation && <span className="badge-green">⚡ Instant Confirmation</span>}
                {tour.mobileVoucher && <span className="badge-navy">📱 Mobile Voucher</span>}
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-brand-navy mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>
                {tour.name}
              </h1>
              <div className="flex items-center gap-5 flex-wrap text-sm">
                <div className="flex items-center gap-1.5">
                  <Stars rating={tour.rating} />
                  <span className="font-bold text-amber-500">{tour.rating}</span>
                  <span className="text-gray-400">({tour.reviewCount?.toLocaleString('en-US')} reviews)</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">📅 {tour.bookingCount?.toLocaleString('en-US')} bookings</span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">⏱️ {tour.duration}</span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">👥 Max {tour.groupSize?.max}</span>
              </div>
            </div>

            {/* Gallery */}
            <div className="mb-8">
              <Gallery images={tour.images} name={tour.name} />
            </div>

            {/* Tabs */}
            <div className="flex gap-1 overflow-x-auto mb-6 pb-1" style={{ scrollbarWidth:'none' }}>
              {TABS.map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                    activeTab===tab ? 'text-brand-navy' : 'text-gray-500 hover:text-brand-navy hover:bg-gray-100'
                  }`}
                  style={activeTab===tab ? { background:'linear-gradient(135deg,#D4AF37,#F0D060)' } : {}}>
                  {tab.charAt(0).toUpperCase()+tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab: Overview */}
            {activeTab === 'overview' && (
              <div className="animate-fade-in">
                <p className="text-gray-600 leading-relaxed mb-8 text-base">{tour.description}</p>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-brand-navy mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>🌟 Tour Highlights</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {tour.highlights?.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50">
                        <span className="text-lg shrink-0">{h.split(' ')[0]}</span>
                        <span className="text-brand-navy text-sm font-medium">{h.split(' ').slice(1).join(' ')}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-brand-navy mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>💰 Pricing</h2>
                  <div className="rounded-2xl overflow-hidden border border-gray-100">
                    {[
                      { label:'👤 Adult (12+ years)', price: tour.pricing?.adult },
                      { label:'👦 Child (3–11 years)', price: tour.pricing?.child },
                      { label:'👶 Infant (0–2 years)', price: 0 },
                    ].map((row, i) => (
                      <div key={i} className={`flex items-center justify-between px-5 py-4 ${i%2===0?'bg-white':'bg-gray-50'}`}>
                        <span className="font-semibold text-brand-navy text-sm">{row.label}</span>
                        <span className="font-black text-brand-navy text-lg">{row.price === 0 ? 'FREE' : `AED ${row.price}`}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Itinerary */}
            {activeTab === 'itinerary' && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-bold text-brand-navy mb-6" style={{ fontFamily:"'Playfair Display',serif" }}>📅 Itinerary</h2>
                {tour.itinerary?.length > 0 ? (
                  <div className="space-y-3">
                    {tour.itinerary.map((item, i) => (
                      <div key={i} className="rounded-2xl overflow-hidden border border-gray-100">
                        <button className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-amber-50 transition-colors"
                          onClick={() => setItinOpen(itinOpen===i ? null : i)}>
                          <span className="text-xs font-black text-brand-gold bg-amber-50 px-2 py-1 rounded-lg w-16 text-center shrink-0">{item.time}</span>
                          <span className="font-bold text-brand-navy text-sm flex-1">{item.title}</span>
                          <span className={`text-gray-400 transition-transform ${itinOpen===i?'rotate-180':''}`}>▼</span>
                        </button>
                        {itinOpen===i && (
                          <div className="px-5 pb-4 pl-24 text-sm text-gray-600 animate-slide-up">{item.desc}</div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <p>Detailed itinerary available on request. <a href="https://wa.me/971544735060" className="text-brand-gold font-semibold">WhatsApp us</a></p>
                  </div>
                )}
              </div>
            )}

            {/* Tab: Inclusions */}
            {activeTab === 'inclusions' && (
              <div className="animate-fade-in grid sm:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-bold text-brand-navy mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>✅ Included</h2>
                  <div className="space-y-2.5">
                    {tour.inclusions?.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <span className="text-emerald-500 shrink-0">✅</span>
                        <span>{item.replace('✅ ','')}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-brand-navy mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>❌ Not Included</h2>
                  <div className="space-y-2.5">
                    {tour.exclusions?.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <span className="text-red-400 shrink-0">❌</span>
                        <span>{item.replace('❌ ','')}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Reviews */}
            {activeTab === 'reviews' && (
              <div className="animate-fade-in">
                <div className="flex items-center gap-6 mb-8 p-6 rounded-2xl bg-amber-50">
                  <div className="text-center">
                    <div className="text-6xl font-black text-brand-navy">{tour.rating}</div>
                    <Stars rating={tour.rating} size="lg" />
                    <div className="text-sm text-gray-500 mt-1">{tour.reviewCount?.toLocaleString('en-US')} reviews</div>
                  </div>
                  <div className="flex-1">
                    {[5,4,3,2,1].map(n => (
                      <div key={n} className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs text-gray-500 w-3">{n}</span>
                        <span className="text-amber-400 text-xs">★</span>
                        <div className="progress-bar flex-1">
                          <div className="progress-fill" style={{ width: n===5?'85%':n===4?'12%':n===3?'2%':'1%' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  {reviews.map((r, i) => (
                    <div key={i} className="rounded-2xl p-5 border border-gray-100">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-brand-navy text-sm"
                            style={{ background:'linear-gradient(135deg,#D4AF37,#F0D060)' }}>
                            {r.name[0]}
                          </div>
                          <div>
                            <div className="font-bold text-brand-navy text-sm">{r.name} {r.country}</div>
                            <Stars rating={r.rating} />
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">{r.date}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab: Location */}
            {activeTab === 'location' && (
              <div className="animate-fade-in">
                <h2 className="text-xl font-bold text-brand-navy mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>📍 Meeting Point</h2>
                <div className="rounded-2xl p-4 bg-amber-50 mb-4">
                  <p className="text-brand-navy font-semibold text-sm">🏨 {tour.meetingPoint}</p>
                </div>
                <div className="map-container">
                  <iframe
                    src={`https://maps.google.com/maps?q=${tour.location?.lat || 25.2048},${tour.location?.lng || 55.2708}&zoom=12&output=embed`}
                    title={`Map — ${tour.name}`} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                </div>
              </div>
            )}
          </div>

          {/* Sticky Booking Sidebar */}
          <div className="lg:w-80 shrink-0">
            <div className="sticky top-6">
              <BookingSidebar tour={tour} />
            </div>
          </div>
        </div>
      </div>
      </div>

      <FAQSection faqs={tourFaqs} title={`${tour.name} — FAQ`} />
    </>
  );
}
