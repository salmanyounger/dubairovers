"use client";
import { useState, useEffect } from "react";

export default function HeartButton({ propertyId, size = "normal" }) {
  const [faved,   setFaved]   = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pop,     setPop]     = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const favs = JSON.parse(localStorage.getItem("dp_favs") || "[]");
      setFaved(favs.includes(propertyId));
    } catch(_) {}
  }, [propertyId]);

  const toggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const favs = JSON.parse(localStorage.getItem("dp_favs") || "[]");
      const next = favs.includes(propertyId)
        ? favs.filter(x => x !== propertyId)
        : [...favs, propertyId];
      localStorage.setItem("dp_favs", JSON.stringify(next));
      setFaved(!faved);
      if (!faved) { setPop(true); setTimeout(() => setPop(false), 600); }
    } catch(_) {}
  };

  if (!mounted) return null;

  const isSmall = size === "small";
  const dim = isSmall ? 28 : 36;

  return (
    <button onClick={toggle}
      title={faved ? "Remove from saved" : "Save property"}
      style={{
        width: dim, height: dim, borderRadius:"50%",
        background: faved ? "rgba(239,68,68,0.2)" : "rgba(0,0,0,0.55)",
        border: `1.5px solid ${faved ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.2)"}`,
        display:"flex", alignItems:"center", justifyContent:"center",
        cursor:"pointer", fontSize: isSmall ? 13 : 16,
        backdropFilter:"blur(8px)",
        transform: pop ? "scale(1.3)" : "scale(1)",
        transition:"all 0.2s ease",
        flexShrink:0,
      }}>
      {faved ? "❤️" : "🤍"}
    </button>
  );
}
