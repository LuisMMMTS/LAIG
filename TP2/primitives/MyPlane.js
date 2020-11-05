/**
 * MyPlane
 * @constructor
 * @param scene - Reference to MyScene object
 * @param nDivsU - number of divisions in U direction
 * @param nDivsV - number of divisions in V direction
 */

 /*de forma a gerar, utilizando NURBS, um plano de dimensões 1 x 1 unidades, assente em XZ, 
 centrado na origem e com a face visível apontando para +Y. */

class MyPlane extends CGFobject {
	constructor(scene, nDivsU, nDivsV) {
		super(scene);
        
        this.nDivsU = nDivsU;
        this.nDivsV = nDivsV;

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

