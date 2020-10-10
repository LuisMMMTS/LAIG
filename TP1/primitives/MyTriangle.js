/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param x1 - x coordinate of the 1st vertex
 * @param y1 - y coordinate of the 1st vertex
 * @param x2 - x coordinate of the 2nd vertex
 * @param y2 - y coordinate of the 2nd vertex
 * @param x3 - x coordinate of the 3rd vertex
 * @param y3 - y coordinate of the 3rd vertex
 */   

class MyTriangle extends CGFobject {
	constructor(scene, x1, y1, x2, y2, x3, y3) {
		super(scene);
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.x3 = x3;
        this.y3 = y3;

		this.initBuffers();
	}
	
	initBuffers() {
        this.verices = [
            this.x1, this.y1, 0, //0
            this.x2, this.y2, 0, //1 
            this.x3, this.y3, 0  //2
        ]

        this.indices = [0,1,2] //only one side

        this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
		]

        this.texCoords = [
			0, 1,
			1, 1,
			0, 0,
			1, 0
		]
		
        this.primitiveType = this.scene.gl.TRIANGLES

        this.initGLBuffers()
    }
    updateTexCoords(coords) {
		//to do
	}

}


