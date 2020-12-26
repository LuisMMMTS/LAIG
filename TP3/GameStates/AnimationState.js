/**
 * 
 */
class AnimationState extends GameState{
    constructor(orchestrator){
        super(orchestrator)
    }


    pickPiece(){
        return;
    }

    animationEnd(time){
        //fazer as mudanças necessarias nas peças
        //verificar se terminou o jogo --> se sim, gameOver State
        this.previousObj.update(time)
        this.finalObj.update(time)

        if(this.orchestrator.previousObj.animation.active){
            if(this.orchestrator.previousObj.animation.ended){
                this.orchestrator.previousObj.active = false
                this.orchestrator.gameBoard.addPieceToTile(this.orchestrator.previousObj, this.orchestrator.finalTile)
                console.log("added initial piece to final tile")
                this.previousObj.pick()
            }
        } 
                
        if(this.orchestrator.finalObj.animation.active){
            if(this.orchestrator.finalObj.animation.ended){
                this.orchestrator.finalObj.active = false
                this.orchestrator.gameBoard.addPieceToTile(this.orchestrator.finalObj, this.orchestrator.initialTile)
                console.log("added final piece to initial tile")
                this.finalObj.pick()
            }
        } 
        
        this.orchestrator.changeState(new ReadyState(this.orchestrator))//maybe here should be checking if game is over
    }
    

}