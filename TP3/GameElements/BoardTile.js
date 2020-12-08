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
	constructor(scene, size, x, y, id, color) {
        super(scene);
        this.size = size;
		this.x = x;
        this.y = y;
        this.id = id;

        this.plane = new MyPlane(this.scene, size, size);

        console.log('id='+id);

        this.piece = new Piece(this.scene, id, this, color);

        this.initMaterials();
    }
    

    initMaterials(){
        this.grey = new CGFappearance(this.scene);
        this.grey.setAmbient(0.5, 0.5, 0.5, 1);
        this.grey.setDiffuse(0.5, 0.5, 0.5, 1);
        this.grey.setSpecular(0.5, 0.5, 0.5, 1);
        this.grey.setShininess(10.0);
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

        this.grey.apply();
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

