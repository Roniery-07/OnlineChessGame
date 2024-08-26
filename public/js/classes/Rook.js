class Rook extends Pieces{
    constructor(color){
        super(color, "rook")
    }
    validMovements(table, currentPos){
        const movements = []
        const directions = [{x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}]

        
        directions.forEach(({x: dCol, y: dRow}) => {
            let {x: col, y: row} = currentPos
            while(true){
                col += dCol
                row += dRow

                if(!this.isValidPosition({x: col, y: row}) || !this.isMovementPossible(table, {x: col, y: row})) break
                movements.push({x: col, y: row})
                if(table[row][col]) break
            }
        })
        
        return movements 

    }
}