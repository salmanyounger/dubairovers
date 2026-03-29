'use client';
import { useState } from 'react';
import Link from 'next/link';
import FAQSection from '../../../components/FAQSection';

const TIERS = [
  { name:'Bronze', emoji:'🥉', color:'#cd7f32', commission:'8%', bookings:'1–10/month',   perks:['Unique referral link','Real-time dashboard','WhatsApp support'] },
  { name:'Silver', emoji:'🥈', color:'#a0a0a0', commission:'12%', bookings:'11–30/month',  perks:['Everything in Bronze','Priority support','Custom promo codes','Monthly payout'] },
  { name:'Gold',   emoji:'🥇', color:'#D4AF37', commission:'15%', bookings:'31+/month',    perks:['Everything in Silver','Dedicated account manager','Co-branded materials','Weekly payout','Leaderboard feature'] },
];

export default function AffiliatePage() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', website:'', country:'', type:'' });
  const [sent, setSent]   = useState(false);
  const upd = (k,v) => setForm(f=>({...f,[k]:v}));

  const handleApply = (e) => {
    e.preventDefault();
    const msg = `🤝 *Affiliate Application — DubaiRovers*\n\n👤 Name: ${form.name}\n📧 Email: ${form.email}\n📱 Phone: ${form.phone}\n🌐 Website: ${form.website||'N/A'}\n🌍 Country: ${form.country}\n📋 Type: ${form.type}\n\nPlease review my application. Thank you!`;
    window.open(`https://wa.me/971544735060?text=${encodeURIComponent(msg)}`, '_blank');
    setSent(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="py-20 text-white text-center relative overflow-hidden"
        style={{ background:'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
        <div className="container-main">
          <span className="badge-gold mb-4">🤝 Affiliate Program</span>
          <h1 className="text-4xl md:text-5xl font-black mt-3 mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>
            Earn Money Promoting<br />
            <span style={{ color:'#D4AF37' }}>Dubai Tours</span>
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto mb-8">
            Join 500+ affiliates earning up to 15% commission on every booking. Promote world-class UAE tours and earn while you sleep. 💰
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#apply" className="btn-gold text-base px-8 py-4">🚀 Apply Now — It's Free</a>
            <Link href="/affiliate/dashboard" className="btn-outline text-base px-8 py-4">📊 Affiliate Login</Link>
          </div>
          <div className="flex justify-center gap-8 mt-8 flex-wrap">
            {['💰 Up to 15% Commission','⚡ Weekly Payouts','🔗 Unique Referral Links','📊 Real-time Tracking'].map(b=>(
              <span key={b} className="text-white/70 text-sm font-medium">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-pad bg-brand-cream">
        <div className="container-main">
          <div className="text-center mb-12">
            <span className="badge-gold mb-3">📋 How It Works</span>
            <h2 className="text-3xl font-bold text-brand-navy mt-3" style={{ fontFamily:"'Playfair Display',serif" }}>
              Start Earning in 3 Steps
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step:1, emoji:'📝', title:'Apply Free',   desc:'Fill in the application below. We approve within 24 hours and set up your unique referral link.' },
              { step:2, emoji:'🔗', title:'Share & Promote', desc:'Share your link on social media, blogs, WhatsApp groups or your website. Use our ready-made marketing assets.' },
              { step:3, emoji:'💰', title:'Earn Commission', desc:'Earn up to 15% on every completed booking from your referral. Track earnings in real-time on your dashboard.' },
            ].map(s => (
              <div key={s.step} className="text-center rounded-2xl p-6 bg-white"
                style={{ boxShadow:'0 4px 24px rgba(10,22,40,0.07)' }}>
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl relative"
                  style={{ background:'linear-gradient(135deg,#D4AF37,#F0D060)' }}>
                  {s.emoji}
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-black bg-brand-navy text-brand-gold border-2 border-white">
                    {s.step}
                  </span>
                </div>
                <h3 className="font-bold text-brand-navy text-lg mb-2" style={{ fontFamily:"'Playfair Display',serif" }}>{s.title}</h3>
                <p className="text-gray-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission Tiers */}
      <section className="section-pad bg-white">
        <div className="container-main">
          <div className="text-center mb-12">
            <span className="badge-gold mb-3">💎 Commission Tiers</span>
            <h2 className="text-3xl font-bold text-brand-navy mt-3" style={{ fontFamily:"'Playfair Display',serif" }}>
              Earn More as You Grow
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TIERS.map(tier => (
              <div key={tier.name} className="rounded-3xl overflow-hidden border-2 transition-all hover:-translate-y-1"
                style={{ borderColor: tier.color+'40', boxShadow:`0 8px 32px ${tier.color}20` }}>
                <div className="p-6 text-white text-center"
                  style={{ background:`linear-gradient(135deg,${tier.color},${tier.color}cc)` }}>
                  <div className="text-5xl mb-2">{tier.emoji}</div>
                  <h3 className="text-2xl font-black">{tier.name}</h3>
                  <div className="text-4xl font-black mt-2">{tier.commission}</div>
                  <div className="text-white/80 text-sm">commission per booking</div>
                  <div className="mt-2 text-white/70 text-xs">{tier.bookings}</div>
                </div>
                <div className="p-5">
                  <ul className="space-y-2.5">
                    {tier.perks.map(p => (
                      <li key={p} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="text-emerald-500">✓</span>{p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apply Form */}
      <section id="apply" className="section-pad bg-brand-cream">
        <div className="container-main max-w-2xl">
          <div className="text-center mb-10">
            <span className="badge-gold mb-3">📝 Apply Now</span>
            <h2 className="text-3xl font-bold text-brand-navy mt-3" style={{ fontFamily:"'Playfair Display',serif" }}>
              Join the Affiliate Program
            </h2>
            <p className="text-gray-600 mt-2">Free to join · Approved within 24 hours · No minimum sales</p>
          </div>

          {sent ? (
            <div className="text-center py-10 rounded-3xl bg-white"
              style={{ boxShadow:'0 8px 40px rgba(10,22,40,0.08)' }}>
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="text-xl font-bold text-brand-navy mb-2">Application Sent!</h3>
              <p className="text-gray-500 mb-4">Our team will review and contact you within 24 hours.</p>
              <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer" className="btn-gold text-sm">
                💬 Follow Up on WhatsApp
              </a>
            </div>
          ) : (
            <form onSubmit={handleApply}
              className="rounded-3xl p-8 bg-white space-y-4"
              style={{ boxShadow:'0 8px 40px rgba(10,22,40,0.08)', border:'1px solid rgba(212,175,55,0.15)' }}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-brand-navy mb-1.5">👤 Full Name *</label>
                  <input value={form.name} onChange={e=>upd('name',e.target.value)} className="input-field" required placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-navy mb-1.5">📧 Email *</label>
                  <input type="email" value={form.email} onChange={e=>upd('email',e.target.value)} className="input-field" required placeholder="your@email.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-brand-navy mb-1.5">📱 WhatsApp *</label>
                  <input value={form.phone} onChange={e=>upd('phone',e.target.value)} className="input-field" required placeholder="+971..." />
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-navy mb-1.5">🌍 Country</label>
                  <input value={form.country} onChange={e=>upd('country',e.target.value)} className="input-field" placeholder="UAE, UK..." />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-brand-navy mb-1.5">🌐 Website / Social Media</label>
                <input value={form.website} onChange={e=>upd('website',e.target.value)} className="input-field" placeholder="https://... or @yourhandle" />
              </div>
              <div>
                <label className="block text-sm font-bold text-brand-navy mb-1.5">📋 How will you promote? *</label>
                <select value={form.type} onChange={e=>upd('type',e.target.value)} className="input-field" required>
                  <option value="">Select promotion type...</option>
                  <option>Instagram / TikTok Influencer</option>
                  <option>Travel Blog / Website</option>
                  <option>WhatsApp Groups</option>
                  <option>YouTube Channel</option>
                  <option>Hotel / Accommodation</option>
                  <option>Corporate / Business Network</option>
                  <option>Other</option>
                </select>
              </div>
              <button type="submit" className="btn-gold w-full justify-center py-4 text-base">
                🚀 Submit Application
              </button>
              <p className="text-xs text-center text-gray-400">
                By applying you agree to our affiliate terms. We'll contact you via WhatsApp & email.
              </p>
            </form>
          )}
        </div>
      </section>

      <FAQSection faqs={[
        { q:'💰 When do I get paid?', a:'Bronze tier affiliates receive monthly payouts, Silver receives monthly, and Gold receives weekly payouts. Minimum payout is AED 100. We pay via bank transfer or Western Union.' },
        { q:'🔗 How does the tracking work?', a:'Each affiliate gets a unique referral link and promo code. We track all clicks and bookings in real-time on your dashboard. Cookie duration is 30 days.' },
        { q:'📊 What marketing materials do I get?', a:'You receive branded banners, tour images, promo copy, video clips, and ready-to-share WhatsApp messages. All materials are provided in your affiliate dashboard.' },
        { q:'🌍 Can I promote worldwide tours?', a:'Yes! You can promote all 150+ tours including UAE and worldwide packages. Commission applies to all tours.' },
      ]} title="Affiliate Program FAQ" />
    </>
  );
}
