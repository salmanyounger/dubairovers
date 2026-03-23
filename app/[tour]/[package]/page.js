"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getTour, getPackage, getTourPackages } from "../../data/tours";
import TourAnimation from "../../components/TourAnimation";

// ─── Tour-specific booking fields ─────────────────────────────────────────────
const TOUR_BOOKING_FIELDS = {
  "desert-safari-dubai": { extras: [
    { id:"pickup", label:"🏨 Hotel / Pickup Location", type:"text", placeholder:"e.g. Atlantis The Palm, Downtown Dubai" },
    { id:"meal", label:"🍽️ Meal Preference", type:"select", options:["Standard BBQ Buffet","Vegetarian","Vegan","Halal Only","No Preference"] },
    { id:"language", label:"🌍 Guide Language", type:"select", options:["English","Arabic","Russian","French","German","Hindi","Chinese"] },
    { id:"sandboard", label:"🏄 Sandboarding?", type:"select", options:["Yes, include it!","No thanks"] },
    { id:"occasion", label:"🎉 Special Occasion?", type:"select", options:["None","Birthday 🎂","Anniversary 💍","Honeymoon 💑","Family Trip 👨‍👩‍👧"] },
  ]},
  "quad-bike-dubai": { extras: [
    { id:"pickup", label:"🏨 Hotel / Pickup Location", type:"text", placeholder:"Your hotel name & area" },
    { id:"experience", label:"🏍️ Riding Experience", type:"select", options:["Complete Beginner","Some Experience","Experienced Rider"] },
    { id:"quadsize", label:"🔧 Quad Size Preference", type:"select", options:["250cc (Beginner)","450cc (Experienced)","Guide Decides"] },
    { id:"gopro", label:"🎥 GoPro Recording?", type:"select", options:["No thanks","Yes — add GoPro (+AED 100)"] },
  ]},
  "dhow-cruise-dubai": { extras: [
    { id:"pickup", label:"🏨 Hotel / Meeting Point", type:"text", placeholder:"Hotel name or meet at pier?" },
    { id:"seating", label:"💺 Seating Preference", type:"select", options:["Open Deck (Outdoor)","Air-conditioned Lower Deck","No Preference"] },
    { id:"diet", label:"🥗 Dietary Requirements", type:"select", options:["No restrictions","Vegetarian","Vegan","Halal Only","Gluten Free"] },
    { id:"occasion", label:"🎉 Special Occasion?", type:"select", options:["None","Birthday 🎂","Anniversary 💍","Proposal 💍","Corporate Event"] },
  ]},
  "hot-air-balloon-dubai": { extras: [
    { id:"pickup", label:"🏨 Hotel for 4AM Pickup", type:"text", placeholder:"Exact hotel name — very important!" },
    { id:"weight", label:"⚖️ Approx. Total Group Weight (kg)", type:"text", placeholder:"e.g. 280 kg for 2 people" },
    { id:"champagne", label:"🥂 Champagne Toast?", type:"select", options:["No thanks","Yes (+AED 80 per person)"] },
    { id:"photos", label:"📸 Professional Photos?", type:"select", options:["No thanks","Yes (+AED 150)"] },
    { id:"occasion", label:"🎉 Celebrating Something?", type:"select", options:["None","Birthday 🎂","Anniversary 💍","Honeymoon 💑","Bucket List ✅"] },
  ]},
  "camel-riding-dubai": { extras: [
    { id:"pickup", label:"🏨 Hotel / Pickup Location", type:"text", placeholder:"Your hotel name & area" },
    { id:"children", label:"👶 Children (under 12)?", type:"select", options:["No children","1 child","2 children","3+ children"] },
    { id:"henna", label:"🎨 Henna Art Add-on?", type:"select", options:["No thanks","Yes please (+AED 30)"] },
    { id:"dress", label:"👘 Traditional Dress Photos?", type:"select", options:["Yes, included!","No thanks"] },
  ]},
  "private-city-tour-dubai": { extras: [
    { id:"pickup", label:"🏨 Hotel / Pickup Location", type:"text", placeholder:"Your hotel name & area" },
    { id:"language", label:"🌍 Guide Language", type:"select", options:["English","Arabic","Russian","French","German","Spanish","Chinese","Hindi"] },
    { id:"burj", label:"🗼 Burj Khalifa Entry?", type:"select", options:["No (exterior photo only)","Yes — 124th Floor (+AED 149 pp)","Yes — 125th Floor VIP (+AED 250 pp)"] },
    { id:"meal", label:"🍽️ Meal Preference", type:"select", options:["Standard Arabic restaurant","International cuisine","Vegetarian friendly","Skip meals"] },
    { id:"focus", label:"🎯 Tour Focus", type:"select", options:["Balanced — all highlights","Old Dubai & Heritage","Modern Dubai & Malls","Shopping focus","Beaches & Marina"] },
  ]},
};

// ─── Icon helpers ─────────────────────────────────────────────────────────────
function getIncludedIcon(text) {
  const t = text.toLowerCase();
  if (t.includes("pickup") || t.includes("drop")) return "🚗";
  if (t.includes("dune bash")) return "🏎️";
  if (t.includes("sand")) return "🏄";
  if (t.includes("camel")) return "🐪";
  if (t.includes("bbq") || t.includes("dinner") || t.includes("buffet") || t.includes("breakfast") || t.includes("lunch") || t.includes("meal")) return "🍽️";
  if (t.includes("entertain") || t.includes("show") || t.includes("dance")) return "🎭";
  if (t.includes("water") || t.includes("soft drink")) return "💧";
  if (t.includes("balloon")) return "🎈";
  if (t.includes("falcon")) return "🦅";
  if (t.includes("certificate")) return "📜";
  if (t.includes("insurance")) return "🛡️";
  if (t.includes("helmet") || t.includes("goggle") || t.includes("glove")) return "🪖";
  if (t.includes("champagne") || t.includes("beverage")) return "🍾";
  if (t.includes("photo")) return "📸";
  if (t.includes("cruise") || t.includes("dhow")) return "⛵";
  if (t.includes("vehicle") || t.includes("ac ") || t.includes("luxury")) return "🚙";
  if (t.includes("coffee") || t.includes("dates") || t.includes("tea")) return "☕";
  if (t.includes("tent") || t.includes("bedding") || t.includes("camp")) return "🏕️";
  if (t.includes("star") || t.includes("telescope")) return "🔭";
  if (t.includes("guide")) return "👨‍🏫";
  if (t.includes("band") || t.includes("music")) return "🎵";
  if (t.includes("alcohol") || t.includes("wine")) return "🍷";
  return "✨";
}

