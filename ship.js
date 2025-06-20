class Ship{
    constructor(length, startRow = 0, startCol = 0, orientation = "horizontal"){
        this.length = length; this.timesHit = 0; this.startRow = startRow; this.startCol = startCol; this.orientation = orientation;
    }
    hit(){
        this.timesHit+=1
    }
    contains(row, col){
        let endRow = this.orientation=="horizontal"?this.startRow: this.startRow+this.length-1;
        let endCol = this.orientation=="vertical"? this.startCol: this.startCol+this.length-1;
        return row>=this.startRow && row<=endRow && col>=this.startCol && col<=endCol;  
    }
    isSunk(){
        return this.length == this.timesHit
    }
}
export {Ship}