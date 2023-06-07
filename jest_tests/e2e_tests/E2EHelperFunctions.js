const {ElementHandle, Browser} = require("puppeteer");


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

module.exports = {
	getHiddenVal,
	getBGColor,
	getSelectedValue,
	getMultipleInts,
	getRandomInt,
	returnNewPromise,
	delay,
	getLeftVal,
	allHidden
};