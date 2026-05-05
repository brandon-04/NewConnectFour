
let board = document.querySelector("#board");

document.querySelector("#resetButton").addEventListener("click", () => {
    location.reload();
});

let blueTurnHistory = [];
let redTurnHistory = [];
let locationOfPieces = [];

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
            let pushValue = `${checkVal}-${turnCounter % 2 == 0?  "B" : "R"}`;

            document.querySelector(`#${checkVal}`).classList.toggle(turnCounter % 2 == 0?  "selectedBlue" : "selectedRed");

            turnCounter % 2 == 0? blueTurnHistory += pushValue : redTurnHistory += pushValue;
            locationOfPieces += pushValue;

            if(i <= 2){
                checkColumnWin(pushValue);
            }
            if(turnCounter >=7) {
                checkRowWin(pushValue);
            }

            turnCounter++;
            break;
        }
    }
}

function checkColumnWin(coord) {
    let xVal = coord.substring(1,2);
    let yVal = coord.substring(4,5);//stays the same
    let startingColor = coord.substring(6,7);
    let checkArray = "";

    for(let x = xVal; x <= 5; x++) {
        let checkVal = `x${x}-y${yVal}-${startingColor}`;
        checkArray += locationOfPieces.includes(checkVal) ? "1" : "0";
    }

    if(checkArray.includes("1111")) {
        setTimeout(() => {
            winPrompt(startingColor);
        }, 250)
    }
}

function checkRowWin(coord) {
    let xVal = coord.substring(1,2); //stays the same
    let yVal = coord.substring(4,5); 
    let startingColor = coord.substring(6,7);

    let checkArr = "";

    if(locationOfPieces.includes(`x${xVal}-y${3}-${startingColor}`)){
        for(let i = 0; i <= 6; i++) {
            let checkVal = `x${xVal}-y${i}-${startingColor}`

            checkArr += locationOfPieces.includes(checkVal) ? "1" : "0";
        }

        if(checkArr.includes("1111")) {
            setTimeout(() => {
                winPrompt(startingColor);
            }, 250)
        }

    }

}

function checkDiagonal(coord) {

}

function isEdge(coord) {
    
}


function winPrompt(colour) {
    alert(`${colour == "B"? "Blue" : "Red"} wins!`)
    location.reload();
}


//x{xValue}-y{yValue}-{Colour}
//row number = coord.substring(1, 2)
//column number = coord.substring(4, 5)
//cell colour = coord.substring(6, 7)

//red turn: when turnCounter % 2 != 0
//blue turn: when turnCounter % 2 == 0

//row win possibilities
// y0-y3
// y1-y4
// y2-y5
// y3-y6
// all potential wins go through y3

//column win possibilities
// x0-x3
// x1-x4
// x2-x5
// all potential wins go through x2 and x3

