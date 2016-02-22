define(
    ['backbone'],
  function() {
      var Backbone = require('backbone');
      var Player = Backbone.Model.extend({
          initialize: function(nick, canvasWidth, playerSize) {
              this.set({
                  'nickname': nick,
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
              this.set('position', this.get('position')-5);
          },
          moveRight: function() {
              this.set('position', this.get('position')+5);
          }
      });
      return Player;
  }
);
