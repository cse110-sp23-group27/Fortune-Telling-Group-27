/**
 *
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
      * @return {[]}
      */
	static getAllCards() {
		return TarotCard.#allCards;
	}

	/**
      * Returns a list of all TarotCards
      * @date 5/29/2023 - 6:40:32 PM
      *
      * @return {[]}
      */
	getAllCards() {
		return TarotCard.#allCards;
	}

	static #allCards = [];

	/**
     * Moves object from one point to another over a duration of time
     *
     * @param pointA The object's starting point
     * @param pointB The object's ending point
     * @param time Time in milliseconds it takes for the object to move from
     * @param callback End animation callback
     * pointA to pointB
     */
	move(pointA, pointB, time, callback) {
		Animator.instance.addAnimation(pointA.x, pointB.x,
			()=>this.cardElement.style.left,
			(val)=>this.cardElement.style.left = `${val}vw`, time);
		Animator.instance.addAnimation(pointA.y,
			pointB.y, ()=>this.cardElement.style.top,
			(val)=>this.cardElement.style.top = `${val}vh`, time, callback);
	}


	/**
     * Moves object from one point to another instantly
     *
     * @param point The object's ending point
     */
	moveInstantly(point) {
		this.cardElement.style.left = `${point.x}vw`;
		this.cardElement.style.top = `${point.y}vh`;
	}

	/**
      * Get the positional point of the card
      * @date 5/29/2023 - 11:19:13 PM
      *
      * @returns {{ x: Float; y: Float; }}
      */
	getPositionPoint() {
		return {x: parseFloat(this.cardElement.style.left.replace("vw", "")),
			y: parseFloat(this.cardElement.style.top.replace("vh", ""))};
	}

	/**
     * Rotates object some number of degrees over a duration of time
     *
     * @param degreesA Original orientation of object
     * @param degreesB Number of degrees to rotate object
     * @param time Time in milliseconds it takes for the object to complete the
     * @param callback End animation callback
     * rotation
     */
	rotate(degreesA, degreesB, time, callback) {
		Animator.instance.addAnimation(degreesA, degreesB,
			()=>this.cardElement.style.transform,
			this.rotateInstantly, time, callback);
	}

	/**
     * Rotates object some number of degrees instantly
     *
     * @param degrees Number of degrees to rotate object
     */
	rotateInstantly(degrees) {
		this.cardElement.style.transform = `rotate(${degrees}deg)`;
	}

	/**
     * Flips object over
     *
     * @param faceUp Determines whether the card is face up or not
     * @param time Time in milliseconds it takes for the object to complete the
     * @param callback End of animation callback
     * flip
     */
	setFlip(faceUp, time, callback) {
		//
	}

	/**
     * Performs the flip function after a duration of time
     *
     * @param faceUp Determines whether the card is face up or not
     */
	setFlipInstantly(faceUp) {
		//
	}

	/**
     * Performs the flip function after a duration of time
     *
     * @param zIndex z index of the card
     */
	setZIndex(zIndex) {
		this.cardElement.style.zIndex = zIndex;
	}
}

if (typeof module === "object") {
	// for using tarot card in unit tests
	module.exports = TarotCard;
}