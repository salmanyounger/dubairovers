'use client';
import { useState, useMemo } from 'react';

// ─── Tour-category time slots ─────────────────────────────────────
const TIME_SLOTS = {
  'desert-safari':   ['15:00 — 3pm Pickup', '15:30 — 3:30pm Pickup', '16:00 — 4pm Pickup'],
  'overnight-safari':['15:00 — 3pm Pickup', '15:30 — 3:30pm Pickup'],
  'city-tours':      ['08:00 — Morning', '09:00 — Mid-morning', '14:00 — Afternoon'],
  'abu-dhabi-tours': ['07:30 — Early Morning', '08:00 — Morning', '13:00 — Afternoon'],
  'helicopter-tours':['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00'],
  'dhow-cruise':     ['19:30 — Sunset Dinner', '20:00 — Evening Dinner', '20:30 — Late Dinner'],
  'water-tours':     ['08:00 — Morning', '09:00 — Late Morning', '13:00 — Afternoon'],
  'theme-parks':     ['09:00 — Opening', '10:00 — Mid-morning', '14:00 — Afternoon'],
  'default':         ['08:00 — Morning', '10:00 — Mid-morning', '14:00 — Afternoon', '17:00 — Evening'],
};

// ─── Tour-category-specific extra fields ─────────────────────────
function CategoryExtras({ cat, form, upd }) {
  if (cat === 'desert-safari' || cat === 'overnight-safari') return (
    <div className="space-y-3">
      <FieldLabel icon="🍽️" label="Meal Preference" />
      <div className="grid grid-cols-3 gap-2">
        {['Standard', 'Vegetarian', 'Vegan'].map(opt => (
          <button type="button" key={opt} onClick={() => upd('meal', opt)}
            className={`py-2 px-2 rounded-xl text-xs font-bold border-2 transition-all ${
              form.meal === opt ? 'border-brand-gold bg-amber-50 text-brand-navy' : 'border-gray-200 text-gray-500'
            }`}>
            {opt === 'Standard' ? '🥩' : opt === 'Vegetarian' ? '🥗' : '🌱'} {opt}
          </button>
        ))}
      </div>
      <FieldLabel icon="🏨" label="Hotel Name (for pickup)" required />
      <input value={form.hotel || ''} onChange={e => upd('hotel', e.target.value)}
        placeholder="e.g. JBR Beach Hotel" className="booking-input" />
    </div>
  );

  if (cat === 'helicopter-tours') return (
    <div className="space-y-3">
      <div className="rounded-xl p-3 text-xs text-amber-700 font-medium" style={{ background: '#FFFBEB', border: '1px solid #FDE68A' }}>
        ⚖️ <strong>Weight limit:</strong> Each passenger must be under 120kg. All passengers are weighed before boarding.
      </div>
      <FieldLabel icon="✈️" label="Flight Duration" />
      <div className="grid grid-cols-2 gap-2">
        {[['12 min', '699'], ['22 min', '1,099'], ['40 min', '1,799']].map(([dur, price]) => (
          <button type="button" key={dur} onClick={() => upd('flightDuration', dur)}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold border-2 transition-all ${
              form.flightDuration === dur ? 'border-brand-gold bg-amber-50 text-brand-navy' : 'border-gray-200 text-gray-500'
            }`}>
            🚁 {dur} <span className="block text-[10px] font-normal mt-0.5">AED {price}/p</span>
          </button>
        ))}
      </div>
      <FieldLabel icon="🏨" label="Hotel Pickup" />
      <input value={form.hotel || ''} onChange={e => upd('hotel', e.target.value)}
        placeholder="e.g. Atlantis The Palm" className="booking-input" />
    </div>
  );

  if (cat === 'dhow-cruise') return (
    <div className="space-y-3">
      <FieldLabel icon="🍽️" label="Meal Type" />
      <div className="grid grid-cols-2 gap-2">
        {[['Dinner Cruise', '🍽️'], ['Cocktail Only', '🥂'], ['Veg Menu', '🥗'], ['Kids Meal', '🧒']].map(([opt, ico]) => (
          <button type="button" key={opt} onClick={() => upd('meal', opt)}
            className={`py-2 px-3 rounded-xl text-xs font-bold border-2 transition-all ${
              form.meal === opt ? 'border-brand-gold bg-amber-50 text-brand-navy' : 'border-gray-200 text-gray-500'
            }`}>
            {ico} {opt}
          </button>
        ))}
      </div>
      <FieldLabel icon="📍" label="Boarding Point" />
      <select value={form.meetingPoint || ''} onChange={e => upd('meetingPoint', e.target.value)} className="booking-input text-sm">
        <option value="">Select marina...</option>
        <option>Dubai Marina Walk — Near Pier 7</option>
        <option>JBR The Walk — Boardwalk Entrance</option>
        <option>Dubai Creek — Heritage Area</option>
        <option>Hotel Pickup (add AED 50)</option>
      </select>
    </div>
  );

  if (cat === 'water-tours') return (
    <div className="space-y-3">
      <FieldLabel icon="📍" label="Meeting Point" />
      <select value={form.meetingPoint || ''} onChange={e => upd('meetingPoint', e.target.value)} className="booking-input text-sm">
        <option value="">Select location...</option>
        <option>Dubai Marina — Pier 7</option>
        <option>JBR Beach — Water Sports Centre</option>
        <option>Palm Jumeirah — Nakheel Harbour</option>
        <option>Hotel Pickup (+AED 50)</option>
      </select>
      <div className="rounded-xl p-3 text-xs text-blue-700 font-medium" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE' }}>
        🌤️ Tours run subject to weather conditions. Full refund if cancelled due to adverse weather.
      </div>
    </div>
  );

  if (cat === 'city-tours' || cat === 'abu-dhabi-tours') return (
    <div className="space-y-3">
      <FieldLabel icon="🏨" label="Hotel Name (for pickup)" required />
      <input value={form.hotel || ''} onChange={e => upd('hotel', e.target.value)}
        placeholder="e.g. Burj Al Arab, Marina Hotel..." className="booking-input" />
      <FieldLabel icon="🌍" label="Preferred Language" />
      <div className="flex flex-wrap gap-2">
        {['English', 'Arabic', 'Russian', 'Chinese'].map(lang => (
          <button type="button" key={lang} onClick={() => upd('language', lang)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${
              form.language === lang ? 'border-brand-gold bg-amber-50 text-brand-navy' : 'border-gray-200 text-gray-500'
            }`}>
            {lang}
          </button>
        ))}
      </div>
    </div>
  );

  // Default extras
  return (
    <div className="space-y-3">
      <FieldLabel icon="🏨" label="Hotel / Meeting Point" />
      <input value={form.hotel || ''} onChange={e => upd('hotel', e.target.value)}
        placeholder="Hotel name or area in Dubai" className="booking-input" />
    </div>
  );
}

