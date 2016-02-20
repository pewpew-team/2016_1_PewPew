define(
    ['backbone'],
    function () {
        var Backbone = require('backbone');

        var PlayerView = Backbone.View.extend({
            initialize: function (model) {
                this.set({
                    'model': model,
                    'context': document.getElementById('dynamicLayer')
                });
            },
            render: function () {
                // TODO рисуем игрока по данным из модели
            }
        });

        return PlayerView;
    }
);
