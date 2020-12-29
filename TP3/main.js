//From https://github.com/EvanHahn/ScriptInclude
include=function(){function f(){var a=this.readyState;(!a||/ded|te/.test(a))&&(c--,!c&&e&&d())}var a=arguments,b=document,c=a.length,d=a[c-1],e=d.call;e&&c--;for(var g,h=0;c>h;h++)g=b.createElement("script"),g.src=arguments[h],g.async=!0,g.onload=g.onerror=g.onreadystatechange=f,(b.head||b.getElementsByTagName("head")[0]).appendChild(g)};
serialInclude=function(a){var b=console,c=serialInclude.l;if(a.length>0)c.splice(0,0,a);else b.log("Done!");if(c.length>0){if(c[0].length>1){var d=c[0].splice(0,1);b.log("Loading "+d+"...");include(d,function(){serialInclude([]);});}else{var e=c[0][0];c.splice(0,1);e.call();};}else b.log("Finished.");};serialInclude.l=new Array();

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
    function(m,key,value) {
      vars[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return vars;
}	 
//Include additional files here
serialInclude(['../lib/CGF.js', 'XMLscene.js', 'MySceneGraph.js', 'MyInterface.js', './Primitives/MyRectangle.js','./Primitives/MyTorus.js', './Primitives/MySphere.js', './Primitives/MyCylinder.js','./Primitives/MyTriangle.js','./Primitives/MyCircle.js','Node.js','./Animation/Animation.js','./Animation/KeyFrameAnimation.js', './Animation/BezierAnimation.js','./Animation/KeyFrame.js',
'./Sprites/MySpriteAnimation.js', './Sprites/MySpritesheet.js', './Sprites/MySpriteText.js', './Primitives/MyPlane.js', './Primitives/MyDefBarrel.js', './Primitives/MyPatch.js','./Primitives/My2SideRectangle.js',
'./GameElements/Board.js', './GameElements/BoardTile.js', './GameElements/Piece.js', 'PrologInterface.js', 'GameOrchestrator.js','./Primitives/MyCube.js','./GameElements/GameSequence.js', './GameElements/GameAnimator.js','./GameElements/GameMove.js','./GameElements/Menu/Menu.js','./Animation/ArcAnimation.js',
'./GameStates/GameState.js','./GameStates/AnimationState.js', './GameStates/ChooseState.js',  './GameStates/ReadyState.js', './GameStates/GameOverState.js','./GameStates/LoadingState.js','./GameStates/BotState.js','./utils.js','./GameStates/CheckGameOverState.js','./GameElements/Menu/Button.js','./GameElements/Menu/EndMenu.js',
 './GameElements/AnimationCamera.js','./GameStates/CameraAnimationState.js',
 main=function(){
   let selected1 = 5
   let selected2 = 60
    const size = document.querySelector('#BoardSize');
    size.addEventListener('change', function(e)  {
      selected1 = e.target.value
      let amount = document.querySelector('#amount')
      amount.innerHTML = e.target.value
    });
    const time = document.querySelector('#PlayTime');
    time.addEventListener('change', function(e)  {
      selected2 = e.target.value
      let time = document.querySelector('#t')
      time.innerHTML = e.target.value
    });

    document.querySelectorAll('article').forEach((player) => addDropdown(player));
    document.querySelector('#submit').addEventListener('click', () => {
        let error = false;
        const values = ['player1', 'player2'].map((player) => {
          const playerArticle = document.querySelector(`#${player}`);
          let playerType = playerArticle.querySelector('input[value="H"]').checked ? "p" 
          : playerArticle.querySelector('input[value="B"]').checked ? "c"
          : null;
          if(!playerType){
            error = true;
            return null;
          }
          if(playerType == "p"){
            return{
              type:playerType,
              difficulty:null
            }
          }
          return {
            type: playerType,
            difficulty: playerArticle.querySelector('select').value? playerArticle.querySelector('select').value : null
          }
        });

    if(!error && selected1 && selected2){
        document.querySelector('.mainMenu').style.display = "none";
        document.querySelector('#infoPanel').style.display = "block";
        console.log(values[0])
        console.log(values[1])
        console.log(selected1)
        console.log(selected2)
          // Standard application, scene and interface setup
          var app = new CGFapplication(document.body);
          var myInterface = new MyInterface();
          var myScene = new XMLscene(myInterface, values[0], values[1], parseInt(selected1), parseInt(selected2));

          app.init();

          app.setScene(myScene);
          app.setInterface(myInterface);

          myInterface.setActiveCamera(myScene.camera);

          // get file name provided in URL, e.g. http://localhost/myproj/?file=myfile.xml 
          // or use "demo.xml" as default (assumes files in subfolder "scenes", check MySceneGraph constructor) 

        //  var filename=getUrlVars()['file'] || "scene1.xml";

          // create and load graph, and associate it to scene. 
          // Check console for loading errors
          //var myGraph = new MySceneGraph(filename, myScene);

          // start
          app.run();        
        }
  });
}

]);


function addDropdown(player){

    player.querySelector('input[value="B"]').addEventListener('change', () => {
      player.querySelector('select').style.display="block";
    });
  
    player.querySelector('input[value="H"]').addEventListener('change', () => {
      player.querySelector('select').style.display="none";
    });
}