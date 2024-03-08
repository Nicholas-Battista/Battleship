import { Player, Computer } from "./players";
import Ship from "./ship";

const player = new Player();
const computer = new Computer();
let divArray = [];
let compDivArray = [];
let divArrayPlacement = [];
let shipCounter = 0;
let isHorizontal = true;

const generatePlaceShipGrid = () => {
  const placeBoard = document.querySelector(".place-board");
  divArrayPlacement = [];

  for (let i = 0; i < 10; i++) {
    const subArray = [];
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");

      placeBoard.appendChild(cell);

      cell.addEventListener("click", () => placeShips(i, j));
      cell.addEventListener("mouseover", () => handleHover(cell, i, j));
      cell.addEventListener("mouseout", () => removeHover());
      subArray.push(cell);
    }
    divArrayPlacement.push(subArray);
  }
};

const placeShips = (row, col) => {
  const shipLengths = [5, 4, 3, 3, 2];

  if (
    player.board.placeShip(shipLengths[shipCounter], row, col, isHorizontal) !==
    null
  ) {
    player.board.placeShip(shipLengths[shipCounter], row, col, isHorizontal);
    if (isHorizontal) {
      for (let i = 0; i < shipLengths[shipCounter]; i++) {
        divArrayPlacement[row][col + i].style.backgroundColor = "lightgreen";
      }
    } else if (!isHorizontal) {
      for (let i = 0; i < shipLengths[shipCounter]; i++) {
        divArrayPlacement[row + i][col].style.backgroundColor = "lightgreen";
      }
    }
    displayPlayer();
    shipCounter++;
  }
};

const handleHover = (cell, row, col) => {
  const shipLengths = [5, 4, 3, 3, 2];

  if (isHorizontal) {
    for (let i = 0; i < shipLengths[shipCounter]; i++) {
      divArrayPlacement[row][col + i].classList.add("hovered");
    }
  } else if (!isHorizontal) {
    for (let i = 0; i < shipLengths[shipCounter]; i++) {
      divArrayPlacement[row + i][col].classList.add("hovered");
    }
  }
};

const removeHover = () => {
  const hovered = document.querySelectorAll(".hovered");
  hovered.forEach((item) => item.classList.remove("hovered"));
};

document
  .querySelector(".direction")
  .addEventListener("click", () => handleDirectionToggle());

const handleDirectionToggle = () => {
  if (isHorizontal) {
    document.querySelector(".direction").textContent = "Vertical";
    isHorizontal = false;
  } else if (!isHorizontal) {
    document.querySelector(".direction").textContent = "Horizontal";
    isHorizontal = true;
  }
};

const displayPlayer = () => {
  const playerBoard = document.querySelector(".playerBoard");
  playerBoard.innerHTML = "";
  divArray = [];

  for (let i = 0; i < 10; i++) {
    const subArray = [];
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");

      if (player.board.board[i][j] instanceof Ship) {
        cell.style.backgroundColor = "lightgreen";
        cell.style.border = "1px solid green";
      }

      playerBoard.appendChild(cell);
      subArray.push(cell);
    }
    divArray.push(subArray);
  }
};

const displayComputer = () => {
  const computerBoard = document.querySelector(".computerBoard");

  for (let i = 0; i < 10; i++) {
    let subArray = [];
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("compCell");
      computerBoard.appendChild(cell);
      subArray.push(cell);
    }
    compDivArray.push(subArray);
  }
  computerBoard.addEventListener("click", clickHandler);
};

const clickHandler = (event) => {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (compDivArray[i][j] === event.target) {
        if (player.trackShots.board[i][j] !== "X") {
          const cell = event.target;
          handleAttack(i, j, cell);
        }
      }
    }
  }
};

const handleAttack = (row, col, cell) => {
  computer.board.recieveAttack(row, col);
  const compCell = computer.board.board[row][col];

  if (computer.board.board[row][col] == null) {
    cell.textContent = "+";
    cell.style.backgroundColor = "#545454";
    player.trackShots.board[row][col] = "X";
    displayAttackResults("player", false, compCell);
  } else if (computer.board.board[row][col] instanceof Ship) {
    cell.style.backgroundColor = "red";
    cell.style.border = "1px solid #FF7F7F";
    player.trackShots.board[row][col] = "X";
    displayAttackResults("player", true, compCell);
  }
  if (determineAllSunk()) {
    displayWinner(true);
    return;
  }

  const validAttack = computer.attack();
  const playerCell = player.board.board[validAttack[0]][validAttack[1]];
  player.board.recieveAttack(validAttack[0], validAttack[1]);
  document
    .querySelector(".computerBoard")
    .removeEventListener("click", clickHandler);

  setTimeout(() => {
    if (playerCell == null) {
      divArray[validAttack[0]][validAttack[1]].textContent = "+";
      displayAttackResults("computer", false, cell, playerCell);
    } else if (playerCell instanceof Ship) {
      divArray[validAttack[0]][validAttack[1]].style.backgroundColor = "red";
      divArray[validAttack[0]][validAttack[1]].style.border =
        "1px solid #FF7F7F";
      displayAttackResults("computer", true, cell, playerCell);
    }
    displayWinner(false);

    document
      .querySelector(".computerBoard")
      .addEventListener("click", clickHandler);
  }, 2000);
};

const displayAttackResults = (who, hit, compCell, playerCell) => {
  const text = document.querySelector(".text");
  if (who === "player") {
    if (hit) {
      if (compCell.isSunk()) {
        text.textContent = `Hit computer ship! Ship sunk! (${compCell.length})`;
      } else {
        text.textContent = "Hit computer ship!";
      }
    } else {
      text.textContent = "You missed!";
    }
  } else if (who === "computer") {
    if (hit) {
      if (playerCell.isSunk()) {
        text.textContent = `Computer hit your ship! Ship sunk! (${playerCell.length})`;
      } else {
        text.textContent = "Computer hit your ship!";
      }
    } else {
      text.textContent = "Computer missed!";
    }
  }
};

const determineAllSunk = () => {
  if (computer.board.checkAllSunk()) {
    return true;
  } else if (player.board.checkAllSunk()) {
    return true;
  } else {
    return false;
  }
};

const displayWinner = (who) => {
  if (determineAllSunk()) {
    const text = document.querySelector(".text");
    if (who == true) {
      text.textContent = "You won! You sunk all enemy ships!!";
    } else if (who == false) {
      text.textContent = "You lost! The computer sunk all your ships!!";
    }
    return true;
  }
  return false;
};

document.querySelector(".start").addEventListener("click", () => {
  document.querySelector(".place-ships").classList.add("gone");
});

generatePlaceShipGrid();
computer.populateBoard();
displayComputer();
displayPlayer();

export { displayPlayer };
