define(
    ['backbone'],
    function () {
        var Backbone = require('backbone');

        var PlayerView = Backbone.View.extend({
            events: {
                'keypress #staticLayer' : function() {
                    // TODO движение юзера
                },
                'mousemove #staticLayer' : function() {
                    // TODO движение пушки
                },
                'click #staticLayer' : function() {
                    // TODO выстрел
                }
            },
            initialize: function (model) {
                this.set({
                    'model': model,
                    'context': document.getElementById('dynamicLayer').getContext("2d")
                });
            },
            render: function () {
                // TODO рисуем игрока по данным из модели(вместе с пушкой)
            }
        });

        return PlayerView;
    }
);
