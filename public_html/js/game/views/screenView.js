/*
Вьюха для отрисовки статической части экрана
 */

define(
    ['backbone', 'game/models/screen'],
    function() {
        var Backbone = require('backbone');
        var screen = require('game/models/screen');

        var ScreenView = Backbone.View.extend({
            initialize: function (model) {
                this.set({
                    'model': model,
                    'context': document.getElementById('staticLayer').getContext("2d")
                });
            },

            render: function () {
                // TODO Рисует статический фон экрана
            }
        });

        return new ScreenView(screen);
    }
);
