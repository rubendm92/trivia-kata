exports = typeof window !== "undefined" && window !== null ? window : global;
require('./QuestionFactory.js');
require('./Player.js');

exports.Game = function() {
  const pursesToWin = 6;
  const numberOfPlaces = 12;
  var players = [];
  var places = [];
  var questions = questionFactory();

  var currentPlayer = 0;
  var isGettingOutOfPenaltyBox = false;

  var didPlayerWin = function() {
    return !(players[currentPlayer].purses() == pursesToWin)
  };

  var currentPlayerPosition = function() {
    return places[currentPlayer];
  };

  var nextPlayer = function() {
    currentPlayer = (currentPlayer + 1) % players.length;
  };

  var printQuestionWasCorrectlyAnswer = function() {
    console.log("Answer was correct!!!!");
    console.log(players[currentPlayer].name() + " now has " + players[currentPlayer].purses()  + " Gold Coins.");
  };

  var canGetOutOfPenaltyBox = function(roll) {
    return roll % 2 != 0;
  };

  var leavePenaltyBox = function() {
    isGettingOutOfPenaltyBox = true;
    players[currentPlayer].leavesPenaltyBox();
  };

  var updatePlayerPosition = function(roll) {
    places[currentPlayer] = (places[currentPlayer] + roll) % numberOfPlaces;
    console.log(players[currentPlayer].name() + "'s new location is " + places[currentPlayer]);
  };

  this.isPlayable = function(howManyPlayers) {
    return howManyPlayers >= 2;
  };

  this.add = function(playerName) {
    players.push(player(playerName));
    places[this.howManyPlayers() - 1] = 0;

    console.log(playerName + " was added");
    console.log("They are player number " + players.length);

    return true;
  };

  this.howManyPlayers = function() {
    return players.length;
  };

  this.roll = function(roll) {
    console.log(players[currentPlayer].name() + " is the current player");
    console.log("They have rolled a " + roll);

    if(players[currentPlayer].isInPenaltyBox()) {
      if(!canGetOutOfPenaltyBox(roll)) {
        console.log(players[currentPlayer].name() + " is not getting out of the penalty box");
        isGettingOutOfPenaltyBox = false;
        return;
      }else
        leavePenaltyBox();
    }
    updatePlayerPosition(roll);
    questions.askQuestionForPlace(currentPlayerPosition());
  };

  this.wasCorrectlyAnswered = function() {
    if(players[currentPlayer].isInPenaltyBox() && !isGettingOutOfPenaltyBox) {
      nextPlayer();
      return true;
    }
    players[currentPlayer].gotOnePurse();
    printQuestionWasCorrectlyAnswer();
    var winner = didPlayerWin();
    nextPlayer();
    return winner;
  };

  this.wrongAnswer = function() {
		console.log('Question was incorrectly answered');
		players[currentPlayer].goToPenaltyBox();
    nextPlayer();
		return true;
  };
};
