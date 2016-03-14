define(function(require) {
    var trainingMain = require('game/views/training'),
        timeAttackMain = require('game/views/timeAttack')
    return {
      training: trainingMain,
      timeAttack: timeAttackMain
    }
});
