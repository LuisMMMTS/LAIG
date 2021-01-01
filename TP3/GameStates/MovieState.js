


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
        console.log(this.orchestrator.gameSequence.moves)
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
            this.orchestrator.previousObj = move.startPiece;
            this.orchestrator.finalObj = move.endPiece;

            move.startPiece.createAnimation(move.origin, move.destination)
            move.endPiece.createAnimation(move.destination, move.origin)
            this.orchestrator.gameSequence.updateCurrentMove()
            this.orchestrator.changeState(new AnimationState(this.orchestrator))
        }
        else{
            this.orchestrator.playingMovie = false
            this.orchestrator.changeState(new GameOverState(this.orchestrator))
        } 
        
        return;
    }

    checkTimeOut(time){
        
    }
}