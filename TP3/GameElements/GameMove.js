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
        let speed = 0.5;
        console.log(this.destination);
        let duration = Math.sqrt(Math.pow(this.destination.x - this.origin.x,2) + Math.pow(this.destination.y - this.origin.y,2))/speed;
        console.log("Duration: "+duration);

        this.animation = new KeyFrameAnimation(this.scene, null);
        this.animation.addKeyFrame(new KeyFrame()); //adds keyframe in the current position to start animation
        let end = new KeyFrame();
        end.translation = new vec3.fromValues(this.destination.x - this.origin.x,0 ,this.destination.y - this.origin.y);
        console.log("End translation: "+ end.translation);
        end.instant = duration;
        console.log(end.instant);

        this.animation.addKeyFrame(end);
        console.log("hi");
        this.animation.active=true;
        this.piece.animation = this.animation;
        console.log("hello"+this.piece.animation);
    }
    animate(){
        
        //falta dar update 
        this.animation.apply();
    }
}