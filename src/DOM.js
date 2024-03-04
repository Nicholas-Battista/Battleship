import { Player, Computer } from "./players";

const generateBoards = () => {
  const playerBoard = document.querySelector(".playerBoard");
  const computerBoard = document.querySelector(".computerBoard");

  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    playerBoard.appendChild(cell);
  }
  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    computerBoard.appendChild(cell);
  }
};

generateBoards();

export { generateBoards };
