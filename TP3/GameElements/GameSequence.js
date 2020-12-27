  
/**
 * GameSequence
 * @constructor
 * @param scene - Reference to MyScene object
 */
class GameSequence {
    constructor(scene) {
        this.scene = scene;
        this.moves = [];
        this.currentMove = 0;
    }

    update(time){
        for(var move of this.moves){
            move.update(time);
        }
    }
    addGameMove(move) {
        this.moves.push(move);
        this.currentMove = this.moves.length-1;
    }
    getCurrentMove(){
        //console.log(this.currentMove);
        //if(this.currentMove.animating1 && this.currentMove.animating2){
            return this.currentMove;
        //}
        //else return false;
    }
    undo() {
        console.log(this.moves[0])
        if(this.moves.length < 1) return -1
        this.currentMove -= 1
        this.moves.pop()
        console.log(this.moves)
        //let previousMove = this.moves.pop();
        //se calhar acrescentar o tile à origem do movimento
        //previousMove.gameBoard.removePieceFromTile(previousMove.destination);
    }

    reset(){
        this.moves = []
        //go back to start 
    }
    
    moveReplay(){

    }

    getMoveByIndex(i){
        if(i < this.moves.length)
            return this.moves[i];
        else return null;
    }
}