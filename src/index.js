import Gameboard from "./gameboard";

const board = new Gameboard();

board.placeShip(4, 0, 0);
board.placeShip(5, 0, 0);
board.placeShip(5, 0, 5, false);
board.recieveAttack(0, 5);
board.recieveAttack(1, 5);
board.recieveAttack(2, 5);
board.recieveAttack(3, 5);
board.recieveAttack(4, 5);
board.recieveAttack(5, 5);
board.checkAllSunk();
