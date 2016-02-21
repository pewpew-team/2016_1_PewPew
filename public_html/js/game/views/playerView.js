define(
    ['backbone'],
    function () {
        var Backbone = require('backbone');

        var PlayerView = Backbone.View.extend({
            initialize: function (model, canvas) {
                this.model = model;
                this.canvas = canvas;
                console.log(canvas);
                this.canvas.addEventListener('click', this.handleClick);
                this.canvas.addEventListener('mousemove', this.handleMouseMove);
                window.addEventListener('keydown', this.handleKeydown);
            },
            render: function () {
                // TODO рисуем игрока по данным из модели(вместе с пушкой)
            },
            handleClick: function(e) {
                e.preventDefault();
                // TODO выстрел
            },
            handleMouseMove: function(e) {
                e.preventDefault();
                // TODO движение пушки
            },
            handleKeydown: function(e) {
                e.preventDefault();
                // TODO движение пользователя
            }
        });

        return PlayerView;
    }
);
