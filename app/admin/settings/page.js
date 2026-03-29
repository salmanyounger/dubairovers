'use client';
import { useState } from 'react';
import { useLocalStore, useToast } from '../../../hooks/useAdminStore';

const DEFAULT_SETTINGS = {
    siteName:'DubaiRovers', siteUrl:'https://dubairovers.com',
    email:'dbtis.com@gmail.com', whatsapp:'+971544735060',
    adminPassword:'', newPassword:'', googleMapsKey:'', emailjsService:'',
    emailjsTemplate:'', emailjsPublic:'', openaiKey:'', geminiKey:'',
    vatRate:5, currency:'AED', bookingMode:'both', maintenanceMode:false,
    showPrices:true, enableBlog:true, enableAffiliate:true, enableIB:true,
    defaultLang:'en', facebookUrl:'', instagramUrl:'', tiktokUrl:'', youtubeUrl:'',
    metaTitle:'DubaiRovers — UAE Tours & Worldwide Travel',
    metaDesc:'Book the best UAE tours and worldwide travel experiences.',
    googleVerify:'', bingVerify:'',
};

export default function AdminSettings() {
  const { data: settings, save: saveSettings } = useLocalStore('settings', DEFAULT_SETTINGS);
  const { show: toast, ToastContainer } = useToast();
  const [tab, setTab] = useState('general');
  const upd = (k, v) => saveSettings(prev => ({ ...prev, [k]: v }));

  const save = () => {
    saveSettings(s => ({ ...s })); // force write to localStorage
    toast('✅ Settings saved!');
  };

  const TABS = [
    { id:'general',      label:'⚙️ General' },
    { id:'integrations', label:'🔌 Integrations' },
    { id:'booking',      label:'📋 Booking' },
    { id:'seo',          label:'🔍 SEO' },
    { id:'social',       label:'📱 Social' },
    { id:'security',     label:'🔒 Security' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-black text-brand-navy" style={{ fontFamily:"'Playfair Display',serif" }}>
          ⚙️ Site Settings
        </h1>
        <div className="flex items-center gap-3">
          <ToastContainer />
          <button onClick={save} className="btn-gold text-sm px-5 py-2.5">💾 Save Changes</button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth:'none' }}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              tab===t.id ? 'text-brand-navy' : 'bg-white text-gray-500 border border-gray-200 hover:border-brand-gold'
            }`}
            style={tab===t.id ? { background:'linear-gradient(135deg,#D4AF37,#F0D060)' } : {}}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="rounded-2xl bg-white p-6" style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>

        {/* General */}
        {tab === 'general' && (
          <div className="space-y-5">
            <h3 className="font-bold text-brand-navy text-lg mb-1" style={{ fontFamily:"'Playfair Display',serif" }}>🌐 General Settings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="🏷️ Site Name"    value={settings.siteName}   onChange={v=>upd('siteName',v)} />
              <Field label="🌐 Site URL"      value={settings.siteUrl}    onChange={v=>upd('siteUrl',v)} />
              <Field label="📧 Contact Email" value={settings.email}      onChange={v=>upd('email',v)} type="email" />
              <Field label="📱 WhatsApp"      value={settings.whatsapp}   onChange={v=>upd('whatsapp',v)} />
              <Field label="💰 VAT Rate (%)"  value={settings.vatRate}    onChange={v=>upd('vatRate',+v)} type="number" />
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1.5">💵 Default Currency</label>
                <select value={settings.currency} onChange={e=>upd('currency',e.target.value)} className="input-field text-sm">
                  {['AED','USD','EUR','GBP','SAR'].map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1.5">🌍 Default Language</label>
                <select value={settings.defaultLang} onChange={e=>upd('defaultLang',e.target.value)} className="input-field text-sm">
                  <option value="en">🇬🇧 English</option>
                  <option value="ar">🇦🇪 Arabic</option>
                  <option value="ru">🇷🇺 Russian</option>
                  <option value="zh">🇨🇳 Chinese</option>
                </select>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <h4 className="font-bold text-brand-navy text-sm">🔧 Feature Toggles</h4>
              {[
                ['maintenanceMode', '🚧 Maintenance Mode (hides site from public)'],
                ['showPrices',      '💰 Show Prices on Tour Cards'],
                ['enableBlog',      '📰 Enable Blog Section'],
                ['enableAffiliate', '🤝 Enable Affiliate Program'],
                ['enableIB',        '🏢 Enable IB Partner Program'],
              ].map(([k,l])=>(
                <label key={k} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 cursor-pointer hover:bg-amber-50/30">
                  <span className="text-sm text-brand-navy font-medium">{l}</span>
                  <div className={`w-11 h-6 rounded-full transition-all relative cursor-pointer ${config[k]?'bg-brand-gold':'bg-gray-200'}`}
                    onClick={()=>upd(k,!config[k])}>
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${config[k]?'left-6':'left-1'}`} />
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Integrations */}
        {tab === 'integrations' && (
          <div className="space-y-6">
            <h3 className="font-bold text-brand-navy text-lg" style={{ fontFamily:"'Playfair Display',serif" }}>🔌 API Integrations</h3>
            <Section title="🗺️ Google APIs">
              <Field label="Google Maps API Key"   value={settings.googleMapsKey}   onChange={v=>upd('googleMapsKey',v)} password />
            </Section>
            <Section title="📧 EmailJS">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Service ID"   value={settings.emailjsService}  onChange={v=>upd('emailjsService',v)} />
                <Field label="Template ID"  value={settings.emailjsTemplate} onChange={v=>upd('emailjsTemplate',v)} />
                <Field label="Public Key"   value={settings.emailjsPublic}   onChange={v=>upd('emailjsPublic',v)} password />
              </div>
            </Section>
            <Section title="🤖 AI (OpenAI / Gemini)">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="OpenAI API Key" value={settings.openaiKey}  onChange={v=>upd('openaiKey',v)}  password placeholder="sk-..." />
                <Field label="Gemini API Key" value={settings.geminiKey}  onChange={v=>upd('geminiKey',v)}  password />
              </div>
            </Section>
            <div className="rounded-xl p-4 bg-amber-50 border border-amber-100">
              <p className="text-amber-700 text-xs font-semibold">⚠️ API keys are stored in your <code>.env.local</code> file and never exposed to the browser. These fields allow you to update them from the admin panel.</p>
            </div>
          </div>
        )}

        {/* Booking */}
        {tab === 'booking' && (
          <div className="space-y-5">
            <h3 className="font-bold text-brand-navy text-lg" style={{ fontFamily:"'Playfair Display',serif" }}>📋 Booking Settings</h3>
            <div>
              <label className="block text-xs font-bold text-brand-navy mb-2">🚀 Default Booking Mode</label>
              {[
                { v:'whatsapp', l:'💬 WhatsApp Only — all bookings via WhatsApp' },
                { v:'email',    l:'📧 Email Only — all bookings via email' },
                { v:'both',     l:'💬📧 Both — WhatsApp + Email simultaneously' },
              ].map(opt=>(
                <label key={opt.v} className="flex items-center gap-3 mb-3 cursor-pointer p-3 rounded-xl border border-gray-100 hover:bg-amber-50/50">
                  <input type="radio" name="bookingMode" value={opt.v} checked={settings.bookingMode===opt.v}
                    onChange={()=>upd('bookingMode',opt.v)} className="accent-brand-gold" />
                  <span className="text-sm font-medium text-brand-navy">{opt.l}</span>
                </label>
              ))}
            </div>
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <div className="text-xs font-bold text-brand-navy mb-2">📱 WhatsApp Booking Message Preview</div>
              <div className="text-xs text-gray-500 font-mono bg-white p-3 rounded-lg">
                🌟 New Booking Request — DubaiRovers<br/><br/>
                📍 Tour: [Tour Name]<br/>
                📅 Date: [Selected Date]<br/>
                👥 Adults: [Number] × AED [Price]<br/>
                💰 TOTAL: AED [Total]<br/><br/>
                _Sent via DubaiRovers.com_
              </div>
            </div>
          </div>
        )}

        {/* SEO */}
        {tab === 'seo' && (
          <div className="space-y-5">
            <h3 className="font-bold text-brand-navy text-lg" style={{ fontFamily:"'Playfair Display',serif" }}>🔍 SEO Settings</h3>
            <Field label="🏷️ Default Meta Title" value={settings.metaTitle} onChange={v=>upd('metaTitle',v)} />
            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1.5">📋 Default Meta Description</label>
              <textarea value={settings.metaDesc} onChange={e=>upd('metaDesc',e.target.value)}
                rows={3} className="input-field resize-none text-sm" />
              <div className="text-xs text-gray-400 mt-1">{settings.metaDesc.length}/160 chars</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Google Site Verification" value={settings.googleVerify} onChange={v=>upd('googleVerify',v)} />
              <Field label="Bing Site Verification"   value={settings.bingVerify}   onChange={v=>upd('bingVerify',v)} />
            </div>
            <div className="flex gap-3 pt-2">
              <button className="btn-gold text-sm px-5 py-2.5">🗺️ Regenerate Sitemap</button>
              <button className="btn-navy text-sm px-5 py-2.5">📤 Submit to Google</button>
            </div>
          </div>
        )}

        {/* Social */}
        {tab === 'social' && (
          <div className="space-y-5">
            <h3 className="font-bold text-brand-navy text-lg" style={{ fontFamily:"'Playfair Display',serif" }}>📱 Social Media</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="📸 Instagram URL" value={settings.instagramUrl} onChange={v=>upd('instagramUrl',v)} placeholder="https://instagram.com/dubairovers" />
              <Field label="👍 Facebook URL"  value={settings.facebookUrl}  onChange={v=>upd('facebookUrl',v)}  placeholder="https://facebook.com/dubairovers" />
              <Field label="🎵 TikTok URL"    value={settings.tiktokUrl}    onChange={v=>upd('tiktokUrl',v)}    placeholder="https://tiktok.com/@dubairovers" />
              <Field label="▶️ YouTube URL"   value={settings.youtubeUrl}   onChange={v=>upd('youtubeUrl',v)}   placeholder="https://youtube.com/@dubairovers" />
            </div>
          </div>
        )}

        {/* Security */}
        {tab === 'security' && (
          <div className="space-y-5">
            <h3 className="font-bold text-brand-navy text-lg" style={{ fontFamily:"'Playfair Display',serif" }}>🔒 Security</h3>
            <div className="max-w-sm space-y-4">
              <Field label="Current Password"  value={settings.adminPassword} onChange={v=>upd('adminPassword',v)} password />
              <Field label="New Password"       value={settings.newPassword}   onChange={v=>upd('newPassword',v)} password placeholder="Leave blank to keep current" />
            </div>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
              <p className="text-amber-700 text-sm font-semibold">⚠️ Admin access is session-based. Current password: <code>DubaiRovers2025!</code></p>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <button onClick={save} className="btn-gold px-8 py-3">
          {saved ? '✅ Saved!' : '💾 Save All Settings'}
        </button>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, type='text', password, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="block text-xs font-bold text-brand-navy mb-1.5">{label}</label>
      <div className="relative">
        <input type={password && !show ? 'password' : type}
          value={value} onChange={e=>onChange(e.target.value)}
          className="input-field text-sm pr-10"
          placeholder={placeholder || ''} />
        {password && (
          <button type="button" onClick={()=>setShow(s=>!s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-navy text-sm">
            {show ? '🙈' : '👁️'}
          </button>
        )}
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="p-5 rounded-2xl border border-gray-100 bg-gray-50/50">
      <h4 className="font-bold text-brand-navy text-sm mb-4">{title}</h4>
      {children}
    </div>
  );
}
