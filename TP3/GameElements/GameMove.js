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

    /*createAnimation(){
        let speed = 0.1;
        console.log(this.destination);
        let duration = Math.ceil(Math.sqrt(Math.pow(this.destination.x - this.origin.x,2) + Math.pow(this.destination.y - this.origin.y,2))/speed);
        if (duration==0){duration+=1;}

        console.log("Duration: "+ duration);
        console.log("x: ", this.destination.x );
        console.log("z: ", this.destination.y );
        console.log("x: ",  this.origin.x);
        console.log("z: ",  this.origin.y);

        this.animationO = new KeyFrameAnimation(this.scene, null);
        let start = new KeyFrame()
        start.translation = new vec3.fromValues(this.origin.x, 0.3, this.origin.y)
        start.instant = 0;
        this.animationO.addKeyFrame(start); 
        let end = new KeyFrame();
        end.translation = new vec3.fromValues(this.destination.x, 0.3,this.destination.y );
        end.instant = duration;
        this.animationO.addKeyFrame(end);
        this.animationO.active = true;


        this.animationD = new KeyFrameAnimation(this.scene, null);
        let start2 = new KeyFrame()
        start2.translation = new vec3.fromValues(this.destination.x, 0.3, this.destination.y)
        start2.instant = 0;
        this.animationD.addKeyFrame(start2);

        let end2 = new KeyFrame();
        end2.translation = new vec3.fromValues(this.origin.x, 0.3, this.origin.y);
        end2.instant = duration;
        this.animationD.addKeyFrame(end2);

        this.animating1 = true;
        this.animating2 = true;

        
        this.gameBoard.removePieceFromTile(this.origin);
    }*/

    /*update(time){
        if( this.animating1){
            if(!this.animationO.ended)
            this.animationO.update(time);
            else{
                this.animating1 = false;
                this.gameBoard.addPieceToTile(this.startPiece,this.destination);
            }
            
        }
        else this.animating1 = false;
        
        if(this.animating2){
            if(!this.animationD.ended)
            this.animationD.update(time);
            else{
                this.animating2 = false;
                this.gameBoard.addPieceToTile(this.endPiece,this.origin);
            } 
        }
        else this.animating2 = false;

    }*/
   /* animate(){
        if(this.animating1){
            this.scene.pushMatrix();
            this.animationO.apply();
            this.startPiece.display();
            this.scene.popMatrix();
        }
        
        if(this.animating2){
            this.scene.pushMatrix();
            this.animationD.apply();
            this.endPiece.display();
            this.scene.popMatrix();
        }
        

    }*/
}