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
const divArray = [];

const displayPlayer = () => {
  const playerBoard = document.querySelector(".playerBoard");

  for (let i = 0; i < 10; i++) {
    const subArray = [];
    for (let j = 0; j < 10; j++) {
      const cell = document.createElement("div");
      cell.classList.add("computerCell");

      if (player.board.board[i][j] instanceof _ship__WEBPACK_IMPORTED_MODULE_1__["default"]) {
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
  } else if (computer.board.board[row][col] instanceof _ship__WEBPACK_IMPORTED_MODULE_1__["default"]) {
    cell.style.backgroundColor = "red";
  }

  const validAttack = computer.attack();
  player.board.recieveAttack(validAttack[0], validAttack[1]);

  if (player.board.board[validAttack[0]][validAttack[1]] == null) {
    divArray[validAttack[0]][validAttack[1]].style.backgroundColor =
      "lightblue";
  } else if (
    player.board.board[validAttack[0]][validAttack[1]] instanceof _ship__WEBPACK_IMPORTED_MODULE_1__["default"]
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
      console.log(this.board);
    } else {
      console.log("invalid placement");
      return null;
    }
  }

  isPlacementValid(ship, row, col, isHorizontal) {
    for (let i = 0; i < ship.length; i++) {
      if (row + i >= 10 || col + i >= 10) return false;

      if (isHorizontal && this.board[row][col + i] !== null) {
        return false;
      } else if (!isHorizontal && this.board[row + i][col] !== null) {
        return false;
      }
    }
    return true;
  }

  recieveAttack(row, col) {
    let cell = this.board[row][col];
    if (cell == null) {
      console.log("Miss!");
      cell = "miss";
    } else {
      cell.hit();
      console.log("hit!");
      console.log(cell);
      if (cell.isSunk()) {
        console.log("ship sunk!");
      }
    }
  }

  checkAllSunk() {
    for (let row = 0; row < this.board.length; row++) {
      for (let col = 0; col < this.board[row].length; col++) {
        const cell = this.board[row][col];
        if (cell instanceof _ship__WEBPACK_IMPORTED_MODULE_0__["default"]) {
          if (!cell.isSunk()) {
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

  attack(computer, row, col) {
    computer.recieveAttack(row, col);
    return console.log(computer.checkAllSunk());
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
    console.log(this.board);
  }

  attack() {
    let hit = false;

    while (!hit) {
      let row = Math.floor(Math.random() * 10);
      let col = Math.floor(Math.random() * 10);
      let cell = this.trackShots.board[row][col];

      if (cell == null) {
        cell = "X";
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




const comp = new _players__WEBPACK_IMPORTED_MODULE_1__.Computer();
const player = new _players__WEBPACK_IMPORTED_MODULE_1__.Player();

comp.populateBoard();
player.board.placeShip(5, 0, 0, false);
player.board.placeShip(4, 0, 1, false);
player.board.placeShip(3, 0, 2, false);
player.board.placeShip(3, 0, 3, false);
player.board.placeShip(2, 0, 4, false);

comp.attack(player.board);
player.attack(comp.board, 0, 0);
player.attack(comp.board, 0, 1);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05vQztBQUNTO0FBQ1A7QUFDdEM7QUFDQSxpQkFBaUIsOENBQVE7QUFDekIsbUJBQW1CLDRDQUFNO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBsYXllciwgQ29tcHV0ZXIgfSBmcm9tIFwiLi9wbGF5ZXJzXCI7XHJcbmltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcclxuXHJcbmNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIoKTtcclxuY29uc3QgY29tcHV0ZXIgPSBuZXcgQ29tcHV0ZXIoKTtcclxuY29uc3QgZGl2QXJyYXkgPSBbXTtcclxuXHJcbmNvbnN0IGRpc3BsYXlQbGF5ZXIgPSAoKSA9PiB7XHJcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllckJvYXJkXCIpO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcclxuICAgIGNvbnN0IHN1YkFycmF5ID0gW107XHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcclxuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImNvbXB1dGVyQ2VsbFwiKTtcclxuXHJcbiAgICAgIGlmIChwbGF5ZXIuYm9hcmQuYm9hcmRbaV1bal0gaW5zdGFuY2VvZiBTaGlwKSB7XHJcbiAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImxpZ2h0Z3JlZW5cIjtcclxuICAgICAgfVxyXG5cclxuICAgICAgcGxheWVyQm9hcmQuYXBwZW5kQ2hpbGQoY2VsbCk7XHJcbiAgICAgIHN1YkFycmF5LnB1c2goY2VsbCk7XHJcbiAgICB9XHJcbiAgICBkaXZBcnJheS5wdXNoKHN1YkFycmF5KTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBkaXNwbGF5Q29tcHV0ZXIgPSAoKSA9PiB7XHJcbiAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29tcHV0ZXJCb2FyZFwiKTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcclxuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImNvbXB1dGVyQ2VsbFwiKTtcclxuICAgICAgY29tcHV0ZXJCb2FyZC5hcHBlbmRDaGlsZChjZWxsKTtcclxuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gaGFuZGxlQXR0YWNrKGksIGosIGNlbGwpKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBoYW5kbGVBdHRhY2sgPSAocm93LCBjb2wsIGNlbGwpID0+IHtcclxuICBjb21wdXRlci5ib2FyZC5yZWNpZXZlQXR0YWNrKHJvdywgY29sKTtcclxuXHJcbiAgaWYgKGNvbXB1dGVyLmJvYXJkLmJvYXJkW3Jvd11bY29sXSA9PSBudWxsKSB7XHJcbiAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRibHVlXCI7XHJcbiAgfSBlbHNlIGlmIChjb21wdXRlci5ib2FyZC5ib2FyZFtyb3ddW2NvbF0gaW5zdGFuY2VvZiBTaGlwKSB7XHJcbiAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmVkXCI7XHJcbiAgfVxyXG5cclxuICBjb25zdCB2YWxpZEF0dGFjayA9IGNvbXB1dGVyLmF0dGFjaygpO1xyXG4gIHBsYXllci5ib2FyZC5yZWNpZXZlQXR0YWNrKHZhbGlkQXR0YWNrWzBdLCB2YWxpZEF0dGFja1sxXSk7XHJcblxyXG4gIGlmIChwbGF5ZXIuYm9hcmQuYm9hcmRbdmFsaWRBdHRhY2tbMF1dW3ZhbGlkQXR0YWNrWzFdXSA9PSBudWxsKSB7XHJcbiAgICBkaXZBcnJheVt2YWxpZEF0dGFja1swXV1bdmFsaWRBdHRhY2tbMV1dLnN0eWxlLmJhY2tncm91bmRDb2xvciA9XHJcbiAgICAgIFwibGlnaHRibHVlXCI7XHJcbiAgfSBlbHNlIGlmIChcclxuICAgIHBsYXllci5ib2FyZC5ib2FyZFt2YWxpZEF0dGFja1swXV1bdmFsaWRBdHRhY2tbMV1dIGluc3RhbmNlb2YgU2hpcFxyXG4gICkge1xyXG4gICAgZGl2QXJyYXlbdmFsaWRBdHRhY2tbMF1dW3ZhbGlkQXR0YWNrWzFdXS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJlZFwiO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGRldGVybWluZUFsbFN1bmsgPSAoKSA9PiB7XHJcbiAgaWYgKGNvbXB1dGVyLmJvYXJkLmNoZWNrQWxsU3Vuaykge1xyXG4gICAgLy8gdXBkYXRlIHBvcHVwIC8gdGV4dCB0byBzYXkgcGxheWVyIHdvblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIGlmIChwbGF5ZXIuYm9hcmQuY2hlY2tBbGxTdW5rKSB7XHJcbiAgICAvLyB1cGRhdGUgcG9wdXAgLyB0ZXh0IHRvIHNheSBjb21wdXRlciB3b25cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59O1xyXG5cclxuY29tcHV0ZXIucG9wdWxhdGVCb2FyZCgpO1xyXG5kaXNwbGF5Q29tcHV0ZXIoKTtcclxucGxheWVyLmJvYXJkLnBsYWNlU2hpcCg1LCAwLCAwLCBmYWxzZSk7XHJcbnBsYXllci5ib2FyZC5wbGFjZVNoaXAoNCwgMCwgMSwgZmFsc2UpO1xyXG5wbGF5ZXIuYm9hcmQucGxhY2VTaGlwKDMsIDAsIDIsIGZhbHNlKTtcclxucGxheWVyLmJvYXJkLnBsYWNlU2hpcCgzLCAwLCAzLCBmYWxzZSk7XHJcbnBsYXllci5ib2FyZC5wbGFjZVNoaXAoMiwgMCwgNCwgZmFsc2UpO1xyXG5kaXNwbGF5UGxheWVyKCk7XHJcblxyXG5leHBvcnQgeyBkaXNwbGF5UGxheWVyIH07XHJcbiIsImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcclxuXHJcbmNsYXNzIEdhbWVib2FyZCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmJvYXJkID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKCkgPT4gQXJyYXkoMTApLmZpbGwobnVsbCkpO1xyXG4gICAgdGhpcy5hbGxTdW5rID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwbGFjZVNoaXAoc2hpcExlbmd0aCwgcm93LCBjb2wsIGlzSG9yaXpvbnRhbCA9IHRydWUpIHtcclxuICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChzaGlwTGVuZ3RoKTtcclxuXHJcbiAgICBpZiAodGhpcy5pc1BsYWNlbWVudFZhbGlkKHNoaXAsIHJvdywgY29sLCBpc0hvcml6b250YWwpKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGlzSG9yaXpvbnRhbCkge1xyXG4gICAgICAgICAgdGhpcy5ib2FyZFtyb3ddW2NvbCArIGldID0gc2hpcDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5ib2FyZFtyb3cgKyBpXVtjb2xdID0gc2hpcDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgY29uc29sZS5sb2codGhpcy5ib2FyZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLmxvZyhcImludmFsaWQgcGxhY2VtZW50XCIpO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzUGxhY2VtZW50VmFsaWQoc2hpcCwgcm93LCBjb2wsIGlzSG9yaXpvbnRhbCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChyb3cgKyBpID49IDEwIHx8IGNvbCArIGkgPj0gMTApIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgIGlmIChpc0hvcml6b250YWwgJiYgdGhpcy5ib2FyZFtyb3ddW2NvbCArIGldICE9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9IGVsc2UgaWYgKCFpc0hvcml6b250YWwgJiYgdGhpcy5ib2FyZFtyb3cgKyBpXVtjb2xdICE9PSBudWxsKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHJlY2lldmVBdHRhY2socm93LCBjb2wpIHtcclxuICAgIGxldCBjZWxsID0gdGhpcy5ib2FyZFtyb3ddW2NvbF07XHJcbiAgICBpZiAoY2VsbCA9PSBudWxsKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiTWlzcyFcIik7XHJcbiAgICAgIGNlbGwgPSBcIm1pc3NcIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNlbGwuaGl0KCk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiaGl0IVwiKTtcclxuICAgICAgY29uc29sZS5sb2coY2VsbCk7XHJcbiAgICAgIGlmIChjZWxsLmlzU3VuaygpKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzaGlwIHN1bmshXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjaGVja0FsbFN1bmsoKSB7XHJcbiAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCB0aGlzLmJvYXJkLmxlbmd0aDsgcm93KyspIHtcclxuICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgdGhpcy5ib2FyZFtyb3ddLmxlbmd0aDsgY29sKyspIHtcclxuICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5ib2FyZFtyb3ddW2NvbF07XHJcbiAgICAgICAgaWYgKGNlbGwgaW5zdGFuY2VvZiBTaGlwKSB7XHJcbiAgICAgICAgICBpZiAoIWNlbGwuaXNTdW5rKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XHJcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XHJcblxyXG5jbGFzcyBQbGF5ZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5ib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcclxuICAgIHRoaXMud29uR2FtZSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgYXR0YWNrKGNvbXB1dGVyLCByb3csIGNvbCkge1xyXG4gICAgY29tcHV0ZXIucmVjaWV2ZUF0dGFjayhyb3csIGNvbCk7XHJcbiAgICByZXR1cm4gY29uc29sZS5sb2coY29tcHV0ZXIuY2hlY2tBbGxTdW5rKCkpO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgQ29tcHV0ZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5ib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcclxuICAgIHRoaXMudHJhY2tTaG90cyA9IG5ldyBHYW1lYm9hcmQoKTtcclxuICAgIHRoaXMud29uR2FtZSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcG9wdWxhdGVCb2FyZCgpIHtcclxuICAgIGNvbnN0IHNoaXBMZW5ndGhzID0gWzUsIDQsIDMsIDMsIDJdO1xyXG5cclxuICAgIHNoaXBMZW5ndGhzLmZvckVhY2goKGxlbmd0aCkgPT4ge1xyXG4gICAgICBsZXQgcGxhY2VkID0gZmFsc2U7XHJcbiAgICAgIHdoaWxlICghcGxhY2VkKSB7XHJcbiAgICAgICAgbGV0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgICBsZXQgY29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICAgIGxldCBpc0hvcml6b250YWwgPSBNYXRoLnJhbmRvbSgpIDwgMC41O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5ib2FyZC5wbGFjZVNoaXAobGVuZ3RoLCByb3csIGNvbCwgaXNIb3Jpem9udGFsKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgdGhpcy5ib2FyZC5wbGFjZVNoaXAobGVuZ3RoLCByb3csIGNvbCwgaXNIb3Jpem9udGFsKTtcclxuICAgICAgICAgIHBsYWNlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMuYm9hcmQpO1xyXG4gIH1cclxuXHJcbiAgYXR0YWNrKCkge1xyXG4gICAgbGV0IGhpdCA9IGZhbHNlO1xyXG5cclxuICAgIHdoaWxlICghaGl0KSB7XHJcbiAgICAgIGxldCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgIGxldCBjb2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgIGxldCBjZWxsID0gdGhpcy50cmFja1Nob3RzLmJvYXJkW3Jvd11bY29sXTtcclxuXHJcbiAgICAgIGlmIChjZWxsID09IG51bGwpIHtcclxuICAgICAgICBjZWxsID0gXCJYXCI7XHJcbiAgICAgICAgaGl0ID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gW3JvdywgY29sXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHsgUGxheWVyLCBDb21wdXRlciB9O1xyXG4iLCJjbGFzcyBTaGlwIHtcclxuICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcclxuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgdGhpcy5oaXRzID0gMDtcclxuICAgIHRoaXMuc3VuayA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaGl0KCkge1xyXG4gICAgdGhpcy5oaXRzKys7XHJcbiAgfVxyXG5cclxuICBpc1N1bmsoKSB7XHJcbiAgICBpZiAodGhpcy5oaXRzID09IHRoaXMubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiAodGhpcy5zdW5rID0gdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XHJcbmltcG9ydCB7IFBsYXllciwgQ29tcHV0ZXIgfSBmcm9tIFwiLi9wbGF5ZXJzXCI7XHJcbmltcG9ydCB7IGRpc3BsYXlQbGF5ZXIgfSBmcm9tIFwiLi9ET01cIjtcclxuXHJcbmNvbnN0IGNvbXAgPSBuZXcgQ29tcHV0ZXIoKTtcclxuY29uc3QgcGxheWVyID0gbmV3IFBsYXllcigpO1xyXG5cclxuY29tcC5wb3B1bGF0ZUJvYXJkKCk7XHJcbnBsYXllci5ib2FyZC5wbGFjZVNoaXAoNSwgMCwgMCwgZmFsc2UpO1xyXG5wbGF5ZXIuYm9hcmQucGxhY2VTaGlwKDQsIDAsIDEsIGZhbHNlKTtcclxucGxheWVyLmJvYXJkLnBsYWNlU2hpcCgzLCAwLCAyLCBmYWxzZSk7XHJcbnBsYXllci5ib2FyZC5wbGFjZVNoaXAoMywgMCwgMywgZmFsc2UpO1xyXG5wbGF5ZXIuYm9hcmQucGxhY2VTaGlwKDIsIDAsIDQsIGZhbHNlKTtcclxuXHJcbmNvbXAuYXR0YWNrKHBsYXllci5ib2FyZCk7XHJcbnBsYXllci5hdHRhY2soY29tcC5ib2FyZCwgMCwgMCk7XHJcbnBsYXllci5hdHRhY2soY29tcC5ib2FyZCwgMCwgMSk7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==