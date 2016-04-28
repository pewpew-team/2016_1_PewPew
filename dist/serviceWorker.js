var CACHE_VERSION = 'pewpew-v5';

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

var imageURLs = [
  '/img/green/bg.png',
  '/img/green/item1.png',
  '/img/green/item2.png',
  '/img/green/item3.png',
  '/img/green/item4.png',
  '/img/green/item5.png',
  '/img/green/item6.png',
  '/img/green2/bg.png',
  '/img/green2/item1.png',
  '/img/green2/item2.png',
  '/img/green2/item3.png',
  '/img/green2/item4.png',
  '/img/green2/item5.png',
  '/img/green2/item6.png',
  '/img/grey/bg.png',
  '/img/grey/item1.png',
  '/img/grey/item2.png',
  '/img/grey/item3.png',
  '/img/grey/item4.png',
  '/img/grey/item5.png',
  '/img/sandy/bg.png',
  '/img/sandy/item1.png',
  '/img/sandy/item2.png',
  '/img/sandy/item3.png',
  '/img/sandy/item4.png',
  '/img/sandy/item5.png',
  '/img/spacecraft/0.png',
  '/img/spacecraft/1.png',
  '/img/spacecraft/-1.png',
  '/img/js-dude.png'
];

this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/favicon.ico',
        '/css/main.min.css',
        '/js/build.min.js'
      ].concat(imageURLs));
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
