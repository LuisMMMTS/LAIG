/**
 * MyCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCube extends CGFobject {
	constructor(scene, size) {
        super(scene);   
        this.size = size;
        this.trans = this.size / 2.0;
        this.rectangle = new My2SideRectangle(this.scene, -this.trans, -this.trans, this.trans, this.trans);
        
    }
    

	display() {

        // Right
        this.scene.pushMatrix();
        this.scene.translate(this.trans, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.rectangle.display();
		this.scene.popMatrix();
		
       // Back
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -this.trans);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.rectangle.display();
        this.scene.popMatrix();

        // Left
        this.scene.pushMatrix();
        this.scene.translate(-this.trans, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.rectangle.display();
        this.scene.popMatrix();

        // Front
        this.scene.pushMatrix();
        this.scene.translate(0, 0, this.trans);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.rectangle.display();
		this.scene.popMatrix();
		
        // Top
        this.scene.pushMatrix();
        this.scene.translate(0, this.trans, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.rectangle.display();
        this.scene.popMatrix();
 
        // Bottom
        this.scene.pushMatrix();
        this.scene.translate(0, -this.trans, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.rectangle.display();
        this.scene.popMatrix();

    }

    
    
}