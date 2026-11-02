export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'

async function handleAudit(urlParam: string){
  let url = urlParam || ''
  if(!url) throw new Error('no url')
  if(url.startsWith('http://')) url = url.replace('http://','https://')
  if(!url.startsWith('http')) url = 'https://'+url

  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 RankPilotBot/1.0', 'Accept':'text/html' },
    redirect:'follow',
    cache:'no-store'
  })
  const html = await res.text()
  const title = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]?.trim() || 'No title'
  const h1 = html.match(/<h1[^>]*>([^<]+)<\/h1>/i)?.[1]?.trim() || ''
  return { url, title, h1, status: res.status, wordCount: html.split(/\s+/).length, ok:true }
}

export async function GET(req: NextRequest){
  try{
    const url = req.nextUrl.searchParams.get('url') || ''
    const data = await handleAudit(url)
    return NextResponse.json(data, {headers:{'Access-Control-Allow-Origin':'*'}})
  }catch(e:any){
    return NextResponse.json({ok:false, error:e.message}, {status:200, headers:{'Access-Control-Allow-Origin':'*'}})
  }
}

export async function POST(req: NextRequest){
  try{
    const body = await req.json().catch(()=>({}))
    const url = body.url || req.nextUrl.searchParams.get('url') || ''
    const data = await handleAudit(url)
    return NextResponse.json(data, {headers:{'Access-Control-Allow-Origin':'*'}})
  }catch(e:any){
    return NextResponse.json({ok:false, error:e.message}, {status:200})
  }
}
