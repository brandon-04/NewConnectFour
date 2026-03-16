
let board = document.querySelector("#board");
let turnHistory = [];
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

            let circleCoord = `y${i}-x${x}`;

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
            addPiece(circles[i].id)
        });
    }
}

function addPiece(elementCoord) {
    let colValue = elementCoord.substr(4);

    for(let i = 5; i >= 0; i--){
        let checkVal = `y${i}-x${colValue}`

        if(!turnHistory.includes(checkVal)){
            turnHistory += checkVal;
            turnCounter++;

            document.querySelector(`#${checkVal}`).classList.toggle(turnCounter % 2 == 0? "selectedBlue" : "selectedRed");
            break;
        }
    }

}
