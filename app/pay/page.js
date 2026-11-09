"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
function PayContent() {
  const params = useSearchParams();
  let client = params.get("client") || "Avito.ma";
  let score = params.get("score") || "73";
  try{ client = decodeURIComponent(client); }catch{}
  const msg = `Salam Ahmed, je veux payer 399 DH pour ${client} Score ${score}/100 - RankPilot.`;
  return (
    <div style={{minHeight:"100vh",background:"black",color:"white",fontFamily:"system-ui",padding:"20px"}}>
      <div style={{maxWidth:"520px",margin:"0 auto"}}>
        <div style={{display:"flex",gap:"15px",alignItems:"center"}}><h1 style={{fontSize:"46px",fontWeight:"900",color:"#22c55e",margin:0}}>{score}<span style={{fontSize:"20px"}}>/100</span></h1><div><h2 style={{fontSize:"18px",margin:0}}>Rapport Complet</h2><p style={{color:"#888",margin:0}}>{client}</p></div></div>
        <p style={{color:"#f87171",marginTop:"8px"}}>● 3 erreurs critiques à corriger</p>
        <div style={{marginTop:"15px",background:"#111",border:"1px solid #333",borderRadius:"12px",padding:"15px"}}>
          <div style={{background:"#000",padding:"12px",borderRadius:"8px",fontSize:"13px",lineHeight:"2"}}>
            <div>🔍 <b>Crawlability:</b> 12 pages bloquées robots.txt <span style={{color:"#f87171"}}> FAIL</span></div>
            <div>📑 <b>Indexation:</b> 8 pages non indexées Google <span style={{color:"#f87171"}}> FAIL</span></div>
            <div>⚡ <b>LCP:</b> 4.2s / FID: 210ms / CLS: 0.31 <span style={{color:"#fbbf24"}}> LENT</span></div>
            <div>🏷️ <b>Meta:</b> Title dupliqué, Description manquante</div>
            <div>🔗 <b>Liens:</b> 4 liens cassés (404)</div>
          </div>
        </div>
        <div style={{marginTop:"15px",background:"#111",border:"1px solid #22c55e",borderRadius:"12px",padding:"15px"}}>
          <h3 style={{fontWeight:"900",color:"#22c55e",margin:0}}>💳 Paiement 399DH - Wafacash</h3>
          <p style={{marginTop:"8px"}}>Nom: <b>Ahmed Afkir</b> - Tel: <b>212660460410</b></p>
          <a href={`https://wa.me/212660460410?text=${encodeURIComponent(msg)}`} style={{display:"block",marginTop:"12px",padding:"16px",background:"#25D366",color:"white",textAlign:"center",borderRadius:"12px",textDecoration:"none",fontWeight:"900"}}>✅ Envoyer reçu WhatsApp - {client} ({score}/100)</a>
        </div>
        <a href="/" style={{display:"block",marginTop:"20px",textAlign:"center",color:"#888",textDecoration:"none"}}>← Retour audit</a>
      </div>
    </div>
  )
}
export default function Pay(){ return <Suspense fallback={<div style={{padding:"20px",color:"white",background:"black"}}>Chargement...</div>}><PayContent/></Suspense> }
