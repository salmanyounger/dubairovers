import TourCard from '../../../../components/TourCard';
import FAQSection from '../../../../components/FAQSection';
import { TOURS, TOUR_CATEGORIES } from '../../../../data/tours';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export async function generateMetadata({ params }) {
  const cat = TOUR_CATEGORIES.find(c => c.slug === params.category);
  if (!cat) return {};
  return { title: cat.seoTitle, description: cat.seoDesc };
}

export async function generateStaticParams() {
  return TOUR_CATEGORIES.map(c => ({ category: c.slug }));
}

export default function CategoryPage({ params }) {
  const cat = TOUR_CATEGORIES.find(c => c.slug === params.category);
  if (!cat) notFound();

  const tours = TOURS.filter(t => t.category === params.category);

  return (
    <>
      {/* Hero */}
      <section className="relative py-20 text-white text-center overflow-hidden">
        <Image src={cat.image} alt={cat.name} fill className="object-cover" />
        <div className="absolute inset-0" style={{ background:'linear-gradient(180deg,rgba(10,22,40,0.75) 0%,rgba(10,22,40,0.6) 100%)' }} />
        <div className="container-main relative z-10">
          <div className="text-5xl mb-4">{cat.emoji}</div>
          <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>
            {cat.name}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-6">{cat.description}</p>
          <div className="flex items-center justify-center gap-4 text-sm text-white/70">
            <span>📦 {cat.tourCount} tours available</span>
            <span>·</span>
            <span>⭐ 4.9/5 average rating</span>
            <span>·</span>
            <span>⚡ Instant confirmation</span>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-brand-cream border-b border-gray-100">
        <div className="container-main py-3 text-sm text-gray-500 flex items-center gap-2">
          <Link href="/" className="hover:text-brand-gold">Home</Link> /
          <Link href="/tours" className="hover:text-brand-gold">Tours</Link> /
          <span className="text-brand-navy font-semibold">{cat.name}</span>
        </div>
      </div>

      {/* Tours Grid */}
      <section className="section-pad bg-white">
        <div className="container-main">
          {tours.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tours.map(tour => <TourCard key={tour.id} tour={tour} />)}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">🚧</div>
              <h3 className="text-2xl font-bold text-brand-navy mb-2">Tours Coming Soon!</h3>
              <p className="text-gray-500 mb-6">We're adding more {cat.name} tours. Contact us to book!</p>
              <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer" className="btn-gold">
                💬 Ask on WhatsApp
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Other categories */}
      <section className="section-pad bg-brand-cream">
        <div className="container-main">
          <h2 className="text-2xl font-bold text-brand-navy mb-6" style={{ fontFamily:"'Playfair Display',serif" }}>
            Explore Other Categories
          </h2>
          <div className="flex flex-wrap gap-3">
            {TOUR_CATEGORIES.filter(c => c.slug !== params.category).map(c => (
              <Link key={c.id} href={`/tours/${c.slug}`} className="category-chip">
                {c.emoji} {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />
    </>
  );
}
