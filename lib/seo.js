/**
 * DubaiRovers — SEO Utilities
 */

export function generateTourSchema(tour) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.name,
    description: tour.shortDesc || tour.description?.slice(0, 200),
    url: `https://dubairovers.com/tours/${tour.category}/${tour.slug}`,
    image: tour.images?.[0],
    touristType: 'General tourists',
    itinerary: {
      '@type': 'ItemList',
      itemListElement: tour.itinerary?.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.title,
        description: item.desc,
      })) || [],
    },
    offers: {
      '@type': 'Offer',
      price: tour.pricing?.adult,
      priceCurrency: tour.pricing?.currency || 'AED',
      availability: 'https://schema.org/InStock',
      validFrom: new Date().toISOString().split('T')[0],
    },
    aggregateRating: tour.reviewCount > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: tour.rating,
      reviewCount: tour.reviewCount,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
    provider: {
      '@type': 'TravelAgency',
      name: 'DubaiRovers',
      url: 'https://dubairovers.com',
      telephone: '+971544735060',
    },
  };
}

export function generateBlogSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `https://dubairovers.com/blog/${post.slug}`,
    image: post.image,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: post.author?.name || 'DubaiRovers',
    },
    publisher: {
      '@type': 'Organization',
      name: 'DubaiRovers',
      logo: { '@type': 'ImageObject', url: 'https://dubairovers.com/logo.png' },
    },
    keywords: post.tags?.join(', '),
  };
}

export function generateFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };
}

export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `https://dubairovers.com${item.url}`,
    })),
  };
}

export function generateTourMeta(tour) {
  return {
    title: tour.seoTitle || `${tour.name} | DubaiRovers`,
    description: tour.seoDesc || tour.shortDesc || `Book ${tour.name} with DubaiRovers. From AED ${tour.pricing?.adult}/person. Free hotel pickup. ⭐ ${tour.rating}/5 from ${tour.reviewCount} reviews.`,
    openGraph: {
      type: 'website',
      title: tour.seoTitle || tour.name,
      description: tour.seoDesc || tour.shortDesc,
      images: tour.images?.map(img => ({ url: img, width: 1200, height: 630 })) || [],
    },
  };
}
