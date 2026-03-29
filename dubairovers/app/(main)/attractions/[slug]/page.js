import { notFound } from 'next/navigation';
import { ATTRACTIONS } from '../../../../data/tours';
import AttractionDetailClient from './AttractionDetailClient';

export async function generateMetadata({ params }) {
  const a = ATTRACTIONS.find(x => x.slug === params.slug);
  if (!a) return { title: 'Attraction Not Found' };
  return {
    title: `${a.name} Tickets | DubaiRovers`,
    description: `Book ${a.name} tickets from AED ${a.pricing.adult}. Skip the queue — instant e-tickets. ${a.description.slice(0, 100)}`,
  };
}

export async function generateStaticParams() {
  return ATTRACTIONS.map(a => ({ slug: a.slug }));
}

export default function AttractionPage({ params }) {
  const attraction = ATTRACTIONS.find(a => a.slug === params.slug);
  if (!attraction) notFound();
  return <AttractionDetailClient attraction={attraction} />;
}
