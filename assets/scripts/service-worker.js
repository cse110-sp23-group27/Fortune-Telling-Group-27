/* eslint-disable linebreak-style */
/* eslint-disable max-len */
// main.js

// Run the init() function when the page has loaded
window.addEventListener("DOMContentLoaded", init);

/**
 *
 */
async function init() {
	// initialize ServiceWorker
	initializeServiceWorker();
}

/**
   * Detects if there's a service worker, then loads it and begins the process
   * of installing it and getting it running
   */
function initializeServiceWorker() {
	if ("serviceWorker" in navigator) {
		// B2. TODO - Listen for the 'load' event on the window object.
		self.addEventListener("load", async (event) => {
			try {
				const registration = await
				navigator.serviceWorker.register("sw.js", {
					scope: "."
				});
				if (registration.installing) {
					console.log("Service worker installing");
				} else if (registration.waiting) {
					console.log("Service worker installed");
				} else if (registration.active) {
					console.log("Service worker successfully registered");
				}
			} catch (error) {
				console.error(`Registration failed with ${error}`);
			}
		});
	}
}