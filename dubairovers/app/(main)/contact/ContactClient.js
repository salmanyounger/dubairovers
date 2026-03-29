'use client';
import { useState } from 'react';
import FAQSection from '../../../components/FAQSection';

const CONTACT_CARDS = [
  { emoji:'💬', title:'WhatsApp', desc:'Chat with us instantly', value:'+971 54 473 5060', href:'https://wa.me/971544735060', color:'#25D366', cta:'Open WhatsApp' },
  { emoji:'📧', title:'Email',    desc:'We reply within 2 hours', value:'dbtis.com@gmail.com', href:'mailto:dbtis.com@gmail.com', color:'#EA4335', cta:'Send Email' },
  { emoji:'📍', title:'Location', desc:'Visit our Dubai office',  value:'Dubai, UAE 🇦🇪',    href:'https://maps.google.com/?q=Dubai,UAE', color:'#4285F4', cta:'Get Directions' },
  { emoji:'⏰', title:'Hours',    desc:"We're always available", value:'24/7 WhatsApp Support', href:'https://wa.me/971544735060', color:'#D4AF37', cta:'Contact Now' },
];

export default function ContactClient() {
  const [form,   setForm]   = useState({ name:'', email:'', phone:'', subject:'', message:'' });
  const [status, setStatus] = useState('');
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const { default: emailjs } = await import('@emailjs/browser');
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  || 'YOUR_SERVICE_ID',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        { ...form, to_email: 'dbtis.com@gmail.com' },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  || 'YOUR_PUBLIC_KEY'
      );
      setStatus('sent');
      setForm({ name:'', email:'', phone:'', subject:'', message:'' });
    } catch {
      const msg = `📩 *Contact Form — DubaiRovers*\n\n👤 Name: ${form.name}\n📧 Email: ${form.email}\n📱 Phone: ${form.phone}\n📋 Subject: ${form.subject}\n\n💬 Message:\n${form.message}`;
      window.open(`https://wa.me/971544735060?text=${encodeURIComponent(msg)}`, '_blank');
      setStatus('sent');
    }
  };

  return (
    <>
      <section className="py-20 text-white text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
        <div className="container-main">
          <span className="badge-gold mb-4">📞 Get in Touch</span>
          <h1 className="text-4xl md:text-5xl font-black mt-3 mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>
            Contact DubaiRovers
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Have a question? Ready to book? Our friendly team is available 24/7 to help plan your perfect Dubai experience.
          </p>
        </div>
      </section>

      <div className="container-main py-16">
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {CONTACT_CARDS.map(c => (
            <a key={c.title} href={c.href} target={c.href.startsWith('http') ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="rounded-2xl p-6 text-center transition-all hover:-translate-y-2 group"
              style={{ background:'#fff', boxShadow:'0 4px 24px rgba(10,22,40,0.07)', border:'1px solid #e2e8f0' }}>
              <div className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center text-2xl"
                style={{ background:`${c.color}15`, border:`2px solid ${c.color}30` }}>
                {c.emoji}
              </div>
              <h3 className="font-bold text-brand-navy mb-1">{c.title}</h3>
              <p className="text-gray-400 text-xs mb-2">{c.desc}</p>
              <p className="text-brand-navy font-semibold text-sm mb-3">{c.value}</p>
              <span className="text-xs font-bold px-3 py-1 rounded-full"
                style={{ background:`${c.color}15`, color: c.color }}>
                {c.cta} →
              </span>
            </a>
          ))}
        </div>

        {/* Form + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="rounded-3xl p-8" style={{ background:'#fff', boxShadow:'0 8px 48px rgba(10,22,40,0.08)', border:'1px solid rgba(212,175,55,0.15)' }}>
            <h2 className="text-2xl font-bold text-brand-navy mb-6" style={{ fontFamily:"'Playfair Display',serif" }}>
              ✉️ Send Us a Message
            </h2>
            {status === 'sent' ? (
              <div className="text-center py-10">
                <div className="text-5xl mb-3">🎉</div>
                <h3 className="text-xl font-bold text-brand-navy mb-2">Message Sent!</h3>
                <p className="text-gray-500 mb-4">We'll get back to you within 30 minutes.</p>
                <button onClick={() => setStatus('')} className="btn-gold text-sm px-5">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-brand-navy mb-1.5">👤 Full Name *</label>
                    <input value={form.name} onChange={e => upd('name', e.target.value)}
                      placeholder="John Smith" className="input-field" required />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-navy mb-1.5">📱 Phone</label>
                    <input value={form.phone} onChange={e => upd('phone', e.target.value)}
                      placeholder="+971 xx xxx xxxx" className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-navy mb-1.5">📧 Email *</label>
                  <input type="email" value={form.email} onChange={e => upd('email', e.target.value)}
                    placeholder="john@email.com" className="input-field" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-navy mb-1.5">📋 Subject *</label>
                  <select value={form.subject} onChange={e => upd('subject', e.target.value)} className="input-field" required>
                    <option value="">Select a subject...</option>
                    <option>🗺️ Tour Booking Enquiry</option>
                    <option>🏛️ Attraction Tickets</option>
                    <option>✈️ Flight Booking</option>
                    <option>🤝 Affiliate Program</option>
                    <option>🏢 IB / Company Partnership</option>
                    <option>💬 General Enquiry</option>
                    <option>🔄 Cancellation / Amendment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-brand-navy mb-1.5">💬 Message *</label>
                  <textarea value={form.message} onChange={e => upd('message', e.target.value)}
                    rows={5} placeholder="Tell us how we can help you..."
                    className="input-field resize-none" required />
                </div>
                <button type="submit" disabled={status === 'sending'}
                  className="btn-gold w-full justify-center py-4">
                  {status === 'sending' ? '⏳ Sending...' : '📤 Send Message'}
                </button>
                <p className="text-xs text-gray-400 text-center">
                  Or contact us directly on{' '}
                  <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
                    className="text-emerald-500 font-semibold">WhatsApp +971544735060</a>
                </p>
              </form>
            )}
          </div>

          <div className="space-y-5">
            <div className="map-container rounded-2xl">
              <iframe src="https://maps.google.com/maps?q=Dubai,UAE&zoom=10&output=embed"
                title="DubaiRovers Location — Dubai UAE" allowFullScreen loading="lazy" />
            </div>
            <div className="rounded-2xl p-6" style={{ background:'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
              <h3 className="text-white font-bold text-lg mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>
                🌟 Quick Connect
              </h3>
              <div className="space-y-3">
                {[
                  { href:'https://wa.me/971544735060', icon:'💬', bg:'rgba(37,211,102,0.2)', title:'WhatsApp (Fastest)', sub:'+971 54 473 5060 · Reply in 2 min' },
                  { href:'mailto:dbtis.com@gmail.com',  icon:'📧', bg:'rgba(212,175,55,0.2)', title:'Email',             sub:'dbtis.com@gmail.com · Reply in 2 hrs' },
                ].map(item => (
                  <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/10">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                      style={{ background: item.bg }}>{item.icon}</div>
                    <div>
                      <div className="text-white font-bold text-sm">{item.title}</div>
                      <div className="text-white/60 text-xs">{item.sub}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <FAQSection />
    </>
  );
}
