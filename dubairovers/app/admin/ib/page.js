'use client';
import { useState } from 'react';
import { useLocalStore, useToast } from '../../../hooks/useAdminStore';

const IB_PARTNERS = [
  { id:'IB-001', company:'Desert Adventures LLC', contact:'Mohammed Al-Farsi', email:'info@desertadventures.ae', phone:'+971 50 123 4567', country:'UAE', tours:12, revenue:28400, commission:5680, status:'active',  joined:'2024-01-10', type:'Desert Safari' },
  { id:'IB-002', company:'City Sights Tourism',   contact:'Priya Sharma',     email:'info@citysights.com',     phone:'+971 55 234 5678', country:'India',tours:8,  revenue:18200, commission:3276, status:'active',  joined:'2024-02-15', type:'City Tours' },
  { id:'IB-003', company:'Blue Waters Cruises',   contact:'Ahmed Hassan',     email:'info@bluewaters.ae',      phone:'+971 52 345 6789', country:'UAE', tours:5,  revenue:12600, commission:2520, status:'active',  joined:'2024-03-20', type:'Water Activities' },
  { id:'IB-004', company:'World Travel Group',    contact:'Sarah Brown',      email:'info@worldtravel.co.uk',  phone:'+44 7911 345678',  country:'UK',  tours:22, revenue:95000, commission:14250,status:'active',  joined:'2023-11-05', type:'Worldwide' },
  { id:'IB-005', company:'Fast Transfers Dubai',  contact:'Ali Al-Rashid',    email:'info@fasttransfers.ae',   phone:'+971 50 456 7890', country:'UAE', tours:3,  revenue:4200,  commission:1050, status:'pending', joined:'2025-03-10', type:'Transfers' },
];

export default function AdminIB() {
  const { data: partners, update, save } = useLocalStore('ib_partners', IB_PARTNERS);
  const { show: toast, ToastContainer } = useToast();
  const [selected, setSelected] = useState(null);

  const totalRevenue    = partners.reduce((s,p)=>s+p.revenue, 0);
  const totalCommission = partners.reduce((s,p)=>s+p.commission, 0);

  const approve = (id) => {
    update(id, { status: 'active' });
    toast('✅ IB Partner approved!');
  };

  const forwardTour = (partner) => {
    const msg = `🏢 *Tour Partnership — DubaiRovers*\n\nDear ${partner.contact},\n\nWe have new tour enquiries that match your ${partner.type} offerings on DubaiRovers.com\n\n🏢 Company: ${partner.company}\n🆔 IB ID: ${partner.id}\n\nPlease log in to your IB dashboard to view and accept the forwarded bookings:\nhttps://dubairovers.com/ib/dashboard\n\nThank you for partnering with DubaiRovers! 🌟`;
    window.open(`https://wa.me/${partner.phone.replace(/\s+/g,'')}?text=${encodeURIComponent(msg)}`,'_blank');
  };

  return (
    <div className="space-y-6">
      <ToastContainer />
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-black text-brand-navy" style={{ fontFamily:"'Playfair Display',serif" }}>
          🏢 IB Partner Management
        </h1>
        <button className="btn-gold text-sm px-4 py-2">+ Add IB Partner</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { emoji:'🏢', label:'Total Partners',    value:partners.length,                              color:'#1E3A5F' },
          { emoji:'✅', label:'Active',             value:partners.filter(p=>p.status==='active').length,color:'#10B981' },
          { emoji:'💰', label:'Platform Revenue',   value:`AED ${totalRevenue.toLocaleString()}`,       color:'#D4AF37' },
          { emoji:'💸', label:'Commissions Paid',   value:`AED ${totalCommission.toLocaleString()}`,    color:'#8B5CF6' },
        ].map(s=>(
          <div key={s.label} className="rounded-2xl bg-white p-5"
            style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>
            <div className="text-2xl mb-2">{s.emoji}</div>
            <div className="text-xl font-black" style={{ color:s.color }}>{s.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white overflow-hidden"
        style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Company','Contact','Type','Tours','Revenue','Commission','Status','Actions'].map(h=>(
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {partners.map((p,i)=>(
                <tr key={p.id}
                  onClick={()=>setSelected(p)}
                  className={`border-b border-gray-50 cursor-pointer hover:bg-amber-50/30 transition-colors ${
                    selected?.id===p.id?'bg-amber-50':i%2===0?'':'bg-gray-50/20'}`}>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-brand-navy text-sm">{p.company}</div>
                    <div className="text-xs text-gray-400 font-mono">{p.id}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-brand-navy">{p.contact}</div>
                    <div className="text-xs text-gray-400">{p.country}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-navy/10 text-brand-navy">
                      {p.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-bold text-center">{p.tours}</td>
                  <td className="px-4 py-3 font-black text-brand-navy text-sm">AED {p.revenue.toLocaleString()}</td>
                  <td className="px-4 py-3 font-bold text-emerald-600">AED {p.commission.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      p.status==='active'?'bg-emerald-100 text-emerald-700':'bg-amber-100 text-amber-700'
                    }`}>
                      {p.status==='active'?'✅ Active':'⏳ Pending'}
                    </span>
                  </td>
                  <td className="px-4 py-3" onClick={e=>e.stopPropagation()}>
                    <div className="flex gap-1">
                      <button onClick={()=>forwardTour(p)}
                        className="px-2 py-1 rounded-lg text-xs font-bold bg-brand-navy text-brand-gold">📤</button>
                      {p.status==='pending'&&(
                        <button onClick={()=>approve(p.id)}
                          className="px-2 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-700">✅</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail panel */}
      {selected && (
        <div className="fixed inset-y-0 right-0 w-80 bg-white z-50 shadow-2xl overflow-y-auto"
          style={{ borderLeft:'1px solid rgba(212,175,55,0.2)' }}>
          <div className="p-5 sticky top-0 border-b flex items-center justify-between"
            style={{ background:'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
            <h3 className="text-white font-bold text-sm">IB Partner Detail</h3>
            <button onClick={()=>setSelected(null)} className="text-white/60 text-xl">✕</button>
          </div>
          <div className="p-5 space-y-3">
            {[
              ['🆔 ID', selected.id],
              ['🏢 Company', selected.company],
              ['👤 Contact', selected.contact],
              ['📧 Email', selected.email],
              ['📱 Phone', selected.phone],
              ['🌍 Country', selected.country],
              ['🗺️ Tour Type', selected.type],
              ['📦 Tours Listed', selected.tours],
              ['💰 Revenue', `AED ${selected.revenue.toLocaleString()}`],
              ['💸 Commission', `AED ${selected.commission.toLocaleString()}`],
              ['📅 Joined', selected.joined],
            ].map(([k,v])=>(
              <div key={k} className="flex justify-between border-b border-gray-50 pb-2">
                <span className="text-gray-400 text-xs">{k}</span>
                <span className="font-semibold text-brand-navy text-xs text-right">{v}</span>
              </div>
            ))}
            <div className="space-y-2 pt-2">
              <button onClick={()=>forwardTour(selected)} className="btn-gold w-full justify-center text-sm py-2.5">
                📤 Forward Tours via WhatsApp
              </button>
              <button className="btn-navy w-full justify-center text-sm py-2.5">
                📊 View Analytics
              </button>
              <button className="w-full py-2.5 rounded-xl text-sm font-bold bg-red-50 text-red-500">
                ⏸️ Suspend Partner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
