"use client";
import { useState } from "react";

export default function Page() {
  const [url, setUrl] = useState("https://greenblack.ma");
  const [clientPhone, setClientPhone] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const extractPhone = (text) => {
    if(!text) return null;
    const m = text.match(/(?:\+212|0)(?:6|7)[\s.\-]*\d[\s.\-]*\d{2}[\s.\-]*\d{2}[\s.\-]*\d{2}[\s.\-]*\d{2}/);
    return m ? m[0] : null;
  };

  const audit = async () => {
    setLoading(true);
    setResult(null);
    setClientPhone("");
    try {
      const res = await fetch(`/api/audit?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      setResult(data);
      
      let phone = data.phone || null;
      if(!phone){
        const combined = `${data.title||""} ${data.description||""} ${data.html||""} ${JSON.stringify(data)}`;
        phone = extractPhone(combined);
      }
      if(phone){
        let clean = phone.replace(/\D/g,"");
        let pretty = clean.startsWith("212") ? "0"+clean.substring(3) : clean;
        if(!pretty.startsWith("0")) pretty = "0"+pretty;
        setClientPhone(pretty);
      } else {
        try{
          const proxyRes = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
          const proxyData = await proxyRes.json();
          const found = extractPhone(proxyData.contents);
          if(found){
            let clean = found.replace(/\D/g,"");
            let pretty = clean.startsWith("212") ? "0"+clean.substring(3) : clean;
            if(!pretty.startsWith("0")) pretty = "0"+pretty;
            setClientPhone(pretty);
          }
        }catch(e){}
      }
    } catch(e){ alert("Erreur"); }
    setLoading(false);
  };

  const sendWhatsApp = () => {
    if(!clientPhone){ alert("Numéro non trouvé → tape-le manuellement ou envoie en DM Insta"); return; }
    const cleanPhone = clientPhone.replace(/\D/g,"");
    const intlPhone = cleanPhone.startsWith("0") ? "212"+cleanPhone.substring(1) : cleanPhone;
    const msg = `Salam Green Black 👋\n\nJ'ai audité ${url}\nScore: ${result?.score||"98/100"}\n\nDéfaut: pas d'OG Image, votre lien WhatsApp n'affiche pas de photo de plat. Vous perdez 30% de clics.\n\nJe vous le corrige + photo pour 399 DH, 24h. On fait ?`;
    window.open(`https://wa.me/${intlPhone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const copyForInsta = () => {
    const msg = `Salam Green Black 👋 J'ai audité votre site ${url} - Score ${result?.score||"98/100"} - Il manque l'OG Image. Je vous le fais pour 399 DH. Intéressé ?`;
    navigator.clipboard.writeText(msg);
    alert("Message copié pour Instagram DM !");
  };

  return (
    <div style={{minHeight:"100vh", background:"black", color:"white", padding:"20px", display:"flex", justifyContent:"center"}}>
      <div style={{width:"100%", maxWidth:"420px", background:"#18181b", borderRadius:"20px", padding:"20px", marginTop:"20px"}}>
        <h1 style={{fontSize:"22px", fontWeight:"bold", marginBottom:"15px"}}>RankPilot - Auto Phone</h1>
        <input style={{width:"100%", padding:"12px", borderRadius:"12px", background:"black", border:"1px solid #333", color:"white", marginBottom:"10px"}} value={url} onChange={e=>setUrl(e.target.value)} />
        <button onClick={audit} style={{width:"100%", background:"white", color:"black", padding:"12px", borderRadius:"12px", fontWeight:"bold", marginBottom:"15px"}}>{loading?"Recherche téléphone...":"Auditer + Trouver Téléphone"}</button>

        {result && (
          <>
            <div style={{fontSize:"36px", fontWeight:"bold", color:"#4ade80"}}>Score: {result.score||"98/100"}</div>
            <div style={{fontSize:"12px", opacity:0.5, marginBottom:"10px"}}>{url}</div>
            
            <div style={{background:"#27272a", borderRadius:"12px", padding:"12px", marginBottom:"12px"}}>
              <div style={{fontSize:"11px", opacity:0.6}}>N° détecté auto (modifiable):</div>
              <input style={{width:"100%", padding:"10px", marginTop:"6px", borderRadius:"8px", background:"black", border:"1px solid #22c55e", color:"#4ade80", fontWeight:"bold"}} value={clientPhone} onChange={e=>setClientPhone(e.target.value)} placeholder="Ex: 0661... (si vide, cherche sur Insta)" />
              {!clientPhone && <div style={{fontSize:"11px", color:"#fb923c", marginTop:"5px"}}>⚠️ Pas trouvé sur site → utilise bouton Insta ci-dessous</div>}
              {clientPhone && <div style={{fontSize:"11px", color:"#4ade80", marginTop:"5px"}}>✅ Trouvé, prêt à envoyer !</div>}
            </div>

            <div style={{background:"#052e16", border:"1px solid #16a34a", borderRadius:"16px", padding:"14px"}}>
              <div style={{fontWeight:"bold", marginBottom:"8px"}}>💰 Offre 399 DH</div>
              <button onClick={sendWhatsApp} style={{width:"100%", background:"#4ade80", color:"black", padding:"12px", borderRadius:"20px", fontWeight:"bold", marginBottom:"8px"}}>📱 Envoyer sur WhatsApp client</button>
              <button onClick={copyForInsta} style={{width:"100%", background:"black", color:"white", padding:"12px", borderRadius:"20px", fontWeight:"bold", border:"1px solid #333"}}>📸 Copier pour DM Instagram</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
