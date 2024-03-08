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
    document
      .querySelector(".computerBoard")
      .removeEventListener("click", clickHandler);
    restartGame();
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
    if (determineAllSunk()) {
      displayWinner(false);
      restartGame();
    } else {
      document
        .querySelector(".computerBoard")
        .addEventListener("click", clickHandler);
    }
  }, 100);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBZSxJQUFJLEVBQUM7Ozs7Ozs7VUNsQnBCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05vQztBQUNTO0FBQ1AiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL0RPTS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllcnMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBsYXllciwgQ29tcHV0ZXIgfSBmcm9tIFwiLi9wbGF5ZXJzXCI7XHJcbmltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcclxuXHJcbmxldCBwbGF5ZXIgPSBuZXcgUGxheWVyKCk7XHJcbmxldCBjb21wdXRlciA9IG5ldyBDb21wdXRlcigpO1xyXG5sZXQgZGl2QXJyYXkgPSBbXTtcclxubGV0IGNvbXBEaXZBcnJheSA9IFtdO1xyXG5sZXQgZGl2QXJyYXlQbGFjZW1lbnQgPSBbXTtcclxubGV0IHNoaXBDb3VudGVyID0gMDtcclxubGV0IGlzSG9yaXpvbnRhbCA9IHRydWU7XHJcblxyXG5jb25zdCBnZW5lcmF0ZVBsYWNlU2hpcEdyaWQgPSAoKSA9PiB7XHJcbiAgY29uc3QgcGxhY2VCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxhY2UtYm9hcmRcIik7XHJcbiAgcGxhY2VCb2FyZC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gIGRpdkFycmF5UGxhY2VtZW50ID0gW107XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xyXG4gICAgY29uc3Qgc3ViQXJyYXkgPSBbXTtcclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xyXG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHJcbiAgICAgIHBsYWNlQm9hcmQuYXBwZW5kQ2hpbGQoY2VsbCk7XHJcblxyXG4gICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiBwbGFjZVNoaXBzKGksIGopKTtcclxuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsICgpID0+IGhhbmRsZUhvdmVyKGNlbGwsIGksIGopKTtcclxuICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgKCkgPT4gcmVtb3ZlSG92ZXIoKSk7XHJcbiAgICAgIHN1YkFycmF5LnB1c2goY2VsbCk7XHJcbiAgICB9XHJcbiAgICBkaXZBcnJheVBsYWNlbWVudC5wdXNoKHN1YkFycmF5KTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBwbGFjZVNoaXBzID0gKHJvdywgY29sKSA9PiB7XHJcbiAgY29uc3Qgc2hpcExlbmd0aHMgPSBbNSwgNCwgMywgMywgMl07XHJcblxyXG4gIGlmIChcclxuICAgIHBsYXllci5ib2FyZC5wbGFjZVNoaXAoc2hpcExlbmd0aHNbc2hpcENvdW50ZXJdLCByb3csIGNvbCwgaXNIb3Jpem9udGFsKSAhPT1cclxuICAgIG51bGxcclxuICApIHtcclxuICAgIHBsYXllci5ib2FyZC5wbGFjZVNoaXAoc2hpcExlbmd0aHNbc2hpcENvdW50ZXJdLCByb3csIGNvbCwgaXNIb3Jpem9udGFsKTtcclxuICAgIGlmIChpc0hvcml6b250YWwpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3Roc1tzaGlwQ291bnRlcl07IGkrKykge1xyXG4gICAgICAgIGRpdkFycmF5UGxhY2VtZW50W3Jvd11bY29sICsgaV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJsaWdodGdyZWVuXCI7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoIWlzSG9yaXpvbnRhbCkge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGhzW3NoaXBDb3VudGVyXTsgaSsrKSB7XHJcbiAgICAgICAgZGl2QXJyYXlQbGFjZW1lbnRbcm93ICsgaV1bY29sXS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImxpZ2h0Z3JlZW5cIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZGlzcGxheVBsYXllcigpO1xyXG4gICAgc2hpcENvdW50ZXIrKztcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBoYW5kbGVIb3ZlciA9IChjZWxsLCByb3csIGNvbCkgPT4ge1xyXG4gIGNvbnN0IHNoaXBMZW5ndGhzID0gWzUsIDQsIDMsIDMsIDJdO1xyXG5cclxuICBpZiAoaXNIb3Jpem9udGFsKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGhzW3NoaXBDb3VudGVyXTsgaSsrKSB7XHJcbiAgICAgIGRpdkFycmF5UGxhY2VtZW50W3Jvd11bY29sICsgaV0uY2xhc3NMaXN0LmFkZChcImhvdmVyZWRcIik7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmICghaXNIb3Jpem9udGFsKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGhzW3NoaXBDb3VudGVyXTsgaSsrKSB7XHJcbiAgICAgIGRpdkFycmF5UGxhY2VtZW50W3JvdyArIGldW2NvbF0uY2xhc3NMaXN0LmFkZChcImhvdmVyZWRcIik7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgcmVtb3ZlSG92ZXIgPSAoKSA9PiB7XHJcbiAgY29uc3QgaG92ZXJlZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaG92ZXJlZFwiKTtcclxuICBob3ZlcmVkLmZvckVhY2goKGl0ZW0pID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZShcImhvdmVyZWRcIikpO1xyXG59O1xyXG5cclxuZG9jdW1lbnRcclxuICAucXVlcnlTZWxlY3RvcihcIi5kaXJlY3Rpb25cIilcclxuICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IGhhbmRsZURpcmVjdGlvblRvZ2dsZSgpKTtcclxuXHJcbmNvbnN0IGhhbmRsZURpcmVjdGlvblRvZ2dsZSA9ICgpID0+IHtcclxuICBpZiAoaXNIb3Jpem9udGFsKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRpcmVjdGlvblwiKS50ZXh0Q29udGVudCA9IFwiVmVydGljYWxcIjtcclxuICAgIGlzSG9yaXpvbnRhbCA9IGZhbHNlO1xyXG4gIH0gZWxzZSBpZiAoIWlzSG9yaXpvbnRhbCkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kaXJlY3Rpb25cIikudGV4dENvbnRlbnQgPSBcIkhvcml6b250YWxcIjtcclxuICAgIGlzSG9yaXpvbnRhbCA9IHRydWU7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgZGlzcGxheVBsYXllciA9ICgpID0+IHtcclxuICBjb25zdCBwbGF5ZXJCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyQm9hcmRcIik7XHJcbiAgcGxheWVyQm9hcmQuaW5uZXJIVE1MID0gXCJcIjtcclxuICBkaXZBcnJheSA9IFtdO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcclxuICAgIGNvbnN0IHN1YkFycmF5ID0gW107XHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcclxuICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcblxyXG4gICAgICBpZiAocGxheWVyLmJvYXJkLmJvYXJkW2ldW2pdIGluc3RhbmNlb2YgU2hpcCkge1xyXG4gICAgICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJsaWdodGdyZWVuXCI7XHJcbiAgICAgICAgY2VsbC5zdHlsZS5ib3JkZXIgPSBcIjFweCBzb2xpZCBncmVlblwiO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBwbGF5ZXJCb2FyZC5hcHBlbmRDaGlsZChjZWxsKTtcclxuICAgICAgc3ViQXJyYXkucHVzaChjZWxsKTtcclxuICAgIH1cclxuICAgIGRpdkFycmF5LnB1c2goc3ViQXJyYXkpO1xyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGRpc3BsYXlDb21wdXRlciA9ICgpID0+IHtcclxuICBjb25zdCBjb21wdXRlckJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21wdXRlckJvYXJkXCIpO1xyXG4gIGNvbXB1dGVyQm9hcmQuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XHJcbiAgICBsZXQgc3ViQXJyYXkgPSBbXTtcclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xyXG4gICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKFwiY29tcENlbGxcIik7XHJcbiAgICAgIGNvbXB1dGVyQm9hcmQuYXBwZW5kQ2hpbGQoY2VsbCk7XHJcbiAgICAgIHN1YkFycmF5LnB1c2goY2VsbCk7XHJcbiAgICB9XHJcbiAgICBjb21wRGl2QXJyYXkucHVzaChzdWJBcnJheSk7XHJcbiAgfVxyXG4gIGNvbXB1dGVyQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrSGFuZGxlcik7XHJcbn07XHJcblxyXG5jb25zdCBjbGlja0hhbmRsZXIgPSAoZXZlbnQpID0+IHtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xyXG4gICAgICBpZiAoY29tcERpdkFycmF5W2ldW2pdID09PSBldmVudC50YXJnZXQpIHtcclxuICAgICAgICBpZiAocGxheWVyLnRyYWNrU2hvdHMuYm9hcmRbaV1bal0gIT09IFwiWFwiKSB7XHJcbiAgICAgICAgICBjb25zdCBjZWxsID0gZXZlbnQudGFyZ2V0O1xyXG4gICAgICAgICAgaGFuZGxlQXR0YWNrKGksIGosIGNlbGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbmNvbnN0IGhhbmRsZUF0dGFjayA9IChyb3csIGNvbCwgY2VsbCkgPT4ge1xyXG4gIGNvbXB1dGVyLmJvYXJkLnJlY2lldmVBdHRhY2socm93LCBjb2wpO1xyXG4gIGNvbnN0IGNvbXBDZWxsID0gY29tcHV0ZXIuYm9hcmQuYm9hcmRbcm93XVtjb2xdO1xyXG5cclxuICBpZiAoY29tcHV0ZXIuYm9hcmQuYm9hcmRbcm93XVtjb2xdID09IG51bGwpIHtcclxuICAgIGNlbGwudGV4dENvbnRlbnQgPSBcIitcIjtcclxuICAgIGNlbGwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCIjNTQ1NDU0XCI7XHJcbiAgICBwbGF5ZXIudHJhY2tTaG90cy5ib2FyZFtyb3ddW2NvbF0gPSBcIlhcIjtcclxuICAgIGRpc3BsYXlBdHRhY2tSZXN1bHRzKFwicGxheWVyXCIsIGZhbHNlLCBjb21wQ2VsbCk7XHJcbiAgfSBlbHNlIGlmIChjb21wdXRlci5ib2FyZC5ib2FyZFtyb3ddW2NvbF0gaW5zdGFuY2VvZiBTaGlwKSB7XHJcbiAgICBjZWxsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmVkXCI7XHJcbiAgICBjZWxsLnN0eWxlLmJvcmRlciA9IFwiMXB4IHNvbGlkICNGRjdGN0ZcIjtcclxuICAgIHBsYXllci50cmFja1Nob3RzLmJvYXJkW3Jvd11bY29sXSA9IFwiWFwiO1xyXG4gICAgZGlzcGxheUF0dGFja1Jlc3VsdHMoXCJwbGF5ZXJcIiwgdHJ1ZSwgY29tcENlbGwpO1xyXG4gIH1cclxuICBpZiAoZGV0ZXJtaW5lQWxsU3VuaygpKSB7XHJcbiAgICBkaXNwbGF5V2lubmVyKHRydWUpO1xyXG4gICAgZG9jdW1lbnRcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIuY29tcHV0ZXJCb2FyZFwiKVxyXG4gICAgICAucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrSGFuZGxlcik7XHJcbiAgICByZXN0YXJ0R2FtZSgpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgY29uc3QgdmFsaWRBdHRhY2sgPSBjb21wdXRlci5hdHRhY2soKTtcclxuICBjb25zdCBwbGF5ZXJDZWxsID0gcGxheWVyLmJvYXJkLmJvYXJkW3ZhbGlkQXR0YWNrWzBdXVt2YWxpZEF0dGFja1sxXV07XHJcbiAgcGxheWVyLmJvYXJkLnJlY2lldmVBdHRhY2sodmFsaWRBdHRhY2tbMF0sIHZhbGlkQXR0YWNrWzFdKTtcclxuXHJcbiAgZG9jdW1lbnRcclxuICAgIC5xdWVyeVNlbGVjdG9yKFwiLmNvbXB1dGVyQm9hcmRcIilcclxuICAgIC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2xpY2tIYW5kbGVyKTtcclxuXHJcbiAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICBpZiAocGxheWVyQ2VsbCA9PSBudWxsKSB7XHJcbiAgICAgIGRpdkFycmF5W3ZhbGlkQXR0YWNrWzBdXVt2YWxpZEF0dGFja1sxXV0udGV4dENvbnRlbnQgPSBcIitcIjtcclxuICAgICAgZGlzcGxheUF0dGFja1Jlc3VsdHMoXCJjb21wdXRlclwiLCBmYWxzZSwgY2VsbCwgcGxheWVyQ2VsbCk7XHJcbiAgICB9IGVsc2UgaWYgKHBsYXllckNlbGwgaW5zdGFuY2VvZiBTaGlwKSB7XHJcbiAgICAgIGRpdkFycmF5W3ZhbGlkQXR0YWNrWzBdXVt2YWxpZEF0dGFja1sxXV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJyZWRcIjtcclxuICAgICAgZGl2QXJyYXlbdmFsaWRBdHRhY2tbMF1dW3ZhbGlkQXR0YWNrWzFdXS5zdHlsZS5ib3JkZXIgPVxyXG4gICAgICAgIFwiMXB4IHNvbGlkICNGRjdGN0ZcIjtcclxuICAgICAgZGlzcGxheUF0dGFja1Jlc3VsdHMoXCJjb21wdXRlclwiLCB0cnVlLCBjZWxsLCBwbGF5ZXJDZWxsKTtcclxuICAgIH1cclxuICAgIGlmIChkZXRlcm1pbmVBbGxTdW5rKCkpIHtcclxuICAgICAgZGlzcGxheVdpbm5lcihmYWxzZSk7XHJcbiAgICAgIHJlc3RhcnRHYW1lKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBkb2N1bWVudFxyXG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLmNvbXB1dGVyQm9hcmRcIilcclxuICAgICAgICAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNsaWNrSGFuZGxlcik7XHJcbiAgICB9XHJcbiAgfSwgMTAwKTtcclxufTtcclxuXHJcbmNvbnN0IGRpc3BsYXlBdHRhY2tSZXN1bHRzID0gKHdobywgaGl0LCBjb21wQ2VsbCwgcGxheWVyQ2VsbCkgPT4ge1xyXG4gIGNvbnN0IHRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRleHRcIik7XHJcbiAgaWYgKHdobyA9PT0gXCJwbGF5ZXJcIikge1xyXG4gICAgaWYgKGhpdCkge1xyXG4gICAgICBpZiAoY29tcENlbGwuaXNTdW5rKCkpIHtcclxuICAgICAgICB0ZXh0LnRleHRDb250ZW50ID0gYEhpdCBjb21wdXRlciBzaGlwISBTaGlwIHN1bmshICgke2NvbXBDZWxsLmxlbmd0aH0pYDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0ZXh0LnRleHRDb250ZW50ID0gXCJIaXQgY29tcHV0ZXIgc2hpcCFcIjtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGV4dC50ZXh0Q29udGVudCA9IFwiWW91IG1pc3NlZCFcIjtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHdobyA9PT0gXCJjb21wdXRlclwiKSB7XHJcbiAgICBpZiAoaGl0KSB7XHJcbiAgICAgIGlmIChwbGF5ZXJDZWxsLmlzU3VuaygpKSB7XHJcbiAgICAgICAgdGV4dC50ZXh0Q29udGVudCA9IGBDb21wdXRlciBoaXQgeW91ciBzaGlwISBTaGlwIHN1bmshICgke3BsYXllckNlbGwubGVuZ3RofSlgO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRleHQudGV4dENvbnRlbnQgPSBcIkNvbXB1dGVyIGhpdCB5b3VyIHNoaXAhXCI7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRleHQudGV4dENvbnRlbnQgPSBcIkNvbXB1dGVyIG1pc3NlZCFcIjtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG5jb25zdCBkZXRlcm1pbmVBbGxTdW5rID0gKCkgPT4ge1xyXG4gIGlmIChjb21wdXRlci5ib2FyZC5jaGVja0FsbFN1bmsoKSkge1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSBlbHNlIGlmIChwbGF5ZXIuYm9hcmQuY2hlY2tBbGxTdW5rKCkpIHtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgZGlzcGxheVdpbm5lciA9ICh3aG8pID0+IHtcclxuICBpZiAoZGV0ZXJtaW5lQWxsU3VuaygpKSB7XHJcbiAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50ZXh0XCIpO1xyXG4gICAgaWYgKHdobyA9PSB0cnVlKSB7XHJcbiAgICAgIHRleHQudGV4dENvbnRlbnQgPSBcIllvdSB3b24hIFlvdSBzdW5rIGFsbCBlbmVteSBzaGlwcyEhXCI7XHJcbiAgICB9IGVsc2UgaWYgKHdobyA9PSBmYWxzZSkge1xyXG4gICAgICB0ZXh0LnRleHRDb250ZW50ID0gXCJZb3UgbG9zdCEgVGhlIGNvbXB1dGVyIHN1bmsgYWxsIHlvdXIgc2hpcHMhIVwiO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG4gIHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcbmNvbnN0IHJlc3RhcnRHYW1lID0gKCkgPT4ge1xyXG4gIHBsYXllciA9IG5ldyBQbGF5ZXIoKTtcclxuICBjb21wdXRlciA9IG5ldyBDb21wdXRlcigpO1xyXG5cclxuICBnZW5lcmF0ZVBsYWNlU2hpcEdyaWQoKTtcclxuICBjb21wdXRlci5wb3B1bGF0ZUJvYXJkKCk7XHJcblxyXG4gIGNvbXBEaXZBcnJheSA9IFtdO1xyXG4gIGRpc3BsYXlDb21wdXRlcigpO1xyXG5cclxuICBkaXNwbGF5UGxheWVyKCk7XHJcblxyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxhY2Utc2hpcHNcIikuY2xhc3NMaXN0LnJlbW92ZShcImdvbmVcIik7XHJcbiAgc2hpcENvdW50ZXIgPSAwO1xyXG5cclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRleHRcIikudGV4dENvbnRlbnQgPVxyXG4gICAgXCJDbGljayBhIGNlbGwgb24gdGhlIGVuZW15IGJvYXJkIHRvIGF0dGFjayFcIjtcclxufTtcclxuXHJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhcnRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYWNlLXNoaXBzXCIpLmNsYXNzTGlzdC5hZGQoXCJnb25lXCIpO1xyXG59KTtcclxuXHJcbmdlbmVyYXRlUGxhY2VTaGlwR3JpZCgpO1xyXG5jb21wdXRlci5wb3B1bGF0ZUJvYXJkKCk7XHJcbmRpc3BsYXlDb21wdXRlcigpO1xyXG5kaXNwbGF5UGxheWVyKCk7XHJcblxyXG5leHBvcnQgeyBkaXNwbGF5UGxheWVyIH07XHJcbiIsImltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXBcIjtcclxuXHJcbmNsYXNzIEdhbWVib2FyZCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmJvYXJkID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogMTAgfSwgKCkgPT4gQXJyYXkoMTApLmZpbGwobnVsbCkpO1xyXG4gICAgdGhpcy5hbGxTdW5rID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwbGFjZVNoaXAoc2hpcExlbmd0aCwgcm93LCBjb2wsIGlzSG9yaXpvbnRhbCA9IHRydWUpIHtcclxuICAgIGNvbnN0IHNoaXAgPSBuZXcgU2hpcChzaGlwTGVuZ3RoKTtcclxuXHJcbiAgICBpZiAodGhpcy5pc1BsYWNlbWVudFZhbGlkKHNoaXAsIHJvdywgY29sLCBpc0hvcml6b250YWwpKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcExlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKGlzSG9yaXpvbnRhbCkge1xyXG4gICAgICAgICAgdGhpcy5ib2FyZFtyb3ddW2NvbCArIGldID0gc2hpcDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5ib2FyZFtyb3cgKyBpXVtjb2xdID0gc2hpcDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaXNQbGFjZW1lbnRWYWxpZChzaGlwLCByb3csIGNvbCwgaXNIb3Jpem9udGFsKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGlzSG9yaXpvbnRhbCkge1xyXG4gICAgICAgIGlmIChjb2wgKyBpID49IDEwIHx8IHRoaXMuYm9hcmRbcm93XVtjb2wgKyBpXSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIGlmICghaXNIb3Jpem9udGFsKSB7XHJcbiAgICAgICAgaWYgKHJvdyArIGkgPj0gMTAgfHwgdGhpcy5ib2FyZFtyb3cgKyBpXVtjb2xdICE9PSBudWxsKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHJlY2lldmVBdHRhY2socm93LCBjb2wpIHtcclxuICAgIGxldCBjZWxsID0gdGhpcy5ib2FyZFtyb3ddW2NvbF07XHJcbiAgICBpZiAoY2VsbCA9PSBudWxsKSB7XHJcbiAgICAgIGNlbGwgPSBcIm1pc3NcIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNlbGwuaGl0KCk7XHJcbiAgICAgIGlmIChjZWxsLmlzU3VuaygpKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJzaGlwIHN1bmshXCIpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjaGVja0FsbFN1bmsoKSB7XHJcbiAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCAxMDsgcm93KyspIHtcclxuICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgMTA7IGNvbCsrKSB7XHJcbiAgICAgICAgY29uc3QgY2VsbCA9IHRoaXMuYm9hcmRbcm93XVtjb2xdO1xyXG4gICAgICAgIGlmIChjZWxsIGluc3RhbmNlb2YgU2hpcCkge1xyXG4gICAgICAgICAgY2VsbC5pc1N1bmsoKTtcclxuICAgICAgICAgIGlmICghY2VsbC5zdW5rKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xyXG4iLCJpbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL2dhbWVib2FyZFwiO1xyXG5cclxuY2xhc3MgUGxheWVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XHJcbiAgICB0aGlzLnRyYWNrU2hvdHMgPSBuZXcgR2FtZWJvYXJkKCk7XHJcbiAgICB0aGlzLndvbkdhbWUgPSBmYWxzZTtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIENvbXB1dGVyIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuYm9hcmQgPSBuZXcgR2FtZWJvYXJkKCk7XHJcbiAgICB0aGlzLnRyYWNrU2hvdHMgPSBuZXcgR2FtZWJvYXJkKCk7XHJcbiAgICB0aGlzLndvbkdhbWUgPSBmYWxzZTtcclxuICB9XHJcblxyXG4gIHBvcHVsYXRlQm9hcmQoKSB7XHJcbiAgICBjb25zdCBzaGlwTGVuZ3RocyA9IFs1LCA0LCAzLCAzLCAyXTtcclxuXHJcbiAgICBzaGlwTGVuZ3Rocy5mb3JFYWNoKChsZW5ndGgpID0+IHtcclxuICAgICAgbGV0IHBsYWNlZCA9IGZhbHNlO1xyXG4gICAgICB3aGlsZSAoIXBsYWNlZCkge1xyXG4gICAgICAgIGxldCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XHJcbiAgICAgICAgbGV0IGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgICBsZXQgaXNIb3Jpem9udGFsID0gTWF0aC5yYW5kb20oKSA8IDAuNTtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYm9hcmQucGxhY2VTaGlwKGxlbmd0aCwgcm93LCBjb2wsIGlzSG9yaXpvbnRhbCkgIT09IG51bGwpIHtcclxuICAgICAgICAgIHRoaXMuYm9hcmQucGxhY2VTaGlwKGxlbmd0aCwgcm93LCBjb2wsIGlzSG9yaXpvbnRhbCk7XHJcbiAgICAgICAgICBwbGFjZWQgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBhdHRhY2soKSB7XHJcbiAgICBsZXQgaGl0ID0gZmFsc2U7XHJcblxyXG4gICAgd2hpbGUgKCFoaXQpIHtcclxuICAgICAgbGV0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgbGV0IGNvbCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcclxuICAgICAgbGV0IGNlbGwgPSB0aGlzLnRyYWNrU2hvdHMuYm9hcmRbcm93XVtjb2xdO1xyXG5cclxuICAgICAgaWYgKGNlbGwgPT0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMudHJhY2tTaG90cy5ib2FyZFtyb3ddW2NvbF0gPSBcIlhcIjtcclxuICAgICAgICBoaXQgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiBbcm93LCBjb2xdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgeyBQbGF5ZXIsIENvbXB1dGVyIH07XHJcbiIsImNsYXNzIFNoaXAge1xyXG4gIGNvbnN0cnVjdG9yKGxlbmd0aCkge1xyXG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XHJcbiAgICB0aGlzLmhpdHMgPSAwO1xyXG4gICAgdGhpcy5zdW5rID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBoaXQoKSB7XHJcbiAgICB0aGlzLmhpdHMrKztcclxuICB9XHJcblxyXG4gIGlzU3VuaygpIHtcclxuICAgIGlmICh0aGlzLmhpdHMgPT0gdGhpcy5sZW5ndGgpIHtcclxuICAgICAgcmV0dXJuICh0aGlzLnN1bmsgPSB0cnVlKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFNoaXA7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcclxuaW1wb3J0IHsgUGxheWVyLCBDb21wdXRlciB9IGZyb20gXCIuL3BsYXllcnNcIjtcclxuaW1wb3J0IHsgZGlzcGxheVBsYXllciB9IGZyb20gXCIuL0RPTVwiO1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=