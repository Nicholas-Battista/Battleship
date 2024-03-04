import Gameboard from "./gameboard";

class Player {
  constructor() {
    this.board = new Gameboard();
    this.wonGame = false;
  }

  populateBoard() {
    // let user place ships
    // incremenet the length on each placement
  }

  attack(computer, row, col) {
    // grab input from user on where to attack
    // dont allow attacks that have been done prev
    // recieve attack computer
    computer.recieveAttack(row, col);
  }
}

class Computer {
  constructor() {
    this.board = new Gameboard();
    this.wonGame = false;
  }

  populateBoard() {
    const shipLengths = [5, 4, 3, 3, 2];

    shipLengths.forEach((length) => {
      let placed = false;
      while (!placed) {
        let row = Math.floor(Math.random() * 10);
        let col = Math.floor(Math.random() * 10);
        let isHorizontal = Math.random() < 0.5;

        if (this.board.placeShip(length, row, col, isHorizontal) !== null) {
          this.board.placeShip(length, row, col, isHorizontal);
          placed = true;
        }
      }
    });
    console.log(this.board);
  }

  attack() {
    // choose a random num within boards range
    // if attack hasnt been placed there
    //  recieve attack (player)
    // else restart loop
    // exit loop once attack lands
  }
}

export { Player, Computer };
