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
                // TODO рисует барьер по модели
            }
        });

        return BarrierView;
    }
);
