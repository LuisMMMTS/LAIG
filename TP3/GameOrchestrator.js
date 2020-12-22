/**
 * GameOrchestrator
 * @constructor
 * @param scene - Reference to MyScene object
 */

class GameOrchestrator {
    constructor(theme, scene) {
        this.scene = scene;
        this.theme = new MySceneGraph('scene1.xml', scene);
        //this.gameBoard = new Board(this.scene, 10); 
        //this.auxBoard = new Board(this.scene, x1,y1,x2,y2);
        this.gameSequence = new GameSequence(this.scene);
        this.animator = new GameAnimator(this, this.gameSequence);
        //this.themeId = 0;
        this.previousPick = null;
        this.previousObj = null
        let prolog = new MyPrologInterface(this);
        // let oldPos=[1,1];
        this.gameBoard = new Board(this.scene, [["white", "black", "white", "black"], ["black", "white", "black", "white"], ["white", "black", "white", "black"], ["black", "white", "black", "white"]]);
        //let boards=prolog.moveRequest("[[white,black,white,black],[black,white,black,white],[white,black,white,black],[black,white,black,white]]","black",null, null,"["+oldPos+"]","[2,1]");
         //prolog.boardRequest(5);
        // this.sleep(3000);
        //prolog.moveRequest(this.gameBoard, 'black', 1, 2, null, null);
        //prolog.getMovablePiecesResquest(this.gameBoard, 'black');
        //prolog.getPieceMovesRequest(this.gameBoard, 'black', [1, 2]);
        //prolog.getcurrentscore(this.gameBoard, 'black');
        //prolog.getWinner(this.gameBoard,'black');
        //prolog.close();

        this.state = {
            Animation: 1,
            GameOver: 2,
            Move: 3,
            Ready: 4,
            Replay: 5
        }
        this.mode = {
            pvp: 1,
            pvc: 2,
            cvp: 3,
            cvc: 4
        }
        this.difficult = {
            easy: 1,
            difficult: 2
        }
    }

    sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }

    /**
     * Updates animations
     * @param {*} time 
     */
    update(time) { 
        this.gameBoard.update(time);
    }

    setTheme(){
        this.gameBoard.changeTheme(this.theme.board);
    }

    changeTheme(theme){
        this.theme = theme;
        this.gameBoard.changeTheme(theme.board);
    }
    changeMode(mode){
        
    }

    undo() {

    }


    gameMovie() {

    }

    /**
     * Manages the picking
     * @param {*} mode 
     * @param {*} results 
     */
    managePick(mode, results) {
        if (mode == false) {  /* && some other game conditions */
            if (results != null && results.length > 0) { // any results?
                for (var i = 0; i < results.length; i++) {
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

    /**
     * When picking is done, acts accordingly
     * @param {*} obj 
     * @param {*} customId 
     */
    pickedPiece(obj, customId) {
        if (obj instanceof Piece) {
            if (!obj.isPicked() && this.previousPick == null) { //if no piece was selected before only changes that piece color
                this.previousPick = customId;
                this.previousObj = obj;
                obj.pick();
                console.log("piece 1")
            }
            else if (!obj.isPicked()) { //a piece was chosen before, changes this piece color, applies the move and makes pieces color back to normal
                obj.pick();
                var move = new GameMove(this.scene,this.previousObj,obj, this.gameBoard.tiles[this.previousPick-1], this.gameBoard.tiles[customId-1], this.gameBoard);
                this.gameSequence.addGameMove(move);
                this.previousObj.createAnimation(this.gameBoard.tiles[this.previousPick-1],this.gameBoard.tiles[customId-1])//creates animation of first piece. custom id is the id of the last picked piece
                obj.createAnimation(this.gameBoard.tiles[customId-1], this.gameBoard.tiles[this.previousPick-1])
                
                this.previousPick = null;
                console.log("piece 2")
            }
            else {
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
    display() {

        this.scene.pushMatrix();
        //this.theme.display(); --> dado no xmlscene
        this.gameBoard.display();

        this.scene.popMatrix();
    }



}