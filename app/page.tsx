'use client'
import { useState } from 'react'

export default function Page(){
  const [url,setUrl]=useState('https://apple.com')
  const [kw,setKw]=useState('')
  const [tab,setTab]=useState<'audit'|'keywords'>('audit')
  const [loading,setLoading]=useState(false)
  const [audit,setAudit]=useState<any>(null)

  const runAudit=async()=>{
    if(!url) return
    setLoading(true)
    try{
      const r=await fetch(`/api/audit?url=${encodeURIComponent(url)}`)
      const j=await r.json()
      setAudit(j)
    }catch(e){ setAudit(null) }
    setLoading(false)
  }

  const score = audit ? Math.min(95, 50 + (audit.title?10:0) + (audit.meta?10:0) + (audit.hasViewport?10:0) + (audit.h1?10:0) + (audit.wordCount>300?10:0)) : 0

  return(
    <main style={{minHeight:'100vh', background:'#050505', color:'white', padding:16, fontFamily:'monospace'}}>
      <div style={{maxWidth:900, margin:'0 auto'}}>
        <div style={{display:'flex', gap:10, alignItems:'center', marginBottom:20}}>
          <div style={{background:'black', border:'1px solid #222', borderRadius:14, padding:'10px 18px', boxShadow:'0 0 20px rgba(124,255,124,0.3)'}}>
            <h1 style={{margin:0, color:'#7CFF7C', fontSize:28, fontWeight:900, textShadow:'0 0 10px #7CFF7C'}}>RankPilot</h1>
            <div style={{fontSize:10, color:'#666'}}>PRO • Built in Salé</div>
          </div>
          <button onClick={()=>setTab('audit')} style={{padding:'8px 14px', borderRadius:10, border:'1px solid #333', background:tab==='audit'?'#7CFF7C':'#111', color:tab==='audit'?'black':'#888', fontWeight:800}}>AUDIT</button>
          <button onClick={()=>setTab('keywords')} style={{padding:'8px 14px', borderRadius:10, border:'1px solid #333', background:tab==='keywords'?'#7CFF7C':'#111', color:tab==='keywords'?'black':'#888', fontWeight:800}}>MOTS-CLÉS</button>
        </div>

        {tab==='audit' ? (
          <>
            <div style={{display:'flex', gap:10}}>
              <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://..." style={{flex:1, background:'#0A0A0A', border:'1px solid #333', borderRadius:12, padding:14, color:'white'}} />
              <button onClick={runAudit} style={{background:'#7CFF7C', color:'black', border:'none', borderRadius:12, padding:'0 20px', fontWeight:800}}>{loading?'...':'Exécuter l\'audit'}</button>
            </div>

            {audit && (
              <div style={{marginTop:16, display:'grid', gap:12}}>
                <div style={{background:'#0E0E0E', border:'1px solid #222', borderRadius:16, padding:16, display:'flex', justifyContent:'space-between'}}>
                  <div><div style={{fontSize:11, color:'#666'}}>SCORE SEO</div><div style={{fontSize:36, color:'#7CFF7C', fontWeight:900}}>{score}/100</div><div style={{fontSize:12, color:'#888'}}>{audit.title}</div></div>
                  <div style={{textAlign:'right', fontSize:12, color:'#888'}}><div>Mots: {audit.wordCount}</div><div>H2: {audit.h2Count}</div><div>Images: {audit.imgTotal} ({audit.imgWithoutAlt} sans alt)</div><div>Status: {audit.status}</div></div>
                </div>
                <div style={{background:'black', border:'1px solid #222', borderRadius:12, padding:12, fontSize:13, color:'#0f0', whiteSpace:'pre-wrap', overflowX:'auto'}}>{JSON.stringify(audit,null,2)}</div>
              </div>
            )}
          </>
        ) : (
          <div style={{background:'#0E0E0E', border:'1px solid #222', borderRadius:16, padding:16}}>
            <div style={{fontSize:12, color:'#7CFF7C', marginBottom:10}}>GÉNÉRATEUR DE MOTS-CLÉS PRO - on le branche demain avec DataForSEO</div>
            <div style={{display:'flex', gap:10}}>
              <input value={kw} onChange={e=>setKw(e.target.value)} placeholder="Ex: referencement" style={{flex:1, background:'#050505', border:'1px solid #333', borderRadius:12, padding:14, color:'white'}} />
              <button onClick={()=>{ if(kw) alert('On branchera les volumes réels demain - API prête: '+kw) }} style={{background:'#7CFF7C', color:'black', border:'none', borderRadius:12, padding:'0 20px', fontWeight:800}}>Générer</button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
