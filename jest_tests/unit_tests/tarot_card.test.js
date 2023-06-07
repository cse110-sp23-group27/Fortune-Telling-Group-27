/**
 * @jest-environment jsdom
 */

import TarotCard from "../../assets/scripts/TarotCard.js";

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

describe("Testing Moving and Rotating Tarot Card", () => {
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
	});

	test("Get all cards", () => {
		expect(TarotCard.getAllCards().includes(testCard)).toBe(true);
		expect(testCard.getAllCards().includes(testCard)).toBe(true);
	});

	// Add more tests for the other methods
});