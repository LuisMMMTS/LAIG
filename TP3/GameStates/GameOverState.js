class GameOverState extends GameState{
    constructor(orchestrator){
        super(orchestrator)
        
        this.orchestrator.prolog.getWinner(this.orchestrator.gameBoard, this.orchestrator.currentPlayer)
        console.log("hello")
    }
    handleReply(response) {
        this.winner = response;

    }

    pickPiece(obj, customId){
        return;
    }

    animationEnd(time){
        return; 
    }
    

}