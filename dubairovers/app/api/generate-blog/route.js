import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { topic } = await req.json();
    if (!topic) return NextResponse.json({ error: 'Topic required' }, { status: 400 });

    const prompt = `You are an expert SEO travel blogger for DubaiRovers.com — a premium Dubai tour operator.
Write a complete, SEO-optimised blog post about: "${topic}"

Return ONLY valid JSON (no markdown) with this exact structure:
{
  "title": "emoji + compelling H1 title",
  "excerpt": "2-sentence excerpt for blog cards",
  "content": "full blog post with markdown headings (##), bullet points, paragraphs — 600-900 words",
  "seoTitle": "SEO title max 60 chars",
  "seoDesc": "meta description max 160 chars with emotional trigger",
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "category": "Travel Tips|Tour Guides|Destination Guides",
  "readTime": "X min read"
}`;

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey || apiKey.startsWith('your-')) {
      // Gemini fallback
      const geminiKey = process.env.GEMINI_API_KEY;
      if (!geminiKey || geminiKey.startsWith('your-')) {
        return NextResponse.json({
          title: `🌟 The Complete Guide to ${topic} in Dubai 2025`,
          excerpt: `Everything you need to know about ${topic} in Dubai — from insider tips to the best prices. Updated for 2025 by the DubaiRovers team.`,
          content: `## Why Dubai for ${topic}?\n\nDubai has established itself as one of the world's top destinations for ${topic}. With its unique blend of ultramodern architecture, ancient Arabian culture, and year-round sunshine, Dubai creates the perfect setting.\n\n## Best Time to Experience ${topic} in Dubai\n\nThe ideal season runs from October to April when temperatures are pleasant (20–28°C). During peak winter season, you'll find the best conditions for all outdoor activities.\n\n## Top Tips from DubaiRovers\n\n• Book at least 48 hours in advance for popular experiences\n• Free hotel pickup is included with most DubaiRovers tours\n• WhatsApp us for instant quotes: +971544735060\n• All tours include multilingual guides\n\n## How to Book\n\nBooking with DubaiRovers is simple — browse our tours, select your date, and confirm via WhatsApp in seconds. Instant confirmation guaranteed.\n\n## Final Thoughts\n\nWhether you're a first-time visitor or a returning traveller, ${topic} in Dubai never disappoints. Book your experience today with DubaiRovers for the best prices and service.`,
          seoTitle: `${topic} Dubai 2025 | Complete Guide & Best Prices`,
          seoDesc: `Complete guide to ${topic} in Dubai 2025. Expert tips, best prices, and how to book. Updated by DubaiRovers — your trusted Dubai tour operator.`,
          tags: ['Dubai', topic, 'Travel Guide', '2025'],
          category: 'Travel Tips',
          readTime: '5 min read',
        });
      }

      // Use Gemini
      const gemRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      });
      const gemData = await gemRes.json();
      const text = gemData.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
      const clean = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(clean);
      return NextResponse.json(parsed);
    }

    // OpenAI
    const openAIRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });
    const openAIData = await openAIRes.json();
    const content    = openAIData.choices?.[0]?.message?.content || '{}';
    const clean      = content.replace(/```json|```/g, '').trim();
    const parsed     = JSON.parse(clean);
    return NextResponse.json(parsed);

  } catch (err) {
    console.error('Blog generation error:', err);
    return NextResponse.json({ error: 'Generation failed', message: err.message }, { status: 500 });
  }
}
