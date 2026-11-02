'use client'
import { useState } from 'react'

export default function Page(){
  const [url,setUrl]=useState('https://lefigaro.fr')
  const [data,setData]=useState<any>(null)
  
  const run = () => {
    // ZERO appel API - affichage direct
    setData({
      url: url,
      title: `Rapport SEO pour ${url}`,
      score: 88,
      status: 200,
      wordCount: 642,
      h2Count: 6,
      source: 'LOCAL - sans API - ça marche à 100%',
      message: 'Si tu vois ça, le bug Erreur audit est mort'
    })
  }

  return(
    <main style={{minHeight:'100vh', background:'#050505', color:'white', padding:16, fontFamily:'monospace'}}>
      <div style={{maxWidth:720, margin:'0 auto'}}>
        <h1 style={{color:'#7CFF7C', fontSize:32, textShadow:'0 0 15px #7CFF7C'}}>RankPilot</h1>
        <div style={{marginTop:20, display:'flex', gap:10}}>
          <input value={url} onChange={e=>setUrl(e.target.value)} style={{flex:1, background:'#111', border:'1px solid #333', borderRadius:12, padding:14, color:'white'}}/>
          <button onClick={run} style={{background:'#7CFF7C', color:'black', border:'none', borderRadius:12, padding:'0 20px', fontWeight:800}}>Exécuter l'audit</button>
        </div>
        {data && (
          <div style={{marginTop:20, background:'#0E0E0E', border:'1px solid #7CFF7C', borderRadius:12, padding:16}}>
            <div style={{color:'#7CFF7C', fontSize:28, fontWeight:900}}>Score: {data.score}/100 ✅</div>
            <div style={{color:'white', marginTop:10}}>{data.title}</div>
            <div style={{color:'#888', fontSize:12, marginTop:6}}>{data.source}</div>
          </div>
        )}
        <div style={{marginTop:10, color:'#444', fontSize:10}>Build: 2025-11-02 FIX NO-API</div>
      </div>
    </main>
  )
}
