/** 
 * MySpritesheet - class that stores 
 */

class MySpritesheet extends CGFobject{
    /**
    * @constructor
    * @param scene
    * @param {CGFTexture} texture - texture of the spritesheet
    * @param sizeM - number of columns (int)
    * @param sizeN - number of rows (int)
    */

    constructor(scene, id, texture, sizeM, sizeN){
        super(scene);
        this.id = id;
        this.texture = texture;
        this.sizeM = sizeM;
        this.sizeN = sizeN;

        this.scaleM = 1/sizeM;
        this.scaleN = 1/sizeN;

        //initialize shader -- created in XMLscene
        this.scene.shader.setUniformsValues({scaleM: this.scaleM});
        this.scene.shader.setUniformsValues({scaleN: this.scaleN});
        this.scene.shader.setUniformsValues({uSampler:0});

    }

    /*
    1. Pass cell parameters to shader --- shader.setUniformValues() 
    2. Activate Shader --- this.scene.setActiveShader()

    Note: dont forget to activate default shader when done
    */

    /**
    * @activateCellMN - activates the cell with coordinates(m,n), passing cell paramets to shader 
    * @param sizeM - number of the column (int)
    * @param sizeN - number of the row (int)
    */
    activateCellMN(m,n){
       this.scene.shader.setUniformsValues({offsetM: m * this.scaleM});
       this.scene.shader.setUniformsValues({offsetN: n * this.scaleN});

    }

    /**
    * @activateCellP  activates the cell in position p, assuming cells count start in 0 in top-left of the texture and passes from left to right and form up to down
    * @param p - number of the column (int)
    */
    activateCellP(p){
       let m = p % this.scaleM; /*the corresponding column is the rest of the division for the number of columns*/
       let n = Math.floor(p / this.scaleM); /*the correspondig row is the division for the number of columns rounded down */

       this.activateCellMN(m,n);
    }
    
    
    
}
