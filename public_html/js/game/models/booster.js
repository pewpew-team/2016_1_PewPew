define(function(require) {
  var Backbone = require('backbone');

  var Booster = Backbone.Model.extend({
    /**
     *  Initialize random booster
     *  @param {!numbe} posX - Initial position in X direction
     *  @param {!number} posY - Initial position in Y direction
     *  @param {!number} maxLifeTime - Maximum time of booster life
     *  @param {!number} _radius - Booster representation radius
     */
    initialize: function() {
      this.generateRandomType();
    },
    apply: function(player, bulletsCollection) {
      switch (this.get('type')) {
        case 1:
          player.speedUpPlayer();
          break;
        case 2:
          player.speedUpBullets();
          break;
        case 3:
          bulletsCollection.incSize();
          break;
      }
      this.trigger('apply', this.get('type'));
    },
    generateRandomType: function() {
      // Speed up player type = 1
      // Speed up bullets type = 2
      // Big bullets = 3
      var MAX = 3;
      var randomType = 1 + Math.random() * (MAX - 1);
      this.set('type', Math.round(randomType));
    }

  });
  return Booster;
});
