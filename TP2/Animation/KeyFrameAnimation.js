/** 
 * KeyFrameAnimation - class that stores the node information
 */

class KeyFrameAnimation extends Animation{
    /**
    * @constructor
    * @param animationID - ID of the animation 
    */

    constructor(scene,animationID){
        super(scene, animationID);
        this.keyframes = [];

    }
    
    addKeyFrame(keyFrame){
        this.keyframes.push(keyFrame);
        //to make sure it's in ascending time order
        //this.keyframes.sort(function(a, b){return a.instant - b.instant});
    }

    update(currentTime){

    }

    apply(){
        
    }
    
    
}