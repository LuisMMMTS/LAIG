class ChooseState extends GameState{
    constructor(orchestrator){
        super(orchestrator)
        //highligh the enemys pieces 

    pieceCoords=[this.gameBoard.previousObj.id%this.gameBoard.Board.side, Math.floor(this.gameBoard.previousObj.id/this.gameBoard.Board.side)];
    this.pickable=this.orchestrator.prolog.getPieceMovesRequest(this.orchestrator.gameBoard, this.orchestrator.currentPlayer, pieceCoords);
    }
    /**
     * Checks if the next choosen piece is valid and if so creates the pieces animations and goes to animation state
     * If the same piece is selected goes, unpicks the piece and goes back to ready State
     * If it is not valid remains in choose state
     * @param {*} obj 
     * @param {*} customId 
     */

    pickPiece(obj, customId){
        if (obj == this.gameBoard.previousObj){//se a peça selecionada for a que já havia sido selecionada antes
            obj.pick();
            this.orchestrator.changeState(new ReadyState(this.orchestrator))
        }
        if(this.pickable.find([j.id % this.orchestrator.gameBoard.side, Math.floor(obj.id/this.orchestrator.gameBoard.side)]) != undefined){//se a peça selecionada for válida
            var move = new GameMove(this.scene,this.previousObj,obj, this.gameBoard.tiles[this.previousPick-1], this.gameBoard.tiles[customId-1], this.gameBoard);
            this.orchestrator.gameSequence.addGameMove(move);
            this.orchestrator.previousObj.createAnimation(this.gameBoard.tiles[this.previousPick-1],this.gameBoard.tiles[customId-1])//creates animation of first piece. custom id is the id of the last picked piece
            obj.createAnimation(this.gameBoard.tiles[customId-1], this.gameBoard.tiles[this.previousPick-1])
            this.previousPick = null;
            this.orchestrator.changeState(new AnimationState())
        }
        
    }

    animationEnd(){
        return;
    }
}