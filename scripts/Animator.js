class Animator {
	constructor() {
		this.animationObjs = [];

		// set up interval
		this.animationIntervalDelay = 10; // ms
		this.animationInterval = null;
	}

	startAnimationInterval() {
		// clear interval if there is already one
		if (this.animationInterval !== null) {
			clearInterval(this.animationInterval);
		}
		// make new interval
		this.animationInterval = setInterval(this.whenAnimationInterval, this.animationIntervalDelay);
	}

	whenAnimationInterval() {
		// what happens every animation interval
	}
}
