class CheckGameOverState extends GameState{
    constructor(orchestrator){
        super(orchestrator)

        this.orchestrator.prolog.getcurrentscore(this.orchestrator.gameBoard,"black")
        this.orchestrator.prolog.getcurrentscore(this.orchestrator.gameBoard,"white")
        //checkGameOver
        this.aux = 1
    }

    handleReply(response){
        if(aux <=2) this.orchestrator.updateScore(this.aux,response)
        else this.checkGameOver(response)
        this.aux++
        
    }

    checkGameOver(response){
        //if response is null goes back to ready state
        //if there is a winner goes to gameover state
    }

    pickPiece(){
        return;
    }

    animationEnd(time){
        return; 
    }
    

}