/**
 * @jest-environment puppeteer
 */

/**
 * Checks if the html element is visible or not given element and the page
 * @param {HTMLElement} element - HTML element that is either visible or not
 * @param {page} page - page variable used for puppeteer
 *
 * @return {boolean} - returns true if visible and false otherwise.
 */
async function isLocatorReady(element, page) {
	const isVisibleHandle = await page.evaluateHandle((e) => {
		const style = window.getComputedStyle(e);
		return (style && style.display !== "none" &&
      style.visibility !== "hidden" && style.opacity !== "0");
	}, element);
	const visible = await isVisibleHandle.jsonValue();
	const box = await element.boxModel();
	if (visible && box) {
		return true;
	}
	return false;
}

describe("Testing Tarot Card Page", () => {
	// visit the fortune telling website
	beforeAll(async () => {
		await page.goto("http://127.0.0.1:5500/index.html");
		await page.evaluate(() => {
			localStorage.clear();
		});
		await page.reload();
	});

	it("Initial Home Page - Check for 3 Buttons", async () => {
		// console.log("Checking for 3 Main Buttons...");
		// Query select all of the homepage button elements
		// and return the length of that array
		const numButtons = await page.$$eval(".home-page", (homePageBtns) => {
			return homePageBtns.length;
		});
		// Expect there that array from earlier to be of length 3
		// meaning 3 homepage buttons were found
		expect(numButtons).toBe(3);
		const tarotCardButton = await page.$("#toTarotCard");
		await tarotCardButton.click();
		const homeBtns = await page.$$(".home-page");
		for (let i = 0; i < homeBtns.length; i++) {
			expect(await isLocatorReady(homeBtns[i], page)).toBeFalsy();
		}
	});
});