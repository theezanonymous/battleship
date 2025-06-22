import {Player} from "./player.js"
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function toggleMenu(){
    let e = document.querySelector(".menuScreen")
    if(e.style.display=="none"){
        e.style.display="flex"
    }
    else{
        e.style.display = "none"
    }
    
}
function toggleGridDisplay(){
    let e = document.querySelector(".body");
    e.style.display= e.style.display=="none"?"block": "none";
}
function toggleGrid(){
    let e = document.querySelectorAll(".gridContainer")
    if(e[0].style.display=="none"){
        e[0].style.display="grid"
        e[1].style.display = "none"
    }
    else{
        e[0].style.display = "none"
        e[1].style.display = "grid"
    }
}
async function loadTimeout(text, ms){
    let e = document.querySelector(".loadingScreen")
    e.style.display = "block"; e.innerText = text;
    await new Promise(resolve => setTimeout(resolve, ms));
    e.style.display = "none";
}

function loadCells(p1, p2){
    let gridContainer = document.querySelector("#p1"); gridContainer.style.display = "grid";
    document.querySelectorAll(".p1Grid").forEach((x)=>{
        for(let i = 0; i < 100; i++){//Okay, we have two types of cells with the same ids. We need to resolve
           let e = document.createElement("div")
           let tag = x.id == "playerBoard"? "1":"e"
           tag = tag + "-"+(parseInt(i/10))+"-"+(i%10)
           e.id = tag
           x.appendChild(e)
           
           if(x.id=="enemyBoard"){ //Configure event for selecting enemy board slots
                e.addEventListener("click", async ()=>{
                    let p = document.querySelector(".playerTracker")
                    if(p2.isValidAttack(e.id)){ //If the enemy has not been hit here...
                        // console.log("Player 1's Attack is valid")
                        p1.processTurn(e.id); 
                        await p1.endTurn()
                        toggleGrid()
                    }
                })
           }
        }
    })
    document.querySelectorAll(".p2Grid").forEach((x)=>{
        for(let i = 0; i < 100; i++){
           let e = document.createElement("div")
           let tag = x.id == "playerBoard"? "2":"e"
           tag = tag + "-"+(parseInt(i/10))+"-"+(i%10)
           e.id = tag
           x.appendChild(e)
           
           if(x.id=="enemyBoard"){ //Configure event for selecting enemy board slots
                e.addEventListener("click", async ()=>{
                    let p = document.querySelector(".playerTracker")
                    if(p1.isValidAttack(e.id)){ //If the enemy has not been hit here...
                        // console.log("Player 1's Attack is valid")
                        p2.processTurn(e.id); 
                        await p2.endTurn()
                        toggleGrid()
                    }
                })
           }
        }
    })
}

export {toggleMenu, loadTimeout, loadCells, toggleGrid, toggleGridDisplay, delay}