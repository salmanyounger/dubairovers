"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TOURS = [
  { slug:"desert-safari-dubai",     emoji:"🏜️", name:"Desert Safari Dubai",      desc:"Dunes, camel riding & BBQ dinner" },
  { slug:"hot-air-balloon-dubai",   emoji:"🎈", name:"Hot Air Balloon Dubai",     desc:"Sunrise flight over the desert" },
  { slug:"dhow-cruise-dubai",       emoji:"⛵", name:"Dhow Cruise Dubai",         desc:"Marina & creek dinner cruise" },
  { slug:"quad-bike-dubai",         emoji:"🏍️", name:"Quad Bike Dubai",           desc:"Desert dune adventure" },
  { slug:"camel-riding-dubai",      emoji:"🐪", name:"Camel Riding Dubai",        desc:"Traditional desert experience" },
  { slug:"private-city-tour-dubai", emoji:"🏙️", name:"Private City Tour Dubai",  desc:"Personalised Dubai highlights" },
];

export { TOURS };

export function NavBar() {
  const pathname   = usePathname();
  const [drop,     setDrop]     = useState(false);
  const [dark,     setDark]     = useState(true);
  const [lang,     setLang]     = useState("EN");
  const [scrolled, setScrolled] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setDrop(false); }, [pathname]);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDrop(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Hide on landing, archai, properties and admin pages
  if (pathname === "/") return null;
  if (pathname.startsWith("/archai")) return null;
  if (pathname.startsWith("/properties")) return null;
  if (pathname.startsWith("/hire")) return null;
  if (pathname.startsWith("/salmanfx")) return null;
  if (pathname.startsWith("/webbuilder")) return null;
  if (pathname.startsWith("/admin")) return null;

  const isActive   = (href) => pathname === href;
  const tourActive = TOURS.some(t => pathname === `/${t.slug}`);

  const lStyle = (href) => ({
    padding:"8px 12px", borderRadius:8, fontSize:13,
    fontWeight: isActive(href) ? 600 : 400,
    color: isActive(href) ? "#fff" : "rgba(255,255,255,0.6)",
    background: isActive(href) ? "rgba(255,255,255,0.08)" : "transparent",
    textDecoration:"none", display:"inline-flex", alignItems:"center",
    transition:"all 0.2s ease",
  });

  const bg = scrolled
    ? "rgba(6,7,15,0.98)"
    : "rgba(6,7,15,0.92)";

  return (
    <nav style={{
      position:"sticky", top:0, zIndex:200,
      background: bg,
      backdropFilter:"blur(20px)",
      borderBottom:"1px solid rgba(255,255,255,0.07)",
      transition:"background 0.3s ease",
      fontFamily:"'Inter',sans-serif",
    }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"/>
      <style suppressHydrationWarning>{`
        .drlink { padding:8px 12px; border-radius:8px; font-size:13px; color:rgba(255,255,255,0.6); text-decoration:none; display:inline-flex; align-items:center; transition:all 0.2s ease; }
        .drlink:hover { color:#fff; background:rgba(255,255,255,0.07); }
        .drlink.act { color:#fff; font-weight:600; background:rgba(255,255,255,0.08); }
        .tour-item:hover { background:rgba(249,115,22,0.08) !important; }
        .nb-icon:hover { background:rgba(255,255,255,0.08) !important; }
        .book-btn:hover { transform:translateY(-1px); box-shadow:0 6px 20px rgba(249,115,22,0.4) !important; }
      `}</style>

      <div style={{ maxWidth:1380, margin:"0 auto", padding:"0 20px", height:62, display:"flex", alignItems:"center", justifyContent:"space-between", gap:8 }}>

        {/* ── LOGO ── */}
        <Link href="/tours" style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:9, flexShrink:0 }}>
          <div style={{ width:36, height:36, borderRadius:9, background:"linear-gradient(135deg,#f97316,#ec4899)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, boxShadow:"0 4px 12px rgba(249,115,22,0.4)" }}>🏜️</div>
          <div>
            <div style={{ fontSize:16, fontWeight:800, color:"#fff", lineHeight:1.1 }}>
              Dubai{" "}
              <span style={{ background:"linear-gradient(90deg,#f97316,#ec4899)", backgroundClip:"text", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                Rovers
              </span>
            </div>
            <div style={{ fontSize:8, color:"rgba(255,255,255,0.35)", letterSpacing:"0.15em", textTransform:"uppercase" }}>Best Tours in Dubai</div>
          </div>
        </Link>

        {/* ── BADGE ── */}
        <div style={{ display:"flex", alignItems:"center", gap:6, background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, padding:"4px 14px", flexShrink:0 }}>
          <div style={{ width:5, height:5, borderRadius:"50%", background:"#10B981" }}/>
          <span style={{ fontSize:11, color:"rgba(255,255,255,0.5)", fontWeight:500 }}>
            ⭐ Dubai&apos;s #1 Rated Adventure Platform
          </span>
        </div>

        {/* ── NAV LINKS ── */}
        <div style={{ display:"flex", alignItems:"center", gap:2 }}>

          <Link href="/tours" className={`drlink${isActive("/tours") ? " act" : ""}`}>Home</Link>

          {/* TOURS DROPDOWN */}
          <div ref={dropRef} style={{ position:"relative" }}>
            <button
              onClick={() => setDrop(d => !d)}
              style={{ padding:"8px 12px", borderRadius:8, fontSize:13, fontWeight: tourActive ? 600 : 400, color: tourActive ? "#fff" : "rgba(255,255,255,0.6)", background: tourActive ? "rgba(255,255,255,0.08)" : "transparent", border:"none", cursor:"pointer", fontFamily:"Inter,sans-serif", display:"flex", alignItems:"center", gap:4, transition:"all 0.2s" }}>
              Tours
              <span style={{ fontSize:10, opacity:0.6, transform: drop ? "rotate(180deg)" : "none", transition:"transform 0.2s" }}>▾</span>
            </button>

            {drop && (
              <div style={{ position:"absolute", top:"calc(100% + 8px)", left:"-20px", width:340, background:"rgba(10,12,22,0.98)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:14, padding:10, boxShadow:"0 20px 60px rgba(0,0,0,0.6)", zIndex:300, backdropFilter:"blur(20px)" }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:4, marginBottom:8 }}>
                  {TOURS.map(t => (
                    <Link key={t.slug} href={`/${t.slug}`} className="tour-item"
                      style={{ textDecoration:"none", padding:"10px 12px", borderRadius:9, display:"flex", gap:8, alignItems:"flex-start", background: pathname===`/${t.slug}` ? "rgba(249,115,22,0.1)" : "transparent", transition:"background 0.15s" }}>
                      <span style={{ fontSize:16, flexShrink:0, marginTop:1 }}>{t.emoji}</span>
                      <div>
                        <div style={{ fontSize:12, fontWeight:600, color:"#fff", lineHeight:1.2, marginBottom:2 }}>{t.name}</div>
                        <div style={{ fontSize:10, color:"rgba(255,255,255,0.4)", lineHeight:1.3 }}>{t.desc}</div>
                      </div>
                      {pathname===`/${t.slug}` && (
                        <div style={{ width:5, height:5, borderRadius:"50%", background:"#f97316", marginLeft:"auto", flexShrink:0, marginTop:4 }}/>
                      )}
                    </Link>
                  ))}
                </div>
                <Link href="/tours" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:6, padding:"9px", background:"rgba(249,115,22,0.1)", border:"1px solid rgba(249,115,22,0.2)", borderRadius:9, color:"#f97316", fontSize:12, fontWeight:600, textDecoration:"none" }}>
                  View All Tours →
                </Link>
              </div>
            )}
          </div>

          <Link href="/blog"        className={`drlink${isActive("/blog") ? " act" : ""}`}>Blog</Link>
          <Link href="/attractions" className={`drlink${isActive("/attractions") ? " act" : ""}`}>
            <span style={{ fontSize:14, marginRight:3 }}>🎟️</span>Attractions
          </Link>
          <Link href="/flights"     className={`drlink${isActive("/flights") ? " act" : ""}`}>
            <span style={{ fontSize:14, marginRight:3 }}>✈️</span>Flights
          </Link>
          <Link href="/about"       className={`drlink${isActive("/about") ? " act" : ""}`}>About</Link>
          <Link href="/contact"     className={`drlink${isActive("/contact") ? " act" : ""}`}>Contact</Link>
        </div>

        {/* ── RIGHT SIDE ── */}
        <div style={{ display:"flex", alignItems:"center", gap:6, flexShrink:0 }}>

          {/* Language */}
          <button className="nb-icon"
            onClick={() => setLang(l => l === "EN" ? "AR" : "EN")}
            style={{ display:"flex", alignItems:"center", gap:5, padding:"6px 10px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, color:"rgba(255,255,255,0.65)", fontSize:12, fontWeight:500, cursor:"pointer", fontFamily:"Inter,sans-serif", transition:"all 0.2s" }}>
            🌐 {lang}
          </button>

          {/* Account */}
          <button className="nb-icon"
            style={{ display:"flex", alignItems:"center", gap:5, padding:"6px 10px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, color:"rgba(255,255,255,0.65)", fontSize:12, cursor:"pointer", fontFamily:"Inter,sans-serif", transition:"all 0.2s" }}>
            👤 Account
          </button>

          {/* Night toggle */}
          <button className="nb-icon"
            onClick={() => setDark(d => !d)}
            style={{ display:"flex", alignItems:"center", gap:5, padding:"6px 10px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, color:"rgba(255,255,255,0.65)", fontSize:12, cursor:"pointer", fontFamily:"Inter,sans-serif", transition:"all 0.2s" }}>
            <div style={{ width:26, height:14, borderRadius:7, background: dark ? "#f97316" : "rgba(255,255,255,0.15)", position:"relative", transition:"background 0.3s" }}>
              <div style={{ position:"absolute", top:2, left: dark ? 14 : 2, width:10, height:10, borderRadius:"50%", background:"#fff", transition:"left 0.3s" }}/>
            </div>
            🌙 Night
          </button>

          {/* Book Now */}
          <Link href="/tours" className="book-btn"
            style={{ padding:"9px 18px", background:"linear-gradient(135deg,#f97316,#ea580c)", borderRadius:20, color:"#fff", fontSize:13, fontWeight:700, textDecoration:"none", display:"flex", alignItems:"center", gap:6, boxShadow:"0 4px 14px rgba(249,115,22,0.35)", transition:"all 0.2s ease" }}>
            🚀 Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
