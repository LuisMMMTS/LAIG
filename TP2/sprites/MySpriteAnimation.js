
/** 
 * MySpriteAnimation - class that stores 
 */

class MySpriteAnimation extends CGFobject{
    /**
    * @constructor
    * @param scene - 
    */

    constructor(scene, spritesheet, startCell, endCell, duration){
        super(scene);

        this.spritesheet = spritesheet;
        this.startCell = startCell;
        this.endCell = endCell;
        this.duration = duration;
        this.retangle = new MyRectangle(this.scene,-0.5, -0.5, 0.5, 0.5);

        this.lastTime = 0;
        this.elapsedTime = 0;
        this.nCells = endCell - startCell;
        this.currentIndex = 0;
        this.activeState = 0;
        
    }

    update(currentTime){
        //calculate elapsedTime
        this.elapsedTime += (currentTime - this.lastTime);
        this.lastTime = currentTime;

        //calculate which state is active, using elapsed time, duration, n of cells
        //save current state and other variables ( index of current sprite)        
        this.activeState = (this.nCells * this.elapsedTime) / this.duration;
    }
    
    display(){
        this.spritesheet.activateCellP(this.activeState); /* pass the shader the offset */
        
        this.scene.setActiveShader(this.scene.shader); //activate shader
        this.spritesheet.texture.bind(0);//bind in texture*/

        this.retangle.display();//display retangle
        this.scene.setActiveShader(this.scene.defaultShader); //set default shader
                
        
        /*
        - Activate sprite using current index --- activateCellP/activateCellMN
        - display base geometry
        
        */
    }
   
    
    
}
