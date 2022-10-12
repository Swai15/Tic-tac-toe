
let x_class = "x"
let circle_class = "circle"
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]")
const restartButton = document.getElementById("restartButton")
const winning_combinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]
let circleTurn

restartButton.addEventListener("click",startGame)

startGame()
function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(x_class)
    cell.classList.remove(circle_class)
    cell.removeEventListener("click",handleclick)
    cell.addEventListener("click",handleclick,{ once: true })
  })
  setBoardHoverClass();
  winningMessageElement.classList.remove("show")
}

function handleclick(e) {
  const cell = e.target
  const currentClass = circleTurn ? circle_class : x_class
  placemark(cell,currentClass)
  if (checkwin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapturns()
    setBoardHoverClass()

  }


}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.textContent = "Draw!"
  } else {
    winningMessageTextElement.textContent = `${circleTurn ? "O" : "X"} Wins!`
  }
  winningMessageElement.classList.add("show")
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(x_class) || cell.classList.contains(circle_class)
  })
}

function placemark(cell,currentClass) {
  cell.classList.add(currentClass)
}

function swapturns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  board.classList.remove(x_class);
  board.classList.remove(circle_class);
  if (circleTurn) {
    board.classList.add(circle_class)
  } else {
    board.classList.add(x_class)
  }
}

function checkwin(currentClass) {
  return winning_combinations.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}




//Placemark
//check for win
//check for draw
//switch turns