


class ReadyState extends GameState{
    constructor(orchestrator){
        super(orchestrator)
        
    }

    init(){
        this.orchestrator.prolog.getMovablePiecesResquest(this.orchestrator.gameBoard, this.orchestrator.currentPlayer);
        this.orchestrator.updateInfo("Choose one of your pieces")
        this.orchestrator.updateErrors("")
    }

    handleReply(response){
        unColorTiles(this.orchestrator);
        this.pickable = response;
        colorTiles(this.orchestrator, response)
    }

    /**
     * Verifies if the tile can be picked, if so goes to Choose next piece state
     * @param {*} obj 
     * @param {*} customId 
     */
    pickPiece(obj, customId){   
        if(this.orchestrator.currentPlayer != obj.player){ /*In this state player can only choose a piece that belongs to him */
            this.orchestrator.updateErrors("Can't choose this piece, this belongs to the other player")
            return;
        } 

        this.x = Math.floor((customId-1) / this.orchestrator.gameBoard.side);
        this.y = (customId-1) % this.orchestrator.gameBoard.side;

        let comparableArray = [this.x,this.y,""];
        let comparableArray2 = [this.x,this.y];

        console.log(comparableArray)    
        console.log(this.pickable)
        
        if((searchForArray(this.pickable,comparableArray) != -1)||(searchForArray(this.pickable,comparableArray2)!=-1)){
            obj.pick();
            this.orchestrator.previousPick = customId;
            this.orchestrator.previousObj = obj;
            this.orchestrator.startTile = obj.tile;
            this.orchestrator.changeState(new ChooseState(this.orchestrator))
        }
    }

    pickButton(obj, customId){
        if(customId == 501){

            obj.pick()
            let move = this.orchestrator.gameSequence.getLastMove()
            if(move == -1){
                this.orchestrator.updateErrors("No more plays to undo")
                return
            }

            this.orchestrator.previousObj = move.endPiece;
            this.orchestrator.finalObj=move.startPiece;

            move.startPiece.floating()
            move.endPiece.floating()
            move.startPiece.createAnimation(move.endPiece.tile, move.startPiece.tile)
            move.endPiece.createAnimation(move.startPiece.tile, move.endPiece.tile)
            this.orchestrator.undo()
            this.orchestrator.changeState(new AnimationState(this.orchestrator))

        } 
        else if(customId == 502){
            obj.pick()
            this.orchestrator.reset()
        }
        else if(customId == 503){
            if(obj.getText() == "Pause") obj.changeButtonText("Play")
            else if(obj.getText() == "Play") obj.changeButtonText("Pause")
            obj.pick()
            this.orchestrator.pause()
        } 
        return
    }

    animationEnd(time){
        return;
    }

    checkTimeOut(time){
        this.orchestrator.timeLeft -= (time - this.orchestrator.lastTime)
        
        if(this.orchestrator.timeLeft < 0){
            this.orchestrator.updateErrors("You just lost your turn")
            this.orchestrator.updatePlayTime(0)
            this.orchestrator.changePlayer()
            this.orchestrator.changeState(new ReadyState(this.orchestrator))
        }
        else this.orchestrator.updatePlayTime((this.orchestrator.timeLeft).toFixed(2))
    }
}