/**
 * BoardTile
 * @constructor
 * @param scene - Reference to MyScene object
 * @param size- size of the tile
 * @param x - x position
 * @param y - y position
 * @param id - tile id
 */
class BoardTile extends CGFobject {
	constructor(scene, size, x, y, id) {
        super(scene);
        this.size = size;
		this.x = x;
        this.y = y;
        this.id = id;

        this.plane= new MyPlane(this.scene, size, size);
        console.log('id:'+id);
        console.log((this.id+x)%2+1);
        this.piece = new Piece(this.scene, id, this, (this.id+x)%2+1);
	}
	

    setPiece(piece){
        this.piece = piece;
    }
    getPiece(){
        return this.piece;
    }

    display(){
        
        this.scene.pushMatrix();

        this.scene.translate(this.x,0,this.y); //move to its position
        
       
        if(this.piece != null){
            this.scene.pushMatrix();
            this.scene.translate(0,4,1);
            this.piece.display();
            this.scene.popMatrix();
        }
        
        
        this.plane.display();

        this.scene.popMatrix();
           

    }

	
	
}

