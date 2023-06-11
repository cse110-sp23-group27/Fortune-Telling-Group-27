/* eslint-disable max-len */
const CACHE_NAME = "fortune-telling";
const CACHE_IMAGES = [
	"https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/card-back.png",
	"https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/death.png",
	"https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/judgement.png",
	"https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/justice.png",
	"https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/strength.png",
	"https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/temperance.png",
	"https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-chariot.png",
	"https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-devil.png",
	"https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-emperor.png",
	"https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-empress.png",
	"https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-fool.png",
	"https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-hanged-man.png",
	"https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-hermit.png",
	"https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-hierophant.png",
	"https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-high-priestess.png",
	"https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-lovers.png",
	"https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-magician.png",
	"https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-moon.png",
	"https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-star.png",
	"https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-sun.png",
	"https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-tower.png",
	"https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-wheel-of-fortune.png",
	"https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/tarot-cards/the-world.png",
	"https://raw.githubusercontent.com/danielstuart14/CSS_FOG_ANIMATION/master/fog1.png",
	"https://raw.githubusercontent.com/danielstuart14/CSS_FOG_ANIMATION/master/fog2.png",
	"https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/bookClosed.png",
	"https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/openBook.png",
	"https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/home-background.png"
];

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
			return fetch(event.request, {cache: "no-store"}).then((fetchedResponse) => {
				cache.put(event.request, fetchedResponse.clone());
				return fetchedResponse;
			});
		});
	}));
});