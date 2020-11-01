/** 
 * Animation - class that stores the animation information
 */

class Animation{
    /**
    * @constructor
    * @param animationID - ID of the animation 
    */

    constructor(scene,animationID){
        this.scene = scene;
        this.animationID = animationID;

        this.startTime = 0;
        this.endTime = 0;
        this.elapsedTime = 0;
        this.lastTime = 0;

        this.ended = false;

    }

    update(currentTime){}

    apply(){}
    
    
}
