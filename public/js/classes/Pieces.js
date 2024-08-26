class Pieces{
    constructor(color, type){
        this.color = color
        this.type = type
        
    }
    isValidPosition(moveToPos){
        return moveToPos.x >= 0 && moveToPos.x < 8 && moveToPos.y >= 0 && moveToPos.y < 8;
    }

    isMovementPossible(table, moveToPos){
        const piece = table[moveToPos.y][moveToPos.x];
        return !piece || piece.color !== this.color
    }

}