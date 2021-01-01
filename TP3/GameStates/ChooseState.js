class ChooseState extends GameState {
    constructor(orchestrator) {
        super(orchestrator)

    }

    init(){
        this.pieceCoords = [Math.floor((this.orchestrator.previousPick - 1) / this.orchestrator.gameBoard.size), (this.orchestrator.previousPick - 1) % this.orchestrator.gameBoard.size];
        this.orchestrator.prolog.getPieceMovesRequest(this.orchestrator.gameBoard, this.orchestrator.currentPlayer, this.pieceCoords);

        this.orchestrator.updateInfo("Choose one of your oponnent pieces")
        this.orchestrator.updateErrors("")
        return;
    }

    handleReply(response) {
        unColorTiles(this.orchestrator);
        this.pickable = response;
        colorTiles(this.orchestrator, response) //highligh the enemys pieces 
    }


    /**
     * Checks if the next choosen piece is valid and if so creates the pieces animations and goes to animation state
     * If the same piece is selected goes, unpicks the piece and goes back to ready State
     * If it is not valid remains in choose state
     * @param {*} obj 
     * @param {*} customId 
     */

    pickPiece(obj, customId) {
        if (obj == this.orchestrator.previousObj) { //if the selected piece is the same as the previous one we unselect it
            obj.pick();
            this.orchestrator.updateErrors("Unpicked previous choosen piece")
            this.orchestrator.changeState(new ReadyState(this.orchestrator))
            return;
        }
        if (obj.player == this.orchestrator.currentPlayer){ //trying to choose its own piece
            this.orchestrator.updateErrors("Can't choose your own piece, choose one of your oponents")
            return; 
        } 

        this.x = Math.floor((customId - 1) / this.orchestrator.gameBoard.size);
        this.y = (customId - 1) % this.orchestrator.gameBoard.size;

        let comparableArray = [this.x, this.y, ""];
        let comparableArray2 = [this.x, this.y];

        console.log(comparableArray)
      
        if ((searchForArray(this.pickable, comparableArray) != -1) || (searchForArray(this.pickable, comparableArray2) != -1)) {//se a peça selecionada for válida
            obj.pick()
            
            this.orchestrator.gameSequence.addGameMove(new GameMove(this.orchestrator.scene, this.orchestrator.previousObj, obj, this.orchestrator.gameBoard.tiles[this.orchestrator.previousPick - 1], this.orchestrator.gameBoard.tiles[customId - 1], this.orchestrator.gameBoard));

            this.orchestrator.finalPick = customId;
            this.orchestrator.finalObj = obj;
            this.orchestrator.finalTile = obj.tile;
            let duration = this.orchestrator.previousObj.createAnimation(this.orchestrator.gameBoard.tiles[this.orchestrator.previousPick - 1], this.orchestrator.gameBoard.tiles[customId - 1]);//creates animation of first piece. custom id is the id of the last picked piece
            this.orchestrator.finalObj.createAnimation(this.orchestrator.gameBoard.tiles[customId - 1], this.orchestrator.gameBoard.tiles[this.orchestrator.previousPick - 1],duration);
            
            
            this.orchestrator.changeState(new AnimationState(this.orchestrator))
        }
        else{
            this.orchestrator.updateErrors("This piece does not answer to the rule that you need to increase your piece value.")
        }
        
    }

    pickButton(obj, customId){
        if(customId == 501){
            obj.pick()
            this.orchestrator.previousObj.pick()
            let move = this.orchestrator.gameSequence.getLastMove()

            if(move == -1){
                this.orchestrator.updateErrors("No more moves to undo")
                return
            }

            this.orchestrator.previousObj = move.endPiece;
            this.orchestrator.finalObj = move.startPiece;

            move.startPiece.createAnimation(move.destination, move.origin)
            move.endPiece.createAnimation(move.origin, move.destination)

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
        else this.orchestrator.updateErrors("This button is unavailable in this moment")
        return
    }

    animationEnd(time) {
        return;
    }

    checkTimeOut(time){
        if(this.orchestrator.paused) return
        
        this.orchestrator.timeLeft -= (time - this.orchestrator.lastTime)
        
        if(this.orchestrator.timeLeft < 0){
            this.orchestrator.updateErrors("You just lost your turn")
            this.orchestrator.previousObj.pick()
            this.orchestrator.updatePlayTime(0)
            this.orchestrator.changePlayer()
            this.orchestrator.changeState(new ReadyState(this.orchestrator))
        }
        else this.orchestrator.updatePlayTime((this.orchestrator.timeLeft).toFixed(2))
    }
}