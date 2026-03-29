'use client';
import { useState } from 'react';
import { useLocalStore, useToast } from '../../../hooks/useAdminStore';

const INITIAL_BOOKINGS = [
  { id:'BK-001', guest:'Sarah Mitchell',   email:'sarah@gmail.com',  phone:'+44 7911 123456', tour:'Evening Desert Safari',   date:'2025-04-15', guests:4, amount:240, status:'confirmed', created:'2025-04-10', hotel:'Burj Al Arab',       addOns:['Quad Biking'] },
  { id:'BK-002', guest:'Ahmed Al-Rashid',  email:'ahmed@email.com',  phone:'+966 55 123 4567',tour:'Abu Dhabi City Tour',     date:'2025-04-16', guests:2, amount:300, status:'pending',   created:'2025-04-11', hotel:'Atlantis The Palm',  addOns:[] },
  { id:'BK-003', guest:'Elena Petrova',    email:'elena@mail.ru',    phone:'+7 900 123 4567', tour:'Dubai Marina Cruise',     date:'2025-04-17', guests:2, amount:198, status:'confirmed', created:'2025-04-11', hotel:'JW Marriott',        addOns:['Hotel Transfer'] },
  { id:'BK-004', guest:'James Chen',       email:'james@gmail.com',  phone:'+86 138 0000 1234',tour:'Helicopter Tour Dubai',  date:'2025-04-18', guests:2, amount:1398,status:'confirmed', created:'2025-04-12', hotel:'Four Seasons',       addOns:[] },
  { id:'BK-005', guest:'Maria Rodriguez',  email:'maria@gmail.com',  phone:'+34 611 123 456', tour:'Dubai City Tour',         date:'2025-04-19', guests:3, amount:360, status:'pending',   created:'2025-04-12', hotel:'Jumeirah Beach Hotel',addOns:['Burj Khalifa Ticket'] },
  { id:'BK-006', guest:'David Thompson',   email:'david@gmail.com',  phone:'+61 400 123 456', tour:'Overnight Desert Safari', date:'2025-04-20', guests:2, amount:360, status:'cancelled', created:'2025-04-10', hotel:'Desert Resort',      addOns:[] },
];

