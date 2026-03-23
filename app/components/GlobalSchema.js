"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const BASE = "https://dubairovers.com";

// ── WebSite Schema (sitelinks search box for Google) ──
const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Dubai Rovers",
  "url": BASE,
  "potentialAction": {
    "@type": "SearchAction",
    "target": { "@type": "EntryPoint", "urlTemplate": `${BASE}/tours?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
};

// ── LocalBusiness Schema ──
const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "TouristInformationCenter",
  "name": "Dubai Rovers — Best Tours in Dubai",
  "description": "Dubai's top-rated tour operator. Desert safaris, hot air balloons, dhow cruises, and more. Hotel pickup included.",
  "url": BASE,
  "telephone": "+971544735060",
  "email": "info@dubairovers.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Sheikh Zayed Road",
    "addressLocality": "Dubai",
    "addressRegion": "Dubai",
    "addressCountry": "AE",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 25.2048,
    "longitude": 55.2708,
  },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], "opens": "08:00", "closes": "22:00" }
  ],
  "priceRange": "AED 149 – AED 999",
  "currenciesAccepted": "AED, USD",
  "paymentAccepted": "Cash, Credit Card, WhatsApp Transfer",
  "image": `${BASE}/og-image.jpg`,
  "sameAs": [
    "https://www.instagram.com/dubairovers",
    "https://www.facebook.com/dubairovers",
    "https://wa.me/971544735060",
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "847",
    "bestRating": "5",
  },
};

// ── Person Schema (Salman Ali) ──
const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Salman Ali",
  "jobTitle": "Tour Guide & Web Developer",
  "description": "Dubai-based tour guide and web developer. Founder of Dubai Rovers, SalmanFX, and ARCHAI.",
  "url": BASE,
  "telephone": "+971544735060",
  "address": { "@type": "PostalAddress", "addressLocality": "Dubai", "addressCountry": "AE" },
  "sameAs": [`${BASE}/webbuilder`, `${BASE}/salmanfx`],
  "knowsAbout": ["Dubai tours", "Forex Expert Advisors", "Web Development", "Villa Design", "Real Estate"],
};

// ── Schema per route ──
function getSchemaForPath(pathname) {
  const schemas = [WEBSITE_SCHEMA];

  if (pathname === "/" || pathname.startsWith("/tours")) {
    schemas.push(LOCAL_BUSINESS_SCHEMA);
  }

  if (pathname.startsWith("/webbuilder") || pathname.startsWith("/hire")) {
    schemas.push({
      ...PERSON_SCHEMA,
      "@type": "ProfessionalService",
      "name": "Salman Ali — Dubai Web Developer",
      "description": "Custom React & Next.js websites for Dubai businesses. Tourism, restaurant, real estate, and more.",
      "priceRange": "AED 1,200 – AED 50,000",
    });
  }

  if (pathname.startsWith("/salmanfx")) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "MM FLIP CODEPRO — Forex Expert Advisor",
      "description": "Dubai-built Forex EA using Parabolic SAR strategy with advanced money management. For MT4 and MT5.",
      "brand": { "@type": "Brand", "name": "SalmanFX" },
      "offers": {
        "@type": "AggregateOffer",
        "lowPrice": "299",
        "highPrice": "1499",
        "priceCurrency": "AED",
        "availability": "https://schema.org/InStock",
      },
      "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.8", "reviewCount": "124" },
    });
  }

  if (pathname.startsWith("/archai")) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "ARCHAI — AI Villa Design Tool",
      "description": "Free AI-powered villa design wizard for Pakistan and Gulf markets. Floor plans, cost estimates, AI render prompts.",
      "applicationCategory": "DesignApplication",
      "operatingSystem": "Web Browser",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "PKR" },
      "url": `${BASE}/archai`,
    });
  }

  if (pathname.startsWith("/properties")) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      "name": "Dubai Properties — PropCompare Platform",
      "description": "Compare Dubai, Abu Dhabi, Sharjah, and RAK properties. AI matching, mortgage calculator, Golden Visa checker.",
      "url": `${BASE}/properties`,
      "areaServed": { "@type": "Country", "name": "United Arab Emirates" },
    });
  }

  return schemas;
}

export function GlobalSchema() {
  const pathname = usePathname();

  useEffect(() => {
    const schemas = getSchemaForPath(pathname);

    // Remove old schemas
    document.querySelectorAll("script[data-schema]").forEach(el => el.remove());

    // Add new schemas
    schemas.forEach((schema, i) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-schema", `global-${i}`);
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    });

    return () => {
      document.querySelectorAll("script[data-schema]").forEach(el => el.remove());
    };
  }, [pathname]);

  return null;
}
