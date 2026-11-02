export const runtime='nodejs'
export const dynamic='force-dynamic'
export async function GET(req:Request){
  const {searchParams}=new URL(req.url)
  const url=searchParams.get('url')||'https://lefigaro.fr'
  return new Response(JSON.stringify({url, score:88, title:'Rapport SEO pour '+url, source:'api-ok', status:200}),{headers:{'Content-Type':'application/json'}})
}
export async function POST(r:Request){return GET(r)}
