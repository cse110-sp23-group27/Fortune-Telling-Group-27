/**
 * Animator class that handles animation objects and callbacks
 * @date 5/29/2023 - 6:26:28 PM
 *
 * @class Animator
 * @typedef {Animator}
 */
class Animator {
	static instance = null;
	constructor() {
		if (Animator.instance === null) {
			Animator.instance = this;
		} else {
			console.error("DON'T CREATE ANIMATOR OBJECTS YOURSELF!!!" +
				"Use Animator.instance to access the Animator object!!!");
		}

		this.animationObjs = [];
		// set up interval
		this.animationIntervalDelay = 10; // ms
		this.animationInterval = null;
		this.#startAnimationInterval();
	}

	#startAnimationInterval() {
		// clear interval if there is already one
		if (this.animationInterval !== null) {
			clearInterval(this.animationInterval);
		}
		// make new interval
		this.animationInterval = setInterval(()=>
			this.#whenAnimationInterval(), this.animationIntervalDelay);
	}

	#whenAnimationInterval() {
		// what happens every animation interval,
		// run backwards so we can splice items out of it
		for (let i = this.animationObjs.length - 1; i >= 0; i--) {
			const animationObj = this.animationObjs[i];
			// increment the timer inside the animation
			animationObj.timeSinceStart += this.animationIntervalDelay;
			// process the animation object
			let nextValue = animationObj.from +
				((animationObj.to - animationObj.from)/animationObj.time) *
					animationObj.timeSinceStart;
			// make sure that the next value never overshoots the "to" value
			nextValue = (animationObj.from - animationObj.to < 0) ?
				Math.min(nextValue, animationObj.to) :
				Math.max(nextValue, animationObj.to);

			animationObj.setter(nextValue);
			if (animationObj.timeSinceStart > animationObj.time) {
				// remove this animation as it ran its full time
				// if has callback, call it
				if (this.animationObjs[i].callback) {
					this.animationObjs[i].callback();
				}
				this.animationObjs.splice(i, 1); // remove obj from list
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
     * @param {Function} getter function to get current
	 * value of the animated prop
     * @param {Function} setter function to
	 * set new current value of the animated prop
     * @param {float} time time to complete the animation
     * @param {Function} callback callback after the animation is done
     * @return {animationObj} from: any; to: any; getter:
	 * any; setter: any; time: any;
     *  callback: any; timeSinceStart: number;
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

	deteleAnimation(animationObj, runCallback) {
		// TODO this runs in O(n), restructure to a map probably to make this O(1)
		const animationIndex = this.animationObjs.findIndex(animationObj);

		// if asked to still run the callback
		if (runCallback && this.animationObjs[animationIndex].callback) {
			this.animationObjs[animationIndex].callback();
		}

		// remove this object from the animation list early
		this.animationObjs.splice(animationIndex, 1);
	}
}

// instantiate a singleton instance
new Animator();