import { NextResponse } from "next/server"

const TOUR_IMAGES = {
  "Desert Safari":   "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&q=80",
  "Hot Air Balloon": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
  "Dhow Cruise":     "https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=1200&q=80",
  "Quad Bike":       "https://images.unsplash.com/photo-1571988840298-3b5301d5109b?w=1200&q=80",
  "Camel Riding":    "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1200&q=80",
  "City Tour":       "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=80",
}
const TOUR_MAP = {
  "Desert Safari":   { slug:"desert-safari-dubai",     name:"Desert Safari Dubai"     },
  "Hot Air Balloon": { slug:"hot-air-balloon-dubai",    name:"Hot Air Balloon Dubai"   },
  "Dhow Cruise":     { slug:"dhow-cruise-dubai",        name:"Dhow Cruise Dubai"       },
  "Quad Bike":       { slug:"quad-bike-dubai",          name:"Quad Bike Dubai"         },
  "Camel Riding":    { slug:"camel-riding-dubai",       name:"Camel Riding Dubai"      },
  "City Tour":       { slug:"private-city-tour-dubai",  name:"Private City Tour Dubai" },
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g,"").trim().replace(/\s+/g,"-").slice(0,60)
}

function templateGenerate({ topic, category, tourSlug, tourName, externalLinks, keywords }) {
  const img  = TOUR_IMAGES[category] || TOUR_IMAGES["Desert Safari"]
  const title = topic.charAt(0).toUpperCase() + topic.slice(1)
  const content = `
<p>Let me give you the real version of ${topic.toLowerCase()} — not the polished brochure version, but the one that actually helps you decide if it's right for you.</p>
<p>Having done ${tourName} more times than I can easily count, here's what I actually know.</p>
<h2>What makes it worth it</h2>
<p>${tourName} draws visitors from every corner of the world for good reason. The combination of Dubai's infrastructure investment and genuine natural beauty creates something that's genuinely hard to find anywhere else.</p>
<p>The logistics — pickups, guides, timing — are well-organized. What varies is your level of engagement. The people who get the most out of it stay present rather than spending the whole time documenting it.</p>
<h2>Practical things nobody tells you</h2>
<ul>
  <li><strong>Best season:</strong> November through March. April and October are manageable. May–September requires heat preparation.</li>
  <li><strong>Group size matters:</strong> Ask before booking. 6 people feels intimate. 30 does not.</li>
  <li><strong>Dietary needs:</strong> Mention at booking time — handled easily with notice, awkwardly without it.</li>
  <li><strong>Cash:</strong> Not necessary. Card payments work throughout.</li>
</ul>
<h2>How to book the right way</h2>
<p>Book direct rather than through aggregators. You get better communication, clearer cancellation terms, and someone to actually contact if anything needs adjusting.</p>
<p>Dubai Rovers runs <a href="/${tourSlug}">${tourName}</a> in small groups because the experience is better that way. If you want something that feels personal rather than processed, that's the version to book.</p>
${externalLinks ? `<p>For more on visiting Dubai: <a href="${externalLinks}" target="_blank" rel="noopener noreferrer">useful resource here</a>.</p>` : ""}
<p>Questions? WhatsApp us — a real person who has done this will reply.</p>`
  return {
    title:`${title}: The Honest Guide (2025)`,
    metaTitle:`${title} Dubai 2025 — Tips, Prices & What to Expect`,
    metaDescription:`Planning ${topic.toLowerCase()} in Dubai? Here's the honest version — practical tips and what to expect from people who do this every day.`,
    content:content.trim(), tags:[keywords||topic, `${category.toLowerCase()} dubai`,"dubai tours","dubai tips"],
    readTime:"6 min read", image:img, thumbImage:img.replace("w=1200","w=600"),
  }
}

async function aiGenerate({ topic, category, tourSlug, tourName, externalLinks, keywords, tone }) {
  const key = process.env.ANTHROPIC_API_KEY
  if (!key) throw new Error("ANTHROPIC_API_KEY not set in .env.local")
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method:"POST",
    headers:{"Content-Type":"application/json","x-api-key":key,"anthropic-version":"2023-06-01"},
    body:JSON.stringify({
      model:"claude-sonnet-4-20250514", max_tokens:4000,
      system:`You are a travel writer for Dubai Rovers. Write like a knowledgeable friend — honest, specific, conversational. NEVER use: "delve","embark","tapestry","unleash","comprehensive","In conclusion","It's worth noting","In the realm of","Multifaceted".`,
      messages:[{role:"user",content:`Write SEO blog for Dubai Rovers about: "${topic}". Tour: ${tourName} (/${tourSlug}). Keywords: ${keywords||topic}. External: ${externalLinks||"none"}. Tone: ${tone||"honest, practical"}. Length: 900-1100 words. HTML format. Respond ONLY valid JSON no markdown: {"title":"...","metaTitle":"...","metaDescription":"...","content":"...html...","tags":[],"readTime":"X min read"}`}]
    })
  })
  const d = await res.json()
  if (d.error) throw new Error(d.error.message)
  return JSON.parse((d.content?.[0]?.text||"").replace(/```json|```/g,"").trim())
}

export async function POST(req) {
  try {
    const { mode="free", ...params } = await req.json()
    const gen = mode==="ai" ? await aiGenerate(params) : templateGenerate(params)
    const img = TOUR_IMAGES[params.category] || TOUR_IMAGES["Desert Safari"]
    return NextResponse.json({ success:true, post:{
      id:Date.now(), slug:slugify(gen.title), title:gen.title, metaTitle:gen.metaTitle,
      metaDescription:gen.metaDescription, category:params.category,
      tourLink:`/${params.tourSlug||TOUR_MAP[params.category]?.slug}`,
      tourName:params.tourName||TOUR_MAP[params.category]?.name,
      readTime:gen.readTime||"6 min read", date:new Date().toISOString().split("T")[0],
      author:"Dubai Rovers Team", image:gen.image||img, thumbImage:gen.thumbImage||img.replace("w=1200","w=600"),
      tags:gen.tags||[], featured:false, status:"draft", views:0,
      externalLinks:params.externalLinks?[{text:params.externalLinks,url:params.externalLinks}]:[],
      content:gen.content, aiGenerated:mode==="ai", generatedAt:new Date().toISOString(),
    }})
  } catch (err) {
    return NextResponse.json({ success:false, error:err.message }, { status:500 })
  }
}
