'use client';
import { useState } from 'react';

const SECTIONS = [
  { id:'hero',         label:'🖼️ Hero Section',      visible:true,  order:1 },
  { id:'stats',        label:'📊 Stats Bar',          visible:true,  order:2 },
  { id:'categories',   label:'🗂️ Tour Categories',    visible:true,  order:3 },
  { id:'featured',     label:'⭐ Featured Tours',      visible:true,  order:4 },
  { id:'why-us',       label:'🏆 Why Choose Us',       visible:true,  order:5 },
  { id:'how-it-works', label:'📋 How It Works',        visible:true,  order:6 },
  { id:'destinations', label:'🌍 Worldwide Destinations',visible:true, order:7 },
  { id:'testimonials', label:'💬 Testimonials',        visible:true,  order:8 },
  { id:'attractions',  label:'🏛️ Attractions Preview', visible:true,  order:9 },
  { id:'blog',         label:'📰 Blog Preview',        visible:true,  order:10 },
  { id:'cta',          label:'🎯 CTA Banner',          visible:true,  order:11 },
];

const COLORS = [
  { label:'Navy',  value:'#0A1628' },
  { label:'Gold',  value:'#D4AF37' },
  { label:'Blue',  value:'#1E3A5F' },
  { label:'Cream', value:'#FDF8EE' },
  { label:'White', value:'#FFFFFF' },
];

