class CheckGameOverState extends GameState{
    constructor(orchestrator){
        super(orchestrator)
        this.orchestrator.updatePlayTime(0)
    }

    handleReply(response){

    }

    pickPiece(obj, customId){
        return;
    }

    pickButton(obj, customId){
        return
    }

    animationEnd(time){
        //this is going to be an animation of the whole game 
        return; 
    }
    
    checkTimeOut(time){}

}