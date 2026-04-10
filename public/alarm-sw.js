self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const baseUrl = self.location.origin;
  const notificationData = event.notification.data || {};
  const targetPath = typeof notificationData.url === 'string' ? notificationData.url : '/my-garden';
  const targetUrl = new URL(targetPath, baseUrl).toString();

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if (client.url.startsWith(baseUrl) && 'focus' in client) {
          client.postMessage({
            type: 'leaforra:notification-click',
            plantId: notificationData.plantId,
            alarmId: notificationData.alarmId,
          });

          if ('navigate' in client) {
            client.navigate(targetUrl);
          }
          return client.focus();
        }
      }

      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }

      return undefined;
    })
  );
});
