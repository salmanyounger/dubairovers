'use client';
import { useState } from 'react';
import { useLocalStore, useToast } from '../../../hooks/useAdminStore';

const INITIAL_AFFILIATES = [
  { id:'AF-001', name:'Tariq Hassan',     email:'tariq@gmail.com',  tier:'Gold',   earnings:4820, bookings:42, clicks:1240, status:'active',  joined:'2024-01-15', link:'dubairovers.com/?ref=tariq' },
  { id:'AF-002', name:'Instagram @Dubai_',email:'dubai@insta.com',  tier:'Silver', earnings:1820, bookings:18, clicks:620,  status:'active',  joined:'2024-03-20', link:'dubairovers.com/?ref=dubai_' },
  { id:'AF-003', name:'Travel Blog UAE',  email:'blog@uae.com',     tier:'Silver', earnings:2240, bookings:22, clicks:880,  status:'active',  joined:'2024-02-10', link:'dubairovers.com/?ref=travelblog' },
  { id:'AF-004', name:'Carlos M.',        email:'carlos@travel.com',tier:'Bronze', earnings:420,  bookings:6,  clicks:180,  status:'pending', joined:'2025-03-01', link:'dubairovers.com/?ref=carlos' },
  { id:'AF-005', name:'Promo Dubai',      email:'promo@dubai.ae',   tier:'Gold',   earnings:6100, bookings:58, clicks:2100, status:'active',  joined:'2023-11-05', link:'dubairovers.com/?ref=promodubai' },
];

const TIER_COLORS = { Gold:'#D4AF37', Silver:'#a0a0a0', Bronze:'#cd7f32' };

