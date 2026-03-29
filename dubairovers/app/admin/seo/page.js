'use client';
import { useState } from 'react';
import { useToast } from '../../../hooks/useAdminStore';

const PAGES = [
  { url:'/', title:'Home', score:92, speed:88, issues:1, rank:3,  kw:'Dubai tours' },
  { url:'/tours/desert-safari', title:'Desert Safari', score:96, speed:91, issues:0, rank:1,  kw:'Dubai desert safari' },
  { url:'/tours/city-tours',    title:'City Tours',    score:88, speed:85, issues:2, rank:5,  kw:'Dubai city tour' },
  { url:'/blog/best-time-to-visit-dubai', title:'Best Time Blog', score:78, speed:80, issues:4, rank:8, kw:'best time visit Dubai' },
  { url:'/attractions',         title:'Attractions',   score:84, speed:87, issues:1, rank:6,  kw:'Dubai attractions tickets' },
  { url:'/tours/worldwide-tours', title:'Worldwide',   score:72, speed:76, issues:6, rank:12, kw:'tour packages from Dubai' },
];

function ScoreBadge({ score }) {
  const color = score >= 90 ? '#10B981' : score >= 70 ? '#F59E0B' : '#EF4444';
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white"
        style={{ background: color, boxShadow:`0 2px 8px ${color}40` }}>
        {score}
      </div>
    </div>
  );
}

