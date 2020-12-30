class CustomPiece{

    constructor(){
        this.cube = new MyCube(this.scene, 0.5);
        this.cylinder = 
        this.sphere = 
        this.cone = 
    }

    display(type){

        if(this.type == "cube") this.cube.display()
        if(this.type == "cylinder") this.cylinder.display()
        if(this.type == "sphere") this.sphere.display()
        if(this.type == "cone") this.cone.display()

    }

}