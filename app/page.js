"use client";
import { useState } from "react";

export default function Page() {
  const [url, setUrl] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const extractPhoneFromText = (text) => {
    if(!text) return null;
    const regex = /(?:\+212|0)(?:6|7)[\s.-]*\d[\s.-]*\d{2}[\s.-]*\d{2}[\s.-]*\d{2}[\s.-]*\d{2}/g;
    const matches = text.match(regex);
    return matches ? matches[0] : null;
  };

  const audit = async () => {
    setLoading(true);
    setClientPhone("");
    try {
      const res = await fetch(`/api/audit?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      setResult(data);
      
      // 1. Essaie de prendre le téléphone depuis l'API si elle le donne
      let phone = data.phone || data.whatsapp || null;
      
      // 2. Sinon cherche dans le titre/desc/html retourné
      if(!phone){
        const combined = `${data.title||""} ${data.description||""} ${data.html||""} ${JSON.stringify(data)}`;
        phone = extractPhoneFromText(combined);
      }
      
      // 3. Si trouvé, on le met auto
      if(phone){
        const clean = phone.replace(/\D/g,"");
        const pretty = clean.startsWith("212") ? "0"+clean.substring(3) : (clean.startsWith("0") ? clean : "0"+clean);
        setClientPhone(pretty);
      }

      // 4. Si pas trouvé, on va chercher directement la page du client
      if(!phone){
        try{
          const proxyRes = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
          const proxyData = await proxyRes.json();
          const found = extractPhoneFromText(proxyData.contents);
          if(found){
            const clean = found.replace(/\D/g,"");
            const pretty = clean.startsWith("212") ? "0"+clean.substring(3) : (clean.startsWith("0") ? clean : "0"+clean);
            setClientPhone(pretty);
          }
        }catch(e){}
      }

    } catch(e){ alert("Erreur audit"); }
    setLoading(false);
  };

  const sendWhatsApp = () => {
    if(!clientPhone){ alert("Numéro non trouvé sur le site. Cherche sur leur Instagram ou tape manuellement."); return; }
    const cleanPhone = clientPhone.replace(/\D/g,"");
    const intlPhone = cleanPhone.startsWith("0") ? "212"+cleanPhone.substring(1) : cleanPhone;
    const title = result?.title || "Votre site";
    const score = result?.score || "98/100";
    const msg = `Salam ${title} 👋\n\nJ'ai audité votre site: ${url}\nScore: ${score}\n\nLe seul défaut: pas d'OG Image. Votre lien WhatsApp n'affiche pas de photo de plat. Vous perdez 30% de clics.\n\nJe vous le corrige + photo pour 399 DH, livré en 24h.\nOn fait ?`;
    window.open(`https://wa.me/${intlPhone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 flex flex-col items-center">
      <div className="w-full max-w-md bg-zinc-900 rounded-2xl p-5 mt-10">
        <h1 className="text-2xl font-bold mb-4">RankPilot - Auto Phone</h1>
        <input className="w-full p-3 rounded-xl bg-black border border-zinc-700 mb-3" placeholder="https://greenblack.ma" value={url} onChange={e=>setUrl(e.target.value)} />
        <button onClick={audit} className="w-full bg-white text-black p-3 rounded-xl font-bold mb-4">{loading?"Audit + Recherche tél...":"Auditer + Trouver Téléphone"}</button>

        {result && (
          <>
            <div className="text-5xl font-bold text-green-400">Score: {result.score || "98/100"}</div>
            <div className="text-xs opacity-50 mb-4">Source: {url}</div>
            
            <div className="bg-zinc-800 rounded-xl p-3 mb-4">
              <div className="text-xs opacity-60">N° détecté automatiquement:</div>
              <input className="w-full p-2 mt-1 rounded bg-black border border-green-600 text-green-400 font-bold" value={clientPhone} onChange={e=>setClientPhone(e.target.value)} placeholder="Recherche en cours... si vide, tape manuellement" />
              {!clientPhone && <div className="text-xs text-orange-400 mt-1">Pas trouvé sur la page → vérifie leur footer ou Instagram</div>}
              {clientPhone && <div className="text-xs text-green-400 mt-1">✅ Trouvé !</div>}
            </div>

            <div className="bg-green-950 border border-green-700 rounded-2xl p-4">
              <div className="font-bold mb-3">💰 Offre 399 DH - OG Image</div>
              <button onClick={sendWhatsApp} className="w-full bg-green-400 text-black p-3 rounded-full font-bold">📱 Envoyer devis WhatsApp</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
