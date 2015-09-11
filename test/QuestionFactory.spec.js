require('../src/QuestionFactory.js');
const expect = require('expect');

describe("An accepted question factory", function() {

  it("should ask question for place", function () {
    var questions = questionFactory();
    var printedValues = [];
    console.log = function(content) {
      printedValues.push(content);
    };
    expect(questions.askQuestionForPlace(0)).toBe("Pop Question 0");
    expect(printedValues[0]).toBe("The category is Pop");
    expect(questions.askQuestionForPlace(1)).toBe("Science Question 0");
    expect(printedValues[1]).toBe("The category is Science");
    expect(questions.askQuestionForPlace(2)).toBe("Sports Question 0");
    expect(printedValues[2]).toBe("The category is Sports");
    expect(questions.askQuestionForPlace(3)).toBe("Rock Question 0");
    expect(printedValues[3]).toBe("The category is Rock");
  });
});
