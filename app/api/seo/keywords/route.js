// app/api/seo/keywords/route.js
// DataForSEO keyword data — only used in option4 mode
// GET  = fetch saved keywords list
// POST = search for a specific keyword

export async function POST(request) {
  const { keywords, locationCode = 2784 } = await request.json() // 2784 = UAE

  if (!process.env.DATAFORSEO_LOGIN || !process.env.DATAFORSEO_PASSWORD) {
    return Response.json({ error: "no_credentials", message: "DataForSEO credentials not set in .env.local" }, { status: 200 })
  }

  const auth = Buffer.from(`${process.env.DATAFORSEO_LOGIN}:${process.env.DATAFORSEO_PASSWORD}`).toString("base64")

  try {
    // Get keyword search volume + CPC + competition
    const volRes = await fetch("https://api.dataforseo.com/v3/keywords_data/google/search_volume/live", {
      method: "POST",
      headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
      body: JSON.stringify([{
        keywords:      Array.isArray(keywords) ? keywords : [keywords],
        location_code: locationCode,
        language_code: "en",
      }]),
    })
    const volData = await volRes.json()

    // Get keyword difficulty
    const kdRes = await fetch("https://api.dataforseo.com/v3/dataforseo_labs/google/keyword_difficulty/live", {
      method: "POST",
      headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
      body: JSON.stringify([{
        keywords:      Array.isArray(keywords) ? keywords : [keywords],
        location_code: locationCode,
        language_code: "en",
      }]),
    })
    const kdData = await kdRes.json()

    const results = (volData.tasks?.[0]?.result || []).map(item => {
      const kdItem = kdData.tasks?.[0]?.result?.find(k => k.keyword === item.keyword)
      const monthly = item.monthly_searches || []
      return {
        keyword:        item.keyword,
        volume:         item.search_volume || 0,
        cpc:            item.cpc || 0,
        competition:    item.competition || 0,
        kd:             kdItem?.keyword_difficulty || 0,
        trend:          monthly.slice(-12).map(m => ({ month: `${m.year}-${m.month}`, value: m.search_volume })),
        source:         "dataforseo",
      }
    })

    return Response.json({ results, source: "dataforseo" })

  } catch (err) {
    return Response.json({ error: "fetch_failed", message: err.message }, { status: 200 })
  }
}

// Keyword suggestions / related keywords
export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const seed         = searchParams.get("seed") || "dubai desert safari"
  const locationCode = parseInt(searchParams.get("location") || "2784")

  if (!process.env.DATAFORSEO_LOGIN || !process.env.DATAFORSEO_PASSWORD) {
    return Response.json({ error: "no_credentials" }, { status: 200 })
  }

  const auth = Buffer.from(`${process.env.DATAFORSEO_LOGIN}:${process.env.DATAFORSEO_PASSWORD}`).toString("base64")

  try {
    const res = await fetch("https://api.dataforseo.com/v3/dataforseo_labs/google/related_keywords/live", {
      method: "POST",
      headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" },
      body: JSON.stringify([{
        keyword:       seed,
        location_code: locationCode,
        language_code: "en",
        limit:         20,
      }]),
    })
    const data = await res.json()
    return Response.json({ results: data.tasks?.[0]?.result || [], source: "dataforseo" })
  } catch (err) {
    return Response.json({ error: "fetch_failed", message: err.message }, { status: 200 })
  }
}
