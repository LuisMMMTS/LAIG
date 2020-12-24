/**
 * Este estado so deve deixar fazer cenas basicas na interface 
 */

class LoadingState extends GameState{
    constructor(orchestrator){
        super(orchestrator)
        //asks for board
        this.orchestrator.prolog.boardRequest(3)
    }
    handleReply(response){
        //receives board and saves it on game Orchestrator 
        //this.orchestrator.gameBoard = new Board(this.orchestrator.scene, response)
        this.orchestrator.gameBoard = new Board(this.scene, [["white", "black", "white", "black"], ["black", "white", "black", "white"], ["white", "black", "white", "black"], ["black", "white", "black", "white"]]);
        
        this.orchestrator.changeState(new ReadyState(this.orchestrator))
        console.log("hello")
    }


    /**
     *
     * @param {*} obj 
     * @param {*} customId 
     */

    pickPiece(obj, customId){
        return;   
    }

    animationEnd(time){
        return;
    }
}