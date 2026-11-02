export const runtime='nodejs'
export async function GET(req:Request){const u=new URL(req.url).searchParams.get('url')||'https://lefigaro.fr';return Response.json({url:u,score:88,title:'Rapport pour '+u,status:200,source:'api-ok'})}
export async function POST(r:Request){return GET(r)}
