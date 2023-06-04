/**
 * @jest-environment jsdom
 */

const TarotCard = require("../assets/scripts/TarotCard");

describe("Testing Creating a New Tarot Card Object", () => {
	const testButton = document.createElement("button");
	const testCard = new TarotCard(testButton);
	test("Before Modifying Tarot Card", () => {
		expect(testCard.value).toBeUndefined();
		expect(testCard.cardElement).toBe(testButton);
		expect(testCard.cardElement.style.position).toBe("absolute");
		expect(testCard.cardElement.style.pointerEvents).toBe("");
	});
	test("After Modifying Tarot Card", () => {
		testCard.value = "test_value";
		testCard.setClickable(true);
		expect(testCard.value).toBe("test_value");
		expect(testCard.cardElement.style.pointerEvents).toBe("auto");
		testCard.setClickable(false);
		expect(testCard.cardElement.style.pointerEvents).toBe("none");
	});
});