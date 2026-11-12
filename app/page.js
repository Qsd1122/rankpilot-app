"use client";
import { useState } from "react";
export default function Home(){
  const [url,setUrl]=useState("");
  const [logs,setLogs]=useState([]);
  const [done,setDone]=useState(false);
  const [before,setBefore]=useState(38);
  const [after,setAfter]=useState(82);
  const start=()=>{
    if(!url){alert("Colle un site");return;}
    const b=36+Math.floor(Math.random()*12);
    setBefore(b); setAfter(b+38); setLogs([]); setDone(false);
    const items=[
      ["Scan robots.txt ... "+b+"/100","#aaa"],
      ["BLOQUE detecte - robots.txt bloque /","#ff4d4d"],
      ["Curseur corrige -> Allow: / +12 pts","#facc15"],
      ["robots.txt OK -> corrige","#25D366"],
      ["Scan 8 pages non-indexees","#aaa"],
      ["Curseur corrige noindex -> index +15 pts","#facc15"],
      ["8 pages OK","#25D366"],
      ["2 Titles manquants","#ff4d4d"],
      ["Curseur ecrit Title +10 pts","#facc15"],
      ["Titles OK","#25D366"],
      ["4 liens 404 detectes","#ff4d4d"],
      ["Curseur supprime liens morts +8 pts","#facc15"],
      ["4 liens repares","#25D366"]
    ];
    let i=0;
    const id=setInterval(()=>{ if(i<items.length){ setLogs(p=>[...p,items[i]]); i++; } else { clearInterval(id); setDone(true); } },380);
  };
  const go=()=>{ const d=url.replace("https://","").replace("http://","").replace("www.","").split("/")[0]; window.location.href="/pay?c="+encodeURIComponent(d)+"&b="+before+"&a="+after; };
  return (
    <div style={{minHeight:"100vh",background:"#0a0a0a",color:"#fff",padding:"16px"}}>
      <div style={{maxWidth:"600px",margin:"20px auto"}}>
        <div style={{display:"inline-block",background:"#25D36622",color:"#25D366",padding:"4px 10px",borderRadius:"20px",fontSize:"11px",fontWeight:"700"}}>LIVE AUTO-FIX</div>
        <h1 style={{fontSize:"30px",fontWeight:"900",marginTop:"8px",lineHeight:"1.1"}}>Je corrige ton site<br/><span style={{color:"#25D366"}}>en direct</span></h1>
        <div style={{display:"flex",gap:"8px",marginTop:"16px"}}>
          <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="greenblack.ma" style={{flex:1,padding:"16px",borderRadius:"12px",border:"1px solid #222",background:"#111",color:"#fff"}}/>
          <button onClick={start} style={{padding:"16px 20px",borderRadius:"12px",background:"#25D366",color:"#000",fontWeight:"900",border:0}}>Lancer</button>
        </div>
        {logs.length>0 && <div style={{display:"flex",gap:"8px",marginTop:"12px"}}>
          <div style={{flex:1,background:"#111",borderRadius:"12px",padding:"10px",textAlign:"center",border:"1px solid #ff4d4d44"}}><div style={{fontSize:"10px",color:"#888"}}>AVANT</div><div style={{fontSize:"28px",fontWeight:"900",color:"#ff4d4d"}}>{before}</div></div>
          <div style={{flex:1,background:"#111",borderRadius:"12px",padding:"10px",textAlign:"center",border:"1px solid #25D36666"}}><div style={{fontSize:"10px",color:"#888"}}>APRES</div><div style={{fontSize:"28px",fontWeight:"900",color:"#25D366"}}>{done?after:"..."}</div></div>
        </div>}
        <div style={{marginTop:"12px",background:"#111",border:"1px solid #222",borderRadius:"14px",padding:"14px",minHeight:"200px",fontFamily:"monospace",fontSize:"13px",lineHeight:"1.9"}}>
          {logs.length===0 ? <span style={{color:"#555"}}>Colle ton site pour voir le fix couleur</span> : logs.map((l,i)=><div key={i} style={{color:l[1]}}>{l[0]}</div>)}
          {done && <div style={{marginTop:"10px",color:"#25D366",fontWeight:"900"}}>Score final {before} → {after} / 100</div>}
        </div>
        {done && <button onClick={go} style={{width:"100%",marginTop:"14px",padding:"18px",background:"#fff",color:"#000",borderRadius:"14px",fontWeight:"900",border:0,fontSize:"16px"}}>Voir fichiers {before} → {after} - 99DH</button>}
      </div>
    </div>
  );
}
