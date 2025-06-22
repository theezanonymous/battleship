import {Gameboard} from "./gameboard.js"
import {loadTimeout, toggleGridDisplay, delay} from"./event.js"
class Player{
    constructor(type, name){
        this.type = type; this.gameBoard = new Gameboard(); this.name = name; this.enemy= null
    }
    loadShips(){
        this.gameBoard.placeShip(1, 0, 0, "horizontal") 
        // this.gameBoard.placeShip(2, 1, 0, "vertical")
    }
    startTurn(){
        // console.log(document.querySelector(".playerTracker").innerText)
        document.querySelector(".playerTracker").innerText = this.name;
        this.gameBoard.clearCellStates()
        this.gameBoard.displayAsPlayer(this.name.substring(this.name.length-1))
        this.enemy.gameBoard.displayAsEnemy(this.name.substring(this.name.length-1))
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
       //this.enemy.gameBoard.displayAsEnemy(this.enemy.name.substring(this.enemy.name.length-1))
        this.displayHitOrMiss(hit)
        
    }
    async displayWinScreen(){
        let restart = document.getElementById("restart")
        let s = document.querySelector(".gameOverScreen"); s.id = "show";
        document.querySelector(".gameOverMessage").innerText = this.name + " wins!"
        await delay(3000)
        toggleGridDisplay();
        restart.className = "show"
        restart.addEventListener("click", ()=>{
            s.className = ""
            restart.className = "hide"
        })

    }
    async endTurn(){
        if(this.enemy.gameBoard.isAllSunk()){
            this.displayWinScreen();
        }
        else{
            await new Promise(resolve => setTimeout(resolve, 3000));
            toggleGridDisplay();
            await loadTimeout("Switching Players...", 3000)
            toggleGridDisplay();
            this.enemy.startTurn()
        }
    }

}
export {Player}