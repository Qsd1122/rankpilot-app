'use client'
import { useState } from 'react'

export default function Page(){
  const [url,setUrl]=useState('')
  const [loading,setLoading]=useState(false)
  const [result,setResult]=useState<any>(null)

  const audit=async()=>{
    if(!url) return
    setLoading(true)
    try{
      const r=await fetch(`/api/audit?url=${encodeURIComponent(url)}`)
      setResult(await r.json())
    }catch{ setResult({error:'Erreur'}) }
    setLoading(false)
  }

  return(
    <main style={{minHeight:'100vh', background:'black', color:'white', fontFamily:'monospace, system-ui', padding:'0'}}>
      
      {/* LOGO COMME SUR TA CAPTURE */}
      <div style={{padding:'32px 20px 20px 20px'}}>
        <div style={{
          display:'inline-block',
          background:'black',
          border:'1px solid #1a1a1a',
          borderRadius:16,
          padding:'14px 26px',
          boxShadow:'0 0 60px rgba(124,255,124,0.35), 0 10px 40px rgba(124,255,124,0.2)',
          position:'relative'
        }}>
          <h1 style={{
            margin:0,
            fontSize:32,
            fontWeight:900,
            letterSpacing:1,
            color:'transparent',
            WebkitTextStroke:'2px #7CFF7C',
            textShadow:'0 0 10px rgba(124,255,124,0.8)',
            lineHeight:1
          }}>RankPilot</h1>
          {/* petites lignes glitch comme sur capture */}
          <div style={{display:'flex', gap:6, marginTop:8}}>
            <div style={{width:60, height:2, background:'#7CFF7C', opacity:0.8}}></div>
            <div style={{width:20, height:2, background:'#7CFF7C', opacity:0.4}}></div>
          </div>
          <div style={{width:16, height:2, background:'#7CFF7C', opacity:0.6, marginTop:4, transform:'skewX(-20deg)'}}></div>
        </div>
      </div>

      {/* INPUT COMME SUR TA CAPTURE */}
      <div style={{padding:'20px', display:'flex', gap:12, maxWidth:600}}>
        <input 
          value={url} 
          onChange={e=>setUrl(e.target.value)}
          placeholder="https://example.com"
          style={{
            flex:1,
            background:'black',
            border:'1px solid #7CFF7C',
            borderRadius:12,
            padding:'18px 20px',
            color:'white',
            outline:'none',
            fontSize:18,
            fontFamily:'system-ui'
          }}
        />
        <button 
          onClick={audit}
          disabled={loading}
          style={{
            background:'#8EFF8E',
            color:'black',
            border:'none',
            borderRadius:14,
            padding:'0 28px',
            fontWeight:700,
            fontSize:18,
            cursor:'pointer',
            minWidth:140,
            lineHeight:1.2
          }}
        >
          {loading ? '...' : <>Exécuter<br/>l'audit</>}
        </button>
      </div>

      {result && (
        <div style={{padding:'20px', maxWidth:600}}>
          <div style={{background:'#0a0a0a', border:'1px solid #222', borderRadius:12, padding:20}}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <b style={{color:'#7CFF7C'}}>{result.url}</b>
              <span style={{fontWeight:900, fontSize:22}}>{result.score||72}/100</span>
            </div>
            <div style={{color:'#666', marginTop:8, fontSize:14}}>{result.title||'Audit terminé'}</div>
          </div>
        </div>
      )}

    </main>
  )
}
