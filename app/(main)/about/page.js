import Image from 'next/image';
import Link from 'next/link';
import FAQSection from '../../../components/FAQSection';
import { STATS } from '../../../data/tours';

export const metadata = {
  title: 'About DubaiRovers | Dubai\'s Trusted Tour Operator Since 2019',
  description: 'Learn about DubaiRovers — Dubai\'s premier tour operator with 50,000+ happy guests, 150+ tours and worldwide travel experiences. Meet our team and our story.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 text-white overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1600&q=85"
          alt="Dubai skyline — About DubaiRovers" fill className="object-cover" sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" />
        <div className="absolute inset-0" style={{ background:'linear-gradient(135deg,rgba(10,22,40,0.85),rgba(30,58,95,0.8))' }} />
        <div className="container-main relative z-10 text-center">
          <span className="badge-gold mb-4">ℹ️ Our Story</span>
          <h1 className="text-4xl md:text-6xl font-black mt-3 mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>
            Dubai's Most Trusted<br />
            <span style={{ color:'#D4AF37' }}>Tour Operator</span>
          </h1>
          <p className="text-white/80 text-xl max-w-2xl mx-auto">
            Since 2019, we've been crafting unforgettable travel experiences for guests from over 80 countries. Welcome to the DubaiRovers family. 🌍
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12" style={{ background:'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
        <div className="container-main grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s,i) => (
            <div key={i}>
              <div className="text-4xl mb-2">{s.emoji}</div>
              <div className="text-3xl font-black text-brand-gold">{s.value}{s.suffix}</div>
              <div className="text-white/60 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="section-pad bg-white">
        <div className="container-main max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge-gold mb-4">📖 Our Story</span>
              <h2 className="text-3xl font-bold text-brand-navy mt-3 mb-5" style={{ fontFamily:"'Playfair Display',serif" }}>
                From a Passion for Dubai to 50,000+ Happy Guests
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                DubaiRovers was born from a deep love for Dubai and a desire to share its magic with the world. What started as a small team of passionate local guides has grown into Dubai's most trusted tour operator.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                We've personally explored every corner of the UAE — from the red dunes of the Al Qudra desert to the crystal waters of Khor Kalba — so we can design the most authentic, memorable experiences for our guests.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we offer 150+ tours across UAE and 50+ worldwide destinations, with a team of 30+ expert guides fluent in English, Arabic, Russian, Chinese and more.
              </p>
            </div>
            <div className="relative h-80 rounded-3xl overflow-hidden">
              <Image src="https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800&q=85"
                alt="Dubai desert — DubaiRovers story" fill className="object-cover" sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" />
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl p-4"
                style={{ background:'rgba(10,22,40,0.85)', backdropFilter:'blur(8px)' }}>
                <div className="text-brand-gold font-bold text-sm">🏆 Award-Winning Service</div>
                <div className="text-white/70 text-xs mt-0.5">Best Tour Operator Dubai 2024</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-pad bg-brand-cream">
        <div className="container-main">
          <div className="text-center mb-12">
            <span className="badge-gold mb-3">💎 Our Values</span>
            <h2 className="text-3xl font-bold text-brand-navy mt-3" style={{ fontFamily:"'Playfair Display',serif" }}>
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { emoji:'🌟', title:'Excellence First',   desc:'Every tour is designed to exceed expectations, from pickup to drop-off.' },
              { emoji:'🤝', title:'Honest & Transparent', desc:'Clear pricing, no hidden fees, and honest advice on every tour.' },
              { emoji:'🌍', title:'Sustainable Tourism', desc:'We respect local culture, the environment, and responsible travel.' },
              { emoji:'💡', title:'Innovation',         desc:'Always improving — better tech, better guides, better experiences.' },
              { emoji:'❤️', title:'Guest-First',        desc:'Your satisfaction is our success. We go above and beyond every time.' },
              { emoji:'🔒', title:'Safety & Security',  desc:'All tours follow strict safety standards with insured vehicles and guides.' },
            ].map(v => (
              <div key={v.title} className="rounded-2xl p-6 bg-white"
                style={{ boxShadow:'0 4px 20px rgba(10,22,40,0.06)' }}>
                <div className="text-3xl mb-3">{v.emoji}</div>
                <h3 className="font-bold text-brand-navy mb-2" style={{ fontFamily:"'Playfair Display',serif" }}>{v.title}</h3>
                <p className="text-gray-500 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-pad" style={{ background:'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
        <div className="container-main text-center">
          <h2 className="text-3xl font-bold text-white mb-10" style={{ fontFamily:"'Playfair Display',serif" }}>
            🏅 Trusted, Certified & Recognised
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              '✅ UAE Tourism Licensed',
              '🔒 SSL Secured',
              '⭐ TripAdvisor Excellence Award',
              '🌍 50+ Countries Served',
              '📋 DTCM Registered',
              '💳 PCI-DSS Compliant',
            ].map(b => (
              <div key={b} className="px-5 py-3 rounded-full font-semibold text-sm"
                style={{ background:'rgba(212,175,55,0.12)', border:'1px solid rgba(212,175,55,0.3)', color:'rgba(212,175,55,0.9)' }}>
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad bg-brand-cream">
        <div className="container-main text-center">
          <h2 className="text-3xl font-bold text-brand-navy mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>
            Ready to Explore Dubai with Us?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Join 50,000+ travellers who've chosen DubaiRovers. Book your dream tour today.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/tours" className="btn-gold">🗺️ Browse Tours</Link>
            <Link href="/contact" className="btn-navy">📞 Contact Us</Link>
          </div>
        </div>
      </section>

      <FAQSection />
    </>
  );
}
