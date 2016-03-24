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
                context.beginPath();
                context.fillStyle = this.getStyle();
                context.fillRect(model.get('posX') - model.get('sizeX') / 2, model.get('posY') - model.get('sizeY') / 2,
                    model.get('sizeY'), model.get('sizeX'));
                context.closePath();
            },
            getStyle: function() {

            }
        });

    return BoosterView;
});
