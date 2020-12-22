


class ReadyState extends GameState{
    constructor(orchestrator){
        super(orchestrator)
        this.orchestrator.prolog.getMovablePiecesResquest(this.orchestrator.gameBoard, this.orchestrator.currentPlayer);
        
    }
    handleReply(response){
        this.pickable = response;
        console.log(this.pickable)
    }

    /**
     * Verifies if the tile can be picked, if so goes to Choose next piece state
     * @param {*} obj 
     * @param {*} customId 
     */
    pickPiece(obj, customId){
        this.x = customId % this.orchestrator.gameBoard.side;
        this.y = Math.floor(customId / this.orchestrator.gameBoard.side);
        let comparableArray = [(this.x).toString(10),(this.y).toString(10),""];
        console.log(comparableArray)
        if(this.pickable.find(comparableArray) != undefined){
            this.orchestrator.previousPick = customId;
            this.orchestrator.previousObj = obj;
            obj.pick();
            this.orchestrator.changeState(new ChooseState(this.orchestrator))
        }
    }

    animationEnd(){
        return;
    }
}