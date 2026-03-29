'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BookingForm from './BookingForm';
import { useCurrency } from '../context/CurrencyContext';

function Stars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className={`w-3.5 h-3.5 ${i <= Math.round(rating) ? 'text-amber-400' : 'text-gray-300'}`}
          fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Modal wrapper for booking form ──────────────────────────────
function BookingModal({ tour, onClose }) {
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4"
      style={{ background: 'rgba(10,22,40,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}>
      <div
        className="bg-white rounded-3xl w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl"
        style={{ border: '1px solid rgba(212,175,55,0.3)' }}
        onClick={e => e.stopPropagation()}>
        <BookingForm tour={tour} onClose={onClose} />
      </div>
    </div>
  );
}

export default function TourCard({ tour, variant = 'default' }) {
  const [showBooking, setShowBooking] = useState(false);
  const { convert } = useCurrency();

  if (!tour) return null;

  const href = `/tours/${tour.category}/${tour.slug}`;

  if (variant === 'horizontal') {
    return (
      <>
        {showBooking && <BookingModal tour={tour} onClose={() => setShowBooking(false)} />}
        <div className="tour-card flex flex-col sm:flex-row overflow-hidden group">
          {/* Clickable image area → tour detail */}
          <Link href={href} className="relative w-full sm:w-52 h-48 sm:h-auto shrink-0 overflow-hidden block">
            <Image src={tour.images?.[0] || 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=600&q=80'}
              alt={tour.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            {tour.tag && <span className="absolute top-3 left-3 badge-gold text-xs">{tour.tag}</span>}
          </Link>
          <div className="flex flex-col justify-between p-5 flex-1">
            <Link href={href} className="block">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Stars rating={tour.rating} />
                <span className="text-xs font-bold text-amber-500">{tour.rating}</span>
                <span className="text-xs text-gray-400">({tour.reviewCount?.toLocaleString()})</span>
                {tour.instantConfirmation && <span className="badge-green">⚡ Instant</span>}
              </div>
              <h3 className="font-bold text-brand-navy text-base mb-1 line-clamp-2 group-hover:text-brand-gold transition-colors"
                style={{ fontFamily:"'Playfair Display',serif" }}>{tour.name}</h3>
              <p className="text-gray-500 text-xs line-clamp-2">{tour.shortDesc}</p>
              <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-500">
                <span>⏱️ {tour.duration}</span>
                <span>👥 Max {tour.groupSize?.max}</span>
                {tour.cancellation?.includes('Free') && <span>🔄 Free cancel</span>}
              </div>
            </Link>
            <div className="flex items-center justify-between mt-4">
              <div>
                <span className="text-xs text-gray-400">From</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black text-brand-navy">AED {tour.pricing?.adult}</span>
                  <span className="text-xs text-gray-400">/ person</span>
                </div>
              </div>
              <button
                onClick={e => { e.preventDefault(); setShowBooking(true); }}
                className="btn-gold text-sm px-4 py-2">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // ── Default card ─────────────────────────────────────────────
  return (
    <>
      {showBooking && <BookingModal tour={tour} onClose={() => setShowBooking(false)} />}

      {/* The whole card is a block, clicking the card body → tour detail */}
      <div className="tour-card group cursor-pointer">
        {/* Image — clicking goes to tour detail */}
        <Link href={href} className="block">
          <div className="relative aspect-tour overflow-hidden">
            <Image
              src={tour.images?.[0] || 'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=600&q=80'}
              alt={tour.name} fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0" style={{ background:'linear-gradient(180deg,transparent 40%,rgba(10,22,40,0.92) 100%)' }} />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {tour.tag && <span className="badge-gold">{tour.tag}</span>}
            </div>
            {tour.instantConfirmation && (
              <div className="absolute top-3 right-3">
                <span className="badge-green">⚡ Instant</span>
              </div>
            )}

            {/* Price at bottom of image */}
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
              <div>
                <div className="text-white/70 text-xs font-medium">From</div>
                <div className="text-white font-black text-xl leading-none">
                  {convert(tour.pricing?.adult)}
                  <span className="text-xs font-medium text-white/70 ml-1">/person</span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-lg px-2 py-1">
                <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-white font-bold text-xs">{tour.rating}</span>
                <span className="text-white/60 text-xs">({(tour.reviewCount/1000).toFixed(1)}k)</span>
              </div>
            </div>
          </div>

          {/* Card content — click goes to detail */}
          <div className="p-4">
            <h3 className="font-bold text-brand-navy text-sm mb-1.5 line-clamp-2 group-hover:text-brand-gold transition-colors"
              style={{ fontFamily:"'Playfair Display',serif", fontSize:'15px' }}>
              {tour.name}
            </h3>
            <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-3">
              <span>⏱️ {tour.duration}</span>
              <span>•</span>
              <span>👥 Up to {tour.groupSize?.max}</span>
              {tour.cancellation?.includes('Free') && (
                <><span>•</span><span className="text-emerald-600">🔄 Free cancel</span></>
              )}
            </div>
          </div>
        </Link>

        {/* Book Now button — SEPARATE from Link, stops propagation */}
        <div className="px-4 pb-4 -mt-2">
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-500">📅 {tour.bookingCount?.toLocaleString()} booked</span>
            <button
              onClick={e => { e.preventDefault(); e.stopPropagation(); setShowBooking(true); }}
              className="btn-gold text-xs px-4 py-2">
              📋 Book Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
