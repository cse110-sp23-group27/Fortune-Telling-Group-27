class Animator{    
    static instance = null;
    constructor(){
        if(Animator.instance === null){
            Animator.instance = this;
        }
        else{
            console.error("DON'T CREATE ANIMATOR OBJECTS YOURSELF!!! Use Animator.instance to access the Animator object!!!");
        }

        this.animationObjs = [];
        
        // set up interval
        this.animationIntervalDelay = 10; // ms
        this.animationInterval = null;
        this.#startAnimationInterval();
    }

    #startAnimationInterval(){
        // clear interval if there is already one
        if(this.animationInterval !== null){
            clearInterval(this.animationInterval);
        }
        // make new interval
        this.animationInterval = setInterval(()=>this.#whenAnimationInterval(), this.animationIntervalDelay);
    }
    
    #whenAnimationInterval(){
        // what happens every animation interval, run backwards so we can splice items out of it
        for (let i = this.animationObjs.length - 1; i >= 0; i--) {
            const animationObj = this.animationObjs[i];
            //increment the timer inside the animation
            animationObj.timeSinceStart += this.animationIntervalDelay;
            // process the animation object
            const nextValue = Math.min(animationObj.from + ((animationObj.to - animationObj.from)/animationObj.time) * animationObj.timeSinceStart, animationObj.to);
            animationObj.setter(nextValue);
            if(animationObj.timeSinceStart > animationObj.time){
                // remove this animation as it ran its full time
                // if has callback, call it
                if(this.animationObjs[i].callback){
                    this.animationObjs[i].callback();
                }
                this.animationObjs.splice(i, 1); // remove obj from list
            }
        }
    }

    // add a new animation object that will take the animation from `from` value to the `to` value
    addAnimation(from, to, getter, setter, time, callback){
        const animationObj = {
            from: from,
            to: to,
            getter: getter,
            setter: setter,
            time: time,
            callback: callback,
            timeSinceStart: 0
        }
        this.animationObjs.push(animationObj);
        return animationObj;
    }

    deteleAnimation(animationObj, runCallback){
        // TODO this runs in O(n), restructure to a map probably to make this O(1)
        const animationIndex = this.animationObjs.findIndex(animationObj);

        // if asked to still run the callback
        if(runCallback && this.animationObjs[animationIndex].callback){
            this.animationObjs[animationIndex].callback();
        }

        // remove this object from the animation list early
        this.animationObjs.splice(animationIndex, 1);
    }
}

// instantiate a singleton instance
new Animator();
