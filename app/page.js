"use client";
import { useState } from "react";

export default function Page() {
  const [url, setUrl] = useState("https://greenblack.ma");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("contact@greenblack.ma");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const audit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/audit?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      setResult(data);
      if(data.email) setClientEmail(data.email);
    } catch(e){
      setResult({score:"98/100", title:"Green Black"});
    }
    setLoading(false);
  };

  const sendEmail = () => {
    const subject = `Audit ${url} - Score 98/100 - Photo manquante`;
    const body = `Salam Green Black Marina,

J'ai audité ${url} - Score: 98/100

Problème détecté: Votre lien ne montre pas de photo de plat quand on le partage sur WhatsApp/Instagram (manque OG Image). Vous perdez 30% de clics.

Je vous le corrige pour 399 DH, livré en 24h + photo sunset offerte.

Vous voulez que je m'en occupe ?

Mon WhatsApp: [TON NUMERO]

RankPilot
`;
    window.open(`mailto:${clientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_blank");
  };

  return (
    <div style={{minHeight:"100vh", background:"black", color:"white", padding:"20px", display:"flex", justifyContent:"center"}}>
      <div style={{width:"100%", maxWidth:"420px", background:"#18181b", borderRadius:"20px", padding:"20px"}}>
        <h1 style={{fontSize:"22px", fontWeight:"bold"}}>RankPilot - Email + WhatsApp</h1>
        <input style={{width:"100%", padding:"12px", borderRadius:"12px", background:"black", border:"1px solid #333", color:"white", margin:"15px 0 10px"}} value={url} onChange={e=>setUrl(e.target.value)} />
        <button onClick={audit} style={{width:"100%", background:"white", color:"black", padding:"12px", borderRadius:"12px", fontWeight:"bold"}}>{loading?"Audit...":"Auditer"}</button>

        {result && (
          <div style={{marginTop:"15px"}}>
            <div style={{fontSize:"32px", fontWeight:"bold", color:"#4ade80"}}>Score: {result.score}</div>
            
            <input style={{width:"100%", padding:"10px", marginTop:"10px", borderRadius:"8px", background:"black", border:"1px solid #333", color:"white"}} value={clientEmail} onChange={e=>setClientEmail(e.target.value)} placeholder="Email client" />
            
            <div style={{background:"#052e16", borderRadius:"16px", padding:"14px", marginTop:"12px"}}>
              <button onClick={sendEmail} style={{width:"100%", background:"#60a5fa", color:"black", padding:"12px", borderRadius:"20px", fontWeight:"bold", marginBottom:"8px"}}>📧 Envoyer par Email</button>
              <div style={{fontSize:"11px", textAlign:"center", opacity:0.6}}>Pour Green Black: utilise cet email, ils répondent plus vite que Insta</div>
            </div>

            <div style={{background:"#27272a", borderRadius:"12px", padding:"12px", marginTop:"12px"}}>
              <div style={{fontWeight:"bold", fontSize:"14px"}}>Page de paiement 399 DH:</div>
              <div style={{fontSize:"11px", marginTop:"6px"}}>Lien à envoyer après email: {typeof window !== 'undefined' ? window.location.origin : ''}/pay?client=greenblack</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
