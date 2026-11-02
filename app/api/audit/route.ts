import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest){
  let url = req.nextUrl.searchParams.get('url') || ''
  if(!url) return NextResponse.json({error:'no url'}, {status:400})
  
  // Force https si http
  if(url.startsWith('http://')) url = url.replace('http://','https://')
  if(!url.startsWith('http')) url = 'https://'+url

  try{
    const res = await fetch(url, {
      headers: {'User-Agent':'Mozilla/5.0 RankPilotBot'},
      redirect:'follow',
      cache:'no-store'
    })
    const html = await res.text()
    
    const getTag = (re:RegExp) => {
      const m = html.match(re)
      return m ? m[1].trim().substring(0,120) : ''
    }

    const title = getTag(/<title[^>]*>([^<]+)<\/title>/i)
    const meta = getTag(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) || getTag(/<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["']/i)
    const h1 = getTag(/<h1[^>]*>([^<]+)<\/h1>/i)
    const h2Count = (html.match(/<h2/gi)||[]).length
    const imgTotal = (html.match(/<img/gi)||[]).length
    const imgWithoutAlt = (html.match(/<img(?![^>]*alt=)[^>]*>/gi)||[]).length
    const wordCount = html.replace(/<[^>]*>/g,' ').split(/\s+/).filter(Boolean).length
    const hasViewport = /viewport/i.test(html)

    return NextResponse.json({
      url, title, meta, h1, h2Count, imgTotal, imgWithoutAlt, wordCount, hasViewport,
      status: res.status
    })
  }catch(e:any){
    // Ne jamais planter - renvoie quand même un JSON
    return NextResponse.json({
      url, title:'Erreur fetch - '+e.message, meta:'', h1:'', h2Count:0, imgTotal:0, imgWithoutAlt:0, wordCount:0, hasViewport:false, status:500, error: e.message
    })
  }
}
