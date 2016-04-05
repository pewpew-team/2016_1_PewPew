define(function(require) {
    var Backbone = require('backbone'),
        theme = require('models/theme');

    var bulletView = Backbone.View.extend({
            initialize: function(model, canvas) {
                this.canvas = canvas;
                this.model = model;
            },
            show: function() {
                var context = this.canvas.getContext('2d'),
                    model = this.model;
                context.beginPath();
                context.fillStyle = theme['bulletsColor'];
                context.arc(this.model.get('posX'), this.model.get('posY') ,
                            model.get('sizeX') / 2, 0, 2 * Math.PI, false);
                context.fill();
                context.closePath();
            }
        });
    return bulletView;
});
