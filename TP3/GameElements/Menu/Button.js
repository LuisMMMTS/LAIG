/**
 * Button
 * @constructor
 * @param {*} scene 
 * @param {*} text - button text
 * @param {*} large - if it is large text or not
 */
class Button{
    /**
     * 
     
     */
    constructor(scene, text, large){
        this.scene = scene
        this.button = new MyCube(scene,1)
        this.buttonText = new MySpriteText(this.scene,text)
        this.picked = false;
        this.large = large;
    }
    pick(){
        this.picked = !this.picked

    }

    getText(){
        return this.buttonText.text
    }

    changeButtonText(text){
        this.buttonText.text = text
    }

    display(){
        this.scene.pushMatrix()
        this.scene.translate(1,0,1)

        if(!this.large)this.scene.scale(2,0.65,1)
        else this.scene.scale(2.9,0.65,1)

        if(this.picked) this.scene.scale(1,1,5)

        this.button.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate(1.15,0.4,2)
        this.scene.scale(0.4,0.8,1)
        this.buttonText.display()
        this.scene.popMatrix()

        if(this.picked) this.pick()
    }
    
}