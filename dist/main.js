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

  cell.classList.add("hovered");

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
      cell.style.backgroundColor = "#525252";

      if (player.board.board[i][j] instanceof _ship__WEBPACK_IMPORTED_MODULE_1__["default"]) {
        cell.style.backgroundColor = "lightgreen";
        cell.style.border = "none";
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
      cell.style.backgroundColor = "#525252";
      computerBoard.appendChild(cell);
      cell.addEventListener("click", () => handleAttack(i, j, cell));
    }
  }
};

const handleAttack = (row, col, cell) => {
  computer.board.recieveAttack(row, col);

  if (computer.board.board[row][col] == null) {
    cell.textContent = "X";
  } else if (computer.board.board[row][col] instanceof _ship__WEBPACK_IMPORTED_MODULE_1__["default"]) {
    cell.style.backgroundColor = "red";
    cell.style.border = "none";
  }

  const validAttack = computer.attack();
  player.board.recieveAttack(validAttack[0], validAttack[1]);

  if (player.board.board[validAttack[0]][validAttack[1]] == null) {
    divArray[validAttack[0]][validAttack[1]].textContent = "X";
  } else if (
    player.board.board[validAttack[0]][validAttack[1]] instanceof _ship__WEBPACK_IMPORTED_MODULE_1__["default"]
  ) {
    divArray[validAttack[0]][validAttack[1]].style.backgroundColor = "red";
    divArray[validAttack[0]][validAttack[1]].style.border = "none";
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
// player.board.placeShip(5, 0, 0, false);
// player.board.placeShip(4, 0, 1, false);
// player.board.placeShip(3, 0, 2, false);
// player.board.placeShip(3, 0, 3, false);
// player.board.placeShip(2, 0, 4, false);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQTZDO0FBQ25CO0FBQzFCO0FBQ0EsbUJBQW1CLDRDQUFNO0FBQ3pCLHFCQUFxQiw4Q0FBUTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsUUFBUTtBQUMxQjtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiw4QkFBOEI7QUFDcEQ7QUFDQTtBQUNBLE1BQU07QUFDTixzQkFBc0IsOEJBQThCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsOEJBQThCO0FBQ2xEO0FBQ0E7QUFDQSxJQUFJO0FBQ0osb0JBQW9CLDhCQUE4QjtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsUUFBUTtBQUMxQjtBQUNBLG9CQUFvQixRQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBLDhDQUE4Qyw2Q0FBSTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFFBQVE7QUFDMUIsb0JBQW9CLFFBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLG1EQUFtRCw2Q0FBSTtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osa0VBQWtFLDZDQUFJO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDeUI7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzS0M7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLFlBQVk7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsNkNBQUk7QUFDekI7QUFDQTtBQUNBLHNCQUFzQixnQkFBZ0I7QUFDdEM7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixpQkFBaUI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IseUJBQXlCO0FBQy9DLHdCQUF3Qiw4QkFBOEI7QUFDdEQ7QUFDQSw0QkFBNEIsNkNBQUk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxTQUFTLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEVXO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixrREFBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsa0RBQVM7QUFDOUIsMEJBQTBCLGtEQUFTO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUM0Qjs7Ozs7Ozs7Ozs7Ozs7O0FDbkQ1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxJQUFJLEVBQUM7Ozs7Ozs7VUNsQnBCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05vQztBQUNTO0FBQ1AiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBsYXllciwgQ29tcHV0ZXIgfSBmcm9tIFwiLi9wbGF5ZXJzXCI7XHJcbmltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcclxuXHJcbmNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIoKTtcclxuY29uc3QgY29tcHV0ZXIgPSBuZXcgQ29tcHV0ZXIoKTtcclxubGV0IGRpdkFycmF5ID0gW107XHJcbmxldCBkaXZBcnJheVBsYWNlbWVudCA9IFtdO1xyXG5sZXQgc2hpcENvdW50ZXIgPSAwO1xyXG5sZXQgaXNIb3Jpem9udGFsID0gdHJ1ZTtcclxuXHJcbmNvbnN0IGdlbmVyYXRlUGxhY2VTaGlwR3JpZCA9ICgpID0+IHtcclxuICBjb25zdCBwbGFjZUJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGFjZS1ib2FyZFwiKTtcclxuICBkaXZBcnJheVBsYWNlbWVudCA9IFtdO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcclxuICAgIGNvbnN0IHN1YkFycmF5ID0gW107XHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcclxuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgIHBsYWNlQm9hcmQuYXBwZW5kQ2hpbGQoY2VsbCk7XHJcblxyXG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBwbGFjZVNoaXBzKGksIGopKTtcclxuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsICgpID0+IGhhbmRsZUhvdmVyKGNlbGwsIGksIGopKTtcclxuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgKCkgPT4gcmVtb3ZlSG92ZXIoKSk7XHJcbiAgICAgIHN1YkFycmF5LnB1c2goY2VsbCk7XHJcbiAgICB9XHJcbiAgICBkaXZBcnJheVBsYWNlbWVudC5wdXNoKHN1YkFycmF5KTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBwbGFjZVNoaXBzID0gKHJvdywgY29sKSA9PiB7XHJcbiAgY29uc3Qgc2hpcExlbmd0aHMgPSBbNSwgNCwgMywgMywgMl07XHJcblxyXG4gIGlmIChcclxuICAgIHBsYXllci5ib2FyZC5wbGFjZVNoaXAoc2hpcExlbmd0aHNbc2hpcENvdW50ZXJdLCByb3csIGNvbCwgaXNIb3Jpem9udGFsKSAhPT1cclxuICAgIG51bGxcclxuICApIHtcclxuICAgIHBsYXllci5ib2FyZC5wbGFjZVNoaXAoc2hpcExlbmd0aHNbc2hpcENvdW50ZXJdLCByb3csIGNvbCwgaXNIb3Jpem9udGFsKTtcclxuICAgIGlmIChpc0hvcml6b250YWwpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3Roc1tzaGlwQ291bnRlcl07IGkrKykge1xyXG4gICAgICAgIGRpdkFycmF5UGxhY2VtZW50W3Jvd11bY29sICsgaV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJsaWdodGdyZWVuXCI7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoIWlzSG9yaXpvbnRhbCkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGhzW3NoaXBDb3VudGVyXTsgaSsrKSB7XHJcbiAgICAgICAgZGl2QXJyYXlQbGFjZW1lbnRbcm93ICsgaV1bY29sXS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImxpZ2h0Z3JlZW5cIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZGlzcGxheVBsYXllcigpO1xyXG4gICAgc2hpcENvdW50ZXIrKztcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBoYW5kbGVIb3ZlciA9IChjZWxsLCByb3csIGNvbCkgPT4ge1xyXG4gIGNvbnN0IHNoaXBMZW5ndGhzID0gWzUsIDQsIDMsIDMsIDJdO1xyXG5cclxuICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJob3ZlcmVkXCIpO1xyXG5cclxuICBpZiAoaXNIb3Jpem9udGFsKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGhzW3NoaXBDb3VudGVyXTsgaSsrKSB7XHJcbiAgICAgIGRpdkFycmF5UGxhY2VtZW50W3Jvd11bY29sICsgaV0uY2xhc3NMaXN0LmFkZChcImhvdmVyZWRcIik7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmICghaXNIb3Jpem9udGFsKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGhzW3NoaXBDb3VudGVyXTsgaSsrKSB7XHJcbiAgICAgIGRpdkFycmF5UGxhY2VtZW50W3JvdyArIGldW2NvbF0uY2xhc3NMaXN0LmFkZChcImhvdmVyZWRcIik7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgcmVtb3ZlSG92ZXIgPSAoKSA9PiB7XHJcbiAgY29uc3QgaG92ZXJlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaG92ZXJlZFwiKTtcclxuICBob3ZlcmVkLmZvckVhY2goKGl0ZW0pID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyZWRcIikpO1xyXG59O1xyXG5cclxuZG9jdW1lbnRcclxuICAucXVlcnlTZWxlY3RvcihcIi5kaXJlY3Rpb25cIilcclxuICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGhhbmRsZURpcmVjdGlvblRvZ2dsZSgpKTtcclxuXHJcbmNvbnN0IGhhbmRsZURpcmVjdGlvblRvZ2dsZSA9ICgpID0+IHtcclxuICBpZiAoaXNIb3Jpem9udGFsKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRpcmVjdGlvblwiKS50ZXh0Q29udGVudCA9IFwiVmVydGljYWxcIjtcclxuICAgIGlzSG9yaXpvbnRhbCA9IGZhbHNlO1xyXG4gIH0gZWxzZSBpZiAoIWlzSG9yaXpvbnRhbCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kaXJlY3Rpb25cIikudGV4dENvbnRlbnQgPSBcIkhvcml6b250YWxcIjtcclxuICAgIGlzSG9yaXpvbnRhbCA9IHRydWU7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgZGlzcGxheVBsYXllciA9ICgpID0+IHtcclxuICBjb25zdCBwbGF5ZXJCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyQm9hcmRcIik7XHJcbiAgcGxheWVyQm9hcmQuaW5uZXJIVE1MID0gXCJcIjtcclxuICBkaXZBcnJheSA9IFtdO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcclxuICAgIGNvbnN0IHN1YkFycmF5ID0gW107XHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcclxuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjNTI1MjUyXCI7XHJcblxyXG4gICAgICBpZiAocGxheWVyLmJvYXJkLmJvYXJkW2ldW2pdIGluc3RhbmNlb2YgU2hpcCkge1xyXG4gICAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJsaWdodGdyZWVuXCI7XHJcbiAgICAgICAgY2VsbC5zdHlsZS5ib3JkZXIgPSBcIm5vbmVcIjtcclxuICAgICAgfVxyXG5cclxuICAgICAgcGxheWVyQm9hcmQuYXBwZW5kQ2hpbGQoY2VsbCk7XHJcbiAgICAgIHN1YkFycmF5LnB1c2goY2VsbCk7XHJcbiAgICB9XHJcbiAgICBkaXZBcnJheS5wdXNoKHN1YkFycmF5KTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBkaXNwbGF5Q29tcHV0ZXIgPSAoKSA9PiB7XHJcbiAgY29uc3QgY29tcHV0ZXJCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29tcHV0ZXJCb2FyZFwiKTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcclxuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjNTI1MjUyXCI7XHJcbiAgICAgIGNvbXB1dGVyQm9hcmQuYXBwZW5kQ2hpbGQoY2VsbCk7XHJcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGhhbmRsZUF0dGFjayhpLCBqLCBjZWxsKSk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgaGFuZGxlQXR0YWNrID0gKHJvdywgY29sLCBjZWxsKSA9PiB7XHJcbiAgY29tcHV0ZXIuYm9hcmQucmVjaWV2ZUF0dGFjayhyb3csIGNvbCk7XHJcblxyXG4gIGlmIChjb21wdXRlci5ib2FyZC5ib2FyZFtyb3ddW2NvbF0gPT0gbnVsbCkge1xyXG4gICAgY2VsbC50ZXh0Q29udGVudCA9IFwiWFwiO1xyXG4gIH0gZWxzZSBpZiAoY29tcHV0ZXIuYm9hcmQuYm9hcmRbcm93XVtjb2xdIGluc3RhbmNlb2YgU2hpcCkge1xyXG4gICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJlZFwiO1xyXG4gICAgY2VsbC5zdHlsZS5ib3JkZXIgPSBcIm5vbmVcIjtcclxuICB9XHJcblxyXG4gIGNvbnN0IHZhbGlkQXR0YWNrID0gY29tcHV0ZXIuYXR0YWNrKCk7XHJcbiAgcGxheWVyLmJvYXJkLnJlY2lldmVBdHRhY2sodmFsaWRBdHRhY2tbMF0sIHZhbGlkQXR0YWNrWzFdKTtcclxuXHJcbiAgaWYgKHBsYXllci5ib2FyZC5ib2FyZFt2YWxpZEF0dGFja1swXV1bdmFsaWRBdHRhY2tbMV1dID09IG51bGwpIHtcclxuICAgIGRpdkFycmF5W3ZhbGlkQXR0YWNrWzBdXVt2YWxpZEF0dGFja1sxXV0udGV4dENvbnRlbnQgPSBcIlhcIjtcclxuICB9IGVsc2UgaWYgKFxyXG4gICAgcGxheWVyLmJvYXJkLmJvYXJkW3ZhbGlkQXR0YWNrWzBdXVt2YWxpZEF0dGFja1sxXV0gaW5zdGFuY2VvZiBTaGlwXHJcbiAgKSB7XHJcbiAgICBkaXZBcnJheVt2YWxpZEF0dGFja1swXV1bdmFsaWRBdHRhY2tbMV1dLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmVkXCI7XHJcbiAgICBkaXZBcnJheVt2YWxpZEF0dGFja1swXV1bdmFsaWRBdHRhY2tbMV1dLnN0eWxlLmJvcmRlciA9IFwibm9uZVwiO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGRldGVybWluZUFsbFN1bmsgPSAoKSA9PiB7XHJcbiAgaWYgKGNvbXB1dGVyLmJvYXJkLmNoZWNrQWxsU3Vuaykge1xyXG4gICAgLy8gdXBkYXRlIHBvcHVwIC8gdGV4dCB0byBzYXkgcGxheWVyIHdvblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIGlmIChwbGF5ZXIuYm9hcmQuY2hlY2tBbGxTdW5rKSB7XHJcbiAgICAvLyB1cGRhdGUgcG9wdXAgLyB0ZXh0IHRvIHNheSBjb21wdXRlciB3b25cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59O1xyXG5cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGFydFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxhY2Utc2hpcHNcIikuY2xhc3NMaXN0LmFkZChcImdvbmVcIik7XHJcbn0pO1xyXG5cclxuZ2VuZXJhdGVQbGFjZVNoaXBHcmlkKCk7XHJcbmNvbXB1dGVyLnBvcHVsYXRlQm9hcmQoKTtcclxuZGlzcGxheUNvbXB1dGVyKCk7XHJcbi8vIHBsYXllci5ib2FyZC5wbGFjZVNoaXAoNSwgMCwgMCwgZmFsc2UpO1xyXG4vLyBwbGF5ZXIuYm9hcmQucGxhY2VTaGlwKDQsIDAsIDEsIGZhbHNlKTtcclxuLy8gcGxheWVyLmJvYXJkLnBsYWNlU2hpcCgzLCAwLCAyLCBmYWxzZSk7XHJcbi8vIHBsYXllci5ib2FyZC5wbGFjZVNoaXAoMywgMCwgMywgZmFsc2UpO1xyXG4vLyBwbGF5ZXIuYm9hcmQucGxhY2VTaGlwKDIsIDAsIDQsIGZhbHNlKTtcclxuZGlzcGxheVBsYXllcigpO1xyXG5cclxuZXhwb3J0IHsgZGlzcGxheVBsYXllciB9O1xyXG4iLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XHJcblxyXG5jbGFzcyBHYW1lYm9hcmQge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5ib2FyZCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sICgpID0+IEFycmF5KDEwKS5maWxsKG51bGwpKTtcclxuICAgIHRoaXMuYWxsU3VuayA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcGxhY2VTaGlwKHNoaXBMZW5ndGgsIHJvdywgY29sLCBpc0hvcml6b250YWwgPSB0cnVlKSB7XHJcbiAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAoc2hpcExlbmd0aCk7XHJcblxyXG4gICAgaWYgKHRoaXMuaXNQbGFjZW1lbnRWYWxpZChzaGlwLCByb3csIGNvbCwgaXNIb3Jpem9udGFsKSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChpc0hvcml6b250YWwpIHtcclxuICAgICAgICAgIHRoaXMuYm9hcmRbcm93XVtjb2wgKyBpXSA9IHNoaXA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuYm9hcmRbcm93ICsgaV1bY29sXSA9IHNoaXA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzUGxhY2VtZW50VmFsaWQoc2hpcCwgcm93LCBjb2wsIGlzSG9yaXpvbnRhbCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChpc0hvcml6b250YWwpIHtcclxuICAgICAgICBpZiAoY29sICsgaSA+PSAxMCB8fCB0aGlzLmJvYXJkW3Jvd11bY29sICsgaV0gIT09IG51bGwpIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAoIWlzSG9yaXpvbnRhbCkge1xyXG4gICAgICAgIGlmIChyb3cgKyBpID49IDEwIHx8IHRoaXMuYm9hcmRbcm93ICsgaV1bY29sXSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICByZWNpZXZlQXR0YWNrKHJvdywgY29sKSB7XHJcbiAgICBsZXQgY2VsbCA9IHRoaXMuYm9hcmRbcm93XVtjb2xdO1xyXG4gICAgaWYgKGNlbGwgPT0gbnVsbCkge1xyXG4gICAgICBjZWxsID0gXCJtaXNzXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjZWxsLmhpdCgpO1xyXG4gICAgICBpZiAoY2VsbC5pc1N1bmsoKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2hpcCBzdW5rIVwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hlY2tBbGxTdW5rKCkge1xyXG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgdGhpcy5ib2FyZC5sZW5ndGg7IHJvdysrKSB7XHJcbiAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IHRoaXMuYm9hcmRbcm93XS5sZW5ndGg7IGNvbCsrKSB7XHJcbiAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuYm9hcmRbcm93XVtjb2xdO1xyXG4gICAgICAgIGlmIChjZWxsIGluc3RhbmNlb2YgU2hpcCkge1xyXG4gICAgICAgICAgaWYgKCFjZWxsLmlzU3VuaygpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xyXG4iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xyXG5cclxuY2xhc3MgUGxheWVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XHJcbiAgICB0aGlzLndvbkdhbWUgPSBmYWxzZTtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIENvbXB1dGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XHJcbiAgICB0aGlzLnRyYWNrU2hvdHMgPSBuZXcgR2FtZWJvYXJkKCk7XHJcbiAgICB0aGlzLndvbkdhbWUgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHBvcHVsYXRlQm9hcmQoKSB7XHJcbiAgICBjb25zdCBzaGlwTGVuZ3RocyA9IFs1LCA0LCAzLCAzLCAyXTtcclxuXHJcbiAgICBzaGlwTGVuZ3Rocy5mb3JFYWNoKChsZW5ndGgpID0+IHtcclxuICAgICAgbGV0IHBsYWNlZCA9IGZhbHNlO1xyXG4gICAgICB3aGlsZSAoIXBsYWNlZCkge1xyXG4gICAgICAgIGxldCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgICAgbGV0IGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgICBsZXQgaXNIb3Jpem9udGFsID0gTWF0aC5yYW5kb20oKSA8IDAuNTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYm9hcmQucGxhY2VTaGlwKGxlbmd0aCwgcm93LCBjb2wsIGlzSG9yaXpvbnRhbCkgIT09IG51bGwpIHtcclxuICAgICAgICAgIHRoaXMuYm9hcmQucGxhY2VTaGlwKGxlbmd0aCwgcm93LCBjb2wsIGlzSG9yaXpvbnRhbCk7XHJcbiAgICAgICAgICBwbGFjZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhdHRhY2soKSB7XHJcbiAgICBsZXQgaGl0ID0gZmFsc2U7XHJcblxyXG4gICAgd2hpbGUgKCFoaXQpIHtcclxuICAgICAgbGV0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgbGV0IGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgbGV0IGNlbGwgPSB0aGlzLnRyYWNrU2hvdHMuYm9hcmRbcm93XVtjb2xdO1xyXG5cclxuICAgICAgaWYgKGNlbGwgPT0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMudHJhY2tTaG90cy5ib2FyZFtyb3ddW2NvbF0gPSBcIlhcIjtcclxuICAgICAgICBoaXQgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBbcm93LCBjb2xdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBQbGF5ZXIsIENvbXB1dGVyIH07XHJcbiIsImNsYXNzIFNoaXAge1xyXG4gIGNvbnN0cnVjdG9yKGxlbmd0aCkge1xyXG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICB0aGlzLmhpdHMgPSAwO1xyXG4gICAgdGhpcy5zdW5rID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBoaXQoKSB7XHJcbiAgICB0aGlzLmhpdHMrKztcclxuICB9XHJcblxyXG4gIGlzU3VuaygpIHtcclxuICAgIGlmICh0aGlzLmhpdHMgPT0gdGhpcy5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuICh0aGlzLnN1bmsgPSB0cnVlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNoaXA7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcclxuaW1wb3J0IHsgUGxheWVyLCBDb21wdXRlciB9IGZyb20gXCIuL3BsYXllcnNcIjtcclxuaW1wb3J0IHsgZGlzcGxheVBsYXllciB9IGZyb20gXCIuL0RPTVwiO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=