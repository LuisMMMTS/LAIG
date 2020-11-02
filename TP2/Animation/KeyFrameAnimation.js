/** 
 * KeyFrameAnimation - class that stores the keyframe animation information
 */

class KeyFrameAnimation extends Animation{
    /**
    * @constructor
    * @param animationID - ID of the animation 
    */

    constructor(scene,animationID){
        super(scene, animationID);

        this.keyframes = [];
        this.animationTranslation = vec3.create();
        this.animationRotationX = vec3.create();
        this.animationRotationY = vec3.create();
        this.animationRotationZ = vec3.create();
        this.animationScale = vec3.create();
    }

    addKeyFrame(keyFrame){

        this.keyframes.push(keyFrame);
        //to make sure it's in ascending time order
        this.keyframes.sort(function(a, b){return a.instant - b.instant});
        
        this.startTime = this.keyframes[0].instant;
        this.endTime = this.keyframes[this.keyframes.length-1].instant;

    }


    update(currentTime){
    
        
        console.log("current time is "+currentTime);
        console.log("elapsed time is "+this.elapsedTime);


        if(this.ended){//if animation reached the end, return
            console.log("end");
            return;
        }

        //update deltaT based on lastTime and update lastTime
        this.elapsedTime += (currentTime - this.lastTime);
        this.lastTime = currentTime;

        
        //check if the animation should be active
        if(this.elapsedTime < this.startTime && !this.ended){ 
            console.log("not started");
            
            return;
        }
        
        //End of animation 
        if(this.elapsedTime >= this.endTime){
            this.ended = true;
        }
        

        
        //update sumT based on deltaT

        let keyframeStartInstant = 0, keyframeEndInstant = 0;
        let keyframeStartIndex = 0, keyframeEndIndex = 0;
        
        //maybe change this because is not that efficient
        for(let i = 0; i < this.keyframes.length; i++){
            if(this.keyframes[i].instant < this.elapsedTime){//we can do this because its ordered
                keyframeStartInstant = this.keyframes[i].instant;
                keyframeStartIndex = i;
            }
            else if (this.keyframes[i].instant >this.elapsedTime){
                keyframeEndInstant = this.keyframes[i].instant;
                keyframeEndIndex = i;
            }
            else if(this.keyframes[i].instant == this.elapsedTime){// no need for interpolation, its in a matching keyframe instant
                this.animationTranslation=this.keyframes[i].translation;
                this.animationRotationX=new vec3.fromValues(this.keyframes[i].rotation[0],0,0);
                this.animationRotationY=new vec3.fromValues(0,this.keyframes[i].rotation[1],0);
                this.animationRotationZ=new vec3.fromValues(0,0,this.keyframes[i].rotation[2]);
                this.animationScale=this.keyframes[i].scale;
                return;
            }
        }

        /* INTERPOLATION */

        //It's not the end so we need to do interpolation
        let interpolationAmount = (this.elapsedTime - keyframeStartInstant) /(keyframeEndInstant-keyframeStartInstant);

        console.log("translation: "+this.keyframes[keyframeStartIndex].translation);
        console.log("rotation: "+this.keyframes[keyframeStartIndex].rotation);
        console.log("scale: "+this.keyframes[keyframeStartIndex].scale);
        
        vec3.lerp(this.animationTranslation,this.keyframes[keyframeStartIndex].translation, this.keyframes[keyframeEndIndex].translation,interpolationAmount);
        console.log(this.animationRotationX);
        console.log(this.keyframes[keyframeStartIndex].rotation)
        console.log(this.keyframes[keyframeEndIndex].rotation)
        console.log(interpolationAmount);
        vec3.lerp(this.animationRotationX,this.keyframes[keyframeStartIndex].rotation, this.keyframes[keyframeEndIndex].rotation,interpolationAmount);
        // vec3.lerp(this.animationRotationX,this.keyframes[keyframeStartIndex].rotation[0], this.keyframes[keyframeEndIndex].rotation[0],interpolationAmount);
        // vec3.lerp(this.animationRotationY,this.keyframes[keyframeStartIndex].rotation[1], this.keyframes[keyframeEndIndex].rotation[1],interpolationAmount);
        // vec3.lerp(this.animationRotationZ,this.keyframes[keyframeStartIndex].rotation[2], this.keyframes[keyframeEndIndex].rotation[2],interpolationAmount);
        vec3.lerp(this.animationScale,this.keyframes[keyframeStartIndex].scale, this.keyframes[keyframeEndIndex].scale,interpolationAmount);
        
    }

    apply(){
        this.update(new Date().getSeconds());
        this.scene.translate(this.animationTranslation);
        this.scene.rotate(this.animationRotationX[0],1,0,0);
        this.scene.rotate(this.animationRotationY[1],0,1,0);
        this.scene.rotate(this.animationRotationZ[2],0,0,1);
        this.scene.scale(this.animationScale);
    }
    
    
}