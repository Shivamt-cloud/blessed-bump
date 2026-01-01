// Service Worker for BlessedBump PWA
const CACHE_NAME = 'blessedbump-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/apple-touch-icon.png',
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('✅ Service Worker: Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('❌ Service Worker: Cache failed', error);
      })
  );
  self.skipWaiting(); // Activate immediately
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim(); // Take control immediately
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Skip caching for Vite dev server assets (HMR, etc.)
  if (url.pathname.startsWith('/@') || 
      url.pathname.includes('/node_modules/') ||
      (url.hostname === 'localhost' && url.port === '3000' && url.pathname.startsWith('/src/'))) {
    // For dev server assets, just fetch directly without caching
    event.respondWith(fetch(event.request).catch(() => {
      // If fetch fails, return a basic response to prevent errors
      return new Response('Dev server asset not available', {
        status: 503,
        statusText: 'Service Unavailable',
        headers: new Headers({ 'Content-Type': 'text/plain' })
      });
    }));
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
      .catch(() => {
        // If both fail, return offline page or cached index
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
        // Return a proper error response instead of undefined
        return new Response('Network error', {
          status: 408,
          statusText: 'Request Timeout',
          headers: new Headers({ 'Content-Type': 'text/plain' })
        });
      })
  );
});

// Push event - handle push notifications
self.addEventListener('push', (event) => {
  console.log('📬 Service Worker: Push notification received', event);
  
  let notificationData = {
    title: 'BlessedBump',
    body: 'You have a new notification',
    icon: '/android-chrome-192x192.png',
    badge: '/android-chrome-192x192.png',
    tag: 'blessedbump-notification',
    requireInteraction: false,
    data: {
      url: '/',
    },
  };

  // Parse push data if available
  if (event.data) {
    try {
      const data = event.data.json();
      notificationData = {
        ...notificationData,
        ...data,
      };
    } catch (e) {
      // If data is text
      notificationData.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(notificationData.title, {
      body: notificationData.body,
      icon: notificationData.icon,
      badge: notificationData.badge,
      tag: notificationData.tag,
      requireInteraction: notificationData.requireInteraction,
      data: notificationData.data,
      vibrate: [200, 100, 200],
      actions: [
        {
          action: 'open',
          title: 'Open App',
        },
        {
          action: 'close',
          title: 'Close',
        },
      ],
    })
  );
});

// Notification click event - handle user clicking notification
self.addEventListener('notificationclick', (event) => {
  console.log('👆 Service Worker: Notification clicked', event);
  
  event.notification.close();

  if (event.action === 'close') {
    return;
  }

  // Open or focus the app
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Check if app is already open
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        // If not open, open new window
        if (clients.openWindow) {
          const urlToOpen = event.notification.data?.url || '/';
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// Notification close event (optional)
self.addEventListener('notificationclose', (event) => {
  console.log('❌ Service Worker: Notification closed', event);
  // You can track notification dismissals here if needed
});
