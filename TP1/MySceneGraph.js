const DEGREE_TO_RAD = Math.PI / 180;

// Order of the groups in the XML document.
var INITIALS_INDEX = 0;
var VIEWS_INDEX = 1;
var ILLUMINATION_INDEX = 2;
var LIGHTS_INDEX = 3;
var TEXTURES_INDEX = 4;
var MATERIALS_INDEX = 5;
var NODES_INDEX = 6;

/**
 * MySceneGraph class, representing the scene graph.
 */
class MySceneGraph {

    /**
     * Constructor for MySceneGraph class.
     * Initializes necessary variables and starts the XML file reading process.
     * @param {string} filename - File that defines the 3D scene
     * @param {XMLScene} scene
     */
    constructor(filename, scene) {
        this.loadedOk = null;

        // Establish bidirectional references between scene and graph.
        this.scene = scene;
        scene.graph = this;

        this.nodes = []; //all nodes of the scene

        this.idRoot = null; // The id of the root element.

        this.axisCoords = [];
        this.axisCoords['x'] = [1, 0, 0];
        this.axisCoords['y'] = [0, 1, 0];
        this.axisCoords['z'] = [0, 0, 1];

        // File reading 
        this.reader = new CGFXMLreader();

        /*
         * Read the contents of the xml file, and refer to this class for loading and error handlers.
         * After the file is read, the reader calls onXMLReady on this object.
         * If any error occurs, the reader calls onXMLError on this object, with an error message
         */
        this.reader.open('scenes/' + filename, this);
    }

    /*
     * Callback to be executed after successful reading
     */
    onXMLReady() {
        this.log("XML Loading finished.");
        var rootElement = this.reader.xmlDoc.documentElement;

        // Here should go the calls for different functions to parse the various blocks
        var error = this.parseXMLFile(rootElement);

        if (error != null) {
            this.onXMLError(error);
            return;
        }

        this.loadedOk = true;

        // As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
        this.scene.onGraphLoaded();
    }

    /*
     * Callback to be executed on any read error, showing an error on the console.
     * @param {string} message
     */
    onXMLError(message) {
        console.error("XML Loading Error: " + message);
        this.loadedOk = false;
    }

    /**
     * Callback to be executed on any minor error, showing a warning on the console.
     * @param {string} message
     */
    onXMLMinorError(message) {
        console.warn("Warning: " + message);
    }

    /**
     * Callback to be executed on any message.
     * @param {string} message
     */
    log(message) {
        console.log("   " + message);
    }

