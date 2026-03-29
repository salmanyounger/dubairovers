import { TOURS, BLOG_POSTS, TOUR_CATEGORIES, ATTRACTIONS } from '../data/tours';

export default function sitemap() {
  const baseUrl = 'https://dubairovers.com';
  const now     = new Date().toISOString();

  // Static pages
  const statics = [
    { url: baseUrl,              lastModified: now, changeFrequency: 'daily',   priority: 1.0 },
    { url: `${baseUrl}/tours`,   lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
    { url: `${baseUrl}/attractions`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/flights`, lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${baseUrl}/blog`,    lastModified: now, changeFrequency: 'daily',   priority: 0.8 },
    { url: `${baseUrl}/about`,   lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/affiliate`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/ib`,      lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${baseUrl}/terms`,   lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ];

  // Category pages
  const categories = TOUR_CATEGORIES.map(c => ({
    url:             `${baseUrl}/tours/${c.slug}`,
    lastModified:    now,
    changeFrequency: 'weekly',
    priority:        0.85,
  }));

  // Tour pages
  const tours = TOURS.map(t => ({
    url:             `${baseUrl}/tours/${t.category}/${t.slug}`,
    lastModified:    now,
    changeFrequency: 'weekly',
    priority:        0.9,
  }));

  // Blog pages
  const blogs = BLOG_POSTS.map(p => ({
    url:             `${baseUrl}/blog/${p.slug}`,
    lastModified:    p.publishedAt || now,
    changeFrequency: 'monthly',
    priority:        0.7,
  }));

  // Attraction pages
  const attractionPages = ATTRACTIONS.map(a => ({
    url:             `${baseUrl}/attractions/${a.slug}`,
    lastModified:    now,
    changeFrequency: 'weekly',
    priority:        0.75,
  }));

  return [...statics, ...categories, ...tours, ...blogs, ...attractionPages];
}
