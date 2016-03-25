define(function(require) {
  var Backbone = require('backbone'),
      Booster = require('game/models/booster'),
      _ = require('underscore');

  var BarrierCollection = Backbone.Collection.extend({
          model: Booster,
          deleteOld: function() {
            var oldBoosters = this.filter(function (booster) {
              var currentTime = Date.now();
              return (currentTime - booster.get('startLifeTime'))
                            > booster.get('maxLifeTime');
            }.bind(this));
            this.remove(oldBoosters);
          },
          iterate: function(player) {
            this.deleteOld();
            var crossedBoosters = this.filter(function (booster) {
              var distance = Math.abs(booster.get('posX') - this.get('positionX')),
                  criticalDistance = booster.get('radius') + this.get('sizeX')/2;
              return istance < criticalDistance;
            }.bind(player));
            _.each(crossedBoosters, function(booster) {
              booster.apply();
            })
          }
      });
  return new BoosterCollection();
});
