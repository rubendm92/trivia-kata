require('../src/game.js');
const expect = require('expect');

describe("An accepted trivia game", function() {

  it("should return true when player answers question correctly but did not win the game", function() {
    var game = new Game();
    game.add("Ruben");
    expect(game.wasCorrectlyAnswered()).toBe(true);
  });
});
