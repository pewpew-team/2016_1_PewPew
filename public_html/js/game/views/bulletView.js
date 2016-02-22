define(
    ['backbone'],
    function() {
        var Backbone = require('backbone');
        var bulletView = Backbone.View.extend({
            initialize: function(model, canvas) {
                this.canvas = canvas;
                this.model = model;
            },
            show: function() {
                var context = this.canvas.getContext('2d');
                context.beginPath();
                context.fillStyle = "orange";
                var model = this.model;
                context.fillRect(model.get('posX') - model.get('sizeX') / 2, model.get('posY') - model.get('sizeY') / 2,
                    model.get('sizeX'), model.get('sizeY'));
                context.closePath();
            }
        });

        return bulletView;
    }
);