export default function AdminEditor() {
  const [sections,   setSections]   = useState(SECTIONS);
  const [activeTab,  setActiveTab]  = useState('layout');
  const [settings,   setSettings]   = useState({
    primaryColor:   '#D4AF37',
    navStyle:       'transparent',
    heroHeight:     '100vh',
    heroImage:      'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=1920',
    heroTitle:      'Discover the Magic of Dubai & Beyond',
    heroSubtitle:   '🏜️ Desert safaris · 🏙️ City tours · 🚤 Cruises · ✈️ Worldwide packages',
    showSearch:     true,
    showWhatsApp:   true,
    footerStyle:    'dark',
    borderRadius:   '12',
    fontHeading:    'Playfair Display',
    fontBody:       'Nunito',
  });
  const [saved, setSaved] = useState(false);

  const upd = (k, v) => setSettings(s => ({ ...s, [k]: v }));

  const toggleSection = (id) => {
    setSections(ss => ss.map(s => s.id===id ? { ...s, visible:!s.visible } : s));
  };

  const moveSection = (id, dir) => {
    setSections(ss => {
      const idx = ss.findIndex(s => s.id===id);
      const newIdx = idx + dir;
      if (newIdx < 0 || newIdx >= ss.length) return ss;
      const updated = [...ss];
      [updated[idx], updated[newIdx]] = [updated[newIdx], updated[idx]];
      return updated.map((s, i) => ({ ...s, order: i+1 }));
    });
  };

  const save = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    // In production: POST to /api/settings/editor with JSON.stringify({ sections, settings })
  };

  const TABS = [
    { id:'layout',  label:'🗂️ Page Layout' },
    { id:'hero',    label:'🖼️ Hero' },
    { id:'colors',  label:'🎨 Colors & Fonts' },
    { id:'header',  label:'🧭 Header & Footer' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-black text-brand-navy" style={{ fontFamily:"'Playfair Display',serif" }}>
          🎨 Visual Page Editor
        </h1>
        <div className="flex items-center gap-3">
          {saved && <span className="text-emerald-600 text-sm font-bold animate-fade-in">✅ Changes saved!</span>}
          <a href="/" target="_blank" rel="noopener noreferrer" className="btn-outline text-sm px-4 py-2">
            👁️ Preview Site
          </a>
          <button onClick={save} className="btn-gold text-sm px-5 py-2">💾 Save Changes</button>
        </div>
      </div>

      {/* Info banner */}
      <div className="rounded-2xl p-4 flex gap-3 items-start"
        style={{ background:'rgba(212,175,55,0.08)', border:'1px solid rgba(212,175,55,0.25)' }}>
        <span className="text-2xl">💡</span>
        <div>
          <div className="font-bold text-brand-navy text-sm">Visual Editor</div>
          <div className="text-gray-600 text-xs mt-0.5">
            Toggle, reorder and configure homepage sections. Changes apply to the live site when saved.
            For full code customisation, edit <code className="bg-gray-100 px-1 rounded">app/(main)/page.js</code> directly.
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth:'none' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab===t.id ? 'text-brand-navy' : 'bg-white text-gray-500 border border-gray-200'
            }`}
            style={activeTab===t.id ? { background:'linear-gradient(135deg,#D4AF37,#F0D060)' } : {}}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left panel */}
        <div className="rounded-2xl bg-white p-6" style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>

          {activeTab === 'layout' && (
            <>
              <h3 className="font-bold text-brand-navy mb-1" style={{ fontFamily:"'Playfair Display',serif" }}>
                🗂️ Homepage Sections
              </h3>
              <p className="text-gray-500 text-xs mb-5">Toggle visibility and drag to reorder sections</p>
              <div className="space-y-2">
                {[...sections].sort((a,b)=>a.order-b.order).map(section => (
                  <div key={section.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                      section.visible ? 'border-amber-200 bg-amber-50/50' : 'border-gray-100 bg-gray-50 opacity-60'
                    }`}>
                    <span className="text-gray-300 cursor-grab text-lg">⠿</span>
                    <div className="flex-1">
                      <span className="text-sm font-semibold text-brand-navy">{section.label}</span>
                      <div className="text-xs text-gray-400">Order #{section.order}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => moveSection(section.id, -1)}
                        className="w-7 h-7 rounded-lg text-xs text-gray-400 hover:bg-gray-100 flex items-center justify-center">↑</button>
                      <button onClick={() => moveSection(section.id, 1)}
                        className="w-7 h-7 rounded-lg text-xs text-gray-400 hover:bg-gray-100 flex items-center justify-center">↓</button>
                      <div className={`w-10 h-6 rounded-full transition-all relative cursor-pointer ${section.visible?'bg-brand-gold':'bg-gray-200'}`}
                        onClick={() => toggleSection(section.id)}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${section.visible?'left-5':'left-1'}`} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'hero' && (
            <div className="space-y-5">
              <h3 className="font-bold text-brand-navy" style={{ fontFamily:"'Playfair Display',serif" }}>🖼️ Hero Settings</h3>
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1.5">📝 Hero Title</label>
                <input value={settings.heroTitle} onChange={e=>upd('heroTitle',e.target.value)} className="input-field text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1.5">📋 Hero Subtitle</label>
                <textarea value={settings.heroSubtitle} onChange={e=>upd('heroSubtitle',e.target.value)}
                  rows={2} className="input-field text-sm resize-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1.5">🖼️ Hero Background Image URL</label>
                <input value={settings.heroImage} onChange={e=>upd('heroImage',e.target.value)} className="input-field text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1.5">📐 Hero Height</label>
                <select value={settings.heroHeight} onChange={e=>upd('heroHeight',e.target.value)} className="input-field text-sm">
                  <option value="100vh">Full Screen (100vh)</option>
                  <option value="80vh">Large (80vh)</option>
                  <option value="60vh">Medium (60vh)</option>
                  <option value="50vh">Half Screen (50vh)</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100">
                <span className="text-sm font-medium text-brand-navy">🔍 Show Search Bar</span>
                <div className={`w-10 h-6 rounded-full transition-all relative cursor-pointer ${settings.showSearch?'bg-brand-gold':'bg-gray-200'}`}
                  onClick={()=>upd('showSearch',!settings.showSearch)}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${settings.showSearch?'left-5':'left-1'}`} />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'colors' && (
            <div className="space-y-5">
              <h3 className="font-bold text-brand-navy" style={{ fontFamily:"'Playfair Display',serif" }}>🎨 Colors & Typography</h3>
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-2">🎨 Primary / Accent Color</label>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map(c => (
                    <button key={c.value} onClick={()=>upd('primaryColor',c.value)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-xs font-bold transition-all ${
                        settings.primaryColor===c.value ? 'border-brand-navy' : 'border-gray-200'
                      }`}>
                      <span className="w-4 h-4 rounded-full border border-gray-200" style={{ background:c.value }} />
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1.5">🔤 Heading Font</label>
                <select value={settings.fontHeading} onChange={e=>upd('fontHeading',e.target.value)} className="input-field text-sm">
                  <option>Playfair Display</option>
                  <option>Merriweather</option>
                  <option>Cormorant Garamond</option>
                  <option>Lora</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1.5">📄 Body Font</label>
                <select value={settings.fontBody} onChange={e=>upd('fontBody',e.target.value)} className="input-field text-sm">
                  <option>Nunito</option>
                  <option>Poppins</option>
                  <option>Open Sans</option>
                  <option>Lato</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1.5">⬜ Border Radius (px)</label>
                <input type="range" min="0" max="24" value={settings.borderRadius}
                  onChange={e=>upd('borderRadius',e.target.value)} className="w-full accent-brand-gold" />
                <span className="text-xs text-gray-500">{settings.borderRadius}px</span>
              </div>
            </div>
          )}

          {activeTab === 'header' && (
            <div className="space-y-5">
              <h3 className="font-bold text-brand-navy" style={{ fontFamily:"'Playfair Display',serif" }}>🧭 Header & Footer</h3>
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1.5">🧭 Header Style</label>
                <select value={settings.navStyle} onChange={e=>upd('navStyle',e.target.value)} className="input-field text-sm">
                  <option value="transparent">Transparent → Solid on scroll (current)</option>
                  <option value="solid">Always Solid Navy</option>
                  <option value="white">Always White</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1.5">🦶 Footer Style</label>
                <select value={settings.footerStyle} onChange={e=>upd('footerStyle',e.target.value)} className="input-field text-sm">
                  <option value="dark">Dark Navy (current)</option>
                  <option value="light">Light Cream</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl border border-gray-100">
                <span className="text-sm font-medium text-brand-navy">💬 Show WhatsApp Button</span>
                <div className={`w-10 h-6 rounded-full transition-all relative cursor-pointer ${settings.showWhatsApp?'bg-brand-gold':'bg-gray-200'}`}
                  onClick={()=>upd('showWhatsApp',!settings.showWhatsApp)}>
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${settings.showWhatsApp?'left-5':'left-1'}`} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right — live preview panel */}
        <div className="rounded-2xl overflow-hidden"
          style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0', height:'600px' }}>
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <span className="text-xs font-bold text-gray-500">🖥️ Live Preview</span>
            <div className="flex gap-1.5">
              {['●','●','●'].map((d,i) => (
                <span key={i} className={`w-2.5 h-2.5 rounded-full ${i===0?'bg-red-400':i===1?'bg-amber-400':'bg-green-400'}`} />
              ))}
            </div>
          </div>
          <iframe src="/" title="Site Preview" className="w-full" style={{ height:'calc(100% - 48px)', border:'none' }}
            sandbox="allow-same-origin allow-scripts" />
        </div>
      </div>
    </div>
  );
}
