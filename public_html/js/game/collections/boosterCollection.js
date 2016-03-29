define(function(require) {
  var Backbone = require('backbone'),
      Booster = require('game/models/booster'),
      bulletsCollection = require('game/collections/bulletCollection'),
      _ = require('underscore');

  var BoosterCollection = Backbone.Collection.extend({
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
                  criticalDistance = booster.get('radius') + this.get('playerSizeX')/2;
              return distance < criticalDistance;
            }.bind(player));
            _.each(crossedBoosters, function(booster) {
              booster.apply(player, bulletsCollection);
            })
            this.remove(crossedBoosters);
          },
          createRandom: function(height, width) {
            var BOOSTER_LIFE = 10*1000,
                RADIUS = 20,
                posY = Math.round(height - RADIUS-10),
                posX = Math.round(RADIUS + Math.random() * (width - 2*RADIUS)),
                booster = new Booster({
                  'posX': posX,
                  'posY': posY,
                  'startLifeTime': Date.now(),
                  'maxLifeTime': BOOSTER_LIFE,
                  'radius': RADIUS
                });
            this.add(booster);
          }
      });
  return new BoosterCollection();
});