export default function AdminBookings() {
  const { data: bookings, update: updateBooking, add: addBooking, remove: removeBooking, save } = useLocalStore('bookings', INITIAL_BOOKINGS);
  const { show: toast, ToastContainer } = useToast();
  const [filter,   setFilter]   = useState('all');
  const [selected, setSelected] = useState(null);
  const [search,   setSearch]   = useState('');
  const [showNew,  setShowNew]  = useState(false);
  const [newForm,  setNewForm]  = useState({ guest:'', email:'', phone:'', tour:'', date:'', guests:1, amount:'', hotel:'' });

  const filtered = bookings.filter(b => {
    const matchStatus = filter === 'all' || b.status === filter;
    const matchSearch = !search || b.guest.toLowerCase().includes(search.toLowerCase()) ||
                        b.id.toLowerCase().includes(search.toLowerCase()) ||
                        b.tour.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const updateStatus = (id, status) => {
    updateBooking(id, { status });
    if (selected?.id === id) setSelected(s => ({...s, status}));
    toast(`Booking ${id} marked as ${status}`);
  };

  const handleAddBooking = () => {
    if (!newForm.guest || !newForm.tour || !newForm.amount) { toast('Fill required fields', 'error'); return; }
    const nb = { ...newForm, id:`BK-${Date.now()}`, status:'pending', created: new Date().toISOString().split('T')[0], addOns:[] };
    addBooking(nb);
    toast('✅ New booking added!');
    setShowNew(false);
    setNewForm({ guest:'', email:'', phone:'', tour:'', date:'', guests:1, amount:'', hotel:'' });
  };

  const sendWhatsApp = (b) => {
    const msg = `Dear ${b.guest},\n\n✅ Your booking *${b.id}* has been confirmed!\n\n📍 Tour: ${b.tour}\n📅 Date: ${b.date}\n👥 Guests: ${b.guests}\n💰 Amount: AED ${b.amount}\n\nWe look forward to welcoming you! 🌟\n\n— DubaiRovers Team`;
    window.open(`https://wa.me/${b.phone.replace(/\s+/g,'')}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const generateInvoice = (b) => {
    const invoice = `
DUBAIROVERS — INVOICE
━━━━━━━━━━━━━━━━━━━━
Invoice #: ${b.id}
Date: ${new Date().toLocaleDateString()}
━━━━━━━━━━━━━━━━━━━━
Guest: ${b.guest}
Email: ${b.email}
Phone: ${b.phone}
Hotel: ${b.hotel}
━━━━━━━━━━━━━━━━━━━━
Tour: ${b.tour}
Date: ${b.date}
Guests: ${b.guests}
Add-ons: ${b.addOns.join(', ') || 'None'}
━━━━━━━━━━━━━━━━━━━━
TOTAL: AED ${b.amount}
Status: ${b.status.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━
DubaiRovers | +971544735060 | dbtis.com@gmail.com
    `.trim();
    const blob = new Blob([invoice], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${b.id}_invoice.txt`;
    a.click();
  };

  return (
    <div className="space-y-6">
      <ToastContainer />
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-black text-brand-navy" style={{ fontFamily:"'Playfair Display',serif" }}>
          📋 Booking Management
        </h1>
        <div className="flex gap-2 items-center">
          <input value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="🔍 Search bookings..."
            className="input-field text-sm py-2 w-48" />
          <button onClick={() => setShowNew(!showNew)} className="btn-gold text-sm px-4 py-2">+ New Booking</button>
        </div>
      </div>

      {/* New booking form */}
      {showNew && (
        <div className="rounded-2xl bg-white p-6 animate-slide-up"
          style={{ boxShadow:'0 4px 24px rgba(10,22,40,0.08)', border:'1px solid rgba(212,175,55,0.2)' }}>
          <h3 className="font-bold text-brand-navy mb-4">➕ Add New Booking</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {[
              ['Guest Name *', 'guest', 'text'], ['Email', 'email', 'email'],
              ['Phone', 'phone', 'tel'], ['Tour Name *', 'tour', 'text'],
              ['Tour Date', 'date', 'date'], ['Guests', 'guests', 'number'],
              ['Amount (AED) *', 'amount', 'number'], ['Hotel', 'hotel', 'text'],
            ].map(([label, key, type]) => (
              <div key={key}>
                <label className="block text-xs font-bold text-brand-navy mb-1.5">{label}</label>
                <input type={type} value={newForm[key]} onChange={e=>setNewForm(f=>({...f,[key]:e.target.value}))}
                  className="input-field text-sm" />
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={handleAddBooking} className="btn-gold text-sm px-5 py-2.5">✅ Save Booking</button>
            <button onClick={() => setShowNew(false)} className="btn-outline text-sm px-5 py-2.5">Cancel</button>
          </div>
        </div>
      )}

      {/* Status filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {['all','confirmed','pending','cancelled'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all capitalize ${
              filter===s ? 'text-brand-navy' : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
            }`}
            style={filter===s ? { background:'linear-gradient(135deg,#D4AF37,#F0D060)' } : {}}>
            {s === 'all' ? '📋 All' : s === 'confirmed' ? '✅ Confirmed' : s === 'pending' ? '⏳ Pending' : '❌ Cancelled'}
            {' '}({s==='all' ? bookings.length : bookings.filter(b=>b.status===s).length})
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Table */}
        <div className={`rounded-2xl bg-white overflow-hidden flex-1 min-w-0 transition-all ${selected?'lg:max-w-[60%]':''}`}
          style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['ID','Guest','Tour','Date','Amount','Status','Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((b, i) => (
                  <tr key={b.id}
                    onClick={() => setSelected(b)}
                    className={`border-b border-gray-50 cursor-pointer transition-colors hover:bg-amber-50/50 ${
                      selected?.id===b.id ? 'bg-amber-50' : i%2===0 ? '' : 'bg-gray-50/30'
                    }`}>
                    <td className="px-4 py-3 font-mono text-xs font-bold text-brand-navy">{b.id}</td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-brand-navy text-sm">{b.guest}</div>
                      <div className="text-xs text-gray-400">{b.email}</div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-600 max-w-[140px] truncate">{b.tour}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{b.date}</td>
                    <td className="px-4 py-3 font-black text-brand-navy text-sm">AED {b.amount}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        b.status==='confirmed' ? 'bg-emerald-100 text-emerald-700' :
                        b.status==='pending'   ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {b.status==='confirmed'?'✅':b.status==='pending'?'⏳':'❌'} {b.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1" onClick={e=>e.stopPropagation()}>
                        {b.status==='pending' && (
                          <button onClick={() => updateStatus(b.id,'confirmed')}
                            className="px-2 py-1 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                            ✅
                          </button>
                        )}
                        <button onClick={() => sendWhatsApp(b)}
                          className="px-2 py-1 rounded-lg text-xs font-bold text-white"
                          style={{ background:'#25D366' }}>
                          💬
                        </button>
                        <button onClick={() => generateInvoice(b)}
                          className="px-2 py-1 rounded-lg text-xs font-bold bg-brand-navy text-brand-gold">
                          🧾
                        </button>
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
          <div className="hidden lg:block w-72 shrink-0">
            <div className="rounded-2xl bg-white overflow-hidden sticky top-24"
              style={{ boxShadow:'0 4px 24px rgba(10,22,40,0.1)', border:'1px solid rgba(212,175,55,0.2)' }}>
              <div className="p-4 flex items-center justify-between" style={{ background:'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
                <h3 className="text-white font-bold text-sm">Booking Detail</h3>
                <button onClick={() => setSelected(null)} className="text-white/60 hover:text-white text-lg">✕</button>
              </div>
              <div className="p-4 space-y-3 text-sm">
                {[
                  ['🎫 ID', selected.id],
                  ['👤 Guest', selected.guest],
                  ['📧 Email', selected.email],
                  ['📱 Phone', selected.phone],
                  ['🏨 Hotel', selected.hotel],
                  ['🗺️ Tour', selected.tour],
                  ['📅 Date', selected.date],
                  ['👥 Guests', selected.guests],
                  ['✨ Add-ons', selected.addOns.join(', ') || 'None'],
                  ['💰 Amount', `AED ${selected.amount}`],
                ].map(([k,v]) => (
                  <div key={k} className="flex justify-between gap-2">
                    <span className="text-gray-400 text-xs shrink-0">{k}</span>
                    <span className="font-semibold text-brand-navy text-xs text-right">{v}</span>
                  </div>
                ))}
                <div className="pt-3 border-t border-gray-100 space-y-2">
                  {selected.status === 'pending' && (
                    <button onClick={() => updateStatus(selected.id, 'confirmed')}
                      className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-500 text-white hover:bg-emerald-600 transition-colors">
                      ✅ Confirm Booking
                    </button>
                  )}
                  <button onClick={() => sendWhatsApp(selected)}
                    className="w-full py-2.5 rounded-xl text-xs font-bold text-white transition-colors"
                    style={{ background:'#25D366' }}>
                    💬 Send WhatsApp Confirmation
                  </button>
                  <button onClick={() => generateInvoice(selected)}
                    className="w-full py-2.5 rounded-xl text-xs font-bold bg-brand-navy text-brand-gold hover:bg-brand-blue transition-colors">
                    🧾 Generate Invoice
                  </button>
                  {selected.status !== 'cancelled' && (
                    <button onClick={() => updateStatus(selected.id, 'cancelled')}
                      className="w-full py-2.5 rounded-xl text-xs font-bold bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                      ❌ Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
