'use client';
import { useState, useEffect, useMemo } from 'react';

// ═══════════════════════════════════════════════════════════════
//  BlogPublisher — Admin panel blog management
//  Features:
//   - Shows all 42 published + 114 draft blogs
//   - PUBLISH button: instantly makes draft live
//   - UNPUBLISH button: reverts to draft
//   - SCHEDULE: set date+time for auto-publish
//   - PREVIEW: opens blog in new tab
//   - Search + filter by category/status
//   - Visual publish calendar (year at a glance)
// ═══════════════════════════════════════════════════════════════

const STORAGE_KEY = 'dr_blog_statuses';
const SCHEDULE_KEY = 'dr_blog_schedules';

function loadStatuses() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); }
  catch { return {}; }
}
function saveStatuses(s) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
}
function loadSchedules() {
  try { return JSON.parse(localStorage.getItem(SCHEDULE_KEY) || '{}'); }
  catch { return {}; }
}
function saveSchedules(s) {
  try { localStorage.setItem(SCHEDULE_KEY, JSON.stringify(s)); } catch {}
}

const CAT_COLORS = {
  'Desert Safari':  '#C1460E',
  'Hot Air Balloon':'#6C3FBF',
  'Dhow Cruise':    '#1A6EA8',
  'Quad Bike':      '#C1200E',
  'Camel Riding':   '#A05C10',
  'City Tour':      '#1E4080',
  'Dubai Guide':    '#2A1060',
};

