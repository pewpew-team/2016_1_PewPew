define(
    ['backbone', 'models/screen'],
  function() {
      var Backbone = require('backbone');
      var Player = Backbone.Model.extend({
          initialize: function(nickname, canvasWidth, playerSize) {
              this.set({
                  'nickname': nickname,
                  'canvasWidth': canvasWidth,
                  'position': canvasWidth/2,
                  'playerSize': playerSize
              });
          },
          sync: function() {
              // TODO отправка данный через web socket
          },
          moveLeft: function() {
              // TODO доработать отскакивание от стенки
              this.pos--;
          },
          moveRight: function() {
              this.pos++;
          }
      });
      return Player;
  }
);
