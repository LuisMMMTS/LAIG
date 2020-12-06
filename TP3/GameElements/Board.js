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
	constructor(scene, size) {
		super(scene);
		
        this.size = size;
        this.side = this.size;
        
        this.tiles = [];

		this.init();
	}	
	
	init() {
        this.board = new MyPlane(this.scene, this.size, this.size);
        this.createBoardTiles();

	}
	createBoardTiles(){
        let id = 1
        let nTiles = this.size;
        console.log(nTiles*nTiles);
        for (let i = 0; i < nTiles; i++){
            for (let j = 0; j < nTiles; j++){
                this.tiles.push(new BoardTile(this.scene, 2, i*1.15, j*1.15, id));
                id++;
            }
        }
	}

	addPieceToTile(piece, tile){
        tile.setPiece(piece);
    }
    
	removePieceFromTile(tile){
		tile.unsetPiece();
    }
    
	getPieceOfTile(tile){
		return tile.getPiece();
    }
    
	getTileOfPiece(piece){
		for(t in this.tiles){
			if(t.piece == piece) return t;
		}
    }
    
	getTileWithCoordinates(x,y){
        return this.tiles(x * side + y)
		
    }
    
	movePiece(tile1, tile2){
        let pieceOrig = this.tiles[tile1-1].piece;
        let origin = this.tiles[tile1-1];
        let dest = this.tiles[tile2-1];
        let pieceDest = this.tiles[tile2-1].piece;
        this.removePieceFromTile(dest);
        this.removePieceFromTile(origin);
        this.addPieceToTile(pieceDest, origin);
        this.addPieceToTile(pieceOrig, dest);
        
	}
    update(time){
        for(var tile of this.tiles){
            if(tile.piece != null){
                if(tile.piece.animation != null){
                    console.log("update time board 3");
                    tile.piece.animation.update(time);
                }
            }
        }
    }
    display(){
        let id = 1;
        this.scene.pushMatrix();
        this.scene.translate(0.15, 0, 0.10);
        this.scene.scale(this.size+2, 1, this.size+2);
        this.scene.graph.boardMaterial.apply();
        this.board.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        
        
        this.scene.pushMatrix();
        this.scene.translate(0,0.1,0);
        this.scene.translate(-this.side/2.0,0,-this.side/2.0);
            
        for (let cell = 0; cell < this.tiles.length; cell++){
            this.scene.registerForPick(id, this.tiles[cell]);
            if(this.tiles[cell].piece != null){
                this.scene.registerForPick(id, this.tiles[cell].piece);
                id++;
            }
            else id++;
            this.tiles[cell].display();//each tile 
        }

        this.scene.popMatrix();
        
    }

	
	
}

