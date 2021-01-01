/**
 * Board
 * @constructor
 * @param scene - Reference to MyScene object
 * @param x1 - x coordinate corner 1
 * @param y1 - y coordinate corner 1
 * @param x2 - x coordinate corner 2
 * @param y2 - y coordinate corner 2
 */
class Board extends CGFobject {
    constructor(scene, array) {
        super(scene);

        this.boardRepresentation = array
        this.size = array.length;
        this.board = new GameBoard(this.scene, this.size)
        this.tiles = [];

        this.init(array);
	}	
	
	init(array) {
        this.createBoardTiles(array);
    }

    changeTheme(theme){
        this.boardMaterial = theme[0];
        this.boardTexture = theme[1][0];
        this.boardMaterial.setTexture(this.boardTexture);
        this.boardMaterial.setTextureWrap('REPEAT', 'REPEAT');
        let piece1 = theme[2];
        let piece2 = theme[3];
        let tile1 = theme[4];
        let tile2 = theme[5];
        for(let tile of this.tiles) tile.changeTheme(piece1, piece2, tile1, tile2);
    }

	createBoardTiles(array){
        let id = 1
        let nTiles = this.size;
        for (let i = 0; i < nTiles; i++) {
            for (let j = 0; j < nTiles; j++) {
                this.tiles.push(new BoardTile(this.scene, this, 2, i * 1.15, j * 1.15, id, array[i][j]));
                id++;
            }
        }
    }

    setTiles(tiles){
        this.tiles = tiles
    }

    addPieceToTile(piece, tile) {  
        tile.setPiece(piece);
    }

    removePieceFromTile(tile) {
        tile.unsetPiece();
    }
    switchTiles(initial, final){
        this.removePieceFromTile(initial)
        this.removePieceFromTile(final);
        this.addPieceToTile(initial.removed, final);
        this.addPieceToTile(final.removed, initial);
        initial.removed = null;
        final.removed = null;
        
    }
    getPieceOfTile(tile) {
        return tile.getPiece();
    }

    getTileOfPiece(piece) {
        for (t in this.tiles) {
            if (t.piece == piece) return t;
        }
    }

    getTileWithCoordinates(x, y) {
        return this.tiles(x * this.size + y)
    }
    
	movePiece(tile1, tile2, pieceDest, pieceOrig){
        this.addPieceToTile(pieceDest, tile1);
        this.addPieceToTile(pieceOrig, tile2);
        
	}
    update(time){
        /*for(var tile of this.tiles){
            if(tile.piece != null){
                if(tile.piece.animation != null){
                    tile.piece.update(time);
                }
            }
        }*/
    }

    clone(){
        let k = 0
        for(let i = 0; i < this.boardRepresentation.length; i++){
            for(let j = 0; j < this.boardRepresentation.length; j++){
                this.tiles[k].piece = new Piece(this.scene, this.tiles[k].id, this.tiles[k],this.boardRepresentation[i][j])
            }
        }
    }

    display(){
        let id = 1;

        this.scene.popMatrix();
        this.scene.pushMatrix()
        this.boardMaterial.apply()
        this.board.display()
        this.scene.popMatrix()
        
        this.scene.pushMatrix();
        for (let cell = 0; cell < this.tiles.length; cell++){
            this.scene.registerForPick(id, this.tiles[cell]);
            if (this.tiles[cell].piece != null) {
                this.scene.registerForPick(id, this.tiles[cell].piece);
                id++;
            }
            else id++;
            this.tiles[cell].display(); //each tile 
        }

        
        
        
    }  

}

