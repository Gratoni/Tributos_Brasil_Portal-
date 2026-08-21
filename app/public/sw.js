/**
 * Service Worker — Tributos Brasil Portal
 * Estratégia:
 *   - Navegação (HTML): Network-first → fallback para /index.html offline
 *   - Assets estáticos (JS/CSS/img): Cache-first → atualiza em background
 *   - API externa: Network-only (sem cache)
 */

const CACHE_VERSION = 'tributos-brasil-v1';
const STATIC_PRECACHE = [
  '/',
  '/index.html',
  '/assets/images/onlywhitelogo.png',
];

/* ── Install: pré-cache dos recursos críticos ── */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_VERSION)
      .then((cache) => cache.addAll(STATIC_PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

/* ── Activate: remove caches antigos ── */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_VERSION)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

/* ── Fetch: estratégias por tipo de recurso ── */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignora requisições não-GET e extensões de browser
  if (request.method !== 'GET') return;
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;

  // API remota — stale-while-revalidate
  if (url.pathname.startsWith('/api/') || url.hostname !== self.location.hostname) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const networkFetch = fetch(request).then((response) => {
          if (response.ok) {
            const toCache = response.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(request, toCache));
          }
          return response;
        });

        return cached ?? networkFetch;
      }),
    );
    return;
  }

  // Navegação (rotas SPA) — network first → fallback offline
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .catch(() => caches.match('/index.html'))
        .then((res) => res ?? new Response('Offline', { status: 503 })),
    );
    return;
  }

  // Assets estáticos — cache first → revalida em background
  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request).then((response) => {
        if (response.ok) {
          const toCache = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(request, toCache));
        }
        return response;
      });

      return cached ?? networkFetch;
    }),
  );
});
