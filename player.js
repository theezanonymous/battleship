import {Gameboard} from "./gameboard.js"
import {loadTimeout,loadCells, toggleGridDisplay, delay, toggleMockGrid, getSetup, getRandomSetup} from"./event.js"
class Player{
    constructor(type, name){
        this.type = type; this.gameBoard = new Gameboard(); this.name = name; this.enemy= null
        this.shipsToPlace = [2,2,3,3,3,3,4,4,5,5]
    }
    async loadShips(){
        if(this.type=="computer"){
            for(let i = 0; i < 10; i++){
                let currShip = getRandomSetup()
                    while(!this.gameBoard.isValidPlacement(this.shipsToPlace[this.shipsToPlace.length-1], currShip.row, currShip.col, currShip.orientation)){
                        currShip = getRandomSetup(); 
                    }
                this.gameBoard.placeShip(this.shipsToPlace.pop(), currShip.row, currShip.col, currShip.ori); 
            }
            toggleMockGrid()
            await loadTimeout("Starting Game...", 3000)
            await loadTimeout("3...", 1000)
            await loadTimeout("2...", 1000)
            await loadTimeout("1...", 1000)
            loadCells(this.enemy, this); 
            this.enemy.startTurn()
            
        }
        else{
            document.querySelector(".setupHeader").innerText = this.name + " Board Setup"
            document.querySelector(".shipLength").innerText = "Ship Length: 5"
            // this.gameBoard.placeShip(1, 0, 0, "horizontal") 
            // this.gameBoard.placeShip(2, 1, 0, "vertical")
            let submitButton = document.querySelector(".submitSetup")
            let x = async (event)=>{
                let currShip = null;
                if(event.currentTarget.className== "submitSetup"){
                    currShip = getSetup()
                }
                else{
                    currShip = getRandomSetup()
                    while(!this.gameBoard.isValidPlacement(this.shipsToPlace[this.shipsToPlace.length-1], currShip.row, currShip.col, currShip.orientation)){
                        currShip = getRandomSetup(); 
                    }
                }
                let row = parseInt(currShip.row); let col = parseInt(currShip.col); let ori = currShip.orientation
                let len = this.shipsToPlace[this.shipsToPlace.length-1]
                //console.log(row, col, ori, len)
                if(this.gameBoard.isValidPlacement(len, row, col, ori)){
                    this.gameBoard.placeShip(len, row, col, ori); 
                    this.gameBoard.displayAsMock()
                    this.shipsToPlace.pop()
                    if(this.shipsToPlace.length==0){
                        //Proceed to switch players
                        if(this.name=="P1"){
                            //Switch to P2
                            loadTimeout("Switching Players...", 1000)
                            // document.querySelector(".setupForm").removeChild(event.currentTarget)
                            // let newButton = document.createElement("div"); newButton.className = "submitSetup"
                            // document.querySelector(".setupForm").appendChild(newButton)
                            document.querySelector(".submitSetup").removeEventListener("click", x)
                            document.querySelector(".randomButton").removeEventListener("click", x)
                            this.gameBoard.clearCellStates(); 
                            this.enemy.loadShips()
                        }
                        else{
                            //We can start the game
                            toggleMockGrid()
                            await loadTimeout("Starting Game...", 1000)
                            await loadTimeout("3...", 1000)
                            await loadTimeout("2...", 1000)
                            await loadTimeout("1...", 1000)
                            
                            
                            loadCells(this.enemy, this); 
                            this.enemy.startTurn()
                        }

                    }
                    else{
                        document.querySelector(".shipLength").innerText = "Ship Length: "+ this.shipsToPlace[this.shipsToPlace.length-1]
                    }
                }
                else{
                    alert("Invalid Ship Placement")
                }
            }
            submitButton.addEventListener("click", x)
            document.querySelector(".randomButton").addEventListener("click", x)
        }
    }
    async startTurn(){
        // console.log(document.querySelector(".playerTracker").innerText)
        if(this.type=="player"){
            document.querySelector(".playerTracker").innerText = this.name;
            this.gameBoard.clearCellStates()
            this.gameBoard.displayAsPlayer(this.name.substring(this.name.length-1))
            this.enemy.gameBoard.displayAsEnemy(this.name.substring(this.name.length-1))
            document.querySelector(".message").innerText = this.name + "'s Turn"
        }
        else{
            let row = parseInt(Math.random()*10); let col = parseInt(Math.random()*10)
            while(this.enemy.isValidAttack("1-"+ row + "-" + col)==false){
                
                row = parseInt(Math.random()*10); parseInt(Math.random()*10)
            }
            await this.processTurn("1"+"-"+row+"-"+col)
            await this.endTurn()
        }
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
        // console.log(row, col, res)
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
    async processTurn(id){
        let pair = this.convertIdToPair(id)
        let row = pair[0]; let col = pair[1]
        let hit = this.enemy.gameBoard.receiveAttack(row, col);
       //this.enemy.gameBoard.displayAsEnemy(this.enemy.name.substring(this.enemy.name.length-1))
       if(this.type=="computer"){
            await loadTimeout("Getting Computer Attack...")
        }   
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
            if(this.type=="player"){
                await new Promise(resolve => setTimeout(resolve, 3000));
            }
            toggleGridDisplay();
            await loadTimeout("Switching Players...", 3000)
            toggleGridDisplay();
            this.enemy.startTurn()
        }
    }

}
export {Player}