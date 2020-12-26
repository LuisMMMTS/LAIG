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

        this.size = array.length;
        this.side = this.size;

        this.tiles = [];
        
        this.init(array);
	}	
	
	init(array) {
        this.board = new MyPlane(this.scene, this.size, this.size);
        this.createBoardTiles(array);
        this.boardMaterial = null;

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
        for(let tile of this.tiles){
            tile.changeTheme(piece1, piece2, tile1, tile2);
        }
        //falta tratar dos afs e aft
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
        return this.tiles(x * side + y)

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
    display(){
        
        let id = 1;
        this.scene.pushMatrix();
        this.scene.translate(0.15, 0, 0.10);;
        this.scene.translate((this.side)/2.0-0.45,-0.1,(this.side/2.0)-0.35);
        this.scene.scale(this.size*1.15+0.3, 1, this.size*1.15+0.3);
        this.boardMaterial.apply();
        this.board.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        
            
        for (let cell = 0; cell < this.tiles.length; cell++){
            this.scene.registerForPick(id, this.tiles[cell]);
            if (this.tiles[cell].piece != null) {
                this.scene.registerForPick(id, this.tiles[cell].piece);
                id++;
            }
            else id++;
            this.tiles[cell].display();//each tile 
        }

        this.scene.popMatrix();
        
        
    }



}

