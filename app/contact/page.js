"use client";
import { useState, useEffect } from "react";
import { ContactAnimation } from "../components/PageHeroAnimations";

const WA = "971544735060";

export default function ContactPage() {
  const [hidden, setHidden] = useState(null);
  const [name, setName]     = useState("");
  const [email, setEmail]   = useState("");
  const [msg, setMsg]       = useState("");
  const [sent, setSent]     = useState(false);

  useEffect(() => {
    try {
      const pv = JSON.parse(localStorage.getItem("dr_page_visibility") || "{}");
      setHidden(pv.contact === false);
    } catch { setHidden(false); }
  }, []);

  if (hidden === null) return null;
  if (hidden) return (
    <div style={{ minHeight:"100vh", background:"#0a0a0a", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Outfit',sans-serif", flexDirection:"column", gap:16, textAlign:"center", padding:24, color:"#fff" }}>
      <div style={{ fontSize:56 }}>📞</div>
      <div style={{ fontSize:28, fontWeight:800 }}>Contact Page</div>
      <div style={{ color:"rgba(255,255,255,.5)", fontSize:15, maxWidth:360 }}>This page is temporarily unavailable. Reach us directly on WhatsApp.</div>
      <a href={`https://wa.me/${WA}?text=${encodeURIComponent("Hi DubaiRovers! I need help. 💬")}`} target="_blank" rel="noreferrer"
        style={{ padding:"13px 28px", background:"linear-gradient(135deg,#25D366,#128C7E)", borderRadius:12, color:"#fff", fontWeight:700, fontSize:14, textDecoration:"none", display:"flex", alignItems:"center", gap:8 }}>
        💬 WhatsApp Us Now
      </a>
      <a href="/" style={{ color:"rgba(255,255,255,.3)", fontSize:12, textDecoration:"none", marginTop:4 }}>← Back to Home</a>
    </div>
  );

  const send = () => {
    const text = `Hi DubaiRovers! 📩\nName: ${name}\nEmail: ${email}\nMessage: ${msg}`;
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(text)}`, "_blank");
    setSent(true);
  };

  const INP = { width:"100%", padding:"12px 16px", borderRadius:12, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", color:"#fff", fontSize:14, outline:"none", fontFamily:"'Outfit',sans-serif", boxSizing:"border-box", transition:"border-color 0.2s" };

  return (
    <div style={{ minHeight:"100vh", background:"#060D14", fontFamily:"'Outfit',sans-serif", color:"#fff" }}>

      {/* ── HERO — Contact Animation ── */}
      <div style={{ position:"relative", height:340, overflow:"hidden" }}>
        <ContactAnimation />
      </div>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth:640, margin:"0 auto", padding:"48px 24px 80px" }}>

        {/* Section header */}
        <div style={{ textAlign:"center", marginBottom:40 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(37,211,102,0.08)", border:"1px solid rgba(37,211,102,0.2)", borderRadius:30, padding:"6px 18px", marginBottom:16 }}>
            <span style={{ fontSize:12, color:"#25D366", fontWeight:700, letterSpacing:"0.12em", textTransform:"uppercase" }}>✦ Always Available</span>
          </div>
          <h2 style={{ fontFamily:"'Playfair Display',serif", fontSize:32, fontWeight:700, marginBottom:10, lineHeight:1.25 }}>Let's Plan Your<br/><span style={{ color:"#F59E0B" }}>Perfect Experience</span></h2>
          <p style={{ color:"rgba(255,255,255,0.45)", fontSize:15, lineHeight:1.7 }}>Fill in the form below and we'll reply on WhatsApp within minutes — 7 days a week.</p>
        </div>

        {/* Contact cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:32 }}>
          {[
            { ic:"💬", lb:"WhatsApp", val:"+971 54 473 5060", href:`https://wa.me/${WA}`, color:"#25D366" },
            { ic:"✉️", lb:"Email",    val:"info@dubairovers.com", href:"mailto:info@dubairovers.com", color:"#F59E0B" },
            { ic:"📍", lb:"Location", val:"Dubai, UAE", href:"#", color:"#F59E0B" },
          ].map(c => (
            <a key={c.lb} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" style={{ textDecoration:"none" }}>
              <div style={{ padding:"18px 12px", background:"rgba(255,255,255,0.03)", border:`1px solid rgba(255,255,255,0.08)`, borderRadius:16, textAlign:"center", transition:"border-color 0.2s", cursor:"pointer" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${c.color}55`}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"}>
                <div style={{ fontSize:26, marginBottom:8 }}>{c.ic}</div>
                <div style={{ fontSize:10, color:"rgba(255,255,255,0.35)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:5, fontWeight:600 }}>{c.lb}</div>
                <div style={{ fontSize:11, color:c.color, fontWeight:600, wordBreak:"break-all" }}>{c.val}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Form / Success */}
        {sent ? (
          <div style={{ textAlign:"center", padding:"48px 20px", background:"rgba(37,211,102,0.06)", border:"1px solid rgba(37,211,102,0.25)", borderRadius:24 }}>
            <div style={{ fontSize:56, marginBottom:16 }}>✅</div>
            <div style={{ fontSize:22, fontWeight:700, marginBottom:8 }}>Sent on WhatsApp!</div>
            <div style={{ color:"rgba(255,255,255,0.45)", fontSize:14, marginBottom:24 }}>Our team will reply shortly — usually within 5 minutes.</div>
            <button onClick={() => setSent(false)} style={{ padding:"10px 28px", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:10, color:"#fff", fontWeight:600, fontSize:13, cursor:"pointer", fontFamily:"'Outfit',sans-serif" }}>
              ← Send Another Message
            </button>
          </div>
        ) : (
          <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:24, padding:32, display:"flex", flexDirection:"column", gap:16 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              <div>
                <label style={{ fontSize:11, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"rgba(255,255,255,.4)", display:"block", marginBottom:8 }}>👤 Your Name *</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="John Smith" style={INP}
                  onFocus={e => e.target.style.borderColor = "rgba(245,158,11,0.5)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
              </div>
              <div>
                <label style={{ fontSize:11, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"rgba(255,255,255,.4)", display:"block", marginBottom:8 }}>✉️ Email (optional)</label>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="john@example.com" style={INP}
                  onFocus={e => e.target.style.borderColor = "rgba(245,158,11,0.5)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
              </div>
            </div>
            <div>
              <label style={{ fontSize:11, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"rgba(255,255,255,.4)", display:"block", marginBottom:8 }}>💬 How Can We Help? *</label>
              <textarea rows={4} value={msg} onChange={e => setMsg(e.target.value)} placeholder="Tell us about your tour interests, dates, group size, or any questions..."
                style={{ ...INP, resize:"vertical", lineHeight:1.6 }}
                onFocus={e => e.target.style.borderColor = "rgba(245,158,11,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
            </div>

            {/* Quick topic pills */}
            <div>
              <div style={{ fontSize:11, fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:"rgba(255,255,255,.4)", marginBottom:10 }}>🎯 Quick Topic</div>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                {["🏜️ Desert Safari","🎈 Balloon","⛵ Dhow Cruise","🚵 Quad Bike","🏙️ City Tour","💰 Group Pricing","📅 Availability"].map(topic => (
                  <button key={topic} onClick={() => setMsg(m => m ? m : `Hi! I'm interested in ${topic.replace(/^[^\s]+\s/,'')}. `)}
                    style={{ padding:"6px 14px", background:"rgba(245,158,11,0.07)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:20, color:"rgba(255,255,255,0.6)", fontSize:11, cursor:"pointer", fontFamily:"'Outfit',sans-serif", fontWeight:500, transition:"all 0.15s" }}
                    onMouseEnter={e => { e.target.style.background="rgba(245,158,11,0.15)"; e.target.style.color="#F59E0B"; }}
                    onMouseLeave={e => { e.target.style.background="rgba(245,158,11,0.07)"; e.target.style.color="rgba(255,255,255,0.6)"; }}>
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={send} disabled={!name || !msg}
              style={{ padding:"14px", borderRadius:14, background: name && msg ? "linear-gradient(135deg,#25D366,#128C7E)" : "rgba(255,255,255,.07)", color: name && msg ? "#fff" : "rgba(255,255,255,.3)", fontSize:15, fontWeight:700, border:"none", cursor: name && msg ? "pointer" : "not-allowed", display:"flex", alignItems:"center", justifyContent:"center", gap:10, fontFamily:"'Outfit',sans-serif", transition:"all 0.2s", boxShadow: name && msg ? "0 8px 24px rgba(37,211,102,0.25)" : "none" }}>
              💬 Send via WhatsApp
            </button>
            <p style={{ textAlign:"center", fontSize:12, color:"rgba(255,255,255,0.25)", margin:0 }}>We reply within minutes · 7 days a week · 100% free consultation</p>
          </div>
        )}
      </div>
    </div>
  );
}
