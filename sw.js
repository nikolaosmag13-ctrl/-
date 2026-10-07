// Έκδοση μνήμης cache
const CACHE_NAME = 'shift-calendar-v1';

// Αρχεία που αποθηκεύονται στη συσκευή για εκτός σύνδεσης λειτουργία
const ASSETS = [
  './index.html',
  './manifest.json',
  './iconvardia.png'
];

// Εγκατάσταση και αποθήκευση αρχείων
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Ενεργοποίηση και ανάληψη ελέγχου
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Ανάκτηση από τη μνήμη cache όταν δεν υπάρχει δίκτυο
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
