class GameOverState extends GameState{
    constructor(orchestrator){
        super(orchestrator)
    }

    init(){
        this.orchestrator.updatePlayTime(0)
        this.orchestrator.prolog.getWinner(this.orchestrator.gameBoard, this.orchestrator.currentPlayer)
        
        this.orchestrator.updateErrors("")
        console.log("hello")
        return;
    }

    handleReply(response) {
        this.winner = response;
        let winner = null
        if(this.winner == "black") winner = "1"
        else if(this.winner == "white") winner = "2"

        this.orchestrator.updateInfo("Player "+ winner + " won")

    }

    pickPiece(obj, customId){
        return;
    }

    pickButton(obj, customId){
        if(customId == 505){
            //replay 
            console.log("replay")
            this.orchestrator.changeState(new MovieState(this.orchestrator))
        } 
        else if(customId == 506){
            //restart
            console.log("restart")
            this.orchestrator.reset()
        }
        
        return
    }

    animationEnd(time){
        return; 
    }
    
    checkTimeOut(time){}
}