exports = typeof window !== "undefined" && window !== null ? window : global;

exports.player = function(name) {
  var self = {},
      purses = 0;

  self.name = function() {
    return name;
  }

  self.gotOnePurse = function() {
    purses++;
  }

  self.purses = function() {
    return purses;
  }

  return self;
}
