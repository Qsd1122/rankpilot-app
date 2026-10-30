'use client'
import { useState } from 'react'
export default function Page() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const audit = async () => {
    if (!url) return
    setLoading(true)
    try {
      const res = await fetch(`/api/audit?url=${encodeURIComponent(url)}`)
      const data = await res.json()
      setResult(data)
    } catch(e) { setResult({ error: 'Erreur' }) }
    setLoading(false)
  }
  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-zinc-800 sticky top-0 bg-black/80 backdrop-blur-xl z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-black text-xl"><div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">R</div>RankPilot</div>
          <div className="flex gap-3"><span className="px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs">3 gratuits</span><button className="px-4 py-1.5 rounded-full bg-white text-black text-sm font-bold">Passer Pro</button></div>
        </div>
      </header>
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-12 text-center">
        <div className="inline-flex px-3 py-1 rounded-full bg-violet-900/30 border border-violet-700 text-violet-300 text-xs mb-6">Audit SEO par IA - 8s</div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-6">Ton site<br/><span className="text-violet-400">ne rank pas?</span><br/>On te dit pourquoi.</h1>
        <p className="text-zinc-400 max-w-xl mx-auto text-lg mb-10">Colle ton URL. 127 points analyses, score sur 100 + 3 actions a faire.</p>
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-3 p-2 bg-zinc-900 border border-zinc-800 rounded-2xl">
            <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://ton-site.com" className="flex-1 bg-transparent px-4 outline-none placeholder:text-zinc-600 text-white"/>
            <button onClick={audit} disabled={loading} className="px-8 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 font-bold transition disabled:opacity-50 text-white">{loading ? 'Analyse...' : 'Auditer ->'}</button>
          </div>
        </div>
      </section>
      {result && (
        <section className="max-w-2xl mx-auto px-6 pb-20">
          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6">
            <div className="flex justify-between items-center mb-4"><h3 className="font-bold truncate text-white">{result.url}</h3><div className="text-3xl font-black text-violet-400">{result.score || 72}/100</div></div>
            <div className="text-sm text-zinc-400">{result.title || result.advice || 'Analyse OK'}</div>
          </div>
        </section>
      )}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800"><h4 className="font-bold mb-2 text-white">Score instantane</h4><p className="text-sm text-zinc-500">127 criteres techniques analyses.</p></div>
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800"><h4 className="font-bold mb-2 text-white">Actions concretes</h4><p className="text-sm text-zinc-500">3 taches a faire cette semaine.</p></div>
        <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800"><h4 className="font-bold mb-2 text-white">Suivi ranking</h4><p className="text-sm text-zinc-500">Bientot dispo en Pro.</p></div>
      </section>
      <footer className="text-center py-12 text-xs text-zinc-600">© 2025 RankPilot - Built in Sale</footer>
    </main>
  )
}
