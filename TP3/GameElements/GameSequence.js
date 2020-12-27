  
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
        if(this.moves.length !== 0)
            return this.currentMove;
    }
    getLastMove(){
        if(this.moves.length !== 0)
            return this.moves[this.currentMove]
        return -1
    }
    undo() {
        if(this.moves.length < 1) return -1
        this.moves.pop()
        this.currentMove = this.currentMove == 0? 0:this.currentMove-1
    }

    reset(){
        this.moves = []
        this.currentMove = 0
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