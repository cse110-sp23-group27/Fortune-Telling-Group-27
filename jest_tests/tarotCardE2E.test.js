/**
 * @jest-environment puppeteer
 */

async function isLocatorReady(element, page) {
    const isVisibleHandle = await page.evaluateHandle((e) => 
  {
      const style = window.getComputedStyle(e);
      return (style && style.display !== 'none' && 
      style.visibility !== 'hidden' && style.opacity !== '0');
   }, element);
    var visible = await isVisibleHandle.jsonValue();
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
	});

	it("Initial Home Page - Check for 3 Buttons", async () => {
		// console.log("Checking for 3 Main Buttons...");
		// Query select all of the homepage button elements
		// and return the length of that array
		const numButtons = await page.$$eval(".home-page", (homePageBtns) => {
			return homePageBtns.length;
		});
        const homePageBtnz =  await page.$$(".home-page");
		// Expect there that array from earlier to be of length 3
		// meaning 3 homepage buttons were found
		expect(numButtons).toBe(3);
        const tarotCardButton = await page.$("#toTarotCard");
        await tarotCardButton.click();
        const homeBtns =  await page.$$(".home-page");
        for(let i = 0; i < homeBtns.length; i++) {
            expect(await isLocatorReady(homeBtns[i],page)).toBeFalsy();
        }
	});
});