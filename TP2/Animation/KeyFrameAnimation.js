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
        this.instant = 0;
        this.keyframes = [];

    }

    addKeyFrame(keyFrame){
        //acho q temos que ordenar
        this.keyframes.push(keyFrame);
    }

    update(currentTime){

    }

    apply(){
        
    }
    
    
}