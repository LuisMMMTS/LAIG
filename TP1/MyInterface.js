/**
* MyInterface class, creating a GUI interface.
*/
class MyInterface extends CGFinterface {
    /**
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Initializes the interface.
     * @param {CGFapplication} application
     */
    init(application) {
        super.init(application);
        // init GUI. For more information on the methods, check:
        //  http://workshop.chromeexperiments.com/examples/gui

        this.gui = new dat.GUI();

        // add a group of controls (and open/expand by defult)

        this.initKeys();

        return true;
    }

    /**
     * initKeys
     */
    initKeys() {
        this.scene.gui=this;
        this.processKeyboard=function(){};
        this.activeKeys={};
    }

    processKeyDown(event) {
        this.activeKeys[event.code]=true;
    };

    processKeyUp(event) {
        this.activeKeys[event.code]=false;
    };

    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    };

    createInterface(lights, views){
        this.addAxisCheckBox();
        this.addLightsCheckbox(lights);
        this.addCamerasDropDown(views);
    }

    addLightsCheckbox(lights){
         var  group = this.gui.addFolder("Lights");
        group.open();

        /*this.scene.lightValues = [];

        for(var key in lights){
            if(lights.hasOwnProperty(key)){

                this.scene.lightsValues[key] = lights[key][0];
                group.add(this.scene.lightValues, key);
            }
        }*/
      
    }

    addCamerasDropDown(views){
        /*var viewValues = [];
        for(var key in views){
            if(views.hasOwnProperty(key)){
                viewValues.push(key)
            }
        }*/
        
       /* this.gui.add(this.scene, "Camera", viewValues)
            .name("Current camera")
            .onChange(val => this.scene.setCurrentCamera(val));*/
    }

    addAxisCheckBox(){
        this.gui.add(this.scene,'displayAxis').name("Display Axis");
    }
}