export default function AdminAffiliates() {
  const { data: affiliates, update, save } = useLocalStore('affiliates', INITIAL_AFFILIATES);
  const { show: toast, ToastContainer } = useToast();
  const [filter,   setFilter]   = useState('all');
  const [selected, setSelected] = useState(null);

  const filtered = filter==='all' ? affiliates : affiliates.filter(a=>a.status===filter||a.tier===filter);

  const sendPayoutWA = (a) => {
    const msg = `💰 *Payout Notification — DubaiRovers Affiliates*\n\nHi ${a.name}! 👋\n\nYour affiliate commission payout is ready:\n\n💵 Amount: AED ${a.earnings}\n📊 Bookings: ${a.bookings}\n🔗 Affiliate ID: ${a.id}\n\nPlease reply with your bank details to process the transfer.\n\nThank you for being a valued DubaiRovers affiliate! 🌟`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
    toast(`💰 Payout message sent to ${a.name}`);
  };

  const approveAffiliate = (id) => {
    update(id, { status: 'active' });
    toast('✅ Affiliate approved!');
  };

  const totalEarnings = affiliates.reduce((s,a)=>s+a.earnings, 0);
  const totalBookings = affiliates.reduce((s,a)=>s+a.bookings, 0);

  return (
    <div className="space-y-6">
      <ToastContainer />
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-black text-brand-navy" style={{ fontFamily:"'Playfair Display',serif" }}>
          🤝 Affiliate Management
        </h1>
        <button className="btn-gold text-sm px-4 py-2">+ Add Affiliate</button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { emoji:'🤝', label:'Active Affiliates', value: affiliates.filter(a=>a.status==='active').length, color:'#10B981' },
          { emoji:'💰', label:'Total Paid Out',    value:`AED ${totalEarnings.toLocaleString()}`,           color:'#D4AF37' },
          { emoji:'📋', label:'Total Bookings',    value: totalBookings,                                   color:'#1E3A5F' },
          { emoji:'⏳', label:'Pending Approval',  value: affiliates.filter(a=>a.status==='pending').length,color:'#F59E0B' },
        ].map(s=>(
          <div key={s.label} className="rounded-2xl bg-white p-5"
            style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>
            <div className="text-2xl mb-2">{s.emoji}</div>
            <div className="text-2xl font-black" style={{ color:s.color }}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {['all','active','pending','Gold','Silver','Bronze'].map(f=>(
          <button key={f} onClick={()=>setFilter(f)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all capitalize ${
              filter===f ? 'text-brand-navy' : 'bg-white text-gray-500 border border-gray-200'
            }`}
            style={filter===f ? { background:'linear-gradient(135deg,#D4AF37,#F0D060)' } : {}}>
            {f==='all'?'📋 All':f==='active'?'✅ Active':f==='pending'?'⏳ Pending':`${f==='Gold'?'🥇':f==='Silver'?'🥈':'🥉'} ${f}`}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white overflow-hidden" style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['ID','Name','Tier','Earnings','Bookings','Clicks','Conv.','Status','Actions'].map(h=>(
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a,i)=>(
                <tr key={a.id} className={`border-b border-gray-50 hover:bg-amber-50/30 transition-colors cursor-pointer ${
                  selected?.id===a.id?'bg-amber-50':i%2===0?'':'bg-gray-50/20'}`}
                  onClick={()=>setSelected(a)}>
                  <td className="px-4 py-3 font-mono text-xs font-bold text-brand-navy">{a.id}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-brand-navy text-sm">{a.name}</div>
                    <div className="text-xs text-gray-400">{a.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-black"
                      style={{ background:`${TIER_COLORS[a.tier]}20`, color:TIER_COLORS[a.tier] }}>
                      {a.tier==='Gold'?'🥇':a.tier==='Silver'?'🥈':'🥉'} {a.tier}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-black text-brand-navy">AED {a.earnings.toLocaleString()}</td>
                  <td className="px-4 py-3 font-semibold text-center">{a.bookings}</td>
                  <td className="px-4 py-3 text-gray-500 text-center">{a.clicks.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-emerald-600 font-bold text-xs">
                      {((a.bookings/a.clicks)*100).toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      a.status==='active'?'bg-emerald-100 text-emerald-700':'bg-amber-100 text-amber-700'
                    }`}>
                      {a.status==='active'?'✅':'⏳'} {a.status}
                    </span>
                  </td>
                  <td className="px-4 py-3" onClick={e=>e.stopPropagation()}>
                    <div className="flex gap-1">
                      <button onClick={()=>sendPayoutWA(a)}
                        className="px-2 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-700">💰 Pay</button>
                      {a.status==='pending'&&(
                        <button onClick={()=>approveAffiliate(a.id)}
                          className="px-2 py-1 rounded-lg text-xs font-bold bg-brand-navy text-brand-gold">Approve</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail sidebar */}
      {selected && (
        <div className="fixed inset-y-0 right-0 w-80 bg-white z-50 shadow-2xl overflow-y-auto"
          style={{ borderLeft:'1px solid rgba(212,175,55,0.2)' }}>
          <div className="p-5 sticky top-0 border-b border-gray-100 flex items-center justify-between"
            style={{ background:'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
            <h3 className="text-white font-bold">Affiliate Detail</h3>
            <button onClick={()=>setSelected(null)} className="text-white/60 hover:text-white text-xl">✕</button>
          </div>
          <div className="p-5 space-y-4">
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-full mx-auto mb-2 flex items-center justify-center text-2xl font-black"
                style={{ background:'linear-gradient(135deg,#D4AF37,#F0D060)', color:'#0A1628' }}>
                {selected.name[0]}
              </div>
              <div className="font-bold text-brand-navy">{selected.name}</div>
              <span className="px-3 py-1 rounded-full text-xs font-black mt-1 inline-block"
                style={{ background:`${TIER_COLORS[selected.tier]}20`, color:TIER_COLORS[selected.tier] }}>
                {selected.tier} Affiliate
              </span>
            </div>
            {[
              ['🎫 ID', selected.id],
              ['📧 Email', selected.email],
              ['📅 Joined', selected.joined],
              ['🔗 Link', selected.link],
              ['💰 Earnings', `AED ${selected.earnings.toLocaleString()}`],
              ['📋 Bookings', selected.bookings],
              ['👆 Clicks', selected.clicks.toLocaleString()],
              ['📊 Conversion', `${((selected.bookings/selected.clicks)*100).toFixed(1)}%`],
            ].map(([k,v])=>(
              <div key={k} className="flex justify-between items-start border-b border-gray-50 pb-2">
                <span className="text-gray-400 text-xs">{k}</span>
                <span className="font-semibold text-brand-navy text-xs text-right max-w-[55%] break-all">{v}</span>
              </div>
            ))}
            <div className="space-y-2 pt-2">
              <button onClick={()=>sendPayoutWA(selected)} className="btn-gold w-full justify-center text-sm py-2.5">
                💰 Send Payout via WhatsApp
              </button>
              <button className="btn-navy w-full justify-center text-sm py-2.5">
                📊 View Full Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
