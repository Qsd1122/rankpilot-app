"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PayContent() {
  const params = useSearchParams();
  const client = params.get("client") || "votre site";
  const waMessage = `Salam, je veux payer 399 DH pour ${client} - RankPilot`;
  
  return (
    <div style={{maxWidth:"500px",margin:"40px auto",padding:"20px",fontFamily:"system-ui"}}>
      <h1 style={{fontSize:"26px",fontWeight:"900"}}>Paiement 399 DH</h1>
      <p style={{marginTop:"10px",background:"#111",color:"white",padding:"12px",borderRadius:"8px"}}>
        Site: <b style={{color:"#22c55e"}}>{client}</b>
      </p>
      <div style={{marginTop:"20px",padding:"16px",border:"1px solid #ddd",borderRadius:"12px"}}>
        <h3 style={{fontWeight:"800"}}>Wafacash</h3>
        <p>Nom: Ahmed Afkir</p>
        <p>Tel: 212660460410</p>
        <a href={`https://wa.me/212660460410?text=${encodeURIComponent(waMessage)}`} 
           style={{display:"block",marginTop:"10px",padding:"14px",background:"#25D366",color:"white",textAlign:"center",borderRadius:"10px",textDecoration:"none",fontWeight:"800"}}>
           Envoyer reçu WhatsApp
        </a>
      </div>
      <a href="/" style={{display:"block",marginTop:"20px",textAlign:"center"}}>← Retour audit</a>
    </div>
  )
}

export default function Pay(){
  return (
    <Suspense fallback={<div style={{padding:"20px"}}>Chargement...</div>}>
      <PayContent />
    </Suspense>
  )
}
