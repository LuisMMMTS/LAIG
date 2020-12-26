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
            this.orchestrator.previousObj.animation=null
            this.orchestrator.finalObj.animation=null
            this.orchestrator.gameBoard.switchTiles(this.orchestrator.startTile,this.orchestrator.finalTile);
        
            //this.orchestrator.prolog.getWinner(this.orchestrator.gameBoard, this.orchestrator.currentPlayer);


            this.orchestrator.changePlayer();//switchplayer?

            this.orchestrator.changeState(new ReadyState(this.orchestrator));//maybe here should be checking if game is over
        }
    }
    

}