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
        if(customId == 501){
            obj.pick()
            this.orchestrator.undo()
        } 
        else if(customId == 502){
            obj.pick()
            this.orchestrator.reset()
        }
        else if(customId == 503){
            if(obj.getText() == "Pause") obj.changeButtonText("Play")
            else if(obj.getText() == "Play") obj.changeButtonText("Pause")
            obj.pick()
            this.orchestrator.pause()
        } 
        else if(customId == 504){
            console.log("replay")
            //game movie
        }
        else if(customId == 505){
            console.log("restart")
            //same as reset, goes back to init
        }
    }

    /**
     * @abstract
     */
    animationEnd(time){
        
    }
 }