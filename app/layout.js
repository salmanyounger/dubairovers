import './globals.css';

export const metadata = {
  metadataBase: new URL('https://dubairovers.com'),
  title: { default: 'DubaiRovers — UAE Tours, Desert Safari & Worldwide Experiences', template: '%s | DubaiRovers' },
  description: 'Discover the best UAE tours, desert safaris, city tours, and worldwide travel experiences with DubaiRovers. Book online or via WhatsApp +971544735060.',
  keywords: ['Dubai tours', 'UAE desert safari', 'Dubai city tour', 'Abu Dhabi tours', 'Dubai attractions', 'DubaiRovers'],
  authors: [{ name: 'DubaiRovers', url: 'https://dubairovers.com' }],
  creator: 'DubaiRovers',
  publisher: 'DubaiRovers',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: 'https://dubairovers.com',
    siteName: 'DubaiRovers',
    title: 'DubaiRovers — UAE Tours & Worldwide Travel',
    description: 'Book the best UAE tours and worldwide travel experiences. Desert safaris, city tours, attractions & more.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'DubaiRovers — UAE Tours' }],
  },
  twitter: { card: 'summary_large_image', title: 'DubaiRovers — UAE Tours', description: 'Best UAE tours & travel experiences', images: ['/og-image.jpg'] },
  alternates: { canonical: 'https://dubairovers.com', languages: { 'en': '/en', 'ar': '/ar' } },
  icons: { icon: '/favicon.ico', apple: '/apple-icon.png' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TravelAgency',
              name: 'DubaiRovers',
              url: 'https://dubairovers.com',
              logo: 'https://dubairovers.com/logo.png',
              description: 'Premium UAE tours and worldwide travel experiences',
              address: { '@type': 'PostalAddress', addressCountry: 'AE', addressLocality: 'Dubai' },
              telephone: '+971544735060',
              email: 'dbtis.com@gmail.com',
              sameAs: ['https://www.instagram.com/dubairovers', 'https://www.facebook.com/dubairovers'],
              priceRange: '$$',
              openingHours: 'Mo-Su 08:00-22:00',
            }),
          }}
        />
      {/* Preconnect to external domains for faster loading */}
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="dns-prefetch" href="https://images.unsplash.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
