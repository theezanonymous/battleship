import {Ship} from "./ship.js"
import { Gameboard } from "./gameboard.js";
import {Player} from "./player.js"
import {loadCells} from "./event.js"
import '@testing-library/jest-dom';




test("Ship isSunk and hit works", ()=>{
    let ship = new Ship(2); 
    expect(ship.isSunk()).toBeFalsy();
    ship.hit(); expect(ship.timesHit).toBe(1)
    ship.hit(); expect(ship.isSunk()).toBeTruthy();
})
test("Ship contains works", ()=>{
    let ship = new Ship(3, 0, 0, "horizontal"); 
    expect(ship.contains(0,2)).toBeTruthy();
    expect(ship.contains(1, 0)).toBeFalsy();
    expect(ship.contains(0,3)).toBeFalsy()
    ship.orientation = "vertical"
    expect(ship.contains(0,1)).toBeFalsy()
    expect(ship.contains(1,0)).toBeTruthy()
})
test("Receive attack works", ()=>{
    let gB = new Gameboard();
    gB.placeShip(1, 0, 0, "horizontal")
    gB.receiveAttack(0,1); gB.receiveAttack(0,0)
    expect(gB.board[0][1]).toBe("miss")
    expect(gB.board[0][0]).toBe("hit")
    expect(gB.isAllSunk()).toBeTruthy()
})
test("Converting id to pair works", ()=>{
    let p1 = new Player()
    expect(p1.convertIdToPair("e-0-0")).toEqual([0,0])
    expect(p1.convertIdToPair("e-10-2")).toEqual([10,2])
})
test("isValidAttack works", ()=>{
    let p1 = new Player(); p1.gameBoard.board[0][0] = "hit"
    expect(p1.isValidAttack("e-0-0")).toBeFalsy()
    expect(p1.isValidAttack("e-1-0")).toBeTruthy();
    

})
test("Is Valid Placement works", ()=>{
    let gB = new Gameboard()
    gB.placeShip(1, 0, 0, "horizontal")
    gB.placeShip(5, 0, 5, "vertical")
    expect(gB.isValidPlacement(1, 0, 0, "horizontal")).toBeFalsy()
    expect(gB.isValidPlacement(1, 1, 0, "vertical")).toBeTruthy()
    expect(gB.isValidPlacement(4, 0,1, "horizontal")).toBeTruthy()
    expect(gB.isValidPlacement(6, 0,0, "horizontal")).toBeFalsy()
    expect(gB.isValidPlacement(5, 0, 5, "vertical")).toBeFalsy()
    expect(gB.isValidPlacement(1, 4, 0, "horizontal")).toBeTruthy()
})
// test("Marking a hit works", ()=>{
//     let p1 = new Player(); let p2 = new Player();
//     //loadCells()
//     p1.enemy = p2; p2.enemy = p1;
//     p1.loadShips(); p2.loadShips()
//     //p1.startTurn() 
//     p1.processTurn("e-0-0")
//     expect(p2.gameBoard.board[0][0]).toBe("hit")
// })
// test("Player switch works", ()=>{
//     let p1 = new Player(); let p2 = new Player();
//     p1.startTurn(); p1.endTurn(); p1.startTurn();
//     expect()
// })