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
    pickPiece(){
       
        
    }

    animationEnd(time){
        
    }
 }