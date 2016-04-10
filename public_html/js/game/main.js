define(function(require) {
    var trainingMain = require('game/views/training'),
        timeAttackMain = require('game/views/timeAttack'),
        multiplayer = require('game/views/multiplayer');
    return {
        training: trainingMain,
        timeAttack: timeAttackMain,
        multiplayer: multiplayer
  };
});
