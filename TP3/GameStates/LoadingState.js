/**
 * @abstract
 */

class LoadingState extends GameState{
    constructor(orchestrator){
        super(orchestrator);
    }

    init(){
        console.log("init loading state");
        this.orchestrator.prolog.boardRequest(this.orchestrator.boardSize);
    }

    /**
     * @abstract
     */
    handleReply(response){
        this.orchestrator.gameBoard=new Board(this.orchestrator.scene,response);
        this.orchestrator.auxiliarBoard=new Board(this.orchestrator.scene, response);
        this.orchestrator.changeTheme(this.orchestrator.theme);
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
                    auxiliarTiles.push(new BoardTile(this.orchestrator.scene, null, 1, j, this.orchestrator.auxiliarBoardOffset+k,id, "black",i));
                    id++;
                }
            }
        }
        //console.log(auxiliarTiles);
        this.lastanimation;
        id=1;
        for (let i=0;i<response.length;i++){
            //console.log("i is" + i);
            for (let j=0;j<response.length;j++){
                // console.log(j)
                // console.log(auxiliarTiles[id-1]);
                // console.log(this.orchestrator.gameBoard.tiles[id-1])

                //meter as peças no board auxiliar antes de fazer o movimento

                let p=new Piece(this.orchestrator.scene, id, this, response[i][j]);
                this.orchestrator.auxiliarBoard.tiles[id-1].insertPiece(p);
                
                p.createAnimation(auxiliarTiles[id-1],this.orchestrator.gameBoard.tiles[id-1]);
                if (j==response.length-2)
                    this.orchestrator.previousObj=p;
                if (j==response.length-1)
                    this.orchestrator.finalObj=p;
                console.log(p.animation);
                id++;
            }
        }
        //this.orchestrator.changeState(new AnimationState(this.orchestrator))
        // while(!p.ended){
        // }
        
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
        if (!this.orchestrator.loaded){
            return;
        }
        let anyActive=false;
        if(this.orchestrator.paused) return
        
        for (let i of this.orchestrator.auxiliarBoard.tiles){
            if (i.piece==null)
                continue;
            anyActive=true;
            i.piece.update(time);
            if (i.piece.animation.active){
                if(i.piece.animation.ended){
                    if (i.piece.isPicked()) 
                        i.piece.pick()
                    else 
                        i.piece.floating()

                    i.piece.animation=null;
                    this.orchestrator.gameBoard.tiles[i.id-1].insertPiece(i.piece);
                    i.unsetPiece();
                }
            }
        }
        if (!anyActive)
            this.orchestrator.changeState(new ReadyState(this.orchestrator));

    }
        
    

    checkTimeOut(time){}

}
