// Server component — handles notFound(), metadata, SEO schema
import { notFound } from 'next/navigation';
import { TOURS } from '../../../../../data/tours';
import TourDetailClient from './TourDetailClient';

// Force dynamic rendering — prevents static generation issues with complex tour data
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const tour = TOURS.find(t => t.slug === params.slug);
  if (!tour) return { title: 'Tour Not Found' };
  return {
    title: tour.seoTitle || `${tour.name} | DubaiRovers`,
    description: tour.seoDesc || tour.shortDesc,
    openGraph: { images: [{ url: tour.images?.[0] || '' }] },
  };
}

export default function TourDetailPage({ params }) {
  const tour = TOURS.find(t => t.slug === params.slug);
  if (!tour) notFound();
  return <TourDetailClient tour={tour} />;
}
