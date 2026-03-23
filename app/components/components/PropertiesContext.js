"use client";
import { createContext, useContext, useState, useEffect } from "react";

const PropCtx = createContext(null);

export function PropertiesProvider({ children }) {
  const [favs,    setFavs]    = useState([]);
  const [compare, setCompare] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const f = JSON.parse(localStorage.getItem("dp_favs") || "[]");
      const c = JSON.parse(localStorage.getItem("dp_compare") || "[]");
      setFavs(f);
      setCompare(c);
    } catch(_) {}
  }, []);

  const toggleFav = (id) => {
    setFavs(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem("dp_favs", JSON.stringify(next));
      return next;
    });
  };

  const addCompare = (id) => {
    setCompare(prev => {
      if (prev.includes(id) || prev.length >= 3) return prev;
      const next = [...prev, id];
      localStorage.setItem("dp_compare", JSON.stringify(next));
      return next;
    });
  };

  const removeCompare = (id) => {
    setCompare(prev => {
      const next = prev.filter(x => x !== id);
      localStorage.setItem("dp_compare", JSON.stringify(next));
      return next;
    });
  };

  const clearCompare = () => {
    setCompare([]);
    localStorage.setItem("dp_compare", "[]");
  };

  return (
    <PropCtx.Provider value={{ favs, toggleFav, compare, addCompare, removeCompare, clearCompare, mounted }}>
      {children}
    </PropCtx.Provider>
  );
}

export function usePropCtx() {
  const ctx = useContext(PropCtx);
  if (!ctx) throw new Error("usePropCtx must be inside PropertiesProvider");
  return ctx;
}
