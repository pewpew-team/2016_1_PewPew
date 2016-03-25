define(function(require) {
  var Backbone = require('backbone');

  var Booster = Backbone.Model.extend({
    /**
     *  Initialize random booster
     *  @param {!numbe} posX - Initial position in X direction
     *  @param {!number} posY - Initial position in Y direction
     *  @param {!number} maxLifeTime - Maximum time of booster life
     */
    initialize: function(posX, posY, radius, maxLifeTime) {
      this.set({
        'posX': posX,
        'posY': posY,
        'startLifeTime': Date.now(),
        'maxLifeTime': maxLifeTime,
        'radius': radius
      });
      this.generateRandomType();
    },
    apply: function() {
      // TODO
    },
    generateRandomType() {
      // Speed up player type = 1
      // Speed up bullets type = 2
      // Crazy shooting type = 3
      // Big bullets = 4
      var MAX = 4;
      var randomType = 1 + Math.random() * (MAX - 1)
      this.set('type', Math.round(randomType));
    }

  })
  return Booster;
})
