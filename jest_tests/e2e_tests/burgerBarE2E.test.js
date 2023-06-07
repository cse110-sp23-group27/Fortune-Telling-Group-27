/**
 * @jest-environment puppeteer
 */

const {Browser} = require("puppeteer");

const HOMEPAGE = ".home-page";
const HOMEBTN = "#toHome";
const DOCS = "#toDocumentation";
const GITHUB = "#toGitHub";
const TAROTCARDBTN = "#toTarotCard";
const BURGERBAR = "#menu__toggle";
const BURGERBOX = ".menu__box";
const BURGERBTNS = ".menu__item";


/**
 * Returns the hidden attribute of the element
 * @param {ElementHandle} element the elementhandle in question
 * @return {boolean} the hidden value, either true or false
 */
async function getHiddenVal(element) {
	const hidden = await element.getProperty("hidden");
	const hiddenVal = await hidden.jsonValue();
	return hiddenVal;
}

/**
 * Returns the left  attribute of the element
 * @param {String} selector the selector string of the element
 * @return {number} the left value of the element
 */
async function getLeftVal(selector) {
	const leftVal = await page.evaluate((selector) => {
		const elem =document.querySelector(selector);
		const leftVal = window.getComputedStyle(
			elem, null).getPropertyValue("left");
		const val = parseInt(leftVal, 10);
		return val;
	}, selector);
	return leftVal;
}


/**
 * Returns if all elements are hidden or not
 * @param {ElementHandle[]} elements A list of ElementHandles.
 * @return {boolean} True if all elements are hidden, false otherwise
 */
async function allHidden(elements) {
	for (let i = 0; i < elements.length; i++) {
		if ((await getHiddenVal(elements[i])) === false) {
			return false;
		}
	}
	return true;
}

/**
 * Delays the execution for time amount of milliseconds
 * @param {number} time amount of time in milliseconds to wait
 * @return {Promise} returns a new promise when time is passed
 */
function delay(time) {
	return new Promise(function(resolve) {
		setTimeout(resolve, time);
	});
}

/**
 *
 * @param {Browser} browser the browser used to open the tab
 * @return {Promise} A new promise that will finish when the page opens
 */
function returnNewPromise(browser) {
	return new Promise((resolve) =>
		browser.once("targetcreated", (target) => resolve(target.page()))
	);
}

describe("Testing Burger Bar and Buttons", () => {
	// visit the fortune telling website
	beforeAll(async () => {
		await page.goto("http://127.0.0.1:5500/index.html");
		await page.evaluate(() => {
			localStorage.clear();
		});
		await page.reload();
		await delay(1000);
	});
	it("Clicking on Burger Bar Checkbox", async () => {
		// select the burger bar checkbox
		const burgerBarCheckbox = await page.$(BURGERBAR);

		// check that the left value of the burgerbox is less than 0
		expect(await getLeftVal(BURGERBOX)).toBeLessThan(0);

		// make sure check box is not checked
		const checkedValBefore = await burgerBarCheckbox.getProperty("checked");
		expect(await checkedValBefore.jsonValue()).toBe(false);

		// click the burger bar checkbox
		await burgerBarCheckbox.click();
		await delay(100);

		// make sure check box is checked
		const checkedVal = await burgerBarCheckbox.getProperty("checked");
		expect(await checkedVal.jsonValue()).toBe(true);
	}, 10000);
	it("Initial Burger Bar - Check for 6 Burger Bar Buttons", async () => {
		// console.log("Checking for 6 Burger Bar Buttons...");
		// Query select all of the burger bar button elements
		// and return the length of that array
		const bBtns = await page.$$(BURGERBTNS);
		// Expect there that array from earlier to be of length 6,
		// meaning 6 burger bar buttons were found
		expect(bBtns.length).toBe(6);
		// console.log(await allHidden(bBtns));
		// expect btns to not be hidden
		expect(await allHidden(bBtns)).toBe(false);
	}, 10000);
	it("Make sure Burger Bar button elements have text values", async () => {
		// console.log("Checking to make sure buttons have text values...");
		// Start as true, if any don't have text values, swap to false
		let allArePopulated = true;
		// Query select all of the home page elements
		const bBtns = await page.$$(BURGERBTNS);
		for (let i = 0; i < bBtns.length; i++) {
			// console.log(`Checking button ${i}/${burgerBtns.length}`);
			const data = await page.evaluate((el) => el.textContent, bBtns[i]);
			// Make sure the text in the buttons exist
			if (data.length === 0) {
				allArePopulated = false;
			}
		}
		// Expect allArePopulated to still be true
		expect(allArePopulated).toBe(true);
	}, 10000);
	it("Initial Burger Bar - Documentation Button Test", async () => {
		const toDocs = await page.$(DOCS);
		const newPagePromise = returnNewPromise(browser);
		await toDocs.evaluate((b) => b.click()); // click docs button
		// get new page
		const newPage = await newPagePromise;
		// check if last page opened is the docs
		expect(newPage.url()).toBe(
			"https://cse110-sp23-group27.github.io/" +
			"Fortune-Telling-Group-27/specs/documentation" +
			"/generated/index.html");
		await newPage.close();
		await delay(1000);
	}, 10000);
	it("Initial Burger Bar - Github Button Test", async () => {
		const toGit = await page.$(GITHUB);
		const newPagePromise = returnNewPromise(browser);
		await toGit.evaluate((b) => b.click()); // click github button
		// get new page
		const newPage = await newPagePromise;
		expect(newPage.url()).toBe(
			"https://github.com/" +
			"cse110-sp23-group27/Fortune-Telling-Group-27"+
			"/tree/main");
		await newPage.close();
		await delay(1000);
	}, 50000);
	it("Initial Burger Bar - Home button test", async () => {
		const toHome = await page.$(HOMEBTN);
		const toTarot = await page.$(TAROTCARDBTN);

		const homeBtns = await page.$$(HOMEPAGE);

		expect(await allHidden(homeBtns)).toBe(false);
		await toHome.evaluate((b) => b.click()); // click home button
		expect(await allHidden(homeBtns)).toBe(false);

		await toTarot.evaluate((b) => b.click()); // click home button
		await delay(100);
		expect(await allHidden(homeBtns)).toBe(true);

		await toHome.evaluate((b) => b.click()); // click home button
		expect(await allHidden(homeBtns)).toBe(false);
		await delay(100);
	}, 10000);
});