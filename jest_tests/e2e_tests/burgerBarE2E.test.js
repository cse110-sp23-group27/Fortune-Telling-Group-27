/**
 * @jest-environment puppeteer
 */

const helper = require("./E2EHelperFunctions");

const HOMEBTN = "#toHome";
const DOCS = "#toDocumentation";
const INTRO = "#toIntro";
const GITHUB = "#toGitHub";
const TAROTCARDBTN = "#toTarotCard";
const BURGERBAR = "#menuToggle";
const BURGERBOX = ".menuBox";
const BOOKCHECKBOX = "#menuToggleTwo";
const BURGERBTNS = ".menuItem";

describe("Testing Burger Bar and Buttons", () => {
	// visit the fortune telling website
	beforeAll(async () => {
		await page.goto("http://127.0.0.1:5500/index.html");
		await page.evaluate(() => {
			localStorage.clear();
		});
		await page.reload();
		await helper.delay(1000);
	}, 20000);
	it("Clicking on Burger Bar Checkbox", async () => {
		// select the burger bar checkbox
		const burgerBarCheckbox = await page.$(BURGERBAR);

		// check that the left value of the burgerbox is less than 0
		expect(await helper.getLeftVal(BURGERBOX)).toBeLessThan(0);

		// make sure check box is not checked
		const checkedValBefore = await burgerBarCheckbox.getProperty("checked");
		expect(await checkedValBefore.jsonValue()).toBe(false);

		// click the burger bar checkbox
		await burgerBarCheckbox.click();
		await helper.delay(500);

		// make sure check box is checked
		const checkedVal = await burgerBarCheckbox.getProperty("checked");
		expect(await checkedVal.jsonValue()).toBe(true);
	}, helper.MAXTIMEOUT);
	it("Initial Burger Bar - Check for 4 Burger Bar Buttons", async () => {
		// Query select all of the burger bar button elements
		// and return the length of that array
		const bBtns = await page.$$(BURGERBTNS);
		// Expect there that array from earlier to be of length 4,
		// meaning 4 burger bar buttons were found
		expect(bBtns.length).toBe(4);
		// expect btns to not be hidden
		expect(await helper.allHidden(bBtns)).toBe(false);
		await helper.delay(500);
	}, helper.MAXTIMEOUT);
	it("Make sure Burger Bar button elements have text values", async () => {
		// Start as true, if any don't have text values, swap to false
		let allArePopulated = true;
		// Query select all of the home page elements
		const bBtns = await page.$$(BURGERBTNS);
		for (let i = 0; i < bBtns.length; i++) {
			const data = await page.evaluate((el) => el.textContent, bBtns[i]);
			// Make sure the text in the buttons exist
			if (data.length === 0) {
				allArePopulated = false;
			}
		}
		// Expect allArePopulated to still be true
		expect(allArePopulated).toBe(true);
		await helper.delay(500);
	}, helper.MAXTIMEOUT);
	it("Initial Burger Bar - Instructions Button Test", async () => {
		const toInstructions = await page.$(INTRO);
		const newPagePromise = helper.returnNewPromise(browser);
		await toInstructions.click();
		// get new page
		const newPage = await newPagePromise;
		// check if last page opened is the introduction
		expect(newPage.url()).toBe("https://github.com/cse110-sp23-group27/" +
			"Fortune-Telling-Group-27/blob/main/specs/" +
			"documentation/user-introduction.md");
		await newPage.close();
		await helper.delay(1000);
	}, helper.MAXTIMEOUT);
	it("Initial Burger Bar - Documentation Button Test", async () => {
		const burgerBarCheckbox = await page.$(BURGERBAR);
		const checkedVal = await burgerBarCheckbox.getProperty("checked");
		if (!(await checkedVal.jsonValue())) {
			await burgerBarCheckbox.evaluate((b) => b.click()); // click burger bar button
		}
		await helper.delay(500);
		const toDocs = await page.$(DOCS);
		const newPagePromise = helper.returnNewPromise(browser);
		await toDocs.click();
		// get new page
		const newPage = await newPagePromise;
		// check if last page opened is the docs
		expect(newPage.url()).toBe(
			"https://cse110-sp23-group27.github.io/" +
			"Fortune-Telling-Group-27/specs/documentation" +
			"/generated/index.html");
		await newPage.close();
		await helper.delay(1000);
	}, helper.MAXTIMEOUT);
	it("Initial Burger Bar - Github Button Test", async () => {
		const burgerBarCheckbox = await page.$(BURGERBAR);
		const checkedVal = await burgerBarCheckbox.getProperty("checked");
		if (!(await checkedVal.jsonValue())) {
			await burgerBarCheckbox.evaluate((b) => b.click()); // click burger bar button
		}
		await helper.delay(500);
		const toGit = await page.$(GITHUB);
		const newPagePromise = helper.returnNewPromise(browser);
		await toGit.click();
		// get new page
		const newPage = await newPagePromise;
		expect(newPage.url()).toBe(
			"https://github.com/" +
			"cse110-sp23-group27/Fortune-Telling-Group-27"+
			"/tree/main");
		await newPage.close();
		await helper.delay(1000);
	}, helper.MAXTIMEOUT);
	it("Initial Burger Bar - Home button test", async () => {
		const burgerBarCheckbox = await page.$(BURGERBAR);
		const checkedVal = await burgerBarCheckbox.getProperty("checked");
		// check if burger bar is checked
		if (!(await checkedVal.jsonValue())) {
			await burgerBarCheckbox.evaluate((b) => b.click()); // click burger bar button
		}
		await helper.delay(500);
		const toHome = await page.$(HOMEBTN); // the home button on burger bar
		const toTarot = await page.$(TAROTCARDBTN); // the tarot card button on the homepage

		expect(await helper.getHiddenVal(toTarot)).toBe(false); // check if tarot card is hidden
		await toHome.click();
		// await toHome.evaluate((b) => b.click()); // click home button
		expect(await helper.getHiddenVal(toTarot)).toBe(false); // check if tarot card is hidden

		await toTarot.evaluate((b) => b.click()); // click tarot button
		await helper.delay(100);
		expect(await helper.getHiddenVal(toTarot)).toBe(true); // tarot card is hidden
		await helper.delay(500);

		await toHome.click();
		// await toHome.evaluate((b) => b.click()); // click home button
		expect(await helper.getHiddenVal(toTarot)).toBe(false); // tarot card no longer hidden
		await helper.delay(500);
	}, helper.MAXTIMEOUT);
	it("Book Burger Bar - Open and Close test", async () => {
		const bookCheckbox = await page.$(BOOKCHECKBOX);
		await bookCheckbox.evaluate((b) => b.click()); // Click book checkbox
		await helper.delay(500);
		await bookCheckbox.evaluate((b) => b.click()); // Click book checkbox again
	}, helper.MAXTIMEOUT);
});