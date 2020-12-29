/** 
 * CameraAnimation - class that stores the keyframe animation information
 */

class AnimationCamera extends CGFcamera{
    constructor(orchestrator, far, fov, near, position, target){
        super(fov,near, far, position, target)

        this.orchestrator = orchestrator
        this.animationTime = 2.5
        this.elapsedTime = 0
        this.lastTime = 0
        this.angle = 0
        this.active = false


    }

    activateCamera(){
        this.elapsedTime = 0
        this.angle = 0
        this.lastTime = 0
        this.active = true
    }


    update(currentTime){
        
        if(this.active){
            if (this.lastTime == 0){
                this.lastTime = currentTime;
            }
            this.elapsedTime += (currentTime - this.lastTime)
            if(this.elapsedTime >= this.animationTime){
                this.orbit(CGFcameraAxis.Y, Math.PI*2 - this.angle)
                this.active = false
                return
            }

            let interpolationAmount = Math.min(this.elapsedTime/this.animationTime,1)
            let easingFactor = easeInOutCubic(interpolationAmount)

            let i = Math.PI *2* easingFactor - this.angle

            this.orbit(CGFcameraAxis.Y, i)
            this.angle += i
        }
      
    }
    
}