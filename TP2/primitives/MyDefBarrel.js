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


		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [];

		//Counter-clockwise reference of vertices
		this.indices = [];

		//Facing Z positive
		this.normals = [];
		
		/*
		Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */

		this.texCoords = []
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
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

