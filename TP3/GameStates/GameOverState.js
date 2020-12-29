class GameOverState extends GameState{
    constructor(orchestrator){
        super(orchestrator)
    }

    init(){
        this.orchestrator.updatePlayTime(0)
        this.orchestrator.prolog.getWinner(this.orchestrator.gameBoard, this.orchestrator.currentPlayer)
        this.orchestrator.updateInfo("Player won")
        console.log("hello")
        return;
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
    
    checkTimeOut(time){}
}