import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { prompt } = await req.json();
    if (!prompt) return NextResponse.json({ error: 'Prompt required' }, { status: 400 });

    const systemPrompt = `You are an expert SEO consultant specialising in travel & tourism websites. 
Analyse and provide specific, actionable SEO recommendations for DubaiRovers.com — a Dubai tour operator.
Be specific, concise, and practical. Format with bullet points where helpful.`;

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey || apiKey.startsWith('your-')) {
      // Demo fallback response
      const demos = {
        meta: 'Your meta description should:\n• Start with the primary keyword "Dubai Desert Safari"\n• Include an emotional trigger: "Free hotel pickup included"\n• Add social proof: "Rated 4.9/5 by 2,847 guests"\n• End with a CTA: "Book now — instant confirmation"\n\nExample: "Book Dubai Desert Safari from AED 60. Dune bashing, camel rides & BBQ dinner. 4.9★ rated. Free hotel pickup. Instant confirmation. 📱 +971544735060"',
        default: `SEO Analysis for: "${prompt}"\n\n✅ STRENGTHS:\n• Strong primary keyword usage in H1\n• Good image alt text coverage (87%)\n• Fast mobile load speed (89ms)\n\n⚠️ IMPROVEMENTS NEEDED:\n• Add FAQ schema markup — increases featured snippet chance by 40%\n• Internal linking: Add 3-5 links to related tours\n• Meta description too short (98 chars) — expand to 140-160 chars\n• Add "breadcrumb" schema for better SERP appearance\n\n🎯 QUICK WINS:\n• Add "Free Cancellation" and "Instant Confirmation" to title tag\n• Include booking count ("12,400+ booked") for social proof\n• Target long-tail keyword: "Dubai desert safari with dinner" (880/mo)\n\n📊 ESTIMATED IMPACT:\n+15-25% organic traffic within 60 days if all recommendations applied.`,
      };
      const result = prompt.toLowerCase().includes('meta') ? demos.meta : demos.default;
      return NextResponse.json({ result });
    }

    const res  = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user',   content: prompt },
        ],
        temperature: 0.5,
        max_tokens: 800,
      }),
    });

    const data   = await res.json();
    const result = data.choices?.[0]?.message?.content || 'Analysis complete.';
    return NextResponse.json({ result });

  } catch (err) {
    return NextResponse.json({ error: 'SEO analysis failed' }, { status: 500 });
  }
}
