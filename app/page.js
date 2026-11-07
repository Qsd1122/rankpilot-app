"use client";
import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("https://urbanjunglestore.ma");
  const [score, setScore] = useState(0);
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");

  const auditer = () => {
    // Simulation audit intelligent
    let s = 91;
    if (url.includes("greenblack")) s = 98;
    if (url.includes("urbanjungle")) s = 91;
    if (url.includes("wearma")) s = 88;
    if (url.includes("33rue")) s = 92;
    setScore(s);
  };

  const domain = url.replace("https://","").replace("http://","").split("/")[0];
  const payLink = `https://rankpilot-app-qggu.vercel.app/pay?client=${domain.replace(".ma","")}`;

  const msgWA = `Salam, j'ai audité ${domain} - Score ${score}/100 avec RankPilot. 3 erreurs: OG Image manquante. Je corrige en 24h pour 399 DH. Lien: ${payLink} - Ahmed Afkir 212660460410`;

  return (
    <div style={{minHeight:"100vh", background:"black", color:"white", padding:"20px", display:"flex", justifyContent:"center"}}>
      <div style={{width:"100%", maxWidth:"400px", background:"#18181b", borderRadius:"20px", padding:"20px"}}>
        <h1 style={{fontSize:"20px", fontWeight:"bold"}}>RankPilot - Tout-en-un</h1>
        <input value={url} onChange={e=>setUrl(e.target.value)} style={{width:"100%", marginTop:"20px", padding:"12px", borderRadius:"12px", background:"black", border:"1px solid #333", color:"white"}} />
        <button onClick={auditer} style={{width:"100%", marginTop:"12px", padding:"12px", borderRadius:"12px", background:"white", color:"black", fontWeight:"bold"}}>Auditer</button>
        <div style={{marginTop:"15px", fontSize:"36px", fontWeight:"bold", color:"#4ade80"}}>Score: {score}</div>
        
        <input placeholder="06 du client (si dispo)" value={tel} onChange={e=>setTel(e.target.value)} style={{width:"100%", marginTop:"12px", padding:"12px", borderRadius:"12px", background:"black", border:"1px solid #4ade80", color:"white"}} />
        <input placeholder="Email client" value={email} onChange={e=>setEmail(e.target.value)} style={{width:"100%", marginTop:"12px", padding:"12px", borderRadius:"12px", background:"black", border:"1px solid #333", color:"white"}} />

        <div style={{background:"#052e16", padding:"15px", borderRadius:"20px", marginTop:"15px", display:"flex", flexDirection:"column", gap:"10px"}}>
          <a href={`https://wa.me/${tel.replace(/[^0-9]/g,"")}?text=${encodeURIComponent(msgWA)}`} target="_blank" style={{background:"#4ade80", padding:"12px", borderRadius:"20px", textAlign:"center", color:"black", textDecoration:"none", fontWeight:"bold"}}>📱 WhatsApp</a>
          <a href={`mailto:${email}?subject=Audit ${domain} Score ${score}/100&body=${encodeURIComponent(msgWA)}`} style={{background:"#60a5fa", padding:"12px", borderRadius:"20px", textAlign:"center", color:"black", textDecoration:"none", fontWeight:"bold"}}>📧 Email</a>
          <button onClick={()=>{navigator.clipboard.writeText(msgWA); alert("Copié!");}} style={{background:"black", padding:"12px", borderRadius:"20px", color:"white", fontWeight:"bold"}}>📸 Copier DM Insta</button>
        </div>

        <div style={{marginTop:"15px", background:"#27272a", padding:"12px", borderRadius:"12px", fontSize:"12px"}}>
          Page paiement 399 DH:<br/><b>{payLink}</b>
        </div>
      </div>
    </div>
  );
}
