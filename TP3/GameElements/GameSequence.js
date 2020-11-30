  
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
        
    }
    moveReplay(){

    }
}