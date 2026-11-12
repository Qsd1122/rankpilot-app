"use client";
import { useState, useEffect } from "react";
export default function Pay(){
  const [c,setC]=useState("ton-site"); const [b,setB]=useState(38); const [a,setA]=useState(82);
  useEffect(()=>{
    const p=new URLSearchParams(window.location.search);
    if(p.get("c")) setC(p.get("c")); if(p.get("b")) setB(p.get("b")); if(p.get("a")) setA(p.get("a"));
  },[]);
  return (
    <div style={{minHeight:"100vh",background:"#0a0a0a",color:"#fff",padding:"20px"}}>
      <div style={{maxWidth:"520px",margin:"30px auto"}}>
        <h2 style={{fontWeight:"900"}}>Fichiers corriges pour {c}</h2>
        <div style={{display:"flex",gap:"8px",marginTop:"12px"}}>
          <div style={{flex:1,background:"#111",padding:"12px",borderRadius:"10px",textAlign:"center"}}><div style={{color:"#888",fontSize:"11px"}}>AVANT</div><div style={{fontSize:"26px",fontWeight:"900",color:"#ff4d4d"}}>{b}</div></div>
          <div style={{flex:1,background:"#111",padding:"12px",borderRadius:"10px",textAlign:"center"}}><div style={{color:"#888",fontSize:"11px"}}>APRES</div><div style={{fontSize:"26px",fontWeight:"900",color:"#25D366"}}>{a}</div></div>
        </div>
        <div style={{background:"#111",borderRadius:"12px",padding:"14px",marginTop:"14px",fontSize:"13px",lineHeight:"1.8",color:"#aaa"}}>
          <div style={{color:"#25D366"}}>robots.txt corrige Allow: /</div>
          <div style={{color:"#25D366"}}>8 pages indexees</div>
          <div style={{color:"#25D366"}}>Titles + meta OK</div>
          <div style={{color:"#25D366"}}>4 liens 404 repares</div>
        </div>
        <a href="https://wa.me/212660460410?text=Salam%20j%27ai%20paye%2099DH%20pour%20"+c style={{display:"block",marginTop:"18px",padding:"18px",background:"#25D366",color:"#000",borderRadius:"14px",textAlign:"center",textDecoration:"none",fontWeight:"900"}}>Payer 99DH + WhatsApp</a>
        <a href="/" style={{display:"block",marginTop:"12px",textAlign:"center",color:"#555"}}>Retour</a>
      </div>
    </div>
  );
}
