"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TOURS = [
  { slug: "desert-safari-dubai",     emoji: "🏜️", name: "Desert Safari Dubai",      desc: "Dunes, camel riding & BBQ dinner" },
  { slug: "hot-air-balloon-dubai",   emoji: "🎈", name: "Hot Air Balloon Dubai",     desc: "Sunrise flight over the desert" },
  { slug: "dhow-cruise-dubai",       emoji: "⛵", name: "Dhow Cruise Dubai",         desc: "Marina & creek dinner cruise" },
  { slug: "quad-bike-dubai",         emoji: "🚵", name: "Quad Bike Dubai",           desc: "ATV adventure on red dunes" },
  { slug: "camel-riding-dubai",      emoji: "🐪", name: "Camel Riding Dubai",        desc: "Authentic Bedouin experience" },
  { slug: "private-city-tour-dubai", emoji: "🏙️", name: "Private City Tour Dubai",  desc: "Burj Khalifa, Frame & more" },
];

const NAV_LINKS = [
  { href: "/tours",       label: "Home",        hasDrop: false },
  { href: "#",            label: "Tours",       hasDrop: true  },
  { href: "/blog",        label: "Blog",        hasDrop: false },
  { href: "/attractions", label: "🎟️ Attractions", hasDrop: false },
  { href: "/flights",     label: "✈️ Flights",  hasDrop: false },
  { href: "/about",       label: "About",       hasDrop: false },
  { href: "/contact",     label: "Contact",     hasDrop: false },
];

