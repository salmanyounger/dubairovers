// app/api/seo/backlinks/route.js
// Ahrefs backlink data — only used in option4 mode

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const target = searchParams.get("target") || process.env.NEXT_PUBLIC_SITE_URL || "dubairovers.com"
  const clean  = target.replace(/https?:\/\//, "").replace(/\/$/, "")

  if (!process.env.AHREFS_API_KEY) {
    return Response.json({ error: "no_key", message: "AHREFS_API_KEY not set in .env.local" }, { status: 200 })
  }

  try {
    const headers = { Authorization: `Bearer ${process.env.AHREFS_API_KEY}` }

    // Fetch domain metrics (DR, backlinks, referring domains)
    const metricsRes = await fetch(
      `https://api.ahrefs.com/v3/site-explorer/domain-rating?target=${clean}&date=latest`,
      { headers }
    )
    const metrics = await metricsRes.json()

    // Fetch top backlinks
    const backlinksRes = await fetch(
      `https://api.ahrefs.com/v3/site-explorer/backlinks?target=${clean}&select=url_from,domain_from,ahrefs_rank_source,type,first_seen,last_seen&limit=20&order_by=ahrefs_rank_source:desc`,
      { headers }
    )
    const backlinks = await backlinksRes.json()

    // Fetch referring domains
    const refDomainsRes = await fetch(
      `https://api.ahrefs.com/v3/site-explorer/referring-domains?target=${clean}&select=domain,domain_rating,backlinks,dofollow&limit=20&order_by=domain_rating:desc`,
      { headers }
    )
    const refDomains = await refDomainsRes.json()

    return Response.json({
      target:          clean,
      domainRating:    metrics.domain?.domain_rating || 0,
      backlinksTotal:  metrics.domain?.backlinks || 0,
      refDomainsTotal: metrics.domain?.referring_domains || 0,
      backlinks:       backlinks.backlinks || [],
      refDomains:      refDomains.referring_domains || [],
      source:          "ahrefs",
    })

  } catch (err) {
    return Response.json({ error: "fetch_failed", message: err.message }, { status: 200 })
  }
}
