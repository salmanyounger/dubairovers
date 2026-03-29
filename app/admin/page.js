'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useLocalStore } from '../../hooks/useAdminStore';
import { TOURS } from '../../data/tours';

const BOOKINGS = [
  { id:'BK-001', guest:'Sarah Mitchell', tour:'Evening Desert Safari', date:'2025-04-15', amount:240, status:'confirmed', guests:4 },
  { id:'BK-002', guest:'Ahmed Al-Rashid', tour:'Abu Dhabi City Tour', date:'2025-04-16', amount:300, status:'pending',   guests:2 },
  { id:'BK-003', guest:'Elena Petrova',   tour:'Dubai Marina Cruise', date:'2025-04-17', amount:198, status:'confirmed', guests:2 },
  { id:'BK-004', guest:'James Chen',      tour:'Helicopter Tour',     date:'2025-04-18', amount:1398,status:'confirmed', guests:2 },
  { id:'BK-005', guest:'Maria Rodriguez', tour:'Dubai City Tour',     date:'2025-04-19', amount:360, status:'pending',   guests:3 },
];

function StatCard({ emoji, label, value, sub, color = '#D4AF37', trend }) {
  return (
    <div className="rounded-2xl p-5 bg-white" style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>
      <div className="flex items-start justify-between mb-3">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
          style={{ background:`${color}15` }}>
          {emoji}
        </div>
        {trend && (
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend>0?'bg-emerald-100 text-emerald-600':'bg-red-100 text-red-500'}`}>
            {trend>0?'↑':'↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div className="text-2xl font-black text-brand-navy">{value}</div>
      <div className="text-sm font-semibold text-gray-500 mt-0.5">{label}</div>
      {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
    </div>
  );
}

export default function AdminDashboard() {
  const [period, setPeriod] = useState('today');
  const { data: bookings }   = useLocalStore('bookings', []);
  const { data: tours }      = useLocalStore('tours', TOURS);
  const { data: affiliates } = useLocalStore('affiliates', []);

  const confirmedCount = bookings.filter(b => b.status === 'confirmed').length;
  const pendingCount   = bookings.filter(b => b.status === 'pending').length;
  const totalRevenue   = bookings.filter(b => b.status === 'confirmed').reduce((s, b) => s + (b.amount || 0), 0);
  const activeAffil    = affiliates.filter(a => a.status === 'active').length;
  const recentBookings = [...bookings].slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-brand-navy" style={{ fontFamily:"'Playfair Display',serif" }}>
            👋 Welcome Back, Admin
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {new Date().toLocaleDateString('en-AE', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}
            {' · '}🇦🇪 Dubai Time
          </p>
        </div>
        <div className="flex gap-2">
          {['today','week','month'].map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all capitalize ${
                period===p ? 'text-brand-navy' : 'text-gray-500 hover:bg-gray-100'
              }`}
              style={period===p ? { background:'linear-gradient(135deg,#D4AF37,#F0D060)' } : {}}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Stats grid — live data from localStorage */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard emoji="📋" label="Total Bookings"   value={bookings.length || 2847}               sub="All time"           color="#1E3A5F" trend={12} />
        <StatCard emoji="💰" label="Revenue (AED)"    value={`${(totalRevenue || 184200).toLocaleString('en-US')}`} sub="Confirmed bookings" color="#D4AF37" trend={18} />
        <StatCard emoji="⏳" label="Pending"          value={pendingCount || 18}                    sub="Need confirmation"  color="#F97316" />
        <StatCard emoji="⭐" label="Avg. Rating"       value="4.9/5"                                 sub="Last 30 days"       color="#F59E0B" />
        <StatCard emoji="🤝" label="Active Affiliates" value={activeAffil || 127}                   sub="Earning this month" color="#8B5CF6" trend={5}  />
        <StatCard emoji="🏢" label="Tours Listed"      value={tours.length || 6}                    sub="Active listings"    color="#EF4444" />
        <StatCard emoji="✅" label="Confirmed"         value={confirmedCount || 2829}               sub="All time"           color="#10B981" trend={8}  />
        <StatCard emoji="📈" label="Conversion Rate"   value="3.8%"                                  sub="Vs 3.1% last month" color="#06B6D4" trend={22} />
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-lg font-bold text-brand-navy mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>
          ⚡ Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { href:'/admin/bookings',   emoji:'➕', label:'New Booking',   color:'#1E3A5F' },
            { href:'/admin/tours',      emoji:'🗺️', label:'Add Tour',      color:'#D4AF37' },
            { href:'/admin/blog',       emoji:'✍️', label:'Write Blog',    color:'#10B981' },
            { href:'/admin/invoices',   emoji:'🧾', label:'Create Invoice',color:'#8B5CF6' },
            { href:'/admin/agents',     emoji:'📤', label:'Forward Tour',  color:'#F59E0B' },
            { href:'/admin/seo',        emoji:'🔍', label:'SEO Audit',     color:'#EF4444' },
          ].map(a => (
            <Link key={a.href} href={a.href}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl text-center transition-all hover:-translate-y-1 hover:shadow-card"
              style={{ background:'#fff', border:`2px solid ${a.color}20` }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ background:`${a.color}15` }}>{a.emoji}</div>
              <span className="text-xs font-bold text-brand-navy">{a.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent bookings */}
      <div className="rounded-2xl bg-white overflow-hidden" style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="font-bold text-brand-navy" style={{ fontFamily:"'Playfair Display',serif" }}>
            📋 Recent Bookings
          </h2>
          <Link href="/admin/bookings" className="text-xs font-bold text-brand-gold hover:underline">
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['ID','Guest','Tour','Date','Guests','Amount','Status','Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(recentBookings.length > 0 ? recentBookings : [
                { id:'BK-001', guest:'Sarah Mitchell',  tour:'Evening Desert Safari', date:'2025-04-15', amount:240,  status:'confirmed', guests:4 },
                { id:'BK-002', guest:'Ahmed Al-Rashid', tour:'Abu Dhabi City Tour',   date:'2025-04-16', amount:300,  status:'pending',   guests:2 },
                { id:'BK-003', guest:'Elena Petrova',   tour:'Dubai Marina Cruise',   date:'2025-04-17', amount:198,  status:'confirmed', guests:2 },
              ]).map((b, i) => (
                <tr key={b.id} className={`border-b border-gray-50 hover:bg-amber-50/30 transition-colors ${i%2===0?'':'bg-gray-50/30'}`}>
                  <td className="px-4 py-3 font-mono text-xs font-bold text-brand-navy">{b.id}</td>
                  <td className="px-4 py-3 font-semibold text-brand-navy">{b.guest}</td>
                  <td className="px-4 py-3 text-gray-600 text-xs max-w-[160px] truncate">{b.tour}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{b.date}</td>
                  <td className="px-4 py-3 text-center font-semibold">{b.guests}</td>
                  <td className="px-4 py-3 font-black text-brand-navy">AED {b.amount}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      b.status==='confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {b.status==='confirmed' ? '✅' : '⏳'} {b.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button className="px-2.5 py-1 rounded-lg text-xs font-bold bg-brand-navy text-brand-gold hover:bg-brand-blue transition-colors">View</button>
                      <a href={`https://wa.me/971544735060?text=Booking ${b.id} update`}
                        target="_blank" rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg text-xs font-bold text-white transition-colors"
                        style={{ background:'#25D366' }}>WA</a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue chart placeholder + marketing tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue */}
        <div className="rounded-2xl bg-white p-5" style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>
          <h3 className="font-bold text-brand-navy mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>
            📈 Revenue Overview
          </h3>
          <div className="space-y-3">
            {[
              { label:'Desert Safari',  pct:45, val:'AED 82,890', color:'#D4AF37' },
              { label:'City Tours',     pct:28, val:'AED 51,576', color:'#1E3A5F' },
              { label:'Water Activities',pct:15,val:'AED 27,630', color:'#0066CC' },
              { label:'Worldwide',      pct:12, val:'AED 22,104', color:'#10B981' },
            ].map(r => (
              <div key={r.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-semibold text-brand-navy">{r.label}</span>
                  <span className="font-bold" style={{ color:r.color }}>{r.val}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width:`${r.pct}%`, background:r.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI marketing tips */}
        <div className="rounded-2xl p-5" style={{ background:'linear-gradient(135deg,#0A1628,#1E3A5F)', boxShadow:'0 2px 12px rgba(10,22,40,0.2)' }}>
          <h3 className="font-bold text-white mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>
            🤖 AI Marketing Suggestions
          </h3>
          <div className="space-y-3">
            {[
              { emoji:'🔥', tip:'Desert safari bookings are 23% lower this week — run a 10% discount campaign!' },
              { emoji:'📱', tip:'Best time to post on Instagram: 7–9 PM UAE time. Schedule your post now.' },
              { emoji:'🌡️', tip:'Dubai weather 38°C next week — promote indoor attractions & evening tours.' },
              { emoji:'✈️', tip:'UK school holidays start in 2 weeks. Target UK families with city tour packages.' },
            ].map((s, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-xl"
                style={{ background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.08)' }}>
                <span className="text-xl shrink-0">{s.emoji}</span>
                <p className="text-white/80 text-xs leading-relaxed">{s.tip}</p>
              </div>
            ))}
          </div>
          <Link href="/admin/seo" className="mt-4 btn-gold w-full justify-center text-sm block text-center">
            📊 Full Marketing Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
