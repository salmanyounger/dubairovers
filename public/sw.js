// DubaiRovers — Service Worker Cache
// Place this file in: public/sw.js

const CACHE = "dr-v1"
const PRECACHE = ["/", "/blog", "/contact", "/about", "/dr-overrides.json"]

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(PRECACHE).catch(() => {}))
  )
  self.skipWaiting()
})

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  )
  self.clients.claim()
})

self.addEventListener("fetch", e => {
  const url = e.request.url
  // Don't cache API calls or admin
  if (url.includes("/api/") || url.includes("/admin")) return

  e.respondWith(
    caches.match(e.request).then(cached => {
      const fresh = fetch(e.request).then(res => {
        if (res.ok && e.request.method === "GET") {
          const clone = res.clone()
          caches.open(CACHE).then(c => c.put(e.request, clone))
        }
        return res
      }).catch(() => cached)
      // Return cached immediately, update in background
      return cached || fresh
    })
  )
})
