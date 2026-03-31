'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useLang } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';

// Top countries to show in mega menu
const MEGA_COUNTRIES = [
  { id:'saudi-arabia',  flag:'🇸🇦', name:'Saudi Arabia',  tours:['Riyadh City Tour','AlUla Ancient City','Edge of the World'] },
  { id:'jordan',        flag:'🇯🇴', name:'Jordan',         tours:['Petra Day Trip','Wadi Rum Desert','Dead Sea Float'] },
  { id:'egypt',         flag:'🇪🇬', name:'Egypt',          tours:['Cairo & Pyramids','Nile River Cruise','Luxor & Karnak'] },
  { id:'turkey',        flag:'🇹🇷', name:'Turkey',         tours:['Istanbul 3 Days','Cappadocia Balloon','Ephesus Ruins'] },
  { id:'morocco',       flag:'🇲🇦', name:'Morocco',        tours:['Marrakech Medina','Sahara Desert Camp','Fes Medina'] },
  { id:'oman',          flag:'🇴🇲', name:'Oman',           tours:['Musandam Fjords','Wahiba Sands','Jebel Akhdar'] },
  { id:'france',        flag:'🇫🇷', name:'France',         tours:['Paris City Tour','Versailles Day Trip','Loire Valley'] },
  { id:'italy',         flag:'🇮🇹', name:'Italy',          tours:['Rome 3 Days','Amalfi Coast','Tuscany Wine Tour'] },
  { id:'spain',         flag:'🇪🇸', name:'Spain',          tours:['Barcelona 3 Days','Madrid City Tour','Seville & Flamenco'] },
  { id:'japan',         flag:'🇯🇵', name:'Japan',          tours:['Tokyo 5 Days','Kyoto Temples','Mount Fuji Day Trip'] },
  { id:'thailand',      flag:'🇹🇭', name:'Thailand',       tours:['Bangkok 4 Days','Chiang Mai Elephants','Phuket Islands'] },
  { id:'india',         flag:'🇮🇳', name:'India',          tours:['Taj Mahal Tour','Kerala Backwaters','Rajasthan Circuit'] },
  { id:'maldives',      flag:'🇲🇻', name:'Maldives',       tours:['Island Hopping','Overwater Villa','Snorkelling Safari'] },
  { id:'greece',        flag:'🇬🇷', name:'Greece',         tours:['Santorini Tour','Athens Acropolis','Island Hopping'] },
  { id:'uk',            flag:'🇬🇧', name:'United Kingdom', tours:['London City Tour','Scottish Highlands','Edinburgh Castle'] },
  { id:'kenya',         flag:'🇰🇪', name:'Kenya',          tours:['Masai Mara Safari','Amboseli Elephants','Nairobi City'] },
];

