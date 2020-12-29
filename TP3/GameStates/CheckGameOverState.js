class CheckGameOverState extends GameState{
    constructor(orchestrator){
        super(orchestrator)
    }

    init(){
        this.orchestrator.updatePlayTime(0)
        /* Update score */
        this.orchestrator.prolog.getcurrentscore(this.orchestrator.gameBoard,"black")
        this.orchestrator.prolog.getcurrentscore(this.orchestrator.gameBoard,"white")
        this.orchestrator.prolog.getGameOver(this.orchestrator.gameBoard,this.orchestrator.currentPlayer)//check if game is over
        this.aux = 1
        return;
    }

    handleReply(response){
        if(this.aux <=2) this.orchestrator.updateScore(this.aux,response)
        else this.checkGameOver(response)
        this.aux++
    }

    checkGameOver(response){
        console.log("heelo ")
        if(response == ''){ //if response is null goes back to ready state
            this.orchestrator.changePlayer();
            this.orchestrator.changeState(new ReadyState(this.orchestrator))
        }
        else //if there is a winner goes to gameover state
            this.orchestrator.changeState(new GameOverState(this.orchestrator)) 
    }

    pickPiece(obj, customId){
        return;
    }

    pickButton(obj, customId){
        return
    }

    animationEnd(time){
        return; 
    }

    checkTimeOut(time){}
    

}