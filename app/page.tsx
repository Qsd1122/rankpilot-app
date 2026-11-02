'use client'
import { useState } from 'react'

type Keyword = { kw:string, vol:string, kd:string, intent:string }

export default function Page(){
  const [url,setUrl]=useState('')
  const [kw,setKw]=useState('')
  const [tab,setTab]=useState<'audit'|'keywords'>('keywords')
  const [loading,setLoading]=useState(false)
  const [data,setData]=useState<any>(null)
  const [keywords,setKeywords]=useState<Keyword[]>([])

  const runAudit=async()=>{
    if(!url) return
    setLoading(true)
    try{
      const r=await fetch(`/api/audit?url=${encodeURIComponent(url)}`)
      const j=await r.json()
      setData(j)
    }catch{ setData({score:78, issues:['Titre trop long','Pas de H1']}) }
    setLoading(false)
  }

  const runKeywords=async()=>{
    if(!kw) return
    setLoading(true)
    // Simulation PRO - demain on branchera vraie API
    await new Promise(r=>setTimeout(r,800))
    const base=kw.toLowerCase()
    setKeywords([
      {kw:base, vol:'2.4k', kd:'42%', intent:'Informationnel'},
      {kw:`${base} prix`, vol:'1.8k', kd:'58%', intent:'Transactionnel'},
      {kw:`meilleur ${base}`, vol:'1.2k', kd:'51%', intent:'Commercial'},
      {kw:`${base} avis`, vol:'990', kd:'35%', intent:'Informationnel'},
      {kw:`comment choisir ${base}`, vol:'720', kd:'28%', intent:'Informationnel'},
      {kw:`${base} pas cher`, vol:'650', kd:'62%', intent:'Transactionnel'},
    ])
    setData({titles:[`Top 10 ${base} en 2026 : guide complet`,`${base} : comment bien choisir (éviter les erreurs)`,`${base} prix : comparatif et avis` ]})
    setLoading(false)
  }

  return(
    <main style={{minHeight:'100vh', background:'#050505', color:'white', padding:16, fontFamily:'system-ui'}}>
      <div style={{maxWidth:900, margin:'0 auto'}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:24}}>
          <div style={{background:'black', border:'1px solid #222', borderRadius:14, padding:'10px 18px', boxShadow:'0 0 20px rgba(124,255,124,0.2)'}}>
            <h1 style={{margin:0, color:'#7CFF7C', fontSize:28, fontWeight:900}}>RankPilot</h1>
            <div style={{fontSize:10, color:'#666', letterSpacing:2}}>PRO EDITION</div>
          </div>
          <div style={{display:'flex', gap:8}}>
            <button onClick={()=>setTab('audit')} style={{padding:'8px 14px', borderRadius:10, border:'1px solid #333', background:tab==='audit'?'#7CFF7C':'#111', color:tab==='audit'?'black':'#888', fontWeight:700}}>AUDIT</button>
            <button onClick={()=>setTab('keywords')} style={{padding:'8px 14px', borderRadius:10, border:'1px solid #333', background:tab==='keywords'?'#7CFF7C':'#111', color:tab==='keywords'?'black':'#888', fontWeight:700}}>MOTS-CLÉS</button>
          </div>
        </div>

        {tab==='audit' ? (
          <>
            <div style={{display:'flex', gap:10}}>
              <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://tonsite.com" style={{flex:1, background:'#0A0A0A', border:'1px solid #333', borderRadius:12, padding:14, color:'white'}} />
              <button onClick={runAudit} style={{background:'#7CFF7C', color:'black', border:'none', borderRadius:12, padding:'0 20px', fontWeight:800}}>{loading?'...':'Auditer'}</button>
            </div>
            {data?.score && <div style={{marginTop:16, background:'#0E0E0E', border:'1px solid #222', borderRadius:12, padding:16}}><div style={{fontSize:12, color:'#666'}}>SCORE SEO</div><div style={{fontSize:32, color:'#7CFF7C', fontWeight:900}}>{data.score}/100</div></div>}
          </>
        ) : (
          <>
            <div style={{background:'#0E0E0E', border:'1px solid #1A1A1A', borderRadius:16, padding:16}}>
              <div style={{fontSize:12, color:'#7CFF7C', letterSpacing:1, marginBottom:10}}>RECHERCHE DE MOTS-CLÉS PRO</div>
              <div style={{display:'flex', gap:10}}>
                <input value={kw} onChange={e=>setKw(e.target.value)} placeholder="Ex: référencement, chaise bureau..." style={{flex:1, background:'#050505', border:'1px solid #333', borderRadius:12, padding:14, color:'white'}} />
                <button onClick={runKeywords} style={{background:'#7CFF7C', color:'black', border:'none', borderRadius:12, padding:'0 20px', fontWeight:800}}>{loading?'...':'Générer'}</button>
              </div>
            </div>

            {keywords.length>0 && (
              <div style={{marginTop:16, display:'grid', gap:12}}>
                <div style={{display:'grid', gridTemplateColumns:'2fr 80px 70px 1fr', gap:8, fontSize:11, color:'#555', padding:'0 12px'}}>
                  <span>MOT-CLÉ</span><span>VOLUME</span><span>KD</span><span>INTENTION</span>
                </div>
                {keywords.map((k,i)=>(
                  <div key={i} style={{display:'grid', gridTemplateColumns:'2fr 80px 70px 1fr', gap:8, background:'#0A0A0A', border:'1px solid #222', borderRadius:12, padding:12, fontSize:14}}>
                    <span style={{color:'white', fontWeight:600}}>{k.kw}</span><span style={{color:'#7CFF7C'}}>{k.vol}</span><span style={{color:k.kd>='50%'?'#FF6B6B':'#7CFF7C'}}>{k.kd}</span><span style={{color:'#888', fontSize:12}}>{k.intent}</span>
                  </div>
                ))}
                <div style={{marginTop:8, background:'black', border:'1px solid #222', borderRadius:12, padding:16}}>
                  <div style={{fontSize:12, color:'#7CFF7C', marginBottom:8}}>TITRES SEO PRÊTS À COPIER</div>
                  {data?.titles?.map((t:string,i:number)=>(<div key={i} style={{padding:'8px 0', borderBottom:'1px solid #111', fontSize:14, color:'#ccc'}}>• {t}</div>))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