function getItineraryIcon(activity) {
  const a = activity.toLowerCase();
  if (a.includes("pickup") || a.includes("hotel")) return "🚗";
  if (a.includes("dune bash")) return "🏎️";
  if (a.includes("sandboard")) return "🏄";
  if (a.includes("camel")) return "🐪";
  if (a.includes("sunset") || a.includes("sunrise") || a.includes("photo")) return "📸";
  if (a.includes("camp") || a.includes("bedouin") || a.includes("dates") || a.includes("welcome")) return "🏕️";
  if (a.includes("dinner") || a.includes("bbq") || a.includes("buffet") || a.includes("lunch") || a.includes("breakfast")) return "🍽️";
  if (a.includes("show") || a.includes("entertain") || a.includes("dance") || a.includes("tanoura") || a.includes("fire")) return "🎭";
  if (a.includes("star") || a.includes("telescope")) return "🔭";
  if (a.includes("sleep") || a.includes("tent") || a.includes("retire")) return "🛏️";
  if (a.includes("return")) return "🏠";
  if (a.includes("balloon") || a.includes("flight") || a.includes("airborne")) return "🎈";
  if (a.includes("falcon")) return "🦅";
  if (a.includes("toast") || a.includes("champagne") || a.includes("celebrat")) return "🥂";
  if (a.includes("quad") || a.includes("atv") || a.includes("bike")) return "🏍️";
  if (a.includes("safety") || a.includes("briefing") || a.includes("gear") || a.includes("train")) return "🪖";
  if (a.includes("board") || a.includes("pier") || a.includes("depart") || a.includes("cruise")) return "⛵";
  if (a.includes("mosque") || a.includes("souk") || a.includes("heritage") || a.includes("creek")) return "🕌";
  if (a.includes("mall") || a.includes("burj") || a.includes("landmark")) return "🗼";
  if (a.includes("marina") || a.includes("jbr") || a.includes("beach")) return "🏖️";
  if (a.includes("refreshment") || a.includes("water") || a.includes("drink")) return "💧";
  if (a.includes("inflate") || a.includes("preparation")) return "⚙️";
  if (a.includes("landing")) return "🛬";
  if (a.includes("coffee")) return "☕";
  return "📍";
}

// ─── Star Rating component ────────────────────────────────────────────────────
function StarRating({ rating, size = "text-lg" }) {
  return (
    <span className={size}>
      {[1,2,3,4,5].map(s => (
        <span key={s} style={{color: s <= rating ? "#f97316" : "#374151"}}>★</span>
      ))}
    </span>
  );
}

