"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const links = [
    { href:"/tours",       icon:"🏜️", label:"Dubai Tours"     },
    { href:"/properties",  icon:"🏙️", label:"Properties"      },
    { href:"/archai",      icon:"🏛️", label:"Villa Designer"  },
    { href:"/salmanfx",    icon:"📈", label:"Forex EAs"       },
    { href:"/webbuilder",  icon:"💻", label:"Web Builder"     },
  ];

  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap"/>
      <div suppressHydrationWarning style={{ minHeight:"100vh", background:"#060C1E", display:"flex", alignItems:"center", justifyContent:"center", padding:24, fontFamily:"'Plus Jakarta Sans',sans-serif", textAlign:"center" }}>
        <div>
          <div style={{ fontSize:80, marginBottom:8 }}>🏜️</div>
          <div style={{ fontSize:"clamp(60px,12vw,120px)", fontWeight:900, color:"rgba(255,255,255,0.06)", lineHeight:1, marginBottom:-20 }}>404</div>
          <div style={{ fontSize:"clamp(22px,4vw,36px)", fontWeight:800, color:"#fff", marginBottom:10 }}>Page Not Found</div>
          <p style={{ fontSize:15, color:"rgba(255,255,255,0.45)", marginBottom:36, maxWidth:400, margin:"0 auto 36px" }}>
            This page doesn&apos;t exist or may have been moved. Explore our sites below.
          </p>

          <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap", marginBottom:28 }}>
            {links.map(l => (
              <Link key={l.href} href={l.href}
                style={{ padding:"10px 18px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:12, color:"#fff", fontSize:13, fontWeight:600, textDecoration:"none", display:"flex", alignItems:"center", gap:7, transition:"all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(59,130,246,0.15)"; e.currentTarget.style.borderColor = "rgba(59,130,246,0.4)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}>
                {l.icon} {l.label}
              </Link>
            ))}
          </div>

          <Link href="/tours" style={{ padding:"12px 28px", background:"linear-gradient(135deg,#3B82F6,#1D4ED8)", borderRadius:12, color:"#fff", fontSize:14, fontWeight:700, textDecoration:"none" }}>
            ← Go Home
          </Link>
        </div>
      </div>
    </>
  );
}
