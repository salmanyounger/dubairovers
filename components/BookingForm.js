'use client';
import { useState } from 'react';

// ─── Step indicators ─────────────────────────────────────────────
function Steps({ current, total }) {
  const labels = ['Trip Details', 'Your Info', 'Extras', 'Confirm'];
  return (
    <div className="flex items-center justify-between mb-8 px-2">
      {labels.slice(0, total).map((label, i) => {
        const step = i + 1;
        const done   = current > step;
        const active = current === step;
        return (
          <div key={step} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-1.5 relative z-10">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-black transition-all duration-300 ${
                done   ? 'bg-emerald-500 text-white' :
                active ? 'text-brand-navy' :
                'bg-gray-100 text-gray-400'
              }`}
              style={active ? { background:'linear-gradient(135deg,#D4AF37,#F0D060)' } : {}}>
                {done ? '✓' : step}
              </div>
              <span className={`text-[10px] font-bold whitespace-nowrap ${
                done ? 'text-emerald-500' : active ? 'text-brand-gold' : 'text-gray-400'
              }`}>{label}</span>
            </div>
            {i < labels.slice(0,total).length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 mb-5 transition-all duration-300 ${done ? 'bg-emerald-400' : 'bg-gray-200'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Counter component ────────────────────────────────────────────
function Counter({ value, min = 0, max = 20, onChange, label, sub, price }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl border-2 border-gray-100 hover:border-amber-200 transition-colors">
      <div>
        <div className="font-bold text-brand-navy text-sm">{label}</div>
        <div className="text-xs text-gray-400">{sub}</div>
        {price != null && <div className="text-xs font-bold text-brand-gold mt-0.5">AED {price} / person</div>}
      </div>
      <div className="flex items-center gap-3">
        <button type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center font-bold text-lg text-brand-navy disabled:opacity-30 hover:border-brand-gold hover:text-brand-gold transition-all">
          −
        </button>
        <span className="w-6 text-center font-black text-brand-navy text-lg">{value}</span>
        <button type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg text-white disabled:opacity-30 transition-all"
          style={{ background:'linear-gradient(135deg,#D4AF37,#F0D060)' }}>
          +
        </button>
      </div>
    </div>
  );
}

// ─── Summary row ─────────────────────────────────────────────────
function SummaryRow({ label, value, bold, gold, big }) {
  return (
    <div className={`flex justify-between items-center py-2 ${bold ? 'border-t-2 border-gray-200 mt-1 pt-3' : 'border-b border-gray-50'}`}>
      <span className={`text-sm ${bold ? 'font-black text-brand-navy' : 'text-gray-500'}`}>{label}</span>
      <span className={`font-bold ${big ? 'text-2xl text-brand-navy' : gold ? 'text-brand-gold' : 'text-brand-navy'} ${bold ? 'font-black' : ''}`}>{value}</span>
    </div>
  );
}

// ─── Main Booking Form ────────────────────────────────────────────
export default function BookingForm({ tour, onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    date: '', time: '', adults: 1, children: 0, infants: 0,
    firstName: '', lastName: '', email: '', phone: '', country: '', hotel: '', flightNo: '', notes: '',
    addOns: [],
    language: 'English',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const pricing = tour?.pricing || { adult: 0, child: 0, infant: 0 };

  const subtotal = (form.adults * (pricing.adult || 0)) +
                   (form.children * (pricing.child || 0)) +
                   (form.infants * (pricing.infant || 0));

  const addOnTotal = form.addOns.reduce((sum, id) => {
    const a = tour?.addOns?.find(x => x.id === id);
    return sum + (a ? a.price * (form.adults || 1) : 0);
  }, 0);

  const total = subtotal + addOnTotal;

  const toggleAddOn = (id) => {
    setForm(f => ({
      ...f,
      addOns: f.addOns.includes(id) ? f.addOns.filter(x => x !== id) : [...f.addOns, id],
    }));
  };

  const validate = (s) => {
    const e = {};
    if (s === 1) {
      if (!form.date) e.date = 'Please select a tour date';
      if (form.adults < 1) e.adults = 'At least 1 adult required';
    }
    if (s === 2) {
      if (!form.firstName?.trim()) e.firstName = 'First name required';
      if (!form.lastName?.trim())  e.lastName  = 'Last name required';
      if (!form.email?.trim())     e.email     = 'Email required';
      if (!form.phone?.trim())     e.phone     = 'Phone / WhatsApp required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate(step)) setStep(s => s + 1); };
  const back = () => setStep(s => s - 1);

  const handleSubmit = () => {
    const selectedAddOns = form.addOns.map(id => {
      const a = tour?.addOns?.find(x => x.id === id);
      return a ? `${a.emoji} ${a.name} × ${form.adults} = AED ${a.price * form.adults}` : '';
    }).filter(Boolean);

    const msg = [
      `🌟 *New Booking — DubaiRovers*`,
      ``,
      `📍 *Tour:* ${tour?.name}`,
      `📅 *Date:* ${form.date}${form.time ? ` at ${form.time}` : ''}`,
      `🌍 *Language:* ${form.language}`,
      ``,
      `👥 *Group:*`,
      `  • Adults (12+): ${form.adults} × AED ${pricing.adult} = AED ${form.adults * pricing.adult}`,
      form.children > 0 ? `  • Children (3-11): ${form.children} × AED ${pricing.child} = AED ${form.children * pricing.child}` : null,
      form.infants > 0  ? `  • Infants (0-2): ${form.infants} × Free` : null,
      ``,
      `👤 *Contact:*`,
      `  • Name: ${form.firstName} ${form.lastName}`,
      `  • Email: ${form.email}`,
      `  • Phone: ${form.phone}`,
      `  • Country: ${form.country || 'N/A'}`,
      form.hotel    ? `  • Hotel: ${form.hotel}` : null,
      form.flightNo ? `  • Flight: ${form.flightNo}` : null,
      ``,
      selectedAddOns.length ? `✨ *Add-ons:*\n${selectedAddOns.map(a => `  • ${a}`).join('\n')}` : null,
      form.notes ? `📝 *Notes:* ${form.notes}` : null,
      ``,
      `━━━━━━━━━━━━━━━━━━━━`,
      `💰 *TOTAL: AED ${total.toLocaleString()}*`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `_Booking via DubaiRovers.com_`,
    ].filter(x => x !== null).join('\n');

    window.open(`https://wa.me/971544735060?text=${encodeURIComponent(msg)}`, '_blank');

    const emailBody = `Tour: ${tour?.name}\nDate: ${form.date}\nName: ${form.firstName} ${form.lastName}\nEmail: ${form.email}\nPhone: ${form.phone}\nAdults: ${form.adults}\nChildren: ${form.children}\nTotal: AED ${total}`;
    window.open(`mailto:dbtis.com@gmail.com?subject=New Booking: ${tour?.name}&body=${encodeURIComponent(emailBody)}`);

    setSubmitted(true);
  };

  // ── Submitted state ─────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="p-8 text-center">
        <div className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center text-4xl"
          style={{ background:'linear-gradient(135deg,#10B981,#059669)', boxShadow:'0 8px 32px rgba(16,185,129,0.3)' }}>
          ✓
        </div>
        <h3 className="text-2xl font-black text-brand-navy mb-2" style={{ fontFamily:"'Playfair Display',serif" }}>
          Booking Request Sent! 🎉
        </h3>
        <p className="text-gray-500 mb-2">We've sent your details to WhatsApp and Email.</p>
        <p className="text-sm font-semibold text-brand-navy mb-6">
          Our team will confirm your booking within <span className="text-brand-gold">30 minutes</span>.
        </p>
        <div className="rounded-2xl p-4 mb-6 text-left space-y-1 text-sm"
          style={{ background:'#f8fafc', border:'1px solid #e2e8f0' }}>
          <div className="flex gap-2"><span className="text-gray-400">Tour:</span><span className="font-semibold">{tour?.name}</span></div>
          <div className="flex gap-2"><span className="text-gray-400">Date:</span><span className="font-semibold">{form.date}</span></div>
          <div className="flex gap-2"><span className="text-gray-400">Guests:</span><span className="font-semibold">{form.adults} adults{form.children>0?`, ${form.children} children`:''}</span></div>
          <div className="flex gap-2"><span className="text-gray-400">Total:</span><span className="font-black text-brand-gold">AED {total.toLocaleString()}</span></div>
        </div>
        <div className="flex gap-3 justify-center flex-wrap">
          <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white text-sm"
            style={{ background:'#25D366' }}>
            💬 Follow Up on WhatsApp
          </a>
          {onClose && (
            <button onClick={onClose} className="px-6 py-3 rounded-full font-bold text-sm border-2 border-gray-200 text-gray-600 hover:border-brand-gold hover:text-brand-gold transition-colors">
              Close
            </button>
          )}
        </div>
      </div>
    );
  }

  const STEP_COUNT = tour?.addOns?.length > 0 ? 4 : 3;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-gray-100">
        <div className="flex items-start justify-between mb-1">
          <div className="flex-1 min-w-0 pr-3">
            <h2 className="text-lg font-black text-brand-navy" style={{ fontFamily:"'Playfair Display',serif" }}>
              Book: {tour?.name}
            </h2>
            <div className="flex items-center gap-3 text-xs text-gray-500 mt-1 flex-wrap">
              <span>⏱️ {tour?.duration}</span>
              <span>•</span>
              <span>👥 Max {tour?.groupSize?.max}</span>
              <span>•</span>
              <span className="text-emerald-600">🔄 {tour?.cancellation?.split(' up')[0]}</span>
            </div>
          </div>
          {onClose && (
            <button onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all shrink-0 text-xl">
              ✕
            </button>
          )}
        </div>
        <div className="mt-4">
          <Steps current={step} total={STEP_COUNT} />
        </div>
      </div>

      {/* Form body */}
      <div className="px-6 py-5">

        {/* ── STEP 1: Trip Details ─────────────────────────── */}
        {step === 1 && (
          <div className="space-y-5 animate-slide-up">
            {/* Date */}
            <div>
              <label className="block text-sm font-bold text-brand-navy mb-2">
                📅 Select Tour Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={form.date}
                onChange={e => upd('date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className={`input-field text-base ${errors.date ? 'border-red-400' : ''}`}
              />
              {errors.date && <p className="text-red-500 text-xs mt-1">⚠️ {errors.date}</p>}
            </div>

            {/* Guest counters */}
            <div>
              <label className="block text-sm font-bold text-brand-navy mb-2">👥 Group Size</label>
              <div className="space-y-3">
                <Counter label="Adults" sub="Age 12 and above" price={pricing.adult}
                  value={form.adults} min={1} max={40} onChange={v => upd('adults', v)} />
                <Counter label="Children" sub="Age 3 to 11" price={pricing.child}
                  value={form.children} min={0} max={20} onChange={v => upd('children', v)} />
                <Counter label="Infants" sub="Age 0 to 2 — Free" price={0}
                  value={form.infants} min={0} max={10} onChange={v => upd('infants', v)} />
              </div>
            </div>

            {/* Language preference */}
            <div>
              <label className="block text-sm font-bold text-brand-navy mb-2">🌍 Guide Language</label>
              <div className="flex flex-wrap gap-2">
                {(tour?.languages || ['English', 'Arabic']).map(lang => (
                  <button type="button" key={lang}
                    onClick={() => upd('language', lang)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
                      form.language === lang
                        ? 'border-brand-gold text-brand-navy'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                    style={form.language === lang ? { background:'linear-gradient(135deg,#D4AF37,#F0D060)' } : {}}>
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Hotel & flight */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1.5">🏨 Hotel Name</label>
                <input value={form.hotel} onChange={e => upd('hotel', e.target.value)}
                  placeholder="e.g. Burj Al Arab" className="input-field text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1.5">✈️ Flight No.</label>
                <input value={form.flightNo} onChange={e => upd('flightNo', e.target.value)}
                  placeholder="e.g. EK 204" className="input-field text-sm" />
              </div>
            </div>

            {/* Live price preview */}
            {(form.adults > 1 || form.children > 0) && (
              <div className="rounded-2xl p-4" style={{ background:'rgba(212,175,55,0.06)', border:'1px solid rgba(212,175,55,0.25)' }}>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Price Estimate</div>
                {form.adults > 0 && <SummaryRow label={`Adults × ${form.adults}`} value={`AED ${form.adults * pricing.adult}`} />}
                {form.children > 0 && <SummaryRow label={`Children × ${form.children}`} value={`AED ${form.children * pricing.child}`} />}
                {form.infants > 0 && <SummaryRow label={`Infants × ${form.infants}`} value="Free" gold />}
                <SummaryRow label="Subtotal" value={`AED ${subtotal.toLocaleString()}`} bold big />
              </div>
            )}
          </div>
        )}

        {/* ── STEP 2: Contact Info ─────────────────────────── */}
        {step === 2 && (
          <div className="space-y-4 animate-slide-up">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1.5">First Name <span className="text-red-500">*</span></label>
                <input value={form.firstName} onChange={e => upd('firstName', e.target.value)}
                  placeholder="John" className={`input-field ${errors.firstName ? 'border-red-400' : ''}`} />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">⚠️ {errors.firstName}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1.5">Last Name <span className="text-red-500">*</span></label>
                <input value={form.lastName} onChange={e => upd('lastName', e.target.value)}
                  placeholder="Smith" className={`input-field ${errors.lastName ? 'border-red-400' : ''}`} />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">⚠️ {errors.lastName}</p>}
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1.5">📧 Email Address <span className="text-red-500">*</span></label>
              <input type="email" value={form.email} onChange={e => upd('email', e.target.value)}
                placeholder="john@email.com" className={`input-field ${errors.email ? 'border-red-400' : ''}`} />
              {errors.email && <p className="text-red-500 text-xs mt-1">⚠️ {errors.email}</p>}
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1.5">📱 WhatsApp / Phone <span className="text-red-500">*</span></label>
              <input type="tel" value={form.phone} onChange={e => upd('phone', e.target.value)}
                placeholder="+971 xx xxx xxxx" className={`input-field ${errors.phone ? 'border-red-400' : ''}`} />
              {errors.phone && <p className="text-red-500 text-xs mt-1">⚠️ {errors.phone}</p>}
              <p className="text-xs text-gray-400 mt-1">We'll send your confirmation to this number</p>
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1.5">🌍 Country of Residence</label>
              <select value={form.country} onChange={e => upd('country', e.target.value)} className="input-field text-sm">
                <option value="">Select country...</option>
                {['United Arab Emirates','Saudi Arabia','United Kingdom','Russia','China','Germany','France','USA','Australia','India','Pakistan','Egypt','Jordan','Kuwait','Qatar','Bahrain','Oman','Other'].map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1.5">📝 Special Requests (optional)</label>
              <textarea value={form.notes} onChange={e => upd('notes', e.target.value)}
                rows={3} placeholder="Dietary requirements, celebrations, accessibility needs, special arrangements..."
                className="input-field resize-none text-sm" />
            </div>
          </div>
        )}

        {/* ── STEP 3: Add-ons (only if tour has them) ─────── */}
        {step === 3 && STEP_COUNT === 4 && (
          <div className="animate-slide-up">
            <p className="text-sm text-gray-500 mb-4">Enhance your experience with optional extras:</p>
            {tour?.addOns?.length > 0 ? (
              <div className="space-y-3">
                {tour.addOns.map(addon => (
                  <div key={addon.id}
                    onClick={() => toggleAddOn(addon.id)}
                    className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all select-none ${
                      form.addOns.includes(addon.id)
                        ? 'border-2 border-brand-gold bg-amber-50'
                        : 'border-2 border-gray-100 hover:border-amber-200 bg-white'
                    }`}>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{addon.emoji}</span>
                      <div>
                        <div className="font-bold text-brand-navy text-sm">{addon.name}</div>
                        <div className="text-xs text-gray-400">Per person × {form.adults} adults</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <div className="font-black text-brand-navy">AED {addon.price}</div>
                        <div className="text-xs text-gray-400">per person</div>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        form.addOns.includes(addon.id)
                          ? 'bg-brand-gold border-brand-gold'
                          : 'border-gray-300'
                      }`}>
                        {form.addOns.includes(addon.id) && (
                          <span className="text-brand-navy text-xs font-black">✓</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <div className="text-4xl mb-2">✨</div>
                <p>No add-ons for this tour.</p>
              </div>
            )}
          </div>
        )}

        {/* ── STEP: Confirmation (always last) ────────────── */}
        {((step === 3 && STEP_COUNT === 3) || (step === 4 && STEP_COUNT === 4)) && (
          <div className="animate-slide-up space-y-5">
            {/* Trip summary card */}
            <div className="rounded-2xl overflow-hidden" style={{ border:'2px solid rgba(212,175,55,0.3)' }}>
              <div className="px-4 py-3 flex items-center gap-2"
                style={{ background:'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
                <span className="text-lg">📋</span>
                <span className="text-white font-bold text-sm">Booking Summary</span>
              </div>
              <div className="p-4 space-y-1">
                <SummaryRow label="🗺️ Tour" value={tour?.name?.slice(0, 30) + (tour?.name?.length > 30 ? '…' : '')} />
                <SummaryRow label="📅 Date" value={form.date} />
                <SummaryRow label="🌍 Language" value={form.language} />
                <SummaryRow label="👤 Name" value={`${form.firstName} ${form.lastName}`} />
                <SummaryRow label="📱 Phone" value={form.phone} />
                {form.hotel && <SummaryRow label="🏨 Hotel" value={form.hotel} />}
                <div className="pt-2 mt-2 border-t border-gray-100 space-y-1">
                  {form.adults > 0   && <SummaryRow label={`Adults × ${form.adults}`}   value={`AED ${(form.adults * pricing.adult).toLocaleString()}`} />}
                  {form.children > 0 && <SummaryRow label={`Children × ${form.children}`} value={`AED ${(form.children * pricing.child).toLocaleString()}`} />}
                  {form.infants > 0  && <SummaryRow label={`Infants × ${form.infants}`} value="Free" gold />}
                  {form.addOns.map(id => {
                    const a = tour?.addOns?.find(x => x.id === id);
                    return a ? <SummaryRow key={id} label={`${a.emoji} ${a.name}`} value={`AED ${a.price * form.adults}`} gold /> : null;
                  })}
                  <SummaryRow label="Total" value={`AED ${total.toLocaleString()}`} bold big />
                </div>
              </div>
            </div>

            {/* Confirmation notice */}
            <div className="rounded-2xl p-4 text-sm text-center"
              style={{ background:'rgba(37,211,102,0.06)', border:'1px solid rgba(37,211,102,0.25)' }}>
              <p className="text-gray-600">
                Clicking <strong>"Confirm & Book"</strong> will open{' '}
                <span className="text-emerald-600 font-bold">WhatsApp</span> with your booking details.
                Our team confirms within <strong>30 minutes</strong>. 🌟
              </p>
            </div>

            {/* Cancellation policy */}
            <div className="flex items-start gap-2 p-3 rounded-xl bg-blue-50 text-xs text-blue-700">
              <span className="shrink-0 mt-0.5">🔄</span>
              <span>{tour?.cancellation || 'Free cancellation up to 24 hours before the tour'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer navigation */}
      <div className="px-6 pb-6 pt-2 border-t border-gray-100">
        <div className="flex gap-3">
          {step > 1 && (
            <button type="button" onClick={back}
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm border-2 border-gray-200 text-gray-600 hover:border-gray-300 transition-all">
              ← Back
            </button>
          )}
          {step < STEP_COUNT ? (
            <button type="button" onClick={next}
              className="btn-gold flex-1 justify-center py-3.5 text-base font-bold">
              Continue →
            </button>
          ) : (
            <button type="button" onClick={handleSubmit}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-base transition-all hover:opacity-90"
              style={{ background:'linear-gradient(135deg,#25D366,#1DA855)', boxShadow:'0 4px 20px rgba(37,211,102,0.4)' }}>
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Confirm & Book on WhatsApp
            </button>
          )}
        </div>

        {/* Trust bar */}
        <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
          {['🔒 Secure', '⚡ Instant Confirm', '🔄 Free Cancel', '🏨 Hotel Pickup'].map(b => (
            <span key={b} className="text-[11px] text-gray-400 font-medium">{b}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
