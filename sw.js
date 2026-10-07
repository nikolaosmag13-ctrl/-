// Όνομα cache μνήμης
const CACHE_NAME = 'shift-calendar-v1';
const ASSETS = [
  './index.html',
  './manifest.json'
];

// Εγκατάσταση και αποθήκευση αρχείων στη συσκευή
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Ενεργοποίηση
self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

// Φόρτωση από τη μνήμη όταν δεν υπάρχει σύνδεση (Offline mode)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
