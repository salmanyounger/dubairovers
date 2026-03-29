'use client';
import { useState } from 'react';
import Link from 'next/link';

const MOCK_IB = {
  company:  'Desert Adventures LLC',
  contact:  'Mohammed Al-Farsi',
  ibId:     'IB-001',
  tours:    12,
  revenue:  28400,
  commission: 5680,
  pending:  1200,
  bookings: [
    { id:'BK-101', tour:'Evening Desert Safari',    date:'2025-04-15', guests:4, amount:240,  status:'confirmed', customer:'Sarah M.' },
    { id:'BK-102', tour:'Evening Desert Safari',    date:'2025-04-16', guests:2, amount:120,  status:'confirmed', customer:'Ahmed K.' },
    { id:'BK-103', tour:'Overnight Desert Safari',  date:'2025-04-18', guests:2, amount:360,  status:'pending',   customer:'Elena V.' },
    { id:'BK-104', tour:'Desert Quad Biking Add-on',date:'2025-04-20', guests:6, amount:300,  status:'confirmed', customer:'Group Tour' },
  ],
  tours_list: [
    { name:'Evening Desert Safari BBQ',    bookings:28, rating:4.9, status:'active',   revenue:16800 },
    { name:'Overnight Desert Camp',        bookings:10, rating:4.8, status:'active',   revenue:7200  },
    { name:'Morning Desert Safari',        bookings:4,  rating:4.7, status:'active',   revenue:2400  },
    { name:'Private Desert Experience',    bookings:0,  rating:0,   status:'draft',    revenue:0     },
  ],
};

