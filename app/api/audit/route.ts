export const runtime = 'nodejs'

export async function GET(){
  return new Response(JSON.stringify({
    url: "https://desk.com",
    title: "Desk.com - Audit OK",
    score: 88,
    status: 200,
    ok: true,
    source: "no-fetch-test",
    message: "Si tu vois ça, l'API marche, c'était le fetch qui bloquait"
  }), { headers: { "Content-Type":"application/json" } })
}

export async function POST(){
  return GET()
}
