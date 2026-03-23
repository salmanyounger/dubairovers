"use client";
import { useState } from "react";

export default function LeadCapture({ property }) {
  const [form,      setForm]      = useState({ name:"", phone:"", message:"" });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const T = {
    card:"rgba(255,255,255,0.04)", border:"rgba(255,255,255,0.08)",
    text:"#F1F5F9", sub:"rgba(255,255,255,0.45)", green:"#10B981", gold:"#F59E0B"
  };

  const inp = {
    width:"100%", padding:"11px 14px",
    background:"rgba(255,255,255,0.05)",
    border:`1px solid rgba(255,255,255,0.12)`,
    borderRadius:10, color:T.text, fontSize:14,
    fontFamily:"Inter,sans-serif", outline:"none",
    transition:"border-color 0.2s",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setLoading(true);

    const msg = `🏙️ *New Property Inquiry*\n\n*Property:* ${property?.name || "Dubai Property"}\n*Price:* AED ${property?.pricePerSqft?.buy?.toLocaleString() || "—"}/sqft\n*Area:* ${property?.area || "—"}\n\n*Client Name:* ${form.name}\n*Phone:* ${form.phone}\n*Message:* ${form.message || "No message"}\n\n_Sent via DubaiRovers Properties_`;

    const waUrl = `https://wa.me/971544735060?text=${encodeURIComponent(msg)}`;

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.open(waUrl, "_blank");
    }, 800);
  };

  if (submitted) return (
    <div suppressHydrationWarning style={{ background:"rgba(16,185,129,0.08)", border:"1.5px solid rgba(16,185,129,0.3)", borderRadius:14, padding:"24px 20px", textAlign:"center" }}>
      <div style={{ fontSize:36, marginBottom:10 }}>✅</div>
      <div style={{ fontSize:16, fontWeight:700, color:T.green, marginBottom:6 }}>Inquiry Sent!</div>
      <div style={{ fontSize:13, color:T.sub, lineHeight:1.7, marginBottom:16 }}>
        Your details have been sent via WhatsApp. Salman Ali will contact you shortly.
      </div>
      <button onClick={() => { setSubmitted(false); setForm({ name:"", phone:"", message:"" }); }}
        style={{ background:"rgba(16,185,129,0.15)", border:"1px solid rgba(16,185,129,0.3)", borderRadius:9, padding:"8px 20px", color:T.green, fontSize:13, fontWeight:600, cursor:"pointer", fontFamily:"Inter,sans-serif" }}>
        Send Another Inquiry
      </button>
    </div>
  );

  return (
    <div style={{ background:T.card, border:`1px solid ${T.border}`, borderRadius:14, overflow:"hidden" }}>
      <style suppressHydrationWarning>{`
        .lc-inp:focus { border-color: rgba(16,185,129,0.5) !important; box-shadow: 0 0 0 3px rgba(16,185,129,0.08) !important; }
        @keyframes lcSpin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Header */}
      <div style={{ padding:"14px 18px", background:"rgba(16,185,129,0.07)", borderBottom:`1px solid rgba(16,185,129,0.15)` }}>
        <div style={{ fontSize:14, fontWeight:700, color:T.green, marginBottom:2 }}>
          📩 Book a Viewing / Get Info
        </div>
        <div style={{ fontSize:11, color:T.sub }}>
          Free consultation — No obligation
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ padding:"16px 18px", display:"flex", flexDirection:"column", gap:12 }}>

        {/* Agent mini card */}
        <div style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 12px", background:"rgba(255,255,255,0.03)", border:`1px solid rgba(255,255,255,0.06)`, borderRadius:10 }}>
          <div style={{ width:38, height:38, borderRadius:10, background:"linear-gradient(135deg,#F97316,#ec4899)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>
            👤
          </div>
          <div>
            <div style={{ fontSize:13, fontWeight:700, color:T.text }}>Salman Ali</div>
            <div style={{ fontSize:11, color:T.sub }}>Dubai Rovers Properties · +971 544 735 060</div>
          </div>
        </div>

        <div>
          <label style={{ fontSize:11, color:T.sub, display:"block", marginBottom:5, fontWeight:500, textTransform:"uppercase", letterSpacing:"0.06em" }}>
            Your Name *
          </label>
          <input className="lc-inp" value={form.name} onChange={e => setForm(p => ({...p, name:e.target.value}))}
            placeholder="e.g. Ahmed Al Mansouri" required style={{ ...inp }}/>
        </div>

        <div>
          <label style={{ fontSize:11, color:T.sub, display:"block", marginBottom:5, fontWeight:500, textTransform:"uppercase", letterSpacing:"0.06em" }}>
            Phone / WhatsApp *
          </label>
          <input className="lc-inp" value={form.phone} onChange={e => setForm(p => ({...p, phone:e.target.value}))}
            placeholder="+971 50 000 0000" required style={{ ...inp }}/>
        </div>

        <div>
          <label style={{ fontSize:11, color:T.sub, display:"block", marginBottom:5, fontWeight:500, textTransform:"uppercase", letterSpacing:"0.06em" }}>
            Message (Optional)
          </label>
          <textarea className="lc-inp" value={form.message} onChange={e => setForm(p => ({...p, message:e.target.value}))}
            placeholder="e.g. I'm interested in a 2BR, available this weekend..."
            rows={3} style={{ ...inp, resize:"vertical" }}/>
        </div>

        <button type="submit" disabled={loading || !form.name || !form.phone}
          style={{
            display:"flex", alignItems:"center", justifyContent:"center", gap:8,
            width:"100%", padding:"13px",
            background: (loading || !form.name || !form.phone)
              ? "rgba(255,255,255,0.08)"
              : "linear-gradient(135deg,#25D366,#128C7E)",
            border:"none", borderRadius:11,
            color: (loading || !form.name || !form.phone) ? T.sub : "#fff",
            fontSize:14, fontWeight:700, cursor: loading ? "wait" : !form.name || !form.phone ? "not-allowed" : "pointer",
            fontFamily:"Inter,sans-serif", transition:"all 0.2s",
          }}>
          {loading
            ? <><span style={{ width:14, height:14, border:"2px solid rgba(255,255,255,0.3)", borderTopColor:"#fff", borderRadius:"50%", display:"inline-block", animation:"lcSpin 0.8s linear infinite" }}/> Sending...</>
            : <>💬 Send via WhatsApp</>
          }
        </button>

        <div style={{ fontSize:10, color:T.sub, textAlign:"center", lineHeight:1.6 }}>
          Your details are sent directly to Salman Ali via WhatsApp. <br/>
          Response within 30 minutes during business hours.
        </div>

      </form>

      {/* Direct contact row */}
      <div style={{ display:"flex", borderTop:`1px solid ${T.border}` }}>
        <a href="tel:+971544735060"
          style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:6, padding:"11px", color:T.sub, textDecoration:"none", fontSize:12, fontWeight:600, borderRight:`1px solid ${T.border}`, transition:"all 0.18s" }}
          onMouseEnter={e => e.currentTarget.style.color = T.text}
          onMouseLeave={e => e.currentTarget.style.color = T.sub}>
          📞 Call
        </a>
        <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
          style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:6, padding:"11px", color:T.green, textDecoration:"none", fontSize:12, fontWeight:600, transition:"all 0.18s" }}>
          💬 WhatsApp
        </a>
      </div>
    </div>
  );
}
