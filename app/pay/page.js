"use client";
import { useSearchParams } from "next/navigation";

export default function Pay() {
  const params = useSearchParams();
  const client = params.get("client") || "client";
  const waMessage = `Salam, je veux payer 399 DH pour ${client} - RankPilot`;
  return (
    <div style={{maxWidth:"500px",margin:"40px auto",padding:"20px",fontFamily:"system-ui"}}>
      <h1 style={{fontSize:"26px",fontWeight:"900"}}>Paiement 399 DH</h1>
      <p style={{marginTop:"10px",background:"#111",color:"white",padding:"12px",borderRadius:"8px"}}>
        Site: <b style={{color:"#22c55e"}}>{client}</b>
      </p>
      <div style={{marginTop:"20px",padding:"16px",border:"1px solid #ddd",borderRadius:"12px"}}>
        <h3 style={{fontWeight:"800"}}>Wafacash / WhatsApp</h3>
        <p>Après paiement, envoie le reçu</p>
        <a href={`https://wa.me/212600000000?text=${encodeURIComponent(waMessage)}`} 
           style={{display:"block",marginTop:"10px",padding:"14px",background:"#25D366",color:"white",textAlign:"center",borderRadius:"10px",textDecoration:"none",fontWeight:"800"}}>
           Envoyer sur WhatsApp
        </a>
      </div>
      <a href="/" style={{display:"block",marginTop:"20px",textAlign:"center"}}>Retour</a>
    </div>
  )
}
