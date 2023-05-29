class TarotCard {
	constructor(cardElement) {
          this.cardElement = cardElement;
          cardElement.style.position = "absolute";
	}
	/**
     * Moves object from one point to another over a duration of time
     *
     * @param pointA The object's starting point
     * @param pointB The object's ending point
     * @param time Time in milliseconds it takes for the object to move from
     * pointA to pointB
     */
	move(pointA, pointB, time) {
		Animator.instance.addAnimation(pointA.x, pointB.x, ()=>this.cardElement.style.left, (val)=>this.cardElement.style.left = `${val}vw`, time);
          Animator.instance.addAnimation(pointA.y, pointB.y, ()=>this.cardElement.style.top, (val)=>this.cardElement.style.top = `${val}vh`, time);
     }


	/**
     * Moves object from one point to another instantly
     *
     * @param point The object's ending point
     */
	moveInstantly(point) {
		cardElement.style.left = point.x;
          cardElement.style.top = point.y;
	}

	/**
     * Rotates object some number of degrees over a duration of time
     *
     * @param degreesA Original orientation of object
     * @param degreesB Number of degrees to rotate object
     * @param time Time in milliseconds it takes for the object to complete the
     * rotation
     */
	rotate(degreesA, degreesB, time) {
		Animator.instance.addAnimation(degreesA, degreesB, ()=>this.cardElement.style.transform, this.rotateInstantly, time);
	}

	/**
     * Rotates object some number of degrees instantly
     *
     * @param degrees Number of degrees to rotate object
     */
	rotateInstantly(degrees) {
		cardElement.style.transform = `rotate(${degrees}deg)`;
	}

	/**
     * Flips object over
     *
     * @param faceUp Determines whether the card is face up or not
     * @param time Time in milliseconds it takes for the object to complete the
     * flip
     */
	setFlip(faceUp, time) {
		//
	}

	/**
     * Performs the flip function after a duration of time
     *
     * @param time Time in milliseconds before the flip function is performed
     */
	setFlipInstantly() {
		//
	}
}