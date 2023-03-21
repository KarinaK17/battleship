import { Ship, Gameboard, Player } from "./logic";

test("The placeShip function changes the state of the cell of the gamedoard from '' to 'ship object'. Test vertical ship.", () => {
  let gameboard1 = new Gameboard();
  gameboard1.placeShip(2, 5, 2, "v");
  expect(gameboard1.row2[4]).toEqual({
    length: 2,
    position: "v",
    sunk: false,
    timesHit: 0,
    row: 2,
    column: 5,
  });
  expect(gameboard1.row3[4]).toEqual({
    length: 2,
    position: "v",
    sunk: false,
    timesHit: 0,
    row: 2,
    column: 5,
  });
});

test("The placeShip function changes the state of the cell of the gamedoard from '' to 'ship object'. Test horizontal ship.", () => {
  let gameboard1 = new Gameboard();
  gameboard1.placeShip(4, 1, 2, "h");
  expect(gameboard1.row4[0]).toEqual({
    length: 2,
    position: "h",
    sunk: false,
    timesHit: 0,
    row: 4,
    column: 1,
  });
  expect(gameboard1.row4[1]).toEqual({
    length: 2,
    position: "h",
    sunk: false,
    timesHit: 0,
    row: 4,
    column: 1,
  });
});

test("The placeShip function throws error if ship is placed incorrectly. Test vertical ship", () => {
  let gameboard1 = new Gameboard();
  expect(() => gameboard1.placeShip(10, 1, 2, "v")).toThrow(
    "Cannot place a ship here"
  );
});

test("The placeShip function throws error if ship is placed incorrectly. Test horizontal ship", () => {
  let gameboard1 = new Gameboard();
  expect(() => gameboard1.placeShip(1, 10, 2, "h")).toThrow(
    "Cannot place a ship here"
  );
});

test("The placeShip function adds the ship to the ships array.", () => {
  let gameboard1 = new Gameboard();
  gameboard1.placeShip(2, 5, 2, "h");
  expect(gameboard1.ships).toEqual([
    {
      length: 2,
      position: "h",
      sunk: false,
      timesHit: 0,
      row: 2,
      column: 5,
    },
  ]);
});

// test("The placeShip function doesn't add the ship to the ships array if ship is placed incorrectly", () => {
//   let gameboard1 = new Gameboard();
//   gameboard1.placeShip(10, 5, 2, "v");
//   expect(gameboard1.ships).toEqual([]);
// });

test("The receiveAttack function changes the state of the cell of the gamedoard from '' to 'missed attack'.", () => {
  let gameboard1 = new Gameboard();
  gameboard1.receiveAttack(1, 1);
  expect(gameboard1.row1[0]).toBe("missed attack");
});

test("The receiveAttack function changes the number of times a ship is hit.", () => {
  let gameboard1 = new Gameboard();
  gameboard1.placeShip(2, 5, 2, "v");
  gameboard1.receiveAttack(2, 5);
  expect(gameboard1.row2[4]).toEqual({
    length: 2,
    position: "v",
    sunk: false,
    timesHit: 1,
    row: 2,
    column: 5,
  });
  expect(gameboard1.row3[4]).toEqual({
    length: 2,
    position: "v",
    sunk: false,
    timesHit: 1,
    row: 2,
    column: 5,
  });
});

test("The receiveAttack function sinks a boat with length 2 after 2 attacks", () => {
  let gameboard1 = new Gameboard();
  gameboard1.placeShip(2, 5, 2, "v");
  gameboard1.receiveAttack(2, 5);
  gameboard1.receiveAttack(3, 5);
  expect(gameboard1.row2[4]).toEqual({
    length: 2,
    position: "v",
    sunk: true,
    timesHit: 2,
    row: 2,
    column: 5,
  });
  expect(gameboard1.row3[4]).toEqual({
    length: 2,
    position: "v",
    sunk: true,
    timesHit: 2,
    row: 2,
    column: 5,
  });
});

test("Gameboard knows if all its ships sunk. All sank.", () => {
  let gameboard1 = new Gameboard();
  gameboard1.placeShip(2, 5, 2, "v");
  gameboard1.receiveAttack(2, 5);
  gameboard1.receiveAttack(3, 5);

  gameboard1.placeShip(1, 2, 2, "h");
  gameboard1.receiveAttack(1, 2);
  gameboard1.receiveAttack(1, 3);
  expect(gameboard1.allSunk()).toBe(true);
});

test("Gameboard knows if all its ships sunk. Not all sank.", () => {
  let gameboard1 = new Gameboard();
  gameboard1.placeShip(2, 5, 2, "v");
  gameboard1.receiveAttack(2, 5);
  gameboard1.receiveAttack(3, 5);

  gameboard1.placeShip(1, 2, 2, "h");
  gameboard1.receiveAttack(1, 2);
  gameboard1.receiveAttack(7, 3);
  expect(gameboard1.allSunk()).toBe(false);
});

test("Player can attack enemy's board. Player misses.", () => {
  let gameboard1 = new Gameboard();
  let enemyBoard = new Gameboard();

  let player1 = new Player("me", true);
  let enemy = new Player("e", false);

  enemyBoard.placeShip(2, 5, 2, "v");
  player1.attack(1, 5, enemy, enemyBoard);

  expect(player1.turn).toBe(false);
  expect(enemy.turn).toBe(true);
  expect(enemyBoard.row1[4]).toBe("missed attack");
});

test("Player can attack enemy's board. Player attacks the ship.", () => {
  let gameboard1 = new Gameboard();
  let enemyBoard = new Gameboard();

  let player1 = new Player("me", true);
  let enemy = new Player("e", false);

  enemyBoard.placeShip(2, 5, 2, "v");
  player1.attack(2, 5, enemy, enemyBoard);

  expect(player1.turn).toBe(true);
  expect(enemy.turn).toBe(false);
  expect(enemyBoard.row2[4]).toEqual({
    length: 2,
    position: "v",
    sunk: false,
    timesHit: 1,
    row: 2,
    column: 5,
  });
});