    /**
     * Parses the XML file, processing each block. Also makes sure the tags are in the correct order and aren't missing
     * @param {XML root element} rootElement
     */
    parseXMLFile(rootElement) {
        if (rootElement.nodeName != "lsf") //the file must begin and end with lsf tag
            return "root tag <lsf> missing";

        var nodes = rootElement.children;

        // Reads the names of the nodes to an auxiliary buffer.
        var nodeNames = [];

        for (var i = 0; i < nodes.length; i++) {
            nodeNames.push(nodes[i].nodeName);
        }

        var error;

        // Processes each node, verifying errors.

        // <initials>
        var index;
        if ((index = nodeNames.indexOf("initials")) == -1)
            return "tag <initials> missing";
        else {
            if (index != INITIALS_INDEX)
                this.onXMLMinorError("tag <initials> out of order " + index);

            //Parse initials block
            if ((error = this.parseInitials(nodes[index])) != null)
                return error;
        }

        // <views>
        if ((index = nodeNames.indexOf("views")) == -1)
            return "tag <views> missing";
        else {
            if (index != VIEWS_INDEX)
                this.onXMLMinorError("tag <views> out of order");

            //Parse views block
            if ((error = this.parseViews(nodes[index])) != null)
                return error;
        }

        // <illumination>
        if ((index = nodeNames.indexOf("illumination")) == -1)
            return "tag <illumination> missing";
        else {
            if (index != ILLUMINATION_INDEX)
                this.onXMLMinorError("tag <illumination> out of order");

            //Parse illumination block
            if ((error = this.parseIllumination(nodes[index])) != null)
                return error;
        }

        // <lights>
        if ((index = nodeNames.indexOf("lights")) == -1)
            return "tag <lights> missing";
        else {
            if (index != LIGHTS_INDEX)
                this.onXMLMinorError("tag <lights> out of order");

            //Parse lights block
            if ((error = this.parseLights(nodes[index])) != null)
                return error;
        }
        // <textures>
        if ((index = nodeNames.indexOf("textures")) == -1)
            return "tag <textures> missing";
        else {
            if (index != TEXTURES_INDEX)
                this.onXMLMinorError("tag <textures> out of order");

            //Parse textures block
            if ((error = this.parseTextures(nodes[index])) != null)
                return error;
        }

        // <materials>
        if ((index = nodeNames.indexOf("materials")) == -1)
            return "tag <materials> missing";
        else {
            if (index != MATERIALS_INDEX)
                this.onXMLMinorError("tag <materials> out of order");

            //Parse materials block
            if ((error = this.parseMaterials(nodes[index])) != null)
                return error;
        }

        // <nodes>
        if ((index = nodeNames.indexOf("nodes")) == -1)
            return "tag <nodes> missing";
        else {
            if (index != NODES_INDEX)
                this.onXMLMinorError("tag <nodes> out of order");

            //Parse nodes block
            if ((error = this.parseNodes(nodes[index])) != null)
                return error;
        }
        this.log("all parsed");
    }

    /**
     * Parses the <initials> block. 
     * @param {initials block element} initialsNode
     */
    parseInitials(initialsNode) {
        var children = initialsNode.children;
        var nodeNames = [];

        for (var i = 0; i < children.length; i++)
            nodeNames.push(children[i].nodeName);

        var rootIndex = nodeNames.indexOf("root");
        var referenceIndex = nodeNames.indexOf("reference");

        // Get root of the scene.
        if(rootIndex == -1)
            return "No root id defined for scene.";

        var rootNode = children[rootIndex];
        var id = this.reader.getString(rootNode, 'id');

        if (id == null)
            return "No root id defined for scene.";

        this.idRoot = id;


        // Get axis length        
        if(referenceIndex == -1)
            this.onXMLMinorError("no axis_length defined for scene; assuming 'length = 1'");

        var refNode = children[referenceIndex];
        var axis_length = this.reader.getFloat(refNode, 'length');
        if (axis_length == null)
            this.onXMLMinorError("no axis_length defined for scene; assuming 'length = 1'");

        this.referenceLength = axis_length || 1;

        this.log("Parsed initials");

        return null;
    }

    /**
     * Parses the <views> block.
     * @param {view block element} viewsNode
     */
    //TO DO:store the default camera
    parseViews(viewsNode) {
        this.views = [];
        this.defaultCameraId = this.reader.getString(viewsNode, 'default');//the default camera id is stored in position 0
        if(this.defaultCameraId == null)
            return "No default view defined";
        var children = viewsNode.children;
        var failed = 0, hasOne = 0;
        for(let i = 0; i < children.length; i++){
            
            var new_node = children[i];

            if (new_node.nodeName != "perspective" && new_node.nodeName != "ortho"){ //check if tag is correctly defined
                this.onXMLMinorError("Unknown tag in [VIEWS] parsing: " + new_node.nodeName);
                continue;
            }

            //check if node id still doesn't already exist
            if (this.views[new_node.id] != null){
                this.onXMLError("[views] id repeated " + new_node.id);
                return;
            }

            if ((new_node.nodeName == "perspective" || new_node.nodeName == "ortho") && !failed){
                var camera = this.parseCamera(new_node);
                if(camera != null)
                    this.views[new_node.id] = camera;
                else 
                    failed = 1;
            }
            if(failed == 0 && hasOne == 0){// if there isn't a fully right parsed view and this one hasn't failed, it means we have a fully right parsed view
                hasOne = 1;
            }
            failed = 0;
        }

        if(this.views[this.defaultCameraId] == null){
            this.onXMLError("The assigned default view is not defined");
            //criar uma camara default 
            //guardar id em this.defaultCameraID
            //dar push nas views
        }

        this.log("views and cameras loadded successfully");
        return null;
    }

