const CACHE_NAME = "fortune-telling";
import { CACHE_IMAGES } from "./assets/scripts/service-worker";

self.addEventListener("install", function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function(cache) {
			return cache.addAll(CACHE_IMAGES);
		})
	);
});

// Activates the service worker
self.addEventListener("activate", function(event) {
	event.waitUntil(self.clients.claim());
});

// Intercept fetch requests and cache them
self.addEventListener("fetch", function(event) {
	event.respondWith(caches.open(CACHE_NAME).then((cache) => {
		return cache.match(event.request).then((cachedResponse) => {
			if (cachedResponse) {
				return cachedResponse;
			}
			return fetch(event.request).then((fetchedResponse) => {
				cache.put(event.request, fetchedResponse.clone());
				return fetchedResponse;
			});
		});
	}));
});