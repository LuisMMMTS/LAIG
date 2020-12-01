/**
 * Piece
 * @constructor
 * @param scene - Reference to MyScene object
 * @param id
 * @param tile
 * @param player
 */

class Piece{
    constructor(scene, id, tile, player){
        this.scene = scene;
        this.id = id;
        this.tile = tile;
        this.player = player;

        this.type = 'cube';
        this.cube = new MyCube(this.scene,0.5);
        this.initMaterials();

        //if player is 1 pieces are black, if player is 2 pieces are white
        if(this.player == 1){
            this.color = this.black;
        }
        else if(this.player == 2){
            this.color = this.white;
        }

        this.picked = false;
        this.previousColor = null;
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

        this.red = new CGFappearance(this.scene);
        this.red.setAmbient(1.0, 0.0, 0.0, 1);
        this.red.setDiffuse(1.0, 0.0, 0.0, 1);
        this.red.setSpecular(1.0, 0.0, 0.0, 1);
        this.red.setShininess(10.0);    
    }

    setType(type){
        this.type = type;
    }

    getType(){
        return this.type;
    }
    pick(){
        console.log("here");
        if(!this.picked){
            this.previousColor = this.color;
            this.color = this.red;
            this.picked = true;
            
        }
        else{
            this.color = this.previousColor;
            this.picked = false
        }
    }
    display(){
    
        this.scene.pushMatrix();
        this.color.apply();
        
        this.cube.display();

        this.scene.popMatrix();
        
    }
    displayPiece(){

    }

}