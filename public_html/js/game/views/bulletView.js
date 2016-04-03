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
                context.fillRect(model.get('posX') - model.get('sizeX') / 2, model.get('posY') - model.get('sizeY') / 2,
                    model.get('sizeX'), model.get('sizeY'));
                context.closePath();
            }
        });
    return bulletView;
});