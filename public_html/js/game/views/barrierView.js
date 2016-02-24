define(
    ['backbone'],
    function() {
        var Backbone = require('backbone');

        var BarrierView = Backbone.View.extend({
            initialize: function(model, canvas) {
                this.canvas = canvas;
                this.model = model;
            },
            render: function() {
                var context = this.canvas.getContext('2d');
                var model = this.model;
                var posX = model.get('posX');
                var posY = model.get('posY');
                var sizeX = model.get('sizeX');
                var sizeY = model.get('sizeY');
                context.beginPath();
                if (model.get('isRemovable')) {
                    context.fillStyle = "green";
                } else {
                    context.fillStyle = "black";
                }
                context.fillRect(posX - sizeX / 2, posY - sizeY / 2, sizeY, sizeX);
                context.closePath();
            }
        });

        return BarrierView;
    }
);
