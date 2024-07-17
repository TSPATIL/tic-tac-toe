let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetBtn");
let newBtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let player = document.querySelector(".player");

let turnO = true;
let count = 0;
let gameStatus = 0;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boxes.forEach((box)=>{
    box.addEventListener("click", ()=>{
        console.log("Box was clicked!");
        if(turnO){
            box.innerText = "O";
            turnO = false;
        }
        else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;
	console.log(count);
        checkWinner();
        if(turnO === true)
           player.innerHTML = "Player O"
        else
           player.innerHTML = "Player X"
    })
})

const checkWinner = ()=>{
    for(let pattern of winPatterns) {
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText);

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val !== "" && pos2Val !== "" && pos3Val !== ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("Winner");
                showWinner(pos1Val);
                gameStatus = 1;
            }
        }
    }
    console.log(gameStatus + " " + count);
    if(gameStatus === 0 && count === 9){
        showTie();
    }
}

const disabledBoxes = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const showWinner = (winner)=>{
    msg.innerText = "Congratulations! Winner is " + winner;
    msgContainer.classList.remove("hide");
    disabledBoxes();
}

const showTie = ()=>{
    msg.innerText = "Match is Tied!";
    msgContainer.classList.remove("hide");
    disabledBoxes();
}

const resetGame = ()=>{
    turnO = !turnO;
    enableBoxes();
    msgContainer.classList.add("hide");
    count = 0;
    gameStatus = 0;
        if(turnO === true)
           player.innerHTML = "Player O"
        else
           player.innerHTML = "Player X"
}

const enableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

resetBtn.addEventListener("click", resetGame);
newBtn.addEventListener("click", resetGame);