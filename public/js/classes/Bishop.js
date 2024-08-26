class Bishop extends Pieces{
    constructor(color){
        super(color, "bishop")
    }
    validMovements(table, currentPos){
        const movements = []
        const directions = [{x: -1,y: -1}, {x: -1,y: 1}, {x: 1,y: -1}, {x: 1,y: 1}]
        
        directions.forEach(({x: dColuna, y: dLinha}) => {
            let {y: linha,x: coluna} = currentPos
            
            while(true){
                linha += dLinha;
                coluna += dColuna;
                if(!this.isValidPosition({x: coluna, y: linha}) || !this.isMovementPossible(table, {x: coluna, y: linha})) break;
                movements.push({x: coluna, y: linha})
                if(table[linha][coluna]) break
            }
        })
        
        return movements
    }
}