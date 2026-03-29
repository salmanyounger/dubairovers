'use client';
import { useState, useEffect, useMemo } from 'react';
import { ALL_BLOGS, BLOG_CATEGORIES, AUTO_LINK_MAP } from '../../../data/blog_database';
import { useLocalStore, useToast } from '../../../hooks/useAdminStore';

// ─── Status badge ────────────────────────────────────────────────
function StatusBadge({ status }) {
  const s = {
    published: 'bg-emerald-100 text-emerald-700',
    scheduled:  'bg-blue-100 text-blue-700',
    draft:      'bg-gray-100 text-gray-500',
  };
  const icons = { published:'✅', scheduled:'🕐', draft:'📝' };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${s[status]||s.draft}`}>
      {icons[status]||'📝'} {status}
    </span>
  );
}

// ─── Blog Editor Modal ────────────────────────────────────────────
function BlogEditor({ blog, onSave, onClose }) {
  const [form, setForm] = useState({
    title:      blog.title      || '',
    excerpt:    blog.excerpt    || '',
    content:    blog.content    || '',
    category:   blog.category   || 'uae-destinations',
    tags:       (blog.tags||[]).join(', '),
    image:      blog.image      || '',
    seoTitle:   blog.seoTitle   || '',
    seoDesc:    blog.seoDesc    || '',
    publishAt:  blog.publishAt  ? blog.publishAt.split('T')[0] : new Date().toISOString().split('T')[0],
    publishTime: '09:00',
    status:     blog.status     || 'draft',
    featured:   blog.featured   || false,
  });
  const upd = (k,v) => setForm(f=>({...f,[k]:v}));

  const handleSave = () => {
    const publishAt = `${form.publishAt}T05:00:00.000Z`; // 9am Dubai = 5am UTC
    onSave({
      ...blog,
      ...form,
      publishAt,
      publishedAt: form.status === 'published' ? form.publishAt : null,
      tags: form.tags.split(',').map(t=>t.trim()).filter(Boolean),
      slug: form.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-3xl my-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b sticky top-0 bg-white rounded-t-3xl z-10">
          <h2 className="font-bold text-brand-navy text-lg" style={{fontFamily:"'Playfair Display',serif"}}>
            ✏️ {blog.id ? 'Edit Blog Post' : 'New Blog Post'}
          </h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-100">✕</button>
        </div>

        <div className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-brand-navy mb-1.5">📰 Blog Title *</label>
            <input value={form.title} onChange={e=>upd('title',e.target.value)}
              className="input-field text-sm font-semibold" placeholder="Enter compelling blog title..." />
          </div>

          {/* Category + Status row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1.5">📂 Category</label>
              <select value={form.category} onChange={e=>upd('category',e.target.value)} className="input-field text-sm">
                {BLOG_CATEGORIES.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1.5">📊 Status</label>
              <select value={form.status} onChange={e=>upd('status',e.target.value)} className="input-field text-sm">
                <option value="draft">📝 Draft</option>
                <option value="scheduled">🕐 Scheduled</option>
                <option value="published">✅ Published</option>
              </select>
            </div>
          </div>

          {/* Schedule */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1.5">📅 Publish Date</label>
              <input type="date" value={form.publishAt} onChange={e=>upd('publishAt',e.target.value)} className="input-field text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1.5">⏰ Publish Time (Dubai)</label>
              <div className="input-field text-sm text-gray-500 flex items-center gap-2">
                <span>🕘</span> <span className="font-semibold">9:00 AM Dubai Time</span>
                <span className="text-xs text-gray-400 ml-auto">(fixed daily)</span>
              </div>
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-xs font-bold text-brand-navy mb-1.5">📋 Excerpt / Summary</label>
            <textarea value={form.excerpt} onChange={e=>upd('excerpt',e.target.value)} rows={3}
              className="input-field resize-none text-sm" placeholder="1-2 sentence summary for SEO and blog listings..." />
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-brand-navy">📝 Content</label>
              <div className="flex gap-1.5">
                {['## ', '**bold**', '[link](url)', '- item'].map(t=>(
                  <button key={t} type="button"
                    onClick={()=>upd('content', form.content + '\n' + t)}
                    className="px-2 py-1 rounded text-[10px] font-mono bg-gray-100 text-gray-600 hover:bg-gray-200">
                    {t.replace(/##\s/,'H2 ').replace(/\*\*/g,'').replace(/\[|\]\(url\)/g,'')||'link'}
                  </button>
                ))}
              </div>
            </div>
            <textarea value={form.content} onChange={e=>upd('content',e.target.value)} rows={12}
              className="input-field resize-y text-sm font-mono leading-relaxed"
              placeholder="Write full blog content here. Use ## for headings, **bold**, - for lists.

## Introduction
Write your intro here...

## Section 1
Content...

## Conclusion
Wrap up with CTA to book a tour..." />
            <p className="text-xs text-gray-400 mt-1">
              💡 Internal links are auto-added when published based on keywords. {form.content ? `${form.content.split(' ').length} words` : '0 words'}
            </p>
          </div>

          {/* Image */}
          <div>
            <label className="block text-xs font-bold text-brand-navy mb-1.5">🖼️ Featured Image URL</label>
            <input value={form.image} onChange={e=>upd('image',e.target.value)}
              className="input-field text-sm" placeholder="https://images.unsplash.com/..." />
            {form.image && (
              <div className="mt-2 h-28 rounded-xl overflow-hidden">
                <img src={form.image} alt="" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold text-brand-navy mb-1.5">🏷️ Tags (comma separated)</label>
            <input value={form.tags} onChange={e=>upd('tags',e.target.value)}
              className="input-field text-sm" placeholder="Dubai, Desert Safari, Travel Tips, UAE..." />
          </div>

          {/* Internal links preview */}
          <div className="rounded-xl p-4" style={{background:'rgba(212,175,55,0.06)',border:'1px solid rgba(212,175,55,0.2)'}}>
            <div className="text-xs font-bold text-brand-navy mb-2">🔗 Auto-Link Engine — Tour Keywords Detected</div>
            <div className="flex flex-wrap gap-1.5">
              {AUTO_LINK_MAP.map(m => {
                const found = m.keywords.some(kw =>
                  (form.title + ' ' + form.content + ' ' + form.excerpt).toLowerCase().includes(kw.toLowerCase())
                );
                return found ? (
                  <span key={m.tourSlug} className="px-2 py-1 rounded-lg text-[11px] font-semibold bg-emerald-100 text-emerald-700">
                    ✓ {m.label}
                  </span>
                ) : null;
              }).filter(Boolean)}
              {!AUTO_LINK_MAP.some(m=>m.keywords.some(kw=>(form.title+form.content+form.excerpt).toLowerCase().includes(kw.toLowerCase()))) && (
                <span className="text-xs text-gray-400">No tour keywords detected yet — add content to auto-link tours</span>
              )}
            </div>
          </div>

          {/* SEO */}
          <div className="rounded-xl p-4 bg-gray-50 space-y-3">
            <div className="text-xs font-bold text-brand-navy">🔍 SEO Settings</div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 mb-1">SEO Title (max 60 chars)</label>
              <input value={form.seoTitle} onChange={e=>upd('seoTitle',e.target.value)}
                className="input-field text-sm" placeholder="Blog Title | DubaiRovers" maxLength={60} />
              <div className="text-right text-[10px] text-gray-400 mt-0.5">{form.seoTitle.length}/60</div>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-400 mb-1">Meta Description (max 160 chars)</label>
              <textarea value={form.seoDesc} onChange={e=>upd('seoDesc',e.target.value)}
                rows={2} className="input-field resize-none text-sm" maxLength={160} />
              <div className="text-right text-[10px] text-gray-400 mt-0.5">{form.seoDesc.length}/160</div>
            </div>
          </div>

          {/* Featured */}
          <label className="flex items-center gap-3 cursor-pointer">
            <div onClick={()=>upd('featured',!form.featured)}
              className={`w-11 h-6 rounded-full transition-all relative ${form.featured?'bg-brand-gold':'bg-gray-200'}`}>
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${form.featured?'left-6':'left-1'}`}/>
            </div>
            <span className="text-sm font-semibold text-brand-navy">⭐ Featured Post (shows at top of blog page)</span>
          </label>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-5 border-t sticky bottom-0 bg-white rounded-b-3xl">
          <button onClick={handleSave} className="btn-gold flex-1 justify-center py-3.5">💾 Save Blog Post</button>
          <button onClick={onClose} className="btn-outline px-5 py-3 text-sm">Cancel</button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ADMIN BLOG PAGE ────────────────────────────────────────
