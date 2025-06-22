import {Ship} from "./ship.js"
class Gameboard{
    
    constructor(length=10, width=10){
        this.board = []; this.ships = []
        for(let i = 0; i< width; i++){
            this.board.push([])
            for(let j = 0; j < width; j++){
                this.board[i].push("")
            }
        }
    }
    placeShip(length, row, col, orientation){
        this.ships.push(new Ship(length, row, col, orientation))
    }
    receiveAttack(row, col){
        for(let i = 0; i < this.ships.length; i++){
            if(!this.ships[i].isSunk() && this.ships[i].contains(row,col) ){
                this.ships[i].hit(); this.board[row][col] = "hit"
                return;
            }
            else{
                this.board[row][col] = "miss"
            }
        }
    }
    clearCellStates(){
        let a = document.getElementById("playerBoard").children
        for(let i = 0; i < a.length ; i++){
            a[i].className = ""
        }
        let b = document.getElementById("enemyBoard").children
        for(let i = 0; i < b.length ; i++){
            b[i].className = ""
        }

    }
    setCellClass(row, col, prefix, c){
        let id = prefix+ "-" + row + "-" + col; 
        let e = document.getElementById(id)
        e.className = c
    }
    displayAsPlayer(){
        this.ships.forEach((ship)=>{
            let endRow = ship.orientation=="horizontal"?ship.startRow: ship.startRow+ship.length-1;
            let endCol = ship.orientation=="vertical"? ship.startCol: ship.startCol+ship.length-1;
            for(let i = ship.startRow; i <=endRow; i++){
                for(let j = ship.startCol; j <=endCol; j++){
                    this.setCellClass(i, j, "p", "ship")
                }
            }
        })
    }
    displayAsEnemy(){
        let e = document.getElementById("enemyBoard").children
        for(let i = 0; i < e.length; i++){
            let r = parseInt(i/10); let c = i%10
            e.className = this.board[r][c];
        }

    }
    isAllSunk(){
        for(let i = 0; i < this.ships.length; i++){
            if(this.ships[i].isSunk()==false){
                return false
            }
        }
        return true
    }
}
export {Gameboard}