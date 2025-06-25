import {Player} from "./player.js"
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function clearScreens(){
    document.querySelector(".message").innerText = ""
    document.querySelector(".gameOverMessage").innerText = ""
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
function toggleMockGrid(){
    let e = document.querySelector(".mockGridContainer")
    e.style.display= e.style.display=="none"?"grid": "none";
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
        for(let i = 0; i < 100; i++){
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
                        
                        if(p2.type=="computer"){
                            //await p2.startTurn()
                        }
                        else{
                            toggleGrid()
                        }
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
function loadMockGridCells(){
    let gridContainer = document.querySelector(".mockGridContainer"); gridContainer.style.display = "grid";
    let x = document.querySelector(".mockGrid")
    for(let i = 0; i < 100; i++){
        let e = document.createElement("div")
        let id = "m" + "-"+(parseInt(i/10))+"-"+(i%10)
        e.id = id
        e.innerText = i<10?i:i%10==0?parseInt(i/10):""
        x.appendChild(e)
    }
}
function getSetup(){
    // let len = document.querySelector(".shipLength").innerText
    // len = len.substring(len.length -1)

    return {
        row: document.getElementById("row").value,
        col: document.getElementById("col").value,
        orientation: document.querySelector('input[name="orientation"]:checked').value
    }
}
function getRandomSetup(){
    let r = parseInt(Math.random()*10)
    let c = parseInt(Math.random()*10)
    let o = parseInt(Math.random()*2)==0?"horizontal":"vertical"
    return {
        row: r, 
        col: c,
        orientation: o
    }
}


export {getSetup, getRandomSetup, toggleMenu, loadTimeout, loadCells, toggleGrid, toggleGridDisplay, delay, clearScreens, toggleMockGrid, loadMockGridCells}