export default function Header() {
  const [scrolled,      setScrolled]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [activeDrop,    setActiveDrop]    = useState(null);
  const [activeCountry, setActiveCountry] = useState(MEGA_COUNTRIES[0]);
  const [langOpen,      setLangOpen]      = useState(false);
  const [currOpen,      setCurrOpen]      = useState(false);
  const pathname = usePathname();
  const router   = useRouter();
  const dropRef  = useRef(null);
  const { lang, setLang, tr, langs, currentLang } = useLang();
  const { currency, setCurrency, currencies }      = useCurrency();

  const TOUR_CATS = [
    { href:'/tours/desert-safari',    label:'🏜️ ' + (lang==='ar'?'سفاري الصحراء':'Desert Safari') },
    { href:'/tours/city-tours',       label:'🏙️ ' + (lang==='ar'?'جولات المدينة':'City Tours') },
    { href:'/tours/water-activities', label:'🚤 ' + (lang==='ar'?'أنشطة مائية':'Water Activities') },
    { href:'/tours/helicopter-tours', label:'🚁 ' + (lang==='ar'?'هليكوبتر':'Helicopter Tours') },
    { href:'/tours/theme-parks',      label:'🎢 ' + (lang==='ar'?'مدن الملاهي':'Theme Parks') },
  ];

  const NAV_LINKS = [
    { href:'/tours',        emoji:'🗺️', label: tr('nav','tours'), hasMega: true },
    { href:'/attractions',  emoji:'🏛️', label: tr('nav','attractions') },
    { href:'/flights',      emoji:'✈️', label: tr('nav','flights') },
    { href:'/blog',         emoji:'📰', label: tr('nav','blog') },
    { href:'/about',        emoji:'ℹ️', label: tr('nav','about') },
    { href:'/contact',      emoji:'📞', label: tr('nav','contact') },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setActiveDrop(null); }, [pathname]);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setActiveDrop(null); setLangOpen(false); setCurrOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isHome = pathname === '/';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHome ? 'bg-brand-navy header-scrolled' : 'header-hero'
        }`}
        style={{ height: 'var(--header-h)' }}>

        <div className="container-main h-full flex items-center justify-between gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#D4AF37,#F0D060,#A88620)' }}>
              <span className="text-xl font-black text-brand-navy" style={{ fontFamily:"'Playfair Display',serif" }}>D</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-black text-lg" style={{ fontFamily:"'Playfair Display',serif", letterSpacing:'0.04em' }}>
                DUBAI<span style={{ color:'#D4AF37' }}>ROVERS</span>
              </span>
              <span className="text-[10px] font-semibold" style={{ color:'rgba(212,175,55,0.8)', letterSpacing:'0.14em' }}>TOURS & TRAVEL</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5" ref={dropRef}>
            {NAV_LINKS.map((link) => (
              <div key={link.href} className="relative">
                <button
                  onMouseEnter={() => link.hasMega && setActiveDrop(link.href)}
                  onMouseLeave={() => !link.hasMega && setActiveDrop(null)}
                  onClick={() => !link.hasMega && router.push(link.href)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    pathname.startsWith(link.href)
                      ? 'text-brand-gold bg-white/15'
                      : 'text-white hover:text-brand-gold hover:bg-white/10'
                  }`}>
                  <span>{link.emoji}</span>
                  <span>{link.label}</span>
                  {link.hasMega && (
                    <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/>
                    </svg>
                  )}
                </button>

                {/* MEGA MENU for Tours */}
                {link.hasMega && activeDrop === link.href && (
                  <div
                    className="absolute top-full left-0 pt-2 z-50"
                    style={{ width: '780px' }}
                    onMouseEnter={() => setActiveDrop(link.href)}
                    onMouseLeave={() => setActiveDrop(null)}>
                    <div className="rounded-2xl overflow-hidden flex"
                      style={{ background:'#fff', boxShadow:'0 20px 60px rgba(10,22,40,0.25)', border:'1px solid rgba(212,175,55,0.2)', minHeight:'380px' }}>

                      {/* Left: UAE Tour Categories */}
                      <div className="w-52 shrink-0 border-r border-gray-100" style={{ background:'#f8f9fa' }}>
                        <div className="px-4 py-3 border-b border-gray-100">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">🇦🇪 UAE Tours</p>
                        </div>
                        {TOUR_CATS.map(cat => (
                          <Link key={cat.href} href={cat.href}
                            className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-brand-navy hover:text-brand-gold hover:bg-amber-50 transition-colors border-b border-gray-50 last:border-0">
                            {cat.label}
                          </Link>
                        ))}
                        <div className="px-4 py-3 border-t border-gray-100 mt-1">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">🌍 Worldwide</p>
                          <Link href="/tours/worldwide"
                            className="flex items-center gap-2 text-xs font-bold text-brand-gold hover:underline">
                            See All 50 Countries →
                          </Link>
                        </div>
                      </div>

                      {/* Middle: Country list */}
                      <div className="w-52 shrink-0 border-r border-gray-100 overflow-y-auto" style={{ maxHeight:'380px' }}>
                        <div className="px-4 py-3 border-b border-gray-100 sticky top-0 bg-white">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">🌍 Countries</p>
                        </div>
                        {MEGA_COUNTRIES.map(country => (
                          <button key={country.id}
                            onMouseEnter={() => setActiveCountry(country)}
                            onClick={() => router.push(`/tours/worldwide/${country.id}`)}
                            className={`flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-semibold text-left transition-colors border-b border-gray-50 last:border-0 ${
                              activeCountry?.id === country.id
                                ? 'text-brand-gold bg-amber-50'
                                : 'text-brand-navy hover:text-brand-gold hover:bg-amber-50'
                            }`}>
                            <span className="text-lg shrink-0">{country.flag}</span>
                            <span className="flex-1">{country.name}</span>
                            <svg className="w-3 h-3 opacity-40 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                            </svg>
                          </button>
                        ))}
                      </div>

                      {/* Right: Country tours */}
                      {activeCountry && (
                        <div className="flex-1 p-5">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-3xl">{activeCountry.flag}</span>
                            <div>
                              <h3 className="font-black text-brand-navy text-base" style={{ fontFamily:"'Playfair Display',serif" }}>
                                {activeCountry.name} Tours
                              </h3>
                              <p className="text-xs text-gray-400">from Dubai · Book via WhatsApp</p>
                            </div>
                          </div>
                          <div className="space-y-2 mb-4">
                            {activeCountry.tours.map((tour, i) => (
                              <Link key={i}
                                href={`/tours/worldwide/${activeCountry.id}`}
                                className="flex items-center gap-2.5 p-2.5 rounded-xl text-sm font-semibold text-brand-navy hover:text-brand-gold hover:bg-amber-50 transition-colors group">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold shrink-0" />
                                <span className="flex-1">{tour}</span>
                                <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                                </svg>
                              </Link>
                            ))}
                          </div>
                          <Link href={`/tours/worldwide/${activeCountry.id}`}
                            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                            style={{ background:'linear-gradient(135deg,#D4AF37,#F0D060)', color:'#0A1628' }}>
                            See All {activeCountry.name} Tours →
                          </Link>
                          <a href={`https://wa.me/971544735060?text=Hi! I want to book a tour to ${activeCountry.name}`}
                            target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-white mt-2 transition-all hover:opacity-90"
                            style={{ background:'#25D366' }}>
                            💬 WhatsApp Us
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">

            {/* Currency dropdown */}
            <div className="relative hidden sm:block">
              <button onClick={() => { setCurrOpen(!currOpen); setLangOpen(false); }}
                className="flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs font-bold text-white hover:text-brand-gold hover:bg-white/10 transition-all"
                style={{ border:'1px solid rgba(255,255,255,0.2)' }}>
                <span>{currency.flag}</span>
                <span className="font-black">{currency.code}</span>
                <svg className="w-2.5 h-2.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              {currOpen && (
                <div className="absolute right-0 top-full pt-2 z-50">
                  <div className="rounded-xl overflow-hidden shadow-2xl"
                    style={{ background:'#fff', border:'1px solid #e2e8f0', minWidth:'195px', maxHeight:'320px', overflowY:'auto' }}>
                    {currencies.map(c => (
                      <button key={c.code}
                        onClick={() => { setCurrency(c.code); setCurrOpen(false); }}
                        className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                          currency.code===c.code ? 'text-brand-gold bg-amber-50' : 'text-brand-navy hover:bg-gray-50'
                        }`}>
                        <span className="text-base shrink-0">{c.flag}</span>
                        <span className="flex-1 text-left">{c.label}</span>
                        <span className="text-xs text-gray-400 shrink-0">{c.code}</span>
                        {currency.code===c.code && <span className="text-xs text-brand-gold font-black">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Language dropdown */}
            <div className="relative">
              <button onClick={() => setLangOpen(!langOpen)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold text-white hover:text-brand-gold hover:bg-white/10 transition-all"
                style={{ border:'1px solid rgba(255,255,255,0.25)' }}>
                <span className="text-base">{currentLang.flag}</span>
                <span className="text-xs font-black tracking-wide">{currentLang.short}</span>
                <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full pt-2 z-50">
                  <div className="rounded-xl overflow-hidden shadow-2xl"
                    style={{ background:'#fff', border:'1px solid #e2e8f0', minWidth:'180px' }}>
                    {langs.map(l => (
                      <button key={l.code}
                        onClick={() => { setLang(l.code); setLangOpen(false); }}
                        className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-semibold transition-colors ${
                          lang===l.code ? 'text-brand-gold bg-amber-50' : 'text-brand-navy hover:bg-gray-50'
                        }`}>
                        <span className="text-lg">{l.flag}</span>
                        <span>{l.label}</span>
                        {lang===l.code && <span className="ml-auto text-xs text-brand-gold font-black">✓</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* WhatsApp button */}
            <a href="https://wa.me/971544735060?text=Hello%20DubaiRovers!"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm text-white transition-all hover:scale-105"
              style={{ background:'#25D366', boxShadow:'0 4px 16px rgba(37,211,102,0.4)' }}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              <span className="hidden md:inline">WhatsApp</span>
            </a>

            {/* Hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col gap-1.5 w-9 h-9 justify-center items-center">
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen?'rotate-45 translate-y-2':''}`}/>
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen?'opacity-0':''}`}/>
              <span className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen?'-rotate-45 -translate-y-2':''}`}/>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 z-50"
            style={{ background:'#0A1628', borderTop:'1px solid rgba(212,175,55,0.2)', boxShadow:'0 20px 60px rgba(10,22,40,0.9)' }}>
            <div className="container-main py-4 flex flex-col gap-1">
              {NAV_LINKS.map(link => (
                <Link key={link.href} href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold ${
                    pathname.startsWith(link.href) ? 'text-brand-gold bg-white/10' : 'text-white hover:text-brand-gold hover:bg-white/5'
                  }`}>
                  <span className="text-lg">{link.emoji}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
              <div className="flex gap-2 mt-3 pt-3 border-t border-white/10 flex-wrap">
                {langs.map(l => (
                  <button key={l.code}
                    onClick={() => { setLang(l.code); setMobileOpen(false); }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                      lang===l.code ? 'text-brand-navy' : 'text-white/60 border border-white/20'
                    }`}
                    style={lang===l.code ? { background:'linear-gradient(135deg,#D4AF37,#F0D060)' } : {}}>
                    {l.flag} {l.short}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Mobile bottom nav */}
      <nav className="mobile-nav">
        {[
          { href:'/',            emoji:'🏠', label: lang==='ar'?'الرئيسية':'Home' },
          { href:'/tours',       emoji:'🗺️', label: tr('nav','tours') },
          { href:'/attractions', emoji:'🏛️', label: lang==='ar'?'المعالم':'Spots' },
          { href:'/flights',     emoji:'✈️', label: tr('nav','flights') },
          { href:'/contact',     emoji:'📞', label: lang==='ar'?'تواصل':'Contact' },
        ].map(item => (
          <Link key={item.href} href={item.href}
            className={`mobile-nav-btn ${pathname === item.href ? 'active' : ''}`}>
            <span className="text-xl">{item.emoji}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}
