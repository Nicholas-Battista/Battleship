/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOM.js":
/*!********************!*\
  !*** ./src/DOM.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   displayPlayer: () => (/* binding */ displayPlayer)
/* harmony export */ });
/* harmony import */ var _players__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./players */ "./src/players.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ "./src/ship.js");



const player = new _players__WEBPACK_IMPORTED_MODULE_0__.Player();
const computer = new _players__WEBPACK_IMPORTED_MODULE_0__.Computer();
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

      if (player.board.board[i][j] instanceof _ship__WEBPACK_IMPORTED_MODULE_1__["default"]) {
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
  } else if (computer.board.board[row][col] instanceof _ship__WEBPACK_IMPORTED_MODULE_1__["default"]) {
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
    } else if (playerCell instanceof _ship__WEBPACK_IMPORTED_MODULE_1__["default"]) {
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




/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");


class Gameboard {
  constructor() {
    this.board = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.allSunk = false;
  }

  placeShip(shipLength, row, col, isHorizontal = true) {
    const ship = new _ship__WEBPACK_IMPORTED_MODULE_0__["default"](shipLength);

    if (this.isPlacementValid(ship, row, col, isHorizontal)) {
      for (let i = 0; i < shipLength; i++) {
        if (isHorizontal) {
          this.board[row][col + i] = ship;
        } else {
          this.board[row + i][col] = ship;
        }
      }
    } else {
      return null;
    }
  }

  isPlacementValid(ship, row, col, isHorizontal) {
    for (let i = 0; i < ship.length; i++) {
      if (isHorizontal) {
        if (col + i >= 10 || this.board[row][col + i] !== null) {
          return false;
        }
      } else if (!isHorizontal) {
        if (row + i >= 10 || this.board[row + i][col] !== null) {
          return false;
        }
      }
    }
    return true;
  }

  recieveAttack(row, col) {
    let cell = this.board[row][col];
    if (cell == null) {
      cell = "miss";
    } else {
      cell.hit();
      if (cell.isSunk()) {
        console.log("ship sunk!");
      }
    }
  }

  checkAllSunk() {
    for (let row = 0; row < 10; row++) {
      for (let col = 0; col < 10; col++) {
        const cell = this.board[row][col];
        if (cell instanceof _ship__WEBPACK_IMPORTED_MODULE_0__["default"]) {
          cell.isSunk();
          if (!cell.sunk) {
            return false;
          }
        }
      }
    }
    return true;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);


/***/ }),

/***/ "./src/players.js":
/*!************************!*\
  !*** ./src/players.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Computer: () => (/* binding */ Computer),
/* harmony export */   Player: () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");


class Player {
  constructor() {
    this.board = new _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.trackShots = new _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.wonGame = false;
  }
}

class Computer {
  constructor() {
    this.board = new _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.trackShots = new _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"]();
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
  }

  attack() {
    let hit = false;

    while (!hit) {
      let row = Math.floor(Math.random() * 10);
      let col = Math.floor(Math.random() * 10);
      let cell = this.trackShots.board[row][col];

      if (cell == null) {
        this.trackShots.board[row][col] = "X";
        hit = true;
        return [row, col];
      }
    }
  }
}




