import {Ship} from "./ship.js"
class Gameboard{
    
    constructor(length=10, width=10){
        this.board = []; this.ships = []
        for(let i = 0; i< width; i++){
            this.board.push([])
            for(let j = 0; j < width; j++){
                this.board.push("")
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