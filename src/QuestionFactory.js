exports = typeof window !== "undefined" && window !== null ? window : global;

exports.questionFactory = function() {
  const questions = {Pop: [], Science: [], Sports: [], Rock: []};
  var self = {};

  for (var i = 0; i < 50; i++){
    questions.Pop.push("Pop Question " + i);
    questions.Science.push("Science Question " + i);
    questions.Sports.push("Sports Question " + i);
    questions.Rock.push("Rock Question " + i);
  };

  self.askQuestionForPlace = function(place) {
    console.log("The category is " + categoryForPlace(place));
    return questions[categoryForPlace(place)].shift();
  }

  var categoryForPlace = function(place) {
    return Object.keys(questions)[place % Object.keys(questions).length];
  };

  return self;
};