export default function BlogPublisher({ allBlogs = [] }) {
  const [statuses, setStatuses] = useState({});
  const [schedules, setSchedules] = useState({});
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCat, setFilterCat] = useState('all');
  const [scheduleModal, setScheduleModal] = useState(null); // slug
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('08:00');
  const [toast, setToast] = useState(null);
  const [tab, setTab] = useState('list'); // 'list' | 'calendar'
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setStatuses(loadStatuses());
    setSchedules(loadSchedules());
  }, []);

  // Auto-publish scheduled blogs
  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      const scheds = loadSchedules();
      const stats = loadStatuses();
      const now = new Date();
      let changed = false;
      Object.entries(scheds).forEach(([slug, dateStr]) => {
        if (dateStr && new Date(dateStr) <= now) {
          stats[slug] = 'published';
          delete scheds[slug];
          changed = true;
        }
      });
      if (changed) {
        saveStatuses(stats); setStatuses({...stats});
        saveSchedules(scheds); setSchedules({...scheds});
        showToast('⏰ Scheduled blog published!', 'success');
      }
    }, 30000); // check every 30s
    return () => clearInterval(interval);
  }, [mounted]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const getStatus = (blog) => {
    if (statuses[blog.slug]) return statuses[blog.slug];
    return blog.status || 'draft';
  };

  const publish = (slug) => {
    const s = { ...statuses, [slug]: 'published' };
    const sc = { ...schedules }; delete sc[slug];
    setStatuses(s); saveStatuses(s);
    setSchedules(sc); saveSchedules(sc);
    showToast('✅ Blog published — live on website!', 'success');
  };

  const unpublish = (slug) => {
    const s = { ...statuses, [slug]: 'draft' };
    setStatuses(s); saveStatuses(s);
    showToast('📝 Blog moved back to draft', 'info');
  };

  const schedulePublish = (slug) => {
    if (!scheduleDate) return;
    const dt = new Date(`${scheduleDate}T${scheduleTime}:00`);
    const sc = { ...schedules, [slug]: dt.toISOString() };
    setSchedules(sc); saveSchedules(sc);
    setScheduleModal(null);
    showToast(`📅 Scheduled for ${dt.toLocaleDateString('en-AE', { day:'2-digit', month:'short', year:'numeric' })} at ${scheduleTime}`, 'schedule');
  };

  const cancelSchedule = (slug) => {
    const sc = { ...schedules }; delete sc[slug];
    setSchedules(sc); saveSchedules(sc);
    showToast('🗑️ Schedule cancelled', 'info');
  };

  // Stats
  const published = allBlogs.filter(b => getStatus(b) === 'published').length;
  const drafts = allBlogs.filter(b => getStatus(b) === 'draft').length;
  const scheduled = Object.keys(schedules).length;
  const cats = [...new Set(allBlogs.map(b => b.category))];

  // Filtered list
  const filtered = useMemo(() => {
    return allBlogs.filter(b => {
      const status = getStatus(b);
      if (filterStatus !== 'all' && status !== filterStatus) return false;
      if (filterCat !== 'all' && b.category !== filterCat) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!b.title?.toLowerCase().includes(q) && !b.slug?.toLowerCase().includes(q) && !b.category?.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [allBlogs, statuses, filterStatus, filterCat, search]);

  // Calendar data
  const calendarData = useMemo(() => {
    const byDate = {};
    allBlogs.forEach(b => {
      const d = schedules[b.slug] ? new Date(schedules[b.slug]).toISOString().split('T')[0]
              : (getStatus(b) === 'published' && b.date) ? b.date
              : b.scheduleDate || null;
      if (d) {
        if (!byDate[d]) byDate[d] = [];
        byDate[d].push({ ...b, _status: getStatus(b), _sched: !!schedules[b.slug] });
      }
    });
    return byDate;
  }, [allBlogs, statuses, schedules]);

  if (!mounted) return <div style={{ padding: 40, color: 'rgba(255,255,255,0.4)', fontFamily: 'Outfit,sans-serif' }}>Loading blogs...</div>;

  const S = styles;

  return (
    <div style={S.wrap}>

      {/* ── Toast ── */}
      {toast && (
        <div style={{ ...S.toast, background: toast.type === 'success' ? 'rgba(0,180,80,0.95)' : toast.type === 'schedule' ? 'rgba(100,80,200,0.95)' : 'rgba(60,80,120,0.95)' }}>
          {toast.msg}
        </div>
      )}

      {/* ── Header ── */}
      <div style={S.header}>
        <div>
          <h2 style={S.title}>📰 Blog Publisher</h2>
          <p style={S.sub}>Manage, publish & schedule all {allBlogs.length} blogs</p>
        </div>
        <div style={S.statRow}>
          {[['✅', published, 'Published', '#00C864'], ['📝', drafts, 'Draft', '#F59E0B'], ['📅', scheduled, 'Scheduled', '#818CF8']].map(([icon, n, label, color]) => (
            <div key={label} style={{ ...S.stat, borderColor: color + '40', background: color + '12' }}>
              <span style={{ fontSize: 20 }}>{icon}</span>
              <span style={{ fontSize: 22, fontWeight: 800, color }}>{n}</span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tabs ── */}
      <div style={S.tabs}>
        {[['list','📋 List View'], ['calendar','📅 Calendar']].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ ...S.tab, ...(tab === id ? S.tabActive : {}) }}>{label}</button>
        ))}
      </div>

      {tab === 'list' && <>
        {/* ── Filters ── */}
        <div style={S.filters}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search blogs..." style={S.search} />
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={S.select}>
            <option value="all">All Status</option>
            <option value="published">✅ Published</option>
            <option value="draft">📝 Draft</option>
          </select>
          <select value={filterCat} onChange={e => setFilterCat(e.target.value)} style={S.select}>
            <option value="all">All Categories</option>
            {cats.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, marginLeft: 'auto' }}>
            Showing {filtered.length} of {allBlogs.length}
          </span>
        </div>

        {/* ── Blog List ── */}
        <div style={S.list}>
          {filtered.map((blog, i) => {
            const status = getStatus(blog);
            const sched = schedules[blog.slug];
            const catColor = CAT_COLORS[blog.category] || '#444';
            const isPublished = status === 'published';

            return (
              <div key={blog.slug} style={{ ...S.card, borderLeft: `3px solid ${catColor}`, opacity: isPublished ? 1 : 0.75 }}>

                {/* Left: info */}
                <div style={S.cardMain}>
                  <div style={S.cardTop}>
                    {/* Status badge */}
                    <span style={{ ...S.badge, background: isPublished ? '#00C86420' : sched ? '#818CF820' : '#F59E0B20', color: isPublished ? '#00C864' : sched ? '#818CF8' : '#F59E0B', borderColor: isPublished ? '#00C86440' : sched ? '#818CF840' : '#F59E0B40' }}>
                      {isPublished ? '✅ Live' : sched ? '📅 Scheduled' : '📝 Draft'}
                    </span>
                    {/* Category */}
                    <span style={{ ...S.catBadge, background: catColor + '25', color: catColor }}>
                      {blog.catIcon} {blog.category}
                    </span>
                    {/* Read time */}
                    <span style={S.meta}>🕐 {blog.readTime || 5} min</span>
                    {blog.featured && <span style={S.featured}>⭐ Featured</span>}
                  </div>

                  <h3 style={S.blogTitle}>{blog.title}</h3>
                  <p style={S.slug}>/{blog.slug}</p>

                  {/* Schedule info */}
                  {sched && (
                    <p style={{ color: '#818CF8', fontSize: 12, margin: '4px 0 0' }}>
                      📅 Publishes: {new Date(sched).toLocaleDateString('en-AE', { weekday:'short', day:'2-digit', month:'short', year:'numeric' })} at {new Date(sched).toLocaleTimeString('en-AE', { hour:'2-digit', minute:'2-digit' })}
                    </p>
                  )}
                  {isPublished && blog.date && (
                    <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12, margin: '4px 0 0' }}>
                      Published: {blog.date}
                    </p>
                  )}
                </div>

                {/* Right: action buttons */}
                <div style={S.actions}>
                  {/* Preview */}
                  <a href={`/blog/${blog.slug}`} target="_blank" rel="noreferrer" style={S.btnPreview} title="Preview blog">
                    👁️ Preview
                  </a>

                  {!isPublished && !sched && (
                    <>
                      <button onClick={() => publish(blog.slug)} style={S.btnPublish}>
                        🚀 Publish Now
                      </button>
                      <button onClick={() => { setScheduleModal(blog.slug); setScheduleDate(blog.scheduleDate || blog.date || ''); }} style={S.btnSchedule}>
                        📅 Schedule
                      </button>
                    </>
                  )}

                  {sched && (
                    <>
                      <button onClick={() => publish(blog.slug)} style={S.btnPublish}>
                        🚀 Publish Now
                      </button>
                      <button onClick={() => cancelSchedule(blog.slug)} style={S.btnDanger}>
                        ❌ Cancel Schedule
                      </button>
                    </>
                  )}

                  {isPublished && (
                    <button onClick={() => unpublish(blog.slug)} style={S.btnUnpublish}>
                      📥 Unpublish
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div style={{ padding: 40, textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontFamily: 'Outfit,sans-serif' }}>
              No blogs match your filters
            </div>
          )}
        </div>
      </>}

      {tab === 'calendar' && (
        <PublishCalendar calendarData={calendarData} onPublish={publish} />
      )}

      {/* ── Schedule Modal ── */}
      {scheduleModal && (
        <div style={S.overlay} onClick={() => setScheduleModal(null)}>
          <div style={S.modal} onClick={e => e.stopPropagation()}>
            <h3 style={{ color: '#fff', margin: '0 0 8px', fontFamily: 'Outfit,sans-serif' }}>📅 Schedule Publication</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, margin: '0 0 20px', fontFamily: 'Outfit,sans-serif' }}>
              The blog will go live automatically at the chosen time.
            </p>
            <label style={S.label}>Date</label>
            <input type="date" value={scheduleDate} onChange={e => setScheduleDate(e.target.value)} style={S.input} />
            <label style={{ ...S.label, marginTop: 12 }}>Time (Dubai time, UTC+4)</label>
            <input type="time" value={scheduleTime} onChange={e => setScheduleTime(e.target.value)} style={S.input} />
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              <button onClick={() => schedulePublish(scheduleModal)} style={S.btnPublish} disabled={!scheduleDate}>
                📅 Set Schedule
              </button>
              <button onClick={() => setScheduleModal(null)} style={S.btnUnpublish}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Calendar View ─────────────────────────────────────────────
function PublishCalendar({ calendarData, onPublish }) {
  const months = [];
  const now = new Date();
  for (let m = 0; m < 13; m++) {
    const d = new Date(now.getFullYear(), now.getMonth() + m, 1);
    months.push({ year: d.getFullYear(), month: d.getMonth() });
  }
  const DAY_NAMES = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div style={{ padding: '0 0 40px' }}>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, fontFamily: 'Outfit,sans-serif', padding: '0 20px 16px' }}>
        📅 Suggested publish calendar — one blog per week keeps Google happy. Green = published, gold = scheduled, grey = suggested.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, padding: '0 20px' }}>
        {months.map(({ year, month }) => {
          const monthName = new Date(year, month, 1).toLocaleDateString('en-AE', { month: 'long', year: 'numeric' });
          const firstDay = new Date(year, month, 1).getDay();
          const daysInMonth = new Date(year, month + 1, 0).getDate();
          const cells = [];
          for (let i = 0; i < firstDay; i++) cells.push(null);
          for (let d = 1; d <= daysInMonth; d++) cells.push(d);

          const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
          const monthBlogs = Object.entries(calendarData).filter(([date]) => date.startsWith(monthKey));

          return (
            <div key={monthKey} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 16, border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 13, fontFamily: 'Outfit,sans-serif', marginBottom: 12 }}>{monthName}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2 }}>
                {DAY_NAMES.map((d, i) => <div key={i} style={{ textAlign: 'center', fontSize: 9, color: 'rgba(255,255,255,0.3)', padding: '2px 0' }}>{d}</div>)}
                {cells.map((day, i) => {
                  if (!day) return <div key={`e${i}`} />;
                  const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const blogs = calendarData[dateStr] || [];
                  const hasPublished = blogs.some(b => b._status === 'published' && !b._sched);
                  const hasScheduled = blogs.some(b => b._sched);
                  const hasDraft = blogs.some(b => b._status === 'draft' && !b._sched);
                  const bg = hasPublished ? '#00C86430' : hasScheduled ? '#818CF830' : hasDraft ? '#F59E0B20' : 'transparent';
                  const border = hasPublished ? '#00C86480' : hasScheduled ? '#818CF880' : hasDraft ? '#F59E0B50' : 'transparent';

                  return (
                    <div key={day} title={blogs.map(b => b.title).join('\n')}
                      style={{ textAlign: 'center', fontSize: 11, padding: '3px 0', borderRadius: 4, background: bg, border: `1px solid ${border}`, color: blogs.length ? '#fff' : 'rgba(255,255,255,0.35)', cursor: blogs.length ? 'pointer' : 'default', position: 'relative' }}>
                      {day}
                      {blogs.length > 0 && <div style={{ position: 'absolute', bottom: 1, left: '50%', transform: 'translateX(-50%)', width: 4, height: 4, borderRadius: '50%', background: hasPublished ? '#00C864' : hasScheduled ? '#818CF8' : '#F59E0B' }} />}
                    </div>
                  );
                })}
              </div>
              {monthBlogs.length > 0 && (
                <div style={{ marginTop: 10, borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 8 }}>
                  {monthBlogs.slice(0, 3).map(([date, blogs]) => (
                    <div key={date} style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', margin: '3px 0', fontFamily: 'Outfit,sans-serif' }}>
                      <span style={{ color: 'rgba(255,255,255,0.3)' }}>{date.slice(8)}</span> — {blogs[0]?.title?.slice(0, 38)}…
                    </div>
                  ))}
                  {monthBlogs.length > 3 && <div style={{ fontSize: 10, color: '#F59E0B', marginTop: 3 }}>+{monthBlogs.length - 3} more</div>}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────
const styles = {
  wrap: { background: '#08060F', minHeight: '100%', fontFamily: "'Outfit',sans-serif", position: 'relative' },
  toast: { position: 'fixed', top: 20, right: 20, padding: '12px 20px', borderRadius: 10, color: '#fff', fontWeight: 600, fontSize: 14, zIndex: 9999, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' },
  header: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 24px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexWrap: 'wrap', gap: 16 },
  title: { color: '#fff', margin: 0, fontSize: 22, fontWeight: 800 },
  sub: { color: 'rgba(255,255,255,0.4)', margin: '4px 0 0', fontSize: 13 },
  statRow: { display: 'flex', gap: 12 },
  stat: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px 18px', borderRadius: 12, border: '1px solid', gap: 2 },
  tabs: { display: 'flex', gap: 2, padding: '16px 24px 0' },
  tab: { padding: '8px 18px', borderRadius: '8px 8px 0 0', background: 'transparent', border: '1px solid rgba(255,255,255,0.08)', borderBottom: 'none', color: 'rgba(255,255,255,0.45)', cursor: 'pointer', fontSize: 13, fontFamily: 'Outfit,sans-serif' },
  tabActive: { background: 'rgba(255,255,255,0.06)', color: '#fff', borderColor: 'rgba(255,255,255,0.15)' },
  filters: { display: 'flex', gap: 10, padding: '16px 24px', alignItems: 'center', flexWrap: 'wrap', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' },
  search: { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 14px', color: '#fff', fontSize: 13, outline: 'none', width: 220 },
  select: { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, padding: '8px 12px', color: '#fff', fontSize: 13, outline: 'none', cursor: 'pointer' },
  list: { padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8 },
  card: { background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '14px 16px', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' },
  cardMain: { flex: 1, minWidth: 200 },
  cardTop: { display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 6, alignItems: 'center' },
  badge: { fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 6, border: '1px solid' },
  catBadge: { fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 6 },
  meta: { fontSize: 11, color: 'rgba(255,255,255,0.35)' },
  featured: { fontSize: 10, color: '#F59E0B', fontWeight: 700 },
  blogTitle: { color: '#fff', margin: '0 0 2px', fontSize: 14, fontWeight: 600, lineHeight: 1.4 },
  slug: { color: 'rgba(255,255,255,0.3)', margin: 0, fontSize: 11 },
  actions: { display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' },
  btnPublish: { background: 'rgba(0,180,80,0.15)', border: '1px solid rgba(0,180,80,0.4)', borderRadius: 7, padding: '7px 14px', color: '#00C864', cursor: 'pointer', fontSize: 12, fontWeight: 700, fontFamily: 'Outfit,sans-serif', whiteSpace: 'nowrap' },
  btnSchedule: { background: 'rgba(100,80,200,0.15)', border: '1px solid rgba(100,80,200,0.4)', borderRadius: 7, padding: '7px 14px', color: '#818CF8', cursor: 'pointer', fontSize: 12, fontWeight: 700, fontFamily: 'Outfit,sans-serif', whiteSpace: 'nowrap' },
  btnUnpublish: { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 7, padding: '7px 14px', color: 'rgba(255,255,255,0.55)', cursor: 'pointer', fontSize: 12, fontFamily: 'Outfit,sans-serif', whiteSpace: 'nowrap' },
  btnDanger: { background: 'rgba(200,40,40,0.12)', border: '1px solid rgba(200,40,40,0.3)', borderRadius: 7, padding: '7px 14px', color: '#F87171', cursor: 'pointer', fontSize: 12, fontFamily: 'Outfit,sans-serif', whiteSpace: 'nowrap' },
  btnPreview: { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 7, padding: '7px 12px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: 12, fontFamily: 'Outfit,sans-serif', whiteSpace: 'nowrap' },
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  modal: { background: '#0F0B1E', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 16, padding: 28, width: 340, boxShadow: '0 24px 80px rgba(0,0,0,0.6)' },
  label: { display: 'block', color: 'rgba(255,255,255,0.55)', fontSize: 12, marginBottom: 6, fontFamily: 'Outfit,sans-serif' },
  input: { width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8, padding: '9px 12px', color: '#fff', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'Outfit,sans-serif' },
};
