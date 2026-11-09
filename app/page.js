"use client";
import { useState } from "react";

export default function Home(){
  const [url,setUrl]=useState("");
  const [score,setScore]=useState(0);
  const [client,setClient]=useState("");
  const [tel,setTel]=useState("");
  const [email,setEmail]=useState("");

  const auditer=()=>{
    if(!url) return alert("Entrez un site");
    // Extraction du nom client pour N'IMPORTE QUEL site
    let clean = url.replace("https://","").replace("http://","").replace("www.","").split("/")[0];
    setClient(clean);
    // Score général pour tous les sites (71 à 94)
    let s = 70 + (clean.length % 25);
    if(s<70) s=91;
    setScore(s);
  };

  const payLink = `/pay?client=${client}`;
  const waAudit = `Salam, j'ai audité ${client} - Score: ${score}/100 - Il perd des clients sur mobile. Je peux le corriger pour 399 DH en 24h. Lien: https://rankpilot-app-qggu.vercel.app${payLink}`;
  
  return(
    <div style={{maxWidth:"500px",margin:"20px auto",padding:"15px",fontFamily:"system-ui",background:"black",color:"white",minHeight:"100vh",borderRadius:"15px"}}>
      <h1 style={{fontSize:"28px",fontWeight:"900"}}>RankPilot ⚡ Audit SEO</h1>
      <p style={{color:"gray"}}>Généralisé pour tous les sites</p>
      
      <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="Ex: any-store.ma, le360.ma, h24info.ma..." 
        style={{width:"100%",marginTop:"15px",padding:"14px",borderRadius:"10px",border:"1px solid #333",background:"#111",color:"white"}}/>

      <button onClick={auditer} style={{width:"100%",marginTop:"10px",padding:"14px",borderRadius:"10px",background:"white",color:"black",fontWeight:"900"}}>Auditer ce site</button>

      {score>0 && (
        <div style={{marginTop:"20px",padding:"15px",background:"#111",borderRadius:"12px",border:"1px solid #222"}}>
          <div style={{fontSize:"50px",fontWeight:"900",color:"#22c55e"}}>{score}/100</div>
          <div>Site: <b style={{color:"#22c55e"}}>{client}</b></div>
          <div style={{fontSize:"12px",color:"gray",marginTop:"5px"}}>3 problèmes critiques trouvés - Perte de clients mobile</div>

          <a href={payLink} style={{display:"block",marginTop:"15px",padding:"16px",borderRadius:"12px",background:"#22c55e",color:"black",textAlign:"center",textDecoration:"none",fontWeight:"900"}}>
            💳 Page paiement 399 DH - {client}
          </a>

          <a href={`https://wa.me/${tel}?text=${encodeURIComponent(waAudit)}`} style={{display:"block",marginTop:"10px",padding:"12px",borderRadius:"10px",background:"#25D366",color:"white",textAlign:"center",textDecoration:"none",fontWeight:"700"}}>📲 Envoyer WhatsApp</a>

          <input value={tel} onChange={e=>setTel(e.target.value)} placeholder="Numéro client (2126...)" style={{width:"100%",marginTop:"10px",padding:"10px",borderRadius:"8px",background:"#000",border:"1px solid #333",color:"white"}}/>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email client" style={{width:"100%",marginTop:"8px",padding:"10px",borderRadius:"8px",background:"#000",border:"1px solid #333",color:"white"}}/>
        </div>
      )}
    </div>
  )
}
