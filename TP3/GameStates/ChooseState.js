class ChooseState extends GameState{
    constructor(orchestrator){
        super(orchestrator)
        //highligh the enemys pieces 
        this.pieceCoords = [this.orchestrator.previousPick % this.orchestrator.gameBoard.side, Math.floor(this.orchestrator.previousPick / this.orchestrator.gameBoard.side)];
        this.orchestrator.prolog.getPieceMovesRequest(this.orchestrator.gameBoard, this.orchestrator.currentPlayer, this.pieceCoords);
    }
    handleReply(response){
        this.pickable = response;
        console.log(this.pickable)
    }


    /**
     * Checks if the next choosen piece is valid and if so creates the pieces animations and goes to animation state
     * If the same piece is selected goes, unpicks the piece and goes back to ready State
     * If it is not valid remains in choose state
     * @param {*} obj 
     * @param {*} customId 
     */

    pickPiece(obj, customId){
        if (obj == this.orchestrator.previousObj){//se a peça selecionada for a que já havia sido selecionada antes
            obj.pick();
            this.orchestrator.changeState(new ReadyState(this.orchestrator))
        }
        if(obj.player == this.orchestrator.currentPlayer) return;
        let picked = [customId % this.orchestrator.gameBoard.side, Math.floor(customId/this.orchestrator.gameBoard.side), ""]
        console.log(this.pickable)
        console.log(picked)
        console.log(searchForArray(picked,this.pickable))
        if((searchForArray(picked, this.pickable) != -1)||(searchForArray([customId % this.orchestrator.gameBoard.side, Math.floor(customId/this.orchestrator.gameBoard.side)], this.pickable) != -1)){//se a peça selecionada for válida
            obj.pick()
            console.log("hi")
            var move = new GameMove(this.scene,this.previousObj,obj, this.gameBoard.tiles[this.previousPick-1], this.gameBoard.tiles[customId-1], this.gameBoard);
            this.orchestrator.gameSequence.addGameMove(move);
            this.orchestrator.previousObj.createAnimation(this.gameBoard.tiles[this.previousPick-1],this.gameBoard.tiles[customId-1])//creates animation of first piece. custom id is the id of the last picked piece
            obj.createAnimation(this.gameBoard.tiles[customId-1], this.gameBoard.tiles[this.previousPick-1])
            this.orchestrator.finalPick = customId
            this.orchestrator.finalObj = obj
            this.orchestrator.finalTile = obj.tile
            this.orchestrator.changeState(new AnimationState())
        }
        
    }

    animationEnd(time){
        return;
    }
}