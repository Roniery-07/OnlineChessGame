class Table{
    constructor(size, squareSize, ctx, color) {
        this.size = size;
        this.squareSize = squareSize
        this.ctx = ctx
        this.table = this.createTable(color)
        this.colors = this.createTableColor()
        this.color = color //first turn is always whites
        
    }


    loadImages(table){
        const img = new Image()
        img.src = `../images/${table.color}-${table.type}.png`
        return img
    }


    createTable(playerColor){
        let table = Array(8).fill(null).map(() => Array(8).fill(null))
        const player = playerColor
        const opponent = player == "white" ? "black" : "white"
        // para alterar a cor de quem é o jogador basta alterar a ordem das
        // cores
        table[0][0] = new Rook(opponent)
        table[0][1] = new Knight(opponent)
        table[0][2] = new Bishop(opponent)
        table[0][3] = new Queen(opponent)
        table[0][4] = new King(opponent)
        table[0][5] = new Bishop(opponent)
        table[0][6] = new Knight(opponent)
        table[0][7] = new Rook(opponent)

        for(let i = 0; i < 8; i++){
            table[1][i] = new Pawn(opponent, 1)
        }

        table[7][0] = new Rook(player)
        table[7][1] = new Knight(player)
        table[7][2] = new Bishop(player)
        table[7][3] = new Queen(player)
        table[7][4] = new King(player)
        table[7][5] = new Bishop(player)
        table[7][6] = new Knight(player)
        table[7][7] = new Rook(player)

        for(let i = 0; i < 8; i++){
            table[6][i] = new Pawn(player, 6)
        }
        return table
    }
    
    drawTable () {
        c.strokeStyle = "rgb(20, 20, 20)"
        let i = 0;
        
        for(let y = 0; y < this.size / this.squareSize; y++){
            for(let x = 0; x < this.size / this.squareSize; x++){
                c.fillStyle = (i == 0)? "lightgreen" : "green"
                c.fillRect(x*this.squareSize, y*this.squareSize, this.squareSize, this.squareSize )
                i = (i == 0) ? 1 : 0
                if(this.table[y][x]){
                    this.drawPieces(this.table[y][x], x, y)
                }
            }
            i = (i == 0) ? 1 : 0
        }

    }
    createTableColor () {
        const table = Array(8).fill(null).map(() => Array(8).fill(null))
        c.strokeStyle = "rgb(20, 20, 20)"
        let i = 0;
        for(let y = 0; y < this.size / this.squareSize; y++){
            for(let x = 0; x < this.size / this.squareSize; x++){
                table[y][x] = (i == 0)? "lightgreen" : "green"
                i = (i == 0) ? 1 : 0
            }
            i = (i == 0) ? 1 : 0
        }
        return table
    }

    drawPieces(table, x, y){
        
        const img = this.loadImages(table)

        img.onload = () => {
            this.ctx.drawImage(img, x * this.squareSize, y * this.squareSize, this.squareSize, this.squareSize)
        }

        if(img.complete){
            this.ctx.drawImage(img, x * this.squareSize, y * this.squareSize, this.squareSize, this.squareSize)
        }

    }

    getIndex(x, y){

        const posX = Math.ceil(x / this.squareSize) - 1
        const posY = Math.ceil(y / this.squareSize) - 1
        return {x: posX, y: posY}
        
    }
    getTablePos(x, y){
        
        const pos = this.getIndex(x, y)
        return this.table[pos.y][pos.x]
    }
    movePiece(table, currentPos, moveToPos){
        
    
        // limpa o local de saida 
        this.ctx.beginPath()
        this.ctx.rect(currentPos.x * this.squareSize, currentPos.y * this.squareSize, this.squareSize, this.squareSize)
        this.ctx.fillStyle = this.colors[currentPos.y][currentPos.x]
        this.ctx.fill() 
        this.ctx.closePath()
        // limpa o local de chegada

        this.ctx.beginPath()
        this.ctx.rect(moveToPos.x * this.squareSize, moveToPos.y * this.squareSize, this.squareSize, this.squareSize)
        this.ctx.fillStyle = this.colors[moveToPos.y][moveToPos.x]
        this.ctx.fill() 
        this.ctx.closePath()
        
        this.drawPieces(table, moveToPos.x, moveToPos.y)
        this.updateTable(currentPos, moveToPos)
    }

    updateTable(clearPos, newPos){
        const temp = this.table[clearPos.y][clearPos.x]
        this.table[clearPos.y][clearPos.x] = null
        
        this.table[newPos.y][newPos.x] = temp
    }

    colorActive(currentPos){
        
        this.ctx.fillStyle = 'rgba(0, 255, 0, 0.5)'; // Cor verde semi-transparente
        this.ctx.fillRect(currentPos.x * this.squareSize, currentPos.y * this.squareSize, this.squareSize, this.squareSize);
        
    }
        

    colorDesactive(currentPos, currentPiece){
        this.ctx.beginPath()
            
        this.ctx.fillStyle = this.colors[currentPos.y][currentPos.x]
        console.log(currentPos)
        this.ctx.fillRect(currentPos.x * this.squareSize, currentPos.y * this.squareSize, this.squareSize, this.squareSize)
        this.drawPieces(currentPiece, currentPos.x, currentPos.y)
        this.ctx.closePath()
    }

    changeActive(currentPos, currentPiece, moveToPos){
        this.colorDesactive(currentPos, currentPiece)

        this.colorActive(moveToPos)
    }

}