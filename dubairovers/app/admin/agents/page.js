'use client';
import { useState } from 'react';
import { TOURS } from '../../../data/tours';
import { useLocalStore, useToast } from '../../../hooks/useAdminStore';

const INITIAL_AGENTS = [
  { id:'AG-001', name:'Karim Travels',  type:'agent',    contact:'Karim Hassan', phone:'+971 50 111 2222', email:'karim@karims.ae', commission:10, commissionType:'percentage', bookings:28, earnings:2400, status:'active', specialty:'Desert Safari, City Tours', username:'karim', password:'karim2025', joinDate:'2024-01-10' },
  { id:'AG-002', name:'Sky High Tours', type:'agent',    contact:'Rania Al-Ali', phone:'+971 55 222 3333', email:'rania@skyhigh.ae', commission:12, commissionType:'percentage', bookings:45, earnings:5400, status:'active', specialty:'Helicopter, Premium', username:'skyhigh', password:'sky2025', joinDate:'2024-02-15' },
  { id:'AG-003', name:'Omar Al-Rashid', type:'freelancer',contact:'Omar Al-Rashid',phone:'+971 52 333 4444',email:'omar@gmail.com', commission:150, commissionType:'fixed', bookings:16, earnings:2400, status:'active', specialty:'Dune Bashing Driver', username:'omar', password:'omar2025', joinDate:'2024-03-20' },
  { id:'EMP-001', name:'Ahmed Al-Farsi',type:'employee', contact:'Ahmed Al-Farsi', phone:'+971 54 444 5555', email:'ahmed@dubairovers.com', commission:4500, commissionType:'salary', bookings:0, earnings:4500, status:'active', specialty:'Senior Tour Guide', username:'ahmed', password:'ahmed2025', joinDate:'2023-11-01' },
  { id:'EMP-002', name:'Sara Johnson',  type:'employee', contact:'Sara Johnson',  phone:'+971 55 555 6666', email:'sara@dubairovers.com', commission:3800, commissionType:'salary', bookings:0, earnings:3800, status:'active', specialty:'Operations Manager', username:'sara', password:'sara2025', joinDate:'2024-01-05' },
];

const TYPES = [
  { id:'all',        label:'👥 All',        color:'#6B7280' },
  { id:'agent',      label:'🤝 Agents',     color:'#D4AF37' },
  { id:'employee',   label:'💼 Employees',  color:'#1E3A5F' },
  { id:'freelancer', label:'🔧 Freelancers',color:'#F59E0B' },
];

const COMM_TYPES = [
  { id:'percentage', label:'% Per Booking Commission' },
  { id:'fixed',      label:'Fixed Amount Per Booking' },
  { id:'salary',     label:'Monthly Salary' },
];

const EMPTY_AGENT = {
  name:'', type:'agent', contact:'', phone:'', email:'', commission:10,
  commissionType:'percentage', status:'active', specialty:'', username:'', password:'', joinDate:new Date().toISOString().split('T')[0],
  bookings:0, earnings:0,
};

