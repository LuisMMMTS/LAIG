/**
 * @abstract
 */

class CreateGameState extends GameState{
    constructor(orchestrator){
        super(orchestrator);
    }

    init(){
        this.orchestrator.prolog.boardRequest(4);
    }

    /**
     * @abstract
     */
    handleReply(response){
        this.orchestrator.gameBoard=new Board(this.orchestrator.scene,response.length,response.length);
        let id=1;
        let numberPieces=Math.pow(response.length,2);
        let auxiliarSize=Math.ceil(Math.pow(numberPieces,(1/3)));
        let auxiliarTiles=[]
        for (let i in auxiliarSize){
            for (let j in auxiliarSize){
                for (let k in auxiliarSize){
                    if (i*j*k<=Math.pow(response.length,2)){
                        break;
                    }
                    auxiliarTiles.push(new BoardTile(this.orchestrator.scene, this.orchestrator.auxiliar, 1, this.orchestrator.auxiliar.j+1, this.orchestrator.auxiliar.k+1,id, "black",i+1));
                    id++;
                }
            }
        }

        id=1;
        for (let i in response.length){
            for (let j in response.length){
                let p=new Piece(this.orchestrator.scene, id, this, response[i][j]);
                id++;
                p.createAnimation(auxiliarTiles[id-1],this.orchestrator.gameBoard.tiles[id-1]);
                this.orchestrator.gameBoard.tiles[id-1].setPiece(p);
            }
        }
        
    }

    /**
     * @abstract
     */
    pickPiece(obj, customId){
       return;
    }



    /**
     * @abstract
     */
    animationEnd(time){
        
    }

    checkTimeOut(time){}

 }