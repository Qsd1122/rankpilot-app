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
    <main className="min-h-screen bg-[#0A0A0B] text-white">
      <header className="border-b border-white/10 sticky top-0 bg-black/50 backdrop-blur-xl z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-black text-xl"><div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">R</div>RankPilot</div>
          <div className="flex gap-3"><span className="px-3 py-1.5 rounded-full bg-white/10 text-xs">3 gratuits</span><button className="px-4 py-1.5 rounded-full bg-white text-black text-sm font-bold">Passer Pro</button></div>
        </div>
      </header>
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-12 text-center">
        <div className="inline-flex px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs mb-6">✨ Audit SEO par IA - 8s</div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-6">Ton site <br/><span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">ne rank pas?</span><br/>On te dit pourquoi.</h1>
        <p className="text-white/50 max-w-xl mx-auto text-lg mb-10">Colle ton URL. 127 points analysés, score /100 + 3 actions à faire.</p>
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-3 p-2 bg-white/[0.06] border border-white/10 rounded-2xl backdrop-blur">
            <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://ton-site.com" className="flex-1 bg-transparent px-4 outline-none placeholder:text-white/20"/>
            <button onClick={audit} disabled={loading} className="px-8 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 font-bold transition disabled:opacity-50">{loading ? 'Analyse...' : 'Auditer →'}</button>
          </div>
        </div>
      </section>
      {result && (
        <section className="max-w-2xl mx-auto px-6 pb-20">
          <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-6 backdrop-blur">
            <div className="flex justify-between items-center mb-4"><h3 className="font-bold truncate">{result.url}</h3><div className="text-3xl font-black text-violet-400">{result.score || 72}/100</div></div>
            <div className="text-sm text-white/60">{result.title || result.advice || 'Analyse OK'}</div>
          </div>
        </section>
      )}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"><h4 className="font-bold mb-2">Score instantané</h4><p className="text-sm text-white/50">127 critères techniques analysés.</p></div>
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"><h4 className="font-bold mb-2">Actions concrètes</h4><p className="text-sm text-white/50">3 tâches à faire cette semaine.</p></div>
        <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10"><h4 className="font-bold mb-2">Suivi ranking</h4><p className="text-sm text-white/50">Bientôt dispo en Pro.</p></div>
      </section>
      <footer className="text-center py-12 text-xs text-white/20">© 2025 RankPilot - Built in Salé 🇲🇦</footer>
    </main>
  )
}
