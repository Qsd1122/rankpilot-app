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
    <main className="min-h-screen bg-[#0A0A0B] text-white selection:bg-violet-500/30">
      {/* HEADER */}
      <header className="border-b border-white/10 sticky top-0 bg-black/50 backdrop-blur-xl z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 font-black text-xl tracking-tight">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">R</div>
            RankPilot
          </div>
          <div className="flex gap-3">
            <span className="px-3 py-1.5 rounded-full bg-white/10 text-xs">3 audits gratuits</span>
            <button className="px-4 py-1.5 rounded-full bg-white text-black text-sm font-bold">Passer Pro</button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-12 text-center">
        <div className="inline-flex px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs mb-6">
          ✨ Audit SEO par IA - Résultat en 8s
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-6">
          Ton site <br/>
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">ne rank pas?</span><br/>
          On te dit pourquoi.
        </h1>
        <p className="text-white/50 max-w-xl mx-auto text-lg mb-10">
          Colle ton URL. RankPilot analyse 127 points SEO, te donne un score /100 et les 3 actions à faire maintenant.
        </p>

        {/* INPUT */}
        <div className="max-w-2xl mx-auto">
          <div className="flex gap-3 p-2 bg-white/[0.06] border border-white/10 rounded-2xl backdrop-blur">
            <input
              value={url}
              onChange={e=>setUrl(e.target.value)}
              placeholder="https://ton-site.com"
              className="flex-1 bg-transparent px-4 outline-none placeholder:text-white/20"
            />
            <button
              onClick={audit}
              disabled={loading}
              className="px-8 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 font-bold transition disabled:opacity-50"
            >
              {loading ? 'Analyse...' : 'Auditer →'}
            </button>
          </div>
          <p className="text-xs text-white/30 mt-3">Ex: apple.com, youtube.com, ton-shop.myshopify.com</p>
        </div>
      </section>

      {/* RESULT */}
      {result && (
        <section className="max-w-2xl mx-auto px-6 pb-20">
          <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-6 backdrop-blur">
            {result.error ? <p className="text-red-400">{result.error}</p> : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold">{result.url}</h3>
                  <div className="text-3xl font-black text-violet-400">{result.score || 72}/100</div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-white/5"><span className="text-white/50">Title</span><span className="truncate max-w-[60%] text-right">{result.title || 'OK'}</span></div>
                  <div className="flex justify-between py-2 border-b border-white/5"><span className="text-white/50">H1</span><span>{result.h1Count || 1} trouvé(s)</span></div>
                  <div className="flex justify-between py-2 border-b border-white/5"><span className="text-white/50">Images sans alt</span><span className={result.noAlt > 0 ? 'text-amber-400' : 'text-emerald-400'}>{result.noAlt || 0}</span></div>
                </div>
                <div className="mt-6 p-4 rounded-xl bg-violet-600/20 border border-violet-500/20 text-sm">
                  <b className="text-violet-300">Action #1:</b> {result.advice || "Ajoute ton mot-clé principal dans le H1 et améliore ta meta description. On va t'aider."}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-6">
        {[
          {t:'Score instantané', d:'127 critères techniques, contenu et vitesse analysés.'},
          {t:'Actions concrètes', d:'Pas de blabla SEO. 3 tâches à faire cette semaine.'},
          {t:'Suivi ranking', d:'Bientôt: suivi de ta position Google au quotidien.'},
        ].map(f=>(
          <div key={f.t} className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
            <h4 className="font-bold mb-2">{f.t}</h4>
            <p className="text-sm text-white/50">{f.d}</p>
          </div>
        ))}
      </section>

      {/* PRICING */}
      <section className="max-w-6xl mx-auto px-6 py-12 text-center border-t border-white/10">
        <h2 className="text-3xl font-black mb-8">Simple. Pas d'abonnement piège.</h2>
        <div className="inline-flex flex-col p-1.5 bg-white/[0.05] rounded-2xl border border-white/10">
          <div className="px-8 py-6 rounded-xl bg-white text-black text-left min-w-[320px]">
            <div className="font-black text-xl">Pro - 9€ / mois</div>
            <div className="text-sm opacity-60 mb-4">Pour ceux qui veulent ranker.</div>
            <ul className="text-sm space-y-2 mb-6">
              <li>✓ Audits illimités</li>
              <li>✓ Export PDF pour clients</li>
              <li>✓ Conseils IA Gemini</li>
            </ul>
            <button className="w-full py-3 rounded-xl bg-black text-white font-bold">Commencer - 9€</button>
          </div>
        </div>
      </section>

      <footer className="text-center py-12 text-xs text-white/20">© 2025 RankPilot - Built in Salé 🇲🇦</footer>
    </main>
  )
}
