define(
    ['backbone'],
    function() {
        var Backbone = require('backbone');

        var BarrierView = Backbone.View.extend({
            initialize: function(model) {
                this.set({
                    'model': model,
                    'context': document.getElementById('dynamicLayer').getContext("2d")
                });
            },
            render: function() {
                // TODO рисует барьер по модели
            }
        });

        return BarrierView;
    }
);
