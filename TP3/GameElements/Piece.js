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
        this.cube = new MyCube(this.scene, 0.5);
        this.initMaterials();

        //if player is 1 pieces are black, if player is 2 pieces are white
        this.color = this.material;

        this.picked = false;
        this.previousColor = null;

        this.animation = null;
    }
    
    initMaterials(){
        console.log(this.player);
        if(this.player == "black"){
            this.material = new CGFappearance(this.scene);
            this.material.setAmbient(0.0, 0.0, 0.0, 1);
            this.material.setDiffuse(0.0, 0.0, 0.0, 1);
            this.material.setSpecular(0.0, 0.0, 0.0, 1);
            this.material.setShininess(10.0);
        }
        else if(this.player == "white"){
            this.material = new CGFappearance(this.scene);
            this.material.setAmbient(1.0, 1.0, 1.0, 1);
            this.material.setDiffuse(1.0, 1.0, 1.0, 1);
            this.material.setSpecular(1.0, 1.0, 1.0, 1);
            this.material.setShininess(10.0);
        }

        this.pickedMaterial = new CGFappearance(this.scene);
        this.pickedMaterial.setAmbient(1.0, 0.0, 0.0, 1);
        this.pickedMaterial.setDiffuse(1.0, 0.0, 0.0, 1);
        this.pickedMaterial.setSpecular(1.0, 0.0, 0.0, 1);
        this.pickedMaterial.setShininess(10.0);    
    }

    setType(type){
        this.type = type;
    }

    getType(){
        return this.type;
    }
    pick(){
        if(!this.picked){
            this.color = this.pickedMaterial;
            this.picked = true;
        }
        else{
            this.color = this.material;
            this.picked = false
        }
    }
    display(){
    
        this.scene.pushMatrix();
        this.color.apply();
        
        if(this.picked){
            this.scene.translate(0,1.5,0);
        }
        this.displayPiece();
        this.cube.display();

        this.scene.popMatrix();
        
    }
    displayPiece(){
        //console.log("animation not applied\n");
        //console.log("this.animation " +this.animation);
        if(this.animation != null && this.animation.active && !this.animation.ended){
            console.log("animation applied\n");
            this.animation.apply();
        }

    }

    isPicked(){
        return this.picked;
    }
}