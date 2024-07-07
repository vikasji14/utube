// public/service-worker.js
self.addEventListener('install', event => {
    console.log('Service Worker installing.');
    event.waitUntil(self.skipWaiting());
  });
  
  self.addEventListener('activate', event => {
    console.log('Service Worker activating.');
    event.waitUntil(self.clients.claim());
  });
  
  self.addEventListener('fetch', event => {
    if (!navigator.onLine) {
      event.respondWith(
        new Response(`
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Network Connection Error</title>
              <style>
                body { margin: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'; }
                .flex { display: flex; }
                .items-center { align-items: center; }
                .justify-center { justify-content: center; }
                .h-screen { height: 100vh; }
                .bg-gray-100 { background-color: #f7fafc; }
                .text-center { text-align: center; }
                .text-3xl { font-size: 1.875rem; }
                .font-bold { font-weight: 700; }
                .text-red-500 { color: #f56565; }
                .mb-4 { margin-bottom: 1rem; }
                .text-lg { font-size: 1.125rem; }
                .text-gray-700 { color: #4a5568; }
              </style>
            </head>
            <body class="flex items-center justify-center h-screen bg-gray-100">
              <div class="text-center">
                <h1 class="text-3xl font-bold text-red-500 mb-4">Network Connection Error</h1>
                <p class="text-lg text-gray-700">Please check your internet connection.</p>
                <p class="text-sm font-bold text-gray-700">Thank You ❤️</p>
              </div>
            </body>
          </html>
        `, {
          headers: { 'Content-Type': 'text/html' }
        })
      );
    } else {
      event.respondWith(fetch(event.request));
    }
  });
  