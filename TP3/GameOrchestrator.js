class GameOrchestrator {
    constructor(scene){
        this.scene = scene;

        //this.theme = new MySceneGraph(this.scene);
        this.gameBoard = new Board(this.scene, -10,10,10,-10); 
        //this.auxBoard = new Board(this.scene, x1,y1,x2,y2);
        //this.gameSequence = new GameSequence(this.scene);
        //this.animator = new GameAnimator(this, this.gameSequence);
        //this.themeId = 0;
    }

    update(time){
        //this.animator.update(time);
    }

    changeScene(){

    }

    undo(){

    }


    gameMovie(){

    }

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
        console.log("here");

        if(obj instanceof Piece){
            console.log("piece selected")
            obj.pick();
        }
        else if(obj instanceof BoardTile){
            console.log("tile selected");
        }
        else {
            console.log("error");
        // error ?
        }
    }
        

    display(){

        //this.theme.display();
        this.gameBoard.display();
        //this.animator.display();

    }



}