

class MyPiece{
    constructor(scene, id, tile, player, x, y){
        this.scene = scene;
        this.id = id;
        this.tile = tile;
        this.player = player;
        this.initialPos['x'] = x;
        this.initialPos['y'] = y;

        this.initMaterials();
    }
    
    initMaterials(){

        this.white = new CGFappearance(this.scene);
        this.white.setAmbient(1.0, 1.0, 1.0, 1);
        this.white.setDiffuse(1.0, 1.0, 1.0, 1);
        this.white.setSpecular(1.0, 1.0, 1.0, 1);
        this.white.setShininess(10.0);

        this.black = new CGFappearance(this.scene);
        this.black.setAmbient(0.0, 0.0, 0.0, 1);
        this.black.setDiffuse(0.0, 0.0, 0.0, 1);
        this.black.setSpecular(0.0, 0.0, 0.0, 1);
        this.black.setShininess(10.0);

    }

    display(){
        this.scene.pushMatrix();
        //if player is 1 pieces are black, if player is 2 pieces are white
        if(player == 1){
            this.black.apply();
        }
        else if(player == 2){
            this.white.apply();
        }

        this.displayPiece();
        this.scene.popMatrix();
    }

    displayPiece(){

    }
}