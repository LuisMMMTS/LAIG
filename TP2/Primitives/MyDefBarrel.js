/**
 * MyDefBarrel
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyDefBarrel extends CGFobject {
	constructor(scene, base, middle, height, slices, stacks) {
		super(scene);
        
        this.base = base; 
        this.middle = middle;
        this.height = height;
        this.slices = slices;
        this.stacks = stacks;
        this.h = (4/3) * this.base;
        this.H = (4/3) * (this.middle - this.base);
        let hipotenusa=Math.sqrt(Math.pow(this.middle,2)+Math.pow((this.height/2),2));
        this.angle=-180-Math.acos(this.base/hipotenusa)-Math.asin(this.base/hipotenusa)*DEGREE_TO_RAD;
        

		this.initBuffers();
	}
	
	initBuffers() {
        
        //let angle = Math.asin() * Math.PI / 180; //30degrees
       
        this.controlPoints = [
            [ //P4
                [this.base, 0, 0, 1],//Q1
                [this.base + this.H, 0, this.H/Math.tan(this.angle), 1],//Q2
                [this.base + this.H, 0, this.height - this.H/Math.tan(this.angle), 1],//Q3
                [this.base, 0, this.height, 1],//Q4

            ],
            [ //P3
                [this.base, this.h, 0, 1],
                [this.base + this.H, (4/3)*(this.base + this.H), this.H/Math.tan(this.angle),1],
                [this.base + this.H, (4/3)*(this.base + this.H), this.height - this.H/Math.tan(this.angle),1],
                [this.base, this.h, this.height, 1],
            ],
            [ //P2
                [-this.base, this.h, 0, 1],
                [-this.base - this.H, (4/3)*(this.base + this.H),this.H/Math.tan(this.angle), 1],
                [-this.base - this.H, (4/3)*(this.base + this.H), this.height - this.H/Math.tan(this.angle), 1],
                [-this.base, this.h, this.height, 1],

            ],
            [ //P1
                [-this.base, 0, 0, 1],//Q1
                [-this.base - this.H, 0,  this.H/Math.tan(this.angle), 1],//Q2
                [-this.base - this.H, 0, this.height - this.H/Math.tan(this.angle) , 1],//Q3
                [-this.base, 0, this.height, 1],//Q4

            ],
        ];

        this.defbarrel = new MyPatch(this.scene, 4,4,this.stacks, this.slices, this.controlPoints);
        
        
    }
    display() {
        
        this.defbarrel.display();
        this.scene.pushMatrix();
    
        this.scene.rotate(Math.PI, 0.0, 0.0, 1.0);
        this.defbarrel.display();

        this.scene.popMatrix();

    }

    /**
	 * @method updateTexCoords
	 * Updates the list of texture coordinates of the rectangle
	 * @param {Array} coords - Array of texture coordinates
	 */
    updateTexCoords(coords) {
        this.texCoords = [...coords];
        this.updateTexCoordsGLBuffers();
      }


	
}
