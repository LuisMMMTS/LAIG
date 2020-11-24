/** 
 * KeyFrameAnimation - class that stores the keyframe animation information
 */

class KeyFrameAnimation extends Animation{
    /**
    * @constructor
    * @param scene - Reference to MyScene object
    * @param animationID - ID of the animation 
    */

    constructor(scene,animationID){
        super(scene, animationID);

        this.keyframes = [];
        
        //variables where the current animation is being stored
        this.animationTranslation = vec3.create();
        this.animationRotation = vec3.create();
        this.animationScale = new vec3.fromValues(1,1,1);
        
        this.startTime = 0;
        this.endTime = 0;
        this.elapsedTime = 0;
        this.lastTime = 0;

        this.active = false;
        this.ended = false; 
    }

    addKeyFrame(keyFrame){

        this.keyframes.push(keyFrame);
        
        //to make sure it's in ascending time order
        this.keyframes.sort(function(a, b){ return a.instant - b.instant });
        
        this.startTime = this.keyframes[0].instant;
        this.endTime = this.keyframes[this.keyframes.length - 1].instant;

    }


    update(currentTime){

        //if animation reached the end, return
        if(this.ended) return;
        
        //update elapsedTime based on lastTime and update lastTime
        this.elapsedTime += (currentTime - this.lastTime);
        this.lastTime = currentTime;

        //check if the keyframe should be active or not
        if(!this.active){
            if(this.elapsedTime >= this.startTime) // only becomes visible after first keyframe instant
                this.active = true;
            else 
                return;
        }

        //check if the animation should be active
        if(this.elapsedTime < this.startTime && !this.ended) return;
       
        //End of animation 
        if(this.elapsedTime >= this.endTime){
            this.ended = true; //the animation has ended but the object remains with the values of the geometric transformations of the  last keyframe
        }
        

        let keyframeStartInstant = 0, keyframeEndInstant = 0, keyframeStartIndex = 0, keyframeEndIndex = 0;
        
        //find the keyframes to interpolate between
        for(let i = 0; i < this.keyframes.length; i++){
            if(this.keyframes[i].instant < this.elapsedTime){ //we can do this because its ordered
                keyframeStartInstant = this.keyframes[i].instant;
                keyframeStartIndex = i;
            }
            else if (this.keyframes[i].instant > this.elapsedTime){
                keyframeEndInstant = this.keyframes[i].instant;
                keyframeEndIndex = i;
                break;
            }
            else if(this.keyframes[i].instant == this.elapsedTime){ // no need for interpolation, its in a matching keyframe instant
                this.animationTranslation = this.keyframes[i].translation;
                this.animationRotation = new vec3.fromValues(this.keyframes[i].rotation[0],this.keyframes[i].rotation[1],this.keyframes[i].rotation[2]);
                this.animationScale = this.keyframes[i].scale;
                return;
            }
        }

        /* INTERPOLATION */

        //It's not the end so we need to do interpolation

        let interpolationAmount = (this.elapsedTime - keyframeStartInstant) / (keyframeEndInstant-keyframeStartInstant);

        vec3.lerp(this.animationTranslation,this.keyframes[keyframeStartIndex].translation, this.keyframes[keyframeEndIndex].translation,interpolationAmount);

        vec3.lerp(this.animationRotation,this.keyframes[keyframeStartIndex].rotation, this.keyframes[keyframeEndIndex].rotation,interpolationAmount);
        
        vec3.lerp(this.animationScale,this.keyframes[keyframeStartIndex].scale, this.keyframes[keyframeEndIndex].scale,interpolationAmount);
        
    }

    apply(){
        
        this.scene.translate(this.animationTranslation[0],this.animationTranslation[1],this.animationTranslation[2]);
        this.scene.rotate(this.animationRotation[0],1,0,0);
        this.scene.rotate(this.animationRotation[1],0,1,0);
        this.scene.rotate(this.animationRotation[2],0,0,1);
        this.scene.scale(this.animationScale[0],this.animationScale[1],this.animationScale[2]); 

    }
    
    
}