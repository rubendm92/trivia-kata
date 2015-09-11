require('../src/game.js');
const expect = require('expect');

describe("An accepted trivia game", function() {

  it("should return true when player answers question correctly but did not win the game", function() {
    var game = new Game();
    game.add("Ruben");
    expect(game.wasCorrectlyAnswered()).toBe(true);
  });

  it("should return false when player answers question correctly and won the game by answering correctly six questions", function () {
    var game = new Game();
    game.add("Ruben");
    firstFiveCallsReturnTrue();
    expect(game.wasCorrectlyAnswered()).toBe(false);


    function firstFiveCallsReturnTrue() {
      for (var i = 0; i < 5; i++)
        expect(game.wasCorrectlyAnswered()).toBe(true);
    }
  });

  it("should return true when player is added and print in console name of player and number of players", function () {
    var printedValues = [];
    console.log = function(content) {
      printedValues.push(content);
    };
    var game = new Game();
    expect(game.add("Ruben")).toBe(true);
    expect(printedValues[0]).toBe("Ruben was added");
    expect(printedValues[1]).toBe("They are player number 1");
  });

  it("should print question category", function () {
    var printedValues = [];
    console.log = function(content) {
      printedValues.push(content);
    };
    var game = new Game();
    game.add("Ruben");
    var categories = ["Pop", "Science", "Sports", "Rock"];
    for (var i = 1; i < 13; i++) {
      game.roll(1);
      expect(printedValues[5 * i]).toBe("The category is " + categories[i % 4]);
    }
  });
});
