/**
 * @abstract
 */

 class GameState{
    constructor(orchestrator){
        this.orchestrator = orchestrator;
    }

    /**
     * @abstract
     */
    init(){}

    /**
     * @abstract
     */
    handleReply(response){}

    
    pickPiece(obj, customId){}

    pickButton(obj, customId){}

    animationEnd(time){}

    checkTimeOut(time){}

 }