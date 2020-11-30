

class Piece{
    constructor(scene, id, tile, player){
        this.scene = scene;
        this.id = id;
        this.tile = tile;
        this.player = player;

        this.cube =new MyCube(this.scene,0.5);
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
        if(this.player == 1){
            this.black.apply();
        }
        else if(this.player == 2){
            this.white.apply();
        }
        
        this.cube.display();

        this.scene.popMatrix();
        
    }

}