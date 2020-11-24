


class CubePiece extends Piece{

    constructor(scene, id, tile, player, x, y){
        super(scene, id ,tile, player, x, y);
        this.cube(this.scene,1);
    }

    displayPiece(){

        this.cube.display();
    }
}