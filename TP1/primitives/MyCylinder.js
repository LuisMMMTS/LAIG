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
		this.height = height;
		this.topRadius = topRadius;
		this.bottomRadius = bottomRadius;
        this.stacks = stacks;
        this.slices = slices;

		this.initBuffers();
	}
	
	initBuffers() {
		
	}

}

