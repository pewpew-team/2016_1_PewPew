define(function(require) {
    var Backbone = require('backbone'),
        background = require('models/background');

    var BoosterView = Backbone.View.extend({
            initialize: function(model, canvas) {
                this.canvas = canvas;
                this.model = model;
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
