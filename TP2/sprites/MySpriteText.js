
/** 
 * MySpriteText - class that stores 
 */

class MySpriteText {
    /**
    * @constructor
    * @param scene - 
    * @param {string} text - text that this spriteText represents
    */

    constructor(scene, text){
        this.scene = scene;
        this.text = text;

        /*Creates the geometry where the characters will be mapped */
        this.retangle = new MyRectangle(this.scene,-0.5, -0.5, 0.5, 0.5);  
        this.texture = new CGFtexture(this.scene, "./scenes/shaders/textfont.png");

        /* Variable that maps the character sprite to the font spritesheet grid */
        this.textToIndex = {'0':0, '1':1, '2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '!':10, '?':11, '@':12, '#':13, '$':14, '%':15,
            '&':16, '\'':17, '"':18, '(':19, ')':20, '+':21, '-':22, '=':23, ',':24, '.':25, 'A':26, 'B':27, 'C':28, 'D':29, 'E':30, 'F':31, 'G':32,
            'H':33, 'I':34, 'J':35, 'K':36, 'L':37, 'M':38, 'N':39, 'O':40, 'P':41, 'Q':42, 'R':43, 'S':44, 'T':45, 'U':46, 'V':47, 'W':48, 'X':49,
            'Y':50, 'Z':51, 'a':52, 'b':53, 'c':54, 'd':55, 'e':56, 'f':57, 'g':58, 'h':59, 'i':60, 'j':61, 'k':62, 'l':63, 'm':64, 'n':65, 'o':66,
            'p':67, 'q':68, 'r':69, 's':70, 't':71, 'u':72, 'v':73, 'w':74, 'x':75, 'y':76, 'z':77, '<':78, '>':79, '[':80, ']':81, '{':82, '}':83, 
            '\\':84, '/':85, '`':86, 'á':87, 'ã':88, 'à':89, 'é':90, 'ë':91, 'è':92, 'í':93, 'ó':94, 'õ':95, 'ú':96, 'ù':97, 'ü':98, 'ñ':99, 'Ç':100,
            'ç':101, '¡':102, '¿':103, '©':104, '®':105, '™':106, '·':107, '§':108, '†':109, '‡':110, '‐':111, '‒':112, '¶':113, '÷':114, '°':115, 
            '¤':116, '¢':117, 'ß':118, 'Þ':119, ':':120, ';':121, '^':122, '~':123, '♂':124, '♀':125, '♥':126, '♪':127, '♫':128, '☼':129};
        
         /*initializes the spritesheet */
        this.spritesheet = new MySpritesheet(scene, "font",this.texture,26, 5);

        /* initialize shaders is in XMLScene because there is only one shader, no need to be creating one everytime we have a new sprite */
    }
     /**
    * @getCharacterPosition returns the index of character sprite in the font spritesheet grid
    * @param char - character sprite
    */

    getCharacterPosition(char){
        return this.textToIndex[char];
    }

    /**
    * @display function in where the created geomtry will be drawn repetidely for each character
    */

    display(){
        this.spritesheet.activate();
       

         for (let i of this.text){
                let positionInSprite = this.getCharacterPosition(i); //get character's sprite 

                if(positionInSprite == null) return; //if it not exists

                this.spritesheet.activateCellP(positionInSprite); // pass the shader the offset 
                
                this.retangle.display();//display base geometry
                this.scene.translate(1,0,0); // addind space between letters
         }

         this.scene.setActiveShader(this.scene.defaultShader); //set default shader

    }
    
    
}
