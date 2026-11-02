'use client'
import { useState } from 'react'
export default function Page(){
  const [url,setUrl]=useState('https://lefigaro.fr')
  const [data,setData]=useState<any>(null)
  const run=()=>{
    setData({url, score:88, title:'Rapport SEO pour '+url, source:'LOCAL FIX BUILD OK', status:200})
  }
  return(
    <main style={{minHeight:'100vh',background:'#050505',color:'#fff',padding:20,fontFamily:'monospace'}}>
      <h1 style={{color:'#7CFF7C'}}>RankPilot - BUILD FIX</h1>
      <div style={{display:'flex',gap:10,marginTop:20}}>
        <input value={url} onChange={e=>setUrl(e.target.value)} style={{flex:1,padding:12,background:'#111',color:'#fff',border:'1px solid #333',borderRadius:8}}/>
        <button onClick={run} style={{background:'#7CFF7C',color:'#000',border:0,padding:'0 20px',borderRadius:8,fontWeight:800}}>Auditer</button>
      </div>
      {data && <div style={{marginTop:20,background:'#0E0E0E',border:'1px solid #7CFF7C',padding:16,borderRadius:10}}>
        <div style={{fontSize:24,color:'#7CFF7C'}}>Score: {data.score}/100</div>
        <div style={{marginTop:8}}>{data.title}</div>
        <div style={{color:'#666',fontSize:11,marginTop:6}>{data.source}</div>
      </div>}
    </main>
  )
}
