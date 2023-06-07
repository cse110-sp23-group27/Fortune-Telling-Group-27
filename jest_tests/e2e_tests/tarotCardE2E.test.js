/**
 * @jest-environment puppeteer
 */

// for importing functions

const helper = require("./E2EHelperFunctions");

// variables for selecting buttons

const HOMEPAGE = ".homePage";
const RESETBTN = "#tarotResetBtn";
const TOTAROTCARD = "#toTarotCard";
const SHUFFLEBUTTON = "#tarotShuffleBtn";
const SHUFFLEDCARDS = ".cardsBtnPreShuffle";
const RESPONSE = "#response";

describe("Testing Tarot Card Page", () => {
	const randNums = helper.getMultipleInts(3, 22); // get selected random cards
	// visit the fortune telling website
	beforeAll(async () => {
		await page.goto("http://127.0.0.1:5500/index.html");
		await page.evaluate(() => {
			localStorage.clear();
		});
		await page.reload();
		await helper.delay(1000);
	});
	for (let increment = 0; increment < 2; increment++) {
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
			expect(await helper.allHidden(shuffle)).toBe(true);
			// expect home page buttons to be visible
			expect(await helper.allHidden(homePageBtns)).toBe(false);
			await tarotCardButton.click();
			// after clicking on the tarot card button,
			// expect home page buttons to be hidden
			expect(await helper.allHidden(homePageBtns)).toBe(true);
		});
		it("Click on shuffle button", async () => {
			const shuffleBtn = await page.$(SHUFFLEBUTTON);
			await shuffleBtn.evaluate((b) => b.click()); // click tarot card
			await helper.delay(8000); // change to promise use when animator gets updated
			const shuffle = await page.$$(SHUFFLEDCARDS);
			// expect cards to be visible
			expect(await helper.allHidden(shuffle)).toBe(false);
		}, 100000);
		it("Select and unselect card", async () => {
		// select random card
			const shuffle = await page.$$(SHUFFLEDCARDS);
			const randNum = await helper.getRandomInt(shuffle.length);
			const selCard = shuffle[randNum];

			// card should not be selected and have white bg color
			expect(await helper.getSelectedValue(selCard)).toBe("false");
			expect(await helper.getBGColor(selCard)).toBe("white");
			await selCard.evaluate((b) => b.click()); // click tarot card

			// card should be selected and have black bg color

			expect(await helper.getSelectedValue(selCard)).toBe("true");
			expect(await helper.getBGColor(selCard)).toBe("black");
			await selCard.evaluate((b) => b.click()); // click tarot card

			// card should not be selected and have white bg color

			expect(await helper.getSelectedValue(selCard)).toBe("false");
			expect(await helper.getBGColor(selCard)).toBe("white");
			await helper.delay(1000);
		}, 10000);
		it("Select 3 cards", async () => {
			let cnt = 0;
			const shuffle = await page.$$(SHUFFLEDCARDS);
			for (const i of randNums) {
				const selCard = shuffle[i];
				// expect card to not be selected
				expect(await helper.getSelectedValue(selCard)).toBe("false");
				await selCard.evaluate((b) => b.click()); // click tarot
				if (cnt < 2) {
					expect(await helper.getSelectedValue(selCard)).toBe("true");
				} else { // Last card does not change selected value
					expect(
						await helper.getSelectedValue(selCard)).toBe("false");
				}
				cnt++;
			}
			await helper.delay(500);
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
				await helper.delay(100);
				const currText = await p.getProperty("textContent");
				const currTextVal = await currText.jsonValue();

				// should not be equal to previous text content
				expect(currTextVal).not.toBe(pTextVal);

				// print current text content
				console.log("Current text: " + currTextVal);
				pTextVal = currTextVal;
			}
			await helper.delay(100);
		}, 10000);
		it("Go back home using reset", async () => {
			const homePageBtns = await page.$$(HOMEPAGE);
			expect(await helper.allHidden(homePageBtns)).toBe(true);
			const reset = await page.$(RESETBTN);
			// await toHome.click();
			await reset.click();
			// await reset.evaluate((b) => b.click()); // click reset button
			// expect home page buttons to be visible
			expect(await helper.allHidden(homePageBtns)).toBe(false);
			const shuffle = await page.$$(SHUFFLEDCARDS);
			expect(await helper.allHidden(shuffle)).toBe(true);
		}, 10000);
	}
});