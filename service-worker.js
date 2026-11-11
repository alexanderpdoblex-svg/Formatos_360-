const CACHE_NAME = "informes360-pwa-v2";
const APP_SHELL = [
  "./",
  "./index.html",
  "./generadores.html",
  "./manifest.webmanifest",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/icon-maskable-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_SHELL);
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith("informes360-") && k !== CACHE_NAME).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Cache local application files for offline use.
  if (url.origin === self.location.origin) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(req);
      if (cached) return cached;
      try {
        const fresh = await fetch(req);
        if (fresh && fresh.ok) cache.put(req, fresh.clone());
        return fresh;
      } catch (err) {
        if (req.mode === "navigate") return (await cache.match("./index.html"));
        throw err;
      }
    })());
    return;
  }

  // Cache the Excel library after the first successful online visit.
  if (url.hostname === "cdn.jsdelivr.net" && url.pathname.includes("xlsx-populate")) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME + "-vendor");
      const cached = await cache.match(req);
      if (cached) return cached;
      try {
        const fresh = await fetch(req);
        if (fresh && (fresh.ok || fresh.type === "opaque")) cache.put(req, fresh.clone());
        return fresh;
      } catch (err) {
        if (cached) return cached;
        throw err;
      }
    })());
  }
});
