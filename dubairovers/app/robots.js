export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow:     '/',
        disallow:  ['/admin', '/api/', '/admin/'],
      },
    ],
    sitemap: 'https://dubairovers.com/sitemap.xml',
    host:    'https://dubairovers.com',
  };
}
