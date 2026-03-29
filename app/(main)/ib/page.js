'use client';
import { useState } from 'react';
import FAQSection from '../../../components/FAQSection';

export default function IBPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    companyName:'', regNo:'', country:'', contactName:'', email:'', phone:'', website:'',
    tourTypes:'', description:'', bankDetails:'',
  });
  const [sent, setSent] = useState(false);
  const upd = (k,v) => setForm(f=>({...f,[k]:v}));

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `🏢 *IB Company Registration — DubaiRovers*\n\n🏢 Company: ${form.companyName}\n📋 Reg No: ${form.regNo}\n🌍 Country: ${form.country}\n👤 Contact: ${form.contactName}\n📧 Email: ${form.email}\n📱 Phone: ${form.phone}\n🌐 Website: ${form.website||'N/A'}\n\n🗺️ Tour Types: ${form.tourTypes}\n📝 Description: ${form.description}\n\nPlease process our IB registration. Thank you!`;
    window.open(`https://wa.me/971544735060?text=${encodeURIComponent(msg)}`, '_blank');
    setSent(true);
  };

  const FEATURES = [
    { emoji:'🗺️', title:'List Your Tours',       desc:'Upload and manage unlimited tours on DubaiRovers.com with your own branding.' },
    { emoji:'📊', title:'Performance Analytics',  desc:'Real-time dashboard showing bookings, revenue, conversion rates and customer insights.' },
    { emoji:'💰', title:'Transparent Commission', desc:'Competitive commission structure with clear deductions and weekly/monthly payouts.' },
    { emoji:'📋', title:'Booking Management',     desc:'Manage all bookings, customer details, and tour schedules from one dashboard.' },
    { emoji:'📄', title:'Auto Invoicing',         desc:'Automated invoice generation for every booking with your company branding.' },
    { emoji:'🤝', title:'Agent Network',          desc:'Access our network of 500+ agents and affiliates to promote your tours.' },
    { emoji:'📱', title:'WhatsApp Integration',   desc:'Bookings and inquiries forwarded directly to your WhatsApp instantly.' },
    { emoji:'🌍', title:'Multi-language',         desc:'Tours listed in English, Arabic, Russian and Chinese for global reach.' },
  ];

  return (
    <>
      <section className="py-20 text-white text-center relative overflow-hidden"
        style={{ background:'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
        <div className="container-main">
          <span className="badge-gold mb-4">🏢 List Your Tours</span>
          <h1 className="text-4xl md:text-5xl font-black mt-3 mb-4" style={{ fontFamily:"'Playfair Display',serif" }}>
            Grow Your Tour Business<br />
            <span style={{ color:'#D4AF37' }}>with DubaiRovers</span>
          </h1>
          <p className="text-white/70 text-xl max-w-2xl mx-auto mb-8">
            List your tours on Dubai's fastest-growing travel platform. Reach thousands of travellers, manage bookings, and grow your revenue.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#register" className="btn-gold text-base px-8 py-4">🏢 Register Your Company</a>
            <a href="/ib/dashboard" className="btn-outline text-base px-8 py-4">📊 IB Dashboard</a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-pad bg-white">
        <div className="container-main">
          <div className="text-center mb-12">
            <span className="badge-gold mb-3">✨ Platform Benefits</span>
            <h2 className="text-3xl font-bold text-brand-navy mt-3" style={{ fontFamily:"'Playfair Display',serif" }}>
              Everything You Need to Succeed
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map(f => (
              <div key={f.title} className="rounded-2xl p-5"
                style={{ background:'#fafafa', border:'1px solid #e2e8f0' }}>
                <div className="text-3xl mb-3">{f.emoji}</div>
                <h3 className="font-bold text-brand-navy mb-2 text-sm">{f.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commission structure */}
      <section className="section-pad bg-brand-cream">
        <div className="container-main max-w-3xl">
          <div className="text-center mb-10">
            <span className="badge-gold mb-3">💰 Commission Structure</span>
            <h2 className="text-3xl font-bold text-brand-navy mt-3" style={{ fontFamily:"'Playfair Display',serif" }}>
              Clear, Fair & Transparent
            </h2>
          </div>
          <div className="rounded-3xl overflow-hidden bg-white" style={{ boxShadow:'0 8px 40px rgba(10,22,40,0.08)' }}>
            {[
              { type:'Desert Safari Tours', ibKeeps:'80%', drDeducts:'20%', payout:'Weekly' },
              { type:'City Tours & Day Trips', ibKeeps:'82%', drDeducts:'18%', payout:'Weekly' },
              { type:'Water Activities', ibKeeps:'80%', drDeducts:'20%', payout:'Weekly' },
              { type:'Worldwide Packages', ibKeeps:'85%', drDeducts:'15%', payout:'Monthly' },
              { type:'Attraction Tickets', ibKeeps:'75%', drDeducts:'25%', payout:'Weekly' },
            ].map((row,i) => (
              <div key={i} className={`flex items-center px-6 py-4 gap-4 flex-wrap ${i%2===0?'bg-white':'bg-gray-50'}`}>
                <div className="flex-1 font-semibold text-brand-navy text-sm">{row.type}</div>
                <div className="text-center px-4">
                  <div className="text-xs text-gray-400">You Keep</div>
                  <div className="font-black text-emerald-600">{row.ibKeeps}</div>
                </div>
                <div className="text-center px-4">
                  <div className="text-xs text-gray-400">Platform Fee</div>
                  <div className="font-black text-brand-navy">{row.drDeducts}</div>
                </div>
                <div className="text-center px-4">
                  <div className="text-xs text-gray-400">Payout</div>
                  <div className="font-bold text-brand-gold text-sm">{row.payout}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration form */}
      <section id="register" className="section-pad bg-white">
        <div className="container-main max-w-2xl">
          <div className="text-center mb-10">
            <span className="badge-gold mb-3">📝 Company Registration</span>
            <h2 className="text-3xl font-bold text-brand-navy mt-3" style={{ fontFamily:"'Playfair Display',serif" }}>
              Register Your Company
            </h2>
            <p className="text-gray-600 mt-2">Free registration · Approved in 48 hours · Start listing tours immediately</p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-0 mb-8">
            {[{n:1,l:'Company'},{n:2,l:'Tours'},{n:3,l:'Submit'}].map((s,i)=>(
              <div key={s.n} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`wizard-step ${step===s.n?'active':step>s.n?'done':'pending'}`}>
                    {step>s.n?'✓':s.n}
                  </div>
                  <span className={`text-[10px] mt-1 font-bold ${step>=s.n?'text-brand-gold':'text-gray-400'}`}>{s.l}</span>
                </div>
                {i<2 && <div className={`h-0.5 w-12 mx-1 mb-5 ${step>s.n?'bg-brand-gold':'bg-gray-200'}`}/>}
              </div>
            ))}
          </div>

          {sent ? (
            <div className="text-center py-12 rounded-3xl"
              style={{ background:'#f0fdf4', border:'2px solid #bbf7d0' }}>
              <div className="text-5xl mb-3">🎉</div>
              <h3 className="text-xl font-bold text-brand-navy mb-2">Registration Submitted!</h3>
              <p className="text-gray-500 mb-4">Our IB team will contact you within 48 hours to complete setup.</p>
              <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer" className="btn-gold text-sm">
                💬 Follow Up on WhatsApp
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit}
              className="rounded-3xl p-8 bg-white space-y-4"
              style={{ boxShadow:'0 8px 40px rgba(10,22,40,0.08)', border:'1px solid rgba(212,175,55,0.15)' }}>

              {step === 1 && (
                <div className="space-y-4 animate-slide-up">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-brand-navy mb-1.5">🏢 Company Name *</label>
                      <input value={form.companyName} onChange={e=>upd('companyName',e.target.value)} className="input-field" required placeholder="Your Company LLC" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-brand-navy mb-1.5">📋 Reg. Number</label>
                      <input value={form.regNo} onChange={e=>upd('regNo',e.target.value)} className="input-field" placeholder="Trade Licence No." />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-brand-navy mb-1.5">👤 Contact Person *</label>
                      <input value={form.contactName} onChange={e=>upd('contactName',e.target.value)} className="input-field" required placeholder="Full name" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-brand-navy mb-1.5">🌍 Country *</label>
                      <input value={form.country} onChange={e=>upd('country',e.target.value)} className="input-field" required placeholder="UAE, UK..." />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-brand-navy mb-1.5">📧 Email *</label>
                      <input type="email" value={form.email} onChange={e=>upd('email',e.target.value)} className="input-field" required />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-brand-navy mb-1.5">📱 WhatsApp *</label>
                      <input value={form.phone} onChange={e=>upd('phone',e.target.value)} className="input-field" required placeholder="+971..." />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-navy mb-1.5">🌐 Website</label>
                    <input value={form.website} onChange={e=>upd('website',e.target.value)} className="input-field" placeholder="https://yourcompany.com" />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate-slide-up">
                  <div>
                    <label className="block text-sm font-bold text-brand-navy mb-1.5">🗺️ Tour Types You Offer *</label>
                    <div className="grid grid-cols-2 gap-2">
                      {['Desert Safari','City Tours','Water Activities','Helicopter Tours','Theme Parks','Cultural Tours','Worldwide Tours','Airport Transfers'].map(t=>(
                        <label key={t} className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" className="accent-brand-gold"
                            onChange={e=>{
                              const cur = form.tourTypes ? form.tourTypes.split(', ') : [];
                              upd('tourTypes', e.target.checked ? [...cur,t].join(', ') : cur.filter(x=>x!==t).join(', '));
                            }} />
                          <span className="text-sm text-brand-navy">{t}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-brand-navy mb-1.5">📝 Company Description</label>
                    <textarea value={form.description} onChange={e=>upd('description',e.target.value)}
                      rows={4} placeholder="Tell us about your company, experience, and the tours you offer..."
                      className="input-field resize-none" />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="animate-slide-up space-y-4">
                  <div className="rounded-2xl p-5 bg-amber-50">
                    <h4 className="font-bold text-brand-navy mb-3">📋 Registration Summary</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex gap-2"><span className="text-gray-500 w-24">Company:</span><span className="font-semibold text-brand-navy">{form.companyName}</span></div>
                      <div className="flex gap-2"><span className="text-gray-500 w-24">Contact:</span><span className="font-semibold">{form.contactName}</span></div>
                      <div className="flex gap-2"><span className="text-gray-500 w-24">Email:</span><span className="font-semibold">{form.email}</span></div>
                      <div className="flex gap-2"><span className="text-gray-500 w-24">Tours:</span><span className="font-semibold">{form.tourTypes||'Not specified'}</span></div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 text-center">
                    By submitting, you agree to the DubaiRovers IB Terms & Commission Structure above.
                  </div>
                </div>
              )}

              <div className="flex justify-between pt-2">
                {step > 1 ? <button type="button" onClick={()=>setStep(s=>s-1)} className="btn-outline text-sm px-5 py-2.5">← Back</button> : <div/>}
                {step < 3 ? (
                  <button type="button" onClick={()=>{
                    if(step===1&&(!form.companyName||!form.email||!form.phone)){alert('Fill required fields');return;}
                    setStep(s=>s+1);
                  }} className="btn-gold text-sm px-6 py-2.5">Continue →</button>
                ) : (
                  <button type="submit" className="btn-gold text-sm px-6 py-2.5">✅ Submit Registration</button>
                )}
              </div>
            </form>
          )}
        </div>
      </section>

      <FAQSection faqs={[
        { q:'🏢 Who can apply as an IB partner?', a:'Any registered tour operator, travel agency, or activity provider can apply. We welcome both UAE-based and international companies.' },
        { q:'⏱️ How long does approval take?', a:'We review all applications within 48 hours. Once approved, you\'ll receive your login credentials and can start listing tours immediately.' },
        { q:'💰 How do payouts work?', a:'IB payouts are processed weekly for most tour types and monthly for worldwide packages. Minimum payout is AED 500. We pay via bank transfer.' },
        { q:'🗺️ How many tours can I list?', a:'There\'s no limit on the number of tours you can list. You can also use our bulk upload feature to import multiple tours at once via CSV.' },
      ]} title="IB Partner FAQ" />
    </>
  );
}
