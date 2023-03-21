import { Ship, Gameboard, Player } from "./logic";
import { preset, game, stuff } from "./index";

const boardContainer = document.querySelector(".board-container");
const winnerMessage = document.querySelector(".winner-message");
const restartBtn = document.querySelector(".restart-btn");
const startBtn = document.querySelector(".start-btn");

function openGameoverWindow() {
  document.querySelector(".gameover-window").style.display = "flex";
}

function hideGameoverWindow() {
  document.querySelector(".gameover-window").style.display = "none";
}

function showComputerBoard() {
  document.querySelector(".computerBoard").style.display = "grid";
}

function hideComputerBoard() {
  document.querySelector(".computerBoard").style.display = "none";
}

function displayWinnerMessage() {
  winnerMessage.textContent = "Congratulations! You won!";
}

function displayComputerMessage() {
  winnerMessage.textContent = "Sorry, you lost. Better luck next time!";
}

function restart() {
  hideGameoverWindow();
  boardContainer.innerHTML = "";
  preset();
  hideComputerBoard();
}

startBtn.addEventListener("click", () => {
  showComputerBoard();
  game(stuff[0], stuff[1], stuff[2]);
});

restartBtn.addEventListener("click", () => {
  restart();
});

Gameboard.prototype.print = function (player, enemy, enemyBoard) {
  const board = document.createElement("div");
  boardContainer.appendChild(board);
  board.classList.add(`${this.name}`);

  function action(row, i, player, playerBoard, enemy, enemyBoard) {
    const cell = document.createElement("div");
    cell.dataset.row = `${row}`;
    cell.dataset.column = `${i + 1}`;

    if (player !== undefined) {
      cell.addEventListener(
        "click",
        () => {
          console.log(playerBoard, enemyBoard);
          enemy.attack(row, i + 1, player, playerBoard);
          console.log(enemy.turn);

          if (!enemy.turn) {
            while (!enemy.turn) {
              let move = player.computerAttack(enemy, enemyBoard);
              let xc = move[0];
              let yc = move[1];
              const explosion = document.createElement("img");
              explosion.src = "./bomb.svg";
              explosion.classList.add("explosion");
              document
                .querySelector(
                  `.${enemyBoard.name} [data-row="${xc}"][data-column="${yc}"]`
                )
                .appendChild(explosion);

              console.log(playerBoard, "this");
              console.log(enemyBoard, "enemyBoard");
            }
          }

          if (playerBoard[`row${row}`][i] == "missed attack") {
            cell.classList.add("missed-attack");
          }
          if (
            playerBoard[`row${row}`][i].sunk !== true &&
            playerBoard[`row${row}`][i] !== "missed attack"
          ) {
            const explosion = document.createElement("img");
            explosion.src = "./bomb.svg";
            explosion.classList.add("explosion");
            cell.classList.add("hit");
            cell.appendChild(explosion);
          }

          if (playerBoard[`row${row}`][i].sunk == true) {
            const explosion = document.createElement("img");
            explosion.src = "./bomb.svg";
            explosion.classList.add("explosion");
            cell.appendChild(explosion);
          }

          playerBoard.displaySunkShips();

          if (playerBoard.allSunk() == true || enemyBoard.allSunk() == true) {
            openGameoverWindow();
            if (playerBoard.allSunk() == true) {
              displayWinnerMessage();
            } else {
              displayComputerMessage();
            }
          }
        },
        { once: true }
      );
    }

    board.appendChild(cell);
  }

  for (let i = 0; i < this.row1.length; i++) {
    action(1, i, player, this, enemy, enemyBoard);
  }

  for (let i = 0; i < this.row2.length; i++) {
    action(2, i, player, this, enemy, enemyBoard);
  }

  for (let i = 0; i < this.row3.length; i++) {
    action(3, i, player, this, enemy, enemyBoard);
  }

  for (let i = 0; i < this.row4.length; i++) {
    action(4, i, player, this, enemy, enemyBoard);
  }

  for (let i = 0; i < this.row5.length; i++) {
    action(5, i, player, this, enemy, enemyBoard);
  }

  for (let i = 0; i < this.row6.length; i++) {
    action(6, i, player, this, enemy, enemyBoard);
  }

  for (let i = 0; i < this.row7.length; i++) {
    action(7, i, player, this, enemy, enemyBoard);
  }

  for (let i = 0; i < this.row8.length; i++) {
    action(8, i, player, this, enemy, enemyBoard);
  }

  for (let i = 0; i < this.row9.length; i++) {
    action(9, i, player, this, enemy, enemyBoard);
  }

  for (let i = 0; i < this.row10.length; i++) {
    action(10, i, player, this, enemy, enemyBoard);
  }
};