      /**   
     * Parses the camera information
     * @param new_node - new camera node 
     */

    parseCamera(new_node){
        let parameters = new_node.children;
        let from = null;
        let to = null;
        let up = [0,1,0]; //default values, since it is optional to define it 

        for(let i = 0; i < parameters.length; i++){
            if (parameters[i].nodeName == "from"){
                from = [this.reader.getFloat(parameters[i], 'x'),this.reader.getFloat(parameters[i], 'y'),this.reader.getFloat(parameters[i], 'z')];

            }
            else if (parameters[i].nodeName == "to"){
                to = [this.reader.getFloat(parameters[i], 'x'),this.reader.getFloat(parameters[i], 'y'),this.reader.getFloat(parameters[i], 'z')];
            }
            else if(parameters[i].nodeName == "up" && new_node.nodeName != "ortho"){
                this.onXMLMinorError("[VIEWS] \"up\" tag declared on non ortho cam");
            }
            else if((parameters[i].nodeName == "up" && new_node.nodeName == "ortho")){
                up = [this.reader.getFloat(parameters[i], 'x'),this.reader.getFloat(parameters[i], 'y'),this.reader.getFloat(parameters[i], 'z')];
            
            }
            else{
                this.onXMLError("[VIEWS] unknown/missing tag <" + parameters[i].nodeName + ">");
                return;
            }
        }

        if (new_node.nodeName == "perspective"){
            return new CGFcamera(this.reader.getFloat(new_node, 'angle') * DEGREE_TO_RAD, this.reader.getFloat(new_node, 'near'), this.reader.getFloat(new_node, 'far'), vec3.fromValues(from[0], from[1], from[2]), vec3.fromValues(to[0], to[1], to[2]));
        }
        else if (new_node.nodeName == "ortho"){
            return new CGFcameraOrtho(this.reader.getFloat(new_node, 'left'), this.reader.getFloat(new_node, 'right'), this.reader.getFloat(new_node, 'bottom'), this.reader.getFloat(new_node, 'top'), this.reader.getFloat(new_node, 'near'), this.reader.getFloat(new_node, 'far'), vec3.fromValues(from[0], from[1], from[2]), vec3.fromValues(to[0], to[1], to[2]),vec3.fromValues(up[0], up[1], up[2]));
        }
        else{
            this.onXMLError("Exited parse camera because camera node not ortho or perspective");
            return;
        }
    }

    /**
     * Parses the <illumination> node.
     * @param {illumination block element} illuminationsNode
     */
    parseIllumination(illuminationsNode) {

        var children = illuminationsNode.children;
        var defaultAmbient = [0.2,0.2,0.2,1.0];
        var defaultBackground = [0.7,0.8,1.0,1.0];
        this.ambient = [];
        this.background = [];

        var nodeNames = [];

        for (var i = 0; i < children.length; i++)
            nodeNames.push(children[i].nodeName);

        var ambientIndex = nodeNames.indexOf("ambient");
        var backgroundIndex = nodeNames.indexOf("background");

        var color = this.parseColor(children[ambientIndex], "ambient");
        if (!Array.isArray(color)){
            this.onXMLError("No ambient illumination defined");
            this.ambient = defaultAmbient;
        }
        else
            this.ambient = color;

        color = this.parseColor(children[backgroundIndex], "background");
        if (!Array.isArray(color)){
            this.onXMLError("No background illumination defined");
            this.background = defaultBackground;
        }
        else
            this.background = color;

        this.log("Parsed Illumination.");

        return null;
    }

