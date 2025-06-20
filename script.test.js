import {Ship} from "./ship.js"
import { Gameboard } from "./gameboard.js";
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
})
test("Receive attack works", ()=>{
    let gB = new Gameboard();
    gB.placeShip(1, 0, 0, "horizontal")
    gB.receiveAttack(0,1); gB.receiveAttack(0,0)
    expect(gB.board[0][1]).toBe("miss")
    expect(gB.board[0][0]).toBe("hit")
    expect(gB.isAllSunk()).toBeTruthy()
})