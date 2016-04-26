var CACHE_VERSION = 'pewpew-v3';

this.addEventListener('fetch', function(event) {
  var response;
  event.respondWith(
    fetch(event.request).then(function(resp) {
      response = resp;
      var staticFileExpr = new RegExp('.(jpg|jpeg|gif|png|css|js|ico|xml|rss|txt)$'),
          googleAPIExpr = new RegExp('(fonts.googleapis.com|fonts.gstatic.com)');
      if(staticFileExpr.test(event.request.url) || googleAPIExpr.test(event.request.url)) {
        caches.open(CACHE_VERSION).then(function(cache) {
          cache.put(event.request, response);
        });
      }
      return response.clone();
    }).catch(function(error) {
      return caches.match(event.request);
    })
  );
});

this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(function(cache) {
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
  var cacheWhitelist = [CACHE_VERSION];
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
