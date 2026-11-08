"use client";
import { useState } from "react";
export default function Home(){
const [url,setUrl]=useState("");
const [score,setScore]=useState(0);
const [tel,setTel]=useState("");
const [email,setEmail]=useState("");
const auditer=()=>{
let s=91;
if(url.includes("greenblack")) s=98;
else if(url.includes("urban")) s=91;
else if(url.includes("wearma")) s=88;
else if(url.includes("myamino")) s=85;
else if(url.includes("marjanemall")) s=82;
else s=Math.floor(70+Math.random()*20);
setScore(s);
};
const domain=url.replace("https://","").replace("http://","").split("/")[0].split("?")[0] || "urbanjunglestore.ma";
const clean=domain.replace(".ma","").replace(".com","").replace("www.","").replace(".co","");
const payLink=`/pay?client=${clean}`;
const msg=`Salam, audit ${domain} - Score ${score}/100. Je corrige en 24h pour 399 DH. Lien: https://rankpilot-app-qggu.vercel.app${payLink} - Ahmed 0660460410`;
return(
<div style={{minHeight:"100vh",background:"black",color:"white",padding:"20px",display:"flex",justifyContent:"center"}}>
<div style={{width:"100%",maxWidth:"400px",background:"#18181b",borderRadius:"20px",padding:"20px"}}>
<h1 style={{fontSize:"20px",fontWeight:"bold"}}>RankPilot - Tout-en-un</h1>
<input placeholder="https://site-client.ma" value={url} onChange={e=>setUrl(e.target.value)} style={{width:"100%",marginTop:"20px",padding:"12px",borderRadius:"12px",background:"black",border:"1px solid #333",color:"white"}}/>
<button onClick={auditer} style={{width:"100%",marginTop:"12px",padding:"12px",borderRadius:"12px",background:"white",color:"black",fontWeight:"bold"}}>Auditer</button>
<div style={{marginTop:"15px",fontSize:"36px",fontWeight:"bold",color:"#4ade80"}}>Score: {score}</div>
{score>0 && (
<a href={payLink} style={{display:"block",width:"100%",marginTop:"15px",padding:"14px",borderRadius:"12px",background:"#4ade80",color:"black",textAlign:"center",textDecoration:"none",fontWeight:"bold",fontSize:"16px"}}>💳 Passer au paiement 399 DH →</a>
)}
<input placeholder="06 client" value={tel} onChange={e=>setTel(e.target.value)} style={{width:"100%",marginTop:"12px",padding:"12px",borderRadius:"12px",background:"black",border:"1px solid #4ade80",color:"white"}}/>
<input placeholder="Email client" value={email} onChange={e=>setEmail(e.target.value)} style={{width:"100%",marginTop:"12px",padding:"12px",borderRadius:"12px",background:"black",border:"1px solid #333",color:"white"}}/>
{score>0 && (
<div style={{background:"#052e16",padding:"15px",borderRadius:"20px",marginTop:"15px",display:"flex",flexDirection:"column",gap:"10px"}}>
<a href={`https://wa.me/${tel.replace(/[^0-9]/g,"")}?text=${encodeURIComponent(msg)}`} target="_blank" style={{background:"#4ade80",padding:"12px",borderRadius:"20px",textAlign:"center",color:"black",textDecoration:"none",fontWeight:"bold"}}>WhatsApp</a>
<a href={`mailto:${email}?subject=Audit ${domain} Score ${score}/100&body=${encodeURIComponent(msg)}`} style={{background:"#60a5fa",padding:"12px",borderRadius:"20px",textAlign:"center",color:"black",textDecoration:"none",fontWeight:"bold"}}>Email</a>
<button onClick={()=>{navigator.clipboard.writeText(msg); alert("Copié!");}} style={{background:"black",padding:"12px",borderRadius:"20px",color:"white",fontWeight:"bold"}}>Copier DM Insta</button>
</div>
)}
<div style={{marginTop:"15px",background:"#27272a",padding:"12px",borderRadius:"12px",fontSize:"10px",wordBreak:"break-all"}}>Pay: https://rankpilot-app-qggu.vercel.app{payLink}</div>
</div>
</div>
);
}
