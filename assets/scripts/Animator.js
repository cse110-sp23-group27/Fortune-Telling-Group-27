/**
 * Animator class that handles animation objects and callbacks
 * @date 5/29/2023 - 6:26:28 PM
 *
 * @class Animator
 * @typedef {Animator}
 */
class Animator {
	static instance = null;

	/**
     * Contructor for the Animator class
     * @date 5/29/2023
     * @constructor
     */
	constructor() {
		if (Animator.instance === null) {
			Animator.instance = this;
		} else {
			console.error("[ERROR] Use Animator.instance.");
		}

		this.animationObjs = [];
		// Set up interval
		this.animationIntervalDelay = 10; // ms
		this.animationInterval = null;
		this.#startAnimationInterval();
	}

	/**
     * Create a new interval for Animation
     * @date 5/29/2023
     */
	#startAnimationInterval() {
		// Clear interval if there is already one
		if (this.animationInterval !== null) {
			clearInterval(this.animationInterval);
		}
		// Make new interval
		this.animationInterval = setInterval(()=>this.#whenAnimationInterval(),
			this.animationIntervalDelay);
	}

	/**
     * Process animation interval for new animation
     * @date 5/29/2023
     */
	#whenAnimationInterval() {
		// What happens every animation interval,
		// run backwards so we can splice items out of it
		for (let i = this.animationObjs.length - 1; i >= 0; i--) {
			const animationObj = this.animationObjs[i];
			// Increment the timer inside the animation
			animationObj.timeSinceStart += this.animationIntervalDelay;
			// Process the animation object
			let nextValue = animationObj.to - animationObj.from;

			// apply ease in out animation curve and clamp to not go over
			nextValue *= Math.min(this.easeInOutSine(animationObj.timeSinceStart / animationObj.time), 1);

			nextValue += animationObj.from;

			animationObj.setter(nextValue);
			if (animationObj.timeSinceStart > animationObj.time) {
				// Remove this animation as it ran its full time,
				// if has callback, call it
				if (this.animationObjs[i].callback) {
					this.animationObjs[i].callback();
				}
				// Remove obj from list
				this.animationObjs.splice(i, 1);
			}
		}
	}

	/**
     * Add a new animation object that will take
	 * the animation from `from` value to the `to` value
     * @date 5/29/2023 - 6:24:34 PM
     *
     * @param {float} from starting value of the animation
     * @param {float} to ending value of animation
     * @param {Function} getter to get current value of animated prop
     * @param {Function} setter to set new current value of animated prop
     * @param {float} time time to complete the animation
     * @param {Function} callback callback after the animation is done
     * @return {animationObj} from: any; to: any; getter: any;
	 *                        setter: any; time: any;
     *                        callback: any; timeSinceStart: number;
     */
	addAnimation(from, to, getter, setter, time, callback) {
		const animationObj = {
			from: from,
			to: to,
			getter: getter,
			setter: setter,
			time: time,
			callback: callback,
			timeSinceStart: 0
		};
		this.animationObjs.push(animationObj);
		return animationObj;
	}

	/**
     * Delete the given animation object
     * @date 5/29/2023
     *
     * @param {Animator} animationObj - The Animation object to delete
     * @param {Function} runCallback callback
     */
	deteleAnimation(animationObj, runCallback) {
		// TODO this runs in O(n), restructure to a map probably to make this O(1)
		const animationIndex = this.animationObjs.findIndex(animationObj);

		// If asked to still run the callback
		if (runCallback && this.animationObjs[animationIndex].callback) {
			this.animationObjs[animationIndex].callback();
		}

		// Remove this object from the animation list early
		this.animationObjs.splice(animationIndex, 1);
	}
	easeInOutSine(x) {
	return -(Math.cos(Math.PI * x) - 1) / 2;
	}
}

// instantiate a singleton instance
new Animator();
export default Animator;