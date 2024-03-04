import Gameboard from "./gameboard";

class Player {
  constructor() {
    this.board = new Gameboard();
    this.wonGame = false;
  }

  attack(computer, row, col) {
    computer.recieveAttack(row, col);
    return console.log(computer.checkAllSunk());
  }
}

class Computer {
  constructor() {
    this.board = new Gameboard();
    this.trackShots = new Gameboard();
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

  attack(player) {
    let hit = false;

    while (!hit) {
      let row = Math.floor(Math.random() * 10);
      let col = Math.floor(Math.random() * 10);
      let cell = this.trackShots.board[row][col];

      if (cell == null) {
        player.recieveAttack(row, col);
        cell = "X";
        hit = true;
        return console.log(player.checkAllSunk());
      }
    }
  }
}

export { Player, Computer };
