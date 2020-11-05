
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
        this.nCells = endCell - startCell + 1;
        this.currentIndex = 0;  
        this.activeState = 0;

        this.spriteTime = this.duration/this.nCells;
        
    }

    update(currentTime){
        this.lastTime += currentTime;
        
        //calculate elapsedTime
        let instant = this.lastTime % this.duration;
        
        //calculate which state is active, using elapsed time, duration, n of cells
        //save current state and other variables ( index of current sprite)        
        this.activeState = Math.floor(instant / this.spriteTime) + this.startCell;
        
    }

    display(){
        
        this.spritesheet.activate();

        this.spritesheet.activateCellP(this.activeState); /* pass the shader the offset */

        this.retangle.display();//display base geometry

        this.scene.setActiveShader(this.scene.defaultShader); //set default shader
            
    } 
    
}
