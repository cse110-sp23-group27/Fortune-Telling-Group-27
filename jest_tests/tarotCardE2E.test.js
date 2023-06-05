/**
 * @jest-environment puppeteer
 */
describe("Testing Shuffle", () => {
	beforeAll(async () => {
		await page.goto("http://127.0.0.1:5500/index.html");
	});
	it("Click on shuffle", async () => {
		// console.log("Checking for 3 Main Buttons...");
		// Query select all of the homepage button elements
		// and return the length of that array
		const numButtons = await page.$$eval(".home-page", (homePageBtns) => {
			return homePageBtns.length;
		});
		// Expect there that array from earlier to be of length 3
		// meaning 3 homepage buttons were found
		expect(numButtons).toBe(3);
	});
});