this.addEventListener('fetch', function(event) {
  var response;
  event.respondWith(
    fetch(event.request).then(function(resp) {
      response = resp;
      caches.open('pewpew-v1').then(function(cache) {
        cache.put(event.request, response);
      });
      return response.clone();
    }).catch(function(error) {
      console.log('Error: ' + error);
      return caches.match(event.request);
    })
  );
});

this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('pewpew-v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/favicon.ico',
        '/css/main.min.css',
        '/js/build.min.js'
      ]);
    })
  );
});

this.addEventListener('activate', function(event) {
  var cacheWhitelist = ['pewpew-v1'];
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key);
        }
      }));
    })
  );
});
