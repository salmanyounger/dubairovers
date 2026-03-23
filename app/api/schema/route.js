import { NextResponse } from "next/server"
import { writeFile, readFile, mkdir } from "fs/promises"
import { join } from "path"

const DIR  = join(process.cwd(), "public")
const PATH = join(DIR, "dr-schema.json")

const FAQ_SCHEMA = (tourName, tourUrl) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": `What is included in ${tourName}?`,
      "acceptedAnswer": { "@type": "Answer", "text": `${tourName} includes hotel pickup and drop-off, professional English-speaking guide, all equipment, refreshments, and a 24/7 WhatsApp support line.` }},
    { "@type": "Question", "name": `How long does ${tourName} last?`,
      "acceptedAnswer": { "@type": "Answer", "text": `The standard ${tourName} duration is 3–6 hours depending on the package selected. Overnight packages are also available.` }},
    { "@type": "Question", "name": `Is ${tourName} safe for children?`,
      "acceptedAnswer": { "@type": "Answer", "text": `Yes, ${tourName} is family-friendly. Children aged 4 and above are welcome. Our guides are trained in first aid and safety protocols.` }},
    { "@type": "Question", "name": `What should I wear for ${tourName}?`,
      "acceptedAnswer": { "@type": "Answer", "text": "Comfortable clothing and closed-toe shoes are recommended. Sunscreen and sunglasses are advised for daytime tours." }},
    { "@type": "Question", "name": `How do I book ${tourName}?`,
      "acceptedAnswer": { "@type": "Answer", "text": `You can book ${tourName} directly on our website or via WhatsApp at +971544735060. Instant confirmation is provided for all bookings.` }},
    { "@type": "Question", "name": `Can I cancel or reschedule my ${tourName} booking?`,
      "acceptedAnswer": { "@type": "Answer", "text": "Free cancellation is available up to 24 hours before the tour start time. Rescheduling is available up to 12 hours before departure." }},
  ]
})

const ARTICLE_SCHEMA = (title, url, date) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": title,
  "image": "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&q=80",
  "author": { "@type": "Organization", "name": "Dubai Rovers", "url": "https://dubairovers.com" },
  "publisher": {
    "@type": "Organization", "name": "Dubai Rovers",
    "logo": { "@type": "ImageObject", "url": "https://dubairovers.com/logo.png" }
  },
  "datePublished": date || new Date().toISOString().split("T")[0],
  "dateModified":  new Date().toISOString().split("T")[0],
  "mainEntityOfPage": { "@type": "WebPage", "@id": `https://dubairovers.com${url}` },
  "description": `${title} — expert guide by Dubai Rovers. Tips, prices, and everything you need to know.`
})

const TOUR_PAGES = [
  { name:"Desert Safari",    url:"/desert-safari-dubai"    },
  { name:"Hot Air Balloon",  url:"/hot-air-balloon-dubai"  },
  { name:"Dhow Cruise",      url:"/dhow-cruise-dubai"      },
  { name:"Quad Bike",        url:"/quad-bike-dubai"        },
  { name:"Camel Riding",     url:"/camel-riding-dubai"     },
  { name:"City Tour",        url:"/private-city-tour-dubai"},
]
const BLOG_PAGES = [
  { title:"Desert Safari Dubai: The Honest Guide",         url:"/blog/desert-safari-dubai-honest-guide",  date:"2025-02-14" },
  { title:"Is Hot Air Balloon Dubai Worth It?",            url:"/blog/hot-air-balloon-dubai-worth-it",    date:"2025-01-28" },
  { title:"Dhow Cruise Dubai: What to Actually Expect",    url:"/blog/dhow-cruise-dubai-what-to-expect",  date:"2025-01-15" },
]

async function ensure() {
  try { await mkdir(DIR, { recursive: true }) } catch {}
  try { await readFile(PATH) } catch {
    await writeFile(PATH, JSON.stringify({ schemas: [] }, null, 2))
  }
}
async function read() {
  await ensure()
  try { return JSON.parse(await readFile(PATH, "utf-8")) }
  catch { return { schemas: [] } }
}

export async function GET() {
  return NextResponse.json(await read())
}

export async function POST(req) {
  try {
    const { action } = await req.json()
    const data = await read()

    if (action === "add_faq") {
      // Remove existing FAQ schemas
      data.schemas = data.schemas.filter(s => s.type !== "FAQPage")
      // Add FAQ to all 6 tour pages
      TOUR_PAGES.forEach(t => {
        data.schemas.push({ type:"FAQPage", page:t.url, schema: FAQ_SCHEMA(t.name, t.url), addedAt: new Date().toISOString() })
      })
    }

    if (action === "add_article") {
      data.schemas = data.schemas.filter(s => s.type !== "Article")
      BLOG_PAGES.forEach(b => {
        data.schemas.push({ type:"Article", page:b.url, schema: ARTICLE_SCHEMA(b.title, b.url, b.date), addedAt: new Date().toISOString() })
      })
    }

    if (action === "remove") {
      const { type } = await req.json().catch(() => ({}))
      data.schemas = data.schemas.filter(s => s.type !== action.type)
    }

    await writeFile(PATH, JSON.stringify(data, null, 2))
    return NextResponse.json({ success: true, schemas: data.schemas, added: data.schemas.length })
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
