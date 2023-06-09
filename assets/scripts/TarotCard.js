import Animator from "./Animator.js";

/**
 * Tarot Card class that defines and creates Tarot Card objects
 * @date 5/29/2023
 *
 * @class TarotCard
 * @typedef {TarotCard}
 */
class TarotCard {
	/**
      * Creates an instance of TarotCard.
      * @date 5/29/2023 - 6:27:55 PM
      *
      * @constructor
      * @param {HTMLElement} cardElement html element that represents the card
      */
	constructor(cardElement) {
		if (!cardElement) {
			console.error("Null card element!");
		}
		this.cardElement = cardElement;
		this.cardElement.style.position = "absolute";
		TarotCard.#allCards.push(this);
	}

	/**
      * Set the card element to allow/disallow clicks
      * @date 5/29/2023 - 9:26:19 PM
      *
      * @param {Boolean} isClickable
      */
	setClickable(isClickable) {
		this.cardElement.style.pointerEvents = isClickable?"auto":"none";
	}

	/**
      * Returns a list of all TarotCards
      * @date 5/29/2023 - 6:40:32 PM
      *
      * @return {Array} array of all Tarot Cards
      */
	static getAllCards() {
		return TarotCard.#allCards;
	}

	/**
      * Returns a list of all TarotCards
      * @date 5/29/2023 - 6:40:32 PM
      *
      * @return {Array} array of all Tarot Cards
      */
	getAllCards() {
		return TarotCard.#allCards;
	}

	static #allCards = [];

	/**
     * Moves object from one point to another over a duration of time
     *
     * @param {float} pointA The object's starting point
     * @param {float} pointB The object's ending point
     * @param {float} time Time in milliseconds for the object to move from
     * @param {Function} callback End animation callback
     * pointA to pointB
     */
	move(pointA, pointB, time, callback) {
		Animator.instance.addAnimation(pointA.x, pointB.x, ()=>
			this.cardElement.style.left, (val)=>
			this.cardElement.style.left = `${val}vw`, time);
		Animator.instance.addAnimation(pointA.y, pointB.y, ()=>
			this.cardElement.style.top, (val)=>
			this.cardElement.style.top = `${val}vh`, time, callback);
	}

	/**
     * Same as move, but returns a promise that will resolve once the move is complete
     * @date 6/6/2023 - 1:06:04 AM
     *
     * @param {float} pointA The object's starting point
     * @param {float} pointB The object's ending point
     * @param {float} time Time in milliseconds for the object to move from
     * @param {Function} callback End animation callback
     * @return {Promise}
     */
	movePromise(pointA, pointB, time, callback) {
		return new Promise(
			(resolve)=>{
				this.move(pointA, pointB, time, ()=>{
					if (callback) {
						callback();
					}
					resolve();
				});
			}
		);
	}

	/**
     * Moves object from one point to another instantly
     *
     * @param {float} point The object's ending point
     */
	moveInstantly(point) {
		this.cardElement.style.left = `${point.x}vw`;
		this.cardElement.style.top = `${point.y}vh`;
	}

	/**
      * Get the positional point of the card
      * @date 5/29/2023 - 11:19:13 PM
      *
      * @return {{x: Float, y: Float}}
      */
	getPositionPoint() {
		let x = parseFloat(this.cardElement.style.left.replace("vw", ""));
		let y = parseFloat(this.cardElement.style.top.replace("vh", ""));
		if (isNaN(x)) {
			x = 0;
		}
		if (isNaN(y)) {
			y = 0;
		}
		return {x: x, y: y};
	}

	/**
     * Rotates object some number of degrees over a duration of time
     *
     * @param {float} degreesA Original orientation of object
     * @param {float} degreesB Number of degrees to rotate object
     * @param {float} time Time in milliseconds for the object to complete
     * @param {Function} callback End animation callback
     * rotation
     */
	rotate(degreesA, degreesB, time, callback) {
		Animator.instance.addAnimation(degreesA, degreesB, ()=>
			this.cardElement.style.transform,
		(val)=>this.rotateInstantly(val), time, callback);
	}

	/**
     * Same as move, but returns a promise that will resolve once the move is complete
     *
     * @param {float} degreesA Original orientation of object
     * @param {float} degreesB Number of degrees to rotate object
     * @param {float} time Time in milliseconds for the object to complete
     * @param {Function} callback End animation callback
	 * @return {Promise}
     * rotation
     */
	rotatePromise(degreesA, degreesB, time, callback) {
		return new Promise((resolve)=>{
			this.rotate(degreesA, degreesB, time, ()=>{
				if (callback) {
					callback();
				}
				resolve();
			});
		});
	}

	/**
     * Rotates object some number of degrees instantly
     *
     * @param {float} degrees Number of degrees to rotate object
     */
	rotateInstantly(degrees) {
		this.cardElement.style.transform =
						`translateX(-50%) rotate(${degrees}deg)`;
	}

	/**
	 * Get current rotation of card element
	 * @date 6/6/2023 - 2:00:09 PM
	 * @author Victor Kim
	 *
	 * @return {*}
	 */
	getRotation() {
		const transformString = this.cardElement.style.transform;
		const rotationString =
					transformString.substring(
						transformString.indexOf("rotate("),
						transformString.indexOf("deg)")
					);
		const rotation = parseFloat(rotationString);
		if (isNaN(rotation)) {
			return 0;
		}
		return rotation;
	}

	/**
     * Performs the flip function after a duration of time
     *
     * @param {int} zIndex z index of the card
     */
	setZIndex(zIndex) {
		this.cardElement.style.zIndex = zIndex;
	}

	/**
	 * Gives current zIndex of the card element
	 * @date 6/6/2023 - 1:59:44 PM
	 * @author Victor Kim
	 *
	 * @return {int}
	 */
	getZIndex() {
		return this.cardElement.style.zIndex;
	}

	/**
      * Gives a promise which will resolve in ms miliseconds
      * @date 6/6/2023 - 1:14:03 AM
      *
      * @param {number} ms wait time
      * @return {Promise}
      */
	static wait(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
}

if (typeof module === "object") {
	// for using tarot card in unit tests
	module.exports = TarotCard;
}

export default TarotCard;