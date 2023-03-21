class Ship {
  constructor(length, position, row, column, name) {
    this.length = length;
    this.position = position;
    this.timesHit = 0;
    this.sunk = false;
    this.row = row;
    this.column = column;
    this.name = name;
  }
  hit() {
    this.timesHit++;
  }
  isSunk() {
    if (this.timesHit === this.length) {
      this.sunk = true;
    }
  }
}

class Gameboard {
  constructor(name) {
    this.name = name;
    this.row1 = ["", "", "", "", "", "", "", "", "", ""];
    this.row2 = ["", "", "", "", "", "", "", "", "", ""];
    this.row3 = ["", "", "", "", "", "", "", "", "", ""];
    this.row4 = ["", "", "", "", "", "", "", "", "", ""];
    this.row5 = ["", "", "", "", "", "", "", "", "", ""];
    this.row6 = ["", "", "", "", "", "", "", "", "", ""];
    this.row7 = ["", "", "", "", "", "", "", "", "", ""];
    this.row8 = ["", "", "", "", "", "", "", "", "", ""];
    this.row9 = ["", "", "", "", "", "", "", "", "", ""];
    this.row10 = ["", "", "", "", "", "", "", "", "", ""];

    this.ships = [];
  }

  placeShip(x, y, length, position, name) {
    let ship = new Ship(length, position, x, y, name);
    let xCoor = "row".concat(x);
    if (position == "h") {
      for (let i = 1; i <= length; i++) {
        if (y > 10 || x > 10 || y < 1 || x < 1) {
          throw new Error("Cannot place a ship here");
        }
        this[xCoor][y - 1] = ship;
        y++;
      }
    } else {
      for (let i = 1; i <= length; i++) {
        console.log("times");
        if (y > 10 || x > 10 || y < 1 || x < 1) {
          throw new Error("Cannot place a ship here");
        }
        console.log(this[xCoor]);
        this[xCoor][y - 1] = ship;
        x++;
        xCoor = "row".concat(x);
      }
    }
    this.ships.push(ship);
  }

  deleteShip(x, y, length, position, name) {
    this.ships.forEach((ship) => {
      if (ship.name == name) {
        let index = this.ships.indexOf(ship);
        this.ships.splice(index, 1);
      }
    });

    let xCoor = "row".concat(x);
    if (position == "h") {
      for (let i = 1; i <= length; i++) {
        this[xCoor][y - 1] = "";
        y++;
      }
    } else {
      for (let i = 1; i <= length; i++) {
        this[xCoor][y - 1] = "";
        x++;
        xCoor = "row".concat(x);
      }
    }
  }

  receiveAttack(x, y) {
    let xCoor = "row".concat(x);
    if (this[xCoor][y - 1] == "") {
      this[xCoor][y - 1] = "missed attack";
      return false;
    } else {
      this[xCoor][y - 1].hit();
      this[xCoor][y - 1].isSunk();
      return true;
    }
  }

  allSunk() {
    const issunk = (obj) => obj.sunk == true;
    console.log(this.ships);
    return this.ships.every(issunk);
  }
}

class Player {
  constructor(name, turn) {
    this.name = name;
    this.turn = turn;
    this.attacks = [];
  }
  attack(x, y, enemy, enemyBoard) {
    if (!enemyBoard.receiveAttack(x, y)) {
      this.turn = false;
      enemy.turn = true;
      return false;
    } else {
      this.turn = true;
      enemy.turn = false;
      return true;
    }
  }

  firstComputerAttack(enemy, enemyBoard) {
    let a = Math.ceil(Math.random() * 10);
    let b = Math.ceil(Math.random() * 10);
    let arr = [];
    arr.push(a);
    arr.push(b);
    console.log(arr, "first move arr");
    this.attacks.push(arr);
    this.attack(a, b, enemy, enemyBoard);
    return arr;
  }

  computerAttack(enemy, enemyBoard) {
    let a = Math.ceil(Math.random() * 10);
    let b = Math.ceil(Math.random() * 10);
    let arr = [];
    arr.push(a);
    arr.push(b);
    console.log(arr, "first arr");

    const check = (arr, a, b) => {
      for (let i = 0; i < this.attacks.length; i++) {
        console.log(this.attacks, "first");
        if (
          this.attacks[i] == undefined ||
          (this.attacks[i][0] == a && this.attacks[i][1] == b)
        ) {
          a = Math.ceil(Math.random() * 10);
          b = Math.ceil(Math.random() * 10);
          arr = [];
          arr.push(a);
          arr.push(b);
          console.log(arr, "second arr");
          check(arr, a, b);
        } else {
          console.log(this.attacks, "second");
          if (i == this.attacks.length - 1) return arr;
        }
      }
    };
    this.attacks.push(check(arr, a, b));
    let al = this.attacks.length;
    let coordinates = [];
    coordinates.push(this.attacks[al - 1][0]);
    coordinates.push(this.attacks[al - 1][1]);
    console.log(arr, "last arr", this.attacks, "last attacks");
    this.attack(
      this.attacks[al - 1][0],
      this.attacks[al - 1][1],
      enemy,
      enemyBoard
    );
    return coordinates;
  }
}

export { Ship, Gameboard, Player };
