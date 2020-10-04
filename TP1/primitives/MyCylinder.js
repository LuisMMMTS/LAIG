/*
- Base na origem
- eixo central coincidente com Zz
- altura: tamanho na direçao dos zz
- base: raio da base(Z=0)
- topo: raio do topo(Z=altura)
- slices: n de divisoes à volta da circunferencia
- stacks: n de divisoes a longo do eixo dos Z
- tem que ter topo e base
*/
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param height 
 * @param topRadius 
 * @param bottomRadius
 * @param stacks - sections along height
 * @param slices - parts per section
 */    

class MyCylinder extends CGFobject {
	constructor(scene, height, topRadius, bottomRadius, stacks, slices) {
		super(scene);
		this.cylinderBody = new MyCylinderBody(scene, height, topRadius, bottomRadius, stacks, slices);
		this.topCircle = new MyCircle(scene, topRadius,slices);
		this.bottomCircle = new MyCircle(scene, bottomRadius, slices);

		
	}
	
	updateTexCoords(coords) {
		//to do
	  }

}



class MyCylinderBody extends CGFobject{
	constructor(scene, height, topRadius, bottomRadius, stacks, slices) {
		super(scene);
		this.height = height;
		this.topRadius = topRadius;
		this.bottomRadius = bottomRadius;
        this.stacks = stacks;
        this.slices = slices;

		this.initBuffers();
	}

	initBuffers(){
        this.vertices = [];
        this.indices = [];
		this.normals = [];
		this.texCoords = [];

		var ang = 2.0 * Math.PI / this.slices;



		for (var stack = 0; stack <= this.stacks; stack++) {
            var aux_ang = 0.0;
            var r = (this.topRadius - this.bottomRadius) * (stack / this.stacks) + this.bottomRadius;
			var z = this.height * stack / this.stacks;
			
            for (slice = 0; slice <= this.slices; slice++) {
                var x = Math.cos(aux_ang) * r;
				var y = Math.sin(aux_ang) * r;
				
                this.vertices.push(x, y, z);
                this.normals.push(x, y, 0);
                aux_ang += ang;
			}
			
        }
    
        for (var stack = 0; stack < this.stacks; stack++) {
            for (var slice = 0; slice < this.slices; slice++) {
                var i1 = slice + stack * (this.slices + 1);
                var i2 = slice + stack * (this.slices + 1) + 1;
                var i3 = slice + (stack + 1) * (this.slices + 1);
                var i4 = slice + (stack + 1) * (this.slices + 1) + 1;
                this.indices.push(i4, i3, i1);
                this.indices.push(i1, i2, i4);
            }
		}

		for(var stack = 0; stack<=this.stacks; stack++){
			for(var slice=0; slice<=this.slices; slice++){
				this.texCoords.push(1-slice/this.slices, 1-stack/this.stacks);
			}
		}
		
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
	}

	display(){
		this.scene.pushMatrix();

		this.bottomCircle.display();
		this.cylinderBody.display();

		this.pushMatrix();
		this.scene.translate(0,0,this.height);
		this.topCircle.display();
		this.scene.popMatrix();

		this.scene.popMatrix();

	}
	updateTexCoords(coords) {
		//to do
	}

}

