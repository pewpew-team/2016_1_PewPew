define(
    ['backbone'],
    function() {
        var Backbone = require('backbone'),
            BarrierView = Backbone.View.extend({
                initialize: function(model, canvas) {
                    this.canvas = canvas;
                    this.model = model;
                },
                render: function() {
                    var context = this.canvas.getContext('2d'),
                        model = this.model;
                    context.beginPath();
                    // TODO добавить выбор цветов в зависимости от фона экрана
                    if (model.get('isRemovable')) {
                        context.fillStyle = "green";
                    } else {
                        context.fillStyle = "black";
                    }
                    context.fillRect(model.get('posX') - model.get('sizeX') / 2, model.get('posY') - model.get('sizeY') / 2,
                        model.get('sizeY'), model.get('sizeX'));
                    context.closePath();
                }
            });

        return BarrierView;
    }
);