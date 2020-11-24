
class BoardTile extends CGFobject {
	constructor(scene, size, x, y, id) {
        super(scene);
        this.size=size;
		this.x = x;
        this.y = y;
        this.id=id;

        this.plane= new MyPlane(this.scene, size, size)

        this.piece = null;

		this.initBuffers();
	}
	
	initBuffers() {





    }
    display(){
        
        this.MyPlane.display();
        this.piece.display();

    }

	
	
}

