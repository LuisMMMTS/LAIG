/**
 * @abstract
 */

 class BotState extends GameState{
    constructor(orchestrator){
        super(orchestrator);
    }

    init(){
        this.orchestrator.prolog.moveRequest(this.orchestrator.gameBoard, this.orchestrator.currentPlayer, this.orchestrator.AiLevel1, this.orchestrator.AiLevel2);
        this.orchestrator.updateInfo("Bot is choosing its next move")
        return;
    }

    /**
     * @abstract
     */
    handleReply(response){
        console.log("this");
        console.log(response);
        let customId;
        let obj;

        for(let i in this.orchestrator.gameBoard.tiles){
            let id=this.orchestrator.gameBoard.tiles[i].id;
            let piece=this.orchestrator.gameBoard.tiles[i].piece;
            if (((Math.floor((id-1) / this.orchestrator.gameBoard.side))==response[0][0])&&(((id-1) % this.orchestrator.gameBoard.side)==response[0][1])){
                this.orchestrator.previousPick=id;
                this.orchestrator.previousObj=piece;
                this.orchestrator.startTile = piece.tile;
            }
            if (((Math.floor((id-1) / this.orchestrator.gameBoard.side))==response[1][0])&&(((id-1) % this.orchestrator.gameBoard.side)==response[1][1])){
                customId=id;
                obj=piece;
                this.orchestrator.finalPick = customId;
                this.orchestrator.finalObj = obj;
                this.orchestrator.finalTile = obj.tile;
            }
        }
        this.orchestrator.previousObj.pick();
        obj.pick();


        this.orchestrator.gameSequence.addGameMove(new GameMove(this.orchestrator.scene, this.orchestrator.previousObj, obj, this.orchestrator.gameBoard.tiles[this.orchestrator.previousPick - 1], this.orchestrator.gameBoard.tiles[customId - 1], this.orchestrator.gameBoard));
        this.orchestrator.previousObj.createAnimation(this.orchestrator.gameBoard.tiles[this.orchestrator.previousPick - 1], this.orchestrator.gameBoard.tiles[customId - 1]);//creates animation of first piece. custom id is the id of the last picked piece
        obj.createAnimation(this.orchestrator.gameBoard.tiles[customId - 1], this.orchestrator.gameBoard.tiles[this.orchestrator.previousPick - 1]);
        

        
        this.orchestrator.changeState(new AnimationState(this.orchestrator));
    }

    /**
     * @abstract
     */
    pickPiece(obj, customId){
       return;
    }

    pickButton(obj, customId){
        if(customId == 501){
            obj.pick()
            this.orchestrator.undo()
        } 
        else if(customId == 502){
            obj.pick()
            this.orchestrator.reset()
        }
        else if(customId == 503){
            if(obj.getText() == "Pause") obj.changeButtonText("Play")
            else if(obj.getText() == "Play") obj.changeButtonText("Pause")
            obj.pick()
            this.orchestrator.pause()
        } 
        else this.orchestrator.updateErrors("This button is unavailable in this moment")
    }

    /**
     * @abstract
     */
    animationEnd(time){
        
    }

    checkTimeOut(time){}

 }