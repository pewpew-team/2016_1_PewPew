define(
    ['backbone', 'game/views/barrierView', 'game/collections/barriersCollection'],
    function() {
        var Backbone = require('backbone');
        var BarrierView = require('game/views/barrierView');
        var barriersCollection = require('game/collections/barriersCollection');

        var BarriersView = Backbone.View.extend({
            render: function() {
                this.collection.each(function(barrier) {
                    var barrierView = new BarrierView(barrier, document.getElementById('dynamicLayer'));
                    barrierView.render();
                });
            }
        });

        return new BarriersView({collection: barriersCollection});
    }
);
