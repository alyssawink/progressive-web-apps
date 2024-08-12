// src-sw.js
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst, StaleWhileRevalidate } from "workbox-strategies";
import { CacheableResponsePlugin } from "workbox-cacheable-response";
import { ExpirationPlugin } from "workbox-expiration";
import { offlineFallback, warmStrategyCache } from "workbox-recipes";

// Precaches and routes the resources listed in the WB_MANIFEST
precacheAndRoute(self.__WB_MANIFEST);

// Defines the caching strategy for page navigation requests
const pageCache = new CacheFirst({
  cacheName: "page-cache",
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls:["/index.html", "/"],
  strategy: pageCache
})

// Warms up the cache with specified URLs
registerRoute(
  ({ request }) => request.mode === "navigate",
  pageCache
);

// Implements asset caching for styles, scripts, and workers
registerRoute(
  ({ request }) => ["style", "script", "worker"].includes(request.destination),
  new StaleWhileRevalidate({
    cacheName: "asset-cache",
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// Fallback strategy for offline support
//offlineFallback();