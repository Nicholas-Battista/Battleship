import { Player, Computer } from "./players";
import Ship from "./ship";

const player = new Player();
const computer = new Computer();
const divArray = [];

const displayPlayer = () => {
  const playerBoard = document.querySelector(".playerBoard");

  for (let i = 0; i < 10; i++) {
    const subArray = [];
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("computerCell");

      if (player.board.board[i][j] instanceof Ship) {
        cell.style.backgroundColor = "lightgreen";
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
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("computerCell");
      computerBoard.appendChild(cell);
      cell.addEventListener("click", () => handleAttack(i, j, cell));
    }
  }
};

const handleAttack = (row, col, cell) => {
  computer.board.recieveAttack(row, col);

  if (computer.board.board[row][col] == null) {
    cell.style.backgroundColor = "lightblue";
  } else if (computer.board.board[row][col] instanceof Ship) {
    cell.style.backgroundColor = "red";
  }

  const validAttack = computer.attack();
  player.board.recieveAttack(validAttack[0], validAttack[1]);

  if (player.board.board[validAttack[0]][validAttack[1]] == null) {
    divArray[validAttack[0]][validAttack[1]].style.backgroundColor =
      "lightblue";
  } else if (
    player.board.board[validAttack[0]][validAttack[1]] instanceof Ship
  ) {
    divArray[validAttack[0]][validAttack[1]].style.backgroundColor = "red";
  }
};

const determineAllSunk = () => {
  if (computer.board.checkAllSunk) {
    // update popup / text to say player won
    return true;
  } else if (player.board.checkAllSunk) {
    // update popup / text to say computer won
    return true;
  } else {
    return false;
  }
};

computer.populateBoard();
displayComputer();
player.board.placeShip(5, 0, 0, false);
player.board.placeShip(4, 0, 1, false);
player.board.placeShip(3, 0, 2, false);
player.board.placeShip(3, 0, 3, false);
player.board.placeShip(2, 0, 4, false);
displayPlayer();

export { displayPlayer };
