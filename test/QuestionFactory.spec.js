require('../src/QuestionFactory.js');
const expect = require('expect');

describe("An accepted question factory", function() {

  it("should return question to ask for place", function () {
    var factory = questionFactory();
    expect(factory.forPlace(0)).toBe("Pop Question 0");
    expect(factory.forPlace(1)).toBe("Science Question 0");
    expect(factory.forPlace(2)).toBe("Sports Question 0");
    expect(factory.forPlace(3)).toBe("Rock Question 0");
  });
});
