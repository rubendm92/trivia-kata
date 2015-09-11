require('../src/game.js');
const expect = require('expect');

describe("An accepted trivia game", function() {

  var game;

  beforeEach(function() {
    game = new Game();
  });

  it("should return true when player answers question correctly but did not win the game", function() {
    expect(game.wasCorrectlyAnswered()).toBe(true);
  });

  it("should return false when player answers question correctly and won the game by answering correctly six questions", function () {
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
    expect(game.add("Ruben")).toBe(true);
    expect(printedValues[0]).toBe("Ruben was added");
    expect(printedValues[1]).toBe("They are player number 1");
  });

  it("should send player to penalty box when fails a question", function () {
    game.add("Ruben");
    var printedValues = [];
    console.log = function(content) {
      printedValues.push(content);
    };
    game.wrongAnswer();
    expect(printedValues[1]).toBe("Ruben was sent to the penalty box");
  });

  it("should keep player in penalty box when roll value is pair", function () {
    game.add("Ruben");
    playerFallsInPenaltyBox();
    var printedValues = [];
    console.log = function(content) {
      printedValues.push(content);
    };
    game.roll(2);
    expect(printedValues[2]).toBe("Ruben is not getting out of the penalty box");

    function playerFallsInPenaltyBox() {
      game.wrongAnswer();
    }
  });

  it("should return true without printing anything when player in penalty box answer correctly", function () {
    game.add("Ruben");
    playerFallsInPenaltyBox();
    playerStaysInPenaltyBoxAfterRoll();
    var printedValues = [];
    console.log = function(content) {
      printedValues.push(content);
    };
    expect(game.wasCorrectlyAnswered()).toBe(true);
    expect(printedValues.length).toBe(0);

    function playerFallsInPenaltyBox() {
      game.wrongAnswer();
    }

    function playerStaysInPenaltyBoxAfterRoll() {
      game.roll(2);
    }
  });

  it("should change player when question is answered", function () {
    game.add("Ruben");
    game.add("Belen");
    var printedValues = [];
    console.log = function(content) {
      printedValues.push(content);
    };
    game.wrongAnswer();
    game.wrongAnswer();
    expect(printedValues[1]).toBe("Ruben was sent to the penalty box");
    expect(printedValues[3]).toBe("Belen was sent to the penalty box");
  });
});
