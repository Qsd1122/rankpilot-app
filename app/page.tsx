'use client'
import { useState } from 'react'
export default function Page(){
  const [url,setUrl]=useState('https://desk.com')
  const [data,setData]=useState<any>(null)
  const [loading,setLoading]=useState(false)
  const run=async()=>{
    setLoading(true)
    const r=await fetch(`/api/audit?url=${encodeURIComponent(url)}`)
    const j=await r.json()
    setData(j)
    setLoading(false)
  }
  return(
    <main style={{minHeight:'100vh', background:'#050505', color:'white', padding:16, fontFamily:'monospace'}}>
      <div style={{maxWidth:700, margin:'0 auto'}}>
        <div style={{display:'flex', alignItems:'center', gap:12}}>
          <div style={{background:'black', border:'1px solid #222', borderRadius:14, padding:'10px 18px', boxShadow:'0 0 20px rgba(124,255,124,0.3)'}}>
            <h1 style={{margin:0, color:'#7CFF7C', fontSize:28}}>RankPilot</h1>
          </div>
          <div style={{background:'#111', borderRadius:20, padding:'6px 12px', fontSize:12, color:'#888'}}>3 / 3 gratuits</div>
          <div style={{marginLeft:'auto', background:'#7CFF7C', color:'black', borderRadius:20, padding:'8px 14px', fontSize:12, fontWeight:800}}>Passer Pro</div>
        </div>
        <div style={{marginTop:24, display:'flex', gap:10}}>
          <input value={url} onChange={e=>setUrl(e.target.value)} style={{flex:1, background:'#0A0A0A', border:'1px solid #333', borderRadius:12, padding:14, color:'white'}}/>
          <button onClick={run} style={{background:'#7CFF7C', color:'black', border:'none', borderRadius:12, padding:'0 18px', fontWeight:800}}>{loading?'...':'Exécuter l\'audit'}</button>
        </div>
        {data && (
          <div style={{marginTop:16, background:'#0E0E0E', border:'1px solid #222', borderRadius:12, padding:16}}>
            <div style={{color:'#7CFF7C', fontSize:24, fontWeight:900}}>Score: {data.score}/100</div>
            <div style={{color:'white', marginTop:8}}>Title: {data.title}</div>
            <div style={{color:'#888', fontSize:12, marginTop:8}}>URL: {data.url} | Status: {data.status} | Mots: {data.wordCount} | Source: {data.source}</div>
            <pre style={{marginTop:12, fontSize:11, color:'#0f0', overflow:'auto'}}>{JSON.stringify(data,null,2)}</pre>
          </div>
        )}
      </div>
    </main>
  )
}
