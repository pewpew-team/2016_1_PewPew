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
                var context = this.canvas.getContext('2d'),
                    model = this.model,
                    posX = model.get('posX'),
                    posY = model.get('posY'),
                    sizeX = model.get('sizeX'),
                    sizeY = model.get('sizeY');
                context.beginPath();
                // TODO добавить выбор цветов в зависимости от фона экрана
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