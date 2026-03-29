'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import TourCard from '../../../components/TourCard';
import FAQSection from '../../../components/FAQSection';
import { TOUR_CATEGORIES } from '../../../data/tours';
import { useData } from '../../../context/DataContext';

export default function ToursPage() {
  const { tours: TOURS } = useData();
  const [activeCategory, setActiveCategory] = useState('all');
  const [sort, setSort]     = useState('popular');
  const [view, setView]     = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [duration, setDuration]     = useState('any');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let t = [...TOURS];
    if (activeCategory !== 'all') t = t.filter(x => x.category === activeCategory);
    if (search) t = t.filter(x => x.name.toLowerCase().includes(search.toLowerCase()));
    t = t.filter(x => (x.pricing?.adult || 0) >= priceRange[0] && (x.pricing?.adult || 0) <= priceRange[1]);
    if (duration !== 'any') {
      if (duration === 'half') t = t.filter(x => x.durationMins <= 240);
      if (duration === 'full') t = t.filter(x => x.durationMins > 240 && x.durationMins <= 600);
      if (duration === 'multi') t = t.filter(x => x.durationMins > 600);
    }
    if (sort === 'popular')  t = t.sort((a,b) => (b.bookingCount||0) - (a.bookingCount||0));
    if (sort === 'rating')   t = t.sort((a,b) => b.rating - a.rating);
    if (sort === 'price-lo') t = t.sort((a,b) => (a.pricing?.adult||0) - (b.pricing?.adult||0));
    if (sort === 'price-hi') t = t.sort((a,b) => (b.pricing?.adult||0) - (a.pricing?.adult||0));
    return t;
  }, [activeCategory, sort, priceRange, duration, search]);

  return (
    <>
      {/* Header */}
      <section className="py-16 text-white text-center relative overflow-hidden"
        style={{ background:'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
        <div className="container-main">
          <span className="badge-gold mb-4">🗺️ All Tours</span>
          <h1 className="text-4xl md:text-5xl font-black mt-3 mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>
            Dubai & UAE Tours
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            150+ handpicked experiences from desert safaris to worldwide adventures. Best prices, instant confirmation, free hotel pickup.
          </p>
          <div className="mt-6">
            <div className="relative max-w-md mx-auto">
              <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="🔍 Search tours..."
                className="w-full px-5 py-3.5 rounded-full text-brand-navy font-semibold text-sm outline-none"
                style={{ background:'rgba(255,255,255,0.95)' }} />
            </div>
          </div>
        </div>
      </section>

      <div className="container-main py-8">
        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6" style={{ scrollbarWidth:'none' }}>
          <button onClick={() => setActiveCategory('all')}
            className={`category-chip shrink-0 ${activeCategory==='all' ? 'active' : ''}`}>
            🌟 All Tours
          </button>
          {TOUR_CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.slug)}
              className={`category-chip shrink-0 ${activeCategory===cat.slug ? 'active' : ''}`}>
              {cat.emoji} {cat.name}
            </button>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Filters sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="rounded-2xl p-5 sticky top-24"
              style={{ background:'#fff', boxShadow:'0 4px 24px rgba(10,22,40,0.07)', border:'1px solid #e2e8f0' }}>
              <h3 className="font-bold text-brand-navy mb-4 text-sm uppercase tracking-wide">🔧 Filters</h3>

              <div className="mb-5">
                <label className="block text-sm font-bold text-brand-navy mb-3">💰 Price Range (AED)</label>
                <div className="flex gap-2">
                  <input type="number" placeholder="Min" value={priceRange[0]||''}
                    onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
                    className="input-field text-xs py-2 px-3" />
                  <input type="number" placeholder="Max" value={priceRange[1]===10000?'':priceRange[1]}
                    onChange={e => setPriceRange([priceRange[0], +e.target.value||10000])}
                    className="input-field text-xs py-2 px-3" />
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-bold text-brand-navy mb-3">⏱️ Duration</label>
                {[
                  { value:'any',   label:'Any Duration' },
                  { value:'half',  label:'Half Day (≤4h)' },
                  { value:'full',  label:'Full Day (4–10h)' },
                  { value:'multi', label:'Multi-Day' },
                ].map(d => (
                  <label key={d.value} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input type="radio" name="duration" value={d.value} checked={duration===d.value}
                      onChange={() => setDuration(d.value)} className="accent-brand-gold" />
                    <span className="text-sm text-brand-navy">{d.label}</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-sm font-bold text-brand-navy mb-3">✨ Special</label>
                {['Instant Confirmation', 'Free Cancellation', 'Free Pickup', 'Best Seller'].map(f => (
                  <label key={f} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input type="checkbox" className="accent-brand-gold" />
                    <span className="text-sm text-brand-navy">{f}</span>
                  </label>
                ))}
              </div>

              <button onClick={() => { setActiveCategory('all'); setPriceRange([0,10000]); setDuration('any'); setSearch(''); }}
                className="mt-4 w-full py-2 rounded-xl text-xs font-bold text-gray-500 hover:text-brand-gold transition-colors border border-gray-200">
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Sort & view */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <span className="text-sm text-gray-500 font-medium">
                Showing <strong className="text-brand-navy">{filtered.length}</strong> tours
              </span>
              <div className="flex items-center gap-3">
                <select value={sort} onChange={e => setSort(e.target.value)}
                  className="input-field py-2 text-sm w-auto">
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-lo">Price: Low to High</option>
                  <option value="price-hi">Price: High to Low</option>
                </select>
                <div className="flex rounded-xl overflow-hidden border border-gray-200">
                  <button onClick={() => setView('grid')}
                    className={`px-3 py-2 text-sm transition-colors ${view==='grid' ? 'bg-brand-navy text-brand-gold' : 'text-gray-500 hover:bg-gray-50'}`}>
                    ⊞
                  </button>
                  <button onClick={() => setView('list')}
                    className={`px-3 py-2 text-sm transition-colors ${view==='list' ? 'bg-brand-navy text-brand-gold' : 'text-gray-500 hover:bg-gray-50'}`}>
                    ≡
                  </button>
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">😔</div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">No tours found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or search term</p>
                <button onClick={() => { setActiveCategory('all'); setSearch(''); }}
                  className="btn-gold">Clear Filters</button>
              </div>
            ) : view === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(tour => <TourCard key={tour.id} tour={tour} />)}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filtered.map(tour => <TourCard key={tour.id} tour={tour} variant="horizontal" />)}
              </div>
            )}
          </div>
        </div>
      </div>

      <FAQSection />
    </>
  );
}
