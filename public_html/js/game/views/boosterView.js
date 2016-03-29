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
              var dudeMessage = $("#dudeMessage"),
                  msg = "",
                  dudeWrapper = dudeMessage.parent();
              switch (type) {
                case 1:
                  msg = "Ты стал быстрей, <br> Чувак";
                  break;
                case 2:
                  msg = "Пули стали быстрей, <br> Чувак";
                  break;
                case 3:
                  msg = "Пули теперь больше, <br> Чувак";
                  break;
                default:
                  msg = "Я не знаю что тебе сказать, <br> Чувак";
                  break;
              }
              dudeMessage.html(msg);
              dudeWrapper.removeClass('dude--out');
              dudeWrapper.addClass('dude--in');
              setTimeout(function () {
                dudeWrapper.removeClass('dude--in');
                dudeWrapper.addClass('dude--out');
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
