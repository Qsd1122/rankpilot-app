"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PayContent() {
  const params = useSearchParams();
  const client = params.get("client") || "votre site";
  const msg = `Salam Ahmed, je veux payer 399 DH pour ${client} - RankPilot. J'envoie le recu Wafacash maintenant.`;
  
  return (
    <div style={{minHeight:"100vh",background:"black",color:"white",fontFamily:"system-ui",padding:"20px"}}>
      <div style={{maxWidth:"520px",margin:"0 auto"}}>
        <h1 style={{fontSize:"28px",fontWeight:"900"}}>Rapport Complet - {client}</h1>
        <p style={{color:"#22c55e",marginTop:"5px"}}>Score: 73/100 - 3 erreurs critiques</p>
        
        <div style={{marginTop:"15px",background:"#111",border:"1px solid #333",borderRadius:"12px",padding:"15px"}}>
          <h3 style={{fontWeight:"900",color:"white"}}>Site: <span style={{color:"#22c55e"}}>{client}</span></h3>
          
          <div style={{marginTop:"12px",background:"#000",padding:"12px",borderRadius:"8px",fontSize:"13px",lineHeight:"2"}}>
            <div>🔍 <b>Crawlability:</b> 12 pages bloquées robots.txt <span style={{color:"#f87171"}}>FAIL</span></div>
            <div>📑 <b>Indexation:</b> 8 pages non indexées Google <span style={{color:"#f87171"}}>FAIL</span></div>
            <div>⚡ <b>LCP:</b> 4.2s / FID: 210ms / CLS: 0.31 <span style={{color:"#fbbf24"}}>LENT</span></div>
            <div>🏷️ <b>Meta:</b> Title dupliqué, Description manquante</div>
            <div>🔗 <b>Liens:</b> 4 liens cassés (404)</div>
          </div>

          <h3 style={{marginTop:"20px",fontWeight:"800",color:"white"}}>Ce que je corrige pour 399DH:</h3>
          <div style={{fontSize:"13px",marginTop:"8px",lineHeight:"1.8",color:"#ccc"}}>
            ✅ Débloquer crawl robots.txt<br/>
            ✅ Forcer indexation 8 pages<br/>
            ✅ Optimiser LCP {'<'}2.5s + CLS {'<'}0.1<br/>
            ✅ Réécrire Title + Meta Description<br/>
            ✅ Corriger 4 liens 404<br/>
            ✅ Rapport final 24h
          </div>
        </div>

        <div style={{marginTop:"15px",background:"#111",border:"1px solid #22c55e",borderRadius:"12px",padding:"15px"}}>
          <h3 style={{fontWeight:"900",color:"#22c55e"}}>💳 Paiement Wafacash</h3>
          <p style={{marginTop:"8px",color:"white"}}>Nom: <b>Ahmed Afkir</b></p>
          <p style={{color:"white"}}>Tel: <b>212660460410</b></p>
          <p style={{color:"white"}}>Montant: <b>399 DH</b></p>
          <a href={`https://wa.me/212660460410?text=${encodeURIComponent(msg)}`} 
             style={{display:"block",marginTop:"12px",padding:"16px",background:"#25D366",color:"white",textAlign:"center",borderRadius:"12px",textDecoration:"none",fontWeight:"900",fontSize:"16px"}}>
             ✅ Envoyer reçu WhatsApp
          </a>
          <p style={{fontSize:"11px",color:"gray",textAlign:"center",marginTop:"8px"}}>Après paiement, correction en 24h garantie</p>
        </div>

        <a href="/" style={{display:"block",marginTop:"20px",textAlign:"center",color:"#888",textDecoration:"none"}}>← Retour audit</a>
      </div>
    </div>
  )
}
export default function Pay(){
  return <Suspense fallback={<div style={{padding:"20px",color:"white",background:"black"}}>Chargement rapport...</div>}><PayContent/></Suspense>
}
