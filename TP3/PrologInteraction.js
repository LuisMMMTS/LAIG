/**
 * MyPrologInterface
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyPrologInterface {
    constructor(gameOrchestrator) {
        this.gameOrchestrator = gameOrchestrator;
    }


    getPrologRequest(requestString, onSuccess, onError, port)
    {
        var requestPort = port || 8081
        var request = new XMLHttpRequest();
        request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, true);

        request.onload = onSuccess || function(data){console.log("Request successful. Reply: " + data.target.response);};
        request.onerror = onError || function(){console.log("Error waiting for response");};

        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send();
    }

    responsesToArrays(response){
        let array=response.split("[").map(Array)[0][2].slice(2);
        array = array.map(function(x) { 
            x = x.replaceAll(']',''); 
            x=x.split(",");
            return x;
          });
          console.log("AQUI");
        console.log(array);
        return array
    }

    makeRequest()
    {
        // Get Parameter Values
        var requestString = document.querySelector("#query_field").value;				
        
        // Make Request
        getPrologRequest(requestString, handleReply);
    }
    
    //Handle the Reply
    handleReply(data){
        document.querySelector("#query_result").innerHTML=data.target.response;
    }

    handleBoardReply(data){
        //document.querySelector("#query_result").innerHTML=data.target.response;
        let response=data.target.response;
        response=this.responsesToArrays(response);
        this.gameOrchestrator.gameBoard=new Board(this.gameOrchestrator.scene, response);
    }

    boardRequest(size){
        this.getPrologRequest("initialBoard("+size+")", this.handleBoardReply.bind(this));
        //let board=data.target.response;
        //console.log("board is: "+this);
    }


    handleMoveReply(data){
        //document.querySelector("#query_result").innerHTML=data.target.response;
        let response=data.target.response;
        console.log(response);
    }

    moveRequest(board, player, AiLevel1=null, AiLevel2=null ,OldPos=null,NewPos=null){
        if(AiLevel1==null && AiLevel2==null){//human
            this.getPrologRequest("playerTurn("+board+","+player+"-'player'-"+AiLevel1+"-"+AiLevel2+","+OldPos+","+NewPos+")",this.handleMoveReply.bind(this));
        }else{//computer
            this.getPrologRequest("playerTurn("+board+","+player+"-'computer'-"+AiLevel1+"-"+AiLevel2+","+OldPos+","+NewPos+")",this.handleMoveReply.bind(this));
        }
        
    }


    handleMovablePiecesReply(data){
        //document.querySelector("#query_result").innerHTML=data.target.response;
        let response=data.target.response;
        console.log(response);
    }
    
    getMovablePiecesResquest(board, player){
        this.getPrologRequest("getMovablePieces("+board+", "+player+")",handleMovablePiecesReply(this));
    }


    handlePieceMovesReply(data){
        //document.querySelector("#query_result").innerHTML=data.target.response;
        let response=data.target.response;
        console.log(response);
    }
    getPieceMovesRequest(board, player, pieceCoords){
        this.getPrologRequest("getValidMovesforPiece("+board+","+ player+","+ pieceCoords+")",handlePieceMovesReply(this));
    }

}