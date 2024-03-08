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



let player = new _players__WEBPACK_IMPORTED_MODULE_0__.Player();
let computer = new _players__WEBPACK_IMPORTED_MODULE_0__.Computer();
let divArray = [];
let compDivArray = [];
let divArrayPlacement = [];
let shipCounter = 0;
let isHorizontal = true;

const generatePlaceShipGrid = () => {
  const placeBoard = document.querySelector(".place-board");
  placeBoard.innerHTML = "";
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
  computerBoard.innerHTML = "";

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
    document
      .querySelector(".computerBoard")
      .removeEventListener("click", clickHandler);
    document.querySelector(".restart").classList.remove("gone");
    return;
  }

  const validAttack = computer.attack();
  const playerCell = player.board.board[validAttack[0]][validAttack[1]];
  player.board.recieveAttack(validAttack[0], validAttack[1]);

  document
    .querySelector(".computerBoard")
    .removeEventListener("click", clickHandler);

  setTimeout(() => {
    document.querySelector(".text").textContent = "Computer is Aiming!!";
  }, 1500);

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
    if (determineAllSunk()) {
      displayWinner(false);
      document.querySelector(".restart").classList.remove("gone");
    } else {
      setTimeout(() => {
        document.querySelector(".text").textContent =
          "Click a cell on the enemy board to attack!";

        document
          .querySelector(".computerBoard")
          .addEventListener("click", clickHandler);
      }, 1800);
    }
  }, 3500);
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

document.querySelector(".restart").addEventListener("click", () => {
  restartGame();
  document.querySelector(".restart").classList.add("gone");
});

const restartGame = () => {
  player = new _players__WEBPACK_IMPORTED_MODULE_0__.Player();
  computer = new _players__WEBPACK_IMPORTED_MODULE_0__.Computer();

  generatePlaceShipGrid();
  computer.populateBoard();

  compDivArray = [];
  displayComputer();

  displayPlayer();

  document.querySelector(".place-ships").classList.remove("gone");
  shipCounter = 0;

  document.querySelector(".text").textContent =
    "Click a cell on the enemy board to attack!";
};

