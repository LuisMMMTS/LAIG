class GameOrchestrator {
    constructor(scene,){
        this.scene = scene;

        this.theme = new MySceneGraph(this.scene);
        
        this.mainBoard = new Board(this.scene, x1,y1,x2,y2);
        this.auxBoard = new Board(this.scene, x1,y1,x2,y2);
        this.themeId=0;
    }

    display(){
        this.board.display();
    }



}