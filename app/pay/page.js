"use client";
import { useState } from "react";

export default function PayPage() {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({nom:"", email:"", tel:""});

  const submit = (e) => {
    e.preventDefault();
    setDone(true);
  };

  if(done){
    return (
      <div style={{minHeight:"100vh", background:"black", color:"white", padding:"30px", display:"flex", justifyContent:"center", alignItems:"center"}}>
        <div style={{background:"#18181b", padding:"30px", borderRadius:"20px", maxWidth:"400px", textAlign:"center"}}>
          <div style={{fontSize:"50px"}}>✅</div>
          <h2 style={{fontSize:"22px", fontWeight:"bold", marginTop:"10px"}}>Demande reçue !</h2>
          <p style={{marginTop:"15px", opacity:0.8}}>Merci {form.nom}, on va corriger greenblack.ma en 24h.</p>
          <div style={{background:"black", padding:"15px", borderRadius:"12px", marginTop:"20px", textAlign:"left", fontSize:"13px"}}>
            <b>Pour finaliser (399 DH):</b><br/><br/>
            Wafacash / Virement:<br/>
            - Nom: [TON NOM COMPLET]<br/>
            - Tel: [TON NUMERO]<br/><br/>
            Envoie le reçu sur WhatsApp: [TON WHATSAPP]<br/><br/>
            On lance dès réception.
          </div>
          <a href="/" style={{display:"block", marginTop:"20px", background:"white", color:"black", padding:"12px", borderRadius:"12px", textDecoration:"none", fontWeight:"bold"}}>Retour</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{minHeight:"100vh", background:"black", color:"white", padding:"20px", display:"flex", justifyContent:"center"}}>
      <div style={{width:"100%", maxWidth:"400px", background:"#18181b", borderRadius:"20px", padding:"25px"}}>
        <h1 style={{fontSize:"20px", fontWeight:"bold"}}>Fix OG Image - 399 DH</h1>
        <p style={{opacity:0.6, fontSize:"13px", marginTop:"5px"}}>Pour greenblack.ma - Score 98/100 - Livraison 24h</p>
        
        <form onSubmit={submit} style={{marginTop:"20px", display:"flex", flexDirection:"column", gap:"12px"}}>
          <input required placeholder="Nom complet" value={form.nom} onChange={e=>setForm({...form, nom:e.target.value})} style={{padding:"12px", borderRadius:"10px", background:"black", border:"1px solid #333", color:"white"}} />
          <input required placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} style={{padding:"12px", borderRadius:"10px", background:"black", border:"1px solid #333", color:"white"}} />
          <input required placeholder="Téléphone WhatsApp" value={form.tel} onChange={e=>setForm({...form, tel:e.target.value})} style={{padding:"12px", borderRadius:"10px", background:"black", border:"1px solid #333", color:"white"}} />
          <button type="submit" style={{background:"#4ade80", color:"black", padding:"14px", borderRadius:"12px", fontWeight:"bold", marginTop:"10px"}}>Confirmer - 399 DH</button>
        </form>
        <p style={{fontSize:"11px", opacity:0.5, marginTop:"15px", textAlign:"center"}}>Après inscription, tu reçois les infos de paiement Wafacash</p>
      </div>
    </div>
  );
}
