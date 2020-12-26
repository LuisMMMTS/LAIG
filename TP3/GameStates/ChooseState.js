class ChooseState extends GameState {
    constructor(orchestrator) {
        super(orchestrator)
        //highligh the enemys pieces 
        this.pieceCoords = [Math.floor((this.orchestrator.previousPick - 1) / this.orchestrator.gameBoard.side), (this.orchestrator.previousPick - 1) % this.orchestrator.gameBoard.side];
        this.orchestrator.prolog.getPieceMovesRequest(this.orchestrator.gameBoard, this.orchestrator.currentPlayer, this.pieceCoords);
        this.orchestrator.updateInfo("Choose one of your oponnent pieces")
        this.orchestrator.updateErrors("")
    }
    handleReply(response) {
        this.pickable = response;
    }


    /**
     * Checks if the next choosen piece is valid and if so creates the pieces animations and goes to animation state
     * If the same piece is selected goes, unpicks the piece and goes back to ready State
     * If it is not valid remains in choose state
     * @param {*} obj 
     * @param {*} customId 
     */

    pickPiece(obj, customId) {
        if (obj == this.orchestrator.previousObj) {//se a peça selecionada for a que já havia sido selecionada antes
            obj.pick();
            this.orchestrator.updateErrors("Unpicked previous choosen piece")
            this.orchestrator.changeState(new ReadyState(this.orchestrator))
            return;
        }
        if (obj.player == this.orchestrator.currentPlayer) return; //not allowed move
        this.x = Math.floor((customId - 1) / this.orchestrator.gameBoard.side);
        this.y = (customId - 1) % this.orchestrator.gameBoard.side;
        let comparableArray = [this.x, this.y, ""];
        let comparableArray2 = [this.x, this.y];

        console.log(comparableArray)
        if(obj.player == this.orchestrator.currentPlayer){
            this.orchestrator.updateErrors("Can't choose your own piece, choose one of your oponents")
            return;
        } 
        if ((searchForArray(this.pickable, comparableArray) != -1) || (searchForArray(this.pickable, comparableArray2) != -1)) {//se a peça selecionada for válida
            obj.pick()
            console.log("hi")
            var move = new GameMove(this.scene, this.previousObj, obj, this.orchestrator.gameBoard.tiles[this.previousPick - 1], this.orchestrator.gameBoard.tiles[customId - 1], this.orchestrator.gameBoard);
            this.orchestrator.gameSequence.addGameMove(move);
            this.orchestrator.previousObj.createAnimation(this.orchestrator.gameBoard.tiles[this.orchestrator.previousPick - 1], this.orchestrator.gameBoard.tiles[customId - 1]);//creates animation of first piece. custom id is the id of the last picked piece
            obj.createAnimation(this.orchestrator.gameBoard.tiles[customId - 1], this.orchestrator.gameBoard.tiles[this.orchestrator.previousPick - 1]);
            this.orchestrator.finalPick = customId;
            this.orchestrator.finalObj = obj;
            this.orchestrator.finalTile = obj.tile;
            
            this.orchestrator.changeState(new AnimationState(this.orchestrator))
        }
        else{
            this.orchestrator.updateErrors("This piece does not answer to the rule that you need to increase your piece value.")
        }
        
    }

    animationEnd(time) {
        return;
    }
}