'use client';
import { useState } from 'react';
import { TOURS, TOUR_CATEGORIES } from '../../../data/tours';
import { useLocalStore, useToast } from '../../../hooks/useAdminStore';

const EMPTY_TOUR = {
  name:'', category:'desert-safari', duration:'', pricing:{ adult:'', child:'', infant:0, currency:'AED' },
  shortDesc:'', description:'', highlights:[], inclusions:[], exclusions:[], addOns:[],
  languages:['English','Arabic'], minAge:3, groupSize:{ min:1, max:20 },
  cancellation:'Free cancellation up to 24 hours before', instantConfirmation:true, mobileVoucher:true,
  featured:false, trending:false, tag:'',
};

export default function AdminTours() {
  const { data: tours, save: saveTours, loaded } = useLocalStore('tours', TOURS);
  const { show: toast, ToastContainer } = useToast();
  const [view,      setView]      = useState('list');
  const [editing,   setEditing]   = useState(null);
  const [form,      setForm]      = useState(EMPTY_TOUR);
  const [search,    setSearch]    = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const filtered = tours.filter(t => {
    const ms = !search || t.name.toLowerCase().includes(search.toLowerCase());
    const mc = catFilter === 'all' || t.category === catFilter;
    return ms && mc;
  });

  const startNew = () => { setForm(EMPTY_TOUR); setEditing('new'); setView('form'); };
  const startEdit = (t) => { setForm({ ...t }); setEditing(t.id); setView('form'); };

  const deleteTour = (id) => {
    if (confirm('Delete this tour? This cannot be undone.')) {
      saveTours(prev => prev.filter(t => t.id !== id));
      toast('🗑️ Tour deleted');
    }
  };

  const saveTour = () => {
    if (!form.name || !form.category || !form.pricing?.adult) {
      toast('Please fill: Name, Category, Adult Price', 'error');
      return;
    }
    const slug = form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (editing === 'new') {
      const newTour = { ...form, id:`tour-${Date.now()}`, slug, bookingCount:0, reviewCount:0, rating:4.8,
        images: form.images?.length ? form.images : ['https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800'] };
      const updated = saveTours(prev => [newTour, ...prev]);
      window.dispatchEvent(new CustomEvent('dr_data_update', { detail: { key: 'tours', data: [newTour, ...tours] } }));
      toast('✅ New tour added — now visible on visitor site!');
    } else {
      saveTours(prev => prev.map(t => t.id === editing ? { ...t, ...form, slug } : t));
      window.dispatchEvent(new CustomEvent('dr_data_update', { detail: { key: 'tours', data: tours.map(t => t.id === editing ? {...t,...form,slug} : t) } }));
      toast('✅ Tour updated — changes live on visitor site!');
    }
    setView('list');
    setEditing(null);
    setForm(EMPTY_TOUR);
  };

  if (view === 'form') {
    return (
      <div className="space-y-6">
        <ToastContainer />
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-2xl font-black text-brand-navy" style={{ fontFamily:"'Playfair Display',serif" }}>
            {editing === 'new' ? '➕ Add New Tour' : '✏️ Edit Tour'}
          </h1>
          <div className="flex gap-2">
            <button onClick={() => setView('list')} className="btn-outline text-sm px-4 py-2">← Cancel</button>
            <button onClick={saveTour} className="btn-gold text-sm px-4 py-2">💾 Save Tour</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left column */}
          <div className="space-y-5">
            <div className="rounded-2xl bg-white p-6" style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>
              <h3 className="font-bold text-brand-navy mb-4">📝 Basic Info</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1.5">🗺️ Tour Name *</label>
                  <input value={form.name} onChange={e=>upd('name',e.target.value)} className="input-field" required placeholder="e.g. Evening Desert Safari with BBQ Dinner" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-brand-navy mb-1.5">📁 Category *</label>
                    <select value={form.category} onChange={e=>upd('category',e.target.value)} className="input-field text-sm">
                      {TOUR_CATEGORIES.map(c => <option key={c.slug} value={c.slug}>{c.emoji} {c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-navy mb-1.5">⏱️ Duration</label>
                    <input value={form.duration} onChange={e=>upd('duration',e.target.value)} className="input-field" placeholder="e.g. 6 hours" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1.5">📋 Short Description</label>
                  <textarea value={form.shortDesc} onChange={e=>upd('shortDesc',e.target.value)} rows={2} className="input-field resize-none" placeholder="One-line summary for tour cards" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1.5">📄 Full Description</label>
                  <textarea value={form.description} onChange={e=>upd('description',e.target.value)} rows={5} className="input-field resize-none" placeholder="Full tour description..." />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1.5">🏷️ Tag Badge (emoji + text)</label>
                  <input value={form.tag} onChange={e=>upd('tag',e.target.value)} className="input-field" placeholder="e.g. 🔥 Best Seller" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6" style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>
              <h3 className="font-bold text-brand-navy mb-4">💰 Pricing (AED)</h3>
              <div className="grid grid-cols-3 gap-3">
                {['adult','child','infant'].map(k => (
                  <div key={k}>
                    <label className="block text-xs font-bold text-brand-navy mb-1.5 capitalize">{k==='adult'?'👤 Adult':k==='child'?'👦 Child':'👶 Infant'}</label>
                    <input type="number" value={form.pricing?.[k]||''} onChange={e=>upd('pricing',{...form.pricing,[k]:+e.target.value})} className="input-field" placeholder="AED" />
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6" style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>
              <h3 className="font-bold text-brand-navy mb-4">⚙️ Tour Settings</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1.5">👶 Min Age</label>
                  <input type="number" value={form.minAge} onChange={e=>upd('minAge',+e.target.value)} className="input-field" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1.5">👥 Max Group</label>
                  <input type="number" value={form.groupSize?.max||20} onChange={e=>upd('groupSize',{...form.groupSize,max:+e.target.value})} className="input-field" />
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {[
                  ['featured',              '⭐ Featured Tour'],
                  ['trending',              '🔥 Trending'],
                  ['instantConfirmation',   '⚡ Instant Confirmation'],
                  ['mobileVoucher',         '📱 Mobile Voucher Accepted'],
                ].map(([k,l]) => (
                  <label key={k} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={!!form[k]} onChange={e=>upd(k,e.target.checked)} className="accent-brand-gold w-4 h-4" />
                    <span className="text-sm font-medium text-brand-navy">{l}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-5">
            <div className="rounded-2xl bg-white p-6" style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>
              <h3 className="font-bold text-brand-navy mb-4">✅ Inclusions / ❌ Exclusions</h3>
              <div className="mb-4">
                <label className="block text-xs font-bold text-brand-navy mb-2">✅ What's Included (one per line)</label>
                <textarea
                  value={Array.isArray(form.inclusions)?form.inclusions.join('\n'):form.inclusions}
                  onChange={e=>upd('inclusions',e.target.value.split('\n').filter(Boolean))}
                  rows={5} className="input-field resize-none text-sm"
                  placeholder="✅ Hotel pickup & drop-off&#10;✅ Dune bashing&#10;✅ BBQ dinner" />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-2">❌ Not Included (one per line)</label>
                <textarea
                  value={Array.isArray(form.exclusions)?form.exclusions.join('\n'):form.exclusions}
                  onChange={e=>upd('exclusions',e.target.value.split('\n').filter(Boolean))}
                  rows={4} className="input-field resize-none text-sm"
                  placeholder="❌ Alcoholic beverages&#10;❌ Personal expenses" />
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6" style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>
              <h3 className="font-bold text-brand-navy mb-4">🌟 Highlights (one per line)</h3>
              <textarea
                value={Array.isArray(form.highlights)?form.highlights.join('\n'):form.highlights}
                onChange={e=>upd('highlights',e.target.value.split('\n').filter(Boolean))}
                rows={6} className="input-field resize-none text-sm"
                placeholder="🏜️ Thrilling dune bashing&#10;🐪 Camel riding&#10;🍖 BBQ buffet dinner" />
            </div>

            <div className="rounded-2xl bg-white p-6" style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>
              <h3 className="font-bold text-brand-navy mb-4">🔍 SEO</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1.5">SEO Title (max 60 chars)</label>
                  <input value={form.seoTitle||''} onChange={e=>upd('seoTitle',e.target.value)} className="input-field text-sm" placeholder="Tour Name | DubaiRovers" />
                  <div className="text-xs text-gray-400 mt-1">{(form.seoTitle||'').length}/60 chars</div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1.5">Meta Description (max 160 chars)</label>
                  <textarea value={form.seoDesc||''} onChange={e=>upd('seoDesc',e.target.value)} rows={3} className="input-field resize-none text-sm" placeholder="Compelling meta description..." />
                  <div className="text-xs text-gray-400 mt-1">{(form.seoDesc||'').length}/160 chars</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <button onClick={() => setView('list')} className="btn-outline px-6 py-3">← Cancel</button>
          <button onClick={saveTour} className="btn-gold px-8 py-3">💾 Save Tour</button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ToastContainer />
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-black text-brand-navy" style={{ fontFamily:"'Playfair Display',serif" }}>
          🗺️ Tour Management
        </h1>
        <button onClick={startNew} className="btn-gold text-sm px-4 py-2">+ Add New Tour</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { emoji:'🗺️', label:'Total Tours', value:tours.length, color:'#1E3A5F' },
          { emoji:'⭐', label:'Featured',     value:tours.filter(t=>t.featured).length, color:'#D4AF37' },
          { emoji:'🔥', label:'Trending',     value:tours.filter(t=>t.trending).length, color:'#EF4444' },
          { emoji:'⚡', label:'Instant Conf.', value:tours.filter(t=>t.instantConfirmation).length, color:'#10B981' },
        ].map(s=>(
          <div key={s.label} className="rounded-2xl bg-white p-5" style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>
            <div className="text-xl mb-1">{s.emoji}</div>
            <div className="text-2xl font-black" style={{ color:s.color }}>{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap items-center">
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search tours..."
          className="input-field text-sm py-2 w-52" />
        <select value={catFilter} onChange={e=>setCatFilter(e.target.value)} className="input-field text-sm py-2 w-44">
          <option value="all">All Categories</option>
          {TOUR_CATEGORIES.map(c=><option key={c.slug} value={c.slug}>{c.emoji} {c.name}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white overflow-hidden" style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Tour','Category','Duration','Price','Rating','Bookings','Status','Actions'].map(h=>(
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((t,i)=>(
                <tr key={t.id} className={`border-b border-gray-50 hover:bg-amber-50/30 transition-colors ${i%2===0?'':'bg-gray-50/20'}`}>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-brand-navy text-sm max-w-[200px] truncate">{t.name}</div>
                    {t.tag && <span className="text-xs text-brand-gold font-medium">{t.tag}</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-navy/10 text-brand-navy capitalize">
                      {t.category.replace(/-/g,' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">{t.duration}</td>
                  <td className="px-4 py-3 font-black text-brand-navy">AED {t.pricing?.adult}</td>
                  <td className="px-4 py-3">
                    <span className="text-amber-500 font-bold text-xs">★ {t.rating}</span>
                    <div className="text-xs text-gray-400">({t.reviewCount?.toLocaleString('en-US')})</div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-center">{t.bookingCount?.toLocaleString('en-US')}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      {t.featured && <span className="badge-gold text-[10px] px-2 py-0.5">⭐ Featured</span>}
                      {t.trending && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-600">🔥 Trending</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <button onClick={() => startEdit(t)}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-brand-navy text-brand-gold hover:bg-brand-blue">
                        ✏️ Edit
                      </button>
                      <button onClick={() => deleteTour(t.id)}
                        className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-500 hover:bg-red-100">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
