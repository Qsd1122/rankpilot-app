export const runtime = 'edge'
import { NextResponse } from 'next/server'

const BOTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/122.0.0.0 Safari/537.36',
  'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
  'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
]

function decode(s){ return s ? s.replace(/&#(\d+);/g,(_,d)=>String.fromCharCode(d)).replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&#039;/g,"'").replace(/&apos;/g,"'") : '' }

export async function GET(req){
  const u = new URL(req.url)
  let url = u.searchParams.get('url') || 'wikipedia.org'
  if(!url.startsWith('http')) url='https://'+url
  const start=Date.now()
  
  for(let bot of BOTS){
    try{
      const r = await fetch(url, {
        headers: {
          'User-Agent': bot,
          'Accept': 'text/html,application/xhtml+xml',
          'Accept-Language': 'en-US,en;q=0.9,fr-FR;q=0.8',
          'Referer': 'https://www.google.com/',
          'Cache-Control': 'no-cache'
        },
        redirect:'follow',
        cf: { cacheTtl: 0 }
      })
      const raw = await r.text()
      
      // Detecte blocage
      const isBlocked = raw.length < 3000 || /blocked|access denied|Attention Required|Pardon Our Interruption/i.test(raw)
      if(isBlocked && bot !== BOTS[BOTS.length-1]) continue // essaie bot suivant

      const title = decode((raw.match(/<title[^>]*>(.*?)<\/title>/is)||[])[1]||'').trim().slice(0,120)
      const desc = decode(raw.match(/name=["']description["'] content=["'](.*?)["']/i)?.[1] || raw.match(/property=["']og:description["'] content=["'](.*?)["']/i)?.[1] || '')
      const ogImage = raw.match(/property=["']og:image["'] content=["'](.*?)["']/i)?.[1] || ''
      const h1 = (raw.match(/<h1/gi)||[]).length
      const h2 = (raw.match(/<h2/gi)||[]).length
      const words = raw.replace(/<[^>]*>/g,' ').split(/\s+/).filter(w=>w.length>2).length
      
      let score=50
      const checks=[]
      const add=(ok,label,pts)=>{ checks.push({ok,label}); if(ok) score+=pts }
      add(r.ok,`Status ${r.status}`,10)
      add(title.length>=10,`Title ${title.length} chars`,10)
      add(desc.length>=30,`Desc ${desc.length} chars`,10)
      add(h1>=1,`H1 ${h1}`,8)
      add(words>100,`Contenu ${words} mots`,10)
      add(!!ogImage,`OG Image`,5)
      add(!isBlocked,`Not Blocked (${bot.slice(0,20)}...)`,7)
      score=Math.min(98,score)

      return NextResponse.json({
        ok:true, url, status:r.status, time:Date.now()-start,
        title: isBlocked ? `Site protégé [${r.status}] - ${url}` : title,
        desc: isBlocked ? 'Ce site bloque les audits datacenter. C’est une protection anti-bot forte, bon signal sécurité mais bloque les crawlers SEO.' : desc,
        ogImage, h1, h2, words, score: isBlocked ? 72 : score, checks,
        source: isBlocked ? 'blocked-v5' : `live-v5-${bot.includes('bing')?'bingbot':bot.includes('Google')?'googlebot':'chrome'}`,
        blocked: isBlocked, botUsed: bot
      })
    }catch(e){ continue }
  }
  return NextResponse.json({ok:false, url, time:Date.now()-start, score:0, error:'Tous les bots bloqués', source:'error-v5'})
}
