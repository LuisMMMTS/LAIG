class GameOverState extends GameState{
    constructor(orchestrator){
        super(orchestrator)
    }

    init(){
        this.orchestrator.updatePlayTime(0)
        this.orchestrator.prolog.getWinner(this.orchestrator.gameBoard, this.orchestrator.currentPlayer)
        this.orchestrator.updateErrors("")
        endavailableButtons(this.orchestrator, ["Play Movie", "Main Menu", "Restart"]) 
    }

    handleReply(response) {
        this.winner = response;
        let winner = null
        if(this.winner == "black") winner = "1"
        else if(this.winner == "white") winner = "2"

        this.orchestrator.updateInfo("Player "+ winner + " won")

    }

    pickButton(obj, customId){
        if(customId == 505){//play movie
            obj.pick()
            console.log("replay")
            obj.changeButtonText("Pause")
            this.orchestrator.changeState(new MovieState(this.orchestrator))
        } 
        else if(customId == 506){//restart game
            console.log("restart")
            obj.pick()
            this.orchestrator.restart()
        }
        else if(customId == 507){//new game
            obj.pick()
            console.log("reset")
            this.orchestrator.reset()
        }
        else return
    }

    animationEnd(time){
        return; 
    }
    
    checkTimeOut(time){}
}