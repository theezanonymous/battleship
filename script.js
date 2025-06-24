import {Ship} from "./ship.js"
import {Gameboard} from "./gameboard.js"
import {Player} from "./player.js"
import {toggleMenu, loadTimeout, loadCells, toggleGridDisplay, clearScreens} from "./event.js"
let computer = document.querySelector(".computer"); let player = document.querySelector(".player"); 
computer.addEventListener("click", ()=>{
    player.id = ""; computer.id = "selected";
})
player.addEventListener("click", ()=>{
    computer.id = ""; player.id = "selected";
})
document.querySelector(".startButton").addEventListener("click", async ()=>{
    toggleMenu(); await loadTimeout("Loading...", 100); 
    let p1 = new Player("player", "P1"); let p2 = new Player("computer", "P2"); //Change later
    p1.loadShips(); p2.loadShips()
    loadCells(p1, p2); p1.enemy = p2; p2.enemy = p1;
    p1.startTurn()
})
document.querySelector("#restart").addEventListener("click", async ()=>{
    clearScreens();
    await loadTimeout("Loading...", 2000); 
    window.location.reload()
})