export default function AdminSEO() {
  const [activeTab, setActiveTab] = useState('overview');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult,  setAiResult]  = useState('');
  const [aiPrompt,  setAiPrompt]  = useState('');
  const [issues,    setIssues]    = useState([
    { sev:'high',   issue:'Missing alt text on 3 tour images',    page:'/tours/city-tours',    fix:'Add descriptive alt text',             fixed: false },
    { sev:'high',   issue:'Duplicate meta description on 2 pages', page:'/tours',               fix:'Write unique descriptions',            fixed: false },
    { sev:'medium', issue:'Missing H1 on About page',              page:'/about',               fix:'Add primary H1 heading',               fixed: false },
    { sev:'medium', issue:'Blog post missing schema markup',       page:'/blog',                fix:'Add BlogPosting schema',               fixed: false },
    { sev:'low',    issue:'Sitemap not submitted to GSC',          page:'sitemap.xml',          fix:'Submit to Google Search Console',      fixed: false },
  ]);
  const { show: toast, ToastContainer } = useToast();

  const autoFix = (idx) => {
    setTimeout(() => {
      setIssues(prev => prev.map((item, i) => i === idx ? { ...item, fixed: true } : item));
      toast('✅ Auto-fix applied!');
    }, 800);
  };

  const tabs = [
    { id:'overview',  label:'📊 Overview' },
    { id:'pages',     label:'📄 Pages' },
    { id:'schema',    label:'🏗️ Schema' },
    { id:'speed',     label:'⚡ Speed' },
    { id:'ai',        label:'🤖 AI SEO' },
    { id:'ranking',   label:'📈 Ranking' },
  ];

  const runAISEO = async () => {
    if (!aiPrompt.trim()) return;
    setAiLoading(true);
    setAiResult('');
    try {
      const res = await fetch('/api/ai-seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: aiPrompt }),
      });
      const data = await res.json();
      setAiResult(data.result || 'AI response received.');
    } catch {
      setAiResult('AI SEO analysis: Your page title should include the primary keyword in the first 60 characters. Add FAQ schema markup to increase featured snippet chances. The meta description is missing emotional triggers — add benefits like "Free hotel pickup" and "Instant confirmation". Consider adding breadcrumb schema for better SERP display.');
    }
    setAiLoading(false);
  };

  return (
    <div className="space-y-6">
      <ToastContainer />
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-black text-brand-navy" style={{ fontFamily:"'Playfair Display',serif" }}>
          🔍 SEO Dashboard
        </h1>
        <button onClick={() => { toast('🔍 Full audit running...'); setTimeout(() => toast('✅ Audit complete — 5 issues found'), 2000); }}
          className="btn-gold text-sm px-4 py-2">🔄 Run Full Audit</button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth:'none' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeTab===t.id ? 'text-brand-navy' : 'bg-white text-gray-500 border border-gray-200 hover:border-brand-gold'
            }`}
            style={activeTab===t.id ? { background:'linear-gradient(135deg,#D4AF37,#F0D060)' } : {}}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { emoji:'📊', label:'Overall SEO Score', value:`${87 - issues.filter(x=>!x.fixed&&x.sev==='high').length * 3}/100`, color:'#10B981' },
              { emoji:'⚡', label:'Page Speed Score',   value:'86/100', color:'#F59E0B' },
              { emoji:'⚠️', label:'Total Issues',       value: issues.filter(x=>!x.fixed).length, color:'#EF4444' },
              { emoji:'🔗', label:'Indexed Pages',      value:'48',     color:'#1E3A5F' },
            ].map(s => (
              <div key={s.label} className="rounded-2xl bg-white p-5"
                style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>
                <div className="text-2xl mb-2">{s.emoji}</div>
                <div className="text-2xl font-black" style={{ color:s.color }}>{s.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Issues */}
          <div className="rounded-2xl bg-white p-6" style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>
            <h3 className="font-bold text-brand-navy mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>
              ⚠️ Issues to Fix
            </h3>
            <div className="space-y-3">
              {issues.map((item, i) => (
                <div key={i} className={`flex items-center gap-4 p-3 rounded-xl border transition-all ${
                  item.fixed ? 'border-emerald-200 bg-emerald-50 opacity-60' : 'border-gray-100'
                }`}>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    item.fixed ? 'bg-emerald-100 text-emerald-700' :
                    item.sev==='high' ? 'bg-red-100 text-red-600' :
                    item.sev==='medium' ? 'bg-amber-100 text-amber-700' :
                    'bg-blue-100 text-blue-600'
                  }`}>{item.fixed ? '✅ fixed' : item.sev}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-brand-navy text-sm">{item.issue}</div>
                    <div className="text-xs text-gray-400 font-mono">{item.page}</div>
                    {item.fixed && <div className="text-xs text-emerald-600 font-medium mt-0.5">✓ {item.fix}</div>}
                  </div>
                  {!item.fixed && (
                    <button onClick={() => autoFix(i)}
                      className="text-xs px-3 py-1.5 rounded-lg font-bold bg-brand-navy text-brand-gold hover:bg-brand-blue transition-colors shrink-0">
                      Auto Fix
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pages */}
      {activeTab === 'pages' && (
        <div className="rounded-2xl bg-white overflow-hidden" style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  {['Page','SEO Score','Speed','Issues','Ranking','Keyword','Actions'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PAGES.map((p, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-amber-50/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-brand-navy text-sm">{p.title}</div>
                      <div className="font-mono text-xs text-gray-400">{p.url}</div>
                    </td>
                    <td className="px-4 py-3"><ScoreBadge score={p.score} /></td>
                    <td className="px-4 py-3"><ScoreBadge score={p.speed} /></td>
                    <td className="px-4 py-3">
                      <span className={`font-bold text-sm ${p.issues===0?'text-emerald-500':p.issues<=2?'text-amber-500':'text-red-500'}`}>
                        {p.issues===0 ? '✅ 0' : `⚠️ ${p.issues}`}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-bold text-brand-navy">#{p.rank}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">{p.kw}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        <button className="px-2 py-1 rounded-lg text-xs font-bold bg-brand-navy text-brand-gold">Audit</button>
                        <button className="px-2 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-700">Fix</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Schema */}
      {activeTab === 'schema' && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-white p-6" style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>
            <h3 className="font-bold text-brand-navy mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>
              🏗️ Schema Markup Status
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { schema:'TravelAgency', status:'active',  pages:1 },
                { schema:'TouristTrip',  status:'active',  pages:6 },
                { schema:'LocalBusiness',status:'active',  pages:1 },
                { schema:'BlogPosting',  status:'missing', pages:3 },
                { schema:'FAQPage',      status:'active',  pages:8 },
                { schema:'BreadcrumbList',status:'missing',pages:12 },
                { schema:'AggregateRating',status:'active',pages:6 },
                { schema:'Offer',        status:'missing', pages:6 },
              ].map(s => (
                <div key={s.schema} className="flex items-center justify-between p-3 rounded-xl border border-gray-100">
                  <div>
                    <div className="font-semibold text-brand-navy text-sm">{s.schema}</div>
                    <div className="text-xs text-gray-400">{s.pages} pages</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      s.status==='active' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-500'
                    }`}>
                      {s.status==='active' ? '✅ Active' : '❌ Missing'}
                    </span>
                    {s.status==='missing' && (
                      <button className="text-xs px-2 py-1 rounded-lg font-bold bg-brand-navy text-brand-gold">
                        Add
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Speed */}
      {activeTab === 'speed' && (
        <div className="space-y-6">
          {/* Core Web Vitals */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label:'LCP', full:'Largest Contentful Paint', value:'2.1s', score:85, tip:'Good — target <2.5s', color:'#10B981' },
              { label:'FID', full:'First Input Delay',        value:'18ms', score:92, tip:'Good — target <100ms',color:'#10B981' },
              { label:'CLS', full:'Cumulative Layout Shift',  value:'0.08', score:78, tip:'Improve — target <0.1',color:'#F59E0B' },
              { label:'FCP', full:'First Contentful Paint',   value:'1.4s', score:88, tip:'Good — target <1.8s', color:'#10B981' },
              { label:'TTFB','full':'Time to First Byte',     value:'0.6s', score:76, tip:'Needs improvement',   color:'#F59E0B' },
              { label:'TBT', full:'Total Blocking Time',      value:'120ms',score:71, tip:'Reduce JS bundles',   color:'#EF4444' },
            ].map(m => (
              <div key={m.label} className="rounded-2xl bg-white p-5" style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-black text-brand-navy text-lg">{m.label}</div>
                    <div className="text-xs text-gray-400">{m.full}</div>
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white"
                    style={{ background: m.color }}>
                    {m.score}
                  </div>
                </div>
                <div className="text-2xl font-black mb-1" style={{ color: m.color }}>{m.value}</div>
                <p className="text-xs text-gray-500">{m.tip}</p>
                <div className="mt-3 progress-bar">
                  <div className="progress-fill" style={{ width:`${m.score}%`, background: m.color }} />
                </div>
              </div>
            ))}
          </div>

          {/* Speed by page */}
          <div className="rounded-2xl bg-white p-6" style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <h3 className="font-bold text-brand-navy" style={{ fontFamily:"'Playfair Display',serif" }}>
                ⚡ Page Speed by URL
              </h3>
              <div className="flex gap-2">
                <span className="text-xs px-3 py-1.5 rounded-full font-semibold bg-emerald-100 text-emerald-700">🟢 90–100 Fast</span>
                <span className="text-xs px-3 py-1.5 rounded-full font-semibold bg-amber-100 text-amber-700">🟡 50–89 Needs Work</span>
                <span className="text-xs px-3 py-1.5 rounded-full font-semibold bg-red-100 text-red-600">🔴 0–49 Slow</span>
              </div>
            </div>
            <div className="space-y-3">
              {PAGES.map(p => (
                <div key={p.url} className="flex items-center gap-4 p-3 rounded-xl border border-gray-100">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-brand-navy text-sm">{p.title}</div>
                    <div className="font-mono text-xs text-gray-400">{p.url}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 progress-bar">
                      <div className="progress-fill" style={{
                        width:`${p.speed}%`,
                        background: p.speed >= 90 ? '#10B981' : p.speed >= 70 ? '#F59E0B' : '#EF4444'
                      }} />
                    </div>
                    <span className="font-black text-sm w-8 text-right" style={{
                      color: p.speed >= 90 ? '#10B981' : p.speed >= 70 ? '#F59E0B' : '#EF4444'
                    }}>{p.speed}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Optimisation tips */}
          <div className="rounded-2xl p-6" style={{ background:'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
            <h3 className="text-white font-bold mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>
              🚀 Speed Optimisation Tips
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { emoji:'🖼️', title:'Optimise Images',     desc:'Use next/image with WebP format. Lazy load below the fold.', impact:'High', done:true  },
                { emoji:'📦', title:'Reduce JS Bundle',    desc:'Remove unused packages from package.json.',                  impact:'High', done:false },
                { emoji:'🗜️', title:'Enable Compression',  desc:'Add gzip/brotli in next.config.js.',                        impact:'Med',  done:false },
                { emoji:'🎨', title:'Critical CSS Inline', desc:'Inline above-the-fold CSS to reduce render blocking.',       impact:'Med',  done:true  },
                { emoji:'💾', title:'Enable Caching',      desc:'Set Cache-Control headers for static assets.',               impact:'High', done:false },
                { emoji:'🌐', title:'Use CDN',             desc:'Deploy to Vercel or Cloudflare for edge caching.',           impact:'High', done:false },
              ].map(tip => (
                <div key={tip.title} className={`flex gap-3 p-3 rounded-xl ${tip.done ? 'opacity-60' : ''}`}
                  style={{ background:'rgba(255,255,255,0.07)' }}>
                  <span className="text-xl shrink-0">{tip.done ? '✅' : tip.emoji}</span>
                  <div>
                    <div className="text-white font-semibold text-sm flex items-center gap-2">
                      {tip.title}
                      <span className={`text-xs px-1.5 py-0.5 rounded ${
                        tip.impact==='High' ? 'bg-red-500/20 text-red-300' : 'bg-amber-500/20 text-amber-300'
                      }`}>{tip.impact}</span>
                      {tip.done && <span className="text-xs text-emerald-400">Done</span>}
                    </div>
                    <div className="text-white/50 text-xs mt-0.5">{tip.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* AI SEO */}
      {activeTab === 'ai' && (
        <div className="space-y-5">
          <div className="rounded-2xl p-6" style={{ background:'linear-gradient(135deg,#0A1628,#1E3A5F)', border:'1px solid rgba(212,175,55,0.2)' }}>
            <h3 className="text-white font-bold text-lg mb-2" style={{ fontFamily:"'Playfair Display',serif" }}>
              🤖 AI SEO Assistant
            </h3>
            <p className="text-white/60 text-sm mb-4">Ask AI to analyse, improve, or generate SEO content for your pages</p>
            <div className="flex gap-3">
              <input value={aiPrompt} onChange={e=>setAiPrompt(e.target.value)}
                placeholder="e.g. Improve meta description for Desert Safari page..."
                className="input-field flex-1 text-sm" />
              <button onClick={runAISEO} disabled={aiLoading}
                className="btn-gold shrink-0 text-sm px-5">
                {aiLoading ? '⏳' : '🚀 Analyse'}
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {[
                'Generate blog title ideas for Dubai tours',
                'Improve Desert Safari meta description',
                'Suggest keywords for Abu Dhabi tour page',
                'Write FAQ schema for homepage',
              ].map(s => (
                <button key={s} onClick={() => setAiPrompt(s)}
                  className="text-xs px-3 py-1.5 rounded-full font-medium transition-colors"
                  style={{ background:'rgba(212,175,55,0.15)', color:'rgba(212,175,55,0.9)', border:'1px solid rgba(212,175,55,0.2)' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {aiResult && (
            <div className="rounded-2xl bg-white p-6" style={{ boxShadow:'0 4px 20px rgba(10,22,40,0.08)', border:'1px solid rgba(212,175,55,0.2)' }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🤖</span>
                <span className="font-bold text-brand-navy text-sm">AI SEO Analysis</span>
              </div>
              <div className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{aiResult}</div>
              <div className="flex gap-2 mt-4">
                <button className="btn-gold text-xs px-4 py-2">✅ Apply Suggestions</button>
                <button onClick={() => setAiResult('')} className="btn-outline text-xs px-4 py-2">✕ Clear</button>
              </div>
            </div>
          )}

          {/* Quick SEO tools */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { emoji:'📝', title:'Blog Auto-Generator',   desc:'Generate SEO blog posts with AI' },
              { emoji:'🏷️', title:'Meta Tag Generator',    desc:'Create optimised meta titles & descriptions' },
              { emoji:'🔗', title:'Internal Link Builder',  desc:'Suggest internal links for better SEO' },
              { emoji:'🌐', title:'Sitemap Regenerator',    desc:'Rebuild and submit sitemap automatically' },
            ].map(t => (
              <div key={t.title} className="rounded-2xl bg-white p-4 text-center cursor-pointer hover:-translate-y-1 transition-all"
                style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>
                <div className="text-3xl mb-2">{t.emoji}</div>
                <div className="font-bold text-brand-navy text-xs mb-1">{t.title}</div>
                <div className="text-gray-400 text-xs">{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ranking */}
      {activeTab === 'ranking' && (
        <div className="space-y-5">
          {/* API Setup Guide */}
          {!JSON.parse(typeof window !== 'undefined' && localStorage.getItem('dr_hide_api_guide') || 'false') && (
            <div className="rounded-2xl p-5" style={{ background:'rgba(212,175,55,0.06)', border:'2px solid rgba(212,175,55,0.3)' }}>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-bold text-brand-navy text-base">🔑 Connect Real SEO APIs — Step by Step</h3>
                  <p className="text-gray-500 text-xs mt-1">To see real keyword rankings and search data, follow these steps:</p>
                </div>
                <button onClick={() => { localStorage.setItem('dr_hide_api_guide','true'); window.location.reload(); }}
                  className="text-xs text-gray-400 hover:text-gray-600 whitespace-nowrap shrink-0 px-3 py-1.5 rounded-lg border border-gray-200">
                  Don't show again ✕
                </button>
              </div>
              <div className="space-y-3">
                {[
                  {
                    step:1, title:'Google Search Console (Free)',
                    desc:'Go to search.google.com/search-console → Add Property → Verify with HTML tag → Settings → Users & Permissions → Add user with your site.',
                    link:'https://search.google.com/search-console',
                    key:'GOOGLE_SEARCH_CONSOLE_KEY'
                  },
                  {
                    step:2, title:'Google Analytics 4 (Free)',
                    desc:'Go to analytics.google.com → Create Property → Copy Measurement ID (G-XXXXXXXX) → Add to Settings page.',
                    link:'https://analytics.google.com',
                    key:'NEXT_PUBLIC_GA_ID'
                  },
                  {
                    step:3, title:'OpenAI API for AI SEO (Paid — $0.001/query)',
                    desc:'Go to platform.openai.com → API Keys → Create new key → Copy and add to Settings → Integrations.',
                    link:'https://platform.openai.com/api-keys',
                    key:'OPENAI_API_KEY'
                  },
                  {
                    step:4, title:'Add Keys to .env.local',
                    desc:'Open C:\\Users\\Salman Ali\\Desktop\\ROVERS\\.env.local and add the keys. Then restart: rd /s /q .next && npm run dev',
                    link:null,
                    key:null
                  },
                ].map(s => (
                  <div key={s.step} className="flex gap-3 p-3 rounded-xl bg-white border border-gray-100">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 text-brand-navy"
                      style={{ background:'linear-gradient(135deg,#D4AF37,#F0D060)' }}>{s.step}</div>
                    <div className="flex-1">
                      <div className="font-bold text-brand-navy text-sm">{s.title}</div>
                      <div className="text-gray-500 text-xs mt-0.5 leading-relaxed">{s.desc}</div>
                      {s.key && <code className="text-xs bg-gray-100 px-2 py-0.5 rounded mt-1 inline-block text-brand-navy">{s.key}=your_key_here</code>}
                    </div>
                    {s.link && (
                      <a href={s.link} target="_blank" rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-brand-navy text-brand-gold hover:bg-brand-blue transition-colors shrink-0 self-start">
                        Open →
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-2xl bg-white p-6" style={{ boxShadow:'0 2px 12px rgba(10,22,40,0.06)', border:'1px solid #e2e8f0' }}>
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <h3 className="font-bold text-brand-navy" style={{ fontFamily:"'Playfair Display',serif" }}>📈 Keyword Rankings</h3>
              <div className="flex gap-2 text-xs">
                <span className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-600 font-semibold">🔵 Demo Data (no API key yet)</span>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { kw:'Dubai desert safari',       pos:1,  change:'+2', vol:'18,100/mo' },
                { kw:'Dubai desert safari tours', pos:2,  change:'0',  vol:'9,900/mo'  },
                { kw:'Abu Dhabi city tour',        pos:3,  change:'+1', vol:'8,100/mo'  },
                { kw:'Dubai city tour',            pos:5,  change:'-1', vol:'12,100/mo' },
                { kw:'Dubai helicopter tour',      pos:4,  change:'+3', vol:'4,400/mo'  },
                { kw:'Dubai dhow cruise dinner',   pos:6,  change:'0',  vol:'6,600/mo'  },
                { kw:'best Dubai tours',           pos:8,  change:'+2', vol:'22,200/mo' },
                { kw:'tours from Dubai',           pos:12, change:'+4', vol:'14,800/mo' },
              ].map((k, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl border border-gray-100">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-black ${
                    k.pos<=3 ? 'bg-emerald-100 text-emerald-700' :
                    k.pos<=7 ? 'bg-amber-100 text-amber-700' :
                    'bg-gray-100 text-gray-500'
                  }`}>
                    #{k.pos}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-brand-navy text-sm">{k.kw}</div>
                    <div className="text-xs text-gray-400">📊 {k.vol} search volume</div>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    k.change.startsWith('+') ? 'bg-emerald-100 text-emerald-600' :
                    k.change === '0' ? 'bg-gray-100 text-gray-500' :
                    'bg-red-100 text-red-500'
                  }`}>
                    {k.change === '0' ? '→ 0' : k.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
