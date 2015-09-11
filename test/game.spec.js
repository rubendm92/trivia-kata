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
});
