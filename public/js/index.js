const canvas = document.querySelector("canvas")
const spanPlayer = document.querySelector("#span1")
const spanOpponent = document.querySelector("#span2")
const c = canvas.getContext("2d")

const socket = io()

const TABLE_SIZE = 550
const TABLE_SQUARES = 8
canvas.height = TABLE_SIZE 
canvas.width = TABLE_SIZE
const SQUARE_SIZE = canvas.height / TABLE_SQUARES;


let activePiece = null
let movePieceTo = null
let movePieceToPos = null
let activePiecePos = null

let playerTurn = "white"
console.log(playerTurn)

let table;

socket.emit("joinGame", "game123")

socket.on("startGame", (color) => {
    console.log(color)
    table = new Table(canvas.height, SQUARE_SIZE, c, color)
    table.drawTable()
    
    const opponentColor = table.table[0][0].color
    const playerColor = opponentColor == "white" ? "black" : "white"
    // const timerPlayer = new Timer(599, spanPlayer, playerColor)
    // const timerOpponent = new Timer(599, spanOpponent, opponentColor)

    // timerOpponent.start("white")
    // timerPlayer.start("white")
})





let movementPiece = []


canvas.addEventListener("click", (e) =>{
    
    

    if(!activePiece){
        activePiece = table.getTablePos(e.offsetX, e.offsetY)
        
        console.log(activePiece)
        if(activePiece === null || activePiece.color !== table.color || activePiece.color !== playerTurn){
            activePiece = null
            return
        }
        activePiecePos = table.getIndex(e.offsetX, e.offsetY)

        movementPiece = table.table[activePiecePos.y][activePiecePos.x].validMovements(table.table, activePiecePos)
        
        table.colorActive(activePiecePos)
    }
    else{

        movePieceTo = table.getTablePos(e.offsetX, e.offsetY)
        movePieceToPos = table.getIndex(e.offsetX, e.offsetY)  
        
        if(movePieceTo?.color === activePiece.color){
            table.changeActive(activePiecePos, activePiece, movePieceToPos)
            
            activePiece = movePieceTo
            activePiecePos = movePieceToPos
            movePieceTo = null
            movePieceToPos = null
            movementPiece = table.table[activePiecePos.y][activePiecePos.x].validMovements(table.table, activePiecePos)
            return
        
        }
        
        if(movementPiece.filter(pos => pos.x === movePieceToPos.x && pos.y === movePieceToPos.y).length == 0){
            table.colorDesactive(activePiecePos, activePiece)
            
            setDefault()
            return
        }
        
    }
    
    if(activePiece && movePieceToPos){
        
      
        if(movementPiece.find(pos => pos.x == movePieceToPos.x && pos.y == movePieceToPos.y)){
            console.log(activePiecePos)
            socket.emit("movement", activePiece, activePiecePos, movePieceToPos)
            table.movePiece(activePiece, activePiecePos, movePieceToPos)
            setDefault()

            
        }

        

    }
})

socket.on("opponentMovement", (piece, coords1, coords2) => {
    table.movePiece(piece, coords1, coords2)
})

socket.on("turn", turn => {
    playerTurn = turn
    console.log(playerTurn)
})



function setDefault(){
    activePiece = null
    movePieceTo = null
    movePieceToPos = null
    activePiecePos = null
}