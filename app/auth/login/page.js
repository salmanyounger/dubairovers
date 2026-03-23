"use client";
import Link from "next/link";

// Google login activates after: npm install next-auth
// Full setup guide in SETUP_GUIDE.txt

export default function LoginPage() {
  return (
    <>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap"/>
      <div style={{ minHeight:"100vh", background:"#060C1E", display:"flex", alignItems:"center", justifyContent:"center", padding:20, fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
        <div style={{ width:"100%", maxWidth:400, textAlign:"center" }}>
          <div style={{ fontSize:40, marginBottom:12 }}>🏜️</div>
          <div style={{ fontSize:22, fontWeight:800, color:"#fff", marginBottom:4 }}>Dubai Rovers</div>
          <div style={{ fontSize:13, color:"rgba(255,255,255,0.45)", marginBottom:28 }}>Member login coming soon</div>

          <div style={{ background:"#0D1629", border:"1px solid rgba(255,255,255,0.08)", borderRadius:18, padding:"28px 24px", marginBottom:20 }}>
            <div style={{ fontSize:14, color:"rgba(255,255,255,0.6)", marginBottom:16 }}>
              Google login requires one setup step:
            </div>
            <div style={{ background:"rgba(0,0,0,0.4)", borderRadius:10, padding:"12px 16px", fontFamily:"monospace", fontSize:14, color:"#10B981", marginBottom:16, textAlign:"left" }}>
              npm install next-auth
            </div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,0.35)", textAlign:"left" }}>
              Then add your Google OAuth credentials to .env.local — see SETUP_GUIDE.txt
            </div>
          </div>

          <Link href="/tours" style={{ display:"block", padding:"12px 24px", background:"linear-gradient(135deg,#f97316,#ea580c)", borderRadius:12, color:"#fff", fontSize:14, fontWeight:700, textDecoration:"none", marginBottom:12 }}>
            🏜️ Browse Tours
          </Link>
          <Link href="/properties" style={{ display:"block", padding:"12px 24px", background:"rgba(59,130,246,0.15)", border:"1px solid rgba(59,130,246,0.3)", borderRadius:12, color:"#60A5FA", fontSize:14, fontWeight:600, textDecoration:"none" }}>
            🏙️ Browse Properties
          </Link>
        </div>
      </div>
    </>
  );
}
