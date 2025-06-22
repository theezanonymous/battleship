import {Player} from "./player.js"
function toggleMenu(){
    let e = document.querySelector(".menuScreen")
    if(e.style.display=="none"){
        e.style.display="flex"
    }
    else{
        e.style.display = "none"
    }
    
}
function toggleGrid(){
    let e = document.querySelector(".gridContainer")
    if(e.style.display=="none"){
        e.style.display="grid"
    }
    else{
        e.style.display = "none"
    }
}
async function loadTimeout(text, ms){
    let e = document.querySelector(".loadingScreen")
    e.style.display = "block"; e.innerText = text;
    await new Promise(resolve => setTimeout(resolve, ms));
    e.style.display = "none";
}

function loadCells(p1, p2){
    let gridContainer = document.querySelector(".gridContainer"); gridContainer.style.display = "grid";
    document.querySelectorAll(".grid").forEach((x)=>{
        for(let i = 0; i < 100; i++){
           let e = document.createElement("div")
           let tag = x.id == "playerBoard"? "p":"e"
           tag = tag + "-"+(parseInt(i/10))+"-"+(i%10)
           e.id = tag
           x.appendChild(e)
           
           if(x.id=="enemyBoard"){ //Configure event for selecting enemy board slots
                e.addEventListener("click", ()=>{
                    let p = document.querySelector(".playerTracker")
                    if(p.innerText = "P1"){
                        if(p2.isValidAttack(e.id)){ //If the enemy has not been hit here...
                           // console.log("Player 1's Attack is valid")
                            p1.processTurn(e.id); 
                            p1.endTurn()
                            p.innerText = "P2"
                        }
                    }
                    else{
                        if(p1.isValidAttack(e.id)){
                            //console.log("Player 2's attack is valid")
                            p2.processTurn(e.id);
                            p2.endTurn()
                            p.innerText = "P1"
                        }
                    }
                })
           }
        }
    })
}

export {toggleMenu, loadTimeout, loadCells, toggleGrid}