    /**
     * Parses the <light> node.
     * @param {lights block element} lightsNode
     */
    parseLights(lightsNode) {

        var children = lightsNode.children;
        this.lights = [];
        var numLights = 0;
        var grandChildren = [];
        var nodeNames = [];

        // Any number of lights.
        for (var i = 0; i < children.length; i++) {

            // Storing light information
            var global = [];
            var attributeNames = [];
            var attributeTypes = [];

            //Check type of light
            if (children[i].nodeName != "light") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }
            else {
                attributeNames.push(...["enable", "position", "ambient", "diffuse", "specular"]);
                attributeTypes.push(...["boolean","position", "color", "color", "color"]);
            }

            // Get id of the current light.
            var lightId = this.reader.getString(children[i], 'id');
            if (lightId == null)
                return "no ID defined for light";

            // Checks for repeated IDs.
            if (this.lights[lightId] != null)
                return "ID must be unique for each light (conflict: ID = " + lightId + ")";

            grandChildren = children[i].children;

            // Specifications for the current light.

            nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }

            for (var j = 0; j < attributeNames.length; j++) {
                var attributeIndex = nodeNames.indexOf(attributeNames[j]);

                if (attributeIndex != -1) {
                    if (attributeTypes[j] == "boolean")
                        var aux = this.parseBoolean(grandChildren[attributeIndex], "value", "enabled attribute for light of ID" + lightId);
                    else if (attributeTypes[j] == "position")
                        var aux = this.parseCoordinates4D(grandChildren[attributeIndex], "light position for ID" + lightId);
                    else
                        var aux = this.parseColor(grandChildren[attributeIndex], attributeNames[j] + " illumination for ID" + lightId);

                    if (typeof aux === 'string')
                        return aux;

                    global.push(aux);
                }
                else
                    return "light " + attributeNames[i] + " undefined for ID = " + lightId;
            }
            this.lights[lightId] = global;
            numLights++;
        }

        if (numLights == 0)
            return "at least one light must be defined";
        else if (numLights > 8)
            this.onXMLMinorError("too many lights defined; WebGL imposes a limit of 8 lights");

        this.log("Parsed lights");
        return null;
    }

    /**
     * Parses the <textures> block. 
     * @param {textures block element} texturesNode
     */
    parseTextures(texturesNode) {

        let texturesChildNodes=texturesNode.children;
        this.textures=[];
        let workingDirectory="./scenes/";
        this.defaultTexture = new CGFtexture(this.scene, "./scenes/images/defaultTexture.jpg");
        this.textures["default"] = this.defaultTexture;

        //For each texture in textures block, check ID and file path

        for (let i = 0; i < texturesChildNodes.length; i++){
            if (texturesChildNodes[i].nodeName !== "texture") { 
                this.onXMLMinorError("[TEXTURE] invalid node name");
                continue;
            }

            let id = this.reader.getString(texturesChildNodes[i], 'id')

            if (id.length === 0) {
                this.onXMLMinorError("[TEXTURE] no texture ID defined, skipping it");
                continue;
            }
            if (this.textures[id] != null && id!="default") {
                this.onXMLMinorError("[TEXTURE] repeated id " + id+" skipping it");
                continue;
            }

            let path = this.reader.getString(texturesChildNodes[i], 'path');

            if (!(path.includes("exture")||path.includes("mages"))){ //check if full path is defined, bewaring of capital leters in the beggining of folder name
                path=workingDirectory+"images/"+path;
            }
            
            if(path == null){ // if the path is null we ignore this texture
                this.onXMLMinorError("[TEXTURE] invalid path");
                continue;
            }

            this.textures[id] = new CGFtexture(this.scene, path);

            this.textures["default"] = new CGFtexture(this.scene, path);

            
        }
        this.log("Textures successfully parsed");
        return null;
    }

    /**
     * Parses the <materials> node.
     * @param {materials block element} materialsNode
     */
    parseMaterials(materialsNode) {
        var children = materialsNode.children;
        var color = []; 

        this.materials = [];

        this.defaultMaterial = new CGFappearance(this.scene);
        this.defaultMaterial.setShininess(1.0);
        this.defaultMaterial.setSpecular([1,1,1,0.5]);
        this.defaultMaterial.setDiffuse([1,1,1,0.5]);
        this.defaultMaterial.setAmbient([1,1,1,0.5]);
        this.defaultMaterial.setEmission([0.5,0.5,0.5,1.0]); 
        this.materials["default"] = this.defaultMaterial;

        var grandChildren = []; //this will be the color parameter -> shininess, speccular etc.
        var nodeNames = [];


        if (children.length < 1){
            return this.onXMLError("no materials parsed");
        }

        // Any number of materials.
        for (var i = 0; i < children.length; i++) {
            if (children[i].nodeName != "material") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }   

            // Get the id of the current material.
            var materialID = this.reader.getString(children[i], 'id');
            if (materialID == null)
                return this.onXMLMinorError("no ID defined for material");
            if (materialID.toLowerCase() == "null")
                return this.onXMLError("material id cannot be named null");


            // Checks for repeated IDs.
            if (this.materials[materialID] != null && materialID!="default")
                return "ID must be unique for each material (conflict: ID = " + materialID + ")";

            
            grandChildren = children[i].children;
            let shininess = null;
            let specular = [];
            let diffuse = [];
            let ambient = [];
            let emissive = [];

            for (let j = 0; j < grandChildren.length; j++){

                if(grandChildren[j].nodeName == "shininess"){
                    shininess = this.reader.getFloat(grandChildren[j],"value");
                    if(shininess == null || isNaN(shininess))
                        continue;
                }
                else if (grandChildren[j].nodeName=="specular"){
                    specular = this.parseColor(grandChildren[j],"Specular component in id"+materialID);
                }
                else if (grandChildren[j].nodeName=="diffuse"){
                    diffuse = this.parseColor(grandChildren[j], "diffuse component in id"+materialID);
                }
                else if (grandChildren[j].nodeName=="ambient"){
                    ambient = this.parseColor(grandChildren[j],"ambient component in id"+materialID);
                }
                else if (grandChildren[j].nodeName=="emissive"){
                    emissive = this.parseColor(grandChildren[j], "emissive component in id"+materialID);
                }
                if (!Array.isArray(specular)||!Array.isArray(diffuse) || !Array.isArray(ambient)|| !Array.isArray(emissive)){
                    continue;
                }
                var material = new CGFappearance(this.scene);
                material.setShininess(shininess);
                material.setSpecular(specular[0],specular[1],specular[2],specular[3]);
                material.setDiffuse(diffuse[0], diffuse[1],diffuse[2],diffuse[3]);
                material.setAmbient(ambient[0], ambient[1],ambient[2],ambient[3]);
                material.setEmission(emissive[0],emissive[1],emissive[2],emissive[3]);  
                this.materials[materialID] = material;
                
            }
        }

        this.log("Parsed materials");
        return null;
    }


    /**
   * Parses the <nodes> block.
   * @param {nodes block element} nodesNode
   */
    parseNodes(nodesNode) {
        var children = nodesNode.children;

        this.nodes = [];

        var grandChildren = [];
        var grandgrandChildren = [];
        var nodeNames = [];

        // Any number of nodes.
        for (var i = 0; i < children.length; i++) {
            
            if (children[i].nodeName != "node") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current node.
            var nodeID = this.reader.getString(children[i], 'id');
            if (nodeID == null)
                return "no ID defined for nodeID";

            // Checks for repeated IDs.
            if (this.nodes[nodeID] != null)
                return "ID must be unique for each node (conflict: ID = " + nodeID + ")";

            grandChildren = children[i].children;

            nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }

            var transformationsIndex = nodeNames.indexOf("transformations");
            var materialIndex = nodeNames.indexOf("material");
            var textureIndex = nodeNames.indexOf("texture");
            var descendantsIndex = nodeNames.indexOf("descendants");


            // Transformations
            if (transformationsIndex == null){
                this.onXMLMinorError("transformations not defined for node id: " + nodeID);
            }

            let matrix = mat4.create();
            let transformations = grandChildren[transformationsIndex].children;
            for (let j = 0; j < transformations.length; j++){
                this.log(nodeID);
                if (transformations[j].nodeName == "translation"){
                    let x = this.reader.getFloat(transformations[j], "x");
                    let y = this.reader.getFloat(transformations[j], "y");
                    let z = this.reader.getFloat(transformations[j], "z");
                    if (x == null || y == null || z == null|| isNaN(x) || isNaN(y) || isNaN(z)) {
                        return this.onXMLError("[NODE] missing/not number values for translation node: " + nodeID);
                    }

                    mat4.translate(matrix, matrix, new vec3.fromValues(x, y, z));

                }
                else if (transformations[j].nodeName == "rotation"){
                    let axis = this.reader.getString(transformations[j],"axis");
                    let angle = this.reader.getString(transformations[j],"angle");

                    if (axis == null || (axis != "x" && axis != "y" && axis != "z")|| angle == null || isNaN(angle)) {
                        return this.onXMLError("[NODE] wrong axis or angle on rotation node: " + nodeID);
                    }
                    
                    angle = angle * DEGREE_TO_RAD;
                    mat4.rotate(matrix, matrix,angle, this.axisCoords[axis]);
                
                }
                else if(transformations[j].nodeName == "scale"){
                    let sx = this.reader.getFloat(transformations[j], "sx");
                    let sy = this.reader.getFloat(transformations[j], "sy");
                    let sz = this.reader.getFloat(transformations[j], "sz");

                    if (sx == null || sy == null || sz == null|| isNaN(sx) || isNaN(sy) || isNaN(sz)) {
                        return this.onXMLError("[NODE] missing/not number values for scale node: " + nodeID);
                    }

                    mat4.scale(matrix,matrix, new vec3.fromValues(sx,sy,sz));
                }
                else{
                    this.onXMLError("[NODE] unknown tag: " + transformations[j].nodeName);
                } 
            }
            

            // Material
            let materialID = this.reader.getString(grandChildren[materialIndex], "id");

            if(materialID !== "null"){//case material parameter does not exist 
                if(this.materials[materialID] == null){ //not on materials defined
                    this.onXMLMinorError("[NODE] Material with ID: " + materialID + " does not exist. Error on node: " + nodeID);
                }
            }
            
            // Texture
            let textureId = this.reader.getString(grandChildren[textureIndex],"id");
            
            if (textureId == null) {//case material parameter does not exist
                return this.onXMLMinorError("[NODE] texture ID is not valid on node ID: " + nodeID);
            }

            if (textureId.toLowerCase() !="null" && textureId.toLowerCase() !="clear"){
                if (this.textures[textureId] == null){
                    this.onXMLMinorError("[NODE] Texture ID: " + textureId + " does not exist. Error on node: " + nodeID);
                }
            }

            let amplificationNodes = grandChildren[textureIndex].children;
            let afs = 1;
            let aft = 1; //if amplification is not defined, the next cycle wont run and this will be the default values

            for (let j = 0; j < amplificationNodes.length; j++){
                if (amplificationNodes[j].nodeName != "amplification"){
                    return this.onXMLError("Unknown section on textures children, where amplificaton should be. node Id; " + nodeID);
                }
                else{
                    afs = this.reader.getFloat(amplificationNodes[j], "afs");
                    aft = this.reader.getFloat(amplificationNodes[j], "aft");

                    if (aft == null || afs == null || isNaN(afs) || isNaN(aft)){
                        this.onXMLMinorError("wrong amplification values in node: "+ nodeID);
                        afs = 1;
                        aft = 1;
                    }
                }
            }

            

            // Descendants
            let descendants = [];
            let primitives = [];
            let descendant = null;

            for (let j = 0; j < grandChildren[descendantsIndex].children.length; j++){
                descendant = grandChildren[descendantsIndex].children[j];
                if(descendant.nodeName == "noderef"){
                    descendants.push(this.reader.getString(descendant,"id"));
                }
                else if(descendant.nodeName == "leaf"){
                    let type = (this.reader.getString(descendant,"type"));
                    switch(type){
                        case "rectangle":
                            var x1 = this.reader.getFloat(descendant,"x1");
                            var y1 = this.reader.getFloat(descendant,"y1");
                            var x2 = this.reader.getFloat(descendant,"x2");
                            var y2 = this.reader.getFloat(descendant,"y2");
                            primitives.push(new MyRectangle(this.scene,x1,y1,x2,y2));
                            break;
                        case "cylinder":
                            var height = this.reader.getFloat(descendant,"height");
                            var topRadius = this.reader.getFloat(descendant,"topRadius");
                            var bottomRadius = this.reader.getFloat(descendant,"bottomRadius");
                            var stacks = this.reader.getFloat(descendant,"stacks");
                            var slices = this.reader.getFloat(descendant,"slices");                            
                            primitives.push(new MyCylinder(this.scene,height, topRadius, bottomRadius, stacks, slices));
                            break;
                        
                        case "sphere":
                            var radius = this.reader.getFloat(descendant,"radius");
                            var slices = this.reader.getFloat(descendant,"slices");
                            var stacks = this.reader.getFloat(descendant,"stacks");
                            primitives.push(new MySphere(this.scene,radius, slices, stacks));
                            break;

                        case "torus":
                            var inner = this.reader.getFloat(descendant,"inner");
                            var outer = this.reader.getFloat(descendant,"outer");
                            var loops = this.reader.getFloat(descendant,"loops");
                            var slices = this.reader.getFloat(descendant,"slices");
                            primitives.push(new MyTorus(this.scene,inner, outer, slices, loops));
                            break;

                        case "triangle":
                            var x1 = this.reader.getFloat(descendant,"x1");
                            var y1 = this.reader.getFloat(descendant,"y1");
                            var x2 = this.reader.getFloat(descendant,"x2");
                            var y2 = this.reader.getFloat(descendant,"y2");
                            var x3 = this.reader.getFloat(descendant,"x3");
                            var y3 = this.reader.getFloat(descendant,"y3");
                            primitives.push(new MyTriangle(this.scene,x1,y1,x2,y2,x3,y3));
                            break;
                        default:
                            this.onXMLMinorError("Unknown leaf type in node id: "+ nodeID);
                    }

                }
                else{
                    this.onXMLMinorError("Unknown descendent type in node id: "+ nodeID);
                }
                
            }
            let node = new Node(nodeID);
            node.setChildren(descendants);
            node.setLeafs(primitives);
            node.setTexture(textureId);
            node.setMaterial(materialID);
            node.setTransformation(matrix);
            this.nodes[nodeID] = node;
            
        }
        this.log("Parsed nodes");
        
        return null;
    }
    /**
     * Parse a boolean from a node with ID = id
     * @param {block element} node
     * @param name - name of the tag
     * @param {message to be displayed in case of error} messageError
     */

    parseBoolean(node, name, messageError){
        var boolVal = true;
        boolVal = this.reader.getBoolean(node, name);
        if (!(boolVal != null && !isNaN(boolVal) && (boolVal == true || boolVal == false)))
            this.onXMLMinorError("unable to parse value component " + messageError + "; assuming 'value = 1'");

        return boolVal || 1;
    }   

    /**
     * Parse the coordinates from a node with ID = id
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseCoordinates3D(node, messageError) {
        var position = [];

        // x
        var x = this.reader.getFloat(node, 'x');
        if (!(x != null && !isNaN(x)))
            return "unable to parse x-coordinate of the " + messageError;

        // y
        var y = this.reader.getFloat(node, 'y');
        if (!(y != null && !isNaN(y)))
            return "unable to parse y-coordinate of the " + messageError;

        // z
        var z = this.reader.getFloat(node, 'z');
        if (!(z != null && !isNaN(z)))
            return "unable to parse z-coordinate of the " + messageError;

        position.push(...[x, y, z]);

        return position;
    }

    /**
     * Parse the coordinates from a node with ID = id
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseCoordinates4D(node, messageError) {
        var position = [];

        //Get x, y, z
        position = this.parseCoordinates3D(node, messageError);

        if (!Array.isArray(position))
            return position;


        // w
        var w = this.reader.getFloat(node, 'w');
        if (!(w != null && !isNaN(w)))
            return "unable to parse w-coordinate of the " + messageError;

        position.push(w);

        return position;
    }

    /**
     * Parse the color components from a node
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseColor(node, messageError) {
        var color = [];

        // R
        var r = this.reader.getFloat(node, 'r');
        if (!(r != null && !isNaN(r) && r >= 0 && r <= 1))
            return this.onXMLError("unable to parse R component of the " + messageError);

        // G
        var g = this.reader.getFloat(node, 'g');
        if (!(g != null && !isNaN(g) && g >= 0 && g <= 1))
            return this.onXMLError("unable to parse G component of the " + messageError);

        // B
        var b = this.reader.getFloat(node, 'b');
        if (!(b != null && !isNaN(b) && b >= 0 && b <= 1))
            return this.onXMLError("unable to parse B component of the " + messageError);

        // A
        var a = this.reader.getFloat(node, 'a');
        if (!(a != null && !isNaN(a) && a >= 0 && a <= 1))
            return this.onXMLError("unable to parse A component of the " + messageError);

        color.push(...[r, g, b, a]);

        return color;
    }

    /**
     * Displays the scene, processing each node, starting in the root node.
     */

    displayScene() {
        //To do: Create display loop for transversing the scene graph, calling the root node's display function
        var matId = this.nodes[this.idRoot].getMaterial();
        var texId = this.nodes[this.idRoot].getTexture();
        //if(texId == "null") texId = "default";
        //if(matId == "null") matId = "default";
        this.processNode(this.idRoot, texId, matId);

    }

    /**
     * Processes each node and its descendants, applying its textures, materials and transformations
     * @param id - id of the node
     * @param {CGFtexture} text
     * @param {CGFappearance} mat  
     */
    processNode(id, texId, matId){ 
        let node = this.nodes[id];
        
        
        this.scene.pushMatrix();
        
        let materialID = node.getMaterial();
        let textureID = node.getTexture();
  

        if (materialID == "null"){ // get parent's material 
            if (matId!="null"){
                materialID = matId;
            }else{
                materialID="default";
                //console.warn("using default material, consider checking material definitions");
            }
        }
        let material=this.materials[materialID];

        if(textureID == "null"){ // get parent's texture
            if(texId!="null"){
                textureID = texId;
            }else{
                textureID="default";
                console.warn("using default texture, consider checking material definitions")
            }
        }

        if (textureID=="clear"){
            material.setTexture(null);
        }else{
            let texture = this.textures[textureID];
            material.setTexture(texture);
        }
            
        material.setTextureWrap('REPEAT', 'REPEAT');
        material.apply();


        this.scene.multMatrix(node.getTransformation());
        
        for(var i = 0; i < node.getLeafs().length; i++){ // if primitive, display
            node.getLeafs()[i].display();
        }

        for(var i = 0; i < node.getChildren().length; i++){// if node, recursive call
            this.scene.pushMatrix();
            this.processNode(node.getChildren()[i],textureID, materialID);
            this.scene.popMatrix();
        }

        this.scene.popMatrix();
    }
}
