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
    cell.textContent = "X";
    cell.style.backgroundColor = "#545454";
  } else if (computer.board.board[row][col] instanceof _ship__WEBPACK_IMPORTED_MODULE_1__["default"]) {
    cell.style.backgroundColor = "red";
    cell.style.border = "1px solid #FF7F7F";
  }

  const validAttack = computer.attack();
  player.board.recieveAttack(validAttack[0], validAttack[1]);

  if (player.board.board[validAttack[0]][validAttack[1]] == null) {
    divArray[validAttack[0]][validAttack[1]].textContent = "X";
  } else if (
    player.board.board[validAttack[0]][validAttack[1]] instanceof _ship__WEBPACK_IMPORTED_MODULE_1__["default"]
  ) {
    divArray[validAttack[0]][validAttack[1]].style.backgroundColor = "red";
    divArray[validAttack[0]][validAttack[1]].style.border = "1px solid #FF7F7F";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDNEI7Ozs7Ozs7Ozs7Ozs7OztBQ25ENUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWUsSUFBSSxFQUFDOzs7Ozs7O1VDbEJwQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOb0M7QUFDUztBQUNQIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9ET00uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9wbGF5ZXJzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQbGF5ZXIsIENvbXB1dGVyIH0gZnJvbSBcIi4vcGxheWVyc1wiO1xyXG5pbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XHJcblxyXG5jb25zdCBwbGF5ZXIgPSBuZXcgUGxheWVyKCk7XHJcbmNvbnN0IGNvbXB1dGVyID0gbmV3IENvbXB1dGVyKCk7XHJcbmxldCBkaXZBcnJheSA9IFtdO1xyXG5sZXQgZGl2QXJyYXlQbGFjZW1lbnQgPSBbXTtcclxubGV0IHNoaXBDb3VudGVyID0gMDtcclxubGV0IGlzSG9yaXpvbnRhbCA9IHRydWU7XHJcblxyXG5jb25zdCBnZW5lcmF0ZVBsYWNlU2hpcEdyaWQgPSAoKSA9PiB7XHJcbiAgY29uc3QgcGxhY2VCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxhY2UtYm9hcmRcIik7XHJcbiAgZGl2QXJyYXlQbGFjZW1lbnQgPSBbXTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICBjb25zdCBzdWJBcnJheSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XHJcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgICAgcGxhY2VCb2FyZC5hcHBlbmRDaGlsZChjZWxsKTtcclxuXHJcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHBsYWNlU2hpcHMoaSwgaikpO1xyXG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKCkgPT4gaGFuZGxlSG92ZXIoY2VsbCwgaSwgaikpO1xyXG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCAoKSA9PiByZW1vdmVIb3ZlcigpKTtcclxuICAgICAgc3ViQXJyYXkucHVzaChjZWxsKTtcclxuICAgIH1cclxuICAgIGRpdkFycmF5UGxhY2VtZW50LnB1c2goc3ViQXJyYXkpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IHBsYWNlU2hpcHMgPSAocm93LCBjb2wpID0+IHtcclxuICBjb25zdCBzaGlwTGVuZ3RocyA9IFs1LCA0LCAzLCAzLCAyXTtcclxuXHJcbiAgaWYgKFxyXG4gICAgcGxheWVyLmJvYXJkLnBsYWNlU2hpcChzaGlwTGVuZ3Roc1tzaGlwQ291bnRlcl0sIHJvdywgY29sLCBpc0hvcml6b250YWwpICE9PVxyXG4gICAgbnVsbFxyXG4gICkge1xyXG4gICAgcGxheWVyLmJvYXJkLnBsYWNlU2hpcChzaGlwTGVuZ3Roc1tzaGlwQ291bnRlcl0sIHJvdywgY29sLCBpc0hvcml6b250YWwpO1xyXG4gICAgaWYgKGlzSG9yaXpvbnRhbCkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGhzW3NoaXBDb3VudGVyXTsgaSsrKSB7XHJcbiAgICAgICAgZGl2QXJyYXlQbGFjZW1lbnRbcm93XVtjb2wgKyBpXS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImxpZ2h0Z3JlZW5cIjtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICghaXNIb3Jpem9udGFsKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aHNbc2hpcENvdW50ZXJdOyBpKyspIHtcclxuICAgICAgICBkaXZBcnJheVBsYWNlbWVudFtyb3cgKyBpXVtjb2xdLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRncmVlblwiO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBkaXNwbGF5UGxheWVyKCk7XHJcbiAgICBzaGlwQ291bnRlcisrO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGhhbmRsZUhvdmVyID0gKGNlbGwsIHJvdywgY29sKSA9PiB7XHJcbiAgY29uc3Qgc2hpcExlbmd0aHMgPSBbNSwgNCwgMywgMywgMl07XHJcblxyXG4gIGlmIChpc0hvcml6b250YWwpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aHNbc2hpcENvdW50ZXJdOyBpKyspIHtcclxuICAgICAgZGl2QXJyYXlQbGFjZW1lbnRbcm93XVtjb2wgKyBpXS5jbGFzc0xpc3QuYWRkKFwiaG92ZXJlZFwiKTtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKCFpc0hvcml6b250YWwpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aHNbc2hpcENvdW50ZXJdOyBpKyspIHtcclxuICAgICAgZGl2QXJyYXlQbGFjZW1lbnRbcm93ICsgaV1bY29sXS5jbGFzc0xpc3QuYWRkKFwiaG92ZXJlZFwiKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5jb25zdCByZW1vdmVIb3ZlciA9ICgpID0+IHtcclxuICBjb25zdCBob3ZlcmVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ob3ZlcmVkXCIpO1xyXG4gIGhvdmVyZWQuZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJlZFwiKSk7XHJcbn07XHJcblxyXG5kb2N1bWVudFxyXG4gIC5xdWVyeVNlbGVjdG9yKFwiLmRpcmVjdGlvblwiKVxyXG4gIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gaGFuZGxlRGlyZWN0aW9uVG9nZ2xlKCkpO1xyXG5cclxuY29uc3QgaGFuZGxlRGlyZWN0aW9uVG9nZ2xlID0gKCkgPT4ge1xyXG4gIGlmIChpc0hvcml6b250YWwpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGlyZWN0aW9uXCIpLnRleHRDb250ZW50ID0gXCJWZXJ0aWNhbFwiO1xyXG4gICAgaXNIb3Jpem9udGFsID0gZmFsc2U7XHJcbiAgfSBlbHNlIGlmICghaXNIb3Jpem9udGFsKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRpcmVjdGlvblwiKS50ZXh0Q29udGVudCA9IFwiSG9yaXpvbnRhbFwiO1xyXG4gICAgaXNIb3Jpem9udGFsID0gdHJ1ZTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBkaXNwbGF5UGxheWVyID0gKCkgPT4ge1xyXG4gIGNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXJCb2FyZFwiKTtcclxuICBwbGF5ZXJCb2FyZC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gIGRpdkFycmF5ID0gW107XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xyXG4gICAgY29uc3Qgc3ViQXJyYXkgPSBbXTtcclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xyXG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHJcbiAgICAgIGlmIChwbGF5ZXIuYm9hcmQuYm9hcmRbaV1bal0gaW5zdGFuY2VvZiBTaGlwKSB7XHJcbiAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImxpZ2h0Z3JlZW5cIjtcclxuICAgICAgICBjZWxsLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIGdyZWVuXCI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHBsYXllckJvYXJkLmFwcGVuZENoaWxkKGNlbGwpO1xyXG4gICAgICBzdWJBcnJheS5wdXNoKGNlbGwpO1xyXG4gICAgfVxyXG4gICAgZGl2QXJyYXkucHVzaChzdWJBcnJheSk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgZGlzcGxheUNvbXB1dGVyID0gKCkgPT4ge1xyXG4gIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXB1dGVyQm9hcmRcIik7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XHJcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICBjb21wdXRlckJvYXJkLmFwcGVuZENoaWxkKGNlbGwpO1xyXG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBoYW5kbGVBdHRhY2soaSwgaiwgY2VsbCkpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGhhbmRsZUF0dGFjayA9IChyb3csIGNvbCwgY2VsbCkgPT4ge1xyXG4gIGNvbXB1dGVyLmJvYXJkLnJlY2lldmVBdHRhY2socm93LCBjb2wpO1xyXG5cclxuICBpZiAoY29tcHV0ZXIuYm9hcmQuYm9hcmRbcm93XVtjb2xdID09IG51bGwpIHtcclxuICAgIGNlbGwudGV4dENvbnRlbnQgPSBcIlhcIjtcclxuICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjNTQ1NDU0XCI7XHJcbiAgfSBlbHNlIGlmIChjb21wdXRlci5ib2FyZC5ib2FyZFtyb3ddW2NvbF0gaW5zdGFuY2VvZiBTaGlwKSB7XHJcbiAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmVkXCI7XHJcbiAgICBjZWxsLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkICNGRjdGN0ZcIjtcclxuICB9XHJcblxyXG4gIGNvbnN0IHZhbGlkQXR0YWNrID0gY29tcHV0ZXIuYXR0YWNrKCk7XHJcbiAgcGxheWVyLmJvYXJkLnJlY2lldmVBdHRhY2sodmFsaWRBdHRhY2tbMF0sIHZhbGlkQXR0YWNrWzFdKTtcclxuXHJcbiAgaWYgKHBsYXllci5ib2FyZC5ib2FyZFt2YWxpZEF0dGFja1swXV1bdmFsaWRBdHRhY2tbMV1dID09IG51bGwpIHtcclxuICAgIGRpdkFycmF5W3ZhbGlkQXR0YWNrWzBdXVt2YWxpZEF0dGFja1sxXV0udGV4dENvbnRlbnQgPSBcIlhcIjtcclxuICB9IGVsc2UgaWYgKFxyXG4gICAgcGxheWVyLmJvYXJkLmJvYXJkW3ZhbGlkQXR0YWNrWzBdXVt2YWxpZEF0dGFja1sxXV0gaW5zdGFuY2VvZiBTaGlwXHJcbiAgKSB7XHJcbiAgICBkaXZBcnJheVt2YWxpZEF0dGFja1swXV1bdmFsaWRBdHRhY2tbMV1dLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmVkXCI7XHJcbiAgICBkaXZBcnJheVt2YWxpZEF0dGFja1swXV1bdmFsaWRBdHRhY2tbMV1dLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkICNGRjdGN0ZcIjtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBkZXRlcm1pbmVBbGxTdW5rID0gKCkgPT4ge1xyXG4gIGlmIChjb21wdXRlci5ib2FyZC5jaGVja0FsbFN1bmspIHtcclxuICAgIC8vIHVwZGF0ZSBwb3B1cCAvIHRleHQgdG8gc2F5IHBsYXllciB3b25cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0gZWxzZSBpZiAocGxheWVyLmJvYXJkLmNoZWNrQWxsU3Vuaykge1xyXG4gICAgLy8gdXBkYXRlIHBvcHVwIC8gdGV4dCB0byBzYXkgY29tcHV0ZXIgd29uXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufTtcclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhcnRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYWNlLXNoaXBzXCIpLmNsYXNzTGlzdC5hZGQoXCJnb25lXCIpO1xyXG59KTtcclxuXHJcbmdlbmVyYXRlUGxhY2VTaGlwR3JpZCgpO1xyXG5jb21wdXRlci5wb3B1bGF0ZUJvYXJkKCk7XHJcbmRpc3BsYXlDb21wdXRlcigpO1xyXG5kaXNwbGF5UGxheWVyKCk7XHJcblxyXG5leHBvcnQgeyBkaXNwbGF5UGxheWVyIH07XHJcbiIsImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcclxuXHJcbmNsYXNzIEdhbWVib2FyZCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmJvYXJkID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKCkgPT4gQXJyYXkoMTApLmZpbGwobnVsbCkpO1xyXG4gICAgdGhpcy5hbGxTdW5rID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwbGFjZVNoaXAoc2hpcExlbmd0aCwgcm93LCBjb2wsIGlzSG9yaXpvbnRhbCA9IHRydWUpIHtcclxuICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChzaGlwTGVuZ3RoKTtcclxuXHJcbiAgICBpZiAodGhpcy5pc1BsYWNlbWVudFZhbGlkKHNoaXAsIHJvdywgY29sLCBpc0hvcml6b250YWwpKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGlzSG9yaXpvbnRhbCkge1xyXG4gICAgICAgICAgdGhpcy5ib2FyZFtyb3ddW2NvbCArIGldID0gc2hpcDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5ib2FyZFtyb3cgKyBpXVtjb2xdID0gc2hpcDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNQbGFjZW1lbnRWYWxpZChzaGlwLCByb3csIGNvbCwgaXNIb3Jpem9udGFsKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGlzSG9yaXpvbnRhbCkge1xyXG4gICAgICAgIGlmIChjb2wgKyBpID49IDEwIHx8IHRoaXMuYm9hcmRbcm93XVtjb2wgKyBpXSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICghaXNIb3Jpem9udGFsKSB7XHJcbiAgICAgICAgaWYgKHJvdyArIGkgPj0gMTAgfHwgdGhpcy5ib2FyZFtyb3cgKyBpXVtjb2xdICE9PSBudWxsKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHJlY2lldmVBdHRhY2socm93LCBjb2wpIHtcclxuICAgIGxldCBjZWxsID0gdGhpcy5ib2FyZFtyb3ddW2NvbF07XHJcbiAgICBpZiAoY2VsbCA9PSBudWxsKSB7XHJcbiAgICAgIGNlbGwgPSBcIm1pc3NcIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNlbGwuaGl0KCk7XHJcbiAgICAgIGlmIChjZWxsLmlzU3VuaygpKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzaGlwIHN1bmshXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjaGVja0FsbFN1bmsoKSB7XHJcbiAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCB0aGlzLmJvYXJkLmxlbmd0aDsgcm93KyspIHtcclxuICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgdGhpcy5ib2FyZFtyb3ddLmxlbmd0aDsgY29sKyspIHtcclxuICAgICAgICBjb25zdCBjZWxsID0gdGhpcy5ib2FyZFtyb3ddW2NvbF07XHJcbiAgICAgICAgaWYgKGNlbGwgaW5zdGFuY2VvZiBTaGlwKSB7XHJcbiAgICAgICAgICBpZiAoIWNlbGwuaXNTdW5rKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lYm9hcmQ7XHJcbiIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XHJcblxyXG5jbGFzcyBQbGF5ZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5ib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcclxuICAgIHRoaXMud29uR2FtZSA9IGZhbHNlO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgQ29tcHV0ZXIge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5ib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcclxuICAgIHRoaXMudHJhY2tTaG90cyA9IG5ldyBHYW1lYm9hcmQoKTtcclxuICAgIHRoaXMud29uR2FtZSA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcG9wdWxhdGVCb2FyZCgpIHtcclxuICAgIGNvbnN0IHNoaXBMZW5ndGhzID0gWzUsIDQsIDMsIDMsIDJdO1xyXG5cclxuICAgIHNoaXBMZW5ndGhzLmZvckVhY2goKGxlbmd0aCkgPT4ge1xyXG4gICAgICBsZXQgcGxhY2VkID0gZmFsc2U7XHJcbiAgICAgIHdoaWxlICghcGxhY2VkKSB7XHJcbiAgICAgICAgbGV0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgICBsZXQgY29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICAgIGxldCBpc0hvcml6b250YWwgPSBNYXRoLnJhbmRvbSgpIDwgMC41O1xyXG5cclxuICAgICAgICBpZiAodGhpcy5ib2FyZC5wbGFjZVNoaXAobGVuZ3RoLCByb3csIGNvbCwgaXNIb3Jpem9udGFsKSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgdGhpcy5ib2FyZC5wbGFjZVNoaXAobGVuZ3RoLCByb3csIGNvbCwgaXNIb3Jpem9udGFsKTtcclxuICAgICAgICAgIHBsYWNlZCA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGF0dGFjaygpIHtcclxuICAgIGxldCBoaXQgPSBmYWxzZTtcclxuXHJcbiAgICB3aGlsZSAoIWhpdCkge1xyXG4gICAgICBsZXQgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICBsZXQgY29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICBsZXQgY2VsbCA9IHRoaXMudHJhY2tTaG90cy5ib2FyZFtyb3ddW2NvbF07XHJcblxyXG4gICAgICBpZiAoY2VsbCA9PSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy50cmFja1Nob3RzLmJvYXJkW3Jvd11bY29sXSA9IFwiWFwiO1xyXG4gICAgICAgIGhpdCA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIFtyb3csIGNvbF07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFBsYXllciwgQ29tcHV0ZXIgfTtcclxuIiwiY2xhc3MgU2hpcCB7XHJcbiAgY29uc3RydWN0b3IobGVuZ3RoKSB7XHJcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcclxuICAgIHRoaXMuaGl0cyA9IDA7XHJcbiAgICB0aGlzLnN1bmsgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIGhpdCgpIHtcclxuICAgIHRoaXMuaGl0cysrO1xyXG4gIH1cclxuXHJcbiAgaXNTdW5rKCkge1xyXG4gICAgaWYgKHRoaXMuaGl0cyA9PSB0aGlzLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gKHRoaXMuc3VuayA9IHRydWUpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgU2hpcDtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xyXG5pbXBvcnQgeyBQbGF5ZXIsIENvbXB1dGVyIH0gZnJvbSBcIi4vcGxheWVyc1wiO1xyXG5pbXBvcnQgeyBkaXNwbGF5UGxheWVyIH0gZnJvbSBcIi4vRE9NXCI7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==