export default function AdminAgents() {
  const { data: agents, save: saveAgents } = useLocalStore('agents', INITIAL_AGENTS);
  const { show: toast, ToastContainer }    = useToast();
  const [typeFilter, setTypeFilter]        = useState('all');
  const [selected,   setSelected]          = useState(null);
  const [showForm,   setShowForm]          = useState(false);
  const [editAgent,  setEditAgent]         = useState(null);
  const [form,       setForm]              = useState(EMPTY_AGENT);
  const [showFwd,    setShowFwd]           = useState(false);
  const [selTour,    setSelTour]           = useState('');
  const [selAgent,   setSelAgent]          = useState('');
  const [fwdMsg,     setFwdMsg]            = useState('');
  const [showCred,   setShowCred]          = useState(null);

  const upd = (k,v) => setForm(f=>({...f,[k]:v}));

  const filtered = typeFilter==='all' ? agents : agents.filter(a=>a.type===typeFilter);

  const startAdd  = () => { setForm(EMPTY_AGENT); setEditAgent(null); setShowForm(true); setSelected(null); };
  const startEdit = (a) => { setForm({...a}); setEditAgent(a.id); setShowForm(true); setSelected(null); };

  const save = () => {
    if (!form.name || !form.phone) { toast('Name & phone required','error'); return; }
    if (!form.username) form.username = form.name.toLowerCase().replace(/\s+/g,'').slice(0,10);
    if (!form.password) form.password = form.name.toLowerCase().replace(/\s+/g,'').slice(0,6) + '2025';
    if (editAgent) {
      saveAgents(prev=>prev.map(a=>a.id===editAgent?{...form,id:editAgent}:a));
      toast('✅ Updated!');
    } else {
      const id = form.type==='employee'?`EMP-${Date.now()}`:`AG-${Date.now()}`;
      saveAgents(prev => [{...form, id}, ...prev]);
      toast('✅ Added!');
    }
    setShowForm(false); setEditAgent(null);
  };

  const remove = (id) => {
    if (confirm('Remove this agent/employee?')) {
      saveAgents(prev=>prev.filter(a=>a.id!==id));
      toast('🗑️ Removed'); setSelected(null);
    }
  };

  const buildForward = () => {
    const tour  = TOURS.find(t=>t.id===selTour||t.slug===selTour);
    const agent = agents.find(a=>a.id===selAgent);
    if (!tour||!agent) return;
    const commText = agent.commissionType==='percentage'?`${agent.commission}% of booking value`:
                     agent.commissionType==='fixed'?`AED ${agent.commission} per booking`:`Monthly salary`;
    setFwdMsg(`🗺️ *Tour Forwarding — DubaiRovers*\n\nDear ${agent.contact},\n\nWe have a tour enquiry for:\n\n📍 *Tour:* ${tour.name}\n💰 *Price:* AED ${tour.pricing?.adult}/person\n⏱️ *Duration:* ${tour.duration}\n👥 *Max:* ${tour.groupSize?.max} guests\n\n💸 *Your Commission:* ${commText}\n🔗 *Your Login:*\n  Username: ${agent.username}\n  Dashboard: https://dubairovers.com/agent-portal\n\nPlease confirm availability.\n\n— DubaiRovers 🌟\n+971544735060`);
  };

  const forward = () => {
    const agent = agents.find(a=>a.id===selAgent);
    if (!agent||!fwdMsg) return;
    window.open(`https://wa.me/${agent.phone.replace(/\s+/g,'')}?text=${encodeURIComponent(fwdMsg)}`,'_blank');
    toast(`📤 Forwarded to ${agent.name}`);
  };

  const BADGE = { agent:'🤝 Agent', employee:'💼 Employee', freelancer:'🔧 Freelancer' };
  const BADGE_COLORS = { agent:'bg-amber-100 text-amber-700', employee:'bg-blue-100 text-blue-700', freelancer:'bg-orange-100 text-orange-700' };

  return (
    <div className="space-y-6">
      <ToastContainer />
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-black text-brand-navy" style={{fontFamily:"'Playfair Display',serif"}}>
          👥 Agents, Employees & Freelancers
        </h1>
        <div className="flex gap-2">
          <button onClick={()=>setShowFwd(!showFwd)} className="btn-outline text-sm px-4 py-2">📤 Forward Tour</button>
          <button onClick={startAdd} className="btn-gold text-sm px-4 py-2">+ Add New</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {emoji:'🤝',label:'Total Agents',   value:agents.filter(a=>a.type==='agent').length,      color:'#D4AF37'},
          {emoji:'💼',label:'Employees',       value:agents.filter(a=>a.type==='employee').length,   color:'#1E3A5F'},
          {emoji:'🔧',label:'Freelancers',     value:agents.filter(a=>a.type==='freelancer').length, color:'#F59E0B'},
          {emoji:'✅',label:'Active',          value:agents.filter(a=>a.status==='active').length,   color:'#10B981'},
        ].map(s=>(
          <div key={s.label} className="rounded-2xl bg-white p-5" style={{boxShadow:'0 2px 12px rgba(10,22,40,0.06)',border:'1px solid #e2e8f0'}}>
            <div className="text-2xl mb-2">{s.emoji}</div>
            <div className="text-2xl font-black" style={{color:s.color}}>{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Type filter */}
      <div className="flex gap-2 flex-wrap">
        {TYPES.map(t=>(
          <button key={t.id} onClick={()=>setTypeFilter(t.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${typeFilter===t.id?'text-brand-navy':'bg-white text-gray-500 border border-gray-200'}`}
            style={typeFilter===t.id?{background:'linear-gradient(135deg,#D4AF37,#F0D060)'}:{}}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tour Forward tool */}
      {showFwd && (
        <div className="rounded-2xl p-5 animate-slide-up" style={{background:'linear-gradient(135deg,#0A1628,#1E3A5F)',border:'1px solid rgba(212,175,55,0.2)'}}>
          <h3 className="text-white font-bold mb-4">📤 Forward Tour to Agent</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="block text-xs font-bold text-white/60 mb-1.5 uppercase tracking-wide">Select Tour</label>
              <select value={selTour} onChange={e=>{setSelTour(e.target.value);setFwdMsg('');}} className="input-field text-sm">
                <option value="">Choose tour...</option>
                {TOURS.map(t=><option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-white/60 mb-1.5 uppercase tracking-wide">Select Agent</label>
              <select value={selAgent} onChange={e=>{setSelAgent(e.target.value);setFwdMsg('');}} className="input-field text-sm">
                <option value="">Choose agent...</option>
                {agents.filter(a=>a.type!=='employee').map(a=><option key={a.id} value={a.id}>{a.name} ({a.commission}{a.commissionType==='percentage'?'%':a.commissionType==='fixed'?' AED fixed':'/mo'})</option>)}
              </select>
            </div>
          </div>
          <button onClick={buildForward} disabled={!selTour||!selAgent}
            className="btn-gold text-sm px-4 py-2 mb-3 disabled:opacity-50">
            📋 Build Message
          </button>
          {fwdMsg && (
            <div className="space-y-2">
              <textarea value={fwdMsg} onChange={e=>setFwdMsg(e.target.value)} rows={8}
                className="w-full p-3 rounded-xl text-xs font-mono resize-none text-white bg-white/10 border border-white/20" />
              <button onClick={forward} className="px-5 py-2.5 rounded-full font-bold text-white text-sm" style={{background:'#25D366'}}>
                💬 Send via WhatsApp
              </button>
            </div>
          )}
        </div>
      )}

      {/* Add/Edit form */}
      {showForm && (
        <div className="rounded-3xl bg-white p-6 animate-slide-up" style={{boxShadow:'0 4px 24px rgba(10,22,40,0.1)',border:'1px solid rgba(212,175,55,0.2)'}}>
          <h3 className="font-bold text-brand-navy mb-5 text-lg" style={{fontFamily:"'Playfair Display',serif"}}>{editAgent?'✏️ Edit':'➕ Add New'}</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="lg:col-span-4">
              <label className="block text-xs font-bold text-brand-navy mb-2">Type</label>
              <div className="flex gap-2">
                {[{v:'agent',l:'🤝 Agent'},{v:'employee',l:'💼 Employee'},{v:'freelancer',l:'🔧 Freelancer'}].map(t=>(
                  <button key={t.v} type="button" onClick={()=>upd('type',t.v)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all ${form.type===t.v?'border-brand-gold text-brand-navy':'border-gray-200 text-gray-500'}`}
                    style={form.type===t.v?{background:'linear-gradient(135deg,#D4AF37,#F0D060)'}:{}}>
                    {t.l}
                  </button>
                ))}
              </div>
            </div>
            {[['Name *','name'],['Contact Person','contact'],['Phone *','phone'],['Email','email']].map(([l,k])=>(
              <div key={k}><label className="block text-xs font-bold text-brand-navy mb-1.5">{l}</label><input value={form[k]} onChange={e=>upd(k,e.target.value)} className="input-field text-sm" /></div>
            ))}
            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1.5">Commission Type</label>
              <select value={form.commissionType} onChange={e=>upd('commissionType',e.target.value)} className="input-field text-sm">
                {COMM_TYPES.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1.5">
                {form.commissionType==='percentage'?'Commission %':form.commissionType==='fixed'?'Fixed AED/booking':'Monthly Salary (AED)'}
              </label>
              <input type="number" value={form.commission} onChange={e=>upd('commission',+e.target.value)} className="input-field text-sm" />
            </div>
            <div><label className="block text-xs font-bold text-brand-navy mb-1.5">Specialty</label><input value={form.specialty} onChange={e=>upd('specialty',e.target.value)} className="input-field text-sm" placeholder="Tour Guide, Driver..." /></div>
            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1.5">Status</label>
              <select value={form.status} onChange={e=>upd('status',e.target.value)} className="input-field text-sm">
                <option value="active">✅ Active</option>
                <option value="inactive">⏸️ Inactive</option>
              </select>
            </div>
            <div><label className="block text-xs font-bold text-brand-navy mb-1.5">🔑 Username (Portal Login)</label><input value={form.username} onChange={e=>upd('username',e.target.value)} placeholder="auto-generated if blank" className="input-field text-sm" /></div>
            <div><label className="block text-xs font-bold text-brand-navy mb-1.5">🔒 Password</label><input value={form.password} onChange={e=>upd('password',e.target.value)} placeholder="auto-generated if blank" className="input-field text-sm" /></div>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={save} className="btn-gold flex-1 justify-center py-3">💾 Save</button>
            <button type="button" onClick={()=>{setShowForm(false);setEditAgent(null);}} className="btn-outline px-5 py-3 text-sm">Cancel</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="flex gap-5">
        <div className={`rounded-2xl bg-white overflow-hidden flex-1 min-w-0 ${selected?'lg:max-w-[65%]':''}`}
          style={{boxShadow:'0 2px 12px rgba(10,22,40,0.06)',border:'1px solid #e2e8f0'}}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['Name','Type','Commission','Bookings','Earnings','Status','Actions'].map(h=>(
                    <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((a,i)=>(
                  <tr key={a.id} onClick={()=>setSelected(a)}
                    className={`border-b border-gray-50 cursor-pointer hover:bg-amber-50/30 ${selected?.id===a.id?'bg-amber-50':i%2?'bg-gray-50/20':''}`}>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-brand-navy text-sm">{a.name}</div>
                      <div className="text-xs text-gray-400">{a.contact}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${BADGE_COLORS[a.type]||'bg-gray-100 text-gray-600'}`}>
                        {BADGE[a.type]||a.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold text-brand-navy">
                      {a.commissionType==='percentage'?`${a.commission}%`:a.commissionType==='salary'?`AED ${a.commission}/mo`:`AED ${a.commission}/trip`}
                    </td>
                    <td className="px-4 py-3 text-center font-semibold">{a.bookings}</td>
                    <td className="px-4 py-3 font-bold text-brand-gold">AED {a.earnings?.toLocaleString()||0}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${a.status==='active'?'bg-emerald-100 text-emerald-700':'bg-gray-100 text-gray-500'}`}>
                        {a.status==='active'?'✅ Active':'⏸️ Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3" onClick={e=>e.stopPropagation()}>
                      <div className="flex gap-1">
                        <button onClick={()=>startEdit(a)} className="px-2 py-1.5 rounded-lg text-xs font-bold bg-amber-100 text-amber-700">✏️</button>
                        <button onClick={()=>setShowCred(a)} className="px-2 py-1.5 rounded-lg text-xs font-bold bg-brand-navy text-brand-gold">🔑</button>
                        <a href={`https://wa.me/${a.phone?.replace(/\s+/g,'')}`} target="_blank" rel="noopener noreferrer"
                          className="px-2 py-1.5 rounded-lg text-xs font-bold text-white" style={{background:'#25D366'}}>💬</a>
                        <button onClick={()=>remove(a.id)} className="px-2 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-500">🗑️</button>
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
          <div className="hidden lg:block w-64 shrink-0">
            <div className="rounded-2xl bg-white overflow-hidden sticky top-24"
              style={{boxShadow:'0 4px 24px rgba(10,22,40,0.1)',border:'1px solid rgba(212,175,55,0.2)'}}>
              <div className="p-4 flex items-center justify-between" style={{background:'linear-gradient(135deg,#0A1628,#1E3A5F)'}}>
                <span className="text-white font-bold text-sm">{BADGE[selected.type]||selected.type}</span>
                <button onClick={()=>setSelected(null)} className="text-white/60 hover:text-white text-lg">✕</button>
              </div>
              <div className="p-4 space-y-2.5 text-xs">
                {[['👤 Name',selected.name],['📱 Phone',selected.phone],['📧 Email',selected.email],['🎯 Specialty',selected.specialty],
                  ['💸 Commission',selected.commissionType==='percentage'?`${selected.commission}%`:selected.commissionType==='salary'?`AED ${selected.commission}/mo`:`AED ${selected.commission}/trip`],
                  ['📋 Bookings',selected.bookings],['💰 Earnings',`AED ${selected.earnings?.toLocaleString()||0}`],
                  ['📅 Joined',selected.joinDate],
                ].map(([k,v])=>(
                  <div key={k} className="flex justify-between">
                    <span className="text-gray-400">{k}</span>
                    <span className="font-semibold text-brand-navy text-right max-w-[55%] break-words">{v}</span>
                  </div>
                ))}
                <div className="pt-3 border-t border-gray-100 space-y-2">
                  <button onClick={()=>startEdit(selected)} className="btn-gold w-full justify-center text-xs py-2.5">✏️ Edit</button>
                  <button onClick={()=>setShowCred(selected)} className="btn-navy w-full justify-center text-xs py-2.5">🔑 Show Login</button>
                  <a href={`https://wa.me/${selected.phone?.replace(/\s+/g,'')}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs font-bold text-white" style={{background:'#25D366'}}>
                    💬 WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Credentials modal */}
      {showCred && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl">
            <div className="text-center mb-5">
              <div className="text-4xl mb-2">🔑</div>
              <h3 className="font-bold text-brand-navy text-lg" style={{fontFamily:"'Playfair Display',serif"}}>Portal Login Credentials</h3>
              <p className="text-gray-500 text-sm">{showCred.name}</p>
            </div>
            <div className="space-y-3 mb-5">
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div className="text-xs font-bold text-gray-400 mb-1">Login URL</div>
                <div className="font-mono text-sm text-brand-navy">dubairovers.com/agent-portal</div>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div className="text-xs font-bold text-gray-400 mb-1">Username</div>
                <div className="font-mono text-sm font-bold text-brand-navy">{showCred.username||'—'}</div>
              </div>
              <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                <div className="text-xs font-bold text-gray-400 mb-1">Password</div>
                <div className="font-mono text-sm font-bold text-brand-navy">{showCred.password||'—'}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>{
                const msg=`🔑 *DubaiRovers Agent Portal — Login Credentials*\n\nDear ${showCred.contact||showCred.name},\n\n🌐 Login URL: https://dubairovers.com/agent-portal\n👤 Username: ${showCred.username||'—'}\n🔒 Password: ${showCred.password||'—'}\n\nKeep these credentials confidential.\n\n— DubaiRovers Team 🌟`;
                window.open(`https://wa.me/${showCred.phone?.replace(/\s+/g,'')}?text=${encodeURIComponent(msg)}`,'_blank');
              }} className="flex-1 py-2.5 rounded-xl font-bold text-white text-sm" style={{background:'#25D366'}}>💬 Send via WA</button>
              <button onClick={()=>setShowCred(null)} className="px-4 py-2.5 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
