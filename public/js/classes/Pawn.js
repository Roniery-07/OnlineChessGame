class Pawn extends Pieces{ 
    constructor(color, pos){
        super(color, "pawn")
        this.pos = pos
        
    }
    validMovements(table, currentPos){
        const directions = (this.pos === 1) ? 1 : -1;
        const movements = []
        const moveToPos = {x: currentPos.x , y: currentPos.y + directions}
        
        // movimento de uma casa para frente
        if(this.isValidPosition(moveToPos) && !table[moveToPos.y][currentPos.x]){
            movements.push(moveToPos)
        }

        if((currentPos.y === 6) || (currentPos.y === 1)){
             if(!table[currentPos.y + directions][currentPos.x] && !table[currentPos.y + 2 * directions][currentPos.x]){
                movements.push({x: currentPos.x, y: currentPos.y + 2 * directions})
             }
        }

        

        return movements
    }
    
    
}


// o movimento dos peões se limita a basicamente se mover para frente
// então....