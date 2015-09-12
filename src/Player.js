exports = typeof window !== "undefined" && window !== null ? window : global;

exports.player = function(name) {
  var self = {},
      purses = 0,
      isInPenaltyBox = false;

  self.name = function() {
    return name;
  }

  self.gotOnePurse = function() {
    purses++;
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

  return self;
}
