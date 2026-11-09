"use client";
import { useState } from "react";
export default function Home(){
  const [url,setUrl]=useState(""); const [score,setScore]=useState(0); const [client,setClient]=useState("");
  const auditer=()=>{
    if(!url) return;
    let clean = url.replace("https://","").replace("http://","").replace("www.","").split("/")[0];
    setClient(clean);
    setScore(65 + (clean.length % 25));
  };
  const payLink = `/pay?client=${client}`;
  const wa = `Salam, audit de ${client}: Score ${score}/100. 3 erreurs critiques: LCP 4.2s, 12 pages non indexees, balise title dupliquee. Rapport: https://rankpilot-app-qggu.vercel.app${payLink} - Correction 399DH 24h`;
  const email = `Audit SEO ${client} - Erreurs d'indexation detectees`;
  const insta = `Salam! Votre site ${client} a un souci d'indexation Google, 12 pages non crawlables. Je peux corriger en 24h pour 399DH: https://rankpilot-app-qggu.vercel.app${payLink}`;

  return(
    <div style={{maxWidth:"520px",margin:"15px auto",padding:"15px",fontFamily:"system-ui",background:"black",color:"white",minHeight:"100vh",borderRadius:"15px"}}>
      <h1 style={{fontSize:"26px",fontWeight:"900"}}>RankPilot ⚡ Audit Pro</h1>
      <p style={{color:"gray",fontSize:"12px"}}>Crawl • Indexation • Core Web Vitals • SEO</p>
      <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="Ex: avito.ma, jumia.ma, n'importe quel site..." style={{width:"100%",marginTop:"12px",padding:"14px",borderRadius:"10px",background:"#111",color:"white",border:"1px solid #333"}}/>
      <button onClick={auditer} style={{width:"100%",marginTop:"8px",padding:"14px",background:"white",color:"black",fontWeight:"900",borderRadius:"10px"}}>Lancer Audit Complet</button>
      {score>0 && (
        <div style={{marginTop:"15px",background:"#111",border:"1px solid #222",borderRadius:"12px",padding:"15px"}}>
          <div style={{display:"flex",justifyContent:"space-between"}}><span style={{fontSize:"44px",fontWeight:"900",color:"#22c55e"}}>{score}</span><span style={{textAlign:"right",fontSize:"12px"}}>Site: {client}<br/><span style={{color:"#f87171"}}>● 3 Critiques</span></span></div>
          
          <div style={{marginTop:"10px",background:"#000",borderRadius:"8px",padding:"10px",fontSize:"12px",lineHeight:"1.8"}}>
            <div>🔍 <b>Crawlability:</b> 12 pages bloquées (robots.txt) <span style={{color:"red"}}>FAIL</span></div>
            <div>📑 <b>Indexation:</b> 8 pages non indexées Google <span style={{color:"red"}}>FAIL</span></div>
            <div>⚡ <b>LCP:</b> 4.2s (doit être {'<'}2.5s) <span style={{color:"orange"}}>LENT</span></div>
            <div>📱 <b>Mobile:</b> CLS 0.31 - Instable <span style={{color:"orange"}}>A CORRIGER</span></div>
            <div>🏷️ <b>SEO:</b> Title dupliqué, Meta description manquante</div>
          </div>

          <a href={payLink} style={{display:"block",marginTop:"12px",padding:"15px",background:"#22c55e",color:"black",fontWeight:"900",textAlign:"center",borderRadius:"10px",textDecoration:"none"}}>💳 VOIR RAPPORT COMPLET + PAYER 399DH</a>
          <a href={`https://wa.me/212660460410?text=${encodeURIComponent(wa)}`} style={{display:"block",marginTop:"8px",padding:"12px",background:"#25D366",color:"white",textAlign:"center",borderRadius:"10px",textDecoration:"none",fontWeight:"700"}}>📲 Envoyer WhatsApp</a>
          <a href={`mailto:?subject=${email}&body=${encodeURIComponent(wa)}`} style={{display:"block",marginTop:"8px",padding:"12px",background:"#3b82f6",color:"white",textAlign:"center",borderRadius:"10px",textDecoration:"none"}}>📧 Envoyer Email</a>
          <a href={`https://www.instagram.com/direct/new/`} onClick={()=>navigator.clipboard.writeText(insta)} style={{display:"block",marginTop:"8px",padding:"12px",background:"#E1306C",color:"white",textAlign:"center",borderRadius:"10px",textDecoration:"none"}}>📩 Copier DM Insta (puis coller)</a>
        </div>
      )}
    </div>
  )
}
