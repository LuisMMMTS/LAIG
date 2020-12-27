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
    handleReply(response){
        
    }

    /**
     * @abstract
     */
    pickPiece(obj, customId){
       
        
    }

    pickButton(obj, customId){
        if(customId == 501) this.orchestrator.undo()
        else if(customId == 502) this.orchestrator.reset()
        else if(customId == 503) this.orchestrator.quit()
        else if(customId == 504) this.orchestrator.pause()
    }

    /**
     * @abstract
     */
    animationEnd(time){
        
    }
 }