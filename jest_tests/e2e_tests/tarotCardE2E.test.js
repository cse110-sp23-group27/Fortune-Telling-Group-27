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
const MENUBTNSTWO = ".menuItemTwo";

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
	}, helper.MAXTIMEOUT);
	for (let increment = 0; increment < 2; increment++) {
		it("Initial  - Click on Tarot Card Button", async () => {
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
			await helper.delay(100);
			// after clicking on the tarot card button,
			// expect home page buttons to be hidden
			expect(await helper.allHidden(homePageBtns)).toBe(true);
			await helper.delay(500);
		}, helper.MAXTIMEOUT);
		it("Click on shuffle button", async () => {
			const shuffleBtn = await page.$(SHUFFLEBUTTON);
			await shuffleBtn.evaluate((b) => b.click()); // click tarot card
			await helper.delay(8000); // change to promise use when animator gets updated
			const shuffle = await page.$$(SHUFFLEDCARDS);
			// expect cards to be visible
			expect(await helper.allHidden(shuffle)).toBe(false);
		}, helper.MAXTIMEOUT);
		it("Select and unselect card", async () => {
			// select random card
			const shuffle = await page.$$(SHUFFLEDCARDS);
			const randNum = helper.getRandomInt(shuffle.length);
			const selCard = shuffle[randNum];
			const topVal = await helper.getTopValue(selCard);
			console.log("top value of card: " + topVal);

			// card should not be selected and have white bg color
			expect(await helper.getSelectedValue(selCard)).toBe("false");
			expect(await helper.getBGColor(selCard)).toBe("white");
			await selCard.evaluate((b) => b.click()); // click tarot card
			await helper.delay(200);

			// card should be selected and have black bg color
			// card top value should be greater than initial top value

			expect(await helper.getSelectedValue(selCard)).toBe("true");
			expect(await helper.getBGColor(selCard)).toBe("black");
			// expect(await helper.getTopValue(selCard)).toBeGreaterThan(topVal); (will change when the cards change top value)

			await selCard.evaluate((b) => b.click()); // click tarot card
			await helper.delay(200);

			// card should not be selected and have white bg color
			// card top value should be the same as initial top value

			expect(await helper.getSelectedValue(selCard)).toBe("false");
			expect(await helper.getBGColor(selCard)).toBe("white");
			expect(await helper.getTopValue(selCard)).toBe(topVal);

			await helper.delay(1000);
		}, helper.MAXTIMEOUT);
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
		}, helper.MAXTIMEOUT);
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
			await helper.delay(500);
		}, helper.MAXTIMEOUT);
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
				await helper.delay(1000);
				const currText = await p.getProperty("textContent");
				const currTextVal = await currText.jsonValue();

				// should not be equal to previous text content
				expect(currTextVal).not.toBe(pTextVal);

				// print current text content
				console.log("Current text: " + currTextVal);
				pTextVal = currTextVal;
			}
			await helper.delay(500);
		}, helper.MAXTIMEOUT);
		it("Check localstorage for saved cards", async () => {
			// get local storage value
			const deck = await page.evaluate(
				() => localStorage.getItem("deck"));
			const deckVal = await JSON.parse(deck);
			expect(deckVal.length >= 3);
			await helper.delay(500);
			// get burger bar for saved cards
			// check if list in burger bar is the same as deck
			const inBar = await page.$$(MENUBTNSTWO);
			for (let i = 0; i < inBar.length; i++) {
				// if the ID is included in the deck, then the button should be visible (block display)
				// otherwise it should be invisible (none display)
				const display = await helper.getDisplayValue(inBar[i]);
				const id = await page.evaluate((el) => el.id, inBar[i]);
				if (deckVal.indexOf(id) !== -1) {
					expect(display).toBe("block");
					console.log("Card in localStorage: " + id);
				} else {
					expect(display).toBe("none");
				}
			}
		}, helper.MAXTIMEOUT);
		it("Go back home using reset", async () => {
			const homePageBtns = await page.$$(HOMEPAGE);
			expect(await helper.allHidden(homePageBtns)).toBe(true);
			const reset = await page.$(RESETBTN);
			await reset.click();
			await helper.delay(500);
			// expect home page buttons to be visible
			expect(await helper.allHidden(homePageBtns)).toBe(false);
			const shuffle = await page.$$(SHUFFLEDCARDS);
			expect(await helper.allHidden(shuffle)).toBe(true);
			await helper.delay(1000);
		}, helper.MAXTIMEOUT);
	}
});