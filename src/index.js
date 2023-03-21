import "./style.css";
import { Ship, Player } from "./logic";
import { boardContainer, winnerMessage, restartBtn, Gameboard } from "./dom";

let stuff = [];

function preset() {
  let player = new Player("player", false);
  let computer = new Player("computer", true);

  let playerBoard = new Gameboard("playerBoard");
  let computerBoard = new Gameboard("computerBoard");

  playerBoard.placeShip(4, 4, 1, "v", "s1");
  playerBoard.placeShip(7, 4, 1, "v", "s2");
  playerBoard.placeShip(3, 7, 1, "v", "s3");
  playerBoard.placeShip(9, 10, 1, "v", "s4");

  playerBoard.placeShip(3, 1, 2, "h", "m1");
  playerBoard.placeShip(6, 6, 2, "h", "m2");
  playerBoard.placeShip(1, 5, 2, "v", "m3");

  playerBoard.placeShip(6, 1, 3, "v", "b1");
  playerBoard.placeShip(9, 6, 3, "h", "b2");

  playerBoard.placeShip(2, 9, 4, "v", "l1");

  computerBoard.placeShip(2, 2, 1, "v", "s1");
  computerBoard.placeShip(2, 4, 1, "v", "s2");
  computerBoard.placeShip(2, 6, 1, "v", "s3");
  computerBoard.placeShip(2, 8, 1, "v", "s4");

  computerBoard.placeShip(8, 6, 2, "v", "m1");
  computerBoard.placeShip(6, 9, 2, "v", "m2");
  computerBoard.placeShip(4, 2, 2, "h", "m3");

  computerBoard.placeShip(4, 5, 3, "h", "b1");
  computerBoard.placeShip(6, 4, 3, "h", "b2");

  computerBoard.placeShip(6, 2, 4, "v", "l1");

  playerBoard.print();
  computerBoard.print(computer, player, playerBoard);

  playerBoard.displayShips();
  playerBoard.makeCellsHelpDrag("playerBoard");
  stuff = [];
  stuff.push(player);
  stuff.push(playerBoard);
  stuff.push(computer);
  stuff.push(computerBoard);
  console.log(stuff);
  return stuff;
}

preset();

function game(player, playerBoard, computer) {
  while (computer.turn) {
    let move = computer.firstComputerAttack(player, playerBoard);
    let xc = move[0];
    let yc = move[1];
    const explosion = document.createElement("img");
    explosion.src = "./bomb.svg";
    explosion.classList.add("explosion");
    document
      .querySelector(
        `.${playerBoard.name} [data-row="${xc}"][data-column="${yc}"]`
      )
      .appendChild(explosion);
  }
}

export { preset, game, stuff };
