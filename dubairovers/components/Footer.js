'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useLang } from '../context/LanguageContext';

// ─── Real Brand SVG Icons ─────────────────────────────────────────
const Icons = {
  WhatsApp: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  ),
  Instagram: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  ),
  Facebook: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  TikTok: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.19 8.19 0 004.79 1.53V6.75a4.86 4.86 0 01-1.02-.06z"/>
    </svg>
  ),
  YouTube: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
};

const SOCIAL = [
  { href:'https://instagram.com/dubairovers',  Icon: Icons.Instagram, label:'Instagram', bg:'#E1306C' },
  { href:'https://facebook.com/dubairovers',   Icon: Icons.Facebook,  label:'Facebook',  bg:'#1877F2' },
  { href:'https://tiktok.com/@dubairovers',    Icon: Icons.TikTok,    label:'TikTok',    bg:'#000000' },
  { href:'https://youtube.com/@dubairovers',   Icon: Icons.YouTube,   label:'YouTube',   bg:'#FF0000' },
  { href:'https://wa.me/971544735060',         Icon: Icons.WhatsApp,  label:'WhatsApp',  bg:'#25D366' },
];

const FOOTER_LINKS = {
  'UAE Tours': [
    { href:'/tours/desert-safari',     label:'🏜️ Desert Safari' },
    { href:'/tours/city-tours',        label:'🏙️ City Tours' },
    { href:'/tours/water-activities',  label:'🚤 Water Activities' },
    { href:'/tours/helicopter-tours',  label:'🚁 Helicopter Tours' },
    { href:'/tours/theme-parks',       label:'🎢 Theme Parks' },
    { href:'/tours/cultural-heritage', label:'🕌 Cultural Tours' },
    { href:'/tours/worldwide-tours',   label:'🌍 Worldwide Tours' },
    { href:'/tours/airport-transfers', label:'🚗 Airport Transfers' },
  ],
  'Explore': [
    { href:'/attractions', label:'🏛️ Attractions' },
    { href:'/flights',     label:'✈️ Flights' },
    { href:'/blog',        label:'📰 Travel Blog' },
    { href:'/about',       label:'ℹ️ About Us' },
    { href:'/contact',     label:'📞 Contact Us' },
  ],
  'Partners': [
    { href:'/affiliate',           label:'🤝 Affiliate Program' },
    { href:'/ib',                  label:'🏢 List Your Tours (IB)' },
    { href:'/affiliate/dashboard', label:'📊 Affiliate Dashboard' },
    { href:'/ib/dashboard',        label:'📈 IB Dashboard' },
  ],
  'Legal': [
    { href:'/privacy',  label:'Privacy Policy' },
    { href:'/terms',    label:'Terms & Conditions' },
    { href:'/sitemap',  label:'Sitemap' },
  ],
};

export default function Footer() {
  const [email,     setEmail]     = useState('');
  const [subStatus, setSubStatus] = useState('');
  const { tr } = useLang();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubStatus('subscribed');
    setEmail('');
    setTimeout(() => setSubStatus(''), 4000);
  };

  return (
    <footer style={{ background: 'var(--navy)', color: '#fff' }}>
      <div className="h-0.5 w-full" style={{ background:'linear-gradient(90deg,transparent,#D4AF37,transparent)' }}/>

      {/* Newsletter */}
      <div style={{ background:'linear-gradient(135deg,#1E3A5F,#2D5986)', borderBottom:'1px solid rgba(212,175,55,0.15)' }}>
        <div className="container-main py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1" style={{ fontFamily:"'Playfair Display',serif" }}>
              {tr('footer','newsletter_title')}
            </h3>
            <p className="text-white/70 text-sm">{tr('footer','newsletter_sub')}</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex gap-3 w-full md:w-auto">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com" className="input-field flex-1 md:w-72" required />
            <button type="submit" className="btn-gold shrink-0">{tr('footer','subscribe')}</button>
          </form>
          {subStatus === 'subscribed' && (
            <p className="text-emerald-400 text-sm font-semibold">✅ Subscribed! Welcome to DubaiRovers.</p>
          )}
        </div>
      </div>

      {/* Main */}
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background:'linear-gradient(135deg,#D4AF37,#F0D060,#A88620)' }}>
                <span className="text-2xl font-black text-brand-navy" style={{ fontFamily:"'Playfair Display',serif" }}>D</span>
              </div>
              <div>
                <div className="text-white font-black text-xl" style={{ fontFamily:"'Playfair Display',serif" }}>
                  DUBAI<span style={{ color:'#D4AF37' }}>ROVERS</span>
                </div>
                <div className="text-xs font-medium" style={{ color:'rgba(212,175,55,0.6)', letterSpacing:'0.15em' }}>TOURS & TRAVEL</div>
              </div>
            </Link>

            <p className="text-white/60 text-sm leading-relaxed mb-6">{tr('footer','tagline')}</p>

            <div className="space-y-3 text-sm mb-6">
              <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/80 hover:text-brand-gold transition-colors group">
                <span className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-white"
                  style={{ background:'rgba(37,211,102,0.2)', border:'1px solid rgba(37,211,102,0.3)' }}>
                  <Icons.WhatsApp />
                </span>
                <span>+971 54 473 5060</span>
              </a>
              <a href="mailto:dbtis.com@gmail.com"
                className="flex items-center gap-3 text-white/80 hover:text-brand-gold transition-colors">
                <span className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background:'rgba(212,175,55,0.15)', border:'1px solid rgba(212,175,55,0.2)' }}>
                  📧
                </span>
                <span>dbtis.com@gmail.com</span>
              </a>
              <div className="flex items-center gap-3 text-white/80">
                <span className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background:'rgba(212,175,55,0.15)', border:'1px solid rgba(212,175,55,0.2)' }}>📍</span>
                <span>Dubai, United Arab Emirates 🇦🇪</span>
              </div>
            </div>

            {/* Social icons - real brand SVGs */}
            <div className="flex gap-2.5">
              {SOCIAL.map(({ href, Icon, label, bg }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  title={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:opacity-100 opacity-80"
                  style={{ background: bg }}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-bold text-sm mb-4 uppercase tracking-wider" style={{ color:'#D4AF37' }}>
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white/60 hover:text-brand-gold text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3">
            {['🔒 SSL Secure','✅ UAE Licensed','⭐ 4.9/5 Rated','🌍 50,000+ Guests','🏆 Best Tour 2024'].map(b => (
              <span key={b} className="px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background:'rgba(212,175,55,0.1)', border:'1px solid rgba(212,175,55,0.2)', color:'rgba(212,175,55,0.9)' }}>
                {b}
              </span>
            ))}
          </div>
          <div className="flex gap-3 text-xs text-white/40 flex-wrap">
            <span>💳 Visa</span><span>💳 Mastercard</span><span>💵 Cash</span><span>🏦 Transfer</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <p>{tr('footer','copy')}</p>
          <p>
            <Link href="/admin" className="hover:text-brand-gold opacity-30 hover:opacity-100">Admin</Link>
            {' · '}
            <Link href="/privacy" className="hover:text-brand-gold">Privacy</Link>
            {' · '}
            <Link href="/terms" className="hover:text-brand-gold">Terms</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
