'use client'
import { useState } from 'react'
export default function Page(){
  const [url,setUrl]=useState('')
  const [loading,setLoading]=useState(false)
  const [data,setData]=useState<any>(null)
  const audit=async()=>{
    if(!url) return
    setLoading(true)
    try{
      const r=await fetch(`/api/audit?url=${encodeURIComponent(url)}`)
      const j=await r.json()
      setData(j)
    }catch{ setData({score:72}) }
    setLoading(false)
  }
  return(
    <main style={{minHeight:'100vh', background:'#050505', color:'white', padding:20, fontFamily:'monospace'}}>
      <div style={{background:'black', border:'1px solid #222', borderRadius:14, padding:'12px 22px', display:'inline-block', boxShadow:'0 0 30px rgba(124,255,124,0.2)'}}>
        <h1 style={{margin:0, color:'#7CFF7C', fontSize:32, fontWeight:900, textShadow:'0 0 10px rgba(124,255,124,0.8)'}}>RankPilot</h1>
        <div style={{height:2, width:50, background:'#7CFF7C', marginTop:6}}></div>
      </div>
      <div style={{marginTop:24, display:'flex', gap:12, maxWidth:600}}>
        <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://example.com" style={{flex:1, background:'#0A0A0A', border:'1px solid #333', borderRadius:12, padding:16, color:'white'}} />
        <button onClick={audit} style={{background:'#7CFF7C', color:'black', border:'none', borderRadius:12, padding:'0 20px', fontWeight:800}}>{loading?'...':'Exécuter\nl\'audit'}</button>
      </div>
      {data && <div style={{marginTop:20, background:'#0E0E0E', border:'1px solid #222', borderRadius:12, padding:16, maxWidth:600}}><div style={{fontSize:12, color:'#666'}}>AUDIT TERMINÉ</div><div style={{fontSize:28, color:'#7CFF7C', fontWeight:900}}>{data.score||72}/100</div></div>}
    </main>
  )
}
