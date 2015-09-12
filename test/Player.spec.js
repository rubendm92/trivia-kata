require('../src/Player.js');
const expect = require('expect');

describe("An accepted player", function() {

  it("should have a name", function () {
    var p = player("Ruben");
    expect(p.name()).toBe("Ruben");
  });

  it("should have number of purses obtained", function () {
    var p = player("Ruben");
    expect(p.purses()).toBe(0);
    p.gotOnePurse();
    expect(p.purses()).toBe(1);
  });

  it("could go and leave penalty box", function () {
    var p = player("Ruben");
    expect(p.isInPenaltyBox()).toBe(false);
    p.goToPenaltyBox();
    expect(p.isInPenaltyBox()).toBe(true);
    p.leavesPenaltyBox();
    expect(p.isInPenaltyBox()).toBe(false);
  });
});
