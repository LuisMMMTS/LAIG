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

        this.active = true;
    }

    createAnimation(){
        let speed = 4.0;
        
        let duration = Math.sqrt(pow(this.destination.x - this.origin.x,2) + pow(this.destination.y - this.origin.y,2))/speed;

        this.animation = KeyFrameAnimation(this.scene, null);

        this.animation.addKeyFrame(new KeyFrame());
        let end = KeyFrame();
        end.translation = (this.destination.x - this.origin.x, this.destination.y - this.origin.y);
        end.instant = duration+startTime;

        this.animation.addKeyFrame(end);
    }
    animate(time){
        
        //falta dar update 
        this.animation.apply();
    }
}