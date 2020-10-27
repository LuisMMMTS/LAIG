/** 
 * Animation - class that stores the node information
 */

class Animation{
    /**
    * @constructor
    * @param animationID - ID of the animation 
    */

    constructor(scene,animationID){
        this.scene = scene;
        this.animationID= animationID;
        this.startTime = 0;
        this.endTime = 0;
        this.startTransformation = mat4.create();
        this.endTransformation = mat4.create();


    }

    update(currentTime){

    }

    apply(){

    }
    
    
}
