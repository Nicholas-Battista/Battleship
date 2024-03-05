import { Player, Computer } from "./players";
import Ship from "./ship";

const player = new Player();
const computer = new Computer();

const displayPlayer = () => {
  const playerBoard = document.querySelector(".playerBoard");

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");

      cell.classList.add("computerCell");

      if (player.board.board[i][j] instanceof Ship) {
        cell.style.backgroundColor = "lightgreen";
      }

      playerBoard.appendChild(cell);
    }
  }
};

// object with two value - dom and refernce - dom creates div - reference stores value inside array

const displayComputer = () => {
  const computerBoard = document.querySelector(".computerBoard");

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("computerCell");
      computerBoard.appendChild(cell);
      cell.addEventListener("click", () =>
        handleCellClick(i, j, computer, cell)
      );
    }
  }
};

const handleCellClick = (row, col, playerOrComputer, cell) => {
  playerOrComputer.board.recieveAttack(row, col);

  if (playerOrComputer.board.board[row][col] == null) {
    cell.style.backgroundColor = "blue";
  } else if (playerOrComputer.board.board[row][col] instanceof Ship) {
    cell.style.backgroundColor = "red";
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