/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    if (this.hits == this.length) {
      return (this.sunk = true);
    }
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _players__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./players */ "./src/players.js");
/* harmony import */ var _DOM__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DOM */ "./src/DOM.js");




})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOb0M7QUFDUztBQUNQIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9ET00uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXJzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQbGF5ZXIsIENvbXB1dGVyIH0gZnJvbSBcIi4vcGxheWVyc1wiO1xyXG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XHJcblxyXG5jb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKCk7XHJcbmNvbnN0IGNvbXB1dGVyID0gbmV3IENvbXB1dGVyKCk7XHJcbmxldCBkaXZBcnJheSA9IFtdO1xyXG5sZXQgY29tcERpdkFycmF5ID0gW107XHJcbmxldCBkaXZBcnJheVBsYWNlbWVudCA9IFtdO1xyXG5sZXQgc2hpcENvdW50ZXIgPSAwO1xyXG5sZXQgaXNIb3Jpem9udGFsID0gdHJ1ZTtcclxuXHJcbmNvbnN0IGdlbmVyYXRlUGxhY2VTaGlwR3JpZCA9ICgpID0+IHtcclxuICBjb25zdCBwbGFjZUJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGFjZS1ib2FyZFwiKTtcclxuICBkaXZBcnJheVBsYWNlbWVudCA9IFtdO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcclxuICAgIGNvbnN0IHN1YkFycmF5ID0gW107XHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcclxuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblxyXG4gICAgICBwbGFjZUJvYXJkLmFwcGVuZENoaWxkKGNlbGwpO1xyXG5cclxuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gcGxhY2VTaGlwcyhpLCBqKSk7XHJcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoKSA9PiBoYW5kbGVIb3ZlcihjZWxsLCBpLCBqKSk7XHJcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsICgpID0+IHJlbW92ZUhvdmVyKCkpO1xyXG4gICAgICBzdWJBcnJheS5wdXNoKGNlbGwpO1xyXG4gICAgfVxyXG4gICAgZGl2QXJyYXlQbGFjZW1lbnQucHVzaChzdWJBcnJheSk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgcGxhY2VTaGlwcyA9IChyb3csIGNvbCkgPT4ge1xyXG4gIGNvbnN0IHNoaXBMZW5ndGhzID0gWzUsIDQsIDMsIDMsIDJdO1xyXG5cclxuICBpZiAoXHJcbiAgICBwbGF5ZXIuYm9hcmQucGxhY2VTaGlwKHNoaXBMZW5ndGhzW3NoaXBDb3VudGVyXSwgcm93LCBjb2wsIGlzSG9yaXpvbnRhbCkgIT09XHJcbiAgICBudWxsXHJcbiAgKSB7XHJcbiAgICBwbGF5ZXIuYm9hcmQucGxhY2VTaGlwKHNoaXBMZW5ndGhzW3NoaXBDb3VudGVyXSwgcm93LCBjb2wsIGlzSG9yaXpvbnRhbCk7XHJcbiAgICBpZiAoaXNIb3Jpem9udGFsKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aHNbc2hpcENvdW50ZXJdOyBpKyspIHtcclxuICAgICAgICBkaXZBcnJheVBsYWNlbWVudFtyb3ddW2NvbCArIGldLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRncmVlblwiO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKCFpc0hvcml6b250YWwpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3Roc1tzaGlwQ291bnRlcl07IGkrKykge1xyXG4gICAgICAgIGRpdkFycmF5UGxhY2VtZW50W3JvdyArIGldW2NvbF0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJsaWdodGdyZWVuXCI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGRpc3BsYXlQbGF5ZXIoKTtcclxuICAgIHNoaXBDb3VudGVyKys7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgaGFuZGxlSG92ZXIgPSAoY2VsbCwgcm93LCBjb2wpID0+IHtcclxuICBjb25zdCBzaGlwTGVuZ3RocyA9IFs1LCA0LCAzLCAzLCAyXTtcclxuXHJcbiAgaWYgKGlzSG9yaXpvbnRhbCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3Roc1tzaGlwQ291bnRlcl07IGkrKykge1xyXG4gICAgICBkaXZBcnJheVBsYWNlbWVudFtyb3ddW2NvbCArIGldLmNsYXNzTGlzdC5hZGQoXCJob3ZlcmVkXCIpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAoIWlzSG9yaXpvbnRhbCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3Roc1tzaGlwQ291bnRlcl07IGkrKykge1xyXG4gICAgICBkaXZBcnJheVBsYWNlbWVudFtyb3cgKyBpXVtjb2xdLmNsYXNzTGlzdC5hZGQoXCJob3ZlcmVkXCIpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IHJlbW92ZUhvdmVyID0gKCkgPT4ge1xyXG4gIGNvbnN0IGhvdmVyZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmhvdmVyZWRcIik7XHJcbiAgaG92ZXJlZC5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlcmVkXCIpKTtcclxufTtcclxuXHJcbmRvY3VtZW50XHJcbiAgLnF1ZXJ5U2VsZWN0b3IoXCIuZGlyZWN0aW9uXCIpXHJcbiAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBoYW5kbGVEaXJlY3Rpb25Ub2dnbGUoKSk7XHJcblxyXG5jb25zdCBoYW5kbGVEaXJlY3Rpb25Ub2dnbGUgPSAoKSA9PiB7XHJcbiAgaWYgKGlzSG9yaXpvbnRhbCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kaXJlY3Rpb25cIikudGV4dENvbnRlbnQgPSBcIlZlcnRpY2FsXCI7XHJcbiAgICBpc0hvcml6b250YWwgPSBmYWxzZTtcclxuICB9IGVsc2UgaWYgKCFpc0hvcml6b250YWwpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGlyZWN0aW9uXCIpLnRleHRDb250ZW50ID0gXCJIb3Jpem9udGFsXCI7XHJcbiAgICBpc0hvcml6b250YWwgPSB0cnVlO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGRpc3BsYXlQbGF5ZXIgPSAoKSA9PiB7XHJcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllckJvYXJkXCIpO1xyXG4gIHBsYXllckJvYXJkLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgZGl2QXJyYXkgPSBbXTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICBjb25zdCBzdWJBcnJheSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XHJcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgICAgaWYgKHBsYXllci5ib2FyZC5ib2FyZFtpXVtqXSBpbnN0YW5jZW9mIFNoaXApIHtcclxuICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRncmVlblwiO1xyXG4gICAgICAgIGNlbGwuc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgZ3JlZW5cIjtcclxuICAgICAgfVxyXG5cclxuICAgICAgcGxheWVyQm9hcmQuYXBwZW5kQ2hpbGQoY2VsbCk7XHJcbiAgICAgIHN1YkFycmF5LnB1c2goY2VsbCk7XHJcbiAgICB9XHJcbiAgICBkaXZBcnJheS5wdXNoKHN1YkFycmF5KTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBkaXNwbGF5Q29tcHV0ZXIgPSAoKSA9PiB7XHJcbiAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29tcHV0ZXJCb2FyZFwiKTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICBsZXQgc3ViQXJyYXkgPSBbXTtcclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xyXG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiY29tcENlbGxcIik7XHJcbiAgICAgIGNvbXB1dGVyQm9hcmQuYXBwZW5kQ2hpbGQoY2VsbCk7XHJcbiAgICAgIHN1YkFycmF5LnB1c2goY2VsbCk7XHJcbiAgICB9XHJcbiAgICBjb21wRGl2QXJyYXkucHVzaChzdWJBcnJheSk7XHJcbiAgfVxyXG4gIGNvbXB1dGVyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrSGFuZGxlcik7XHJcbn07XHJcblxyXG5jb25zdCBjbGlja0hhbmRsZXIgPSAoZXZlbnQpID0+IHtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xyXG4gICAgICBpZiAoY29tcERpdkFycmF5W2ldW2pdID09PSBldmVudC50YXJnZXQpIHtcclxuICAgICAgICBpZiAocGxheWVyLnRyYWNrU2hvdHMuYm9hcmRbaV1bal0gIT09IFwiWFwiKSB7XHJcbiAgICAgICAgICBjb25zdCBjZWxsID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgICAgaGFuZGxlQXR0YWNrKGksIGosIGNlbGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGhhbmRsZUF0dGFjayA9IChyb3csIGNvbCwgY2VsbCkgPT4ge1xyXG4gIGNvbXB1dGVyLmJvYXJkLnJlY2lldmVBdHRhY2socm93LCBjb2wpO1xyXG4gIGNvbnN0IGNvbXBDZWxsID0gY29tcHV0ZXIuYm9hcmQuYm9hcmRbcm93XVtjb2xdO1xyXG5cclxuICBpZiAoY29tcHV0ZXIuYm9hcmQuYm9hcmRbcm93XVtjb2xdID09IG51bGwpIHtcclxuICAgIGNlbGwudGV4dENvbnRlbnQgPSBcIitcIjtcclxuICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjNTQ1NDU0XCI7XHJcbiAgICBwbGF5ZXIudHJhY2tTaG90cy5ib2FyZFtyb3ddW2NvbF0gPSBcIlhcIjtcclxuICAgIGRpc3BsYXlBdHRhY2tSZXN1bHRzKFwicGxheWVyXCIsIGZhbHNlLCBjb21wQ2VsbCk7XHJcbiAgfSBlbHNlIGlmIChjb21wdXRlci5ib2FyZC5ib2FyZFtyb3ddW2NvbF0gaW5zdGFuY2VvZiBTaGlwKSB7XHJcbiAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmVkXCI7XHJcbiAgICBjZWxsLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkICNGRjdGN0ZcIjtcclxuICAgIHBsYXllci50cmFja1Nob3RzLmJvYXJkW3Jvd11bY29sXSA9IFwiWFwiO1xyXG4gICAgZGlzcGxheUF0dGFja1Jlc3VsdHMoXCJwbGF5ZXJcIiwgdHJ1ZSwgY29tcENlbGwpO1xyXG4gIH1cclxuICBpZiAoZGV0ZXJtaW5lQWxsU3VuaygpKSB7XHJcbiAgICBkaXNwbGF5V2lubmVyKHRydWUpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgdmFsaWRBdHRhY2sgPSBjb21wdXRlci5hdHRhY2soKTtcclxuICBjb25zdCBwbGF5ZXJDZWxsID0gcGxheWVyLmJvYXJkLmJvYXJkW3ZhbGlkQXR0YWNrWzBdXVt2YWxpZEF0dGFja1sxXV07XHJcbiAgcGxheWVyLmJvYXJkLnJlY2lldmVBdHRhY2sodmFsaWRBdHRhY2tbMF0sIHZhbGlkQXR0YWNrWzFdKTtcclxuICBkb2N1bWVudFxyXG4gICAgLnF1ZXJ5U2VsZWN0b3IoXCIuY29tcHV0ZXJCb2FyZFwiKVxyXG4gICAgLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGlja0hhbmRsZXIpO1xyXG5cclxuICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIGlmIChwbGF5ZXJDZWxsID09IG51bGwpIHtcclxuICAgICAgZGl2QXJyYXlbdmFsaWRBdHRhY2tbMF1dW3ZhbGlkQXR0YWNrWzFdXS50ZXh0Q29udGVudCA9IFwiK1wiO1xyXG4gICAgICBkaXNwbGF5QXR0YWNrUmVzdWx0cyhcImNvbXB1dGVyXCIsIGZhbHNlLCBjZWxsLCBwbGF5ZXJDZWxsKTtcclxuICAgIH0gZWxzZSBpZiAocGxheWVyQ2VsbCBpbnN0YW5jZW9mIFNoaXApIHtcclxuICAgICAgZGl2QXJyYXlbdmFsaWRBdHRhY2tbMF1dW3ZhbGlkQXR0YWNrWzFdXS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJlZFwiO1xyXG4gICAgICBkaXZBcnJheVt2YWxpZEF0dGFja1swXV1bdmFsaWRBdHRhY2tbMV1dLnN0eWxlLmJvcmRlciA9XHJcbiAgICAgICAgXCIxcHggc29saWQgI0ZGN0Y3RlwiO1xyXG4gICAgICBkaXNwbGF5QXR0YWNrUmVzdWx0cyhcImNvbXB1dGVyXCIsIHRydWUsIGNlbGwsIHBsYXllckNlbGwpO1xyXG4gICAgfVxyXG4gICAgZGlzcGxheVdpbm5lcihmYWxzZSk7XHJcblxyXG4gICAgZG9jdW1lbnRcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIuY29tcHV0ZXJCb2FyZFwiKVxyXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrSGFuZGxlcik7XHJcbiAgfSwgMjAwMCk7XHJcbn07XHJcblxyXG5jb25zdCBkaXNwbGF5QXR0YWNrUmVzdWx0cyA9ICh3aG8sIGhpdCwgY29tcENlbGwsIHBsYXllckNlbGwpID0+IHtcclxuICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZXh0XCIpO1xyXG4gIGlmICh3aG8gPT09IFwicGxheWVyXCIpIHtcclxuICAgIGlmIChoaXQpIHtcclxuICAgICAgaWYgKGNvbXBDZWxsLmlzU3VuaygpKSB7XHJcbiAgICAgICAgdGV4dC50ZXh0Q29udGVudCA9IGBIaXQgY29tcHV0ZXIgc2hpcCEgU2hpcCBzdW5rISAoJHtjb21wQ2VsbC5sZW5ndGh9KWA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGV4dC50ZXh0Q29udGVudCA9IFwiSGl0IGNvbXB1dGVyIHNoaXAhXCI7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRleHQudGV4dENvbnRlbnQgPSBcIllvdSBtaXNzZWQhXCI7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmICh3aG8gPT09IFwiY29tcHV0ZXJcIikge1xyXG4gICAgaWYgKGhpdCkge1xyXG4gICAgICBpZiAocGxheWVyQ2VsbC5pc1N1bmsoKSkge1xyXG4gICAgICAgIHRleHQudGV4dENvbnRlbnQgPSBgQ29tcHV0ZXIgaGl0IHlvdXIgc2hpcCEgU2hpcCBzdW5rISAoJHtwbGF5ZXJDZWxsLmxlbmd0aH0pYDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0ZXh0LnRleHRDb250ZW50ID0gXCJDb21wdXRlciBoaXQgeW91ciBzaGlwIVwiO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0ZXh0LnRleHRDb250ZW50ID0gXCJDb21wdXRlciBtaXNzZWQhXCI7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgZGV0ZXJtaW5lQWxsU3VuayA9ICgpID0+IHtcclxuICBpZiAoY29tcHV0ZXIuYm9hcmQuY2hlY2tBbGxTdW5rKCkpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0gZWxzZSBpZiAocGxheWVyLmJvYXJkLmNoZWNrQWxsU3VuaygpKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGRpc3BsYXlXaW5uZXIgPSAod2hvKSA9PiB7XHJcbiAgaWYgKGRldGVybWluZUFsbFN1bmsoKSkge1xyXG4gICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGV4dFwiKTtcclxuICAgIGlmICh3aG8gPT0gdHJ1ZSkge1xyXG4gICAgICB0ZXh0LnRleHRDb250ZW50ID0gXCJZb3Ugd29uISBZb3Ugc3VuayBhbGwgZW5lbXkgc2hpcHMhIVwiO1xyXG4gICAgfSBlbHNlIGlmICh3aG8gPT0gZmFsc2UpIHtcclxuICAgICAgdGV4dC50ZXh0Q29udGVudCA9IFwiWW91IGxvc3QhIFRoZSBjb21wdXRlciBzdW5rIGFsbCB5b3VyIHNoaXBzISFcIjtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuICByZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXJ0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGFjZS1zaGlwc1wiKS5jbGFzc0xpc3QuYWRkKFwiZ29uZVwiKTtcclxufSk7XHJcblxyXG5nZW5lcmF0ZVBsYWNlU2hpcEdyaWQoKTtcclxuY29tcHV0ZXIucG9wdWxhdGVCb2FyZCgpO1xyXG5kaXNwbGF5Q29tcHV0ZXIoKTtcclxuZGlzcGxheVBsYXllcigpO1xyXG5cclxuZXhwb3J0IHsgZGlzcGxheVBsYXllciB9O1xyXG4iLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XHJcblxyXG5jbGFzcyBHYW1lYm9hcmQge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5ib2FyZCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sICgpID0+IEFycmF5KDEwKS5maWxsKG51bGwpKTtcclxuICAgIHRoaXMuYWxsU3VuayA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcGxhY2VTaGlwKHNoaXBMZW5ndGgsIHJvdywgY29sLCBpc0hvcml6b250YWwgPSB0cnVlKSB7XHJcbiAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAoc2hpcExlbmd0aCk7XHJcblxyXG4gICAgaWYgKHRoaXMuaXNQbGFjZW1lbnRWYWxpZChzaGlwLCByb3csIGNvbCwgaXNIb3Jpem9udGFsKSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChpc0hvcml6b250YWwpIHtcclxuICAgICAgICAgIHRoaXMuYm9hcmRbcm93XVtjb2wgKyBpXSA9IHNoaXA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuYm9hcmRbcm93ICsgaV1bY29sXSA9IHNoaXA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzUGxhY2VtZW50VmFsaWQoc2hpcCwgcm93LCBjb2wsIGlzSG9yaXpvbnRhbCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChpc0hvcml6b250YWwpIHtcclxuICAgICAgICBpZiAoY29sICsgaSA+PSAxMCB8fCB0aGlzLmJvYXJkW3Jvd11bY29sICsgaV0gIT09IG51bGwpIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAoIWlzSG9yaXpvbnRhbCkge1xyXG4gICAgICAgIGlmIChyb3cgKyBpID49IDEwIHx8IHRoaXMuYm9hcmRbcm93ICsgaV1bY29sXSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICByZWNpZXZlQXR0YWNrKHJvdywgY29sKSB7XHJcbiAgICBsZXQgY2VsbCA9IHRoaXMuYm9hcmRbcm93XVtjb2xdO1xyXG4gICAgaWYgKGNlbGwgPT0gbnVsbCkge1xyXG4gICAgICBjZWxsID0gXCJtaXNzXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjZWxsLmhpdCgpO1xyXG4gICAgICBpZiAoY2VsbC5pc1N1bmsoKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2hpcCBzdW5rIVwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hlY2tBbGxTdW5rKCkge1xyXG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgMTA7IHJvdysrKSB7XHJcbiAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IDEwOyBjb2wrKykge1xyXG4gICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmJvYXJkW3Jvd11bY29sXTtcclxuICAgICAgICBpZiAoY2VsbCBpbnN0YW5jZW9mIFNoaXApIHtcclxuICAgICAgICAgIGNlbGwuaXNTdW5rKCk7XHJcbiAgICAgICAgICBpZiAoIWNlbGwuc3Vuaykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcclxuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcclxuXHJcbmNsYXNzIFBsYXllciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xyXG4gICAgdGhpcy50cmFja1Nob3RzID0gbmV3IEdhbWVib2FyZCgpO1xyXG4gICAgdGhpcy53b25HYW1lID0gZmFsc2U7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBDb21wdXRlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xyXG4gICAgdGhpcy50cmFja1Nob3RzID0gbmV3IEdhbWVib2FyZCgpO1xyXG4gICAgdGhpcy53b25HYW1lID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwb3B1bGF0ZUJvYXJkKCkge1xyXG4gICAgY29uc3Qgc2hpcExlbmd0aHMgPSBbNSwgNCwgMywgMywgMl07XHJcblxyXG4gICAgc2hpcExlbmd0aHMuZm9yRWFjaCgobGVuZ3RoKSA9PiB7XHJcbiAgICAgIGxldCBwbGFjZWQgPSBmYWxzZTtcclxuICAgICAgd2hpbGUgKCFwbGFjZWQpIHtcclxuICAgICAgICBsZXQgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICAgIGxldCBjb2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgICAgbGV0IGlzSG9yaXpvbnRhbCA9IE1hdGgucmFuZG9tKCkgPCAwLjU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmJvYXJkLnBsYWNlU2hpcChsZW5ndGgsIHJvdywgY29sLCBpc0hvcml6b250YWwpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICB0aGlzLmJvYXJkLnBsYWNlU2hpcChsZW5ndGgsIHJvdywgY29sLCBpc0hvcml6b250YWwpO1xyXG4gICAgICAgICAgcGxhY2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYXR0YWNrKCkge1xyXG4gICAgbGV0IGhpdCA9IGZhbHNlO1xyXG5cclxuICAgIHdoaWxlICghaGl0KSB7XHJcbiAgICAgIGxldCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgIGxldCBjb2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgIGxldCBjZWxsID0gdGhpcy50cmFja1Nob3RzLmJvYXJkW3Jvd11bY29sXTtcclxuXHJcbiAgICAgIGlmIChjZWxsID09IG51bGwpIHtcclxuICAgICAgICB0aGlzLnRyYWNrU2hvdHMuYm9hcmRbcm93XVtjb2xdID0gXCJYXCI7XHJcbiAgICAgICAgaGl0ID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gW3JvdywgY29sXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHsgUGxheWVyLCBDb21wdXRlciB9O1xyXG4iLCJjbGFzcyBTaGlwIHtcclxuICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcclxuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgdGhpcy5oaXRzID0gMDtcclxuICAgIHRoaXMuc3VuayA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaGl0KCkge1xyXG4gICAgdGhpcy5oaXRzKys7XHJcbiAgfVxyXG5cclxuICBpc1N1bmsoKSB7XHJcbiAgICBpZiAodGhpcy5oaXRzID09IHRoaXMubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiAodGhpcy5zdW5rID0gdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XHJcbmltcG9ydCB7IFBsYXllciwgQ29tcHV0ZXIgfSBmcm9tIFwiLi9wbGF5ZXJzXCI7XHJcbmltcG9ydCB7IGRpc3BsYXlQbGF5ZXIgfSBmcm9tIFwiLi9ET01cIjtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9