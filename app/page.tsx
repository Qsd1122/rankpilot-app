'use client'
import { useState } from 'react'
export default function Page(){
  const [url,setUrl]=useState('http://apple.com')
  const [loading,setLoading]=useState(false)
  const [data,setData]=useState<any>(null)
  const [err,setErr]=useState('')
  const run=async()=>{
    setLoading(true); setErr('')
    try{
      const r=await fetch(`/api/audit?url=${encodeURIComponent(url)}`)
      const j=await r.json()
      if(j.error && !j.title) throw new Error(j.error)
      setData(j)
    }catch(e:any){ setErr('Erreur audit: '+e.message) }
    setLoading(false)
  }
  return(
    <main style={{minHeight:'100vh', background:'#050505', color:'white', padding:16, fontFamily:'monospace'}}>
      <div style={{maxWidth:800, margin:'0 auto'}}>
        <div style={{display:'flex', gap:12, alignItems:'center'}}>
          <div style={{background:'black', border:'1px solid #222', borderRadius:14, padding:'10px 18px', boxShadow:'0 0 20px rgba(124,255,124,0.3)'}}>
            <h1 style={{margin:0, color:'#7CFF7C', fontSize:28, fontWeight:900}}>RankPilot</h1>
          </div>
          <div style={{background:'#111', border:'1px solid #222', borderRadius:20, padding:'6px 14px', fontSize:12, color:'#888'}}>3 / 3 gratuits</div>
        </div>
        <div style={{marginTop:24, display:'flex', gap:10}}>
          <input value={url} onChange={e=>setUrl(e.target.value)} style={{flex:1, background:'#0A0A0A', border:'1px solid #333', borderRadius:12, padding:14, color:'white'}} />
          <button onClick={run} style={{background:'#7CFF7C', color:'black', border:'none', borderRadius:12, padding:'0 20px', fontWeight:800}}>{loading?'...':'Exécuter l\'audit'}</button>
        </div>
        {err && <div style={{marginTop:12, color:'#ff5555'}}>{err}</div>}
        {data && <pre style={{marginTop:16, background:'#0A0A0A', border:'1px solid #222', borderRadius:12, padding:12, color:'#0f0', fontSize:12, overflowX:'auto'}}>{JSON.stringify(data,null,2)}</pre>}
        <div style={{marginTop:24, fontSize:11, color:'#444', textAlign:'center'}}>© 2025 RankPilot - Built in Salé - Style Green Terminal</div>
      </div>
    </main>
  )
}
