/**
 * 
 */
class AnimationState extends GameState{
    constructor(orchestrator){
        super(orchestrator)
        this.orchestrator.updateInfo("Moving Pieces")
        this.orchestrator.updateErrors("")
    }


    pickPiece(obj, customId){
        return;
    }

    animationEnd(time){
        this.orchestrator.previousObj.update(time)
        this.orchestrator.finalObj.update(time)

        if(this.orchestrator.previousObj.animation.active){
            if(this.orchestrator.previousObj.animation.ended){
                this.orchestrator.previousObj.pick()
            }
        } 
                
        if(this.orchestrator.finalObj.animation.active){
            if(this.orchestrator.finalObj.animation.ended){
                this.orchestrator.finalObj.pick()
            }
        } 
        if (this.orchestrator.previousObj.animation.ended && this.orchestrator.finalObj.animation.ended){
            this.orchestrator.previousObj.animation = null
            this.orchestrator.finalObj.animation = null
            this.orchestrator.gameBoard.switchTiles(this.orchestrator.startTile,this.orchestrator.finalTile);

            this.orchestrator.changeState(new CheckGameOverState(this.orchestrator));
        }

    }
    

}