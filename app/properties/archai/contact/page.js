"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function ArchaiContact() {
  const [mounted, setMounted] = useState(false);
  const [form, setForm]       = useState({ name:"", email:"", subject:"", message:"" });
  const [sent, setSent]       = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  const T = { bg:"#06080d", card:"rgba(255,255,255,0.04)", border:"rgba(200,169,110,0.14)", text:"#E2DED6", sub:"#525870", gold:"#C8A96E", gold2:"#E8D09A", green:"#3DC98A" };
  const INP = { width:"100%", padding:"11px 14px", background:"rgba(255,255,255,0.05)", border:`1px solid rgba(200,169,110,0.15)`, borderRadius:10, color:T.text, fontSize:13, fontFamily:"Outfit,sans-serif", outline:"none" };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Hi Salman, I'm contacting you about ARCHAI.\n\nName: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\n\nMessage:\n${form.message}`;
    window.open(`https://wa.me/971544735060?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
  };

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,400&family=Outfit:wght@300;400;500;600;700;800;900&display=swap"/>
      <div suppressHydrationWarning style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Outfit',sans-serif" }}>
      <style suppressHydrationWarning>{`
        *{box-sizing:border-box}
        input:focus,textarea:focus,select:focus{border-color:rgba(200,169,110,0.5)!important;box-shadow:0 0 0 3px rgba(200,169,110,0.08)!important;outline:none!important}
      `}</style>

      <div style={{ background:"rgba(0,0,0,0.5)", borderBottom:`1px solid ${T.border}`, padding:"16px 32px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <Link href="/archai" style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:22, letterSpacing:5, color:T.gold2, textDecoration:"none" }}>ARCH<span style={{ color:T.sub }}>AI</span></Link>
        <div style={{ display:"flex", gap:10 }}>
          <Link href="/archai/blog" style={{ color:T.sub, fontSize:13, textDecoration:"none", padding:"7px 14px" }}>Blog</Link>
          <Link href="/archai/about" style={{ color:T.sub, fontSize:13, textDecoration:"none", padding:"7px 14px" }}>About</Link>
          <Link href="/archai" style={{ padding:"8px 18px", background:`linear-gradient(135deg,${T.gold},#9A7830)`, borderRadius:20, color:"#000", fontSize:12, fontWeight:700, textDecoration:"none" }}>Design Villa →</Link>
        </div>
      </div>

      <div style={{ maxWidth:860, margin:"0 auto", padding:"56px 32px" }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(32px,5vw,56px)", fontWeight:300, color:"#fff", marginBottom:10 }}>
            Get in <em style={{ color:T.gold }}>Touch</em>
          </div>
          <p style={{ fontSize:14, color:T.sub }}>Questions about ARCHAI, white-label licensing, or custom villa design consultation</p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:32, alignItems:"start" }}>

          {/* Contact options */}
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {[
              { icon:"💬", title:"WhatsApp (fastest)", val:"+971 544 735 060", sub:"Response within 30 min", href:"https://wa.me/971544735060", color:"#25D366" },
              { icon:"📧", title:"Email", val:"info@dubairovers.com", sub:"Response within 24 hours", href:"mailto:info@dubairovers.com", color:T.gold },
              { icon:"📍", title:"Location", val:"Dubai, UAE", sub:"Available for in-person consultations", href:null, color:"#4A8FD4" },
            ].map(c => (
              <div key={c.title} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:12, padding:"16px 18px", display:"flex", gap:14, alignItems:"start" }}>
                <div style={{ width:40, height:40, borderRadius:10, background:`${c.color}18`, border:`1px solid ${c.color}30`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize:11, color:T.sub, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:3 }}>{c.title}</div>
                  {c.href ? (
                    <a href={c.href} target="_blank" rel="noopener noreferrer" style={{ fontSize:14, fontWeight:600, color:c.color, textDecoration:"none" }}>{c.val}</a>
                  ) : (
                    <div style={{ fontSize:14, fontWeight:600, color:T.text }}>{c.val}</div>
                  )}
                  <div style={{ fontSize:11, color:T.sub, marginTop:2 }}>{c.sub}</div>
                </div>
              </div>
            ))}

            <div style={{ background:"rgba(200,169,110,0.06)", border:`1px solid ${T.border}`, borderRadius:12, padding:"16px 18px" }}>
              <div style={{ fontSize:12, fontWeight:600, color:T.gold, marginBottom:8 }}>ARCHAI Services</div>
              {["Villa design consultation (free online)","White-label ARCHAI for your agency","Custom styles for your market","AED cost estimation for UAE projects","Bing Image Creator training session"].map(s => (
                <div key={s} style={{ fontSize:12, color:T.sub, padding:"4px 0", borderBottom:`1px solid rgba(255,255,255,0.04)`, display:"flex", gap:8 }}>
                  <span style={{ color:T.gold }}>✦</span>{s}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          {sent ? (
            <div style={{ background:"rgba(61,201,138,0.07)", border:`1px solid rgba(61,201,138,0.3)`, borderRadius:16, padding:"40px 32px", textAlign:"center" }}>
              <div style={{ fontSize:48, marginBottom:12 }}>✅</div>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:28, color:T.green, marginBottom:8 }}>Message Sent!</div>
              <p style={{ fontSize:13, color:T.sub, lineHeight:1.7 }}>Your message has been sent via WhatsApp. Salman will respond shortly.</p>
              <button onClick={()=>{ setSent(false); setForm({name:"",email:"",subject:"",message:""}); }}
                style={{ marginTop:16, padding:"9px 20px", background:"transparent", border:`1px solid ${T.border}`, borderRadius:10, color:T.sub, fontSize:12, cursor:"pointer", fontFamily:"Outfit,sans-serif" }}>
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:16, padding:"24px 24px", display:"flex", flexDirection:"column", gap:14 }}>
              <div style={{ fontSize:14, fontWeight:600, marginBottom:4 }}>Send a Message</div>
              {[
                { label:"Your Name", key:"name", type:"text", placeholder:"Ahmed Khan" },
                { label:"Email", key:"email", type:"email", placeholder:"ahmed@email.com" },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ fontSize:11, color:T.sub, display:"block", marginBottom:5, textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:600 }}>{f.label}</label>
                  <input type={f.type} value={form[f.key]} onChange={e=>setForm(p=>({...p,[f.key]:e.target.value}))}
                    placeholder={f.placeholder} required style={{ ...INP }}/>
                </div>
              ))}
              <div>
                <label style={{ fontSize:11, color:T.sub, display:"block", marginBottom:5, textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:600 }}>Subject</label>
                <select value={form.subject} onChange={e=>setForm(p=>({...p,subject:e.target.value}))} required style={{ ...INP }}>
                  <option value="">Select a subject...</option>
                  <option>Villa design consultation</option>
                  <option>White-label licensing</option>
                  <option>Technical support</option>
                  <option>Partnership inquiry</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize:11, color:T.sub, display:"block", marginBottom:5, textTransform:"uppercase", letterSpacing:"0.06em", fontWeight:600 }}>Message</label>
                <textarea value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))}
                  placeholder="Tell me about your project..." rows={4} required style={{ ...INP, resize:"vertical" }}/>
              </div>
              <button type="submit"
                style={{ padding:"13px", background:`linear-gradient(135deg,${T.gold},#9A7830)`, border:"none", borderRadius:10, color:"#000", fontSize:14, fontWeight:700, cursor:"pointer", fontFamily:"Outfit,sans-serif" }}>
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
