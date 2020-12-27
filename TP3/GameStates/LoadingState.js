/**
 * Este estado so deve deixar fazer cenas basicas na interface 
 */

class LoadingState extends GameState{
    constructor(orchestrator){
        super(orchestrator)
        this.orchestrator.updatePlayTime(0)
        //asks for board
        this.orchestrator.prolog.boardRequest(this.orchestrator.boardSize)
    }
    handleReply(response){
        //receives board and saves it on game Orchestrator 
        //this.orchestrator.gameBoard = new Board(this.orchestrator.scene, response)
        this.orchestrator.gameBoard = new Board(this.scene, [["white", "black", "white", "black"], ["black", "white", "black", "white"], ["white", "black", "white", "black"], ["black", "white", "black", "white"]]);

        this.orchestrator.changeState(new ReadyState(this.orchestrator))
    }


    /**
     *
     * @param {*} obj 
     * @param {*} customId 
     */

    pickPiece(obj, customId){
        return;   
    }

    pickButton(obj, customId){
        return
    }

    animationEnd(time){
        return;
    }

    checkTimeOut(time){}
}