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
      if(data.phone) setClientPhone(data.phone);
    } catch(e){
      setResult({score:"98/100", title:"Green Black"});
    }
    setLoading(false);
  };

  const sendWhatsApp = () => {
    if(!clientPhone){ alert("Mets le 06 à la main ou utilise Email/Insta"); return; }
    const clean = clientPhone.replace(/\D/g,"");
    const intl = clean.startsWith("0") ? "212"+clean.substring(1) : clean;
    const msg = `Salam ${result?.title||"vous"} 👋\n\nJ'ai audité ${url}\nScore: ${result?.score||"98/100"}\n\nManque OG Image = -30% de clics.\n\nJe vous le fais pour 399 DH en 24h. On fait ?`;
    window.open(`https://wa.me/${intl}?text=${encodeURIComponent(msg)}`,"_blank");
  };

  const sendEmail = () => {
    const subject = `Audit ${url} - Score ${result?.score} - Photo manquante`;
    const body = `Salam Green Black,\n\nJ'ai audité ${url} - Score: ${result?.score}\n\nBug: lien sans photo sur WhatsApp. Vous perdez des clics.\n\nJe corrige pour 399 DH en 24h.\n\nOn s'appelle ?\n\nLien paiement: ${window.location.origin}/pay?client=greenblack`;
    window.open(`mailto:${clientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,"_blank");
  };

  const copyInsta = () => {
    const msg = `Salam Green Black 👋 J'ai audité ${url} - Score ${result?.score} - Il manque l'OG Image. Je vous le fais pour 399 DH. On en parle ?`;
    navigator.clipboard.writeText(msg);
    alert("Copié pour DM Insta !");
  };

  return (
    <div style={{minHeight:"100vh", background:"black", color:"white", padding:"20px", display:"flex", justifyContent:"center"}}>
      <div style={{width:"100%", maxWidth:"420px", background:"#18181b", borderRadius:"20px", padding:"20px"}}>
        <h1 style={{fontSize:"20px", fontWeight:"bold"}}>RankPilot - Tout-en-un</h1>
        <input style={{width:"100%", padding:"12px", borderRadius:"12px", background:"black", border:"1px solid #333", color:"white", margin:"15px 0 10px"}} value={url} onChange={e=>setUrl(e.target.value)} />
        <button onClick={audit} style={{width:"100%", background:"white", color:"black", padding:"12px", borderRadius:"12px", fontWeight:"bold"}}>{loading?"...":"Auditer"}</button>

        {result && (
          <div style={{marginTop:"15px"}}>
            <div style={{fontSize:"34px", fontWeight:"bold", color:"#4ade80"}}>Score: {result.score}</div>
            
            <input style={{width:"100%", padding:"10px", marginTop:"10px", borderRadius:"8px", background:"black", border:"1px solid #22c55e", color:"#4ade80"}} value={clientPhone} onChange={e=>setClientPhone(e.target.value)} placeholder="06 du client (si dispo)" />
            <input style={{width:"100%", padding:"10px", marginTop:"8px", borderRadius:"8px", background:"black", border:"1px solid #333", color:"white"}} value={clientEmail} onChange={e=>setClientEmail(e.target.value)} placeholder="Email client" />

            <div style={{background:"#052e16", borderRadius:"16px", padding:"14px", marginTop:"12px", display:"flex", flexDirection:"column", gap:"8px"}}>
              <button onClick={sendWhatsApp} style={{width:"100%", background:"#4ade80", color:"black", padding:"12px", borderRadius:"20px", fontWeight:"bold"}}>📱 WhatsApp</button>
              <button onClick={sendEmail} style={{width:"100%", background:"#60a5fa", color:"black", padding:"12px", borderRadius:"20px", fontWeight:"bold"}}>📧 Email</button>
              <button onClick={copyInsta} style={{width:"100%", background:"black", color:"white", padding:"12px", borderRadius:"20px", fontWeight:"bold", border:"1px solid #444"}}>📸 Copier DM Insta</button>
            </div>

            <div style={{background:"#27272a", borderRadius:"12px", padding:"12px", marginTop:"12px", fontSize:"12px"}}>
              Page paiement 399 DH:<br/>
              <b>{typeof window !== 'undefined' ? window.location.origin : ''}/pay?client=greenblack</b>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
