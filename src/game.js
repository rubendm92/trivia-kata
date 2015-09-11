exports = typeof window !== "undefined" && window !== null ? window : global;
require('./QuestionFactory.js');

exports.Game = function() {
  var players = [];
  var places = new Array(6);
  var purses = new Array(6);
  var inPenaltyBox = new Array(6);
  var questions = questionFactory();

  var currentPlayer = 0;
  var isGettingOutOfPenaltyBox = false;

  var didPlayerWin = function() {
    return !(purses[currentPlayer] == 6)
  };

  var currentPlayerPosition = function() {
    return places[currentPlayer];
  }

  var nextPlayer = function() {
    currentPlayer = (currentPlayer + 1) % players.length;
  }

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

  var askQuestion = function() {
    console.log(questions.forPlace(currentPlayerPosition()));
  };

  this.roll = function(roll) {
    console.log(players[currentPlayer] + " is the current player");
    console.log("They have rolled a " + roll);

    if(inPenaltyBox[currentPlayer]) {
      if(roll % 2 != 0) {
        isGettingOutOfPenaltyBox = true;

        console.log(players[currentPlayer] + " is getting out of the penalty box");
        places[currentPlayer] = places[currentPlayer] + roll;
        if(places[currentPlayer] > 11) {
          places[currentPlayer] = places[currentPlayer] - 12;
        }

        console.log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
        console.log("The category is " + questions.categoryForPlace(currentPlayerPosition()));
        askQuestion();
      }else{
        console.log(players[currentPlayer] + " is not getting out of the penalty box");
        isGettingOutOfPenaltyBox = false;
      }
    }else{

      places[currentPlayer] = places[currentPlayer] + roll;
      if(places[currentPlayer] > 11) {
        places[currentPlayer] = places[currentPlayer] - 12;
      }

      console.log(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
      console.log("The category is " + questions.categoryForPlace(currentPlayerPosition()));
      askQuestion();
    }
  };

  this.wasCorrectlyAnswered = function() {
    if(inPenaltyBox[currentPlayer]) {
      if(isGettingOutOfPenaltyBox) {
        console.log('Answer was correct!!!!');
        purses[currentPlayer] += 1;
        console.log(players[currentPlayer] + " now has " +
                    purses[currentPlayer]  + " Gold Coins.");

        var winner = didPlayerWin();
        nextPlayer();
        return winner;
      }else{
        nextPlayer();
        return true;
      }



    }else{

      console.log("Answer was correct!!!!");

      purses[currentPlayer] += 1;
      console.log(players[currentPlayer] + " now has " +
                  purses[currentPlayer]  + " Gold Coins.");

      var winner = didPlayerWin();
      nextPlayer();
      return winner;
    }
  };

  this.wrongAnswer = function() {
		console.log('Question was incorrectly answered');
		console.log(players[currentPlayer] + " was sent to the penalty box");
		inPenaltyBox[currentPlayer] = true;
    nextPlayer();
		return true;
  };
};

var notAWinner = false;

var game = new Game();

game.add('Chet');
game.add('Pat');
game.add('Sue');

do{

  game.roll(Math.floor(Math.random()*6) + 1);

  if(Math.floor(Math.random()*10) == 7) {
    notAWinner = game.wrongAnswer();
  }else{
    notAWinner = game.wasCorrectlyAnswered();
  }

}while(notAWinner);
