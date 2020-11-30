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

        this.plane = new MyPlane(this.scene, size, size);

        console.log('id:'+id);
        console.log((this.id+x)%2+1);

        this.piece = new Piece(this.scene, id, this, (this.id+x)%2+1);

        this.initMaterials();
    }
    

    initMaterials(){
        this.white = new CGFappearance(this.scene);
        this.white.setAmbient(1.0, 1.0, 1.0, 1);
        this.white.setDiffuse(1.0, 1.0, 1.0, 1);
        this.white.setSpecular(1.0, 1.0, 1.0, 1);
        this.white.setShininess(10.0);
    }
	

    setPiece(piece){
        this.piece = piece;
    }

    unsetPiece(){
        this.piece = null;
    }

    getPiece(){
        return this.piece;
    }

    display(){
        
        this.scene.pushMatrix();

        this.scene.translate(this.x,0,this.y); //move to its position
        

        this.white.apply();
        this.plane.display();


        if(this.piece != null){
            this.scene.pushMatrix();
            this.scene.translate(0,0.3,0);
            this.piece.display();
            this.scene.popMatrix();
        }
        

        

        this.scene.popMatrix();
           

    }

	
	
}

