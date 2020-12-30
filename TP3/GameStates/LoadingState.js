/**
 * @abstract
 */

class LoadingState extends GameState{
    constructor(orchestrator){
        super(orchestrator);
    }

    init(){
        console.log("init loading state");
        this.orchestrator.prolog.boardRequest(4);
        
    }

    /**
     * @abstract
     */
    handleReply(response){
        this.orchestrator.loaded=true;
        let id=1;
        let numberPieces=Math.pow(response.length,2);
        let auxiliarSize=Math.ceil(Math.pow(numberPieces,(1/3)));
        let auxiliarTiles=[]
        for (let i=0;i<auxiliarSize;i++){
            for (let j=0;j<auxiliarSize;j++){
                for (let k=0;k<auxiliarSize;k++){
                    if ((i+1)*auxiliarSize+(j+1)*auxiliarSize+k+1>=Math.pow(response.length,2)){
                        break;
                    }
                    auxiliarTiles.push(new BoardTile(this.orchestrator.scene, null, 1, -15+j, 0+k,id, "black",i));
                    id++;
                }
            }
        }
        //console.log(auxiliarTiles);

        id=1;
        for (let i=0;i<response.length;i++){
            //console.log("i is" + i);
            for (let j=0;j<response.length;j++){
                // console.log(j)
                // console.log(auxiliarTiles[id-1]);
                // console.log(this.orchestrator.gameBoard.tiles[id-1])

                //meter as peças no board auxiliar antes de fazer o movimento

                let p=new Piece(this.orchestrator.scene, id, this, response[i][j]);
                this.orchestrator.gameBoard.tiles[id-1].insertPiece(p);
                p.createAnimation(auxiliarTiles[id-1],this.orchestrator.gameBoard.tiles[id-1]);
                console.log(p.animation);
                id++;
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
