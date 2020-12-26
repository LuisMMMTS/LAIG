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
        this.orchestrator.previousObj.update(time)
        this.orchestrator.finalObj.update(time)
        //console.log("Anumation ended?");
        if(this.orchestrator.previousObj.animation.active){
            console.log("Anumation 1 is active");
            if(this.orchestrator.previousObj.animation.ended){
                console.log("Anumation 1 is ended");
                this.orchestrator.previousObj.active = false
                //this.orchestrator.gameBoard.addPieceToTile(this.orchestrator.previousObj, this.orchestrator.finalTile)
                console.log("added initial piece to final tile")
                this.orchestrator.previousObj.pick()
            }
        } 

        if(this.orchestrator.finalObj.animation.active){
            //console.log("Anumation 2 is active");
            if(this.orchestrator.finalObj.animation.ended){
                console.log("Anumation 2 is ended");
                this.orchestrator.finalObj.active = false
                //this.orchestrator.gameBoard.addPieceToTile(this.orchestrator.finalObj, this.orchestrator.startTile)
                console.log("added final piece to initial tile")
                this.orchestrator.finalObj.pick()
            }
        } 
        if (this.orchestrator.previousObj.animation.ended && this.orchestrator.finalObj.animation.ended){
            this.orchestrator.changeState(new ReadyState(this.orchestrator));//maybe here should be checking if game is over
            //this.orchestrator.prolog.getWinner(this.orchestrator.gameBoard, this.orchestrator.currentPlayer);
        }
    }
    

}