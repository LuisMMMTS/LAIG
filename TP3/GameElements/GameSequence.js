  
/**
 * GameSequence
 * @constructor
 * @param scene - Reference to MyScene object
 */
class GameSequence {
    constructor(scene) {
        this.scene = scene;
        this.moves = [];
        this.currentMove = null;
    }

    update(time){
        for(var move of this.moves){
            move.update(time);
        }
    }
    addGameMove(move) {
        this.moves.push(move);
        this.currentMove = move;
    }
    getCurrentMove(){
        //console.log(this.currentMove);
        //if(this.currentMove.animating1 && this.currentMove.animating2){
            return this.currentMove;
        //}
        //else return false;
    }
    undo() {
        let previousMove = this.moves.pop();
        //se calhar acrescentar o tile à origem do movimento
        previousMove.gameBoard.removePieceFromTile(previousMove.destination);
    }
    
    moveReplay(){

    }

    getMoveByIndex(i){
        if(i < this.moves.length)
            return this.moves[i];
        else return null;
    }
}