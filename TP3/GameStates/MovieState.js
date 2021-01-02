


class MovieState extends GameState{
    constructor(orchestrator){
        super(orchestrator) 
    }

    init(){
        if(!this.orchestrator.playingMovie)
            this.orchestrator.gameMovie()
    
        this.orchestrator.updateInfo("Playing game movie")
        this.orchestrator.updateErrors("")
        //se calhar mudar para uma top view
        endavailableButtons(this.orchestrator, ["Pause","Play", "Main Menu", "Restart"])
    }

    handleReply(response){}

    pickButton(obj, customId){
        if(customId == 505){//play/pause
            obj.pick()
            console.log("replay")
            if(obj.getText() == "Pause") obj.changeButtonText("Play")
            else if(obj.getText() == "Play") obj.changeButtonText("Pause")
            this.orchestrator.pause()
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
        if(!this.orchestrator.playingMovie) return
        let move = this.orchestrator.gameSequence.getCurrentMove()
        console.log(this.orchestrator.prolog.gameBoardtoString(this.orchestrator.gameBoard))
        console.log(this.orchestrator.playingMovie)
        if(move){
            this.orchestrator.previousObj = move.origin.piece;
            this.orchestrator.finalObj = move.destination.piece;
            this.orchestrator.initialTile = move.origin
            this.orchestrator.finalTile = move.destination
            move.origin.piece.createAnimation(move.origin, move.destination)
            move.destination.piece.createAnimation(move.destination, move.origin)
            this.orchestrator.gameSequence.updateCurrentMove()
            this.orchestrator.changeState(new AnimationState(this.orchestrator))
        }
        else{
            this.orchestrator.playingMovie = false
            this.orchestrator.endMenu.replay.changeButtonText("Play Movie")
            this.orchestrator.changeState(new GameOverState(this.orchestrator))
        } 
        
        return;
    }


}