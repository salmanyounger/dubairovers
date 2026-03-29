'use client';
import { useState } from 'react';
import { useLocalStore, useToast } from '../../../hooks/useAdminStore';

const INVOICE_TYPES = [
  { id:'tour',       label:'🗺️ Tour Booking',       color:'#1E3A5F' },
  { id:'salary',     label:'💼 Employee Salary',     color:'#8B5CF6' },
  { id:'agent',      label:'👥 Agent Commission',    color:'#D4AF37' },
  { id:'freelancer', label:'🤝 Freelancer Payment',  color:'#F59E0B' },
  { id:'expense',    label:'📋 Business Expense',    color:'#EF4444' },
  { id:'operations', label:'⚙️ Operations Fee',       color:'#10B981' },
];

const INITIAL_INVOICES = [
  { id:'INV-001', type:'tour',       party:'Sarah Mitchell',      ref:'BK-001', date:'2025-04-15', due:'2025-04-15', lines:[{desc:'Evening Desert Safari × 4 adults',qty:4,unit:60,vat:5,commission:0}],    status:'paid',    currency:'AED', notes:'' },
  { id:'INV-002', type:'salary',     party:'Ahmed Al-Farsi',      ref:'EMP-001',date:'2025-04-30', due:'2025-04-30', lines:[{desc:'Monthly Salary - Tour Guide',qty:1,unit:4500,vat:0,commission:0},{desc:'Transport Allowance',qty:1,unit:500,vat:0,commission:0}], status:'paid', currency:'AED', notes:'' },
  { id:'INV-003', type:'agent',      party:'Karim Travels',        ref:'AG-001', date:'2025-04-15', due:'2025-04-20', lines:[{desc:'Desert Safari commission (10% of AED 2400)',qty:1,unit:240,vat:5,commission:10}], status:'pending', currency:'AED', notes:'' },
  { id:'INV-004', type:'freelancer', party:'Omar Al-Rashid',       ref:'FL-001', date:'2025-04-16', due:'2025-04-18', lines:[{desc:'Dune bashing driver × 3 trips',qty:3,unit:150,vat:5,commission:0}],  status:'pending', currency:'AED', notes:'Cash payment preferred' },
  { id:'INV-005', type:'expense',    party:'Desert Camp Supplies', ref:'EXP-001',date:'2025-04-10', due:'2025-04-17', lines:[{desc:'BBQ equipment & charcoal',qty:1,unit:850,vat:5,commission:0},{desc:'Tent rental (monthly)',qty:1,unit:1200,vat:5,commission:0}], status:'paid', currency:'AED', notes:'' },
];

function calcTotal(lines=[]) {
  const sub = lines.reduce((s,l)=>s+(+l.qty||0)*(+l.unit||0),0);
  const vat = lines.reduce((s,l)=>s+(+l.qty||0)*(+l.unit||0)*((+l.vat||0)/100),0);
  return { sub, vat, total: sub+vat };
}

