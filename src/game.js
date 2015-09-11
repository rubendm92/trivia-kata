exports = typeof window !== "undefined" && window !== null ? window : global;
require('./QuestionFactory.js');

exports.Game = function() {
  const pursesToWin = 6;
  const numberOfPlaces = 12;
  var players = [];
  var places = [];
  var purses = [];
  var inPenaltyBox = [];
  var questions = questionFactory();

  var currentPlayer = 0;
  var isGettingOutOfPenaltyBox = false;

  var didPlayerWin = function() {
    return !(purses[currentPlayer] == pursesToWin)
  };

  var currentPlayerPosition = function() {
    return places[currentPlayer];
  };

  var nextPlayer = function() {
    currentPlayer = (currentPlayer + 1) % players.length;
  };

  var printQuestionWasCorrectlyAnswer = function() {
    console.log("Answer was correct!!!!");
    console.log(players[currentPlayer] + " now has " + purses[currentPlayer]++  + " Gold Coins.");
  };

  var canGetOutOfPenaltyBox = function(roll) {
    return roll % 2 != 0;
  };

  var leavePenaltyBox = function() {
    isGettingOutOfPenaltyBox = true;
    console.log(players[currentPlayer] + " is getting out of the penalty box");
  };

  var updatePlayerPosition = function(roll) {
    places[currentPlayer] = (places[currentPlayer] + roll) % numberOfPlaces;
    console.log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
  };

  this.isPlayable = function(howManyPlayers) {
    return howManyPlayers >= 2;
  };

  this.add = function(playerName) {
    players.push(playerName);
    places[this.howManyPlayers() - 1] = 0;
    purses[this.howManyPlayers() - 1] = 0;
    inPenaltyBox[this.howManyPlayers() - 1] = false;

    console.log(playerName + " was added");
    console.log("They are player number " + players.length);

    return true;
  };

  this.howManyPlayers = function() {
    return players.length;
  };

  this.roll = function(roll) {
    console.log(players[currentPlayer] + " is the current player");
    console.log("They have rolled a " + roll);

    if(inPenaltyBox[currentPlayer]) {
      if(!canGetOutOfPenaltyBox(roll)) {
        console.log(players[currentPlayer] + " is not getting out of the penalty box");
        isGettingOutOfPenaltyBox = false;
        return;
      }else
        leavePenaltyBox();
    }
    updatePlayerPosition(roll);
    questions.askQuestionForPlace(currentPlayerPosition());
  };

  this.wasCorrectlyAnswered = function() {
    if(inPenaltyBox[currentPlayer] && !isGettingOutOfPenaltyBox) {
      nextPlayer();
      return true;
    }
    printQuestionWasCorrectlyAnswer();
    var winner = didPlayerWin();
    nextPlayer();
    return winner;
  };

  this.wrongAnswer = function() {
		console.log('Question was incorrectly answered');
		console.log(players[currentPlayer] + " was sent to the penalty box");
		inPenaltyBox[currentPlayer] = true;
    nextPlayer();
		return true;
  };
};
