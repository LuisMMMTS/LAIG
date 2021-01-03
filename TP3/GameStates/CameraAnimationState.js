/**
 * 
 */
class CameraAnimationState extends GameState{
    constructor(orchestrator,destination){
        super(orchestrator)
        this.orchestrator.updateInfo("")
        this.orchestrator.updatePlayTime(0)
        this.orchestrator.scene.animateCamera()
        this.destination=destination;
        this.previousPos=null;
        this.previousTar=null
        this.lastTime=0;
        this.elapsed=0;
        this.active=true;
        
    }

    init(){
        unColorTiles(this.orchestrator);
        if(this.orchestrator.playingMovie) endavailableButtons(this.orchestrator, [])
        else availableButtons(this.orchestrator, [])
    }

    update(time){
        if (this.lastTime==0){
            this.lastTime=time;
            this.previousPos=this.orchestrator.scene.themeGraphs[this.orchestrator.scene.selectedTheme].views[this.destination].position
            this.previousTar=this.orchestrator.scene.themeGraphs[this.orchestrator.scene.selectedTheme].views[this.destination].target
            return;
        }
        this.elapsed+=time-this.lastTime;
      

        if(this.active){
            console.log(this.orchestrator.scene.camera.position);
       
            this.orchestrator.scene.switchCamera(this.orchestrator.scene.themeGraphs[this.orchestrator.scene.selectedTheme].views[this.destination],this.elapsed);
        }
        else{
             this.orchestrator.scene.camera.setPosition([this.previousPos[0],this.previousPos[1],this.previousPos[2]]);
             this.orchestrator.scene.camera.setTarget(this.previousTar);
             this.orchestrator.scene.camera=this.orchestrator.scene.themeGraphs[this.orchestrator.scene.selectedTheme].views[this.destination]
            this.orchestrator.changeState(new ReadyState(this.orchestrator));
        }

    }

}