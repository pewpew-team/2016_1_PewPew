/*
Вьюха для отрисовки статической части экрана
 */

define(
    ['backbone', 'game/models/screen'],
    function() {
        var Backbone = require('backbone');
        var screen = require('game/models/screen');

        var ScreenView = Backbone.View.extend({
            initialize: function (canvas) {
                this.model = screen;
                this.canvas = canvas;
            },

            render: function () {
                // TODO Рисует статический фон экрана
            }
        });

        return ScreenView;
    }
);