export default function Navbar() {
  const pathname = usePathname();
  const [toursDrop, setToursDrop] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [lang, setLang] = useState("EN");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setToursDrop(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close mobile on route change
  useEffect(() => { setMobileOpen(false); setToursDrop(false); }, [pathname]);

  const isActive = (href) => pathname === href || (href !== "/tours" && pathname.startsWith(href));

  return (
    <>
      <style suppressHydrationWarning>{`
        .dr-nav { transition: all 0.3s ease; }
        .dr-nav-link { position:relative; transition:color 0.2s ease; }
        .dr-nav-link::after { content:''; position:absolute; bottom:-4px; left:0; right:0; height:2px; background:linear-gradient(90deg,#f97316,#ec4899); border-radius:1px; transform:scaleX(0); transition:transform 0.25s ease; }
        .dr-nav-link:hover::after, .dr-nav-link.active::after { transform:scaleX(1); }
        .dr-nav-link:hover { color:#f97316 !important; }
        .dr-drop-item { transition:all 0.18s ease; }
        .dr-drop-item:hover { background:rgba(249,115,22,0.08) !important; transform:translateX(4px); }
        @keyframes dropIn { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        .dr-dropdown { animation:dropIn 0.2s ease; }
        @keyframes slideDown { from{opacity:0;max-height:0} to{opacity:1;max-height:600px} }
        .dr-mobile-menu { animation:slideDown 0.3s ease; }
      `}</style>

      <nav className="dr-nav" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
        background: scrolled ? "rgba(10,10,10,0.97)" : "rgba(10,10,10,0.92)",
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${scrolled ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.04)"}`,
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.5)" : "none",
      }}>
        <div style={{ maxWidth: 1380, margin: "0 auto", padding: "0 20px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>

          {/* ── LOGO ── */}
          <Link href="/tours" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: "linear-gradient(135deg,#f97316,#ec4899)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, boxShadow: "0 4px 14px rgba(249,115,22,0.35)" }}>
              🏜️
            </div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.3px" }}>
                Dubai <span style={{ background: "linear-gradient(90deg,#f97316,#ec4899)", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Rovers</span>
              </div>
              <div style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", letterSpacing: "0.12em", textTransform: "uppercase", lineHeight: 1 }}>Best Tours in Dubai</div>
            </div>
          </Link>

          {/* ── NAV BADGE ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "4px 12px", flexShrink: 0 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#10B981" }} />
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>⭐ Dubai's #1 Rated Adventure Platform</span>
          </div>

          {/* ── MAIN NAV LINKS (desktop) ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 2, flex: 1, justifyContent: "center" }}>
            {NAV_LINKS.map((link) =>
              link.hasDrop ? (
                // Tours dropdown
                <div key="tours" ref={dropRef} style={{ position: "relative" }}>
                  <button
                    onClick={() => setToursDrop(s => !s)}
                    className={`dr-nav-link${isActive("/desert-safari-dubai") || isActive("/hot-air-balloon-dubai") || toursDrop ? " active" : ""}`}
                    style={{ background: "none", border: "none", cursor: "pointer", padding: "8px 12px", fontSize: 14, fontWeight: 600, color: toursDrop ? "#f97316" : "rgba(255,255,255,0.85)", display: "flex", alignItems: "center", gap: 4, fontFamily: "inherit" }}>
                    Tours
                    <span style={{ fontSize: 9, transition: "transform 0.2s", transform: toursDrop ? "rotate(180deg)" : "rotate(0deg)", display: "inline-block", opacity: 0.6 }}>▼</span>
                  </button>

                  {/* ── TOURS DROPDOWN ── */}
                  {toursDrop && (
                    <div className="dr-dropdown" style={{
                      position: "absolute", top: "calc(100% + 12px)", left: "50%", transform: "translateX(-50%)",
                      width: 560, background: "#111", border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 18, overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
                      zIndex: 100,
                    }}>
                      {/* Header */}
                      <div style={{ padding: "14px 20px", background: "rgba(249,115,22,0.08)", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>Dubai Tours & Experiences</div>
                          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>6 tour types · All with hotel pickup</div>
                        </div>
                        <Link href="/tours" onClick={() => setToursDrop(false)}
                          style={{ fontSize: 11, color: "#f97316", textDecoration: "none", fontWeight: 700, background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.25)", borderRadius: 8, padding: "5px 10px" }}>
                          View All →
                        </Link>
                      </div>

                      {/* Tour grid */}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", padding: 10, gap: 4 }}>
                        {TOURS.map((tour) => (
                          <Link key={tour.slug} href={`/${tour.slug}`} onClick={() => setToursDrop(false)}
                            className="dr-drop-item"
                            style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 12, textDecoration: "none", background: pathname === `/${tour.slug}` ? "rgba(249,115,22,0.1)" : "transparent" }}>
                            <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg,rgba(249,115,22,0.2),rgba(236,72,153,0.15))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                              {tour.emoji}
                            </div>
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{tour.name}</div>
                              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{tour.desc}</div>
                            </div>
                            {pathname === `/${tour.slug}` && (
                              <div style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "#f97316", flexShrink: 0 }} />
                            )}
                          </Link>
                        ))}
                      </div>

                      {/* Footer strip */}
                      <div style={{ padding: "10px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 12 }}>
                        {["✅ Free Cancellation", "🚗 Hotel Pickup", "⭐ 4.9/5 Rating", "💬 24/7 Support"].map(t => (
                          <span key={t} style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link key={link.href} href={link.href}
                  className={`dr-nav-link${isActive(link.href) ? " active" : ""}`}
                  style={{ textDecoration: "none", padding: "8px 12px", fontSize: 14, fontWeight: 600, color: isActive(link.href) ? "#f97316" : "rgba(255,255,255,0.85)" }}>
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* ── RIGHT SIDE ── */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {/* Language */}
            <button onClick={() => setLang(l => l === "EN" ? "AR" : "EN")}
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "5px 10px", color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
              🌐 {lang}
            </button>

            {/* Account */}
            <Link href="/client" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "6px 11px", color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
              👤 Account
            </Link>

            {/* Dark mode */}
            <button onClick={() => setDarkMode(d => !d)}
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "5px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 30, height: 16, borderRadius: 8, background: darkMode ? "#f97316" : "rgba(255,255,255,0.2)", position: "relative", transition: "background 0.2s" }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, left: darkMode ? 16 : 2, transition: "left 0.2s" }} />
              </div>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}>{darkMode ? "🌙" : "☀️"}</span>
            </button>

            {/* Book Now */}
            <Link href="/booking"
              style={{ background: "linear-gradient(135deg,#f97316,#ec4899)", color: "#fff", padding: "9px 18px", borderRadius: 10, fontSize: 13, fontWeight: 800, textDecoration: "none", display: "flex", alignItems: "center", gap: 6, boxShadow: "0 4px 16px rgba(249,115,22,0.35)", transition: "all 0.2s ease" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
              Book Now 🚀
            </Link>

            {/* Mobile menu toggle */}
            <button onClick={() => setMobileOpen(s => !s)}
              style={{ display: "none", background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "6px 10px", color: "#fff", cursor: "pointer", fontSize: 18 }}
              className="dr-mobile-btn">
              {mobileOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        {mobileOpen && (
          <div className="dr-mobile-menu" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", padding: "12px 20px 20px", background: "#0f0f0f" }}>
            {TOURS.map(tour => (
              <Link key={tour.slug} href={`/${tour.slug}`}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", textDecoration: "none" }}>
                <span style={{ fontSize: 20 }}>{tour.emoji}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{tour.name}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{tour.desc}</div>
                </div>
              </Link>
            ))}
            <Link href="/booking" style={{ display: "block", marginTop: 14, background: "linear-gradient(135deg,#f97316,#ec4899)", color: "#fff", padding: "12px", borderRadius: 10, fontSize: 14, fontWeight: 800, textDecoration: "none", textAlign: "center" }}>
              Book Now 🚀
            </Link>
          </div>
        )}
      </nav>

      {/* Spacer so content doesn't hide under fixed navbar */}
      <div style={{ height: 64 }} />
    </>
  );
}
