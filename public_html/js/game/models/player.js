define(
    ['backbone'],
  function() {
      var Backbone = require('backbone');
      var Player = Backbone.Model.extend({
          initialize: function(nickname, canvasWidth, playerSize) {
              this.set({
                  'nickname': nickname,
                  'canvasWidth': canvasWidth,
                  'position': canvasWidth/2,
                  'playerSize': playerSize,
                  'gunVectorX': 0,
                  'gunVectorY': -1
              });
          },
          sync: function() {
              // TODO отправка данный через web socket
          },
          moveLeft: function() {
              this.pos--;
          },
          moveRight: function() {
              this.pos++;
          }
      });
      return Player;
  }
);
