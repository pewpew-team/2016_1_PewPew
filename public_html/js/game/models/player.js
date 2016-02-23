define(
    ['backbone', 'game/collections/bulletCollection'],
  function() {
      var Backbone = require('backbone');
      var bulletCollection = require('game/collections/bulletCollection');

      var Player = Backbone.Model.extend({
          defaults: {
              minAngle: 20,
              playerSizeX: 60,
              playerSizeY: 20,
              gunLength: 40,
              velX: 0,
              maxVel: 10,
              bulletSpeed: 5
          },
          initialize: function(nick, canvas) {
              this.set({
                  'nickname': nick,
                  'canvas': canvas,
                  'position': canvas.width/2,
                  'gunAngle': 0
              });
          },
          sync: function() {
              // TODO отправка данный через web socket
          },
          moveLeft: function() {
              this.set('velX', -5);
          },
          moveRight: function() {
              this.set('velX', 5);
          },
          pointGunTo: function(x, y) {
              var posX = this.get('position');
              var posY = this.get('canvas').height;
              var angle = Math.atan2(y-posY, x-posX);
              var angleInDeg = -1*angle/Math.PI*180;
              var minAngle = this.get('minAngle');
              if (angleInDeg > minAngle && angleInDeg < (180-minAngle)) {
                  this.set('gunAngle', angle);
              }
          },
          iterate: function() {
              var velX = this.get('velX');
              var posX = this.get('position');
              var sizeX = this.get('playerSizeX');
              var maxPos = this.get('canvas').width - sizeX/2;
              posX+=velX;
              if (posX >= sizeX/2 && posX <= maxPos) {
                  this.set('position', posX);
              } else {
                  this.set('velX', 0);
              }
          },
          shoot: function () {
              var angle = this.get('gunAngle');
              var V = this.get('bulletSpeed');
              var velX = V*Math.cos(angle) + this.get('velX');
              var velY = V*Math.sin(angle);
              var posX = this.get('position');
              var posY = this.get('canvas').height-this.get('playerSizeY');
              bulletCollection.fire(posX, posY, velX, velY);
          }
      });
      return Player;
  }
);
