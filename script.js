let boxes = document.querySelectorAll(".box");
let msgContain = document.querySelector(".message_container");
let reset = document.querySelector("#resetbtn");
let newGame = document.querySelector("#new_btn");
let msg = document.querySelector("#msg");

let turnO = true;
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

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msg.innerText = ""; // Clear previous messages
    msgContain.classList.add("hide");
    msgContain.removeAttribute("aria-live"); // Reset aria-live
};

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.innerText = "";
        box.style.backgroundColor = ""; // Reset background color
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContain.classList.remove("hide");
    msgContain.setAttribute("aria-live", "polite"); // Notify screen readers
    disableBoxes();
};
const showDraw = () => {
    msg.innerText = "It's a draw!";
    msgContain.classList.remove("hide");
    msgContain.setAttribute("aria-live", "polite"); // Notify screen readers
    disableBoxes();
};

const highlightWinningBoxes = (pattern) => {
    pattern.forEach(index => {
        boxes[index].style.backgroundColor = "#d4edda"; // Highlight winning boxes
    });
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            highlightWinningBoxes(pattern); // Highlight winning boxes
            setTimeout(() => showWinner(pos1Val), 500); // Delay winner message
            return; // Stop checking once a winner is found
        }
    }
    // Check for a draw
    if ([...boxes].every(box => box.innerText !== "")) {
        msg.innerText = "It's a draw!";
        msgContain.classList.remove("hide");
        msgContain.setAttribute("aria-live", "polite"); // Notify screen readers
        disableBoxes();
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") { // Check if the box is empty
            box.innerText = turnO ? "O" : "X";
            box.style.color = turnO ? "rgb(0, 68, 255)" : "#E63946";
            box.disabled = true;
            turnO = !turnO; // Toggle turn
            checkWinner();
        }
    });
});

newGame.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
