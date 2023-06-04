/**
 * @jest-environment puppeteer
 */

describe("Testing Burger Bar Itself", () => {
	// visit the fortune telling website
	beforeAll(async () => {
		await page.goto("http://127.0.0.1:5500/index.html");
	});
	it("Clicking on Burger Bar Checkbox", async () => {
		// Query select all of the homepage button elements
		// and return the length of that array
		const burgerBarCheckbox = await page.$("#menu__toggle");
		const leftVal = await page.evaluate(() => {
			const elem =document.querySelector(".menu__box");
			const val =
        parseInt(window.getComputedStyle(elem, null).getPropertyValue("left"), 10);
			return val;
		});
		expect(leftVal).toBeLessThan(0);
		const checkedValBefore = await burgerBarCheckbox.getProperty("checked");
		expect(await checkedValBefore.jsonValue()).toBe(false);
		await burgerBarCheckbox.click();
		const checkedVal = await burgerBarCheckbox.getProperty("checked");
		(await burgerBarCheckbox.getProperty("checked")).jsonValue();
		expect(await checkedVal.jsonValue()).toBe(true);
	});
});

describe("Testing Burger Bar Buttons", () => {
	beforeAll(async () => {
		await page.goto("http://127.0.0.1:5500/index.html");
	});
	it("Initial Burger Bar - Check for 6 Burger Bar Buttons", async () => {
		// console.log("Checking for 6 Burger Bar Buttons...");
		// Query select all of the burger bar button elements
		// and return the length of that array
		const numButtons = await page.$$eval(".menu__item", (btns) => {
			return btns.length;
		});
		// Expect there that array from earlier to be of length 6,
		// meaning 6 burger bar buttons were found
		expect(numButtons).toBe(6);
	});
	it("Make sure Burger Bar button elements have text values", async () => {
		console.log("Checking to make sure buttons have text values...");
		// Start as true, if any don't have text values, swap to false
		let allArePopulated = true;
		// Query select all of the home page elements
		const burgerBtns = await page.$$(".menu__item");
		for (let i = 0; i < burgerBtns.length; i++) {
			// console.log(`Checking button ${i}/${burgerBtns.length}`);
			const data = await page.evaluate((el) => el.textContent, burgerBtns[i]);
			// Make the text in the buttons exist
			if (data.length === 0) {
				allArePopulated = false;
			}
			// Expect allArePopulated to still be true
			expect(allArePopulated).toBe(true);
		}
	}, 10000);
	it("Initial Burger Bar - Home button test", async () => {
		const toHome = await page.$("#toHome");
		const toTarot = await page.$("#toTarotCard");
		const homePageBtns = await page.$$(".home-page");
		for (let i = 0; i < homePageBtns.length; i++) {
			// console.log(`Checking home page button ${i}/${homePageBtns.length}`);
			expect(homePageBtns[i].boundingBox()).toBeDefined();
		}
		await toTarot.click();
		await toHome.evaluate((b) => b.click()); // click home button
		const homePageBtns3 = await page.$$(".home-page");
		for (let i = 0; i < homePageBtns.length; i++) {
			// console.log(`Checking home page button ${i}/${homePageBtns.length}`);
			expect(homePageBtns3[i].boundingBox()).toBeDefined();
		}
	});
	it("Initial Burger Bar - Github Button Test", async () => {
		const toGitHub = await page.$("#toGitHub");
		const homePageBtns = await page.$$(".home-page");
		await toGitHub.evaluate((b) => b.click()); // click github button
		for (let i = 0; i < homePageBtns.length; i++) {
			// check if home page buttons still exist
			expect(homePageBtns[i]).not.toHaveProperty("hidden");
		}
	});
});