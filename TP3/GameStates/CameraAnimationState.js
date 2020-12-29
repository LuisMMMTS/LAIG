/**
 * 
 */
class CameraAnimationState extends GameState{
    constructor(orchestrator){
        super(orchestrator)
        this.orchestrator.updateInfo("")
        this.orchestrator.updateErrors("")
        this.orchestrator.updatePlayTime(0)
        this.orchestrator.scene.animateCamera()
        
    }


    init(){
        unColorTiles(this.orchestrator);
        return;
    }


    pickPiece(obj, customId){
        return;
    }

    pickButton(obj, customId){
         return
    }

    animationEnd(time){

        if(this.orchestrator.scene.getCurrentCamera() == this.orchestrator.scene.getDefaultCamera()){
            if(this.orchestrator.scene.camera.active)
                this.orchestrator.scene.camera.update(time)

            if(this.orchestrator.scene.camera.active == false){
                this.orchestrator.changeState(new ReadyState(this.orchestrator));
            }
        }
            
        
    }

    checkTimeOut(time){}
    

}