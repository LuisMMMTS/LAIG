


class MovieState extends GameState{
    constructor(orchestrator){
        super(orchestrator)
        console.log("going to movie")  
    }

    init(){
        if(!this.orchestrator.playingMovie){
            this.orchestrator.playingMovie = true
            this.orchestrator.gameMovie()
        }
        
        this.orchestrator.updateInfo("Playing game movie")
        this.orchestrator.updateErrors("")
        //se calhar mudar para uma top view
    }

    handleReply(response){}

    /**
     * Verifies if the tile can be picked, if so goes to Choose next piece state
     * @param {*} obj 
     * @param {*} customId 
     */
    pickPiece(obj, customId){}



    animationEnd(time){
        let move = this.orchestrator.gameSequence.getCurrentMove()
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
            console.log(this.orchestrator.gameBoard)
            this.orchestrator.changeState(new GameOverState(this.orchestrator))
        } 
        
        return;
    }

    checkTimeOut(time){
        
    }
}