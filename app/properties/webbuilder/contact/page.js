"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function WebBuilderContact() {
  const [mounted, setMounted] = useState(false);
  const [form, setForm]       = useState({ name:"", phone:"", biz:"", category:"Restaurant", budget:"AED 4,000–8,000", message:"" });
  const [sent, setSent]       = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div style={{ minHeight:"100vh", background:"#0A060F" }}/>;

  const T = { bg:"#0A060F", card:"rgba(255,255,255,0.04)", border:"rgba(255,255,255,0.07)", text:"#F0ECF8", sub:"rgba(255,255,255,0.42)", pink:"#EC4899" };
  const INP = { width:"100%", padding:"11px 14px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(236,72,153,0.2)", borderRadius:10, color:T.text, fontSize:13, fontFamily:"'Plus Jakarta Sans',sans-serif", outline:"none" };

  const submit = (e) => {
    e.preventDefault();
    const msg = `💻 *Website Inquiry*\n\nName: ${form.name}\nPhone: ${form.phone}\nBusiness: ${form.biz}\nCategory: ${form.category}\nBudget: ${form.budget}\nMessage: ${form.message||"—"}`;
    window.open(`https://wa.me/971544735060?text=${encodeURIComponent(msg)}`,"_blank");
    setSent(true);
  };

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"/>
      <div suppressHydrationWarning style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
        <style suppressHydrationWarning>{`*{box-sizing:border-box}input:focus,textarea:focus,select:focus{border-color:rgba(236,72,153,0.5)!important;outline:none!important}select option{background:#0A060F;color:#fff}`}</style>
        <div style={{ background:"rgba(0,0,0,0.4)", borderBottom:`1px solid ${T.border}`, padding:"16px 28px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:800, color:T.pink }}>Web Builder</div>
          <div style={{ display:"flex", gap:10 }}>
            <Link href="/webbuilder/about" style={{ color:T.sub, fontSize:12, textDecoration:"none", padding:"7px 14px" }}>About</Link>
            <Link href="/webbuilder/blog" style={{ color:T.sub, fontSize:12, textDecoration:"none", padding:"7px 14px" }}>Blog</Link>
            <Link href="/webbuilder" style={{ padding:"7px 16px", background:"linear-gradient(135deg,#EC4899,#8B5CF6)", borderRadius:20, color:"#fff", fontSize:12, fontWeight:700, textDecoration:"none" }}>← Back</Link>
          </div>
        </div>

        <div style={{ maxWidth:840, margin:"0 auto", padding:"48px 28px" }}>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(24px,4vw,42px)", fontWeight:800, color:"#fff", marginBottom:8, textAlign:"center" }}>
            Get a Free Quote 💻
          </h1>
          <p style={{ fontSize:13, color:T.sub, textAlign:"center", marginBottom:36 }}>Tell me about your business — I'll reply within 1 hour with a price and timeline</p>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:28, alignItems:"start" }}>
            {/* Contact info */}
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {[{ic:"💬",ti:"WhatsApp (fastest)",va:"+971 544 735 060",hr:"https://wa.me/971544735060",cl:"#25D366"},{ic:"📞",ti:"Call Direct",va:"+971 544 735 060",hr:"tel:+971544735060",cl:"#818CF8"},{ic:"📧",ti:"Email",va:"info@dubairovers.com",hr:"mailto:info@dubairovers.com",cl:"#F59E0B"}].map(c => (
                <div key={c.ti} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:11, padding:"14px 16px", display:"flex", gap:12, alignItems:"center" }}>
                  <div style={{ width:36, height:36, borderRadius:8, background:`${c.cl}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>{c.ic}</div>
                  <div>
                    <div style={{ fontSize:10, color:T.sub, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:2 }}>{c.ti}</div>
                    <a href={c.hr} target="_blank" rel="noopener noreferrer" style={{ fontSize:13, fontWeight:600, color:c.cl, textDecoration:"none" }}>{c.va}</a>
                  </div>
                </div>
              ))}

              <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:11, padding:"14px 16px" }}>
                <div style={{ fontSize:11, color:T.pink, fontWeight:700, marginBottom:10, textTransform:"uppercase", letterSpacing:"0.08em" }}>Typical Prices</div>
                {[["Starter","AED 1,200–3,000","5–8 pages"],["Business","AED 4,000–8,000","+ Booking + Admin"],["Platform","AED 12,000–25,000","+ AI + Maps"],["Enterprise","AED 30,000+","Full SaaS"]].map(([n,p,d]) => (
                  <div key={n} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", fontSize:12, padding:"6px 0", borderBottom:`1px solid rgba(255,255,255,0.05)` }}>
                    <span style={{ color:"#fff", fontWeight:600 }}>{n}</span>
                    <span style={{ color:T.pink, fontWeight:600 }}>{p}</span>
                    <span style={{ color:T.sub, fontSize:10 }}>{d}</span>
                  </div>
                ))}
              </div>

              <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:11, padding:"14px 16px" }}>
                <div style={{ fontSize:11, color:T.pink, fontWeight:700, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.08em" }}>✅ What You Get</div>
                {["Live demo before paying","Source code is yours","Mobile + Arabic + English","Admin panel included","WhatsApp integration on all pages","Vercel deployment + SSL"].map(f => (
                  <div key={f} style={{ fontSize:12, color:T.sub, padding:"4px 0", display:"flex", gap:7 }}>
                    <span style={{ color:T.pink }}>✓</span>{f}
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            {sent ? (
              <div style={{ background:"rgba(236,72,153,0.07)", border:"1px solid rgba(236,72,153,0.25)", borderRadius:14, padding:"36px 22px", textAlign:"center" }}>
                <div style={{ fontSize:44, marginBottom:10 }}>✅</div>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:17, fontWeight:800, color:T.pink, marginBottom:6 }}>Message Sent!</div>
                <p style={{ fontSize:12, color:T.sub, lineHeight:1.7 }}>Salman will reply within 1 hour with a price and demo preview.</p>
                <button onClick={()=>{setSent(false);setForm({name:"",phone:"",biz:"",category:"Restaurant",budget:"AED 4,000–8,000",message:""}); }} style={{ marginTop:14, padding:"8px 18px", background:T.card, border:`1px solid ${T.border}`, borderRadius:9, color:T.sub, fontSize:12, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>Send Another</button>
              </div>
            ) : (
              <form onSubmit={submit} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:14, padding:"22px 22px", display:"flex", flexDirection:"column", gap:13 }}>
                <div style={{ fontFamily:"'Syne',sans-serif", fontSize:14, fontWeight:800, marginBottom:4 }}>Request a Free Quote</div>

                {[{l:"Your Name *",k:"name",ph:"Muhammad / Sarah / Ahmed"},{l:"Phone / WhatsApp *",k:"phone",ph:"+971 50 000 0000"},{l:"Business Name",k:"biz",ph:"Your Restaurant / Agency / Store"}].map(f => (
                  <div key={f.k}>
                    <label style={{ fontSize:10, color:T.sub, display:"block", marginBottom:4, textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:600 }}>{f.l}</label>
                    <input value={form[f.k]} onChange={e=>setForm(p=>({...p,[f.k]:e.target.value}))} placeholder={f.ph} required={f.k!=="biz"} style={{ ...INP }}/>
                  </div>
                ))}

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  <div>
                    <label style={{ fontSize:10, color:T.sub, display:"block", marginBottom:4, textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:600 }}>Business Type</label>
                    <select value={form.category} onChange={e=>setForm(p=>({...p,category:e.target.value}))} style={{ ...INP }}>
                      {["Restaurant","Tourism","Real Estate","Auto Garage","Healthcare","Education","Beauty & Salon","Fitness","Hotel","Legal","E-Commerce","Other"].map(o=><option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize:10, color:T.sub, display:"block", marginBottom:4, textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:600 }}>Budget Range</label>
                    <select value={form.budget} onChange={e=>setForm(p=>({...p,budget:e.target.value}))} style={{ ...INP }}>
                      {["AED 1,200–3,000","AED 4,000–8,000","AED 12,000–25,000","AED 30,000+","Not sure yet"].map(o=><option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize:10, color:T.sub, display:"block", marginBottom:4, textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:600 }}>Tell me about your project</label>
                  <textarea value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))} placeholder="What pages do you need? Any specific features like booking, menu, gallery?" rows={4} style={{ ...INP, resize:"vertical" }}/>
                </div>

                <button type="submit" style={{ padding:"13px", background:"linear-gradient(135deg,#25D366,#128C7E)", border:"none", borderRadius:11, color:"#fff", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
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
