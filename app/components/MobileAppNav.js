"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileAppNav() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return null;

  // Hide on landing page and sub-platform pages
  if (pathname === "/") return null;
  if (pathname.startsWith("/archai")) return null;
  if (pathname.startsWith("/salmanfx")) return null;
  if (pathname.startsWith("/webbuilder")) return null;
  if (pathname.startsWith("/properties")) return null;
  if (pathname.startsWith("/admin")) return null;
  if (pathname.startsWith("/al-noor")) return null;

  const isActive = (path) => pathname === path || pathname.startsWith(path + "/");

  const tabs = [
    { href: "/tours",       icon: "🏠", label: "Home",    active: pathname === "/tours" },
    { href: "/tours",       icon: "🏜️", label: "Tours",   active: pathname.includes("safari") || pathname.includes("balloon") || pathname.includes("dhow") || pathname.includes("quad") || pathname.includes("camel") || pathname.includes("city-tour") },
    { href: "/booking",     icon: "📋", label: "Book",    active: pathname === "/booking" },
    { href: "https://wa.me/971544735060", icon: "💬", label: "WhatsApp", active: false, external: true },
    { href: "/blog",        icon: "☰",  label: "More",    active: pathname === "/blog" || pathname === "/about" || pathname === "/contact" },
  ];

  return (
    <>
      <style suppressHydrationWarning>{`
        .mob-app-nav { display: none; }
        @media (max-width: 768px) {
          .mob-app-nav { display: flex !important; }
          body { padding-bottom: 72px; }
        }
      `}</style>
      <div className="mob-app-nav" style={{
        position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 999,
        background: "rgba(10,10,15,0.97)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        height: 68,
        alignItems: "center",
        justifyContent: "space-around",
        padding: "0 8px",
      }}>
        {tabs.map((tab, i) => {
          const isAct = tab.active;
          const style = {
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", gap: 3, padding: "8px 16px",
            borderRadius: 12, textDecoration: "none", flex: 1,
            background: isAct ? "rgba(249,115,22,0.12)" : "transparent",
            border: isAct ? "1px solid rgba(249,115,22,0.25)" : "1px solid transparent",
            transition: "all 0.2s",
          };
          const content = (
            <>
              <span style={{ fontSize: 20 }}>{tab.icon}</span>
              <span style={{ fontSize: 9, fontWeight: isAct ? 700 : 500, color: isAct ? "#f97316" : "rgba(255,255,255,0.45)", letterSpacing: "0.05em" }}>{tab.label}</span>
            </>
          );
          if (tab.external) return (
            <a key={i} href={tab.href} target="_blank" rel="noopener noreferrer" style={{ ...style, background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.25)" }}>
              <span style={{ fontSize: 20 }}>💬</span>
              <span style={{ fontSize: 9, fontWeight: 700, color: "#25D366" }}>WhatsApp</span>
            </a>
          );
          return <Link key={i} href={tab.href} style={style}>{content}</Link>;
        })}
      </div>
    </>
  );
}
