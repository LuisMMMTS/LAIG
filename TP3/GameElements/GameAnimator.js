
class GameAnimator{
    constructor(gameOrchestrator, gameSequence){
        this.gameOrchestrator = gameOrchestrator;
        this.gameSequence = gameSequence;
    }

    reset(){

    }

    start(){

    }

    update(time){
        for(v in this.gameSequence.moves)
            i.animate(time);
    }

    display(){
        // Optionally can look at the orchestrator to stop current animation
    }
}