export default function IBDashboard() {
  const [authed,  setAuthed]  = useState(false);
  const [cred,    setCred]    = useState({ email:'', password:'' });
  const [err,     setErr]     = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const login = (e) => {
    e.preventDefault();
    if (cred.email && cred.password) setAuthed(true);
    else setErr('Please enter your email and password');
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background:'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
        <div className="rounded-3xl p-8 w-full max-w-sm"
          style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(212,175,55,0.3)', backdropFilter:'blur(20px)' }}>
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">🏢</div>
            <h1 className="text-xl font-bold text-white" style={{ fontFamily:"'Playfair Display',serif" }}>IB Partner Portal</h1>
            <p className="text-white/50 text-sm mt-1">Login to manage your tours and track bookings</p>
          </div>
          <form onSubmit={login} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-white/60 mb-2 uppercase tracking-wide">Email</label>
              <input type="email" value={cred.email} onChange={e=>setCred(c=>({...c,email:e.target.value}))}
                placeholder="company@email.com"
                className="w-full px-4 py-3 rounded-xl text-white font-medium outline-none"
                style={{ background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.15)' }} required />
            </div>
            <div>
              <label className="block text-xs font-bold text-white/60 mb-2 uppercase tracking-wide">Password</label>
              <input type="password" value={cred.password} onChange={e=>setCred(c=>({...c,password:e.target.value}))}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl text-white font-medium outline-none"
                style={{ background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.15)' }} required />
            </div>
            {err && <p className="text-red-400 text-sm">{err}</p>}
            <button type="submit" className="btn-gold w-full justify-center py-3.5">🔓 Sign In</button>
          </form>
          <p className="text-center text-white/40 text-xs mt-4">
            Not registered?{' '}
            <Link href="/ib" className="text-brand-gold hover:underline">Register your company →</Link>
          </p>
        </div>
      </div>
    );
  }

  const TABS = [
    { id:'overview',  label:'📊 Overview' },
    { id:'bookings',  label:'📋 Bookings' },
    { id:'tours',     label:'🗺️ My Tours' },
    { id:'payouts',   label:'💰 Payouts' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="py-5 px-4 text-white" style={{ background:'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
        <div className="container-main flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-lg"
              style={{ background:'linear-gradient(135deg,#D4AF37,#F0D060)', color:'#0A1628' }}>
              {MOCK_IB.company[0]}
            </div>
            <div>
              <div className="font-bold text-white text-sm">{MOCK_IB.company}</div>
              <div className="text-white/50 text-xs">{MOCK_IB.contact} · ID: {MOCK_IB.ibId}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
              className="text-xs px-3 py-1.5 rounded-full font-bold text-white" style={{ background:'#25D366' }}>
              💬 Support
            </a>
            <button onClick={() => setAuthed(false)} className="text-white/50 hover:text-white text-xs">Sign Out</button>
          </div>
        </div>
      </div>

      <div className="container-main py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { emoji:'🗺️', label:'Active Tours',     value:MOCK_IB.tours,                               color:'#1E3A5F' },
            { emoji:'💰', label:'Total Revenue',     value:`AED ${MOCK_IB.revenue.toLocaleString('en-US')}`,   color:'#D4AF37' },
            { emoji:'💸', label:'Commission Earned', value:`AED ${MOCK_IB.commission.toLocaleString('en-US')}`,color:'#10B981' },
            { emoji:'⏳', label:'Pending Payout',    value:`AED ${MOCK_IB.pending.toLocaleString('en-US')}`,   color:'#F59E0B' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl bg-white p-5"
              style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>
              <div className="text-2xl mb-2">{s.emoji}</div>
              <div className="text-2xl font-black" style={{ color:s.color }}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth:'none' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab===t.id ? 'text-brand-navy' : 'bg-white text-gray-500 border border-gray-200'
              }`}
              style={activeTab===t.id ? { background:'linear-gradient(135deg,#D4AF37,#F0D060)' } : {}}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab: Overview */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-white p-6" style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>
              <h3 className="font-bold text-brand-navy mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>📈 Revenue by Tour</h3>
              <div className="space-y-3">
                {MOCK_IB.tours_list.filter(t=>t.revenue>0).map(t => (
                  <div key={t.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium text-brand-navy truncate max-w-[60%]">{t.name}</span>
                      <span className="font-bold text-brand-gold">AED {t.revenue.toLocaleString('en-US')}</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width:`${(t.revenue/MOCK_IB.revenue)*100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl p-6" style={{ background:'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
              <h3 className="text-white font-bold mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>🚀 Quick Actions</h3>
              <div className="space-y-3">
                {[
                  { label:'Add New Tour',          emoji:'➕', action:()=>setActiveTab('tours') },
                  { label:'View Pending Bookings',  emoji:'📋', action:()=>setActiveTab('bookings') },
                  { label:'Request Payout',         emoji:'💰', action:()=>setActiveTab('payouts') },
                  { label:'Contact DubaiRovers',    emoji:'💬', action:()=>window.open('https://wa.me/971544735060','_blank') },
                ].map(a => (
                  <button key={a.label} onClick={a.action}
                    className="w-full flex items-center gap-3 p-3 rounded-xl transition-all hover:bg-white/10 text-left">
                    <span className="text-xl">{a.emoji}</span>
                    <span className="text-white font-medium text-sm">{a.label}</span>
                    <span className="ml-auto text-white/40">→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab: Bookings */}
        {activeTab === 'bookings' && (
          <div className="rounded-2xl bg-white overflow-hidden"
            style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>
            <div className="p-5 border-b border-gray-100">
              <h3 className="font-bold text-brand-navy" style={{ fontFamily:"'Playfair Display',serif" }}>📋 Bookings via DubaiRovers</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {['Booking ID','Tour','Customer','Date','Guests','Amount','Status'].map(h=>(
                      <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MOCK_IB.bookings.map((b,i)=>(
                    <tr key={b.id} className={`border-b border-gray-50 hover:bg-amber-50/30 ${i%2?'bg-gray-50/20':''}`}>
                      <td className="px-4 py-3 font-mono text-xs font-bold text-brand-navy">{b.id}</td>
                      <td className="px-4 py-3 text-sm font-medium text-brand-navy truncate max-w-[150px]">{b.tour}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{b.customer}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{b.date}</td>
                      <td className="px-4 py-3 text-center font-semibold">{b.guests}</td>
                      <td className="px-4 py-3 font-bold text-brand-navy">AED {b.amount}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          b.status==='confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {b.status==='confirmed' ? '✅ Confirmed' : '⏳ Pending'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab: My Tours */}
        {activeTab === 'tours' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-500 text-sm">{MOCK_IB.tours_list.length} tours listed on DubaiRovers</p>
              <a href="https://wa.me/971544735060?text=Hi! I want to add a new tour to my IB listing."
                target="_blank" rel="noopener noreferrer" className="btn-gold text-sm px-4 py-2">
                + Add Tour
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MOCK_IB.tours_list.map(t => (
                <div key={t.name} className="rounded-2xl bg-white p-5"
                  style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-brand-navy text-sm pr-2">{t.name}</h4>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${
                      t.status==='active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {t.status==='active' ? '✅ Live' : '📝 Draft'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>📋 {t.bookings} bookings</span>
                    {t.rating > 0 && <span>⭐ {t.rating}</span>}
                    <span className="font-bold text-brand-gold">AED {t.revenue.toLocaleString('en-US')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Payouts */}
        {activeTab === 'payouts' && (
          <div className="max-w-lg space-y-5">
            <div className="rounded-2xl bg-white p-6" style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>
              <h3 className="font-bold text-brand-navy mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>💰 Payout Summary</h3>
              <div className="space-y-3 text-sm">
                {[
                  ['Total Revenue',     `AED ${MOCK_IB.revenue.toLocaleString('en-US')}`],
                  ['Platform Fee (20%)',`−AED ${(MOCK_IB.revenue*0.2).toLocaleString('en-US')}`],
                  ['Your Share (80%)',  `AED ${(MOCK_IB.revenue*0.8).toLocaleString('en-US')}`],
                  ['Already Paid',     `−AED ${(MOCK_IB.commission).toLocaleString('en-US')}`],
                ].map(([k,v])=>(
                  <div key={k} className="flex justify-between pb-2 border-b border-gray-50">
                    <span className="text-gray-500">{k}</span>
                    <span className="font-bold text-brand-navy">{v}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-1">
                  <span className="font-bold text-brand-navy text-base">Pending Payout</span>
                  <span className="font-black text-emerald-600 text-xl">AED {MOCK_IB.pending.toLocaleString('en-US')}</span>
                </div>
              </div>
            </div>
            <button onClick={() => {
              const msg = `💸 *Payout Request — IB Partner*\n\n🏢 Company: ${MOCK_IB.company}\n🆔 IB ID: ${MOCK_IB.ibId}\n💰 Amount: AED ${MOCK_IB.pending}\n\nPlease process payout. Thank you!`;
              window.open(`https://wa.me/971544735060?text=${encodeURIComponent(msg)}`, '_blank');
            }} className="btn-gold w-full justify-center py-4 text-base">
              💸 Request Payout via WhatsApp
            </button>
            <p className="text-xs text-gray-500 text-center">
              Payouts processed within 3–5 business days via bank transfer. Minimum payout: AED 500.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