export default function AdminBlog() {
  const { data: blogs, save: saveBlogs } = useLocalStore('blog_posts', ALL_BLOGS);
  const { show: toast, ToastContainer } = useToast();

  const [view,          setView]          = useState('list');
  const [editBlog,      setEditBlog]      = useState(null);
  const [filterStatus,  setFilterStatus]  = useState('all');
  const [filterCat,     setFilterCat]     = useState('all');
  const [search,        setSearch]        = useState('');
  const [page,          setPage]          = useState(1);
  const [showImport,    setShowImport]    = useState(false);
  const PER_PAGE = 25;

  // ── Initialise: merge new database blogs into localStorage ──
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('dr_admin_blog_posts') || 'null');
    if (!stored || stored.length < ALL_BLOGS.length) {
      // First time or database has more blogs — seed all
      saveBlogs(ALL_BLOGS);
      toast(`📚 Loaded ${ALL_BLOGS.length} blogs into system`);
    }
  // eslint-disable-next-line
  }, []);

  // ── Auto-publish scheduler — check every minute ─────────────
  useEffect(() => {
    const check = () => {
      const now = new Date();
      let updated = false;
      const newBlogs = blogs.map(b => {
        if (b.status === 'scheduled' && b.publishAt && new Date(b.publishAt) <= now) {
          updated = true;
          return { ...b, status: 'published', publishedAt: b.publishAt.split('T')[0] };
        }
        return b;
      });
      if (updated) {
        saveBlogs(newBlogs);
        toast('🚀 Scheduled blog auto-published!');
        window.dispatchEvent(new CustomEvent('dr_data_update', { detail: { key:'blog_posts', data:newBlogs } }));
      }
    };
    check();
    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  // eslint-disable-next-line
  }, [blogs]);

  // ── Filters ──────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return blogs.filter(b => {
      if (filterStatus !== 'all' && b.status !== filterStatus) return false;
      if (filterCat !== 'all' && b.category !== filterCat) return false;
      if (search && !b.title.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [blogs, filterStatus, filterCat, search]);

  const paginated = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  // ── Stats ─────────────────────────────────────────────────────
  const stats = useMemo(() => ({
    total:     blogs.length,
    published: blogs.filter(b=>b.status==='published').length,
    scheduled: blogs.filter(b=>b.status==='scheduled').length,
    drafts:    blogs.filter(b=>b.status==='draft').length,
    next:      blogs.filter(b=>b.status==='scheduled').sort((a,b)=>new Date(a.publishAt)-new Date(b.publishAt))[0],
  }), [blogs]);

  // ── Actions ───────────────────────────────────────────────────
  const saveBlog = (updated) => {
    if (updated.id) {
      saveBlogs(prev => prev.map(b => b.id === updated.id ? updated : b));
      toast('✅ Blog saved!');
    } else {
      const newBlog = { ...updated, id:`blog-custom-${Date.now()}`, views:0 };
      saveBlogs(prev => [newBlog, ...prev]);
      toast('✅ New blog created!');
    }
    window.dispatchEvent(new CustomEvent('dr_data_update', { detail: { key:'blog_posts', data:blogs } }));
    setEditBlog(null);
  };

  const deleteBlog = (id) => {
    if (!confirm('Delete this blog post? Cannot be undone.')) return;
    saveBlogs(prev => prev.filter(b => b.id !== id));
    toast('🗑️ Blog deleted');
  };

  const publishNow = (id) => {
    const updated = blogs.map(b => b.id===id ? {...b, status:'published', publishedAt:new Date().toISOString().split('T')[0]} : b);
    saveBlogs(updated);
    toast('🚀 Published! Now visible on visitor site.');
    window.dispatchEvent(new CustomEvent('dr_data_update', { detail: { key:'blog_posts', data:updated } }));
  };

  const setToDraft = (id) => {
    const updated = blogs.map(b => b.id===id ? {...b, status:'draft', publishedAt:null} : b);
    saveBlogs(updated);
    toast('📝 Moved to drafts');
    window.dispatchEvent(new CustomEvent('dr_data_update', { detail: { key:'blog_posts', data:updated } }));
  };

  // ── Bulk schedule — assign consecutive daily dates ──────────
  const bulkSchedule = () => {
    if (!confirm(`Auto-schedule all ${stats.drafts} drafts? Each will publish at 9am Dubai time, 1 per day.`)) return;
    let dayOffset = 1;
    const now = new Date();
    // Find the next available slot after last scheduled
    const lastScheduled = blogs.filter(b=>b.status==='scheduled').sort((a,b)=>new Date(b.publishAt)-new Date(a.publishAt))[0];
    if (lastScheduled) {
      const lastDate = new Date(lastScheduled.publishAt);
      dayOffset = Math.ceil((lastDate - now) / 86400000) + 1;
    }
    const updated = blogs.map(b => {
      if (b.status !== 'draft') return b;
      const d = new Date(now);
      d.setDate(d.getDate() + dayOffset);
      d.setHours(5, 0, 0, 0);
      dayOffset++;
      return { ...b, status:'scheduled', publishAt: d.toISOString() };
    });
    saveBlogs(updated);
    toast(`🗓️ ${stats.drafts} blogs scheduled — 1 per day at 9am Dubai time!`);
  };

  const importDatabase = () => {
    saveBlogs(ALL_BLOGS);
    toast(`📚 Re-imported all ${ALL_BLOGS.length} blog posts from database`);
    setShowImport(false);
    setPage(1);
  };

  const CAT_MAP = Object.fromEntries(BLOG_CATEGORIES.map(c=>[c.id,c]));

  return (
    <div className="space-y-6">
      <ToastContainer />

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-brand-navy" style={{fontFamily:"'Playfair Display',serif"}}>
            📰 Blog Management
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {stats.total} total blogs · {stats.published} published · {stats.scheduled} scheduled · {stats.drafts} drafts
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={()=>setShowImport(true)} className="btn-outline text-xs px-3 py-2">📥 Import DB</button>
          <button onClick={bulkSchedule} className="btn-outline text-xs px-3 py-2" title="Schedule all drafts 1/day at 9am">🗓️ Auto-Schedule All</button>
          <button onClick={()=>setEditBlog({status:'draft',category:'uae-destinations'})} className="btn-gold text-sm px-4 py-2">+ New Blog</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          {emoji:'📚',label:'Total Blogs',   value:stats.total,     color:'#1E3A5F', filter:'all'},
          {emoji:'✅',label:'Published',      value:stats.published, color:'#10B981', filter:'published'},
          {emoji:'🕐',label:'Scheduled',      value:stats.scheduled, color:'#0EA5E9', filter:'scheduled'},
          {emoji:'📝',label:'Drafts',         value:stats.drafts,    color:'#F59E0B', filter:'draft'},
          {emoji:'📅',label:'Next Publish',   value:stats.next ? new Date(stats.next.publishAt).toLocaleDateString('en-AE',{month:'short',day:'numeric'}) : '—', color:'#8B5CF6', filter:'scheduled'},
        ].map(s=>(
          <button key={s.label} onClick={()=>{setFilterStatus(s.filter);setPage(1);}}
            className={`rounded-2xl bg-white p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-card ${filterStatus===s.filter?'ring-2 ring-brand-gold':''}`}
            style={{boxShadow:'0 2px 12px rgba(10,22,40,0.06)',border:'1px solid #e2e8f0'}}>
            <div className="text-xl mb-1">{s.emoji}</div>
            <div className="text-2xl font-black" style={{color:s.color}}>{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </button>
        ))}
      </div>

      {/* Next scheduled alert */}
      {stats.next && (
        <div className="flex items-center gap-3 p-4 rounded-2xl" style={{background:'rgba(14,165,233,0.08)',border:'1px solid rgba(14,165,233,0.25)'}}>
          <span className="text-2xl">🕐</span>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-brand-navy text-sm">Next scheduled publish:</div>
            <div className="text-gray-600 text-sm truncate">{stats.next.title}</div>
          </div>
          <div className="text-right shrink-0">
            <div className="font-black text-blue-600 text-sm">
              {new Date(stats.next.publishAt).toLocaleDateString('en-AE',{weekday:'short',month:'short',day:'numeric'})}
            </div>
            <div className="text-xs text-gray-400">9:00 AM Dubai</div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <input value={search} onChange={e=>{setSearch(e.target.value);setPage(1);}}
          placeholder="🔍 Search blog titles..."
          className="input-field text-sm py-2 w-60" />
        <select value={filterCat} onChange={e=>{setFilterCat(e.target.value);setPage(1);}} className="input-field text-sm py-2">
          <option value="all">📂 All Categories</option>
          {BLOG_CATEGORIES.map(c=><option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
        <div className="flex gap-1.5">
          {['all','published','scheduled','draft'].map(s=>(
            <button key={s} onClick={()=>{setFilterStatus(s);setPage(1);}}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all capitalize ${filterStatus===s?'text-brand-navy':'bg-white text-gray-500 border border-gray-200 hover:border-gray-300'}`}
              style={filterStatus===s?{background:'linear-gradient(135deg,#D4AF37,#F0D060)'}:{}}>
              {s==='all'?'📋 All':s==='published'?'✅ Published':s==='scheduled'?'🕐 Scheduled':'📝 Drafts'}
            </button>
          ))}
        </div>
        <span className="text-xs text-gray-400 ml-auto">{filtered.length} results · Page {page}/{totalPages}</span>
      </div>

      {/* Blog Table */}
      <div className="rounded-2xl bg-white overflow-hidden" style={{boxShadow:'0 2px 12px rgba(10,22,40,0.06)',border:'1px solid #e2e8f0'}}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase w-8">#</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase">Title</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase w-36">Category</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase w-24">Status</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase w-28">Publish Date</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase w-16">Views</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase w-44">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((blog, i) => {
                const cat = CAT_MAP[blog.category];
                const pubDate = blog.publishAt ? new Date(blog.publishAt) : null;
                const daysTil = pubDate ? Math.ceil((pubDate - new Date()) / 86400000) : null;
                return (
                  <tr key={blog.id} className={`border-b border-gray-50 hover:bg-amber-50/20 transition-colors ${i%2?'bg-gray-50/20':''}`}>
                    <td className="px-4 py-3 text-xs text-gray-300 font-mono">{(page-1)*PER_PAGE+i+1}</td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-brand-navy text-sm line-clamp-1 max-w-xs" title={blog.title}>
                        {blog.featured && <span className="text-brand-gold mr-1">⭐</span>}
                        {blog.title}
                      </div>
                      {blog.content && (
                        <div className="text-[10px] text-gray-400 mt-0.5">{blog.content.split(' ').length} words · {blog.readTime}</div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-[10px] font-bold whitespace-nowrap"
                        style={{background:`${cat?.color||'#6B7280'}18`,color:cat?.color||'#6B7280'}}>
                        {cat?.label?.split(' ').slice(1).join(' ') || blog.category}
                      </span>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={blog.status} /></td>
                    <td className="px-4 py-3 text-xs">
                      {pubDate ? (
                        <div>
                          <div className="font-semibold text-brand-navy">{pubDate.toLocaleDateString('en-AE',{month:'short',day:'numeric',year:'2-digit'})}</div>
                          {blog.status==='scheduled' && daysTil !== null && (
                            <div className={`text-[10px] ${daysTil<=3?'text-amber-500':'text-gray-400'}`}>
                              {daysTil===0?'Today!':daysTil===1?'Tomorrow':`in ${daysTil}d`}
                            </div>
                          )}
                        </div>
                      ) : <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-4 py-3 text-xs font-semibold text-gray-500">
                      {blog.views > 0 ? `${blog.views.toLocaleString()}` : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 flex-wrap">
                        <button onClick={()=>setEditBlog(blog)}
                          className="px-2 py-1.5 rounded-lg text-[11px] font-bold bg-amber-100 text-amber-700 hover:bg-amber-200">✏️ Edit</button>
                        {blog.status !== 'published' && (
                          <button onClick={()=>publishNow(blog.id)}
                            className="px-2 py-1.5 rounded-lg text-[11px] font-bold bg-emerald-100 text-emerald-700 hover:bg-emerald-200">🚀 Publish</button>
                        )}
                        {blog.status === 'published' && (
                          <button onClick={()=>setToDraft(blog.id)}
                            className="px-2 py-1.5 rounded-lg text-[11px] font-bold bg-gray-100 text-gray-600">↩️ Draft</button>
                        )}
                        <a href={`/blog/${blog.slug}`} target="_blank" rel="noopener noreferrer"
                          className="px-2 py-1.5 rounded-lg text-[11px] font-bold bg-blue-50 text-blue-600">👁️</a>
                        <button onClick={()=>deleteBlog(blog.id)}
                          className="px-2 py-1.5 rounded-lg text-[11px] font-bold bg-red-50 text-red-400 hover:bg-red-100">🗑️</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50/50">
            <span className="text-xs text-gray-500">Showing {(page-1)*PER_PAGE+1}–{Math.min(page*PER_PAGE,filtered.length)} of {filtered.length}</span>
            <div className="flex gap-1.5">
              <button onClick={()=>setPage(1)} disabled={page===1} className="px-2.5 py-1.5 rounded-lg text-xs font-bold border border-gray-200 disabled:opacity-40 hover:border-brand-gold">«</button>
              <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} className="px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-200 disabled:opacity-40 hover:border-brand-gold">‹ Prev</button>
              {Array.from({length:Math.min(5,totalPages)},(_,i)=>{
                const pg = Math.max(1,Math.min(page-2+i,totalPages-4+i,totalPages));
                return (
                  <button key={pg} onClick={()=>setPage(pg)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${page===pg?'text-brand-navy':'border border-gray-200 hover:border-brand-gold text-gray-600'}`}
                    style={page===pg?{background:'linear-gradient(135deg,#D4AF37,#F0D060)'}:{}}>
                    {pg}
                  </button>
                );
              })}
              <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages} className="px-3 py-1.5 rounded-lg text-xs font-bold border border-gray-200 disabled:opacity-40 hover:border-brand-gold">Next ›</button>
              <button onClick={()=>setPage(totalPages)} disabled={page===totalPages} className="px-2.5 py-1.5 rounded-lg text-xs font-bold border border-gray-200 disabled:opacity-40 hover:border-brand-gold">»</button>
            </div>
          </div>
        )}
      </div>

      {/* Category breakdown */}
      <div className="rounded-2xl bg-white p-5" style={{boxShadow:'0 2px 12px rgba(10,22,40,0.06)',border:'1px solid #e2e8f0'}}>
        <h3 className="font-bold text-brand-navy mb-4 text-sm" style={{fontFamily:"'Playfair Display',serif"}}>📂 Content Calendar by Category</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {BLOG_CATEGORIES.map(cat => {
            const catBlogs = blogs.filter(b=>b.category===cat.id);
            const pub = catBlogs.filter(b=>b.status==='published').length;
            const sch = catBlogs.filter(b=>b.status==='scheduled').length;
            const drf = catBlogs.filter(b=>b.status==='draft').length;
            return (
              <button key={cat.id} onClick={()=>{setFilterCat(cat.id);setFilterStatus('all');setPage(1);}}
                className="flex flex-col gap-2 p-3 rounded-xl border border-gray-100 hover:border-brand-gold transition-all text-left group">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{background:cat.color}}/>
                  <span className="text-[11px] font-bold text-brand-navy leading-tight group-hover:text-brand-gold transition-colors">{cat.label.split(' ').slice(1).join(' ')}</span>
                </div>
                <div className="flex gap-1.5 text-[10px] font-semibold">
                  <span className="text-emerald-600">{pub} pub</span>
                  <span className="text-blue-500">{sch} sch</span>
                  <span className="text-gray-400">{drf} draft</span>
                </div>
                <div className="h-1 rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{width:`${catBlogs.length?((pub/catBlogs.length)*100):0}%`,background:cat.color}}/>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Import modal */}
      {showImport && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl">
            <div className="text-center mb-5">
              <div className="text-4xl mb-2">📥</div>
              <h3 className="font-bold text-brand-navy text-lg" style={{fontFamily:"'Playfair Display',serif"}}>Import Blog Database</h3>
              <p className="text-gray-500 text-sm mt-1">This will reload all {ALL_BLOGS.length} blogs from the master database. Your edits and custom blogs may be overwritten.</p>
            </div>
            <div className="flex gap-3">
              <button onClick={importDatabase} className="btn-gold flex-1 justify-center py-3">📥 Import All {ALL_BLOGS.length} Blogs</button>
              <button onClick={()=>setShowImport(false)} className="btn-outline px-4 py-3 text-sm">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Blog editor modal */}
      {editBlog && (
        <BlogEditor
          blog={editBlog}
          onSave={saveBlog}
          onClose={()=>setEditBlog(null)}
        />
      )}
    </div>
  );
}
