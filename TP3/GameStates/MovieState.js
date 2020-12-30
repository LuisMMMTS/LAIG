


class MovieState extends GameState{
    constructor(orchestrator){
        super(orchestrator)
        console.log("going to movie")  
    }

    init(){
        this.orchestrator.resetBoardTiles()
        this.orchestrator.playingMovie = true
        this.orchestrator.updateInfo("Playing game movie")
        this.orchestrator.updateErrors("")
        //reset do tabuleiro para a representaçao inicial
        //this.orchestrator.animator.start()
        //se calhar mudar para uma top view
        this.gameSequence.moveReplay()
        console.log(this.orchestrator.gameSequence.moves)
    }

    handleReply(response){}

    /**
     * Verifies if the tile can be picked, if so goes to Choose next piece state
     * @param {*} obj 
     * @param {*} customId 
     */
    pickPiece(obj, customId){}

    pickButton(obj, customId){}

    animationEnd(time){
        let move = this.gameSequence.getCurrentMove()
        if(move){
            this.orchestrator.previousObj = move.endPiece;
            this.orchestrator.finalObj = move.startPiece;

            move.startPiece.createAnimation(move.origin, move.destination)
            move.endPiece.createAnimation(move.destination, move.origin)
            this.orchestrator.gameSequence.updateCurrentMove() //passa para o proximo move
            this.orchestrator.changeState(new AnimationState(this.orchestrator))
        }
        else this.orchestrator.changeState(new GameOverState(this.orchestrator))
        
        return;
    }

    checkTimeOut(time){
        
    }
}