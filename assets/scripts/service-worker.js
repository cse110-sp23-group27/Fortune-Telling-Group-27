/* eslint-disable linebreak-style */
/* eslint-disable max-len */
// main.js

// CONSTANTS
const tarotCardsImgs = [
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
	"https://raw.githubusercontent.com/cse110-sp23-group27/Fortune-Telling-Group-27/main/assets/images/openBook.png"
];

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