class MyCircle extends CGFobject{
    constructor(scene, radius, slices){
        super(scene);

        this.slices = slices;
        this.radius = radius;

        this.initBuffers();
    }

    initBuffers(){
        this.vertices = [];
		this.indices = [];
		this.normals = [];
        this.texCoords = [];
        
        var ang = (2*Math.PI/this.slices);

        this.vertices.push(0,0,0);
        this.normals.push(0,0,1);


        for (var i = 0; i < this.slices; i++) {
            this.vertices.push(Math.cos(ang * i) * this.radius, Math.sin(ang * i) * this.radius, 0);
            this.normals.push(0, 0, 1);
        }

        for (var i = 0; i < this.slices - 1; i++) {
        this.indices.push(i + 1, i + 2, 0);
        }

        this.indices.push(this.slices, 1, 0);

        //faltam as textcoords

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateTexCoords(coords) {
		//to do
	}
}