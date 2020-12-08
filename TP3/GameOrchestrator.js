/**
 * GameOrchestrator
 * @constructor
 * @param scene - Reference to MyScene object
 */

class GameOrchestrator {
    constructor(theme,scene){
        this.scene = scene;
        this.theme = new MySceneGraph('scene1.xml', scene);
        this.gameBoard = new Board(this.scene, 10); 
        //this.auxBoard = new Board(this.scene, x1,y1,x2,y2);
        this.gameSequence = new GameSequence(this.scene);
        this.animator = new GameAnimator(this, this.gameSequence);
        //this.themeId = 0;
        this.previousPick = null;
        this.previousObj = null


    }

    //updates the animator
    update(time){
        this.animator.update(time);
        //this.gameBoard.update(time);
    }

    changeTheme(){
        this.gameBoard.changeTheme(this.theme.board);        
    }

    undo(){

    }
 

    gameMovie(){

    }

    //manages Picking
    managePick(mode, results){
        if (mode == false /* && some other game conditions */){
            if (results != null && results.length > 0) { // any results?
                for (var i=0; i< results.length; i++) {
                    var obj = results[i][0]; // get object from result
                    if (obj) { // exists?
                        var customId = results[i][1] // get id
                        console.log("Picked object: " + obj + ", with pick id " + customId);
                        this.pickedPiece(obj, customId); 
                    }
                }
                // clear results
                results.splice(0, results.length);
            }
        } 
    }
    pickedPiece(obj, customId) {
        if(obj instanceof Piece){
            console.log("piece selected")
            console.log(obj.isPicked());
            if(!obj.isPicked() && this.previousPick == null){ //if no piece was selected before only changes that piece color
                this.previousPick = customId;
                this.previousObj = obj;
                obj.pick();
                console.log("piece 1")
            }
            else if(!obj.isPicked()){ //a piece was chosen before, changes this piece color, applies the move and makes pieces color back to normal
                obj.pick();
                console.log("helloooo");
                var move = new GameMove(this.scene,this.previousObj,obj, this.gameBoard.tiles[this.previousPick-1], this.gameBoard.tiles[customId-1], this.gameBoard);
                this.gameSequence.addGameMove(move);
                console.log(this.previousObj);
                move.createAnimation(this.previousPick, customId);
                
                this.gameBoard.movePiece(this.previousPick, customId);
                this.previousObj.pick();
                obj.pick();
                this.previousPick = null;
                console.log("piece 2")
            }
            else{
                obj.pick();
                this.previousObj = null;
                this.previousPick = null;
            }
        }
        else if (obj instanceof BoardTile) console.log("tile selected");
        else {
            console.log("error");
        // error ?
        }
    }
        

    //displays the board and animator
    display(){

        this.scene.pushMatrix();
        //this.theme.display(); --> dado no xmlscene
        this.gameBoard.display();
        this.animator.display();

        this.scene.popMatrix();
    }



}