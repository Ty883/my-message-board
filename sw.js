self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// This listens for "Background Sync" or push events if you ever go full-push
self.addEventListener('push', (event) => {
    const options = { body: 'New Message Received!', icon: 'https://cdn-icons-png.flaticon.com/512/8943/8943377.png' };
    event.waitUntil(self.registration.showNotification('Secret Board', options));
});
