"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function SalmanFXContact() {
  const [mounted, setMounted] = useState(false);
  const [form, setForm]       = useState({ name:"", phone:"", plan:"Pro EA Bundle", message:"" });
  const [sent, setSent]       = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div style={{ minHeight:"100vh", background:"#060A0D" }}/>;

  const T = { bg:"#060A0D", card:"rgba(255,255,255,0.04)", border:"rgba(255,255,255,0.07)", text:"#E8F0E8", sub:"rgba(255,255,255,0.42)", green:"#10B981" };
  const INP = { width:"100%", padding:"11px 14px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(16,185,129,0.2)", borderRadius:10, color:T.text, fontSize:13, fontFamily:"'Plus Jakarta Sans',sans-serif", outline:"none" };

  const submit = (e) => {
    e.preventDefault();
    const msg = `🤖 *SalmanFX EA Inquiry*\n\nName: ${form.name}\nPhone: ${form.phone}\nPlan: ${form.plan}\nMessage: ${form.message||"—"}`;
    window.open(`https://wa.me/971544735060?text=${encodeURIComponent(msg)}`,"_blank");
    setSent(true);
  };

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"/>
      <div suppressHydrationWarning style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
        <style suppressHydrationWarning>{`*{box-sizing:border-box}input:focus,textarea:focus,select:focus{border-color:rgba(16,185,129,0.5)!important;outline:none!important}select option{background:#060A0D;color:#fff}`}</style>
        <div style={{ background:"rgba(0,0,0,0.4)", borderBottom:`1px solid ${T.border}`, padding:"16px 28px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:16, fontWeight:700, color:T.green }}>SalmanFX</div>
          <div style={{ display:"flex", gap:10 }}>
            <Link href="/salmanfx/about" style={{ color:T.sub, fontSize:12, textDecoration:"none", padding:"7px 14px" }}>About</Link>
            <Link href="/salmanfx/blog" style={{ color:T.sub, fontSize:12, textDecoration:"none", padding:"7px 14px" }}>Blog</Link>
            <Link href="/salmanfx" style={{ padding:"7px 16px", background:"linear-gradient(135deg,#10B981,#059669)", borderRadius:20, color:"#fff", fontSize:12, fontWeight:700, textDecoration:"none" }}>Get EA →</Link>
          </div>
        </div>
        <div style={{ maxWidth:820, margin:"0 auto", padding:"48px 28px" }}>
          <h1 style={{ fontSize:"clamp(24px,4vw,42px)", fontWeight:900, color:"#fff", marginBottom:8, textAlign:"center" }}>Buy an EA or Ask a Question 🤖</h1>
          <p style={{ fontSize:13, color:T.sub, textAlign:"center", marginBottom:36 }}>Fast response on WhatsApp — usually within 30 minutes during Dubai business hours</p>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:28, alignItems:"start" }}>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {[{ic:"💬",ti:"WhatsApp (fastest)",va:"+971 544 735 060",hr:`https://wa.me/971544735060`,cl:"#25D366"},{ic:"📞",ti:"Call Direct",va:"+971 544 735 060",hr:`tel:+971544735060`,cl:"#818CF8"},{ic:"📧",ti:"Email",va:"info@dubairovers.com",hr:`mailto:info@dubairovers.com`,cl:"#F59E0B"}].map(c => (
                <div key={c.ti} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:11, padding:"14px 16px", display:"flex", gap:12, alignItems:"center" }}>
                  <div style={{ width:36, height:36, borderRadius:8, background:`${c.cl}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>{c.ic}</div>
                  <div>
                    <div style={{ fontSize:10, color:T.sub, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:2 }}>{c.ti}</div>
                    <a href={c.hr} target="_blank" rel="noopener noreferrer" style={{ fontSize:13, fontWeight:600, color:c.cl, textDecoration:"none" }}>{c.va}</a>
                  </div>
                </div>
              ))}
              <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:11, padding:"14px 16px" }}>
                <div style={{ fontSize:11, color:T.green, fontWeight:700, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.08em" }}>EA Plans</div>
                {[["Starter","AED 299","1 account","salmanfx2025"],["Pro Bundle","AED 699","3 accounts","Best value"],["VIP","AED 1,499","Unlimited","+ source code"]].map(([n,p,ac,note]) => (
                  <div key={n} style={{ display:"flex", justifyContent:"space-between", fontSize:12, padding:"5px 0", borderBottom:`1px solid rgba(255,255,255,0.05)`, color:T.sub }}>
                    <span>{n}</span><span style={{ color:T.green, fontWeight:600 }}>{p}</span><span style={{ color:T.sub }}>{ac}</span>
                  </div>
                ))}
              </div>
            </div>
            {sent ? (
              <div style={{ background:"rgba(16,185,129,0.07)", border:"1px solid rgba(16,185,129,0.25)", borderRadius:14, padding:"36px 22px", textAlign:"center" }}>
                <div style={{ fontSize:44, marginBottom:10 }}>✅</div>
                <div style={{ fontSize:17, fontWeight:700, color:T.green, marginBottom:6 }}>Message Sent!</div>
                <p style={{ fontSize:12, color:T.sub, lineHeight:1.7 }}>Salman will respond within 30 minutes.</p>
                <button onClick={()=>{setSent(false);setForm({name:"",phone:"",plan:"Pro EA Bundle",message:""}); }} style={{ marginTop:14, padding:"8px 18px", background:T.card, border:`1px solid ${T.border}`, borderRadius:9, color:T.sub, fontSize:12, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={submit} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:14, padding:"22px 22px", display:"flex", flexDirection:"column", gap:13 }}>
                <div style={{ fontSize:14, fontWeight:700, marginBottom:4 }}>Quick Inquiry</div>
                {[{l:"Your Name *",k:"name",ph:"Muhammad Asad"},{l:"Phone / WhatsApp *",k:"phone",ph:"+971 50 000 0000"}].map(f => (
                  <div key={f.k}>
                    <label style={{ fontSize:10, color:T.sub, display:"block", marginBottom:4, textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:600 }}>{f.l}</label>
                    <input value={form[f.k]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))} placeholder={f.ph} required style={{ ...INP }}/>
                  </div>
                ))}
                <div>
                  <label style={{ fontSize:10, color:T.sub, display:"block", marginBottom:4, textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:600 }}>Interested In</label>
                  <select value={form.plan} onChange={e=>setForm(p=>({...p,plan:e.target.value}))} style={{ ...INP }}>
                    {["Starter EA (AED 299)","Pro EA Bundle (AED 699)","VIP Package (AED 1,499)","Free Demo License","General Question"].map(o=><option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize:10, color:T.sub, display:"block", marginBottom:4, textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:600 }}>Message (optional)</label>
                  <textarea value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))} placeholder="Your broker, account type, experience level..." rows={3} style={{ ...INP, resize:"vertical" }}/>
                </div>
                <button type="submit" style={{ padding:"12px", background:"linear-gradient(135deg,#25D366,#128C7E)", border:"none", borderRadius:10, color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
                  💬 Send via WhatsApp →
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
