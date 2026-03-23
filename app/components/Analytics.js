"use client";
import Script from "next/script";

// ─────────────────────────────────────────────────────────────
//  REPLACE THESE WITH YOUR REAL IDs
//  GA4:     Go to analytics.google.com → Admin → Data Streams → Measurement ID
//  Clarity: Go to clarity.microsoft.com → New Project → get Project ID
// ─────────────────────────────────────────────────────────────
const GA4_ID      = "G-XXXXXXXXXX";   // ← paste your GA4 Measurement ID
const CLARITY_ID  = "XXXXXXXXXX";     // ← paste your Clarity Project ID

export function Analytics() {
  // Don't load in development
  if (process.env.NODE_ENV !== "production") return null;

  return (
    <>
      {/* ── Google Analytics 4 ── */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA4_ID}', {
            page_path: window.location.pathname,
            anonymize_ip: true,
          });
        `}
      </Script>

      {/* ── Microsoft Clarity (free heatmaps + session recordings) ── */}
      <Script id="clarity-init" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_ID}");
        `}
      </Script>
    </>
  );
}
