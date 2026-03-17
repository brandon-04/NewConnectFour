
let board = document.querySelector("#board");

document.querySelector("#resetButton").addEventListener("click", () => {
    location.reload();
});

let blueTurnHistory = [];
let redTurnHistory = [];
let turnCounter = 1;

createRowsAndCircles();
addHandlers();

function createRowsAndCircles() {
    for(let i = 0; i < 6; i++){
        let row = document.createElement("div");
        row.setAttribute("id",`row${i}`);
        row.setAttribute("class", "row");

        for(let x = 0; x < 7; x++){
            let circle = document.createElement("div");

            let circleCoord = `x${i}-y${x}`;

            circle.setAttribute("id", circleCoord);
            circle.setAttribute("class", "circle")

            row.appendChild(circle);
        }
        board.appendChild(row);
    }   
}

function addHandlers() {
    let circles = document.getElementsByClassName("circle");

    for(let i = 0; i < circles.length; i++){
        circles[i].addEventListener("click", () => {
            addPiece(circles[i].id);
            
        });
    }
}

function addPiece(elementCoord) {
    let colValue = elementCoord.substr(4);

    for(let i = 5; i >= 0; i--){
        let checkVal = `x${i}-y${colValue}`

        if(!blueTurnHistory.includes(checkVal)&&!redTurnHistory.includes(checkVal)){
            //red turn: when turnCounter % 2 != 0
            //blue turn: when turnCounter % 2 == 0

            turnCounter % 2 == 0? blueTurnHistory += checkVal : redTurnHistory += checkVal;
            document.querySelector(`#${checkVal}`).classList.toggle(turnCounter % 2 == 0?  "selectedBlue" : "selectedRed");
            turnCounter++;

            break;
        }
    }

}

function checkColumn(columnNumber) {
    let blueInColumn = 0;
    let redInColumn = 0;

    for(let i = 0; i < 6; i++) {
        let checkVal = `x${i}-y${columnNumber}`
        if(blueTurnHistory.includes(checkVal)) {
            blueInColumn ++;
        }
        if(redTurnHistory.includes(checkVal)) {
            redInColumn++;
        }
    }

}






//list of things to do
//1 - Create win check conditions and alghorithm.
//     . column win check
//     . row win check
//     . diagonal win check
