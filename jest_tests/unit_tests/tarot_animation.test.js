/**
 * @jest-environment jsdom
 */

import TarotCard from "../../assets/scripts/TarotCard.js";

describe("Testing Creating a New Tarot Card Object", () => {
	const testButton = document.createElement("button");
	const testCard = new TarotCard(testButton);
	test("Before Moving Tarot Card", () => {
		expect(testCard.getPositionPoint()).toStrictEqual({"x": NaN, "y": NaN});
		expect(testCard.cardElement.style.zIndex).toBe("");
	});
	test("After Moving Tarot Card", () => {
		testCard.moveInstantly({x: 90, y: 80});
		expect(testCard.getPositionPoint()).toStrictEqual({"x": 90, "y": 80});
		testCard.setZIndex(5);
		expect(testCard.cardElement.style.zIndex).toBe("5");
		// ADD MORE ANIMATION TESTING HERE
	});
});