'use client';
import { useState } from 'react';
import Link from 'next/link';

const MOCK_DATA = {
  name:       'Tariq Hassan',
  tier:       'Gold',
  commission: '15%',
  link:       'https://dubairovers.com/?ref=tariq',
  code:       'TARIQ15',
  earnings:   4820,
  pending:    620,
  bookings:   42,
  clicks:     1240,
  conversion: '3.4%',
  transactions: [
    { id:'TX-001', tour:'Evening Desert Safari', date:'2025-04-10', guests:4, amount:240, commission:36,  status:'paid' },
    { id:'TX-002', tour:'Abu Dhabi City Tour',   date:'2025-04-12', guests:2, amount:300, commission:45,  status:'paid' },
    { id:'TX-003', tour:'Helicopter Tour Dubai', date:'2025-04-14', guests:2, amount:1398,commission:209.7,status:'pending' },
    { id:'TX-004', tour:'Dubai Marina Cruise',   date:'2025-04-16', guests:3, amount:297, commission:44.5,status:'pending' },
  ],
};

export default function AffiliateDashboard() {
  const [authed,   setAuthed]   = useState(false);
  const [code,     setCode]     = useState('');
  const [err,      setErr]      = useState('');
  const [copied,   setCopied]   = useState(false);

  const login = (e) => {
    e.preventDefault();
    if (code.trim()) { setAuthed(true); } 
    else setErr('Please enter your affiliate code');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(MOCK_DATA.link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4"
        style={{ background:'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
        <div className="rounded-3xl p-8 w-full max-w-sm"
          style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(212,175,55,0.3)', backdropFilter:'blur(20px)' }}>
          <div className="text-center mb-8">
            <div className="text-4xl mb-3">🤝</div>
            <h1 className="text-xl font-bold text-white" style={{ fontFamily:"'Playfair Display',serif" }}>Affiliate Dashboard</h1>
            <p className="text-white/50 text-sm mt-1">Enter your affiliate code to access your earnings</p>
          </div>
          <form onSubmit={login} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-white/60 mb-2 uppercase tracking-wide">Affiliate Code</label>
              <input value={code} onChange={e=>setCode(e.target.value)}
                placeholder="e.g. TARIQ15"
                className="w-full px-4 py-3 rounded-xl text-white font-medium outline-none"
                style={{ background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.15)' }} />
            </div>
            {err && <p className="text-red-400 text-sm">{err}</p>}
            <button type="submit" className="btn-gold w-full justify-center py-3.5">🔓 Access Dashboard</button>
          </form>
          <p className="text-center text-white/40 text-xs mt-4">
            Not an affiliate yet?{' '}
            <Link href="/affiliate" className="text-brand-gold hover:underline">Apply here →</Link>
          </p>
        </div>
      </div>
    );
  }

  const TIER_COLOR = { Gold:'#D4AF37', Silver:'#a0a0a0', Bronze:'#cd7f32' };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="py-6 px-4 text-white" style={{ background:'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
        <div className="container-main flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-xl"
              style={{ background:'linear-gradient(135deg,#D4AF37,#F0D060)', color:'#0A1628' }}>
              {MOCK_DATA.name[0]}
            </div>
            <div>
              <div className="font-bold text-white">{MOCK_DATA.name}</div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background:`${TIER_COLOR[MOCK_DATA.tier]}25`, color:TIER_COLOR[MOCK_DATA.tier] }}>
                {MOCK_DATA.tier} Affiliate · {MOCK_DATA.commission} Commission
              </span>
            </div>
          </div>
          <button onClick={() => setAuthed(false)} className="text-white/50 hover:text-white text-sm">Sign Out</button>
        </div>
      </div>

      <div className="container-main py-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { emoji:'💰', label:'Total Earned',   value:`AED ${MOCK_DATA.earnings.toLocaleString()}`, color:'#D4AF37' },
            { emoji:'⏳', label:'Pending Payout',  value:`AED ${MOCK_DATA.pending}`,                  color:'#F59E0B' },
            { emoji:'📋', label:'Total Bookings',  value:MOCK_DATA.bookings,                          color:'#10B981' },
            { emoji:'📊', label:'Conversion Rate', value:MOCK_DATA.conversion,                        color:'#1E3A5F' },
          ].map(s => (
            <div key={s.label} className="rounded-2xl bg-white p-5"
              style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>
              <div className="text-2xl mb-2">{s.emoji}</div>
              <div className="text-2xl font-black" style={{ color:s.color }}>{s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Referral link */}
        <div className="rounded-2xl p-6" style={{ background:'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
          <h3 className="text-white font-bold mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>
            🔗 Your Referral Link
          </h3>
          <div className="flex gap-3 flex-wrap">
            <div className="flex-1 flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3 min-w-0">
              <span className="text-white/70 text-sm truncate font-mono">{MOCK_DATA.link}</span>
            </div>
            <button onClick={copyLink}
              className={`px-5 py-3 rounded-xl font-bold text-sm transition-all ${copied?'bg-emerald-500 text-white':'btn-gold'}`}>
              {copied ? '✅ Copied!' : '📋 Copy Link'}
            </button>
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            <span className="text-white/60 text-xs">Share on:</span>
            {[
              { label:'WhatsApp', href:`https://wa.me/?text=Book amazing Dubai tours via DubaiRovers! Use my link: ${MOCK_DATA.link}`, color:'#25D366' },
              { label:'Instagram', href:'https://instagram.com', color:'#E1306C' },
              { label:'Facebook',  href:`https://facebook.com/sharer.php?u=${MOCK_DATA.link}`, color:'#1877F2' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full text-white text-xs font-bold" style={{ background:s.color }}>
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Transactions */}
        <div className="rounded-2xl bg-white overflow-hidden"
          style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-brand-navy" style={{ fontFamily:"'Playfair Display',serif" }}>
              📋 Recent Transactions
            </h3>
            <button onClick={() => {
              const msg = `💰 *Payout Request — DubaiRovers Affiliates*\n\nHi! I'd like to request my pending payout.\n\n🆔 Affiliate Code: ${MOCK_DATA.code}\n💵 Pending: AED ${MOCK_DATA.pending}\n\nPlease process at your earliest convenience. Thank you!`;
              window.open(`https://wa.me/971544735060?text=${encodeURIComponent(msg)}`, '_blank');
            }} className="btn-gold text-xs px-4 py-2">
              💰 Request Payout
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['ID','Tour','Date','Amount','Commission','Status'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MOCK_DATA.transactions.map((tx, i) => (
                  <tr key={tx.id} className={`border-b border-gray-50 ${i%2?'bg-gray-50/30':''}`}>
                    <td className="px-4 py-3 font-mono text-xs font-bold text-brand-navy">{tx.id}</td>
                    <td className="px-4 py-3 font-medium text-brand-navy text-sm">{tx.tour}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{tx.date}</td>
                    <td className="px-4 py-3 font-semibold">AED {tx.amount}</td>
                    <td className="px-4 py-3 font-black text-emerald-600">AED {tx.commission}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        tx.status==='paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {tx.status==='paid' ? '✅ Paid' : '⏳ Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