document.querySelector(".start").addEventListener("click", () => {
  if (shipCounter > 4) {
    document.querySelector(".place-ships").classList.add("gone");
    document
      .querySelector(".computerBoard")
      .addEventListener("click", clickHandler);
  }
  return;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQzRCOzs7Ozs7Ozs7Ozs7Ozs7QUNwRDVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFlLElBQUksRUFBQzs7Ozs7OztVQ2xCcEI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTm9DO0FBQ1M7QUFDUCIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvRE9NLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVycy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGxheWVyLCBDb21wdXRlciB9IGZyb20gXCIuL3BsYXllcnNcIjtcclxuaW1wb3J0IFNoaXAgZnJvbSBcIi4vc2hpcFwiO1xyXG5cclxubGV0IHBsYXllciA9IG5ldyBQbGF5ZXIoKTtcclxubGV0IGNvbXB1dGVyID0gbmV3IENvbXB1dGVyKCk7XHJcbmxldCBkaXZBcnJheSA9IFtdO1xyXG5sZXQgY29tcERpdkFycmF5ID0gW107XHJcbmxldCBkaXZBcnJheVBsYWNlbWVudCA9IFtdO1xyXG5sZXQgc2hpcENvdW50ZXIgPSAwO1xyXG5sZXQgaXNIb3Jpem9udGFsID0gdHJ1ZTtcclxuXHJcbmNvbnN0IGdlbmVyYXRlUGxhY2VTaGlwR3JpZCA9ICgpID0+IHtcclxuICBjb25zdCBwbGFjZUJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGFjZS1ib2FyZFwiKTtcclxuICBwbGFjZUJvYXJkLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgZGl2QXJyYXlQbGFjZW1lbnQgPSBbXTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICBjb25zdCBzdWJBcnJheSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XHJcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgICAgcGxhY2VCb2FyZC5hcHBlbmRDaGlsZChjZWxsKTtcclxuXHJcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHBsYWNlU2hpcHMoaSwgaikpO1xyXG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgKCkgPT4gaGFuZGxlSG92ZXIoY2VsbCwgaSwgaikpO1xyXG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCAoKSA9PiByZW1vdmVIb3ZlcigpKTtcclxuICAgICAgc3ViQXJyYXkucHVzaChjZWxsKTtcclxuICAgIH1cclxuICAgIGRpdkFycmF5UGxhY2VtZW50LnB1c2goc3ViQXJyYXkpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IHBsYWNlU2hpcHMgPSAocm93LCBjb2wpID0+IHtcclxuICBjb25zdCBzaGlwTGVuZ3RocyA9IFs1LCA0LCAzLCAzLCAyXTtcclxuXHJcbiAgaWYgKFxyXG4gICAgcGxheWVyLmJvYXJkLnBsYWNlU2hpcChzaGlwTGVuZ3Roc1tzaGlwQ291bnRlcl0sIHJvdywgY29sLCBpc0hvcml6b250YWwpICE9PVxyXG4gICAgbnVsbFxyXG4gICkge1xyXG4gICAgcGxheWVyLmJvYXJkLnBsYWNlU2hpcChzaGlwTGVuZ3Roc1tzaGlwQ291bnRlcl0sIHJvdywgY29sLCBpc0hvcml6b250YWwpO1xyXG4gICAgaWYgKGlzSG9yaXpvbnRhbCkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGhzW3NoaXBDb3VudGVyXTsgaSsrKSB7XHJcbiAgICAgICAgZGl2QXJyYXlQbGFjZW1lbnRbcm93XVtjb2wgKyBpXS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImxpZ2h0Z3JlZW5cIjtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICghaXNIb3Jpem9udGFsKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aHNbc2hpcENvdW50ZXJdOyBpKyspIHtcclxuICAgICAgICBkaXZBcnJheVBsYWNlbWVudFtyb3cgKyBpXVtjb2xdLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwibGlnaHRncmVlblwiO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBkaXNwbGF5UGxheWVyKCk7XHJcbiAgICBzaGlwQ291bnRlcisrO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGhhbmRsZUhvdmVyID0gKGNlbGwsIHJvdywgY29sKSA9PiB7XHJcbiAgY29uc3Qgc2hpcExlbmd0aHMgPSBbNSwgNCwgMywgMywgMl07XHJcblxyXG4gIGlmIChpc0hvcml6b250YWwpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aHNbc2hpcENvdW50ZXJdOyBpKyspIHtcclxuICAgICAgZGl2QXJyYXlQbGFjZW1lbnRbcm93XVtjb2wgKyBpXS5jbGFzc0xpc3QuYWRkKFwiaG92ZXJlZFwiKTtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKCFpc0hvcml6b250YWwpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aHNbc2hpcENvdW50ZXJdOyBpKyspIHtcclxuICAgICAgZGl2QXJyYXlQbGFjZW1lbnRbcm93ICsgaV1bY29sXS5jbGFzc0xpc3QuYWRkKFwiaG92ZXJlZFwiKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5jb25zdCByZW1vdmVIb3ZlciA9ICgpID0+IHtcclxuICBjb25zdCBob3ZlcmVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ob3ZlcmVkXCIpO1xyXG4gIGhvdmVyZWQuZm9yRWFjaCgoaXRlbSkgPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwiaG92ZXJlZFwiKSk7XHJcbn07XHJcblxyXG5kb2N1bWVudFxyXG4gIC5xdWVyeVNlbGVjdG9yKFwiLmRpcmVjdGlvblwiKVxyXG4gIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gaGFuZGxlRGlyZWN0aW9uVG9nZ2xlKCkpO1xyXG5cclxuY29uc3QgaGFuZGxlRGlyZWN0aW9uVG9nZ2xlID0gKCkgPT4ge1xyXG4gIGlmIChpc0hvcml6b250YWwpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGlyZWN0aW9uXCIpLnRleHRDb250ZW50ID0gXCJWZXJ0aWNhbFwiO1xyXG4gICAgaXNIb3Jpem9udGFsID0gZmFsc2U7XHJcbiAgfSBlbHNlIGlmICghaXNIb3Jpem9udGFsKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRpcmVjdGlvblwiKS50ZXh0Q29udGVudCA9IFwiSG9yaXpvbnRhbFwiO1xyXG4gICAgaXNIb3Jpem9udGFsID0gdHJ1ZTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBkaXNwbGF5UGxheWVyID0gKCkgPT4ge1xyXG4gIGNvbnN0IHBsYXllckJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXJCb2FyZFwiKTtcclxuICBwbGF5ZXJCb2FyZC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gIGRpdkFycmF5ID0gW107XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xyXG4gICAgY29uc3Qgc3ViQXJyYXkgPSBbXTtcclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xyXG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHJcbiAgICAgIGlmIChwbGF5ZXIuYm9hcmQuYm9hcmRbaV1bal0gaW5zdGFuY2VvZiBTaGlwKSB7XHJcbiAgICAgICAgY2VsbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImxpZ2h0Z3JlZW5cIjtcclxuICAgICAgICBjZWxsLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkIGdyZWVuXCI7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHBsYXllckJvYXJkLmFwcGVuZENoaWxkKGNlbGwpO1xyXG4gICAgICBzdWJBcnJheS5wdXNoKGNlbGwpO1xyXG4gICAgfVxyXG4gICAgZGl2QXJyYXkucHVzaChzdWJBcnJheSk7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgZGlzcGxheUNvbXB1dGVyID0gKCkgPT4ge1xyXG4gIGNvbnN0IGNvbXB1dGVyQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbXB1dGVyQm9hcmRcIik7XHJcbiAgY29tcHV0ZXJCb2FyZC5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcclxuICAgIGxldCBzdWJBcnJheSA9IFtdO1xyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XHJcbiAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoXCJjb21wQ2VsbFwiKTtcclxuICAgICAgY29tcHV0ZXJCb2FyZC5hcHBlbmRDaGlsZChjZWxsKTtcclxuICAgICAgc3ViQXJyYXkucHVzaChjZWxsKTtcclxuICAgIH1cclxuICAgIGNvbXBEaXZBcnJheS5wdXNoKHN1YkFycmF5KTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBjbGlja0hhbmRsZXIgPSAoZXZlbnQpID0+IHtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xyXG4gICAgICBpZiAoY29tcERpdkFycmF5W2ldW2pdID09PSBldmVudC50YXJnZXQpIHtcclxuICAgICAgICBpZiAocGxheWVyLnRyYWNrU2hvdHMuYm9hcmRbaV1bal0gIT09IFwiWFwiKSB7XHJcbiAgICAgICAgICBjb25zdCBjZWxsID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgICAgaGFuZGxlQXR0YWNrKGksIGosIGNlbGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGhhbmRsZUF0dGFjayA9IChyb3csIGNvbCwgY2VsbCkgPT4ge1xyXG4gIGNvbXB1dGVyLmJvYXJkLnJlY2lldmVBdHRhY2socm93LCBjb2wpO1xyXG4gIGNvbnN0IGNvbXBDZWxsID0gY29tcHV0ZXIuYm9hcmQuYm9hcmRbcm93XVtjb2xdO1xyXG5cclxuICBpZiAoY29tcHV0ZXIuYm9hcmQuYm9hcmRbcm93XVtjb2xdID09IG51bGwpIHtcclxuICAgIGNlbGwudGV4dENvbnRlbnQgPSBcIitcIjtcclxuICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjNTQ1NDU0XCI7XHJcbiAgICBwbGF5ZXIudHJhY2tTaG90cy5ib2FyZFtyb3ddW2NvbF0gPSBcIlhcIjtcclxuICAgIGRpc3BsYXlBdHRhY2tSZXN1bHRzKFwicGxheWVyXCIsIGZhbHNlLCBjb21wQ2VsbCk7XHJcbiAgfSBlbHNlIGlmIChjb21wdXRlci5ib2FyZC5ib2FyZFtyb3ddW2NvbF0gaW5zdGFuY2VvZiBTaGlwKSB7XHJcbiAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmVkXCI7XHJcbiAgICBjZWxsLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkICNGRjdGN0ZcIjtcclxuICAgIHBsYXllci50cmFja1Nob3RzLmJvYXJkW3Jvd11bY29sXSA9IFwiWFwiO1xyXG4gICAgZGlzcGxheUF0dGFja1Jlc3VsdHMoXCJwbGF5ZXJcIiwgdHJ1ZSwgY29tcENlbGwpO1xyXG4gIH1cclxuICBpZiAoZGV0ZXJtaW5lQWxsU3VuaygpKSB7XHJcbiAgICBkaXNwbGF5V2lubmVyKHRydWUpO1xyXG4gICAgZG9jdW1lbnRcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIuY29tcHV0ZXJCb2FyZFwiKVxyXG4gICAgICAucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrSGFuZGxlcik7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc3RhcnRcIikuY2xhc3NMaXN0LnJlbW92ZShcImdvbmVcIik7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBjb25zdCB2YWxpZEF0dGFjayA9IGNvbXB1dGVyLmF0dGFjaygpO1xyXG4gIGNvbnN0IHBsYXllckNlbGwgPSBwbGF5ZXIuYm9hcmQuYm9hcmRbdmFsaWRBdHRhY2tbMF1dW3ZhbGlkQXR0YWNrWzFdXTtcclxuICBwbGF5ZXIuYm9hcmQucmVjaWV2ZUF0dGFjayh2YWxpZEF0dGFja1swXSwgdmFsaWRBdHRhY2tbMV0pO1xyXG5cclxuICBkb2N1bWVudFxyXG4gICAgLnF1ZXJ5U2VsZWN0b3IoXCIuY29tcHV0ZXJCb2FyZFwiKVxyXG4gICAgLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGlja0hhbmRsZXIpO1xyXG5cclxuICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGV4dFwiKS50ZXh0Q29udGVudCA9IFwiQ29tcHV0ZXIgaXMgQWltaW5nISFcIjtcclxuICB9LCAxNTAwKTtcclxuXHJcbiAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICBpZiAocGxheWVyQ2VsbCA9PSBudWxsKSB7XHJcbiAgICAgIGRpdkFycmF5W3ZhbGlkQXR0YWNrWzBdXVt2YWxpZEF0dGFja1sxXV0udGV4dENvbnRlbnQgPSBcIitcIjtcclxuICAgICAgZGlzcGxheUF0dGFja1Jlc3VsdHMoXCJjb21wdXRlclwiLCBmYWxzZSwgY2VsbCwgcGxheWVyQ2VsbCk7XHJcbiAgICB9IGVsc2UgaWYgKHBsYXllckNlbGwgaW5zdGFuY2VvZiBTaGlwKSB7XHJcbiAgICAgIGRpdkFycmF5W3ZhbGlkQXR0YWNrWzBdXVt2YWxpZEF0dGFja1sxXV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZWRcIjtcclxuICAgICAgZGl2QXJyYXlbdmFsaWRBdHRhY2tbMF1dW3ZhbGlkQXR0YWNrWzFdXS5zdHlsZS5ib3JkZXIgPVxyXG4gICAgICAgIFwiMXB4IHNvbGlkICNGRjdGN0ZcIjtcclxuICAgICAgZGlzcGxheUF0dGFja1Jlc3VsdHMoXCJjb21wdXRlclwiLCB0cnVlLCBjZWxsLCBwbGF5ZXJDZWxsKTtcclxuICAgIH1cclxuICAgIGlmIChkZXRlcm1pbmVBbGxTdW5rKCkpIHtcclxuICAgICAgZGlzcGxheVdpbm5lcihmYWxzZSk7XHJcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzdGFydFwiKS5jbGFzc0xpc3QucmVtb3ZlKFwiZ29uZVwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGV4dFwiKS50ZXh0Q29udGVudCA9XHJcbiAgICAgICAgICBcIkNsaWNrIGEgY2VsbCBvbiB0aGUgZW5lbXkgYm9hcmQgdG8gYXR0YWNrIVwiO1xyXG5cclxuICAgICAgICBkb2N1bWVudFxyXG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIuY29tcHV0ZXJCb2FyZFwiKVxyXG4gICAgICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjbGlja0hhbmRsZXIpO1xyXG4gICAgICB9LCAxODAwKTtcclxuICAgIH1cclxuICB9LCAzNTAwKTtcclxufTtcclxuXHJcbmNvbnN0IGRpc3BsYXlBdHRhY2tSZXN1bHRzID0gKHdobywgaGl0LCBjb21wQ2VsbCwgcGxheWVyQ2VsbCkgPT4ge1xyXG4gIGNvbnN0IHRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRleHRcIik7XHJcbiAgaWYgKHdobyA9PT0gXCJwbGF5ZXJcIikge1xyXG4gICAgaWYgKGhpdCkge1xyXG4gICAgICBpZiAoY29tcENlbGwuaXNTdW5rKCkpIHtcclxuICAgICAgICB0ZXh0LnRleHRDb250ZW50ID0gYEhpdCBjb21wdXRlciBzaGlwISBTaGlwIHN1bmshICgke2NvbXBDZWxsLmxlbmd0aH0pYDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0ZXh0LnRleHRDb250ZW50ID0gXCJIaXQgY29tcHV0ZXIgc2hpcCFcIjtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGV4dC50ZXh0Q29udGVudCA9IFwiWW91IG1pc3NlZCFcIjtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHdobyA9PT0gXCJjb21wdXRlclwiKSB7XHJcbiAgICBpZiAoaGl0KSB7XHJcbiAgICAgIGlmIChwbGF5ZXJDZWxsLmlzU3VuaygpKSB7XHJcbiAgICAgICAgdGV4dC50ZXh0Q29udGVudCA9IGBDb21wdXRlciBoaXQgeW91ciBzaGlwISBTaGlwIHN1bmshICgke3BsYXllckNlbGwubGVuZ3RofSlgO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRleHQudGV4dENvbnRlbnQgPSBcIkNvbXB1dGVyIGhpdCB5b3VyIHNoaXAhXCI7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRleHQudGV4dENvbnRlbnQgPSBcIkNvbXB1dGVyIG1pc3NlZCFcIjtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBkZXRlcm1pbmVBbGxTdW5rID0gKCkgPT4ge1xyXG4gIGlmIChjb21wdXRlci5ib2FyZC5jaGVja0FsbFN1bmsoKSkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIGlmIChwbGF5ZXIuYm9hcmQuY2hlY2tBbGxTdW5rKCkpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgZGlzcGxheVdpbm5lciA9ICh3aG8pID0+IHtcclxuICBpZiAoZGV0ZXJtaW5lQWxsU3VuaygpKSB7XHJcbiAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZXh0XCIpO1xyXG4gICAgaWYgKHdobyA9PSB0cnVlKSB7XHJcbiAgICAgIHRleHQudGV4dENvbnRlbnQgPSBcIllvdSB3b24hIFlvdSBzdW5rIGFsbCBlbmVteSBzaGlwcyEhXCI7XHJcbiAgICB9IGVsc2UgaWYgKHdobyA9PSBmYWxzZSkge1xyXG4gICAgICB0ZXh0LnRleHRDb250ZW50ID0gXCJZb3UgbG9zdCEgVGhlIGNvbXB1dGVyIHN1bmsgYWxsIHlvdXIgc2hpcHMhIVwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG4gIHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzdGFydFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gIHJlc3RhcnRHYW1lKCk7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXN0YXJ0XCIpLmNsYXNzTGlzdC5hZGQoXCJnb25lXCIpO1xyXG59KTtcclxuXHJcbmNvbnN0IHJlc3RhcnRHYW1lID0gKCkgPT4ge1xyXG4gIHBsYXllciA9IG5ldyBQbGF5ZXIoKTtcclxuICBjb21wdXRlciA9IG5ldyBDb21wdXRlcigpO1xyXG5cclxuICBnZW5lcmF0ZVBsYWNlU2hpcEdyaWQoKTtcclxuICBjb21wdXRlci5wb3B1bGF0ZUJvYXJkKCk7XHJcblxyXG4gIGNvbXBEaXZBcnJheSA9IFtdO1xyXG4gIGRpc3BsYXlDb21wdXRlcigpO1xyXG5cclxuICBkaXNwbGF5UGxheWVyKCk7XHJcblxyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxhY2Utc2hpcHNcIikuY2xhc3NMaXN0LnJlbW92ZShcImdvbmVcIik7XHJcbiAgc2hpcENvdW50ZXIgPSAwO1xyXG5cclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRleHRcIikudGV4dENvbnRlbnQgPVxyXG4gICAgXCJDbGljayBhIGNlbGwgb24gdGhlIGVuZW15IGJvYXJkIHRvIGF0dGFjayFcIjtcclxufTtcclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhcnRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICBpZiAoc2hpcENvdW50ZXIgPiA0KSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYWNlLXNoaXBzXCIpLmNsYXNzTGlzdC5hZGQoXCJnb25lXCIpO1xyXG4gICAgZG9jdW1lbnRcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIuY29tcHV0ZXJCb2FyZFwiKVxyXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrSGFuZGxlcik7XHJcbiAgfVxyXG4gIHJldHVybjtcclxufSk7XHJcblxyXG5nZW5lcmF0ZVBsYWNlU2hpcEdyaWQoKTtcclxuY29tcHV0ZXIucG9wdWxhdGVCb2FyZCgpO1xyXG5kaXNwbGF5Q29tcHV0ZXIoKTtcclxuZGlzcGxheVBsYXllcigpO1xyXG5cclxuZXhwb3J0IHsgZGlzcGxheVBsYXllciB9O1xyXG4iLCJpbXBvcnQgU2hpcCBmcm9tIFwiLi9zaGlwXCI7XHJcblxyXG5jbGFzcyBHYW1lYm9hcmQge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5ib2FyZCA9IEFycmF5LmZyb20oeyBsZW5ndGg6IDEwIH0sICgpID0+IEFycmF5KDEwKS5maWxsKG51bGwpKTtcclxuICAgIHRoaXMuYWxsU3VuayA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcGxhY2VTaGlwKHNoaXBMZW5ndGgsIHJvdywgY29sLCBpc0hvcml6b250YWwgPSB0cnVlKSB7XHJcbiAgICBjb25zdCBzaGlwID0gbmV3IFNoaXAoc2hpcExlbmd0aCk7XHJcblxyXG4gICAgaWYgKHRoaXMuaXNQbGFjZW1lbnRWYWxpZChzaGlwLCByb3csIGNvbCwgaXNIb3Jpem9udGFsKSkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKykge1xyXG4gICAgICAgIGlmIChpc0hvcml6b250YWwpIHtcclxuICAgICAgICAgIHRoaXMuYm9hcmRbcm93XVtjb2wgKyBpXSA9IHNoaXA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuYm9hcmRbcm93ICsgaV1bY29sXSA9IHNoaXA7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzUGxhY2VtZW50VmFsaWQoc2hpcCwgcm93LCBjb2wsIGlzSG9yaXpvbnRhbCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChpc0hvcml6b250YWwpIHtcclxuICAgICAgICBpZiAoY29sICsgaSA+PSAxMCB8fCB0aGlzLmJvYXJkW3Jvd11bY29sICsgaV0gIT09IG51bGwpIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiAoIWlzSG9yaXpvbnRhbCkge1xyXG4gICAgICAgIGlmIChyb3cgKyBpID49IDEwIHx8IHRoaXMuYm9hcmRbcm93ICsgaV1bY29sXSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICByZWNpZXZlQXR0YWNrKHJvdywgY29sKSB7XHJcbiAgICBsZXQgY2VsbCA9IHRoaXMuYm9hcmRbcm93XVtjb2xdO1xyXG4gICAgaWYgKGNlbGwgPT0gbnVsbCkge1xyXG4gICAgICBjZWxsID0gXCJtaXNzXCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjZWxsLmhpdCgpO1xyXG4gICAgICBpZiAoY2VsbC5pc1N1bmsoKSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2hpcCBzdW5rIVwiKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hlY2tBbGxTdW5rKCkge1xyXG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgMTA7IHJvdysrKSB7XHJcbiAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IDEwOyBjb2wrKykge1xyXG4gICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmJvYXJkW3Jvd11bY29sXTtcclxuICAgICAgICBpZiAoY2VsbCBpbnN0YW5jZW9mIFNoaXApIHtcclxuICAgICAgICAgIGNlbGwuaXNTdW5rKCk7XHJcbiAgICAgICAgICBpZiAoIWNlbGwuc3Vuaykge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEdhbWVib2FyZDtcclxuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcclxuXHJcbmNsYXNzIFBsYXllciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xyXG4gICAgdGhpcy50cmFja1Nob3RzID0gbmV3IEdhbWVib2FyZCgpO1xyXG4gICAgdGhpcy53b25HYW1lID0gZmFsc2U7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBDb21wdXRlciB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xyXG4gICAgdGhpcy50cmFja1Nob3RzID0gbmV3IEdhbWVib2FyZCgpO1xyXG4gICAgdGhpcy53b25HYW1lID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwb3B1bGF0ZUJvYXJkKCkge1xyXG4gICAgY29uc3Qgc2hpcExlbmd0aHMgPSBbNSwgNCwgMywgMywgMl07XHJcblxyXG4gICAgc2hpcExlbmd0aHMuZm9yRWFjaCgobGVuZ3RoKSA9PiB7XHJcbiAgICAgIGxldCBwbGFjZWQgPSBmYWxzZTtcclxuICAgICAgd2hpbGUgKCFwbGFjZWQpIHtcclxuICAgICAgICBsZXQgcm93ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xyXG4gICAgICAgIGxldCBjb2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgICAgbGV0IGlzSG9yaXpvbnRhbCA9IE1hdGgucmFuZG9tKCkgPCAwLjU7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmJvYXJkLnBsYWNlU2hpcChsZW5ndGgsIHJvdywgY29sLCBpc0hvcml6b250YWwpICE9PSBudWxsKSB7XHJcbiAgICAgICAgICB0aGlzLmJvYXJkLnBsYWNlU2hpcChsZW5ndGgsIHJvdywgY29sLCBpc0hvcml6b250YWwpO1xyXG4gICAgICAgICAgcGxhY2VkID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYXR0YWNrKCkge1xyXG4gICAgbGV0IGhpdCA9IGZhbHNlO1xyXG5cclxuICAgIHdoaWxlICghaGl0KSB7XHJcbiAgICAgIGxldCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgIGxldCBjb2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgIGxldCBjZWxsID0gdGhpcy50cmFja1Nob3RzLmJvYXJkW3Jvd11bY29sXTtcclxuXHJcbiAgICAgIGlmIChjZWxsID09IG51bGwpIHtcclxuICAgICAgICB0aGlzLnRyYWNrU2hvdHMuYm9hcmRbcm93XVtjb2xdID0gXCJYXCI7XHJcbiAgICAgICAgaGl0ID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gW3JvdywgY29sXTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IHsgUGxheWVyLCBDb21wdXRlciB9O1xyXG4iLCJjbGFzcyBTaGlwIHtcclxuICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcclxuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xyXG4gICAgdGhpcy5oaXRzID0gMDtcclxuICAgIHRoaXMuc3VuayA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgaGl0KCkge1xyXG4gICAgdGhpcy5oaXRzKys7XHJcbiAgfVxyXG5cclxuICBpc1N1bmsoKSB7XHJcbiAgICBpZiAodGhpcy5oaXRzID09IHRoaXMubGVuZ3RoKSB7XHJcbiAgICAgIHJldHVybiAodGhpcy5zdW5rID0gdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XHJcbmltcG9ydCB7IFBsYXllciwgQ29tcHV0ZXIgfSBmcm9tIFwiLi9wbGF5ZXJzXCI7XHJcbmltcG9ydCB7IGRpc3BsYXlQbGF5ZXIgfSBmcm9tIFwiLi9ET01cIjtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9