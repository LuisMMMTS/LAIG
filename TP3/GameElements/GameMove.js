/**
 * GameMove
 * @constructor
 * @param scene - Reference to MyScene object
 * @param piece
 * @param origin
 * @param destination
 * @param gameBoard
 */
class GameMove{
    constructor(scene, piece, origin, destination, gameBoard){
        this.scene = scene;
        
        this.piece = piece;
        this.origin = origin;
        this.destination = destination;
        this.gameBoard = gameBoard;

    }

    animate(){
        
    }
}