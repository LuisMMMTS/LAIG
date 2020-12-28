/**
 * 
 */
class AnimationState extends GameState{
    constructor(orchestrator){
        super(orchestrator)
        this.orchestrator.updateInfo("Moving Pieces")
        this.orchestrator.updateErrors("")
        this.orchestrator.updatePlayTime(0)
    }

    init(){
        unColorTiles(this.orchestrator);
        return;
    }


    pickPiece(obj, customId){
        return;
    }

    pickButton(obj, customId){
        if(customId == 503){
            if(obj.getText() == "Pause") obj.changeButtonText("Play")
            else if(obj.getText() == "Play") obj.changeButtonText("Pause")
            obj.pick()
            this.orchestrator.pause()
        } 
        else return

    }

    animationEnd(time){
        this.orchestrator.previousObj.update(time)
        this.orchestrator.finalObj.update(time)

        if(this.orchestrator.previousObj.animation.active){
            if(this.orchestrator.previousObj.animation.ended){
                if (this.orchestrator.previousObj.isPicked()) this.orchestrator.previousObj.pick()
                else this.orchestrator.previousObj.floating()
            }
        } 
                
        if(this.orchestrator.finalObj.animation.active){
            if(this.orchestrator.finalObj.animation.ended){
                if(this.orchestrator.finalObj.isPicked()) this.orchestrator.finalObj.pick()
                else this.orchestrator.finalObj.floating()
            }
        } 
        if (this.orchestrator.previousObj.animation.ended && this.orchestrator.finalObj.animation.ended){
            this.orchestrator.previousObj.animation = null
            this.orchestrator.finalObj.animation = null
            console.log(this.orchestrator.startTile)
            console.log(this.orchestrator.finalTile)
            this.orchestrator.gameBoard.switchTiles(this.orchestrator.startTile,this.orchestrator.finalTile);

            this.orchestrator.changeState(new CheckGameOverState(this.orchestrator));
        }

    }

    checkTimeOut(time){}
    

}