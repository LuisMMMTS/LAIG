
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
        this.gameSequence.update(time);
    }

    display(){
        // Optionally can look at the orchestrator to stop current animation
        let currentMove = this.gameSequence.getCurrentMove();

        if(currentMove){
            currentMove.animate();
        }

    }
}