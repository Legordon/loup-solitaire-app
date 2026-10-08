/* Service worker : fonctionnement hors connexion.
   Changez le numéro de version ci-dessous à chaque modification de index.html
   pour que les appareils récupèrent la nouvelle version. */
const VERSION = 'v4-1';
const CACHE = 'loup-solitaire-' + VERSION;
const ASSETS = [
  "./",
  "index.html",
  "manifest.json",
  "icons/apple-touch-icon.png",
  "icons/favicon-32.png",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
  "fonts/alegreya-sans-latin-400-normal.woff2",
  "fonts/alegreya-sans-latin-500-normal.woff2",
  "fonts/alegreya-sans-latin-700-normal.woff2",
  "fonts/im-fell-english-latin-400-italic.woff2",
  "fonts/im-fell-english-latin-400-normal.woff2"
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Cache d'abord, mise à jour en arrière-plan quand le réseau est disponible.
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((cache) => cache.put(req, copy));
          }
          return res;
        })
        .catch(() => hit || (req.mode === 'navigate' ? caches.match('index.html') : undefined));
      return hit || network;
    })
  );
});
