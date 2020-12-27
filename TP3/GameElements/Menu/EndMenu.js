/**
 * EndMenu
 * @constructor
 * @param {*} scene 
 */
class EndMenu{
    
    constructor(scene){
        this.scene = scene
        this.menu = new MyCube(scene, 5)
        this.init()
    }

    init(){
        this.name = new MySpriteText(this.scene, "Menu")

        this.replay = new Button(this.scene, "Replay", true)      

        this.newgame = new Button(this.scene, "Restart", true)

        this.buttonMaterial = new CGFappearance(this.scene);
        this.buttonMaterial.setAmbient(1.0, 0.0, 0.0, 1);
        this.buttonMaterial.setDiffuse(1.0, 0.0, 0.0, 1);
        this.buttonMaterial.setSpecular(1.0, 0.0, 0.0, 1);
        this.buttonMaterial.setShininess(10.0);

        this.menuMaterial = new CGFappearance(this.scene);
        this.menuMaterial.setAmbient(1.0, 1.0, 1.0, 1);
        this.menuMaterial.setDiffuse(1.0, 1.0, 1.0, 1);
        this.menuMaterial.setSpecular(1.0, 1.0, 1.0, 1);
        this.menuMaterial.setShininess(10.0);

    }

    display(){
		this.scene.clearPickRegistration();
        
        this.scene.pushMatrix()
        this.menuMaterial.apply()
        this.menu.display()
        
        
        this.scene.pushMatrix()
        this.scene.translate(-1,0.2,1.5)
        this.buttonMaterial.apply()
        this.scene.registerForPick(505, this.replay)
        this.replay.display()
        this.scene.popMatrix()
       

        this.scene.pushMatrix()
        this.scene.translate(-1,-1,1.5)
        this.buttonMaterial.apply()
        this.scene.registerForPick(506, this.newgame)
        this.newgame.display()
        this.scene.popMatrix()
        
        this.scene.pushMatrix()
        this.scene.translate(0.5,2,3)
        this.name.display()
        this.scene.popMatrix()

        this.scene.popMatrix()
    }
    
}