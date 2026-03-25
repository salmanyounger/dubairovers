"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { BP_PROPS as ALL_PROPS, AGENTS } from "./data/blueprint-props";

const T = {
  bg:"#060C1E",bg2:"#0D1629",card:"rgba(255,255,255,0.04)",border:"rgba(255,255,255,0.08)",
  blue:"#3B82F6",blue2:"#60A5FA",gold:"#F59E0B",green:"#10B981",text:"#E8EDF8",
  sub:"rgba(255,255,255,0.45)",sub2:"rgba(255,255,255,0.22)",
};

const fmt = n => n>=1e6?`AED ${(n/1e6).toFixed(1)}M`:`AED ${(n/1e3).toFixed(0)}K`;
const sc  = v => v>=8?T.green:v>=6?T.blue:T.gold;

function ScoreBar({label,val}){
  return(
    <div style={{marginBottom:5}}>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:T.sub,marginBottom:3}}>
        <span>{label}</span><span style={{color:sc(val),fontWeight:700}}>{val}/10</span>
      </div>
      <div style={{height:4,background:"rgba(255,255,255,0.08)",borderRadius:4,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${val*10}%`,background:sc(val),borderRadius:4}}/>
      </div>
    </div>
  );
}

function PropCard({prop,favs,onFav,onCompare,inCompare,onOpen}){
  const ag=AGENTS[prop.agent]||AGENTS[0];
  const isFav=favs.includes(prop.id);
  const bc={HOT:"#EF4444",PRIME:"#7C3AED",NEW:T.green,OFF:T.gold};
  return(
    <div className="pc" onClick={()=>onOpen(prop)}
      style={{background:T.bg2,border:`1.5px solid ${inCompare?prop.color||T.blue:T.border}`,borderRadius:16,overflow:"hidden",cursor:"pointer"}}>
      <div style={{position:"relative",height:180}}>
        <img src={prop.photo} alt={prop.name} style={{width:"100%",height:"100%",objectFit:"cover"}} loading="lazy"/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(to bottom,transparent 55%,rgba(6,12,30,0.92))"}}/>
        {prop.badge&&<div style={{position:"absolute",top:10,left:10,background:bc[prop.badge]||T.blue,color:"#fff",fontSize:9,fontWeight:800,padding:"3px 9px",borderRadius:20,letterSpacing:"0.1em"}}>{prop.badge}</div>}
        <div style={{position:"absolute",top:8,right:8,display:"flex",gap:5}}>
          <button onClick={e=>{e.stopPropagation();onFav(prop.id);}}
            style={{width:29,height:29,borderRadius:"50%",background:"rgba(0,0,0,0.65)",border:"1px solid rgba(255,255,255,0.15)",fontSize:13,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>
            {isFav?"❤️":"🤍"}
          </button>
          <button onClick={e=>{e.stopPropagation();onCompare(prop);}}
            style={{width:29,height:29,borderRadius:"50%",background:inCompare?"rgba(59,130,246,0.8)":"rgba(0,0,0,0.65)",border:`1px solid ${inCompare?T.blue:"rgba(255,255,255,0.15)"}`,fontSize:12,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:700}}>
            {inCompare?"✓":"⊕"}
          </button>
        </div>
        {prop.visa&&<div style={{position:"absolute",bottom:8,left:8,background:"rgba(245,158,11,0.92)",color:"#000",fontSize:9,fontWeight:800,padding:"2px 8px",borderRadius:20}}>🏅 GOLDEN VISA</div>}
        <div style={{position:"absolute",bottom:8,right:8,background:"rgba(16,185,129,0.92)",color:"#000",fontSize:10,fontWeight:800,padding:"2px 8px",borderRadius:20}}>{prop.roi}% ROI</div>
      </div>
      <div style={{padding:"14px 14px 12px"}}>
        <div style={{fontSize:8,color:T.sub,textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:4}}>{prop.emirate} · {prop.area}</div>
        <div style={{fontSize:14,fontWeight:800,color:"#fff",marginBottom:4,lineHeight:1.2}}>{prop.name}</div>
        <div style={{fontSize:18,fontWeight:900,color:T.blue2,marginBottom:8}}>{fmt(prop.price)}</div>
        <div style={{display:"flex",gap:10,fontSize:11,color:T.sub,marginBottom:10}}>
          <span>{prop.beds>0?`🛏 ${prop.beds}BR`:"🛏 Studio"}</span>
          <span>🚿 {prop.baths}BA</span>
          <span>📐 {prop.sqft.toLocaleString()}sqft</span>
        </div>
        <div style={{marginBottom:10}}>
          <ScoreBar label="Transport" val={prop.score.transport}/>
          <ScoreBar label="Amenities" val={prop.score.amenity}/>
          <ScoreBar label="ROI" val={prop.score.roi}/>
          <ScoreBar label="Value" val={prop.score.value}/>
        </div>
        <div style={{display:"flex",gap:6}}>
          <a href={`https://wa.me/${(ag.wa||"").replace("+","")}?text=Hi, interested in ${prop.name} (${fmt(prop.price)})`}
            onClick={e=>e.stopPropagation()} target="_blank" rel="noopener noreferrer"
            style={{flex:1,padding:"8px 6px",background:"rgba(37,211,102,0.12)",border:"1px solid rgba(37,211,102,0.3)",borderRadius:8,color:"#25D366",fontSize:11,fontWeight:700,textDecoration:"none",textAlign:"center"}}>
            💬 WhatsApp
          </a>
          <button onClick={e=>{e.stopPropagation();onOpen(prop);}}
            style={{flex:1,padding:"8px 6px",background:T.card,border:`1px solid ${T.border}`,borderRadius:8,color:T.text,fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
            Details →
          </button>
        </div>
      </div>
    </div>
  );
}

function PropModal({prop,onClose,favs,onFav}){
  const ag=AGENTS[prop.agent]||AGENTS[0];
  const isFav=favs.includes(prop.id);
  const [photo,setPhoto]=useState(0);
  return(
    <div onClick={onClose} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div onClick={e=>e.stopPropagation()} style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:20,width:"100%",maxWidth:740,maxHeight:"92vh",overflowY:"auto"}}>
        <div style={{position:"relative",height:260}}>
          <img src={prop.photos?.[photo]||prop.photo} alt={prop.name} style={{width:"100%",height:"100%",objectFit:"cover",borderRadius:"20px 20px 0 0"}}/>
          <div style={{position:"absolute",bottom:10,left:"50%",transform:"translateX(-50%)",display:"flex",gap:6}}>
            {(prop.photos||[prop.photo]).map((_,i)=>(
              <div key={i} onClick={()=>setPhoto(i)} style={{width:i===photo?22:8,height:8,borderRadius:8,background:i===photo?"#fff":"rgba(255,255,255,0.35)",cursor:"pointer",transition:"all 0.2s"}}/>
            ))}
          </div>
          <button onClick={onClose} style={{position:"absolute",top:12,right:12,width:34,height:34,borderRadius:"50%",background:"rgba(0,0,0,0.7)",border:"none",color:"#fff",fontSize:18,cursor:"pointer"}}>×</button>
          {prop.visa&&<div style={{position:"absolute",top:12,left:12,background:"rgba(245,158,11,0.92)",color:"#000",fontSize:10,fontWeight:800,padding:"4px 12px",borderRadius:20}}>🏅 GOLDEN VISA ELIGIBLE</div>}
        </div>
        <div style={{padding:"20px 24px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
            <div>
              <div style={{fontSize:10,color:T.sub,textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:4}}>{prop.emirate} · {prop.area} · {prop.type}</div>
              <div style={{fontSize:20,fontWeight:900,color:"#fff",marginBottom:4}}>{prop.name}</div>
              <div style={{fontSize:26,fontWeight:900,color:T.blue2}}>{fmt(prop.price)}</div>
              <div style={{fontSize:12,color:T.sub}}>AED {Math.round(prop.price/prop.sqft).toLocaleString()}/sqft · {prop.sqft.toLocaleString()} sqft · Floor {prop.floor}</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontSize:26,fontWeight:900,color:T.green}}>{prop.roi}%</div>
              <div style={{fontSize:11,color:T.sub}}>Expected ROI</div>
              <div style={{fontSize:12,color:T.gold,fontWeight:700,marginTop:4}}>{prop.status}</div>
            </div>
          </div>
          <p style={{fontSize:13,color:T.sub,lineHeight:1.8,marginBottom:16}}>{prop.desc}</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px 24px",marginBottom:16}}>
            <ScoreBar label="Transport" val={prop.score.transport}/>
            <ScoreBar label="Amenities" val={prop.score.amenity}/>
            <ScoreBar label="ROI Score" val={prop.score.roi}/>
            <ScoreBar label="Value" val={prop.score.value}/>
          </div>
          <div style={{background:"rgba(255,255,255,0.03)",borderRadius:12,padding:"12px 16px",marginBottom:16}}>
            <div style={{fontSize:11,color:T.sub,fontWeight:700,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.1em"}}>📍 Distances (km)</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:12}}>
              {Object.entries(prop.nearby||{}).map(([k,v])=>(
                <div key={k} style={{fontSize:11}}>
                  <span style={{color:T.sub}}>{({metro:"🚇",mall:"🛍",grocery:"🛒",hospital:"🏥",school:"🏫",gym:"🏋"})[k]||"📍"} {k}: </span>
                  <span style={{fontWeight:700,color:"#fff"}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          {prop.ppPlan&&(
            <div style={{background:"rgba(59,130,246,0.08)",border:"1px solid rgba(59,130,246,0.2)",borderRadius:12,padding:"12px 16px",marginBottom:16}}>
              <div style={{fontSize:11,color:T.blue2,fontWeight:700,marginBottom:8,textTransform:"uppercase",letterSpacing:"0.1em"}}>📅 Payment Plan · Handover {prop.ppPlan.yr}</div>
              <div style={{display:"flex",gap:8}}>
                {["p1","p2","p3","p4"].map((k,i)=>prop.ppPlan[k]?(
                  <div key={k} style={{flex:prop.ppPlan[k],background:`rgba(59,130,246,${0.25+i*0.18})`,borderRadius:8,padding:"8px 4px",textAlign:"center",minWidth:36}}>
                    <div style={{fontSize:13,fontWeight:800,color:"#fff"}}>{prop.ppPlan[k]}%</div>
                    <div style={{fontSize:9,color:T.sub}}>Ph{i+1}</div>
                  </div>
                ):null)}
              </div>
            </div>
          )}
          <div style={{display:"flex",gap:12,alignItems:"center"}}>
            <img src={ag.photo} alt={ag.name} style={{width:42,height:42,borderRadius:"50%",objectFit:"cover",border:`2px solid ${T.border}`,flexShrink:0}}/>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{ag.name}</div>
              <div style={{fontSize:11,color:T.sub}}>{ag.agency} · {ag.rera}</div>
            </div>
            <div style={{display:"flex",gap:8,flexShrink:0}}>
              <button onClick={()=>onFav(prop.id)} style={{padding:"8px 12px",background:isFav?"rgba(239,68,68,0.15)":"rgba(255,255,255,0.06)",border:`1px solid ${isFav?"rgba(239,68,68,0.4)":T.border}`,borderRadius:8,color:isFav?"#EF4444":"#fff",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>
                {isFav?"❤️ Saved":"🤍 Save"}
              </button>
              <a href={`https://wa.me/${(ag.wa||"").replace("+","")}?text=Hi ${ag.name}, I'm interested in ${prop.name} at ${fmt(prop.price)}`}
                target="_blank" rel="noopener noreferrer"
                style={{padding:"8px 14px",background:"linear-gradient(135deg,#25D366,#128C7E)",borderRadius:8,color:"#fff",fontSize:12,fontWeight:700,textDecoration:"none"}}>
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TrendsTab(){
  const data=[
    {area:"JVC",p24:850,p26:1030,yield:9.1},{area:"JLT",p24:1100,p26:1380,yield:8.1},
    {area:"Business Bay",p24:1500,p26:1920,yield:7.9},{area:"Dubai Marina",p24:1800,p26:2280,yield:7.5},
    {area:"Dubai Hills",p24:1000,p26:1280,yield:7.4},{area:"Abu Dhabi",p24:1100,p26:1400,yield:7.2},
    {area:"Downtown",p24:2700,p26:3400,yield:6.5},{area:"Palm Jumeirah",p24:3500,p26:4500,yield:5.8},
  ];
  return(
    <div style={{maxWidth:1100,margin:"0 auto",padding:"28px 24px"}}>
      <div style={{fontSize:20,fontWeight:800,color:"#fff",marginBottom:4}}>📊 UAE Market Trends 2026</div>
      <div style={{fontSize:13,color:T.sub,marginBottom:24}}>Price/sqft (AED) · Rental yield · 2-year appreciation — DLD data Q1 2026</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:12,marginBottom:24}}>
        {[["AED 1,842","Dubai avg/sqft","+14% YoY"],["7.6%","Avg rental yield","+0.4% YoY"],["48,200","Q1 2026 transactions","+22% YoY"],["63%","Off-plan share","+8% YoY"],["78%","Expat buyer share","+3% YoY"],["AED 2M+","Golden Visa threshold","10-yr residency"]].map(([v,l,c])=>(
          <div key={l} style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:12,padding:"14px 16px"}}>
            <div style={{fontSize:10,color:T.sub,marginBottom:5,textTransform:"uppercase",letterSpacing:"0.1em"}}>{l}</div>
            <div style={{fontSize:18,fontWeight:800,color:"#fff"}}>{v}</div>
            <div style={{fontSize:11,color:T.green,fontWeight:700}}>{c}</div>
          </div>
        ))}
      </div>
      <div style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:16,padding:"20px 24px",marginBottom:20}}>
        <div style={{fontSize:14,fontWeight:700,color:"#fff",marginBottom:16}}>Price Appreciation 2024→2026 by Area</div>
        {data.sort((a,b)=>(b.p26-b.p24)/b.p24-(a.p26-a.p24)/a.p24).map(r=>{
          const pct=Math.round((r.p26-r.p24)/r.p24*100);
          return(
            <div key={r.area} style={{display:"flex",alignItems:"center",gap:12,marginBottom:10}}>
              <div style={{width:110,fontSize:12,color:T.text,flexShrink:0}}>{r.area}</div>
              <div style={{flex:1,height:24,background:"rgba(255,255,255,0.05)",borderRadius:6,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${Math.min(pct*2.8,100)}%`,background:`linear-gradient(90deg,${T.blue},${T.blue2})`,borderRadius:6,display:"flex",alignItems:"center",paddingLeft:8,transition:"width 0.6s"}}>
                  <span style={{fontSize:11,fontWeight:700,color:"#fff"}}>+{pct}%</span>
                </div>
              </div>
              <div style={{width:70,fontSize:12,color:T.sub,textAlign:"right"}}>{r.yield}% yield</div>
            </div>
          );
        })}
      </div>
      <div style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:16,overflow:"hidden"}}>
        <div style={{display:"grid",gridTemplateColumns:"1.4fr 1fr 1fr 1fr 1fr",padding:"12px 20px",borderBottom:`1px solid ${T.border}`,fontSize:10,color:T.sub,textTransform:"uppercase",letterSpacing:"0.1em"}}>
          <div>Area</div><div>2024 AED/sqft</div><div>2026 AED/sqft</div><div>Growth</div><div>Yield</div>
        </div>
        {data.map((r,i)=>(
          <div key={r.area} style={{display:"grid",gridTemplateColumns:"1.4fr 1fr 1fr 1fr 1fr",padding:"11px 20px",borderBottom:i<data.length-1?`1px solid ${T.border}`:undefined,alignItems:"center"}}>
            <div style={{fontSize:13,fontWeight:700,color:"#fff"}}>{r.area}</div>
            <div style={{fontSize:13,color:T.sub}}>{r.p24.toLocaleString()}</div>
            <div style={{fontSize:13,color:T.blue2,fontWeight:700}}>{r.p26.toLocaleString()}</div>
            <div style={{fontSize:13,color:T.green,fontWeight:700}}>+{Math.round((r.p26-r.p24)/r.p24*100)}%</div>
            <div style={{fontSize:13,color:T.green,fontWeight:700}}>{r.yield}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InvestTab(){
  const [price,setPrice]=useState(1500000);
  const [down,setDown]=useState(25);
  const [rate,setRate]=useState(4.29);
  const [term,setTerm]=useState(25);
  const [yld,setYld]=useState(7.5);
  const loan=price*(1-down/100);
  const monthly=loan*(rate/100/12)/(1-Math.pow(1+rate/100/12,-term*12));
  const netYld=yld-1.8;
  const cashFlow=price*netYld/100-monthly*12;
  return(
    <div style={{maxWidth:1100,margin:"0 auto",padding:"28px 24px"}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
        <div style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:16,padding:"20px 24px"}}>
          <div style={{fontSize:16,fontWeight:800,color:"#fff",marginBottom:18}}>🏦 Mortgage Calculator</div>
          {[[`Property Price: AED ${price.toLocaleString()}`,price,300000,15000000,50000,setPrice],
            [`Down Payment: ${down}%  →  AED ${(price*down/100).toLocaleString()}`,down,20,50,5,setDown],
            [`Interest Rate: ${rate.toFixed(2)}% p.a.`,rate*100,300,700,10,v=>setRate(v/100)],
            [`Loan Term: ${term} years`,term,5,25,5,setTerm]].map(([label,val,min,max,step,set])=>(
            <div key={label} style={{marginBottom:14}}>
              <div style={{fontSize:12,color:T.sub,marginBottom:5}}>{label}</div>
              <input type="range" min={min} max={max} step={step} value={val} onChange={e=>set(Number(e.target.value))} style={{width:"100%"}}/>
            </div>
          ))}
          <div style={{background:"rgba(59,130,246,0.08)",border:"1px solid rgba(59,130,246,0.2)",borderRadius:12,padding:"14px 18px"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {[["Monthly Payment",`AED ${Math.round(monthly).toLocaleString()}`],["Loan Amount",`AED ${Math.round(loan).toLocaleString()}`],
                ["Total Interest",`AED ${Math.round(monthly*term*12-loan).toLocaleString()}`],["Total Cost",`AED ${Math.round(monthly*term*12).toLocaleString()}`]].map(([l,v])=>(
                <div key={l}><div style={{fontSize:10,color:T.sub}}>{l}</div><div style={{fontSize:14,fontWeight:800,color:T.blue2}}>{v}</div></div>
              ))}
            </div>
          </div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:16,padding:"20px 24px"}}>
            <div style={{fontSize:16,fontWeight:800,color:"#fff",marginBottom:14}}>📈 ROI Calculator</div>
            <div style={{marginBottom:14}}>
              <div style={{fontSize:12,color:T.sub,marginBottom:5}}>Expected Gross Yield: {yld}%</div>
              <input type="range" min={4} max={12} step={0.5} value={yld} onChange={e=>setYld(Number(e.target.value))} style={{width:"100%",accentColor:T.green}}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              {[["Annual Gross Rent",`AED ${Math.round(price*yld/100).toLocaleString()}`,T.green],
                ["Net Yield (after charges)",`${netYld.toFixed(1)}%`,T.blue2],
                ["Annual Net Rent",`AED ${Math.round(price*netYld/100).toLocaleString()}`,T.green],
                ["Annual Cash Flow",`AED ${Math.round(cashFlow).toLocaleString()}`,cashFlow>0?T.green:"#EF4444"]].map(([l,v,c])=>(
                <div key={l} style={{background:"rgba(255,255,255,0.03)",borderRadius:10,padding:"10px 12px"}}>
                  <div style={{fontSize:10,color:T.sub,marginBottom:4}}>{l}</div>
                  <div style={{fontSize:15,fontWeight:800,color:c}}>{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{background:"rgba(245,158,11,0.06)",border:"1px solid rgba(245,158,11,0.25)",borderRadius:16,padding:"16px 20px"}}>
            <div style={{fontSize:14,fontWeight:800,color:"#fff",marginBottom:10}}>🏅 Golden Visa Check</div>
            {[[750000,"2-Year Investor Visa"],[2000000,"10-Year Golden Visa ✨"]].map(([min,label])=>(
              <div key={label} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div style={{fontSize:12,color:T.text}}>{label}</div>
                <div style={{fontSize:12,fontWeight:800,color:price>=min?T.green:"#EF4444"}}>{price>=min?"✅ ELIGIBLE":"🔒 Need AED "+(min-price).toLocaleString()+" more"}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:16,padding:"18px 24px",marginTop:20}}>
        <div style={{fontSize:14,fontWeight:700,color:"#fff",marginBottom:12}}>🏙️ Best-Yield Areas at a Glance</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:10}}>
          {[["Ajman Marina","10.5%","AED 220K"],["Intl City","10.2%","AED 290K"],["Discovery Gdn","9.8%","AED 380K"],["JVC","9.1%","AED 520K"],["JLT","8.1%","AED 590K"],["Business Bay","7.9%","AED 780K"],["Dubai Marina","7.5%","AED 920K"],["Dubai Hills","7.4%","AED 1.1M"]].map(([a,y,e])=>(
            <div key={a} style={{borderRadius:10,padding:"12px 14px",background:"rgba(255,255,255,0.03)",border:`1px solid ${T.border}`}}>
              <div style={{fontSize:12,fontWeight:700,color:"#fff",marginBottom:3}}>{a}</div>
              <div style={{fontSize:20,fontWeight:900,color:T.green}}>{y}</div>
              <div style={{fontSize:11,color:T.sub}}>From {e}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MapTab({onOpen}){
  const [sel,setSel]=useState(null);
  const [em,setEm]=useState("All");
  const filtered=em==="All"?ALL_PROPS:ALL_PROPS.filter(p=>p.emirate===em);
  const src=sel?`https://maps.google.com/maps?q=${encodeURIComponent(sel.mapQ||sel.area+" UAE")}&t=&z=15&ie=UTF8&iwloc=&output=embed`:em!=="All"?`https://maps.google.com/maps?q=${encodeURIComponent(em+" UAE")}&t=&z=11&ie=UTF8&iwloc=&output=embed`:"https://maps.google.com/maps?q=Dubai+UAE&t=&z=11&ie=UTF8&iwloc=&output=embed";
  return(
    <div style={{display:"grid",gridTemplateColumns:"300px 1fr",height:"calc(100vh - 60px)"}}>
      <div style={{overflowY:"auto",borderRight:`1px solid ${T.border}`,background:T.bg2}}>
        <div style={{padding:"10px 12px",borderBottom:`1px solid ${T.border}`,display:"flex",gap:5,flexWrap:"wrap"}}>
          {["All","Dubai","Abu Dhabi","Sharjah","RAK","Ajman"].map(e=>(
            <button key={e} onClick={()=>setEm(e==="RAK"?"Ras Al Khaimah":e)}
              style={{padding:"3px 9px",borderRadius:20,border:`1px solid ${em===e||em==="Ras Al Khaimah"&&e==="RAK"?T.blue:T.border}`,background:em===e||em==="Ras Al Khaimah"&&e==="RAK"?"rgba(59,130,246,0.15)":"transparent",color:em===e||em==="Ras Al Khaimah"&&e==="RAK"?T.blue2:T.sub,fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>
              {e}
            </button>
          ))}
        </div>
        <div style={{padding:"6px 5px"}}>
          {filtered.map(p=>(
            <div key={p.id} onClick={()=>setSel(p)}
              style={{display:"flex",gap:9,alignItems:"center",padding:"8px 9px",borderRadius:9,cursor:"pointer",background:sel?.id===p.id?"rgba(59,130,246,0.12)":"transparent",border:`1px solid ${sel?.id===p.id?"rgba(59,130,246,0.3)":"transparent"}`,marginBottom:2}}>
              <img src={p.photo} alt={p.name} style={{width:50,height:40,objectFit:"cover",borderRadius:7,flexShrink:0}}/>
              <div style={{minWidth:0}}>
                <div style={{fontSize:12,fontWeight:700,color:"#fff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.name}</div>
                <div style={{fontSize:10,color:T.sub}}>{p.area}</div>
                <div style={{fontSize:13,fontWeight:800,color:T.blue2}}>{fmt(p.price)}</div>
              </div>
              <div style={{marginLeft:"auto",flexShrink:0,textAlign:"right"}}>
                <div style={{fontSize:11,fontWeight:800,color:T.green}}>{p.roi}%</div>
                <div style={{fontSize:9,color:T.sub}}>ROI</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{position:"relative"}}>
        <iframe src={src} style={{width:"100%",height:"100%",border:"none"}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Property Map"/>
        {sel&&(
          <div style={{position:"absolute",bottom:20,left:"50%",transform:"translateX(-50%)",background:"rgba(13,22,41,0.97)",border:`1px solid ${T.border}`,borderRadius:14,padding:"12px 16px",display:"flex",gap:12,alignItems:"center",maxWidth:380,boxShadow:"0 8px 32px rgba(0,0,0,0.6)"}}>
            <img src={sel.photo} alt={sel.name} style={{width:52,height:44,objectFit:"cover",borderRadius:8}}/>
            <div style={{minWidth:0}}>
              <div style={{fontSize:13,fontWeight:800,color:"#fff"}}>{sel.name}</div>
              <div style={{fontSize:11,color:T.sub}}>{sel.area}</div>
              <div style={{fontSize:15,fontWeight:900,color:T.blue2}}>{fmt(sel.price)}</div>
            </div>
            <button onClick={()=>onOpen(sel)} style={{padding:"7px 13px",background:T.blue,border:"none",borderRadius:8,color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>View →</button>
          </div>
        )}
      </div>
    </div>
  );
}

function AIDecideTab({onOpen}){
  const [step,setStep]=useState(0);
  const [ans,setAns]=useState({});
  const [res,setRes]=useState(null);
  const qs=[
    {id:"budget",q:"💰 What is your total budget?",opts:["Under AED 500K","AED 500K – 1M","AED 1M – 2M","AED 2M – 5M","AED 5M+"]},
    {id:"purpose",q:"🎯 Primary purpose?",opts:["Investment / Rental income","Own use / Family home","Golden Visa eligibility","Mix — investment + visa"]},
    {id:"emirate",q:"🏙️ Preferred emirate?",opts:["Dubai","Abu Dhabi","Sharjah","Any — best value wins"]},
    {id:"type",q:"🛏 Preferred property type?",opts:["Studio","1 Bedroom","2+ Bedrooms","Villa"]},
    {id:"timeline",q:"⏱ Move-in / first rent collection?",opts:["Immediately (ready only)","Within 1 year","1 – 3 years","3+ years (off-plan OK)"]},
  ];
  const bMap={"Under AED 500K":[0,500000],"AED 500K – 1M":[500000,1000000],"AED 1M – 2M":[1000000,2000000],"AED 2M – 5M":[2000000,5000000],"AED 5M+":[5000000,1e8]};
  const handle=(id,val)=>{
    const next={...ans,[id]:val};
    setAns(next);
    if(step<qs.length-1){setStep(step+1);}
    else{
      const [bMin,bMax]=bMap[next.budget]||[0,1e8];
      const scored=ALL_PROPS.map(p=>{
        let s=0;
        if(p.price>=bMin&&p.price<=bMax)s+=30;
        if(next.emirate!=="Any — best value wins"&&p.emirate===next.emirate)s+=20;
        if(next.purpose?.includes("Investment")&&p.roi>=7)s+=20;
        if(next.purpose?.includes("visa")&&p.visa)s+=15;
        if(next.timeline?.includes("Immediately")&&p.status==="Ready")s+=15;
        if(next.timeline?.includes("3+")&&p.status==="Off-Plan")s+=10;
        if(next.type==="Studio"&&p.beds===0)s+=15;
        if(next.type==="1 Bedroom"&&p.beds===1)s+=15;
        if(next.type==="2+ Bedrooms"&&p.beds>=2)s+=15;
        if(next.type==="Villa"&&p.beds>=3)s+=15;
        s+=p.score.roi*1.2+p.score.value;
        return{...p,aiScore:Math.round(s)};
      }).sort((a,b)=>b.aiScore-a.aiScore).slice(0,3);
      setRes(scored);
    }
  };
  const why=p=>{
    const r=[];
    if(p.roi>=8)r.push(`High ROI: ${p.roi}%`);
    if(p.visa)r.push("Golden Visa eligible");
    if(p.status==="Ready")r.push("Ready immediately");
    if(p.score.transport>=8)r.push("Metro connected");
    if(p.score.amenity>=8)r.push("Premium amenities");
    return r;
  };
  if(res)return(
    <div style={{maxWidth:860,margin:"0 auto",padding:"32px 24px"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{fontSize:22,fontWeight:900,color:"#fff",marginBottom:6}}>🤖 Your Top 3 AI Matches</div>
        <div style={{fontSize:13,color:T.sub}}>Scored across budget, purpose, location, type, and timeline</div>
        <button onClick={()=>{setStep(0);setAns({});setRes(null);}} style={{marginTop:10,padding:"7px 16px",background:"transparent",border:`1px solid ${T.border}`,borderRadius:20,color:T.sub,fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>↺ Start over</button>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        {res.map((p,i)=>(
          <div key={p.id} style={{background:T.bg2,border:`1.5px solid ${i===0?T.blue:T.border}`,borderRadius:16,overflow:"hidden",display:"flex"}}>
            <div style={{width:150,flexShrink:0,position:"relative"}}>
              <img src={p.photo} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              <div style={{position:"absolute",top:8,left:8,background:i===0?T.blue:"rgba(0,0,0,0.7)",color:"#fff",fontSize:10,fontWeight:800,padding:"3px 9px",borderRadius:20}}>
                {i===0?"🥇 Best Match":`#${i+1}`}
              </div>
            </div>
            <div style={{flex:1,padding:"16px 20px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                <div>
                  <div style={{fontSize:10,color:T.sub,letterSpacing:"0.12em",textTransform:"uppercase",marginBottom:3}}>{p.emirate} · {p.area}</div>
                  <div style={{fontSize:15,fontWeight:800,color:"#fff"}}>{p.name}</div>
                  <div style={{fontSize:19,fontWeight:900,color:T.blue2}}>{fmt(p.price)}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:11,color:T.sub}}>AI Score</div>
                  <div style={{fontSize:26,fontWeight:900,color:i===0?T.blue2:T.text}}>{p.aiScore}</div>
                  <div style={{fontSize:12,color:T.green}}>{p.roi}% ROI</div>
                </div>
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:5,marginBottom:10}}>
                {why(p).map(r=>(
                  <span key={r} style={{fontSize:10,color:T.blue2,background:"rgba(59,130,246,0.1)",border:"1px solid rgba(59,130,246,0.2)",borderRadius:20,padding:"2px 9px"}}>✓ {r}</span>
                ))}
              </div>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>onOpen(p)} style={{padding:"7px 16px",background:i===0?`linear-gradient(135deg,${T.blue},#1D4ED8)`:T.card,border:`1px solid ${i===0?T.blue:T.border}`,borderRadius:8,color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>View Details →</button>
                <a href={`https://wa.me/971544735060?text=Hi Salman, AI matched me to ${p.name} (${fmt(p.price)}) — I'd like more info`} target="_blank" rel="noopener noreferrer"
                  style={{padding:"7px 13px",background:"rgba(37,211,102,0.1)",border:"1px solid rgba(37,211,102,0.3)",borderRadius:8,color:"#25D366",fontSize:12,fontWeight:700,textDecoration:"none"}}>
                  💬 Enquire
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  const q=qs[step];
  return(
    <div style={{maxWidth:600,margin:"60px auto",padding:"0 24px"}}>
      <div style={{display:"flex",gap:4,marginBottom:28}}>
        {qs.map((_,i)=><div key={i} style={{flex:1,height:4,borderRadius:4,background:i<=step?T.blue:"rgba(255,255,255,0.1)",transition:"background 0.3s"}}/>)}
      </div>
      <div style={{textAlign:"center",fontSize:12,color:T.sub,marginBottom:6}}>Question {step+1} of {qs.length}</div>
      <div style={{textAlign:"center",fontSize:22,fontWeight:900,color:"#fff",marginBottom:24}}>{q.q}</div>
      <div style={{display:"flex",flexDirection:"column",gap:9}}>
        {q.opts.map(opt=>(
          <button key={opt} onClick={()=>handle(q.id,opt)}
            style={{padding:"13px 18px",background:T.bg2,border:`1px solid ${T.border}`,borderRadius:12,color:T.text,fontSize:14,fontWeight:600,cursor:"pointer",fontFamily:"inherit",textAlign:"left",transition:"all 0.15s"}}
            onMouseEnter={e=>{e.target.style.borderColor=T.blue;e.target.style.background="rgba(59,130,246,0.1)";}}
            onMouseLeave={e=>{e.target.style.borderColor=T.border;e.target.style.background=T.bg2;}}>
            {opt}
          </button>
        ))}
      </div>
      {step>0&&<button onClick={()=>setStep(step-1)} style={{marginTop:14,background:"none",border:"none",color:T.sub,fontSize:12,cursor:"pointer",textDecoration:"underline"}}>← Back</button>}
    </div>
  );
}

function CompareTab({compare,onOpen,onRemove}){
  if(!compare.length)return(
    <div style={{textAlign:"center",padding:"80px 24px"}}>
      <div style={{fontSize:40,marginBottom:12}}>⚖️</div>
      <div style={{fontSize:18,fontWeight:700,color:"#fff",marginBottom:6}}>No properties selected</div>
      <div style={{fontSize:13,color:T.sub}}>Go to Properties and click ⊕ on up to 3 properties</div>
    </div>
  );
  const rows=[
    {l:"Price",f:p=>fmt(p.price)},{l:"Type",f:p=>p.type},{l:"Sqft",f:p=>p.sqft.toLocaleString()},
    {l:"AED/sqft",f:p=>`${Math.round(p.price/p.sqft).toLocaleString()}`},{l:"ROI",f:p=>`${p.roi}%`},
    {l:"Status",f:p=>p.status},{l:"Developer",f:p=>p.dev},{l:"Golden Visa",f:p=>p.visa?"✅":"❌"},
    {l:"Transport",f:p=>`${p.score.transport}/10`},{l:"Amenities",f:p=>`${p.score.amenity}/10`},
    {l:"ROI Score",f:p=>`${p.score.roi}/10`},{l:"Value",f:p=>`${p.score.value}/10`},
    {l:"Metro (km)",f:p=>p.nearby?.metro??"-"},{l:"Mall (km)",f:p=>p.nearby?.mall??"-"},
  ];
  return(
    <div style={{maxWidth:1200,margin:"0 auto",padding:"24px",overflowX:"auto"}}>
      <div style={{minWidth:500,display:"grid",gridTemplateColumns:`160px repeat(${compare.length},1fr)`,gap:8}}>
        <div/>
        {compare.map(p=>(
          <div key={p.id} style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:14,overflow:"hidden"}}>
            <div style={{position:"relative",height:130}}>
              <img src={p.photo} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              <button onClick={()=>onRemove(p.id)} style={{position:"absolute",top:6,right:6,width:24,height:24,borderRadius:"50%",background:"rgba(0,0,0,0.7)",border:"none",color:"#fff",fontSize:13,cursor:"pointer"}}>×</button>
            </div>
            <div style={{padding:"10px 12px"}}>
              <div style={{fontSize:11,color:T.sub}}>{p.area}</div>
              <div style={{fontSize:13,fontWeight:800,color:"#fff",lineHeight:1.2,marginBottom:3}}>{p.name}</div>
              <div style={{fontSize:16,fontWeight:900,color:T.blue2,marginBottom:8}}>{fmt(p.price)}</div>
              <button onClick={()=>onOpen(p)} style={{width:"100%",padding:"6px",background:T.blue,border:"none",borderRadius:8,color:"#fff",fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>View →</button>
            </div>
          </div>
        ))}
        {rows.map((r,ri)=>[
          <div key={r.l} style={{fontSize:11,color:T.sub,padding:"9px 12px",display:"flex",alignItems:"center",background:ri%2===0?"rgba(255,255,255,0.01)":"transparent"}}>{r.l}</div>,
          ...compare.map(p=>{
            const v=r.f(p);
            const all=compare.map(q=>parseFloat(r.f(q)));
            const nv=parseFloat(v);
            const isBest=!isNaN(nv)&&r.l!=="Type"&&r.l!=="Status"&&r.l!=="Developer"&&(r.l.includes("Price")||r.l.includes("km")?nv===Math.min(...all):nv===Math.max(...all));
            return(
              <div key={p.id} style={{background:ri%2===0?"rgba(255,255,255,0.02)":"transparent",border:`1px solid ${isBest?"rgba(16,185,129,0.3)":T.border}`,borderRadius:8,padding:"9px 12px",fontSize:12,fontWeight:600,color:isBest?T.green:T.text,textAlign:"center"}}>
                {v}{isBest&&" ⭐"}
              </div>
            );
          })
        ])}
      </div>
    </div>
  );
}

function HomeTab({onTabChange,onOpen}){
  const [em,setEm]=useState("Dubai");
  const hot=ALL_PROPS.filter(p=>p.badge==="HOT").slice(0,4);
  const prime=ALL_PROPS.filter(p=>p.badge==="PRIME").slice(0,3);
  return(
    <div>
      <div style={{background:"linear-gradient(135deg,rgba(59,130,246,0.1) 0%,rgba(99,102,241,0.07) 60%,transparent 100%)",borderBottom:`1px solid ${T.border}`,padding:"48px 24px 40px"}}>
        <div className="prop-hero-grid" style={{maxWidth:1200,margin:"0 auto",display:"grid",gridTemplateColumns:"minmax(0,1fr) minmax(0,340px)",gap:32,alignItems:"center"}}>
          <div>
            <div style={{display:"flex",gap:7,marginBottom:20,flexWrap:"wrap"}}>
              {[["DUBAI","Dubai"],["ABU DHABI","Abu Dhabi"],["SHARJAH","Sharjah"],["RAK","Ras Al Khaimah"]].map(([label,val])=>(
                <button key={label} onClick={()=>setEm(val)}
                  style={{padding:"5px 14px",borderRadius:24,border:`1px solid ${em===val?"rgba(59,130,246,0.7)":T.border}`,background:em===val?"rgba(59,130,246,0.18)":"rgba(255,255,255,0.04)",color:em===val?T.blue2:T.sub,fontSize:11,fontWeight:700,cursor:"pointer",fontFamily:"inherit",letterSpacing:"0.12em",transition:"all 0.15s"}}>
                  {label}
                </button>
              ))}
            </div>
            <h1 style={{fontSize:"clamp(28px,4vw,52px)",fontWeight:900,color:"#fff",lineHeight:1.1,marginBottom:12}}>
              Find Your Perfect<br/><span style={{color:T.blue2}}>UAE Property</span><br/>with AI Precision
            </h1>
            <p style={{fontSize:14,color:T.sub,lineHeight:1.85,marginBottom:24,maxWidth:460}}>
              30 curated properties across 4 emirates. Compare ROI, mortgage, and Golden Visa eligibility in one smart platform.
            </p>
            <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
              {[["🏙️ 30 Properties","4 Emirates"],["🤖 AI Match","5-question quiz"],["🏅 Golden Visa","Filter enabled"],["💰 Free Calculators","Mortgage + ROI"]].map(([a,b])=>(
                <div key={a} style={{fontSize:11}}><div style={{fontWeight:800,color:"#fff"}}>{a}</div><div style={{color:T.sub}}>{b}</div></div>
              ))}
            </div>
          </div>
          <div style={{background:"rgba(255,255,255,0.05)",border:`1px solid rgba(255,255,255,0.12)`,borderRadius:20,padding:"22px 20px",backdropFilter:"blur(20px)"}}>
            <div style={{fontSize:14,fontWeight:800,color:"#fff",marginBottom:14}}>🔍 Quick Search</div>
            {[["Emirate",em,setEm,["Dubai","Abu Dhabi","Sharjah","Ras Al Khaimah","Ajman"]],
              ["Budget","",()=>{},[" Any budget","Under AED 500K","AED 500K – 1M","AED 1M – 2M","AED 2M – 5M","AED 5M+"]],
              ["Type","",()=>{},["Any type","Studio","1 Bedroom","2 Bedroom","3 Bedroom"]]].map(([l,v,set,opts])=>(
              <div key={l} style={{marginBottom:10}}>
                <div style={{fontSize:11,color:T.sub,marginBottom:5}}>{l}</div>
                <select value={v} onChange={e=>set(e.target.value)}
                  style={{width:"100%",padding:"9px 12px",background:"rgba(255,255,255,0.06)",border:`1px solid ${T.border}`,borderRadius:10,color:"#fff",fontSize:13,fontFamily:"inherit"}}>
                  {opts.map(o=><option key={o} value={o} style={{background:T.bg2}}>{o}</option>)}
                </select>
              </div>
            ))}
            <button onClick={()=>onTabChange("search")} style={{width:"100%",padding:"11px",background:"linear-gradient(135deg,#3B82F6,#1D4ED8)",border:"none",borderRadius:11,color:"#fff",fontSize:14,fontWeight:800,cursor:"pointer",fontFamily:"inherit",marginBottom:7}}>
              Search Properties →
            </button>
            <button onClick={()=>onTabChange("ai")} style={{width:"100%",padding:"9px",background:"transparent",border:`1px solid rgba(245,158,11,0.4)`,borderRadius:11,color:T.gold,fontSize:13,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
              🤖 Let AI Choose For Me
            </button>
          </div>
        </div>
      </div>
      <div style={{maxWidth:1200,margin:"0 auto",padding:"28px 24px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div style={{fontSize:17,fontWeight:800,color:"#fff"}}>🔥 Hot Picks</div>
          <button onClick={()=>onTabChange("search")} style={{background:"none",border:"none",color:T.blue2,fontSize:12,fontWeight:700,cursor:"pointer"}}>View all →</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(250px,1fr))",gap:12,marginBottom:28}}>
          {hot.map(p=>(
            <div key={p.id} className="pc" onClick={()=>onOpen(p)} style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:14,overflow:"hidden",cursor:"pointer"}}>
              <div style={{position:"relative",height:148}}>
                <img src={p.photo} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                <div style={{position:"absolute",top:8,left:8,background:"#EF4444",color:"#fff",fontSize:9,fontWeight:800,padding:"3px 9px",borderRadius:20}}>HOT 🔥</div>
                <div style={{position:"absolute",bottom:8,right:8,background:"rgba(16,185,129,0.92)",color:"#000",fontSize:11,fontWeight:800,padding:"2px 8px",borderRadius:20}}>{p.roi}% ROI</div>
              </div>
              <div style={{padding:"11px 13px"}}>
                <div style={{fontSize:10,color:T.sub,marginBottom:3}}>{p.emirate} · {p.area}</div>
                <div style={{fontSize:13,fontWeight:700,color:"#fff",marginBottom:4}}>{p.name}</div>
                <div style={{fontSize:17,fontWeight:900,color:T.blue2}}>{fmt(p.price)}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{fontSize:17,fontWeight:800,color:"#fff",marginBottom:12}}>👑 Prime Listings</div>
        <div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:28}}>
          {prime.map(p=>(
            <div key={p.id} onClick={()=>onOpen(p)} className="pc" style={{background:T.bg2,border:"1px solid rgba(124,58,237,0.25)",borderRadius:14,display:"flex",cursor:"pointer",overflow:"hidden"}}>
              <div style={{width:116,flexShrink:0,position:"relative"}}>
                <img src={p.photo} alt={p.name} style={{width:"100%",height:"100%",objectFit:"cover"}}/>
                <div style={{position:"absolute",top:6,left:6,background:"#7C3AED",color:"#fff",fontSize:8,fontWeight:800,padding:"2px 7px",borderRadius:20}}>PRIME</div>
              </div>
              <div style={{padding:"13px 18px",display:"flex",flex:1,alignItems:"center",gap:16}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:10,color:T.sub,marginBottom:3}}>{p.emirate} · {p.area}</div>
                  <div style={{fontSize:14,fontWeight:800,color:"#fff"}}>{p.name}</div>
                  <div style={{fontSize:11,color:T.sub}}>{p.sqft.toLocaleString()} sqft · {p.type}</div>
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:19,fontWeight:900,color:T.blue2}}>{fmt(p.price)}</div>
                  <div style={{fontSize:12,color:T.green}}>{p.roi}% ROI</div>
                  {p.visa&&<div style={{fontSize:10,color:T.gold}}>🏅 Golden Visa</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{background:"linear-gradient(135deg,rgba(59,130,246,0.1),rgba(99,102,241,0.07))",border:`1px solid rgba(59,130,246,0.22)`,borderRadius:16,padding:"22px 26px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:16,flexWrap:"wrap"}}>
          <div>
            <div style={{fontSize:15,fontWeight:800,color:"#fff",marginBottom:4}}>💬 Need personal advice?</div>
            <div style={{fontSize:13,color:T.sub}}>Salman Ali · Dubai property advisor · +971 544 735 060</div>
          </div>
          <a href="https://wa.me/971544735060?text=Hi Salman, I'm looking for a property investment in UAE" target="_blank" rel="noopener noreferrer"
            style={{padding:"11px 22px",background:"linear-gradient(135deg,#25D366,#128C7E)",borderRadius:12,color:"#fff",fontSize:14,fontWeight:800,textDecoration:"none"}}>
            💬 WhatsApp Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PropComparePage(){
  const [mounted,setMounted]=useState(false);
  const [tab,setTab]=useState("home");
  const [modal,setModal]=useState(null);
  const [favs,setFavs]=useState([]);
  const [compare,setCompare]=useState([]);
  const [toast,setToast]=useState("");
  const [search,setSearch]=useState("");
  const [emirate,setEmirate]=useState("All");
  const [propType,setPropType]=useState("All");
  const [minROI,setMinROI]=useState(0);
  const [status,setStatus]=useState("All");
  const [visaOnly,setVisaOnly]=useState(false);
  const [sortBy,setSortBy]=useState("roi");
  const [beds,setBeds]=useState("All");

  useEffect(()=>{setMounted(true);try{setFavs(JSON.parse(localStorage.getItem("prop_favs")||"[]"));}catch(_){};},[]);

  const showToast=msg=>{setToast(msg);setTimeout(()=>setToast(""),2200);};

  const toggleFav=useCallback(id=>{
    setFavs(prev=>{
      const next=prev.includes(id)?prev.filter(x=>x!==id):[...prev,id];
      try{localStorage.setItem("prop_favs",JSON.stringify(next));}catch(_){}
      showToast(next.includes(id)?"❤️ Saved":"💔 Removed");
      return next;
    });
  },[]);

  const toggleCompare=useCallback(prop=>{
    setCompare(prev=>{
      if(prev.find(p=>p.id===prop.id))return prev.filter(p=>p.id!==prop.id);
      if(prev.length>=3){showToast("⚠️ Max 3 to compare");return prev;}
      showToast("✅ Added to compare");
      return[...prev,prop];
    });
  },[]);

  const filtered=useMemo(()=>ALL_PROPS.filter(p=>{
    if(emirate!=="All"&&p.emirate!==emirate)return false;
    if(propType!=="All"&&p.type!==propType)return false;
    if(p.roi<minROI)return false;
    if(status!=="All"&&p.status!==status)return false;
    if(visaOnly&&!p.visa)return false;
    if(beds==="Studio"&&p.beds!==0)return false;
    if(beds==="1BR"&&p.beds!==1)return false;
    if(beds==="2BR"&&p.beds!==2)return false;
    if(beds==="3BR+"&&p.beds<3)return false;
    if(search&&!p.name.toLowerCase().includes(search.toLowerCase())&&!p.area.toLowerCase().includes(search.toLowerCase()))return false;
    return true;
  }).sort((a,b)=>sortBy==="roi"?b.roi-a.roi:sortBy==="price_asc"?a.price-b.price:sortBy==="price_desc"?b.price-a.price:b.score.value-a.score.value),[emirate,propType,minROI,status,visaOnly,beds,search,sortBy]);

  if(!mounted)return<div style={{minHeight:"100vh", overflowX:"hidden", maxWidth:"100vw",background:T.bg}}/>;

  const TABS=[
    {id:"home",icon:"🏠",label:"Home"},{id:"search",icon:"🔍",label:"Properties"},
    {id:"compare",icon:"⚖️",label:`Compare${compare.length?` (${compare.length})`:""}`},
    {id:"map",icon:"🗺️",label:"Map"},{id:"invest",icon:"💰",label:"Investment"},
    {id:"trends",icon:"📊",label:"Trends"},{id:"ai",icon:"🤖",label:"AI Decide"},
    {id:"favs",icon:"❤️",label:`Saved${favs.length?` (${favs.length})`:""}`},
  ];

  return(
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap"/>
      <div suppressHydrationWarning style={{minHeight:"100vh", overflowX:"hidden", maxWidth:"100vw",background:T.bg,color:T.text,fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
        <style suppressHydrationWarning>{`
        @media(max-width:768px){
          .prop-hero-grid{grid-template-columns:1fr!important;gap:16px!important;}
          .prop-tabs{overflow-x:auto!important;-webkit-overflow-scrolling:touch!important;}
          .prop-tabs button{white-space:nowrap!important;flex-shrink:0!important;padding:5px 7px!important;font-size:10px!important;}
          .tab-label{display:none!important;}
          select,input{max-width:100%!important;box-sizing:border-box!important;}
          .prop-compare-table{overflow-x:auto!important;}
          .prop-map-container{height:60vh!important;}
        }
        
          *{box-sizing:border-box}
          ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:rgba(59,130,246,0.3);border-radius:10px}
          @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
          .fade{animation:fadeUp 0.3s ease}
          .pc:hover{transform:translateY(-4px)!important;box-shadow:0 14px 40px rgba(0,0,0,0.55)!important}
          .pc{transition:all 0.22s ease}
          .tb:hover{color:#fff!important}
          select option{background:#0D1629;color:#fff}
          input[type=range]{accent-color:#3B82F6;width:100%}
        `}</style>

        {/* NAV */}
        <nav style={{position:"sticky",top:0,zIndex:200,background:"rgba(6,12,30,0.97)",backdropFilter:"blur(24px)",borderBottom:`1px solid ${T.border}`,padding:"0 16px"}}>
          <div style={{maxWidth:1400,margin:"0 auto",height:56,display:"flex",alignItems:"center",gap:8,overflowX:"auto"}}>
            <Link href="/" style={{display:"flex",alignItems:"center",gap:8,textDecoration:"none",flexShrink:0,marginRight:6}}>
              <div style={{width:28,height:28,borderRadius:7,background:"linear-gradient(135deg,#3B82F6,#1D4ED8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13}}>🏙️</div>
              <div><div style={{fontSize:13,fontWeight:900,color:"#fff",lineHeight:1}}>PropCompare</div><div style={{fontSize:8,color:T.sub,letterSpacing:"0.1em"}}>UAE · 2026</div></div>
            </Link>
            <div style={{display:"flex",gap:2,background:"rgba(255,255,255,0.04)",borderRadius:10,padding:3,flexShrink:0}}>
              {TABS.map(t=>(
                <button key={t.id} className="tb" onClick={()=>setTab(t.id)}
                  style={{padding:"5px 10px",borderRadius:8,border:"none",background:tab===t.id?"#3B82F6":"transparent",color:tab===t.id?"#fff":T.sub,fontSize:11,fontWeight:tab===t.id?700:400,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",transition:"all 0.15s"}}>
                  <span className="tab-icon">{t.icon}</span><span className="tab-label"> {t.label}</span>
                </button>
              ))}
            </div>
            <div style={{marginLeft:"auto",display:"flex",gap:6,flexShrink:0}}>
              <Link href="/properties/blog" style={{padding:"5px 11px",background:"rgba(59,130,246,0.1)",border:"1px solid rgba(59,130,246,0.3)",borderRadius:8,color:T.blue2,fontSize:11,fontWeight:700,textDecoration:"none",whiteSpace:"nowrap"}}>📝 Blog</Link>
              <Link href="/" style={{padding:"5px 9px",border:`1px solid ${T.border}`,borderRadius:8,color:T.sub,fontSize:11,textDecoration:"none"}}>←</Link>
            </div>
          </div>
        </nav>

        {/* CONTENT */}
        {tab==="home"&&<HomeTab onTabChange={setTab} onOpen={setModal}/>}

        {tab==="search"&&(
          <div style={{maxWidth:1400,margin:"0 auto",padding:"18px 16px"}}>
            <div style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:14,padding:"14px 18px",marginBottom:14,display:"flex",flexWrap:"wrap",gap:9,alignItems:"flex-end"}}>
              <div style={{flex:"1 1 170px"}}>
                <div style={{fontSize:10,color:T.sub,marginBottom:4}}>Search</div>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Area or name..."
                  style={{width:"100%",padding:"8px 10px",background:"rgba(255,255,255,0.05)",border:`1px solid ${T.border}`,borderRadius:8,color:"#fff",fontSize:13,fontFamily:"inherit"}}/>
              </div>
              {[["Emirate",emirate,setEmirate,["All","Dubai","Abu Dhabi","Sharjah","Ras Al Khaimah","Ajman"]],
                ["Type",propType,setPropType,["All","Studio","1 Bedroom","2 Bedroom","3 Bedroom"]],
                ["Beds",beds,setBeds,["All","Studio","1BR","2BR","3BR+"]],
                ["Status",status,setStatus,["All","Ready","Off-Plan"]],
                ["Sort",sortBy,setSortBy,[["roi","Best ROI"],["price_asc","Price ↑"],["price_desc","Price ↓"],["value","Best Value"]]]].map(([l,v,set,opts])=>(
                <div key={l} style={{flex:"1 1 110px"}}>
                  <div style={{fontSize:10,color:T.sub,marginBottom:4}}>{l}</div>
                  <select value={v} onChange={e=>set(e.target.value)}
                    style={{width:"100%",padding:"8px 10px",background:"rgba(255,255,255,0.05)",border:`1px solid ${T.border}`,borderRadius:8,color:"#fff",fontSize:13,fontFamily:"inherit"}}>
                    {opts.map(o=>Array.isArray(o)?<option key={o[0]} value={o[0]}>{o[1]}</option>:<option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <button onClick={()=>setVisaOnly(!visaOnly)}
                style={{padding:"8px 13px",background:visaOnly?"rgba(245,158,11,0.15)":"rgba(255,255,255,0.04)",border:`1px solid ${visaOnly?"rgba(245,158,11,0.5)":T.border}`,borderRadius:8,color:visaOnly?T.gold:T.sub,fontSize:11,fontWeight:visaOnly?700:400,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>
                🏅 Golden Visa
              </button>
              <div style={{flex:"1 1 120px"}}>
                <div style={{fontSize:10,color:T.sub,marginBottom:4}}>Min ROI: {minROI}%</div>
                <input type="range" min={0} max={11} step={0.5} value={minROI} onChange={e=>setMinROI(Number(e.target.value))}/>
              </div>
            </div>
            <div style={{fontSize:12,color:T.sub,marginBottom:12}}>
              {filtered.length} properties
              {compare.length>0&&<> · <span style={{color:T.blue2,fontWeight:700}}>{compare.length} in compare</span> · <button onClick={()=>setTab("compare")} style={{background:"none",border:"none",color:T.blue2,cursor:"pointer",fontSize:12,fontWeight:700,textDecoration:"underline"}}>View →</button></>}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(275px,1fr))",gap:13}}>
              {filtered.map(p=><PropCard key={p.id} prop={p} favs={favs} onFav={toggleFav} onCompare={toggleCompare} inCompare={!!compare.find(c=>c.id===p.id)} onOpen={setModal}/>)}
            </div>
            {!filtered.length&&(
              <div style={{textAlign:"center",padding:60,color:T.sub}}>
                <div style={{fontSize:30,marginBottom:8}}>🔍</div>
                <div style={{fontSize:15,fontWeight:700,color:"#fff"}}>No results — try clearing filters</div>
                <button onClick={()=>{setEmirate("All");setPropType("All");setMinROI(0);setStatus("All");setVisaOnly(false);setBeds("All");setSearch("");}}
                  style={{marginTop:12,padding:"8px 18px",background:T.blue,border:"none",borderRadius:8,color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
                  Clear filters
                </button>
              </div>
            )}
          </div>
        )}

        {tab==="compare"&&<CompareTab compare={compare} onOpen={setModal} onRemove={id=>setCompare(prev=>prev.filter(p=>p.id!==id))}/>}
        {tab==="map"&&<MapTab onOpen={setModal}/>}
        {tab==="invest"&&<InvestTab/>}
        {tab==="trends"&&<TrendsTab/>}
        {tab==="ai"&&<AIDecideTab onOpen={setModal}/>}
        {tab==="favs"&&(
          <div style={{maxWidth:1200,margin:"0 auto",padding:"24px 16px"}}>
            {!favs.length?(
              <div style={{textAlign:"center",padding:60}}>
                <div style={{fontSize:36,marginBottom:10}}>❤️</div>
                <div style={{fontSize:16,fontWeight:700,color:"#fff",marginBottom:4}}>No saved properties yet</div>
                <div style={{fontSize:13,color:T.sub}}>Tap 🤍 on any property to save it here</div>
              </div>
            ):(
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(275px,1fr))",gap:13}}>
                {ALL_PROPS.filter(p=>favs.includes(p.id)).map(p=><PropCard key={p.id} prop={p} favs={favs} onFav={toggleFav} onCompare={toggleCompare} inCompare={!!compare.find(c=>c.id===p.id)} onOpen={setModal}/>)}
              </div>
            )}
          </div>
        )}

        {toast&&(
          <div style={{position:"fixed",bottom:22,left:"50%",transform:"translateX(-50%)",background:"rgba(13,22,41,0.97)",border:`1px solid ${T.border}`,borderRadius:12,padding:"9px 20px",fontSize:13,fontWeight:700,color:"#fff",zIndex:999,backdropFilter:"blur(12px)"}}>
            {toast}
          </div>
        )}
        {modal&&<PropModal prop={modal} onClose={()=>setModal(null)} favs={favs} onFav={toggleFav}/>}
      </div>
    </>
  );
}
