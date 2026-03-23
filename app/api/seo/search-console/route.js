// app/api/seo/search-console/route.js
// Fetches real data from Google Search Console
// Automatically used when GOOGLE_SC_CLIENT_ID is set in .env.local

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const days = parseInt(searchParams.get("days") || "28")
  const type = searchParams.get("type") || "query" // query | page | country | device

  // If no credentials set, return empty so dashboard uses demo data
  if (!process.env.GOOGLE_SC_CLIENT_ID || !process.env.GOOGLE_SC_CLIENT_SECRET || !process.env.GOOGLE_SC_REFRESH_TOKEN) {
    return Response.json({ error: "no_credentials", message: "Google SC credentials not set in .env.local" }, { status: 200 })
  }

  try {
    // Step 1: Get fresh access token using refresh token
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id:     process.env.GOOGLE_SC_CLIENT_ID,
        client_secret: process.env.GOOGLE_SC_CLIENT_SECRET,
        refresh_token: process.env.GOOGLE_SC_REFRESH_TOKEN,
        grant_type:    "refresh_token",
      }),
    })
    const tokenData = await tokenRes.json()
    if (!tokenData.access_token) {
      return Response.json({ error: "token_failed", message: "Could not get access token. Check your credentials." }, { status: 200 })
    }

    const endDate   = new Date().toISOString().split("T")[0]
    const startDate = new Date(Date.now() - days * 86400000).toISOString().split("T")[0]
    const siteUrl   = process.env.GOOGLE_SC_SITE_URL || "https://dubairovers.com"

    // Step 2: Query Search Console
    const scRes = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
      {
        method: "POST",
        headers: {
          Authorization:  `Bearer ${tokenData.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate,
          endDate,
          dimensions: [type],
          rowLimit:   100,
          startRow:   0,
        }),
      }
    )
    const scData = await scRes.json()

    // Step 3: Also get summary totals
    const totalsRes = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
      {
        method: "POST",
        headers: {
          Authorization:  `Bearer ${tokenData.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ startDate, endDate, rowLimit: 1 }),
      }
    )
    const totalsData = await totalsRes.json()

    return Response.json({
      rows:    scData.rows || [],
      totals:  totalsData.rows?.[0] || null,
      period:  { startDate, endDate, days },
      source:  "google_search_console",
    })

  } catch (err) {
    return Response.json({ error: "fetch_failed", message: err.message }, { status: 200 })
  }
}
