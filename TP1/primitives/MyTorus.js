/*
- centrado na origem
- simetria à volta do eixo dos Z
- raio interior:
- raio exterior:
*/

/**
 * MyTorus
 * @constructor
 * @param scene - Reference to MyScene object
 * @param inner - inner radius
 * @param outer - outer radius
 * @param slices - sections around the inner radius
 * @param loops - sections around the outer radius
 */    

class MyTorus extends CGFobject {
	constructor(scene, inner, outer, slices, loops) {
		super(scene);
		this.inner = inner;
		this.outer = outer;
		this.slices = slices;
        this.loops = loops;

		this.initBuffers();
	}
	
	initBuffers() {
		
	}

}