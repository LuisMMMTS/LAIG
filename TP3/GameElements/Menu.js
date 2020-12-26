
class Menu{
    constructor(scene){
        this.scene = scene
        this.menu = new MyCube(scene, 5)
        this.init()
    }

    init(){
        this.name = new MySpriteText(this.scene, "Menu")

        this.undoName = new MySpriteText(this.scene, "Undo")
        this.undo = new MyCylinder(this.scene, 1.5, 0.6, 0.6, 16, 24)
        

        this.resetName = new MySpriteText(this.scene, "Reset")
        this.reset = new MyCylinder(this.scene, 1.5, 0.3, 0.3, 16, 24)
        

        this.quitName = new MySpriteText(this.scene, "Quit")
        this.quit = new MyCylinder(this.scene, 1.5, 0.3, 0.3, 16, 24)
        

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
        this.scene.translate(-1.8,0.4,1.5)
        this.buttonMaterial.apply()
        this.scene.registerForPick(501, this.undo)
        this.undo.display()
        this.scene.popMatrix()
       

        this.scene.pushMatrix()
        this.scene.translate(-1.6,0.5,3.5)
        this.scene.scale(0.3,0.3,1)
        this.undoName.display()
        this.scene.popMatrix()


        this.scene.pushMatrix()
        this.scene.translate(-1.8,-0.5,1.5)
        this.buttonMaterial.apply()
        this.scene.registerForPick(502, this.reset)
        this.reset.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate(0.4,-0.3,2.55)
        this.scene.scale(0.3,0.3,1)
        this.resetName.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate(-1.8,-1.4,1.5)
        this.buttonMaterial.apply()
        this.scene.registerForPick(503, this.quit)
        this.quit.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate(0.25,-1.2,2.55)
        this.scene.scale(0.3,0.3,1)
        this.quitName.display()
        this.scene.popMatrix()
        
        this.scene.pushMatrix()
        this.scene.translate(0.5,2,3)
        this.name.display()
        this.scene.popMatrix()

        this.scene.popMatrix()
    }
    
}