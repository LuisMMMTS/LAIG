
class Menu{
    constructor(scene){
        this.scene = scene
        this.menu = new MyCube(scene, 5)
        this.init()
    }

    init(){
        this.name = new MySpriteText(this.scene, "Menu")

        this.undo = new Button(this.scene, "Undo")      

        this.reset = new Button(this.scene, "Reset")

        this.quit = new Button(this.scene,"Quit")

        this.pause = new Button(this.scene, "Pause")

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
        this.scene.translate(-2.20,0.4,1.5)
        this.buttonMaterial.apply()
        this.scene.registerForPick(501, this.undo)
        this.undo.display()
        this.scene.popMatrix()
       


        this.scene.pushMatrix()
        this.scene.translate(0.25,0.4,1.5)
        this.buttonMaterial.apply()
        this.scene.registerForPick(502, this.reset)
        this.reset.display()
        this.scene.popMatrix()


        this.scene.pushMatrix()
        this.scene.translate(-2.20,-0.8,1.5)
        this.buttonMaterial.apply()
        this.scene.registerForPick(503, this.quit)
        this.quit.display()
        this.scene.popMatrix()


        this.scene.pushMatrix()
        this.scene.translate(0.25,-0.8,1.5)
        this.buttonMaterial.apply()
        this.scene.registerForPick(504, this.reset)
        this.pause.display()
        this.scene.popMatrix()
        
        this.scene.pushMatrix()
        this.scene.translate(0.5,2,3)
        this.name.display()
        this.scene.popMatrix()

        this.scene.popMatrix()
    }
    
}