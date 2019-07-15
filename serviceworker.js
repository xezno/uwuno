self.addEventListener("install", function(event) {
    event.waitUntil(caches.open("uwuno").then(function(cache) {
        console.log("Caching");
        return cache.addAll([
            "/",
            "/?src=pwa",
            "/css/main.css",
        ]);
    }));
});

self.addEventListener("fetch", function(event) {
    event.respondWith(fetch(event.request).catch(function() { return caches.match(event.request); }));
});