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
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      computerBoard.appendChild(cell);
      cell.addEventListener("click", () => handleAttack(i, j, cell));
    }
  }
};

const handleAttack = (row, col, cell) => {
  computer.board.recieveAttack(row, col);

  if (computer.board.board[row][col] == null) {
    cell.textContent = "+";
    cell.style.backgroundColor = "#545454";
  } else if (computer.board.board[row][col] instanceof _ship__WEBPACK_IMPORTED_MODULE_1__["default"]) {
    cell.style.backgroundColor = "red";
    cell.style.border = "1px solid #FF7F7F";
  }
  if (determineAllSunk()) {
    displayWinner(true);
    return;
  }

  const validAttack = computer.attack();
  player.board.recieveAttack(validAttack[0], validAttack[1]);

  if (player.board.board[validAttack[0]][validAttack[1]] == null) {
    divArray[validAttack[0]][validAttack[1]].textContent = "+";
  } else if (
    player.board.board[validAttack[0]][validAttack[1]] instanceof _ship__WEBPACK_IMPORTED_MODULE_1__["default"]
  ) {
    divArray[validAttack[0]][validAttack[1]].style.backgroundColor = "red";
    divArray[validAttack[0]][validAttack[1]].style.border = "1px solid #FF7F7F";
  }
  displayWinner(false);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSxxQkFBcUIsa0RBQVM7QUFDOUIsMEJBQTBCLGtEQUFTO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUM0Qjs7Ozs7Ozs7Ozs7Ozs7O0FDbkQ1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxJQUFJLEVBQUM7Ozs7Ozs7VUNsQnBCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05vQztBQUNTO0FBQ1AiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBsYXllciwgQ29tcHV0ZXIgfSBmcm9tIFwiLi9wbGF5ZXJzXCI7XHJcbmltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcclxuXHJcbmNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIoKTtcclxuY29uc3QgY29tcHV0ZXIgPSBuZXcgQ29tcHV0ZXIoKTtcclxubGV0IGRpdkFycmF5ID0gW107XHJcbmxldCBkaXZBcnJheVBsYWNlbWVudCA9IFtdO1xyXG5sZXQgc2hpcENvdW50ZXIgPSAwO1xyXG5sZXQgaXNIb3Jpem9udGFsID0gdHJ1ZTtcclxuXHJcbmNvbnN0IGdlbmVyYXRlUGxhY2VTaGlwR3JpZCA9ICgpID0+IHtcclxuICBjb25zdCBwbGFjZUJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGFjZS1ib2FyZFwiKTtcclxuICBkaXZBcnJheVBsYWNlbWVudCA9IFtdO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcclxuICAgIGNvbnN0IHN1YkFycmF5ID0gW107XHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcclxuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblxyXG4gICAgICBwbGFjZUJvYXJkLmFwcGVuZENoaWxkKGNlbGwpO1xyXG5cclxuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gcGxhY2VTaGlwcyhpLCBqKSk7XHJcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCAoKSA9PiBoYW5kbGVIb3ZlcihjZWxsLCBpLCBqKSk7XHJcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsICgpID0+IHJlbW92ZUhvdmVyKCkpO1xyXG4gICAgICBzdWJBcnJheS5wdXNoKGNlbGwpO1xyXG4gICAgfVxyXG4gICAgZGl2QXJyYXlQbGFjZW1lbnQucHVzaChzdWJBcnJheSk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgcGxhY2VTaGlwcyA9IChyb3csIGNvbCkgPT4ge1xyXG4gIGNvbnN0IHNoaXBMZW5ndGhzID0gWzUsIDQsIDMsIDMsIDJdO1xyXG5cclxuICBpZiAoXHJcbiAgICBwbGF5ZXIuYm9hcmQucGxhY2VTaGlwKHNoaXBMZW5ndGhzW3NoaXBDb3VudGVyXSwgcm93LCBjb2wsIGlzSG9yaXpvbnRhbCkgIT09XHJcbiAgICBudWxsXHJcbiAgKSB7XHJcbiAgICBwbGF5ZXIuYm9hcmQucGxhY2VTaGlwKHNoaXBMZW5ndGhzW3NoaXBDb3VudGVyXSwgcm93LCBjb2wsIGlzSG9yaXpvbnRhbCk7XHJcbiAgICBpZiAoaXNIb3Jpem9udGFsKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aHNbc2hpcENvdW50ZXJdOyBpKyspIHtcclxuICAgICAgICBkaXZBcnJheVBsYWNlbWVudFtyb3ddW2NvbCArIGldLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRncmVlblwiO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKCFpc0hvcml6b250YWwpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3Roc1tzaGlwQ291bnRlcl07IGkrKykge1xyXG4gICAgICAgIGRpdkFycmF5UGxhY2VtZW50W3JvdyArIGldW2NvbF0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJsaWdodGdyZWVuXCI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGRpc3BsYXlQbGF5ZXIoKTtcclxuICAgIHNoaXBDb3VudGVyKys7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgaGFuZGxlSG92ZXIgPSAoY2VsbCwgcm93LCBjb2wpID0+IHtcclxuICBjb25zdCBzaGlwTGVuZ3RocyA9IFs1LCA0LCAzLCAzLCAyXTtcclxuXHJcbiAgaWYgKGlzSG9yaXpvbnRhbCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3Roc1tzaGlwQ291bnRlcl07IGkrKykge1xyXG4gICAgICBkaXZBcnJheVBsYWNlbWVudFtyb3ddW2NvbCArIGldLmNsYXNzTGlzdC5hZGQoXCJob3ZlcmVkXCIpO1xyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAoIWlzSG9yaXpvbnRhbCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3Roc1tzaGlwQ291bnRlcl07IGkrKykge1xyXG4gICAgICBkaXZBcnJheVBsYWNlbWVudFtyb3cgKyBpXVtjb2xdLmNsYXNzTGlzdC5hZGQoXCJob3ZlcmVkXCIpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IHJlbW92ZUhvdmVyID0gKCkgPT4ge1xyXG4gIGNvbnN0IGhvdmVyZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmhvdmVyZWRcIik7XHJcbiAgaG92ZXJlZC5mb3JFYWNoKChpdGVtKSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoXCJob3ZlcmVkXCIpKTtcclxufTtcclxuXHJcbmRvY3VtZW50XHJcbiAgLnF1ZXJ5U2VsZWN0b3IoXCIuZGlyZWN0aW9uXCIpXHJcbiAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBoYW5kbGVEaXJlY3Rpb25Ub2dnbGUoKSk7XHJcblxyXG5jb25zdCBoYW5kbGVEaXJlY3Rpb25Ub2dnbGUgPSAoKSA9PiB7XHJcbiAgaWYgKGlzSG9yaXpvbnRhbCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kaXJlY3Rpb25cIikudGV4dENvbnRlbnQgPSBcIlZlcnRpY2FsXCI7XHJcbiAgICBpc0hvcml6b250YWwgPSBmYWxzZTtcclxuICB9IGVsc2UgaWYgKCFpc0hvcml6b250YWwpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGlyZWN0aW9uXCIpLnRleHRDb250ZW50ID0gXCJIb3Jpem9udGFsXCI7XHJcbiAgICBpc0hvcml6b250YWwgPSB0cnVlO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGRpc3BsYXlQbGF5ZXIgPSAoKSA9PiB7XHJcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllckJvYXJkXCIpO1xyXG4gIHBsYXllckJvYXJkLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgZGl2QXJyYXkgPSBbXTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICBjb25zdCBzdWJBcnJheSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XHJcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgICAgaWYgKHBsYXllci5ib2FyZC5ib2FyZFtpXVtqXSBpbnN0YW5jZW9mIFNoaXApIHtcclxuICAgICAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRncmVlblwiO1xyXG4gICAgICAgIGNlbGwuc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgZ3JlZW5cIjtcclxuICAgICAgfVxyXG5cclxuICAgICAgcGxheWVyQm9hcmQuYXBwZW5kQ2hpbGQoY2VsbCk7XHJcbiAgICAgIHN1YkFycmF5LnB1c2goY2VsbCk7XHJcbiAgICB9XHJcbiAgICBkaXZBcnJheS5wdXNoKHN1YkFycmF5KTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBkaXNwbGF5Q29tcHV0ZXIgPSAoKSA9PiB7XHJcbiAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29tcHV0ZXJCb2FyZFwiKTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcclxuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgIGNvbXB1dGVyQm9hcmQuYXBwZW5kQ2hpbGQoY2VsbCk7XHJcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGhhbmRsZUF0dGFjayhpLCBqLCBjZWxsKSk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgaGFuZGxlQXR0YWNrID0gKHJvdywgY29sLCBjZWxsKSA9PiB7XHJcbiAgY29tcHV0ZXIuYm9hcmQucmVjaWV2ZUF0dGFjayhyb3csIGNvbCk7XHJcblxyXG4gIGlmIChjb21wdXRlci5ib2FyZC5ib2FyZFtyb3ddW2NvbF0gPT0gbnVsbCkge1xyXG4gICAgY2VsbC50ZXh0Q29udGVudCA9IFwiK1wiO1xyXG4gICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIiM1NDU0NTRcIjtcclxuICB9IGVsc2UgaWYgKGNvbXB1dGVyLmJvYXJkLmJvYXJkW3Jvd11bY29sXSBpbnN0YW5jZW9mIFNoaXApIHtcclxuICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZWRcIjtcclxuICAgIGNlbGwuc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgI0ZGN0Y3RlwiO1xyXG4gIH1cclxuICBpZiAoZGV0ZXJtaW5lQWxsU3VuaygpKSB7XHJcbiAgICBkaXNwbGF5V2lubmVyKHRydWUpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgdmFsaWRBdHRhY2sgPSBjb21wdXRlci5hdHRhY2soKTtcclxuICBwbGF5ZXIuYm9hcmQucmVjaWV2ZUF0dGFjayh2YWxpZEF0dGFja1swXSwgdmFsaWRBdHRhY2tbMV0pO1xyXG5cclxuICBpZiAocGxheWVyLmJvYXJkLmJvYXJkW3ZhbGlkQXR0YWNrWzBdXVt2YWxpZEF0dGFja1sxXV0gPT0gbnVsbCkge1xyXG4gICAgZGl2QXJyYXlbdmFsaWRBdHRhY2tbMF1dW3ZhbGlkQXR0YWNrWzFdXS50ZXh0Q29udGVudCA9IFwiK1wiO1xyXG4gIH0gZWxzZSBpZiAoXHJcbiAgICBwbGF5ZXIuYm9hcmQuYm9hcmRbdmFsaWRBdHRhY2tbMF1dW3ZhbGlkQXR0YWNrWzFdXSBpbnN0YW5jZW9mIFNoaXBcclxuICApIHtcclxuICAgIGRpdkFycmF5W3ZhbGlkQXR0YWNrWzBdXVt2YWxpZEF0dGFja1sxXV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZWRcIjtcclxuICAgIGRpdkFycmF5W3ZhbGlkQXR0YWNrWzBdXVt2YWxpZEF0dGFja1sxXV0uc3R5bGUuYm9yZGVyID0gXCIxcHggc29saWQgI0ZGN0Y3RlwiO1xyXG4gIH1cclxuICBkaXNwbGF5V2lubmVyKGZhbHNlKTtcclxufTtcclxuXHJcbmNvbnN0IGRldGVybWluZUFsbFN1bmsgPSAoKSA9PiB7XHJcbiAgaWYgKGNvbXB1dGVyLmJvYXJkLmNoZWNrQWxsU3VuaygpKSB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9IGVsc2UgaWYgKHBsYXllci5ib2FyZC5jaGVja0FsbFN1bmsoKSkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBkaXNwbGF5V2lubmVyID0gKHdobykgPT4ge1xyXG4gIGlmIChkZXRlcm1pbmVBbGxTdW5rKCkpIHtcclxuICAgIGNvbnN0IHRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRleHRcIik7XHJcbiAgICBpZiAod2hvID09IHRydWUpIHtcclxuICAgICAgdGV4dC50ZXh0Q29udGVudCA9IFwiWW91IHdvbiEgWW91IHN1bmsgYWxsIGVuZW15IHNoaXBzISFcIjtcclxuICAgIH0gZWxzZSBpZiAod2hvID09IGZhbHNlKSB7XHJcbiAgICAgIHRleHQudGV4dENvbnRlbnQgPSBcIllvdSBsb3N0ISBUaGUgY29tcHV0ZXIgc3VuayBhbGwgeW91ciBzaGlwcyEhXCI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGFydFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxhY2Utc2hpcHNcIikuY2xhc3NMaXN0LmFkZChcImdvbmVcIik7XHJcbn0pO1xyXG5cclxuZ2VuZXJhdGVQbGFjZVNoaXBHcmlkKCk7XHJcbmNvbXB1dGVyLnBvcHVsYXRlQm9hcmQoKTtcclxuZGlzcGxheUNvbXB1dGVyKCk7XHJcbmRpc3BsYXlQbGF5ZXIoKTtcclxuXHJcbmV4cG9ydCB7IGRpc3BsYXlQbGF5ZXIgfTtcclxuIiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xyXG5cclxuY2xhc3MgR2FtZWJvYXJkIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuYm9hcmQgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiAxMCB9LCAoKSA9PiBBcnJheSgxMCkuZmlsbChudWxsKSk7XHJcbiAgICB0aGlzLmFsbFN1bmsgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHBsYWNlU2hpcChzaGlwTGVuZ3RoLCByb3csIGNvbCwgaXNIb3Jpem9udGFsID0gdHJ1ZSkge1xyXG4gICAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKHNoaXBMZW5ndGgpO1xyXG5cclxuICAgIGlmICh0aGlzLmlzUGxhY2VtZW50VmFsaWQoc2hpcCwgcm93LCBjb2wsIGlzSG9yaXpvbnRhbCkpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoaXNIb3Jpem9udGFsKSB7XHJcbiAgICAgICAgICB0aGlzLmJvYXJkW3Jvd11bY29sICsgaV0gPSBzaGlwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLmJvYXJkW3JvdyArIGldW2NvbF0gPSBzaGlwO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc1BsYWNlbWVudFZhbGlkKHNoaXAsIHJvdywgY29sLCBpc0hvcml6b250YWwpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoaXNIb3Jpem9udGFsKSB7XHJcbiAgICAgICAgaWYgKGNvbCArIGkgPj0gMTAgfHwgdGhpcy5ib2FyZFtyb3ddW2NvbCArIGldICE9PSBudWxsKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2UgaWYgKCFpc0hvcml6b250YWwpIHtcclxuICAgICAgICBpZiAocm93ICsgaSA+PSAxMCB8fCB0aGlzLmJvYXJkW3JvdyArIGldW2NvbF0gIT09IG51bGwpIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcmVjaWV2ZUF0dGFjayhyb3csIGNvbCkge1xyXG4gICAgbGV0IGNlbGwgPSB0aGlzLmJvYXJkW3Jvd11bY29sXTtcclxuICAgIGlmIChjZWxsID09IG51bGwpIHtcclxuICAgICAgY2VsbCA9IFwibWlzc1wiO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2VsbC5oaXQoKTtcclxuICAgICAgaWYgKGNlbGwuaXNTdW5rKCkpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInNoaXAgc3VuayFcIik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNoZWNrQWxsU3VuaygpIHtcclxuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IDEwOyByb3crKykge1xyXG4gICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCAxMDsgY29sKyspIHtcclxuICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5ib2FyZFtyb3ddW2NvbF07XHJcbiAgICAgICAgaWYgKGNlbGwgaW5zdGFuY2VvZiBTaGlwKSB7XHJcbiAgICAgICAgICBjZWxsLmlzU3VuaygpO1xyXG4gICAgICAgICAgaWYgKCFjZWxsLnN1bmspIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XHJcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XHJcblxyXG5jbGFzcyBQbGF5ZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5ib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcclxuICAgIHRoaXMud29uR2FtZSA9IGZhbHNlO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgQ29tcHV0ZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5ib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcclxuICAgIHRoaXMudHJhY2tTaG90cyA9IG5ldyBHYW1lYm9hcmQoKTtcclxuICAgIHRoaXMud29uR2FtZSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcG9wdWxhdGVCb2FyZCgpIHtcclxuICAgIGNvbnN0IHNoaXBMZW5ndGhzID0gWzUsIDQsIDMsIDMsIDJdO1xyXG5cclxuICAgIHNoaXBMZW5ndGhzLmZvckVhY2goKGxlbmd0aCkgPT4ge1xyXG4gICAgICBsZXQgcGxhY2VkID0gZmFsc2U7XHJcbiAgICAgIHdoaWxlICghcGxhY2VkKSB7XHJcbiAgICAgICAgbGV0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgICBsZXQgY29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICAgIGxldCBpc0hvcml6b250YWwgPSBNYXRoLnJhbmRvbSgpIDwgMC41O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5ib2FyZC5wbGFjZVNoaXAobGVuZ3RoLCByb3csIGNvbCwgaXNIb3Jpem9udGFsKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgdGhpcy5ib2FyZC5wbGFjZVNoaXAobGVuZ3RoLCByb3csIGNvbCwgaXNIb3Jpem9udGFsKTtcclxuICAgICAgICAgIHBsYWNlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGF0dGFjaygpIHtcclxuICAgIGxldCBoaXQgPSBmYWxzZTtcclxuXHJcbiAgICB3aGlsZSAoIWhpdCkge1xyXG4gICAgICBsZXQgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICBsZXQgY29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICBsZXQgY2VsbCA9IHRoaXMudHJhY2tTaG90cy5ib2FyZFtyb3ddW2NvbF07XHJcblxyXG4gICAgICBpZiAoY2VsbCA9PSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy50cmFja1Nob3RzLmJvYXJkW3Jvd11bY29sXSA9IFwiWFwiO1xyXG4gICAgICAgIGhpdCA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIFtyb3csIGNvbF07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFBsYXllciwgQ29tcHV0ZXIgfTtcclxuIiwiY2xhc3MgU2hpcCB7XHJcbiAgY29uc3RydWN0b3IobGVuZ3RoKSB7XHJcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgIHRoaXMuaGl0cyA9IDA7XHJcbiAgICB0aGlzLnN1bmsgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGhpdCgpIHtcclxuICAgIHRoaXMuaGl0cysrO1xyXG4gIH1cclxuXHJcbiAgaXNTdW5rKCkge1xyXG4gICAgaWYgKHRoaXMuaGl0cyA9PSB0aGlzLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gKHRoaXMuc3VuayA9IHRydWUpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xyXG5pbXBvcnQgeyBQbGF5ZXIsIENvbXB1dGVyIH0gZnJvbSBcIi4vcGxheWVyc1wiO1xyXG5pbXBvcnQgeyBkaXNwbGF5UGxheWVyIH0gZnJvbSBcIi4vRE9NXCI7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==