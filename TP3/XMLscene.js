/**
 * XMLscene class, representing the scene that is to be rendered.
 */
class XMLscene extends CGFscene {
    /**
     * @constructor
     * @param {MyInterface} myinterface 
     */
    constructor(myinterface) {
        super();

        this.interface = myinterface;
        this.themes = ["Theme1", "Theme2", "Theme3"];
        this.modes = ['PlayervsPlayer', 'BotvsPlayer', 'PlayervsBot', 'BotvsBot'];
        this.selectedScene = 'Theme1';
        this.gameMode = 'PlayervsPlayer';
        this.selectedTheme = "Theme1";
        this.filenames = new Map();
        this.themeGraphs = new Map();
        this.filenames.set('Theme1', 'scene1.xml').set('Theme2', 'scene2.xml').set('Theme3', 'scene3.xml')
        for(let [key, value] of this.filenames.entries()){
            this.themeGraphs[key] = new MySceneGraph(value, this)
        }

        this.boardSize = 10
        this.playTime = 30
    }   

    /**
     * Initializes the scene, setting some WebGL defaults, initializing the camera and the axis.
     * @param {CGFApplication} application
     */
    init(application) {
        super.init(application);

        this.sceneInited = false;

        this.initCameras();
        
        this.enableTextures(true);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.lightValues = [];

        this.axis = new CGFaxis(this);
        this.displayAxis = true;
        this.displayLights = false;

        //init shaders
        this.shader = new CGFshader(this.gl, "./scenes/shaders/shader.vert","./scenes/shaders/shader.frag");

        
        /*initializes the spritesheet */
        this.fontTexture = new CGFtexture(this, "./scenes/shaders/board.png");
        this.spritesheet = new MySpritesheet(this, "font", this.fontTexture, 16, 16);
        

        this.setUpdatePeriod(1000/60);
        this.setPickEnabled(true);//enable picking
        this.initialTime = 0;

        this.loadingProgressObject = new MyRectangle(this, -1, -.1, 1, .1);
        this.loadingProgress = 0;

        this.defaultAppearance = new CGFappearance(this);

        this.orchestrator = new GameOrchestrator(this, this.boardSize);
        
    }

