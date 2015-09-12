require('../src/Player.js');
const expect = require('expect');

describe("An accepted player", function() {

  var p;

  beforeEach(function() {
    p = player("Ruben");
  });

  it("should have a name", function () {
    expect(p.name()).toBe("Ruben");
  });

  it("should have number of purses obtained", function () {
    expect(p.purses()).toBe(0);
    p.gotOnePurse();
    expect(p.purses()).toBe(1);
  });

  it("could go and leave penalty box", function () {
    expect(p.isInPenaltyBox()).toBe(false);
    p.goToPenaltyBox();
    expect(p.isInPenaltyBox()).toBe(true);
    p.leavesPenaltyBox();
    expect(p.isInPenaltyBox()).toBe(false);
  });

  it("should know his current place", function () {
    expect(p.currentPlace()).toBe(0);
    p.goTo(3);
    expect(p.currentPlace()).toBe(3);
  });
});
