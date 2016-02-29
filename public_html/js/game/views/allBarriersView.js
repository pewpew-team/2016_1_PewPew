define(
    ['backbone', 'game/views/barrierView', 'game/collections/barriersCollection'],
    function() {
        var Backbone = require('backbone'),
            BarrierView = require('game/views/barrierView'),
            barriersCollection = require('game/collections/barriersCollection'),
            BarriersView = Backbone.View.extend({
                render: function() {
                    this.collection.each(function(barrier) {
                        var barrierView = new BarrierView(barrier, document.getElementById('dynamicLayer'));
                        barrierView.render();
                    });
                }
            });
        return BarriersView;
    }
);
