"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function PropertiesContact() {
  const [mounted, setMounted] = useState(false);
  const [form, setForm]       = useState({ name:"", phone:"", type:"Buy", message:"" });
  const [sent, setSent]       = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;
  const T = { bg:"#080810", card:"rgba(255,255,255,0.04)", border:"rgba(255,255,255,0.08)", text:"#F1F5F9", sub:"rgba(255,255,255,0.45)", blue:"#6366F1", green:"#10B981", gold:"#F59E0B" };
  const INP = { width:"100%", padding:"11px 14px", background:"rgba(255,255,255,0.05)", border:`1px solid ${T.border}`, borderRadius:10, color:T.text, fontSize:13, fontFamily:"Inter,sans-serif", outline:"none" };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `🏙️ *Dubai Properties Inquiry*\n\nName: ${form.name}\nPhone: ${form.phone}\nLooking to: ${form.type}\nMessage: ${form.message||"No message"}`;
    window.open(`https://wa.me/971544735060?text=${encodeURIComponent(msg)}`,"_blank");
    setSent(true);
  };

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap"/>
      <div suppressHydrationWarning style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Inter',sans-serif" }}>
      <style suppressHydrationWarning>{`*{box-sizing:border-box}input:focus,textarea:focus,select:focus{border-color:rgba(99,102,241,0.5)!important;outline:none!important}`}</style>
      <div style={{ background:"rgba(0,0,0,0.4)", borderBottom:`1px solid ${T.border}`, padding:"16px 28px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ fontSize:18, fontWeight:800 }}>🏙️ Contact Dubai Properties</div>
        <div style={{ display:"flex", gap:10 }}>
          <Link href="/properties/about" style={{ color:T.sub, fontSize:13, textDecoration:"none", padding:"7px 14px" }}>About</Link>
          <Link href="/properties" style={{ padding:"8px 16px", background:"linear-gradient(135deg,#6366F1,#4F46E5)", borderRadius:20, color:"#fff", fontSize:12, fontWeight:700, textDecoration:"none" }}>Browse Properties</Link>
        </div>
      </div>
      <div style={{ maxWidth:840, margin:"0 auto", padding:"48px 28px" }}>
        <h1 style={{ fontSize:"clamp(26px,4vw,44px)", fontWeight:900, color:"#fff", marginBottom:8, textAlign:"center" }}>Talk to a Property Expert 🏙️</h1>
        <p style={{ fontSize:13, color:T.sub, textAlign:"center", marginBottom:40 }}>Free consultation — no obligation</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:28, alignItems:"start" }}>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {[
              { icon:"💬", title:"WhatsApp (recommended)", val:"+971 544 735 060", href:`https://wa.me/971544735060`, color:"#25D366" },
              { icon:"📞", title:"Call Direct",            val:"+971 544 735 060", href:`tel:+971544735060`,           color:T.blue },
              { icon:"📧", title:"Email",                  val:"info@dubairovers.com", href:`mailto:info@dubairovers.com`, color:T.gold },
              { icon:"📍", title:"Office",                 val:"Dubai, UAE",         href:null, color:T.sub },
            ].map(c=>(
              <div key={c.title} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:11, padding:"14px 16px", display:"flex", gap:12, alignItems:"center" }}>
                <div style={{ width:36, height:36, borderRadius:8, background:`${c.color}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize:10, color:T.sub, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:2 }}>{c.title}</div>
                  {c.href ? <a href={c.href} target="_blank" rel="noopener noreferrer" style={{ fontSize:13, fontWeight:600, color:c.color, textDecoration:"none" }}>{c.val}</a>
                    : <div style={{ fontSize:13, fontWeight:600, color:T.text }}>{c.val}</div>}
                </div>
              </div>
            ))}
            <div style={{ background:"rgba(16,185,129,0.06)", border:"1px solid rgba(16,185,129,0.15)", borderRadius:11, padding:"14px 16px" }}>
              <div style={{ fontSize:11, color:T.green, fontWeight:700, marginBottom:8 }}>Office Hours</div>
              {[["Sunday–Thursday","9:00 AM – 6:00 PM"],["Friday","10:00 AM – 2:00 PM"],["WhatsApp","Available 24/7"]].map(([d,h])=>(
                <div key={d} style={{ display:"flex", justifyContent:"space-between", fontSize:12, padding:"4px 0", color:T.sub }}>
                  <span>{d}</span><span style={{ color:T.text, fontWeight:600 }}>{h}</span>
                </div>
              ))}
            </div>
          </div>
          {sent ? (
            <div style={{ background:"rgba(16,185,129,0.07)", border:"1px solid rgba(16,185,129,0.3)", borderRadius:14, padding:"36px 24px", textAlign:"center" }}>
              <div style={{ fontSize:44, marginBottom:10 }}>✅</div>
              <div style={{ fontSize:18, fontWeight:700, color:T.green, marginBottom:6 }}>Inquiry Sent!</div>
              <p style={{ fontSize:12, color:T.sub, lineHeight:1.7 }}>Salman will contact you within 30 minutes during business hours.</p>
              <button onClick={()=>{setSent(false);setForm({name:"",phone:"",type:"Buy",message:""}); }}
                style={{ marginTop:14, padding:"8px 18px", background:T.card, border:`1px solid ${T.border}`, borderRadius:9, color:T.sub, fontSize:12, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>Send Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:14, padding:"22px 22px", display:"flex", flexDirection:"column", gap:12 }}>
              <div style={{ fontSize:14, fontWeight:700, marginBottom:4 }}>Quick Inquiry</div>
              <div>
                <label style={{ fontSize:10, color:T.sub, display:"block", marginBottom:4, textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:600 }}>Your Name *</label>
                <input value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} placeholder="Ahmed Khan" required style={{ ...INP }}/>
              </div>
              <div>
                <label style={{ fontSize:10, color:T.sub, display:"block", marginBottom:4, textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:600 }}>Phone / WhatsApp *</label>
                <input value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))} placeholder="+971 50 000 0000" required style={{ ...INP }}/>
              </div>
              <div>
                <label style={{ fontSize:10, color:T.sub, display:"block", marginBottom:4, textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:600 }}>I'm Looking to</label>
                <select value={form.type} onChange={e=>setForm(p=>({...p,type:e.target.value}))} style={{ ...INP }}>
                  {["Buy","Rent","Invest","Get advice"].map(o=><option key={o}>{o}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize:10, color:T.sub, display:"block", marginBottom:4, textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:600 }}>Message (optional)</label>
                <textarea value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))} placeholder="Budget, area preference, timeline..." rows={3} style={{ ...INP, resize:"vertical" }}/>
              </div>
              <button type="submit" style={{ padding:"12px", background:"linear-gradient(135deg,#25D366,#128C7E)", border:"none", borderRadius:10, color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>
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
