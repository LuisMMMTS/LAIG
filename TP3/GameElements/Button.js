
class Button{
    constructor(scene, text){
        this.scene = scene
        this.button = new MyCube(scene,1)
        this.buttonText = new MySpriteText(this.scene,text)
        
    }

    display(){
        this.scene.pushMatrix()
        this.scene.translate(1,0,1)
        this.scene.scale(2,0.65,1)
        this.button.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate(1.15,0.4,2)
        this.scene.scale(0.4,0.8,1)
        this.buttonText.display()
        this.scene.popMatrix()
    }
    
}