function InvoicePreview({ inv, onClose }) {
  const TYPE = INVOICE_TYPES.find(t=>t.id===inv.type)||INVOICE_TYPES[0];
  const {sub,vat,total} = calcTotal(inv.lines);
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-bold text-brand-navy">{TYPE.label} Invoice — {inv.id}</span>
          <div className="flex gap-2">
            <button onClick={()=>window.print()} className="btn-gold text-xs px-3 py-2">🖨️ Print/PDF</button>
            <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-gray-100">✕</button>
          </div>
        </div>
        <div className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="text-2xl font-black mb-1" style={{ fontFamily:"'Playfair Display',serif", color:'#0A1628' }}>DUBAI<span style={{color:'#D4AF37'}}>ROVERS</span></div>
              <div className="text-xs text-gray-500 space-y-0.5">
                <div>Dubai, United Arab Emirates 🇦🇪</div>
                <div>📱 +971 54 473 5060 | 📧 dbtis.com@gmail.com</div>
                <div>TRN: 100234567890003</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-black text-brand-gold">{TYPE.label}</div>
              <div className="mt-2 text-sm space-y-1">
                <div className="font-bold text-brand-navy"># {inv.id}</div>
                <div className="text-gray-500">Issued: {inv.date}</div>
                <div className="text-gray-500">Due: {inv.due}</div>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-1 ${inv.status==='paid'?'bg-emerald-100 text-emerald-700':'bg-amber-100 text-amber-700'}`}>
                  {inv.status==='paid'?'✅ PAID':'⏳ PENDING'}
                </div>
              </div>
            </div>
          </div>
          <div className="mb-6 p-4 rounded-xl bg-gray-50">
            <div className="text-xs font-bold text-gray-400 uppercase mb-1">{inv.type==='salary'?'Employee':'Bill To'}</div>
            <div className="font-bold text-brand-navy text-lg">{inv.party}</div>
            {inv.ref && <div className="text-sm text-gray-500">Ref: {inv.ref}</div>}
            {inv.notes && <div className="text-sm text-gray-500 mt-1 italic">📝 {inv.notes}</div>}
          </div>
          <table className="w-full text-sm mb-6">
            <thead>
              <tr className="border-b-2 border-brand-navy text-xs text-gray-500 uppercase">
                <th className="text-left py-2">Description</th>
                <th className="text-right py-2 w-10">Qty</th>
                <th className="text-right py-2 w-24">Unit</th>
                {inv.lines.some(l=>l.commission>0) && <th className="text-right py-2 w-20">Comm%</th>}
                <th className="text-right py-2 w-14">VAT%</th>
                <th className="text-right py-2 w-24">Amount</th>
              </tr>
            </thead>
            <tbody>
              {inv.lines.map((l,i)=>(
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-3">{l.desc}</td>
                  <td className="py-3 text-right text-gray-600">{l.qty}</td>
                  <td className="py-3 text-right text-gray-600">AED {(+l.unit).toLocaleString('en-US')}</td>
                  {inv.lines.some(x=>x.commission>0) && <td className="py-3 text-right text-amber-600">{l.commission||0}%</td>}
                  <td className="py-3 text-right text-gray-500">{l.vat||0}%</td>
                  <td className="py-3 text-right font-semibold">AED {((+l.qty||0)*(+l.unit||0)).toLocaleString('en-US')}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr><td colSpan={99} className="border-t pt-3"></td></tr>
              <tr><td colSpan={5} className="text-right text-sm text-gray-500 pb-1">Subtotal</td><td className="text-right font-semibold pb-1">AED {sub.toLocaleString('en-US')}</td></tr>
              {vat>0&&<tr><td colSpan={5} className="text-right text-sm text-gray-500 pb-1">VAT (5%)</td><td className="text-right font-semibold pb-1">AED {vat.toFixed(2)}</td></tr>}
              <tr className="border-t-2 border-brand-navy"><td colSpan={5} className="text-right font-black text-brand-navy text-lg py-2">TOTAL</td><td className="text-right font-black text-brand-navy text-2xl py-2">AED {total.toFixed(0)}</td></tr>
            </tfoot>
          </table>
          <div className="p-4 rounded-xl text-xs" style={{background:'linear-gradient(135deg,#0A1628,#1E3A5F)',color:'white'}}>
            <div className="font-bold text-white/60 uppercase tracking-wide mb-1.5">Bank Transfer Details</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
              <span className="text-white/50">Bank:</span><span>Emirates NBD</span>
              <span className="text-white/50">Account Name:</span><span>DubaiRovers Tourism LLC</span>
              <span className="text-white/50">IBAN:</span><span>AE12 0260 0000 0000 0000 000</span>
              <span className="text-white/50">WhatsApp Pay:</span><span>+971 54 473 5060</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InvoiceForm({ initial, onSave, onCancel }) {
  const EMPTY = { type:'tour', party:'', ref:'', date:new Date().toISOString().split('T')[0], due:new Date(Date.now()+7*864e5).toISOString().split('T')[0], lines:[{desc:'',qty:1,unit:0,vat:5,commission:0}], status:'pending', currency:'AED', notes:'' };
  const [form, setForm] = useState(initial||EMPTY);
  const upd=(k,v)=>setForm(f=>({...f,[k]:v}));
  const updLine=(i,k,v)=>setForm(f=>({...f,lines:f.lines.map((l,idx)=>idx===i?{...l,[k]:v}:l)}));
  const addLine=()=>setForm(f=>({...f,lines:[...f.lines,{desc:'',qty:1,unit:0,vat:5,commission:0}]}));
  const delLine=(i)=>setForm(f=>({...f,lines:f.lines.filter((_,j)=>j!==i)}));
  const {sub,vat,total}=calcTotal(form.lines);
  return (
    <div className="space-y-5">
      <div>
        <label className="block text-xs font-bold text-brand-navy mb-2">📋 Invoice Type</label>
        <div className="flex flex-wrap gap-2">
          {INVOICE_TYPES.map(t=>(
            <button key={t.id} type="button" onClick={()=>upd('type',t.id)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border-2 transition-all ${form.type===t.id?'border-brand-gold text-brand-navy':'border-gray-200 text-gray-500'}`}
              style={form.type===t.id?{background:'linear-gradient(135deg,#D4AF37,#F0D060)'}:{}}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="lg:col-span-2">
          <label className="block text-xs font-bold text-brand-navy mb-1.5">👤 Party Name *</label>
          <input value={form.party} onChange={e=>upd('party',e.target.value)} placeholder={form.type==='salary'?'Employee name':'Company / person name'} className="input-field text-sm" />
        </div>
        <div><label className="block text-xs font-bold text-brand-navy mb-1.5">🔖 Reference</label><input value={form.ref} onChange={e=>upd('ref',e.target.value)} placeholder="BK-001" className="input-field text-sm" /></div>
        <div><label className="block text-xs font-bold text-brand-navy mb-1.5">💵 Currency</label><select value={form.currency} onChange={e=>upd('currency',e.target.value)} className="input-field text-sm">{['AED','USD','EUR','GBP','SAR'].map(c=><option key={c}>{c}</option>)}</select></div>
        <div><label className="block text-xs font-bold text-brand-navy mb-1.5">📅 Date</label><input type="date" value={form.date} onChange={e=>upd('date',e.target.value)} className="input-field text-sm" /></div>
        <div><label className="block text-xs font-bold text-brand-navy mb-1.5">📅 Due Date</label><input type="date" value={form.due} onChange={e=>upd('due',e.target.value)} className="input-field text-sm" /></div>
        <div><label className="block text-xs font-bold text-brand-navy mb-1.5">📊 Status</label><select value={form.status} onChange={e=>upd('status',e.target.value)} className="input-field text-sm"><option value="pending">⏳ Pending</option><option value="paid">✅ Paid</option><option value="overdue">🔴 Overdue</option><option value="cancelled">❌ Cancelled</option></select></div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-bold text-brand-navy">📦 Line Items</label>
          <button type="button" onClick={addLine} className="text-xs px-3 py-1.5 rounded-lg font-bold bg-brand-navy text-brand-gold">+ Add Line</button>
        </div>
        <div className="space-y-2">
          {form.lines.map((line,i)=>(
            <div key={i} className="p-3 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
              <input value={line.desc} onChange={e=>updLine(i,'desc',e.target.value)} placeholder="Description..." className="input-field text-sm bg-white" />
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                {[['Qty','qty','number'],['Unit Price','unit','number'],['VAT%','vat','number'],['Commission%','commission','number']].map(([label,key,type])=>(
                  <div key={key}>
                    <div className="text-gray-400 font-bold mb-1">{label}</div>
                    <input type={type} value={line[key]||0} onChange={e=>updLine(i,key,+e.target.value)} className="input-field text-sm text-center" min="0" />
                  </div>
                ))}
                <div className="flex items-end">
                  <div className="text-right w-full">
                    <div className="text-gray-400 font-bold text-[10px] mb-1">Subtotal</div>
                    <div className="font-black text-brand-gold text-sm">AED {((+line.qty||0)*(+line.unit||0)).toFixed(0)}</div>
                  </div>
                </div>
              </div>
              {form.lines.length>1 && <button type="button" onClick={()=>delLine(i)} className="text-xs text-red-400 hover:text-red-600 font-semibold">Remove ×</button>}
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl p-4 text-sm" style={{background:'rgba(212,175,55,0.06)',border:'1px solid rgba(212,175,55,0.2)'}}>
        <div className="flex justify-between mb-1"><span className="text-gray-500">Subtotal</span><span className="font-semibold">AED {sub.toLocaleString('en-US')}</span></div>
        {vat>0&&<div className="flex justify-between mb-1"><span className="text-gray-500">VAT</span><span className="font-semibold">AED {vat.toFixed(2)}</span></div>}
        <div className="flex justify-between border-t border-amber-200 pt-2 mt-1">
          <span className="font-black text-brand-navy text-base">TOTAL</span>
          <span className="font-black text-brand-navy text-2xl">AED {total.toFixed(0)}</span>
        </div>
      </div>

      <div><label className="block text-xs font-bold text-brand-navy mb-1.5">📝 Notes</label><textarea value={form.notes} onChange={e=>upd('notes',e.target.value)} rows={2} className="input-field resize-none text-sm" placeholder="Payment instructions, special terms..." /></div>

      <div className="flex gap-3">
        <button type="button" onClick={()=>onSave(form)} className="btn-gold flex-1 justify-center py-3">💾 Save Invoice</button>
        <button type="button" onClick={onCancel} className="btn-outline px-5 py-3 text-sm">Cancel</button>
      </div>
    </div>
  );
}

export default function AdminInvoices() {
  const { data: invoices, save: saveInvoices, update: updateInvoice } = useLocalStore('invoices', INITIAL_INVOICES);
  const { show: toast, ToastContainer } = useToast();
  const [preview,    setPreview]    = useState(null);
  const [showNew,    setShowNew]    = useState(false);
  const [editInv,    setEditInv]    = useState(null);
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = typeFilter==='all' ? invoices : invoices.filter(inv=>inv.type===typeFilter);
  const totalValue  = invoices.reduce((s,i)=>s+calcTotal(i.lines).total,0);
  const totalPaid   = invoices.filter(i=>i.status==='paid').reduce((s,i)=>s+calcTotal(i.lines).total,0);

  const handleSave = (form) => {
    if (!form.party) { toast('Party name required','error'); return; }
    if (editInv) {
      saveInvoices(prev=>prev.map(inv=>inv.id===editInv.id?{...form,id:editInv.id}:inv));
      toast('✅ Invoice updated!'); setEditInv(null);
    } else {
      const newInv = {...form, id:`INV-${Date.now()}`};
      saveInvoices(prev=>[newInv,...prev]);
      toast('🧾 Invoice created!'); setPreview(newInv); setShowNew(false);
    }
  };

  return (
    <div className="space-y-6">
      <ToastContainer />
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-black text-brand-navy" style={{fontFamily:"'Playfair Display',serif"}}>🧾 Invoice Management</h1>
        <button onClick={()=>{setShowNew(true);setEditInv(null);}} className="btn-gold text-sm px-4 py-2">+ New Invoice</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {emoji:'🧾',label:'Total',value:invoices.length,color:'#1E3A5F'},
          {emoji:'💰',label:'Total Value',value:`AED ${totalValue.toFixed(0)}`,color:'#D4AF37'},
          {emoji:'✅',label:'Paid',value:`AED ${totalPaid.toFixed(0)}`,color:'#10B981'},
          {emoji:'⏳',label:'Pending',value:invoices.filter(i=>i.status==='pending').length,color:'#F97316'},
        ].map(s=>(
          <div key={s.label} className="rounded-2xl bg-white p-5" style={{boxShadow:'0 2px 12px rgba(10,22,40,0.06)',border:'1px solid #e2e8f0'}}>
            <div className="text-2xl mb-2">{s.emoji}</div>
            <div className="text-xl font-black" style={{color:s.color}}>{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap">
        {[{k:'all',l:'📋 All'},...INVOICE_TYPES.map(t=>({k:t.id,l:t.label}))].map(({k,l})=>(
          <button key={k} onClick={()=>setTypeFilter(k)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${typeFilter===k?'text-brand-navy':'bg-white text-gray-500 border border-gray-200'}`}
            style={typeFilter===k?{background:'linear-gradient(135deg,#D4AF37,#F0D060)'}:{}}>
            {l}
          </button>
        ))}
      </div>

      {(showNew||editInv) && (
        <div className="rounded-3xl bg-white p-6 animate-slide-up" style={{boxShadow:'0 4px 24px rgba(10,22,40,0.1)',border:'1px solid rgba(212,175,55,0.2)'}}>
          <h3 className="font-bold text-brand-navy mb-5 text-lg" style={{fontFamily:"'Playfair Display',serif"}}>{editInv?'✏️ Edit Invoice':'➕ New Invoice'}</h3>
          <InvoiceForm initial={editInv} onSave={handleSave} onCancel={()=>{setShowNew(false);setEditInv(null);}} />
        </div>
      )}

      <div className="rounded-2xl bg-white overflow-hidden" style={{boxShadow:'0 2px 12px rgba(10,22,40,0.06)',border:'1px solid #e2e8f0'}}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['ID','Type','Party','Date','Total','Status','Actions'].map(h=>(
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv,i)=>{
                const {total}=calcTotal(inv.lines);
                const TYPE=INVOICE_TYPES.find(t=>t.id===inv.type);
                return (
                  <tr key={inv.id} className={`border-b border-gray-50 hover:bg-amber-50/30 ${i%2?'bg-gray-50/20':''}`}>
                    <td className="px-4 py-3 font-mono text-xs font-bold text-brand-navy">{inv.id}</td>
                    <td className="px-4 py-3"><span className="px-2 py-1 rounded-full text-xs font-bold bg-brand-navy/10 text-brand-navy whitespace-nowrap">{TYPE?.label||inv.type}</span></td>
                    <td className="px-4 py-3 font-semibold text-brand-navy text-sm">{inv.party}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{inv.date}</td>
                    <td className="px-4 py-3 font-black text-brand-navy">AED {total.toFixed(0)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${inv.status==='paid'?'bg-emerald-100 text-emerald-700':inv.status==='overdue'?'bg-red-100 text-red-600':'bg-amber-100 text-amber-700'}`}>
                        {inv.status==='paid'?'✅ Paid':inv.status==='overdue'?'🔴 Overdue':'⏳ Pending'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5 flex-wrap">
                        <button onClick={()=>setPreview(inv)} className="px-2 py-1.5 rounded-lg text-xs font-bold bg-brand-navy text-brand-gold">👁️</button>
                        <button onClick={()=>{setEditInv(inv);setShowNew(false);window.scrollTo({top:0,behavior:'smooth'});}} className="px-2 py-1.5 rounded-lg text-xs font-bold bg-amber-100 text-amber-700">✏️</button>
                        {inv.status==='pending'&&<button onClick={()=>{updateInvoice(inv.id,{status:'paid'});toast('✅ Marked paid!');}} className="px-2 py-1.5 rounded-lg text-xs font-bold bg-emerald-100 text-emerald-700">✅ Paid</button>}
                        <button onClick={()=>{const msg=`${INVOICE_TYPES.find(t=>t.id===inv.type)?.label||'Invoice'} — DubaiRovers\n# ${inv.id}\nParty: ${inv.party}\nDate: ${inv.date}\nTotal: AED ${total.toFixed(0)}\nStatus: ${inv.status}`;window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`,'_blank');}} className="px-2 py-1.5 rounded-lg text-xs font-bold text-white" style={{background:'#25D366'}}>💬</button>
                        <button onClick={()=>{if(confirm('Delete this invoice?')){saveInvoices(prev=>prev.filter(x=>x.id!==inv.id));toast('🗑️ Deleted');}}} className="px-2 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-500">🗑️</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {preview && <InvoicePreview inv={preview} onClose={()=>setPreview(null)} />}
    </div>
  );
}
