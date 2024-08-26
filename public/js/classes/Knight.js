class Knight extends Pieces{
    constructor(color){
        super(color, "knight")
    }
    validMovements(table, currentPos){
        const movements = [{x: currentPos.x + 1, y: currentPos.y + 2}, {x: currentPos.x - 1, y: currentPos.y + 2}, 
            {x: currentPos.x - 2, y: currentPos.y + 1}, {x: currentPos.x - 2, y: currentPos.y - 1},
            {x: currentPos.x + 2, y: currentPos.y + 1}, {x: currentPos.x + 2, y: currentPos.y - 1},
            {x: currentPos.x + 1, y: currentPos.y - 2}, {x: currentPos.x - 1, y: currentPos.y - 2}]
        
        return movements.filter(pos => this.isValidPosition(pos) && this.isMovementPossible(table, pos))
    }
}