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
        this.startTransformation = mat4.create();
        this.endTransformation = mat4.create();
        this.ended = false;

    }

    update(currentTime){
        

    }

    apply(){

    }
    
    
}
