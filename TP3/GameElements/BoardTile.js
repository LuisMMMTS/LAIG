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
    constructor(scene, gameBoard, size, x, y, id, color) {
        super(scene);
        this.size = size;
        this.x = x;
        this.y = y;
        this.id = id;
        this.gameBoard = gameBoard;
        this.plane = new MyPlane(this.scene, size, size);

        //this.diferentiator = Math.trunc((this.id+x/1.15)%2+1)
        //console.log('id='+id);
        //console.log((this.id+x/1.15)%2+1);

        this.piece = new Piece(this.scene, id, this, color);
        this.removed = null
    }

    changeTheme(piece1, piece2, tile1, tile2){
        if(this.piece.player == "black"){
            this.piece.changeTheme(piece1);
        }
        else if(this.piece.player == "white"){
            this.piece.changeTheme(piece2);
        }
        if(this.piece.player == 'black'){
            this.material = tile1;
        }
        else if (this.piece.player == 'white'){
            this.material = tile2;
        }
    }


    setPiece(piece) {
        if(this.removed == null) this.removed = this.piece;
        this.piece = piece;

    }

    unsetPiece() {
        this.removed = this.piece;
        this.piece = null;
    }

    getPiece() {
        return this.piece;
    }

    display() {

        this.scene.pushMatrix();

        this.scene.translate(this.x, 0, this.y); //move to its position    

        this.material.apply();
        this.plane.display();


        if (this.piece != null) {
            this.scene.pushMatrix();
            this.scene.translate(0, 0.3, 0);
            this.piece.display();
            this.scene.popMatrix();
        }




        this.scene.popMatrix();


    }



}

