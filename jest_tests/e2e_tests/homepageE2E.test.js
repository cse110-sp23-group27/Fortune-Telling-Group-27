/**
 * @jest-environment puppeteer
 */

const helper = require("./E2EHelperFunctions");

const HOMEPAGE = ".homePage";

describe("Testing Homepage Buttons", () => {
	// visit the fortune telling website
	beforeAll(async () => {
		await page.goto("http://127.0.0.1:5500/index.html");
		await page.evaluate(() => {
			localStorage.clear();
		});
		await page.reload();
		await helper.delay(1000);
	});

	it("Initial Home Page - Check for 3 Buttons", async () => {
		// console.log("Checking for 3 Main Buttons...");
		// Query select all of the homepage button elements
		// and return the length of that array
		const numButtons = await page.$$eval(HOMEPAGE, (homePageBtns) => {
			return homePageBtns.length;
		});
		// Expect there that array from earlier to be of length 3
		// meaning 3 homepage buttons were found
		expect(numButtons).toBe(3);
	});

	it("Make sure <home-page> button elements have text values", async () => {
		// console.log("Checking to make sure home page buttons
		// have text values...");
		// Start as true, if any don't have text values, swap to false
		let allArePopulated = true;
		// Query select all of the home page elements
		const homePageBtns = await page.$$(HOMEPAGE);
		for (let i = 0; i < homePageBtns.length; i++) {
			// console.log(`Checking home page button ${i}/${homePageBtns.length}`);
			const data = await page.evaluate((el) => el.textContent,
				homePageBtns[i]);
			// Make the text in the buttons exist
			if (data.length === 0) {
				allArePopulated = false;
			}
			// Expect allArePopulated to still be true
			expect(allArePopulated).toBe(true);
		}
	}, 10000);
	it("Make sure <home-page> button elements change background",
		async () => {
		// console.log("Checking to make sure home
			// page buttons change background...");
		// Start as true, if any don't have text values, swap to false
			let allChangeBackground = true;
			const bdy = await page.waitForSelector("body");
			// Query select all of the home page elements
			const homePageBtns = await page.$$(HOMEPAGE);
			for (let i = 0; i < homePageBtns.length; i++) {
				const style = await bdy.getProperty("style");
				const bg = await style.getProperty("backgroundColor");
				// console.log(`Checking home page button ${i}/${homePageBtns.length}`);
				await homePageBtns[i].hover();
				// Check if the backgrounds are same color after mouse hover
				const bg2 = await style.getProperty("backgroundColor");
				// console.log(`BG1: ${bg} BG2:${bg2}`);
				if (bg2 == bg) {
					allChangeBackground = false;
				}
				// Expect allArePopulated to still be true
				expect(allChangeBackground).toBe(true);
			}
			await helper.delay(500);
		}, 10000);
});