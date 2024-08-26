class King extends Pieces{
    constructor(color) {
        super(color, "king")
    }
    validMovements(table, currentPos){
        const movements = []
        const directions = [{x: 1, y: 1}, {x: 0, y: 1}, {x: 0, y: -1}, {x: -1, y: -1},
                            {x: 1, y: 0}, {x: -1, y: 0}, {x: 1, y: -1}, {x: -1, y: 1}]
        
                            
        directions.forEach(({x: col, y: row}) => {
            movements.push({x: col + currentPos.x, y: row + currentPos.y})
        })
        console.log(movements)
        return movements.filter(pos => this.isValidPosition(pos) && this.isMovementPossible(table, pos))
    }
}