require('../src/game.js');
const expect = require('expect');

describe("The test environment", function() {
  it("should pass", function() {
    expect(true).toBe(true);
  });

  it("should access game", function() {
    expect(Game).toExist();
  });
});

describe("Your specs...", function() {
  // it ...
});
