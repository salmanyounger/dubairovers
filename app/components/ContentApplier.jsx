"use client"
import { useEffect } from "react"

export default function ContentApplier() {
  useEffect(() => {
    // ── 1. Apply visual editor overrides ─────────────────────────────
    function applyEdits() {
      fetch("/dr-overrides.json?t=" + Date.now())
        .then(r => r.json())
        .then(data => {
          const overrides = (data.overrides || []).filter(o => o.page === window.location.pathname)
          overrides.forEach(o => {
            try {
              const el = document.querySelector(o.selector)
              if (!el) return
              if (o.type === "text")    el.textContent = o.value
              if (o.type === "image")   { el.src = o.value; if (o.alt) el.alt = o.alt }
              if (o.type === "href")    el.href = o.value
              if (o.type === "bgimage") { el.style.backgroundImage = `url(${o.value})`; el.style.backgroundSize = "cover"; el.style.backgroundPosition = "center" }
              if (o.type === "style")   Object.assign(el.style, o.styles || {})
            } catch {}
          })
        })
        .catch(() => {})
    }

    // ── 2. Inject schema JSON-LD into <head> ─────────────────────────
    function injectSchemas() {
      fetch("/dr-schema.json?t=" + Date.now())
        .then(r => r.json())
        .then(data => {
          const page = window.location.pathname
          const schemas = (data.schemas || []).filter(s => s.page === page)
          schemas.forEach(s => {
            const id = `dr-schema-${s.type}`
            if (document.getElementById(id)) return // already injected
            const script = document.createElement("script")
            script.id   = id
            script.type = "application/ld+json"
            script.text = JSON.stringify(s.schema)
            document.head.appendChild(script)
          })
        })
        .catch(() => {})
    }

    applyEdits()
    injectSchemas()
    const t1 = setTimeout(applyEdits,  600)
    const t2 = setTimeout(injectSchemas, 800)

    // ── 3. Cache service worker ───────────────────────────────────────
    if ("serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {})

    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return null
}
