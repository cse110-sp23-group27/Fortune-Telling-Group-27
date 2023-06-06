/**
 * @jest-environment puppeteer
 */

// variables for selecting buttons

const HOMEPAGE = ".home-page";
const HOMEBTN = "#toHome";
const TOTAROTCARD = "#toTarotCard";
const SHUFFLEBUTTON = "#tarotShuffleBtn";
const SHUFFLEDCARDS = ".cardsBtnPreShuffle";
const RESPONSE = "#response";
/**
 * Returns the selected value of the card
 * @param {ElementHandle} card the elementhandle of the card
 * @return {String} the selected value, either "true" or "false"
 */
async function getSelectedValue(card) {
	const val = await page.evaluate(
		(el) => el.getAttribute("selected"), card);
	return val;
}

/**
 * Returns the background color of the card
 * @param {ElementHandle} card the elementhandle of the card
 * @return {String} the color value (as a string)
 */
async function getBGColor(card) {
	const style = await card.getProperty("style");
	const color = await style.getProperty("backgroundColor");
	const colorVal = await color.jsonValue();
	return colorVal;
}

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
 * Generate a random integer between 0 (inclusive) and max (exclusive)
 * @param {number} max the max integer (exclusive)
 * @return {number} a random number between 0 and max - 1
 */
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

/**
 * Generate num amount of random integers integer between 0 (inclusive)
 * and max (exclusive)
 * @param {number} num number of random numbers to be generated
 * @param {number} max the max integer (exclusive)
 * @return {number[]} array of random numbers from 0 to max with length num
 */
function getMultipleInts(num, max) {
	const arr = [];
	while (arr.length < num) {
		const r = getRandomInt(max);
		if (arr.indexOf(r) === -1) arr.push(r);
	}
	return arr;
}

describe("Testing Tarot Card Page", () => {
	const randNums = getMultipleInts(3, 23); // get selected random cards
	// visit the fortune telling website
	beforeAll(async () => {
		await page.goto("http://127.0.0.1:5500/index.html");
		await page.evaluate(() => {
			localStorage.clear();
		});
		await page.reload();
		await delay(1000);
	});
	for (let i = 0; i < 2; i++) {
		it("Initial  - Click on Tarot Card Button", async () => {
		// console.log("Checking for 3 Main Buttons...");
		// Query select all of the homepage button elements
		// and return the length of that array
			const numButtons = await page.$$eval(HOMEPAGE, (homePageBtns) => {
				return homePageBtns.length;
			});
			// Expect there that array from earlier to be of length 3
			// meaning 3 homepage buttons were found
			expect(numButtons).toBe(3);
			const tarotCardButton = await page.$(TOTAROTCARD);
			const homePageBtns = await page.$$(HOMEPAGE);
			const shuffle = await page.$$(SHUFFLEDCARDS);
			expect(await allHidden(shuffle)).toBe(true);
			// expect home page buttons to be visible
			expect(await allHidden(homePageBtns)).toBe(false);
			await tarotCardButton.click();
			// after clicking on the tarot card button,
			// expect home page buttons to be hidden
			expect(await allHidden(homePageBtns)).toBe(true);
		});
		it("Click on shuffle button", async () => {
			const shuffleBtn = await page.$(SHUFFLEBUTTON);
			await shuffleBtn.evaluate((b) => b.click()); // click tarot card
			await delay(4000); // change to promise use when animator gets updated
			const shuffle = await page.$$(SHUFFLEDCARDS);
			// expect cards to be visible
			expect(await allHidden(shuffle)).toBe(false);
		}, 10000);
		it("Select and unselect card", async () => {
		// select random card
			const shuffle = await page.$$(SHUFFLEDCARDS);
			const randNum = await getRandomInt(shuffle.length);
			const selCard = shuffle[randNum];

			// card should not be selected and have white bg color
			expect(await getSelectedValue(selCard)).toBe("false");
			expect(await getBGColor(selCard)).toBe("white");
			await selCard.evaluate((b) => b.click()); // click tarot card

			// card should be selected and have black bg color

			expect(await getSelectedValue(selCard)).toBe("true");
			expect(await getBGColor(selCard)).toBe("black");
			await selCard.evaluate((b) => b.click()); // click tarot card

			// card should not be selected and have white bg color

			expect(await getSelectedValue(selCard)).toBe("false");
			expect(await getBGColor(selCard)).toBe("white");
			await delay(1000);
		}, 10000);
		it("Select 3 cards", async () => {
			let cnt = 0;
			const shuffle = await page.$$(SHUFFLEDCARDS);
			for (const i of randNums) {
				const selCard = shuffle[i];
				// expect card to not be selected
				expect(await getSelectedValue(selCard)).toBe("false");
				await selCard.evaluate((b) => b.click()); // click tarot
				if (cnt < 2) {
					expect(await getSelectedValue(selCard)).toBe("true");
				} else { // Last card does not change selected value
					expect(await getSelectedValue(selCard)).toBe("false");
				}
				cnt++;
			}
			await delay(500);
		}, 10000);
		it("Check if 3 cards in view", async () => {
			const shuffle = await page.$$(SHUFFLEDCARDS);
			let cardsInView = 0;
			// sort random numbers in ascending order
			const randSorted = randNums.sort(
				function(a, b) {
					return a - b;
				});
			for (let i = 0; i < shuffle.length; i++) {
				const selCard = shuffle[i];
				// get top view value
				const style = await selCard.getProperty("style");
				const top = await style.getProperty("top");
				const viewVal = await parseInt(await top.jsonValue(), 10);

				if (viewVal > 0) {
				// if greater than 0 then count as in view
					expect(i).toBe(randSorted[cardsInView]);
					cardsInView++;
				}
			}
			expect(cardsInView).toBe(3);
		}, 10000);
		it("Click on cards in view", async () => {
			const shuffle = await page.$$(SHUFFLEDCARDS);
			// checking the response text val (should be "")
			const p = await page.$(RESPONSE);
			const pText = await p.getProperty("textContent");
			let pTextVal = await pText.jsonValue();
			expect(pTextVal).toBe("");
			for (const i of randNums) {
				await shuffle[i].evaluate((b) => b.click()); // click tarot
				// check current text content of respones
				await delay(100);
				const currText = await p.getProperty("textContent");
				const currTextVal = await currText.jsonValue();

				// should not be equal to previous text content
				expect(currTextVal).not.toBe(pTextVal);

				// print current text content
				console.log("Current text: " + currTextVal);
				pTextVal = currTextVal;
			}
			await delay(100);
		}, 10000);
		it("Go back home", async () => {
			const homePageBtns = await page.$$(HOMEPAGE);
			expect(await allHidden(homePageBtns)).toBe(true);
			const toHome = await page.$(HOMEBTN);
			// await toHome.click();
			await toHome.evaluate((b) => b.click()); // click home page
			// expect home page buttons to be visible
			expect(await allHidden(homePageBtns)).toBe(false);
			const shuffle = await page.$$(SHUFFLEDCARDS);
			expect(await allHidden(shuffle)).toBe(true);
		}, 10000);
	}
});