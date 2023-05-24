class Animator{    
    static instance = null;
    constructor(){
        if(instance === null){
            instance = this;
        }
        else{
            console.error("DON'T CREATE ANIMATOR OBJECTS YOURSELF!!! Use Animator.instance to access the Animator object!!!");
        }

        this.animationObjs = [];
        
        // set up interval
        this.animationIntervalDelay = 10; // ms
        this.animationInterval = null;
    }

    #startAnimationInterval(){
        // clear interval if there is already one
        if(this.animationInterval !== null){
            clearInterval(this.animationInterval);
        }
        // make new interval
        this.animationInterval = setInterval(this.whenAnimationInterval, this.animationIntervalDelay);
    }
    
    #whenAnimationInterval(){
        // what happens every animation interval, run backwards so we can splice items out of it
        for (let i = this.animationObjs.length - 1; i >= 0; i--) {
            //increment the timer inside the animation
            animationObj.timeSinceStart += this.animationIntervalDelay;
            const animationObj = this.animationObjs[i];
            // process the animation object
            const nextValue = ((animationObj.to - animationObj.from)/animationObj.time) * animationObj.timeSinceStart;
            animationObj.setter(nextValue);
            if(animationObj.timeSinceStart > animationObj.time){
                // remove this animation as it ran its full time
                this.animationObjs.splice(i, 1); // remove obj from list
            }
        }
    }

    // add a new animation object that will take the animation from `from` value to the `to` value
    addAnimation(from, to, getter, setter, time){
        const animationObj = {
            from: from,
            to: to,
            getter: getter,
            setter: setter,
            time: time,
            timeSinceStart: 0
        }
        this.animationObjs.push(animationObj);
    }
}

// instantiate a singleton instance
new Animator();