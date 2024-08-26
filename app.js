const express = require("express")
const http = require("http")
const {Server} = require("socket.io")
const app = express()
const server = http.createServer(app)
const io = new Server(server, {pingInterval: 2000, pingTimeout: 5000})

let rooms = {}

const port = 3000

let playerTurn = "white"

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/views/index.html")
})

io.on("connection", (socket) => {
    

    console.log("user connected")

    socket.on("joinGame", (gameID) => {
        if(!rooms[gameID]){
            rooms[gameID] = []
        }

        rooms[gameID].push(socket.id)

        socket.join(gameID)

        
        console.log(rooms)
        if(rooms[gameID].length === 2){
            console.log("ola")
            if(rooms[gameID][1] === socket.id){
                console.log("1")
                socket.emit("startGame", "black")
                socket.broadcast.emit("startGame", "white")
                
            }
        }
        
    
            
            
        
        
    })

        socket.on("movement",  (piece, coords1, coords2) => {
            
            const newCoords2 = translateCoords(coords2.x, coords2.y)
            const newCoords1 = translateCoords(coords1.x, coords1.y)
            socket.broadcast.emit("opponentMovement", piece, newCoords1, newCoords2)
            playerTurn = playerTurn == "white" ? "black" : "white"
            const games = Object.keys(rooms)
            games.filter(game => rooms[game] == socket.id)
            io.to(games).emit("turn", playerTurn)
      
    })

    socket.on("disconnect", () => {
        console.log("user diconnected")
        for(let room in rooms){
            if(rooms[room].includes(socket.id)){
                rooms[room] = rooms[room].filter(id => id !== socket.id)
                if(rooms[room].length === 0){
                    delete rooms[room]
                }
            }
            break

        }
    })
        


})

function translateCoords(coordsX, coordsY){
    let newCoords  = {};
    newCoords.x = 8 - coordsX - 1
    newCoords.y = 8 - coordsY - 1;
    console.log(newCoords)
    return newCoords
}

server.listen(port, () => {
    console.log("Server is running")
})

