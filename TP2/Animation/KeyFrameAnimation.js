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
        this.animationMatrix = this.startTransformation;
    }

    addKeyFrame(keyFrame){
        let axisCoords = this.scene.graph.axisCoords;

        this.keyframes.push(keyFrame);
        
        //to make sure it's in ascending time order
        this.keyframes.sort(function(a, b){return a.instant - b.instant});

        if(keyFrame.instant > this.endTime){
            this.endTime = keyFrame.instant;
        }
    }

    update(currentTime){
        if(this.ended)//if animation reached the end, return
            return;

        this.animationMatrix = mat4.create();
        
        //update deltaT based on lastTime and update lastTime
        this.elapsedTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        
        //update sumT based on deltaT

        let keyframeStartInstant = 0, keyframeEndInstant = 0;
        let keyframeStartIndex = 0, keyframeEndIndex = 0;
        
        //
        for(let i = 0; i < this.keyframes.length; i++){
            if(this.keyframes[i].instant < this.elapsedTime){//we can do this because its ordered
                keyframeStartInstant = this.keyframes[i].instant;
                keyframeStartIndex = i;
            }
            else if (this.keyframes[i].instant >this.elapsedTime){
                keyframeEndInstant = this.keyframes[i].instant;
                keyframeEndIndex = i;
            }
            else if(this.keyframes[i].instant == this.elapsedTime){// no need interpolation, its in a matching keyframe instant
                mat4.translate(this.animationMatrix, this.animationMatrix, this.keyframes[i].translation);
                mat4.rotate(this.animationMatrix,this.animationMatrix,this.keyframes[i].rotation[0],axisCoords['x']);
                mat4.rotate(this.animationMatrix,this.animationMatrix,this.keyframes[i].rotation[1],axisCoords['y']);
                mat4.rotate(this.animationMatrix,this.animationMatrix,this.keyframes[i].rotation[2],axisCoords['z']);
                mat4.scale(this.animationMatrix, this.animationMatrix, this.keyframes[i].scale);
                return;
            }
        }

        /* INTERPOLATION */

        //End of animation 
        if(this.elapsedTime >= this.endTime){
            this.ended = true;
        }


        //It's not the end so we need to do interpolation
        let interpolationAmount = (this.elapsedTime - keyframeStartInstant) / keyframeEndInstant ;
        
        let trans = new vec3();
        let rot = new vec3();
        let sc = new vec3();

        lerp(trans,this.keyframes[keyframeStartIndex].translation, this.keyframes[keyframeEndIndex].translation,interpolationAmount);
        mat4.translate(this.animationMatrix, this.animationMatrix, trans);
        lerp(rot,this.keyframes[keyframeStartIndex].rotation, this.keyframes[keyframeEndIndex].rotation,interpolationAmount);
        mat4.rotate(this.animationMatrix, this.animationMatrix, rot);
        lerp(rot,this.keyframes[keyframeStartIndex].scale, this.keyframes[keyframeEndIndex].scale,interpolationAmount);
        mat4.scale(this.animationMatrix, this.animationMatrix, sc);


    }

    apply(){
        this.scene.multMatrix(this.animationMatrix);//apply animation
    }
    
    
}