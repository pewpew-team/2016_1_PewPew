define(function(require) {
  var Backbone = require('backbone');

  var Booster = Backbone.Model.extend({
    initialize: function(posX, posY) {
      this.set({
        'posX': posX,
        'posY': posY
      });
      this.generateRandomType();
    },
    apply: function() {
      // TODO
    }
    generateRandomType() {
      // TODO
    }

  })
})
