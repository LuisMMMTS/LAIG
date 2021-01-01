class GameBoard{
    constructor(scene, size){
        this.scene = scene
        this.size = size
        this.boardBase = new MyCube(this.scene,1)
        this.border1 = new MyCube(this.scene,1)
        this.border2 = new MyCube(this.scene,1)
        this.border3 = new MyCube(this.scene,1)
        this.border4 = new MyCube(this.scene,1)
    }
    display(){
        let border = (this.size*1.4 - this.size *1.15)-0.25
        
        this.scene.pushMatrix()
        this.scene.translate((this.size)/2.0*1.4-border,-0.3,(this.size/2.0*1.4)-border);
        this.scene.scale(this.size*1.4, 0.2, this.size*1.4)
        this.boardBase.display()
        this.scene.popMatrix()

       
        this.scene.pushMatrix()
        this.scene.translate((this.size)/2.0*1.4-border,-0.2,-border-0.5)
        this.scene.scale(this.size*1.4,1,1)
        this.border1.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate((this.size)/2.0*1.4-border,-0.2,this.size*1.4-border)
        this.scene.scale(this.size*1.4,1,1)
        this.border2.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate(-1.5,-0.2,(this.size/2.0*1.4)-border-0.25)
        this.scene.scale(1,1,this.size*1.7)
        this.scene.rotate(Math.PI/2.0,0,1,0)
        this.border3.display()
        this.scene.popMatrix()


        this.scene.pushMatrix()
        this.scene.translate((this.size/2.0*1.4)+2.5,-0.2,(this.size/2.0*1.4)-border-0.25)
        this.scene.scale(1,1,this.size*1.7)
        this.scene.rotate(Math.PI/2.0,0,1,0)
        this.border4.display()
        this.scene.popMatrix()
    }

}