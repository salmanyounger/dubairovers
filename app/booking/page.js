"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllTours, getTourPackages } from "../data/tours";

export default function Booking() {
  const [step, setStep] = useState(1);
  const [tourId, setTourId] = useState("");
  const [pkgId, setPkgId] = useState("");
  const [date, setDate] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [hotel, setHotel] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [occasion, setOccasion] = useState("");
  const [specialReq, setSpecialReq] = useState("");
  const [booked, setBooked] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [countdown, setCountdown] = useState(899);

  const tours = getAllTours();
  const packages = tourId ? getTourPackages(tourId) : [];
  const pkgData = packages.find(p => p.id === pkgId);
  const tourData = tours.find(t => t.id === tourId);
  const totalGuests = adults + children;
  const total = pkgData ? pkgData.price.AED * adults + Math.round(pkgData.price.AED * 0.5) * children : 0;

  // SEO
  useEffect(() => {
    document.title = "Book a Dubai Tour | DubaiRovers.com — Instant WhatsApp Confirmation";
    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
      el.content = content;
    };
    setMeta("description", "Book your Dubai desert safari, quad bike, dhow cruise, hot air balloon or city tour. Instant WhatsApp confirmation. Free cancellation 24h.");
  }, []);

  // Countdown timer
  useEffect(() => {
    const t = setInterval(() => setCountdown(c => c <= 0 ? 899 : c - 1), 1000);
    return () => clearInterval(t);
  }, []);

  const formatCountdown = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const generateRef = () => "DR" + Math.floor(100000 + Math.random() * 900000);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ref = generateRef();
    setBookingRef(ref);
    const extras = [
      hotel ? `🏨 Hotel Pickup: ${hotel}` : "",
      occasion && occasion !== "None" ? `🎉 Occasion: ${occasion}` : "",
      specialReq ? `💬 Special Requests: ${specialReq}` : "",
    ].filter(Boolean).join("\n");

    const msg = encodeURIComponent(
`🏔️ *NEW BOOKING — DubaiRovers.com*
📋 *Ref:* #${ref}

🏜️ *Tour:* ${tourData?.title}
📦 *Package:* ${pkgData?.title}
📅 *Date:* ${date || "Flexible — please advise"}
👥 *Adults:* ${adults} | *Children:* ${children}
💰 *Total:* AED ${total}

👤 *Name:* ${name}
📞 *WhatsApp:* ${phone}
✉️ *Email:* ${email || "N/A"}
${extras ? `\n${extras}` : ""}

✅ Please confirm availability within 5 minutes!
_Booked via DubaiRovers.com_`
    );
    window.open(`https://wa.me/971544735060?text=${msg}`, "_blank");
    setBooked(true);
  };

  // ── Confirmation screen ───────────────────────────────────────────────────
  if (booked) return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{fontFamily:"system-ui,sans-serif"}}>
      <style>{`
        @keyframes pop-in{0%{transform:scale(0);opacity:0}70%{transform:scale(1.2)}100%{transform:scale(1);opacity:1}}
        @keyframes fade-up{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes check-draw{to{stroke-dashoffset:0}}
        @keyframes heartbeat{0%,100%{transform:scale(1)}14%{transform:scale(1.3)}28%{transform:scale(1)}42%{transform:scale(1.2)}70%{transform:scale(1)}}
        @keyframes confetti-fall{0%{transform:translateY(-20px) rotate(0deg);opacity:1}100%{transform:translateY(100vh) rotate(720deg);opacity:0}}
      `}</style>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏜️</span>
            <span className="font-black text-xl bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">DubaiRovers</span>
          </Link>
        </div>
      </nav>
      <div className="max-w-lg mx-auto px-4 pt-28 pb-16">

        {/* Confetti dots */}
        <div style={{position:"fixed",inset:0,pointerEvents:"none",overflow:"hidden"}}>
          {["🎉","✨","🌟","🏜️","🎈","⭐"].map((em, i) => (
            <div key={i} style={{
              position:"absolute",left:`${10+i*15}%`,top:"-20px",
              fontSize:"24px",animation:`confetti-fall ${2+i*0.3}s ease-in ${i*0.2}s forwards`,
            }}>{em}</div>
          ))}
        </div>

        <div style={{animation:"fade-up 0.6s ease-out both"}}>
          {/* Big checkmark */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4" style={{animation:"pop-in 0.6s cubic-bezier(0.34,1.56,0.64,1) both"}}>
              <svg viewBox="0 0 96 96" fill="none">
                <circle cx="48" cy="48" r="46" fill="rgba(34,197,94,0.15)" stroke="#22c55e" strokeWidth="2"/>
                <path d="M28 48l14 16 26-28" stroke="#22c55e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
                  strokeDasharray="60" strokeDashoffset="60" style={{animation:"check-draw 0.6s ease-out 0.4s forwards"}}/>
              </svg>
            </div>
            <h1 className="text-3xl font-black text-white mb-2" style={{animation:"fade-up 0.5s ease-out 0.3s both"}}>Booking Confirmed! 🎉</h1>
            <p className="text-gray-400" style={{animation:"fade-up 0.5s ease-out 0.4s both"}}>
              Your WhatsApp just opened with your booking details. We confirm within 5 minutes!
            </p>
          </div>

          {/* Booking reference */}
          <div className="bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/30 rounded-2xl p-5 text-center mb-6"
            style={{animation:"fade-up 0.5s ease-out 0.5s both"}}>
            <div className="text-gray-400 text-sm mb-1">Your Booking Reference</div>
            <div className="text-3xl font-black text-white tracking-wider">#{bookingRef}</div>
            <div className="text-gray-500 text-xs mt-1">Share this with our team on WhatsApp</div>
          </div>

          {/* Summary */}
          <div className="bg-[#111] border border-white/10 rounded-2xl p-5 mb-6 space-y-3"
            style={{animation:"fade-up 0.5s ease-out 0.6s both"}}>
            <div className="font-bold text-orange-400 text-sm mb-3">📋 Booking Summary</div>
            {[
              ["🏜️ Tour", tourData?.title],
              ["📦 Package", pkgData?.title],
              ["📅 Date", date || "Flexible — to be confirmed"],
              ["👥 Guests", `${adults} adult${adults!==1?"s":""} ${children>0?`+ ${children} child${children!==1?"ren":""}`:""}`.trim()],
              ["💰 Total", `AED ${total}`],
              ["👤 Name", name],
              ["📞 Phone", phone],
            ].filter(([,v])=>v).map(([k,v]) => (
              <div key={k} className="flex justify-between text-sm border-b border-white/5 pb-2 last:border-0 last:pb-0">
                <span className="text-gray-500">{k}</span>
                <span className="text-white font-medium text-right max-w-[60%]">{v}</span>
              </div>
            ))}
          </div>

          {/* What happens next */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 space-y-3"
            style={{animation:"fade-up 0.5s ease-out 0.7s both"}}>
            <div className="font-bold text-white text-sm mb-3">⏭️ What Happens Next</div>
            {[
              {step:"1", text:"Your WhatsApp message was sent to our team", done:true},
              {step:"2", text:"We confirm availability within 5 minutes", done:false},
              {step:"3", text:"We send your official booking confirmation", done:false},
              {step:"4", text:"See you on the day — enjoy your adventure! 🏜️", done:false},
            ].map(({step:s,text,done}) => (
              <div key={s} className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${done ? "bg-green-500 text-white" : "bg-white/10 text-gray-400"}`}>
                  {done ? "✓" : s}
                </div>
                <span className={`text-sm ${done ? "text-green-300" : "text-gray-400"}`}>{text}</span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="space-y-3" style={{animation:"fade-up 0.5s ease-out 0.8s both"}}>
            <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-black py-4 rounded-2xl transition-colors text-lg"
              style={{animation:"heartbeat 2s ease-in-out infinite"}}>
              💬 Track on WhatsApp
            </a>
            <Link href="/" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold py-4 rounded-2xl hover:scale-[1.02] transition-transform">
              🏠 Back to Home
            </Link>
            <button onClick={() => { setBooked(false); setStep(1); setTourId(""); setPkgId(""); setDate(""); setName(""); setPhone(""); setEmail(""); }}
              className="w-full text-center text-gray-500 hover:text-white text-sm transition-colors py-2">
              ← Book Another Tour
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ── Main booking wizard ───────────────────────────────────────────────────
  const stepLabels = ["Choose Tour","Date & Guests","Your Details"];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{fontFamily:"system-ui,sans-serif"}}>
      <style>{`
        @keyframes fade-up{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes heartbeat{0%,100%{transform:scale(1)}14%{transform:scale(1.3)}28%{transform:scale(1)}42%{transform:scale(1.2)}70%{transform:scale(1)}}
        @keyframes wiggle{0%,100%{transform:rotate(-8deg)}50%{transform:rotate(8deg)}}
        @keyframes pulse-red{0%,100%{opacity:1}50%{opacity:0.6}}
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏜️</span>
            <span className="font-black text-xl bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">DubaiRovers</span>
          </Link>
          <Link href="/" className="text-gray-400 hover:text-white text-sm">← Home</Link>
        </div>
      </nav>

      {/* Trust bar */}
      <div style={{paddingTop:"64px",background:"linear-gradient(135deg,rgba(249,115,22,0.08),rgba(236,72,153,0.08))",borderBottom:"1px solid rgba(249,115,22,0.15)"}}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-center gap-4 md:gap-8">
          {[["🔒","Secure Booking"],["✅","Instant Confirmation"],["🔄","Free Cancellation"],["💬","24/7 WhatsApp"],["🚗","Hotel Pickup Included"]].map(([ic,lb]) => (
            <div key={lb} className="flex items-center gap-1.5">
              <span style={{fontSize:"14px"}}>{ic}</span>
              <span style={{color:"rgba(255,255,255,0.7)",fontSize:"12px",fontWeight:"600"}}>{lb}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 pt-8 pb-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black mb-2">Book Your <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">Adventure</span></h1>
          <p className="text-gray-400 text-sm">Confirm via WhatsApp · Free cancellation · Hotel pickup included</p>
        </div>

        {/* Countdown */}
        <div className="flex items-center justify-center gap-2 mb-6 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2.5">
          <span className="text-amber-400 text-sm" style={{animation:"wiggle 2s ease-in-out infinite",display:"inline-block"}}>⏰</span>
          <span className="text-amber-300 text-sm font-medium">Special prices valid for</span>
          <span className="text-amber-400 font-black text-lg">{formatCountdown(countdown)}</span>
        </div>

        {/* Step progress */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {[1,2,3].map(s => (
            <div key={s} className="flex items-center gap-3">
              <div className="flex flex-col items-center gap-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black border-2 transition-all ${step >= s ? "bg-gradient-to-br from-orange-500 to-pink-500 border-transparent text-white" : "border-white/20 text-gray-500"}`}>
                  {step > s ? "✓" : s}
                </div>
                <span className={`text-[10px] font-bold hidden md:block ${step >= s ? "text-orange-400" : "text-gray-600"}`}>{stepLabels[s-1]}</span>
              </div>
              {s < 3 && <div className={`w-10 h-0.5 mb-4 ${step > s ? "bg-gradient-to-r from-orange-500 to-pink-500" : "bg-white/10"}`} />}
            </div>
          ))}
        </div>

        <div className="bg-[#111] border border-white/10 rounded-3xl p-6 space-y-5" style={{animation:"fade-up 0.4s ease-out"}}>

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <>
              <h2 className="text-xl font-black">Step 1 — Choose Your Tour</h2>
              <div>
                <label className="block text-gray-400 text-xs font-bold mb-2 uppercase">🏜️ Select Tour</label>
                <select value={tourId} onChange={e => { setTourId(e.target.value); setPkgId(""); }}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-400 text-sm"
                  style={{backgroundColor:"#1a1a2e",color:"#ffffff"}}>
                  <option value="" style={{backgroundColor:"#1a1a2e",color:"#ffffff"}}>-- Choose a tour experience --</option>
                  {tours.map(t => (
                    <option key={t.id} value={t.id} style={{backgroundColor:"#1a1a2e",color:"#ffffff"}}>{t.emoji} {t.title} — from AED {Math.min(...getTourPackages(t.id).map(p=>p.price.AED))}</option>
                  ))}
                </select>
              </div>

              {tourId && (
                <div>
                  <label className="block text-gray-400 text-xs font-bold mb-2 uppercase">📦 Select Package</label>
                  <div className="space-y-2">
                    {packages.map(p => (
                      <button key={p.id} type="button"
                        onClick={() => setPkgId(p.id)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all ${pkgId === p.id ? `bg-orange-500/20 border-orange-500/60` : "bg-white/5 border-white/10 hover:border-white/25"}`}>
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2 flex-1">
                            <span className="text-xl">{p.emoji}</span>
                            <div>
                              <div className="font-bold text-sm text-white">{p.title}</div>
                              <div className="text-gray-400 text-xs">{p.duration} · {p.timeSlot}</div>
                              {p.badge && <div className="inline-block mt-1 text-xs bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded-full">{p.badge}</div>}
                              {p.availability?.status === "low" && (
                                <div className="text-red-400 text-xs mt-0.5" style={{animation:"pulse-red 1.5s ease-in-out infinite"}}>
                                  ⚠️ Only {p.availability.spotsLeft} spots left
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            {p.originalPrice && <div className="text-gray-500 text-xs line-through">AED {p.originalPrice.AED}</div>}
                            <div className="font-black text-orange-400">AED {p.price.AED}</div>
                            <div className="text-gray-500 text-xs">/person</div>
                          </div>
                        </div>
                        {pkgId === p.id && (
                          <div className="mt-3 pt-3 border-t border-orange-500/20 flex flex-wrap gap-1">
                            {p.highlights?.slice(0,3).map((h,i) => (
                              <span key={i} className="text-xs bg-white/10 rounded-full px-2 py-0.5 text-gray-300">{h.icon} {h.label}</span>
                            ))}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button onClick={() => setStep(2)} disabled={!tourId || !pkgId}
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black py-4 rounded-2xl hover:scale-[1.02] transition-transform text-lg">
                Continue →
              </button>
            </>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <>
              <h2 className="text-xl font-black">Step 2 — Date & Guests</h2>

              {/* Selected summary */}
              {tourData && pkgData && (
                <div className="flex gap-3 bg-orange-500/10 border border-orange-500/20 rounded-xl p-3">
                  <span className="text-2xl">{pkgData.emoji}</span>
                  <div>
                    <div className="font-bold text-sm text-white">{pkgData.title}</div>
                    <div className="text-orange-400 text-xs font-bold">AED {pkgData.price.AED}/person</div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-gray-400 text-xs font-bold mb-2 uppercase">📅 Preferred Date</label>
                <input type="date" value={date} min={new Date().toISOString().split("T")[0]} onChange={e => setDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-400" />
                <div className="text-gray-500 text-xs mt-1">Leave blank if dates are flexible — we'll confirm options</div>
              </div>

              {/* Adults */}
              <div>
                <label className="block text-gray-400 text-xs font-bold mb-2 uppercase">👤 Adults</label>
                <div className="flex items-center gap-4 bg-white/5 border border-white/20 rounded-xl px-4 py-3">
                  <button type="button" onClick={() => setAdults(Math.max(1, adults-1))} className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg text-white font-black text-xl">−</button>
                  <span className="flex-1 text-center font-black text-2xl">{adults}</span>
                  <button type="button" onClick={() => setAdults(Math.min(pkgData?.maxGroupSize||40, adults+1))} className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg text-white font-black text-xl">+</button>
                </div>
              </div>

              {/* Children */}
              <div>
                <label className="block text-gray-400 text-xs font-bold mb-2 uppercase">👶 Children (age {pkgData?.minAge || 3}+)</label>
                <div className="flex items-center gap-4 bg-white/5 border border-white/20 rounded-xl px-4 py-3">
                  <button type="button" onClick={() => setChildren(Math.max(0, children-1))} className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg text-white font-black text-xl">−</button>
                  <span className="flex-1 text-center font-black text-2xl">{children}</span>
                  <button type="button" onClick={() => setChildren(children+1)} className="w-10 h-10 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg text-white font-black text-xl">+</button>
                </div>
                {children > 0 && <div className="text-gray-500 text-xs mt-1">Children charged at 50% — AED {pkgData ? Math.round(pkgData.price.AED * 0.5) : 0}/child</div>}
              </div>

              {/* Hotel pickup */}
              <div>
                <label className="block text-gray-400 text-xs font-bold mb-2 uppercase">🏨 Hotel / Pickup Location</label>
                <input type="text" placeholder="e.g. Atlantis The Palm, JBR Beach Hotel..." value={hotel} onChange={e => setHotel(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-400 placeholder-gray-600" />
              </div>

              {/* Total */}
              {pkgData && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2">
                  {adults > 0 && <div className="flex justify-between text-sm text-gray-400"><span>{adults} adult{adults!==1?"s":""} × AED {pkgData.price.AED}</span><span>AED {pkgData.price.AED * adults}</span></div>}
                  {children > 0 && <div className="flex justify-between text-sm text-gray-400"><span>{children} child{children!==1?"ren":""} × AED {Math.round(pkgData.price.AED * 0.5)}</span><span>AED {Math.round(pkgData.price.AED * 0.5) * children}</span></div>}
                  <div className="flex justify-between font-black text-lg pt-2 border-t border-white/10">
                    <span>Total</span>
                    <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">AED {total}</span>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)} className="flex-1 bg-white/5 border border-white/10 text-gray-300 font-bold py-3.5 rounded-2xl hover:bg-white/10">← Back</button>
                <button type="button" onClick={() => setStep(3)} className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-black py-3.5 rounded-2xl hover:scale-[1.02] transition-transform">Continue →</button>
              </div>
            </>
          )}

          {/* ── STEP 3 ── */}
          {step === 3 && (
            <>
              <h2 className="text-xl font-black">Step 3 — Your Details</h2>

              <div>
                <label className="block text-gray-400 text-xs font-bold mb-1 uppercase">👤 Full Name *</label>
                <input type="text" required placeholder="Your full name" value={name} onChange={e => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-400 placeholder-gray-600" />
              </div>

              <div>
                <label className="block text-gray-400 text-xs font-bold mb-1 uppercase">💬 WhatsApp Number *</label>
                <input type="tel" required placeholder="+971 50 000 0000" value={phone} onChange={e => setPhone(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-400 placeholder-gray-600" />
              </div>

              <div>
                <label className="block text-gray-400 text-xs font-bold mb-1 uppercase">✉️ Email (optional)</label>
                <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-400 placeholder-gray-600" />
              </div>

              <div>
                <label className="block text-gray-400 text-xs font-bold mb-1 uppercase">🎉 Special Occasion?</label>
                <select value={occasion} onChange={e => setOccasion(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-400"
                  style={{backgroundColor:"#1a1a2e",color:"#ffffff"}}>
                  <option value="" style={{backgroundColor:"#1a1a2e",color:"#ffffff"}}>None — just exploring Dubai!</option>
                  {["Birthday 🎂","Anniversary 💍","Honeymoon 💑","Family Trip 👨‍👩‍👧","Corporate Event 🏢","Bucket List ✅"].map(o => <option key={o} value={o} style={{backgroundColor:"#1a1a2e",color:"#ffffff"}}>{o}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-gray-400 text-xs font-bold mb-1 uppercase">💬 Special Requests</label>
                <textarea rows={2} placeholder="Dietary needs, accessibility, surprises, allergies..." value={specialReq} onChange={e => setSpecialReq(e.target.value)}
                  className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-400 placeholder-gray-600 resize-none" />
              </div>

              {/* Final summary */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2 text-sm">
                <div className="font-bold text-orange-400 mb-2 flex items-center gap-2">
                  <span style={{animation:"wiggle 2s ease-in-out infinite",display:"inline-block"}}>📋</span> Booking Summary
                </div>
                {[
                  ["Tour", tourData?.title],
                  ["Package", pkgData?.title],
                  ["Date", date || "Flexible"],
                  ["Guests", `${adults} adult${adults!==1?"s":""}${children>0?` + ${children} child${children!==1?"ren":""}`:""}`.trim()],
                  ["Hotel Pickup", hotel || "To be confirmed"],
                ].map(([k,v]) => (
                  <div key={k} className="flex justify-between text-gray-300">
                    <span className="text-gray-500">{k}</span>
                    <span className="text-right max-w-[55%] text-xs">{v}</span>
                  </div>
                ))}
                <div className="flex justify-between font-black text-lg pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">AED {total}</span>
                </div>
              </div>

              {/* Trust signals */}
              <div className="grid grid-cols-3 gap-2 text-center">
                {[["🔒","Secure"],["🔄","Free Cancel"],["✅","Confirm 5min"]].map(([ic,lb]) => (
                  <div key={lb} className="bg-white/5 rounded-xl py-2.5 px-2">
                    <div className="text-xl">{ic}</div>
                    <div className="text-gray-500 text-[10px] mt-0.5">{lb}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(2)} className="flex-1 bg-white/5 border border-white/10 text-gray-300 font-bold py-3.5 rounded-2xl hover:bg-white/10">← Back</button>
                <button onClick={handleSubmit} disabled={!name || !phone} className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 disabled:opacity-40 text-white font-black py-3.5 rounded-2xl hover:scale-[1.02] transition-transform">
                  💬 Confirm Booking
                </button>
              </div>
            </>
          )}
        </div>

        {/* Bottom trust */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-gray-600">
          {["🌍 All nationalities welcome","🚗 Hotel pickup included","📞 +971544735060","⭐ 4.9/5 rating"].map(t => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>

      {/* Floating WA */}
      <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-400 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all text-2xl"
        style={{animation:"heartbeat 2s ease-in-out infinite"}}>💬</a>
    </div>
  );
}
