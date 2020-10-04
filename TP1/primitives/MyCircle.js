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

        var aux_ang=0;
        var index=0;
        var x0,x1;
        var y0, y1;


        for(var i=0; i<this.slices; i++){
            x0 = Math.cos(aux_ang)*this.radius;
            y0 = Math.sin(aux_ang)*this.radius;

            aux_ang+=ang;

            x1 = Math.cos(aux_ang)*this.radius;
            y1 = Math.sin(aux_ang)*this.radius;

            this.vertices.push(x0,y0,0);
            this.vertices.push(x1,y1,0);
            this.indices.push(0,index+1, index+2);

            index+=2;

            this.normals.push(0,0,1);
            this.normals.push(0,0,1);
        }

        //faltam as textcoords

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    updateTexCoords(coords) {
		//to do
	}
}