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
	}, helper.MAXTIMEOUT);

	it("Initial Home Page - Check for 3 Buttons", async () => {
		// Query select all of the homepage button elements
		// and return the length of that array
		const numButtons = await page.$$eval(HOMEPAGE, (homePageBtns) => {
			return homePageBtns.length;
		});
		// Expect there that array from earlier to be of length 1
		// meaning 1 homepage button was found
		expect(numButtons).toBe(1);
		await helper.delay(500);
	}, helper.MAXTIMEOUT);

	it("Make sure <home-page> button elements have text values", async () => {
		// Start as true, if any don't have text values, swap to false
		let allArePopulated = true;
		// Query select all of the home page elements
		const homePageBtns = await page.$$(HOMEPAGE);
		for (let i = 0; i < homePageBtns.length; i++) {
			const data = await page.evaluate((el) => el.textContent,
				homePageBtns[i]);
			// Make the text in the buttons exist
			if (data.length === 0) {
				allArePopulated = false;
			}
			// Expect allArePopulated to still be true
			expect(allArePopulated).toBe(true);
		}
		await helper.delay(500);
	}, helper.MAXTIMEOUT);
	it("Make sure home page doesn't change bg", async () => {
		// Start as true, if any change the background color, set to false
		let allChangeBackground = false;
		const bdy = await page.waitForSelector("body");
		// Query select all of the home page elements
		const homePageBtns = await page.$$(HOMEPAGE);
		for (let i = 0; i < homePageBtns.length; i++) {
			const style = await bdy.getProperty("style");
			const bg = await (
				await style.getProperty("backgroundColor")).jsonValue();
			await homePageBtns[i].hover();
			// Check if the backgrounds are same color after mouse hover
			const bg2 = await (
				await style.getProperty("backgroundColor")).jsonValue();
			if (bg2 !== bg) {
				allChangeBackground = true;
			}
			// Expect allArePopulated to still be true
			expect(allChangeBackground).toBe(false);
		}
		await helper.delay(500);
	}, helper.MAXTIMEOUT);
});