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
            // console.log(this.ships[i], row, col, this.ships[i].contains(row, col))
            if(!this.ships[i].isSunk() && this.ships[i].contains(row,col) ){
                this.ships[i].hit(); this.board[row][col] = "hit"
                return this.ships[i].isSunk()? "sunk" :"hit";
            }
            else{
                continue;
            }
        }
        this.board[row][col] = "miss"
                return "miss"
    }
    clearCellStates(){
        document.querySelectorAll(".grid").forEach((x)=>{
            let c = x.children;
            for(let i = 0; i < c.length; i++){
                c[i].className = ""
            }
        })


    }
    setCellClass(row, col, prefix, c){
        let id = prefix+ "-" + row + "-" + col; 
        let e = document.getElementById(id)
        e.className = c
    }
    displayAsPlayer(playerNum){
        this.ships.forEach((ship)=>{
            let endRow = ship.orientation=="horizontal"?ship.startRow: ship.startRow+ship.length-1;
            let endCol = ship.orientation=="vertical"? ship.startCol: ship.startCol+ship.length-1;
            for(let i = ship.startRow; i <=endRow; i++){
                for(let j = ship.startCol; j <=endCol; j++){
                    this.setCellClass(i, j, playerNum.toString(), "ship")
                }
            }
        })
        for(let i = 0; i < 10; i++){
            for(let j = 0; j< 10; j++){
                if(this.board[i][j]=="hit"){
                    document.getElementById(playerNum.toString() + "-"+i+"-"+j).classList.add("shipHit")
                }
            }
        }
    }
    displayAsEnemy(playerNum){
        // let c = "p" + playerNum + "Grid"
        let e = document.querySelectorAll(".p" + playerNum + "Grid")[1].children
        for(let i = 0; i < e.length; i++){
            let r = parseInt(i/10); let c = i%10
            e[i].className = this.board[r][c];
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