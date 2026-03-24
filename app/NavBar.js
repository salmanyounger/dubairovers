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
  const pathname = usePathname();
  const [drop, setDrop] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setDrop(false); setMobileOpen(false); }, [pathname]);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDrop(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (pathname === "/") return null;
  if (pathname.startsWith("/archai")) return null;
  if (pathname.startsWith("/properties")) return null;
  if (pathname.startsWith("/salmanfx")) return null;
  if (pathname.startsWith("/webbuilder")) return null;
  if (pathname.startsWith("/admin")) return null;
  if (pathname.startsWith("/al-noor")) return null;

  const isActive = (href) => pathname === href;

  return (
    <>
      <style suppressHydrationWarning>{`
        .drlink{padding:6px 12px;border-radius:8px;text-decoration:none;font-size:14px;color:rgba(255,255,255,0.6);transition:all 0.15s;white-space:nowrap;}
        .drlink:hover{color:#fff;background:rgba(255,255,255,0.08);}
        .drlink.act{color:#fff;font-weight:600;background:rgba(255,255,255,0.08);}
        .tour-item{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;text-decoration:none;color:rgba(255,255,255,0.7);font-size:13px;transition:all 0.15s;}
        .tour-item:hover{background:rgba(255,255,255,0.06);color:#fff;}
        @media(max-width:768px){.desk-only{display:none!important;}}
        @media(min-width:769px){.mob-only{display:none!important;}}
      `}</style>

      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:1000,
        background:scrolled?"rgba(10,10,10,0.97)":"rgba(10,10,10,0.85)",
        backdropFilter:"blur(20px)",
        borderBottom:"1px solid rgba(255,255,255,0.08)",
        padding:"0 16px",height:64,
        display:"flex",alignItems:"center",justifyContent:"space-between",
        transition:"background 0.3s",
      }}>
        {/* LOGO */}
        <Link href="/" style={{textDecoration:"none",display:"flex",alignItems:"center",gap:9,flexShrink:0}}>
          <div style={{width:34,height:34,borderRadius:10,background:"linear-gradient(135deg,#f97316,#ec4899)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🏜️</div>
          <div>
            <div style={{fontWeight:900,fontSize:16,background:"linear-gradient(to right,#f97316,#ec4899)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Dubai Rovers</div>
            <div style={{fontSize:9,color:"rgba(255,255,255,0.4)",letterSpacing:"0.1em",textTransform:"uppercase"}}>Best Tours in Dubai</div>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <div className="desk-only" style={{display:"flex",alignItems:"center",gap:4}}>
          <Link href="/tours" className={`drlink${isActive("/tours")?" act":""}`}>Home</Link>
          <div ref={dropRef} style={{position:"relative"}}>
            <button onClick={()=>setDrop(d=>!d)}
              style={{display:"flex",alignItems:"center",gap:4,padding:"6px 12px",borderRadius:8,color:"rgba(255,255,255,0.6)",cursor:"pointer",border:"none",background:"transparent",fontFamily:"inherit",fontSize:14,transition:"all 0.15s"}}>
              Tours <span style={{fontSize:10,transition:"transform 0.2s",transform:drop?"rotate(180deg)":"none"}}>▾</span>
            </button>
            {drop && (
              <div style={{position:"absolute",top:"calc(100% + 10px)",left:"50%",transform:"translateX(-50%)",width:420,background:"rgba(15,15,20,0.98)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:18,padding:16,boxShadow:"0 20px 60px rgba(0,0,0,0.6)",backdropFilter:"blur(20px)"}}>
                <div style={{fontSize:10,color:"rgba(255,255,255,0.3)",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:10,paddingLeft:4}}>All Tours</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
                  {TOURS.map(t=>(
                    <Link key={t.slug} href={`/${t.slug}`} className="tour-item">
                      <span style={{fontSize:20}}>{t.emoji}</span>
                      <div>
                        <div style={{fontSize:12,fontWeight:600,color:"#fff"}}>{t.name}</div>
                        <div style={{fontSize:10,color:"rgba(255,255,255,0.4)",marginTop:1}}>{t.desc}</div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div style={{marginTop:12,paddingTop:12,borderTop:"1px solid rgba(255,255,255,0.06)",display:"flex",justifyContent:"center"}}>
                  <Link href="/tours" style={{fontSize:12,color:"#f97316",textDecoration:"none",fontWeight:600}}>View All Tours →</Link>
                </div>
              </div>
            )}
          </div>
          <Link href="/blog"        className={`drlink${isActive("/blog")?" act":""}`}>Blog</Link>
          <Link href="/attractions" className={`drlink${isActive("/attractions")?" act":""}`}>🎟️ Attractions</Link>
          <Link href="/flights"     className={`drlink${isActive("/flights")?" act":""}`}>✈️ Flights</Link>
          <Link href="/about"       className={`drlink${isActive("/about")?" act":""}`}>About</Link>
          <Link href="/contact"     className={`drlink${isActive("/contact")?" act":""}`}>Contact</Link>
        </div>

        {/* RIGHT */}
        <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
          <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
            style={{display:"flex",alignItems:"center",gap:6,padding:"8px 14px",background:"rgba(37,211,102,0.15)",border:"1px solid rgba(37,211,102,0.3)",borderRadius:10,color:"#25D366",fontSize:13,fontWeight:700,textDecoration:"none"}}>
            💬 <span className="desk-only">WhatsApp</span>
          </a>
          <Link href="/booking"
            style={{display:"flex",alignItems:"center",gap:6,padding:"8px 18px",background:"linear-gradient(135deg,#f97316,#ec4899)",borderRadius:10,color:"#fff",fontSize:14,fontWeight:700,textDecoration:"none"}}>
            🚀 <span className="desk-only">Book Now</span>
          </Link>
          {/* Hamburger */}
          <button className="mob-only" onClick={()=>setMobileOpen(o=>!o)}
            style={{display:"flex",flexDirection:"column",gap:5,padding:"8px",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",borderRadius:8,cursor:"pointer"}}>
            <span style={{width:20,height:2,background:"#fff",borderRadius:2,transition:"all 0.3s",transform:mobileOpen?"rotate(45deg) translate(5px,5px)":"none"}}/>
            <span style={{width:20,height:2,background:"#fff",borderRadius:2,opacity:mobileOpen?0:1,transition:"all 0.3s"}}/>
            <span style={{width:20,height:2,background:"#fff",borderRadius:2,transition:"all 0.3s",transform:mobileOpen?"rotate(-45deg) translate(5px,-5px)":"none"}}/>
          </button>
        </div>
      </nav>

      {/* MOBILE PANEL */}
      {mobileOpen && (
        <div className="mob-only" style={{position:"fixed",top:64,left:0,right:0,zIndex:999,background:"rgba(10,10,15,0.98)",backdropFilter:"blur(20px)",borderBottom:"1px solid rgba(255,255,255,0.1)",padding:20,display:"flex",flexDirection:"column",gap:6,maxHeight:"85vh",overflowY:"auto"}}>
          <Link href="/tours" style={{padding:"12px 16px",borderRadius:10,color:"rgba(255,255,255,0.8)",textDecoration:"none",fontSize:15,fontWeight:600,background:"rgba(255,255,255,0.04)"}}>🏠 Home</Link>
          <div style={{borderBottom:"1px solid rgba(255,255,255,0.06)",margin:"4px 0"}}/>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.3)",textTransform:"uppercase",letterSpacing:"0.1em",paddingLeft:4}}>Tours</div>
          {TOURS.map(t=>(
            <Link key={t.slug} href={`/${t.slug}`} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 16px",borderRadius:10,color:"rgba(255,255,255,0.7)",textDecoration:"none",fontSize:14}}>
              <span style={{fontSize:22}}>{t.emoji}</span><span>{t.name}</span>
            </Link>
          ))}
          <div style={{borderBottom:"1px solid rgba(255,255,255,0.06)",margin:"4px 0"}}/>
          <Link href="/blog"        style={{padding:"12px 16px",borderRadius:10,color:"rgba(255,255,255,0.8)",textDecoration:"none",fontSize:15}}>📝 Blog</Link>
          <Link href="/attractions" style={{padding:"12px 16px",borderRadius:10,color:"rgba(255,255,255,0.8)",textDecoration:"none",fontSize:15}}>🎟️ Attractions</Link>
          <Link href="/flights"     style={{padding:"12px 16px",borderRadius:10,color:"rgba(255,255,255,0.8)",textDecoration:"none",fontSize:15}}>✈️ Flights</Link>
          <Link href="/about"       style={{padding:"12px 16px",borderRadius:10,color:"rgba(255,255,255,0.8)",textDecoration:"none",fontSize:15}}>ℹ️ About</Link>
          <Link href="/contact"     style={{padding:"12px 16px",borderRadius:10,color:"rgba(255,255,255,0.8)",textDecoration:"none",fontSize:15}}>📞 Contact</Link>
          <a href="https://wa.me/971544735060" target="_blank" rel="noopener noreferrer"
            style={{display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"14px",background:"linear-gradient(135deg,#25D366,#128C7E)",borderRadius:12,color:"#fff",fontSize:15,fontWeight:800,textDecoration:"none",marginTop:8}}>
            💬 Book via WhatsApp
          </a>
        </div>
      )}
      <div style={{height:64}}/>
    </>
  );
}

export default NavBar;
