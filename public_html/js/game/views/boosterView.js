define(function(require) {
    var Backbone = require('backbone'),
        dude = require('game/views/dude'),
        $ = require('jquery'),
        theme = require('models/theme').getTheme();

    var BoosterView = Backbone.View.extend({
            initialize: function(_model, _canvas) {
                this.canvas = _canvas;
                this.model = _model;
                dude.listenTo(this.model, 'apply', dude.showDude.bind(dude));
            },
            render: function() {
                var context = this.canvas.getContext('2d'),
                    model = this.model;
                context.beginPath();
                
                context.arc(this.model.get('posX'), this.model.get('posY') ,
                  this.model.get('radius'), 0, 2 * Math.PI, false);
                context.fillStyle = theme['boosterColor'];
                context.fill();
                context.lineWidth = 5;
                context.strokeStyle = theme['boosterBorderColor'];
                context.stroke();
                context.closePath();     
            }
        });

    return BoosterView;
});