let beingDragged;

function dragStart(e) {
  console.log(e, "dragStart");
  beingDragged = e.target;
}
function dragDrop(e) {
  console.log(e.target);
  e.target.appendChild(beingDragged);
}

function dragOver(e) {
  e.preventDefault();
}

Gameboard.prototype.displayShips = function () {
  for (let i = 0; i < this.ships.length; i++) {
    const ship = document.createElement("div");

    ship.classList.add("ship");

    ship.dataset.length = `${this.ships[i].length}`;
    ship.dataset.position = `${this.ships[i].position}`;
    ship.dataset.timesHit = `${this.ships[i].timesHit}`;
    ship.dataset.sunk = `${this.ships[i].sunk}`;
    ship.dataset.x = `${this.ships[i].row}`;
    ship.dataset.y = `${this.ships[i].column}`;
    ship.dataset.name = `${this.ships[i].name}`;

    let place = document.querySelector(
      `.${this.name} [data-row="${ship.dataset.x}"][data-column="${ship.dataset.y}"]`
    );

    let squareSide = `${document.querySelector("[data-row]").offsetWidth}px`;

    if (this.ships[i].position == "h") {
      ship.style.width = `calc(${squareSide}*${this.ships[i].length} - 4px)`;
      ship.style.height = `calc(${squareSide} - 4px)`;
    }
    if (this.ships[i].position == "v") {
      ship.style.height = `calc(${squareSide}*${this.ships[i].length} - 4px)`;
      ship.style.width = `calc(${squareSide} - 4px)`;
    }

    place.appendChild(ship);

    ship.addEventListener("dragstart", (e) => {
      dragStart(e);
      console.log(beingDragged, "beingDragged inside a drag start");
      this.deleteShip(
        e.target.dataset.x,
        e.target.dataset.y,
        e.target.dataset.length,
        e.target.dataset.position,
        e.target.dataset.name
      );
    });
  }
};

Gameboard.prototype.displaySunkShips = function () {
  for (let i = 0; i < this.ships.length; i++) {
    const ship = document.createElement("div");

    ship.classList.add("ship");
    ship.setAttribute("draggable", "");

    ship.dataset.length = `${this.ships[i].length}`;
    ship.dataset.position = `${this.ships[i].position}`;
    ship.dataset.timesHit = `${this.ships[i].timesHit}`;
    ship.dataset.sunk = `${this.ships[i].sunk}`;
    ship.dataset.x = `${this.ships[i].row}`;
    ship.dataset.y = `${this.ships[i].column}`;
    ship.dataset.name = `${this.ships[i].name}`;

    let place = document.querySelector(
      `.${this.name} [data-row="${ship.dataset.x}"][data-column="${ship.dataset.y}"]`
    );

    let squareSide = `${document.querySelector("[data-row]").offsetWidth}px`;

    if (this.ships[i].position == "h") {
      ship.style.width = `calc(${squareSide}*${this.ships[i].length} - 4px)`;
      ship.style.height = `calc(${squareSide} - 4px)`;
    }
    if (this.ships[i].position == "v") {
      ship.style.height = `calc(${squareSide}*${this.ships[i].length} - 4px)`;
      ship.style.width = `calc(${squareSide} - 4px)`;
    }
    if (this.ships[i].sunk) {
      place.appendChild(ship);
    }
  }
};

Gameboard.prototype.makeCellsHelpDrag = function (boardClass) {
  const cells = document.querySelectorAll(`.${boardClass} [data-row]`);
  console.log(cells);
  cells.forEach((cell) => {
    cell.addEventListener("dragover", dragOver);
    cell.addEventListener("drop", (e) => {
      dragDrop(e);
      console.log(this);
      console.log(beingDragged, "beingDragged");
      console.log(Number.parseInt(e.target.dataset.column) + 1);
      this.placeShip(
        Number.parseInt(e.target.dataset.row),
        Number.parseInt(e.target.dataset.column),
        Number.parseInt(beingDragged.dataset.length),
        beingDragged.dataset.position,
        beingDragged.dataset.name
      );
      beingDragged.dataset.x = e.target.dataset.row;
      beingDragged.dataset.y = e.target.dataset.column;
      console.log(beingDragged, "beingDragged after");
    });
  });
};

export { boardContainer, winnerMessage, restartBtn, Gameboard };