    /**
     * Initializes the default camera.
     */
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
        this.interface.setActiveCamera(this.camera);
    }
    /**
     * Initializes the scene cameras.
     */

    initXMLCameras(){
        this.cameraID = this.themeGraphs[this.selectedTheme].defaultCameraId;
        this.camera = this.themeGraphs[this.selectedTheme].views[this.themeGraphs[this.selectedTheme].defaultCameraId];
        this.interface.setActiveCamera(this.default);
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    /**
     * Initializes the scene lights with the values read from the XML file.
     */
    initLights() {
        var i = 0;
        // Lights index.
        
        // Reads the lights from the scene graph.
        for (var key in this.themeGraphs[this.selectedTheme].lights) {
            if (i >= 8)
                break;              // Only eight lights allowed by WebCGF on default shaders.
                
            if (this.themeGraphs[this.selectedTheme].hasOwnProperty(key)) {
                
                var graphLight = this.themeGraphs[this.selectedTheme].lights[key];

                this.lights[i].setPosition(...graphLight[1]);
                this.lights[i].setAmbient(...graphLight[2]);
                this.lights[i].setDiffuse(...graphLight[3]);
                this.lights[i].setSpecular(...graphLight[4]);
                
                if(this.displayLights){
                    this.lights[i].setVisible(true);
                }
                else
                    this.lights[i].setVisible(false);
               
                
                if (this.lights[i][0]){
                    this.lights[i].enable();
                }
                else{
                    this.lights[i].disable();
                }
                this.lights[i].update();

                i++;
            }
        }
    }
    /**
     * Update the current camera according to a change in the  cameras dropdown in the interface
     */
    updateCamera(newCamera) {
        this.cameraID = newCamera;
        this.camera = this.themeGraphs[this.selectedTheme].views[this.cameraID];
        this.interface.setActiveCamera(this.camera);
    }
    /**
     * Enables the lights accordingly to the lights chosen in the interface
     */
    setLights() {
        var i = 0;
        // Lights index.
        
        // Reads the lights from the lightValues map.
        for (var key in this.lightValues) {
            if (this.lightValues.hasOwnProperty(key)) {
                this.lights[i].setVisible(this.displayLights);
                if (this.lightValues[key]){
                    this.lights[i].enable();
                }
                else{
                    this.lights[i].disable();
                }		
    
                this.lights[i].update();
    
                i++;
            }
        }
    }


    /** Handler called when the graph is finally loaded. 
     * As loading is asynchronous, this may be called already after the application has started the run loop
     */
    onGraphLoaded() {
        
        this.axis = new CGFaxis(this, this.themeGraphs[this.selectedTheme].referenceLength);

        //default appearance
        this.gl.clearColor(...this.themeGraphs[this.selectedTheme].background)

        this.setGlobalAmbientLight(...this.themeGraphs[this.selectedTheme].ambient);  

        
        //cameras
        this.initCameras();

        this.initXMLCameras();

          //lights
        this.initLights();

        //initializing the interface elements
        if(!this.sceneInited)
            this.interface.createInterface(this.themeGraphs[this.selectedTheme].lights, this.themeGraphs[this.selectedTheme].views, this.themes, this.modes); 
    
      

        this.setUpdatePeriod(100);
        if(!this.sceneInited)
        this.orchestrator.setTheme(this.themeGraphs[this.selectedTheme]);
        this.sceneInited = true;
        

    }

     update(time){
       if(this.initialTime == 0){
            this.initialTime = time/1000;
        }
    
       let delta = (time/1000) - this.initialTime;
       
        //updates animations based on current time
         if(this.sceneInited){

             if(this.themeGraphs[this.selectedTheme].animations == undefined) return;

             for(let animation in this.themeGraphs[this.selectedTheme].animations){ //update keyframeanimations
                this.themeGraphs[this.selectedTheme].animations[animation].update(delta); // delta is the time in seconds since the beginning of the program
             }

             if(this.themeGraphs[this.selectedTheme].spriteanimations == undefined) return;
             
             for(let i = 0; i < this.themeGraphs[this.selectedTheme].spriteanimations.length; i++){ //update spriteanimations
                this.themeGraphs[this.selectedTheme].spriteanimations[i].update(delta);
             }
             this.orchestrator.update(delta);
         }
         
         
     }

     changeTheme(value){
        this.orchestrator.changeTheme(this.themeGraphs[value]);
     }

     changeMode(mode){
         this.orchestrator.changeMode(mode);

     }

     setBoardSize(val){
        console.log(val)
        this.boardSize = val
     }
     setPlayTime(val){
        console.log(val)
        this.orchestrator.setPlayTime(val)
     }

    /**
     * Displays the scene.
     */
    display() {
        // ---- BEGIN Background, camera and axis setup
        this.orchestrator.managePick(this.pickMode, this.pickResults);
		this.clearPickRegistration();
        
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();

        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        this.setLights();
        
        this.pushMatrix();
        
   
        if (this.sceneInited) {
            // Draw axis
            if(this.displayAxis)
                this.axis.display();

            this.defaultAppearance.apply();
            
            //set the active camera, necessary for being able to move the camera around
            this.interface.setActiveCamera(this.camera);

            // Displays the scene (MySceneGraph function).  
            //  console.log(this.graph);
            //this.themeGraphs[this.selectedTheme].displayScene();
            this.orchestrator.display();
            
            
        }
        else{
            // Show some "loading" visuals
            this.setDefaultAppearance();

            this.rotate(-this.loadingProgress/10.0,0,0,1);
            
            this.loadingProgressObject.display();
            this.loadingProgress++;
        }

        this.popMatrix();
        // ---- END Background, camera and axis setup
    }
}