import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: 'URL manquante' }, { status: 400 });

    const res = await fetch(url, { headers: { 'User-Agent': 'RankPilot-Bot/1.0' } });
    const html = await res.text();

    const title = (html.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1] || '';
    const meta = (html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) || [])[1] || '';
    const h1 = (html.match(/<h1[^>]*>([^<]*)<\/h1>/i) || [])[1]?.trim() || '';
    const h2Count = (html.match(/<h2/gi) || []).length;
    const imgWithoutAlt = (html.match(/<img(?![^>]*alt=)[^>]*>/gi) || []).length;
    const imgTotal = (html.match(/<img/gi) || []).length;
    const wordCount = html.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length;
    const hasViewport = /name=["']viewport["']/.test(html);

    return NextResponse.json({ url, title, meta, h1, h2Count, imgWithoutAlt, imgTotal, wordCount, hasViewport, status: res.status });
  } catch (err: any) {
    return NextResponse.json({ error: 'Erreur serveur: ' + err.message }, { status: 500 });
  }
}
