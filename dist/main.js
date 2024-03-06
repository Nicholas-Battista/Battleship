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

const determineAllSunk = () => {};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7OztBQ05vQztBQUNTO0FBQ1A7QUFDdEM7QUFDQSxpQkFBaUIsOENBQVE7QUFDekIsbUJBQW1CLDRDQUFNO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBsYXllciwgQ29tcHV0ZXIgfSBmcm9tIFwiLi9wbGF5ZXJzXCI7XHJcbmltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcclxuXHJcbmNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIoKTtcclxuY29uc3QgY29tcHV0ZXIgPSBuZXcgQ29tcHV0ZXIoKTtcclxuY29uc3QgZGl2QXJyYXkgPSBbXTtcclxuXHJcbmNvbnN0IGRpc3BsYXlQbGF5ZXIgPSAoKSA9PiB7XHJcbiAgY29uc3QgcGxheWVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllckJvYXJkXCIpO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcclxuICAgIGNvbnN0IHN1YkFycmF5ID0gW107XHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcclxuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImNvbXB1dGVyQ2VsbFwiKTtcclxuXHJcbiAgICAgIGlmIChwbGF5ZXIuYm9hcmQuYm9hcmRbaV1bal0gaW5zdGFuY2VvZiBTaGlwKSB7XHJcbiAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImxpZ2h0Z3JlZW5cIjtcclxuICAgICAgfVxyXG5cclxuICAgICAgcGxheWVyQm9hcmQuYXBwZW5kQ2hpbGQoY2VsbCk7XHJcbiAgICAgIHN1YkFycmF5LnB1c2goY2VsbCk7XHJcbiAgICB9XHJcbiAgICBkaXZBcnJheS5wdXNoKHN1YkFycmF5KTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBkaXNwbGF5Q29tcHV0ZXIgPSAoKSA9PiB7XHJcbiAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29tcHV0ZXJCb2FyZFwiKTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcclxuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZChcImNvbXB1dGVyQ2VsbFwiKTtcclxuICAgICAgY29tcHV0ZXJCb2FyZC5hcHBlbmRDaGlsZChjZWxsKTtcclxuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gaGFuZGxlQXR0YWNrKGksIGosIGNlbGwpKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBoYW5kbGVBdHRhY2sgPSAocm93LCBjb2wsIGNlbGwpID0+IHtcclxuICBjb21wdXRlci5ib2FyZC5yZWNpZXZlQXR0YWNrKHJvdywgY29sKTtcclxuXHJcbiAgaWYgKGNvbXB1dGVyLmJvYXJkLmJvYXJkW3Jvd11bY29sXSA9PSBudWxsKSB7XHJcbiAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRibHVlXCI7XHJcbiAgfSBlbHNlIGlmIChjb21wdXRlci5ib2FyZC5ib2FyZFtyb3ddW2NvbF0gaW5zdGFuY2VvZiBTaGlwKSB7XHJcbiAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmVkXCI7XHJcbiAgfVxyXG5cclxuICBjb25zdCB2YWxpZEF0dGFjayA9IGNvbXB1dGVyLmF0dGFjaygpO1xyXG4gIHBsYXllci5ib2FyZC5yZWNpZXZlQXR0YWNrKHZhbGlkQXR0YWNrWzBdLCB2YWxpZEF0dGFja1sxXSk7XHJcblxyXG4gIGlmIChwbGF5ZXIuYm9hcmQuYm9hcmRbdmFsaWRBdHRhY2tbMF1dW3ZhbGlkQXR0YWNrWzFdXSA9PSBudWxsKSB7XHJcbiAgICBkaXZBcnJheVt2YWxpZEF0dGFja1swXV1bdmFsaWRBdHRhY2tbMV1dLnN0eWxlLmJhY2tncm91bmRDb2xvciA9XHJcbiAgICAgIFwibGlnaHRibHVlXCI7XHJcbiAgfSBlbHNlIGlmIChcclxuICAgIHBsYXllci5ib2FyZC5ib2FyZFt2YWxpZEF0dGFja1swXV1bdmFsaWRBdHRhY2tbMV1dIGluc3RhbmNlb2YgU2hpcFxyXG4gICkge1xyXG4gICAgZGl2QXJyYXlbdmFsaWRBdHRhY2tbMF1dW3ZhbGlkQXR0YWNrWzFdXS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJlZFwiO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGRldGVybWluZUFsbFN1bmsgPSAoKSA9PiB7fTtcclxuXHJcbmNvbXB1dGVyLnBvcHVsYXRlQm9hcmQoKTtcclxuZGlzcGxheUNvbXB1dGVyKCk7XHJcbnBsYXllci5ib2FyZC5wbGFjZVNoaXAoNSwgMCwgMCwgZmFsc2UpO1xyXG5wbGF5ZXIuYm9hcmQucGxhY2VTaGlwKDQsIDAsIDEsIGZhbHNlKTtcclxucGxheWVyLmJvYXJkLnBsYWNlU2hpcCgzLCAwLCAyLCBmYWxzZSk7XHJcbnBsYXllci5ib2FyZC5wbGFjZVNoaXAoMywgMCwgMywgZmFsc2UpO1xyXG5wbGF5ZXIuYm9hcmQucGxhY2VTaGlwKDIsIDAsIDQsIGZhbHNlKTtcclxuZGlzcGxheVBsYXllcigpO1xyXG5cclxuZXhwb3J0IHsgZGlzcGxheVBsYXllciB9O1xyXG4iLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XHJcblxyXG5jbGFzcyBHYW1lYm9hcmQge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5ib2FyZCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sICgpID0+IEFycmF5KDEwKS5maWxsKG51bGwpKTtcclxuICAgIHRoaXMuYWxsU3VuayA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcGxhY2VTaGlwKHNoaXBMZW5ndGgsIHJvdywgY29sLCBpc0hvcml6b250YWwgPSB0cnVlKSB7XHJcbiAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAoc2hpcExlbmd0aCk7XHJcblxyXG4gICAgaWYgKHRoaXMuaXNQbGFjZW1lbnRWYWxpZChzaGlwLCByb3csIGNvbCwgaXNIb3Jpem9udGFsKSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChpc0hvcml6b250YWwpIHtcclxuICAgICAgICAgIHRoaXMuYm9hcmRbcm93XVtjb2wgKyBpXSA9IHNoaXA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuYm9hcmRbcm93ICsgaV1bY29sXSA9IHNoaXA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuYm9hcmQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coXCJpbnZhbGlkIHBsYWNlbWVudFwiKTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc1BsYWNlbWVudFZhbGlkKHNoaXAsIHJvdywgY29sLCBpc0hvcml6b250YWwpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAocm93ICsgaSA+PSAxMCB8fCBjb2wgKyBpID49IDEwKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICBpZiAoaXNIb3Jpem9udGFsICYmIHRoaXMuYm9hcmRbcm93XVtjb2wgKyBpXSAhPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfSBlbHNlIGlmICghaXNIb3Jpem9udGFsICYmIHRoaXMuYm9hcmRbcm93ICsgaV1bY29sXSAhPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICByZWNpZXZlQXR0YWNrKHJvdywgY29sKSB7XHJcbiAgICBsZXQgY2VsbCA9IHRoaXMuYm9hcmRbcm93XVtjb2xdO1xyXG4gICAgaWYgKGNlbGwgPT0gbnVsbCkge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIk1pc3MhXCIpO1xyXG4gICAgICBjZWxsID0gXCJtaXNzXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjZWxsLmhpdCgpO1xyXG4gICAgICBjb25zb2xlLmxvZyhcImhpdCFcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKGNlbGwpO1xyXG4gICAgICBpZiAoY2VsbC5pc1N1bmsoKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2hpcCBzdW5rIVwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hlY2tBbGxTdW5rKCkge1xyXG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgdGhpcy5ib2FyZC5sZW5ndGg7IHJvdysrKSB7XHJcbiAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IHRoaXMuYm9hcmRbcm93XS5sZW5ndGg7IGNvbCsrKSB7XHJcbiAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuYm9hcmRbcm93XVtjb2xdO1xyXG4gICAgICAgIGlmIChjZWxsIGluc3RhbmNlb2YgU2hpcCkge1xyXG4gICAgICAgICAgaWYgKCFjZWxsLmlzU3VuaygpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xyXG4iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xyXG5cclxuY2xhc3MgUGxheWVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XHJcbiAgICB0aGlzLndvbkdhbWUgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGF0dGFjayhjb21wdXRlciwgcm93LCBjb2wpIHtcclxuICAgIGNvbXB1dGVyLnJlY2lldmVBdHRhY2socm93LCBjb2wpO1xyXG4gICAgcmV0dXJuIGNvbnNvbGUubG9nKGNvbXB1dGVyLmNoZWNrQWxsU3VuaygpKTtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIENvbXB1dGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XHJcbiAgICB0aGlzLnRyYWNrU2hvdHMgPSBuZXcgR2FtZWJvYXJkKCk7XHJcbiAgICB0aGlzLndvbkdhbWUgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHBvcHVsYXRlQm9hcmQoKSB7XHJcbiAgICBjb25zdCBzaGlwTGVuZ3RocyA9IFs1LCA0LCAzLCAzLCAyXTtcclxuXHJcbiAgICBzaGlwTGVuZ3Rocy5mb3JFYWNoKChsZW5ndGgpID0+IHtcclxuICAgICAgbGV0IHBsYWNlZCA9IGZhbHNlO1xyXG4gICAgICB3aGlsZSAoIXBsYWNlZCkge1xyXG4gICAgICAgIGxldCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgICAgbGV0IGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgICBsZXQgaXNIb3Jpem9udGFsID0gTWF0aC5yYW5kb20oKSA8IDAuNTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYm9hcmQucGxhY2VTaGlwKGxlbmd0aCwgcm93LCBjb2wsIGlzSG9yaXpvbnRhbCkgIT09IG51bGwpIHtcclxuICAgICAgICAgIHRoaXMuYm9hcmQucGxhY2VTaGlwKGxlbmd0aCwgcm93LCBjb2wsIGlzSG9yaXpvbnRhbCk7XHJcbiAgICAgICAgICBwbGFjZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLmJvYXJkKTtcclxuICB9XHJcblxyXG4gIGF0dGFjaygpIHtcclxuICAgIGxldCBoaXQgPSBmYWxzZTtcclxuXHJcbiAgICB3aGlsZSAoIWhpdCkge1xyXG4gICAgICBsZXQgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICBsZXQgY29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICBsZXQgY2VsbCA9IHRoaXMudHJhY2tTaG90cy5ib2FyZFtyb3ddW2NvbF07XHJcblxyXG4gICAgICBpZiAoY2VsbCA9PSBudWxsKSB7XHJcbiAgICAgICAgY2VsbCA9IFwiWFwiO1xyXG4gICAgICAgIGhpdCA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIFtyb3csIGNvbF07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFBsYXllciwgQ29tcHV0ZXIgfTtcclxuIiwiY2xhc3MgU2hpcCB7XHJcbiAgY29uc3RydWN0b3IobGVuZ3RoKSB7XHJcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgIHRoaXMuaGl0cyA9IDA7XHJcbiAgICB0aGlzLnN1bmsgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGhpdCgpIHtcclxuICAgIHRoaXMuaGl0cysrO1xyXG4gIH1cclxuXHJcbiAgaXNTdW5rKCkge1xyXG4gICAgaWYgKHRoaXMuaGl0cyA9PSB0aGlzLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gKHRoaXMuc3VuayA9IHRydWUpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xyXG5pbXBvcnQgeyBQbGF5ZXIsIENvbXB1dGVyIH0gZnJvbSBcIi4vcGxheWVyc1wiO1xyXG5pbXBvcnQgeyBkaXNwbGF5UGxheWVyIH0gZnJvbSBcIi4vRE9NXCI7XHJcblxyXG5jb25zdCBjb21wID0gbmV3IENvbXB1dGVyKCk7XHJcbmNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIoKTtcclxuXHJcbmNvbXAucG9wdWxhdGVCb2FyZCgpO1xyXG5wbGF5ZXIuYm9hcmQucGxhY2VTaGlwKDUsIDAsIDAsIGZhbHNlKTtcclxucGxheWVyLmJvYXJkLnBsYWNlU2hpcCg0LCAwLCAxLCBmYWxzZSk7XHJcbnBsYXllci5ib2FyZC5wbGFjZVNoaXAoMywgMCwgMiwgZmFsc2UpO1xyXG5wbGF5ZXIuYm9hcmQucGxhY2VTaGlwKDMsIDAsIDMsIGZhbHNlKTtcclxucGxheWVyLmJvYXJkLnBsYWNlU2hpcCgyLCAwLCA0LCBmYWxzZSk7XHJcblxyXG5jb21wLmF0dGFjayhwbGF5ZXIuYm9hcmQpO1xyXG5wbGF5ZXIuYXR0YWNrKGNvbXAuYm9hcmQsIDAsIDApO1xyXG5wbGF5ZXIuYXR0YWNrKGNvbXAuYm9hcmQsIDAsIDEpO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=