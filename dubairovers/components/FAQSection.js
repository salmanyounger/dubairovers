'use client';
import { useState } from 'react';
import { GENERAL_FAQS } from '../data/tours';

export default function FAQSection({ faqs, title = 'Frequently Asked Questions' }) {
  const [open, setOpen] = useState(null);
  const items = faqs || GENERAL_FAQS;

  return (
    <section className="section-pad bg-brand-cream">
      <div className="container-main max-w-3xl">
        <div className="text-center mb-12">
          <span className="badge-gold mb-3">❓ FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mt-3" style={{ fontFamily:"'Playfair Display',serif" }}>
            {title}
          </h2>
          <p className="text-gray-600 mt-3">Everything you need to know before booking your tour</p>
        </div>

        <div className="rounded-3xl overflow-hidden" style={{ background:'#fff', boxShadow:'0 8px 40px rgba(10,22,40,0.08)', border:'1px solid rgba(212,175,55,0.15)' }}>
          {items.map((faq, i) => (
            <div key={i} className="faq-item">
              <button className="faq-question px-6" onClick={() => setOpen(open===i ? null : i)}>
                <span className="pr-4 text-left">{faq.q}</span>
                <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                  open===i ? 'bg-brand-gold text-brand-navy rotate-180' : 'bg-gray-100 text-gray-500'
                }`} style={{ fontSize:'12px' }}>
                  ▼
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed animate-slide-up">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">Still have questions? We're happy to help!</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
              className="btn-gold text-sm px-5 py-2.5">💬 WhatsApp Us</a>
            <a href="mailto:dbtis.com@gmail.com"
              className="btn-outline text-sm px-5 py-2.5">📧 Email Us</a>
          </div>
        </div>
      </div>
    </section>
  );
}
