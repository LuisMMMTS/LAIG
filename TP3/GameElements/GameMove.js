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
    constructor(scene, startPiece, endPiece, origin, destination, gameBoard){
        this.scene = scene;
        
        this.origin = origin;
        this.destination = destination;
        this.gameBoard = gameBoard;

        this.startPiece = startPiece;
        this.endPiece = endPiece;
        this.active = true;
    }


    update(time){
        
    }
    animate(){
      
    }
}