  
/**
 * GameSequence
 * @constructor
 * @param scene - Reference to MyScene object
 */
class GameSequence {
    constructor(scene) {
        this.scene = scene;
        this.moves = [];
    }

    addGameMove(move) {
        this.moves.push(move);
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