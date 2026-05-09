
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
            if(turnCounter >=7) {
                checkDiagonal(pushValue);
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
        winPrompt(startingColor);
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
            winPrompt(startingColor);
        }
    }
}

function checkDiagonal(coord) {
    let xVal = parseInt(coord.substring(1,2));
    let yVal = parseInt(coord.substring(4,5));
    let startingColor = coord.substring(6,7);

    let diag1 = [];
    let diag2 = [];

    for(let i = 3; i >= 0; i--) {//x+3, y-3 --> x, y
        let checkVal = `x${xVal + i}-y${yVal - i}-${startingColor}`;
        diag1.push(checkVal);
    }
    for(let i = 1; i <= 3; i++) {//x-1, y+1 --> x-3, y+3
        let checkVal = `x${xVal - i}-y${yVal + i}-${startingColor}`;  
        diag1.push(checkVal);
    }
    for(let i = 3; i >= 0; i--) {//x+3, y+3 --> x, y
        let checkVal = `x${xVal + i}-y${yVal + i}-${startingColor}`;
        diag2.push(checkVal);
    }
    for(let i = 1; i <= 3; i++) {//x-3, y-3 --> x, y
        let checkVal = `x${xVal - i}-y${yVal - i}-${startingColor}`;
        diag2.push(checkVal);
    }
    
    let diagResults1 = "";
    let diagResults2 = "";

    diag1.forEach(cell => {
        diagResults1 += locationOfPieces.includes(cell) ? "1" : "0";
    });
    diag2.forEach(cell => {
        diagResults2 += locationOfPieces.includes(cell) ? "1" : "0";
    });

    if(diagResults1.includes("1111")) {
        winPrompt(startingColor);
    }
    else if(diagResults1.includes("1111")) {
        winPrompt(startingColor);
    }
}

function winPrompt(colour) {
    setTimeout(() => {
        alert(`${colour == "B"? "Blue" : "Red"} wins!`)
        location.reload();
    },110);
}