function FieldLabel({ icon, label, required }) {
  return (
    <label className="flex items-center gap-1.5 text-xs font-bold text-gray-600 uppercase tracking-wide">
      <span>{icon}</span> {label}
      {required && <span className="text-red-500">*</span>}
    </label>
  );
}

function GuestRow({ label, sub, price, value, min = 0, max = 20, onChange, currency }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
      <div className="flex-1">
        <div className="text-sm font-bold text-brand-navy">{label}</div>
        <div className="text-[11px] text-gray-400">{sub}</div>
        {price > 0 && (
          <div className="text-[11px] font-bold text-brand-gold mt-0.5">
            {currency || 'AED'} {price.toLocaleString('en-US')} / person
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min}
          className="w-8 h-8 rounded-full border-2 border-gray-200 flex items-center justify-center font-bold text-base text-brand-navy disabled:opacity-25 hover:border-brand-gold hover:text-brand-gold transition-all">
          −
        </button>
        <span className="w-5 text-center font-black text-brand-navy">{value}</span>
        <button type="button" onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max}
          className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-base text-white disabled:opacity-25"
          style={{ background: 'linear-gradient(135deg,#D4AF37,#F0D060)' }}>
          +
        </button>
      </div>
    </div>
  );
}

// ─── Main Booking Sidebar ─────────────────────────────────────────
export default function BookingSidebar({ tour }) {
  const [step, setStep] = useState(1); // 1=Date+Guests, 2=Details, 3=Confirm
  const [form, setForm] = useState({
    date: '', time: '',
    adults: 1, children: 0, infants: 0,
    firstName: '', lastName: '', email: '', phone: '',
    country: '', hotel: '', notes: '', meal: 'Standard',
    language: 'English', meetingPoint: '', flightDuration: '12 min',
    addOns: [], promoCode: '', promoApplied: false,
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [promoInput, setPromoInput] = useState('');

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const cat = tour?.category || 'default';
  const slots = TIME_SLOTS[cat] || TIME_SLOTS.default;
  const pricing = tour?.pricing || { adult: 299, child: 149, infant: 0 };

  const subtotal = (form.adults * (pricing.adult || 0)) + (form.children * (pricing.child || 0));
  const addOnTotal = form.addOns.reduce((sum, id) => {
    const a = tour?.addOns?.find(x => x.id === id);
    return sum + (a ? a.price * (form.adults || 1) : 0);
  }, 0);
  const discount = form.promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal + addOnTotal - discount;

  const toggleAddOn = id => setForm(f => ({
    ...f, addOns: f.addOns.includes(id) ? f.addOns.filter(x => x !== id) : [...f.addOns, id]
  }));

  const applyPromo = () => {
    if (promoInput.toUpperCase() === 'ROVERS10') {
      upd('promoApplied', true);
      upd('promoCode', 'ROVERS10');
    } else {
      setErrors(e => ({ ...e, promo: 'Invalid promo code' }));
    }
  };

  const validate = s => {
    const e = {};
    if (s === 1) {
      if (!form.date) e.date = 'Please select a date';
      if (!form.time) e.time = 'Please select a time slot';
    }
    if (s === 2) {
      if (!form.firstName?.trim()) e.firstName = 'Required';
      if (!form.lastName?.trim()) e.lastName = 'Required';
      if (!form.phone?.trim()) e.phone = 'WhatsApp number required';
      if (!form.email?.trim() || !form.email.includes('@')) e.email = 'Valid email required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => { if (validate(step)) setStep(s => s + 1); };
  const handleBack = () => { setErrors({}); setStep(s => s - 1); };

  const handleBook = () => {
    const addOnLines = form.addOns.map(id => {
      const a = tour?.addOns?.find(x => x.id === id);
      return a ? `  • ${a.emoji} ${a.name} × ${form.adults} = AED ${a.price * form.adults}` : '';
    }).filter(Boolean);

    const msg = [
      `🌟 *New Booking — DubaiRovers*`,
      ``,
      `📍 *Tour:* ${tour?.name}`,
      `📅 *Date:* ${form.date}`,
      `⏰ *Time:* ${form.time}`,
      ``,
      `👥 *Guests:*`,
      `  • Adults: ${form.adults} × AED ${pricing.adult} = AED ${(form.adults * pricing.adult).toLocaleString('en-US')}`,
      form.children > 0 ? `  • Children: ${form.children} × AED ${pricing.child} = AED ${(form.children * pricing.child).toLocaleString('en-US')}` : null,
      form.infants > 0  ? `  • Infants: ${form.infants} (Free)` : null,
      ``,
      `👤 *Contact:*`,
      `  • Name: ${form.firstName} ${form.lastName}`,
      `  • WhatsApp: ${form.phone}`,
      `  • Email: ${form.email}`,
      form.country ? `  • Country: ${form.country}` : null,
      form.hotel ? `  • Hotel/Pickup: ${form.hotel}` : null,
      form.meetingPoint ? `  • Meeting Point: ${form.meetingPoint}` : null,
      `  • Language: ${form.language}`,
      cat === 'desert-safari' || cat === 'dhow-cruise' ? `  • Meal Preference: ${form.meal}` : null,
      cat === 'helicopter-tours' ? `  • Flight Duration: ${form.flightDuration}` : null,
      ``,
      addOnLines.length ? `✨ *Add-ons:*\n${addOnLines.join('\n')}` : null,
      form.promoApplied ? `🏷️ *Promo: ${form.promoCode}* (−AED ${discount.toLocaleString('en-US')})` : null,
      form.notes ? `📝 *Notes:* ${form.notes}` : null,
      ``,
      `━━━━━━━━━━━━━━━━━━━━`,
      `💰 *TOTAL: AED ${total.toLocaleString('en-US')}*`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `_Submitted via DubaiRovers.com_`,
    ].filter(x => x !== null).join('\n');

    window.open(`https://wa.me/971544735060?text=${encodeURIComponent(msg)}`, '_blank');
    setSubmitted(true);
  };

  // ── Step dots ───────────────────────────────────────────────────
  const STEPS = ['Date & Guests', 'Your Details', 'Confirm'];

  // ── Success screen ──────────────────────────────────────────────
  if (submitted) return (
    <div className="rounded-3xl overflow-hidden" style={{ boxShadow: '0 8px 48px rgba(10,22,40,0.15)', border: '1px solid rgba(212,175,55,0.25)' }}>
      <div className="p-6 text-center">
        <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl"
          style={{ background: 'linear-gradient(135deg,#10B981,#059669)', boxShadow: '0 8px 24px rgba(16,185,129,0.35)' }}>
          ✓
        </div>
        <h3 className="text-lg font-black text-brand-navy mb-1" style={{ fontFamily: "'Playfair Display',serif" }}>
          Request Sent! 🎉
        </h3>
        <p className="text-sm text-gray-500 mb-4">Our team confirms within <strong className="text-brand-gold">30 minutes</strong> on WhatsApp.</p>
        <div className="rounded-2xl p-4 text-left text-xs space-y-1.5 mb-4" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
          <div className="flex justify-between"><span className="text-gray-400">Tour</span><span className="font-bold text-brand-navy">{tour?.name?.slice(0, 28)}{tour?.name?.length > 28 ? '…' : ''}</span></div>
          <div className="flex justify-between"><span className="text-gray-400">Date</span><span className="font-bold">{form.date} · {form.time?.split(' — ')[0]}</span></div>
          <div className="flex justify-between"><span className="text-gray-400">Guests</span><span className="font-bold">{form.adults + form.children} people</span></div>
          <div className="flex justify-between border-t border-gray-200 pt-1.5 mt-1.5"><span className="text-gray-600 font-bold">Total</span><span className="font-black text-brand-gold">AED {total.toLocaleString('en-US')}</span></div>
        </div>
        <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-white font-bold text-sm"
          style={{ background: '#25D366' }}>
          💬 Track on WhatsApp
        </a>
        <button onClick={() => { setSubmitted(false); setStep(1); setForm(f => ({ ...f, date: '', time: '' })); }}
          className="mt-2 text-xs text-gray-400 hover:text-brand-gold transition-colors w-full text-center">
          Book another date →
        </button>
      </div>
    </div>
  );

  return (
    <div className="rounded-3xl overflow-hidden" style={{ boxShadow: '0 8px 48px rgba(10,22,40,0.15)', border: '1px solid rgba(212,175,55,0.25)' }}>

      {/* ── Price Header ── */}
      <div className="px-6 pt-5 pb-4" style={{ background: 'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-white/50 text-xs font-semibold uppercase tracking-wide mb-0.5">From</div>
            <div className="text-4xl font-black text-brand-gold leading-none">
              AED {pricing.adult?.toLocaleString('en-US')}
            </div>
            <div className="text-white/50 text-xs mt-1">per adult · includes all taxes</div>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end gap-1 mb-1">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className={`w-3.5 h-3.5 ${i <= Math.round(tour?.rating || 5) ? 'text-amber-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <div className="text-white/60 text-xs">{tour?.rating} · {tour?.reviewCount?.toLocaleString('en-US')} reviews</div>
          </div>
        </div>

        {/* Step dots */}
        <div className="flex items-center mt-4 gap-0">
          {STEPS.map((label, i) => {
            const n = i + 1;
            const done = step > n;
            const active = step === n;
            return (
              <div key={n} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                    done ? 'bg-emerald-500 text-white' :
                    active ? 'text-brand-navy' :
                    'bg-white/10 text-white/40'
                  }`} style={active ? { background: 'linear-gradient(135deg,#D4AF37,#F0D060)' } : {}}>
                    {done ? '✓' : n}
                  </div>
                  <span className={`text-[9px] font-bold mt-1 whitespace-nowrap ${
                    done ? 'text-emerald-400' : active ? 'text-brand-gold' : 'text-white/30'
                  }`}>{label}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-px mx-1.5 mb-3.5 ${done ? 'bg-emerald-400' : 'bg-white/15'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Form Body ── */}
      <div className="p-5 bg-white">

        {/* ════ STEP 1: Date · Time · Guests ══════════════════════ */}
        {step === 1 && (
          <div className="space-y-5">

            {/* Date picker */}
            <div>
              <FieldLabel icon="📅" label="Select Date" required />
              <input type="date" value={form.date} onChange={e => upd('date', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className={`booking-input mt-1.5 ${errors.date ? 'border-red-400 bg-red-50' : ''}`} />
              {errors.date && <p className="text-red-500 text-[11px] mt-1 font-semibold">⚠️ {errors.date}</p>}
            </div>

            {/* Time slots */}
            <div>
              <FieldLabel icon="⏰" label="Select Time Slot" required />
              <div className="grid grid-cols-1 gap-2 mt-1.5">
                {slots.map(slot => (
                  <button type="button" key={slot} onClick={() => upd('time', slot)}
                    className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold text-left border-2 transition-all flex items-center justify-between ${
                      form.time === slot
                        ? 'border-brand-gold bg-amber-50 text-brand-navy'
                        : 'border-gray-100 text-gray-600 hover:border-amber-200 bg-gray-50'
                    }`}>
                    <span>🕐 {slot}</span>
                    {form.time === slot && <span className="text-brand-gold">✓</span>}
                  </button>
                ))}
              </div>
              {errors.time && <p className="text-red-500 text-[11px] mt-1 font-semibold">⚠️ {errors.time}</p>}
            </div>

            {/* Guest counters */}
            <div>
              <FieldLabel icon="👥" label="Guests" />
              <div className="rounded-2xl border-2 border-gray-100 overflow-hidden mt-1.5">
                <GuestRow label="Adults" sub="Age 13 and above" price={pricing.adult}
                  value={form.adults} min={1} max={tour?.groupSize?.max || 40} onChange={v => upd('adults', v)} />
                <GuestRow label="Children" sub="Age 3–12 years" price={pricing.child || Math.round(pricing.adult * 0.6)}
                  value={form.children} min={0} max={20} onChange={v => upd('children', v)} />
                <GuestRow label="Infants" sub="Under 3 — Free" price={0}
                  value={form.infants} min={0} max={5} onChange={v => upd('infants', v)} />
              </div>
            </div>

            {/* Category-specific fields */}
            <CategoryExtras cat={cat} form={form} upd={upd} />

            {/* Live price */}
            <div className="rounded-2xl p-4 mt-1" style={{ background: 'linear-gradient(135deg,rgba(212,175,55,0.06),rgba(212,175,55,0.12))', border: '1px solid rgba(212,175,55,0.3)' }}>
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-wider mb-2">Price Estimate</div>
              <div className="space-y-1">
                {form.adults > 0 && (
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Adults × {form.adults}</span>
                    <span className="font-bold">AED {(form.adults * pricing.adult).toLocaleString('en-US')}</span>
                  </div>
                )}
                {form.children > 0 && (
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Children × {form.children}</span>
                    <span className="font-bold">AED {(form.children * (pricing.child || 0)).toLocaleString('en-US')}</span>
                  </div>
                )}
                {form.infants > 0 && (
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Infants × {form.infants}</span>
                    <span className="font-bold text-emerald-500">Free</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-amber-200">
                <span className="text-sm font-black text-brand-navy">Estimated Total</span>
                <span className="text-xl font-black text-brand-navy">AED {subtotal.toLocaleString('en-US')}</span>
              </div>
            </div>
          </div>
        )}

        {/* ════ STEP 2: Contact Details ════════════════════════════ */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel icon="👤" label="First Name" required />
                <input value={form.firstName} onChange={e => upd('firstName', e.target.value)}
                  placeholder="John" className={`booking-input mt-1.5 ${errors.firstName ? 'border-red-400 bg-red-50' : ''}`} />
                {errors.firstName && <p className="text-red-500 text-[11px] mt-1 font-semibold">⚠️ {errors.firstName}</p>}
              </div>
              <div>
                <FieldLabel icon="" label="Last Name" required />
                <input value={form.lastName} onChange={e => upd('lastName', e.target.value)}
                  placeholder="Smith" className={`booking-input mt-1.5 ${errors.lastName ? 'border-red-400 bg-red-50' : ''}`} />
                {errors.lastName && <p className="text-red-500 text-[11px] mt-1 font-semibold">⚠️ {errors.lastName}</p>}
              </div>
            </div>

            <div>
              <FieldLabel icon="📱" label="WhatsApp Number" required />
              <div className="flex gap-2 mt-1.5">
                <select className="booking-input w-20 text-xs shrink-0 px-2">
                  <option>+971</option><option>+44</option><option>+1</option><option>+7</option>
                  <option>+966</option><option>+91</option><option>+92</option><option>+20</option>
                </select>
                <input type="tel" value={form.phone} onChange={e => upd('phone', e.target.value)}
                  placeholder="50 123 4567" className={`booking-input flex-1 ${errors.phone ? 'border-red-400 bg-red-50' : ''}`} />
              </div>
              {errors.phone && <p className="text-red-500 text-[11px] mt-1 font-semibold">⚠️ {errors.phone}</p>}
              <p className="text-[11px] text-gray-400 mt-1">📲 Confirmation sent to this number</p>
            </div>

            <div>
              <FieldLabel icon="📧" label="Email Address" required />
              <input type="email" value={form.email} onChange={e => upd('email', e.target.value)}
                placeholder="john@email.com" className={`booking-input mt-1.5 ${errors.email ? 'border-red-400 bg-red-50' : ''}`} />
              {errors.email && <p className="text-red-500 text-[11px] mt-1 font-semibold">⚠️ {errors.email}</p>}
            </div>

            <div>
              <FieldLabel icon="🌍" label="Country" />
              <select value={form.country} onChange={e => upd('country', e.target.value)} className="booking-input mt-1.5 text-sm">
                <option value="">Select your country...</option>
                {['UAE','Saudi Arabia','United Kingdom','Russia','China','Germany','France','USA','Australia','India','Pakistan','Egypt','Jordan','Kuwait','Qatar','Bahrain','Oman','Italy','Spain','Other'].map(c => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Add-ons if any */}
            {tour?.addOns?.length > 0 && (
              <div>
                <FieldLabel icon="✨" label="Optional Add-ons" />
                <div className="space-y-2 mt-1.5">
                  {tour.addOns.map(addon => (
                    <div key={addon.id} onClick={() => toggleAddOn(addon.id)}
                      className={`flex items-center justify-between p-3 rounded-xl cursor-pointer select-none transition-all border-2 ${
                        form.addOns.includes(addon.id)
                          ? 'border-brand-gold bg-amber-50'
                          : 'border-gray-100 hover:border-amber-200 bg-gray-50'
                      }`}>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{addon.emoji}</span>
                        <div>
                          <div className="text-xs font-bold text-brand-navy">{addon.name}</div>
                          <div className="text-[10px] text-gray-400">+AED {addon.price} × {form.adults} adults</div>
                        </div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-black transition-all ${
                        form.addOns.includes(addon.id) ? 'border-brand-gold bg-brand-gold text-white' : 'border-gray-300'
                      }`}>
                        {form.addOns.includes(addon.id) ? '✓' : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notes */}
            <div>
              <FieldLabel icon="📝" label="Special Requests" />
              <textarea value={form.notes} onChange={e => upd('notes', e.target.value)}
                rows={2} placeholder="Dietary needs, birthday celebrations, accessibility requirements..."
                className="booking-input mt-1.5 resize-none text-sm" />
            </div>
          </div>
        )}

        {/* ════ STEP 3: Confirm & Pay ══════════════════════════════ */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-black text-brand-navy text-sm" style={{ fontFamily: "'Playfair Display',serif" }}>
              Review Your Booking
            </h3>

            {/* Booking summary card */}
            <div className="rounded-2xl overflow-hidden border border-gray-100">
              <div className="px-4 py-3 text-xs font-black text-white uppercase tracking-wide" style={{ background: 'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
                📋 Booking Summary
              </div>
              <div className="p-4 space-y-2 text-xs">
                <SummaryLine label="Tour" value={tour?.name?.slice(0, 35) + (tour?.name?.length > 35 ? '…' : '')} />
                <SummaryLine label="Date" value={form.date} />
                <SummaryLine label="Time" value={form.time?.split(' — ')[0]} />
                <SummaryLine label="Guests" value={`${form.adults} adult${form.adults > 1 ? 's' : ''}${form.children > 0 ? ` · ${form.children} child${form.children > 1 ? 'ren' : ''}` : ''}${form.infants > 0 ? ` · ${form.infants} infant${form.infants > 1 ? 's' : ''}` : ''}`} />
                {form.hotel && <SummaryLine label="Pickup" value={form.hotel} />}
                {form.meetingPoint && <SummaryLine label="Meeting Point" value={form.meetingPoint} />}
                {(cat === 'desert-safari' || cat === 'dhow-cruise') && <SummaryLine label="Meal" value={form.meal} />}
                <SummaryLine label="Contact" value={`${form.firstName} ${form.lastName} · ${form.phone}`} />
              </div>
            </div>

            {/* Price breakdown */}
            <div className="rounded-2xl border border-gray-100 overflow-hidden">
              <div className="px-4 py-3 text-xs font-black text-white uppercase tracking-wide" style={{ background: 'linear-gradient(135deg,#0A1628,#1E3A5F)' }}>
                💰 Price Breakdown
              </div>
              <div className="p-4 space-y-2">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Adults × {form.adults}</span>
                  <span className="font-bold">AED {(form.adults * pricing.adult).toLocaleString('en-US')}</span>
                </div>
                {form.children > 0 && (
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Children × {form.children}</span>
                    <span className="font-bold">AED {(form.children * (pricing.child || 0)).toLocaleString('en-US')}</span>
                  </div>
                )}
                {form.infants > 0 && (
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Infants × {form.infants}</span>
                    <span className="font-bold text-emerald-500">Free</span>
                  </div>
                )}
                {addOnTotal > 0 && (
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Add-ons</span>
                    <span className="font-bold">+AED {addOnTotal.toLocaleString('en-US')}</span>
                  </div>
                )}
                {discount > 0 && (
                  <div className="flex justify-between text-xs text-emerald-600 font-bold">
                    <span>🏷️ Promo ROVERS10</span>
                    <span>−AED {discount.toLocaleString('en-US')}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-3 mt-1 border-t-2 border-gray-100">
                  <span className="font-black text-brand-navy">TOTAL</span>
                  <span className="text-2xl font-black text-brand-navy">AED {total.toLocaleString('en-US')}</span>
                </div>
              </div>
            </div>

            {/* Promo code */}
            {!form.promoApplied && (
              <div>
                <FieldLabel icon="🏷️" label="Promo Code" />
                <div className="flex gap-2 mt-1.5">
                  <input value={promoInput} onChange={e => { setPromoInput(e.target.value); setErrors(err => ({ ...err, promo: null })); }}
                    placeholder="Enter code..." className="booking-input flex-1 uppercase text-sm tracking-widest font-bold" />
                  <button type="button" onClick={applyPromo}
                    className="px-4 py-2 rounded-xl text-xs font-black text-brand-navy border-2 border-brand-gold hover:bg-amber-50 transition-all whitespace-nowrap">
                    Apply
                  </button>
                </div>
                {errors.promo && <p className="text-red-500 text-[11px] mt-1 font-semibold">⚠️ {errors.promo}</p>}
                <p className="text-[10px] text-gray-400 mt-1">Try: ROVERS10 for 10% off</p>
              </div>
            )}
            {form.promoApplied && (
              <div className="rounded-xl p-3 flex items-center gap-2 text-xs font-bold text-emerald-700" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
                ✅ Promo ROVERS10 applied — AED {discount.toLocaleString('en-US')} saved!
              </div>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-500">
              {[['🔒', 'Secure Booking'],['⚡', 'Instant Confirmation'],['🔄', 'Free Cancellation 24h'],['🏨', 'Free Hotel Pickup']].map(([ico, txt]) => (
                <div key={txt} className="flex items-center gap-1.5 p-2 rounded-lg bg-gray-50">
                  <span>{ico}</span><span className="font-semibold">{txt}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Footer Buttons ── */}
      <div className="px-5 pb-5 bg-white space-y-2">
        {step < 3 ? (
          <>
            <button type="button" onClick={handleNext}
              className="w-full py-4 rounded-2xl font-black text-brand-navy text-base transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg,#D4AF37,#F0D060)', boxShadow: '0 4px 20px rgba(212,175,55,0.45)' }}>
              {step === 1 ? '👥 Continue to Your Details →' : '📋 Review My Booking →'}
            </button>
            {step > 1 && (
              <button type="button" onClick={handleBack}
                className="w-full py-2.5 rounded-2xl text-sm font-semibold text-gray-500 border border-gray-200 hover:border-gray-300 transition-all">
                ← Back
              </button>
            )}
          </>
        ) : (
          <>
            <button type="button" onClick={handleBook}
              className="w-full py-4 rounded-2xl font-black text-white text-base transition-all hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2"
              style={{ background: '#25D366', boxShadow: '0 4px 20px rgba(37,211,102,0.4)' }}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Confirm & Book on WhatsApp
            </button>
            <button type="button" onClick={handleBack}
              className="w-full py-2.5 rounded-2xl text-sm font-semibold text-gray-500 border border-gray-200 hover:border-gray-300 transition-all">
              ← Edit Details
            </button>
          </>
        )}

        {/* Payment info */}
        <p className="text-center text-[10px] text-gray-400">
          🔒 No payment now · Pay securely on confirmation · {tour?.cancellation?.split('up to')[0] || 'Free cancellation 24h'}
        </p>
      </div>
    </div>
  );
}

function SummaryLine({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex gap-2">
      <span className="text-gray-400 shrink-0 w-20">{label}</span>
      <span className="font-semibold text-brand-navy flex-1">{value}</span>
    </div>
  );
}