// ─── Trust Signals Bar ────────────────────────────────────────────────────────
function TrustSignalsBar({ color }) {
  const signals = [
    { icon:"🔒", label:"Secure Booking" },
    { icon:"✅", label:"Instant Confirmation" },
    { icon:"🔄", label:"Free Cancellation 24h" },
    { icon:"⭐", label:"4.9/5 Rating" },
    { icon:"🌍", label:"All Nationalities" },
    { icon:"💬", label:"24/7 WhatsApp" },
  ];
  return (
    <div style={{
      background:"linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(236,72,153,0.08) 100%)",
      borderTop:"1px solid rgba(249,115,22,0.15)",
      borderBottom:"1px solid rgba(249,115,22,0.15)",
      padding:"12px 0",
      overflow:"hidden",
    }}>
      <div style={{
        display:"flex",
        gap:"0",
        animation:"trust-scroll 30s linear infinite",
        width:"max-content",
      }}>
        {[...signals,...signals].map((s, i) => (
          <div key={i} style={{
            display:"flex", alignItems:"center", gap:"6px",
            padding:"0 20px",
            borderRight:"1px solid rgba(255,255,255,0.08)",
            animation:`trust-pop 0.4s ease-out ${i*0.05}s both`,
            flexShrink:0,
          }}>
            <span style={{fontSize:"16px", display:"inline-block", animation:`bounce-gentle ${1.5+i*0.1}s ease-in-out infinite`}}>{s.icon}</span>
            <span style={{color:"rgba(255,255,255,0.75)", fontSize:"12px", fontWeight:"600", whiteSpace:"nowrap"}}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Reviews Carousel ─────────────────────────────────────────────────────────
function ReviewsCarousel({ reviews, tour }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const ratingBreakdown = [5,4,3,2,1].map(r => ({
    stars: r,
    count: reviews.filter(rv => rv.rating === r).length,
    pct: Math.round((reviews.filter(rv => rv.rating === r).length / reviews.length) * 100),
  }));
  const avgRating = (reviews.reduce((sum,r)=>sum+r.rating,0)/reviews.length).toFixed(1);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setCurrent(c => (c+1) % reviews.length), 3500);
    return () => clearInterval(t);
  }, [paused, reviews.length]);

  if (!reviews || reviews.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-black mb-6">
        <span style={{display:"inline-block",animation:"wiggle 2s ease-in-out infinite"}}>⭐</span>
        {" "}Guest{" "}
        <span className={`bg-gradient-to-r ${tour.color} bg-clip-text text-transparent`}>Reviews</span>
      </h2>

      {/* Overall rating + breakdown */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center justify-center text-center">
          <div className={`text-7xl font-black bg-gradient-to-r ${tour.color} bg-clip-text text-transparent mb-1`}
            style={{animation:"number-pop 0.6s ease-out both"}}>{avgRating}</div>
          <StarRating rating={Math.round(parseFloat(avgRating))} size="text-2xl" />
          <div className="text-gray-400 text-sm mt-1">Based on {tour.reviewCount.toLocaleString()} reviews</div>
          <div className="flex gap-2 mt-3 flex-wrap justify-center">
            <span className="bg-white/10 rounded-full px-3 py-1 text-xs text-gray-300">Google ★</span>
            <span className="bg-white/10 rounded-full px-3 py-1 text-xs text-gray-300">TripAdvisor ★</span>
          </div>
        </div>
        <div className="space-y-2">
          {ratingBreakdown.map(({stars,count,pct}) => (
            <div key={stars} className="flex items-center gap-2">
              <span className="text-xs text-gray-400 w-4">{stars}</span>
              <span style={{color:"#f97316",fontSize:"12px"}}>★</span>
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div className={`h-full rounded-full bg-gradient-to-r ${tour.color}`}
                  style={{width:`${pct}%`,transition:"width 1s ease-out"}} />
              </div>
              <span className="text-xs text-gray-500 w-4">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review cards carousel */}
      <div
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="relative"
      >
        <div className="overflow-hidden rounded-3xl">
          <div style={{
            display:"flex",
            transform:`translateX(-${current * 100}%)`,
            transition:"transform 0.5s cubic-bezier(0.4,0,0.2,1)",
          }}>
            {reviews.map((review, i) => (
              <div key={i} style={{minWidth:"100%"}}>
                <div className="bg-[#1a1008] border border-white/10 rounded-3xl p-6 mx-0.5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${tour.color} rounded-full flex items-center justify-center text-2xl font-black text-black flex-shrink-0`}>
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{review.name}</span>
                          <span className="text-lg">{review.country}</span>
                        </div>
                        <StarRating rating={review.rating} size="text-sm" />
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-400">{review.platform}</span>
                      {review.verified && (
                        <span className="text-xs px-2 py-1 rounded-full text-green-400 border border-green-500/30 bg-green-500/10">✅ Verified</span>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-200 text-sm leading-relaxed mb-4">"{review.text}"</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 text-xs">{review.date}</span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(s => (
                        <span key={s} style={{color: s <= review.rating ? "#f97316" : "#1f2937", fontSize:"16px"}}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-2 mt-4">
          {reviews.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className="transition-all duration-300"
              style={{
                width: i === current ? "24px" : "8px",
                height:"8px",
                borderRadius:"4px",
                background: i === current ? "#f97316" : "rgba(255,255,255,0.2)",
              }} />
          ))}
        </div>

        {/* Prev/Next arrows */}
        <button onClick={() => setCurrent(c => (c-1+reviews.length)%reviews.length)}
          className="absolute left-2 top-1/3 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors text-sm">‹</button>
        <button onClick={() => setCurrent(c => (c+1)%reviews.length)}
          className="absolute right-2 top-1/3 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors text-sm">›</button>
      </div>

      <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer"
        className={`mt-5 w-full flex items-center justify-center gap-2 bg-gradient-to-r ${tour.color} text-black font-bold py-3 rounded-2xl hover:scale-[1.02] transition-transform text-sm`}>
        📍 Read All Reviews on Google Maps →
      </a>
    </div>
  );
}

// ─── Main Package Page ────────────────────────────────────────────────────────
export default function PackagePage({ params }) {
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [extraFields, setExtraFields] = useState({});
  const [specialReq, setSpecialReq] = useState("");
  const [booked, setBooked] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [visibleIncluded, setVisibleIncluded] = useState([]);
  const [countdown, setCountdown] = useState(899); // 15min - 1sec = 899
  const [viewerCount, setViewerCount] = useState(0);

  const tour = getTour(params.tour);
  const pkg = getPackage(params.package);
  const bookingFields = TOUR_BOOKING_FIELDS[params.tour] || { extras: [] };

  // ── SEO meta tags ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!tour || !pkg) return;
    document.title = `${pkg.title} — ${tour.title} Dubai | Book Online | DubaiRovers.com`;

    const setMeta = (name, content, isOG = false) => {
      const sel = isOG ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let el = document.querySelector(sel);
      if (!el) {
        el = document.createElement("meta");
        isOG ? el.setAttribute("property", name) : el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const desc = `Book ${pkg.title} in Dubai from AED ${pkg.price.AED}/person. ${pkg.subtitle} Instant WhatsApp confirmation. Free cancellation.`;
    setMeta("description", desc);
    setMeta("og:title", `${pkg.title} — ${tour.title} | DubaiRovers.com`, true);
    setMeta("og:description", desc, true);
    setMeta("og:image", pkg.images?.[0] || tour.heroImage, true);
    setMeta("og:url", `https://dubairovers.com/${tour.slug}/${pkg.slug}`, true);
    setMeta("og:type", "website", true);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", `${pkg.title} — ${tour.title} | DubaiRovers`);
    setMeta("twitter:description", desc);
    setMeta("twitter:image", pkg.images?.[0] || tour.heroImage);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = `https://dubairovers.com/${tour.slug}/${pkg.slug}`;

    // JSON-LD schema
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "TouristAttraction",
          "name": `${pkg.title} — ${tour.title}`,
          "description": pkg.subtitle,
          "url": `https://dubairovers.com/${tour.slug}/${pkg.slug}`,
          "image": pkg.images || [tour.heroImage],
          "offers": {
            "@type": "Offer",
            "name": pkg.title,
            "price": pkg.price.AED,
            "priceCurrency": "AED",
            "availability": "https://schema.org/InStock",
            "url": `https://dubairovers.com/${tour.slug}/${pkg.slug}`,
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": pkg.rating,
            "reviewCount": pkg.reviewCount,
            "bestRating": "5",
          },
          "provider": {
            "@type": "TravelAgency",
            "name": "DubaiRovers",
            "telephone": "+971544735060",
            "url": "https://dubairovers.com",
            "address": { "@type": "PostalAddress", "addressCountry": "AE", "addressRegion": "Dubai" },
          },
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://dubairovers.com" },
            { "@type": "ListItem", "position": 2, "name": tour.title, "item": `https://dubairovers.com/${tour.slug}` },
            { "@type": "ListItem", "position": 3, "name": pkg.title, "item": `https://dubairovers.com/${tour.slug}/${pkg.slug}` },
          ],
        },
      ],
    };

    let schemaTag = document.querySelector('#dr-schema');
    if (!schemaTag) { schemaTag = document.createElement("script"); schemaTag.type = "application/ld+json"; schemaTag.id = "dr-schema"; document.head.appendChild(schemaTag); }
    schemaTag.textContent = JSON.stringify(schema);
  }, [tour, pkg]);

  // ── Itinerary + included animations ────────────────────────────────────────
  useEffect(() => {
    if (!pkg) return;
    const total = pkg.itinerary?.length || 0;
    for (let i = 0; i < total; i++) {
      setTimeout(() => setVisibleSteps(s => [...s, i]), 300 + i * 500);
    }
    const totalInc = pkg.included?.length || 0;
    for (let i = 0; i < totalInc; i++) {
      setTimeout(() => setVisibleIncluded(s => [...s, i]), 200 + i * 120);
    }
  }, [pkg]);

  // ── Countdown timer (15 min price lock) ────────────────────────────────────
  useEffect(() => {
    const t = setInterval(() => {
      setCountdown(c => c <= 0 ? 899 : c - 1);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  // ── Viewer count (rotating realistic number) ───────────────────────────────
  useEffect(() => {
    if (!pkg) return;
    const base = pkg.availability?.viewersToday || 10;
    setViewerCount(base + Math.floor(Math.random() * 5));
    const t = setInterval(() => {
      setViewerCount(base + Math.floor(Math.random() * 8));
    }, 28000);
    return () => clearInterval(t);
  }, [pkg]);

  const formatCountdown = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  if (!tour || !pkg) return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-3xl font-bold mb-4">Package Not Found</h1>
        <Link href="/" className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold px-6 py-3 rounded-xl">← Back to Home</Link>
      </div>
    </div>
  );

  const total = pkg.price.AED * guests;
  const otherPkgs = getTourPackages(params.tour).filter(p => p.id !== pkg.id);
  const avail = pkg.availability || {};
  const isLow = avail.status === "low";

  const handleBook = (e) => {
    e.preventDefault();
    const extras = bookingFields.extras.map(f => `${f.label.replace(/[^\w\s]/g,"").trim()}: ${extraFields[f.id] || "Not specified"}`).join("\n");
    const ref = "DR" + Math.floor(100000 + Math.random() * 900000);
    const msg = encodeURIComponent(
      `🏜️ *DubaiRovers Booking — Ref #${ref}*\n\n*Tour:* ${tour.title}\n*Package:* ${pkg.title}\n*Date:* ${date||"Flexible"}\n*Guests:* ${guests}\n*Total:* AED ${total}\n\n*👤 Name:* ${name}\n*📞 Phone:* ${phone}\n*✉️ Email:* ${email||"N/A"}\n\n*📋 Details:*\n${extras}${specialReq?`\n\n*💬 Special Requests:*\n${specialReq}`:""}\n\n✅ Please confirm availability!\n_Booked via DubaiRovers.com_`
    );
    window.open(`https://wa.me/971544735060?text=${msg}`, "_blank");
    setBooked(true);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <style suppressHydrationWarning>{`
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes bounce-in{0%{transform:scale(0) translateY(20px);opacity:0}60%{transform:scale(1.15) translateY(-4px);opacity:1}100%{transform:scale(1) translateY(0);opacity:1}}
        @keyframes slide-in-left{from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:translateX(0)}}
        @keyframes slide-in-right{from{opacity:0;transform:translateX(30px)}to{opacity:1;transform:translateX(0)}}
        @keyframes fade-up{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes wiggle{0%,100%{transform:rotate(-8deg)}50%{transform:rotate(8deg)}}
        @keyframes bounce-gentle{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-6px) scale(1.1)}}
        @keyframes heartbeat{0%,100%{transform:scale(1)}14%{transform:scale(1.3)}28%{transform:scale(1)}42%{transform:scale(1.2)}70%{transform:scale(1)}}
        @keyframes icon-spin-in{0%{transform:rotate(-180deg) scale(0);opacity:0}100%{transform:rotate(0) scale(1);opacity:1}}
        @keyframes glow-pulse{0%,100%{box-shadow:0 0 8px rgba(249,115,22,0.3)}50%{box-shadow:0 0 25px rgba(249,115,22,0.7)}}
        @keyframes tag-shimmer{0%{background-position:200% center}100%{background-position:-200% center}}
        @keyframes number-pop{0%{transform:scale(0);opacity:0}80%{transform:scale(1.2)}100%{transform:scale(1);opacity:1}}
        @keyframes line-grow{from{height:0;opacity:0}to{height:100%;opacity:1}}
        @keyframes check-bounce{0%{transform:scale(0)}70%{transform:scale(1.3)}100%{transform:scale(1)}}
        @keyframes pulse-red{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.7;transform:scale(1.05)}}
        @keyframes trust-scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        @keyframes trust-pop{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .tag-pill{background:linear-gradient(90deg,rgba(255,255,255,0.05) 0%,rgba(255,255,255,0.12) 50%,rgba(255,255,255,0.05) 100%);background-size:200% auto;animation:tag-shimmer 3s linear infinite;}
        .booking-glow{animation:glow-pulse 3s ease-in-out infinite;}
      `}</style>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🏜️</span>
            <span className="font-black text-xl bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">DubaiRovers</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href={`/${params.tour}`} className="text-gray-400 hover:text-white text-sm hidden md:block">← {tour.title}</Link>
            <Link href="/booking" className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold px-5 py-2 rounded-full text-sm">Book Now</Link>
          </div>
        </div>
      </nav>

      {/* TRUST SIGNALS BAR */}
      <div className="pt-16">
        <TrustSignalsBar color={tour.color} />
      </div>

      {/* BREADCRUMBS */}
      <div className="max-w-7xl mx-auto px-4 pt-4 pb-2">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>›</span>
          <Link href={`/${params.tour}`} className="hover:text-white transition-colors">{tour.title}</Link>
          <span>›</span>
          <span className="text-white">{pkg.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ───────── LEFT COLUMN ───────── */}
          <div className="lg:col-span-2 space-y-12">

            {/* Hero gallery — live canvas animation */}
            <div className="relative rounded-3xl overflow-hidden h-80 md:h-[460px]" style={{background:'#08060a'}}>
              <TourAnimation tourId={tour.id} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              {pkg.badge && <div className={`absolute top-4 left-4 bg-gradient-to-r ${tour.color} text-black font-black text-sm px-4 py-1.5 rounded-full`}>{pkg.badge}</div>}
              {/* Urgency badge on image */}
              {isLow && avail.spotsLeft <= 4 && (
                <div className="absolute top-4 right-4 bg-red-600/90 backdrop-blur text-white text-xs font-black px-3 py-2 rounded-xl border border-red-400/50"
                  style={{animation:"pulse-red 1.5s ease-in-out infinite"}}>
                  ⚠️ Only {avail.spotsLeft} spots left!
                </div>
              )}
              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur rounded-2xl px-4 py-2 text-right">
                {pkg.originalPrice && <div className="text-gray-400 text-sm line-through">AED {pkg.originalPrice.AED}</div>}
                <div className={`font-black text-2xl bg-gradient-to-r ${tour.color} bg-clip-text text-transparent`}>AED {pkg.price.AED}</div>
                <div className="text-gray-400 text-xs">per person</div>
              </div>
            </div>

            {/* Title & Tags */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl" style={{display:"inline-block",animation:"bounce-gentle 2s ease-in-out infinite"}}>{pkg.emoji}</span>
                <div className={`inline-flex bg-gradient-to-r ${tour.color} text-black text-xs font-bold px-4 py-1.5 rounded-full`}>{tour.category}</div>
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-3">{pkg.title}</h1>
              <p className="text-xl text-gray-300 mb-4">{pkg.subtitle}</p>
              <div className="flex flex-wrap gap-2 text-sm pb-5 border-b border-white/10">
                {[
                  {icon:"⭐",text:`${pkg.rating} (${pkg.reviewCount.toLocaleString()} reviews)`},
                  {icon:"⏱️",text:pkg.duration},
                  {icon:"🕐",text:pkg.timeSlot},
                  {icon:"💪",text:pkg.physicalLevel},
                  {icon:"👶",text:`Age ${pkg.minAge}+`},
                ].map((item, i) => (
                  <span key={i} className="tag-pill border border-white/10 rounded-full px-3 py-1.5 flex items-center gap-1.5">
                    <span style={{display:"inline-block",animation:`wiggle ${1.5+i*0.2}s ease-in-out infinite`}}>{item.icon}</span>
                    <span className="text-gray-300">{item.text}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Availability + Urgency strip */}
            {avail.todayDeparture && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-1">🕐</div>
                  <div className="text-gray-400 text-xs uppercase font-bold mb-1">Today's Departure</div>
                  <div className="font-black text-white">{avail.todayDeparture}</div>
                </div>
                <div className={`rounded-2xl p-4 text-center border ${isLow ? "bg-red-500/10 border-red-500/30" : "bg-green-500/10 border-green-500/30"}`}
                  style={isLow ? {animation:"pulse-red 2s ease-in-out infinite"} : {}}>
                  <div className="text-2xl mb-1">{isLow ? "⚠️" : "✅"}</div>
                  <div className={`text-xs uppercase font-bold mb-1 ${isLow ? "text-red-400" : "text-green-400"}`}>Availability</div>
                  <div className={`font-black ${isLow ? "text-red-300" : "text-green-300"}`}>
                    {avail.spotsLeft} spots left
                  </div>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/20 rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-1">🔥</div>
                  <div className="text-gray-400 text-xs uppercase font-bold mb-1">Popular Today</div>
                  <div className="font-black text-orange-400">{viewerCount} people viewing</div>
                </div>
              </div>
            )}

            {/* Highlights */}
            {pkg.highlights && (
              <div>
                <h2 className="text-2xl font-black mb-5">✨ Package <span className={`bg-gradient-to-r ${tour.color} bg-clip-text text-transparent`}>Highlights</span></h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {pkg.highlights.map((h, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-white/25 hover:scale-[1.03] transition-all duration-300"
                      style={{animation:`fade-up 0.5s ease-out ${i*0.1}s both`}}>
                      <div className="text-3xl mb-2" style={{display:"inline-block",animation:`wiggle ${1.8+i*0.25}s ease-in-out infinite`}}>{h.icon}</div>
                      <div className="font-bold text-sm">{h.label}</div>
                      <div className="text-gray-400 text-xs mt-1">{h.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Animated Itinerary */}
            {pkg.itinerary && (
              <div>
                <h2 className="text-2xl font-black mb-8">
                  <span style={{display:"inline-block",animation:"wiggle 2s ease-in-out infinite"}}>🗓️</span>{" "}
                  Your <span className={`bg-gradient-to-r ${tour.color} bg-clip-text text-transparent`}>Journey</span> — Step by Step
                </h2>
                <div className="relative">
                  <div className="absolute left-8 top-5 bottom-5 w-0.5 rounded-full overflow-hidden">
                    <div style={{width:"100%",height:"100%",background:`linear-gradient(to bottom,#f97316,#8b5cf6,#06b6d4)`,animation:"line-grow 2s ease-out 0.3s both"}} />
                  </div>
                  <div className="space-y-4">
                    {pkg.itinerary.map((step, i) => (
                      <div key={i} className="flex gap-4 items-start"
                        style={{opacity:visibleSteps.includes(i)?1:0,transform:visibleSteps.includes(i)?"translateX(0) scale(1)":"translateX(-20px) scale(0.95)",transition:"all 0.5s cubic-bezier(0.34,1.56,0.64,1)"}}>
                        <div className="flex-shrink-0 z-10">
                          <div className={`w-10 h-10 bg-gradient-to-br ${tour.color} rounded-full flex items-center justify-center text-black font-black text-sm shadow-lg`}
                            style={{animation:visibleSteps.includes(i)?`number-pop 0.4s ease-out both`:"none"}}>{i+1}</div>
                        </div>
                        <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-white/20 hover:bg-white/8 transition-all duration-300 group">
                          <div className="flex items-start gap-3">
                            <div className="text-3xl flex-shrink-0"
                              style={{display:"inline-block",animation:visibleSteps.includes(i)?`icon-spin-in 0.6s ease-out both`:"none"}}>
                              {getItineraryIcon(step.activity)}
                            </div>
                            <div className="flex-1">
                              <div className={`text-xs font-bold mb-0.5 bg-gradient-to-r ${tour.color} bg-clip-text text-transparent`}>{step.time}</div>
                              <div className="text-white font-semibold text-sm">{step.activity}</div>
                            </div>
                            <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${tour.color} flex-shrink-0 mt-2`}
                              style={{animation:"heartbeat 2s ease-in-out infinite"}} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Included / Not Included */}
            {pkg.included && (
              <div>
                <h2 className="text-2xl font-black mb-6">📦 <span className={`bg-gradient-to-r ${tour.color} bg-clip-text text-transparent`}>What is Included</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  {pkg.included.filter(item => item.startsWith("✅")).map((item, i) => {
                    const text = item.replace("✅","").trim();
                    const icon = getIncludedIcon(text);
                    return (
                      <div key={i} className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-2xl px-4 py-3 hover:bg-green-500/15 hover:scale-[1.02] transition-all duration-300"
                        style={{opacity:visibleIncluded.includes(i)?1:0,transform:visibleIncluded.includes(i)?"translateX(0)":"translateX(-24px)",transition:`all 0.4s ease-out ${i*0.08}s`}}>
                        <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{animation:`bounce-in 0.5s ease-out ${i*0.1}s both`}}>
                          <span className="text-xl" style={{display:"inline-block",animation:`wiggle ${1.5+i*0.15}s ease-in-out infinite`}}>{icon}</span>
                        </div>
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{animation:`check-bounce 0.4s ease-out ${i*0.1+0.15}s both`}}>
                          <svg viewBox="0 0 12 10" fill="none" className="w-3.5 h-3.5">
                            <path d="M1 5l3 4 7-8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <span className="text-green-200 text-sm font-medium">{text}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {pkg.included.filter(item => item.startsWith("❌")).map((item, i) => {
                    const text = item.replace("❌","").trim();
                    const icon = getIncludedIcon(text);
                    return (
                      <div key={i} className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-3 transition-all duration-300"
                        style={{animation:`slide-in-right 0.4s ease-out ${i*0.1}s both`}}>
                        <div className="w-10 h-10 bg-red-500/15 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-xl opacity-50">{icon}</span>
                        </div>
                        <div className="w-6 h-6 bg-red-500/20 border-2 border-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <svg viewBox="0 0 10 10" fill="none" className="w-3 h-3">
                            <path d="M2 2l6 6M8 2l-6 6" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"/>
                          </svg>
                        </div>
                        <span className="text-red-300 text-sm">{text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Add-ons */}
            {pkg.addOns?.length > 0 && (
              <div>
                <h2 className="text-2xl font-black mb-4">➕ Optional <span className={`bg-gradient-to-r ${tour.color} bg-clip-text text-transparent`}>Add-ons</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {pkg.addOns.map((a, i) => (
                    <div key={i} className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/25 hover:scale-[1.02] transition-all"
                      style={{animation:`fade-up 0.4s ease-out ${i*0.1}s both`}}>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl" style={{display:"inline-block",animation:`bounce-gentle ${1.8+i*0.2}s ease-in-out infinite`}}>{getIncludedIcon(a.label)}</span>
                        <span className="text-gray-300 text-sm font-medium">{a.label}</span>
                      </div>
                      <span className={`font-bold text-sm bg-gradient-to-r ${tour.color} bg-clip-text text-transparent`}>+AED {a.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ⭐ REVIEWS CAROUSEL */}
            {tour.reviews && tour.reviews.length > 0 && (
              <ReviewsCarousel reviews={tour.reviews} tour={tour} />
            )}

            {/* FAQs */}
            {tour.faqs && (
              <div>
                <h2 className="text-2xl font-black mb-4">❓ <span className={`bg-gradient-to-r ${tour.color} bg-clip-text text-transparent`}>FAQs</span></h2>
                <div className="space-y-3">
                  {tour.faqs.map((faq, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors">
                      <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left p-4 flex justify-between items-center">
                        <span className="font-semibold text-sm">{faq.q}</span>
                        <span style={{display:"inline-block",transition:"transform 0.3s",transform:openFaq===i?"rotate(45deg)":"rotate(0deg)"}}
                          className={`text-xl font-bold ml-4 bg-gradient-to-r ${tour.color} bg-clip-text text-transparent`}>+</span>
                      </button>
                      {openFaq === i && <div className="px-4 pb-4 text-gray-300 text-sm border-t border-white/10 pt-3" style={{animation:"fade-up 0.3s ease-out"}}>{faq.a}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other packages */}
            {otherPkgs.length > 0 && (
              <div>
                <h2 className="text-2xl font-black mb-4">🔀 Other <span className={`bg-gradient-to-r ${tour.color} bg-clip-text text-transparent`}>Packages</span></h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {otherPkgs.map(p => (
                    <Link key={p.id} href={`/${params.tour}/${p.slug}`}
                      className="group flex gap-3 bg-white/5 border border-white/10 rounded-2xl p-4 hover:border-white/25 hover:scale-[1.01] transition-all">
                      <img src={p.images?.[0]||tour.cardImage} alt={p.title} className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
                      <div>
                        <div className="font-bold text-sm group-hover:text-orange-400 transition-colors">{p.title}</div>
                        <div className="text-gray-500 text-xs mt-0.5">{p.duration}</div>
                        <div className={`font-black mt-1 bg-gradient-to-r ${tour.color} bg-clip-text text-transparent`}>AED {p.price.AED}</div>
                        {p.availability?.status === "low" && (
                          <div className="text-red-400 text-xs mt-1">⚠️ {p.availability.spotsLeft} spots left</div>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ───────── BOOKING FORM (RIGHT COLUMN) ───────── */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-[#111] border border-white/15 rounded-3xl overflow-hidden shadow-2xl booking-glow">
              <div className={`bg-gradient-to-r ${tour.color} p-5`}>
                <div className="flex items-center gap-2">
                  <span className="text-2xl" style={{animation:"bounce-gentle 1.5s ease-in-out infinite",display:"inline-block"}}>{tour.emoji}</span>
                  <div>
                    <div className="text-black font-black text-lg">Book This Experience</div>
                    <div className="text-black/70 text-sm">{pkg.title}</div>
                  </div>
                </div>
              </div>

              <div className="p-5 max-h-[80vh] overflow-y-auto">
                {booked ? (
                  <div className="text-center py-8 space-y-4">
                    <div className="text-6xl" style={{animation:"heartbeat 1s ease-in-out 3"}}>🎉</div>
                    <h3 className="text-xl font-black text-green-400">Booking Sent!</h3>
                    <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4 space-y-2">
                      <div className="text-green-300 font-bold text-sm">✅ WhatsApp opened</div>
                      <div className="text-gray-400 text-xs">We confirm within 5 minutes</div>
                    </div>
                    <div className="text-gray-400 text-sm text-left bg-white/5 rounded-xl p-3 space-y-1">
                      <div className="flex justify-between"><span className="text-gray-500">Tour</span><span className="text-white font-medium text-xs">{tour.title}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Package</span><span className="text-white font-medium text-xs">{pkg.title}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Guests</span><span className="text-white font-medium">{guests}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Total</span><span className={`font-black bg-gradient-to-r ${tour.color} bg-clip-text text-transparent`}>AED {total}</span></div>
                    </div>
                    <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-2xl transition-colors text-sm">
                      💬 Track on WhatsApp
                    </a>
                    <button onClick={() => setBooked(false)} className="text-orange-400 underline text-sm">← Book again</button>
                  </div>
                ) : (
                  <form onSubmit={handleBook} className="space-y-4">

                    {/* Price */}
                    <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/10">
                      {pkg.originalPrice && <div className="text-gray-500 text-xs line-through">AED {pkg.originalPrice.AED} / person</div>}
                      <div className={`font-black text-4xl bg-gradient-to-r ${tour.color} bg-clip-text text-transparent`}>AED {pkg.price.AED}</div>
                      <div className="text-gray-500 text-xs">per person</div>
                    </div>

                    {/* Urgency: Spots + Countdown */}
                    <div className="space-y-2">
                      {avail.spotsLeft && (
                        <div className={`flex items-center justify-between rounded-xl px-4 py-2.5 border text-sm font-bold ${isLow ? "bg-red-500/15 border-red-500/40 text-red-300" : "bg-green-500/10 border-green-500/30 text-green-300"}`}
                          style={isLow ? {animation:"pulse-red 1.8s ease-in-out infinite"} : {}}>
                          <span>{isLow ? "⚠️" : "✅"} {avail.spotsLeft} spots available</span>
                          <span className="text-xs opacity-70">today</span>
                        </div>
                      )}
                      <div className="flex items-center justify-between bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-2.5">
                        <span className="text-amber-300 text-xs font-bold">⏰ Price locked for</span>
                        <span className="text-amber-400 font-black text-sm">{formatCountdown(countdown)}</span>
                      </div>
                      {viewerCount > 0 && (
                        <div className="text-center text-xs text-gray-500">
                          🔥 {viewerCount} people are viewing this right now
                        </div>
                      )}
                    </div>

                    {/* Date */}
                    <div>
                      <label className="flex items-center gap-1.5 text-gray-400 text-xs font-bold mb-1.5 uppercase">
                        <span style={{animation:"wiggle 2s ease-in-out infinite",display:"inline-block"}}>📅</span> Tour Date
                      </label>
                      <input type="date" value={date} min={new Date().toISOString().split("T")[0]} onChange={e=>setDate(e.target.value)}
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-400 transition-colors" />
                    </div>

                    {/* Guests */}
                    <div>
                      <label className="flex items-center gap-1.5 text-gray-400 text-xs font-bold mb-1.5 uppercase">
                        <span style={{animation:"bounce-gentle 2s ease-in-out infinite",display:"inline-block"}}>👥</span> Guests
                      </label>
                      <div className="flex items-center gap-3 bg-white/5 border border-white/20 rounded-xl px-4 py-3">
                        <button type="button" onClick={()=>setGuests(Math.max(1,guests-1))}
                          className={`w-10 h-10 bg-gradient-to-br ${tour.color} rounded-xl text-black font-black text-xl hover:scale-110 transition-transform`}>−</button>
                        <span className="flex-1 text-center font-black text-2xl">{guests}</span>
                        <button type="button" onClick={()=>setGuests(Math.min(pkg.maxGroupSize,guests+1))}
                          className={`w-10 h-10 bg-gradient-to-br ${tour.color} rounded-xl text-black font-black text-xl hover:scale-110 transition-transform`}>+</button>
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <label className="flex items-center gap-1.5 text-gray-400 text-xs font-bold mb-1.5 uppercase">
                        <span>👤</span> Full Name *
                      </label>
                      <input required type="text" placeholder="Your full name" value={name} onChange={e=>setName(e.target.value)}
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-400 placeholder-gray-600 transition-colors" />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="flex items-center gap-1.5 text-gray-400 text-xs font-bold mb-1.5 uppercase">
                        <span style={{animation:"heartbeat 2s ease-in-out infinite",display:"inline-block"}}>💬</span> WhatsApp Number *
                      </label>
                      <input required type="tel" placeholder="+971 50 000 0000" value={phone} onChange={e=>setPhone(e.target.value)}
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-400 placeholder-gray-600 transition-colors" />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="flex items-center gap-1.5 text-gray-400 text-xs font-bold mb-1.5 uppercase">
                        <span>✉️</span> Email (optional)
                      </label>
                      <input type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-400 placeholder-gray-600 transition-colors" />
                    </div>

                    {/* Tour-specific fields */}
                    {bookingFields.extras.map(field => (
                      <div key={field.id}>
                        <label className="flex items-center gap-1 text-gray-400 text-xs font-bold mb-1.5 uppercase">{field.label}</label>
                        {field.type === "select" ? (
                          <select value={extraFields[field.id]||""} onChange={e=>setExtraFields({...extraFields,[field.id]:e.target.value})}
                            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-400 transition-colors"
                            style={{backgroundColor:"#1a1a2e",color:"#ffffff"}}>
                            <option value="" style={{backgroundColor:"#1a1a2e",color:"#ffffff"}}>-- Select --</option>
                            {field.options.map(opt=><option key={opt} value={opt} style={{backgroundColor:"#1a1a2e",color:"#ffffff"}}>{opt}</option>)}
                          </select>
                        ) : (
                          <input type={field.type} placeholder={field.placeholder} value={extraFields[field.id]||""} onChange={e=>setExtraFields({...extraFields,[field.id]:e.target.value})}
                            className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-400 placeholder-gray-600 transition-colors" />
                        )}
                      </div>
                    ))}

                    {/* Special requests */}
                    <div>
                      <label className="flex items-center gap-1.5 text-gray-400 text-xs font-bold mb-1.5 uppercase">
                        <span>💬</span> Special Requests
                      </label>
                      <textarea rows={2} placeholder="Allergies, accessibility needs, special arrangements..." value={specialReq} onChange={e=>setSpecialReq(e.target.value)}
                        className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-400 placeholder-gray-600 transition-colors resize-none" />
                    </div>

                    {/* Slots */}
                    <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                      <div className="text-xs font-bold uppercase mb-1 flex items-center gap-1">
                        <span style={{display:"inline-block",animation:"wiggle 2s ease-in-out infinite"}}>🕐</span>
                        <span className={`bg-gradient-to-r ${tour.color} bg-clip-text text-transparent`}>Available Slots</span>
                      </div>
                      <div className="text-white text-sm">{pkg.timeSlot}</div>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                      <span className="text-gray-300 text-sm">Total ({guests} {guests===1?"person":"people"})</span>
                      <span className={`font-black text-2xl bg-gradient-to-r ${tour.color} bg-clip-text text-transparent`}>AED {total}</span>
                    </div>

                    {/* Trust mini-bar above CTA */}
                    <div className="grid grid-cols-3 gap-1 text-center">
                      {[["🔒","Secure"],["🔄","Free Cancel"],["✅","Instant Confirm"]].map(([ic,lb]) => (
                        <div key={lb} className="bg-white/5 rounded-lg py-1.5 px-1">
                          <div className="text-base">{ic}</div>
                          <div className="text-gray-500 text-[10px] leading-tight">{lb}</div>
                        </div>
                      ))}
                    </div>

                    <button type="submit" className={`w-full bg-gradient-to-r ${tour.color} text-black font-black text-lg py-4 rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-xl`}>
                      📅 Book Now — AED {total}
                    </button>

                    <a href={`https://wa.me/971544735060?text=${encodeURIComponent(`Hi! I am interested in ${pkg.title}. Can you help?`)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-3.5 rounded-2xl transition-colors">
                      <span style={{animation:"heartbeat 2s ease-in-out infinite",display:"inline-block"}}>💬</span> Ask via WhatsApp
                    </a>

                    <p className="text-gray-600 text-xs text-center">✅ Free cancellation · 🔒 Secure · 🚗 Hotel pickup</p>
                  </form>
                )}
              </div>

              <div className="border-t border-white/10 p-4 grid grid-cols-2 gap-2">
                {[
                  {label:"Duration",value:pkg.duration},
                  {label:"Min Age",value:`${pkg.minAge}+`},
                  {label:"Max Group",value:pkg.maxGroupSize},
                  {label:"Cancellation",value:"Free 24hrs"},
                ].map(info=>(
                  <div key={info.label} className="text-center bg-white/5 rounded-xl py-2 px-3">
                    <div className="text-gray-500 text-xs">{info.label}</div>
                    <div className="text-white text-xs font-bold mt-0.5">{info.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp */}
      <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-400 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all text-2xl"
        style={{animation:"heartbeat 2s ease-in-out infinite"}}>💬</a>
    </div>
  );
}
