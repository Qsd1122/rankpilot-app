'use client'
import { useState } from 'react'

export default function Page(){
  const [url,setUrl]=useState('https://example.com')
  const [data,setData]=useState<any>(null)
  const [loading,setLoading]=useState(false)

  const run=async()=>{
    setLoading(true)
    try{
      const r=await fetch(`/api/audit?url=${encodeURIComponent(url)}`)
      const j=await r.json()
      setData(j)
    }catch(e:any){ setData({error:e.message}) }
    setLoading(false)
  }

  return(
    <main style={{minHeight:'100vh', background:'#050505', color:'white', padding:20, fontFamily:'monospace'}}>
      <h1 style={{color:'#7CFF7C'}}>RankPilot - FIX 405</h1>
      <p style={{color:'#888', fontSize:12}}>Build: {new Date().toISOString()}</p>
      <div style={{display:'flex', gap:10, marginTop:20}}>
        <input value={url} onChange={e=>setUrl(e.target.value)} style={{flex:1, padding:12, background:'#111', border:'1px solid #333', color:'white', borderRadius:8}}/>
        <button onClick={run} style={{background:'#7CFF7C', color:'black', border:'none', borderRadius:8, padding:'0 20px', fontWeight:800}}>{loading?'...':'Audit'}</button>
      </div>
      {data && <pre style={{marginTop:20, background:'#111', padding:12, borderRadius:8, color:'#0f0', overflow:'auto'}}>{JSON.stringify(data,null,2)}</pre>}
    </main>
  )
}
