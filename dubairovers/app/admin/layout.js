'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const NAV_ITEMS = [
  { href:'/admin',              icon:'📊', label:'Dashboard',    exact:true },
  { href:'/admin/bookings',     icon:'📋', label:'Bookings' },
  { href:'/admin/tours',        icon:'🗺️', label:'Tours' },
  { href:'/admin/blog',         icon:'📰', label:'Blog & Scheduler' },
  { href:'/admin/invoices',     icon:'🧾', label:'Invoices' },
  { href:'/admin/affiliates',   icon:'🤝', label:'Affiliates' },
  { href:'/admin/ib',           icon:'🏢', label:'IB Partners' },
  { href:'/admin/agents',       icon:'👥', label:'Agents & Forwarding' },
  { href:'/admin/seo',          icon:'🔍', label:'SEO Dashboard' },
  { href:'/admin/editor',       icon:'🎨', label:'Visual Editor' },
  { href:'/admin/settings',     icon:'⚙️', label:'Settings' },
];

export default function AdminLayout({ children }) {
  const [open,     setOpen]     = useState(false);
  const [authed,   setAuthed]   = useState(false);
  const [password, setPassword] = useState('');
  const [err,      setErr]      = useState('');
  const pathname = usePathname();
  const router   = useRouter();

  useEffect(() => {
    const ok = sessionStorage.getItem('admin_auth');
    if (ok) setAuthed(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'DubaiRovers2025!') {
      sessionStorage.setItem('admin_auth', '1');
      setAuthed(true);
    } else { setErr('❌ Incorrect password'); }
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{ background:'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
        <div className="rounded-3xl p-8 w-full max-w-sm"
          style={{ background:'rgba(255,255,255,0.05)', border:'1px solid rgba(212,175,55,0.3)', backdropFilter:'blur(20px)' }}>
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
              style={{ background:'linear-gradient(135deg,#D4AF37,#F0D060)' }}>
              <span className="text-2xl font-black text-brand-navy" style={{ fontFamily:"'Playfair Display',serif" }}>D</span>
            </div>
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
            <p className="text-white/50 text-sm mt-1">DubaiRovers Management</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-white/60 mb-2 uppercase tracking-wide">Password</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 rounded-xl text-white font-medium outline-none"
                style={{ background:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.15)' }}
                autoComplete="current-password" required />
            </div>
            {err && <p className="text-red-400 text-sm text-center">{err}</p>}
            <button type="submit" className="btn-gold w-full justify-center py-3.5">
              🔓 Sign In
            </button>
          </form>
          <p className="text-center text-white/30 text-xs mt-4">
            <Link href="/" className="hover:text-white/60 transition-colors">← Back to website</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background:'#f1f5f9' }}>
      {/* Sidebar */}
      <aside className={`admin-sidebar ${open?'open':''} z-50`}>
        {/* Logo */}
        <div className="p-5 border-b" style={{ borderColor:'rgba(212,175,55,0.15)' }}>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background:'linear-gradient(135deg,#D4AF37,#F0D060)' }}>
              <span className="font-black text-brand-navy text-base" style={{ fontFamily:"'Playfair Display',serif" }}>D</span>
            </div>
            <div>
              <div className="text-white font-black text-sm" style={{ fontFamily:"'Playfair Display',serif" }}>
                DUBAI<span style={{ color:'#D4AF37' }}>ROVERS</span>
              </div>
              <div className="text-xs" style={{ color:'rgba(212,175,55,0.5)' }}>Admin Panel</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {NAV_ITEMS.map(item => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href) && item.href !== '/admin';
            const isExactAdmin = item.exact && pathname === '/admin';
            return (
              <Link key={item.href} href={item.href}
                className={`admin-nav-item ${active || isExactAdmin ? 'active' : ''}`}>
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t" style={{ borderColor:'rgba(212,175,55,0.15)' }}>
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs text-white/40">Logged in as Admin</div>
            <button onClick={() => { sessionStorage.removeItem('admin_auth'); setAuthed(false); }}
              className="text-xs text-red-400 hover:text-red-300 font-semibold">Sign Out</button>
          </div>
          <Link href="/" className="flex items-center gap-2 text-xs text-white/40 hover:text-brand-gold transition-colors">
            🌐 View Website →
          </Link>
        </div>
      </aside>

      {/* Mobile toggle */}
      <button onClick={() => setOpen(!open)}
        className="fixed top-4 left-4 z-[60] lg:hidden w-10 h-10 rounded-xl flex items-center justify-center"
        style={{ background:'#0A1628', border:'1px solid rgba(212,175,55,0.3)' }}>
        <span className="text-brand-gold text-lg">{open ? '✕' : '☰'}</span>
      </button>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setOpen(false)} />
      )}

      {/* Main content */}
      <div className="admin-content">
        <div className="p-4 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
