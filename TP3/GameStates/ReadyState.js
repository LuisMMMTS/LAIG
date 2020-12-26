


class ReadyState extends GameState{
    constructor(orchestrator){
        super(orchestrator)
        this.orchestrator.prolog.getMovablePiecesResquest(this.orchestrator.gameBoard, this.orchestrator.currentPlayer);
        this.orchestrator.updateInfo("Choose one of your pieces")
    }
    handleReply(response){
        this.pickable = response;
    }

    /**
     * Verifies if the tile can be picked, if so goes to Choose next piece state
     * @param {*} obj 
     * @param {*} customId 
     */
    pickPiece(obj, customId){   
        /*In this state player can only choose a piece that belongs to him */
        if(this.orchestrator.currentPlayer != obj.player){
            console.log("Can't choose this piece, this belongs to the other player")
            return;
        } 
        
        this.x = customId % this.orchestrator.gameBoard.side;
        this.y = Math.floor(customId / this.orchestrator.gameBoard.side);
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
    animationEnd(time){
        return;
    }

    
}