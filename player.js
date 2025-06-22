import {Gameboard} from "./gameboard.js"
import {loadTimeout, toggleGrid} from"./event.js"
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
        document.querySelector(".playerTracker").innerText = this.name;
        this.gameBoard.clearCellStates()
        this.gameBoard.displayAsPlayer()
        this.enemy.gameBoard.displayAsEnemy()
        document.querySelector(".message").innerText = this.name + "'s Turn"
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
        let res = this.gameBoard.board[row][col]==""
        //(res)
        return res
    }
    
    displayHitOrMiss(hit){
        let e = document.querySelector(".message")
        if(hit=="hit"){
            e.innerText = this.name + " hit a ship!"
        }
        else if(hit=="sunk"){
            e.innerText = this.name  + " sank a ship!"
        }
        else{
            e.innerText = this.name + " missed!"
        }
    }
    processTurn(id){
        let pair = this.convertIdToPair(id)
        let row = pair[0]; let col = pair[1]
        let hit = this.enemy.gameBoard.receiveAttack(row, col);
        this.displayHitOrMiss(hit)
    }
    async endTurn(){
        await new Promise(resolve => setTimeout(resolve, 3000));
        toggleGrid();
        await loadTimeout("Switching Players...", 3000)
        toggleGrid();
        this.enemy.startTurn()
    }
}
export {Player}