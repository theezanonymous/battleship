import {Gameboard} from "./gameboard.js"
class Player{
    constructor(type, name){
        this.type = type; this.gameBoard = new Gameboard(); this.name = name; this.enemy= null
    }
    loadShips(){
        this.gameBoard.placeShip(3, 0, 0, "horizontal") 
        this.gameBoard.placeShip(2, 1, 0, "vertical")
    }
    startTurn(){
        // console.log(document.querySelector(".playerTracker").innerText)
        // document.querySelector(".playerTracker").innerText = this.name;
        this.gameBoard.clearCellStates()
        this.gameBoard.displayAsPlayer()
        this.enemy.gameBoard.displayAsEnemy()
    }
    convertIdToPair(id){
        id = id.substring(2, id.length)
        let delim = id.indexOf("-");
        let row = parseInt(id.substring(0, delim))
        let col = parseInt(id.substring(delim+1, id.length))
        return [row, col]
    }
    isValidAttack(id){
        let pair = this.convertIdToPair(id)
        let row = pair[0]; let col = pair[1]
        return this.gameBoard.board[row][col]==""
    }
    processTurn(id){
        let pair = this.convertIdToPair(id)
        let row = pair[0]; let col = pair[1]
        this.enemy.gameBoard.receiveAttack(row, col);
    }
    endTurn(){
        this.enemy.startTurn()
    }
}
export {Player}