/**
 * GameOrchestrator
 * @constructor
 * @param scene - Reference to MyScene object
 */

class GameOrchestrator {
    constructor(scene, boardSize) {
        this.scene = scene;
        this.boardSize = boardSize;
        this.gameSequence = new GameSequence(this.scene);
        this.animator = new GameAnimator(this, this.gameSequence);
        this.previousPick = null
        this.previousObj = null
        this.finalPick = null
        this.finalObj = null
        this.startTile = null
        this.finalTile = null
        this.prolog = new PrologInterface(this);
        this.gameBoard = new Board(this.scene, [["white", "black", "white", "black"], ["black", "white", "black", "white"], ["white", "black", "white", "black"], ["black", "white", "black", "white"]]);
        //this.gameBoard = new Board(this.scene, [["white","black"],["white", "black"]]);
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
        //this.auxBoard = new Board(this.scene, x1,y1,x2,y2);
        this.currentPlayer = "black";
        this.menu = new Menu(this.scene)
        this.changeState(new ReadyState(this))
    }

    changePlayer(){
        if (this.currentPlayer=="black")
            this.currentPlayer="white";
        else
            this.currentPlayer="black";
    }

    changeState(state){
        this.state = state;
    }

    handleReply(response){
        this.state.handleReply(response)
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
        this.state.animationEnd(time)
        this.gameBoard.update(time);
        //this.animator.update(time)
    }

    setTheme(theme){
        this.gameBoard.changeTheme(theme.board);
    }

    changeTheme(theme){
        this.theme = theme;
        this.gameBoard.changeTheme(theme.board);
    }
    changeMode(mode){
        this.mode = mode;
        console.log(mode)
    }

    undo() {
        console.log("undo")
    }


    gameMovie() {

    }

    updateErrors(error){
        document.getElementById("errors").innerText = error
    }
    updateInfo(info){
        document.getElementById("info").innerText = info
    }
    updateScore(player, score){ 
        if(player == 1) document.getElementById("player1-score").innerText = score
        else if(player == 2) document.getElementById("player2-score").innerText = score 
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
        this.state.pickPiece(obj, customId);
    }


    //displays the board and animator
    display() {
        //this.theme.displayScene()--> tirar do xmlscene

        this.scene.pushMatrix();
        this.gameBoard.display();
        this.scene.popMatrix();
        this.scene.pushMatrix();
        this.scene.translate(-1.15,2.4,1.75)
        this.scene.rotate(Math.PI/2.0,0,1,0)
        this.scene.scale(0.98,1, 0.2)
        this.menu.display()
        this.scene.popMatrix()
        //this.animator.display()
    }



}