"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

// Full Google login available after: npm install next-auth
// For now shows a simple dashboard using localStorage data

const T = {
  bg:"#060C1E", bg2:"#0D1629", border:"rgba(255,255,255,0.08)",
  blue:"#3B82F6", green:"#10B981", text:"#E8EDF8", sub:"rgba(255,255,255,0.45)",
};

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [savedProps, setSavedProps] = useState([]);
  const [tab, setTab] = useState("overview");

  useEffect(() => {
    setMounted(true);
    try {
      setSavedProps(JSON.parse(localStorage.getItem("prop_favs") || "[]"));
    } catch(_) {}
  }, []);

  if (!mounted) return <div style={{ minHeight:"100vh", background:T.bg }}/>;

  const sites = [
    { name:"Dubai Rovers", icon:"🏜️", desc:"Tours & adventures",     href:"/tours",      color:"#F97316" },
    { name:"Properties",   icon:"🏙️", desc:"UAE property platform",  href:"/properties", color:"#3B82F6" },
    { name:"ARCHAI",       icon:"🏛️", desc:"AI villa designer",      href:"/archai",     color:"#C8A96E" },
    { name:"SalmanFX",     icon:"📈", desc:"Forex Expert Advisors",  href:"/salmanfx",   color:"#10B981" },
    { name:"Web Builder",  icon:"💻", desc:"Website services",       href:"/webbuilder", color:"#EC4899" },
  ];

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap"/>
      <div suppressHydrationWarning style={{ minHeight:"100vh", background:T.bg, color:T.text, fontFamily:"'Plus Jakarta Sans',sans-serif", padding:"32px 24px" }}>
        <style suppressHydrationWarning>{`*{box-sizing:border-box}`}</style>

        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <div style={{ fontSize:24, fontWeight:800, color:"#fff", marginBottom:6 }}>👋 Welcome to Dubai Rovers</div>
          <div style={{ fontSize:14, color:T.sub, marginBottom:32 }}>
            Your personal dashboard · {savedProps.length} saved properties
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))", gap:12, marginBottom:32 }}>
            {sites.map(s => (
              <Link key={s.href} href={s.href} style={{ textDecoration:"none", background:T.bg2, border:`1px solid ${T.border}`, borderRadius:14, padding:"20px 18px", display:"block", transition:"all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = s.color + "55"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = "none"; }}>
                <div style={{ fontSize:30, marginBottom:8 }}>{s.icon}</div>
                <div style={{ fontSize:14, fontWeight:700, color:"#fff", marginBottom:3 }}>{s.name}</div>
                <div style={{ fontSize:12, color:T.sub }}>{s.desc}</div>
                <div style={{ marginTop:10, fontSize:11, color:s.color, fontWeight:700 }}>Visit →</div>
              </Link>
            ))}
          </div>

          <div style={{ background:T.bg2, border:`1px solid ${T.border}`, borderRadius:14, padding:"20px 24px" }}>
            <div style={{ fontSize:14, fontWeight:700, color:"#fff", marginBottom:10 }}>🔐 Enable Google Login</div>
            <p style={{ fontSize:13, color:T.sub, marginBottom:12 }}>
              To activate Google login, run this command in your ROVERS folder:
            </p>
            <div style={{ background:"rgba(0,0,0,0.4)", borderRadius:8, padding:"10px 16px", fontFamily:"monospace", fontSize:13, color:T.green, marginBottom:12 }}>
              npm install next-auth
            </div>
            <p style={{ fontSize:12, color:T.sub }}>
              Then follow the setup guide to add your Google OAuth credentials.
            </p>
          </div>

          <div style={{ marginTop:20, textAlign:"center" }}>
            <Link href="/tours" style={{ fontSize:13, color:T.sub, textDecoration:"none" }}>← Back to Dubai Rovers</Link>
          </div>
        </div>
      </div>
    </>
  );
}
