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
    pickPiece(){
       
        
    }

    /**
     * @abstract
     */
    animationEnd(time){
        
    }
 }