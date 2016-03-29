define(function(require) {
    var Backbone = require('backbone'),
        background = require('models/background'),
        $ = require('jquery');

    var BoosterView = Backbone.View.extend({
            initialize: function(_model, _canvas) {
                this.canvas = _canvas;
                this.model = _model;
                this.model.on('apply', this.showDude.bind(this));
            },
            showDude: function (type) {
              var imgUrl = 'img/';
              switch (type) {
                case 1:
                  imgUrl += 'player_speed.png';
                  break;
                case 2:
                  imgUrl += 'bullet_speed.png';
                  break;
                case 3:
                  imgUrl += 'bullet_size.png';
                  break;
              }
              var dudeWrapper = $('#js-dude');
              dudeWrapper.attr("src", imgUrl);
              dudeWrapper.removeClass().addClass('dude-in');
              setTimeout(function () {
                dudeWrapper.removeClass().addClass('dude-out');
                setTimeout(function () {
                  dudeWrapper.removeClass();
                }, 3000);
              }, 5000);

            },
            render: function() {
                var context = this.canvas.getContext('2d'),
                    model = this.model;
                context.closePath();
                context.beginPath();
                context.arc(this.model.get('posX'), this.model.get('posY'),
                  this.model.get('radius'), 0, 2 * Math.PI, false);
                context.fillStyle = 'green';
                context.fill();
                context.lineWidth = 5;
                context.strokeStyle = '#003300';
                context.stroke();
            }
        });

    return BoosterView;
});
