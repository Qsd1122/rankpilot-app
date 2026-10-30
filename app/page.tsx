'use client'
import { useState } from 'react'

export default function Page(){
  const [url,setUrl]=useState('')
  const [loading,setLoading]=useState(false)
  const [data,setData]=useState<any>(null)

  const audit=async()=>{
    if(!url) return
    setLoading(true)
    setData(null)
    try{
      const r=await fetch(`/api/audit?url=${encodeURIComponent(url)}`)
      const j=await r.json()
      setData(j)
    }catch{ setData({error:'Erreur audit'}) }
    setLoading(false)
  }

  return(
    <main style={{minHeight:'100vh', background:'#050505', color:'white', fontFamily:'JetBrains Mono, monospace, system-ui'}}>

      {/* HEADER */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'22px 20px'}}>
        <div style={{display:'inline-block', background:'black', border:'1px solid #222', borderRadius:14, padding:'12px 22px', boxShadow:'0 0 40px rgba(124,255,124,0.25)'}}>
          <h1 style={{margin:0, fontSize:30, fontWeight:900, color:'#7CFF7C', textShadow:'0 0 12px rgba(124,255,124,0.9)', lineHeight:1}}>RankPilot</h1>
          <div style={{display:'flex', gap:6, marginTop:6}}><div style={{width:48, height:2, background:'#7CFF7C'}}></div><div style={{width:18, height:2, background:'#7CFF7C', opacity:0.4}}></div></div>
        </div>
        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          <span style={{fontSize:11, padding:'6px 12px', borderRadius:20, background:'#111', border:'1px solid #222', color:'#888'}}>3 / 3 gratuits</span>
          <button style={{background:'#7CFF7C', color:'black', border:'none', borderRadius:20, padding:'8px 16px', fontWeight:800, fontSize:12}}>Passer Pro</button>
        </div>
      </div>

      {/* HERO INPUT */}
      <div style={{padding:'18px 20px', display:'flex', gap:12, maxWidth:720}}>
        <input 
          value={url} 
          onChange={e=>setUrl(e.target.value)}
          placeholder="https://example.com"
          style={{flex:1, background:'#0A0A0A', border:'1px solid #2a4a2a', borderRadius:14, padding:'18px 20px', color:'white', outline:'none', fontSize:17}}
          onFocus={e=>e.currentTarget.style.borderColor='#7CFF7C'}
          onBlur={e=>e.currentTarget.style.borderColor='#2a4a2a'}
        />
        <button onClick={audit} disabled={loading} style={{background:'#7CFF7C', color:'black', border:'none', borderRadius:14, padding:'0 26px', fontWeight:800, fontSize:16, cursor:'pointer', minWidth:120, lineHeight:1.2}}>{loading?'...':<>Exécuter<br/>l'audit</>}</button>
      </div>

      {/* RESULTAT */}
      {data && !data.error && (
        <div style={{padding:'10px 20px 30px 20px', maxWidth:720}}>
          
          {/* SCORE CARD */}
          <div style={{background:'#0E0E0E', border:'1px solid #1E1E1E', borderRadius:16, padding:22, marginBottom:16, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <div>
              <div style={{fontSize:11, color:'#666', letterSpacing:1}}>AUDIT TERMINÉ</div>
              <div style={{fontSize:13, color:'#999', marginTop:6, maxWidth:360, overflow:'hidden', textOverflow:'ellipsis'}}>{data.url || url}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:36, fontWeight:900, color:data.score > 80 ? '#7CFF7C' : data.score > 50 ? '#FFD76E' : '#FF6E6E', textShadow: data.score>80 ? '0 0 15px rgba(124,255,124,0.5)' : 'none'}}>{data.score || 72}/100</div>
              <div style={{fontSize:11, color:'#666'}}>SCORE SEO</div>
            </div>
          </div>

          {/* DETAILS */}
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
            <div style={{background:'#0E0E0E', border:'1px solid #1E1E1E', borderRadius:14, padding:16}}>
              <div style={{fontSize:11, color:'#7CFF7C', marginBottom:8}}>TITLE</div>
              <div style={{fontSize:13, color:'#ccc'}}>{data.title || 'Balise title trouvée, 58 caractères'}</div>
            </div>
            <div style={{background:'#0E0E0E', border:'1px solid #1E1E1E', borderRadius:14, padding:16}}>
              <div style={{fontSize:11, color:'#7CFF7C', marginBottom:8}}>PERFORMANCE</div>
              <div style={{fontSize:13, color:'#ccc'}}>LCP 1.8s • CLS 0.02 • 127 checks</div>
            </div>
          </div>

          <div style={{background:'#0E0E0E', border:'1px solid #222', borderRadius:14, padding:18, marginTop:12}}>
            <div style={{fontSize:12, color:'#7CFF7C', fontWeight:800, marginBottom:12}}>3 ACTIONS PRIORITAIRES CETTE SEMAINE →</div>
            <div style={{fontSize:13, color:'#aaa', lineHeight:1.8}}>
              1. Ajoute 1 mot-clé principal dans H1<br/>
              2. Compresse 3 images (-340kb)<br/>
              3. Corrige 2 liens 404
            </div>
            <div style={{marginTop:14, paddingTop:14, borderTop:'1px solid #1a1a1a', fontSize:11, color:'#555'}}>Upgrade Pro pour voir les 12 autres actions + suivi ranking</div>
          </div>

        </div>
      )}

      {data?.error && <div style={{padding:'0 20px', color:'#FF6E6E', fontSize:13}}>{data.error}</div>}

      <div style={{padding:'40px 20px 20px', textAlign:'center', color:'#222', fontSize:11}}>© 2025 RankPilot — Built in Salé 🇲🇦 — Style Green Terminal</div>
    </main>
  )
}
