define(function(require) {
      var Backbone = require('backbone'),
          bulletCollection = require('game/collections/bulletCollection'),
          screenModel = require('models/game'),
          $ = require('jquery'),
          socket = require('game/models/socket');

      var Enemy = Backbone.Model.extend({
          defaults: {
              gunLength: 50,
              bulletSpeed: 15,
              minPositionX: 0,
              playerSizeX: 80,
              playerSizeY: 50,
              maxVelocity: 17,
              gunAngle: Math.PI/2
          },
          initialize: function() {
              this.set({
                  'positionX': screenModel.get("baseWidth")/2,
                  'maxPositionX': screenModel.get("baseWidth"),
                  'currentPointerX': screenModel.get("baseWidth")/2,
                  'currentPointerY': screenModel.get("baseHeight")/2,
                  'positionY': this.get('playerSizeY') / 2,
                  'minLevelPointer': 0,
                  'arrDirections': [],
                  'velocity': 0,
                  'maxLevelPointer': screenModel.get("baseHeight") * 2 / 3
              });
          },
          getAngle : function () {
              return Math.atan2(this.get('currentPointerY') - this.get('positionY'), this.get('currentPointerX') - this.get('positionX'));
          },
          getCurrentDirection: function() {
            if (this.get('velocity') > 0) {
              return 1;
            }
            if (this.get('velocity') < 0) {
              return -1;
            }
            if (this.get('velocity') === 0) {
              return 0;
            }
          },
          updateFromWS: function(event) {
            var data = JSON.parse(event.data);
            if(data.enemy) {
              this.set({
                'positionX': data.enemy.posX,
                'gunAngle': data.enemy.gunAngle
              });
            }
          },
          checkPlayerCollision: function() {
              bulletCollection.each(function(bullet) {
                  var leftPlayerEdge = this.get('positionX') - this.get('playerSizeX')/2,
                      rightPlayerEdge = this.get('positionX') + this.get('playerSizeX')/2,
                      bottomPlayerEdge = this.get('positionY') + this.get('playerSizeY')/2,
                      topPlayerEdge = this.get('positionY') - this.get('playerSizeY')/2;
                  if ( bullet.get('posX') < rightPlayerEdge && bullet.get('posX') > leftPlayerEdge &&
                      bullet.get('posY') < bottomPlayerEdge && bullet.get('posY') > topPlayerEdge ) {
                      socket.send(JSON.stringify({enemyKilled: true}));
                  }
              }.bind(this));
          }
          });
      return Enemy;
  }
);
