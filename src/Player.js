exports = typeof window !== "undefined" && window !== null ? window : global;

exports.player = function(name) {
  var self = {},
      purses = 0,
      isInPenaltyBox = false,
      place = 0;

  self.name = function() {
    return name;
  }

  self.gotOnePurse = function() {
    purses++;
    console.log(name + " now has " + purses  + " Gold Coins.");
  }

  self.purses = function() {
    return purses;
  }

  self.goToPenaltyBox = function() {
    isInPenaltyBox = true;
    console.log(name + " was sent to the penalty box");
  }

  self.leavesPenaltyBox = function() {
    isInPenaltyBox = false;
    console.log(name + " is getting out of the penalty box");
  }

  self.isInPenaltyBox = function() {
    return isInPenaltyBox;
  }

  self.goTo = function(newPlace) {
    place = newPlace;
    console.log(name + "'s new location is " + place);
  }

  self.currentPlace = function() {
    return place;
  }

  return self;
}
