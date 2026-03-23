// app/api/seo/pagespeed/route.js
// Fetches real Core Web Vitals from Google PageSpeed Insights
// Automatically used when GOOGLE_PAGESPEED_KEY is set in .env.local

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const url      = searchParams.get("url")      || process.env.NEXT_PUBLIC_SITE_URL || "https://dubairovers.com"
  const strategy = searchParams.get("strategy") || "mobile" // mobile | desktop

  // If no key set, return empty so dashboard uses demo data
  if (!process.env.GOOGLE_PAGESPEED_KEY) {
    return Response.json({ error: "no_key", message: "GOOGLE_PAGESPEED_KEY not set in .env.local" }, { status: 200 })
  }

  try {
    const res = await fetch(
      `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&key=${process.env.GOOGLE_PAGESPEED_KEY}&strategy=${strategy}&category=performance&category=seo&category=accessibility&category=best-practices`,
      { next: { revalidate: 3600 } } // cache 1 hour
    )
    const data = await res.json()

    if (data.error) {
      return Response.json({ error: "api_error", message: data.error.message }, { status: 200 })
    }

    const audits = data.lighthouseResult?.audits || {}
    const cats   = data.lighthouseResult?.categories || {}

    return Response.json({
      url,
      strategy,
      scores: {
        performance:    Math.round((cats.performance?.score    || 0) * 100),
        seo:            Math.round((cats.seo?.score            || 0) * 100),
        accessibility:  Math.round((cats.accessibility?.score  || 0) * 100),
        bestPractices:  Math.round((cats["best-practices"]?.score || 0) * 100),
      },
      metrics: {
        lcp:  audits["largest-contentful-paint"]?.displayValue  || "N/A",
        fid:  audits["max-potential-fid"]?.displayValue         || "N/A",
        cls:  audits["cumulative-layout-shift"]?.displayValue   || "N/A",
        fcp:  audits["first-contentful-paint"]?.displayValue    || "N/A",
        ttfb: audits["server-response-time"]?.displayValue      || "N/A",
        si:   audits["speed-index"]?.displayValue               || "N/A",
        tbt:  audits["total-blocking-time"]?.displayValue       || "N/A",
      },
      issues: {
        opportunities: Object.values(audits)
          .filter(a => a.details?.type === "opportunity" && a.score !== null && a.score < 0.9)
          .map(a => ({ title: a.title, description: a.description, score: a.score, savings: a.details?.overallSavingsMs }))
          .slice(0, 8),
        diagnostics: Object.values(audits)
          .filter(a => a.details?.type === "table" && a.score !== null && a.score < 0.9)
          .map(a => ({ title: a.title, description: a.description, score: a.score }))
          .slice(0, 6),
      },
      source: "google_pagespeed",
    })

  } catch (err) {
    return Response.json({ error: "fetch_failed", message: err.message }, { status: 200 })
  }
}
